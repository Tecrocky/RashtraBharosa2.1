import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Quote, ShieldCheck, Award, Briefcase, ChevronRight } from "lucide-react";
import VentureSubnav from "@/components/ventures/VentureSubnav";
import { Button } from "@/components/ui/button";

// Assets
import miningVideo from "@/assets/VIDEOS/mining-background-RBG.mp4";
import miningLogo from "@/assets/Subsidiary-logos/mining-logo.png";
import ceoImg from "@/assets/leadership/group/RashBhar Mining/mining Chief Executive Officer.png";

const MiningCEO: React.FC = () => {
  return (
    <div className="bg-white text-slate-900 font-sans antialiased min-h-screen selection:bg-[#062B63] selection:text-white">
      {/* 1. Hero Section with Cinematic Background Video */}
      <section className="relative pt-44 pb-12 lg:pt-56 lg:pb-16 overflow-hidden flex items-end min-h-[460px] lg:min-h-[500px] bg-[#041633]">
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent z-0 pointer-events-none"></div>

        <div className="max-w-[1500px] w-full mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
          <div className="max-w-5xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-black/50 text-brand-gold border border-white/20 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse"></span>
              <span>Office of the Chief Executive Officer</span>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 pt-1">
              <div className="bg-white/95 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-white/40 shadow-2xl inline-flex items-center justify-center w-fit">
                <img
                  src={miningLogo}
                  alt="RashBhar Mining Logo"
                  className="h-16 sm:h-20 md:h-24 w-auto max-w-[280px] sm:max-w-[340px] object-contain"
                />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight drop-shadow-lg uppercase">
                  Arvind Pratap Rao
                </h1>
                <p className="text-sm sm:text-base font-semibold text-brand-gold uppercase tracking-widest mt-1">
                  Chief Executive Officer • RashBhar Mining Corporation
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Venture Subnav */}
      <VentureSubnav basePath="/ventures/mining" companyName="RashBhar Mining" logo={miningLogo} />

      {/* 2. Main Executive Profile Section */}
      <section className="py-16 lg:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Portrait & Key Details */}
            <div className="lg:col-span-4 flex flex-col items-center lg:sticky lg:top-32 space-y-6">
              <div className="w-full max-w-sm rounded-3xl overflow-hidden border-2 border-slate-200 shadow-xl bg-slate-900 relative group">
                <div className="relative aspect-[4/5] overflow-hidden bg-slate-900">
                  <img
                    src={ceoImg}
                    alt="Arvind Pratap Rao - Chief Executive Officer"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 bg-[#041633] text-white space-y-1">
                  <span className="text-[10px] font-bold text-brand-gold uppercase tracking-wider bg-black/40 px-2.5 py-0.5 rounded-full border border-white/15 inline-block">
                    Subsidiary Chief Executive
                  </span>
                  <h3 className="text-xl font-black text-white">Arvind Pratap Rao</h3>
                  <p className="text-xs text-slate-300 font-medium">Chief Executive Officer (CEO)</p>
                  <p className="text-[11px] text-[#A87930] font-semibold uppercase tracking-wider pt-1">
                    RashBhar Mining Corporation
                  </p>
                </div>
              </div>

              {/* Quick Credentials / Profile Summary */}
              <div className="w-full max-w-sm p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <h4 className="text-xs font-bold text-[#062B63] uppercase tracking-wider">
                  Executive Mandate
                </h4>
                <div className="space-y-2.5 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={16} className="text-[#062B63] shrink-0" />
                    <span><strong>Operating Model:</strong> Brownfield Turnaround & Contract Mining</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award size={16} className="text-[#062B63] shrink-0" />
                    <span><strong>Footprint:</strong> Odisha (Iron Ore) & Jharkhand (Coal/Minerals)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase size={16} className="text-[#062B63] shrink-0" />
                    <span><strong>Philosophy:</strong> "Find the Potential. Transform the Asset."</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Strategic Narrative & Philosophy */}
            <div className="lg:col-span-8 space-y-8">
              <div className="space-y-2 border-b border-slate-200 pb-6">
                <span className="text-xs font-bold uppercase tracking-widest text-[#062B63] block">
                  Strategic Perspective & Transformation Mandate
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight">
                  Modern Mining Through Asset Transformation & Technology
                </h2>
              </div>

              {/* Pull Quote */}
              <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 border-l-4 border-[#062B63] space-y-3">
                <Quote size={32} className="text-[#062B63]/40" />
                <p className="text-base sm:text-lg font-bold text-[#062B63] italic leading-relaxed">
                  "An acquired mine should not simply be continued in its existing form. We systematically assess, modernize, and expand it through technology and operational discipline. Maximum production only succeeds when underpinned by uncompromised safety and local community trust."
                </p>
                <div className="pt-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  — Arvind Pratap Rao, CEO, RashBhar Mining Corporation
                </div>
              </div>

              {/* Detailed Narrative */}
              <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
                <p>
                  As Chief Executive Officer of RashBhar Mining Corporation, Arvind Pratap Rao directs the company's dual-engine growth strategy across India's mineral-rich belts in Odisha and Jharkhand.
                </p>
                <p>
                  Under his leadership, RashBhar Mining executes its proven transformation blueprint—<strong>Acquire → Assess → Modernize → Expand → Optimize → Operate</strong>—turning underperforming concessions into high-throughput assets with AI mine planning, smart conveyors, real-time fleet telemetry, and closed-loop Zero-Liquid Discharge water circuits.
                </p>
                <p>
                  Whether developing proprietary concessions or executing large-scale MDO contracts for government PSUs and industrial off-takers, the operational doctrine remains steadfast: deliver maximum output with zero safety shortcuts and 100% statutory compliance.
                </p>
              </div>

              {/* Key Strategic Pillars */}
              <div className="space-y-4 pt-4">
                <h3 className="text-lg font-bold text-[#062B63] uppercase tracking-wide">
                  Core Operational Anchors
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="text-xs font-bold text-brand-gold uppercase tracking-wider">Pillar 01</div>
                    <div className="text-sm font-bold text-[#062B63]">Asset Modernization</div>
                    <p className="text-xs text-slate-600">Brownfield transformation through AI mine planning, IoT telemetry, and smart conveyors.</p>
                  </div>
                  <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="text-xs font-bold text-brand-gold uppercase tracking-wider">Pillar 02</div>
                    <div className="text-sm font-bold text-[#062B63]">Safety Non-Negotiable</div>
                    <p className="text-xs text-slate-600">"Maximum Production. Safety First." Zero DGMS statutory compromise across all pits.</p>
                  </div>
                  <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="text-xs font-bold text-brand-gold uppercase tracking-wider">Pillar 03</div>
                    <div className="text-sm font-bold text-[#062B63]">Pre-Mining Welfare</div>
                    <p className="text-xs text-slate-600">10%–20% CSR completed before commercial extraction, with local hiring prioritized.</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 flex flex-wrap gap-4">
                <Button asChild className="btn-primary px-7 py-3 text-xs font-bold rounded-lg shadow-sm">
                  <Link to="/ventures/mining/leadership">
                    View Mining C-Suite Team <ArrowRight size={14} className="ml-1.5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="px-7 py-3 text-xs font-bold rounded-lg text-[#062B63] border-slate-300 hover:bg-slate-50">
                  <Link to="/ventures/mining">
                    Mining Venture Overview
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

export default MiningCEO;

