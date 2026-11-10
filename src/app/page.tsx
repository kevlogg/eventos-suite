import Link from "next/link";
import DiscoBallHero from "@/components/home/DiscoBallHero";
import {
  PartyPopper,
  Camera,
  Trophy,
  Shield,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  QrCode,
  Music,
  MapPin,
  Gift,
  Users,
  Smartphone,
  Tv,
  Flame,
  Check,
  ChevronRight,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="relative bg-[#020205] text-slate-100 selection:bg-indigo-500 selection:text-white min-h-screen">
      {/* ─── PANTALLA 1: BOLA DE BOLICHE 3D & CANVAS DE LUCES PERSISTENTE ─── */}
      <DiscoBallHero />

      {/* ─── EFECTO CORTINA: SECCIÓN QUE SUBE AL HACER SCROLL SOBRE EL HERO (Z-20) ─── */}
      <div
        id="servicios"
        className="relative z-20 bg-[#020205]/75 rounded-t-[44px] sm:rounded-t-[64px] border-t border-white/10 shadow-[0_-30px_90px_rgba(0,0,0,0.98)] backdrop-blur-2xl min-h-screen"
      >
        {/* Barra superior de navegación dentro de la cortina */}
        <header className="border-b border-white/10 sticky top-0 z-40 bg-[#020205]/85 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-extrabold text-lg sm:text-xl tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                Eventos Suite
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
              <a href="#servicio-invitaciones" className="hover:text-indigo-400 transition-colors">
                Invitaciones
              </a>
              <a href="#servicio-trivia" className="hover:text-purple-400 transition-colors">
                Trivia en Vivo
              </a>
              <a href="#servicio-fotos" className="hover:text-pink-400 transition-colors">
                Fotos por QR
              </a>
            </nav>

            <div className="flex items-center gap-3">
              <Link
                href="/superadmin"
                className="px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all shadow-md shadow-indigo-500/25 flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Shield className="w-4 h-4" />
                <span>Panel Superadmin</span>
              </Link>
            </div>
          </div>
        </header>

        {/* ─── SECCIÓN 2: PRESENTACIÓN DE LOS 3 SERVICIOS PRINCIPALES ─── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-16 sm:pb-20">
          <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-5">
              <Flame className="w-4 h-4 text-amber-400" /> Ecosistema Completo para Fiestas
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-6 leading-tight">
              Tres experiencias que transforman{" "}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                tu celebración
              </span>
            </h2>
            <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
              Unificamos la experiencia previa, durante y posterior de tu fiesta con tecnología web interactiva en tiempo real.
            </p>
          </div>

          {/* Cards resumen de los 3 servicios */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Tarjeta Servicio 1 */}
            <a
              href="#servicio-invitaciones"
              className="group p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-amber-400/50 backdrop-blur-md transition-all duration-300 hover:shadow-[0_15px_40px_rgba(245,158,11,0.15)] flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 transition-transform">
                  <PartyPopper className="w-7 h-7" />
                </div>
                <div className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-2">
                  Servicio 01
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-amber-200 transition-colors">
                  Invitaciones Digitales & RSVP
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-6">
                  Plantillas temáticas premium con apertura de sobre interactivo, cuenta regresiva, confirmación de asistencia en vivo, mapas y cofre de regalos.
                </p>
              </div>

              <div className="flex items-center gap-2 text-sm font-semibold text-amber-400 group-hover:translate-x-1 transition-transform">
                <span>Ver detalles del servicio</span>
                <ChevronRight size={16} />
              </div>
            </a>

            {/* Tarjeta Servicio 2 */}
            <a
              href="#servicio-trivia"
              className="group p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-purple-400/50 backdrop-blur-md transition-all duration-300 hover:shadow-[0_15px_40px_rgba(168,85,247,0.15)] flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/25 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
                  <Trophy className="w-7 h-7" />
                </div>
                <div className="text-xs font-bold uppercase tracking-widest text-purple-400 mb-2">
                  Servicio 02
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-purple-200 transition-colors">
                  Trivia Fiesta en Vivo
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-6">
                  Un juego interactivo donde los invitados compiten desde sus celulares en vivo. Preguntas personalizadas y ranking proyectado en pantalla gigante.
                </p>
              </div>

              <div className="flex items-center gap-2 text-sm font-semibold text-purple-400 group-hover:translate-x-1 transition-transform">
                <span>Ver detalles del servicio</span>
                <ChevronRight size={16} />
              </div>
            </a>

            {/* Tarjeta Servicio 3 */}
            <a
              href="#servicio-fotos"
              className="group p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-pink-400/50 backdrop-blur-md transition-all duration-300 hover:shadow-[0_15px_40px_rgba(236,72,153,0.15)] flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-pink-500/10 border border-pink-500/25 flex items-center justify-center text-pink-400 mb-6 group-hover:scale-110 transition-transform">
                  <Camera className="w-7 h-7" />
                </div>
                <div className="text-xs font-bold uppercase tracking-widest text-pink-400 mb-2">
                  Servicio 03
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-pink-200 transition-colors">
                  Fotos Dinámicas por QR
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-6">
                  Cada mesa tiene su código QR. Los invitados suben fotos con dedicatorias al instante y se proyectan en el mural rotativo del salón con moderación en vivo.
                </p>
              </div>

              <div className="flex items-center gap-2 text-sm font-semibold text-pink-400 group-hover:translate-x-1 transition-transform">
                <span>Ver detalles del servicio</span>
                <ChevronRight size={16} />
              </div>
            </a>
          </div>
        </section>

        {/* ─── DETALLE SERVICIO 01: INVITACIONES DIGITALES ─── */}
        <section
          id="servicio-invitaciones"
          className="border-t border-slate-800/80 py-20 sm:py-28 relative overflow-hidden"
        >
          {/* Ambient Glow */}
          <div
            aria-hidden="true"
            className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none"
          />

          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Text & Features */}
              <div className="lg:col-span-6 flex flex-col gap-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-widest w-fit">
                  <Sparkles size={14} className="text-amber-400" />
                  Servicio 01 · Experiencia de Entrada
                </div>

                <h3 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                  Invitaciones Digitales que{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500">
                    enamoran a tus invitados
                  </span>
                </h3>

                <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                  Decile adiós a las tarjetas de papel o los PDFs estáticos. Diseñamos invitaciones web totalmente interactivas, con sobre virtual con sello de lacre, música de fondo, animaciones y personajes integrados a la temática.
                </p>

                {/* Bullets */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-900/40 border border-slate-800">
                    <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-white">Confirmación RSVP en Vivo</h4>
                      <p className="text-xs text-slate-400">Dietas, acompañantes y asistencia en tiempo real.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-900/40 border border-slate-800">
                    <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-white">Salón & Geolocalización</h4>
                      <p className="text-xs text-slate-400">Un clic para abrir Google Maps o Waze directo.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-900/40 border border-slate-800">
                    <Gift className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-white">Cofre de Regalos & Alias</h4>
                      <p className="text-xs text-slate-400">Copia de CBU/Alias con un solo toque.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-900/40 border border-slate-800">
                    <Music className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-white">Música & Efectos Visuales</h4>
                      <p className="text-xs text-slate-400">Audio track personalizado y animación de apertura.</p>
                    </div>
                  </div>
                </div>

                {/* Temas pills */}
                <div className="pt-2">
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                    Plantillas temáticas incluidas:
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-300">
                      🌿 Boda Botánica
                    </span>
                    <span className="px-3 py-1 rounded-full bg-zinc-900 border border-amber-400/50 text-amber-300">
                      🥂 Boda Clásica Black Tie
                    </span>
                    <span className="px-3 py-1 rounded-full bg-amber-950/60 border border-amber-600/40 text-amber-200">
                      🌾 Boda Boho Chic
                    </span>
                    <span className="px-3 py-1 rounded-full bg-sky-950/60 border border-sky-500/40 text-sky-300">
                      🚀 Toy Story Aventura
                    </span>
                    <span className="px-3 py-1 rounded-full bg-pink-950/60 border border-pink-500/40 text-pink-300">
                      👑 Princesas Disney
                    </span>
                    <span className="px-3 py-1 rounded-full bg-emerald-950/60 border border-yellow-400/50 text-yellow-300">
                      ⚽ Fútbol Messi Campeón
                    </span>
                    <span className="px-3 py-1 rounded-full bg-purple-950/60 border border-pink-400/50 text-pink-300">
                      💖 K-Pop Idol & Tour
                    </span>
                    <span className="px-3 py-1 rounded-full bg-cyan-950/60 border border-purple-400/50 text-cyan-300">
                      🪩 Fiesta Neón & DJ Bresh
                    </span>
                    <span className="px-3 py-1 rounded-full bg-zinc-900 border border-yellow-500/50 text-yellow-200">
                      🍸 Gran Gatsby 1920s
                    </span>
                    <span className="px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-400/50 text-emerald-300">
                      ♠️ Casino Royale VIP
                    </span>
                  </div>
                </div>

                <div className="pt-4">
                  <Link
                    href="/superadmin/nuevo-evento"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold text-sm tracking-wide shadow-lg shadow-amber-500/25 transition-all"
                  >
                    <span>Crear Evento con Invitación</span>
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </div>

              {/* Visual Mockup Card */}
              <div className="lg:col-span-6">
                <div className="relative rounded-3xl p-1 bg-gradient-to-br from-amber-500/40 via-purple-500/30 to-pink-500/30 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
                  <div className="rounded-[22px] bg-slate-900/90 p-6 sm:p-8 border border-slate-800 flex flex-col gap-6">
                    {/* Mockup Header */}
                    <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                        <div className="w-3 h-3 rounded-full bg-green-500/80" />
                      </div>
                      <span className="text-xs font-mono text-slate-400">
                        eventos-suite.com/fiesta-vip
                      </span>
                      <div className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-semibold">
                        Preview
                      </div>
                    </div>

                    {/* Mockup Card Content */}
                    <div className="p-6 rounded-2xl bg-gradient-to-b from-amber-950/40 via-slate-900/80 to-slate-950 border border-amber-500/30 text-center flex flex-col items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 text-slate-950 flex items-center justify-center font-serif text-2xl font-bold shadow-lg shadow-amber-500/30">
                        👑
                      </div>
                      <div>
                        <div className="text-xs uppercase tracking-widest text-amber-300 font-serif">
                          ✦ GRAN GALA DE CELEBRACIÓN ✦
                        </div>
                        <h4 className="text-2xl font-bold text-white mt-1">Martina & Santiago</h4>
                        <p className="text-xs text-amber-200/80 mt-1">Sábado 14 de Noviembre · 20:30 hs</p>
                      </div>

                      {/* Mockup Timer */}
                      <div className="grid grid-cols-4 gap-2 w-full max-w-xs mt-2">
                        <div className="p-2 rounded-xl bg-black/60 border border-amber-500/30 text-center">
                          <div className="text-base font-bold text-amber-300">12</div>
                          <div className="text-[9px] uppercase text-slate-400">Días</div>
                        </div>
                        <div className="p-2 rounded-xl bg-black/60 border border-amber-500/30 text-center">
                          <div className="text-base font-bold text-amber-300">08</div>
                          <div className="text-[9px] uppercase text-slate-400">Hs</div>
                        </div>
                        <div className="p-2 rounded-xl bg-black/60 border border-amber-500/30 text-center">
                          <div className="text-base font-bold text-amber-300">45</div>
                          <div className="text-[9px] uppercase text-slate-400">Min</div>
                        </div>
                        <div className="p-2 rounded-xl bg-black/60 border border-amber-500/30 text-center">
                          <div className="text-base font-bold text-amber-300">19</div>
                          <div className="text-[9px] uppercase text-slate-400">Seg</div>
                        </div>
                      </div>

                      {/* Mockup RSVP status */}
                      <div className="w-full pt-2 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800">
                        <span>Estado de confirmación:</span>
                        <span className="text-emerald-400 font-semibold">✓ Confirmado (2 pers.)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── DETALLE SERVICIO 02: TRIVIA FIESTA EN VIVO ─── */}
        <section
          id="servicio-trivia"
          className="border-t border-slate-800/80 py-20 sm:py-28 relative overflow-hidden bg-slate-950/40"
        >
          {/* Ambient Glow */}
          <div
            aria-hidden="true"
            className="absolute top-1/3 -right-32 w-96 h-96 rounded-full bg-purple-600/10 blur-3xl pointer-events-none"
          />

          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Visual Mockup TV & Mobile */}
              <div className="lg:col-span-6 order-2 lg:order-1">
                <div className="relative rounded-3xl p-1 bg-gradient-to-br from-purple-500/40 via-indigo-500/30 to-pink-500/30 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
                  <div className="rounded-[22px] bg-slate-900/90 p-6 sm:p-8 border border-slate-800 flex flex-col gap-6">
                    {/* TV Screen Display Mockup */}
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <div className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-wider">
                        <Tv size={16} />
                        <span>Pantalla Gigante del Salón</span>
                      </div>
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-semibold animate-pulse">
                        ● EN VIVO
                      </span>
                    </div>

                    {/* Question on Screen */}
                    <div className="p-5 rounded-2xl bg-purple-950/40 border border-purple-500/30">
                      <div className="text-xs font-semibold text-purple-300 mb-1">
                        Pregunta 4 de 10 · 15 segundos restantes
                      </div>
                      <h5 className="text-lg font-bold text-white mb-3">
                        ¿En qué viaje se conocieron los novios?
                      </h5>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-slate-300">
                          A) Bariloche
                        </div>
                        <div className="p-2.5 rounded-xl bg-purple-600/40 border border-purple-400 text-white font-semibold">
                          B) Río de Janeiro ✓
                        </div>
                        <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-slate-300">
                          C) Mendoza
                        </div>
                        <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-slate-300">
                          D) Cancún
                        </div>
                      </div>
                    </div>

                    {/* Live Leaderboard */}
                    <div className="flex flex-col gap-2">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                        <span>Podio en Tiempo Real</span>
                        <span>Puntos</span>
                      </div>
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs font-semibold text-amber-200">
                        <span className="flex items-center gap-2">
                          <span>🥇</span>
                          <span>Mesa 4 · Los Primos</span>
                        </span>
                        <span>4.850 pts</span>
                      </div>
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/60 border border-slate-700 text-xs text-slate-300">
                        <span className="flex items-center gap-2">
                          <span>🥈</span>
                          <span>Mesa 7 · Amigos del Club</span>
                        </span>
                        <span>4.420 pts</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Text & Features */}
              <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col gap-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-widest w-fit">
                  <Trophy size={14} className="text-purple-400" />
                  Servicio 02 · Animación Interactiva
                </div>

                <h3 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                  Trivia Fiesta:{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400">
                    el show que hace jugar a todos
                  </span>
                </h3>

                <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                  Transformá el momento de la cena o la recepción en un programa de televisión interactivo. Los invitados escanean el código QR proyectado en la pantalla gigante y responden preguntas desde su smartphone contra el reloj.
                </p>

                {/* Steps */}
                <div className="flex flex-col gap-3.5 pt-2">
                  <div className="flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-full bg-purple-600/20 border border-purple-500/40 text-purple-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      1
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Escanean el QR desde la mesa</h4>
                      <p className="text-xs text-slate-400">Sin instalar nada. Solo abren la cámara, eligen su apodo o mesa e ingresan al juego.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-full bg-purple-600/20 border border-purple-500/40 text-purple-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      2
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Preguntas personalizadas y divertidas</h4>
                      <p className="text-xs text-slate-400">Anécdotas de la pareja, secretos del homenajeado, momentos graciosos con tiempo límite.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-full bg-purple-600/20 border border-purple-500/40 text-purple-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      3
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Podio y ranking proyectado en vivo</h4>
                      <p className="text-xs text-slate-400">Puntajes calculados por rapidez y acierto, con animación de coronación en pantalla gigante.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Link
                    href="/superadmin"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm tracking-wide shadow-lg shadow-purple-500/25 transition-all"
                  >
                    <span>Configurar Trivia de Evento</span>
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── DETALLE SERVICIO 03: FOTOS POR QR & MURAL DE PANTALLA ─── */}
        <section
          id="servicio-fotos"
          className="border-t border-slate-800/80 py-20 sm:py-28 relative overflow-hidden"
        >
          {/* Ambient Glow */}
          <div
            aria-hidden="true"
            className="absolute bottom-1/4 left-1/3 w-96 h-96 rounded-full bg-pink-600/10 blur-3xl pointer-events-none"
          />

          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Text & Features */}
              <div className="lg:col-span-6 flex flex-col gap-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-xs font-bold uppercase tracking-widest w-fit">
                  <Camera size={14} className="text-pink-400" />
                  Servicio 03 · Transmisión en Vivo
                </div>

                <h3 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                  Mural de Fotos en Vivo:{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-400 to-cyan-400">
                    cada invitado es un fotógrafo
                  </span>
                </h3>

                <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                  Colocamos identificadores con códigos QR en cada mesa del salón. Los invitados capturan selfies, brindis y momentos únicos con su celular, les agregan una dedicatoria y las fotos aparecen al instante proyectadas en pantalla gigante.
                </p>

                {/* Bullets */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-900/40 border border-slate-800">
                    <QrCode className="w-5 h-5 text-pink-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-white">QR Exclusivo por Mesa</h4>
                      <p className="text-xs text-slate-400">Escaneo instantáneo sin login ni registros pesados.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-900/40 border border-slate-800">
                    <Shield className="w-5 h-5 text-pink-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-white">Panel de Moderación</h4>
                      <p className="text-xs text-slate-400">Aprobá fotos antes de salir a pantalla si lo preferís.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-900/40 border border-slate-800">
                    <Tv className="w-5 h-5 text-pink-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-white">Mural Rotativo Animado</h4>
                      <p className="text-xs text-slate-400">Transiciones modernas para proyectores y Smart TVs.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-900/40 border border-slate-800">
                    <Smartphone className="w-5 h-5 text-pink-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-white">Descarga Completa al Final</h4>
                      <p className="text-xs text-slate-400">Los anfitriones descargan todas las fotos en alta resolución.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Link
                    href="/superadmin"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold text-sm tracking-wide shadow-lg shadow-pink-500/25 transition-all"
                  >
                    <span>Ver Mural y Galería del Evento</span>
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </div>

              {/* Visual Mockup Mural Wall */}
              <div className="lg:col-span-6">
                <div className="relative rounded-3xl p-1 bg-gradient-to-br from-pink-500/40 via-cyan-500/30 to-purple-500/30 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
                  <div className="rounded-[22px] bg-slate-900/90 p-6 sm:p-8 border border-slate-800 flex flex-col gap-6">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <div className="flex items-center gap-2 text-pink-400 text-xs font-bold uppercase tracking-wider">
                        <Camera size={16} />
                        <span>Mural en Pantalla · Transmisión en Vivo</span>
                      </div>
                      <span className="text-xs font-mono text-cyan-400">
                        148 fotos compartidas
                      </span>
                    </div>

                    {/* Photo Grid Preview */}
                    <div className="grid grid-cols-2 gap-3.5">
                      <div className="rounded-2xl overflow-hidden bg-slate-800/80 border border-pink-500/30 relative aspect-square flex flex-col justify-end p-3 shadow-md group">
                        <div
                          className="absolute inset-0 bg-cover bg-center"
                          style={{ backgroundImage: "url('/images/wedding/wedding-1.jpg')" }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        <div className="relative z-10">
                          <span className="text-[10px] text-pink-300 font-bold block">Camila & Nico</span>
                          <span className="text-[11px] text-white font-medium line-clamp-1">
                            ¡Qué noche increíble! Viva los novios 🥂
                          </span>
                        </div>
                      </div>

                      <div className="rounded-2xl overflow-hidden bg-slate-800/80 border border-cyan-500/30 relative aspect-square flex flex-col justify-end p-3 shadow-md group">
                        <div
                          className="absolute inset-0 bg-cover bg-center"
                          style={{ backgroundImage: "url('/images/wedding/wedding-2.jpg')" }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        <div className="relative z-10">
                          <span className="text-[10px] text-cyan-300 font-bold block">Mesa 8 · Los de Siempre</span>
                          <span className="text-[11px] text-white font-medium line-clamp-1">
                            No paramos de bailar 🕺💃
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* QR Code Scan Bar */}
                    <div className="p-3.5 rounded-2xl bg-black/60 border border-slate-800 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white p-1 flex items-center justify-center">
                          <QrCode className="w-full h-full text-slate-950" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white">Escaneá para subir tu foto</div>
                          <div className="text-[10px] text-slate-400">Se proyecta en tiempo real</div>
                        </div>
                      </div>
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-pink-500/20 text-pink-300">
                        En Vivo
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── FOOTER & SUPERADMIN CTA ─── */}
        <footer className="border-t border-slate-800/80 py-12 sm:py-16 bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center gap-8">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                Eventos Suite
              </span>
            </div>

            <p className="text-slate-400 text-sm max-w-md">
              Plataforma integral de invitaciones digitales interactivas, trivias en vivo y transmisión de fotos por QR en pantallas gigantes.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-400">
              <a href="#servicios" className="hover:text-white transition-colors">
                Servicios
              </a>
              <span>·</span>
              <a href="#servicio-invitaciones" className="hover:text-white transition-colors">
                Invitaciones
              </a>
              <span>·</span>
              <a href="#servicio-trivia" className="hover:text-white transition-colors">
                Trivia
              </a>
              <span>·</span>
              <a href="#servicio-fotos" className="hover:text-white transition-colors">
                Fotos QR
              </a>
              <span>·</span>
              <Link href="/superadmin" className="text-indigo-400 hover:text-indigo-300 transition-colors">
                Panel Superadmin
              </Link>
            </div>

            <div className="border-t border-slate-900 w-full pt-8 text-xs text-slate-600">
              Eventos Suite &copy; {new Date().getFullYear()} — Diseñado para fiestas inolvidables.
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
