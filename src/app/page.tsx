import Link from "next/link";
import DiscoBallHero from "@/components/home/DiscoBallHero";
import DiscoMirrorHover from "@/components/home/DiscoMirrorHover";
import TemplatesPhoneCarousel from "@/components/home/TemplatesPhoneCarousel";
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
    <div className="relative bg-transparent text-slate-100 selection:bg-indigo-500 selection:text-white min-h-screen">
      {/* ─── PANTALLA 1: BOLA DE BOLICHE 3D & CANVAS DE LUCES PERSISTENTE ─── */}
      <DiscoBallHero />

      {/* ─── EFECTO CORTINA: SECCIÓN QUE SUBE AL HACER SCROLL SOBRE EL HERO (Z-20) ─── */}
      <div
        id="servicios"
        className="relative z-20 bg-gradient-to-b from-[#020205]/45 via-[#020205]/55 to-[#020205]/65 rounded-t-[44px] sm:rounded-t-[64px] border-t border-white/15 shadow-[0_-30px_90px_rgba(0,0,0,0.95)] backdrop-blur-[6px] min-h-screen"
      >
        {/* ─── SECCIÓN 2: PRESENTACIÓN DE LOS 3 SERVICIOS PRINCIPALES ─── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-16 sm:pb-20">
          <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-6 leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
              Servicios interactivos para{" "}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                eventos inolvidables
              </span>
            </h2>
            <div className="inline-block max-w-2xl mx-auto px-6 py-3.5 rounded-2xl bg-black/60 border border-white/15 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.7)]">
              <p className="text-base sm:text-lg text-slate-100 font-medium leading-relaxed drop-shadow-md">
                Unificamos la experiencia previa, durante y posterior de tu fiesta con tecnología web interactiva en tiempo real.
              </p>
            </div>
          </div>

          {/* Cards resumen de los 3 servicios */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Tarjeta Servicio 1 */}
            <a
              href="#servicio-invitaciones"
              className="group relative p-8 rounded-3xl bg-[#0b0b14]/80 border border-white/12 hover:border-slate-200/60 backdrop-blur-xl transition-all duration-500 hover:shadow-[0_20px_50px_rgba(255,255,255,0.15)] shadow-[0_12px_36px_rgba(0,0,0,0.6)] flex flex-col justify-between overflow-hidden"
            >
              <DiscoMirrorHover tileSize={18} gap={2} spotlightRadius={140} />
              {/* Velo protector de contraste sobre los espejos reflectantes */}
              <div
                aria-hidden="true"
                className="absolute inset-0 z-[5] bg-gradient-to-b from-[#070710]/60 via-[#070710]/75 to-[#070710]/90 pointer-events-none"
              />
              <div className="relative z-10 flex flex-col justify-between h-full">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-[#090a14]/90 border border-amber-500/40 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 transition-transform shadow-md shadow-amber-500/20 backdrop-blur-md">
                    <PartyPopper className="w-7 h-7" />
                  </div>
                  <div className="text-xs font-black uppercase tracking-widest text-amber-300 mb-2 drop-shadow-md">
                    Servicio 01
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white mb-3 group-hover:text-amber-200 transition-colors drop-shadow-[0_2px_8px_rgba(0,0,0,1)]">
                    Invitaciones Digitales & RSVP
                  </h3>
                  <p className="text-sm sm:text-base text-white font-medium leading-relaxed mb-6 drop-shadow-[0_2px_4px_rgba(0,0,0,1)] [text-shadow:_0_1px_3px_rgb(0_0_0_/_90%),_0_2px_8px_rgb(0_0_0_/_80%)]">
                    Plantillas temáticas premium con apertura de sobre interactivo, cuenta regresiva, confirmación de asistencia en vivo, mapas y cofre de regalos.
                  </p>
                </div>

                <div className="flex items-center gap-2 text-sm font-bold text-amber-300 group-hover:translate-x-1 transition-transform drop-shadow-md">
                  <span>Ver detalles del servicio</span>
                  <ChevronRight size={16} />
                </div>
              </div>
            </a>

            {/* Tarjeta Servicio 2 */}
            <a
              href="#servicio-trivia"
              className="group relative p-8 rounded-3xl bg-[#0b0b14]/80 border border-white/12 hover:border-slate-200/60 backdrop-blur-xl transition-all duration-500 hover:shadow-[0_20px_50px_rgba(255,255,255,0.15)] shadow-[0_12px_36px_rgba(0,0,0,0.6)] flex flex-col justify-between overflow-hidden"
            >
              <DiscoMirrorHover tileSize={18} gap={2} spotlightRadius={140} />
              {/* Velo protector de contraste sobre los espejos reflectantes */}
              <div
                aria-hidden="true"
                className="absolute inset-0 z-[5] bg-gradient-to-b from-[#070710]/60 via-[#070710]/75 to-[#070710]/90 pointer-events-none"
              />
              <div className="relative z-10 flex flex-col justify-between h-full">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-[#090a14]/90 border border-purple-500/40 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform shadow-md shadow-purple-500/20 backdrop-blur-md">
                    <Trophy className="w-7 h-7" />
                  </div>
                  <div className="text-xs font-black uppercase tracking-widest text-purple-300 mb-2 drop-shadow-md">
                    Servicio 02
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white mb-3 group-hover:text-purple-200 transition-colors drop-shadow-[0_2px_8px_rgba(0,0,0,1)]">
                    Trivia Fiesta en Vivo
                  </h3>
                  <p className="text-sm sm:text-base text-white font-medium leading-relaxed mb-6 drop-shadow-[0_2px_4px_rgba(0,0,0,1)] [text-shadow:_0_1px_3px_rgb(0_0_0_/_90%),_0_2px_8px_rgb(0_0_0_/_80%)]">
                    Un juego interactivo donde los invitados compiten desde sus celulares en vivo. Preguntas personalizadas y ranking proyectado en pantalla gigante.
                  </p>
                </div>

                <div className="flex items-center gap-2 text-sm font-bold text-purple-300 group-hover:translate-x-1 transition-transform drop-shadow-md">
                  <span>Ver detalles del servicio</span>
                  <ChevronRight size={16} />
                </div>
              </div>
            </a>

            {/* Tarjeta Servicio 3 */}
            <a
              href="#servicio-fotos"
              className="group relative p-8 rounded-3xl bg-[#0b0b14]/80 border border-white/12 hover:border-slate-200/60 backdrop-blur-xl transition-all duration-500 hover:shadow-[0_20px_50px_rgba(255,255,255,0.15)] shadow-[0_12px_36px_rgba(0,0,0,0.6)] flex flex-col justify-between overflow-hidden"
            >
              <DiscoMirrorHover tileSize={18} gap={2} spotlightRadius={140} />
              {/* Velo protector de contraste sobre los espejos reflectantes */}
              <div
                aria-hidden="true"
                className="absolute inset-0 z-[5] bg-gradient-to-b from-[#070710]/60 via-[#070710]/75 to-[#070710]/90 pointer-events-none"
              />
              <div className="relative z-10 flex flex-col justify-between h-full">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-[#090a14]/90 border border-pink-500/40 flex items-center justify-center text-pink-400 mb-6 group-hover:scale-110 transition-transform shadow-md shadow-pink-500/20 backdrop-blur-md">
                    <Camera className="w-7 h-7" />
                  </div>
                  <div className="text-xs font-black uppercase tracking-widest text-pink-300 mb-2 drop-shadow-md">
                    Servicio 03
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white mb-3 group-hover:text-pink-200 transition-colors drop-shadow-[0_2px_8px_rgba(0,0,0,1)]">
                    Fotos Dinámicas por QR
                  </h3>
                  <p className="text-sm sm:text-base text-white font-medium leading-relaxed mb-6 drop-shadow-[0_2px_4px_rgba(0,0,0,1)] [text-shadow:_0_1px_3px_rgb(0_0_0_/_90%),_0_2px_8px_rgb(0_0_0_/_80%)]">
                    Cada mesa tiene su código QR. Los invitados suben fotos con dedicatorias al instante y se proyectan en el mural rotativo del salón con moderación en vivo.
                  </p>
                </div>

                <div className="flex items-center gap-2 text-sm font-bold text-pink-300 group-hover:translate-x-1 transition-transform drop-shadow-md">
                  <span>Ver detalles del servicio</span>
                  <ChevronRight size={16} />
                </div>
              </div>
            </a>
          </div>
        </section>

        {/* ─── DETALLE SERVICIO 01: INVITACIONES DIGITALES ─── */}
        <section
          id="servicio-invitaciones"
          className="border-t border-white/10 py-20 sm:py-28 relative overflow-hidden bg-transparent"
        >
          {/* Ambient Glow */}
          <div
            aria-hidden="true"
            className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none"
          />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col gap-12 sm:gap-16">
            {/* Cabecera & Características */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Text & Intro */}
              <div className="lg:col-span-6 flex flex-col gap-6">
                <h3 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                  Invitaciones Digitales que{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500">
                    enamoran a tus invitados
                  </span>
                </h3>

                <div className="p-4 sm:p-5 rounded-2xl bg-[#080812]/85 border-l-4 border-amber-400 border border-white/12 backdrop-blur-md shadow-lg shadow-black/50">
                  <p className="text-base sm:text-lg text-slate-100 font-medium leading-relaxed drop-shadow-sm">
                    Decile adiós a las tarjetas de papel o los PDFs estáticos. Diseñamos invitaciones web totalmente interactivas, con sobre virtual con sello de lacre, música de fondo, animaciones y personajes integrados a la temática.
                  </p>
                </div>
              </div>

              {/* 4 Cards descriptivas del servicio con hover de espejos giratorios */}
              <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Card 1 */}
                <div className="group relative p-6 sm:p-7 rounded-3xl bg-[#0b0b14]/80 border border-white/12 hover:border-slate-200/60 backdrop-blur-xl transition-all duration-500 hover:shadow-[0_20px_50px_rgba(255,255,255,0.12)] shadow-[0_12px_36px_rgba(0,0,0,0.6)] flex flex-col justify-between overflow-hidden">
                  <DiscoMirrorHover tileSize={18} gap={2} spotlightRadius={120} />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 z-[5] bg-gradient-to-b from-[#070710]/60 via-[#070710]/75 to-[#070710]/90 pointer-events-none"
                  />
                  <div className="relative z-10 flex flex-col gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#090a14]/90 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0 shadow-md shadow-amber-500/20 group-hover:scale-110 transition-transform backdrop-blur-md">
                      <CheckCircle2 className="w-6 h-6 text-amber-400" />
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-black text-white mb-1 group-hover:text-amber-200 transition-colors drop-shadow-[0_2px_6px_rgba(0,0,0,1)]">Confirmación RSVP en Vivo</h4>
                      <p className="text-xs sm:text-sm text-white font-medium leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,1)] [text-shadow:_0_1px_3px_rgb(0_0_0_/_90%)]">Dietas especiales, acompañantes y asistencia confirmada en tiempo real.</p>
                    </div>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="group relative p-6 sm:p-7 rounded-3xl bg-[#0b0b14]/80 border border-white/12 hover:border-slate-200/60 backdrop-blur-xl transition-all duration-500 hover:shadow-[0_20px_50px_rgba(255,255,255,0.12)] shadow-[0_12px_36px_rgba(0,0,0,0.6)] flex flex-col justify-between overflow-hidden">
                  <DiscoMirrorHover tileSize={18} gap={2} spotlightRadius={120} />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 z-[5] bg-gradient-to-b from-[#070710]/60 via-[#070710]/75 to-[#070710]/90 pointer-events-none"
                  />
                  <div className="relative z-10 flex flex-col gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#090a14]/90 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0 shadow-md shadow-amber-500/20 group-hover:scale-110 transition-transform backdrop-blur-md">
                      <MapPin className="w-6 h-6 text-amber-400" />
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-black text-white mb-1 group-hover:text-amber-200 transition-colors drop-shadow-[0_2px_6px_rgba(0,0,0,1)]">Salón & Geolocalización</h4>
                      <p className="text-xs sm:text-sm text-white font-medium leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,1)] [text-shadow:_0_1px_3px_rgb(0_0_0_/_90%)]">Un clic para abrir Google Maps o Waze y llegar directo sin perderse.</p>
                    </div>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="group relative p-6 sm:p-7 rounded-3xl bg-[#0b0b14]/80 border border-white/12 hover:border-slate-200/60 backdrop-blur-xl transition-all duration-500 hover:shadow-[0_20px_50px_rgba(255,255,255,0.12)] shadow-[0_12px_36px_rgba(0,0,0,0.6)] flex flex-col justify-between overflow-hidden">
                  <DiscoMirrorHover tileSize={18} gap={2} spotlightRadius={120} />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 z-[5] bg-gradient-to-b from-[#070710]/60 via-[#070710]/75 to-[#070710]/90 pointer-events-none"
                  />
                  <div className="relative z-10 flex flex-col gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#090a14]/90 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0 shadow-md shadow-amber-500/20 group-hover:scale-110 transition-transform backdrop-blur-md">
                      <Gift className="w-6 h-6 text-amber-400" />
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-black text-white mb-1 group-hover:text-amber-200 transition-colors drop-shadow-[0_2px_6px_rgba(0,0,0,1)]">Cofre de Regalos & Alias</h4>
                      <p className="text-xs sm:text-sm text-white font-medium leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,1)] [text-shadow:_0_1px_3px_rgb(0_0_0_/_90%)]">Copia de CBU/Alias con un solo toque o enlace a lista de regalos.</p>
                    </div>
                  </div>
                </div>

                {/* Card 4 */}
                <div className="group relative p-6 sm:p-7 rounded-3xl bg-[#0b0b14]/80 border border-white/12 hover:border-slate-200/60 backdrop-blur-xl transition-all duration-500 hover:shadow-[0_20px_50px_rgba(255,255,255,0.12)] shadow-[0_12px_36px_rgba(0,0,0,0.6)] flex flex-col justify-between overflow-hidden">
                  <DiscoMirrorHover tileSize={18} gap={2} spotlightRadius={120} />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 z-[5] bg-gradient-to-b from-[#070710]/60 via-[#070710]/75 to-[#070710]/90 pointer-events-none"
                  />
                  <div className="relative z-10 flex flex-col gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#090a14]/90 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0 shadow-md shadow-amber-500/20 group-hover:scale-110 transition-transform backdrop-blur-md">
                      <Music className="w-6 h-6 text-amber-400" />
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-black text-white mb-1 group-hover:text-amber-200 transition-colors drop-shadow-[0_2px_6px_rgba(0,0,0,1)]">Música & Efectos Visuales</h4>
                      <p className="text-xs sm:text-sm text-white font-medium leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,1)] [text-shadow:_0_1px_3px_rgb(0_0_0_/_90%)]">Audio track personalizado y animación de apertura temática inmersiva.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Carrusel Horizontal de Mockups de Celulares con Auto-Scroll */}
            <div className="w-full pt-4">
              <TemplatesPhoneCarousel />
            </div>
          </div>
        </section>

        {/* ─── DETALLE SERVICIO 02: TRIVIA FIESTA EN VIVO ─── */}
        <section
          id="servicio-trivia"
          className="border-t border-white/10 py-20 sm:py-28 relative overflow-hidden bg-transparent"
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

                <div className="p-4 sm:p-5 rounded-2xl bg-[#080812]/85 border-l-4 border-purple-400 border border-white/12 backdrop-blur-md shadow-lg shadow-black/50">
                  <p className="text-base sm:text-lg text-slate-100 font-medium leading-relaxed drop-shadow-sm">
                    Transformá el momento de la cena o la recepción en un programa de televisión interactivo. Los invitados escanean el código QR proyectado en la pantalla gigante y responden preguntas desde su smartphone contra el reloj.
                  </p>
                </div>

                {/* Steps */}
                <div className="flex flex-col gap-3.5 pt-2">
                  <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#0c0c16]/80 border border-white/12 backdrop-blur-md shadow-sm">
                    <div className="w-8 h-8 rounded-full bg-purple-600/25 border border-purple-500/40 text-purple-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      1
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Escanean el QR desde la mesa</h4>
                      <p className="text-xs text-slate-200 font-medium mt-0.5">Sin instalar nada. Solo abren la cámara, eligen su apodo o mesa e ingresan al juego.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#0c0c16]/80 border border-white/12 backdrop-blur-md shadow-sm">
                    <div className="w-8 h-8 rounded-full bg-purple-600/25 border border-purple-500/40 text-purple-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      2
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Preguntas personalizadas y divertidas</h4>
                      <p className="text-xs text-slate-200 font-medium mt-0.5">Anécdotas de la pareja, secretos del homenajeado, momentos graciosos con tiempo límite.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#0c0c16]/80 border border-white/12 backdrop-blur-md shadow-sm">
                    <div className="w-8 h-8 rounded-full bg-purple-600/25 border border-purple-500/40 text-purple-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      3
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Podio y ranking proyectado en vivo</h4>
                      <p className="text-xs text-slate-200 font-medium mt-0.5">Puntajes calculados por rapidez y acierto, con animación de coronación en pantalla gigante.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── DETALLE SERVICIO 03: FOTOS POR QR & MURAL DE PANTALLA ─── */}
        <section
          id="servicio-fotos"
          className="border-t border-white/10 py-20 sm:py-28 relative overflow-hidden bg-transparent"
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

                <div className="p-4 sm:p-5 rounded-2xl bg-[#080812]/85 border-l-4 border-pink-400 border border-white/12 backdrop-blur-md shadow-lg shadow-black/50">
                  <p className="text-base sm:text-lg text-slate-100 font-medium leading-relaxed drop-shadow-sm">
                    Colocamos identificadores con códigos QR en cada mesa del salón. Los invitados capturan selfies, brindis y momentos únicos con su celular, les agregan una dedicatoria y las fotos aparecen al instante proyectadas en pantalla gigante.
                  </p>
                </div>

                {/* Bullets */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#0c0c16]/80 border border-white/12 backdrop-blur-md shadow-sm">
                    <QrCode className="w-5 h-5 text-pink-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-white">QR Exclusivo por Mesa</h4>
                      <p className="text-xs text-slate-200 font-medium mt-1">Escaneo instantáneo sin login ni registros pesados.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#0c0c16]/80 border border-white/12 backdrop-blur-md shadow-sm">
                    <Shield className="w-5 h-5 text-pink-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-white">Panel de Moderación</h4>
                      <p className="text-xs text-slate-200 font-medium mt-1">Aprobá fotos antes de salir a pantalla si lo preferís.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#0c0c16]/80 border border-white/12 backdrop-blur-md shadow-sm">
                    <Tv className="w-5 h-5 text-pink-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-white">Mural Rotativo Animado</h4>
                      <p className="text-xs text-slate-200 font-medium mt-1">Transiciones modernas para proyectores y Smart TVs.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#0c0c16]/80 border border-white/12 backdrop-blur-md shadow-sm">
                    <Smartphone className="w-5 h-5 text-pink-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-white">Descarga Completa al Final</h4>
                      <p className="text-xs text-slate-200 font-medium mt-1">Los anfitriones descargan todas las fotos en alta resolución.</p>
                    </div>
                  </div>
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
        <footer className="border-t border-white/10 py-12 sm:py-16 bg-black/35 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center gap-8">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                Eventos Suite
              </span>
            </div>

            <div className="p-3 px-6 rounded-2xl bg-black/60 border border-white/12 backdrop-blur-md shadow-md">
              <p className="text-slate-200 text-sm max-w-md font-medium leading-relaxed">
                Plataforma integral de invitaciones digitales interactivas, trivias en vivo y transmisión de fotos por QR en pantallas gigantes.
              </p>
            </div>

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
