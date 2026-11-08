import fs from "fs";
import path from "path";
import { TriviaQuestion, TriviaPlayer } from "@/types";

const dataDir = path.join(process.cwd(), "data");

function getTriviaFilePath(eventId: string): string {
  if (!fs.existsSync(dataDir)) {
    try {
      fs.mkdirSync(dataDir, { recursive: true });
    } catch {
      // ignore
    }
  }
  return path.join(dataDir, `trivia_${eventId}.json`);
}

interface TriviaStore {
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
    options: ["A las cucarachas voladoras", "A quedarse sin batería en el celular", "A las alturas", "A los payasos"],
    correctIndex: 0,
    explanation: "¡Aparece una cucaracha volando y corre más rápido que Usain Bolt!",
  },
  {
    orderNum: 3,
    question: "¿Cuál es su bebida o trago predilecto para arrancar la fiesta?",
    options: ["Fernet con Coca bien espumoso", "Cerveza rubia bien helada", "Gin Tonic con frutos rojos", "Vino Malbec"],
    correctIndex: 0,
    explanation: "¡El 70/30 con hielo hasta el tope es su marca registrada!",
  },
  {
    orderNum: 4,
    question: "¿Qué suele hacer siempre cuando suena su tema favorito en la pista?",
    options: [
      "Canta a los gritos abrazando a quien tenga al lado",
      "Va al medio a tirar sus pasos prohibidos",
      "Saca el celular para filmar stories",
      "Va a la barra a pedir otro trago",
    ],
    correctIndex: 0,
    explanation: "¡Se transforma en cantante de recital y deja la garganta en el tema!",
  },
  {
    orderNum: 5,
    question: "¿Cuál es su mayor talento oculto que pocos conocen?",
    options: [
      "Imitar voces y personajes",
      "Cocinar el mejor chimichurri casero",
      "Recordar anécdotas de hace 15 años",
      "Armar playlists temáticas perfectas",
    ],
    correctIndex: 0,
    explanation: "¡Las imitaciones en reuniones son de nivel profesional!",
  },
];

export function getTriviaData(eventId: string): TriviaStore {
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
          firstName: "Lucas",
          lastName: "Mendoza",
          avatar: "🔥",
          score: 450,
          totalTimeMs: 12500,
          isFinished: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "ply-2",
          eventId,
          firstName: "Camila",
          lastName: "Rossi",
          avatar: "🥳",
          score: 380,
          totalTimeMs: 14200,
          isFinished: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
    };
    fs.writeFileSync(filePath, JSON.stringify(initial, null, 2), "utf-8");
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

export function saveTriviaQuestions(eventId: string, questions: TriviaQuestion[], timerSeconds?: number): void {
  const data = getTriviaData(eventId);
  data.questions = questions;
  if (timerSeconds) data.timerSeconds = timerSeconds;
  fs.writeFileSync(getTriviaFilePath(eventId), JSON.stringify(data, null, 2), "utf-8");
}

export function resetTriviaPlayers(eventId: string): void {
  const data = getTriviaData(eventId);
  data.players = [];
  data.status = "idle";
  fs.writeFileSync(getTriviaFilePath(eventId), JSON.stringify(data, null, 2), "utf-8");
}

export function registerPlayer(
  eventId: string,
  firstName: string,
  lastName: string,
  avatar: string
): TriviaPlayer {
  const data = getTriviaData(eventId);
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

  data.players.push(newPlayer);
  fs.writeFileSync(getTriviaFilePath(eventId), JSON.stringify(data, null, 2), "utf-8");
  return newPlayer;
}

export function recordPlayerScore(
  eventId: string,
  playerId: string,
  addedScore: number,
  timeMs: number,
  isFinal: boolean
): TriviaPlayer | null {
  const data = getTriviaData(eventId);
  const player = data.players.find((p) => p.id === playerId);
  if (!player) return null;

  player.score += addedScore;
  player.totalTimeMs += timeMs;
  if (isFinal) {
    player.isFinished = true;
  }
  player.updatedAt = new Date().toISOString();

  fs.writeFileSync(getTriviaFilePath(eventId), JSON.stringify(data, null, 2), "utf-8");
  return player;
}
