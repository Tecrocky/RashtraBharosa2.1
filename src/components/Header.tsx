import React, { useState, useEffect, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  Search,
  Building2,
  Users,
  Pickaxe,
  HardHat,
  Home as HomeIcon,
  Sprout,
  Laptop,
  HeartPulse,
  TrendingUp,
  Brain,
  Bot,
  Droplets,
  ShieldCheck,
  FileText,
  Briefcase,
  Handshake,
  User,
  UserCheck,
  FileCheck,
  Scale,
  Award,
  Layers,
  Sparkles,
  Newspaper,
  Leaf,
  Mail,
  Compass,
  FolderKanban,
  Heart,
  Globe,
} from "lucide-react";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";

interface SearchItem {
  title: string;
  category: string;
  path: string;
  icon: React.ElementType;
  keywords: string;
}

const searchDatabase: SearchItem[] = [
  // About & Governance
  { title: "Group Overview & Heritage", category: "About Us", path: "/about", icon: Building2, keywords: "about overview history vision mission profile conglomerate" },
  { title: "Corporate Governance & Ethics", category: "About Us", path: "/about/corporate-governance", icon: Scale, keywords: "governance ethics board compliance committee audit risk" },
  { title: "Group Structure & Holdings", category: "About Us", path: "/about/group-structure", icon: Layers, keywords: "structure subsidiaries hierarchy holding ownership architecture" },
  { title: "Strategic Journey & Milestones", category: "About Us", path: "/about/strategic-journey", icon: TrendingUp, keywords: "journey timeline milestones growth history roadmap foundation" },
  { title: "Office of the Founder — Subransu Mohanty", category: "Leadership", path: "/about/founder", icon: User, keywords: "founder subransu mohanty promoter creator vision" },
  { title: "Chairman of the Board — Vikramaditya Singh Rathore", category: "Leadership", path: "/about/chairman", icon: ShieldCheck, keywords: "chairman vikramaditya singh rathore board fiduciary stewardship" },
  { title: "Group CEO — Prinseesh Yashraj Pratap", category: "Leadership", path: "/about/ceo", icon: Award, keywords: "ceo prinseesh yashraj pratap command operations leadership" },
  { title: "Complete Leadership Directory", category: "Leadership", path: "/about/leadership", icon: Users, keywords: "leadership directors executives management team officers" },

  // Operating Subsidiaries
  { title: "RashBhar Mining Corporation", category: "Subsidiaries", path: "/ventures/mining", icon: Pickaxe, keywords: "mining iron ore coal bauxite resources mineral odisha extraction" },
  { title: "Innovex Construction (Heavy EPC)", category: "Subsidiaries", path: "/ventures/infrastructure", icon: HardHat, keywords: "construction innovex epc infrastructure civil structural steel" },
  { title: "RashBhar Real Estate", category: "Subsidiaries", path: "/ventures/real-estate", icon: HomeIcon, keywords: "real estate property luxury housing commercial residential urban" },
  { title: "RashBhar Soil & Soul (Agritech)", category: "Subsidiaries", path: "/ventures/agriculture", icon: Sprout, keywords: "agriculture soil soul agritech farming organic polymers" },
  { title: "RashBhar Technology (Enterprise AI)", category: "Subsidiaries", path: "/ventures/technology", icon: Laptop, keywords: "technology it ai software servers enterprise robotics" },
  { title: "RashBhar Health Care (Clinical)", category: "Subsidiaries", path: "/ventures/healthcare", icon: HeartPulse, keywords: "healthcare hospital cardiology medical clinical swasthya saathi" },
  { title: "Royal Birds Group (Strategic Capital)", category: "Subsidiaries", path: "/ventures/investments", icon: TrendingUp, keywords: "investments royal birds capital treasury private equity venture" },
  { title: "Seven Pillars Operating Architecture", category: "Subsidiaries", path: "/businesses", icon: Globe, keywords: "businesses subsidiaries verticals 7 pillars conglomerate ecosystem" },

  // Sovereign R&D & Innovation
  { title: "RashtrAI — Sovereign Industrial AI", category: "Innovation", path: "/innovation/rashtrai", icon: Brain, keywords: "rashtrai ai foundation model agents machine learning telemetry" },
  { title: "VED Ri — Embodied Robotics", category: "Innovation", path: "/innovation/ved-ri", icon: Bot, keywords: "ved ri robotics humanoid automation mining rover safety" },
  { title: "AgriGel™ — Biodegradable Soil Hydrogel", category: "Innovation", path: "/innovation/agrigel", icon: Droplets, keywords: "agrigel soil hydrogel polymer water retention moisture farming" },
  { title: "Master Sovereign Innovation Hub", category: "Innovation", path: "/innovation", icon: Sparkles, keywords: "innovation r&d research technology breakthrough patents" },

  // Key Corporate Gateways & Portals
  { title: "Active Tenders & Procurement NITs", category: "Procurement", path: "/tenders", icon: FileText, keywords: "tenders procurement nit bidding contracts epc mining civil proposals" },
  { title: "Vendor Registration & Empanelment", category: "Procurement", path: "/tenders?tab=register", icon: UserCheck, keywords: "vendor supplier registration empanelment onboarding procurement contractor partner" },
  { title: "Executive Careers & Opportunities", category: "Careers", path: "/careers", icon: Users, keywords: "careers jobs hiring vacancies talent recruitment engineering operations hr openings" },
  { title: "Corporate Newsroom & Press Releases", category: "Media", path: "/media", icon: Newspaper, keywords: "news media press releases dispatches announcements coverage articles kit" },
  { title: "Official Brand Asset Vault & Logos", category: "Media", path: "/media?tab=kit", icon: Award, keywords: "brand kit logo download media vector identity colours press kit" },
  { title: "Active Projects Portfolio", category: "Portals", path: "/projects", icon: FolderKanban, keywords: "projects portfolio developments concessions plants constructions" },
  { title: "Strategic Partners & Global Alliances", category: "Portals", path: "/partners", icon: Handshake, keywords: "partners alliances joint ventures suppliers vendors bilateral" },
  { title: "Contact Corporate Secretariat", category: "Portals", path: "/contact", icon: Mail, keywords: "contact email address phone headquarters bhubaneswar enquiry" },
];

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const location = useLocation();
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (menuName: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setActiveMenu(menuName);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 280);
  };

  const handleToggleMenu = (menuName: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setActiveMenu((prev) => (prev === menuName ? null : menuName));
  };

  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveMenu(null);
    setSearchQuery("");
  }, [location.pathname]);

  // Live filtered search results
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return searchDatabase.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.keywords.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  return (
    <header className="fixed top-0 left-0 right-0 z-[1000] w-full bg-[#020b1c]/65 backdrop-blur-xl border-b border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.35)] transition-all duration-300 py-2.5 2xl:py-3">
      <div className="w-full max-w-[1600px] mx-auto px-3 sm:px-5 lg:px-6 2xl:px-8">
        <div className="flex items-center justify-between gap-2 2xl:gap-4">
          
          {/* Brand Logo & Wordmark */}
          <Link to="/" className="flex items-center gap-2.5 2xl:gap-3 group shrink-0" aria-label="Rashtra Bharosa Group">
            <img
              src={logo}
              alt="Rashtra Bharosa Group Logo"
              className="h-8 w-8 2xl:h-9 2xl:w-9 transition-transform duration-300 group-hover:scale-105 drop-shadow"
            />
            <div className="flex flex-col whitespace-nowrap">
              <span className="text-white font-bold text-sm 2xl:text-base tracking-tight leading-none group-hover:text-brand-gold transition-colors">
                Rashtra Bharosa Group
              </span>
              <span className="text-brand-gold text-[8px] 2xl:text-[9px] font-semibold tracking-[0.14em] 2xl:tracking-[0.18em] uppercase mt-0.5 2xl:mt-1">
                Rooted in Trust, Rising with Bharat
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links (Clean 5 Essential Links) */}
          <nav className="hidden xl:flex items-center gap-1.5 2xl:gap-3 text-xs 2xl:text-[13px] font-semibold text-white/90 uppercase tracking-[0.05em] 2xl:tracking-[0.08em]">
            
            {/* About Us */}
            <Link
              to="/about"
              className={`hover:text-brand-gold transition-colors whitespace-nowrap shrink-0 px-2.5 2xl:px-3 py-1 rounded-lg hover:bg-white/[0.06] uppercase font-semibold text-xs 2xl:text-[13px] tracking-[0.05em] 2xl:tracking-[0.08em] ${
                location.pathname.startsWith("/about") ? "text-brand-gold bg-white/10 shadow-xs" : ""
              }`}
            >
              About Us
            </Link>

            {/* Businesses */}
            <Link
              to="/businesses"
              className={`hover:text-brand-gold transition-colors whitespace-nowrap shrink-0 px-2.5 2xl:px-3 py-1 rounded-lg hover:bg-white/[0.06] uppercase font-semibold text-xs 2xl:text-[13px] tracking-[0.05em] 2xl:tracking-[0.08em] ${
                location.pathname.startsWith("/businesses") || location.pathname.startsWith("/ventures") ? "text-brand-gold bg-white/10 shadow-xs" : ""
              }`}
            >
              Businesses
            </Link>

            {/* Projects */}
            <Link
              to="/projects"
              className={`hover:text-brand-gold transition-colors whitespace-nowrap shrink-0 px-2.5 2xl:px-3 py-1 rounded-lg hover:bg-white/[0.06] uppercase font-semibold text-xs 2xl:text-[13px] tracking-[0.05em] 2xl:tracking-[0.08em] ${
                location.pathname.startsWith("/projects") ? "text-brand-gold bg-white/10 shadow-xs" : ""
              }`}
            >
              Projects
            </Link>

            {/* Innovation */}
            <Link
              to="/innovation"
              className={`hover:text-brand-gold transition-colors whitespace-nowrap shrink-0 px-2.5 2xl:px-3 py-1 rounded-lg hover:bg-white/[0.06] uppercase font-semibold text-xs 2xl:text-[13px] tracking-[0.05em] 2xl:tracking-[0.08em] ${
                location.pathname.startsWith("/innovation") ? "text-brand-gold bg-white/10 shadow-xs" : ""
              }`}
            >
              Innovation
            </Link>

            {/* Partners */}
            <Link
              to="/partners"
              className={`hover:text-brand-gold transition-colors whitespace-nowrap shrink-0 px-2.5 2xl:px-3 py-1 rounded-lg hover:bg-white/[0.06] uppercase font-semibold text-xs 2xl:text-[13px] tracking-[0.05em] 2xl:tracking-[0.08em] ${
                location.pathname.startsWith("/partners") ? "text-brand-gold bg-white/10 shadow-xs" : ""
              }`}
            >
              Partners
            </Link>

          </nav>

          {/* Right Action Bar: Explore & Search + Compact Contact */}
          <div className="flex items-center gap-1.5 sm:gap-2 2xl:gap-2.5 shrink-0">
            {/* Liquid Glass Search & Mega Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex items-center gap-1.5 sm:gap-2 text-slate-100 hover:text-white bg-white/[0.08] hover:bg-white/[0.15] px-3 sm:px-3.5 py-1.5 rounded-xl border border-white/20 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)] transition-all text-xs font-semibold uppercase tracking-wider cursor-pointer"
              aria-label="Toggle Mega Menu & Search"
            >
              <Search size={14} className="text-brand-gold shrink-0" />
              <span className="font-semibold text-[11px] sm:text-xs">Explore</span>
              {mobileMenuOpen ? <X size={14} className="text-brand-gold shrink-0" /> : <Menu size={14} className="shrink-0" />}
            </button>

            {/* Compact Refined Contact Button */}
            <Button
              asChild
              className="hidden md:inline-flex bg-brand-gold hover:bg-brand-richgold text-[#041633] px-3.5 2xl:px-4 py-1.5 text-xs font-bold uppercase tracking-[0.08em] rounded-xl shadow-md backdrop-blur-md whitespace-nowrap transition-all duration-300"
            >
              <Link to="/contact">
                Contact
              </Link>
            </Button>
          </div>
        </div>

        {/* =========================================================================
            LIQUID GLASS EFFECT MEGA MENU & SEARCH DRAWER (TRANSLUCENT & ATMOSPHERIC)
            ========================================================================= */}
        {mobileMenuOpen && (
          <div className="mt-4 pt-6 border-t border-white/10 animate-fade-in max-h-[85vh] overflow-y-auto pb-12 text-white">
            
            {/* Liquid Glass Search Bar Container */}
            <div className="max-w-4xl mx-auto mb-8 relative">
              <div className="relative flex items-center">
                <Search className="absolute left-4 text-brand-gold" size={17} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search subsidiaries, leaders, tenders, robotics, healthcare, projects..."
                  className="w-full pl-11 pr-10 py-3 rounded-2xl bg-white/[0.05] border border-white/15 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-brand-gold/70 backdrop-blur-2xl shadow-[inset_0_1px_2px_rgba(255,255,255,0.15)] transition-all"
                  autoFocus
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 text-slate-400 hover:text-white"
                  >
                    <X size={15} />
                  </button>
                )}
              </div>

              {/* Instant Search Results Liquid Glass Card */}
              {searchQuery.trim() && (
                <div className="absolute left-0 right-0 top-full mt-2 bg-[#020b1c]/85 border border-white/20 rounded-2xl shadow-2xl overflow-hidden z-50 max-h-80 overflow-y-auto backdrop-blur-3xl">
                  {searchResults.length > 0 ? (
                    <div className="p-3 space-y-1">
                      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1.5">
                        Found {searchResults.length} Result{searchResults.length > 1 ? "s" : ""}
                      </div>
                      {searchResults.map((item, idx) => {
                        const IconComp = item.icon;
                        return (
                          <Link
                            key={idx}
                            to={item.path}
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-white/[0.08] transition-colors group"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-7 h-7 rounded-lg bg-white/[0.08] border border-white/10 flex items-center justify-center shrink-0">
                                <IconComp size={14} className="text-brand-gold" />
                              </div>
                              <div>
                                <div className="text-sm font-semibold text-white group-hover:text-brand-gold transition-colors">
                                  {item.title}
                                </div>
                                <div className="text-[10px] text-slate-400 uppercase tracking-wider">
                                  {item.category}
                                </div>
                              </div>
                            </div>
                            <ArrowRight size={14} className="text-slate-400 group-hover:text-brand-gold transition-transform group-hover:translate-x-1" />
                          </Link>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="p-6 text-center text-slate-400 text-sm">
                      No results found for "<span className="text-white">{searchQuery}</span>".
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* =========================================================================
                PRIMARY HIGHLIGHT GATEWAYS: TENDERS, VENDOR REGISTRATION, CAREERS, NEWS
                ========================================================================= */}
            <div className="max-w-6xl mx-auto mb-7">
              <div className="flex items-center justify-between mb-3 px-1">
                <span className="text-[11px] font-bold text-brand-gold uppercase tracking-[0.18em] flex items-center gap-1.5">
                  <Sparkles size={13} className="text-brand-gold" />
                  <span>Key Group Gateways & Portals</span>
                </span>
                <span className="text-[10px] font-mono text-slate-400">Direct Public Access</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {/* 1. Tenders */}
                <Link
                  to="/tenders"
                  onClick={() => setMobileMenuOpen(false)}
                  className="group p-4 rounded-2xl bg-gradient-to-b from-white/[0.1] to-white/[0.03] hover:from-white/[0.18] hover:to-white/[0.08] border border-white/15 hover:border-brand-gold/60 backdrop-blur-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] transition-all flex flex-col justify-between relative overflow-hidden"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl overflow-hidden border border-amber-400/40 relative group-hover:scale-105 transition-transform shadow-md">
                        <img
                          src="https://images.unsplash.com/photo-1742203102929-f2810971a534?auto=format&fit=crop&w=150&q=80"
                          alt="Tenders"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-amber-900/30 flex items-center justify-center">
                          <FileText size={16} className="text-white drop-shadow" />
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-brand-gold text-[9px] font-mono font-bold uppercase tracking-wider">
                        Active NITs
                      </span>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-brand-gold transition-colors flex items-center gap-1">
                        <span>Tenders & Procurement</span>
                        <ArrowRight size={13} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </h4>
                      <p className="text-[11px] text-slate-300 leading-relaxed mt-0.5">
                        Open national competitive tenders, BOQs & project bidding.
                      </p>
                    </div>
                  </div>
                  <div className="pt-2.5 mt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-400 group-hover:text-white font-medium">
                    <span>View Notices</span>
                    <span className="text-brand-gold font-bold">Explore →</span>
                  </div>
                </Link>

                {/* 2. Vendor Registration */}
                <Link
                  to="/tenders?tab=register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="group p-4 rounded-2xl bg-gradient-to-b from-white/[0.1] to-white/[0.03] hover:from-white/[0.18] hover:to-white/[0.08] border border-white/15 hover:border-blue-400/60 backdrop-blur-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] transition-all flex flex-col justify-between relative overflow-hidden"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl overflow-hidden border border-blue-400/40 relative group-hover:scale-105 transition-transform shadow-md">
                        <img
                          src="https://images.unsplash.com/photo-1521790797524-b2497295b8a0?auto=format&fit=crop&w=150&q=80"
                          alt="Vendor Registration"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-blue-900/30 flex items-center justify-center">
                          <UserCheck size={16} className="text-white drop-shadow" />
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-blue-400/15 border border-blue-400/30 text-blue-300 text-[9px] font-mono font-bold uppercase tracking-wider">
                        Empanelment
                      </span>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors flex items-center gap-1">
                        <span>Vendor Registration</span>
                        <ArrowRight size={13} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </h4>
                      <p className="text-[11px] text-slate-300 leading-relaxed mt-0.5">
                        Empanel your enterprise as an authorized supplier or contractor.
                      </p>
                    </div>
                  </div>
                  <div className="pt-2.5 mt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-400 group-hover:text-white font-medium">
                    <span>Supplier Onboarding</span>
                    <span className="text-blue-300 font-bold">Register →</span>
                  </div>
                </Link>

                {/* 3. Careers */}
                <Link
                  to="/careers"
                  onClick={() => setMobileMenuOpen(false)}
                  className="group p-4 rounded-2xl bg-gradient-to-b from-white/[0.1] to-white/[0.03] hover:from-white/[0.18] hover:to-white/[0.08] border border-white/15 hover:border-emerald-400/60 backdrop-blur-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] transition-all flex flex-col justify-between relative overflow-hidden"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl overflow-hidden border border-emerald-400/40 relative group-hover:scale-105 transition-transform shadow-md">
                        <img
                          src="https://images.unsplash.com/photo-1758691736975-9f7f643d178e?auto=format&fit=crop&w=150&q=80"
                          alt="Careers"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-emerald-900/30 flex items-center justify-center">
                          <Users size={16} className="text-white drop-shadow" />
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-400/15 border border-emerald-400/30 text-emerald-300 text-[9px] font-mono font-bold uppercase tracking-wider">
                        We're Hiring
                      </span>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors flex items-center gap-1">
                        <span>Careers & Opportunities</span>
                        <ArrowRight size={13} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </h4>
                      <p className="text-[11px] text-slate-300 leading-relaxed mt-0.5">
                        Executive, engineering, and field leadership positions.
                      </p>
                    </div>
                  </div>
                  <div className="pt-2.5 mt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-400 group-hover:text-white font-medium">
                    <span>Open Positions</span>
                    <span className="text-emerald-300 font-bold">Apply →</span>
                  </div>
                </Link>

                {/* 4. News & Media */}
                <Link
                  to="/media"
                  onClick={() => setMobileMenuOpen(false)}
                  className="group p-4 rounded-2xl bg-gradient-to-b from-white/[0.1] to-white/[0.03] hover:from-white/[0.18] hover:to-white/[0.08] border border-white/15 hover:border-purple-400/60 backdrop-blur-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] transition-all flex flex-col justify-between relative overflow-hidden"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl overflow-hidden border border-purple-400/40 relative group-hover:scale-105 transition-transform shadow-md">
                        <img
                          src="https://images.unsplash.com/photo-1575507479993-7bb702d5e966?auto=format&fit=crop&w=150&q=80"
                          alt="Press Centre"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-purple-900/30 flex items-center justify-center">
                          <Newspaper size={16} className="text-white drop-shadow" />
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-purple-400/15 border border-purple-400/30 text-purple-300 text-[9px] font-mono font-bold uppercase tracking-wider">
                        Press Centre
                      </span>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors flex items-center gap-1">
                        <span>News & Media Centre</span>
                        <ArrowRight size={13} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </h4>
                      <p className="text-[11px] text-slate-300 leading-relaxed mt-0.5">
                        Official dispatches, external coverage & brand asset vault.
                      </p>
                    </div>
                  </div>
                  <div className="pt-2.5 mt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-400 group-hover:text-white font-medium">
                    <span>Dispatches & Media Kit</span>
                    <span className="text-purple-300 font-bold">Read →</span>
                  </div>
                </Link>
              </div>
            </div>

            {/* Liquid Glass Shortcut Pills (Clean Primary Grid) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5 mb-8">
              <Link
                to="/tenders"
                className="px-3 py-2 text-center rounded-xl bg-brand-gold/15 hover:bg-brand-gold/25 text-brand-gold text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 border border-brand-gold/30 shadow-xs backdrop-blur-xl transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FileText size={13} />
                <span>Tenders</span>
              </Link>
              <Link
                to="/tenders?tab=register"
                className="px-3 py-2 text-center rounded-xl bg-blue-500/15 hover:bg-blue-500/25 text-blue-300 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 border border-blue-500/30 shadow-xs backdrop-blur-xl transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                <UserCheck size={13} />
                <span>Vendor Reg.</span>
              </Link>
              <Link
                to="/careers"
                className="px-3 py-2 text-center rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 border border-emerald-500/30 shadow-xs backdrop-blur-xl transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Users size={13} />
                <span>Careers</span>
              </Link>
              <Link
                to="/media"
                className="px-3 py-2 text-center rounded-xl bg-purple-500/15 hover:bg-purple-500/25 text-purple-300 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 border border-purple-500/30 shadow-xs backdrop-blur-xl transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Newspaper size={13} />
                <span>News & Media</span>
              </Link>
              <Link
                to="/businesses"
                className="px-3 py-2 text-center rounded-xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] hover:from-white/[0.15] hover:to-white/[0.06] text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] backdrop-blur-xl transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Globe size={13} className="text-slate-300" />
                <span>Businesses</span>
              </Link>
              <Link
                to="/contact"
                className="px-3 py-2 text-center rounded-xl bg-brand-gold/90 hover:bg-brand-gold text-[#041633] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md backdrop-blur-xl transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Mail size={13} />
                <span>Contact</span>
              </Link>
            </div>

            {/* 4 Ultra-Clean Liquid Glass Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 text-xs">
              
              {/* Column 1: About & Governance */}
              <div className="p-5 rounded-2xl bg-gradient-to-b from-white/[0.05] to-white/[0.01] border border-white/10 backdrop-blur-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] space-y-3.5">
                <div className="text-xs font-bold text-brand-gold uppercase tracking-[0.16em] pb-2.5 border-b border-white/10 flex items-center gap-2">
                  <Building2 size={14} className="text-brand-gold" />
                  <span>About & Governance</span>
                </div>
                <div className="space-y-1.5">
                  <Link to="/about" className="flex items-center gap-2.5 py-1 text-slate-200 hover:text-brand-gold transition-colors" onClick={() => setMobileMenuOpen(false)}>
                    <Building2 size={13} className="text-slate-400 shrink-0" />
                    <span>Group Profile & Heritage</span>
                  </Link>
                  <Link to="/about/corporate-governance" className="flex items-center gap-2.5 py-1 text-slate-200 hover:text-brand-gold transition-colors" onClick={() => setMobileMenuOpen(false)}>
                    <Scale size={13} className="text-slate-400 shrink-0" />
                    <span>Corporate Governance & Ethics</span>
                  </Link>
                  <Link to="/about/group-structure" className="flex items-center gap-2.5 py-1 text-slate-200 hover:text-brand-gold transition-colors" onClick={() => setMobileMenuOpen(false)}>
                    <Layers size={13} className="text-slate-400 shrink-0" />
                    <span>Conglomerate Group Structure</span>
                  </Link>
                  <Link to="/about/strategic-journey" className="flex items-center gap-2.5 py-1 text-slate-200 hover:text-brand-gold transition-colors" onClick={() => setMobileMenuOpen(false)}>
                    <TrendingUp size={13} className="text-slate-400 shrink-0" />
                    <span>Strategic Journey & Milestones</span>
                  </Link>
                  <Link to="/about/founder" className="flex items-center gap-2.5 py-1 text-slate-200 hover:text-brand-gold transition-colors" onClick={() => setMobileMenuOpen(false)}>
                    <User size={13} className="text-slate-400 shrink-0" />
                    <span>Office of the Founder</span>
                  </Link>
                  <Link to="/about/chairman" className="flex items-center gap-2.5 py-1 text-slate-200 hover:text-brand-gold transition-colors" onClick={() => setMobileMenuOpen(false)}>
                    <ShieldCheck size={13} className="text-slate-400 shrink-0" />
                    <span>Chairman of the Board</span>
                  </Link>
                  <Link to="/about/ceo" className="flex items-center gap-2.5 py-1 text-slate-200 hover:text-brand-gold transition-colors" onClick={() => setMobileMenuOpen(false)}>
                    <Award size={13} className="text-slate-400 shrink-0" />
                    <span>Group Chief Executive Officer</span>
                  </Link>
                  <Link to="/about/leadership" className="flex items-center gap-2 pt-1.5 text-brand-gold font-semibold hover:underline" onClick={() => setMobileMenuOpen(false)}>
                    <Users size={13} className="text-brand-gold shrink-0" />
                    <span>Leadership Directory →</span>
                  </Link>
                </div>
              </div>

              {/* Column 2: Operating Subsidiaries */}
              <div className="p-5 rounded-2xl bg-gradient-to-b from-white/[0.05] to-white/[0.01] border border-white/10 backdrop-blur-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] space-y-3.5">
                <div className="text-xs font-bold text-brand-gold uppercase tracking-[0.16em] pb-2.5 border-b border-white/10 flex items-center gap-2">
                  <Globe size={14} className="text-brand-gold" />
                  <span>Operating Subsidiaries</span>
                </div>
                <div className="space-y-1.5">
                  <Link to="/ventures/mining" className="flex items-center gap-2.5 py-1 text-slate-200 hover:text-brand-gold transition-colors" onClick={() => setMobileMenuOpen(false)}>
                    <Pickaxe size={13} className="text-slate-400 shrink-0" />
                    <span>RashBhar Mining (Resources)</span>
                  </Link>
                  <Link to="/ventures/infrastructure" className="flex items-center gap-2.5 py-1 text-slate-200 hover:text-brand-gold transition-colors" onClick={() => setMobileMenuOpen(false)}>
                    <HardHat size={13} className="text-slate-400 shrink-0" />
                    <span>Innovex Construction (Heavy EPC)</span>
                  </Link>
                  <Link to="/ventures/real-estate" className="flex items-center gap-2.5 py-1 text-slate-200 hover:text-brand-gold transition-colors" onClick={() => setMobileMenuOpen(false)}>
                    <HomeIcon size={13} className="text-slate-400 shrink-0" />
                    <span>RashBhar Real Estate (Urban)</span>
                  </Link>
                  <Link to="/ventures/agriculture" className="flex items-center gap-2.5 py-1 text-slate-200 hover:text-brand-gold transition-colors" onClick={() => setMobileMenuOpen(false)}>
                    <Sprout size={13} className="text-slate-400 shrink-0" />
                    <span>RashBhar Soil & Soul (Agritech)</span>
                  </Link>
                  <Link to="/ventures/technology" className="flex items-center gap-2.5 py-1 text-slate-200 hover:text-brand-gold transition-colors" onClick={() => setMobileMenuOpen(false)}>
                    <Laptop size={13} className="text-slate-400 shrink-0" />
                    <span>RashBhar Technology (IT & AI)</span>
                  </Link>
                  <Link to="/ventures/healthcare" className="flex items-center gap-2.5 py-1 text-slate-200 hover:text-brand-gold transition-colors" onClick={() => setMobileMenuOpen(false)}>
                    <HeartPulse size={13} className="text-slate-400 shrink-0" />
                    <span>RashBhar Health Care (Clinical)</span>
                  </Link>
                  <Link to="/ventures/investments" className="flex items-center gap-2.5 py-1 text-slate-200 hover:text-brand-gold transition-colors" onClick={() => setMobileMenuOpen(false)}>
                    <TrendingUp size={13} className="text-slate-400 shrink-0" />
                    <span>Royal Birds Group (Capital Desk)</span>
                  </Link>
                  <Link to="/businesses" className="flex items-center gap-2 pt-1.5 text-brand-gold font-semibold hover:underline" onClick={() => setMobileMenuOpen(false)}>
                    <Globe size={13} className="text-brand-gold shrink-0" />
                    <span>All 7 Operating Verticals →</span>
                  </Link>
                </div>
              </div>

              {/* Column 3: Sovereign Innovation */}
              <div className="p-5 rounded-2xl bg-gradient-to-b from-white/[0.05] to-white/[0.01] border border-white/10 backdrop-blur-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] space-y-3.5">
                <div className="text-xs font-bold text-brand-gold uppercase tracking-[0.16em] pb-2.5 border-b border-white/10 flex items-center gap-2">
                  <Sparkles size={14} className="text-brand-gold" />
                  <span>Sovereign Innovation</span>
                </div>
                <div className="space-y-1.5">
                  <Link to="/innovation/rashtrai" className="flex items-center gap-2.5 py-1 text-slate-200 hover:text-brand-gold transition-colors" onClick={() => setMobileMenuOpen(false)}>
                    <Brain size={13} className="text-slate-400 shrink-0" />
                    <span>RashtrAI (Autonomous AI Core)</span>
                  </Link>
                  <Link to="/innovation/ved-ri" className="flex items-center gap-2.5 py-1 text-slate-200 hover:text-brand-gold transition-colors" onClick={() => setMobileMenuOpen(false)}>
                    <Bot size={13} className="text-slate-400 shrink-0" />
                    <span>VED Ri (Embodied Heavy Robotics)</span>
                  </Link>
                  <Link to="/innovation/agrigel" className="flex items-center gap-2.5 py-1 text-slate-200 hover:text-brand-gold transition-colors" onClick={() => setMobileMenuOpen(false)}>
                    <Droplets size={13} className="text-slate-400 shrink-0" />
                    <span>AgriGel™ (Bio-Hydrogel Science)</span>
                  </Link>
                  <Link to="/projects" className="flex items-center gap-2.5 py-1 text-slate-200 hover:text-brand-gold transition-colors" onClick={() => setMobileMenuOpen(false)}>
                    <FolderKanban size={13} className="text-slate-400 shrink-0" />
                    <span>Active Projects Portfolio</span>
                  </Link>
                  <Link to="/innovation" className="flex items-center gap-2 pt-1.5 text-brand-gold font-semibold hover:underline" onClick={() => setMobileMenuOpen(false)}>
                    <Sparkles size={13} className="text-brand-gold shrink-0" />
                    <span>Master Innovation Hub →</span>
                  </Link>
                </div>
              </div>

              {/* Column 4: Procurement, Careers & Portals */}
              <div className="p-5 rounded-2xl bg-gradient-to-b from-white/[0.05] to-white/[0.01] border border-white/10 backdrop-blur-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] space-y-3.5">
                <div className="text-xs font-bold text-brand-gold uppercase tracking-[0.16em] pb-2.5 border-b border-white/10 flex items-center gap-2">
                  <Compass size={14} className="text-brand-gold" />
                  <span>Procurement & Portals</span>
                </div>
                <div className="space-y-1.5">
                  <Link to="/tenders" className="flex items-center gap-2.5 py-1 text-slate-200 hover:text-brand-gold transition-colors" onClick={() => setMobileMenuOpen(false)}>
                    <FileText size={13} className="text-amber-400 shrink-0" />
                    <span className="font-semibold text-white">Active Tenders & NITs</span>
                  </Link>
                  <Link to="/tenders?tab=register" className="flex items-center gap-2.5 py-1 text-slate-200 hover:text-brand-gold transition-colors" onClick={() => setMobileMenuOpen(false)}>
                    <UserCheck size={13} className="text-blue-400 shrink-0" />
                    <span className="font-semibold text-white">Vendor Registration & Empanelment</span>
                  </Link>
                  <Link to="/careers" className="flex items-center gap-2.5 py-1 text-slate-200 hover:text-brand-gold transition-colors" onClick={() => setMobileMenuOpen(false)}>
                    <Users size={13} className="text-emerald-400 shrink-0" />
                    <span className="font-semibold text-white">Careers & Job Openings</span>
                  </Link>
                  <Link to="/media" className="flex items-center gap-2.5 py-1 text-slate-200 hover:text-brand-gold transition-colors" onClick={() => setMobileMenuOpen(false)}>
                    <Newspaper size={13} className="text-purple-400 shrink-0" />
                    <span className="font-semibold text-white">Newsroom & Press Releases</span>
                  </Link>
                  <Link to="/media?tab=kit" className="flex items-center gap-2.5 py-1 text-slate-200 hover:text-brand-gold transition-colors" onClick={() => setMobileMenuOpen(false)}>
                    <Award size={13} className="text-slate-400 shrink-0" />
                    <span>Brand Guidelines & Logo Kit</span>
                  </Link>
                  <Link to="/partners" className="flex items-center gap-2.5 py-1 text-slate-200 hover:text-brand-gold transition-colors" onClick={() => setMobileMenuOpen(false)}>
                    <Handshake size={13} className="text-slate-400 shrink-0" />
                    <span>Strategic Partners & Alliances</span>
                  </Link>
                  <Link to="/contact" className="flex items-center gap-2 pt-1.5 text-brand-gold font-semibold hover:underline" onClick={() => setMobileMenuOpen(false)}>
                    <Mail size={13} className="text-brand-gold shrink-0" />
                    <span>Contact Corporate Secretariat →</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
