import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FileText,
  Users,
  Mail,
  TrendingUp,
  Layers,
  Search,
  Filter,
  ArrowRight,
  Plus,
  RefreshCw,
  Download,
  Calendar,
  Eye,
  Check,
  ChevronRight,
  Sparkles,
  BarChart3,
  Briefcase,
  Globe,
  X,
  LogOut,
  FolderOpen,
  Newspaper,
  Shield,
  ShieldAlert,
  Settings,
  Trash2,
  Edit3,
  Upload,
  ExternalLink,
  ChevronDown,
  Menu,
  FileCheck,
  Activity,
  Building2,
  CheckCircle2,
  Clock,
  AlertCircle,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import logo from "@/assets/logo.png";
import { useAdminAuth, AdminRole } from "@/context/AdminAuthContext";
import ArticleEditor, { ArticleItem, initialArticlesData } from "@/pages/admin/ArticleEditor";
import NewsEditor, { NewsItem, initialNewsData } from "@/pages/admin/NewsEditor";
import MediaEditor, { MediaPost, initialMediaPosts } from "@/pages/admin/MediaEditor";
import CoverageEditor from "@/pages/admin/CoverageEditor";
import TenderEditor from "@/pages/admin/TenderEditor";
import CareerEditor from "@/pages/admin/CareerEditor";
import FormsManager from "@/pages/admin/FormsManager";
import ProjectManager from "@/pages/admin/ProjectManager";
import MediaLibraryModal, { defaultMediaAssets, MediaAsset } from "@/components/admin/MediaLibraryModal";
import { TenderNotice, initialTenders, SupplierProfile } from "@/data/tendersData";
import { JobOpening, initialJobOpenings } from "@/data/careersData";
import { MediaCoverageItem, initialMediaCoverage } from "@/data/mediaData";
import { supabase } from "@/lib/supabase";
import {
  getArticles,
  getNews,
  getTenders,
  getJobs,
  getMediaPosts,
  deleteArticle as apiDeleteArticle,
  deleteNews as apiDeleteNews,
  deleteTender as apiDeleteTender,
  deleteJob as apiDeleteJob,
  deleteMediaPost as apiDeleteMediaPost,
  toggleArticleStatus as apiToggleArticleStatus,
  toggleNewsStatus as apiToggleNewsStatus,
  toggleTenderStatus as apiToggleTenderStatus,
  toggleJobStatus as apiToggleJobStatus,
  toggleMediaPostStatus as apiToggleMediaPostStatus,
} from "@/services/cmsService";

export type AdminViewMode =
  | "home"
  | "articles"
  | "article-new"
  | "article-edit"
  | "news"
  | "news-new"
  | "news-edit"
  | "media"
  | "media-new"
  | "coverage"
  | "coverage-new"
  | "coverage-edit"
  | "tenders"
  | "tender-new"
  | "tender-edit"
  | "tender-applications"
  | "registered-organizations"
  | "projects"
  | "careers"
  | "career-new"
  | "career-edit"
  | "applications"
  | "forms"
  | "tracklogs"
  | "documents"
  | "settings";

export interface ContactInquiry {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  designation: string;
  location: string;
  selectedCompany: string;
  selectedProject: string;
  reason: string;
  subject: string;
  message: string;
  timestamp: string;
  status: "New" | "Reviewed" | "In Progress" | "Closed";
  assignedOfficer: string;
}

const defaultInquiries: ContactInquiry[] = [];

interface DashboardProps {
  defaultTab?: string;
}

export const Dashboard: React.FC<DashboardProps> = ({ defaultTab = "overview" }) => {
  const navigate = useNavigate();
  const { profile, signOut, hasRole } = useAdminAuth();

  // Active View Mapping
  const [currentView, setCurrentView] = useState<AdminViewMode>(() => {
    if (defaultTab === "content" || defaultTab === "articles") return "articles";
    if (defaultTab === "news") return "news";
    if (defaultTab === "media") return "media";
    if (defaultTab === "tenders") return "tenders";
    if (defaultTab === "projects") return "projects";
    if (defaultTab === "talent" || defaultTab === "careers") return "careers";
    if (defaultTab === "applications") return "applications";
    if (defaultTab === "inquiries" || defaultTab === "forms") return "forms";
    if (defaultTab === "documents") return "documents";
    if (defaultTab === "settings") return "settings";
    return "home";
  });

  const [editingItemId, setEditingItemId] = useState<string | undefined>(undefined);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Dynamic Data Lists
  const [articles, setArticles] = useState<ArticleItem[]>([]);
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [mediaPosts, setMediaPosts] = useState<MediaPost[]>(() => {
    const saved = localStorage.getItem("rbg_media_posts");
    return saved ? JSON.parse(saved) : initialMediaPosts;
  });
  const [tenders, setTenders] = useState<TenderNotice[]>([]);
  const [jobs, setJobs] = useState<JobOpening[]>([]);
  const [inquiries, setInquiries] = useState<ContactInquiry[]>(() => {
    const saved = localStorage.getItem("rbg_inquiries_data");
    return saved ? JSON.parse(saved) : defaultInquiries;
  });
  const [mediaCoverage, setMediaCoverage] = useState<MediaCoverageItem[]>(() => {
    const saved = localStorage.getItem("rbg_media_coverage");
    return saved !== null ? JSON.parse(saved) : initialMediaCoverage;
  });
  const [mediaAssets, setMediaAssets] = useState<MediaAsset[]>(() => {
    const saved = localStorage.getItem("rbg_media_library");
    return saved ? JSON.parse(saved) : defaultMediaAssets;
  });

  // Load all dynamic data from cmsService and Supabase
  const loadAllData = async () => {
    setIsRefreshing(true);
    try {
      const [artData, nwsData, tenData, jobData, medData] = await Promise.all([
        getArticles(),
        getNews(),
        getTenders(),
        getJobs(),
        getMediaPosts(),
      ]);
      setArticles(artData);
      setNewsList(nwsData);
      setTenders(tenData);
      setJobs(jobData);
      setMediaPosts(medData);

      // Inquiries from Supabase
      const { data: inqData } = await supabase
        .from("inquiries")
        .select("*")
        .order("created_at", { ascending: false });

      if (inqData && inqData.length > 0) {
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
    } catch (err) {
      console.warn("Error loading dashboard data:", err);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const handleLogout = async () => {
    await signOut();
    navigate("/admin/login", { replace: true });
  };

  const handleRefreshData = () => {
    loadAllData();
  };

  // --- CRUD & Quick Status Actions ---

  // 1. Articles
  const handleDeleteArticle = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to permanently delete article "${title}"?`)) return;
    setArticles((prev) => prev.filter((a) => a.id !== id));
    await apiDeleteArticle(id);
  };

  const handleToggleArticleStatus = async (id: string, currentStatus: "Draft" | "Published" | "Archived") => {
    const nextStatus = currentStatus === "Published" ? "Draft" : "Published";
    setArticles((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: nextStatus } : a))
    );
    await apiToggleArticleStatus(id, nextStatus);
  };

  // 2. News
  const handleDeleteNews = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to permanently delete news dispatch "${title}"?`)) return;
    setNewsList((prev) => prev.filter((n) => n.id !== id));
    await apiDeleteNews(id);
  };

  const handleToggleNewsStatus = async (id: string, currentStatus: "Draft" | "Published" | "Archived") => {
    const nextStatus = currentStatus === "Published" ? "Draft" : "Published";
    setNewsList((prev) =>
      prev.map((n) => (n.id === id ? { ...n, status: nextStatus } : n))
    );
    await apiToggleNewsStatus(id, nextStatus);
  };

  // 3. Tenders
  const handleDeleteTender = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete tender "${title}" (${id})?`)) return;
    setTenders((prev) => prev.filter((t) => t.id !== id));
    await apiDeleteTender(id);
  };

  const handleToggleTenderStatus = async (id: string, currentStatus: "Active" | "Closed") => {
    const nextStatus = currentStatus === "Active" ? "Closed" : "Active";
    setTenders((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: nextStatus } : t))
    );
    await apiToggleTenderStatus(id, nextStatus);
  };

  // 4. Jobs / Careers
  const handleDeleteJob = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete job posting "${title}" (${id})?`)) return;
    setJobs((prev) => prev.filter((j) => j.id !== id));
    await apiDeleteJob(id);
  };

  const handleToggleJobStatus = async (id: string, currentStatus: "Active" | "Closed") => {
    const nextStatus = currentStatus === "Active" ? "Closed" : "Active";
    setJobs((prev) =>
      prev.map((j) => (j.id === id ? { ...j, status: nextStatus } : j))
    );
    await apiToggleJobStatus(id, nextStatus);
  };

  // 5. Media & Coverage
  const handleDeleteMedia = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete media post "${title}"?`)) return;
    setMediaPosts((prev) => prev.filter((m) => m.id !== id));
    await apiDeleteMediaPost(id);
  };

  const handleToggleMediaStatus = async (id: string, currentStatus: "Draft" | "Published") => {
    const nextStatus = currentStatus === "Published" ? "Draft" : "Published";
    setMediaPosts((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status: nextStatus } : m))
    );
    await apiToggleMediaPostStatus(id, nextStatus);
  };

  const handleDeleteCoverage = (id: string, headline: string) => {
    if (!window.confirm(`Are you sure you want to delete coverage "${headline}"?`)) return;
    const updated = mediaCoverage.filter((c) => c.id !== id);
    setMediaCoverage(updated);
    localStorage.setItem("rbg_media_coverage", JSON.stringify(updated));
  };

  // Filtered Lists
  const filteredArticles = articles.filter((a) => {
    const matchesSearch =
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || a.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || a.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const filteredNews = newsList.filter((n) => {
    const matchesSearch =
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || n.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredTenders = tenders.filter((t) => {
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredJobs = jobs.filter((j) => {
    const matchesSearch =
      j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.vertical.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || j.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans flex flex-col selection:bg-slate-900 selection:text-white">
      {/* =========================================================================
          TOP EXECUTIVE APP BAR
          ========================================================================= */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3.5">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-slate-100 text-slate-700 hover:text-black"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link to="/admin/dashboard" onClick={() => setCurrentView("home")} className="flex items-center gap-3">
            <div className="p-1.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center">
              <img src={logo} alt="Rashtra Bharosa Group" className="h-6 w-auto object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-sm sm:text-base text-slate-950 tracking-tight">
                  Rashtra Bharosa Group
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-50 text-blue-700 border border-blue-200 uppercase">
                  CMS Dashboard
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* Right Actions & Public Link */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleRefreshData}
            className={`p-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 transition-all ${
              isRefreshing ? "animate-spin text-blue-600 border-blue-300" : ""
            }`}
            title="Sync Live Supabase Data"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <Link
            to="/"
            target="_blank"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
          >
            <span>Live Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={() => setShowProfileModal(true)}
            className="flex items-center gap-2.5 p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            <div className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
              {profile?.name ? profile.name.charAt(0).toUpperCase() : "A"}
            </div>
            <div className="hidden lg:block text-left">
              <div className="text-xs font-bold text-slate-900 leading-tight">
                {profile?.name || "Executive Admin"}
              </div>
              <div className="text-[10px] text-slate-500 font-mono">
                {profile?.role || "Super Admin"}
              </div>
            </div>
          </button>

          <button
            onClick={handleLogout}
            title="Sign Out"
            className="p-2 rounded-xl bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-700 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* =========================================================================
          BODY: SIDEBAR + CONTENT CANVAS
          ========================================================================= */}
      <div className="flex-grow flex max-w-7xl w-full mx-auto p-4 sm:p-6 gap-6">
        {/* SIDEBAR NAVIGATION */}
        <aside
          className={`fixed md:sticky top-20 z-30 w-64 bg-white border border-slate-200 rounded-3xl p-4 shadow-sm flex flex-col justify-between h-[calc(100vh-6.5rem)] transition-all ${
            mobileMenuOpen ? "left-4" : "-left-72 md:left-0"
          }`}
        >
          <div className="space-y-6 overflow-y-auto pr-1">
            {/* Dashboard Overview */}
            <button
              onClick={() => {
                setCurrentView("home");
                setSearchQuery("");
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                currentView === "home"
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Overview</span>
            </button>

            {/* SECTION 1: CONTENT MANAGEMENT */}
            {hasRole(["Super Admin", "Content Admin"]) && (
              <div className="space-y-1">
                <div className="px-3 text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400">
                  Content & Media
                </div>
                <button
                  onClick={() => {
                    setCurrentView("articles");
                    setSearchQuery("");
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                    currentView === "articles" || currentView === "article-new" || currentView === "article-edit"
                      ? "bg-slate-100 text-slate-900 font-bold"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5" /> Articles
                  </span>
                  <span className="text-[10px] font-mono bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded-md font-bold">
                    {articles.length}
                  </span>
                </button>

                <button
                  onClick={() => {
                    setCurrentView("news");
                    setSearchQuery("");
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                    currentView === "news" || currentView === "news-new" || currentView === "news-edit"
                      ? "bg-slate-100 text-slate-900 font-bold"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Newspaper className="w-3.5 h-3.5" /> News & Updates
                  </span>
                  <span className="text-[10px] font-mono bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded-md font-bold">
                    {newsList.length}
                  </span>
                </button>

                <button
                  onClick={() => {
                    setCurrentView("projects");
                    setSearchQuery("");
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                    currentView === "projects"
                      ? "bg-slate-100 text-slate-900 font-bold"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Building2 className="w-3.5 h-3.5 text-blue-600" /> Capital Projects
                  </span>
                  <span className="text-[10px] font-mono bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded-md font-bold">
                    SQL Live
                  </span>
                </button>
              </div>
            )}

            {/* SECTION 2: PROCUREMENT & TENDERS */}
            {hasRole(["Super Admin", "Tender Admin"]) && (
              <div className="space-y-1">
                <div className="px-3 text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400">
                  Procurement & Tenders
                </div>
                <button
                  onClick={() => {
                    setCurrentView("tenders");
                    setSearchQuery("");
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                    currentView === "tenders" || currentView === "tender-new" || currentView === "tender-edit"
                      ? "bg-slate-100 text-slate-900 font-bold"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Briefcase className="w-3.5 h-3.5" /> Tenders
                  </span>
                  <span className="text-[10px] font-mono bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded-md font-bold">
                    {tenders.length}
                  </span>
                </button>

                <button
                  onClick={() => {
                    setCurrentView("tender-applications");
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                    currentView === "tender-applications"
                      ? "bg-slate-100 text-slate-900 font-bold"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <FileCheck className="w-3.5 h-3.5" /> Tender Bids
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">Live</span>
                </button>

                <button
                  onClick={() => {
                    setCurrentView("registered-organizations");
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                    currentView === "registered-organizations"
                      ? "bg-slate-100 text-slate-900 font-bold"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Building2 className="w-3.5 h-3.5" /> Vendors / Orgs
                  </span>
                </button>
              </div>
            )}

            {/* SECTION 3: TALENT & CAREERS */}
            {hasRole(["Super Admin", "Careers Admin"]) && (
              <div className="space-y-1">
                <div className="px-3 text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400">
                  Talent & Careers
                </div>
                <button
                  onClick={() => {
                    setCurrentView("careers");
                    setSearchQuery("");
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                    currentView === "careers" || currentView === "career-new" || currentView === "career-edit"
                      ? "bg-slate-100 text-slate-900 font-bold"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5" /> Job Openings
                  </span>
                  <span className="text-[10px] font-mono bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded-md font-bold">
                    {jobs.length}
                  </span>
                </button>

                <button
                  onClick={() => {
                    setCurrentView("applications");
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                    currentView === "applications"
                      ? "bg-slate-100 text-slate-900 font-bold"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <FileCheck className="w-3.5 h-3.5" /> Applications
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">Live</span>
                </button>
              </div>
            )}

            {/* SECTION 4: INQUIRIES & AUDIT */}
            <div className="space-y-1">
              <div className="px-3 text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400">
                Inquiries & Audit
              </div>
              <button
                onClick={() => {
                  setCurrentView("forms");
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  currentView === "forms"
                    ? "bg-slate-100 text-slate-900 font-bold"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <span className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5" /> Inquiries
                </span>
                <span className="text-[10px] font-mono bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded-md font-bold">
                  {inquiries.length}
                </span>
              </button>

              <button
                onClick={() => {
                  setCurrentView("tracklogs");
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  currentView === "tracklogs"
                    ? "bg-slate-100 text-slate-900 font-bold"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <span className="flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5" /> Verification Audit
                </span>
                <span className="text-[10px] font-mono text-slate-400">Live</span>
              </button>
            </div>

            {/* SECTION 5: DOCUMENTS & MEDIA */}
            {hasRole(["Super Admin", "Content Admin"]) && (
              <div className="space-y-1">
                <div className="px-3 text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400">
                  Media Vault
                </div>
                <button
                  onClick={() => {
                    setCurrentView("documents");
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                    currentView === "documents"
                      ? "bg-slate-100 text-slate-900 font-bold"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <FolderOpen className="w-3.5 h-3.5" /> Media Library
                  </span>
                  <span className="text-[10px] font-mono bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded-md font-bold">
                    {mediaAssets.length}
                  </span>
                </button>
              </div>
            )}
          </div>

          {/* Micro Footer */}
          <div className="pt-3 border-t border-slate-100 text-[10px] text-slate-400 font-mono text-center">
            Supabase Synchronized • v3.0
          </div>
        </aside>

        {/* MAIN CANVAS */}
        <main className="flex-grow max-w-full overflow-hidden">
          {/* 1. DASHBOARD OVERVIEW VIEW */}
          {currentView === "home" && (
            <div className="space-y-8">
              {/* Greeting Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
                <div>
                  <h1 className="text-2xl font-serif font-bold text-slate-900 tracking-tight">
                    Executive Dashboard
                  </h1>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">
                    Centralized Sovereign Content Management & Operational Directorate
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleRefreshData}
                    className="p-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 flex items-center gap-1.5 text-xs font-semibold"
                    title="Refresh Data"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
                    <span>Sync</span>
                  </button>
                </div>
              </div>

              {/* Metric Summary Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div
                  onClick={() => setCurrentView("articles")}
                  className="p-5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 shadow-sm space-y-1 cursor-pointer transition-all"
                >
                  <div className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-blue-600" /> Articles
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold font-mono text-slate-900">{articles.length}</div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    {articles.filter((a) => a.status === "Published").length} Live Published
                  </div>
                </div>

                <div
                  onClick={() => setCurrentView("tenders")}
                  className="p-5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 shadow-sm space-y-1 cursor-pointer transition-all"
                >
                  <div className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-emerald-600" /> Tenders
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold font-mono text-slate-900">{tenders.length}</div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    {tenders.filter((t) => t.status === "Active").length} Active Notices
                  </div>
                </div>

                <div
                  onClick={() => setCurrentView("careers")}
                  className="p-5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 shadow-sm space-y-1 cursor-pointer transition-all"
                >
                  <div className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-indigo-600" /> Positions
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold font-mono text-slate-900">{jobs.length}</div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    {jobs.filter((j) => j.status === "Active").length} Open Recruitment
                  </div>
                </div>

                <div
                  onClick={() => setCurrentView("forms")}
                  className="p-5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 shadow-sm space-y-1 cursor-pointer transition-all"
                >
                  <div className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-amber-600" /> Inquiries
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold font-mono text-slate-900">{inquiries.length}</div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    {inquiries.filter((i) => i.status === "New").length} New Submissions
                  </div>
                </div>
              </div>

              {/* Quick Create Action Bar */}
              <div className="p-6 rounded-3xl bg-slate-900 text-white space-y-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-300">
                    Quick Action Shortcuts
                  </h3>
                  <span className="text-[10px] font-mono text-slate-400">DATABASE SYNCHRONIZED</span>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  <button
                    onClick={() => {
                      setEditingItemId(undefined);
                      setCurrentView("article-new");
                    }}
                    className="px-4 py-2 rounded-xl bg-white text-slate-950 text-xs font-bold hover:bg-slate-100 transition-all flex items-center gap-1.5 shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5" /> Write Article
                  </button>

                  <button
                    onClick={() => {
                      setEditingItemId(undefined);
                      setCurrentView("tender-new");
                    }}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" /> Create Tender
                  </button>

                  <button
                    onClick={() => {
                      setEditingItemId(undefined);
                      setCurrentView("career-new");
                    }}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" /> Post Job
                  </button>

                  <button
                    onClick={() => {
                      setEditingItemId(undefined);
                      setCurrentView("news-new");
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-white hover:bg-slate-700 text-xs font-semibold transition-all flex items-center gap-1.5 border border-slate-700"
                  >
                    <Plus className="w-3.5 h-3.5" /> Publish News
                  </button>

                  <button
                    onClick={() => setShowMediaModal(true)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-white hover:bg-slate-700 text-xs font-semibold transition-all flex items-center gap-1.5 border border-slate-700"
                  >
                    <Layers className="w-3.5 h-3.5" /> Media Vault
                  </button>
                </div>
              </div>

              {/* Two Column Grid: Recent Articles & Recent Inquiries */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Articles */}
                <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                      Recent Articles
                    </h3>
                    <button
                      onClick={() => setCurrentView("articles")}
                      className="text-xs text-blue-600 hover:underline font-semibold"
                    >
                      View All ({articles.length}) →
                    </button>
                  </div>

                  <div className="space-y-3">
                    {articles.slice(0, 4).map((art) => (
                      <div
                        key={art.id}
                        className="p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200/60 transition-all flex items-center justify-between"
                      >
                        <div className="space-y-1 max-w-[70%]">
                          <span className="text-[10px] font-mono font-bold uppercase text-slate-500">
                            {art.category} • {art.publicationDate}
                          </span>
                          <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{art.title}</h4>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Link
                            to={`/articles/${art.slug}`}
                            target="_blank"
                            className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-black"
                            title="View Live"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                          <button
                            onClick={() => {
                              setEditingItemId(art.id);
                              setCurrentView("article-edit");
                            }}
                            className="px-2.5 py-1 rounded-lg bg-slate-900 text-white text-[11px] font-semibold"
                          >
                            Edit
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Inquiries */}
                <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                      Recent Inquiries
                    </h3>
                    <button
                      onClick={() => setCurrentView("forms")}
                      className="text-xs text-blue-600 hover:underline font-semibold"
                    >
                      Inquiries Desk ({inquiries.length}) →
                    </button>
                  </div>

                  <div className="space-y-3">
                    {inquiries.length === 0 ? (
                      <div className="py-8 text-center space-y-2 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="text-xs font-bold text-slate-800">No Submissions Yet</div>
                        <p className="text-[11px] text-slate-400 max-w-xs mx-auto">
                          New contact form submissions will appear here in real-time.
                        </p>
                      </div>
                    ) : (
                      inquiries.slice(0, 4).map((inq) => (
                        <div
                          key={inq.id}
                          onClick={() => setCurrentView("forms")}
                          className="p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200/60 transition-all cursor-pointer flex items-center justify-between"
                        >
                          <div className="space-y-0.5 max-w-[70%]">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-slate-900">{inq.fullName}</span>
                              <span className="text-[10px] font-mono text-slate-400">({inq.id})</span>
                            </div>
                            <p className="text-[11px] text-slate-500 line-clamp-1">{inq.subject}</p>
                          </div>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase ${
                              inq.status === "New" ? "bg-slate-900 text-white" : "bg-slate-200 text-slate-700"
                            }`}
                          >
                            {inq.status}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. ARTICLES MANAGEMENT VIEW */}
          {currentView === "articles" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Articles Management</h2>
                  <p className="text-xs text-slate-500 font-mono">
                    Official Corporate Publications & Sovereign Editorial Insights
                  </p>
                </div>
                <button
                  onClick={() => {
                    setEditingItemId(undefined);
                    setCurrentView("article-new");
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Write Article</span>
                </button>
              </div>

              {/* Search & Filter Controls */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-grow">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search articles by title, author, or category..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 focus:outline-none"
                >
                  <option value="all">All Statuses</option>
                  <option value="Published">Published</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>

              {/* Articles Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredArticles.map((art) => (
                  <div
                    key={art.id}
                    className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-slate-100 text-slate-700">
                          {art.category}
                        </span>
                        <span className="text-[11px] text-slate-400 font-mono">{art.publicationDate}</span>
                      </div>
                      <h4 className="text-base font-bold text-slate-900 leading-snug">{art.title}</h4>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{art.excerpt}</p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleToggleArticleStatus(art.id, art.status)}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase transition-all flex items-center gap-1 ${
                            art.status === "Published"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
                              : "bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100"
                          }`}
                          title="Click to toggle status"
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${art.status === "Published" ? "bg-emerald-500" : "bg-amber-500"}`} />
                          {art.status}
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <Link
                          to={`/articles/${art.slug}`}
                          target="_blank"
                          className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1"
                        >
                          <span>View</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                        <button
                          onClick={() => {
                            setEditingItemId(art.id);
                            setCurrentView("article-edit");
                          }}
                          className="px-3.5 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteArticle(art.id, art.title)}
                          className="p-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                          title="Delete Article"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. ARTICLE CREATE / EDIT FORM */}
          {(currentView === "article-new" || currentView === "article-edit") && (
            <ArticleEditor
              articleId={editingItemId}
              onSaveSuccess={() => {
                handleRefreshData();
                setCurrentView("articles");
              }}
              onCancel={() => setCurrentView("articles")}
            />
          )}

          {/* 4. NEWS LIST VIEW */}
          {currentView === "news" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">News & Updates</h2>
                  <p className="text-xs text-slate-500 font-mono">
                    Press Releases, Strategic Updates & Regulatory Notices
                  </p>
                </div>
                <button
                  onClick={() => {
                    setEditingItemId(undefined);
                    setCurrentView("news-new");
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Publish News</span>
                </button>
              </div>

              {/* News Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredNews.map((n) => (
                  <div
                    key={n.id}
                    className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-slate-100 text-slate-700">
                          {n.category}
                        </span>
                        <span className="text-[11px] text-slate-400 font-mono">{n.date}</span>
                      </div>
                      <h4 className="text-base font-bold text-slate-900 leading-snug">{n.title}</h4>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{n.excerpt}</p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <button
                        onClick={() => handleToggleNewsStatus(n.id, n.status)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase transition-all flex items-center gap-1 ${
                          n.status === "Published"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
                            : "bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100"
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${n.status === "Published" ? "bg-emerald-500" : "bg-amber-500"}`} />
                        {n.status}
                      </button>

                      <div className="flex items-center gap-2">
                        <Link
                          to={`/news/${n.slug}`}
                          target="_blank"
                          className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1"
                        >
                          <span>View</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                        <button
                          onClick={() => {
                            setEditingItemId(n.id);
                            setCurrentView("news-edit");
                          }}
                          className="px-3.5 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-semibold"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteNews(n.id, n.title)}
                          className="p-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                          title="Delete News Dispatch"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. NEWS CREATE / EDIT FORM */}
          {(currentView === "news-new" || currentView === "news-edit") && (
            <NewsEditor
              newsId={editingItemId}
              onSaveSuccess={() => {
                handleRefreshData();
                setCurrentView("news");
              }}
              onCancel={() => setCurrentView("news")}
            />
          )}

          {/* 6. TENDERS MANAGEMENT VIEW */}
          {currentView === "tenders" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Tenders & Procurement</h2>
                  <p className="text-xs text-slate-500 font-mono">
                    Zero-Fee Statutory Notices & National Competitive Bidding
                  </p>
                </div>
                <button
                  onClick={() => {
                    setEditingItemId(undefined);
                    setCurrentView("tender-new");
                  }}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Create Tender</span>
                </button>
              </div>

              {/* Search & Filter Controls */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-grow">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search tenders by title, NIT number, or issuing subsidiary..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 focus:outline-none"
                >
                  <option value="all">All Statuses</option>
                  <option value="Active">Active</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              {/* Tenders Table */}
              <div className="rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-sm">
                <table className="w-full text-left text-xs text-slate-800">
                  <thead className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    <tr>
                      <th className="p-4">Tender ID</th>
                      <th className="p-4">Title & Subsidiary</th>
                      <th className="p-4">Estimated Value</th>
                      <th className="p-4">Closing Date</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredTenders.map((t) => (
                      <tr key={t.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-4 font-mono font-bold text-slate-900">{t.id}</td>
                        <td className="p-4">
                          <div className="font-bold text-slate-900">{t.title}</div>
                          <div className="text-[11px] text-slate-500">{t.department}</div>
                        </td>
                        <td className="p-4 font-bold text-slate-900">{t.estimatedValue}</td>
                        <td className="p-4 font-mono text-slate-500">{t.closingDate}</td>
                        <td className="p-4">
                          <button
                            onClick={() => handleToggleTenderStatus(t.id, t.status)}
                            className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase transition-all flex items-center gap-1 ${
                              t.status === "Active"
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
                                : "bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200"
                            }`}
                            title="Click to toggle status"
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${t.status === "Active" ? "bg-emerald-500" : "bg-slate-400"}`} />
                            {t.status}
                          </button>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <Link
                              to={`/tenders/${t.slug || t.id}`}
                              target="_blank"
                              className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700"
                              title="View Live Notice"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </Link>
                            <button
                              onClick={() => {
                                setEditingItemId(t.id);
                                setCurrentView("tender-edit");
                              }}
                              className="px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-semibold"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteTender(t.id, t.title)}
                              className="p-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                              title="Delete Tender"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 7. TENDER CREATE / EDIT FORM */}
          {(currentView === "tender-new" || currentView === "tender-edit") && (
            <TenderEditor
              tenderId={editingItemId}
              onSaveSuccess={() => {
                handleRefreshData();
                setCurrentView("tenders");
              }}
              onCancel={() => setCurrentView("tenders")}
            />
          )}

          {/* 8. CAREERS / JOBS LIST VIEW */}
          {currentView === "careers" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Career Opportunities</h2>
                  <p className="text-xs text-slate-500 font-mono">
                    Talent Acquisition Pipeline & Sovereign Recruitment Postings
                  </p>
                </div>
                <button
                  onClick={() => {
                    setEditingItemId(undefined);
                    setCurrentView("career-new");
                  }}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Post Job</span>
                </button>
              </div>

              {/* Jobs Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredJobs.map((j) => (
                  <div
                    key={j.id}
                    className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                        <span>{j.id}</span>
                        <span>Deadline: {j.closingDate}</span>
                      </div>
                      <h4 className="text-base font-bold text-slate-900">{j.title}</h4>
                      <p className="text-xs text-slate-500 font-medium">{j.vertical} • {j.location}</p>
                      <div className="flex flex-wrap gap-1 pt-1">
                        {j.skills?.slice(0, 3).map((s) => (
                          <span key={s} className="px-2 py-0.5 rounded-full bg-slate-100 text-[10px] text-slate-700">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <button
                        onClick={() => handleToggleJobStatus(j.id, j.status)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase transition-all flex items-center gap-1 ${
                          j.status === "Active"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
                            : "bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200"
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${j.status === "Active" ? "bg-emerald-500" : "bg-slate-400"}`} />
                        {j.status}
                      </button>

                      <div className="flex items-center gap-2">
                        <Link
                          to="/careers"
                          target="_blank"
                          className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1"
                        >
                          <span>View</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                        <button
                          onClick={() => {
                            setEditingItemId(j.id);
                            setCurrentView("career-edit");
                          }}
                          className="px-3.5 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-semibold"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteJob(j.id, j.title)}
                          className="p-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                          title="Delete Job Opening"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 9. CAREER CREATE / EDIT FORM */}
          {(currentView === "career-new" || currentView === "career-edit") && (
            <CareerEditor
              jobId={editingItemId}
              onSaveSuccess={() => {
                handleRefreshData();
                setCurrentView("careers");
              }}
              onCancel={() => setCurrentView("careers")}
            />
          )}

          {/* 10. FORMS, BIDS & VERIFICATION */}
          {currentView === "projects" && <ProjectManager />}
          {currentView === "forms" && <FormsManager initialTab="enquiries" />}
          {currentView === "tender-applications" && <FormsManager initialTab="tenders" />}
          {currentView === "registered-organizations" && <FormsManager initialTab="vendors" />}
          {currentView === "applications" && <FormsManager initialTab="careers" />}
          {currentView === "tracklogs" && <FormsManager initialTab="tracklogs" />}

          {/* 11. MEDIA LIBRARY */}
          {currentView === "documents" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Media Library & Document Vault</h2>
                  <p className="text-xs text-slate-500 font-mono">
                    Reusable Photographic Assets, PDF Tender Documents & Governance Files
                  </p>
                </div>
                <button
                  onClick={() => setShowMediaModal(true)}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Open Media Manager</span>
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {mediaAssets.map((asset) => (
                  <div
                    key={asset.id}
                    className="p-3 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2"
                  >
                    <div className="aspect-video rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                      {asset.type === "image" ? (
                        <img src={asset.url} alt={asset.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs font-mono font-bold text-slate-400">
                          {asset.type.toUpperCase()}
                        </div>
                      )}
                    </div>
                    <h5 className="text-xs font-bold text-slate-900 truncate">{asset.title}</h5>
                    <span className="text-[10px] text-slate-400 font-mono block">{asset.fileSize} • {asset.uploadedAt}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Reusable Media Library Modal */}
      <MediaLibraryModal
        isOpen={showMediaModal}
        onClose={() => setShowMediaModal(false)}
        onSelectMedia={(asset) => {
          setShowMediaModal(false);
        }}
      />

      {/* Admin Profile Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="max-w-md w-full bg-white border border-slate-300 rounded-3xl shadow-2xl p-6 sm:p-8 relative">
            <button
              onClick={() => setShowProfileModal(false)}
              className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-slate-900 text-white font-bold text-2xl flex items-center justify-center mx-auto mb-3">
                {profile?.name ? profile.name.charAt(0).toUpperCase() : "A"}
              </div>
              <h3 className="text-lg font-bold text-slate-900">{profile?.name || "Subransu Mohanty"}</h3>
              <p className="text-xs text-blue-600 font-mono font-bold mt-0.5">
                {profile?.role || "Super Admin"}
              </p>
              <p className="text-xs text-slate-400 mt-0.5">{profile?.email || "admin@rashtrabharosagroup.com"}</p>
            </div>

            <div className="space-y-2.5 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200 mb-6">
              <div className="flex justify-between">
                <span className="text-slate-500">Designation:</span>
                <span className="font-semibold text-slate-900">{profile?.designation || "Executive Chairman & MD"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Department:</span>
                <span className="font-semibold text-slate-900">{profile?.department || "Directorate General"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Security:</span>
                <span className="font-mono text-emerald-700 font-bold">256-Bit SSL Encrypted</span>
              </div>
            </div>

            <div className="flex gap-2.5">
              <button
                onClick={() => setShowProfileModal(false)}
                className="flex-grow py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs"
              >
                Close
              </button>
              <button
                onClick={handleLogout}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
