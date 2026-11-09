"use client";

import { useState } from "react";
import { SuiteEvent } from "@/types";
import Link from "next/link";
import { 
  PartyPopper, 
  Trophy, 
  Camera, 
  LayoutDashboard, 
  ExternalLink, 
  Tv, 
  Sparkles,
  Calendar,
  MapPin,
  CheckCircle,
  Copy,
  Check
} from "lucide-react";
import RsvpAdminPanel from "@/modules/invitacion/components/RsvpAdminPanel";
import TriviaAdminPanel from "@/modules/trivia/components/TriviaAdminPanel";
import FotosAdminPanel from "@/modules/fotos/components/FotosAdminPanel";

interface Props {
  event: SuiteEvent;
}

export default function OrganizerDashboard({ event }: Props) {
  // Determine available tabs
  const availableTabs = [
    { id: "overview", label: "Resumen", icon: LayoutDashboard, enabled: true },
    { id: "invitacion", label: "Invitación & RSVP", icon: PartyPopper, enabled: event.enabledModules.invitacion },
    { id: "trivia", label: "Trivia Fiesta", icon: Trophy, enabled: event.enabledModules.trivia },
    { id: "fotos", label: "Fotos QR", icon: Camera, enabled: event.enabledModules.fotos },
  ].filter((t) => t.enabled);

  const [activeTab, setActiveTab] = useState<string>("overview");
  const [copied, setCopied] = useState<string | null>(null);

  function copyText(text: string, id: string) {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  }

  const guestUrl = `/${event.slug}`;
  const tvTriviaUrl = `/${event.slug}/pantalla/trivia`;
  const muralFotosUrl = `/${event.slug}/pantalla/mural`;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Top Navbar */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-bold text-sm sm:text-base text-white leading-tight">{event.title}</h1>
              <p className="text-[11px] text-slate-400">Panel del Organizador</p>
            </div>
          </div>

          {/* Quick links to guest view / TV */}
          <div className="flex items-center gap-2">
            <Link
              href={guestUrl}
              target="_blank"
              className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-colors"
            >
              <span>Ver Invitación</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            {event.enabledModules.trivia && (
              <Link
                href={tvTriviaUrl}
                target="_blank"
                className="px-3 py-1.5 text-xs font-medium rounded-lg bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 flex items-center gap-1.5 transition-colors hidden sm:inline-flex"
              >
                <Tv className="w-3.5 h-3.5" />
                <span>TV Trivia</span>
              </Link>
            )}

            {event.enabledModules.fotos && (
              <Link
                href={muralFotosUrl}
                target="_blank"
                className="px-3 py-1.5 text-xs font-medium rounded-lg bg-pink-600/20 hover:bg-pink-600/30 text-pink-300 border border-pink-500/30 flex items-center gap-1.5 transition-colors hidden sm:inline-flex"
              >
                <Tv className="w-3.5 h-3.5" />
                <span>Mural Fotos</span>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Tabs navigation bar */}
      <div className="border-b border-slate-800 bg-slate-900/40 px-4">
        <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto py-2 scrollbar-none">
          {availableTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Tab Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 flex-1 w-full">
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Event Welcome Banner */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-indigo-950/40 via-purple-950/30 to-slate-900 border border-indigo-500/20 shadow-xl">
              <div className="max-w-2xl">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 mb-3 inline-block">
                  Control General
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
                  ¡Hola! Bienvenidos al panel de {event.title}
                </h2>
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 mt-3">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-indigo-400" />
                    <span>Fecha: {event.date}</span>
                  </div>
                  {event.location && (
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-indigo-400" />
                      <span>{event.location}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Modules Summary Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Invitacion Card */}
              {event.enabledModules.invitacion && (
                <div
                  onClick={() => setActiveTab("invitacion")}
                  className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                      <PartyPopper className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300">
                      Activo
                    </span>
                  </div>
                  <h3 className="font-bold text-white text-base mb-1 group-hover:text-amber-300 transition-colors">
                    Invitación & RSVP
                  </h3>
                  <p className="text-xs text-slate-400 mb-4">
                    Controlá quiénes confirmaron asistencia y sus requerimientos de menú.
                  </p>
                  <span className="text-xs text-amber-400 font-medium inline-flex items-center gap-1">
                    Abrir gestión RSVP &rarr;
                  </span>
                </div>
              )}

              {/* Trivia Card */}
              {event.enabledModules.trivia && (
                <div
                  onClick={() => setActiveTab("trivia")}
                  className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-purple-500/40 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
                      <Trophy className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300">
                      Activo
                    </span>
                  </div>
                  <h3 className="font-bold text-white text-base mb-1 group-hover:text-purple-300 transition-colors">
                    Trivia Fiesta
                  </h3>
                  <p className="text-xs text-slate-400 mb-4">
                    Editá las 10 preguntas personalizadas y proyectá el juego en pantalla grande.
                  </p>
                  <span className="text-xs text-purple-400 font-medium inline-flex items-center gap-1">
                    Gestionar preguntas y juego &rarr;
                  </span>
                </div>
              )}

              {/* Fotos Card */}
              {event.enabledModules.fotos && (
                <div
                  onClick={() => setActiveTab("fotos")}
                  className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-pink-500/40 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-pink-500/10 text-pink-400 flex items-center justify-center">
                      <Camera className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300">
                      Activo
                    </span>
                  </div>
                  <h3 className="font-bold text-white text-base mb-1 group-hover:text-pink-300 transition-colors">
                    Fotos Dinámicas por QR
                  </h3>
                  <p className="text-xs text-slate-400 mb-4">
                    Moderá las fotos que suben los invitados y descargá el álbum completo en ZIP.
                  </p>
                  <span className="text-xs text-pink-400 font-medium inline-flex items-center gap-1">
                    Ver mural y fotos &rarr;
                  </span>
                </div>
              )}
            </div>

            {/* Quick Share Links Card */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">
                Enlaces Rápidos para el Salón y los Invitados
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Link Invitados */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
                  <div>
                    <span className="text-xs text-slate-400 font-semibold block mb-1">Link de los Invitados</span>
                    <span className="text-xs font-mono text-indigo-300 break-all">{guestUrl}</span>
                  </div>
                  <button
                    onClick={() => copyText(`${window.location.origin}${guestUrl}`, "guest")}
                    className="mt-3 py-1.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {copied === "guest" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied === "guest" ? "Copiado" : "Copiar Enlace"}</span>
                  </button>
                </div>

                {/* Pantalla TV Trivia */}
                {event.enabledModules.trivia && (
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
                    <div>
                      <span className="text-xs text-purple-400 font-semibold block mb-1">Proyector / TV Trivia</span>
                      <span className="text-xs font-mono text-slate-400 break-all">{tvTriviaUrl}</span>
                    </div>
                    <Link
                      href={tvTriviaUrl}
                      target="_blank"
                      className="mt-3 py-1.5 px-3 rounded-lg bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Tv className="w-3.5 h-3.5" />
                      <span>Abrir Pantalla TV</span>
                    </Link>
                  </div>
                )}

                {/* Pantalla Mural Fotos */}
                {event.enabledModules.fotos && (
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
                    <div>
                      <span className="text-xs text-pink-400 font-semibold block mb-1">Proyector / Mural de Fotos</span>
                      <span className="text-xs font-mono text-slate-400 break-all">{muralFotosUrl}</span>
                    </div>
                    <Link
                      href={muralFotosUrl}
                      target="_blank"
                      className="mt-3 py-1.5 px-3 rounded-lg bg-pink-600/20 hover:bg-pink-600/30 text-pink-300 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Tv className="w-3.5 h-3.5" />
                      <span>Abrir Mural en Vivo</span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab Invitación & RSVP */}
        {activeTab === "invitacion" && <RsvpAdminPanel event={event} />}

        {/* Tab Trivia */}
        {activeTab === "trivia" && <TriviaAdminPanel event={event} />}

        {/* Tab Fotos */}
        {activeTab === "fotos" && <FotosAdminPanel event={event} />}
      </main>
    </div>
  );
}

