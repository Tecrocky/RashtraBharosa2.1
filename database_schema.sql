-- ========================================================================================
-- RASHTRA BHAROSA GROUP — COMPLETE ENTERPRISE DATABASE SCHEMA & TRACKING SYSTEM
-- Compatible with PostgreSQL 14+ / Supabase Cloud DB
-- Includes Auto-Generated Reference IDs, Dual Sync Tables, Triggers, Indexes & Security RLS
-- ========================================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ========================================================================================
-- 2. SEQUENCES FOR SOVEREIGN REFERENCE IDENTIFIERS
-- ========================================================================================
CREATE SEQUENCE IF NOT EXISTS seq_tender_notice START WITH 1001;
CREATE SEQUENCE IF NOT EXISTS seq_tender_bid START WITH 2001;
CREATE SEQUENCE IF NOT EXISTS seq_career_app START WITH 3001;
CREATE SEQUENCE IF NOT EXISTS seq_supplier START WITH 4001;
CREATE SEQUENCE IF NOT EXISTS seq_inquiry START WITH 5001;

-- ========================================================================================
-- 3. FUNCTION TO AUTO-GENERATE FORMATTED REFERENCE CODES
-- ========================================================================================
CREATE OR REPLACE FUNCTION generate_rbg_reference_id(prefix TEXT, seq_name TEXT)
RETURNS TEXT AS $$
DECLARE
    next_val BIGINT;
    year_str TEXT;
BEGIN
    SELECT to_char(CURRENT_DATE, 'YYYY') INTO year_str;
    EXECUTE format('SELECT nextval(%L)', seq_name) INTO next_val;
    RETURN prefix || '-' || year_str || '-' || LPAD(next_val::TEXT, 4, '0');
END;
$$ LANGUAGE plpgsql;

-- ========================================================================================
-- 4. TENDERS & E-PROCUREMENT NOTICES TABLE
-- ========================================================================================
CREATE TABLE IF NOT EXISTS tenders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tender_id TEXT UNIQUE NOT NULL DEFAULT generate_rbg_reference_id('RBG-TEN', 'seq_tender_notice'),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    organization TEXT NOT NULL,
    department TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'Works',
    status TEXT NOT NULL DEFAULT 'Active',
    estimated_value_inr TEXT NOT NULL,
    emd_amount_inr TEXT NOT NULL DEFAULT 'Nil / Statutory Exemption',
    tender_fee TEXT NOT NULL DEFAULT '₹0.00 (Zero Fee / Sovereign Exemption)',
    bidding_type TEXT NOT NULL DEFAULT 'National Competitive Bidding',
    published_date DATE NOT NULL DEFAULT CURRENT_DATE,
    closing_date DATE NOT NULL,
    opening_date DATE NOT NULL,
    location TEXT NOT NULL,
    description TEXT,
    scope_of_work TEXT,
    eligibility_criteria JSONB DEFAULT '{"technical":[],"financial":[],"statutory":[]}',
    deliverables JSONB DEFAULT '[]',
    specifications JSONB DEFAULT '[]',
    boq_items JSONB DEFAULT '[]',
    contact_person TEXT,
    contact_email TEXT,
    contact_phone TEXT,
    is_live BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================================================================
-- 5. TENDER BIDS & VENDOR APPLICATIONS TABLE (TRACKABLE)
-- ========================================================================================
CREATE TABLE IF NOT EXISTS tender_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    bid_reference_id TEXT UNIQUE NOT NULL DEFAULT generate_rbg_reference_id('RBG-BID', 'seq_tender_bid'),
    tender_id TEXT NOT NULL REFERENCES tenders(tender_id) ON DELETE CASCADE,
    tender_title TEXT NOT NULL,
    bidder_name TEXT NOT NULL,
    company_name TEXT NOT NULL,
    contact_email TEXT NOT NULL,
    contact_phone TEXT NOT NULL,
    gstin_pan TEXT NOT NULL,
    bid_amount_inr NUMERIC(15, 2),
    technical_compliance_status TEXT DEFAULT 'Under Review',
    financial_evaluation_status TEXT DEFAULT 'Pending Opening',
    overall_status TEXT NOT NULL DEFAULT 'Submitted',
    current_stage_index INT DEFAULT 1,
    stage_name TEXT DEFAULT 'Technical Evaluation',
    documents_submitted JSONB DEFAULT '[]',
    remarks TEXT,
    submitted_at TIMESTAMPTZ DEFAULT NOW(),
    last_updated TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================================================================
-- 6. CAREERS / JOB OPENINGS TABLE
-- ========================================================================================
CREATE TABLE IF NOT EXISTS jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    job_id TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    department TEXT NOT NULL,
    location TEXT NOT NULL,
    experience_level TEXT NOT NULL,
    employment_type TEXT NOT NULL DEFAULT 'Full-Time / Executive Cadre',
    compensation TEXT NOT NULL DEFAULT 'Competitive Sovereign Scale',
    description TEXT,
    requirements JSONB DEFAULT '[]',
    responsibilities JSONB DEFAULT '[]',
    statutory_benefits JSONB DEFAULT '[]',
    deadline DATE,
    status TEXT NOT NULL DEFAULT 'Active',
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================================================================
-- 7. CANDIDATE ATS APPLICATIONS TABLE (TRACKABLE)
-- ========================================================================================
CREATE TABLE IF NOT EXISTS career_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_tracking_id TEXT UNIQUE NOT NULL DEFAULT generate_rbg_reference_id('RBG-APP', 'seq_career_app'),
    job_id TEXT NOT NULL,
    job_title TEXT NOT NULL,
    candidate_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    current_company TEXT,
    current_designation TEXT,
    experience_years TEXT,
    notice_period TEXT,
    current_location TEXT,
    portfolio_resume_url TEXT,
    status TEXT NOT NULL DEFAULT 'Application Received',
    current_stage_index INT DEFAULT 0,
    stage_name TEXT DEFAULT 'Screening & Credential Review',
    recruiter_notes TEXT,
    submitted_at TIMESTAMPTZ DEFAULT NOW(),
    last_updated TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================================================================
-- 8. EMPANELLED SUPPLIERS / VENDOR DIRECTORY TABLE (TRACKABLE)
-- ========================================================================================
CREATE TABLE IF NOT EXISTS suppliers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    supplier_id TEXT UNIQUE NOT NULL DEFAULT generate_rbg_reference_id('RBG-SUP', 'seq_supplier'),
    company_name TEXT NOT NULL,
    contact_person TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    category TEXT NOT NULL,
    gstin TEXT NOT NULL,
    pan TEXT,
    msme_registration_no TEXT,
    registered_office_address TEXT,
    annual_turnover_inr TEXT,
    compliance_rating TEXT DEFAULT 'Class-A Verified',
    status TEXT NOT NULL DEFAULT 'Active Empanelled',
    registered_at TIMESTAMPTZ DEFAULT NOW(),
    last_updated TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================================================================
-- 9. PUBLIC CONTACT & EXECUTIVE INQUIRIES TABLE (TRACKABLE)
-- ========================================================================================
CREATE TABLE IF NOT EXISTS inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    inquiry_reference_id TEXT UNIQUE NOT NULL DEFAULT generate_rbg_reference_id('RBG-ENQ', 'seq_inquiry'),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    company_name TEXT,
    designation TEXT,
    location TEXT,
    selected_company TEXT,
    selected_project TEXT,
    reason TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'New',
    assigned_officer TEXT DEFAULT 'Directorate General Secretariat',
    resolution_notes TEXT,
    submitted_at TIMESTAMPTZ DEFAULT NOW(),
    last_updated TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================================================================
-- 10. ARTICLES & EDITORIAL PUBLICATIONS TABLE
-- ========================================================================================
CREATE TABLE IF NOT EXISTS articles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    subtitle TEXT,
    category TEXT NOT NULL,
    author TEXT NOT NULL,
    author_role TEXT,
    read_time TEXT,
    published_date DATE NOT NULL DEFAULT CURRENT_DATE,
    image_url TEXT,
    content_markdown TEXT,
    key_takeaways JSONB DEFAULT '[]',
    status TEXT NOT NULL DEFAULT 'Published',
    featured BOOLEAN DEFAULT false,
    view_count INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================================================================
-- 11. COMPANY NEWS & MILESTONES TABLE
-- ========================================================================================
CREATE TABLE IF NOT EXISTS news (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    category TEXT NOT NULL,
    source TEXT DEFAULT 'Corporate Communications Desk',
    location TEXT DEFAULT 'Bhubaneswar, Odisha',
    image_url TEXT,
    summary TEXT,
    content TEXT,
    tags JSONB DEFAULT '[]',
    is_live BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================================================================
-- 12. EXTERNAL MEDIA COVERAGE TABLE
-- ========================================================================================
CREATE TABLE IF NOT EXISTS media_coverage (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    headline TEXT NOT NULL,
    publication TEXT NOT NULL,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    coverage_type TEXT NOT NULL DEFAULT 'Print',
    author TEXT,
    external_url TEXT,
    thumbnail TEXT,
    summary TEXT,
    highlight_quote TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================================================================
-- 13. AUTOMATED EMAIL NOTIFICATIONS AUDIT LOG TABLE
-- ========================================================================================
CREATE TABLE IF NOT EXISTS email_notifications_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reference_id TEXT NOT NULL,
    recipient_email TEXT NOT NULL,
    recipient_name TEXT NOT NULL,
    notification_type TEXT NOT NULL,
    subject TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Sent',
    sent_at TIMESTAMPTZ DEFAULT NOW(),
    metadata JSONB DEFAULT '{}'
);

-- ========================================================================================
-- 14. PERFORMANCE INDEXES
-- ========================================================================================
CREATE INDEX IF NOT EXISTS idx_tenders_status ON tenders(status);
CREATE INDEX IF NOT EXISTS idx_tenders_closing_date ON tenders(closing_date);
CREATE INDEX IF NOT EXISTS idx_tender_app_ref ON tender_applications(bid_reference_id);
CREATE INDEX IF NOT EXISTS idx_career_app_ref ON career_applications(application_tracking_id);
CREATE INDEX IF NOT EXISTS idx_suppliers_ref ON suppliers(supplier_id);
CREATE INDEX IF NOT EXISTS idx_inquiries_ref ON inquiries(inquiry_reference_id);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_news_slug ON news(slug);

-- ========================================================================================
-- 15. ROW-LEVEL SECURITY (RLS) POLICIES
-- ========================================================================================
ALTER TABLE tenders ENABLE ROW LEVEL SECURITY;
ALTER TABLE tender_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE career_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_coverage ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_notifications_log ENABLE ROW LEVEL SECURITY;

-- Allow Public READ on Published Items
CREATE POLICY "Public Read Tenders" ON tenders FOR SELECT USING (is_live = true);
CREATE POLICY "Public Read Jobs" ON jobs FOR SELECT USING (is_published = true);
CREATE POLICY "Public Read Articles" ON articles FOR SELECT USING (status = 'Published');
CREATE POLICY "Public Read News" ON news FOR SELECT USING (is_live = true);
CREATE POLICY "Public Read Media Coverage" ON media_coverage FOR SELECT USING (true);

-- Allow Public Submissions (INSERT) with Auto-Reference ID Generation
CREATE POLICY "Public Insert Tender Applications" ON tender_applications FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Insert Career Applications" ON career_applications FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Insert Suppliers" ON suppliers FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Insert Inquiries" ON inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Insert Notification Log" ON email_notifications_log FOR INSERT WITH CHECK (true);

-- Allow Public Lookup by Exact Reference Tracking ID
CREATE POLICY "Public Lookup Tender Applications" ON tender_applications FOR SELECT USING (true);
CREATE POLICY "Public Lookup Career Applications" ON career_applications FOR SELECT USING (true);
CREATE POLICY "Public Lookup Suppliers" ON suppliers FOR SELECT USING (true);
CREATE POLICY "Public Lookup Inquiries" ON inquiries FOR SELECT USING (true);

-- Service Role / Admin Full Management Policy
CREATE POLICY "Admin Full Access Tenders" ON tenders FOR ALL USING (true);
CREATE POLICY "Admin Full Access Tender Applications" ON tender_applications FOR ALL USING (true);
CREATE POLICY "Admin Full Access Jobs" ON jobs FOR ALL USING (true);
CREATE POLICY "Admin Full Access Career Applications" ON career_applications FOR ALL USING (true);
CREATE POLICY "Admin Full Access Suppliers" ON suppliers FOR ALL USING (true);
CREATE POLICY "Admin Full Access Inquiries" ON inquiries FOR ALL USING (true);
CREATE POLICY "Admin Full Access Articles" ON articles FOR ALL USING (true);
CREATE POLICY "Admin Full Access News" ON news FOR ALL USING (true);
CREATE POLICY "Admin Full Access Media Coverage" ON media_coverage FOR ALL USING (true);
CREATE POLICY "Admin Full Access Notification Log" ON email_notifications_log FOR ALL USING (true);

-- ========================================================================================
-- 16. AUTO-UPDATE TIMESTAMP TRIGGER
-- ========================================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE OR REPLACE TRIGGER update_tenders_updated_at BEFORE UPDATE ON tenders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE OR REPLACE TRIGGER update_jobs_updated_at BEFORE UPDATE ON jobs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE OR REPLACE TRIGGER update_articles_updated_at BEFORE UPDATE ON articles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE OR REPLACE TRIGGER update_news_updated_at BEFORE UPDATE ON news FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
