import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  ExternalLink,
  Globe2,
  Navigation,
  Compass,
  Building2,
  Cpu,
  Pickaxe,
  HeartPulse,
  Sprout,
  ShieldCheck,
  Layers,
  Sparkles,
  Maximize2,
  Eye,
  CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";

export interface OfficeLocation {
  id: string;
  name: string;
  city: string;
  state: string;
  type: "Corporate HQ" | "Financial Hub" | "Policy Secretariat" | "Deep-Tech R&D" | "Mining Command" | "Heavy EPC" | "Agritech Centre";
  sector: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
    display: string;
  };
  // Map positioning on India SVG (percentage coordinates 0-100)
  mapCoord: {
    x: number; // 0 to 100% horizontal
    y: number; // 0 to 100% vertical
  };
  details: string;
  keyMetric: string;
  status: "Active Operational" | "Strategic Hub" | "Expansion Zone";
  googleEarthUrl: string;
  googleMapsUrl: string;
  routeLink: string;
  color: string;
}

export const officeLocations: OfficeLocation[] = [
  {
    id: "bhubaneswar-hq",
    name: "Rashtra Bharosa Global Headquarters",
    city: "Bhubaneswar",
    state: "Odisha",
    type: "Corporate HQ",
    sector: "Group Secretariat & Tertiary Healthcare",
    address: "Rashtra Bharosa Corporate Tower, Bhubaneswar, Odisha 751020",
    coordinates: {
      lat: 20.2961,
      lng: 85.8245,
      display: "20.2961° N, 85.8245° E",
    },
    mapCoord: { x: 67, y: 55 },
    details: "Executive Secretariat, promoter fiduciary governance board, and the 500-bed super-specialty tertiary cardiology & trauma hospital network.",
    keyMetric: "Global Headquarters // 500-Bed Tertiary Hospital",
    status: "Active Operational",
    googleEarthUrl: "https://earth.google.com/web/search/Bhubaneswar,+Odisha/@20.2961,85.8245,45a,1000d,35y,0h,45t,0r",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=20.2961,85.8245",
    routeLink: "/about",
    color: "#F4B32C", // Gold
  },
  {
    id: "delhi-secretariat",
    name: "National Policy & Sovereign Liaison Office",
    city: "New Delhi",
    state: "Delhi NCR",
    type: "Policy Secretariat",
    sector: "Institutional Affairs & Sovereign Regulatory Compliance",
    address: "Barakhamba Road, Connaught Place, New Delhi 110001",
    coordinates: {
      lat: 28.6139,
      lng: 77.209,
      display: "28.6139° N, 77.2090° E",
    },
    mapCoord: { x: 39, y: 32 },
    details: "Coordinates statutory mineral allocations, central infrastructure liaison, and sovereign AI standards alignment with national statutory ministries.",
    keyMetric: "National Liaison & Statutory Regulatory Gateway",
    status: "Active Operational",
    googleEarthUrl: "https://earth.google.com/web/search/Connaught+Place,+New+Delhi/@28.6139,77.209,215a,1000d,35y,0h,45t,0r",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=28.6139,77.2090",
    routeLink: "/contact",
    color: "#60A5FA", // Blue
  },
  {
    id: "mumbai-capital",
    name: "Strategic Capital & Treasury Hub",
    city: "Mumbai",
    state: "Maharashtra",
    type: "Financial Hub",
    sector: "Royal Birds Group & Capital Governance",
    address: "Bandra Kurla Complex (BKC), Mumbai, Maharashtra 400051",
    coordinates: {
      lat: 19.076,
      lng: 72.8777,
      display: "19.0760° N, 72.8777° E",
    },
    mapCoord: { x: 26, y: 59 },
    details: "Multi-generational patient capital deployment, institutional banking alliances, and venture incubation under Royal Birds Group.",
    keyMetric: "Fiduciary Treasury & Strategic Venture Capital",
    status: "Active Operational",
    googleEarthUrl: "https://earth.google.com/web/search/Bandra+Kurla+Complex,+Mumbai/@19.0760,72.8777,15a,1000d,35y,0h,45t,0r",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=19.0760,72.8777",
    routeLink: "/ventures/investments",
    color: "#FBBF24", // Rich Gold
  },
  {
    id: "bengaluru-tech",
    name: "RashtrAI Sovereign Deep-Tech Lab",
    city: "Bengaluru",
    state: "Karnataka",
    type: "Deep-Tech R&D",
    sector: "RashBhar Technology / RashtrAI Foundation Models",
    address: "Electronic City Phase 1, Bengaluru, Karnataka 560100",
    coordinates: {
      lat: 12.9716,
      lng: 77.5946,
      display: "12.9716° N, 77.5946° E",
    },
    mapCoord: { x: 41, y: 77 },
    details: "Indigenous on-premise foundation AI models, embodied industrial robotics, and zero-foreign-cloud air-gapped sovereign architectures.",
    keyMetric: "100% In-Country Data Sovereignty & Indigenous R&D",
    status: "Active Operational",
    googleEarthUrl: "https://earth.google.com/web/search/Electronic+City,+Bengaluru/@12.9716,77.5946,920a,1000d,35y,0h,45t,0r",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=12.9716,77.5946",
    routeLink: "/ventures/technology",
    color: "#38BDF8", // Cyan
  },
  {
    id: "keonjhar-mining",
    name: "Keonjhar & Barbil Mining Command",
    city: "Keonjhar",
    state: "Odisha",
    type: "Mining Command",
    sector: "RashBhar Mining (Iron Ore & Coal)",
    address: "Barbil-Joda Industrial Mining Zone, Keonjhar, Odisha 758035",
    coordinates: {
      lat: 21.6289,
      lng: 85.5817,
      display: "21.6289° N, 85.5817° E",
    },
    mapCoord: { x: 65, y: 49 },
    details: "High-grade iron ore extraction, beneficiation plants, and automated conveyor systems governed by strict Eco-Control zero-harm protocols.",
    keyMetric: "Primary Mineral Beneficiation & Logistics Grid",
    status: "Active Operational",
    googleEarthUrl: "https://earth.google.com/web/search/Barbil,+Odisha/@21.6289,85.5817,470a,1000d,35y,0h,45t,0r",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=21.6289,85.5817",
    routeLink: "/ventures/mining",
    color: "#EAB308", // Amber
  },
  {
    id: "angul-epc",
    name: "Angul Heavy Civil EPC Complex",
    city: "Angul",
    state: "Odisha",
    type: "Heavy EPC",
    sector: "Innovex Construction & Heavy Engineering",
    address: "Industrial Growth Corridor, Angul, Odisha 759122",
    coordinates: {
      lat: 20.8444,
      lng: 85.1511,
      display: "20.8444° N, 85.1511° E",
    },
    mapCoord: { x: 63, y: 53 },
    details: "Turnkey engineering, procurement, and construction of industrial process plants, heavy freight corridors, and structural infrastructure.",
    keyMetric: "Pan-India EPC Logistics & Industrial Execution",
    status: "Active Operational",
    googleEarthUrl: "https://earth.google.com/web/search/Angul,+Odisha/@20.8444,85.1511,140a,1000d,35y,0h,45t,0r",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=20.8444,85.1511",
    routeLink: "/ventures/infrastructure",
    color: "#818CF8", // Indigo
  },
  {
    id: "cuttack-agri",
    name: "Mahanadi Agritech & Soil Science Hub",
    city: "Cuttack",
    state: "Odisha",
    type: "Agritech Centre",
    sector: "RashBhar Soil & Soul (AgriGel™ Science)",
    address: "Mahanadi River Basin Agrarian Research Center, Cuttack, Odisha 753001",
    coordinates: {
      lat: 20.4625,
      lng: 85.8828,
      display: "20.4625° N, 85.8828° E",
    },
    mapCoord: { x: 68, y: 54 },
    details: "Manufacturing of proprietary AgriGel™ soil conditioners, crop diagnostics, and organic reclamation across 25,000+ certified farmer acres.",
    keyMetric: "25,000+ Acres Conditioned // Zero Chemical Farming",
    status: "Active Operational",
    googleEarthUrl: "https://earth.google.com/web/search/Cuttack,+Odisha/@20.4625,85.8828,30a,1000d,35y,0h,45t,0r",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=20.4625,85.8828",
    routeLink: "/ventures/agriculture",
    color: "#34D399", // Emerald
  },
  {
    id: "jharkhand-coal",
    name: "Jharkhand Mineral & Energy Hub",
    city: "Dhanbad",
    state: "Jharkhand",
    type: "Mining Command",
    sector: "Integrated Coal & Rare Minerals Belt",
    address: "Dhanbad Energy & Mineral Zone, Jharkhand 826001",
    coordinates: {
      lat: 23.7957,
      lng: 86.4304,
      display: "23.7957° N, 86.4304° E",
    },
    mapCoord: { x: 64, y: 44 },
    details: "Integrated coal logistics and strategic mineral exploration supplying continuous baseload energy feedstock to Indian steel corridors.",
    keyMetric: "Strategic Energy Baselines & Mineral Feedstock",
    status: "Strategic Hub",
    googleEarthUrl: "https://earth.google.com/web/search/Dhanbad,+Jharkhand/@23.7957,86.4304,220a,1000d,35y,0h,45t,0r",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=23.7957,86.4304",
    routeLink: "/ventures/mining",
    color: "#FB923C", // Orange
  },
];

export const InteractiveMap: React.FC = () => {
  const [activeOffice, setActiveOffice] = useState<OfficeLocation>(officeLocations[0]);
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [viewMode, setViewMode] = useState<"3D_Liquid_Glass" | "Google_Earth_Satellite">("3D_Liquid_Glass");

  const filterCategories = ["All", "Corporate HQ", "Mining Command", "Deep-Tech R&D", "Heavy EPC", "Agritech Centre"];

  const filteredOffices = selectedFilter === "All"
    ? officeLocations
    : officeLocations.filter((o) => o.type === selectedFilter);

  return (
    <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#020B18] via-[#041633] to-[#010813] text-white border border-white/20 shadow-[0_25px_70px_rgba(0,0,0,0.8)] p-6 sm:p-10 lg:p-12">
      {/* 3D Liquid Glass Specular Reflections and Neon Ambient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(244,179,44,0.12)_0%,transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(13,76,151,0.25)_0%,transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:36px_36px] pointer-events-none" />

      {/* Section Header with View Mode Switcher */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between pb-8 mb-8 border-b border-white/10 gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-white/10 text-brand-gold border border-brand-gold/40 backdrop-blur-xl shadow-lg">
            <Compass size={14} className="text-brand-gold animate-spin-slow" />
            <span>3D Sovereign Footprint // Pan-India Locations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white uppercase">
            Interactive 3D Map of Bharat
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
            Explore Rashtra Bharosa Group's corporate headquarters, national liaison secretariats, mining commands, EPC corridors, and deep-tech labs with live Google Earth 3D satellite coordinates.
          </p>
        </div>

        {/* View Mode & Filter Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="bg-black/60 p-1.5 rounded-2xl border border-white/15 backdrop-blur-2xl flex items-center gap-1 shadow-2xl">
            <button
              onClick={() => setViewMode("3D_Liquid_Glass")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                viewMode === "3D_Liquid_Glass"
                  ? "bg-brand-gold text-brand-navy shadow-lg font-black"
                  : "text-slate-300 hover:text-white hover:bg-white/10"
              }`}
            >
              <Layers size={14} />
              <span>3D Liquid Glass Map</span>
            </button>
            <button
              onClick={() => setViewMode("Google_Earth_Satellite")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                viewMode === "Google_Earth_Satellite"
                  ? "bg-emerald-500 text-white shadow-lg font-black"
                  : "text-slate-300 hover:text-white hover:bg-white/10"
              }`}
            >
              <Globe2 size={14} />
              <span>Google Earth Satellite</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="relative z-10 flex flex-wrap gap-2 mb-8">
        {filterCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedFilter(cat)}
            className={`text-xs px-3.5 py-1.5 rounded-xl font-semibold transition-all border ${
              selectedFilter === cat
                ? "bg-white text-brand-navy border-white shadow-md font-bold scale-105"
                : "bg-white/5 text-slate-300 border-white/10 hover:bg-white/15 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Interactive Stage Grid */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        {/* Left Column (5 Cols): Active Location Liquid Glass Telemetry Card */}
        <div className="lg:col-span-5 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeOffice.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-white/15 to-white/5 border border-white/20 backdrop-blur-2xl space-y-5 shadow-2xl relative overflow-hidden"
              style={{
                boxShadow: `0 20px 50px -10px ${activeOffice.color}25`,
              }}
            >
              {/* Top Accent Gradient Bar */}
              <div
                className="absolute top-0 left-0 right-0 h-1.5"
                style={{ backgroundColor: activeOffice.color }}
              />

              {/* Status & Coordinates Pill */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider backdrop-blur-md"
                  style={{
                    backgroundColor: `${activeOffice.color}20`,
                    color: activeOffice.color,
                    borderColor: `${activeOffice.color}40`,
                    borderWidth: 1,
                  }}
                >
                  <span
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ backgroundColor: activeOffice.color }}
                  />
                  {activeOffice.type}
                </div>
                <div className="text-[11px] font-mono text-slate-300 bg-black/40 px-2.5 py-1 rounded-lg border border-white/10">
                  {activeOffice.coordinates.display}
                </div>
              </div>

              {/* Hub Title & City */}
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {activeOffice.city}, {activeOffice.state}
                </div>
                <h3 className="text-2xl font-black text-white tracking-tight mt-1">
                  {activeOffice.name}
                </h3>
                <div
                  className="text-xs font-bold mt-1"
                  style={{ color: activeOffice.color }}
                >
                  {activeOffice.sector}
                </div>
              </div>

              {/* Address Strip */}
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-black/30 border border-white/10 text-xs text-slate-300">
                <MapPin size={16} className="text-brand-gold shrink-0 mt-0.5" />
                <span>{activeOffice.address}</span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                {activeOffice.details}
              </p>

              {/* Key Scale Metric Banner */}
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                  Operational Scope & Mandate
                </div>
                <div className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-brand-gold shrink-0" />
                  <span>{activeOffice.keyMetric}</span>
                </div>
              </div>

              {/* Action Buttons: Direct Google Earth 3D & Google Maps Connectivity */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={activeOffice.googleEarthUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg transition-transform hover:scale-105"
                  title="Open 3D Satellite Flyover in Google Earth"
                >
                  <Globe2 size={15} />
                  <span>Google Earth 3D</span>
                  <ExternalLink size={12} />
                </a>

                <a
                  href={activeOffice.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 shadow-md transition-transform hover:scale-105"
                  title="Open Exact Pin in Google Maps"
                >
                  <Navigation size={15} className="text-brand-gold" />
                  <span>Google Maps</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Quick Hub Grid Selector */}
          <div className="space-y-2">
            <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold flex items-center justify-between">
              <span>Select Active Office Hub</span>
              <span className="text-brand-gold font-mono">{filteredOffices.length} Locations</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {filteredOffices.map((office) => (
                <button
                  key={office.id}
                  onClick={() => setActiveOffice(office)}
                  className={`p-2.5 rounded-xl text-left transition-all border flex flex-col justify-between ${
                    activeOffice.id === office.id
                      ? "bg-white text-brand-navy border-white shadow-xl scale-102"
                      : "bg-white/5 text-slate-300 border-white/10 hover:bg-white/15 hover:text-white"
                  }`}
                >
                  <span className="text-xs font-bold truncate block">{office.city}</span>
                  <span
                    className={`text-[9px] font-semibold truncate block mt-0.5 ${
                      activeOffice.id === office.id ? "text-brand-navy/70" : "text-slate-400"
                    }`}
                  >
                    {office.type}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (7 Cols): 3D Liquid Glass Realistic Map of India */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center relative min-h-[480px] sm:min-h-[580px] w-full bg-gradient-to-b from-[#010B18]/90 via-[#03152F]/90 to-[#010915]/95 rounded-3xl border border-white/20 overflow-hidden p-6 sm:p-8 backdrop-blur-3xl shadow-[inset_0_1px_2px_rgba(255,255,255,0.2)]">
          {viewMode === "3D_Liquid_Glass" ? (
            <>
              {/* 3D Liquid Glass Canvas Stage */}
              <div className="relative w-full h-full flex items-center justify-center">
                {/* 3D Isometric Transform Wrapper */}
                <div className="relative w-full max-w-[560px] aspect-[4/5] flex items-center justify-center">
                  <svg
                    viewBox="0 0 500 600"
                    className="w-full h-full object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)] select-none"
                  >
                    <defs>
                      {/* Realistic Liquid Glass Refractive Fill Gradient */}
                      <linearGradient id="indiaGlassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#0B3C78" stopOpacity="0.85" />
                        <stop offset="50%" stopColor="#062550" stopOpacity="0.75" />
                        <stop offset="100%" stopColor="#021226" stopOpacity="0.9" />
                      </linearGradient>

                      {/* Liquid Specular Light Sheen */}
                      <linearGradient id="glassSheen" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.35" />
                        <stop offset="30%" stopColor="#D4AF37" stopOpacity="0.15" />
                        <stop offset="100%" stopColor="#000000" stopOpacity="0.2" />
                      </linearGradient>

                      {/* Neon Border Glow */}
                      <linearGradient id="neonGlowBorder" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#F4B32C" />
                        <stop offset="50%" stopColor="#60A5FA" />
                        <stop offset="100%" stopColor="#34D399" />
                      </linearGradient>

                      {/* Connecting Inter-Hub Laser Corridor */}
                      <linearGradient id="laserBeam" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#F4B32C" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.4" />
                      </linearGradient>

                      {/* Glow Filter */}
                      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                      </filter>
                    </defs>

                    {/* Outer Ambient Glow Mesh of India */}
                    <path
                      d="M 230 40 L 260 70 L 285 90 L 300 130 L 320 145 L 360 160 L 410 165 L 435 180 L 460 210 L 435 240 L 390 245 L 360 270 L 375 300 L 350 340 L 330 380 L 300 440 L 270 500 L 250 550 L 230 500 L 200 450 L 170 380 L 140 330 L 130 280 L 150 250 L 140 210 L 160 180 L 190 140 L 210 90 Z"
                      fill="rgba(6, 43, 99, 0.4)"
                      filter="url(#glow)"
                      className="opacity-60"
                    />

                    {/* Accurate Stylized 3D Liquid Glass Silhouette of India */}
                    <path
                      d="M 230 40 
                         L 255 65 L 280 85 L 295 125 L 315 140 L 355 155 L 405 160 L 430 175 L 455 205 L 430 235 L 385 240 L 355 265 L 370 295 L 345 335 L 325 375 L 295 435 L 265 495 L 245 545 L 225 495 L 195 445 L 165 375 L 135 325 L 125 275 L 145 245 L 135 205 L 155 175 L 185 135 L 205 85 Z"
                      fill="url(#indiaGlassGrad)"
                      stroke="url(#neonGlowBorder)"
                      strokeWidth="2.5"
                      className="transition-all duration-700"
                    />

                    {/* Internal Specular Glass Highlight */}
                    <path
                      d="M 230 45 
                         L 250 70 L 275 90 L 290 130 L 310 145 L 345 160 L 390 165 L 415 180 L 435 210 L 415 235 L 375 240 L 345 265 L 360 295 L 335 335 L 315 375 L 285 435 L 255 495 L 240 535 L 225 490 L 200 440 L 175 370 L 145 320 L 135 270 L 155 240 L 145 200 L 165 170 L 190 130 L 210 80 Z"
                      fill="url(#glassSheen)"
                      stroke="rgba(255, 255, 255, 0.2)"
                      strokeWidth="1"
                    />

                    {/* Topographic Contour Iso-Lines for 3D Depth */}
                    <path
                      d="M 180 180 Q 240 160 300 180 T 360 220"
                      fill="none"
                      stroke="rgba(255, 255, 255, 0.12)"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                    />
                    <path
                      d="M 160 260 Q 240 240 320 270 T 350 330"
                      fill="none"
                      stroke="rgba(255, 255, 255, 0.12)"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                    />
                    <path
                      d="M 180 350 Q 240 340 280 370 T 290 430"
                      fill="none"
                      stroke="rgba(255, 255, 255, 0.12)"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                    />

                    {/* Connecting Fibre-Optic Laser Corridors Between Key Hubs */}
                    {/* Delhi (x:195, y:192) to Bhubaneswar (x:335, y:330) */}
                    <line
                      x1="195"
                      y1="192"
                      x2="335"
                      y2="330"
                      stroke="url(#laserBeam)"
                      strokeWidth="1.5"
                      strokeDasharray="3 3"
                    />
                    {/* Mumbai (x:130, y:354) to Bhubaneswar (x:335, y:330) */}
                    <line
                      x1="130"
                      y1="354"
                      x2="335"
                      y2="330"
                      stroke="url(#laserBeam)"
                      strokeWidth="1.5"
                      strokeDasharray="3 3"
                    />
                    {/* Bengaluru (x:205, y:462) to Bhubaneswar (x:335, y:330) */}
                    <line
                      x1="205"
                      y1="462"
                      x2="335"
                      y2="330"
                      stroke="url(#laserBeam)"
                      strokeWidth="1.5"
                      strokeDasharray="3 3"
                    />
                    {/* Keonjhar (x:325, y:294) to Angul (x:315, y:318) to Cuttack (x:340, y:324) */}
                    <line
                      x1="325"
                      y1="294"
                      x2="315"
                      y2="318"
                      stroke="#F4B32C"
                      strokeWidth="2"
                      strokeDasharray="2 2"
                    />
                    <line
                      x1="315"
                      y1="318"
                      x2="340"
                      y2="324"
                      stroke="#F4B32C"
                      strokeWidth="2"
                      strokeDasharray="2 2"
                    />

                    {/* Dynamic Office Location Hotspot Nodes */}
                    {officeLocations.map((office) => {
                      const cx = (office.mapCoord.x / 100) * 500;
                      const cy = (office.mapCoord.y / 100) * 600;
                      const isSelected = activeOffice.id === office.id;

                      return (
                        <g
                          key={office.id}
                          onClick={() => setActiveOffice(office)}
                          className="cursor-pointer group"
                        >
                          {/* Animated Radar Pulse Ping for Selected Site */}
                          {isSelected && (
                            <>
                              <circle
                                cx={cx}
                                cy={cy}
                                r="26"
                                fill="none"
                                stroke={office.color}
                                strokeWidth="2"
                                className="animate-ping origin-center opacity-80"
                              />
                              <circle
                                cx={cx}
                                cy={cy}
                                r="18"
                                fill="none"
                                stroke={office.color}
                                strokeWidth="1"
                                className="opacity-60"
                              />
                            </>
                          )}

                          {/* Outer Translucent Glass Halo */}
                          <circle
                            cx={cx}
                            cy={cy}
                            r={isSelected ? "14" : "9"}
                            fill={isSelected ? `${office.color}40` : "rgba(255, 255, 255, 0.15)"}
                            stroke={isSelected ? office.color : "rgba(255, 255, 255, 0.6)"}
                            strokeWidth={isSelected ? "2.5" : "1.5"}
                            className="transition-all duration-300 group-hover:scale-125"
                          />

                          {/* Center Core Beacon */}
                          <circle
                            cx={cx}
                            cy={cy}
                            r={isSelected ? "6" : "4"}
                            fill={isSelected ? "#FFFFFF" : office.color}
                            className="transition-all duration-300 shadow-lg"
                          />

                          {/* Text Label Pill */}
                          <g className="transition-all duration-300">
                            <rect
                              x={cx + 10}
                              y={cy - 12}
                              width={office.city.length * 7.5 + 14}
                              height="20"
                              rx="6"
                              fill={isSelected ? "rgba(4, 22, 51, 0.95)" : "rgba(2, 11, 24, 0.75)"}
                              stroke={isSelected ? office.color : "rgba(255, 255, 255, 0.25)"}
                              strokeWidth="1"
                              className="backdrop-blur-md"
                            />
                            <text
                              x={cx + 17}
                              y={cy + 2}
                              fill={isSelected ? office.color : "#FFFFFF"}
                              fontSize="10"
                              fontWeight={isSelected ? "800" : "600"}
                              className="font-sans select-none tracking-wide"
                            >
                              {office.city}
                            </text>
                          </g>
                        </g>
                      );
                    })}
                  </svg>
                </div>
              </div>

              {/* Status Bar Telemetry Overlay */}
              <div className="absolute bottom-4 inset-x-6 flex items-center justify-between text-[11px] font-mono text-slate-400 bg-black/60 p-2.5 rounded-2xl border border-white/10 backdrop-blur-xl">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-white font-semibold">SOVEREIGN GRID: ONLINE</span>
                </div>
                <div className="hidden sm:block text-slate-300">
                  COORDINATES: {activeOffice.coordinates.display}
                </div>
              </div>
            </>
          ) : (
            /* Google Earth Satellite Live Interactive View */
            <div className="w-full h-full min-h-[440px] flex flex-col items-center justify-center space-y-4 text-center p-4">
              <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40 shadow-2xl">
                <Globe2 size={32} className="animate-spin-slow" />
              </div>
              <div className="space-y-1 max-w-md">
                <h4 className="text-xl font-black text-white uppercase">
                  Google Earth 3D Satellite Flyover
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Fly directly to <strong>{activeOffice.name}</strong> ({activeOffice.city}, {activeOffice.state}) in ultra-high resolution Google Earth 3D satellite view.
                </p>
              </div>

              <div className="pt-3 flex flex-wrap items-center justify-center gap-4">
                <a
                  href={activeOffice.googleEarthUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-emerald-500 hover:bg-emerald-400 text-white shadow-2xl hover:scale-105 transition-all"
                >
                  <Globe2 size={16} />
                  <span>Launch Google Earth 3D ({activeOffice.city})</span>
                  <ExternalLink size={14} />
                </a>
                <a
                  href={activeOffice.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white border border-white/20 shadow-lg hover:scale-105 transition-all"
                >
                  <Navigation size={16} className="text-brand-gold" />
                  <span>View Exact Location Pin on Google Maps</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;
