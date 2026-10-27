import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Loader2, RotateCcw, Box, Sparkles, Layers, Sun, Moon, Compass, Maximize2 } from "lucide-react";

export type ColorTheme = "photoreal-render" | "luxury-gold" | "sapphire-modern" | "emerald-biophilic" | "sunset-copper";

interface ModelViewerProps {
  modelUrl: string;
  className?: string;
  initialTheme?: ColorTheme;
}

const THEME_PALETTES: Record<
  ColorTheme,
  {
    name: string;
    description: string;
    accent: string;
    // Specific material mapping matching the actual Reyansh Elanza project render
    towerBeigeStone: number;      // Warm sandstone beige tower facade
    towerWarmBronze: number;     // Vertical architectural bronze ribs & trim
    towerWhiteCornice: number;    // Crisp limestone white floor slab edges & vertical mullions
    balconyGlassTeal: number;     // Crystal blue-green reflective balcony glass
    roofGardenGreen: number;      // Lush rooftop gardens & terrace greenery
    podiumCentralLawn: number;    // Deep lush emerald central lawn
    podiumPoolWater: number;      // Vibrant turquoise crystal swimming pool
    roadwayPavement: number;      // Clean architectural paved driveway
    interiorWarmGlow: number;     // Soft warm window illumination
    lights: { warm: number; cool: number; sun: number };
    bgGradient: string;
  }
> = {
  "photoreal-render": {
    name: "Master Project Render",
    description: "Exact color palette matching the official Reyansh Elanza master 3D architectural render.",
    accent: "#d4a373",
    towerBeigeStone: 0xdfd3c3,    // Elegant sandstone beige
    towerWarmBronze: 0xb58a63,    // Warm architectural copper-bronze vertical ribs
    towerWhiteCornice: 0xfaf9f6,   // Off-white travertine stone floor bands
    balconyGlassTeal: 0x22577a,    // Realistic azure/teal reflective glass
    roofGardenGreen: 0x38b000,     // Vibrant rooftop terrace foliage
    podiumCentralLawn: 0x2d6a4f,   // Lush central landscape lawn
    podiumPoolWater: 0x00b4d8,     // Brilliant crystalline pool water
    roadwayPavement: 0x5c677d,     // Clean paving stone perimeter
    interiorWarmGlow: 0xffe8d6,    // Cozy residential lighting
    lights: { warm: 0xfff3b0, cool: 0xe0f2fe, sun: 0xffeedd },
    bgGradient: "from-[#041633] via-[#06204d] to-[#020b18]",
  },
  "luxury-gold": {
    name: "Imperial Gold & Bronze",
    description: "Ultra-luxury champagne gold accents with warm bronze façade panels & azure glass.",
    accent: "#C5A880",
    towerBeigeStone: 0xd4af37,
    towerWarmBronze: 0x996515,
    towerWhiteCornice: 0xfff8dc,
    balconyGlassTeal: 0x1e3a8a,
    roofGardenGreen: 0x2e8b57,
    podiumCentralLawn: 0x1b4332,
    podiumPoolWater: 0x0077b6,
    roadwayPavement: 0x334155,
    interiorWarmGlow: 0xffdfba,
    lights: { warm: 0xffe6c2, cool: 0xc4e2ff, sun: 0xfff5e6 },
    bgGradient: "from-[#041633] via-[#082a5e] to-[#020d1c]",
  },
  "sapphire-modern": {
    name: "Sapphire & Titanium",
    description: "High-tech crisp architectural sapphire tint with anodized metallic silver elements.",
    accent: "#38bdf8",
    towerBeigeStone: 0x0284c7,
    towerWarmBronze: 0x0369a1,
    towerWhiteCornice: 0xf0f9ff,
    balconyGlassTeal: 0x0284c7,
    roofGardenGreen: 0x10b981,
    podiumCentralLawn: 0x064e3b,
    podiumPoolWater: 0x38bdf8,
    roadwayPavement: 0x1e293b,
    interiorWarmGlow: 0xbae6fd,
    lights: { warm: 0xffffff, cool: 0xbae6fd, sun: 0xe0f2fe },
    bgGradient: "from-[#03152e] via-[#04244d] to-[#010c1c]",
  },
  "emerald-biophilic": {
    name: "Biophilic Forest Emerald",
    description: "Eco-luxury sustainable living theme with vibrant jade accents and natural cedar warm stone.",
    accent: "#10b981",
    towerBeigeStone: 0x059669,
    towerWarmBronze: 0x047857,
    towerWhiteCornice: 0xf3f4f6,
    balconyGlassTeal: 0x065f46,
    roofGardenGreen: 0x34d399,
    podiumCentralLawn: 0x022c22,
    podiumPoolWater: 0x2dd4bf,
    roadwayPavement: 0x134e4a,
    interiorWarmGlow: 0xd1fae5,
    lights: { warm: 0xfffbeb, cool: 0xa7f3d0, sun: 0xf0fdf4 },
    bgGradient: "from-[#021f18] via-[#033327] to-[#01140f]",
  },
  "sunset-copper": {
    name: "Terracotta Sunset Copper",
    description: "Warm architectural terracotta, burnt copper cladding, and golden twilight ambiance.",
    accent: "#f97316",
    towerBeigeStone: 0xea580c,
    towerWarmBronze: 0xc2410c,
    towerWhiteCornice: 0xfef3c7,
    balconyGlassTeal: 0x9a3412,
    roofGardenGreen: 0x65a30d,
    podiumCentralLawn: 0x365314,
    podiumPoolWater: 0x0284c7,
    roadwayPavement: 0x431407,
    interiorWarmGlow: 0xffedd5,
    lights: { warm: 0xffedd5, cool: 0xfed7aa, sun: 0xffedd5 },
    bgGradient: "from-[#260e04] via-[#3a1607] to-[#120601]",
  },
};

const ModelViewer: React.FC<ModelViewerProps> = ({
  modelUrl,
  className = "",
  initialTheme = "photoreal-render",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [wireframe, setWireframe] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [activeTheme, setActiveTheme] = useState<ColorTheme>(initialTheme);
  const [lightingMode, setLightingMode] = useState<"day" | "dusk" | "night">("day");

  const controlsRef = useRef<OrbitControls | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const modelMeshGroupRef = useRef<THREE.Group | null>(null);
  const lightsGroupRef = useRef<THREE.Group | null>(null);
  const podiumEnvironmentRef = useRef<THREE.Group | null>(null);

  // Apply Photorealistic Materials to 3D Model Meshes
  const applyThemeMaterials = (themeKey: ColorTheme, mode: "day" | "dusk" | "night", isWire: boolean) => {
    const palette = THEME_PALETTES[themeKey];
    if (!modelMeshGroupRef.current) return;

    let meshIndex = 0;
    modelMeshGroupRef.current.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const box = new THREE.Box3().setFromObject(mesh);
        const height = box.max.y;
        const size = box.getSize(new THREE.Vector3());
        const volume = size.x * size.y * size.z;

        let partColor = palette.towerBeigeStone;
        let roughness = 0.45;
        let metalness = 0.15;
        let clearcoat = 0.3;
        let transmission = 0.0;
        let opacity = 1.0;
        let transparent = false;

        // Smart architectural classification based on geometry height and aspect ratio
        if (height > 4.2) {
          // 1. Rooftop Terraces & Sky Garden Crowns
          partColor = palette.roofGardenGreen;
          roughness = 0.8;
          metalness = 0.05;
        } else if (height < 0.4) {
          // 2. Podium Ground Base, Driveways & Hardscape
          partColor = palette.roadwayPavement;
          roughness = 0.7;
          metalness = 0.1;
        } else if (size.y < 0.25 && size.x > 0.8) {
          // 3. Horizontal Floor Slabs & White Balcony Bands
          partColor = palette.towerWhiteCornice;
          roughness = 0.35;
          metalness = 0.2;
          clearcoat = 0.6;
        } else if (size.y > 1.5 && size.x < 0.3) {
          // 4. Vertical Architectural Bronze Fins / Ribs
          partColor = palette.towerWarmBronze;
          metalness = 0.65;
          roughness = 0.3;
          clearcoat = 0.8;
        } else if (meshIndex % 3 === 0) {
          // 5. Balcony Railing & Window Tinted Glass
          partColor = palette.balconyGlassTeal;
          metalness = 0.85;
          roughness = 0.1;
          clearcoat = 1.0;
          opacity = mode === "night" ? 0.9 : 0.75;
          transparent = true;
          transmission = 0.4;
        } else if (meshIndex % 2 === 0) {
          // 6. Primary Warm Sandstone Main Wall Cladding
          partColor = palette.towerBeigeStone;
          roughness = 0.5;
          metalness = 0.15;
        } else {
          // 7. Secondary Ivory / Warm Travertine Facets
          partColor = palette.towerWhiteCornice;
          roughness = 0.4;
          metalness = 0.2;
        }

        const physicalMat = new THREE.MeshPhysicalMaterial({
          color: partColor,
          roughness,
          metalness,
          clearcoat,
          clearcoatRoughness: 0.15,
          reflectivity: 0.8,
          transmission,
          opacity,
          transparent,
          wireframe: isWire,
        });

        mesh.material = physicalMat;
        meshIndex++;
      }
    });

    // Update Environment Podium Garden & Pool Colors
    if (podiumEnvironmentRef.current) {
      podiumEnvironmentRef.current.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const m = child as THREE.Mesh;
          if (m.name === "central-lawn") {
            (m.material as THREE.MeshStandardMaterial).color.setHex(palette.podiumCentralLawn);
          } else if (m.name === "swimming-pool") {
            (m.material as THREE.MeshPhysicalMaterial).color.setHex(palette.podiumPoolWater);
          } else if (m.name === "road-base") {
            (m.material as THREE.MeshStandardMaterial).color.setHex(palette.roadwayPavement);
          }
        }
      });
    }

    // Dynamic Multi-Source Architectural Studio Lighting
    if (lightsGroupRef.current) {
      lightsGroupRef.current.clear();

      const ambientInt = mode === "day" ? 1.4 : mode === "dusk" ? 0.9 : 0.45;
      const ambient = new THREE.AmbientLight(palette.lights.warm, ambientInt);
      lightsGroupRef.current.add(ambient);

      // Primary Sun (Daylight / Warm Sunset)
      const sunLight = new THREE.DirectionalLight(
        palette.lights.sun,
        mode === "day" ? 2.8 : mode === "dusk" ? 2.0 : 0.9
      );
      sunLight.position.set(16, 26, 18);
      sunLight.castShadow = true;
      sunLight.shadow.mapSize.width = 2048;
      sunLight.shadow.mapSize.height = 2048;
      sunLight.shadow.bias = -0.0001;
      lightsGroupRef.current.add(sunLight);

      // Secondary Blue Sky Fill
      const skyFill = new THREE.DirectionalLight(
        palette.lights.cool,
        mode === "day" ? 1.4 : mode === "dusk" ? 1.1 : 0.6
      );
      skyFill.position.set(-18, 14, -14);
      lightsGroupRef.current.add(skyFill);

      // Warm Ground Bounce & Rim Light
      const bounce = new THREE.DirectionalLight(palette.towerWarmBronze, mode === "night" ? 1.5 : 0.9);
      bounce.position.set(0, -6, 12);
      lightsGroupRef.current.add(bounce);

      // Hemisphere Light (Sky vs Earth Tone)
      const hemi = new THREE.HemisphereLight(palette.lights.warm, palette.podiumCentralLawn, 0.75);
      lightsGroupRef.current.add(hemi);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Lights Container
    const lightsGroup = new THREE.Group();
    scene.add(lightsGroup);
    lightsGroupRef.current = lightsGroup;

    // 2. Camera Setup (Positioned for grand 3D perspective)
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 500;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(7, 7, 10);
    cameraRef.current = camera;

    // 3. Renderer Setup with ACES Filmic Exposure
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // 4. Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 1.2;
    controls.maxPolarAngle = Math.PI / 2 - 0.02;
    controls.minDistance = 2.5;
    controls.maxDistance = 28;
    controlsRef.current = controls;

    // 5. Synthesize Project Grounds Environment (Central Green Lawn, Turquoise Pool & Driveways)
    const envGroup = new THREE.Group();
    podiumEnvironmentRef.current = envGroup;

    // Base Paved Grounds Slab
    const groundGeo = new THREE.CylinderGeometry(7.5, 7.8, 0.12, 48);
    const groundMat = new THREE.MeshStandardMaterial({
      color: THEME_PALETTES[activeTheme].roadwayPavement,
      roughness: 0.8,
      metalness: 0.1,
    });
    const groundMesh = new THREE.Mesh(groundGeo, groundMat);
    groundMesh.name = "road-base";
    groundMesh.position.y = -0.06;
    groundMesh.receiveShadow = true;
    envGroup.add(groundMesh);

    // Oval Central Biophilic Lawn
    const lawnGeo = new THREE.CylinderGeometry(3.2, 3.4, 0.14, 32);
    lawnGeo.scale(1.2, 1, 0.9);
    const lawnMat = new THREE.MeshStandardMaterial({
      color: THEME_PALETTES[activeTheme].podiumCentralLawn,
      roughness: 0.9,
      metalness: 0.05,
    });
    const lawnMesh = new THREE.Mesh(lawnGeo, lawnMat);
    lawnMesh.name = "central-lawn";
    lawnMesh.position.set(0, -0.04, -0.2);
    lawnMesh.receiveShadow = true;
    envGroup.add(lawnMesh);

    // Crystalline Turquoise Swimming Pool
    const poolGeo = new THREE.BoxGeometry(2.4, 0.15, 1.1);
    const poolMat = new THREE.MeshPhysicalMaterial({
      color: THEME_PALETTES[activeTheme].podiumPoolWater,
      roughness: 0.05,
      metalness: 0.9,
      clearcoat: 1.0,
      transmission: 0.6,
      opacity: 0.9,
      transparent: true,
    });
    const poolMesh = new THREE.Mesh(poolGeo, poolMat);
    poolMesh.name = "swimming-pool";
    poolMesh.position.set(0, 0.01, 2.2);
    envGroup.add(poolMesh);

    // Subtle Holographic Architectural Grid Ring
    const gridRing = new THREE.GridHelper(26, 26, 0xc5a880, 0x1e3a8a);
    gridRing.position.y = -0.08;
    (gridRing.material as THREE.Material).opacity = 0.25;
    (gridRing.material as THREE.Material).transparent = true;
    envGroup.add(gridRing);

    scene.add(envGroup);

    // 6. Load GLTF / GLB 3D Model
    const loader = new GLTFLoader();

    loader.load(
      modelUrl,
      (gltf) => {
        const model = gltf.scene;
        modelMeshGroupRef.current = model;

        // Auto-scale & center precisely above the landscaped podium
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        const maxDim = Math.max(size.x, size.y, size.z);
        const targetScale = 6.4 / maxDim;
        model.scale.setScalar(targetScale);

        model.position.x = -center.x * targetScale;
        model.position.y = -box.min.y * targetScale;
        model.position.z = -center.z * targetScale;

        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;
          }
        });

        scene.add(model);
        applyThemeMaterials(activeTheme, lightingMode, wireframe);
        setLoading(false);
      },
      (xhr) => {
        if (xhr.total > 0) {
          setLoadProgress(Math.round((xhr.loaded / xhr.total) * 100));
        }
      },
      (err) => {
        console.error("GLTF Loading Error:", err);
        setError("Failed to load 3D architectural model.");
        setLoading(false);
      }
    );

    // 7. Animation / Render Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      controls.autoRotate = autoRotate;
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // 8. Resize Handling
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [modelUrl]);

  // Handle Theme Change
  const handleThemeChange = (newTheme: ColorTheme) => {
    setActiveTheme(newTheme);
    applyThemeMaterials(newTheme, lightingMode, wireframe);
  };

  // Handle Lighting Mode Change
  const handleLightingChange = (newMode: "day" | "dusk" | "night") => {
    setLightingMode(newMode);
    applyThemeMaterials(activeTheme, newMode, wireframe);
  };

  // Toggle Wireframe Mode
  const toggleWireframe = () => {
    const nextState = !wireframe;
    setWireframe(nextState);
    applyThemeMaterials(activeTheme, lightingMode, nextState);
  };

  // Reset Camera View
  const resetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
      controlsRef.current.object.position.set(7, 7, 10);
      controlsRef.current.update();
    }
  };

  const currentPalette = THEME_PALETTES[activeTheme];

  return (
    <div
      className={`relative w-full h-full min-h-[460px] rounded-2xl overflow-hidden bg-gradient-to-b ${currentPalette.bgGradient} border border-white/15 transition-all duration-700 ${className}`}
    >
      {/* 3D Canvas Mount Point */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#030e21]/90 backdrop-blur-md text-white">
          <Loader2 className="w-10 h-10 animate-spin text-brand-gold mb-3" />
          <div className="text-sm font-bold tracking-wider uppercase text-slate-200">
            Synthesizing Photorealistic 3D Model
          </div>
          <div className="text-xs text-brand-gold mt-1">
            {loadProgress > 0 ? `${loadProgress}% Loading...` : "Applying Reyansh Elanza architectural materials..."}
          </div>
        </div>
      )}

      {/* Error Overlay */}
      {error && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#030e21]/90 text-rose-400 p-6 text-center">
          <Box className="w-10 h-10 mb-2 opacity-60" />
          <div className="text-sm font-bold">{error}</div>
          <div className="text-xs text-slate-400 mt-1">
            Please check the asset path or network connectivity.
          </div>
        </div>
      )}

      {/* Top Left: Active Preset Badge */}
      <div className="absolute top-4 left-4 z-10 flex flex-wrap items-center gap-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/70 border border-white/20 backdrop-blur-md text-white text-[11px] font-semibold shadow-lg">
          <span className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ backgroundColor: currentPalette.accent }}></span>
          <span>{currentPalette.name}</span>
        </div>
      </div>

      {/* Top Right: Architectural Palette Selector */}
      <div className="absolute top-4 right-4 z-10 hidden sm:flex items-center gap-1.5 bg-black/80 border border-white/20 rounded-2xl p-1.5 backdrop-blur-md shadow-2xl">
        <div className="flex items-center gap-1 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          <Sparkles size={12} className="text-brand-gold" />
          <span>Style:</span>
        </div>

        {(Object.keys(THEME_PALETTES) as ColorTheme[]).map((themeKey) => {
          const item = THEME_PALETTES[themeKey];
          const isSelected = activeTheme === themeKey;
          return (
            <button
              key={themeKey}
              onClick={() => handleThemeChange(themeKey)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                isSelected
                  ? "bg-white text-slate-900 shadow-md scale-102 font-black"
                  : "text-slate-300 hover:text-white hover:bg-white/10"
              }`}
              title={item.description}
            >
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.accent }}></span>
              <span className="text-[11px]">{item.name.split(" ")[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Bottom Right: Interactive Controls Bar */}
      <div className="absolute bottom-4 right-4 z-10 flex flex-wrap items-center gap-2 bg-black/80 border border-white/20 rounded-2xl p-1.5 backdrop-blur-md shadow-2xl">
        {/* Lighting Time of Day Switcher */}
        <div className="flex items-center bg-white/10 rounded-xl p-0.5 mr-1">
          <button
            onClick={() => handleLightingChange("day")}
            className={`p-1.5 rounded-lg transition-all ${
              lightingMode === "day" ? "bg-amber-400 text-slate-950 font-bold" : "text-slate-300 hover:text-white"
            }`}
            title="Daylight Sunlight"
          >
            <Sun size={13} />
          </button>
          <button
            onClick={() => handleLightingChange("dusk")}
            className={`p-1.5 rounded-lg transition-all ${
              lightingMode === "dusk" ? "bg-brand-gold text-slate-950 font-bold" : "text-slate-300 hover:text-white"
            }`}
            title="Golden Hour Dusk"
          >
            <Sparkles size={13} />
          </button>
          <button
            onClick={() => handleLightingChange("night")}
            className={`p-1.5 rounded-lg transition-all ${
              lightingMode === "night" ? "bg-cyan-400 text-slate-950 font-bold" : "text-slate-300 hover:text-white"
            }`}
            title="Night Illumination"
          >
            <Moon size={13} />
          </button>
        </div>

        {/* Auto Rotate Toggle */}
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            autoRotate
              ? "bg-brand-gold text-slate-900 shadow-sm font-bold"
              : "text-slate-300 hover:text-white hover:bg-white/10"
          }`}
          title="Toggle 360° Continuous Auto-Rotation"
        >
          <RotateCcw size={13} className={autoRotate ? "animate-spin" : ""} />
          <span>{autoRotate ? "Rotating" : "Rotate"}</span>
        </button>

        {/* Wireframe / Solid Toggle */}
        <button
          onClick={toggleWireframe}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            wireframe
              ? "bg-cyan-400 text-slate-900 shadow-sm font-bold"
              : "text-slate-300 hover:text-white hover:bg-white/10"
          }`}
          title="Toggle BIM Wireframe Mesh"
        >
          <Layers size={13} />
          <span>{wireframe ? "Solid" : "BIM Mesh"}</span>
        </button>

        {/* Reset Camera */}
        <button
          onClick={resetCamera}
          className="px-2.5 py-1.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white hover:bg-white/10 transition-all"
          title="Reset Camera Orientation"
        >
          Reset View
        </button>
      </div>

      {/* Bottom Left: Orientation & Hint */}
      <div className="absolute bottom-4 left-4 z-10 flex flex-col gap-2">
        <div className="flex sm:hidden items-center gap-1 bg-black/70 p-1 rounded-xl border border-white/10">
          {(Object.keys(THEME_PALETTES) as ColorTheme[]).map((themeKey) => {
            const item = THEME_PALETTES[themeKey];
            const isSelected = activeTheme === themeKey;
            return (
              <button
                key={themeKey}
                onClick={() => handleThemeChange(themeKey)}
                className={`p-1.5 rounded-lg ${isSelected ? "ring-2 ring-white" : ""}`}
              >
                <span className="block w-3 h-3 rounded-full" style={{ backgroundColor: item.accent }} />
              </button>
            );
          })}
        </div>

        <div className="hidden sm:flex items-center gap-2 text-[11px] text-slate-300 bg-black/60 px-3.5 py-1 rounded-full border border-white/10 backdrop-blur-xs pointer-events-none">
          <span>Click & Drag: 360° Orbit</span>
          <span>•</span>
          <span>Scroll: Zoom</span>
          <span>•</span>
          <span>Right-Click: Pan</span>
        </div>
      </div>
    </div>
  );
};

export default ModelViewer;
