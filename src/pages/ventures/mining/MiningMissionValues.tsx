import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Target, ArrowRight, HeartHandshake, Users, Leaf, CheckCircle2 } from "lucide-react";
import VentureSubnav from "@/components/ventures/VentureSubnav";
import { Button } from "@/components/ui/button";
import miningVideo from "@/assets/VIDEOS/mining-background-RBG.mp4";
import miningHighlightImg from "@/assets/highlights/mining-highlight.jpg";
import miningLogo from "@/assets/Subsidiary-logos/mining-logo.png";

const MiningMissionValues: React.FC = () => {
  return (
    <div className="bg-white text-slate-900 font-sans antialiased min-h-screen selection:bg-[#062B63] selection:text-white">
      {/* Hero Section */}
      <section className="relative pt-44 pb-12 lg:pt-56 lg:pb-16 overflow-hidden flex items-end min-h-[460px] lg:min-h-[500px] bg-[#041633]">
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent z-0 pointer-events-none"></div>

        <div className="max-w-[1500px] w-full mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
          <div className="max-w-5xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-black/50 text-brand-gold border border-white/20 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse"></span>
              <span>Operating Doctrine & Values</span>
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
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white uppercase leading-tight drop-shadow-lg">
                  Mission & Core Doctrines
                </h1>
                <p className="text-sm sm:text-base font-semibold text-slate-200 uppercase tracking-widest mt-1">
                  Maximum Production. Safety First. • Ecological Discipline • Community Trust
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <VentureSubnav basePath="/ventures/mining" companyName="RashBhar Mining" logo={miningLogo} />

      {/* 3 Core Pillars */}
      <section className="py-20 lg:py-28 bg-white border-b border-slate-100">
        <div className="max-w-[1500px] w-full mx-auto px-4 sm:px-8 lg:px-12 space-y-16">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#062B63] block">
              Foundational Principles
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight uppercase">
              Three Non-Negotiable Operating Doctrines
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pillar 1: Production & Safety */}
            <div className="p-8 rounded-3xl bg-[#F8FAFC] border border-slate-200 space-y-4">
              <div className="p-3 rounded-2xl bg-[#062B63] text-brand-gold w-fit">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-xl font-black text-slate-900 uppercase">
                "Maximum Production. Safety First."
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify sm:text-left">
                We believe that operational discipline and safety are prerequisites to high production, not impediments. No output quota or customer deadline justifies cutting safety corners or DGMS non-compliance.
              </p>
              <div className="pt-2 text-xs font-semibold text-[#062B63] space-y-1.5">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={13} />
                  <span>Mandatory pre-shift safety risk assessments</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={13} />
                  <span>DGMS certified equipment & licensed mine managers</span>
                </div>
              </div>
            </div>

            {/* Pillar 2: Environmental Balance */}
            <div className="p-8 rounded-3xl bg-[#F8FAFC] border border-slate-200 space-y-4">
              <div className="p-3 rounded-2xl bg-emerald-700 text-white w-fit">
                <Leaf size={24} />
              </div>
              <h3 className="text-xl font-black text-slate-900 uppercase">
                "Maximum Output with Minimum Impact"
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify sm:text-left">
                Every extraction plan includes concurrent pit backfilling, topsoil preservation for post-mining agriculture, Zero-Liquid Discharge (ZLD) closed-loop water treatment, and progressive greenbelt afforestation.
              </p>
              <div className="pt-2 text-xs font-semibold text-emerald-800 space-y-1.5">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={13} />
                  <span>100% ZLD closed-loop process water</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={13} />
                  <span>Native species afforestation perimeter rings</span>
                </div>
              </div>
            </div>

            {/* Pillar 3: Community Doctrine */}
            <div className="p-8 rounded-3xl bg-[#F8FAFC] border border-slate-200 space-y-4">
              <div className="p-3 rounded-2xl bg-brand-gold text-slate-950 w-fit">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-black text-slate-900 uppercase">
                Local Employment & Pre-Mining Development
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify sm:text-left">
                We commit to completing 10%–20% of community welfare projects (potable water, healthcare, school aid) before mining operations commence. Local residents receive top priority across machine operating and technical roles.
              </p>
              <div className="pt-2 text-xs font-semibold text-slate-900 space-y-1.5">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={13} />
                  <span>10%–20% pre-mining CSR commitment</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={13} />
                  <span>Local skill development and vocational hiring</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 text-center">
            <Button asChild className="btn-primary px-8 py-3 text-xs font-bold uppercase tracking-wider rounded-xl">
              <Link to="/ventures/mining/leadership">
                Meet C-Suite Leadership <ArrowRight size={14} className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MiningMissionValues;



