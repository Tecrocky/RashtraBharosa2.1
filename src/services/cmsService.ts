import { supabase } from "@/lib/supabase";
import { initialArticlesData, ArticleItem } from "@/pages/admin/ArticleEditor";
import { initialNewsData, NewsItem } from "@/pages/admin/NewsEditor";
import { initialTenders, TenderNotice, SupplierProfile } from "@/data/tendersData";
import { initialJobOpenings, JobOpening } from "@/data/careersData";

// Safe slugifier
export const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

// Strip HTML tags for plain summaries
export const stripHtml = (html: string): string => {
  if (!html) return "";
  try {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  } catch {
    return html.replace(/<[^>]*>/g, "");
  }
};

/* =========================================================================
   1. ARTICLES SERVICE
   ========================================================================= */

export const getArticles = async (): Promise<ArticleItem[]> => {
  let cached: ArticleItem[] = [];
  try {
    const saved = localStorage.getItem("rbg_content_articles_full");
    if (saved) {
      cached = JSON.parse(saved);
    }
  } catch {}

  try {
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && Array.isArray(data)) {
      const mapped: ArticleItem[] = data.map((d: any) => ({
        id: d.id,
        title: d.title || "Untitled Article",
        slug: d.slug || generateSlug(d.title || d.id),
        excerpt: d.excerpt || stripHtml(d.content || d.body_html || "").slice(0, 160),
        author: d.author || "Executive Secretariat",
        category: d.category || "Corporate",
        featuredImage: d.featured_image || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
        featuredImageAlt: d.featured_image_alt || "",
        publicationDate: d.published_date || d.created_at?.split("T")[0] || new Date().toISOString().split("T")[0],
        relatedBusiness: d.related_business || "Rashtra Bharosa Group Limited",
        relatedProject: d.related_project || "General Group Initiative",
        tags: Array.isArray(d.tags) ? d.tags : ["Corporate", "Executive Announcement"],
        content: d.content || d.body_html || d.body || "",
        seoTitle: d.seo_title || d.title || "",
        seoDescription: d.seo_description || d.excerpt || "",
        status: (d.status as any) || "Published",
        views: d.views || 0,
        createdAt: d.created_at || new Date().toISOString(),
      }));

      localStorage.setItem("rbg_content_articles_full", JSON.stringify(mapped));
      return mapped;
    }
  } catch (err) {
    console.warn("Supabase getArticles error:", err);
  }

  return cached.length > 0 ? cached : initialArticlesData;
};

export const getArticleBySlug = async (slugOrId: string): Promise<ArticleItem | null> => {
  if (!slugOrId) return null;

  try {
    const saved = localStorage.getItem("rbg_content_articles_full");
    if (saved) {
      const list: ArticleItem[] = JSON.parse(saved);
      const found = list.find((a) => a.slug === slugOrId || a.id === slugOrId);
      if (found) return found;
    }
  } catch {}

  try {
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .or(`slug.eq.${slugOrId},id.eq.${slugOrId}`)
      .maybeSingle();

    if (!error && data) {
      return {
        id: data.id,
        title: data.title,
        slug: data.slug || slugOrId,
        excerpt: data.excerpt || "",
        author: data.author || "Executive Secretariat",
        category: data.category || "Corporate",
        featuredImage: data.featured_image || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
        featuredImageAlt: data.featured_image_alt || "",
        publicationDate: data.published_date || data.created_at?.split("T")[0] || "2026-10-01",
        relatedBusiness: data.related_business || "Rashtra Bharosa Group Limited",
        relatedProject: data.related_project || "General Group Initiative",
        tags: Array.isArray(data.tags) ? data.tags : ["Corporate"],
        content: data.content || data.body_html || data.body || "",
        seoTitle: data.seo_title || data.title,
        seoDescription: data.seo_description || data.excerpt || "",
        status: (data.status as any) || "Published",
        views: data.views || 0,
        createdAt: data.created_at || new Date().toISOString(),
      };
    }
  } catch (err) {
    console.warn("Supabase getArticleBySlug error:", err);
  }

  return null;
};

export const saveArticle = async (article: ArticleItem): Promise<{ success: boolean; data?: ArticleItem; error?: string }> => {
  try {
    const articleId = article.id || `ART-${Date.now()}`;
    const cleanSlug = article.slug.trim() || generateSlug(article.title);
    const pubDate = article.publicationDate || new Date().toISOString().split("T")[0];

    const record: ArticleItem = {
      ...article,
      id: articleId,
      slug: cleanSlug,
      publicationDate: pubDate,
      seoTitle: article.seoTitle || `${article.title} | Rashtra Bharosa Group`,
      seoDescription: article.seoDescription || article.excerpt || "",
    };

    // 1. Direct Cloud Upsert to Supabase FIRST
    const { error } = await supabase
      .from("articles")
      .upsert({
        id: record.id,
        title: record.title,
        slug: record.slug,
        excerpt: record.excerpt || record.title,
        author: record.author || "Subransu Mohanty",
        category: record.category || "Corporate",
        featured_image: record.featuredImage,
        featured_image_alt: record.featuredImageAlt,
        published_date: pubDate,
        body_html: record.content || `<p>${record.excerpt || record.title}</p>`,
        content: record.content || record.excerpt || record.title,
        related_business: record.relatedBusiness,
        related_project: record.relatedProject,
        tags: record.tags || ["Corporate"],
        seo_title: record.seoTitle,
        seo_description: record.seoDescription,
        status: record.status,
      });

    if (error) {
      console.error("Supabase saveArticle error:", error);
      return { success: false, error: error.message };
    }

    // 2. Update Local Cache on confirmed Cloud success
    try {
      const current = await getArticles();
      const idx = current.findIndex((a) => a.id === record.id || a.slug === record.slug);
      let updated: ArticleItem[];
      if (idx >= 0) {
        updated = [...current];
        updated[idx] = record;
      } else {
        updated = [record, ...current];
      }
      localStorage.setItem("rbg_content_articles_full", JSON.stringify(updated));
    } catch {}

    return { success: true, data: record };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to save article" };
  }
};

export const deleteArticle = async (id: string): Promise<{ success: boolean; error?: string }> => {
  try {
    // 1. Delete from Supabase FIRST
    const { error } = await supabase.from("articles").delete().eq("id", id);
    if (error) {
      console.error("Supabase deleteArticle error:", error);
      return { success: false, error: error.message };
    }

    // 2. Update Local Cache
    try {
      const current = await getArticles();
      const updated = current.filter((a) => a.id !== id);
      localStorage.setItem("rbg_content_articles_full", JSON.stringify(updated));
    } catch {}

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
};

export const toggleArticleStatus = async (id: string, newStatus: "Draft" | "Published" | "Archived"): Promise<boolean> => {
  try {
    const current = await getArticles();
    const item = current.find((a) => a.id === id);
    if (item) {
      item.status = newStatus;
      await saveArticle(item);
      return true;
    }
    return false;
  } catch {
    return false;
  }
};

/* =========================================================================
   2. TENDERS SERVICE
   ========================================================================= */

export const getTenders = async (): Promise<TenderNotice[]> => {
  let cached: TenderNotice[] = [];
  try {
    const saved = localStorage.getItem("rbg_tenders_data");
    if (saved) cached = JSON.parse(saved);
  } catch {}

  try {
    const { data, error } = await supabase
      .from("tenders")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && Array.isArray(data)) {
      const mapped: TenderNotice[] = data.map((d: any) => {
        let embedded: Partial<TenderNotice> = {};
        if (Array.isArray(d.documents) && d.documents[0] && typeof d.documents[0] === "object") {
          embedded = d.documents[0];
        } else if (d.documents && typeof d.documents === "object" && !Array.isArray(d.documents)) {
          embedded = d.documents;
        }

        const activeStatus = d.status === "Closed" ? "Closed" : "Active";

        return {
          id: d.tender_no || d.id || embedded.id || "RBG-NIT",
          slug: embedded.slug || d.slug || generateSlug(d.title || d.id),
          title: d.title || embedded.title || "Tender Notice",
          department: embedded.department || d.department || d.vertical || "Rashtra Bharosa Group",
          verticalCode: embedded.verticalCode || d.vertical || "INFRA-EPC",
          tenderType: embedded.tenderType || d.tender_type || "Open National Competitive Tender",
          category: embedded.category || d.category || "Heavy Civil & Construction",
          categoryFilter: embedded.categoryFilter || (embedded.category?.toLowerCase().includes("civil") ? "construction" : "mining"),
          estimatedValue: embedded.estimatedValue || d.estimated_value || "As per Detailed Project Report",
          emdAmount: embedded.emdAmount || d.emd_amount || "Nil / Exemption as per norms",
          emdExemptionAllowed: embedded.emdExemptionAllowed ?? true,
          tenderFee: embedded.tenderFee || d.tender_fee || "100% Free Open Access (₹0)",
          issueDate: embedded.issueDate || d.published_date || d.issue_date || new Date().toISOString().split("T")[0],
          closingDate: embedded.closingDate || d.closing_date || "2026-11-30",
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
          eligibilityCriteria: embedded.eligibilityCriteria || { technical: [], financial: [], statutory: [] },
          specifications: embedded.specifications || [],
          deliverables: embedded.deliverables || [],
          requiredDocuments: embedded.requiredDocuments || [],
          boqItems: embedded.boqItems || [],
        };
      });

      localStorage.setItem("rbg_tenders_data", JSON.stringify(mapped));
      return mapped;
    }
  } catch (err) {
    console.warn("Supabase getTenders error:", err);
  }

  return cached.length > 0 ? cached : initialTenders;
};

export const getTenderBySlug = async (slugOrId: string): Promise<TenderNotice | null> => {
  if (!slugOrId) return null;

  const clean = (s: string = "") => s.toLowerCase().replace(/[^a-z0-9]/g, "");
  const target = clean(slugOrId);

  try {
    const list = await getTenders();
    const found = list.find(
      (t) =>
        t.slug === slugOrId ||
        clean(t.slug) === target ||
        clean(t.id) === target ||
        t.id.toLowerCase() === slugOrId.toLowerCase()
    );
    if (found) return found;
  } catch {}

  try {
    const { data, error } = await supabase
      .from("tenders")
      .select("*")
      .or(`id.eq.${slugOrId},tender_no.eq.${slugOrId},slug.eq.${slugOrId}`)
      .maybeSingle();

    if (!error && data) {
      let embedded: Partial<TenderNotice> = {};
      if (Array.isArray(data.documents) && data.documents[0] && typeof data.documents[0] === "object") {
        embedded = data.documents[0];
      } else if (data.documents && typeof data.documents === "object" && !Array.isArray(data.documents)) {
        embedded = data.documents;
      }

      return {
        id: data.tender_no || data.id || embedded.id || slugOrId,
        slug: embedded.slug || data.slug || generateSlug(data.title || data.id),
        title: data.title || embedded.title || "",
        department: embedded.department || data.department || data.vertical || "Rashtra Bharosa Group",
        verticalCode: embedded.verticalCode || data.vertical || "INFRA-EPC",
        tenderType: embedded.tenderType || data.tender_type || "Open National Competitive Tender",
        category: embedded.category || data.category || "Heavy Civil & Construction",
        categoryFilter: embedded.categoryFilter || (embedded.category?.toLowerCase().includes("civil") ? "construction" : "mining"),
        estimatedValue: embedded.estimatedValue || data.estimated_value || "As per Detailed Project Report",
        emdAmount: embedded.emdAmount || data.emd_amount || "Nil / Exemption as per norms",
        emdExemptionAllowed: embedded.emdExemptionAllowed ?? true,
        tenderFee: embedded.tenderFee || data.tender_fee || "100% Free Open Access (₹0)",
        issueDate: embedded.issueDate || data.published_date || data.issue_date || "",
        closingDate: embedded.closingDate || data.closing_date || "",
        closingTime: embedded.closingTime || "17:00 IST",
        status: data.status === "Closed" ? "Closed" : "Active",
        location: embedded.location || data.location || "Odisha, India",
        state: embedded.state || data.state || "Odisha",
        documentSize: embedded.documentSize || data.document_size || "4.5 MB",
        procurementOfficer: embedded.procurementOfficer || "Chief Procurement Officer",
        procurementEmail: embedded.procurementEmail || "tenders@rashtrabharosagroup.com",
        contractPeriod: embedded.contractPeriod || "12 Months",
        bidValidityPeriod: embedded.bidValidityPeriod || "120 Days",
        scopeSummary: embedded.scopeSummary || data.scope_summary || data.title,
        eligibilityCriteria: embedded.eligibilityCriteria || { technical: [], financial: [], statutory: [] },
        specifications: embedded.specifications || [],
        deliverables: embedded.deliverables || [],
        requiredDocuments: embedded.requiredDocuments || [],
        boqItems: embedded.boqItems || [],
      };
    }
  } catch (err) {
    console.warn("Supabase getTenderBySlug error:", err);
  }

  return null;
};

export const saveTender = async (tender: TenderNotice): Promise<{ success: boolean; data?: TenderNotice; error?: string }> => {
  try {
    const finalSlug = tender.slug.trim() || generateSlug(tender.title);
    const pubDate = tender.issueDate || new Date().toISOString().split("T")[0];
    const closeDate = tender.closingDate || "2026-12-31";

    const record: TenderNotice = {
      ...tender,
      slug: finalSlug,
      issueDate: pubDate,
      closingDate: closeDate,
    };

    const cloudStatus = record.status === "Closed" ? "Closed" : "Live";
    
    // 1. Direct Cloud Upsert to Supabase FIRST
    const { error } = await supabase.from("tenders").upsert({
      id: record.id,
      tender_no: record.id,
      title: record.title,
      vertical: record.verticalCode || record.department || "INFRA-EPC",
      tender_fee: record.tenderFee || "Free",
      status: cloudStatus,
      published_date: pubDate,
      closing_date: closeDate,
      documents: [record],
    });

    if (error) {
      console.error("Supabase saveTender error:", error);
      return { success: false, error: error.message };
    }

    // 2. Update Local Cache on confirmed Cloud success
    try {
      const current = await getTenders();
      const idx = current.findIndex((t) => t.id === record.id || t.slug === record.slug);
      let updated: TenderNotice[];
      if (idx >= 0) {
        updated = [...current];
        updated[idx] = record;
      } else {
        updated = [record, ...current];
      }
      localStorage.setItem("rbg_tenders_data", JSON.stringify(updated));
    } catch {}

    return { success: true, data: record };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to save tender" };
  }
};

export const deleteTender = async (id: string): Promise<{ success: boolean; error?: string }> => {
  try {
    // 1. Delete from Supabase FIRST
    const { error } = await supabase.from("tenders").delete().eq("id", id);
    if (error) {
      console.error("Supabase deleteTender error:", error);
      return { success: false, error: error.message };
    }

    // 2. Update Local Cache
    try {
      const current = await getTenders();
      const updated = current.filter((t) => t.id !== id);
      localStorage.setItem("rbg_tenders_data", JSON.stringify(updated));

      // Also clean up any broadcast notifications referencing this tender or test title
      const notifsRaw = localStorage.getItem("rbg_tender_notifications");
      if (notifsRaw) {
        const notifs = JSON.parse(notifsRaw);
        if (Array.isArray(notifs)) {
          const filteredNotifs = notifs.filter((n: any) => n.tenderRef !== id && !n.id.includes(id));
          localStorage.setItem("rbg_tender_notifications", JSON.stringify(filteredNotifs));
        }
      }
    } catch {}

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
};

export const toggleTenderStatus = async (id: string, newStatus: "Active" | "Closed"): Promise<boolean> => {
  try {
    const current = await getTenders();
    const item = current.find((t) => t.id === id);
    if (item) {
      item.status = newStatus;
      await saveTender(item);
      return true;
    }
    return false;
  } catch {
    return false;
  }
};

/* =========================================================================
   3. CAREERS / JOBS SERVICE
   ========================================================================= */

export const getJobs = async (): Promise<JobOpening[]> => {
  let cached: JobOpening[] = [];
  try {
    const saved = localStorage.getItem("rbg_careers_jobs");
    if (saved) cached = JSON.parse(saved);
  } catch {}

  try {
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && Array.isArray(data)) {
      const mapped: JobOpening[] = data.map((d: any) => ({
        id: d.id,
        jobCode: d.job_code || d.id,
        title: d.title || "Position",
        vertical: d.vertical || "Mining & Infrastructure",
        department: d.department || d.vertical || "Operations",
        location: d.location || "Bhubaneswar, Odisha",
        type: d.employment_type || d.job_type || d.type || "Full-Time",
        workplaceType: d.workplace_type || "On-Site",
        experience: d.experience_level || d.experience || "5–8 Years",
        openings: d.openings || 1,
        description: d.description || d.title,
        responsibilities: Array.isArray(d.responsibilities) ? d.responsibilities : [
          "Lead on-site engineering and operations protocols.",
          "Coordinate with group directorate on project delivery milestones."
        ],
        qualifications: typeof d.qualifications === "string" ? d.qualifications : (Array.isArray(d.qualifications) ? d.qualifications.join(". ") : "B.Tech / Relevant Professional Degree"),
        skills: Array.isArray(d.skills) ? d.skills : ["Operations Management", "Team Leadership"],
        benefits: Array.isArray(d.benefits) ? d.benefits : ["Executive Health Cover", "Performance Bonus", "Company Transit"],
        postedDate: d.posted_date || d.created_at?.split("T")[0] || new Date().toISOString().split("T")[0],
        closingDate: d.closing_date || d.deadline || "Open Until Filled",
        status: d.status === "Closed" ? "Closed" : "Active",
        salary: d.salary || d.compensation || "Industry Leading (Competitive)",
      }));

      localStorage.setItem("rbg_careers_jobs", JSON.stringify(mapped));
      return mapped;
    }
  } catch (err) {
    console.warn("Supabase getJobs error:", err);
  }

  return cached.length > 0 ? cached : initialJobOpenings;
};

export const saveJob = async (job: JobOpening): Promise<{ success: boolean; data?: JobOpening; error?: string }> => {
  try {
    const jobId = job.id || `JOB-2026-${Math.floor(100 + Math.random() * 900)}`;
    const record: JobOpening = {
      ...job,
      id: jobId,
    };

    try {
      const current = await getJobs();
      const idx = current.findIndex((j) => j.id === record.id);
      let updated: JobOpening[];
      if (idx >= 0) {
        updated = [...current];
        updated[idx] = record;
      } else {
        updated = [record, ...current];
      }
      localStorage.setItem("rbg_careers_jobs", JSON.stringify(updated));
    } catch {}

    const dbStatus = record.status === "Closed" ? "Closed" : "Open";
    
    // 1. Direct Cloud Upsert to Supabase FIRST
    const { error } = await supabase.from("jobs").upsert({
      id: record.id,
      job_code: record.id,
      slug: generateSlug(record.title),
      title: record.title,
      vertical: record.vertical || "Mining & Infrastructure",
      location: record.location,
      experience_level: record.experience || "3–5 Years",
      experience: record.experience || "3–5 Years",
      job_type: record.type || "Full-Time",
      employment_type: record.type || "Full-Time",
      type: record.type || "Full-Time",
      workplace_type: record.workplaceType || "On-Site",
      compensation: record.salary || "Competitive",
      salary: record.salary || "Competitive",
      openings: record.openings || 1,
      posted_date: record.postedDate || new Date().toISOString().split("T")[0],
      closing_date: record.closingDate || "",
      deadline: record.closingDate || "",
      description: record.description,
      responsibilities: Array.isArray(record.responsibilities) ? record.responsibilities.join("\n") : (record.responsibilities || ""),
      responsibilities_html: Array.isArray(record.responsibilities) ? record.responsibilities.join("<br/>") : "",
      qualifications: typeof record.qualifications === "string" ? record.qualifications : JSON.stringify(record.qualifications || ""),
      requirements: typeof record.qualifications === "string" ? record.qualifications : JSON.stringify(record.qualifications || ""),
      requirements_html: typeof record.qualifications === "string" ? record.qualifications : "",
      skills: Array.isArray(record.skills) ? record.skills.join(", ") : (record.skills || ""),
      benefits: Array.isArray(record.benefits) ? record.benefits.join("\n") : (record.benefits || ""),
      status: dbStatus,
    });

    if (error) {
      console.error("Supabase saveJob error:", error);
      return { success: false, error: error.message };
    }

    // 2. Update Local Cache on confirmed Cloud success
    try {
      const current = await getJobs();
      const idx = current.findIndex((j) => j.id === record.id);
      let updated: JobOpening[];
      if (idx >= 0) {
        updated = [...current];
        updated[idx] = record;
      } else {
        updated = [record, ...current];
      }
      localStorage.setItem("rbg_careers_jobs", JSON.stringify(updated));
    } catch {}

    return { success: true, data: record };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to save job" };
  }
};

export const deleteJob = async (id: string): Promise<{ success: boolean; error?: string }> => {
  try {
    // 1. Delete from Supabase FIRST
    const { error } = await supabase.from("jobs").delete().eq("id", id);
    if (error) {
      console.error("Supabase deleteJob error:", error);
      return { success: false, error: error.message };
    }

    // 2. Update Local Cache
    try {
      const current = await getJobs();
      const updated = current.filter((j) => j.id !== id);
      localStorage.setItem("rbg_careers_jobs", JSON.stringify(updated));
    } catch {}

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
};

export const toggleJobStatus = async (id: string, newStatus: "Active" | "Closed"): Promise<boolean> => {
  try {
    const current = await getJobs();
    const item = current.find((j) => j.id === id);
    if (item) {
      item.status = newStatus;
      await saveJob(item);
      return true;
    }
    return false;
  } catch {
    return false;
  }
};

/* =========================================================================
   4. NEWS SERVICE
   ========================================================================= */

export const getNews = async (): Promise<NewsItem[]> => {
  let cached: NewsItem[] = [];
  try {
    const saved = localStorage.getItem("rbg_news_posts");
    if (saved) cached = JSON.parse(saved);
  } catch {}

  try {
    const { data, error } = await supabase
      .from("news")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && Array.isArray(data)) {
      const mapped: NewsItem[] = data.map((d: any) => ({
        id: d.id,
        title: d.title || "Press Release",
        slug: d.slug || generateSlug(d.title || d.id),
        excerpt: d.excerpt || stripHtml(d.content || d.body_html || "").slice(0, 160),
        content: d.content || d.body_html || "",
        featuredImage: d.featured_image || "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
        category: d.category || "Company Update",
        date: d.date || d.release_date || d.created_at?.split("T")[0] || new Date().toISOString().split("T")[0],
        relatedBusiness: d.related_business || "Rashtra Bharosa Group Limited",
        relatedProject: d.related_project || "Corporate Initiative",
        status: (d.status as any) || "Published",
      }));

      localStorage.setItem("rbg_news_posts", JSON.stringify(mapped));
      return mapped;
    }
  } catch (err) {
    console.warn("Supabase getNews error:", err);
  }

  return cached.length > 0 ? cached : initialNewsData;
};

export const saveNews = async (news: NewsItem): Promise<{ success: boolean; data?: NewsItem; error?: string }> => {
  try {
    const newsId = news.id || `NWS-${Date.now()}`;
    const cleanSlug = news.slug.trim() || generateSlug(news.title);
    const pubDate = news.date || new Date().toISOString().split("T")[0];

    const record: NewsItem = {
      ...news,
      id: newsId,
      slug: cleanSlug,
      date: pubDate,
    };

    // 1. Direct Cloud Upsert to Supabase FIRST
    const { error } = await supabase.from("news").upsert({
      id: record.id,
      title: record.title,
      slug: record.slug,
      excerpt: record.excerpt || record.title,
      body_html: record.content || `<p>${record.excerpt || record.title}</p>`,
      content: record.content || record.excerpt || record.title,
      featured_image: record.featuredImage,
      category: record.category || "Company Update",
      date: pubDate,
      release_date: pubDate,
      author: "Corporate Secretariat",
      tags: ["News", record.category || "Corporate"],
      status: record.status || "Published",
    });

    if (error) {
      console.error("Supabase saveNews error:", error);
      return { success: false, error: error.message };
    }

    // 2. Update Local Cache on confirmed Cloud success
    try {
      const current = await getNews();
      const idx = current.findIndex((n) => n.id === record.id || n.slug === record.slug);
      let updated: NewsItem[];
      if (idx >= 0) {
        updated = [...current];
        updated[idx] = record;
      } else {
        updated = [record, ...current];
      }
      localStorage.setItem("rbg_news_posts", JSON.stringify(updated));
    } catch {}

    return { success: true, data: record };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to save news" };
  }
};

export const deleteNews = async (id: string): Promise<{ success: boolean; error?: string }> => {
  try {
    // 1. Delete from Supabase FIRST
    const { error } = await supabase.from("news").delete().eq("id", id);
    if (error) {
      console.error("Supabase deleteNews error:", error);
      return { success: false, error: error.message };
    }

    // 2. Update Local Cache
    try {
      const current = await getNews();
      const updated = current.filter((n) => n.id !== id);
      localStorage.setItem("rbg_news_posts", JSON.stringify(updated));
    } catch {}

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
};

export const toggleNewsStatus = async (id: string, newStatus: "Draft" | "Published" | "Archived"): Promise<boolean> => {
  try {
    const current = await getNews();
    const item = current.find((n) => n.id === id);
    if (item) {
      item.status = newStatus;
      await saveNews(item);
      return true;
    }
    return false;
  } catch {
    return false;
  }
};

/* =========================================================================
   5. MEDIA POSTS SERVICE (Photo Galleries / Video Releases)
   ========================================================================= */

export interface MediaPostItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  mediaType: "Photo Gallery" | "Video" | "Press Photo" | "Event" | "Project Media" | "Corporate Media";
  date: string;
  relatedBusiness: string;
  relatedProject: string;
  coverImage: string;
  gallery: Array<{ id: string; url: string; caption?: string; alt?: string }>;
  videoUrl?: string;
  status: "Draft" | "Published";
}

export const getMediaPosts = async (): Promise<MediaPostItem[]> => {
  let cached: MediaPostItem[] = [];
  try {
    const saved = localStorage.getItem("rbg_media_posts");
    if (saved) cached = JSON.parse(saved);
  } catch {}

  try {
    const { data, error } = await supabase
      .from("media_posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && Array.isArray(data)) {
      const mapped: MediaPostItem[] = data.map((d: any) => ({
        id: d.id,
        title: d.title || "Media Feature",
        slug: d.slug || generateSlug(d.title || d.id),
        description: d.description || "",
        mediaType: (d.media_type as any) || "Photo Gallery",
        date: d.date || d.published_date || d.created_at?.split("T")[0] || new Date().toISOString().split("T")[0],
        relatedBusiness: "Rashtra Bharosa Group Limited",
        relatedProject: "Corporate Initiative",
        coverImage: d.cover_image || "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1200&q=80",
        gallery: Array.isArray(d.gallery) ? d.gallery : [],
        videoUrl: d.video_url || "",
        status: (d.status as any) || "Published",
      }));

      localStorage.setItem("rbg_media_posts", JSON.stringify(mapped));
      return mapped;
    }
  } catch (err) {
    console.warn("Supabase getMediaPosts error:", err);
  }

  return cached;
};

export const saveMediaPost = async (post: MediaPostItem): Promise<{ success: boolean; data?: MediaPostItem; error?: string }> => {
  try {
    const postId = post.id || `MED-P-${Date.now()}`;
    const cleanSlug = post.slug.trim() || generateSlug(post.title);
    const pubDate = post.date || new Date().toISOString().split("T")[0];

    const record: MediaPostItem = {
      ...post,
      id: postId,
      slug: cleanSlug,
      date: pubDate,
    };

    // 1. Direct Cloud Upsert to Supabase FIRST
    const { error } = await supabase.from("media_posts").upsert({
      id: record.id,
      slug: record.slug,
      title: record.title,
      category: "Gallery",
      description: record.description,
      media_type: record.mediaType,
      date: pubDate,
      published_date: pubDate,
      cover_image: record.coverImage,
      gallery: record.gallery,
      video_url: record.videoUrl || null,
      status: record.status || "Published",
    });

    if (error) {
      console.error("Supabase saveMediaPost error:", error);
      return { success: false, error: error.message };
    }

    // 2. Update Local Cache on confirmed Cloud success
    try {
      const current = await getMediaPosts();
      const idx = current.findIndex((m) => m.id === record.id || m.slug === record.slug);
      let updated: MediaPostItem[];
      if (idx >= 0) {
        updated = [...current];
        updated[idx] = record;
      } else {
        updated = [record, ...current];
      }
      localStorage.setItem("rbg_media_posts", JSON.stringify(updated));
    } catch {}

    return { success: true, data: record };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to save media post" };
  }
};

export const deleteMediaPost = async (id: string): Promise<{ success: boolean; error?: string }> => {
  try {
    // 1. Delete from Supabase FIRST
    const { error } = await supabase.from("media_posts").delete().eq("id", id);
    if (error) {
      console.error("Supabase deleteMediaPost error:", error);
      return { success: false, error: error.message };
    }

    // 2. Update Local Cache
    try {
      const current = await getMediaPosts();
      const updated = current.filter((m) => m.id !== id);
      localStorage.setItem("rbg_media_posts", JSON.stringify(updated));
    } catch {}

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
};

export const toggleMediaPostStatus = async (id: string, newStatus: "Draft" | "Published"): Promise<boolean> => {
  try {
    const current = await getMediaPosts();
    const item = current.find((m) => m.id === id);
    if (item) {
      item.status = newStatus;
      await saveMediaPost(item);
      return true;
    }
    return false;
  } catch {
    return false;
  }
};

/* =========================================================================
   6. BIDS & INQUIRIES SERVICE
   ========================================================================= */

export const submitTenderBid = async (bid: {
  tenderNo: string;
  supplierId: string;
  vendorName: string;
  contactPerson: string;
  email: string;
  phone: string;
  quotedAmount: number;
  timelineMonths?: string;
  technicalSummary?: string;
}): Promise<{ success: boolean; bidReference?: string; error?: string }> => {
  try {
    const bidReference = `RBG-BID-2026-${Math.floor(100000 + Math.random() * 900000)}`;
    const bidUuid = typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : undefined;
    const { error } = await supabase.from("bids").insert({
      ...(bidUuid ? { id: bidUuid } : {}),
      bid_reference: bidReference,
      bid_id: bidReference,
      tender_no: bid.tenderNo,
      tender_id: bid.tenderNo,
      vendor_name: bid.vendorName,
      company_name: bid.vendorName,
      supplier_id: bid.supplierId,
      contact_person: bid.contactPerson,
      email: bid.email,
      phone: bid.phone,
      quoted_amount: bid.quotedAmount,
      quote_amount: `₹ ${bid.quotedAmount.toLocaleString("en-IN")}`,
      timeline: bid.timelineMonths || "Standard",
      notes: bid.technicalSummary || "",
      status: "Submitted",
      submission_date: new Date().toISOString().split("T")[0],
    });

    if (error) {
      console.warn("Supabase submitBid error:", error);
      return { success: false, error: error.message };
    }

    return { success: true, bidReference };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to submit bid" };
  }
};

/* =========================================================================
   7. PROJECTS CRUD SERVICE (Cloud PostgreSQL via Supabase)
   ========================================================================= */

export interface ProjectRecord {
  id: string;
  title: string;
  category: string;
  location: string;
  status: string;
  statusColor?: string;
  image: string;
  secondaryImage?: string;
  business: string;
  link: string;
  leadParagraph: string;
  detailParagraph: string;
  scopeHighlights: string[];
}

export const getProjects = async (): Promise<ProjectRecord[]> => {
  let cached: ProjectRecord[] = [];
  try {
    const saved = localStorage.getItem("rbg_projects_data");
    if (saved) cached = JSON.parse(saved);
  } catch {}

  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: true });

    if (!error && Array.isArray(data) && data.length > 0) {
      const mapped: ProjectRecord[] = data.map((d: any) => ({
        id: d.id,
        title: d.title,
        category: d.category,
        location: d.location,
        status: d.status,
        statusColor: d.status_color || "bg-emerald-950/80 text-emerald-300 border border-emerald-500/30",
        image: d.image || "",
        secondaryImage: d.secondary_image || "",
        business: d.business,
        link: d.link || `/projects/${d.id}`,
        leadParagraph: d.lead_paragraph || "",
        detailParagraph: d.detail_paragraph || "",
        scopeHighlights: Array.isArray(d.scope_highlights) ? d.scope_highlights : [],
      }));

      localStorage.setItem("rbg_projects_data", JSON.stringify(mapped));
      return mapped;
    }
  } catch (err) {
    console.warn("Error fetching projects from Supabase:", err);
  }

  return cached;
};

export const saveProject = async (
  record: ProjectRecord
): Promise<{ success: boolean; data?: ProjectRecord; error?: string }> => {
  try {
    const payload = {
      id: record.id,
      title: record.title,
      category: record.category,
      location: record.location,
      status: record.status,
      status_color: record.statusColor || "bg-emerald-950/80 text-emerald-300 border border-emerald-500/30",
      image: record.image,
      secondary_image: record.secondaryImage || "",
      business: record.business,
      link: record.link || `/projects/${record.id}`,
      lead_paragraph: record.leadParagraph,
      detail_paragraph: record.detailParagraph,
      scope_highlights: record.scopeHighlights,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase.from("projects").upsert(payload);
    if (error) {
      console.error("Supabase saveProject error:", error);
      return { success: false, error: error.message };
    }

    try {
      const current = await getProjects();
      const idx = current.findIndex((p) => p.id === record.id);
      let updated: ProjectRecord[];
      if (idx >= 0) {
        updated = [...current];
        updated[idx] = record;
      } else {
        updated = [record, ...current];
      }
      localStorage.setItem("rbg_projects_data", JSON.stringify(updated));
    } catch {}

    return { success: true, data: record };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to save project" };
  }
};

export const deleteProject = async (id: string): Promise<{ success: boolean; error?: string }> => {
  try {
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) {
      console.error("Supabase deleteProject error:", error);
      return { success: false, error: error.message };
    }

    try {
      const current = await getProjects();
      const updated = current.filter((p) => p.id !== id);
      localStorage.setItem("rbg_projects_data", JSON.stringify(updated));
    } catch {}

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
};

export const uploadMediaFile = async (
  file: File,
  folder: string = "uploads"
): Promise<{ success: boolean; url?: string; error?: string }> => {
  try {
    const fileExt = file.name.split(".").pop();
    const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from("public-media")
      .upload(fileName, file, { cacheControl: "3600", upsert: true });

    if (error) {
      return { success: false, error: error.message };
    }

    const { data: publicUrlData } = supabase.storage
      .from("public-media")
      .getPublicUrl(data.path);

    return { success: true, url: publicUrlData.publicUrl };
  } catch (err: any) {
    return { success: false, error: err.message || "Upload failed" };
  }
};
