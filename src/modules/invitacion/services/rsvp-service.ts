import fs from "fs";
import path from "path";
import { RSVP } from "@/types";

const dataDir = path.join(process.cwd(), "data");

function getFilePath(eventId: string): string {
  if (!fs.existsSync(dataDir)) {
    try {
      fs.mkdirSync(dataDir, { recursive: true });
    } catch {
      // ignore
    }
  }
  return path.join(dataDir, `rsvps_${eventId}.json`);
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
    fs.writeFileSync(filePath, JSON.stringify(demoRsvps, null, 2), "utf-8");
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
  fs.writeFileSync(getFilePath(eventId), JSON.stringify(rsvps, null, 2), "utf-8");
  return newRsvp;
}
