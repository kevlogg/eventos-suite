"use client";

import { useState } from "react";
import Link from "next/link";
import { handleCreateEvent } from "../actions";
import { 
  ArrowLeft, 
  Sparkles, 
  PartyPopper, 
  Trophy, 
  Camera, 
  Check, 
  Palette, 
  Settings2
} from "lucide-react";
import type { TemplateId, TemplateCategoryKey, InvitationRecord } from "@/lib/schemas/invitation.schema";
import { TEMPLATES, TEMPLATE_CATEGORIES } from "@/lib/schemas/invitation.schema";
import InvitationFormModal from "@/components/superadmin/InvitationFormModal";

export default function NuevoEventoClient() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [autoSlug, setAutoSlug] = useState(true);
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");

  const [hasInvitacion, setHasInvitacion] = useState(true);
  const [hasTrivia, setHasTrivia] = useState(true);
  const [hasFotos, setHasFotos] = useState(true);

  // Template and invitation customization state
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>("classic-gold");
  const [templateCategory, setTemplateCategory] = useState<TemplateCategoryKey>("all");
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [customizedInvitation, setCustomizedInvitation] = useState<Partial<InvitationRecord> | null>(null);

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

    try {
      const formData = new FormData(e.currentTarget);
      formData.set("mod_invitacion", hasInvitacion ? "on" : "off");
      formData.set("mod_trivia", hasTrivia ? "on" : "off");
      formData.set("mod_fotos", hasFotos ? "on" : "off");

      const res = await handleCreateEvent(formData);
      if (res?.error) {
        setError(res.error);
        setLoading(false);
      }
    } catch (err: unknown) {
      console.error("Error creating event:", err);
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.includes("NEXT_REDIRECT")) {
        return;
      }
      setError(msg || "Ocurrió un error inesperado al crear el evento.");
      setLoading(false);
    }
  }

  const filteredTemplates =
    templateCategory === "all"
      ? TEMPLATES
      : TEMPLATES.filter((t) => t.category === templateCategory);

  const currentTemplateDef = TEMPLATES.find((t) => t.id === selectedTemplate);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 flex justify-center">
      <div className="w-full max-w-3xl">
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
              Configurá los datos del evento, la plantilla de la invitación y los módulos contratados.
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
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
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
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
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
                    <h4 className="text-sm font-bold text-white">Invitación Digital</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">Plantillas, música y RSVP</p>
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

            {/* ─── SECCIÓN PLANTILLA & EDICIÓN DE INVITACIÓN ─── */}
            {hasInvitacion && (
              <div className="p-5 sm:p-6 rounded-2xl bg-slate-950/80 border border-amber-500/30 space-y-4 shadow-lg">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                        <Palette className="w-3.5 h-3.5" />
                      </span>
                      <h3 className="text-sm font-bold text-white">
                        Plantilla de Diseño de la Invitación
                      </h3>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      Elegí la estética y abrí el editor completo para personalizar música, fotos, salón y cuenta regresiva.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsConfigModalOpen(true)}
                    className="inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors shadow-md shadow-amber-500/20 cursor-pointer shrink-0"
                  >
                    <Settings2 className="w-3.5 h-3.5" />
                    <span>{customizedInvitation ? "Modificar Detalles de Invitación" : "Personalizar Detalles Completos"}</span>
                  </button>
                </div>

                {customizedInvitation && (
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Invitación personalizada con éxito (textos, música y detalles listos para guardar).</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsConfigModalOpen(true)}
                      className="text-xs text-amber-300 hover:underline font-bold"
                    >
                      Revisar
                    </button>
                  </div>
                )}

                {/* Category Filter Tabs */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
                  {TEMPLATE_CATEGORIES.map((cat) => {
                    const isActive = templateCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setTemplateCategory(cat.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
                          isActive
                            ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20"
                            : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800"
                        }`}
                      >
                        <span>{cat.emoji}</span>
                        <span>{cat.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Templates Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {filteredTemplates.map((tmpl) => {
                    const isSelected = selectedTemplate === tmpl.id;
                    return (
                      <div
                        key={tmpl.id}
                        onClick={() => setSelectedTemplate(tmpl.id)}
                        className={`p-3 rounded-xl border cursor-pointer transition-all flex flex-col justify-between text-left group ${
                          isSelected
                            ? "border-amber-400 bg-amber-500/10 shadow-lg ring-2 ring-amber-400/40"
                            : "border-slate-800 bg-slate-900/90 hover:border-slate-700"
                        }`}
                      >
                        <div>
                          <div
                            className="w-full h-10 rounded-lg mb-2 flex items-center justify-between px-2.5 border border-white/10"
                            style={{ background: tmpl.previewBg }}
                          >
                            <span className="text-xl filter drop-shadow">
                              {tmpl.emoji}
                            </span>
                            {tmpl.badge && (
                              <span className="text-[9px] font-black px-1.5 py-0.5 rounded-full bg-amber-400 text-slate-950">
                                {tmpl.badge}
                              </span>
                            )}
                          </div>

                          <div className="flex items-start justify-between gap-1 mb-1">
                            <h4 className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                              {tmpl.name}
                            </h4>
                            {isSelected && (
                              <div className="w-3.5 h-3.5 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shrink-0">
                                <Check className="w-2.5 h-2.5 stroke-[3]" />
                              </div>
                            )}
                          </div>

                          <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                            {tmpl.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Selected Template Summary */}
                {currentTemplateDef && (
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{currentTemplateDef.emoji}</span>
                      <span className="text-slate-300">
                        Plantilla elegida: <strong className="text-amber-300">{currentTemplateDef.name}</strong> ({currentTemplateDef.categoryLabel})
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsConfigModalOpen(true)}
                      className="text-xs text-indigo-400 hover:underline cursor-pointer"
                    >
                      Personalizar contenido &rarr;
                    </button>
                  </div>
                )}

                {/* Hidden Inputs for Form Submission */}
                <input type="hidden" name="template" value={selectedTemplate} />
                {customizedInvitation?.personName && <input type="hidden" name="personName" value={customizedInvitation.personName} />}
                {customizedInvitation?.headline && <input type="hidden" name="headline" value={customizedInvitation.headline} />}
                {customizedInvitation?.subheadline && <input type="hidden" name="subheadline" value={customizedInvitation.subheadline} />}
                {customizedInvitation?.eventNumber && <input type="hidden" name="eventNumber" value={customizedInvitation.eventNumber} />}
                {customizedInvitation?.badgeText && <input type="hidden" name="badgeText" value={customizedInvitation.badgeText} />}
                {customizedInvitation?.targetDate && <input type="hidden" name="targetDate" value={customizedInvitation.targetDate} />}
                {customizedInvitation?.venueName && <input type="hidden" name="venueName" value={customizedInvitation.venueName} />}
                {customizedInvitation?.venueAddress && <input type="hidden" name="venueAddress" value={customizedInvitation.venueAddress} />}
                {customizedInvitation?.venueMapsUrl && <input type="hidden" name="venueMapsUrl" value={customizedInvitation.venueMapsUrl} />}
                {customizedInvitation?.venueCalendarUrl && <input type="hidden" name="venueCalendarUrl" value={customizedInvitation.venueCalendarUrl} />}
                {customizedInvitation?.giftBankName && <input type="hidden" name="giftBankName" value={customizedInvitation.giftBankName} />}
                {customizedInvitation?.giftAlias && <input type="hidden" name="giftAlias" value={customizedInvitation.giftAlias} />}
                {customizedInvitation?.giftCbu && <input type="hidden" name="giftCbu" value={customizedInvitation.giftCbu} />}
                {customizedInvitation?.giftHolderName && <input type="hidden" name="giftHolderName" value={customizedInvitation.giftHolderName} />}
                {customizedInvitation?.audioTrackPath && <input type="hidden" name="audioTrackPath" value={customizedInvitation.audioTrackPath} />}
                {customizedInvitation?.footerPhrase && <input type="hidden" name="footerPhrase" value={customizedInvitation.footerPhrase} />}
                {customizedInvitation?.carouselImages && <input type="hidden" name="carouselImages" value={customizedInvitation.carouselImages} />}
                <input type="hidden" name="allowCompanions" value={customizedInvitation?.allowCompanions !== false ? "true" : "false"} />
                <input type="hidden" name="allowDietary" value={customizedInvitation?.allowDietary !== false ? "true" : "false"} />
              </div>
            )}

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

      {/* Pre-creation Invitation Configuration Modal */}
      {isConfigModalOpen && (
        <InvitationFormModal
          title={`Personalizar Invitación: ${title || "Nuevo Evento"}`}
          slug={slug || "slug-del-evento"}
          isPreCreation={true}
          invitation={{
            id: "temp-inv",
            slug: slug || "nuevo-evento",
            personName: customizedInvitation?.personName || title,
            headline:
              customizedInvitation?.headline ||
              (selectedTemplate.startsWith("boda") ? "¡Nos Casamos!" : title || "¡Te Invitamos!"),
            subheadline:
              customizedInvitation?.subheadline ||
              "¡Acompañanos a celebrar este momento tan especial!",
            eventNumber: customizedInvitation?.eventNumber || "",
            badgeText:
              customizedInvitation?.badgeText ||
              (date ? `${date} · 20:30 hs` : "Sábado · 20:30 hs"),
            targetDate:
              customizedInvitation?.targetDate ||
              (date ? `${date}T20:30:00-03:00` : `${new Date().toISOString().slice(0, 10)}T20:30:00-03:00`),
            venueName: customizedInvitation?.venueName || location || "Salón de Eventos",
            venueAddress: customizedInvitation?.venueAddress || location || "",
            venueMapsUrl: customizedInvitation?.venueMapsUrl || "",
            venueCalendarUrl: customizedInvitation?.venueCalendarUrl || "",
            giftBankName: customizedInvitation?.giftBankName || "",
            giftAlias: customizedInvitation?.giftAlias || "",
            giftCbu: customizedInvitation?.giftCbu || "",
            giftHolderName: customizedInvitation?.giftHolderName || "",
            audioTrackPath: customizedInvitation?.audioTrackPath || "/audio/celebration.mp3",
            footerPhrase:
              customizedInvitation?.footerPhrase ||
              "Tu presencia es nuestro mejor regalo. ¡Nos vemos en la fiesta! 🥂",
            carouselImages: customizedInvitation?.carouselImages || "",
            template: selectedTemplate,
            allowCompanions: customizedInvitation?.allowCompanions ?? true,
            allowDietary: customizedInvitation?.allowDietary ?? true,
            isDefault: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }}
          onClose={() => setIsConfigModalOpen(false)}
          onSaved={(updated) => {
            setSelectedTemplate(updated.template);
            setCustomizedInvitation(updated);
          }}
        />
      )}
    </div>
  );
}
