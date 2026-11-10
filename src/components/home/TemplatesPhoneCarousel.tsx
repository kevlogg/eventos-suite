"use client";

import { useState, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  MapPin,
  Calendar,
  Gift,
  CheckCircle,
  ExternalLink,
} from "lucide-react";

interface PhoneTemplate {
  id: string;
  name: string;
  category: "bodas" | "infantiles" | "fiestas" | "gala";
  categoryLabel: string;
  badge: string;
  themeColor: string;
  accentGradient: string;
  personName: string;
  dateText: string;
  venueName: string;
  venueAddress: string;
  characterImg?: string;
  characterAlt?: string;
  bgStyle: string;
  textColor: string;
  subtextColor: string;
  cardBg: string;
  cardBorder: string;
  emoji: string;
}

const TEMPLATES_DATA: PhoneTemplate[] = [
  // ─── BODAS ───
  {
    id: "boda-botanica",
    name: "Boda Botánica & Floral",
    category: "bodas",
    categoryLabel: "Bodas",
    badge: "🌿 NUESTRA BODA",
    themeColor: "#556B2F",
    accentGradient: "from-emerald-700 to-green-600",
    personName: "Camila & Nicolás",
    dateText: "Sábado 24 de Octubre · 18:30 hs",
    venueName: "Estancia Las Acacias",
    venueAddress: "Ruta 205 Km 64, Cañuelas",
    characterImg: "/images/wedding/botanical-leaves.jpg",
    characterAlt: "Hojas botánicas",
    bgStyle: "linear-gradient(180deg, #F4F7F4 0%, #E2EBE2 50%, #D8E2D8 100%)",
    textColor: "text-[#2D3E1E]",
    subtextColor: "text-[#4A5D3B]",
    cardBg: "bg-white/90",
    cardBorder: "border-[#556B2F]/30",
    emoji: "🌿",
  },
  {
    id: "boda-clasica",
    name: "Boda Clásica Black Tie",
    category: "bodas",
    categoryLabel: "Bodas",
    badge: "🥂 GALA DE BODA · BLACK TIE",
    themeColor: "#D4AF37",
    accentGradient: "from-amber-400 to-yellow-600",
    personName: "Valentina & Mateo",
    dateText: "Viernes 12 de Diciembre · 21:00 hs",
    venueName: "Palacio Paz · Salón Principal",
    venueAddress: "Av. Santa Fe 750, CABA",
    characterImg: "/images/wedding/gold-filigree.jpg",
    characterAlt: "Marco de oro",
    bgStyle: "radial-gradient(ellipse at 50% 20%, #1A1A1E 0%, #111114 50%, #08080A 100%)",
    textColor: "text-[#FAF5EE]",
    subtextColor: "text-amber-200/80",
    cardBg: "bg-black/60",
    cardBorder: "border-amber-400/40",
    emoji: "🥂",
  },
  {
    id: "boda-boho",
    name: "Boda Boho Chic & Sunset",
    category: "bodas",
    categoryLabel: "Bodas",
    badge: "🌾 ATARDECER BOHO",
    themeColor: "#C86D51",
    accentGradient: "from-orange-500 to-amber-600",
    personName: "Lucía & Joaquín",
    dateText: "Domingo 8 de Noviembre · 17:00 hs",
    venueName: "Quinta Los Robles",
    venueAddress: "Camino de las Pampas 1200",
    characterImg: "/images/wedding/boho-pampas.jpg",
    characterAlt: "Pampas secas",
    bgStyle: "linear-gradient(180deg, #FDF8F5 0%, #F5E5DC 50%, #EBD5C8 100%)",
    textColor: "text-[#6D2B19]",
    subtextColor: "text-[#8C4632]",
    cardBg: "bg-white/90",
    cardBorder: "border-[#C86D51]/30",
    emoji: "🌾",
  },

  // ─── INFANTILES ───
  {
    id: "toy-story",
    name: "Toy Story Aventura",
    category: "infantiles",
    categoryLabel: "Infantil",
    badge: "🚀 MISIÓN CUMPLE 5",
    themeColor: "#F59E0B",
    accentGradient: "from-sky-500 via-amber-400 to-red-500",
    personName: "Benjamín",
    dateText: "Sábado 18 de Julio · 16:00 hs",
    venueName: "Salón Magic Kingdom",
    venueAddress: "Av. de los Niños 450",
    characterImg: "/images/characters/woody.png",
    characterAlt: "Woody Toy Story",
    bgStyle: "linear-gradient(180deg, #38BDF8 0%, #0284C7 60%, #0369A1 100%)",
    textColor: "text-white",
    subtextColor: "text-sky-100",
    cardBg: "bg-white/95 text-blue-950",
    cardBorder: "border-amber-400",
    emoji: "🚀",
  },
  {
    id: "princesas",
    name: "Princesas de Cuento Disney",
    category: "infantiles",
    categoryLabel: "Infantil",
    badge: "👑 EL CASTILLO REAL",
    themeColor: "#E11D48",
    accentGradient: "from-pink-400 to-purple-500",
    personName: "Sofía",
    dateText: "Sábado 5 de Septiembre · 17:00 hs",
    venueName: "Palacio de las Hadas",
    venueAddress: "Calle de los Cuentos 230",
    characterImg: "/images/characters/cinderella.png",
    characterAlt: "Cenicienta Disney",
    bgStyle: "linear-gradient(180deg, #FCE7F3 0%, #F3E8FF 50%, #E9D5FF 100%)",
    textColor: "text-pink-950",
    subtextColor: "text-pink-800",
    cardBg: "bg-white/95 text-pink-950",
    cardBorder: "border-pink-300",
    emoji: "🏰",
  },
  {
    id: "futbol-infantil",
    name: "Fútbol Messi Campeón",
    category: "infantiles",
    categoryLabel: "Infantil",
    badge: "⚽ COPA DE CAMPEONES",
    themeColor: "#EAB308",
    accentGradient: "from-emerald-500 via-sky-400 to-yellow-400",
    personName: "Bautista 10",
    dateText: "Domingo 20 de Septiembre · 15:30 hs",
    venueName: "Estadio Monumental Eventos",
    venueAddress: "Av. Figueroa Alcorta 7597",
    characterImg: "/images/characters/messi_trophy.png",
    characterAlt: "Messi Campeón del Mundo",
    bgStyle: "radial-gradient(ellipse at 50% 25%, #15803D 0%, #0D4822 55%, #052310 100%)",
    textColor: "text-white",
    subtextColor: "text-emerald-200",
    cardBg: "bg-white text-emerald-950",
    cardBorder: "border-emerald-500",
    emoji: "⚽",
  },

  // ─── JÓVENES & FIESTA ───
  {
    id: "k-pop",
    name: "K-Pop Idol & Tour",
    category: "fiestas",
    categoryLabel: "Fiesta",
    badge: "💖 WORLD TOUR VIP",
    themeColor: "#EC4899",
    accentGradient: "from-pink-500 via-purple-500 to-cyan-400",
    personName: "Mía · Mis 15",
    dateText: "Sábado 10 de Octubre · 21:00 hs",
    venueName: "Live Stage Arena · Salón VIP",
    venueAddress: "Av. Corrientes 3400",
    characterImg: "/images/characters/kpop_animated.png",
    characterAlt: "Idols K-Pop Anime",
    bgStyle: "linear-gradient(180deg, #0F172A 0%, #3B0764 45%, #0F172A 100%)",
    textColor: "text-white",
    subtextColor: "text-pink-200",
    cardBg: "bg-black/60",
    cardBorder: "border-pink-500/50",
    emoji: "💖",
  },
  {
    id: "fiesta-neon-dj",
    name: "Fiesta Neón & DJ Bresh",
    category: "fiestas",
    categoryLabel: "Fiesta",
    badge: "🪩 NEON NIGHT · DJ PASS",
    themeColor: "#A855F7",
    accentGradient: "from-purple-500 via-pink-500 to-cyan-400",
    personName: "Felipe · 18 Años",
    dateText: "Viernes 27 de Noviembre · 23:00 hs",
    venueName: "Quinta El Bosque · Stage Neón",
    venueAddress: "Pilar Km 52",
    characterImg: "/images/characters/dj_party.jpg",
    characterAlt: "DJ en Vivo",
    bgStyle: "linear-gradient(180deg, #090014 0%, #1B0033 40%, #041E26 100%)",
    textColor: "text-white",
    subtextColor: "text-cyan-200",
    cardBg: "bg-black/70",
    cardBorder: "border-cyan-400/50",
    emoji: "🪩",
  },

  // ─── GALA & ADULTOS ───
  {
    id: "gatsby-glamour",
    name: "Gran Gatsby 1920s Art Déco",
    category: "gala",
    categoryLabel: "Gala",
    badge: "✦ GATSBY GALA 50 AÑOS ✦",
    themeColor: "#D4AF37",
    accentGradient: "from-amber-400 via-yellow-200 to-amber-600",
    personName: "Alejandro",
    dateText: "Sábado 14 de Noviembre · 20:30 hs",
    venueName: "Salón Dorado de Versailles",
    venueAddress: "Av. Alvear 1891, Recoleta",
    characterImg: "/images/characters/gatsby.png",
    characterAlt: "Gran Gatsby brindando",
    bgStyle: "radial-gradient(ellipse at 50% 25%, #1A150A 0%, #0D0A05 50%, #050402 100%)",
    textColor: "text-[#FAF5EE]",
    subtextColor: "text-amber-200/90",
    cardBg: "bg-black/70",
    cardBorder: "border-amber-400/50",
    emoji: "🥂",
  },
  {
    id: "casino-royale",
    name: "Casino Royale & Black Tie VIP",
    category: "gala",
    categoryLabel: "Gala",
    badge: "♠ HIGH STAKES MONTE CARLO ♠",
    themeColor: "#10B981",
    accentGradient: "from-emerald-400 via-amber-400 to-emerald-600",
    personName: "Mariano · Noche VIP",
    dateText: "Sábado 28 de Noviembre · 21:30 hs",
    venueName: "Casino Monte Carlo Lounge",
    venueAddress: "Dársena Norte, Puerto Madero",
    characterImg: "/images/characters/casino_vip.jpg",
    characterAlt: "Ruleta VIP",
    bgStyle: "radial-gradient(ellipse at 50% 25%, #043320 0%, #021E13 50%, #010B07 100%)",
    textColor: "text-[#FAF5EE]",
    subtextColor: "text-emerald-200/90",
    cardBg: "bg-black/70",
    cardBorder: "border-emerald-500/50",
    emoji: "♠️",
  },
];

export default function TemplatesPhoneCarousel() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const filteredTemplates =
    selectedCategory === "all"
      ? TEMPLATES_DATA
      : TEMPLATES_DATA.filter((t) => t.category === selectedCategory);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full flex flex-col gap-6 relative">
      {/* ─── CATEGORY FILTER PILLS & CONTROLS ─── */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: "all", label: "Todas las plantillas" },
            { id: "bodas", label: "💍 Bodas" },
            { id: "infantiles", label: "🎈 Infantiles" },
            { id: "fiestas", label: "🪩 Jóvenes & Fiesta" },
            { id: "gala", label: "👑 Gala & Adultos" },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                selectedCategory === cat.id
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/25 scale-105"
                  : "bg-black/40 text-slate-300 hover:text-white hover:bg-black/70 border border-white/10"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Carousel Arrow Controls */}
        <div className="flex items-center gap-2 ml-auto">
          <button
            type="button"
            onClick={scrollLeft}
            aria-label="Anterior plantilla"
            className="w-9 h-9 rounded-full bg-black/60 border border-white/15 flex items-center justify-center text-slate-300 hover:text-white hover:bg-black/80 hover:border-white/30 transition-all shadow-md active:scale-95"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={scrollRight}
            aria-label="Siguiente plantilla"
            className="w-9 h-9 rounded-full bg-black/60 border border-white/15 flex items-center justify-center text-slate-300 hover:text-white hover:bg-black/80 hover:border-white/30 transition-all shadow-md active:scale-95"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* ─── HORIZONTAL SCROLL OF PHONE MOCKUPS ─── */}
      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent select-none"
        style={{ scrollBehavior: "smooth" }}
      >
        {filteredTemplates.map((template) => (
          <div
            key={template.id}
            className="snap-center shrink-0 w-[260px] sm:w-[280px] flex flex-col items-center gap-3 group"
          >
            {/* Template Header Badge */}
            <div className="flex items-center justify-between w-full px-2 text-xs">
              <span className="font-bold text-white flex items-center gap-1.5">
                <span>{template.emoji}</span>
                <span className="line-clamp-1">{template.name}</span>
              </span>
              <span className="text-[10px] uppercase font-bold text-slate-400 bg-white/10 px-2 py-0.5 rounded-full">
                {template.categoryLabel}
              </span>
            </div>

            {/* ─── IPHONE CHASSIS FRAME ─── */}
            <div className="relative w-full h-[500px] sm:h-[530px] rounded-[44px] bg-[#0c0d14] p-3 border-[6px] border-[#1f2333] shadow-[0_20px_50px_rgba(0,0,0,0.85)] hover:shadow-[0_25px_60px_rgba(99,102,241,0.25)] hover:border-indigo-500/50 transition-all duration-500 overflow-hidden group/phone">
              {/* Dynamic Island Notch */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-4 rounded-full bg-black z-30 flex items-center justify-end px-2 pointer-events-none shadow-sm">
                <div className="w-2 h-2 rounded-full bg-[#182030]" />
              </div>

              {/* Glass Screen Reflection Highlight */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-white/[0.12] z-20 pointer-events-none rounded-[36px]"
              />

              {/* ─── AUTO-SCROLLING INVITATION SCREEN CONTENT ─── */}
              <div
                className="w-full h-full rounded-[34px] overflow-hidden relative cursor-default"
                style={{ background: template.bgStyle }}
              >
                {/* Inner Animated Scrolling Column */}
                <div
                  className="w-full flex flex-col gap-5 p-4 pt-10 text-center transition-transform hover:[animation-play-state:paused]"
                  style={{
                    animation: "phoneScrollLoop 14s ease-in-out infinite alternate",
                  }}
                >
                  {/* Badge */}
                  <div className="inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full bg-black/40 border border-white/20 text-[10px] font-bold uppercase tracking-wider mx-auto text-amber-200">
                    <Sparkles size={11} className="text-amber-400" />
                    <span>{template.badge}</span>
                  </div>

                  {/* Character Illustration / Watermark if present */}
                  {template.characterImg && (
                    <div className="w-28 h-28 mx-auto rounded-2xl overflow-hidden shadow-lg border border-white/20 relative group-hover/phone:scale-105 transition-transform duration-500">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={template.characterImg}
                        alt={template.characterAlt || ""}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Person Name / Headline */}
                  <div>
                    <h4
                      className={`text-xl sm:text-2xl font-black tracking-tight leading-tight ${template.textColor}`}
                    >
                      {template.personName}
                    </h4>
                    <p className={`text-[11px] font-medium mt-1 ${template.subtextColor}`}>
                      {template.dateText}
                    </p>
                  </div>

                  {/* Mini Countdown Card */}
                  <div
                    className={`rounded-2xl p-3 border shadow-md flex flex-col gap-2 ${template.cardBg} ${template.cardBorder}`}
                  >
                    <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">
                      Cuenta Regresiva
                    </span>
                    <div className="grid grid-cols-4 gap-1.5 text-center">
                      <div className="p-1 rounded-lg bg-black/10">
                        <div className="text-xs font-black">12</div>
                        <div className="text-[8px] uppercase opacity-70">Días</div>
                      </div>
                      <div className="p-1 rounded-lg bg-black/10">
                        <div className="text-xs font-black">08</div>
                        <div className="text-[8px] uppercase opacity-70">Hs</div>
                      </div>
                      <div className="p-1 rounded-lg bg-black/10">
                        <div className="text-xs font-black">45</div>
                        <div className="text-[8px] uppercase opacity-70">Min</div>
                      </div>
                      <div className="p-1 rounded-lg bg-black/10">
                        <div className="text-xs font-black">20</div>
                        <div className="text-[8px] uppercase opacity-70">Seg</div>
                      </div>
                    </div>
                  </div>

                  {/* Mini Venue Location Card */}
                  <div
                    className={`rounded-2xl p-3 border shadow-md flex items-start gap-2.5 text-left ${template.cardBg} ${template.cardBorder}`}
                  >
                    <div className="w-7 h-7 rounded-xl bg-amber-500/20 text-amber-500 flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin size={14} />
                    </div>
                    <div>
                      <div className="text-[11px] font-bold line-clamp-1">{template.venueName}</div>
                      <div className="text-[9px] opacity-75 line-clamp-1">
                        {template.venueAddress}
                      </div>
                      <div className="text-[9px] font-bold text-indigo-400 mt-1">
                        Abrir con Google Maps →
                      </div>
                    </div>
                  </div>

                  {/* Mini Gift Chest Card */}
                  <div
                    className={`rounded-2xl p-3 border shadow-md flex items-center justify-between text-left ${template.cardBg} ${template.cardBorder}`}
                  >
                    <div className="flex items-center gap-2">
                      <Gift size={14} className="text-amber-500" />
                      <span className="text-[10px] font-bold">Cofre de Regalos</span>
                    </div>
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-black/10">
                      Alias CBU
                    </span>
                  </div>

                  {/* Mini RSVP Form Button */}
                  <div
                    className={`rounded-2xl p-3 border shadow-md flex flex-col gap-2 ${template.cardBg} ${template.cardBorder}`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-bold">
                      <span>Confirmar Asistencia</span>
                      <CheckCircle size={13} className="text-emerald-500" />
                    </div>
                    <div className="w-full py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-[10px] tracking-wide text-center">
                      Confirmar mi Lugar
                    </div>
                  </div>

                  <div className="text-[9px] opacity-60 pb-8">
                    ✨ Diseñado para eventos únicos
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Global CSS Animation for phone vertical auto-scroll */}
      <style jsx global>{`
        @keyframes phoneScrollLoop {
          0%,
          15% {
            transform: translateY(0%);
          }
          50%,
          65% {
            transform: translateY(-42%);
          }
          100% {
            transform: translateY(0%);
          }
        }
      `}</style>
    </div>
  );
}

