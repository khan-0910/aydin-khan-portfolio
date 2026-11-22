import type { Project } from "./projects";

/** My biggest project, and the only one real people use right now. */
export const FEATURED: Project = {
  id: "apta",
  number: "LIVE",
  name: "APTA Empowers",
  category: "EDUCATION & SOCIAL WELFARE PLATFORM",
  year: "Live",
  status: "LIVE",
  tagline: "A scholarship and welfare website for APTA in Salem, in English and Tamil, used by real students, staff and admins.",
  description:
    "APTA used to handle scholarship applications on paper, in two languages, and families had no way to check where their application was. I built the website they use now: students apply online, staff review the applications, and admins approve and fund them, with every rupee tracked.",
  hardware: [],
  software: [],
  visual: "apta",
  links: [
    { label: "OPEN THE LIVE SITE", href: "https://apta-funding.vercel.app/" },
    { label: "REPO", href: "https://github.com/khan-0910/APTA-funding" },
  ],
  sections: [
    {
      heading: "WHY I MADE IT",
      body: [
        "Applications were paper forms tracked by hand, so it was hard for anyone to know what stage an application was at.",
      ],
    },
    {
      heading: "WHAT I BUILT",
      body: [
        "An online version of their 8-section paper form, with Tamil next to every field and checks for Aadhaar and phone numbers.",
        "Three kinds of users: students apply and track progress, staff review, and admins approve, fund and add staff.",
        "Pages for beneficiaries, partners, a funding ledger, progress reports and file uploads.",
      ],
    },
    {
      heading: "HOW IT WORKS",
      body: [
        "Each person only sees what their role allows, so a student can't open someone else's application.",
        "Changes show up live for everyone, and it warns you if two people edit the same record.",
      ],
    },
  ],
};
