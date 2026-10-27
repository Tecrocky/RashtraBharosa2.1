import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Cpu, Layers, HardHat, Trees, Users, Building2, TrendingUp, Sparkles, Mail, FileText, CheckCircle2, PhoneCall, Pickaxe, Target, Eye, Wrench, Train } from "lucide-react";
import VentureSubnav from "@/components/ventures/VentureSubnav";
import { Button } from "@/components/ui/button";
import MetaTags from "@/components/MetaTags";

// Assets
import miningVideo from "@/assets/VIDEOS/mining-background-RBG.mp4";
import miningLogo from "@/assets/Subsidiary-logos/mining-logo.png";
import miningImg from "@/assets/mining.jpg";
import miningHighlightImg from "@/assets/highlights/mining-highlight.jpg";
import mineDumperPhoto3 from "@/assets/projects/MININGING/mines_area-20260923-0003.jpg";
import mineFieldPhoto1 from "@/assets/projects/MININGING/mines_area-20260923-0001.jpg";

const MiningOverview: React.FC = () => {
  const miningSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "RashBhar Mining",
    "parentOrganization": {
      "@type": "Organization",
      "name": "Rashtra Bharosa Group"
    },
    "url": "https://www.rashtrabharosagroup.com/ventures/mining",
    "description": "Natural resource extraction, mineral exploration, iron ore, coal, and bauxite operations.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Jamshedpur",
      "addressRegion": "Jharkhand",
      "addressCountry": "IN"
    }
  };

  return (
    <div className="bg-white text-slate-900 font-sans antialiased min-h-screen selection:bg-[#062B63] selection:text-white">
      <MetaTags
        title="RashBhar Mining | Mineral Exploration & Natural Resources"
        description="Pioneering responsible mineral extraction and exploration of critical resources, iron ore, coal, and bauxite with zero-harm environmental standards."
        keywords="RashBhar Mining, Mineral Exploration, Iron Ore Mining, Coal Concessions, Natural Resources India, Mining Odisha Jharkhand"
        image="https://www.rashtrabharosagroup.com/assets/mining.jpg"
        url="https://www.rashtrabharosagroup.com/ventures/mining"
        schema={miningSchema}
      />

      {/* Hero Section with Cinematic Video */}
      <section className="relative pt-44 pb-12 lg:pt-56 lg:pb-16 overflow-hidden flex items-end min-h-[460px] lg:min-h-[500px] bg-[#041633]">
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent z-0 pointer-events-none"></div>

        <div className="max-w-[1500px] w-full mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
          <div className="max-w-5xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-black/50 text-brand-gold border border-white/20 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse"></span>
              <span>Mining & Mineral Resources Platform • Rashtra Bharosa Group</span>
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
                  RashBhar Mining Corporation
                </h1>
                <p className="text-sm sm:text-base font-semibold text-slate-200 uppercase tracking-widest mt-1">
                  Mining, Reimagined for a More Productive India • Acquire. Transform. Operate. Deliver.
                </p>
              </div>
            </div>

            {/* Quick Hero CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Button asChild className="btn-primary px-6 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg">
                <Link to="/ventures/mining/leadership">
                  Mining Leadership <ArrowRight size={13} className="ml-1.5" />
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

      {/* Persistent Sub-Navigation */}
      <VentureSubnav basePath="/ventures/mining" companyName="RashBhar Mining" logo={miningLogo} />

      {/* Main Corporate Editorial Content */}
      <main className="py-14 lg:py-20 bg-white">
        <div className="max-w-[1500px] w-full mx-auto px-4 sm:px-8 lg:px-12 space-y-20">
          
          {/* Section 1: Executive Overview & Strategic Genesis */}
          <div className="space-y-8">
            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-widest text-[#062B63]">
                Corporate Mineral Profile • Strategic Asset Development
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight uppercase leading-tight">
                Modern Mining Through Asset Transformation & Technology
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 text-base sm:text-lg leading-relaxed text-slate-700">
              <div className="space-y-5">
                <p className="text-lg sm:text-xl text-slate-900 font-medium leading-relaxed">
                  <strong>RashBhar Mining Corporation</strong> is the mining and mineral resources arm of <strong>Rashtra Bharosa Group</strong>. We acquire, operate, and transform mineral assets with a clear objective: higher productive output, stronger safety, smarter technology, disciplined environmental management, and dependable mineral supply.
                </p>

                <p>
                  Established through the acquisition of <strong>Utkal Mining in Q3 2025</strong> and the development of a modern operating platform, RashBhar Mining operates across the full mineral lifecycle: <em>asset ownership, contract mining (MDO), mine modernization, downstream processing, and rapid freight dispatch</em>.
                </p>

                <p>
                  From high-grade iron ore in the Sundergarh belt of Odisha to strategic coal and lithium-bearing pegmatites in Jharkhand, we build a mining business designed not simply to extract resources, but to develop high-performing assets and resilient mining ecosystems.
                </p>
              </div>

              <div className="space-y-5">
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <span className="text-xs font-bold text-[#062B63] uppercase tracking-wider block">Operating Doctrine</span>
                  <p className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                    "Maximum Production. Safety First."
                  </p>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    Production matters. But production without safety is not operational excellence. No production target or commercial deadline justifies compromising worker, equipment, or community safety.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <span className="text-xs font-bold text-[#062B63] uppercase tracking-wider block">Environmental Principle</span>
                  <p className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                    "Maximum Output with Minimum Environmental Impact."
                  </p>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    Closed-loop water treatment (~60% recycling), Eco-Control Zone compliance, automated dust suppression, and progressive backfilling with topsoil conservation.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: 6-Stage Transformation Framework */}
          <div className="p-8 sm:p-12 rounded-3xl bg-[#041633] text-white space-y-8 shadow-2xl border border-white/10">
            <div className="max-w-3xl space-y-2">
              <div className="text-xs font-bold text-brand-gold uppercase tracking-widest">
                Our Operating Methodology
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight">
                The 6-Step Asset Transformation Model
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                A mine does not become efficient simply because ownership changes. RashBhar Mining applies a disciplined lifecycle sequence to unlock maximum recoverable value:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 pt-2">
              {[
                { step: "01", title: "Acquire", desc: "Select assets with credible mineral, operating, and long-term economic potential." },
                { step: "02", title: "Assess", desc: "Establish the operational baseline, 3D deposit mapping, and identify the performance gap." },
                { step: "03", title: "Modernize", desc: "Upgrade heavy machinery, mine systems, maintenance, telematics, and safety infrastructure." },
                { step: "04", title: "Expand", desc: "Scale bench extraction, expand pit boundaries, and integrate smart conveyor networks." },
                { step: "05", title: "Optimize", desc: "Refine beneficiation circuits, reduce cost per tonne, and establish closed-loop recycling." },
                { step: "06", title: "Operate", desc: "Build a disciplined, safe, and continuously improving mining operation for core industries." },
              ].map((item, index) => (
                <div key={index} className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-brand-gold/50 transition-colors space-y-2">
                  <span className="text-xs font-black text-brand-gold">{item.step}</span>
                  <h4 className="text-base font-bold text-white uppercase">{item.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{item.desc}</p>
                </div>
              ))}
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
                  To establish RashBhar Mining as a respected Indian mining enterprise with a diversified mineral portfolio, modern operating systems, strong industrial relationships, and a reputation for safe, technology-first, and responsible execution.
                </p>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  We define our growth not simply by the number of concessions we control, but by the operational quality, safety culture, environmental care, and community prosperity we create around every operating site.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-200 text-xs font-bold text-[#062B63] uppercase tracking-wider">
                Build Better Mines • Stronger Mining Regions
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
                    Operating Commitments
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight">
                    Our Mission
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  To acquire, transform, operate, and optimize mineral assets for maximum productive output, strict workforce safety, environmental stewardship, and dependable supply to India's industrial backbone:
                </p>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-[#062B63] shrink-0 mt-0.5" />
                    <span>Executing high-grade iron ore extraction (2.5–3 MTPA) in the Odisha Iron Ore Belt.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-[#062B63] shrink-0 mt-0.5" />
                    <span>Developing strategic coal and rare minerals (lithium-bearing pegmatites) in Jharkhand.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-[#062B63] shrink-0 mt-0.5" />
                    <span>Deploying AI-guided drilling, 3D deposit intelligence, and overland conveyor networks.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-[#062B63] shrink-0 mt-0.5" />
                    <span>Investing 10–20% of community welfare needs before commercial digging begins.</span>
                  </li>
                </ul>
              </div>
              <div className="pt-4 border-t border-slate-200 text-xs font-bold text-[#062B63] uppercase tracking-wider">
                Acquire • Transform • Operate • Deliver
              </div>
            </div>
          </div>

          {/* Section 4: Full-Width Institutional Media Banner */}
          <div className="w-full">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 aspect-[21/8] bg-slate-900">
              <img
                src={mineDumperPhoto3}
                alt="RashBhar Mining Heavy Fleet Haulage & High-Capacity Extraction"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none"></div>
              <div className="absolute bottom-6 left-8 text-white">
                <div className="text-xs font-bold text-brand-gold uppercase tracking-widest">
                  Mechanized Extraction & High-Tonnage Fleet Logistics
                </div>
                <div className="text-sm sm:text-base font-bold text-white uppercase tracking-wider mt-0.5">
                  Odisha Iron Ore Belt • Sundergarh Concession • Rapid Industrial Dispatch
                </div>
              </div>
            </div>
          </div>

          {/* Section 5: Comprehensive Core Values */}
          <div className="space-y-8 border-t border-slate-200 pt-12">
            <div className="max-w-3xl space-y-2">
              <div className="text-xs font-bold uppercase tracking-widest text-[#062B63]">
                Mining Principles
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase">
                Our Core Values
              </h2>
              <p className="text-sm text-slate-600">
                The institutional values governing mine safety, extraction efficiency, and community stewardship:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="text-lg font-black text-[#062B63] uppercase">Safety Discipline</h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  No production target justifies unsafe work. Enforcing DGMS procedures, automated equipment fatigue alerts, and rigorous emergency protocols.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="text-lg font-black text-[#062B63] uppercase">Environmental Stewardship</h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Maximum output with minimum environmental impact. Implementing closed-loop water treatment, Eco-Control Zones, and progressive botanical reclamation.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="text-lg font-black text-[#062B63] uppercase">Pre-Mining Community Commitment</h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Addressing 10% to 20% of local community welfare needs (drinking water, healthcare, schools) before mining starts, with local employment prioritization.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="text-lg font-black text-[#062B63] uppercase">Applied Technology</h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Deploying AI-guided drilling, real-time fleet telematics, and 3D geological modeling to solve real operational bottlenecks.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="text-lg font-black text-[#062B63] uppercase">Industrial Reliability</h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Connecting extraction directly to primary steelmakers and energy hubs through multi-modal freight siding logistics and consistent ore grading.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="text-lg font-black text-[#062B63] uppercase">Statutory Governance</h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Treating regulatory coordination, environmental compliance, and transparent reporting as integral components of operational excellence.
                </p>
              </div>
            </div>
          </div>

          {/* Section 6: Section Navigation Actions */}
          <div className="border-t border-slate-200 pt-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-4">
              <Button asChild className="btn-primary px-7 py-3 text-xs font-bold uppercase tracking-wider rounded-xl shadow-sm">
                <Link to="/ventures/mining/leadership">
                  Mining Leadership <ArrowRight size={14} className="ml-2" />
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
              <span className="text-[11px] font-bold text-slate-500 uppercase block">Platform Acquisition</span>
              <span className="text-lg sm:text-xl font-black text-[#062B63]">Q3 2025 (Utkal Mining)</span>
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase block">Primary Geography</span>
              <span className="text-lg sm:text-xl font-black text-[#062B63]">Odisha & Jharkhand</span>
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase block">Business Model</span>
              <span className="text-lg sm:text-xl font-black text-[#062B63]">Asset Ownership + MDO</span>
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase block">Operating Principle</span>
              <span className="text-lg sm:text-xl font-black text-[#062B63]">Maximum Production. Safety First.</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MiningOverview;
