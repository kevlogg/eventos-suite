import fs from "fs";
import path from "path";
import { SuiteEvent } from "@/types";

const dataDir = path.join(process.cwd(), "data");
const eventsFilePath = path.join(dataDir, "events.json");

function ensureStorage(): void {
  if (!fs.existsSync(dataDir)) {
    try {
      fs.mkdirSync(dataDir, { recursive: true });
    } catch {
      // ignore
    }
  }

  if (!fs.existsSync(eventsFilePath)) {
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
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
    fs.writeFileSync(eventsFilePath, JSON.stringify(seedEvents, null, 2), "utf-8");
  }
}

export async function getAllEvents(): Promise<SuiteEvent[]> {
  ensureStorage();
  try {
    const raw = fs.readFileSync(eventsFilePath, "utf-8").replace(/^\uFEFF/, "");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : (parsed ? [parsed] : []);
  } catch (err) {
    console.error("Error reading events storage:", err);
    return [];
  }
}

export async function getEventBySlug(slug: string): Promise<SuiteEvent | null> {
  const events = await getAllEvents();
  return events.find((e) => e.slug.toLowerCase() === slug.toLowerCase()) || null;
}

export async function getEventByToken(token: string): Promise<SuiteEvent | null> {
  const events = await getAllEvents();
  return events.find((e) => e.adminToken === token) || null;
}

export async function createEvent(data: {
  slug: string;
  title: string;
  date: string;
  location?: string;
  enabledModules: { invitacion: boolean; trivia: boolean; fotos: boolean };
}): Promise<SuiteEvent> {
  ensureStorage();
  const events = await getAllEvents();

  // Generate random token if not provided
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

  events.unshift(newEvent);
  fs.writeFileSync(eventsFilePath, JSON.stringify(events, null, 2), "utf-8");
  return newEvent;
}

export async function updateEventModules(
  id: string,
  enabledModules: { invitacion: boolean; trivia: boolean; fotos: boolean }
): Promise<SuiteEvent | null> {
  ensureStorage();
  const events = await getAllEvents();
  const index = events.findIndex((e) => e.id === id);
  if (index === -1) return null;

  events[index].enabledModules = enabledModules;
  events[index].updatedAt = new Date().toISOString();

  fs.writeFileSync(eventsFilePath, JSON.stringify(events, null, 2), "utf-8");
  return events[index];
}
