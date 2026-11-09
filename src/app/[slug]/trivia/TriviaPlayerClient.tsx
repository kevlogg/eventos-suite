"use client";

import { useState, useEffect, useRef } from "react";
import { SuiteEvent, TriviaQuestion, TriviaPlayer } from "@/types";
import Link from "next/link";
import confetti from "canvas-confetti";
import { 
  Trophy, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  PartyPopper,
  Flame,
  Award
} from "lucide-react";

interface Props {
  event: SuiteEvent;
}

const AVATARS = ["🥳", "🔥", "🎉", "🚀", "😎", "👑", "💃", "🕺", "🍻", "🥂", "🍕", "🏆"];

export default function TriviaPlayerClient({ event }: Props) {
  const [questions, setQuestions] = useState<TriviaQuestion[]>([]);
  const [timerMax, setTimerMax] = useState(15);
  const [loading, setLoading] = useState(true);

  // Player session state
  const [player, setPlayer] = useState<TriviaPlayer | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [avatar, setAvatar] = useState("🥳");

  // Game state: "register" | "playing" | "finished"
  const [gameState, setGameState] = useState<"register" | "playing" | "finished">("register");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [totalTimeMs, setTotalTimeMs] = useState(0);

  const questionStartTimeRef = useRef<number>(0);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // 1. Fetch questions on mount
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/trivia?eventId=${event.id}`);
        const data = await res.json();
        if (data.questions) setQuestions(data.questions);
        if (data.timerSeconds) setTimerMax(data.timerSeconds);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [event.id]);

  // 2. Start Question Timer
  useEffect(() => {
    if (gameState !== "playing" || questions.length === 0 || isAnswered) return;

    setTimeLeft(timerMax);
    questionStartTimeRef.current = Date.now();

    timerIntervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerIntervalRef.current!);
          handleTimeOut();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [gameState, currentIdx, isAnswered, questions.length, timerMax]);

  function handleTimeOut() {
    handleAnswer(-1); // -1 means time out / wrong
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    if (!firstName.trim()) return;

    try {
      const res = await fetch("/api/trivia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "register",
          eventId: event.id,
          firstName,
          lastName,
          avatar,
        }),
      });
      const data = await res.json();
      if (data.player) {
        setPlayer(data.player);
        setGameState("playing");
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function handleAnswer(optIdx: number) {
    if (isAnswered) return;
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);

    setIsAnswered(true);
    setSelectedOpt(optIdx);

    const timeSpent = Math.max(500, Date.now() - questionStartTimeRef.current);
    const currQ = questions[currentIdx];
    const isCorrect = optIdx === currQ.correctIndex;

    // Calculate score: 100 base points + time bonus
    let earnedPoints = 0;
    if (isCorrect) {
      const remainingRatio = Math.max(0, timeLeft / timerMax);
      earnedPoints = Math.round(100 + remainingRatio * 50); // up to 150 points
    }

    const newScore = score + earnedPoints;
    const newTotalTime = totalTimeMs + timeSpent;
    setScore(newScore);
    setTotalTimeMs(newTotalTime);

    const isLast = currentIdx >= questions.length - 1;

    // Submit score update
    if (player) {
      fetch("/api/trivia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "submit_score",
          eventId: event.id,
          playerId: player.id,
          addedScore: earnedPoints,
          timeMs: timeSpent,
          isFinal: isLast,
        }),
      }).catch(console.error);
    }

    // Wait 3.5s to display explanation, then advance
    setTimeout(() => {
      if (isLast) {
        setGameState("finished");
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      } else {
        setCurrentIdx((prev) => prev + 1);
        setIsAnswered(false);
        setSelectedOpt(null);
      }
    }, 3200);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-purple-500 border-t-transparent animate-spin mx-auto mb-3" />
          <p className="text-xs text-slate-400">Cargando trivia...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-purple-500 selection:text-white">
      {/* Step 1: Registration */}
      {gameState === "register" && (
        <div className="flex-1 flex flex-col items-center justify-center p-4 max-w-md mx-auto w-full">
          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-3xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 mx-auto mb-4 shadow-xl shadow-purple-600/10">
              <Trophy className="w-8 h-8" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Trivia Fiesta</h1>
            <p className="text-xs text-slate-400 mt-1">{event.title}</p>
          </div>

          <form onSubmit={handleRegister} className="w-full bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur shadow-2xl space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Elegí tu Emoji Avatar
              </label>
              <div className="grid grid-cols-6 gap-2">
                {AVATARS.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => setAvatar(emoji)}
                    className={`h-11 rounded-xl text-xl flex items-center justify-center transition-all cursor-pointer ${
                      avatar === emoji
                        ? "bg-purple-600 border-2 border-purple-400 scale-110 shadow"
                        : "bg-slate-950 border border-slate-800 hover:bg-slate-800"
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                  Nombre *
                </label>
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Tu nombre"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                  Apellido
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Tu apellido"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors shadow-lg shadow-purple-600/25 cursor-pointer mt-2"
            >
              <span>¡Entrar al Juego!</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Step 2: Playing Question */}
      {gameState === "playing" && questions.length > 0 && (
        <div className="flex-1 flex flex-col justify-between max-w-lg mx-auto w-full p-4">
          {/* Top Bar: Progress and Timer */}
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="font-semibold text-purple-300">
                Pregunta {currentIdx + 1} de {questions.length}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-base">{player?.avatar}</span>
                <span className="font-bold text-white font-mono">{score} pts</span>
              </div>
            </div>

            {/* Timer countdown progress bar */}
            <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden mb-6 border border-slate-800">
              <div
                className={`h-full transition-all duration-1000 ${
                  timeLeft <= 3 ? "bg-rose-500" : timeLeft <= 7 ? "bg-amber-500" : "bg-purple-500"
                }`}
                style={{ width: `${(timeLeft / timerMax) * 100}%` }}
              />
            </div>

            <div className="text-center mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-mono font-bold mb-3">
                <Clock className="w-3.5 h-3.5" />
                <span>{timeLeft}s restantes</span>
              </span>

              <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                {questions[currentIdx].question}
              </h2>
            </div>
          </div>

          {/* Options Grid */}
          <div className="space-y-3 mb-6">
            {questions[currentIdx].options.map((opt, optIdx) => {
              const isSelected = selectedOpt === optIdx;
              const isCorrect = optIdx === questions[currentIdx].correctIndex;

              let btnStyle = "bg-slate-900 border-slate-800 text-slate-200 hover:border-purple-500/50";
              if (isAnswered) {
                if (isCorrect) {
                  btnStyle = "bg-emerald-600 border-emerald-500 text-white shadow-lg shadow-emerald-600/30 font-bold scale-[1.02]";
                } else if (isSelected && !isCorrect) {
                  btnStyle = "bg-rose-600 border-rose-500 text-white opacity-90 animate-shake";
                } else {
                  btnStyle = "bg-slate-950 border-slate-900 text-slate-600 opacity-40";
                }
              }

              return (
                <button
                  key={optIdx}
                  type="button"
                  disabled={isAnswered}
                  onClick={() => handleAnswer(optIdx)}
                  className={`w-full p-4 rounded-2xl border text-left flex items-center gap-3 transition-all cursor-pointer ${btnStyle}`}
                >
                  <span className="w-7 h-7 rounded-lg bg-slate-950/40 text-xs font-bold flex items-center justify-center shrink-0">
                    {["A", "B", "C", "D"][optIdx]}
                  </span>
                  <span className="text-sm font-medium flex-1">{opt}</span>
                </button>
              );
            })}
          </div>

          {/* Explanation reveal */}
          {isAnswered && (
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-purple-500/30 text-center animate-fadeIn shadow-xl">
              <div className="flex items-center justify-center gap-1.5 text-xs font-bold mb-1">
                {selectedOpt === questions[currentIdx].correctIndex ? (
                  <span className="text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> ¡Respuesta Correcta!
                  </span>
                ) : (
                  <span className="text-rose-400 flex items-center gap-1">
                    <XCircle className="w-4 h-4" /> ¡Ups! No era esa
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-300 italic">
                {questions[currentIdx].explanation}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Step 3: Finished */}
      {gameState === "finished" && (
        <div className="flex-1 flex flex-col items-center justify-center p-4 max-w-md mx-auto w-full text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-400 to-purple-600 flex items-center justify-center text-3xl shadow-xl shadow-purple-600/30 mb-6 animate-bounce">
            🏆
          </div>

          <h2 className="text-3xl font-extrabold text-white tracking-tight mb-2">
            ¡Felicitaciones, {player?.firstName}!
          </h2>
          <p className="text-sm text-slate-400 mb-8">
            Terminaste la trivia. Tu puntaje ya se envió a la pantalla gigante del salón.
          </p>

          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 w-full mb-8 space-y-4">
            <div>
              <span className="text-xs uppercase font-semibold text-slate-400">Puntaje Final</span>
              <div className="text-4xl font-extrabold text-purple-400 font-mono mt-1">{score} pts</div>
            </div>
            <div className="pt-3 border-t border-slate-800 text-xs text-slate-400">
              Tiempo total de respuesta: <strong className="text-white">{(totalTimeMs / 1000).toFixed(1)} segundos</strong>
            </div>
          </div>

          <Link
            href={`/${event.slug}`}
            className="w-full py-3.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm transition-colors cursor-pointer"
          >
            Volver a la fiesta
          </Link>
        </div>
      )}
    </div>
  );
}

