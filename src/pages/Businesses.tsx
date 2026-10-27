import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Pickaxe,
  HeartPulse,
  Laptop,
  Home as HomeIcon,
  Sprout,
  HardHat,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  Building2,
  ChevronRight,
  CheckCircle2,
  Briefcase,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SubsidiaryItem } from "@/pages/admin/VenturesManager";

// Master Video
import odishaHeroVideo from "@/assets/VIDEOS/odisha-hero.mp4";

// Proprietary & Stock Visual Assets
import healthcareImg from "@/assets/healthcare.jpg";
import healthcareHighlightImg from "@/assets/highlights/healthcare-highlight.jpg";
import stockHealthcareIcu from "@/assets/stock/stock_healthcare_cardio.jpg";
import stockHealthcareMri from "@/assets/stock/healthcare_mri.jpg";

import technologyImg from "@/assets/technology.jpg";
import stockTechServer from "@/assets/stock/tech_ai_network.jpg";
import stockTechRobotics from "@/assets/stock/tech_robotics.jpg";

import realestateImg from "@/assets/realestate.jpg";
import stockRealEstateExterior from "@/assets/stock/realestate_luxury_exterior.jpg";
import stockRealEstateInterior from "@/assets/stock/realestate_interior.jpg";

import soilImg from "@/assets/soil.jpg";
import agriHighlightImg from "@/assets/highlights/agri-highlight.jpg";
import stockAgriDrone from "@/assets/stock/stock_agri_drone.jpg";
import stockAgriHarvest from "@/assets/stock/agri_harvest.jpg";

import miningImg from "@/assets/mining.jpg";
import miningHighlightImg from "@/assets/highlights/mining-highlight.jpg";
import stockMiningQuarry from "@/assets/stock/stock_mining_quarry.jpg";
import stockMiningConveyor from "@/assets/stock/mining_conveyor.jpg";

import innovexImg from "@/assets/innovex.png";
import stockInfraHeavy from "@/assets/stock/infra_highway.jpg";
import stockInfraCranes from "@/assets/stock/infra_cranes.jpg";

import royalbirdsImg from "@/assets/royalbirds.png";
import stockBoardroom from "@/assets/stock/stock_corporate_boardroom.jpg";
import stockCommercialPark from "@/assets/stock/commercial_techpark.jpg";

import hqImg from "@/assets/hq.jpeg";

// Odisha Heritage Background Assets
import bgKonark1 from "@/assets/background/background-1.png";

const initialBusinesses = [
  {
    id: "mining",
    name: "RashBhar Mining",
    sector: "Mining & Mineral Operations",
    path: "/ventures/mining",
    icon: Pickaxe,
    primaryImage: miningImg,
    secondaryImage: stockMiningQuarry,
    tertiaryImage: stockMiningConveyor,
    badge: "Pillar 01 • Flagship",
    leadStatement: "Supplying primary raw minerals to power India's industrial manufacturing backbone and domestic energy security.",
    editorial:
      "RashBhar Mining forms the primary raw material foundation of the Rashtra Bharosa Group ecosystem. Operating mechanized extraction concessions in Eastern India's mineral-rich belts, the company focuses on responsible development of high-grade iron ore, thermal coal, and bauxite. By deploying automated drilling rigs, real-time 3D geological mapping, and dedicated railway siding dispatch hubs, we ensure reliable, uninterrupted bulk feedstock delivery to domestic steel plants, energy utilities, and heavy manufacturing corridors.",
    capabilities: [
      "High-grade Fe iron ore extraction & beneficiation circuits",
      "Direct dedicated rail freight dispatch & zero-choke logistics",
      "Progressive mine reclamation & botanical green-belt development",
      "AI-assisted mineral seam modeling & automated safety telemetry",
    ],
    accentGradient: "from-amber-600 to-orange-900",
  },
  {
    id: "construction",
    name: "Innovex Construction",
    sector: "Construction & Infrastructure",
    path: "/ventures/infrastructure",
    icon: HardHat,
    primaryImage: innovexImg,
    secondaryImage: stockInfraHeavy,
    tertiaryImage: stockInfraCranes,
    badge: "Pillar 02 • Heavy EPC",
    leadStatement: "Translating architectural plans and strategic capital into high-assurance civil infrastructure and industrial EPC assets.",
    editorial:
      "Innovex Construction delivers heavy civil engineering, industrial EPC projects, and critical logistics infrastructure. Specializing in high-capacity bulk material handling systems, overland conveyor networks, industrial processing facilities, and regional transport arteries, the company transforms engineering capability into durable physical assets.",
    capabilities: [
      "Heavy industrial EPC & structural steel fabrication",
      "Long-distance bulk material overland conveyor systems",
      "Arterial highway logistics corridors & rail-linked infrastructure",
      "Comprehensive structural health monitoring & ISO safety audits",
    ],
    accentGradient: "from-blue-600 to-indigo-900",
  },
  {
    id: "healthcare",
    name: "RashBhar Health Care",
    sector: "Healthcare & Medical Services",
    path: "/ventures/healthcare",
    icon: HeartPulse,
    primaryImage: healthcareImg,
    secondaryImage: stockHealthcareIcu,
    tertiaryImage: stockHealthcareMri,
    badge: "Pillar 03 • Clinical Infra",
    leadStatement: "Delivering advanced tertiary clinical cardiology and emergency healthcare infrastructure across Eastern India.",
    editorial:
      "RashBhar Health Care is dedicated to expanding equitable access to specialized tertiary medical infrastructure. The cornerstone of our medical vertical is a state-of-the-art 500-bed super-specialty hospital in Bhubaneswar, equipped with advanced cardiac catheterization laboratories, dedicated trauma suites, and digital intensive care units.",
    capabilities: [
      "500-bed super-specialty hospital center with dedicated cardiology wings",
      "Sarthi digital telemedicine mesh & remote ICU connectivity",
      "Advanced 24x7 cardiac catheterization & emergency trauma response",
      "Subsidized rural health screening camps & essential diagnostic outreach",
    ],
    accentGradient: "from-rose-600 to-red-950",
  },
  {
    id: "technology",
    name: "RashBhar Technology",
    sector: "Technology & Digital Solutions",
    path: "/ventures/technology",
    icon: Laptop,
    primaryImage: technologyImg,
    secondaryImage: stockTechServer,
    tertiaryImage: stockTechRobotics,
    badge: "Pillar 04 • Sovereign Deep-Tech",
    leadStatement: "Building indigenous sovereign AI platforms, embodied robotics, and high-assurance enterprise systems.",
    editorial:
      "RashBhar Technology develops indigenous deep-tech platforms that drive operational autonomy and industrial modernization for Indian enterprises. Operating our proprietary RashtrAI foundation AI platform and the VED Ri Robotics Laboratory, the company delivers tele-operation robotics for hazardous mining environments and predictive maintenance.",
    capabilities: [
      "RashtrAI enterprise foundation AI & workflow orchestration",
      "VED Ri embodied robotics for industrial & mining tele-operations",
      "Zero-leakage sovereign in-country data infrastructure",
      "Real-time sensor telemetry & automated operational dashboards",
    ],
    accentGradient: "from-cyan-600 to-blue-950",
  },
  {
    id: "soil",
    name: "RashBhar Soil & Soul",
    sector: "Agriculture & Soil Solutions",
    path: "/ventures/agriculture",
    icon: Sprout,
    primaryImage: soilImg,
    secondaryImage: stockAgriDrone,
    tertiaryImage: stockAgriHarvest,
    badge: "Pillar 05 • Crop Sciences",
    leadStatement: "Pioneering drought-resilient soil polymers, certified organic farming, and farm-to-table supply chains.",
    editorial:
      "RashBhar Soil & Soul bridges scientific innovation with grassroots agronomy to enhance agricultural productivity and farmer prosperity across rural Bharat. At the core of our agricultural capability is AgriGel™, a proprietary biodegradable superabsorbent polymer that retains soil moisture and cuts crop irrigation water requirements by up to 50%.",
    capabilities: [
      "AgriGel™ soil hydrogel moisture conservation technology",
      "Certified bio-organic farmer collective networks",
      "Solar-powered post-harvest cold storage & rapid sorting hubs",
      "Soil health analysis, digital agronomy extension & buyback guarantees",
    ],
    accentGradient: "from-emerald-600 to-teal-950",
  },
  {
    id: "realestate",
    name: "RashBhar Real Estate",
    sector: "Real Estate & Property Development",
    path: "/ventures/real-estate",
    icon: HomeIcon,
    primaryImage: realestateImg,
    secondaryImage: stockRealEstateExterior,
    tertiaryImage: stockRealEstateInterior,
    badge: "Pillar 06 • Sustainable Living",
    leadStatement: "Creating thoughtfully planned urban assets, Grade-A IT business parks, and sustainable residential communities.",
    editorial:
      "RashBhar Real Estate develops institutional-grade real estate assets designed to foster long-term community wellbeing and commercial productivity. Our flagship development includes 'Reyansh Elanza', a high-rise luxury apartment enclave set within a master-planned gated community in Bhubaneswar.",
    capabilities: [
      "Reyansh Elanza luxury residential apartments & gated enclave",
      "Master-planned sustainable urban communities",
      "IGBC certified green building standards & solar integration",
      "Smart IoT automated facilities & biometric access management",
    ],
    accentGradient: "from-purple-600 to-slate-900",
  },
  {
    id: "investments",
    name: "Royal Birds Group",
    sector: "Capital & Strategic Investments",
    path: "/ventures/investments",
    icon: TrendingUp,
    primaryImage: royalbirdsImg,
    secondaryImage: stockBoardroom,
    tertiaryImage: stockCommercialPark,
    badge: "Pillar 07 • Sovereign Capital",
    leadStatement: "Stewardship of patient promoter capital, disciplined venture incubation, and infrastructure treasury management.",
    editorial:
      "Royal Birds Group operates as the strategic capital deployment and enterprise-creation arm of Rashtra Bharosa Group. Managing promoter equity and long-term group treasury reserves, the entity finances high-barrier physical infrastructure SPVs, incubates future-ready deep-tech ventures, and structures institutional joint ventures.",
    capabilities: [
      "Promoter capital allocation & long-term treasury management",
      "Infrastructure SPV equity financing & debt syndication structuring",
      "Strategic venture incubation in sovereign technologies & manufacturing",
      "Cross-vertical financial synergy & risk mitigation frameworks",
    ],
    accentGradient: "from-amber-600 to-yellow-950",
  },
];

const Businesses: React.FC = () => {
  const [activeBusinesses] = useState(() => {
    const saved = localStorage.getItem("rbg_subsidiaries_data");
    if (saved) {
      try {
        const parsed: SubsidiaryItem[] = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return initialBusinesses.map((b) => {
            const matched = parsed.find((p) => p.id === b.id);
            if (matched) {
              return {
                ...b,
                name: matched.name,
                badge: matched.badge,
                leadStatement: matched.leadStatement,
                editorial: matched.editorial,
                capabilities: matched.capabilities || b.capabilities,
              };
            }
            return b;
          });
        }
      } catch (e) {
        console.warn(e);
      }
    }
    return initialBusinesses;
  });
  return (
    <div className="bg-[#F8FAFC] text-slate-900 font-sans antialiased min-h-screen selection:bg-[#062B63] selection:text-white">
      {/* Hero Header with Master Indian Industrial Conglomerate Backdrop */}
      <section className="relative pt-44 pb-14 lg:pt-56 lg:pb-20 overflow-hidden flex items-end min-h-[440px] lg:min-h-[500px] bg-[#041633]">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1758873269035-aae0e1fd3422?auto=format&fit=crop&w=2000&q=80"
            alt="Indian Corporate Enterprise Directorate"
            className="w-full h-full object-cover object-center scale-105"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#041633] via-[#041633]/85 to-[#041633]/60 z-0 pointer-events-none"></div>

        <div className="max-w-[1500px] w-full mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
          <div className="max-w-5xl space-y-3">
            <div className="inline-flex items-center gap-2.5">
              <span className="w-6 h-[2px] bg-brand-gold"></span>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-gold">
                Enterprise Operating Architecture
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-light tracking-tight text-white leading-tight">
              Seven Integrated <strong className="font-bold">Subsidiaries</strong>
            </h1>
            <p className="text-sm sm:text-base font-medium text-slate-200 uppercase tracking-[0.14em]">
              Engineering Strategic Capabilities Across Bharat's Core Economy.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Jump Bar for all 7 Verticals */}
      <section className="py-4 bg-white/95 border-y border-slate-200 sticky top-[64px] z-30 backdrop-blur-xl shadow-xs">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
          <div className="text-xs font-bold text-[#062B63] uppercase tracking-[0.18em] shrink-0 flex items-center gap-2">
            <span className="w-4 h-[2px] bg-brand-gold"></span>
            <span>Business Verticals:</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {activeBusinesses.map((b) => (
              <a
                key={b.id}
                href={`#${b.id}`}
                className="px-3.5 py-1.5 rounded text-xs font-semibold bg-[#F8FAFC] border border-slate-200 text-slate-700 hover:border-[#062B63] hover:text-[#062B63] hover:bg-slate-100 transition-all whitespace-nowrap uppercase tracking-[0.08em]"
              >
                {b.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* STICKY SCROLL EXPERIENCE: PINNED HERITAGE BACKDROP + MULTI-IMAGE EDITORIAL CARDS */}
      <div className="relative w-full bg-[#F8FAFC] overflow-visible">
        {/* Pinned Sticky Odisha Heritage Background */}
        <div className="sticky top-0 h-screen w-full overflow-hidden z-0 pointer-events-none">
          <div className="relative w-full h-full">
            <img
              src={bgKonark1}
              alt="Odisha Konark Sun Temple Heritage Backdrop"
              className="w-full h-full object-cover object-right md:object-center opacity-10 scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#F8FAFC] via-[#F8FAFC]/60 to-[#F8FAFC]/90" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#F8FAFC]/95 via-[#F8FAFC]/80 to-transparent" />
          </div>
        </div>

        {/* Overlapping Stacking Cards Container */}
        <div className="relative z-10 -mt-[100vh] w-full px-4 sm:px-6 lg:px-12 pb-32">
          {/* Header intro before cards stack */}
          <div className="min-h-[40vh] flex flex-col justify-center max-w-5xl mx-auto pt-24 pb-12 space-y-3">
            <div className="inline-flex items-center gap-2.5">
              <span className="w-6 h-[2px] bg-[#A87930]"></span>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#062B63]">
                Sovereign Operating Subsidiaries
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#062B63] leading-tight">
              Ecosystem Overview <br />
              <strong className="font-bold text-[#D9961A]">Across Essential Pillars</strong>
            </h2>
          </div>

          {/* Stacking Overlapping Cards with Dual Visual Photography */}
          <div className="max-w-6xl mx-auto space-y-24 sm:space-y-32">
            {activeBusinesses.map((biz, idx) => {
              const Icon = biz.icon;
              return (
                <section
                  key={biz.id}
                  id={biz.id}
                  style={{ top: `${80 + idx * 16}px` }}
                  className="sticky transition-all duration-500 will-change-transform scroll-mt-32"
                >
                  <div className="relative rounded-lg p-6 sm:p-10 lg:p-12 overflow-hidden bg-white/98 border border-slate-200/90 shadow-xl transition-all backdrop-blur-xl">
                    {/* Ambient Subtle Refractive Glow */}
                    <div
                      className={`absolute top-0 right-0 w-96 h-96 bg-gradient-to-br ${biz.accentGradient} opacity-5 rounded-full blur-3xl -z-10`}
                    />

                    {/* Card Header */}
                    <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200/70">
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] rounded bg-[#062B63] text-white border border-[#062B63] shadow-xs">
                          {biz.badge}
                        </span>
                        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#062B63] flex items-center gap-1.5">
                          <Icon size={14} className="text-[#A87930]" />
                          <span>{biz.sector}</span>
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 uppercase tracking-widest font-medium">
                        Rashtra Bharosa Group
                      </div>
                    </div>

                    {/* Card Grid Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-8 items-center">
                      {/* Left Column: Single Office Visual Asset */}
                      <div className="lg:col-span-5 space-y-4">
                        <div className="relative rounded-xl overflow-hidden shadow-lg border border-slate-200/90 aspect-[4/3] bg-slate-100 group">
                          <img
                            src={biz.primaryImage}
                            alt={biz.name}
                            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />
                          <div className="absolute bottom-3.5 left-4 right-4 text-white">
                            <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand-gold">
                              Official Office / Operational Facility
                            </div>
                            <div className="text-sm font-bold">{biz.name}</div>
                          </div>
                        </div>

                        {/* Highlight Pill */}
                        <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200 text-xs text-slate-700 font-normal leading-relaxed shadow-xs">
                          <span className="font-bold text-[#062B63] uppercase tracking-[0.14em] text-[10px] block mb-1">
                            Strategic Thesis:
                          </span>
                          {biz.leadStatement}
                        </div>
                      </div>

                      {/* Right Column: Editorial & Capabilities */}
                      <div className="lg:col-span-7 space-y-4">
                        <h3 className="text-2xl sm:text-3xl font-light text-slate-900 tracking-tight leading-tight">
                          <strong className="font-bold text-[#062B63]">{biz.name}</strong>
                        </h3>

                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                          {biz.editorial}
                        </p>

                        {/* Capabilities */}
                        <div className="space-y-2 pt-1">
                          <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#062B63]">
                            Core Capabilities:
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-800">
                            {biz.capabilities.map((cap, cIdx) => (
                              <div
                                key={cIdx}
                                className="flex items-start gap-2 bg-[#F8FAFC] p-2.5 rounded border border-slate-200"
                              >
                                <CheckCircle2 size={13} className="text-[#198C43] shrink-0 mt-0.5" />
                                <span className="text-[11px] leading-snug font-medium text-slate-800">{cap}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Single Clean Action Link */}
                        <div className="pt-2">
                          <Button asChild className="btn-primary bg-[#062B63] hover:bg-[#093d8f] text-white text-xs font-semibold uppercase tracking-[0.14em] rounded shadow-sm px-6 py-2.5">
                            <Link to={biz.path}>
                              Read More About {biz.name} <ArrowRight size={13} className="ml-1.5" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Businesses;
