import fs from "fs";
import path from "path";
import os from "os";
import { SuiteEvent } from "@/types";
import { getTursoClient, ensureSuiteSchema } from "./turso";

function getDataDir(): string {
  if (process.env.VERCEL) {
    const tmpData = path.join(os.tmpdir(), "data");
    if (!fs.existsSync(tmpData)) {
      try {
        fs.mkdirSync(tmpData, { recursive: true });
      } catch {
        // ignore
      }
    }
    return tmpData;
  }
  const localData = path.join(process.cwd(), "data");
  if (!fs.existsSync(localData)) {
    try {
      fs.mkdirSync(localData, { recursive: true });
    } catch {
      return os.tmpdir();
    }
  }
  return localData;
}

function getEventsFilePath(): string {
  return path.join(getDataDir(), "events.json");
}

function ensureFallbackStorage(): void {
  const filePath = getEventsFilePath();
  if (!fs.existsSync(filePath)) {
    const seedEvents: SuiteEvent[] = [
      {
        id: "evt-demo-1",
        slug: "demo-fiesta",
        title: "Casamiento Sofi & Nico",
        date: "2026-12-15",
        location: "Salón Los Robles, Pilar",
        adminToken: "token-sofi-nico-2026",
        enabledModules: {
          invitacion: true,
          trivia: true,
          fotos: true,
        },
        createdAt: "2026-11-08T17:28:16.208Z",
        updatedAt: "2026-11-08T17:28:16.216Z",
      },
    ];
    try {
      fs.writeFileSync(filePath, JSON.stringify(seedEvents, null, 2), "utf-8");
    } catch {
      // ignore in read-only environments
    }
  }
}

function mapRowToEvent(row: Record<string, unknown>): SuiteEvent {
  let enabledModules = { invitacion: true, trivia: true, fotos: true };
  if (typeof row.enabled_modules === "string") {
    try {
      enabledModules = JSON.parse(row.enabled_modules);
    } catch {
      // fallback default
    }
  } else if (typeof row.enabled_modules === "object" && row.enabled_modules !== null) {
    enabledModules = row.enabled_modules as { invitacion: boolean; trivia: boolean; fotos: boolean };
  }

  return {
    id: String(row.id),
    slug: String(row.slug),
    title: String(row.title),
    date: String(row.date),
    location: row.location ? String(row.location) : "",
    adminToken: String(row.admin_token),
    enabledModules,
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
  };
}

export async function getAllEvents(): Promise<SuiteEvent[]> {
  const turso = getTursoClient();
  if (turso) {
    try {
      await ensureSuiteSchema();
      const res = await turso.execute("SELECT * FROM suite_events ORDER BY created_at DESC;");
      return res.rows.map((r) => mapRowToEvent(r as Record<string, unknown>));
    } catch (err) {
      console.error("Turso error in getAllEvents, falling back to JSON:", err);
    }
  }

  // Fallback to JSON
  ensureFallbackStorage();
  try {
    const raw = fs.readFileSync(getEventsFilePath(), "utf-8").replace(/^\uFEFF/, "");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : parsed ? [parsed] : [];
  } catch (err) {
    console.error("Error reading events storage fallback:", err);
    return [];
  }
}

export async function getEventBySlug(slug: string): Promise<SuiteEvent | null> {
  const cleanSlug = slug.toLowerCase().trim();
  const turso = getTursoClient();
  if (turso) {
    try {
      await ensureSuiteSchema();
      const res = await turso.execute({
        sql: "SELECT * FROM suite_events WHERE LOWER(slug) = ? LIMIT 1;",
        args: [cleanSlug],
      });
      if (res.rows.length > 0) {
        return mapRowToEvent(res.rows[0] as Record<string, unknown>);
      }
    } catch (err) {
      console.error("Turso error in getEventBySlug:", err);
    }
  }

  const events = await getAllEvents();
  return events.find((e) => e.slug.toLowerCase() === cleanSlug) || null;
}

export async function getEventByToken(token: string): Promise<SuiteEvent | null> {
  const turso = getTursoClient();
  if (turso) {
    try {
      await ensureSuiteSchema();
      const res = await turso.execute({
        sql: "SELECT * FROM suite_events WHERE admin_token = ? LIMIT 1;",
        args: [token],
      });
      if (res.rows.length > 0) {
        return mapRowToEvent(res.rows[0] as Record<string, unknown>);
      }
    } catch (err) {
      console.error("Turso error in getEventByToken:", err);
    }
  }

  const events = await getAllEvents();
  return events.find((e) => e.adminToken === token) || null;
}

export async function getEventById(id: string): Promise<SuiteEvent | null> {
  const turso = getTursoClient();
  if (turso) {
    try {
      await ensureSuiteSchema();
      const res = await turso.execute({
        sql: "SELECT * FROM suite_events WHERE id = ? LIMIT 1;",
        args: [id],
      });
      if (res.rows.length > 0) {
        return mapRowToEvent(res.rows[0] as Record<string, unknown>);
      }
    } catch (err) {
      console.error("Turso error in getEventById:", err);
    }
  }

  const events = await getAllEvents();
  return events.find((e) => e.id === id) || null;
}

export async function createEvent(data: {
  slug: string;
  title: string;
  date: string;
  location?: string;
  enabledModules: { invitacion: boolean; trivia: boolean; fotos: boolean };
}): Promise<SuiteEvent> {
  const randomToken = "adm_" + Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
  const newEvent: SuiteEvent = {
    id: "evt_" + Date.now().toString(36),
    slug: data.slug.toLowerCase().trim().replace(/[^a-z0-9-_]/g, "-"),
    title: data.title.trim(),
    date: data.date,
    location: data.location?.trim() || "",
    adminToken: randomToken,
    enabledModules: data.enabledModules,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const turso = getTursoClient();
  if (turso) {
    try {
      await ensureSuiteSchema();
      await turso.execute({
        sql: `
          INSERT INTO suite_events (
            id, slug, title, date, location, admin_token, enabled_modules, created_at, updated_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
        `,
        args: [
          newEvent.id,
          newEvent.slug,
          newEvent.title,
          newEvent.date,
          newEvent.location || "",
          newEvent.adminToken,
          JSON.stringify(newEvent.enabledModules),
          newEvent.createdAt,
          newEvent.updatedAt,
        ],
      });
      // Mantener backup local JSON sincronizado
      try {
        ensureFallbackStorage();
        const raw = fs.readFileSync(getEventsFilePath(), "utf-8").replace(/^\uFEFF/, "");
        const events = JSON.parse(raw);
        if (Array.isArray(events)) {
          const filtered = events.filter((e) => e.id !== newEvent.id && e.slug !== newEvent.slug);
          filtered.unshift(newEvent);
          fs.writeFileSync(getEventsFilePath(), JSON.stringify(filtered, null, 2), "utf-8");
        }
      } catch {
        // ignore fallback errors
      }

      return newEvent;
    } catch (err) {
      console.error("Turso error in createEvent, attempting fallback:", err);
      // If error is unique constraint on slug, rethrow nicely
      if (String(err).includes("UNIQUE constraint failed: suite_events.slug")) {
        throw new Error("Ya existe un evento con ese slug / URL. Elegí uno diferente.");
      }
      throw err;
    }
  }

  // Fallback to JSON
  ensureFallbackStorage();
  try {
    const events = await getAllEvents();
    if (events.some((e) => e.slug.toLowerCase() === newEvent.slug.toLowerCase())) {
      throw new Error("Ya existe un evento con ese slug / URL. Elegí uno diferente.");
    }
    events.unshift(newEvent);
    fs.writeFileSync(getEventsFilePath(), JSON.stringify(events, null, 2), "utf-8");
  } catch (err) {
    console.error("Fallback error in createEvent:", err);
    throw err;
  }

  return newEvent;
}

export async function updateEvent(
  id: string,
  data: {
    title?: string;
    date?: string;
    location?: string;
    enabledModules: { invitacion: boolean; trivia: boolean; fotos: boolean };
  }
): Promise<SuiteEvent | null> {
  const now = new Date().toISOString();
  const turso = getTursoClient();
  if (turso) {
    try {
      await ensureSuiteSchema();
      const current = await getEventById(id);
      if (!current) return null;

      const title = data.title !== undefined ? data.title : current.title;
      const date = data.date !== undefined ? data.date : current.date;
      const location = data.location !== undefined ? data.location : (current.location || "");

      await turso.execute({
        sql: `UPDATE suite_events SET title = ?, date = ?, location = ?, enabled_modules = ?, updated_at = ? WHERE id = ?;`,
        args: [title, date, location, JSON.stringify(data.enabledModules), now, id],
      });
      const res = await turso.execute({
        sql: `SELECT * FROM suite_events WHERE id = ? LIMIT 1;`,
        args: [id],
      });
      if (res.rows.length > 0) {
        const updated = mapRowToEvent(res.rows[0] as Record<string, unknown>);
        // Mantener backup local JSON sincronizado
        try {
          const raw = fs.readFileSync(getEventsFilePath(), "utf-8").replace(/^\uFEFF/, "");
          const events = JSON.parse(raw);
          if (Array.isArray(events)) {
            const idx = events.findIndex((e) => e.id === id);
            if (idx !== -1) {
              events[idx] = updated;
              fs.writeFileSync(getEventsFilePath(), JSON.stringify(events, null, 2), "utf-8");
            }
          }
        } catch {}
        return updated;
      }
    } catch (err) {
      console.error("Turso error in updateEvent:", err);
    }
  }

  // Fallback to JSON
  try {
    const events = await getAllEvents();
    const index = events.findIndex((e) => e.id === id);
    if (index === -1) return null;

    if (data.title !== undefined) events[index].title = data.title;
    if (data.date !== undefined) events[index].date = data.date;
    if (data.location !== undefined) events[index].location = data.location;
    events[index].enabledModules = data.enabledModules;
    events[index].updatedAt = now;
    fs.writeFileSync(getEventsFilePath(), JSON.stringify(events, null, 2), "utf-8");
    return events[index];
  } catch (err) {
    console.error("Fallback error in updateEvent:", err);
    return null;
  }
}

export async function updateEventModules(
  id: string,
  enabledModules: { invitacion: boolean; trivia: boolean; fotos: boolean }
): Promise<SuiteEvent | null> {
  return updateEvent(id, { enabledModules });
}

export async function deleteEvent(id: string): Promise<boolean> {
  const turso = getTursoClient();
  if (turso) {
    try {
      await ensureSuiteSchema();
      await Promise.all([
        turso.execute({ sql: "DELETE FROM suite_events WHERE id = ?;", args: [id] }),
        turso.execute({ sql: "DELETE FROM suite_invitations WHERE event_id = ?;", args: [id] }),
        turso.execute({ sql: "DELETE FROM suite_rsvps WHERE event_id = ?;", args: [id] }),
        turso.execute({ sql: "DELETE FROM suite_photos WHERE event_id = ?;", args: [id] }),
        turso.execute({ sql: "DELETE FROM suite_trivia_questions WHERE event_id = ?;", args: [id] }),
        turso.execute({ sql: "DELETE FROM suite_trivia_players WHERE event_id = ?;", args: [id] }),
      ]);
    } catch (err) {
      console.error("Turso error in deleteEvent:", err);
    }
  }

  // Fallback to JSON cleanup
  try {
    const events = await getAllEvents();
    const filtered = events.filter((e) => e.id !== id);
    fs.writeFileSync(getEventsFilePath(), JSON.stringify(filtered, null, 2), "utf-8");

    const dir = getDataDir();
    const filesToClean = [
      path.join(dir, `rsvps_${id}.json`),
      path.join(dir, `photos_${id}.json`),
      path.join(dir, `trivia_${id}.json`),
    ];
    for (const f of filesToClean) {
      if (fs.existsSync(/*turbopackIgnore: true*/ f)) {
        try {
          fs.unlinkSync(/*turbopackIgnore: true*/ f);
        } catch {
          // ignore
        }
      }
    }
    return true;
  } catch (err) {
    console.error("Fallback error in deleteEvent:", err);
    return false;
  }
}
