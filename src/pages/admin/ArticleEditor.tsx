import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Eye,
  Save,
  Send,
  Upload,
  Image as ImageIcon,
  Check,
  X,
  Plus,
  Trash2,
  Calendar,
  Building2,
  Tag,
  Search,
  ExternalLink,
  Sparkles,
  Layers,
} from "lucide-react";
import RichTextEditor from "@/components/admin/RichTextEditor";
import MediaLibraryModal, { MediaAsset } from "@/components/admin/MediaLibraryModal";
import { supabase } from "@/lib/supabase";
import { saveArticle, getArticleBySlug } from "@/services/cmsService";
import logo from "@/assets/logo.png";

export interface ArticleItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  category: string;
  featuredImage: string;
  featuredImageAlt?: string;
  publicationDate: string;
  relatedBusiness: string;
  relatedProject: string;
  tags: string[];
  content: string;
  seoTitle: string;
  seoDescription: string;
  status: "Draft" | "Published" | "Archived";
  views?: number;
  createdAt: string;
}

export const initialArticlesData: ArticleItem[] = [];

const categories = [
  "Corporate",
  "Mining",
  "Infrastructure",
  "Construction",
  "Agriculture",
  "Healthcare",
  "Technology",
  "Real Estate",
  "Sustainability",
  "Innovation",
  "Research",
  "Company Updates",
  "Industry Insights",
];

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

const projects = [
  "Bhubaneswar Metro Phase-1 Rail Corridor",
  "Joda-Barbil Iron Ore Beneficiation Complex",
  "Reyansh Elanza Luxury Sky Enclave",
  "500-Bed Flagship Multi-Super-Specialty Hospital",
  "RashtrAI Sovereign Intelligence & GPU Cluster",
  "Precision Organic Agri-Corridor & Cold-Chain",
  "Coastal Green Hydrogen & Solar Park (2.4 GW)",
  "Industrial Park & Sovereign Innovation Center",
  "General Group Initiative",
];

interface ArticleEditorProps {
  articleId?: string;
  onSaveSuccess?: () => void;
  onCancel?: () => void;
}

export const ArticleEditor: React.FC<ArticleEditorProps> = ({
  articleId,
  onSaveSuccess,
  onCancel,
}) => {
  const navigate = useNavigate();
  const [mediaModalOpen, setMediaModalOpen] = useState(false);
  const [mediaTargetCallback, setMediaTargetCallback] = useState<((url: string, alt?: string) => void) | null>(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [tagInput, setTagInput] = useState("");

  // Form State
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [isSlugManual, setIsSlugManual] = useState(false);
  const [excerpt, setExcerpt] = useState("");
  const [author, setAuthor] = useState("Subransu Mohanty");
  const [category, setCategory] = useState("Corporate");
  const [featuredImage, setFeaturedImage] = useState(
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"
  );
  const [featuredImageAlt, setFeaturedImageAlt] = useState("");
  const [publicationDate, setPublicationDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [relatedBusiness, setRelatedBusiness] = useState("Rashtra Bharosa Group Limited");
  const [relatedProject, setRelatedProject] = useState("General Group Initiative");
  const [tags, setTags] = useState<string[]>(["Corporate", "Executive Announcement"]);
  const [content, setContent] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [status, setStatus] = useState<"Draft" | "Published" | "Archived">("Published");
  const [saveSuccessNotice, setSaveSuccessNotice] = useState<string | null>(null);

  // Load existing article if editing
  useEffect(() => {
    if (articleId) {
      const loadArticle = async () => {
        const found = await getArticleBySlug(articleId);
        if (found) {
          setTitle(found.title);
          setSlug(found.slug);
          setIsSlugManual(true);
          setExcerpt(found.excerpt);
          setAuthor(found.author);
          setCategory(found.category);
          setFeaturedImage(found.featuredImage);
          setFeaturedImageAlt(found.featuredImageAlt || "");
          setPublicationDate(found.publicationDate);
          setRelatedBusiness(found.relatedBusiness);
          setRelatedProject(found.relatedProject);
          setTags(found.tags || []);
          setContent(found.content);
          setSeoTitle(found.seoTitle || "");
          setSeoDescription(found.seoDescription || "");
          setStatus(found.status);
        }
      };
      loadArticle();
    }
  }, [articleId]);

  // Auto-generate slug from title if not manually customized
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!isSlugManual) {
      setSlug(generateSlug(val));
    }
    if (!seoTitle) {
      setSeoTitle(`${val} | Rashtra Bharosa Group`);
    }
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handleSave = async (targetStatus: "Draft" | "Published") => {
    if (!title.trim()) {
      alert("Please enter an Article Title.");
      return;
    }

    const finalSlug = slug.trim() || generateSlug(title);

    const articleRecord: ArticleItem = {
      id: articleId || `ART-${Date.now()}`,
      title: title.trim(),
      slug: finalSlug,
      excerpt: excerpt.trim() || title.trim(),
      author: author.trim() || "Executive Secretariat",
      category,
      featuredImage,
      featuredImageAlt: featuredImageAlt.trim(),
      publicationDate: publicationDate || new Date().toISOString().split("T")[0],
      relatedBusiness,
      relatedProject,
      tags,
      content,
      seoTitle: seoTitle.trim() || title.trim(),
      seoDescription: seoDescription.trim() || excerpt.trim(),
      status: targetStatus,
      createdAt: new Date().toISOString(),
    };

    const res = await saveArticle(articleRecord);

    if (res.success) {
      setSaveSuccessNotice(
        targetStatus === "Published"
          ? `Article "${title}" published live successfully!`
          : `Article "${title}" saved as draft.`
      );

      setTimeout(() => {
        setSaveSuccessNotice(null);
        if (onSaveSuccess) onSaveSuccess();
      }, 1200);
    } else {
      alert(`Error saving to Supabase: ${res.error}`);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16 font-sans">
      {/* Top Breadcrumb & Action Bar */}
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
              {articleId ? "Edit Article" : "Create New Article"}
            </h2>
            <p className="text-xs text-neutral-500 font-mono">
              Editorial CMS & Sovereign Publication System
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setShowPreviewModal(true)}
            className="px-4 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-900 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-all"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Preview</span>
          </button>

          <button
            type="button"
            onClick={() => handleSave("Draft")}
            className="px-4 py-2 rounded-xl bg-white border border-neutral-300 hover:bg-neutral-50 text-neutral-900 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-all"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Draft</span>
          </button>

          <button
            type="button"
            onClick={() => handleSave("Published")}
            className="px-5 py-2 rounded-xl bg-black hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Publish Live</span>
          </button>
        </div>
      </div>

      {/* Success Banner */}
      {saveSuccessNotice && (
        <div className="p-4 rounded-2xl bg-neutral-900 text-white text-xs font-medium flex items-center gap-2 animate-in fade-in">
          <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{saveSuccessNotice}</span>
        </div>
      )}

      {/* Main Grid: Form Left, Metadata Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Columns: Core Article & Rich Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <div className="p-6 rounded-3xl bg-white border border-neutral-200 shadow-sm space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-900">
                  Article Title *
                </label>
                <span className="text-[11px] text-neutral-400 font-mono">
                  {title.length}/120
                </span>
              </div>
              <input
                type="text"
                required
                maxLength={120}
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. RashBhar Group Expands Its Mining & Infrastructure Operations in Odisha"
                className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-2xl text-base font-semibold text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-black focus:bg-white transition-all"
              />
            </div>

            {/* URL Slug */}
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1 font-mono">
                URL Slug (Public Route: /articles/{slug || "slug-preview"})
              </label>
              <div className="flex items-center gap-2">
                <span className="text-xs text-neutral-400 font-mono hidden sm:inline">
                  rashtrabharosagroup.com/articles/
                </span>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => {
                    setIsSlugManual(true);
                    setSlug(generateSlug(e.target.value));
                  }}
                  className="w-full px-3 py-1.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-mono text-neutral-800 focus:outline-none focus:border-black"
                />
              </div>
            </div>

            {/* Excerpt */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-900">
                  Short Description / Excerpt
                </label>
                <span className="text-[11px] text-neutral-400 font-mono">
                  {excerpt.length}/300
                </span>
              </div>
              <textarea
                rows={3}
                maxLength={300}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="A concise executive summary used for search cards, homepage feeds, and social previews..."
                className="w-full p-3.5 bg-neutral-50 border border-neutral-200 rounded-2xl text-xs text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-black focus:bg-white transition-all leading-relaxed"
              />
            </div>
          </div>

          {/* Rich Text Editor */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-900">
                Full Article Content
              </label>
              <span className="text-[11px] text-neutral-500 font-mono">
                Supports Rich Typography, Image Embeds, Videos & Tables
              </span>
            </div>

            <RichTextEditor
              value={content}
              onChange={setContent}
              placeholder="Start writing the full corporate article body here..."
              minHeight="480px"
              onOpenMediaLibrary={(onSelect) => {
                setMediaTargetCallback(() => (url: string, alt?: string) => onSelect(url, alt));
                setMediaModalOpen(true);
              }}
            />
          </div>

          {/* SEO Metadata Box */}
          <div className="p-6 rounded-3xl bg-neutral-50 border border-neutral-200 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5" />
              <span>Search Engine Optimization (SEO)</span>
            </h3>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">SEO Title</label>
              <input
                type="text"
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                placeholder="Google Search Title Tag..."
                className="w-full px-3.5 py-2 bg-white border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">Meta Description</label>
              <textarea
                rows={2}
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
                placeholder="Meta description for search engine ranking..."
                className="w-full px-3.5 py-2 bg-white border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none focus:border-black"
              />
            </div>
          </div>
        </div>

        {/* Right 1 Column: Editorial Metadata & Featured Image */}
        <div className="space-y-6">
          {/* Featured Image Box */}
          <div className="p-6 rounded-3xl bg-white border border-neutral-200 shadow-sm space-y-4">
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-900">
              Featured Hero Image
            </label>

            {featuredImage ? (
              <div className="space-y-3">
                <div className="aspect-video rounded-2xl overflow-hidden border border-neutral-200 relative group bg-neutral-100">
                  <img
                    src={featuredImage}
                    alt={featuredImageAlt || title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setMediaTargetCallback(() => (url: string, alt?: string) => {
                          setFeaturedImage(url);
                          if (alt) setFeaturedImageAlt(alt);
                        });
                        setMediaModalOpen(true);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-white text-black text-xs font-bold shadow-lg"
                    >
                      Replace Image
                    </button>
                    <button
                      type="button"
                      onClick={() => setFeaturedImage("")}
                      className="p-1.5 rounded-lg bg-red-600 text-white hover:bg-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-neutral-600 mb-1">
                    Image Alt Description
                  </label>
                  <input
                    type="text"
                    value={featuredImageAlt}
                    onChange={(e) => setFeaturedImageAlt(e.target.value)}
                    placeholder="Describe image for accessibility..."
                    className="w-full px-3 py-1.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none focus:border-black"
                  />
                </div>
              </div>
            ) : (
              <div
                onClick={() => {
                  setMediaTargetCallback(() => (url: string, alt?: string) => {
                    setFeaturedImage(url);
                    if (alt) setFeaturedImageAlt(alt);
                  });
                  setMediaModalOpen(true);
                }}
                className="aspect-video rounded-2xl border-2 border-dashed border-neutral-300 hover:border-black flex flex-col items-center justify-center p-4 text-center cursor-pointer bg-neutral-50 hover:bg-neutral-100 transition-colors"
              >
                <ImageIcon className="w-8 h-8 text-neutral-400 mb-2" />
                <span className="text-xs font-bold text-neutral-800">Select Featured Image</span>
                <span className="text-[10px] text-neutral-400 mt-0.5">Media Library or direct URL</span>
              </div>
            )}
          </div>

          {/* Publishing Parameters */}
          <div className="p-6 rounded-3xl bg-white border border-neutral-200 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
              Publishing Parameters
            </h3>

            {/* Author */}
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">Author</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="e.g. Subransu Mohanty"
                className="w-full px-3.5 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none focus:border-black"
              />
            </div>

            {/* Category */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-neutral-700">Category</label>
                <span className="text-[10px] text-neutral-400">Select or enter custom</span>
              </div>
              <div className="space-y-1.5">
                <select
                  value={categories.includes(category) ? category : "Custom"}
                  onChange={(e) => {
                    if (e.target.value !== "Custom") {
                      setCategory(e.target.value);
                    }
                  }}
                  className="w-full px-3.5 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none focus:border-black"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                  <option value="Custom">+ Custom Category...</option>
                </select>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Or type custom category name..."
                  className="w-full px-3.5 py-2 bg-white border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none focus:border-black"
                />
              </div>
            </div>

            {/* Publication Date */}
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">Publication Date</label>
              <input
                type="date"
                value={publicationDate}
                onChange={(e) => setPublicationDate(e.target.value)}
                className="w-full px-3.5 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none focus:border-black"
              />
            </div>

            {/* Related Subsidiary */}
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">Related Subsidiary</label>
              <select
                value={relatedBusiness}
                onChange={(e) => setRelatedBusiness(e.target.value)}
                className="w-full px-3.5 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none focus:border-black"
              >
                {subsidiaries.map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
            </div>

            {/* Related Project */}
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">Related Project</label>
              <select
                value={relatedProject}
                onChange={(e) => setRelatedProject(e.target.value)}
                className="w-full px-3.5 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none focus:border-black"
              >
                {projects.map((proj) => (
                  <option key={proj} value={proj}>
                    {proj}
                  </option>
                ))}
              </select>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">Tags</label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {tags.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-800 text-[11px] font-medium"
                  >
                    <span>{t}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(t)}
                      className="hover:text-black"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                placeholder="Type tag & press Enter..."
                className="w-full px-3 py-1.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none focus:border-black"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Media Library Selector Modal */}
      <MediaLibraryModal
        isOpen={mediaModalOpen}
        onClose={() => setMediaModalOpen(false)}
        onSelectMedia={(asset: MediaAsset) => {
          if (mediaTargetCallback) {
            mediaTargetCallback(asset.url, asset.alt);
          }
        }}
      />

      {/* Live Public Website Article Preview Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 bg-neutral-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Live Public Article Preview Mode</span>
              </div>
              <button
                onClick={() => setShowPreviewModal(false)}
                className="p-1 rounded-lg text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-8 sm:p-12 overflow-y-auto flex-grow space-y-6">
              {/* Category & Date */}
              <div className="flex items-center gap-3 text-xs font-mono text-neutral-500 uppercase tracking-widest">
                <span className="font-bold text-black">{category}</span>
                <span>•</span>
                <span>
                  {new Date(publicationDate).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
                <span>•</span>
                <span>By {author}</span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-neutral-900 leading-tight">
                {title || "Untitled Corporate Article"}
              </h1>

              {/* Excerpt */}
              {excerpt && (
                <p className="text-base text-neutral-600 leading-relaxed font-sans border-l-2 border-black pl-4">
                  {excerpt}
                </p>
              )}

              {/* Hero Image */}
              {featuredImage && (
                <div className="rounded-3xl overflow-hidden shadow-lg border border-neutral-200">
                  <img
                    src={featuredImage}
                    alt={featuredImageAlt || title}
                    className="w-full h-auto max-h-[460px] object-cover"
                  />
                </div>
              )}

              {/* Article Content Render */}
              <div
                className="prose prose-neutral max-w-none prose-headings:font-serif prose-headings:tracking-tight pt-4"
                dangerouslySetInnerHTML={{ __html: content || "<p>No content written yet.</p>" }}
              />

              {/* Tags */}
              {tags.length > 0 && (
                <div className="pt-6 border-t border-neutral-200 flex flex-wrap gap-2">
                  {tags.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-full bg-neutral-100 text-xs font-medium text-neutral-700"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="px-8 py-4 bg-neutral-50 border-t border-neutral-200 flex justify-end gap-3">
              <button
                onClick={() => setShowPreviewModal(false)}
                className="px-4 py-2 bg-neutral-200 hover:bg-neutral-300 text-neutral-800 text-xs font-bold rounded-xl"
              >
                Close Preview
              </button>
              <button
                onClick={() => {
                  setShowPreviewModal(false);
                  handleSave("Published");
                }}
                className="px-5 py-2 bg-black hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl"
              >
                Publish Live Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleEditor;
