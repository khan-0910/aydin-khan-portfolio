"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import TechnicalLabel from "@/components/ui/TechnicalLabel";

const EASE = [0.16, 1, 0.3, 1] as const;

const LANGUAGES = [
  { name: "ENGLISH", level: "FLUENT" },
  { name: "HINDI", level: "FLUENT" },
  { name: "FRENCH", level: "FUNCTIONAL" },
  { name: "TAMIL", level: "CONVERSATIONAL" },
];

export default function LanguagePanel() {
  const reduced = useReducedMotion();
  const [koreanHover, setKoreanHover] = useState(false);

  return (
    <div className="border border-line bg-panel/60">
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
        <TechnicalLabel>LANGUAGE SYSTEM</TechnicalLabel>
        <div className="flex items-center gap-1.5">
          <span aria-hidden className="h-1.5 w-1.5 bg-cyan" />
          <span aria-hidden className="h-1.5 w-1.5 bg-amber" />
        </div>
      </div>

      <div className="px-4 py-4">
        {/* static channels */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {LANGUAGES.map((lang, i) => (
            <motion.div
              key={lang.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.05, duration: 0.4, ease: EASE }}
              whileHover={{ y: -4 }}
              className="group border border-line/70 bg-graphite/40 px-3 py-2.5 transition-colors duration-300 hover:border-amber"
            >
              <div className="font-mono text-[11px] tracking-[0.2em] text-paper">{lang.name}</div>
              <div className="mt-0.5 font-mono text-[8px] tracking-[0.25em] text-paper-faint transition-colors duration-300 group-hover:text-amber">{lang.level}</div>
              <div className="mt-2.5 h-px w-full origin-left scale-x-50 bg-amber transition-transform duration-300 group-hover:scale-x-100" />
            </motion.div>
          ))}
        </div>

        {/* KOREAN — the flowing learning signal */}
        <div
          className="group/korean mt-4 border border-amber/40 bg-graphite/40 px-4 py-4 transition-colors hover:border-amber"
          onPointerEnter={() => setKoreanHover(true)}
          onPointerLeave={() => setKoreanHover(false)}
        >
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <div className="flex items-baseline gap-3">
              <span className="font-display text-lg font-bold tracking-tight text-paper">KOREAN</span>
              <span className="font-mono text-[9px] tracking-[0.3em] text-amber">CURRENTLY LEARNING</span>
            </div>
            <span className="flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] text-cyan">
              IN PROGRESS
              <span aria-hidden className="animate-caret inline-block h-3 w-[6px] bg-cyan" />
            </span>
          </div>

          {/* the signal line — partial fill + travelling particle */}
          <div className="relative mt-4 h-6" aria-hidden>
            <div className="absolute top-1/2 h-[2px] w-full -translate-y-1/2 bg-line-2" />
            <div className="absolute top-1/2 h-[2px] w-[42%] -translate-y-1/2 bg-cyan/70" />
            <motion.div
              className="absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-amber"
              animate={
                reduced
                  ? { left: "42%" }
                  : { left: ["42%", "97%"], opacity: [0, 1, 1, 0] }
              }
              transition={{
                duration: koreanHover ? 1.4 : 4.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            {/* graduation ticks */}
            {[20, 40, 60, 80].map((p) => (
              <span
                key={p}
                className="absolute top-1/2 h-2 w-px -translate-y-1/2 bg-paper/25"
                style={{ left: `${p}%` }}
              />
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
