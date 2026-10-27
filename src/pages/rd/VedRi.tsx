import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";

// Assets
import vedVideo from "@/assets/VIDEOS/VED Ri-hero.mp4";

const VedRi: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#FCFDFE] text-slate-900 font-sans antialiased min-h-screen selection:bg-[#041633] selection:text-white pt-24 sm:pt-28">
      {/* Top Clean Header with Back Navigation */}
      <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-12 py-6 border-b border-slate-200">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            to="/innovation"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-600 hover:text-[#041633] transition-colors bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-lg border border-slate-200"
          >
            <ArrowLeft size={16} /> Back to Innovation
          </Link>
          <div className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-brand-gold">
            Embodied Robotics & Hazard Automation
          </div>
        </div>
      </div>

      {/* Main Full-Screen Content Spread */}
      <main className="w-full max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-12 py-10 lg:py-16 space-y-14">
        
        {/* Title & Subtitle */}
        <div className="space-y-3">
          <div className="text-xs font-bold uppercase tracking-[0.25em] text-brand-gold">
            Sovereign R&D Venture • VED Ri Robotics Laboratory
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-light text-[#041633] tracking-tight">
            <strong className="font-semibold">VED Ri</strong> Embodied Robotics & Autonomous Heavy Systems
          </h1>
          <p className="text-sm sm:text-base lg:text-lg font-medium text-slate-600 uppercase tracking-[0.14em]">
            Humanoid Robotics • Hazardous Mining Automation • High-Dexterity Industrial Systems
          </p>
        </div>

        {/* Fullscreen Video Player (Full Width, Crisp & Unobstructed) */}
        <div className="w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-black relative">
          <video
            src={vedVideo}
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
          “The greatest measure of technological advancement is removing human workers from life-threatening industrial hazards through infallible robotic engineering.”
        </blockquote>

        {/* Full-Width Narrative Chapter 1 */}
        <article className="w-full space-y-6 text-slate-700 text-base sm:text-lg lg:text-xl leading-relaxed">
          <div className="space-y-1">
            <span className="text-xs sm:text-sm font-mono font-bold text-brand-gold uppercase tracking-widest">Chapter 01</span>
            <h3 className="text-2xl sm:text-4xl lg:text-5xl font-serif text-[#041633] font-normal">
              The Mission of Embodied Robotics
            </h3>
          </div>
          <p>
            Heavy industrial operations—deep subterranean mineral extraction, high-altitude structural steel erection, and extreme-heat metal processing—have historically carried unavoidable physical hazards for personnel.
          </p>
          <p>
            VED Ri was created to fundamentally eliminate these hazards by engineering embodied robotic systems capable of executing high-dexterity manipulation, hazardous inspection, and heavy tool handling in environments where human presence poses severe safety risks.
          </p>
          <p>
            Combining ruggedized mechanical metallurgy, high-torque brushless actuators, and proprietary real-time operating microkernels, VED Ri bridges digital intelligence with physical power.
          </p>
        </article>

        {/* Full-Width Narrative Chapter 2 */}
        <article className="w-full space-y-6 text-slate-700 text-base sm:text-lg lg:text-xl leading-relaxed pt-12 border-t border-slate-200">
          <div className="space-y-1">
            <span className="text-xs sm:text-sm font-mono font-bold text-brand-gold uppercase tracking-widest">Chapter 02</span>
            <h3 className="text-2xl sm:text-4xl lg:text-5xl font-serif text-[#041633] font-normal">
              Three Specialized Robotic Form Factors
            </h3>
          </div>
          <p>
            The VED Ri research program encompasses three primary kinematic architectures tailored to specific industrial environments:
          </p>
          <p>
            First, the <strong>VED Ri Humanoid Architecture</strong>: a bipedal, high-dexterity platform designed for dynamic rough-terrain traversal, climbing industrial scaffolds, and operating standard manual valves in toxic chemical or high-heat zones.
          </p>
          <p>
            Second, the <strong>Heavy Fabrication Gantry</strong>: fixed multi-axis articulated manipulator arms delivering sub-millimeter precision in automated structural steel welding, plasma cutting, and pre-cast concrete assembly lines.
          </p>
          <p>
            Third, the <strong>Subterranean Mining Rover</strong>: an IP68-rated tracked robotic vehicle equipped with solid-state 3D LiDAR SLAM mapping for assessing post-blast mine cavities, unstable geological strata, and zero-oxygen subterranean shafts.
          </p>
        </article>

        {/* Full-Width Narrative Chapter 3 */}
        <article className="w-full space-y-6 text-slate-700 text-base sm:text-lg lg:text-xl leading-relaxed pt-12 border-t border-slate-200">
          <div className="space-y-1">
            <span className="text-xs sm:text-sm font-mono font-bold text-brand-gold uppercase tracking-widest">Chapter 03</span>
            <h3 className="text-2xl sm:text-4xl lg:text-5xl font-serif text-[#041633] font-normal">
              Zero-Latency Tele-Operation & Failsafe Control
            </h3>
          </div>
          <p>
            Every VED Ri unit operates on ultra-low latency, deterministic communication links with an end-to-end control loop under 15 milliseconds. Integrated haptic feedback suits enable human supervisors situated kilometers away in secure control rooms to perform delicate maintenance tasks with natural hand dexterity.
          </p>
          <p>
            With redundant hardware emergency interlocks and automatic mechanical fail-brakes, VED Ri ensures that human operators retain ultimate authority while remaining completely out of harm’s way.
          </p>
        </article>

        {/* Clean Bottom Navigation (No Signatures) */}
        <div className="w-full pt-12 pb-16 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <Link
            to="/innovation/rashtrai"
            className="text-xs sm:text-sm font-semibold uppercase tracking-[0.14em] text-slate-600 hover:text-[#041633] flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft size={16} /> Previous: RashtrAI
          </Link>
          <Link
            to="/innovation/agrigel"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#041633] text-white hover:bg-brand-navy-light transition-all text-xs sm:text-sm font-bold uppercase tracking-wider"
          >
            Next: AgriGel Hydrogel <ArrowRight size={16} />
          </Link>
        </div>
      </main>
    </div>
  );
};

export default VedRi;
