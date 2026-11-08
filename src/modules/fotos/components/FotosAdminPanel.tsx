"use client";

import { useEffect, useState } from "react";
import { SuiteEvent, EventPhoto } from "@/types";
import Link from "next/link";
import Image from "next/image";
import QRCode from "qrcode";
import { 
  Camera, 
  Tv, 
  Trash2, 
  Eye, 
  EyeOff, 
  RefreshCw, 
  QrCode, 
  Download, 
  ExternalLink,
  MessageSquare,
  Sparkles
} from "lucide-react";

interface Props {
  event: SuiteEvent;
}

export default function FotosAdminPanel({ event }: Props) {
  const [photos, setPhotos] = useState<EventPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);

  const uploadUrl = typeof window !== "undefined" ? `${window.location.origin}/${event.slug}/fotos` : `/${event.slug}/fotos`;
  const muralUrl = `/${event.slug}/pantalla/mural`;

  async function loadPhotos() {
    setLoading(true);
    try {
      const res = await fetch(`/api/fotos?eventId=${event.id}`);
      const data = await res.json();
      if (data.photos) setPhotos(data.photos);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPhotos();

    // Generate QR code for table upload
    if (typeof window !== "undefined") {
      const fullUrl = `${window.location.origin}/${event.slug}/fotos`;
      QRCode.toDataURL(fullUrl, { width: 300, margin: 2, color: { dark: "#020617", light: "#ffffff" } })
        .then((url) => setQrDataUrl(url))
        .catch(console.error);
    }
  }, [event.id, event.slug]);

  async function handleToggleStatus(photoId: string, currentApproved: boolean) {
    try {
      await fetch("/api/fotos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "moderate",
          eventId: event.id,
          photoId,
          approved: !currentApproved,
        }),
      });

      setPhotos(photos.map((p) => (p.id === photoId ? { ...p, approved: !currentApproved } : p)));
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDelete(photoId: string) {
    if (!confirm("¿Querés eliminar esta foto?")) return;
    try {
      await fetch("/api/fotos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "delete",
          eventId: event.id,
          photoId,
        }),
      });

      setPhotos(photos.filter((p) => p.id !== photoId));
    } catch (err) {
      console.error(err);
    }
  }

  const approvedCount = photos.filter((p) => p.approved).length;

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Fotos Dinámicas por QR</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Moderación en tiempo real y transmisión de fotos tomadas por los invitados en las mesas.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => loadPhotos()}
            disabled={loading}
            className="p-2 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 rounded-xl transition-colors cursor-pointer"
            title="Actualizar fotos"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-indigo-400" : ""}`} />
          </button>

          <Link
            href={muralUrl}
            target="_blank"
            className="px-3.5 py-2 rounded-xl bg-pink-600/20 hover:bg-pink-600/30 text-pink-300 border border-pink-500/30 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Tv className="w-4 h-4" />
            <span>Abrir Mural en Vivo</span>
            <ExternalLink className="w-3 h-3 ml-0.5" />
          </Link>
        </div>
      </div>

      {/* Metrics & QR Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
          <div>
            <span className="text-xs text-slate-400 font-semibold block mb-1">Mural en Pantalla</span>
            <div className="text-3xl font-bold text-white">{approvedCount}</div>
            <p className="text-[11px] text-slate-500 mt-1">fotos visibles en el proyector</p>
          </div>
          <div className="pt-4 border-t border-slate-800 text-xs text-slate-400">
            Total subidas: <strong className="text-white">{photos.length}</strong>
          </div>
        </div>

        {/* QR Card */}
        <div className="md:col-span-2 p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row items-center gap-5">
          {qrDataUrl && (
            <div className="bg-white p-2 rounded-xl shadow-lg shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={qrDataUrl} alt="QR para mesas" className="w-24 h-24 sm:w-28 sm:h-28" />
            </div>
          )}

          <div className="flex-1 text-center sm:text-left">
            <h4 className="text-sm font-bold text-white mb-1 flex items-center justify-center sm:justify-start gap-1.5">
              <QrCode className="w-4 h-4 text-pink-400" />
              <span>Código QR para las Mesas</span>
            </h4>
            <p className="text-xs text-slate-400 mb-3">
              Los invitados escanean este código con la cámara de su celular para subir fotos y dedicatorias directamente a la fiesta.
            </p>
            {qrDataUrl && (
              <a
                href={qrDataUrl}
                download={`qr-mesas-${event.slug}.png`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-pink-600 hover:bg-pink-500 text-white text-xs font-semibold shadow-md shadow-pink-600/20 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Descargar Imagen QR</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Photos Grid */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
          Galería de Fotos Subidas ({photos.length})
        </h3>

        {photos.length === 0 ? (
          <div className="p-12 text-center border border-dashed border-slate-800 rounded-2xl bg-slate-900/30 text-slate-500 text-xs">
            Aún no se han subido fotos para este evento.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between group"
              >
                <div className="relative aspect-square w-full bg-slate-950 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo.photoUrl}
                    alt={photo.caption || "Foto del evento"}
                    className={`w-full h-full object-cover transition-transform group-hover:scale-105 duration-300 ${
                      !photo.approved ? "opacity-30 grayscale" : ""
                    }`}
                  />

                  {/* Badge */}
                  <div className="absolute top-2 left-2">
                    {photo.approved ? (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/90 text-white text-[10px] font-bold backdrop-blur">
                        Visible en TV
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full bg-rose-500/90 text-white text-[10px] font-bold backdrop-blur">
                        Oculta
                      </span>
                    )}
                  </div>

                  {photo.tableNumber && (
                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-slate-950/80 text-white text-[10px] font-bold backdrop-blur">
                      Mesa {photo.tableNumber}
                    </div>
                  )}
                </div>

                {/* Info & Caption */}
                <div className="p-3 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="font-semibold text-xs text-white truncate">{photo.authorName}</div>
                    {photo.caption && (
                      <p className="text-xs text-slate-400 italic line-clamp-2 mt-1">
                        &ldquo;{photo.caption}&rdquo;
                      </p>
                    )}
                  </div>

                  {/* Moderation Controls */}
                  <div className="flex items-center justify-between pt-3 mt-2 border-t border-slate-800/80 text-xs">
                    <button
                      onClick={() => handleToggleStatus(photo.id, photo.approved)}
                      className={`px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                        photo.approved
                          ? "bg-slate-800 hover:bg-slate-700 text-slate-300"
                          : "bg-emerald-600 hover:bg-emerald-500 text-white"
                      }`}
                    >
                      {photo.approved ? (
                        <>
                          <EyeOff className="w-3.5 h-3.5" />
                          <span>Ocultar</span>
                        </>
                      ) : (
                        <>
                          <Eye className="w-3.5 h-3.5" />
                          <span>Aprobar</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => handleDelete(photo.id)}
                      className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                      title="Eliminar foto"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
