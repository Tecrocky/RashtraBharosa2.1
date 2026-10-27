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
  Plus,
  Trash2,
  Calendar,
  Layers,
  MoveUp,
  MoveDown,
  Video,
} from "lucide-react";
import MediaLibraryModal, { MediaAsset } from "@/components/admin/MediaLibraryModal";
import { supabase } from "@/lib/supabase";
import { saveMediaPost, getMediaPosts, MediaPostItem } from "@/services/cmsService";

export interface GalleryPhoto {
  id: string;
  url: string;
  caption?: string;
  alt?: string;
}

export type MediaPost = MediaPostItem;

export const initialMediaPosts: MediaPost[] = [];

interface MediaEditorProps {
  mediaPostId?: string;
  onSaveSuccess?: () => void;
  onCancel?: () => void;
}

export const MediaEditor: React.FC<MediaEditorProps> = ({
  mediaPostId,
  onSaveSuccess,
  onCancel,
}) => {
  const navigate = useNavigate();
  const [mediaModalOpen, setMediaModalOpen] = useState(false);
  const [galleryUploadMode, setGalleryUploadMode] = useState<"cover" | "gallery">("cover");
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [mediaType, setMediaType] = useState<MediaPost["mediaType"]>("Photo Gallery");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [relatedBusiness, setRelatedBusiness] = useState("Rashtra Bharosa Group Limited");
  const [relatedProject, setRelatedProject] = useState("General Corporate Event");
  const [coverImage, setCoverImage] = useState(
    "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1200&q=80"
  );
  const [videoUrl, setVideoUrl] = useState("");
  const [gallery, setGallery] = useState<GalleryPhoto[]>([
    {
      id: "GP-1",
      url: "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1200&q=80",
      caption: "Primary beneficiation facility overview",
      alt: "Mining Beneficiation",
    },
    {
      id: "GP-2",
      url: "https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=1200&q=80",
      caption: "Structural heavy precast launch",
      alt: "Civil Infrastructure",
    },
  ]);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  useEffect(() => {
    if (mediaPostId) {
      getMediaPosts().then((posts) => {
        const found = posts.find((p) => p.id === mediaPostId || p.slug === mediaPostId);
        if (found) {
          setTitle(found.title);
          setSlug(found.slug);
          setDescription(found.description);
          setMediaType(found.mediaType);
          setDate(found.date);
          setRelatedBusiness(found.relatedBusiness || "Rashtra Bharosa Group Limited");
          setRelatedProject(found.relatedProject || "General Corporate Event");
          setCoverImage(found.coverImage);
          setVideoUrl(found.videoUrl || "");
          if (Array.isArray(found.gallery) && found.gallery.length > 0) {
            setGallery(found.gallery);
          }
        }
      });
    }
  }, [mediaPostId]);

  const generateSlug = (text: string) => {
    return text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
  };

  const handleAddPhotoToGallery = (url: string, alt?: string) => {
    const newPhoto: GalleryPhoto = {
      id: `GP-${Date.now()}-${Math.floor(Math.random() * 100)}`,
      url,
      caption: "",
      alt: alt || "Gallery photo",
    };
    setGallery([...gallery, newPhoto]);
  };

  const handleUpdateCaption = (id: string, caption: string) => {
    setGallery(gallery.map((p) => (p.id === id ? { ...p, caption } : p)));
  };

  const handleUpdateAlt = (id: string, alt: string) => {
    setGallery(gallery.map((p) => (p.id === id ? { ...p, alt } : p)));
  };

  const handleRemovePhoto = (id: string) => {
    setGallery(gallery.filter((p) => p.id !== id));
  };

  const handleMovePhoto = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= gallery.length) return;
    const copy = [...gallery];
    const item = copy[index];
    copy[index] = copy[targetIndex];
    copy[targetIndex] = item;
    setGallery(copy);
  };

  const handleSave = async (targetStatus: "Draft" | "Published") => {
    if (!title.trim()) {
      alert("Please enter a media title.");
      return;
    }

    const finalSlug = slug.trim() || generateSlug(title);

    const record: MediaPost = {
      id: mediaPostId || `MED-P-${Date.now()}`,
      title: title.trim(),
      slug: finalSlug,
      description: description.trim(),
      mediaType,
      date,
      relatedBusiness,
      relatedProject,
      coverImage,
      gallery,
      videoUrl: videoUrl.trim(),
      status: targetStatus,
    };

    const res = await saveMediaPost(record);

    if (res.success) {
      setSuccessNotice(targetStatus === "Published" ? "Media post published to portal & Supabase!" : "Saved as draft to Supabase.");
      setTimeout(() => {
        setSuccessNotice(null);
        if (onSaveSuccess) onSaveSuccess();
      }, 1200);
    } else {
      alert(`Error saving media post: ${res.error}`);
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
              Create Media Post & Photo Gallery
            </h2>
            <p className="text-xs text-neutral-500 font-mono">Central Corporate Visual Media Publisher</p>
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
            <span>Publish Media</span>
          </button>
        </div>
      </div>

      {successNotice && (
        <div className="p-4 rounded-2xl bg-neutral-900 text-white text-xs font-medium flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{successNotice}</span>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Title & Description */}
          <div className="p-6 rounded-3xl bg-white border border-neutral-200 shadow-sm space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-900 mb-1">
                Media Post Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (!slug) setSlug(generateSlug(e.target.value));
                }}
                placeholder="e.g. RashBhar Mining Project Development Activities"
                className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-2xl text-base font-semibold text-neutral-900 focus:outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">Description</label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Comprehensive overview of photographs, site developments, or event media..."
                className="w-full p-3.5 bg-neutral-50 border border-neutral-200 rounded-2xl text-xs text-neutral-800 focus:outline-none focus:border-black"
              />
            </div>

            {mediaType === "Video" && (
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">Video Link (YouTube / MP4)</label>
                <input
                  type="url"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none focus:border-black"
                />
              </div>
            )}
          </div>

          {/* Photo Gallery Manager */}
          <div className="p-6 rounded-3xl bg-white border border-neutral-200 shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900">
                  Photo Gallery Collection ({gallery.length} Photos)
                </h3>
                <p className="text-xs text-neutral-500">
                  Upload multiple photographs, specify individual captions, and reorder.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setGalleryUploadMode("gallery");
                  setMediaModalOpen(true);
                }}
                className="px-3.5 py-2 bg-black hover:bg-neutral-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>+ Add Photos</span>
              </button>
            </div>

            {/* Gallery Items List */}
            <div className="space-y-3">
              {gallery.map((photo, index) => (
                <div
                  key={photo.id}
                  className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 flex flex-col sm:flex-row items-center gap-4 group"
                >
                  <div className="w-24 h-20 rounded-xl overflow-hidden bg-neutral-200 flex-shrink-0 border border-neutral-300">
                    <img src={photo.url} alt={photo.alt} className="w-full h-full object-cover" />
                  </div>

                  <div className="flex-grow space-y-2 w-full">
                    <input
                      type="text"
                      value={photo.caption || ""}
                      onChange={(e) => handleUpdateCaption(photo.id, e.target.value)}
                      placeholder="Add caption for this photo..."
                      className="w-full px-3 py-1.5 bg-white border border-neutral-200 rounded-lg text-xs text-neutral-800 focus:outline-none focus:border-black"
                    />
                    <input
                      type="text"
                      value={photo.alt || ""}
                      onChange={(e) => handleUpdateAlt(photo.id, e.target.value)}
                      placeholder="Alt text (e.g. Beneficiation Crusher Unit 01)"
                      className="w-full px-3 py-1 bg-white border border-neutral-200 rounded-lg text-[11px] text-neutral-600 focus:outline-none focus:border-black"
                    />
                  </div>

                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button
                      type="button"
                      disabled={index === 0}
                      onClick={() => handleMovePhoto(index, "up")}
                      className="p-1.5 rounded-lg hover:bg-neutral-200 text-neutral-600 disabled:opacity-30"
                    >
                      <MoveUp className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      disabled={index === gallery.length - 1}
                      onClick={() => handleMovePhoto(index, "down")}
                      className="p-1.5 rounded-lg hover:bg-neutral-200 text-neutral-600 disabled:opacity-30"
                    >
                      <MoveDown className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemovePhoto(photo.id)}
                      className="p-1.5 rounded-lg hover:bg-red-100 text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Cover Image */}
          <div className="p-6 rounded-3xl bg-white border border-neutral-200 shadow-sm space-y-4">
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-900">
              Media Cover Image
            </label>
            {coverImage ? (
              <div className="aspect-video rounded-2xl overflow-hidden border border-neutral-200 relative group">
                <img src={coverImage} alt={title} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => {
                    setGalleryUploadMode("cover");
                    setMediaModalOpen(true);
                  }}
                  className="absolute inset-0 bg-black/50 text-white text-xs font-bold opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                >
                  Change Cover
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setGalleryUploadMode("cover");
                  setMediaModalOpen(true);
                }}
                className="aspect-video w-full rounded-2xl border-2 border-dashed border-neutral-300 flex flex-col items-center justify-center text-xs text-neutral-500 hover:border-black"
              >
                <ImageIcon className="w-6 h-6 mb-1" />
                <span>Select Cover</span>
              </button>
            )}
          </div>

          {/* Media Classification */}
          <div className="p-6 rounded-3xl bg-white border border-neutral-200 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900">Parameters</h3>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">Media Type</label>
              <select
                value={mediaType}
                onChange={(e) => setMediaType(e.target.value as any)}
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none"
              >
                <option value="Photo Gallery">Photo Gallery</option>
                <option value="Video">Video</option>
                <option value="Press Photo">Press Photo</option>
                <option value="Event">Event</option>
                <option value="Project Media">Project Media</option>
                <option value="Corporate Media">Corporate Media</option>
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
              <label className="block text-xs font-semibold text-neutral-700 mb-1">Related Subsidiary</label>
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

      {/* Media Modal */}
      <MediaLibraryModal
        isOpen={mediaModalOpen}
        onClose={() => setMediaModalOpen(false)}
        onSelectMedia={(asset: MediaAsset) => {
          if (galleryUploadMode === "cover") {
            setCoverImage(asset.url);
          } else {
            handleAddPhotoToGallery(asset.url, asset.alt);
          }
        }}
      />

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
            <div>
              <span className="px-3 py-1 rounded-full bg-neutral-100 text-xs font-mono font-bold uppercase text-neutral-700">
                {mediaType}
              </span>
              <h1 className="text-3xl font-serif font-bold text-neutral-900 mt-2">{title || "Untitled Gallery"}</h1>
              <p className="text-xs text-neutral-500 font-mono mt-1">{date} • {relatedBusiness}</p>
            </div>
            {description && <p className="text-sm text-neutral-600 leading-relaxed">{description}</p>}

            {gallery.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
                {gallery.map((photo) => (
                  <div key={photo.id} className="rounded-2xl overflow-hidden border border-neutral-200 space-y-2">
                    <img src={photo.url} alt={photo.alt} className="w-full aspect-video object-cover" />
                    {photo.caption && <p className="text-xs text-neutral-600 p-2 italic">{photo.caption}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaEditor;
