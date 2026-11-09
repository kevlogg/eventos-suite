import fs from "fs";
import path from "path";
import os from "os";
import { TriviaQuestion, TriviaPlayer } from "@/types";
import { getTursoClient, ensureSuiteSchema } from "@/lib/turso";

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

function getTriviaFilePath(eventId: string): string {
  const dir = getDataDir();
  return path.join(dir, `trivia_${eventId}.json`);
}

export interface TriviaStore {
  timerSeconds: number;
  status: "idle" | "active" | "finished";
  questions: TriviaQuestion[];
  players: TriviaPlayer[];
}

const DEFAULT_QUESTIONS = [
  {
    orderNum: 1,
    question: "¿Dónde y cómo se conocieron los agasajados?",
    options: ["En un boliche un sábado", "En la facultad / universidad", "Por amigos en común", "Por una app de citas"],
    correctIndex: 2,
    explanation: "¡Un asado de amigos en común fue el inicio de esta historia!",
  },
  {
    orderNum: 2,
    question: "¿Qué fobia o miedo secreto confiesa cuando entra en confianza?",
    options: ["A las cucarachas voladoras", "A las alturas / montañas rusas", "A la oscuridad absoluta", "A los payasos"],
    correctIndex: 0,
    explanation: "¡Pánico total cuando una cucaracha abre las alas!",
  },
  {
    orderNum: 3,
    question: "¿Cuál es el destino de vacaciones soñado que todavía no visitaron?",
    options: ["Playas de Tailandia", "Costa Amalfitana (Italia)", "Tokio (Japón)", "Bora Bora (Polinesia)"],
    correctIndex: 1,
    explanation: "¡Recorrer los pueblitos italianos en auto comiendo pasta!",
  },
  {
    orderNum: 4,
    question: "¿Quién es más probable que se quede dormido/a en una película?",
    options: ["Siempre el novio / agasajado", "Siempre la novia / agasajada", "Ambos por igual a los 10 minutos", "Ninguno, son cinéfilos"],
    correctIndex: 0,
    explanation: "Apenas apagan la luz, empieza a cabecear.",
  },
  {
    orderNum: 5,
    question: "¿Cuál es su comida / delivery infalible de un domingo a la noche?",
    options: ["Pizza a la piedra", "Sushi variado", "Hamburguesas con papas", "Empanadas de carne cortada a cuchillo"],
    correctIndex: 2,
    explanation: "¡Una buena smash burger con fritas no falla nunca!",
  },
];

export async function getTriviaData(eventId: string): Promise<TriviaStore> {
  const turso = getTursoClient();
  if (turso) {
    try {
      await ensureSuiteSchema();

      // 1. Fetch questions
      const qRes = await turso.execute({
        sql: "SELECT * FROM suite_trivia_questions WHERE event_id = ? ORDER BY order_num ASC;",
        args: [eventId],
      });

      let questions: TriviaQuestion[] = [];
      if (qRes.rows.length === 0) {
        // Seed default questions into Turso for this event
        for (const dq of DEFAULT_QUESTIONS) {
          await turso.execute({
            sql: `INSERT INTO suite_trivia_questions (event_id, order_num, question, options, correct_index, explanation)
                  VALUES (?, ?, ?, ?, ?, ?);`,
            args: [
              eventId,
              dq.orderNum,
              dq.question,
              JSON.stringify(dq.options),
              dq.correctIndex,
              dq.explanation,
            ],
          });
        }
        const seededRes = await turso.execute({
          sql: "SELECT * FROM suite_trivia_questions WHERE event_id = ? ORDER BY order_num ASC;",
          args: [eventId],
        });
        questions = seededRes.rows.map(mapRowToQuestion);
      } else {
        questions = qRes.rows.map(mapRowToQuestion);
      }

      // 2. Fetch players
      const pRes = await turso.execute({
        sql: "SELECT * FROM suite_trivia_players WHERE event_id = ? ORDER BY score DESC, total_time_ms ASC;",
        args: [eventId],
      });
      const players: TriviaPlayer[] = pRes.rows.map(mapRowToPlayer);

      return {
        timerSeconds: 15,
        status: "active",
        questions,
        players,
      };
    } catch (err) {
      console.error("Turso error in getTriviaData, falling back:", err);
    }
  }

  // Fallback to JSON
  const filePath = getTriviaFilePath(eventId);
  if (!fs.existsSync(filePath)) {
    const initial: TriviaStore = {
      timerSeconds: 15,
      status: "idle",
      questions: DEFAULT_QUESTIONS.map((q, idx) => ({
        id: idx + 1,
        eventId,
        ...q,
      })),
      players: [
        {
          id: "ply-1",
          eventId,
          firstName: "Martín",
          lastName: "Gómez",
          avatar: "😎",
          score: 450,
          totalTimeMs: 12500,
          isFinished: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
    };
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
    return {
      timerSeconds: 15,
      status: "idle",
      questions: [],
      players: [],
    };
  }
}

function mapRowToQuestion(r: Record<string, unknown>): TriviaQuestion {
  let options: string[] = [];
  try {
    options = typeof r.options === "string" ? JSON.parse(r.options) : (r.options as string[]) || [];
  } catch {
    options = [];
  }
  return {
    id: Number(r.id),
    eventId: String(r.event_id),
    orderNum: Number(r.order_num),
    question: String(r.question),
    options,
    correctIndex: Number(r.correct_index),
    explanation: String(r.explanation || ""),
  };
}

function mapRowToPlayer(r: Record<string, unknown>): TriviaPlayer {
  return {
    id: String(r.id),
    eventId: String(r.event_id),
    firstName: String(r.first_name),
    lastName: String(r.last_name),
    avatar: String(r.avatar || "🎉"),
    score: Number(r.score || 0),
    totalTimeMs: Number(r.total_time_ms || 0),
    isFinished: Boolean(r.is_finished),
    createdAt: String(r.created_at),
    updatedAt: String(r.updated_at),
  };
}

export async function saveTriviaQuestions(
  eventId: string,
  questions: TriviaQuestion[],
  timerSeconds?: number
): Promise<void> {
  const turso = getTursoClient();
  if (turso) {
    try {
      await ensureSuiteSchema();
      await turso.execute({
        sql: "DELETE FROM suite_trivia_questions WHERE event_id = ?;",
        args: [eventId],
      });
      for (const q of questions) {
        await turso.execute({
          sql: `INSERT INTO suite_trivia_questions (event_id, order_num, question, options, correct_index, explanation)
                VALUES (?, ?, ?, ?, ?, ?);`,
          args: [
            eventId,
            q.orderNum,
            q.question,
            JSON.stringify(q.options),
            q.correctIndex,
            q.explanation || "",
          ],
        });
      }
      return;
    } catch (err) {
      console.error("Turso error in saveTriviaQuestions:", err);
    }
  }

  // Fallback to JSON
  try {
    const data = await getTriviaData(eventId);
    data.questions = questions;
    if (timerSeconds) data.timerSeconds = timerSeconds;
    fs.writeFileSync(getTriviaFilePath(eventId), JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Fallback error in saveTriviaQuestions:", err);
  }
}

export async function resetTriviaPlayers(eventId: string): Promise<void> {
  const turso = getTursoClient();
  if (turso) {
    try {
      await ensureSuiteSchema();
      await turso.execute({
        sql: "DELETE FROM suite_trivia_players WHERE event_id = ?;",
        args: [eventId],
      });
      return;
    } catch (err) {
      console.error("Turso error in resetTriviaPlayers:", err);
    }
  }

  // Fallback to JSON
  try {
    const data = await getTriviaData(eventId);
    data.players = [];
    data.status = "idle";
    fs.writeFileSync(getTriviaFilePath(eventId), JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Fallback error in resetTriviaPlayers:", err);
  }
}

export async function registerPlayer(
  eventId: string,
  firstName: string,
  lastName: string,
  avatar: string
): Promise<TriviaPlayer> {
  const newPlayer: TriviaPlayer = {
    id: "ply_" + Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
    eventId,
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    avatar: avatar || "🎉",
    score: 0,
    totalTimeMs: 0,
    isFinished: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const turso = getTursoClient();
  if (turso) {
    try {
      await ensureSuiteSchema();
      await turso.execute({
        sql: `INSERT INTO suite_trivia_players (
          id, event_id, first_name, last_name, avatar, score, total_time_ms, is_finished, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
        args: [
          newPlayer.id,
          newPlayer.eventId,
          newPlayer.firstName,
          newPlayer.lastName,
          newPlayer.avatar,
          newPlayer.score,
          newPlayer.totalTimeMs,
          newPlayer.isFinished ? 1 : 0,
          newPlayer.createdAt,
          newPlayer.updatedAt,
        ],
      });
      return newPlayer;
    } catch (err) {
      console.error("Turso error in registerPlayer, falling back:", err);
    }
  }

  // Fallback to JSON
  try {
    const data = await getTriviaData(eventId);
    data.players.push(newPlayer);
    fs.writeFileSync(getTriviaFilePath(eventId), JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Fallback error in registerPlayer:", err);
  }

  return newPlayer;
}

export async function recordPlayerScore(
  eventId: string,
  playerId: string,
  addedScore: number,
  timeMs: number,
  isFinal: boolean
): Promise<TriviaPlayer | null> {
  const now = new Date().toISOString();
  const turso = getTursoClient();
  if (turso) {
    try {
      await ensureSuiteSchema();
      await turso.execute({
        sql: `UPDATE suite_trivia_players 
              SET score = score + ?, 
                  total_time_ms = total_time_ms + ?, 
                  is_finished = CASE WHEN ? = 1 THEN 1 ELSE is_finished END,
                  updated_at = ?
              WHERE id = ? AND event_id = ?;`,
        args: [addedScore, timeMs, isFinal ? 1 : 0, now, playerId, eventId],
      });

      const res = await turso.execute({
        sql: "SELECT * FROM suite_trivia_players WHERE id = ? AND event_id = ? LIMIT 1;",
        args: [playerId, eventId],
      });

      if (res.rows.length > 0) {
        return mapRowToPlayer(res.rows[0] as Record<string, unknown>);
      }
    } catch (err) {
      console.error("Turso error in recordPlayerScore, falling back:", err);
    }
  }

  // Fallback to JSON
  try {
    const data = await getTriviaData(eventId);
    const player = data.players.find((p) => p.id === playerId);
    if (!player) return null;

    player.score += addedScore;
    player.totalTimeMs += timeMs;
    if (isFinal) {
      player.isFinished = true;
    }
    player.updatedAt = now;
    fs.writeFileSync(getTriviaFilePath(eventId), JSON.stringify(data, null, 2), "utf-8");
    return player;
  } catch (err) {
    console.error("Fallback error in recordPlayerScore:", err);
    return null;
  }
}
