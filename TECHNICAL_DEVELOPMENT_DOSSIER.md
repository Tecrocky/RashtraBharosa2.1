# Rashtra Bharosa Group — Technical Architecture & Development Dossier

## 1. Executive Platform Architecture
- **Framework:** React 18 (TypeScript) + Vite Modern Bundler
- **Styling Paradigm:** Tailwind CSS v3 + CSS Variables + Framer Motion (Hardware-accelerated layout transitions)
- **Component Library:** Radix UI Primitives (`@radix-ui/*`) + Lucide React Vector Icons + Sonner / Shadcn UI Toasters
- **Routing Engine:** React Router DOM v6 with dynamic routing, deep-link parameter parsing, and scroll-to-top automation.

---

## 2. Cloud Infrastructure, Backend & API Integrations
1. **Supabase Cloud Database & Storage (`@supabase/supabase-js`)**:
   - **Articles & News Dispatches Engine:** Cloud synchronization with optimistic local caching (`rbg_content_articles_full`, `rbg_news_announcements`).
   - **Tenders & Real-Time Bid Application Tracker:** Multi-step procurement submission, file uploads, and timestamped tracking logs (`rbg_tracklogs`).
   - **Talent ATS & Recruitment Pipeline:** Resume ingestion, multi-subsidiary filtering, status transitions, and automated applicant records.
   - **Media Library & Asset Storage:** Cloud storage buckets with fallback to static high-resolution assets.

2. **Enterprise Email Delivery Gateway (`Resend API`)**:
   - Automated two-way transactional dispatch:
     - Stakeholder inquiry acknowledgments
     - Real estate booking verification & call scheduling
     - Candidate ATS submission receipts
     - Vendor tender qualification & bid tracking pass issuance (`RBG-AUTH-XXXX`)
     - Brand Guidelines & Vector Media Kit access authentication

3. **Google Ecosystem Integrations**:
   - **Google Tag Manager Container:** `GTM-P57LNVJS` (Synchronously injected in `<head>` and `<noscript>` in `<body>`)
   - **Google Analytics 4 Tracking:** `G-XCZ3Y44WKN` (`gtag.js` direct event telemetry)
   - **Google Maps Embedded Geolocation API:** Live iframe synchronization for Corporate Headquarters (Forest Park, Bhubaneswar: `20.2536° N, 85.8201° E`)

4. **Multi-Location Google Business Profile Schema (JSON-LD)**:
   - Corporate Headquarters — Bhubaneswar (`+91 8260986053`, PIN: 751009)
   - Mining Operations Concession Office — Jamshedpur (`011 6965 5291`, PIN: 831002)
   - Real Estate & Infrastructure Office — Balasore (`+91 6372881497`, PIN: 756043)
   - Corporate Regional Office — Noida Special Economy Zone (`011 6965 5291`, PIN: 201305)
   - Corporate Regional Office — Amaravati (`011 6965 5291`, PIN: 522020)

---

## 3. Crawlability, SEO & Machine-Readable Indexing
- **Robots.txt:** Configured at `/robots.txt` allowing full crawler access across all public routes while restricting administrative suites (`/admin/*`, `/dashboard`).
- **XML Sitemap:** Configured at `/sitemap.xml` with priority weighting (`1.00` for root, `0.90` for core verticals, `0.85` for sub-ventures).
- **Human & Bot HTML Sitemap:** Live visual index at `/sitemap` providing categorized hierarchical discovery.
- **OpenGraph & Twitter Card Metadata:** Optimized social sharing unfurls with sovereign branding crests and descriptions.
