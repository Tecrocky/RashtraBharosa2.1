import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, ShieldCheck, TrendingUp, Award, Building2 } from "lucide-react";
import AboutSubnav from "@/components/about/AboutSubnav";
import { Button } from "@/components/ui/button";
import MetaTags from "@/components/MetaTags";

// Master Video
import odishaHeroVideo from "@/assets/VIDEOS/odisha-hero.mp4";

// Authentic Corporate Photography (4 Selected Official Executive Photographs)
import founderSigningImg from "@/assets/highlights/photos/founder-document-signing.jpeg";
import founderCeoStrategyImg from "@/assets/highlights/photos/founder-group-ceo-strategy-meeting.jpeg";
import groupLeadersImg from "@/assets/highlights/photos/group leaders.jpeg";
import groupCeoChairmanImg from "@/assets/highlights/photos/group-ceo-chairman-meeting.jpeg";

const GroupProfile: React.FC = () => {
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "mainEntity": {
      "@type": "Organization",
      "name": "Rashtra Bharosa Group",
      "alternateName": "Rashtra Bharosa",
      "legalName": "Rashtra Bharosa Group Limited",
      "foundingDate": "2025-04-18",
      "foundingLocation": {
        "@type": "Place",
        "name": "Bhubaneswar, Odisha, India"
      },
      "founder": {
        "@type": "Person",
        "name": "Subransu Mohanty"
      },
      "url": "https://www.rashtrabharosagroup.com/about",
      "description": "Rashtra Bharosa Group was founded on 18 April 2025 and statutorily incorporated on 09 July 2025 in Bhubaneswar, Odisha. It is a diversified Indian industrial conglomerate operating across Mining, Heavy EPC, Healthcare, Technology, Agriculture, Real Estate, and Strategic Investments."
    }
  };

  return (
    <div className="bg-[#FCFDFE] text-slate-900 font-sans antialiased min-h-screen selection:bg-[#041633] selection:text-white">
      <MetaTags
        title="Group Overview & Corporate Profile | Rashtra Bharosa Group"
        description="Founded on 18 April 2025 and incorporated on 09 July 2025 in Bhubaneswar, Odisha. Discover the institutional mandate, heritage, and nation-building vision of Rashtra Bharosa Group."
        keywords="About Rashtra Bharosa Group, Founding Date 18 April 2025, Incorporated 09 July 2025, Subransu Mohanty, Corporate Profile, Indian Industrial Conglomerate, Sovereign Growth Bharat, Group Overview"
        url="https://www.rashtrabharosagroup.com/about"
        schema={aboutSchema}
      />

      {/* 1. Hero Section with Background Video & Indian Corporate Visual Imagery */}
      <section className="relative pt-44 pb-16 lg:pt-56 lg:pb-24 overflow-hidden flex items-end min-h-[460px] lg:min-h-[520px] bg-[#041633]">
        {/* Background Image: Indian Modern Corporate Headquarters Architecture */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1698822457446-ac18737a2ac4?auto=format&fit=crop&w=2000&q=80"
            alt="Rashtra Bharosa Corporate Architecture"
            className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#041633] via-[#041633]/85 to-[#041633]/60 z-0 pointer-events-none" />

        <div className="max-w-[1500px] w-full mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
          <div className="max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2.5">
              <span className="w-6 h-[2px] bg-brand-gold" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-gold">
                Official Institutional Charter
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-light tracking-tight text-white leading-tight">
              Corporate Profile & <strong className="font-semibold text-white">Institutional Identity</strong>
            </h1>
            <p className="text-sm sm:text-base font-medium text-slate-200 uppercase tracking-[0.16em]">
              Rooted in Trust • Rising with Bharat
            </p>
          </div>
        </div>
      </section>

      {/* Sticky Sub-Navigation */}
      <AboutSubnav />

      {/* Editorial Narrative Chapters */}
      <main className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 py-16 lg:py-24 space-y-24">
        
        {/* Chapter 1: Genesis & Institutional Foundation */}
        <article className="space-y-10">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2">
              <span className="w-5 h-[2px] bg-brand-gold" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#041633]">
                Chapter 01 • Institutional Genesis & Foundation
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-[#041633] tracking-tight">
              About <strong className="font-semibold">Rashtra Bharosa Group</strong>
            </h2>
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 aspect-[16/9] lg:aspect-[21/9] bg-slate-900 group">
            <img
              src={founderSigningImg}
              alt="Subransu Mohanty executing official corporate charter and acquisition agreements"
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
              <div className="text-xs font-semibold text-brand-gold uppercase tracking-wider">
                Corporate Foundation & Legal Charter Execution • Bhubaneswar Headquarters
              </div>
              <div className="text-sm text-slate-200 font-light hidden sm:block">
                Founded on 18 April 2025 • Statutorily Incorporated on 09 July 2025
              </div>
            </div>
          </div>

          {/* Quick Corporate Metadata Badges for Google Crawlers & Readers */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
            <div className="space-y-1 border-r border-slate-100 last:border-0 pr-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Founding Date</span>
              <p className="text-sm font-bold text-[#041633]">18 April 2025</p>
            </div>
            <div className="space-y-1 border-r border-slate-100 last:border-0 pr-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Incorporation Date</span>
              <p className="text-sm font-bold text-[#041633]">09 July 2025</p>
            </div>
            <div className="space-y-1 border-r border-slate-100 last:border-0 pr-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Founder & Promoter</span>
              <p className="text-sm font-bold text-[#041633]">Subransu Mohanty</p>
            </div>
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Headquarters</span>
              <p className="text-sm font-bold text-[#041633]">Bhubaneswar, Odisha</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-slate-700 text-base sm:text-lg leading-relaxed">
            <div className="lg:col-span-12 font-serif text-xl sm:text-2xl text-slate-900 font-light leading-relaxed border-l-2 border-brand-gold pl-6 py-1 italic">
              “Trust is the foundation of every enduring institution, integrity is non-negotiable, growth must be responsible, and business should create value that extends far beyond financial returns.”
            </div>
            <div className="lg:col-span-6 space-y-4">
              <p>
                <strong>Rashtra Bharosa Group</strong> is a purpose-driven Indian industrial conglomerate headquartered in Bhubaneswar, Odisha. Founded by industrialist <strong>Subransu Mohanty</strong> on <strong>18 April 2025</strong> and statutorily incorporated on <strong>09 July 2025</strong>, the Group was conceived not merely as a commercial enterprise, but as an enduring national institution capable of building sovereign capabilities, generating productive employment, and compounding patient capital across foundational sectors.
              </p>
              <p>
                The Group’s corporate identity is anchored in the guiding ethos <span className="text-[#041633] font-semibold">“Rooted in Trust, Rising with Bharat,”</span> reflecting the conviction that commercial vitality and national development can mutually reinforce one another when enterprise is built upon operational precision, fiduciary discipline, and absolute integrity.
              </p>
            </div>
            <div className="lg:col-span-6 space-y-4">
              <p>
                Operating across seven integrated verticals—natural resources, heavy civil infrastructure, tertiary healthcare, sovereign artificial intelligence, precision agriculture, sustainable real estate, and strategic growth capital—the Group maintains a conservative, debt-free capital architecture designed to withstand global commodity and macroeconomic cycles.
              </p>
              <p>
                Following its legal incorporation, the Group’s documented operational history formally commenced with its inaugural operating charter period from <strong>12 August 2025 to 12 August 2026</strong>, marking the structured transition from an entrepreneurial foundation to an institutionally governed corporate conglomerate.
              </p>
            </div>
          </div>
        </article>

        {/* Chapter 2: Leadership & Governance System */}
        <article className="space-y-10 pt-8 border-t border-slate-200">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2">
              <span className="w-5 h-[2px] bg-brand-gold" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#041633]">
                Chapter 02 • Executive Governance & Command
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-[#041633] tracking-tight">
              Leadership System & <strong className="font-semibold">Fiduciary Stewardship</strong>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-5 text-slate-700 text-base sm:text-lg leading-relaxed">
              <p>
                The executive leadership framework of Rashtra Bharosa Group deliberately bifurcates long-term vision, institutional oversight, and operational command to secure uncompromising fiduciary standards:
              </p>
              <ul className="space-y-3 text-base">
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-brand-gold shrink-0 mt-1" />
                  <span><strong>Subransu Mohanty (Founder & Executive Director)</strong>: Founding promoter and principal owner, directly anchoring physical asset development, natural resource concessions, and multi-vertical expansion.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-brand-gold shrink-0 mt-1" />
                  <span><strong>Vikramaditiya Singh Rathore (Chairman of the Board)</strong>: Elevating conglomerate-wide board governance, regulatory integrity, and capital allocation mandates.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-brand-gold shrink-0 mt-1" />
                  <span><strong>Prinseesh Yashraj Pratap (Group Chief Executive Officer)</strong>: Spearheading centralized executive command across the seven subsidiary operating verticals.</span>
                </li>
              </ul>
              <div className="pt-2">
                <Button asChild className="bg-[#041633] hover:bg-[#093d8f] text-white px-7 py-3 text-xs font-bold uppercase tracking-wider rounded-md shadow-md">
                  <Link to="/about/leadership">
                    Explore Leadership Directory <ArrowRight size={14} className="ml-1.5" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 aspect-[4/3] bg-slate-100 group">
                <img
                  src={founderCeoStrategyImg}
                  alt="Founder Subransu Mohanty and Group CEO Prinseesh Yashraj Pratap in executive strategic review"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-6 right-6 text-white space-y-1">
                  <div className="text-sm font-bold text-white">Subransu Mohanty & Prinseesh Yashraj Pratap</div>
                  <div className="text-xs text-brand-gold font-medium">Executive Strategy & Operating Review • Corporate Command</div>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Chapter 3: Institutional Triumvirate & Conglomerate Leadership */}
        <article className="space-y-10 pt-8 border-t border-slate-200">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2">
              <span className="w-5 h-[2px] bg-brand-gold" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#041633]">
                Chapter 03 • The Leadership Triumvirate
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-[#041633] tracking-tight">
              Shared Conviction & <strong className="font-semibold">Institutional Stability</strong>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 lg:order-2 space-y-5 text-slate-700 text-base sm:text-lg leading-relaxed">
              <p>
                The enduring resilience of Rashtra Bharosa Group stems from cohesive executive unity across key strategic pillars. The leadership triumvirate—uniting the Founder, Chairman, and Group CEO—embodies a balance of entrepreneurial boldness and institutional prudence.
              </p>
              <div className="space-y-3 text-sm">
                <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#041633]">01. Sovereign Capital Compounding</span>
                  <p className="text-slate-600">Reinvesting internal operating accruals into high-barrier industrial infrastructure and sovereign AI compute.</p>
                </div>
                <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#041633]">02. Cross-Subsidiary Synergy</span>
                  <p className="text-slate-600">Aligning raw material extraction, logistics, heavy EPC construction, and regional healthcare under one integrated umbrella.</p>
                </div>
                <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#041633]">03. Generational Governance</span>
                  <p className="text-slate-600">Instituting compliance, audit systems, and fiduciary protocols designed to outlast individual market cycles.</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 aspect-[4/3] bg-slate-100 group">
                <img
                  src={groupLeadersImg}
                  alt="Rashtra Bharosa Group Executive Leadership Triumvirate"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-6 right-6 text-white space-y-1">
                  <div className="text-sm font-bold text-white">Rashtra Bharosa Group Executive Triumvirate</div>
                  <div className="text-xs text-brand-gold font-medium">
                    Corporate Stewardship, Board Oversight & Operational Command
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Chapter 4: Financial Strength & Milestone Performance Dossier */}
        <article className="space-y-10 pt-8 border-t border-slate-200">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2">
              <span className="w-5 h-[2px] bg-brand-gold" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#041633]">
                Chapter 04 • Financial Stewardship
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-[#041633] tracking-tight">
              Purposeful Profitability & <strong className="font-semibold">Zero-Debt Architecture</strong>
            </h2>
          </div>

          <p className="text-slate-700 text-base sm:text-lg leading-relaxed">
            Rashtra Bharosa maintains a strict policy of purposeful profitability: growth without compromising safety, sustainable operating cash flows, and absolute equity discipline with zero unhedged debt reliance across inaugural operations. In its very first year of full commercial operations (FY 2025–2026), the Group achieved historic consolidated revenue benchmarks driven by foundational natural resources and heavy civil engineering execution.
          </p>

          {/* Financial Highlights Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4">
            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-1">
              <div className="text-2xl sm:text-3xl font-mono font-bold text-[#041633]">₹50.00 Cr</div>
              <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                First-Year Revenue • FY 2025–2026
              </div>
            </div>
            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-1">
              <div className="text-2xl sm:text-3xl font-mono font-bold text-[#041633]">₹12.50 Cr</div>
              <div className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider">
                First Quarter Revenue • Q1 FY26
              </div>
            </div>
            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-1">
              <div className="text-2xl sm:text-3xl font-mono font-bold text-[#041633]">₹8.70 Cr</div>
              <div className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider">
                Operating EBITDA (17.40%)
              </div>
            </div>
            <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-1">
              <div className="text-2xl sm:text-3xl font-mono font-bold text-emerald-800">₹0.00 Cr</div>
              <div className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">
                Zero External Debt
              </div>
            </div>
          </div>
        </article>

        {/* Chapter 5: Operational Governance & Field Inspection */}
        <article className="space-y-10 pt-8 border-t border-slate-200">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2">
              <span className="w-5 h-[2px] bg-brand-gold" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#041633]">
                Chapter 05 • Operational Governance
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-[#041633] tracking-tight">
              On-Ground Inspection & <strong className="font-semibold">Project Delivery</strong>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-5 text-slate-700 text-base sm:text-lg leading-relaxed">
              <p>
                Fiduciary governance at Rashtra Bharosa is not confined to boardroom deliberations—it extends directly to project sites, operational perimeters, and field facilities. Senior leadership conducts rigorous on-site project reviews to ensure statutory compliance, environmental safeguards, and engineering precision.
              </p>
              <p>
                From heavy civil infrastructure corridors to specialized mining concessions, our structured field inspections maintain quality benchmarks and accelerate milestone delivery across Eastern India.
              </p>
              <div className="pt-2">
                <Button asChild variant="outline" className="text-xs font-bold uppercase tracking-wider text-[#041633] border-slate-300">
                  <Link to="/about/governance">
                    View Corporate Governance Charter <ArrowRight size={14} className="ml-1.5" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 aspect-[4/3] bg-slate-100 group">
                <img
                  src={groupCeoChairmanImg}
                  alt="Chairman of the Board and Group CEO conducting executive field project inspection"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-6 right-6 text-white space-y-1">
                  <div className="text-sm font-bold text-white">Board & Executive Field Inspection</div>
                  <div className="text-xs text-brand-gold font-medium uppercase tracking-wider">
                    Infrastructure Corridor & On-Site Operating Audit
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </main>

      {/* Concluding Institutional Declaration (White Background with Black Typography & Gold Accent) */}
      <section className="py-20 lg:py-28 bg-white border-t border-slate-200 text-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-slate-100 text-[#041633] border border-slate-200">
            <span className="w-2 h-2 rounded-full bg-brand-gold" />
            <span>The Rashtra Bharosa Group Charter</span>
          </div>

          <blockquote className="text-2xl sm:text-3xl lg:text-4xl font-serif font-light text-[#041633] leading-relaxed italic">
            “Rashtra Bharosa exists to build a trusted, capable and enduring institution that creates sustainable economic value, develops people and capabilities, enables responsible progress and contributes meaningfully to the future of Bharat.”
          </blockquote>

          <div className="pt-4 space-y-2">
            <div className="text-xl sm:text-2xl font-serif font-bold text-[#041633] tracking-wide">
              Rooted in Trust • Rising with Bharat
            </div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Bhubaneswar Headquarters • Odisha, Bharat
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GroupProfile;
