"use client";

import { useState, useCallback, useEffect } from "react";
import type { InvitationRecord } from "@/lib/schemas/invitation.schema";
import Countdown from "@/components/invitation/Countdown";
import VenueCard from "@/components/invitation/VenueCard";
import GiftCard from "@/components/invitation/GiftCard";
import RsvpForm from "@/components/invitation/RsvpForm";
import AudioController from "@/components/invitation/AudioController";
import { Sparkles, Crown, Award, Star, Dices, ShieldCheck } from "lucide-react";

interface TemplateProps {
  invitation: InvitationRecord;
}

export default function CasinoRoyaleTemplate({ invitation }: TemplateProps) {
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
      {/* ─── CASINO ROYALE VIP ENVELOPE MODAL ─── */}
      {!isOpened && (
        <CasinoRoyaleEnvelopeModal
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
        className="min-h-screen w-full flex flex-col items-center justify-start relative overflow-hidden text-[#FAF5EE]"
        style={{
          background:
            "radial-gradient(ellipse at 50% 25%, #043320 0%, #021E13 50%, #010B07 100%)",
          opacity: isOpened ? 1 : 0,
          transition: "opacity 0.8s ease 0.3s",
        }}
      >
        {/* Emerald & Gold Ambient flares */}
        <div
          aria-hidden="true"
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[550px] rounded-full bg-emerald-600/15 blur-3xl pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute top-1/3 -left-32 w-[600px] h-[600px] rounded-full bg-amber-500/10 blur-3xl pointer-events-none"
        />

        {/* ─── INTEGRATED REAL CASINO VIP WATERMARK IN BACKGROUND ─── */}
        <div
          aria-hidden="true"
          className="absolute top-10 right-0 sm:right-6 md:right-12 w-80 sm:w-[30rem] md:w-[42rem] pointer-events-none z-0 opacity-40 mix-blend-screen select-none filter drop-shadow-[0_0_60px_rgba(16,185,129,0.5)]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/characters/casino_vip.jpg"
            alt=""
            className="w-full h-auto object-cover rounded-3xl"
          />
        </div>

        {/* Art Deco Gold Header Accent Strip */}
        <div
          aria-hidden="true"
          className="w-full h-2 shrink-0 relative z-10"
          style={{
            background:
              "linear-gradient(90deg, #10B981 0%, #D4AF37 25%, #F59E0B 50%, #D4AF37 75%, #10B981 100%)",
            boxShadow: "0 0 25px rgba(212,175,55,0.7)",
          }}
        />

        {/* Floating Suits decorative indicators */}
        <div
          aria-hidden="true"
          className="absolute top-20 left-6 text-emerald-400/20 text-6xl select-none pointer-events-none font-serif hidden sm:block"
        >
          ♠
        </div>
        <div
          aria-hidden="true"
          className="absolute top-44 right-8 text-amber-400/20 text-6xl select-none pointer-events-none font-serif hidden sm:block"
        >
          ♦
        </div>
        <div
          aria-hidden="true"
          className="absolute bottom-60 left-8 text-rose-500/20 text-6xl select-none pointer-events-none font-serif hidden sm:block"
        >
          ♥
        </div>
        <div
          aria-hidden="true"
          className="absolute bottom-96 right-10 text-emerald-300/20 text-6xl select-none pointer-events-none font-serif hidden sm:block"
        >
          ♣
        </div>

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
          {/* ─── HERO SECTION WITH CASINO VIP HERO ELEMENT ─── */}
          <section className="relative flex flex-col items-center gap-5 sm:gap-7 text-center py-4 w-full">
            {/* Casino VIP Hero Cutout */}
            <div className="absolute -bottom-14 -right-4 sm:right-0 md:-right-16 w-44 sm:w-60 md:w-72 pointer-events-none z-20 transition-transform duration-700 hover:scale-105">
              <div className="relative rounded-3xl p-1 bg-gradient-to-tr from-amber-400 via-emerald-400 to-amber-200 shadow-[0_20px_45px_rgba(16,185,129,0.5)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/characters/casino_vip.jpg"
                  alt="Mesa Casino VIP"
                  className="w-full h-auto object-cover rounded-[22px] select-none"
                />
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-black/80 border border-amber-400/60 text-[10px] font-bold text-amber-300 uppercase tracking-widest whitespace-nowrap shadow-lg">
                  ♠ HIGH STAKES VIP ♠
                </div>
              </div>
            </div>

            {/* Casino Royale Gold & Emerald Badge */}
            <div className="inline-flex items-center gap-2.5 px-6 py-2 rounded-full bg-emerald-950/80 border border-emerald-400/60 shadow-[0_0_25px_rgba(16,185,129,0.35)] backdrop-blur-md">
              <Dices size={16} className="text-amber-400" />
              <span className="font-serif tracking-widest text-xs sm:text-sm uppercase text-amber-200">
                ♠ CASINO ROYALE · MONTE CARLO NIGHT ♠
              </span>
              <Dices size={16} className="text-amber-400" />
            </div>

            {/* Date Badge */}
            {invitation.badgeText && (
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-black/60 border border-amber-400/40 text-amber-300 text-xs sm:text-sm font-medium tracking-wide">
                <Sparkles size={14} className="text-amber-400" />
                <span>{invitation.badgeText}</span>
              </div>
            )}

            {/* Main Headline */}
            <h1
              className="font-serif font-bold tracking-tight text-transparent bg-clip-text"
              style={{
                fontSize: "clamp(2.5rem, 8vw, 5.5rem)",
                lineHeight: 1.05,
                backgroundImage:
                  "linear-gradient(135deg, #FAF5EE 0%, #F5E6A3 40%, #D4AF37 70%, #10B981 100%)",
                filter: "drop-shadow(0 4px 20px rgba(212,175,55,0.4))",
              }}
            >
              {invitation.headline}
            </h1>

            {/* Golden Anniversary Number */}
            {invitation.eventNumber && (
              <div className="relative my-2">
                <div
                  className="font-cormorant font-bold px-10 py-2 rounded-3xl border border-amber-400/60 shadow-[0_0_40px_rgba(212,175,55,0.35)]"
                  style={{
                    fontSize: "clamp(4.5rem, 16vw, 8rem)",
                    lineHeight: 1,
                    background: "rgba(16, 185, 129, 0.12)",
                    color: "#F5E6A3",
                    textShadow: "0 0 25px rgba(212, 175, 55, 0.8)",
                  }}
                >
                  {invitation.eventNumber}
                </div>
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 via-emerald-500 to-yellow-500 text-slate-950 font-black px-4 py-0.5 rounded-full text-[11px] uppercase tracking-widest shadow-md">
                  ★ VIP BLACK TIE GALA ★
                </div>
              </div>
            )}

            {/* Subheadline */}
            <p className="font-serif text-base sm:text-lg text-emerald-100/90 max-w-lg leading-relaxed bg-black/60 p-4 rounded-2xl border border-emerald-500/30 backdrop-blur-md">
              {invitation.subheadline}
            </p>
          </section>

          {/* ─── COUNTDOWN SECTION ─── */}
          <section className="bg-black/60 rounded-3xl p-6 sm:p-10 border border-emerald-500/40 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl flex flex-col items-center gap-6">
            <div className="flex items-center gap-2 text-amber-300 font-serif text-lg sm:text-xl uppercase tracking-widest text-center">
              <Dices className="text-amber-400" size={22} />
              <span>Apertura de Mesas · Cuenta Regresiva</span>
              <Dices className="text-amber-400" size={22} />
            </div>
            <Countdown targetDate={invitation.targetDate} theme="boda-clasica" />
          </section>

          {/* ─── VENUE SECTION ─── */}
          <section className="flex flex-col gap-4">
            <div className="flex items-center justify-center gap-2 text-amber-300 font-serif text-lg sm:text-xl uppercase tracking-wider">
              <Crown size={22} className="text-amber-400" />
              <span>Sede del Casino & Recepción de Gala</span>
            </div>
            <VenueCard
              venue={venueConfig}
              targetDate={invitation.targetDate}
              badgeText={invitation.badgeText}
              slug={invitation.slug}
              theme="boda-clasica"
            />
          </section>

          {/* ─── GIFTS SECTION (OPTIONAL) ─── */}
          {hasGifts && (
            <section className="flex flex-col gap-4">
              <div className="flex items-center justify-center gap-2 text-amber-300 font-serif text-lg sm:text-xl uppercase tracking-wider">
                <span>🎁 Cofre de Apuestas & Datos Bancarios</span>
              </div>
              <GiftCard gift={giftConfig} onChestOpen={handleChestOpen} theme="boda-clasica" />
            </section>
          )}

          {/* ─── RSVP SECTION ─── */}
          {canShowRsvp ? (
            <section className="flex flex-col gap-4">
              <div className="flex items-center justify-center gap-2 text-amber-300 font-serif text-lg sm:text-xl uppercase tracking-wider">
                <Award size={22} className="text-amber-400" />
                <span>Confirmación de Asistencia (Dress Code: Black Tie)</span>
              </div>
              <RsvpForm
                invitationSlug={invitation.slug}
                personName={invitation.personName}
                allowCompanions={invitation.allowCompanions}
                allowDietary={invitation.allowDietary}
                theme="boda-clasica"
              />

              {invitation.footerPhrase && (
                <footer className="text-center py-4">
                  <p className="font-cormorant text-xl sm:text-2xl text-amber-200 bg-black/60 p-5 rounded-2xl border border-emerald-500/30 shadow-xl backdrop-blur-md">
                    {invitation.footerPhrase}
                  </p>
                </footer>
              )}
            </section>
          ) : (
            <div className="text-center py-6 px-4 bg-emerald-950/40 rounded-2xl border border-dashed border-emerald-500/40 text-emerald-200/80 text-sm">
              Toca el cofre de obsequios arriba para desbloquear tu formulario de confirmación VIP.
            </div>
          )}
        </div>
      </main>
    </>
  );
}

// ─── CASINO ROYALE VIP OPENING ENVELOPE MODAL ───
interface CasinoRoyaleEnvelopeModalProps {
  onOpen: () => void;
  personName: string;
  eventNumber?: string;
}

function CasinoRoyaleEnvelopeModal({
  onOpen,
  personName,
  eventNumber,
}: CasinoRoyaleEnvelopeModalProps) {
  const [opening, setOpening] = useState(false);

  const handleClick = () => {
    setOpening(true);
    setTimeout(() => {
      onOpen();
    }, 700);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Invitación Casino Royale VIP"
      className={`fixed inset-0 z-50 flex items-center justify-center px-4 bg-[#010905]/95 backdrop-blur-xl transition-all duration-700 ${
        opening ? "opacity-0 pointer-events-none scale-105" : "opacity-100"
      }`}
    >
      <div className="relative w-full max-w-md bg-gradient-to-b from-[#063321] via-[#032015] to-[#010D08] rounded-3xl border-2 border-amber-400/60 shadow-[0_0_80px_rgba(16,185,129,0.35)] p-8 text-center flex flex-col items-center gap-6 overflow-hidden">
        {/* Golden Art Deco corner accents */}
        <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-amber-400/80 rounded-tl-3xl pointer-events-none" />
        <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-amber-400/80 rounded-tr-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-amber-400/80 rounded-bl-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-amber-400/80 rounded-br-3xl pointer-events-none" />

        {/* Ambient Roulette background preview inside modal */}
        <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/characters/casino_vip.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        {/* Top VIP Label */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/90 border border-amber-400/50 shadow-md">
          <ShieldCheck size={14} className="text-amber-400" />
          <span className="text-[11px] font-serif uppercase tracking-widest text-amber-200">
            PASE VIP EXCLUSIVO · ACCESO BLACK TIE
          </span>
        </div>

        {/* Center Golden Casino Chip Icon */}
        <div className="relative my-2">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-amber-600 via-yellow-400 to-amber-700 p-1 shadow-[0_0_35px_rgba(212,175,55,0.7)] flex items-center justify-center animate-pulse">
            <div className="w-full h-full rounded-full bg-[#021F14] border-2 border-dashed border-amber-300 flex flex-col items-center justify-center text-amber-300">
              <span className="text-2xl font-serif">♠</span>
              <span className="text-[10px] font-black tracking-widest uppercase">VIP</span>
            </div>
          </div>
        </div>

        <div>
          <h2 className="font-serif text-3xl font-bold text-amber-100 tracking-wide drop-shadow-md">
            CASINO ROYALE
          </h2>
          <p className="font-serif text-emerald-200/90 text-sm mt-1">
            Una noche de gala, azar y alta etiqueta para celebrar los{" "}
            <span className="text-amber-300 font-bold">{eventNumber || ""}</span> de{" "}
            <span className="text-amber-300 font-bold">{personName}</span>
          </p>
        </div>

        <button
          type="button"
          onClick={handleClick}
          className="relative group overflow-hidden px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-emerald-500 to-yellow-500 text-slate-950 font-black text-sm uppercase tracking-widest shadow-[0_10px_30px_rgba(212,175,55,0.4)] hover:scale-105 active:scale-95 transition-all duration-300"
        >
          <span className="relative z-10 flex items-center gap-2">
            <Star size={16} className="fill-slate-950 text-slate-950" />
            ABRIR INVITACIÓN DE GALA
            <Star size={16} className="fill-slate-950 text-slate-950" />
          </span>
        </button>

        <p className="text-[11px] text-emerald-300/60 uppercase tracking-widest">
          Monte Carlo Grand Gala · Código de Vestimenta: Black Tie
        </p>
      </div>
    </div>
  );
}

