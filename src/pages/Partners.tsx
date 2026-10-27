import React, { useRef } from "react";
import { Link } from "react-router-dom";
import {
  Handshake,
  Building2,
  TrendingUp,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  Briefcase,
  Layers,
  Sparkles,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import logo from "@/assets/logo.png";
import partnersHeroVideo from "@/assets/VIDEOS/Partnerships, Alliances & Investments page.mp4";
import {
  strategicPartners,
  institutionalPartners,
  projectPartners,
  whereWeInvested,
  PartnerCardEntity,
} from "@/data/partnersData";
import PartnersMarquee from "@/components/PartnersMarquee";

const Partners: React.FC = () => {
  // Horizontal scroll refs
  const strategicRef = useRef<HTMLDivElement>(null);
  const institutionalRef = useRef<HTMLDivElement>(null);
  const projectRef = useRef<HTMLDivElement>(null);

  const scrollContainer = (ref: React.RefObject<HTMLDivElement>, direction: "left" | "right") => {
    if (ref.current) {
      const scrollAmount = direction === "left" ? -460 : 460;
      ref.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Render a clean, compact landscape card without pointers
  const renderLandscapeCard = (item: PartnerCardEntity, accentColor: string, badgeBg: string, badgeText: string) => (
    <div
      key={item.id}
      className="min-w-[320px] sm:min-w-[390px] max-w-[410px] bg-white border border-slate-200 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between shrink-0 snap-start space-y-3.5"
    >
      {/* 1. Header: Full Color Logo & Partnership Type Badge */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
        <div className="h-9 w-28 flex items-center justify-start">
          {item.logo ? (
            <img
              src={item.logo}
              alt={item.name}
              className="max-h-8 max-w-full object-contain"
            />
          ) : (
            <span className="font-bold text-xs text-slate-900 bg-slate-100 px-2.5 py-1 border border-slate-200 font-mono">
              {item.name}
            </span>
          )}
        </div>
        <span className={`px-2 py-0.5 text-[9px] font-bold ${badgeBg} ${badgeText} border border-slate-200 uppercase tracking-wider`}>
          {item.partnershipType}
        </span>
      </div>

      {/* 2. Company Name */}
      <div>
        <h3 className="text-sm font-bold text-slate-900 leading-snug">
          {item.name}
        </h3>
      </div>

      {/* 3. Associated With Entity / Vertical */}
      <div className={`px-3 py-2 bg-slate-50 border-l-2 ${accentColor} text-[11px]`}>
        <span className="text-[9px] font-bold uppercase text-slate-400 block tracking-wider">
          Associated With:
        </span>
        <strong className="text-slate-900 font-semibold text-xs block mt-0.5">
          {item.associatedWith}
        </strong>
      </div>

      {/* 4. Collaboration Summary (Clean paragraph, zero bullet pointers) */}
      <div className="text-[11px] text-slate-600 leading-relaxed">
        <span className="text-[9px] font-bold uppercase text-slate-400 block tracking-wider mb-0.5">
          Scope of Collaboration:
        </span>
        <p className="line-clamp-4">
          {item.whatWeDo}
        </p>
      </div>

      {/* 5. Card Footer */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
        <span className="font-mono">{item.id}</span>
        <span className="font-semibold text-slate-700 uppercase">Active Partnership</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FDFEFE] text-slate-900 font-sans pb-32">
      {/* 1. Grand Executive Hero Banner with Indian Corporate Partnership Backdrop */}
      <section className="relative pt-36 sm:pt-44 pb-12 lg:pt-48 lg:pb-16 overflow-hidden flex items-end min-h-[420px] lg:min-h-[460px] bg-[#041633]">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1521790797524-b2497295b8a0?auto=format&fit=crop&w=2000&q=80"
            alt="Indian Corporate Strategic Alliances and Joint Ventures"
            className="w-full h-full object-cover object-center scale-105"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#041633] via-[#041633]/85 to-[#041633]/60 z-10" />

        <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-12 relative z-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              {/* Executive Logo Box */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white">
                <img src={logo} alt="RBG Crest" className="w-5 h-5 object-contain" />
                <span className="text-[11px] font-bold tracking-widest uppercase text-brand-gold">
                  Rashtra Bharosa Group Strategic Alliances
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
                Partnerships, Alliances & Investments
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                A structured overview of our strategic conglomerate tie-ups, institutional knowledge alliances, infrastructure project partnerships, and proprietary venture investments.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/contact"
                className="px-5 py-2.5 rounded-lg bg-brand-gold hover:bg-[#c48514] text-[#041633] text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer inline-block"
              >
                Contact Secretariat →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Running Continuous Logo Ribbon (Top) */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-12 py-2">
          <PartnersMarquee />
        </div>
      </div>

      {/* 3. Main Body Content (Structured in Exact 4 Ordered Sections) */}
      <div className="max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-12 mt-12 space-y-16">

        {/* =========================================================================
            SECTION 1: STRATEGIC PARTNERS (AR Group, Vanshika Corp, Aditya Birla)
            ========================================================================= */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="w-3 h-1 bg-[#D9961A]"></span>
                <span className="text-[11px] font-bold text-[#D9961A] uppercase tracking-widest">
                  Section 01 • Strategic Partners
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Strategic Conglomerate Alliances
              </h2>
            </div>

            {/* Slider Controls */}
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                onClick={() => scrollContainer(strategicRef, "left")}
                className="p-1.5 rounded bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 transition-all cursor-pointer shadow-xs"
                aria-label="Slide left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollContainer(strategicRef, "right")}
                className="p-1.5 rounded bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 transition-all cursor-pointer shadow-xs"
                aria-label="Slide right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Horizontal Slider */}
          <div
            ref={strategicRef}
            className="flex gap-4 overflow-x-auto no-scrollbar pb-3 pt-1 scroll-smooth snap-x snap-mandatory"
          >
            {strategicPartners.map((item) =>
              renderLandscapeCard(item, "border-[#D9961A]", "bg-[#D9961A]/10", "text-[#9a6a0e]")
            )}
          </div>
        </section>


        {/* =========================================================================
            SECTION 2: INSTITUTIONAL & KNOWLEDGE PARTNERS (IMI, Apollo, RBL Bank, NABARD)
            ========================================================================= */}
        <section className="space-y-4 pt-4 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="w-3 h-1 bg-[#062B63]"></span>
                <span className="text-[11px] font-bold text-[#062B63] uppercase tracking-widest">
                  Section 02 • Institutional Partners
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Institutional, Banking & Knowledge Partners
              </h2>
            </div>

            {/* Slider Controls */}
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                onClick={() => scrollContainer(institutionalRef, "left")}
                className="p-1.5 rounded bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 transition-all cursor-pointer shadow-xs"
                aria-label="Slide left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollContainer(institutionalRef, "right")}
                className="p-1.5 rounded bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 transition-all cursor-pointer shadow-xs"
                aria-label="Slide right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Horizontal Slider */}
          <div
            ref={institutionalRef}
            className="flex gap-4 overflow-x-auto no-scrollbar pb-3 pt-1 scroll-smooth snap-x snap-mandatory"
          >
            {institutionalPartners.map((item) =>
              renderLandscapeCard(item, "border-[#062B63]", "bg-blue-50", "text-[#062B63]")
            )}
          </div>
        </section>


        {/* =========================================================================
            SECTION 3: COMPANIES WHERE WE ARE PARTNERING ON PROJECTS (Adani, L&T, etc.)
            ========================================================================= */}
        <section className="space-y-4 pt-4 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="w-3 h-1 bg-slate-800"></span>
                <span className="text-[11px] font-bold text-slate-800 uppercase tracking-widest">
                  Section 03 • Project & Infrastructure Partners
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Companies Where We Are Partnering on Projects
              </h2>
            </div>

            {/* Slider Controls */}
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                onClick={() => scrollContainer(projectRef, "left")}
                className="p-1.5 rounded bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 transition-all cursor-pointer shadow-xs"
                aria-label="Slide left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollContainer(projectRef, "right")}
                className="p-1.5 rounded bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 transition-all cursor-pointer shadow-xs"
                aria-label="Slide right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Horizontal Slider */}
          <div
            ref={projectRef}
            className="flex gap-4 overflow-x-auto no-scrollbar pb-3 pt-1 scroll-smooth snap-x snap-mandatory"
          >
            {projectPartners.map((item) =>
              renderLandscapeCard(item, "border-slate-800", "bg-slate-100", "text-slate-800")
            )}
          </div>
        </section>


        {/* =========================================================================
            SECTION 4: WHERE WE INVESTED (SAESHA INDUSTRIAL ENTERPRISES)
            ========================================================================= */}
        <section className="space-y-4 pt-4 border-t border-slate-200">
          <div className="border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-1 bg-purple-700"></span>
              <span className="text-[11px] font-bold text-purple-700 uppercase tracking-widest">
                Section 04 • Portfolio Investment
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1">
              Where We Invested
            </h2>
          </div>

          {/* Single Dedicated Feature Card in Landscape Format */}
          <div className="bg-white border border-slate-200 p-6 sm:p-8 shadow-xs hover:shadow-md transition-all grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Left: Full Color Logo & Core Positioning */}
            <div className="md:col-span-4 space-y-3 border-b md:border-b-0 md:border-r border-slate-100 pb-5 md:pb-0 md:pr-6">
              <div className="h-12 w-full flex items-center justify-start">
                <img
                  src={whereWeInvested.logo}
                  alt={whereWeInvested.name}
                  className="max-h-10 max-w-[220px] object-contain"
                />
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  {whereWeInvested.name}
                </h3>
                <span className="text-xs font-semibold text-[#D9961A] italic block mt-0.5">
                  "{whereWeInvested.tagline}"
                </span>
                <span className="text-[11px] font-medium text-slate-500 block mt-0.5">
                  {whereWeInvested.corePositioning}
                </span>
              </div>

              <div className="p-2.5 bg-purple-50/70 border-l-2 border-purple-800 text-[11px]">
                <span className="text-[9px] font-bold uppercase text-purple-900 block">
                  Associated With:
                </span>
                <strong className="text-purple-950 font-bold text-xs">{whereWeInvested.associatedWith}</strong>
              </div>
            </div>

            {/* Right: What We Do & Partnership Nature */}
            <div className="md:col-span-8 space-y-4">
              <div className="inline-block px-2.5 py-1 text-[10px] font-bold bg-purple-50 text-purple-900 border border-purple-200 uppercase tracking-wider">
                {whereWeInvested.investmentType}
              </div>

              <div className="space-y-1 text-xs">
                <span className="text-[10px] font-bold uppercase text-slate-400 block tracking-wider">
                  Scope of Venture & Investment:
                </span>
                <p className="text-slate-700 leading-relaxed text-xs sm:text-sm">
                  {whereWeInvested.whatWeDo}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-3">
                <span className="text-[11px]">Investment Model: <strong>Promoter-Led Seed & Equity Participation</strong></span>
                <div className="flex items-center gap-3">
                  {whereWeInvested.website && (
                    <a
                      href={whereWeInvested.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-900 text-white hover:bg-purple-800 text-[11px] font-semibold tracking-wide transition-colors"
                    >
                      Visit Official Website
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  <span className="font-semibold text-purple-950 uppercase text-[10px]">Active Portfolio Investment</span>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* 4. Institutional Governance Charter Footer Strip */}
      <div className="max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-12 mt-20">
        <div className="bg-[#060E1E] text-white p-8 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-brand-gold text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Partnership Governance & Ethics</span>
            </div>
            <p className="text-xs text-slate-400 max-w-2xl">
              All institutional tie-ups and project partnerships operate strictly under statutory compliance, arm's-length transparency, and promoter-governed fiduciary standards.
            </p>
          </div>

          <div className="text-xs text-slate-300 font-mono shrink-0">
            Desk: <a href="mailto:management@rashtrabharosagroup.com" className="text-brand-gold hover:underline font-bold">management@rashtrabharosagroup.com</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partners;
