import { NextRequest, NextResponse } from "next/server";
import { 
  getTriviaData, 
  saveTriviaQuestions, 
  resetTriviaPlayers, 
  registerPlayer, 
  recordPlayerScore 
} from "@/modules/trivia/services/trivia-service";
import { getEventById } from "@/lib/events-service";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const eventId = searchParams.get("eventId");
  if (!eventId) {
    return NextResponse.json({ error: "eventId is required" }, { status: 400 });
  }

  const data = await getTriviaData(eventId);
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, eventId } = body;

    if (!eventId) {
      return NextResponse.json({ error: "eventId is required" }, { status: 400 });
    }

    if (action === "save_questions" || action === "reset_players") {
      const event = await getEventById(eventId);
      if (!event || !body.adminToken || event.adminToken !== body.adminToken) {
        return NextResponse.json({ error: "No autorizado" }, { status: 403 });
      }

      if (action === "save_questions") {
        await saveTriviaQuestions(eventId, body.questions, body.timerSeconds);
        return NextResponse.json({ success: true });
      }

      if (action === "reset_players") {
        await resetTriviaPlayers(eventId);
        return NextResponse.json({ success: true });
      }
    }

    if (action === "register") {
      const player = await registerPlayer(eventId, body.firstName, body.lastName, body.avatar);
      return NextResponse.json({ success: true, player });
    }

    if (action === "submit_score") {
      const updated = await recordPlayerScore(
        eventId,
        body.playerId,
        body.addedScore || 0,
        body.timeMs || 0,
        Boolean(body.isFinal)
      );
      return NextResponse.json({ success: true, player: updated });
    }

    return NextResponse.json({ error: "Acción no reconocida" }, { status: 400 });
  } catch (err) {
    console.error("Error in POST /api/trivia:", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

