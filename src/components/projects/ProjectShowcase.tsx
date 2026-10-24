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
      className={`flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${
        solid
          ? "border-cyan/50 text-cyan"
          : soon
            ? "border-coral/50 text-coral"
            : "border-amber/50 text-amber"
      }`}
    >
      <motion.span
        aria-hidden
        className={`h-2 w-2 rounded-full ${solid ? "bg-cyan" : soon ? "bg-coral" : "bg-amber"}`}
        animate={pulse}
        transition={{ duration: 1.8, repeat: solid ? 0 : Infinity, ease: "easeInOut" }}
      />
      <span className="lowercase first-letter:uppercase">{status}</span>
    </span>
  );
}

/** progress bar + checklist driven by project.milestones */
function Progress({ milestones }: { milestones: NonNullable<Project["milestones"]> }) {
  const done = milestones.filter((m) => m.done).length;
  const pct = Math.round((done / milestones.length) * 100);
  return (
    <div className="mt-6 rounded-2xl border border-line bg-panel-2 p-4">
      <div className="flex items-baseline justify-between">
        <TechnicalLabel className="text-paper">Progress</TechnicalLabel>
        <span className="text-sm font-semibold text-amber">
          {done} of {milestones.length} steps
        </span>
      </div>
      <div className="mt-3 h-3 overflow-hidden rounded-full bg-line" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label="Project progress">
        <motion.div
          className="h-full rounded-full"
          style={{ background: "linear-gradient(90deg, #ff5d8f, #6d4aff)" }}
          initial={{ width: 0 }}
          whileInView={{ width: `${Math.max(pct, 4)}%` }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 90, damping: 18, delay: 0.2 }}
        />
      </div>
      <ul className="mt-4 space-y-1.5">
        {milestones.map((m, i) => (
          <motion.li
            key={m.label}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 + i * 0.05 }}
            className={`flex items-start gap-2.5 text-[14px] ${m.done ? "text-paper" : "text-paper-faint"}`}
          >
            <span
              aria-hidden
              className={`mt-[3px] flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[10px] ${
                m.done ? "bg-cyan text-white" : "border-[1.5px] border-line-2"
              }`}
            >
              {m.done ? "✓" : ""}
            </span>
            <span>
              {m.label}
              <span className="sr-only">{m.done ? " (done)" : " (to do)"}</span>
            </span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

const arrowButtonClass =
  "flex h-10 w-10 items-center justify-center rounded-full border border-line-2 text-paper transition-colors hover:border-amber hover:text-amber focus-visible:outline-none focus-visible:border-amber focus-visible:text-amber";

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
        <h3 className="font-display text-3xl font-bold leading-[1.05] tracking-[-0.02em] text-paper sm:text-4xl">
          {project.name}
        </h3>
        <p className="mt-3 text-[15px] leading-relaxed text-paper-dim">{project.tagline}</p>

        {project.milestones && <Progress milestones={project.milestones} />}

        {/* case file - compact openable panel */}
        <div className="mt-6 border-t border-line pt-5">
          <button
            type="button"
            onClick={() => setCaseOpen((v) => !v)}
            aria-expanded={caseOpen}
            aria-controls={`case-file-${project.id}`}
            className="group/case flex w-full items-center justify-between gap-4 rounded-xl border border-line-2 bg-panel-2 px-4 py-3 text-left transition-colors hover:border-amber focus-visible:outline-none focus-visible:border-amber"
          >
            <span className="flex items-center gap-3">
              <span
                aria-hidden
                className={`text-[15px] font-bold text-amber transition-transform duration-300 ${caseOpen ? "rotate-90" : ""}`}
              >
                ›
              </span>
              <span className="text-sm font-semibold text-paper">The full story</span>
              <span className="text-xs text-paper-faint transition-colors group-hover/case:text-paper-dim">
                {caseOpen ? "close" : "open"}
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
                <div className="mt-2 rounded-xl border border-line-2 bg-panel-2 px-4 py-4">
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
                              <li key={h} className="text-[13px] text-paper-dim">
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
                              <li key={s} className="text-[13px] text-paper-dim">
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
        <SectionHeading label="Projects" title="Things I've built (and am building)." />

        <div
          className="pop mt-10 overflow-hidden rounded-3xl bg-panel"
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
            <div className="flex flex-wrap items-center gap-4 text-sm text-paper-faint">
              <span className="text-amber">
                <span className="font-semibold">Project {index + 1}</span> of {total}
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
                    className={`relative rounded-full border px-3 py-1 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:border-amber ${
                      active
                        ? "border-amber text-amber"
                        : "border-line-2 text-paper-faint hover:border-paper-faint hover:text-paper-dim"
                    }`}
                  >
                    {active && (
                      <motion.span
                        aria-hidden
                        layoutId="project-tab-fill"
                        className="absolute inset-0 rounded-full bg-amber/12"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
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
