import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Scale, ShieldCheck, Compass, CheckCircle2, Building2 } from "lucide-react";
import AboutSubnav from "@/components/about/AboutSubnav";
import { Button } from "@/components/ui/button";

// Assets
import hqImg from "@/assets/hq.jpeg";
import odishaHeroVideo from "@/assets/VIDEOS/odisha-hero.mp4";

const CorporateGovernance: React.FC = () => {
  return (
    <div className="bg-[#FCFDFE] text-slate-900 font-sans antialiased min-h-screen selection:bg-[#041633] selection:text-white">
      {/* 1. Hero Section with Indian Corporate Governance Backdrop */}
      <section className="relative pt-44 pb-16 lg:pt-56 lg:pb-24 overflow-hidden flex items-end min-h-[460px] lg:min-h-[520px] bg-[#041633]">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1573167507387-6b4b98cb7c13?auto=format&fit=crop&w=2000&q=80"
            alt="Indian Corporate Governance and Ethics Board"
            className="w-full h-full object-cover object-center scale-105"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#041633] via-[#041633]/85 to-[#041633]/60 z-0 pointer-events-none" />

        <div className="max-w-[1500px] w-full mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
          <div className="max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2.5">
              <span className="w-6 h-[2px] bg-brand-gold" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-gold">
                Institutional Oversight & Ethics Charter
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-light tracking-tight text-white leading-tight">
              Corporate Governance & <strong className="font-semibold text-white">Statutory Ethics</strong>
            </h1>
            <p className="text-sm sm:text-base font-medium text-slate-200 uppercase tracking-[0.16em]">
              Fiduciary Responsibility Built on Trust & Accountability
            </p>
          </div>
        </div>
      </section>

      {/* Sticky Sub-Navigation */}
      <AboutSubnav />

      {/* 2. Main Long-Form Full-Bleed Editorial Article Layout */}
      <main className="w-full max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-12 py-16 lg:py-24 space-y-16">
        
        {/* Top Header & Designation */}
        <div className="space-y-4 pb-6 border-b border-slate-200">
          <div className="inline-flex items-center gap-2">
            <span className="w-6 h-[2px] bg-brand-gold" />
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#041633]">
              Institutional Charter • Fiduciary Architecture
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-light text-[#041633] tracking-tight">
            Corporate Governance & <strong className="font-semibold">Statutory Ethics</strong>
          </h2>
          <div className="text-xs sm:text-sm text-brand-gold font-bold uppercase tracking-[0.18em]">
            Fiduciary Responsibility Built on Trust, Transparency & Independent Oversight
          </div>
        </div>

        {/* Fullscreen High-Resolution Headquarters Photograph (Clear, Unobstructed & Centered) */}
        <div className="w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-slate-900 flex items-center justify-center relative">
          <img
            src={hqImg}
            alt="Rashtra Bharosa Group Corporate Headquarters in Bhubaneswar"
            className="w-full h-auto max-h-[85vh] object-contain object-center bg-slate-950"
          />
        </div>

        {/* Lead Pull-Quote */}
        <div className="font-serif italic text-2xl sm:text-3xl lg:text-4xl text-slate-900 leading-relaxed border-l-4 border-brand-gold pl-8 sm:pl-10 py-4 bg-slate-50 rounded-r-2xl max-w-5xl">
          “Group sets direction. Boards provide oversight. Executives run the business. Management executes. Everyone remains accountable.”
        </div>

        {/* Section 1: Governance Doctrine */}
        <section className="space-y-4 pt-8 border-t border-slate-200 max-w-5xl">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold text-brand-gold">01</span>
            <h3 className="text-2xl sm:text-4xl font-serif font-light text-[#041633]">
              Governance Built on <strong className="font-semibold">Trust & Integrity</strong>
            </h3>
          </div>
          <div className="space-y-4 text-slate-700 text-base sm:text-lg leading-relaxed">
            <p>
              At <strong>Rashtra Bharosa Group</strong>, corporate governance is not a bureaucratic compliance check—it is the operating system upon which all commercial and capital allocation decisions are executed.
            </p>
            <p>
              Our governance model provides clear long-term direction at the conglomerate level, rigorous fiduciary oversight through independent board committees, and transparent accountability across all operating subsidiaries.
            </p>
          </div>
        </section>

        {/* Section 2: Two-Tier Governance Framework */}
        <section className="space-y-4 pt-8 border-t border-slate-200 max-w-5xl">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold text-brand-gold">02</span>
            <h3 className="text-2xl sm:text-4xl font-serif font-light text-[#041633]">
              Group Strategy vs. <strong className="font-semibold">Subsidiary Autonomy</strong>
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200/90 space-y-2">
              <div className="font-serif font-bold text-[#041633] text-lg">Group Level Mandate</div>
              <p className="text-xs sm:text-base text-slate-600 leading-relaxed">
                Formulating multi-decade corporate strategy, capital allocation, statutory risk oversight, treasury governance, and ethical standards.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200/90 space-y-2">
              <div className="font-serif font-bold text-[#041633] text-lg">Subsidiary Level Execution</div>
              <p className="text-xs sm:text-base text-slate-600 leading-relaxed">
                Direct operational execution, ground safety compliance, revenue performance, workforce development, and customer delivery.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Statutory Board Committees & Risk Oversight */}
        <section className="space-y-4 pt-8 border-t border-slate-200 max-w-5xl">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold text-brand-gold">03</span>
            <h3 className="text-2xl sm:text-4xl font-serif font-light text-[#041633]">
              Fiduciary Oversight & <strong className="font-semibold">Risk Architecture</strong>
            </h3>
          </div>
          <p className="text-slate-700 text-base sm:text-lg leading-relaxed">
            The Board of Directors maintains formal statutory oversight through dedicated committees:
          </p>
          <div className="space-y-4 pt-2">
            <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1.5">
              <strong className="text-[#041633] font-serif text-lg block">Audit & Financial Prudence Committee</strong>
              <span className="text-xs sm:text-base text-slate-600">Ensuring 100% statutory transparency, independent auditing, zero-debt enforcement, and internal controls.</span>
            </div>
            <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1.5">
              <strong className="text-[#041633] font-serif text-lg block">Nomination & Executive Governance Committee</strong>
              <span className="text-xs sm:text-base text-slate-600">Supervising board appointments, key executive compensation, and leadership succession pipelines.</span>
            </div>
            <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1.5">
              <strong className="text-[#041633] font-serif text-lg block">Ethics, CSR & Environmental Stewardship Committee</strong>
              <span className="text-xs sm:text-base text-slate-600">Enforcing zero-harm workplace safety, environmental rehabilitation standards, and community welfare funds.</span>
            </div>
          </div>
        </section>

        {/* Related Institutional Navigation Links */}
        <div className="pt-10 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4 max-w-5xl">
          <Button asChild variant="outline" className="text-xs font-bold uppercase tracking-wider text-[#041633] border-slate-300">
            <Link to="/about">
              ← Full Corporate Profile
            </Link>
          </Button>
          <Button asChild className="bg-[#041633] hover:bg-[#093d8f] text-white text-xs font-bold uppercase tracking-wider">
            <Link to="/about/leadership">
              Board of Directors Directory <ArrowRight size={14} className="ml-1.5" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default CorporateGovernance;
