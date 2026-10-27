import React, { useState, useEffect, useMemo } from "react";
import MetaTags from "@/components/MetaTags";

// Assets
import memorialPortrait from "@/assets/Her legacy/vedanshii ma'am memorial.png";
import corporatePortrait from "@/assets/Her legacy/vedanshii ma'am Corporate Picture.jpeg";
import graduationPhoto from "@/assets/Her legacy/Vedanshii mems graduation picture.avif";
import memoryPhoto from "@/assets/Her legacy/Her memory with us.jpeg";
import signatureImg from "@/assets/Her legacy/Vedanshii ma'am's signature.png";
import legacyVideo from "@/assets/Her legacy/vedanshi ma'am video.mp4";

const HerLegacy: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const slides = [
    {
      id: "career-education",
      badge: "ACADEMIC FOUNDATIONS & SCHOLARSHIP",
      title: "Intellectual Rigor & Spatial Philosophy",
      content: (
        <div className="space-y-5 text-slate-200 font-light text-base sm:text-lg leading-relaxed font-serif">
          <p>
            Dr. Vedanshii Verma’s foundational worldview was built on deep intellectual curiosity and architectural discipline, beginning her academic journey at <strong className="text-white font-medium">Amity International School</strong>.
          </p>
          <p>
            She earned her <strong className="text-white font-medium">Master of Architecture (MArch) at New York University Abu Dhabi (2017–2019)</strong>, where she honed a global design intellect and spatial mastery that would later inform the grand scale and structural precision of Rashtra Bharosa Group.
          </p>
          <p>
            Her pursuit of knowledge culminated in a <strong className="text-white font-medium">Doctor of Philosophy (PhD) in Industrial & Organisational Psychology from Banaras Hindu University (BHU, 2020–2024)</strong>. By uniting structural engineering with organisational human psychology, she established an institutional leadership style that placed human dignity at the center of large-scale enterprise.
          </p>
        </div>
      ),
      photo: graduationPhoto,
      photoAlt: "Dr. Vedanshii Verma Academic Convocation",
      photoCaption: "Academic Convocation & Research Milestone",
    },
    {
      id: "journey",
      badge: "EXECUTIVE STEWARDSHIP & ENTERPRISE",
      title: "Visionary Industry & Transnational Leadership",
      content: (
        <div className="space-y-5 text-slate-200 font-light text-base sm:text-lg leading-relaxed font-serif">
          <p>
            Her executive career was defined by hands-on operational mastery, strategic fearlessness, and long-horizon institutional planning. Stepping into industrial manufacturing as a <strong className="text-white font-medium">Manufacturing Supervisor at Verma Cement (2013)</strong>, she swiftly scaled to executive governance across <strong className="text-white font-medium">Verma Group Corporation Limited</strong>:
          </p>
          <ul className="space-y-2.5 border-l-2 border-[#C8A059]/60 pl-5 text-base text-slate-200 font-serif">
            <li><strong className="text-[#C8A059] font-mono text-sm">2014:</strong> Project Development Manager → Director of Operations</li>
            <li><strong className="text-[#C8A059] font-mono text-sm">2016 – 2023:</strong> Chief Executive Officer (CEO)</li>
            <li><strong className="text-[#C8A059] font-mono text-sm">2023 – 2025:</strong> Chairperson & Managing Director (CMD)</li>
          </ul>
          <p>
            In <strong className="text-white font-medium">March 2017</strong>, she incorporated <strong className="text-white font-medium">Royal Birds Group (Hong Kong SAR)</strong> as Founder & Non-Executive Chairperson, directing long-term cross-border strategic investments that remain a core pillar of the Group’s sovereign treasury.
          </p>
        </div>
      ),
      photo: corporatePortrait,
      photoAlt: "Dr. Vedanshii Verma Corporate Stewardship",
      photoCaption: "Executive Leadership & Strategic Direction",
    },
  ];

  // Automatic slide swipe interval (6 seconds)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isPaused, slides.length]);

  return (
    <div className="relative min-h-screen bg-[#030712] text-[#E4E2DD] font-sans antialiased selection:bg-[#C8A059] selection:text-black overflow-hidden">
      <MetaTags
        title="Her Legacy — In Loving Memory of Dr. Vedanshii Verma | Rashtra Bharosa Group"
        description="A solemn tribute to Dr. Vedanshii Verma (Founder, Royal Birds Group & Visionary Leader). Her ideals, compassion, and institutional blueprint guide every venture of Rashtra Bharosa Group."
        canonicalUrl="https://www.rashtrabharosagroup.com/her-legacy"
      />

      {/* Atmospheric Radial Shimmer */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-[#C8A059]/10 via-[#C8A059]/0 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* 1. TOP PORTRAIT & COMMEMORATIVE BANNER */}
      <section className="pt-36 pb-16 px-6 sm:px-8 max-w-4xl mx-auto text-center flex flex-col items-center relative z-10">
        {/* Memorial Portrait with Sacred Halo */}
        <div className="relative mb-8 group">
          <div className="absolute -inset-1.5 bg-gradient-to-tr from-[#C8A059]/60 via-[#E4E2DD]/30 to-[#C8A059]/60 rounded-full blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="relative w-52 h-52 sm:w-60 sm:h-60 rounded-full p-1.5 border border-[#C8A059]/60 bg-gradient-to-b from-[#0a1224] to-[#030712] shadow-2xl overflow-hidden">
            <img
              src={memorialPortrait}
              alt="Dr. Vedanshii Verma Memorial"
              className="w-full h-full object-cover object-top rounded-full scale-102 transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>

        {/* Text Memorial Details */}
        <div className="space-y-3.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C8A059]/10 border border-[#C8A059]/30 text-[11px] uppercase tracking-[0.3em] text-[#C8A059] font-semibold">
            <span>In Eternal Memory</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif tracking-[0.08em] text-[#F5F2EC] uppercase font-normal">
            DR. VEDANSHII VERMA
          </h1>
          <p className="text-base sm:text-xl font-serif italic text-[#C8A059] max-w-2xl mx-auto font-light">
            “A visionary architect of institutions, champion of human dignity, and eternal soul of our collective purpose.”
          </p>
        </div>

        <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-[#C8A059] to-transparent mt-12" />
      </section>

      {/* 2. HER STORY & INSTITUTIONAL HERITAGE */}
      <section className="py-12 px-6 sm:px-8 max-w-3xl mx-auto relative z-10">
        <div className="text-center mb-8">
          <span className="text-xs uppercase tracking-[0.3em] text-[#C8A059] font-bold">
            THE ARCHITECT OF PURPOSE
          </span>
        </div>
        <div className="space-y-6 text-slate-200 font-light text-base sm:text-lg leading-relaxed font-serif text-justify">
          <p>
            Dr. Vedanshii Verma was a transformative industrialist, visionary investor, and noble philanthropist whose life and work redefined corporate stewardship. Born into the distinguished Verma family of Uttar Pradesh as the eldest daughter of V.K. Verma and Shurishri Verma, she dedicated her journey to upholding uncompromised integrity, rigorous enterprise discipline, and profound social upliftment.
          </p>
          <p>
            Her governance philosophy merged classical architectural symmetry with human-centered empathy. She perceived every enterprise not merely as an economic mechanism, but as a solemn instrument to create sovereign capability for Bharat, nourish community wellbeing, and ensure that no child or vulnerable family is left behind.
          </p>
        </div>
      </section>

      {/* 3. AUTO-SWIPING ARCHIVAL CHRONICLE */}
      <section 
        className="py-16 sm:py-24 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto relative z-10"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Minimalist Category Tag */}
        <div className="flex items-center gap-3 pb-4 border-b border-white/10 mb-10">
          <span className="w-2.5 h-2.5 rounded-full bg-[#C8A059] animate-pulse" />
          <span className="text-xs uppercase tracking-[0.25em] text-[#C8A059] font-bold">
            {slides[currentSlide].badge}
          </span>
        </div>

        {/* Content & Archival Photo Grid */}
        <div 
          key={currentSlide} 
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center transition-all duration-700 ease-in-out"
        >
          {/* Left: Text Information */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-2xl sm:text-4xl font-serif text-[#F5F2EC] font-normal tracking-wide">
              {slides[currentSlide].title}
            </h3>
            {slides[currentSlide].content}
          </div>

          {/* Right: Archival Photograph */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full max-w-md overflow-hidden rounded-xl border border-white/15 shadow-2xl bg-black/40 p-2">
              <img
                src={slides[currentSlide].photo}
                alt={slides[currentSlide].photoAlt}
                className="w-full h-auto max-h-[480px] object-cover object-top rounded-lg shadow-xl transition-transform duration-700 hover:scale-[1.02]"
              />
            </div>
            <p className="text-xs font-serif italic text-slate-400 mt-3.5 text-center">
              {slides[currentSlide].photoCaption}
            </p>
          </div>
        </div>

        {/* Minimal Indicators */}
        <div className="flex justify-center gap-3 mt-12 pt-6 border-t border-white/10">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 transition-all duration-500 rounded-full cursor-pointer ${
                currentSlide === idx ? "w-14 bg-[#C8A059]" : "w-4 bg-white/20 hover:bg-white/50"
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* 4. TRIBUTE ARCHIVE VIDEO (AUTOPLAY, LOOPED, MUTED, ZERO DOWNLOAD/CONTROLS) */}
      <section className="py-16 sm:py-24 px-6 sm:px-12 lg:px-20 max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-8">
          <p className="text-xs uppercase tracking-[0.3em] text-[#C8A059] font-bold">
            CINEMATIC ARCHIVE & SOLEMN TRIBUTE
          </p>
        </div>
        <div className="w-full rounded-2xl overflow-hidden shadow-[0_16px_50px_rgba(0,0,0,0.8)] border border-white/15 bg-black">
          <video
            autoPlay
            muted
            loop
            playsInline
            controls={false}
            disablePictureInPicture
            controlsList="nodownload nofullscreen noremoteplayback"
            onContextMenu={(e) => e.preventDefault()}
            className="w-full aspect-video object-cover pointer-events-none select-none"
          >
            <source src={legacyVideo} type="video/mp4" />
          </video>
        </div>
      </section>

      {/* 5. HER SACRED LAST WORDS (POIGNANT & HIGHLY LEGIBLE) */}
      <section className="py-20 sm:py-28 px-6 sm:px-10 max-w-4xl mx-auto relative z-10">
        <div className="text-center space-y-10">
          <div className="inline-flex items-center gap-2">
            <span className="w-6 h-[1px] bg-[#C8A059]" />
            <p className="text-xs uppercase tracking-[0.35em] text-[#C8A059] font-bold">
              HER LAST WORDS & ETERNAL DIRECTIVE
            </p>
            <span className="w-6 h-[1px] bg-[#C8A059]" />
          </div>

          <div className="space-y-8 text-center">
            <p className="text-2xl sm:text-4xl md:text-4xl font-serif text-[#C8A059] leading-snug font-normal">
              “If I die tomorrow, don’t let this vision die with me.”
            </p>

            <p className="text-lg sm:text-2xl text-[#F5F2EC] font-serif italic leading-relaxed font-light max-w-3xl mx-auto">
              “We may not be able to help every child, but together we can change the life of one — and that one life can change the world. Every child deserves dignity, quality education, unconditional love, and the opportunity to dream. A disability must never become a barrier to their destiny; it should only remind us of our sacred duty to stand beside them.”
            </p>

            <p className="text-base sm:text-xl text-slate-300 font-serif leading-relaxed font-light max-w-3xl mx-auto">
              “If you ever wish to remember me, don’t remember my name, my face, or my achievements. Remember this mission. Continue the work. Protect these children. Give them the future they deserve. A vision only dies when people stop believing in it. Don’t let ours die.”
            </p>
          </div>

          {/* Signature (Enlarged & Crisp) */}
          <div className="pt-10 flex flex-col items-center">
            <img
              src={signatureImg}
              alt="Dr. Vedanshii Verma Signature"
              className="h-28 sm:h-36 w-auto object-contain invert opacity-95 transition-opacity hover:opacity-100"
            />
            <p className="text-sm font-serif uppercase tracking-[0.25em] text-[#C8A059] mt-4 font-semibold">
              Dr. Vedanshii Verma
            </p>
          </div>
        </div>
      </section>

      {/* 6. IN MEMORY PHOTO & FINAL COMMITMENT */}
      <section className="py-16 sm:py-24 px-6 sm:px-12 max-w-5xl mx-auto text-center space-y-12 relative z-10">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-[#C8A059] font-bold">
            FOREVER IN OUR HEARTS
          </p>
        </div>

        {/* In Memory Photo */}
        <div className="max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-white/15">
          <img
            src={memoryPhoto}
            alt="In Loving Memory with Us"
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Closing Solemn Vow */}
        <div className="max-w-3xl mx-auto pt-10 border-t border-white/10 space-y-4">
          <p className="text-base sm:text-xl font-serif italic text-slate-200 leading-relaxed font-light">
            “Her courage, intellect, and compassion remain forever etched into the foundations, structures, and conscience of the Rashtra Bharosa Group.”
          </p>
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#C8A059] to-transparent mx-auto mt-6" />
        </div>
      </section>

    </div>
  );
};

export default HerLegacy;

