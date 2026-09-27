"use client";

import { motion } from "motion/react";
import SectionHeading from "@/components/ui/SectionHeading";
import TechnicalLabel from "@/components/ui/TechnicalLabel";

const EASE = [0.16, 1, 0.3, 1] as const;

const TRAITS: Array<{ code: string; label: string; note: string }> = [
  { code: "T-01", label: "COMPUTERS", note: "Comfortable in software land: code, tools, systems" },
  { code: "T-02", label: "TINKERING", note: "Taking objects apart to see what's inside" },
  { code: "T-03", label: "SIDE PROJECTS", note: "Small builds that keep the hands busy" },
  { code: "T-04", label: "READING", note: "Fuel for the next idea" },
  { code: "T-05", label: "SPORTS", note: "Football: discipline, teamwork, instinct" },
];

const EDUCATION: Array<{ title: string; sub: string; meta: string }> = [
  {
    title: "B.TECH - MECHATRONICS & AUTOMATION",
    sub: "Vellore Institute of Technology, Chennai",
    meta: "CGPA 7.0/10.0 - EXPECTED JUNE 2029",
  },
  {
    title: "NATIONAL PUBLIC SCHOOL, CHENNAI",
    sub: "Grade 10 GPA 8.6/10.0 / Grade 12 GPA 7.5/10.0 / SAT 1190",
    meta: "CHENNAI, TAMIL NADU",
  },
];

const LANGUAGES = [
  { name: "ENGLISH", level: "FLUENT" },
  { name: "HINDI", level: "FLUENT" },
  { name: "FRENCH", level: "FUNCTIONAL" },
  { name: "TAMIL", level: "CONVERSATIONAL" },
  { name: "KOREAN", level: "LEARNING" },
];

export default function About() {
  return (
    <section id="about" className="relative py-20 sm:py-24" aria-label="About Aydin Khan">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <SectionHeading index="02" label="OPERATOR PROFILE" title="Curious about how things work." />

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

          {/* spec sheet - compact list */}
          <div className="mt-10 border border-line bg-panel/60">
            <div className="border-b border-line px-4 py-2">
              <TechnicalLabel>INSPECTION - PERSONAL SPEC SHEET</TechnicalLabel>
            </div>
            <ul className="grid sm:grid-cols-2">
              {TRAITS.map((t, i) => (
                <motion.li
                  key={t.code}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.05, duration: 0.4, ease: EASE }}
                  className={`flex items-baseline gap-3 border-line/60 px-4 py-2.5 ${
                    i % 2 === 0 ? "sm:border-r" : ""
                  } ${i < TRAITS.length - (TRAITS.length % 2 === 1 ? 1 : 2) ? "border-b" : "border-b sm:border-b-0"} last:border-b-0 sm:last:border-b-0`}
                >
                  <span className="font-mono text-[10px] tracking-[0.2em] text-amber">{t.code}</span>
                  <span className="w-32 shrink-0 font-mono text-[11px] font-medium tracking-[0.15em] text-paper">
                    {t.label}
                  </span>
                  <span className="text-[12px] leading-snug text-paper-faint">{t.note}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* education - compact */}
          <div className="mt-6 space-y-3">
            <TechnicalLabel>EDUCATION RECORD</TechnicalLabel>
            {EDUCATION.map((e) => (
              <div
                key={e.title}
                className="border border-line bg-panel/50 px-4 py-3 transition-colors duration-300 hover:border-line-2"
              >
                <h3 className="font-mono text-[12px] font-medium tracking-[0.15em] text-paper">{e.title}</h3>
                <p className="mt-0.5 text-[13px] text-paper-dim">{e.sub}</p>
                <p className="mt-0.5 font-mono text-[10px] tracking-[0.2em] text-paper-faint">{e.meta}</p>
              </div>
            ))}
          </div>

          {/* languages - one compact line per language */}
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-1.5 border border-dashed border-line-2 px-4 py-3">
            <TechnicalLabel>LANGUAGES</TechnicalLabel>
            {LANGUAGES.map((l) => (
              <span key={l.name} className="font-mono text-[11px] tracking-[0.15em] text-paper-dim">
                {l.name} <span className="text-paper-faint">- {l.level}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
