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
    name: "Python",
    domain: "Programming & prototyping",
    level: "Intermediate",
    levelNote: "Scripts, project logic, tooling",
    segments: 12,
  },
  {
    name: "SolidWorks",
    domain: "CAD & mechanical design",
    level: "Basic",
    levelNote: "Part & assembly modelling",
    segments: 7,
  },
  {
    name: "Java",
    domain: "Programming",
    level: "Basic",
    levelNote: "Structured problem solving",
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
              className="h-2.5 flex-1 rounded-full"
              style={{
                background: filled
                  ? accent
                    ? "var(--color-amber)"
                    : "var(--color-cobalt)"
                  : "transparent",
                boxShadow: "inset 0 0 0 1px rgba(43,33,64,0.18)",
              }}
              initial={{ opacity: 0, scaleY: 0.3 }}
              animate={
                !inView
                  ? { opacity: 0, scaleY: 0.3 }
                  : probing
                    ? filled
                      ? { scaleY: [1, 0.45, 1], opacity: [1, 0.55, 1] }
                      : { boxShadow: "inset 0 0 0 1px rgba(43,33,64,0.75)" }
                    : { scaleY: 1, opacity: 1 }
              }
              // probe ripple: each cell flinches in sequence, left to right
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
    </div>
  );
}

function ToolCard({ tool, index }: { tool: Tool; index: number }) {
  const [probing, setProbing] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.06, duration: 0.5, ease: EASE }}
      onMouseEnter={() => setProbing(true)}
      onMouseLeave={() => setProbing(false)}
      className="pop pop-hover group relative flex flex-col rounded-2xl bg-panel p-5"
      data-cursor="INSPECT"
    >
      <TechnicalLabel>{tool.domain}</TechnicalLabel>

      <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-paper">
        {tool.name}
      </h3>

      <DiagnosticBar segments={tool.segments} index={index} probing={probing} />

      <div className="mt-3 border-t border-line pt-2.5">
        <span className="text-sm font-semibold text-amber">{tool.level}</span>
        <p className="mt-0.5 text-[13px] leading-relaxed text-paper-faint">{tool.levelNote}</p>
      </div>
    </motion.article>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative py-20 sm:py-24" aria-label="Skills and tools">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <SectionHeading label="Skills" title="What I work with." />

        <div className="mt-10 grid gap-5 md:grid-cols-3 md:gap-6">
          {TOOLS.map((tool, i) => (
            <ToolCard key={tool.name} tool={tool} index={i} />
          ))
          }
        </div>

        {/* currently learning - compact supporting line, not a section */}
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 rounded-2xl border border-dashed border-line-2 px-5 py-3">
          <span className="flex items-center gap-2 text-sm font-semibold text-amber">
            <span aria-hidden className="h-2 w-2 animate-sys-pulse rounded-full bg-amber" />
            Currently learning
          </span>
          <span className="text-[15px] text-paper-dim">
            JavaScript &middot; Unity / AR Foundation &middot; Korean
          </span>
        </div>
      </div>
    </section>
  );
}
