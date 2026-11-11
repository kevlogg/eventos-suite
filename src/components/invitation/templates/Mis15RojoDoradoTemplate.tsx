"use client";

import { useState, useCallback, useEffect } from "react";
import type { InvitationRecord } from "@/lib/schemas/invitation.schema";
import Countdown from "@/components/invitation/Countdown";
import VenueCard from "@/components/invitation/VenueCard";
import GiftCard from "@/components/invitation/GiftCard";
import RsvpForm from "@/components/invitation/RsvpForm";
import AudioController from "@/components/invitation/AudioController";
import PhotoCarousel, { parseCarouselSlides } from "@/components/invitation/PhotoCarousel";
import { Sparkles, Crown, Heart, Star, Music, Clock, Shirt, GlassWater } from "lucide-react";

interface TemplateProps {
  invitation: InvitationRecord;
}

export default function Mis15RojoDoradoTemplate({ invitation }: TemplateProps) {
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

  const itinerarySteps = [
    {
      time: "21:00 hs",
      title: "Recepción Real",
      desc: "Copa de bienvenida, fotos en el photocall y encuentro con amigos y familia.",
      icon: GlassWater,
    },
    {
      time: "22:30 hs",
      title: "Entrada Triunfal & Vals",
      desc: "El momento más esperado de la noche, apertura de pista y el vals con papá.",
      icon: Crown,
    },
    {
      time: "23:30 hs",
      title: "Cena & Brindis de Honor",
      desc: "Banquete especial, proyección del video emotivo y brindis por mis 15.",
      icon: Heart,
    },
    {
      time: "01:00 hs",
      title: "Pista de Baile & Shows",
      desc: "Apertura total de la fiesta con DJ, luces, sorpresas y toda la música.",
      icon: Music,
    },
    {
      time: "04:00 hs",
      title: "Carnaval Carioca & Despedida",
      desc: "Cotillón luminoso, snacks de trasnoche y el cierre de una noche inolvidable.",
      icon: Sparkles,
    },
  ];

  return (
    <>
      {/* ─── ROYAL VELVET & GOLD WAX SEAL ENVELOPE MODAL ─── */}
      {!isOpened && (
        <Mis15EnvelopeModal
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
            "radial-gradient(ellipse at 50% 15%, #420202 0%, #200101 40%, #0D0000 80%, #050000 100%)",
          opacity: isOpened ? 1 : 0,
          transition: "opacity 0.8s ease 0.3s",
        }}
      >
        {/* Ambient Ruby & Gold Glow */}
        <div
          aria-hidden="true"
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[850px] h-[550px] rounded-full bg-red-600/15 blur-3xl pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-amber-500/10 blur-3xl pointer-events-none"
        />

        {/* ─── GOLD FILIGREE CORNER DECORATIONS ─── */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none overflow-hidden select-none"
        >
          {/* Top-left gold filigree */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/wedding/gold-filigree.jpg"
            alt=""
            className="absolute -top-14 -left-14 sm:-top-20 sm:-left-20 w-72 sm:w-96 md:w-[460px] max-w-none object-contain pointer-events-none mix-blend-screen opacity-30 transform rotate-6"
          />

          {/* Top-right gold filigree */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/wedding/gold-filigree.jpg"
            alt=""
            className="absolute -top-14 -right-14 sm:-top-20 sm:-right-20 w-72 sm:w-96 md:w-[460px] max-w-none object-contain pointer-events-none mix-blend-screen opacity-30 transform -scale-x-100 -rotate-6"
          />

          {/* Mid floating tiara in background */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/characters/quinceanera_tiara.jpg"
            alt=""
            className="absolute top-20 right-0 sm:right-6 md:right-12 w-64 sm:w-80 md:w-96 pointer-events-none mix-blend-screen opacity-35 select-none filter drop-shadow-[0_0_50px_rgba(212,175,55,0.4)]"
          />
        </div>

        {/* Top Gold Foil Bar */}
        <div
          aria-hidden="true"
          className="w-full h-2.5 shrink-0 relative z-10"
          style={{
            background:
              "linear-gradient(90deg, #D4AF37 0%, #F5E6A3 25%, #997A15 50%, #F5E6A3 75%, #D4AF37 100%)",
            boxShadow: "0 0 25px rgba(212,175,55,0.7)",
          }}
        />

        <div
          className="max-w-3xl w-full mx-auto flex flex-col gap-14 sm:gap-20 relative z-10"
          style={{
            paddingLeft: "clamp(1.25rem, 5vw, 2.5rem)",
            paddingRight: "clamp(1.25rem, 5vw, 2.5rem)",
            paddingTop: "clamp(2.5rem, 6vw, 4.5rem)",
            paddingBottom: "clamp(4rem, 8vw, 7rem)",
            boxSizing: "border-box",
          }}
        >
          {/* ─── HERO SECTION ─── */}
          <section className="relative flex flex-col items-center gap-5 sm:gap-7 text-center py-4 w-full">
            {/* Tiara Emblem */}
            <div className="relative w-28 sm:w-36 md:w-44 mb-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/characters/quinceanera_tiara.jpg"
                alt="Tiara Real de 15 Años"
                className="w-full h-auto object-contain mix-blend-screen filter drop-shadow-[0_0_30px_rgba(212,175,55,0.7)] animate-float"
              />
            </div>

            {/* Royal Tag */}
            <div className="inline-flex items-center gap-2.5 px-6 py-2 rounded-full bg-gradient-to-r from-[#3D0308]/90 via-[#4A0404]/90 to-[#3D0308]/90 border border-[#D4AF37]/60 shadow-[0_0_25px_rgba(212,175,55,0.35)] backdrop-blur-md">
              <Sparkles size={16} className="text-[#D4AF37]" />
              <span className="font-serif tracking-widest text-xs sm:text-sm uppercase text-[#F5E6A3]">
                ✦ MIS 15 AÑOS · GALA REAL ✦
              </span>
              <Sparkles size={16} className="text-[#D4AF37]" />
            </div>

            {/* Date Badge */}
            {invitation.badgeText && (
              <div className="inline-flex items-center justify-center px-6 py-2.5 rounded-2xl bg-black/50 border border-[#D4AF37]/40 backdrop-blur-md text-[#F5E6A3] font-serif text-xs sm:text-sm tracking-wider shadow-md">
                <span>{invitation.badgeText}</span>
              </div>
            )}

            {/* Main Headline */}
            <p className="font-serif text-xs sm:text-sm uppercase tracking-[0.35em] text-[#D4AF37] font-semibold">
              {invitation.headline || "MIS QUINCE AÑOS"}
            </p>

            {/* Celebrated Person Name */}
            <h1
              className="font-cormorant font-bold tracking-wider leading-tight"
              style={{
                fontSize: "clamp(3.2rem, 11vw, 6.2rem)",
                background:
                  "linear-gradient(135deg, #FFFFFF 0%, #F5E6A3 30%, #D4AF37 65%, #AA820A 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 4px 22px rgba(212,175,55,0.6))",
              }}
            >
              {invitation.personName}
            </h1>

            {/* Golden 15 Number Badge */}
            <div className="relative my-2">
              <div
                className="font-cormorant font-bold px-10 py-2 rounded-3xl border-2 border-[#D4AF37]/60 shadow-[0_0_40px_rgba(212,175,55,0.4)]"
                style={{
                  fontSize: "clamp(4.8rem, 18vw, 8.5rem)",
                  lineHeight: 1,
                  background: "radial-gradient(circle, rgba(74,4,4,0.6) 0%, rgba(20,1,1,0.8) 100%)",
                  color: "#F5E6A3",
                  textShadow: "0 0 25px rgba(212, 175, 55, 0.8)",
                }}
              >
                {invitation.eventNumber || "15"}
              </div>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#D4AF37] via-[#F5E6A3] to-[#D4AF37] text-slate-950 font-black px-5 py-1 rounded-full text-[11px] sm:text-xs uppercase tracking-widest shadow-lg flex items-center gap-1.5 whitespace-nowrap">
                <Crown size={13} className="text-black" />
                <span>MIS 15 AÑOS</span>
                <Crown size={13} className="text-black" />
              </div>
            </div>

            {/* Subheadline / Emotional Phrase */}
            <p className="font-serif text-base sm:text-lg text-[#F5E6A3]/90 max-w-lg leading-relaxed bg-gradient-to-b from-[#2A0307]/80 to-[#150002]/90 p-5 rounded-2xl border border-[#D4AF37]/35 shadow-xl backdrop-blur-md mt-2">
              {invitation.subheadline}
            </p>
          </section>

          {/* ─── COUNTDOWN SECTION ─── */}
          <section className="bg-gradient-to-b from-[#2A0307]/90 via-[#180103]/95 to-[#100002] rounded-3xl p-6 sm:p-10 border-2 border-[#D4AF37]/50 shadow-[0_20px_50px_rgba(0,0,0,0.7)] backdrop-blur-xl flex flex-col items-center gap-6">
            <div className="flex items-center gap-2 text-[#D4AF37] font-serif text-lg sm:text-xl uppercase tracking-widest text-center">
              <Crown size={22} className="text-[#D4AF37] shrink-0" />
              <span>Cuenta Regresiva para la Noche Mágica</span>
              <Crown size={22} className="text-[#D4AF37] shrink-0" />
            </div>
            <Countdown targetDate={invitation.targetDate} theme="mis-15-rojo-dorado" />
          </section>

          {/* ─── ITINERARIO / MOMENTOS MÁGICOS ─── */}
          <section className="bg-gradient-to-b from-[#2A0307]/85 to-[#120002]/95 rounded-3xl p-6 sm:p-10 border-2 border-[#D4AF37]/45 shadow-[0_20px_50px_rgba(0,0,0,0.7)] backdrop-blur-xl flex flex-col gap-8">
            <div className="flex flex-col items-center text-center gap-2">
              <div className="inline-flex items-center gap-2 text-xs font-serif uppercase tracking-widest text-[#D4AF37]">
                <Clock size={16} />
                <span>Cronograma del Festejo</span>
              </div>
              <h2 className="font-serif font-bold text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-[#F5E6A3] via-[#FAF5EE] to-[#D4AF37]">
                Momentos Mágicos
              </h2>
              <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mt-1" />
            </div>

            <div className="flex flex-col gap-4">
              {itinerarySteps.map((step, idx) => {
                const IconComponent = step.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-start gap-4 p-4 sm:p-5 rounded-2xl bg-black/40 border border-[#D4AF37]/30 hover:border-[#D4AF37]/60 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#8C0010] flex items-center justify-center text-white shrink-0 shadow-md">
                      <IconComponent size={22} />
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#F5E6A3]">
                          {step.time}
                        </span>
                        <h3 className="font-serif font-bold text-lg text-[#FAF5EE]">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm text-[#FAF5EE]/75 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ─── DRESS CODE SECTION ─── */}
          <section className="bg-gradient-to-br from-[#2A0307]/90 via-[#1A0103]/95 to-[#100002] rounded-3xl p-6 sm:p-8 border-2 border-[#D4AF37]/50 shadow-xl flex flex-col items-center text-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#9B111E] via-[#D4AF37] to-[#F5E6A3] flex items-center justify-center text-black shadow-lg">
              <Shirt size={28} />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-serif uppercase tracking-widest text-[#D4AF37]">
                Código de Vestimenta
              </span>
              <h3 className="font-serif font-bold text-2xl text-[#FAF5EE]">
                Gala / Elegante
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#FAF5EE]/80 max-w-md leading-relaxed">
              Traje oscuro o vestido de fiesta para celebrar esta gran noche.
            </p>
            <div className="px-5 py-2 rounded-full bg-[#4A0404]/60 border border-[#D4AF37]/40 text-[#F5E6A3] text-xs font-serif tracking-wider shadow-inner">
              ✦ Detalle especial: El color rojo está reservado para la quinceañera ✨
            </div>
          </section>

          {/* ─── PHOTO CAROUSEL (IF IMAGES PROVIDED) ─── */}
          {invitation.carouselImages && (
            <section className="bg-gradient-to-b from-[#2A0307]/90 to-[#100002] rounded-3xl p-6 sm:p-10 border-2 border-[#D4AF37]/50 shadow-[0_20px_50px_rgba(0,0,0,0.7)] backdrop-blur-xl flex flex-col items-center gap-6">
              <div className="flex flex-col items-center text-center gap-2">
                <span className="text-xs font-serif uppercase tracking-widest text-[#D4AF37]">
                  Sesión de Fotos
                </span>
                <h2 className="font-serif font-bold text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-[#F5E6A3] via-[#FAF5EE] to-[#D4AF37]">
                  Mis Recuerdos
                </h2>
                <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mt-1" />
              </div>
              <PhotoCarousel
                slides={parseCarouselSlides(invitation.carouselImages)}
                theme="mis-15-rojo-dorado"
                showHeading={false}
              />
            </section>
          )}

          {/* ─── VENUE SECTION ─── */}
          <section className="flex flex-col gap-4">
            <div className="flex items-center justify-center gap-2 text-[#D4AF37] font-serif text-lg sm:text-xl uppercase tracking-wider">
              <Crown size={22} className="text-[#D4AF37]" />
              <span>Salón & Coordenadas de Gala</span>
            </div>
            <VenueCard
              venue={venueConfig}
              targetDate={invitation.targetDate}
              badgeText={invitation.badgeText}
              slug={invitation.slug}
              theme="mis-15-rojo-dorado"
            />
          </section>

          {/* ─── GIFTS SECTION (OPTIONAL) ─── */}
          {hasGifts && (
            <section className="flex flex-col gap-4">
              <div className="flex items-center justify-center gap-2 text-[#D4AF37] font-serif text-lg sm:text-xl uppercase tracking-wider">
                <span>🎁 Cofre de Regalos & Transferencia</span>
              </div>
              <GiftCard gift={giftConfig} onChestOpen={handleChestOpen} theme="mis-15-rojo-dorado" />
            </section>
          )}

          {/* ─── RSVP SECTION ─── */}
          {canShowRsvp ? (
            <section className="flex flex-col gap-4">
              <div className="flex items-center justify-center gap-2 text-[#D4AF37] font-serif text-lg sm:text-xl uppercase tracking-wider">
                <Star size={22} className="text-[#D4AF37]" />
                <span>Confirmación de Asistencia</span>
              </div>
              <RsvpForm
                invitationSlug={invitation.slug}
                personName={invitation.personName}
                allowCompanions={invitation.allowCompanions}
                allowDietary={invitation.allowDietary}
                theme="mis-15-rojo-dorado"
              />

              {invitation.footerPhrase && (
                <footer className="text-center py-6">
                  <p className="font-cormorant text-xl sm:text-2xl text-[#F5E6A3] bg-gradient-to-b from-[#2A0307]/80 to-[#100002]/90 p-6 rounded-2xl border border-[#D4AF37]/40 shadow-xl backdrop-blur-md leading-relaxed">
                    “{invitation.footerPhrase}”
                  </p>
                  <p className="font-serif text-xs text-[#D4AF37] uppercase tracking-widest mt-4">
                    Te espero para vivir una noche inolvidable ❤️
                  </p>
                </footer>
              )}
            </section>
          ) : (
            <div className="flex flex-col items-center text-center p-6 bg-gradient-to-b from-[#2A0307]/80 to-[#100002]/90 rounded-3xl border border-dashed border-[#D4AF37]/50 text-[#F5E6A3] backdrop-blur-md shadow-lg gap-2">
              <span className="text-3xl">🔒</span>
              <p className="font-serif text-sm">
                Abrí el cofre en la sección anterior para confirmar tu lugar en la fiesta de 15.
              </p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

function Mis15EnvelopeModal({
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
      aria-modal="true"
      aria-label={`Invitación de 15 años de ${personName}`}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4"
      style={{
        background: "radial-gradient(circle at center, #260105 0%, #0D0001 60%, #000000 100%)",
        opacity: isOpening ? 0 : 1,
        transform: isOpening ? "scale(0.92)" : "scale(1)",
        transition: "opacity 0.75s ease, transform 0.75s ease",
      }}
    >
      <button
        onClick={handleOpen}
        className="group flex flex-col items-center gap-6 cursor-pointer border-none bg-transparent"
        aria-label="Abrir invitación de 15 años"
      >
        <div className="relative w-[340px] sm:w-[420px] min-h-[340px] rounded-3xl bg-gradient-to-br from-[#3D0308] via-[#200103] to-[#120002] border-2 border-[#D4AF37] shadow-[0_0_60px_rgba(212,175,55,0.45)] backdrop-blur-xl flex flex-col items-center justify-between p-6 sm:p-8 text-center transform transition-transform group-hover:scale-105">
          {/* Ornate Tiara Peeking from top */}
          <div className="absolute -top-16 -right-6 sm:-right-8 w-32 sm:w-40 h-auto pointer-events-none z-20 transform rotate-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/characters/quinceanera_tiara.jpg"
              alt="Tiara"
              className="w-full h-auto mix-blend-screen drop-shadow-[0_15px_30px_rgba(212,175,55,0.8)] filter"
            />
          </div>

          {/* Top Badge & Header */}
          <div className="flex flex-col items-center gap-2 w-full pt-1">
            <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-serif uppercase text-[#F5E6A3] bg-[#4A0404]/80 px-4 py-1.5 rounded-full shadow-sm tracking-widest border border-[#D4AF37]/50">
              <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>INVITACIÓN REAL · MIS 15</span>
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            </div>

            <p className="text-[11px] font-serif text-[#D4AF37] uppercase tracking-widest mt-2">
              Tengo el honor de invitarte a mis
            </p>

            <h2 className="text-3xl sm:text-4xl font-cormorant font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#F5E6A3] via-[#FFFFFF] to-[#D4AF37] leading-tight">
              {personName}
            </h2>
          </div>

          {/* Golden Wax Seal */}
          <div className="my-3.5 relative flex flex-col items-center justify-center">
            {/* Pulsing Aura */}
            <div className="absolute inset-0 rounded-full bg-[#D4AF37]/30 blur-md animate-ping" />
            <div className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-[#8C0010] via-[#D4AF37] to-[#F5E6A3] border-3 border-white/80 shadow-[0_0_30px_rgba(212,175,55,0.9)] flex flex-col items-center justify-center shrink-0">
              <Crown size={20} className="text-black mb-0.5" />
              <span className="text-sm font-black text-black leading-none font-cormorant">
                {eventNumber || "15"}
              </span>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="flex flex-col items-center gap-1">
            <span className="text-xs font-serif text-[#F5E6A3] uppercase tracking-wider">
              Toca el sello dorado para abrir la invitación 👑
            </span>
            <span className="text-[11px] text-[#D4AF37]/75 font-serif italic">
              Una noche soñada nos espera
            </span>
          </div>
        </div>
      </button>
    </div>
  );
}

