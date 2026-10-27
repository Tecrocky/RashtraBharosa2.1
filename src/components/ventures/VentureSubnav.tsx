import React from "react";
import { Link, useLocation } from "react-router-dom";

import logoBlack from "@/assets/logo-black.png";

export interface NavItem {
  path: string;
  label: string;
}

interface VentureSubnavProps {
  basePath: string;
  companyName?: string;
  logo?: string;
  items?: { suffix: string; label: string }[];
}

const defaultSuffixes = [
  { suffix: "", label: "Overview" },
  { suffix: "/leadership", label: "Leadership" },
];

const VentureSubnav: React.FC<VentureSubnavProps> = ({
  basePath,
  items = defaultSuffixes,
}) => {
  const location = useLocation();

  return (
    <nav className="sticky top-[72px] z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-[1500px] w-full mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between gap-6 h-16 overflow-x-auto no-scrollbar">
          {/* Institutional Brand Identity: RBG Black Logo + Corporate Tag */}
          <Link to="/" className="flex items-center gap-3 shrink-0 group hover:opacity-90 transition-opacity" title="Rashtra Bharosa Group">
            <img
              src={logoBlack}
              alt="Rashtra Bharosa Group"
              className="h-8 sm:h-9 max-w-[160px] sm:max-w-[180px] object-contain"
            />
            <div className="h-5 w-[1px] bg-slate-300 hidden sm:block"></div>
            <span className="text-[11px] sm:text-xs font-bold text-slate-700 uppercase tracking-wider whitespace-nowrap">
              A Rashtra Bharosa Group Company
            </span>
          </Link>

          {/* Navigation Underline Tab Links (Corporate Style) */}
          <div className="flex items-center gap-1 sm:gap-2 h-full overflow-x-auto no-scrollbar shrink-0 touch-pan-x">
            {items.map((item) => {
              const fullPath = `${basePath}${item.suffix}`;
              const isActive =
                item.suffix === ""
                  ? location.pathname === basePath || location.pathname === `${basePath}/`
                  : location.pathname === fullPath || location.pathname.startsWith(`${fullPath}/`);

              return (
                <Link
                  key={item.suffix}
                  to={fullPath}
                  className={`relative flex items-center h-full px-4 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                    isActive
                      ? "text-[#062B63]"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#062B63] rounded-t-sm" />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default VentureSubnav;
