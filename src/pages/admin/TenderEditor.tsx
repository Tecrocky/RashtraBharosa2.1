import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Eye,
  Save,
  Send,
  Upload,
  FileText,
  Check,
  X,
  Plus,
  Trash2,
  Calendar,
  Building2,
  ShieldCheck,
  DollarSign,
  Clock,
  Download,
} from "lucide-react";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { TenderNotice, TenderNotification, initialTenders, initialNotifications, standardDocumentRequirements } from "@/data/tendersData";
import { generateReferenceId } from "@/lib/trackingService";
import { supabase } from "@/lib/supabase";
import { saveTender, getTenderBySlug } from "@/services/cmsService";

export interface TenderUploadedDoc {
  id: string;
  name: string;
  type: string;
  size: string;
  url: string;
}

interface TenderEditorProps {
  tenderId?: string;
  onSaveSuccess?: () => void;
  onCancel?: () => void;
}

const subsidiaries = [
  "Rashtra Bharosa Group Limited",
  "RashBhar Mining",
  "Innovex Construction",
  "RashBhar Health Care",
  "RashBhar Technology",
  "RashBhar Soil & Soul",
  "RashBhar Real Estate",
  "Royal Birds Group",
];

const tenderCategories = [
  "Mining & Minerals",
  "Heavy Civil & Construction",
  "Public Infrastructure & EPC",
  "Healthcare & Medical Tech",
  "Technology & AI Systems",
  "Agriculture & Soil Science",
  "Real Estate & MEP Services",
  "General Procurement & Logistics",
];

export const TenderEditor: React.FC<TenderEditorProps> = ({
  tenderId,
  onSaveSuccess,
  onCancel,
}) => {
  const navigate = useNavigate();
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  // Section 1: Tender Identity
  const [id, setId] = useState(() => generateReferenceId("tender_notice"));
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [issuingCompany, setIssuingCompany] = useState("Innovex Construction");
  const [category, setCategory] = useState("Heavy Civil & Construction");
  const [location, setLocation] = useState("Bhubaneswar, Odisha, India");

  // Section 2: Structured Descriptions
  const [overview, setOverview] = useState("");
  const [scopeOfWork, setScopeOfWork] = useState("");
  const [techRequirements, setTechRequirements] = useState("");
  const [eligibilityCriteria, setEligibilityCriteria] = useState("");
  const [requiredDocsText, setRequiredDocsText] = useState("");
  const [termsAndConditions, setTermsAndConditions] = useState("");

  // Section 3: Important Dates
  const [issueDate, setIssueDate] = useState(new Date().toISOString().split("T")[0]);
  const [submissionStartDate, setSubmissionStartDate] = useState(new Date().toISOString().split("T")[0]);
  const [closingDate, setClosingDate] = useState("2026-10-30");
  const [closingTime, setClosingTime] = useState("17:00 IST");
  const [openingDate, setOpeningDate] = useState("2026-11-02");

  // Section 4: Commercial Details
  const [estimatedValue, setEstimatedValue] = useState("₹ 45.00 Crore");
  const [tenderFee, setTenderFee] = useState("100% Free Open Access (₹0)");
  const [emdAmount, setEmdAmount] = useState("₹ 25.00 Lakhs");
  const [emdExemptionAllowed, setEmdExemptionAllowed] = useState(true);
  const [contractPeriod, setContractPeriod] = useState("18 Months");

  // Section 5: Documents
  const [documents, setDocuments] = useState<TenderUploadedDoc[]>([
    {
      id: "TD-1",
      name: "Tender_Notice_Document_2026.pdf",
      type: "PDF Document",
      size: "2.4 MB",
      url: "#",
    },
    {
      id: "TD-2",
      name: "Detailed_BOQ_Bill_Of_Quantities.xlsx",
      type: "Excel Spreadsheet",
      size: "1.1 MB",
      url: "#",
    },
  ]);
  const [newDocName, setNewDocName] = useState("");
  const [newDocType, setNewDocType] = useState("PDF Document");
  const [newDocSize, setNewDocSize] = useState("1.5 MB");

  const [status, setStatus] = useState<"Active" | "Closed" | "Draft">("Active");
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  useEffect(() => {
    if (tenderId) {
      const loadTender = async () => {
        const found = await getTenderBySlug(tenderId);
        if (found) {
          setId(found.id);
          setTitle(found.title);
          setSlug(found.slug);
          setIssuingCompany(found.department || (found as any).issuingCompany || "Innovex Construction");
          setCategory(found.category || "Heavy Civil & Construction");
          setLocation(found.location || "Bhubaneswar, Odisha");
          setOverview(found.scopeSummary || "");
          setIssueDate(found.issueDate || "");
          setClosingDate(found.closingDate || "");
          setClosingTime(found.closingTime || "17:00 IST");
          setEstimatedValue(found.estimatedValue || "");
          setEmdAmount(found.emdAmount || "");
          setContractPeriod(found.contractPeriod || "");
          setStatus(found.status === "Closed" ? "Closed" : "Active");
        }
      };
      loadTender();
    }
  }, [tenderId]);

  const generateSlug = (text: string) => {
    return text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
  };

  const handleAddDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocName.trim()) return;
    const doc: TenderUploadedDoc = {
      id: `TD-${Date.now()}`,
      name: newDocName.trim(),
      type: newDocType,
      size: newDocSize,
      url: "#",
    };
    setDocuments([...documents, doc]);
    setNewDocName("");
  };

  const handleRemoveDocument = (docId: string) => {
    setDocuments(documents.filter((d) => d.id !== docId));
  };

  const handleSave = async (targetStatus: "Draft" | "Active") => {
    if (!title.trim()) {
      alert("Please enter a Tender Title.");
      return;
    }

    const finalSlug = slug.trim() || generateSlug(title);

    const record: TenderNotice = {
      id: id.trim(),
      slug: finalSlug,
      title: title.trim(),
      department: issuingCompany,
      verticalCode: issuingCompany.toLowerCase().includes("mining") ? "MINING" : "INFRA-EPC",
      tenderType: "Open National Competitive Tender",
      category,
      categoryFilter: category.toLowerCase().includes("civil") ? "construction" : "mining",
      estimatedValue,
      emdAmount,
      emdExemptionAllowed,
      tenderFee,
      issueDate,
      closingDate,
      closingTime,
      status: targetStatus === "Draft" ? "Closed" : "Active",
      location,
      state: "Odisha",
      documentSize: "4.5 MB",
      procurementOfficer: "Er. D. K. Pattnaik (Chief Procurement Officer)",
      procurementEmail: "tenders@rashtrabharosagroup.com",
      contractPeriod,
      bidValidityPeriod: "120 Days",
      scopeSummary: overview || title,
      eligibilityCriteria: {
        technical: [
          "Registered Class-1 Super EPC Contractor with minimum 5 years state experience",
          "Demonstrated technical capacity and equipment mobilization deployment capability",
        ],
        financial: [
          "Demonstrated financial net-worth exceeding 200% of average annual contract turnover",
          "Bank solvency certificate from Scheduled Commercial Bank",
        ],
        statutory: [
          "Zero-Fee statutory certificate of non-blacklisting",
          "Valid GSTIN and PAN registration certificates",
        ],
      },
      specifications: [
        { label: "Structural Concreting", value: "M50 / Self-Compacting High Durability" },
        { label: "Quality Compliance", value: "ISO 9001:2015 & BIS Certification Mandate" },
      ],
      deliverables: [
        { milestone: "Mobilization & Survey", timeline: "Within 30 Days of LOI" },
        { milestone: "Structural Foundation", timeline: "Month 4–6" },
        { milestone: "Final Commissioning", timeline: "Month 18" },
      ],
      requiredDocuments: standardDocumentRequirements.slice(0, 6),
      boqItems: [
        { itemNo: "BOQ-01", description: "Structural Heavy Pier Casting & Fabrication", unit: "CUM", qty: 24000, estRate: "₹ 14,500/CUM", totalEst: "₹ 34.80 Cr" },
        { itemNo: "BOQ-02", description: "Pre-stressed Girder Launching & Grouting", unit: "MT", qty: 8500, estRate: "₹ 28,000/MT", totalEst: "₹ 23.80 Cr" },
      ],
    };

    const res = await saveTender(record);

    if (res.success) {
      // Also automatically publish to Tender Notifications sector
      if (targetStatus === "Active") {
        try {
          const existingNotifs: TenderNotification[] = JSON.parse(
            localStorage.getItem("rbg_tender_notifications") || "null"
          ) || initialNotifications;
          const newNotif: TenderNotification = {
            id: `NOTIF-${Date.now()}`,
            date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
            title: `New Tender Notice Published: ${title.trim()}`,
            tenderRef: id.trim(),
            category: "Addendum",
            summary: overview || `Official RFP / Tender invitation issued by ${issuingCompany} for ${category}. Estimated Value: ${estimatedValue}. Submission closing on ${closingDate}.`,
            isImportant: true,
          };
          const updatedNotifs = [newNotif, ...existingNotifs.filter((n) => n.tenderRef !== id.trim() || n.title !== newNotif.title)];
          localStorage.setItem("rbg_tender_notifications", JSON.stringify(updatedNotifs));
          
          // Dispatch window storage event so active tabs refresh in real-time
          window.dispatchEvent(new Event("storage"));
        } catch (e) {
          console.warn("Notification sync note:", e);
        }
      }

      setSuccessNotice(targetStatus === "Active" ? "Tender successfully published to Supabase & portal!" : "Tender saved as draft in Supabase.");
      setTimeout(() => {
        setSuccessNotice(null);
        if (onSaveSuccess) onSaveSuccess();
      }, 1200);
    } else {
      alert(`Error saving tender to Supabase: ${res.error}`);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 pb-5">
        <div className="flex items-center gap-3">
          <button
            onClick={onCancel || (() => navigate("/admin/dashboard"))}
            className="p-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="text-xl font-bold text-neutral-900 tracking-tight">
              {tenderId ? "Edit Tender Notice" : "Create New Public Tender"}
            </h2>
            <p className="text-xs text-neutral-500 font-mono">
              Zero-Fee Sovereign Public Procurement & Tender System
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setShowPreviewModal(true)}
            className="px-4 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-900 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Preview</span>
          </button>
          <button
            type="button"
            onClick={() => handleSave("Draft")}
            className="px-4 py-2 rounded-xl bg-white border border-neutral-300 hover:bg-neutral-50 text-neutral-900 text-xs font-semibold uppercase tracking-wider"
          >
            Save Draft
          </button>
          <button
            type="button"
            onClick={() => handleSave("Active")}
            className="px-5 py-2 rounded-xl bg-black hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Publish Tender</span>
          </button>
        </div>
      </div>

      {successNotice && (
        <div className="p-4 rounded-2xl bg-neutral-900 text-white text-xs font-medium flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{successNotice}</span>
        </div>
      )}

      {/* Main Form Sections */}
      <div className="space-y-8">
        {/* SECTION 1: Tender Identity */}
        <div className="p-6 rounded-3xl bg-white border border-neutral-200 shadow-sm space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-100 pb-2">
            Section 1 — Tender Identity & Classification
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">Tender ID *</label>
              <input
                type="text"
                required
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder="TND-2026-0001"
                className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-mono font-bold text-neutral-900 focus:outline-none focus:border-black"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-neutral-700 mb-1">Tender Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (!slug) setSlug(generateSlug(e.target.value));
                }}
                placeholder="e.g. Supply and Transportation of High-Grade Iron Ore & Beneficiation Pellets"
                className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-semibold text-neutral-900 focus:outline-none focus:border-black"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">Issuing Company *</label>
              <select
                value={issuingCompany}
                onChange={(e) => setIssuingCompany(e.target.value)}
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none"
              >
                {subsidiaries.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">Tender Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none"
              >
                {tenderCategories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">Execution Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Bhubaneswar / Joda / Paradeep"
                className="w-full px-3.5 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none focus:border-black"
              />
            </div>
          </div>
        </div>

        {/* SECTION 2: Structured Descriptions */}
        <div className="p-6 rounded-3xl bg-white border border-neutral-200 shadow-sm space-y-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-100 pb-2">
            Section 2 — Scope, Technical Specifications & Eligibility
          </h3>

          <div>
            <label className="block text-xs font-semibold text-neutral-800 mb-1.5">
              1. Tender Overview & Objectives
            </label>
            <RichTextEditor
              value={overview}
              onChange={setOverview}
              placeholder="Provide a comprehensive high-level summary of the procurement objective..."
              minHeight="180px"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-800 mb-1.5">
              2. Detailed Scope of Work & Deliverables
            </label>
            <RichTextEditor
              value={scopeOfWork}
              onChange={setScopeOfWork}
              placeholder="List specific milestones, engineering obligations, and performance parameters..."
              minHeight="180px"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-800 mb-1.5">
              3. Technical Specifications & Material Benchmarks
            </label>
            <RichTextEditor
              value={techRequirements}
              onChange={setTechRequirements}
              placeholder="Specify technical grades, BIS standards, machinery tolerances, and testing protocols..."
              minHeight="180px"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-800 mb-1.5">
              4. Contractor Eligibility Criteria & Mandatory Statutory Standards
            </label>
            <RichTextEditor
              value={eligibilityCriteria}
              onChange={setEligibilityCriteria}
              placeholder="Specify financial net worth, prior execution track-record, MSME exemptions, etc."
              minHeight="180px"
            />
          </div>
        </div>

        {/* SECTION 3: Important Dates & Timelines */}
        <div className="p-6 rounded-3xl bg-white border border-neutral-200 shadow-sm space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-100 pb-2">
            Section 3 — Important Dates & Submission Timetable
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">Publication Date</label>
              <input
                type="date"
                value={issueDate}
                onChange={(e) => setIssueDate(e.target.value)}
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">Submission Start Date</label>
              <input
                type="date"
                value={submissionStartDate}
                onChange={(e) => setSubmissionStartDate(e.target.value)}
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">Submission Deadline</label>
              <input
                type="date"
                value={closingDate}
                onChange={(e) => setClosingDate(e.target.value)}
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">Technical Opening Date</label>
              <input
                type="date"
                value={openingDate}
                onChange={(e) => setOpeningDate(e.target.value)}
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* SECTION 4: Commercial Details */}
        <div className="p-6 rounded-3xl bg-white border border-neutral-200 shadow-sm space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-100 pb-2">
            Section 4 — Commercial Parameters (Zero-Fee Mandate)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">Estimated Tender Value</label>
              <input
                type="text"
                value={estimatedValue}
                onChange={(e) => setEstimatedValue(e.target.value)}
                placeholder="e.g. ₹ 45.00 Crore"
                className="w-full px-3.5 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-bold text-neutral-900 focus:outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">Tender Access Fee</label>
              <input
                type="text"
                disabled
                value={tenderFee}
                className="w-full px-3.5 py-2 bg-neutral-100 border border-neutral-200 rounded-xl text-xs font-mono font-bold text-neutral-700 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">EMD Deposit / BG</label>
              <input
                type="text"
                value={emdAmount}
                onChange={(e) => setEmdAmount(e.target.value)}
                placeholder="e.g. ₹ 25.00 Lakhs"
                className="w-full px-3.5 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none focus:border-black"
              />
            </div>
          </div>
        </div>

        {/* SECTION 5: Documents */}
        <div className="p-6 rounded-3xl bg-white border border-neutral-200 shadow-sm space-y-5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-100 pb-2">
            Section 5 — Tender Specification Documents & BOQ
          </h3>

          {/* Upload Form */}
          <form onSubmit={handleAddDocument} className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200 flex flex-col sm:flex-row items-center gap-3">
            <div className="flex-grow w-full">
              <input
                type="text"
                required
                value={newDocName}
                onChange={(e) => setNewDocName(e.target.value)}
                placeholder="Document filename (e.g. Technical_Specifications_Vol_1.pdf)..."
                className="w-full px-3.5 py-2 bg-white border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none focus:border-black"
              />
            </div>
            <select
              value={newDocType}
              onChange={(e) => setNewDocType(e.target.value)}
              className="px-3 py-2 bg-white border border-neutral-200 rounded-xl text-xs text-neutral-900"
            >
              <option value="PDF Document">PDF Document</option>
              <option value="Excel Spreadsheet">Excel BOQ</option>
              <option value="CAD Drawing">CAD Drawing</option>
            </select>
            <button
              type="submit"
              className="px-4 py-2 bg-black hover:bg-neutral-800 text-white rounded-xl text-xs font-bold whitespace-nowrap"
            >
              Attach File
            </button>
          </form>

          {/* Documents List */}
          <div className="divide-y divide-neutral-100 border border-neutral-200 rounded-2xl overflow-hidden">
            {documents.map((doc) => (
              <div key={doc.id} className="p-4 flex items-center justify-between bg-white hover:bg-neutral-50">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-neutral-100 text-neutral-700">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-neutral-900">{doc.name}</h5>
                    <span className="text-[10px] text-neutral-400 font-mono">{doc.type} • {doc.size}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveDocument(doc.id)}
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-red-600 hover:bg-neutral-100"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Action Submission Bar */}
      <div className="p-6 rounded-3xl bg-neutral-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl border border-neutral-800">
        <div>
          <div className="font-bold text-sm text-white">Ready to Dispatch Tender & Corrigenda?</div>
          <div className="text-xs text-neutral-400">
            Publishing will broadcast this notice instantly to the Public Portal & Notification Sector.
          </div>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <button
            type="button"
            onClick={() => setShowPreviewModal(true)}
            className="px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Preview</span>
          </button>
          <button
            type="button"
            onClick={() => handleSave("Draft")}
            className="px-4 py-2.5 rounded-xl bg-neutral-800 border border-neutral-700 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold uppercase tracking-wider transition-colors"
          >
            Save Draft
          </button>
          <button
            type="button"
            onClick={() => handleSave("Active")}
            className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg transition-all"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Publish Tender</span>
          </button>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-4xl bg-white rounded-3xl p-8 max-h-[85vh] overflow-y-auto space-y-6 relative">
            <button
              onClick={() => setShowPreviewModal(false)}
              className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b border-neutral-200 pb-4">
              <span className="px-2.5 py-1 rounded-full bg-neutral-100 text-xs font-mono font-bold uppercase text-neutral-700">
                {id} • {category}
              </span>
              <h1 className="text-2xl font-serif font-bold text-neutral-900 mt-2">{title || "Untitled Tender"}</h1>
              <p className="text-xs text-neutral-500 font-mono mt-1">
                Issued By: <strong>{issuingCompany}</strong> • Closing Date: <strong>{closingDate}</strong>
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-neutral-50 rounded-2xl text-xs">
              <div>
                <span className="text-neutral-500">Estimated Value</span>
                <div className="font-bold text-neutral-900">{estimatedValue}</div>
              </div>
              <div>
                <span className="text-neutral-500">Portal Tender Fee</span>
                <div className="font-bold text-emerald-600">{tenderFee}</div>
              </div>
              <div>
                <span className="text-neutral-500">EMD Deposit</span>
                <div className="font-bold text-neutral-900">{emdAmount}</div>
              </div>
              <div>
                <span className="text-neutral-500">Contract Duration</span>
                <div className="font-bold text-neutral-900">{contractPeriod}</div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-neutral-900">Overview & Scope</h4>
              <div className="prose prose-neutral max-w-none text-xs" dangerouslySetInnerHTML={{ __html: overview || "<p>No overview written.</p>" }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TenderEditor;
