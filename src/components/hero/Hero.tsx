"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import MagneticButton from "@/components/ui/MagneticButton";
import BlurText from "@/components/bits/BlurText";
import DeskDoodle from "./DeskDoodle";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section
      ref={ref}
      id="home"
      className="theme-light relative flex min-h-[92svh] flex-col justify-center overflow-hidden pt-24 pb-20"
    >
      <motion.div style={{ y: textY, opacity: textOpacity }} className="relative z-10 mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <motion.span
              className="inline-block -rotate-3 font-hand text-[34px] leading-none text-cobalt"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05, duration: 0.6, ease: EASE }}
            >
              hey there, I&apos;m
            </motion.span>
            <h1 className="mt-2 font-display text-[clamp(4rem,10vw,8.5rem)] leading-[0.88] font-extrabold tracking-[-0.04em] text-navy">
              {["Aydin", "Khan."].map((word, wi) => (
                <span key={word} className="block overflow-hidden pb-2">
                  <motion.span
                    className="inline-block"
                    initial={{ y: "110%", rotate: 6 }}
                    animate={{ y: 0, rotate: 0 }}
                    transition={{ delay: 0.12 + wi * 0.12, type: "spring", stiffness: 180, damping: 18 }}
                  >
                    {wi === 1 ? <span className="marker">{word}</span> : word}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.div
              className="mt-6 flex flex-wrap items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              {["Mechatronics & Automation", "VIT Chennai", "class of '29"].map((t, i) => (
                <span
                  key={t}
                  className="pop rounded-full bg-panel px-3 py-1 text-sm font-semibold text-navy"
                  style={{ rotate: `${[-2, 1.5, -1][i]}deg` }}
                >
                  {t}
                </span>
              ))}
            </motion.div>

            <BlurText
              text="I like taking ideas apart and building them back into things that move, blink and (usually) work."
              trigger="load"
              delay={60}
              className="mt-7 max-w-lg text-xl leading-relaxed font-medium text-navy"
            />

            <motion.div
              className="mt-9 flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.74, duration: 0.6, ease: EASE }}
            >
              <MagneticButton href="#projects">See my projects</MagneticButton>
              <MagneticButton href={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/cv.pdf`} variant="ghost">
                Download CV
              </MagneticButton>
            </motion.div>
          </div>

          <motion.div
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, y: -30, rotate: -8 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ delay: 0.45, type: "spring", stiffness: 120, damping: 14 }}
          >
            <DeskDoodle />
          </motion.div>
        </div>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
      >
        <div className="flex flex-col items-center gap-1">
          <span className="font-hand text-xl text-navy">scroll</span>
          <motion.span
            className="block h-8 w-[2px] rounded-full bg-navy"
            animate={reduced ? {} : { scaleY: [1, 0.4, 1], originY: 0 }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
