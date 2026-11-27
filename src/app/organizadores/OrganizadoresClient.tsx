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
  ChevronRight,
  HelpCircle,
  Percent,
  Layers,
  Zap,
  Gift,
  MapPin,
  Calendar,
  Check,
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

  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentOrigin = window.location.origin;
      setOrigin(currentOrigin);

      const qrOptions = {
        width: 240,
        margin: 1.5,
        color: { dark: "#0f172a", light: "#ffffff" },
      };

      // Generate QRs pointing to the demo fiesta event
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

  return (
    <div className="min-h-screen bg-[#060813] text-slate-100 selection:bg-indigo-500 selection:text-white">
      {/* ─── BARRA SUPERIOR ─── */}
      <header className="border-b border-white/10 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-extrabold text-lg text-white">Eventos Kronitt</span>
            <span className="hidden sm:inline-block px-2.5 py-0.5 text-[11px] font-bold rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Espacio B2B Organizadores
            </span>
          </Link>

          <a
            href="https://wa.me/5492235851419?text=Hola!%20Soy%20organizador%20/%20tengo%20un%20sal%C3%B3n%20y%20quiero%20conocer%20la%20propuesta%20de%20alianza%20con%20Eventos%20Kronitt."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-slate-950 text-xs sm:text-sm font-bold shadow-md transition-all transform hover:-translate-y-0.5"
          >
            <WhatsAppIcon className="w-4 h-4 shrink-0" />
            <span>Hablar con un Asesor</span>
          </a>
        </div>
      </header>

      {/* ─── HERO B2B ─── */}
      <section className="relative pt-16 sm:pt-24 pb-16 px-4 sm:px-6 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Alianzas con Salones, Wedding Planners & DJs</span>
        </div>

        <h1 className="text-3xl sm:text-6xl font-black text-white tracking-tight leading-tight max-w-4xl mx-auto mb-6">
          Llevá tus eventos al siguiente nivel con{" "}
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            tecnología interactiva en vivo
          </span>
        </h1>

        <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed mb-10">
          Ofrecé a tus clientes experiencias que impactan: invitaciones digitales de lujo, trivias en pantallas gigantes y mural de fotos rotativo por QR. Cero descargas, solución llave en mano y comisiones de hasta el 20%.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#showroom-demo"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold text-sm sm:text-base shadow-[0_10px_30px_rgba(99,102,241,0.4)] transition-all transform hover:-translate-y-0.5"
          >
            Probar Showroom Demo con tu Celular
          </a>

          <a
            href="https://wa.me/5492235851419?text=Hola!%20Quiero%20solicitar%20el%20Kit%20de%20Muestra%20y%20conocer%20las%20tarifas%20para%20salones%20de%20Eventos%20Kronitt."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-200 font-bold text-sm sm:text-base transition-colors"
          >
            Pedir Kit de Muestra Comercial
          </a>
        </div>
      </section>

      {/* ─── SECCIÓN SHOWROOM INTERACTIVO CON QR EN VIVO ─── */}
      <section
        id="showroom-demo"
        className="py-16 sm:py-24 bg-gradient-to-b from-[#090c1d] to-[#060813] border-y border-white/10 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-4">
              Showroom Interactivo:{" "}
              <span className="text-indigo-400">Escaneá y probalo ahora</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base">
              Apuntá la cámara de tu smartphone a cualquiera de los códigos QR para experimentar lo mismo que vivirán tus clientes e invitados en la fiesta.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* DEMO 1: INVITACIÓN */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-amber-500/30 flex flex-col items-center text-center shadow-xl relative group">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
                <PartyPopper className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-1">
                Servicio 01
              </span>
              <h3 className="text-xl font-bold text-white mb-2">Invitación Digital & RSVP</h3>
              <p className="text-xs text-slate-300 mb-5 leading-relaxed">
                Sobre virtual 3D, música, geolocalización directa y confirmación de dietas especiales para el catering.
              </p>

              {/* QR Container */}
              <div className="bg-white p-3 rounded-2xl shadow-inner mb-5">
                {qrInvitacion ? (
                  <Image
                    src={qrInvitacion}
                    alt="QR Demo Invitación"
                    width={180}
                    height={180}
                    className="w-40 h-40 object-contain"
                    unoptimized
                  />
                ) : (
                  <div className="w-40 h-40 bg-slate-200 animate-pulse rounded-lg" />
                )}
              </div>

              <span className="text-[11px] font-semibold text-amber-300/90 mb-4">
                📱 Escaneá para abrir el sobre en tu celu
              </span>

              <a
                href={origin ? `${origin}/demo-fiesta` : "/demo-fiesta"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 text-xs font-bold transition-colors"
              >
                <span>Abrir en navegador</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* DEMO 2: TRIVIA */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-purple-500/30 flex flex-col items-center text-center shadow-xl relative group">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-4">
                <Trophy className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-purple-400 mb-1">
                Servicio 02
              </span>
              <h3 className="text-xl font-bold text-white mb-2">Trivia Fiesta en Vivo</h3>
              <p className="text-xs text-slate-300 mb-5 leading-relaxed">
                Juego interactivo contra reloj desde el celular con ranking animado y confeti proyectado en pantalla gigante.
              </p>

              {/* QR Container */}
              <div className="bg-white p-3 rounded-2xl shadow-inner mb-5">
                {qrTrivia ? (
                  <Image
                    src={qrTrivia}
                    alt="QR Demo Trivia"
                    width={180}
                    height={180}
                    className="w-40 h-40 object-contain"
                    unoptimized
                  />
                ) : (
                  <div className="w-40 h-40 bg-slate-200 animate-pulse rounded-lg" />
                )}
              </div>

              <span className="text-[11px] font-semibold text-purple-300/90 mb-4">
                📱 Escaneá para ingresar como jugador
              </span>

              <div className="w-full flex flex-col gap-2">
                <a
                  href={origin ? `${origin}/demo-fiesta/trivia` : "/demo-fiesta/trivia"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 text-purple-300 border border-purple-500/30 text-xs font-bold transition-colors"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Jugar desde la Web</span>
                </a>

                <a
                  href={origin ? `${origin}/demo-fiesta/pantalla/trivia` : "/demo-fiesta/pantalla/trivia"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors"
                >
                  <Tv className="w-3.5 h-3.5" />
                  <span>Ver Pantalla TV / Proyector</span>
                </a>
              </div>
            </div>

            {/* DEMO 3: MURAL DE FOTOS */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-pink-500/30 flex flex-col items-center text-center shadow-xl relative group">
              <div className="w-12 h-12 rounded-2xl bg-pink-500/20 text-pink-400 flex items-center justify-center mb-4">
                <Camera className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-pink-400 mb-1">
                Servicio 03
              </span>
              <h3 className="text-xl font-bold text-white mb-2">Mural de Fotos por QR</h3>
              <p className="text-xs text-slate-300 mb-5 leading-relaxed">
                Cada mesa tiene su QR. Los invitados suben selfies y dedicatorias al instante con panel de moderación en vivo.
              </p>

              {/* QR Container */}
              <div className="bg-white p-3 rounded-2xl shadow-inner mb-5">
                {qrFotos ? (
                  <Image
                    src={qrFotos}
                    alt="QR Demo Fotos"
                    width={180}
                    height={180}
                    className="w-40 h-40 object-contain"
                    unoptimized
                  />
                ) : (
                  <div className="w-40 h-40 bg-slate-200 animate-pulse rounded-lg" />
                )}
              </div>

              <span className="text-[11px] font-semibold text-pink-300/90 mb-4">
                📱 Escaneá para subir una foto de prueba
              </span>

              <div className="w-full flex flex-col gap-2">
                <a
                  href={origin ? `${origin}/demo-fiesta/fotos` : "/demo-fiesta/fotos"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-pink-500/15 hover:bg-pink-500/25 text-pink-300 border border-pink-500/30 text-xs font-bold transition-colors"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Subir Foto Web</span>
                </a>

                <a
                  href={origin ? `${origin}/demo-fiesta/pantalla/mural` : "/demo-fiesta/pantalla/mural"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors"
                >
                  <Tv className="w-3.5 h-3.5" />
                  <span>Ver Mural en Pantalla</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── MODELOS DE ALIANZA B2B ─── */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-indigo-400 text-xs font-bold uppercase tracking-widest">
            Rentabilidad & Asociación
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mt-2 mb-4">
            Modelos de Alianza Comercial
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Diseñados para que sumes valor y rentabilidad sin añadir carga operativa a tu equipo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col justify-between hover:border-indigo-500/40 transition-colors">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-6">
                <Percent className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Comisión por Recomendación</h3>
              <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                Recomendás Eventos Kronitt a tus clientes. Nosotros nos encargamos del asesoramiento, cobro y soporte, y vos recibís una **comisión fija del 15% al 20%** por cada evento contratado.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-800 text-xs font-semibold text-indigo-300 flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Cero trabajo operativo</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-8 rounded-3xl bg-slate-900 border border-purple-500/30 flex flex-col justify-between shadow-lg shadow-purple-500/10">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-6">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Tarifa Mayorista para Salones</h3>
              <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                Integrás nuestros servicios interactivos en tus paquetes "Todo Incluido" o "Premium" con tarifa preferencial B2B. Vos definís tu propio precio final y margen de ganancia.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-800 text-xs font-semibold text-purple-300 flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Mayor ticket promedio por fiesta</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col justify-between hover:border-pink-500/40 transition-colors">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-pink-500/20 text-pink-400 flex items-center justify-center mb-6">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Evento Piloto de Lanzamiento</h3>
              <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                Validá la recepción de tus anfitriones e invitados implementando la tecnología en tu próximo evento con una **tarifa bonificada de prueba**.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-800 text-xs font-semibold text-pink-300 flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Prueba sin riesgo inicial</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── DERRIBO DE OBJECIONES TÉCNICAS ─── */}
      <section className="py-16 sm:py-24 bg-slate-950 border-t border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Tranquilidad Operativa para Salones & Coordinadores
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-start gap-4">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-white mb-1">Sin descargas ni contraseñas</h4>
                <p className="text-xs sm:text-sm text-slate-300">
                  Los invitados abren la cámara de su celular, apuntan al código QR y están dentro en 2 segundos.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-start gap-4">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-white mb-1">Compatible con cualquier pantalla</h4>
                <p className="text-xs sm:text-sm text-slate-300">
                  Cualquier TV, proyector o pantalla LED con conexión HDMI proyecta las experiencias desde un navegador web.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-start gap-4">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-white mb-1">Panel de Moderación en Vivo</h4>
                <p className="text-xs sm:text-sm text-slate-300">
                  Podés activar la aprobación previa para que ninguna foto no deseada salga en las pantallas.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-start gap-4">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-white mb-1">Consumo ultraliviano de datos</h4>
                <p className="text-xs sm:text-sm text-slate-300">
                  Las imágenes se comprimen en el propio teléfono antes de subirse. Funciona perfecto con Wi-Fi estándar o 4G.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── BANNER FINAL WHATSAPP ─── */}
      <section className="py-20 bg-gradient-to-tr from-indigo-950 via-purple-950 to-slate-950 border-t border-white/10 text-center px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-black text-white mb-6">
            ¿Querés sumar Eventos Kronitt a tu propuesta?
          </h2>
          <p className="text-slate-300 text-base sm:text-lg mb-8 leading-relaxed">
            Coordinemos una breve videollamada o conversación de 10 minutos. Te enviamos el Kit de Muestra con tarjetas QR para que las tengas en tu salón o reuniones con clientes.
          </p>

          <a
            href="https://wa.me/5492235851419?text=Hola!%20Soy%20organizador%20/%20tengo%20un%20sal%C3%B3n%20y%20quiero%20conocer%20la%20propuesta%20de%20alianza%20con%20Eventos%20Kronitt."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-slate-950 font-black text-base shadow-[0_10px_30px_rgba(37,211,102,0.4)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <WhatsAppIcon className="w-6 h-6 shrink-0" />
            <span>Hablar por WhatsApp con un Asesor Comercial</span>
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
