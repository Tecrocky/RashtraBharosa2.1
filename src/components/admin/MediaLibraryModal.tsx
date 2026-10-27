import React, { useState, useEffect } from "react";
import {
  X,
  Search,
  Upload,
  Image as ImageIcon,
  Video,
  FileText,
  Check,
  Filter,
  Plus,
  Trash2,
  Edit3,
  ExternalLink,
  Globe,
  Save,
} from "lucide-react";

export interface MediaAsset {
  id: string;
  title: string;
  url: string;
  type: "image" | "video" | "pdf" | "doc";
  fileSize: string;
  uploadedAt: string;
  alt?: string;
}

export const defaultMediaAssets: MediaAsset[] = [
  {
    id: "MED-01",
    title: "Corporate Headquarters Bhubaneswar",
    url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    type: "image",
    fileSize: "1.4 MB",
    uploadedAt: "24 Sep 2026",
    alt: "Rashtra Bharosa Group Headquarters",
  },
  {
    id: "MED-02",
    title: "Odisha Iron Ore Mining Site & Beneficiation",
    url: "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1200&q=80",
    type: "image",
    fileSize: "2.1 MB",
    uploadedAt: "20 Sep 2026",
    alt: "Heavy Iron Ore Extraction Operations",
  },
  {
    id: "MED-03",
    title: "Metro Phase-1 High-Speed Infrastructure Pier",
    url: "https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=1200&q=80",
    type: "image",
    fileSize: "1.8 MB",
    uploadedAt: "18 Sep 2026",
    alt: "Innovex Construction Pier Casting",
  },
  {
    id: "MED-04",
    title: "Multi-Super-Specialty Hospital Diagnostic Wing",
    url: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
    type: "image",
    fileSize: "2.6 MB",
    uploadedAt: "15 Sep 2026",
    alt: "RashBhar Healthcare Clinical Suite",
  },
  {
    id: "MED-05",
    title: "Reyansh Elanza Luxury Sky Enclave",
    url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    type: "image",
    fileSize: "3.2 MB",
    uploadedAt: "12 Sep 2026",
    alt: "Reyansh Elanza Architectural Rendering",
  },
];

interface MediaLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMedia?: (asset: MediaAsset) => void;
  filterType?: "all" | "image" | "video" | "pdf" | "doc";
}

export const MediaLibraryModal: React.FC<MediaLibraryModalProps> = ({
  isOpen,
  onClose,
  onSelectMedia,
  filterType = "all",
}) => {
  const [assets, setAssets] = useState<MediaAsset[]>(() => {
    const saved = localStorage.getItem("rbg_media_library");
    return saved !== null ? JSON.parse(saved) : defaultMediaAssets;
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [activeType, setActiveType] = useState<string>(filterType);
  const [showAddForm, setShowAddForm] = useState(false);
  
  // Create / Edit State
  const [editingAssetId, setEditingAssetId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [type, setType] = useState<"image" | "video" | "pdf" | "doc">("image");
  const [alt, setAlt] = useState("");
  const [fileSize, setFileSize] = useState("1.5 MB");

  if (!isOpen) return null;

  const handleStartAdd = () => {
    setEditingAssetId(null);
    setTitle("");
    setUrl("");
    setType("image");
    setAlt("");
    setFileSize("1.5 MB");
    setShowAddForm(true);
  };

  const handleStartEdit = (asset: MediaAsset, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingAssetId(asset.id);
    setTitle(asset.title);
    setUrl(asset.url);
    setType(asset.type);
    setAlt(asset.alt || asset.title);
    setFileSize(asset.fileSize);
    setShowAddForm(true);
  };

  const handleDelete = (id: string, assetTitle: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm(`Are you sure you want to delete media asset "${assetTitle}"?`)) return;
    const updated = assets.filter((a) => a.id !== id);
    setAssets(updated);
    localStorage.setItem("rbg_media_library", JSON.stringify(updated));
  };

  const handleSaveMedia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim() || !title.trim()) {
      alert("Please provide both asset title and valid media URL.");
      return;
    }

    if (editingAssetId) {
      const updated = assets.map((a) =>
        a.id === editingAssetId
          ? {
              ...a,
              title: title.trim(),
              url: url.trim(),
              type,
              alt: alt.trim() || title.trim(),
              fileSize,
            }
          : a
      );
      setAssets(updated);
      localStorage.setItem("rbg_media_library", JSON.stringify(updated));
    } else {
      const newAsset: MediaAsset = {
        id: `MED-${Date.now().toString().slice(-6)}`,
        title: title.trim(),
        url: url.trim(),
        type,
        fileSize,
        uploadedAt: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
        alt: alt.trim() || title.trim(),
      };
      const updated = [newAsset, ...assets];
      setAssets(updated);
      localStorage.setItem("rbg_media_library", JSON.stringify(updated));
    }

    setShowAddForm(false);
    setEditingAssetId(null);
  };

  const filteredAssets = assets.filter((asset) => {
    const matchesSearch = asset.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = activeType === "all" || asset.type === activeType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in font-sans">
      <div className="w-full max-w-5xl bg-white border border-neutral-300 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between bg-neutral-50">
          <div>
            <h3 className="text-base font-bold text-black">Central Media & Photographic Vault</h3>
            <p className="text-xs text-neutral-500">
              Manage, upload via web link, edit caption/alt text, or delete media assets across the entire portal.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-neutral-200 text-neutral-500 hover:text-black transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar & Filter */}
        <div className="p-4 border-b border-neutral-200 bg-white flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-grow max-w-sm">
            <div className="relative w-full">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search media by title..."
                className="w-full pl-9 pr-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-black placeholder:text-neutral-400 focus:outline-none focus:border-black"
              />
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {["all", "image", "video", "pdf"].map((t) => (
              <button
                key={t}
                onClick={() => setActiveType(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                  activeType === t
                    ? "bg-black text-white"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                }`}
              >
                {t}
              </button>
            ))}

            <label className="px-3.5 py-1.5 bg-neutral-900 hover:bg-black text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer transition-all">
              <Upload className="w-3.5 h-3.5" />
              <span>Upload From Device</span>
              <input
                type="file"
                accept="image/*,video/*,application/pdf"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      const dataUrl = event.target?.result as string;
                      const sizeInMB = (file.size / (1024 * 1024)).toFixed(1) + " MB";
                      const fileType = file.type.startsWith("image/")
                        ? "image"
                        : file.type.startsWith("video/")
                        ? "video"
                        : "pdf";
                      const newAsset: MediaAsset = {
                        id: `MED-${Date.now().toString().slice(-6)}`,
                        title: file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
                        url: dataUrl,
                        type: fileType as any,
                        fileSize: sizeInMB,
                        uploadedAt: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
                        alt: file.name,
                      };
                      const updated = [newAsset, ...assets];
                      setAssets(updated);
                      localStorage.setItem("rbg_media_library", JSON.stringify(updated));
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </label>

            <button
              onClick={handleStartAdd}
              className="px-3.5 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Via Web Link</span>
            </button>
          </div>
        </div>

        {/* Add / Edit Form Modal Accordion */}
        {showAddForm && (
          <form onSubmit={handleSaveMedia} className="p-5 bg-neutral-50 border-b border-neutral-200 space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                {editingAssetId ? "Edit Media Asset & Caption" : "Insert Media Via Direct Web Link"}
              </h4>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="text-neutral-400 hover:text-black text-xs"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Asset Title / Caption *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Keonjhar Iron Ore Extraction Pit"
                  className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-xl text-xs text-black"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Direct Media URL (Web Link) *</label>
                <input
                  type="url"
                  required
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/... or https://..."
                  className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-xl text-xs text-black font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Asset Format</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as any)}
                  className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-xl text-xs text-black"
                >
                  <option value="image">Image (JPG / PNG / WebP)</option>
                  <option value="video">Video (MP4 / Web Link)</option>
                  <option value="pdf">PDF Document</option>
                  <option value="doc">Document</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Alt Tag / Accessibility Description</label>
                <input
                  type="text"
                  value={alt}
                  onChange={(e) => setAlt(e.target.value)}
                  placeholder="High-resolution aerial view of iron ore beneficiation..."
                  className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-xl text-xs text-black"
                />
              </div>
              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Estimated Size</label>
                <input
                  type="text"
                  value={fileSize}
                  onChange={(e) => setFileSize(e.target.value)}
                  placeholder="e.g. 2.4 MB"
                  className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-xl text-xs text-black"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-neutral-200">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-1.5 rounded-xl border border-neutral-200 text-xs text-neutral-600 hover:bg-neutral-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-1.5 bg-black text-white text-xs font-bold rounded-xl shadow-sm hover:bg-neutral-800"
              >
                {editingAssetId ? "Update Asset" : "Save Asset to Vault"}
              </button>
            </div>
          </form>
        )}

        {/* Media Grid */}
        <div className="p-6 overflow-y-auto flex-grow grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filteredAssets.map((asset) => (
            <div
              key={asset.id}
              onClick={() => {
                if (onSelectMedia) {
                  onSelectMedia(asset);
                  onClose();
                }
              }}
              className="group border border-neutral-200 hover:border-black rounded-2xl overflow-hidden bg-neutral-50 hover:bg-white transition-all cursor-pointer flex flex-col justify-between shadow-sm hover:shadow-md relative"
            >
              <div className="aspect-video bg-neutral-200 overflow-hidden relative">
                {asset.type === "image" ? (
                  <img
                    src={asset.url}
                    alt={asset.alt || asset.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : asset.type === "video" ? (
                  <div className="w-full h-full flex items-center justify-center bg-neutral-900 text-white">
                    <Video className="w-8 h-8" />
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-neutral-100 text-neutral-700">
                    <FileText className="w-8 h-8" />
                  </div>
                )}
                
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase bg-black/80 text-white backdrop-blur-sm">
                  {asset.type}
                </span>

                {/* Edit & Delete Action Overlay */}
                <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    type="button"
                    onClick={(e) => handleStartEdit(asset, e)}
                    className="p-1.5 rounded-lg bg-white/90 text-neutral-800 hover:bg-black hover:text-white shadow-sm transition-colors"
                    title="Edit Caption / Title"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => handleDelete(asset.id, asset.title, e)}
                    className="p-1.5 rounded-lg bg-white/90 text-red-600 hover:bg-red-600 hover:text-white shadow-sm transition-colors"
                    title="Delete Media Asset"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="p-3">
                <h5 className="text-xs font-bold text-neutral-900 truncate" title={asset.title}>
                  {asset.title}
                </h5>
                <div className="flex items-center justify-between text-[10px] text-neutral-400 font-mono mt-1">
                  <span>{asset.fileSize}</span>
                  <span>{asset.uploadedAt}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer info */}
        <div className="px-6 py-3 border-t border-neutral-200 bg-neutral-50 text-[11px] text-neutral-500 font-mono flex items-center justify-between">
          <span>{filteredAssets.length} Assets in Vault</span>
          <span>{onSelectMedia ? "Click any asset to insert immediately" : "Hover over asset to edit or delete"}</span>
        </div>
      </div>
    </div>
  );
};

export default MediaLibraryModal;
