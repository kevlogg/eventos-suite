"use client";

import { useEffect, useState } from "react";
import { SuiteEvent, EventPhoto } from "@/types";
import QRCode from "qrcode";
import { Camera, Maximize, QrCode, Sparkles, Heart } from "lucide-react";

interface Props {
  event: SuiteEvent;
}

export default function LiveMuralClient({ event }: Props) {
  const [photos, setPhotos] = useState<EventPhoto[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);

  useEffect(() => {
    // Generate QR to upload photos
    if (typeof window !== "undefined") {
      const fullUrl = `${window.location.origin}/${event.slug}/fotos`;
      QRCode.toDataURL(fullUrl, { width: 300, margin: 2, color: { dark: "#020617", light: "#ffffff" } })
        .then((url) => setQrCodeUrl(url))
        .catch(console.error);
    }

    async function fetchPhotos() {
      try {
        const res = await fetch(`/api/fotos?eventId=${event.id}`);
        const data = await res.json();
        if (data.photos) {
          const approved = data.photos.filter((p: EventPhoto) => p.approved);
          setPhotos(approved);
        }
      } catch (err) {
        console.error(err);
      }
    }

    fetchPhotos();
    const pollInterval = setInterval(fetchPhotos, 4000);
    return () => clearInterval(pollInterval);
  }, [event.id, event.slug]);

  // Slideshow rotation every 6 seconds
  useEffect(() => {
    if (photos.length <= 1) return;
    const slideTimer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % photos.length);
    }, 6000);
    return () => clearInterval(slideTimer);
  }, [photos.length]);

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }

  const activePhoto = photos[currentIdx] || photos[0];

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between p-6 sm:p-10 selection:bg-pink-600 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <header className="flex items-center justify-between border-b border-slate-800 pb-6 z-10">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-pink-600 via-rose-600 to-purple-600 flex items-center justify-center text-3xl shadow-xl shadow-pink-600/30">
            📸
          </div>
          <div>
            <span className="text-xs uppercase tracking-widest text-pink-400 font-extrabold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Mural de Fotos en Vivo
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

      {/* Main Showcase Layout */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-8 py-8 items-center z-10">
        {/* Left Col: Permanent QR for tables */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col items-center text-center shadow-2xl">
          <span className="text-xs font-bold uppercase tracking-wider text-pink-400 mb-4 flex items-center gap-1.5">
            <QrCode className="w-4 h-4" /> Subí tu foto
          </span>

          {qrCodeUrl ? (
            <div className="bg-white p-3 rounded-2xl shadow-2xl mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={qrCodeUrl} alt="QR Fotos" className="w-44 h-44 sm:w-52 sm:h-52" />
            </div>
          ) : (
            <div className="w-44 h-44 sm:w-52 sm:h-52 bg-slate-800 rounded-2xl animate-pulse mb-4" />
          )}

          <p className="text-sm font-semibold text-white">¡Escaneá con tu celular!</p>
          <p className="text-xs text-slate-400 mt-1">
            Sacá una foto de tu mesa o con amigos y mirala proyectada en esta pantalla gigante.
          </p>
          <div className="mt-4 px-3 py-1.5 rounded-full bg-slate-950 border border-slate-800 text-xs font-mono text-pink-300">
            {photos.length} foto{photos.length === 1 ? "" : "s"} proyectada{photos.length === 1 ? "" : "s"}
          </div>
        </div>

        {/* Right Col: Big Featured Photo Showcase */}
        <div className="lg:col-span-3 h-full flex flex-col justify-center">
          {photos.length === 0 ? (
            <div className="p-16 text-center bg-slate-900/40 border border-slate-800 rounded-3xl text-slate-500">
              <Camera className="w-16 h-16 mx-auto mb-4 text-slate-700 animate-pulse" />
              <h3 className="text-xl font-bold text-white mb-1">¡El mural está listo!</h3>
              <p className="text-sm">Escaneá el código QR para ser el primero en aparecer en la pantalla.</p>
            </div>
          ) : (
            <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-950/80 shadow-2xl flex flex-col md:flex-row max-h-[75vh]">
              {/* Image side */}
              <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden min-h-[350px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  key={activePhoto.id}
                  src={activePhoto.photoUrl}
                  alt={activePhoto.caption || "Foto del evento"}
                  className="max-h-[70vh] w-full object-contain animate-fadeIn"
                />

                {activePhoto.tableNumber && (
                  <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-slate-950/80 text-white font-bold text-xs backdrop-blur border border-white/10">
                    Mesa {activePhoto.tableNumber}
                  </div>
                )}
              </div>

              {/* Caption details side */}
              <div className="p-6 md:p-8 md:w-80 bg-slate-900/90 border-t md:border-t-0 md:border-l border-slate-800 flex flex-col justify-between shrink-0">
                <div>
                  <div className="flex items-center gap-2 text-pink-400 text-xs font-semibold uppercase tracking-wider mb-2">
                    <Heart className="w-3.5 h-3.5 fill-pink-400" /> Recuerdo de la fiesta
                  </div>

                  <h3 className="text-xl font-extrabold text-white leading-snug mb-3">
                    {activePhoto.authorName}
                  </h3>

                  {activePhoto.caption && (
                    <blockquote className="text-sm text-slate-300 italic border-l-2 border-pink-500 pl-3 py-1">
                      &ldquo;{activePhoto.caption}&rdquo;
                    </blockquote>
                  )}
                </div>

                <div className="pt-6 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
                  <span>Foto {currentIdx + 1} de {photos.length}</span>
                  <span className="font-mono">{new Date(activePhoto.createdAt).toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" })} hs</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-xs text-slate-500 border-t border-slate-900 pt-4 z-10">
        Mural Dinámico en Vivo &bull; Proyectado con Eventos Suite
      </footer>
    </div>
  );
}

