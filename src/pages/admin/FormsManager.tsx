import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Mail,
  Users,
  Eye,
  Check,
  X,
  FileText,
  Clock,
  Send,
  Building2,
  Phone,
  MapPin,
  FileCheck,
  Archive,
  ShieldCheck,
  Download,
  CheckCircle2,
  ExternalLink,
  Inbox,
  FileSpreadsheet,
  Briefcase,
  Activity,
  Copy,
  PlusCircle,
  Trash2,
  AlertCircle,
  MailCheck,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { sendEmailViaResend } from "@/utils/emailService";
import { ContactInquiry } from "@/pages/Dashboard";
import { CandidateApplication } from "@/data/careersData";
import { TenderApplication, BidSubmission, SupplierProfile } from "@/data/tendersData";
import {
  getTrackLogs,
  appendTrackLogMilestone,
  deleteTrackLog,
  TrackLogEntry,
  TrackMilestone,
} from "@/lib/trackingService";

interface FormsManagerProps {
  initialTab?: "enquiries" | "careers" | "tenders" | "vendors" | "tracklogs";
}

export const FormsManager: React.FC<FormsManagerProps> = ({ initialTab = "enquiries" }) => {
  const [activeSubTab, setActiveSubTab] = useState<"enquiries" | "careers" | "tenders" | "vendors" | "tracklogs">(initialTab);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    if (initialTab) {
      setActiveSubTab(initialTab);
    }
  }, [initialTab]);

  // Track Logs & Audit Trail State
  const [trackLogs, setTrackLogs] = useState<TrackLogEntry[]>(() => getTrackLogs());
  const [selectedTrackLog, setSelectedTrackLog] = useState<TrackLogEntry | null>(null);
  const [isAddingMilestone, setIsAddingMilestone] = useState(false);
  const [newMilestone, setNewMilestone] = useState({
    stageName: "",
    action: "",
    actor: "Executive Secretariat",
    notes: "",
    status: "Completed" as TrackMilestone["status"],
  });

  const refreshTrackLogs = () => {
    const updated = getTrackLogs();
    setTrackLogs(updated);
    if (selectedTrackLog) {
      const refreshedSelected = updated.find((l) => l.trackingId === selectedTrackLog.trackingId);
      if (refreshedSelected) setSelectedTrackLog(refreshedSelected);
    }
  };

  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleAppendMilestone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTrackLog || !newMilestone.stageName || !newMilestone.action) return;

    appendTrackLogMilestone(selectedTrackLog.trackingId, {
      stageName: newMilestone.stageName,
      action: newMilestone.action,
      actor: newMilestone.actor || "Executive Secretariat",
      notes: newMilestone.notes,
      status: newMilestone.status,
    });

    setNewMilestone({
      stageName: "",
      action: "",
      actor: "Executive Secretariat",
      notes: "",
      status: "Completed",
    });
    setIsAddingMilestone(false);
    refreshTrackLogs();
  };

  const handleDeleteLog = async (trackingId: string) => {
    if (window.confirm(`Are you sure you want to delete Track Log for ${trackingId}? This will remove it from both Cloud Audit Logs and Local Storage.`)) {
      await deleteTrackLog(trackingId);
      if (selectedTrackLog?.trackingId === trackingId) setSelectedTrackLog(null);
      refreshTrackLogs();
    }
  };

  // Inquiries
  const [inquiries, setInquiries] = useState<ContactInquiry[]>(() => {
    const saved = localStorage.getItem("rbg_inquiries_data");
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedInquiry, setSelectedInquiry] = useState<ContactInquiry | null>(null);
  const [internalNote, setInternalNote] = useState("");
  const [inquiryNotes, setInquiryNotes] = useState<Record<string, string[]>>({});

  // Career Applications
  const [careersData, setCareersData] = useState<CandidateApplication[]>(() => {
    const saved = localStorage.getItem("rbg_career_applications") || localStorage.getItem("rbg_ats_applications");
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateApplication | null>(null);

  // Tender Bids & Applications
  const [tenderBids, setTenderBids] = useState<BidSubmission[]>(() => {
    const saved = localStorage.getItem("rbg_bids_data");
    return saved ? JSON.parse(saved) : [];
  });
  const [tenderApplications, setTenderApplications] = useState<TenderApplication[]>(() => {
    const saved = localStorage.getItem("rbg_applications_data");
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedBid, setSelectedBid] = useState<BidSubmission | null>(null);

  // Vendor / Supplier Registrations
  const [suppliers, setSuppliers] = useState<SupplierProfile[]>(() => {
    const saved = localStorage.getItem("rbg_suppliers_data");
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedSupplier, setSelectedSupplier] = useState<SupplierProfile | null>(null);
  const [isCreatingSupplier, setIsCreatingSupplier] = useState(false);
  const [newSupplierForm, setNewSupplierForm] = useState({
    companyName: "",
    constitution: "Private Limited Company",
    gstin: "",
    panNumber: "",
    contactPerson: "",
    email: "",
    phone: "",
    address: "",
    state: "Odisha",
    businessCategory: "EPC & Turnkey Engineering",
    isMsme: false,
    turnover: "₹ 25 – 100 Crores",
  });

  // Sync Supabase Inquiries & Suppliers
  useEffect(() => {
    const fetchSupabase = async () => {
      try {
        // 1. Inquiries
        const { data: inqData, error: inqError } = await supabase
          .from("inquiries")
          .select("*")
          .order("created_at", { ascending: false });

        if (!inqError && inqData && inqData.length > 0) {
          const mapped: ContactInquiry[] = inqData.map((d: any) => ({
            id: d.id,
            fullName: d.full_name,
            email: d.email,
            phone: d.phone || "",
            companyName: d.company_name || "",
            designation: d.designation || "",
            location: d.location || "",
            selectedCompany: d.selected_company || "Rashtra Bharosa Group",
            selectedProject: d.selected_project || "General Inquiry",
            reason: d.reason || "",
            subject: d.subject || "",
            message: d.message || "",
            timestamp: new Date(d.created_at).toLocaleString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }),
            status: (d.status as any) || "New",
            assignedOfficer: d.assigned_officer || "Office of the Secretariat",
          }));
          setInquiries(mapped);
        }

        // 2. Suppliers / Registered Organizations
        const { data: supData, error: supError } = await supabase
          .from("suppliers")
          .select("*")
          .order("created_at", { ascending: false });

        if (!supError && supData && supData.length > 0) {
          const mappedSuppliers: SupplierProfile[] = supData.map((d: any) => ({
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

          const localSuppliers: SupplierProfile[] = JSON.parse(localStorage.getItem("rbg_suppliers_data") || "[]");
          const map = new Map<string, SupplierProfile>();
          [...mappedSuppliers, ...localSuppliers].forEach((s) => {
            if (s.supplierId) map.set(s.supplierId.toUpperCase(), s);
          });
          const merged = Array.from(map.values());
          setSuppliers(merged);
          localStorage.setItem("rbg_suppliers_data", JSON.stringify(merged));
        }

        // 3. Live Tender Bids from Cloud
        const { data: bidsData, error: bidsError } = await supabase
          .from("bids")
          .select("*")
          .order("created_at", { ascending: false });

        if (!bidsError && bidsData && bidsData.length > 0) {
          const mappedBids: BidSubmission[] = bidsData.map((d: any) => ({
            bidSubmissionId: d.bid_reference || d.bid_id || `RBG-BID-${d.id}`,
            applicationNo: d.application_no || `APP-${d.id}`,
            tenderId: d.tender_no || d.tender_id || "NIT-GENERAL",
            supplierId: d.supplier_id || "REG-ORG",
            companyName: d.company_name || d.vendor_name || "Bidder Enterprise",
            contactPerson: d.contact_person || "Authorized Signatory",
            email: d.email || "",
            phone: d.phone || "",
            quoteAmount: d.quote_amount || (d.quoted_amount ? `₹ ${d.quoted_amount} Cr` : "NIT Estimate"),
            quoteAmountNumber: typeof d.quoted_amount === "number" ? d.quoted_amount : 100,
            timelineMonths: d.timeline || "12 Months",
            technicalSummary: d.technical_summary || "Turnkey compliance submitted.",
            submissionDate: d.submission_date || new Date(d.created_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
            status: d.status || "Submitted & Sealed",
            currentStage: 4,
          }));

          const localBids: BidSubmission[] = JSON.parse(localStorage.getItem("rbg_bids_data") || "[]");
          const bMap = new Map<string, BidSubmission>();
          [...mappedBids, ...localBids].forEach((b) => {
            if (b.bidSubmissionId) bMap.set(b.bidSubmissionId.toUpperCase(), b);
          });
          const mergedBids = Array.from(bMap.values());
          setTenderBids(mergedBids);
          localStorage.setItem("rbg_bids_data", JSON.stringify(mergedBids));
        }
      } catch (e) {
        console.warn("Supabase fetch notice in FormsManager:", e);
      }
    };

    fetchSupabase();
  }, []);

  const handleUpdateSupplierStatus = (supplierId: string, newStatus: "Verified" | "Under Review" | "Suspended") => {
    const updated = suppliers.map((s) => (s.supplierId === supplierId ? { ...s, verificationStatus: newStatus } : s));
    setSuppliers(updated);
    localStorage.setItem("rbg_suppliers_data", JSON.stringify(updated));
    if (selectedSupplier && selectedSupplier.supplierId === supplierId) {
      setSelectedSupplier({ ...selectedSupplier, verificationStatus: newStatus });
    }
    try {
      supabase.from("suppliers").update({ verification_status: newStatus }).eq("supplier_id", supplierId).then();
    } catch {}
  };

  const handleDeleteSupplier = async (supplierId: string, companyName: string) => {
    if (!window.confirm(`Are you sure you want to remove registered organization "${companyName}" (${supplierId}) from the Sovereign Database?`)) return;
    const updated = suppliers.filter((s) => s.supplierId !== supplierId);
    setSuppliers(updated);
    localStorage.setItem("rbg_suppliers_data", JSON.stringify(updated));
    if (selectedSupplier?.supplierId === supplierId) setSelectedSupplier(null);

    try {
      if (supabase) {
        const { error } = await supabase
          .from("suppliers")
          .delete()
          .or(`supplier_id.eq.${supplierId},id.eq.${supplierId}`);
        if (error) {
          console.warn("Supabase supplier delete error:", error.message);
        }
      }
    } catch (err) {
      console.error("Failed to delete supplier from cloud:", err);
    }
  };

  const handleDeleteInquiry = async (inquiryId: string, personName?: string) => {
    if (!window.confirm(`Are you sure you want to delete inquiry "${inquiryId}"${personName ? ` from ${personName}` : ""} from both Cloud and Local records?`)) return;
    const updated = inquiries.filter((i) => i.id !== inquiryId);
    setInquiries(updated);
    localStorage.setItem("rbg_inquiries_data", JSON.stringify(updated));
    if (selectedInquiry?.id === inquiryId) setSelectedInquiry(null);

    try {
      if (supabase) {
        const { error } = await supabase
          .from("inquiries")
          .delete()
          .eq("id", inquiryId);
        if (error) {
          console.warn("Supabase inquiry delete error:", error.message);
        }
      }
    } catch (err) {
      console.error("Failed to delete inquiry from cloud:", err);
    }
  };

  const handleDeleteBid = async (bidId: string, companyName?: string) => {
    if (!window.confirm(`Are you sure you want to delete tender bid "${bidId}"${companyName ? ` for ${companyName}` : ""} from the Cloud Repository?`)) return;
    const updated = tenderBids.filter((b) => b.bidSubmissionId !== bidId);
    setTenderBids(updated);
    localStorage.setItem("rbg_bids_data", JSON.stringify(updated));
    if (selectedBid?.bidSubmissionId === bidId) setSelectedBid(null);

    try {
      if (supabase) {
        const { error } = await supabase
          .from("bids")
          .delete()
          .or(`bid_reference.eq.${bidId},bid_id.eq.${bidId}`);
        if (error) {
          console.warn("Supabase bid delete error:", error.message);
        }
      }
    } catch (err) {
      console.error("Failed to delete bid from cloud:", err);
    }
  };

  const handleDeleteCandidate = async (applicationId: string, candidateName?: string) => {
    if (!window.confirm(`Are you sure you want to delete application "${applicationId}"${candidateName ? ` of ${candidateName}` : ""} from ATS records?`)) return;
    const updated = careersData.filter((c) => c.applicationId !== applicationId);
    setCareersData(updated);
    localStorage.setItem("rbg_career_applications", JSON.stringify(updated));
    localStorage.setItem("rbg_ats_applications", JSON.stringify(updated));
    if (selectedCandidate?.applicationId === applicationId) setSelectedCandidate(null);

    try {
      if (supabase) {
        // Also remove from candidate_applications and inquiries (in case mirrored)
        await supabase
          .from("candidate_applications")
          .delete()
          .eq("application_id", applicationId);
        await supabase
          .from("inquiries")
          .delete()
          .eq("id", applicationId);
      }
    } catch (err) {
      console.error("Failed to delete candidate application from cloud:", err);
    }
  };

  const handleCreateAdminSupplier = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `RBG-SUP-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const todayFormatted = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
    
    const newProfile: SupplierProfile = {
      supplierId: generatedId,
      companyName: newSupplierForm.companyName,
      gstin: newSupplierForm.gstin.toUpperCase(),
      panNumber: newSupplierForm.panNumber.toUpperCase(),
      contactPerson: newSupplierForm.contactPerson,
      email: newSupplierForm.email,
      phone: newSupplierForm.phone,
      address: newSupplierForm.address,
      state: newSupplierForm.state,
      businessCategory: newSupplierForm.businessCategory,
      isMsme: newSupplierForm.isMsme,
      registrationDate: todayFormatted,
      verificationStatus: "Verified",
    };

    const updated = [newProfile, ...suppliers];
    setSuppliers(updated);
    localStorage.setItem("rbg_suppliers_data", JSON.stringify(updated));

    try {
      supabase.from("suppliers").insert([{
        supplier_id: generatedId,
        company_name: newSupplierForm.companyName,
        gstin: newSupplierForm.gstin.toUpperCase(),
        pan_number: newSupplierForm.panNumber.toUpperCase(),
        contact_person: newSupplierForm.contactPerson,
        email: newSupplierForm.email,
        phone: newSupplierForm.phone,
        address: newSupplierForm.address,
        state: newSupplierForm.state,
        business_category: newSupplierForm.businessCategory,
        is_msme: newSupplierForm.isMsme,
        registration_date: todayFormatted,
        verification_status: "Verified",
      }]).then();
    } catch {}

    setIsCreatingSupplier(false);
    setNewSupplierForm({
      companyName: "",
      constitution: "Private Limited Company",
      gstin: "",
      panNumber: "",
      contactPerson: "",
      email: "",
      phone: "",
      address: "",
      state: "Odisha",
      businessCategory: "EPC & Turnkey Engineering",
      isMsme: false,
      turnover: "₹ 25 – 100 Crores",
    });
  };

  const handleUpdateInquiryStatus = (id: string, newStatus: ContactInquiry["status"]) => {
    const updated = inquiries.map((i) => (i.id === id ? { ...i, status: newStatus } : i));
    setInquiries(updated);
    localStorage.setItem("rbg_inquiries_data", JSON.stringify(updated));
    if (selectedInquiry && selectedInquiry.id === id) {
      setSelectedInquiry({ ...selectedInquiry, status: newStatus });
    }
  };

  const handleAddNote = (id: string) => {
    if (!internalNote.trim()) return;
    const existing = inquiryNotes[id] || [];
    const updated = {
      ...inquiryNotes,
      [id]: [
        ...existing,
        `${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}: ${internalNote.trim()}`,
      ],
    };
    setInquiryNotes(updated);
    setInternalNote("");
  };

  const filteredInquiries = inquiries.filter((inq) => {
    const matchesQuery =
      inq.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.companyName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || inq.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesQuery && matchesStatus;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16 font-sans">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 pb-5">
        <div>
          <h2 className="text-xl font-bold text-neutral-900 tracking-tight">
            Centralized Forms & Enquiries Desk
          </h2>
          <p className="text-xs text-neutral-500 font-mono">
            Direct Public Website Inquiries & Candidate ATS Vault
          </p>
        </div>

        {/* Sub-tabs */}
        <div className="flex items-center p-1 rounded-2xl bg-neutral-100 border border-neutral-200 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveSubTab("enquiries")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeSubTab === "enquiries" ? "bg-white text-black shadow-sm font-bold" : "text-neutral-600 hover:text-black"
            }`}
          >
            Public Enquiries ({inquiries.length})
          </button>
          <button
            onClick={() => setActiveSubTab("tenders")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeSubTab === "tenders" ? "bg-white text-black shadow-sm font-bold" : "text-neutral-600 hover:text-black"
            }`}
          >
            Tender Applications & Bids ({tenderBids.length})
          </button>
          <button
            onClick={() => setActiveSubTab("vendors")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeSubTab === "vendors" ? "bg-white text-black shadow-sm font-bold" : "text-neutral-600 hover:text-black"
            }`}
          >
            Vendor Registrations ({suppliers.length})
          </button>
          <button
            onClick={() => setActiveSubTab("careers")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeSubTab === "careers" ? "bg-white text-black shadow-sm font-bold" : "text-neutral-600 hover:text-black"
            }`}
          >
            Career ATS Vault ({careersData.length})
          </button>
          <button
            onClick={() => {
              setActiveSubTab("tracklogs");
              refreshTrackLogs();
            }}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeSubTab === "tracklogs" ? "bg-white text-black shadow-sm font-bold" : "text-neutral-600 hover:text-black"
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            Email & ID Track Logs ({trackLogs.length})
          </button>
        </div>
      </div>

      {/* ENQUIRIES TAB */}
      {activeSubTab === "enquiries" && (
        <div className="space-y-4">
          {/* Filter Bar */}
          <div className="p-4 rounded-2xl bg-white border border-neutral-200 flex flex-wrap items-center justify-between gap-3 shadow-sm">
            <div className="relative flex-grow max-w-md">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by ID, name, email, company..."
                className="w-full pl-9 pr-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-black placeholder:text-neutral-400 focus:outline-none focus:border-black"
              />
            </div>

            <div className="flex items-center gap-1.5">
              {["all", "new", "in progress", "reviewed", "closed"].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider capitalize transition-all ${
                    statusFilter === st ? "bg-black text-white" : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Submissions Table */}
          <div className="rounded-3xl bg-white border border-neutral-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-neutral-800">
                <thead className="bg-neutral-50 border-b border-neutral-200 text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                  <tr>
                    <th className="p-4">Submission ID</th>
                    <th className="p-4">Form Type</th>
                    <th className="p-4">Name & Company</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Submitted Date</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {filteredInquiries.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-16 text-center text-neutral-400">
                        <Inbox className="w-8 h-8 mx-auto mb-2 text-neutral-300 stroke-[1.5]" />
                        <div className="font-semibold text-xs text-neutral-700">No Inquiries Found</div>
                        <p className="text-[11px] text-neutral-400 max-w-xs mx-auto mt-0.5">
                          New contact and public grievance submissions will appear here in real time.
                        </p>
                      </td>
                    </tr>
                  ) : (
                    filteredInquiries.map((inq) => (
                      <tr key={inq.id} className="hover:bg-neutral-50 transition-colors">
                        <td className="p-4 font-mono font-bold text-neutral-900">{inq.id}</td>
                        <td className="p-4 font-semibold text-neutral-700">{inq.reason || "General Corporate"}</td>
                        <td className="p-4">
                          <div className="font-bold text-neutral-900">{inq.fullName}</div>
                          <div className="text-[11px] text-neutral-500">{inq.companyName || inq.location}</div>
                        </td>
                        <td className="p-4 font-mono text-neutral-600">{inq.email}</td>
                        <td className="p-4 font-mono text-neutral-500 text-[11px]">{inq.timestamp}</td>
                        <td className="p-4">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase ${
                              inq.status === "New"
                                ? "bg-neutral-900 text-white"
                                : inq.status === "Closed"
                                ? "bg-neutral-200 text-neutral-800"
                                : "bg-neutral-100 text-neutral-700 border border-neutral-300"
                            }`}
                          >
                            {inq.status}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => {
                                setSelectedInquiry(inq);
                                if (inq.status === "New") handleUpdateInquiryStatus(inq.id, "Reviewed");
                              }}
                              className="px-3 py-1.5 rounded-xl bg-neutral-100 hover:bg-black hover:text-white text-black text-xs font-semibold transition-all"
                            >
                              View Details
                            </button>
                            <button
                              onClick={() => handleDeleteInquiry(inq.id, inq.fullName)}
                              title="Delete Inquiry from Database"
                              className="p-1.5 rounded-xl hover:bg-red-50 text-neutral-400 hover:text-red-600 transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TENDERS APPLICATIONS & BIDS TAB */}
      {activeSubTab === "tenders" && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-white border border-neutral-200 flex flex-wrap items-center justify-between gap-3 shadow-sm">
            <div className="relative flex-grow max-w-md">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by Bid ID, Tender No, Company..."
                className="w-full pl-9 pr-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-black placeholder:text-neutral-400 focus:outline-none focus:border-black"
              />
            </div>
            <div className="text-xs text-neutral-500 font-mono">
              Live Bids: <strong>{tenderBids.length}</strong> | Applications: <strong>{tenderApplications.length}</strong>
            </div>
          </div>

          <div className="rounded-3xl bg-white border border-neutral-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-neutral-800">
                <thead className="bg-neutral-50 border-b border-neutral-200 text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                  <tr>
                    <th className="p-4">Bid / App ID</th>
                    <th className="p-4">Tender Reference</th>
                    <th className="p-4">Vendor Company</th>
                    <th className="p-4">Quoted Amount</th>
                    <th className="p-4">Submission Date</th>
                    <th className="p-4">Evaluation Stage</th>
                    <th className="p-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {tenderBids.filter(
                    (b) =>
                      !searchQuery ||
                      b.bidSubmissionId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      b.tenderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      b.companyName.toLowerCase().includes(searchQuery.toLowerCase())
                  ).length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-16 text-center text-neutral-400">
                        <FileSpreadsheet className="w-8 h-8 mx-auto mb-2 text-neutral-300 stroke-[1.5]" />
                        <div className="font-semibold text-xs text-neutral-700">No Tender Bids or Applications</div>
                        <p className="text-[11px] text-neutral-400 max-w-xs mx-auto mt-0.5">
                          When vendors and contractors apply or submit e-bids for active tenders, their bids will stream here.
                        </p>
                      </td>
                    </tr>
                  ) : (
                    tenderBids
                      .filter(
                        (b) =>
                          !searchQuery ||
                          b.bidSubmissionId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.tenderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.companyName.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .map((bid) => (
                        <tr key={bid.bidSubmissionId} className="hover:bg-neutral-50 transition-colors">
                          <td className="p-4 font-mono font-bold text-neutral-900">{bid.bidSubmissionId}</td>
                          <td className="p-4 font-mono text-neutral-700">{bid.tenderId}</td>
                          <td className="p-4">
                            <div className="font-bold text-neutral-900">{bid.companyName}</div>
                            <div className="text-[11px] text-neutral-500 font-mono">GST: {bid.gstin}</div>
                          </td>
                          <td className="p-4 font-mono font-bold text-neutral-900">{bid.financialQuote}</td>
                          <td className="p-4 font-mono text-neutral-500 text-[11px]">{bid.submittedAt}</td>
                          <td className="p-4">
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-neutral-100 border border-neutral-300 text-neutral-800">
                              {bid.status}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => setSelectedBid(bid)}
                                className="px-3 py-1.5 rounded-xl bg-neutral-100 hover:bg-black hover:text-white text-black text-xs font-semibold transition-all"
                              >
                                Bid Dossier
                              </button>
                              <button
                                onClick={() => handleDeleteBid(bid.bidSubmissionId, bid.companyName)}
                                title="Delete Tender Bid from Database"
                                className="p-1.5 rounded-xl hover:bg-red-50 text-neutral-400 hover:text-red-600 transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* VENDOR & REGISTERED ORGANIZATIONS TAB */}
      {activeSubTab === "vendors" && (
        <div className="space-y-6">
          {/* Top Metric Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-2xl bg-white border border-neutral-200 shadow-sm space-y-1">
              <div className="text-[10px] font-mono uppercase font-bold text-neutral-400">Total Registered Orgs</div>
              <div className="text-2xl font-bold font-mono text-neutral-900">{suppliers.length}</div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-neutral-200 shadow-sm space-y-1">
              <div className="text-[10px] font-mono uppercase font-bold text-emerald-600">Verified & Active</div>
              <div className="text-2xl font-bold font-mono text-emerald-700">
                {suppliers.filter((s) => !s.verificationStatus || s.verificationStatus === "Verified").length}
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-neutral-200 shadow-sm space-y-1">
              <div className="text-[10px] font-mono uppercase font-bold text-blue-600">MSME / Udyam Verified</div>
              <div className="text-2xl font-bold font-mono text-blue-700">
                {suppliers.filter((s) => s.isMsme).length}
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-neutral-200 shadow-sm space-y-1">
              <div className="text-[10px] font-mono uppercase font-bold text-neutral-400">Database Sync</div>
              <div className="text-xs font-mono font-bold text-neutral-700 mt-1 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Live Cloud Synchronized
              </div>
            </div>
          </div>

          {/* Search, Filter & Add Bar */}
          <div className="p-4 rounded-2xl bg-white border border-neutral-200 flex flex-wrap items-center justify-between gap-3 shadow-sm">
            <div className="relative flex-grow max-w-md">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by Supplier ID, Company Name, GSTIN, PAN, Contact..."
                className="w-full pl-9 pr-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-black placeholder:text-neutral-400 focus:outline-none focus:border-black"
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsCreatingSupplier(true)}
                className="px-4 py-2 rounded-xl bg-black hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm transition-all"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>+ Register New Organization</span>
              </button>
            </div>
          </div>

          {/* Registered Organizations Table */}
          <div className="rounded-3xl bg-white border border-neutral-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-neutral-800">
                <thead className="bg-neutral-50 border-b border-neutral-200 text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                  <tr>
                    <th className="p-4">Organization ID</th>
                    <th className="p-4">Company Name & Category</th>
                    <th className="p-4">GSTIN & PAN</th>
                    <th className="p-4">Nodal Representative</th>
                    <th className="p-4">Email & Phone</th>
                    <th className="p-4">Verification Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {suppliers.filter(
                    (s) =>
                      !searchQuery ||
                      s.supplierId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      s.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      s.gstin.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      (s.panNumber && s.panNumber.toLowerCase().includes(searchQuery.toLowerCase())) ||
                      s.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      s.email.toLowerCase().includes(searchQuery.toLowerCase())
                  ).length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-16 text-center text-neutral-400">
                        <Building2 className="w-10 h-10 mx-auto mb-2 text-neutral-300 stroke-[1.5]" />
                        <div className="font-semibold text-xs text-neutral-700">No Registered Organizations Found</div>
                        <p className="text-[11px] text-neutral-400 max-w-sm mx-auto mt-0.5">
                          When organizations register via the public portal or admin adds them, their credentials and IDs will appear here with full database verification.
                        </p>
                      </td>
                    </tr>
                  ) : (
                    suppliers
                      .filter(
                        (s) =>
                          !searchQuery ||
                          s.supplierId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.gstin.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (s.panNumber && s.panNumber.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          s.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.email.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .map((sup) => (
                        <tr key={sup.supplierId} className="hover:bg-neutral-50 transition-colors">
                          <td className="p-4">
                            <div className="flex items-center gap-1.5">
                              <span className="font-mono font-bold text-neutral-900">{sup.supplierId}</span>
                              <button
                                onClick={() => handleCopyId(sup.supplierId)}
                                title="Copy Supplier ID"
                                className="p-1 hover:bg-neutral-200 rounded text-neutral-400 hover:text-black transition-colors"
                              >
                                {copiedId === sup.supplierId ? (
                                  <Check className="w-3 h-3 text-emerald-600" />
                                ) : (
                                  <Copy className="w-3 h-3" />
                                )}
                              </button>
                            </div>
                            <div className="text-[10px] text-neutral-400 font-mono mt-0.5">
                              Reg: {sup.registrationDate || "Active"}
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="font-bold text-neutral-900 text-xs sm:text-sm">{sup.companyName}</div>
                            <div className="text-[11px] text-neutral-500 font-medium">
                              {sup.businessCategory || "Turnkey Engineering & Supplies"} {sup.isMsme && "• MSME Verified"}
                            </div>
                          </td>
                          <td className="p-4 font-mono text-[11px]">
                            <div><strong className="text-neutral-500">GST:</strong> {sup.gstin}</div>
                            {sup.panNumber && <div className="text-neutral-500"><strong className="text-neutral-400">PAN:</strong> {sup.panNumber}</div>}
                          </td>
                          <td className="p-4">
                            <div className="font-semibold text-neutral-900">{sup.contactPerson}</div>
                            <div className="text-[11px] text-neutral-400">{sup.state || "Odisha, India"}</div>
                          </td>
                          <td className="p-4 font-mono text-[11px] text-neutral-600">
                            <div>{sup.email}</div>
                            <div>{sup.phone}</div>
                          </td>
                          <td className="p-4">
                            <span
                              className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase border ${
                                sup.verificationStatus === "Suspended"
                                  ? "bg-rose-50 text-rose-800 border-rose-200"
                                  : sup.verificationStatus === "Under Review"
                                  ? "bg-amber-50 text-amber-800 border-amber-200"
                                  : "bg-emerald-50 text-emerald-800 border-emerald-200"
                              }`}
                            >
                              ● {sup.verificationStatus || "Verified"}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => setSelectedSupplier(sup)}
                                className="px-3 py-1.5 rounded-xl bg-neutral-100 hover:bg-black hover:text-white text-black text-xs font-semibold transition-all shadow-xs"
                              >
                                View Details
                              </button>
                              <button
                                onClick={() => handleDeleteSupplier(sup.supplierId, sup.companyName)}
                                title="Remove Organization"
                                className="p-1.5 rounded-xl hover:bg-red-50 text-neutral-400 hover:text-red-600 transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* CAREERS ATS TAB */}
      {activeSubTab === "careers" && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-white border border-neutral-200 flex flex-wrap items-center justify-between gap-3 shadow-sm">
            <div className="relative flex-grow max-w-md">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search candidate by ID, name, role..."
                className="w-full pl-9 pr-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-black placeholder:text-neutral-400 focus:outline-none focus:border-black"
              />
            </div>
            <div className="text-xs text-neutral-500 font-mono">
              Total ATS Candidates: <strong>{careersData.length}</strong>
            </div>
          </div>

          <div className="rounded-3xl bg-white border border-neutral-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-neutral-800">
                <thead className="bg-neutral-50 border-b border-neutral-200 text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                  <tr>
                    <th className="p-4">Application ID</th>
                    <th className="p-4">Candidate Name</th>
                    <th className="p-4">Applied Role</th>
                    <th className="p-4">Experience</th>
                    <th className="p-4">Current Stage</th>
                    <th className="p-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {careersData.filter(
                    (cand) =>
                      !searchQuery ||
                      cand.applicationId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      cand.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      cand.jobTitle.toLowerCase().includes(searchQuery.toLowerCase())
                  ).length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-16 text-center text-neutral-400">
                        <Briefcase className="w-8 h-8 mx-auto mb-2 text-neutral-300 stroke-[1.5]" />
                        <div className="font-semibold text-xs text-neutral-700">No Candidate Applications</div>
                        <p className="text-[11px] text-neutral-400 max-w-xs mx-auto mt-0.5">
                          Job applicants who apply via the Careers portal will appear here with automated ATS stage workflows.
                        </p>
                      </td>
                    </tr>
                  ) : (
                    careersData
                      .filter(
                        (cand) =>
                          !searchQuery ||
                          cand.applicationId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          cand.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          cand.jobTitle.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .map((cand) => (
                        <tr key={cand.applicationId} className="hover:bg-neutral-50 transition-colors">
                          <td className="p-4 font-mono font-bold text-neutral-900">{cand.applicationId}</td>
                          <td className="p-4 font-bold text-neutral-900">{cand.fullName}</td>
                          <td className="p-4">
                            <div className="font-semibold text-neutral-800">{cand.jobTitle}</div>
                            <div className="text-[11px] text-neutral-500">{cand.vertical}</div>
                          </td>
                          <td className="p-4">{cand.experienceYears}</td>
                          <td className="p-4">
                            <span className="px-2.5 py-1 rounded-full bg-neutral-100 border border-neutral-300 text-[10px] font-mono font-bold">
                              Stage {cand.currentStage}/5: {cand.status}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => setSelectedCandidate(cand)}
                                className="px-3 py-1.5 rounded-xl bg-neutral-100 hover:bg-black hover:text-white text-black text-xs font-semibold transition-all"
                              >
                                Candidate Dossier
                              </button>
                              <button
                                onClick={() => handleDeleteCandidate(cand.applicationId, cand.fullName)}
                                title="Delete Candidate Application from Database"
                                className="p-1.5 rounded-xl hover:bg-red-50 text-neutral-400 hover:text-red-600 transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TRACK LOGS & AUDIT TRAIL TAB */}
      {activeSubTab === "tracklogs" && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-white border border-neutral-200 flex flex-wrap items-center justify-between gap-3 shadow-sm">
            <div className="relative flex-grow max-w-md">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Track Logs by ID, Email, Recipient, Title..."
                className="w-full pl-9 pr-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-black placeholder:text-neutral-400 focus:outline-none focus:border-black"
              />
            </div>
            <div className="flex items-center gap-2">
              <div className="text-xs text-neutral-500 font-mono">
                Active Track Logs: <strong>{trackLogs.length}</strong>
              </div>
              <button
                onClick={refreshTrackLogs}
                className="px-3 py-1.5 rounded-xl bg-neutral-100 hover:bg-black hover:text-white text-black text-xs font-semibold transition-all flex items-center gap-1"
              >
                <Clock className="w-3.5 h-3.5" />
                Refresh
              </button>
            </div>
          </div>

          <div className="rounded-3xl bg-white border border-neutral-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-neutral-800">
                <thead className="bg-neutral-50 border-b border-neutral-200 text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                  <tr>
                    <th className="p-4">Tracking / Reg ID</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Recipient & Entity</th>
                    <th className="p-4">Email & Phone</th>
                    <th className="p-4">Email Dispatch</th>
                    <th className="p-4">Current Stage</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {trackLogs.filter(
                    (log) =>
                      !searchQuery ||
                      log.trackingId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      log.recipientEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      log.recipientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      (log.organization && log.organization.toLowerCase().includes(searchQuery.toLowerCase())) ||
                      log.subjectOrTitle.toLowerCase().includes(searchQuery.toLowerCase())
                  ).length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-16 text-center text-neutral-400">
                        <Activity className="w-8 h-8 mx-auto mb-2 text-neutral-300 stroke-[1.5]" />
                        <div className="font-semibold text-xs text-neutral-700">No Track Logs Vaulted</div>
                        <p className="text-[11px] text-neutral-400 max-w-sm mx-auto mt-0.5">
                          Every form enquiry, tender application, vendor registration, and candidate CV will generate a Sovereign Tracking ID with automated email logs and step-by-step milestones here.
                        </p>
                      </td>
                    </tr>
                  ) : (
                    trackLogs
                      .filter(
                        (log) =>
                          !searchQuery ||
                          log.trackingId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          log.recipientEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          log.recipientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (log.organization && log.organization.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          log.subjectOrTitle.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .map((log) => (
                        <tr key={log.trackingId} className="hover:bg-neutral-50 transition-colors">
                          <td className="p-4">
                            <div className="flex items-center gap-1.5">
                              <span className="font-mono font-bold text-neutral-900">{log.trackingId}</span>
                              <button
                                onClick={() => handleCopyId(log.trackingId)}
                                title="Copy Tracking ID"
                                className="p-1 hover:bg-neutral-200 rounded text-neutral-500 hover:text-black transition-colors"
                              >
                                {copiedId === log.trackingId ? (
                                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                                ) : (
                                  <Copy className="w-3.5 h-3.5" />
                                )}
                              </button>
                            </div>
                            <div className="text-[10px] text-neutral-400 font-mono mt-0.5">{log.submittedAt}</div>
                          </td>
                          <td className="p-4">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-neutral-100 border border-neutral-200 text-neutral-700">
                              {log.type.replace("_", " ")}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="font-bold text-neutral-900">{log.recipientName}</div>
                            <div className="text-[11px] text-neutral-500 line-clamp-1">{log.organization || log.subjectOrTitle}</div>
                          </td>
                          <td className="p-4 font-mono text-[11px] text-neutral-600">
                            <div>{log.recipientEmail}</div>
                            {log.recipientPhone && <div className="text-neutral-400">{log.recipientPhone}</div>}
                          </td>
                          <td className="p-4">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-emerald-50 text-emerald-800 border border-emerald-200">
                              <MailCheck className="w-3 h-3 text-emerald-600" />
                              {log.emailDeliveryStatus || "Delivered"}
                            </span>
                          </td>
                          <td className="p-4">
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-neutral-900 text-white">
                              {log.status}
                            </span>
                            <div className="text-[10px] text-neutral-500 font-mono mt-0.5">
                              {log.milestones?.length || 0} Milestones Logged
                            </div>
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => setSelectedTrackLog(log)}
                                className="px-3 py-1.5 rounded-xl bg-black text-white hover:bg-neutral-800 text-xs font-semibold transition-all shadow-sm"
                              >
                                View Track Log
                              </button>
                              <button
                                onClick={() => handleDeleteLog(log.trackingId)}
                                title="Delete Log Entry"
                                className="p-1.5 rounded-xl hover:bg-red-50 text-neutral-400 hover:text-red-600 transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Submission Detail Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto space-y-6">
            <button
              onClick={() => setSelectedInquiry(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="border-b border-neutral-200 pb-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-mono font-bold text-neutral-500">{selectedInquiry.id}</span>
                <span className="text-xs text-neutral-400 font-mono">{selectedInquiry.timestamp}</span>
              </div>
              <h3 className="text-xl font-serif font-bold text-neutral-900">{selectedInquiry.subject}</h3>
              <p className="text-xs text-neutral-500 mt-0.5">Form: {selectedInquiry.reason || "Corporate Inquiry"}</p>
            </div>

            {/* Fields Grid */}
            <div className="grid grid-cols-2 gap-4 text-xs bg-neutral-50 p-4 rounded-2xl border border-neutral-200">
              <div>
                <span className="text-neutral-500 font-semibold block">Full Name</span>
                <div className="text-neutral-900 font-bold">{selectedInquiry.fullName}</div>
              </div>
              <div>
                <span className="text-neutral-500 font-semibold block">Company Name</span>
                <div className="text-neutral-900 font-bold">{selectedInquiry.companyName || "N/A"}</div>
              </div>
              <div>
                <span className="text-neutral-500 font-semibold block">Designation</span>
                <div className="text-neutral-900">{selectedInquiry.designation || "N/A"}</div>
              </div>
              <div>
                <span className="text-neutral-500 font-semibold block">Email Address</span>
                <div className="text-neutral-900 font-mono">{selectedInquiry.email}</div>
              </div>
              <div>
                <span className="text-neutral-500 font-semibold block">Mobile / Phone</span>
                <div className="text-neutral-900 font-mono">{selectedInquiry.phone || "N/A"}</div>
              </div>
              <div>
                <span className="text-neutral-500 font-semibold block">Location</span>
                <div className="text-neutral-900">{selectedInquiry.location || "N/A"}</div>
              </div>
              <div>
                <span className="text-neutral-500 font-semibold block">Selected Subsidiary</span>
                <div className="text-neutral-900">{selectedInquiry.selectedCompany}</div>
              </div>
              <div>
                <span className="text-neutral-500 font-semibold block">Project Target</span>
                <div className="text-neutral-900">{selectedInquiry.selectedProject}</div>
              </div>
            </div>

            {/* Message Body */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-900 mb-2">
                Inquiry Message Content
              </label>
              <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-800 leading-relaxed">
                {selectedInquiry.message}
              </div>
            </div>

            {/* Status Change & Internal Notes */}
            <div className="space-y-3 pt-2 border-t border-neutral-200">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                  Update Status
                </label>
                <select
                  value={selectedInquiry.status}
                  onChange={(e) => handleUpdateInquiryStatus(selectedInquiry.id, e.target.value as any)}
                  className="px-3 py-1.5 rounded-xl bg-neutral-50 border border-neutral-300 text-xs font-bold text-neutral-900"
                >
                  <option value="New">New</option>
                  <option value="Reviewed">Reviewed</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              {/* Internal Notes */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  Internal Secretariat Notes
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={internalNote}
                    onChange={(e) => setInternalNote(e.target.value)}
                    placeholder="Add an internal note..."
                    className="w-full px-3 py-1.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900"
                  />
                  <button
                    type="button"
                    onClick={() => handleAddNote(selectedInquiry.id)}
                    className="px-4 py-1.5 bg-black text-white text-xs font-bold rounded-xl whitespace-nowrap"
                  >
                    Add Note
                  </button>
                </div>
                {inquiryNotes[selectedInquiry.id] && (
                  <div className="mt-2 space-y-1">
                    {inquiryNotes[selectedInquiry.id].map((note, idx) => (
                      <div key={idx} className="p-2 rounded-lg bg-neutral-100 text-[11px] text-neutral-700">
                        {note}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="pt-4 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => handleDeleteInquiry(selectedInquiry.id, selectedInquiry.fullName)}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Delete from Database
              </button>
              <button
                type="button"
                onClick={() => setSelectedInquiry(null)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-black text-white hover:bg-neutral-800 text-xs font-bold transition-all"
              >
                Close Inquiry
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Candidate Modal */}
      {selectedCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto space-y-4">
            <button
              onClick={() => setSelectedCandidate(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-neutral-500">{selectedCandidate.applicationId}</span>
              <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-neutral-900 text-white">
                Stage {selectedCandidate.currentStage}/5: {selectedCandidate.status}
              </span>
            </div>
            <h3 className="text-xl font-bold text-neutral-900">{selectedCandidate.fullName}</h3>
            <p className="text-xs text-neutral-600">
              Role: <strong>{selectedCandidate.jobTitle}</strong> ({selectedCandidate.vertical})
            </p>
            <div className="p-4 bg-neutral-50 rounded-2xl space-y-2 text-xs border border-neutral-200">
              <div><strong>Email:</strong> {selectedCandidate.email}</div>
              <div><strong>Phone:</strong> {selectedCandidate.phone}</div>
              <div><strong>Experience:</strong> {selectedCandidate.experienceYears}</div>
              <div><strong>Education:</strong> {selectedCandidate.education} ({selectedCandidate.specialization})</div>
              <div><strong>Notice Period:</strong> {selectedCandidate.noticePeriod}</div>
              <div><strong>Expected CTC:</strong> {selectedCandidate.expectedCtc}</div>
              {selectedCandidate.coverNote && (
                <div className="pt-2 border-t border-neutral-200 italic text-neutral-600">
                  "{selectedCandidate.coverNote}"
                </div>
              )}
            </div>

            {/* Advance Recruitment Stage */}
            <div className="pt-3 border-t border-neutral-200 space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-900">
                Update Tracking & Evaluation Stage:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { stage: 1, label: "1. Screened" },
                  { stage: 2, label: "2. Technical Review" },
                  { stage: 3, label: "3. Leadership Interview" },
                  { stage: 4, label: "4. Offer Extended" },
                  { stage: 5, label: "5. Onboarded" },
                ].map((s) => (
                  <button
                    key={s.stage}
                    type="button"
                    onClick={() => {
                      const updated = careersData.map((c) =>
                        c.applicationId === selectedCandidate.applicationId
                          ? { ...c, currentStage: s.stage, status: s.label.replace(/^\d+\.\s*/, "") }
                          : c
                      );
                      setCareersData(updated);
                      localStorage.setItem("rbg_ats_applications", JSON.stringify(updated));
                      setSelectedCandidate({ ...selectedCandidate, currentStage: s.stage, status: s.label.replace(/^\d+\.\s*/, "") });
                    }}
                    className={`px-2.5 py-1.5 rounded-xl text-[11px] font-semibold border transition-all ${
                      selectedCandidate.currentStage === s.stage
                        ? "bg-black text-white border-black font-bold shadow-sm"
                        : "bg-neutral-50 hover:bg-neutral-100 text-neutral-700 border-neutral-200"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Candidate Modal Footer Actions */}
            <div className="pt-4 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => handleDeleteCandidate(selectedCandidate.applicationId, selectedCandidate.fullName)}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Delete Candidate Application
              </button>
              <button
                type="button"
                onClick={() => setSelectedCandidate(null)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-black text-white hover:bg-neutral-800 text-xs font-bold transition-all"
              >
                Close Candidate Dossier
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tender Bid Dossier Modal */}
      {selectedBid && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto space-y-5">
            <button
              onClick={() => setSelectedBid(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b border-neutral-200 pb-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-mono font-bold text-neutral-500">{selectedBid.bidSubmissionId}</span>
                <span className="text-xs text-neutral-400 font-mono">{selectedBid.submittedAt}</span>
              </div>
              <h3 className="text-xl font-bold text-neutral-900">{selectedBid.companyName}</h3>
              <p className="text-xs text-neutral-600 mt-0.5 font-mono">
                Tender ID: <strong>{selectedBid.tenderId}</strong> | GSTIN: {selectedBid.gstin}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs bg-neutral-50 p-4 rounded-2xl border border-neutral-200">
              <div>
                <span className="text-neutral-500 block font-semibold">Contact Person</span>
                <span className="font-bold text-neutral-900">{selectedBid.contactPerson}</span>
              </div>
              <div>
                <span className="text-neutral-500 block font-semibold">Email & Phone</span>
                <span className="font-mono text-neutral-900">{selectedBid.email} | {selectedBid.phone}</span>
              </div>
              <div>
                <span className="text-neutral-500 block font-semibold">Commercial Quote</span>
                <span className="font-mono font-bold text-base text-neutral-900">{selectedBid.financialQuote}</span>
              </div>
              <div>
                <span className="text-neutral-500 block font-semibold">Execution Timeline</span>
                <span className="font-bold text-neutral-900">{selectedBid.timelineMonths}</span>
              </div>
            </div>

            {selectedBid.technicalSummary && (
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-900 block">
                  Technical Compliance Summary
                </label>
                <div className="p-3.5 bg-neutral-50 rounded-2xl border border-neutral-200 text-xs text-neutral-700 leading-relaxed">
                  {selectedBid.technicalSummary}
                </div>
              </div>
            )}

            {/* Update Procurement Stage */}
            <div className="pt-3 border-t border-neutral-200 space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-900">
                Update Tender Evaluation Stage (Live Tracking Sync):
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  "Submitted",
                  "Technical Scrutiny",
                  "Commercial Evaluation",
                  "LOI Awarded",
                ].map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => {
                      const updated = tenderBids.map((b) =>
                        b.bidSubmissionId === selectedBid.bidSubmissionId ? { ...b, status: st } : b
                      );
                      setTenderBids(updated);
                      localStorage.setItem("rbg_bids_data", JSON.stringify(updated));
                      setSelectedBid({ ...selectedBid, status: st });
                    }}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                      selectedBid.status === st
                        ? "bg-black text-white border-black font-bold shadow-sm"
                        : "bg-neutral-50 hover:bg-neutral-100 text-neutral-700 border-neutral-200"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Tender Bid Dossier Modal Footer Actions */}
            <div className="pt-4 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => handleDeleteBid(selectedBid.bidSubmissionId, selectedBid.companyName)}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Delete Bid from Database
              </button>
              <button
                type="button"
                onClick={() => setSelectedBid(null)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-black text-white hover:bg-neutral-800 text-xs font-bold transition-all"
              >
                Close Bid Dossier
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Registered Organization Profile Dossier Modal */}
      {selectedSupplier && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl">
            <button
              onClick={() => setSelectedSupplier(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header with ID and Verification Status */}
            <div className="border-b border-neutral-200 pb-4">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-base font-mono font-bold text-neutral-900">{selectedSupplier.supplierId}</span>
                  <button
                    onClick={() => handleCopyId(selectedSupplier.supplierId)}
                    className="p-1 hover:bg-neutral-100 rounded text-neutral-500 hover:text-black flex items-center gap-1 text-[11px] font-mono"
                  >
                    {copiedId === selectedSupplier.supplierId ? (
                      <span className="text-emerald-600 font-bold flex items-center gap-0.5">
                        <Check className="w-3.5 h-3.5" /> Copied ID
                      </span>
                    ) : (
                      <span className="flex items-center gap-0.5">
                        <Copy className="w-3.5 h-3.5" /> Copy ID
                      </span>
                    )}
                  </button>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase border ${
                    selectedSupplier.verificationStatus === "Suspended"
                      ? "bg-rose-50 text-rose-800 border-rose-200"
                      : selectedSupplier.verificationStatus === "Under Review"
                      ? "bg-amber-50 text-amber-800 border-amber-200"
                      : "bg-emerald-50 text-emerald-800 border-emerald-200"
                  }`}
                >
                  ● {selectedSupplier.verificationStatus || "Verified"}
                </span>
              </div>
              <h3 className="text-xl font-bold text-neutral-900">{selectedSupplier.companyName}</h3>
              <p className="text-xs text-neutral-500 font-mono mt-0.5">
                Registered Date: {selectedSupplier.registrationDate || "Active"} • Category: {selectedSupplier.businessCategory || "General Supplies"}
              </p>
            </div>

            {/* Enterprise Legal & Tax Credentials Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs bg-neutral-50 p-5 rounded-2xl border border-neutral-200">
              <div>
                <span className="text-neutral-400 block font-bold text-[10px] uppercase">Verified GSTIN</span>
                <span className="font-mono font-bold text-neutral-900 text-sm">{selectedSupplier.gstin}</span>
              </div>
              <div>
                <span className="text-neutral-400 block font-bold text-[10px] uppercase">Permanent PAN</span>
                <span className="font-mono font-bold text-neutral-900 text-sm">{selectedSupplier.panNumber || "N/A"}</span>
              </div>
              <div>
                <span className="text-neutral-400 block font-bold text-[10px] uppercase">MSME / Udyam</span>
                <span className="font-semibold text-neutral-900">
                  {selectedSupplier.isMsme ? "Verified MSME" : "Non-MSME / Large"}
                </span>
              </div>
              <div>
                <span className="text-neutral-400 block font-bold text-[10px] uppercase">Nodal Representative</span>
                <span className="font-bold text-neutral-900">{selectedSupplier.contactPerson}</span>
              </div>
              <div>
                <span className="text-neutral-400 block font-bold text-[10px] uppercase">Corporate Email</span>
                <span className="font-mono text-neutral-900 truncate block">{selectedSupplier.email}</span>
              </div>
              <div>
                <span className="text-neutral-400 block font-bold text-[10px] uppercase">Direct Phone</span>
                <span className="font-mono text-neutral-900">{selectedSupplier.phone}</span>
              </div>
              <div className="col-span-2 sm:col-span-3 pt-2 border-t border-neutral-200">
                <span className="text-neutral-400 block font-bold text-[10px] uppercase">Registered Street Address</span>
                <span className="text-neutral-800 font-medium">{selectedSupplier.address || "N/A"}, {selectedSupplier.state || ""}</span>
              </div>
            </div>

            {/* Verification Status Manager */}
            <div className="space-y-2 pt-2 border-t border-neutral-100">
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
                Update Sovereign Verification Status:
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => handleUpdateSupplierStatus(selectedSupplier.supplierId, "Verified")}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                    selectedSupplier.verificationStatus === "Verified"
                      ? "bg-emerald-600 text-white border-emerald-600 font-bold shadow-xs"
                      : "bg-white hover:bg-emerald-50 text-emerald-800 border-neutral-200"
                  }`}
                >
                  ✓ Verified & Active
                </button>
                <button
                  type="button"
                  onClick={() => handleUpdateSupplierStatus(selectedSupplier.supplierId, "Under Review")}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                    selectedSupplier.verificationStatus === "Under Review"
                      ? "bg-amber-600 text-white border-amber-600 font-bold shadow-xs"
                      : "bg-white hover:bg-amber-50 text-amber-800 border-neutral-200"
                  }`}
                >
                  ⏳ Under Scrutiny / Review
                </button>
                <button
                  type="button"
                  onClick={() => handleUpdateSupplierStatus(selectedSupplier.supplierId, "Suspended")}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                    selectedSupplier.verificationStatus === "Suspended"
                      ? "bg-rose-600 text-white border-rose-600 font-bold shadow-xs"
                      : "bg-white hover:bg-rose-50 text-rose-800 border-neutral-200"
                  }`}
                >
                  ✕ Suspended / Debarred
                </button>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="pt-4 border-t border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => handleDeleteSupplier(selectedSupplier.supplierId, selectedSupplier.companyName)}
                className="px-4 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Remove from Database
              </button>

              <button
                type="button"
                onClick={() => setSelectedSupplier(null)}
                className="px-5 py-2.5 rounded-xl bg-black text-white hover:bg-neutral-800 text-xs font-bold uppercase transition-all shadow-xs"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Admin Manual Organization Registration Modal */}
      {isCreatingSupplier && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl">
            <button
              onClick={() => setIsCreatingSupplier(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b border-neutral-200 pb-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 text-neutral-800 text-[10px] font-mono font-bold uppercase mb-2">
                <Building2 className="w-3.5 h-3.5" /> Admin Directorate Entry
              </div>
              <h3 className="text-xl font-bold text-neutral-900">Register New Organization in Sovereign Database</h3>
              <p className="text-xs text-neutral-500">
                Directly empanel and issue an official Organization Registration ID to a vendor or contractor.
              </p>
            </div>

            <form onSubmit={handleCreateAdminSupplier} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block font-bold text-neutral-800 mb-1">Company Legal Registered Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apex Infra Projects Private Limited"
                    value={newSupplierForm.companyName}
                    onChange={(e) => setNewSupplierForm({ ...newSupplierForm, companyName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs text-black focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block font-bold text-neutral-800 mb-1">GSTIN (15 Characters) *</label>
                  <input
                    type="text"
                    required
                    maxLength={15}
                    placeholder="21AAAAA0000A1Z5"
                    value={newSupplierForm.gstin}
                    onChange={(e) => setNewSupplierForm({ ...newSupplierForm, gstin: e.target.value.toUpperCase() })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 font-mono uppercase text-xs text-black focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block font-bold text-neutral-800 mb-1">PAN Number *</label>
                  <input
                    type="text"
                    required
                    maxLength={10}
                    placeholder="AAAAA0000A"
                    value={newSupplierForm.panNumber}
                    onChange={(e) => setNewSupplierForm({ ...newSupplierForm, panNumber: e.target.value.toUpperCase() })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 font-mono uppercase text-xs text-black focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block font-bold text-neutral-800 mb-1">Business Category *</label>
                  <select
                    value={newSupplierForm.businessCategory}
                    onChange={(e) => setNewSupplierForm({ ...newSupplierForm, businessCategory: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs text-black bg-white focus:outline-none focus:border-black"
                  >
                    <option value="EPC & Turnkey Engineering">EPC & Turnkey Engineering</option>
                    <option value="Mining & Heavy Machinery">Mining & Heavy Machinery</option>
                    <option value="Healthcare & Medical Tech">Healthcare & Medical Tech</option>
                    <option value="Civil Infrastructure & Highways">Civil Infrastructure & Highways</option>
                    <option value="Agriculture & Supply Chain">Agriculture & Supply Chain</option>
                    <option value="Information & Cyber Security">Information & Cyber Security</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-neutral-800 mb-1">State / UT *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Odisha"
                    value={newSupplierForm.state}
                    onChange={(e) => setNewSupplierForm({ ...newSupplierForm, state: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs text-black focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block font-bold text-neutral-800 mb-1">Nodal Officer Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rajesh Mohapatra"
                    value={newSupplierForm.contactPerson}
                    onChange={(e) => setNewSupplierForm({ ...newSupplierForm, contactPerson: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs text-black focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block font-bold text-neutral-800 mb-1">Corporate Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="admin@apexinfra.com"
                    value={newSupplierForm.email}
                    onChange={(e) => setNewSupplierForm({ ...newSupplierForm, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs text-black focus:outline-none focus:border-black"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold text-neutral-800 mb-1">Direct Phone *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98000 00000"
                    value={newSupplierForm.phone}
                    onChange={(e) => setNewSupplierForm({ ...newSupplierForm, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 font-mono text-xs text-black focus:outline-none focus:border-black"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold text-neutral-800 mb-1">Registered Office Address *</label>
                  <input
                    type="text"
                    required
                    placeholder="Plot 42, Chandaka Industrial Estate, Bhubaneswar"
                    value={newSupplierForm.address}
                    onChange={(e) => setNewSupplierForm({ ...newSupplierForm, address: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs text-black focus:outline-none focus:border-black"
                  />
                </div>

                <div className="sm:col-span-2 flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isMsme"
                    checked={newSupplierForm.isMsme}
                    onChange={(e) => setNewSupplierForm({ ...newSupplierForm, isMsme: e.target.checked })}
                    className="rounded border-neutral-300"
                  />
                  <label htmlFor="isMsme" className="font-semibold text-neutral-700 cursor-pointer">
                    Enterprise holds active MSME / Udyam Registration
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-200 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsCreatingSupplier(false)}
                  className="px-4 py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-semibold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-black hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-wider shadow-sm"
                >
                  Save & Generate Organization ID
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TRACK LOG & AUDIT TRAIL MODAL */}
      {selectedTrackLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto space-y-6">
            <button
              onClick={() => setSelectedTrackLog(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="border-b border-neutral-200 pb-4">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-base font-mono font-bold text-neutral-900">{selectedTrackLog.trackingId}</span>
                  <button
                    onClick={() => handleCopyId(selectedTrackLog.trackingId)}
                    className="p-1 hover:bg-neutral-100 rounded text-neutral-500 hover:text-black flex items-center gap-1 text-[11px] font-mono"
                  >
                    {copiedId === selectedTrackLog.trackingId ? (
                      <span className="text-emerald-600 font-bold flex items-center gap-0.5">
                        <Check className="w-3.5 h-3.5" /> Copied
                      </span>
                    ) : (
                      <span className="flex items-center gap-0.5">
                        <Copy className="w-3.5 h-3.5" /> Copy ID
                      </span>
                    )}
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-neutral-100 border border-neutral-200 text-neutral-800">
                    {selectedTrackLog.type.replace("_", " ")}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-neutral-900 text-white">
                    {selectedTrackLog.status}
                  </span>
                </div>
              </div>
              <h3 className="text-lg font-bold text-neutral-900">{selectedTrackLog.subjectOrTitle}</h3>
              <p className="text-xs text-neutral-500 font-mono mt-0.5">
                First Registered: {selectedTrackLog.submittedAt} | Last Updated: {selectedTrackLog.lastUpdated}
              </p>
            </div>

            {/* Recipient & Dispatched Email Metadata Envelope */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-2 text-xs">
                <div className="font-bold text-neutral-900 flex items-center gap-1.5 uppercase text-[11px] tracking-wider text-neutral-500">
                  <Users className="w-3.5 h-3.5" /> Recipient Details
                </div>
                <div>
                  <span className="text-neutral-500 block">Name / Entity:</span>
                  <strong className="text-neutral-900">{selectedTrackLog.recipientName}</strong>
                </div>
                {selectedTrackLog.organization && (
                  <div>
                    <span className="text-neutral-500 block">Organization:</span>
                    <span className="text-neutral-900 font-semibold">{selectedTrackLog.organization}</span>
                  </div>
                )}
                <div>
                  <span className="text-neutral-500 block">Email Address:</span>
                  <span className="font-mono text-neutral-900">{selectedTrackLog.recipientEmail}</span>
                </div>
                {selectedTrackLog.recipientPhone && (
                  <div>
                    <span className="text-neutral-500 block">Mobile:</span>
                    <span className="font-mono text-neutral-900">{selectedTrackLog.recipientPhone}</span>
                  </div>
                )}
              </div>

              <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-2 text-xs">
                <div className="font-bold text-neutral-900 flex items-center gap-1.5 uppercase text-[11px] tracking-wider text-neutral-500">
                  <Mail className="w-3.5 h-3.5" /> Email Notification Envelope
                </div>
                <div>
                  <span className="text-neutral-500 block">Dispatch Status:</span>
                  <span className="inline-flex items-center gap-1 font-mono font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full text-[10px]">
                    <MailCheck className="w-3 h-3" /> {selectedTrackLog.emailDeliveryStatus}
                  </span>
                </div>
                <div>
                  <span className="text-neutral-500 block">Delivered Email Subject:</span>
                  <span className="font-mono text-neutral-800 text-[11px] line-clamp-2">{selectedTrackLog.emailSubject}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block">Transmission Node:</span>
                  <span className="text-neutral-600 font-mono text-[11px]">RBG Central Mail Gateway & Resend Node</span>
                </div>
              </div>
            </div>

            {/* Chronological Milestone Timeline */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5" /> Official Lifecycle Milestones & Event Log
                </h4>
                <button
                  onClick={() => setIsAddingMilestone(!isAddingMilestone)}
                  className="px-2.5 py-1 rounded-xl bg-neutral-100 hover:bg-black hover:text-white text-black text-xs font-semibold transition-all flex items-center gap-1"
                >
                  <PlusCircle className="w-3 h-3" />
                  {isAddingMilestone ? "Cancel" : "Add Event Milestone"}
                </button>
              </div>

              {/* Add Milestone Form */}
              {isAddingMilestone && (
                <form onSubmit={handleAppendMilestone} className="p-4 rounded-2xl bg-neutral-100/70 border border-neutral-300 space-y-3">
                  <div className="text-xs font-bold text-neutral-900">Log New Milestone / Stage Event</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-neutral-600 mb-1">Stage Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g., Technical Assessment Completed"
                        value={newMilestone.stageName}
                        onChange={(e) => setNewMilestone({ ...newMilestone, stageName: e.target.value })}
                        className="w-full px-3 py-1.5 bg-white border border-neutral-300 rounded-xl text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-neutral-600 mb-1">Action Description *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g., Verified credentials and approved for next phase"
                        value={newMilestone.action}
                        onChange={(e) => setNewMilestone({ ...newMilestone, action: e.target.value })}
                        className="w-full px-3 py-1.5 bg-white border border-neutral-300 rounded-xl text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-neutral-600 mb-1">Officer / Actor</label>
                      <input
                        type="text"
                        placeholder="e.g., Procurement Committee"
                        value={newMilestone.actor}
                        onChange={(e) => setNewMilestone({ ...newMilestone, actor: e.target.value })}
                        className="w-full px-3 py-1.5 bg-white border border-neutral-300 rounded-xl text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-neutral-600 mb-1">Milestone Status</label>
                      <select
                        value={newMilestone.status}
                        onChange={(e) => setNewMilestone({ ...newMilestone, status: e.target.value as any })}
                        className="w-full px-3 py-1.5 bg-white border border-neutral-300 rounded-xl text-xs"
                      >
                        <option value="Completed">Completed</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Pending">Pending</option>
                        <option value="Flagged">Flagged</option>
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[10px] font-bold uppercase text-neutral-600 mb-1">Notes / Remarks</label>
                      <textarea
                        rows={2}
                        placeholder="Additional context or internal remarks..."
                        value={newMilestone.notes}
                        onChange={(e) => setNewMilestone({ ...newMilestone, notes: e.target.value })}
                        className="w-full px-3 py-1.5 bg-white border border-neutral-300 rounded-xl text-xs"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-black text-white rounded-xl text-xs font-semibold"
                    >
                      Save & Append Event
                    </button>
                  </div>
                </form>
              )}

              {/* Timeline Items */}
              <div className="space-y-3 relative pl-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-neutral-200">
                {selectedTrackLog.milestones?.map((m, idx) => (
                  <div key={idx} className="relative group">
                    <div
                      className={`absolute -left-6 top-1 w-5 h-5 rounded-full border-2 flex items-center justify-center bg-white ${
                        m.status === "Completed"
                          ? "border-emerald-600 text-emerald-600"
                          : m.status === "In Progress"
                          ? "border-neutral-900 text-neutral-900"
                          : m.status === "Flagged"
                          ? "border-red-600 text-red-600"
                          : "border-neutral-300 text-neutral-400"
                      }`}
                    >
                      {m.status === "Completed" ? (
                        <Check className="w-3 h-3 stroke-[3]" />
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      )}
                    </div>

                    <div className="p-3.5 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="font-bold text-xs text-neutral-900">{m.stageName}</div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase ${
                              m.status === "Completed"
                                ? "bg-emerald-100 text-emerald-800"
                                : m.status === "In Progress"
                                ? "bg-neutral-900 text-white"
                                : m.status === "Flagged"
                                ? "bg-red-100 text-red-800"
                                : "bg-neutral-200 text-neutral-700"
                            }`}
                          >
                            {m.status}
                          </span>
                          <span className="text-[10px] text-neutral-400 font-mono">{m.timestamp}</span>
                        </div>
                      </div>
                      <div className="text-xs text-neutral-700 font-medium">{m.action}</div>
                      <div className="text-[11px] text-neutral-500 font-mono">By: {m.actor}</div>
                      {m.notes && (
                        <div className="text-xs text-neutral-600 bg-white p-2 rounded-xl border border-neutral-200/80 mt-1">
                          {m.notes}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Master Status Updater */}
            <div className="pt-3 border-t border-neutral-200 space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-900">
                Update Master Track Status:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  "Under Executive Review",
                  "Technical Scrutiny",
                  "Statutory Clearance",
                  "Approved & Actioned",
                  "Resolution Closed",
                ].map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => {
                      appendTrackLogMilestone(selectedTrackLog.trackingId, {
                        stageName: st,
                        action: `Status updated to ${st}`,
                        actor: "Admin Desk",
                        notes: `Official administrative transition to status: ${st}`,
                        status: st.includes("Approved") || st.includes("Closed") ? "Completed" : "In Progress",
                      });
                      refreshTrackLogs();
                    }}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                      selectedTrackLog.status === st
                        ? "bg-black text-white border-black font-bold shadow-sm"
                        : "bg-neutral-50 hover:bg-neutral-100 text-neutral-700 border-neutral-200"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="pt-3 border-t border-neutral-200 flex justify-between items-center">
              <button
                type="button"
                onClick={() => window.print()}
                className="px-3.5 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" /> Print / Export Dossier
              </button>
              <button
                type="button"
                onClick={() => setSelectedTrackLog(null)}
                className="px-4 py-2 rounded-xl bg-black text-white text-xs font-semibold"
              >
                Close Track Log
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormsManager;
