import React, { useEffect, useRef } from "react";
import { useInView, useMotionValue, useTransform, motion, animate } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  suffix = "",
  prefix = "",
  duration = 2,
  className = "",
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => {
    return Math.floor(latest).toLocaleString("en-IN");
  });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, {
        duration,
        ease: [0.16, 1, 0.3, 1], // premium cubic-bezier easeOut
      });
      return controls.stop;
    }
  }, [isInView, value, count, duration]);

  return (
    <span ref={ref} className={`inline-flex items-baseline ${className}`}>
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
};

export default AnimatedCounter;
