"use client";

import { motion } from "motion/react";
import Reveal from "./Reveal";

type SectionHeadingProps = {
  label: string;
  title: string;
  className?: string;
};

export default function SectionHeading({ label, title, className = "" }: SectionHeadingProps) {
  const words = title.split(" ");

  return (
    <div className={className}>
      <Reveal>
        <span className="mb-1 inline-block -rotate-3 font-hand text-[30px] leading-none text-cobalt">
          {label} ↴
        </span>
      </Reveal>
      {/* the h2 watches the viewport: each word starts clipped by its wrapper, so it can't observe itself */}
      <motion.h2
        className="font-display text-5xl font-extrabold leading-[1.02] tracking-[-0.035em] text-paper sm:text-6xl lg:text-7xl"
        initial="hidden"
        whileInView="shown"
        viewport={{ once: true, margin: "-40px" }}
      >
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden pb-1 align-bottom">
            <motion.span
              className="inline-block origin-bottom-left"
              variants={{ hidden: { y: "110%", rotate: 8 }, shown: { y: 0, rotate: 0 } }}
              transition={{ delay: i * 0.06, type: "spring", stiffness: 260, damping: 22 }}
            >
              {i === words.length - 1 ? <span className="marker">{word}</span> : word}
              {i < words.length - 1 ? "\u00A0" : ""}
            </motion.span>
          </span>
        ))}
      </motion.h2>
    </div>
  );
}
