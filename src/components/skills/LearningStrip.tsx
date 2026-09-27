"use client";

import { motion } from "motion/react";
import TechnicalLabel from "@/components/ui/TechnicalLabel";

const EASE = [0.16, 1, 0.3, 1] as const;

const LEARNING = [
  {
    name: "JAVASCRIPT",
    domain: "WEB / INTERACTIVE SOFTWARE",
  },
  {
    name: "UNITY / AR FOUNDATION",
    domain: "SPATIAL APPS / ARDUINO TUTOR",
  },
  {
    name: "KOREAN",
    domain: "LANGUAGE",
  },
];

export default function LearningStrip() {
  return (
    <div className="mx-auto mt-6 max-w-7xl px-6 sm:px-10">
      <div className="border border-dashed border-line-2 bg-graphite/60 p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <TechnicalLabel>WORK IN PROGRESS / ACTIVE BAY</TechnicalLabel>
          <span className="flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] text-amber">
            <span aria-hidden className="h-1.5 w-1.5 animate-blink bg-amber" />
            LIVE
          </span>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-3">
          {LEARNING.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: EASE }}
              className="group border border-line/70 bg-panel/40 p-5"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] tracking-[0.3em] text-paper-faint">
                  WIP-{String(i + 1).padStart(2, "0")}
                </span>
                <span className="hatch-dark h-2 w-10" aria-hidden />
              </div>
              <h3 className="mt-4 font-display text-xl font-bold tracking-tight text-paper">
                {item.name}
              </h3>
              <p className="mt-1 font-mono text-[9px] tracking-[0.2em] text-cyan">{item.domain}</p>
              <div className="mt-4 flex items-center gap-2 border-t border-line pt-3">
                <span className="font-mono text-[10px] tracking-[0.2em] text-amber">IN PROGRESS</span>
                <span aria-hidden className="animate-caret inline-block h-3.5 w-[7px] bg-amber" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
