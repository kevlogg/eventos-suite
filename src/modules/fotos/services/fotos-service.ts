import fs from "fs";
import path from "path";
import os from "os";
import { EventPhoto } from "@/types";

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

function getPhotosFilePath(eventId: string): string {
  const dir = getDataDir();
  return path.join(dir, `photos_${eventId}.json`);
}

const DEMO_PHOTOS: Omit<EventPhoto, "eventId">[] = [
  {
    id: "ph-1",
    photoUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    authorName: "Mesa 4 - Los Primos",
    tableNumber: 4,
    caption: "¡Los novios más lindos del mundo! Salud por ustedes 🥂",
    approved: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "ph-2",
    photoUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80",
    authorName: "Mesa 8 - Amigos de la Facu",
    tableNumber: 8,
    caption: "¡De acá no nos vamos hasta que salga el sol! 🎉",
    approved: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  },
  {
    id: "ph-3",
    photoUrl: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80",
    authorName: "Tía Marta y Familia",
    tableNumber: 2,
    caption: "Una noche mágica e inolvidable ❤️",
    approved: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
];

export function getEventPhotos(eventId: string): EventPhoto[] {
  const filePath = getPhotosFilePath(eventId);
  if (!fs.existsSync(filePath)) {
    const initial: EventPhoto[] = DEMO_PHOTOS.map((p) => ({
      ...p,
      eventId,
    }));
    try {
      fs.writeFileSync(filePath, JSON.stringify(initial, null, 2), "utf-8");
    } catch {
      // ignore
    }
    return initial;
  }

  try {
    const raw = fs.readFileSync(filePath, "utf-8").replace(/^\uFEFF/, "");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function addEventPhoto(
  eventId: string,
  data: {
    photoUrl: string;
    authorName: string;
    tableNumber?: number;
    caption?: string;
  }
): EventPhoto {
  const photos = getEventPhotos(eventId);
  const newPhoto: EventPhoto = {
    id: "ph_" + Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
    eventId,
    photoUrl: data.photoUrl,
    authorName: data.authorName.trim(),
    tableNumber: data.tableNumber,
    caption: data.caption?.trim(),
    approved: true, // Default auto-approve
    createdAt: new Date().toISOString(),
  };

  photos.unshift(newPhoto);
  try {
    fs.writeFileSync(getPhotosFilePath(eventId), JSON.stringify(photos, null, 2), "utf-8");
  } catch {
    // ignore
  }
  return newPhoto;
}

export function updatePhotoStatus(eventId: string, photoId: string, approved: boolean): void {
  const photos = getEventPhotos(eventId);
  const p = photos.find((x) => x.id === photoId);
  if (p) {
    p.approved = approved;
    try {
      fs.writeFileSync(getPhotosFilePath(eventId), JSON.stringify(photos, null, 2), "utf-8");
    } catch {
      // ignore
    }
  }
}

export function deletePhoto(eventId: string, photoId: string): void {
  let photos = getEventPhotos(eventId);
  photos = photos.filter((x) => x.id !== photoId);
  try {
    fs.writeFileSync(getPhotosFilePath(eventId), JSON.stringify(photos, null, 2), "utf-8");
  } catch {
    // ignore
  }
}
