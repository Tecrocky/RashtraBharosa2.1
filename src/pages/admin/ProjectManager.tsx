import React, { useState, useEffect } from "react";
import {
  Building2,
  Plus,
  Trash2,
  Edit3,
  ExternalLink,
  Search,
  Upload,
  Check,
  X,
  MapPin,
  Layers,
  Sparkles,
} from "lucide-react";
import {
  getProjects,
  saveProject,
  deleteProject,
  uploadMediaFile,
  ProjectRecord,
} from "@/services/cmsService";

export const ProjectManager: React.FC = () => {
  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Form State
  const [isEditing, setIsEditing] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  const initialFormState: ProjectRecord = {
    id: "",
    title: "",
    category: "Mining",
    location: "",
    status: "Active Operations",
    statusColor: "bg-emerald-950/80 text-emerald-300 border border-emerald-500/30",
    image: "",
    secondaryImage: "",
    business: "RashBhar Mining Corporation",
    link: "",
    leadParagraph: "",
    detailParagraph: "",
    scopeHighlights: [],
  };

  const [formData, setFormData] = useState<ProjectRecord>(initialFormState);
  const [rawHighlights, setRawHighlights] = useState<string>("");

  const loadData = async () => {
    setLoading(true);
    const data = await getProjects();
    setProjects(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenCreate = () => {
    const newId = `project-${Date.now().toString(36)}`;
    setFormData({
      ...initialFormState,
      id: newId,
      link: `/projects/${newId}`,
    });
    setRawHighlights("");
    setFormError(null);
    setFormSuccess(null);
    setIsEditing(true);
  };

  const handleOpenEdit = (project: ProjectRecord) => {
    setFormData(project);
    setRawHighlights((project.scopeHighlights || []).join("\n"));
    setFormError(null);
    setFormSuccess(null);
    setIsEditing(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, isSecondary: boolean = false) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const res = await uploadMediaFile(file, "projects");
    setUploadingImage(false);

    if (res.success && res.url) {
      if (isSecondary) {
        setFormData((prev) => ({ ...prev, secondaryImage: res.url }));
      } else {
        setFormData((prev) => ({ ...prev, image: res.url }));
      }
    } else {
      alert("Image upload failed: " + (res.error || "Unknown error"));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(null);

    if (!formData.title || !formData.id) {
      setFormError("Project ID and Title are required.");
      return;
    }

    const highlightsArray = rawHighlights
      .split("\n")
      .map((h) => h.trim())
      .filter((h) => h.length > 0);

    const projectToSave: ProjectRecord = {
      ...formData,
      scopeHighlights: highlightsArray,
      link: formData.link || `/projects/${formData.id}`,
    };

    const res = await saveProject(projectToSave);
    if (res.success) {
      setFormSuccess("Project successfully saved to Supabase PostgreSQL Database!");
      setTimeout(() => {
        setIsEditing(false);
        loadData();
      }, 800);
    } else {
      setFormError(res.error || "Failed to save project.");
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete project "${title}" (${id}) from Supabase Cloud?`)) {
      return;
    }

    const res = await deleteProject(id);
    if (res.success) {
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } else {
      alert("Failed to delete project: " + (res.error || "Unknown error"));
    }
  };

  const filteredProjects = projects.filter((p) => {
    const matchesCategory =
      categoryFilter === "all" || p.category.toLowerCase() === categoryFilter.toLowerCase();
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      query === "" ||
      p.title.toLowerCase().includes(query) ||
      p.business.toLowerCase().includes(query) ||
      p.location.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16 font-sans">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-neutral-900 tracking-tight">
              Capital Projects Management
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-emerald-100 text-emerald-800">
              Supabase SQL Live
            </span>
          </div>
          <p className="text-xs text-neutral-500 font-mono mt-0.5">
            Post, Edit, Upload Imagery & Archive Strategic Group Projects Directly to PostgreSQL
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-black text-white hover:bg-neutral-800 text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Post New Project</span>
        </button>
      </div>

      {/* Filter and Search */}
      <div className="p-4 rounded-2xl bg-white border border-neutral-200 flex flex-wrap items-center justify-between gap-3 shadow-sm">
        <div className="relative flex-grow max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects by title, location, subsidiary..."
            className="w-full pl-9 pr-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-black placeholder:text-neutral-400 focus:outline-none focus:border-black"
          />
        </div>

        <div className="flex items-center gap-2">
          {["all", "Mining", "Real Estate", "Healthcare", "Agriculture"].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${
                categoryFilter === cat
                  ? "bg-black text-white"
                  : "bg-neutral-100 hover:bg-neutral-200 text-neutral-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Project Cards / Table Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {loading ? (
          <div className="col-span-full py-16 text-center text-neutral-400">
            <Building2 className="w-8 h-8 mx-auto mb-2 text-neutral-300 animate-pulse" />
            <div className="text-xs font-semibold">Loading projects from Supabase Cloud...</div>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="col-span-full py-16 text-center text-neutral-400 bg-white rounded-3xl border border-neutral-200">
            <Building2 className="w-10 h-10 mx-auto mb-2 text-neutral-300" />
            <div className="text-xs font-bold text-neutral-700">No Projects Found</div>
            <p className="text-[11px] text-neutral-400 mt-1">
              Click "Post New Project" to add your first project into the database.
            </p>
          </div>
        ) : (
          filteredProjects.map((proj) => (
            <div
              key={proj.id}
              className="bg-white rounded-3xl border border-neutral-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative h-44 bg-neutral-100 overflow-hidden">
                  {proj.image ? (
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-neutral-400">
                      <Building2 className="w-10 h-10 stroke-[1]" />
                    </div>
                  )}
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-black/75 text-white backdrop-blur-md">
                    {proj.category}
                  </span>
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-emerald-500/90 text-white backdrop-blur-md">
                    {proj.status}
                  </span>
                </div>

                <div className="p-5 space-y-2">
                  <div className="text-[11px] font-mono text-neutral-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-neutral-500" />
                    <span>{proj.location}</span>
                  </div>
                  <h3 className="font-bold text-sm text-neutral-900 leading-snug line-clamp-1">
                    {proj.title}
                  </h3>
                  <div className="text-[11px] font-semibold text-neutral-600 line-clamp-1">
                    {proj.business}
                  </div>
                  <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed">
                    {proj.leadParagraph || proj.detailParagraph}
                  </p>
                </div>
              </div>

              <div className="p-4 bg-neutral-50 border-t border-neutral-100 flex items-center justify-between">
                <a
                  href={proj.link || `/projects/${proj.id}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] font-semibold text-neutral-600 hover:text-black flex items-center gap-1"
                >
                  <ExternalLink className="w-3 h-3" /> View Public Page
                </a>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenEdit(proj)}
                    className="p-1.5 rounded-xl bg-neutral-200/70 hover:bg-black hover:text-white text-neutral-700 transition-colors"
                    title="Edit Project"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(proj.id, proj.title)}
                    className="p-1.5 rounded-xl hover:bg-red-50 text-neutral-400 hover:text-red-600 transition-colors"
                    title="Delete Project"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Edit / Create Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-3xl bg-white rounded-3xl p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto space-y-5 shadow-2xl">
            <button
              onClick={() => setIsEditing(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b border-neutral-200 pb-3">
              <h3 className="text-lg font-bold text-neutral-900">
                {formData.id ? `Edit Project: ${formData.title || formData.id}` : "Post New Project to Supabase"}
              </h3>
              <p className="text-xs text-neutral-500 font-mono">
                Postgres Table: public.projects | Storage: public-media
              </p>
            </div>

            {formError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600">
                {formError}
              </div>
            )}
            {formSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-700 flex items-center gap-1.5 font-semibold">
                <Check className="w-4 h-4 text-emerald-600" />
                {formSuccess}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-neutral-700 mb-1">Project ID / Slug *</label>
                  <input
                    type="text"
                    required
                    value={formData.id}
                    onChange={(e) => setFormData({ ...formData, id: e.target.value.toLowerCase().replace(/\s+/g, "-") })}
                    placeholder="e.g. odisha-iron-ore"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 font-mono text-xs focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block font-bold text-neutral-700 mb-1">Project Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Odisha Iron Ore Belt Project"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block font-bold text-neutral-700 mb-1">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs font-semibold focus:outline-none focus:border-black"
                  >
                    <option value="Mining">Mining</option>
                    <option value="Real Estate">Real Estate</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Agriculture">Agriculture</option>
                    <option value="Infrastructure">Infrastructure</option>
                    <option value="Energy & Power">Energy & Power</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-neutral-700 mb-1">Operating Business / Subsidiary *</label>
                  <input
                    type="text"
                    required
                    value={formData.business}
                    onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                    placeholder="e.g. RashBhar Mining Corporation"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block font-bold text-neutral-700 mb-1">Location *</label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Sundergarh Mining District, Odisha"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block font-bold text-neutral-700 mb-1">Status *</label>
                  <input
                    type="text"
                    required
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    placeholder="e.g. Active Operations or Under Construction"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              {/* Imagery Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-neutral-200">
                <div>
                  <label className="block font-bold text-neutral-700 mb-1">Primary Banner Image URL</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="https://... or /assets/..."
                      className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs font-mono"
                    />
                    <label className="px-3 py-2 bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 rounded-xl cursor-pointer flex items-center justify-center shrink-0">
                      <Upload className="w-3.5 h-3.5" />
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageUpload(e, false)}
                      />
                    </label>
                  </div>
                  {formData.image && (
                    <img src={formData.image} alt="Preview" className="h-20 w-auto rounded-lg mt-2 object-cover border" />
                  )}
                </div>

                <div>
                  <label className="block font-bold text-neutral-700 mb-1">Secondary / Technical Photo URL</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={formData.secondaryImage}
                      onChange={(e) => setFormData({ ...formData, secondaryImage: e.target.value })}
                      placeholder="https://... or /assets/..."
                      className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs font-mono"
                    />
                    <label className="px-3 py-2 bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 rounded-xl cursor-pointer flex items-center justify-center shrink-0">
                      <Upload className="w-3.5 h-3.5" />
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageUpload(e, true)}
                      />
                    </label>
                  </div>
                  {formData.secondaryImage && (
                    <img src={formData.secondaryImage} alt="Preview" className="h-20 w-auto rounded-lg mt-2 object-cover border" />
                  )}
                </div>
              </div>

              {uploadingImage && (
                <div className="text-xs text-blue-600 font-semibold animate-pulse">
                  Uploading image to Supabase Storage Bucket (public-media)...
                </div>
              )}

              {/* Paragraphs */}
              <div className="space-y-3 pt-2 border-t border-neutral-200">
                <div>
                  <label className="block font-bold text-neutral-700 mb-1">Lead Summary Paragraph</label>
                  <textarea
                    rows={2}
                    value={formData.leadParagraph}
                    onChange={(e) => setFormData({ ...formData, leadParagraph: e.target.value })}
                    placeholder="Short executive summary of the project..."
                    className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-neutral-700 mb-1">Detailed Technical Overview</label>
                  <textarea
                    rows={3}
                    value={formData.detailParagraph}
                    onChange={(e) => setFormData({ ...formData, detailParagraph: e.target.value })}
                    placeholder="Full operational, architectural and engineering description..."
                    className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-neutral-700 mb-1">
                    Scope Highlights (Enter one per line)
                  </label>
                  <textarea
                    rows={3}
                    value={rawHighlights}
                    onChange={(e) => setRawHighlights(e.target.value)}
                    placeholder="Target Capacity: 2.5–3 MTPA&#10;Technology: AI-Guided Drilling&#10;Sustainability: Closed-Loop Water Recycling"
                    className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 text-xs font-mono"
                  />
                </div>
              </div>

              {/* Submit / Cancel Buttons */}
              <div className="pt-4 border-t border-neutral-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-black text-white hover:bg-neutral-800 font-bold uppercase tracking-wider shadow-sm"
                >
                  Save to Supabase Cloud
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectManager;
