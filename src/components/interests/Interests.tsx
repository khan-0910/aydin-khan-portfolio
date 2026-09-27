"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import SectionHeading from "@/components/ui/SectionHeading";

type Interest = {
  label: string;
  index: string;
  note: string;
  effect: "move" | "assemble" | "code" | "trajectory" | "spark" | "lines";
};

const INTERESTS: Interest[] = [
  { label: "ENGINEERING", index: "01", note: "Understanding systems end to end", effect: "spark" },
  { label: "TINKERING", index: "02", note: "Open it up. See what's inside.", effect: "move" },
  { label: "BUILDING", index: "03", note: "Parts in, working thing out", effect: "assemble" },
  { label: "COMPUTERS", index: "04", note: "Software is a workshop too", effect: "code" },
  { label: "SPORTS", index: "05", note: "Reading systems at speed", effect: "trajectory" },
  { label: "READING", index: "06", note: "Fuel for the next build", effect: "lines" },
];

function EffectVisual({ effect, active }: { effect: Interest["effect"]; active: boolean }) {
  const c = active ? "var(--color-amber)" : "var(--color-paper-faint)";
  return (
    <svg viewBox="0 0 120 48" className="mx-auto h-12 w-full max-w-[220px]" fill="none" aria-hidden>
      {effect === "move" && (
        <g>
          <motion.rect x="18" y="16" width="16" height="16" stroke={c} animate={active ? { x: [18, 34, 18] } : {}} transition={{ repeat: active ? Infinity : 0, duration: 2.6, ease: "easeInOut" }} />
          <motion.circle cx="56" cy="24" r="8" stroke={c} animate={active ? { cx: [56, 40, 56] } : {}} transition={{ repeat: active ? Infinity : 0, duration: 2.6, ease: "easeInOut" }} />
          <motion.path d="M82 32 L92 14 L102 32 Z" stroke={c} animate={active ? { rotate: [0, 14, 0] } : {}} style={{ transformOrigin: "92px 26px" }} transition={{ repeat: active ? Infinity : 0, duration: 2.6, ease: "easeInOut" }} />
        </g>
      )}
      {effect === "assemble" && (
        <g>
          <motion.rect x="36" y="12" width="18" height="18" stroke={c} animate={active ? { x: [14, 36], opacity: [0.3, 1] } : {}} transition={{ duration: 1.5, ease: "easeOut" }} />
          <motion.rect x="66" y="12" width="18" height="18" stroke={c} animate={active ? { x: [88, 66], opacity: [0.3, 1] } : {}} transition={{ duration: 1.5, ease: "easeOut", delay: 0.15 }} />
          <motion.rect x="51" y="18" width="18" height="18" stroke={c} animate={active ? { y: [42, 18], opacity: [0.3, 1] } : {}} transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }} />
        </g>
      )}
      {effect === "code" && (
        <g fontFamily="var(--font-mono)" fontSize="9" fill={c}>
          <motion.text x="32" y="19" animate={active ? { opacity: [0.25, 1] } : { opacity: 0.55 }} transition={{ repeat: active ? Infinity : 0, duration: 1.8, ease: "easeInOut" }}>fn run() {`{`}</motion.text>
          <motion.text x="40" y="31" animate={active ? { opacity: [1, 0.25] } : { opacity: 0.55 }} transition={{ repeat: active ? Infinity : 0, duration: 1.8, ease: "easeInOut" }}>build();</motion.text>
          <motion.text x="32" y="43" animate={active ? { opacity: [0.25, 1] } : { opacity: 0.55 }} transition={{ repeat: active ? Infinity : 0, duration: 1.8, ease: "easeInOut" }}>{`}`}</motion.text>
        </g>
      )}
      {effect === "trajectory" && (
        <g>
          <motion.path
            d="M10 38 Q 60 2 110 38"
            stroke={c}
            strokeWidth="1.2"
            strokeDasharray="3 4"
            animate={active ? { pathLength: [0, 1, 1], opacity: [1, 1, 0.35] } : { opacity: 0.7 }}
            transition={{ repeat: active ? Infinity : 0, duration: 2.2, ease: "easeInOut" }}
          />
          {active && (
            <motion.circle
              r="3"
              fill={c}
              animate={{ offsetDistance: ["0%", "100%"] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
              style={{ offsetPath: "path('M10 38 Q 60 2 110 38')" }}
            />
          )}
        </g>
      )}
      {effect === "spark" && (
        <g>
          <circle cx="22" cy="24" r="6" stroke={c} />
          <motion.path
            d="M34 24 H50 M56 24 H72 M78 24 H94"
            stroke={c}
            animate={active ? { strokeDashoffset: [0, -22] } : {}}
            style={{ strokeDasharray: "4 7" }}
            transition={{ repeat: active ? Infinity : 0, duration: 1.1, ease: "linear" }}
          />
          <motion.circle cx="98" cy="24" r="6" stroke={c} animate={active ? { opacity: [0.3, 1, 0.3] } : { opacity: 0.6 }} transition={{ repeat: active ? Infinity : 0, duration: 1.1 }} />
        </g>
      )}
      {effect === "lines" && (
        <g>
          {[14, 24, 34].map((y, i) => (
            <motion.line key={y} x1="18" y1={y} x2="102" y2={y} stroke={c} animate={active ? { pathLength: [0, 1], opacity: 1 } : { pathLength: 1, opacity: 0.7 }} transition={{ repeat: active ? Infinity : 0, duration: 1.6, delay: i * 0.2, ease: "easeInOut" }} />
          ))}
        </g>
      )}
    </svg>
  );
}

export default function Interests() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  return (
    <section id="interests" className="relative py-28 sm:py-36" aria-label="Interests">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <SectionHeading index="07" label="SIGNAL MAP" title="What keeps the motor running." />

        <div className="mt-16 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {INTERESTS.map((item, i) => {
            const active = activeIdx === i;
            return (
              <motion.button
                key={item.label}
                type="button"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setActiveIdx(i)}
                onMouseLeave={() => setActiveIdx(null)}
                onFocus={() => setActiveIdx(i)}
                onBlur={() => setActiveIdx(null)}
                onClick={() => setActiveIdx(active ? null : i)}
                data-cursor="INSPECT"
                aria-pressed={active}
                className={`group relative flex flex-col justify-between gap-10 bg-graphite p-7 text-left transition-colors duration-300 ${
                  active ? "bg-panel-2" : ""
                }`}
              >
                <div className="flex justify-end">
                  <span
                    aria-hidden
                    className={`h-2 w-2 transition-colors ${active ? "bg-amber" : "bg-line-2"}`}
                  />
                </div>
                <div className="self-stretch">
                  <h3
                    className={`font-display text-3xl font-bold uppercase tracking-tight transition-colors sm:text-4xl ${
                      active ? "text-paper" : "text-paper-dim"
                    }`}
                  >
                    {item.label}
                  </h3>
                  <p className="mt-2 text-[13px] text-paper-faint">{item.note}</p>
                  <div className="mt-6">
                    <EffectVisual effect={item.effect} active={active} />
                  </div>
                </div>
                <span aria-hidden className={`absolute bottom-0 left-0 h-[2px] w-full origin-left bg-amber transition-transform duration-500 ${active ? "scale-x-100" : "scale-x-0"}`} />
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
