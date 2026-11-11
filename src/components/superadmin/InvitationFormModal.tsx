"use client";

import { useState, useRef, useEffect } from "react";
import type { InvitationRecord, TemplateId, TemplateCategoryKey } from "@/lib/schemas/invitation.schema";
import { TEMPLATES, TEMPLATE_CATEGORIES } from "@/lib/schemas/invitation.schema";
import {
  type CarouselSlide,
  DEFAULT_SLIDES,
  parseCarouselSlides,
} from "@/components/invitation/PhotoCarousel";
import {
  X,
  Palette,
  Sparkles,
  Play,
  Square,
  Volume2,
  VolumeX,
  Upload,
  RefreshCw,
  Camera,
  Trash2,
  Gift,
  Calendar,
  MapPin,
  Users,
  Check,
  AlertTriangle,
  Loader2,
  Link as LinkIcon,
} from "lucide-react";
import { handleSaveInvitationAction } from "@/app/superadmin/actions";

interface InvitationFormModalProps {
  title?: string;
  eventId?: string;
  slug?: string;
  invitation?: InvitationRecord | null;
  isPreCreation?: boolean;
  onClose: () => void;
  onSaved?: (updated: InvitationRecord) => void;
}

// Helpers for date/time conversion and formatting
function isoToDatetimeLocal(isoStr?: string): string {
  if (!isoStr) return "";
  try {
    const d = new Date(isoStr);
    if (isNaN(d.getTime())) return "";
    const pad = (n: number) => String(n).padStart(2, "0");
    const year = d.getFullYear();
    const month = pad(d.getMonth() + 1);
    const day = pad(d.getDate());
    const hours = pad(d.getHours());
    const minutes = pad(d.getMinutes());
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  } catch {
    return "";
  }
}

function formatBadgeFromDatetimeLocal(localVal: string): string {
  if (!localVal) return "";
  try {
    const [datePart, timePart] = localVal.split("T");
    if (!datePart) return "";
    const [year, month, day] = datePart.split("-").map(Number);
    const [hour, min] = (timePart || "20:00").split(":").map(Number);
    const d = new Date(year, month - 1, day, hour, min);

    const days = [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
    ];
    const months = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];
    const dayName = days[d.getDay()];
    const monthName = months[d.getMonth()];
    const timeStr = `${String(hour).padStart(2, "0")}:${String(min).padStart(2, "0")} hs`;

    return `${dayName} · ${day} de ${monthName} · ${timeStr}`;
  } catch {
    return "";
  }
}

function datetimeLocalToIsoWithOffset(localVal: string): string {
  if (!localVal) return "";
  return `${localVal}:00-03:00`;
}

// Client-side image compressor for carousel photos
function compressImageFile(file: File, maxWidth = 1200, quality = 0.82): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function InvitationFormModal({
  title = "Editar Invitación Digital",
  eventId,
  slug,
  invitation,
  isPreCreation = false,
  onClose,
  onSaved,
}: InvitationFormModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Template state
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>(
    (invitation?.template as TemplateId) || "classic-gold"
  );

  const isWedding =
    selectedTemplate === "boda-botanica" ||
    selectedTemplate === "boda-clasica" ||
    selectedTemplate === "boda-boho";

  // Category state for template selection
  const initialCategory: TemplateCategoryKey = (() => {
    if (invitation?.template) {
      const match = TEMPLATES.find((t) => t.id === invitation.template);
      if (match) return match.category;
    }
    return "all";
  })();
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategoryKey>(initialCategory);

  // Carousel slides state (Universal: 1 a 3 fotos para cualquier plantilla)
  const initialParsedPhotos = parseCarouselSlides(invitation?.carouselImages) || [];
  const [includePhotos, setIncludePhotos] = useState<boolean>(initialParsedPhotos.length > 0);
  const [photoCount, setPhotoCount] = useState<number>(
    initialParsedPhotos.length > 0 ? Math.min(3, Math.max(1, initialParsedPhotos.length)) : 1
  );

  const initialSlides: CarouselSlide[] = [
    initialParsedPhotos[0] || { src: "", alt: "Foto 1", caption: "" },
    initialParsedPhotos[1] || { src: "", alt: "Foto 2", caption: "" },
    initialParsedPhotos[2] || { src: "", alt: "Foto 3", caption: "" },
  ];
  const [carouselSlides, setCarouselSlides] = useState<CarouselSlide[]>(initialSlides);

  const handleImageUpload = async (index: number, file: File) => {
    try {
      // Compresión en HD liviana para móvil rápido (máx 1000px ancho, calidad 0.78)
      const base64 = await compressImageFile(file, 1000, 0.78);
      setCarouselSlides((prev) => {
        const copy = [...prev];
        copy[index] = { ...copy[index], src: base64 };
        return copy;
      });
    } catch (err) {
      console.error("Error compressing image:", err);
    }
  };

  const handleCaptionChange = (index: number, caption: string) => {
    setCarouselSlides((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], caption };
      return copy;
    });
  };

  const handleClearPhoto = (index: number) => {
    setCarouselSlides((prev) => {
      const copy = [...prev];
      copy[index] = { src: "", alt: `Foto ${index + 1}`, caption: "" };
      return copy;
    });
  };

  // Date and Badge state
  const initialLocal =
    isoToDatetimeLocal(invitation?.targetDate) ||
    `${new Date().toISOString().slice(0, 10)}T20:30`;
  const [datetimeLocal, setDatetimeLocal] = useState<string>(initialLocal);
  const [badgeText, setBadgeText] = useState<string>(
    invitation?.badgeText || formatBadgeFromDatetimeLocal(initialLocal) || "Sábado · 20:30 hs"
  );

  // Optional Gifts Section State
  const initialHasGifts = Boolean(
    invitation?.giftAlias ||
      invitation?.giftCbu ||
      (invitation?.giftBankName &&
        invitation.giftBankName !== "Banco / Billetera Virtual")
  );
  const [includeGifts, setIncludeGifts] = useState<boolean>(initialHasGifts);

  // RSVP Form Options
  const [allowCompanions, setAllowCompanions] = useState<boolean>(
    invitation?.allowCompanions ?? true
  );
  const [allowDietary, setAllowDietary] = useState<boolean>(
    invitation?.allowDietary ?? true
  );

  // Audio state (Persiste fielmente la última elección del usuario, incluso 'Sin música')
  const initialAudioMode = (): "preset" | "upload" | "url" | "none" | "keep" => {
    if (invitation) {
      if (invitation.audioTrackPath === "" || invitation.audioTrackPath === null) return "none";
      if (invitation.audioTrackPath) {
        if (invitation.audioTrackPath.startsWith("/audio/")) return "preset";
        if (invitation.audioTrackPath.includes("/event-audio/")) return "upload";
        if (invitation.audioTrackPath.startsWith("http")) return "upload";
        return "keep";
      }
    }
    return "preset";
  };

  const [audioMode, setAudioMode] = useState<"preset" | "upload" | "url" | "none" | "keep">(
    initialAudioMode()
  );
  const [uploadedAudioFileName, setUploadedAudioFileName] = useState<string>(
    invitation?.audioTrackPath && (invitation.audioTrackPath.includes("/event-audio/") || invitation.audioTrackPath.startsWith("http"))
      ? "Canción subida guardada"
      : ""
  );
  const [uploadedAudioUrl, setUploadedAudioUrl] = useState<string>(
    invitation?.audioTrackPath && (invitation.audioTrackPath.includes("/event-audio/") || invitation.audioTrackPath.startsWith("http"))
      ? invitation.audioTrackPath
      : ""
  );
  const [localBlobUrl, setLocalBlobUrl] = useState<string | null>(null);
  const [isUploadingAudio, setIsUploadingAudio] = useState<boolean>(false);
  const [audioUploadProgress, setAudioUploadProgress] = useState<string | null>(null);
  const [audioUrlInput, setAudioUrlInput] = useState<string>(
    invitation?.audioTrackPath && invitation.audioTrackPath.startsWith("http") && !invitation.audioTrackPath.includes("/event-audio/")
      ? invitation.audioTrackPath
      : ""
  );
  const [audioError, setAudioError] = useState<string | null>(null);
  const [selectedPresetAudio, setSelectedPresetAudio] = useState<string>(
    invitation?.audioTrackPath && invitation.audioTrackPath.startsWith("/audio/")
      ? invitation.audioTrackPath
      : "/audio/celebration.mp3"
  );
  const [isPlayingPreview, setIsPlayingPreview] = useState<boolean>(false);
  const previewAudioRef = useRef<HTMLAudioElement | null>(null);

  const handleAudioFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setAudioError(null);
    setIsPlayingPreview(false);
    if (previewAudioRef.current) {
      previewAudioRef.current.pause();
    }
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 15 * 1024 * 1024) {
      setAudioError(
        `⚠️ El archivo pesa ${(file.size / (1024 * 1024)).toFixed(1)}MB. El límite máximo permitido es de 15MB.`
      );
      e.target.value = "";
      return;
    }

    setUploadedAudioFileName(file.name);
    // Instant local preview URL
    const blobUrl = URL.createObjectURL(file);
    setLocalBlobUrl(blobUrl);

    setIsUploadingAudio(true);
    setAudioUploadProgress("Preparando subida directa a la nube...");

    try {
      // 1. Request signed upload URL from server
      const signedRes = await fetch("/api/audio/signed-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileName: file.name,
          fileType: file.type || "audio/mpeg",
          slug: slug || "invitacion",
        }),
      });

      if (!signedRes.ok) {
        const errJson = await signedRes.json().catch(() => ({}));
        throw new Error(errJson.error || "No se pudo obtener autorización de subida");
      }

      const { signedUrl, publicUrl } = await signedRes.json();
      setAudioUploadProgress("Subiendo canción a la nube...");

      // 2. Direct binary upload to Supabase Storage (bypasses Vercel 4.5MB limit)
      const uploadRes = await fetch(signedUrl, {
        method: "PUT",
        headers: {
          "Content-Type": file.type || "audio/mpeg",
        },
        body: file,
      });

      if (!uploadRes.ok) {
        throw new Error(`Error en el almacenamiento (${uploadRes.status})`);
      }

      setUploadedAudioUrl(publicUrl);
      setAudioUploadProgress(null);
    } catch (err: unknown) {
      console.error("Audio upload error:", err);
      setAudioError(
        `⚠️ Error al subir la canción: ${err instanceof Error ? err.message : "Error desconocido"}. Podés intentar nuevamente o pegar un enlace en "🔗 Enlace URL".`
      );
      setUploadedAudioUrl("");
      setAudioUploadProgress(null);
    } finally {
      setIsUploadingAudio(false);
    }
  };

  const currentPreviewSrc =
    audioMode === "preset"
      ? selectedPresetAudio
      : audioMode === "upload"
      ? localBlobUrl || uploadedAudioUrl
      : audioMode === "url"
      ? audioUrlInput
      : audioMode === "keep"
      ? invitation?.audioTrackPath || ""
      : "";

  const togglePreview = () => {
    if (!previewAudioRef.current || !currentPreviewSrc) return;
    if (isPlayingPreview) {
      previewAudioRef.current.pause();
      setIsPlayingPreview(false);
    } else {
      previewAudioRef.current.src = currentPreviewSrc;
      previewAudioRef.current
        .play()
        .then(() => setIsPlayingPreview(true))
        .catch(() => setIsPlayingPreview(false));
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    setDatetimeLocal(newVal);
    const autoBadge = formatBadgeFromDatetimeLocal(newVal);
    if (autoBadge) {
      setBadgeText(autoBadge);
    }
  };

  const handleRegenerateBadge = () => {
    const autoBadge = formatBadgeFromDatetimeLocal(datetimeLocal);
    if (autoBadge) {
      setBadgeText(autoBadge);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isUploadingAudio) {
      setError("Por favor aguardá unos segundos a que finalice la subida de la canción.");
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData(e.currentTarget);

    // Compute targetDate from datetimeLocal
    const targetDateIso = datetimeLocalToIsoWithOffset(datetimeLocal);
    formData.set("targetDate", targetDateIso);
    formData.set("template", selectedTemplate);
    formData.set("allowCompanions", String(allowCompanions));
    formData.set("allowDietary", String(allowDietary));

    // Audio handling in formData
    if (audioMode === "none") {
      formData.set("audioTrackPath", "");
    } else if (audioMode === "preset") {
      formData.set("audioTrackPath", selectedPresetAudio);
    } else if (audioMode === "url") {
      formData.set("audioTrackPath", audioUrlInput.trim());
    } else if (audioMode === "upload") {
      if (uploadedAudioUrl) {
        formData.set("audioTrackPath", uploadedAudioUrl);
      } else if (invitation?.audioTrackPath) {
        formData.set("audioTrackPath", invitation.audioTrackPath);
      } else {
        formData.set("audioTrackPath", "");
      }
    } else if (audioMode === "keep" && invitation?.audioTrackPath) {
      formData.set("audioTrackPath", invitation.audioTrackPath);
    }

    formData.delete("audioFile");

    // Carousel images configuration (Universal: 1 a 3 fotos para cualquier plantilla)
    if (isWedding) {
      formData.set("eventNumber", "");
    }

    if (includePhotos) {
      const activeSlides = carouselSlides
        .slice(0, photoCount)
        .filter((s) => s.src && s.src.trim() !== "");
      formData.set("carouselImages", activeSlides.length > 0 ? JSON.stringify(activeSlides) : "");
    } else {
      formData.set("carouselImages", "");
    }

    // If gifts are not included, clear gift values
    if (!includeGifts) {
      formData.set("giftBankName", "");
      formData.set("giftAlias", "");
      formData.set("giftCbu", "");
      formData.set("giftHolderName", "");
    }

    if (isPreCreation) {
      const activePreSlides = includePhotos
        ? carouselSlides
            .slice(0, photoCount)
            .filter((s) => s.src && s.src.trim() !== "")
        : [];

      const record: InvitationRecord = {
        id: invitation?.id || "temp-inv",
        slug: slug || "",
        personName: (formData.get("personName") as string) || "",
        headline: (formData.get("headline") as string) || "",
        subheadline: (formData.get("subheadline") as string) || "",
        eventNumber: (formData.get("eventNumber") as string) || "",
        badgeText: (formData.get("badgeText") as string) || "",
        targetDate: targetDateIso,
        venueName: (formData.get("venueName") as string) || "",
        venueAddress: (formData.get("venueAddress") as string) || "",
        venueMapsUrl: (formData.get("venueMapsUrl") as string) || "",
        venueCalendarUrl: (formData.get("venueCalendarUrl") as string) || "",
        giftBankName: includeGifts ? (formData.get("giftBankName") as string) || "" : "",
        giftAlias: includeGifts ? (formData.get("giftAlias") as string) || "" : "",
        giftCbu: includeGifts ? (formData.get("giftCbu") as string) || "" : "",
        giftHolderName: includeGifts ? (formData.get("giftHolderName") as string) || "" : "",
        audioTrackPath: (formData.get("audioTrackPath") as string) ?? "",
        footerPhrase: (formData.get("footerPhrase") as string) || "",
        carouselImages: activePreSlides.length > 0 ? JSON.stringify(activePreSlides) : "",
        template: selectedTemplate,
        allowCompanions,
        allowDietary,
        isDefault: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setSuccess("¡Configuración de invitación aplicada!");
      if (onSaved) onSaved(record);
      setTimeout(() => onClose(), 600);
      return;
    }

    try {
      const res = await handleSaveInvitationAction(eventId || "", slug || "", formData);
      if (res.success && res.invitation) {
        setSuccess(res.message || "Invitación guardada exitosamente");
        if (onSaved) {
          onSaved(res.invitation);
        }
        setTimeout(() => {
          onClose();
        }, 1200);
      } else {
        setError(res.error || "Error al guardar la invitación.");
        setIsSubmitting(false);
      }
    } catch (err: unknown) {
      console.error("Error saving invitation:", err);
      setError(err instanceof Error ? err.message : "Error inesperado");
      setIsSubmitting(false);
    }
  };

  const filteredTemplates =
    selectedCategory === "all"
      ? TEMPLATES
      : TEMPLATES.filter((t) => t.category === selectedCategory);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
    >
      <audio
        ref={previewAudioRef}
        onEnded={() => setIsPlayingPreview(false)}
        className="hidden"
      />

      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl text-slate-100 my-8 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Top Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between sticky top-0 z-20 backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2">
                {title}
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                Evento: /{slug}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            type="button"
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-8 overflow-y-auto space-y-8 flex-1">
          {error && (
            <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm flex items-center gap-3">
              <Check className="w-5 h-5 shrink-0 text-emerald-400" />
              <span>{success}</span>
            </div>
          )}

          <form id="invitationForm" onSubmit={handleSubmit} className="space-y-8">
            {/* ─── SECCIÓN 0: ELECCIÓN DE PLANTILLA VISUAL ─── */}
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-950/70 border border-amber-500/30">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold text-amber-300 flex items-center gap-2">
                    <Palette className="w-4 h-4" /> Plantilla de Diseño Temática
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Seleccioná la estética visual que verán los invitados al ingresar.
                  </p>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                  {TEMPLATES.find((t) => t.id === selectedTemplate)?.name}
                </span>
              </div>

              {/* Category Filter Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-4 scrollbar-none">
                {TEMPLATE_CATEGORIES.map((cat) => {
                  const isActive = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
                        isActive
                          ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20"
                          : "bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800"
                      }`}
                    >
                      <span>{cat.emoji}</span>
                      <span>{cat.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Template Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {filteredTemplates.map((tmpl) => {
                  const isSelected = selectedTemplate === tmpl.id;
                  return (
                    <div
                      key={tmpl.id}
                      onClick={() => setSelectedTemplate(tmpl.id)}
                      className={`relative p-3.5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between text-left group ${
                        isSelected
                          ? "border-amber-400 bg-amber-500/10 shadow-lg ring-2 ring-amber-400/40"
                          : "border-slate-800 bg-slate-900/60 hover:border-slate-700"
                      }`}
                    >
                      <div>
                        {/* Mini visual swatch banner */}
                        <div
                          className="w-full h-12 rounded-xl mb-3 flex items-center justify-between px-3 border border-white/10"
                          style={{ background: tmpl.previewBg }}
                        >
                          <span className="text-2xl filter drop-shadow">
                            {tmpl.emoji}
                          </span>
                          {tmpl.badge && (
                            <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 shadow">
                              {tmpl.badge}
                            </span>
                          )}
                        </div>

                        <div className="flex items-start justify-between gap-1 mb-1">
                          <h4 className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                            {tmpl.name}
                          </h4>
                          {isSelected && (
                            <div className="w-4 h-4 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shrink-0">
                              <Check className="w-3 h-3 stroke-[3]" />
                            </div>
                          )}
                        </div>

                        <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                          {tmpl.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5 mt-3 pt-2 border-t border-slate-800/80 text-[10px] text-slate-400">
                        <span
                          className="w-2.5 h-2.5 rounded-full border border-white/20 shrink-0"
                          style={{ background: tmpl.accentColor }}
                        />
                        <span className="truncate">{tmpl.categoryLabel}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ─── SECCIÓN 1: DATOS PRINCIPALES DEL FESTEJO ─── */}
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                1. Textos Principales de la Invitación
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                    Homenajeado(s) / Pareja *
                  </label>
                  <input
                    type="text"
                    name="personName"
                    required
                    defaultValue={invitation?.personName || ""}
                    placeholder="Ej: Lucas & Flor o Martina"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                    Título Principal *
                  </label>
                  <input
                    type="text"
                    name="headline"
                    required
                    defaultValue={
                      invitation?.headline ||
                      (isWedding ? "¡Nos Casamos!" : "Mis 15 Años")
                    }
                    placeholder="Ej: ¡Nos Casamos! o Los 70 de Gabriel"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                  Subtítulo / Mensaje de Invitación *
                </label>
                <input
                  type="text"
                  name="subheadline"
                  required
                  defaultValue={
                    invitation?.subheadline ||
                    "¡Acompañanos a celebrar este momento tan especial!"
                  }
                  placeholder="Ej: Una noche inolvidable para compartir con vos"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 text-sm"
                />
              </div>

              {!isWedding && (
                <div className="max-w-xs">
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                    Edad / Aniversario (opcional)
                  </label>
                  <input
                    type="text"
                    name="eventNumber"
                    defaultValue={invitation?.eventNumber || ""}
                    placeholder="Ej: 15 o 70"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 text-sm"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    Aparecerá en el sello del sobre o distintivo de la tarjeta.
                  </p>
                </div>
              )}
            </div>

            {/* ─── SECCIÓN 2: FECHA, HORA Y CUENTA REGRESIVA ─── */}
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Calendar className="w-4 h-4 text-indigo-400" />
                2. Fecha, Hora y Cuenta Regresiva
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                    Fecha y Hora Exacta (para cuenta regresiva) *
                  </label>
                  <input
                    type="datetime-local"
                    value={datetimeLocal}
                    onChange={handleDateChange}
                    required
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-indigo-500 text-sm"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-semibold text-slate-400">
                      Texto Visible de la Fecha *
                    </label>
                    <button
                      type="button"
                      onClick={handleRegenerateBadge}
                      className="text-[11px] text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>Autogenerar</span>
                    </button>
                  </div>
                  <input
                    type="text"
                    name="badgeText"
                    required
                    value={badgeText}
                    onChange={(e) => setBadgeText(e.target.value)}
                    placeholder="Ej: Sábado · 15 de Noviembre · 20:30 hs"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-indigo-500 text-sm"
                  />
                </div>
              </div>
            </div>

            {/* ─── SECCIÓN 3: LUGAR DEL EVENTO ─── */}
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <MapPin className="w-4 h-4 text-indigo-400" />
                3. Lugar y Cómo Llegar
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                    Nombre del Salón / Finca *
                  </label>
                  <input
                    type="text"
                    name="venueName"
                    required
                    defaultValue={invitation?.venueName || ""}
                    placeholder="Ej: Salón Los Robles"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                    Dirección Completa *
                  </label>
                  <input
                    type="text"
                    name="venueAddress"
                    required
                    defaultValue={invitation?.venueAddress || ""}
                    placeholder="Ej: Av. Las Magnolias 1200, Pilar"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                    Enlace de Google Maps (opcional)
                  </label>
                  <input
                    type="url"
                    name="venueMapsUrl"
                    defaultValue={invitation?.venueMapsUrl || ""}
                    placeholder="https://maps.google.com/..."
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                    Enlace de Google Calendar (opcional)
                  </label>
                  <input
                    type="url"
                    name="venueCalendarUrl"
                    defaultValue={invitation?.venueCalendarUrl || ""}
                    placeholder="https://calendar.google.com/..."
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 text-sm"
                  />
                </div>
              </div>
            </div>

            {/* ─── SECCIÓN 4: MÚSICA & AUDIO ─── */}
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-indigo-400" />
                  4. Música de Fondo de la Invitación
                </h3>

                {currentPreviewSrc && audioMode !== "none" && (
                  <button
                    type="button"
                    onClick={togglePreview}
                    className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {isPlayingPreview ? (
                      <>
                        <Square className="w-3.5 h-3.5 fill-indigo-300" />
                        <span>Pausar Música</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 fill-indigo-300" />
                        <span>Probar Audio</span>
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* Mode selector pills */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: "preset", label: "🎵 Canción Predeterminada" },
                  { id: "upload", label: "📤 Subir Archivo MP3" },
                  { id: "url", label: "🔗 Enlace URL" },
                  { id: "none", label: "🔇 Sin Música" },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setAudioMode(item.id as any);
                      if (isPlayingPreview && previewAudioRef.current) {
                        previewAudioRef.current.pause();
                        setIsPlayingPreview(false);
                      }
                    }}
                    className={`py-2 px-3 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer ${
                      audioMode === item.id
                        ? "bg-indigo-600 border-indigo-500 text-white font-bold shadow-md shadow-indigo-600/20"
                        : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {audioError && (
                <p className="text-xs text-red-400">{audioError}</p>
              )}

              {audioMode === "preset" && (
                <div className="space-y-2 pt-2">
                  <label className="block text-xs font-semibold text-slate-400">
                    Seleccioná una canción de la galería:
                  </label>
                  <select
                    value={selectedPresetAudio}
                    onChange={(e) => {
                      setSelectedPresetAudio(e.target.value);
                      if (isPlayingPreview && previewAudioRef.current) {
                        previewAudioRef.current.pause();
                        setIsPlayingPreview(false);
                      }
                    }}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500"
                  >
                    <option value="/audio/celebration.mp3">
                      🎉 Kool & The Gang - Celebration (Fiesta y Alegría)
                    </option>
                    <option value="/audio/LosAngelesAzules-LaCumbiadelInfinito.mp3">
                      💃 Los Ángeles Azules - La Cumbia del Infinito (Cumbia & Festejo)
                    </option>
                  </select>
                </div>
              )}

              {audioMode === "upload" && (
                <div className="space-y-3 pt-2">
                  <label className="block text-xs font-semibold text-slate-400">
                    Seleccioná un archivo de audio MP3 (máx 15MB):
                  </label>
                  <input
                    type="file"
                    accept="audio/*,.mp3,.m4a,.aac,.wav,.ogg"
                    onChange={handleAudioFileChange}
                    disabled={isUploadingAudio}
                    className="w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-500 cursor-pointer disabled:opacity-50"
                  />
                  {isUploadingAudio && (
                    <div className="flex items-center gap-2 text-xs text-indigo-400 animate-pulse">
                      <Loader2 className="w-4 h-4 animate-spin shrink-0" />
                      <span>{audioUploadProgress || "Subiendo canción a la nube..."}</span>
                    </div>
                  )}
                  {!isUploadingAudio && uploadedAudioUrl && (
                    <p className="text-xs text-emerald-400 font-mono flex items-center gap-1.5">
                      <span>✓ Canción lista en la nube:</span>
                      <span className="text-white font-medium truncate max-w-xs">{uploadedAudioFileName || "audio.mp3"}</span>
                    </p>
                  )}
                </div>
              )}

              {audioMode === "url" && (
                <div className="space-y-2 pt-2">
                  <label className="block text-xs font-semibold text-slate-400">
                    Ingresá la URL directa del audio (MP3 / AAC):
                  </label>
                  <input
                    type="url"
                    value={audioUrlInput}
                    onChange={(e) => setAudioUrlInput(e.target.value)}
                    placeholder="https://servidor.com/mi-cancion.mp3"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>
              )}
            </div>

            {/* ─── SECCIÓN 5: FOTOS DE LA INVITACIÓN (1 a 3 fotos para todas las plantillas) ─── */}
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <Camera className="w-4 h-4 text-indigo-400" />
                    5. Fotos de la Invitación (1 a 3 fotos)
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Se muestran en la portada (1 foto fija o carrusel interactivo si agregás 2 o 3 fotos).
                  </p>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includePhotos}
                    onChange={(e) => setIncludePhotos(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>

              {includePhotos && (
                <div className="space-y-4 pt-3 border-t border-slate-800/80">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="text-xs font-semibold text-slate-300">
                      Cantidad de fotos a incluir:
                    </span>
                    <div className="inline-flex rounded-xl bg-slate-900 p-1 border border-slate-800">
                      {[1, 2, 3].map((count) => (
                        <button
                          key={count}
                          type="button"
                          onClick={() => setPhotoCount(count)}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            photoCount === count
                              ? "bg-indigo-600 text-white shadow-sm"
                              : "text-slate-400 hover:text-white"
                          }`}
                        >
                          {count === 1 ? "1 Foto" : `${count} Fotos (Carrusel)`}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className={`grid gap-4 ${photoCount === 1 ? "grid-cols-1 max-w-sm mx-auto" : photoCount === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 sm:grid-cols-3"}`}>
                    {Array.from({ length: photoCount }).map((_, idx) => {
                      const slide = carouselSlides[idx] || { src: "", alt: `Foto ${idx + 1}`, caption: "" };
                      const hasImage = Boolean(slide.src && slide.src.trim() !== "");

                      return (
                        <div
                          key={idx}
                          className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-3"
                        >
                          <div className="space-y-2">
                            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center">
                              {hasImage ? (
                                <>
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img
                                    src={slide.src}
                                    alt={slide.alt || `Foto ${idx + 1}`}
                                    className="w-full h-full object-cover"
                                  />
                                  <span className="absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-md bg-black/70 text-white backdrop-blur">
                                    Foto #{idx + 1}
                                  </span>
                                </>
                              ) : (
                                <div className="flex flex-col items-center justify-center text-center p-4 gap-1.5 text-slate-500">
                                  <Camera className="w-8 h-8 text-slate-600" />
                                  <span className="text-xs font-semibold text-slate-400">
                                    Foto #{idx + 1} vacía
                                  </span>
                                  <span className="text-[10px] text-slate-600">
                                    Toca abajo para subir
                                  </span>
                                </div>
                              )}
                            </div>

                            <div>
                              <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                                Epígrafe / Frase (opcional):
                              </label>
                              <input
                                type="text"
                                value={slide.caption || ""}
                                onChange={(e) => handleCaptionChange(idx, e.target.value)}
                                placeholder="Frase para la foto..."
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                              />
                            </div>
                          </div>

                          <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
                            <label className="flex-1 py-1.5 px-2 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-[11px] font-semibold flex items-center justify-center gap-1 cursor-pointer transition-colors">
                              <Upload className="w-3 h-3" />
                              <span>{hasImage ? "Cambiar Foto" : "Subir Foto"}</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  const f = e.target.files?.[0];
                                  if (f) handleImageUpload(idx, f);
                                }}
                                className="hidden"
                              />
                            </label>
                            {hasImage && (
                              <button
                                type="button"
                                onClick={() => handleClearPhoto(idx)}
                                title="Quitar foto"
                                className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* ─── SECCIÓN 6: REGALO Y DATOS BANCARIOS ─── */}
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <Gift className="w-4 h-4 text-indigo-400" />
                    6. Regalo y Datos Bancarios (Opcional)
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Habilitá un cofre virtual o sobre de regalo con tus datos de transferencia.
                  </p>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeGifts}
                    onChange={(e) => setIncludeGifts(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>

              {includeGifts && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-800/80">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                      Banco o Billetera Virtual
                    </label>
                    <input
                      type="text"
                      name="giftBankName"
                      defaultValue={invitation?.giftBankName || "Mercado Pago"}
                      placeholder="Ej: Mercado Pago o Banco Galicia"
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                      Alias
                    </label>
                    <input
                      type="text"
                      name="giftAlias"
                      defaultValue={invitation?.giftAlias || ""}
                      placeholder="Ej: MI.FIESTA.2026"
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                      CBU / CVU
                    </label>
                    <input
                      type="text"
                      name="giftCbu"
                      defaultValue={invitation?.giftCbu || ""}
                      placeholder="00000031000..."
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                      Titular de la Cuenta
                    </label>
                    <input
                      type="text"
                      name="giftHolderName"
                      defaultValue={invitation?.giftHolderName || ""}
                      placeholder="Nombre y Apellido"
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 text-sm"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* ─── SECCIÓN 7: OPCIONES DE RSVP ─── */}
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Users className="w-4 h-4 text-indigo-400" />
                7. Opciones de Confirmación de Asistencia (RSVP)
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900 border border-slate-800 cursor-pointer hover:border-slate-700 transition-colors">
                  <input
                    type="checkbox"
                    checked={allowCompanions}
                    onChange={(e) => setAllowCompanions(e.target.checked)}
                    className="mt-0.5 rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <div>
                    <span className="text-xs font-bold text-white block">
                      Permitir Indicar Acompañantes
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Los invitados pueden sumar miembros de su familia o pareja.
                    </span>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900 border border-slate-800 cursor-pointer hover:border-slate-700 transition-colors">
                  <input
                    type="checkbox"
                    checked={allowDietary}
                    onChange={(e) => setAllowDietary(e.target.checked)}
                    className="mt-0.5 rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <div>
                    <span className="text-xs font-bold text-white block">
                      Preguntar Menú / Restricciones Alimentarias
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Permite avisar si son celíacos, vegetarianos, veganos, etc.
                    </span>
                  </div>
                </label>
              </div>
            </div>

            {/* ─── SECCIÓN 8: PIE DE INVITACIÓN ─── */}
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <label className="block text-xs font-semibold text-slate-400">
                Frase de Cierre / Despedida (al final de la página):
              </label>
              <input
                type="text"
                name="footerPhrase"
                defaultValue={
                  invitation?.footerPhrase ||
                  "Tu presencia es nuestro mejor regalo. ¡Nos vemos en la fiesta! 🥂"
                }
                placeholder="Ej: ¡Vení listo para festejar toda la noche!"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 text-sm"
              />
            </div>

            {/* Modal Bottom Action Bar */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3 sticky bottom-0 bg-slate-900/90 backdrop-blur py-3">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors cursor-pointer"
              >
                Cancelar
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-indigo-600/25 transition-all cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Guardando cambios...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>Guardar Invitación</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
