"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import TechnicalLabel from "@/components/ui/TechnicalLabel";
import { FEATURED } from "@/lib/featured";
import { AptaVisual } from "./visuals/StudioVisuals";

/* Sticker tiles: pastel fill, ink outline, ink text (>= 7:1 on every fill). */
const FACTS = [
  { n: "2", label: "languages, English and தமிழ்", bg: "#ffd2e3" },
  { n: "3", label: "roles: student, staff, admin", bg: "#dccfff" },
  { n: "5", label: "steps from application to funding", bg: "#d0f4e6" },
  { n: "8", label: "form sections, matching the paper form", bg: "#ffe2cc" },
];

const EASE = [0.16, 1, 0.3, 1] as const;

/** APTA gets the biggest card on the page: it's the one project with real users. */
export default function FeaturedProject() {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const p = FEATURED;
  const [live, repo] = p.links ?? [];

  return (
    <motion.article
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: EASE }}
      className="pop mt-10 overflow-hidden rounded-3xl bg-panel"
      aria-labelledby="featured-title"
    >
      <div className="grid lg:grid-cols-[1fr_1.1fr]">
        {/* story side */}
        <div className="flex flex-col p-6 sm:p-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="pop flex items-center gap-2 rounded-full bg-[#d0f4e6] px-3 py-1 text-xs font-bold text-navy">
              <span className="relative flex h-2 w-2" aria-hidden>
                {!reduced && <span className="absolute inset-0 animate-ping rounded-full bg-cyan opacity-60" />}
                <span className="relative h-2 w-2 rounded-full bg-cyan" />
              </span>
              Live now
            </span>
            <span className="text-sm text-paper-faint">My biggest project, and the only one real people use right now</span>
          </div>

          <h3
            id="featured-title"
            className="mt-6 font-display text-5xl font-extrabold leading-[0.95] tracking-[-0.03em] text-paper sm:text-6xl xl:text-7xl"
          >
            APTA <span className="text-amber">Empowers</span>
          </h3>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-paper">{p.tagline}</p>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-paper-dim">{p.description}</p>

          <div className="mt-7 flex flex-wrap gap-3">
            {live && (
              <a
                href={live.href}
                target="_blank"
                rel="noreferrer"
                className="pop pop-hover inline-flex items-center gap-2 rounded-full bg-amber px-5 py-3 text-sm font-bold text-white"
              >
                Open the live site <span aria-hidden>↗</span>
              </a>
            )}
            {repo && (
              <a
                href={repo.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border-2 border-navy px-5 py-3 text-sm font-semibold text-paper transition-colors hover:bg-panel-2"
              >
                Code on GitHub <span aria-hidden>↗</span>
              </a>
            )}
          </div>

          <dl className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {FACTS.map((f, i) => (
              <motion.div
                key={f.label}
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12, rotate: i % 2 ? 2 : -2 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + i * 0.07, duration: 0.5, ease: EASE }}
                className="pop rounded-2xl p-3"
                style={{ background: f.bg }}
              >
                <dd className="font-display text-3xl font-extrabold text-navy">{f.n}</dd>
                <dt className="mt-1 text-[12px] leading-snug text-[#352b48]">{f.label}</dt>
              </motion.div>
            ))}
          </dl>
        </div>

        {/* diagram side, on the same plum panel as the register */}
        <div className="theme-dark flex items-center justify-center border-t-2 border-navy bg-navy-2 p-4 sm:p-8 lg:border-l-2 lg:border-t-0">
          <div className="w-full max-w-[640px]">
            <AptaVisual />
          </div>
        </div>
      </div>

      {/* the full story, closed until someone asks for it */}
      <div className="border-t-2 border-navy bg-panel-2 p-4 sm:p-6">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="featured-story"
          className="group/case flex w-full items-center justify-between gap-4 rounded-xl border border-line-2 bg-panel px-4 py-3 text-left transition-colors hover:border-amber focus-visible:outline-none focus-visible:border-amber"
        >
          <span className="flex items-center gap-3">
            <span aria-hidden className={`text-[15px] font-bold text-amber transition-transform duration-300 ${open ? "rotate-90" : ""}`}>
              ›
            </span>
            <span className="text-sm font-semibold text-paper">The full story</span>
            <span className="text-xs text-paper-faint transition-colors group-hover/case:text-paper-dim">{open ? "close" : "open"}</span>
          </span>
          <span aria-hidden className="h-px w-6 bg-line-2 transition-all duration-300 group-hover/case:w-10 group-hover/case:bg-amber" />
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id="featured-story"
              initial={reduced ? { opacity: 0 } : { opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, height: 0 }}
              transition={{ duration: reduced ? 0.15 : 0.35, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <div className="grid gap-3 pt-3 md:grid-cols-3">
                {p.sections.map((s, i) => (
                  <motion.div
                    key={s.heading}
                    initial={reduced ? { opacity: 1 } : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: reduced ? 0 : 0.08 + i * 0.06, duration: 0.35, ease: EASE }}
                    className="rounded-2xl border border-line-2 bg-panel p-5"
                  >
                    <TechnicalLabel className="text-amber">{s.heading.charAt(0) + s.heading.slice(1).toLowerCase()}</TechnicalLabel>
                    {s.body.map((line, bi) => (
                      <p key={bi} className="mt-2 text-[13px] leading-relaxed text-paper-dim">
                        {line}
                      </p>
                    ))}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}
