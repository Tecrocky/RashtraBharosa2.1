import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Home as HomeIcon,
  Sprout,
  Pickaxe,
  HardHat,
  TrendingUp,
  ShieldCheck,
  HeartPulse,
  Leaf,
  CheckCircle2,
  ChevronRight,
  Laptop,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import PartnersMarquee from "@/components/PartnersMarquee";
import SubsidiariesMarquee from "@/components/SubsidiariesMarquee";
import MetaTags from "@/components/MetaTags";

import healthcareVideo from "@/assets/VIDEOS/healthcare-background-RBG.mp4";
import infraVideo from "@/assets/VIDEOS/Construction Video.mp4";
import miningVideo from "@/assets/VIDEOS/mining-background-RBG.mp4";
import techVideo from "@/assets/VIDEOS/tech-background-RBG.mp4";
import agriVideo from "@/assets/VIDEOS/Agricultural land cinematic beauty.mp4";
import realestateVideo from "@/assets/VIDEOS/Real estate video.mp4";
import capitalVideo from "@/assets/VIDEOS/Capital.mp4";

import healthcareImg from "@/assets/healthcare.jpg";
import technologyImg from "@/assets/technology.jpg";
import realestateImg from "@/assets/realestate.jpg";
import soilImg from "@/assets/soil.jpg";
import miningImg from "@/assets/mining.jpg";
import founderImg from "@/assets/leadership/group/founder.png";
import founderSignImg from "@/assets/sign/founder-sign.png";
import projectHospitalImg from "@/assets/projects/hospital.jpg";
import miningHighlightImg from "@/assets/highlights/mining-highlight.jpg";
import groupLeadersImg from "@/assets/highlights/photos/group leaders.jpeg";
import agriHighlightImg from "@/assets/highlights/agri-highlight.jpg";
import innovexImg from "@/assets/innovex.png";
import royalbirdsImg from "@/assets/royalbirds.png";

const heroSectors = [
  {
    id: "mining",
    label: "Natural Resources",
    sublabel: "RashBhar Mining",
    title: "Essential Mineral Exploration & Energy Security",
    video: miningVideo,
    link: "/ventures/mining",
    description: "Pioneering responsible exploration and natural resource extraction with rigorous environmental compliance, mechanized extraction fleets, and zero-harm operating standards.",
  },
  {
    id: "infrastructure",
    label: "Civil Engineering & EPC",
    sublabel: "Innovex Construction",
    title: "Heavy Industrial Engineering & Civil Infrastructure",
    video: infraVideo,
    link: "/ventures/infrastructure",
    description: "Executing high-assurance civil engineering, turnkey industrial EPC infrastructure, and heavy structural developments essential to national economic growth.",
  },
  {
    id: "healthcare",
    label: "Healthcare & Life Sciences",
    sublabel: "RashBhar Health Care",
    title: "Tertiary & Super-Specialty Medical Infrastructure",
    video: healthcareVideo,
    link: "/ventures/healthcare",
    description: "Delivering advanced tertiary healthcare, super-specialty clinical infrastructure, and emergency care accessibility across underserved regional corridors.",
  },
  {
    id: "technology",
    label: "Sovereign Deep-Tech",
    sublabel: "RashBhar Technology",
    title: "Indigenous Sovereign Intelligence & AI Systems",
    video: techVideo,
    link: "/ventures/technology",
    description: "Building indigenous sovereign artificial intelligence systems, secure zero-trust enterprise architectures, and mission-critical digital intelligence platforms.",
  },
  {
    id: "agriculture",
    label: "Agritech & Soil Science",
    sublabel: "RashBhar Soil & Soul",
    title: "Sustainable Agriscience & Soil Stewardship",
    video: agriVideo,
    link: "/ventures/agriculture",
    description: "Advancing scientific soil restoration, sustainable organic agriculture, and direct agrarian prosperity through modern bio-science and eco-stewardship.",
  },
  {
    id: "realestate",
    label: "Sustainable Real Estate",
    sublabel: "RashBhar Real Estate",
    title: "Integrated Urban Living & Sustainable Horizons",
    video: realestateVideo,
    link: "/ventures/real-estate",
    description: "Creating sustainable integrated communities, eco-conscious master-planned developments, and modern commercial infrastructure built for generational living.",
  },
  {
    id: "investments",
    label: "Strategic Capital",
    sublabel: "Royal Birds Group",
    title: "Patient Growth Capital & Strategic Incubation",
    video: capitalVideo,
    link: "/ventures/investments",
    description: "Deploying disciplined multi-generational growth capital and strategic incubation into high-impact enterprises strengthening Bharat's economic backbone.",
  },
];

const Home = () => {
  const [activeHeroIndex, setActiveHeroIndex] = useState<number>(0);
  const [activeMonolith, setActiveMonolith] = useState<string>("mining");
  const currentSector = heroSectors[activeHeroIndex];

  // 6-Second Automatic Sector Video Rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveHeroIndex((prev) => (prev + 1) % heroSectors.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white text-[#10264a] font-sans antialiased overflow-x-hidden selection:bg-brand-gold selection:text-brand-navy">
      <MetaTags
        title="Rashtra Bharosa Group | Indian Industrial Conglomerate"
        description="Rashtra Bharosa Group is a diversified Indian industrial conglomerate building businesses across Mining, Infrastructure & Construction, Healthcare, Technology, Agriculture, Real Estate, and Strategic Investments."
        keywords="Rashtra Bharosa Group, Rashtra Bharosa, RashBhar, Indian industrial conglomerate, industrial conglomerate India, diversified Indian industrial group, diversified business group India, Indian business group, Indian industrial group, diversified industrial conglomerate, Mining, Infrastructure, Construction, Healthcare, Technology, Agriculture, Real Estate, Strategic Investments, Rashtra Bharosa Odisha, Rashtra Bharosa Bhubaneswar, Rashtra Bharosa India, Odisha industrial group, Bhubaneswar industrial group"
        image="https://www.rashtrabharosagroup.com/colour-logo.png"
      />

      {/* =========================================================================
          01. CINEMATIC FULL-BLEED HERO SECTION (Aditya Birla Group Aesthetic)
          ========================================================================= */}
      <section className="relative min-h-[85vh] lg:min-h-screen flex items-center overflow-hidden bg-[#041633] text-white py-24 sm:py-36">
        {/* Full Viewport Background Video/Image Layer with Directional Overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSector.id}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.1, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full"
            >
              <video
                src={currentSector.video}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover object-center"
              />
            </motion.div>
          </AnimatePresence>

          {/* Directional Luxury Conglomerate Overlay Gradients (Leaving Video Wide Open & Clear) */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#041633]/95 via-[#041633]/60 to-transparent z-[1]"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#041633] via-transparent to-black/40 z-[1]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_40%,rgba(4,22,51,0.6)_0%,transparent_75%)] z-[1]"></div>
        </div>

        {/* Hero Content Area with Generous Breathing Space */}
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl lg:max-w-4xl space-y-6 sm:space-y-7">
            {/* Eyebrow Conglomerate Tag */}
            <div className="inline-flex items-center gap-2.5">
              <span className="w-5 sm:w-6 h-[2px] bg-brand-gold"></span>
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-brand-gold">
                Rashtra Bharosa Group
              </span>
            </div>

            {/* Main Conglomerate Anchor Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-light tracking-tight text-white leading-[1.14]">
              Rooted in Trust, <br />
              <span className="font-bold text-white">Rising with Bharat</span>
            </h1>

            {/* Dynamically Changing Sector Text Box */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSector.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="space-y-3.5 sm:space-y-4 pt-1"
              >
                <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                  <span className="px-2.5 sm:px-3 py-1 rounded bg-brand-gold text-[#041633] text-[11px] sm:text-xs font-extrabold uppercase tracking-wider shadow-sm">
                    {currentSector.sublabel}
                  </span>
                  <span className="text-xs sm:text-base font-semibold text-slate-200 tracking-wide">
                    {currentSector.title}
                  </span>
                </div>

                <p className="text-sm sm:text-lg lg:text-xl text-slate-200 font-normal leading-relaxed max-w-2xl">
                  {currentSector.description}
                </p>

                <div className="pt-2">
                  <Link
                    to={currentSector.link}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-brand-gold hover:text-white transition-colors group"
                  >
                    <span>Explore {currentSector.sublabel}</span>
                    <ArrowRight size={15} className="group-hover:translate-x-1.5 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SUBSIDIARIES MARQUEE (7 Operating Entities in Full Color on White Background)
          ========================================================================= */}
      <SubsidiariesMarquee />

      {/* =========================================================================
          02. FOUNDER & LEADERSHIP SPOTLIGHT (100% Full-Bleed Magazine Editorial Layout)
          ========================================================================= */}
      <section className="relative w-full min-h-[85vh] lg:min-h-screen flex items-stretch bg-[#041633] text-white border-b border-white/10 overflow-hidden" id="leadership">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-full">
          
          {/* Left: 100% Full-Bleed Executive Portrait (Zero Margins / Zero White Space) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative min-h-[480px] lg:min-h-full flex items-stretch overflow-hidden bg-[#020B18]"
          >
            <img
              src={founderImg}
              alt="Subransu Mohanty - Founder of Rashtra Bharosa Group"
              className="w-full h-full object-cover object-top absolute inset-0"
            />
            {/* Subtle Gradient Overlays for Seamless Blending */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#041633] via-transparent to-transparent lg:hidden z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#041633] hidden lg:block z-10" />
            
            {/* Floating Executive Nameplate on Portrait */}
            <div className="absolute bottom-6 left-6 right-6 lg:bottom-10 lg:left-10 z-20 space-y-1">
              <div className="inline-block px-3.5 py-1.5 rounded-lg bg-[#041633]/85 backdrop-blur-md border border-white/15 shadow-xl">
                <div className="font-bold text-lg lg:text-xl text-white tracking-tight uppercase">Subransu Mohanty</div>
                <div className="text-[11px] text-brand-gold font-semibold uppercase tracking-[0.2em]">Founder, Rashtra Bharosa Group</div>
              </div>
            </div>
          </motion.div>

          {/* Right: Editorial Quote & Perspective Container */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 flex flex-col justify-center px-6 sm:px-12 lg:px-16 xl:px-20 py-16 lg:py-24 space-y-8 relative z-20 bg-[#041633]"
          >
            <div className="inline-flex items-center gap-2.5">
              <span className="w-6 h-[2px] bg-brand-gold"></span>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-gold">
                Founder's Perspective & Vision
              </span>
            </div>

            <div className="space-y-6">
              <div className="text-4xl lg:text-5xl text-brand-gold font-serif leading-none select-none">“</div>
              <blockquote className="text-lg sm:text-xl lg:text-2xl text-slate-100 leading-relaxed font-light italic -mt-4 font-serif">
                Rashtra Bharosa Group was founded on the conviction that building enduring institutions requires patience, operational discipline, and an unshakeable commitment to Bharat's self-reliance. We do not chase speculative trends. We invest directly in the critical backbone of the economy—from extracting vital minerals responsibly to creating accessible tertiary healthcare, sovereign artificial intelligence, and sustainable agrarian systems.
              </blockquote>

              <div className="pt-6 border-t border-white/15 flex flex-wrap items-end justify-between gap-6">
                <div className="space-y-2">
                  {/* Founder Signature */}
                  <img
                    src={founderSignImg}
                    alt="Subransu Mohanty Signature"
                    className="h-12 sm:h-14 w-auto object-contain invert opacity-90"
                  />
                  <div>
                    <h3 className="font-bold text-lg text-white uppercase tracking-tight">Subransu Mohanty</h3>
                    <p className="text-xs text-slate-300 font-medium">Founder, Rashtra Bharosa Group</p>
                  </div>
                </div>
                <Link
                  to="/about/founder"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#041633] bg-brand-gold hover:bg-[#c99516] px-5 py-2.5 rounded-md shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  <span>Office of the Founder</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================================
          PARTNERS MARQUEE (Placed between Founder & Integrated Industry Sections)
          ========================================================================= */}
      <section className="py-10 bg-[#F8FAFC] border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 text-center">
          <div className="inline-flex items-center gap-2.5">
            <span className="w-6 h-[2px] bg-slate-400"></span>
            <span className="text-xs uppercase font-bold text-slate-600 tracking-[0.25em]">
              Institutional Alliances & Partner Ecosystem
            </span>
            <span className="w-6 h-[2px] bg-slate-400"></span>
          </div>
        </div>
        <PartnersMarquee />
      </section>

      {/* =========================================================================
          03. INSTITUTIONAL OVERVIEW: WHAT IS RASHTRA BHAROSA GROUP?
          ========================================================================= */}
      <section className="relative min-h-[80vh] py-24 lg:py-32 flex items-center justify-center bg-[hsl(var(--primary))] text-white overflow-hidden border-b border-white/10" id="overview">
        {/* Clean Corporate Gradient Background */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-gradient-to-b from-[#0a192f] via-[hsl(var(--primary))] to-[#061224]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,166,0,0.06)_0%,transparent_70%)]" />
        </div>

        {/* Text Directly Overlaid On Top of Fullscreen Video */}
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-brand-gold text-xs font-bold uppercase tracking-[0.25em]">
              <span className="w-2 h-2 rounded-full bg-brand-gold" />
              <span>Institutional Charter // Nation First</span>
            </div>

            {/* Main Headline */}
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight leading-[1.15]">
              An Integrated Industrial Conglomerate Dedicated to <br className="hidden sm:inline" />
              <strong className="font-bold text-white">Bharat's Self-Reliance</strong>
            </h2>

            {/* Editorial Thesis Text */}
            <div className="max-w-3xl mx-auto space-y-5 text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
              <p>
                Headquartered in Bhubaneswar, Odisha, <strong className="text-white font-medium">Rashtra Bharosa Group</strong> is a diversified multi-sector industrial conglomerate operating across the foundational pillars of the Indian economy: natural resources, heavy civil infrastructure, tertiary healthcare, sovereign artificial intelligence, precision agriculture, sustainable real estate, and strategic growth capital.
              </p>
              <p>
                Founded by visionary industrialist <strong className="text-white font-medium">Subransu Mohanty</strong>, the Group was established on a fundamental conviction: true national progress requires enduring, long-term capital deployment in productive assets rather than speculative cycles. Every operating subsidiary is governed by a singular mandate—combining operational precision with deep fiduciary responsibility to our people and the nation.
              </p>
            </div>

            {/* Action Links & Key Badges */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <Button asChild className="bg-brand-gold hover:bg-[#c99516] text-[#041633] px-8 py-3.5 text-xs font-bold uppercase tracking-[0.14em] rounded-md shadow-xl transition-all">
                <Link to="/about">
                  Discover Group Heritage & Governance <ArrowRight size={15} className="ml-1.5" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================================
          04. SEVEN PILLARS OF NATION BUILDING (Clean White Background & Minimalist Design)
          ========================================================================= */}
      <section className="py-14 lg:py-20 bg-white border-b border-slate-200 relative overflow-hidden" id="businesses">
        <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* 7 Interactive Pillars Container */}
          <div className="flex flex-col lg:flex-row gap-3.5 min-h-[520px] lg:h-[580px] w-full">
            {[
              {
                id: "mining",
                num: "01",
                name: "RashBhar Mining",
                badge: "The Economic Engine",
                role: "Natural Resources & Extraction",
                image: miningImg,
                accentColor: "#D4AF37",
                path: "/ventures/mining",
                cta: "Explore Mining",
                icon: Pickaxe,
              },
              {
                id: "construction",
                num: "02",
                name: "Innovex Construction",
                badge: "Engineering & Infrastructure",
                role: "Heavy Industrial EPC & Civil Engineering",
                image: innovexImg,
                accentColor: "#3B82F6",
                path: "/ventures/infrastructure",
                cta: "Explore Engineering",
                icon: HardHat,
              },
              {
                id: "healthcare",
                num: "03",
                name: "RashBhar Healthcare",
                badge: "Life & Clinical Excellence",
                role: "Tertiary Hospitals & Regional Care",
                image: healthcareImg,
                accentColor: "#10B981",
                path: "/ventures/healthcare",
                cta: "Explore Healthcare",
                icon: HeartPulse,
              },
              {
                id: "technology",
                num: "04",
                name: "RashBhar Technology",
                badge: "Sovereign Innovation",
                role: "Indigenous AI & Enterprise Intelligence",
                image: technologyImg,
                accentColor: "#0284C7",
                path: "/ventures/technology",
                cta: "Explore Technology",
                icon: Laptop,
              },
              {
                id: "soil",
                num: "05",
                name: "RashBhar Soil & Soul",
                badge: "Agritech & Crop Science",
                role: "Precision Soil Science & Organic Agriculture",
                image: soilImg,
                accentColor: "#16A34A",
                path: "/ventures/agriculture",
                cta: "Explore Agriculture",
                icon: Sprout,
              },
              {
                id: "realestate",
                num: "06",
                name: "RashBhar Real Estate",
                badge: "Sustainable Urban Horizons",
                role: "Integrated Living & Eco-Communities",
                image: realestateImg,
                accentColor: "#8B5CF6",
                path: "/ventures/real-estate",
                cta: "Explore Real Estate",
                icon: HomeIcon,
              },
              {
                id: "investments",
                num: "07",
                name: "Royal Birds Group",
                badge: "Strategic Capital",
                role: "Growth Capital & Strategic Incubation",
                image: royalbirdsImg,
                accentColor: "#F59E0B",
                path: "/ventures/investments",
                cta: "Explore Investments",
                icon: TrendingUp,
              },
            ].map((pillar) => {
              const isActive = activeMonolith === pillar.id;
              const IconComponent = pillar.icon;

              return (
                <div
                  key={pillar.id}
                  onMouseEnter={() => setActiveMonolith(pillar.id)}
                  onClick={() => setActiveMonolith(pillar.id)}
                  className={`relative rounded-xl overflow-hidden cursor-pointer border transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] bg-[#041633] flex flex-col justify-end ${
                    isActive
                      ? "lg:flex-[3.6] border-opacity-100 shadow-2xl min-h-[440px] lg:min-h-0"
                      : "lg:flex-1 border-slate-200 min-h-[85px] lg:min-h-0 hover:border-slate-400"
                  }`}
                  style={{
                    borderColor: isActive ? pillar.accentColor : undefined,
                  }}
                >
                  {/* Background Image Layer */}
                  <div
                    className={`absolute inset-0 bg-cover bg-center transition-all duration-700 ${
                      isActive
                        ? "filter grayscale-0 brightness-75 scale-105"
                        : "filter grayscale-[40%] brightness-[0.35]"
                    }`}
                    style={{ backgroundImage: `url(${pillar.image})` }}
                  />

                  {/* Gradient Lighting Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[#060E1A]/20 via-[#060E1A]/70 to-[#060E1A] z-[2]"></div>

                  {/* Top Color Accent Line */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1 z-[4] transition-opacity duration-300"
                    style={{
                      backgroundColor: pillar.accentColor,
                      opacity: isActive ? 1 : 0.35,
                    }}
                  />

                  {/* Collapsed State */}
                  <div
                    className={`absolute inset-0 z-[3] p-6 lg:p-7 flex lg:flex-col justify-between items-center transition-opacity duration-400 pointer-events-none ${
                      isActive ? "opacity-0" : "opacity-100"
                    }`}
                  >
                    <span className="text-xs font-bold text-white/50 tracking-wider font-mono">
                      {pillar.num}
                    </span>
                    <span className="text-xs font-bold text-white/80 uppercase tracking-widest lg:[writing-mode:vertical-rl] lg:rotate-180 truncate max-w-[200px] lg:max-w-none">
                      {pillar.name}
                    </span>
                    <IconComponent size={20} className="text-white/50 shrink-0" />
                  </div>

                  {/* Expanded Clean Details Content */}
                  <div
                    className={`relative z-[3] p-6 sm:p-8 lg:p-10 space-y-4 transition-all duration-500 ${
                      isActive
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 translate-y-6 pointer-events-none hidden lg:block"
                    }`}
                  >
                    <div
                      className="inline-flex items-center gap-2 px-3.5 py-1 rounded text-[11px] font-bold uppercase tracking-wider backdrop-blur-md"
                      style={{
                        backgroundColor: `${pillar.accentColor}25`,
                        borderColor: pillar.accentColor,
                        color: pillar.accentColor,
                        borderWidth: 1,
                      }}
                    >
                      <IconComponent size={13} /> {pillar.badge}
                    </div>

                    <div>
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-light text-white tracking-tight leading-tight">
                        <strong className="font-bold">{pillar.name}</strong>
                      </h3>
                      <p
                        className="text-xs sm:text-sm font-semibold uppercase tracking-wider mt-1"
                        style={{ color: pillar.accentColor }}
                      >
                        {pillar.role}
                      </p>
                    </div>

                    {/* Clean CTA Button */}
                    <div className="pt-2">
                      <Link
                        to={pillar.path}
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded text-xs font-bold uppercase tracking-[0.14em] text-[#041633] transition-transform duration-300 hover:translate-x-1 shadow-lg bg-brand-gold hover:bg-[#c48514]"
                      >
                        {pillar.cta} <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
