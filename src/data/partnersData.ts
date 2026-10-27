// Official Rashtra Bharosa Group Strategic Alliances, Investments & Partnerships Data

import adaniLogo from "@/assets/ventures/Adani.png";
import apolloLogo from "@/assets/ventures/ApolloHospitalsGroup.png";
import ltLogo from "@/assets/ventures/ltgroup.png";
import imiLogo from "@/assets/ventures/imi.png";
import mahindraLogo from "@/assets/ventures/MahindraGroup.png";
import nabardLogo from "@/assets/ventures/NABARD.png";
import omfedLogo from "@/assets/ventures/omfed.png";
import ongcLogo from "@/assets/ventures/ONGC.png";
import rblLogo from "@/assets/ventures/rbl.png";
import adityaLogo from "@/assets/ventures/Strategic partnership/aditya-logo.png";
import vanshikaLogo from "@/assets/ventures/Strategic partnership/VANSHIKA CORP..png";
import veraLogo from "@/assets/ventures/Strategic partnership/vera.png";
import rajputLogo from "@/assets/ventures/Strategic partnership/rajput group.png";
import saeshaLogo from "@/assets/ventures/Where we invested/saesha.png";

export interface PartnerCardEntity {
  id: string;
  name: string;
  logo?: string;
  partnershipType: string;
  associatedWith: string; // Associated with official entity/vertical
  whatWeDo: string; // Official description from partnership documentation
  website?: string;
  tagline?: string;
  corePositioning?: string;
}

// -------------------------------------------------------------
// 1. STRATEGIC PARTNERS
// -------------------------------------------------------------
export const strategicPartners: PartnerCardEntity[] = [
  {
    id: "STR-001",
    name: "AR Group",
    logo: adityaLogo,
    partnershipType: "Joint Ventures & Investment",
    associatedWith: "Rashtra Bharosa Group",
    whatWeDo: "Rashtra Bharosa Group collaborates with AR Group on joint venture opportunities, strategic investments and business expansion initiatives. The relationship focuses on combining capital, resources and business capabilities to develop mutually aligned opportunities.",
  },
  {
    id: "STR-002",
    name: "Vanshika Corporation",
    logo: vanshikaLogo,
    partnershipType: "IT & Technology",
    associatedWith: "RashBhar Technology",
    whatWeDo: "Vanshika Corporation serves as a technology partner to RashBhar Technology, supporting IT infrastructure, digital systems, technology integration and enterprise technology initiatives.",
  },
  {
    id: "STR-003",
    name: "Vera",
    logo: veraLogo,
    partnershipType: "Capital Partnership",
    associatedWith: "Rashtra Bharosa Group",
    whatWeDo: "Vera collaborates with Rashtra Bharosa Group through a capital partnership focused on investment opportunities, structured capital participation and the development of selected business ventures.",
  },
  {
    id: "STR-004",
    name: "Rajput Group",
    logo: rajputLogo,
    partnershipType: "Hospitality & Management",
    associatedWith: "Rashtra Bharosa Group",
    whatWeDo: "Rajput Group collaborates with Rashtra Bharosa Group in hospitality and management-related activities, supporting operational management, business development and strategic growth opportunities within the hospitality sector.",
  },
];

// -------------------------------------------------------------
// 2. INSTITUTIONAL PARTNERS
// -------------------------------------------------------------
export const institutionalPartners: PartnerCardEntity[] = [
  {
    id: "INST-001",
    name: "IMI (International Management Institute)",
    logo: imiLogo,
    partnershipType: "Academic & Management Collaboration",
    associatedWith: "Rashtra Bharosa Group",
    whatWeDo: "The relationship with IMI supports management development, executive learning, leadership initiatives, industry-oriented research and institutional knowledge exchange.",
  },
  {
    id: "INST-002",
    name: "Apollo Hospitals Enterprise",
    logo: apolloLogo,
    partnershipType: "Healthcare & Clinical Collaboration",
    associatedWith: "RashBhar Health Care",
    whatWeDo: "Apollo Hospitals Enterprise collaborates with RashBhar Health Care on healthcare and clinical capabilities, supporting medical expertise, healthcare systems, specialist knowledge and hospital development initiatives.",
  },
  {
    id: "INST-003",
    name: "RBL Bank",
    logo: rblLogo,
    partnershipType: "Banking & Financial Services",
    associatedWith: "Rashtra Bharosa Group",
    whatWeDo: "RBL Bank supports Rashtra Bharosa Group through corporate banking and financial services, including project-related banking requirements, financial transactions, guarantees, escrow arrangements and other applicable banking facilities.",
  },
  {
    id: "INST-004",
    name: "NABARD Consortium",
    logo: nabardLogo,
    partnershipType: "Rural Development & Agricultural Collaboration",
    associatedWith: "RashBhar Soil & Soul",
    whatWeDo: "The relationship supports agricultural and rural development initiatives, including farmer-focused programs, rural enterprise development and strengthening of agricultural value chains.",
  },
];

// -------------------------------------------------------------
// 3. PROJECT & INFRASTRUCTURE PARTNERS
// -------------------------------------------------------------
export const projectPartners: PartnerCardEntity[] = [
  {
    id: "PRJ-001",
    name: "Adani Ports & SEZ (APSEZ)",
    logo: adaniLogo,
    partnershipType: "Mineral Logistics",
    associatedWith: "RashBhar Mining",
    whatWeDo: "The collaboration supports mineral logistics and port-linked supply-chain operations, including the movement, handling and dispatch of bulk mineral resources.",
  },
  {
    id: "PRJ-002",
    name: "Larsen & Toubro (L&T)",
    logo: ltLogo,
    partnershipType: "EPC & Infrastructure Execution",
    associatedWith: "Innovex Construction",
    whatWeDo: "The partnership with L&T covers infrastructure and EPC-related opportunities involving engineering, civil construction, mechanical works and execution of large-scale industrial and infrastructure projects.",
  },
  {
    id: "PRJ-003",
    name: "Mahindra Logistics",
    logo: mahindraLogo,
    partnershipType: "Logistics & Supply Chain",
    associatedWith: "Innovex Construction",
    whatWeDo: "Mahindra Logistics supports project logistics, fleet operations, equipment transportation, material movement and supply-chain requirements for infrastructure and construction activities.",
  },
  {
    id: "PRJ-004",
    name: "Oil and Natural Gas Corporation (ONGC)",
    logo: ongcLogo,
    partnershipType: "Energy & Industrial Collaboration",
    associatedWith: "Rashtra Bharosa Group",
    whatWeDo: "Rashtra Bharosa Group's relationship with ONGC covers opportunities within the energy and industrial ecosystem, including project-specific requirements, industrial services and supply-chain collaboration.",
  },
  {
    id: "PRJ-005",
    name: "OMFED (Odisha State Dairy Cooperative)",
    logo: omfedLogo,
    partnershipType: "Agriculture & Rural Supply Chain",
    associatedWith: "RashBhar Soil & Soul",
    whatWeDo: "The collaboration with OMFED supports agricultural and rural supply-chain development, including aggregation, distribution, cold-chain opportunities and stronger connections between rural producers and markets.",
  },
];

// -------------------------------------------------------------
// 4. PORTFOLIO INVESTMENTS
// -------------------------------------------------------------
export const whereWeInvested: PartnerCardEntity & {
  investmentType: string;
} = {
  id: "INV-001",
  name: "SAESHA INDUSTRIAL ENTERPRISES",
  logo: saeshaLogo,
  tagline: "Keeping Industry Moving — Exclusively Odisha",
  corePositioning: "Heavy Industrial Solutions, Fleet Logistics & Equipment Provisioning",
  website: "https://saeshaenterprises.in/",
  partnershipType: "Industrial Solutions Provider",
  investmentType: "Promoter-Backed Seed Investment & Equity Participation",
  associatedWith: "Royal Birds Group",
  whatWeDo: "SAESHA INDUSTRIAL ENTERPRISES is a premier portfolio venture backed through promoter-led investment and equity participation by Royal Birds Group. The company operates as a specialized industrial solutions provider across Eastern India, delivering integrated access to heavy earthmoving equipment, commercial vehicle fleets, certified industrial manpower, and rapid logistics deployment to keep critical industries and infrastructure operations moving seamlessly.",
};
