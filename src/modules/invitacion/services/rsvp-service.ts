import fs from "fs";
import path from "path";
import os from "os";
import { RSVP } from "@/types";

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

export function getRsvps(eventId: string): RSVP[] {
  const filePath = getFilePath(eventId);
  if (!fs.existsSync(filePath)) {
    // Seed initial demo RSVPs if none exist
    const demoRsvps: RSVP[] = [
      {
        id: "rsvp-1",
        eventId,
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
        eventId,
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
        eventId,
        guestName: "Gonzalo Peralta",
        attending: false,
        companionsCount: 0,
        message: "Lamentablemente de viaje por trabajo, los acompaño a la distancia.",
        createdAt: new Date().toISOString(),
      },
    ];
    try {
      fs.writeFileSync(filePath, JSON.stringify(demoRsvps, null, 2), "utf-8");
    } catch {
      // ignore
    }
    return demoRsvps;
  }

  try {
    const raw = fs.readFileSync(filePath, "utf-8").replace(/^\uFEFF/, "");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function addRsvp(
  eventId: string,
  data: {
    guestName: string;
    attending: boolean;
    companionsCount: number;
    companionNames?: string;
    dietaryRestrictions?: string;
    message?: string;
  }
): RSVP {
  const rsvps = getRsvps(eventId);
  const newRsvp: RSVP = {
    id: "rsvp_" + Date.now().toString(36),
    eventId,
    guestName: data.guestName.trim(),
    attending: data.attending,
    companionsCount: data.companionsCount || 0,
    companionNames: data.companionNames?.trim(),
    dietaryRestrictions: data.dietaryRestrictions?.trim(),
    message: data.message?.trim(),
    createdAt: new Date().toISOString(),
  };

  rsvps.unshift(newRsvp);
  try {
    fs.writeFileSync(getFilePath(eventId), JSON.stringify(rsvps, null, 2), "utf-8");
  } catch {
    // ignore
  }
  return newRsvp;
}
