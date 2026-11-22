import type { Project } from "./projects";

/** The flagship: the only project serving real users right now. */
export const FEATURED: Project = {
  id: "apta",
  number: "LIVE",
  name: "APTA Empowers",
  category: "EDUCATION & SOCIAL WELFARE PLATFORM",
  year: "Live",
  status: "LIVE",
  tagline: "A bilingual scholarship and welfare platform for Salem, Tamil Nadu, used by students, staff and admins.",
  description:
    "APTA Empowers runs education funding end to end for a real organisation: students apply in English or Tamil, staff review, admins approve and fund, and every rupee lands in a ledger with reports behind it.",
  hardware: [],
  software: [
    "React, Vite and strict TypeScript",
    "Supabase: Postgres, Auth, RLS, Storage, Realtime",
    "Tailwind CSS 4, GSAP and Recharts",
    "GitHub Pages and Vercel",
  ],
  visual: "apta",
  links: [
    { label: "OPEN THE LIVE SITE", href: "https://khan-0910.github.io/APTA-funding/" },
    { label: "REPO", href: "https://github.com/khan-0910/APTA-funding" },
  ],
  sections: [
    {
      heading: "PROBLEM",
      body: [
        "Scholarship applications in Salem were paper forms in two languages, tracked by hand. Families couldn't see where an application stood.",
      ],
    },
    {
      heading: "BUILD",
      body: [
        "An 8-section application form that matches the physical Salem form, with Tamil beside every field, Aadhaar and +91 phone masks, and the bilingual Zakkath undertaking.",
        "Three roles: students apply and track progress, staff review, and admins approve, fund and create staff accounts.",
        "Beneficiaries, partners, a funding ledger, progress reports and file uploads, across 7 tables.",
      ],
    },
    {
      heading: "SYSTEM",
      body: [
        "Supabase Auth with row level security on every table. Realtime updates show new and edited records in every open browser, with edit-conflict detection.",
        "Without Supabase it runs fully on the device's local storage, with the same behaviour.",
        "A keep-alive job and backups keep the free tier awake and recoverable.",
      ],
    },
    {
      heading: "CURRENT STATE",
      body: ["Live on GitHub Pages, with a Vercel deployment ready. It ships with no mock data: every record in it is real."],
    },
  ],
};
