"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { ChevronDown, Sparkles } from "lucide-react";

export default function DiscoBallHero() {
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
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
    const heroEl = heroRef.current;
    if (!canvasContainer) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    // ─── 1. SCENE, CAMERA & RENDERER ───
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020205, 0.01);

    const camera = new THREE.PerspectiveCamera(46, width / height, 0.1, 150);
    const isMobile = width < 768;
    camera.position.set(0, 0.25, isMobile ? 6.6 : 5.8);
    camera.lookAt(0, 0.4, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;

    canvasContainer.appendChild(renderer.domElement);

    // ─── 2. HIERARCHY ROOT & DISCO BALL ───
    // Positioned at top hanging from ceiling (as in user reference)
    const baseY = isMobile ? 1.25 : 1.45;
    const rootGroup = new THREE.Group();
    rootGroup.position.set(0, baseY, 0);
    scene.add(rootGroup);

    const ballGroup = new THREE.Group();
    ballGroup.rotation.z = THREE.MathUtils.degToRad(6);
    ballGroup.rotation.x = THREE.MathUtils.degToRad(12);
    rootGroup.add(ballGroup);

    // Well-balanced ball radius
    const ballRadius = isMobile ? 1.25 : 1.45;

    // Inner dark sphere (dark seams between tiles)
    const innerGeo = new THREE.SphereGeometry(ballRadius * 0.985, 32, 32);
    const innerMat = new THREE.MeshBasicMaterial({ color: 0x050508 });
    const innerSphere = new THREE.Mesh(innerGeo, innerMat);
    ballGroup.add(innerSphere);

    // ─── 3. DISCO MIRROR TILES (PLATEADOS / SILVER) ───
    const rings = 23;
    const tileWidth = 0.145;
    const tileHeight = 0.145;
    const tileDepth = 0.026;

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
      new THREE.Color(0xdbe2ea),
      new THREE.Color(0xd0d7e2),
      new THREE.Color(0xeef3f8),
      new THREE.Color(0xc4cbd5),
      new THREE.Color(0xe5ebf2),
    ];

    for (let r = 2; r < rings - 2; r++) {
      const phi = (r / (rings - 1)) * Math.PI;
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
      metalness: 0.95,
      roughness: 0.11,
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

    // ─── 4. SEPARATE, DISTINCT DOWNWARD LIGHT BEAMS (LIKE USER REFERENCE) ───
    const lightRaysGroup = new THREE.Group();
    rootGroup.add(lightRaysGroup);

    // Explicit separate downward directions spreading out into the room
    const beamsConfig = [
      { dir: new THREE.Vector3(-0.65, -0.75, 0.15).normalize(), color: 0x00f5ff, opacity: 0.17 }, // Cyan down-left
      { dir: new THREE.Vector3(0.65, -0.72, 0.22).normalize(), color: 0xff007f, opacity: 0.17 },  // Magenta down-right
      { dir: new THREE.Vector3(-0.25, -0.92, -0.3).normalize(), color: 0xffb700, opacity: 0.19 }, // Amber/Yellow down-center (as in ref)
      { dir: new THREE.Vector3(0.28, -0.9, -0.32).normalize(), color: 0x00ff88, opacity: 0.17 },  // Lime Green down-forward (as in ref)
      { dir: new THREE.Vector3(-0.75, -0.55, -0.35).normalize(), color: 0x9d00ff, opacity: 0.15 },// Deep Violet down-left
      { dir: new THREE.Vector3(0.78, -0.52, 0.35).normalize(), color: 0xff3d00, opacity: 0.15 },  // Orange down-right
    ];

    const coneLength = 40; // Long shafts reaching all the way down
    const defaultDown = new THREE.Vector3(0, -1, 0);

    beamsConfig.forEach((cfg) => {
      // Individual cone geometry translated so apex is at (0, 0, 0)
      const coneGeo = new THREE.ConeGeometry(2.2, coneLength, 20, 1, true);
      coneGeo.translate(0, -coneLength / 2, 0);

      const mat = new THREE.MeshBasicMaterial({
        color: cfg.color,
        transparent: true,
        opacity: cfg.opacity,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        depthWrite: false,
      });

      const cone = new THREE.Mesh(coneGeo, mat);
      // Perfect rotation using quaternion from down vector to cfg.dir:
      cone.quaternion.setFromUnitVectors(defaultDown, cfg.dir);
      lightRaysGroup.add(cone);
    });

    // ─── 5. BACKGROUND STARFIELD ───
    const starCount = 450;
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
    // Warm top spotlight for specular reflection on upper curve
    const topSpot = new THREE.DirectionalLight(0xfff0dd, 3.5);
    topSpot.position.set(1.2, 4.2, 3.2);
    scene.add(topSpot);

    const ambientLight = new THREE.AmbientLight(0x202028, 1.1);
    scene.add(ambientLight);

    const pinkRim = new THREE.PointLight(0xff0088, 3.8, 15);
    pinkRim.position.set(-4, -0.5, 2);
    scene.add(pinkRim);

    const cyanRim = new THREE.PointLight(0x00f0ff, 3.8, 15);
    cyanRim.position.set(4, 1.5, 2);
    scene.add(cyanRim);

    // ─── 7. INTERACTIVE ROTATION & MOMENTUM (HERO BOUND) ───
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

    // ─── 8. NEON CLUSTER TILES PALETTE ───
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

    // ─── 9. ANIMATION LOOP ───
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

      // Rotate light rays gently around Y axis (sweeping through 3D space)
      lightRaysGroup.rotation.y = elapsedTime * 0.12;
      lightRaysGroup.rotation.z = Math.sin(elapsedTime * 0.08) * 0.05;

      // Orbit rim lights
      pinkRim.position.x = Math.sin(elapsedTime * 0.55) * 4.2;
      pinkRim.position.z = Math.cos(elapsedTime * 0.55) * 3.2;

      cyanRim.position.x = -Math.sin(elapsedTime * 0.45) * 4.2;
      cyanRim.position.z = -Math.cos(elapsedTime * 0.45) * 3.2;

      starField.rotation.y = elapsedTime * 0.012;

      // Dynamic shifting neon tiles on top of silver base
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
      camera.position.set(0, 0.25, mobile ? 6.6 : 5.8);
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
      {/* ─── FIXED 3D CANVAS IN BACKGROUND ACROSS THE ENTIRE PAGE ─── */}
      <div
        ref={canvasContainerRef}
        aria-hidden="true"
        className="fixed inset-0 w-full h-full -z-10 pointer-events-none"
      />

      {/* ─── PANTALLA 1: HERO SCREEN PINNED (STICKY TOP-0 H-SCREEN) ─── */}
      <section
        ref={heroRef}
        className="sticky top-0 h-screen w-full z-10 flex flex-col justify-between items-center py-8 px-4 select-none cursor-grab active:cursor-grabbing bg-transparent"
        style={{ touchAction: "none" }}
      >
        {/* Top Hint: Fades out on drag or scroll */}
        <div
          className={`transition-all duration-700 pointer-events-none ${
            isInteracting || hasScrolled ? "opacity-0 -translate-y-3" : "opacity-80"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 border border-white/15 text-slate-300 text-xs font-medium tracking-wide backdrop-blur-md shadow-lg">
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
          <div className="w-9 h-9 rounded-full bg-black/70 border border-white/20 flex items-center justify-center text-slate-300 group-hover:text-white group-hover:border-indigo-400/70 group-hover:bg-indigo-950/50 transition-all shadow-[0_0_20px_rgba(99,102,241,0.25)] animate-bounce">
            <ChevronDown size={18} />
          </div>
        </button>
      </section>
    </>
  );
}
