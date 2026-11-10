"use client";

import { useMemo } from "react";
import { Sparkles } from "lucide-react";

interface DiscoMirrorHoverProps {
  rows?: number;
  cols?: number;
}

export default function DiscoMirrorHover({ rows = 6, cols = 8 }: DiscoMirrorHoverProps) {
  // Generate random shimmer delays for authentic mirror glints
  const tiles = useMemo(() => {
    return Array.from({ length: rows * cols }, (_, i) => ({
      id: i,
      delay: (i % 7) * 0.18 + ((i * 3) % 5) * 0.12,
      brightness: 0.85 + ((i * 13) % 10) * 0.03,
    }));
  }, [rows, cols]);

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 z-0 rounded-3xl overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out"
    >
      {/* ─── GRID OF SILVER REFLECTIVE MIRROR TILES (LIKE DISCO BALL) ─── */}
      <div
        className="w-full h-full p-2.5 grid gap-1.5 opacity-40 mix-blend-screen"
        style={{
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
        }}
      >
        {tiles.map((tile) => (
          <div
            key={tile.id}
            className="w-full h-full rounded-[3px] border border-white/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),inset_0_-1px_1px_rgba(0,0,0,0.5)] transition-all duration-300 group-hover:animate-pulse"
            style={{
              background: `linear-gradient(135deg, #ffffff 0%, #cbd5e1 40%, #94a3b8 70%, #f8fafc 100%)`,
              opacity: tile.brightness,
              animationDelay: `${tile.delay}s`,
              animationDuration: "2s",
            }}
          />
        ))}
      </div>

      {/* ─── SWEEPING SPECULAR METALLIC GLARE ON HOVER ─── */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/35 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none"
        style={{
          transform: "skewX(-20deg)",
        }}
      />

      {/* ─── CORNER TWINKLE SPARKLES ─── */}
      <div className="absolute top-3 right-3 text-white/90 animate-ping duration-1000">
        <Sparkles size={14} />
      </div>
      <div className="absolute bottom-3 left-3 text-amber-200/80 animate-pulse duration-700">
        <Sparkles size={12} />
      </div>

      {/* ─── SILVER METALLIC CARD BORDER HIGHLIGHT ─── */}
      <div className="absolute inset-0 rounded-3xl border-2 border-slate-200/50 shadow-[inset_0_0_20px_rgba(255,255,255,0.3)] pointer-events-none" />
    </div>
  );
}

