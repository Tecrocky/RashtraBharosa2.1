import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Search,
  Download,
  ArrowRight,
  ChevronRight,
  FileText,
  HelpCircle,
  FileSpreadsheet,
  ShieldCheck,
  UserCheck,
  Building2,
  MapPin,
  Calendar,
  Layers,
  Send,
  Activity,
  CheckCircle2,
  AlertCircle,
  Bot,
  Check,
  Clock,
  Hash,
  ExternalLink,
  Printer,
  ShieldAlert,
  CreditCard,
  FileCheck,
  TrendingUp,
  Plus,
  Settings,
  Eye,
  Trash2,
  Lock,
  Zap,
  SlidersHorizontal,
  X,
  Mail,
  Copy,
  RefreshCw,
  QrCode,
  Wifi,
  Cpu,
  Award,
  Sparkles,
  KeyRound,
  Smartphone,
  LogOut,
  History,
  FileCheck2,
  User,
  Bell,
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
  TenderType,
} from "@/data/tendersData";
import logo from "@/assets/logo.png";
import tendersHeroVideo from "@/assets/VIDEOS/Tenders & Opportunities.mp4";
import { generateReferenceId, dispatchConfirmationNotification, lookupUnifiedTracking } from "@/lib/trackingService";
import { supabase } from "@/lib/supabase";
import MetaTags from "@/components/MetaTags";

// Helper to strip HTML tags for plain-text cards/previews
const stripHtml = (html: string): string => {
  if (!html) return "";
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};

// Helper to detect if a string contains HTML tags
const hasHtmlTags = (str: string): boolean => {
  return /<[a-z][\s\S]*>/i.test(str);
};

const Tenders: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlTab = searchParams.get("tab");
  const preselectedTenderId = searchParams.get("tender");

  // Master Synchronized State (Strictly Supabase Cloud Driven)
  const [tenders, setTenders] = useState<TenderNotice[]>([]);

  // Supabase Live Tenders Sync on mount
  useEffect(() => {
    const fetchCloudTenders = async () => {
      try {
        const { data, error } = await supabase
          .from("tenders")
          .select("*")
          .order("created_at", { ascending: false });

        if (!error && Array.isArray(data)) {
          const mapped: TenderNotice[] = data.map((d: any) => {
            // Check if full record payload is preserved in documents json/array
            let embedded: Partial<TenderNotice> = {};
            if (Array.isArray(d.documents) && d.documents[0] && typeof d.documents[0] === "object") {
              embedded = d.documents[0];
            } else if (d.documents && typeof d.documents === "object" && !Array.isArray(d.documents)) {
              embedded = d.documents;
            }

            const activeStatus = d.status === "Closed" ? "Closed" : "Active";

            return {
              id: d.tender_no || d.id || embedded.id || "RBG-NIT",
              slug: embedded.slug || d.slug || (d.title ? d.title.toLowerCase().replace(/[^a-z0-9]/g, "-") : d.id),
              title: d.title || embedded.title || "",
              department: embedded.department || d.department || d.vertical || "Rashtra Bharosa Group",
              verticalCode: embedded.verticalCode || d.vertical || "INFRA-EPC",
              tenderType: embedded.tenderType || d.tender_type || "Open National Competitive Tender",
              category: embedded.category || d.category || "Heavy Civil & Construction",
              categoryFilter: embedded.categoryFilter || (embedded.category?.toLowerCase().includes("civil") ? "construction" : "mining"),
              estimatedValue: embedded.estimatedValue || d.estimated_value || "As per Detailed Project Report",
              emdAmount: embedded.emdAmount || d.emd_amount || "Nil / Exemption as per norms",
              emdExemptionAllowed: embedded.emdExemptionAllowed ?? true,
              tenderFee: embedded.tenderFee || d.tender_fee || "100% Free Open Access (₹0)",
              issueDate: embedded.issueDate || d.published_date || d.issue_date || "",
              closingDate: embedded.closingDate || d.closing_date || "",
              closingTime: embedded.closingTime || "17:00 IST",
              status: activeStatus,
              location: embedded.location || d.location || "Odisha, India",
              state: embedded.state || d.state || "Odisha",
              documentSize: embedded.documentSize || d.document_size || "4.5 MB",
              procurementOfficer: embedded.procurementOfficer || "Chief Procurement Officer",
              procurementEmail: embedded.procurementEmail || "tenders@rashtrabharosagroup.com",
              contractPeriod: embedded.contractPeriod || "12 Months",
              bidValidityPeriod: embedded.bidValidityPeriod || "120 Days",
              scopeSummary: embedded.scopeSummary || d.scope_summary || d.title,
              eligibilityCriteria: embedded.eligibilityCriteria || {
                technical: ["Registered Class-1 EPC / Turnkey Contractor with proven track record"],
                financial: ["Adequate annual turnover and bank solvency certificate"],
                statutory: ["Valid GSTIN, PAN, and Zero-Blacklisting declaration"],
              },
              specifications: embedded.specifications || [],
              deliverables: embedded.deliverables || [],
              requiredDocuments: embedded.requiredDocuments || standardDocumentRequirements.slice(0, 6),
              boqItems: embedded.boqItems || [],
            };
          });

          setTenders(mapped);
          localStorage.setItem("rbg_tenders_data", JSON.stringify(mapped));
        }
      } catch (err) {
        console.warn("Supabase tenders sync notice:", err);
      }
    };

    fetchCloudTenders();
  }, []);

  const [suppliers, setSuppliers] = useState<SupplierProfile[]>(() => {
    const saved = localStorage.getItem("rbg_suppliers_data");
    return saved ? JSON.parse(saved) : initialSuppliers;
  });

  // Sync Supabase Registered Organizations on mount
  useEffect(() => {
    const fetchCloudSuppliers = async () => {
      try {
        const { data, error } = await supabase
          .from("suppliers")
          .select("*")
          .order("created_at", { ascending: false });

        if (!error && data && data.length > 0) {
          const mapped: SupplierProfile[] = data.map((d: any) => ({
            supplierId: d.supplier_id || d.id,
            companyName: d.company_name,
            gstin: d.gstin,
            panNumber: d.pan_number,
            contactPerson: d.contact_person,
            email: d.email,
            phone: d.phone,
            address: d.address,
            state: d.state,
            businessCategory: d.business_category,
            isMsme: d.is_msme,
            registrationDate: d.registration_date || new Date(d.created_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
            verificationStatus: (d.verification_status as any) || "Verified",
          }));

          const local: SupplierProfile[] = JSON.parse(localStorage.getItem("rbg_suppliers_data") || "[]");
          const map = new Map<string, SupplierProfile>();
          [...mapped, ...local].forEach((s) => {
            if (s.supplierId) map.set(s.supplierId.toUpperCase(), s);
          });
          const merged = Array.from(map.values());
          setSuppliers(merged);
          localStorage.setItem("rbg_suppliers_data", JSON.stringify(merged));
        }
      } catch (err) {
        console.warn("Supabase suppliers sync notice:", err);
      }
    };

    fetchCloudSuppliers();
  }, []);

  const [applications, setApplications] = useState<TenderApplication[]>(() => {
    const saved = localStorage.getItem("rbg_applications_data");
    return saved ? JSON.parse(saved) : initialApplications;
  });

  const [bids, setBids] = useState<BidSubmission[]>(() => {
    const saved = localStorage.getItem("rbg_bids_data");
    return saved ? JSON.parse(saved) : initialBids;
  });

  const [notifications, setNotifications] = useState<TenderNotification[]>(() => {
    try {
      const saved = localStorage.getItem("rbg_tender_notifications");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          // Filter out any garbage/test notifications
          return parsed.filter(
            (n: any) =>
              n &&
              n.title &&
              !n.title.toLowerCase().includes("test") &&
              !n.title.toLowerCase().includes("rthimfijhjrtiu") &&
              !n.title.toLowerCase().includes("bheadj")
          );
        }
      }
    } catch {}
    return [];
  });

  // Keep tenders and notifications refreshed in real-time if updated from Admin
  useEffect(() => {
    const handleStorageChange = () => {
      const freshTenders = localStorage.getItem("rbg_tenders_data");
      if (freshTenders) {
        try {
          setTenders(JSON.parse(freshTenders));
        } catch {}
      }
      const freshNotifs = localStorage.getItem("rbg_tender_notifications");
      if (freshNotifs) {
        try {
          const parsed = JSON.parse(freshNotifs);
          if (Array.isArray(parsed)) {
            setNotifications(
              parsed.filter(
                (n: any) =>
                  n &&
                  n.title &&
                  !n.title.toLowerCase().includes("test") &&
                  !n.title.toLowerCase().includes("rthimfijhjrtiu") &&
                  !n.title.toLowerCase().includes("bheadj")
              )
            );
          }
        } catch {}
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // 4 Core Active Tabs: 'notices' | 'apply' | 'supplier' | 'track'
  const [activeTab, setActiveTab] = useState<"notices" | "apply" | "supplier" | "track">(() => {
    if (urlTab === "apply" || urlTab === "supplier" || urlTab === "track") return urlTab;
    return "notices";
  });

  useEffect(() => {
    if (urlTab && (urlTab === "notices" || urlTab === "apply" || urlTab === "supplier" || urlTab === "track")) {
      setActiveTab(urlTab);
    }
  }, [urlTab]);

  const handleTabChange = (tab: "notices" | "apply" | "supplier" | "track") => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  // Tender Reader Modal State for Clear View
  const [selectedTenderForModal, setSelectedTenderForModal] = useState<TenderNotice | null>(null);

  // Dedicated In-Page Comprehensive Tender Application State
  const [applyTenderId, setApplyTenderId] = useState<string>(() => {
    return preselectedTenderId || tenders[0]?.id || "RBMIN/2026/008";
  });

  // Section 1: Authorized Applicant / Signatory Details
  const [applyApplicantName, setApplyApplicantName] = useState<string>("");
  const [applyApplicantDesignation, setApplyApplicantDesignation] = useState<string>("Director - Tenders & Execution");
  const [applySignatoryAuthority, setApplySignatoryAuthority] = useState<string>("Power of Attorney / Board Resolution");
  const [applyApplicantEmail, setApplyApplicantEmail] = useState<string>("");

  // Section 2: Enterprise / Organization Profile
  const [applyCompanyName, setApplyCompanyName] = useState<string>("");
  const [applyCinNumber, setApplyCinNumber] = useState<string>("");
  const [applyGstin, setApplyGstin] = useState<string>("");
  const [applyPanNumber, setApplyPanNumber] = useState<string>("");
  const [applyConstitution, setApplyConstitution] = useState<string>("Private Limited Company");
  const [applyMsmeNumber, setApplyMsmeNumber] = useState<string>("");
  const [applyCompanyAddress, setApplyCompanyAddress] = useState<string>("");
  const [applyCity, setApplyCity] = useState<string>("Bhubaneswar");
  const [applyState, setApplyState] = useState<string>("Odisha");
  const [applyPincode, setApplyPincode] = useState<string>("751001");

  // Section 3: Tender Selection & Bidding Mode
  const [applyBiddingMode, setApplyBiddingMode] = useState<string>("Sole Independent Bidder");
  const [applyRbgSupplierId, setApplyRbgSupplierId] = useState<string>("RBG-SUP-000184");

  // Section 4: Official Company Communication Information
  const [applyEmail, setApplyEmail] = useState<string>("");
  const [applyAltEmail, setApplyAltEmail] = useState<string>("");
  const [applyPhone, setApplyPhone] = useState<string>("");
  const [applyAltPhone, setApplyAltPhone] = useState<string>("");
  const [applyWebsite, setApplyWebsite] = useState<string>("");

  // Section 5: Mandatory Statutory Declarations
  const [applyDeclarations, setApplyDeclarations] = useState({
    integrityPact: true,
    nonBlacklisted: true,
    technicalConformance: true,
    dataAccuracy: true,
    tenderDisclaimer: true,
  });
  const [isSubmittingTenderBid, setIsSubmittingTenderBid] = useState(false);
  const [submittedTenderBidReceipt, setSubmittedTenderBidReceipt] = useState<BidSubmission | null>(null);

  // Handle Quick Apply Trigger from Card
  const handleQuickApplyTender = (tender: TenderNotice) => {
    setApplyTenderId(tender.id);
    setSubmittedTenderBidReceipt(null);
    setActiveTab("apply");
    setSearchParams({ tab: "apply", tender: tender.id });
    window.scrollTo({ top: 400, behavior: "smooth" });
  };

  // Submit In-Page Tender Bid Proposal Handler
  const handleSubmitTenderBid = async (e: React.FormEvent) => {
    e.preventDefault();
    const matchedTender = tenders.find((t) => t.id === applyTenderId || t.slug === applyTenderId) || tenders[0];
    
    setIsSubmittingTenderBid(true);
    const bidId = generateReferenceId("tender_bid");
    const cleanTenderCode = (matchedTender?.id || "NIT").replace(/[^a-zA-Z0-9]/g, "");
    const appNo = `RBG-APP-2026-${cleanTenderCode}-${Math.floor(1000 + Math.random() * 9000)}`;
    const effectiveSupplierId = applyRbgSupplierId.trim().toUpperCase() || `RBG-SUP-${Math.floor(100000 + Math.random() * 900000)}`;
    const todayFormatted = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
    const nowIso = new Date().toISOString();

    const effectiveCompanyName = applyCompanyName.trim() || "Empanelled Industrial Partner";
    const effectiveApplicantName = applyApplicantName.trim() || "Authorized Signatory";
    const effectiveCompanyEmail = applyEmail.trim() || "procurement@partner.com";
    const effectivePhone = applyPhone.trim() || "+91 98765 43210";

    const newBid: BidSubmission = {
      bidSubmissionId: bidId,
      applicationNo: appNo,
      tenderId: matchedTender?.id || "RBMIN/2026/008",
      supplierId: effectiveSupplierId,
      companyName: effectiveCompanyName,
      gstin: applyGstin || "21AAACR8841P1Z5",
      contactPerson: `${effectiveApplicantName} (${applyApplicantDesignation})`,
      email: effectiveCompanyEmail,
      phone: effectivePhone,
      quoteAmount: matchedTender?.estimatedValue || "As per NIT BoQ",
      quoteAmountNumber: 0,
      timelineMonths: matchedTender?.contractPeriod || "12 Months",
      technicalSummary: `Tender application submitted under ${applyBiddingMode} capacity for ${matchedTender?.title} with full statutory compliance.`,
      uploadedDocuments: standardDocumentRequirements.slice(0, 6).map((doc, idx) => ({
        docCode: doc.code,
        fileName: `${doc.code}_${effectiveCompanyName.replace(/\s+/g, "_")}_Dossier.pdf`,
        docRef: `RBG-DOC-2026-00${1880 + idx}`,
        fileSize: `${(1.6 + idx * 0.4).toFixed(1)} MB`,
      })),
      submissionDate: todayFormatted,
      submissionTimestamp: nowIso,
      currentStage: 1,
      status: "Submitted & Sealed",
      remarks: `Tender application submitted by ${effectiveApplicantName} (${applyApplicantDesignation}) for ${effectiveCompanyName} under RBG Supplier ID: ${effectiveSupplierId}.`,
      timelineEvents: [
        {
          stageNumber: 1,
          title: "Tender Application Submission & Dossier Vaulting",
          date: todayFormatted,
          description: "Digital tender application vaulted with automated email acknowledgements dispatched.",
          completed: true,
          current: true,
        },
        {
          stageNumber: 2,
          title: "Technical Scrutiny & Solvency Clearance",
          date: "Scheduled in 7 Days",
          description: "Verification of financial turnover, technical eligibility, MSME & statutory undertakings.",
          completed: false,
        },
        {
          stageNumber: 3,
          title: "Commercial Quotation Evaluation",
          date: "Pending Technical Clearance",
          description: "Opening of encrypted commercial price bids.",
          completed: false,
        },
        {
          stageNumber: 4,
          title: "Tender Committee Board Review",
          date: "Pending Evaluation",
          description: "Final review and approval by Executive Procurement Directorate.",
          completed: false,
        },
        {
          stageNumber: 5,
          title: "Letter of Intent (LOI) & Concession Award",
          date: "Final Stage",
          description: "Issuance of binding Letter of Intent to L1 bidder.",
          completed: false,
        },
      ],
    };

    // Save bid to local storage
    const updatedBids = [newBid, ...bids];
    localStorage.setItem("rbg_bids_data", JSON.stringify(updatedBids));
    setBids(updatedBids);

    // Save application to local storage
    const newApp: TenderApplication = {
      applicationNo: appNo,
      tenderId: matchedTender?.id || "RBMIN/2026/008",
      supplierId: effectiveSupplierId,
      companyName: effectiveCompanyName,
      gstin: applyGstin || "21AAACR8841P1Z5",
      contactPerson: `${effectiveApplicantName} (${applyApplicantDesignation})`,
      email: effectiveCompanyEmail,
      phone: effectivePhone,
      tenderFeeStatus: "Nil / Not Applicable",
      emdStatus: "Bank Guarantee (BG) Submitted",
      emdRef: `BG/2026/${effectiveSupplierId.slice(-6)}`,
      applicationDate: todayFormatted,
      stage: "Bids Submitted",
    };
    const updatedApps = [newApp, ...applications];
    localStorage.setItem("rbg_applications_data", JSON.stringify(updatedApps));
    setApplications(updatedApps);

    // Also auto-save supplier record if new
    const existingSupplier = suppliers.find((s) => s.email.toLowerCase() === effectiveCompanyEmail.toLowerCase() || (applyGstin && s.gstin === applyGstin));
    if (!existingSupplier) {
      const newSupplierProfile: SupplierProfile = {
        supplierId: effectiveSupplierId,
        companyName: effectiveCompanyName,
        constitution: applyConstitution,
        gstin: applyGstin || "21AAACR8841P1Z5",
        panNumber: applyPanNumber || "AAACR8841P",
        contactPerson: effectiveApplicantName,
        designation: applyApplicantDesignation,
        email: effectiveCompanyEmail,
        phone: effectivePhone,
        address: `${applyCompanyAddress ? applyCompanyAddress + ", " : ""}${applyCity}, ${applyState} - ${applyPincode}`,
        state: applyState,
        businessCategory: matchedTender?.department || "Infrastructure & EPC",
        isMsme: true,
        msmeUdyamNumber: applyMsmeNumber || undefined,
        registrationDate: todayFormatted,
        verificationStatus: "Verified",
      };
      const updatedSuppliers = [newSupplierProfile, ...suppliers];
      localStorage.setItem("rbg_suppliers_data", JSON.stringify(updatedSuppliers));
      setSuppliers(updatedSuppliers);
    }

    // Save to Supabase Cloud DB
    try {
      const bidUuid = typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : undefined;
      const parsedQuotedAmount = parseFloat(String(matchedTender?.estimatedValue || "0").replace(/[^0-9.]/g, "")) || 0;
      supabase.from("bids").insert([{
        ...(bidUuid ? { id: bidUuid } : {}),
        bid_reference: bidId,
        bid_id: bidId,
        application_no: appNo,
        tender_no: matchedTender?.id,
        tender_id: matchedTender?.id,
        supplier_id: effectiveSupplierId,
        vendor_name: effectiveCompanyName,
        company_name: effectiveCompanyName,
        contact_person: `${effectiveApplicantName} (${applyApplicantDesignation})`,
        email: effectiveCompanyEmail,
        phone: effectivePhone,
        quoted_amount: parsedQuotedAmount,
        quote_amount: matchedTender?.estimatedValue || "NIT Estimate",
        timeline: newBid.timelineMonths,
        status: "Submitted",
        submission_date: todayFormatted,
      }]).catch((err) => console.warn("Supabase bid insert note:", err));
    } catch {}

    // Dispatch Primary Confirmation Notification Email to Company Primary Email
    await dispatchConfirmationNotification({
      to: effectiveCompanyEmail,
      recipientName: effectiveApplicantName,
      referenceId: bidId,
      type: "tender_bid",
      title: `Official Tender Application Submission — ${matchedTender?.id} (${matchedTender?.title})`,
      organization: effectiveCompanyName,
      phone: effectivePhone,
      metaDetails: {
        "Bid Submission ID": bidId,
        "Application Reference No": appNo,
        "Tender Notice ID": `${matchedTender?.id} — ${matchedTender?.title}`,
        "Bidding Capacity": applyBiddingMode,
        "RBG Organization ID": effectiveSupplierId,
        "Applicant Name": `${effectiveApplicantName} (${applyApplicantDesignation})`,
        "Applicant Email": applyApplicantEmail || effectiveCompanyEmail,
        "Enterprise / Company": effectiveCompanyName,
        "GSTIN / Tax ID": applyGstin || "Provided",
        "PAN Number": applyPanNumber || "Provided",
        "Corporate CIN": applyCinNumber || "Provided",
        "MSME / Udyam Certificate": applyMsmeNumber,
        "Company Primary Email": effectiveCompanyEmail,
        "Company Alternate Email": applyAltEmail || "N/A",
        "Contact Phone": effectivePhone,
        "Alternate Phone": applyAltPhone || "N/A",
        "Security Protocol": "256-bit Encrypted Vault",
      },
    });

    // Dispatch Duplicate Confirmation Notification to Alternate Email if provided
    if (applyAltEmail && applyAltEmail.trim().length > 0 && applyAltEmail.trim().toLowerCase() !== effectiveCompanyEmail.toLowerCase()) {
      try {
        await dispatchConfirmationNotification({
          to: applyAltEmail.trim(),
          recipientName: effectiveApplicantName,
          referenceId: bidId,
          type: "tender_bid",
          title: `[Official Duplicate] Tender Application Submission — ${matchedTender?.id} (${matchedTender?.title})`,
          organization: effectiveCompanyName,
          phone: effectivePhone,
          metaDetails: {
            "Bid Submission ID": bidId,
            "Application Reference No": appNo,
            "Tender Notice ID": `${matchedTender?.id} — ${matchedTender?.title}`,
            "Bidding Capacity": applyBiddingMode,
            "RBG Organization ID": effectiveSupplierId,
            "Applicant Name": `${effectiveApplicantName} (${applyApplicantDesignation})`,
            "Enterprise / Company": effectiveCompanyName,
            "Security Protocol": "256-bit Encrypted Vault",
          },
        });
      } catch (err) {
        console.warn("Alternative email dispatch note:", err);
      }
    }

    // Also dispatch to applicant email if distinct
    if (applyApplicantEmail && applyApplicantEmail.trim().length > 0 && applyApplicantEmail.trim().toLowerCase() !== effectiveCompanyEmail.toLowerCase() && applyApplicantEmail.trim().toLowerCase() !== applyAltEmail.trim().toLowerCase()) {
      try {
        await dispatchConfirmationNotification({
          to: applyApplicantEmail.trim(),
          recipientName: effectiveApplicantName,
          referenceId: bidId,
          type: "tender_bid",
          title: `Signatory Confirmation: Tender Application Submission — ${matchedTender?.id}`,
          organization: effectiveCompanyName,
          phone: effectivePhone,
          metaDetails: {
            "Bid Submission ID": bidId,
            "Application Reference No": appNo,
            "Tender Notice": matchedTender?.id,
            "Enterprise": effectiveCompanyName,
          },
        });
      } catch {}
    }

    setIsSubmittingTenderBid(false);
    setSubmittedTenderBidReceipt(newBid);
  };

  // Search & Filter State
  const [keyword, setKeyword] = useState("");
  const [selectedVertical, setSelectedVertical] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Supplier Registration State
  const [regForm, setRegForm] = useState({
    applicantName: "",
    applicantRole: "Founder",
    applicantDesignation: "Authorized Person / Signatory",
    applicantEmail: "",
    applicantPhone: "",
    companyName: "",
    constitution: "Private Limited Company",
    cinNumber: "",
    gstin: "",
    panNumber: "",
    msmeNumber: "",
    businessCategory: "Heavy Civil EPC & Infrastructure",
    customCategory: "",
    address: "",
    city: "Bhubaneswar",
    state: "Odisha",
    pincode: "751001",
    companyEmail: "",
    companyAltEmail: "",
    companyPhone: "",
    companyAltPhone: "",
    website: "",
    undertakingIntegrity: true,
    undertakingNonBlacklisted: true,
    undertakingAccuracy: true,
    undertakingAuthority: true,
  });
  const [newSupplierId, setNewSupplierId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [selectedSupplierId, setSelectedSupplierId] = useState<string>("RBG-SUP-000184");

  // Organization Login State (Direct Supplier ID Database Authentication)
  const [supplierMode, setSupplierMode] = useState<"register" | "login">("register");
  const [loggedInSupplier, setLoggedInSupplier] = useState<SupplierProfile | null>(() => {
    const saved = sessionStorage.getItem("rbg_authenticated_supplier");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return null;
  });
  const [loginSupplierId, setLoginSupplierId] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);

  // Tracking State
  const [trackQuery, setTrackQuery] = useState("");
  const [trackedResult, setTrackedResult] = useState<{
    type: "bid" | "application" | "supplier";
    bid?: BidSubmission;
    application?: TenderApplication;
    supplier?: SupplierProfile;
    tender?: TenderNotice;
  } | null>(null);
  const [trackSearched, setTrackSearched] = useState(false);

  // Pre-Bid Query Form
  const [queryForm, setQueryForm] = useState({
    tenderId: tenders[0]?.id || "RBMIN/2026/008",
    supplierName: "",
    email: "",
    queryText: "",
  });
  const [querySubmitted, setQuerySubmitted] = useState(false);

  // Admin Dashboard State
  const [showCreateTenderModal, setShowCreateTenderModal] = useState(false);
  const [showCreateCorrigendumModal, setShowCreateCorrigendumModal] = useState(false);
  const [adminSuccessMsg, setAdminSuccessMsg] = useState<string | null>(null);

  const [newTenderForm, setNewTenderForm] = useState({
    id: `RBNIT/2026/0${Math.floor(10 + Math.random() * 90)}`,
    title: "",
    department: "RashBhar Mining",
    tenderType: "Open Tender" as TenderType,
    estimatedValue: "₹ 45 – 60 Cr",
    emdAmount: "₹ 15.00 Lakhs",
    closingDate: "15 Nov 2026",
    location: "Sundergarh, Odisha",
    scopeSummary: "Turnkey design, supply, execution and cold commissioning under institutional supervision.",
  });

  const [newCorrigendumForm, setNewCorrigendumForm] = useState({
    tenderRef: tenders[0]?.id || "RBMIN/2026/008",
    title: "Corrigendum - Technical Parameter Clarification & Extension",
    summary: "Clarification on electrical drive specifications. Deadline extended to 15 Nov 2026.",
  });

  const verticals = [
    { label: "All Verticals", value: "" },
    { label: "Mining", value: "Mining" },
    { label: "Construction", value: "Construction" },
    { label: "Healthcare", value: "Health" },
    { label: "Real Estate", value: "Real" },
    { label: "Technology", value: "Technology" },
    { label: "Agriculture", value: "Soil" },
  ];

  // Supplier Registration Handler
  const handleSupplierRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegistering(true);

    const generatedSupplierId = generateReferenceId("vendor_registration");
    const todayFormatted = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
    const effectiveCategory = regForm.businessCategory === "Other" && regForm.customCategory.trim() 
      ? regForm.customCategory.trim() 
      : regForm.businessCategory;
    
    const newSupplier: SupplierProfile = {
      supplierId: generatedSupplierId,
      companyName: regForm.companyName,
      gstin: regForm.gstin.toUpperCase(),
      panNumber: regForm.panNumber.toUpperCase(),
      contactPerson: regForm.applicantName,
      email: regForm.companyEmail || regForm.applicantEmail,
      phone: regForm.companyPhone || regForm.applicantPhone,
      address: `${regForm.address}, ${regForm.city}`,
      state: regForm.state,
      businessCategory: effectiveCategory,
      isMsme: !!regForm.msmeNumber,
      registrationDate: todayFormatted,
      verificationStatus: "Verified",
    };

    const updatedSuppliers = [newSupplier, ...suppliers];
    localStorage.setItem("rbg_suppliers_data", JSON.stringify(updatedSuppliers));
    setSuppliers(updatedSuppliers);
    setSelectedSupplierId(generatedSupplierId);

    // Save to Supabase Cloud DB
    try {
      const supplierUuid = typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : undefined;
      supabase.from("suppliers").insert([{
        ...(supplierUuid ? { id: supplierUuid } : {}),
        supplier_id: generatedSupplierId,
        company_name: regForm.companyName,
        gstin: regForm.gstin.toUpperCase(),
        pan_number: regForm.panNumber.toUpperCase(),
        contact_person: regForm.applicantName,
        email: regForm.companyEmail,
        phone: regForm.companyPhone,
        address: `${regForm.address}, ${regForm.city}, ${regForm.state} - ${regForm.pincode}`,
        city: regForm.city,
        state: regForm.state,
        pincode: regForm.pincode,
        business_category: effectiveCategory,
        is_msme: !!regForm.msmeNumber,
        registration_date: todayFormatted,
        verification_status: "Verified",
      }]).then(({ error }) => {
        if (error) console.warn("Supabase supplier insert note:", error.message);
      }).catch((err) => console.warn("Supabase supplier network note:", err));
    } catch {}

    // Automated Confirmation Email Dispatch (To Company Primary & Signatory)
    await dispatchConfirmationNotification({
      to: regForm.companyEmail || regForm.applicantEmail,
      secondaryEmail: regForm.applicantEmail,
      recipientName: regForm.applicantName,
      referenceId: generatedSupplierId,
      type: "vendor_registration",
      title: `Empanelled Organization Registration Certificate — ${regForm.companyName}`,
      organization: regForm.companyName,
      phone: regForm.companyPhone || regForm.applicantPhone,
      metaDetails: {
        Company: regForm.companyName,
        "Constitution": regForm.constitution,
        "Signatory": `${regForm.applicantName} (${regForm.applicantRole})`,
        "Signatory Email": regForm.applicantEmail,
        "Signatory Phone": regForm.applicantPhone,
        "MSME / Udyam No": regForm.msmeNumber,
        "GSTIN": regForm.gstin.toUpperCase(),
        "PAN": regForm.panNumber.toUpperCase(),
        "Industry Vertical": effectiveCategory,
        "Registered HQ": `${regForm.address}, ${regForm.city}, ${regForm.state} - ${regForm.pincode}`,
        "Alternative Email": regForm.companyAltEmail || "N/A",
        "Alternative Phone": regForm.companyAltPhone || "N/A",
        "Website": regForm.website || "N/A",
      },
    });

    setTimeout(() => {
      setIsRegistering(false);
      setNewSupplierId(generatedSupplierId);
    }, 400);
  };

  // Organization Login Handler (Strict Sovereign Organization Registration ID Authentication)
  const handleSupplierLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    const q = loginSupplierId.trim().toUpperCase();
    if (!q) {
      setLoginError("Please enter your official Organization Registration ID (e.g. RBG-SUP-2026-XXXX).");
      return;
    }

    // Strict verification: only allow authenticated Sovereign Organization Registration ID
    const matched = suppliers.find((s) => s.supplierId.toUpperCase() === q);

    if (!matched) {
      setLoginError(
        `Invalid Organization Registration ID "${q}". No registered record found in our Sovereign Database. Please verify your ID or register your organization first.`
      );
      return;
    }

    // Immediate database authentication & session activation
    setLoggedInSupplier(matched);
    sessionStorage.setItem("rbg_authenticated_supplier", JSON.stringify(matched));
    setSelectedSupplierId(matched.supplierId);
    setLoginSupplierId("");
  };

  // Organization Logout Handler
  const handleLogoutSupplier = () => {
    setLoggedInSupplier(null);
    sessionStorage.removeItem("rbg_authenticated_supplier");
    setLoginSupplierId("");
    setLoginError(null);
  };

  // Tracking Search
  const handleTrackSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = trackQuery.trim().toUpperCase();
    if (!q) return;

    setTrackSearched(true);
    const matchedBid = bids.find(
      (b) =>
        b.bidSubmissionId.toUpperCase() === q ||
        b.applicationNo.toUpperCase() === q ||
        b.tenderId.toUpperCase() === q ||
        b.supplierId.toUpperCase() === q
    );

    if (matchedBid) {
      const tender = tenders.find((t) => t.id === matchedBid.tenderId);
      setTrackedResult({ type: "bid", bid: matchedBid, tender });
      return;
    }

    const matchedApp = applications.find(
      (a) =>
        a.applicationNo.toUpperCase() === q ||
        a.tenderId.toUpperCase() === q ||
        a.supplierId.toUpperCase() === q
    );

    if (matchedApp) {
      const tender = tenders.find((t) => t.id === matchedApp.tenderId);
      setTrackedResult({ type: "application", application: matchedApp, tender });
      return;
    }

    const matchedSupplier = suppliers.find((s) => s.supplierId.toUpperCase() === q);
    if (matchedSupplier) {
      setTrackedResult({ type: "supplier", supplier: matchedSupplier });
      return;
    }

    // Unified Global Lookup Fallback
    const unified = lookupUnifiedTracking(q);
    if (unified && unified.type === "tender_bid") {
      setTrackedResult({
        type: "bid",
        bid: unified.details as BidSubmission,
        tender: tenders.find((t) => t.id === unified.details.tenderId),
      });
      return;
    } else if (unified && unified.type === "vendor_registration") {
      setTrackedResult({
        type: "supplier",
        supplier: unified.details as SupplierProfile,
      });
      return;
    }

    setTrackedResult(null);
  };

  // Bid Stage Simulator
  const handleAdvanceBidStage = (bidId: string) => {
    const updatedBids = bids.map((b) => {
      if (b.bidSubmissionId === bidId) {
        const nextStage = Math.min((b.currentStage || 4) + 1, 8);
        let nextStatus: BidSubmission["status"] = b.status;
        if (nextStage === 5) nextStatus = "Technical Scrutiny Passed";
        if (nextStage === 6) nextStatus = "Commercial Evaluation";
        if (nextStage === 7) nextStatus = "Tender Board Approved";
        if (nextStage === 8) nextStatus = "Final LOI Awarded";

        const updatedEvents = b.timelineEvents.map((evt, idx) => {
          if (idx + 1 < nextStage) {
            return { ...evt, completed: true, current: false };
          } else if (idx + 1 === nextStage) {
            return {
              ...evt,
              completed: true,
              current: true,
              date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
            };
          }
          return { ...evt, completed: false, current: false };
        });

        return {
          ...b,
          currentStage: nextStage,
          status: nextStatus,
          timelineEvents: updatedEvents,
        };
      }
      return b;
    });

    localStorage.setItem("rbg_bids_data", JSON.stringify(updatedBids));
    setBids(updatedBids);

    const activeUpdated = updatedBids.find((b) => b.bidSubmissionId === bidId);
    if (activeUpdated && trackedResult?.bid?.bidSubmissionId === bidId) {
      setTrackedResult({ ...trackedResult, bid: activeUpdated });
    }
  };

  // Admin Handler: Publish Tender
  const handleAdminCreateTender = (e: React.FormEvent) => {
    e.preventDefault();
    const slugGenerated = newTenderForm.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const createdTender: TenderNotice = {
      id: newTenderForm.id,
      slug: slugGenerated || `tender-${Date.now()}`,
      title: newTenderForm.title,
      department: newTenderForm.department,
      verticalCode: "MINING",
      tenderType: newTenderForm.tenderType,
      category: "Mining & Heavy Machinery",
      categoryFilter: "Equipment Supply",
      estimatedValue: newTenderForm.estimatedValue,
      emdAmount: newTenderForm.emdAmount,
      emdExemptionAllowed: true,
      tenderFee: "₹ 10,000 + 18% GST",
      tenderFeeExemptionAllowed: true,
      issueDate: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      closingDate: newTenderForm.closingDate,
      closingTime: "17:00 hrs IST",
      status: "Active",
      location: newTenderForm.location,
      state: "Odisha",
      documentSize: "3.2 MB PDF",
      procurementOfficer: "Er. D. K. Pattnaik (Chief Procurement Officer)",
      procurementEmail: "tenders@rashtrabharosagroup.com",
      contractPeriod: "18 Calendar Months",
      bidValidityPeriod: "180 Days",
      scopeSummary: newTenderForm.scopeSummary,
      eligibilityCriteria: {
        technical: ["Minimum 3 years proven OEM / contractor capability in related vertical.", "ISO 9001 and ISO 45001 safety compliant operations."],
        financial: ["Average annual turnover exceeding 50% of estimated value over 3 years.", "Bank solvency certificate from Scheduled Commercial Bank."],
        statutory: ["Valid GSTIN, PAN and Certificate of Incorporation.", "Affidavit of non-blacklisting by state or central agencies."],
      },
      specifications: [
        { label: "Engineering Standard", value: "Heavy Industrial Standard Grade A" },
        { label: "Quality Compliance", value: "BIS / ISO / CVC Procurement Protocol" },
      ],
      deliverables: ["Engineering drawings, fabrication and foundation blueprints.", "Cold and load trial commissioning clearance."],
      requiredDocuments: standardDocumentRequirements,
      boqItems: [
        { itemNo: "BOQ-01", description: "Equipment & Primary Material Supply Package", unit: "Lot", qty: 1, estRate: "₹ 30.00 Cr", totalEst: "₹ 30.00 Cr" },
      ],
    };

    const updated = [createdTender, ...tenders];
    localStorage.setItem("rbg_tenders_data", JSON.stringify(updated));
    setTenders(updated);

    setShowCreateTenderModal(false);
    setAdminSuccessMsg(`Tender ${createdTender.id} published successfully.`);
    setTimeout(() => setAdminSuccessMsg(null), 3500);
  };

  // Admin Handler: Broadcast Corrigendum
  const handleAdminCreateCorrigendum = (e: React.FormEvent) => {
    e.preventDefault();
    const newNotif: TenderNotification = {
      id: `NOTIF-2026-00${Math.floor(10 + Math.random() * 90)}`,
      date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      title: newCorrigendumForm.title,
      tenderRef: newCorrigendumForm.tenderRef,
      category: "Corrigendum",
      summary: newCorrigendumForm.summary,
      isImportant: true,
    };

    const updatedNotifs = [newNotif, ...notifications];
    localStorage.setItem("rbg_tender_notifications", JSON.stringify(updatedNotifs));
    setNotifications(updatedNotifs);

    const updatedTenders = tenders.map((t) =>
      t.id === newCorrigendumForm.tenderRef ? { ...t, status: "Corrigendum Issued" as const } : t
    );
    localStorage.setItem("rbg_tenders_data", JSON.stringify(updatedTenders));
    setTenders(updatedTenders);

    setShowCreateCorrigendumModal(false);
    setAdminSuccessMsg(`Corrigendum broadcasted for tender ${newCorrigendumForm.tenderRef}.`);
    setTimeout(() => setAdminSuccessMsg(null), 3500);
  };

  // Admin Handler: Delete Tender
  const handleAdminDeleteTender = (tenderId: string) => {
    if (!confirm(`Confirm deletion of tender reference ${tenderId}?`)) return;
    const updated = tenders.filter((t) => t.id !== tenderId);
    localStorage.setItem("rbg_tenders_data", JSON.stringify(updated));
    setTenders(updated);
  };

  // Filtered Tenders
  const filteredTenders = tenders.filter((item) => {
    const matchesKeyword =
      !keyword ||
      item.title.toLowerCase().includes(keyword.toLowerCase()) ||
      item.id.toLowerCase().includes(keyword.toLowerCase()) ||
      item.department.toLowerCase().includes(keyword.toLowerCase()) ||
      item.location.toLowerCase().includes(keyword.toLowerCase());

    const matchesVertical = !selectedVertical || item.department.toLowerCase().includes(selectedVertical.toLowerCase());
    const matchesType = !selectedType || item.tenderType === selectedType;

    return matchesKeyword && matchesVertical && matchesType;
  });

  const sortedTenders = [...filteredTenders].sort((a, b) => {
    if (sortBy === "closingSoon") {
      return new Date(a.closingDate).getTime() - new Date(b.closingDate).getTime();
    }
    return new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime();
  });

  const totalPages = Math.ceil(sortedTenders.length / itemsPerPage) || 1;
  const currentTenders = sortedTenders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const activeSupplier = suppliers.find((s) => s.supplierId === selectedSupplierId) || suppliers[0];

  return (
    <div className="min-h-screen bg-[#FDFEFE] text-slate-900 font-sans pb-32">
      <MetaTags
        title="Central Procurement & Tender Portal | Rashtra Bharosa Group"
        description="Official institutional tender notices, EOI dispatches, vendor empanelment, and real-time bid application tracking."
        keywords="Procurement Tenders, Vendor Empanelment, RFP Notices, Industrial Supply Chain, Tender Notices India"
        url="https://www.rashtrabharosagroup.com/tenders"
        schema={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Central Procurement & Tender Portal",
          "description": "Institutional procurement notices, expressions of interest, and vendor empanelment workflows.",
          "publisher": {
            "@type": "Organization",
            "name": "Rashtra Bharosa Group"
          }
        }}
      />

      {/* 1. Grand Executive Hero Banner with Indian Logistics & Industrial Supply Backdrop */}
      <section className="relative pt-36 sm:pt-44 pb-12 lg:pt-48 lg:pb-16 overflow-hidden flex items-end min-h-[420px] lg:min-h-[460px] bg-[#041633]">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1742203102929-f2810971a534?auto=format&fit=crop&w=2000&q=80"
            alt="Indian Procurement, Supply Chain and Industrial Tenders"
            className="w-full h-full object-cover object-center scale-105"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#041633] via-[#041633]/85 to-[#041633]/55 z-0 pointer-events-none"></div>

        <div className="max-w-[1500px] w-full mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-4xl space-y-3">
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/15 px-3.5 py-1.5 rounded-xl shadow-md">
                <img src={logo} alt="Rashtra Bharosa Group" className="w-6 h-6 object-contain" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#f2b72b]">
                  Institutional Procurement Directorate
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-white leading-tight">
                Tenders & <strong className="font-bold">Opportunities</strong>
              </h1>
              <p className="text-sm sm:text-base font-medium text-slate-200 tracking-wide max-w-3xl">
                Centralized transparent e-procurement for heavy mining, healthcare infrastructure, civil EPC, sovereign technology, and agritech.
              </p>
            </div>

            {/* Header Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                onClick={() => handleTabChange("apply")}
                className="px-5 py-2.5 rounded-lg bg-[#f2b72b] hover:bg-[#e0a620] text-[#030914] font-bold text-xs uppercase tracking-wider shadow-md transition-all inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5 text-[#030914]" />
                <span>Apply for Tenders</span>
              </button>
              <button
                onClick={() => handleTabChange("supplier")}
                className="px-5 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-xs tracking-wider uppercase backdrop-blur-md transition-all inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Building2 className="w-3.5 h-3.5 text-[#f2b72b]" />
                <span>Supplier Registration</span>
              </button>
              <button
                onClick={() => handleTabChange("track")}
                className="px-5 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-xs tracking-wider uppercase backdrop-blur-md transition-all cursor-pointer"
              >
                Track Bids
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Minimalist Tab Strip Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-[60px] md:top-[68px] z-30 shadow-xs backdrop-blur-md">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="flex items-center space-x-8 overflow-x-auto no-scrollbar text-xs">
            <button
              onClick={() => handleTabChange("notices")}
              className={`py-3.5 font-bold transition-all cursor-pointer border-b-2 -mb-px whitespace-nowrap uppercase tracking-wider flex items-center gap-1.5 ${
                activeTab === "notices"
                  ? "border-[#062B63] text-[#062B63]"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              Open Notices ({tenders.length})
            </button>

            <button
              onClick={() => handleTabChange("apply")}
              className={`py-3.5 font-bold transition-all cursor-pointer border-b-2 -mb-px whitespace-nowrap uppercase tracking-wider flex items-center gap-1.5 ${
                activeTab === "apply"
                  ? "border-[#062B63] text-[#062B63]"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              Apply for Tender
            </button>

            <button
              onClick={() => {
                handleTabChange("supplier");
                setNewSupplierId(null);
              }}
              className={`py-3.5 font-bold transition-all cursor-pointer border-b-2 -mb-px whitespace-nowrap uppercase tracking-wider flex items-center gap-1.5 ${
                activeTab === "supplier"
                  ? "border-[#062B63] text-[#062B63]"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              Register Organization
            </button>

            <button
              onClick={() => handleTabChange("track")}
              className={`py-3.5 font-bold transition-all cursor-pointer border-b-2 -mb-px whitespace-nowrap uppercase tracking-wider flex items-center gap-1.5 ${
                activeTab === "track"
                  ? "border-[#062B63] text-[#062B63]"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              Track Applications
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-12 mt-8">
        {/* Success Alert */}
        {adminSuccessMsg && (
          <div className="mb-6 p-4 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 text-xs flex items-center justify-between">
            <span className="font-medium">{adminSuccessMsg}</span>
            <button onClick={() => setAdminSuccessMsg(null)} className="text-slate-400 hover:text-slate-600">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ========================================================
            TAB 1: OPEN NOTICES (CLEAN, MINIMALIST LIST)
            ======================================================== */}
        {activeTab === "notices" && (
          <div className="space-y-8">
            {/* Sector: Official Tender Notifications, Corrigenda & Addenda */}
            {notifications.length > 0 && (
              <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#062B63]/5 via-amber-500/5 to-transparent border border-[#062B63]/15 space-y-4">
                <div className="flex items-center justify-between gap-4 border-b border-[#062B63]/10 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#062B63] text-[#f2b72b] flex items-center justify-center font-bold text-xs shadow-xs">
                      <Bell className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                        Tender Notifications, Corrigenda & Addenda
                      </h3>
                      <span className="text-[11px] text-slate-500">
                        Official Procurement Directorate Broadcasts ({notifications.length})
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#062B63] bg-[#062B63]/10 px-2.5 py-1 rounded-md">
                    Live Broadcast Feed
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {notifications.slice(0, 4).map((notif) => (
                    <div
                      key={notif.id}
                      className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-sm transition-all space-y-1.5"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-amber-50 text-amber-800 border border-amber-200">
                          {notif.category}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">{notif.date}</span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                        {notif.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                        {notif.summary}
                      </p>
                      <div className="flex items-center justify-between pt-1 text-[10px] text-slate-400 font-mono">
                        <span>Ref: <strong className="text-slate-700">{notif.tenderRef}</strong></span>
                        {tenders.find((t) => t.id === notif.tenderRef) && (
                          <button
                            type="button"
                            onClick={() => {
                              const match = tenders.find((t) => t.id === notif.tenderRef);
                              if (match) setSelectedTenderForModal(match);
                            }}
                            className="text-[#062B63] font-bold hover:underline cursor-pointer"
                          >
                            View Tender Notice →
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Minimal Filter Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-2 border-b border-slate-100">
              {/* Sleek Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by tender ID, keyword or location..."
                  value={keyword}
                  onChange={(e) => {
                    setKeyword(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-9 pr-4 py-2 text-xs rounded-md border border-slate-200 bg-white placeholder:text-slate-400 focus:outline-none focus:border-slate-800"
                />
              </div>

              {/* Minimal Vertical Dropdown */}
              <div className="flex items-center gap-2">
                <select
                  value={selectedVertical}
                  onChange={(e) => {
                    setSelectedVertical(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="px-3 py-2 text-xs rounded-md border border-slate-200 bg-white text-slate-700 focus:outline-none focus:border-slate-800"
                >
                  {verticals.map((v) => (
                    <option key={v.value} value={v.value}>{v.label}</option>
                  ))}
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 text-xs rounded-md border border-slate-200 bg-white text-slate-700 focus:outline-none focus:border-slate-800"
                >
                  <option value="newest">Latest Published</option>
                  <option value="closingSoon">Closing Soonest</option>
                </select>
              </div>
            </div>

            {/* Spacious, Minimalist Table */}
            <div className="bg-white rounded-lg border border-slate-100 shadow-2xs overflow-hidden">
              {currentTenders.length === 0 ? (
                <div className="py-20 px-6 text-center space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                    <FileText size={26} />
                  </div>
                  <h4 className="text-base sm:text-lg font-semibold text-slate-800">No Active Tenders Published at Present</h4>
                  <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                    There are currently no active public procurement notices. New RFQ, EOI, and EPC tender notices published by the Directorate will appear here.
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => handleTabChange("supplier")}
                      className="px-5 py-2.5 rounded-lg bg-[#062B63] hover:bg-[#041d44] text-white font-semibold text-xs uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                    >
                      Register Organization for Tender Alerts
                    </button>
                  </div>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {currentTenders.map((tender) => (
                    <div
                      key={tender.id}
                      className="p-6 hover:bg-slate-50/50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-6"
                    >
                      <div className="space-y-1.5 max-w-2xl">
                        <div className="flex items-center gap-2.5 text-[11px] font-mono">
                          <span className="font-semibold text-slate-900">{tender.id}</span>
                          <span className="text-slate-300">•</span>
                          <span className="text-slate-500">{tender.department}</span>
                          <span className="text-slate-300">•</span>
                          <span className="text-slate-500">{tender.tenderType}</span>
                          {tender.status === "Corrigendum Issued" && (
                            <span className="px-1.5 py-0.2 rounded text-[10px] bg-amber-50 text-amber-800 border border-amber-200 font-sans font-medium">
                              Corrigendum Issued
                            </span>
                          )}
                        </div>

                        <h3 className="text-base font-medium text-slate-900">
                          <Link to={`/tenders/${tender.slug}`} className="hover:text-[#0b376f] transition-colors">
                            {tender.title}
                          </Link>
                        </h3>

                        <p className="text-xs text-slate-500 leading-relaxed line-clamp-1">
                          {stripHtml(tender.scopeSummary)}
                        </p>

                        <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
                          <span>Location: <strong className="text-slate-700 font-normal">{tender.location}</strong></span>
                          <span>•</span>
                          <span>Estimate: <strong className="text-slate-700 font-normal">{tender.estimatedValue}</strong></span>
                          <span>•</span>
                          <span>EMD: <strong className="text-slate-700 font-normal">{tender.emdAmount}</strong></span>
                        </div>
                      </div>

                      <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                        <div className="text-right">
                          <span className="text-[10px] text-slate-400 block uppercase">Closing Date</span>
                          <span className="text-xs font-mono font-medium text-rose-700">{tender.closingDate}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleQuickApplyTender(tender)}
                            className="px-3.5 py-1.5 rounded-md bg-[#062B63] hover:bg-[#041c40] text-white font-semibold text-xs transition-colors flex items-center gap-1 cursor-pointer shadow-xs"
                          >
                            Apply <ArrowRight className="w-3 h-3 text-[#f2b72b]" />
                          </button>
                          <button
                            onClick={() => setSelectedTenderForModal(tender)}
                            className="px-3 py-1.5 rounded-md border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1"
                          >
                            <Eye className="w-3 h-3 text-slate-500" />
                            Read Notice
                          </button>
                          <Link
                            to={`/tenders/${tender.slug}`}
                            className="px-3 py-1.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
                          >
                            Dossier
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Minimal Pagination */}
              {totalPages > 1 && (
                <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>Page {currentPage} of {totalPages}</span>
                  <div className="flex items-center gap-1">
                    <button
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                      className="px-3 py-1 rounded border border-slate-200 bg-white disabled:opacity-40 cursor-pointer font-medium"
                    >
                      Previous
                    </button>
                    <button
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                      className="px-3 py-1 rounded border border-slate-200 bg-white disabled:opacity-40 cursor-pointer font-medium"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 2: DEDICATED E-BIDDING & TENDER APPLICATION FORM GATEWAY
            ======================================================== */}
        {activeTab === "apply" && (
          <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in">
            {submittedTenderBidReceipt ? (
              /* Official Sealed Bid Receipt */
              <div className="bg-white rounded-2xl border-2 border-emerald-500/80 p-6 sm:p-10 shadow-xl space-y-6 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto ring-8 ring-emerald-50">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <span className="text-[11px] font-mono font-bold tracking-widest uppercase text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    Sealed Digital Proposal Vaulted & Dispatched
                  </span>
                  <h3 className="text-2xl font-bold text-slate-900">
                    Tender Application Successfully Submitted
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
                    Your digital quotation and enterprise compliance dossier have been encrypted with SHA-256 seal. Permanent procurement tracking reference has been generated.
                  </p>
                </div>

                {/* Dual-Channel Automated Email Confirmation Notice */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-300 text-left max-w-xl mx-auto space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-950">
                    <Mail className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>Automated Dispatch Acknowledgement Generated</span>
                  </div>
                  <p className="text-xs text-emerald-900 leading-relaxed">
                    An official electronic submission receipt and bidding docket have been generated and dispatched to <strong className="font-semibold text-slate-900">{applyEmail || "your primary email"}</strong>{applyAltEmail ? <> and duplicate copy to <strong className="font-semibold text-slate-900">{applyAltEmail}</strong></> : null}.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 text-left max-w-xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Bid Submission ID</span>
                    <span className="font-mono font-bold text-[#062B63] text-sm">{submittedTenderBidReceipt.bidSubmissionId}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Application Reference No</span>
                    <span className="font-mono font-bold text-slate-900 text-sm">{submittedTenderBidReceipt.applicationNo}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Tender Notice ID</span>
                    <span className="font-semibold text-slate-900">{submittedTenderBidReceipt.tenderId}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Bidding Capacity</span>
                    <span className="font-bold text-[#062B63]">{applyBiddingMode}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Submitting Enterprise</span>
                    <span className="font-semibold text-slate-900">{submittedTenderBidReceipt.companyName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Authorized Signatory</span>
                    <span className="font-semibold text-slate-900">{submittedTenderBidReceipt.contactPerson}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">RBG Supplier ID</span>
                    <span className="font-mono font-semibold text-slate-900">{submittedTenderBidReceipt.supplierId}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">MSME / Udyam Ref</span>
                    <span className="font-mono font-semibold text-emerald-800">{applyMsmeNumber || "Verified"}</span>
                  </div>
                  <div className="sm:col-span-2 pt-2 border-t border-slate-200 flex flex-wrap justify-between items-center gap-2 text-[11px]">
                    <span className="text-slate-500 font-medium">Security: 256-bit Encrypted Vault</span>
                    <span className="text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded">Status: {submittedTenderBidReceipt.status}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      setTrackQuery(submittedTenderBidReceipt.bidSubmissionId);
                      handleTabChange("track");
                    }}
                    className="px-5 py-2.5 rounded-xl bg-[#062B63] hover:bg-[#041c40] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm flex items-center gap-2 cursor-pointer"
                  >
                    <Clock className="w-4 h-4 text-[#f2b72b]" />
                    Track in Live Timeline
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <Printer className="w-4 h-4 text-slate-500" />
                    Print Sealed Receipt
                  </button>
                  <button
                    onClick={() => {
                      setSubmittedTenderBidReceipt(null);
                      setApplyApplicantName("");
                      setApplyApplicantEmail("");
                      setApplyCompanyName("");
                      setApplyEmail("");
                      setApplyAltEmail("");
                      setApplyPhone("");
                      setApplyAltPhone("");
                    }}
                    className="px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
                  >
                    Apply for Another Tender
                  </button>
                </div>
              </div>
            ) : (
              /* Dedicated Multi-Section Form */
              <form onSubmit={handleSubmitTenderBid} className="space-y-6">
                {/* Header Banner */}
                <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#062B63] text-[#f2b72b] flex items-center justify-center font-bold text-sm shadow-md">
                        <Lock className="w-5 h-5" />
                      </div>
                      <div>
                        <h2 className="text-base sm:text-lg font-bold text-slate-900">
                          E-Bidding & Tender Application Gateway
                        </h2>
                        <p className="text-xs text-slate-500">
                          Comprehensive digital proposal submission portal with automated multi-channel notification.
                        </p>
                      </div>
                    </div>
                    <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-semibold border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Zero Portal Submission Fee
                    </span>
                  </div>
                </div>

                {/* Section 1: Authorized Representative / Applicant Details */}
                <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#062B63] text-white text-xs font-bold flex items-center justify-center">1</span>
                      <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                        Applicant / Authorized Representative Details *
                      </h3>
                    </div>
                    <span className="text-[11px] text-slate-400">Submitting Signatory</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Applicant Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rajeshwar Sengupta"
                        value={applyApplicantName}
                        onChange={(e) => setApplyApplicantName(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 font-medium text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#062B63]/20 focus:border-[#062B63] transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Designation / Official Title *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Director - Projects & Execution / VP Tendering"
                        value={applyApplicantDesignation}
                        onChange={(e) => setApplyApplicantDesignation(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 font-medium text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#062B63]/20 focus:border-[#062B63] transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Signatory Authorization Capacity *
                      </label>
                      <select
                        value={applySignatoryAuthority}
                        onChange={(e) => setApplySignatoryAuthority(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 font-medium text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#062B63]/20 focus:border-[#062B63] transition-all cursor-pointer"
                      >
                        <option value="Power of Attorney / Board Resolution">Power of Attorney / Board Resolution</option>
                        <option value="Managing Director / Director">Managing Director / Director</option>
                        <option value="Sole Proprietor / Partner">Sole Proprietor / Partner</option>
                        <option value="Authorized Consortium Lead Representative">Authorized Consortium Lead Representative</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Signatory Official Email ID *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. rajeshwar.sengupta@bharatepc.com"
                        value={applyApplicantEmail}
                        onChange={(e) => setApplyApplicantEmail(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 font-mono text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#062B63]/20 focus:border-[#062B63] transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 2: Enterprise / Organization Profile */}
                <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#062B63] text-white text-xs font-bold flex items-center justify-center">2</span>
                      <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                        Bidding Enterprise & Legal Profile *
                      </h3>
                    </div>
                    <span className="text-[11px] text-slate-400">Corporate Details</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Registered Legal Company / Organization Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Bharat EPC & Heavy Engineering Infrastructure Pvt Ltd"
                        value={applyCompanyName}
                        onChange={(e) => setApplyCompanyName(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 font-medium text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#062B63]/20 focus:border-[#062B63] transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Enterprise Constitution / Entity Type *
                      </label>
                      <select
                        value={applyConstitution}
                        onChange={(e) => setApplyConstitution(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 font-medium text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#062B63]/20 focus:border-[#062B63] transition-all cursor-pointer"
                      >
                        <option value="Private Limited Company">Private Limited Company</option>
                        <option value="Public Limited Company">Public Limited Company</option>
                        <option value="Consortium / Joint Venture (JV)">Consortium / Joint Venture (JV)</option>
                        <option value="Limited Liability Partnership (LLP)">Limited Liability Partnership (LLP)</option>
                        <option value="Partnership Firm">Partnership Firm</option>
                        <option value="Sole Proprietorship">Sole Proprietorship</option>
                        <option value="Foreign Corporation / Multinational">Foreign Corporation / Multinational</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Corporate CIN / Registration No *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. U45201OR2018PTC028491"
                        value={applyCinNumber}
                        onChange={(e) => setApplyCinNumber(e.target.value.toUpperCase())}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 font-mono text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#062B63]/20 focus:border-[#062B63] transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        15-Digit GSTIN Number *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 21AAACR8841P1Z5"
                        value={applyGstin}
                        onChange={(e) => setApplyGstin(e.target.value.toUpperCase())}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 font-mono font-bold text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#062B63]/20 focus:border-[#062B63] transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Permanent Account Number (PAN) *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. AAACR8841P"
                        value={applyPanNumber}
                        onChange={(e) => setApplyPanNumber(e.target.value.toUpperCase())}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 font-mono font-bold text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#062B63]/20 focus:border-[#062B63] transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        MSME / Udyam Certificate Number *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. UDYAM-OD-19-0019284"
                        value={applyMsmeNumber}
                        onChange={(e) => setApplyMsmeNumber(e.target.value.toUpperCase())}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 font-mono text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#062B63]/20 focus:border-[#062B63] transition-all"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Registered Corporate Headquarters Address *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Plot 410, Infocity Industrial Corridor, Chandrasekharpur"
                        value={applyCompanyAddress}
                        onChange={(e) => setApplyCompanyAddress(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#062B63]/20 focus:border-[#062B63] transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">City *</label>
                      <input
                        type="text"
                        required
                        value={applyCity}
                        onChange={(e) => setApplyCity(e.target.value)}
                        className="w-full px-4 py-2 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs focus:outline-none focus:border-[#062B63]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">State & Pincode *</label>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          required
                          value={applyState}
                          onChange={(e) => setApplyState(e.target.value)}
                          placeholder="State"
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs focus:outline-none focus:border-[#062B63]"
                        />
                        <input
                          type="text"
                          required
                          value={applyPincode}
                          onChange={(e) => setApplyPincode(e.target.value)}
                          placeholder="PIN Code"
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs font-mono focus:outline-none focus:border-[#062B63]"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 3: Tender & Bidding Reference */}
                <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#062B63] text-white text-xs font-bold flex items-center justify-center">3</span>
                      <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                        Tender Selection & Bidding Reference *
                      </h3>
                    </div>
                    <span className="text-[11px] text-slate-400">
                      {tenders.length} active tenders
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Bidding Capacity / Mode *
                      </label>
                      <select
                        value={applyBiddingMode}
                        onChange={(e) => setApplyBiddingMode(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 font-medium text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#062B63]/20 focus:border-[#062B63] transition-all cursor-pointer"
                      >
                        <option value="Sole Independent Bidder">Sole Independent Bidder</option>
                        <option value="Consortium Lead Member">Consortium Lead Member</option>
                        <option value="Joint Venture (JV) Entity">Joint Venture (JV) Entity</option>
                        <option value="Registered Corporate Entity">Registered Corporate Entity</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        RBG Registered Organization ID (Supplier ID) *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. RBG-SUP-000184 or RBG-SUP-2026-6321"
                        value={applyRbgSupplierId}
                        onChange={(e) => setApplyRbgSupplierId(e.target.value.trim().toUpperCase())}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 font-mono font-bold text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#062B63]/20 focus:border-[#062B63] transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Select Published Tender NIT Reference ID *
                    </label>
                    {tenders.length === 0 ? (
                      <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
                        <span>No active tender notices in directory. Please select or enter your tender reference ID.</span>
                      </div>
                    ) : (
                      <select
                        value={applyTenderId}
                        onChange={(e) => setApplyTenderId(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 font-medium text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#062B63]/20 focus:border-[#062B63] transition-all cursor-pointer"
                      >
                        {tenders.map((t) => (
                          <option key={t.id} value={t.id}>
                            {t.id} — {t.title} ({t.estimatedValue})
                          </option>
                        ))}
                      </select>
                    )}
                  </div>

                  {/* Selected Tender Snapshot Card */}
                  {(() => {
                    const currentTender = tenders.find((t) => t.id === applyTenderId || t.slug === applyTenderId) || tenders[0];
                    if (!currentTender) return null;

                    return (
                      <div className="p-4.5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-2.5">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-bold text-xs bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-900">
                                {currentTender.id}
                              </span>
                              <span className="text-xs text-slate-500 font-medium">{currentTender.department}</span>
                            </div>
                            <h4 className="font-bold text-slate-900 text-sm mt-1">
                              {currentTender.title}
                            </h4>
                          </div>
                          <button
                            type="button"
                            onClick={() => setSelectedTenderForModal(currentTender)}
                            className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 text-[#062B63] text-xs font-bold transition-colors flex items-center gap-1.5 shrink-0 self-start sm:self-auto cursor-pointer shadow-2xs"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            Read Complete Notice & BOQ
                          </button>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs text-slate-600">
                          <div>
                            <span className="text-[10px] text-slate-400 block uppercase font-bold">Estimated Value</span>
                            <span className="font-bold text-slate-900">{currentTender.estimatedValue}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 block uppercase font-bold">EMD Deposit</span>
                            <span className="font-bold text-slate-900">{currentTender.emdAmount}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 block uppercase font-bold">Location</span>
                            <span className="font-medium text-slate-900 truncate block">{currentTender.location}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 block uppercase font-bold">Submission Deadline</span>
                            <span className="font-bold text-rose-700">{currentTender.closingDate}</span>
                          </div>
                        </div>

                        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed bg-white p-2.5 rounded-lg border border-slate-200/60">
                          {stripHtml(currentTender.scopeSummary)}
                        </p>
                      </div>
                    );
                  })()}
                </div>

                {/* Section 4: Official Company Communication Information */}
                <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#062B63] text-white text-xs font-bold flex items-center justify-center">4</span>
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                      Official Company Communication Information *
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Primary Company Official Email ID *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. procurement@bharatepc.com"
                        value={applyEmail}
                        onChange={(e) => setApplyEmail(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#062B63]/20 focus:border-[#062B63] transition-all font-mono"
                      />
                      <span className="text-[11px] text-slate-400 mt-1 block">
                        Official proposal confirmation and encrypted receipt will be sent here.
                      </span>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Alternative Official Email ID *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. director.projects@bharatepc.com"
                        value={applyAltEmail}
                        onChange={(e) => setApplyAltEmail(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#062B63]/20 focus:border-[#062B63] transition-all font-mono"
                      />
                      <span className="text-[11px] text-slate-400 mt-1 block">
                        Duplicate submission confirmation will be dispatched simultaneously.
                      </span>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Primary Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +91 98765 43210"
                        value={applyPhone}
                        onChange={(e) => setApplyPhone(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#062B63]/20 focus:border-[#062B63] transition-all font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Alternative Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="e.g. +91 674 259 8811"
                        value={applyAltPhone}
                        onChange={(e) => setApplyAltPhone(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#062B63]/20 focus:border-[#062B63] transition-all font-mono"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Corporate Website / Domain URL (Optional)
                      </label>
                      <input
                        type="url"
                        placeholder="e.g. https://www.bharatepc.com"
                        value={applyWebsite}
                        onChange={(e) => setApplyWebsite(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#062B63]/20 focus:border-[#062B63] transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 5: Mandatory Statutory Declarations */}
                <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#062B63] text-white text-xs font-bold flex items-center justify-center">5</span>
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                      Mandatory Undertakings & Declarations *
                    </h3>
                  </div>

                  <div className="space-y-3 pt-2 text-xs text-slate-700 border-t border-slate-200">
                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={applyDeclarations.integrityPact}
                        onChange={(e) => setApplyDeclarations({ ...applyDeclarations, integrityPact: e.target.checked })}
                        className="mt-0.5 rounded border-slate-300 text-[#062B63]"
                      />
                      <span>We formally accept and abide by Rashtra Bharosa Group's Corporate Integrity Pact and ethical procurement charter.</span>
                    </label>

                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={applyDeclarations.nonBlacklisted}
                        onChange={(e) => setApplyDeclarations({ ...applyDeclarations, nonBlacklisted: e.target.checked })}
                        className="mt-0.5 rounded border-slate-300 text-[#062B63]"
                      />
                      <span>We certify that our enterprise has not been debarred, blacklisted, or restrained by any Central/State Govt. body or PSU.</span>
                    </label>

                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={applyDeclarations.technicalConformance}
                        onChange={(e) => setApplyDeclarations({ ...applyDeclarations, technicalConformance: e.target.checked })}
                        className="mt-0.5 rounded border-slate-300 text-[#062B63]"
                      />
                      <span>All quoted technical parameters, BOQ items, warranties, and delivery schedules conform strictly to the published NIT dossier.</span>
                    </label>

                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={applyDeclarations.dataAccuracy}
                        onChange={(e) => setApplyDeclarations({ ...applyDeclarations, dataAccuracy: e.target.checked })}
                        className="mt-0.5 rounded border-slate-300 text-[#062B63]"
                      />
                      <span>I hereby declare that all submitted applicant, company, and tax particulars are accurate and legally authorized.</span>
                    </label>

                    <label className="flex items-start gap-2.5 cursor-pointer bg-slate-50 p-3 rounded-xl border border-slate-200">
                      <input
                        type="checkbox"
                        checked={applyDeclarations.tenderDisclaimer}
                        onChange={(e) => setApplyDeclarations({ ...applyDeclarations, tenderDisclaimer: e.target.checked })}
                        className="mt-0.5 rounded border-slate-300 text-[#062B63]"
                      />
                      <span className="font-medium text-slate-800">
                        I have declared that I am applying for this tender, and I understand that submitting this application does not imply, guarantee, or entitle my organization to the award of the tender, which remains strictly subject to technical scrutiny, financial evaluation, and official approval.
                      </span>
                    </label>
                  </div>
                </div>

                {/* Submit CTA */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="text-xs text-slate-500">
                    Official submission under Corporate Procurement & Directorate Governance.
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmittingTenderBid || !applyDeclarations.integrityPact || !applyDeclarations.nonBlacklisted || !applyDeclarations.technicalConformance || !applyDeclarations.dataAccuracy || !applyDeclarations.tenderDisclaimer}
                    className="px-8 py-3.5 rounded-xl bg-[#062B63] hover:bg-[#041c40] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md disabled:opacity-40 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmittingTenderBid ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-[#f2b72b]" />
                        Submitting Tender Application...
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4 text-[#f2b72b]" />
                        Submit Tender Application
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* ========================================================
            TAB 3: INSTITUTIONAL VENDOR EMPANELMENT & ORGANIZATION LOGIN PORTAL
            ======================================================== */}
        {activeTab === "supplier" && (
          <div className="max-w-5xl mx-auto space-y-8">
            {loggedInSupplier ? (
              /* Authenticated Organization Dashboard */
              <div className="space-y-8 animate-in fade-in">
                {/* Session Top Bar */}
                <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-[#062B63]/10 border border-[#062B63]/20 flex items-center justify-center shrink-0">
                      <Building2 className="w-6 h-6 text-[#062B63]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                          Active Empanelled Session
                        </span>
                      </div>
                      <h2 className="text-lg sm:text-xl font-bold text-slate-900 mt-1">
                        {loggedInSupplier.companyName}
                      </h2>
                      <span className="text-xs font-mono text-slate-500">
                        ID: <strong className="text-[#062B63]">{loggedInSupplier.supplierId}</strong> • GSTIN: {loggedInSupplier.gstin}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleTabChange("notices")}
                      className="px-4 py-2 rounded-xl bg-[#062B63] hover:bg-[#041c40] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
                    >
                      <ArrowRight className="w-3.5 h-3.5 text-[#f2b72b]" />
                      Browse Tenders
                    </button>
                    <button
                      type="button"
                      onClick={handleLogoutSupplier}
                      className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-rose-50 hover:text-rose-700 text-slate-600 text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Log Out
                    </button>
                  </div>
                </div>

                {/* Smart PVC Digital ID Card for Logged In User */}
                <div 
                  id="printable-supplier-card"
                  className="max-w-3xl mx-auto rounded-3xl bg-gradient-to-br from-[#020b1c] via-[#051a3d] to-[#010814] text-white border-2 border-[#D9961A]/50 shadow-[0_25px_60px_-15px_rgba(2,11,28,0.9),inset_0_1px_2px_rgba(255,255,255,0.25)] p-6 sm:p-9 relative overflow-hidden space-y-6 print:m-0 print:shadow-none print:border-slate-800"
                >
                  <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#D9961A]/20 via-blue-500/15 to-transparent rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
                  
                  <div className="flex items-center justify-between gap-4 border-b border-white/15 pb-5 relative z-10">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-2xl bg-white/10 p-2 border border-white/20 backdrop-blur-md flex items-center justify-center shadow-inner">
                        <img src={logo} alt="Rashtra Bharosa Group" className="w-full h-full object-contain" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-base sm:text-lg font-bold text-white tracking-wide">
                            Rashtra Bharosa Group
                          </h4>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D9961A] animate-pulse" />
                        </div>
                        <span className="text-[10px] sm:text-[11px] font-mono font-semibold text-[#f2b72b] uppercase tracking-[0.18em] block">
                          Sovereign Empanelled Organization Credential
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500/25 to-teal-500/25 border border-emerald-400/40 text-emerald-300 text-[11px] font-mono font-bold uppercase tracking-wider backdrop-blur-md shadow-sm shrink-0">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Class-A Verified</span>
                    </div>
                  </div>

                  {/* EMV Chip & RFID */}
                  <div className="flex items-center justify-between gap-4 relative z-10 pt-1">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-9 rounded-lg bg-gradient-to-br from-[#FFE082] via-[#FFB300] to-[#FF8F00] p-1 shadow-md border border-[#FFE082]/60 relative overflow-hidden flex flex-col justify-between">
                        <div className="w-full h-[1px] bg-amber-900/40" />
                        <div className="flex justify-between items-center h-full">
                          <div className="w-2.5 h-3.5 border-r border-amber-900/40 rounded-sm" />
                          <div className="w-3 h-3 rounded-full border border-amber-900/50 bg-amber-300/30" />
                          <div className="w-2.5 h-3.5 border-l border-amber-900/40 rounded-sm" />
                        </div>
                        <div className="w-full h-[1px] bg-amber-900/40" />
                      </div>

                      <div className="text-slate-400 flex items-center gap-1">
                        <Wifi className="w-5 h-5 rotate-90 text-[#D9961A]/80" />
                        <span className="text-[9px] font-mono uppercase tracking-widest text-slate-400 hidden sm:inline">
                          NFC Encrypted
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[9px] font-mono uppercase tracking-widest text-slate-400 block">Status</span>
                      <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1 justify-end">
                        <Check className="w-3 h-3" />
                        ACTIVE & AUTHORIZED
                      </span>
                    </div>
                  </div>

                  {/* Main ID & Copy Button */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-xl relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] text-[#f2b72b] font-bold block mb-1">
                        Permanent Sovereign Supplier ID
                      </span>
                      <div className="font-mono text-2xl sm:text-3xl font-black text-white tracking-widest text-shadow-sm">
                        {loggedInSupplier.supplierId}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(loggedInSupplier.supplierId);
                          setCopiedId(true);
                          setTimeout(() => setCopiedId(false), 2500);
                        }}
                        className={`px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 shrink-0 ${
                          copiedId
                            ? "bg-emerald-500 text-white shadow-lg scale-102"
                            : "bg-white/15 hover:bg-white/25 text-white border border-white/25"
                        }`}
                      >
                        {copiedId ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>ID Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4 text-[#f2b72b]" />
                            <span>Copy ID</span>
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => window.print()}
                        className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-semibold tracking-wider uppercase transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <Printer className="w-4 h-4 text-[#f2b72b]" />
                        <span>Print Card</span>
                      </button>
                    </div>
                  </div>

                  {/* Details Grid + QR Code */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-2 border-t border-white/15 text-xs relative z-10">
                    <div className="md:col-span-8 grid grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <span className="text-slate-400 block text-[10px] font-mono uppercase tracking-wider font-bold">
                          Organization Legal Registered Name
                        </span>
                        <span className="font-bold text-sm sm:text-base text-white block mt-0.5">
                          {loggedInSupplier.companyName}
                        </span>
                      </div>

                      <div>
                        <span className="text-slate-400 block text-[10px] font-mono uppercase tracking-wider font-bold">
                          Verified GSTIN
                        </span>
                        <span className="font-mono text-amber-300 font-bold tracking-wider block mt-0.5">
                          {loggedInSupplier.gstin}
                        </span>
                      </div>

                      <div>
                        <span className="text-slate-400 block text-[10px] font-mono uppercase tracking-wider font-bold">
                          PAN Number
                        </span>
                        <span className="font-mono text-slate-200 font-bold tracking-wider block mt-0.5">
                          {loggedInSupplier.panNumber}
                        </span>
                      </div>

                      <div>
                        <span className="text-slate-400 block text-[10px] font-mono uppercase tracking-wider font-bold">
                          Supply Vertical
                        </span>
                        <span className="text-slate-200 font-medium truncate block mt-0.5">
                          {loggedInSupplier.businessCategory}
                        </span>
                      </div>

                      <div>
                        <span className="text-slate-400 block text-[10px] font-mono uppercase tracking-wider font-bold">
                          Authorized Signatory
                        </span>
                        <span className="text-slate-200 font-medium truncate block mt-0.5">
                          {loggedInSupplier.contactPerson}
                        </span>
                      </div>

                      <div>
                        <span className="text-slate-400 block text-[10px] font-mono uppercase tracking-wider font-bold">
                          Official Email & Contact
                        </span>
                        <span className="text-slate-200 font-medium truncate block mt-0.5">
                          {loggedInSupplier.email}
                        </span>
                      </div>

                      <div>
                        <span className="text-slate-400 block text-[10px] font-mono uppercase tracking-wider font-bold">
                          Empanelment Validity
                        </span>
                        <span className="text-emerald-300 font-mono font-bold block mt-0.5">
                          Lifetime / Sovereign Active
                        </span>
                      </div>
                    </div>

                    {/* Working Scannable QR Code */}
                    <div className="md:col-span-4 flex flex-col items-center justify-center p-4 rounded-2xl bg-white/5 border border-white/10 text-center space-y-2">
                      <div className="p-2 bg-white rounded-xl shadow-md flex items-center justify-center">
                        <img
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
                            `https://rashtrabharosagroup.com/tenders?tab=track&q=${loggedInSupplier.supplierId}`
                          )}&color=041633&bgcolor=ffffff&qzone=2`}
                          alt={`QR Code for ${loggedInSupplier.supplierId}`}
                          className="w-24 h-24 object-contain rounded-md"
                          loading="lazy"
                        />
                      </div>
                      <span className="text-[9px] font-mono text-slate-300 uppercase tracking-wider block leading-tight">
                        Scan with camera to verify authenticity
                      </span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[9px] font-mono text-slate-400 relative z-10 gap-1">
                    <span>CENTRAL PROCUREMENT REPOSITORY • RASHTRA BHAROSA GROUP</span>
                    <span className="text-amber-300 font-semibold">SECURE AUTHENTICATED CREDENTIAL</span>
                  </div>
                </div>

                {/* Submitted Applications & Bidding History */}
                <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-2.5">
                      <History className="w-5 h-5 text-[#062B63]" />
                      <h3 className="text-lg font-bold text-slate-900">
                        Tender Proposals & Bidding History
                      </h3>
                    </div>
                    <span className="text-xs text-slate-500 font-mono">
                      Total Submissions: {bids.filter((b) => b.supplierId === loggedInSupplier.supplierId).length}
                    </span>
                  </div>

                  {bids.filter((b) => b.supplierId === loggedInSupplier.supplierId).length > 0 ? (
                    <div className="space-y-4">
                      {bids
                        .filter((b) => b.supplierId === loggedInSupplier.supplierId)
                        .map((bid) => {
                          const tender = tenders.find((t) => t.id === bid.tenderId);
                          return (
                            <div
                              key={bid.bidSubmissionId}
                              className="p-4 sm:p-5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-all space-y-3"
                            >
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                <div>
                                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
                                    Bid Ref: {bid.bidSubmissionId} • Tender Ref: {bid.tenderId}
                                  </span>
                                  <h4 className="text-sm font-bold text-slate-900 mt-0.5">
                                    {tender?.title || bid.tenderTitle}
                                  </h4>
                                </div>
                                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-50 text-amber-800 border border-amber-200 self-start sm:self-auto">
                                  {bid.status}
                                </span>
                              </div>

                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-200 text-xs text-slate-600">
                                <div>
                                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Quoted Value</span>
                                  <span className="font-mono font-bold text-slate-900">{bid.quotedPrice}</span>
                                </div>
                                <div>
                                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Submission Date</span>
                                  <span className="text-slate-900">{bid.submissionDate}</span>
                                </div>
                                <div>
                                  <span className="text-slate-400 block text-[10px] uppercase font-bold">EMD Security</span>
                                  <span className="text-emerald-700 font-semibold">{bid.emdRef || "Verified"}</span>
                                </div>
                                <div className="flex items-center justify-end">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setTrackQuery(bid.bidSubmissionId);
                                      handleTabChange("track");
                                    }}
                                    className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs transition-colors cursor-pointer"
                                  >
                                    Track Status →
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  ) : (
                    <div className="text-center py-10 px-4 rounded-xl border border-dashed border-slate-200 bg-slate-50/50 space-y-3">
                      <FileCheck2 className="w-10 h-10 text-slate-300 mx-auto" />
                      <div className="space-y-1">
                        <h4 className="text-sm font-bold text-slate-800">No Bids Submitted Yet</h4>
                        <p className="text-xs text-slate-500 max-w-md mx-auto">
                          Your organization is empanelled and ready. Explore our active procurement notices to submit your commercial & technical bids.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleTabChange("notices")}
                        className="px-5 py-2 rounded-xl bg-[#062B63] hover:bg-[#041c40] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer inline-flex items-center gap-1.5"
                      >
                        Explore Open Tenders
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* Un-Authenticated View: Segment Switcher between Register & 2-Step OTP Login */
              <div className="space-y-8">
                {/* Luxury Segment Switcher */}
                <div className="flex items-center justify-center">
                  <div className="inline-flex p-1.5 bg-slate-100/90 border border-slate-200/80 rounded-2xl shadow-inner gap-1">
                    <button
                      type="button"
                      onClick={() => {
                        setSupplierMode("register");
                        setLoginError(null);
                      }}
                      className={`py-2.5 px-6 rounded-xl text-xs font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        supplierMode === "register"
                          ? "bg-[#062B63] text-white shadow-md shadow-[#062B63]/20"
                          : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                      }`}
                    >
                      <Building2 className="w-3.5 h-3.5 text-[#f2b72b]" />
                      <span>Register Organization</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSupplierMode("login");
                        setLoginError(null);
                      }}
                      className={`py-2.5 px-6 rounded-xl text-xs font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        supplierMode === "login"
                          ? "bg-[#062B63] text-white shadow-md shadow-[#062B63]/20"
                          : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                      }`}
                    >
                      <KeyRound className="w-3.5 h-3.5 text-[#f2b72b]" />
                      <span>Organization Login</span>
                    </button>
                  </div>
                </div>

                {/* MODE A: 2-STEP LOGIN (PREMIUM SOVEREIGN EXECUTIVE PORTAL) */}
                {supplierMode === "login" && (
                  <div className="relative max-w-xl mx-auto">
                    {/* Ambient Glow */}
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-80 h-40 bg-gradient-to-b from-[#062B63]/10 via-[#D9961A]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

                    {/* Premium Executive Auth Card */}
                    <div className="relative rounded-3xl bg-white border border-slate-200/80 p-8 sm:p-10 shadow-[0_20px_50px_-12px_rgba(6,43,99,0.12)] space-y-7">
                      
                      {/* Top Emblem & Header */}
                      <div className="text-center space-y-3">
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#062B63] text-white shadow-lg shadow-[#062B63]/25 border border-white/20">
                          <KeyRound className="w-6 h-6 text-[#f2b72b]" />
                        </div>
                        
                        <div className="space-y-1.5">
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 text-[#062B63] text-[10px] font-mono font-bold tracking-widest uppercase border border-slate-200/80">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                            Sovereign Procurement Gateway
                          </div>
                          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                            Organization Portal Login
                          </h2>
                          <p className="text-xs sm:text-sm text-slate-600 font-normal max-w-md mx-auto leading-relaxed">
                            Access your empanelled vendor dashboard, vaulted bidding history, and digital smart credentials.
                          </p>
                        </div>
                      </div>

                      {loginError && (
                        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200/90 text-xs text-rose-900 flex items-start gap-3 animate-in fade-in">
                          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
                          <span className="leading-relaxed">{loginError}</span>
                        </div>
                      )}

                      <form onSubmit={handleSupplierLogin} className="space-y-6 text-xs">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <label className="font-bold text-slate-800 text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                              <Building2 className="w-3.5 h-3.5 text-[#062B63]" />
                              Organization Registration ID
                            </label>
                            <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                              Database Verified
                            </span>
                          </div>
                          
                          <div className="relative">
                            <input
                              type="text"
                              required
                              placeholder="e.g. RBG-SUP-000184"
                              value={loginSupplierId}
                              onChange={(e) => {
                                setLoginSupplierId(e.target.value.trim().toUpperCase());
                                if (loginError) setLoginError(null);
                              }}
                              className="w-full px-4 py-3.5 rounded-xl bg-slate-50/70 hover:bg-slate-50 border border-slate-300 text-slate-950 font-mono font-bold uppercase text-sm tracking-wider placeholder:text-slate-400 placeholder:font-normal placeholder:tracking-normal placeholder:capitalize focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#062B63]/20 focus:border-[#062B63] transition-all"
                            />
                            {loginSupplierId && (
                              <button
                                type="button"
                                onClick={() => setLoginSupplierId("")}
                                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 text-xs cursor-pointer"
                              >
                                ✕
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Submit Button */}
                        <button
                          type="submit"
                          className="w-full py-4 rounded-xl bg-[#062B63] hover:bg-[#041c40] text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2"
                        >
                          <KeyRound className="w-4 h-4 text-[#f2b72b]" />
                          <span>Login to Organization Portal</span>
                          <ArrowRight className="w-4 h-4 text-[#f2b72b]" />
                        </button>

                        {/* Switch to Register footer note */}
                        <div className="text-center pt-1 border-t border-slate-100">
                          <span className="text-slate-500 text-xs">
                            Don't have an Organization Registration ID?{" "}
                            <button
                              type="button"
                              onClick={() => {
                                setSupplierMode("register");
                                setLoginError(null);
                              }}
                              className="text-[#062B63] font-bold hover:underline cursor-pointer ml-1"
                            >
                              Register your organization now →
                            </button>
                          </span>
                        </div>
                      </form>
                    </div>
                  </div>
                )}

                {/* MODE B: REGISTRATION MODE */}
                {supplierMode === "register" && (
                  <div>
                    {newSupplierId ? (
              /* Success State: Official Sovereign Certificate Dossier */
              <div className="rounded-3xl bg-white border border-slate-200 p-8 sm:p-12 shadow-xl space-y-8 animate-in fade-in">
                <div className="text-center space-y-3 max-w-xl mx-auto">
                  <div className="w-16 h-16 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-center mx-auto text-emerald-600 shadow-sm">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-block">
                      Empanelment Successfully Verified
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                      Organization Successfully Registered
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Your organization has been vaulted in the Rashtra Bharosa Group Sovereign Procurement Directory. An official confirmation email with your permanent credentials has been dispatched to <strong>{regForm.email}</strong>.
                    </p>
                  </div>
                </div>

                {/* Ultra-Realistic Sovereign Smart Credential Card */}
                <div 
                  id="printable-supplier-card"
                  className="max-w-3xl mx-auto rounded-3xl bg-gradient-to-br from-[#020b1c] via-[#051a3d] to-[#010814] text-white border-2 border-[#D9961A]/50 shadow-[0_25px_60px_-15px_rgba(2,11,28,0.9),inset_0_1px_2px_rgba(255,255,255,0.25)] p-6 sm:p-9 relative overflow-hidden space-y-6 print:m-0 print:shadow-none print:border-slate-800"
                >
                  {/* Holographic Background Watermark & Refractive Accents */}
                  <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#D9961A]/20 via-blue-500/15 to-transparent rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
                  
                  {/* Top Header: Conglomerate Emblem + Verified Hologram Badge */}
                  <div className="flex items-center justify-between gap-4 border-b border-white/15 pb-5 relative z-10">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-2xl bg-white/10 p-2 border border-white/20 backdrop-blur-md flex items-center justify-center shadow-inner">
                        <img src={logo} alt="Rashtra Bharosa Group" className="w-full h-full object-contain" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-base sm:text-lg font-bold text-white tracking-wide">
                            Rashtra Bharosa Group
                          </h4>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D9961A] animate-pulse" />
                        </div>
                        <span className="text-[10px] sm:text-[11px] font-mono font-semibold text-[#f2b72b] uppercase tracking-[0.18em] block">
                          Sovereign Empanelled Organization Credential
                        </span>
                      </div>
                    </div>

                    {/* Class-A Security Hologram Seal */}
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500/25 to-teal-500/25 border border-emerald-400/40 text-emerald-300 text-[11px] font-mono font-bold uppercase tracking-wider backdrop-blur-md shadow-sm shrink-0">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Class-A Verified</span>
                    </div>
                  </div>

                  {/* Smart EMV Chip & Contactless RFID Row */}
                  <div className="flex items-center justify-between gap-4 relative z-10 pt-1">
                    <div className="flex items-center gap-4">
                      {/* Realistic Golden EMV Smart Chip */}
                      <div className="w-12 h-9 rounded-lg bg-gradient-to-br from-[#FFE082] via-[#FFB300] to-[#FF8F00] p-1 shadow-md border border-[#FFE082]/60 relative overflow-hidden flex flex-col justify-between">
                        <div className="w-full h-[1px] bg-amber-900/40" />
                        <div className="flex justify-between items-center h-full">
                          <div className="w-2.5 h-3.5 border-r border-amber-900/40 rounded-sm" />
                          <div className="w-3 h-3 rounded-full border border-amber-900/50 bg-amber-300/30" />
                          <div className="w-2.5 h-3.5 border-l border-amber-900/40 rounded-sm" />
                        </div>
                        <div className="w-full h-[1px] bg-amber-900/40" />
                      </div>

                      {/* Contactless RFID Waves */}
                      <div className="text-slate-400 flex items-center gap-1">
                        <Wifi className="w-5 h-5 rotate-90 text-[#D9961A]/80" />
                        <span className="text-[9px] font-mono uppercase tracking-widest text-slate-400 hidden sm:inline">
                          NFC Encrypted
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[9px] font-mono uppercase tracking-widest text-slate-400 block">Status</span>
                      <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1 justify-end">
                        <Check className="w-3 h-3" />
                        ACTIVE & AUTHORIZED
                      </span>
                    </div>
                  </div>

                  {/* Main ID & Live Copy Action */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-xl relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] text-[#f2b72b] font-bold block mb-1">
                        Permanent Sovereign Supplier ID
                      </span>
                      <div className="font-mono text-2xl sm:text-3xl font-black text-white tracking-widest text-shadow-sm">
                        {newSupplierId}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        if (newSupplierId) {
                          navigator.clipboard.writeText(newSupplierId);
                          setCopiedId(true);
                          setTimeout(() => setCopiedId(false), 2500);
                        }
                      }}
                      className={`px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 shrink-0 ${
                        copiedId
                          ? "bg-emerald-500 text-white shadow-lg scale-102"
                          : "bg-white/15 hover:bg-white/25 text-white border border-white/25"
                      }`}
                    >
                      {copiedId ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>ID Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 text-[#f2b72b]" />
                          <span>Copy Supplier ID</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Organization Information Grid + QR Code */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-2 border-t border-white/15 text-xs relative z-10">
                    {/* Left: Organization Attributes */}
                    <div className="md:col-span-8 grid grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <span className="text-slate-400 block text-[10px] font-mono uppercase tracking-wider font-bold">
                          Organization Legal Registered Name
                        </span>
                        <span className="font-bold text-sm sm:text-base text-white block mt-0.5">
                          {regForm.companyName}
                        </span>
                      </div>

                      <div>
                        <span className="text-slate-400 block text-[10px] font-mono uppercase tracking-wider font-bold">
                          Verified GSTIN
                        </span>
                        <span className="font-mono text-amber-300 font-bold tracking-wider block mt-0.5">
                          {regForm.gstin}
                        </span>
                      </div>

                      <div>
                        <span className="text-slate-400 block text-[10px] font-mono uppercase tracking-wider font-bold">
                          PAN Number
                        </span>
                        <span className="font-mono text-slate-200 font-bold tracking-wider block mt-0.5">
                          {regForm.panNumber || "VERIFIED"}
                        </span>
                      </div>

                      <div>
                        <span className="text-slate-400 block text-[10px] font-mono uppercase tracking-wider font-bold">
                          Constitution & MSME No
                        </span>
                        <span className="text-slate-200 font-medium truncate block mt-0.5">
                          {regForm.constitution} {regForm.msmeNumber ? `(${regForm.msmeNumber})` : ""}
                        </span>
                      </div>

                      <div>
                        <span className="text-slate-400 block text-[10px] font-mono uppercase tracking-wider font-bold">
                          Industry Vertical
                        </span>
                        <span className="text-slate-200 font-medium truncate block mt-0.5">
                          {regForm.businessCategory === "Other" && regForm.customCategory.trim() 
                            ? regForm.customCategory.trim() 
                            : regForm.businessCategory}
                        </span>
                      </div>

                      <div>
                        <span className="text-slate-400 block text-[10px] font-mono uppercase tracking-wider font-bold">
                          Authorized Signatory
                        </span>
                        <span className="text-slate-200 font-medium truncate block mt-0.5">
                          {regForm.applicantName} ({regForm.applicantRole})
                        </span>
                      </div>

                      <div>
                        <span className="text-slate-400 block text-[10px] font-mono uppercase tracking-wider font-bold">
                          Official Communication Email
                        </span>
                        <span className="text-amber-300 font-mono text-[11px] truncate block mt-0.5">
                          {regForm.companyEmail || regForm.applicantEmail}
                        </span>
                      </div>

                      <div>
                        <span className="text-slate-400 block text-[10px] font-mono uppercase tracking-wider font-bold">
                          State / Jurisdiction
                        </span>
                        <span className="text-slate-200 font-medium block mt-0.5">
                          {regForm.state}, India
                        </span>
                      </div>

                      <div>
                        <span className="text-slate-400 block text-[10px] font-mono uppercase tracking-wider font-bold">
                          Empanelment Validity
                        </span>
                        <span className="text-emerald-300 font-mono font-bold block mt-0.5">
                          Lifetime / Sovereign Active
                        </span>
                      </div>
                    </div>

                    {/* Right: Working Scannable QR Code */}
                    <div className="md:col-span-4 flex flex-col items-center justify-center p-4 rounded-2xl bg-white/5 border border-white/10 text-center space-y-2">
                      <div className="p-2 bg-white rounded-xl shadow-md flex items-center justify-center">
                        <img
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
                            `https://rashtrabharosagroup.com/tenders?tab=track&q=${newSupplierId}`
                          )}&color=041633&bgcolor=ffffff&qzone=2`}
                          alt={`QR Code for ${newSupplierId}`}
                          className="w-24 h-24 object-contain rounded-md"
                          loading="lazy"
                        />
                      </div>
                      <span className="text-[9px] font-mono text-slate-300 uppercase tracking-wider block leading-tight">
                        Scan with camera to verify authenticity
                      </span>
                    </div>
                  </div>

                  {/* Micro-Security Footer Banner */}
                  <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[9px] font-mono text-slate-400 relative z-10 gap-1">
                    <span>CENTRAL PROCUREMENT REPOSITORY • RASHTRA BHAROSA GROUP</span>
                    <span className="text-amber-300 font-semibold">SECURE AUTHENTICATED CREDENTIAL</span>
                  </div>
                </div>

                {/* Certificate Action Strip */}
                <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Printer className="w-4 h-4 text-[#062B63]" />
                    Print / Save Smart ID Card
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (newSupplierId) {
                        setSelectedSupplierId(newSupplierId);
                        setTenderBidForm((prev) => ({
                          ...prev,
                          applicantName: regForm.applicantName || prev.applicantName,
                          applicantRole: regForm.applicantRole || prev.applicantRole,
                          applicantEmail: regForm.applicantEmail || prev.applicantEmail,
                          applicantPhone: regForm.applicantPhone || prev.applicantPhone,
                          applicantDesignation: regForm.applicantDesignation || prev.applicantDesignation,
                          companyName: regForm.companyName || prev.companyName,
                          gstin: regForm.gstin || prev.gstin,
                          panNumber: regForm.panNumber || prev.panNumber,
                          msmeNumber: regForm.msmeNumber || prev.msmeNumber,
                          registeredSupplierId: newSupplierId,
                          hqAddress: `${regForm.address}, ${regForm.city}, ${regForm.state} - ${regForm.pincode}`,
                          companyEmail: regForm.companyEmail || prev.companyEmail,
                          companyAltEmail: regForm.companyAltEmail || prev.companyAltEmail,
                          companyPhone: regForm.companyPhone || prev.companyPhone,
                          companyAltPhone: regForm.companyAltPhone || prev.companyAltPhone,
                          website: regForm.website || prev.website,
                        }));
                      }
                      handleTabChange("apply");
                    }}
                    className="w-full sm:flex-1 py-3.5 rounded-xl bg-[#062B63] hover:bg-[#041c40] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                  >
                    Proceed Directly to Apply for Tender
                    <ArrowRight className="w-4 h-4 text-[#f2b72b]" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setNewSupplierId(null);
                      setCopiedId(false);
                    }}
                    className="w-full sm:w-auto px-5 py-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 hover:text-slate-900 text-xs font-semibold transition-all cursor-pointer"
                  >
                    Register Another Organization
                  </button>
                </div>
              </div>
            ) : (
              /* Dedicated Organization Registration Form */
              <div className="space-y-8">
                {/* Header Banner */}
                <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#062B63]/10 text-[#062B63] text-[11px] font-bold uppercase tracking-wider border border-[#062B63]/15">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#062B63]" />
                    Sovereign Supplier Empanelment Portal
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight">
                    Organization Registration & Empanelment
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
                    Register your enterprise in the Rashtra Bharosa Group central procurement repository to generate your permanent <strong>Sovereign Supplier ID</strong>. Registered vendors are authorized to submit technical bids, commercial proposals, and participate in turnkey EPC contracts across all subsidiaries.
                  </p>
                </div>

                {/* Comprehensive 5-Section Registration Form */}
                <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-10 shadow-sm">
                  <form onSubmit={handleSupplierRegister} className="space-y-10 text-xs">
                    
                    {/* SECTION 1: SIGNATORY / APPLICANT DETAILS */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
                        <UserCheck className="w-4 h-4 text-[#062B63]" />
                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                          1. Signatory / Authorized Representative Details
                        </h3>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div>
                          <label className="block font-bold text-slate-800 mb-1.5 uppercase text-[11px]">
                            Full Name of Signatory / Executive *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Vikramaditya Sharma"
                            value={regForm.applicantName}
                            onChange={(e) => setRegForm({ ...regForm, applicantName: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-[#062B63]/20 focus:border-[#062B63]"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-800 mb-1.5 uppercase text-[11px]">
                            Role / Capacity in Enterprise *
                          </label>
                          <select
                            value={regForm.applicantRole}
                            onChange={(e) => setRegForm({ ...regForm, applicantRole: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#062B63]/20 focus:border-[#062B63]"
                          >
                            <option value="Founder">Founder</option>
                            <option value="Co-Founder">Co-Founder</option>
                            <option value="Managing Director">Managing Director</option>
                            <option value="Partner / Managing Partner">Partner / Managing Partner</option>
                            <option value="Director / Board Member">Director / Board Member</option>
                            <option value="Authorized Person / Representative">Authorized Person / Representative</option>
                            <option value="CEO / President / Vice President">CEO / President / Vice President</option>
                          </select>
                        </div>

                        <div>
                          <label className="block font-bold text-slate-800 mb-1.5 uppercase text-[11px]">
                            Designation / Official Title *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Managing Director & CEO"
                            value={regForm.applicantDesignation}
                            onChange={(e) => setRegForm({ ...regForm, applicantDesignation: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-[#062B63]/20 focus:border-[#062B63]"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-800 mb-1.5 uppercase text-[11px]">
                            Signatory Official Email ID *
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="signatory@company.com"
                            value={regForm.applicantEmail}
                            onChange={(e) => setRegForm({ ...regForm, applicantEmail: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-[#062B63]/20 focus:border-[#062B63]"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-800 mb-1.5 uppercase text-[11px]">
                            Signatory Direct Phone Number *
                          </label>
                          <input
                            type="tel"
                            required
                            placeholder="+91 98000 00000"
                            value={regForm.applicantPhone}
                            onChange={(e) => setRegForm({ ...regForm, applicantPhone: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 font-mono text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-[#062B63]/20 focus:border-[#062B63]"
                          />
                        </div>
                      </div>
                    </div>

                    {/* SECTION 2: COMPANY CONSTITUTION & BUSINESS CATEGORY */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
                        <Building2 className="w-4 h-4 text-[#062B63]" />
                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                          2. Company Constitution & Business Category
                        </h3>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="sm:col-span-2 lg:col-span-3">
                          <label className="block font-bold text-slate-800 mb-1.5 uppercase text-[11px]">
                            Registered Legal Company / Organization Name *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Apex Industrial Solutions Private Limited"
                            value={regForm.companyName}
                            onChange={(e) => setRegForm({ ...regForm, companyName: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-[#062B63]/20 focus:border-[#062B63]"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-800 mb-1.5 uppercase text-[11px]">
                            Entity Constitution *
                          </label>
                          <select
                            value={regForm.constitution}
                            onChange={(e) => setRegForm({ ...regForm, constitution: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#062B63]/20 focus:border-[#062B63]"
                          >
                            <option value="Private Limited Company">Private Limited Company</option>
                            <option value="Public Limited Company">Public Limited Company</option>
                            <option value="Limited Liability Partnership (LLP)">Limited Liability Partnership (LLP)</option>
                            <option value="Registered Partnership Firm">Registered Partnership Firm</option>
                            <option value="Sole Proprietorship">Sole Proprietorship</option>
                            <option value="Public Sector Undertaking (PSU)">Public Sector Undertaking (PSU)</option>
                            <option value="Joint Venture / SPV / Foreign Entity">Joint Venture / SPV / Foreign Entity</option>
                          </select>
                        </div>

                        <div>
                          <label className="block font-bold text-slate-800 mb-1.5 uppercase text-[11px]">
                            Corporate CIN / Registration No
                          </label>
                          <input
                            type="text"
                            placeholder="U12345OD2024PTC123456"
                            value={regForm.cinNumber}
                            onChange={(e) => setRegForm({ ...regForm, cinNumber: e.target.value.toUpperCase() })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 font-mono uppercase text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-[#062B63]/20 focus:border-[#062B63]"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-800 mb-1.5 uppercase text-[11px]">
                            MSME / Udyam Certificate No * (Mandatory)
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="UDYAM-OD-00-0000000"
                            value={regForm.msmeNumber}
                            onChange={(e) => setRegForm({ ...regForm, msmeNumber: e.target.value.toUpperCase() })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 font-mono uppercase text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-[#062B63]/20 focus:border-[#062B63]"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-800 mb-1.5 uppercase text-[11px]">
                            15-Digit GSTIN *
                          </label>
                          <input
                            type="text"
                            required
                            maxLength={15}
                            placeholder="21AAAAA0000A1Z5"
                            value={regForm.gstin}
                            onChange={(e) => setRegForm({ ...regForm, gstin: e.target.value.toUpperCase() })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 font-mono uppercase text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-[#062B63]/20 focus:border-[#062B63]"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-800 mb-1.5 uppercase text-[11px]">
                            10-Digit PAN Number *
                          </label>
                          <input
                            type="text"
                            required
                            maxLength={10}
                            placeholder="AAAAA0000A"
                            value={regForm.panNumber}
                            onChange={(e) => setRegForm({ ...regForm, panNumber: e.target.value.toUpperCase() })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 font-mono uppercase text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-[#062B63]/20 focus:border-[#062B63]"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-800 mb-1.5 uppercase text-[11px]">
                            Primary Business Supply Category *
                          </label>
                          <select
                            value={regForm.businessCategory}
                            onChange={(e) => setRegForm({ ...regForm, businessCategory: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#062B63]/20 focus:border-[#062B63]"
                          >
                            <option value="Heavy Civil EPC & Infrastructure">Heavy Civil EPC & Infrastructure</option>
                            <option value="Mining, Heavy Machinery & Exploration">Mining, Heavy Machinery & Exploration</option>
                            <option value="Technology, AI & Cyber Infrastructure">Technology, AI & Cyber Infrastructure</option>
                            <option value="Healthcare & Advanced Medical Technologies">Healthcare & Advanced Medical Technologies</option>
                            <option value="Agritech, Soil Polymers & Hydrogels">Agritech, Soil Polymers & Hydrogels</option>
                            <option value="Logistics, Freight & Heavy Fleet Operations">Logistics, Freight & Heavy Fleet Operations</option>
                            <option value="Clean Energy, Solar & Grid Systems">Clean Energy, Solar & Grid Systems</option>
                            <option value="Real Estate & Urban Development">Real Estate & Urban Development</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>

                        {/* Dynamic Input if "Other" is chosen */}
                        {regForm.businessCategory === "Other" && (
                          <div className="sm:col-span-2 lg:col-span-3 animate-in fade-in">
                            <label className="block font-bold text-amber-800 mb-1.5 uppercase text-[11px]">
                              Type your industry type *
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="Type your specialized industry / supply domain..."
                              value={regForm.customCategory}
                              onChange={(e) => setRegForm({ ...regForm, customCategory: e.target.value })}
                              className="w-full px-4 py-3 rounded-xl border border-amber-300 bg-amber-50/40 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* SECTION 3: COMPANY REGISTERED ADDRESS */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
                        <MapPin className="w-4 h-4 text-[#062B63]" />
                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                          3. What is your company registered address?
                        </h3>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="sm:col-span-3">
                          <label className="block font-bold text-slate-800 mb-1.5 uppercase text-[11px]">
                            Registered Headquarters Street Address / Building / Area *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Plot / Tower / Floor, Industrial Complex or Business Park"
                            value={regForm.address}
                            onChange={(e) => setRegForm({ ...regForm, address: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-[#062B63]/20 focus:border-[#062B63]"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-800 mb-1.5 uppercase text-[11px]">
                            City / District *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Bhubaneswar"
                            value={regForm.city}
                            onChange={(e) => setRegForm({ ...regForm, city: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-[#062B63]/20 focus:border-[#062B63]"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-800 mb-1.5 uppercase text-[11px]">
                            State / UT *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Odisha"
                            value={regForm.state}
                            onChange={(e) => setRegForm({ ...regForm, state: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-[#062B63]/20 focus:border-[#062B63]"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-800 mb-1.5 uppercase text-[11px]">
                            Postal PIN Code *
                          </label>
                          <input
                            type="text"
                            required
                            maxLength={6}
                            placeholder="751001"
                            value={regForm.pincode}
                            onChange={(e) => setRegForm({ ...regForm, pincode: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 font-mono text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-[#062B63]/20 focus:border-[#062B63]"
                          />
                        </div>
                      </div>
                    </div>

                    {/* SECTION 4: OFFICIAL COMPANY COMMUNICATION INFORMATION */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
                        <Mail className="w-4 h-4 text-[#062B63]" />
                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                          4. Official Company Communication Information
                        </h3>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-bold text-slate-800 mb-1.5 uppercase text-[11px]">
                            Primary Official Email ID *
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="corporate@company.com"
                            value={regForm.companyEmail}
                            onChange={(e) => setRegForm({ ...regForm, companyEmail: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-[#062B63]/20 focus:border-[#062B63]"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-800 mb-1.5 uppercase text-[11px]">
                            Alternative Official Email ID *
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="tenders.desk@company.com"
                            value={regForm.companyAltEmail}
                            onChange={(e) => setRegForm({ ...regForm, companyAltEmail: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-[#062B63]/20 focus:border-[#062B63]"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-800 mb-1.5 uppercase text-[11px]">
                            Primary Company Phone Number *
                          </label>
                          <input
                            type="tel"
                            required
                            placeholder="+91 674 000 0000 / +91 98000 00000"
                            value={regForm.companyPhone}
                            onChange={(e) => setRegForm({ ...regForm, companyPhone: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 font-mono text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-[#062B63]/20 focus:border-[#062B63]"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-800 mb-1.5 uppercase text-[11px]">
                            Alternative Phone Number
                          </label>
                          <input
                            type="tel"
                            placeholder="+91 98111 22334"
                            value={regForm.companyAltPhone}
                            onChange={(e) => setRegForm({ ...regForm, companyAltPhone: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 font-mono text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-[#062B63]/20 focus:border-[#062B63]"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block font-bold text-slate-800 mb-1.5 uppercase text-[11px]">
                            Company Official Website (Optional)
                          </label>
                          <input
                            type="url"
                            placeholder="https://www.company.com"
                            value={regForm.website}
                            onChange={(e) => setRegForm({ ...regForm, website: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 font-mono text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-[#062B63]/20 focus:border-[#062B63]"
                          />
                        </div>
                      </div>
                    </div>

                    {/* SECTION 5: AUTHORIZED HAND MARKING & STATUTORY UNDERTAKINGS */}
                    <div className="pt-2 border-t border-slate-100 space-y-4">
                      <div className="flex items-center gap-2 pb-1">
                        <FileCheck2 className="w-4 h-4 text-[#062B63]" />
                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                          5. Authorized Hand Marking & Statutory Undertakings
                        </h3>
                      </div>

                      <div className="space-y-3 bg-slate-50/70 p-4 sm:p-5 rounded-2xl border border-slate-200/80">
                        <label className="flex items-start gap-3 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            required
                            checked={regForm.undertakingIntegrity}
                            onChange={(e) => setRegForm({ ...regForm, undertakingIntegrity: e.target.checked })}
                            className="mt-0.5 rounded border-slate-300 text-[#062B63] focus:ring-[#062B63]"
                          />
                          <span className="text-slate-700 text-xs leading-relaxed">
                            <strong>Corporate Integrity Pact:</strong> We agree to adhere unconditionally to the statutory procurement guidelines, ethical bidding standards, and commercial transparency standards mandated by Rashtra Bharosa Group.
                          </span>
                        </label>

                        <label className="flex items-start gap-3 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            required
                            checked={regForm.undertakingNonBlacklisted}
                            onChange={(e) => setRegForm({ ...regForm, undertakingNonBlacklisted: e.target.checked })}
                            className="mt-0.5 rounded border-slate-300 text-[#062B63] focus:ring-[#062B63]"
                          />
                          <span className="text-slate-700 text-xs leading-relaxed">
                            <strong>Non-Debarment Declaration:</strong> We affirm that our enterprise, directors, and partners have never been debarred or blacklisted by any Central/State Ministry, PSU, or institutional procurement authority in India or abroad.
                          </span>
                        </label>

                        <label className="flex items-start gap-3 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            required
                            checked={regForm.undertakingAccuracy}
                            onChange={(e) => setRegForm({ ...regForm, undertakingAccuracy: e.target.checked })}
                            className="mt-0.5 rounded border-slate-300 text-[#062B63] focus:ring-[#062B63]"
                          />
                          <span className="text-slate-700 text-xs leading-relaxed">
                            <strong>Statutory Accuracy & MSME Credentials:</strong> All GSTIN, PAN, MSME/Udyam certificates, and company incorporation data submitted herein are genuine, valid, and legally verifiable.
                          </span>
                        </label>

                        <label className="flex items-start gap-3 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            required
                            checked={regForm.undertakingAuthority}
                            onChange={(e) => setRegForm({ ...regForm, undertakingAuthority: e.target.checked })}
                            className="mt-0.5 rounded border-slate-300 text-[#062B63] focus:ring-[#062B63]"
                          />
                          <span className="text-slate-700 text-xs leading-relaxed">
                            <strong>Authorized Signatory Representation:</strong> The undersigned executive has full corporate power, board authorization, and legal authority to represent and legally bind the organization.
                          </span>
                        </label>
                      </div>

                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
                        <div className="text-[11px] text-slate-400 font-mono">
                          Zero Portal Access Fee • 100% Statutory Transparency
                        </div>
                        <button
                          type="submit"
                          disabled={isRegistering}
                          className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#062B63] hover:bg-[#041c40] text-white font-bold text-xs uppercase tracking-wider shadow-md disabled:opacity-50 transition-all cursor-pointer flex items-center justify-center gap-2"
                        >
                          {isRegistering ? (
                            <>
                              <RefreshCw className="w-4 h-4 animate-spin" />
                              Registering & Generating Supplier ID...
                            </>
                          ) : (
                            <>
                              <CheckCircle2 className="w-4 h-4" />
                              Submit a Tender Application
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    )}
  </div>
)}

        {/* ========================================================
            TAB 3: TRACK TENDERS & PROPOSALS (LUXURY LIQUID GLASS TRACKER)
            ======================================================== */}
        {activeTab === "track" && (
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Search Box with Ambient Liquid Glass Effect */}
            <div className="relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-2xl border border-white/90 p-7 sm:p-9 space-y-5 shadow-[0_20px_50px_rgba(6,43,99,0.08)]">
              <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-blue-500/10 via-amber-400/10 to-transparent rounded-full blur-3xl pointer-events-none" />
              <div className="space-y-2 relative z-10">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#062B63]/5 text-[#062B63] text-[10px] font-mono font-bold uppercase tracking-widest border border-[#062B63]/10">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D9961A]" />
                  Procurement Tracking System (PTS)
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Tender & Bid Proposal Status Tracking
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl font-medium">
                  Enter your assigned <strong>Application Reference Number</strong> (e.g. <code>RBG-APP-2026-008-8842</code>), <strong>Bid Submission ID</strong> (e.g. <code>RBG-BID-2026-9041</code>), or <strong>Supplier ID</strong> to inspect real-time technical qualification, board review milestones, and LOI issuance.
                </p>
              </div>

              <form onSubmit={handleTrackSearch} className="flex flex-col sm:flex-row gap-3 pt-1 relative z-10">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="Enter Application No (e.g. RBG-APP-2026-008-8842) or Bid ID..."
                    value={trackQuery}
                    onChange={(e) => setTrackQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white/90 border border-slate-200 text-slate-900 font-mono text-xs shadow-inner focus:outline-none focus:ring-4 focus:ring-[#062B63]/10 focus:border-[#062B63] transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#062B63] via-[#08367d] to-[#041c40] hover:from-[#041c40] hover:to-[#020e24] text-white font-bold text-xs uppercase tracking-widest cursor-pointer shrink-0 transition-all shadow-[0_10px_25px_-5px_rgba(6,43,99,0.4)] active:scale-[0.99] flex items-center justify-center gap-2"
                >
                  <Search className="w-3.5 h-3.5 text-[#f2b72b]" />
                  <span>Track Status</span>
                </button>
              </form>
            </div>

            {/* Tracked Result Dossier with Liquid Glass Card */}
            {trackedResult?.bid ? (
              <div className="relative overflow-hidden rounded-3xl bg-white/85 backdrop-blur-2xl border border-white/90 p-7 sm:p-9 shadow-[0_20px_50px_rgba(6,43,99,0.08)] space-y-7 animate-in fade-in">
                {/* Ambient glow accent */}
                <div className="absolute -top-10 -right-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

                {/* Result Header Banner */}
                <div className="border-b border-slate-100 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono font-bold text-xs bg-slate-100 text-slate-900 px-3 py-1 rounded-full border border-slate-200">
                        {trackedResult.bid.bidSubmissionId}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                        {trackedResult.bid.status}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-2 tracking-tight">
                      {trackedResult.bid.companyName}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Tender Reference: <strong className="text-slate-900 font-mono">{trackedResult.bid.tenderId}</strong> — {trackedResult.tender?.title || "Heavy Industrial EPC Procurement"}
                    </p>
                  </div>

                  <div className="text-right text-xs text-slate-500 self-start sm:self-auto space-y-1 bg-slate-50/80 p-3 rounded-xl border border-slate-200/80">
                    <div>Submission Date: <strong className="text-slate-900 font-mono">{trackedResult.bid.submissionDate}</strong></div>
                    <div className="text-[11px] font-mono text-slate-500">Application Ref: <strong className="text-slate-800">{trackedResult.bid.applicationNo}</strong></div>
                  </div>
                </div>

                {/* Commercial & Technical Proposal Matrix */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50/70 p-4 rounded-2xl border border-slate-200/80 text-xs relative z-10">
                  <div className="p-2.5 bg-white rounded-xl border border-slate-200/60 shadow-xs">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Quoted Amount</span>
                    <span className="font-mono font-bold text-sm text-slate-900 block mt-0.5">{trackedResult.bid.quoteAmount}</span>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-slate-200/60 shadow-xs">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Execution Timeline</span>
                    <span className="font-semibold text-slate-900 truncate block mt-0.5">{trackedResult.bid.timelineMonths}</span>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-slate-200/60 shadow-xs">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Authorized Signatory</span>
                    <span className="font-semibold text-slate-900 truncate block mt-0.5">{trackedResult.bid.contactPerson}</span>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-slate-200/60 shadow-xs">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Verified GSTIN</span>
                    <span className="font-mono text-blue-700 font-bold truncate block mt-0.5">{trackedResult.bid.gstin}</span>
                  </div>
                </div>

                {/* Nodal Procurement Officer Desk */}
                <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-50/80 via-indigo-50/50 to-white border border-blue-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs relative z-10">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-blue-800 uppercase tracking-widest flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-700" />
                      Assigned Group Procurement Directorate
                    </span>
                    <h5 className="font-bold text-slate-900 text-sm">{trackedResult.tender?.procurementOfficer || "Er. D. K. Pattnaik (Chief Procurement Officer)"}</h5>
                    <span className="text-slate-600 block text-[11px]">Corporate Procurement Directorate • Corporate Headquarters, Bhubaneswar</span>
                  </div>

                  <div className="flex flex-col sm:items-end text-slate-700 text-[11px] space-y-1">
                    <a
                      href={`mailto:${trackedResult.tender?.procurementEmail || "tenders@rashtrabharosagroup.com"}`}
                      className="px-3 py-1.5 rounded-xl bg-white border border-blue-200 hover:border-blue-400 text-blue-800 font-mono font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5 text-blue-700" />
                      {trackedResult.tender?.procurementEmail || "tenders@rashtrabharosagroup.com"}
                    </a>
                  </div>
                </div>

                {/* Live E-Procurement Stepper */}
                <div className="space-y-4 pt-2 relative z-10">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#062B63]" />
                      Live Procurement Evaluation Milestones:
                    </h4>
                    <span className="text-[10px] font-mono text-slate-400">Encrypted Immutable Audit Trail</span>
                  </div>

                  <div className="space-y-3">
                    {trackedResult.bid.timelineEvents?.map((stg) => (
                      <div
                        key={stg.stageNumber}
                        className={`p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${
                          stg.current
                            ? "bg-blue-50/90 border-blue-300 ring-2 ring-blue-400/30 shadow-sm"
                            : stg.completed
                            ? "bg-slate-50/80 border-slate-200"
                            : "bg-white/60 border-slate-100 opacity-60"
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 shadow-xs ${
                            stg.completed
                              ? "bg-emerald-600 text-white"
                              : stg.current
                              ? "bg-[#062B63] text-white ring-4 ring-[#062B63]/20 animate-pulse"
                              : "bg-slate-200 text-slate-600"
                          }`}
                        >
                          {stg.completed ? <Check className="w-4 h-4" /> : stg.stageNumber}
                        </div>

                        <div className="flex-1 space-y-1">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                            <h5 className="font-bold text-sm text-slate-900">
                              Stage {stg.stageNumber}: {stg.title}
                            </h5>
                            <span className="text-[11px] font-mono text-slate-500 font-semibold">{stg.date}</span>
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed font-medium">{stg.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : trackedResult?.application ? (
              <div className="relative overflow-hidden rounded-3xl bg-white/85 backdrop-blur-2xl border border-white/90 p-7 sm:p-9 shadow-[0_20px_50px_rgba(6,43,99,0.08)] space-y-6 animate-in fade-in">
                <div className="border-b border-slate-100 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono font-bold text-xs bg-slate-100 text-slate-800 px-3 py-1 rounded-full border border-slate-200">
                        {trackedResult.application.applicationNo}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                        {trackedResult.application.stage || "Application Registered"}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
                      {trackedResult.application.companyName}
                    </h3>
                    <p className="text-xs text-slate-500">
                      Tender Reference: <strong className="text-slate-900 font-mono">{trackedResult.application.tenderId}</strong> — {trackedResult.tender?.title || "Heavy Industrial EPC Procurement"}
                    </p>
                  </div>
                  <div className="text-right text-xs text-slate-500 space-y-1 bg-slate-50/80 p-3 rounded-xl border border-slate-200/80">
                    <div>Application Date: <strong className="text-slate-900 font-mono">{trackedResult.application.applicationDate}</strong></div>
                    <div className="text-[11px] font-mono text-slate-500">Supplier: <strong className="text-slate-800">{trackedResult.application.supplierId}</strong></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50/70 p-4 rounded-2xl border border-slate-200/80 text-xs">
                  <div className="p-2.5 bg-white rounded-xl border border-slate-200/60 shadow-xs">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">EMD Status</span>
                    <span className="font-semibold text-slate-900 mt-0.5 block">{trackedResult.application.emdStatus}</span>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-slate-200/60 shadow-xs">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Tender Fee</span>
                    <span className="font-semibold text-slate-900 mt-0.5 block">{trackedResult.application.tenderFeeStatus}</span>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-slate-200/60 shadow-xs">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Signatory</span>
                    <span className="font-semibold text-slate-900 truncate mt-0.5 block">{trackedResult.application.contactPerson}</span>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-slate-200/60 shadow-xs">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">GSTIN</span>
                    <span className="font-mono text-blue-700 font-bold truncate mt-0.5 block">{trackedResult.application.gstin}</span>
                  </div>
                </div>
              </div>
            ) : trackedResult?.supplier ? (
              <div className="relative overflow-hidden rounded-3xl bg-white/85 backdrop-blur-2xl border border-white/90 p-7 sm:p-9 shadow-[0_20px_50px_rgba(6,43,99,0.08)] space-y-6 animate-in fade-in">
                <div className="border-b border-slate-100 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono font-bold text-xs bg-slate-100 text-slate-800 px-3 py-1 rounded-full border border-slate-200">
                        {trackedResult.supplier.supplierId}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Verified Sovereign Supplier
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
                      {trackedResult.supplier.companyName}
                    </h3>
                    <p className="text-xs text-slate-500">
                      Category: <strong className="text-slate-900">{trackedResult.supplier.businessCategory}</strong>
                    </p>
                  </div>
                  <div className="text-right text-xs text-slate-500 space-y-1 bg-slate-50/80 p-3 rounded-xl border border-slate-200/80">
                    <div>Empanelled Date: <strong className="text-slate-900 font-mono">{trackedResult.supplier.registrationDate}</strong></div>
                    <div className="text-[11px] font-mono text-slate-500">State: <strong className="text-slate-800">{trackedResult.supplier.state}</strong></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50/70 p-4 rounded-2xl border border-slate-200/80 text-xs">
                  <div className="p-2.5 bg-white rounded-xl border border-slate-200/60 shadow-xs">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">GSTIN</span>
                    <span className="font-mono font-bold text-slate-900 mt-0.5 block">{trackedResult.supplier.gstin}</span>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-slate-200/60 shadow-xs">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">PAN</span>
                    <span className="font-mono font-bold text-slate-900 mt-0.5 block">{trackedResult.supplier.panNumber}</span>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-slate-200/60 shadow-xs">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Contact</span>
                    <span className="font-semibold text-slate-900 truncate mt-0.5 block">{trackedResult.supplier.contactPerson}</span>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-slate-200/60 shadow-xs">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Email</span>
                    <span className="text-slate-900 font-mono truncate block mt-0.5">{trackedResult.supplier.email}</span>
                  </div>
                </div>
              </div>
            ) : trackSearched ? (
              <div className="rounded-3xl bg-white/80 backdrop-blur-2xl border border-slate-200 p-10 text-center space-y-3 shadow-sm animate-in fade-in">
                <AlertCircle className="w-10 h-10 text-amber-600 mx-auto" />
                <h4 className="text-base font-bold text-slate-900">No Proposal Found for "{trackQuery}"</h4>
                <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                  Please verify your Application Reference Number, Bid ID, or Supplier ID. For immediate technical support, contact <code className="text-slate-900 font-bold font-mono">tenders@rashtrabharosagroup.com</code>.
                </p>
              </div>
            ) : null}

            {/* Procurement Zero-Fee Advisory Guarantee */}
            <div className="p-6 rounded-2xl bg-amber-50/90 backdrop-blur-md border border-amber-200/80 flex flex-col sm:flex-row items-start gap-4">
              <ShieldAlert className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900">
                  Institutional Procurement Integrity & Zero Portal Fee Guarantee
                </h4>
                <p className="text-xs text-amber-950/80 leading-relaxed">
                  Rashtra Bharosa Group enforces 100% statutory transparency in all vendor selections. The Group <strong>never charges any portal submission fee, processing fee, or intermediary commission</strong>. All official tender award communications originate exclusively from <code>@rashtrabharosagroup.com</code>.
                </p>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ========================================================
          CLEAR VIEW: COMPREHENSIVE TENDER NOTICE READER MODAL
          ======================================================== */}
      {selectedTenderForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-6">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-4 gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded font-mono font-bold text-xs bg-slate-100 text-slate-800 border border-slate-200">
                    {selectedTenderForModal.id}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                    {selectedTenderForModal.tenderType}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {selectedTenderForModal.department}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-2">
                  {selectedTenderForModal.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedTenderForModal(null)}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer text-xs font-mono font-bold"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Parameters Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200/80">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Estimated Value</span>
                <span className="font-bold text-slate-900 text-sm">{selectedTenderForModal.estimatedValue}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">EMD Bid Security</span>
                <span className="font-bold text-slate-900">{selectedTenderForModal.emdAmount}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Closing Date & Time</span>
                <span className="font-bold text-rose-700">{selectedTenderForModal.closingDate} ({selectedTenderForModal.closingTime || "17:00 IST"})</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Location</span>
                <span className="font-medium text-slate-900">{selectedTenderForModal.location}</span>
              </div>
            </div>

            {/* Scope of Work */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                1. Scope of Work & Deliverables
              </h4>
              {hasHtmlTags(selectedTenderForModal.scopeSummary || "") ? (
                <div
                  className="prose prose-sm max-w-none text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100"
                  dangerouslySetInnerHTML={{ __html: selectedTenderForModal.scopeSummary }}
                />
              ) : (
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  {selectedTenderForModal.scopeSummary}
                </p>
              )}

              <div className="space-y-2 pt-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Mandatory Deliverables / Milestones:
                </span>
                <div className="grid grid-cols-1 gap-2">
                  {(selectedTenderForModal.deliverables || []).map((item: any, idx: number) => {
                    const titleText = typeof item === "string" ? item : (item?.milestone || item?.title || item?.name || JSON.stringify(item));
                    const timelineText = typeof item === "object" && item?.timeline ? item.timeline : null;

                    return (
                      <div key={idx} className="flex items-center justify-between gap-2.5 p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs">
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="text-slate-700 font-medium">{titleText}</span>
                        </div>
                        {timelineText && (
                          <span className="px-2 py-0.5 text-[10px] font-semibold bg-blue-50 text-blue-700 rounded border border-blue-200 shrink-0">
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
            {selectedTenderForModal.boqItems && selectedTenderForModal.boqItems.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  2. Itemized Bill of Quantities (BOQ Schedule)
                </h4>
                <div className="overflow-x-auto border border-slate-200 rounded-xl">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[10px]">
                        <th className="py-2 px-3">Item #</th>
                        <th className="py-2 px-3">Description</th>
                        <th className="py-2 px-3">Unit</th>
                        <th className="py-2 px-3">Qty</th>
                        <th className="py-2 px-3">Est. Rate</th>
                        <th className="py-2 px-3 text-right">Total Est.</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {selectedTenderForModal.boqItems.map((item: any, idx: number) => (
                        <tr key={idx} className="hover:bg-slate-50/75">
                          <td className="py-2 px-3 font-mono font-bold text-slate-900">{item.itemNo || item.slNo || `ITEM-${idx + 1}`}</td>
                          <td className="py-2 px-3 text-slate-900 font-medium">{item.description}</td>
                          <td className="py-2 px-3 text-slate-500">{item.unit || "Unit"}</td>
                          <td className="py-2 px-3 font-mono text-slate-700">{(item.qty ?? 0).toLocaleString()}</td>
                          <td className="py-2 px-3 text-slate-500">{item.estRate || "As per NIT"}</td>
                          <td className="py-2 px-3 font-bold text-slate-900 text-right">{item.totalEst || "Included"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Prequalification Criteria */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                3. Prequalification & Eligibility Criteria
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
                  <span className="font-bold text-slate-900 block text-[11px] uppercase tracking-wider">Technical Capacity</span>
                  <p className="text-slate-600 text-xs">Registered Super EPC contractor with verified machinery mobilization capability.</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
                  <span className="font-bold text-slate-900 block text-[11px] uppercase tracking-wider">Financial Solvency</span>
                  <p className="text-slate-600 text-xs">Audited balance sheets for past 3 years with bank solvency certificate.</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
                  <span className="font-bold text-slate-900 block text-[11px] uppercase tracking-wider">Statutory & Integrity</span>
                  <p className="text-slate-600 text-xs">GSTIN, PAN, and signed Group Integrity Pact without blacklisting history.</p>
                </div>
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <Link
                to={`/tenders/${selectedTenderForModal.slug}`}
                className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors flex items-center gap-1.5"
              >
                Open Standalone Dossier Page <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </Link>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedTenderForModal(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50 cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const t = selectedTenderForModal;
                    setSelectedTenderForModal(null);
                    handleQuickApplyTender(t);
                  }}
                  className="px-5 py-2 rounded-xl bg-[#062B63] hover:bg-[#041c40] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5 text-[#f2b72b]" />
                  Apply for This Tender Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tenders;
