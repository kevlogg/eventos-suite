"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { ChevronDown, Sparkles } from "lucide-react";

export default function DiscoBallHero() {
  const containerRef = useRef<HTMLDivElement>(null);
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
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;
    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // ─── 1. SCENE, CAMERA & RENDERER ───
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030308, 0.03);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    // Responsive camera distance
    const isMobile = width < 768;
    camera.position.set(0, isMobile ? 0.2 : 0, isMobile ? 6.8 : 5.8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    container.appendChild(renderer.domElement);

    // ─── 2. DISCO BALL GROUP ───
    const ballGroup = new THREE.Group();
    // Default slight tilt for stylish disco angle
    ballGroup.rotation.z = THREE.MathUtils.degToRad(8);
    ballGroup.rotation.x = THREE.MathUtils.degToRad(10);
    scene.add(ballGroup);

    // Inner dark sphere (for authentic dark gaps/grout between tiles)
    const innerRadius = 2.0;
    const innerGeo = new THREE.SphereGeometry(innerRadius * 0.985, 36, 36);
    const innerMat = new THREE.MeshBasicMaterial({ color: 0x0a0a10 });
    const innerSphere = new THREE.Mesh(innerGeo, innerMat);
    ballGroup.add(innerSphere);

    // ─── 3. DISCO MIRROR TILES (INSTANCED MESH) ───
    const rings = 28;
    const tileWidth = 0.17;
    const tileHeight = 0.17;
    const tileDepth = 0.035;

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

    // Silver shades for natural mirror variation
    const silverShades = [
      new THREE.Color(0xdce3eb),
      new THREE.Color(0xd0d7e0),
      new THREE.Color(0xeef2f7),
      new THREE.Color(0xc2cad4),
      new THREE.Color(0xe5ebf2),
    ];

    // Compute tile positions along latitude rings
    for (let r = 2; r < rings - 2; r++) {
      const phi = (r / (rings - 1)) * Math.PI; // 0 to PI
      const ringRadius = innerRadius * Math.sin(phi);
      const y = innerRadius * Math.cos(phi);

      const circum = 2 * Math.PI * ringRadius;
      const count = Math.max(8, Math.round(circum / (tileWidth * 1.15)));
      const offset = r % 2 === 0 ? Math.PI / count : 0;

      for (let c = 0; c < count; c++) {
        const theta = (c / count) * Math.PI * 2 + offset;
        const x = ringRadius * Math.cos(theta);
        const z = ringRadius * Math.sin(theta);

        const pos = new THREE.Vector3(x, y, z);
        const baseColor = silverShades[(r * 7 + c * 3) % silverShades.length].clone();

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
      metalness: 0.92,
      roughness: 0.14,
      envMapIntensity: 2.0,
    });

    const instancedTiles = new THREE.InstancedMesh(tileGeo, tileMat, tilesData.length);
    instancedTiles.instanceMatrix.setUsage(THREE.DynamicDrawUsage);

    // Position and orient each tile along the sphere surface normal
    for (let i = 0; i < tilesData.length; i++) {
      const t = tilesData[i];
      dummy.position.copy(t.pos);
      // Look outward from center
      dummy.lookAt(t.pos.clone().multiplyScalar(2));
      dummy.updateMatrix();
      instancedTiles.setMatrixAt(i, dummy.matrix);
      instancedTiles.setColorAt(i, t.baseColor);
    }
    instancedTiles.instanceColor!.needsUpdate = true;
    instancedTiles.instanceMatrix.needsUpdate = true;
    ballGroup.add(instancedTiles);

    // ─── 4. VOLUMETRIC LIGHT RAYS ───
    const lightRaysGroup = new THREE.Group();
    scene.add(lightRaysGroup);

    const rayColors = [
      new THREE.Color(0xff0066), // Pink/Magenta
      new THREE.Color(0x00f0ff), // Cyan
      new THREE.Color(0xffb700), // Amber/Yellow
      new THREE.Color(0x9d00ff), // Deep Purple
      new THREE.Color(0xff2200), // Orange/Red
      new THREE.Color(0x00ff88), // Bright Green
      new THREE.Color(0x3b82f6), // Electric Blue
      new THREE.Color(0xff00aa), // Rose
    ];

    const rayCount = 10;
    const rays: { mesh: THREE.Mesh; baseAngle: number; speed: number; rotAxis: THREE.Vector3 }[] = [];

    const coneGeo = new THREE.ConeGeometry(0.9, 14, 16, 1, true);
    // Center the cone origin at the ball
    coneGeo.translate(0, 7, 0);

    for (let i = 0; i < rayCount; i++) {
      const color = rayColors[i % rayColors.length];
      const coneMat = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.12,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        depthWrite: false,
      });

      const cone = new THREE.Mesh(coneGeo, coneMat);

      // Random 3D directions radiating from the center
      const phi = Math.acos(-1 + (2 * i) / rayCount);
      const theta = Math.sqrt(rayCount * Math.PI) * phi;

      cone.position.set(0, 0, 0);
      cone.rotation.x = Math.PI / 2 + Math.sin(phi) * 0.5;
      cone.rotation.z = theta;

      lightRaysGroup.add(cone);
      rays.push({
        mesh: cone,
        baseAngle: theta,
        speed: 0.004 + (i % 3) * 0.002,
        rotAxis: new THREE.Vector3(Math.cos(phi), Math.sin(phi), Math.sin(theta)).normalize(),
      });
    }

    // ─── 5. BACKGROUND STARFIELD / PARTICLES ───
    const starCount = 450;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      const radius = 9 + Math.random() * 22;
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const sinPhi = Math.sin(phi);

      starPositions[i * 3] = radius * sinPhi * Math.cos(theta);
      starPositions[i * 3 + 1] = radius * sinPhi * Math.sin(theta);
      starPositions[i * 3 + 2] = radius * Math.cos(phi);

      const isWarm = Math.random() > 0.4;
      starColors[i * 3] = isWarm ? 1 : 0.7;
      starColors[i * 3 + 1] = isWarm ? 0.9 : 0.8;
      starColors[i * 3 + 2] = 1;
    }

    starGeo.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute("color", new THREE.BufferAttribute(starColors, 3));

    const starMat = new THREE.PointsMaterial({
      size: 0.09,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // ─── 6. LIGHTING ───
    // Warm top spotlight for authentic disco ball highlight (as seen in user reference)
    const topSpot = new THREE.DirectionalLight(0xffecd2, 3.2);
    topSpot.position.set(1.5, 4.5, 3.5);
    scene.add(topSpot);

    // Ambient light
    const ambientLight = new THREE.AmbientLight(0x252535, 1.2);
    scene.add(ambientLight);

    // Colored accent rim lights
    const pinkRim = new THREE.PointLight(0xff0088, 5.0, 15);
    pinkRim.position.set(-4, -1, 2);
    scene.add(pinkRim);

    const cyanRim = new THREE.PointLight(0x00f0ff, 5.0, 15);
    cyanRim.position.set(4, 2, 2);
    scene.add(cyanRim);

    const amberRim = new THREE.PointLight(0xffaa00, 3.0, 12);
    amberRim.position.set(0, -4, 3);
    scene.add(amberRim);

    // ─── 7. INTERACTIVE ROTATION & MOMENTUM ───
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

    // DOM event bindings
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

    container.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    container.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);

    // ─── 8. NEON TILES CLUSTER PATTERNS ───
    // Vibrant neon palette matching the user's reference image
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
    let clock = new THREE.Clock();

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

      // Rotate light rays gently
      lightRaysGroup.rotation.y = elapsedTime * 0.12;
      lightRaysGroup.rotation.z = Math.sin(elapsedTime * 0.1) * 0.15;

      // Orbit rim lights around the scene
      pinkRim.position.x = Math.sin(elapsedTime * 0.6) * 4.5;
      pinkRim.position.z = Math.cos(elapsedTime * 0.6) * 3.5;

      cyanRim.position.x = -Math.sin(elapsedTime * 0.5) * 4.5;
      cyanRim.position.z = -Math.cos(elapsedTime * 0.5) * 3.5;

      // Twinkle starfield
      starField.rotation.y = elapsedTime * 0.015;

      // ─── DYNAMIC SHIFTING NEON TILES ───
      // Produce moving blocks & snakes of neon colors on top of the silver base,
      // exactly like in the user's reference picture!
      for (let i = 0; i < tilesData.length; i++) {
        const t = tilesData[i];

        // 3 algorithmic moving bands/clusters of light
        const wave1 = Math.sin(t.ring * 0.65 - elapsedTime * 2.2 + t.col * 0.35);
        const wave2 = Math.cos(t.col * 0.5 + elapsedTime * 1.8 - t.ring * 0.4);
        const wave3 = Math.sin(t.ring * 0.9 + t.col * 0.2 + elapsedTime * 1.5);

        // Combined pattern condition: creates clustered tetris-like shapes
        const isColoredCluster = wave1 > 0.72 && wave2 > 0.35;
        const isRunnerBeam = wave3 > 0.88;

        if (isColoredCluster || isRunnerBeam) {
          // Select color from palette based on position & time
          const colorIdx = Math.floor(Math.abs(t.ring * 3 + t.col + elapsedTime * 2)) % neonPalette.length;
          const targetNeon = neonPalette[colorIdx];

          // Make it pop bright with intense saturation
          tempColor.copy(targetNeon);
          instancedTiles.setColorAt(i, tempColor);
        } else {
          // Restore pure plateado/silver mirror
          instancedTiles.setColorAt(i, t.baseColor);
        }
      }
      instancedTiles.instanceColor!.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      const mobile = w < 768;
      camera.position.set(0, mobile ? 0.2 : 0, mobile ? 6.8 : 5.8);
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      container.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);

      // Dispose Three.js resources
      tileGeo.dispose();
      tileMat.dispose();
      coneGeo.dispose();
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
    <div
      ref={containerRef}
      className="relative w-full h-screen bg-[#020205] overflow-hidden select-none cursor-grab active:cursor-grabbing"
      style={{ touchAction: "none" }}
    >
      {/* Discreet hint for touch & interaction, fades out on interact/scroll */}
      <div
        className={`absolute top-6 left-1/2 -translate-x-1/2 pointer-events-none transition-all duration-700 z-20 ${
          isInteracting || hasScrolled ? "opacity-0 -translate-y-2" : "opacity-75"
        }`}
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/60 border border-slate-700/50 text-slate-300 text-xs font-medium tracking-wide backdrop-blur-md shadow-lg">
          <Sparkles size={13} className="text-amber-400 animate-pulse" />
          <span>Arrastrá para hacer girar la bola</span>
        </div>
      </div>

      {/* Floating Scroll Prompt at bottom */}
      <button
        type="button"
        onClick={scrollToContent}
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer transition-all duration-700 z-20 group ${
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
    </div>
  );
}

