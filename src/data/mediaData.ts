// Official Rashtra Bharosa Group Media & Press Intelligence Data

export type MediaArticleCategory =
  | "Corporate Updates"
  | "Press Releases"
  | "Strategic Announcements"
  | "Venture Milestones"
  | "Industry Insights";

export interface MediaArticle {
  id: string;
  slug: string;
  title: string;
  category: MediaArticleCategory;
  date: string;
  readTime: string;
  author: string;
  department: string;
  excerpt: string;
  content: string[];
  keyHighlights?: string[];
  officialQuote?: {
    text: string;
    speaker: string;
    designation: string;
  };
  image: string;
  tags: string[];
  featured?: boolean;
}

export type GalleryCategory =
  | "Mining & Infrastructure"
  | "Healthcare Facilities"
  | "Technology & Robotics"
  | "Agritech & Ecology"
  | "Corporate & Events";

export interface GalleryPhoto {
  id: string;
  title: string;
  category: GalleryCategory;
  location: string;
  date: string;
  imageUrl: string;
  caption: string;
  tags: string[];
}

export interface MediaCoverageItem {
  id: string;
  source: string;
  publicationType: "National Daily" | "Financial Press" | "Industry Journal" | "Regional Broadcast";
  headline: string;
  author: string;
  date: string;
  summary: string;
  keyTopics: string[];
  externalUrl?: string;
  readTime: string;
}

export const initialMediaArticles: MediaArticle[] = [];

export const initialGalleryPhotos: GalleryPhoto[] = [];

export const initialMediaCoverage: MediaCoverageItem[] = [];

