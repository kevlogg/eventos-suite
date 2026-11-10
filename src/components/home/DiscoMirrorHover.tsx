"use client";

import { useEffect, useRef } from "react";

interface DiscoMirrorHoverProps {
  /** Size in pixels of each square mirror tile (default: 18) */
  tileSize?: number;
  /** Gap in pixels between mirror tiles (default: 2.5) */
  gap?: number;
  /** Radius in pixels of the spotlight glow around mouse (default: 130) */
  spotlightRadius?: number;
  /** Speed of horizontal rotation illusion in pixels per second (default: 32) */
  spinSpeed?: number;
  /** Legacy compatibility props */
  rows?: number;
  cols?: number;
}

// Silver shades matching the 3D disco ball in DiscoBallHero with subtle cool specular undertones
const SILVER_SHADES = [
  { r: 219, g: 226, b: 236 }, // #dbe2ec
  { r: 202, g: 211, b: 224 }, // #cad3e0
  { r: 236, g: 242, b: 249 }, // #ecf2f9
  { r: 194, g: 203, b: 216 }, // #c2cbd8
  { r: 226, g: 233, b: 242 }, // #e2e9f2
];

function drawTilePath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  radius: number
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + size - radius, y);
  ctx.quadraticCurveTo(x + size, y, x + size, y + radius);
  ctx.lineTo(x + size, y + size - radius);
  ctx.quadraticCurveTo(x + size, y + size, x + size - radius, y + size);
  ctx.lineTo(x + radius, y + size);
  ctx.quadraticCurveTo(x, y + size, x, y + size - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

export default function DiscoMirrorHover({
  tileSize = 18,
  gap = 2.5,
  spotlightRadius = 130,
  spinSpeed = 32,
}: DiscoMirrorHoverProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Attach event listeners to the card container
    const card =
      (canvas.closest("a") as HTMLElement) ||
      (canvas.closest(".group") as HTMLElement) ||
      (canvas.parentElement?.parentElement as HTMLElement) ||
      (canvas.parentElement as HTMLElement);

    if (!card) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let isHovered = false;
    let hoverAlpha = 0; // 0 (hidden at rest) to 1 (fully active on hover)

    const targetMouse = { x: -9999, y: -9999 };
    const currentMouse = { x: -9999, y: -9999 };

    let width = 0;
    let height = 0;
    let dpr = 1;

    const updateSize = () => {
      const rect = card.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;

      width = Math.floor(rect.width);
      height = Math.floor(rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };

    updateSize();

    const ro = new ResizeObserver(() => {
      updateSize();
    });
    ro.observe(card);

    // Mouse & Touch listeners on the card
    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      targetMouse.x = e.clientX - rect.left;
      targetMouse.y = e.clientY - rect.top;
      if (!isHovered) {
        isHovered = true;
        cancelAnimationFrame(animationFrameId);
        animationFrameId = requestAnimationFrame(render);
      }
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      targetMouse.x = e.clientX - rect.left;
      targetMouse.y = e.clientY - rect.top;
      currentMouse.x = targetMouse.x;
      currentMouse.y = targetMouse.y;
      isHovered = true;
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(render);
    };

    const handleMouseLeave = () => {
      isHovered = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = card.getBoundingClientRect();
        targetMouse.x = e.touches[0].clientX - rect.left;
        targetMouse.y = e.touches[0].clientY - rect.top;
        if (!isHovered) {
          isHovered = true;
          cancelAnimationFrame(animationFrameId);
          animationFrameId = requestAnimationFrame(render);
        }
      }
    };

    const handleTouchEnd = () => {
      isHovered = false;
    };

    card.addEventListener("mousemove", handleMouseMove, { passive: true });
    card.addEventListener("mouseenter", handleMouseEnter, { passive: true });
    card.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    card.addEventListener("touchmove", handleTouchMove, { passive: true });
    card.addEventListener("touchend", handleTouchEnd, { passive: true });

    // ─── RENDER LOOP WITH SPINNING DISCO BALL ILLUSION ───
    const step = tileSize + gap;
    const cornerRadius = 1.6;

    const render = () => {
      if (width <= 0 || height <= 0) {
        updateSize();
      }

      // Smooth hover alpha fade in / out
      if (isHovered) {
        hoverAlpha += (1 - hoverAlpha) * 0.18;
      } else {
        hoverAlpha += (0 - hoverAlpha) * 0.1;
      }

      // Completely idle when not hovered and faded out (zero CPU/GPU at rest)
      if (!isHovered && hoverAlpha < 0.002) {
        hoverAlpha = 0;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
      }

      // Smooth mouse tracking
      currentMouse.x += (targetMouse.x - currentMouse.x) * 0.35;
      currentMouse.y += (targetMouse.y - currentMouse.y) * 0.35;

      ctx.save();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      const time = performance.now() * 0.001;

      // ─── ROTATION SHIFT (DISCO BALL HORIZONTAL SPIN) ───
      const shift = time * spinSpeed;
      const subPixelShift = shift % step;
      const baseColOffset = Math.floor(shift / step);

      // ─── 1. SPOTLIGHT POOL AROUND MOUSE ───
      if (currentMouse.x > -500 && hoverAlpha > 0.01) {
        const glow = ctx.createRadialGradient(
          currentMouse.x,
          currentMouse.y,
          0,
          currentMouse.x,
          currentMouse.y,
          spotlightRadius * 1.15
        );
        glow.addColorStop(0, `rgba(255, 255, 255, ${0.45 * hoverAlpha})`);
        glow.addColorStop(0.35, `rgba(226, 232, 240, ${0.22 * hoverAlpha})`);
        glow.addColorStop(0.75, `rgba(148, 163, 184, ${0.08 * hoverAlpha})`);
        glow.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, width, height);
      }

      // Grid bounds with extra columns for seamless rotation wrapping
      const cols = Math.ceil(width / step) + 3;
      const rows = Math.ceil(height / step) + 1;
      const totalH = rows * step - gap;
      const startX = -step;
      const startY = Math.floor((height - totalH) / 2);

      // ─── 2. DRAW 3D BEVELED DISCO MIRROR TILES (NATIVE CARD TEXTURE) ───
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          // Horizontal translation to the right simulating disco ball rotation
          const x = startX + c * step + subPixelShift;
          const y = startY + r * step;

          if (x + tileSize < 0 || x > width || y + tileSize < 0 || y > height) {
            continue;
          }

          const cx = x + tileSize / 2;
          const cy = y + tileSize / 2;
          const dist = Math.hypot(cx - currentMouse.x, cy - currentMouse.y);

          // Unique wrapped column ID ensuring continuous texture pattern as it spins
          const colId = c - baseColOffset;
          const shade = SILVER_SHADES[Math.abs(r * 5 + colId * 3) % SILVER_SHADES.length];

          // ─── 3D SUNKEN GROUT DROP SHADOW (Elevates each tile physically above the surface) ───
          ctx.fillStyle = `rgba(0, 0, 0, ${0.92 * hoverAlpha})`;
          ctx.fillRect(x + 1.2, y + tileSize, tileSize, gap);
          ctx.fillRect(x + tileSize, y + 1.2, gap, tileSize);

          if (dist > spotlightRadius) {
            // ─── RESTING 3D MIRROR TILE (SOLID SMOKED CHROME, DEEP TACTILE RELIEF) ───
            drawTilePath(ctx, x, y, tileSize, cornerRadius);

            const grad = ctx.createLinearGradient(x, y, x + tileSize, y + tileSize);
            // Rich solid titanium chrome gradient - feels native, solid, and physically raised
            grad.addColorStop(0, `rgba(${Math.round(shade.r * 0.36)}, ${Math.round(shade.g * 0.38)}, ${Math.round(shade.b * 0.44)}, ${0.96 * hoverAlpha})`);
            grad.addColorStop(0.35, `rgba(24, 28, 40, ${0.98 * hoverAlpha})`);
            grad.addColorStop(0.7, `rgba(13, 15, 23, ${0.98 * hoverAlpha})`);
            grad.addColorStop(1, `rgba(5, 6, 11, ${hoverAlpha})`);

            ctx.fillStyle = grad;
            ctx.fill();

            // Top specular chamfer bevel line
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.52 * hoverAlpha})`;
            ctx.lineWidth = 1.1;
            ctx.beginPath();
            ctx.moveTo(x + cornerRadius, y + 0.55);
            ctx.lineTo(x + tileSize - cornerRadius, y + 0.55);
            ctx.stroke();

            // Left specular chamfer bevel line
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.38 * hoverAlpha})`;
            ctx.beginPath();
            ctx.moveTo(x + 0.55, y + cornerRadius);
            ctx.lineTo(x + 0.55, y + tileSize - cornerRadius);
            ctx.stroke();

            // Bottom recessed seam line
            ctx.strokeStyle = `rgba(0, 0, 0, ${0.95 * hoverAlpha})`;
            ctx.beginPath();
            ctx.moveTo(x + cornerRadius, y + tileSize - 0.55);
            ctx.lineTo(x + tileSize - cornerRadius, y + tileSize - 0.55);
            ctx.stroke();

            // Right recessed seam line
            ctx.beginPath();
            ctx.moveTo(x + tileSize - 0.55, y + cornerRadius);
            ctx.lineTo(x + tileSize - 0.55, y + tileSize - cornerRadius);
            ctx.stroke();

            // Micro-specular glint at top-left facet apex
            ctx.fillStyle = `rgba(255, 255, 255, ${0.82 * hoverAlpha})`;
            ctx.fillRect(x + 1.2, y + 1.2, 1.5, 1.5);
          } else {
            // ─── ACTIVE SPOTLIGHT TILE (UNDER / NEAR MOUSE) ───
            const normDist = dist / spotlightRadius;
            const proximity = 1 - normDist;

            if (dist < 26) {
              // Direct hit under cursor: Pure dazzling white mirror hotspot!
              drawTilePath(ctx, x, y, tileSize, cornerRadius);

              ctx.fillStyle = `rgba(255, 255, 255, ${0.98 * hoverAlpha})`;
              ctx.fill();

              ctx.strokeStyle = `rgba(255, 255, 255, ${hoverAlpha})`;
              ctx.lineWidth = 1.2;
              ctx.stroke();

              // Specular diamond sparkle inside hotspot facet
              ctx.fillStyle = `rgba(255, 255, 255, ${hoverAlpha})`;
              ctx.fillRect(x + 1.5, y + 1.5, tileSize - 3, tileSize - 3);
            } else {
              // Neighboring tiles catching the rotating reflection
              const falloff = Math.pow(proximity, 1.25);
              const facetOffset = Math.sin(colId * 11.7 + r * 17.3) * 0.18;
              const intensity = Math.min(1, Math.max(0, falloff + facetOffset * falloff));

              drawTilePath(ctx, x, y, tileSize, cornerRadius);

              const grad = ctx.createLinearGradient(x, y, x + tileSize, y + tileSize);
              const brightR = Math.round(shade.r * (0.36 + 0.64 * intensity));
              const brightG = Math.round(shade.g * (0.38 + 0.62 * intensity));
              const brightB = Math.round(shade.b * (0.44 + 0.56 * intensity));

              grad.addColorStop(0, `rgba(255, 255, 255, ${(0.6 + 0.4 * intensity) * hoverAlpha})`);
              grad.addColorStop(0.3, `rgba(${brightR}, ${brightG}, ${brightB}, ${0.98 * hoverAlpha})`);
              grad.addColorStop(0.7, `rgba(${Math.round(24 + (shade.r * 0.6 - 24) * intensity)}, ${Math.round(28 + (shade.g * 0.6 - 28) * intensity)}, ${Math.round(40 + (shade.b * 0.6 - 40) * intensity)}, ${0.98 * hoverAlpha})`);
              grad.addColorStop(1, `rgba(10, 12, 18, ${hoverAlpha})`);

              ctx.fillStyle = grad;
              ctx.fill();

              // 3D Mirror Bevel highlights flare with light
              ctx.strokeStyle = `rgba(255, 255, 255, ${(0.55 + 0.45 * intensity) * hoverAlpha})`;
              ctx.lineWidth = 1.1;
              ctx.beginPath();
              ctx.moveTo(x + cornerRadius, y + 0.55);
              ctx.lineTo(x + tileSize - cornerRadius, y + 0.55);
              ctx.stroke();

              ctx.strokeStyle = `rgba(255, 255, 255, ${(0.42 + 0.58 * intensity) * hoverAlpha})`;
              ctx.beginPath();
              ctx.moveTo(x + 0.55, y + cornerRadius);
              ctx.lineTo(x + 0.55, y + tileSize - cornerRadius);
              ctx.stroke();

              // Deep seam recesses preserve 3D bevel depth
              ctx.strokeStyle = `rgba(0, 0, 0, ${(0.92 - 0.25 * intensity) * hoverAlpha})`;
              ctx.beginPath();
              ctx.moveTo(x + cornerRadius, y + tileSize - 0.55);
              ctx.lineTo(x + tileSize - cornerRadius, y + tileSize - 0.55);
              ctx.stroke();
              ctx.beginPath();
              ctx.moveTo(x + tileSize - 0.55, y + cornerRadius);
              ctx.lineTo(x + tileSize - 0.55, y + tileSize - cornerRadius);
              ctx.stroke();

              // Gleaming corner glint
              ctx.fillStyle = `rgba(255, 255, 255, ${(0.82 + 0.18 * intensity) * hoverAlpha})`;
              ctx.fillRect(x + 1.2, y + 1.2, 1.6, 1.6);
            }
          }
        }
      }

      // ─── 3. PERIMETER CHASSIS VIGNETTE (Marries tiles seamlessly into card bezel) ───
      const rimGrad = ctx.createRadialGradient(
        width / 2,
        height / 2,
        Math.min(width, height) * 0.42,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.74
      );
      rimGrad.addColorStop(0, "rgba(0, 0, 0, 0)");
      rimGrad.addColorStop(0.65, "rgba(0, 0, 0, 0.06)");
      rimGrad.addColorStop(1, `rgba(4, 5, 10, ${0.55 * hoverAlpha})`);

      ctx.fillStyle = rimGrad;
      ctx.fillRect(0, 0, width, height);

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    return () => {
      cancelAnimationFrame(animationFrameId);
      ro.disconnect();
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
      card.removeEventListener("touchmove", handleTouchMove);
      card.removeEventListener("touchend", handleTouchEnd);
    };
  }, [tileSize, gap, spotlightRadius, spinSpeed]);

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 z-0 rounded-3xl overflow-hidden pointer-events-none"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />
    </div>
  );
}
