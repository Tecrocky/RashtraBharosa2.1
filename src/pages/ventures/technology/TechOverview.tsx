import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Cpu, Layers, Bot, ShieldCheck, Database, Terminal, Code, Eye, Target, Sparkles, CheckCircle2, Server, Network } from "lucide-react";
import VentureSubnav from "@/components/ventures/VentureSubnav";
import { Button } from "@/components/ui/button";

// Assets
import techVideo from "@/assets/VIDEOS/tech-background-RBG.mp4";
import techImg from "@/assets/technology.jpg";
import techLogo from "@/assets/Subsidiary-logos/technology-logo.png";
import hqImg from "@/assets/hq.jpeg";

const TechOverview: React.FC = () => {
  return (
    <div className="bg-white text-slate-900 font-sans antialiased min-h-screen selection:bg-[#062B63] selection:text-white">
      {/* Hero Section with Cinematic Background Video */}
      <section className="relative pt-44 pb-12 lg:pt-56 lg:pb-16 overflow-hidden flex items-end min-h-[460px] lg:min-h-[500px] bg-[#041633]">
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent z-0 pointer-events-none"></div>

        <div className="max-w-[1500px] w-full mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
          <div className="max-w-5xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-black/50 text-brand-gold border border-white/20 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse"></span>
              <span>Technology & Innovation Venture • Rashtra Bharosa Group</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 pt-1">
              <div className="bg-white/95 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-white/40 shadow-2xl inline-flex items-center justify-center w-fit">
                <img
                  src={techLogo}
                  alt="RashBhar Technology Logo"
                  className="h-16 sm:h-20 md:h-24 w-auto max-w-[280px] sm:max-w-[340px] object-contain"
                />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight drop-shadow-lg uppercase">
                  RashBhar Technology
                </h1>
                <p className="text-sm sm:text-base font-semibold text-slate-200 uppercase tracking-widest mt-1">
                  Enterprise Software • Artificial Intelligence • Advanced Robotics R&D
                </p>
              </div>
            </div>

            {/* Quick Hero CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Button asChild className="btn-primary px-6 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg">
                <Link to="/ventures/technology/leadership">
                  Technology Leadership <ArrowRight size={13} className="ml-1.5" />
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
      <VentureSubnav basePath="/ventures/technology" companyName="RashBhar Technology" logo={techLogo} />

      {/* Main Corporate Editorial Content */}
      <main className="py-14 lg:py-20 bg-white">
        <div className="max-w-[1500px] w-full mx-auto px-4 sm:px-8 lg:px-12 space-y-20">
          
          {/* Section 1: Executive Corporate Narrative & Evolution */}
          <div className="space-y-8">
            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-widest text-[#062B63]">
                Corporate Overview & Strategic Evolution
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight uppercase leading-tight">
                Practical, Intelligent & Future-Ready Technology Platforms
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 text-base sm:text-lg leading-relaxed text-slate-700">
              <div className="space-y-5">
                <p className="text-lg sm:text-xl text-slate-900 font-medium leading-relaxed">
                  <strong>RashBhar Technology</strong> is the technology and innovation venture of <strong>Rashtra Bharosa Group</strong>, focused on building practical, intelligent, and future-ready technology solutions for enterprises and heavy industries.
                </p>

                <p>
                  Previously known as <strong>IndiaNova Tech</strong>, the enterprise has evolved into RashBhar Technology as part of the Group's broader technology and deep-tech innovation roadmap.
                </p>

                <p>
                  The company brings together custom B2B enterprise software, digital transformation architectures, artificial intelligence platforms, automated workflows, and advanced robotics research under one cohesive technology umbrella.
                </p>
              </div>

              <div className="space-y-5">
                <p>
                  Businesses today generate vast amounts of operational data, yet information frequently remains trapped in departmental silos, manual spreadsheets, and disconnected field workflows.
                </p>

                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-xs font-bold text-[#062B63] uppercase tracking-wider block mb-1">Guiding Doctrine</span>
                  <p className="text-sm sm:text-base font-semibold text-slate-900 italic">
                    "Technology should solve real problems, create measurable value, and become more useful as an organization grows."
                  </p>
                </div>

                <p>
                  By deploying intelligence directly into operational workflows, RashBhar Technology enables organizations to operate with complete visibility, deterministic control, and enhanced human productivity.
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: Three Foundational Technology Pillars */}
          <div className="space-y-8">
            <div className="max-w-3xl space-y-2">
              <div className="text-xs font-bold uppercase tracking-widest text-[#062B63]">
                Core Competencies
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight uppercase">
                The Three Strategic Technology Pillars
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                RashBhar Technology moves from foundational digital systems to intelligent agentic platforms and physical embodiment:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Pillar 1 */}
              <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#062B63] text-white flex items-center justify-center shadow-md">
                    <Layers size={24} />
                  </div>
                  <h3 className="text-xl font-black text-[#062B63] uppercase tracking-tight">01. Enterprise Technology</h3>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    Custom B2B business software, digital workflow automation, secure ERP bridges, and management dashboards tailored to operational realities.
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-200 text-xs font-bold text-[#062B63] uppercase tracking-wider">
                  Operational Systems
                </div>
              </div>

              {/* Pillar 2 */}
              <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#062B63] text-white flex items-center justify-center shadow-md">
                    <Cpu size={24} />
                  </div>
                  <h3 className="text-xl font-black text-[#062B63] uppercase tracking-tight">02. Artificial Intelligence (RashtrAI)</h3>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    Industry-specific AI workforce platform with initial deployment in mining and construction, automating telemetry processing, multi-agent dispatch, and vernacular communications.
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-200 text-xs font-bold text-[#062B63] uppercase tracking-wider">
                  Intelligent Agentic Workflows
                </div>
              </div>

              {/* Pillar 3 */}
              <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#062B63] text-white flex items-center justify-center shadow-md">
                    <Bot size={24} />
                  </div>
                  <h3 className="text-xl font-black text-[#062B63] uppercase tracking-tight">03. Advanced R&D (VED Ri)</h3>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    Virtual Embodied Device for Robotic Intelligence (VED Ri), exploring embodied spatial AI, edge robotics, and autonomous physical inspection in extreme environments.
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-200 text-xs font-bold text-[#062B63] uppercase tracking-wider">
                  Embodied Robotics R&D
                </div>
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
                  To develop RashBhar Technology into a recognized Indian technology company capable of building practical enterprise software, industry-specific AI platforms, and advanced intelligent technologies that improve how modern businesses operate.
                </p>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  We aim to bridge software intelligence with physical operations, fostering a technology ecosystem rooted in in-country data sovereignty, high engineering rigor, and scalable product architecture.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-200 text-xs font-bold text-[#062B63] uppercase tracking-wider">
                Sovereign Deep-Tech Capability
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
                    Engineering Commitments
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight">
                    Our Mission
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  Our mission is to engineer technology platforms that translate complex business operations into structured, automated, and intelligent systems:
                </p>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-[#062B63] shrink-0 mt-0.5" />
                    <span>Developing custom enterprise software aligned with real operating requirements.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-[#062B63] shrink-0 mt-0.5" />
                    <span>Deploying RashtrAI to create an intelligent digital workforce for heavy industries.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-[#062B63] shrink-0 mt-0.5" />
                    <span>Ensuring 100% in-country data localization and air-gapped sovereign security.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-[#062B63] shrink-0 mt-0.5" />
                    <span>Advancing VED Ri embodied robotics for high-hazard industrial inspection.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-[#062B63] shrink-0 mt-0.5" />
                    <span>Following the practical doctrine: <em>Build → Deploy → Learn → Improve → Scale</em>.</span>
                  </li>
                </ul>
              </div>
              <div className="pt-4 border-t border-slate-200 text-xs font-bold text-[#062B63] uppercase tracking-wider">
                Industrial Problem-Solving
              </div>
            </div>
          </div>

          {/* Section 4: Full-Width Institutional Media Banner */}
          <div className="w-full">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 aspect-[21/8] bg-slate-900">
              <img
                src={techImg}
                alt="RashBhar Technology Sovereign Infrastructure"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none"></div>
              <div className="absolute bottom-6 left-8 text-white">
                <div className="text-xs font-bold text-brand-gold uppercase tracking-widest">
                  Sovereign AI & Deep-Tech Infrastructure
                </div>
                <div className="text-sm sm:text-base font-bold text-white uppercase tracking-wider mt-0.5">
                  RashtrAI Industrial Intelligence • Air-Gapped Private Clusters • VED Ri Robotics R&D
                </div>
              </div>
            </div>
          </div>

          {/* Section 5: Comprehensive Core Values */}
          <div className="space-y-8 border-t border-slate-200 pt-12">
            <div className="max-w-3xl space-y-2">
              <div className="text-xs font-bold uppercase tracking-widest text-[#062B63]">
                Engineering Philosophy
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase">
                Our Core Values
              </h2>
              <p className="text-sm text-slate-600">
                The institutional values governing software architecture, AI safety, and product development:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="text-lg font-black text-[#062B63] uppercase">Practical Value First</h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Technology is valued for its ability to solve concrete operational problems, eliminate friction, and produce measurable commercial returns.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="text-lg font-black text-[#062B63] uppercase">Engineering Quality</h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Building stable, reliable, well-architected systems that function predictably in demanding industrial and high-concurrency environments.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="text-lg font-black text-[#062B63] uppercase">Problem-Centered Innovation</h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Pursuing research, AI, and robotics to address genuine operational constraints rather than deploying novelty technology for its own sake.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="text-lg font-black text-[#062B63] uppercase">Scalable Architecture</h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Designing platforms capable of expanding smoothly in user volume, data scale, and functional scope as client organizations grow.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="text-lg font-black text-[#062B63] uppercase">Data Sovereignty & Integrity</h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Maintaining zero foreign cloud dependency, strict data confidentiality, quantum-resistant encryption, and transparent AI governance.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="text-lg font-black text-[#062B63] uppercase">Long-Term Partnerships</h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Collaborating with enterprise customers through long-term support, continuous model tuning, and ongoing capability expansion.
                </p>
              </div>
            </div>
          </div>

          {/* Section 6: Section Navigation Actions */}
          <div className="border-t border-slate-200 pt-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-4">
              <Button asChild className="btn-primary px-7 py-3 text-xs font-bold uppercase tracking-wider rounded-xl shadow-sm">
                <Link to="/ventures/technology/leadership">
                  Technology Leadership <ArrowRight size={14} className="ml-2" />
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
              <span className="text-[11px] font-bold text-slate-500 uppercase block">Evolution</span>
              <span className="text-lg sm:text-xl font-black text-[#062B63]">IndiaNova Tech → RashBhar Tech</span>
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase block">Flagship Platform</span>
              <span className="text-lg sm:text-xl font-black text-[#062B63]">RashtrAI Workforce AI</span>
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase block">Advanced Robotics</span>
              <span className="text-lg sm:text-xl font-black text-[#062B63]">VED Ri (B3 Robotics)</span>
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase block">Security Protocol</span>
              <span className="text-lg sm:text-xl font-black text-[#062B63]">100% Sovereign Data Localization</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TechOverview;
