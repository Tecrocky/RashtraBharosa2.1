import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Quote, ShieldCheck, Award, HeartPulse } from "lucide-react";
import VentureSubnav from "@/components/ventures/VentureSubnav";
import { Button } from "@/components/ui/button";

// Assets
import healthVideo from "@/assets/VIDEOS/healthcare-background-RBG.mp4";
import healthLogo from "@/assets/Subsidiary-logos/healthcare-logo.png";

// Dynamic Glob Imports directly from user-managed RashBhar Healthcare directory
const healthcareImages = import.meta.glob<{ default: string }>(
  "/src/assets/leadership/group/RashBhar Healthcare/*",
  { eager: true }
);

const getHealthcareImg = (keyword: string) => {
  const normKey = keyword.toLowerCase().replace(/[\u2013\u2014\-_\s]/g, "");
  const match = Object.entries(healthcareImages).find(([path]) => {
    const normPath = path.toLowerCase().replace(/[\u2013\u2014\-_\s]/g, "");
    return normPath.includes(normKey);
  });
  return match ? match[1].default : "";
};

const HealthcareCEO: React.FC = () => {
  const ceoImg = getHealthcareImg("Chief Executive Officer");
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
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight drop-shadow-lg uppercase">
              Dr. Arvind Menon
            </h1>
            <p className="text-sm sm:text-base font-semibold text-brand-gold uppercase tracking-widest mt-1">
              Chief Executive Officer • RashBhar Health Care
            </p>
          </div>
        </div>
      </section>

      <VentureSubnav basePath="/ventures/healthcare" companyName="RashBhar Health Care" />

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
                    alt="Dr. Arvind Menon - Chief Executive Officer"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 bg-[#041633] text-white space-y-1">
                  <span className="text-[10px] font-bold text-brand-gold uppercase tracking-wider bg-black/40 px-2.5 py-0.5 rounded-full border border-white/15 inline-block">
                    Subsidiary Chief Executive
                  </span>
                  <h3 className="text-xl font-black text-white">Dr. Arvind Menon</h3>
                  <p className="text-xs text-slate-300 font-medium">Chief Executive Officer (CEO)</p>
                  <p className="text-[11px] text-brand-gold font-semibold uppercase tracking-wider pt-1">
                    RashBhar Health Care • Tertiary & Clinical Sciences
                  </p>
                </div>
              </div>

              {/* Profile Summary */}
              <div className="w-full max-w-sm p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <h4 className="text-xs font-bold text-[#062B63] uppercase tracking-wider">
                  Clinical & Executive Mandate
                </h4>
                <div className="space-y-2.5 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <HeartPulse size={16} className="text-[#062B63] shrink-0" />
                    <span><strong>Focus:</strong> Tertiary Super-Specialty Medical Centers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award size={16} className="text-[#062B63] shrink-0" />
                    <span><strong>Flagship:</strong> Bhubaneswar 500-Bed Tertiary Facility</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={16} className="text-[#062B63] shrink-0" />
                    <span><strong>Outreach:</strong> Rural Telecardiology & Critical Care Networks</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Strategic Narrative */}
            <div className="lg:col-span-8 space-y-8">
              <div className="space-y-2 border-b border-slate-200 pb-6">
                <span className="text-xs font-bold uppercase tracking-widest text-[#062B63] block">
                  Medical Leadership Perspective
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight">
                  Democratizing Advanced Tertiary Care Across Eastern India
                </h2>
              </div>

              {/* Pull Quote */}
              <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 border-l-4 border-[#062B63] space-y-3">
                <Quote size={32} className="text-[#062B63]/40" />
                <p className="text-base sm:text-lg font-bold text-[#062B63] italic leading-relaxed">
                  "Quality healthcare must never be a privilege of geography. Our mission at RashBhar Health Care is to integrate super-specialty clinical precision with compassionate, affordable community outreach so that every life in Eastern India has immediate access to world-class clinical care."
                </p>
                <div className="pt-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  — Dr. Arvind Menon, CEO, RashBhar Health Care
                </div>
              </div>

              {/* Detailed Narrative */}
              <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
                <p>
                  As Chief Executive Officer of RashBhar Health Care, Dr. Arvind Menon provides visionary clinical direction and institutional leadership. With deep experience in healthcare administration, cardiac care ecosystems, and tertiary hospital governance, Dr. Menon is leading the development of the 500-bed state-of-the-art super-specialty flagship medical campus in Bhubaneswar.
                </p>
                <p>
                  Under his stewardship, RashBhar Health Care is bridging urban-rural healthcare disparities through AI-enabled diagnostic hubs, emergency mobile cardiac response units, and dedicated non-profit health screening initiatives.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 flex flex-wrap gap-4">
                <Button asChild className="btn-primary px-7 py-3 text-xs font-bold rounded-lg shadow-sm">
                  <Link to="/ventures/healthcare/leadership">
                    View Healthcare C-Suite <ArrowRight size={14} className="ml-1.5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="px-7 py-3 text-xs font-bold rounded-lg text-[#062B63] border-slate-300 hover:bg-slate-50">
                  <Link to="/ventures/healthcare">
                    Healthcare Overview
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

export default HealthcareCEO;
