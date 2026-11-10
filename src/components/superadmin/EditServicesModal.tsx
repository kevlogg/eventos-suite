"use client";

import { useState } from "react";
import { SuiteEvent } from "@/types";
import { handleUpdateEventServices } from "@/app/superadmin/actions";
import { 
  X, 
  Settings2, 
  PartyPopper, 
  Trophy, 
  Camera, 
  Check, 
  Calendar, 
  MapPin, 
  Loader2,
  AlertCircle
} from "lucide-react";

interface Props {
  event: SuiteEvent;
  onClose: () => void;
  onSaved: (updatedEvent: SuiteEvent) => void;
}

export default function EditServicesModal({ event, onClose, onSaved }: Props) {
  const [title, setTitle] = useState(event.title);
  const [date, setDate] = useState(event.date);
  const [location, setLocation] = useState(event.location || "");

  const [hasInvitacion, setHasInvitacion] = useState(Boolean(event.enabledModules?.invitacion));
  const [hasTrivia, setHasTrivia] = useState(Boolean(event.enabledModules?.trivia));
  const [hasFotos, setHasFotos] = useState(Boolean(event.enabledModules?.fotos));

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);

    try {
      const res = await handleUpdateEventServices(event.id, {
        title: title.trim(),
        date: date.trim(),
        location: location.trim(),
        enabledModules: {
          invitacion: hasInvitacion,
          trivia: hasTrivia,
          fotos: hasFotos,
        },
      });

      if (!res.success || !res.event) {
        setError(res.error || "No se pudo actualizar el evento.");
        setSaving(false);
        return;
      }

      onSaved(res.event);
      onClose();
    } catch (err: unknown) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Error inesperado");
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden text-slate-100 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center">
              <Settings2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white leading-tight">Configurar Servicios del Evento</h2>
              <p className="text-xs text-slate-400 font-mono">/{event.slug}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-5 overflow-y-auto pt-4 flex-1 pr-1">
          {error && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Event Title */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Título del Evento
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Date & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                <span>Fecha</span>
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                <span>Lugar / Salón</span>
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Ej: Salón Los Robles"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Servicios Switches */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Servicios Habilitados para este Evento
            </label>
            <p className="text-xs text-slate-400 mb-3">
              Activá o desactivá los servicios contratados por el cliente. Solo los servicios activos podrán gestionarse desde el panel del organizador (Admin) y pantallas.
            </p>

            <div className="space-y-2.5">
              {/* Servicio 01: Invitación Digital */}
              <div
                onClick={() => setHasInvitacion(!hasInvitacion)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  hasInvitacion
                    ? "bg-amber-500/10 border-amber-500/40 text-amber-200"
                    : "bg-slate-950/60 border-slate-800 text-slate-500 opacity-60 hover:opacity-80"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${hasInvitacion ? "bg-amber-500/20 text-amber-400" : "bg-slate-800 text-slate-500"}`}>
                    <PartyPopper className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Invitación Digital & RSVP</h4>
                    <p className="text-[11px] text-slate-400">Web interactiva, sobre virtual y confirmación de invitados</p>
                  </div>
                </div>
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-all ${
                    hasInvitacion ? "bg-amber-500 border-amber-400 text-slate-950" : "border-slate-700 bg-slate-900"
                  }`}
                >
                  {hasInvitacion && <Check className="w-4 h-4 stroke-[3]" />}
                </div>
              </div>

              {/* Servicio 02: Trivia Fiesta */}
              <div
                onClick={() => setHasTrivia(!hasTrivia)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  hasTrivia
                    ? "bg-purple-500/10 border-purple-500/40 text-purple-200"
                    : "bg-slate-950/60 border-slate-800 text-slate-500 opacity-60 hover:opacity-80"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${hasTrivia ? "bg-purple-500/20 text-purple-400" : "bg-slate-800 text-slate-500"}`}>
                    <Trophy className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Trivia Fiesta en Vivo</h4>
                    <p className="text-[11px] text-slate-400">Preguntas interactivas desde celulares y podio en TV</p>
                  </div>
                </div>
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-all ${
                    hasTrivia ? "bg-purple-500 border-purple-400 text-slate-950" : "border-slate-700 bg-slate-900"
                  }`}
                >
                  {hasTrivia && <Check className="w-4 h-4 stroke-[3]" />}
                </div>
              </div>

              {/* Servicio 03: Fotos QR */}
              <div
                onClick={() => setHasFotos(!hasFotos)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  hasFotos
                    ? "bg-pink-500/10 border-pink-500/40 text-pink-200"
                    : "bg-slate-950/60 border-slate-800 text-slate-500 opacity-60 hover:opacity-80"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${hasFotos ? "bg-pink-500/20 text-pink-400" : "bg-slate-800 text-slate-500"}`}>
                    <Camera className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Mural de Fotos Dinámicas por QR</h4>
                    <p className="text-[11px] text-slate-400">Transmisión al instante en pantalla gigante y moderación</p>
                  </div>
                </div>
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-all ${
                    hasFotos ? "bg-pink-500 border-pink-400 text-slate-950" : "border-slate-700 bg-slate-900"
                  }`}
                >
                  {hasFotos && <Check className="w-4 h-4 stroke-[3]" />}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-lg shadow-indigo-600/25 flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              <span>{saving ? "Guardando..." : "Guardar Cambios"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

