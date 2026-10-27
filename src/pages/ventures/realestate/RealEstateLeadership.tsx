import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Building2, Home as HomeIcon, MapPin, ShieldCheck, Sparkles } from "lucide-react";
import VentureSubnav from "@/components/ventures/VentureSubnav";
import { Button } from "@/components/ui/button";

// Assets
import infraVideo from "@/assets/VIDEOS/Real estate video.mp4";
import realEstateLogo from "@/assets/Subsidiary-logos/realestate-logo.png";
import realEstateImg from "@/assets/realestate.jpg";

// Dynamic Glob Imports directly from user-managed RashBhar Real Estate directory
const realEstateImages = import.meta.glob<{ default: string }>(
  "/src/assets/leadership/group/RashBhar Real Estate/*",
  { eager: true }
);

const getRealEstateImg = (keyword: string) => {
  const normKey = keyword.toLowerCase().replace(/[\u2013\u2014\-_\s]/g, "");
  const match = Object.entries(realEstateImages).find(([path]) => {
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
  name: "Suryaveer Singh Rathore",
  role: "Chief Executive Officer (CEO)",
  imgKey: "Chief Executive Officer",
  desc: "Steers corporate masterplanning, high-value land acquisitions, joint development ventures, and luxury portfolio expansion across Eastern India.",
};

// C-Suite Officers (excluding CEO who is highlighted)
const realEstateCSuite: Leader[] = [
  {
    name: "Lipsa Roul",
    role: "Chief Operating Officer (COO)",
    imgKey: "Chief Operating Officer",
    desc: "Oversees turnkey residential construction execution, on-site project mobilization, multi-site operational efficiency, and contractor governance.",
  },
  {
    name: "Debasish Swain",
    role: "Chief Financial Officer (CFO)",
    imgKey: "Chief Financial Officer",
    desc: "Governs real estate capital structuring, escrow management, RERA financial compliances, project financing, and investor reporting.",
  },
  {
    name: "Sambit Kumar Mohanty",
    role: "Chief Commercial Officer (CCO)",
    imgKey: "Chief Commercial Officer",
    desc: "Directs institutional procurement, master vendor contracting, commercial asset monetization, and strategic supply chain partnerships.",
  },
  {
    name: "Ritish Ranjan Nayak",
    role: "Chief Sales & Marketing Officer (CSMO)",
    imgKey: "Chief Sales & Marketing Officer",
    desc: "Leads omnichannel luxury property marketing, channel partner networks, high-net-worth customer acquisition, and brand positioning.",
  },
];

const RealEstateLeadership: React.FC = () => {
  const ceoPhoto = ceoProfile.imgKey ? getRealEstateImg(ceoProfile.imgKey) : "";

  return (
    <div className="bg-white text-slate-900 font-sans antialiased min-h-screen selection:bg-[#062B63] selection:text-white">
      {/* Hero Section with Cinematic Background Video & Ultra-Minimalist Text */}
      <section className="relative pt-44 pb-12 lg:pt-56 lg:pb-16 overflow-hidden flex items-end min-h-[460px] lg:min-h-[500px] bg-[#041633]">
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent z-0 pointer-events-none"></div>

        <div className="max-w-[1500px] w-full mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
          <div className="max-w-5xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-white/95 backdrop-blur-md p-1.5 rounded-lg border border-white/20 shadow-md">
                <img
                  src={realEstateLogo}
                  alt="RashBhar Real Estate Logo"
                  className="h-9 w-auto object-contain"
                />
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-black/40 text-brand-gold border border-white/20 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse"></span>
                <span>Executive Command & Leadership</span>
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white uppercase leading-tight drop-shadow-lg">
              RashBhar Real Estate Leadership
            </h1>
          </div>
        </div>
      </section>

      <VentureSubnav basePath="/ventures/real-estate" companyName="RashBhar Real Estate" logo={realEstateLogo} />

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
                    SR
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
                  Subsidiary Head • Real Estate
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-[#062B63]">
                  {ceoProfile.name}
                </h3>
                <div className="text-sm font-bold text-amber-700 uppercase tracking-wider">
                  {ceoProfile.role} • RashBhar Real Estate
                </div>
                <p className="text-sm text-slate-600 leading-relaxed pt-1 max-w-2xl">
                  {ceoProfile.desc}
                </p>
                <div className="pt-3">
                  <Button asChild className="btn-primary px-6 py-2.5 text-xs font-bold rounded-lg shadow-sm">
                    <Link to="/ventures/real-estate/ceo">
                      View Dedicated CEO Profile & Strategic Message <ArrowRight size={14} className="ml-1.5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* 2. C-Suite Officers (Clean Name & Role Format) */}
          <div className="space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-widest text-[#062B63] block">
                Executive Command
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase">
                RashBhar Real Estate C-Suite
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {realEstateCSuite.map((leader, idx) => {
                const photo = leader.imgKey ? getRealEstateImg(leader.imgKey) : "";
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
                          <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white text-xl font-black shadow-inner">
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
                      <div className="absolute bottom-3 left-4 right-4 text-white flex items-center justify-between">
                        <span className="text-[10px] font-bold text-brand-gold uppercase tracking-wider bg-black/50 px-2.5 py-1 rounded-full backdrop-blur-xs border border-white/15">
                          C-Suite
                        </span>
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
                      <div>
                        <h4 className="text-base font-bold text-[#062B63] leading-snug group-hover:text-amber-700 transition-colors">
                          {leader.name}
                        </h4>
                        <div className="text-xs font-bold text-slate-700 mt-1 uppercase tracking-wider">
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
              <Link to="/ventures/real-estate">
                Return to Real Estate Overview
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

export default RealEstateLeadership;


