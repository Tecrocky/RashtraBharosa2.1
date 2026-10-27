import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sprout, Sun, ShieldCheck, TreeDeciduous, PackageCheck, Eye, Target, Sparkles, CheckCircle2, HeartHandshake, Microscope, Truck } from "lucide-react";
import VentureSubnav from "@/components/ventures/VentureSubnav";
import { Button } from "@/components/ui/button";

// Assets
import agriVideo from "@/assets/VIDEOS/Agricultural land cinematic beauty.mp4";
import soilImg from "@/assets/soil.jpg";
import agriLogo from "@/assets/Subsidiary-logos/soil-logo.png";
import agriHighlightImg from "@/assets/highlights/agri-highlight.jpg";

const AgriOverview: React.FC = () => {
  return (
    <div className="bg-white text-slate-900 font-sans antialiased min-h-screen selection:bg-[#062B63] selection:text-white">
      {/* Hero Section with Cinematic Background Video */}
      <section className="relative pt-44 pb-12 lg:pt-56 lg:pb-16 overflow-hidden flex items-end min-h-[460px] lg:min-h-[500px] bg-[#041633]">
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent z-0 pointer-events-none"></div>

        <div className="max-w-[1500px] w-full mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
          <div className="max-w-5xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-black/50 text-brand-gold border border-white/20 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse"></span>
              <span>Agriculture Division of Rashtra Bharosa Group</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 pt-1">
              <div className="bg-white/95 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-white/40 shadow-2xl inline-flex items-center justify-center w-fit">
                <img
                  src={agriLogo}
                  alt="RashBhar Soil & Soul Logo"
                  className="h-16 sm:h-20 md:h-24 w-auto max-w-[280px] sm:max-w-[340px] object-contain"
                />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight drop-shadow-lg uppercase">
                  RashBhar Soil & Soul
                </h1>
                <p className="text-sm sm:text-base font-semibold text-slate-200 uppercase tracking-widest mt-1">
                  Soil Science • Sustainable Agriculture • Processing & Rural Prosperity
                </p>
              </div>
            </div>

            {/* Quick Hero CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Button asChild className="btn-primary px-6 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg">
                <Link to="/ventures/agriculture/leadership">
                  Agriculture Leadership <ArrowRight size={13} className="ml-1.5" />
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
      <VentureSubnav basePath="/ventures/agriculture" companyName="RashBhar Soil & Soul" logo={agriLogo} />

      {/* Main Corporate Editorial Content */}
      <main className="py-14 lg:py-20 bg-white">
        <div className="max-w-[1500px] w-full mx-auto px-4 sm:px-8 lg:px-12 space-y-20">
          
          {/* Section 1: Executive Corporate Narrative & Institutional Genesis */}
          <div className="space-y-8">
            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-widest text-[#062B63]">
                Corporate Profile & Agrarian Foundation
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight uppercase leading-tight">
                From Soil Health to Farmer Prosperity
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 text-base sm:text-lg leading-relaxed text-slate-700">
              <div className="space-y-5">
                <p className="text-lg sm:text-xl text-slate-900 font-medium leading-relaxed">
                  <strong>RashBhar Soil & Soul</strong> is the <strong>Agriculture Division of Rashtra Bharosa Group</strong>, established to build the Group’s long-term presence in agriculture and to develop modern, sustainable, science-led and commercially viable agricultural value chains in India.
                </p>

                <p>
                  The company carries forward the agricultural foundation of <strong>Bharat Agro</strong>, an agricultural products enterprise dating back to <strong>2000</strong>. Following its acquisition by Rashtra Bharosa Group in <strong>Q3 2025</strong>, the business was restructured with a wider ecosystem perspective:
                </p>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold text-slate-800 space-y-1.5">
                  <p>• <strong>From agricultural products to agricultural systems.</strong></p>
                  <p>• <strong>From individual transactions to long-term value chains.</strong></p>
                  <p>• <strong>From production alone to production, processing, markets and rural prosperity.</strong></p>
                </div>
              </div>

              <div className="space-y-5">
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <h4 className="text-sm font-black text-[#062B63] uppercase tracking-wider">Why "Soil & Soul"?</h4>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <strong>Soil</strong> represents the physical and biological foundation of agriculture—determining water retention, nutrient dynamics, and long-term land productivity.
                  </p>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <strong>Soul</strong> represents the people behind agriculture—farmers, agricultural workers, farming families, and rural communities.
                  </p>
                  <p className="text-xs sm:text-sm font-bold text-slate-900 pt-1 border-t border-slate-200">
                    "Agricultural progress must improve both the condition of the soil and the prosperity of the people who depend upon it."
                  </p>
                </div>

                <p>
                  Under our working principle <strong>"Innovation for Yield"</strong>, innovation is pursued strictly to solve practical field problems, enhance crop resilience, and generate measurable economic value for Indian farmers.
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: Integrated Value Chain Architecture */}
          <div className="p-8 sm:p-12 rounded-3xl bg-[#041633] text-white space-y-8 shadow-2xl border border-white/10">
            <div className="max-w-3xl space-y-2">
              <div className="text-xs font-bold text-brand-gold uppercase tracking-widest">
                Our Operating Continuum
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight">
                The Integrated Agrarian Value Chain
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Agriculture is not an isolated field activity, but an interconnected economic system. Every stage directly reinforces the next:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <span className="text-xs font-black text-brand-gold">STAGE 01</span>
                <h4 className="text-base font-bold text-white uppercase">Soil Science & R&D</h4>
                <p className="text-xs text-slate-300 leading-relaxed">Soil moisture research, root-zone bio-polymer enhancement (AgriGel™), and agronomic testing.</p>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <span className="text-xs font-black text-brand-gold">STAGE 02</span>
                <h4 className="text-base font-bold text-white uppercase">Farmer Clusters</h4>
                <p className="text-xs text-slate-300 leading-relaxed">Certified organic cultivation, high-yield seed inputs, and field training across Jharkhand and Eastern India.</p>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <span className="text-xs font-black text-brand-gold">STAGE 03</span>
                <h4 className="text-base font-bold text-white uppercase">Processing & Cold Chain</h4>
                <p className="text-xs text-slate-300 leading-relaxed">Solar drying, automated sorting/grading, CA/MA cold storage, and batch-level quality traceability.</p>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <span className="text-xs font-black text-brand-gold">STAGE 04</span>
                <h4 className="text-base font-bold text-white uppercase">Market Realization</h4>
                <p className="text-xs text-slate-300 leading-relaxed">Direct institutional off-take pipelines, guaranteed minimum buyback, and rural wealth creation.</p>
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
                  To contribute to a stronger agricultural future for India by improving the connection between healthy soil, productive farming, modern technology, sustainable practices, efficient value chains, and prosperous farming communities.
                </p>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  We aim to build an agriculture enterprise that is:
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs font-bold text-slate-800">
                  <div className="p-2.5 rounded-lg bg-white border border-slate-200">• Scientifically Grounded</div>
                  <div className="p-2.5 rounded-lg bg-white border border-slate-200">• Technologically Enabled</div>
                  <div className="p-2.5 rounded-lg bg-white border border-slate-200">• Operationally Disciplined</div>
                  <div className="p-2.5 rounded-lg bg-white border border-slate-200">• Commercially Sustainable</div>
                  <div className="p-2.5 rounded-lg bg-white border border-slate-200">• Environmentally Responsible</div>
                  <div className="p-2.5 rounded-lg bg-white border border-slate-200">• Farmer-Centered</div>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-200 text-xs font-bold text-[#062B63] uppercase tracking-wider">
                Long-Term Agrarian Foundation
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
                  Our mission is to develop and operate modern agricultural businesses and value chains that improve productivity, strengthen resilience, create market opportunities, and generate durable value:
                </p>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-[#062B63] shrink-0 mt-0.5" />
                    <span>Executing "Innovation for Yield" to solve real agronomic and water-stress challenges.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-[#062B63] shrink-0 mt-0.5" />
                    <span>Establishing organized organic clusters in the Jharkhand tribal belt and Eastern India.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-[#062B63] shrink-0 mt-0.5" />
                    <span>Developing post-harvest cold chain and processing infrastructure to eliminate perishables waste.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-[#062B63] shrink-0 mt-0.5" />
                    <span>Validating AgriGel™ soil enhancer under a strict <em>"Do not claim first. Prove first"</em> protocol.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-[#062B63] shrink-0 mt-0.5" />
                    <span>Empowering rural women and smallholder farmers as active stakeholders in economic value creation.</span>
                  </li>
                </ul>
              </div>
              <div className="pt-4 border-t border-slate-200 text-xs font-bold text-[#062B63] uppercase tracking-wider">
                Innovation for Yield
              </div>
            </div>
          </div>

          {/* Section 4: Full-Width Institutional Media Banner */}
          <div className="w-full">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 aspect-[21/8] bg-slate-900">
              <img
                src={soilImg}
                alt="RashBhar Soil & Soul Organic Agriculture Operations"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none"></div>
              <div className="absolute bottom-6 left-8 text-white">
                <div className="text-xs font-bold text-brand-gold uppercase tracking-widest">
                  Regenerative Agritech • Direct Farmer Prosperity
                </div>
                <div className="text-sm sm:text-base font-bold text-white uppercase tracking-wider mt-0.5">
                  AgriGel™ Moisture Retention • Certified Organic Clusters • Cold Storage & Value Addition
                </div>
              </div>
            </div>
          </div>

          {/* Section 5: Comprehensive Core Values */}
          <div className="space-y-8 border-t border-slate-200 pt-12">
            <div className="max-w-3xl space-y-2">
              <div className="text-xs font-bold uppercase tracking-widest text-[#062B63]">
                Agrarian Philosophy
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase">
                Our Core Values
              </h2>
              <p className="text-sm text-slate-600">
                The institutional values governing scientific research, farmer relationships, and commercial operations:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="text-lg font-black text-[#062B63] uppercase">Farmer-Centered Thinking</h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Agricultural development must create tangible economic and social value for farmers, rural families, and tribal farming communities.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="text-lg font-black text-[#062B63] uppercase">Scientific Discipline</h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Agricultural claims, technologies, and practices are developed and validated through controlled multi-season field evidence.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="text-lg font-black text-[#062B63] uppercase">Innovation With Purpose</h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Innovation is pursued to solve practical agrarian problems—improving water retention, crop yields, and post-harvest preservation.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="text-lg font-black text-[#062B63] uppercase">Sustainability</h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Soil, water, land, and biodiversity are treated as precious long-term assets that must be preserved and enhanced for future generations.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="text-lg font-black text-[#062B63] uppercase">Integrity & Transparency</h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Trust, fair pricing, prompt buyback settlements, and responsible commercial conduct are fundamental to long-term farmer partnerships.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="text-lg font-black text-[#062B63] uppercase">Operational Excellence</h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Agronomic concepts and lab formulations must translate into reliable, disciplined, field-level execution across rural India.
                </p>
              </div>
            </div>
          </div>

          {/* Section 6: Section Navigation Actions */}
          <div className="border-t border-slate-200 pt-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-4">
              <Button asChild className="btn-primary px-7 py-3 text-xs font-bold uppercase tracking-wider rounded-xl shadow-sm">
                <Link to="/ventures/agriculture/leadership">
                  Agriculture Leadership <ArrowRight size={14} className="ml-2" />
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
              <span className="text-[11px] font-bold text-slate-500 uppercase block">Heritage</span>
              <span className="text-lg sm:text-xl font-black text-[#062B63]">Bharat Agro (Est. 2000)</span>
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase block">Working Principle</span>
              <span className="text-lg sm:text-xl font-black text-[#062B63]">Innovation for Yield</span>
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase block">R&D Formulation</span>
              <span className="text-lg sm:text-xl font-black text-[#062B63]">AgriGel™ Soil Enhancer</span>
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase block">Core Model</span>
              <span className="text-lg sm:text-xl font-black text-[#062B63]">Organic Clusters & Processing</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AgriOverview;
