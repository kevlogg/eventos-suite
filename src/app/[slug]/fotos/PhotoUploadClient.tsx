"use client";

import { useState, useRef } from "react";
import { SuiteEvent } from "@/types";
import Link from "next/link";
import imageCompression from "browser-image-compression";
import { 
  Camera, 
  Upload, 
  Sparkles, 
  Check, 
  ArrowLeft, 
  Send,
  Image as ImageIcon
} from "lucide-react";

interface Props {
  event: SuiteEvent;
}

export default function PhotoUploadClient({ event }: Props) {
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [authorName, setAuthorName] = useState("");
  const [tableNumber, setTableNumber] = useState<number | "">("");
  const [caption, setCaption] = useState("");
  const [compressing, setCompressing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setCompressing(true);

    try {
      // Compress options for fast upload even with poor party hall connection
      const options = {
        maxSizeMB: 0.8,
        maxWidthOrHeight: 1280,
        useWebWorker: true,
      };

      const compressedFile = await imageCompression(file, options);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
        setCompressing(false);
      };
      reader.readAsDataURL(compressedFile);
    } catch (err) {
      console.error("Compression error:", err);
      // Fallback to direct read
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
        setCompressing(false);
      };
      reader.readAsDataURL(file);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!photoPreview || !authorName.trim()) {
      setError("Por favor seleccioná una foto e ingresá tu nombre o mesa.");
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const res = await fetch("/api/fotos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "add",
          eventId: event.id,
          photoUrl: photoPreview,
          authorName,
          tableNumber: tableNumber ? Number(tableNumber) : undefined,
          caption,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setError(data.error || "Error al subir la foto");
      }
    } catch (err) {
      console.error(err);
      setError("Error de conexión al enviar la foto.");
    } finally {
      setUploading(false);
    }
  }

  function handleReset() {
    setPhotoPreview(null);
    setCaption("");
    setSubmitted(false);
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-pink-500 selection:text-white p-4">
      <div className="max-w-md mx-auto w-full py-6">
        <Link
          href={`/${event.slug}`}
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Volver al portal de la fiesta</span>
        </Link>

        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-pink-600/20 border border-pink-500/30 flex items-center justify-center text-pink-400 mx-auto mb-3 shadow-lg shadow-pink-600/10">
            <Camera className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Mural de Fotos en Vivo</h1>
          <p className="text-xs text-slate-400 mt-1">Subí tus fotos para verlas en la pantalla gigante de la fiesta</p>
        </div>

        {submitted ? (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-4 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto text-2xl">
              🎉
            </div>
            <h2 className="text-2xl font-bold text-white">¡Foto Enviada!</h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Tu foto ya está en la fila y aparecerá en la pantalla grande del salón en instantes.
            </p>

            <button
              onClick={handleReset}
              className="w-full py-3 px-4 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-semibold text-xs transition-colors cursor-pointer"
            >
              Subir otra foto
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur shadow-2xl space-y-5">
            {/* Photo Picker Box */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Foto *
              </label>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileSelect}
                className="hidden"
              />

              {photoPreview ? (
                <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-slate-700 bg-slate-950">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-2 right-2 px-3 py-1.5 rounded-lg bg-slate-950/80 text-white text-xs font-semibold backdrop-blur hover:bg-slate-900 transition-colors"
                  >
                    Cambiar foto
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={compressing}
                  className="w-full aspect-video rounded-2xl border-2 border-dashed border-slate-700 hover:border-pink-500/60 bg-slate-950/50 flex flex-col items-center justify-center gap-2 text-slate-400 hover:text-white transition-all cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-xl bg-pink-500/10 text-pink-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                    {compressing ? (
                      <div className="w-5 h-5 rounded-full border-2 border-pink-400 border-t-transparent animate-spin" />
                    ) : (
                      <Camera className="w-6 h-6" />
                    )}
                  </div>
                  <span className="text-xs font-semibold">
                    {compressing ? "Optimizando imagen..." : "Tocar para sacar o elegir foto"}
                  </span>
                  <span className="text-[10px] text-slate-500">Cámara o Galería</span>
                </button>
              )}
            </div>

            {/* Author and Table */}
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                  Tu Nombre / Mesa *
                </label>
                <input
                  type="text"
                  required
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="Ej: Sofi y Martín / Mesa 4"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-pink-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                  N° Mesa
                </label>
                <input
                  type="number"
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value ? Number(e.target.value) : "")}
                  placeholder="4"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-pink-500"
                />
              </div>
            </div>

            {/* Dedication / Caption */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Dedicatoria o Frase
              </label>
              <input
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="¡Qué hermosa fiesta! Salud 🥂"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-pink-500"
              />
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={uploading || compressing || !photoPreview}
              className="w-full py-3.5 px-4 rounded-xl bg-pink-600 hover:bg-pink-500 disabled:opacity-50 text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors shadow-lg shadow-pink-600/25 cursor-pointer"
            >
              {uploading ? (
                <span>Transmitiendo foto...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>¡Proyectar en Pantalla Gigante!</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

