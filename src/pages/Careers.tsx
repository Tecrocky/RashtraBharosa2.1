import React, { useState, useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Briefcase,
  Users,
  MapPin,
  Clock,
  ArrowRight,
  CheckCircle2,
  Send,
  Building2,
  Search,
  Filter,
  FileText,
  Upload,
  UserCheck,
  Check,
  ChevronRight,
  Printer,
  QrCode,
  ShieldAlert,
  ShieldCheck,
  FileBadge,
  Calendar,
  Layers,
  Phone,
  Mail,
  AlertCircle,
  Hash,
  Paperclip,
  ExternalLink,
  MessageSquare,
  FileCheck,
  IndianRupee,
  RefreshCw,
  GraduationCap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import odishaHeroVideo from "@/assets/VIDEOS/odisha-hero.mp4";
import {
  initialJobOpenings,
  initialCandidateApplications,
  JobOpening,
  CandidateApplication,
} from "@/data/careersData";
import { generateReferenceId, dispatchConfirmationNotification, lookupUnifiedTracking } from "@/lib/trackingService";
import MetaTags from "@/components/MetaTags";

const Careers: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlTab = searchParams.get("tab");
  const preselectedJobId = searchParams.get("job");

  // Master Synchronized State
  const [openings, setOpenings] = useState<JobOpening[]>(() => {
    const saved = localStorage.getItem("rbg_careers_jobs") || localStorage.getItem("rbg_career_jobs");
    if (saved !== null) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.map((j: any) => ({
            ...j,
            qualifications: Array.isArray(j.qualifications)
              ? j.qualifications
              : typeof j.qualifications === "string" && j.qualifications.trim()
              ? j.qualifications.split("\n").filter(Boolean)
              : ["B.Tech / Relevant Professional Degree"],
            responsibilities: Array.isArray(j.responsibilities)
              ? j.responsibilities
              : typeof j.responsibilities === "string" && j.responsibilities.trim()
              ? j.responsibilities.split("\n").filter(Boolean)
              : ["Lead on-site engineering and operations protocols."],
          }));
        }
      } catch (e) {
        console.warn(e);
      }
    }
    return [];
  });

  // Fetch Live Job Openings from Supabase on mount
  useEffect(() => {
    const fetchCloudJobs = async () => {
      try {
        const { data, error } = await supabase
          .from("jobs")
          .select("*")
          .order("created_at", { ascending: false });

        if (!error && Array.isArray(data)) {
          const mappedJobs: JobOpening[] = data.map((d: any) => {
            let parsedQuals: string[] = [];
            if (Array.isArray(d.qualifications)) {
              parsedQuals = d.qualifications;
            } else if (typeof d.qualifications === "string" && d.qualifications.trim()) {
              parsedQuals = d.qualifications.split("\n").map((s: string) => s.trim()).filter(Boolean);
            } else {
              parsedQuals = [
                "B.Tech / Relevant Professional Degree",
                "Demonstrated track record of industrial excellence.",
              ];
            }

            let parsedResps: string[] = [];
            if (Array.isArray(d.responsibilities)) {
              parsedResps = d.responsibilities;
            } else if (typeof d.responsibilities === "string" && d.responsibilities.trim()) {
              parsedResps = d.responsibilities.split("\n").map((s: string) => s.trim()).filter(Boolean);
            } else {
              parsedResps = [
                "Lead on-site engineering and operations protocols.",
                "Coordinate with group directorate on project delivery milestones.",
              ];
            }

            return {
              id: d.id,
              jobCode: d.job_code || d.id,
              title: d.title,
              vertical: d.department || d.vertical || "Mining & Natural Resources",
              department: d.department || "Operations",
              location: d.location || "Bhubaneswar, Odisha",
              type: d.employment_type || d.type || "Full-Time",
              workplaceType: d.workplace_type || "On-Site (Executive Field)",
              experience: d.experience || "5–8 Years",
              openings: d.openings || 1,
              description: d.description || d.title,
              responsibilities: parsedResps,
              qualifications: parsedQuals,
              skills: Array.isArray(d.skills)
                ? d.skills
                : typeof d.skills === "string"
                ? d.skills.split(",").map((s: string) => s.trim()).filter(Boolean)
                : ["Operations Management", "Team Leadership"],
              benefits: Array.isArray(d.benefits)
                ? d.benefits
                : typeof d.benefits === "string"
                ? d.benefits.split("\n").map((s: string) => s.trim()).filter(Boolean)
                : ["Executive Health Cover", "Performance Bonus", "Company Transit"],
              postedDate: d.posted_date || d.created_at?.split("T")[0] || "2026-10-02",
              closingDate: d.closing_date || d.deadline || "Open Until Filled",
              status: d.status === "Closed" ? "Closed" : "Active",
              salary: d.salary || "Industry Leading (Competitive)",
            };
          });

          setOpenings(mappedJobs);
          localStorage.setItem("rbg_careers_jobs", JSON.stringify(mappedJobs));
        }
      } catch (err) {
        console.warn("Supabase jobs fetch error:", err);
      }
    };

    fetchCloudJobs();
  }, []);

  const [applications, setApplications] = useState<CandidateApplication[]>(() => {
    const saved = localStorage.getItem("rbg_career_applications");
    return saved ? JSON.parse(saved) : initialCandidateApplications;
  });

  // Sync candidate applications from Supabase cloud
  useEffect(() => {
    const fetchCloudApplications = async () => {
      try {
        const { data, error } = await supabase
          .from("candidate_applications")
          .select("*")
          .order("created_at", { ascending: false });

        if (!error && Array.isArray(data) && data.length > 0) {
          const mapped: CandidateApplication[] = data.map((d: any) => ({
            applicationId: d.application_id,
            jobCode: d.job_code || "RBG-GEN",
            jobTitle: d.job_title || "Executive Role",
            vertical: d.vertical || "General Operations",
            fullName: d.full_name,
            email: d.email,
            phone: d.phone,
            location: d.location || "Bhubaneswar",
            education: d.education || "Graduate",
            specialization: d.specialization || "General",
            experienceYears: d.experience_years || "3-5",
            currentCompany: d.current_company || "N/A",
            currentDesignation: d.current_designation || "Applicant",
            currentCTC: d.current_ctc || "Negotiable",
            expectedCTC: d.expected_ctc || "Negotiable",
            noticePeriod: d.notice_period || "30 Days",
            linkedinUrl: d.linkedin_url || "",
            resumeFileName: d.resume_file_name || "Application.pdf",
            resumeFileSize: "1.2 MB",
            resumeUploadTime: "Cloud Vault Verified",
            resumeDocRef: d.resume_doc_ref || d.application_id,
            coverNote: d.cover_note || "",
            appliedDate: d.applied_date || new Date().toISOString().split("T")[0],
            currentStage: (d.current_stage || 1) as 1 | 2 | 3 | 4 | 5,
            status: d.status || "Application Received & Vaulted",
            statusColor: "blue",
            remarks: d.remarks || "Application vaulted.",
            assignedRecruiter: {
              name: "Talent Acquisition Directorate",
              title: "Senior HR Officer",
              email: "careers@rashtrabharosagroup.com",
              phone: "+91 11 6927 0434",
              office: "Corporate HQ, Bhubaneswar",
            },
            timeline: Array.isArray(d.timeline) ? d.timeline : [
              {
                stageNumber: 1,
                title: "Application Received & Vaulted",
                date: d.applied_date || "Today",
                description: "Application successfully submitted and encrypted in talent vault.",
                completed: true,
                current: true,
              }
            ],
            queries: Array.isArray(d.queries) ? d.queries : [],
          }));
          setApplications(mapped);
          localStorage.setItem("rbg_career_applications", JSON.stringify(mapped));
        }
      } catch (err) {
        console.warn("Cloud applications lookup note:", err);
      }
    };
    fetchCloudApplications();
  }, []);

  // 3 Core Active Tabs: 'positions' | 'apply' | 'track'
  const [activeTab, setActiveTab] = useState<"positions" | "apply" | "track">(() => {
    if (urlTab === "apply" || urlTab === "track") return urlTab;
    return "positions";
  });

  useEffect(() => {
    if (urlTab && (urlTab === "positions" || urlTab === "apply" || urlTab === "track")) {
      setActiveTab(urlTab);
    }
  }, [urlTab]);

  const handleTabChange = (tab: "positions" | "apply" | "track") => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  // Directory Filters
  const [selectedVertical, setSelectedVertical] = useState<string>("All");
  const [jobSearchQuery, setJobSearchQuery] = useState<string>("");
  const [selectedJobForModal, setSelectedJobForModal] = useState<JobOpening | null>(null);

  // File Upload Reference
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Application Form State
  const [applyForm, setApplyForm] = useState({
    jobCode: preselectedJobId || openings[0]?.jobCode || "RBG-JOB-MIN-01",
    fullName: "",
    email: "",
    phone: "",
    location: "Bhubaneswar, Odisha",
    education: "B.Tech / Post Graduate",
    specialization: "",
    experienceYears: "3 – 5 Years",
    currentCompany: "",
    currentDesignation: "",
    currentCTC: "₹ 12 – 15 LPA",
    expectedCTC: "₹ 16 – 20 LPA",
    noticePeriod: "30 Days",
    linkedinUrl: "",
    coverNote: "",
    resumeFileName: "Candidate_Resume_Verified.pdf",
    resumeFileSize: "2.1 MB PDF",
    resumeUploadTime: "Just now",
    resumeUploaded: true,
    agreedZeroFee: true,
  });

  const [isSubmittingApp, setIsSubmittingApp] = useState(false);
  const [submittedAppReceipt, setSubmittedAppReceipt] = useState<CandidateApplication | null>(null);

  // Tracking Engine State
  const [trackingQuery, setTrackingQuery] = useState("");
  const [trackedApp, setTrackedApp] = useState<CandidateApplication | null>(null);
  const [trackSearched, setTrackSearched] = useState(false);

  // Candidate Inquiry Message inside Tracking Tab
  const [inquiryText, setInquiryText] = useState("");
  const [inquirySent, setInquirySent] = useState(false);

  // Pre-fill selected job if triggered from URL or quick apply
  useEffect(() => {
    if (preselectedJobId) {
      const found = openings.find((j) => j.jobCode === preselectedJobId || j.id === preselectedJobId);
      if (found) {
        setApplyForm((prev) => ({ ...prev, jobCode: found.jobCode }));
      }
    }
  }, [preselectedJobId, openings]);

  // Handle Quick Apply click on Job Card
  const handleQuickApply = (job: JobOpening) => {
    setApplyForm((prev) => ({ ...prev, jobCode: job.jobCode }));
    setActiveTab("apply");
    setSearchParams({ tab: "apply", job: job.jobCode });
    window.scrollTo({ top: 400, behavior: "smooth" });
  };

  // Real File Upload Listener
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const sizeStr =
        file.size > 1024 * 1024
          ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
          : `${Math.round(file.size / 1024)} KB`;
      const timeStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

      setApplyForm((prev) => ({
        ...prev,
        resumeFileName: file.name,
        resumeFileSize: `${sizeStr} ${file.name.split(".").pop()?.toUpperCase() || "PDF"}`,
        resumeUploadTime: `Uploaded today at ${timeStr}`,
        resumeUploaded: true,
      }));
    }
  };

  // Submit Application Handler
  const handleApplicationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const matchedJob = openings.find((j) => j.jobCode === applyForm.jobCode) || openings[0] || {
      jobCode: applyForm.jobCode || "RBG-JOB-GEN-01",
      title: "General Corporate Application",
      vertical: "Executive Directorate",
    };
    const newAppId = generateReferenceId("career_application");
    const docRef = `RBG-CV-2026-00${Math.floor(100 + Math.random() * 900)}`;
    const todayStr = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

    const newApp: CandidateApplication = {
      applicationId: newAppId,
      jobCode: matchedJob.jobCode,
      jobTitle: matchedJob.title,
      vertical: matchedJob.vertical,
      fullName: applyForm.fullName,
      email: applyForm.email,
      phone: applyForm.phone,
      location: applyForm.location,
      education: applyForm.education,
      specialization: applyForm.specialization || "Professional Domain Specialization",
      experienceYears: applyForm.experienceYears,
      currentCompany: applyForm.currentCompany || "Independent / Previous Organization",
      currentDesignation: applyForm.currentDesignation || "Professional Practitioner",
      currentCTC: applyForm.currentCTC,
      expectedCTC: applyForm.expectedCTC,
      noticePeriod: applyForm.noticePeriod,
      linkedinUrl: applyForm.linkedinUrl || undefined,
      resumeFileName: applyForm.resumeFileName,
      resumeFileSize: applyForm.resumeFileSize,
      resumeUploadTime: applyForm.resumeUploadTime,
      resumeDocRef: docRef,
      coverNote: applyForm.coverNote || "Application submitted via RBG Careers Portal.",
      appliedDate: todayStr,
      currentStage: 1,
      status: "Application Received & Vaulted",
      statusColor: "blue",
      remarks: "Application securely logged in Human Capital ATS repository. Initial capability scrutiny underway.",
      assignedRecruiter: {
        name: "Talent Acquisition Desk",
        title: `Nodal Recruiter — ${matchedJob.vertical}`,
        email: "careers@rashtrabharosagroup.com",
        office: "Corporate Headquarters, Bhubaneswar",
      },
      timeline: [
        {
          stageNumber: 1,
          title: "Application Received & CV Digitally Vaulted",
          date: todayStr,
          description: `Candidate credentials and CV PDF vaulted under Reference ID ${newAppId}.`,
          completed: true,
          current: true,
          officerNotes: "Cryptographic hash generated. Initial compliance criteria verified.",
        },
        {
          stageNumber: 2,
          title: "Technical Talent Scrutiny",
          date: "Pending",
          description: "Technical capability and domain qualification assessment by vertical leadership.",
          completed: false,
        },
        {
          stageNumber: 3,
          title: "Directorate Technical Panel Interview",
          date: "Pending",
          description: "Formal technical evaluation with Chief Directorate Officers.",
          completed: false,
        },
        {
          stageNumber: 4,
          title: "Executive Selection Board Review",
          date: "Pending",
          description: "Final leadership interaction, compensation alignment, and board clearance.",
          completed: false,
        },
        {
          stageNumber: 5,
          title: "Formal Letter of Intent (LOI) & Onboarding",
          date: "Pending",
          description: "Issuance of formal offer letter and orientation schedule.",
          completed: false,
        },
      ],
      queries: [],
    };

    const updatedApps = [newApp, ...applications];
    localStorage.setItem("rbg_career_applications", JSON.stringify(updatedApps));
    setApplications(updatedApps);

    // Cloud Database Sync: Persist application directly in Supabase (both candidate_applications & inquiries)
    try {
      await supabase.from("candidate_applications").insert([{
        application_id: newAppId,
        job_code: matchedJob.jobCode,
        job_title: matchedJob.title,
        vertical: matchedJob.vertical,
        full_name: applyForm.fullName,
        email: applyForm.email,
        phone: applyForm.phone,
        location: applyForm.location,
        education: applyForm.education,
        specialization: applyForm.specialization || "General",
        experience_years: applyForm.experienceYears,
        current_company: applyForm.currentCompany || "N/A",
        current_designation: applyForm.currentDesignation || "Applicant",
        current_ctc: applyForm.currentCTC || "Negotiable",
        expected_ctc: applyForm.expectedCTC || "Negotiable",
        notice_period: applyForm.noticePeriod,
        linkedin_url: applyForm.linkedinUrl || "",
        resume_file_name: applyForm.resumeFile?.name || "Direct-Web-Application.pdf",
        resume_doc_ref: `RESUME-DOC-${newAppId}`,
        cover_note: applyForm.coverNote || "Application submitted via corporate careers portal.",
        applied_date: new Date().toISOString().split("T")[0],
        current_stage: 1,
        status: "Application Received & Vaulted",
        remarks: "Online application submitted via central careers portal.",
        timeline: [
          {
            stageNumber: 1,
            title: "Application Received & Vaulted",
            date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
            description: "Application successfully submitted and encrypted in talent vault.",
            completed: true,
            current: true,
          }
        ],
      }]);

      await supabase.from("inquiries").insert([{
        id: newAppId,
        full_name: applyForm.fullName,
        email: applyForm.email,
        phone: applyForm.phone,
        company_name: applyForm.currentCompany || "N/A",
        designation: applyForm.currentDesignation || "Applicant",
        location: applyForm.location,
        selected_company: "Rashtra Bharosa Group",
        selected_project: `${matchedJob.title} (${matchedJob.jobCode})`,
        reason: "Job Application",
        subject: `Application for ${matchedJob.title} - ${applyForm.fullName}`,
        message: `Experience: ${applyForm.experienceYears} | Education: ${applyForm.education} | Current CTC: ${applyForm.currentCTC} | Expected CTC: ${applyForm.expectedCTC} | Notice: ${applyForm.noticePeriod} | Note: ${applyForm.coverNote || "N/A"}`,
        status: "New",
        assigned_officer: "Talent Acquisition Desk",
      }]);
    } catch (err) {
      console.warn("Supabase job application sync note:", err);
    }

    // Automated Confirmation Email Notification
    await dispatchConfirmationNotification({
      to: applyForm.email,
      recipientName: applyForm.fullName,
      referenceId: newAppId,
      type: "career_application",
      title: `ATS Application Logged — ${matchedJob.title} (${matchedJob.jobCode})`,
      metaDetails: {
        Role: matchedJob.title,
        Vertical: matchedJob.vertical,
        Candidate: applyForm.fullName,
      },
    });

    setTimeout(() => {
      setIsSubmittingApp(false);
      setSubmittedAppReceipt(newApp);
      setTrackedApp(newApp);
    }, 500);
  };

  // Track Search Handler
  const handleTrackSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = trackingQuery.trim().toUpperCase();
    if (!q) return;

    setTrackSearched(true);
    const matched = applications.find(
      (a) =>
        a.applicationId.toUpperCase() === q ||
        a.email.toLowerCase() === trackingQuery.trim().toLowerCase() ||
        a.phone.replace(/[^0-9]/g, "") === trackingQuery.replace(/[^0-9]/g, "")
    );

    if (matched) {
      setTrackedApp(matched);
      return;
    }

    const unified = lookupUnifiedTracking(q);
    if (unified && unified.type === "career_application") {
      setTrackedApp(unified.details as CandidateApplication);
      return;
    }

    setTrackedApp(null);
  };

  // Candidate sends inquiry message
  const handleSendInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryText.trim() || !trackedApp) return;

    const newQuery = {
      id: `Q-${Date.now()}`,
      sender: "candidate" as const,
      senderName: trackedApp.fullName,
      message: inquiryText.trim(),
      timestamp: `Today at ${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} IST`,
    };

    const updatedApp: CandidateApplication = {
      ...trackedApp,
      queries: [...(trackedApp.queries || []), newQuery],
    };

    const updatedAll = applications.map((a) =>
      a.applicationId === trackedApp.applicationId ? updatedApp : a
    );

    localStorage.setItem("rbg_career_applications", JSON.stringify(updatedAll));
    setApplications(updatedAll);
    setTrackedApp(updatedApp);
    setInquiryText("");
    setInquirySent(true);
    setTimeout(() => setInquirySent(false), 3000);
  };

  // Vertical Filters List
  const verticalsList = [
    "All",
    "RashBhar Mining",
    "RashBhar Health Care",
    "RashBhar Technology",
    "RashBhar Soil & Soul",
    "Innovex Construction",
    "Royal Birds Capital",
  ];

  const filteredOpenings = openings.filter((job) => {
    const matchesVert = selectedVertical === "All" || job.vertical === selectedVertical;
    const q = jobSearchQuery.trim().toLowerCase();
    const matchesSearch =
      q === "" ||
      job.title.toLowerCase().includes(q) ||
      job.department.toLowerCase().includes(q) ||
      job.location.toLowerCase().includes(q) ||
      job.description.toLowerCase().includes(q);
    return matchesVert && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#FDFEFE] text-slate-900 font-sans pb-32 selection:bg-[#D9961A]/20 selection:text-[#0F172A]">
      <MetaTags
        title="Careers & Human Capital Opportunities | Rashtra Bharosa Group"
        description="Join Rashtra Bharosa Group. Explore executive career opportunities across mining, heavy civil EPC, enterprise AI, clinical healthcare, and agritech."
        keywords="Careers Rashtra Bharosa Group, Industrial Hiring India, Mining Careers, Civil Engineer Jobs, Enterprise AI Careers"
        url="https://www.rashtrabharosagroup.com/careers"
        schema={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Careers & Human Capital Directorate",
          "description": "Executive talent acquisition and employment openings across Rashtra Bharosa Group subsidiaries.",
          "publisher": {
            "@type": "Organization",
            "name": "Rashtra Bharosa Group"
          }
        }}
      />

      {/* 1. Grand Executive Hero Banner with Indian Corporate Team Backdrop */}
      <section className="relative pt-36 sm:pt-44 pb-12 lg:pt-48 lg:pb-16 overflow-hidden flex items-end min-h-[420px] lg:min-h-[460px] bg-[#041633]">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1758691736975-9f7f643d178e?auto=format&fit=crop&w=2000&q=80"
            alt="Indian Corporate Professionals at Rashtra Bharosa Group"
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
                  Human Capital & Talent Directorate
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-white leading-tight">
                Careers at <strong className="font-bold">Rashtra Bharosa</strong>
              </h1>
              <p className="text-sm sm:text-base font-medium text-slate-200 tracking-wide max-w-3xl">
                Building enduring institutions through meritocracy, operational scale, and high ethical purpose across heavy mining, clinical healthcare, deep-tech, and civil EPC.
              </p>
            </div>

            {/* Header Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                onClick={() => handleTabChange("positions")}
                className="px-5 py-2.5 rounded-lg bg-[#f2b72b] hover:bg-[#e0a620] text-[#030914] font-bold text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer"
              >
                Browse Openings
              </button>
              <button
                onClick={() => handleTabChange("apply")}
                className="px-5 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-xs tracking-wider uppercase backdrop-blur-md transition-all cursor-pointer"
              >
                Direct Application Form
              </button>
              <button
                onClick={() => handleTabChange("track")}
                className="px-5 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-xs tracking-wider uppercase backdrop-blur-md transition-all cursor-pointer"
              >
                Track Status
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
              onClick={() => handleTabChange("positions")}
              className={`py-3.5 font-bold transition-all cursor-pointer border-b-2 -mb-px whitespace-nowrap uppercase tracking-wider flex items-center gap-1.5 ${
                activeTab === "positions"
                  ? "border-[#062B63] text-[#062B63]"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              Open Positions Directory ({openings.length})
            </button>

            <button
              onClick={() => handleTabChange("apply")}
              className={`py-3.5 font-bold transition-all cursor-pointer border-b-2 -mb-px whitespace-nowrap uppercase tracking-wider flex items-center gap-1.5 ${
                activeTab === "apply"
                  ? "border-[#062B63] text-[#062B63]"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              Direct Application Form
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
              Track Application Status
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-12 mt-8">
        {/* ========================================================
            TAB 1: OPEN POSITIONS DIRECTORY (SQUARE BOX PATTERN)
            ======================================================== */}
        {activeTab === "positions" && (
          <div className="space-y-8">
            {/* Filter & Search Toolbar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 md:pb-0">
                {verticalsList.map((vert) => (
                  <button
                    key={vert}
                    onClick={() => setSelectedVertical(vert)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      selectedVertical === vert
                        ? "bg-[#062B63] text-white shadow-xs"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200"
                    }`}
                  >
                    {vert}
                  </button>
                ))}
              </div>

              <div className="relative w-full md:w-80 shrink-0">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search job title, skills, or location..."
                  value={jobSearchQuery}
                  onChange={(e) => setJobSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#062B63]/20"
                />
              </div>
            </div>

            {/* Openings Square Box Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredOpenings.map((job) => (
                <div
                  key={job.id}
                  className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <span className="font-mono font-bold text-[10px] text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                        {job.jobCode}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                        {job.vertical}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 leading-snug group-hover:text-[#062B63] transition-colors">
                      {job.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span>{job.location}</span>
                      </div>
                      <div>•</div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{job.experience}</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {job.description}
                    </p>

                    <div className="space-y-1 pt-1">
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                        Key Responsibilities:
                      </span>
                      <ul className="space-y-1 text-xs text-slate-600">
                        {(job.responsibilities || []).slice(0, 2).map((r: any, i: number) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-[#D9961A] font-bold">•</span>
                            <span className="line-clamp-1">{typeof r === "string" ? r : (r?.title || r?.duty || JSON.stringify(r))}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setSelectedJobForModal(job)}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold cursor-pointer transition-colors"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleQuickApply(job)}
                      className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#062B63] hover:bg-[#041c40] text-white text-xs font-semibold cursor-pointer shadow-xs transition-colors"
                    >
                      Apply Now <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredOpenings.length === 0 && (
              <div className="text-center py-20 bg-slate-50 rounded-2xl border border-slate-200/80 p-8 space-y-4 max-w-2xl mx-auto">
                <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center mx-auto text-slate-400 shadow-2xs">
                  <Briefcase className="w-6 h-6 text-[#062B63]" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base sm:text-lg font-bold text-slate-900">No Active Job Openings at Present</h4>
                  <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                    We currently do not have any open listed vacancies. Spontaneous executive applications and candidate profiles are always welcome.
                  </p>
                </div>
                <div className="pt-2">
                  <button
                    onClick={() => setActiveTab("apply")}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#062B63] hover:bg-[#041c40] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                  >
                    <span>Submit Spontaneous Application</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================
            TAB 2: DEDICATED DIRECT APPLICATION FORM (IN-PAGE)
            ======================================================== */}
        {activeTab === "apply" && (
          <div className="max-w-4xl mx-auto space-y-8">
            {submittedAppReceipt ? (
              /* Submission Success Receipt Slip */
              <div className="bg-white rounded-2xl border border-slate-300 p-6 sm:p-8 shadow-sm space-y-6">
                <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                      Rashtra Bharosa Group Human Capital Directorate
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                      Official Candidate Application Acknowledgement Slip
                    </h3>
                    <p className="text-[11px] text-slate-400 font-mono">
                      Timestamp: {submittedAppReceipt.appliedDate} | Status: Encrypted & Vaulted
                    </p>
                  </div>

                  <div className="p-2 border border-slate-200 rounded-lg bg-slate-50 flex items-center gap-2 self-start sm:self-auto">
                    <QrCode className="w-8 h-8 text-slate-700" />
                    <div className="text-[9px] font-mono leading-tight text-slate-600">
                      <span>CANDIDATE REF</span>
                      <strong className="block text-slate-900">{submittedAppReceipt.applicationId}</strong>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-3.5 rounded-lg border border-slate-200">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">1. Tracking ID</span>
                    <span className="font-mono font-bold text-slate-900 text-xs">{submittedAppReceipt.applicationId}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">2. Job Code</span>
                    <span className="font-mono font-bold text-slate-900 text-xs">{submittedAppReceipt.jobCode}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">3. Vertical</span>
                    <span className="font-bold text-slate-900 text-xs">{submittedAppReceipt.vertical}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">4. CV Vault Hash</span>
                    <span className="font-mono font-bold text-emerald-700 text-xs">{submittedAppReceipt.resumeDocRef}</span>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-xs space-y-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700">
                    <div>Candidate Name: <strong className="text-slate-900">{submittedAppReceipt.fullName}</strong></div>
                    <div>Email: <strong className="text-slate-900">{submittedAppReceipt.email}</strong></div>
                    <div>Applied Position: <strong className="text-slate-900">{submittedAppReceipt.jobTitle}</strong></div>
                    <div>Experience: <strong className="text-slate-900">{submittedAppReceipt.experienceYears}</strong></div>
                  </div>
                  <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-500">
                    Your credentials have been securely routed to the Technical Talent Directorate. You will receive an official SMS and email update regarding the Stage 2 screening review.
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white hover:bg-slate-50 text-slate-800 font-semibold text-xs border border-slate-200 shadow-xs cursor-pointer"
                  >
                    <Printer className="w-4 h-4" />
                    Print Receipt Slip
                  </button>
                  <button
                    onClick={() => {
                      setSubmittedAppReceipt(null);
                      setActiveTab("track");
                    }}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#062B63] hover:bg-[#041c40] text-white font-semibold text-xs uppercase tracking-wider cursor-pointer"
                  >
                    Track Application in Live Timeline →
                  </button>
                </div>
              </div>
            ) : (
              /* Logical Enterprise Application Form Container */
              <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-blue-50 text-blue-700 text-xs font-semibold mb-2">
                    <UserCheck className="w-3.5 h-3.5" />
                    Official Online Recruitment Gateway
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                    Submit Candidate Dossier & Application
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Complete all 5 structured sections. Your credentials will be encrypted, assigned a permanent candidate tracking ID, and evaluated on capability.
                  </p>
                </div>

                <form onSubmit={handleApplicationSubmit} className="space-y-6 text-xs">
                  {/* SECTION 1: TARGET POSITION */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                      <Briefcase className="w-4 h-4 text-[#062B63]" />
                      1. Target Position & Operating Vertical
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="sm:col-span-2">
                        <label className="block font-semibold text-slate-700 mb-1">
                          Select Job Opening / Opportunity *
                        </label>
                        {openings.length === 0 ? (
                          <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 text-slate-800 text-xs flex items-center justify-between">
                            <span>Open Executive General Application — Enter your profile details below.</span>
                          </div>
                        ) : (
                          <select
                            value={applyForm.jobCode}
                            onChange={(e) => setApplyForm({ ...applyForm, jobCode: e.target.value })}
                            className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-slate-900 bg-white font-semibold text-xs focus:outline-none focus:ring-2 focus:ring-[#062B63]/20"
                          >
                            {openings.map((j) => (
                              <option key={j.jobCode} value={j.jobCode}>
                                {j.jobCode} — {j.title} ({j.vertical})
                              </option>
                            ))}
                          </select>
                        )}

                        {/* Selected Job Snapshot & Clear Read Opportunity */}
                        {(() => {
                          const currentJob = openings.find((j) => j.jobCode === applyForm.jobCode) || openings[0];
                          if (!currentJob) return null;

                          return (
                            <div className="mt-3 p-3.5 rounded-xl bg-white border border-slate-200/80 space-y-2.5 shadow-2xs">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="font-mono font-bold text-[10px] text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                                      {currentJob.jobCode}
                                    </span>
                                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                                      {currentJob.vertical}
                                    </span>
                                  </div>
                                  <h4 className="font-bold text-slate-900 text-sm mt-1">
                                    {currentJob.title}
                                  </h4>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => setSelectedJobForModal(currentJob)}
                                  className="px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-[#062B63] text-xs font-bold transition-colors flex items-center gap-1.5 shrink-0 self-start sm:self-auto cursor-pointer shadow-2xs"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                  Read Full Role Profile
                                </button>
                              </div>

                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-slate-600">
                                <div><span className="text-slate-400 block text-[9px] uppercase font-bold">Location:</span> {currentJob.location}</div>
                                <div><span className="text-slate-400 block text-[9px] uppercase font-bold">Experience:</span> {currentJob.experience}</div>
                                <div><span className="text-slate-400 block text-[9px] uppercase font-bold">Type:</span> {currentJob.type || "Full Time"}</div>
                                <div><span className="text-slate-400 block text-[9px] uppercase font-bold">Vacancies:</span> {currentJob.openings} Openings</div>
                              </div>

                              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed bg-slate-50 p-2 rounded-lg border border-slate-100">
                                {currentJob.description}
                              </p>
                            </div>
                          );
                        })()}
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Preferred Base Location *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Bhubaneswar / Keonjhar / Site"
                          value={applyForm.location}
                          onChange={(e) => setApplyForm({ ...applyForm, location: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 text-xs bg-white"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Notice Period / Availability *</label>
                        <select
                          value={applyForm.noticePeriod}
                          onChange={(e) => setApplyForm({ ...applyForm, noticePeriod: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 bg-white text-xs"
                        >
                          <option value="Immediate Joiner (0 – 15 Days)">Immediate Joiner (0 – 15 Days)</option>
                          <option value="30 Days">30 Days</option>
                          <option value="60 Days">60 Days</option>
                          <option value="90 Days">90 Days</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* SECTION 2: PERSONAL & CONTACT INFORMATION */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-[#062B63]" />
                      2. Personal & Contact Dossier
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Full Legal Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Er. Soumya Ranjan Mohanty"
                          value={applyForm.fullName}
                          onChange={(e) => setApplyForm({ ...applyForm, fullName: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 text-xs bg-white"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Email Address *</label>
                        <input
                          type="email"
                          required
                          placeholder="e.g. soumya.mohanty@email.com"
                          value={applyForm.email}
                          onChange={(e) => setApplyForm({ ...applyForm, email: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 text-xs bg-white"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Mobile / WhatsApp Number *</label>
                        <input
                          type="tel"
                          required
                          placeholder="e.g. +91 94371 88920"
                          value={applyForm.phone}
                          onChange={(e) => setApplyForm({ ...applyForm, phone: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 text-xs bg-white"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">LinkedIn Profile / Portfolio Link</label>
                        <input
                          type="text"
                          placeholder="e.g. https://linkedin.com/in/your-profile"
                          value={applyForm.linkedinUrl}
                          onChange={(e) => setApplyForm({ ...applyForm, linkedinUrl: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 text-xs bg-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* SECTION 3: PROFESSIONAL CREDENTIALS & EXPERIENCE */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                      <GraduationCap className="w-4 h-4 text-[#062B63]" />
                      3. Professional Background & Qualifications
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Highest Degree / Qualification *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. B.Tech Mining / MHA / Ph.D. AI"
                          value={applyForm.education}
                          onChange={(e) => setApplyForm({ ...applyForm, education: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 text-xs bg-white"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Specialization / Certifications</label>
                        <input
                          type="text"
                          placeholder="e.g. DGMS First Class / NABH Auditor / PyTorch"
                          value={applyForm.specialization}
                          onChange={(e) => setApplyForm({ ...applyForm, specialization: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 text-xs bg-white"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Total Relevant Experience *</label>
                        <select
                          value={applyForm.experienceYears}
                          onChange={(e) => setApplyForm({ ...applyForm, experienceYears: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 bg-white text-xs"
                        >
                          <option value="0 – 1 Years (Fresher / Trainee)">0 – 1 Years (Fresher / Trainee)</option>
                          <option value="1 – 3 Years">1 – 3 Years</option>
                          <option value="3 – 5 Years">3 – 5 Years</option>
                          <option value="5 – 8 Years">5 – 8 Years</option>
                          <option value="8 – 12 Years">8 – 12 Years</option>
                          <option value="12+ Years (Senior Leadership)">12+ Years (Senior Leadership)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Current Employer Organization</label>
                        <input
                          type="text"
                          placeholder="e.g. Tata Steel / Apollo Hospitals / L&T"
                          value={applyForm.currentCompany}
                          onChange={(e) => setApplyForm({ ...applyForm, currentCompany: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 text-xs bg-white"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Current Annual CTC (₹ INR)</label>
                        <input
                          type="text"
                          placeholder="e.g. ₹ 18.5 LPA"
                          value={applyForm.currentCTC}
                          onChange={(e) => setApplyForm({ ...applyForm, currentCTC: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 text-xs bg-white"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Expected Annual CTC (₹ INR)</label>
                        <input
                          type="text"
                          placeholder="e.g. ₹ 24.0 LPA"
                          value={applyForm.expectedCTC}
                          onChange={(e) => setApplyForm({ ...applyForm, expectedCTC: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 text-xs bg-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* SECTION 4: RESUME / CV UPLOAD DROPZONE */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                      <FileCheck className="w-4 h-4 text-[#062B63]" />
                      4. Curriculum Vitae & Document Vault
                    </h3>

                    {/* Hidden Native File Input */}
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                    />

                    {/* Interactive Dropzone Card */}
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-slate-300 hover:border-[#062B63] bg-white rounded-xl p-6 text-center cursor-pointer transition-colors space-y-2"
                    >
                      <div className="w-10 h-10 rounded-full bg-blue-50 text-[#062B63] flex items-center justify-center mx-auto">
                        <Upload className="w-5 h-5" />
                      </div>

                      <div>
                        <span className="font-bold text-slate-900 text-xs block">
                          Click to browse and attach your Resume / CV
                        </span>
                        <span className="text-[11px] text-slate-500">
                          Supported Formats: PDF, DOCX, DOC (Up to 10 MB)
                        </span>
                      </div>

                      {/* File Details Status */}
                      {applyForm.resumeUploaded && (
                        <div className="mt-3 p-3 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center justify-between text-left max-w-md mx-auto">
                          <div className="flex items-center gap-2">
                            <FileText className="w-5 h-5 text-emerald-700 shrink-0" />
                            <div>
                              <strong className="text-slate-900 block text-xs">{applyForm.resumeFileName}</strong>
                              <span className="text-[10px] text-slate-500 font-mono">
                                {applyForm.resumeFileSize} • {applyForm.resumeUploadTime}
                              </span>
                            </div>
                          </div>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                            READY
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Statement of Purpose */}
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Statement of Purpose / Executive Summary
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Briefly describe key career highlights, technical projects delivered, or leadership strengths..."
                        value={applyForm.coverNote}
                        onChange={(e) => setApplyForm({ ...applyForm, coverNote: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 text-xs bg-white"
                      />
                    </div>
                  </div>

                  {/* SECTION 5: DECLARATIONS & SUBMISSION */}
                  <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-2.5">
                    <input
                      type="checkbox"
                      required
                      checked={applyForm.agreedZeroFee}
                      onChange={(e) => setApplyForm({ ...applyForm, agreedZeroFee: e.target.checked })}
                      className="w-4 h-4 mt-0.5 rounded text-[#062B63]"
                    />
                    <div className="text-xs text-amber-950 leading-relaxed">
                      I solemnly affirm that the credentials provided in this application are accurate and genuine. I understand that <strong>Rashtra Bharosa Group never charges any application, training, security deposit, or recruitment fee</strong> at any stage of hiring.
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="submit"
                      disabled={isSubmittingApp || !applyForm.fullName || !applyForm.email || !applyForm.phone}
                      className="px-8 py-3 rounded-lg bg-[#062B63] hover:bg-[#041c40] text-white font-semibold text-xs uppercase tracking-wider shadow-sm transition-all disabled:opacity-50 cursor-pointer flex items-center gap-2"
                    >
                      {isSubmittingApp ? "Encrypting & Submitting Dossier..." : "Submit Candidate Application"}
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        {/* ========================================================
            TAB 3: TRACK APPLICATION STATUS (ACTUAL ENTERPRISE ATS)
            ======================================================== */}
        {activeTab === "track" && (
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Search Box with Liquid Glass Effect */}
            <div className="relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-xl border border-white/80 p-6 sm:p-8 space-y-4 shadow-[0_8px_32px_0_rgba(6,43,99,0.06)]">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-100/40 via-amber-100/30 to-transparent rounded-full blur-3xl pointer-events-none" />
              <div className="space-y-1.5 relative z-10">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#062B63]/10 text-[#062B63] text-[11px] font-bold uppercase tracking-wider border border-[#062B63]/15">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#062B63]" />
                  Enterprise Talent Tracking System (ATS)
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  Application Status & Lifecycle Tracking
                </h2>
                <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                  Enter your assigned <strong>Application Tracking ID</strong> (e.g. <code>RBG-APP-2026-8842</code>) to view your live recruitment stage, interview schedules, and recruiter communications.
                </p>
              </div>

              <form onSubmit={handleTrackSearch} className="flex flex-col sm:flex-row gap-3 pt-2 relative z-10">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="Enter Application ID (e.g. RBG-APP-2026-8842) or registered Email..."
                    value={trackingQuery}
                    onChange={(e) => setTrackingQuery(e.target.value)}
                    className="w-full pl-10 pr-3 py-3 rounded-xl bg-white/90 border border-slate-200 text-slate-900 font-mono text-xs shadow-xs focus:outline-none focus:ring-2 focus:ring-[#062B63]/20 focus:border-[#062B63] transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="px-8 py-3 rounded-xl bg-[#062B63] hover:bg-[#041c40] text-white font-semibold text-xs uppercase tracking-wider cursor-pointer shrink-0 transition-all shadow-md active:scale-95"
                >
                  Track Application
                </button>
              </form>
            </div>

            {/* Tracked Result Dossier with Liquid Glass Effect */}
            {trackedApp ? (
              <div className="relative overflow-hidden rounded-3xl bg-white/85 backdrop-blur-2xl border border-white/90 p-6 sm:p-10 shadow-[0_20px_50px_rgba(6,43,99,0.08)] space-y-8">
                {/* Background ambient glow */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-blue-500/10 via-emerald-400/10 to-transparent rounded-full blur-3xl pointer-events-none" />

                {/* Result Header Banner */}
                <div className="relative z-10 border-b border-slate-200/70 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="font-mono font-bold text-xs bg-slate-900 text-white px-3 py-1 rounded-lg tracking-wider shadow-xs">
                        {trackedApp.applicationId}
                      </span>
                      <span className="px-3 py-1 text-xs font-semibold rounded-lg bg-emerald-500/15 text-emerald-800 border border-emerald-300">
                        ● {trackedApp.status}
                      </span>
                    </div>
                    <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                      {trackedApp.fullName}
                    </h3>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Applied for: <strong className="text-[#062B63] font-semibold">{trackedApp.jobTitle}</strong> • <span className="text-slate-500">{trackedApp.vertical}</span>
                    </p>
                  </div>

                  <div className="text-right text-xs text-slate-500 self-start sm:self-auto space-y-1 bg-slate-50/80 backdrop-blur-sm p-3.5 rounded-2xl border border-slate-200/70">
                    <div>Applied Date: <strong className="text-slate-900">{trackedApp.appliedDate}</strong></div>
                    <div className="text-[11px] font-mono text-slate-400">CV Hash: {trackedApp.resumeDocRef}</div>
                  </div>
                </div>

                {/* Candidate Overview Matrix */}
                <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-3 bg-gradient-to-br from-slate-50/90 to-blue-50/30 p-5 rounded-2xl border border-slate-200/80 text-xs shadow-xs">
                  <div className="space-y-1">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Experience Tier</span>
                    <span className="font-bold text-slate-900 text-sm">{trackedApp.experienceYears}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Current Org</span>
                    <span className="font-bold text-slate-900 text-sm truncate block">{trackedApp.currentCompany || "N/A"}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Notice Period</span>
                    <span className="font-bold text-slate-900 text-sm">{trackedApp.noticePeriod}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Attached CV</span>
                    <span className="font-mono text-blue-700 font-semibold truncate block">{trackedApp.resumeFileName}</span>
                  </div>
                </div>

                {/* Assigned Recruiter & Talent Lead Card */}
                {trackedApp.assignedRecruiter && (
                  <div className="relative z-10 p-5 rounded-2xl bg-gradient-to-r from-blue-50/90 via-indigo-50/40 to-slate-50/80 border border-blue-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs shadow-xs">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-blue-900 uppercase tracking-wider bg-blue-100/70 px-2 py-0.5 rounded">
                        Assigned Talent Lead & Recruiter
                      </span>
                      <h5 className="font-bold text-slate-900 text-base">{trackedApp.assignedRecruiter.name}</h5>
                      <span className="text-slate-600 block">{trackedApp.assignedRecruiter.title} • {trackedApp.assignedRecruiter.office}</span>
                    </div>

                    <div className="flex flex-col sm:items-end text-slate-700 text-xs space-y-1.5">
                      <a 
                        href={`mailto:${trackedApp.assignedRecruiter.email}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/90 border border-blue-200 text-blue-900 font-medium hover:bg-blue-600 hover:text-white transition-all shadow-xs"
                      >
                        <Mail className="w-3.5 h-3.5 text-blue-600 group-hover:text-white" />
                        {trackedApp.assignedRecruiter.email}
                      </a>
                    </div>
                  </div>
                )}

                {/* Scheduled Interviews Box (If active) */}
                {trackedApp.interviews && trackedApp.interviews.length > 0 && (
                  <div className="relative z-10 p-5 rounded-2xl bg-gradient-to-r from-purple-50/90 via-indigo-50/50 to-white/90 border border-purple-200/80 space-y-3 text-xs shadow-xs">
                    <div className="flex items-center justify-between border-b border-purple-200/60 pb-2.5">
                      <span className="font-bold text-purple-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-purple-700" />
                        Confirmed Directorate Interview Details
                      </span>
                      <span className="px-2.5 py-1 text-[11px] font-bold bg-purple-200/80 text-purple-900 rounded-lg">
                        {trackedApp.interviews[0].status}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-800">
                      <div className="p-3 rounded-xl bg-white/80 border border-purple-100">
                        <span className="text-[10px] text-slate-400 uppercase font-semibold block">Round</span>
                        <strong className="text-slate-900">{trackedApp.interviews[0].round}</strong>
                      </div>
                      <div className="p-3 rounded-xl bg-white/80 border border-purple-100">
                        <span className="text-[10px] text-slate-400 uppercase font-semibold block">Date & Time</span>
                        <strong className="text-purple-900">{trackedApp.interviews[0].date} ({trackedApp.interviews[0].time})</strong>
                      </div>
                      <div className="p-3 rounded-xl bg-white/80 border border-purple-100">
                        <span className="text-[10px] text-slate-400 uppercase font-semibold block">Panel</span>
                        <strong className="text-slate-900">{trackedApp.interviews[0].panel}</strong>
                      </div>
                      <div className="p-3 rounded-xl bg-white/80 border border-purple-100">
                        <span className="text-[10px] text-slate-400 uppercase font-semibold block">Mode / Venue</span>
                        <strong className="text-slate-900">{trackedApp.interviews[0].venueOrLink}</strong>
                      </div>
                    </div>
                  </div>
                )}

                {/* 5-Stage Visual Progress Stepper */}
                <div className="relative z-10 space-y-4 pt-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Live 5-Stage ATS Recruitment Lifecycle
                    </h4>
                    <span className="text-[11px] text-slate-400 font-mono">Real-Time Evaluation</span>
                  </div>

                  <div className="space-y-3">
                    {trackedApp.timeline.map((stg) => (
                      <div
                        key={stg.stageNumber}
                        className={`p-4 rounded-2xl border transition-all flex items-start gap-4 ${
                          stg.current
                            ? "bg-blue-50/90 border-blue-300 ring-2 ring-blue-400/30 shadow-md"
                            : stg.completed
                            ? "bg-slate-50/80 border-slate-200/80"
                            : "bg-white/60 border-slate-100 opacity-60"
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 shadow-xs ${
                            stg.completed
                              ? "bg-emerald-600 text-white"
                              : stg.current
                              ? "bg-[#062B63] text-white animate-pulse"
                              : "bg-slate-200 text-slate-600"
                          }`}
                        >
                          {stg.completed ? <Check className="w-4 h-4 stroke-[3]" /> : stg.stageNumber}
                        </div>

                        <div className="flex-1 space-y-1">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                            <h5 className="font-bold text-sm text-slate-900">
                              Stage {stg.stageNumber}: {stg.title}
                            </h5>
                            <span className="text-[11px] font-mono text-slate-500">{stg.date}</span>
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed">{stg.description}</p>
                          {stg.officerNotes && (
                            <div className="text-[11px] text-slate-600 font-mono bg-white/90 p-2 rounded-xl border border-slate-200/80 mt-2">
                              Talent Notes: {stg.officerNotes}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interactive Candidate Query / Communication Desk */}
                <div className="relative z-10 p-6 rounded-2xl bg-slate-50/90 border border-slate-200/80 space-y-4 shadow-xs">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-[#062B63]" />
                      Candidate Helpdesk & Recruiter Query Log
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      Ref: {trackedApp.applicationId}
                    </span>
                  </div>

                  {/* Query Feed */}
                  <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
                    {(trackedApp.queries || []).map((q) => (
                      <div
                        key={q.id}
                        className={`p-3.5 rounded-2xl text-xs space-y-1.5 shadow-xs ${
                          q.sender === "hr"
                            ? "bg-blue-50/90 border border-blue-200 text-blue-950"
                            : "bg-white border border-slate-200 text-slate-800 ml-4"
                        }`}
                      >
                        <div className="flex items-center justify-between font-semibold">
                          <span className="text-xs">{q.senderName}</span>
                          <span className="text-[10px] text-slate-400 font-mono font-normal">{q.timestamp}</span>
                        </div>
                        <p className="text-xs leading-relaxed">{q.message}</p>
                      </div>
                    ))}

                    {(!trackedApp.queries || trackedApp.queries.length === 0) && (
                      <p className="text-xs text-slate-500 py-3 italic text-center">
                        No direct inquiries logged. Use the form below to message your assigned recruiter.
                      </p>
                    )}
                  </div>

                  {/* Query Input */}
                  <form onSubmit={handleSendInquiry} className="flex gap-2 pt-2">
                    <input
                      type="text"
                      placeholder="Ask your recruiter about interview schedule, documents, or status..."
                      value={inquiryText}
                      onChange={(e) => setInquiryText(e.target.value)}
                      className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#062B63]/20 focus:border-[#062B63] transition-all"
                    />
                    <button
                      type="submit"
                      disabled={!inquiryText.trim()}
                      className="px-5 py-2.5 rounded-xl bg-[#062B63] hover:bg-[#041c40] text-white text-xs font-semibold cursor-pointer disabled:opacity-50 transition-all shadow-xs active:scale-95"
                    >
                      Send Query
                    </button>
                  </form>

                  {inquirySent && (
                    <span className="text-[11px] text-emerald-700 font-semibold block">
                      Inquiry successfully routed to Talent Desk.
                    </span>
                  )}
                </div>

                {/* Print & Actions Footer */}
                <div className="relative z-10 pt-4 border-t border-slate-200/70 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-600 gap-3">
                  <div>
                    <span>Talent Desk: <strong className="text-slate-900">careers@rashtrabharosagroup.com</strong></span>
                  </div>
                  <button
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200/90 text-slate-800 font-semibold text-xs cursor-pointer shadow-xs transition-all active:scale-95"
                  >
                    <Printer className="w-4 h-4 text-slate-600" />
                    Print Official Application Progress Slip
                  </button>
                </div>
              </div>
            ) : trackSearched ? (
              <div className="relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-2xl border border-white/90 p-12 text-center space-y-4 shadow-[0_20px_50px_rgba(6,43,99,0.08)]">
                <AlertCircle className="w-10 h-10 text-amber-500 mx-auto" />
                <h4 className="text-base font-bold text-slate-900">No Candidate Application Record Matched</h4>
                <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                  We could not find an application matching your search query. Please verify your permanent Application Tracking ID (e.g. <code>RBG-APP-2026-8842</code>) or registered Email and try again.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setTrackingQuery("");
                    setTrackSearched(false);
                  }}
                  className="mt-2 px-6 py-2.5 text-xs font-semibold text-[#062B63] bg-white border border-slate-200 rounded-xl hover:bg-slate-50 cursor-pointer shadow-xs transition-all"
                >
                  Clear Search
                </button>
              </div>
            ) : null}
          </div>
        )}

        {/* ========================================================
            RECRUITMENT FRAUD ADVISORY & ZERO FEE MANDATE
            ======================================================== */}
        <div className="mt-12 p-6 rounded-xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row items-start gap-4">
          <ShieldAlert className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900">
              Official Recruitment Anti-Fraud Advisory & Zero-Fee Guarantee
            </h4>
            <p className="text-xs text-amber-950/80 leading-relaxed">
              Rashtra Bharosa Group and all subsidiary enterprises strictly adhere to a transparent meritocratic hiring model. The Group <strong>never charges any processing fee, security deposit, or interview fee</strong> at any stage. All genuine communications originate exclusively from official <code>@rashtrabharosagroup.com</code> email domains.
            </p>
          </div>
        </div>
      </div>

      {/* ========================================================
          JOB DETAILS MODAL
          ======================================================== */}
      {selectedJobForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="font-mono font-bold text-[10px] text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                  {selectedJobForModal.jobCode}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">
                  {selectedJobForModal.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedJobForModal(null)}
                className="text-slate-400 hover:text-slate-700 text-xs font-mono font-bold cursor-pointer"
              >
                [CLOSE]
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3.5 rounded-lg border border-slate-200">
              <div>Vertical: <strong className="text-slate-900">{selectedJobForModal.vertical}</strong></div>
              <div>Department: <strong className="text-slate-900">{selectedJobForModal.department}</strong></div>
              <div>Location: <strong className="text-slate-900">{selectedJobForModal.location}</strong></div>
              <div>Experience: <strong className="text-slate-900">{selectedJobForModal.experience}</strong></div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Role Overview</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{selectedJobForModal.description}</p>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Key Responsibilities</h4>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {(Array.isArray(selectedJobForModal.responsibilities)
                  ? selectedJobForModal.responsibilities
                  : typeof selectedJobForModal.responsibilities === "string"
                  ? (selectedJobForModal.responsibilities as string).split("\n").filter(Boolean)
                  : []
                ).map((r: any, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#D9961A] font-bold">•</span>
                    <span>{typeof r === "string" ? r : (r?.title || r?.duty || JSON.stringify(r))}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Required Qualifications</h4>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {(Array.isArray(selectedJobForModal.qualifications)
                  ? selectedJobForModal.qualifications
                  : typeof selectedJobForModal.qualifications === "string"
                  ? (selectedJobForModal.qualifications as string).split("\n").filter(Boolean)
                  : []
                ).map((q: any, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>{typeof q === "string" ? q : (q?.title || q?.req || JSON.stringify(q))}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
              <button
                onClick={() => setSelectedJobForModal(null)}
                className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 text-xs cursor-pointer"
              >
                Back to Directory
              </button>
              <button
                onClick={() => {
                  const jobToApply = selectedJobForModal;
                  setSelectedJobForModal(null);
                  handleQuickApply(jobToApply);
                }}
                className="px-6 py-2.5 rounded-lg bg-[#062B63] hover:bg-[#041c40] text-white font-semibold text-xs uppercase tracking-wider cursor-pointer"
              >
                Apply for this Position →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Careers;
