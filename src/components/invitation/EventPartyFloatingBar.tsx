"use client";

import Link from "next/link";
import { Trophy, Camera, Sparkles } from "lucide-react";
import { SuiteEvent } from "@/types";

interface Props {
  event: SuiteEvent;
}

export default function EventPartyFloatingBar({ event }: Props) {
  const hasFotos = Boolean(event.enabledModules?.fotos);

  if (!hasFotos) return null;

  return (
    <aside aria-label="Actividades de la fiesta" className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 max-w-[94vw] sm:max-w-md w-full px-3 pointer-events-none">
      <div className="bg-slate-950/90 backdrop-blur-xl border border-white/15 rounded-2xl p-2 sm:p-2.5 shadow-[0_10px_35px_rgba(0,0,0,0.5)] flex items-center justify-between gap-2 pointer-events-auto">
        <div className="flex items-center gap-2 pl-2">
          <div className="w-7 h-7 rounded-lg bg-pink-600/30 border border-pink-500/40 flex items-center justify-center text-pink-300">
            <Camera className="w-3.5 h-3.5" />
          </div>
          <span className="text-[11px] font-semibold text-slate-200 hidden sm:inline">
            Mural de Fotos en Vivo:
          </span>
        </div>

        <div className="flex items-center gap-1.5 ml-auto">
          <Link
            href={`/${event.slug}/fotos`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-pink-600/30 hover:bg-pink-600/40 text-pink-200 border border-pink-500/40 text-xs font-bold transition-all shadow-sm cursor-pointer"
          >
            <Camera className="w-3.5 h-3.5 text-pink-300" />
            <span>Subir Fotos QR</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}

