import { NextRequest, NextResponse } from "next/server";
import { getRsvps, addRsvp } from "@/modules/invitacion/services/rsvp-service";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const eventId = searchParams.get("eventId");
  if (!eventId) {
    return NextResponse.json({ error: "eventId is required" }, { status: 400 });
  }

  const data = getRsvps(eventId);
  return NextResponse.json({ rsvps: data });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.eventId || !body.guestName || body.attending === undefined) {
      return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
    }

    const saved = addRsvp(body.eventId, {
      guestName: body.guestName,
      attending: Boolean(body.attending),
      companionsCount: Number(body.companionsCount) || 0,
      companionNames: body.companionNames,
      dietaryRestrictions: body.dietaryRestrictions,
      message: body.message,
    });

    return NextResponse.json({ success: true, rsvp: saved });
  } catch (err) {
    console.error("Error in POST /api/rsvp:", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
