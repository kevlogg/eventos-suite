"use client";

import { SuiteEvent } from "@/types";
import type { InvitationRecord } from "@/lib/schemas/invitation.schema";
import { TEMPLATES } from "@/lib/schemas/invitation.schema";
import { logoutSuperadmin, handleDeleteEvent } from "./actions";
import Link from "next/link";
import { useState } from "react";
import { 
  Plus, 
  LogOut, 
  Calendar, 
  MapPin, 
  Key, 
  ExternalLink, 
  Tv, 
  Sparkles, 
  Copy, 
  Check, 
  PartyPopper,
  Trophy,
  Camera,
  Layers,
  Palette,
  Settings2,
  Trash2,
  AlertTriangle,
  Loader2
} from "lucide-react";
import InvitationFormModal from "@/components/superadmin/InvitationFormModal";
import EditServicesModal from "@/components/superadmin/EditServicesModal";

interface Props {
  events: SuiteEvent[];
  invitationsMap?: Record<string, InvitationRecord>;
}

export default function SuperAdminDashboard({ events, invitationsMap = {} }: Props) {
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [editingEvent, setEditingEvent] = useState<SuiteEvent | null>(null);
  const [configuringServicesEvent, setConfiguringServicesEvent] = useState<SuiteEvent | null>(null);
  const [eventToDelete, setEventToDelete] = useState<SuiteEvent | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [localEvents, setLocalEvents] = useState<SuiteEvent[]>(events);
  const [localInvitations, setLocalInvitations] = useState<Record<string, InvitationRecord>>(invitationsMap);

  async function confirmDelete() {
    if (!eventToDelete) return;
    setIsDeleting(true);
    try {
      const res = await handleDeleteEvent(eventToDelete.id);
      if (res.success) {
        setLocalEvents((prev) => prev.filter((e) => e.id !== eventToDelete.id));
        setEventToDelete(null);
      } else {
        alert(res.error || "Error al eliminar el evento");
      }
    } catch (err) {
      console.error(err);
      alert("Error al eliminar el evento");
    } finally {
      setIsDeleting(false);
    }
  }

  function copyToClipboard(text: string, id: string) {
    navigator.clipboard.writeText(text);
    setCopiedToken(id);
    setTimeout(() => setCopiedToken(null), 2000);
  }

  function handleInvitationSaved(updated: InvitationRecord) {
    setLocalInvitations((prev) => ({
      ...prev,
      [updated.slug.toLowerCase()]: updated,
      [updated.id]: updated,
    }));
  }

  function handleServicesSaved(updated: SuiteEvent) {
    setLocalEvents((prev) => prev.map((e) => (e.id === updated.id ? updated : e)));
    // Also update editingEvent if open
    if (editingEvent?.id === updated.id) {
      setEditingEvent(updated);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white">
      {/* Top Navbar */}
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Layers className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-base tracking-tight text-white flex items-center gap-2">
                Eventos Suite <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 font-semibold border border-indigo-500/30">Superadmin</span>
              </h1>
              <p className="text-xs text-slate-400">Control maestro de fiestas y servicios</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/superadmin/nuevo-evento"
              className="px-4 py-2 text-sm font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-2 shadow-lg shadow-indigo-600/20 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Nuevo Evento</span>
            </Link>

            <button
              onClick={() => logoutSuperadmin()}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
              title="Cerrar sesión"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white">Eventos Activos</h2>
            <p className="text-sm text-slate-400 mt-1">
              Administrá los accesos, tokens, plantillas y pantallas de cada cliente.
            </p>
          </div>
          <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
            Total: {localEvents.length} evento{localEvents.length === 1 ? "" : "s"}
          </span>
        </div>

        {localEvents.length === 0 ? (
          <div className="p-12 text-center border border-dashed border-slate-800 rounded-3xl bg-slate-900/30">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mx-auto mb-3">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-white">Aún no hay eventos creados</h3>
            <p className="text-sm text-slate-400 mt-1 mb-6">Creá tu primer evento para habilitar los módulos contratados.</p>
            <Link
              href="/superadmin/nuevo-evento"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white font-medium text-sm hover:bg-indigo-500 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Crear Evento</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {localEvents.map((evt) => {
              const adminUrl = `/admin/${evt.adminToken}`;
              const guestUrl = `/${evt.slug}`;

              const inv = localInvitations[evt.slug.toLowerCase()] || localInvitations[evt.id];
              const templateDef = inv?.template ? TEMPLATES.find((t) => t.id === inv.template) : null;

              return (
                <div
                  key={evt.id}
                  className="bg-slate-900/70 border border-slate-800/80 hover:border-slate-700 rounded-2xl p-6 flex flex-col justify-between transition-all shadow-sm"
                >
                  <div>
                    {/* Event Header */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <h3 className="font-bold text-lg text-white leading-snug">{evt.title}</h3>
                        <span className="text-xs text-indigo-400 font-mono mt-0.5 block">/{evt.slug}</span>
                      </div>
                      <button
                        onClick={() => setEventToDelete(evt)}
                        className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
                        title="Eliminar evento por completo"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Metadata */}
                    <div className="space-y-1.5 text-xs text-slate-400 mb-5">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-slate-500" />
                        <span>{evt.date}</span>
                      </div>
                      {evt.location && (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-slate-500" />
                          <span>{evt.location}</span>
                        </div>
                      )}
                    </div>

                    {/* Active Modules Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold border ${
                          evt.enabledModules.invitacion
                            ? "bg-amber-500/10 text-amber-300 border-amber-500/20"
                            : "bg-slate-800/40 text-slate-500 border-slate-800 line-through"
                        }`}
                      >
                        <PartyPopper className="w-3 h-3" />
                        <span>Invitación</span>
                        {evt.enabledModules.invitacion && templateDef && (
                          <span className="font-normal opacity-90">({templateDef.name})</span>
                        )}
                      </span>

                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold border ${
                          evt.enabledModules.trivia
                            ? "bg-purple-500/10 text-purple-300 border-purple-500/20"
                            : "bg-slate-800/40 text-slate-500 border-slate-800 line-through"
                        }`}
                      >
                        <Trophy className="w-3 h-3" /> Trivia
                      </span>

                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold border ${
                          evt.enabledModules.fotos
                            ? "bg-pink-500/10 text-pink-300 border-pink-500/20"
                            : "bg-slate-800/40 text-slate-500 border-slate-800 line-through"
                        }`}
                      >
                        <Camera className="w-3 h-3" /> Fotos QR
                      </span>
                    </div>
                  </div>

                  {/* Actions & Links */}
                  <div className="border-t border-slate-800 pt-4 space-y-2.5">
                    {/* Admin Token Link */}
                    <div className="flex items-center justify-between p-2 rounded-xl bg-slate-950/80 border border-slate-800 text-xs">
                      <div className="flex items-center gap-2 truncate pr-2">
                        <Key className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                        <span className="font-mono text-slate-300 truncate">Token: {evt.adminToken}</span>
                      </div>
                      <button
                        onClick={() => copyToClipboard(`${window.location.origin}${adminUrl}`, evt.id)}
                        className="p-1 hover:bg-slate-800 text-slate-400 hover:text-white rounded transition-colors shrink-0 cursor-pointer"
                        title="Copiar link del organizador"
                      >
                        {copiedToken === evt.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>

                    {/* Action buttons: Edit Services & Edit Invitation */}
                    <div className="space-y-2">
                      <button
                        onClick={() => setConfiguringServicesEvent(evt)}
                        className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700/80 flex items-center justify-center gap-2 text-xs font-semibold transition-all cursor-pointer shadow-sm"
                      >
                        <Settings2 className="w-3.5 h-3.5 text-indigo-400" />
                        <span>Editar Servicios & Evento</span>
                      </button>

                      {evt.enabledModules.invitacion && (
                        <button
                          onClick={() => setEditingEvent(evt)}
                          className="w-full py-2 px-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center justify-center gap-2 text-xs font-semibold transition-all cursor-pointer shadow-sm"
                        >
                          <Palette className="w-3.5 h-3.5" />
                          <span>Editar Invitación & Plantilla</span>
                        </button>
                      )}
                    </div>

                    {/* Navigation Buttons */}
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <Link
                        href={adminUrl}
                        target="_blank"
                        className="py-2 px-3 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 flex items-center justify-center gap-1.5 font-medium transition-colors"
                      >
                        <span>Panel Admin</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>

                      <Link
                        href={guestUrl}
                        target="_blank"
                        className="py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700/60 flex items-center justify-center gap-1.5 font-medium transition-colors"
                      >
                        <span>Link Invitado</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </div>

                    {/* Screens Dropdown / Quick Links */}
                    {(evt.enabledModules.trivia || evt.enabledModules.fotos) && (
                      <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-400">
                        <span className="text-slate-500 flex items-center gap-1">
                          <Tv className="w-3 h-3" /> Pantallas:
                        </span>
                        {evt.enabledModules.trivia && (
                          <Link
                            href={`/${evt.slug}/pantalla/trivia`}
                            target="_blank"
                            className="text-purple-400 hover:underline"
                          >
                            TV Trivia
                          </Link>
                        )}
                        {evt.enabledModules.trivia && evt.enabledModules.fotos && <span>•</span>}
                        {evt.enabledModules.fotos && (
                          <Link
                            href={`/${evt.slug}/pantalla/mural`}
                            target="_blank"
                            className="text-pink-400 hover:underline"
                          >
                            Mural Fotos
                          </Link>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Services & Event Edit Modal */}
      {configuringServicesEvent && (
        <EditServicesModal
          event={configuringServicesEvent}
          onClose={() => setConfiguringServicesEvent(null)}
          onSaved={handleServicesSaved}
        />
      )}

      {/* Invitation Edit Modal */}
      {editingEvent && (
        <InvitationFormModal
          title={`Editar Invitación: ${editingEvent.title}`}
          eventId={editingEvent.id}
          slug={editingEvent.slug}
          invitation={
            localInvitations[editingEvent.slug.toLowerCase()] ||
            localInvitations[editingEvent.id] ||
            null
          }
          onClose={() => setEditingEvent(null)}
          onSaved={handleInvitationSaved}
        />
      )}

      {/* Delete Confirmation Modal */}
      {eventToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-rose-400">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center shrink-0 border border-rose-500/20">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">¿Eliminar este evento?</h3>
                <p className="text-xs text-slate-400">Esta acción no se puede deshacer.</p>
              </div>
            </div>

            <p className="text-sm text-slate-300">
              Se eliminará definitivamente el evento <strong className="text-white">&quot;{eventToDelete.title}&quot;</strong> (/{eventToDelete.slug}), junto con sus invitaciones, confirmaciones RSVP, fotos subidas y preguntas/puntajes de trivia.
            </p>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setEventToDelete(null)}
                disabled={isDeleting}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                disabled={isDeleting}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-rose-600 hover:bg-rose-500 text-white flex items-center gap-2 shadow-lg shadow-rose-600/20 transition-colors cursor-pointer"
              >
                {isDeleting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>{isDeleting ? "Eliminando..." : "Sí, eliminar evento"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

