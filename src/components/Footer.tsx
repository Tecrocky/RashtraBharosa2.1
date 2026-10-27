import React from "react";
import { Link } from "react-router-dom";
import { Mail, MapPin, Navigation, Facebook, Twitter, Linkedin, Instagram, Lock } from "lucide-react";
import whiteLogo from "@/assets/white logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-[#0a1e3f] via-[#071630] to-[#040d1e] text-white border-t border-[#1a3660] selection:bg-brand-gold selection:text-[#040d1e]">

      {/* Main Footer Directory */}
      <div className="max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-12 py-14 lg:py-18">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Column 1: Brand & Headquarters (Span 3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <Link to="/" className="inline-block">
              <img 
                src={whiteLogo} 
                alt="Rashtra Bharosa Group" 
                className="h-12 sm:h-14 w-auto object-contain brightness-110 drop-shadow-md" 
              />
            </Link>
            <p className="text-slate-300/80 text-xs leading-relaxed font-normal">
              A diversified Indian industrial conglomerate committed to sovereign nation-building, sustainable growth, and global governance standards.
            </p>
            
            <div className="space-y-2.5 pt-2 border-t border-white/10 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin size={15} className="mt-0.5 text-brand-gold shrink-0" />
                <a
                  href="https://share.google/LwEEL8HUP8M3W4DaV"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="leading-relaxed hover:text-brand-gold transition-colors block text-slate-300"
                  title="View Location on Google Maps"
                >
                  <strong className="text-slate-100 block font-semibold text-[11px] uppercase tracking-wider">Corporate Headquarters</strong>
                  B1/1-6, Bhimpur, Forest Park, Bhubaneswar, Odisha — 751009, India
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={15} className="text-brand-gold shrink-0" />
                <a href="mailto:info@rashtrabharosagroup.com" className="hover:text-brand-gold transition-colors text-slate-200 font-medium">
                  info@rashtrabharosagroup.com
                </a>
              </div>
            </div>

            {/* Official Social Media */}
            <div className="flex items-center gap-2.5 pt-1">
              <a
                href="https://www.linkedin.com/company/rashtrabharosa"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-brand-gold hover:text-[#040d1e] border border-white/15 flex items-center justify-center text-slate-200 transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin size={14} />
              </a>
              <a
                href="https://x.com/rashtrabharosa"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-brand-gold hover:text-[#040d1e] border border-white/15 flex items-center justify-center text-slate-200 transition-all"
                aria-label="Twitter / X"
              >
                <Twitter size={14} />
              </a>
              <a
                href="https://www.facebook.com/rashtrabharosa"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-brand-gold hover:text-[#040d1e] border border-white/15 flex items-center justify-center text-slate-200 transition-all"
                aria-label="Facebook"
              >
                <Facebook size={14} />
              </a>
              <a
                href="https://www.instagram.com/rashtrabharosa"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-brand-gold hover:text-[#040d1e] border border-white/15 flex items-center justify-center text-slate-200 transition-all"
                aria-label="Instagram"
              >
                <Instagram size={14} />
              </a>
            </div>
          </div>

          {/* Column 2: Corporate (Span 2 cols) */}
          <div className="lg:col-span-2 space-y-3.5">
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-[2px] bg-brand-gold"></span>
              <h4 className="font-bold text-xs text-brand-gold uppercase tracking-[0.2em]">
                Corporate
              </h4>
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/about" className="text-slate-300 hover:text-brand-gold transition-colors block">
                  Group Overview
                </Link>
              </li>
              <li>
                <Link to="/about/group-structure" className="text-slate-300 hover:text-brand-gold transition-colors block">
                  Group Structure
                </Link>
              </li>
              <li>
                <Link to="/about/corporate-governance" className="text-slate-300 hover:text-brand-gold transition-colors block">
                  Corporate Governance
                </Link>
              </li>
              <li>
                <Link to="/about/strategic-journey" className="text-slate-300 hover:text-brand-gold transition-colors block">
                  Strategic Journey
                </Link>
              </li>
              <li>
                <Link to="/about/founder" className="text-slate-300 hover:text-brand-gold transition-colors block">
                  Office of the Founder
                </Link>
              </li>
              <li>
                <Link to="/about/chairman" className="text-slate-300 hover:text-brand-gold transition-colors block">
                  Office of the Chairman
                </Link>
              </li>
              <li>
                <Link to="/about/ceo" className="text-slate-300 hover:text-brand-gold transition-colors block">
                  Office of the Group CEO
                </Link>
              </li>
              <li>
                <Link to="/about/leadership" className="text-slate-300 hover:text-brand-gold transition-colors block">
                  Leadership Directory
                </Link>
              </li>
              <li>
                <Link to="/her-legacy" className="text-slate-300 hover:text-brand-gold transition-colors block">
                  Her Legacy — Dr. Vedanshii
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Businesses & Projects (Span 2 cols) */}
          <div className="lg:col-span-2 space-y-3.5">
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-[2px] bg-brand-gold"></span>
              <h4 className="font-bold text-xs text-brand-gold uppercase tracking-[0.2em]">
                Businesses
              </h4>
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/ventures/mining" className="text-slate-300 hover:text-brand-gold transition-colors block">
                  RashBhar Mining
                </Link>
              </li>
              <li>
                <Link to="/ventures/infrastructure" className="text-slate-300 hover:text-brand-gold transition-colors block">
                  Innovex Construction
                </Link>
              </li>
              <li>
                <Link to="/ventures/real-estate" className="text-slate-300 hover:text-brand-gold transition-colors block">
                  RashBhar Real Estate
                </Link>
              </li>
              <li>
                <Link to="/ventures/agriculture" className="text-slate-300 hover:text-brand-gold transition-colors block">
                  RashBhar Soil & Soul
                </Link>
              </li>
              <li>
                <Link to="/ventures/technology" className="text-slate-300 hover:text-brand-gold transition-colors block">
                  RashBhar Technology
                </Link>
              </li>
              <li>
                <Link to="/ventures/healthcare" className="text-slate-300 hover:text-brand-gold transition-colors block">
                  RashBhar Health Care
                </Link>
              </li>
              <li>
                <Link to="/ventures/investments" className="text-slate-300 hover:text-brand-gold transition-colors block">
                  Royal Birds Group
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-brand-gold font-semibold hover:underline block uppercase tracking-wider text-[11px] pt-0.5">
                  Flagship Projects →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Sovereign R&D & Hubs (Span 2 cols) */}
          <div className="lg:col-span-2 space-y-3.5">
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-[2px] bg-brand-gold"></span>
              <h4 className="font-bold text-xs text-brand-gold uppercase tracking-[0.2em]">
                Sovereign R&D
              </h4>
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/innovation" className="text-brand-gold font-semibold hover:underline block uppercase tracking-wider text-[11px]">
                  R&D Master Portal →
                </Link>
              </li>
              <li>
                <Link to="/rd/rashtrai" className="text-slate-300 hover:text-brand-gold transition-colors block">
                  RashtrAI (AI Workforce)
                </Link>
              </li>
              <li>
                <Link to="/rd/ved-ri" className="text-slate-300 hover:text-brand-gold transition-colors block">
                  VED Ri (Robotics R&D)
                </Link>
              </li>
              <li>
                <Link to="/rd/agrigel" className="text-slate-300 hover:text-brand-gold transition-colors block">
                  AgriGel™ (Soil Tech)
                </Link>
              </li>
              <li>
                <Link to="/partners" className="text-slate-300 hover:text-brand-gold transition-colors block">
                  Strategic Alliances
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-slate-300 hover:text-brand-gold transition-colors block">
                  Projects Portfolio
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-300 hover:text-brand-gold transition-colors block">
                  Contact Directorate
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Corporate Headquarters Map (Span 3 cols) */}
          <div className="lg:col-span-3 space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-[2px] bg-brand-gold"></span>
                <h4 className="font-bold text-xs text-brand-gold uppercase tracking-[0.2em]">
                  Corporate Headquarters
                </h4>
              </div>
            </div>

            {/* Embedded Live Google Maps Box with Overlay Pill */}
            <div className="w-full h-48 sm:h-52 rounded-xl overflow-hidden border border-white/20 shadow-lg relative bg-[#040d1e] group">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3743.1251813220047!2d85.8201268746852!3d20.253642481208775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2becf341c5a677cb%3A0x516710bdd30d7001!2sRashtra%20Bharosa%20Group%20Limited!5e0!3m2!1sen!2sus!4v1790523404729!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title="Rashtra Bharosa Group Corporate Headquarters Map"
                className="w-full h-full grayscale-[15%] contrast-110 group-hover:grayscale-0 transition-all duration-300"
              ></iframe>

              {/* Liquid Glass Overlay Pill */}
              <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-[#020b1c]/85 backdrop-blur-md p-2.5 rounded-lg border border-white/15 flex items-center justify-between gap-2 shadow-md">
                <div className="text-[10.5px] leading-tight text-slate-200 truncate">
                  <span className="font-semibold text-white block truncate">Forest Park, Bhubaneswar</span>
                  <span className="text-slate-400 font-mono text-[9.5px]">20.2536° N, 85.8201° E</span>
                </div>
                <a
                  href="https://maps.google.com/?q=20.253642,85.820127"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded bg-brand-gold hover:bg-brand-richgold text-[#041633] font-bold text-[10px] uppercase tracking-wider shrink-0 transition-colors inline-flex items-center gap-1 shadow-sm"
                >
                  <Navigation size={10} />
                  <span>Directions</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal Bar */}
        <div className="border-t border-white/10 mt-12 pt-7 flex flex-col xl:flex-row items-center justify-between gap-4 text-[11.5px] text-slate-300/80">
          <p className="whitespace-nowrap shrink-0">© {currentYear} Rashtra Bharosa Group. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center xl:justify-end gap-x-3.5 gap-y-2 text-[11px] text-slate-300/85">
            <Link to="/legal/privacy" className="hover:text-brand-gold transition-colors whitespace-nowrap">
              Privacy Policy
            </Link>
            <span className="text-white/20 select-none hidden sm:inline">•</span>
            <Link to="/legal/terms" className="hover:text-brand-gold transition-colors whitespace-nowrap">
              Terms & Conditions
            </Link>
            <span className="text-white/20 select-none hidden sm:inline">•</span>
            <Link to="/legal/policy" className="hover:text-brand-gold transition-colors whitespace-nowrap">
              Company Policy
            </Link>
            <span className="text-white/20 select-none hidden sm:inline">•</span>
            <Link to="/legal/procurement-flow" className="hover:text-brand-gold transition-colors whitespace-nowrap">
              Procurement Flow
            </Link>
            <span className="text-white/20 select-none hidden sm:inline">•</span>
            <Link to="/legal/disclaimer" className="hover:text-brand-gold transition-colors whitespace-nowrap">
              Policy Disclaimer
            </Link>
            <span className="text-white/20 select-none hidden sm:inline">•</span>
            <Link to="/legal/whistleblower" className="hover:text-brand-gold transition-colors whitespace-nowrap">
              Whistleblower Policy
            </Link>
            <span className="text-white/20 select-none hidden sm:inline">•</span>
            <Link to="/sitemap" className="hover:text-brand-gold transition-colors whitespace-nowrap">
              Sitemap
            </Link>
            <span className="text-white/20 select-none hidden sm:inline">•</span>
            <Link
              to="/admin/login"
              className="hover:text-brand-gold text-slate-400/90 transition-colors inline-flex items-center gap-1 font-medium hover:text-white whitespace-nowrap"
              title="Executive Directorate Gateway"
            >
              <Lock size={10.5} className="text-brand-gold shrink-0" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

