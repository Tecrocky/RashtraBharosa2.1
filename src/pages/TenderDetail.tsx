import React, { useState, useEffect } from "react";
import { useParams, Link, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  Building2,
  Calendar,
  MapPin,
  FileText,
  Download,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Send,
  AlertCircle,
  Copy,
  Check,
  ChevronRight,
  ExternalLink,
  IndianRupee,
  FileCheck,
  Printer,
  HelpCircle,
  Layers,
  Lock,
  Upload,
  UserCheck,
  Hash,
  FileSpreadsheet,
  QrCode,
  Paperclip,
  CreditCard,
  Smartphone,
  Zap,
  ShieldAlert,
  Shield,
  FileBadge,
  CheckCircle,
} from "lucide-react";
import {
  initialTenders,
  initialSuppliers,
  initialApplications,
  initialBids,
  initialNotifications,
  standardDocumentRequirements,
  TenderNotice,
  SupplierProfile,
  TenderApplication,
  BidSubmission,
  TenderNotification,
} from "@/data/tendersData";
import logo from "@/assets/logo.png";
import tendersHeroVideo from "@/assets/VIDEOS/Tenders & Opportunities.mp4";
import { generateReferenceId, dispatchConfirmationNotification } from "@/lib/trackingService";
import { getTenderBySlug, submitTenderBid } from "@/services/cmsService";
import MetaTags from "@/components/MetaTags";

const TenderDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const shouldOpenApply = searchParams.get("action") === "apply";

  const [tender, setTender] = useState<TenderNotice | null>(null);
  const [copiedId, setCopiedId] = useState(false);

  // Application Modal Engine State
  const [showApplyModal, setShowApplyModal] = useState(shouldOpenApply);
  const [applyStep, setApplyStep] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);

  // Suppliers & App Data
  const [suppliers] = useState<SupplierProfile[]>(() => {
    const saved = localStorage.getItem("rbg_suppliers_data");
    return saved ? JSON.parse(saved) : initialSuppliers;
  });

  const [notifications] = useState<TenderNotification[]>(() => {
    const saved = localStorage.getItem("rbg_tender_notifications");
    return saved ? JSON.parse(saved) : initialNotifications;
  });

  // Step 1: Supplier ID Selection / Input
  const [inputSupplierId, setInputSupplierId] = useState("RBG-SUP-000184");
  const [matchedSupplier, setMatchedSupplier] = useState<SupplierProfile | null>(null);

  // Step 2: Application No & EMD Security Verification
  const [generatedAppNo, setGeneratedAppNo] = useState<string>("");
  const [emdMode, setEmdMode] = useState<"bank_guarantee" | "pay_online" | "exempt_msme">("bank_guarantee");
  const [bgRefNumber, setBgRefNumber] = useState("BG/2026/SBI/884912");

  // Step 3: Technical & Commercial Bid Details
  const [bidForm, setBidForm] = useState({
    quoteAmount: "",
    timelineMonths: "",
    technicalSummary: "",
  });

  // Step 4: Documents Upload & Vault Simulator State
  const [docUploads, setDocUploads] = useState<Record<string, { attached: boolean; fileName: string; fileSize: string; docRef: string }>>(() => {
    const initial: Record<string, { attached: boolean; fileName: string; fileSize: string; docRef: string }> = {};
    standardDocumentRequirements.forEach((d, idx) => {
      initial[d.code] = {
        attached: true,
        fileName: `${d.code}_Verified_Scan.pdf`,
        fileSize: `${(1.2 + (idx * 0.4)).toFixed(1)} MB`,
        docRef: `RBG-DOC-2026-00${1880 + idx}`,
      };
    });
    return initial;
  });

  // Step 5: Declarations
  const [declarations, setDeclarations] = useState({
    integrityPact: true,
    nonBlacklisted: true,
    technicalConformance: true,
  });

  // Step 6: Confirmation & Final Sealed Receipt State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [finalBidSubmission, setFinalBidSubmission] = useState<BidSubmission | null>(null);

  // Find matching tender by slug or ID with deep normalization and cloud lookup
  useEffect(() => {
    const fetchTender = async () => {
      if (!slug) return;
      const matched = await getTenderBySlug(slug);
      if (matched) {
        setTender(matched);
        const numMatch = (matched.estimatedValue || "").match(/\d+(\.\d+)?/);
        if (numMatch) {
          setBidForm((prev) => ({
            ...prev,
            quoteAmount: numMatch[0],
            timelineMonths: matched.contractPeriod || "12 Months",
            technicalSummary: `Turnkey execution adhering strictly to ${matched.title} technical specifications, environmental protocols, and schedule.`,
          }));
        }
      }
    };
    fetchTender();
  }, [slug]);

  useEffect(() => {
    if (shouldOpenApply) {
      setShowApplyModal(true);
    }
  }, [shouldOpenApply]);

  // Match supplier as ID changes
  useEffect(() => {
    if (!inputSupplierId) {
      setMatchedSupplier(null);
      return;
    }
    const found = suppliers.find(
      (s) => s.supplierId.trim().toUpperCase() === inputSupplierId.trim().toUpperCase()
    );
    setMatchedSupplier(found || null);
  }, [inputSupplierId, suppliers]);

  const handleCopyId = () => {
    if (tender) {
      navigator.clipboard.writeText(tender.id);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  // Step 1 -> Step 2
  const handleProceedToStep2 = () => {
    if (!matchedSupplier || !tender) return;
    const cleanTenderCode = tender.id.split("/")[1] || "NIT";
    const randNum = Math.floor(1000 + Math.random() * 9000);
    const newAppNo = `RBG-APP-2026-${cleanTenderCode}-${randNum}`;
    setGeneratedAppNo(newAppNo);
    setApplyStep(2);
  };

  // Step 2 -> Step 3: Proceed with Free Institutional Verification
  const handleProceedToStep3 = () => {
    setApplyStep(3);
  };

  // Step 3 -> Step 4
  const handleProceedToStep4 = () => {
    if (!bidForm.quoteAmount || !bidForm.timelineMonths) {
      alert("Please provide the quoted price in Crores and proposed timeline.");
      return;
    }
    setApplyStep(4);
  };

  // Step 4 -> Step 5
  const handleProceedToStep5 = () => {
    setApplyStep(5);
  };

  // Export BOQ as CSV Handler
  const handleExportBOQ = () => {
    if (!tender || !tender.boqItems) return;
    const header = "Item No,Description,Unit,Quantity,Estimated Unit Rate,Total Estimated Value\n";
    const rows = (tender.boqItems || [])
      .map((item) => `"${item.itemNo}","${item.description}","${item.unit}",${item.qty},"${item.estRate}","${item.totalEst}"`)
      .join("\n");
    const blob = new Blob([header + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `BOQ_${tender.id.replace(/[^a-zA-Z0-9]/g, "_")}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Final Submission (Step 5 -> Step 6)
  const handleFinalBidSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tender || !matchedSupplier) return;

    setIsSubmitting(true);

    const generatedBidId = generateReferenceId("tender_bid");
    const now = new Date();
    const submissionDateStr = now.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    const timestampStr = `${submissionDateStr} | ${now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })} IST`;

    // Create New Application
    const newApplication: TenderApplication = {
      applicationNo: generatedAppNo,
      tenderId: tender.id,
      supplierId: matchedSupplier.supplierId,
      companyName: matchedSupplier.companyName,
      gstin: matchedSupplier.gstin,
      contactPerson: matchedSupplier.contactPerson,
      email: matchedSupplier.email,
      phone: matchedSupplier.phone,
      tenderFeeStatus: "Exempt (0.00 Portal Access)",
      tenderFeeRef: `RBG-WAIVE-${Math.floor(100000 + Math.random() * 900000)}`,
      emdStatus: emdMode === "bank_guarantee" ? "Bank Guarantee (BG) Submitted" : emdMode === "exempt_msme" ? "Exempt (MSME)" : "Paid Online",
      emdRef: emdMode === "bank_guarantee" ? bgRefNumber : `RBG-PAY-2026-00${Math.floor(1000 + Math.random() * 9000)}`,
      applicationDate: submissionDateStr,
      stage: "Bids Submitted",
    };

    // Prepare uploaded documents array
    const uploadedDocsList = Object.keys(docUploads).map((code) => ({
      docCode: code,
      fileName: docUploads[code].fileName,
      docRef: docUploads[code].docRef,
      fileSize: docUploads[code].fileSize,
    }));

    // Create New Sealed Bid
    const newBid: BidSubmission = {
      bidSubmissionId: generatedBidId,
      applicationNo: generatedAppNo,
      tenderId: tender.id,
      supplierId: matchedSupplier.supplierId,
      companyName: matchedSupplier.companyName,
      gstin: matchedSupplier.gstin,
      contactPerson: matchedSupplier.contactPerson,
      email: matchedSupplier.email,
      phone: matchedSupplier.phone,
      quoteAmount: bidForm.quoteAmount.startsWith("₹") ? bidForm.quoteAmount : `₹ ${bidForm.quoteAmount} Crores`,
      quoteAmountNumber: parseFloat(bidForm.quoteAmount.replace(/[^0-9.]/g, "")) || 100,
      timelineMonths: bidForm.timelineMonths.includes("Months") ? bidForm.timelineMonths : `${bidForm.timelineMonths} Months`,
      technicalSummary: bidForm.technicalSummary || "Complete turnkey compliance adhering to all technical and statutory specifications.",
      uploadedDocuments: uploadedDocsList,
      submissionDate: submissionDateStr,
      submissionTimestamp: timestampStr,
      currentStage: 4,
      status: "Submitted & Sealed",
      remarks: "Bid application registered and digitally sealed into procurement vault. Forwarded for technical qualification scrutiny.",
      timelineEvents: [
        { stageNumber: 1, title: "Application Registered", date: submissionDateStr, description: `Supplier authenticated with Supplier ID ${matchedSupplier.supplierId}. Application ${generatedAppNo} generated.`, completed: true },
        { stageNumber: 2, title: "EMD & Security Verification", date: submissionDateStr, description: `Portal fee 100% Free. EMD security mode: ${emdMode} recorded.`, completed: true },
        { stageNumber: 3, title: "Document Package Uploaded", date: submissionDateStr, description: "16 mandatory statutory and technical certifications verified.", completed: true },
        { stageNumber: 4, title: "Final Sealed Bid Submitted", date: submissionDateStr, description: `Sealed commercial & technical proposals locked. Bid ID ${generatedBidId} generated.`, completed: true, current: true },
        { stageNumber: 5, title: "Technical Scrutiny", date: "Pending", description: "Technical Bid Scrutiny Board review.", completed: false },
        { stageNumber: 6, title: "Commercial Price Bid Opening", date: "Pending", description: "Commercial price bid comparative evaluation.", completed: false },
        { stageNumber: 7, title: "Tender Board Approval", date: "Pending", description: "Final award deliberation by Group Procurement Board.", completed: false },
        { stageNumber: 8, title: "Letter of Intent (LOI) Issuance", date: "Pending", description: "Contract award issuance to qualified L1 bidder.", completed: false },
      ],
    };

    // Save into localStorage
    const existingApps = localStorage.getItem("rbg_applications_data");
    const parsedApps: TenderApplication[] = existingApps ? JSON.parse(existingApps) : initialApplications;
    localStorage.setItem("rbg_applications_data", JSON.stringify([newApplication, ...parsedApps]));

    const existingBids = localStorage.getItem("rbg_bids_data");
    const parsedBids: BidSubmission[] = existingBids ? JSON.parse(existingBids) : initialBids;
    localStorage.setItem("rbg_bids_data", JSON.stringify([newBid, ...parsedBids]));

    // Cloud Database Sync: submit sealed bid directly to Supabase bids table
    try {
      await submitTenderBid({
        tenderNo: tender.id,
        supplierId: matchedSupplier.supplierId,
        vendorName: matchedSupplier.companyName,
        contactPerson: matchedSupplier.contactPerson,
        email: matchedSupplier.email,
        phone: matchedSupplier.phone,
        quotedAmount: newBid.quoteAmountNumber || 100,
        timelineMonths: newBid.timelineMonths,
        technicalSummary: newBid.technicalSummary,
      });
    } catch (err) {
      console.warn("Supabase sealed bid sync notice:", err);
    }

    // Automated Confirmation Email Notification
    await dispatchConfirmationNotification({
      to: matchedSupplier.email,
      recipientName: matchedSupplier.contactPerson,
      referenceId: generatedBidId,
      type: "tender_bid",
      title: `${tender.title} (${tender.id})`,
      organization: matchedSupplier.companyName,
      phone: matchedSupplier.phone,
      metaDetails: {
        tenderId: tender.id,
        financialQuote: newBid.quoteAmount,
        companyName: matchedSupplier.companyName,
      },
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setFinalBidSubmission(newBid);
      setApplyStep(6);
    }, 600);
  };

  if (!tender) {
    return (
      <div className="min-h-screen bg-[#FDFEFE] text-slate-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 shadow-sm max-w-md">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Tender Notice Not Found</h2>
          <p className="text-sm text-slate-500 mt-2">The requested procurement dossier is not available.</p>
          <Link
            to="/tenders"
            className="mt-5 inline-block px-5 py-2.5 rounded-lg bg-[#0F172A] text-white text-xs font-semibold uppercase tracking-wider hover:bg-slate-800 transition-colors"
          >
            Return to Portal
          </Link>
        </div>
      </div>
    );
  }

  const relatedCorrigendum = notifications.find((n) => n.tenderRef === tender.id);

  return (
    <div className="min-h-screen bg-[#FDFEFE] text-slate-900 font-sans pb-28 selection:bg-[#D9961A]/20 selection:text-[#0F172A]">
      <MetaTags
        title={`${tender.title} | Tender Notice ${tender.id}`}
        description={tender.scopeSummary ? tender.scopeSummary.replace(/<[^>]*>?/gm, "") : ""}
        type="website"
      />
      {/* 1. Grand Executive Hero Banner with Logo Crest & Video */}
      <section className="relative pt-36 sm:pt-44 pb-12 lg:pt-48 lg:pb-14 overflow-hidden flex items-end min-h-[380px] lg:min-h-[420px] bg-[#041633]">
        <div className="absolute inset-0 bg-gradient-to-t from-[#041633] via-[#041633]/70 to-[#041633]/40 z-0 pointer-events-none"></div>

        <div className="max-w-[1500px] w-full mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
          {/* Breadcrumb row inside hero banner */}
          <div className="flex items-center gap-2 text-xs text-slate-300 pb-3 overflow-x-auto">
            <Link to="/" className="hover:text-white font-medium">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            <Link to="/tenders" className="hover:text-white font-medium">Tenders & Procurement</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            <span className="font-mono font-semibold text-[#f2b72b]">{tender.id}</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="max-w-4xl space-y-3">
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/15 px-3 py-1 rounded-lg">
                  <img src={logo} alt="Rashtra Bharosa Group" className="w-5 h-5 object-contain" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#f2b72b]">
                    Procurement Directorate
                  </span>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/10 text-white font-mono font-bold text-xs border border-white/20">
                  <Hash className="w-3.5 h-3.5 text-[#f2b72b]" />
                  {tender.id}
                </span>
                <button
                  onClick={handleCopyId}
                  className="p-1 rounded hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  title="Copy Tender ID"
                >
                  {copiedId ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
                <span className="px-2.5 py-1 rounded text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {tender.status}
                </span>
                <span className="px-2.5 py-1 rounded text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30">
                  {tender.tenderType}
                </span>
                <span className="px-2.5 py-1 rounded text-xs font-semibold bg-white/10 text-slate-200 border border-white/15">
                  {tender.department}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight">
                {tender.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-300 pt-1">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#f2b72b]" />
                  <span>{tender.location}</span>
                </div>
                <div className="text-slate-500">•</div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-rose-400" />
                  <span>Closing: <strong className="text-white">{tender.closingDate} ({tender.closingTime})</strong></span>
                </div>
              </div>
            </div>

            {/* Top Action CTAs */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0">
              <button
                onClick={() => setShowApplyModal(true)}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-[#f2b72b] hover:bg-[#e0a620] text-[#030914] font-bold text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5" />
                Apply for Tender (Sealed Bid)
              </button>
              <button
                onClick={() => alert(`Downloading official procurement dossier for ${tender.id} (${tender.documentSize}).`)}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold text-xs tracking-wider uppercase border border-white/20 backdrop-blur-md transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-[#f2b72b]" />
                Download Dossier ({tender.documentSize})
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Live Corrigendum Bulletin Banner */}
      {relatedCorrigendum && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-amber-900 text-xs uppercase tracking-wider">
                    Official Corrigendum Active
                  </span>
                  <span className="text-[11px] font-mono text-amber-800 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
                    {relatedCorrigendum.id} ({relatedCorrigendum.date})
                  </span>
                </div>
                <p className="text-xs text-amber-900/80 mt-1 leading-relaxed">
                  {relatedCorrigendum.summary}
                </p>
              </div>
            </div>
            <button
              onClick={() => alert(`Official corrigendum notice ${relatedCorrigendum.id} (PDF) downloaded.`)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-amber-100 text-amber-900 border border-amber-300 text-xs font-semibold shrink-0 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              Download Bulletin
            </button>
          </div>
        </div>
      )}

      {/* 4. Main Dossier Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left 2 Cols: Specifications, BOQ & Multi-Tier Criteria */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overview Matrix Card */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h2 className="text-xs font-bold text-slate-900 tracking-wider uppercase">
                  1. Tender Overview & Key Parameters
                </h2>
                <span className="text-[11px] text-slate-400 font-mono">Form RB-PROC-V4</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-xs sm:text-sm">
                <div className="py-1.5 border-b border-slate-100">
                  <span className="text-slate-400 block text-[10px] uppercase font-medium">Tender Reference ID</span>
                  <span className="font-mono font-bold text-slate-900 text-sm">{tender.id}</span>
                </div>
                <div className="py-1.5 border-b border-slate-100">
                  <span className="text-slate-400 block text-[10px] uppercase font-medium">Operating Directorate</span>
                  <span className="font-semibold text-slate-800">{tender.department}</span>
                </div>

                <div className="py-1.5 border-b border-slate-100">
                  <span className="text-slate-400 block text-[10px] uppercase font-medium">Tender Type</span>
                  <span className="font-semibold text-blue-700">{tender.tenderType}</span>
                </div>
                <div className="py-1.5 border-b border-slate-100">
                  <span className="text-slate-400 block text-[10px] uppercase font-medium">Estimated Value</span>
                  <span className="font-bold text-slate-900 text-sm">{tender.estimatedValue}</span>
                </div>

                <div className="py-1.5 border-b border-slate-100">
                  <span className="text-slate-400 block text-[10px] uppercase font-medium">Earnest Money Deposit (EMD)</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="font-bold text-slate-900">{tender.emdAmount}</span>
                    {tender.emdExemptionAllowed && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        MSME Exempt Allowed
                      </span>
                    )}
                  </div>
                </div>
                <div className="py-1.5 border-b border-slate-100">
                  <span className="text-slate-400 block text-[10px] uppercase font-medium">Tender Document Fee</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="font-semibold text-slate-800">{tender.tenderFee}</span>
                  </div>
                </div>

                <div className="py-1.5 border-b border-slate-100">
                  <span className="text-slate-400 block text-[10px] uppercase font-medium">Publication Date</span>
                  <span className="text-slate-700">{tender.issueDate}</span>
                </div>
                <div className="py-1.5 border-b border-slate-100">
                  <span className="text-slate-400 block text-[10px] uppercase font-medium">Submission Deadline</span>
                  <span className="font-bold text-rose-700">{tender.closingDate} | {tender.closingTime}</span>
                </div>

                <div className="py-1.5 border-b border-slate-100">
                  <span className="text-slate-400 block text-[10px] uppercase font-medium">Execution Period</span>
                  <span className="text-slate-700">{tender.contractPeriod}</span>
                </div>
                <div className="py-1.5 border-b border-slate-100">
                  <span className="text-slate-400 block text-[10px] uppercase font-medium">Bid Validity</span>
                  <span className="text-slate-700">{tender.bidValidityPeriod}</span>
                </div>

                <div className="py-1.5 border-b border-slate-100 sm:col-span-2">
                  <span className="text-slate-400 block text-[10px] uppercase font-medium">Pre-Bid Meeting & Conference</span>
                  <span className="text-slate-800 font-medium">
                    {tender.preBidMeetingDate || "Queries accepted via online helpdesk"}
                    {tender.preBidMeetingVenue ? ` (${tender.preBidMeetingVenue})` : ""}
                  </span>
                </div>

                <div className="py-1.5 sm:col-span-2">
                  <span className="text-slate-400 block text-[10px] uppercase font-medium">Nodal Procurement Officer</span>
                  <span className="text-slate-800 font-medium">
                    {tender.procurementOfficer} • <a href={`mailto:${tender.procurementEmail}`} className="text-blue-600 hover:underline font-mono">{tender.procurementEmail}</a>
                  </span>
                </div>
              </div>
            </div>

            {/* Scope of Work */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-xs font-bold text-slate-900 tracking-wider uppercase">
                  2. Scope of Work & Major Project Deliverables
                </h2>
              </div>
              {/<[a-z][\s\S]*>/i.test(tender.scopeSummary || "") ? (
                <div
                  className="prose prose-sm max-w-none text-sm text-slate-600 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: tender.scopeSummary }}
                />
              ) : (
                <p className="text-sm text-slate-600 leading-relaxed">
                  {tender.scopeSummary}
                </p>
              )}

              <div className="mt-4 space-y-2.5">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Mandatory Turnkey Deliverables:
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {(tender.deliverables || []).map((item: any, idx: number) => {
                    const titleText = typeof item === "string"
                      ? item
                      : (item?.milestone || item?.title || item?.name || item?.deliverable || JSON.stringify(item));
                    const timelineText = typeof item === "object" && item?.timeline ? item.timeline : null;

                    return (
                      <div key={idx} className="flex items-center justify-between gap-2.5 p-3 rounded-lg bg-slate-50 border border-slate-100 text-xs sm:text-sm">
                        <div className="flex items-start gap-2.5">
                          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="text-slate-700 font-medium">{titleText}</span>
                        </div>
                        {timelineText && (
                          <span className="px-2.5 py-0.5 text-[11px] font-semibold bg-blue-50 text-blue-700 rounded border border-blue-200 shrink-0">
                            {timelineText}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Itemized BOQ Schedule */}
            {tender.boqItems && tender.boqItems.length > 0 && (
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h2 className="text-xs font-bold text-slate-900 tracking-wider uppercase">
                      3. Itemized Bill of Quantities (BOQ Schedule)
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Standard pricing breakdown schedule for commercial proposal estimation.
                    </p>
                  </div>
                  <button
                    onClick={handleExportBOQ}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 text-xs font-semibold cursor-pointer"
                  >
                    <FileSpreadsheet className="w-3.5 h-3.5 text-slate-600" />
                    Export BOQ (CSV)
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[10px]">
                        <th className="py-2.5 px-3">Item #</th>
                        <th className="py-2.5 px-3">Description of Work</th>
                        <th className="py-2.5 px-3">Unit</th>
                        <th className="py-2.5 px-3">Qty</th>
                        <th className="py-2.5 px-3">Est. Rate</th>
                        <th className="py-2.5 px-3 text-right">Total Est. Value</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {(tender.boqItems || []).map((item: any, idx: number) => (
                        <tr key={idx} className="hover:bg-slate-50/75">
                          <td className="py-2.5 px-3 font-mono font-bold text-slate-900">{item.itemNo || item.slNo || `ITEM-${idx + 1}`}</td>
                          <td className="py-2.5 px-3 text-slate-900 font-medium">{item.description}</td>
                          <td className="py-2.5 px-3 text-slate-500">{item.unit || "Unit"}</td>
                          <td className="py-2.5 px-3 font-mono text-slate-700">{(item.qty ?? 0).toLocaleString()}</td>
                          <td className="py-2.5 px-3 text-slate-500">{item.estRate || "As per NIT"}</td>
                          <td className="py-2.5 px-3 font-bold text-slate-900 text-right">{item.totalEst || "As Scheduled"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Multi-Tier Prequalification Matrix */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-xs font-bold text-slate-900 tracking-wider uppercase">
                  4. Prequalification & Eligibility Criteria
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Bids failing to satisfy any mandatory criterion are disqualified at Technical Stage 1.
                </p>
              </div>

              {(() => {
                const raw = tender.eligibilityCriteria;
                const criteria = Array.isArray(raw)
                  ? {
                      technical: raw.slice(0, Math.ceil(raw.length / 2)),
                      financial: raw.slice(Math.ceil(raw.length / 2)),
                      statutory: ["Valid statutory compliance, GSTIN, PAN, and non-blacklisting declaration."],
                    }
                  : {
                      technical: Array.isArray(raw?.technical) ? raw.technical : ["Registered Class-1 Super Contractor / Specialized Agency."],
                      financial: Array.isArray(raw?.financial) ? raw.financial : ["Audited financial reports and positive bank solvency."],
                      statutory: Array.isArray(raw?.statutory) ? raw.statutory : ["Zero-fee statutory non-blacklisting undertaking."],
                    };

                return (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
                      <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-blue-600" />
                        Technical Capacity
                      </h3>
                      <ul className="text-xs text-slate-600 space-y-2 mt-2">
                        {criteria.technical.map((crit: any, cIdx: number) => (
                          <li key={cIdx} className="flex items-start gap-1.5">
                            <span className="text-slate-400 font-bold">•</span>
                            <span>{typeof crit === "string" ? crit : JSON.stringify(crit)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
                      <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                        <IndianRupee className="w-4 h-4 text-emerald-600" />
                        Financial Solvency
                      </h3>
                      <ul className="text-xs text-slate-600 space-y-2 mt-2">
                        {criteria.financial.map((crit: any, cIdx: number) => (
                          <li key={cIdx} className="flex items-start gap-1.5">
                            <span className="text-emerald-600 font-bold">•</span>
                            <span>{typeof crit === "string" ? crit : JSON.stringify(crit)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
                      <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                        <FileCheck className="w-4 h-4 text-amber-600" />
                        Statutory & Integrity
                      </h3>
                      <ul className="text-xs text-slate-600 space-y-2 mt-2">
                        {criteria.statutory.map((crit: any, cIdx: number) => (
                          <li key={cIdx} className="flex items-start gap-1.5">
                            <span className="text-amber-600 font-bold">•</span>
                            <span>{typeof crit === "string" ? crit : JSON.stringify(crit)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>

          {/* Right Col: Action Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-100 text-xs font-semibold text-slate-700 border border-slate-200">
                <Lock className="w-3.5 h-3.5 text-slate-500" />
                CVC Sealed Bidding Protocol
              </div>

              <h3 className="text-base font-bold text-slate-900 tracking-tight">
                Submit Sealed Proposal
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Proposals are processed under a permanent <strong>Supplier ID</strong>. Quotations remain encrypted until commercial bid opening date.
              </p>

              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-xs space-y-2.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Estimated Value:</span>
                  <span className="font-bold text-slate-900">{tender.estimatedValue}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">EMD Security:</span>
                  <span className="font-bold text-slate-900">{tender.emdAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Portal Fee:</span>
                  <span className="font-bold text-emerald-700">100% Free (Open Access)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Deadline:</span>
                  <span className="font-bold text-rose-700">{tender.closingDate} (17:00 IST)</span>
                </div>
              </div>

              <button
                onClick={() => setShowApplyModal(true)}
                className="w-full py-2.5 rounded-lg bg-[#0F172A] hover:bg-slate-800 text-white font-semibold text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                Launch Application Gateway
                <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          MULTI-STEP GUIDED APPLICATION MODAL ENGINE
          ======================================================== */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[92vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded font-mono font-bold text-xs bg-slate-100 text-slate-800 border border-slate-200">
                    {tender.id}
                  </span>
                  <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Step {applyStep} of 6</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mt-1">
                  E-Bidding & Application Gateway
                </h3>
              </div>
              <button
                onClick={() => setShowApplyModal(false)}
                className="text-slate-400 hover:text-slate-700 text-xs font-mono font-bold cursor-pointer"
              >
                [CLOSE]
              </button>
            </div>

            {/* Stepper Progress Bar */}
            <div className="my-5 grid grid-cols-6 gap-1">
              {[
                "1. Supplier ID",
                "2. EMD Security",
                "3. Quoted Bid",
                "4. Documents",
                "5. Declarations",
                "6. Sealed Bid",
              ].map((label, idx) => (
                <div key={idx} className="space-y-1">
                  <div
                    className={`h-1.5 rounded-full ${
                      idx + 1 <= applyStep ? "bg-[#0F172A]" : "bg-slate-200"
                    }`}
                  />
                  <span className="text-[9px] font-semibold text-slate-500 block truncate text-center">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* ================= STEP 1: ORGANIZATION REGISTRATION ID ================= */}
            {applyStep === 1 && (
              <div className="space-y-4 text-xs sm:text-sm">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#062B63]" />
                    <h4 className="font-bold text-slate-900">Step 1: Authenticate Organization Registration ID</h4>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Enter your permanent <strong>Organization Registration ID (Supplier ID)</strong> to authenticate your enterprise status. Unregistered organizations must empanel first before submitting technical tender proposals.
                  </p>
                </div>

                <div>
                  <label className="block font-bold text-slate-800 mb-1.5 uppercase text-[11px]">
                    Organization Registration ID (Supplier ID) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. RBG-SUP-2026-6321 or RBG-SUP-000184"
                    value={inputSupplierId}
                    onChange={(e) => setInputSupplierId(e.target.value.trim().toUpperCase())}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 font-mono font-bold uppercase text-sm tracking-wider focus:outline-none focus:ring-2 focus:ring-[#062B63]/20 focus:border-[#062B63] transition-all"
                  />
                </div>

                {matchedSupplier ? (
                  <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-300 space-y-2.5 shadow-xs">
                    <div className="flex items-center justify-between gap-2 border-b border-emerald-200/80 pb-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span className="font-bold text-emerald-950 text-sm">{matchedSupplier.companyName}</span>
                      </div>
                      <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-mono font-bold border border-emerald-300 shrink-0">
                        {matchedSupplier.verificationStatus}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-slate-700">
                      <div>
                        <span className="text-slate-400 block text-[9px] uppercase font-bold">GSTIN</span>
                        <span className="font-mono font-bold text-slate-900">{matchedSupplier.gstin}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[9px] uppercase font-bold">Signatory</span>
                        <span className="font-medium text-slate-900">{matchedSupplier.contactPerson}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[9px] uppercase font-bold">Email</span>
                        <span className="truncate block text-slate-900">{matchedSupplier.email}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[9px] uppercase font-bold">MSME Status</span>
                        <span className="font-medium text-slate-900">{matchedSupplier.isMsme ? "MSME Verified" : "Standard"}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-amber-50/90 border border-amber-200 text-xs text-amber-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <span className="font-bold block text-slate-900">Organization Not Empanelled</span>
                      <span className="text-slate-600 leading-relaxed block mt-0.5">
                        Only empanelled organizations with a valid Supplier ID can submit tender proposals.
                      </span>
                    </div>
                    <Link 
                      to="/tenders?tab=supplier" 
                      className="px-4 py-2 rounded-xl bg-[#062B63] hover:bg-[#041c40] text-white font-bold text-xs shrink-0 transition-all text-center shadow-xs"
                    >
                      Register Organization →
                    </Link>
                  </div>
                )}

                <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                  <button
                    disabled={!matchedSupplier}
                    onClick={handleProceedToStep2}
                    className="px-6 py-2.5 rounded-lg bg-[#0F172A] hover:bg-slate-800 text-white font-semibold text-xs uppercase tracking-wider transition-all disabled:opacity-40 cursor-pointer"
                  >
                    Proceed to Application Verification
                  </button>
                </div>
              </div>
            )}

            {/* ================= STEP 2: APPLICATION REF & EMD BID SECURITY ================= */}
            {applyStep === 2 && (
              <div className="space-y-4 text-xs sm:text-sm">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-medium">Application Reference Number</span>
                    <span className="font-mono font-bold text-base text-slate-900">{generatedAppNo}</span>
                  </div>
                  <span className="px-2.5 py-1 rounded text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 self-start sm:self-auto flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Open Access Verified (100% Free)
                  </span>
                </div>

                {/* Free Institutional Protocol */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                      Zero-Cost Institutional E-Procurement Gateway
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Under Rashtra Bharosa Group's open-procurement guidelines, tender document access and proposal submissions are completely free of any portal processing charges.
                  </p>
                </div>

                {/* EMD & Bid Security Parameters */}
                <div className="space-y-3 pt-1">
                  <h4 className="font-bold text-slate-700 text-xs uppercase tracking-wider">
                    EMD & Bid Security Parameters
                  </h4>

                  <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-900">Refundable EMD Bid Security ({tender.emdAmount})</span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-xs">
                      <label className="flex items-center gap-1.5 cursor-pointer text-slate-700">
                        <input
                          type="radio"
                          name="emdMode"
                          checked={emdMode === "bank_guarantee"}
                          onChange={() => setEmdMode("bank_guarantee")}
                        />
                        <span>Bank Guarantee (BG) Instrument</span>
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer text-slate-700">
                        <input
                          type="radio"
                          name="emdMode"
                          checked={emdMode === "pay_online"}
                          onChange={() => setEmdMode("pay_online")}
                        />
                        <span>Direct RTGS / NEFT</span>
                      </label>
                      {tender.emdExemptionAllowed && (
                        <label className="flex items-center gap-1.5 cursor-pointer text-slate-700">
                          <input
                            type="radio"
                            name="emdMode"
                            checked={emdMode === "exempt_msme"}
                            onChange={() => setEmdMode("exempt_msme")}
                          />
                          <span>MSME Exemption</span>
                        </label>
                      )}
                    </div>

                    {emdMode === "bank_guarantee" && (
                      <div className="pt-2">
                        <input
                          type="text"
                          placeholder="Enter BG Reference No. (e.g. BG/2026/SBI/884912)"
                          value={bgRefNumber}
                          onChange={(e) => setBgRefNumber(e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-900 font-mono text-xs"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setApplyStep(1)}
                    className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 hover:text-slate-900 text-xs cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleProceedToStep3}
                    className="px-6 py-2.5 rounded-lg bg-[#0F172A] hover:bg-slate-800 text-white font-semibold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-sm"
                  >
                    Proceed to Quoted Bid Details
                  </button>
                </div>
              </div>
            )}

            {/* ================= STEP 3: COMMERCIAL & TECHNICAL BID ================= */}
            {applyStep === 3 && (
              <div className="space-y-4 text-xs sm:text-sm">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <h4 className="font-bold text-slate-900">Step 3: Commercial & Technical Submission</h4>
                  <p className="text-xs text-slate-500">
                    Enter your all-inclusive commercial quote (in INR Crores) and execution methodology.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Total Quoted Price (₹ Crores) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 138.50"
                      value={bidForm.quoteAmount}
                      onChange={(e) => setBidForm({ ...bidForm, quoteAmount: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 font-bold"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Proposed Delivery & Commissioning (Months) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 14 Months"
                      value={bidForm.timelineMonths}
                      onChange={(e) => setBidForm({ ...bidForm, timelineMonths: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-semibold text-slate-700 mb-1">
                      Technical Proposal Executive Summary *
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Summarize key machinery OEM brands, SCADA integration, safety clearances, and project team..."
                      value={bidForm.technicalSummary}
                      onChange={(e) => setBidForm({ ...bidForm, technicalSummary: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-between gap-3">
                  <button
                    onClick={() => setApplyStep(2)}
                    className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 hover:text-slate-900 text-xs cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleProceedToStep4}
                    className="px-6 py-2.5 rounded-lg bg-[#0F172A] hover:bg-slate-800 text-white font-semibold text-xs uppercase tracking-wider cursor-pointer"
                  >
                    Proceed to Documents Upload
                  </button>
                </div>
              </div>
            )}

            {/* ================= STEP 4: 16-POINT DOCUMENTS CHECKLIST ================= */}
            {applyStep === 4 && (
              <div className="space-y-4 text-xs sm:text-sm">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <h4 className="font-bold text-slate-900">Step 4: Statutory & Technical Document Vault</h4>
                  <p className="text-xs text-slate-500">
                    Verify all 16 required certificates. Each document is verified and assigned a secure Document Reference Hash (<code>RBG-DOC-...</code>).
                  </p>
                </div>

                <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 border border-slate-200 rounded-xl p-3 bg-white space-y-1">
                  {standardDocumentRequirements.map((doc) => {
                    const currentDoc = docUploads[doc.code];
                    return (
                      <div
                        key={doc.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 rounded hover:bg-slate-50 transition-colors gap-2 text-xs"
                      >
                        <div className="flex items-start gap-2.5">
                          <input
                            type="checkbox"
                            checked={currentDoc?.attached ?? true}
                            onChange={(e) =>
                              setDocUploads({
                                ...docUploads,
                                [doc.code]: {
                                  attached: e.target.checked,
                                  fileName: currentDoc?.fileName || `${doc.code}_Scan.pdf`,
                                  fileSize: currentDoc?.fileSize || "1.5 MB",
                                  docRef: currentDoc?.docRef || `RBG-DOC-2026-00${Math.floor(1000 + Math.random() * 9000)}`,
                                },
                              })
                            }
                            className="w-4 h-4 mt-0.5 rounded text-slate-900"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-bold text-[10px] text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                                {doc.code}
                              </span>
                              <span className="font-semibold text-slate-900">{doc.name}</span>
                            </div>
                            <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-2 font-mono">
                              <span>Ref: {currentDoc?.docRef}</span>
                              <span>•</span>
                              <span>File: {currentDoc?.fileName} ({currentDoc?.fileSize})</span>
                            </div>
                          </div>
                        </div>

                        <span className="text-[10px] px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold self-start sm:self-auto shrink-0 flex items-center gap-1">
                          <Check className="w-3 h-3 text-emerald-600" />
                          Attached & Signed
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-between gap-3">
                  <button
                    onClick={() => setApplyStep(3)}
                    className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 hover:text-slate-900 text-xs cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleProceedToStep5}
                    className="px-6 py-2.5 rounded-lg bg-[#0F172A] hover:bg-slate-800 text-white font-semibold text-xs uppercase tracking-wider cursor-pointer"
                  >
                    Proceed to Declarations
                  </button>
                </div>
              </div>
            )}

            {/* ================= STEP 5: DECLARATIONS & INTEGRITY PACT ================= */}
            {applyStep === 5 && (
              <form onSubmit={handleFinalBidSubmit} className="space-y-4 text-xs sm:text-sm">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <h4 className="font-bold text-slate-900">Step 5: Final Declarations & Integrity Pact</h4>
                  <p className="text-xs text-slate-500">
                    Signing and submitting locks the bid into the encrypted procurement vault.
                  </p>
                </div>

                <div className="space-y-3 p-4 rounded-xl border border-slate-200 bg-white">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={declarations.integrityPact}
                      onChange={(e) => setDeclarations({ ...declarations, integrityPact: e.target.checked })}
                      className="w-4 h-4 mt-0.5 rounded text-slate-900"
                    />
                    <span className="text-slate-700 text-xs leading-relaxed">
                      We hereby adopt and abide by the <strong>Rashtra Bharosa Group Institutional Integrity Pact</strong> and confirm zero anti-competitive or corrupt practices.
                    </span>
                  </label>

                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={declarations.nonBlacklisted}
                      onChange={(e) => setDeclarations({ ...declarations, nonBlacklisted: e.target.checked })}
                      className="w-4 h-4 mt-0.5 rounded text-slate-900"
                    />
                    <span className="text-slate-700 text-xs leading-relaxed">
                      We solemnly affirm that our firm has not been debarred or blacklisted by any Government authority or PSU as on date.
                    </span>
                  </label>

                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={declarations.technicalConformance}
                      onChange={(e) => setDeclarations({ ...declarations, technicalConformance: e.target.checked })}
                      className="w-4 h-4 mt-0.5 rounded text-slate-900"
                    />
                    <span className="text-slate-700 text-xs leading-relaxed">
                      All technical specifications, warranties, and delivery timelines offered in our proposal strictly conform to the NIT requirements.
                    </span>
                  </label>
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setApplyStep(4)}
                    className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 hover:text-slate-900 text-xs cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || !declarations.integrityPact || !declarations.nonBlacklisted}
                    className="px-6 py-2.5 rounded-lg bg-[#0F172A] hover:bg-slate-800 text-white font-semibold text-xs uppercase tracking-wider shadow-sm transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? "Sealing & Registering Bid..." : "Submit & Seal Bid Proposal"}
                  </button>
                </div>
              </form>
            )}

            {/* ================= STEP 6: OFFICIAL BID ACKNOWLEDGEMENT SLIP ================= */}
            {applyStep === 6 && finalBidSubmission && (
              <div className="space-y-6 text-xs sm:text-sm">
                <div className="p-6 rounded-xl bg-white border border-slate-300 shadow-sm relative overflow-hidden space-y-5">
                  {/* Header */}
                  <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="text-xs font-bold text-slate-600 uppercase tracking-widest">
                        Rashtra Bharosa Group E-Procurement Directorate
                      </div>
                      <h4 className="text-lg font-bold text-slate-900 mt-0.5">
                        Official Sealed Bid Acknowledgement Receipt
                      </h4>
                      <p className="text-[11px] text-slate-500 font-mono">
                        Security Protocol • Audit Timestamp: {finalBidSubmission.submissionTimestamp}
                      </p>
                    </div>

                    <div className="p-2 border border-slate-200 rounded-lg bg-slate-50 flex items-center gap-2 self-start sm:self-auto">
                      <QrCode className="w-8 h-8 text-slate-700" />
                      <div className="text-[9px] font-mono leading-tight text-slate-600">
                        <span>DIGITAL SEAL</span>
                        <strong className="block text-slate-900">{finalBidSubmission.bidSubmissionId}</strong>
                      </div>
                    </div>
                  </div>

                  {/* 4 Distinct IDs Summary Banner */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-3.5 rounded-lg border border-slate-200">
                    <div>
                      <span className="text-slate-500 block text-[10px] uppercase font-semibold">1. Tender ID</span>
                      <span className="font-mono font-bold text-slate-900 text-xs">{finalBidSubmission.tenderId}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px] uppercase font-semibold">2. Supplier ID</span>
                      <span className="font-mono font-bold text-slate-900 text-xs">{finalBidSubmission.supplierId}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px] uppercase font-semibold">3. Application No</span>
                      <span className="font-mono font-bold text-slate-900 text-xs">{finalBidSubmission.applicationNo}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px] uppercase font-semibold">4. Bid ID</span>
                      <span className="font-mono font-bold text-emerald-700 text-xs">{finalBidSubmission.bidSubmissionId}</span>
                    </div>
                  </div>

                  {/* Submission Specifics */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-50 p-3.5 rounded-lg border border-slate-200">
                    <div>
                      <span className="text-slate-500 block text-[10px] uppercase">Bidding Enterprise</span>
                      <span className="font-semibold text-slate-900">{finalBidSubmission.companyName} (GSTIN: {finalBidSubmission.gstin})</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px] uppercase">Authorized Signatory</span>
                      <span className="font-semibold text-slate-900">{finalBidSubmission.contactPerson} ({finalBidSubmission.email})</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px] uppercase">All-Inclusive Quoted Price</span>
                      <span className="font-bold text-slate-900 text-sm">{finalBidSubmission.quoteAmount}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px] uppercase">Proposed Timeline</span>
                      <span className="font-semibold text-slate-800">{finalBidSubmission.timelineMonths}</span>
                    </div>
                    <div className="sm:col-span-2 pt-2 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                      <div>
                        <span className="text-slate-500 block text-[10px] uppercase">Tender Processing Verification</span>
                        <span className="font-semibold text-emerald-700 flex items-center gap-1 mt-0.5">
                          <CheckCircle className="w-3.5 h-3.5" />
                          100% Free Institutional Open E-Procurement Access
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10px] uppercase">Sealed Document Package</span>
                        <span className="font-semibold text-slate-800 mt-0.5 block">16 certified statutory & technical documents locked.</span>
                      </div>
                    </div>
                  </div>

                  {/* Signoff and Footer */}
                  <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-slate-500 gap-2">
                    <div>
                      <span>Nodal Officer: <strong className="text-slate-900">{tender.procurementOfficer}</strong></span>
                      <span className="block text-[10px] font-mono">{tender.procurementEmail}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-mono font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                        STATUS: SUBMITTED & DIGITALLY SEALED
                      </span>
                    </div>
                  </div>
                </div>

                {/* Print & Action CTAs */}
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white hover:bg-slate-50 text-slate-800 font-semibold text-xs cursor-pointer border border-slate-200 shadow-sm"
                  >
                    <Printer className="w-4 h-4" />
                    Print Official Receipt Slip
                  </button>
                  <Link
                    to={`/tenders?tab=track`}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#0F172A] hover:bg-slate-800 text-white font-semibold text-xs uppercase tracking-wider"
                  >
                    Track Bid in Live Timeline
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TenderDetail;
