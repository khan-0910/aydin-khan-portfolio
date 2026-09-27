"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import TechnicalLabel from "@/components/ui/TechnicalLabel";

type Entry = {
  year: string;
  title: string;
  org: string;
  detail?: string;
  tag: "LEADERSHIP" | "DEBATE" | "SPORT" | "PROGRAM";
};

const ENTRIES: Entry[] = [
  {
    year: "2024",
    title: "EVENT MANAGER - FUTSAL",
    org: "SCHOOL EVENT ORGANISING COMMITTEE",
    detail: "Ran fixtures, logistics and match-day operations end to end.",
    tag: "LEADERSHIP",
  },
  {
    year: "2024",
    title: "TIE ENTREPRENEUR PROGRAM",
    org: "IIT MADRAS RESEARCH PARK",
    detail: "Selected for an entrepreneurship program at the research park.",
    tag: "PROGRAM",
  },
  {
    year: "2024",
    title: "TAMIL NADU CLUSTERS",
    org: "STATEWIDE FOOTBALL TOURNAMENT - TEAM VICE CAPTAIN",
    detail: "Led the side as vice captain; ranked 8 among 160 schools.",
    tag: "SPORT",
  },
  {
    year: "2024",
    title: "SANMUN",
    org: "VERBAL MENTION",
    detail: "Recognised for contribution in committee debate.",
    tag: "DEBATE",
  },
  {
    year: "2023",
    title: "CHAIRMAN'S CUP, BANGALORE",
    org: "INTERSCHOOL FOOTBALL TOURNAMENT",
    detail: "Finished 3rd position.",
    tag: "SPORT",
  },
];

const TAG_ACCENT: Record<Entry["tag"], string> = {
  LEADERSHIP: "text-amber",
  DEBATE: "text-paper-dim",
  SPORT: "text-green",
  PROGRAM: "text-amber",
};

export default function Activities() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="activities"
      className="theme-dark relative py-24 sm:py-32"
      aria-label="Leadership and activities"
    >
      {/* bound-log edge strips */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 hatch h-2.5 border-b border-line/70" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 hatch h-2.5 border-t border-line/70" />
      <div className="relative mx-auto max-w-7xl px-6 sm:px-10">
        <SectionHeading index="08" label="LOGBOOK" title="Off the bench, on the record." />

        {/* timeline */}
        <div ref={ref} className="relative mt-14 ml-2 sm:ml-6">
          {/* spine */}
          <div className="absolute bottom-0 left-0 top-0 w-px bg-line" aria-hidden />
          <motion.div
            className="absolute bottom-0 left-0 top-0 w-px origin-top bg-amber"
            style={reduced ? { scaleY: 1 } : { scaleY: lineScale }}
            aria-hidden
          />

          <ol className="space-y-10">
            {ENTRIES.map((e, i) => (
              <motion.li
                key={e.title}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="group relative pl-8 sm:pl-12"
              >
                {/* node */}
                <span
                  aria-hidden
                  className="absolute -left-[5px] top-1.5 h-[11px] w-[11px] rotate-45 border border-line-2 bg-graphite transition-colors duration-300 group-hover:border-amber group-hover:bg-amber"
                />
                <div className="flex flex-col gap-1 border-b border-line/60 pb-8 sm:flex-row sm:items-baseline sm:gap-8">
                  <span className="font-mono text-[11px] tracking-[0.3em] text-paper-dim sm:w-16">
                    {e.year}
                  </span>
                  <div className="flex-1">
                    <h3 className="font-mono text-[14px] font-medium tracking-[0.15em] text-paper transition-colors group-hover:text-amber">
                      {e.title}
                    </h3>
                    <p className="mt-1 text-[13px] tracking-wide text-paper-dim">{e.org}</p>
                    {e.detail && (
                      <p className="mt-1 text-[13px] text-paper-dim/90">{e.detail}</p>
                    )}
                  </div>
                  <TechnicalLabel className={TAG_ACCENT[e.tag]}>{e.tag}</TechnicalLabel>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>

        {/* football compact strip */}
        <Reveal delay={0.1}>
          <div className="theme-dark mt-20 border border-navy-2 bg-navy-2 shadow-[inset_0_1px_0_rgba(228,230,216,0.06)]">
            <div className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <div className="max-w-md">
                <TechnicalLabel className="mb-3">BEYOND THE WORKBENCH</TechnicalLabel>
                <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-paper">
                  Football
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-paper-dim">
                  Vice captain at state level. Third at the Chairman's Cup. The game teaches reading
                  systems under pressure: spacing, timing, and the fast, quiet decisions in between.
                </p>
              </div>

              {/* pitch geometry */}
              <svg
                viewBox="0 0 220 140"
                className="h-28 w-full max-w-[220px] shrink-0 opacity-80"
                fill="none"
                aria-hidden
              >
                <rect x="4" y="4" width="212" height="132" stroke="#45584b" />
                <line x1="110" y1="4" x2="110" y2="136" stroke="#45584b" />
                <circle cx="110" cy="70" r="24" stroke="#45584b" />
                <rect x="4" y="40" width="30" height="60" stroke="#45584b" />
                <rect x="186" y="40" width="30" height="60" stroke="#45584b" />
                {/* trajectory path */}
                <motion.path
                  d="M 30 110 C 80 100, 100 40, 190 30"
                  stroke="#ff5a1f"
                  strokeWidth="1.2"
                  strokeDasharray="4 4"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                />
                <motion.circle
                  cx="30"
                  cy="110"
                  r="3"
                  fill="#e4e6d8"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                />
                <motion.circle
                  cx="190"
                  cy="30"
                  r="3"
                  fill="#ff5a1f"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.8 }}
                />
              </svg>
            </div>
            <div className="hatch h-3 border-t border-line" aria-hidden />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
