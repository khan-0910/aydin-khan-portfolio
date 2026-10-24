"use client";

import { motion } from "motion/react";
import MagneticButton from "@/components/ui/MagneticButton";
import TechnicalLabel from "@/components/ui/TechnicalLabel";

const CHANNELS = [
  { label: "EMAIL", value: "aydin.khan2025@vitstudent.ac.in", href: "mailto:aydin.khan2025@vitstudent.ac.in" },
  { label: "PHONE", value: "+91 7200092054", href: "tel:+917200092054" },
];

export default function Contact() {
  return (
    <section id="contact" className="theme-dark relative overflow-hidden pt-20 sm:pt-28" aria-label="Contact">
      {/* backdrop grid + sketch */}
      <div aria-hidden className="absolute inset-0">
        <div className="blueprint-bg absolute inset-0 opacity-60" />
        <svg className="absolute bottom-0 left-1/2 h-[420px] w-[900px] -translate-x-1/2 opacity-[0.07]" viewBox="0 0 900 420" fill="none">
          <circle cx="450" cy="420" r="300" stroke="#fbf3e8" />
          <circle cx="450" cy="420" r="200" stroke="#fbf3e8" strokeDasharray="4 8" />
          <circle cx="450" cy="420" r="100" stroke="#ff5d8f" strokeDasharray="2 6" />
          <line x1="0" y1="420" x2="900" y2="420" stroke="#fbf3e8" />
          {Array.from({ length: 13 }).map((_, i) => (
            <line key={i} x1={450 + i * 38} y1="420" x2={450 + i * 38 + 20} y2="330" stroke="#fbf3e8" opacity="0.5" />
          ))}
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 sm:px-10">
        <span className="inline-block -rotate-3 font-hand text-[30px] leading-none text-cobalt">Contact ↴</span>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 font-display text-[clamp(3rem,10vw,8rem)] font-extrabold leading-[0.95] tracking-[-0.03em] text-paper"
        >
          Let&apos;s <span className="text-amber">build</span> something.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 text-xl text-paper-dim"
        >
          Got a project, an internship or just a question? My inbox is open.
        </motion.p>

        <div className="mt-12 pb-20">
          <div>
            {/* channels */}
            <div className="max-w-xl space-y-4">
              {CHANNELS.map((ch) => (
                <motion.a
                  key={ch.label}
                  href={ch.href}
                  data-cursor="OPEN"
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="pop pop-hover group flex items-center justify-between gap-6 rounded-2xl bg-panel-2 px-5 py-4"
                >
                  <div>
                    <TechnicalLabel>{ch.label}</TechnicalLabel>
                    <p className="mt-1 text-[15px] font-medium text-paper">{ch.value}</p>
                  </div>
                  <span aria-hidden className="text-paper-faint transition-all duration-300 group-hover:translate-x-1 group-hover:text-amber">→</span>
                </motion.a>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10"
            >
              <MagneticButton href="mailto:aydin.khan2025@vitstudent.ac.in" cursorLabel="BUILD">
                Say hi <span aria-hidden>→</span>
              </MagneticButton>
            </motion.div>
          </div>
        </div>
      </div>

      {/* footer */}
      <footer className="relative border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-paper-faint sm:flex-row sm:items-center sm:justify-between sm:px-10">
          <span>© {new Date().getFullYear()} Aydin Khan</span>
          <span className="flex flex-wrap items-center gap-5">
            <a href={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/privacy`} className="transition-colors hover:text-paper">Privacy</a>
            <a href={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/terms`} className="transition-colors hover:text-paper">Terms</a>
          </span>
        </div>
      </footer>
    </section>
  );
}
