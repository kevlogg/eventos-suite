"use server";

import { redirect } from "next/navigation";
import { setSuperadminSession, clearSuperadminSession, timingSafePasswordCheck } from "@/lib/auth";
import { createEvent } from "@/lib/events-service";
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
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const date = formData.get("date") as string;
  const location = formData.get("location") as string;

  const hasInvitacion = formData.get("mod_invitacion") === "on";
  const hasTrivia = formData.get("mod_trivia") === "on";
  const hasFotos = formData.get("mod_fotos") === "on";

  if (!title || !slug || !date) {
    return { error: "Por favor completá los campos obligatorios." };
  }

  try {
    await createEvent({
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

  revalidatePath("/superadmin");
  redirect("/superadmin");
}

