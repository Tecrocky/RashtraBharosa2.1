import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Pickaxe,
  HardHat,
  HeartPulse,
  Laptop,
  Sprout,
  Building2,
  TrendingUp,
  ArrowRight,
  ExternalLink,
  X,
  Sparkles,
  ShieldCheck,
  ChevronDown,
  Layers,
} from "lucide-react";
import AboutSubnav from "@/components/about/AboutSubnav";
import { Button } from "@/components/ui/button";

// Assets
import hqImg from "@/assets/hq.jpeg";
import odishaHeroVideo from "@/assets/VIDEOS/odisha-hero.mp4";
import miningImg from "@/assets/mining.jpg";
import infraImg from "@/assets/innovex.png";
import healthImg from "@/assets/healthcare.jpg";
import techImg from "@/assets/technology.jpg";
import soilImg from "@/assets/soil.jpg";
import realestateImg from "@/assets/realestate.jpg";
import royalbirdsImg from "@/assets/royalbirds.png";
import logoImg from "@/assets/logo.png";

interface Entity {
  name: string;
  type: string;
  focus: string;
  status: string;
}

interface SubsidiaryNode {
  id: string;
  badgeNumber: string;
  name: string;
  sector: string;
  ownership: string;
  image: string;
  link: string;
  icon: any;
  overview: string;
  angle: number; // degrees for circular placement
  entities: Entity[];
}

const subsidiariesData: SubsidiaryNode[] = [
  {
    id: "mining",
    badgeNumber: "01",
    name: "RashBhar Mining",
    sector: "Mining & Mineral Operations",
    ownership: "Wholly Owned Operating Subsidiary",
    image: miningImg,
    link: "/ventures/mining",
    icon: Pickaxe,
    overview:
      "RashBhar Mining represents the mining and mineral operations capability of the Rashtra Bharosa ecosystem. The company focuses on responsible mineral development, resource management, industrial supply chains and long-term resource security, contributing to India's productive industrial growth and economic development.",
    angle: -90, // 12 o'clock
    entities: [
      { name: "Barbil Iron Ore Operations", type: "Extraction Unit", focus: "High-grade Fe ore processing", status: "Operational" },
      { name: "Jharkhand Coal & Minerals", type: "Resource Unit", focus: "Industrial fuel & thermal coal", status: "Under Development" },
      { name: "Odisha Bauxite Leases", type: "Exploration", focus: "Primary alumina feedstock", status: "Survey Phase" },
    ],
  },
  {
    id: "construction",
    badgeNumber: "02",
    name: "RashBhar Infrastructure / Innovex",
    sector: "Infrastructure & Heavy Engineering",
    ownership: "100% Group Subsidiary (Innovex Construction)",
    image: infraImg,
    link: "/ventures/infrastructure",
    icon: HardHat,
    overview:
      "RashBhar Infrastructure (operating through Innovex Construction) represents the civil engineering and heavy infrastructure capability of the Group. The company contributed ₹10 Cr (20%) in first-year operations, transforming capital and engineering precision into physical industrial plants, conveyor systems, and vital logistics corridors.",
    angle: -38.57, // ~1:30
    entities: [
      { name: "Heavy Civil EPC Division", type: "EPC Unit", focus: "Industrial structural engineering", status: "Active" },
      { name: "Industrial Conveyor Systems", type: "Plant Engineering", focus: "Bulk mineral conveyance", status: "Active" },
      { name: "Regional Freight Corridors", type: "Infrastructure", focus: "Arterial freight connectivity", status: "Active" },
    ],
  },
  {
    id: "realestate",
    badgeNumber: "03",
    name: "RashBhar Real Estate",
    sector: "Real Estate & Property Development",
    ownership: "Wholly Owned Group Subsidiary",
    image: realestateImg,
    link: "/ventures/real-estate",
    icon: Building2,
    overview:
      "RashBhar Real Estate represents the physical asset and property development capability of the Group. The company focuses on residential, commercial IT and mixed-use environments (Reyansh Series), creating assets that support businesses and long-term urban growth in Eastern India.",
    angle: 12.86, // ~3:30
    entities: [
      { name: "Reyansh Elanza", type: "Residential Gated Community", focus: "High-rise luxury residential enclave", status: "Under Development" },
      { name: "Reyansh Urban Masterplans", type: "Integrated Developments", focus: "Sustainable mixed-use communities", status: "Planning & Engineering" },
    ],
  },
  {
    id: "soil",
    badgeNumber: "04",
    name: "RashBhar Soil & Soul",
    sector: "Agriculture & Soil Solutions",
    ownership: "100% Group Subsidiary",
    image: soilImg,
    link: "/ventures/agriculture",
    icon: Sprout,
    overview:
      "RashBhar Soil & Soul focuses on agricultural science, soil enhancement, and rural prosperity. The company is actively developing AgriGel™—an engineered gel-based soil conditioner currently in controlled R&D field trials with a strict 'prove first' validation ethos.",
    angle: 64.29, // ~5:00
    entities: [
      { name: "AgriGel™ Science Division", type: "R&D Unit", focus: "Engineered hydrogel soil hydration", status: "Controlled Field Trials (R&D)" },
      { name: "Organic Agronomy Networks", type: "Agronomy", focus: "Chemical-free sustainable farming", status: "Active" },
      { name: "Rural Supply Chains", type: "Supply Chain", focus: "Direct farmer support & storage", status: "Active" },
    ],
  },
  {
    id: "technology",
    badgeNumber: "05",
    name: "RashBhar Technology",
    sector: "Technology & Sovereign Deep-Tech",
    ownership: "Wholly Owned Deep-Tech Subsidiary",
    image: techImg,
    link: "/ventures/technology",
    icon: Laptop,
    overview:
      "RashBhar Technology develops indigenous software platforms, specialized AI workforces (RashtrAI), and purpose-built robotics (VEDRI / B3) engineered specifically for heavy industrial, mining, and construction environments with 100% in-country data sovereignty.",
    angle: 115.71, // ~7:00
    entities: [
      { name: "RashtrAI Engine", type: "AI Workforce", focus: "Mining & construction agent platform", status: "Active R&D" },
      { name: "VEDRI / B3 Robotics", type: "Physical Intelligence", focus: "Specialized industrial robots", status: "Active R&D" },
      { name: "Sovereign In-Country Infrastructure", type: "Data Systems", focus: "Air-gapped data sovereignty", status: "Operational" },
    ],
  },
  {
    id: "healthcare",
    badgeNumber: "06",
    name: "RashBhar Health Care",
    sector: "Healthcare & Clinical Infrastructure",
    ownership: "Wholly Owned Operating Subsidiary",
    image: healthImg,
    link: "/ventures/healthcare",
    icon: HeartPulse,
    overview:
      "RashBhar Healthcare represents the clinical care and hospital infrastructure capability of the Group. Developing tertiary multi-specialty facilities with Level-1 trauma care, advanced cardiology suites, and multi-lingual emergency digital triage to democratize medicine across Eastern India.",
    angle: 167.14, // ~8:30
    entities: [
      { name: "RashBhar Tertiary Medical Center", type: "Clinical Center", focus: "500-Bed Tertiary Cardiology & Trauma", status: "Under Development" },
      { name: "Sarthi Digital Health Mesh", type: "Digital Health", focus: "Multi-lingual emergency triage", status: "Active Deployment" },
      { name: "Regional Outreach Camps", type: "Preventative", focus: "Subsidized diagnostic care", status: "Active" },
    ],
  },
  {
    id: "investments",
    badgeNumber: "07",
    name: "RashBhar Capital",
    sector: "Capital & Strategic Investments",
    ownership: "Strategic Capital Vehicle (Royal Birds Group acquired 11 April 2026)",
    image: royalbirdsImg,
    link: "/ventures/investments",
    icon: TrendingUp,
    overview:
      "RashBhar Capital represents the strategic investment and incubation vehicle of the Group. Established through the acquisition of Royal Birds Group Limited (completed 11 April 2026), it deploys patient promoter capital into high-growth, high-impact Indian enterprises.",
    angle: 218.57, // ~10:30
    entities: [
      { name: "Strategic Incubation Fund", type: "Growth Capital", focus: "Early-stage industrial & tech ventures", status: "Active" },
      { name: "Royal Birds Asset Holdings", type: "Asset Vehicle", focus: "Acquired legacy enterprise portfolio", status: "Active" },
    ],
  },
];

const GroupStructure: React.FC = () => {
  const [selectedSub, setSelectedSub] = useState<SubsidiaryNode | null>(null);
  const [showHQModal, setShowHQModal] = useState<boolean>(false);
  const [expandedAccordion, setExpandedAccordion] = useState<string | null>("mining");

  return (
    <div className="bg-white text-[#1F2937] font-sans antialiased min-h-screen">
      {/* 1. Hero Section with Cinematic Background Video */}
      <section className="relative pt-44 pb-16 lg:pt-56 lg:pb-24 overflow-hidden flex items-end min-h-[460px] lg:min-h-[520px] bg-[#041633]">
        <div className="absolute inset-0 bg-gradient-to-t from-[#041633] via-[#041633]/65 to-transparent z-0 pointer-events-none" />

        <div className="max-w-[1500px] w-full mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
          <div className="max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2.5">
              <span className="w-6 h-[2px] bg-brand-gold" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-gold">
                Organizational Hierarchy & Portfolio
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-light tracking-tight text-white leading-tight">
              Group Structure & <strong className="font-semibold text-white">Conglomerate Architecture</strong>
            </h1>
            <p className="text-sm sm:text-base font-medium text-slate-200 uppercase tracking-[0.16em]">
              Seven Integrated Subsidiaries • One Shared Mandate
            </p>
          </div>
        </div>
      </section>

      {/* Sub-Navigation */}
      <AboutSubnav />

      {/* 2. THE MASTER CIRCULAR ORBIT (WHITE BACKGROUND + REAL OFFICE PHOTOS) */}
      <section className="py-20 lg:py-28 bg-white border-b border-slate-200 relative overflow-hidden">
        {/* Subtle Light Geometric Matrix */}
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(6, 43, 99, 0.08) 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        ></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
          {/* Section Header */}
          <div className="text-center max-w-4xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2">
              <span className="w-5 h-[2px] bg-brand-gold" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#041633]">
                Interactive Corporate Constellation
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-light text-[#041633] tracking-tight">
              The Connected Ecosystem of <strong className="font-semibold">Rashtra Bharosa</strong>
            </h2>
            <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Click on any subsidiary or the central headquarters circle to inspect detailed office information, operating units, and dedicated ventures.
            </p>
          </div>

          {/* Master 360° Circular Orbit Visualizer with Live Luxury Orbit Animation */}
          <div className="orbit-container relative w-full max-w-[920px] h-[780px] sm:h-[860px] lg:h-[920px] mx-auto flex items-center justify-center">
            {/* Ambient Background Glow Halos */}
            <div className="absolute w-[500px] h-[500px] rounded-full bg-blue-100/40 blur-3xl pointer-events-none -z-10 animate-pulse"></div>
            <div className="absolute w-[320px] h-[320px] rounded-full bg-amber-100/30 blur-2xl pointer-events-none -z-10"></div>

            {/* Background SVG Orbit Tracks (Stationary & Counter-Rotating Rings) */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-0"
              viewBox="0 0 900 900"
            >
              {/* Outer Decorative Track */}
              <circle
                cx="450"
                cy="450"
                r="380"
                fill="none"
                stroke="#E2E8F0"
                strokeWidth="1"
                strokeDasharray="4 8"
                opacity="0.7"
              />

              {/* Reverse Rotating Middle Dashed Orbit Ring */}
              <g className="orbit-spin-reverse-slow" style={{ transformOrigin: "450px 450px" }}>
                <circle
                  cx="450"
                  cy="450"
                  r="340"
                  fill="none"
                  stroke="#CBD5E1"
                  strokeWidth="2"
                  strokeDasharray="8 10"
                  className="orbit-dash-animated"
                />
                {/* Orbiting Golden & Blue Photons */}
                <circle cx="450" cy="110" r="4" fill="#D9961A" className="animate-ping" opacity="0.75" />
                <circle cx="790" cy="450" r="4.5" fill="#062B63" />
                <circle cx="450" cy="790" r="4" fill="#D9961A" />
                <circle cx="110" cy="450" r="4.5" fill="#062B63" />
              </g>

              {/* Inner Halo Orbit Line with Smooth Dash */}
              <circle
                cx="450"
                cy="450"
                r="220"
                fill="none"
                stroke="#CBD5E1"
                strokeWidth="1.5"
                strokeDasharray="6 6"
                opacity="0.6"
              />

              {/* Inner Concentric Core Ring */}
              <circle
                cx="450"
                cy="450"
                r="150"
                fill="none"
                stroke="#062B63"
                strokeWidth="1"
                strokeDasharray="2 4"
                opacity="0.3"
              />
            </svg>

            {/* =========================================================
                ROTATING SATELLITE CONSTELLATION LAYER (45s Full Revolution)
                Spokes rotate together with the 7 satellite nodes
               ========================================================= */}
            <div className="absolute inset-0 w-full h-full orbit-spin-slow pointer-events-none z-10">
              {/* SVG Connecting Spokes inside the rotating frame */}
              <svg
                className="w-full h-full"
                viewBox="0 0 900 900"
              >
                {subsidiariesData.map((node) => {
                  const rad = (node.angle * Math.PI) / 180;
                  const targetX = 450 + 340 * Math.cos(rad);
                  const targetY = 450 + 340 * Math.sin(rad);
                  const innerX = 450 + 130 * Math.cos(rad);
                  const innerY = 450 + 130 * Math.sin(rad);

                  return (
                    <g key={node.id}>
                      <line
                        x1={innerX}
                        y1={innerY}
                        x2={targetX}
                        y2={targetY}
                        stroke="#94A3B8"
                        strokeWidth="1.5"
                        strokeDasharray="4 4"
                        opacity="0.6"
                      />
                      {/* Flowing connector particle */}
                      <circle
                        cx={(innerX + targetX) / 2}
                        cy={(innerY + targetY) / 2}
                        r="2.5"
                        fill="#062B63"
                        opacity="0.5"
                      />
                    </g>
                  );
                })}
              </svg>

              {/* 7 Satellite Nodes (with counter-rotation to keep cards upright & readable) */}
              {subsidiariesData.map((node) => {
                const NodeIcon = node.icon;
                const rad = (node.angle * Math.PI) / 180;
                const xPos = 50 + 37.7 * Math.cos(rad);
                const yPos = 50 + 37.7 * Math.sin(rad);

                return (
                  <div
                    key={node.id}
                    style={{
                      left: `${xPos}%`,
                      top: `${yPos}%`,
                    }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer group"
                    onClick={() => setSelectedSub(node)}
                  >
                    {/* Counter-Spin Wrapper ensures upright photos, text & icons */}
                    <div className="orbit-counter-spin-slow flex flex-col items-center">
                      {/* Outer Satellite Circle with Office Photo */}
                      <div className="relative">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-3 border-[#062B63] bg-white shadow-xl overflow-hidden group-hover:scale-110 group-hover:border-brand-gold group-hover:ring-4 group-hover:ring-amber-100 transition-all duration-300">
                          <img
                            src={node.image}
                            alt={node.name}
                            className="w-full h-full object-cover group-hover:scale-115 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-[#062B63]/15 group-hover:bg-transparent transition-colors"></div>
                        </div>

                        {/* Sector Badge Icon */}
                        <div className="absolute -top-1 -right-1 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#062B63] text-brand-gold border-2 border-white shadow-lg flex items-center justify-center group-hover:bg-brand-gold group-hover:text-[#062B63] group-hover:scale-110 transition-all z-20">
                          <NodeIcon size={16} className="sm:w-4 sm:h-4 stroke-[2.5]" />
                        </div>
                      </div>

                      {/* Name Written Clearly Below */}
                      <div className="mt-2 text-center max-w-[120px] sm:max-w-[140px] bg-white/80 backdrop-blur-xs px-2 py-0.5 rounded-lg border border-slate-100 shadow-xs group-hover:border-slate-300 transition-all">
                        <div className="text-[11px] sm:text-xs font-bold text-[#062B63] group-hover:text-brand-gold leading-tight transition-colors">
                          {node.name}
                        </div>
                        <div className="text-[9px] font-semibold text-slate-500 uppercase tracking-wider mt-0.5">
                          {node.sector.includes("·") ? node.sector.split("·")[0].trim() : node.sector.includes("&") ? node.sector.split("&")[0].trim() : node.sector}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* =========================================================
                CENTER HUB: RASHTRA BHAROSA GROUP NATIONAL HEADQUARTERS
                Anchored with Radiating Pulse Rings & Specular Highlight
               ========================================================= */}
            <div className="relative z-30 flex items-center justify-center">
              {/* Radiating Liquid Halo Rings */}
              <div className="absolute w-56 h-56 sm:w-72 sm:h-72 rounded-full border border-[#062B63]/20 animate-ping opacity-25 pointer-events-none"></div>
              <div className="absolute w-52 h-52 sm:w-68 sm:h-68 rounded-full border-2 border-brand-gold/30 pointer-events-none"></div>

              <div
                onClick={() => setShowHQModal(true)}
                className="relative z-20 w-48 h-48 sm:w-64 sm:h-64 rounded-full border-4 border-[#062B63] bg-white p-2 shadow-2xl flex flex-col items-center justify-center text-center overflow-hidden cursor-pointer group hover:scale-105 transition-all duration-300 ring-8 ring-blue-50"
              >
                {/* HQ Office Photo */}
                <img
                  src={hqImg}
                  alt="Rashtra Bharosa Group Headquarters"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#062B63] via-[#062B63]/60 to-transparent"></div>

                <div className="relative z-10 px-3 space-y-1 text-white">
                  <img src={logoImg} alt="Logo" className="w-9 h-9 sm:w-11 sm:h-11 mx-auto drop-shadow-md" />
                  <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest text-brand-gold block">
                    Central Command
                  </span>
                  <h3 className="text-sm sm:text-base font-extrabold leading-tight text-white drop-shadow">
                    Rashtra Bharosa Group
                  </h3>
                  <p className="text-[9px] sm:text-[10px] text-slate-200">
                    National HQ • Bhubaneswar
                  </p>
                  <div className="inline-block text-[9px] font-bold text-brand-gold underline mt-0.5">
                    Click to Inspect HQ →
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SUBSIDIARY DETAIL POPUP BOX / MODAL (Pure Company Description Focus) */}
      {selectedSub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full relative shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col">
            {/* Modal Header Photo Banner */}
            <div className="relative h-48 sm:h-56 bg-slate-900 overflow-hidden">
              <img
                src={selectedSub.image}
                alt={selectedSub.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#062B63] via-[#062B63]/60 to-transparent"></div>

              <button
                type="button"
                onClick={() => setSelectedSub(null)}
                className="absolute top-4 right-4 text-white hover:text-brand-gold bg-black/40 hover:bg-black/60 p-2 rounded-full transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>

              <div className="absolute bottom-4 left-6 right-6 text-white space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold block">
                  {selectedSub.ownership}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight">
                  {selectedSub.name}
                </h3>
                <p className="text-xs text-slate-200">{selectedSub.sector}</p>
              </div>
            </div>

            {/* Modal Body Content - Company Description */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-5">
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#062B63]">
                  Company Overview & Institutional Profile
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {selectedSub.overview}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs text-slate-600">
                <div className="font-bold text-[#062B63] uppercase tracking-wider text-[11px]">
                  Strategic Sector Mandate
                </div>
                <p className="leading-relaxed">
                  Operating under the centralized governance and capital stewardship of Rashtra Bharosa Group to build long-term domestic self-reliance, high-standard execution, and sustainable socio-economic impact across India.
                </p>
              </div>

              {/* Actions */}
              <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedSub(null)}
                  className="text-xs font-bold"
                >
                  Close Box
                </Button>

                <Button asChild size="sm" className="btn-primary text-xs font-bold">
                  <Link to={selectedSub.link}>
                    Visit Dedicated Page <ArrowRight size={13} className="ml-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. HQ DETAIL MODAL */}
      {showHQModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full relative shadow-2xl border border-slate-200 overflow-hidden">
            <div className="relative h-48 bg-slate-900 overflow-hidden">
              <img
                src={hqImg}
                alt="Rashtra Bharosa Headquarters"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#062B63] via-transparent to-black/30"></div>

              <button
                type="button"
                onClick={() => setShowHQModal(false)}
                className="absolute top-4 right-4 text-white hover:text-brand-gold bg-black/40 hover:bg-black/60 p-2 rounded-full transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>

              <div className="absolute bottom-4 left-6 text-white space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold block">
                  Promoter Holding Command
                </span>
                <h3 className="text-2xl font-bold text-white">Rashtra Bharosa Group</h3>
                <p className="text-xs text-slate-200">Bhubaneswar, Odisha, India</p>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <p>
                Rashtra Bharosa Group serves as the ultimate parent company, providing central governance, capital stewardship, treasury allocation, and legal compliance across all operating subsidiaries.
              </p>
              <div className="pt-2 flex justify-end">
                <Button
                  type="button"
                  onClick={() => setShowHQModal(false)}
                  className="btn-primary text-xs font-bold"
                >
                  Close Details
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default GroupStructure;

