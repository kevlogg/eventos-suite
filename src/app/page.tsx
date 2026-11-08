import Link from "next/link";
import { Sparkles, PartyPopper, Camera, Trophy, Shield, ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Header */}
      <header className="border-b border-slate-800/80 backdrop-blur-md sticky top-0 z-50 bg-slate-950/80">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Eventos Suite
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/superadmin"
              className="px-4 py-2 text-sm font-medium rounded-lg bg-indigo-600 hover:bg-indigo-500 transition-colors shadow-sm shadow-indigo-500/30 flex items-center gap-1.5"
            >
              <Shield className="w-4 h-4" />
              <span>Superadmin</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center px-4 py-16 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-6">
          <PartyPopper className="w-4 h-4" /> Ecosistema Todo en Uno para Fiestas
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
          La plataforma definitiva para{" "}
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            eventos inolvidables
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-400 max-w-2xl mb-10">
          Unificá la experiencia completa de tus fiestas: invitaciones interactivas con confirmación RSVP, juegos de trivia en vivo y transmisión de fotos por QR en pantallas gigantes.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-left mt-4">
          {/* Card 1 */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-indigo-500/40 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-105 transition-transform">
              <PartyPopper className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Invitación Digital & RSVP</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Diseño interactivo con cuenta regresiva, confirmación de asistencia en tiempo real, mapa del salón y lista de invitados.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-purple-500/40 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4 group-hover:scale-105 transition-transform">
              <Trophy className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Trivia Fiesta en Vivo</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Los invitados juegan desde sus celulares con tiempo límite y los puntajes se proyectan en la pantalla gigante del salón.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-pink-500/40 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 mb-4 group-hover:scale-105 transition-transform">
              <Camera className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Fotos Dinámicas por QR</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Escanear un QR en cada mesa para subir fotos en vivo con dedicatorias, con moderación y mural proyector instantáneo.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-6 text-center text-xs text-slate-500">
        Eventos Suite &copy; {new Date().getFullYear()} - Sistema Unificado de Gestión de Fiestas y Eventos.
      </footer>
    </main>
  );
}
