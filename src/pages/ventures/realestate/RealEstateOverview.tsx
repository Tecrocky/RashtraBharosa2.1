import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Building, Compass, Sparkles, ShieldCheck, Home, Key, Eye, Target, CheckCircle2, Layers, MapPin } from "lucide-react";
import VentureSubnav from "@/components/ventures/VentureSubnav";
import { Button } from "@/components/ui/button";

// Assets
import realEstateVideo from "@/assets/VIDEOS/Real estate video.mp4";
import realEstateImg from "@/assets/realestate.jpg";
import realEstateLogo from "@/assets/Subsidiary-logos/realestate-logo.png";

const RealEstateOverview: React.FC = () => {
  return (
    <div className="bg-white text-slate-900 font-sans antialiased min-h-screen selection:bg-[#062B63] selection:text-white">
      {/* Hero Section with Cinematic Background Video */}
      <section className="relative pt-44 pb-12 lg:pt-56 lg:pb-16 overflow-hidden flex items-end min-h-[460px] lg:min-h-[500px] bg-[#041633]">
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent z-0 pointer-events-none"></div>

        <div className="max-w-[1500px] w-full mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
          <div className="max-w-5xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-black/50 text-brand-gold border border-white/20 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse"></span>
              <span>Real Estate Development Vertical • Rashtra Bharosa Group</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 pt-1">
              <div className="bg-white/95 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-white/40 shadow-2xl inline-flex items-center justify-center w-fit">
                <img
                  src={realEstateLogo}
                  alt="RashBhar Real Estate Logo"
                  className="h-16 sm:h-20 md:h-24 w-auto max-w-[280px] sm:max-w-[340px] object-contain"
                />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight drop-shadow-lg uppercase">
                  RashBhar Real Estate
                </h1>
                <p className="text-sm sm:text-base font-semibold text-slate-200 uppercase tracking-widest mt-1">
                  Luxury Residential • Commercial Landmarks • Data-Driven Development
                </p>
              </div>
            </div>

            {/* Quick Hero CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Button asChild className="btn-primary px-6 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg">
                <Link to="/ventures/real-estate/leadership">
                  Real Estate Leadership <ArrowRight size={13} className="ml-1.5" />
                </Link>
              </Button>
              <Button asChild className="bg-white/10 text-white border border-white/30 hover:bg-white hover:text-[#062B63] px-6 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl backdrop-blur-md transition-all">
                <Link to="/businesses">
                  All Group Businesses <ArrowRight size={13} className="ml-1.5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Persistent Venture Sub-Navigation */}
      <VentureSubnav basePath="/ventures/real-estate" companyName="RashBhar Real Estate" logo={realEstateLogo} />

      {/* Main Corporate Editorial Content */}
      <main className="py-14 lg:py-20 bg-white">
        <div className="max-w-[1500px] w-full mx-auto px-4 sm:px-8 lg:px-12 space-y-20">
          
          {/* Section 1: Executive Corporate Narrative & Evolution */}
          <div className="space-y-8">
            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-widest text-[#062B63]">
                Corporate Profile & Urban Vision
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight uppercase leading-tight">
                Modern Luxury Living & High-Growth Commercial Infrastructure
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 text-base sm:text-lg leading-relaxed text-slate-700">
              <div className="space-y-5">
                <p className="text-lg sm:text-xl text-slate-900 font-medium leading-relaxed">
                  <strong>RashBhar Real Estate</strong>, previously known as <strong>Innovex Real-Estate</strong>, is the real-estate development vertical of <strong>Rashtra Bharosa Group</strong>. The business was acquired by the Group in <strong>Q4 2025</strong> and is focused on developing modern, high-rise luxury residential and commercial spaces across developing markets in Eastern India.
                </p>

                <p>
                  The company was established to address the growing demand for modern, high-quality, and well-planned residential and commercial infrastructure. With the acquisition of Innovex Real-Estate, Rashtra Bharosa Group brought critical land assets, an experienced executive team, and an established development platform into its multi-industry ecosystem.
                </p>

                <p>
                  Our flagship ultra-luxury residential enclave, <strong>Reyansh Elanza</strong>, exemplifies our commitment to uncompromised construction quality, biophilic design, and timeless spatial elegance tailored for discerning homeowners.
                </p>
              </div>

              <div className="space-y-5">
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <h4 className="text-xs font-bold text-[#062B63] uppercase tracking-wider">Corporate Philosophy</h4>
                  <p className="text-sm sm:text-base font-semibold text-slate-900 leading-snug">
                    "Rooted in Trust, Rising with Bharat."
                  </p>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    Trust is expressed through responsible business conduct, transparent customer relationships, accountability, strict engineering quality, and disciplined project execution.
                  </p>
                </div>

                <p>
                  RashBhar Real Estate combines <strong>strategic land evaluation, demographic analysis, smart-building technology (IoT and BMS), and disciplined development</strong> to identify high-growth urban corridors and create enduring physical assets.
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: Core Business Focus Areas */}
          <div className="space-y-8">
            <div className="max-w-3xl space-y-2">
              <div className="text-xs font-bold uppercase tracking-widest text-[#062B63]">
                Development Verticals
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight uppercase">
                Four Pillars of Urban Development
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#062B63] text-white flex items-center justify-center">
                  <Home size={20} />
                </div>
                <h4 className="text-lg font-black text-[#062B63] uppercase">Premium Residential</h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Crafting modern, high-rise luxury apartments and gated villa communities featuring natural ventilation, panoramic vistas, and private club amenities.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#062B63] text-white flex items-center justify-center">
                  <Building size={20} />
                </div>
                <h4 className="text-lg font-black text-[#062B63] uppercase">Commercial Infrastructure</h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Developing technology-enabled Grade-A office spaces, business parks, and retail centers in emerging high-growth urban corridors.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#062B63] text-white flex items-center justify-center">
                  <MapPin size={20} />
                </div>
                <h4 className="text-lg font-black text-[#062B63] uppercase">Strategic Land Acquisition</h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Evaluating strategically located land parcels across Eastern India using data-driven infrastructure and demographic growth modeling.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#062B63] text-white flex items-center justify-center">
                  <Sparkles size={20} />
                </div>
                <h4 className="text-lg font-black text-[#062B63] uppercase">Technology Integration</h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Incorporating smart Building Management Systems (BMS), IoT sensors, EV charging grids, and IGBC green building standards.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: Industry-Standard Vision & Mission Framework */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Vision */}
            <div className="p-8 sm:p-10 rounded-3xl bg-slate-50 border border-slate-200 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-[#062B63] text-white flex items-center justify-center shadow-md">
                  <Eye size={28} />
                </div>
                <div className="space-y-2">
                  <div className="text-xs font-bold uppercase tracking-widest text-[#062B63]">
                    Institutional Direction
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight">
                    Our Vision & Purpose
                  </h3>
                </div>
                <p className="text-base sm:text-lg text-slate-800 font-semibold leading-snug">
                  To participate in the transformation of India’s emerging urban markets by creating modern, high-quality, and professionally planned residential and commercial infrastructure.
                </p>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  As cities expand, RashBhar Real Estate aims to elevate the standard of urban living, creating durable, functional, and aesthetically commanding landmarks that appreciate in generational value across Eastern India.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-200 text-xs font-bold text-[#062B63] uppercase tracking-wider">
                Emerging Urban Benchmarks
              </div>
            </div>

            {/* Mission */}
            <div className="p-8 sm:p-10 rounded-3xl bg-slate-50 border border-slate-200 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-[#062B63] text-white flex items-center justify-center shadow-md">
                  <Target size={28} />
                </div>
                <div className="space-y-2">
                  <div className="text-xs font-bold uppercase tracking-widest text-[#062B63]">
                    Development Commitments
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight">
                    Our Mission
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  To identify, plan, and construct modern physical real-estate assets through rigorous financial discipline, advanced architectural engineering, and transparent governance:
                </p>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-[#062B63] shrink-0 mt-0.5" />
                    <span>Delivering signature luxury communities like Reyansh Elanza with uncompromising quality.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-[#062B63] shrink-0 mt-0.5" />
                    <span>Applying data-driven analysis to strategic land acquisition in high-potential corridors.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-[#062B63] shrink-0 mt-0.5" />
                    <span>Integrating smart building technologies (BMS, IoT) for energy efficiency and security.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-[#062B63] shrink-0 mt-0.5" />
                    <span>Upholding complete statutory compliance across RERA, BDA, and green certifications.</span>
                  </li>
                </ul>
              </div>
              <div className="pt-4 border-t border-slate-200 text-xs font-bold text-[#062B63] uppercase tracking-wider">
                Disciplined Asset Creation
              </div>
            </div>
          </div>

          {/* Section 4: Full-Width Institutional Media Banner */}
          <div className="w-full">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 aspect-[21/8] bg-slate-900">
              <img
                src={realEstateImg}
                alt="RashBhar Real Estate Luxury Developments"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none"></div>
              <div className="absolute bottom-6 left-8 text-white">
                <div className="text-xs font-bold text-brand-gold uppercase tracking-widest">
                  Premier Real Estate & Urban Architecture
                </div>
                <div className="text-sm sm:text-base font-bold text-white uppercase tracking-wider mt-0.5">
                  Reyansh Elanza • Luxury High-Rise Living • Sustainable Master-Planned Enclaves
                </div>
              </div>
            </div>
          </div>

          {/* Section 5: Comprehensive Core Values */}
          <div className="space-y-8 border-t border-slate-200 pt-12">
            <div className="max-w-3xl space-y-2">
              <div className="text-xs font-bold uppercase tracking-widest text-[#062B63]">
                Corporate Values
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase">
                The Six Pillars of Trust
              </h2>
              <p className="text-sm text-slate-600">
                The core principles guiding development decisions, construction standards, and customer relationships:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="text-lg font-black text-[#062B63] uppercase">Trust</h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Building reliable relationships with homeowners, corporate tenants, and capital partners through consistent, ethical actions and timely handover.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="text-lg font-black text-[#062B63] uppercase">Integrity</h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Conducting business honestly and responsibly, with complete statutory clarity across RERA filings, titles, and material specifications.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="text-lg font-black text-[#062B63] uppercase">Accountability</h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Taking complete ownership of development milestones, structural quality, safety standards, and project lifecycle management.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="text-lg font-black text-[#062B63] uppercase">Quality</h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Maintaining defined high engineering benchmarks across seismic-resistant RCC frames, electrical conduits, plumbing, and luxury finishes.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="text-lg font-black text-[#062B63] uppercase">Responsibility</h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Considering ecological impact through rainwater harvesting, solar-powered common areas, EV infrastructure, and waste management.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="text-lg font-black text-[#062B63] uppercase">Long-Term Value</h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Focusing on durable, master-planned physical assets that sustain rental yield, capital appreciation, and generational pride.
                </p>
              </div>
            </div>
          </div>

          {/* Section 6: Section Navigation Actions */}
          <div className="border-t border-slate-200 pt-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-4">
              <Button asChild className="btn-primary px-7 py-3 text-xs font-bold uppercase tracking-wider rounded-xl shadow-sm">
                <Link to="/ventures/real-estate/leadership">
                  Real Estate Leadership <ArrowRight size={14} className="ml-2" />
                </Link>
              </Button>
            </div>
            <Button asChild variant="ghost" className="text-xs font-bold text-slate-600 hover:text-slate-900">
              <Link to="/businesses">All Group Businesses</Link>
            </Button>
          </div>

        </div>
      </main>

      {/* Corporate Summary Bar */}
      <section className="py-12 bg-slate-50 border-t border-slate-200">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase block">Acquisition</span>
              <span className="text-lg sm:text-xl font-black text-[#062B63]">Q4 2025 (Innovex Real-Estate)</span>
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase block">Flagship Asset</span>
              <span className="text-lg sm:text-xl font-black text-[#062B63]">Reyansh Elanza</span>
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase block">Focus Geography</span>
              <span className="text-lg sm:text-xl font-black text-[#062B63]">Eastern India Urban Corridors</span>
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase block">Design Ethos</span>
              <span className="text-lg sm:text-xl font-black text-[#062B63]">Biophilic & Smart BMS</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RealEstateOverview;
