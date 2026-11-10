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

function InstagramIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

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

export default function HomePage() {
  return (
    <div className="relative bg-transparent text-slate-100 selection:bg-indigo-500 selection:text-white min-h-screen">
      {/* ─── PANTALLA 1: BOLA DE BOLICHE 3D & CANVAS DE LUCES PERSISTENTE ─── */}
      <DiscoBallHero />

      {/* ─── EFECTO CORTINA: SECCIÓN QUE SUBE AL HACER SCROLL SOBRE EL HERO (Z-20) ─── */}
      <div
        id="servicios"
        className="relative z-20 bg-[#06060c]/95 md:bg-gradient-to-b md:from-[#020205]/45 md:via-[#020205]/55 md:to-[#020205]/65 rounded-t-[44px] sm:rounded-t-[64px] border-t border-white/15 shadow-[0_-30px_90px_rgba(0,0,0,0.95)] backdrop-blur-none md:backdrop-blur-[6px] min-h-screen"
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
              className="group relative p-8 rounded-3xl bg-[#07080f] border border-white/20 hover:border-slate-200/90 transition-all duration-500 shadow-[inset_0_1px_2px_rgba(255,255,255,0.4),inset_0_-3px_8px_rgba(0,0,0,0.95),0_16px_40px_rgba(0,0,0,0.75)] hover:shadow-[inset_0_1px_3px_rgba(255,255,255,0.8),inset_0_-4px_10px_rgba(0,0,0,1),0_25px_60px_rgba(0,0,0,0.9)] flex flex-col justify-between overflow-hidden"
            >
              <DiscoMirrorHover tileSize={18} gap={2} spotlightRadius={140} />
              <div className="relative z-10 flex flex-col justify-between h-full">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-[#090a14]/95 border border-amber-500/50 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-amber-500/25 backdrop-blur-md">
                    <PartyPopper className="w-7 h-7" />
                  </div>
                  <div className="text-xs font-black uppercase tracking-widest text-amber-300 mb-2 drop-shadow-md">
                    Servicio 01
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white mb-3 group-hover:text-amber-200 transition-colors drop-shadow-[0_2px_8px_rgba(0,0,0,1)] [text-shadow:_0_1px_3px_#000,_0_2px_8px_#000]">
                    Invitaciones Digitales & RSVP
                  </h3>
                  <p className="text-sm sm:text-base text-slate-100 font-semibold leading-relaxed mb-6 drop-shadow-[0_2px_6px_rgba(0,0,0,1)] [text-shadow:_0_1px_3px_#000,_0_2px_8px_#000,_0_4px_14px_rgba(0,0,0,0.95)]">
                    Plantillas temáticas premium con apertura de sobre interactivo, cuenta regresiva, confirmación de asistencia en vivo, mapas y cofre de regalos.
                  </p>
                </div>

                <div className="flex items-center gap-2 text-sm font-bold text-amber-300 group-hover:translate-x-1 transition-transform drop-shadow-[0_2px_4px_rgba(0,0,0,1)] [text-shadow:_0_1px_2px_#000]">
                  <span>Ver detalles del servicio</span>
                  <ChevronRight size={16} />
                </div>
              </div>
            </a>

            {/* Tarjeta Servicio 2 */}
            <a
              href="#servicio-trivia"
              className="group relative p-8 rounded-3xl bg-[#07080f] border border-white/20 hover:border-slate-200/90 transition-all duration-500 shadow-[inset_0_1px_2px_rgba(255,255,255,0.4),inset_0_-3px_8px_rgba(0,0,0,0.95),0_16px_40px_rgba(0,0,0,0.75)] hover:shadow-[inset_0_1px_3px_rgba(255,255,255,0.8),inset_0_-4px_10px_rgba(0,0,0,1),0_25px_60px_rgba(0,0,0,0.9)] flex flex-col justify-between overflow-hidden"
            >
              <DiscoMirrorHover tileSize={18} gap={2} spotlightRadius={140} />
              <div className="relative z-10 flex flex-col justify-between h-full">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-[#090a14]/95 border border-purple-500/50 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-purple-500/25 backdrop-blur-md">
                    <Trophy className="w-7 h-7" />
                  </div>
                  <div className="text-xs font-black uppercase tracking-widest text-purple-300 mb-2 drop-shadow-md">
                    Servicio 02
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white mb-3 group-hover:text-purple-200 transition-colors drop-shadow-[0_2px_8px_rgba(0,0,0,1)] [text-shadow:_0_1px_3px_#000,_0_2px_8px_#000]">
                    Trivia Fiesta en Vivo
                  </h3>
                  <p className="text-sm sm:text-base text-slate-100 font-semibold leading-relaxed mb-6 drop-shadow-[0_2px_6px_rgba(0,0,0,1)] [text-shadow:_0_1px_3px_#000,_0_2px_8px_#000,_0_4px_14px_rgba(0,0,0,0.95)]">
                    Un juego interactivo donde los invitados compiten desde sus celulares en vivo. Preguntas personalizadas y ranking proyectado en pantalla gigante.
                  </p>
                </div>

                <div className="flex items-center gap-2 text-sm font-bold text-purple-300 group-hover:translate-x-1 transition-transform drop-shadow-[0_2px_4px_rgba(0,0,0,1)] [text-shadow:_0_1px_2px_#000]">
                  <span>Ver detalles del servicio</span>
                  <ChevronRight size={16} />
                </div>
              </div>
            </a>

            {/* Tarjeta Servicio 3 */}
            <a
              href="#servicio-fotos"
              className="group relative p-8 rounded-3xl bg-[#07080f] border border-white/20 hover:border-slate-200/90 transition-all duration-500 shadow-[inset_0_1px_2px_rgba(255,255,255,0.4),inset_0_-3px_8px_rgba(0,0,0,0.95),0_16px_40px_rgba(0,0,0,0.75)] hover:shadow-[inset_0_1px_3px_rgba(255,255,255,0.8),inset_0_-4px_10px_rgba(0,0,0,1),0_25px_60px_rgba(0,0,0,0.9)] flex flex-col justify-between overflow-hidden"
            >
              <DiscoMirrorHover tileSize={18} gap={2} spotlightRadius={140} />
              <div className="relative z-10 flex flex-col justify-between h-full">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-[#090a14]/95 border border-pink-500/50 flex items-center justify-center text-pink-400 mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-pink-500/25 backdrop-blur-md">
                    <Camera className="w-7 h-7" />
                  </div>
                  <div className="text-xs font-black uppercase tracking-widest text-pink-300 mb-2 drop-shadow-md">
                    Servicio 03
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white mb-3 group-hover:text-pink-200 transition-colors drop-shadow-[0_2px_8px_rgba(0,0,0,1)] [text-shadow:_0_1px_3px_#000,_0_2px_8px_#000]">
                    Fotos Dinámicas por QR
                  </h3>
                  <p className="text-sm sm:text-base text-slate-100 font-semibold leading-relaxed mb-6 drop-shadow-[0_2px_6px_rgba(0,0,0,1)] [text-shadow:_0_1px_3px_#000,_0_2px_8px_#000,_0_4px_14px_rgba(0,0,0,0.95)]">
                    Cada mesa tiene su código QR. Los invitados suben fotos con dedicatorias al instante y se proyectan en el mural rotativo del salón con moderación en vivo.
                  </p>
                </div>

                <div className="flex items-center gap-2 text-sm font-bold text-pink-300 group-hover:translate-x-1 transition-transform drop-shadow-[0_2px_4px_rgba(0,0,0,1)] [text-shadow:_0_1px_2px_#000]">
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
          className="border-y border-white/20 py-20 sm:py-28 relative overflow-hidden bg-gradient-to-b from-white/[0.08] via-white/[0.04] to-white/[0.08] backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.35),inset_0_-1px_1px_rgba(255,255,255,0.2),0_15px_45px_rgba(0,0,0,0.4)]"
        >
          {/* Ambient Frosted Glass Luminous Glazes */}
          <div
            aria-hidden="true"
            className="absolute -top-32 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-64 bg-white/[0.06] rounded-full blur-3xl pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-amber-500/12 blur-3xl pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute bottom-10 -right-32 w-96 h-96 rounded-full bg-yellow-400/8 blur-3xl pointer-events-none"
          />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col gap-12 sm:gap-16">
            {/* Cabecera & Características */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Text & Intro */}
              <div className="lg:col-span-6 flex flex-col gap-6">
                <h3 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
                  Invitaciones Digitales que{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 drop-shadow-[0_2px_10px_rgba(245,158,11,0.3)]">
                    enamoran a tus invitados
                  </span>
                </h3>

                <div className="p-4 sm:p-5 rounded-2xl bg-[#080812]/85 border-l-4 border-amber-400 border border-white/12 backdrop-blur-md shadow-lg shadow-black/50">
                  <p className="text-base sm:text-lg text-slate-100 font-medium leading-relaxed drop-shadow-sm">
                    Decile adiós a las tarjetas de papel o los PDFs estáticos. Diseñamos invitaciones web totalmente interactivas, con sobre virtual con sello de lacre, música de fondo, animaciones y personajes integrados a la temática.
                  </p>
                </div>

                {/* Botones de acción: Instagram & WhatsApp */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
                  <a
                    href="https://www.instagram.com/p/De5SsnIRwwI/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:opacity-95 text-white font-black text-sm sm:text-base shadow-[0_10px_25px_rgba(253,29,29,0.35)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 shrink-0"
                  >
                    <InstagramIcon className="w-5 h-5 text-white shrink-0" />
                    <span>Ver en Instagram</span>
                  </a>

                  <a
                    href="https://wa.me/5492235851419?text=Hola!%20Quiero%20saber%20m%C3%A1s%20sobre%20el%20servicio%20de%20Invitaciones%20Digitales%20Interactivas."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-slate-950 font-black text-sm sm:text-base shadow-[0_10px_25px_rgba(37,211,102,0.3)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <WhatsAppIcon className="w-5 h-5 shrink-0" />
                    <span>Quiero saber más sobre este servicio</span>
                  </a>
                </div>
              </div>

              {/* 4 Cards descriptivas del servicio con hover de espejos giratorios */}
              <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Card 1 */}
                <div className="group relative p-6 sm:p-7 rounded-3xl bg-[#07080f] border border-white/20 hover:border-slate-200/90 transition-all duration-500 shadow-[inset_0_1px_2px_rgba(255,255,255,0.4),inset_0_-3px_8px_rgba(0,0,0,0.95),0_14px_36px_rgba(0,0,0,0.7)] hover:shadow-[inset_0_1px_3px_rgba(255,255,255,0.8),inset_0_-4px_10px_rgba(0,0,0,1),0_20px_50px_rgba(0,0,0,0.85)] flex flex-col justify-between overflow-hidden">
                  <DiscoMirrorHover tileSize={18} gap={2} spotlightRadius={120} />
                  <div className="relative z-10 flex flex-col gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#090a14]/95 border border-amber-500/50 flex items-center justify-center text-amber-400 shrink-0 shadow-lg shadow-amber-500/25 group-hover:scale-110 transition-transform backdrop-blur-md">
                      <CheckCircle2 className="w-6 h-6 text-amber-400" />
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-black text-white mb-1 group-hover:text-amber-200 transition-colors drop-shadow-[0_2px_6px_rgba(0,0,0,1)] [text-shadow:_0_1px_3px_#000,_0_2px_6px_#000]">Confirmación RSVP en Vivo</h4>
                      <p className="text-xs sm:text-sm text-slate-100 font-semibold leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,1)] [text-shadow:_0_1px_3px_#000,_0_2px_6px_#000]">Dietas especiales, acompañantes y asistencia confirmada en tiempo real.</p>
                    </div>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="group relative p-6 sm:p-7 rounded-3xl bg-[#07080f] border border-white/20 hover:border-slate-200/90 transition-all duration-500 shadow-[inset_0_1px_2px_rgba(255,255,255,0.4),inset_0_-3px_8px_rgba(0,0,0,0.95),0_14px_36px_rgba(0,0,0,0.7)] hover:shadow-[inset_0_1px_3px_rgba(255,255,255,0.8),inset_0_-4px_10px_rgba(0,0,0,1),0_20px_50px_rgba(0,0,0,0.85)] flex flex-col justify-between overflow-hidden">
                  <DiscoMirrorHover tileSize={18} gap={2} spotlightRadius={120} />
                  <div className="relative z-10 flex flex-col gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#090a14]/95 border border-amber-500/50 flex items-center justify-center text-amber-400 shrink-0 shadow-lg shadow-amber-500/25 group-hover:scale-110 transition-transform backdrop-blur-md">
                      <MapPin className="w-6 h-6 text-amber-400" />
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-black text-white mb-1 group-hover:text-amber-200 transition-colors drop-shadow-[0_2px_6px_rgba(0,0,0,1)] [text-shadow:_0_1px_3px_#000,_0_2px_6px_#000]">Salón & Geolocalización</h4>
                      <p className="text-xs sm:text-sm text-slate-100 font-semibold leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,1)] [text-shadow:_0_1px_3px_#000,_0_2px_6px_#000]">Un clic para abrir Google Maps o Waze y llegar directo sin perderse.</p>
                    </div>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="group relative p-6 sm:p-7 rounded-3xl bg-[#07080f] border border-white/20 hover:border-slate-200/90 transition-all duration-500 shadow-[inset_0_1px_2px_rgba(255,255,255,0.4),inset_0_-3px_8px_rgba(0,0,0,0.95),0_14px_36px_rgba(0,0,0,0.7)] hover:shadow-[inset_0_1px_3px_rgba(255,255,255,0.8),inset_0_-4px_10px_rgba(0,0,0,1),0_20px_50px_rgba(0,0,0,0.85)] flex flex-col justify-between overflow-hidden">
                  <DiscoMirrorHover tileSize={18} gap={2} spotlightRadius={120} />
                  <div className="relative z-10 flex flex-col gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#090a14]/95 border border-amber-500/50 flex items-center justify-center text-amber-400 shrink-0 shadow-lg shadow-amber-500/25 group-hover:scale-110 transition-transform backdrop-blur-md">
                      <Gift className="w-6 h-6 text-amber-400" />
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-black text-white mb-1 group-hover:text-amber-200 transition-colors drop-shadow-[0_2px_6px_rgba(0,0,0,1)] [text-shadow:_0_1px_3px_#000,_0_2px_6px_#000]">Cofre de Regalos & Alias</h4>
                      <p className="text-xs sm:text-sm text-slate-100 font-semibold leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,1)] [text-shadow:_0_1px_3px_#000,_0_2px_6px_#000]">Copia de CBU/Alias con un solo toque o enlace a lista de regalos.</p>
                    </div>
                  </div>
                </div>

                {/* Card 4 */}
                <div className="group relative p-6 sm:p-7 rounded-3xl bg-[#07080f] border border-white/20 hover:border-slate-200/90 transition-all duration-500 shadow-[inset_0_1px_2px_rgba(255,255,255,0.4),inset_0_-3px_8px_rgba(0,0,0,0.95),0_14px_36px_rgba(0,0,0,0.7)] hover:shadow-[inset_0_1px_3px_rgba(255,255,255,0.8),inset_0_-4px_10px_rgba(0,0,0,1),0_20px_50px_rgba(0,0,0,0.85)] flex flex-col justify-between overflow-hidden">
                  <DiscoMirrorHover tileSize={18} gap={2} spotlightRadius={120} />
                  <div className="relative z-10 flex flex-col gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#090a14]/95 border border-amber-500/50 flex items-center justify-center text-amber-400 shrink-0 shadow-lg shadow-amber-500/25 group-hover:scale-110 transition-transform backdrop-blur-md">
                      <Music className="w-6 h-6 text-amber-400" />
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-black text-white mb-1 group-hover:text-amber-200 transition-colors drop-shadow-[0_2px_6px_rgba(0,0,0,1)] [text-shadow:_0_1px_3px_#000,_0_2px_6px_#000]">Música & Efectos Visuales</h4>
                      <p className="text-xs sm:text-sm text-slate-100 font-semibold leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,1)] [text-shadow:_0_1px_3px_#000,_0_2px_6px_#000]">Audio track personalizado y animación de apertura temática inmersiva.</p>
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
              {/* Visual: Presentador en Vivo, Pantalla Gigante con Podio y Mesas con QR */}
              <div className="lg:col-span-6 order-2 lg:order-1">
                <div className="relative rounded-[32px] p-1.5 bg-gradient-to-br from-purple-500/50 via-indigo-500/30 to-pink-500/40 shadow-[0_25px_60px_rgba(0,0,0,0.85)] group">
                  <div className="relative rounded-[26px] overflow-hidden bg-slate-950 aspect-[4/3] sm:aspect-[16/11]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/services/trivia_show_event.jpg"
                      alt="Presentador en vivo en pantalla gigante con podio y mesas de invitados jugando con código QR"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                      decoding="async"
                    />

                    {/* Live Badge Overlay */}
                    <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-purple-400/50 flex items-center gap-2 text-[11px] font-black tracking-wider uppercase text-purple-200 shadow-lg">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                      <span>En Vivo en el Evento</span>
                    </div>

                    {/* Caption Banner at bottom */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/75 to-transparent p-4 sm:p-5 flex flex-col gap-1">
                      <span className="text-xs sm:text-sm font-black text-white drop-shadow-md">
                        🎤 Conducción en Vivo + Pantalla Gigante LED + Mesas Jugando por QR
                      </span>
                      <span className="text-[10px] sm:text-xs text-purple-200/90 font-medium drop-shadow-sm">
                        Los invitados compiten en tiempo real desde sus celulares mientras el podio se actualiza al instante en la pantalla.
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Text & Features */}
              <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col gap-6">
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

                {/* Botón WhatsApp de contacto */}
                <div className="pt-2">
                  <a
                    href="https://wa.me/5492235851419?text=Hola!%20Quiero%20saber%20m%C3%A1s%20sobre%20el%20servicio%20de%20Trivia%20Fiesta%20en%20Vivo."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-slate-950 font-black text-sm sm:text-base shadow-[0_10px_25px_rgba(37,211,102,0.3)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 w-full sm:w-auto"
                  >
                    <WhatsAppIcon className="w-5 h-5 shrink-0" />
                    <span>Quiero saber más sobre este servicio</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── DETALLE SERVICIO 03: FOTOS POR QR & MURAL DE PANTALLA ─── */}
        <section
          id="servicio-fotos"
          className="border-y border-white/20 py-20 sm:py-28 relative overflow-hidden bg-gradient-to-b from-white/[0.08] via-white/[0.04] to-white/[0.08] backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.35),inset_0_-1px_1px_rgba(255,255,255,0.2),0_15px_45px_rgba(0,0,0,0.4)]"
        >
          {/* Ambient Frosted Glass Luminous Glazes */}
          <div
            aria-hidden="true"
            className="absolute -top-32 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-64 bg-white/[0.06] rounded-full blur-3xl pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-pink-500/12 blur-3xl pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute bottom-10 right-1/4 w-80 h-80 rounded-full bg-rose-500/10 blur-3xl pointer-events-none"
          />

          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Text & Features */}
              <div className="lg:col-span-6 flex flex-col gap-6">
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

                {/* Botón WhatsApp de contacto */}
                <div className="pt-2">
                  <a
                    href="https://wa.me/5492235851419?text=Hola!%20Quiero%20saber%20m%C3%A1s%20sobre%20el%20servicio%20de%20Mural%20de%20Fotos%20Din%C3%A1micas%20por%20QR."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-slate-950 font-black text-sm sm:text-base shadow-[0_10px_25px_rgba(37,211,102,0.3)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 w-full sm:w-auto"
                  >
                    <WhatsAppIcon className="w-5 h-5 shrink-0" />
                    <span>Quiero saber más sobre este servicio</span>
                  </a>
                </div>
              </div>

              {/* Visual: Mural de Fotos en Vivo en Pantalla Gigante & Mesa con QR */}
              <div className="lg:col-span-6">
                <div className="relative rounded-[32px] p-1.5 bg-gradient-to-br from-pink-500/50 via-rose-500/30 to-purple-500/40 shadow-[0_25px_60px_rgba(0,0,0,0.85)] group">
                  <div className="relative rounded-[26px] overflow-hidden bg-slate-950 aspect-[4/3] sm:aspect-[16/11]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/services/mural_fotos_event.jpg"
                      alt="Mural de fotos en vivo proyectado en pantalla gigante con invitados escaneando el código QR de la mesa"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                      decoding="async"
                    />

                    {/* Live Badge Overlay */}
                    <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-pink-400/50 flex items-center gap-2 text-[11px] font-black tracking-wider uppercase text-pink-200 shadow-lg">
                      <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping" />
                      <span>Transmisión en Vivo</span>
                    </div>

                    {/* Caption Banner at bottom */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/75 to-transparent p-4 sm:p-5 flex flex-col gap-1">
                      <span className="text-xs sm:text-sm font-black text-white drop-shadow-md">
                        📸 QR en Cada Mesa + Fotos Proyectadas al Instante en Pantalla
                      </span>
                      <span className="text-[10px] sm:text-xs text-pink-200/90 font-medium drop-shadow-sm">
                        Los invitados capturan momentos únicos desde sus celulares y se proyectan al instante con dedicatorias.
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

            <div className="border-t border-white/10 w-full pt-8 text-xs text-slate-400">
              Servicios digitales desarrollados por{" "}
              <a
                href="https://kevdev.net.ar"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-white hover:text-indigo-400 transition-colors underline decoration-indigo-500/50 underline-offset-4"
              >
                kevdev
              </a>
            </div>
          </div>
        </footer>
      </div>

      {/* Botón flotante de WhatsApp circular y fijo en el viewport (solo icono, limpio) */}
      <a
        href="https://wa.me/5492235851419?text=Hola!%20Quisiera%20consultar%20sobre%20los%20servicios%20de%20Eventos%20Suite."
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
