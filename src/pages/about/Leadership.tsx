import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  ShieldCheck,
  Building2,
  ChevronDown,
  X,
  Briefcase,
  Mail,
  Award,
  Pickaxe,
  HardHat,
  HeartPulse,
  Laptop,
  Sprout,
  Home as HomeIcon,
  TrendingUp,
  Search,
  UserCheck,
  Layers,
  Sparkles,
} from "lucide-react";
import AboutSubnav from "@/components/about/AboutSubnav";
import odishaHeroVideo from "@/assets/VIDEOS/odisha-hero.mp4";

// Dynamic Glob Imports directly from User-Managed Directories
const boardImages = import.meta.glob<{ default: string }>(
  "/src/assets/leadership/group/Board of Directors/*",
  { eager: true }
);
const getBoardImg = (keyName: string) => {
  const match = Object.entries(boardImages).find(([path]) =>
    path.toLowerCase().includes(keyName.toLowerCase())
  );
  return match ? match[1].default : "";
};

const csuiteImages = import.meta.glob<{ default: string }>(
  "/src/assets/leadership/group/Group C-Suite & Key Executive Officers/*",
  { eager: true }
);
const getCSuiteImg = (keyName: string) => {
  const match = Object.entries(csuiteImages).find(([path]) =>
    path.toLowerCase().includes(keyName.toLowerCase())
  );
  return match ? match[1].default : "";
};

const functionalImages = import.meta.glob<{ default: string }>(
  "/src/assets/leadership/group/Directors of Group Functions/*",
  { eager: true }
);
const getFunctionalImg = (keyName: string) => {
  const normKey = keyName.toLowerCase().replace(/[\u2013\u2014\-_\s]/g, "");
  const match = Object.entries(functionalImages).find(([path]) => {
    const normPath = path.toLowerCase().replace(/[\u2013\u2014\-_\s]/g, "");
    return normPath.includes(normKey);
  });
  return match ? match[1].default : "";
};

export interface Leader {
  name: string;
  role: string;
  category?: string;
  department?: string;
  img?: string;
  bio: string;
  credentials?: string;
  isHanger?: boolean;
}

export interface SubsidiaryLeadershipData {
  id: string;
  name: string;
  sector: string;
  icon: any;
  overview: string;
  board: Leader[];
  executive: Leader[];
  functional: Leader[];
}

// 1. BOARD OF DIRECTORS (8 Official Board Members)
const groupBoardLeaders: Leader[] = [
  {
    name: "Vikramaditiya Singh Rathore",
    role: "Chairman of the Board",
    category: "Board of Directors",
    img: getBoardImg("Chairman"),
    bio: "Provides overarching governance, macro capital allocation guidance, and institutional stewardship across the conglomerate's diversified multi-sector industrial portfolio.",
    credentials: "Institutional Governance & Capital Stewardship",
  },
  {
    name: "Subransu Mohanty",
    role: "Founder & Executive Director – Mining & Infrastructure",
    category: "Board of Directors",
    img: getBoardImg("Founder"),
    bio: "Founding promoter directing core mining concessions, large-scale EPC infrastructure execution, sovereign technology ventures, and group-wide strategic expansion.",
    credentials: "Mining Engineering & Promoter Stewardship",
  },
  {
    name: "Dr. Tanushri Agarwal",
    role: "Executive Director – Corporate Strategy & Investments",
    category: "Board of Directors",
    img: getBoardImg("Corporate Strategy"),
    bio: "Leads conglomerate corporate strategy, long-term capital investments, synergistic M&A appraisals, and multi-vertical expansion roadmaps.",
    credentials: "Corporate Strategy & Venture Capital",
  },
  {
    name: "Sanjay Nair",
    role: "Executive Director – Group Operations & Strategic Projects",
    category: "Board of Directors",
    img: getBoardImg("Group Operations"),
    bio: "Directs turnkey project mobilization, cross-subsidiary operational alignment, and national industrial execution across high-growth economic corridors.",
    credentials: "Heavy EPC & Mega Project Operations",
  },
  {
    name: "Ashish Gupta",
    role: "Non-Executive Director – Corporate Governance & Policy",
    category: "Board of Directors",
    img: getBoardImg("Corporate Governance"),
    bio: "Oversees corporate policy adherence, ESG benchmarks, and institutional stakeholder alignment under statutory governance frameworks.",
    credentials: "Corporate Policy & Governance Systems",
  },
  {
    name: "Vishwas Mehta",
    role: "Non-Executive Director – Business Advisory & Strategy",
    category: "Board of Directors",
    img: getBoardImg("Business Advisory"),
    bio: "Advises the executive leadership on macroeconomic trends, industrial value chain optimization, and commercial market positioning.",
    credentials: "Industrial Strategy & Macroeconomic Advisory",
  },
  {
    name: "Anil Kulkarni",
    role: "Independent Director – Audit & Risk Oversight",
    category: "Board of Directors",
    img: getBoardImg("Audit"),
    bio: "Chairs the Audit Committee, directing statutory financial oversight, enterprise risk appraisal, and zero-compromise regulatory compliance.",
    credentials: "Enterprise Risk & Financial Audit",
  },
  {
    name: "CA Rajesh Kumar",
    role: "Independent Director – Ethics, Compliance & Public Interest",
    category: "Board of Directors",
    img: getBoardImg("Ethics"),
    bio: "Guarantees public interest protection, whistleblower integrity, ethical charter enforcement, and statutory fiscal transparency.",
    credentials: "FCA, Corporate Ethics & Statutory Compliance",
  },
];

// 2. GROUP EXECUTIVE COMMITTEE / GROUP C-SUITE (5 Official Key Officers)
const groupCSuiteLeaders: Leader[] = [
  {
    name: "Prinseesh Yashraj Pratap",
    role: "Group Chief Executive Officer",
    category: "Group Executive",
    department: "Executive Command",
    img: getCSuiteImg("Group CEO"),
    bio: "Directs group-wide commercial operations, executive leadership alignment, capital project delivery, and multi-state enterprise execution across all five core verticals.",
    credentials: "Chief Executive Leadership & Strategic Scaling",
  },
  {
    name: "Ahaan Nambiar",
    role: "Group Chief Operating Officer",
    category: "Group Executive",
    department: "Operations",
    img: getCSuiteImg("Operating Officer"),
    bio: "Oversees operational workflows, operational safety benchmarks, multi-site mobilization, and cross-vertical execution synergy.",
    credentials: "Heavy Operations & Industrial Logistics",
  },
  {
    name: "Meera Venkataraman",
    role: "Group Chief Financial Officer",
    category: "Group Executive",
    department: "Finance & Treasury",
    img: getCSuiteImg("Financial Officer"),
    bio: "Manages capital structure, group treasury, debt-equity syndication, fiscal governance, and statutory financial reporting.",
    credentials: "Chartered Financial Leadership & Treasury",
  },
  {
    name: "Rajveer Singh",
    role: "Group Chief Legal Officer",
    category: "Group Executive",
    department: "Legal Affairs",
    img: getCSuiteImg("Legal Officer"),
    bio: "Leads group legal governance, statutory arbitration, mineral concession contracting, and regulatory dispute resolution.",
    credentials: "Corporate Law & Statutory Concessions",
  },
  {
    name: "Kyrazuri Aryal",
    role: "Group Company Secretary",
    category: "Group Executive",
    department: "Secretarial & Compliance",
    img: getCSuiteImg("Company Secretary"),
    bio: "Directs board secretarial compliance, statutory filings, shareholder governance, and institutional corporate secretarial charters.",
    credentials: "FCS, Corporate Secretarial Governance",
  },
];

// 3. GROUP DIRECTORS (16 Official Directors)
const groupFunctionalDirectors: Leader[] = [
  {
    name: "Kalyan Murali",
    role: "Group Director of Operations",
    category: "Group Director",
    img: getFunctionalImg("Group Operations"),
    bio: "Coordinates daily operational performance metrics, asset utilization, and production efficiency across all 7 subsidiaries.",
    credentials: "Operations Management & Industrial Engineering",
  },
  {
    name: "Sangeeta Prasad",
    role: "Group Director of Finance",
    category: "Group Director",
    img: getFunctionalImg("Finance"),
    bio: "Manages financial budgeting, working capital cycles, subsidiary accounting governance, and tax compliance.",
    credentials: "Corporate Finance & Fiscal Controllership",
  },
  {
    name: "Ankita Trivedi",
    role: "Group Director of Human Resources",
    category: "Group Director",
    img: getFunctionalImg("Human Resources"),
    bio: "Directs employee engagement, technical workforce hiring, training academies, and corporate HR policy execution.",
    credentials: "Strategic Talent Management & People Operations",
  },
  {
    name: "Rajesh Sharma",
    role: "Group Director of Corporate Affairs",
    category: "Group Director",
    img: getFunctionalImg("Corporate Affairs"),
    bio: "Maintains statutory liaison with government bodies, state industrial development corporations, and regulatory agencies.",
    credentials: "Corporate Relations & Institutional Liaison",
  },
  {
    name: "Mohan Rathore",
    role: "Group Director of Supply Chain",
    category: "Group Director",
    img: getFunctionalImg("Supply Chain"),
    bio: "Optimizes multimodal freight routes, rake logistics, port dispatches, and warehouse operations across India.",
    credentials: "Integrated Supply Chain & Freight Logistics",
  },
  {
    name: "Rohit Kapoor",
    role: "Group Director of Strategy & Planning",
    category: "Group Director",
    img: getFunctionalImg("Strategy"),
    bio: "Analyzes feasibility studies, new project capital expenditure models, and market intelligence for group expansion.",
    credentials: "Strategic Planning & Capital Allocation",
  },
  {
    name: "Sumit Ahlawat",
    role: "Group Director of Quality, Safety & Sustainability",
    category: "Group Director",
    img: getFunctionalImg("Quality"),
    bio: "Enforces zero-harm safety standards, on-site hazard prevention, and environmental compliance audits at all work locations.",
    credentials: "EHS Management & Industrial Safety Protocols",
  },
  {
    name: "Amit Srivastava",
    role: "Group Director of Information & Technology",
    category: "Group Director",
    img: getFunctionalImg("Information"),
    bio: "Directs internal network engineering, enterprise security operations, and digital workflow tools for group personnel.",
    credentials: "IT Infrastructure & Network Engineering",
  },
  {
    name: "V. Narayanan Iyer",
    role: "Group Director of Legal & Compliance",
    category: "Group Director",
    img: getFunctionalImg("Legal"),
    bio: "Drafts high-value vendor and EPC contracts, oversees compliance filings, and manages statutory legal documentation.",
    credentials: "Corporate Law & Contractual Governance",
  },
  {
    name: "Harishankar Mehta",
    role: "Group Director of Investments",
    category: "Group Director",
    img: getFunctionalImg("Investments"),
    bio: "Conducts due diligence on strategic equity stakes, promoter investments, and venture co-investments.",
    credentials: "Investment Analysis & Private Equity",
  },
  {
    name: "Sanjay Dev Kapoor",
    role: "Group Director of Business Development",
    category: "Group Director",
    img: getFunctionalImg("Business Development"),
    bio: "Builds strategic enterprise partnerships, institutional client relationships, and public-private partnership (PPP) opportunities.",
    credentials: "B2B Sales & Enterprise Partnerships",
  },
  {
    name: "Madhuri Ramanathan",
    role: "Group Director of Communications",
    category: "Group Director",
    img: getFunctionalImg("Communications"),
    bio: "Steers internal brand messaging, corporate publications, annual reports, and digital stakeholder newsletters.",
    credentials: "Strategic Communications & Media Production",
  },
  {
    name: "Pradeep Chandra Bose",
    role: "Group Director of Risk Management",
    category: "Group Director",
    img: getFunctionalImg("Risk Management"),
    bio: "Monitors operational risk matrices, credit risk evaluations, and insurance risk mitigation across group assets.",
    credentials: "Risk Appraisal & Asset Protection",
  },
  {
    name: "K. S. Srinivasan",
    role: "Group Director of Procurement",
    category: "Group Director",
    img: getFunctionalImg("Procurement"),
    bio: "Leads bulk raw material sourcing, equipment purchasing, and vendor rate negotiation for major projects.",
    credentials: "Strategic Procurement & Supply Management",
  },
  {
    name: "Ashok Vardhan Singh",
    role: "Group Director of Projects",
    category: "Group Director",
    img: getFunctionalImg("Projects"),
    bio: "Manages on-ground construction milestones, structural engineering contractors, and commissioning timelines.",
    credentials: "Civil Engineering & Project Execution",
  },
  {
    name: "Nirmala Krishnamurthy",
    role: "Group Director of Sustainability",
    category: "Group Director",
    img: getFunctionalImg("Director - Sustainability"),
    bio: "Directs community development programs, rural water conservation initiatives, and corporate social responsibility (CSR) programs.",
    credentials: "Sustainable Development & CSR Leadership",
  },
];

const Leadership: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"board" | "csuite" | "directors">("board");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const getInitials = (name: string) => {
    return name
      .replace(/^(Dr\.|CA|Mr\.|Ms\.|Mrs\.)\s*/i, "")
      .split(" ")
      .map((n) => n[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  const getShortBio = (leader: Leader) => {
    if (leader.name.includes("Subransu Mohanty")) {
      return "Subransu Mohanty is Founder & Executive Director – Mining & Infrastructure at Rashtra Bharosa Group. He served as Chairperson from April 2025 to August 2026, previously founded Innovex Construction, served as CEO & MD of Royal Birds Group, and holds a B.Tech from BPUT, Odisha.";
    }
    if (leader.name.includes("Vikramadit") || leader.name.includes("Rathore")) {
      return "Vikramaditya Singh Rathore serves as Chairman of Rashtra Bharosa Group (assumed 26 August 2026), bringing 30+ years in mining. He previously served as MD of Rathore Mining Corp, CEO of Utkal Mining, and holds an IIT ISM Dhanbad B.Tech, XLRI PGDM, and IIM Ahmedabad credential.";
    }
    if (leader.name.includes("Prinseesh Yashraj Pratap")) {
      return "Prinseesh Yashraj Pratap serves as Group Chief Executive Officer at Rashtra Bharosa Group, leading strategy across 5 core verticals. He previously served as CAO at Innovex Construction and holds an MBA from Ranchi University and a B.Tech from BPUT, Odisha.";
    }
    if (leader.bio) {
      return `${leader.name} is ${leader.role} at Rashtra Bharosa Group, responsible for ${leader.bio.charAt(0).toLowerCase() + leader.bio.slice(1)}${leader.credentials ? ` Bringing deep domain experience in ${leader.credentials}.` : ""}`;
    }
    return `${leader.name} is ${leader.role} at Rashtra Bharosa Group, contributing to the Group’s strategic and operational priorities.`;
  };

  const renderLeaderCard = (leader: Leader, index: number) => {
    const initials = getInitials(leader.name);
    const apexLink = getApexLink(leader.name);

    const CardContent = (
      <div className="bg-white rounded-lg border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col justify-between group h-full">
        <div>
          {/* Card Portrait Header - 4:5 Editorial Portrait Ratio */}
          <div className="aspect-[4/5] bg-[#F8FAFC] overflow-hidden relative flex items-center justify-center">
            {leader.img && !leader.isHanger ? (
              <img
                src={leader.img}
                alt={leader.name}
                className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-700"
              />
            ) : (
              /* Distinguished Institutional Directorate Placeholder */
              <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-[#062B63]/5 via-white to-slate-100 relative group-hover:bg-[#062B63]/10 transition-colors">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#062B63] text-brand-gold font-bold text-xl sm:text-2xl flex items-center justify-center shadow-md border border-brand-gold/40 mb-3">
                  {initials}
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded text-[10px] font-semibold uppercase tracking-[0.14em] bg-[#062B63]/10 text-[#062B63]">
                  <Users size={11} /> Rashtra Bharosa Directorate
                </div>
              </div>
            )}

            {leader.category && (
              <div className="absolute top-3 left-3 bg-[#062B63]/90 backdrop-blur-md text-brand-gold px-2.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-[0.16em] shadow-xs">
                {leader.category}
              </div>
            )}
          </div>

          {/* Clean Editorial Content: Name, Role and Short Concise Monograph */}
          <div className="p-5 sm:p-6 space-y-2.5">
            <h4 className="text-base sm:text-lg font-bold text-[#062B63] group-hover:text-brand-gold transition-colors leading-tight">
              {leader.name}
            </h4>
            <div className="text-xs sm:text-[13px] font-semibold text-[#A87930] uppercase tracking-[0.12em] leading-snug">
              {leader.role}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed pt-2.5 border-t border-slate-100 font-normal">
              {getShortBio(leader)}
            </p>
          </div>
        </div>

        {apexLink && (
          <div className="px-5 sm:px-6 pb-5 pt-0">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#062B63] group-hover:text-brand-gold transition-colors uppercase tracking-[0.14em]">
              View Full Monograph &rarr;
            </span>
          </div>
        )}
      </div>
    );

    if (apexLink) {
      return (
        <Link key={index} to={apexLink} className="block h-full">
          {CardContent}
        </Link>
      );
    }

    return (
      <div key={index} className="h-full">
        {CardContent}
      </div>
    );
  };

  const filterLeaders = (list: Leader[]) => {
    if (!searchQuery.trim()) return list;
    const q = searchQuery.toLowerCase();
    return list.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        l.role.toLowerCase().includes(q) ||
        (l.credentials && l.credentials.toLowerCase().includes(q)) ||
        (l.department && l.department.toLowerCase().includes(q))
    );
  };

  const isApexLeader = (name: string) => {
    return (
      name.includes("Subransu Mohanty") ||
      name.includes("Vikramaditiya Singh Rathore") ||
      name.includes("Prinseesh Yashraj Pratap")
    );
  };

  const getApexLink = (name: string) => {
    if (name.includes("Subransu Mohanty")) return "/about/founder";
    if (name.includes("Vikramaditiya Singh Rathore")) return "/about/chairman";
    if (name.includes("Prinseesh Yashraj Pratap")) return "/about/ceo";
    return null;
  };

  const formatLeaderBio = (leader: Leader): string => {
    const femaleNames = [
      "Tanushri", "Meera", "Kyrazuri", "Shalini", "Meenakshi", "Sneha", "Sonali", "Ananya", "Pooja", "Ritu", "Neha", "Divya", "Swati", "Kavita", "Sunita", "Anita"
    ];
    const isFemale = femaleNames.some((f) => leader.name.includes(f));
    const pronoun = isFemale ? "She" : "He";

    const cleanResp = leader.bio
      ? leader.bio.replace(
          /^(Provides|Directs|Leads|Manages|Oversees|Chairs|Supervises|Architects|Harmonizes|Guarantees|Advises|Coordinates|Enforces|Drives)/i,
          (m) => m.toLowerCase()
        )
      : `leading strategic priorities within the ${leader.department || "executive"} division`;

    return `${leader.name} is ${leader.role} at Rashtra Bharosa Group, responsible for ${cleanResp}. ${pronoun} has been involved in group-wide institutional capacity building and operational delivery, bringing extensive experience in ${
      leader.credentials || "industrial management and corporate operations"
    }. ${pronoun} holds professional qualifications from accredited institutions with specialized domain expertise.`;
  };

  return (
    <div className="bg-white text-[#1F2937] font-sans antialiased min-h-screen">
      {/* 1. Full-Bleed Conglomerate Hero Section with Indian Corporate Leadership Team Backdrop */}
      <section className="relative pt-44 pb-16 lg:pt-56 lg:pb-24 overflow-hidden flex items-end min-h-[460px] lg:min-h-[520px] bg-[#041633]">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&w=2000&q=80"
            alt="Indian Corporate Leadership Council and Directors"
            className="w-full h-full object-cover object-center scale-105"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#041633] via-[#041633]/85 to-[#041633]/60 z-0 pointer-events-none" />

        <div className="max-w-[1500px] w-full mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
          <div className="max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2.5">
              <span className="w-6 h-[2px] bg-brand-gold" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-gold">
                Leadership & Governance Directory
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-light tracking-tight text-white leading-tight">
              <strong className="font-semibold text-white">Leadership Directory</strong>
            </h1>
            <p className="text-sm sm:text-base font-medium text-slate-200 uppercase tracking-[0.16em]">
              Board of Directors • Group Executive Committee • Group Directors
            </p>
          </div>
        </div>
      </section>

      {/* Sub-Navigation */}
      <AboutSubnav />

      {/* Main Leadership Category Selector & Search Bar */}
      <section className="py-6 bg-[#F8FAFC] border-b border-slate-200 sticky top-[100px] md:top-[108px] z-30 shadow-xs">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            {/* Category Switcher Tabs */}
            <div className="flex items-center p-1 bg-slate-200/80 rounded-lg w-full lg:w-auto overflow-x-auto">
              <button
                type="button"
                onClick={() => setActiveTab("board")}
                className={`px-4 sm:px-5 py-2 rounded text-xs font-bold uppercase tracking-[0.14em] transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === "board"
                    ? "bg-[#062B63] text-brand-gold shadow-sm"
                    : "text-slate-700 hover:text-[#062B63]"
                }`}
              >
                1. Board of Directors (8)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("csuite")}
                className={`px-4 sm:px-5 py-2 rounded text-xs font-bold uppercase tracking-[0.14em] transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === "csuite"
                    ? "bg-[#062B63] text-brand-gold shadow-sm"
                    : "text-slate-700 hover:text-[#062B63]"
                }`}
              >
                2. Group C-Suite Officers (5)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("directors")}
                className={`px-4 sm:px-5 py-2 rounded text-xs font-bold uppercase tracking-[0.14em] transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === "directors"
                    ? "bg-[#062B63] text-brand-gold shadow-sm"
                    : "text-slate-700 hover:text-[#062B63]"
                }`}
              >
                3. Group Directors (16)
              </button>
            </div>

            {/* Quick Search Input */}
            <div className="relative w-full lg:w-72">
              <input
                type="text"
                placeholder="Search leadership by name or role..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-lg text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#062B63]"
              />
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X size={12} />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="py-14 lg:py-20">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-12">
          {/* TAB 1: BOARD OF DIRECTORS */}
          {activeTab === "board" && (
            <div className="space-y-10">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-200">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#062B63]">
                    <ShieldCheck size={14} className="text-brand-gold" />
                    <span>Apex Governing Body</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase">
                    Board of Directors
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 max-w-md">
                  Fiduciary trustees responsible for capital allocation, audit compliance, ethical charters, and statutory governance.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filterLeaders(groupBoardLeaders).map((leader, idx) => renderLeaderCard(leader, idx))}
              </div>
            </div>
          )}

          {/* TAB 2: GROUP C-SUITE OFFICERS */}
          {activeTab === "csuite" && (
            <div className="space-y-10">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-200">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#062B63]">
                    <Briefcase size={14} className="text-brand-gold" />
                    <span>Group Executive Directorate</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase">
                    Group C-Suite Officers
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 max-w-md">
                  Executive leadership team steering conglomerate operations, commercial strategy, technology architecture, and institutional growth.
                </p>
              </div>

              {/* 5 Leaders in a single row on desktop */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5">
                {filterLeaders(groupCSuiteLeaders).map((leader, idx) => renderLeaderCard(leader, idx))}
              </div>
            </div>
          )}

          {/* TAB 3: GROUP DIRECTORS */}
          {activeTab === "directors" && (
            <div className="space-y-10">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-200">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#062B63]">
                    <Layers size={14} className="text-brand-gold" />
                    <span>Group Directors & Execution</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase">
                    Group Directors
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 max-w-md">
                  Group directors leading operational domains across operations, finance, supply chain, risk, legal, human resources, and sustainability.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filterLeaders(groupFunctionalDirectors).map((leader, idx) => renderLeaderCard(leader, idx))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Leadership;
