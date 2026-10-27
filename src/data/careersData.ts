// Official Rashtra Bharosa Group Human Capital & Careers Intelligence Data

export interface JobOpening {
  id: string;
  jobCode: string;
  title: string;
  department: string;
  vertical: string;
  location: string;
  type: string;
  experience: string;
  openings: number;
  postedDate: string;
  description: string;
  responsibilities: string[];
  qualifications: string[];
  salaryRange?: string;
  featured?: boolean;
}

export interface CandidateApplication {
  applicationId: string;
  jobCode: string;
  jobTitle: string;
  vertical: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  education: string;
  specialization?: string;
  experienceYears: string;
  currentCompany?: string;
  currentDesignation?: string;
  currentCTC?: string;
  expectedCTC?: string;
  noticePeriod: string;
  linkedinUrl?: string;
  resumeFileName: string;
  resumeFileSize: string;
  resumeUploadTime: string;
  resumeDocRef: string;
  coverNote?: string;
  appliedDate: string;
  currentStage: 1 | 2 | 3 | 4 | 5;
  status:
    | "Application Received & Vaulted"
    | "Technical Talent Scrutiny (In Review)"
    | "Directorate Interview Scheduled"
    | "Executive Selection Committee Review"
    | "Offer Extended & Onboarding";
  statusColor: "blue" | "amber" | "purple" | "emerald";
  remarks: string;
  assignedRecruiter: {
    name: string;
    title: string;
    email: string;
    phone: string;
    office: string;
  };
  interviews?: {
    round: string;
    date: string;
    time: string;
    panel: string;
    mode: string;
    venueOrLink: string;
    status: "Scheduled" | "Completed" | "Pending";
  }[];
  timeline: {
    stageNumber: number;
    title: string;
    date: string;
    description: string;
    completed: boolean;
    current?: boolean;
    officerNotes?: string;
  }[];
  queries?: {
    id: string;
    sender: "candidate" | "hr";
    senderName: string;
    message: string;
    timestamp: string;
  }[];
}

export const initialJobOpenings: JobOpening[] = [];

export const initialCandidateApplications: CandidateApplication[] = [];

