"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const LINKS = [
  { label: "HOME", href: "#home" },
  { label: "ABOUT", href: "#about" },
  { label: "PROJECTS", href: "#projects" },
  { label: "ACTIVITIES", href: "#activities" },
  { label: "CONTACT", href: "#contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (href: string) => {
    setOpen(false);
    requestAnimationFrame(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    });
  };

  return (
    <>
      {/* desktop floating HUD */}
      <motion.nav
        initial={{ y: -32, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2.9, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed left-1/2 top-5 z-[100] hidden -translate-x-1/2 lg:block"
        aria-label="Primary"
      >
        <div
          className={`flex items-center gap-1 border px-2 py-2 backdrop-blur-md transition-colors duration-500 ${
            scrolled
              ? "border-[#3d4f43] bg-[#141f19]/88 shadow-[0_10px_30px_-14px_rgba(20,31,25,0.65)]"
              : "border-[#33453a]/90 bg-[#141f19]/70"
          }`}
        >
          <span aria-hidden className="mr-2 h-2 w-2 animate-blink bg-[#ff5a1f]" />
          {LINKS.map((l, i) => (
            <button
              key={l.href}
              onClick={() => go(l.href)}
              data-cursor={l.label === "PROJECTS" ? "OPEN" : "INSPECT"}
              className="group relative px-3 py-1.5 font-mono text-[10px] tracking-[0.25em] text-[#c3ccbd] transition-colors hover:text-[#eef0e3]"
            >
              <span className="mr-1 text-[8px] text-[#7f8f82]">0{i + 1}</span>
              {l.label}
              <span
                aria-hidden
                className="absolute inset-x-2 bottom-0 h-px origin-left scale-x-0 bg-amber transition-transform duration-300 group-hover:scale-x-100"
              />
            </button>
          ))}
        </div>
      </motion.nav>

      {/* mobile top bar */}
      <header className="fixed inset-x-0 top-0 z-[100] flex items-center justify-between px-5 py-4 lg:hidden">
        <button
          onClick={() => go("#home")}
          className="font-mono text-[11px] tracking-[0.3em]"
          aria-label="Back to top"
        >
          <span className="text-[#e2e6cf] mix-blend-difference">AK</span>
          <span className="text-amber">.</span>
          <span className="ml-2 text-[#e2e6cf] mix-blend-difference">/ MECHATRONICS</span>
        </button>
        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="relative flex h-10 w-10 items-center justify-center border border-[#3d4f43] bg-[#1c2b23]/70 backdrop-blur-md"
        >
          <span aria-hidden className="relative block h-3 w-4">
            <span
              className={`absolute left-0 top-0 h-px w-full bg-[#e4e6d8] transition-transform duration-300 ${
                open ? "translate-y-[6px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-[#e4e6d8] transition-opacity duration-200 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute bottom-0 left-0 h-px w-full bg-[#e4e6d8] transition-transform duration-300 ${
                open ? "-translate-y-[6px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </header>

      {/* mobile menu sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[90] flex flex-col justify-center bg-[#141f19]/97 px-8 backdrop-blur-xl lg:hidden"
          >
            <div className="grid-machine absolute inset-0 opacity-70" aria-hidden />
            <nav className="relative flex flex-col gap-2" aria-label="Mobile">
              {LINKS.map((l, i) => (
                <motion.button
                  key={l.href}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => go(l.href)}
                  className="group flex items-baseline gap-4 border-b border-line py-4 text-left"
                >
                  <span className="font-mono text-[10px] text-[#ff5a1f]">0{i + 1}</span>
                  <span className="font-display text-3xl font-semibold uppercase tracking-tight text-[#e4e6d8] group-hover:text-[#ff5a1f]">
                    {l.label}
                  </span>
                </motion.button>
              ))}
            </nav>
            <div className="relative mt-10 font-mono text-[10px] tracking-[0.3em] text-[#7f8f82]">
              VIT CHENNAI / MECHATRONICS &amp; AUTOMATION
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
