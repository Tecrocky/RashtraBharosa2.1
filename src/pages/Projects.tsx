import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  ArrowRight,
  Filter,
  Search,
  Building2,
  X,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getProjects, ProjectRecord } from "@/services/cmsService";

import healthcareImg from "@/assets/healthcare.jpg";
import realestateImg from "@/assets/realestate.jpg";
import reyanshElanzaRender from "@/assets/projects/Reyansh Elanza/Reyansh-Elanza-3d-render.jpg";
import soilImg from "@/assets/soil.jpg";
import mineFieldPhoto1 from "@/assets/projects/MININGING/mines_area-20260923-0001.jpg";
import mineFieldPhoto2 from "@/assets/projects/MININGING/mines_area-20260923-0002.jpg";
import projectHospitalImg from "@/assets/projects/hospital.jpg";
import agriFieldPhoto2 from "@/assets/projects/Agriculture/agriplastindia-20260923-0002.jpg";
import agriFieldPhoto4 from "@/assets/projects/Agriculture/agriplastindia-20260923-0004.jpg";
import constructionVideo from "@/assets/VIDEOS/Construction Video.mp4";

// Atmospheric Stock Photography for Projects
import stockIronOreQuarry from "@/assets/stock/stock_mining_quarry.jpg";
import stockCoalMine from "@/assets/stock/mining_quarry_pit.jpg";
import stockHospitalFacade from "@/assets/stock/project_hospital_facade.jpg";
import stockCardiacOt from "@/assets/stock/stock_healthcare_cardio.jpg";
import stockResidentialSky from "@/assets/stock/project_residential_sky.jpg";
import stockAgriPolyhouse from "@/assets/stock/project_agri_polyhouse.jpg";
import stockAgriHarvest from "@/assets/stock/agri_harvest.jpg";

// Odisha Heritage Background Assets
import bgHeritage4 from "@/assets/background/background - 4.png";

interface ProjectItem {
  id: string;
  title: string;
  category: string;
  location: string;
  status: string;
  statusColor: string;
  image: string;
  secondaryImage: string;
  business: string;
  link: string;
  leadParagraph: string;
  detailParagraph: string;
  scopeHighlights: string[];
}

const projectsData: ProjectItem[] = [];

const categories = ["All", "Mining", "Real Estate", "Healthcare", "Agriculture"];

const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeProjects, setActiveProjects] = useState<ProjectItem[]>(() => {
    try {
      const saved = localStorage.getItem("rbg_projects_data");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (e) {
      console.error("Error reading rbg_projects_data", e);
    }
    return [];
  });

  // Fetch live projects strictly from Supabase PostgreSQL on mount
  useEffect(() => {
    getProjects().then((cloudProjects) => {
      const mapped: ProjectItem[] = (cloudProjects || []).map((cp) => {
        return {
          id: cp.id,
          title: cp.title,
          category: cp.category,
          location: cp.location,
          status: cp.status,
          statusColor: cp.statusColor || "bg-emerald-950/80 text-emerald-300 border border-emerald-500/30",
          image: cp.image || "",
          secondaryImage: cp.secondaryImage || "",
          business: cp.business,
          link: cp.link || `/projects/${cp.id}`,
          leadParagraph: cp.leadParagraph,
          detailParagraph: cp.detailParagraph,
          scopeHighlights: cp.scopeHighlights || [],
        };
      });
      setActiveProjects(mapped);
    });
  }, []);

  const filteredProjects = activeProjects.filter((p) => {
    const matchesCategory = selectedCategory === "All" || p.category.toLowerCase() === selectedCategory.toLowerCase();
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      query === "" ||
      p.title.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query) ||
      p.business.toLowerCase().includes(query) ||
      p.location.toLowerCase().includes(query) ||
      p.leadParagraph.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-[#F8FAFC] text-slate-900 font-sans antialiased min-h-screen selection:bg-[#062B63] selection:text-white">
      {/* 1. Hero Header with Indian Infrastructure Visual Backdrop */}
      <section className="relative pt-44 pb-12 lg:pt-56 lg:pb-16 overflow-hidden flex items-end min-h-[440px] lg:min-h-[500px] bg-[#041633]">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1694521787193-9293daeddbaa?auto=format&fit=crop&w=2000&q=80"
            alt="Indian Civil Engineering and Project Execution"
            className="w-full h-full object-cover object-center scale-105"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/40 z-0 pointer-events-none"></div>

        <div className="max-w-[1500px] w-full mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
          <div className="max-w-5xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-black/50 text-brand-gold border border-white/20 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse"></span>
              <span>National Strategic Footprint</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white uppercase leading-tight drop-shadow-lg">
              Capital Projects & Strategic Operations
            </h1>
            <p className="text-xl sm:text-2xl font-bold text-brand-gold italic">
              Building Enduring Infrastructure & High-Value Industrial Assets for Bharat.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Interactive Search & Sector Filter Toolbar */}
      <section className="py-4 bg-white/90 border-y border-slate-200 sticky top-[64px] z-30 backdrop-blur-xl">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Sector Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#062B63] uppercase tracking-wider shrink-0 mr-1">
              <Filter size={14} /> Sector:
            </div>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  selectedCategory === cat
                    ? "bg-[#062B63] text-white font-bold shadow-md ring-2 ring-[#062B63]/20"
                    : "bg-slate-100 border border-slate-200 text-slate-600 hover:border-[#062B63] hover:text-[#062B63] hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Live Search Input */}
          <div className="relative w-full md:w-72 lg:w-80 shrink-0">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects by name, city, keyword..."
              className="w-full pl-9 pr-8 py-2 rounded-full bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#062B63] focus:border-[#062B63] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-800 p-1 rounded-full"
                title="Clear search"
              >
                <X size={13} />
              </button>
            )}
          </div>

        </div>
      </section>

      {/* STICKY SCROLL EXPERIENCE: PINNED HERITAGE BACKDROP + STACKING PROJECT CARDS */}
      <div className="relative w-full bg-[#F8FAFC] overflow-visible">
        {/* Pinned Sticky Background 4 */}
        <div className="sticky top-0 h-screen w-full overflow-hidden z-0 pointer-events-none">
          <div className="relative w-full h-full">
            <img
              src={bgHeritage4}
              alt="Odisha Cultural Heritage Backdrop"
              className="w-full h-full object-cover object-right opacity-15 scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#F8FAFC] via-[#F8FAFC]/60 to-[#F8FAFC]/90" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#F8FAFC]/95 via-[#F8FAFC]/80 to-transparent" />
          </div>
        </div>

        {/* Overlapping Stacking Cards Container */}
        <div className="relative z-10 -mt-[100vh] w-full px-4 sm:px-6 lg:px-12 pb-32">
          {/* Header intro */}
          <div className="min-h-[45vh] flex flex-col justify-center max-w-5xl mx-auto pt-24 pb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-[#062B63]/10 text-[#062B63] border border-[#062B63]/20 w-fit mb-3">
              <MapPin className="w-3.5 h-3.5" />
              Strategic Deployment Track
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#062B63] uppercase leading-tight">
              Executing High-Impact Assets <br />
              <span className="text-[#D9961A]">
                For Generational Value
              </span>
            </h2>
          </div>

          {/* Stacking Project Cards with Dual-Image Visual Depth */}
          <div className="max-w-6xl mx-auto space-y-24 sm:space-y-36">
            {filteredProjects.length === 0 ? (
              <div className="py-20 text-center bg-white/90 backdrop-blur-md rounded-3xl border border-slate-200 p-8 shadow-sm">
                <Building2 className="w-12 h-12 mx-auto mb-3 text-slate-300 stroke-[1.5]" />
                <h3 className="text-lg font-bold text-slate-800">No Projects Found</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
                  Projects added and published via the Administrative Dashboard will appear here in real time.
                </p>
              </div>
            ) : (
              filteredProjects.map((proj, idx) => {
                return (
                  <section
                    key={proj.id}
                    id={proj.id}
                    style={{ top: `${80 + idx * 16}px` }}
                    className="sticky transition-all duration-500 will-change-transform scroll-mt-32"
                  >
                    <div className="relative rounded-3xl p-6 sm:p-10 lg:p-12 overflow-hidden border border-slate-200 bg-white/95 backdrop-blur-xl shadow-xl hover:border-[#062B63]/30 hover:shadow-2xl transition-all">
                      {/* Card Header */}
                      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100">
                        <div className="flex items-center gap-3">
                          <span className="px-3 py-1 text-xs font-extrabold uppercase tracking-wider rounded-lg bg-[#062B63] text-white border border-[#062B63]">
                            {proj.category}
                          </span>
                          <span className="text-xs font-bold uppercase tracking-widest text-[#062B63]">
                            {proj.business}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200">
                            {proj.status}
                          </span>
                          <span className="text-xs text-slate-500 flex items-center gap-1">
                            <MapPin size={13} className="text-[#062B63]" />
                            {proj.location}
                          </span>
                        </div>
                      </div>

                      {/* Card Body Grid */}
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-8 items-center">
                        {/* Visual Media (Primary Proprietary Render + Supporting Stock Asset) */}
                        <div className="lg:col-span-6 space-y-4">
                          <div className="relative rounded-2xl overflow-hidden shadow-md border border-slate-200 aspect-[16/10] bg-slate-100 group">
                            {proj.image ? (
                              <img
                                src={proj.image}
                                alt={proj.title}
                                className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-slate-400">
                                <Building2 className="w-12 h-12 stroke-[1]" />
                              </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
                            <div className="absolute bottom-3 left-4 right-4 text-white">
                              <div className="text-[10px] font-bold uppercase tracking-wider text-brand-gold">
                                Approved Project Execution
                              </div>
                              <div className="text-sm font-bold">{proj.location}</div>
                            </div>
                          </div>

                          {/* Secondary Supporting Asset Preview Strip */}
                          {proj.secondaryImage && (
                            <div className="relative rounded-xl overflow-hidden aspect-[21/9] border border-slate-200 shadow-sm group">
                              <img
                                src={proj.secondaryImage}
                                alt={`${proj.title} operational context`}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
                              <div className="absolute bottom-1.5 left-3 text-[10px] font-semibold text-white/90">
                                Sector Capability & Operational Environment
                              </div>
                            </div>
                          )}

                          {/* Scope Highlights */}
                          {proj.scopeHighlights && proj.scopeHighlights.length > 0 && (
                            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                              <div className="text-[10px] font-bold uppercase tracking-wider text-[#062B63]">
                                Scope & Specifications:
                              </div>
                              <ul className="space-y-1.5 text-xs text-slate-700">
                                {proj.scopeHighlights.map((scope, sIdx) => (
                                  <li key={sIdx} className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#062B63] mt-1.5 shrink-0" />
                                    <span>{scope}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>

                        {/* Editorial Description */}
                        <div className="lg:col-span-6 space-y-4">
                          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight leading-tight">
                            {proj.title}
                          </h3>

                          <p className="text-[#062B63] font-medium text-xs sm:text-sm leading-relaxed">
                            {proj.leadParagraph}
                          </p>

                          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                            {proj.detailParagraph}
                          </p>

                          {/* Action Link */}
                          <div className="pt-2">
                            <Button asChild className="btn-primary bg-[#062B63] hover:bg-[#093d8f] text-white text-xs uppercase tracking-wider rounded-xl shadow-md px-6 py-2.5">
                              <Link to={proj.link}>
                                Read Project Story <ArrowRight size={13} className="ml-1.5" />
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
