"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { ChevronDown, Sparkles } from "lucide-react";

export default function DiscoBallHero() {
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const heroInteractionRef = useRef<HTMLDivElement>(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToContent = useCallback(() => {
    const nextSection = document.getElementById("servicios");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    const canvasContainer = canvasContainerRef.current;
    const heroEl = heroInteractionRef.current;
    if (!canvasContainer) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    // ─── 1. SCENE, CAMERA & RENDERER ───
    const scene = new THREE.Scene();
    // Gentle fog that doesn't abruptly clip the long downward light rays
    scene.fog = new THREE.FogExp2(0x020205, 0.012);

    const camera = new THREE.PerspectiveCamera(48, width / height, 0.1, 120);
    // Position camera looking slightly upwards towards the hanging disco ball
    const isMobile = width < 768;
    camera.position.set(0, 0.2, isMobile ? 6.8 : 6.0);
    camera.lookAt(0, 0.3, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;

    canvasContainer.appendChild(renderer.domElement);

    // ─── 2. HIERARCHY ROOT & DISCO BALL GROUP ───
    // Base Y position: hanging in the upper half of the screen like a club ceiling ball
    const baseY = isMobile ? 1.15 : 1.35;
    const rootGroup = new THREE.Group();
    rootGroup.position.set(0, baseY, 0);
    scene.add(rootGroup);

    const ballGroup = new THREE.Group();
    // Stylish slight tilt
    ballGroup.rotation.z = THREE.MathUtils.degToRad(7);
    ballGroup.rotation.x = THREE.MathUtils.degToRad(12);
    rootGroup.add(ballGroup);

    // Ball dimensions: more balanced & refined size (not giant)
    const ballRadius = isMobile ? 1.35 : 1.55;

    // Inner dark sphere (for authentic dark grout/seams between tiles)
    const innerGeo = new THREE.SphereGeometry(ballRadius * 0.985, 32, 32);
    const innerMat = new THREE.MeshBasicMaterial({ color: 0x08080c });
    const innerSphere = new THREE.Mesh(innerGeo, innerMat);
    ballGroup.add(innerSphere);

    // ─── 3. DISCO MIRROR TILES (INSTANCED MESH) ───
    const rings = 24;
    const tileWidth = 0.145;
    const tileHeight = 0.145;
    const tileDepth = 0.028;

    interface TileData {
      index: number;
      ring: number;
      col: number;
      totalInRing: number;
      baseColor: THREE.Color;
      pos: THREE.Vector3;
    }

    const tilesData: TileData[] = [];
    const dummy = new THREE.Object3D();

    // Natural plateado / chrome mirror variations
    const silverShades = [
      new THREE.Color(0xdce3eb),
      new THREE.Color(0xd0d7e2),
      new THREE.Color(0xeef3f8),
      new THREE.Color(0xc2cad6),
      new THREE.Color(0xe4ebf3),
    ];

    for (let r = 2; r < rings - 2; r++) {
      const phi = (r / (rings - 1)) * Math.PI; // 0 to PI
      const ringRadius = ballRadius * Math.sin(phi);
      const y = ballRadius * Math.cos(phi);

      const circum = 2 * Math.PI * ringRadius;
      const count = Math.max(8, Math.round(circum / (tileWidth * 1.12)));
      const offset = r % 2 === 0 ? Math.PI / count : 0;

      for (let c = 0; c < count; c++) {
        const theta = (c / count) * Math.PI * 2 + offset;
        const x = ringRadius * Math.cos(theta);
        const z = ringRadius * Math.sin(theta);

        const pos = new THREE.Vector3(x, y, z);
        const baseColor = silverShades[(r * 5 + c * 3) % silverShades.length].clone();

        tilesData.push({
          index: tilesData.length,
          ring: r,
          col: c,
          totalInRing: count,
          baseColor,
          pos,
        });
      }
    }

    const tileGeo = new THREE.BoxGeometry(tileWidth, tileHeight, tileDepth);
    const tileMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.94,
      roughness: 0.12,
      envMapIntensity: 2.2,
    });

    const instancedTiles = new THREE.InstancedMesh(tileGeo, tileMat, tilesData.length);
    instancedTiles.instanceMatrix.setUsage(THREE.DynamicDrawUsage);

    for (let i = 0; i < tilesData.length; i++) {
      const t = tilesData[i];
      dummy.position.copy(t.pos);
      dummy.lookAt(t.pos.clone().multiplyScalar(2));
      dummy.updateMatrix();
      instancedTiles.setMatrixAt(i, dummy.matrix);
      instancedTiles.setColorAt(i, t.baseColor);
    }
    instancedTiles.instanceColor!.needsUpdate = true;
    instancedTiles.instanceMatrix.needsUpdate = true;
    ballGroup.add(instancedTiles);

    // ─── 4. DOWNWARD FOCUS VOLUMETRIC LIGHT BEAMS (LIKE USER REFERENCE) ───
    const lightRaysGroup = new THREE.Group();
    rootGroup.add(lightRaysGroup);

    const rayColors = [
      new THREE.Color(0x00f5ff), // Electric Cyan
      new THREE.Color(0xff007f), // Hot Magenta
      new THREE.Color(0xffb700), // Laser Yellow / Amber (seen in ref image)
      new THREE.Color(0x00ff88), // Club Lime Green (seen in ref image)
      new THREE.Color(0x9d00ff), // Deep Violet
      new THREE.Color(0xff3d00), // Neon Orange
      new THREE.Color(0x3b82f6), // Electric Blue
      new THREE.Color(0xff00aa), // Hot Pink
      new THREE.Color(0x10b981), // Emerald
      new THREE.Color(0xfacc15), // Gold
    ];

    // Long downward shafts of light (35 units long to project across the whole page!)
    const beamLength = 36;
    const beamGeo = new THREE.CylinderGeometry(0.12, 3.2, beamLength, 24, 1, true);
    // Anchor pivot so the narrow top is at (0, 0, 0) right at the ball
    beamGeo.translate(0, -beamLength / 2, 0);

    const rayCount = 10;
    for (let i = 0; i < rayCount; i++) {
      const color = rayColors[i % rayColors.length];
      const beamMat = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.16,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        depthWrite: false,
      });

      const beamMesh = new THREE.Mesh(beamGeo, beamMat);

      // Downward conical distribution:
      // Angles flare away from straight-down (-Y) between 22° and 54°
      const pitchAwayFromDown = THREE.MathUtils.degToRad(22 + (i % 5) * 8);
      const azimuthAngle = (i / rayCount) * Math.PI * 2;

      // Group to orient the beam downward and fanning outwards
      const pivot = new THREE.Group();
      pivot.rotation.y = azimuthAngle;
      pivot.rotation.x = pitchAwayFromDown; // tilts outwards from straight down
      pivot.add(beamMesh);

      lightRaysGroup.add(pivot);
    }

    // ─── 5. BACKGROUND STARFIELD / PARTICLES ───
    const starCount = 500;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      const radius = 10 + Math.random() * 26;
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const sinPhi = Math.sin(phi);

      starPositions[i * 3] = radius * sinPhi * Math.cos(theta);
      starPositions[i * 3 + 1] = radius * sinPhi * Math.sin(theta);
      starPositions[i * 3 + 2] = radius * Math.cos(phi);

      const isWarm = Math.random() > 0.45;
      starColors[i * 3] = isWarm ? 1 : 0.75;
      starColors[i * 3 + 1] = isWarm ? 0.92 : 0.85;
      starColors[i * 3 + 2] = 1;
    }

    starGeo.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute("color", new THREE.BufferAttribute(starColors, 3));

    const starMat = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // ─── 6. LIGHTING ───
    // Warm top spotlight for authentic upper-curve specular reflection
    const topSpot = new THREE.DirectionalLight(0xfff0dd, 3.4);
    topSpot.position.set(1.2, 4.2, 3.2);
    scene.add(topSpot);

    const ambientLight = new THREE.AmbientLight(0x222230, 1.1);
    scene.add(ambientLight);

    // Colored accent rim lights
    const pinkRim = new THREE.PointLight(0xff0088, 4.0, 16);
    pinkRim.position.set(-4, -0.5, 2);
    scene.add(pinkRim);

    const cyanRim = new THREE.PointLight(0x00f0ff, 4.0, 16);
    cyanRim.position.set(4, 1.5, 2);
    scene.add(cyanRim);

    // ─── 7. INTERACTIVE ROTATION & MOMENTUM (ATTACHED TO HERO) ───
    let isDragging = false;
    let prevPointerX = 0;
    let prevPointerY = 0;
    let velocityX = 0;
    let velocityY = 0;
    const baseAutoSpeedY = 0.007;

    const onPointerDown = (clientX: number, clientY: number) => {
      isDragging = true;
      setIsInteracting(true);
      prevPointerX = clientX;
      prevPointerY = clientY;
      velocityX = 0;
      velocityY = 0;
    };

    const onPointerMove = (clientX: number, clientY: number) => {
      if (!isDragging) return;
      const deltaX = clientX - prevPointerX;
      const deltaY = clientY - prevPointerY;

      velocityY = deltaX * 0.0035;
      velocityX = deltaY * 0.0035;

      ballGroup.rotation.y += velocityY;
      ballGroup.rotation.x += velocityX;

      prevPointerX = clientX;
      prevPointerY = clientY;
    };

    const onPointerUp = () => {
      isDragging = false;
      setTimeout(() => setIsInteracting(false), 800);
    };

    const handleMouseDown = (e: MouseEvent) => onPointerDown(e.clientX, e.clientY);
    const handleMouseMove = (e: MouseEvent) => onPointerMove(e.clientX, e.clientY);
    const handleMouseUp = () => onPointerUp();

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        onPointerDown(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        onPointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const handleTouchEnd = () => onPointerUp();

    if (heroEl) {
      heroEl.addEventListener("mousedown", handleMouseDown);
      heroEl.addEventListener("touchstart", handleTouchStart, { passive: true });
    }
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);

    // ─── 8. NEON TILES CLUSTER PATTERNS ───
    const neonPalette = [
      new THREE.Color(0xff007f), // Hot Magenta
      new THREE.Color(0x00f5ff), // Electric Cyan
      new THREE.Color(0xffeb3b), // Laser Yellow
      new THREE.Color(0xff2244), // Crimson Red
      new THREE.Color(0xff7700), // Neon Orange
      new THREE.Color(0x00e676), // Lime Green
      new THREE.Color(0x3b82f6), // Electric Blue
      new THREE.Color(0xd946ef), // Radiant Pink
    ];

    const tempColor = new THREE.Color();
    const clock = new THREE.Clock();

    // ─── 9. ANIMATION LOOP & SCROLL TRACKING ───
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Inertia & Auto-spin damping
      if (!isDragging) {
        velocityY = velocityY * 0.94 + baseAutoSpeedY * 0.06;
        velocityX = velocityX * 0.92;
        ballGroup.rotation.y += velocityY;
        ballGroup.rotation.x += velocityX;
      }

      // Smooth scroll parallax:
      // As user scrolls down, the ball gently rises up so it stays hidden above,
      // while the long downward beams continue casting downwards across the page!
      const currentScrollY = window.scrollY;
      const scrollOffset = currentScrollY * 0.0035;
      rootGroup.position.y = baseY + scrollOffset;

      // Rotate downward light rays continuously like dancefloor moving lights
      lightRaysGroup.rotation.y = elapsedTime * 0.15;
      lightRaysGroup.rotation.z = Math.sin(elapsedTime * 0.12) * 0.08;

      // Orbit rim lights
      pinkRim.position.x = Math.sin(elapsedTime * 0.55) * 4.2;
      pinkRim.position.z = Math.cos(elapsedTime * 0.55) * 3.2;

      cyanRim.position.x = -Math.sin(elapsedTime * 0.45) * 4.2;
      cyanRim.position.z = -Math.cos(elapsedTime * 0.45) * 3.2;

      // Twinkle starfield
      starField.rotation.y = elapsedTime * 0.012;

      // Dynamic shifting neon tiles
      for (let i = 0; i < tilesData.length; i++) {
        const t = tilesData[i];

        const wave1 = Math.sin(t.ring * 0.65 - elapsedTime * 2.2 + t.col * 0.35);
        const wave2 = Math.cos(t.col * 0.5 + elapsedTime * 1.8 - t.ring * 0.4);
        const wave3 = Math.sin(t.ring * 0.9 + t.col * 0.2 + elapsedTime * 1.5);

        const isColoredCluster = wave1 > 0.72 && wave2 > 0.35;
        const isRunnerBeam = wave3 > 0.88;

        if (isColoredCluster || isRunnerBeam) {
          const colorIdx =
            Math.floor(Math.abs(t.ring * 3 + t.col + elapsedTime * 2)) % neonPalette.length;
          tempColor.copy(neonPalette[colorIdx]);
          instancedTiles.setColorAt(i, tempColor);
        } else {
          instancedTiles.setColorAt(i, t.baseColor);
        }
      }
      instancedTiles.instanceColor!.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      const mobile = w < 768;
      camera.position.set(0, 0.2, mobile ? 6.8 : 6.0);
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      if (heroEl) {
        heroEl.removeEventListener("mousedown", handleMouseDown);
        heroEl.removeEventListener("touchstart", handleTouchStart);
      }
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);

      tileGeo.dispose();
      tileMat.dispose();
      beamGeo.dispose();
      starGeo.dispose();
      starMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <>
      {/* ─── FIXED BACKGROUND 3D CANVAS (EXTENDS ACROSS ENTIRE PAGE) ─── */}
      <div
        ref={canvasContainerRef}
        aria-hidden="true"
        className="fixed inset-0 w-full h-full z-0 pointer-events-none"
      />

      {/* ─── PANTALLA 1: HERO OVERLAY (CAPTURES DRAG INTERACTION) ─── */}
      <section
        ref={heroInteractionRef}
        className="relative z-10 w-full h-screen flex flex-col justify-between items-center py-8 px-4 select-none cursor-grab active:cursor-grabbing"
        style={{ touchAction: "none" }}
      >
        {/* Top Hint: Fades out on drag or scroll */}
        <div
          className={`transition-all duration-700 pointer-events-none ${
            isInteracting || hasScrolled ? "opacity-0 -translate-y-3" : "opacity-80"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/60 border border-slate-700/50 text-slate-300 text-xs font-medium tracking-wide backdrop-blur-md shadow-lg">
            <Sparkles size={13} className="text-amber-400 animate-pulse" />
            <span>Arrastrá para hacer girar la bola</span>
          </div>
        </div>

        {/* Bottom Floating Scroll Prompt */}
        <button
          type="button"
          onClick={scrollToContent}
          className={`flex flex-col items-center gap-2 cursor-pointer transition-all duration-700 group ${
            hasScrolled ? "opacity-0 pointer-events-none translate-y-4" : "opacity-90 hover:opacity-100"
          }`}
        >
          <span className="text-[11px] sm:text-xs uppercase tracking-widest font-semibold text-slate-400 group-hover:text-white transition-colors drop-shadow-md">
            Deslizá para descubrir
          </span>
          <div className="w-9 h-9 rounded-full bg-slate-900/70 border border-slate-700/70 flex items-center justify-center text-slate-300 group-hover:text-white group-hover:border-indigo-500/70 group-hover:bg-indigo-950/50 transition-all shadow-[0_0_20px_rgba(99,102,241,0.25)] animate-bounce">
            <ChevronDown size={18} />
          </div>
        </button>
      </section>
    </>
  );
}
