"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type BounceInProps = {
  children: ReactNode;
  className?: string;
  /** seconds — stagger siblings by passing increasing delays */
  delay?: number;
  /** px travel distance on entry */
  y?: number;
  /** initial scale (0.6 = snappy chip, 0.96 = large block settling) */
  from?: number;
};

/**
 * Spring-bounce scroll entrance. The overshoot is the point: parts arrive,
 * overshoot slightly, and seat — like a component snapping into its mount.
 * Reusable across sections; pass `delay` to choreograph a cascade.
 */
export default function BounceIn({
  children,
  className,
  delay = 0,
  y = 36,
  from = 0.92,
}: BounceInProps) {
  const reduced = useReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, scale: from }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        type: "spring",
        stiffness: 340,
        damping: 16,
        mass: 0.9,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
