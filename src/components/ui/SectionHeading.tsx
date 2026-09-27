"use client";

import { motion } from "motion/react";
import Reveal from "./Reveal";

type SectionHeadingProps = {
  index: string;
  label: string;
  title: string;
  className?: string;
};

export default function SectionHeading({ index, label, title, className = "" }: SectionHeadingProps) {
  const words = title.split(" ");

  return (
    <div className={className}>
      <Reveal>
        <div className="mb-3 flex items-center gap-3 font-mono text-[11px] tracking-[0.3em] text-paper-faint">
          <span className="text-amber">{index}</span>
          <span className="h-px w-10 bg-line-2" aria-hidden />
          <span>{label}</span>
        </div>
      </Reveal>
      <h2 className="font-display text-4xl font-semibold uppercase leading-[1.05] tracking-tight text-paper sm:text-5xl lg:text-6xl">
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden pb-1 align-bottom">
            <motion.span
              className="inline-block"
              initial={{ y: "110%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.06, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              {word}
              {i < words.length - 1 ? "\u00A0" : ""}
            </motion.span>
          </span>
        ))}
      </h2>
    </div>
  );
}
