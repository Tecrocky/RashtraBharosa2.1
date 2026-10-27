import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";

// Assets
import agrigelVideo from "@/assets/VIDEOS/AgriGel-hero.mp4";

const AgriGel: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#FCFDFE] text-slate-900 font-sans antialiased min-h-screen selection:bg-[#041633] selection:text-white pt-24 sm:pt-28">
      {/* Top Clean Header with Back Navigation */}
      <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-12 py-6 border-b border-slate-200">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            to="/innovation"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-600 hover:text-[#041633] transition-colors bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-lg border border-slate-200"
          >
            <ArrowLeft size={16} /> Back to Innovation
          </Link>
          <div className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-brand-gold">
            Bio-Agronomy & Soil Restoration
          </div>
        </div>
      </div>

      {/* Main Full-Screen Content Spread */}
      <main className="w-full max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-12 py-10 lg:py-16 space-y-14">
        
        {/* Title & Subtitle */}
        <div className="space-y-3">
          <div className="text-xs font-bold uppercase tracking-[0.25em] text-brand-gold">
            Sovereign R&D Venture • RashBhar Soil & Soul
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-light text-[#041633] tracking-tight">
            <strong className="font-semibold">AgriGel™</strong> Biodegradable Soil Hydrogel
          </h1>
          <p className="text-sm sm:text-base lg:text-lg font-medium text-slate-600 uppercase tracking-[0.14em]">
            Superabsorbent Biopolymer • 40%–50% Irrigation Reduction • Drought Resilience for Bharat
          </p>
        </div>

        {/* Fullscreen Video Player (Full Width, Crisp & Unobstructed) */}
        <div className="w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-black relative">
          <video
            src={agrigelVideo}
            autoPlay
            loop
            muted
            playsInline
            controls
            className="w-full h-auto max-h-[85vh] object-cover"
          />
        </div>

        {/* Full-Width Lead Editorial Pull-Quote */}
        <blockquote className="w-full font-serif italic text-2xl sm:text-3xl lg:text-4xl text-slate-800 leading-relaxed text-center py-10 border-y border-slate-200">
          “Water is the lifeblood of agrarian Bharat. Preserving every raindrop at the root zone is the foundation of national food security and farmer dignity.”
        </blockquote>

        {/* Full-Width Narrative Chapter 1 */}
        <article className="w-full space-y-6 text-slate-700 text-base sm:text-lg lg:text-xl leading-relaxed">
          <div className="space-y-1">
            <span className="text-xs sm:text-sm font-mono font-bold text-brand-gold uppercase tracking-widest">Chapter 01</span>
            <h3 className="text-2xl sm:text-4xl lg:text-5xl font-serif text-[#041633] font-normal">
              The Challenge of Rainfed Farming
            </h3>
          </div>
          <p>
            Across vast tracts of Odisha, Jharkhand, and Central India, smallholder farmers depend entirely on erratic monsoon cycles. In porous red laterite and sandy loam soils, irrigation water rapidly leaches away below the root zone, leaving crops vulnerable to dry spells even in regions with high cumulative rainfall.
          </p>
          <p>
            AgriGel™ was engineered as a scientific breakthrough to solve this fundamental moisture deficit. Developed by RashBhar Soil & Soul, it is a proprietary, non-toxic, cellulose-grafted superabsorbent polymer designed specifically for Indian soil profiles and climate conditions.
          </p>
          <p>
            When incorporated into the soil during sowing, AgriGel™ granules absorb up to 400 times their dry weight in water, creating a subterranean reservoir that releases moisture directly to plant root systems on demand.
          </p>
        </article>

        {/* Full-Width Narrative Chapter 2 */}
        <article className="w-full space-y-6 text-slate-700 text-base sm:text-lg lg:text-xl leading-relaxed pt-12 border-t border-slate-200">
          <div className="space-y-1">
            <span className="text-xs sm:text-sm font-mono font-bold text-brand-gold uppercase tracking-widest">Chapter 02</span>
            <h3 className="text-2xl sm:text-4xl lg:text-5xl font-serif text-[#041633] font-normal">
              40% to 50% Irrigation Reduction & Root-Zone Microclimate
            </h3>
          </div>
          <p>
            Rigorous multi-season field trials across tribal agrarian clusters have validated that AgriGel™ reduces crop irrigation requirements by 40% to 50% while sustaining optimal vegetative growth during prolonged dry spells.
          </p>
          <p>
            In addition to water retention, the polymer matrix traps dissolved macro-nutrients (Nitrogen, Phosphorus, Potassium), preventing fertilizer leaching into groundwater tables and improving nutrient absorption efficiency by over 30%.
          </p>
          <p>
            As the granules swell and contract during hydration cycles, they naturally aerate compacted soils, enhancing root penetration depth and fostering healthy microbial biomes.
          </p>
        </article>

        {/* Full-Width Narrative Chapter 3 */}
        <article className="w-full space-y-6 text-slate-700 text-base sm:text-lg lg:text-xl leading-relaxed pt-12 border-t border-slate-200">
          <div className="space-y-1">
            <span className="text-xs sm:text-sm font-mono font-bold text-brand-gold uppercase tracking-widest">Chapter 03</span>
            <h3 className="text-2xl sm:text-4xl lg:text-5xl font-serif text-[#041633] font-normal">
              100% Biodegradable & Safe for Soil Biomes
            </h3>
          </div>
          <p>
            Unlike synthetic industrial polymers that leave hazardous microplastics, AgriGel™ is synthesized entirely from renewable bio-cellulose cross-linked with food-grade polycarboxylates. Over an 18-month timeline, it naturally biodegrades into harmless soil humus, water, and carbon dioxide.
          </p>
          <p>
            By delivering affordable, mechanical-drill-compatible granules directly to farmer collectives, RashBhar Soil & Soul is transforming marginal rainfed lands into resilient, high-yield agricultural engines for Bharat.
          </p>
        </article>

        {/* Clean Bottom Navigation (No Signatures) */}
        <div className="w-full pt-12 pb-16 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <Link
            to="/innovation/ved-ri"
            className="text-xs sm:text-sm font-semibold uppercase tracking-[0.14em] text-slate-600 hover:text-[#041633] flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft size={16} /> Previous: VED Ri Robotics
          </Link>
          <Link
            to="/innovation/rashtrai"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#041633] text-white hover:bg-brand-navy-light transition-all text-xs sm:text-sm font-bold uppercase tracking-wider"
          >
            Explore: RashtrAI Platform <ArrowRight size={16} />
          </Link>
        </div>
      </main>
    </div>
  );
};

export default AgriGel;
