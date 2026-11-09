"use client";

import { useState, useEffect } from "react";
import { SuiteEvent } from "@/types";
import Link from "next/link";
import { 
  Calendar, 
  MapPin, 
  PartyPopper, 
  Trophy, 
  Camera, 
  Check, 
  Clock, 
  Heart, 
  Send,
  Sparkles,
  ArrowRight
} from "lucide-react";

interface Props {
  event: SuiteEvent;
}

export default function GuestPortalClient({ event }: Props) {
  // Countdown calculation
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    function calculate() {
      const target = new Date(event.date + "T21:00:00").getTime();
      const now = new Date().getTime();
      const diff = target - now;

      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    }

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, [event.date]);

  // RSVP Form State
  const [guestName, setGuestName] = useState("");
  const [attending, setAttending] = useState<boolean | null>(null);
  const [companionsCount, setCompanionsCount] = useState(0);
  const [companionNames, setCompanionNames] = useState("");
  const [dietary, setDietary] = useState("");
  const [message, setMessage] = useState("");
  const [rsvpLoading, setRsvpLoading] = useState(false);
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);

  async function handleRsvpSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (attending === null || !guestName.trim()) return;

    setRsvpLoading(true);
    try {
      await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId: event.id,
          guestName,
          attending,
          companionsCount,
          companionNames,
          dietaryRestrictions: dietary,
          message,
        }),
      });
      setRsvpSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setRsvpLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white flex flex-col items-center">
      {/* Top Banner / Cover */}
      <div className="w-full max-w-xl px-4 pt-10 pb-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>¡Estás invitado!</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-3">
          {event.title}
        </h1>

        <div className="flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-slate-300 mb-8">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-indigo-400" />
            <span>{event.date}</span>
          </div>
          {event.location && (
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-indigo-400" />
              <span>{event.location}</span>
            </div>
          )}
        </div>

        {/* Countdown Cards */}
        <div className="grid grid-cols-4 gap-2 sm:gap-3 mb-10 max-w-sm mx-auto">
          {[
            { val: timeLeft.days, label: "Días" },
            { val: timeLeft.hours, label: "Hs" },
            { val: timeLeft.minutes, label: "Min" },
            { val: timeLeft.seconds, label: "Seg" },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-3 sm:p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col items-center shadow-lg"
            >
              <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono">{item.val}</span>
              <span className="text-[10px] sm:text-xs text-indigo-300 font-semibold uppercase tracking-wider mt-0.5">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Interactive Hub */}
      <div className="w-full max-w-xl px-4 space-y-6 pb-16">
        {/* Module Hub Buttons (if party is happening or features enabled) */}
        {(event.enabledModules.trivia || event.enabledModules.fotos) && (
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 text-center">
              Actividades en la Fiesta
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {event.enabledModules.trivia && (
                <Link
                  href={`/${event.slug}/trivia`}
                  className="p-5 rounded-2xl bg-gradient-to-br from-purple-900/50 to-slate-900 border border-purple-500/30 hover:border-purple-400 flex items-center justify-between group transition-all shadow-lg shadow-purple-900/10"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Trophy className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">Trivia en Vivo</h4>
                      <p className="text-xs text-purple-300">¡Jugá y ganá premios!</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-purple-400 group-hover:translate-x-1 transition-transform" />
                </Link>
              )}

              {event.enabledModules.fotos && (
                <Link
                  href={`/${event.slug}/fotos`}
                  className="p-5 rounded-2xl bg-gradient-to-br from-pink-900/50 to-slate-900 border border-pink-500/30 hover:border-pink-400 flex items-center justify-between group transition-all shadow-lg shadow-pink-900/10"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-pink-500/20 text-pink-300 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Camera className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">Fotos al Mural</h4>
                      <p className="text-xs text-pink-300">Subí fotos con QR</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-pink-400 group-hover:translate-x-1 transition-transform" />
                </Link>
              )}
            </div>
          </div>
        )}

        {/* RSVP Card (if enabled) */}
        {event.enabledModules.invitacion && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur shadow-2xl">
            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto mb-3">
                <PartyPopper className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-white">Confirmación de Asistencia</h2>
              <p className="text-xs text-slate-400 mt-1">Por favor confirmá si vas a poder acompañarnos.</p>
            </div>

            {rsvpSubmitted ? (
              <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <Check className="w-5 h-5 stroke-[3]" />
                </div>
                <h3 className="font-bold text-white text-sm">¡Muchas gracias, {guestName}!</h3>
                <p className="text-xs text-emerald-300">
                  {attending
                    ? "Tu confirmación fue registrada exitosamente. ¡Nos vemos en la fiesta!"
                    : "Lamentamos que no puedas venir, pero gracias por avisarnos."}
                </p>
              </div>
            ) : (
              <form onSubmit={handleRsvpSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                    Tu Nombre y Apellido *
                  </label>
                  <input
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="Ej: Nicolás Gómez"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                {/* Asiste Sí / No */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                    ¿Asistirás a la fiesta? *
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setAttending(true)}
                      className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold border flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        attending === true
                          ? "bg-emerald-600 border-emerald-500 text-white shadow-lg shadow-emerald-600/20"
                          : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                      }`}
                    >
                      <Check className="w-4 h-4" />
                      <span>¡Sí, confirmo!</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setAttending(false)}
                      className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold border flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        attending === false
                          ? "bg-rose-600 border-rose-500 text-white shadow-lg shadow-rose-600/20"
                          : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                      }`}
                    >
                      <span>No podré asistir</span>
                    </button>
                  </div>
                </div>

                {attending === true && (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                          Acompañantes adicionales
                        </label>
                        <select
                          value={companionsCount}
                          onChange={(e) => setCompanionsCount(Number(e.target.value))}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                        >
                          <option value={0}>Voy solo/a (0)</option>
                          <option value={1}>+1 Acompañante</option>
                          <option value={2}>+2 Acompañantes</option>
                          <option value={3}>+3 Acompañantes</option>
                        </select>
                      </div>

                      {companionsCount > 0 && (
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                            Nombres acompañantes
                          </label>
                          <input
                            type="text"
                            value={companionNames}
                            onChange={(e) => setCompanionNames(e.target.value)}
                            placeholder="Ej: Laura Díaz"
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                          />
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                        Menú Especial / Restricciones
                      </label>
                      <input
                        type="text"
                        value={dietary}
                        onChange={(e) => setDietary(e.target.value)}
                        placeholder="Ej: Celíaco, Vegano, Alergia al maní..."
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                    Mensaje o Dedicatoria
                  </label>
                  <textarea
                    rows={2}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Dejales un mensaje lindo a los agasajados..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={rsvpLoading || attending === null}
                  className="w-full py-3.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors shadow-lg shadow-indigo-600/20 cursor-pointer"
                >
                  {rsvpLoading ? (
                    <span>Enviando...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Confirmar Asistencia</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

