import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, HardHat, ShieldCheck, Building2 } from "lucide-react";
import VentureSubnav from "@/components/ventures/VentureSubnav";
import { Button } from "@/components/ui/button";

// Assets
import infraVideo from "@/assets/VIDEOS/Construction Video.mp4";
import innovexLogo from "@/assets/Subsidiary-logos/Innovex.png";

// Dynamic Glob Imports for Innovex Construction directory
const innovexImages = import.meta.glob<{ default: string }>(
  "/src/assets/leadership/group/Innovex Construction/*",
  { eager: true }
);

const getInnovexImg = (keyword: string) => {
  const normKey = keyword.toLowerCase().replace(/[\u2013\u2014\-_\s]/g, "");
  const match = Object.entries(innovexImages).find(([path]) => {
    const normPath = path.toLowerCase().replace(/[\u2013\u2014\-_\s]/g, "");
    return normPath.includes(normKey);
  });
  return match ? match[1].default : "";
};

interface CSuiteLeader {
  name: string;
  role: string;
  imgKey?: string;
  desc?: string;
}

// Subsidiary CEO
const ceoProfile: CSuiteLeader = {
  name: "Manish Kumar",
  role: "Chief Executive Officer (CEO)",
  imgKey: "Innovex Chief Executive Officer",
  desc: "Directs overall infrastructure & construction strategy, turnkey EPC contracting, large-scale industrial project delivery, and enterprise growth.",
};

// C-Suite Officers
const innovexCSuite: CSuiteLeader[] = [
  {
    name: "Sarbeswar Bhoi",
    role: "Chief Operating Officer (COO)",
    imgKey: "Innovex Chief Operating Officer",
    desc: "Leads field construction operations, site mobilization, heavy machinery fleet logistics, and rigorous operational safety execution.",
  },
  {
    name: "Sushant Ranjan Nayak",
    role: "Chief Projects Officer (CPO)",
    imgKey: "Innovex Chief Projects Officer",
    desc: "Oversees turnkey EPC project engineering, master construction scheduling, institutional structural milestones, and QA/QC controls.",
  },
  {
    name: "Debendra Kumar Behera",
    role: "Chief Financial Officer (CFO)",
    imgKey: "Chief Financial Officer",
    desc: "Manages infrastructure fiscal planning, EPC project financing, Capex budgeting, cash flow governance, and commercial risk.",
  },
  {
    name: "Manas Ranjan Das",
    role: "Chief Commercial Officer (CCO)",
    imgKey: "Chief Commercial Officer",
    desc: "Directs tendering, institutional EPC contracts, procurement management, vendor supply chains, and strategic client partnerships.",
  },
  {
    name: "Bibhuti Bhushan Pradhan",
    role: "Chief Engineering Officer",
    imgKey: "Chief Engineering Officer",
    desc: "Directs civil, structural, seismic, and mechanical engineering designs for heavy industrial foundations and high-assurance facilities.",
  },
  {
    name: "Rajat Kumar Jena",
    role: "Chief Infrastructure Officer",
    imgKey: "Chief Infrastructure Officer",
    desc: "Governs road corridors, bridge networks, rail freight sidings, overland bulk conveyors, and critical utility infrastructure execution.",
  },
  {
    name: "Ashok Kumar Rout",
    role: "Chief Safety & Sustainability Officer",
    imgKey: "Chief Safety",
    desc: "Enforces zero-harm workplace safety protocols, environmental compliance, seismic structural integrity, and green building standards.",
  },
];

const InfraLeadership: React.FC = () => {
  const ceoPhoto = ceoProfile.imgKey ? getInnovexImg(ceoProfile.imgKey) : "";

  return (
    <div className="bg-white text-slate-900 font-sans antialiased min-h-screen selection:bg-[#062B63] selection:text-white">
      {/* Hero Section with Cinematic Background Video & Ultra-Minimalist Text */}
      <section className="relative pt-44 pb-12 lg:pt-56 lg:pb-16 overflow-hidden flex items-end min-h-[460px] lg:min-h-[500px] bg-[#041633]">
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent z-0 pointer-events-none"></div>

        <div className="max-w-[1500px] w-full mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
          <div className="max-w-5xl space-y-2.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-black/40 text-brand-gold border border-white/20 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse"></span>
              <span>Engineering & Project Directorate</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white uppercase leading-tight drop-shadow-lg">
              Innovex Leadership Team
            </h1>
          </div>
        </div>
      </section>

      <VentureSubnav basePath="/ventures/infrastructure" companyName="Innovex Construction" logo={innovexLogo} />

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
                    MK
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
                  Subsidiary Head • Infrastructure & EPC
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-[#062B63]">
                  {ceoProfile.name}
                </h3>
                <div className="text-sm font-bold text-amber-700 uppercase tracking-wider">
                  {ceoProfile.role} • Innovex Construction
                </div>
                <p className="text-sm text-slate-600 leading-relaxed pt-1 max-w-2xl">
                  {ceoProfile.desc}
                </p>
                <div className="pt-3">
                  <Button asChild className="btn-primary px-6 py-2.5 text-xs font-bold rounded-lg shadow-sm">
                    <Link to="/ventures/infrastructure/ceo">
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
                Innovex Construction C-Suite
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {innovexCSuite.map((leader, idx) => {
                const photo = leader.imgKey ? getInnovexImg(leader.imgKey) : "";
                return (
                  <div
                    key={idx}
                    className="rounded-2xl bg-white border border-slate-200 hover:border-[#062B63] transition-all shadow-sm hover:shadow-md overflow-hidden flex flex-col group"
                  >
                    <div className="relative aspect-[4/5] bg-gradient-to-br from-slate-800 to-slate-950 overflow-hidden flex items-center justify-center">
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

                    <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <h4 className="text-base font-bold text-[#062B63] leading-snug group-hover:text-amber-700 transition-colors">
                          {leader.name}
                        </h4>
                        <div className="text-xs font-semibold text-slate-700 mt-1">
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
              <Link to="/ventures/infrastructure">
                Return to Infrastructure Overview
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

export default InfraLeadership;


