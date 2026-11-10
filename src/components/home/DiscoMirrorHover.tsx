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

// Silver shades matching the 3D disco ball in DiscoBallHero
const SILVER_SHADES = [
  { r: 219, g: 226, b: 234 }, // #dbe2ea
  { r: 208, g: 215, b: 226 }, // #d0d7e2
  { r: 238, g: 243, b: 248 }, // #eef3f8
  { r: 196, g: 203, b: 213 }, // #c4cbd5
  { r: 229, g: 235, b: 242 }, // #e5ebf2
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
        glow.addColorStop(0, `rgba(255, 255, 255, ${0.35 * hoverAlpha})`);
        glow.addColorStop(0.35, `rgba(226, 232, 240, ${0.18 * hoverAlpha})`);
        glow.addColorStop(0.75, `rgba(148, 163, 184, ${0.07 * hoverAlpha})`);
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

      // ─── 2. DRAW ROTATING DISCO BALL MIRROR TILES ───
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

          if (dist > spotlightRadius) {
            // ─── RESTING ROTATING MIRROR TILE ───
            drawTilePath(ctx, x, y, tileSize, cornerRadius);

            const restAlpha = 0.28 * hoverAlpha;
            const grad = ctx.createLinearGradient(x, y, x + tileSize, y + tileSize);
            grad.addColorStop(0, `rgba(${shade.r}, ${shade.g}, ${shade.b}, ${restAlpha + 0.1})`);
            grad.addColorStop(0.5, `rgba(${Math.floor(shade.r * 0.7)}, ${Math.floor(shade.g * 0.7)}, ${Math.floor(shade.b * 0.7)}, ${restAlpha})`);
            grad.addColorStop(1, `rgba(18, 22, 32, ${restAlpha + 0.12})`);

            ctx.fillStyle = grad;
            ctx.fill();

            // Top specular bevel line
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.35 * hoverAlpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(x + cornerRadius, y + 0.5);
            ctx.lineTo(x + tileSize - cornerRadius, y + 0.5);
            ctx.stroke();

            // Left specular bevel line
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.22 * hoverAlpha})`;
            ctx.beginPath();
            ctx.moveTo(x + 0.5, y + cornerRadius);
            ctx.lineTo(x + 0.5, y + tileSize - cornerRadius);
            ctx.stroke();

            // Bottom & right dark seams
            ctx.strokeStyle = `rgba(0, 0, 0, ${0.65 * hoverAlpha})`;
            ctx.beginPath();
            ctx.moveTo(x + cornerRadius, y + tileSize - 0.5);
            ctx.lineTo(x + tileSize - cornerRadius, y + tileSize - 0.5);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(x + tileSize - 0.5, y + cornerRadius);
            ctx.lineTo(x + tileSize - cornerRadius, y + tileSize - 0.5);
            ctx.stroke();
          } else {
            // ─── ACTIVE SPOTLIGHT TILE (UNDER / NEAR MOUSE) ───
            const normDist = dist / spotlightRadius;
            const proximity = 1 - normDist;

            if (dist < 24) {
              // Direct hit under cursor: Pure bright white specular hotspot!
              drawTilePath(ctx, x, y, tileSize, cornerRadius);

              ctx.fillStyle = `rgba(255, 255, 255, ${0.98 * hoverAlpha})`;
              ctx.fill();

              ctx.strokeStyle = `rgba(255, 255, 255, ${hoverAlpha})`;
              ctx.lineWidth = 1.2;
              ctx.stroke();

              ctx.fillStyle = `rgba(255, 255, 255, ${0.92 * hoverAlpha})`;
              ctx.fillRect(x + 2, y + 2, tileSize - 4, tileSize - 4);
            } else {
              // Neighboring tiles catching the reflection
              const falloff = Math.pow(proximity, 1.3);
              const facetOffset = Math.sin(colId * 11.7 + r * 17.3) * 0.22;
              const intensity = Math.min(1, Math.max(0, falloff + facetOffset * falloff));

              drawTilePath(ctx, x, y, tileSize, cornerRadius);

              const grad = ctx.createLinearGradient(x, y, x + tileSize, y + tileSize);
              const brightA = (0.35 + 0.65 * intensity) * hoverAlpha;
              const midA = (0.28 + 0.62 * intensity) * hoverAlpha;
              const darkA = (0.18 + 0.45 * intensity) * hoverAlpha;

              grad.addColorStop(0, `rgba(255, 255, 255, ${brightA})`);
              grad.addColorStop(0.4, `rgba(${shade.r}, ${shade.g}, ${shade.b}, ${midA})`);
              grad.addColorStop(1, `rgba(148, 163, 184, ${darkA})`);

              ctx.fillStyle = grad;
              ctx.fill();

              // 3D Mirror Bevel highlights
              ctx.strokeStyle = `rgba(255, 255, 255, ${(0.42 + 0.58 * intensity) * hoverAlpha})`;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(x + cornerRadius, y + 0.5);
              ctx.lineTo(x + tileSize - cornerRadius, y + 0.5);
              ctx.stroke();

              ctx.strokeStyle = `rgba(255, 255, 255, ${(0.3 + 0.55 * intensity) * hoverAlpha})`;
              ctx.beginPath();
              ctx.moveTo(x + 0.5, y + cornerRadius);
              ctx.lineTo(x + 0.5, y + tileSize - cornerRadius);
              ctx.stroke();

              ctx.strokeStyle = `rgba(0, 0, 0, ${(0.55 - 0.25 * intensity) * hoverAlpha})`;
              ctx.beginPath();
              ctx.moveTo(x + cornerRadius, y + tileSize - 0.5);
              ctx.lineTo(x + tileSize - cornerRadius, y + tileSize - 0.5);
              ctx.stroke();
              ctx.beginPath();
              ctx.moveTo(x + tileSize - 0.5, y + cornerRadius);
              ctx.lineTo(x + tileSize - cornerRadius, y + tileSize - 0.5);
              ctx.stroke();
            }
          }
        }
      }

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
