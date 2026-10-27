import React from "react";
import { Link } from "react-router-dom";
import { Lock, Cpu, ArrowRight } from "lucide-react";
import VentureSubnav from "@/components/ventures/VentureSubnav";
import { Button } from "@/components/ui/button";
import techVideo from "@/assets/VIDEOS/tech-background-RBG.mp4";
import techImg from "@/assets/technology.jpg";

const TechMissionValues: React.FC = () => {
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

      <VentureSubnav basePath="/ventures/technology" companyName="RashBhar Technology" />

      {/* 2-Column Split: Mission & Values */}
      <section className="py-20 lg:py-28 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left: Statement */}
            <div className="lg:col-span-5 space-y-5">
              <span className="text-xs font-bold uppercase tracking-widest text-[#062B63] block">
                Technical Philosophy
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight uppercase">
                Mission & Values
              </h2>
              <p className="text-slate-700 text-base sm:text-lg leading-relaxed font-normal">
                To build sovereign, trustworthy computing and robotics architectures that empower Indian enterprises and protect national digital frontiers with total data independence.
              </p>
              <div className="space-y-3 pt-2 text-xs font-bold text-[#062B63] uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#062B63]"></span>
                  <span>100% In-Country Data Residency & Privacy</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#062B63]"></span>
                  <span>Vernacular Multilingual Contextual Integrity</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#062B63]"></span>
                  <span>Human-First Automation & Zero Malicious Telemetry</span>
                </div>
              </div>

              <div className="pt-4">
                <Button asChild className="btn-primary px-7 py-3 text-xs font-bold rounded-lg shadow-sm">
                  <Link to="/ventures/technology/leadership">
                    View Technology Leadership <ArrowRight size={14} className="ml-1.5" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right: Technology Photo */}
            <div className="lg:col-span-7">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 group aspect-[16/9] bg-slate-100">
                <img
                  src={techImg}
                  alt="Sovereign Deep-Tech Capabilities"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
                <div className="absolute bottom-4 left-6 right-6 text-white">
                  <div className="text-xs font-bold uppercase tracking-wider text-brand-gold">Digital Independence</div>
                  <div className="text-sm font-semibold">Developing indigenous deep-tech solutions tailored to Bharat’s sovereign priorities.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TechMissionValues;


