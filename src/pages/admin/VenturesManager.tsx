import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Building2,
  Edit3,
  Save,
  Check,
  X,
  Plus,
  Trash2,
  ExternalLink,
  Layers,
  Sparkles,
} from "lucide-react";

export interface SubsidiaryItem {
  id: string;
  name: string;
  sector: string;
  path: string;
  badge: string;
  leadStatement: string;
  editorial: string;
  capabilities: string[];
}

export const defaultSubsidiaries: SubsidiaryItem[] = [
  {
    id: "mining",
    name: "RashBhar Mining",
    sector: "Mining & Mineral Operations",
    path: "/ventures/mining",
    badge: "Pillar 01 • Flagship",
    leadStatement: "Supplying primary raw minerals to power India's industrial manufacturing backbone and domestic energy security.",
    editorial: "RashBhar Mining forms the primary raw material foundation of the Rashtra Bharosa Group ecosystem. Operating mechanized extraction concessions in Eastern India's mineral-rich belts, the company focuses on responsible development of high-grade iron ore, thermal coal, and bauxite.",
    capabilities: [
      "High-grade Fe iron ore extraction & beneficiation circuits",
      "Direct dedicated rail freight dispatch & zero-choke logistics",
      "Progressive mine reclamation & botanical green-belt development",
      "AI-assisted mineral seam modeling & automated safety telemetry",
    ],
  },
  {
    id: "construction",
    name: "Innovex Construction",
    sector: "Construction & Infrastructure",
    path: "/ventures/infrastructure",
    badge: "Pillar 02 • Heavy EPC",
    leadStatement: "Translating architectural plans and strategic capital into high-assurance civil infrastructure and industrial EPC assets.",
    editorial: "Innovex Construction delivers heavy civil engineering, industrial EPC projects, and critical logistics infrastructure. Specializing in high-capacity bulk material handling systems, overland conveyor networks, industrial processing facilities, and regional transport arteries.",
    capabilities: [
      "Heavy industrial EPC & structural steel fabrication",
      "Long-distance bulk material overland conveyor systems",
      "Arterial highway logistics corridors & rail-linked infrastructure",
      "Turnkey structural precast fabrication yards",
    ],
  },
  {
    id: "healthcare",
    name: "RashBhar Health Care",
    sector: "Healthcare & Life Sciences",
    path: "/ventures/healthcare",
    badge: "Pillar 03 • Life Sciences",
    leadStatement: "Delivering advanced super-specialty tertiary healthcare, oncology institutes, and critical clinical access.",
    editorial: "RashBhar Health Care is dedicated to elevating clinical infrastructure across Eastern Bharat. Centered around our upcoming 500-bed flagship tertiary hospital in Bhubaneswar, the network integrates robotic surgical theatres, biplane cath labs, and digital tele-ICU outreach.",
    capabilities: [
      "500-bed multi-super-specialty hospital & oncology research institute",
      "Advanced biplane cardiac catheterization & digital OT suites",
      "24x7 Level-1 trauma care & air-ambulance landing capabilities",
      "Regional tele-ICU network connecting underserved rural clinics",
    ],
  },
  {
    id: "technology",
    name: "RashBhar Technology (VED RI)",
    sector: "Sovereign Deep-Tech & AI",
    path: "/ventures/technology",
    badge: "Pillar 04 • Deep-Tech",
    leadStatement: "Building sovereign artificial intelligence systems, air-gapped data platforms, and heavy industrial robotics.",
    editorial: "RashBhar Technology engineers indigenous sovereign digital technologies designed for enterprise autonomy and heavy industry. From tele-robotic control in open-cast mines to air-gapped sovereign AI systems, our solutions secure Bharat's digital frontier.",
    capabilities: [
      "RashtrAI™ Sovereign foundation models & optical compute clusters",
      "Autonomous heavy equipment telemetry & dispatch automation",
      "Zero-trust air-gapped industrial SCADA security architectures",
      "High-reliability sensor meshes for real-time asset tracking",
    ],
  },
  {
    id: "agriculture",
    name: "RashBhar Soil & Soul",
    sector: "Agritech & Soil Stewardship",
    path: "/ventures/agriculture",
    badge: "Pillar 05 • Agriscience",
    leadStatement: "Transforming smallholder agriculture through biodegradable polymer soil solutions and precision bio-nutrients.",
    editorial: "RashBhar Soil & Soul blends modern agriscience with environmental stewardship. Our proprietary biodegradable AgriGel™ polymer technology cuts crop irrigation requirements by 50% while rejuvenating degraded agricultural soil.",
    capabilities: [
      "AgriGel™ biodegradable starch-polymer moisture retention synthesis",
      "High-density organic farming clusters & cold-chain distribution",
      "Autonomous drone-based bio-nutrient spraying telemetry",
      "Direct farmer cooperative empowerment & soil testing clinics",
    ],
  },
  {
    id: "realestate",
    name: "RashBhar Real Estate",
    sector: "Sustainable Real Estate",
    path: "/ventures/realestate",
    badge: "Pillar 06 • Developments",
    leadStatement: "Designing iconic luxury residential towers and integrated sustainable commercial urban landmarks.",
    editorial: "RashBhar Real Estate conceives mastercrafted residential and commercial properties that redefine urban horizons. Projects such as Reyansh Elanza in Bhubaneswar feature biophilic architecture, IGBC Platinum compliance, and smart automation.",
    capabilities: [
      "Ultra-luxury high-rise residential towers (Reyansh Elanza)",
      "Integrated commercial business parks & tech hubs",
      "IGBC Platinum zero-liquid-discharge green building engineering",
      "Seismic-resilient construction with passive solar cooling",
    ],
  },
  {
    id: "investments",
    name: "RashBhar Capital & Treasury",
    sector: "Investments & SPV Treasury",
    path: "/ventures/investments",
    badge: "Pillar 07 • Capital Arm",
    leadStatement: "Deploying 100% promoter equity and structured SPV capital to fund high-barrier nation-building infrastructure.",
    editorial: "Following the strategic consolidation of Royal Birds Group Limited, RashBhar Capital & Treasury manages group treasury reserves, institutional co-investments, and public-private partnership (PPP) infrastructure Special Purpose Vehicles.",
    capabilities: [
      "Zero third-party debt promoter equity capital stewardship",
      "Infrastructure SPV structuring & project finance execution",
      "Sovereign incubation fund for Eastern Bharat deep-tech startups",
      "Institutional treasury & long-term asset-liability governance",
    ],
  },
];

export const VenturesManager: React.FC = () => {
  const [subsidiaries, setSubsidiaries] = useState<SubsidiaryItem[]>(() => {
    const saved = localStorage.getItem("rbg_subsidiaries_data");
    return saved !== null ? JSON.parse(saved) : defaultSubsidiaries;
  });

  const [selectedSub, setSelectedSub] = useState<SubsidiaryItem | null>(null);
  const [editingSub, setEditingSub] = useState<SubsidiaryItem | null>(null);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);
  const [newCapInput, setNewCapInput] = useState("");

  const handleEditClick = (sub: SubsidiaryItem) => {
    setEditingSub({ ...sub, capabilities: [...sub.capabilities] });
  };

  const handleAddCapability = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && newCapInput.trim() && editingSub) {
      e.preventDefault();
      setEditingSub({
        ...editingSub,
        capabilities: [...editingSub.capabilities, newCapInput.trim()],
      });
      setNewCapInput("");
    }
  };

  const handleRemoveCapability = (idx: number) => {
    if (!editingSub) return;
    const updatedCaps = editingSub.capabilities.filter((_, i) => i !== idx);
    setEditingSub({ ...editingSub, capabilities: updatedCaps });
  };

  const handleSaveSub = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSub) return;

    const updated = subsidiaries.map((s) => (s.id === editingSub.id ? editingSub : s));
    setSubsidiaries(updated);
    localStorage.setItem("rbg_subsidiaries_data", JSON.stringify(updated));
    setEditingSub(null);
    setSuccessNotice(`Updated details for ${editingSub.name} successfully!`);
    setTimeout(() => setSuccessNotice(null), 3500);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 pb-5">
        <div>
          <h2 className="text-xl font-bold text-neutral-900 tracking-tight">
            Group Subsidiaries & Ventures Manager
          </h2>
          <p className="text-xs text-neutral-500 font-mono">
            Manage editorial statements, overview, pillar badges, and core capabilities across all 7 group businesses.
          </p>
        </div>
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

      {/* List of Subsidiaries */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {subsidiaries.map((sub) => (
          <div
            key={sub.id}
            className="p-6 rounded-3xl bg-white border border-neutral-200 shadow-sm space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-neutral-100 text-neutral-800">
                  {sub.badge}
                </span>
                <span className="text-[11px] text-neutral-400 font-mono">{sub.sector}</span>
              </div>
              <h3 className="text-lg font-bold text-neutral-900">{sub.name}</h3>
              <p className="text-xs text-neutral-600 font-medium leading-relaxed italic">
                "{sub.leadStatement}"
              </p>
              <p className="text-xs text-neutral-500 line-clamp-3 leading-relaxed">
                {sub.editorial}
              </p>

              <div className="pt-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-400 block mb-1.5">
                  Core Capabilities ({sub.capabilities.length})
                </span>
                <ul className="space-y-1 text-[11px] text-neutral-700">
                  {sub.capabilities.slice(0, 3).map((cap, i) => (
                    <li key={i} className="flex items-start gap-1.5 truncate">
                      <span className="text-neutral-400">•</span>
                      <span className="truncate">{cap}</span>
                    </li>
                  ))}
                  {sub.capabilities.length > 3 && (
                    <li className="text-[10px] text-neutral-400 font-mono">+ {sub.capabilities.length - 3} more capabilities</li>
                  )}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-xs">
              <Link
                to={sub.path}
                target="_blank"
                className="px-3 py-1.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-semibold flex items-center gap-1"
              >
                <span>Live Venture</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
              <button
                onClick={() => handleEditClick(sub)}
                className="px-4 py-1.5 rounded-xl bg-black hover:bg-neutral-800 text-white text-xs font-semibold flex items-center gap-1.5"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Content</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Subsidiary Modal */}
      {editingSub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto space-y-5">
            <button
              onClick={() => setEditingSub(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b border-neutral-200 pb-3">
              <span className="text-xs font-mono font-bold text-neutral-400 uppercase">{editingSub.badge}</span>
              <h3 className="text-xl font-bold text-neutral-900 mt-0.5">Edit {editingSub.name} Content</h3>
            </div>

            <form onSubmit={handleSaveSub} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-neutral-700 uppercase tracking-wider mb-1">
                  Entity / Subsidiary Name
                </label>
                <input
                  type="text"
                  required
                  value={editingSub.name}
                  onChange={(e) => setEditingSub({ ...editingSub, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 font-bold text-neutral-900 focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block font-bold text-neutral-700 uppercase tracking-wider mb-1">
                  Pillar Badge / Tagline Label
                </label>
                <input
                  type="text"
                  required
                  value={editingSub.badge}
                  onChange={(e) => setEditingSub({ ...editingSub, badge: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 font-mono text-neutral-800 focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block font-bold text-neutral-700 uppercase tracking-wider mb-1">
                  Lead Vision Statement (Headline Quote)
                </label>
                <textarea
                  rows={2}
                  required
                  value={editingSub.leadStatement}
                  onChange={(e) => setEditingSub({ ...editingSub, leadStatement: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-neutral-900 focus:outline-none focus:border-black leading-relaxed"
                />
              </div>

              <div>
                <label className="block font-bold text-neutral-700 uppercase tracking-wider mb-1">
                  Main Editorial Description
                </label>
                <textarea
                  rows={4}
                  required
                  value={editingSub.editorial}
                  onChange={(e) => setEditingSub({ ...editingSub, editorial: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-neutral-900 focus:outline-none focus:border-black leading-relaxed"
                />
              </div>

              <div>
                <label className="block font-bold text-neutral-700 uppercase tracking-wider mb-1">
                  Core Capabilities & Mandates (Press Enter to Add)
                </label>
                <div className="space-y-1.5 mb-2">
                  {editingSub.capabilities.map((cap, i) => (
                    <div
                      key={i}
                      className="p-2 rounded-xl bg-neutral-50 border border-neutral-200 flex items-center justify-between text-xs text-neutral-800"
                    >
                      <span>{cap}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveCapability(i)}
                        className="text-neutral-400 hover:text-red-600 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
                <input
                  type="text"
                  value={newCapInput}
                  onChange={(e) => setNewCapInput(e.target.value)}
                  onKeyDown={handleAddCapability}
                  placeholder="Type new capability and press Enter..."
                  className="w-full px-3.5 py-2 rounded-xl border border-neutral-200 text-xs focus:outline-none focus:border-black"
                />
              </div>

              <div className="pt-4 border-t border-neutral-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingSub(null)}
                  className="px-4 py-2 rounded-xl border border-neutral-200 text-neutral-600 hover:bg-neutral-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-black hover:bg-neutral-800 text-white font-bold"
                >
                  Save & Publish Live
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VenturesManager;
