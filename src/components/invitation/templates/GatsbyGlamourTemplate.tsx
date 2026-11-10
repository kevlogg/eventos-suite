"use client";

import { useState, useCallback, useEffect } from "react";
import type { InvitationRecord } from "@/lib/schemas/invitation.schema";
import Countdown from "@/components/invitation/Countdown";
import VenueCard from "@/components/invitation/VenueCard";
import GiftCard from "@/components/invitation/GiftCard";
import RsvpForm from "@/components/invitation/RsvpForm";
import AudioController from "@/components/invitation/AudioController";
import { Sparkles, Wine, GlassWater, Crown, Award, Star } from "lucide-react";

interface TemplateProps {
  invitation: InvitationRecord;
}

export default function GatsbyGlamourTemplate({ invitation }: TemplateProps) {
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
      {/* ─── GATSBY GOLDEN ENVELOPE MODAL ─── */}
      {!isOpened && (
        <GatsbyEnvelopeModal
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
            "radial-gradient(ellipse at 50% 20%, #1A150A 0%, #0D0A05 45%, #050402 100%)",
          opacity: isOpened ? 1 : 0,
          transition: "opacity 0.8s ease 0.3s",
        }}
      >
        {/* Golden ambient lighting */}
        <div
          aria-hidden="true"
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-amber-500/15 blur-3xl pointer-events-none"
        />

        {/* ─── INTEGRATED REAL GATSBY CHARACTER IN BACKGROUND ─── */}
        <div
          aria-hidden="true"
          className="absolute top-8 right-0 sm:right-6 md:right-16 w-80 sm:w-[28rem] md:w-[38rem] pointer-events-none z-0 opacity-40 mix-blend-screen select-none filter drop-shadow-[0_0_60px_rgba(212,175,55,0.6)]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/characters/gatsby.png"
            alt=""
            className="w-full h-auto object-contain rounded-3xl"
          />
        </div>

        {/* Vintage Art Deco corner borders */}
        <div
          aria-hidden="true"
          className="w-full h-2 shrink-0 relative z-10"
          style={{
            background:
              "linear-gradient(90deg, #D4AF37 0%, #F5E6A3 25%, #997A15 50%, #F5E6A3 75%, #D4AF37 100%)",
            boxShadow: "0 0 20px rgba(212,175,55,0.6)",
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
          {/* ─── HERO SECTION WITH REAL GATSBY CUTOUT ─── */}
          <section className="relative flex flex-col items-center gap-5 sm:gap-7 text-center py-4 w-full">
            {/* Gatsby Toast Hero Cutout */}
            <div className="absolute -bottom-16 -right-6 sm:right-0 md:-right-20 w-44 sm:w-64 md:w-80 pointer-events-none z-20 transition-transform duration-700 hover:scale-105">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/characters/gatsby.png"
                alt="Gran Gatsby Toast"
                className="w-full h-auto drop-shadow-[0_20px_45px_rgba(212,175,55,0.7)] select-none rounded-3xl border border-amber-400/40"
              />
            </div>

            {/* Art Deco Gold Header Tag */}
            <div className="inline-flex items-center gap-2.5 px-6 py-2 rounded-full bg-amber-500/10 border border-amber-400/50 shadow-[0_0_25px_rgba(212,175,55,0.3)] backdrop-blur-md">
              <Sparkles size={16} className="text-amber-400" />
              <span className="font-serif tracking-widest text-xs sm:text-sm uppercase text-amber-200">
                ✦ ROARING TWENTIES · GALA NIGHT ✦
              </span>
              <Sparkles size={16} className="text-amber-400" />
            </div>

            {/* Date Badge */}
            {invitation.badgeText && (
              <div className="inline-flex items-center justify-center px-6 py-2.5 rounded-2xl bg-black/40 border border-amber-400/30 backdrop-blur-md text-amber-300 font-serif text-xs sm:text-sm tracking-wider shadow-md">
                <span>{invitation.badgeText}</span>
              </div>
            )}

            {/* Main Headline */}
            <h1
              className="font-cormorant font-bold tracking-wider leading-tight uppercase"
              style={{
                fontSize: "clamp(2.8rem, 9.5vw, 5.5rem)",
                background:
                  "linear-gradient(135deg, #FFFFFF 0%, #F5E6A3 30%, #D4AF37 60%, #AA820A 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 4px 18px rgba(212,175,55,0.5))",
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
                    background: "rgba(212, 175, 55, 0.08)",
                    color: "#F5E6A3",
                    textShadow: "0 0 20px rgba(212, 175, 55, 0.7)",
                  }}
                >
                  {invitation.eventNumber}
                </div>
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-600 to-yellow-500 text-slate-950 font-black px-4 py-0.5 rounded-full text-[11px] uppercase tracking-widest shadow-md">
                  ★ SPECIAL CELEBRATION ★
                </div>
              </div>
            )}

            {/* Subheadline */}
            <p className="font-serif text-base sm:text-lg text-amber-100 max-w-lg leading-relaxed bg-black/40 p-4 rounded-2xl border border-amber-500/20 backdrop-blur-md">
              {invitation.subheadline}
            </p>
          </section>

          {/* ─── COUNTDOWN SECTION ─── */}
          <section className="bg-black/60 rounded-3xl p-6 sm:p-10 border border-amber-500/40 shadow-[0_20px_50px_rgba(0,0,0,0.7)] backdrop-blur-xl flex flex-col items-center gap-6">
            <div className="flex items-center gap-2 text-amber-300 font-serif text-lg sm:text-xl uppercase tracking-widest">
              <Wine className="text-amber-400" size={22} />
              <span>Cuenta Regresiva para la Noche de Gala</span>
              <Wine className="text-amber-400" size={22} />
            </div>
            <Countdown targetDate={invitation.targetDate} theme="boda-clasica" />
          </section>

          {/* ─── VENUE SECTION ─── */}
          <section className="flex flex-col gap-4">
            <div className="flex items-center justify-center gap-2 text-amber-300 font-serif text-lg sm:text-xl uppercase tracking-wider">
              <Crown size={22} className="text-amber-400" />
              <span>Salón & Coordenadas de Gala</span>
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
                <span>🎁 Sobre de Regalo & Datos de Transferencia</span>
              </div>
              <GiftCard gift={giftConfig} onChestOpen={handleChestOpen} theme="boda-clasica" />
            </section>
          )}

          {/* ─── RSVP SECTION ─── */}
          {canShowRsvp ? (
            <section className="flex flex-col gap-4">
              <div className="flex items-center justify-center gap-2 text-amber-300 font-serif text-lg sm:text-xl uppercase tracking-wider">
                <Award size={22} className="text-amber-400" />
                <span>Confirmación de Asistencia (Black Tie)</span>
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
                  <p className="font-cormorant text-xl sm:text-2xl text-amber-200 bg-black/60 p-5 rounded-2xl border border-amber-500/30 shadow-xl backdrop-blur-md">
                    {invitation.footerPhrase}
                  </p>
                </footer>
              )}
            </section>
          ) : (
            <div className="flex flex-col items-center text-center p-6 bg-black/60 rounded-3xl border border-dashed border-amber-500/40 text-amber-200 backdrop-blur-md shadow-lg gap-2">
              <span className="text-3xl">🔒</span>
              <p className="font-serif text-sm">
                Abrí el cofre en la sección anterior para confirmar tu lugar en la noche de gala.
              </p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

function GatsbyEnvelopeModal({
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
        background: "radial-gradient(circle at center, #1F190B 0%, #0A0A0A 100%)",
        opacity: isOpening ? 0 : 1,
        transform: isOpening ? "scale(0.9)" : "scale(1)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}
    >
      <button
        onClick={handleOpen}
        className="group flex flex-col items-center gap-6 cursor-pointer border-none bg-transparent"
      >
        <div className="relative w-[340px] sm:w-[410px] min-h-[300px] rounded-3xl bg-gradient-to-br from-[#1A150A] via-[#0D0A05] to-[#151006] border-2 border-amber-400 shadow-[0_0_60px_rgba(212,175,55,0.4)] backdrop-blur-xl flex flex-col items-center justify-between p-6 sm:p-8 text-center transform transition-transform group-hover:scale-105">
          {/* Authentic Gatsby toast cut-out peeking */}
          <div className="absolute -top-14 -right-8 w-32 sm:w-44 h-auto pointer-events-none z-20 transform rotate-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/characters/gatsby.png"
              alt="Gatsby"
              className="w-full h-auto drop-shadow-[0_15px_30px_rgba(212,175,55,0.7)] rounded-2xl border-2 border-amber-400/60"
            />
          </div>

          {/* Top Badge & Header */}
          <div className="flex flex-col items-center gap-2 w-full pt-1">
            <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-serif uppercase text-amber-200 bg-amber-500/20 px-4 py-1.5 rounded-full shadow-sm tracking-widest border border-amber-400/40">
              <Crown className="w-3 h-3 text-amber-300" />
              <span>EXCLUSIVE GALA INVITATION</span>
              <Sparkles className="w-3 h-3 text-amber-300" />
            </div>

            <p className="text-[11px] font-serif text-amber-300 uppercase tracking-widest mt-1">
              Celebración de Gala en Honor a
            </p>

            <h2 className="text-3xl sm:text-4xl font-cormorant font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-white to-amber-300 leading-tight">
              {personName}
            </h2>
          </div>

          {/* Middle Button */}
          <div className="my-2.5 w-16 h-16 rounded-full bg-gradient-to-tr from-amber-600 via-yellow-500 to-amber-700 border-2 border-white shadow-[0_0_25px_rgba(212,175,55,0.8)] flex flex-col items-center justify-center animate-pulse shrink-0">
            <Wine size={24} className="text-slate-950 animate-bounce" />
            <span className="text-[10px] font-black text-slate-950 leading-none">
              {eventNumber || "✦"}
            </span>
          </div>

          {/* Footer CTA */}
          <span className="text-xs font-serif text-amber-300 uppercase tracking-widest underline">
            ¡Hacé clic para brindar y abrir la invitación! 🥂
          </span>
        </div>
      </button>
    </div>
  );
}

