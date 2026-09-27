"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useProjectOverlay } from "@/components/system/Provider";
import { PROJECTS } from "@/lib/projects";
import MedicalBoxVisual from "./visuals/MedicalBoxVisual";
import EcommerceVisual from "./visuals/EcommerceVisual";
import FootballVisual from "./visuals/FootballVisual";
import ExoplanetVisual from "./visuals/ExoplanetVisual";
import ArduinoVisual from "./visuals/ArduinoVisual";

const EASE = [0.16, 1, 0.3, 1] as const;

function pickVisual(id: string) {
  switch (id) {
    case "medical":
      return MedicalBoxVisual;
    case "ecommerce":
      return EcommerceVisual;
    case "football":
      return FootballVisual;
    case "exoplanet":
      return ExoplanetVisual;
    case "arduino":
      return ArduinoVisual;
    default:
      return null;
  }
}

export default function ProjectOverlay() {
  const { openProject, close, open } = useProjectOverlay();
  const index = PROJECTS.findIndex((p) => p.id === openProject);
  const project = index >= 0 ? PROJECTS[index] : null;
  const Visual = project ? pickVisual(project.visual) : null;

  useEffect(() => {
    if (openProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [openProject, close]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="theme-dark fixed inset-0 z-[120] bg-graphite"
        initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
        animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
        exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
        transition={{ duration: 0.6, ease: EASE }}
        role="dialog"
        aria-modal="true"
        aria-label={`Case file: ${project.name}`}
      >
        <div className="blueprint-bg-fine absolute inset-0 opacity-50" aria-hidden />

        <div className="relative flex h-full flex-col overflow-y-auto">
          {/* top bar */}
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-graphite/90 px-6 py-4 backdrop-blur-md sm:px-10">
            <div className="flex items-center gap-4 font-mono text-[10px] tracking-[0.3em] text-paper-faint">
              <span className="text-amber">CASE FILE {project.number}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => open(PROJECTS[(index - 1 + PROJECTS.length) % PROJECTS.length].id)}
                aria-label="Previous project"
                className="border border-line-2 px-3 py-2 font-mono text-[10px] tracking-[0.2em] text-paper-dim transition-colors hover:border-amber hover:text-amber"
              >
                ← PREV
              </button>
              <button
                onClick={() => open(PROJECTS[(index + 1) % PROJECTS.length].id)}
                aria-label="Next project"
                className="border border-line-2 px-3 py-2 font-mono text-[10px] tracking-[0.2em] text-paper-dim transition-colors hover:border-amber hover:text-amber"
              >
                NEXT →
              </button>
              <button
                onClick={close}
                data-cursor="CLOSE"
                aria-label="Close case file"
                className="ml-2 flex h-9 w-9 items-center justify-center border border-line-2 text-paper-dim transition-colors hover:border-amber hover:text-amber"
              >
                <svg viewBox="0 0 10 10" className="h-3.5 w-3.5" stroke="currentColor" strokeWidth="1.5" aria-hidden><path d="M1 1 L9 9 M9 1 L1 9" /></svg>
              </button>
            </div>
          </div>

          {/* sheet */}
          <div className="mx-auto w-full max-w-6xl flex-1 px-6 py-14 sm:px-10">
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6, ease: EASE }}
            >
              <div className="flex flex-wrap items-center gap-4 font-mono text-[11px] tracking-[0.35em] text-paper-faint">
                <span>PROJECT {project.number} / {project.year}</span>
                <span className={`border px-2 py-0.5 text-[9px] ${
                  project.status === "BUILT" ? "border-cyan/50 text-cyan" : project.status === "IN PROGRESS" ? "border-amber/50 text-amber" : "border-coral/50 text-coral"
                }`}>
                  {project.status}
                </span>
              </div>
              <h2 className="mt-4 font-display text-4xl font-bold uppercase leading-[1.02] tracking-tight text-paper sm:text-6xl">
                {project.name}
              </h2>
              <p className="mt-4 max-w-2xl text-lg text-paper-dim">{project.tagline}</p>
            </motion.div>

            {/* ONE dominant visual */}
            {Visual && (
              <motion.div
                key={`${project.id}-visual`}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.25, duration: 0.7, ease: EASE }}
                className="theme-dark mt-12 border border-line bg-navy-2"
              >
                <Visual />
              </motion.div>
            )}

            <div className="mt-16 grid gap-14 lg:grid-cols-[1fr_280px]">
              {/* case narrative */}
              <div className="space-y-14">
                {project.sections.map((s, si) => (
                  <CaseSection key={s.heading} title={s.heading} accent={si === 0}>
                    {s.body.map((p, i) => (
                      <p key={i} className="leading-relaxed text-paper-dim">{p}</p>
                    ))}
                  </CaseSection>
                ))}
              </div>

              {/* tech sidebar */}
              <aside className="lg:sticky lg:top-24 lg:self-start">
                <CaseSection title="TECHNOLOGY">
                  <div className="space-y-6">
                    {project.hardware.length > 0 && (
                      <div>
                        <div className="mb-2 font-mono text-[9px] tracking-[0.3em] text-paper-faint">HARDWARE</div>
                        <ul className="space-y-2">
                          {project.hardware.map((h) => (
                            <li key={h} className="flex items-center gap-2 border border-line bg-panel/60 px-3 py-2 font-mono text-[11px] tracking-[0.15em] text-paper-dim">
                              <span aria-hidden className="h-1.5 w-1.5 bg-amber" />
                              {h}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <div>
                      <div className="mb-2 font-mono text-[9px] tracking-[0.3em] text-paper-faint">SOFTWARE</div>
                      <ul className="space-y-2">
                        {project.software.map((s) => (
                          <li key={s} className="flex items-center gap-2 border border-line bg-panel/60 px-3 py-2 font-mono text-[11px] tracking-[0.15em] text-paper-dim">
                            <span aria-hidden className="h-1.5 w-1.5 bg-cyan" />
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CaseSection>
              </aside>
            </div>

            {/* bottom strip */}
            <div className="mt-16 border-t border-line pt-6">
              <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-[10px] tracking-[0.3em] text-paper-faint">
                <span>CONCEPT → DESIGN → BUILD → TEST → ITERATE</span>
                <span className="text-amber">END OF FILE {project.number}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function CaseSection({
  title,
  accent = false,
  children,
}: {
  title: string;
  accent?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section aria-label={title}>
      <div className="mb-5 flex items-center gap-3">
        <h3 className={`font-mono text-[13px] font-medium tracking-[0.35em] ${accent ? "text-amber" : "text-paper"}`}>{title}</h3>
        <span aria-hidden className="h-px flex-1 bg-line" />
      </div>
      <div className="space-y-3 text-[15px]">{children}</div>
    </section>
  );
}
