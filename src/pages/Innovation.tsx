import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  Cpu,
  Brain,
  Bot,
  Sprout,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Lock,
  Layers,
  Activity,
  Zap,
  ChevronRight,
  FlaskConical,
  Pickaxe,
  Factory,
  HardHat,
  Droplets,
  HeartPulse,
  ExternalLink,
  Search,
  Filter,
  X,
  Gauge,
  Database,
  Radio,
  Microscope,
  FileCheck2,
  Workflow,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import rashtraiVideo from "@/assets/VIDEOS/RashtrAI-hero.mp4";
import vedVideo from "@/assets/VIDEOS/VED Ri-hero.mp4";
import agrigelVideo from "@/assets/VIDEOS/AgriGel-hero.mp4";
import odishaHeroVideo from "@/assets/VIDEOS/odisha-hero.mp4";
import technologyImg from "@/assets/technology.jpg";
import soilImg from "@/assets/soil.jpg";
import hqImg from "@/assets/hq.jpeg";
import miningImg from "@/assets/mining.jpg";
import healthcareImg from "@/assets/healthcare.jpg";

// Odisha Heritage Background Assets
import bgHeritage3 from "@/assets/background/background - 3.png";
import bgHeritage4 from "@/assets/background/background - 4.png";

interface RDPillar {
  id: string;
  badge: string;
  category: string;
  name: string;
  tagline: string;
  venture: string;
  ventureLink: string;
  editorial: string;
  link: string;
  video?: string;
  fallbackImage: string;
  icon: React.ElementType;
  accentGradient: string;
  specifications: { label: string; value: string }[];
  breakthroughs: string[];
  status: string;
}

const rdPillars: RDPillar[] = [
  {
    id: "rashtrai",
    badge: "Pillar 01 • Sovereign AI Platform",
    category: "Sovereign AI & Agentic Systems",
    name: "RashtrAI Industrial AI & Agent Orchestration",
    tagline: "Indigenous Foundation Models & Specialized AI Agent Workforce for Enterprise Operations",
    venture: "RashBhar Technology",
    ventureLink: "/ventures/technology",
    editorial:
      "RashtrAI is Rashtra Bharosa Group's sovereign artificial intelligence platform, engineered from first principles to automate mission-critical industrial workflows, enterprise record governance, and complex multi-modal decision intelligence for Indian conglomerates. Operating entirely on high-assurance in-country bare-metal clusters, it guarantees 100% data sovereignty, zero foreign cloud exposure, and native vernacular intelligence across 12+ Indian languages.",
    link: "/rd/rashtrai",
    video: rashtraiVideo,
    fallbackImage: technologyImg,
    icon: Brain,
    accentGradient: "from-cyan-600 to-blue-950",
    status: "v1.4 Internal Ecosystem Deployment",
    specifications: [
      { label: "Data Sovereignty", value: "100% In-Country Air-Gapped" },
      { label: "Vernacular NLP", value: "12+ Indian Languages" },
      { label: "Security Standard", value: "AES-256 Encrypted Microkernels" },
      { label: "Inference Latency", value: "< 100ms Edge Telemetry" },
    ],
    breakthroughs: [
      "Autonomous operational agents for mining pits, raw materials, & heavy EPC",
      "Native statutory, regulatory, and engineering compliance document parsing",
      "Deterministic human-in-the-loop safety verification gates for automated decisions",
      "Real-time fleet telemetry ingestion and autonomous logistics dispatch coordination",
    ],
  },
  {
    id: "ved-ri",
    badge: "Pillar 02 • Physical Robotics & Embodied AI",
    category: "Physical Robotics & Embodied AI",
    name: "VED Ri Robotics & Embodied Intelligence",
    tagline: "Virtual Embodied Devices for Hazardous Industrial Tele-Operations & Deep Extraction",
    venture: "RashBhar Technology",
    ventureLink: "/ventures/technology",
    editorial:
      "VED Ri represents Rashtra Bharosa's specialized robotics research and hardware engineering laboratory. Conceived to eliminate human exposure to life-threatening industrial hazards, VED Ri designs, fabricates, and programs heavy-duty embodied robotic platforms equipped with deterministic real-time micro-kernels and low-latency tele-operation links across three distinct physical architectures: Industrial Humanoids, Articulated Machinery Arms, and Subterranean Mining Exploratory Rovers.",
    link: "/rd/ved-ri",
    video: vedVideo,
    fallbackImage: miningImg,
    icon: Bot,
    accentGradient: "from-blue-600 to-indigo-950",
    status: "Active Multi-Variant R&D",
    specifications: [
      { label: "Control Latency", value: "< 15ms Ultra-Low Control Loop" },
      { label: "Physical Variants", value: "Humanoid, Arm, Mining Rover" },
      { label: "Ingress Protection", value: "IP68 Subterranean Certified" },
      { label: "Spatial Mapping", value: "Real-Time 3D LiDAR & SLAM" },
    ],
    breakthroughs: [
      "Subterranean deep-mining pit exploratory rovers for hazardous zero-oxygen zones",
      "Industrial bipedal humanoids with high-dexterity manipulation for hazardous plants",
      "Multi-axis articulated robotic arms for precision structural steel fabrication",
      "Fail-safe mechanical braking, emergency kill-switches, and redundant RF links",
    ],
  },
  {
    id: "agrigel",
    badge: "Pillar 03 • Soil Biotechnology",
    category: "Soil Biotechnology & Agritech",
    name: "AgriGel™ Soil Enhancer & Hydrogel Science",
    tagline: "Engineered Biodegradable Soil Hydrogels & Root-Zone Microclimate Stabilization",
    venture: "RashBhar Soil & Soul",
    ventureLink: "/ventures/agriculture",
    editorial:
      "AgriGel™ is a breakthrough agricultural biotechnology venture developed under RashBhar Soil & Soul, focused on solving agricultural water scarcity and soil degradation through advanced polymer science. Operating under the scientific doctrine 'Do not claim first. Prove first', AgriGel™ granules absorb up to 400 times their dry weight in water, creating subterranean moisture micro-reservoirs directly at the crop root zone to dramatically buffer crops against drought.",
    link: "/rd/agrigel",
    video: agrigelVideo,
    fallbackImage: soilImg,
    icon: Sprout,
    accentGradient: "from-emerald-600 to-teal-950",
    status: "Laboratory & Multi-Acre Field Trials",
    specifications: [
      { label: "Absorption Multiplier", value: "Up to 400x Dry Weight" },
      { label: "Irrigation Savings", value: "40% – 50% Water Reduction" },
      { label: "Degradation Horizon", value: "18-Month Bio-Assimilation" },
      { label: "Eco Toxicity Rating", value: "100% Eco-Safe Non-Toxic Matrix" },
    ],
    breakthroughs: [
      "Controlled moisture release kinetics matching diurnal transpiration curves",
      "Traps essential water-soluble nitrogen and phosphorus at the root interface",
      "Granular physical format fully compatible with standard mechanical seed drills",
      "Multi-season field testing across arid, semi-arid, and red laterite soil belts",
    ],
  },
];

const categories = [
  "All Innovations",
  "Sovereign AI & Agentic Systems",
  "Physical Robotics & Embodied AI",
  "Soil Biotechnology & Agriculture",
];

const rdPrinciples = [
  {
    step: "01",
    title: "First-Principles Formulation",
    desc: "Rigorous scientific modeling, mathematical verification, and core material characterization conducted in sovereign labs.",
    icon: Microscope,
  },
  {
    step: "02",
    title: "Controlled Sandbox Testing",
    desc: "Simulating extreme operational conditions, thermal limits, soil physics, and network latencies in closed environments.",
    icon: FlaskConical,
  },
  {
    step: "03",
    title: "Field Stress Validation",
    desc: "Deploying prototypes directly into working mining pits, agricultural test plots, and hospital telemetry nodes.",
    icon: Activity,
  },
  {
    step: "04",
    title: "Multi-Season Proof",
    desc: "Refusing to make premature commercial claims until multi-season empirical data validates safety, longevity, and ROI.",
    icon: FileCheck2,
  },
  {
    step: "05",
    title: "National Scale & Deployment",
    desc: "Scaling verified innovations across Rashtra Bharosa Group ventures and critical national infrastructure projects.",
    icon: Workflow,
  },
];

const Innovation: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All Domains");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredPillars = rdPillars.filter((p) => {
    const matchesCategory =
      selectedCategory === "All Domains" || p.category === selectedCategory;
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      query === "" ||
      p.name.toLowerCase().includes(query) ||
      p.tagline.toLowerCase().includes(query) ||
      p.editorial.toLowerCase().includes(query) ||
      p.badge.toLowerCase().includes(query) ||
      p.venture.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-[#F8FAFC] text-slate-900 font-sans antialiased min-h-screen selection:bg-[#062B63] selection:text-white">
      {/* 1. Hero Header with Master Cultural Video & One-Line Motto */}
      <section className="relative pt-44 pb-12 lg:pt-56 lg:pb-16 overflow-hidden flex items-end min-h-[440px] lg:min-h-[500px] bg-[#041633]">
        <div className="absolute inset-0 z-0"><img src="https://images.unsplash.com/photo-1569653402334-2e98fbaa80ee?auto=format&fit=crop&w=2000&q=80" alt="Indian High-Tech Research and Sovereign Innovation" className="w-full h-full object-cover object-center scale-105" /></div><div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/75 to-black/45 z-0 pointer-events-none"></div>

        <div className="max-w-[1500px] w-full mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
          <div className="max-w-5xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-black/50 text-brand-gold border border-white/20 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse"></span>
              <span>Sovereign Intellectual Property & Deep-Tech R&D</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white uppercase leading-tight drop-shadow-lg">
              Innovation & Sovereign R&D
            </h1>
            
            <p className="text-xl sm:text-2xl font-bold text-brand-gold italic">
              Engineering Sovereign Deep-Tech Capabilities for National Self-Reliance.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Interactive Search & R&D Pillar Filter Toolbar */}
      <section className="py-4 bg-white/95 border-y border-slate-200 sticky top-[64px] z-30 backdrop-blur-xl shadow-xs">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Pillar Filter Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#041633] uppercase tracking-wider shrink-0 mr-1">
              <Filter size={14} /> Domain:
            </div>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  selectedCategory === cat
                    ? "bg-[#041633] text-white font-bold shadow-md ring-2 ring-[#041633]/20"
                    : "bg-slate-100 border border-slate-200 text-slate-600 hover:border-[#041633] hover:text-[#041633] hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Live Search Input */}
          <div className="relative w-full md:w-72 lg:w-80 shrink-0">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search R&D labs, models, robotics..."
              className="w-full pl-9 pr-8 py-2 rounded-full bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#041633] focus:border-[#041633] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-800 p-1 rounded-full"
                title="Clear search"
              >
                <X size={13} />
              </button>
            )}
          </div>

        </div>
      </section>

      {/* 3. Main R&D Programs Showcase: Stacking Sticky Cards Experience */}
      <div className="relative w-full bg-[#F8FAFC] overflow-visible">
        {/* Pinned Sticky Heritage Backdrop */}
        <div className="sticky top-0 h-screen w-full overflow-hidden z-0 pointer-events-none">
          <div className="relative w-full h-full">
            <img
              src={bgHeritage3}
              alt="Heritage motif"
              className="w-full h-full object-cover object-right opacity-15 scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#F8FAFC] via-[#F8FAFC]/60 to-[#F8FAFC]/90" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#F8FAFC]/95 via-[#F8FAFC]/80 to-transparent" />
          </div>
        </div>

        {/* Overlapping Stacking Cards Container */}
        <div className="relative z-10 -mt-[100vh] w-full px-4 sm:px-6 lg:px-12 pb-32">
          {/* Header Intro */}
          <div className="min-h-[45vh] flex flex-col justify-center max-w-5xl mx-auto pt-24 pb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-[#041633]/10 text-[#041633] border border-[#041633]/20 w-fit mb-3">
              <Zap className="w-3.5 h-3.5 text-brand-gold" />
              Sovereign Intellectual Property Matrix
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#041633] uppercase leading-tight">
              Deep-Tech Engineering <br />
              <span className="text-[#C5A880]">For Core Heavy Industries</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed max-w-3xl mt-2">
              Every innovation program at Rashtra Bharosa Group is conceived to solve real physical bottlenecks across heavy mining, industrial EPC, rural agriculture, and tertiary healthcare—delivering sovereign autonomy and high operational reliability.
            </p>
          </div>

          {/* Stacking Pillars List */}
          {filteredPillars.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center max-w-2xl mx-auto space-y-4 shadow-sm">
              <Search className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-xl font-bold text-slate-800">No matching R&D programs found</h3>
              <p className="text-xs text-slate-500">
                Try searching for keywords like "RashtrAI", "VED Ri", "AgriGel", "Robotics", or clear your filter.
              </p>
              <Button
                onClick={() => {
                  setSelectedCategory("All Domains");
                  setSearchQuery("");
                }}
                className="btn-primary bg-[#041633] text-white text-xs uppercase"
              >
                Reset Filters
              </Button>
            </div>
          ) : (
            <div className="max-w-6xl mx-auto space-y-24 sm:space-y-36">
              {filteredPillars.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <section
                    key={pillar.id}
                    id={pillar.id}
                    style={{ top: `${80 + idx * 16}px` }}
                    className="sticky transition-all duration-500 will-change-transform scroll-mt-32"
                  >
                    <div className="relative rounded-3xl overflow-hidden border border-slate-200 bg-white/95 backdrop-blur-xl shadow-xl hover:border-[#041633]/30 hover:shadow-2xl transition-all duration-300">
                      {/* Top Banner Header */}
                      <div className="bg-[#041633] text-white px-6 sm:px-10 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-white/10">
                        <div className="flex items-center gap-3">
                          <span className="px-3 py-1 text-xs font-extrabold uppercase tracking-wider rounded-lg bg-brand-gold text-[#041633] font-mono">
                            {pillar.badge}
                          </span>
                          <span className="text-xs font-bold uppercase tracking-widest text-slate-200 flex items-center gap-1.5">
                            <Icon size={14} className="text-brand-gold" />
                            <span>{pillar.venture}</span>
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-4 text-xs font-mono">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                            {pillar.status}
                          </span>
                          <div className="text-slate-300 hidden sm:flex items-center gap-1">
                            <Lock size={12} className="text-brand-gold" />
                            <span>100% In-Country IP</span>
                          </div>
                        </div>
                      </div>

                      {/* Content Grid */}
                      <div className="p-6 sm:p-10 lg:p-12">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                          
                          {/* Left Column: Video Media & Specs */}
                          <div className="lg:col-span-6 space-y-5">
                            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 aspect-[16/10] bg-slate-900 group">
                              {pillar.video ? (
                                <video
                                  src={pillar.video}
                                  autoPlay
                                  loop
                                  muted
                                  playsInline
                                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 opacity-95"
                                />
                              ) : (
                                <img
                                  src={pillar.fallbackImage}
                                  alt={pillar.name}
                                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 opacity-90"
                                />
                              )}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                              <div className="absolute bottom-4 left-4 right-4 text-white">
                                <div className="text-[10px] font-bold uppercase tracking-wider text-brand-gold flex items-center gap-1 mb-0.5">
                                  <Sparkles size={11} /> High-Assurance R&D Architecture
                                </div>
                                <div className="text-base sm:text-lg font-bold">{pillar.name}</div>
                              </div>
                            </div>

                            {/* Technical Specifications Grid */}
                            <div className="grid grid-cols-2 gap-2.5">
                              {pillar.specifications.map((spec, sIdx) => (
                                <div key={sIdx} className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-0.5">
                                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{spec.label}</div>
                                  <div className="text-xs font-black text-[#041633]">{spec.value}</div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Right Column: Narrative & Breakthroughs */}
                          <div className="lg:col-span-6 space-y-5">
                            <div>
                              <h3 className="text-2xl sm:text-3xl font-black text-[#041633] uppercase tracking-tight leading-tight">
                                {pillar.name}
                              </h3>
                              <div className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
                                {pillar.tagline}
                              </div>
                            </div>

                            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                              {pillar.editorial}
                            </p>

                            {/* Key Technical Breakthroughs */}
                            <div className="space-y-2.5 pt-2">
                              <div className="text-[11px] font-bold uppercase tracking-wider text-[#041633] flex items-center gap-1.5">
                                <CheckCircle2 size={13} className="text-[#041633]" />
                                Core Engineering Breakthroughs:
                              </div>
                              <div className="space-y-2">
                                {pillar.breakthroughs.map((h, hIdx) => (
                                  <div key={hIdx} className="flex items-start gap-2.5 text-xs text-slate-800 bg-slate-50/80 p-2 rounded-lg border border-slate-200/60">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#041633] mt-1.5 shrink-0"></span>
                                    <span className="text-[11px] leading-snug font-medium text-slate-800">{h}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Action Links */}
                            <div className="pt-3 flex flex-wrap items-center gap-3">
                              <Button asChild className="btn-primary bg-[#041633] hover:bg-[#062B63] text-white text-xs uppercase tracking-wider rounded-xl shadow-md px-6 py-2.5">
                                <Link to={pillar.link}>
                                  Explore Research Story <ArrowRight size={13} className="ml-1.5" />
                                </Link>
                              </Button>
                              <Button asChild variant="outline" className="border-slate-300 text-[#041633] hover:bg-slate-100 text-xs font-semibold rounded-xl px-5 py-2.5">
                                <Link to={pillar.ventureLink}>
                                  Venture Profile <ExternalLink size={12} className="ml-1.5 text-slate-400" />
                                </Link>
                              </Button>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  </section>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* 4. Scientific Rigor & The "Prove First" Methodology */}
      <section className="py-20 bg-white border-y border-slate-200">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-12 space-y-12">
          
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-emerald-50 text-emerald-800 border border-emerald-200">
              <ShieldCheck size={14} className="text-emerald-700" />
              Scientific Integrity & Compliance Doctrine
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#041633] uppercase tracking-tight">
              "Do Not Claim First. <span className="text-brand-gold">Prove First.</span>"
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Our R&D framework mandates an uncompromising evidence chain. Every robotic control loop, algorithm, and bio-polymer formulation must undergo rigorous empirical validation before commercial claims or scale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {rdPrinciples.map((item) => {
              const StepIcon = item.icon;
              return (
                <div
                  key={item.step}
                  className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-[#041633]/30 hover:shadow-lg transition-all space-y-3 relative group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-brand-gold font-mono">{item.step}</span>
                    <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#041633] group-hover:bg-[#041633] group-hover:text-white transition-colors">
                      <StepIcon size={16} />
                    </div>
                  </div>
                  <h3 className="text-sm font-bold text-[#041633] uppercase tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 5. Enterprise CTA / Inquiries */}
      <section className="py-16 bg-[#041633] text-white relative overflow-hidden">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-brand-gold border border-white/20">
                <Brain size={13} /> Applied Deep-Tech Partnerships
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight">
                Collaborate with Rashtra Bharosa R&D Labs
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl font-normal">
                We partner with premier Indian technical institutions, statutory research bodies, and industrial conglomerates to co-develop sovereign technologies for heavy industry, agriculture, and healthcare.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
              <Button asChild className="btn-primary bg-brand-gold hover:bg-[#b0936e] text-[#041633] font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg px-6 py-3">
                <Link to="/contact">
                  Request Technical Briefing <ArrowRight size={14} className="ml-1.5" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10 text-xs font-semibold rounded-xl px-6 py-3">
                <Link to="/projects">
                  View All Active Projects
                </Link>
              </Button>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Innovation;
