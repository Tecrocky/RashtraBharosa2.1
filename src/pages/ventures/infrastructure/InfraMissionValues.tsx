import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Building2, ArrowRight } from "lucide-react";
import VentureSubnav from "@/components/ventures/VentureSubnav";
import { Button } from "@/components/ui/button";
import infraVideo from "@/assets/VIDEOS/Construction Video.mp4";
import innovexImg from "@/assets/innovex.png";

const InfraMissionValues: React.FC = () => {
  return (
    <div className="bg-white text-slate-900 font-sans antialiased min-h-screen selection:bg-[#062B63] selection:text-white">
            {/* Hero Section with Cinematic Background Video & Ultra-Minimalist Text */}
      <section className="relative pt-44 pb-12 lg:pt-56 lg:pb-16 overflow-hidden flex items-end min-h-[460px] lg:min-h-[500px] bg-[#041633]">
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent z-0 pointer-events-none"></div>

        <div className="max-w-[1500px] w-full mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
          <div className="max-w-5xl space-y-2.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-black/40 text-brand-gold border border-white/20 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse"></span>
              <span>Foundational Doctrine</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white uppercase leading-tight drop-shadow-lg">
              Mission & Core Values
            </h1>
          </div>
        </div>
      </section>

      <VentureSubnav basePath="/ventures/infrastructure" companyName="Innovex Construction" />

      {/* 2-Column Split: Mission & Values */}
      <section className="py-20 lg:py-28 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left: Statement */}
            <div className="lg:col-span-5 space-y-5">
              <span className="text-xs font-bold uppercase tracking-widest text-[#062B63] block">
                Engineering Doctrine
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight uppercase">
                Mission & Values
              </h2>
              <p className="text-slate-700 text-base sm:text-lg leading-relaxed font-normal">
                To transform strategic engineering blueprints into enduring physical assets through unyielding safety, structural integrity, and disciplined project lifecycle execution.
              </p>
              <div className="space-y-3 pt-2 text-xs font-bold text-[#062B63] uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#062B63]"></span>
                  <span>Engineering Integrity • Structural Longevity</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#062B63]"></span>
                  <span>Zero Compromise on Occupational Health & Safety</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#062B63]"></span>
                  <span>Adherence to Strict Project Budgets & Timelines</span>
                </div>
              </div>

              <div className="pt-4">
                <Button asChild className="btn-primary px-7 py-3 text-xs font-bold rounded-lg shadow-sm">
                  <Link to="/ventures/infrastructure/leadership">
                    View Infrastructure Leadership <ArrowRight size={14} className="ml-1.5" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right: Engineering Photo */}
            <div className="lg:col-span-7">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 group aspect-[16/9] bg-slate-100">
                <img
                  src={innovexImg}
                  alt="Engineering Integrity in Action"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
                <div className="absolute bottom-4 left-6 right-6 text-white">
                  <div className="text-xs font-bold uppercase tracking-wider text-brand-gold">Precision Engineering</div>
                  <div className="text-sm font-semibold">Transforming industrial capital into multi-generational physical infrastructure.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InfraMissionValues;


