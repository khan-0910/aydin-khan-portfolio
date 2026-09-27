"use client";

import { motion } from "motion/react";
import SectionHeading from "@/components/ui/SectionHeading";
import BounceIn from "@/components/ui/BounceIn";
import TechnicalLabel from "@/components/ui/TechnicalLabel";
import LanguagePanel from "./LanguagePanel";

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

export default function About() {
  return (
    <section id="about" className="relative py-28 sm:py-36" aria-label="About Aydin Khan">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <SectionHeading index="02" label="OPERATOR PROFILE" title="Curious about how things work." />

        <div className="mx-auto mt-16 max-w-3xl">
          {/* narrative */}
          <div>
            {/* stamped-in chip — the section's parts arrive one after another */}
            <BounceIn from={0.5} y={44}>
              <div className="inline-flex items-center gap-3 border border-line-2 bg-panel px-3.5 py-1.5">
                <span aria-hidden className="h-1.5 w-1.5 animate-blink bg-amber" />
                <span className="font-mono text-[11px] tracking-[0.35em] text-paper-dim">ABOUT ME</span>
              </div>
            </BounceIn>

            <BounceIn delay={0.12}>
              <p className="mt-7 max-w-xl text-xl leading-relaxed text-paper-dim sm:text-2xl">
                I like taking ideas <span className="text-paper">apart</span>, understanding how they{" "}
                <span className="text-paper">work</span>, and building them into something{" "}
                <span className="text-amber">real</span>.
              </p>
            </BounceIn>

            <BounceIn delay={0.22}>
              <p className="mt-8 max-w-xl leading-relaxed text-paper-dim">
                A Mechatronics &amp; Automation student at VIT Chennai working across mechanical design,
                electronics and software. The interest isn't any single discipline, it's the
                intersections. Where a controller meets a mechanism. Where code moves something
                physical.
              </p>
            </BounceIn>

            {/* traits — inspection table */}
            <BounceIn delay={0.32} y={44} from={0.96}>
              <div className="mt-12 border border-line bg-panel/60">
                <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
                  <TechnicalLabel>INSPECTION - PERSONAL SPEC SHEET</TechnicalLabel>
                  <span aria-hidden className="h-1.5 w-1.5 bg-amber" />
                </div>
                <ul>
                  {TRAITS.map((t, i) => (
                    <motion.li
                      key={t.code}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ delay: i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="group flex flex-col gap-1 border-b border-line/60 px-4 py-3.5 transition-colors last:border-0 hover:bg-panel-2 sm:flex-row sm:items-center sm:gap-6"
                    >
                      <span className="font-mono text-[10px] tracking-[0.25em] text-amber">{t.code}</span>
                      <span className="w-40 font-mono text-[12px] font-medium tracking-[0.2em] text-paper">
                        {t.label}
                      </span>
                      <span className="flex-1 text-[13px] leading-relaxed text-paper-faint transition-colors group-hover:text-paper-dim">
                        {t.note}
                      </span>
                      <span
                        aria-hidden
                        className="hidden h-px w-6 bg-line-2 transition-all duration-300 group-hover:w-10 group-hover:bg-amber sm:block"
                      />
                    </motion.li>
                  ))}
                </ul>
                <div className="hatch h-3 border-t border-line" aria-hidden />
              </div>
            </BounceIn>

            {/* education */}
            <BounceIn delay={0.12} y={44} from={0.96}>
              <div className="mt-10 space-y-4">
                <TechnicalLabel>EDUCATION RECORD</TechnicalLabel>
                {EDUCATION.map((e) => (
                  <motion.div
                    key={e.title}
                    whileHover={{ x: 6 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="group border border-line bg-panel/50 p-5 transition-colors duration-300 hover:border-line-2 hover:bg-panel"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="font-mono text-[13px] font-medium tracking-[0.15em] text-paper">{e.title}</h3>
                      <span
                        aria-hidden
                        className="h-px w-6 shrink-0 bg-line-2 transition-all duration-300 group-hover:w-10 group-hover:bg-amber"
                      />
                    </div>
                    <p className="mt-1.5 text-sm text-paper-dim">{e.sub}</p>
                    <p className="mt-1 font-mono text-[10px] tracking-[0.25em] text-paper-faint transition-colors group-hover:text-paper-dim">{e.meta}</p>
                  </motion.div>
                ))}
              </div>
            </BounceIn>

            {/* language system */}
            <BounceIn delay={0.22} y={44} from={0.96} className="mt-10">
              <LanguagePanel />
            </BounceIn>
          </div>
        </div>
      </div>
    </section>
  );
}
