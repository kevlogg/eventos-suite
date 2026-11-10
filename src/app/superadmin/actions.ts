"use server";

import { redirect } from "next/navigation";
import { setSuperadminSession, clearSuperadminSession, timingSafePasswordCheck } from "@/lib/auth";
import { createEvent, updateEvent } from "@/lib/events-service";
import { saveInvitation, getInvitationBySlug, getInvitationByEventId } from "@/modules/invitacion/services/invitation-service";
import type { TemplateId } from "@/lib/schemas/invitation.schema";
import { revalidatePath } from "next/cache";

export async function loginSuperadmin(formData: FormData) {
  const password = formData.get("password") as string;
  if (!password || !timingSafePasswordCheck(password)) {
    return { error: "Contraseña incorrecta" };
  }

  await setSuperadminSession();
  redirect("/superadmin");
}

export async function logoutSuperadmin() {
  await clearSuperadminSession();
  redirect("/superadmin");
}

export async function handleCreateEvent(formData: FormData) {
  const title = (formData.get("title") as string)?.trim();
  const slug = (formData.get("slug") as string)?.trim().toLowerCase();
  const date = (formData.get("date") as string)?.trim();
  const location = (formData.get("location") as string)?.trim() || "";

  const hasInvitacion = formData.get("mod_invitacion") === "on" || formData.get("mod_invitacion") === "true";
  const hasTrivia = formData.get("mod_trivia") === "on" || formData.get("mod_trivia") === "true";
  const hasFotos = formData.get("mod_fotos") === "on" || formData.get("mod_fotos") === "true";

  if (!title || !slug || !date) {
    return { error: "Por favor completá los campos obligatorios." };
  }

  let newEvent;
  try {
    newEvent = await createEvent({
      title,
      slug,
      date,
      location,
      enabledModules: {
        invitacion: hasInvitacion,
        trivia: hasTrivia,
        fotos: hasFotos,
      },
    });
  } catch (err: unknown) {
    console.error("Error creating event:", err);
    return {
      error:
        err instanceof Error
          ? err.message
          : "Error al guardar el evento en la base de datos.",
    };
  }

  // If invitation is enabled, create and link invitation record with template & configs
  if (hasInvitacion && newEvent) {
    try {
      const template = (String(formData.get("template") || "classic-gold").trim() as TemplateId);
      const isWedding = template.startsWith("boda");

      const personName = (formData.get("personName") as string)?.trim() || title;
      const headline = (formData.get("headline") as string)?.trim() || (isWedding ? "¡Nos Casamos!" : title);
      const subheadline = (formData.get("subheadline") as string)?.trim() || "¡Acompañanos a celebrar este momento tan especial!";
      const eventNumber = (formData.get("eventNumber") as string)?.trim() || "";
      const badgeText = (formData.get("badgeText") as string)?.trim() || `${date} · 20:30 hs`;
      const targetDate = (formData.get("targetDate") as string)?.trim() || `${date}T20:30:00-03:00`;
      const venueName = (formData.get("venueName") as string)?.trim() || location || "Salón de Eventos";
      const venueAddress = (formData.get("venueAddress") as string)?.trim() || location || "";
      const venueMapsUrl = (formData.get("venueMapsUrl") as string)?.trim() || "";
      const venueCalendarUrl = (formData.get("venueCalendarUrl") as string)?.trim() || "";
      const giftBankName = (formData.get("giftBankName") as string)?.trim() || "";
      const giftAlias = (formData.get("giftAlias") as string)?.trim() || "";
      const giftCbu = (formData.get("giftCbu") as string)?.trim() || "";
      const giftHolderName = (formData.get("giftHolderName") as string)?.trim() || "";
      const audioTrackPath = (formData.get("audioTrackPath") as string)?.trim() || "/audio/celebration.mp3";
      const footerPhrase = (formData.get("footerPhrase") as string)?.trim() || "Tu presencia es nuestro mejor regalo. ¡Nos vemos en la fiesta! 🥂";
      const carouselImages = (formData.get("carouselImages") as string)?.trim() || "";
      const allowCompanions = formData.get("allowCompanions") === "true" || formData.get("allowCompanions") === "on";
      const allowDietary = formData.get("allowDietary") === "true" || formData.get("allowDietary") === "on";

      await saveInvitation(newEvent.id, newEvent.slug, {
        personName,
        headline,
        subheadline,
        eventNumber,
        badgeText,
        targetDate,
        venueName,
        venueAddress,
        venueMapsUrl,
        venueCalendarUrl,
        giftBankName,
        giftAlias,
        giftCbu,
        giftHolderName,
        audioTrackPath,
        footerPhrase,
        carouselImages,
        template,
        allowCompanions,
        allowDietary,
      });
    } catch (invErr) {
      console.error("Warning: failed to initialize invitation record:", invErr);
    }
  }

  revalidatePath("/superadmin");
  redirect("/superadmin");
}

export async function handleSaveInvitationAction(
  eventId: string,
  slug: string,
  formData: FormData
) {
  try {
    const template = (String(formData.get("template") || "classic-gold").trim() as TemplateId);
    const personName = (formData.get("personName") as string)?.trim() || "";
    const headline = (formData.get("headline") as string)?.trim() || "";
    const subheadline = (formData.get("subheadline") as string)?.trim() || "";
    const eventNumber = (formData.get("eventNumber") as string)?.trim() || "";
    const badgeText = (formData.get("badgeText") as string)?.trim() || "";
    const targetDate = (formData.get("targetDate") as string)?.trim() || "";
    const venueName = (formData.get("venueName") as string)?.trim() || "";
    const venueAddress = (formData.get("venueAddress") as string)?.trim() || "";
    const venueMapsUrl = (formData.get("venueMapsUrl") as string)?.trim() || "";
    const venueCalendarUrl = (formData.get("venueCalendarUrl") as string)?.trim() || "";
    const giftBankName = (formData.get("giftBankName") as string)?.trim() || "";
    const giftAlias = (formData.get("giftAlias") as string)?.trim() || "";
    const giftCbu = (formData.get("giftCbu") as string)?.trim() || "";
    const giftHolderName = (formData.get("giftHolderName") as string)?.trim() || "";
    const audioTrackPath = (formData.get("audioTrackPath") as string)?.trim() || "";
    const footerPhrase = (formData.get("footerPhrase") as string)?.trim() || "";
    const carouselImages = (formData.get("carouselImages") as string)?.trim() || "";
    const allowCompanions = formData.get("allowCompanions") === "true" || formData.get("allowCompanions") === "on";
    const allowDietary = formData.get("allowDietary") === "true" || formData.get("allowDietary") === "on";

    const saved = await saveInvitation(eventId, slug, {
      personName,
      headline,
      subheadline,
      eventNumber,
      badgeText,
      targetDate,
      venueName,
      venueAddress,
      venueMapsUrl,
      venueCalendarUrl,
      giftBankName,
      giftAlias,
      giftCbu,
      giftHolderName,
      audioTrackPath,
      footerPhrase,
      carouselImages,
      template,
      allowCompanions,
      allowDietary,
    });

    revalidatePath("/superadmin");
    revalidatePath(`/${slug}`);
    revalidatePath(`/admin`);

    return {
      success: true,
      message: `¡Invitación '${saved.headline}' guardada exitosamente!`,
      invitation: saved,
    };
  } catch (err: unknown) {
    console.error("Error saving invitation:", err);
    return {
      success: false,
      error: err instanceof Error ? err.message : "Error al guardar la invitación.",
    };
  }
}

export async function handleUpdateEventServices(
  eventId: string,
  data: {
    title?: string;
    date?: string;
    location?: string;
    enabledModules: {
      invitacion: boolean;
      trivia: boolean;
      fotos: boolean;
    };
  }
) {
  try {
    const updated = await updateEvent(eventId, data);
    if (!updated) {
      return { success: false, error: "No se encontró el evento para actualizar." };
    }

    revalidatePath("/superadmin");
    revalidatePath(`/admin/${updated.adminToken}`);
    revalidatePath(`/${updated.slug}`);

    return {
      success: true,
      message: `¡Servicios de '${updated.title}' actualizados correctamente!`,
      event: updated,
    };
  } catch (err: unknown) {
    console.error("Error in handleUpdateEventServices:", err);
    return {
      success: false,
      error: err instanceof Error ? err.message : "Error al actualizar los servicios del evento.",
    };
  }
}



