"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight, Camera } from "lucide-react";
import { parseCarouselSlides, type CarouselSlide } from "./PhotoCarousel";
import type { TemplateId } from "@/lib/schemas/invitation.schema";

interface HeroPhotoDisplayProps {
  carouselImages?: string;
  personName?: string;
  theme?: TemplateId;
}

export default function HeroPhotoDisplay({
  carouselImages,
  personName = "Homenajeado",
  theme = "classic-gold",
}: HeroPhotoDisplayProps) {
  const slides = parseCarouselSlides(carouselImages);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const total = slides?.length || 0;

  const nextSlide = useCallback(() => {
    if (total <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    if (total <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Auto-play for carousel (2 or 3 photos)
  useEffect(() => {
    if (isHovered || total <= 1) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5500);
    return () => clearInterval(interval);
  }, [isHovered, nextSlide, total]);

  // Touch Swipe Handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 45) {
      nextSlide();
    } else if (diff < -45) {
      prevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  if (!slides || total === 0) return null;

  const currentSlide = slides[currentIndex] || slides[0];

  // Theme styling variants
  const isMis15RojoDorado = theme === "mis-15-rojo-dorado";
  const isNeon = theme === "fiesta-neon-dj";
  const isKpop = theme === "k-pop";
  const isBotanica = theme === "boda-botanica";
  const isBoho = theme === "boda-boho";
  const isPrincess = theme === "princesas";
  const isFootball = theme === "futbol-infantil";

  // Card container styling
  const cardBorderClass = isMis15RojoDorado
    ? "border-2 border-[#D4AF37]/80 shadow-[0_0_40px_rgba(212,175,55,0.45)] bg-gradient-to-b from-[#3D0308]/90 via-[#200103]/90 to-[#120002]/95"
    : isNeon
    ? "border-2 border-cyan-400 shadow-[0_0_35px_rgba(6,182,212,0.5)] bg-black/80"
    : isKpop
    ? "border-2 border-pink-400/80 shadow-[0_0_35px_rgba(244,114,182,0.5)] bg-purple-950/80"
    : isBotanica
    ? "border-2 border-[#556B2F]/40 shadow-xl bg-[#FAF7F2]"
    : isBoho
    ? "border-2 border-[#C86D51]/40 shadow-xl bg-[#FDF8F5]"
    : isPrincess
    ? "border-2 border-pink-300 shadow-xl bg-white/90"
    : isFootball
    ? "border-2 border-emerald-500 shadow-xl bg-white"
    : "border-2 border-[#D4AF37]/70 shadow-[0_0_35px_rgba(212,175,55,0.4)] bg-black/70";

  const captionTextClass = isMis15RojoDorado
    ? "text-[#F5E6A3] font-serif italic text-xs sm:text-sm"
    : isNeon
    ? "text-cyan-200 font-mono text-xs"
    : isKpop
    ? "text-pink-200 font-sans text-xs font-semibold"
    : isBotanica
    ? "text-[#2D3E1E] font-serif italic text-xs sm:text-sm"
    : isBoho
    ? "text-[#6D2B19] font-serif italic text-xs sm:text-sm"
    : "text-white/90 font-serif italic text-xs sm:text-sm";

  return (
    <div
      className="w-full max-w-sm sm:max-w-md mx-auto my-3 px-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className={`relative p-2.5 sm:p-3.5 rounded-3xl backdrop-blur-md transition-all ${cardBorderClass}`}>
        {/* Inner Photo Window */}
        <div className="relative aspect-[3/4] sm:aspect-[4/5] rounded-2xl overflow-hidden bg-black/80 border border-white/10 shadow-inner select-none flex items-center justify-center">
          {/* Ambient Blurred Background (fills letterbox bars naturally with photo colors) */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={`blur-${currentSlide.src}`}
            src={currentSlide.src}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-40 scale-110 pointer-events-none select-none"
          />

          {/* Full Uncropped Photo */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={currentSlide.src}
            src={currentSlide.src}
            alt={currentSlide.alt || personName}
            className="relative z-10 w-full h-full object-contain animate-fade-in transition-transform duration-700 hover:scale-[1.02] drop-shadow-md select-none"
            loading="eager"
          />

          {/* Gloss Sheen Reflection */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none opacity-20 mix-blend-screen z-10"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.08) 40%, transparent 70%)",
            }}
          />

          {/* Photo Counter Pill (only if 2 or 3 photos) */}
          {total > 1 && (
            <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-black/75 border border-white/20 text-[10px] font-bold text-white backdrop-blur-md shadow-md z-20">
              {currentIndex + 1} / {total}
            </div>
          )}

          {/* Previous Button (if total > 1) */}
          {total > 1 && (
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Foto anterior"
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/85 text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer backdrop-blur-sm z-20 active:scale-95 shadow-md"
            >
              <ChevronLeft size={18} />
            </button>
          )}

          {/* Next Button (if total > 1) */}
          {total > 1 && (
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Siguiente foto"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/85 text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer backdrop-blur-sm z-20 active:scale-95 shadow-md"
            >
              <ChevronRight size={18} />
            </button>
          )}
        </div>

        {/* Carousel Dots (if total > 1) */}
        {total > 1 && (
          <div className="flex items-center justify-center gap-1.5 mt-2.5">
            {slides.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Ver foto ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === currentIndex
                    ? isMis15RojoDorado
                      ? "w-6 bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.8)]"
                      : "w-6 bg-white shadow-sm"
                    : "w-2 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        )}

        {/* Optional Caption */}
        {currentSlide.caption && (
          <div className="mt-2 px-3 py-1.5 rounded-xl bg-black/40 border border-white/10 text-center">
            <p className={captionTextClass}>{currentSlide.caption}</p>
          </div>
        )}
      </div>
    </div>
  );
}

