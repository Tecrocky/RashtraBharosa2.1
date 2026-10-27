import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, HeartPulse, Stethoscope, Activity, ShieldCheck, Hospital, Users, Target, Eye, Award, CheckCircle2, Sparkles, Building2, PhoneCall } from "lucide-react";
import VentureSubnav from "@/components/ventures/VentureSubnav";
import { Button } from "@/components/ui/button";

// Assets
import healthVideo from "@/assets/VIDEOS/healthcare-background-RBG.mp4";
import healthImg from "@/assets/healthcare.jpg";
import healthLogo from "@/assets/Subsidiary-logos/healthcare-logo.png";
import projectHospitalImg from "@/assets/projects/hospital.jpg";

const HealthcareOverview: React.FC = () => {
  return (
    <div className="bg-white text-slate-900 font-sans antialiased min-h-screen selection:bg-[#062B63] selection:text-white">
      {/* Hero Section with Cinematic Background Video */}
      <section className="relative pt-44 pb-12 lg:pt-56 lg:pb-16 overflow-hidden flex items-end min-h-[460px] lg:min-h-[500px] bg-[#041633]">
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent z-0 pointer-events-none"></div>

        <div className="max-w-[1500px] w-full mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
          <div className="max-w-5xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-black/50 text-brand-gold border border-white/20 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse"></span>
              <span>Healthcare Division of Rashtra Bharosa Group Limited</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 pt-1">
              <div className="bg-white/95 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-white/40 shadow-2xl inline-flex items-center justify-center w-fit">
                <img
                  src={healthLogo}
                  alt="RashBhar HealthCare Logo"
                  className="h-16 sm:h-20 md:h-24 w-auto max-w-[280px] sm:max-w-[340px] object-contain"
                />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight drop-shadow-lg uppercase">
                  RashBhar HealthCare
                </h1>
                <p className="text-sm sm:text-base font-semibold text-slate-200 uppercase tracking-widest mt-1">
                  Nation's Health, Our Commitment • Cardiovascular Sciences at the Core
                </p>
              </div>
            </div>

            {/* Quick Hero CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Button asChild className="btn-primary px-6 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg">
                <Link to="/ventures/healthcare/leadership">
                  Clinical Leadership <ArrowRight size={13} className="ml-1.5" />
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
      <VentureSubnav basePath="/ventures/healthcare" companyName="RashBhar HealthCare" logo={healthLogo} />

      {/* Main Corporate Editorial Content */}
      <main className="py-14 lg:py-20 bg-white">
        <div className="max-w-[1500px] w-full mx-auto px-4 sm:px-8 lg:px-12 space-y-20">
          
          {/* Section 1: Executive Corporate Narrative & Institutional Journey */}
          <div className="space-y-8">
            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-widest text-[#062B63]">
                Corporate Profile & Institutional Evolution
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight uppercase leading-tight">
                An Integrated Cardiovascular Healthcare Ecosystem
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 text-base sm:text-lg leading-relaxed text-slate-700">
              <div className="space-y-5">
                <p className="text-lg sm:text-xl text-slate-900 font-medium leading-relaxed">
                  <strong>RashBhar HealthCare</strong> is the dedicated healthcare company of <strong>Rashtra Bharosa Group Limited</strong>, established to create a modern, connected and accessible healthcare ecosystem with <strong>cardiovascular sciences at its core</strong>.
                </p>

                <p>
                  Our long-term focus is to strengthen access to advanced cardiovascular and multi-specialty medical care across Eastern India, bridging the gap between urban medical hubs, regional communities, and underserved rural belts.
                </p>

                <p>
                  The healthcare division has its origins in <strong>Nigam Health Care</strong>, an earlier healthcare operation in Odisha acquired by Rashtra Bharosa Group in <strong>Q2 2025</strong>. Following this acquisition, the organisation entered a systematic transformation phase—restructuring foundational systems, integrating assets such as <strong>Meekam Hospital</strong>, upgrading clinical protocols, and initiating foundational redevelopments across community facilities including <strong>Rajbag Healthcare</strong>.
                </p>
              </div>

              <div className="space-y-5">
                <p>
                  Our healthcare philosophy is governed by three foundational pillars:
                </p>
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#062B63] mt-2 shrink-0"></span>
                    <p className="text-sm font-bold text-slate-900 uppercase">Cardiovascular Care at the Core</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#062B63] mt-2 shrink-0"></span>
                    <p className="text-sm font-bold text-slate-900 uppercase">Healthcare Access Without Geographic Barriers</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#062B63] mt-2 shrink-0"></span>
                    <p className="text-sm font-bold text-slate-900 uppercase">Technology That Strengthens Clinical Care</p>
                  </div>
                </div>

                <p>
                  We believe that life-saving clinical care must never depend solely on where a patient lives. A citizen in a major urban metropolis and a family in a rural village must both have a reliable, dignified pathway to timely diagnosis, specialist intervention, emergency support, and continuous care management.
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: Defining Ambition Banner */}
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#041633] via-[#062B63] to-[#041633] text-white shadow-2xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2 max-w-3xl">
              <div className="text-xs font-bold text-brand-gold uppercase tracking-widest">
                Our Defining Clinical Ambition
              </div>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight">
                Zero Preventable Cardiac Deaths
              </h3>
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                Cardiovascular disease is the leading cause of premature mortality in India. Our institutional ambition is to systematically eliminate preventable cardiac fatalities through early diagnostic screening, rapid emergency response, community tele-triage, and world-class surgical intervention.
              </p>
            </div>
            <div className="shrink-0">
              <Button asChild className="btn-primary px-8 py-3.5 text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg">
                <Link to="/ventures/healthcare/leadership">
                  Clinical Leadership <ArrowRight size={14} className="ml-2" />
                </Link>
              </Button>
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
                  To become Eastern India’s leading cardiovascular healthcare institution.
                </p>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  We envision a healthcare system where advanced cardiac expertise, modern clinical infrastructure, responsible medical technology, translational research, preventative public health, and accessible community networks function as one unified continuum of care.
                </p>
                <div className="p-4 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 font-semibold space-y-1">
                  <span className="text-[#062B63] block font-bold uppercase tracking-wider">Continuum of Care Flow:</span>
                  Major Cities → Regional Centres → Smaller Towns → Rural Communities
                </div>
              </div>
              <div className="pt-4 border-t border-slate-200 text-xs font-bold text-[#062B63] uppercase tracking-wider">
                Eastern India Regional Benchmark
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
                    Institutional Commitments
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight">
                    Our Mission
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  Our mission is to build a healthcare ecosystem that makes high-quality cardiovascular and specialized medical care accessible, connected, and patient-centered across Eastern India:
                </p>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-[#062B63] shrink-0 mt-0.5" />
                    <span>Delivering uncompromising international standards of clinical cardiac care.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-[#062B63] shrink-0 mt-0.5" />
                    <span>Developing modern quaternary and tertiary hospital infrastructure.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-[#062B63] shrink-0 mt-0.5" />
                    <span>Connecting rural and underserved populations with specialist clinical guidance.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-[#062B63] shrink-0 mt-0.5" />
                    <span>Deploying sovereign digital health (Swasthya Saathi) and rapid emergency dispatch.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-[#062B63] shrink-0 mt-0.5" />
                    <span>Fostering a clinical culture anchored in patient dignity, safety, and transparency.</span>
                  </li>
                </ul>
              </div>
              <div className="pt-4 border-t border-slate-200 text-xs font-bold text-[#062B63] uppercase tracking-wider">
                Comprehensive Healthcare Delivery
              </div>
            </div>
          </div>

          {/* Section 4: The 4-Tier Hub & Spoke Clinical Network */}
          <div className="space-y-8">
            <div className="max-w-3xl space-y-2">
              <div className="text-xs font-bold uppercase tracking-widest text-[#062B63]">
                Delivery Architecture
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight uppercase">
                The 4-Tier Integrated Healthcare Network
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                RashBhar HealthCare organizes its medical delivery into four interconnected tiers to guarantee timely triage and surgical capability:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Class-A */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#062B63] text-white flex items-center justify-center font-bold text-xs">
                    TIER 1
                  </div>
                  <h4 className="text-lg font-black text-[#062B63] uppercase">Class-A: Flagship Hospital</h4>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <strong>Bhubaneswar Flagship Medical Center</strong> (500 beds, 300 cardiac beds) providing quaternary cardiac surgery, cath labs, trauma, and multi-specialty inpatient suites.
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-200 text-xs font-bold text-slate-900 uppercase">
                  Central Surgical Hub
                </div>
              </div>

              {/* Class-B */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#062B63] text-white flex items-center justify-center font-bold text-xs">
                    TIER 2
                  </div>
                  <h4 className="text-lg font-black text-[#062B63] uppercase">Class-B: Heart Care Centers</h4>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    Regional heart hospitals and specialized diagnostic units in major district headquarters for stabilization, non-invasive cardiology, and regional specialist access.
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-200 text-xs font-bold text-slate-900 uppercase">
                  Regional Heart Centers
                </div>
              </div>

              {/* Class-C */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#062B63] text-white flex items-center justify-center font-bold text-xs">
                    TIER 3
                  </div>
                  <h4 className="text-lg font-black text-[#062B63] uppercase">Class-C: Chronic Care Units</h4>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    Smaller community health touchpoints and outpatient clinics (integrating facilities like Rajbag) focusing on hypertension, diabetes, long-term post-op monitoring, and diagnostics.
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-200 text-xs font-bold text-slate-900 uppercase">
                  Community Outpatient Nodes
                </div>
              </div>

              {/* Digital */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#062B63] text-white flex items-center justify-center font-bold text-xs">
                    TIER 4
                  </div>
                  <h4 className="text-lg font-black text-[#062B63] uppercase">Swasthya Saathi Platform</h4>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    Digital health companion and telemedicine mesh offering multilingual voice-first triage, digital health records, and emergency ambulance dispatch connecting remote clinics.
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-200 text-xs font-bold text-slate-900 uppercase">
                  Digital Telehealth Mesh
                </div>
              </div>
            </div>
          </div>

          {/* Section 5: Full-Width Institutional Media Banner */}
          <div className="w-full">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 aspect-[21/8] bg-slate-900">
              <img
                src={projectHospitalImg}
                alt="RashBhar HealthCare Flagship Medical Center"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none"></div>
              <div className="absolute bottom-6 left-8 text-white">
                <div className="text-xs font-bold text-brand-gold uppercase tracking-widest">
                  Modern Quaternary Hospital Infrastructure
                </div>
                <div className="text-sm sm:text-base font-bold text-white uppercase tracking-wider mt-0.5">
                  500 Inpatient Beds • 300 Dedicated Cardiac Beds • 12 Modular Laminar-Air Surgical Suites
                </div>
              </div>
            </div>
          </div>

          {/* Section 6: Comprehensive Core Values */}
          <div className="space-y-8 border-t border-slate-200 pt-12">
            <div className="max-w-3xl space-y-2">
              <div className="text-xs font-bold uppercase tracking-widest text-[#062B63]">
                Clinical Doctrine
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase">
                Our Core Values
              </h2>
              <p className="text-sm text-slate-600">
                The institutional principles guiding clinical governance, patient interaction, and administrative conduct:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="text-lg font-black text-[#062B63] uppercase">Patient First</h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Every clinical choice, operational procedure, and administrative policy is built around the health, safety, and comfort of the patient.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="text-lg font-black text-[#062B63] uppercase">Clinical Integrity</h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Adhering strictly to evidence-based medical practices, transparent clinical pathways, and ethical medical standards without unnecessary interventions.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="text-lg font-black text-[#062B63] uppercase">Compassion with Dignity</h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Treating every patient and family with empathy, cultural sensitivity, clear communication, and uncompromised personal dignity.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="text-lg font-black text-[#062B63] uppercase">Universal Accessibility</h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Democratizing advanced cardiovascular sciences so that rural, semi-urban, and economically disadvantaged patients can access life-saving care.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="text-lg font-black text-[#062B63] uppercase">Continuous Quality</h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Pursuing NABH/NABL accreditation benchmarks, zero-infection protocols, rigorous clinical audits, and ongoing medical workforce education.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="text-lg font-black text-[#062B63] uppercase">Research & Innovation</h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Bridging medical practice with applied cardiology research, digital health innovations, and AI diagnostics to elevate treatment efficacy.
                </p>
              </div>
            </div>
          </div>

          {/* Section 7: Section Navigation Actions */}
          <div className="border-t border-slate-200 pt-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-4">
              <Button asChild className="btn-primary px-7 py-3 text-xs font-bold uppercase tracking-wider rounded-xl shadow-sm">
                <Link to="/ventures/healthcare/leadership">
                  Clinical Leadership <ArrowRight size={14} className="ml-2" />
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
              <span className="text-[11px] font-bold text-slate-500 uppercase block">Platform Acquisition</span>
              <span className="text-lg sm:text-xl font-black text-[#062B63]">Q2 2025 (Nigam Health Care)</span>
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase block">Clinical Core</span>
              <span className="text-lg sm:text-xl font-black text-[#062B63]">Cardiovascular Sciences</span>
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase block">Flagship Hospital</span>
              <span className="text-lg sm:text-xl font-black text-[#062B63]">500 Beds (300 Cardiac)</span>
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase block">Defining Ambition</span>
              <span className="text-lg sm:text-xl font-black text-[#062B63]">Zero Preventable Cardiac Deaths</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HealthcareOverview;
