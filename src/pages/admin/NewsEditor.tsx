import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Eye,
  Save,
  Send,
  Upload,
  Image as ImageIcon,
  Check,
  X,
  Trash2,
  Calendar,
  Building2,
  Newspaper,
} from "lucide-react";
import RichTextEditor from "@/components/admin/RichTextEditor";
import MediaLibraryModal, { MediaAsset } from "@/components/admin/MediaLibraryModal";
import { supabase } from "@/lib/supabase";
import { saveNews, getNews } from "@/services/cmsService";

export interface NewsItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  category: "Company Update" | "Press Release" | "Regulatory Notice" | "Project Milestone";
  date: string;
  relatedBusiness: string;
  relatedProject: string;
  status: "Draft" | "Published" | "Archived";
}

export const initialNewsData: NewsItem[] = [];

interface NewsEditorProps {
  newsId?: string;
  onSaveSuccess?: () => void;
  onCancel?: () => void;
}

export const NewsEditor: React.FC<NewsEditorProps> = ({
  newsId,
  onSaveSuccess,
  onCancel,
}) => {
  const navigate = useNavigate();
  const [mediaModalOpen, setMediaModalOpen] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [featuredImage, setFeaturedImage] = useState(
    "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80"
  );
  const [category, setCategory] = useState<NewsItem["category"]>("Company Update");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [relatedBusiness, setRelatedBusiness] = useState("Rashtra Bharosa Group Limited");
  const [relatedProject, setRelatedProject] = useState("General Group Milestone");
  const [status, setStatus] = useState<"Draft" | "Published" | "Archived">("Published");
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  useEffect(() => {
    if (newsId) {
      const loadNews = async () => {
        const list = await getNews();
        const found = list.find((n: NewsItem) => n.id === newsId || n.slug === newsId);
        if (found) {
          setTitle(found.title);
          setSlug(found.slug);
          setExcerpt(found.excerpt);
          setContent(found.content);
          setFeaturedImage(found.featuredImage);
          setCategory(found.category);
          setDate(found.date);
          setRelatedBusiness(found.relatedBusiness);
          setRelatedProject(found.relatedProject);
          setStatus(found.status);
        }
      };
      loadNews();
    }
  }, [newsId]);

  const generateSlug = (text: string) => {
    return text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
  };

  const handleSave = async (targetStatus: "Draft" | "Published") => {
    if (!title.trim()) {
      alert("Please enter a title.");
      return;
    }

    const finalSlug = slug.trim() || generateSlug(title);

    const record: NewsItem = {
      id: newsId || `NWS-${Date.now()}`,
      title: title.trim(),
      slug: finalSlug,
      excerpt: excerpt.trim() || title.trim(),
      content: content || `<p>${excerpt || title}</p>`,
      featuredImage,
      category,
      date,
      relatedBusiness,
      relatedProject,
      status: targetStatus,
    };

    const res = await saveNews(record);
    if (!res.success) {
      alert(`Failed to save news update to Supabase cloud: ${res.error || "Unknown error"}`);
      return;
    }

    setSuccessNotice(targetStatus === "Published" ? "News update published successfully via Supabase!" : "Saved as draft in Supabase.");
    setTimeout(() => {
      setSuccessNotice(null);
      if (onSaveSuccess) onSaveSuccess();
    }, 1200);
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
              {newsId ? "Edit News / Update" : "Publish News / Company Update"}
            </h2>
            <p className="text-xs text-neutral-500 font-mono">Official Corporate Dispatch & Media Notice</p>
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
            onClick={() => handleSave("Published")}
            className="px-5 py-2 rounded-xl bg-black hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Publish Update</span>
          </button>
        </div>
      </div>

      {successNotice && (
        <div className="p-4 rounded-2xl bg-neutral-900 text-white text-xs font-medium flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{successNotice}</span>
        </div>
      )}

      {/* Form Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-neutral-200 shadow-sm space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-900 mb-1">
                News Headline *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (!slug) setSlug(generateSlug(e.target.value));
                }}
                placeholder="e.g. RashBhar Health Care Breaks Ground on 500-Bed Advanced Trauma & Oncology Hub"
                className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-2xl text-base font-semibold text-neutral-900 focus:outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">Short Summary</label>
              <textarea
                rows={2}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Brief description for news feeds..."
                className="w-full p-3.5 bg-neutral-50 border border-neutral-200 rounded-2xl text-xs text-neutral-800 focus:outline-none focus:border-black"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-900">
              News Body & Details
            </label>
            <RichTextEditor
              value={content}
              onChange={setContent}
              placeholder="Write full news and update details here..."
              minHeight="380px"
              onOpenMediaLibrary={(onSelect) => setMediaModalOpen(true)}
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-neutral-200 shadow-sm space-y-4">
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-900">
              News Cover Image
            </label>
            {featuredImage ? (
              <div className="aspect-video rounded-2xl overflow-hidden border border-neutral-200 relative group">
                <img src={featuredImage} alt={title} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setMediaModalOpen(true)}
                  className="absolute inset-0 bg-black/50 text-white text-xs font-bold opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                >
                  Change Image
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setMediaModalOpen(true)}
                className="aspect-video w-full rounded-2xl border-2 border-dashed border-neutral-300 flex flex-col items-center justify-center text-xs text-neutral-500 hover:border-black"
              >
                <ImageIcon className="w-6 h-6 mb-1" />
                <span>Select Cover</span>
              </button>
            )}
          </div>

          <div className="p-6 rounded-3xl bg-white border border-neutral-200 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900">Metadata</h3>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none"
              >
                <option value="Company Update">Company Update</option>
                <option value="Press Release">Press Release</option>
                <option value="Regulatory Notice">Regulatory Notice</option>
                <option value="Project Milestone">Project Milestone</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">Subsidiary</label>
              <input
                type="text"
                value={relatedBusiness}
                onChange={(e) => setRelatedBusiness(e.target.value)}
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      <MediaLibraryModal
        isOpen={mediaModalOpen}
        onClose={() => setMediaModalOpen(false)}
        onSelectMedia={(asset: MediaAsset) => setFeaturedImage(asset.url)}
      />

      {/* Preview Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-3xl bg-white rounded-3xl p-8 max-h-[85vh] overflow-y-auto space-y-4 relative">
            <button
              onClick={() => setShowPreviewModal(false)}
              className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>
            <span className="px-2.5 py-1 rounded-full bg-neutral-100 text-xs font-mono font-bold uppercase text-neutral-700">
              {category}
            </span>
            <h1 className="text-3xl font-serif font-bold text-neutral-900">{title || "Untitled"}</h1>
            <p className="text-xs text-neutral-500 font-mono">{date} • {relatedBusiness}</p>
            {featuredImage && (
              <img src={featuredImage} alt={title} className="w-full rounded-2xl max-h-96 object-cover" />
            )}
            <div className="prose prose-neutral max-w-none pt-2" dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsEditor;
