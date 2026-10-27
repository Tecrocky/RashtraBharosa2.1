import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  FileText,
  Calendar,
  Download,
  ArrowRight,
  Share2,
  Building2,
  ExternalLink,
  Search,
  Tag,
  Clock,
  User,
  Check,
  ChevronRight,
  X,
  Printer,
  Globe,
  Newspaper,
  Layers,
  Sparkles,
  Shield,
  Copy,
  Mail,
  Phone,
  Send,
  CheckCircle2,
  FileCheck,
  Eye,
  Info,
  Lock,
  Unlock,
  KeyRound,
  BadgeCheck,
} from "lucide-react";
import logo from "@/assets/logo.png";
import officeVideo from "@/assets/VIDEOS/office.mp4";
import { supabase } from "@/lib/supabase";
import {
  initialMediaArticles,
  initialMediaCoverage,
  MediaArticle,
  MediaCoverageItem,
} from "@/data/mediaData";
import { ArticleItem } from "@/pages/admin/ArticleEditor";
import { dispatchConfirmationNotification } from "@/lib/trackingService";
import MetaTags from "@/components/MetaTags";

export interface BrandAccessUser {
  authId: string;
  name: string;
  email: string;
  phone: string;
  organization: string;
  purpose: string;
  authorizedAt: string;
}

const MediaCentre: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlTab = searchParams.get("tab");

  // Helper to convert ArticleItem to MediaArticle format
  const mapArticleItemToMedia = (item: ArticleItem): MediaArticle => ({
    id: item.id,
    slug: item.slug,
    title: item.title,
    category: (item.category as any) || "Corporate Updates",
    date: new Date(item.publicationDate).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
    readTime: "4 min read",
    author: item.author || "Executive Secretariat",
    department: item.relatedBusiness || "Rashtra Bharosa Group",
    excerpt: item.excerpt,
    content: [item.content],
    image:
      item.featuredImage ||
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    tags: item.tags || ["Corporate", "Executive Announcement"],
    featured: item.status === "Published",
  });

  // Master Synchronized State (Strictly Supabase Cloud Driven)
  const [articles, setArticles] = useState<MediaArticle[]>([]);

  // Fetch Live Articles from Supabase on load
  useEffect(() => {
    const fetchCloudArticles = async () => {
      try {
        const { data, error } = await supabase
          .from("articles")
          .select("*")
          .eq("status", "Published")
          .order("created_at", { ascending: false });

        if (!error && Array.isArray(data)) {
          const cloudMapped: MediaArticle[] = data.map((d: any) => ({
            id: d.id,
            slug: d.slug,
            title: d.title,
            category: d.category || "Corporate Updates",
            date: new Date(d.publication_date || d.created_at).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }),
            readTime: "4 min read",
            author: d.author || "Executive Secretariat",
            department: d.related_business || "Rashtra Bharosa Group",
            excerpt: d.excerpt || "",
            content: [d.content || ""],
            image:
              d.featured_image ||
              "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&w=1200&q=80",
            tags: Array.isArray(d.tags) ? d.tags : ["Corporate"],
            featured: true,
          }));
          setArticles(cloudMapped);
          localStorage.setItem("rbg_media_articles", JSON.stringify(cloudMapped));
        }
      } catch (err) {
        console.warn("Supabase fetch notice in MediaCentre:", err);
      }
    };
    fetchCloudArticles();

    // Listen to local storage changes when dashboard posts an article
    const handleStorage = () => {
      fetchCloudArticles();
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const [coverage] = useState<MediaCoverageItem[]>(() => {
    const saved = localStorage.getItem("rbg_media_coverage");
    if (saved !== null) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      } catch {
        // fallback
      }
    }
    return [];
  });

  // 3 Public Tabs (Photo Gallery completely removed)
  const [activeTab, setActiveTab] = useState<"articles" | "coverage" | "kit">(() => {
    if (urlTab === "coverage" || urlTab === "kit") return urlTab;
    return "articles";
  });

  useEffect(() => {
    if (urlTab && (urlTab === "articles" || urlTab === "coverage" || urlTab === "kit")) {
      setActiveTab(urlTab);
    }
  }, [urlTab]);

  const handleTabChange = (tab: "articles" | "coverage" | "kit") => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  // Article Filters
  const [articleCategory, setArticleCategory] = useState<string>("All");
  const [articleSearchQuery, setArticleSearchQuery] = useState<string>("");

  // Coverage Filters
  const [coverageSearchQuery, setCoverageSearchQuery] = useState<string>("");

  // Modals State
  const [selectedArticle, setSelectedArticle] = useState<MediaArticle | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [copiedBoilerplate, setCopiedBoilerplate] = useState(false);

  // BRAND ASSET AUTHORIZATION GATE STATE
  const [authorizedUser, setAuthorizedUser] = useState<BrandAccessUser | null>(() => {
    try {
      const saved = localStorage.getItem("rbg_brand_access_user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [authForm, setAuthForm] = useState({
    name: "",
    phone: "",
    email: "",
    organization: "",
    purpose: "Accredited Media & Press Publication",
    agreed: true,
  });
  const [authSubmitting, setAuthSubmitting] = useState(false);
  const [authSuccessNotice, setAuthSuccessNotice] = useState(false);

  // Media Kit Press Request Form State
  const [pressForm, setPressForm] = useState({
    name: "",
    designation: "",
    outlet: "",
    email: "",
    phone: "",
    purpose: "High-Resolution Vector Logo & Identity Kit",
    deadline: "",
    notes: "",
  });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSubmittedRef, setFormSubmittedRef] = useState<string | null>(null);

  // Copy Link Handler
  const handleCopyShareLink = (slug: string) => {
    const url = `${window.location.origin}/media?article=${slug}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const copyToClipboard = (text: string, type: "hex" | "boilerplate") => {
    navigator.clipboard.writeText(text);
    if (type === "hex") {
      setCopiedHex(text);
      setTimeout(() => setCopiedHex(null), 2000);
    } else {
      setCopiedBoilerplate(true);
      setTimeout(() => setCopiedBoilerplate(false), 2000);
    }
  };

  // Check URL for direct article parameter
  useEffect(() => {
    const articleSlug = searchParams.get("article");
    if (articleSlug) {
      const found = articles.find((a) => a.slug === articleSlug || a.id === articleSlug);
      if (found) {
        setSelectedArticle(found);
      }
    }
  }, [searchParams, articles]);

  // Log specific asset downloads for tracking audit
  const logAssetDownload = (assetName: string) => {
    if (!authorizedUser) return;
    try {
      const logs = JSON.parse(localStorage.getItem("rbg_brand_downloads_audit") || "[]");
      const record = {
        id: `DL-${Date.now()}`,
        assetName,
        user: authorizedUser,
        timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      };
      logs.unshift(record);
      localStorage.setItem("rbg_brand_downloads_audit", JSON.stringify(logs.slice(0, 100)));
    } catch (e) {
      console.warn(e);
    }
  };

  // Submit Brand Authorization Form (Unlocks the vault)
  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authForm.name || !authForm.phone || !authForm.email) return;

    setAuthSubmitting(true);
    const timestamp = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });
    const authId = `RBG-AUTH-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newUser: BrandAccessUser = {
      authId,
      name: authForm.name,
      phone: authForm.phone,
      email: authForm.email,
      organization: authForm.organization || "Accredited Media Entity",
      purpose: authForm.purpose,
      authorizedAt: timestamp,
    };

    try {
      // 1. Save user to localStorage
      localStorage.setItem("rbg_brand_access_user", JSON.stringify(newUser));
      setAuthorizedUser(newUser);

      // 2. Save to group audit records
      const existingAuths = JSON.parse(localStorage.getItem("rbg_brand_access_records") || "[]");
      existingAuths.unshift(newUser);
      localStorage.setItem("rbg_brand_access_records", JSON.stringify(existingAuths));

      // 3. Dispatch official confirmation email with colourful logo & tracking pass
      await dispatchConfirmationNotification({
        to: newUser.email,
        recipientName: newUser.name,
        referenceId: authId,
        type: "public_inquiry",
        title: `Brand Guidelines & Logo Asset Authorization (${newUser.organization})`,
        organization: newUser.organization,
        phone: newUser.phone,
        metaDetails: {
          Purpose: newUser.purpose,
          PassID: authId,
          AccessTimestamp: timestamp,
          TermsAccepted: true,
        },
      });

      setAuthSuccessNotice(true);
      setTimeout(() => {
        setAuthSuccessNotice(false);
      }, 1500);
    } catch (err) {
      console.error("Brand access authorization error:", err);
      localStorage.setItem("rbg_brand_access_user", JSON.stringify(newUser));
      setAuthorizedUser(newUser);
    } finally {
      setAuthSubmitting(false);
    }
  };

  const handleSignOutUser = () => {
    localStorage.removeItem("rbg_brand_access_user");
    setAuthorizedUser(null);
  };

  // Direct download trigger with gatekeeping
  const triggerDownload = (fileUrl: string, fileName: string, assetTitle: string) => {
    if (!authorizedUser) return;
    logAssetDownload(assetTitle);
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Press Accreditation Submit Handler
  const handlePressFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pressForm.name || !pressForm.email || !pressForm.outlet) return;

    setFormSubmitting(true);
    const refId = `RBG-MED-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    try {
      // Direct Supabase Cloud DB insertion
      await supabase.from("inquiries").insert([{
        id: refId,
        full_name: pressForm.name,
        email: pressForm.email,
        phone: pressForm.phone,
        company_name: pressForm.outlet,
        designation: pressForm.designation,
        location: "Media Press Bureau",
        selected_company: "Rashtra Bharosa Group",
        selected_project: "Media & Press Kit Accreditation",
        reason: "Media / Press Request",
        subject: `Press Accreditation Request: ${pressForm.outlet} - ${pressForm.name}`,
        message: `Purpose: ${pressForm.purpose} | Deadline: ${pressForm.deadline || "N/A"} | Notes: ${pressForm.notes || "N/A"}`,
        status: "New",
        assigned_officer: "Corporate Communications",
      }]);

      await dispatchConfirmationNotification({
        to: pressForm.email,
        recipientName: pressForm.name,
        referenceId: refId,
        type: "public_inquiry",
        title: `Press Media Kit & Asset Accreditation (${pressForm.outlet})`,
        organization: pressForm.outlet,
        phone: pressForm.phone,
        metaDetails: {
          designation: pressForm.designation,
          purpose: pressForm.purpose,
          deadline: pressForm.deadline,
          notes: pressForm.notes,
        },
      });

      const existing = JSON.parse(localStorage.getItem("rbg_media_requests") || "[]");
      existing.unshift({
        id: refId,
        ...pressForm,
        submittedAt: new Date().toISOString(),
      });
      localStorage.setItem("rbg_media_requests", JSON.stringify(existing));

      setFormSubmittedRef(refId);
      setPressForm({
        name: "",
        designation: "",
        outlet: "",
        email: "",
        phone: "",
        purpose: "High-Resolution Vector Logo & Identity Kit",
        deadline: "",
        notes: "",
      });
    } catch (err) {
      console.error("Press accreditation submission error:", err);
    } finally {
      setFormSubmitting(false);
    }
  };

  // Filtered Articles
  const articleCategories = [
    "All",
    "Corporate Updates",
    "Press Releases",
    "Strategic Announcements",
    "Venture Milestones",
    "Industry Insights",
  ];

  const filteredArticles = articles.filter((a) => {
    const matchesCat = articleCategory === "All" || a.category === articleCategory;
    const q = articleSearchQuery.trim().toLowerCase();
    const matchesSearch =
      q === "" ||
      a.title.toLowerCase().includes(q) ||
      a.excerpt.toLowerCase().includes(q) ||
      a.tags.some((t) => t.toLowerCase().includes(q)) ||
      a.department.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  // Filtered Coverage
  const filteredCoverage = coverage.filter((c) => {
    const q = coverageSearchQuery.trim().toLowerCase();
    return (
      q === "" ||
      c.headline.toLowerCase().includes(q) ||
      c.source.toLowerCase().includes(q) ||
      c.summary.toLowerCase().includes(q) ||
      c.keyTopics.some((t) => t.toLowerCase().includes(q))
    );
  });

  const featuredArticle = articles.find((a) => a.featured) || articles[0];

  // Brand Colors Data
  const brandColors = [
    {
      name: "Sovereign Navy",
      hex: "#041633",
      rgb: "rgb(4, 22, 51)",
      role: "Primary Corporate Base, Dominant Backdrops, Headers",
      textColor: "text-white",
      bgClass: "bg-[#041633]",
      border: "border-slate-800",
    },
    {
      name: "Regal Trust Gold",
      hex: "#F2B72B",
      rgb: "rgb(242, 183, 43)",
      role: "Strategic Accent, Badges, Highlights, Sovereign Crest",
      textColor: "text-slate-950",
      bgClass: "bg-[#F2B72B]",
      border: "border-amber-400",
    },
    {
      name: "Deep Obsidian",
      hex: "#030914",
      rgb: "rgb(3, 9, 20)",
      role: "High-Contrast Backgrounds, Dark Surfaces, Grounding",
      textColor: "text-white",
      bgClass: "bg-[#030914]",
      border: "border-slate-900",
    },
    {
      name: "Pure White",
      hex: "#FFFFFF",
      rgb: "rgb(255, 255, 255)",
      role: "Editorial Canvas, High Readability Panels, Clearspace",
      textColor: "text-slate-900",
      bgClass: "bg-white",
      border: "border-slate-300",
    },
    {
      name: "Slate Neutral",
      hex: "#64748B",
      rgb: "rgb(100, 116, 139)",
      role: "Secondary Metadata, Borders, Captions, Muted Texts",
      textColor: "text-white",
      bgClass: "bg-[#64748B]",
      border: "border-slate-400",
    },
  ];

  // Official Logo Assets for Download
  const logoAssets = [
    {
      id: "master-color",
      title: "Master Full Colour Crest",
      description: "Primary official conglomerate emblem for white and light backgrounds.",
      fileUrl: "/colour-logo.png",
      fileName: "Rashtra_Bharosa_Group_Colour_Logo.png",
      previewBg: "bg-white",
      specs: "Ultra High-Res PNG • 300 DPI • Transparent Alpha",
      tag: "Official Primary",
    },
    {
      id: "pure-white",
      title: "Pure White Sovereign Emblem",
      description: "Reversed mark for dark obsidian, deep navy, and full-bleed image backgrounds.",
      fileUrl: "/white-logo.png",
      fileName: "Rashtra_Bharosa_Group_White_Logo.png",
      previewBg: "bg-[#041633]",
      specs: "Ultra High-Res PNG • 300 DPI • Transparent Alpha",
      tag: "Reversed Dark",
    },
    {
      id: "solid-black",
      title: "Monochrome Black Crest",
      description: "High-contrast monochrome treatment for print, newspaper, and statutory notices.",
      fileUrl: "/black-logo.png",
      fileName: "Rashtra_Bharosa_Group_Black_Logo.png",
      previewBg: "bg-slate-100",
      specs: "Ultra High-Res PNG • 300 DPI • Monochrome",
      tag: "Print & Statutory",
    },
    {
      id: "primary-mark",
      title: "Vector Digital Mark",
      description: "Standard web-optimized transparent mark for digital applications and UI embeds.",
      fileUrl: "/logo.png",
      fileName: "Rashtra_Bharosa_Group_Mark.png",
      previewBg: "bg-slate-900",
      specs: "Optimized PNG • Vector-Scaled • Web Alpha",
      tag: "Digital / UI",
    },
  ];

  // Standard Boilerplate
  const corporateBoilerplate =
    "Rashtra Bharosa Group Limited is a sovereign Indian multi-sector conglomerate operating across heavy infrastructure & EPC, super-specialty healthcare, aerospace & mining robotics, high-yield organic agritech, and institutional capital. Rooted in uncompromising governance, zero speculative debt, and national self-reliance, the Group builds enduring institutional assets that empower communities and propel Bharat's sovereign industrial landscape.";

  return (
    <div className="min-h-screen bg-[#FDFEFE] text-slate-900 font-sans pb-32 selection:bg-[#F2B72B]/30 selection:text-[#0F172A]">
      <MetaTags
        title="Media Centre & Official Brand Asset Vault | Rashtra Bharosa Group"
        description="Official press announcements, corporate dispatches, verified vector brand logos, typography standards, and accredited media kit."
        keywords="Media Centre, Press Releases, Brand Kit, Logo Download, Corporate News Rashtra Bharosa Group"
        url="https://www.rashtrabharosagroup.com/media"
        schema={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Corporate Media Centre & Brand Directorate",
          "description": "Official dispatches, external coverage, and media assets.",
          "publisher": {
            "@type": "Organization",
            "name": "Rashtra Bharosa Group"
          }
        }}
      />

      {/* 1. Grand Executive Hero Banner with Indian Media & Press Centre Backdrop */}
      <section className="relative pt-36 sm:pt-44 pb-12 lg:pt-48 lg:pb-16 overflow-hidden flex items-end min-h-[420px] lg:min-h-[460px] bg-[#041633]">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1575507479993-7bb702d5e966?auto=format&fit=crop&w=2000&q=80"
            alt="Indian Corporate Press & Media Conference"
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
                  Corporate Media & Press Directorate
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-white leading-tight">
                Media Centre & <strong className="font-bold">Brand Hub</strong>
              </h1>
              <p className="text-sm sm:text-base font-medium text-slate-200 tracking-wide max-w-3xl">
                Official corporate dispatches, external press features, sovereign brand guidelines, and high-resolution downloadable media assets.
              </p>
            </div>

            {/* Header Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                onClick={() => handleTabChange("articles")}
                className={`px-5 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === "articles"
                    ? "bg-[#f2b72b] text-[#030914] shadow-md"
                    : "bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md"
                }`}
              >
                Official Dispatches
              </button>
              <button
                onClick={() => handleTabChange("coverage")}
                className={`px-5 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === "coverage"
                    ? "bg-[#f2b72b] text-[#030914] shadow-md"
                    : "bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md"
                }`}
              >
                In The News
              </button>
              <button
                onClick={() => handleTabChange("kit")}
                className={`px-5 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === "kit"
                    ? "bg-[#f2b72b] text-[#030914] shadow-md"
                    : "bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md"
                }`}
              >
                <Download className="w-3.5 h-3.5" />
                Brand Assets & Media Kit
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
              onClick={() => handleTabChange("articles")}
              className={`py-3.5 font-bold transition-all cursor-pointer border-b-2 -mb-px whitespace-nowrap uppercase tracking-wider flex items-center gap-1.5 ${
                activeTab === "articles"
                  ? "border-[#062B63] text-[#062B63]"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              Articles & Announcements ({articles.length})
            </button>

            <button
              onClick={() => handleTabChange("coverage")}
              className={`py-3.5 font-bold transition-all cursor-pointer border-b-2 -mb-px whitespace-nowrap uppercase tracking-wider flex items-center gap-1.5 ${
                activeTab === "coverage"
                  ? "border-[#062B63] text-[#062B63]"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              <Newspaper className="w-3.5 h-3.5" />
              In The News & External Coverage ({coverage.length})
            </button>

            <button
              onClick={() => handleTabChange("kit")}
              className={`py-3.5 font-bold transition-all cursor-pointer border-b-2 -mb-px whitespace-nowrap uppercase tracking-wider flex items-center gap-1.5 ${
                activeTab === "kit"
                  ? "border-[#062B63] text-[#062B63]"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              <Download className="w-3.5 h-3.5 text-[#f2b72b]" />
              Brand Guidelines & Media Kit
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-12 mt-8">
        {/* ========================================================
            TAB 1: ARTICLES & ANNOUNCEMENTS
            ======================================================== */}
        {activeTab === "articles" && (
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 md:pb-0">
                {articleCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setArticleCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      articleCategory === cat
                        ? "bg-[#062B63] text-white shadow-xs"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="relative w-full md:w-80 shrink-0">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search articles, topics or tags..."
                  value={articleSearchQuery}
                  onChange={(e) => setArticleSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#062B63]/20"
                />
              </div>
            </div>

            {/* Featured Article */}
            {articleCategory === "All" && !articleSearchQuery && featuredArticle && (
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                  <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-1 rounded bg-amber-50 text-amber-800 text-[11px] font-bold border border-amber-200 uppercase tracking-wider">
                          Featured Story
                        </span>
                        <span className="px-2.5 py-1 rounded bg-slate-100 text-slate-700 text-[11px] font-semibold">
                          {featuredArticle.category}
                        </span>
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {featuredArticle.date}
                        </span>
                      </div>

                      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-slate-900 leading-snug">
                        {featuredArticle.title}
                      </h2>

                      <p className="text-slate-600 text-sm leading-relaxed">
                        {featuredArticle.excerpt}
                      </p>

                      {featuredArticle.keyHighlights && (
                        <div className="pt-2 space-y-1.5 border-t border-slate-100">
                          {featuredArticle.keyHighlights.slice(0, 2).map((h, i) => (
                            <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                              <span className="text-[#D9961A] font-bold">•</span>
                              <span>{h}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div className="text-[11px] text-slate-400">
                        <span>
                          Issued by: <strong className="text-slate-700">{featuredArticle.department}</strong>
                        </span>
                      </div>
                      <button
                        onClick={() => setSelectedArticle(featuredArticle)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#062B63] hover:bg-[#041c40] text-white text-xs font-semibold cursor-pointer transition-colors"
                      >
                        Read Full Dossier <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="lg:col-span-5 relative min-h-[260px] lg:min-h-full bg-slate-900 overflow-hidden">
                    <img
                      src={featuredArticle.image}
                      alt={featuredArticle.title}
                      className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>
              </div>
            )}

            {/* Articles Box Pattern Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <div
                  key={article.id}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative h-48 bg-slate-100 overflow-hidden border-b border-slate-100">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                        <span className="px-2.5 py-0.5 rounded bg-white/95 backdrop-blur-md text-[#062B63] text-[10px] font-bold border border-slate-200 shadow-xs uppercase tracking-wider">
                          {article.category}
                        </span>
                      </div>
                      <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-white text-[10px] font-mono">
                        {article.readTime}
                      </div>
                    </div>

                    <div className="p-5 space-y-3">
                      <div className="flex items-center gap-2 text-[11px] text-slate-400">
                        <span className="flex items-center gap-1 font-medium">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          {article.date}
                        </span>
                        <span>•</span>
                        <span className="truncate">{article.department}</span>
                      </div>

                      <h3
                        onClick={() => setSelectedArticle(article)}
                        className="text-base font-bold text-slate-900 leading-snug group-hover:text-[#062B63] transition-colors cursor-pointer line-clamp-2"
                      >
                        {article.title}
                      </h3>

                      <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                        {article.excerpt}
                      </p>

                      <div className="flex flex-wrap gap-1 pt-1">
                        {article.tags.slice(0, 3).map((t, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] px-2 py-0.5 rounded bg-slate-50 text-slate-600 border border-slate-200"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-5 pt-0 border-t border-slate-100/60 mt-3 flex items-center justify-between">
                    <button
                      onClick={() => handleCopyShareLink(article.slug)}
                      className="p-1.5 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer text-xs flex items-center gap-1"
                      title="Share / Copy Link"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => setSelectedArticle(article)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#062B63] hover:underline cursor-pointer"
                    >
                      Read Article <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredArticles.length === 0 && (
              <div className="text-center py-20 bg-slate-50 rounded-2xl border border-slate-200 p-8 space-y-3 max-w-xl mx-auto">
                <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center mx-auto text-slate-400 shadow-2xs">
                  <FileText className="w-6 h-6 text-[#062B63]" />
                </div>
                <h4 className="text-base sm:text-lg font-bold text-slate-900">No Articles or Media Dispatches</h4>
                <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                  Official press releases, media publications, and corporate disclosures published by the Executive Board will appear here.
                </p>
              </div>
            )}
          </div>
        )}

        {/* ========================================================
            TAB 2: IN THE NEWS & EXTERNAL MEDIA COVERAGE
            ======================================================== */}
        {activeTab === "coverage" && (
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
              <div className="space-y-1">
                <h2 className="text-xl font-bold text-slate-900">
                  External Media & Press Coverage
                </h2>
                <p className="text-xs text-slate-500">
                  Independent analysis, industry coverage, and broadcast features reported on Rashtra Bharosa Group by leading news institutions.
                </p>
              </div>

              <div className="relative w-full md:w-80 shrink-0">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search news features or publications..."
                  value={coverageSearchQuery}
                  onChange={(e) => setCoverageSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#062B63]/20"
                />
              </div>
            </div>

            {/* Coverage Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCoverage.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-blue-700" />
                        <span className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                          {item.source}
                        </span>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                        {item.publicationType}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 leading-snug">
                      {item.headline}
                    </h3>

                    <div className="flex items-center gap-2 text-[11px] text-slate-400">
                      <span>By {item.author}</span>
                      <span>•</span>
                      <span>{item.date}</span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.summary}
                    </p>

                    <div className="flex flex-wrap gap-1 pt-1">
                      {item.keyTopics.map((top, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] px-2 py-0.5 rounded bg-slate-50 text-slate-600 border border-slate-200"
                        >
                          {top}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-slate-400 font-mono">{item.readTime}</span>
                    {item.externalUrl && (
                      <a
                        href={item.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-semibold text-[#062B63] hover:underline"
                      >
                        Read on {item.source} <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {filteredCoverage.length === 0 && (
              <div className="text-center py-16 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <Newspaper className="w-8 h-8 text-slate-400 mx-auto" />
                <h4 className="text-sm font-semibold text-slate-800">No coverage features found</h4>
                <p className="text-xs text-slate-500">Try adjusting search keywords.</p>
              </div>
            )}
          </div>
        )}

        {/* ========================================================
            TAB 3: BRAND GUIDELINES & OFFICIAL MEDIA KIT PORTAL
            ======================================================== */}
        {activeTab === "kit" && (
          <div className="space-y-10">

            {/* ========================================================
                CASE 1: USER IS NOT REGISTERED -> CLASSIC MINIMALIST REGISTRATION GATE
                ======================================================== */}
            {!authorizedUser ? (
              <div className="space-y-8">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="p-6 sm:p-8 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800">
                        <Lock className="w-4 h-4 text-[#041633]" /> Access Authorization Protocol
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                        Identity Registration & Usage Verification
                      </h3>
                      <p className="text-xs text-slate-500">
                        Please provide your accredited credentials below to access and download official high-resolution vector assets and brand specifications.
                      </p>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg shrink-0">
                      Audit Ref: RBG-AUTH-2026
                    </span>
                  </div>

                  <div className="p-6 sm:p-8 space-y-6">
                    {authSuccessNotice ? (
                      <div className="p-8 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-3">
                        <CheckCircle2 className="w-10 h-10 text-[#041633] mx-auto" />
                        <h4 className="text-base font-bold text-slate-900">
                          Credentials Verified. Unlocking Brand Vault...
                        </h4>
                        <p className="text-xs text-slate-500">
                          Your official access voucher and reference pass have been registered.
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleAuthSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                              Full Name *
                            </label>
                            <input
                              type="text"
                              required
                              value={authForm.name}
                              onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })}
                              placeholder="e.g., Alok Tripathy"
                              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#041633] focus:ring-1 focus:ring-[#041633]"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                              Contact Number *
                            </label>
                            <input
                              type="tel"
                              required
                              value={authForm.phone}
                              onChange={(e) => setAuthForm({ ...authForm, phone: e.target.value })}
                              placeholder="+91 98765 43210"
                              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#041633] focus:ring-1 focus:ring-[#041633]"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                              Official Work Email *
                            </label>
                            <input
                              type="email"
                              required
                              value={authForm.email}
                              onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
                              placeholder="e.g., editor@publication.com"
                              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#041633] focus:ring-1 focus:ring-[#041633]"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                              Media House / Organization Name *
                            </label>
                            <input
                              type="text"
                              required
                              value={authForm.organization}
                              onChange={(e) => setAuthForm({ ...authForm, organization: e.target.value })}
                              placeholder="e.g., The Economic Times / Financial Research Firm"
                              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#041633] focus:ring-1 focus:ring-[#041633]"
                            />
                          </div>

                          <div className="space-y-1.5 sm:col-span-2">
                            <label className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                              Primary Purpose of Asset Utilization *
                            </label>
                            <select
                              value={authForm.purpose}
                              onChange={(e) => setAuthForm({ ...authForm, purpose: e.target.value })}
                              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white text-xs text-slate-900 focus:outline-none focus:border-[#041633] focus:ring-1 focus:ring-[#041633]"
                            >
                              <option value="Accredited Media & Press Publication">
                                Accredited Media & Press Publication
                              </option>
                              <option value="Academic & Financial Research Analysis">
                                Academic & Financial Research Analysis
                              </option>
                              <option value="Empanelled Vendor & Partner Co-Branding">
                                Empanelled Vendor & Partner Co-Branding
                              </option>
                              <option value="Broadcast & Documentary Production">
                                Broadcast & Documentary Production
                              </option>
                              <option value="Corporate Due Diligence & Reporting">
                                Corporate Due Diligence & Reporting
                              </option>
                            </select>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-slate-100">
                          <label className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer">
                            <input
                              type="checkbox"
                              required
                              checked={authForm.agreed}
                              onChange={(e) => setAuthForm({ ...authForm, agreed: e.target.checked })}
                              className="mt-0.5 rounded border-slate-300 text-[#041633] focus:ring-[#041633]"
                            />
                            <span>
                              I confirm adherence to the <strong>Rashtra Bharosa Group Brand Usage Standards</strong> (no distortion, color alterations, unauthorized commercial merchandising, or defamatory reproduction).
                            </span>
                          </label>
                        </div>

                        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <span className="text-[11px] text-slate-400 font-mono">
                            Encrypted under Group Media Governance Framework
                          </span>

                          <button
                            type="submit"
                            disabled={authSubmitting}
                            className="px-8 py-3 rounded-lg bg-[#041633] hover:bg-[#062B63] text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:opacity-50"
                          >
                            {authSubmitting ? (
                              "Verifying..."
                            ) : (
                              <>
                                <Unlock className="w-3.5 h-3.5 text-[#F2B72B]" /> Authenticate & Unlock Brand Vault
                              </>
                            )}
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              /* ========================================================
                  CASE 2: USER IS AUTHORIZED -> UNLOCKED BRAND VAULT
                  ======================================================== */
              <div className="space-y-12">
                {/* Active Authorized User Card */}
                <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#041633] text-[#F2B72B] flex items-center justify-center shrink-0">
                      <BadgeCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                          Authenticated Media User
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-200 text-slate-800 font-bold">
                          {authorizedUser.authId}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5">
                        {authorizedUser.name} • {authorizedUser.organization} ({authorizedUser.email}) — Vector Downloads Active
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleSignOutUser}
                    className="px-3.5 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-xs font-semibold cursor-pointer transition-colors shrink-0 shadow-xs"
                  >
                    Change Credentials
                  </button>
                </div>

                {/* 2. Official Logo Vault - High-Resolution Downloads */}
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200 pb-4">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                        <Layers className="w-5 h-5 text-[#041633]" /> Official Logo Suite & Vector Vault
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">
                        Verified master emblems in transparent alpha PNG format (300 DPI).
                      </p>
                    </div>
                    <span className="text-xs font-mono text-slate-400">Master Assets • 300 DPI</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {logoAssets.map((asset) => (
                      <div
                        key={asset.id}
                        className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                      >
                        <div>
                          <div
                            className={`h-48 ${asset.previewBg} p-6 flex items-center justify-center relative border-b border-slate-100 transition-transform`}
                          >
                            <img
                              src={asset.fileUrl}
                              alt={asset.title}
                              className="max-h-24 max-w-full object-contain filter drop-shadow-sm"
                            />
                            <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-black/50 text-white backdrop-blur-md">
                              {asset.tag}
                            </span>
                          </div>

                          <div className="p-5 space-y-2">
                            <h4 className="text-sm font-bold text-slate-900 leading-snug">{asset.title}</h4>
                            <p className="text-xs text-slate-500 leading-relaxed">{asset.description}</p>
                            <div className="pt-2 text-[10px] font-mono text-slate-400">{asset.specs}</div>
                          </div>
                        </div>

                        <div className="p-5 pt-0">
                          <button
                            onClick={() => triggerDownload(asset.fileUrl, asset.fileName, asset.title)}
                            className="w-full py-2.5 px-4 rounded-lg bg-[#041633] hover:bg-[#062B63] text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                          >
                            <Download className="w-3.5 h-3.5 text-[#F2B72B]" />
                            Download PNG
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Official Brand Colors & Tokens */}
                <div className="space-y-6">
                  <div className="border-b border-slate-200 pb-4">
                    <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-[#F2B72B]" /> Sovereign Color Palette & Design Tokens
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Standardized chromatic system ensuring consistency across editorial, print, and digital surfaces.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    {brandColors.map((color) => (
                      <div
                        key={color.name}
                        className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
                      >
                        <div>
                          <div
                            className={`h-24 ${color.bgClass} border-b ${color.border} flex items-end p-3`}
                          >
                            <span className={`text-xs font-mono font-bold ${color.textColor}`}>
                              {color.hex}
                            </span>
                          </div>
                          <div className="p-4 space-y-1.5">
                            <div className="flex items-center justify-between">
                              <h4 className="text-xs font-bold text-slate-900">{color.name}</h4>
                              <button
                                onClick={() => copyToClipboard(color.hex, "hex")}
                                className="p-1 text-slate-400 hover:text-slate-800 transition-colors"
                                title="Copy HEX Code"
                              >
                                {copiedHex === color.hex ? (
                                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                                ) : (
                                  <Copy className="w-3.5 h-3.5" />
                                )}
                              </button>
                            </div>
                            <p className="text-[11px] text-slate-500 leading-tight">{color.role}</p>
                            <p className="text-[10px] font-mono text-slate-400 pt-1">{color.rgb}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. Brand Guidelines, Typography & Boilerplate Specifications */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Typography & Clearspace Rules */}
                  <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
                    <div className="space-y-1 border-b border-slate-100 pb-4">
                      <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                        <FileText className="w-4 h-4 text-[#041633]" /> Typography & Clearspace Rules
                      </h3>
                      <p className="text-xs text-slate-500">
                        Mandatory standards for editorial integrity and brand reproduction.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                            Primary Sans-Serif
                          </span>
                          <span className="text-[10px] font-mono text-slate-500">Plus Jakarta Sans / Inter</span>
                        </div>
                        <p className="text-base font-medium text-slate-800 tracking-tight">
                          The Sovereign Voice of Nation Building
                        </p>
                        <p className="text-xs text-slate-500">
                          Used for all primary headings, executive communications, navigation, and body copy.
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                            Editorial Serif
                          </span>
                          <span className="text-[10px] font-mono text-slate-500">Playfair Display / Serif</span>
                        </div>
                        <p className="text-base font-serif italic text-slate-800">
                          "Rooted in Trust, Rising with Bharat"
                        </p>
                        <p className="text-xs text-slate-500">
                          Reserved for executive quotes, annual report covers, and heritage statements.
                        </p>
                      </div>

                      <div className="space-y-2 pt-2 text-xs text-slate-600">
                        <h5 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                          Clearspace & Usage Rules:
                        </h5>
                        <ul className="space-y-1.5 list-disc pl-4 text-slate-600">
                          <li>Maintain a minimum clearspace equal to 1X the height of the circular emblem.</li>
                          <li>Never stretch, distort, rotate, or alter the crest aspect ratio.</li>
                          <li>Minimum digital display height: 32px; Minimum print reproduction: 25mm.</li>
                          <li>Do not apply drop shadows, glows, or unapproved gradient fills.</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Standard Corporate Boilerplate */}
                  <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                        <div>
                          <h3 className="text-lg font-bold text-slate-900">Approved Media Boilerplate</h3>
                          <p className="text-xs text-slate-500 mt-0.5">
                            Standardized 100-word paragraph for accredited press releases.
                          </p>
                        </div>
                        <button
                          onClick={() => copyToClipboard(corporateBoilerplate, "boilerplate")}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
                        >
                          {copiedBoilerplate ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600" /> Copied
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" /> Copy Text
                            </>
                          )}
                        </button>
                      </div>

                      <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-750 leading-relaxed italic">
                        "{corporateBoilerplate}"
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-2">
                        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                          <span className="text-[10px] font-mono text-slate-400 uppercase">Headquarters</span>
                          <p className="text-xs font-bold text-slate-800 mt-0.5">Bhubaneswar & New Delhi</p>
                        </div>
                        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                          <span className="text-[10px] font-mono text-slate-400 uppercase">Structure</span>
                          <p className="text-xs font-bold text-slate-800 mt-0.5">Unlisted Sovereign Conglomerate</p>
                        </div>
                        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                          <span className="text-[10px] font-mono text-slate-400 uppercase">Key Verticals</span>
                          <p className="text-xs font-bold text-slate-800 mt-0.5">Infrastructure, Health, Tech, Agri</p>
                        </div>
                        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                          <span className="text-[10px] font-mono text-slate-400 uppercase">Media SLA</span>
                          <p className="text-xs font-bold text-slate-800 mt-0.5">24–48 Hours Turnaround</p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <span>Approved for National & International Publications</span>
                      <span className="font-mono text-[#041633] font-bold">Ver 2026.1</span>
                    </div>
                  </div>
                </div>

                {/* 5. Downloadable Corporate Factsheets & Guidelines Dossier */}
                <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                      <Download className="w-5 h-5 text-[#041633]" /> Downloadable Corporate Dossiers & Print Guides
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Instant printable documents and executive backgrounders for editorial research.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <div className="w-10 h-10 rounded-lg bg-slate-100 text-[#041633] flex items-center justify-center">
                          <FileCheck className="w-5 h-5" />
                        </div>
                        <h4 className="text-sm font-bold text-slate-900">Brand Identity Manual 2026</h4>
                        <p className="text-xs text-slate-500">
                          Complete PDF specification detailing logo clearspace, color formulas (RGB/HEX/CMYK), and signage standards.
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          logAssetDownload("Brand Identity Manual 2026 PDF");
                          const printWindow = window.open("", "_blank");
                          if (printWindow) {
                            printWindow.document.write(`
                              <html>
                                <head>
                                  <title>Rashtra Bharosa Group - Official Brand Guidelines 2026</title>
                                  <style>
                                    body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; padding: 40px; color: #041633; max-width: 800px; margin: auto; }
                                    h1 { font-size: 24px; border-bottom: 2px solid #041633; padding-bottom: 8px; }
                                    .color-box { display: inline-block; width: 120px; padding: 12px; margin: 8px; border-radius: 8px; border: 1px solid #ccc; font-size: 11px; }
                                    .gold { background: #F2B72B; color: #000; }
                                    .navy { background: #041633; color: #fff; }
                                    .obsidian { background: #030914; color: #fff; }
                                  </style>
                                </head>
                                <body>
                                  <h1>RASHTRA BHAROSA GROUP — OFFICIAL BRAND GUIDELINES 2026</h1>
                                  <p><strong>Corporate Secretariat & Brand Governance Desk</strong></p>
                                  <p>Authorized to: <strong>${authorizedUser.name}</strong> (${authorizedUser.organization})</p>
                                  <p>This document authorizes approved media usage of Rashtra Bharosa Group trademarks, color palettes, and corporate boilerplate.</p>
                                  <h3>1. Corporate Color Matrix</h3>
                                  <div class="color-box navy"><strong>Sovereign Navy</strong><br/>#041633</div>
                                  <div class="color-box gold"><strong>Regal Gold</strong><br/>#F2B72B</div>
                                  <div class="color-box obsidian"><strong>Deep Obsidian</strong><br/>#030914</div>
                                  <h3>2. Standard Media Boilerplate</h3>
                                  <p><em>"${corporateBoilerplate}"</em></p>
                                  <hr/>
                                  <p style="font-size: 11px; color: #666;">Rashtra Bharosa Group Limited • media@rashtrabharosagroup.com</p>
                                </body>
                              </html>
                            `);
                            printWindow.document.close();
                            printWindow.print();
                          }
                        }}
                        className="w-full py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Printer className="w-3.5 h-3.5 text-slate-600" /> Print / Save Brand Guide PDF
                      </button>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <div className="w-10 h-10 rounded-lg bg-slate-100 text-[#041633] flex items-center justify-center">
                          <Building2 className="w-5 h-5" />
                        </div>
                        <h4 className="text-sm font-bold text-slate-900">Corporate Factsheet & Profile</h4>
                        <p className="text-xs text-slate-500">
                          Summary factsheet highlighting sovereign business verticals, capital framework, and governance board.
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          logAssetDownload("Corporate Factsheet 2026 PDF");
                          const printWindow = window.open("", "_blank");
                          if (printWindow) {
                            printWindow.document.write(`
                              <html>
                                <head>
                                  <title>Rashtra Bharosa Group - Corporate Factsheet 2026</title>
                                  <style>
                                    body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; padding: 40px; color: #041633; max-width: 800px; margin: auto; }
                                    h1 { font-size: 24px; border-bottom: 2px solid #041633; padding-bottom: 8px; }
                                    table { width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 13px; }
                                    th, td { border: 1px solid #e2e8f0; padding: 10px; text-align: left; }
                                    th { background: #f8fafc; }
                                  </style>
                                </head>
                                <body>
                                  <h1>RASHTRA BHAROSA GROUP — CORPORATE FACTSHEET 2026</h1>
                                  <p><strong>Sovereign Multi-Sector Conglomerate</strong></p>
                                  <p>Authorized Recipient: <strong>${authorizedUser.name}</strong> (${authorizedUser.organization})</p>
                                  <table>
                                    <tr><th>Entity Name</th><td>Rashtra Bharosa Group Limited</td></tr>
                                    <tr><th>Core Philosophy</th><td>Rooted in Trust, Rising with Bharat</td></tr>
                                    <tr><th>Headquarters</th><td>Bhubaneswar, Odisha & New Delhi, India</td></tr>
                                    <tr><th>Primary Verticals</th><td>Heavy EPC, Tertiary Healthcare, Deep-Tech Robotics, Agritech & Sovereign Capital</td></tr>
                                    <tr><th>Key Operating Units</th><td>Innovex Construction, RashBhar Health Care, RashBhar Technology (RashtrAI & VED RI), RashBhar Soil & Soul</td></tr>
                                    <tr><th>Media Contact</th><td>media@rashtrabharosagroup.com</td></tr>
                                  </table>
                                  <hr style="margin-top: 24px;"/>
                                  <p style="font-size: 11px; color: #666;">Issued by Corporate Secretariat • Confidential & Proprietary</p>
                                </body>
                              </html>
                            `);
                            printWindow.document.close();
                            printWindow.print();
                          }
                        }}
                        className="w-full py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Printer className="w-3.5 h-3.5 text-slate-600" /> Print / Save Factsheet PDF
                      </button>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <div className="w-10 h-10 rounded-lg bg-slate-100 text-[#041633] flex items-center justify-center">
                          <User className="w-5 h-5" />
                        </div>
                        <h4 className="text-sm font-bold text-slate-900">Executive Leadership Dossier</h4>
                        <p className="text-xs text-slate-500">
                          Approved executive profiles, official designations, and verified leadership statements for publication.
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          logAssetDownload("Executive Leadership Dossier 2026 PDF");
                          const printWindow = window.open("", "_blank");
                          if (printWindow) {
                            printWindow.document.write(`
                              <html>
                                <head>
                                  <title>Rashtra Bharosa Group - Leadership Dossier 2026</title>
                                  <style>
                                    body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; padding: 40px; color: #041633; max-width: 800px; margin: auto; }
                                    h1 { font-size: 24px; border-bottom: 2px solid #041633; padding-bottom: 8px; }
                                    .lead-card { border: 1px solid #e2e8f0; padding: 16px; border-radius: 8px; margin-bottom: 16px; }
                                  </style>
                                </head>
                                <body>
                                  <h1>EXECUTIVE LEADERSHIP DOSSIER — 2026</h1>
                                  <p><strong>Rashtra Bharosa Group Executive Directorate</strong></p>
                                  <p>Authorized to: <strong>${authorizedUser.name}</strong></p>
                                  <div class="lead-card">
                                    <h3>Executive Board of Governors</h3>
                                    <p style="font-size: 13px;">Governing Group-wide capital deployment, sovereign ethics, and zero-debt infrastructure SPVs.</p>
                                  </div>
                                  <div class="lead-card">
                                    <h3>Medical Directorate — RashBhar Health Care</h3>
                                    <p style="font-size: 13px;">Leading the 500-bed super-specialty hospital complex and rural tele-ICU expansion in Eastern Bharat.</p>
                                  </div>
                                  <div class="lead-card">
                                    <h3>Deep-Tech & Robotics Architecture — RashtrAI & VED RI</h3>
                                    <p style="font-size: 13px;">Architecting air-gapped on-premise foundation models and heavy industrial tele-operation robotics.</p>
                                  </div>
                                  <hr/>
                                  <p style="font-size: 11px; color: #666;">Rashtra Bharosa Group Press Directorate</p>
                                </body>
                              </html>
                            `);
                            printWindow.document.close();
                            printWindow.print();
                          }
                        }}
                        className="w-full py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Printer className="w-3.5 h-3.5 text-slate-600" /> Print Leadership Dossier
                      </button>
                    </div>
                  </div>
                </div>

                {/* 6. Interactive Press Accreditation & Media Asset Request Form */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-8">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
                    <div className="space-y-1">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-slate-100 text-slate-800 border border-slate-200">
                        <Send className="w-3 h-3" /> Press Desk & Accreditation
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                        Specialized Media Asset & Interview Request
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500">
                        Submit customized interview inquiries, high-resolution broadcast asset requests, or documentary clearances.
                      </p>
                    </div>
                    <div className="text-right text-xs text-slate-400 shrink-0">
                      <span>Accredited Turnaround SLA</span>
                      <p className="font-bold text-slate-800">24 to 48 Hours</p>
                    </div>
                  </div>

                  {formSubmittedRef ? (
                    <div className="p-8 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-4 max-w-2xl mx-auto">
                      <CheckCircle2 className="w-12 h-12 text-[#041633] mx-auto" />
                      <div className="space-y-1">
                        <h4 className="text-lg font-bold text-slate-900">
                          Press Request Registered Successfully
                        </h4>
                        <p className="text-xs text-slate-600">
                          An official confirmation email containing your tracking credentials has been delivered to your email inbox.
                        </p>
                      </div>
                      <div className="p-3 bg-white rounded-lg border border-slate-200 font-mono text-xs text-slate-900 font-bold inline-block">
                        Reference ID: {formSubmittedRef}
                      </div>
                      <div className="pt-2">
                        <button
                          onClick={() => setFormSubmittedRef(null)}
                          className="px-5 py-2 rounded-lg bg-[#041633] hover:bg-[#062B63] text-white font-semibold text-xs cursor-pointer transition-colors"
                        >
                          Submit Another Press Request
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handlePressFormSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold uppercase tracking-wider text-slate-700">Full Name *</label>
                          <input
                            type="text"
                            required
                            value={pressForm.name}
                            onChange={(e) => setPressForm({ ...pressForm, name: e.target.value })}
                            placeholder="e.g., Alok Tripathy"
                            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#041633] focus:ring-1 focus:ring-[#041633]"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold uppercase tracking-wider text-slate-700">Designation / Role *</label>
                          <input
                            type="text"
                            required
                            value={pressForm.designation}
                            onChange={(e) => setPressForm({ ...pressForm, designation: e.target.value })}
                            placeholder="e.g., Senior Business Editor"
                            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#041633] focus:ring-1 focus:ring-[#041633]"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold uppercase tracking-wider text-slate-700">Media House / Publication *</label>
                          <input
                            type="text"
                            required
                            value={pressForm.outlet}
                            onChange={(e) => setPressForm({ ...pressForm, outlet: e.target.value })}
                            placeholder="e.g., The Economic Times / Financial Express"
                            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#041633] focus:ring-1 focus:ring-[#041633]"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold uppercase tracking-wider text-slate-700">Official Work Email *</label>
                          <input
                            type="email"
                            required
                            value={pressForm.email}
                            onChange={(e) => setPressForm({ ...pressForm, email: e.target.value })}
                            placeholder="e.g., editor@publication.com"
                            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#041633] focus:ring-1 focus:ring-[#041633]"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold uppercase tracking-wider text-slate-700">Contact Number</label>
                          <input
                            type="tel"
                            value={pressForm.phone}
                            onChange={(e) => setPressForm({ ...pressForm, phone: e.target.value })}
                            placeholder="+91 98765 43210"
                            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#041633] focus:ring-1 focus:ring-[#041633]"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold uppercase tracking-wider text-slate-700">Purpose of Request *</label>
                          <select
                            value={pressForm.purpose}
                            onChange={(e) => setPressForm({ ...pressForm, purpose: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white text-xs text-slate-900 focus:outline-none focus:border-[#041633] focus:ring-1 focus:ring-[#041633]"
                          >
                            <option value="High-Resolution Vector Logo & Identity Kit">
                              High-Resolution Vector Logo & Identity Kit
                            </option>
                            <option value="Executive Spokesperson Interview Clearance">
                              Executive Spokesperson Interview Clearance
                            </option>
                            <option value="Press Accreditation & Media Access">
                              Press Accreditation & Media Access
                            </option>
                            <option value="Fact-Checking & Editorial Verification">
                              Fact-Checking & Editorial Verification
                            </option>
                            <option value="Broadcast Video & Archival Clearance">
                              Broadcast Video & Archival Clearance
                            </option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                          Story Scope, Specific Questions & Deadlines
                        </label>
                        <textarea
                          rows={3}
                          value={pressForm.notes}
                          onChange={(e) => setPressForm({ ...pressForm, notes: e.target.value })}
                          placeholder="Please specify publication deadline, specific executive quotes required, or file formats..."
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#041633] focus:ring-1 focus:ring-[#041633]"
                        />
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                        <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                          <Info className="w-3.5 h-3.5 text-slate-500" />
                          <span>Submissions are audited under the Press Transparency Protocol.</span>
                        </div>

                        <button
                          type="submit"
                          disabled={formSubmitting}
                          className="px-6 py-3 rounded-lg bg-[#041633] hover:bg-[#062B63] text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:opacity-50"
                        >
                          {formSubmitting ? (
                            "Transmitting..."
                          ) : (
                            <>
                              <Send className="w-3.5 h-3.5 text-[#F2B72B]" />
                              Submit Press Request
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  )}
                </div>

                {/* 7. Central Spokesperson Desk & Direct Email */}
                <div className="p-6 sm:p-8 rounded-2xl bg-[#041633] text-white flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-md border border-slate-800">
                  <div className="space-y-1.5 max-w-2xl">
                    <div className="inline-flex items-center gap-1 text-[#F2B72B] font-mono text-xs font-bold uppercase tracking-wider">
                      <Mail className="w-3.5 h-3.5" /> Corporate Communications Desk
                    </div>
                    <h4 className="text-lg font-bold text-white">
                      Direct Press Liaison & Executive Spokesperson Bureau
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      For breaking news commentary, official press statements, and emergency corporate clearances, contact the central media secretariat directly.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
                    <a
                      href="mailto:media@rashtrabharosagroup.com"
                      className="px-5 py-2.5 rounded-lg bg-[#F2B72B] hover:bg-[#e0a620] text-[#030914] font-bold text-xs uppercase tracking-wider transition-all text-center"
                    >
                      media@rashtrabharosagroup.com
                    </a>
                    <Link
                      to="/contact"
                      className="px-5 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-xs tracking-wider uppercase transition-all text-center"
                    >
                      Full Contact Directory →
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ========================================================
          ARTICLE DETAIL READING MODAL / DRAWER
          ======================================================== */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[92vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded font-mono font-bold text-xs bg-slate-100 text-slate-800 border border-slate-200">
                  {selectedArticle.id}
                </span>
                <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                  {selectedArticle.category}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopyShareLink(selectedArticle.slug)}
                  className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                  title="Share Article Link"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => window.print()}
                  className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                  title="Print Press Release"
                >
                  <Printer className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-800 text-xs font-mono font-bold cursor-pointer"
                >
                  [CLOSE]
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 leading-snug">
                {selectedArticle.title}
              </h2>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-1.5 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>{selectedArticle.date}</span>
                </div>
                <div>•</div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{selectedArticle.readTime}</span>
                </div>
                <div>•</div>
                <div className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>
                    {selectedArticle.author} ({selectedArticle.department})
                  </span>
                </div>
              </div>
            </div>

            <div className="relative h-64 sm:h-80 rounded-xl overflow-hidden bg-slate-900">
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
              />
            </div>

            {selectedArticle.keyHighlights && selectedArticle.keyHighlights.length > 0 && (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Executive Key Highlights:
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {selectedArticle.keyHighlights.map((hl, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#D9961A] font-bold">•</span>
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="space-y-4 text-sm text-slate-750 leading-relaxed font-sans">
              {selectedArticle.content.map((p, idx) => {
                if (
                  typeof p === "string" &&
                  (p.includes("<p>") ||
                    p.includes("<h2>") ||
                    p.includes("<div") ||
                    p.includes("<h3") ||
                    p.includes("<br"))
                ) {
                  return (
                    <div
                      key={idx}
                      className="prose prose-slate max-w-none prose-headings:font-serif prose-headings:font-bold prose-headings:text-slate-900 prose-p:text-slate-700 prose-p:leading-relaxed prose-img:rounded-2xl"
                      dangerouslySetInnerHTML={{ __html: p }}
                    />
                  );
                }
                return <p key={idx}>{p}</p>;
              })}
            </div>

            {selectedArticle.officialQuote && (
              <div className="p-5 rounded-xl bg-[#041633] text-white border-l-4 border-l-[#f2b72b] space-y-2 shadow-sm">
                <p className="italic text-sm text-slate-200">
                  "{selectedArticle.officialQuote.text}"
                </p>
                <div className="text-xs font-semibold text-[#f2b72b] pt-1">
                  — {selectedArticle.officialQuote.speaker}, {selectedArticle.officialQuote.designation}
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-500 gap-3">
              <div>
                <span>
                  Official Distribution: <strong>Rashtra Bharosa Group Newsroom</strong>
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {selectedArticle.tags.map((t, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-mono">
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaCentre;
