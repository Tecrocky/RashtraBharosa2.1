import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Quote, ShieldCheck, Award, Building2 } from "lucide-react";
import VentureSubnav from "@/components/ventures/VentureSubnav";
import { Button } from "@/components/ui/button";

// Assets
import infraVideo from "@/assets/VIDEOS/Real estate video.mp4";
import realEstateLogo from "@/assets/Subsidiary-logos/realestate-logo.png";
import ceoImg from "@/assets/leadership/group/RashBhar Real Estate/RashBhar Real - Chief Executive Officer.png";

const RealEstateCEO: React.FC = () => {
  return (
    <div className="bg-white text-slate-900 font-sans antialiased min-h-screen selection:bg-[#062B63] selection:text-white">
      {/* Hero Section */}
      <section className="relative pt-44 pb-12 lg:pt-56 lg:pb-16 overflow-hidden flex items-end min-h-[460px] lg:min-h-[500px] bg-[#041633]">
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent z-0 pointer-events-none"></div>

        <div className="max-w-[1500px] w-full mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
          <div className="max-w-5xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-black/50 text-brand-gold border border-white/20 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse"></span>
              <span>Office of the Chief Executive Officer</span>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 pt-1">
              <div className="bg-white/95 backdrop-blur-md p-2 rounded-xl border border-white/40 shadow-2xl inline-flex items-center justify-center w-fit">
                <img
                  src={realEstateLogo}
                  alt="RashBhar Real Estate Logo"
                  className="h-10 w-auto object-contain"
                />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight drop-shadow-lg uppercase">
                  Suryaveer Singh Rathore
                </h1>
                <p className="text-sm sm:text-base font-semibold text-brand-gold uppercase tracking-widest mt-1">
                  Chief Executive Officer • RashBhar Real Estate
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <VentureSubnav basePath="/ventures/real-estate" companyName="RashBhar Real Estate" logo={realEstateLogo} />

      {/* Main Executive Profile Section */}
      <section className="py-16 lg:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Portrait & Key Details */}
            <div className="lg:col-span-4 flex flex-col items-center lg:sticky lg:top-32 space-y-6">
              <div className="w-full max-w-sm rounded-3xl overflow-hidden border-2 border-slate-200 shadow-xl bg-slate-900 relative group">
                <div className="relative aspect-[4/5] overflow-hidden bg-slate-900">
                  <img
                    src={ceoImg}
                    alt="Suryaveer Singh Rathore - Chief Executive Officer"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 bg-[#041633] text-white space-y-1">
                  <span className="text-[10px] font-bold text-brand-gold uppercase tracking-wider bg-black/40 px-2.5 py-0.5 rounded-full border border-white/15 inline-block">
                    Subsidiary Chief Executive
                  </span>
                  <h3 className="text-xl font-black text-white">Suryaveer Singh Rathore</h3>
                  <p className="text-xs text-slate-300 font-medium">Chief Executive Officer (CEO)</p>
                  <p className="text-[11px] text-brand-gold font-semibold uppercase tracking-wider pt-1">
                    RashBhar Real Estate • Luxury & Masterplanned Developments
                  </p>
                </div>
              </div>

              {/* Profile Summary */}
              <div className="w-full max-w-sm p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <h4 className="text-xs font-bold text-[#062B63] uppercase tracking-wider">
                  Executive Mandate
                </h4>
                <div className="space-y-2.5 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <Building2 size={16} className="text-[#062B63] shrink-0" />
                    <span><strong>Focus:</strong> Landmark Luxury Gated Communities</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award size={16} className="text-[#062B63] shrink-0" />
                    <span><strong>Projects:</strong> Reyansh Sovereign, Reyansh Elanza</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={16} className="text-[#062B63] shrink-0" />
                    <span><strong>Standards:</strong> RERA Governance & 100% On-Time Delivery</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Strategic Perspective */}
            <div className="lg:col-span-8 space-y-8">
              <div className="space-y-2 border-b border-slate-200 pb-6">
                <span className="text-xs font-bold uppercase tracking-widest text-[#062B63] block">
                  Vision Statement
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight">
                  Crafting Timeless Architecture and Sovereign Living
                </h2>
              </div>

              {/* Pull Quote */}
              <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 border-l-4 border-[#062B63] space-y-3">
                <Quote size={32} className="text-[#062B63]/40" />
                <p className="text-base sm:text-lg font-bold text-[#062B63] italic leading-relaxed">
                  "At RashBhar Real Estate, we do not simply build living spaces; we create generational sanctuaries. Every residential development is crafted with impeccable structural engineering, biometric privacy, and enduring architectural beauty that stands as a lasting legacy."
                </p>
                <div className="pt-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  — Suryaveer Singh Rathore, CEO, RashBhar Real Estate
                </div>
              </div>

              {/* Detailed Narrative */}
              <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
                <p>
                  As Chief Executive Officer of RashBhar Real Estate, Suryaveer Singh Rathore directs the venture’s strategic masterplanning, institutional land acquisitions, joint development partnerships, and architectural execution. Under his guidance, RashBhar Real Estate has introduced a new paradigm of ultra-luxury gated living and high-rise residences to Eastern India.
                </p>
                <p>
                  His leadership oversees the flagship portfolio including Reyansh Sovereign and Reyansh Elanza, ensuring that global luxury standards, biophilic landscaping, green-building certifications, and absolute legal transparency define every residential square foot.
                </p>
              </div>

              {/* Key Development Pillars */}
              <div className="space-y-4 pt-4">
                <h3 className="text-lg font-bold text-[#062B63] uppercase tracking-wide">
                  Real Estate Principles
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="text-xs font-bold text-brand-gold uppercase tracking-wider">Pillar 01</div>
                    <div className="text-sm font-bold text-[#062B63]">Landmark Design</div>
                    <p className="text-xs text-slate-600">World-class architectural aesthetics with opulent community amenities.</p>
                  </div>
                  <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="text-xs font-bold text-brand-gold uppercase tracking-wider">Pillar 02</div>
                    <div className="text-sm font-bold text-[#062B63]">Biophilic Luxury</div>
                    <p className="text-xs text-slate-600">Extensive green foliage, microclimate management, and clean air environments.</p>
                  </div>
                  <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="text-xs font-bold text-brand-gold uppercase tracking-wider">Pillar 03</div>
                    <div className="text-sm font-bold text-[#062B63]">Strict Governance</div>
                    <p className="text-xs text-slate-600">RERA compliance, clear titles, escrow protection, and uncompromising delivery timelines.</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 flex flex-wrap gap-4">
                <Button asChild className="btn-primary px-7 py-3 text-xs font-bold rounded-lg shadow-sm">
                  <Link to="/ventures/real-estate/leadership">
                    View Real Estate C-Suite <ArrowRight size={14} className="ml-1.5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="px-7 py-3 text-xs font-bold rounded-lg text-[#062B63] border-slate-300 hover:bg-slate-50">
                  <Link to="/ventures/real-estate">
                    Real Estate Overview
                  </Link>
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default RealEstateCEO;
