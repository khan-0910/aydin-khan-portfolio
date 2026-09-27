"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import SectionHeading from "@/components/ui/SectionHeading";
import TechnicalLabel from "@/components/ui/TechnicalLabel";

const EASE = [0.16, 1, 0.3, 1] as const;

type Tool = {
  name: string;
  domain: string;
  level: string;
  levelNote: string;
  /** segments filled out of 18 — honest mapping: basic ≈ 7, intermediate ≈ 12 */
  segments: number;
};

const TOOLS: Tool[] = [
  {
    name: "PYTHON",
    domain: "PROGRAMMING / PROTOTYPING",
    level: "INTERMEDIATE",
    levelNote: "SCRIPTS, PROJECT LOGIC, TOOLING",
    segments: 12,
  },
  {
    name: "SOLIDWORKS",
    domain: "CAD / MECHANICAL DESIGN",
    level: "BASIC",
    levelNote: "PART & ASSEMBLY MODELLING",
    segments: 7,
  },
  {
    name: "JAVA",
    domain: "PROGRAMMING",
    level: "BASIC",
    levelNote: "STRUCTURED PROBLEM SOLVING",
    segments: 7,
  },
];

const TOTAL = 18;

/**
 * Diagnostic gauge. Idle = static stamped instrument.
 * On card hover: a read pulse ripples left→right through the filled segments
 * (like a multimeter probing each cell) and the empty slots light their borders.
 * All colors come from theme tokens so the gauge reads correctly on any surface.
 */
function DiagnosticBar({
  segments,
  index,
  probing,
}: {
  segments: number;
  index: number;
  probing: boolean;
}) {
  const barRef = useRef<HTMLDivElement>(null);
  // single source of truth for the reveal — whileInView would sit at higher
  // animation priority than animate forever, blocking the hover probe
  const inView = useInView(barRef, { once: true, margin: "-40px" });

  return (
    <div className="mt-5" aria-label={`Proficiency: ${segments} of ${TOTAL}`} ref={barRef}>
      <div className="flex gap-[3px]" role="presentation">
        {Array.from({ length: TOTAL }).map((_, i) => {
          const filled = i < segments;
          const accent = i % 4 === 3;
          return (
            <motion.span
              key={i}
              className="h-3 flex-1"
              style={{
                background: filled
                  ? accent
                    ? "var(--color-amber)"
                    : "var(--color-navy)"
                  : "transparent",
                boxShadow: "inset 0 0 0 1px rgba(34,50,42,0.4)",
              }}
              initial={{ opacity: 0, scaleY: 0.3 }}
              animate={
                !inView
                  ? { opacity: 0, scaleY: 0.3 }
                  : probing
                    ? filled
                      ? { scaleY: [1, 0.45, 1], opacity: [1, 0.55, 1] }
                      : { boxShadow: "inset 0 0 0 1px rgba(34,50,42,0.75)" }
                    : { scaleY: 1, opacity: 1 }
              }
              // probe ripple: each cell flinches in sequence, left → right
              transition={
                probing
                  ? { delay: i * 0.035, duration: 0.4, ease: EASE }
                  : {
                      delay: inView ? 0.3 + index * 0.12 + i * 0.025 : 0,
                      duration: 0.25,
                      ease: EASE,
                    }
              }
            />
          );
        })}
      </div>
      {/* tick marks under the bar */}
      <div className="mt-1 flex justify-between font-mono text-[8px] text-paper-faint">
        <span>0</span>
        <span>05</span>
        <span>10</span>
        <span>15</span>
      </div>
    </div>
  );
}

function ToolCard({ tool, index }: { tool: Tool; index: number }) {
  const [probing, setProbing] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.08, duration: 0.7, ease: EASE }}
      whileHover={{ y: -6 }}
      onMouseEnter={() => setProbing(true)}
      onMouseLeave={() => setProbing(false)}
      className="group relative flex flex-col border border-line bg-panel/70 p-6 transition-colors duration-300 hover:border-line-2"
      data-cursor="INSPECT"
    >
      <div className="flex items-start justify-between">
        <TechnicalLabel>{tool.domain}</TechnicalLabel>
        <span aria-hidden className="font-mono text-[10px] text-paper-faint">
          UNIT {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <h3 className="mt-5 font-display text-2xl font-bold tracking-tight text-paper">
        {tool.name}
      </h3>

      <DiagnosticBar segments={tool.segments} index={index} probing={probing} />

      <div className="mt-5 border-t border-line pt-4">
        <div className="flex items-baseline justify-between">
          <span className="font-mono text-[11px] tracking-[0.2em] text-amber">{tool.level}</span>
          <span
            aria-hidden
            className="font-mono text-[9px] tabular-nums text-paper-faint transition-colors duration-300 group-hover:text-paper-dim"
          >
            {tool.segments}/{TOTAL} SEG
          </span>
        </div>
        <p className="mt-1.5 text-[11px] leading-relaxed text-paper-faint">{tool.levelNote}</p>
      </div>

      {/* hover: the bench light comes on */}
      <span
        aria-hidden
        className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-amber transition-transform duration-500 ease-out group-hover:scale-x-100"
      />
    </motion.article>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative pb-20 pt-28 sm:pb-24 sm:pt-36" aria-label="Skills and tools">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <SectionHeading index="04" label="THE TOOLBOX" title="Tools on the bench." />

        <div className="mt-16 grid gap-8 md:grid-cols-3 md:gap-10">
          {TOOLS.map((tool, i) => (
            <ToolCard key={tool.name} tool={tool} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
