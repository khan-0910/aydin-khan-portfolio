"use client";

import { motion } from "motion/react";
import { useProjectOverlay } from "@/components/system/Provider";
import type { Project, ProjectStatus } from "@/lib/projects";
import type { ComponentType } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

type ProjectCardProps = {
  project: Project;
  visual: ComponentType;
  index: number;
};

function StatusChip({ status }: { status: ProjectStatus }) {
  const solid = status === "BUILT";
  const soon = status === "STARTING SOON";
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
        className={`h-1.5 w-1.5 rounded-full ${solid ? "bg-cyan" : soon ? "bg-coral" : "bg-amber"}`}
        animate={solid ? {} : soon ? { opacity: [0.4, 1, 0.4] } : { opacity: [1, 0.35, 1], scale: [1, 1.3, 1] }}
        transition={{ duration: solid ? 0 : 1.8, repeat: solid ? 0 : Infinity }}
      />
      {status}
    </span>
  );
}

export default function ProjectCard({ project, visual: Visual, index }: ProjectCardProps) {
  const { open } = useProjectOverlay();

  return (
    <motion.article
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: EASE }}
      className={`group grid gap-0 border border-line/80 bg-panel/50 lg:grid-cols-2 ${
        index % 2 === 1 ? "lg:[direction:rtl]" : ""
      }`}
      aria-label={`Project ${project.number}: ${project.name}`}
    >
      {/* visual side — navy instrument screen hosting the interactive module */}
      <div className="theme-dark bg-navy-2 relative flex flex-col border-b border-line lg:border-b-0 lg:border-r group-odd:lg:border-r-0 group-odd:lg:border-l">
        <Visual />
      </div>

      {/* content side — the invitation only; detail lives in the case file */}
      <div className="flex flex-col justify-center p-8 sm:p-12 [direction:ltr]">
        <div className="flex items-center gap-4">
          <span className="font-mono text-[11px] tracking-[0.35em] text-amber">
            PROJECT {project.number}
          </span>
          <span aria-hidden className="h-px flex-1 bg-line/80" />
          <StatusChip status={project.status} />
        </div>

        <h3 className="mt-6 font-display text-4xl font-bold uppercase leading-[1.02] tracking-tight text-paper sm:text-5xl">
          {project.name}
        </h3>

        <p className="mt-5 max-w-md text-lg leading-relaxed text-paper-dim">{project.tagline}</p>

        <div className="mt-10">
          <button
            type="button"
            onClick={() => open(project.id)}
            data-cursor="OPEN"
            className="group/btn relative flex items-center gap-3 border border-line-2 px-6 py-3.5 font-mono text-[11px] tracking-[0.25em] text-paper transition-colors hover:border-amber hover:text-amber"
          >
            OPEN CASE FILE
            <span aria-hidden className="transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
          </button>
        </div>
      </div>
    </motion.article>
  );
}
