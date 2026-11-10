"use client";

import { useState, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  MapPin,
  Gift,
  CheckCircle,
  Trophy,
  Star,
  Music,
  Heart,
  Crown,
} from "lucide-react";

interface RealTemplateConfig {
  id: string;
  name: string;
  category: "bodas" | "infantiles" | "fiestas" | "gala";
  categoryLabel: string;
  badge: string;
  tagline: string;
  topRibbon: string;
  bgStyle: string;
  textColor: string;
  subtextColor: string;
  headlineFont?: string;
  personName: string;
  eventSubtitle: string;
  dorsalNumber?: string;
  characterImg: string;
  characterCutout?: string;
  countdownBg: string;
  countdownBorder: string;
  venueName: string;
  venueAddress: string;
  giftTitle: string;
  giftBadge: string;
  rsvpButtonText: string;
  rsvpGradient: string;
  emoji: string;
}

const REAL_TEMPLATES: RealTemplateConfig[] = [
  // ─── 1. FÚTBOL MESSI CAMPEÓN (INFANTIL) ───
  {
    id: "futbol-infantil",
    name: "Fútbol Messi Campeón",
    category: "infantiles",
    categoryLabel: "Infantil",
    badge: "⏱️ SÁB 20 SEP · 15:30 HS",
    tagline: "⚽ ¡HOY SE JUEGA EL GRAN PARTIDO! ⚽",
    topRibbon:
      "repeating-linear-gradient(90deg, #FFFFFF, #FFFFFF 15px, #000000 15px, #000000 30px, #EAB308 30px, #EAB308 45px)",
    bgStyle:
      "linear-gradient(180deg, #15803D 0%, #166534 35%, #14532D 75%, #052E16 100%)",
    textColor: "text-white",
    subtextColor: "text-emerald-200",
    personName: "Bautista 10",
    eventSubtitle: "Festejamos mi cumple con un super torneo y trofeo oficial",
    dorsalNumber: "10",
    characterImg: "/images/characters/messi.png",
    countdownBg: "bg-white text-emerald-950",
    countdownBorder: "border-2 border-emerald-400 shadow-lg",
    venueName: "Estadio Monumental Eventos",
    venueAddress: "Av. Figueroa Alcorta 7597, Núñez",
    giftTitle: "Cofre Copa del Mundo",
    giftBadge: "Alias: BAUTI.CAMPEON",
    rsvpButtonText: "⚽ Confirmar Mi Camiseta",
    rsvpGradient: "from-amber-400 via-yellow-400 to-amber-500 text-slate-950",
    emoji: "⚽",
  },

  // ─── 2. BODA CLÁSICA BLACK TIE (BODAS) ───
  {
    id: "boda-clasica",
    name: "Boda Clásica Black Tie",
    category: "bodas",
    categoryLabel: "Bodas",
    badge: "⏱️ VIE 12 DIC · 21:00 HS",
    tagline: "🥂 GALA DE BODA · BLACK TIE 🥂",
    topRibbon:
      "linear-gradient(90deg, #D4AF37, #FAF5EE, #D4AF37)",
    bgStyle:
      "radial-gradient(ellipse at 50% 20%, #1A1A20 0%, #101014 50%, #060608 100%)",
    textColor: "text-[#FAF5EE]",
    subtextColor: "text-amber-200/80",
    personName: "Valentina & Mateo",
    eventSubtitle: "Una noche inolvidable de amor, elegancia y celebración formal",
    characterImg: "/images/wedding/gold-filigree.jpg",
    countdownBg: "bg-black/70 text-amber-200",
    countdownBorder: "border-2 border-amber-400/50 shadow-md",
    venueName: "Palacio Paz · Salón Principal",
    venueAddress: "Av. Santa Fe 750, CABA",
    giftTitle: "Cofre Nupcial & CBU",
    giftBadge: "Alias: VALEN.Y.MATEO",
    rsvpButtonText: "🍾 Confirmar Asistencia",
    rsvpGradient: "from-amber-400 to-yellow-500 text-slate-950",
    emoji: "🥂",
  },

  // ─── 3. K-POP IDOL & TOUR (FIESTAS) ───
  {
    id: "k-pop",
    name: "K-Pop Idol & Tour VIP",
    category: "fiestas",
    categoryLabel: "Fiesta",
    badge: "⏱️ SÁB 10 OCT · 21:00 HS",
    tagline: "💖 WORLD TOUR VIP · LIVE CONCERT 💖",
    topRibbon:
      "linear-gradient(90deg, #EC4899, #A855F7, #06B6D4, #EC4899)",
    bgStyle:
      "linear-gradient(180deg, #090614 0%, #170C2D 35%, #230F44 70%, #090614 100%)",
    textColor: "text-white",
    subtextColor: "text-pink-200",
    personName: "Mía · Mis 15 Tour",
    eventSubtitle: "Vení a vibrar la mejor noche con lightsticks, photocards y K-Pop",
    characterImg: "/images/characters/kpop_animated.png",
    countdownBg: "bg-black/70 text-white",
    countdownBorder: "border-2 border-pink-500/60 shadow-[0_0_15px_rgba(236,72,153,0.3)]",
    venueName: "Live Stage Arena · Salón VIP",
    venueAddress: "Av. Corrientes 3400, CABA",
    giftTitle: "Fan Club Gift Box",
    giftBadge: "Alias: MIA.KPOP.TOUR",
    rsvpButtonText: "🎫 Reclamar VIP Pass",
    rsvpGradient: "from-pink-500 via-purple-600 to-cyan-400 text-white",
    emoji: "💖",
  },

  // ─── 4. GRAN GATSBY 1920S (GALA) ───
  {
    id: "gatsby-glamour",
    name: "Gran Gatsby 1920s Art Déco",
    category: "gala",
    categoryLabel: "Gala",
    badge: "⏱️ SÁB 14 NOV · 20:30 HS",
    tagline: "✦ GATSBY GALA 50 AÑOS · 1920s ART DÉCO ✦",
    topRibbon:
      "linear-gradient(90deg, #D4AF37 0%, #F5E6A3 25%, #997A15 50%, #F5E6A3 75%, #D4AF37 100%)",
    bgStyle:
      "radial-gradient(ellipse at 50% 20%, #1A150A 0%, #0D0A05 45%, #050402 100%)",
    textColor: "text-[#FAF5EE]",
    subtextColor: "text-amber-200/90",
    personName: "Alejandro · Gran Gala",
    eventSubtitle: "Celebrando medio siglo de vida entre champagne, swing y jazz",
    characterImg: "/images/characters/gatsby.png",
    countdownBg: "bg-black/75 text-amber-200",
    countdownBorder: "border-2 border-amber-400/60 shadow-lg",
    venueName: "Salón Dorado de Versailles",
    venueAddress: "Av. Alvear 1891, Recoleta",
    giftTitle: "Cofre de Oro & Champagne",
    giftBadge: "Alias: ALEJANDRO.GATSBY",
    rsvpButtonText: "🍸 Confirmar Asistencia VIP",
    rsvpGradient: "from-amber-400 via-yellow-300 to-amber-600 text-slate-950",
    emoji: "🥂",
  },

  // ─── 5. TOY STORY AVENTURA (INFANTIL) ───
  {
    id: "toy-story",
    name: "Toy Story Aventura",
    category: "infantiles",
    categoryLabel: "Infantil",
    badge: "⏱️ SÁB 18 JUL · 16:00 HS",
    tagline: "⭐ ¡AL INFINITO Y MÁS ALLÁ! ⭐",
    topRibbon:
      "repeating-linear-gradient(45deg, #F59E0B, #F59E0B 12px, #DC2626 12px, #DC2626 24px, #2563EB 24px, #2563EB 36px)",
    bgStyle:
      "linear-gradient(180deg, #38BDF8 0%, #7DD3FC 30%, #BAE6FD 65%, #F0F9FF 100%)",
    textColor: "text-blue-950",
    subtextColor: "text-blue-800",
    personName: "Benjamín Cumple 5",
    eventSubtitle: "Acompañame a celebrar mi cumpleaños en una gran misión",
    characterImg: "/images/characters/woody.png",
    characterCutout: "/images/characters/buzz.png",
    countdownBg: "bg-white/95 text-blue-950",
    countdownBorder: "border-3 border-amber-400 shadow-md",
    venueName: "Salón Magic Kingdom",
    venueAddress: "Av. de los Niños 450, Florida",
    giftTitle: "Baúl de Juguetes de Andy",
    giftBadge: "Alias: BENJA.TOY.5",
    rsvpButtonText: "🚀 ¡Misión Confirmada!",
    rsvpGradient: "from-red-500 via-amber-500 to-yellow-400 text-white",
    emoji: "🚀",
  },

  // ─── 6. BODA BOTÁNICA & FLORAL (BODAS) ───
  {
    id: "boda-botanica",
    name: "Boda Botánica & Floral",
    category: "bodas",
    categoryLabel: "Bodas",
    badge: "⏱️ SÁB 24 OCT · 18:30 HS",
    tagline: "🌿 NUESTRA BODA · BOTÁNICA & FLORAL 🌿",
    topRibbon:
      "linear-gradient(90deg, #556B2F, #8FBC8F, #2E8B57, #556B2F)",
    bgStyle:
      "linear-gradient(180deg, #F4F7F4 0%, #E8EFE8 50%, #D8E4D8 100%)",
    textColor: "text-[#2D3E1E]",
    subtextColor: "text-[#4A5D3B]",
    personName: "Camila & Nicolás",
    eventSubtitle: "El comienzo de nuestro para siempre en un entorno natural único",
    characterImg: "/images/wedding/botanical-leaves.jpg",
    countdownBg: "bg-white/95 text-[#2D3E1E]",
    countdownBorder: "border-2 border-[#556B2F]/40 shadow-sm",
    venueName: "Estancia Las Acacias",
    venueAddress: "Ruta 205 Km 64, Cañuelas",
    giftTitle: "Baúl de Luna de Miel",
    giftBadge: "Alias: CAMI.Y.NICO.BODA",
    rsvpButtonText: "🕊️ Confirmar Asistencia",
    rsvpGradient: "from-[#556B2F] to-[#2E8B57] text-white",
    emoji: "🌿",
  },

  // ─── 7. FIESTA NEÓN & DJ BRESH (FIESTAS) ───
  {
    id: "fiesta-neon-dj",
    name: "Fiesta Neón & DJ Bresh",
    category: "fiestas",
    categoryLabel: "Fiesta",
    badge: "⏱️ VIE 27 NOV · 23:00 HS",
    tagline: "🪩 NEON NIGHT · DJ STAGE PASS 🪩",
    topRibbon:
      "linear-gradient(90deg, #06B6D4, #A855F7, #EC4899, #06B6D4)",
    bgStyle:
      "linear-gradient(180deg, #080010 0%, #18002E 35%, #051A24 100%)",
    textColor: "text-white",
    subtextColor: "text-cyan-200",
    personName: "Felipe · 18 Años Party",
    eventSubtitle: "Glitter bar, luces UV, cotillón neón y los mejores DJs en vivo",
    characterImg: "/images/characters/dj_party.jpg",
    countdownBg: "bg-black/80 text-white",
    countdownBorder: "border-2 border-cyan-400/60 shadow-[0_0_15px_rgba(6,182,212,0.35)]",
    venueName: "Quinta El Bosque · Stage Neón",
    venueAddress: "Pilar Km 52, Buenos Aires",
    giftTitle: "Barra Libre & Regalo",
    giftBadge: "Alias: FELIPE.18.PARTY",
    rsvpButtonText: "⚡ Activar Pulsera Neón",
    rsvpGradient: "from-cyan-400 via-purple-500 to-pink-500 text-white",
    emoji: "🪩",
  },

  // ─── 8. CASINO ROYALE VIP (GALA) ───
  {
    id: "casino-royale",
    name: "Casino Royale VIP Monte Carlo",
    category: "gala",
    categoryLabel: "Gala",
    badge: "⏱️ SÁB 28 NOV · 21:30 HS",
    tagline: "♠️ HIGH STAKES MONTE CARLO · VIP ACCESS ♠️",
    topRibbon:
      "linear-gradient(90deg, #10B981 0%, #F59E0B 50%, #10B981 100%)",
    bgStyle:
      "radial-gradient(ellipse at 50% 20%, #064E3B 0%, #022C22 50%, #01150F 100%)",
    textColor: "text-[#FAF5EE]",
    subtextColor: "text-emerald-200/90",
    personName: "Mariano · Noche VIP",
    eventSubtitle: "Mesas de Blackjack, Ruleta VIP, cócteles clásicos y dress code Black Tie",
    characterImg: "/images/characters/casino_vip.jpg",
    countdownBg: "bg-black/75 text-emerald-200",
    countdownBorder: "border-2 border-emerald-500/60 shadow-lg",
    venueName: "Casino Monte Carlo Lounge",
    venueAddress: "Dársena Norte, Puerto Madero",
    giftTitle: "Caja Fuerte VIP & Fichas",
    giftBadge: "Alias: MARIANO.VIP",
    rsvpButtonText: "♦️ Tomar Asiento en la Mesa",
    rsvpGradient: "from-emerald-400 via-amber-400 to-emerald-600 text-slate-950",
    emoji: "♠️",
  },

  // ─── 9. PRINCESAS DE CUENTO (INFANTIL) ───
  {
    id: "princesas",
    name: "Princesas de Cuento Disney",
    category: "infantiles",
    categoryLabel: "Infantil",
    badge: "⏱️ SÁB 5 SEP · 17:00 HS",
    tagline: "👑 EL CASTILLO REAL · GRAN BAILE 👑",
    topRibbon:
      "linear-gradient(90deg, #F43F5E, #EC4899, #A855F7, #EC4899)",
    bgStyle:
      "linear-gradient(180deg, #FDF2F8 0%, #FCE7F3 35%, #F3E8FF 70%, #E9D5FF 100%)",
    textColor: "text-pink-950",
    subtextColor: "text-pink-800",
    personName: "Mis 15 · Sofía",
    eventSubtitle: "Una noche mágica donde los cuentos de hadas se hacen realidad",
    characterImg: "/images/characters/cinderella.png",
    countdownBg: "bg-white/95 text-pink-950",
    countdownBorder: "border-2 border-pink-300 shadow-md",
    venueName: "Palacio de las Hadas & Salón Real",
    venueAddress: "Calle de los Cuentos 230",
    giftTitle: "Cofre de Deseos Reales",
    giftBadge: "Alias: SOFI.MIS15",
    rsvpButtonText: "✨ Asistir al Baile Real",
    rsvpGradient: "from-pink-500 via-purple-500 to-rose-400 text-white",
    emoji: "🏰",
  },

  // ─── 10. BODA BOHO CHIC (BODAS) ───
  {
    id: "boda-boho",
    name: "Boda Boho Chic & Sunset",
    category: "bodas",
    categoryLabel: "Bodas",
    badge: "⏱️ DOM 8 NOV · 17:00 HS",
    tagline: "🌾 ATARDECER BOHO · GOLDEN HOUR 🌾",
    topRibbon:
      "linear-gradient(90deg, #C86D51, #E09F88, #C86D51)",
    bgStyle:
      "linear-gradient(180deg, #FDF8F5 0%, #F6E6DC 50%, #EBD4C6 100%)",
    textColor: "text-[#6D2B19]",
    subtextColor: "text-[#8C4632]",
    personName: "Lucía & Joaquín",
    eventSubtitle: "Bajo la luz del atardecer celebramos nuestro amor entre flores y amigos",
    characterImg: "/images/wedding/boho-pampas.jpg",
    countdownBg: "bg-white/95 text-[#6D2B19]",
    countdownBorder: "border-2 border-[#C86D51]/40 shadow-sm",
    venueName: "Quinta Los Robles",
    venueAddress: "Camino de las Pampas 1200",
    giftTitle: "Aventura de Bodas",
    giftBadge: "Alias: LU.Y.JOACO.BOHO",
    rsvpButtonText: "✨ Acompañarnos al Atardecer",
    rsvpGradient: "from-[#C86D51] to-[#E09F88] text-white",
    emoji: "🌾",
  },
];

export default function TemplatesPhoneCarousel() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftStartRef = useRef(0);

  const filteredTemplates =
    selectedCategory === "all"
      ? REAL_TEMPLATES
      : REAL_TEMPLATES.filter((t) => t.category === selectedCategory);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -360, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 360, behavior: "smooth" });
    }
  };

  // Drag-to-scroll mouse handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    isDraggingRef.current = true;
    startXRef.current = e.pageX - scrollContainerRef.current.offsetLeft;
    scrollLeftStartRef.current = scrollContainerRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    scrollContainerRef.current.scrollLeft = scrollLeftStartRef.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    isDraggingRef.current = false;
  };

  // Wheel horizontal scroll handler
  const handleWheel = (e: React.WheelEvent) => {
    if (!scrollContainerRef.current) return;
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX) && Math.abs(e.deltaY) > 5) {
      scrollContainerRef.current.scrollLeft += e.deltaY;
    }
  };

  return (
    <div className="w-full max-w-full overflow-hidden flex flex-col gap-8 relative">
      {/* ─── CATEGORY FILTER PILLS & CONTROLS ─── */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2.5">
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
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold tracking-wide transition-all shadow-md active:scale-95 ${
                selectedCategory === cat.id
                  ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-indigo-500/30 scale-105 border border-white/30"
                  : "bg-[#0b0c16]/90 text-slate-200 hover:text-white hover:bg-slate-800 border border-white/15"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Carousel Arrow Controls & Drag hint */}
        <div className="flex items-center gap-3 ml-auto">
          <span className="hidden sm:inline-block text-xs font-semibold text-slate-400">
            Deslizá o arrastrá con el mouse →
          </span>
          <button
            type="button"
            onClick={scrollLeft}
            aria-label="Anterior plantilla"
            className="w-10 h-10 rounded-full bg-black/70 border border-white/20 flex items-center justify-center text-slate-200 hover:text-white hover:bg-black/90 hover:border-white/40 transition-all shadow-md active:scale-95"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={scrollRight}
            aria-label="Siguiente plantilla"
            className="w-10 h-10 rounded-full bg-black/70 border border-white/20 flex items-center justify-center text-slate-200 hover:text-white hover:bg-black/90 hover:border-white/40 transition-all shadow-md active:scale-95"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* ─── HORIZONTAL SCROLL OF PHONE MOCKUPS (DRAGGABLE + WHEEL + ARROWS) ─── */}
      <div
        ref={scrollContainerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        onWheel={handleWheel}
        className="flex gap-7 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory select-none cursor-grab active:cursor-grabbing scrollbar-thin scrollbar-thumb-indigo-500/40 scrollbar-track-white/5 hover:scrollbar-thumb-indigo-500/70"
        style={{ scrollBehavior: "smooth" }}
      >
        {filteredTemplates.map((template, idx) => {
          // Intercalated scroll: Even phones start from top, Odd phones start from bottom
          const isEven = idx % 2 === 0;
          const animationClass = isEven
            ? "phoneScrollFromTop 16s ease-in-out infinite alternate"
            : "phoneScrollFromBottom 16s ease-in-out infinite alternate";

          return (
            <div
              key={template.id}
              className="snap-center shrink-0 w-[275px] sm:w-[295px] flex flex-col items-center gap-3.5 group"
            >
              {/* Template Header Badge */}
              <div className="flex items-center justify-between w-full px-2.5">
                <span className="font-black text-sm sm:text-base text-white flex items-center gap-2">
                  <span className="text-lg">{template.emoji}</span>
                  <span className="line-clamp-1">{template.name}</span>
                </span>
                <span className="text-xs uppercase font-extrabold text-amber-300 bg-amber-950/80 border border-amber-400/50 px-3 py-1 rounded-full shadow-sm shrink-0">
                  {template.categoryLabel}
                </span>
              </div>

              {/* ─── IPHONE CHASSIS FRAME ─── */}
              <div className="relative w-full h-[510px] sm:h-[540px] rounded-[44px] bg-[#0c0d14] p-3 border-[6px] border-[#1f2333] shadow-[0_20px_50px_rgba(0,0,0,0.85)] hover:shadow-[0_25px_60px_rgba(99,102,241,0.25)] hover:border-indigo-500/50 transition-all duration-500 overflow-hidden group/phone">
                {/* Dynamic Island Notch */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-4 rounded-full bg-black z-30 flex items-center justify-end px-2 pointer-events-none shadow-sm">
                  <div className="w-2 h-2 rounded-full bg-[#182030]" />
                </div>

                {/* Glass Screen Reflection Highlight */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-white/[0.12] z-20 pointer-events-none rounded-[36px]"
                />

                {/* ─── AUTO-SCROLLING INVITATION SCREEN CONTENT (INTERCALATED) ─── */}
                <div
                  className="w-full h-full rounded-[34px] overflow-hidden relative cursor-default"
                  style={{ background: template.bgStyle }}
                >
                  {/* Top Authentic Themed Ribbon */}
                  <div
                    aria-hidden="true"
                    className="w-full h-2.5 shrink-0 shadow-sm relative z-10"
                    style={{ background: template.topRibbon }}
                  />

                  {/* Inner Animated Scrolling Column (Intercalated Phase) */}
                  <div
                    className="w-full flex flex-col gap-5 p-3.5 pt-8 text-center transition-transform hover:[animation-play-state:paused]"
                    style={{
                      animation: animationClass,
                    }}
                  >
                    {/* Thematic Proclamation Badge */}
                    <div className="inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full bg-black/60 border border-white/20 text-[10px] font-black uppercase tracking-wider mx-auto text-amber-300 shadow-md">
                      <span>{template.tagline}</span>
                    </div>

                    {/* Date/Time Badge */}
                    <div className="inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full bg-white/95 text-slate-900 border border-slate-300 text-[10px] font-black uppercase tracking-wider mx-auto shadow-sm">
                      <Sparkles size={11} className="text-amber-500" />
                      <span>{template.badge}</span>
                    </div>

                    {/* Authentic Thematic Hero Artwork (Tailored per template, no ugly cropped square boxes) */}
                    <div className="relative w-full py-1 flex items-center justify-center">
                      {template.id === "futbol-infantil" && (
                        <div className="relative w-full h-36 flex items-center justify-center">
                          <img
                            src="/images/characters/messi.png"
                            alt="Messi Campeón"
                            loading="lazy"
                            decoding="async"
                            className="h-36 w-auto object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.65)] select-none group-hover/phone:scale-105 transition-transform duration-500"
                          />
                        </div>
                      )}

                      {template.id === "toy-story" && (
                        <div className="relative w-full h-36 flex items-center justify-center gap-2">
                          <img
                            src="/images/characters/woody.png"
                            alt="Woody"
                            loading="lazy"
                            decoding="async"
                            className="h-34 w-auto object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.35)] select-none"
                          />
                          <img
                            src="/images/characters/buzz.png"
                            alt="Buzz Lightyear"
                            loading="lazy"
                            decoding="async"
                            className="h-28 w-auto object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.35)] select-none transform rotate-6"
                          />
                        </div>
                      )}

                      {template.id === "princesas" && (
                        <div className="relative w-full h-36 flex items-center justify-center">
                          <img
                            src="/images/characters/cinderella.png"
                            alt="Cenicienta Real"
                            loading="lazy"
                            decoding="async"
                            className="h-36 w-auto object-contain drop-shadow-[0_15px_30px_rgba(244,114,182,0.55)] select-none group-hover/phone:scale-105 transition-transform duration-500"
                          />
                        </div>
                      )}

                      {template.id === "k-pop" && (
                        <div className="relative w-full h-36 flex items-center justify-center">
                          <img
                            src="/images/characters/kpop_animated.png"
                            alt="K-Pop Idols"
                            loading="lazy"
                            decoding="async"
                            className="h-36 w-auto object-contain drop-shadow-[0_15px_35px_rgba(236,72,153,0.7)] select-none rounded-2xl border-2 border-pink-400/50 group-hover/phone:scale-105 transition-transform duration-500"
                          />
                        </div>
                      )}

                      {template.id === "fiesta-neon-dj" && (
                        <div className="relative w-full h-36 flex items-center justify-center">
                          <div className="h-32 w-48 rounded-2xl overflow-hidden border-2 border-cyan-400/80 shadow-[0_0_25px_rgba(6,182,212,0.6)] relative group-hover/phone:scale-105 transition-transform duration-500">
                            <img
                              src="/images/characters/dj_party.jpg"
                              alt="DJ Stage"
                              loading="lazy"
                              decoding="async"
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-purple-950/85 via-transparent to-transparent flex items-end justify-center pb-1">
                              <span className="text-[9px] font-black uppercase tracking-widest text-cyan-300">★ VIP STAGE PASS ★</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {template.id === "gatsby-glamour" && (
                        <div className="relative w-full h-36 flex items-center justify-center">
                          <img
                            src="/images/characters/gatsby.png"
                            alt="Gran Gatsby"
                            loading="lazy"
                            decoding="async"
                            className="h-36 w-auto object-contain drop-shadow-[0_15px_35px_rgba(212,175,55,0.75)] select-none rounded-2xl border-2 border-amber-400/60 group-hover/phone:scale-105 transition-transform duration-500"
                          />
                        </div>
                      )}

                      {template.id === "casino-royale" && (
                        <div className="relative w-full h-36 flex items-center justify-center">
                          <div className="h-32 w-48 rounded-2xl overflow-hidden border-2 border-amber-400/80 shadow-[0_10px_30px_rgba(16,185,129,0.55)] relative group-hover/phone:scale-105 transition-transform duration-500">
                            <img
                              src="/images/characters/casino_vip.jpg"
                              alt="Casino VIP"
                              loading="lazy"
                              decoding="async"
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-black/85 border border-amber-400/70 text-[8px] font-black text-amber-300 tracking-wider whitespace-nowrap">
                              ♠ MONTE CARLO VIP ♠
                            </div>
                          </div>
                        </div>
                      )}

                      {template.id === "boda-botanica" && (
                        <div className="relative w-full h-36 flex items-center justify-center">
                          <div className="w-32 h-32 rounded-full border-2 border-[#556B2F]/40 bg-white/70 backdrop-blur-sm flex flex-col items-center justify-center shadow-lg relative group-hover/phone:scale-105 transition-transform duration-500">
                            <span className="text-2xl mb-1">💍</span>
                            <span className="font-serif text-2xl font-bold text-[#2D3E1E] tracking-widest">C & N</span>
                            <span className="text-[8px] uppercase tracking-[0.25em] text-[#556B2F] font-bold mt-0.5">Nuestra Boda</span>
                          </div>
                        </div>
                      )}

                      {template.id === "boda-clasica" && (
                        <div className="relative w-full h-36 flex items-center justify-center">
                          <div className="w-32 h-32 rounded-full border-2 border-[#D4AF37]/70 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center shadow-[0_0_25px_rgba(212,175,55,0.4)] relative group-hover/phone:scale-105 transition-transform duration-500">
                            <Crown size={22} className="text-[#D4AF37] mb-1" />
                            <span className="font-serif text-2xl font-bold text-[#FAF5EE] tracking-widest">V & M</span>
                            <span className="text-[8px] uppercase tracking-[0.3em] text-[#D4AF37] font-bold mt-0.5">Black Tie Gala</span>
                          </div>
                        </div>
                      )}

                      {template.id === "boda-boho" && (
                        <div className="relative w-full h-36 flex items-center justify-center">
                          <div className="w-28 h-36 rounded-t-full border-2 border-[#C86D51]/50 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center shadow-md relative pt-2 group-hover/phone:scale-105 transition-transform duration-500">
                            <span className="text-xl mb-1">🌾</span>
                            <span className="font-serif text-2xl font-bold text-[#6D2B19] tracking-widest">L & J</span>
                            <span className="text-[8px] uppercase tracking-[0.2em] text-[#8C4632] font-bold mt-0.5">Golden Hour</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Person Headline */}
                    <div>
                      <h4
                        className={`text-xl sm:text-2xl font-black tracking-tight leading-tight uppercase drop-shadow-md ${template.textColor}`}
                      >
                        {template.personName}
                      </h4>
                      <p className={`text-[11px] font-semibold mt-1 leading-snug px-2 ${template.subtextColor}`}>
                        {template.eventSubtitle}
                      </p>
                    </div>

                    {/* Official Jersey Dorsal if Football */}
                    {template.dorsalNumber && (
                      <div className="mx-auto px-6 py-2 rounded-2xl bg-white border-2 border-amber-400 shadow-md flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase text-gray-500">Dorsal Oficial</span>
                        <span className="text-xl font-black text-emerald-800">{template.dorsalNumber}</span>
                        <Trophy size={14} className="text-amber-500" />
                      </div>
                    )}

                    {/* Authentic Countdown Card */}
                    <div
                      className={`rounded-2xl p-3 border shadow-md flex flex-col gap-2 ${template.countdownBg} ${template.countdownBorder}`}
                    >
                      <div className="flex items-center justify-center gap-1.5 text-[10px] font-black uppercase tracking-wider opacity-90">
                        <Sparkles size={11} />
                        <span>Cuenta Regresiva</span>
                      </div>
                      <div className="grid grid-cols-4 gap-1.5 text-center">
                        <div className="p-1 rounded-lg bg-black/10">
                          <div className="text-xs font-black">12</div>
                          <div className="text-[8px] uppercase font-bold opacity-75">Días</div>
                        </div>
                        <div className="p-1 rounded-lg bg-black/10">
                          <div className="text-xs font-black">08</div>
                          <div className="text-[8px] uppercase font-bold opacity-75">Hs</div>
                        </div>
                        <div className="p-1 rounded-lg bg-black/10">
                          <div className="text-xs font-black">45</div>
                          <div className="text-[8px] uppercase font-bold opacity-75">Min</div>
                        </div>
                        <div className="p-1 rounded-lg bg-black/10">
                          <div className="text-xs font-black">20</div>
                          <div className="text-[8px] uppercase font-bold opacity-75">Seg</div>
                        </div>
                      </div>
                    </div>

                    {/* Authentic Venue Location Card */}
                    <div
                      className={`rounded-2xl p-3 border shadow-md flex items-start gap-2.5 text-left ${template.countdownBg} ${template.countdownBorder}`}
                    >
                      <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-500 flex items-center justify-center shrink-0 mt-0.5">
                        <MapPin size={15} />
                      </div>
                      <div>
                        <div className="text-[11px] font-black line-clamp-1">{template.venueName}</div>
                        <div className="text-[9px] font-medium opacity-80 line-clamp-1">
                          {template.venueAddress}
                        </div>
                        <div className="text-[9px] font-black text-indigo-500 mt-1 flex items-center gap-1">
                          <span>Abrir con Google Maps</span>
                          <span>→</span>
                        </div>
                      </div>
                    </div>

                    {/* Authentic Gift Chest Card */}
                    <div
                      className={`rounded-2xl p-3 border shadow-md flex items-center justify-between text-left ${template.countdownBg} ${template.countdownBorder}`}
                    >
                      <div className="flex items-center gap-2">
                        <Gift size={15} className="text-amber-500" />
                        <div>
                          <div className="text-[10px] font-black">{template.giftTitle}</div>
                          <div className="text-[8px] opacity-75">{template.giftBadge}</div>
                        </div>
                      </div>
                      <span className="text-[9px] font-black px-2.5 py-1 rounded-full bg-black/10">
                        Copiar CBU
                      </span>
                    </div>

                    {/* Authentic RSVP Button */}
                    <div
                      className={`rounded-2xl p-3 border shadow-md flex flex-col gap-2 ${template.countdownBg} ${template.countdownBorder}`}
                    >
                      <div className="flex items-center justify-between text-[10px] font-black">
                        <span>Confirmar Asistencia</span>
                        <CheckCircle size={13} className="text-emerald-500" />
                      </div>
                      <div
                        className={`w-full py-2 rounded-xl bg-gradient-to-r font-black text-[11px] tracking-wide text-center shadow-md ${template.rsvpGradient}`}
                      >
                        {template.rsvpButtonText}
                      </div>
                    </div>

                    <div className="text-[9px] font-semibold opacity-70 pb-10">
                      ✨ Invitación interactiva en vivo
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
