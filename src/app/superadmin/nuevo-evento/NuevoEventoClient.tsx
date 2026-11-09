"use client";

import { useState } from "react";
import Link from "next/link";
import { handleCreateEvent } from "../actions";
import { ArrowLeft, Sparkles, PartyPopper, Trophy, Camera, Check } from "lucide-react";

export default function NuevoEventoClient() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [autoSlug, setAutoSlug] = useState(true);

  const [hasInvitacion, setHasInvitacion] = useState(true);
  const [hasTrivia, setHasTrivia] = useState(true);
  const [hasFotos, setHasFotos] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleTitleChange(val: string) {
    setTitle(val);
    if (autoSlug) {
      const generated = val
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      setSlug(generated);
    }
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    formData.set("mod_invitacion", hasInvitacion ? "on" : "off");
    formData.set("mod_trivia", hasTrivia ? "on" : "off");
    formData.set("mod_fotos", hasFotos ? "on" : "off");

    const res = await handleCreateEvent(formData);
    if (res?.error) {
      setError(res.error);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 flex justify-center">
      <div className="w-full max-w-2xl">
        <Link
          href="/superadmin"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-6 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al listado</span>
        </Link>

        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white tracking-tight">Crear Nuevo Evento</h1>
            <p className="text-sm text-slate-400 mt-1">
              Configurá los datos del evento y seleccioná los módulos contratados por el cliente.
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-6">
            {/* Título */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Nombre del Evento *
              </label>
              <input
                type="text"
                name="title"
                required
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Ej: Casamiento Lucas & Flor"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm"
              />
            </div>

            {/* Slug */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Slug / URL del Evento *
                </label>
                <button
                  type="button"
                  onClick={() => setAutoSlug(!autoSlug)}
                  className="text-[11px] text-indigo-400 hover:underline cursor-pointer"
                >
                  {autoSlug ? "Modo manual" : "Modo automático"}
                </button>
              </div>
              <div className="flex items-center rounded-xl bg-slate-950 border border-slate-800 px-3 text-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
                <span className="text-slate-500 select-none">/</span>
                <input
                  type="text"
                  name="slug"
                  required
                  value={slug}
                  onChange={(e) => {
                    setAutoSlug(false);
                    setSlug(e.target.value);
                  }}
                  placeholder="lucas-y-flor"
                  className="w-full bg-transparent px-2 py-3 text-white placeholder-slate-600 focus:outline-none text-sm"
                />
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Los invitados accederán a través de: <span className="font-mono text-indigo-300">dominio.com/{slug || "slug-del-evento"}</span>
              </p>
            </div>

            {/* Fecha y Lugar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Fecha del Evento *
                </label>
                <input
                  type="date"
                  name="date"
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Lugar / Salón
                </label>
                <input
                  type="text"
                  name="location"
                  placeholder="Ej: Salón Bellas Artes, Ramos Mejía"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 text-sm"
                />
              </div>
            </div>

            {/* Módulos contratados */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                Módulos Habilitados para el Cliente
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Módulo Invitación */}
                <div
                  onClick={() => setHasInvitacion(!hasInvitacion)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                    hasInvitacion
                      ? "bg-amber-500/10 border-amber-500/40 text-amber-200"
                      : "bg-slate-950/40 border-slate-800 text-slate-500 opacity-60"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <PartyPopper className="w-5 h-5 text-amber-400" />
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                        hasInvitacion ? "bg-amber-500 border-amber-400 text-slate-950" : "border-slate-700"
                      }`}
                    >
                      {hasInvitacion && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Invitación</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">RSVP y cuenta regresiva</p>
                  </div>
                </div>

                {/* Módulo Trivia */}
                <div
                  onClick={() => setHasTrivia(!hasTrivia)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                    hasTrivia
                      ? "bg-purple-500/10 border-purple-500/40 text-purple-200"
                      : "bg-slate-950/40 border-slate-800 text-slate-500 opacity-60"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Trophy className="w-5 h-5 text-purple-400" />
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                        hasTrivia ? "bg-purple-500 border-purple-400 text-slate-950" : "border-slate-700"
                      }`}
                    >
                      {hasTrivia && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Trivia Fiesta</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">Juego móvil y pantalla TV</p>
                  </div>
                </div>

                {/* Módulo Fotos QR */}
                <div
                  onClick={() => setHasFotos(!hasFotos)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                    hasFotos
                      ? "bg-pink-500/10 border-pink-500/40 text-pink-200"
                      : "bg-slate-950/40 border-slate-800 text-slate-500 opacity-60"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Camera className="w-5 h-5 text-pink-400" />
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                        hasFotos ? "bg-pink-500 border-pink-400 text-slate-950" : "border-slate-700"
                      }`}
                    >
                      {hasFotos && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Fotos QR</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">Mural en vivo y subida QR</p>
                  </div>
                </div>
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center font-medium">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors shadow-lg shadow-indigo-600/25 cursor-pointer mt-4"
            >
              {loading ? (
                <span>Creando evento...</span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Crear Evento y Generar Accesos</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

