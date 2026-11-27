import DiscoBallHero from "@/components/home/DiscoBallHero";
import HomeExperience from "@/components/home/HomeExperience";

export default function HomePage() {
  return (
    <div className="relative bg-transparent text-slate-100 selection:bg-amber-300/30 selection:text-white min-h-screen w-full max-w-full overflow-x-hidden">
      {/* ─── PANTALLA 1: BOLA DE BOLICHE 3D PERSISTENTE & RAYOS DE LUZ ─── */}
      <DiscoBallHero />

      {/* ─── PANTALLA 2+: EXPERIENCIA INTERACTIVA DUAL (FESTEJADORES VS SALONES) ─── */}
      <HomeExperience />
    </div>
  );
}
