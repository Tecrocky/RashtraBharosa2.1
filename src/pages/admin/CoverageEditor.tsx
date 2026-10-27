import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save, Globe, Eye, Check, X, Newspaper, ExternalLink } from "lucide-react";
import { MediaCoverageItem, initialMediaCoverage } from "@/data/mediaData";

interface CoverageEditorProps {
  coverageId?: string;
  onSaveSuccess?: () => void;
  onCancel?: () => void;
}

export const CoverageEditor: React.FC<CoverageEditorProps> = ({
  coverageId,
  onSaveSuccess,
  onCancel,
}) => {
  const navigate = useNavigate();

  const [source, setSource] = useState("The Economic Times");
  const [publicationType, setPublicationType] = useState<MediaCoverageItem["publicationType"]>("Financial Press");
  const [headline, setHeadline] = useState("");
  const [author, setAuthor] = useState("Corporate Correspondent");
  const [date, setDate] = useState(
    new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
  );
  const [readTime, setReadTime] = useState("3 min read");
  const [summary, setSummary] = useState("");
  const [externalUrl, setExternalUrl] = useState("https://");
  const [topicInput, setTopicInput] = useState("");
  const [keyTopics, setKeyTopics] = useState<string[]>(["Corporate", "Strategic Growth"]);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  useEffect(() => {
    if (coverageId) {
      const saved: MediaCoverageItem[] = JSON.parse(
        localStorage.getItem("rbg_media_coverage") || "null"
      ) || initialMediaCoverage;
      const found = saved.find((c) => c.id === coverageId);
      if (found) {
        setSource(found.source);
        setPublicationType(found.publicationType);
        setHeadline(found.headline);
        setAuthor(found.author);
        setDate(found.date);
        setReadTime(found.readTime || "3 min read");
        setSummary(found.summary);
        setExternalUrl(found.externalUrl || "https://");
        setKeyTopics(found.keyTopics || []);
      }
    }
  }, [coverageId]);

  const handleAddTopic = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && topicInput.trim()) {
      e.preventDefault();
      if (!keyTopics.includes(topicInput.trim())) {
        setKeyTopics([...keyTopics, topicInput.trim()]);
      }
      setTopicInput("");
    }
  };

  const handleRemoveTopic = (t: string) => {
    setKeyTopics(keyTopics.filter((x) => x !== t));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!headline.trim() || !source.trim()) {
      alert("Please provide both Source Publication and Headline.");
      return;
    }

    const current: MediaCoverageItem[] = JSON.parse(
      localStorage.getItem("rbg_media_coverage") || "null"
    ) || initialMediaCoverage;

    const record: MediaCoverageItem = {
      id: coverageId || `COV-${Date.now()}`,
      source: source.trim(),
      publicationType,
      headline: headline.trim(),
      author: author.trim(),
      date: date.trim(),
      readTime: readTime.trim(),
      summary: summary.trim(),
      keyTopics,
      externalUrl: externalUrl.trim() || undefined,
    };

    const existingIndex = current.findIndex((c) => c.id === record.id);
    let updated: MediaCoverageItem[];
    if (existingIndex >= 0) {
      updated = [...current];
      updated[existingIndex] = record;
    } else {
      updated = [record, ...current];
    }

    localStorage.setItem("rbg_media_coverage", JSON.stringify(updated));
    setSuccessNotice("External Media Coverage published successfully to Media Centre!");

    setTimeout(() => {
      setSuccessNotice(null);
      if (onSaveSuccess) onSaveSuccess();
    }, 1000);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-16 font-sans">
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
              {coverageId ? "Edit Media Coverage" : "Post External Media Coverage"}
            </h2>
            <p className="text-xs text-neutral-500 font-mono">
              National Daily, Financial Press & Regional Broadcast Intelligence
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSave}
          className="px-5 py-2.5 rounded-xl bg-black hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm"
        >
          <Save className="w-3.5 h-3.5" />
          <span>Publish Coverage</span>
        </button>
      </div>

      {successNotice && (
        <div className="p-4 rounded-2xl bg-neutral-900 text-white text-xs flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-2 font-medium">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{successNotice}</span>
          </div>
          <button onClick={() => setSuccessNotice(null)} className="text-neutral-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSave} className="p-6 sm:p-8 rounded-3xl bg-white border border-neutral-200 space-y-6 shadow-sm text-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-neutral-600 font-bold uppercase tracking-wider mb-1.5">
              Source / Publication Name *
            </label>
            <input
              type="text"
              required
              value={source}
              onChange={(e) => setSource(e.target.value)}
              placeholder="e.g. The Economic Times, Business Standard, LiveMint..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="block text-neutral-600 font-bold uppercase tracking-wider mb-1.5">
              Publication Type *
            </label>
            <select
              value={publicationType}
              onChange={(e) => setPublicationType(e.target.value as any)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-black bg-white"
            >
              <option value="Financial Press">Financial Press</option>
              <option value="National Daily">National Daily</option>
              <option value="Industry Journal">Industry Journal</option>
              <option value="Regional Broadcast">Regional Broadcast</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-neutral-600 font-bold uppercase tracking-wider mb-1.5">
            Headline / Article Title *
          </label>
          <input
            type="text"
            required
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            placeholder="e.g. Rashtra Bharosa Group Consolidates Infrastructure SPVs..."
            className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-black font-semibold text-neutral-900"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-neutral-600 font-bold uppercase tracking-wider mb-1.5">
              Byline / Author
            </label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="e.g. Industrial Bureau"
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="block text-neutral-600 font-bold uppercase tracking-wider mb-1.5">
              Published Date
            </label>
            <input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="e.g. 14 Apr 2026"
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="block text-neutral-600 font-bold uppercase tracking-wider mb-1.5">
              Read Time
            </label>
            <input
              type="text"
              value={readTime}
              onChange={(e) => setReadTime(e.target.value)}
              placeholder="e.g. 3 min read"
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-black"
            />
          </div>
        </div>

        <div>
          <label className="block text-neutral-600 font-bold uppercase tracking-wider mb-1.5">
            External Article URL / Link
          </label>
          <div className="relative">
            <Globe className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="url"
              value={externalUrl}
              onChange={(e) => setExternalUrl(e.target.value)}
              placeholder="https://economictimes.indiatimes.com/article/..."
              className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-black font-mono"
            />
          </div>
        </div>

        <div>
          <label className="block text-neutral-600 font-bold uppercase tracking-wider mb-1.5">
            Executive Summary / Excerpt *
          </label>
          <textarea
            rows={4}
            required
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Brief 2-3 sentence synopsis of the news coverage..."
            className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-black leading-relaxed"
          />
        </div>

        <div>
          <label className="block text-neutral-600 font-bold uppercase tracking-wider mb-1.5">
            Key Topics (Press Enter to add)
          </label>
          <div className="flex flex-wrap items-center gap-1.5 mb-2">
            {keyTopics.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-800 text-[11px] font-semibold flex items-center gap-1"
              >
                {t}
                <button
                  type="button"
                  onClick={() => handleRemoveTopic(t)}
                  className="hover:text-red-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
          <input
            type="text"
            value={topicInput}
            onChange={(e) => setTopicInput(e.target.value)}
            onKeyDown={handleAddTopic}
            placeholder="Add topic (e.g. M&A, Clean Energy, Odisha) and press Enter"
            className="w-full px-3.5 py-2 rounded-xl border border-neutral-200 focus:outline-none focus:border-black"
          />
        </div>

        <div className="pt-4 border-t border-neutral-100 flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel || (() => navigate("/admin/dashboard"))}
            className="px-4 py-2 rounded-xl border border-neutral-200 text-neutral-600 hover:bg-neutral-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded-xl bg-black hover:bg-neutral-800 text-white font-semibold"
          >
            Publish Live
          </button>
        </div>
      </form>
    </div>
  );
};

export default CoverageEditor;
