import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Laptop, Brain, Lock } from "lucide-react";
import VentureSubnav from "@/components/ventures/VentureSubnav";
import { Button } from "@/components/ui/button";

// Assets
import techVideo from "@/assets/VIDEOS/tech-background-RBG.mp4";
// Dynamic Glob Imports directly from user-managed RashBhar Technology directory
const techImages = import.meta.glob<{ default: string }>(
  "/src/assets/leadership/group/RashBhar Technology/*",
  { eager: true }
);

const getTechImg = (keyword: string) => {
  const normKey = keyword.toLowerCase().replace(/[\u2013\u2014\-_\s]/g, "");
  const match = Object.entries(techImages).find(([path]) => {
    const normPath = path.toLowerCase().replace(/[\u2013\u2014\-_\s]/g, "");
    return normPath.includes(normKey);
  });
  return match ? match[1].default : "";
};

interface Leader {
  name: string;
  role: string;
  imgKey?: string;
  desc?: string;
}

// Subsidiary CEO
const ceoProfile: Leader = {
  name: "Vanshika Verma",
  role: "Chief Executive Officer (CEO)",
  imgKey: "Chief Executive Officer",
  desc: "Directs overarching technology strategy, deep-tech research, enterprise software architecture, autonomous industrial systems, and AI innovation.",
};

// C-Suite Officers
const techCSuite: Leader[] = [
  { name: "Shreya Marika", role: "Chief Operating Officer (COO)", imgKey: "Chief Operating Officer", desc: "Directs cloud infrastructure operations, global devops delivery, enterprise agile program governance, and digital delivery pipelines." },
  { name: "Alexey Korkin", role: "Chief Technology Officer (CTO)", imgKey: "Chief Technology Officer", desc: "Spearheads sovereign AI architectures, foundation models, enterprise agentic intelligence, and high-performance neural computing." },
  { name: "Prakash Bahadur Thapa", role: "Chief Digital & Analytics Officer (CDAO)", imgKey: "Chief Digital & Analytics Officer", desc: "Directs big data telemetry, enterprise predictive modeling, industrial IoT pipelines, and executive intelligence dashboards." },
  { name: "Febianto Anto", role: "Chief Information Security Officer (CISO)", imgKey: "Chief Information Security Officer", desc: "Enforces zero-trust cyber defense architectures, cryptographic protocols, data sovereignty compliance, and SOC infrastructure." },
  { name: "Dr. Nandita Iyer", role: "Chief Financial Officer (CFO)", imgKey: "Chief Financial Officer", desc: "Manages deep-tech R&D capitalization, software venture financing, global technology licensing, and financial controllership." },
  { name: "Priyanka Menon", role: "Chief People & Organization Officer (CHRO)", imgKey: "Chief People & Organization Officer", desc: "Leads engineering talent acquisition, organizational culture, global tech workforce development, and leadership succession." },
];

const TechLeadership: React.FC = () => {
  const ceoPhoto = ceoProfile.imgKey ? getTechImg(ceoProfile.imgKey) : "";

  return (
    <div className="bg-white text-slate-900 font-sans antialiased min-h-screen selection:bg-[#062B63] selection:text-white">
      {/* Hero Section with Cinematic Background Video & Ultra-Minimalist Text */}
      <section className="relative pt-44 pb-12 lg:pt-56 lg:pb-16 overflow-hidden flex items-end min-h-[460px] lg:min-h-[500px] bg-[#041633]">
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent z-0 pointer-events-none"></div>

        <div className="max-w-[1500px] w-full mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
          <div className="max-w-5xl space-y-2.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-black/40 text-brand-gold border border-white/20 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse"></span>
              <span>Engineering Command & Research Directorate</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white uppercase leading-tight drop-shadow-lg">
              Technology Leadership Team
            </h1>
          </div>
        </div>
      </section>

      <VentureSubnav basePath="/ventures/technology" companyName="RashBhar Technology" />

      {/* Leadership Directory Content */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1500px] w-full mx-auto px-4 sm:px-8 lg:px-12 space-y-16">
          
          {/* 1. Dedicated CEO Spotlight Card */}
          <div className="space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-widest text-[#062B63] block">
                Executive Leadership
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase">
                Chief Executive Officer
              </h2>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-50 via-white to-amber-50/30 border border-slate-200 flex flex-col md:flex-row items-center gap-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-44 h-52 sm:w-52 sm:h-64 rounded-2xl overflow-hidden border-2 border-[#062B63] shrink-0 shadow-md bg-slate-900 relative">
                {ceoPhoto ? (
                  <img
                    src={ceoPhoto}
                    alt={`${ceoProfile.name} - ${ceoProfile.role}`}
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white text-3xl font-black">
                    VV
                  </div>
                )}
                <div className="absolute bottom-2 left-2 right-2">
                  <span className="text-[10px] font-bold text-brand-gold uppercase tracking-wider bg-black/60 px-2.5 py-1 rounded-full backdrop-blur-xs border border-white/20 block text-center">
                    Chief Executive Officer
                  </span>
                </div>
              </div>

              <div className="space-y-3 text-center md:text-left flex-1">
                <div className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-[#062B63]/10 text-[#062B63]">
                  Subsidiary Head • Technology & Artificial Intelligence
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-[#062B63]">
                  {ceoProfile.name}
                </h3>
                <div className="text-sm font-bold text-amber-700 uppercase tracking-wider">
                  {ceoProfile.role} • RashBhar Technology
                </div>
                <p className="text-sm text-slate-600 leading-relaxed pt-1 max-w-2xl">
                  {ceoProfile.desc}
                </p>
                <div className="pt-3">
                  <Button asChild className="btn-primary px-6 py-2.5 text-xs font-bold rounded-lg shadow-sm">
                    <Link to="/ventures/technology/ceo">
                      View Dedicated CEO Profile & Strategic Message <ArrowRight size={14} className="ml-1.5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* 2. C-Suite Leadership */}
          <div className="space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-widest text-[#062B63] block">
                Executive Command
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase">
                RashBhar Technology C-Suite
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {techCSuite.map((leader, idx) => {
                const photo = leader.imgKey ? getTechImg(leader.imgKey) : "";
                return (
                  <div
                    key={idx}
                    className="rounded-2xl bg-white border border-slate-200 hover:border-[#062B63] transition-all shadow-sm hover:shadow-md overflow-hidden flex flex-col group"
                  >
                    <div className="relative aspect-[4/5] bg-gradient-to-br from-slate-900 via-slate-800 to-[#062B63] overflow-hidden flex items-center justify-center">
                      {photo ? (
                        <img
                          src={photo}
                          alt={`${leader.name} - ${leader.role}`}
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center text-center p-6 text-slate-300 space-y-3">
                          <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white text-xl font-black">
                            {leader.name
                              .replace(/^(Dr\.|Mr\.|Ms\.)\s*/i, "")
                              .split(" ")
                              .map((n) => n[0])
                              .slice(0, 2)
                              .join("")}
                          </div>
                          <span className="text-[11px] font-bold text-brand-gold uppercase tracking-wider">
                            Executive Officer
                          </span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
                      <div className="absolute bottom-3 left-4 right-4 text-white">
                        <span className="text-[10px] font-bold text-brand-gold uppercase tracking-wider bg-black/40 px-2.5 py-1 rounded-full backdrop-blur-xs border border-white/15">
                          C-Suite
                        </span>
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
                      <div>
                        <h4 className="text-base font-bold text-[#062B63] leading-snug group-hover:text-amber-700 transition-colors">
                          {leader.name}
                        </h4>
                        <div className="text-xs font-semibold text-slate-700 mt-1 uppercase tracking-wider">
                          {leader.role}
                        </div>
                        {leader.desc && (
                          <p className="text-xs text-slate-600 leading-relaxed pt-2.5 mt-2.5 border-t border-slate-100 line-clamp-3">
                            {leader.desc}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-4 text-center flex justify-center gap-4">
            <Button asChild className="btn-primary px-7 py-3 text-xs font-bold rounded-lg shadow-sm">
              <Link to="/ventures/technology">
                Return to Technology Overview
              </Link>
            </Button>
            <Button asChild variant="outline" className="px-7 py-3 text-xs font-bold rounded-lg text-[#062B63] border-slate-300 hover:bg-slate-50">
              <Link to="/about/leadership">
                View Master Group Leadership <ArrowRight size={14} className="ml-1.5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TechLeadership;


