# Rashtra Bharosa Group — Architecture, Features & Project Knowledge Vault

> **Last Updated:** 2026-09-29  
> **Repository:** `Rashtra-Bharosa-Group-main`  
> **Brand Identity:** Premium Sovereign Conglomerate ("Rooted in Trust, Rising with Bharat")  
> **Design Language:** Black & White Liquid Class (Monochrome `#000000`, `#FFFFFF`, `#F7F7F7`, subtle slate borders `#E5E5E5`)

---

## 1. Group Entities & Business Verticals
1. **RashBhar Mining**: Heavy mineral exploration, iron ore beneficiation, DGMS zero-harm standards, captive green energy.
2. **Innovex Construction**: Heavy civil infrastructure, high-throughput overland conveyor systems, rail corridor EPC, bridge engineering.
3. **RashBhar Health Care**: Super-specialty clinical infrastructure, 500-bed hospital hubs, robotic surgical suites, telemedicine networks.
4. **RashBhar Technology (VED RI)**: Sovereign air-gapped AI foundation models, enterprise cyber infrastructure, high-assurance telemetry.
5. **RashBhar Soil & Soul**: Agritech, sustainable bio-science, AgriGel™ water-conservation hydrogels, organic farming clusters.
6. **RashBhar Real Estate**: Luxury sustainable residential & commercial towers (Reyansh Elanza, VED Ri, Royal Birds).
7. **RashBhar Capital & Treasury**: Promoter equity stewardship, institutional infrastructure SPV financing.

---

## 2. Core Modules & Storage Architecture

| Module | Public Route | Admin Route | LocalStorage Key | Cloud Database Table (Supabase) |
| :--- | :--- | :--- | :--- | :--- |
| **Articles & Thought Leadership** | `/media?tab=articles`, `/articles/:slug` | `/admin/dashboard` (Content -> Articles) | `rbg_content_articles_full` | `articles` |
| **Company News & Milestones** | `/news/:slug` | `/admin/dashboard` (Content -> News) | `rbg_news_posts` | `news` |
| **Media & Photo Galleries** | `/media?tab=gallery` | `/admin/dashboard` (Content -> Media & Galleries) | `rbg_media_posts`, `rbg_media_gallery` | `media_posts` |
| **External Media Coverage** | `/media?tab=coverage` | `/admin/dashboard` (Content -> Media Coverage) | `rbg_media_coverage` | `media_coverage` |
| **Tender Notices & E-Procurement** | `/tenders`, `/tenders/:slug` | `/admin/dashboard` (Tenders -> Tenders) | `rbg_tenders_data` | `tenders` |
| **Tender Bids & Applications** | `/tenders?tab=track` | `/admin/dashboard` (Tenders -> Applications) | `rbg_bids_data`, `rbg_applications_data` | `tender_applications` |
| **Vendor / Supplier Directory** | `/tenders?tab=supplier` | `/admin/dashboard` (Forms -> Vendor Registrations) | `rbg_suppliers_data` | `suppliers` |
| **Careers & Job Openings** | `/careers?tab=positions`, `/careers/:id` | `/admin/dashboard` (Careers -> Job Opportunities) | `rbg_careers_jobs` | `jobs` |
| **Candidate ATS Applications** | `/careers?tab=track` | `/admin/dashboard` (Careers -> Applications) | `rbg_career_applications` | `career_applications` |
| **Public Enquiries & Contact** | `/contact` | `/admin/dashboard` (Forms -> Form Submissions) | `rbg_inquiries_data` | `inquiries` |
| **Media Library & Assets** | N/A | `/admin/dashboard` (Documents -> Media Library) | `rbg_media_library` | N/A |

---

## 3. CRUD & State Synchronization Rules
1. **Empty Array Integrity**: When an admin deletes all items in a category (e.g. tenders, articles, coverage, jobs), do NOT fall back to seed dummy data. The empty state `[]` must be respected so deletions reflect immediately on the public website.
2. **Dual-Layer Sync**:
   - Primary: Supabase cloud database (`https://thmydwhrxnvofhutacgp.supabase.co`).
   - Fallback/Offline cache: Browser `localStorage` with consistent key names.
3. **Tracking Architecture**:
   - **Tenders**: 8-Stage tracking via Bid ID / Reference ID.
   - **Careers**: 5-Stage ATS tracking via Candidate Reference ID (`RBG-APP-...`).
   - **Vendors**: Permanent Supplier ID generation (`RBG-SUP-...`) for verified commercial bidding.

---

## 4. Unified Reference Identifiers & Notification Engine
- **`src/lib/trackingService.ts`**:
  - **Tenders (Notices)**: `RBG-TEN-YYYY-XXXX`
  - **Tender Bids**: `RBG-BID-YYYY-XXXXX`
  - **Career Applications**: `RBG-APP-YYYY-XXXXX`
  - **Vendor Empanelment**: `RBG-SUP-YYYY-XXXX`
  - **Public Inquiries**: `RBG-ENQ-YYYY-XXXX`
- **Automated Confirmation Email**: Triggered immediately via `dispatchConfirmationNotification(...)` logging directly to the audit repository and database log.
- **SQL Migration Script**: Exhaustive production script created at `database_schema.sql` (PostgreSQL 14+ / Supabase Cloud DB) containing all sequences, tables, performance indexes, triggers, and Row-Level Security (RLS) policies.

---

## 5. Master Status Audit: What is Done, What was Fixed, and Pending Items

### A. What is Built & Fully Functional (क्या-क्या हुआ है):
1. **Public Conglomerate Architecture & Pages**:
   - **Home (`/`)**: Full-bleed hero cinematic video loops, conglomerate vertical spotlights, dynamic executive quotes, real-time news tickers, and trust counters.
   - **About Us (`/about`)**: Corporate heritage, founding philosophy, fiduciary governance principles, and complete Executive Leadership Board with verified officer dossiers.
   - **Tenders & E-Procurement (`/tenders`)**:
     - Live Notices directory with multi-tier filters (Vertical, Tender Type, Value, Category).
     - Dedicated **"Register New Organization"** portal with corporate empanelment certificate modal, copyable Supplier ID (`RBG-SUP-2026-XXXX`), and print capability.
     - Interactive **E-Bidding Gateway** supporting technical & financial dossier uploads.
     - **8-Stage Live Tender Tracker** querying by Bid ID (`RBG-BID-...`), Tender ID, or Supplier ID.
   - **Careers & Talent Portal (`/careers`)**:
     - Live job openings directory with department, vertical, and experience filters.
     - Dedicated **Candidate ATS Application Gateway** with resume uploading and cryptographic doc ref.
     - **5-Stage Candidate ATS Status Tracker** querying by Application ID (`RBG-APP-2026-XXXXX`).
   - **Media & Press Center (`/media`)**:
     - Multi-tab portal with Thought Leadership Articles, Press Releases, Media Photo Galleries, and External Media Coverage.
     - Dynamic single article reader (`/articles/:slug`) and news reader (`/news/:slug`).
   - **Contact & Corporate Secretariat (`/contact`)**:
     - Clean, prestigious corporate contact form with 3x3 structured inquiry reasons, designated entity routing, and instant feedback.

2. **Executive Admin Dashboard (`/admin/dashboard`)**:
   - **Articles & News Publishing Desk**: Full CRUD (Create, Read, Update, Delete) with Rich WYSIWYG Editor, Markdown support, auto-slug generation, and instant preview.
   - **Media & Photo Galleries Vault**: Upload, edit captions, and delete images with external link support.
   - **External Media Coverage Manager**: Curate press citations, publications, and external news links.
   - **Tenders Management Desk**: Publish, edit, and archive tender notices with statutory requirements.
   - **Careers ATS Management**: Post job openings, manage vacancies, and track applicants across 5 recruitment stages.
   - **Centralized Forms & Enquiries Desk**:
     - *Public Enquiries*: Live inquiry list, status updater (New, Reviewed, Closed), and internal officer notes.
     - *Tender Bids & Applications*: Inspect vendor price bids, GSTIN, and advance evaluation stages.
     - *Vendor Registrations*: Empanelled supplier records and certification status.
     - *Career ATS Vault*: Candidate dossiers, resume reviews, and recruitment workflow.
     - *Email & ID Track Logs*: Chronological audit trail showing every Reference ID, recipient email, email dispatch status (`Delivered`), and timestamped lifecycle milestones with in-modal event appending.

3. **Backend, Database & Notification Infrastructure**:
   - **PostgreSQL / Supabase Schema (`database_schema.sql`)**: Production-ready schema with automated sequences, tables, indexes, triggers, and Row Level Security.
   - **Unified Tracking & Notification Engine (`src/lib/trackingService.ts`)**: Generates standardized Reference IDs (`RBG-TEN-...`, `RBG-BID-...`, `RBG-APP-...`, `RBG-SUP-...`, `RBG-ENQ-...`) and logs full audit trails.
   - **Resend API Integration (`src/utils/emailService.ts`)**: Connected with environment-based API key (`VITE_RESEND_API_KEY`) with smart fallback routing to `rashtrabharosagroup@gmail.com`.

---

### B. What was Fixed & Resolved (क्या-क्या फ़िक्स हुआ है):
1. **Mock / Fake Data Removal**:
   - Cleared all hardcoded demo/fake submissions from `initialApplications`, `initialBids`, `initialSuppliers`, `initialCandidateApplications`, and `defaultInquiries`.
   - Built high-end empty-state views across all dashboard tables and public tracking boards.
2. **Contact Form Clean Experience (Zero Ticket/Query Jargon)**:
   - Removed all ticket query boxes and reference ID clutter from the contact form success screen.
   - Configured warm, polite corporate acknowledgment email: *"Thanks for submitting your information. Thanks for connecting with Rashtra Bharosa Group."*
3. **Resend Email Delivery & API Key Update**:
   - Upgraded Resend API Key configuration in `.env`.
   - Verified live API delivery with test ID `01a0ed46-81bd-772e-9dcb-795f59c7fbed`.
   - Implemented real-time admin copy routing to `rashtrabharosagroup@gmail.com`.
4. **Empanelled Directory & Organization Registration Button**:
   - Replaced "Empanelled Directory" with "Register New Organization" on the Tenders hero page.
   - Added corporate empanelment certificate generator with copyable ID and print feature.
5. **Subsidiaries Management Clean-up**:
   - Removed Subsidiaries & Ventures CRUD from dashboard to preserve corporate brand integrity and prevent accidental structural alterations.
6. **Production Build Clean**:
   - Verified `npm run build` completes with 0 errors across all TypeScript files and Vite assets.

---

### C. What is Pending / External Actions Required (क्या-क्या बाकी / यूज़र एक्शन):
1. **Resend Custom Domain DNS Verification (Optional but Recommended)**:
   - Currently, Resend operates under test sandbox rules sending to verified mailbox `rashtrabharosagroup@gmail.com`.
   - To send direct emails from `contact@rashtrabharosagroup.com` to any third-party external mailbox, add and verify DNS records (DKIM/SPF) at [resend.com/domains](https://resend.com/domains).
2. **Execute Database Schema on Supabase**:
   - Run `database_schema.sql` once in the Supabase SQL Editor to initialize cloud tables, sequences, and RLS policies.

---

## 6. Change History & Changelog Log
- **2026-09-29 (Session 4)**:
  - Updated Resend API Key in `.env`.
  - Streamlined Contact Form to send polite greeting email without ticket numbers.
  - Built Executive Track Logs & Email Audit Desk in `FormsManager.tsx` with chronological milestone logging.
  - Verified 100% clean production build (`npm run build`).
