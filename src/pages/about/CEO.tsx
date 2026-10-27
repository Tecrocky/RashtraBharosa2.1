import React from "react";
import AboutSubnav from "@/components/about/AboutSubnav";
import MetaTags from "@/components/MetaTags";

// Master Video & Assets
import odishaHeroVideo from "@/assets/VIDEOS/odisha-hero.mp4";
import ceoImg from "@/assets/leadership/group/Prinseesh-abt.jpeg";
import ceoSignImg from "@/assets/sign/ceo-sign.png";

const CEO: React.FC = () => {
  const ceoSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "mainEntity": {
      "@type": "Person",
      "name": "Prinseesh Yashraj Pratap",
      "jobTitle": "Group Chief Executive Officer",
      "worksFor": {
        "@type": "Organization",
        "name": "Rashtra Bharosa Group"
      }
    }
  };

  return (
    <div className="bg-[#FCFDFE] text-slate-900 font-sans antialiased min-h-screen selection:bg-[#041633] selection:text-white">
      <MetaTags
        title="Office of the Group CEO — Prinseesh Yashraj Pratap | Rashtra Bharosa Group"
        description="Executive operational command, strategic project delivery, and cross-vertical synergy from Prinseesh Yashraj Pratap, Group CEO of Rashtra Bharosa Group."
        keywords="Prinseesh Yashraj Pratap, Group CEO Prinseesh, CEO Rashtra Bharosa Group, Chief Executive Officer, Industrial Leadership India"
        url="https://www.rashtrabharosagroup.com/about/ceo"
        type="profile"
        schema={ceoSchema}
      />
      {/* 1. Full-Bleed Conglomerate Hero Section */}
      <section className="relative pt-44 pb-16 lg:pt-56 lg:pb-24 overflow-hidden flex items-end min-h-[460px] lg:min-h-[520px] bg-[#041633]">
        <div className="absolute inset-0 bg-gradient-to-t from-[#041633] via-[#041633]/65 to-transparent z-0 pointer-events-none" />

        <div className="max-w-[1500px] w-full mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
          <div className="max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2.5">
              <span className="w-6 h-[2px] bg-brand-gold" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-gold">
                Office of the Group CEO
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-light tracking-tight text-white leading-tight">
              <strong className="font-semibold text-white">Prinseesh Yashraj Pratap</strong>
            </h1>
            <p className="text-sm sm:text-base font-medium text-slate-200 uppercase tracking-[0.16em]">
              Group Chief Executive Officer • Rashtra Bharosa Group
            </p>
          </div>
        </div>
      </section>

      {/* Sticky Sub-Navigation */}
      <AboutSubnav />

      {/* 2. Full-Screen Editorial Spread */}
      <main className="w-full max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-12 py-16 lg:py-24 space-y-16">
        
        {/* Centered Middle Section: Photo, Name & Role */}
        <div className="flex flex-col items-center text-center space-y-6 max-w-2xl mx-auto">
          <div className="w-full max-w-sm sm:max-w-md aspect-[4/5] rounded-2xl overflow-hidden shadow-xl border border-slate-200/90 bg-white">
            <img
              src={ceoImg}
              alt="Prinseesh Yashraj Pratap, Group CEO"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div className="space-y-1.5">
            <div className="text-xs font-bold uppercase tracking-[0.25em] text-brand-gold">
              Executive Command & Operations
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-[#041633]">
              Prinseesh Yashraj Pratap
            </h2>
            <p className="text-sm sm:text-base text-slate-500 uppercase tracking-[0.16em]">
              Group Chief Executive Officer • Rashtra Bharosa Group
            </p>
          </div>
        </div>

        {/* Full-Width Lead Editorial Pull-Quote */}
        <blockquote className="w-full font-serif italic text-2xl sm:text-3xl lg:text-4xl text-slate-800 leading-relaxed text-center py-10 border-y border-slate-200">
          “Ambition without structured operational execution is merely expensive stationery. Our responsibility is converting grand long-term vision into measurable, high-assurance industrial outcomes.”
        </blockquote>

        {/* Full-Width Narrative Chapter 1 */}
        <article className="w-full space-y-6 text-slate-700 text-base sm:text-lg lg:text-xl leading-relaxed">
          <div className="space-y-1">
            <span className="text-xs sm:text-sm font-mono font-bold text-brand-gold uppercase tracking-widest">Chapter 01</span>
            <h3 className="text-2xl sm:text-4xl lg:text-5xl font-serif text-[#041633] font-normal">
              Leading the Group as One Integrated Ecosystem
            </h3>
          </div>
          <p>
            Prinseesh Yashraj Pratap serves as the Group Chief Executive Officer of Rashtra Bharosa Group, steering central corporate command and synchronized execution from the Bhubaneswar national headquarters.
          </p>
          <p>
            As Group CEO, he is charged with translating the Group’s long-term institutional thesis into concrete on-ground milestones, ensuring that each operating subsidiary operates with rigorous commercial discipline, high statutory standards, and clear accountability across all regional and national operations.
          </p>
        </article>

        {/* Full-Width Narrative Chapter 2 */}
        <article className="w-full space-y-6 text-slate-700 text-base sm:text-lg lg:text-xl leading-relaxed pt-12 border-t border-slate-200">
          <div className="space-y-1">
            <span className="text-xs sm:text-sm font-mono font-bold text-brand-gold uppercase tracking-widest">Chapter 02</span>
            <h3 className="text-2xl sm:text-4xl lg:text-5xl font-serif text-[#041633] font-normal">
              The Triad of Command: Vision, Execution & Institution
            </h3>
          </div>
          <p>
            The operational model directed by the Office of the Group CEO is built upon three synchronized pillars: Strategic Vision, which defines national priority destinations across core infrastructure; Operational Execution, which enforces precision in project timelines, procurement velocity, and capital deployment; and Institutional Resilience, which builds scalable enterprise systems, executive depth, and compliance cultures that withstand market cycles.
          </p>
          <p>
            Under his leadership, central command unifies core conglomerate functions—driving cross-subsidiary supply chain synergies, deploying indigenous AI models and next-generation ERP platforms, enforcing strict zero-harm safety standards across extraction and civil sites, and cultivating elite executive talent pipelines for sustainable national expansion.
          </p>
        </article>

        {/* Full-Width Formal Attestation & Signature Block */}
        <div className="w-full pt-14 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-3">
            <img
              src={ceoSignImg}
              alt="Prinseesh Yashraj Pratap Signature"
              className="h-14 w-auto object-contain mix-blend-multiply opacity-90"
            />
            <div>
              <div className="font-serif font-semibold text-xl text-[#041633]">Prinseesh Yashraj Pratap</div>
              <div className="text-xs sm:text-sm text-slate-500 uppercase tracking-wider">Group Chief Executive Officer • Rashtra Bharosa Group</div>
            </div>
          </div>
          <div className="text-xs sm:text-sm font-medium uppercase tracking-[0.16em] text-slate-600 bg-slate-50 px-6 py-3.5 rounded-xl border border-slate-200 shrink-0">
            Office of the Group CEO • Bhubaneswar HQ
          </div>
        </div>
      </main>
    </div>
  );
};

export default CEO;
