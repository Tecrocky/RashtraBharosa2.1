import React from 'react';
import { motion } from 'framer-motion';

import adaniLogo from '@/assets/ventures/Adani.png';
import apolloLogo from '@/assets/ventures/ApolloHospitalsGroup.png';
import ltLogo from '@/assets/ventures/ltgroup.png';
import imiLogo from '@/assets/ventures/imi.png';
import mahindraLogo from '@/assets/ventures/MahindraGroup.png';
import nabardLogo from '@/assets/ventures/NABARD.png';
import omfedLogo from '@/assets/ventures/omfed.png';
import ongcLogo from '@/assets/ventures/ONGC.png';
import rblLogo from '@/assets/ventures/rbl.png';
import adityaLogo from '@/assets/ventures/Strategic partnership/aditya-logo.png';
import vanshikaLogo from '@/assets/ventures/Strategic partnership/VANSHIKA CORP..png';
import veraLogo from '@/assets/ventures/Strategic partnership/vera.png';
import rajputLogo from '@/assets/ventures/Strategic partnership/rajput group.png';
import saeshaLogo from '@/assets/ventures/Where we invested/saesha.png';

const partners = [
  { name: "AR Group", logo: adityaLogo },
  { name: "Vera Group", logo: veraLogo },
  { name: "Rajput Group", logo: rajputLogo },
  { name: "Vanshika Corp", logo: vanshikaLogo },
  { name: "Saesha Enterprises", logo: saeshaLogo },
  { name: "Adani", logo: adaniLogo },
  { name: "Apollo Hospitals", logo: apolloLogo },
  { name: "L&T", logo: ltLogo },
  { name: "IMI", logo: imiLogo },
  { name: "Mahindra", logo: mahindraLogo },
  { name: "NABARD", logo: nabardLogo },
  { name: "Omfed", logo: omfedLogo },
  { name: "ONGC", logo: ongcLogo },
  { name: "RBL Bank", logo: rblLogo },
];

const PartnersMarquee: React.FC = () => {
  // Duplicate array 3 times for a seamless infinite scroll experience
  const marqueePartners = [...partners, ...partners, ...partners];

  return (
    <div className="w-full overflow-hidden py-6 relative">
      {/* Left and Right Fade Masks for Liquid Glass Depth */}
      <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-36 bg-gradient-to-r from-[#F8FAFC] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-36 bg-gradient-to-l from-[#F8FAFC] to-transparent z-10 pointer-events-none" />

      {/* Infinite Animated Marquee Track */}
      <motion.div
        className="flex gap-10 sm:gap-14 items-center whitespace-nowrap w-max"
        animate={{
          x: ["0%", "-33.333%"],
        }}
        transition={{
          ease: "linear",
          duration: 25,
          repeat: Infinity,
        }}
        whileHover={{ animationPlayState: "paused" }}
      >
        {marqueePartners.map((partner, index) => (
          <div
            key={`partner-${index}`}
            className="flex items-center justify-center min-w-[130px] sm:min-w-[160px] h-16 sm:h-20 px-5 py-3 rounded-lg bg-white/90 border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-300 transform hover:scale-105"
          >
            <img
              className="max-h-9 sm:max-h-11 w-auto object-contain pointer-events-none select-none drop-shadow-xs"
              src={partner.logo}
              alt={partner.name}
              loading="lazy"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default PartnersMarquee;
