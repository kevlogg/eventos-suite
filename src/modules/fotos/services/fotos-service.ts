import fs from "fs";
import path from "path";
import os from "os";
import { EventPhoto } from "@/types";
import { getTursoClient, ensureSuiteSchema } from "@/lib/turso";
import { getSupabaseAdmin } from "@/lib/supabase";

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

async function uploadToSupabaseStorage(
  eventId: string,
  dataUrl: string
): Promise<string> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return dataUrl;

  try {
    const match = dataUrl.match(/^data:(image\/[a-zA-Z0-9.+]+);base64,(.+)$/);
    if (!match) return dataUrl;

    const mimeType = match[1];
    const base64Data = match[2];
    const buffer = Buffer.from(base64Data, "base64");

    const extension = mimeType.split("/")[1]?.replace("jpeg", "jpg") || "jpg";
    const storagePath = `${eventId}/${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${extension}`;

    const { data, error } = await supabase.storage
      .from("event-photos")
      .upload(storagePath, buffer, {
        contentType: mimeType,
        upsert: true,
      });

    if (error) {
      console.error("Supabase Storage error, keeping original URL:", error);
      return dataUrl;
    }

    const { data: pubData } = supabase.storage
      .from("event-photos")
      .getPublicUrl(data.path);

    return pubData.publicUrl;
  } catch (err) {
    console.error("Error processing photo upload to Supabase Storage:", err);
    return dataUrl;
  }
}

export async function getEventPhotos(eventId: string): Promise<EventPhoto[]> {
  const turso = getTursoClient();
  if (turso) {
    try {
      await ensureSuiteSchema();
      const res = await turso.execute({
        sql: "SELECT * FROM suite_photos WHERE event_id = ? ORDER BY created_at DESC;",
        args: [eventId],
      });
      if (res.rows.length > 0) {
        return res.rows.map((r: Record<string, unknown>) => ({
          id: String(r.id),
          eventId: String(r.event_id),
          photoUrl: String(r.photo_url),
          authorName: String(r.author_name),
          tableNumber: r.table_number ? Number(r.table_number) : undefined,
          caption: r.caption ? String(r.caption) : undefined,
          approved: Boolean(r.approved),
          createdAt: String(r.created_at),
        }));
      }
    } catch (err) {
      console.error("Turso error in getEventPhotos, falling back to JSON:", err);
    }
  }

  // Fallback to JSON
  const filePath = getPhotosFilePath(eventId);
  if (!fs.existsSync(filePath)) {
    if (eventId === "evt-demo-1") {
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
    return [];
  }

  try {
    const raw = fs.readFileSync(filePath, "utf-8").replace(/^\uFEFF/, "");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export async function addEventPhoto(
  eventId: string,
  data: {
    photoUrl: string;
    authorName: string;
    tableNumber?: number;
    caption?: string;
  }
): Promise<EventPhoto> {
  let photoUrl = data.photoUrl;
  if (photoUrl.startsWith("data:image/")) {
    photoUrl = await uploadToSupabaseStorage(eventId, photoUrl);
  }

  const newPhoto: EventPhoto = {
    id: "ph_" + Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
    eventId,
    photoUrl,
    authorName: data.authorName.trim(),
    tableNumber: data.tableNumber,
    caption: data.caption?.trim(),
    approved: true, // Default auto-approve
    createdAt: new Date().toISOString(),
  };

  const turso = getTursoClient();
  if (turso) {
    try {
      await ensureSuiteSchema();
      await turso.execute({
        sql: `INSERT INTO suite_photos (
          id, event_id, photo_url, author_name, table_number, caption, approved, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
        args: [
          newPhoto.id,
          newPhoto.eventId,
          newPhoto.photoUrl,
          newPhoto.authorName,
          newPhoto.tableNumber || null,
          newPhoto.caption || null,
          newPhoto.approved ? 1 : 0,
          newPhoto.createdAt,
        ],
      });
      return newPhoto;
    } catch (err) {
      console.error("Turso error in addEventPhoto, falling back:", err);
    }
  }

  // Fallback to JSON
  try {
    const photos = await getEventPhotos(eventId);
    photos.unshift(newPhoto);
    fs.writeFileSync(getPhotosFilePath(eventId), JSON.stringify(photos, null, 2), "utf-8");
  } catch (err) {
    console.error("Fallback error in addEventPhoto:", err);
  }

  return newPhoto;
}

export async function updatePhotoStatus(
  eventId: string,
  photoId: string,
  approved: boolean
): Promise<void> {
  const turso = getTursoClient();
  if (turso) {
    try {
      await ensureSuiteSchema();
      await turso.execute({
        sql: "UPDATE suite_photos SET approved = ? WHERE id = ? AND event_id = ?;",
        args: [approved ? 1 : 0, photoId, eventId],
      });
      return;
    } catch (err) {
      console.error("Turso error in updatePhotoStatus:", err);
    }
  }

  // Fallback to JSON
  try {
    const photos = await getEventPhotos(eventId);
    const p = photos.find((x) => x.id === photoId);
    if (p) {
      p.approved = approved;
      fs.writeFileSync(getPhotosFilePath(eventId), JSON.stringify(photos, null, 2), "utf-8");
    }
  } catch (err) {
    console.error("Fallback error in updatePhotoStatus:", err);
  }
}

export async function deletePhoto(eventId: string, photoId: string): Promise<void> {
  const turso = getTursoClient();
  if (turso) {
    try {
      await ensureSuiteSchema();
      await turso.execute({
        sql: "DELETE FROM suite_photos WHERE id = ? AND event_id = ?;",
        args: [photoId, eventId],
      });
      return;
    } catch (err) {
      console.error("Turso error in deletePhoto:", err);
    }
  }

  // Fallback to JSON
  try {
    let photos = await getEventPhotos(eventId);
    photos = photos.filter((x) => x.id !== photoId);
    fs.writeFileSync(getPhotosFilePath(eventId), JSON.stringify(photos, null, 2), "utf-8");
  } catch (err) {
    console.error("Fallback error in deletePhoto:", err);
  }
}
