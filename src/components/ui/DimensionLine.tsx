"use client";

import { motion } from "motion/react";

type DimensionLineProps = {
  label?: string;
  className?: string;
  vertical?: boolean;
};

export default function DimensionLine({ label, className = "", vertical = false }: DimensionLineProps) {
  return (
    <div
      className={`flex items-center gap-3 font-mono text-[10px] tracking-[0.25em] text-paper-faint ${
        vertical ? "flex-col" : ""
      } ${className}`}
    >
      <span className="relative block flex-1 overflow-hidden" style={vertical ? { width: 1, minHeight: 40 } : { height: 1 }}>
        <motion.span
          className={`absolute ${vertical ? "left-0 top-0 h-full w-px" : "left-0 top-0 h-px w-full"} bg-line-2`}
          initial={{ scaleX: vertical ? 1 : 0, scaleY: vertical ? 0 : 1 }}
          whileInView={{ scaleX: 1, scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          style={vertical ? { transformOrigin: "top" } : { transformOrigin: "left" }}
        />
      </span>
      {label && <span className="whitespace-nowrap">{label}</span>}
      <span aria-hidden className={`bg-line-2 ${vertical ? "h-2 w-px" : "h-px w-2"}`} />
    </div>
  );
}
