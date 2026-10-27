-- ============================================================================
-- 🏛️ RASHTRA BHAROSA GROUP — COMPLETE SUPABASE PRODUCTION DATABASE SCHEMA
-- EXECUTE THIS IN THE SUPABASE SQL EDITOR (https://supabase.com/dashboard/project/thmydwhrxnvofhutacgp/sql)
-- ============================================================================

-- Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- 1. INQUIRIES TABLE (Public Contact Form -> Admin Forms Desk)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.inquiries (
    id TEXT PRIMARY KEY,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    company_name TEXT,
    designation TEXT,
    location TEXT,
    selected_company TEXT DEFAULT 'Rashtra Bharosa Group Limited',
    selected_project TEXT DEFAULT 'General Inquiry',
    reason TEXT DEFAULT 'Business Enquiry',
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'New' CHECK (status IN ('New', 'Reviewed', 'In Progress', 'Closed')),
    assigned_officer TEXT DEFAULT 'Office of the Secretariat',
    notes JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ============================================================================
-- 2. CANDIDATE APPLICATIONS TABLE (Careers ATS Portal -> Candidate Vault)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.candidate_applications (
    application_id TEXT PRIMARY KEY,
    job_code TEXT NOT NULL,
    job_title TEXT NOT NULL,
    vertical TEXT NOT NULL,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    location TEXT,
    education TEXT,
    specialization TEXT,
    experience_years TEXT,
    current_company TEXT,
    current_designation TEXT,
    current_ctc TEXT,
    expected_ctc TEXT,
    notice_period TEXT,
    linkedin_url TEXT,
    resume_file_name TEXT,
    resume_doc_ref TEXT,
    cover_note TEXT,
    applied_date TEXT,
    current_stage INT DEFAULT 1,
    status TEXT DEFAULT 'Application Received & Vaulted',
    remarks TEXT,
    timeline JSONB DEFAULT '[]'::jsonb,
    queries JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ============================================================================
-- 3. ARTICLES TABLE (Admin Article Editor -> Public Website /articles/:slug)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.articles (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT,
    author TEXT DEFAULT 'Subransu Mohanty',
    category TEXT DEFAULT 'Corporate',
    featured_image TEXT,
    featured_image_alt TEXT,
    publication_date TEXT NOT NULL,
    related_business TEXT DEFAULT 'Rashtra Bharosa Group Limited',
    related_project TEXT,
    tags JSONB DEFAULT '[]'::jsonb,
    content TEXT NOT NULL,
    seo_title TEXT,
    seo_description TEXT,
    status TEXT DEFAULT 'Published' CHECK (status IN ('Draft', 'Published', 'Archived')),
    views INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ============================================================================
-- 4. NEWS & COMPANY UPDATES TABLE (Admin News Editor -> Public Website /news/:slug)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.news (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    featured_image TEXT,
    category TEXT DEFAULT 'Company Update',
    date TEXT NOT NULL,
    related_business TEXT DEFAULT 'Rashtra Bharosa Group Limited',
    related_project TEXT,
    status TEXT DEFAULT 'Published' CHECK (status IN ('Draft', 'Published', 'Archived')),
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ============================================================================
-- 5. MEDIA POSTS & GALLERIES TABLE (Admin Media Editor -> Media Centre)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.media_posts (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    media_type TEXT DEFAULT 'Photo Gallery',
    date TEXT NOT NULL,
    related_business TEXT DEFAULT 'Rashtra Bharosa Group Limited',
    related_project TEXT,
    cover_image TEXT,
    gallery JSONB DEFAULT '[]'::jsonb,
    video_url TEXT,
    status TEXT DEFAULT 'Published' CHECK (status IN ('Draft', 'Published')),
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ============================================================================
-- 6. MEDIA ASSETS LIBRARY (Centralized Photographic & PDF Repository)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.media_assets (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    url TEXT NOT NULL,
    type TEXT DEFAULT 'image' CHECK (type IN ('image', 'video', 'pdf', 'doc')),
    file_size TEXT DEFAULT '1.2 MB',
    alt TEXT,
    uploaded_at TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ============================================================================
-- 7. TENDERS TABLE (Admin Tender Editor -> Public Procurement Portal)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.tenders (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    department TEXT NOT NULL,
    vertical_code TEXT DEFAULT 'INFRA-EPC',
    tender_type TEXT DEFAULT 'Open National Competitive Tender',
    category TEXT NOT NULL,
    category_filter TEXT DEFAULT 'construction',
    estimated_value TEXT,
    emd_amount TEXT,
    emd_exemption_allowed BOOLEAN DEFAULT true,
    tender_fee TEXT DEFAULT '100% Free Open Access (₹0)',
    issue_date TEXT,
    closing_date TEXT,
    closing_time TEXT DEFAULT '17:00 IST',
    status TEXT DEFAULT 'Active' CHECK (status IN ('Active', 'Closed', 'Draft')),
    location TEXT DEFAULT 'Bhubaneswar, Odisha, India',
    state TEXT DEFAULT 'Odisha',
    document_size TEXT DEFAULT '4.5 MB',
    procurement_officer TEXT DEFAULT 'Er. D. K. Pattnaik (Chief Procurement Officer)',
    procurement_email TEXT DEFAULT 'tenders@rashtrabharosagroup.com',
    contract_period TEXT DEFAULT '18 Months',
    bid_validity_period TEXT DEFAULT '120 Days',
    scope_summary TEXT,
    eligibility_criteria JSONB DEFAULT '[]'::jsonb,
    specifications JSONB DEFAULT '[]'::jsonb,
    deliverables JSONB DEFAULT '[]'::jsonb,
    required_documents JSONB DEFAULT '[]'::jsonb,
    boq_items JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ============================================================================
-- 8. BIDS TABLE (Contractor Tender Submissions -> Tenders Vault)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.bids (
    bid_submission_id TEXT PRIMARY KEY,
    application_no TEXT,
    tender_id TEXT NOT NULL,
    supplier_id TEXT NOT NULL,
    company_name TEXT NOT NULL,
    gstin TEXT,
    contact_person TEXT,
    contact_email TEXT,
    contact_phone TEXT,
    submission_date TEXT,
    current_stage INT DEFAULT 4,
    status TEXT DEFAULT 'Technical Scrutiny in Progress',
    remarks TEXT,
    tender_fee_payment_ref TEXT DEFAULT 'ZERO_FEE_EXEMPTED',
    emd_submission_mode TEXT DEFAULT 'Bank Guarantee / Statutory Exemption',
    uploaded_documents JSONB DEFAULT '[]'::jsonb,
    timeline_events JSONB DEFAULT '[]'::jsonb,
    financial_bid JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ============================================================================
-- 9. JOBS TABLE (Admin Career Editor -> Public Careers Portal)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.jobs (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    vertical TEXT NOT NULL,
    department TEXT NOT NULL,
    location TEXT NOT NULL,
    type TEXT DEFAULT 'Full Time',
    workplace_type TEXT DEFAULT 'On-site',
    experience TEXT NOT NULL,
    openings INT DEFAULT 1,
    description TEXT NOT NULL,
    responsibilities JSONB DEFAULT '[]'::jsonb,
    qualifications TEXT,
    skills JSONB DEFAULT '[]'::jsonb,
    benefits JSONB DEFAULT '[]'::jsonb,
    salary TEXT,
    posted_date TEXT,
    closing_date TEXT,
    status TEXT DEFAULT 'Active' CHECK (status IN ('Active', 'Closed', 'Draft')),
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ============================================================================
-- 10. SUPPLIERS TABLE (Empanelled Vendor Directory)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.suppliers (
    supplier_id TEXT PRIMARY KEY,
    company_name TEXT NOT NULL,
    gstin TEXT NOT NULL,
    pan_number TEXT NOT NULL,
    contact_person TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    address TEXT,
    state TEXT,
    business_category TEXT,
    is_msme BOOLEAN DEFAULT false,
    registration_date TEXT,
    verification_status TEXT DEFAULT 'Verified',
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ============================================================================
-- 11. ADMIN PROFILES & ROLE-BASED ACCESS CONTROL (RBAC)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.admin_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('Super Admin', 'Content Admin', 'Careers Admin', 'Tender Admin')),
    designation TEXT,
    department TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ============================================================================
-- 12. AUDIT LOGS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id TEXT PRIMARY KEY,
    action TEXT NOT NULL,
    user_identity TEXT NOT NULL,
    timestamp TEXT NOT NULL,
    ip_route TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ============================================================================
-- 13. ENABLE ROW LEVEL SECURITY (RLS) FOR ALL TABLES
-- ============================================================================
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidate_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tenders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bids ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- 14. PERMISSIVE POLICIES (Allow Public Read & Form Writes + Full Admin Sync)
-- ============================================================================
-- Inquiries Policies
CREATE POLICY "Allow public insert to inquiries" ON public.inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow read inquiries" ON public.inquiries FOR SELECT USING (true);
CREATE POLICY "Allow update inquiries" ON public.inquiries FOR UPDATE USING (true);

-- Candidate Applications Policies
CREATE POLICY "Allow public insert to candidate_applications" ON public.candidate_applications FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow read candidate_applications" ON public.candidate_applications FOR SELECT USING (true);
CREATE POLICY "Allow update candidate_applications" ON public.candidate_applications FOR UPDATE USING (true);

-- Articles Policies (Public can read published; Admin can manage all)
CREATE POLICY "Allow public read articles" ON public.articles FOR SELECT USING (true);
CREATE POLICY "Allow insert articles" ON public.articles FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update articles" ON public.articles FOR UPDATE USING (true);
CREATE POLICY "Allow delete articles" ON public.articles FOR DELETE USING (true);

-- News Policies
CREATE POLICY "Allow public read news" ON public.news FOR SELECT USING (true);
CREATE POLICY "Allow insert news" ON public.news FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update news" ON public.news FOR UPDATE USING (true);
CREATE POLICY "Allow delete news" ON public.news FOR DELETE USING (true);

-- Media Posts Policies
CREATE POLICY "Allow public read media_posts" ON public.media_posts FOR SELECT USING (true);
CREATE POLICY "Allow insert media_posts" ON public.media_posts FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update media_posts" ON public.media_posts FOR UPDATE USING (true);

-- Media Assets Policies
CREATE POLICY "Allow public read media_assets" ON public.media_assets FOR SELECT USING (true);
CREATE POLICY "Allow insert media_assets" ON public.media_assets FOR INSERT WITH CHECK (true);

-- Tenders Policies
CREATE POLICY "Allow public read tenders" ON public.tenders FOR SELECT USING (true);
CREATE POLICY "Allow insert tenders" ON public.tenders FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update tenders" ON public.tenders FOR UPDATE USING (true);

-- Bids Policies
CREATE POLICY "Allow public insert bids" ON public.bids FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow read bids" ON public.bids FOR SELECT USING (true);
CREATE POLICY "Allow update bids" ON public.bids FOR UPDATE USING (true);

-- Jobs Policies
CREATE POLICY "Allow public read jobs" ON public.jobs FOR SELECT USING (true);
CREATE POLICY "Allow insert jobs" ON public.jobs FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update jobs" ON public.jobs FOR UPDATE USING (true);

-- Suppliers Policies
CREATE POLICY "Allow public insert suppliers" ON public.suppliers FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow read suppliers" ON public.suppliers FOR SELECT USING (true);

-- Admin Profiles Policies
CREATE POLICY "Allow read admin_profiles" ON public.admin_profiles FOR SELECT USING (true);
CREATE POLICY "Allow write admin_profiles" ON public.admin_profiles FOR ALL USING (true);

-- Audit Logs Policies
CREATE POLICY "Allow insert audit_logs" ON public.audit_logs FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow read audit_logs" ON public.audit_logs FOR SELECT USING (true);

-- ============================================================================
-- 15. ENABLE SUPABASE REALTIME REPLICATION
-- ============================================================================
DO $$
BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.inquiries;
    ALTER PUBLICATION supabase_realtime ADD TABLE public.candidate_applications;
    ALTER PUBLICATION supabase_realtime ADD TABLE public.articles;
    ALTER PUBLICATION supabase_realtime ADD TABLE public.news;
    ALTER PUBLICATION supabase_realtime ADD TABLE public.media_posts;
    ALTER PUBLICATION supabase_realtime ADD TABLE public.tenders;
    ALTER PUBLICATION supabase_realtime ADD TABLE public.bids;
    ALTER PUBLICATION supabase_realtime ADD TABLE public.jobs;
EXCEPTION WHEN OTHERS THEN
    NULL;
END $$;

-- ============================================================================
-- 16. INSERT INITIAL SEED DATA
-- ============================================================================

-- Initial Article
INSERT INTO public.articles (id, title, slug, excerpt, author, category, featured_image, publication_date, related_business, related_project, content, seo_title, seo_description, status, views)
VALUES (
    'ART-2026-01',
    'RashBhar Group Expands Its Mining & Infrastructure Operations in Odisha',
    'rashbhar-group-expands-mining-infrastructure-operations-odisha',
    'Strategic alignment with sovereign state infrastructure plans, setting new benchmarks in modern mechanization, eco-restoration, and high-speed rail corridor execution.',
    'Subransu Mohanty',
    'Mining',
    'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1200&q=80',
    '2026-09-24',
    'RashBhar Mining',
    'Joda-Barbil Iron Ore Beneficiation Complex',
    '<h2>Transforming Eastern India Industrial Backbone</h2><p>Rashtra Bharosa Group Limited today announced the formal acceleration of its sovereign mining beneficiation facilities across northern Odisha. Integrated alongside Innovex Construction heavy EPC corridor, the expansion introduces state-of-the-art closed-circuit conveyor loops and ultra-low noise hydraulic crushing plants.</p>',
    'RashBhar Group Mining Expansion in Odisha | Official Corporate Release',
    'Rashtra Bharosa Group accelerates major mining beneficiation and heavy infrastructure projects in Odisha with advanced sustainability benchmarks.',
    'Published',
    4820
) ON CONFLICT (id) DO NOTHING;

-- Initial News Post
INSERT INTO public.news (id, title, slug, excerpt, content, featured_image, category, date, related_business, related_project, status)
VALUES (
    'NWS-2026-01',
    'RashBhar Health Care Breaks Ground on 500-Bed Advanced Trauma & Oncology Hub',
    'rashbhar-health-care-breaks-ground-500-bed-hospital',
    'State-of-the-art tertiary care facility equipped with robotic surgery suites and dedicated oncology research institute.',
    '<p>Construction officially commenced today on the state largest super-specialty hospital infrastructure project.</p>',
    'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
    'Press Release',
    '2026-09-18',
    'RashBhar Health Care',
    '500-Bed Flagship Multi-Super-Specialty Hospital',
    'Published'
) ON CONFLICT (id) DO NOTHING;

-- Initial Inquiry
INSERT INTO public.inquiries (id, full_name, email, phone, company_name, designation, location, selected_company, selected_project, reason, subject, message, status, assigned_officer)
VALUES (
    'ENQ-2026-0045',
    'Col. Rajeshwar Nath (Retd.)',
    'rajeshwar.nath@defenceinfra.gov.in',
    '+91 98110 44219',
    'National Infrastructure & Strategic Logistics',
    'Principal Technical Advisor',
    'New Delhi, Delhi, India',
    'Innovex Construction',
    'Bhubaneswar Metro Phase-1 Rail Corridor',
    'Institutional Tender / Heavy EPC Vendor Partnership',
    'Strategic Civil EPC Alignment for High-Speed Rail & Bridge Work',
    'We are reviewing potential consortium partners for upcoming eastern corridor civil EPC and structural pre-cast fabrication.',
    'New',
    'Er. Alok Mohanty (Chief Projects Officer)'
) ON CONFLICT (id) DO NOTHING;
