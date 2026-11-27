"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import TemplatesPhoneCarousel from "@/components/home/TemplatesPhoneCarousel";
import {
  Sparkles,
  ChevronRight,
  Check,
  ExternalLink,
  Download,
  Smartphone,
  Tv,
  QrCode,
  Calendar,
  Users,
  ArrowRight,
  TrendingUp,
  Shield,
  Clock,
  Zap,
} from "lucide-react";

function WhatsAppIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.04 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.16 12.04 20.16C10.66 20.16 9.3 19.8 8.1 19.11L7.81 18.94L4.69 19.76L5.52 16.72L5.33 16.42C4.58 15.22 4.19 13.82 4.19 11.91C4.19 7.37 7.89 3.67 12.04 3.67ZM8.63 7.33C8.44 7.33 8.24 7.34 8.06 7.69C7.87 8.04 7.33 8.56 7.33 9.61C7.33 10.66 8.1 11.67 8.21 11.82C8.32 11.97 9.71 14.11 11.83 15.03C13.59 15.79 13.95 15.64 14.33 15.6C14.71 15.56 15.57 15.09 15.75 14.59C15.93 14.09 15.93 13.66 15.88 13.57C15.83 13.48 15.69 13.43 15.46 13.31C15.23 13.19 14.12 12.65 13.91 12.58C13.7 12.5 13.55 12.46 13.4 12.69C13.25 12.92 12.82 13.43 12.69 13.58C12.56 13.73 12.43 13.75 12.2 13.63C11.97 13.51 11.23 13.27 10.35 12.49C9.66 11.88 9.2 11.13 9.07 10.9C8.94 10.67 9.06 10.55 9.17 10.44C9.27 10.34 9.39 10.18 9.51 10.04C9.63 9.9 9.67 9.79 9.75 9.63C9.83 9.47 9.79 9.33 9.73 9.21C9.67 9.09 9.21 7.97 9.02 7.51C8.83 7.06 8.64 7.12 8.5 7.11L8.63 7.33Z" />
    </svg>
  );
}

export default function HomeExperience() {
  // Selector de audiencia principal: 'festejadores' o 'organizadores'
  const [audience, setAudience] = useState<"festejadores" | "organizadores">("festejadores");

  // Simulador B2B para salones
  const [eventosMes, setEventosMes] = useState<number>(4);
  const serviciosPorEvento = 3;
  const totalServicios = eventosMes * serviciosPorEvento;
  
  let costoUnitario = 50000;
  let tramoNombre = "Tramo 1 (1 a 3 serv.)";
  if (totalServicios >= 7) {
    costoUnitario = 30000;
    tramoNombre = "Tramo 3 (7+ serv. - VIP)";
  } else if (totalServicios >= 4) {
    costoUnitario = 40000;
    tramoNombre = "Tramo 2 (4 a 6 serv.)";
  }

  const precioVentaSugerido = 70000;
  const ingresoBruto = totalServicios * precioVentaSugerido;
  const costoTotal = totalServicios * costoUnitario;
  const gananciaNeta = ingresoBruto - costoTotal;

  return (
    <div
      id="servicios"
      className="relative z-20 bg-[#06070a] rounded-t-[44px] sm:rounded-t-[64px] border-t border-white/15 shadow-[0_-30px_90px_rgba(0,0,0,0.95)] min-h-screen w-full max-w-full overflow-x-hidden text-slate-100"
    >
      {/* ─── 1. BARRA DE CONFIANZA Y CALIDAD (POST-HERO) ─── */}
      <div className="border-b border-white/10 bg-white/[0.02] backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2.5">
              <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
              <span className="text-xs sm:text-sm font-semibold text-slate-300">
                <strong className="text-white">Cero descargas:</strong> abre con la cámara
              </span>
            </div>
            <div className="flex items-center justify-center lg:justify-start gap-2.5">
              <span className="w-2 h-2 rounded-full bg-slate-300 shrink-0" />
              <span className="text-xs sm:text-sm font-semibold text-slate-300">
                <strong className="text-white">Smart TVs & LEDs:</strong> compatible 100%
              </span>
            </div>
            <div className="flex items-center justify-center lg:justify-start gap-2.5">
              <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
              <span className="text-xs sm:text-sm font-semibold text-slate-300">
                <strong className="text-white">Tiempo real:</strong> proyección en vivo
              </span>
            </div>
            <div className="flex items-center justify-center lg:justify-start gap-2.5">
              <span className="w-2 h-2 rounded-full bg-slate-300 shrink-0" />
              <span className="text-xs sm:text-sm font-semibold text-slate-300">
                <strong className="text-white">Soporte total:</strong> llave en mano
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ─── 2. SELECTOR DE AUDIENCIA DUAL (FESTEJADORES VS SALONES) ─── */}
      <section className="pt-12 sm:pt-16 pb-8 max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <div className="inline-flex p-1.5 rounded-2xl bg-[#0c0e15] border border-white/15 shadow-xl max-w-full">
          <button
            type="button"
            onClick={() => setAudience("festejadores")}
            className={`px-5 sm:px-8 py-3 rounded-xl text-xs sm:text-sm font-extrabold tracking-wide transition-all duration-300 flex items-center gap-2 cursor-pointer ${
              audience === "festejadores"
                ? "bg-gradient-to-r from-white via-slate-100 to-amber-200 text-slate-950 shadow-lg shadow-white/15"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <span>🎉 Organizo mi Fiesta</span>
            <span className="hidden sm:inline text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/10 border border-black/10">
              Novios · 15s · Cumples
            </span>
          </button>

          <button
            type="button"
            onClick={() => setAudience("organizadores")}
            className={`px-5 sm:px-8 py-3 rounded-xl text-xs sm:text-sm font-extrabold tracking-wide transition-all duration-300 flex items-center gap-2 cursor-pointer ${
              audience === "organizadores"
                ? "bg-gradient-to-r from-white via-slate-100 to-amber-200 text-slate-950 shadow-lg shadow-white/15"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <span>🏛️ Salones & Planners</span>
            <span className="hidden sm:inline text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-900 border border-amber-500/30">
              Propuesta B2B Mayorista
            </span>
          </button>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* VISTA 1: FESTEJADORES (B2C)                               */}
      {/* ═══════════════════════════════════════════════════════════ */}
      {audience === "festejadores" && (
        <div className="transition-opacity duration-500 animate-fadeIn">
          {/* Header Festejadores */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center mb-16 sm:mb-20">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-amber-300/90 mb-3 block">
              Celebraciones Únicas
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-5 leading-tight">
              Tres experiencias que hacen a tu fiesta{" "}
              <span className="bg-gradient-to-r from-white via-slate-100 to-amber-300 bg-clip-text text-transparent">
                inolvidable
              </span>
            </h2>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Unimos la previa con el sobre virtual 3D, la cena con un show de trivia interactivo y la fiesta con fotos en vivo en pantalla gigante.
            </p>
          </section>

          {/* ─── SERVICIO 01: INVITACIÓN DIGITAL & RSVP ─── */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 border-t border-white/10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              {/* Columna Texto */}
              <div className="lg:col-span-6 flex flex-col gap-6">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-slate-400">
                    01 · La Previa
                  </span>
                  <h3 className="text-2xl sm:text-4xl font-black text-white mt-1 mb-3">
                    Invitación Digital 3D & RSVP
                  </h3>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                    Decile adiós a las tarjetas de papel y PDFs estáticos. Tus invitados reciben un sobre virtual con sello de lacre interactivo, música de fondo, geolocalización directa al salón y confirmación de asistencia con control de dietas para la cocina.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="p-4 rounded-2xl bg-[#0d0f17] border border-white/10">
                    <h4 className="text-sm font-bold text-white mb-1">Sobre 3D Interactivo</h4>
                    <p className="text-xs text-slate-300">Apertura inmersiva con música y diseño temático personalizado.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#0d0f17] border border-white/10">
                    <h4 className="text-sm font-bold text-white mb-1">Confirmación RSVP</h4>
                    <p className="text-xs text-slate-300">Control en vivo de invitados confirmados, celíacos y vegetarianos.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#0d0f17] border border-white/10">
                    <h4 className="text-sm font-bold text-white mb-1">Mapa & Geolocalización</h4>
                    <p className="text-xs text-slate-300">Un toque para abrir Google Maps o Waze y llegar directo al salón.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#0d0f17] border border-white/10">
                    <h4 className="text-sm font-bold text-white mb-1">Cofre de Regalos</h4>
                    <p className="text-xs text-slate-300">Copia de CBU/Alias con un clic para facilitar los regalos a los invitados.</p>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href="https://wa.me/5492235851419?text=Hola!%20Estoy%20organizando%20mi%20fiesta%20y%20quiero%20consultar%20por%20la%20Invitaci%C3%B3n%20Digital%203D."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-white via-slate-100 to-amber-200 text-slate-950 font-black text-sm shadow-md hover:from-slate-100 hover:to-white transition-all transform hover:-translate-y-0.5"
                  >
                    <WhatsAppIcon className="w-5 h-5 shrink-0" />
                    <span>Consultar por este servicio</span>
                  </a>
                </div>
              </div>

              {/* Columna Visual / Carrusel de Plantillas */}
              <div className="lg:col-span-6 overflow-hidden">
                <div className="text-center mb-3">
                  <span className="text-xs font-semibold text-slate-400">
                    📱 Explorá plantillas reales desde el celular
                  </span>
                </div>
                <TemplatesPhoneCarousel />
              </div>
            </div>
          </section>

          {/* ─── SERVICIO 02: TRIVIA EN PANTALLA GIGANTE ─── */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 border-t border-white/10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              {/* Visual Mockup Pantalla Salón + Celular */}
              <div className="lg:col-span-6 order-2 lg:order-1">
                <div className="relative rounded-3xl p-1.5 bg-gradient-to-br from-white/30 via-slate-400/15 to-amber-300/20 shadow-2xl group">
                  <div className="relative rounded-[22px] overflow-hidden bg-slate-950 aspect-[16/10]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/services/trivia_show_event.jpg"
                      alt="Conducción en vivo de trivia en pantalla gigante con mesas jugando por QR"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-5 flex flex-col justify-end">
                      <span className="text-sm font-black text-white">
                        🎤 Pantalla Gigante LED + Celulares de los Invitados
                      </span>
                      <span className="text-xs text-slate-300">
                        Los invitados escanean el QR de la mesa y responden preguntas sobre los novios o el agasajado contra reloj.
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Columna Texto */}
              <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col gap-6">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-slate-400">
                    02 · Durante la Cena
                  </span>
                  <h3 className="text-2xl sm:text-4xl font-black text-white mt-1 mb-3">
                    Trivia Fiesta en Vivo
                  </h3>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                    Convertí el momento de la cena o los tiempos entre platos en un show de televisión interactivo. Preguntas divertidas, secretos familiares y ranking en vivo proyectado en pantalla gigante.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-[#0d0f17] border border-white/10 flex items-start gap-3">
                    <span className="font-mono font-bold text-sm text-slate-400 mt-0.5">01.</span>
                    <div>
                      <h4 className="text-sm font-bold text-white">Preguntas personalizadas</h4>
                      <p className="text-xs text-slate-300">Anécdotas graciosas, gustos y secretos de los agasajados.</p>
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#0d0f17] border border-white/10 flex items-start gap-3">
                    <span className="font-mono font-bold text-sm text-slate-400 mt-0.5">02.</span>
                    <div>
                      <h4 className="text-sm font-bold text-white">Sin apps para instalar</h4>
                      <p className="text-xs text-slate-300">Los invitados apuntan la cámara al QR de la pantalla y eligen su apodo.</p>
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#0d0f17] border border-white/10 flex items-start gap-3">
                    <span className="font-mono font-bold text-sm text-slate-400 mt-0.5">03.</span>
                    <div>
                      <h4 className="text-sm font-bold text-white">Podio animado en vivo</h4>
                      <p className="text-xs text-slate-300">Puntajes calculados por rapidez y acierto, con animación de coronación.</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <a
                    href="/demo-fiesta/trivia"
                    target="_blank"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold transition-colors"
                  >
                    <span>Probar Demo Jugador</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="/demo-fiesta/pantalla/trivia"
                    target="_blank"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors"
                  >
                    <Tv className="w-3.5 h-3.5" />
                    <span>Ver Pantalla del Salón</span>
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* ─── SERVICIO 03: MURAL DE FOTOS POR QR ─── */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 border-t border-white/10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              {/* Columna Texto */}
              <div className="lg:col-span-6 flex flex-col gap-6">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-slate-400">
                    03 · Toda la Noche
                  </span>
                  <h3 className="text-2xl sm:text-4xl font-black text-white mt-1 mb-3">
                    Mural de Fotos en Vivo por QR
                  </h3>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                    Identificadores con código QR en cada mesa del salón. Los invitados capturan selfies, brindis y momentos únicos, escriben dedicatorias y se proyectan al instante en las pantallas gigantes.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="p-4 rounded-2xl bg-[#0d0f17] border border-white/10">
                    <h4 className="text-sm font-bold text-white mb-1">QR en Cada Mesa</h4>
                    <p className="text-xs text-slate-300">Escanean al instante desde su copa sin hacer fila.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#0d0f17] border border-white/10">
                    <h4 className="text-sm font-bold text-white mb-1">Mural Rotativo Animado</h4>
                    <p className="text-xs text-slate-300">Transiciones modernas de alta resolución para TV y proyector.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#0d0f17] border border-white/10">
                    <h4 className="text-sm font-bold text-white mb-1">Panel de Moderación</h4>
                    <p className="text-xs text-slate-300">Control previo de fotos si querés filtrar antes de pantalla.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#0d0f17] border border-white/10">
                    <h4 className="text-sm font-bold text-white mb-1">Descarga ZIP Completa</h4>
                    <p className="text-xs text-slate-300">Te quedás con todas las fotos originales tomadas por tus invitados.</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <a
                    href="/demo-fiesta/fotos"
                    target="_blank"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold transition-colors"
                  >
                    <span>Subir Foto de Prueba</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="/demo-fiesta/pantalla/mural"
                    target="_blank"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors"
                  >
                    <Tv className="w-3.5 h-3.5" />
                    <span>Ver Mural en Pantalla</span>
                  </a>
                </div>
              </div>

              {/* Visual Mockup Pantalla Mural */}
              <div className="lg:col-span-6">
                <div className="relative rounded-3xl p-1.5 bg-gradient-to-br from-white/30 via-slate-400/15 to-amber-300/20 shadow-2xl group">
                  <div className="relative rounded-[22px] overflow-hidden bg-slate-950 aspect-[16/10]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/services/mural_fotos_event.jpg"
                      alt="Mural de fotos en vivo proyectado en pantalla gigante con código QR"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-5 flex flex-col justify-end">
                      <span className="text-sm font-black text-white">
                        📸 Transmisión en Pantalla Gigante + Álbum Digital Descargable
                      </span>
                      <span className="text-xs text-slate-300">
                        Los recuerdos más espontáneos que ningún fotógrafo llega a captar, proyectados en directo.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ─── PAQUETES Y PRECIOS CLAROS (B2C) ─── */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 border-t border-white/10">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-amber-300/90 mb-2 block">
                Precios Transparentes
              </span>
              <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-3">
                Combos para tu Fiesta
              </h3>
              <p className="text-sm sm:text-base text-slate-300">
                Podés contratar cualquier servicio individual por <strong>$70.000 ARS</strong> o aprovechar los paquetes combinados con descuento directo.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {/* Individual */}
              <div className="p-6 sm:p-7 rounded-3xl bg-[#0c0e15] border border-white/10 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">1 Servicio</span>
                  <h4 className="text-xl font-bold text-white mt-1 mb-2">Módulo Individual</h4>
                  <p className="text-xs text-slate-300 mb-6">Elegí el servicio que mejor se adapte a tu celebración.</p>
                  <div className="text-3xl font-black text-white mb-6">$70.000 <span className="text-xs text-slate-400 font-normal">ARS</span></div>
                  <ul className="space-y-2.5 text-xs text-slate-300 mb-6">
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-slate-400" /> A elección: Invitación, Trivia o Mural</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-slate-400" /> Cero apps para invitados</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-slate-400" /> Soporte técnico incluido</li>
                  </ul>
                </div>
                <a
                  href="https://wa.me/5492235851419?text=Hola!%20Quiero%20contratar%201%20servicio%20individual%20de%20Eventos%20Kronitt."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold text-center border border-white/20 transition-colors"
                >
                  Consultar Servicio
                </a>
              </div>

              {/* Combo Dúo */}
              <div className="p-6 sm:p-7 rounded-3xl bg-[#0c0e15] border border-white/20 flex flex-col justify-between relative shadow-xl">
                <div>
                  <div className="inline-block px-2.5 py-1 rounded-full bg-white/10 border border-white/20 text-[10px] font-bold text-slate-200 mb-2">
                    Ahorro de $35.000
                  </div>
                  <h4 className="text-xl font-bold text-white mt-1 mb-2">Combo Dúo</h4>
                  <p className="text-xs text-slate-300 mb-6">Combiná 2 servicios para la previa y el salón.</p>
                  <div className="text-3xl font-black text-white mb-6">$105.000 <span className="text-xs text-slate-400 font-normal">ARS</span></div>
                  <ul className="space-y-2.5 text-xs text-slate-300 mb-6">
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-slate-400" /> 2 servicios a tu elección</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-slate-400" /> Identificadores QR impresos</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-slate-400" /> Soporte prioritario</li>
                  </ul>
                </div>
                <a
                  href="https://wa.me/5492235851419?text=Hola!%20Quiero%20contratar%20el%20Combo%20D%C3%BAo%20($105.000)%20para%20mi%20fiesta."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold text-center border border-white/30 transition-colors"
                >
                  Elegir Combo Dúo
                </a>
              </div>

              {/* Combo Trío Full Suite (Destacado con brillo champagne) */}
              <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-b from-[#131622] to-[#0c0e15] border border-amber-300/40 flex flex-col justify-between relative shadow-2xl">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-amber-200 via-amber-300 to-yellow-400 text-slate-950 font-black text-[10px] tracking-wider uppercase shadow-md">
                  ★ Experiencia Completa
                </div>
                <div>
                  <div className="inline-block px-2.5 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-[10px] font-bold text-amber-300 mb-2 mt-2">
                    Ahorro de $75.000
                  </div>
                  <h4 className="text-xl font-bold text-white mt-1 mb-2">Full Suite Trío</h4>
                  <p className="text-xs text-slate-300 mb-6">Los 3 servicios integrados de punta a punta.</p>
                  <div className="text-3xl font-black text-amber-200 mb-6">$135.000 <span className="text-xs text-slate-400 font-normal">ARS</span></div>
                  <ul className="space-y-2.5 text-xs text-slate-200 mb-6">
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400" /> 1. Invitación Digital 3D & RSVP</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400" /> 2. Trivia Fiesta en Vivo</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400" /> 3. Mural de Fotos QR en Pantalla</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400" /> Descarga de álbum ZIP en HD</li>
                  </ul>
                </div>
                <a
                  href="https://wa.me/5492235851419?text=Hola!%20Quiero%20contratar%20la%20Full%20Suite%20Tr%C3%ADo%20($135.000)%20para%20mi%20fiesta."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-white via-slate-100 to-amber-200 text-slate-950 text-xs font-black text-center shadow-lg shadow-white/10 hover:from-slate-100 hover:to-white transition-all transform hover:-translate-y-0.5"
                >
                  Contratar Suite Completa
                </a>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* VISTA 2: SALONES & PLANNERS (B2B)                          */}
      {/* ═══════════════════════════════════════════════════════════ */}
      {audience === "organizadores" && (
        <div className="transition-opacity duration-500 animate-fadeIn">
          {/* Header B2B */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center mb-16 sm:mb-20">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-amber-300/90 mb-3 block">
              Alianzas Comerciales
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-5 leading-tight">
              Modernizá tus pantallas y sumá hasta{" "}
              <span className="bg-gradient-to-r from-white via-slate-100 to-amber-300 bg-clip-text text-transparent">
                $50.000 de ganancia limpia
              </span>{" "}
              por evento
            </h2>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Plataforma llave en mano para salones y wedding planners. Ofrecé tecnología interactiva de alto impacto sin invertir en equipamiento y con soporte técnico completo.
            </p>
          </section>

          {/* ─── CÓMO LE SIRVE AL SALÓN (3 BENEFICIOS CLAVE) ─── */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 border-t border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-3xl bg-[#0c0e15] border border-white/10">
                <span className="text-2xl font-black text-slate-400 font-mono mb-3 block">01.</span>
                <h4 className="text-lg font-bold text-white mb-2">Cero Inversión en Equipos</h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Funciona con cualquier proyector o Smart TV que ya tenga tu salón conectando un cable HDMI o abriendo un link web en Chrome.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-[#0c0e15] border border-white/10">
                <span className="text-2xl font-black text-slate-400 font-mono mb-3 block">02.</span>
                <h4 className="text-lg font-bold text-white mb-2">Tranquilidad para la Cocina</h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  El formulario RSVP recopila celíacos, vegetarianos y dietas especiales antes de la fiesta. Cero desperdicio y platos justos.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-[#0c0e15] border border-white/10">
                <span className="text-2xl font-black text-slate-400 font-mono mb-3 block">03.</span>
                <h4 className="text-lg font-bold text-white mb-2">Margen Directo por Fiesta</h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Vos decidís el precio al cliente final o lo sumás a tus paquetes premium. Nosotros te cobramos la tarifa mayorista según tu volumen mensual.
                </p>
              </div>
            </div>
          </section>

          {/* ─── SIMULADOR B2B Y ESCALA MAYORISTA ─── */}
          <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 border-t border-white/10">
            <div className="p-8 sm:p-10 rounded-3xl bg-[#0c0e15] border border-white/20 shadow-2xl">
              <div className="text-center max-w-2xl mx-auto mb-8">
                <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-slate-400 mb-1 block">
                  Simulador de Rentabilidad
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  Calculá tu Ganancia Mensual
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-2">
                  Ajustá la cantidad de eventos que hacés por mes (calculando 3 servicios por fiesta):
                </p>
              </div>

              {/* Slider */}
              <div className="max-w-xl mx-auto mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-slate-400">Fiestas al mes:</span>
                  <span className="text-lg font-black text-white bg-white/10 px-3 py-1 rounded-lg border border-white/20">
                    {eventosMes} eventos ({totalServicios} servicios)
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="12"
                  value={eventosMes}
                  onChange={(e) => setEventosMes(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>1 evento</span>
                  <span>6 eventos</span>
                  <span>12 eventos</span>
                </div>
              </div>

              {/* Resultados */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center mb-8">
                <div className="p-4 rounded-2xl bg-black/40 border border-white/10">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Tu Escala</span>
                  <span className="text-xs sm:text-sm font-black text-white">{tramoNombre}</span>
                  <span className="text-[11px] text-slate-400 block mt-1">${costoUnitario.toLocaleString("es-AR")} / serv.</span>
                </div>
                <div className="p-4 rounded-2xl bg-black/40 border border-white/10">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Ingreso Sugerido</span>
                  <span className="text-base sm:text-lg font-black text-slate-200">
                    ${ingresoBruto.toLocaleString("es-AR")}
                  </span>
                  <span className="text-[11px] text-slate-400 block mt-1">Vendiendo a $70k c/u</span>
                </div>
                <div className="p-4 rounded-2xl bg-gradient-to-br from-white/15 via-white/5 to-amber-400/20 border border-amber-300/40">
                  <span className="text-[10px] uppercase font-black text-amber-300 block mb-1">Tu Ganancia Neta</span>
                  <span className="text-xl sm:text-2xl font-black text-amber-200">
                    +${gananciaNeta.toLocaleString("es-AR")}
                  </span>
                  <span className="text-[10px] text-slate-300 block mt-1">Margen directo para tu salón</span>
                </div>
              </div>

              {/* Botón CTA alianzas */}
              <div className="text-center">
                <a
                  href="https://wa.me/5492235851419?text=Hola!%20Tengo%20un%20sal%C3%B3n%20/%20soy%20planner%20y%20quiero%20coordinar%20una%20alianza%20con%20Eventos%20Kronitt."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-white via-slate-100 to-amber-200 text-slate-950 font-black text-sm shadow-lg hover:from-slate-100 hover:to-white transition-all transform hover:-translate-y-0.5"
                >
                  <WhatsAppIcon className="w-5 h-5 shrink-0" />
                  <span>Quiero coordinar una reunión de 10 min</span>
                </a>
              </div>
            </div>
          </section>

          {/* ─── DESCARGA DE LOS 3 PDFS OFICIALES ─── */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 border-t border-white/10">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-slate-400 mb-1 block">
                Material Comercial Oficial
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                Descargá las Fichas en PDF
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-2">
                Documentos listos para compartir por WhatsApp con tus socios o clientes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {/* PDF 1 */}
              <div className="p-6 rounded-2xl bg-[#0c0e15] border border-white/15 flex flex-col justify-between">
                <div>
                  <h4 className="text-base font-bold text-white mb-2">Propuesta Comercial (1 Página)</h4>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    Resumen ejecutivo con los 3 servicios y la tabla de precios y tramos mayoristas.
                  </p>
                </div>
                <a
                  href="/docs/Propuesta_Comercial_Eventos_Kronitt.pdf"
                  download
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-white via-slate-100 to-amber-200 text-slate-950 text-xs font-black transition-all hover:from-slate-100 hover:to-white"
                >
                  <Download className="w-4 h-4" />
                  <span>Descargar Propuesta (PDF)</span>
                </a>
              </div>

              {/* PDF 2 */}
              <div className="p-6 rounded-2xl bg-[#0c0e15] border border-white/15 flex flex-col justify-between">
                <div>
                  <h4 className="text-base font-bold text-white mb-2">Presentación Completa (2 Páginas)</h4>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    Ficha con los 3 servicios en profundidad, requerimientos de pantalla y detalle de combos.
                  </p>
                </div>
                <a
                  href="/docs/Presentacion_Servicios_Eventos_Kronitt.pdf"
                  download
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 text-xs font-bold transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Descargar Presentación (PDF)</span>
                </a>
              </div>

              {/* PDF 3 */}
              <div className="p-6 rounded-2xl bg-[#0c0e15] border border-white/15 flex flex-col justify-between">
                <div>
                  <h4 className="text-base font-bold text-white mb-2">Guía de Ventas (2 Páginas)</h4>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    Mensajes modelo para WhatsApp, guión de reunión de 15 min y manejo de dudas frecuentes.
                  </p>
                </div>
                <a
                  href="/docs/Guia_Ventas_Eventos_Kronitt.pdf"
                  download
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 text-xs font-bold transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Descargar Guía de Ventas (PDF)</span>
                </a>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* ─── FOOTER GLOBAL ─── */}
      <footer className="border-t border-white/10 py-12 sm:py-16 bg-black/40 backdrop-blur-md w-full overflow-hidden text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center gap-6">
          <div className="flex items-center gap-2.5">
            <span className="font-extrabold text-xl tracking-tight text-white">
              Eventos Kronitt
            </span>
          </div>

          <p className="text-slate-300 text-xs sm:text-sm max-w-md font-medium leading-relaxed">
            Plataforma integral de invitaciones digitales interactivas, trivias en vivo y transmisión de fotos por QR en pantallas gigantes.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-400">
            <button
              onClick={() => setAudience("festejadores")}
              className={`hover:text-white transition-colors ${audience === "festejadores" ? "text-amber-300 font-bold" : ""}`}
            >
              Para Festejadores
            </button>
            <span>·</span>
            <button
              onClick={() => setAudience("organizadores")}
              className={`hover:text-white transition-colors ${audience === "organizadores" ? "text-amber-300 font-bold" : ""}`}
            >
              Para Salones & Planners
            </button>
            <span>·</span>
            <Link href="/organizadores" className="text-slate-300 hover:text-white transition-colors">
              Página de Organizadores
            </Link>
          </div>

          <div className="border-t border-white/10 w-full pt-6 text-xs text-slate-400">
            Servicios digitales desarrollados por{" "}
            <a
              href="https://kevdev.net.ar"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-white hover:text-slate-200 transition-colors underline decoration-white/30 underline-offset-4"
            >
              kevdev
            </a>
          </div>
        </div>
      </footer>

      {/* ─── BOTÓN FLOTANTE DE WHATSAPP ─── */}
      <a
        href="https://wa.me/5492235851419?text=Hola!%20Quisiera%20consultar%20sobre%20los%20servicios%20de%20Eventos%20Kronitt."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white shadow-[0_10px_35px_rgba(37,211,102,0.6)] transition-all transform hover:scale-110 active:scale-95 group"
      >
        <WhatsAppIcon className="w-8 h-8 text-white shrink-0 drop-shadow-md" />
      </a>
    </div>
  );
}
