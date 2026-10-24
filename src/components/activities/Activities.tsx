"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import SectionHeading from "@/components/ui/SectionHeading";
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
    title: "Event manager, futsal",
    org: "School event organising committee",
    detail: "Ran fixtures, logistics and match-day operations end to end.",
    tag: "LEADERSHIP",
  },
  {
    year: "2024",
    title: "TiE Entrepreneur Program",
    org: "IIT Madras Research Park",
    detail: "Selected for an entrepreneurship program at the research park.",
    tag: "PROGRAM",
  },
  {
    year: "2024",
    title: "Tamil Nadu Clusters",
    org: "Statewide football tournament, team vice captain",
    detail: "Led the side as vice captain; ranked 8 among 160 schools.",
    tag: "SPORT",
  },
  {
    year: "2024",
    title: "SANMUN",
    org: "Verbal mention",
    detail: "Recognised for contribution in committee debate.",
    tag: "DEBATE",
  },
  {
    year: "2023",
    title: "Chairman's Cup, Bangalore",
    org: "Interschool football tournament",
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
      className="theme-mat bg-mint relative py-20 sm:py-24"
      aria-label="Leadership and activities"
    >
      <div className="relative mx-auto max-w-7xl px-6 sm:px-10">
        <SectionHeading label="Outside class" title="Off the bench, on the pitch." />

        {/* timeline */}
        <div ref={ref} className="relative mt-10 ml-2 sm:ml-6">
          {/* spine */}
          <div className="absolute bottom-0 left-0 top-0 w-px bg-line" aria-hidden />
          <motion.div
            className="absolute bottom-0 -left-px top-0 w-[3px] origin-top rounded-full bg-linear-to-b from-amber via-cobalt to-cyan"
            style={reduced ? { scaleY: 1 } : { scaleY: lineScale }}
            aria-hidden
          />

          <ol className="space-y-6">
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
                  className="absolute -left-[6px] top-2 h-[13px] w-[13px] rounded-full border-2 border-line-2 bg-graphite transition-colors duration-300 group-hover:border-amber group-hover:bg-amber"
                />
                <div className="flex flex-col gap-1 border-b border-line/60 pb-5 sm:flex-row sm:items-baseline sm:gap-8">
                  <span className="text-sm font-semibold text-paper-dim sm:w-16">
                    {e.year}
                  </span>
                  <div className="flex-1">
                    <h3 className="font-display text-xl font-bold text-paper transition-colors group-hover:text-amber">
                      {e.title}
                    </h3>
                    <p className="mt-1 text-[15px] text-paper-dim">{e.org}</p>
                    {e.detail && (
                      <p className="mt-1 text-[15px] text-paper-dim">{e.detail}</p>
                    )}
                  </div>
                  <TechnicalLabel className={TAG_ACCENT[e.tag]}>{e.tag}</TechnicalLabel>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
