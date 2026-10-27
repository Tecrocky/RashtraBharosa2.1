import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";
import { AdminAuthProvider } from "./context/AdminAuthContext";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminProtectedRoute from "./components/admin/AdminProtectedRoute";


// --- Main Corporate Pages ---
import Home from "./pages/Home";
import About from "./pages/About";
import GroupProfile from "./pages/about/GroupProfile";
import GroupStructure from "./pages/about/GroupStructure";
import CorporateGovernance from "./pages/about/CorporateGovernance";
import StrategicJourney from "./pages/about/StrategicJourney";
import Founder from "./pages/about/Founder";
import Chairman from "./pages/about/Chairman";
import CEO from "./pages/about/CEO";
import Leadership from "./pages/about/Leadership";
import Businesses from "./pages/Businesses";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Innovation from "./pages/Innovation";
import Tenders from "./pages/Tenders";
import TenderDetail from "./pages/TenderDetail";
import MediaCentre from "./pages/MediaCentre";
import Careers from "./pages/Careers";
import Partners from "./pages/Partners";
import Contact from "./pages/Contact";
import Legal from "./pages/Legal";
import HerLegacy from "./pages/HerLegacy";
import Dashboard from "./pages/Dashboard";
import ArticleDetail from "./pages/ArticleDetail";
import HtmlSitemap from "./pages/HtmlSitemap";


// --- Dedicated Mining Sub-Pages ---
import MiningOverview from "./pages/ventures/mining/MiningOverview";
import MiningMissionValues from "./pages/ventures/mining/MiningMissionValues";
import MiningFounder from "./pages/ventures/mining/MiningFounder";
import MiningLeadership from "./pages/ventures/mining/MiningLeadership";

// --- Dedicated Infrastructure Sub-Pages ---
import InfraOverview from "./pages/ventures/infrastructure/InfraOverview";
import InfraMissionValues from "./pages/ventures/infrastructure/InfraMissionValues";
import InfraFounder from "./pages/ventures/infrastructure/InfraFounder";
import InfraLeadership from "./pages/ventures/infrastructure/InfraLeadership";

// --- Dedicated Healthcare Sub-Pages ---
import HealthcareOverview from "./pages/ventures/healthcare/HealthcareOverview";
import HealthcareMissionValues from "./pages/ventures/healthcare/HealthcareMissionValues";
import HealthcareFounder from "./pages/ventures/healthcare/HealthcareFounder";
import HealthcareLeadership from "./pages/ventures/healthcare/HealthcareLeadership";

// --- Dedicated Technology Sub-Pages ---
import TechOverview from "./pages/ventures/technology/TechOverview";
import TechMissionValues from "./pages/ventures/technology/TechMissionValues";
import TechFounder from "./pages/ventures/technology/TechFounder";
import TechLeadership from "./pages/ventures/technology/TechLeadership";

// --- Dedicated Agriculture Sub-Pages ---
import AgriOverview from "./pages/ventures/agriculture/AgriOverview";
import AgriMissionValues from "./pages/ventures/agriculture/AgriMissionValues";
import AgriFounder from "./pages/ventures/agriculture/AgriFounder";
import AgriLeadership from "./pages/ventures/agriculture/AgriLeadership";

// --- Dedicated Real Estate Sub-Pages ---
import RealEstateOverview from "./pages/ventures/realestate/RealEstateOverview";
import RealEstateMissionValues from "./pages/ventures/realestate/RealEstateMissionValues";
import RealEstateFounder from "./pages/ventures/realestate/RealEstateFounder";
import RealEstateLeadership from "./pages/ventures/realestate/RealEstateLeadership";

// --- Dedicated Investments Sub-Pages ---
import InvestmentsOverview from "./pages/ventures/investments/InvestmentsOverview";
import InvestmentsMissionValues from "./pages/ventures/investments/InvestmentsMissionValues";
import InvestmentsFounder from "./pages/ventures/investments/InvestmentsFounder";
import InvestmentsLeadership from "./pages/ventures/investments/InvestmentsLeadership";

// --- Dedicated Subsidiary CEO Pages ---
import MiningCEO from "./pages/ventures/mining/MiningCEO";
import InfraCEO from "./pages/ventures/infrastructure/InfraCEO";
import HealthcareCEO from "./pages/ventures/healthcare/HealthcareCEO";
import TechCEO from "./pages/ventures/technology/TechCEO";
import AgriCEO from "./pages/ventures/agriculture/AgriCEO";
import RealEstateCEO from "./pages/ventures/realestate/RealEstateCEO";
import InvestmentsCEO from "./pages/ventures/investments/InvestmentsCEO";

// --- Dedicated Sovereign R&D Venture Pages ---
import RashtrAI from "./pages/rd/RashtrAI";
import VedRi from "./pages/rd/VedRi";
import AgriGel from "./pages/rd/AgriGel";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AdminAuthProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Toaster />
          <Sonner />
          <Layout>
            <Routes>
              {/* Core Corporate Routes */}
              <Route path="/" element={<Home />} />
              
              {/* Complete About Section Suite */}
              <Route path="/about" element={<About />} />
              <Route path="/about/profile" element={<GroupProfile />} />
              <Route path="/about/corporate-profile" element={<GroupProfile />} />
              <Route path="/about/group-structure" element={<GroupStructure />} />
              <Route path="/about/corporate-governance" element={<CorporateGovernance />} />
              <Route path="/about/strategic-journey" element={<StrategicJourney />} />
              <Route path="/about/founder" element={<Founder />} />
              <Route path="/about/chairman" element={<Chairman />} />
              <Route path="/about/ceo" element={<CEO />} />
              <Route path="/about/leadership" element={<Leadership />} />

              <Route path="/businesses" element={<Businesses />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:id" element={<ProjectDetail />} />
              <Route path="/innovation" element={<Innovation />} />
              <Route path="/sustainability" element={<Navigate to="/about" replace />} />
              <Route path="/tenders" element={<Tenders />} />
              <Route path="/tenders/:slug" element={<TenderDetail />} />
              <Route path="/media" element={<MediaCentre />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/articles/:slug" element={<ArticleDetail />} />
              <Route path="/news/:slug" element={<ArticleDetail />} />
              <Route path="/partners" element={<Partners />} />
              <Route path="/partnerships" element={<Navigate to="/partners" replace />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/her-legacy" element={<HerLegacy />} />


              {/* --- Dedicated Admin & Central Management Gateway --- */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
              <Route
                path="/admin/dashboard"
                element={
                  <AdminProtectedRoute>
                    <Dashboard defaultTab="overview" />
                  </AdminProtectedRoute>
                }
              />
              <Route
                path="/admin/articles"
                element={
                  <AdminProtectedRoute allowedRoles={["Super Admin", "Content Admin"]}>
                    <Dashboard defaultTab="content" />
                  </AdminProtectedRoute>
                }
              />
              <Route
                path="/admin/news"
                element={
                  <AdminProtectedRoute allowedRoles={["Super Admin", "Content Admin"]}>
                    <Dashboard defaultTab="content" />
                  </AdminProtectedRoute>
                }
              />
              <Route
                path="/admin/media"
                element={
                  <AdminProtectedRoute allowedRoles={["Super Admin", "Content Admin"]}>
                    <Dashboard defaultTab="documents" />
                  </AdminProtectedRoute>
                }
              />
              <Route
                path="/admin/documents"
                element={
                  <AdminProtectedRoute allowedRoles={["Super Admin", "Content Admin"]}>
                    <Dashboard defaultTab="documents" />
                  </AdminProtectedRoute>
                }
              />
              <Route
                path="/admin/tenders"
                element={
                  <AdminProtectedRoute allowedRoles={["Super Admin", "Tender Admin"]}>
                    <Dashboard defaultTab="tenders" />
                  </AdminProtectedRoute>
                }
              />
              <Route
                path="/admin/careers"
                element={
                  <AdminProtectedRoute allowedRoles={["Super Admin", "Careers Admin"]}>
                    <Dashboard defaultTab="talent" />
                  </AdminProtectedRoute>
                }
              />
              <Route
                path="/admin/applications"
                element={
                  <AdminProtectedRoute allowedRoles={["Super Admin", "Careers Admin"]}>
                    <Dashboard defaultTab="talent" />
                  </AdminProtectedRoute>
                }
              />
              <Route
                path="/admin/forms"
                element={
                  <AdminProtectedRoute allowedRoles={["Super Admin", "Content Admin", "Careers Admin", "Tender Admin"]}>
                    <Dashboard defaultTab="inquiries" />
                  </AdminProtectedRoute>
                }
              />
              <Route
                path="/admin/settings"
                element={
                  <AdminProtectedRoute allowedRoles={["Super Admin"]}>
                    <Dashboard defaultTab="settings" />
                  </AdminProtectedRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <AdminProtectedRoute>
                    <Dashboard defaultTab="overview" />
                  </AdminProtectedRoute>
                }
              />


            {/* Dedicated Sovereign R&D Routes */}
            <Route path="/rd/rashtrai" element={<RashtrAI />} />
            <Route path="/rd/ved-ri" element={<VedRi />} />
            <Route path="/rd/agrigel" element={<AgriGel />} />
            <Route path="/innovation/rashtrai" element={<RashtrAI />} />
            <Route path="/innovation/ved-ri" element={<VedRi />} />
            <Route path="/innovation/agrigel" element={<AgriGel />} />

            {/* Legal & Compliance Routes */}
            <Route path="/legal" element={<Legal />} />
            <Route path="/legal/privacy" element={<Legal />} />
            <Route path="/legal/terms" element={<Legal />} />
            <Route path="/legal/whistleblower" element={<Legal />} />
            <Route path="/legal/disclaimer" element={<Legal />} />
            <Route path="/legal/code-of-conduct" element={<Legal />} />
            <Route path="/legal/policy" element={<Legal />} />
            <Route path="/legal/procurement-flow" element={<Legal />} />
            <Route path="/legal/flow" element={<Legal />} />
            <Route path="/sitemap" element={<HtmlSitemap />} />

            {/* 1. MINING DEDICATED ROUTES */}
            <Route path="/ventures/mining" element={<MiningOverview />} />
            <Route path="/ventures/mining/current-projects" element={<Navigate to="/ventures/mining" replace />} />
            <Route path="/ventures/mining/upcoming-projects" element={<Navigate to="/ventures/mining" replace />} />
            <Route path="/ventures/mining/mission-values" element={<MiningMissionValues />} />
            <Route path="/ventures/mining/founder" element={<MiningFounder />} />
            <Route path="/ventures/mining/ceo" element={<MiningCEO />} />
            <Route path="/ventures/mining/leadership" element={<MiningLeadership />} />
            <Route path="/ventures/mining/*" element={<MiningOverview />} />
            <Route path="/businesses/mining" element={<MiningOverview />} />
            <Route path="/businesses/mining/*" element={<MiningOverview />} />

            {/* 2. INFRASTRUCTURE & EPC DEDICATED ROUTES */}
            <Route path="/ventures/infrastructure" element={<InfraOverview />} />
            <Route path="/ventures/infrastructure/current-projects" element={<Navigate to="/ventures/infrastructure" replace />} />
            <Route path="/ventures/infrastructure/upcoming-projects" element={<Navigate to="/ventures/infrastructure" replace />} />
            <Route path="/ventures/infrastructure/mission-values" element={<InfraMissionValues />} />
            <Route path="/ventures/infrastructure/founder" element={<InfraFounder />} />
            <Route path="/ventures/infrastructure/ceo" element={<InfraCEO />} />
            <Route path="/ventures/infrastructure/leadership" element={<InfraLeadership />} />
            <Route path="/ventures/infrastructure/*" element={<InfraOverview />} />
            <Route path="/ventures/construction/*" element={<InfraOverview />} />
            <Route path="/businesses/infrastructure" element={<InfraOverview />} />
            <Route path="/businesses/infrastructure/*" element={<InfraOverview />} />
            <Route path="/businesses/construction" element={<InfraOverview />} />
            <Route path="/businesses/construction/*" element={<InfraOverview />} />

            {/* 3. HEALTHCARE DEDICATED ROUTES */}
            <Route path="/ventures/healthcare" element={<HealthcareOverview />} />
            <Route path="/ventures/healthcare/current-projects" element={<Navigate to="/ventures/healthcare" replace />} />
            <Route path="/ventures/healthcare/upcoming-projects" element={<Navigate to="/ventures/healthcare" replace />} />
            <Route path="/ventures/healthcare/mission-values" element={<HealthcareMissionValues />} />
            <Route path="/ventures/healthcare/founder" element={<HealthcareFounder />} />
            <Route path="/ventures/healthcare/ceo" element={<HealthcareCEO />} />
            <Route path="/ventures/healthcare/leadership" element={<HealthcareLeadership />} />
            <Route path="/ventures/healthcare/*" element={<HealthcareOverview />} />
            <Route path="/businesses/healthcare" element={<HealthcareOverview />} />
            <Route path="/businesses/healthcare/*" element={<HealthcareOverview />} />

            {/* 4. TECHNOLOGY DEDICATED ROUTES */}
            <Route path="/ventures/technology" element={<TechOverview />} />
            <Route path="/ventures/technology/current-projects" element={<Navigate to="/ventures/technology" replace />} />
            <Route path="/ventures/technology/upcoming-projects" element={<Navigate to="/ventures/technology" replace />} />
            <Route path="/ventures/technology/mission-values" element={<TechMissionValues />} />
            <Route path="/ventures/technology/founder" element={<TechFounder />} />
            <Route path="/ventures/technology/ceo" element={<TechCEO />} />
            <Route path="/ventures/technology/leadership" element={<TechLeadership />} />
            <Route path="/ventures/technology/*" element={<TechOverview />} />
            <Route path="/businesses/technology" element={<TechOverview />} />
            <Route path="/businesses/technology/*" element={<TechOverview />} />

            {/* 5. AGRICULTURE DEDICATED ROUTES */}
            <Route path="/ventures/agriculture" element={<AgriOverview />} />
            <Route path="/ventures/agriculture/current-projects" element={<Navigate to="/ventures/agriculture" replace />} />
            <Route path="/ventures/agriculture/upcoming-projects" element={<Navigate to="/ventures/agriculture" replace />} />
            <Route path="/ventures/agriculture/mission-values" element={<AgriMissionValues />} />
            <Route path="/ventures/agriculture/founder" element={<AgriFounder />} />
            <Route path="/ventures/agriculture/ceo" element={<AgriCEO />} />
            <Route path="/ventures/agriculture/leadership" element={<AgriLeadership />} />
            <Route path="/ventures/agriculture/*" element={<AgriOverview />} />
            <Route path="/ventures/soil" element={<AgriOverview />} />
            <Route path="/ventures/soil/*" element={<AgriOverview />} />
            <Route path="/businesses/agriculture" element={<AgriOverview />} />
            <Route path="/businesses/agriculture/*" element={<AgriOverview />} />
            <Route path="/businesses/soil" element={<AgriOverview />} />
            <Route path="/businesses/soil/*" element={<AgriOverview />} />

            {/* 6. REAL ESTATE DEDICATED ROUTES */}
            <Route path="/ventures/real-estate" element={<RealEstateOverview />} />
            <Route path="/ventures/real-estate/current-projects" element={<Navigate to="/ventures/real-estate" replace />} />
            <Route path="/ventures/real-estate/upcoming-projects" element={<Navigate to="/ventures/real-estate" replace />} />
            <Route path="/ventures/real-estate/mission-values" element={<RealEstateMissionValues />} />
            <Route path="/ventures/real-estate/founder" element={<RealEstateFounder />} />
            <Route path="/ventures/real-estate/ceo" element={<RealEstateCEO />} />
            <Route path="/ventures/real-estate/leadership" element={<RealEstateLeadership />} />
            <Route path="/ventures/real-estate/*" element={<RealEstateOverview />} />
            <Route path="/ventures/realestate" element={<RealEstateOverview />} />
            <Route path="/ventures/realestate/*" element={<RealEstateOverview />} />
            <Route path="/businesses/real-estate" element={<RealEstateOverview />} />
            <Route path="/businesses/real-estate/*" element={<RealEstateOverview />} />
            <Route path="/businesses/realestate" element={<RealEstateOverview />} />
            <Route path="/businesses/realestate/*" element={<RealEstateOverview />} />

            {/* 7. INVESTMENTS DEDICATED ROUTES */}
            <Route path="/ventures/investments" element={<InvestmentsOverview />} />
            <Route path="/ventures/investments/current-projects" element={<Navigate to="/ventures/investments" replace />} />
            <Route path="/ventures/investments/upcoming-projects" element={<Navigate to="/ventures/investments" replace />} />
            <Route path="/ventures/investments/mission-values" element={<InvestmentsMissionValues />} />
            <Route path="/ventures/investments/founder" element={<InvestmentsFounder />} />
            <Route path="/ventures/investments/ceo" element={<InvestmentsCEO />} />
            <Route path="/ventures/investments/leadership" element={<InvestmentsLeadership />} />
            <Route path="/ventures/investments/*" element={<InvestmentsOverview />} />
            <Route path="/businesses/investments" element={<InvestmentsOverview />} />
            <Route path="/businesses/investments/*" element={<InvestmentsOverview />} />

            {/* Common Navigation Aliases */}
            <Route path="/about/structure" element={<Navigate to="/about/group-structure" replace />} />
            <Route path="/about/governance" element={<Navigate to="/about/corporate-governance" replace />} />
            <Route path="/about/journey" element={<Navigate to="/about/strategic-journey" replace />} />

            {/* 404 Catch-All */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AdminAuthProvider>
  </TooltipProvider>
</QueryClientProvider>
);

export default App;
