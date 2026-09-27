"use client";

import { useCallback, useState, type ComponentType } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import SectionHeading from "@/components/ui/SectionHeading";
import TechnicalLabel from "@/components/ui/TechnicalLabel";
import { PROJECTS, type Project, type ProjectStatus } from "@/lib/projects";
import MedicalBoxVisual from "./visuals/MedicalBoxVisual";
import EcommerceVisual from "./visuals/EcommerceVisual";
import FootballVisual from "./visuals/FootballVisual";
import ExoplanetVisual from "./visuals/ExoplanetVisual";
import ArduinoVisual from "./visuals/ArduinoVisual";

/* Direct component references - statically analyzable client references. */
function pickVisual(id: Project["visual"]): ComponentType {
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
  }
}

function StatusChip({ status }: { status: ProjectStatus }) {
  const solid = status === "BUILT";
  const soon = status === "STARTING SOON";
  const pulse = solid ? {} : soon ? { opacity: [0.4, 1, 0.4] } : { opacity: [1, 0.35, 1] };
  return (
    <span
      className={`flex items-center gap-2 border px-2.5 py-1 font-mono text-[10px] tracking-[0.25em] ${
        solid
          ? "border-cyan/50 text-cyan"
          : soon
            ? "border-coral/50 text-coral"
            : "border-amber/50 text-amber"
      }`}
    >
      <motion.span
        aria-hidden
        className={`h-1.5 w-1.5 ${solid ? "bg-cyan" : soon ? "bg-coral" : "bg-amber"}`}
        animate={pulse}
        transition={{ duration: 1.8, repeat: solid ? 0 : Infinity, ease: "easeInOut" }}
      />
      {status}
    </span>
  );
}

const arrowButtonClass =
  "flex h-10 w-10 items-center justify-center border border-line-2 text-paper transition-colors hover:border-amber hover:text-amber focus-visible:outline-none focus-visible:border-amber focus-visible:text-amber";

type ProjectPanelProps = {
  project: Project;
  reduced: boolean | null;
};

/**
 * One project's content inside the shared viewport. Case-file open state is
 * intentionally local: a freshly mounted project always starts collapsed,
 * and an exiting clone simply fades out with whatever state it had.
 */
function ProjectPanel({ project, reduced }: ProjectPanelProps) {
  const [caseOpen, setCaseOpen] = useState(false);
  const Visual = pickVisual(project.visual);

  return (
    <div className="grid lg:grid-cols-[1.05fr_1fr]">
      {/* visual - only the active project's visual is mounted */}
      <div className="theme-dark relative flex items-center justify-center border-b border-line bg-navy-2 p-4 sm:p-6 lg:border-b-0 lg:border-r">
        <div className="w-full max-w-[600px]">
          <Visual />
        </div>
      </div>

      {/* summary side: identity + one line + case file toggle */}
      <div className="flex flex-col p-6 sm:p-8" aria-live="polite">
        <h3 className="font-display text-3xl font-bold uppercase leading-[1.02] tracking-tight text-paper sm:text-4xl">
          {project.name}
        </h3>
        <p className="mt-3 text-[15px] leading-relaxed text-paper-dim">{project.tagline}</p>

        {/* case file - compact openable panel */}
        <div className="mt-6 border-t border-line pt-5">
          <button
            type="button"
            onClick={() => setCaseOpen((v) => !v)}
            aria-expanded={caseOpen}
            aria-controls={`case-file-${project.id}`}
            className="group/case flex w-full items-center justify-between gap-4 border border-line-2 bg-graphite/40 px-4 py-3 text-left transition-colors hover:border-amber focus-visible:outline-none focus-visible:border-amber"
          >
            <span className="flex items-center gap-3">
              <span
                aria-hidden
                className={`font-mono text-[13px] text-amber transition-transform duration-300 ${caseOpen ? "rotate-90" : ""}`}
              >
                ›
              </span>
              <TechnicalLabel>CASE FILE</TechnicalLabel>
              <span className="font-mono text-[10px] tracking-[0.2em] text-paper-faint transition-colors group-hover/case:text-paper-dim">
                {caseOpen ? "CLOSE" : "OPEN"}
              </span>
            </span>
            <span
              aria-hidden
              className="h-px w-6 bg-line-2 transition-all duration-300 group-hover/case:w-10 group-hover/case:bg-amber"
            />
          </button>

          <AnimatePresence initial={false}>
            {caseOpen && (
              <motion.div
                id={`case-file-${project.id}`}
                key={`case-${project.id}`}
                initial={reduced ? { opacity: 0 } : { opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, height: 0 }}
                transition={{ duration: reduced ? 0.15 : 0.35, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <div className="border border-t-0 border-line-2 bg-graphite/30 px-4 py-4">
                  <div className="space-y-4">
                    {project.sections.map((s, si) => (
                      <motion.div
                        key={s.heading}
                        initial={reduced ? { opacity: 1 } : { opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: reduced ? 0 : 0.08 + si * 0.05, duration: 0.3 }}
                      >
                        <TechnicalLabel>{s.heading}</TechnicalLabel>
                        {s.body.map((line, bi) => (
                          <p key={bi} className="mt-1 text-[13px] leading-relaxed text-paper-dim/90">
                            {line}
                          </p>
                        ))}
                      </motion.div>
                    ))}
                  </div>

                  {(project.hardware.length > 0 || project.software.length > 0) && (
                    <div className="mt-5 grid gap-4 border-t border-line pt-4 sm:grid-cols-2">
                      {project.hardware.length > 0 && (
                        <div>
                          <TechnicalLabel>HARDWARE</TechnicalLabel>
                          <ul className="mt-1.5 space-y-1">
                            {project.hardware.map((h) => (
                              <li key={h} className="font-mono text-[11px] tracking-[0.15em] text-paper-dim">
                                {h}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {project.software.length > 0 && (
                        <div>
                          <TechnicalLabel>SOFTWARE</TechnicalLabel>
                          <ul className="mt-1.5 space-y-1">
                            {project.software.map((s) => (
                              <li key={s} className="font-mono text-[11px] tracking-[0.15em] text-paper-dim">
                                {s}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default function ProjectShowcase() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const reduced = useReducedMotion();

  const total = PROJECTS.length;
  const project = PROJECTS[index];

  const step = useCallback(
    (delta: number) => {
      setDirection(delta);
      setIndex((i) => (i + delta + total) % total);
    },
    [total]
  );

  const goTo = useCallback(
    (next: number) => {
      setDirection(next > index ? 1 : -1);
      setIndex(next);
    },
    [index]
  );

  return (
    <section id="projects" className="theme-pale relative py-20 sm:py-28" aria-label="Projects">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <SectionHeading index="04" label="SELECTED WORK" title="The project register." />

        <div
          className="mt-10 border border-line bg-panel/50"
          role="group"
          aria-label="Project showcase"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") {
              e.preventDefault();
              step(1);
            } else if (e.key === "ArrowLeft") {
              e.preventDefault();
              step(-1);
            }
          }}
        >
          {/* header: counter + status + arrows */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-3">
            <div className="flex flex-wrap items-center gap-4 font-mono text-[11px] tracking-[0.3em] text-paper-faint">
              <span className="text-amber">
                PROJECT {project.number} / {String(total).padStart(2, "0")}
              </span>
              <span aria-hidden className="h-px w-8 bg-line-2" />
              <span>{project.year}</span>
              <StatusChip status={project.status} />
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous project"
                className={arrowButtonClass}
              >
                <svg viewBox="0 0 16 16" className="h-4 w-4" stroke="currentColor" strokeWidth="1.5" fill="none" aria-hidden>
                  <path d="M10 3 L5 8 L10 13" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next project"
                className={arrowButtonClass}
              >
                <svg viewBox="0 0 16 16" className="h-4 w-4" stroke="currentColor" strokeWidth="1.5" fill="none" aria-hidden>
                  <path d="M6 3 L11 8 L6 13" />
                </svg>
              </button>
            </div>
          </div>

          {/* the single viewport: active project swaps in place.
              Enter-only animation: the outgoing panel unmounts immediately and
              the new one slides in - no exit choreography to stall. */}
          <div className="overflow-hidden">
            <motion.div
              key={project.id}
              initial={reduced ? { opacity: 0 } : { opacity: 0, x: direction >= 0 ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: reduced ? 0.15 : 0.4, ease: "easeOut" }}
            >
              <ProjectPanel project={project} reduced={reduced} />
            </motion.div>
          </div>

          {/* project index: 01 - 02 - 03 - 04 - 05 with sliding active fill */}
          <div className="flex items-center gap-2 border-t border-line px-5 py-3" role="tablist" aria-label="Project index">
            {PROJECTS.map((p, i) => {
              const active = i === index;
              return (
                <div key={p.id} className="flex flex-1 items-center gap-2 last:flex-none">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={active}
                    aria-label={`Go to project ${p.number}: ${p.name}`}
                    onClick={() => goTo(i)}
                    className={`relative border px-2.5 py-1 font-mono text-[11px] tracking-[0.2em] transition-colors focus-visible:outline-none focus-visible:border-amber ${
                      active
                        ? "border-amber text-amber"
                        : "border-line-2 text-paper-faint hover:border-paper-faint hover:text-paper-dim"
                    }`}
                  >
                    {active && (
                      <motion.span
                        aria-hidden
                        layoutId="project-tab-fill"
                        className="absolute inset-0 bg-amber/10"
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      />
                    )}
                    <span className="relative">{p.number}</span>
                  </button>
                  {i < total - 1 && <span aria-hidden className="h-px flex-1 bg-line" />}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
