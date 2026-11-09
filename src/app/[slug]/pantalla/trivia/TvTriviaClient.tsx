"use client";

import { useEffect, useState } from "react";
import { SuiteEvent, TriviaPlayer, TriviaQuestion } from "@/types";
import QRCode from "qrcode";
import { Trophy, QrCode, Maximize, Sparkles, Flame, Clock } from "lucide-react";

interface Props {
  event: SuiteEvent;
}

export default function TvTriviaClient({ event }: Props) {
  const [players, setPlayers] = useState<TriviaPlayer[]>([]);
  const [questions, setQuestions] = useState<TriviaQuestion[]>([]);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);

  useEffect(() => {
    // Generate QR to join game
    if (typeof window !== "undefined") {
      const fullUrl = `${window.location.origin}/${event.slug}/trivia`;
      QRCode.toDataURL(fullUrl, { width: 300, margin: 2, color: { dark: "#020617", light: "#ffffff" } })
        .then((url) => setQrCodeUrl(url))
        .catch(console.error);
    }

    async function fetchScores() {
      try {
        const res = await fetch(`/api/trivia?eventId=${event.id}`);
        const data = await res.json();
        if (data.players) setPlayers(data.players);
        if (data.questions) setQuestions(data.questions);
      } catch (err) {
        console.error(err);
      }
    }

    fetchScores();
    const interval = setInterval(fetchScores, 3000);
    return () => clearInterval(interval);
  }, [event.id, event.slug]);

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }

  // Sort players by score desc, time asc
  const sorted = [...players].sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.totalTimeMs - b.totalTimeMs;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between p-6 sm:p-10 selection:bg-purple-600">
      {/* Top Header */}
      <header className="flex items-center justify-between border-b border-slate-800 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 via-pink-600 to-amber-500 flex items-center justify-center text-3xl shadow-xl shadow-purple-600/30">
            🏆
          </div>
          <div>
            <span className="text-xs uppercase tracking-widest text-purple-400 font-extrabold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Trivia Fiesta en Vivo
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">{event.title}</h1>
          </div>
        </div>

        <button
          onClick={toggleFullscreen}
          className="p-3 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 rounded-2xl transition-colors cursor-pointer"
          title="Pantalla Completa"
        >
          <Maximize className="w-6 h-6" />
        </button>
      </header>

      {/* Main Screen Layout */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8 py-8 items-center">
        {/* Left: QR to join */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 flex flex-col items-center text-center shadow-2xl">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-400 mb-4 flex items-center gap-1.5">
            <QrCode className="w-4 h-4" /> Escaneá para jugar
          </span>

          {qrCodeUrl ? (
            <div className="bg-white p-3 rounded-2xl shadow-2xl mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={qrCodeUrl} alt="QR Trivia" className="w-48 h-48 sm:w-56 sm:h-56" />
            </div>
          ) : (
            <div className="w-48 h-48 sm:w-56 sm:h-56 bg-slate-800 rounded-2xl animate-pulse mb-4" />
          )}

          <p className="text-sm font-semibold text-white">¡Jugá desde tu celular!</p>
          <p className="text-xs text-slate-400 mt-1">Elegí tu avatar y respondé rápido para sumar más puntos.</p>
          <div className="mt-4 px-3 py-1.5 rounded-full bg-slate-950 border border-slate-800 text-xs font-mono text-purple-300">
            {players.length} participante{players.length === 1 ? "" : "s"}
          </div>
        </div>

        {/* Right: Top 10 Leaderboard */}
        <div className="lg:col-span-2 bg-slate-900/60 border border-slate-800 rounded-3xl p-8 shadow-2xl flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
                <Flame className="w-6 h-6 text-amber-400" />
                <span>Ranking en Tiempo Real</span>
              </h2>
              <span className="text-xs font-mono text-slate-400">Actualizando en vivo...</span>
            </div>

            {sorted.length === 0 ? (
              <div className="p-12 text-center text-slate-500 text-base">
                Esperando a los primeros jugadores... ¡Escaneá el QR y sumate!
              </div>
            ) : (
              <div className="space-y-3">
                {sorted.slice(0, 7).map((p, idx) => {
                  let rankStyle = "bg-slate-950/70 border-slate-800 text-slate-300";
                  let medal = `#${idx + 1}`;

                  if (idx === 0) {
                    rankStyle = "bg-gradient-to-r from-amber-500/20 via-yellow-500/10 to-slate-950 border-amber-500/50 text-amber-200 shadow-lg shadow-amber-500/10 scale-[1.02]";
                    medal = "🥇";
                  } else if (idx === 1) {
                    rankStyle = "bg-gradient-to-r from-slate-400/20 to-slate-950 border-slate-400/40 text-slate-200";
                    medal = "🥈";
                  } else if (idx === 2) {
                    rankStyle = "bg-gradient-to-r from-amber-700/20 to-slate-950 border-amber-700/40 text-amber-300";
                    medal = "🥉";
                  }

                  return (
                    <div
                      key={p.id}
                      className={`p-3.5 sm:p-4 rounded-2xl border flex items-center justify-between transition-all ${rankStyle}`}
                    >
                      <div className="flex items-center gap-3 truncate">
                        <span className="font-extrabold text-lg sm:text-xl w-8 text-center shrink-0">{medal}</span>
                        <span className="text-2xl sm:text-3xl shrink-0">{p.avatar}</span>
                        <div className="truncate">
                          <span className="font-bold text-base sm:text-lg text-white block truncate">
                            {p.firstName} {p.lastName}
                          </span>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="font-extrabold text-lg sm:text-2xl text-purple-300 font-mono">
                          {p.score} pts
                        </span>
                        <span className="text-xs text-slate-500 block font-mono">
                          {(p.totalTimeMs / 1000).toFixed(1)}s
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-xs text-slate-500 border-t border-slate-900 pt-4">
        Trivia Fiesta en Vivo &bull; Proyectado con Eventos Suite
      </footer>
    </div>
  );
}

