"use client";

import SectionHeading from "@/components/ui/SectionHeading";
import ProjectCard from "./ProjectCard";
import MedicalBoxVisual from "./visuals/MedicalBoxVisual";
import EcommerceVisual from "./visuals/EcommerceVisual";
import FootballVisual from "./visuals/FootballVisual";
import ExoplanetVisual from "./visuals/ExoplanetVisual";
import ArduinoVisual from "./visuals/ArduinoVisual";
import ProjectOverlay from "./ProjectOverlay";
import { PROJECTS, type Project } from "@/lib/projects";

/* Direct component references — avoids dynamic-record indirection so every
   visual is a statically analyzable client reference (Turbopack-safe). */
function pickVisual(id: Project["visual"]) {
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

export default function ProjectsSection() {
  return (
    <section id="projects" className="theme-pale relative py-28 sm:py-36" aria-label="Projects">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <SectionHeading index="05" label="THE WORKBENCH" title="The project register." />

        <div className="mt-14 space-y-10">
          {PROJECTS.map((p, i) => {
            const Visual = pickVisual(p.visual);
            return <ProjectCard key={p.id} project={p} visual={Visual} index={i} />;
          })}
        </div>
      </div>

      <ProjectOverlay />
    </section>
  );
}
