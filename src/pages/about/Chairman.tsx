import React from "react";
import AboutSubnav from "@/components/about/AboutSubnav";
import MetaTags from "@/components/MetaTags";

// Master Video & Assets
import odishaHeroVideo from "@/assets/VIDEOS/odisha-hero.mp4";
import chairmanImg from "@/assets/leadership/group/Vikramaditiya-abt.jpeg";
import chairmanSignImg from "@/assets/sign/chairman-sign.png";

const Chairman: React.FC = () => {
  const chairmanSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "mainEntity": {
      "@type": "Person",
      "name": "Vikramaditya Singh Rathore",
      "jobTitle": "Chairman of the Board",
      "worksFor": {
        "@type": "Organization",
        "name": "Rashtra Bharosa Group"
      }
    }
  };

  return (
    <div className="bg-[#FCFDFE] text-slate-900 font-sans antialiased min-h-screen selection:bg-[#041633] selection:text-white">
      <MetaTags
        title="Office of the Chairman — Vikramaditya Singh Rathore | Rashtra Bharosa Group"
        description="Fiduciary stewardship, long-term stakeholder governance, and board leadership from Vikramaditya Singh Rathore, Chairman of the Board of Rashtra Bharosa Group."
        keywords="Vikramaditya Singh Rathore, Chairman Vikramaditya Singh, Chairman Rashtra Bharosa Group, Board of Directors India, Corporate Governance"
        url="https://www.rashtrabharosagroup.com/about/chairman"
        type="profile"
        schema={chairmanSchema}
      />
      {/* 1. Full-Bleed Conglomerate Hero Section */}
      <section className="relative pt-44 pb-16 lg:pt-56 lg:pb-24 overflow-hidden flex items-end min-h-[460px] lg:min-h-[520px] bg-[#041633]">
        <div className="absolute inset-0 bg-gradient-to-t from-[#041633] via-[#041633]/65 to-transparent z-0 pointer-events-none" />

        <div className="max-w-[1500px] w-full mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
          <div className="max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2.5">
              <span className="w-6 h-[2px] bg-brand-gold" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-gold">
                Office of the Chairman
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-light tracking-tight text-white leading-tight">
              <strong className="font-semibold text-white">Vikramaditya Singh Rathore</strong>
            </h1>
            <p className="text-sm sm:text-base font-medium text-slate-200 uppercase tracking-[0.16em]">
              Chairman of the Board • Rashtra Bharosa Group
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
              src={chairmanImg}
              alt="Vikramaditya Singh Rathore, Chairman"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div className="space-y-1.5">
            <div className="text-xs font-bold uppercase tracking-[0.25em] text-brand-gold">
              Fiduciary Stewardship & Board Direction
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-[#041633]">
              Vikramaditya Singh Rathore
            </h2>
            <p className="text-sm sm:text-base text-slate-500 uppercase tracking-[0.16em]">
              Chairman of the Board • Rashtra Bharosa Group
            </p>
          </div>
        </div>

        {/* Full-Width Lead Editorial Pull-Quote */}
        <blockquote className="w-full font-serif italic text-2xl sm:text-3xl lg:text-4xl text-slate-800 leading-relaxed text-center py-10 border-y border-slate-200">
          “A growing conglomerate requires leaders who understand both the harsh realities of physical ground operations and the rigorous fiduciary discipline of board governance.”
        </blockquote>

        {/* Full-Width Narrative Chapter 1 */}
        <article className="w-full space-y-6 text-slate-700 text-base sm:text-lg lg:text-xl leading-relaxed">
          <div className="space-y-1">
            <span className="text-xs sm:text-sm font-mono font-bold text-brand-gold uppercase tracking-widest">Chapter 01</span>
            <h3 className="text-2xl sm:text-4xl lg:text-5xl font-serif text-[#041633] font-normal">
              From Operating Leadership to Group Chairmanship
            </h3>
          </div>
          <p>
            Vikramaditya Singh Rathore serves as the Chairman of Rashtra Bharosa Group, providing overarching strategic direction, capital stewardship, and high-assurance board oversight across the Group’s multi-sector industrial portfolio.
          </p>
          <p>
            Before his elevation to the Chairmanship in August 2026, he served as the Chief Executive Officer of RashBhar Mining (April 2025 – August 2026), spearheading the Group’s inaugural operational rollout and establishing the foundational ₹35 Cr mineral revenue baseline.
          </p>
          <p>
            His transition from subsidiary CEO to Group Chairman reflects the Group’s structured governance philosophy: elevating proven operational builders into institutional stewards who ensure that commercial growth is permanently anchored by corporate governance and statutory transparency.
          </p>
        </article>

        {/* Full-Width Narrative Chapter 2 */}
        <article className="w-full space-y-6 text-slate-700 text-base sm:text-lg lg:text-xl leading-relaxed pt-12 border-t border-slate-200">
          <div className="space-y-1">
            <span className="text-xs sm:text-sm font-mono font-bold text-brand-gold uppercase tracking-widest">Chapter 02</span>
            <h3 className="text-2xl sm:text-4xl lg:text-5xl font-serif text-[#041633] font-normal">
              Governance Philosophy & Institutional Oversight
            </h3>
          </div>
          <p>
            The governance architecture of Rashtra Bharosa draws a sharp, vital distinction between operational management and board stewardship. While executive leadership drives day-to-day project velocity, commercial delivery, and on-ground commissioning, the Office of the Chairman guarantees long-term institutional continuity, sovereign compliance, and multi-generational trust.
          </p>
          <p>
            Under his chairmanship, the Board exercises active oversight across six core institutional dimensions: enforcing statutory governance and ethical charters, safeguarding long-term capital allocation with strict zero-debt reliance, overseeing executive succession pipelines, mitigating systemic enterprise risk, fostering stakeholder confidence through transparent bilateral dialogues, and ensuring seamless strategic alignment across all seven operating subsidiaries.
          </p>
          <p>
            This disciplined separation of powers ensures that the conglomerate maintains the speed and agility of an entrepreneur-led enterprise while adhering to the highest standards of institutional oversight.
          </p>
        </article>

        {/* Full-Width Formal Attestation & Signature Block */}
        <div className="w-full pt-14 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-3">
            <img
              src={chairmanSignImg}
              alt="Vikramaditya Singh Rathore Signature"
              className="h-14 w-auto object-contain mix-blend-multiply opacity-90"
            />
            <div>
              <div className="font-serif font-semibold text-xl text-[#041633]">Vikramaditya Singh Rathore</div>
              <div className="text-xs sm:text-sm text-slate-500 uppercase tracking-wider">Chairman of the Board • Rashtra Bharosa Group</div>
            </div>
          </div>
          <div className="text-xs sm:text-sm font-medium uppercase tracking-[0.16em] text-slate-600 bg-slate-50 px-6 py-3.5 rounded-xl border border-slate-200 shrink-0">
            Office of the Chairman • Bhubaneswar HQ
          </div>
        </div>
      </main>
    </div>
  );
};

export default Chairman;
