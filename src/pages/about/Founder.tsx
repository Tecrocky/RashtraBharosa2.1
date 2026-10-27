import React from "react";
import AboutSubnav from "@/components/about/AboutSubnav";
import MetaTags from "@/components/MetaTags";

// Master Video & Assets
import odishaHeroVideo from "@/assets/VIDEOS/odisha-hero.mp4";
import founderImg from "@/assets/leadership/group/Subransu-abt.jpeg";
import founderSignImg from "@/assets/sign/founder-sign.png";

const Founder: React.FC = () => {
  const founderSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "mainEntity": {
      "@type": "Person",
      "name": "Subransu Mohanty",
      "jobTitle": "Founder & Promoter",
      "worksFor": {
        "@type": "Organization",
        "name": "Rashtra Bharosa Group"
      }
    }
  };

  return (
    <div className="bg-[#FCFDFE] text-slate-900 font-sans antialiased min-h-screen selection:bg-[#041633] selection:text-white">
      <MetaTags
        title="Office of the Founder — Subransu Mohanty (Krishna Shumati) | Rashtra Bharosa Group"
        description="Vision, leadership philosophy, and institutional genesis from the Founder & Promoter of Rashtra Bharosa Group, Subransu Mohanty (Krishna Shumati). Executive Director – Mining & Infrastructure."
        keywords="Subransu Mohanty, Krishna Shumati, Subransu Mohanty Founder, Founder Rashtra Bharosa Group, Promoter Vision, Indian Industrial Leader, Rashtra Bharosa Promoter, Odisha Industrialist"
        url="https://www.rashtrabharosagroup.com/about/founder"
        type="profile"
        schema={founderSchema}
      />
      {/* 1. Full-Bleed Conglomerate Hero Section */}
      <section className="relative pt-44 pb-16 lg:pt-56 lg:pb-24 overflow-hidden flex items-end min-h-[460px] lg:min-h-[520px] bg-[#041633]">
        <div className="absolute inset-0 bg-gradient-to-t from-[#041633] via-[#041633]/65 to-transparent z-0 pointer-events-none" />

        <div className="max-w-[1500px] w-full mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
          <div className="max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2.5">
              <span className="w-6 h-[2px] bg-brand-gold" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-gold">
                Office of the Founder
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-light tracking-tight text-white leading-tight">
              <strong className="font-semibold text-white">Subransu Mohanty</strong>
            </h1>
            <p className="text-sm sm:text-base font-medium text-slate-200 uppercase tracking-[0.16em]">
              Executive Director – Mining & Infrastructure • Founder & Promoter, Rashtra Bharosa Group
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
              src={founderImg}
              alt="Subransu Mohanty, Founder & Executive Director"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div className="space-y-1.5">
            <div className="text-xs font-bold uppercase tracking-[0.25em] text-brand-gold">
              Founder & Promoter
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-[#041633]">
              Subransu Mohanty
            </h2>
            <p className="text-sm sm:text-base text-slate-500 uppercase tracking-[0.16em]">
              Executive Director – Mining & Infrastructure • Rashtra Bharosa Group
            </p>
          </div>
        </div>

        {/* Full-Width Lead Editorial Pull-Quote */}
        <blockquote className="w-full font-serif italic text-2xl sm:text-3xl lg:text-4xl text-slate-800 leading-relaxed text-center py-10 border-y border-slate-200">
          “Business can create financial wealth, but an enduring institution must create sovereign capability, local opportunity, and long-term societal progress.”
        </blockquote>

        {/* Full-Width Narrative Chapter 1 */}
        <article className="w-full space-y-6 text-slate-700 text-base sm:text-lg lg:text-xl leading-relaxed">
          <div className="space-y-1">
            <span className="text-xs sm:text-sm font-mono font-bold text-brand-gold uppercase tracking-widest">Chapter 01</span>
            <h3 className="text-2xl sm:text-4xl lg:text-5xl font-serif text-[#041633] font-normal">
              The Founder Behind Rashtra Bharosa
            </h3>
          </div>
          <p>
            Subransu Mohanty is the Founder and Promoter of Rashtra Bharosa Group and currently serves as Executive Director – Mining & Infrastructure.
          </p>
          <p>
            He established Rashtra Bharosa with a distinct conviction that transcended conventional short-term commercial trading. His mission was to build an integrated, multi-sector industrial conglomerate capable of catalyzing the industrial trajectory of Odisha, strengthening Eastern India’s core infrastructure backbone, and generating multi-generational opportunities for communities and local enterprises.
          </p>
          <p>
            For Subransu Mohanty, enterprise profitability and regional development are indivisible. A company must maintain disciplined operating cash flows, robust margins, and zero unhedged debt to remain sovereign and resilient across cycles. But alongside balance sheet strength, it must create durable value for its people, local suppliers, and the broader economic fabric.
          </p>
        </article>

        {/* Full-Width Narrative Chapter 2 */}
        <article className="w-full space-y-6 text-slate-700 text-base sm:text-lg lg:text-xl leading-relaxed pt-12 border-t border-slate-200">
          <div className="space-y-1">
            <span className="text-xs sm:text-sm font-mono font-bold text-brand-gold uppercase tracking-widest">Chapter 02</span>
            <h3 className="text-2xl sm:text-4xl lg:text-5xl font-serif text-[#041633] font-normal">
              The Thesis of Enterprise & Integrated Scale
            </h3>
          </div>
          <p>
            The foundational premise behind Rashtra Bharosa rests upon a clear industrial thesis: India’s rising economy requires patient capital deployed into physical asset creation rather than speculative cycles.
          </p>
          <p>
            Rather than pursuing disparate businesses, the Group was structured around four foundational disciplines: acquiring structural natural resource capability, integrating heavy EPC engineering with specialized logistics, modernizing traditional sectors through sovereign deep-tech and artificial intelligence, and scaling generational value with zero unhedged debt reliance.
          </p>
          <p>
            This integrated architecture connects natural resource operations directly with heavy civil engineering, super-specialty tertiary healthcare, high-yield agrarian processing, and indigenous computational systems, ensuring that every subsidiary reinforces the balance sheet and operational efficiency of the entire conglomerate.
          </p>
        </article>

        {/* Full-Width Narrative Chapter 3 */}
        <article className="w-full space-y-6 text-slate-700 text-base sm:text-lg lg:text-xl leading-relaxed pt-12 border-t border-slate-200">
          <div className="space-y-1">
            <span className="text-xs sm:text-sm font-mono font-bold text-brand-gold uppercase tracking-widest">Chapter 03</span>
            <h3 className="text-2xl sm:text-4xl lg:text-5xl font-serif text-[#041633] font-normal">
              A Commitment Rooted in Odisha & Eastern India
            </h3>
          </div>
          <p>
            At the core of the Founder’s geographic commitment is Odisha. He envisions the state not as a mere resource corridor, but as a premier advanced industrial power in South Asia.
          </p>
          <p>
            However, industrialization without community empowerment is fundamentally incomplete. Subransu Mohanty’s approach ensures that every new quarry, plant, hospital, or agrarian project creates localized employment, vendor contracts for indigenous micro-enterprises, and sustainable community prosperity across Keonjhar, Sundargarh, and beyond.
          </p>
        </article>

        {/* Full-Width Formal Attestation & Signature Block */}
        <div className="w-full pt-14 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-3">
            <img
              src={founderSignImg}
              alt="Subransu Mohanty Signature"
              className="h-14 w-auto object-contain mix-blend-multiply opacity-90"
            />
            <div>
              <div className="font-serif font-semibold text-xl text-[#041633]">Subransu Mohanty</div>
              <div className="text-xs sm:text-sm text-slate-500 uppercase tracking-wider">Founder & Promoter • Rashtra Bharosa Group</div>
            </div>
          </div>
          <div className="text-xs sm:text-sm font-medium uppercase tracking-[0.16em] text-slate-600 bg-slate-50 px-6 py-3.5 rounded-xl border border-slate-200 shrink-0">
            Office of the Founder • Bhubaneswar HQ
          </div>
        </div>
      </main>
    </div>
  );
};

export default Founder;
