import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { isSuperadminAuthenticated } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const isAuth = await isSuperadminAuthenticated();
    if (!isAuth) {
      return NextResponse.json({ error: "No autorizado para subir audio" }, { status: 401 });
    }

    const body = await req.json();
    const { fileName, fileType, slug } = body;

    if (!fileName) {
      return NextResponse.json({ error: "fileName es obligatorio" }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    if (!supabase) {
      return NextResponse.json(
        { error: "El servicio de almacenamiento en la nube no está configurado." },
        { status: 500 }
      );
    }

    // Sanitize slug and extension
    const cleanSlug = (slug || "audio").toLowerCase().replace(/[^a-z0-9-]/g, "");
    const parts = fileName.split(".");
    const rawExt = parts.length > 1 ? parts.pop() : "mp3";
    const cleanExt = (rawExt || "mp3").toLowerCase().replace(/[^a-z0-9]/g, "");

    const storagePath = `${cleanSlug}/${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${cleanExt}`;

    // Generate signed upload URL with 15-minute expiration
    const { data, error } = await supabase.storage
      .from("event-audio")
      .createSignedUploadUrl(storagePath, {
        upsert: true,
      });

    if (error || !data) {
      console.error("Error creating signed upload URL:", error);
      return NextResponse.json(
        { error: error?.message || "No se pudo generar la URL de subida." },
        { status: 500 }
      );
    }

    const { data: pubData } = supabase.storage
      .from("event-audio")
      .getPublicUrl(storagePath);

    return NextResponse.json({
      success: true,
      signedUrl: data.signedUrl,
      publicUrl: pubData.publicUrl,
      path: storagePath,
    });
  } catch (err: unknown) {
    console.error("Error in POST /api/audio/signed-url:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Error interno del servidor" },
      { status: 500 }
    );
  }
}

