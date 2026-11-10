import { NextRequest, NextResponse } from "next/server";
import { 
  getEventPhotos, 
  addEventPhoto, 
  updatePhotoStatus, 
  deletePhoto 
} from "@/modules/fotos/services/fotos-service";
import { getEventById } from "@/lib/events-service";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const eventId = searchParams.get("eventId");
  if (!eventId) {
    return NextResponse.json({ error: "eventId is required" }, { status: 400 });
  }

  const photos = await getEventPhotos(eventId);
  return NextResponse.json({ photos });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, eventId } = body;

    if (!eventId) {
      return NextResponse.json({ error: "eventId is required" }, { status: 400 });
    }

    if (action === "add") {
      if (!body.photoUrl || !body.authorName) {
        return NextResponse.json({ error: "Foto y nombre son obligatorios" }, { status: 400 });
      }
      const saved = await addEventPhoto(eventId, {
        photoUrl: body.photoUrl,
        authorName: body.authorName,
        tableNumber: body.tableNumber ? Number(body.tableNumber) : undefined,
        caption: body.caption,
      });
      return NextResponse.json({ success: true, photo: saved });
    }

    if (action === "moderate" || action === "delete") {
      const event = await getEventById(eventId);
      if (!event || !body.adminToken || event.adminToken !== body.adminToken) {
        return NextResponse.json({ error: "No autorizado" }, { status: 403 });
      }

      if (action === "moderate") {
        await updatePhotoStatus(eventId, body.photoId, Boolean(body.approved));
        return NextResponse.json({ success: true });
      }

      if (action === "delete") {
        await deletePhoto(eventId, body.photoId);
        return NextResponse.json({ success: true });
      }
    }

    return NextResponse.json({ error: "Acción inválida" }, { status: 400 });
  } catch (err) {
    console.error("Error in POST /api/fotos:", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

