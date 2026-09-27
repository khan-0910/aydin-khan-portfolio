import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Aydin Khan",
  description: "What data this website collects and how it is used.",
};

export default function PrivacyPolicy() {
  return (
    <main className="theme-light min-h-screen">
      <div className="mx-auto max-w-3xl px-6 py-24 sm:px-10">
        <p className="font-mono text-[11px] tracking-[0.3em] text-cobalt">LEGAL / 01</p>
        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-navy sm:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-3 font-mono text-[11px] tracking-[0.2em] text-navy/60">
          LAST UPDATED: SEPTEMBER 2026
        </p>

        <div className="mt-12 space-y-10 text-[15px] leading-relaxed text-navy/80">
          <section>
            <h2 className="font-mono text-[13px] font-medium tracking-[0.2em] text-navy">SCOPE</h2>
            <p className="mt-3">
              This policy covers this website only. It describes what information is collected when
              you visit, why, and what happens to it. If anything here is unclear, contact
              aydin.khan2025@vitstudent.ac.in.
            </p>
          </section>

          <section>
            <h2 className="font-mono text-[13px] font-medium tracking-[0.2em] text-navy">WHAT IS COLLECTED</h2>
            <p className="mt-3">
              This site is a static portfolio. It has no accounts, no forms that store data, and no
              comment sections. It does not sell, rent, or share personal information, because it
              does not collect any in the first place.
            </p>
            <p className="mt-3">
              Like nearly all websites, the hosting provider (Vercel) automatically records standard
              technical logs for security and reliability: IP address, browser type, pages requested,
              and timestamps. That is infrastructure logging, not profiling.
            </p>
          </section>

          <section>
            <h2 className="font-mono text-[13px] font-medium tracking-[0.2em] text-navy">COOKIES AND ANALYTICS</h2>
            <p className="mt-3">
              This site sets no tracking cookies and runs no advertising or cross-site analytics.
              If a privacy-respecting analytics counter is added later, this page will be updated
              before that happens.
            </p>
          </section>

          <section>
            <h2 className="font-mono text-[13px] font-medium tracking-[0.2em] text-navy">THIRD PARTIES</h2>
            <p className="mt-3">
              The site loads fonts from Google Fonts and is hosted on Vercel. Requests to these
              services are covered by their own privacy policies. No other third-party services are
              embedded.
            </p>
          </section>

          <section>
            <h2 className="font-mono text-[13px] font-medium tracking-[0.2em] text-navy">CONTACT</h2>
            <p className="mt-3">
              Questions about this policy: aydin.khan2025@vitstudent.ac.in
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
