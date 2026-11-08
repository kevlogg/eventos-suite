"use client";

import { useEffect, useState } from "react";
import { SuiteEvent, TriviaQuestion, TriviaPlayer } from "@/types";
import Link from "next/link";
import { 
  Trophy, 
  Tv, 
  Save, 
  RotateCcw, 
  Plus, 
  Trash2, 
  CheckCircle, 
  Clock, 
  Sparkles,
  HelpCircle,
  ExternalLink
} from "lucide-react";

interface Props {
  event: SuiteEvent;
}

export default function TriviaAdminPanel({ event }: Props) {
  const [questions, setQuestions] = useState<TriviaQuestion[]>([]);
  const [players, setPlayers] = useState<TriviaPlayer[]>([]);
  const [timerSeconds, setTimerSeconds] = useState(15);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function loadData() {
    setLoading(true);
    try {
      const res = await fetch(`/api/trivia?eventId=${event.id}`);
      const data = await res.json();
      if (data.questions) setQuestions(data.questions);
      if (data.players) setPlayers(data.players);
      if (data.timerSeconds) setTimerSeconds(data.timerSeconds);
    } catch (err) {
      console.error("Error loading trivia:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, [event.id]);

  async function handleSave() {
    setSaving(true);
    setMessage(null);
    try {
      await fetch("/api/trivia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "save_questions",
          eventId: event.id,
          questions,
          timerSeconds,
        }),
      });
      setMessage("¡Preguntas y configuración guardadas con éxito!");
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      console.error(err);
      setMessage("Error al guardar.");
    } finally {
      setSaving(false);
    }
  }

  async function handleResetScores() {
    if (!confirm("¿Estás seguro de que querés reiniciar la tabla de puntajes?")) return;
    try {
      await fetch("/api/trivia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "reset_players",
          eventId: event.id,
        }),
      });
      setPlayers([]);
      setMessage("Puntajes reiniciados a cero.");
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      console.error(err);
    }
  }

  function handleQuestionChange(idx: number, field: keyof TriviaQuestion, value: any) {
    const updated = [...questions];
    updated[idx] = { ...updated[idx], [field]: value };
    setQuestions(updated);
  }

  function handleOptionChange(qIdx: number, optIdx: number, value: string) {
    const updated = [...questions];
    const newOptions = [...updated[qIdx].options];
    newOptions[optIdx] = value;
    updated[qIdx].options = newOptions;
    setQuestions(updated);
  }

  function addQuestion() {
    const newQ: TriviaQuestion = {
      id: Date.now(),
      eventId: event.id,
      orderNum: questions.length + 1,
      question: "Nueva pregunta personalizada",
      options: ["Opción A", "Opción B", "Opción C", "Opción D"],
      correctIndex: 0,
      explanation: "Explicación o anécdota divertida",
    };
    setQuestions([...questions, newQ]);
  }

  function removeQuestion(idx: number) {
    if (questions.length <= 1) {
      alert("Debe haber al menos 1 pregunta.");
      return;
    }
    const updated = questions.filter((_, i) => i !== idx);
    setQuestions(updated);
  }

  // Sort players by score desc, time asc
  const sortedPlayers = [...players].sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.totalTimeMs - b.totalTimeMs;
  });

  const tvUrl = `/${event.slug}/pantalla/trivia`;

  return (
    <div className="space-y-8">
      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Trivia Fiesta</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Configurá las preguntas sobre los novios / cumpleañeros y proyectá el tablero en vivo.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={tvUrl}
            target="_blank"
            className="px-3.5 py-2 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Tv className="w-4 h-4" />
            <span>Abrir Pantalla TV</span>
            <ExternalLink className="w-3 h-3 ml-0.5" />
          </Link>

          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-md shadow-purple-600/20"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? "Guardando..." : "Guardar Cambios"}</span>
          </button>
        </div>
      </div>

      {message && (
        <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs text-center font-medium">
          {message}
        </div>
      )}

      {/* Global Trivia Settings */}
      <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Clock className="w-5 h-5 text-purple-400" />
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Tiempo por Pregunta</h4>
            <p className="text-[11px] text-slate-400">Segundos que tiene cada invitado para responder desde su celular</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {[10, 15, 20, 25].map((sec) => (
            <button
              key={sec}
              onClick={() => setTimerSeconds(sec)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                timerSeconds === sec
                  ? "bg-purple-600 border-purple-500 text-white"
                  : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              {sec}s
            </button>
          ))}
        </div>
      </div>

      {/* Leaderboard Preview & Reset */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-sm text-white">Podio de Jugadores en Vivo ({players.length})</h3>
          </div>

          <button
            onClick={handleResetScores}
            className="px-3 py-1.5 rounded-lg bg-rose-600/10 hover:bg-rose-600/20 text-rose-300 border border-rose-500/20 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reiniciar Puntajes</span>
          </button>
        </div>

        {sortedPlayers.length === 0 ? (
          <p className="text-xs text-slate-500 py-3 text-center">Aún no hay jugadores con puntaje en esta trivia.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {sortedPlayers.slice(0, 6).map((p, idx) => (
              <div
                key={p.id}
                className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2 truncate">
                  <span className="font-bold text-slate-400 w-4">#{idx + 1}</span>
                  <span className="text-base">{p.avatar}</span>
                  <span className="font-semibold text-white truncate">{p.firstName} {p.lastName}</span>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-bold text-purple-400">{p.score} pts</span>
                  <span className="text-[10px] text-slate-500 block">{(p.totalTimeMs / 1000).toFixed(1)}s</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Questions Editor */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
            Preguntas de la Trivia ({questions.length})
          </h3>
          <button
            onClick={addQuestion}
            className="px-3 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Agregar Pregunta</span>
          </button>
        </div>

        <div className="space-y-4">
          {questions.map((q, qIdx) => (
            <div
              key={q.id || qIdx}
              className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-300 font-bold text-xs flex items-center justify-center">
                    {qIdx + 1}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">Pregunta</span>
                </div>

                <button
                  onClick={() => removeQuestion(qIdx)}
                  className="p-1 text-slate-500 hover:text-rose-400 hover:bg-slate-800 rounded transition-colors cursor-pointer"
                  title="Eliminar pregunta"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Pregunta Input */}
              <input
                type="text"
                value={q.question}
                onChange={(e) => handleQuestionChange(qIdx, "question", e.target.value)}
                placeholder="Escribí la pregunta aquí..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500"
              />

              {/* 4 Opciones */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {q.options.map((opt, optIdx) => {
                  const isCorrect = q.correctIndex === optIdx;
                  return (
                    <div
                      key={optIdx}
                      className={`flex items-center gap-2 p-2 rounded-xl border transition-all ${
                        isCorrect
                          ? "bg-purple-600/10 border-purple-500/50 text-white"
                          : "bg-slate-950 border-slate-800 text-slate-300"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => handleQuestionChange(qIdx, "correctIndex", optIdx)}
                        className={`w-6 h-6 rounded-full text-xs font-bold shrink-0 flex items-center justify-center cursor-pointer transition-colors ${
                          isCorrect
                            ? "bg-purple-600 text-white shadow"
                            : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                        }`}
                        title="Marcar como respuesta correcta"
                      >
                        {["A", "B", "C", "D"][optIdx]}
                      </button>

                      <input
                        type="text"
                        value={opt}
                        onChange={(e) => handleOptionChange(qIdx, optIdx, e.target.value)}
                        placeholder={`Opción ${["A", "B", "C", "D"][optIdx]}`}
                        className="w-full bg-transparent text-xs text-white focus:outline-none"
                      />
                    </div>
                  );
                })}
              </div>

              {/* Explicación */}
              <div>
                <label className="block text-[11px] text-slate-500 mb-1">
                  Explicación o remate gracioso al revelar respuesta:
                </label>
                <input
                  type="text"
                  value={q.explanation}
                  onChange={(e) => handleQuestionChange(qIdx, "explanation", e.target.value)}
                  placeholder="¡El 70/30 con hielo hasta el tope es su marca registrada!"
                  className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
