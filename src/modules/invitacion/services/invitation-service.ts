import fs from "fs";
import path from "path";
import os from "os";
import { getTursoClient, ensureSuiteSchema } from "@/lib/turso";
import type { InvitationRecord, TemplateId } from "@/lib/schemas/invitation.schema";
import { getEventBySlug, getEventByToken } from "@/lib/events-service";

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

function getInvitationsFilePath(): string {
  return path.join(getDataDir(), "invitations.json");
}

function ensureFallbackStorage(): void {
  const filePath = getInvitationsFilePath();
  if (!fs.existsSync(filePath)) {
    const seedInvitations: InvitationRecord[] = [
      {
        id: "inv-demo-1",
        slug: "demo-fiesta",
        personName: "Sofi & Nico",
        headline: "¡Nos Casamos!",
        subheadline: "Acompañanos a celebrar una noche mágica llena de amor y alegría 💍",
        eventNumber: "",
        badgeText: "Sábado · 15 de Diciembre · 20:30 hs",
        targetDate: "2026-12-15T20:30:00-03:00",
        venueName: "Salón Los Robles",
        venueAddress: "Av. Las Magnolias 1200, Pilar, Buenos Aires",
        venueMapsUrl: "https://maps.google.com/?q=Pilar+Buenos+Aires",
        venueCalendarUrl: "",
        giftBankName: "Mercado Pago / Banco Galicia",
        giftAlias: "BODA.SOFI.NICO",
        giftCbu: "0000003100062663052871",
        giftHolderName: "Sofía & Nicolás",
        audioTrackPath: "/audio/celebration.mp3",
        footerPhrase: "Tu presencia es nuestro mejor regalo. ¡Nos vemos en la pista! 🥂",
        carouselImages: "",
        template: "boda-botanica",
        allowCompanions: true,
        allowDietary: true,
        isDefault: true,
        createdAt: "2026-11-08T17:28:16.208Z",
        updatedAt: "2026-11-08T17:28:16.216Z",
      },
    ];
    try {
      fs.writeFileSync(filePath, JSON.stringify(seedInvitations, null, 2), "utf-8");
    } catch {
      // ignore in read-only environments
    }
  }
}

function rowToInvitation(row: Record<string, unknown>): InvitationRecord {
  return {
    id: String(row.id),
    slug: String(row.slug),
    personName: String(row.person_name ?? row.personName ?? ""),
    headline: String(row.headline ?? ""),
    subheadline: String(row.subheadline ?? ""),
    eventNumber: String(row.event_number ?? row.eventNumber ?? ""),
    badgeText: String(row.badge_text ?? row.badgeText ?? ""),
    targetDate: String(row.target_date ?? row.targetDate ?? ""),
    venueName: String(row.venue_name ?? row.venueName ?? ""),
    venueAddress: String(row.venue_address ?? row.venueAddress ?? ""),
    venueMapsUrl: String(row.venue_maps_url ?? row.venueMapsUrl ?? ""),
    venueCalendarUrl: String(row.venue_calendar_url ?? row.venueCalendarUrl ?? ""),
    giftBankName: String(row.gift_bank_name ?? row.giftBankName ?? ""),
    giftAlias: String(row.gift_alias ?? row.giftAlias ?? ""),
    giftCbu: String(row.gift_cbu ?? row.giftCbu ?? ""),
    giftHolderName: String(row.gift_holder_name ?? row.giftHolderName ?? ""),
    audioTrackPath: String(row.audio_track_path ?? row.audioTrackPath ?? ""),
    footerPhrase: String(row.footer_phrase ?? row.footerPhrase ?? ""),
    carouselImages: String(row.carousel_images ?? row.carouselImages ?? ""),
    template: ((row.template as string) || "classic-gold") as TemplateId,
    allowCompanions: Number(row.allow_companions ?? row.allowCompanions ?? 1) === 1,
    allowDietary: Number(row.allow_dietary ?? row.allowDietary ?? 1) === 1,
    isDefault: Number(row.is_default ?? row.isDefault ?? 0) === 1,
    clientToken: row.client_token || row.clientToken ? String(row.client_token || row.clientToken) : undefined,
    createdAt: String(row.created_at ?? row.createdAt ?? new Date().toISOString()),
    updatedAt: String(row.updated_at ?? row.updatedAt ?? new Date().toISOString()),
  };
}

export function createDefaultInvitationFromEvent(
  event: { id: string; slug: string; title: string; date: string; location?: string },
  template: TemplateId = "classic-gold"
): InvitationRecord {
  const isWedding = template.startsWith("boda");
  const targetIso = event.date.includes("T") ? event.date : `${event.date}T20:30:00-03:00`;
  const [year, month, day] = event.date.split("T")[0].split("-");
  const badgeDate = year && month && day ? `${day}/${month}/${year} · 20:30 hs` : event.date;

  return {
    id: `inv_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`,
    slug: event.slug,
    personName: event.title,
    headline: isWedding ? "¡Nos Casamos!" : event.title,
    subheadline: isWedding
      ? "Acompañanos a celebrar el comienzo de nuestra nueva historia juntos 💍"
      : "¡Te esperamos para compartir una noche inolvidable!",
    eventNumber: isWedding ? "" : "",
    badgeText: badgeDate,
    targetDate: targetIso,
    venueName: event.location || "Salón de Eventos",
    venueAddress: event.location || "",
    venueMapsUrl: "",
    venueCalendarUrl: "",
    giftBankName: "",
    giftAlias: "",
    giftCbu: "",
    giftHolderName: "",
    audioTrackPath: "/audio/celebration.mp3",
    footerPhrase: "Tu presencia es nuestro mejor regalo. ¡Vení a disfrutar sin mirar el reloj! 🥂",
    carouselImages: "",
    template,
    allowCompanions: true,
    allowDietary: true,
    isDefault: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

export async function getInvitationBySlug(slug: string): Promise<InvitationRecord | null> {
  const cleanSlug = slug.toLowerCase().trim();
  const turso = getTursoClient();
  if (turso) {
    try {
      await ensureSuiteSchema();
      const res = await turso.execute({
        sql: "SELECT * FROM suite_invitations WHERE LOWER(slug) = ? LIMIT 1;",
        args: [cleanSlug],
      });
      if (res.rows.length > 0) {
        return rowToInvitation(res.rows[0] as Record<string, unknown>);
      }
    } catch (err) {
      console.error("Turso error in getInvitationBySlug, falling back to JSON:", err);
    }
  }

  // Fallback to JSON
  ensureFallbackStorage();
  try {
    const raw = fs.readFileSync(getInvitationsFilePath(), "utf-8").replace(/^\uFEFF/, "");
    const list: InvitationRecord[] = JSON.parse(raw);
    const match = list.find((i) => i.slug.toLowerCase() === cleanSlug);
    if (match) return match;
  } catch (err) {
    console.error("Fallback error in getInvitationBySlug:", err);
  }

  // If not found in invitations table, check if suite_event exists and generate default
  const evt = await getEventBySlug(cleanSlug);
  if (evt && evt.enabledModules.invitacion) {
    const defaultInv = createDefaultInvitationFromEvent(evt);
    return defaultInv;
  }

  return null;
}

export async function getAllInvitations(): Promise<InvitationRecord[]> {
  const turso = getTursoClient();
  if (turso) {
    try {
      await ensureSuiteSchema();
      const res = await turso.execute("SELECT * FROM suite_invitations ORDER BY created_at DESC;");
      if (res.rows.length > 0) {
        return res.rows.map((r) => rowToInvitation(r as Record<string, unknown>));
      }
    } catch (err) {
      console.error("Turso error in getAllInvitations:", err);
    }
  }

  // Fallback to JSON
  ensureFallbackStorage();
  try {
    const raw = fs.readFileSync(getInvitationsFilePath(), "utf-8").replace(/^\uFEFF/, "");
    const list = JSON.parse(raw);
    return Array.isArray(list) ? list : [];
  } catch (err) {
    console.error("Fallback error in getAllInvitations:", err);
    return [];
  }
}

export async function getInvitationByEventId(eventId: string): Promise<InvitationRecord | null> {
  const turso = getTursoClient();
  if (turso) {
    try {
      await ensureSuiteSchema();
      const res = await turso.execute({
        sql: "SELECT * FROM suite_invitations WHERE event_id = ? LIMIT 1;",
        args: [eventId],
      });
      if (res.rows.length > 0) {
        return rowToInvitation(res.rows[0] as Record<string, unknown>);
      }
    } catch (err) {
      console.error("Turso error in getInvitationByEventId:", err);
    }
  }

  // Fallback to JSON
  ensureFallbackStorage();
  try {
    const raw = fs.readFileSync(getInvitationsFilePath(), "utf-8").replace(/^\uFEFF/, "");
    const list = JSON.parse(raw);
    const match = list.find((i: InvitationRecord & { eventId?: string }) => i.id === eventId || (i as any).eventId === eventId);
    if (match) return match;
  } catch (err) {
    console.error("Fallback error in getInvitationByEventId:", err);
  }

  return null;
}

export async function saveInvitation(
  eventId: string,
  slug: string,
  data: Partial<InvitationRecord>
): Promise<InvitationRecord> {
  const now = new Date().toISOString();
  const cleanSlug = slug.toLowerCase().trim();

  // Find existing to merge
  let existing = await getInvitationBySlug(cleanSlug);
  if (!existing) {
    existing = await getInvitationByEventId(eventId);
  }

  const record: InvitationRecord = {
    id: existing?.id || `inv_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`,
    slug: cleanSlug,
    personName: data.personName ?? existing?.personName ?? "",
    headline: data.headline ?? existing?.headline ?? "",
    subheadline: data.subheadline ?? existing?.subheadline ?? "",
    eventNumber: data.eventNumber ?? existing?.eventNumber ?? "",
    badgeText: data.badgeText ?? existing?.badgeText ?? "",
    targetDate: data.targetDate ?? existing?.targetDate ?? now,
    venueName: data.venueName ?? existing?.venueName ?? "",
    venueAddress: data.venueAddress ?? existing?.venueAddress ?? "",
    venueMapsUrl: data.venueMapsUrl ?? existing?.venueMapsUrl ?? "",
    venueCalendarUrl: data.venueCalendarUrl ?? existing?.venueCalendarUrl ?? "",
    giftBankName: data.giftBankName ?? existing?.giftBankName ?? "",
    giftAlias: data.giftAlias ?? existing?.giftAlias ?? "",
    giftCbu: data.giftCbu ?? existing?.giftCbu ?? "",
    giftHolderName: data.giftHolderName ?? existing?.giftHolderName ?? "",
    audioTrackPath: data.audioTrackPath ?? existing?.audioTrackPath ?? "",
    footerPhrase: data.footerPhrase ?? existing?.footerPhrase ?? "",
    carouselImages: data.carouselImages ?? existing?.carouselImages ?? "",
    template: (data.template as TemplateId) || existing?.template || "classic-gold",
    allowCompanions: data.allowCompanions ?? existing?.allowCompanions ?? true,
    allowDietary: data.allowDietary ?? existing?.allowDietary ?? true,
    isDefault: data.isDefault ?? existing?.isDefault ?? false,
    clientToken: data.clientToken ?? existing?.clientToken,
    createdAt: existing?.createdAt || now,
    updatedAt: now,
  };

  const turso = getTursoClient();
  if (turso) {
    try {
      await ensureSuiteSchema();
      await turso.execute({
        sql: `
          INSERT INTO suite_invitations (
            id, event_id, slug, person_name, headline, subheadline, event_number,
            badge_text, target_date, venue_name, venue_address, venue_maps_url,
            venue_calendar_url, gift_bank_name, gift_alias, gift_cbu,
            gift_holder_name, audio_track_path, footer_phrase, carousel_images,
            template, allow_companions, allow_dietary, is_default, created_at, updated_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          ON CONFLICT(slug) DO UPDATE SET
            event_id = excluded.event_id,
            person_name = excluded.person_name,
            headline = excluded.headline,
            subheadline = excluded.subheadline,
            event_number = excluded.event_number,
            badge_text = excluded.badge_text,
            target_date = excluded.target_date,
            venue_name = excluded.venue_name,
            venue_address = excluded.venue_address,
            venue_maps_url = excluded.venue_maps_url,
            venue_calendar_url = excluded.venue_calendar_url,
            gift_bank_name = excluded.gift_bank_name,
            gift_alias = excluded.gift_alias,
            gift_cbu = excluded.gift_cbu,
            gift_holder_name = excluded.gift_holder_name,
            audio_track_path = excluded.audio_track_path,
            footer_phrase = excluded.footer_phrase,
            carousel_images = excluded.carousel_images,
            template = excluded.template,
            allow_companions = excluded.allow_companions,
            allow_dietary = excluded.allow_dietary,
            is_default = excluded.is_default,
            updated_at = excluded.updated_at;
        `,
        args: [
          record.id,
          eventId,
          record.slug,
          record.personName,
          record.headline,
          record.subheadline,
          record.eventNumber || "",
          record.badgeText,
          record.targetDate,
          record.venueName,
          record.venueAddress,
          record.venueMapsUrl || "",
          record.venueCalendarUrl || "",
          record.giftBankName || "",
          record.giftAlias || "",
          record.giftCbu || "",
          record.giftHolderName || "",
          record.audioTrackPath || "",
          record.footerPhrase || "",
          record.carouselImages || "",
          record.template,
          record.allowCompanions ? 1 : 0,
          record.allowDietary ? 1 : 0,
          record.isDefault ? 1 : 0,
          record.createdAt,
          record.updatedAt,
        ],
      });
      return record;
    } catch (err) {
      console.error("Turso error in saveInvitation, falling back to JSON:", err);
    }
  }

  // Fallback to JSON
  ensureFallbackStorage();
  try {
    const raw = fs.readFileSync(getInvitationsFilePath(), "utf-8").replace(/^\uFEFF/, "");
    const list: (InvitationRecord & { eventId?: string })[] = JSON.parse(raw);
    const index = list.findIndex((i) => i.slug.toLowerCase() === cleanSlug || i.id === record.id || i.eventId === eventId);
    const extendedRecord = { ...record, eventId };
    if (index >= 0) {
      list[index] = extendedRecord;
    } else {
      list.unshift(extendedRecord);
    }
    fs.writeFileSync(getInvitationsFilePath(), JSON.stringify(list, null, 2), "utf-8");
  } catch (err) {
    console.error("Fallback error in saveInvitation:", err);
  }

  return record;
}
