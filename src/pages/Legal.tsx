import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ShieldCheck, Mail, Phone, MapPin, ChevronRight, FileText, Scale } from "lucide-react";

const Legal: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;

  // Determine active document
  let docType = "all";
  if (path.includes("/privacy")) docType = "privacy";
  else if (path.includes("/terms")) docType = "terms";
  else if (path.includes("/disclaimer")) docType = "disclaimer";
  else if (path.includes("/code-of-conduct") || path.includes("/policy")) docType = "policy";
  else if (path.includes("/whistleblower")) docType = "whistleblower";
  else if (path.includes("/procurement") || path.includes("/flow")) docType = "procurement";

  return (
    <div className="bg-white text-slate-900 font-sans antialiased min-h-screen pt-28 sm:pt-36 pb-24 selection:bg-slate-200">
      <div className="max-w-[860px] mx-auto px-5 sm:px-8">
        
        {/* Document Header (Editorial Style) */}
        <div className="border-b border-slate-300 pb-8 mb-12">
          <div className="text-[11px] font-mono tracking-widest text-slate-500 uppercase mb-2">
            Official Institutional Repository • Rashtra Bharosa Group Limited
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-slate-900 font-normal tracking-tight leading-tight">
            {docType === "privacy" && "Privacy & Personal Data Protection Policy"}
            {docType === "terms" && "Terms & Conditions of Digital Engagement"}
            {docType === "disclaimer" && "Corporate Policy & Statutory Disclaimer"}
            {docType === "policy" && "Corporate Code of Business Conduct & Ethics"}
            {docType === "whistleblower" && "Whistleblower Policy & Vigil Mechanism"}
            {docType === "procurement" && "Procurement Flow & Supplier Empanelment Governance"}
            {docType === "all" && "Corporate Governance, Statutory Policies & Legal Disclosures"}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-500 font-mono">
            <span>Jurisdiction: Bhubaneswar, Odisha, India</span>
            <span>•</span>
            <span>Effective Date: 1st April 2025</span>
            <span>•</span>
            <span>Document Ref: RBG-GOV-STATUTORY-2025/26</span>
          </div>
        </div>

        {/* Legal Document Body (Long-Form Monochromatic Editorial Paper) */}
        <div className="space-y-16 text-[13.5px] sm:text-[14px] text-slate-700 leading-relaxed font-serif">

          {/* SECTION: PRIVACY POLICY */}
          {(docType === "all" || docType === "privacy") && (
            <article className="space-y-6">
              <div className="border-b border-slate-200 pb-2">
                <span className="text-xs font-mono text-slate-400 block mb-1">PART I — STATUTORY PRIVACY COVENANT</span>
                <h2 className="text-xl font-sans font-bold text-slate-900 tracking-tight">
                  1. Privacy & Data Protection Framework
                </h2>
              </div>
              <p>
                Rashtra Bharosa Group Limited and its operational subsidiaries (collectively "Rashtra Bharosa", "the Group", "we", "us", or "our") operate in strict fidelity to the Digital Personal Data Protection Act, 2023 (DPDP Act) and sovereign Indian regulatory requirements. This document details the exact nature of data collection, processing, storage, and rights afforded to visitors, corporate partners, empanelled vendors, job candidates, and institutional stakeholders across our web portals.
              </p>

              <div className="space-y-3 font-sans">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">1.1 Scope of Data Collection</h3>
                <p className="text-slate-600 font-serif">
                  We process data provided explicitly through electronic application conduits:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-slate-600 font-serif">
                  <li><strong>Stakeholder Communications:</strong> Full legal name, corporate designation, email address, direct telephone contacts, organization name, and correspondence records submitted via official inquiry forms.</li>
                  <li><strong>Procurement & Vendor Dossiers:</strong> Company incorporation certificate, Goods and Services Tax Identification Number (GSTIN), Permanent Account Number (PAN), Registered Office Address, Class C1–C5 vendor classification, audited annual turnover records, and certified factory capacity certificates.</li>
                  <li><strong>Employment & Candidate ATS:</strong> Professional curriculum vitae, past compensation history, university academic transcripts, government identity cards, and verification references.</li>
                  <li><strong>Media Accreditation & Brand Vault:</strong> Press credential certificates, publication masthead affiliations, and designated usage purpose for downloading high-resolution vector brand assets.</li>
                  <li><strong>Server Telemetry:</strong> Anonymized network headers, IP routing data, browser client strings, and timestamp logs maintained solely for system integrity and DDoS mitigation.</li>
                </ul>
              </div>

              <div className="space-y-3 font-sans">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">1.2 Lawful Purpose of Processing</h3>
                <p className="text-slate-600 font-serif">
                  All collected records are processed strictly under legitimate institutional interest, contractual execution, procurement tender evaluation, compliance with statutory agencies (Ministry of Corporate Affairs, Directorate General of Mines Safety, Real Estate Regulatory Authority, GSTN), or processing grievance redressals. The Group maintains an absolute prohibition against commercializing, trading, renting, or selling stakeholder information.
                </p>
              </div>

              <div className="space-y-3 font-sans">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">1.3 Enterprise Data Security & Storage</h3>
                <p className="text-slate-600 font-serif">
                  Electronic records are housed on ISO/IEC 27001-certified sovereign data centers located within Indian national territory. Data transmission is secured using Transport Layer Security (TLS 1.3) with 256-bit AES encryption at rest. Internal database access is restricted through multi-factor cryptographic keys and role-based access protocols.
                </p>
              </div>

              <div className="space-y-3 font-sans">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">1.4 Rights of the Data Principal</h3>
                <p className="text-slate-600 font-serif">
                  Stakeholders maintain the right to review, update, rectify, or request the erasure of their stored records, subject to statutory procurement audit tenures. Privacy inquiries may be addressed to our Data Governance Secretariat at <strong>dpo@rashtrabharosagroup.com</strong>.
                </p>
              </div>
            </article>
          )}

          {/* SECTION: TERMS AND CONDITIONS */}
          {(docType === "all" || docType === "terms") && (
            <article className="space-y-6">
              <div className="border-b border-slate-200 pb-2">
                <span className="text-xs font-mono text-slate-400 block mb-1">PART II — DIGITAL ENGAGEMENT COVENANT</span>
                <h2 className="text-xl font-sans font-bold text-slate-900 tracking-tight">
                  2. Terms and Conditions of Digital Usage
                </h2>
              </div>
              <p>
                By navigating, viewing, accessing, or transmitting communications across the digital premises of Rashtra Bharosa Group Limited (rashtrabharosagroup.com) or its subsidiary domains, you agree to be bound by these Terms and Conditions in their entirety.
              </p>

              <div className="space-y-3 font-sans">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">2.1 Intellectual Property & Sovereign Trademarks</h3>
                <p className="text-slate-600 font-serif">
                  All trademarks, crests, vector seals, logotypes ("Rashtra Bharosa Group", "RashBhar Mining", "Innovex Construction", "RashBhar Real Estate", "RashBhar Soil & Soul", "RashBhar Technology", "RashBhar Health Care", "Royal Birds Group", "RashtrAI", "VED Ri", "AgriGel™"), architectural renderings, technical drawings, corporate dossiers, and source code are the sole intellectual property of Rashtra Bharosa Group Limited. Any unauthorized copying, mirroring, modification, scraping, or commercial exploitation is strictly prohibited under the Indian Copyright Act, 1957 and Trade Marks Act, 1999.
                </p>
              </div>

              <div className="space-y-3 font-sans">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">2.2 Permitted Use and Prohibitions</h3>
                <p className="text-slate-600 font-serif">
                  Users are granted a revocable, non-exclusive license for legitimate informational review, procurement tender participation, employment application, and accredited media reporting. Users shall not attempt penetration testing, script injection, DDoS attacks, or automated extraction without express written authorization from the Corporate Secretariat.
                </p>
              </div>

              <div className="space-y-3 font-sans">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">2.3 Jurisdiction and Dispute Resolution</h3>
                <p className="text-slate-600 font-serif">
                  These Terms are governed by the laws of the Republic of India. All disputes arising in relation to these Terms shall be subject to the exclusive jurisdiction of the competent courts in Bhubaneswar, Odisha.
                </p>
              </div>
            </article>
          )}

          {/* SECTION: COMPANY POLICY & CODE OF CONDUCT */}
          {(docType === "all" || docType === "policy") && (
            <article className="space-y-6">
              <div className="border-b border-slate-200 pb-2">
                <span className="text-xs font-mono text-slate-400 block mb-1">PART III — CORPORATE GOVERNANCE & ETHICS</span>
                <h2 className="text-xl font-sans font-bold text-slate-900 tracking-tight">
                  3. Corporate Code of Business Conduct & Ethics
                </h2>
              </div>
              <p>
                Rashtra Bharosa Group operates under an uncompromising mandate of sovereign integrity, zero harm safety, financial fidelity, and environmental stewardship across all operating divisions.
              </p>

              <div className="space-y-3 font-sans">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">3.1 Anti-Bribery & Corruption Mandate</h3>
                <p className="text-slate-600 font-serif">
                  The Group enforces a zero-tolerance policy against direct or indirect bribery, facilitation payments, kickbacks, or inappropriate corporate gifts. All business engagements must reflect transparent fair-market value under documented agreements.
                </p>
              </div>

              <div className="space-y-3 font-sans">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">3.2 Occupational Health, Safety & Environment (HSE)</h3>
                <p className="text-slate-600 font-serif">
                  Every industrial operation—spanning deep-pit mining concessions in Odisha, heavy EPC civil infrastructure flyovers, chemical agricultural polymer plants, and clinical tertiary healthcare facilities—is governed by mandatory Zero Harm protocols, personal protective equipment (PPE) compliance, and continuous biological reclamation.
                </p>
              </div>

              <div className="space-y-3 font-sans">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">3.3 Tax Transparency & Statutory Compliance</h3>
                <p className="text-slate-600 font-serif">
                  100% adherence to central and state tax regimes, mining royalties, labor welfare funds, provident fund contributions, and environmental monitoring reporting.
                </p>
              </div>
            </article>
          )}

          {/* SECTION: PROCUREMENT FLOW */}
          {(docType === "all" || docType === "procurement") && (
            <article className="space-y-6">
              <div className="border-b border-slate-200 pb-2">
                <span className="text-xs font-mono text-slate-400 block mb-1">PART IV — SUPPLY CHAIN & TENDER PROTOCOL</span>
                <h2 className="text-xl font-sans font-bold text-slate-900 tracking-tight">
                  4. Procurement Flow & Supplier Empanelment Governance
                </h2>
              </div>
              <p>
                To maintain transparency, equity, and operational excellence across annual procurement cycles, Rashtra Bharosa Group governs supplier onboarding through a mandatory 5-phase institutional protocol:
              </p>

              <div className="space-y-4 font-sans text-slate-800">
                <div className="p-4 bg-slate-50 border border-slate-200 space-y-1">
                  <strong className="text-xs text-slate-900 uppercase tracking-wider block">Phase 01: Digital Vendor Verification</strong>
                  <p className="text-xs text-slate-600 font-serif">
                    Prospective partners register official business entities by providing valid GSTIN, PAN, Class C1–C5 classification, 3-year audited balance sheets, ISO certificates, and factory capacity declarations via the centralized portal.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 space-y-1">
                  <strong className="text-xs text-slate-900 uppercase tracking-wider block">Phase 02: Technical & Statutory Due Diligence</strong>
                  <p className="text-xs text-slate-600 font-serif">
                    The Central Supply Chain Directorate reviews tax filings, manufacturing quality standards (ISO 9001, 14001, 45001), credit health ratings, and past performance benchmarks.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 space-y-1">
                  <strong className="text-xs text-slate-900 uppercase tracking-wider block">Phase 03: Two-Envelope Tender Bidding</strong>
                  <p className="text-xs text-slate-600 font-serif">
                    Empanelled suppliers receive encrypted requests for proposal (RFPs) and submit independent Technical and Commercial envelopes via authenticated cryptographic channels.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 space-y-1">
                  <strong className="text-xs text-slate-900 uppercase tracking-wider block">Phase 04: Central Evaluation & Reverse Auction</strong>
                  <p className="text-xs text-slate-600 font-serif">
                    The Procurement Committee conducts blind technical scoring followed by transparent commercial evaluation and, where applicable, electronic reverse auction rounds.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 space-y-1">
                  <strong className="text-xs text-slate-900 uppercase tracking-wider block">Phase 05: Letter of Award (LOA) & ERP Integration</strong>
                  <p className="text-xs text-slate-600 font-serif">
                    Execution of master commercial purchase agreements, performance bank guarantees (PBG), and onboarding into enterprise SAP/ERP automated invoice settlement cycles.
                  </p>
                </div>
              </div>
            </article>
          )}

          {/* SECTION: POLICY & CORPORATE DISCLAIMER */}
          {(docType === "all" || docType === "disclaimer") && (
            <article className="space-y-6">
              <div className="border-b border-slate-200 pb-2">
                <span className="text-xs font-mono text-slate-400 block mb-1">PART V — STATUTORY & REGULATORY DISCLAIMERS</span>
                <h2 className="text-xl font-sans font-bold text-slate-900 tracking-tight">
                  5. Corporate Disclaimer & Forward-Looking Statements
                </h2>
              </div>
              <p>
                The information, metrics, and project depictions presented across this portal are compiled for institutional transparency and stakeholder communication.
              </p>

              <div className="space-y-3 font-sans">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">5.1 Forward-Looking Information</h3>
                <p className="text-slate-600 font-serif">
                  Statements regarding projected mineral extraction capacities, infrastructure delivery schedules, hospital bed rollouts, real estate completions, and capital investments constitute forward-looking expectations. These statements involve operational, economic, and regulatory variables and do not represent guaranteed commercial warranties.
                </p>
              </div>

              <div className="space-y-3 font-sans">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">5.2 Real Estate & Architectural Renderings</h3>
                <p className="text-slate-600 font-serif">
                  Visual walk-throughs, elevation drawings, and artist impressions of RashBhar Real Estate & Infrastructures developments (including Reyansh Elanza and Sovereign Heights) are conceptual representations. Developments comply with registered State RERA approvals and sanctioned municipal plans.
                </p>
              </div>

              <div className="space-y-3 font-sans">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">5.3 Fraudulent Hiring & Tender Advisory</h3>
                <p className="text-slate-600 font-serif">
                  Rashtra Bharosa Group never requests fees, security deposits, or bank transfers during recruitment or vendor empanelment. Official correspondence is dispatched exclusively from verified <strong>@rashtrabharosagroup.com</strong> mail servers.
                </p>
              </div>
            </article>
          )}

          {/* SECTION: WHISTLEBLOWER POLICY */}
          {(docType === "all" || docType === "whistleblower") && (
            <article className="space-y-6">
              <div className="border-b border-slate-200 pb-2">
                <span className="text-xs font-mono text-slate-400 block mb-1">PART VI — VIGIL MECHANISM</span>
                <h2 className="text-xl font-sans font-bold text-slate-900 tracking-tight">
                  6. Whistleblower & Confidential Vigil Mechanism
                </h2>
              </div>
              <p>
                The Group provides an independent, confidential vigil conduit overseen by the Audit Committee of the Board of Directors, ensuring employees, contractors, and stakeholders can report ethical violations without fear of retribution.
              </p>

              <div className="space-y-3 font-sans">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">6.1 Reportable Matters</h3>
                <p className="text-slate-600 font-serif">
                  Suspected financial misappropriation, fraudulent billing, bid tampering, safety compromises, workplace discrimination, or unauthorized disclosure of proprietary corporate assets.
                </p>
              </div>

              <div className="space-y-3 font-sans">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">6.2 Reporting Coordinates</h3>
                <p className="text-slate-600 font-serif">
                  Disclosures may be transmitted directly to the Independent Ethics Ombudsman:
                </p>
                <div className="p-4 bg-slate-50 border border-slate-200 text-xs font-mono space-y-1 text-slate-800">
                  <div>Email: ethics@rashtrabharosagroup.com</div>
                  <div>Direct Ombudsman: ombudsman@rashtrabharosagroup.com</div>
                  <div>Postal Address: Office of the Independent Ethics Ombudsman, Rashtra Bharosa Group Limited, B1/1-6, Bhimpur, Forest Park, Bhubaneswar — 751009, Odisha, India.</div>
                </div>
              </div>
            </article>
          )}

        </div>

        {/* Editorial Footer / Document Endorsement */}
        <div className="mt-20 pt-8 border-t border-slate-300 text-xs text-slate-500 font-sans space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <strong className="text-slate-800 block">Issued by Authority of the Board of Directors</strong>
              Corporate Secretariat & Executive Legal Directorate, Rashtra Bharosa Group Limited
            </div>
            <div className="font-mono text-slate-400 text-[11px]">
              Bhubaneswar • New Delhi • Mumbai
            </div>
          </div>
          <p className="text-[11px] text-slate-400 pt-2">
            This digital publication constitutes an authentic corporate disclosure under applicable statutory enactments. All rights reserved.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Legal;



