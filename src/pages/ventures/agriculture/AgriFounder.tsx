import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Quote } from "lucide-react";
import VentureSubnav from "@/components/ventures/VentureSubnav";
import { Button } from "@/components/ui/button";

// Assets
import agriVideo from "@/assets/VIDEOS/Agricultural land cinematic beauty.mp4";
import founderImg from "@/assets/leadership/group/Subransu-abt.jpeg";
import founderSignImg from "@/assets/sign/founder-sign.png";

const AgriFounder: React.FC = () => {
  return (
    <div className="bg-white text-slate-900 font-sans antialiased min-h-screen selection:bg-[#062B63] selection:text-white">
            {/* Hero Section with Cinematic Background Video & Ultra-Minimalist Text */}
      <section className="relative pt-44 pb-12 lg:pt-56 lg:pb-16 overflow-hidden flex items-end min-h-[460px] lg:min-h-[500px] bg-[#041633]">
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent z-0 pointer-events-none"></div>

        <div className="max-w-[1500px] w-full mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
          <div className="max-w-5xl space-y-2.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-black/40 text-brand-gold border border-white/20 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse"></span>
              <span>Promoter Stewardship</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white uppercase leading-tight drop-shadow-lg">
              Founder’s Vision for Agrarian Independence
            </h1>
          </div>
        </div>
      </section>

      <VentureSubnav basePath="/ventures/agriculture" companyName="RashBhar Soil & Soul" />

      {/* Founder Split Section */}
      <section className="py-20 lg:py-28 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left: Portrait */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-xl border border-slate-200 group bg-slate-50">
                <img
                  src={founderImg}
                  alt="Subransu Mohanty, Founder"
                  className="w-full h-auto object-cover object-top group-hover:scale-102 transition-transform duration-700"
                />
              </div>
            </div>

            {/* Right: Statement & Signature */}
            <div className="lg:col-span-7 space-y-6">
              <div className="relative p-8 sm:p-10 rounded-2xl border-l-4 border-[#062B63] bg-slate-50/80 shadow-xs space-y-4">
                <span className="text-4xl text-[#062B63] font-sans font-bold leading-none block">“</span>
                <p className="text-lg sm:text-xl text-slate-800 leading-relaxed font-normal italic -mt-4">
                  The soil beneath our feet is our greatest strategic heritage. When we restore living moisture to our farmland through science and treat the Indian farmer with equity, we secure the true foundation of Bharat’s independence.
                </p>
                <div className="pt-4 border-t border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-bold text-[#062B63]">Subransu Mohanty</h3>
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-0.5">
                      Founder & Promoter, Rashtra Bharosa Group
                    </div>
                  </div>
                  <img
                    src={founderSignImg}
                    alt="Subransu Mohanty Signature"
                    className="h-12 w-auto object-contain opacity-90 filter drop-shadow"
                  />
                </div>
              </div>

              <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed pt-2">
                <p>
                  Generations of excessive chemical fertilization and groundwater over-extraction have depleted the living biology of Indian topsoil. We cannot solve 21st-century food security with 20th-century chemical inputs that impoverish both the land and the farmer.
                </p>
                <p>
                  Soil & Soul was created to deploy cutting-edge polymer science like AgriGel™ alongside ancient ecological wisdom. Our mission is to ensure that even in drought-vulnerable zones, farmers can harvest abundant, nutrient-dense crops while retaining dignity and economic stability.
                </p>
              </div>

              <div className="pt-4">
                <Button asChild className="btn-primary px-7 py-3 text-xs font-bold rounded-lg shadow-sm">
                  <Link to="/ventures/agriculture/leadership">
                    Meet Agronomy Leadership Team <ArrowRight size={14} className="ml-1.5" />
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

export default AgriFounder;



