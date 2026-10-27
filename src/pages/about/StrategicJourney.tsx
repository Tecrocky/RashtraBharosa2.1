import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  Building2,
  TrendingUp,
  Award,
  Layers,
  ArrowRight,
  Filter,
  CheckCircle2,
} from "lucide-react";
import AboutSubnav from "@/components/about/AboutSubnav";
import odishaHeroVideo from "@/assets/VIDEOS/odisha-hero.mp4";
import { Button } from "@/components/ui/button";

interface Milestone {
  id: string;
  year: string;
  quarter?: string;
  title: string;
  category: "Founding" | "Acquisition" | "Expansion" | "Innovation" | "Infrastructure";
  summary: string;
  details: string[];
}

const milestoneData: Milestone[] = [
  {
    id: "m-01",
    year: "18 April 2025",
    quarter: "Foundation",
    title: "Founding of Rashtra Bharosa Group",
    category: "Founding",
    summary: "Rashtra Bharosa Group was founded by industrialist Subransu Mohanty with an overarching thesis of patient, productive capital allocation and national self-reliance.",
    details: [
      "Foundational business base established in Natural Resources & Mining alongside Infrastructure.",
      "Headquartered in Bhubaneswar, Odisha with sovereign focus on core nation-building sectors.",
      "Framing of the institutional ethos: 'Rooted in Trust, Rising with Bharat'.",
    ],
  },
  {
    id: "m-02",
    year: "09 July 2025",
    quarter: "Registration",
    title: "Corporate Registrations & Charters Completed",
    category: "Founding",
    summary: "Statutory and institutional registrations completed across corporate holding entities and operating structures.",
    details: [
      "Filing and formalization of Group governance framework and statutory compliance charters.",
      "Structuring of operating subsidiaries across resources, engineering, and technology.",
    ],
  },
  {
    id: "m-03",
    year: "26 August 2025",
    quarter: "Establishment",
    title: "Group Fully Established & Operations Mobilized",
    category: "Founding",
    summary: "Rashtra Bharosa Group announced full corporate establishment with active operational oversight across core verticals.",
    details: [
      "Commissioning of central executive corporate command at Bhubaneswar National HQ.",
      "Integration of regional liaison footprint across New Delhi, Kolkata, Mumbai, and Ranchi.",
      "Mobilization of mineral extraction operations under flagship entity RashBhar Mining.",
    ],
  },
  {
    id: "m-04",
    year: "11 April 2026",
    quarter: "Acquisition",
    title: "Acquisition of Royal Birds Group & Creation of Strategic Capital Pillar",
    category: "Acquisition",
    summary: "Legal formalities and registration for the acquisition of Royal Birds Group Limited were successfully completed.",
    details: [
      "Formal acquisition leading to the creation and strategic expansion of Royal Birds Group.",
      "Expansion of promoter investment mandate to strategic incubation and patient capital deployment.",
    ],
  },
  {
    id: "m-05",
    year: "August 2026",
    quarter: "Financial Milestone",
    title: "Inaugural Consolidated Financial Review (₹50 Cr Revenue / ₹0 Debt)",
    category: "Expansion",
    summary: "First 12-month operating period (12 August 2025 – 12 August 2026) financial review records ₹50 Cr revenue and 100% equity discipline.",
    details: [
      "RashBhar Mining generated ₹35 Cr (70%) as primary revenue and value engine.",
      "Innovex Construction contributed ₹10 Cr (20%) in heavy industrial EPC execution.",
      "Consolidated EBITDA of ₹8.7 Cr (17.4% margin), PAT of ₹2.3 Cr, Cash reserves of ₹15 Cr, and Zero Debt (₹0 Cr).",
    ],
  },
  {
    id: "m-05b",
    year: "August 2026",
    quarter: "Governance Transition",
    title: "Institutional Leadership Restructuring & Board Elevation",
    category: "Expansion",
    summary: "Following completion of the inaugural operating period, Rashtra Bharosa Group announced an institutional leadership transition to scale diversified multi-sector operations.",
    details: [
      "Founder Subransu Mohanty, who served as Founding Chairman from 2025 to August 2026, transitioned to Executive Director – Mining & Infrastructure to directly drive core ground concessions and mega infrastructure projects while continuing overall promoter ownership.",
      "Vikramaditiya Singh Rathore, who successfully led RashBhar Mining as CEO during the 2025–2026 operational rollout, was elevated to Chairman of the Board to steer Group-wide fiduciary governance and capital allocation.",
    ],
  },
  {
    id: "m-06",
    year: "2026 – 2027",
    quarter: "Active R&D",
    title: "Sovereign R&D Initiatives: RashtrAI, VEDRI & AgriGel™",
    category: "Innovation",
    summary: "Advancement of indigenous deep-tech and soil science R&D under dedicated laboratories.",
    details: [
      "RashtrAI: Development of industry-specific AI workforce for mining and construction operations with 100% in-country data sovereignty.",
      "VEDRI: Specialized industrial robotics and embodied device engineering under RashBhar Technology.",
      "AgriGel™: Soil enhancer R&D under RashBhar Soil & Soul following a strict 'prove first' multi-stage validation methodology.",
    ],
  },
];

const StrategicJourney: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Founding", "Acquisition", "Innovation", "Infrastructure", "Expansion"];

  const filteredMilestones =
    selectedCategory === "All"
      ? milestoneData
      : milestoneData.filter((m) => m.category === selectedCategory);

  return (
    <div className="bg-[#FCFDFE] text-slate-900 font-sans antialiased min-h-screen selection:bg-[#041633] selection:text-white">
      {/* 1. Hero Section with Indian Logistics & Industrial Growth Corridor Backdrop */}
      <section className="relative pt-44 pb-16 lg:pt-56 lg:pb-24 overflow-hidden flex items-end min-h-[460px] lg:min-h-[520px] bg-[#041633]">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1779512634316-973a9f8f41a3?auto=format&fit=crop&w=2000&q=80"
            alt="Indian Strategic Infrastructure and Growth Corridor"
            className="w-full h-full object-cover object-center scale-105"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#041633] via-[#041633]/85 to-[#041633]/60 z-0 pointer-events-none" />

        <div className="max-w-[1500px] w-full mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
          <div className="max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2.5">
              <span className="w-6 h-[2px] bg-brand-gold" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-gold">
                Corporate Chronicle & Milestones
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-light tracking-tight text-white leading-tight">
              Strategic Journey & <strong className="font-semibold text-white">Evolution</strong>
            </h1>
            <p className="text-sm sm:text-base font-medium text-slate-200 uppercase tracking-[0.16em]">
              The History of Patient Capital & Sovereign Enterprise
            </p>
          </div>
        </div>
      </section>

      {/* Sticky Sub-Navigation */}
      <AboutSubnav />

      {/* 2. Chronological Timeline Section */}
      <main className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 py-16 lg:py-24 space-y-12">
        {/* Header & Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2">
              <span className="w-5 h-[2px] bg-brand-gold" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#041633]">
                Chronological Milestone Archive
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-light text-[#041633] tracking-tight">
              Path of <strong className="font-semibold">Institutional Growth</strong>
            </h2>
          </div>

          {/* Category Filter Controls */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            <Filter size={14} className="text-slate-400 mr-1 shrink-0" />
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#041633] text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Clean Scalable Timeline Cards */}
        <div className="relative border-l-2 border-slate-200 ml-4 sm:ml-8 space-y-10 pl-6 sm:pl-10">
          {filteredMilestones.map((m) => (
            <div key={m.id} className="relative group">
              {/* Timeline Dot */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-2 w-4 h-4 rounded-full bg-white border-4 border-[#041633] group-hover:border-brand-gold group-hover:scale-125 transition-all" />

              <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-2xl space-y-4 hover:shadow-md hover:border-[#041633] transition-all">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-[#041633] text-white">
                      {m.year}
                    </span>
                    {m.quarter && (
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        {m.quarter}
                      </span>
                    )}
                  </div>
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-slate-50 text-[#041633] border border-slate-200">
                    {m.category}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#041633]">{m.title}</h3>
                <p className="text-base text-slate-600 leading-relaxed font-normal">{m.summary}</p>

                <div className="space-y-2 pt-3 border-t border-slate-100 text-xs sm:text-sm text-slate-600">
                  {m.details.map((detail, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 size={15} className="text-brand-gold shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Next Step Link */}
        <div className="text-center pt-8">
          <Button asChild className="bg-[#041633] hover:bg-[#093d8f] text-white px-8 py-3 text-xs font-bold uppercase tracking-wider rounded-md shadow-sm">
            <Link to="/about/founder">
              Explore Founder's Perspective <ArrowRight size={14} className="ml-1.5" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default StrategicJourney;
