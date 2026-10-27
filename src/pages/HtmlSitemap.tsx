import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Globe,
  Shield,
  ArrowUpRight,
  FileText,
  ChevronRight,
  Search,
  Building2,
  Pickaxe,
  HardHat,
  HeartPulse,
  Laptop,
  Sprout,
  Home as HomeIcon,
  TrendingUp,
  Brain,
  Scale,
  Briefcase,
  Layers,
  Newspaper,
  Phone,
  Mail,
  Award,
  CheckCircle2,
  FileSpreadsheet
} from "lucide-react";
import MetaTags from "@/components/MetaTags";

interface SitemapLink {
  name: string;
  path: string;
  description: string;
  badge?: string;
}

interface SitemapSection {
  id: string;
  category: string;
  icon: React.ElementType;
  description: string;
  links: SitemapLink[];
}

const sitemapData: SitemapSection[] = [
  {
    id: "governance",
    category: "1. Corporate Governance, Leadership & Heritage",
    icon: Building2,
    description: "Foundational architecture, promoter vision, statutory board committees, executive directorate, and long-term industrial roadmap.",
    links: [
      {
        name: "Group Overview & Foundational Heritage",
        path: "/about",
        description: "Core industrial philosophy, multi-decade nation-building mandate, ethical foundation, and macro-economic contributions.",
        badge: "Core"
      },
      {
        name: "Corporate Profile & Asset Holdings",
        path: "/about/corporate-profile",
        description: "Institutional portfolio overview, multi-sector capitalization, balance sheet resilience, and consolidated conglomerate asset footprint.",
      },
      {
        name: "Group Structure & Subsidiary Architecture",
        path: "/about/group-structure",
        description: "Legal entity hierarchy, parent holding company governance, autonomous operating divisions, and subsidiary ownership matrix.",
      },
      {
        name: "Corporate Governance & Fiduciary Oversight",
        path: "/about/corporate-governance",
        description: "Board charters, independent directors, audit and risk management committees, statutory disclosures, and compliance frameworks.",
      },
      {
        name: "Strategic Journey & Growth Roadmap 2030",
        path: "/about/strategic-journey",
        description: "Chronological milestones from regional founding to national conglomerate scale, capital allocation targets, and Viksit Bharat 2030 vision.",
      },
      {
        name: "Office of the Founder — Subransu Mohanty",
        path: "/about/founder",
        description: "Promoter profile, executive leadership philosophy, nation-first industrial doctrine, and strategic corporate vision.",
        badge: "Promoter"
      },
      {
        name: "Office of the Chairman — Vikramaditya Singh Rathore",
        path: "/about/chairman",
        description: "Board stewardship, long-term stakeholder governance, capital allocation prudence, and sovereign policy alignment.",
        badge: "Board"
      },
      {
        name: "Office of the Group CEO — Prinseesh Yashraj Pratap",
        path: "/about/ceo",
        description: "Executive operational command, strategic project delivery, cross-vertical operational synergies, and performance benchmarks.",
        badge: "Executive"
      },
      {
        name: "Complete Leadership Directory & Executive Council",
        path: "/about/leadership",
        description: "Detailed biographies of directors, technical division heads, medical directors, and chief financial officers across all subsidiaries.",
      },
      {
        name: "Her Legacy — Dr. Vedanshii Memorial",
        path: "/her-legacy",
        description: "Philanthropic foundation, charitable rural healthcare trusts, educational scholarships, and memorial social welfare initiatives.",
        badge: "Memorial"
      }
    ],
  },
  {
    id: "operating-pillars",
    category: "2. The Seven Operating Business Pillars & Subsidiaries",
    icon: Layers,
    description: "Seven autonomous operating subsidiaries driving core industrial extraction, heavy infrastructure EPC, healthcare delivery, technology, agritech, real estate, and capital management.",
    links: [
      {
        name: "Seven Pillars Operating Architecture Master Hub",
        path: "/businesses",
        description: "Comprehensive multi-vertical industrial ecosystem overview connecting resources, construction, healthcare, technology, farming, realty, and capital.",
        badge: "Pillars"
      },
      {
        name: "RashBhar Mining Corporation — Overview & Concessions",
        path: "/ventures/mining",
        description: "Mechanized open-cast extraction, iron ore beneficiation, bauxite mining, raw mineral processing, and sustainable concession management in Eastern India.",
      },
      {
        name: "Mining — Active Concessions & Operational Pits",
        path: "/ventures/mining/current-projects",
        description: "Live extraction sites in Keonjhar and Sundargarh belts, on-site beneficiation plants, and automated mineral logistics pipelines.",
      },
      {
        name: "Mining — Upcoming Concessions & Exploration",
        path: "/ventures/mining/upcoming-projects",
        description: "Next-generation deep-seam exploration, rare mineral prospecting, zero-emission green haulage, and computerized mine planning.",
      },
      {
        name: "Mining — Zero-Harm Safety & Operating Values",
        path: "/ventures/mining/mission-values",
        description: "DGMS compliance, mine safety protocols, eco-restoration afforestation, and local tribal community prosperity initiatives.",
      },
      {
        name: "Mining — Directorate & Technical Leadership",
        path: "/ventures/mining/leadership",
        description: "Mining engineers, geologists, pit managers, and DGMS-certified first-class mine managers.",
      },
      {
        name: "Innovex Construction & Heavy EPC — Overview",
        path: "/ventures/infrastructure",
        description: "Turnkey EPC contractor for national expressways, 4-lane freight corridors, rigid pavement PQC highways, river bridges, and industrial structures.",
      },
      {
        name: "Innovex — Active Highway & EPC Projects",
        path: "/ventures/infrastructure/current-projects",
        description: "Live execution of the 38.6 km Kalinganagar heavy industrial highway corridor and grade-separated vehicular underpasses.",
      },
      {
        name: "Innovex — Upcoming Infrastructure Packages",
        path: "/ventures/infrastructure/upcoming-projects",
        description: "Smart city multi-modal transport hubs, elevated viaducts, heavy industrial parks, and state highway concessions in pipeline.",
      },
      {
        name: "Innovex — Engineering Quality & MoRTH Values",
        path: "/ventures/infrastructure/mission-values",
        description: "Zero-defect civil engineering, automated slipform paving, ISO 9001 quality audits, and structural durability standards.",
      },
      {
        name: "Innovex — Chief Engineers & Project Directorate",
        path: "/ventures/infrastructure/leadership",
        description: "Chief infrastructure officers, structural consultants, procurement planners, and highway engineers.",
      },
      {
        name: "RashBhar Health Care — Tertiary Clinical Network",
        path: "/ventures/healthcare",
        description: "Multi-specialty tertiary care hospitals, cardiac catheterization labs, oncological care, emergency trauma suites, and diagnostic networks.",
      },
      {
        name: "Healthcare — Flagship 500-Bed Medical Center",
        path: "/ventures/healthcare/current-projects",
        description: "Flagship medical center campus in Bhubaneswar with 3.0T silent MRI, dual-source cardiac CT, and 14 modular operation theatres.",
      },
      {
        name: "Healthcare — Regional Diagnostic Hubs & Expansion",
        path: "/ventures/healthcare/upcoming-projects",
        description: "Sub-urban tele-clinics, mobile health screening vans, and specialized mother-and-child healthcare wings across tier-2 and tier-3 districts.",
      },
      {
        name: "Healthcare — Patient-First Clinical Ethics & Values",
        path: "/ventures/healthcare/mission-values",
        description: "NABH / JCI quality standards, affordable healthcare access, compassionate patient care, and clinical research ethics.",
      },
      {
        name: "RashBhar Technology & Sovereign AI",
        path: "/ventures/technology",
        description: "Enterprise software architecture, sovereign artificial intelligence foundation models, industrial robotics, edge IoT telemetry, and secure cloud infrastructure.",
      },
      {
        name: "Technology — Active AI & Enterprise Deployments",
        path: "/ventures/technology/current-projects",
        description: "Industrial IoT fleet tracking, real-time machine telemetry, predictive geology algorithms, and clinical triage co-pilot deployments.",
      },
      {
        name: "Technology — Upcoming Quantum & Edge Innovations",
        path: "/ventures/technology/upcoming-projects",
        description: "Autonomous mining drone swarms, localized multilingual Indic LLMs, and sovereign defense computing platforms.",
      },
      {
        name: "RashBhar Soil & Soul — Agritech & Bio-Polymers",
        path: "/ventures/agriculture",
        description: "Regenerative organic cultivation, biodegradable water-saving agro-polymers (AgriGel™), farmer cooperative networks, and temperature-controlled food logistics.",
      },
      {
        name: "Agriculture — Active Cultivation & Field Trials",
        path: "/ventures/agriculture/current-projects",
        description: "AgriGel large-scale drought resistance field trials, certified organic grain production, and farmer enablement training programs.",
      },
      {
        name: "RashBhar Real Estate & Urban Infrastructure",
        path: "/ventures/real-estate",
        description: "Ultra-luxury gated residential communities, Grade-A integrated commercial parks, eco-friendly green architecture, and urban developments.",
      },
      {
        name: "Real Estate — Reyansh Elanza Luxury Enclave",
        path: "/ventures/real-estate/current-projects",
        description: "Signature premium residential high-rise enclave in Bhubaneswar with IGBC green building certification, smart home automation, and clubhouse amenities.",
      },
      {
        name: "Royal Birds Group — Strategic Capital & Treasury",
        path: "/ventures/investments",
        description: "Corporate treasury management, structured debt, private equity syndication, sovereign co-investments, and venture incubation.",
      },
    ],
  },
  {
    id: "innovation-rd",
    category: "3. Sovereign R&D, Deep-Tech Labs & ESG",
    icon: Brain,
    description: "Indigenous technological intellectual property, sovereign artificial intelligence architectures, robotics automation, and environmental decarbonization.",
    links: [
      {
        name: "Sovereign Innovation Master Portal",
        path: "/innovation",
        description: "Central repository of group intellectual property, research publications, industrial engineering patents, and collaborative academic labs.",
        badge: "R&D"
      },
      {
        name: "RashtrAI — Sovereign Industrial Foundation AI",
        path: "/rd/rashtrai",
        description: "Multi-modal sovereign AI models designed for localized heavy industrial optimization, predictive equipment maintenance, and clinical support.",
        badge: "AI"
      },
      {
        name: "VED Ri — Embodied Robotics & Autonomous Systems",
        path: "/rd/ved-ri",
        description: "Hazardous environment mining rovers, automated excavator guidance kits, and robotic sorting systems for minerals.",
        badge: "Robotics"
      },
      {
        name: "AgriGel™ — Biodegradable Soil Hydrogel Polymer",
        path: "/rd/agrigel",
        description: "Breakthrough organic superabsorbent agricultural polymer reducing irrigation frequency by up to 50% and enhancing crop yield in arid soils.",
        badge: "Agritech"
      }
    ],
  },
  {
    id: "projects-infrastructure",
    category: "4. Major Projects & National Infrastructure",
    icon: HardHat,
    description: "Landmark infrastructure deliverables across highways, industrial processing plants, super-specialty hospitals, and luxury townships.",
    links: [
      {
        name: "National Projects Portfolio Master Directory",
        path: "/projects",
        description: "Complete showcase of executed, ongoing, and conceptual multi-crore national projects with specifications, engineering blueprints, and progress meters.",
        badge: "Portfolio"
      },
      {
        name: "Kalinganagar 38.6 km Industrial EPC Corridor",
        path: "/projects/kalinganagar-industrial-corridor",
        description: "Turnkey 4-lane heavy duty freight corridor connecting key steel and industrial clusters with rigid PQC concrete pavement.",
      },
      {
        name: "Keonjhar Beneficiation & Mechanized Mining Plant",
        path: "/projects/keonjhar-iron-ore-beneficiation",
        description: "High-throughput iron ore wet beneficiation circuit with zero liquid discharge (ZLD) tailings management.",
      },
      {
        name: "500-Bed Tertiary Care Hospital & Trauma Centre",
        path: "/projects/bhubaneswar-super-speciality-hospital",
        description: "Multi-disciplinary healthcare campus featuring 14 modular operation theatres, cardiac cath labs, and advanced oncology wing.",
      },
      {
        name: "Reyansh Elanza Ultra-Luxury Residential Enclave",
        path: "/projects/reyansh-elanza-residences",
        description: "Exclusive luxury residential towers combining biophilic architecture, IGBC Gold green rating, and private sky lounges.",
      },
    ],
  },
  {
    id: "procurement-tenders",
    category: "5. Procurement, E-Tenders & Strategic Alliances",
    icon: FileSpreadsheet,
    description: "Transparent, digitally audited procurement pipelines, active tender notices, vendor registration, and institutional alliances.",
    links: [
      {
        name: "Central E-Procurement & Tender Notice Portal",
        path: "/tenders",
        description: "Public tender notices, RFPs, Expression of Interest (EOI), Bill of Quantities (BOQ), eligibility criteria, and digital bid tracking.",
        badge: "Tenders"
      },
      {
        name: "Supplier & Vendor Empanelment Gateway",
        path: "/tenders?tab=register",
        description: "Digital onboarding for suppliers, contractors, MSMEs, OEMs, and service providers with statutory GST and MSME verification.",
      },
      {
        name: "Strategic Alliances & Joint Ventures Directory",
        path: "/partners",
        description: "Institutional partnerships with industry leaders (AR Group, Vanshika Corp, Vera, Rajput Group, Adani, L&T, Apollo Hospitals, ONGC).",
        badge: "Partners"
      },
    ],
  },
  {
    id: "careers-media",
    category: "6. Human Capital, Careers & Media Centre",
    icon: Briefcase,
    description: "Career opportunities across all subsidiaries, executive hiring, media announcements, press kits, and corporate contact directory.",
    links: [
      {
        name: "Careers & Human Capital Portal",
        path: "/careers",
        description: "Open executive and technical job positions across Mining, Civil EPC, AI Engineering, Healthcare, and Corporate Management with 5-stage application tracking.",
        badge: "Careers"
      },
      {
        name: "Candidate Application Status Tracker",
        path: "/careers?tab=track",
        description: "Live applicant tracking system (ATS) lookup for submitted resumes, interview scheduling, and recruitment status verification.",
      },
      {
        name: "Corporate Media Centre & Press Releases",
        path: "/media",
        description: "Official press dispatches, executive statements, downloadable corporate media kit, photo gallery, and financial press coverage.",
        badge: "Media"
      },
      {
        name: "Official Brand Asset & Media Kit Download",
        path: "/media?tab=brand-kit",
        description: "High-resolution corporate logos, executive headshots, brand guidelines, and official conglomerate boilerplates for press usage.",
      },
      {
        name: "Contact Corporate Headquarters & Regional Directory",
        path: "/contact",
        description: "Direct contact channels for Forest Park Bhubaneswar Corporate Headquarters, Noida Tech Hub, Jamshedpur Mining Hub, Balasore, and Amaravati.",
        badge: "Contact"
      },
    ],
  },
  {
    id: "legal-statutory",
    category: "7. Legal Governance, Statutory Disclosures & Compliance",
    icon: Scale,
    description: "Complete statutory compliance suite conforming to Indian corporate laws, DPDP Act 2023, RERA standards, and independent vigil mechanisms.",
    links: [
      {
        name: "Legal, Statutory & Compliance Master Suite",
        path: "/legal",
        description: "Consolidated index of all corporate policies, privacy charters, statutory disclosures, and regulatory adherence documentation.",
        badge: "Statutory"
      },
      {
        name: "Privacy & Data Protection Policy",
        path: "/legal/privacy",
        description: "Comprehensive adherence to India's Digital Personal Data Protection (DPDP) Act 2023, data encryption standards, and data principal rights.",
      },
      {
        name: "Terms & Conditions of Commercial Engagement",
        path: "/legal/terms",
        description: "Governing terms for visitors, vendors, bidding contractors, intellectual property protections, and digital platform access.",
      },
      {
        name: "Corporate Code of Business Conduct & Ethics",
        path: "/legal/policy",
        description: "Anti-bribery standards, prevention of insider trading, zero-tolerance conflict of interest, and fair competition covenants.",
      },
      {
        name: "Institutional 5-Stage Procurement Flow & Rules",
        path: "/legal/procurement-flow",
        description: "Five-step institutional supply chain framework: notice issuance, technical qualification, commercial bidding, LOI award, and SLA audits.",
      },
      {
        name: "Statutory Policy & Corporate Disclaimer",
        path: "/legal/disclaimer",
        description: "Forward-looking statement advisories, RERA registration disclaimers, investment cautions, and official communication fraud warnings.",
      },
      {
        name: "Whistleblower Protection Charter & Vigil Mechanism",
        path: "/legal/whistleblower",
        description: "Confidential and protected reporting channel to the independent Audit Ombudsman for financial, ethical, or legal irregularities.",
        badge: "Confidential"
      },
    ],
  },
];

export const HtmlSitemap: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const totalLinksCount = useMemo(() => {
    return sitemapData.reduce((acc, sec) => acc + sec.links.length, 0);
  }, []);

  const filteredSections = useMemo(() => {
    return sitemapData
      .filter((sec) => activeCategory === "all" || sec.id === activeCategory)
      .map((sec) => {
        if (!searchTerm.trim()) return sec;
        const lower = searchTerm.toLowerCase();
        const matchingLinks = sec.links.filter(
          (lnk) =>
            lnk.name.toLowerCase().includes(lower) ||
            lnk.description.toLowerCase().includes(lower) ||
            lnk.path.toLowerCase().includes(lower)
        );
        return { ...sec, links: matchingLinks };
      })
      .filter((sec) => sec.links.length > 0);
  }, [searchTerm, activeCategory]);

  return (
    <>
      <MetaTags
        title="Institutional HTML Sitemap & Complete Page Index | Rashtra Bharosa Group"
        description="Comprehensive clean HTML sitemap of Rashtra Bharosa Group. Clean, fully indexable page directory covering Corporate Governance, Mining, Infrastructure EPC, Healthcare, Technology & AI, Agriculture, Real Estate, R&D Labs, Tenders, Careers, and Legal Policies."
        keywords="Rashtra Bharosa Group Sitemap, HTML Sitemap, Google Index Sitemap, Corporate Directory, Tenders, Careers, Media, Mining, Infrastructure EPC"
        url="https://www.rashtrabharosagroup.com/sitemap"
      />

      <div className="bg-white text-slate-900 min-h-screen pt-28 pb-24 font-sans antialiased selection:bg-[#F4B32C] selection:text-[#041633]">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
          
          {/* Header Banner - Clean Light Institutional Design */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-12 mb-10 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
              <span className="px-3 py-1 bg-[#041633] text-[#F4B32C] rounded-md text-xs font-mono font-bold uppercase tracking-wider">
                Universal Index & Google Console Ready
              </span>
              <span className="text-xs font-mono text-slate-500">
                Indexed Verified Endpoints: <strong className="text-[#041633] font-bold">{totalLinksCount} Pages</strong>
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#041633] font-normal tracking-tight">
              Institutional HTML Sitemap & Page Index
            </h1>
            <p className="text-slate-600 text-sm sm:text-base mt-3 max-w-3xl leading-relaxed">
              Complete hierarchical directory of Rashtra Bharosa Group. Structured with clean semantic HTML for effortless indexing by Google Search Console, Bing Webmaster, AI bots, and institutional visitors.
            </p>

            {/* Interactive Search & Filter Controls */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3 max-w-2xl">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search pages, subsidiaries, projects, tenders or legal policies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#041633] focus:ring-1 focus:ring-[#041633] transition-all shadow-sm"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Category Quick Filter Dropdown */}
              <select
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)}
                className="px-3 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-700 focus:outline-none focus:border-[#041633] shadow-sm font-medium"
              >
                <option value="all">All Categories ({totalLinksCount})</option>
                {sitemapData.map((sec) => (
                  <option key={sec.id} value={sec.id}>
                    {sec.category.split(". ")[1] || sec.category} ({sec.links.length})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Sitemap Sections Grid */}
          <div className="space-y-12">
            {filteredSections.length === 0 ? (
              <div className="p-12 text-center rounded-2xl bg-slate-50 border border-slate-200">
                <p className="text-slate-600 text-base">No matching pages found for "{searchTerm}".</p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setActiveCategory("all");
                  }}
                  className="mt-4 px-4 py-2 bg-[#041633] text-[#F4B32C] font-bold text-xs rounded-lg uppercase tracking-wider hover:bg-slate-800 transition-colors"
                >
                  Reset Search Filters
                </button>
              </div>
            ) : (
              filteredSections.map((section) => {
                const Icon = section.icon;
                return (
                  <section key={section.id} id={section.id} className="space-y-4">
                    {/* Section Header */}
                    <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b-2 border-[#041633]">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-[#041633]">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h2 className="text-xl sm:text-2xl font-serif text-[#041633] font-medium">
                            {section.category}
                          </h2>
                          <p className="text-xs text-slate-500 mt-0.5">{section.description}</p>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded bg-slate-100 border border-slate-200 text-xs font-mono font-semibold text-slate-700">
                        {section.links.length} {section.links.length === 1 ? "Page" : "Pages"}
                      </span>
                    </div>

                    {/* Links Grid - Clean Wide White Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {section.links.map((link, lIdx) => (
                        <Link
                          key={lIdx}
                          to={link.path}
                          className="group flex flex-col justify-between p-5 rounded-xl bg-white border border-slate-200 hover:border-[#041633] hover:shadow-md transition-all"
                        >
                          <div>
                            <div className="flex items-start justify-between gap-2">
                              <h3 className="text-sm font-semibold text-[#0A2558] group-hover:text-[#041633] transition-colors leading-snug">
                                {link.name}
                              </h3>
                              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#041633] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform flex-shrink-0" />
                            </div>

                            <p className="text-xs text-slate-600 mt-2 leading-relaxed font-sans">
                              {link.description}
                            </p>
                          </div>

                          <div className="mt-4 pt-2.5 border-t border-dashed border-slate-200 flex items-center justify-between text-[11px] font-mono text-slate-500">
                            <span className="truncate max-w-[200px] text-slate-500 font-semibold">{link.path}</span>
                            {link.badge && (
                              <span className="px-2 py-0.5 rounded bg-amber-50 border border-amber-200 text-amber-800 text-[10px] font-bold uppercase tracking-wider">
                                {link.badge}
                              </span>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </section>
                );
              })
            )}
          </div>

          {/* Verified Corporate Footprint Panel */}
          <div className="mt-16 p-8 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-lg bg-[#041633] flex items-center justify-center text-[#F4B32C]">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-serif text-[#041633] font-medium">
                  Verified Corporate Offices & Regional Directorate Footprint
                </h3>
                <p className="text-xs text-slate-500">
                  Physical administrative presence across key commercial capitals, mining belts, and tech corridors.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
                <span className="text-[11px] font-mono font-bold text-[#041633] uppercase">Corporate Headquarters</span>
                <h4 className="text-sm font-semibold text-slate-900 mt-1">Bhubaneswar Secretariat</h4>
                <p className="text-slate-600 mt-1">B1/1-6, Bhimpur, Forest Park, Bhubaneswar, Odisha — 751009</p>
                <div className="mt-3 pt-2 border-t border-slate-100 text-[11px] font-mono text-slate-500 flex flex-col gap-0.5">
                  <span>Desk: 011 6927 0434 (+91 11 6927 0434)</span>
                  <span>Email: info@rashtrabharosagroup.com</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
                <span className="text-[11px] font-mono font-bold text-[#041633] uppercase">Mining & Minerals Hub</span>
                <h4 className="text-sm font-semibold text-slate-900 mt-1">Jamshedpur Concessions Office</h4>
                <p className="text-slate-600 mt-1">Loco Colony, Burma Mines, Kalimali, Jamshedpur, Jharkhand — 831002</p>
                <div className="mt-3 pt-2 border-t border-slate-100 text-[11px] font-mono text-slate-500 flex flex-col gap-0.5">
                  <span>Operations: 011 6927 0434 (+91 11 6927 0434)</span>
                  <span>Email: tenders@rashtrabharosagroup.com</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
                <span className="text-[11px] font-mono font-bold text-[#041633] uppercase">Regional Tech Hub</span>
                <h4 className="text-sm font-semibold text-slate-900 mt-1">Noida Corporate & AI Labs</h4>
                <p className="text-slate-600 mt-1">Block A, Phase-2, Noida Special Economy Zone (NSEZ), UP — 201305</p>
                <div className="mt-3 pt-2 border-t border-slate-100 text-[11px] font-mono text-slate-500 flex flex-col gap-0.5">
                  <span>Inquiries: 011 6927 0434 (+91 11 6927 0434)</span>
                  <span>Email: info@rashtrabharosagroup.com</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
                <span className="text-[11px] font-mono font-bold text-[#041633] uppercase">Commercial Realty</span>
                <h4 className="text-sm font-semibold text-slate-900 mt-1">Balasore Regional Office</h4>
                <p className="text-slate-600 mt-1">NH-16, Chennai - Kolkata Highway, Nuapada, Odisha — 756043</p>
                <div className="mt-3 pt-2 border-t border-slate-100 text-[11px] font-mono text-slate-500 flex flex-col gap-0.5">
                  <span>Sales Desk: 011 6927 0434 (+91 11 6927 0434)</span>
                  <span>Email: info@rashtrabharosagroup.com</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
                <span className="text-[11px] font-mono font-bold text-[#041633] uppercase">Southern Capital Desk</span>
                <h4 className="text-sm font-semibold text-slate-900 mt-1">Amaravati Corporate Office</h4>
                <p className="text-slate-600 mt-1">GG8F+MQR, Tallaya Palem Main Rd, Amaravati, AP — 522020</p>
                <div className="mt-3 pt-2 border-t border-slate-100 text-[11px] font-mono text-slate-500 flex flex-col gap-0.5">
                  <span>General: 011 6927 0434 (+91 11 6927 0434)</span>
                  <span>Email: info@rashtrabharosagroup.com</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-mono font-bold text-[#041633] uppercase">Search Engine Feeds</span>
                  <h4 className="text-sm font-semibold text-slate-900 mt-1">XML & Static HTML Sitemaps</h4>
                  <p className="text-slate-600 mt-1">Machine-readable endpoints ready for Google Search Console submission.</p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center gap-4">
                  <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[11px] font-bold text-[#041633] hover:underline">
                    <span>sitemap.xml</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                  <a href="/sitemap.html" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[11px] font-bold text-[#041633] hover:underline">
                    <span>sitemap.html</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Footer Note */}
          <div className="mt-12 text-center text-xs font-mono text-slate-500">
            <p>© 2026 Rashtra Bharosa Group. Clean Semantic Directory for Google Search Console & Web Crawlers.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HtmlSitemap;
