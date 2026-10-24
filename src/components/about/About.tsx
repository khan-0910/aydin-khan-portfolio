"use client";

import { motion } from "motion/react";
import SectionHeading from "@/components/ui/SectionHeading";
import TechnicalLabel from "@/components/ui/TechnicalLabel";

const TRAITS: Array<{ label: string; note: string; bg: string }> = [
  { label: "Computers", note: "code, tools, systems", bg: "#ffd6e5" },
  { label: "Tinkering", note: "taking things apart to see inside", bg: "#e2dbff" },
  { label: "Side projects", note: "small builds that keep my hands busy", bg: "#d4f5ea" },
  { label: "Reading", note: "fuel for the next idea", bg: "#ffe9b8" },
  { label: "Football", note: "teamwork, discipline, instinct", bg: "#ffdcc8" },
];

const EDUCATION: Array<{ title: string; sub: string; meta: string }> = [
  {
    title: "B.Tech, Mechatronics & Automation",
    sub: "Vellore Institute of Technology, Chennai",
    meta: "CGPA 7.0 / 10 · expected June 2029",
  },
  {
    title: "National Public School, Chennai",
    sub: "Grade 10 GPA 8.6 · Grade 12 GPA 7.5 · SAT 1190",
    meta: "Chennai, Tamil Nadu",
  },
];

const LANGUAGES = [
  { name: "English", level: "fluent" },
  { name: "Hindi", level: "fluent" },
  { name: "French", level: "functional" },
  { name: "Tamil", level: "conversational" },
  { name: "Korean", level: "learning" },
];

export default function About() {
  return (
    <section id="about" className="relative py-20 sm:py-24" aria-label="About Aydin Khan">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <SectionHeading label="About me" title="Curious about how things work." />

        <div className="mx-auto mt-10 max-w-3xl">
          <p className="max-w-xl text-xl leading-relaxed text-paper-dim sm:text-2xl">
            I like taking ideas <span className="text-paper">apart</span>, understanding how they{" "}
            <span className="text-paper">work</span>, and building them into something{" "}
            <span className="text-amber">real</span>.
          </p>

          <p className="mt-6 max-w-xl leading-relaxed text-paper-dim">
            A Mechatronics &amp; Automation student at VIT Chennai working across mechanical design,
            electronics and software. The interest isn't any single discipline, it's the
            intersections. Where a controller meets a mechanism. Where code moves something
            physical.
          </p>

          {/* things I'm into: chips pop in, then wobble on hover */}
          <ul className="mt-10 flex flex-wrap gap-3">
            {TRAITS.map((t, i) => (
              <motion.li
                key={t.label}
                initial={{ opacity: 0, scale: 0.6, rotate: i % 2 ? 6 : -6 }}
                whileInView={{ opacity: 1, scale: 1, rotate: i % 2 ? 1.5 : -1.5 }}
                whileHover={{ rotate: 0, y: -4, scale: 1.04 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.07, type: "spring", stiffness: 320, damping: 18 }}
                className="pop rounded-2xl px-4 py-2.5 text-navy"
                style={{ background: t.bg }}
              >
                <span className="font-display text-base font-bold">{t.label}</span>
                <span className="ml-2 text-sm text-navy/70">{t.note}</span>
              </motion.li>
            ))}
          </ul>

          <div className="mt-10 space-y-3">
            <TechnicalLabel>Education</TechnicalLabel>
            {EDUCATION.map((e, i) => (
              <motion.div
                key={e.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.08, type: "spring", stiffness: 220, damping: 24 }}
                className="pop pop-hover rounded-2xl bg-panel px-5 py-4"
              >
                <h3 className="font-display text-lg font-bold text-paper">{e.title}</h3>
                <p className="mt-0.5 text-[14px] text-paper-dim">{e.sub}</p>
                <p className="mt-1 text-[13px] text-paper-faint">{e.meta}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-1.5 rounded-2xl border border-dashed border-line-2 px-5 py-3">
            <TechnicalLabel>Languages</TechnicalLabel>
            {LANGUAGES.map((l) => (
              <span key={l.name} className="text-[14px] text-paper-dim">
                <span className="font-medium text-paper">{l.name}</span> <span className="text-paper-faint">· {l.level}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
