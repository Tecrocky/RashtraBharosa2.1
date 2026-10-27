import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import miningLogo from '@/assets/Subsidiary-logos/mining-logo.png';
import innovexLogo from '@/assets/Subsidiary-logos/Innovex.png';
import healthcareLogo from '@/assets/Subsidiary-logos/healthcare-logo.png';
import techLogo from '@/assets/Subsidiary-logos/technology-logo.png';
import soilLogo from '@/assets/Subsidiary-logos/soil-logo.png';
import realestateLogo from '@/assets/Subsidiary-logos/realestate-logo.png';
import royalbirdsLogo from '@/assets/Subsidiary-logos/RoyalBirds.png';

export const subsidiaries = [
  {
    name: "RashBhar Mining",
    logo: miningLogo,
    path: "/ventures/mining",
  },
  {
    name: "Innovex Construction",
    logo: innovexLogo,
    path: "/ventures/infrastructure",
  },
  {
    name: "RashBhar Health Care",
    logo: healthcareLogo,
    path: "/ventures/healthcare",
  },
  {
    name: "RashBhar Technology",
    logo: techLogo,
    path: "/ventures/technology",
  },
  {
    name: "RashBhar Soil & Soul",
    logo: soilLogo,
    path: "/ventures/agriculture",
  },
  {
    name: "RashBhar Real Estate",
    logo: realestateLogo,
    path: "/ventures/real-estate",
  },
  {
    name: "Royal Birds Group",
    logo: royalbirdsLogo,
    path: "/ventures/investments",
  },
];

const SubsidiariesMarquee: React.FC = () => {
  // Duplicate array 4 times for seamless infinite continuous scroll
  const marqueeSubsidiaries = [
    ...subsidiaries,
    ...subsidiaries,
    ...subsidiaries,
    ...subsidiaries,
  ];

  return (
    <div className="w-full bg-white py-7 border-y border-slate-200 overflow-hidden relative">
      {/* Left and Right Edge Fade Masks */}
      <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

      {/* Infinite Animated Marquee Track with ONLY Logos */}
      <motion.div
        className="flex gap-8 sm:gap-12 items-center whitespace-nowrap w-max"
        animate={{
          x: ["0%", "-25%"],
        }}
        transition={{
          ease: "linear",
          duration: 25,
          repeat: Infinity,
        }}
        whileHover={{ animationPlayState: "paused" }}
      >
        {marqueeSubsidiaries.map((sub, index) => (
          <Link
            key={`subsidiary-logo-${index}`}
            to={sub.path}
            className="flex items-center justify-center min-w-[150px] sm:min-w-[180px] h-20 sm:h-24 px-6 py-3 rounded-xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-300 transform hover:scale-105"
            title={sub.name}
          >
            <img
              src={sub.logo}
              alt={sub.name}
              className="max-h-12 sm:max-h-14 max-w-full object-contain pointer-events-none select-none drop-shadow-xs"
              loading="lazy"
            />
          </Link>
        ))}
      </motion.div>
    </div>
  );
};

export default SubsidiariesMarquee;
