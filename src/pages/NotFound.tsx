import React, { useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Home, Compass, ShieldAlert, FileText, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import MetaTags from "@/components/MetaTags";

const NotFound: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.warn("404 Route Requested:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[#020b1c] text-white flex items-center justify-center px-4 py-24 relative overflow-hidden">
      <MetaTags
        title="404 — Page Not Found | Rashtra Bharosa Group"
        description="The requested corporate dossier or page could not be located on the Rashtra Bharosa Group network."
      />

      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-gold/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-2xl w-full text-center space-y-8 bg-white/[0.03] border border-white/10 rounded-2xl p-8 sm:p-12 backdrop-blur-xl shadow-2xl">
        {/* Top Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/25 text-brand-gold text-xs font-bold uppercase tracking-[0.2em]">
          <ShieldAlert size={14} />
          <span>Error 404 — Document Not Located</span>
        </div>

        {/* Big 404 Graphic */}
        <div className="space-y-2">
          <h1 className="text-7xl sm:text-9xl font-extralight tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-500 font-sans">
            404
          </h1>
          <h2 className="text-2xl sm:text-3xl font-light text-white tracking-tight">
            The page you requested is not available.
          </h2>
        </div>

        {/* Path Info & Description */}
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-lg mx-auto">
          The path <code className="px-2 py-0.5 rounded bg-white/10 text-brand-gold font-mono text-xs">{location.pathname}</code> may have been archived, reorganized into a new division, or moved during our platform upgrade.
        </p>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="border-white/20 bg-white/5 hover:bg-white/10 text-white font-semibold text-xs uppercase tracking-wider px-5 py-2.5 h-auto rounded-lg transition-all"
          >
            <ArrowLeft size={14} className="mr-2" />
            Go Back
          </Button>

          <Link to="/">
            <Button className="bg-brand-gold hover:bg-[#c99516] text-[#020b1c] font-bold text-xs uppercase tracking-wider px-6 py-2.5 h-auto rounded-lg shadow-lg shadow-brand-gold/20 transition-all">
              <Home size={14} className="mr-2" />
              Corporate Home
            </Button>
          </Link>

          <Link to="/businesses">
            <Button
              variant="outline"
              className="border-white/20 bg-white/5 hover:bg-white/10 text-slate-200 font-semibold text-xs uppercase tracking-wider px-5 py-2.5 h-auto rounded-lg transition-all"
            >
              <Compass size={14} className="mr-2" />
              All Ventures
            </Button>
          </Link>
        </div>

        {/* Useful Quick Links */}
        <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
          <Link to="/about" className="hover:text-brand-gold transition-colors flex items-center gap-1.5">
            <FileText size={12} />
            About Group
          </Link>
          <Link to="/tenders" className="hover:text-brand-gold transition-colors flex items-center gap-1.5">
            <FileText size={12} />
            Tenders & Procurement
          </Link>
          <Link to="/contact" className="hover:text-brand-gold transition-colors flex items-center gap-1.5">
            <Mail size={12} />
            Contact Corporate Secretariat
          </Link>
          <Link to="/sitemap" className="hover:text-brand-gold transition-colors flex items-center gap-1.5">
            <Compass size={12} />
            Full Sitemap
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
