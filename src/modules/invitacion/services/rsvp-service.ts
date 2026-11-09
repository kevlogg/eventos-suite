import fs from "fs";
import path from "path";
import os from "os";
import { RSVP } from "@/types";
import { getTursoClient, ensureSuiteSchema } from "@/lib/turso";

function getDataDir(): string {
  if (process.env.VERCEL) {
    const tmp = path.join(os.tmpdir(), "data");
    if (!fs.existsSync(tmp)) {
      try {
        fs.mkdirSync(tmp, { recursive: true });
      } catch {
        // ignore
      }
    }
    return tmp;
  }
  const local = path.join(process.cwd(), "data");
  if (!fs.existsSync(local)) {
    try {
      fs.mkdirSync(local, { recursive: true });
    } catch {
      return os.tmpdir();
    }
  }
  return local;
}

function getFilePath(eventId: string): string {
  const dir = getDataDir();
  return path.join(dir, `rsvps_${eventId}.json`);
}

const DEMO_RSVPS: RSVP[] = [
  {
    id: "rsvp-1",
    eventId: "evt-demo-1",
    guestName: "Martín Gómez",
    attending: true,
    companionsCount: 1,
    companionNames: "Camila Díaz",
    dietaryRestrictions: "Celíaca (Camila)",
    message: "¡Muchas felicidades chicos! Ahí estaremos festejando.",
    createdAt: new Date().toISOString(),
  },
  {
    id: "rsvp-2",
    eventId: "evt-demo-1",
    guestName: "Valeria Fernández",
    attending: true,
    companionsCount: 0,
    companionNames: "",
    dietaryRestrictions: "Vegetariana",
    message: "¡Qué emoción! Los quiero un montón.",
    createdAt: new Date().toISOString(),
  },
  {
    id: "rsvp-3",
    eventId: "evt-demo-1",
    guestName: "Gonzalo Peralta",
    attending: false,
    companionsCount: 0,
    message: "Lamentablemente de viaje por trabajo, los acompaño a la distancia.",
    createdAt: new Date().toISOString(),
  },
];

export async function getRsvps(eventId: string): Promise<RSVP[]> {
  const turso = getTursoClient();
  if (turso) {
    try {
      await ensureSuiteSchema();
      const res = await turso.execute({
        sql: "SELECT * FROM suite_rsvps WHERE event_id = ? ORDER BY created_at DESC;",
        args: [eventId],
      });
      if (res.rows.length > 0) {
        return res.rows.map((r: Record<string, unknown>) => ({
          id: String(r.id),
          eventId: String(r.event_id),
          guestName: String(r.guest_name),
          attending: Boolean(r.attending),
          companionsCount: Number(r.companions_count || 0),
          companionNames: r.companion_names ? String(r.companion_names) : "",
          dietaryRestrictions: r.dietary_restrictions ? String(r.dietary_restrictions) : "",
          message: r.message ? String(r.message) : "",
          createdAt: String(r.created_at),
        }));
      }
    } catch (err) {
      console.error("Turso error in getRsvps, falling back to JSON:", err);
    }
  }

  // Fallback to JSON
  const filePath = getFilePath(eventId);
  if (!fs.existsSync(filePath)) {
    if (eventId === "evt-demo-1") {
      try {
        fs.writeFileSync(filePath, JSON.stringify(DEMO_RSVPS, null, 2), "utf-8");
      } catch {
        // ignore
      }
      return DEMO_RSVPS;
    }
    return [];
  }

  try {
    const raw = fs.readFileSync(filePath, "utf-8").replace(/^\uFEFF/, "");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export async function addRsvp(
  eventId: string,
  data: {
    guestName: string;
    attending: boolean;
    companionsCount: number;
    companionNames?: string;
    dietaryRestrictions?: string;
    message?: string;
  }
): Promise<RSVP> {
  const newRsvp: RSVP = {
    id: "rsvp_" + Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
    eventId,
    guestName: data.guestName.trim(),
    attending: data.attending,
    companionsCount: data.companionsCount || 0,
    companionNames: data.companionNames?.trim() || "",
    dietaryRestrictions: data.dietaryRestrictions?.trim() || "",
    message: data.message?.trim() || "",
    createdAt: new Date().toISOString(),
  };

  const turso = getTursoClient();
  if (turso) {
    try {
      await ensureSuiteSchema();
      await turso.execute({
        sql: `INSERT INTO suite_rsvps (
          id, event_id, guest_name, attending, companions_count, companion_names, dietary_restrictions, message, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`,
        args: [
          newRsvp.id,
          newRsvp.eventId,
          newRsvp.guestName,
          newRsvp.attending ? 1 : 0,
          newRsvp.companionsCount,
          newRsvp.companionNames || null,
          newRsvp.dietaryRestrictions || null,
          newRsvp.message || null,
          newRsvp.createdAt,
        ],
      });
      return newRsvp;
    } catch (err) {
      console.error("Turso error in addRsvp, using fallback:", err);
    }
  }

  // Fallback to JSON
  try {
    const filePath = getFilePath(eventId);
    let rsvps: RSVP[] = [];
    if (fs.existsSync(filePath)) {
      try {
        rsvps = JSON.parse(fs.readFileSync(filePath, "utf-8").replace(/^\uFEFF/, ""));
      } catch {
        // ignore
      }
    }
    rsvps.unshift(newRsvp);
    fs.writeFileSync(filePath, JSON.stringify(rsvps, null, 2), "utf-8");
  } catch (err) {
    console.error("Fallback error in addRsvp:", err);
  }

  return newRsvp;
}
