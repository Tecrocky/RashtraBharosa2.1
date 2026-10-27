import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, HardHat, Train, Building, ShieldCheck, Ruler, CheckCircle2, Eye, Target, Wrench, Factory, Truck } from "lucide-react";
import VentureSubnav from "@/components/ventures/VentureSubnav";
import { Button } from "@/components/ui/button";

// Assets
import infraVideo from "@/assets/VIDEOS/Construction Video.mp4";
import innovexImg from "@/assets/innovex.png";
import innovexLogo from "@/assets/Subsidiary-logos/Innovex.png";

const InfraOverview: React.FC = () => {
  return (
    <div className="bg-white text-slate-900 font-sans antialiased min-h-screen selection:bg-[#062B63] selection:text-white">
      {/* Hero Section with Cinematic Background Video */}
      <section className="relative pt-44 pb-12 lg:pt-56 lg:pb-16 overflow-hidden flex items-end min-h-[460px] lg:min-h-[500px] bg-[#041633]">
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent z-0 pointer-events-none"></div>

        <div className="max-w-[1500px] w-full mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
          <div className="max-w-5xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-black/50 text-brand-gold border border-white/20 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse"></span>
              <span>Construction & Infrastructure Arm • Rashtra Bharosa Group</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 pt-1">
              <div className="bg-white/95 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-white/40 shadow-2xl inline-flex items-center justify-center w-fit">
                <img
                  src={innovexLogo}
                  alt="Innovex Construction Logo"
                  className="h-16 sm:h-20 md:h-24 w-auto max-w-[280px] sm:max-w-[340px] object-contain"
                />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight drop-shadow-lg uppercase">
                  Innovex Construction
                </h1>
                <p className="text-sm sm:text-base font-semibold text-slate-200 uppercase tracking-widest mt-1">
                  Building Infrastructure • Delivering Execution • Est. 2018
                </p>
              </div>
            </div>

            {/* Quick Hero CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Button asChild className="btn-primary px-6 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg">
                <Link to="/ventures/infrastructure/leadership">
                  Engineering Leadership <ArrowRight size={13} className="ml-1.5" />
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
      <VentureSubnav basePath="/ventures/infrastructure" companyName="Innovex Construction" logo={innovexLogo} />

      {/* Main Corporate Editorial Content */}
      <main className="py-14 lg:py-20 bg-white">
        <div className="max-w-[1500px] w-full mx-auto px-4 sm:px-8 lg:px-12 space-y-20">
          
          {/* Section 1: Executive Corporate Narrative & Philosophy */}
          <div className="space-y-8">
            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-widest text-[#062B63]">
                About Innovex Construction
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight uppercase leading-tight">
                Building Infrastructure. Delivering Execution.
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 text-base sm:text-lg leading-relaxed text-slate-700">
              <div className="space-y-5">
                <p className="text-lg sm:text-xl text-slate-900 font-medium leading-relaxed">
                  <strong>Innovex Construction</strong> is a construction and infrastructure company within the <strong>Rashtra Bharosa Group</strong> ecosystem, focused on the development and execution of civil, industrial, infrastructure and built-environment works.
                </p>

                <p>
                  Established in <strong>2018</strong>, Innovex Construction developed its business around heavy civil construction, infrastructure engineering, and property development. Within the Group, the company represents the core physical-development capability, delivering durable assets across railway modernization, port expansion, heavy industrial corridors, and mining facilities.
                </p>

                <p>
                  With a demonstrated portfolio of over <strong>115+ construction projects</strong>, Innovex operates where multiple engineering disciplines, materials, equipment fleets, and statutory controls must be synchronized seamlessly.
                </p>
              </div>

              <div className="space-y-5">
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <h4 className="text-xs font-bold text-[#062B63] uppercase tracking-wider">Our Construction Philosophy</h4>
                  <p className="text-sm sm:text-base font-semibold text-slate-900 leading-snug">
                    "Understand the requirement. Engineer the solution. Organise the resources. Execute with discipline. Deliver infrastructure that is functional, durable and fit for purpose."
                  </p>
                </div>

                <p>
                  We believe that successful construction is determined not only by the completed physical structure, but by the operational discipline, quality control, workforce safety, and resource stewardship maintained throughout execution.
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: The Five Execution Principles */}
          <div className="p-8 sm:p-12 rounded-3xl bg-[#041633] text-white shadow-2xl border border-white/10 space-y-8">
            <div className="max-w-3xl space-y-2">
              <div className="text-xs font-bold text-brand-gold uppercase tracking-widest">
                Our Operating Doctrine
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight">
                The Five Principles of Execution
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Innovex delivers complex infrastructure on time and within specifications by strictly upholding five non-negotiable operating principles:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pt-2">
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <span className="text-xs font-black text-brand-gold">01</span>
                <h4 className="text-sm font-bold text-white uppercase">Plan Correctly</h4>
                <p className="text-xs text-slate-300 leading-relaxed">Thorough pre-construction engineering, surveying, and site logistics planning.</p>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <span className="text-xs font-black text-brand-gold">02</span>
                <h4 className="text-sm font-bold text-white uppercase">Build Safely</h4>
                <p className="text-xs text-slate-300 leading-relaxed">Rigorous safety practices, workforce protection, and zero-compromise site standards.</p>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <span className="text-xs font-black text-brand-gold">03</span>
                <h4 className="text-sm font-bold text-white uppercase">Control Quality</h4>
                <p className="text-xs text-slate-300 leading-relaxed">Exhaustive material testing, standard-compliant RCC, and structural assurance.</p>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <span className="text-xs font-black text-brand-gold">04</span>
                <h4 className="text-sm font-bold text-white uppercase">Use Resources Responsibly</h4>
                <p className="text-xs text-slate-300 leading-relaxed">Optimized machinery utilization, waste minimization, and responsible sourcing.</p>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <span className="text-xs font-black text-brand-gold">05</span>
                <h4 className="text-sm font-bold text-white uppercase">Deliver the Asset</h4>
                <p className="text-xs text-slate-300 leading-relaxed">Contractual milestone adherence, precision handover, and lasting operational fitness.</p>
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
                    Our Vision
                  </h3>
                </div>
                <p className="text-base sm:text-lg text-slate-800 font-semibold leading-snug">
                  To build a dependable construction and infrastructure platform capable of delivering durable, functional, and technically sound physical assets.
                </p>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  We define our progress not simply by contract volume, but by the structural integrity, safety record, and enduring economic utility of the infrastructure we engineer across India.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-200 text-xs font-bold text-[#062B63] uppercase tracking-wider">
                Built-Environment Platform
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
                    Execution Commitments
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight">
                    Our Mission
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  To develop and execute construction and infrastructure works through disciplined operations, sound engineering, responsible resource management, strong quality practices, and safe working standards:
                </p>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-[#062B63] shrink-0 mt-0.5" />
                    <span>Executing railway redevelopments under the Amrit Bharat Station Scheme.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-[#062B63] shrink-0 mt-0.5" />
                    <span>Delivering heavy civil, marine piling, and port logistics foundations with L&T.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-[#062B63] shrink-0 mt-0.5" />
                    <span>Engineering mining-support infrastructure, haul roads, and rapid rail sidings.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-[#062B63] shrink-0 mt-0.5" />
                    <span>Maintaining strict ISO quality, safety, and environmental compliance across sites.</span>
                  </li>
                </ul>
              </div>
              <div className="pt-4 border-t border-slate-200 text-xs font-bold text-[#062B63] uppercase tracking-wider">
                Engineering Discipline
              </div>
            </div>
          </div>

          {/* Section 4: Full-Width Institutional Media Banner */}
          <div className="w-full">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 aspect-[21/8] bg-slate-900">
              <img
                src={innovexImg}
                alt="Innovex Construction Infrastructure Operations"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none"></div>
              <div className="absolute bottom-6 left-8 text-white">
                <div className="text-xs font-bold text-brand-gold uppercase tracking-widest">
                  Civil Engineering & Heavy EPC Operations
                </div>
                <div className="text-sm sm:text-base font-bold text-white uppercase tracking-wider mt-0.5">
                  115+ Delivered Projects • Railway Modernization • Port & Industrial Corridor Engineering
                </div>
              </div>
            </div>
          </div>

          {/* Section 5: Comprehensive Core Values */}
          <div className="space-y-8 border-t border-slate-200 pt-12">
            <div className="max-w-3xl space-y-2">
              <div className="text-xs font-bold uppercase tracking-widest text-[#062B63]">
                Operating Values
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase">
                Our Core Values
              </h2>
              <p className="text-sm text-slate-600">
                The institutional principles governing engineering coordination, procurement, and site execution:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="text-lg font-black text-[#062B63] uppercase">Integrity</h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Maintaining transparency, commercial honesty, and clear accountability in all client, contractor, and statutory interactions.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="text-lg font-black text-[#062B63] uppercase">Safety</h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Protecting people, sites, machinery, and surrounding communities through disciplined safety practices and continuous site hazard assessments.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="text-lg font-black text-[#062B63] uppercase">Quality</h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Building strictly in accordance with approved engineering drawings, standard-tested materials, and defined statutory construction controls.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="text-lg font-black text-[#062B63] uppercase">Accountability</h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Maintaining single-point ownership for engineering decisions, resource allocations, project milestones, and asset durability.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="text-lg font-black text-[#062B63] uppercase">Discipline</h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Following defined project management workflows, schedule baselines, quality checklists, and cost-control systems without deviation.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="text-lg font-black text-[#062B63] uppercase">Responsibility</h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Stewardship of materials, capital, energy, and heavy machinery, minimizing construction waste and ecological impact.
                </p>
              </div>
            </div>
          </div>

          {/* Section 6: Section Navigation Actions */}
          <div className="border-t border-slate-200 pt-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-4">
              <Button asChild className="btn-primary px-7 py-3 text-xs font-bold uppercase tracking-wider rounded-xl shadow-sm">
                <Link to="/ventures/infrastructure/leadership">
                  Engineering Leadership <ArrowRight size={14} className="ml-2" />
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
              <span className="text-[11px] font-bold text-slate-500 uppercase block">Established</span>
              <span className="text-lg sm:text-xl font-black text-[#062B63]">2018</span>
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase block">Delivered Track Record</span>
              <span className="text-lg sm:text-xl font-black text-[#062B63]">115+ Projects</span>
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase block">Key Domains</span>
              <span className="text-lg sm:text-xl font-black text-[#062B63]">Railways, Ports & Industrial EPC</span>
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase block">Core Ethos</span>
              <span className="text-lg sm:text-xl font-black text-[#062B63]">Plan. Build. Deliver.</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InfraOverview;
