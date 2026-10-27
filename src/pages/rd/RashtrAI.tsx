import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";

// Assets
import rashtraiVideo from "@/assets/VIDEOS/RashtrAI-hero.mp4";

const RashtrAI: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#FCFDFE] text-slate-900 font-sans antialiased min-h-screen selection:bg-[#041633] selection:text-white pt-24 sm:pt-28">
      {/* Top Clean Header with Back Navigation (No duplicate hero section) */}
      <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-12 py-6 border-b border-slate-200">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            to="/innovation"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-600 hover:text-[#041633] transition-colors bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-lg border border-slate-200"
          >
            <ArrowLeft size={16} /> Back to Innovation
          </Link>
          <div className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-brand-gold">
            Sovereign AI & Autonomous Systems
          </div>
        </div>
      </div>

      {/* Main Full-Screen Content Spread */}
      <main className="w-full max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-12 py-10 lg:py-16 space-y-14">
        
        {/* Title & Subtitle */}
        <div className="space-y-3">
          <div className="text-xs font-bold uppercase tracking-[0.25em] text-brand-gold">
            Sovereign R&D Venture • RashBhar Technology
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-light text-[#041633] tracking-tight">
            <strong className="font-semibold">RashtrAI</strong> Industrial AI & Autonomous Agent Platform
          </h1>
          <p className="text-sm sm:text-base lg:text-lg font-medium text-slate-600 uppercase tracking-[0.14em]">
            Indigenous Foundation Models • 100% In-Country Data Sovereignty • Zero Foreign Cloud Dependencies
          </p>
        </div>

        {/* Fullscreen Video Player (Full Width, Crisp & Unobstructed) */}
        <div className="w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-black relative">
          <video
            src={rashtraiVideo}
            autoPlay
            loop
            muted
            playsInline
            controls
            className="w-full h-auto max-h-[85vh] object-cover"
          />
        </div>

        {/* Full-Width Lead Editorial Pull-Quote */}
        <blockquote className="w-full font-serif italic text-2xl sm:text-3xl lg:text-4xl text-slate-800 leading-relaxed text-center py-10 border-y border-slate-200">
          “True technological sovereignty begins when an enterprise’s critical intelligence, sensor data, and operational algorithms remain entirely within national borders.”
        </blockquote>

        {/* Full-Width Narrative Chapter 1 */}
        <article className="w-full space-y-6 text-slate-700 text-base sm:text-lg lg:text-xl leading-relaxed">
          <div className="space-y-1">
            <span className="text-xs sm:text-sm font-mono font-bold text-brand-gold uppercase tracking-widest">Chapter 01</span>
            <h3 className="text-2xl sm:text-4xl lg:text-5xl font-serif text-[#041633] font-normal">
              The Sovereign Data Imperative
            </h3>
          </div>
          <p>
            RashtrAI was engineered to address a fundamental strategic vulnerability in contemporary industrial automation: the reliance on foreign, cloud-hosted AI APIs for mission-critical domestic infrastructure.
          </p>
          <p>
            Developed by RashBhar Technology, RashtrAI is a sovereign foundation model and autonomous agent platform built from the ground up to operate on air-gapped, in-country bare-metal GPU clusters. All telemetry data, operational logs, mineral extraction models, and financial workflows remain strictly confined to secure domestic servers under Indian jurisdiction.
          </p>
          <p>
            By eliminating third-party API dependencies and overseas latency, RashtrAI guarantees deterministic, sub-100 millisecond response times for edge sensors, automated conveyor monitoring, and heavy equipment tele-operations.
          </p>
        </article>

        {/* Full-Width Narrative Chapter 2 */}
        <article className="w-full space-y-6 text-slate-700 text-base sm:text-lg lg:text-xl leading-relaxed pt-12 border-t border-slate-200">
          <div className="space-y-1">
            <span className="text-xs sm:text-sm font-mono font-bold text-brand-gold uppercase tracking-widest">Chapter 02</span>
            <h3 className="text-2xl sm:text-4xl lg:text-5xl font-serif text-[#041633] font-normal">
              Agentic Orchestration Across Seven Operating Verticals
            </h3>
          </div>
          <p>
            Rather than functioning as a generic conversational interface, RashtrAI deploys a coordinated mesh of eight specialized autonomous agents designed for heavy physical operations.
          </p>
          <p>
            In mining operations, real-time dispatch agents continuously optimize dump-truck haulage routes, detect conveyor belt heat anomalies, and calibrate automated ore-grade sorting. In infrastructure, EPC agents synchronize concrete batch-mixing schedules with on-site pour logistics, eliminating material wastage and project delays.
          </p>
          <p>
            Simultaneously, vernacular voice agents deliver seamless voice interactions in Odia, Hindi, and Santhali, bridging advanced digital intelligence with grassroots technicians and field personnel across Eastern India.
          </p>
        </article>

        {/* Full-Width Narrative Chapter 3 */}
        <article className="w-full space-y-6 text-slate-700 text-base sm:text-lg lg:text-xl leading-relaxed pt-12 border-t border-slate-200">
          <div className="space-y-1">
            <span className="text-xs sm:text-sm font-mono font-bold text-brand-gold uppercase tracking-widest">Chapter 03</span>
            <h3 className="text-2xl sm:text-4xl lg:text-5xl font-serif text-[#041633] font-normal">
              Deterministic Verification & Enterprise Scalability
            </h3>
          </div>
          <p>
            Industrial artificial intelligence demands zero tolerance for hallucinations or unverified automated actions. RashtrAI enforces strict human-in-the-loop verification gates and deterministic schema constraints across every operational pipeline.
          </p>
          <p>
            As the platform scales from internal conglomerate deployment into wider public-sector partnerships, it establishes an enduring benchmark for Indian digital sovereignty—demonstrating that cutting-edge artificial intelligence and high-assurance industrial engineering can be conceived, built, and operated entirely within Bharat.
          </p>
        </article>

        {/* Clean Bottom Navigation (No Signatures) */}
        <div className="w-full pt-12 pb-16 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <Link
            to="/innovation"
            className="text-xs sm:text-sm font-semibold uppercase tracking-[0.14em] text-slate-600 hover:text-[#041633] flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft size={16} /> All Innovation Pillars
          </Link>
          <Link
            to="/innovation/ved-ri"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#041633] text-white hover:bg-brand-navy-light transition-all text-xs sm:text-sm font-bold uppercase tracking-wider"
          >
            Next: VED Ri Robotics <ArrowRight size={16} />
          </Link>
        </div>
      </main>
    </div>
  );
};

export default RashtrAI;
