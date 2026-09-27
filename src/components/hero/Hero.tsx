"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useState } from "react";
import HeroSystem from "./HeroSystem";
import Esp32Module from "./Esp32Module";
import LoadingScreen from "./LoadingScreen";
import MagneticButton from "@/components/ui/MagneticButton";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const reduced = useReducedMotion();
  const [booted, setBooted] = useState(false);
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // cinematic scroll-out: the system sinks, rotates, shrinks and fades as a whole
  const sysY = useTransform(scrollYProgress, [0, 1], [0, 190]);
  const sysRotate = useTransform(scrollYProgress, [0, 1], [0, -7]);
  const sysScale = useTransform(scrollYProgress, [0, 0.85], [1, 0.62]);
  const sysOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const moduleOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const active = booted;

  return (
    <>
      <section
        ref={ref}
        id="home"
        className="theme-light relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-20 pb-24"
      >
        <motion.div style={{ y: textY, opacity: textOpacity }} className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.15fr_0.8fr]">
            {/* ================= LEFT: identity — nothing else ================= */}
            <motion.div style={{ y: textY }}>
              <h1 className="font-display text-[clamp(3.6rem,8vw,7.5rem)] leading-[0.9] font-bold tracking-tight text-navy">
                {["AYDIN", "KHAN"].map((word, wi) => (
                  <span key={word} className="block overflow-hidden">
                    <motion.span
                      className="block"
                      initial={{ y: "110%" }}
                      animate={active ? { y: 0 } : {}}
                      transition={{ delay: 0.12 + wi * 0.12, duration: 0.85, ease: EASE }}
                    >
                      {word}
                    </motion.span>
                  </span>
                ))}
              </h1>

              <motion.div
                className="mt-5 flex items-center gap-3"
                initial={{ opacity: 0 }}
                animate={active ? { opacity: 1 } : {}}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <span className="h-px w-10 bg-amber" />
                <span className="font-mono text-[11px] tracking-[0.32em] text-cobalt">
                  MECHATRONICS &amp; AUTOMATION
                </span>
              </motion.div>

              <motion.p
                className="mt-7 max-w-md text-base leading-relaxed text-navy/70"
                initial={{ opacity: 0, y: 14 }}
                animate={active ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.62, duration: 0.6, ease: EASE }}
              >
                Turning ideas into working systems, from sketch to circuit to code.
              </motion.p>

              <motion.div
                className="mt-9 flex flex-wrap items-center gap-4"
                initial={{ opacity: 0, y: 14 }}
                animate={active ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.74, duration: 0.6, ease: EASE }}
              >
                <MagneticButton href="#projects">EXPLORE PROJECTS</MagneticButton>
                <MagneticButton href={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/cv.pdf`} variant="ghost">
                  VIEW CV
                </MagneticButton>
              </motion.div>
            </motion.div>

            {/* ================= CENTER: the engineering system ================= */}
            <motion.div
              className="relative order-first lg:order-none"
              style={{ y: sysY, opacity: sysOpacity, scale: sysScale, rotate: sysRotate }}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={active ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.35, duration: 0.9, ease: EASE }}
            >
              <HeroSystem />
            </motion.div>

            {/* ================= RIGHT: ESP32 module, closed & quiet ================= */}
            <motion.div
              className="relative mx-auto w-64 sm:w-72 lg:w-full"
              style={{ opacity: moduleOpacity }}
              initial={{ opacity: 0, x: 24 }}
              animate={active ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.55, duration: 0.8, ease: EASE }}
            >
              <Esp32Module />
            </motion.div>
          </div>
        </motion.div>

        {/* scroll cue */}
        <motion.div
          className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={active ? { opacity: 1 } : {}}
          transition={{ delay: 1.1 }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="font-mono text-[8px] tracking-[0.4em] text-navy/95">SCROLL</span>
            <motion.span
              className="block h-8 w-px bg-navy/40"
              animate={reduced ? {} : { scaleY: [1, 0.4, 1], originY: 0 }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </section>

      {/* loader sits ON TOP of the hero — hero is revealed, not swapped in */}
      <LoadingScreen onDone={() => setBooted(true)} />
    </>
  );
}
