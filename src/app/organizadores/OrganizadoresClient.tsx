"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import QRCode from "qrcode";
import {
  PartyPopper,
  Trophy,
  Camera,
  CheckCircle2,
  Tv,
  Smartphone,
  Shield,
  ArrowRight,
  ExternalLink,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Percent,
  Layers,
  Zap,
  Gift,
  Download,
  Calendar,
  Check,
  HelpCircle,
  TrendingUp,
  Flame,
  Clock,
  Sliders,
  DollarSign,
  Crown,
} from "lucide-react";

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

export default function OrganizadoresClient() {
  const [origin, setOrigin] = useState("");
  const [qrInvitacion, setQrInvitacion] = useState<string | null>(null);
  const [qrTrivia, setQrTrivia] = useState<string | null>(null);
  const [qrFotos, setQrFotos] = useState<string | null>(null);

  // UX Interactive States
  const [activeStepTab, setActiveStepTab] = useState<"invitacion" | "trivia" | "fotos" | "salon">("invitacion");
  const [serviciosMes, setServiciosMes] = useState<number>(6);
  const [pricingTab, setPricingTab] = useState<"b2b" | "b2c">("b2b");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentOrigin = window.location.origin;
      setOrigin(currentOrigin);

      const qrOptions = {
        width: 240,
        margin: 1.5,
        color: { dark: "#090a0f", light: "#ffffff" },
      };

      QRCode.toDataURL(`${currentOrigin}/demo-fiesta`, qrOptions)
        .then(setQrInvitacion)
        .catch(console.error);

      QRCode.toDataURL(`${currentOrigin}/demo-fiesta/trivia`, qrOptions)
        .then(setQrTrivia)
        .catch(console.error);

      QRCode.toDataURL(`${currentOrigin}/demo-fiesta/fotos`, qrOptions)
        .then(setQrFotos)
        .catch(console.error);
    }
  }, []);

  // Simulator calculations
  let costoUnitario = 50000;
  let tramoNombre = "Tramo 1 (Base)";
  let margenUnitario = 20000;
  let porcentajeMargen = 29;

  if (serviciosMes >= 9) {
    costoUnitario = 30000;
    tramoNombre = "Tramo 3 (VIP / Salón)";
    margenUnitario = 40000;
    porcentajeMargen = 57;
  } else if (serviciosMes >= 4) {
    costoUnitario = 40000;
    tramoNombre = "Tramo 2 (Activo)";
    margenUnitario = 30000;
    porcentajeMargen = 43;
  }

  const facturacionSugerida = serviciosMes * 70000;
  const costoTotalMayorista = serviciosMes * costoUnitario;
  const gananciaNetaEstimada = serviciosMes * margenUnitario;

  const faqs = [
    {
      q: "¿Qué necesita tener el salón para que funcione en las pantallas?",
      a: "Cualquier computadora o notebook conectada por cable HDMI a las pantallas gigantes, proyectores o televisores del salón. Desde esa computadora abrís Google Chrome a pantalla completa (tecla F11) con el link del evento que te damos listo. No requiere consolas especiales ni instalación de software.",
    },
    {
      q: "¿Qué pasa si en el salón no hay buen Wi-Fi o la señal es débil?",
      a: "El sistema fue diseñado especialmente para eventos en Argentina. Todas las fotos que sacan los invitados se comprimen automáticamente en el navegador de su propio celular antes de subirse (ocupan menos de 100 KB). Funciona con fluidez tanto con un Wi-Fi básico como con datos 4G de cualquier compañía.",
    },
    {
      q: "¿Cómo se controla que ningún invitado suba una foto desubicada o inapropiada?",
      a: "Tenés a disposición un Panel de Moderación en Vivo. Podés activar la 'aprobación previa' con un solo clic: cada foto que manda un invitado queda esperando en una pantalla privada de control y solo sale al proyector cuando el moderador (o alguien del staff) toca 'Aprobar'.",
    },
    {
      q: "¿Los invitados mayores o de tercera edad saben usarlo?",
      a: "Sí, es tan simple como abrir la cámara del celular y apuntar al código QR que está en el cartelito de la mesa. No tienen que descargar ninguna aplicación pesada, ni crearse contraseñas, ni poner tarjetas de crédito. En 2 segundos ya están viendo la trivia o el mural.",
    },
    {
      q: "¿Cómo es el cobro y la liquidación del costo mayorista?",
      a: "Es flexible y transparente. Podés pagar cada evento a medida que se confirma o liquidar a mes vencido según la cantidad de servicios acumulados en el mes calendario para acceder a los tramos de descuento ($50.000, $40.000 o $30.000 c/u). Emitimos comprobante oficial.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#07080a] text-slate-100 selection:bg-white selection:text-slate-950">
      {/* ─── BARRA SUPERIOR ─── */}
      <header className="border-b border-white/15 bg-[#0a0c10]/85 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-white via-slate-200 to-slate-400 flex items-center justify-center shadow-lg shadow-white/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-4 h-4 text-slate-950" />
            </div>
            <div>
              <span className="font-extrabold text-base sm:text-lg text-white tracking-tight">Eventos Kronitt</span>
            </div>
            <span className="hidden md:inline-block px-2.5 py-0.5 text-[10px] font-extrabold rounded-full bg-white/10 text-slate-200 border border-white/25 uppercase tracking-wider">
              Salones & Planners
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <a
              href="#simulador"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            >
              <DollarSign className="w-3.5 h-3.5 text-slate-300" />
              <span>Simulador de Ganancia</span>
            </a>

            <a
              href="https://wa.me/5492235851419?text=Hola!%20Soy%20organizador%20/%20tengo%20un%20sal%C3%B3n%20y%20quiero%20conocer%20la%20propuesta%20de%20Eventos%20Kronitt."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-slate-950 text-xs sm:text-sm font-bold shadow-md transition-all transform hover:-translate-y-0.5"
            >
              <WhatsAppIcon className="w-4 h-4 shrink-0" />
              <span>Hablar por WhatsApp</span>
            </a>
          </div>
        </div>
      </header>

      {/* ─── HERO B2B: PLATEADO / PLATINO PREDOMINANTE ─── */}
      <section className="relative pt-12 sm:pt-20 pb-12 px-4 sm:px-6 max-w-7xl mx-auto text-center">
        {/* Glow de fondo plateado y sutil platino */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[320px] bg-gradient-to-tr from-white/10 via-slate-300/10 to-amber-400/5 blur-[130px] rounded-full pointer-events-none -z-10" />

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/25 text-slate-200 text-xs font-bold uppercase tracking-wider mb-6">
          <Sparkles className="w-3.5 h-3.5 text-white" />
          <span>Propuesta Exclusiva para Salones & Organizadores</span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.15] max-w-4xl mx-auto mb-6">
          Tecnología interactiva para tus fiestas:{" "}
          <span className="bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
            hacé que cada evento sea inolvidable
          </span>
        </h1>

        <p className="text-sm sm:text-lg text-slate-300 max-w-3xl mx-auto font-medium leading-relaxed mb-8">
          Invitaciones con sobre 3D, Juegos en vivo en pantallas gigantes y Mural de fotos proyectadas por QR.
          <strong> Cero descargas para los invitados</strong>, llave en mano para el salón y con <strong>ganancia escalada por mes</strong>.
        </p>

        {/* BOTONES PRINCIPALES */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 mb-10">
          <a
            href="#showroom-demo"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-white via-slate-100 to-slate-300 hover:from-slate-100 hover:to-white text-slate-950 font-black text-sm sm:text-base shadow-[0_8px_25px_rgba(255,255,255,0.22)] border border-white/80 transition-all transform hover:-translate-y-0.5"
          >
            <Smartphone className="w-4 h-4" />
            <span>Probar Showroom con tu Celular</span>
          </a>

          <a
            href="#paso-a-paso"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-400 text-slate-200 font-bold text-sm sm:text-base transition-colors"
          >
            <Layers className="w-4 h-4 text-slate-300" />
            <span>Ver Cómo Funciona (Paso a Paso)</span>
          </a>

          <a
            href="#simulador"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white/5 border border-white/20 hover:bg-white/10 text-slate-200 font-bold text-sm sm:text-base transition-colors"
          >
            <DollarSign className="w-4 h-4 text-amber-400" />
            <span>Simular Ganancia Salón</span>
          </a>
        </div>

        {/* 4 PILLARS QUICK STRIP */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto text-left">
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/15 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-white/10 text-white flex items-center justify-center shrink-0">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Sin bajar apps</div>
              <div className="text-[11px] text-slate-400">Escanean QR y juegan</div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-700/60 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-slate-800 text-slate-200 flex items-center justify-center shrink-0">
              <Tv className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Cualquier pantalla</div>
              <div className="text-[11px] text-slate-400">TV, LED o Proyector HDMI</div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/15 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-white/10 text-slate-100 flex items-center justify-center shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Moderación en vivo</div>
              <div className="text-[11px] text-slate-400">Filtro previo de fotos</div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-700/60 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-slate-800 text-amber-300 flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Apto Wi-Fi o 4G</div>
              <div className="text-[11px] text-slate-400">Comprime fotos en el celu</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECCIÓN 1: SHOWROOM INTERACTIVO CON QR EN VIVO ─── */}
      <section
        id="showroom-demo"
        className="py-16 sm:py-20 bg-gradient-to-b from-[#090b10] to-[#07080a] border-y border-white/15 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-300">
              Experiencia en Tiempo Real
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mt-1 mb-3">
              Showroom Interactivo: <span className="text-slate-200">Escaneá con tu celular</span>
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm">
              Apuntá con la cámara de tu teléfono a cualquiera de los códigos QR. Es la misma experiencia real que vivirán los invitados en el evento.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* DEMO 1: INVITACIÓN (PLATINO / BLANCO) */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-500/40 flex flex-col items-center text-center shadow-xl relative group">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-2">
                01 · Pre-Fiesta
              </span>
              <h3 className="text-lg font-bold text-white mb-2">Invitación Digital 3D & RSVP</h3>
              <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                Sobre virtual 3D interactivo con música, geolocalización directa y confirmación de dietas especiales para cocina.
              </p>

              {/* QR Container */}
              <div className="bg-white p-2.5 rounded-xl shadow-inner mb-4">
                {qrInvitacion ? (
                  <Image
                    src={qrInvitacion}
                    alt="QR Demo Invitación"
                    width={160}
                    height={160}
                    className="w-36 h-36 object-contain"
                    unoptimized
                  />
                ) : (
                  <div className="w-36 h-36 bg-slate-200 animate-pulse rounded-lg" />
                )}
              </div>

              <span className="text-[11px] font-bold text-slate-300 mb-4">
                📱 Escaneá para abrir el sobre en tu celu
              </span>

              <a
                href={origin ? `${origin}/demo-fiesta` : "/demo-fiesta"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold transition-colors"
              >
                <span>Probar en este navegador</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* DEMO 2: TRIVIA (CHROME SILVER) */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-white/35 flex flex-col items-center text-center shadow-xl relative group">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-2">
                02 · Durante la Fiesta
              </span>
              <h3 className="text-lg font-bold text-white mb-2">Trivia en Pantalla Gigante</h3>
              <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                El show interactivo para animar la cena. Los invitados juegan contra reloj desde su mesa y el podio sale en la pantalla.
              </p>

              {/* QR Container */}
              <div className="bg-white p-2.5 rounded-xl shadow-inner mb-4">
                {qrTrivia ? (
                  <Image
                    src={qrTrivia}
                    alt="QR Demo Trivia"
                    width={160}
                    height={160}
                    className="w-36 h-36 object-contain"
                    unoptimized
                  />
                ) : (
                  <div className="w-36 h-36 bg-slate-200 animate-pulse rounded-lg" />
                )}
              </div>

              <span className="text-[11px] font-bold text-slate-300 mb-4">
                📱 Escaneá para entrar como jugador
              </span>

              <div className="w-full flex flex-col gap-2">
                <a
                  href={origin ? `${origin}/demo-fiesta/trivia` : "/demo-fiesta/trivia"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white border border-white/30 text-xs font-bold transition-colors"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Jugar desde la Web</span>
                </a>

                <a
                  href={origin ? `${origin}/demo-fiesta/pantalla/trivia` : "/demo-fiesta/pantalla/trivia"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors"
                >
                  <Tv className="w-3.5 h-3.5 text-slate-300" />
                  <span>Ver Pantalla de TV / Proyector</span>
                </a>
              </div>
            </div>

            {/* DEMO 3: MURAL DE FOTOS (TOQUE CHAMPAGNE SUTIL) */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-amber-400/35 flex flex-col items-center text-center shadow-xl relative group">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-2">
                03 · Toda la Noche
              </span>
              <h3 className="text-lg font-bold text-white mb-2">Mural de Fotos en Vivo por QR</h3>
              <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                Cada mesa tiene su código QR. Los invitados sacan selfies y dedicatorias que se proyectan en pantalla gigante al instante.
              </p>

              {/* QR Container */}
              <div className="bg-white p-2.5 rounded-xl shadow-inner mb-4">
                {qrFotos ? (
                  <Image
                    src={qrFotos}
                    alt="QR Demo Fotos"
                    width={160}
                    height={160}
                    className="w-36 h-36 object-contain"
                    unoptimized
                  />
                ) : (
                  <div className="w-36 h-36 bg-slate-200 animate-pulse rounded-lg" />
                )}
              </div>

              <span className="text-[11px] font-bold text-amber-200/90 mb-4">
                📱 Escaneá para subir una foto de prueba
              </span>

              <div className="w-full flex flex-col gap-2">
                <a
                  href={origin ? `${origin}/demo-fiesta/fotos` : "/demo-fiesta/fotos"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-amber-400/10 hover:bg-amber-400/20 text-amber-200 border border-amber-400/30 text-xs font-bold transition-colors"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Subir Foto desde la Web</span>
                </a>

                <a
                  href={origin ? `${origin}/demo-fiesta/pantalla/mural` : "/demo-fiesta/pantalla/mural"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors"
                >
                  <Tv className="w-3.5 h-3.5 text-slate-300" />
                  <span>Ver Mural en Pantalla TV</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECCIÓN 2: PASO A PASO DE CÓMO FUNCIONA E IMPLEMENTAR ─── */}
      <section id="paso-a-paso" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-extrabold uppercase tracking-widest text-slate-300">
            Guía Práctica & Operativa
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mt-1 mb-3">
            Paso a Paso: ¿Cómo funciona y cómo se implementa?
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm">
            Elegí el servicio para ver exactamente qué hace el anfitrión, qué hacen los invitados y cómo lo activa el salón en 3 simples pasos.
          </p>
        </div>

        {/* SELECTOR DE TABS */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <button
            onClick={() => setActiveStepTab("invitacion")}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
              activeStepTab === "invitacion"
                ? "bg-gradient-to-r from-white via-slate-100 to-slate-300 text-slate-950 shadow-lg shadow-white/20 scale-105 font-black"
                : "bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800"
            }`}
          >
            <PartyPopper className="w-4 h-4" />
            <span>1. Invitación Digital 3D</span>
          </button>

          <button
            onClick={() => setActiveStepTab("trivia")}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
              activeStepTab === "trivia"
                ? "bg-gradient-to-r from-slate-200 to-slate-400 text-slate-950 shadow-lg shadow-slate-300/20 scale-105 font-black"
                : "bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800"
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>2. Trivia en Pantalla</span>
          </button>

          <button
            onClick={() => setActiveStepTab("fotos")}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
              activeStepTab === "fotos"
                ? "bg-gradient-to-r from-slate-100 via-slate-200 to-amber-200 text-slate-950 shadow-lg shadow-slate-200/20 scale-105 font-black"
                : "bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800"
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>3. Mural de Fotos QR</span>
          </button>

          <button
            onClick={() => setActiveStepTab("salon")}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
              activeStepTab === "salon"
                ? "bg-gradient-to-r from-white to-slate-300 text-slate-950 shadow-lg shadow-white/20 scale-105 font-black"
                : "bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800"
            }`}
          >
            <Crown className="w-4 h-4" />
            <span>4. Para el Salón / Organizador</span>
          </button>
        </div>

        {/* CONTENIDO DEL TAB SELECCIONADO */}
        <div className="bg-slate-900/80 border border-white/15 rounded-3xl p-6 sm:p-10 shadow-2xl">
          {activeStepTab === "invitacion" && (
            <div>
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
                <span className="text-2xl font-black text-slate-400 font-mono">01.</span>
                <div>
                  <h3 className="text-xl font-black text-white">Invitación Digital Interactiva con Sobre 3D</h3>
                  <p className="text-xs text-slate-300">Cómo se arma y cómo se envía semanas antes de la fiesta.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800">
                  <div className="text-slate-200 text-xs font-black uppercase tracking-wider mb-2">
                    Paso 1: Armado en 5 min
                  </div>
                  <h4 className="text-base font-bold text-white mb-2">Carga de datos del evento</h4>
                  <p className="text-xs text-slate-300 leading-relaxed mb-3">
                    Se completan fecha, salón, código de vestimenta, música preferida y los datos de CBU/Alias para el cofre de regalos.
                  </p>
                  <div className="text-[11px] font-semibold text-slate-200 bg-white/10 p-2.5 rounded-lg border border-white/20">
                    💡 Genera un enlace web personalizado con sobre 3D animado.
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800">
                  <div className="text-slate-200 text-xs font-black uppercase tracking-wider mb-2">
                    Paso 2: Envío en 1 Clic
                  </div>
                  <h4 className="text-base font-bold text-white mb-2">Compartir por WhatsApp</h4>
                  <p className="text-xs text-slate-300 leading-relaxed mb-3">
                    Los agasajados mandan el enlace directamente por WhatsApp a sus invitados. Al tocarlo, el invitado ve el sobre abrirse con música.
                  </p>
                  <div className="text-[11px] font-semibold text-slate-200 bg-white/10 p-2.5 rounded-lg border border-white/20">
                    📱 Cero apps para instalar: abre al instante en Chrome o Safari.
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800">
                  <div className="text-slate-200 text-xs font-black uppercase tracking-wider mb-2">
                    Paso 3: Confirmación RSVP
                  </div>
                  <h4 className="text-base font-bold text-white mb-2">Control de dietas en vivo</h4>
                  <p className="text-xs text-slate-300 leading-relaxed mb-3">
                    El invitado confirma si asiste y selecciona si es celíaco, vegano o vegetariano. El anfitrión y el salón ven la lista en tiempo real.
                  </p>
                  <div className="text-[11px] font-semibold text-slate-200 bg-white/10 p-2.5 rounded-lg border border-white/20">
                    🍽️ Lista de cocina exacta: sin desperdicio de platos ni confusiones.
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeStepTab === "trivia" && (
            <div>
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
                <span className="text-2xl font-black text-slate-400 font-mono">02.</span>
                <div>
                  <h3 className="text-xl font-black text-white">Trivia en Pantalla Gigante (Juego en Vivo)</h3>
                  <p className="text-xs text-slate-300">El show colectivo que llena de risas la cena o los momentos entre platos.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800">
                  <div className="text-slate-200 text-xs font-black uppercase tracking-wider mb-2">
                    Paso 1: Preguntas a medida
                  </div>
                  <h4 className="text-base font-bold text-white mb-2">Personalización total</h4>
                  <p className="text-xs text-slate-300 leading-relaxed mb-3">
                    Elegimos o redactamos 5 a 10 preguntas divertidas sobre los novios, el cumpleañero de 15 o la empresa (anécdotas, gustos, secretos).
                  </p>
                  <div className="text-[11px] font-semibold text-slate-200 bg-white/10 p-2.5 rounded-lg border border-white/20">
                    🎉 Preguntas con tiempo límite y 4 opciones con colores.
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800">
                  <div className="text-slate-200 text-xs font-black uppercase tracking-wider mb-2">
                    Paso 2: Conectar la pantalla
                  </div>
                  <h4 className="text-base font-bold text-white mb-2">Conectar HDMI en el salón</h4>
                  <p className="text-xs text-slate-300 leading-relaxed mb-3">
                    El DJ o técnico del salón conecta la notebook a la pantalla gigante o TV, abre el link de transmisión y presiona F11 (pantalla completa).
                  </p>
                  <div className="text-[11px] font-semibold text-slate-200 bg-white/10 p-2.5 rounded-lg border border-white/20">
                    📺 En la pantalla aparece un código QR gigante y cuenta regresiva.
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800">
                  <div className="text-slate-200 text-xs font-black uppercase tracking-wider mb-2">
                    Paso 3: ¡A Jugar y Ganar!
                  </div>
                  <h4 className="text-base font-bold text-white mb-2">Podio y confeti animado</h4>
                  <p className="text-xs text-slate-300 leading-relaxed mb-3">
                    Todos juegan simultáneamente desde sus mesas. El sistema calcula velocidad y aciertos, mostrando el podio de ganadores con lluvia de confeti.
                  </p>
                  <div className="text-[11px] font-semibold text-slate-200 bg-white/10 p-2.5 rounded-lg border border-white/20">
                    🏆 Clima de euforia garantizado durante la cena.
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeStepTab === "fotos" && (
            <div>
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
                <span className="text-2xl font-black text-slate-400 font-mono">03.</span>
                <div>
                  <h3 className="text-xl font-black text-white">Mural de Fotos Proyectadas por QR en Vivo</h3>
                  <p className="text-xs text-slate-300">Transmisión de los momentos espontáneos que ningún fotógrafo llega a captar.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800">
                  <div className="text-slate-200 text-xs font-black uppercase tracking-wider mb-2">
                    Paso 1: Cartelitos en mesas
                  </div>
                  <h4 className="text-base font-bold text-white mb-2">Identificadores QR impresos</h4>
                  <p className="text-xs text-slate-300 leading-relaxed mb-3">
                    Se colocan pequeños cartelitos con código QR en cada mesa del salón (Kronitt te entrega el diseño en PDF listo para imprimir).
                  </p>
                  <div className="text-[11px] font-semibold text-slate-200 bg-white/10 p-2.5 rounded-lg border border-white/20">
                    🖨️ Diseño elegante que combina con los números de mesa.
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800">
                  <div className="text-slate-200 text-xs font-black uppercase tracking-wider mb-2">
                    Paso 2: Fotos y Dedicatorias
                  </div>
                  <h4 className="text-base font-bold text-white mb-2">Escaneo y subida instantánea</h4>
                  <p className="text-xs text-slate-300 leading-relaxed mb-3">
                    Los invitados escanean con la cámara de su celular, eligen una foto de su galería o sacan una selfie, escriben un mensaje y tocan enviar.
                  </p>
                  <div className="text-[11px] font-semibold text-slate-200 bg-white/10 p-2.5 rounded-lg border border-white/20">
                    ⚡ Se comprime en el celular para no gastar datos ni saturar el Wi-Fi.
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800">
                  <div className="text-slate-200 text-xs font-black uppercase tracking-wider mb-2">
                    Paso 3: Proyección y Álbum HD
                  </div>
                  <h4 className="text-base font-bold text-white mb-2">Mural dinámico y descarga ZIP</h4>
                  <p className="text-xs text-slate-300 leading-relaxed mb-3">
                    Las fotos se proyectan rotando en la pantalla gigante. Podés activar moderación previa y al finalizar la fiesta te descargás el álbum ZIP completo en HD.
                  </p>
                  <div className="text-[11px] font-semibold text-amber-300/90 bg-amber-500/10 p-2.5 rounded-lg border border-amber-500/20">
                    📸 El mejor recuerdo digital para los agasajados.
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeStepTab === "salon" && (
            <div>
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
                <span className="text-2xl font-black text-slate-400 font-mono">04.</span>
                <div>
                  <h3 className="text-xl font-black text-white">Cómo Asociarte como Salón u Organizador</h3>
                  <p className="text-xs text-slate-300">Empezá a comercializarlo sin costo de ingreso ni equipamiento especial.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800">
                  <div className="text-slate-200 text-xs font-black uppercase tracking-wider mb-2">
                    Paso 1: Definí tu propuesta
                  </div>
                  <h4 className="text-base font-bold text-white mb-2">Elegí cómo ofrecerlo</h4>
                  <p className="text-xs text-slate-300 leading-relaxed mb-3">
                    Podés incluir los servicios dentro de tus paquetes "Todo Incluido" / "Premium" para diferenciar tu salón, o venderlos como opcionales con tu propio margen.
                  </p>
                  <div className="text-[11px] font-semibold text-slate-200 bg-white/10 p-2.5 rounded-lg border border-white/20">
                    💰 Vos decidís el precio final al cliente (sugerido: $70.000 c/u).
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800">
                  <div className="text-slate-200 text-xs font-black uppercase tracking-wider mb-2">
                    Paso 2: Nos pasás el evento
                  </div>
                  <h4 className="text-base font-bold text-white mb-2">Soporte Llave en Mano</h4>
                  <p className="text-xs text-slate-300 leading-relaxed mb-3">
                    Nos mandás la fecha y nombres de los agasajados por WhatsApp. Nosotros configuramos todo, te pasamos los links de pantalla y los QR listos para imprimir.
                  </p>
                  <div className="text-[11px] font-semibold text-slate-200 bg-white/10 p-2.5 rounded-lg border border-white/20">
                    🛡️ Cero horas de trabajo operativo para tu equipo.
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800">
                  <div className="text-slate-200 text-xs font-black uppercase tracking-wider mb-2">
                    Paso 3: Liquidación Mensual
                  </div>
                  <h4 className="text-base font-bold text-white mb-2">Descuento por escala</h4>
                  <p className="text-xs text-slate-300 leading-relaxed mb-3">
                    A fin de mes se suman todos los servicios activados: de 1 a 3 pagás $50.000 c/u; de 4 a 8 pagás $40.000 c/u; y a partir de 9 baja a $30.000 c/u.
                  </p>
                  <div className="text-[11px] font-semibold text-slate-200 bg-white/10 p-2.5 rounded-lg border border-white/20">
                    📈 A mayor volumen mensual, mayor es tu ganancia neta.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ─── SECCIÓN 3: SIMULADOR DE GANANCIA PARA SALONES (SLIDER PLATEADO / CHROME) ─── */}
      <section id="simulador" className="py-16 sm:py-24 bg-gradient-to-b from-[#07080a] via-[#0d1017] to-[#07080a] border-y border-white/15">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-slate-300">
              Calculadora de Rentabilidad B2B
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mt-1 mb-3">
              Simulador de Ganancias para tu Salón
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm">
              Mové la barra para ver cuántos servicios podés activar por mes (entre trivias, murales e invitaciones) y calculá tu ingreso neto adicional.
            </p>
          </div>

          <div className="p-6 sm:p-10 rounded-3xl bg-slate-900/90 border border-slate-700/80 shadow-2xl relative overflow-hidden">
            {/* Header del Simulador */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800">
              <div>
                <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">
                  Cantidad de Servicios Activados al Mes:
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-black text-white">{serviciosMes}</span>
                  <span className="text-sm font-bold text-slate-400">servicios mensuales</span>
                </div>
              </div>

              <div className="flex flex-col items-start sm:items-end">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Tramo Mayorista Alcanzado:
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-white border border-white/25 text-xs font-black">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  {tramoNombre}
                </span>
              </div>
            </div>

            {/* Slider de control */}
            <div className="mb-8">
              <input
                type="range"
                min="1"
                max="20"
                value={serviciosMes}
                onChange={(e) => setServiciosMes(Number(e.target.value))}
                className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-slate-200"
              />
              <div className="flex justify-between text-[11px] font-bold text-slate-400 mt-2">
                <span>1 servicio</span>
                <span>Tramo 1 ($50k)</span>
                <span>Tramo 2 ($40k)</span>
                <span>Tramo 3 ($30k)</span>
                <span>20 servicios</span>
              </div>
            </div>

            {/* Botones rápidos */}
            <div className="flex flex-wrap items-center gap-2 mb-8">
              <span className="text-xs font-bold text-slate-400 mr-2">Valores rápidos:</span>
              {[2, 4, 6, 9, 12, 16].map((num) => (
                <button
                  key={num}
                  onClick={() => setServiciosMes(num)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    serviciosMes === num
                      ? "bg-white text-slate-950 font-black shadow-md"
                      : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  {num} servicios
                </button>
              ))}
            </div>

            {/* Tarjetas de Desglose de Números */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Tu Costo Mayorista por Servicio
                </div>
                <div className="text-2xl font-black text-white">
                  ${costoUnitario.toLocaleString("es-AR")}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Total mayorista: ${costoTotalMayorista.toLocaleString("es-AR")}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Facturación Sugerida al Cliente
                </div>
                <div className="text-2xl font-black text-slate-100">
                  ${facturacionSugerida.toLocaleString("es-AR")}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Calculado a $70.000 por servicio suelto
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/20">
                <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Tu Margen por Servicio
                </div>
                <div className="text-2xl font-black text-emerald-400">
                  ${margenUnitario.toLocaleString("es-AR")}{" "}
                  <span className="text-xs font-bold text-slate-300">({porcentajeMargen}%)</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Ganancia directa por cada activación
                </div>
              </div>
            </div>

            {/* GANANCIA TOTAL DESTACADA */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800/60 to-slate-950 border border-slate-600/60 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-slate-300">
                  Ingreso Extra Estimado para tu Salón
                </span>
                <div className="text-3xl sm:text-5xl font-black text-white tracking-tight mt-1">
                  +${gananciaNetaEstimada.toLocaleString("es-AR")}{" "}
                  <span className="text-base sm:text-lg font-bold text-slate-300">/ mes netos</span>
                </div>
              </div>

              <a
                href={`https://wa.me/5492235851419?text=Hola!%20Estuve%20probando%20el%20simulador%20para%20${serviciosMes}%20servicios%20al%20mes%20y%20quiero%20coordinar%20una%20alianza%20con%20mi%20sal%C3%B3n.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-white via-slate-100 to-slate-300 hover:from-slate-100 hover:to-white text-slate-950 font-black text-sm transition-all transform hover:-translate-y-0.5 shadow-lg shadow-white/20"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>Activar Alianza con este Volumen</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECCIÓN 4: TARIFARIO COMPLETO (B2C COMBOS VS B2B PARTNERS) ─── */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-extrabold uppercase tracking-widest text-slate-300">
            Esquema Comercial Transparente
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mt-1 mb-3">
            Precios, Combos y Tarifa Mayorista
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm">
            Elegí qué tarifario querés ver para entender cómo venderlo a tus clientes o qué costo mayorista te corresponde como salón.
          </p>
        </div>

        {/* TOGGLE B2B / B2C */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-900 border border-slate-800">
            <button
              onClick={() => setPricingTab("b2b")}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                pricingTab === "b2b"
                  ? "bg-gradient-to-r from-white to-slate-200 text-slate-950 font-black shadow-lg"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              🏢 Salones & Planners (Tarifa Mayorista B2B)
            </button>
            <button
              onClick={() => setPricingTab("b2c")}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                pricingTab === "b2c"
                  ? "bg-gradient-to-r from-white to-slate-200 text-slate-950 font-black shadow-lg"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              🎉 Quien Festeja (Combos Cliente Final)
            </button>
          </div>
        </div>

        {/* CONTENIDO TARIFARIO B2B */}
        {pricingTab === "b2b" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 text-[10px] font-bold uppercase tracking-wider">
                  1 a 3 servicios / mes
                </span>
                <h3 className="text-xl font-bold text-white mt-3 mb-1">Tramo 1 (Base)</h3>
                <div className="text-3xl font-black text-white mb-3">
                  $50.000 <span className="text-xs text-slate-400 font-semibold">c/u</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed mb-5">
                  Ideal para arrancar o salones con pocos eventos al mes.
                </p>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs mb-4">
                  <div className="text-slate-400">Margen vendiendo a $70k:</div>
                  <div className="text-slate-200 font-bold text-sm">$20.000 por servicio (29%)</div>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400">
                • Cero mínimo de permanencia
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900 border-2 border-slate-400/50 shadow-xl shadow-slate-300/10 flex flex-col justify-between relative">
              <div className="absolute -top-3 right-6 px-3 py-1 rounded-full bg-slate-200 text-slate-950 text-[10px] font-black uppercase tracking-wider">
                Recomendado Planners
              </div>
              <div>
                <span className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-200 border border-slate-700 text-[10px] font-bold uppercase tracking-wider">
                  4 a 8 servicios / mes
                </span>
                <h3 className="text-xl font-bold text-white mt-3 mb-1">Tramo 2 (Activo)</h3>
                <div className="text-3xl font-black text-slate-200 mb-3">
                  $40.000 <span className="text-xs text-slate-400 font-semibold">c/u</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed mb-5">
                  Para salones y planners con 2 a 3 fiestas al mes que ofrecen los combos.
                </p>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs mb-4">
                  <div className="text-slate-400">Margen vendiendo a $70k:</div>
                  <div className="text-slate-200 font-bold text-sm">$30.000 por servicio (43%)</div>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-300">
                • Descuento automático al 4to servicio
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900 border-2 border-white/80 shadow-xl shadow-white/10 flex flex-col justify-between relative">
              <div className="absolute -top-3 right-6 px-3 py-1 rounded-full bg-white text-slate-950 text-[10px] font-black uppercase tracking-wider">
                Tarifa Salón VIP
              </div>
              <div>
                <span className="px-2.5 py-1 rounded-full bg-white/10 text-white border border-white/30 text-[10px] font-bold uppercase tracking-wider">
                  9 o más servicios / mes
                </span>
                <h3 className="text-xl font-bold text-white mt-3 mb-1">Tramo 3 (VIP / Salón)</h3>
                <div className="text-3xl font-black text-white mb-3">
                  $30.000 <span className="text-xs text-slate-400 font-semibold">c/u</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed mb-5">
                  Tarifa preferencial para salones que incluyen la tecnología en todos sus paquetes.
                </p>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs mb-4">
                  <div className="text-slate-400">Margen vendiendo a $70k:</div>
                  <div className="text-emerald-400 font-bold text-sm">$40.000 por servicio (57%)</div>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-300">
                • Máxima rentabilidad y soporte prioritario
              </div>
            </div>
          </div>
        )}

        {/* CONTENIDO TARIFARIO B2C */}
        {pricingTab === "b2c" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 text-[10px] font-bold uppercase tracking-wider">
                  Módulo Individual
                </span>
                <h3 className="text-xl font-bold text-white mt-3 mb-1">1 Servicio Suelto</h3>
                <div className="text-3xl font-black text-white mb-3">$70.000</div>
                <p className="text-xs text-slate-300 leading-relaxed mb-5">
                  El cliente elige solo 1 módulo a necesidad: o la Invitación 3D, o la Trivia en vivo, o el Mural por QR.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400">
                • Precio de lista individual oficial
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-700 flex flex-col justify-between">
              <div>
                <span className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-200 border border-slate-700 text-[10px] font-bold uppercase tracking-wider">
                  Ahorro de $35.000
                </span>
                <h3 className="text-xl font-bold text-white mt-3 mb-1">Combo Dúo (2 Servicios)</h3>
                <div className="text-3xl font-black text-slate-100 mb-3">$105.000</div>
                <p className="text-xs text-slate-300 leading-relaxed mb-5">
                  Combina 2 módulos a elección (ej: Invitación 3D + Mural de Fotos, o Trivia en pantalla + Mural).
                </p>
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-300 font-bold mb-4">
                  Precio de lista separado: $140.000
                </div>
              </div>
              <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-300">
                • El más elegido para cumpleaños de 15
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900 border-2 border-white/80 shadow-xl shadow-white/10 flex flex-col justify-between relative">
              <div className="absolute -top-3 right-6 px-3 py-1 rounded-full bg-white text-slate-950 text-[10px] font-black uppercase tracking-wider">
                Pack Estrella
              </div>
              <div>
                <span className="px-2.5 py-1 rounded-full bg-white/10 text-white border border-white/30 text-[10px] font-bold uppercase tracking-wider">
                  Ahorro de $75.000
                </span>
                <h3 className="text-xl font-bold text-white mt-3 mb-1">Combo Full Suite (3 Servicios)</h3>
                <div className="text-3xl font-black text-white mb-3">$135.000</div>
                <p className="text-xs text-slate-300 leading-relaxed mb-5">
                  La experiencia integral: Invitación 3D antes de la fiesta + Trivia animada en la cena + Mural de fotos en vivo por QR.
                </p>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/15 text-[11px] text-slate-200 font-bold mb-4">
                  Precio de lista separado: $210.000
                </div>
              </div>
              <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-300">
                • Experiencia 360° para bodas y eventos premium
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ─── SECCIÓN 5: DESCARGA DE MATERIAL COMERCIAL EN PDF (PLATEADO Y PLATINO) ─── */}
      <section className="py-16 sm:py-20 bg-[#090b10] border-t border-white/15">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-300">
              Material para Descargar y Compartir
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1 mb-2">
              Descargá las Propuestas en PDF
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm">
              Listos para compartir por WhatsApp con tus socios o clientes, con diseño elegante y nombres en español.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-600/70 flex flex-col justify-between hover:border-slate-400 transition-colors">
              <div>
                <h4 className="text-lg font-bold text-white mb-2">Propuesta Comercial (1 Página)</h4>
                <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                  Resumen ejecutivo de alto impacto con los 3 servicios y la tabla de precios y tramos mayoristas.
                </p>
              </div>
              <a
                href="/docs/Propuesta_Comercial_Eventos_Kronitt.pdf"
                download
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-white via-slate-100 to-slate-300 text-slate-950 text-xs font-black transition-all shadow-md hover:from-slate-100 hover:to-white"
              >
                <Download className="w-4 h-4" />
                <span>Descargar Propuesta (PDF)</span>
              </a>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-700 flex flex-col justify-between hover:border-slate-500 transition-colors">
              <div>
                <h4 className="text-lg font-bold text-white mb-2">Presentación Completa (2 Páginas)</h4>
                <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                  Ficha completa con los 3 servicios en profundidad, requerimientos de pantalla y detalle de combos.
                </p>
              </div>
              <a
                href="/docs/Presentacion_Servicios_Eventos_Kronitt.pdf"
                download
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-600 text-xs font-bold transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Descargar Presentación (PDF)</span>
              </a>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-700 flex flex-col justify-between hover:border-slate-500 transition-colors">
              <div>
                <h4 className="text-lg font-bold text-white mb-2">Guía de Ventas (2 Páginas)</h4>
                <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                  Mensajes modelo para WhatsApp, guión de reunión de 15 min y manejo de objeciones para salones y planners.
                </p>
              </div>
              <a
                href="/docs/Guia_Ventas_Eventos_Kronitt.pdf"
                download
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-600 text-xs font-bold transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Descargar Guía de Ventas (PDF)</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECCIÓN 6: PREGUNTAS FRECUENTES (FAQ ACORDEÓN) ─── */}
      <section className="py-16 sm:py-24 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-300">
            Dudas Habituales
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-1 mb-2">
            Preguntas Frecuentes de Salones y Planners
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm">
            Todo lo que necesitás saber sobre la implementación técnica y comercial.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden transition-colors"
            >
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-white hover:text-slate-200 transition-colors"
              >
                <span>{faq.q}</span>
                {openFaq === index ? (
                  <ChevronUp className="w-5 h-5 text-slate-300 shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                )}
              </button>
              {openFaq === index && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ─── SECCIÓN 7: BANNER FINAL CON WHATSAPP (FONDO OSCURO Y DETALLES EN PLATA) ─── */}
      <section className="py-20 bg-gradient-to-tr from-[#10121a] via-[#090b10] to-[#07080a] border-t border-white/15 text-center px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-black text-white mb-4 tracking-tight">
            ¿Querés sumar Eventos Kronitt a tus fiestas?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mb-8 leading-relaxed max-w-2xl mx-auto">
            Hablemos por WhatsApp. Te enviamos el <strong>Kit de Muestra con tarjetas QR impresas</strong> para que las tengas en tu salón o en tus reuniones con clientes, y coordinamos una prueba para tu próximo evento.
          </p>

          <a
            href="https://wa.me/5492235851419?text=Hola!%20Soy%20organizador%20/%20tengo%20un%20sal%C3%B3n%20y%20quiero%20conocer%20la%20propuesta%20de%20alianza%20con%20Eventos%20Kronitt."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-slate-950 font-black text-sm sm:text-base shadow-[0_10px_30px_rgba(37,211,102,0.4)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <WhatsAppIcon className="w-6 h-6 shrink-0" />
            <span>Hablar por WhatsApp con un Asesor</span>
          </a>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="py-8 bg-black/90 border-t border-white/10 text-center text-xs text-slate-400">
        <p>Eventos Kronitt © 2026 — Plataforma Integral de Experiencias Interactivas para Fiestas</p>
      </footer>
    </div>
  );
}
