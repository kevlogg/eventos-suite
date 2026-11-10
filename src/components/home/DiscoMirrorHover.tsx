"use client";

import { useEffect, useRef } from "react";

interface DiscoMirrorHoverProps {
  /** Size in pixels of each square mirror tile (default: 18) */
  tileSize?: number;
  /** Gap in pixels between mirror tiles (default: 2) */
  gap?: number;
  /** Radius in pixels of the spotlight glow around mouse (default: 135) */
  spotlightRadius?: number;
  /** Optional legacy props for compatibility */
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

/**
 * Draws a rounded rectangle path cross-browser
 */
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
  gap = 2,
  spotlightRadius = 135,
}: DiscoMirrorHoverProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let isHovered = false;
    let hoverAlpha = 0; // 0 (hidden) to 1 (fully active)

    const targetMouse = { x: -9999, y: -9999 };
    const currentMouse = { x: -9999, y: -9999 };

    let width = 0;
    let height = 0;
    let dpr = 1;

    const updateSize = () => {
      const rect = parent.getBoundingClientRect();
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
    ro.observe(parent);

    // Event handlers attached to the parent card
    const handlePointerEnter = (e: PointerEvent) => {
      isHovered = true;
      const rect = parent.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      targetMouse.x = x;
      targetMouse.y = y;
      if (currentMouse.x < -1000) {
        currentMouse.x = x;
        currentMouse.y = y;
      }
      // Kick off render loop if it was idle
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(render);
    };

    const handlePointerMove = (e: PointerEvent) => {
      isHovered = true;
      const rect = parent.getBoundingClientRect();
      targetMouse.x = e.clientX - rect.left;
      targetMouse.y = e.clientY - rect.top;
    };

    const handlePointerLeave = () => {
      isHovered = false;
    };

    parent.addEventListener("pointerenter", handlePointerEnter);
    parent.addEventListener("pointermove", handlePointerMove);
    parent.addEventListener("pointerleave", handlePointerLeave);

    // ─── RENDER LOOP ───
    const step = tileSize + gap;

    const render = () => {
      // Smooth fade in / out
      if (isHovered) {
        hoverAlpha += (1 - hoverAlpha) * 0.18;
      } else {
        hoverAlpha += (0 - hoverAlpha) * 0.12;
      }

      // If fully faded out and not hovered, clear and idle
      if (!isHovered && hoverAlpha < 0.005) {
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

      // ─── 1. RADIAL SPOTLIGHT POOL AROUND MOUSE ───
      if (currentMouse.x > -500 && hoverAlpha > 0.01) {
        const poolGrad = ctx.createRadialGradient(
          currentMouse.x,
          currentMouse.y,
          0,
          currentMouse.x,
          currentMouse.y,
          spotlightRadius * 1.15
        );
        poolGrad.addColorStop(0, `rgba(255, 255, 255, ${0.28 * hoverAlpha})`);
        poolGrad.addColorStop(0.35, `rgba(226, 232, 240, ${0.14 * hoverAlpha})`);
        poolGrad.addColorStop(0.7, `rgba(148, 163, 184, ${0.05 * hoverAlpha})`);
        poolGrad.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = poolGrad;
        ctx.fillRect(0, 0, width, height);
      }

      // Calculate grid to center tiles within the card
      const cols = Math.ceil(width / step) + 1;
      const rows = Math.ceil(height / step) + 1;
      const totalW = cols * step - gap;
      const totalH = rows * step - gap;
      const startX = Math.floor((width - totalW) / 2);
      const startY = Math.floor((height - totalH) / 2);

      const cornerRadius = 1.8;

      // ─── 2. DRAW MIRROR TILES ───
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = startX + c * step;
          const y = startY + r * step;

          // Skip if completely outside card bounds
          if (x + tileSize < 0 || x > width || y + tileSize < 0 || y > height) {
            continue;
          }

          const cx = x + tileSize / 2;
          const cy = y + tileSize / 2;
          const dist = Math.hypot(cx - currentMouse.x, cy - currentMouse.y);

          // Base silver shade for this tile (exact disco ball palette)
          const shade = SILVER_SHADES[(r * 5 + c * 3) % SILVER_SHADES.length];

          if (dist > spotlightRadius) {
            // ─── UNLIT RESTING MIRROR TILE ───
            // Subtle dark chrome mirror facet (reveals the disco ball mirror grid)
            const tileAlpha = 0.14 * hoverAlpha;
            if (tileAlpha > 0.005) {
              drawTilePath(ctx, x, y, tileSize, cornerRadius);
              ctx.fillStyle = `rgba(${shade.r}, ${shade.g}, ${shade.b}, ${tileAlpha})`;
              ctx.fill();

              // Top bevel highlight
              ctx.strokeStyle = `rgba(255, 255, 255, ${0.18 * hoverAlpha})`;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(x + cornerRadius, y + 0.5);
              ctx.lineTo(x + tileSize - cornerRadius, y + 0.5);
              ctx.stroke();

              // Dark seam bottom
              ctx.strokeStyle = `rgba(0, 0, 0, ${0.45 * hoverAlpha})`;
              ctx.beginPath();
              ctx.moveTo(x + cornerRadius, y + tileSize - 0.5);
              ctx.lineTo(x + tileSize - cornerRadius, y + tileSize - 0.5);
              ctx.stroke();
            }
          } else {
            // ─── ACTIVE ILLUMINATED MIRROR TILE (UNDER / NEAR MOUSE) ───
            const normDist = dist / spotlightRadius; // 0 at cursor, 1 at edge
            const proximity = 1 - normDist;

            // Direct hit under the cursor: Pure bright white specular mirror facet!
            if (dist < 26) {
              drawTilePath(ctx, x, y, tileSize, cornerRadius);

              // Pure glowing white mirror facet (like the white tile on the disco ball)
              ctx.fillStyle = `rgba(255, 255, 255, ${0.98 * hoverAlpha})`;
              ctx.fill();

              // Pure white bevel
              ctx.strokeStyle = `rgba(255, 255, 255, ${hoverAlpha})`;
              ctx.lineWidth = 1.2;
              ctx.stroke();

              // Inner specular glare
              ctx.fillStyle = `rgba(255, 255, 255, ${0.7 * hoverAlpha})`;
              ctx.fillRect(x + 2, y + 2, tileSize - 4, tileSize - 4);
            } else {
              // Neighboring tiles catching the specular reflection
              const falloff = Math.pow(proximity, 1.4);

              // Facet angle specular flash variation (like individual mirrors reflecting light)
              const facetOffset = Math.sin(c * 13.7 + r * 19.3) * 0.22;
              const intensity = Math.min(1, Math.max(0, falloff + facetOffset * falloff));

              drawTilePath(ctx, x, y, tileSize, cornerRadius);

              // Metallic silver gradient across the facet
              const grad = ctx.createLinearGradient(x, y, x + tileSize, y + tileSize);
              const brightA = (0.25 + 0.72 * intensity) * hoverAlpha;
              const midA = (0.18 + 0.65 * intensity) * hoverAlpha;
              const darkA = (0.12 + 0.45 * intensity) * hoverAlpha;

              grad.addColorStop(0, `rgba(255, 255, 255, ${brightA})`);
              grad.addColorStop(0.45, `rgba(${shade.r}, ${shade.g}, ${shade.b}, ${midA})`);
              grad.addColorStop(1, `rgba(148, 163, 184, ${darkA})`);

              ctx.fillStyle = grad;
              ctx.fill();

              // ─── 3D MIRROR BEVEL HIGHLIGHTS ───
              // Top edge specular line
              ctx.strokeStyle = `rgba(255, 255, 255, ${(0.3 + 0.68 * intensity) * hoverAlpha})`;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(x + cornerRadius, y + 0.5);
              ctx.lineTo(x + tileSize - cornerRadius, y + 0.5);
              ctx.stroke();

              // Left edge specular line
              ctx.strokeStyle = `rgba(255, 255, 255, ${(0.2 + 0.55 * intensity) * hoverAlpha})`;
              ctx.beginPath();
              ctx.moveTo(x + 0.5, y + cornerRadius);
              ctx.lineTo(x + 0.5, y + tileSize - cornerRadius);
              ctx.stroke();

              // Bottom edge shadow
              ctx.strokeStyle = `rgba(0, 0, 0, ${(0.4 - 0.2 * intensity) * hoverAlpha})`;
              ctx.beginPath();
              ctx.moveTo(x + cornerRadius, y + tileSize - 0.5);
              ctx.lineTo(x + tileSize - cornerRadius, y + tileSize - 0.5);
              ctx.stroke();

              // Right edge shadow
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
      parent.removeEventListener("pointerenter", handlePointerEnter);
      parent.removeEventListener("pointermove", handlePointerMove);
      parent.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [tileSize, gap, spotlightRadius]);

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
