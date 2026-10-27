import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Eye,
  Save,
  Send,
  Upload,
  Briefcase,
  Check,
  X,
  Plus,
  Trash2,
  Calendar,
  Building2,
  MapPin,
  Tag,
  DollarSign,
  Users,
} from "lucide-react";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { JobOpening, initialJobOpenings } from "@/data/careersData";
import { supabase } from "@/lib/supabase";
import { saveJob, getJobs } from "@/services/cmsService";

interface CareerEditorProps {
  jobId?: string;
  onSaveSuccess?: () => void;
  onCancel?: () => void;
}

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

const departments = [
  "Mining Operations & Geology",
  "Heavy Civil & Structural Engineering",
  "Clinical Medicine & Healthcare",
  "Artificial Intelligence & Software Systems",
  "Corporate Strategy, Treasury & Investments",
  "Supply Chain, Procurement & Logistics",
  "Human Resources & Talent Acquisition",
  "Legal, Compliance & Public Policy",
];

export const CareerEditor: React.FC<CareerEditorProps> = ({
  jobId,
  onSaveSuccess,
  onCancel,
}) => {
  const navigate = useNavigate();
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [skillInput, setSkillInput] = useState("");

  // Section 1: Job Identity
  const [id, setId] = useState(() => `JOB-2026-${Math.floor(100 + Math.random() * 900)}`);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [company, setCompany] = useState("RashBhar Mining");
  const [department, setDepartment] = useState("Mining Operations & Geology");

  // Section 2: Location
  const [country, setCountry] = useState("India");
  const [state, setState] = useState("Odisha");
  const [city, setCity] = useState("Bhubaneswar");
  const [officeLocation, setOfficeLocation] = useState("Corporate Headquarters, Forest Park");

  // Section 3: Employment Info
  const [employmentType, setEmploymentType] = useState("Full Time");
  const [workplaceType, setWorkplaceType] = useState<"On-site" | "Hybrid" | "Remote">("On-site");
  const [openings, setOpenings] = useState(3);

  // Section 4: Experience & Skills
  const [minExp, setMinExp] = useState("5");
  const [maxExp, setMaxExp] = useState("8");
  const [qualifications, setQualifications] = useState("B.Tech / B.E. in Mining Engineering or Geology");
  const [skills, setSkills] = useState<string[]>([
    "Heavy Equipment Operations",
    "Mine Planning Software",
    "DGMS Compliance",
    "Beneficiation Telemetry",
  ]);

  // Section 5: Rich Job Descriptions
  const [overview, setOverview] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [requirements, setRequirements] = useState("");
  const [benefits, setBenefits] = useState("");

  // Section 6: Compensation
  const [salaryRange, setSalaryRange] = useState("₹ 18,00,000 – ₹ 26,00,000 P.A.");
  const [showSalary, setShowSalary] = useState(true);

  // Section 7: Dates & Status
  const [openingDate, setOpeningDate] = useState(new Date().toISOString().split("T")[0]);
  const [deadline, setDeadline] = useState("2026-11-15");
  const [status, setStatus] = useState<"Active" | "Closed" | "Draft">("Active");
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  useEffect(() => {
    if (jobId) {
      const loadJob = async () => {
        const list = await getJobs();
        const found = list.find((j: JobOpening) => j.id === jobId);
        if (found) {
          setId(found.id);
          setTitle(found.title);
          setCompany(found.vertical);
          setDepartment(found.department || "Mining Operations");
          setCity(found.location.split(",")[0]?.trim() || "Bhubaneswar");
          setEmploymentType(found.type);
          setMinExp(found.experience);
          setQualifications(found.qualifications || "");
          setSkills(found.skills || []);
          setOverview(found.description || "");
          setStatus(found.status === "Closed" ? "Closed" : "Active");
        }
      };
      loadJob();
    }
  }, [jobId]);

  const generateSlug = (text: string) => {
    return text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
  };

  const handleAddSkill = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && skillInput.trim()) {
      e.preventDefault();
      if (!skills.includes(skillInput.trim())) {
        setSkills([...skills, skillInput.trim()]);
      }
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  const handleSave = async (targetStatus: "Draft" | "Active") => {
    if (!title.trim()) {
      alert("Please enter a Job Title.");
      return;
    }

    const record: JobOpening = {
      id: id.trim(),
      title: title.trim(),
      vertical: company,
      department,
      location: `${city}, ${state}, ${country}`,
      type: employmentType,
      workplaceType,
      experience: `${minExp}–${maxExp} Years`,
      openings,
      description: overview || title,
      responsibilities: [
        "Lead on-site operational engineering and safety compliance protocols.",
        "Collaborate with Directorate executives on throughput optimization.",
      ],
      qualifications,
      skills,
      benefits: ["Executive Health Insurance", "Annual Performance Bonus", "Company Transit"],
      postedDate: openingDate,
      closingDate: deadline,
      status: targetStatus === "Draft" ? "Closed" : "Active",
      salary: showSalary ? salaryRange : undefined,
    };

    const res = await saveJob(record);
    if (!res.success) {
      alert(`Failed to save job to Supabase cloud: ${res.error || "Unknown error"}`);
      return;
    }

    setSuccessNotice(targetStatus === "Active" ? "Job opportunity published live to Careers portal via Supabase!" : "Job saved as draft in Supabase.");
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
              {jobId ? "Edit Job Opportunity" : "Post New Job Opportunity"}
            </h2>
            <p className="text-xs text-neutral-500 font-mono">
              Talent Acquisition & Executive ATS Portal
            </p>
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
            onClick={() => handleSave("Active")}
            className="px-5 py-2 rounded-xl bg-black hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Publish Job</span>
          </button>
        </div>
      </div>

      {successNotice && (
        <div className="p-4 rounded-2xl bg-neutral-900 text-white text-xs font-medium flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{successNotice}</span>
        </div>
      )}

      {/* Main Form */}
      <div className="space-y-8">
        {/* SECTION 1: Job Info */}
        <div className="p-6 rounded-3xl bg-white border border-neutral-200 shadow-sm space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-100 pb-2">
            Section 1 — Job Information & Subsidiary
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">Job ID *</label>
              <input
                type="text"
                required
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder="JOB-2026-0001"
                className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-mono font-bold text-neutral-900 focus:outline-none focus:border-black"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-neutral-700 mb-1">Job Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (!slug) setSlug(generateSlug(e.target.value));
                }}
                placeholder="e.g. Senior Mining Engineer — Beneficiation Operations"
                className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-semibold text-neutral-900 focus:outline-none focus:border-black"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">Company / Subsidiary *</label>
              <select
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none"
              >
                {subsidiaries.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">Department *</label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none"
              >
                {departments.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* SECTION 2: Location & Work Mode */}
        <div className="p-6 rounded-3xl bg-white border border-neutral-200 shadow-sm space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-100 pb-2">
            Section 2 — Location & Employment Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">Country</label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">State</label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">City</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">Office / Plant Unit</label>
              <input
                type="text"
                value={officeLocation}
                onChange={(e) => setOfficeLocation(e.target.value)}
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">Employment Type</label>
              <select
                value={employmentType}
                onChange={(e) => setEmploymentType(e.target.value)}
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none"
              >
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
                <option value="Apprenticeship">Apprenticeship</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">Workplace Type</label>
              <select
                value={workplaceType}
                onChange={(e) => setWorkplaceType(e.target.value as any)}
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none"
              >
                <option value="On-site">On-site (Plant / Office)</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Remote">Remote</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">Number of Openings</label>
              <input
                type="number"
                min={1}
                value={openings}
                onChange={(e) => setOpenings(parseInt(e.target.value) || 1)}
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* SECTION 3: Experience, Qualification & Skills */}
        <div className="p-6 rounded-3xl bg-white border border-neutral-200 shadow-sm space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-100 pb-2">
            Section 3 — Qualifications, Experience & Skill Tags
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">Required Experience</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={minExp}
                  onChange={(e) => setMinExp(e.target.value)}
                  placeholder="Min (e.g. 5)"
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900"
                />
                <span className="text-xs text-neutral-400">to</span>
                <input
                  type="text"
                  value={maxExp}
                  onChange={(e) => setMaxExp(e.target.value)}
                  placeholder="Max (e.g. 8)"
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900"
                />
                <span className="text-xs text-neutral-500">Years</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">Minimum Qualification</label>
              <input
                type="text"
                value={qualifications}
                onChange={(e) => setQualifications(e.target.value)}
                placeholder="e.g. B.Tech / MBA / MBBS"
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none focus:border-black"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">Skill Tags</label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {skills.map((s) => (
                <span
                  key={s}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-neutral-100 text-neutral-800 text-xs font-medium"
                >
                  <span>{s}</span>
                  <button type="button" onClick={() => handleRemoveSkill(s)} className="hover:text-black">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <input
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={handleAddSkill}
              placeholder="Type skill & press Enter (e.g. Mine Safety, AutoCAD, EPC)..."
              className="w-full px-3.5 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none focus:border-black"
            />
          </div>
        </div>

        {/* SECTION 4: Descriptions */}
        <div className="p-6 rounded-3xl bg-white border border-neutral-200 shadow-sm space-y-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-100 pb-2">
            Section 4 — Comprehensive Job Description
          </h3>

          <div>
            <label className="block text-xs font-semibold text-neutral-800 mb-1.5">Job Overview & Purpose</label>
            <RichTextEditor
              value={overview}
              onChange={setOverview}
              placeholder="Provide an overview of the role, team dynamics, and core mandate..."
              minHeight="180px"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-800 mb-1.5">Key Responsibilities</label>
            <RichTextEditor
              value={responsibilities}
              onChange={setResponsibilities}
              placeholder="Outline daily duties, project leadership expectations, and reporting lines..."
              minHeight="180px"
            />
          </div>
        </div>

        {/* SECTION 5: Compensation & Dates */}
        <div className="p-6 rounded-3xl bg-white border border-neutral-200 shadow-sm space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-100 pb-2">
            Section 5 — Compensation & Application Deadlines
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-neutral-700">Salary / CTC (Optional)</label>
                <label className="flex items-center gap-1 text-[11px] text-neutral-500 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showSalary}
                    onChange={(e) => setShowSalary(e.target.checked)}
                    className="rounded text-black"
                  />
                  <span>Show on public page</span>
                </label>
              </div>
              <input
                type="text"
                value={salaryRange}
                onChange={(e) => setSalaryRange(e.target.value)}
                placeholder="e.g. ₹ 24–32 LPA"
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">Opening Date</label>
              <input
                type="date"
                value={openingDate}
                onChange={(e) => setOpeningDate(e.target.value)}
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">Application Deadline</label>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-3xl bg-white rounded-3xl p-8 max-h-[85vh] overflow-y-auto space-y-6 relative">
            <button
              onClick={() => setShowPreviewModal(false)}
              className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b border-neutral-200 pb-4">
              <span className="px-2.5 py-1 rounded-full bg-neutral-100 text-xs font-mono font-bold uppercase text-neutral-700">
                {id} • {company}
              </span>
              <h1 className="text-2xl font-serif font-bold text-neutral-900 mt-2">{title || "Untitled Job"}</h1>
              <p className="text-xs text-neutral-500 font-mono mt-1">
                {city}, {state} • {employmentType} • {workplaceType} • Deadline: {deadline}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 bg-neutral-50 rounded-2xl text-xs">
              <div>
                <span className="text-neutral-500">Experience</span>
                <div className="font-bold text-neutral-900">{minExp}–{maxExp} Years</div>
              </div>
              <div>
                <span className="text-neutral-500">Qualification</span>
                <div className="font-bold text-neutral-900">{qualifications}</div>
              </div>
              <div>
                <span className="text-neutral-500">Compensation</span>
                <div className="font-bold text-neutral-900">{showSalary ? salaryRange : "Undisclosed"}</div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-neutral-900">Description</h4>
              <div className="prose prose-neutral max-w-none text-xs" dangerouslySetInnerHTML={{ __html: overview || "<p>No description written.</p>" }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CareerEditor;
