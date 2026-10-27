import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Pickaxe, Award, Briefcase, MapPin } from "lucide-react";
import VentureSubnav from "@/components/ventures/VentureSubnav";
import { Button } from "@/components/ui/button";

// Assets
import miningVideo from "@/assets/VIDEOS/mining-background-RBG.mp4";
import miningLogo from "@/assets/Subsidiary-logos/mining-logo.png";
import founderImg from "@/assets/leadership/group/Subransu-abt.jpeg";

// Dynamic Glob Imports directly from user-managed RashBhar Mining directory
const miningImages = import.meta.glob<{ default: string }>(
  "/src/assets/leadership/group/RashBhar Mining/*",
  { eager: true }
);

const getMiningImg = (keyword: string) => {
  const normKey = keyword.toLowerCase().replace(/[\u2013\u2014\-_\s]/g, "");
  const match = Object.entries(miningImages).find(([path]) => {
    const normPath = path.toLowerCase().replace(/[\u2013\u2014\-_\s]/g, "");
    return normPath.includes(normKey);
  });
  return match ? match[1].default : "";
};

interface MiningLeader {
  name: string;
  role: string;
  imgKey: string;
  department?: string;
  bio?: string;
}

// Subsidiary CEO
const ceoProfile: MiningLeader = {
  name: "Arvind Pratap Rao",
  role: "Chief Executive Officer (CEO)",
  imgKey: "mining Chief Executive Officer",
  bio: "Leads overarching mining operations, concession acquisitions, statutory compliance, and strategic mineral production for RashBhar Mining.",
};

// Executive C-Suite Officers (8 Leaders excluding CEO who is highlighted)
const miningCSuite: MiningLeader[] = [
  {
    name: "Dhruv Shukla",
    role: "Chief Operating Officer",
    imgKey: "mining Chief Operating Officer",
    bio: "Directs daily mining asset performance, pit-to-port dispatch coordination, equipment mobilization, and operational safety standards.",
  },
  {
    name: "Eshan Krishnan",
    role: "Chief Mining Operations Officer",
    imgKey: "mining Chief Mining Operations Officer",
    bio: "Manages heavy pit excavations, overburden removal operations, blast engineering, and multi-mine operational throughput.",
  },
  {
    name: "Farhan D'Souza",
    role: "Chief Projects Officer",
    imgKey: "mining Chief Projects Officer",
    bio: "Oversees greenfield mining project commissioning, washery infrastructure setup, rail siding builds, and heavy capital investments.",
  },
  {
    name: "Rajesh K. Gupta",
    role: "Chief Financial Officer",
    imgKey: "mining Chief Financial Officer",
    bio: "Governs mining fiscal strategy, mineral royalty audits, Capex budgeting, trade financing, and financial controllership.",
  },
  {
    name: "Harpreet Singh",
    role: "Chief Commercial Officer",
    imgKey: "mining Chief Commercial Officer",
    bio: "Directs domestic mineral sales contracts, long-term power & steel off-take agreements, pricing strategy, and institutional client portfolios.",
  },
  {
    name: "Gautam Sandhu",
    role: "Chief Technology Officer",
    imgKey: "mining Chief Technology Officer",
    bio: "Integrates IoT telemetry for heavy earthmoving machinery, AI pit-dispatch optimization, and automated resource monitoring.",
  },
  {
    name: "Harsh Shah",
    role: "Chief Safety Officer",
    imgKey: "mining Chief Safety Officer",
    bio: "Enforces DGMS statutory safety guidelines, emergency response protocols, pit hazard mitigations, and zero-harm workplace cultures.",
  },
  {
    name: "Sandip Menon",
    role: "Chief Sustainability Officer",
    imgKey: "mining Chief Sustainability Officer",
    bio: "Leads ecological mine reclamation, progressive afforestation, water recycling, community tribal welfare, and ESG net-zero roadmaps.",
  },
];

const MiningLeadership: React.FC = () => {
  const ceoPhoto = ceoProfile.imgKey ? getMiningImg(ceoProfile.imgKey) : "";

  return (
    <div className="bg-white text-slate-900 font-sans antialiased min-h-screen selection:bg-[#062B63] selection:text-white">
      {/* 1. Hero Section with Cinematic Background Video & Ultra-Minimalist Text */}
      <section className="relative pt-44 pb-12 lg:pt-56 lg:pb-16 overflow-hidden flex items-end min-h-[460px] lg:min-h-[500px] bg-[#041633]">
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent z-0 pointer-events-none"></div>

        <div className="max-w-[1500px] w-full mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
          <div className="max-w-5xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-black/50 text-brand-gold border border-white/20 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse"></span>
              <span>Governance & Executive Command</span>
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
                  Mining Leadership Team
                </h1>
                <p className="text-sm sm:text-base font-semibold text-slate-200 uppercase tracking-widest mt-1">
                  RashBhar Mining Corporation • Executive Command
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Venture Sub-Navigation */}
      <VentureSubnav basePath="/ventures/mining" companyName="RashBhar Mining" logo={miningLogo} />

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
                    AR
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
                  Subsidiary Head • Mining & Natural Resources
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-[#062B63]">
                  {ceoProfile.name}
                </h3>
                <div className="text-sm font-bold text-amber-700 uppercase tracking-wider">
                  {ceoProfile.role} • RashBhar Mining
                </div>
                <p className="text-sm text-slate-600 leading-relaxed pt-1 max-w-2xl">
                  {ceoProfile.bio}
                </p>
                <div className="pt-3">
                  <Button asChild className="btn-primary px-6 py-2.5 text-xs font-bold rounded-lg shadow-sm">
                    <Link to="/ventures/mining/ceo">
                      View Dedicated CEO Profile & Strategic Message <ArrowRight size={14} className="ml-1.5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* 2. RashBhar Mining C-Suite (8 Executive Leaders) */}
          <div className="space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-widest text-[#062B63] block">
                Executive Command
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase">
                RashBhar Mining C-Suite
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {miningCSuite.map((csuite, idx) => {
                const photoSrc = getMiningImg(csuite.imgKey);
                return (
                  <div 
                    key={idx} 
                    className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md hover:border-[#062B63] transition-all duration-300 flex flex-col"
                  >
                    {/* Portrait Photo Container */}
                    <div className="relative aspect-[4/5] bg-slate-900 overflow-hidden flex items-center justify-center">
                      {photoSrc ? (
                        <img
                          src={photoSrc}
                          alt={csuite.name}
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400">
                          <ShieldCheck size={48} />
                        </div>
                      )}
                      <div className="absolute bottom-3 left-4 right-4 text-white">
                        <span className="text-[10px] font-bold text-brand-gold uppercase tracking-wider bg-black/60 px-2.5 py-1 rounded-full backdrop-blur-xs border border-white/20">
                          C-Suite
                        </span>
                      </div>
                    </div>

                    {/* Officer Details */}
                    <div className="p-5 flex flex-col flex-grow justify-between space-y-2 bg-white">
                      <div>
                        <h4 className="text-base font-bold text-[#062B63] leading-snug group-hover:text-amber-700 transition-colors">
                          {csuite.name}
                        </h4>
                        <div className="text-xs font-bold text-slate-700 mt-1 uppercase tracking-wider">
                          {csuite.role}
                        </div>
                        {csuite.bio && (
                          <p className="text-xs text-slate-600 leading-relaxed pt-2.5 mt-2.5 border-t border-slate-100 line-clamp-3">
                            {csuite.bio}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation CTA Buttons */}
          <div className="pt-4 text-center flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild className="btn-primary px-8 py-3 text-xs font-bold rounded-xl shadow-sm">
              <Link to="/ventures/mining">
                Return to Mining Overview
              </Link>
            </Button>
            <Button asChild variant="outline" className="px-8 py-3 text-xs font-bold rounded-xl text-[#062B63] border-slate-300 hover:bg-slate-50">
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

export default MiningLeadership;



