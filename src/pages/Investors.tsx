import React from "react";
import { Link } from "react-router-dom";
import {
  Building2,
  TrendingUp,
  ShieldCheck,
  FileText,
  Download,
  Calendar,
  CheckCircle2,
  Lock,
  ArrowRight,
  Landmark,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Investors = () => {
  return (
    <div className="bg-white text-[#1F2937] font-sans">
      {/* Hero Header */}
      <section className="bg-[#062B63] text-white py-20 lg:py-24 relative overflow-hidden">
        <div className="section-container relative z-10 max-w-4xl text-center mx-auto">
          <div className="section-badge mb-4 mx-auto">
            <Landmark size={14} /> Investor Relations & Capital Stewardship
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
            Investor Relations
          </h1>
          <p className="text-lg md:text-xl text-white/85 leading-relaxed font-normal">
            Rashtra Bharosa Group follows a promoter-led, disciplined capital allocation framework focused on multi-generational value creation and robust risk oversight.
          </p>
        </div>
      </section>

      {/* Capital Structure & Strategic Foundation */}
      <section className="py-20 bg-white border-b border-[#E5E7EB]">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="section-badge-blue">
                <ShieldCheck size={14} /> Ownership Model
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#062B63] tracking-tight">
                Promoter Stewardship & Financial Independence
              </h2>
              <p className="text-base text-[#6B7280] leading-relaxed">
                As a promoter-controlled industrial conglomerate, Rashtra Bharosa Group is built with a long-term mindset. We prioritize financial discipline, operational cash flow reinvestment, and resilient balance sheets over short-term market speculation.
              </p>
              <p className="text-base text-[#6B7280] leading-relaxed">
                Our flagship natural resource extraction operations generate stable long-term cash flow that supports measured capital deployment into healthcare infrastructure, sovereign technologies, and sustainable agriculture.
              </p>

              <div className="pt-2">
                <Button asChild className="btn-primary px-6 py-2.5 text-xs font-semibold rounded-md">
                  <Link to="/about#governance">
                    Review Governance Disclosures →
                  </Link>
                </Button>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="bg-[#062B63] text-white p-8 rounded-xl shadow-xl space-y-5">
                <h3 className="text-xl font-bold text-brand-gold">
                  Corporate Information Summary
                </h3>
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-white/70">Legal Entity:</span>
                    <span className="font-semibold text-white">Rashtra Bharosa Group Limited</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-white/70">Registered State:</span>
                    <span className="font-semibold text-white">Odisha, India</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-white/70">Primary Industrial Sector:</span>
                    <span className="font-semibold text-white">Natural Resources & Infrastructure</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Audit Framework:</span>
                    <span className="font-semibold text-brand-green">Statutory Compliant</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Disclosures & Institutional Contact */}
      <section className="py-20 bg-[#F8F9FB]">
        <div className="section-container">
          <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-2xl border border-[#E5E7EB] shadow-md flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <div className="text-xs font-bold text-primary uppercase tracking-wider mb-1">
                Institutional Investors & Banks
              </div>
              <h3 className="text-2xl font-bold text-[#062B63] tracking-tight">
                Connect with the Treasury & Corporate Affairs Office
              </h3>
              <p className="text-xs sm:text-sm text-[#6B7280] mt-2 max-w-lg">
                Financial institutions, rating agencies, and strategic joint-venture partners may request formal briefings and documentation directly from the CFO's office.
              </p>
            </div>
            <Button asChild className="btn-primary px-6 py-3 text-xs font-semibold rounded-md shrink-0">
              <Link to="/contact">
                Investor Contact Channel →
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Investors;
