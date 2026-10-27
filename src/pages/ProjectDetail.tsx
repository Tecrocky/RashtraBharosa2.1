import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Building2,
  MapPin,
  Calendar,
  Layers,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  TrendingUp,
  Activity,
  Cpu,
  Target,
  Pickaxe,
  HardHat,
  HeartPulse,
  Laptop,
  Sprout,
  Home as HomeIcon,
  Briefcase,
  ExternalLink,
  Waves,
  Dumbbell,
  Shield,
  Sparkles,
  Car,
  Zap,
  Trees,
  Compass,
  KeyRound,
  Award,
  PhoneCall,
  Download,
  Check,
  Star,
  FileText,
  HelpCircle,
  CheckCircle,
  BookOpen,
  Clock,
  BarChart3,
  Scale,
  Quote,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import MetaTags from "@/components/MetaTags";

// Assets
import projectHospitalImg from "@/assets/projects/hospital.jpg";
import projectSarthiImg from "@/assets/projects/Sarthi.jpg";
import healthcareImg from "@/assets/healthcare.jpg";
import healthcareHighlightImg from "@/assets/highlights/healthcare-highlight.jpg";
import technologyImg from "@/assets/technology.jpg";
import realestateImg from "@/assets/realestate.jpg";
import soilImg from "@/assets/soil.jpg";
import agriHighlightImg from "@/assets/highlights/agri-highlight.jpg";
import miningImg from "@/assets/mining.jpg";
import miningHighlightImg from "@/assets/highlights/mining-highlight.jpg";
import mineFieldPhoto1 from "@/assets/projects/MININGING/mines_area-20260923-0001.jpg";
import mineFieldPhoto2 from "@/assets/projects/MININGING/mines_area-20260923-0002.jpg";
import mineDumperPhoto3 from "@/assets/projects/MININGING/mines_area-20260923-0003.jpg";
import mineHaulerPhoto4 from "@/assets/projects/MININGING/mines_area-20260923-0004.jpg";
import innovexImg from "@/assets/innovex.png";
import royalbirdsImg from "@/assets/royalbirds.png";
import hqImg from "@/assets/hq.jpeg";
import techImg from "@/assets/hq.jpeg";

// Reyansh Elanza Dedicated Master Renders & Architectural Floor Plans
import reyanshElanzaImg from "@/assets/projects/Reyansh Elanza/Reyansh Elanza.png";
import reyanshMaster3dRender from "@/assets/projects/Reyansh Elanza/Reyansh-Elanza-3d-render.jpg";
import floorPlanImg from "@/assets/projects/Reyansh Elanza/floor plan.png";

// Agriculture Authentic Photography
import agriFieldPhoto2 from "@/assets/projects/Agriculture/agriplastindia-20260923-0002.jpg";
import agriFieldPhoto3 from "@/assets/projects/Agriculture/agriplastindia-20260923-0003.jpg";
import agriFieldPhoto4 from "@/assets/projects/Agriculture/agriplastindia-20260923-0004.jpg";
import agriFieldPhoto5 from "@/assets/projects/Agriculture/agriplastindia-20260923-0005.jpg";
import agriFieldPhoto6 from "@/assets/projects/Agriculture/agriplastindia-20260923-0006.jpg";

export interface ProjectDossier {
  id: string;
  title: string;
  category: string;
  businessName: string;
  businessRoute: string;
  location: string;
  status: string;
  timeline: string;
  leadBannerImg: string;
  secondaryImg1?: string;
  secondaryImg2?: string;
  floorPlanImg?: string;
  executiveSummary: string;
  historyAndOrigin: string;
  technicalCapabilities: string;
  economicImpact: string;
  specifications: { label: string; value: string }[];
  keyMilestones: { quarter: string; title: string; desc: string }[];
  statutoryClearances: string[];
}

export const projectsRegistry: Record<string, ProjectDossier> = {
  // --- 1. HEALTHCARE ---
  "bbsr-hospital": {
    id: "bbsr-hospital",
    title: "Bhubaneswar Flagship Medical Center",
    category: "Healthcare & Cardiovascular Sciences",
    businessName: "RashBhar HealthCare",
    businessRoute: "/ventures/healthcare",
    location: "Bhubaneswar, Odisha, India",
    status: "Under Construction",
    timeline: "Target Phase-1 Commissioning: Q4 2026",
    leadBannerImg: projectHospitalImg,
    executiveSummary:
      "A flagship 500-bed greenfield tertiary and quaternary medical institution in Bhubaneswar, built with a 300-bed dedicated Cardiovascular Centre of Excellence to bridge critical advanced medical care deficits across Eastern India.",
    historyAndOrigin:
      "Initiated as the cornerstone institution of RashBhar HealthCare, the Bhubaneswar Medical Center addresses the acute scarcity of localized tertiary cardiac and intensive critical care in Eastern India. The project combines state-of-the-art civil infrastructure executed by Innovex Construction with advanced medical systems to eliminate the need for regional patients to travel to distant metros for complex life-saving procedures.",
    technicalCapabilities:
      "Spanning over 650,000 square feet, the campus incorporates 12 modular ultra-clean laminar airflow surgical theaters, three dedicated high-precision biplane cardiac catheterization suites, a 120-bed digital intensive care mesh, 128-slice CT diagnostics, and an on-site PSA medical oxygen generation hub capable of sustained emergency autonomy.",
    economicImpact:
      "Upon full commissioning, the center will generate over 1,800 direct clinical and administrative jobs, including positions for 180+ super-specialist doctors, and support an estimated 3,500 indirect local livelihoods across auxiliary pharmaceutical, diagnostic, and logistics corridors.",
    specifications: [
      { label: "Total Inpatient Beds", value: "500 High-Acuity Beds" },
      { label: "Cardiology Beds", value: "300 Dedicated Cardiac Beds" },
      { label: "ICU / Critical Beds", value: "120 Digital Monitored Beds" },
      { label: "Operation Theaters", value: "12 Modular Laminar-Air OTs" },
      { label: "Cardiac Cath-Labs", value: "3 Biplane Interventional Labs" },
      { label: "Oxygen Autonomy", value: "100% On-Site PSA Generation" },
    ],
    keyMilestones: [
      { quarter: "Q3 2024", title: "Civil Foundation & Deep Piling", desc: "Completed 1,200 structural pile caps by Innovex Construction." },
      { quarter: "Q2 2025", title: "Superstructure Topping Out", desc: "Completion of 9-floor clinical and diagnostics tower block." },
      { quarter: "Q1 2026", title: "MEP & Cleanroom Installation", desc: "Commissioning of HVAC laminar airflow and medical gas pipeline networks." },
      { quarter: "Q4 2026", title: "Phase-1 Clinical Launch", desc: "Commencement of OPD, Emergency Trauma Center, and Cath-Lab operations." },
    ],
    statutoryClearances: [
      "Directorate of Medical Education & Training (DMET) Clearance",
      "NABH Pre-Accreditation Technical Compliance",
      "AERB Radiation Safety Clearance for Cath-Labs & CT Arrays",
      "State Pollution Control Board Consent to Establish (CTE)",
    ],
  },
  "swasthya-saathi": {
    id: "swasthya-saathi",
    title: "Swasthya Saathi Digital Health Platform",
    category: "Digital Healthcare & Telemedicine",
    businessName: "RashBhar HealthCare",
    businessRoute: "/ventures/healthcare",
    location: "Pan-India Operational Mesh (Eastern India Focus)",
    status: "Active Deployment",
    timeline: "Target Expansion: Q2 2027",
    leadBannerImg: projectSarthiImg,
    secondaryImg1: technologyImg,
    secondaryImg2: hqImg,
    executiveSummary:
      "A comprehensive digital health and telemedicine ecosystem offering multilingual clinical triage, emergency dispatch mesh, digital health records, and remote specialist consultations for rural and urban populations.",
    historyAndOrigin:
      "Developed to bridge the geographic and language divide in healthcare access, Swasthya Saathi connects remote rural communities directly with tertiary specialists in Bhubaneswar. Utilizing voice-first conversational AI, it enables vernacular-speaking citizens to describe symptoms in their native dialect and receive instantaneous medical routing.",
    technicalCapabilities:
      "Engineered on top of sovereign RashtrAI language models, Swasthya Saathi incorporates low-latency voice recognition for 12 Indian regional languages, an encrypted FHIR-compliant personal health record registry, and real-time geospatial tele-triage dispatch. Hosted 100% on sovereign domestic infrastructure.",
    economicImpact:
      "Slashing travel expenditures for rural households by connecting over 150 regional primary diagnostic clinics directly to tertiary cardiologists and specialists in Bhubaneswar.",
    specifications: [
      { label: "Language Support", value: "12+ Vernacular Indian Dialects" },
      { label: "Data Architecture", value: "100% On-Premise Sovereign Cloud" },
      { label: "Security Protocol", value: "End-to-End AES-256 / ABDM Ready" },
      { label: "Dispatch Latency", value: "< 90 Seconds Emergency Routing" },
      { label: "Rural Clinic Nodes", value: "150+ Connected Primary Nodes" },
      { label: "Telemedicine SLA", value: "24/7 Super-Specialist Availability" },
    ],
    keyMilestones: [
      { quarter: "Q4 2024", title: "Vernacular NLP Model Training", desc: "Trained regional dialect speech datasets across rural districts." },
      { quarter: "Q2 2025", title: "Pilot Telemedicine Corridor", desc: "Linked 50 rural primary diagnostic centers in Western Odisha." },
      { quarter: "Q4 2025", title: "Live Emergency Integration", desc: "Connected live donor registries and regional emergency inventories." },
      { quarter: "Q2 2027", title: "Pan-India Expansion", desc: "Scaling network to 1,000+ regional clinics across eastern industrial belts." },
    ],
    statutoryClearances: [
      "Ayushman Bharat Digital Mission (ABDM) Integration Standards",
      "MeitY Sovereign In-Country Data Hosting Certification",
      "Telemedicine Practice Guidelines Compliance (NMC)",
      "ISO 27001 Information Security Management Certification",
    ],
  },
  "sarthi-platform": {
    id: "sarthi-platform",
    title: "Swasthya Saathi Digital Health Platform",
    category: "Digital Healthcare & Telemedicine",
    businessName: "RashBhar HealthCare",
    businessRoute: "/ventures/healthcare",
    location: "Pan-India Operational Mesh (Eastern India Focus)",
    status: "Active Deployment",
    timeline: "Target Expansion: Q2 2027",
    leadBannerImg: projectSarthiImg,
    secondaryImg1: technologyImg,
    secondaryImg2: hqImg,
    executiveSummary:
      "A comprehensive digital health and telemedicine ecosystem offering multilingual clinical triage, emergency dispatch mesh, digital health records, and remote specialist consultations for rural and urban populations.",
    historyAndOrigin:
      "Developed to bridge the geographic and language divide in healthcare access, Swasthya Saathi connects remote rural communities directly with tertiary specialists in Bhubaneswar.",
    technicalCapabilities:
      "Engineered on top of sovereign RashtrAI language models, Swasthya Saathi incorporates low-latency voice recognition for 12 Indian regional languages, encrypted health records, and emergency dispatch.",
    economicImpact:
      "Connecting over 150 regional primary diagnostic clinics directly to tertiary cardiologists and specialists.",
    specifications: [
      { label: "Language Support", value: "12+ Vernacular Indian Dialects" },
      { label: "Data Architecture", value: "100% On-Premise Sovereign Cloud" },
      { label: "Security Protocol", value: "End-to-End AES-256 / ABDM Ready" },
      { label: "Rural Clinic Nodes", value: "150+ Connected Primary Nodes" },
    ],
    keyMilestones: [
      { quarter: "Q4 2024", title: "Vernacular NLP Model Training", desc: "Trained regional dialect speech datasets." },
      { quarter: "Q2 2025", title: "Pilot Telemedicine Corridor", desc: "Linked 50 rural primary diagnostic centers." },
    ],
    statutoryClearances: [
      "Ayushman Bharat Digital Mission (ABDM) Compliance",
      "ISO 27001 Information Security Management Certification",
    ],
  },

  // --- 2. TECHNOLOGY ---
  "rashtrai": {
    id: "rashtrai",
    title: "RashtrAI Enterprise Intelligence Platform",
    category: "Deep-Tech & Sovereign AI",
    businessName: "RashBhar Technology",
    businessRoute: "/ventures/technology",
    location: "Sovereign Tier-4 Data Infrastructure",
    status: "Active Enterprise Deployment",
    timeline: "Continuous Model Evolution & Expansion",
    leadBannerImg: technologyImg,
    secondaryImg1: hqImg,
    secondaryImg2: miningHighlightImg,
    executiveSummary:
      "A sovereign artificial intelligence platform engineered to automate high-complexity industrial workflows, telemetric predictive maintenance, and enterprise record compliance with 100% in-country data sovereignty.",
    historyAndOrigin:
      "Evolving from IndiaNova Tech into RashBhar Technology, RashtrAI ensures that Indian heavy enterprise operations, geological mine surveys, and proprietary supply chain algorithms remain strictly hosted on private, sovereign domestic hardware.",
    technicalCapabilities:
      "Incorporates 8 specialized autonomous agent meshes running on air-gapped GPU clusters. Features native vernacular understanding in 12+ Indian languages, deterministic verification sandboxes, under-100ms telemetry processing, and deep integration with industrial SCADA and ERP systems.",
    economicImpact:
      "Drives 30% faster incident response times across heavy industrial sites, automates 70% of routine regulatory documentation compliance, and eliminates multi-million dollar foreign AI API license dependencies.",
    specifications: [
      { label: "Data Hosting", value: "100% On-Premise Sovereign Tier-4" },
      { label: "Agentic Meshes", value: "8 Autonomous Specialized Roles" },
      { label: "Vernacular NLP", value: "12+ Regional Indian Languages" },
      { label: "Inference Response", value: "< 100ms Latency for Telemetry" },
      { label: "Security Protocol", value: "Air-Gapped AES-256 Quantum-Ready" },
      { label: "Deployment Target", value: "Heavy Industry, Logistics & Healthcare" },
    ],
    keyMilestones: [
      { quarter: "Q1 2024", title: "Foundation Model Pre-Training", desc: "Completed training of domain-adapted heavy industry language models." },
      { quarter: "Q3 2024", title: "Air-Gapped Edge Cluster Commissioning", desc: "Deployed local inference servers at mining and corporate headquarters." },
      { quarter: "Q1 2025", title: "Autonomous Site Log Automation", desc: "Automated real-time shift reporting across Group operations." },
      { quarter: "Q4 2026", title: "External Enterprise Beta Mesh", desc: "Extending air-gapped platform to strategic public sector partners." },
    ],
    statutoryClearances: [
      "MeitY Sovereign Data Localization Compliance",
      "ISO 27001 / SOC-2 Information Security Certification",
      "Indian Cyber Crime Coordination Centre (I4C) Guidelines",
      "National Critical Information Infrastructure Protection Compliance",
    ],
  },
  "rashtrai-workforce": {
    id: "rashtrai-workforce",
    title: "RashtrAI Enterprise Intelligence Platform",
    category: "Deep-Tech & Sovereign AI",
    businessName: "RashBhar Technology",
    businessRoute: "/ventures/technology",
    location: "Sovereign Tier-4 Data Infrastructure",
    status: "Active Enterprise Deployment",
    timeline: "Continuous Model Evolution & Expansion",
    leadBannerImg: technologyImg,
    secondaryImg1: hqImg,
    secondaryImg2: miningHighlightImg,
    executiveSummary:
      "A sovereign artificial intelligence platform engineered to automate high-complexity industrial workflows, telemetric predictive maintenance, and enterprise record compliance with 100% in-country data sovereignty.",
    historyAndOrigin:
      "Built at the RashBhar Technology Deep-Tech Laboratory in response to foreign cloud vulnerabilities.",
    technicalCapabilities:
      "Incorporates 8 specialized autonomous agent meshes running on air-gapped GPU clusters with vernacular NLP.",
    economicImpact:
      "Drives 30% faster incident response times across heavy industrial sites.",
    specifications: [
      { label: "Data Hosting", value: "100% On-Premise Sovereign Tier-4" },
      { label: "Inference Response", value: "< 100ms Latency for Telemetry" },
    ],
    keyMilestones: [
      { quarter: "Q1 2024", title: "Foundation Model Pre-Training", desc: "Completed domain-adapted models." },
    ],
    statutoryClearances: [
      "MeitY Sovereign Data Localization Compliance",
      "ISO 27001 Certification",
    ],
  },
  "rashtrai-labs": {
    id: "rashtrai-labs",
    title: "RashtrAI Labs R&D (v1.4, Agentic LLM & Pit Vision)",
    category: "Deep-Tech AI Research",
    businessName: "RashBhar Technology",
    businessRoute: "/ventures/technology",
    location: "Sovereign AI Laboratories",
    status: "Active R&D",
    timeline: "Continuous Core Engine Evolution",
    leadBannerImg: techImg,
    secondaryImg1: technologyImg,
    secondaryImg2: hqImg,
    executiveSummary:
      "Advanced AI research laboratory driving agentic LLM orchestration (v1.4), automated pit vision, real-time fleet telemetry analysis, and deterministic verification frameworks for high-reliability industrial use.",
    historyAndOrigin:
      "Established as the advanced research arm of RashBhar Technology, RashtrAI Labs explores computer vision, multimodal reasoning, and edge-device intelligence specifically adapted for extreme physical operating conditions.",
    technicalCapabilities:
      "Develops proprietary multi-modal neural architectures that monitor site CCTV cameras for safety violations, track vehicle fatigue indicators, process sub-surface geological telemetry, and synthesize shift analytics in real time.",
    economicImpact:
      "Provides proprietary technological differentiation across mining, construction, and supply chain verticals, reducing equipment downtime by an estimated 25%.",
    specifications: [
      { label: "Core Engines", value: "Pit Vision AI, Fleet Telemetry, Agentic LLM" },
      { label: "Latency Benchmark", value: "< 100ms Telemetry Inference on Edge" },
      { label: "Security", value: "Air-Gapped AES-256 Quantum-Resistant" },
      { label: "Current Version", value: "RashtrAI v1.4 Agentic Core" },
    ],
    keyMilestones: [
      { quarter: "Q2 2024", title: "Pit Vision AI Deployment", desc: "Real-time edge visual safety monitoring in active pits." },
      { quarter: "Q4 2024", title: "Fleet Telemetry Engine", desc: "Sub-second IoT sensor ingestion from heavy haulage trucks." },
      { quarter: "Q2 2025", title: "Agentic LLM v1.4 Release", desc: "Multi-agent autonomous tool calling and deterministic verification." },
    ],
    statutoryClearances: [
      "MeitY AI Governance & Safety Standards Compliance",
      "ISO 27001 Information Security Management",
    ],
  },
  "ved-ri": {
    id: "ved-ri",
    title: "VED Ri (Virtual Embodied Device for Robotic Intelligence)",
    category: "Embodied AI & Industrial Robotics",
    businessName: "RashBhar Technology",
    businessRoute: "/ventures/technology",
    location: "Advanced Robotics Facility",
    status: "R&D / Prototype Engineering",
    timeline: "Target Lab Prototype: Q4 2026",
    leadBannerImg: technologyImg,
    secondaryImg1: techImg,
    secondaryImg2: hqImg,
    executiveSummary:
      "Next-generation embodied artificial intelligence and robotics R&D exploring autonomous physical agents for hazardous industrial, subterranean mining, and logistics environments.",
    historyAndOrigin:
      "Initiated to solve high-hazard physical inspection challenges in deep underground mine shafts, high-voltage substations, and confined chemical spaces.",
    technicalCapabilities:
      "Combines spatial computing, reinforcement learning, and ruggedized edge hardware to execute high-precision inspection, automated material sampling, and hazardous area navigation.",
    economicImpact:
      "Protects human workers from dangerous environments while elevating inspection accuracy and structural fault detection in heavy assets.",
    specifications: [
      { label: "Domain", value: "Embodied AI & Physical Robotics" },
      { label: "Environments", value: "Subterranean Shafts, High-Hazard Zones" },
      { label: "Navigation", value: "Edge Spatial AI & Sensor Fusion" },
      { label: "Autonomy Level", value: "Semi-Autonomous Tele-Operation & SLAM" },
    ],
    keyMilestones: [
      { quarter: "Q3 2024", title: "Robotics Architecture Specification", desc: "Defined spatial computing and kinematics hardware." },
      { quarter: "Q1 2025", title: "Simulation Environment Testing", desc: "Validated subterranean navigation algorithms in virtual testbeds." },
      { quarter: "Q4 2026", title: "Physical Prototype Testing", desc: "Commissioning ruggedized field test unit." },
    ],
    statutoryClearances: [
      "DGMS Safety Guidelines for Subterranean Robotic Devices",
      "Bureau of Indian Standards (BIS) Electronics Clearances",
    ],
  },

  // --- 3. MINING ---
  "odisha-iron-ore": {
    id: "odisha-iron-ore",
    title: "Odisha Iron Ore Belt Project",
    category: "Mining & Mineral Resources",
    businessName: "RashBhar Mining Corporation",
    businessRoute: "/ventures/mining",
    location: "Sundergarh Mining District, Odisha",
    status: "Active Operations (Q4 2025)",
    timeline: "Ongoing Commercial Extraction & Eco-Reclamation",
    leadBannerImg: mineFieldPhoto1,
    secondaryImg1: mineDumperPhoto3,
    secondaryImg2: mineFieldPhoto2,
    executiveSummary:
      "A flagship high-grade iron ore extraction and logistics project in Sundergarh, Odisha, with a target capacity of 2.5–3 MTPA, designed around modern mine planning, AI-guided drilling, and smart conveyor networks.",
    historyAndOrigin:
      "Shaped through the acquisition of Utkal Mining in Q3 2025 and subsequent development under the RashBhar Mining operating platform. Operational since Q4 2025, the project modernizes extraction and material movement to supply high-grade ore to domestic steelmakers.",
    technicalCapabilities:
      "Incorporates AI-guided drilling, continuous 3D geological deposit modeling, smart overland conveyor networks, and multi-stage dry crushing/screening producing calibrated lump ore and +64% Fe fines. Features closed-loop Zero-Liquid Discharge water circuits and Eco-Control Zone compliance.",
    economicImpact:
      "Provides direct, formalized employment for local mining technicians, with 85% local district hiring preference and 10–20% of community needs addressed before commercial extraction.",
    specifications: [
      { label: "Target Capacity", value: "2.5 – 3.0 MTPA High-Grade Ore" },
      { label: "Ore Quality", value: "+64% Fe Calibrated Ore & Fines" },
      { label: "Material Movement", value: "Smart Overland Conveyor Network & Heavy Haulage Fleet" },
      { label: "Environmental Standard", value: "Eco-Control Zone & Closed-Loop Water Recycling" },
      { label: "Status", value: "Operational Since Q4 2025" },
      { label: "Primary Geography", value: "Sundergarh Mining District, Odisha" },
    ],
    keyMilestones: [
      { quarter: "Q3 2025", title: "Utkal Mining Acquisition", desc: "Completed asset acquisition and operational baseline assessment." },
      { quarter: "Q4 2025", title: "Commercial Operations Operational", desc: "Commenced commercial high-grade iron ore extraction and dispatch." },
      { quarter: "Q2 2026", title: "AI-Guided Drilling Integration", desc: "Integrated geological intelligence and smart conveyor links." },
    ],
    statutoryClearances: [
      "Ministry of Environment, Forest & Climate Change (MoEFCC) Clearance",
      "Directorate General of Mines Safety (DGMS) Standard Clearances",
      "State Pollution Control Board Consent to Operate (CTO)",
      "Indian Railways Direct Freight Siding Approvals",
    ],
  },
  "strategic-mining-corridors": {
    id: "strategic-mining-corridors",
    title: "Odisha Iron Ore Belt Project",
    category: "Mining & Mineral Resources",
    businessName: "RashBhar Mining Corporation",
    businessRoute: "/ventures/mining",
    location: "Sundergarh Mining District, Odisha",
    status: "Active Operations (Q4 2025)",
    timeline: "Ongoing Commercial Extraction & Eco-Reclamation",
    leadBannerImg: mineFieldPhoto1,
    secondaryImg1: mineDumperPhoto3,
    secondaryImg2: mineFieldPhoto2,
    executiveSummary:
      "A flagship high-grade iron ore extraction and logistics project in Sundergarh, Odisha, with a target capacity of 2.5–3 MTPA, designed around modern mine planning, AI-guided drilling, and smart conveyor networks.",
    historyAndOrigin:
      "Operational since Q4 2025 under RashBhar Mining Corporation.",
    technicalCapabilities:
      "Incorporates AI-guided drilling, 3D deposit modeling, and smart conveyor networks.",
    economicImpact:
      "Direct employment and 10–20% community investment before mining.",
    specifications: [
      { label: "Target Capacity", value: "2.5 – 3.0 MTPA High-Grade Ore" },
      { label: "Status", value: "Operational Since Q4 2025" },
    ],
    keyMilestones: [
      { quarter: "Q4 2025", title: "Commercial Operations", desc: "Commenced extraction and dispatch." },
    ],
    statutoryClearances: [
      "MoEFCC & DGMS Clearances",
      "State Pollution Control Board CTO",
    ],
  },
  "odisha-mining-ops": {
    id: "odisha-mining-ops",
    title: "Odisha Iron Ore Belt Project",
    category: "Mining & Mineral Resources",
    businessName: "RashBhar Mining Corporation",
    businessRoute: "/ventures/mining",
    location: "Sundergarh Mining District, Odisha",
    status: "Active Operations (Q4 2025)",
    timeline: "Ongoing Commercial Extraction",
    leadBannerImg: mineFieldPhoto1,
    secondaryImg1: mineDumperPhoto3,
    secondaryImg2: mineFieldPhoto2,
    executiveSummary:
      "A flagship high-grade iron ore extraction and logistics project in Sundergarh, Odisha, with a target capacity of 2.5–3 MTPA.",
    historyAndOrigin:
      "Operational since Q4 2025 under RashBhar Mining Corporation.",
    technicalCapabilities:
      "High-grade iron ore extraction with smart conveyor network.",
    economicImpact:
      "Direct formalized employment with local hiring preference.",
    specifications: [
      { label: "Target Capacity", value: "2.5 – 3.0 MTPA" },
    ],
    keyMilestones: [
      { quarter: "Q4 2025", title: "Operational Launch", desc: "Active commercial operations." },
    ],
    statutoryClearances: [
      "MoEFCC & DGMS Approvals",
    ],
  },
  "jharkhand-coal-minerals": {
    id: "jharkhand-coal-minerals",
    title: "Jharkhand Integrated Coal & Rare Minerals Hub",
    category: "Mining & Strategic Minerals",
    businessName: "RashBhar Mining Corporation",
    businessRoute: "/ventures/mining",
    location: "Bokaro–Dhanbad Region, Jharkhand",
    status: "Development (Phase 1: Q3 2026)",
    timeline: "Phase 1 Commissioning: Q3 2026",
    leadBannerImg: mineFieldPhoto2,
    secondaryImg1: mineHaulerPhoto4,
    secondaryImg2: mineFieldPhoto1,
    executiveSummary:
      "A combined energy and strategic-mineral operating hub developing coal resources (1.8–2.2 MTPA) alongside 15,000 tonnes of critical minerals including lithium-bearing pegmatites in Jharkhand.",
    historyAndOrigin:
      "Expands RashBhar Mining beyond conventional bulk commodities into strategic resources vital for India's energy transition, EV manufacturing, and industrial base-load power requirements.",
    technicalCapabilities:
      "Engineered around a hybrid opencast and underground mining architecture with on-site ore upgrading, ~60% water recycling, solar-powered auxiliary microgrids, and comprehensive dust/noise mitigation.",
    economicImpact:
      "Fosters regional industrial employment, develops strategic domestic mineral sovereignty, and implements local community infrastructure programs prior to extraction.",
    specifications: [
      { label: "Coal Target", value: "1.8 – 2.2 MTPA" },
      { label: "Strategic Minerals Target", value: "15,000 Tonnes" },
      { label: "Key Targets", value: "Lithium-Bearing Pegmatites & Rare Minerals" },
      { label: "Water Recycling", value: "~60% Closed-Loop System" },
      { label: "Power Source", value: "Renewable-Powered Solar Operations" },
      { label: "Phase 1 Timeline", value: "Q3 2026 Commissioning" },
    ],
    keyMilestones: [
      { quarter: "Q4 2025", title: "Geological Re-Assessment", desc: "Detailed mapping of coal seams and lithium-bearing pegmatites." },
      { quarter: "Q1 2026", title: "Mine Planning & Clearances", desc: "Finalized hybrid opencast/underground engineering." },
      { quarter: "Q3 2026", title: "Phase-1 Operational Launch", desc: "Commencement of initial coal extraction and pilot mineral beneficiation." },
    ],
    statutoryClearances: [
      "Ministry of Coal & Mines Statutory Sanctions",
      "State Pollution Control Board Consent to Establish",
      "DGMS Operating Guidelines Compliance",
      "State Forest & Environment Clearances",
    ],
  },

  // --- 4. INFRASTRUCTURE (INNOVEX) ---
  "baripada-railway-station": {
    id: "baripada-railway-station",
    title: "Baripada Railway Station Redevelopment",
    category: "Railway Infrastructure & Public EPC",
    businessName: "Innovex Construction",
    businessRoute: "/businesses/construction",
    location: "Mayurbhanj District, Odisha",
    status: "Completed Project",
    timeline: "Completed On Schedule",
    leadBannerImg: innovexImg,
    secondaryImg1: hqImg,
    secondaryImg2: miningImg,
    executiveSummary:
      "Full redevelopment of the historic Baripada Railway Station under the Amrit Bharat Station Scheme of Indian Railways, delivering modernized passenger facilities and heritage architectural elements.",
    historyAndOrigin:
      "Awarded under the national station redevelopment mission to upgrade passenger terminal facilities and preserve the rich tribal and cultural heritage of the Mayurbhanj region.",
    technicalCapabilities:
      "Executed modern station terminal building, high-level platform extensions, circulating concourses, disabled-friendly infrastructure, drainage networks, and specialized heritage facade treatment.",
    economicImpact:
      "Significantly improved passenger travel comfort, boosted regional connectivity in northern Odisha, and generated hundreds of local construction and craftsmanship jobs.",
    specifications: [
      { label: "Program", value: "Amrit Bharat Station Scheme (Indian Railways)" },
      { label: "Scope", value: "Terminal Building, Platforms, Concourse, Facade" },
      { label: "Location", value: "Baripada, Mayurbhanj, Odisha" },
      { label: "Safety Benchmark", value: "Zero-Harm Incident Delivery" },
    ],
    keyMilestones: [
      { quarter: "Q2 2023", title: "Mobilization & Earthworks", desc: "Commenced site preparation and foundation piling." },
      { quarter: "Q1 2024", title: "Structural Concourse Execution", desc: "Completed reinforced concrete framework and platform roofs." },
      { quarter: "Q4 2024", title: "Handover & Commissioning", desc: "Delivered modernized station terminal to Indian Railways." },
    ],
    statutoryClearances: [
      "Indian Railways Safety & Quality Clearances",
      "Municipal Corporation Building Sanctions",
      "State Environmental Compliance",
    ],
  },
  "paradip-port-expansion": {
    id: "paradip-port-expansion",
    title: "Paradip Port Expansion & Bulk Cargo Infrastructure",
    category: "Marine & Port Infrastructure",
    businessName: "Innovex Construction",
    businessRoute: "/businesses/construction",
    location: "Paradip, Odisha",
    status: "Completed Project",
    timeline: "Completed in Collaboration with L&T",
    leadBannerImg: innovexImg,
    secondaryImg1: miningHighlightImg,
    secondaryImg2: hqImg,
    executiveSummary:
      "Marine civil engineering, deep piling, and bulk cargo handling foundations for coastal export-import logistics, executed in collaboration with L&T Construction at Paradip Port.",
    historyAndOrigin:
      "Paradip Port is India's premier bulk cargo maritime hub. Innovex provided precision civil construction and deep foundation capabilities to expand port handling capacity for dry bulk materials.",
    technicalCapabilities:
      "Constructed high-tensile reinforced concrete deep foundation piles, coastal bulk ore transfer points, heavy machinery pads, and storm-resilient coastal infrastructure under strict coastal environmental protocols.",
    economicImpact:
      "Expanded multi-million tonne bulk ore throughput capacity for domestic steel and industrial exporters in Eastern India.",
    specifications: [
      { label: "Partner", value: "Executed with L&T Construction" },
      { label: "Scope", value: "Marine Piling, Heavy Foundations, Bulk Cargo Facilities" },
      { label: "Location", value: "Paradip Port, Odisha" },
      { label: "Concrete Grade", value: "Marine Corrosion-Resistant High-Durability" },
    ],
    keyMilestones: [
      { quarter: "Q1 2023", title: "Deep Bored Piling", desc: "Completed specialized coastal foundation piles." },
      { quarter: "Q3 2023", title: "Transfer Tower Foundations", desc: "Poured heavy monolithic foundation rafts." },
      { quarter: "Q2 2024", title: "Commissioning & Handover", desc: "Integrated with bulk cargo logistics lines." },
    ],
    statutoryClearances: [
      "Paradip Port Authority Clearances",
      "Coastal Regulation Zone (CRZ) Compliance",
      "ISO 9001 / ISO 45001 Quality & Safety Standards",
    ],
  },
  "angul-talcher-corridor": {
    id: "angul-talcher-corridor",
    title: "Angul-Talcher Industrial Corridor Infrastructure",
    category: "Heavy Civil & Industrial EPC",
    businessName: "Innovex Construction",
    businessRoute: "/businesses/construction",
    location: "Angul–Talcher Industrial Belt, Odisha",
    status: "Completed Project",
    timeline: "Completed On Schedule",
    leadBannerImg: innovexImg,
    secondaryImg1: miningImg,
    secondaryImg2: hqImg,
    executiveSummary:
      "Heavy civil and structural infrastructure supporting energy, industrial, and processing complexes across Odisha's primary industrial heartland.",
    historyAndOrigin:
      "Engineered to support rapid industrial expansion in the Angul-Talcher belt, connecting industrial processing facilities with high-capacity transport corridors.",
    technicalCapabilities:
      "Includes foundation works for heavy equipment, industrial drainage networks, dedicated access roads, and structural steel framing designed for heavy operational loads.",
    economicImpact:
      "Accelerated commissioning timelines for industrial processing plants and eliminated transport bottlenecks.",
    specifications: [
      { label: "Domain", value: "Heavy Industrial Civil Engineering" },
      { label: "Scope", value: "Foundations, Drainage, Industrial Access Roads" },
      { label: "Geography", value: "Angul–Talcher Belt, Odisha" },
    ],
    keyMilestones: [
      { quarter: "Q2 2023", title: "Earthwork & Civil Grading", desc: "Completed 500,000 m3 of earth movement." },
      { quarter: "Q4 2023", title: "RCC Structures & Roads", desc: "Finished industrial grade roads and drainage." },
    ],
    statutoryClearances: [
      "State Industrial Infrastructure Development Corporation Sanctions",
      "Pollution Control Board CTE/CTO Clearances",
    ],
  },
  "sambalpur-smart-roads": {
    id: "sambalpur-smart-roads",
    title: "Sambalpur Smart Road Network & Urban Infrastructure",
    category: "Smart Urban Road Infrastructure",
    businessName: "Innovex Construction",
    businessRoute: "/businesses/construction",
    location: "Sambalpur, Odisha",
    status: "Completed Project",
    timeline: "Completed On Schedule",
    leadBannerImg: innovexImg,
    secondaryImg1: hqImg,
    secondaryImg2: realestateImg,
    executiveSummary:
      "Comprehensive urban road expansion, high-grade asphalt pavement laying, integrated stormwater management, and modern utility conduit networks in Sambalpur.",
    historyAndOrigin:
      "Executed to upgrade municipal arterial corridors in Western Odisha, accommodating rising vehicular traffic and eliminating monsoon inundation.",
    technicalCapabilities:
      "Engineered high-durability pavement, reinforced concrete box drains, subterranean utility ducts, and smart street lighting integration.",
    economicImpact:
      "Reduced municipal traffic transit times by 35% and drastically improved civic storm resilience.",
    specifications: [
      { label: "Scope", value: "Asphalt Roads, Storm Drains, Utility Conduits" },
      { label: "Location", value: "Sambalpur Urban Corridor, Odisha" },
      { label: "Durability Standard", value: "Heavy Axle Load & High Rainfall Rating" },
    ],
    keyMilestones: [
      { quarter: "Q1 2023", title: "Drainage Construction", desc: "Constructed storm drainage networks." },
      { quarter: "Q3 2023", title: "Pavement Laying", desc: "Completed high-spec bituminous road surfaces." },
    ],
    statutoryClearances: [
      "Municipal Corporation Approvals",
      "PWD Technical Compliance",
    ],
  },
  "eastern-coal-infrastructure": {
    id: "eastern-coal-infrastructure",
    title: "Eastern Coal Mining Heavy Civil & Rail Siding",
    category: "Mining Support EPC & Rail Infrastructure",
    businessName: "Innovex Construction",
    businessRoute: "/businesses/construction",
    location: "Jharkhand / Odisha Border",
    status: "Completed Project",
    timeline: "Delivered Ahead of Schedule (Zero-Harm)",
    leadBannerImg: innovexImg,
    secondaryImg1: miningImg,
    secondaryImg2: hqImg,
    executiveSummary:
      "Turnkey civil construction of heavy equipment maintenance workshops, haulage bridges, administrative hubs, and automated railway siding structures for large-scale coal mining.",
    historyAndOrigin:
      "Engineered to support round-the-clock mining operations and rapid train loading of bulk coal directly onto national rail corridors.",
    technicalCapabilities:
      "Constructed heavy reinforced foundation rafts, high-clearance maintenance bays, and specialized concrete rail siding platforms engineered to support 24/7 heavy industrial traffic.",
    economicImpact:
      "Delivered 1.2 million safe man-hours with zero lost-time injuries, streamlining regional coal evacuation.",
    specifications: [
      { label: "Scope", value: "Workshops, Rapid Rail Siding, Haulage Bridges" },
      { label: "Safety Record", value: "1.2 Million Safe Man-Hours" },
      { label: "Capacity", value: "24/7 Heavy Industrial Traffic Rating" },
    ],
    keyMilestones: [
      { quarter: "Q2 2023", title: "Site Mobilization & Piling", desc: "Completed heavy foundation piles." },
      { quarter: "Q4 2023", title: "Structural Steel Bays", desc: "Erected maintenance workshops." },
      { quarter: "Q2 2024", title: "Rail Siding Commissioning", desc: "Integrated with railway network." },
    ],
    statutoryClearances: [
      "DGMS Standard Operating Clearances",
      "Railway Board Siding Inspection Clearances",
    ],
  },
  "innovex-conveyor-facility": {
    id: "innovex-conveyor-facility",
    title: "Eastern Coal Mining Heavy Civil & Rail Siding",
    category: "Mining Support EPC & Rail Infrastructure",
    businessName: "Innovex Construction",
    businessRoute: "/businesses/construction",
    location: "Jharkhand / Odisha Border",
    status: "Completed Project",
    timeline: "Delivered Ahead of Schedule",
    leadBannerImg: innovexImg,
    secondaryImg1: miningImg,
    secondaryImg2: hqImg,
    executiveSummary:
      "Turnkey civil construction of heavy equipment workshops, haulage infrastructure, and automated railway siding structures.",
    historyAndOrigin:
      "Engineered by Innovex Construction to support round-the-clock bulk material handling.",
    technicalCapabilities:
      "Heavy foundations and automated rail siding platforms.",
    economicImpact:
      "Delivered 1.2 million safe man-hours with zero lost-time injuries.",
    specifications: [
      { label: "Scope", value: "Workshops, Rapid Rail Siding" },
      { label: "Safety", value: "Zero Lost-Time Incidents" },
    ],
    keyMilestones: [
      { quarter: "Q2 2024", title: "Full Handover", desc: "Asset fully commissioned." },
    ],
    statutoryClearances: [
      "DGMS & Railway Board Clearances",
    ],
  },

  // --- 5. AGRICULTURE (SOIL & SOUL) ---
  "organic-farming-jharkhand": {
    id: "organic-farming-jharkhand",
    title: "Organic Farming Hub — Jharkhand",
    category: "Organic Agriculture & Farmer Clusters",
    businessName: "RashBhar Soil & Soul",
    businessRoute: "/ventures/agriculture",
    location: "Jharkhand Tribal Belt",
    status: "Active Clusters",
    timeline: "Ongoing Cluster Expansion",
    leadBannerImg: agriFieldPhoto4,
    secondaryImg1: agriFieldPhoto3,
    secondaryImg2: agriFieldPhoto5,
    executiveSummary:
      "Integrated organic agricultural clusters bringing together certified organic cultivation, farmer networks, seed support, climate-resilient crop systems, and direct market linkages in Jharkhand.",
    historyAndOrigin:
      "Carrying forward the foundation of Bharat Agro (est. 2000, acquired Q3 2025), Soil & Soul establishes organized farmer clusters in tribal agrarian belts to regenerate soil and elevate farmer incomes.",
    technicalCapabilities:
      "Integrates certified non-chemical inputs, indigenous crop varieties, solar-powered drying, automated grading, batch traceability, and direct institutional buyback agreements.",
    economicImpact:
      "Empowers thousands of smallholder and tribal farming families with guaranteed buyback prices and higher realization over conventional middlemen markets.",
    specifications: [
      { label: "Model", value: "Certified Organic Cultivation & Clusters" },
      { label: "Geography", value: "Jharkhand Tribal Agrarian Belt" },
      { label: "Produce", value: "Indigenous Rice, Pulses, Millets & Spices" },
      { label: "Traceability", value: "Batch-Level Organic Certification" },
    ],
    keyMilestones: [
      { quarter: "Q3 2025", title: "Bharat Agro Integration", desc: "Integrated operating platform into Rashtra Bharosa Group." },
      { quarter: "Q4 2025", title: "Cluster Mobilization", desc: "Enrolled initial farmer clusters across Jharkhand." },
      { quarter: "Q2 2026", title: "Direct Buyback Launch", desc: "Initiated direct aggregation and processing pipelines." },
    ],
    statutoryClearances: [
      "National Programme for Organic Production (NPOP) Compliance",
      "FSSAI Food Safety Registration",
    ],
  },
  "agrigel-enhancer": {
    id: "agrigel-enhancer",
    title: "AgriGel™ Soil Enhancement Project",
    category: "Soil Science & Agritech R&D",
    businessName: "RashBhar Soil & Soul",
    businessRoute: "/ventures/agriculture",
    location: "Controlled Farmland Trial Facilities",
    status: "R&D / Multi-Season Trials",
    timeline: "Multi-Season Scientific Validation",
    leadBannerImg: soilImg,
    secondaryImg1: agriHighlightImg,
    secondaryImg2: hqImg,
    executiveSummary:
      "A proprietary gel-based soil enhancement technology engineered to stabilize subterranean root-zone moisture microclimates, enhance moisture retention, and slash irrigation demand by up to 50%.",
    historyAndOrigin:
      "Developed under the strict principle 'Do not claim first. Prove first.', AgriGel™ investigates the interaction between engineered bio-polymers and agricultural soil under water stress.",
    technicalCapabilities:
      "Non-toxic cellulose-grafted polymer networks that absorb and hold moisture in the root zone, releasing water steadily to plants and naturally biodegrading into neutral organic matter without microplastics.",
    economicImpact:
      "Reduces irrigation electricity/diesel costs for farmers by 40-50% while protecting crops from dry spells.",
    specifications: [
      { label: "Water Absorption Ratio", value: "Up to 400x Dry Granule Mass" },
      { label: "Irrigation Reduction", value: "40% – 50% Measured Savings" },
      { label: "Biodegradation", value: "18-Month Neutral Soil Cycle" },
      { label: "Status", value: "R&D / Controlled Multi-Season Trials" },
    ],
    keyMilestones: [
      { quarter: "Q1 2024", title: "Lab Synthesis", desc: "Validated laboratory moisture retention curves." },
      { quarter: "Q3 2024", title: "Bio-Safety Screening", desc: "Confirmed zero toxic residue in soil mechanics testing." },
      { quarter: "Q2 2025", title: "Controlled Field Trials", desc: "Multi-season crop trial validation." },
    ],
    statutoryClearances: [
      "Fertilizer Control Order (FCO) Technical Validation",
      "ICAR Field Efficacy Certification",
    ],
  },
  "agrigel-field-trials": {
    id: "agrigel-field-trials",
    title: "AgriGel™ Soil Enhancement Project",
    category: "Soil Science & Agritech R&D",
    businessName: "RashBhar Soil & Soul",
    businessRoute: "/ventures/agriculture",
    location: "Controlled Farmland Trial Facilities",
    status: "R&D / Multi-Season Trials",
    timeline: "Multi-Season Scientific Validation",
    leadBannerImg: soilImg,
    secondaryImg1: agriHighlightImg,
    secondaryImg2: hqImg,
    executiveSummary:
      "A proprietary gel-based soil enhancement technology engineered to stabilize subterranean root-zone moisture microclimates.",
    historyAndOrigin:
      "Developed under RashBhar Soil & Soul under the 'Prove First' doctrine.",
    technicalCapabilities:
      "Biodegradable hydrogel soil conditioners absorbing up to 400x dry mass in water.",
    economicImpact:
      "Slashing irrigation requirements while buffering crops during heatwaves.",
    specifications: [
      { label: "Mechanism", value: "Gel-Based Root-Zone Moisture Retention" },
    ],
    keyMilestones: [
      { quarter: "Q2 2025", title: "Field Trials", desc: "Multi-season validation." },
    ],
    statutoryClearances: [
      "FCO & ICAR Compliance",
    ],
  },
  "agrigel-rollout": {
    id: "agrigel-rollout",
    title: "AgriGel™ Soil Enhancement Project",
    category: "Soil Science & Agritech R&D",
    businessName: "RashBhar Soil & Soul",
    businessRoute: "/ventures/agriculture",
    location: "Controlled Farmland Trial Facilities",
    status: "R&D / Multi-Season Trials",
    timeline: "Multi-Season Scientific Validation",
    leadBannerImg: soilImg,
    secondaryImg1: agriHighlightImg,
    secondaryImg2: hqImg,
    executiveSummary:
      "A proprietary gel-based soil enhancement technology engineered to stabilize subterranean root-zone moisture microclimates.",
    historyAndOrigin:
      "Developed under RashBhar Soil & Soul.",
    technicalCapabilities:
      "Biodegradable hydrogel soil conditioning.",
    economicImpact:
      "Water savings and crop resilience.",
    specifications: [
      { label: "Mechanism", value: "Root-Zone Moisture Retention" },
    ],
    keyMilestones: [
      { quarter: "Q2 2025", title: "Validation", desc: "Multi-season trials." },
    ],
    statutoryClearances: [
      "FCO Compliance",
    ],
  },
  "agri-processing-coldchain": {
    id: "agri-processing-coldchain",
    title: "Agricultural Processing & Cold-Chain Infrastructure",
    category: "Post-Harvest Agribusiness & Cold Logistics",
    businessName: "RashBhar Soil & Soul",
    businessRoute: "/ventures/agriculture",
    location: "Eastern India Agrarian Corridors",
    status: "Under Development",
    timeline: "Phased Facility Commissioning: 2026-2027",
    leadBannerImg: agriFieldPhoto2,
    secondaryImg1: agriFieldPhoto6,
    secondaryImg2: agriFieldPhoto3,
    executiveSummary:
      "State-of-the-art post-harvest infrastructure including controlled-atmosphere cold storage, solar drying units, multi-commodity grading lines, and temperature-controlled logistics.",
    historyAndOrigin:
      "Conceived to eliminate massive post-harvest agricultural value losses in Eastern India and link farm clusters directly to national institutional supply channels.",
    technicalCapabilities:
      "Food-grade CA/MA cold storage chambers, automated optical sorting and grading lines, moisture-controlled solar dehydration units, and refrigerated reefer logistics.",
    economicImpact:
      "Protects perishable produce value, eliminates distress selling by farmers, and provides consistent quality to institutional off-takers.",
    specifications: [
      { label: "Facilities", value: "CA/MA Cold Storage, Solar Drying, Grading" },
      { label: "Geography", value: "Eastern India Agrarian Corridors" },
      { label: "Logistics", value: "Reefer Fleet & Multi-Modal Hubs" },
      { label: "Compliance", value: "Food-Grade & FSSAI Standards" },
    ],
    keyMilestones: [
      { quarter: "Q4 2025", title: "Hub Master Planning", desc: "Completed site selection and architectural designs." },
      { quarter: "Q2 2026", title: "Civil Erection", desc: "Commencing insulated warehouse construction." },
    ],
    statutoryClearances: [
      "FSSAI Food Storage & Distribution Clearances",
      "State Warehousing Corporation Compliance",
    ],
  },

  // --- 6. REAL ESTATE ---
  "reyansh-elanza": {
    id: "reyansh-elanza",
    title: "Reyansh Elanza Ultra-Luxury Residential Enclave",
    category: "Ultra-Luxury Residential Real Estate & Architectural Landmark",
    businessName: "RashBhar Real Estate",
    businessRoute: "/ventures/real-estate",
    location: "Prime Urban Growth Corridor, Patia / Infocity Axis, Bhubaneswar, Odisha",
    status: "Under Active Development & Architectural Execution",
    timeline: "Target Phased Handover: Q4 2027",
    leadBannerImg: reyanshMaster3dRender,
    floorPlanImg: floorPlanImg,
    executiveSummary:
      "Reyansh Elanza stands as RashBhar Real Estate's crown-jewel flagship residential enclave in Bhubaneswar, redefining ultra-luxury living across Eastern India. Conceived on a biophilic podium master plan, Reyansh Elanza seamlessly unites three iconic residential towers (Towers A, B, and C) encompassing bespoke 3 BHK & 4 BHK palatial residences, double-height cantilevered sky villas, and sky-deck penthouses with panoramic skyline views. Orchestrated under the Architectural Department of Reyansh Elanza, every inch of this landmark development is engineered for timeless elegance, maximum natural light, zero-compromise spatial efficiency, and 7-tier biometric security.",
    historyAndOrigin:
      "Conceived following the strategic acquisition of Innovex Real-Estate in Q4 2025, Reyansh Elanza represents the synthesis of multi-decade engineering expertise, seismic-resilient structural design, and world-class luxury hospitality standards. Designed in close collaboration with premier international master planners and structural consultants, the project establishes a new benchmark for branded residential enclaves in Odisha's capital region.",
    technicalCapabilities:
      "Engineered through full-lifecycle 3D BIM (Building Information Modeling) with multi-discipline clash detection and deterministic structural grids. Features high-performance acoustic and thermal low-E double-glazed façades, 100% Vastu-compliant layouts, double-height private sky balconies, centralized IoT-powered Building Management Systems (BMS), high-speed smart destination-controlled elevators, dedicated electric vehicle (EV) charging stations for every unit, 100% treated water recycling via zero-discharge STP, and IGBC Platinum-rated green architecture.",
    economicImpact:
      "A landmark ₹450+ Cr capital development generating 1,200+ specialized civil engineering and craft jobs during execution, while serving as a premier real estate asset class delivering projected 18-22% capital appreciation for luxury homeowners and institutional investors.",
    specifications: [
      { label: "Development Typology", value: "3 Iconic High-Rise Towers (A, B, C) + Central Podium" },
      { label: "Residential Configurations", value: "3 BHK (1,850 - 2,400 sq.ft) & 4 BHK Sky Villas (3,200+ sq.ft)" },
      { label: "Ceiling Clear Height", value: "11.2 Ft Palatial Floor-to-Ceiling Height" },
      { label: "Balcony Architecture", value: "8-Ft Deep Cantilevered Panoramic Sky Balconies" },
      { label: "Clubhouse Amenities", value: "25,000+ sq.ft 4-Level Ultra-Luxury Lifestyle Pavilion" },
      { label: "Aquatic Center", value: "Olympic-Length Infinity Pool + Kids' Heated Splash Pool" },
      { label: "Fitness & Wellness", value: "State-of-the-Art Technogym Fitness Suite & Yoga Deck" },
      { label: "Sports Infrastructure", value: "Indoor Badminton Court, Squash, Table Tennis & Billiards Lounge" },
      { label: "Security Framework", value: "7-Tier Biometric & AI Video Surveillance with RFID Car Entry" },
      { label: "Power & Water Resilience", value: "100% 24/7 Redundant DG Power Backup & Ultra-Pure Dual Plumbing" },
      { label: "Green Building Rating", value: "IGBC Platinum Certified Green Development" },
      { label: "Structural Engineering", value: "Seismic Zone IV Compliant High-Grade M50/M60 RCC" },
    ],
    keyMilestones: [
      { quarter: "Q4 2025", title: "Master Architectural Approval & BIM Freeze", desc: "Completed 3D BIM spatial clash-free models, core tower planning, and IGBC pre-certification." },
      { quarter: "Q1 2026", title: "Subterranean Deep Piling & Diaphragm Retaining Raft", desc: "Executed monolithic deep pile foundations, multi-level basement excavation, and retaining walls." },
      { quarter: "Q4 2026", title: "Tower Superstructures & Façade Glazing", desc: "High-rise structural RCC framing across Towers A, B, and C with climate-responsive envelope installation." },
      { quarter: "Q2 2027", title: "Clubhouse, Central Podium & MEP Commissioning", desc: "Podium biophilic landscaping, infinity pool commissioning, and IoT BMS integration." },
      { quarter: "Q4 2027", title: "Phased Handover & Elite Possession", desc: "Interior architecture fit-outs, statutory occupancy certificates (OC), and homeowner handover." },
    ],
    statutoryClearances: [
      "State RERA Project Registration & Sanctioned Development Plan",
      "BDA (Bhubaneswar Development Authority) Comprehensive Building Sanction",
      "State Environmental Impact Assessment Authority (SEIAA) Platinum Green Clearance",
      "Directorate of Fire Services NOC & High-Rise Structural Stability Certification",
      "Civil Aviation Authority (AAI) Height NOC & Pollution Control Board CTO",
    ],
  },

  // --- 7. INVESTMENTS (ROYAL BIRDS GROUP) ---
  "royal-birds-portfolio": {
    id: "royal-birds-portfolio",
    title: "Royal Birds Group Active Investment Portfolio",
    category: "Venture Capital & Strategic Holdings",
    businessName: "Royal Birds Group Limited",
    businessRoute: "/ventures/investments",
    location: "Hong Kong & India / Global",
    status: "Active Strategic Holdings",
    timeline: "Long-Term Strategic Equity Compounding",
    leadBannerImg: royalbirdsImg,
    secondaryImg1: hqImg,
    secondaryImg2: technologyImg,
    executiveSummary:
      "A multi-sector venture capital and strategic holding portfolio founded in Hong Kong in 2017 by Dr. Vedanshii Verma and Mr. Subransu Mohanty, deploying patient capital across Deep Tech, Infrastructure, Real Estate, HealthTech, AgriTech, and Clean Energy.",
    historyAndOrigin:
      "Established in 2017 as an independent Hong Kong-registered VC and holding firm, Royal Birds Group was formally acquired and registered under Rashtra Bharosa Group in April 2026, serving as the Group's dedicated venture capital and strategic investment engine.",
    technicalCapabilities:
      "Combines institutional capital deployment with deep operational governance, multi-sector synergy, board representation, and strategic market access across India and international markets.",
    economicImpact:
      "Catalyzes innovative startups and high-capex industrial initiatives, connecting emerging technology founders with established industrial execution ecosystems.",
    specifications: [
      { label: "Inception", value: "2017 (Hong Kong Registered)" },
      { label: "Founders", value: "Dr. Vedanshii Verma & Mr. Subransu Mohanty" },
      { label: "Primary Model", value: "Venture Capital & Strategic Holdings" },
      { label: "Key Verticals", value: "Deep Tech, Infra, Real Estate, Health, Agri" },
      { label: "Integration", value: "Part of Rashtra Bharosa Group (2026)" },
    ],
    keyMilestones: [
      { quarter: "2017", title: "Hong Kong Foundation", desc: "Founded by Dr. Vedanshii Verma and Mr. Subransu Mohanty." },
      { quarter: "2020-2025", title: "Multi-Sector Deployment", desc: "Investments across technology, infra, and healthcare." },
      { quarter: "April 2026", title: "Rashtra Bharosa Group Integration", desc: "Formally integrated as the Group's VC & strategic holding platform." },
    ],
    statutoryClearances: [
      "Hong Kong Companies Registry & VC Compliance",
      "Institutional Cross-Border Capital Transfer Standards",
      "Corporate Governance & Fiduciary Oversight Standards",
    ],
  },
  "investment-framework": {
    id: "investment-framework",
    title: "Royal Birds 9-Stage Evaluation & Diligence Framework",
    category: "Venture Capital Governance & Diligence",
    businessName: "Royal Birds Group Limited",
    businessRoute: "/ventures/investments",
    location: "Institutional Investment Directorate",
    status: "Active Institutional Framework",
    timeline: "Standard Institutional Operating Procedure",
    leadBannerImg: royalbirdsImg,
    secondaryImg1: hqImg,
    secondaryImg2: technologyImg,
    executiveSummary:
      "An institutional 9-stage evaluation lifecycle and 6-pillar due diligence standard governing venture capital deployment, asset transformation, and risk management across all target opportunities.",
    historyAndOrigin:
      "Refined over nearly a decade of international investment operations since 2017 to ensure disciplined capital allocation, eliminate speculative risks, and maximize long-term equity compounding.",
    technicalCapabilities:
      "Features a structured 9-stage lifecycle: Deal Sourcing, Initial Screening, Technical Evaluation, Commercial Diligence, Forensic Financial Audit, Legal Review, Investment Committee Approval, Milestone Tranche Deployment, and Post-Investment Governance.",
    economicImpact:
      "Protects investor capital, aligns founder incentives, and enforces institutional transparency across all portfolio entities.",
    specifications: [
      { label: "Evaluation Lifecycle", value: "9-Stage Structured Milestone System" },
      { label: "Due Diligence", value: "6-Pillar Forensic & Operational Standards" },
      { label: "Governance Model", value: "Milestone-Linked Capital Tranches" },
      { label: "Scope", value: "Venture Capital & Strategic Asset Acquisitions" },
    ],
    keyMilestones: [
      { quarter: "2017", title: "Framework Codification", desc: "Established original VC due diligence standards." },
      { quarter: "2026", title: "Enterprise Group Harmonization", desc: "Aligned with Rashtra Bharosa Group corporate governance." },
    ],
    statutoryClearances: [
      "Institutional Fiduciary Compliance Standards",
      "Anti-Money Laundering (AML) & KYC Regulatory Protocols",
    ],
  },
};

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const project = id ? projectsRegistry[id] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-white px-4">
        <div className="max-w-md text-center space-y-4">
          <Building2 size={48} className="mx-auto text-[#062B63]" />
          <h2 className="text-2xl font-bold text-slate-900">Project Not Found</h2>
          <p className="text-sm text-slate-600">
            The requested project dossier could not be located or may have been updated.
          </p>
          <Button asChild className="btn-primary">
            <Link to="/projects">Return to Project Directory</Link>
          </Button>
        </div>
      </div>
    );
  }

  // JSON-LD Structured Data Schema for AI Crawlers & LLMs
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "Place",
    name: project.title,
    description: project.executiveSummary,
    address: {
      "@type": "PostalAddress",
      addressLocality: project.location,
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "20.2961",
      longitude: "85.8245",
    },
    additionalProperty: project.specifications.map((spec) => ({
      "@type": "PropertyValue",
      name: spec.label,
      value: spec.value,
    })),
  };

  return (
    <div className="bg-white text-slate-900 font-sans antialiased min-h-screen">
      {/* Dynamic SEO Meta Injection with Project Lead Banner as OG Image */}
      <MetaTags
        title={`${project.title} | ${project.businessName}`}
        description={project.executiveSummary}
        image={project.leadBannerImg}
        type="website"
        schema={jsonLdData}
      />

      {/* Semantic JSON-LD for AI Search & Crawlers */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />

      {/* 1. Hero Section with Banner Media */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 bg-[#041633] text-white overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <img
            src={project.leadBannerImg}
            alt={project.title}
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#041633] via-[#041633]/80 to-transparent"></div>
        </div>

        <div className="max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/projects"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-white transition-colors"
            >
              <ArrowLeft size={14} /> Back to Projects Directory
            </Link>
            <span className="text-white/30">•</span>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/15 text-brand-gold border border-white/20 backdrop-blur-md">
              {project.category}
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-tight max-w-4xl">
            {project.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 pt-2 text-xs sm:text-sm text-slate-300 font-medium">
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-brand-gold" />
              <span>{project.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Activity size={16} className="text-brand-gold" />
              <span>Status: <strong className="text-white">{project.status}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-brand-gold" />
              <span>{project.timeline}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Executive Overview: Strict 50:50 Side-by-Side Split */}
      <section className="py-12 lg:py-16 bg-white border-b border-slate-200">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Visual Column (50% Desktop): Dual-Photo Gallery */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 group aspect-[16/10] bg-slate-100">
                <img
                  src={project.leadBannerImg}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#041633]/70 via-transparent to-transparent pointer-events-none"></div>
                <div className="absolute bottom-4 left-6 right-6 text-white">
                  <div className="text-xs font-bold uppercase tracking-wider text-brand-gold">Flagship Operating Asset</div>
                  <div className="text-sm font-semibold">{project.title}</div>
                </div>
              </div>

              {/* Secondary Dual Asset Strip (Only rendered if images exist) */}
              {(project.secondaryImg1 || project.secondaryImg2) && (
                <div className="grid grid-cols-2 gap-4">
                  {project.secondaryImg1 && (
                    <div className="relative rounded-xl overflow-hidden shadow-xs border border-slate-200 aspect-[16/9] bg-slate-100 group">
                      <img
                        src={project.secondaryImg1}
                        alt="Operational View 1"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-2.5">
                        <span className="text-[11px] font-semibold text-white tracking-wide">
                          Site Engineering View
                        </span>
                      </div>
                    </div>
                  )}
                  {project.secondaryImg2 && (
                    <div className="relative rounded-xl overflow-hidden shadow-xs border border-slate-200 aspect-[16/9] bg-slate-100 group">
                      <img
                        src={project.secondaryImg2}
                        alt="Operational View 2"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-2.5">
                        <span className="text-[11px] font-semibold text-white tracking-wide">
                          Infrastructure Asset
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Editorial Narrative Column (50% Desktop) */}
            <div className="lg:col-span-6 space-y-5">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-widest text-[#062B63] block">
                  Project Dossier & Background
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight uppercase leading-tight">
                  Executive Brief & National Impact
                </h2>
              </div>

              <div className="space-y-3.5 text-slate-600 text-sm sm:text-base leading-relaxed text-justify sm:text-left font-normal">
                <p>{project.executiveSummary}</p>
                <p>{project.historyAndOrigin}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#062B63]">
                    Parent Operating Vertical
                  </div>
                  <div className="text-sm font-bold text-slate-900">{project.businessName}</div>
                </div>
                <Button asChild variant="outline" className="text-xs font-bold text-[#062B63] border-slate-300">
                  <Link to={project.businessRoute}>
                    View Vertical <ExternalLink size={13} className="ml-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Technical Capabilities & Economic Impact (50:50 Alternating Split) */}
      <section className="py-12 lg:py-16 bg-[#F8FAFC] border-b border-slate-200">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Left: Technical Dossier */}
            <div className="lg:col-span-6 space-y-5">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-widest text-[#062B63] block">
                  Engineering Architecture
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase">
                  Technical Specifications & Impact
                </h3>
              </div>

              <div className="space-y-3.5 text-slate-600 text-sm sm:text-base leading-relaxed text-justify sm:text-left">
                <p>{project.technicalCapabilities}</p>
                <p>{project.economicImpact}</p>
              </div>
            </div>

            {/* Right: Technical Specs Grid */}
            <div className="lg:col-span-6">
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
                <h4 className="text-xs font-bold uppercase tracking-widest text-[#062B63]">
                  Key Technical Specifications
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.specifications.map((spec, sIdx) => (
                    <div key={sIdx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                      <div className="text-[11px] font-semibold text-slate-500 uppercase">{spec.label}</div>
                      <div className="text-sm font-bold text-[#062B63]">{spec.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* 3.6 Master Floor Plan & Spatial Configuration (If floorPlanImg is present) */}
      {project.floorPlanImg && (
        <section className="py-14 lg:py-20 bg-[#F8FAFC] border-b border-slate-200">
          <div className="max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-12 space-y-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-[#062B63]/10 text-[#062B63] border border-[#062B63]/20">
                  <span className="w-2 h-2 rounded-full bg-[#062B63]"></span>
                  <span>Architectural Spatial Layout</span>
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight uppercase">
                  Master Floor Plan & Tower Configurations
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
                  Detailed spatial schematic showing the integrated residential layout: Tower A, Tower B, Tower C, central landscaped podium park, and the dedicated recreational clubhouse deck.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs font-bold text-slate-700 shadow-xs">
                  Orientation: <span className="text-[#062B63]">North Aligned (Vastu & Solar Compliant)</span>
                </div>
              </div>
            </div>

            {/* High-Resolution Floor Plan Image Viewer */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-white p-4 sm:p-6 group">
              <div className="relative overflow-hidden rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                <img
                  src={project.floorPlanImg}
                  alt="Reyansh Elanza Second Floor Plan & Tower Master Layout"
                  className="w-full h-auto max-h-[800px] object-contain group-hover:scale-101 transition-transform duration-500"
                />
              </div>
              <div className="pt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 border-t border-slate-100 mt-4">
                <span className="font-semibold text-slate-800">
                  Reyansh Elanza — Second Floor Plan & Central Recreational Podium
                </span>
                <span className="text-slate-400">Architectural Department Sanctioned Blueprint</span>
              </div>
            </div>

            {/* Tower Layout & Configuration Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-xs">
                <div className="text-xs font-bold text-[#062B63] uppercase tracking-wider">Tower A (West Wing)</div>
                <div className="text-sm font-bold text-slate-900">3 BHK & 2 BHK Residences</div>
                <p className="text-xs text-slate-600">Dual high-speed passenger elevators, dedicated fire stairwells, and unobstructed central lawn views.</p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-xs">
                <div className="text-xs font-bold text-[#062B63] uppercase tracking-wider">Tower B (North Wing)</div>
                <div className="text-sm font-bold text-slate-900">3 BHK & 2 BHK Luxury Units</div>
                <p className="text-xs text-slate-600">Central lift lobby with quadruple high-speed elevators, cross-ventilation corridor, and garden terraces.</p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-xs">
                <div className="text-xs font-bold text-[#062B63] uppercase tracking-wider">Tower C (East Wing)</div>
                <div className="text-sm font-bold text-slate-900">3 BHK & 2 BHK Residences</div>
                <p className="text-xs text-slate-600">Morning sunrise orientation, private foyer entries, and seamless podium connectivity.</p>
              </div>

              <div className="p-5 rounded-2xl bg-[#041633] text-white border border-[#041633] space-y-2 shadow-xs">
                <div className="text-xs font-bold text-brand-gold uppercase tracking-wider">Clubhouse & Terrace</div>
                <div className="text-sm font-bold text-white">Second Floor Amenity Pavilion</div>
                <p className="text-xs text-slate-300">Modern Gymnasium, Yoga/Multipurpose Hall, Indoor Games Arena & Expansive Open Landscaped Terrace.</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3.8 Dedicated Ultra-Luxury Real Estate Showcase (For Reyansh Elanza) */}
      {project.id === "reyansh-elanza" && (
        <>
          {/* Section: Bespoke Residential Collections & Floor Configurations */}
          <section className="py-16 lg:py-24 bg-white border-b border-slate-200">
            <div className="max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-12 space-y-12">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-[#062B63]/10 text-[#062B63] border border-[#062B63]/20">
                    <Sparkles size={13} className="text-[#062B63]" />
                    <span>Exclusive Residential Portfolio</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight uppercase">
                    Bespoke Unit Typologies & Floor Configurations
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
                    Every residence is master-crafted with expansive cross-ventilated layouts, double-height ceiling volumes, premium Italian marble flooring, and private elevator foyer access.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Total Units: <strong className="text-slate-900">Limited Collection</strong>
                  </span>
                </div>
              </div>

              {/* 3-Tier Luxury Typology Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                {/* 1. The Royal 3 BHK */}
                <div className="rounded-3xl border border-slate-200 bg-slate-50/50 p-6 sm:p-8 space-y-6 hover:shadow-xl hover:border-[#062B63]/30 transition-all duration-300 flex flex-col justify-between group">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#062B63]/10 text-[#062B63]">
                        Type 3A / 3B
                      </span>
                      <span className="text-xs font-bold text-slate-400">Towers A, B & C</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-slate-900 uppercase">The Royal 3 BHK Residence</h4>
                      <p className="text-xs text-slate-500 mt-1">1,850 – 2,250 Sq.Ft. Carpet Area</p>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Generous triple-bedroom suites with dedicated servant room, open-concept German modular kitchen, and double panoramic balconies overlooking the biophilic central podium.
                    </p>
                    <div className="space-y-2 pt-2 border-t border-slate-200/80">
                      {[
                        "3 Master Bedrooms with Ensuite Bathrooms",
                        "8-Ft Deep Master Deck with Podium Views",
                        "Separate Wet & Dry Modular Kitchen Area",
                        "100% Vastu-Compliant East/North Entry",
                        "Dedicated 2 Covered Stilt Car Parking Bays",
                      ].map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-700">
                          <Check size={14} className="text-[#062B63] shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="pt-4 border-t border-slate-200">
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-600 bg-white p-2.5 rounded-xl border border-slate-200/80">
                      <span>Orientation: North-East Facing</span>
                      <span className="text-[#062B63] font-bold">Floors: 2nd – 18th</span>
                    </div>
                  </div>
                </div>

                {/* 2. The Imperial 4 BHK Sky Villa (Featured) */}
                <div className="rounded-3xl border-2 border-brand-gold bg-[#041633] text-white p-6 sm:p-8 space-y-6 shadow-2xl relative flex flex-col justify-between transform md:-translate-y-2">
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-brand-gold text-slate-950 px-4 py-1 rounded-full text-[11px] font-black uppercase tracking-wider shadow-md">
                    Signature Flagship Edition
                  </div>
                  <div className="space-y-4 pt-2">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-brand-gold/20 text-brand-gold border border-brand-gold/30">
                        Type 4A Luxury Villa
                      </span>
                      <span className="text-xs font-bold text-slate-400">Tower B Premium</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-white uppercase">The Imperial 4 BHK Sky Villa</h4>
                      <p className="text-xs text-brand-gold mt-1">2,850 – 3,400 Sq.Ft. Carpet Area</p>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      Palatial corner sky residences featuring 11.2-ft ceiling heights, private elevator lobby foyer, double-height wrap-around terrace, and separate family entertainment lounge.
                    </p>
                    <div className="space-y-2 pt-2 border-t border-white/10">
                      {[
                        "4 Grand Suites + Private Maid / Utility Room",
                        "Double-Height Wrap-Around Viewing Deck",
                        "Imported Italian Marble in Foyer, Living & Dining",
                        "Centralized VRV Air Conditioning Integration",
                        "Smart Home Automation Suite with Touch Pads",
                        "Dedicated 3 EV-Ready Covered Parking Bays",
                      ].map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-200">
                          <Check size={14} className="text-brand-gold shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="pt-4 border-t border-white/10">
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-300 bg-white/5 p-2.5 rounded-xl border border-white/10">
                      <span>Corner Wings with Dual Terraces</span>
                      <span className="text-brand-gold font-bold">Floors: 6th – 22nd</span>
                    </div>
                  </div>
                </div>

                {/* 3. The Presidential Sky Penthouse */}
                <div className="rounded-3xl border border-slate-200 bg-slate-50/50 p-6 sm:p-8 space-y-6 hover:shadow-xl hover:border-[#062B63]/30 transition-all duration-300 flex flex-col justify-between group">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#062B63]/10 text-[#062B63]">
                        Top Floor Duplex
                      </span>
                      <span className="text-xs font-bold text-slate-400">Exclusive Top Deck</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-slate-900 uppercase">Presidential Sky Penthouse</h4>
                      <p className="text-xs text-slate-500 mt-1">4,800+ Sq.Ft. Duplex Layout</p>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      The epitome of aristocratic living. Multi-level duplex penthouse with private sky deck, temperature-controlled plunge pool, personal gymnasium niche, and 360-degree city views.
                    </p>
                    <div className="space-y-2 pt-2 border-t border-slate-200/80">
                      {[
                        "Private Rooftop Sky Deck & Heated Plunge Pool",
                        "Dedicated High-Speed Biometric Elevator Access",
                        "Double-Height Glass Façade with Panoramic Horizon",
                        "Personal Bar, Home Theater & Private Study",
                        "Dedicated Butler Pantry & Staff Quarters",
                        "4 Reserved Multi-Bay EV Parking Slots",
                      ].map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-700">
                          <Check size={14} className="text-[#062B63] shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="pt-4 border-t border-slate-200">
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-600 bg-white p-2.5 rounded-xl border border-slate-200/80">
                      <span>Full-Floor Duplex Penthouse</span>
                      <span className="text-[#062B63] font-bold">Top Skydeck Level</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section: World-Class 5-Star Resort Amenities Suite */}
          <section className="py-16 lg:py-24 bg-[#030e21] text-white border-b border-white/10">
            <div className="max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-12 space-y-12">
              <div className="max-w-3xl space-y-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-white/10 text-brand-gold border border-white/20">
                  <Star size={13} className="text-brand-gold" />
                  <span>35+ Curated Lifestyle Privileges</span>
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight uppercase">
                  World-Class Resort Amenities & Leisure Infrastructure
                </h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  Reyansh Elanza delivers an uncompromising lifestyle ecosystem designed to rival the world's most prestigious luxury resorts.
                </p>
              </div>

              {/* 6 Category Pillar Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* 1. Aquatic & Wellness Oasis */}
                <div className="p-6 sm:p-7 rounded-2xl bg-white/5 border border-white/10 space-y-4 hover:border-brand-gold/40 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-brand-gold/15 text-brand-gold flex items-center justify-center border border-brand-gold/30">
                    <Waves size={24} />
                  </div>
                  <h4 className="text-base font-bold text-white uppercase">Aquatic & Hydro Wellness</h4>
                  <ul className="space-y-2 text-xs text-slate-300">
                    <li className="flex items-start gap-2">• <span>Olympic-Length Infinity Edge Swimming Pool</span></li>
                    <li className="flex items-start gap-2">• <span>Heated Children’s Splash Pool with Water Jets</span></li>
                    <li className="flex items-start gap-2">• <span>Submerged Poolside Sun Loungers & Cabanas</span></li>
                    <li className="flex items-start gap-2">• <span>Hydrotherapy Spa, Steam & Nordic Sauna Suites</span></li>
                  </ul>
                </div>

                {/* 2. Fitness & Sports Arena */}
                <div className="p-6 sm:p-7 rounded-2xl bg-white/5 border border-white/10 space-y-4 hover:border-brand-gold/40 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-brand-gold/15 text-brand-gold flex items-center justify-center border border-brand-gold/30">
                    <Dumbbell size={24} />
                  </div>
                  <h4 className="text-base font-bold text-white uppercase">Elite Sports & Fitness Arena</h4>
                  <ul className="space-y-2 text-xs text-slate-300">
                    <li className="flex items-start gap-2">• <span>High-Tech Gymnasium with Technogym Equipment</span></li>
                    <li className="flex items-start gap-2">• <span>Indoor Air-Conditioned Badminton & Squash Courts</span></li>
                    <li className="flex items-start gap-2">• <span>Zen Yoga Pavilion & Aerial Pilates Studio</span></li>
                    <li className="flex items-start gap-2">• <span>Table Tennis, Billiards & Snooker Executive Lounge</span></li>
                  </ul>
                </div>

                {/* 3. Clubhouse & Social Entertaining */}
                <div className="p-6 sm:p-7 rounded-2xl bg-white/5 border border-white/10 space-y-4 hover:border-brand-gold/40 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-brand-gold/15 text-brand-gold flex items-center justify-center border border-brand-gold/30">
                    <Sparkles size={24} />
                  </div>
                  <h4 className="text-base font-bold text-white uppercase">Grand 25,000 Sq.Ft. Clubhouse</h4>
                  <ul className="space-y-2 text-xs text-slate-300">
                    <li className="flex items-start gap-2">• <span>Double-Height Grand Reception & Concierge Lobby</span></li>
                    <li className="flex items-start gap-2">• <span>Multi-Cuisine Banquet Hall for 350+ Guests</span></li>
                    <li className="flex items-start gap-2">• <span>Private Mini-Cinema with 4K Laser Projection & Dolby Atmos</span></li>
                    <li className="flex items-start gap-2">• <span>Executive Business Center & Co-Working Pods</span></li>
                  </ul>
                </div>

                {/* 4. Biophilic Greens & Children's Park */}
                <div className="p-6 sm:p-7 rounded-2xl bg-white/5 border border-white/10 space-y-4 hover:border-brand-gold/40 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-brand-gold/15 text-brand-gold flex items-center justify-center border border-brand-gold/30">
                    <Trees size={24} />
                  </div>
                  <h4 className="text-base font-bold text-white uppercase">Central Biophilic Courtyard</h4>
                  <ul className="space-y-2 text-xs text-slate-300">
                    <li className="flex items-start gap-2">• <span>1.5-Acre Central Landscaped Lawn & Zen Garden</span></li>
                    <li className="flex items-start gap-2">• <span>Reflexology Walking Pathways & Senior Citizens' Deck</span></li>
                    <li className="flex items-start gap-2">• <span>EPDM Rubberized Toddler Play Zone with Adventure Maze</span></li>
                    <li className="flex items-start gap-2">• <span>Fragrance Garden, Water Cascades & Gazebo Seating</span></li>
                  </ul>
                </div>

                {/* 5. 7-Tier Biometric Security */}
                <div className="p-6 sm:p-7 rounded-2xl bg-white/5 border border-white/10 space-y-4 hover:border-brand-gold/40 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-brand-gold/15 text-brand-gold flex items-center justify-center border border-brand-gold/30">
                    <Shield size={24} />
                  </div>
                  <h4 className="text-base font-bold text-white uppercase">7-Tier Security & Access Matrix</h4>
                  <ul className="space-y-2 text-xs text-slate-300">
                    <li className="flex items-start gap-2">• <span>RFID Boom Barriers with Automatic Number Plate Recognition</span></li>
                    <li className="flex items-start gap-2">• <span>Biometric Fingerprint & Facial Recognition Lift Access</span></li>
                    <li className="flex items-start gap-2">• <span>24/7 AI-Powered 360° CCTV Surveillance Mesh</span></li>
                    <li className="flex items-start gap-2">• <span>Trained Ex-Servicemen Security Command Center</span></li>
                  </ul>
                </div>

                {/* 6. Smart Eco-Infrastructure */}
                <div className="p-6 sm:p-7 rounded-2xl bg-white/5 border border-white/10 space-y-4 hover:border-brand-gold/40 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-brand-gold/15 text-brand-gold flex items-center justify-center border border-brand-gold/30">
                    <Zap size={24} />
                  </div>
                  <h4 className="text-base font-bold text-white uppercase">Green Living & Smart BMS</h4>
                  <ul className="space-y-2 text-xs text-slate-300">
                    <li className="flex items-start gap-2">• <span>100% 24/7 Power Backup with Acoustic DG Synchronizers</span></li>
                    <li className="flex items-start gap-2">• <span>Dedicated EV Charging Stations in Every Parking Bay</span></li>
                    <li className="flex items-start gap-2">• <span>Zero-Liquid Discharge Sewage Treatment Plant (STP)</span></li>
                    <li className="flex items-start gap-2">• <span>Solar-Powered Common Area Lighting & Rainwater Harvesting</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Section: Longform Editorial Deep-Dive Dossier (Optimized for AI Crawlers, LLMs & Architectural Audits) */}
          <section className="py-16 lg:py-24 bg-white border-b border-slate-200">
            <div className="max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-12 space-y-16">
              
              {/* Editorial Header */}
              <div className="max-w-3xl space-y-3">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-[#062B63]/10 text-[#062B63] border border-[#062B63]/20">
                  <BookOpen size={13} className="text-[#062B63]" />
                  <span>Architectural Monograph & Technical Dossier</span>
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight uppercase leading-tight">
                  The Reyansh Elanza Architectural Monograph
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  An authoritative, comprehensive inquiry into the urban planning, structural mechanics, environmental microclimate engineering, and biophilic spatial design governing Reyansh Elanza.
                </p>
              </div>

              {/* 4-Chapter Editorial Longform Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                
                {/* Chapter 1: Urban Master Planning & Spatial Topology */}
                <article className="p-8 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-200 pb-3">
                    <span>Chapter 01</span>
                    <span className="text-[#062B63]">Urban Topography</span>
                  </div>
                  <h4 className="text-xl font-black text-slate-900 uppercase">
                    Radial Tower Orientation & Biophilic Massing
                  </h4>
                  <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed text-justify sm:text-left">
                    <p>
                      Reyansh Elanza is master-planned across a high-efficiency podium geometry that arranges three high-rise residential towers (Towers A, B, and C) radially around an expansive 1.5-acre biophilic park. This geometry guarantees an unobstructed 180-degree vista for over 92% of residential suites while preventing tower-to-tower visual compromise.
                    </p>
                    <p>
                      The master layout prioritizes human-scale ground experiences by elevating heavy vehicular circulation to peripheral subterranean ramps. This creates a 100% vehicle-free ground and podium zone, maximizing clean air circulation, pedestrian safety, and acoustic insulation from urban arterial traffic.
                    </p>
                  </div>
                  <div className="pt-2 flex flex-wrap gap-2 text-[11px] font-semibold text-[#062B63]">
                    <span className="bg-white px-2.5 py-1 rounded-md border border-slate-200">Radial Massing</span>
                    <span className="bg-white px-2.5 py-1 rounded-md border border-slate-200">100% Vehicle-Free Podium</span>
                    <span className="bg-white px-2.5 py-1 rounded-md border border-slate-200">Zero Sightline Overlap</span>
                  </div>
                </article>

                {/* Chapter 2: Façade Physics & Microclimate Engineering */}
                <article className="p-8 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-200 pb-3">
                    <span>Chapter 02</span>
                    <span className="text-[#062B63]">Climate Physics</span>
                  </div>
                  <h4 className="text-xl font-black text-slate-900 uppercase">
                    Solar Heat Gain Mitigation & Passive Ventilation
                  </h4>
                  <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed text-justify sm:text-left">
                    <p>
                      Engineered for Eastern India’s tropical humid climatic envelope, Reyansh Elanza incorporates passive thermal design strategies. Deep 8-ft cantilevered sky balconies function as natural horizontal brise-soleil sunshades, dramatically reducing direct solar radiation on primary living room glazings during peak afternoon hours.
                    </p>
                    <p>
                      High-performance low-E double-glazed unit (DGU) acoustic windows provide exceptional thermal resistance (U-value &lt; 1.8 W/m²K) and acoustic attenuation of up to 38 dB. Cross-ventilation airflow shafts engineered into the tower cores harness natural south-westerly maritime breezes, reducing mechanical air-conditioning reliance by ~28% annually.
                    </p>
                  </div>
                  <div className="pt-2 flex flex-wrap gap-2 text-[11px] font-semibold text-[#062B63]">
                    <span className="bg-white px-2.5 py-1 rounded-md border border-slate-200">Low-E DGU Glazing</span>
                    <span className="bg-white px-2.5 py-1 rounded-md border border-slate-200">Cantilevered Brise-Soleil</span>
                    <span className="bg-white px-2.5 py-1 rounded-md border border-slate-200">28% HVAC Reduction</span>
                  </div>
                </article>

                {/* Chapter 3: High-Grade Structural Engineering & Seismic Resilience */}
                <article className="p-8 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-200 pb-3">
                    <span>Chapter 03</span>
                    <span className="text-[#062B63]">Structural Mechanics</span>
                  </div>
                  <h4 className="text-xl font-black text-slate-900 uppercase">
                    Seismic Zone IV Resilience & High-Performance Concrete
                  </h4>
                  <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed text-justify sm:text-left">
                    <p>
                      The superstructure of Reyansh Elanza is engineered utilizing M50 and M60 grade high-durability reinforced cement concrete (RCC) with high-yield strength Fe550D primary rebar reinforcement. The foundation architecture features deep bored monolithic cast-in-situ concrete piles socketed directly into impervious hard bedrock.
                    </p>
                    <p>
                      Structural ductile shear wall systems are placed strategically around central elevator shafts and stairwells, giving the buildings superior energy-dissipation capacity against lateral wind pressures and Seismic Zone IV seismic accelerations, validated through full 3D ETABS dynamic response spectrum modeling.
                    </p>
                  </div>
                  <div className="pt-2 flex flex-wrap gap-2 text-[11px] font-semibold text-[#062B63]">
                    <span className="bg-white px-2.5 py-1 rounded-md border border-slate-200">M50/M60 High-Grade RCC</span>
                    <span className="bg-white px-2.5 py-1 rounded-md border border-slate-200">Ductile Shear Wall Core</span>
                    <span className="bg-white px-2.5 py-1 rounded-md border border-slate-200">ETABS Dynamic Modeling</span>
                  </div>
                </article>

                {/* Chapter 4: Sustainable Circular Ecology & Green BMS */}
                <article className="p-8 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-200 pb-3">
                    <span>Chapter 04</span>
                    <span className="text-[#062B63]">Circular Ecology</span>
                  </div>
                  <h4 className="text-xl font-black text-slate-900 uppercase">
                    IGBC Platinum Ecology & Zero-Discharge Infrastructure
                  </h4>
                  <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed text-justify sm:text-left">
                    <p>
                      Committed to carbon-conscious urbanism, Reyansh Elanza deploys a fully closed-loop water management matrix. An on-site automated MBBR (Moving Bed Biofilm Reactor) sewage treatment plant recycles 100% of wastewater for landscape irrigation, HVAC cooling towers, and dual-flush sanitary systems, yielding Zero-Liquid Discharge (ZLD).
                    </p>
                    <p>
                      High-capacity rooftop rainwater harvesting recharge pits capture 100% of monsoon runoff. Common area electrical loads are offset via a 120 kWp rooftop solar photovoltaic array integrated with smart IoT building management systems (BMS) for real-time energy load balancing.
                    </p>
                  </div>
                  <div className="pt-2 flex flex-wrap gap-2 text-[11px] font-semibold text-[#062B63]">
                    <span className="bg-white px-2.5 py-1 rounded-md border border-slate-200">Zero-Liquid Discharge (ZLD)</span>
                    <span className="bg-white px-2.5 py-1 rounded-md border border-slate-200">120 kWp Solar Array</span>
                    <span className="bg-white px-2.5 py-1 rounded-md border border-slate-200">IoT Centralized BMS</span>
                  </div>
                </article>

              </div>

              {/* Section: Architectural & Technical FAQ Matrix (Optimized for AI & Search Engines) */}
              <div className="p-8 sm:p-12 rounded-3xl bg-[#041633] text-white space-y-8">
                <div className="max-w-2xl space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-brand-gold border border-white/20">
                    <HelpCircle size={13} className="text-brand-gold" />
                    <span>Technical & Architectural Inquiries</span>
                  </div>
                  <h4 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                    Frequently Asked Architectural & Technical Questions
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300">
                    Detailed authoritative answers regarding the planning, statutory compliance, structural standards, and delivery framework of Reyansh Elanza.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      q: "What is the primary architectural typology of Reyansh Elanza?",
                      a: "Reyansh Elanza is an ultra-luxury, biophilic high-rise residential enclave comprising three iconic towers (A, B, and C) organized around a central elevated recreational park and a multi-level clubhouse pavilion on the second floor.",
                    },
                    {
                      q: "Who is the parent operating developer and construction partner?",
                      a: "The project is developed by RashBhar Real Estate, a flagship vertical of Rashtra Bharosa Group, with turnkey EPC engineering executed by Innovex Construction.",
                    },
                    {
                      q: "What unit configurations and carpet area ranges are available?",
                      a: "The development offers bespoke 3 BHK Luxury Residences (1,850 – 2,250 sq.ft carpet), 4 BHK Imperial Sky Villas (2,850 – 3,400 sq.ft carpet), and full-floor Presidential Duplex Penthouses (4,800+ sq.ft carpet).",
                    },
                    {
                      q: "What are the statutory approvals and green building certifications?",
                      a: "Reyansh Elanza has received comprehensive state RERA registration, BDA building plan sanctions, SEIAA environmental clearance, Directorate of Fire Services NOC, and is engineered to IGBC Platinum green standards.",
                    },
                    {
                      q: "What structural standards govern the earthquake and wind resistance?",
                      a: "Engineered with M50/M60 RCC frames and ductile core shear walls designed to exceed Seismic Zone IV criteria and withstand cyclonic coastal wind pressures in accordance with Indian Standards (IS 1893 and IS 13920).",
                    },
                    {
                      q: "What is the targeted handover timeline?",
                      a: "The project is on track for structured phased handovers starting in Q4 2027 following superstructure completion, interior fit-outs, and statutory occupancy audits.",
                    },
                  ].map((faq, fIdx) => (
                    <div key={fIdx} className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                      <div className="text-xs sm:text-sm font-bold text-brand-gold flex items-start gap-2">
                        <span className="text-white/40">Q.</span>
                        <span>{faq.q}</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed pl-4 border-l border-brand-gold/30">
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </section>

          {/* Section: Informational Project Governance & Development Framework */}
          <section className="py-16 lg:py-20 bg-slate-100 border-b border-slate-200">
            <div className="max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-12">
              <div className="rounded-3xl bg-[#041633] text-white p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl border border-white/10">
                <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-brand-gold/10 to-transparent pointer-events-none"></div>
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                  <div className="lg:col-span-8 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-brand-gold/20 text-brand-gold border border-brand-gold/30">
                      <KeyRound size={13} className="text-brand-gold" />
                      <span>Corporate Project Oversight & Governance</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white uppercase tracking-tight leading-tight">
                      Institutional Execution Framework
                    </h3>
                    <p className="text-xs sm:text-base text-slate-300 max-w-2xl leading-relaxed">
                      Reyansh Elanza is governed directly under the Real Estate Infrastructure Division of Rashtra Bharosa Group. The asset is developed with rigorous stage-gate quality audits, comprehensive statutory sanctions, and strict environmental stewardship.
                    </p>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
                      <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                        <div className="text-[10px] uppercase text-brand-gold font-bold">RERA Registered</div>
                        <div className="text-xs font-bold text-white">Full Statutory Sanctions</div>
                        <div className="text-[11px] text-slate-400">Clear Title & Approved Plans</div>
                      </div>
                      <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                        <div className="text-[10px] uppercase text-brand-gold font-bold">Construction Partner</div>
                        <div className="text-xs font-bold text-white">Innovex Construction</div>
                        <div className="text-[11px] text-slate-400">Turnkey EPC Execution</div>
                      </div>
                      <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                        <div className="text-[10px] uppercase text-brand-gold font-bold">Completion Horizon</div>
                        <div className="text-xs font-bold text-white">Target Q4 2027</div>
                        <div className="text-[11px] text-slate-400">Phased Tower Delivery</div>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-4 space-y-3">
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                      <div className="text-xs font-bold uppercase text-brand-gold tracking-wider">
                        Operating Entity
                      </div>
                      <div className="text-base font-bold text-white">
                        RashBhar Real Estate
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        A flagship operating vertical of Rashtra Bharosa Group dedicated to landmark urban developments, master-planned townships, and premium residential architecture across Bharat.
                      </p>
                      <div className="pt-2">
                        <Button asChild variant="outline" className="w-full text-white border-white/20 hover:bg-white/10 text-xs font-bold uppercase tracking-wider py-3 rounded-xl">
                          <Link to="/ventures/real-estate">
                            <ArrowLeft size={14} className="mr-2" /> Real Estate Operating Portal
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* 4. Strategic Milestones & Statutory Clearances */}
      <section className="py-12 lg:py-16 bg-white border-b border-slate-200">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-12 space-y-10">
          <div className="max-w-3xl space-y-1">
            <span className="text-xs font-bold uppercase tracking-widest text-[#062B63] block">
              Governance & Execution Roadmap
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase">
              Project Lifecycle & Compliance
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Timeline Milestones (7 Cols) */}
            <div className="lg:col-span-7 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#062B63]">
                Key Delivery Milestones
              </h4>

              <div className="space-y-3">
                {project.keyMilestones.map((m, mIdx) => (
                  <div key={mIdx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-4">
                    <div className="px-2.5 py-1 rounded bg-[#062B63] text-brand-gold text-xs font-bold shrink-0 mt-0.5">
                      {m.quarter}
                    </div>
                    <div className="space-y-0.5">
                      <div className="text-sm font-bold text-slate-900">{m.title}</div>
                      <div className="text-xs text-slate-600">{m.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Statutory Clearances (5 Cols) */}
            <div className="lg:col-span-5 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#062B63]">
                Statutory Clearances & Certifications
              </h4>

              <div className="p-6 rounded-2xl bg-[#041633] text-white space-y-3">
                <div className="text-xs font-bold uppercase text-brand-gold tracking-wider">
                  Fiduciary & Environmental Clearances
                </div>
                <div className="space-y-2.5 pt-1 text-xs text-slate-200">
                  {project.statutoryClearances.map((clearance, cIdx) => (
                    <div key={cIdx} className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-brand-gold shrink-0 mt-0.5" />
                      <span>{clearance}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Bottom Navigation Bar */}
      <section className="py-10 bg-slate-50 border-t border-slate-200">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-12 flex flex-wrap items-center justify-between gap-4">
          <Button asChild variant="outline" className="text-xs font-bold text-[#062B63] border-slate-300">
            <Link to="/projects">
              <ArrowLeft size={14} className="mr-1.5" /> All Projects Directory
            </Link>
          </Button>

          <div className="flex items-center gap-3">
            <Button asChild className="btn-primary px-6 py-2.5 text-xs font-bold rounded-lg shadow-sm">
              <Link to="/contact">
                Institutional Partnership Inquiry <ArrowRight size={14} className="ml-1.5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;
