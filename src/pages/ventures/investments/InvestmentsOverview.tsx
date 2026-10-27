import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, TrendingUp, Building2, Cpu, Activity, Sprout, Compass, Eye, Target, CheckCircle2, Globe, Sparkles, Scale, Briefcase } from "lucide-react";
import VentureSubnav from "@/components/ventures/VentureSubnav";
import { Button } from "@/components/ui/button";

// Assets
import capitalVideo from "@/assets/VIDEOS/Partnerships, Alliances & Investments page.mp4";
import royalBirdsLogo from "@/assets/Subsidiary-logos/RoyalBirds.png";
import royalBirdsImg from "@/assets/royalbirds.png";

const royalBirdsNavItems = [
  { suffix: "", label: "Overview" },
  { suffix: "/leadership", label: "Leadership" },
];

const InvestmentsOverview: React.FC = () => {
  return (
    <div className="bg-white text-slate-900 font-sans antialiased min-h-screen selection:bg-[#062B63] selection:text-white">
      {/* Hero Section with Cinematic Background Video */}
      <section className="relative pt-44 pb-12 lg:pt-56 lg:pb-16 overflow-hidden flex items-end min-h-[460px] lg:min-h-[500px] bg-[#041633]">
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent z-0 pointer-events-none"></div>

        <div className="max-w-[1500px] w-full mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
          <div className="max-w-5xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-black/50 text-brand-gold border border-white/20 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse"></span>
              <span>Venture Capital & Strategic Holdings • Founded 2017 (Hong Kong)</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 pt-1">
              <div className="bg-white/95 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-white/40 shadow-2xl inline-flex items-center justify-center w-fit">
                <img
                  src={royalBirdsLogo}
                  alt="Royal Birds Group Logo"
                  className="h-16 sm:h-20 md:h-24 w-auto max-w-[280px] sm:max-w-[340px] object-contain"
                />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight drop-shadow-lg uppercase">
                  Royal Birds Group Limited
                </h1>
                <p className="text-sm sm:text-base font-semibold text-slate-200 uppercase tracking-widest mt-1">
                  Venture Capital • Strategic Investment • Enterprise Incubation
                </p>
              </div>
            </div>

            {/* Quick Hero CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Button asChild className="btn-primary px-6 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg">
                <Link to="/ventures/investments/leadership">
                  Leadership <ArrowRight size={13} className="ml-1.5" />
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
      <VentureSubnav basePath="/ventures/investments" companyName="Royal Birds Group" items={royalBirdsNavItems} />

      {/* Main Corporate Editorial Content */}
      <main className="py-14 lg:py-20 bg-white">
        <div className="max-w-[1500px] w-full mx-auto px-4 sm:px-8 lg:px-12 space-y-20">
          
          {/* Section 1: Executive Corporate Narrative & Genesis */}
          <div className="space-y-8">
            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-widest text-[#062B63]">
                Corporate Mandate • Founded in 2017
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight uppercase leading-tight">
                Venture Capital, Strategic Investment & Enterprise Incubation
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 text-base sm:text-lg leading-relaxed text-slate-700">
              <div className="space-y-5">
                <p className="text-lg sm:text-xl text-slate-900 font-medium leading-relaxed">
                  <strong>Royal Birds Group Limited (RBG)</strong> is a Hong Kong–registered venture capital and holding company founded in <strong>2017</strong> by <strong>Dr. Vedanshii Verma, Founder</strong>, and <strong>Mr. Subransu Mohanty, Co-Founder</strong>.
                </p>

                <p>
                  The company was established as a multi-sector investment platform focused on venture capital, strategic equity deployment, business development, and supporting high-growth emerging businesses. Rather than operating as a conventional product or service business, Royal Birds Group identifies, evaluates, funds, and scales capable entrepreneurs and high-conviction market opportunities.
                </p>

                <p>
                  In <strong>April 2026</strong>, Royal Birds Group was formally acquired and registered under <strong>Rashtra Bharosa Group Limited</strong>, establishing the dedicated venture-capital and strategic-holding platform of the Group under the <strong>RashBhar Capital</strong> umbrella.
                </p>
              </div>

              <div className="space-y-5">
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <h4 className="text-xs font-bold text-[#062B63] uppercase tracking-wider">Why Royal Birds Group Exists</h4>
                  <p className="text-sm sm:text-base font-semibold text-slate-900 leading-snug">
                    "Connecting capital, entrepreneurship, innovation and established industrial capability in a structured investment environment."
                  </p>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    Rather than chasing short-term market momentum, Royal Birds Group considers the underlying fundamentals of a business, its unit economics, defensibility, management depth, and long-term equity compounding potential.
                  </p>
                </div>

                <p>
                  Within the Rashtra Bharosa ecosystem, Royal Birds Group provides outward-looking venture capital and strategic investment capabilities, creating synergies between startup innovation and the Group's established physical infrastructure.
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: Multi-Sector Investment Focus Areas */}
          <div className="space-y-8">
            <div className="max-w-3xl space-y-2">
              <div className="text-xs font-bold uppercase tracking-widest text-[#062B63]">
                Allocation Strategy
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight uppercase">
                Six Core Investment Sectors
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Royal Birds Group deploys growth capital across high-conviction, scalable sectors shaping India and global markets:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#062B63] text-white flex items-center justify-center">
                  <Cpu size={20} />
                </div>
                <h4 className="text-lg font-black text-[#062B63] uppercase">Technology & AI</h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Enterprise software, automation platforms, sovereign AI models, robotics R&D, and digital intelligence architectures.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#062B63] text-white flex items-center justify-center">
                  <Building2 size={20} />
                </div>
                <h4 className="text-lg font-black text-[#062B63] uppercase">Infrastructure & Construction</h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Civil infrastructure, heavy engineering, port logistics corridors, railway siding assets, and construction technology.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#062B63] text-white flex items-center justify-center">
                  <Compass size={20} />
                </div>
                <h4 className="text-lg font-black text-[#062B63] uppercase">Real Estate & Urban Living</h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Master-planned residential communities, modern architectural landmarks, and technology-enabled commercial business parks.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#062B63] text-white flex items-center justify-center">
                  <TrendingUp size={20} />
                </div>
                <h4 className="text-lg font-black text-[#062B63] uppercase">Energy & Sustainability</h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Renewable power, battery energy storage, resource circularity, environmental remediation, and clean industrial technologies.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#062B63] text-white flex items-center justify-center">
                  <Activity size={20} />
                </div>
                <h4 className="text-lg font-black text-[#062B63] uppercase">Healthcare & HealthTech</h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Tertiary cardiovascular hospitals, specialized diagnostic chains, digital health platforms, and telemedicine networks.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#062B63] text-white flex items-center justify-center">
                  <Sprout size={20} />
                </div>
                <h4 className="text-lg font-black text-[#062B63] uppercase">Agriculture & AgriTech</h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Bio-polymer soil science, organized organic farming clusters, temperature-controlled cold chains, and farmer platforms.
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
                    Our Vision
                  </h3>
                </div>
                <p className="text-base sm:text-lg text-slate-800 font-semibold leading-snug">
                  To be a premier venture capital and strategic investment platform connecting capital, entrepreneurship, and innovation to build scalable, sustainable, and high-impact enterprises across India and global markets.
                </p>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  We seek to build a structured investment function capable of evaluating emerging technologies, supporting visionary entrepreneurs, and participating in high-capex assets that generate lasting economic and societal value.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-200 text-xs font-bold text-[#062B63] uppercase tracking-wider">
                Venture Capital & Holdings Mandate
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
                    Investment Commitments
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight">
                    Our Mission
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  To fund high-potential businesses and visionary founders by providing disciplined growth capital, active governance, and strategic ecosystem support:
                </p>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-[#062B63] shrink-0 mt-0.5" />
                    <span>Executing a structured 9-Stage Evaluation Lifecycle and 6-Pillar Due Diligence.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-[#062B63] shrink-0 mt-0.5" />
                    <span>Providing patient, milestone-linked capital tranches aligned with founder incentives.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-[#062B63] shrink-0 mt-0.5" />
                    <span>Connecting emerging technology with the Group's industrial and physical infrastructure.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-[#062B63] shrink-0 mt-0.5" />
                    <span>Maintaining international corporate governance and fiduciary oversight standards.</span>
                  </li>
                </ul>
              </div>
              <div className="pt-4 border-t border-slate-200 text-xs font-bold text-[#062B63] uppercase tracking-wider">
                Strategic Capital Deployment
              </div>
            </div>
          </div>

          {/* Section 4: Full-Width Institutional Media Banner */}
          <div className="w-full">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 aspect-[21/8] bg-slate-900">
              <img
                src={royalBirdsImg}
                alt="Royal Birds Group Limited Global Investment Mandate"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none"></div>
              <div className="absolute bottom-6 left-8 text-white">
                <div className="text-xs font-bold text-brand-gold uppercase tracking-widest">
                  Global Capital Deployment & Institutional Holdings
                </div>
                <div className="text-sm sm:text-base font-bold text-white uppercase tracking-wider mt-0.5">
                  Multi-Sector Venture Capital • Strategic Asset Holdings • Long-Term Equity Compounding
                </div>
              </div>
            </div>
          </div>

          {/* Section 5: Comprehensive Core Values */}
          <div className="space-y-8 border-t border-slate-200 pt-12">
            <div className="max-w-3xl space-y-2">
              <div className="text-xs font-bold uppercase tracking-widest text-[#062B63]">
                Investment Philosophy
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase">
                Our Core Values
              </h2>
              <p className="text-sm text-slate-600">
                The institutional principles governing capital allocation, due diligence, and portfolio governance:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="text-lg font-black text-[#062B63] uppercase">Disciplined Due Diligence</h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Executing rigorous, multi-stage forensic evaluation across market viability, unit economics, technology defensibility, and regulatory compliance.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="text-lg font-black text-[#062B63] uppercase">Founder-Centric Partnership</h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Partnering with capable entrepreneurs through active governance, strategic ecosystem access, and milestone-aligned patient capital.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="text-lg font-black text-[#062B63] uppercase">Long-Term Compounding</h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Prioritizing sustainable business models and durable equity growth over short-term market momentum or speculative valuation spikes.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="text-lg font-black text-[#062B63] uppercase">Institutional Integrity</h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Upholding fiduciary responsibility, transparent financial reporting, AML/KYC protocols, and high standards of board governance.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="text-lg font-black text-[#062B63] uppercase">Multi-Sector Synergy</h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Bridging startup technological breakthroughs with the Group's physical infrastructure across mining, construction, and healthcare.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="text-lg font-black text-[#062B63] uppercase">Responsible Capital</h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Deploying capital to foster productive economic capacity, technological self-reliance, and sustainable employment in Bharat and beyond.
                </p>
              </div>
            </div>
          </div>

          {/* Section 6: Section Navigation Actions */}
          <div className="border-t border-slate-200 pt-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-4">
              <Button asChild className="btn-primary px-7 py-3 text-xs font-bold uppercase tracking-wider rounded-xl shadow-sm">
                <Link to="/ventures/investments/leadership">
                  Leadership <ArrowRight size={14} className="ml-2" />
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
              <span className="text-[11px] font-bold text-slate-500 uppercase block">Inception</span>
              <span className="text-lg sm:text-xl font-black text-[#062B63]">2017 (Hong Kong)</span>
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase block">Founders</span>
              <span className="text-lg sm:text-xl font-black text-[#062B63]">Dr. Vedanshii Verma & Mr. Subransu Mohanty</span>
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase block">Primary Model</span>
              <span className="text-lg sm:text-xl font-black text-[#062B63]">Venture Capital & Holdings</span>
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase block">Group Integration</span>
              <span className="text-lg sm:text-xl font-black text-[#062B63]">April 2026 (RashBhar Capital)</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InvestmentsOverview;
