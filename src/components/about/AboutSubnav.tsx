import React from "react";
import { Link, useLocation } from "react-router-dom";

const aboutNavItems = [
  { name: "Group Overview", path: "/about" },
  { name: "Group Structure", path: "/about/group-structure" },
  { name: "Corporate Governance", path: "/about/corporate-governance" },
  { name: "Strategic Journey", path: "/about/strategic-journey" },
  { name: "Founder", path: "/about/founder" },
  { name: "Chairman", path: "/about/chairman" },
  { name: "Group CEO", path: "/about/ceo" },
  { name: "Leadership", path: "/about/leadership" },
];

const AboutSubnav: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="sticky top-[60px] md:top-[66px] z-40 bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-xs">
      <div className="max-w-[1500px] w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-start lg:justify-between gap-1 h-14 overflow-x-auto no-scrollbar">
          {aboutNavItems.map((item) => {
            const isActive =
              item.path === "/about"
                ? location.pathname === "/about" || location.pathname === "/about/" || location.pathname === "/about/profile" || location.pathname === "/about/corporate-profile"
                : location.pathname === item.path || location.pathname.startsWith(`${item.path}/`);

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`relative flex items-center h-full px-2.5 sm:px-3 text-[11px] sm:text-[11.5px] lg:text-xs font-bold uppercase tracking-[0.12em] transition-all whitespace-nowrap shrink-0 ${
                  isActive
                    ? "text-[#062B63]"
                    : "text-slate-500 hover:text-[#062B63]"
                }`}
              >
                {item.name}
                {isActive && (
                  <span className="absolute bottom-0 left-2 right-2 h-[2.5px] bg-[#062B63] rounded-t-sm" />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default AboutSubnav;

