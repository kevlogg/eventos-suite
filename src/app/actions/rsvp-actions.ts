"use server";

import { revalidatePath } from "next/cache";
import { RsvpFormSchema } from "@/lib/schemas/rsvp.schema";
import { addRsvp } from "@/modules/invitacion/services/rsvp-service";
import { getEventBySlug } from "@/lib/events-service";

export interface RsvpActionState {
  status: "idle" | "success" | "error";
  errors?: Partial<Record<string, string[]>>;
  message?: string;
}

export async function submitRsvp(
  _prevState: RsvpActionState,
  formData: FormData
): Promise<RsvpActionState> {
  const companionNamesRaw = formData.getAll("companionNames");
  const companionNames = companionNamesRaw
    .map((v) => (typeof v === "string" ? v.trim() : ""))
    .filter((v) => v.length > 0);

  const invitationSlug = String(formData.get("invitationSlug") || "").trim().toLowerCase();

  const raw = {
    invitationSlug: invitationSlug || "demo-fiesta",
    name: formData.get("name"),
    attending: formData.get("attending") ?? "yes",
    companionsCount: formData.get("companionsCount") ?? 0,
    companionNames: companionNames.length > 0 ? companionNames : undefined,
    dietaryRestrictions: formData.get("dietaryRestrictions"),
    message: formData.get("message"),
  };

  const parsed = RsvpFormSchema.safeParse(raw);

  if (!parsed.success) {
    const fieldErrors: Partial<Record<string, string[]>> = {};
    for (const [key, issues] of Object.entries(parsed.error.flatten().fieldErrors)) {
      fieldErrors[key] = issues;
    }
    return {
      status: "error",
      errors: fieldErrors,
      message: "Por favor corregí los errores en el formulario.",
    };
  }

  try {
    // Find matching event
    let eventId = "evt-demo-1";
    if (invitationSlug) {
      const evt = await getEventBySlug(invitationSlug);
      if (evt) {
        eventId = evt.id;
      }
    }

    const companionStr = companionNames.join(", ");

    await addRsvp(eventId, {
      guestName: parsed.data.name,
      attending: parsed.data.attending === "yes",
      companionsCount: parsed.data.companionsCount,
      companionNames: companionStr || undefined,
      dietaryRestrictions: parsed.data.dietaryRestrictions !== "ninguna" ? parsed.data.dietaryRestrictions : undefined,
      message: parsed.data.message || undefined,
    });

    revalidatePath(`/${invitationSlug}`);
    revalidatePath(`/admin`);
    revalidatePath(`/superadmin`);

    return {
      status: "success",
      message: "¡Gracias! Tu confirmación fue recibida. ¡Nos vemos en la fiesta! 🎉",
    };
  } catch (err) {
    console.error("Error creating RSVP in suite:", err);
    return {
      status: "error",
      message: "Ocurrió un error al guardar tu confirmación. Por favor intentá de nuevo.",
    };
  }
}

