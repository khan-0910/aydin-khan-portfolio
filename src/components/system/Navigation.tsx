"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Activities", href: "#activities" },
  { label: "Contact", href: "#contact" },
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
        transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 22 }}
        className="fixed left-1/2 top-5 z-[100] hidden -translate-x-1/2 lg:block"
        aria-label="Primary"
      >
        <div
          className={`flex items-center gap-1 rounded-full border px-2 py-1.5 backdrop-blur-md transition-colors duration-500 ${
            scrolled
              ? "border-[#4a3a63] bg-[#1d1430]/88 shadow-[0_10px_30px_-14px_rgba(29,20,48,0.65)]"
              : "border-[#3d2e55]/90 bg-[#1d1430]/70"
          }`}
        >
          <span aria-hidden className="ml-2 mr-1 h-2.5 w-2.5 animate-sys-pulse rounded-full bg-[#ff5d8f]" />
          {LINKS.map((l) => (
            <button
              key={l.href}
              onClick={() => go(l.href)}
              data-cursor={l.label === "Projects" ? "OPEN" : "INSPECT"}
              className="rounded-full px-3.5 py-1.5 text-[13px] font-medium text-[#d9cfe6] transition-colors hover:bg-[#ff5d8f] hover:text-[#1d1430]"
            >
              {l.label}
            </button>
          ))}
        </div>
      </motion.nav>

      {/* mobile top bar */}
      <header className="fixed inset-x-0 top-0 z-[100] flex items-center justify-between px-5 py-4 lg:hidden">
        <button
          onClick={() => go("#home")}
          className="rounded-full bg-[#1d1430]/80 px-4 py-2 font-display text-[15px] font-bold text-[#fdf0e6] backdrop-blur-md"
          aria-label="Back to top"
        >
          Aydin<span className="text-[#ff5d8f]">.</span>
        </button>
        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[#4a3a63] bg-[#2a1d40]/70 backdrop-blur-md"
        >
          <span aria-hidden className="relative block h-3 w-4">
            <span
              className={`absolute left-0 top-0 h-px w-full bg-[#fbf3e8] transition-transform duration-300 ${
                open ? "translate-y-[6px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-[#fbf3e8] transition-opacity duration-200 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute bottom-0 left-0 h-px w-full bg-[#fbf3e8] transition-transform duration-300 ${
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
            className="fixed inset-0 z-[90] flex flex-col justify-center bg-[#1d1430]/97 px-8 backdrop-blur-xl lg:hidden"
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
                  <span className="font-display text-4xl font-bold tracking-tight text-[#fbf3e8] group-hover:text-[#ff5d8f]">
                    {l.label}
                  </span>
                </motion.button>
              ))}
            </nav>
            <div className="relative mt-10 text-sm text-[#b5a8ca]">
              Mechatronics &amp; Automation · VIT Chennai
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
