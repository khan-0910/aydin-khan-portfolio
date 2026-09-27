import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions - Aydin Khan",
  description: "Terms governing use of this website.",
};

export default function Terms() {
  return (
    <main className="theme-light min-h-screen">
      <div className="mx-auto max-w-3xl px-6 py-24 sm:px-10">
        <p className="font-mono text-[11px] tracking-[0.3em] text-cobalt">LEGAL / 02</p>
        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-navy sm:text-5xl">
          Terms &amp; Conditions
        </h1>
        <p className="mt-3 font-mono text-[11px] tracking-[0.2em] text-navy/60">
          LAST UPDATED: SEPTEMBER 2026
        </p>

        <div className="mt-12 space-y-10 text-[15px] leading-relaxed text-navy/80">
          <section>
            <h2 className="font-mono text-[13px] font-medium tracking-[0.2em] text-navy">USE OF THIS SITE</h2>
            <p className="mt-3">
              This is a personal portfolio. You may browse it freely. Content is provided as-is, for
              information only, with no warranty of accuracy or fitness for any purpose.
            </p>
          </section>

          <section>
            <h2 className="font-mono text-[13px] font-medium tracking-[0.2em] text-navy">INTELLECTUAL PROPERTY</h2>
            <p className="mt-3">
              Text, design, and project documentation on this site belong to Aydin Khan. Project
              names and technical details are described accurately but are not an offer of service,
              partnership, or employment.
            </p>
          </section>

          <section>
            <h2 className="font-mono text-[13px] font-medium tracking-[0.2em] text-navy">STATUS OF PROJECTS</h2>
            <p className="mt-3">
              Projects marked IN DEVELOPMENT or STARTING SOON are exactly that. Descriptions reflect
              the current state of each build and are updated as work progresses. Nothing here
              should be read as a deployed product unless stated otherwise.
            </p>
          </section>

          <section>
            <h2 className="font-mono text-[13px] font-medium tracking-[0.2em] text-navy">LINKS</h2>
            <p className="mt-3">
              External links (email, phone) are provided for contact. This site is not responsible
              for the content of external services.
            </p>
          </section>

          <section>
            <h2 className="font-mono text-[13px] font-medium tracking-[0.2em] text-navy">CHANGES</h2>
            <p className="mt-3">
              These terms may be updated as the site evolves. The date above reflects the latest
              revision.
            </p>
          </section>

          <section>
            <h2 className="font-mono text-[13px] font-medium tracking-[0.2em] text-navy">CONTACT</h2>
            <p className="mt-3">
              Questions about these terms: aydin.khan2025@vitstudent.ac.in
            </p>
          </section>
        </div>

        <p className="mt-16">
          <a href={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/`} className="font-mono text-[11px] tracking-[0.3em] text-cobalt underline underline-offset-4 hover:text-amber">
            BACK TO SITE
          </a>
        </p>
      </div>
    </main>
  );
}
