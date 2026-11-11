"use client";

import { useState, useCallback, useEffect } from "react";
import type { InvitationRecord } from "@/lib/schemas/invitation.schema";
import Countdown from "@/components/invitation/Countdown";
import VenueCard from "@/components/invitation/VenueCard";
import GiftCard from "@/components/invitation/GiftCard";
import RsvpForm from "@/components/invitation/RsvpForm";
import AudioController from "@/components/invitation/AudioController";
import HeroPhotoDisplay from "@/components/invitation/HeroPhotoDisplay";
import { Sparkles, Disc, Radio, Music, Zap, Flame, Ticket } from "lucide-react";

interface TemplateProps {
  invitation: InvitationRecord;
}

export default function FiestaNeonDjTemplate({ invitation }: TemplateProps) {
  const [isOpened, setIsOpened] = useState(false);
  const [isChestOpened, setIsChestOpened] = useState(false);

  const hasGifts = Boolean(
    invitation.giftAlias?.trim() ||
      invitation.giftCbu?.trim() ||
      (invitation.giftBankName?.trim() &&
        invitation.giftBankName !== "Banco / Billetera Virtual")
  );

  const handleEnvelopeOpen = useCallback(() => {
    setIsOpened(true);
  }, []);

  const handleChestOpen = useCallback(() => {
    setIsChestOpened(true);
  }, []);

  useEffect(() => {
    if (!isOpened) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpened]);

  const venueConfig = {
    name: invitation.venueName,
    address: invitation.venueAddress,
    mapsUrl: invitation.venueMapsUrl || "#",
    googleCalendarUrl: invitation.venueCalendarUrl || "#",
  };

  const giftConfig = {
    bankName: invitation.giftBankName || "Banco / Billetera Virtual",
    alias: invitation.giftAlias || "",
    cbu: invitation.giftCbu || "",
    holderName: invitation.giftHolderName || invitation.personName,
  };

  const canShowRsvp = !hasGifts || isChestOpened;

  return (
    <>
      {/* ─── VIP FESTIVAL ENVELOPE / PASS MODAL ─── */}
      {!isOpened && (
        <DjPartyEnvelopeModal
          onOpen={handleEnvelopeOpen}
          personName={invitation.personName}
          eventNumber={invitation.eventNumber}
        />
      )}

      {/* Audio controller */}
      {invitation.audioTrackPath && (
        <AudioController src={invitation.audioTrackPath} isEnabled={isOpened} />
      )}

      {/* Main page content */}
      <main
        className="min-h-screen w-full flex flex-col items-center justify-start relative overflow-hidden text-white"
        style={{
          background:
            "linear-gradient(180deg, #090014 0%, #16002A 30%, #250244 70%, #090014 100%)",
          opacity: isOpened ? 1 : 0,
          transition: "opacity 0.8s ease 0.3s",
        }}
      >
        {/* Glow Spheres & Laser effects in background */}
        <div
          aria-hidden="true"
          className="absolute -top-24 -left-20 w-[450px] h-[450px] rounded-full bg-purple-600/25 blur-3xl pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute top-1/3 -right-20 w-[500px] h-[500px] rounded-full bg-pink-600/25 blur-3xl pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-cyan-600/20 blur-3xl pointer-events-none"
        />

        {/* ─── INTEGRATED REAL DJ / FESTIVAL BACKGROUND WATERMARK ─── */}
        <div
          aria-hidden="true"
          className="absolute top-0 right-0 sm:right-6 md:right-12 w-96 sm:w-[32rem] md:w-[42rem] pointer-events-none z-0 opacity-40 mix-blend-screen select-none filter drop-shadow-[0_0_60px_rgba(168,85,247,0.7)]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/characters/dj_party.jpg"
            alt=""
            className="w-full h-auto object-cover rounded-3xl"
          />
        </div>

        {/* Diagonal laser lights */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-1/6 w-0.5 h-full bg-gradient-to-b from-cyan-400 via-fuchsia-500 to-transparent opacity-30 transform -rotate-15 pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute top-0 right-1/6 w-0.5 h-full bg-gradient-to-b from-pink-500 via-purple-500 to-transparent opacity-30 transform rotate-15 pointer-events-none"
        />

        {/* Neon top border */}
        <div
          aria-hidden="true"
          className="w-full h-2 shrink-0 relative z-10"
          style={{
            background:
              "linear-gradient(90deg, #A855F7, #EC4899, #06B6D4, #EAB308, #A855F7)",
            boxShadow: "0 0 20px rgba(168,85,247,0.8)",
          }}
        />

        <div
          className="max-w-3xl w-full mx-auto flex flex-col gap-14 sm:gap-20 relative z-10"
          style={{
            paddingLeft: "clamp(1.25rem, 5vw, 2.5rem)",
            paddingRight: "clamp(1.25rem, 5vw, 2.5rem)",
            paddingTop: "clamp(2rem, 5vw, 4rem)",
            paddingBottom: "clamp(4rem, 8vw, 7rem)",
            boxSizing: "border-box",
          }}
        >
          {/* ─── HERO SECTION WITH REAL DJ PERFORMER HERO CUTOUT ─── */}
          <section className="relative flex flex-col items-center gap-5 sm:gap-7 text-center py-4 w-full">
            {/* Real DJ cut-out with vibrant neon aura */}
            <div className="absolute -bottom-16 -right-6 sm:right-0 md:-right-20 w-44 sm:w-64 md:w-80 pointer-events-none z-20 transition-transform duration-700 hover:scale-105">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/characters/dj_party.jpg"
                alt="DJ Live Performance"
                className="w-full h-auto drop-shadow-[0_20px_45px_rgba(168,85,247,0.7)] select-none rounded-3xl border-2 border-purple-400/50"
              />
            </div>

            {/* Festival Stage Badge */}
            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-purple-600/40 via-pink-600/40 to-cyan-600/40 border border-purple-400/60 shadow-[0_0_25px_rgba(168,85,247,0.5)] backdrop-blur-md">
              <Disc size={18} className="text-purple-300 animate-spin" />
              <span className="font-extrabold text-xs sm:text-sm tracking-widest uppercase text-white">
                ★ LIVE DJ SET · FESTIVAL NIGHT ★
              </span>
              <Sparkles size={18} className="text-pink-300 animate-pulse" />
            </div>

            {/* Date Badge */}
            {invitation.badgeText && (
              <div className="inline-flex items-center justify-center px-6 py-2.5 rounded-2xl bg-white/10 border border-purple-400/40 backdrop-blur-md text-pink-300 font-bold text-xs sm:text-sm shadow-md">
                <Radio size={15} className="mr-2 text-pink-400 animate-pulse" />
                <span>{invitation.badgeText}</span>
              </div>
            )}

            {/* Main Headline */}
            <h1
              className="font-black tracking-tight leading-tight uppercase"
              style={{
                fontSize: "clamp(2.8rem, 9.5vw, 5.2rem)",
                background:
                  "linear-gradient(135deg, #FFFFFF 0%, #E879F9 35%, #A855F7 70%, #06B6D4 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 0 25px rgba(168,85,247,0.6))",
                fontFamily: "var(--font-jakarta)",
              }}
            >
              {invitation.headline}
            </h1>

            {/* Hero Photos (1 a 3 fotos / carrusel) */}
            <HeroPhotoDisplay
              carouselImages={invitation.carouselImages}
              personName={invitation.personName}
              theme="fiesta-neon-dj"
            />

            {/* Neon Event Number / Anniversary */}
            {invitation.eventNumber && (
              <div className="relative my-1">
                <div
                  className="font-black px-9 py-2.5 rounded-3xl border-2 border-fuchsia-400/80 shadow-[0_0_40px_rgba(217,70,239,0.5)]"
                  style={{
                    fontSize: "clamp(4.5rem, 16vw, 8rem)",
                    lineHeight: 1,
                    background: "rgba(168, 85, 247, 0.15)",
                    color: "#F0ABFC",
                    textShadow:
                      "0 0 10px #C084FC, 0 0 20px #A855F7, 0 0 45px #EC4899",
                  }}
                >
                  {invitation.eventNumber}
                </div>
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-black px-4 py-1 rounded-full text-xs uppercase tracking-widest shadow-md">
                  ★ VIP ACCESS ★
                </div>
              </div>
            )}

            {/* Subheadline */}
            <p className="text-base sm:text-lg font-medium text-purple-200 max-w-lg leading-relaxed bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-md">
              {invitation.subheadline}
            </p>
          </section>

          {/* ─── COUNTDOWN SECTION ─── */}
          <section className="bg-black/50 rounded-3xl p-6 sm:p-10 border border-purple-500/40 shadow-[0_0_35px_rgba(168,85,247,0.25)] backdrop-blur-xl flex flex-col items-center gap-6">
            <div className="flex items-center gap-2 text-fuchsia-300 font-extrabold text-lg sm:text-xl uppercase tracking-widest">
              <Flame className="text-pink-400 animate-bounce" size={22} />
              <span>Cuenta Regresiva para la Fiesta</span>
              <Flame className="text-cyan-400 animate-bounce" size={22} />
            </div>
            <Countdown targetDate={invitation.targetDate} theme="k-pop" />
          </section>

          {/* ─── VENUE SECTION ─── */}
          <section className="flex flex-col gap-4">
            <div className="flex items-center justify-center gap-2 text-purple-300 font-extrabold text-lg sm:text-xl uppercase tracking-wider">
              <Ticket size={22} className="text-pink-400" />
              <span>Ubicación & Coordenadas VIP</span>
            </div>
            <VenueCard
              venue={venueConfig}
              targetDate={invitation.targetDate}
              badgeText={invitation.badgeText}
              slug={invitation.slug}
              theme="k-pop"
            />
          </section>

          {/* ─── GIFTS SECTION (OPTIONAL) ─── */}
          {hasGifts && (
            <section className="flex flex-col gap-4">
              <div className="flex items-center justify-center gap-2 text-purple-300 font-extrabold text-lg sm:text-xl uppercase tracking-wider">
                <span>🎁 Sobre Virtual & Aportes para el Festejo</span>
              </div>
              <GiftCard gift={giftConfig} onChestOpen={handleChestOpen} theme="k-pop" />
            </section>
          )}

          {/* ─── RSVP SECTION ─── */}
          {canShowRsvp ? (
            <section className="flex flex-col gap-4">
              <div className="flex items-center justify-center gap-2 text-purple-300 font-extrabold text-lg sm:text-xl uppercase tracking-wider">
                <Zap size={22} className="text-pink-400" />
                <span>Confirmá tu Entrada a la Fiesta</span>
              </div>
              <RsvpForm
                invitationSlug={invitation.slug}
                personName={invitation.personName}
                allowCompanions={invitation.allowCompanions}
                allowDietary={invitation.allowDietary}
                theme="k-pop"
              />

              {invitation.footerPhrase && (
                <footer className="text-center py-4">
                  <p className="font-extrabold text-base sm:text-xl text-pink-300 bg-white/5 p-5 rounded-2xl border border-pink-500/40 shadow-[0_0_20px_rgba(236,72,153,0.3)] backdrop-blur-md">
                    {invitation.footerPhrase}
                  </p>
                </footer>
              )}
            </section>
          ) : (
            <div className="flex flex-col items-center text-center p-6 bg-black/40 rounded-3xl border border-dashed border-purple-500/50 text-purple-200 backdrop-blur-md shadow-lg gap-2">
              <span className="text-3xl">🔒</span>
              <p className="font-bold text-sm">
                Abrí el cofre en la sección anterior para desbloquear tu confirmación VIP.
              </p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

function DjPartyEnvelopeModal({
  onOpen,
  personName,
  eventNumber,
}: {
  onOpen: () => void;
  personName: string;
  eventNumber?: string;
}) {
  const [isOpening, setIsOpening] = useState(false);
  const [isGone, setIsGone] = useState(false);

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);
    setTimeout(() => {
      setIsGone(true);
      onOpen();
    }, 800);
  };

  if (isGone) return null;

  return (
    <div
      role="dialog"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4"
      style={{
        background: "radial-gradient(circle at center, #250244 0%, #090014 100%)",
        opacity: isOpening ? 0 : 1,
        transform: isOpening ? "scale(0.9)" : "scale(1)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}
    >
      <button
        onClick={handleOpen}
        className="group flex flex-col items-center gap-6 cursor-pointer border-none bg-transparent"
      >
        <div className="relative w-[340px] sm:w-[410px] min-h-[300px] rounded-3xl bg-gradient-to-br from-purple-900/80 via-black/90 to-fuchsia-950/80 border-2 border-purple-400 shadow-[0_0_60px_rgba(168,85,247,0.5)] backdrop-blur-xl flex flex-col items-center justify-between p-6 sm:p-8 text-center transform transition-transform group-hover:scale-105">
          {/* Authentic DJ cut-out peeking */}
          <div className="absolute -top-14 -right-8 w-32 sm:w-44 h-auto pointer-events-none z-20 transform rotate-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/characters/dj_party.jpg"
              alt="DJ Party"
              className="w-full h-auto drop-shadow-[0_15px_30px_rgba(168,85,247,0.8)] rounded-2xl border-2 border-purple-400/60"
            />
          </div>

          {/* Top Badge & Header */}
          <div className="flex flex-col items-center gap-2 w-full pt-1">
            <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-black uppercase text-purple-200 bg-purple-500/25 px-4 py-1.5 rounded-full shadow-sm tracking-widest border border-purple-400/50">
              <Disc className="w-3 h-3 text-fuchsia-400 animate-spin" />
              <span>VIP FESTIVAL PASS</span>
              <Sparkles className="w-3 h-3 text-cyan-400" />
            </div>

            <p className="text-[11px] font-bold text-purple-300 uppercase tracking-widest mt-1">
              Acceso Exclusivo para la Fiesta de
            </p>

            <h2 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-white to-pink-300 leading-tight">
              {personName}
            </h2>
          </div>

          {/* Middle Button */}
          <div className="my-2.5 w-16 h-16 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 border-2 border-white shadow-[0_0_25px_rgba(168,85,247,0.9)] flex flex-col items-center justify-center animate-pulse shrink-0">
            <Radio size={24} className="text-white animate-bounce" />
            <span className="text-[10px] font-black text-white leading-none">
              {eventNumber || "VIP"}
            </span>
          </div>

          {/* Footer CTA */}
          <span className="text-xs font-black text-fuchsia-300 uppercase tracking-wider underline">
            ¡Tocá para activar tu pulsera VIP y entrar! 🪩
          </span>
        </div>
      </button>
    </div>
  );
}

