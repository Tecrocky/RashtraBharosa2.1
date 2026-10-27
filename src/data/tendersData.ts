export type TenderType =
  | "Open Tender"
  | "Limited Tender"
  | "Expression of Interest (EOI)"
  | "Request for Proposal (RFP)"
  | "Request for Quotation (RFQ)"
  | "Request for Information (RFI)"
  | "Reverse Auction"
  | "Pre-Qualification (PQ)"
  | "EPC (Turnkey)"
  | "Rate Contract (RC)"
  | "Service Contract"
  | "Annual Maintenance Contract (AMC)";

export interface DocumentRequirement {
  id: string;
  code: string;
  name: string;
  category: "Statutory" | "Financial" | "Technical" | "Compliance";
  mandatory: boolean;
  description: string;
}

export interface BOQItem {
  itemNo: string;
  description: string;
  unit: string;
  qty: number;
  estRate: string;
  totalEst: string;
}

export interface TenderNotice {
  id: string; // e.g. RBMIN/2026/008
  slug: string;
  title: string;
  department: string;
  verticalCode: "MINING" | "HEALTH" | "INFRA" | "TECH" | "AGRI" | "REALTY" | "CAPITAL";
  tenderType: TenderType;
  category: "Mining & Heavy Machinery" | "Medical Technology" | "Civil Infrastructure" | "Deep-Tech & AI" | "Agritech & Chemicals" | "Supply Chain";
  categoryFilter: "Equipment Supply" | "Medical Equipment" | "Civil Works" | "Deep-Tech & AI" | "Agri Inputs" | "IT & Software";
  estimatedValue: string;
  emdAmount: string;
  emdExemptionAllowed: boolean;
  tenderFee: string; // e.g. "₹ 10,000 + 18% GST" or "Nil (Zero Cost)"
  tenderFeeExemptionAllowed: boolean;
  issueDate: string;
  closingDate: string;
  closingTime: string; // e.g. "17:00 hrs IST"
  preBidMeetingDate?: string;
  preBidMeetingVenue?: string;
  status: "Active" | "Pre-Bid" | "Under Evaluation" | "Corrigendum Issued" | "Closed";
  location: string;
  state: "Odisha" | "Jharkhand" | "Pan India";
  documentSize: string;
  procurementOfficer: string;
  procurementEmail: string;
  contractPeriod: string;
  bidValidityPeriod: string;
  scopeSummary: string;
  eligibilityCriteria: {
    technical: string[];
    financial: string[];
    statutory: string[];
  };
  specifications: { label: string; value: string }[];
  deliverables: string[];
  requiredDocuments: DocumentRequirement[];
  boqItems: BOQItem[];
}

export interface SupplierProfile {
  supplierId: string; // Format: RBG-SUP-000184
  companyName: string;
  gstin: string;
  panNumber: string;
  cinNumber?: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  state: string;
  businessCategory: string;
  isMsme: boolean;
  msmeUdyamNumber?: string;
  registrationDate: string;
  verificationStatus: "Verified" | "Pending Verification" | "Document Required";
}

export interface TenderApplication {
  applicationNo: string; // Format: RBG-APP-2026-004821
  tenderId: string; // Format: RBMIN/2026/008
  supplierId: string; // Format: RBG-SUP-000184
  companyName: string;
  gstin: string;
  contactPerson: string;
  email: string;
  phone: string;
  tenderFeeStatus: "Paid" | "Exempt (MSME)" | "Nil / Not Applicable" | "Pending";
  tenderFeeRef?: string; // e.g. RBG-PAY-2026-008421
  emdStatus: "Paid Online" | "Bank Guarantee (BG) Submitted" | "Exempt (MSME)" | "Pending";
  emdRef?: string;
  applicationDate: string;
  stage: "Draft" | "Fee Verified" | "Documents Uploaded" | "Bids Submitted" | "Under Scrutiny" | "Technically Qualified" | "Commercial Review" | "LOI Awarded";
}

export interface TimelineEvent {
  stageNumber: number;
  title: string;
  date: string;
  description: string;
  completed: boolean;
  current?: boolean;
}

export interface BidSubmission {
  bidSubmissionId: string; // Format: RBG-BID-2026-003914
  applicationNo: string; // Format: RBG-APP-2026-004821
  tenderId: string; // Format: RBMIN/2026/008
  supplierId: string; // Format: RBG-SUP-000184
  companyName: string;
  gstin: string;
  contactPerson: string;
  email: string;
  phone: string;
  quoteAmount: string; // e.g. "₹ 135.00 Crores"
  quoteAmountNumber?: number;
  timelineMonths: string;
  technicalSummary: string;
  uploadedDocuments: { docCode: string; fileName: string; docRef: string; fileSize?: string }[];
  submissionDate: string;
  submissionTimestamp: string;
  currentStage: number; // 1 to 8
  status: "Submitted & Sealed" | "Technical Scrutiny Passed" | "Commercial Evaluation" | "Tender Board Approved" | "Final LOI Awarded" | "Disqualified";
  remarks: string;
  timelineEvents: TimelineEvent[];
}

export interface TenderNotification {
  id: string;
  date: string;
  title: string;
  tenderRef: string;
  category: "Corrigendum" | "Addendum" | "Pre-Bid Meeting" | "Date Extension" | "Result Declaration";
  summary: string;
  downloadUrl?: string;
  isImportant?: boolean;
}

export const standardDocumentRequirements: DocumentRequirement[] = [
  { id: "doc-1", code: "GST-REG", name: "GST Registration Certificate (Form REG-06)", category: "Statutory", mandatory: true, description: "Valid GSTIN registration copy of all operating states." },
  { id: "doc-2", code: "PAN-CARD", name: "Permanent Account Number (PAN) Card", category: "Statutory", mandatory: true, description: "Company PAN card copy verified with Income Tax portal." },
  { id: "doc-3", code: "CIN-INC", name: "Certificate of Incorporation / Partnership Deed", category: "Statutory", mandatory: true, description: "MCA Certificate of Incorporation or registered Partnership Deed." },
  { id: "doc-4", code: "MSME-UDYAM", name: "Udyam MSME Registration Certificate (if claiming exemption)", category: "Statutory", mandatory: false, description: "Active Udyam registration for Tender Fee / EMD exemption." },
  { id: "doc-5", code: "AUDIT-BS-3YR", name: "Audited Balance Sheet & P&L (Last 3 Financial Years)", category: "Financial", mandatory: true, description: "Signed & stamped by a certified Chartered Accountant with UDIN." },
  { id: "doc-6", code: "CA-TURNOVER", name: "CA Certified Average Annual Turnover Certificate", category: "Financial", mandatory: true, description: "Turnover certificate showing average financial health." },
  { id: "doc-7", code: "BANK-SOLV", name: "Bank Solvency Certificate from Scheduled Commercial Bank", category: "Financial", mandatory: true, description: "Issued within the last 6 months confirming solvency limit." },
  { id: "doc-8", code: "EMD-REC", name: "EMD Payment Receipt / Bank Guarantee (BG) Instrument", category: "Financial", mandatory: true, description: "UTR payment receipt or original Bank Guarantee copy." },
  { id: "doc-9", code: "OEM-AUTH", name: "OEM Authorization / Manufacturer Authorization Form (MAF)", category: "Technical", mandatory: true, description: "Direct OEM authorization letter addressed to Rashtra Bharosa Group." },
  { id: "doc-10", code: "EXP-PAST", name: "Past Project Performance & Client Completion Certificates", category: "Technical", mandatory: true, description: "Work completion certificates for similar works in last 5 years." },
  { id: "doc-11", code: "TECH-PROPOSAL", name: "Comprehensive Technical Proposal & BOQ Compliance Matrix", category: "Technical", mandatory: true, description: "Point-by-point technical data sheets, diagrams & architecture." },
  { id: "doc-12", code: "ISO-CERT", name: "Quality & Safety Certifications (ISO 9001 / ISO 45001 / ISO 14001)", category: "Technical", mandatory: true, description: "Valid accredited quality, health and environmental certificates." },
  { id: "doc-13", code: "NON-BLACKLIST", name: "Affidavit of Non-Blacklisting on ₹100 Non-Judicial Stamp", category: "Compliance", mandatory: true, description: "Notarized affidavit stating no debarment by PSUs/Govt." },
  { id: "doc-14", code: "INTEGRITY-PACT", name: "Duly Signed Group Integrity Pact & Ethical Undertaking", category: "Compliance", mandatory: true, description: "Signed undertaking adhering to Rashtra Bharosa Group code of ethics." },
  { id: "doc-15", code: "POWER-ATTORNEY", name: "Board Resolution / Power of Attorney for Authorized Signatory", category: "Compliance", mandatory: true, description: "Board resolution authorizing signatory to submit digital bids." },
  { id: "doc-16", code: "LITIGATION-HIST", name: "Litigation History & Statutory Compliance Undertaking", category: "Compliance", mandatory: true, description: "Certified declaration of any ongoing arbitration or litigation." },
];

export const initialSuppliers: SupplierProfile[] = [
  {
    supplierId: "RBG-SUP-000184",
    companyName: "Apex Heavy Machinery & Engineering Pvt Ltd",
    gstin: "21AAACA9876Q1ZT",
    panNumber: "AAACA9876Q",
    cinNumber: "U29248OR2015PTC018921",
    contactPerson: "Er. Rajeshwar Sengupta",
    email: "procurement@bharatepc.com",
    phone: "+91 98310 44821",
    address: "Plot 42, Infocity Industrial Corridor, Patia",
    state: "Odisha",
    businessCategory: "Heavy Mining Machinery & EPC",
    isMsme: false,
    registrationDate: "2026-08-15",
    verificationStatus: "Verified",
  },
  {
    supplierId: "RBG-SUP-000215",
    companyName: "Bharat Clinical Systems & Bio-Tech LLP",
    gstin: "20AAGCB1234L1Z2",
    panNumber: "AAGCB1234L",
    contactPerson: "Dr. Alok Nath Verma",
    email: "tenders.desk@company.com",
    phone: "+91 94370 88219",
    address: "Sector 4, Bokaro Steel City",
    state: "Jharkhand",
    businessCategory: "Medical Equipment & Diagnostics",
    isMsme: true,
    msmeUdyamNumber: "UDYAM-JH-04-0019284",
    registrationDate: "2026-09-01",
    verificationStatus: "Verified",
  },
];

export const initialTenders: TenderNotice[] = [];

export const initialApplications: TenderApplication[] = [];

export const initialBids: BidSubmission[] = [];

export const initialNotifications: TenderNotification[] = [];

