"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useMotionValue, useSpring } from "motion/react";
import { cos, sin } from "@/lib/geometry";

/**
 * Living procedural mechatronic system — the hero centerpiece.
 * IDLE: slow mechanical drift, subtle float, restrained depth. No labels.
 * HOVER: one temporary annotation — the mechanism is the statement.
 */

type Props = { className?: string };

const EASE = [0.16, 1, 0.3, 1] as const;

export default function HeroSystem({ className }: Props) {
  const reduced = useReducedMotion();
  const [hovered, setHovered] = useState(false);

  // very subtle camera parallax — smoothed, restrained
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const yaw = useSpring(mx, { stiffness: 35, damping: 18 });
  const pitch = useSpring(my, { stiffness: 35, damping: 18 });
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced) return;
    const onMove = (e: PointerEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      mx.set(((e.clientX / w) * 2 - 1) * -10); // ±10px max
      my.set(((e.clientY / h) * 2 - 1) * -7);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduced, mx, my]);

  return (
    <div
      ref={parallaxRef}
      className={`relative aspect-square w-full ${className ?? ""}`}
      aria-hidden
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <motion.div style={{ x: yaw, y: pitch }} className="h-full w-full">
      <svg viewBox="0 0 600 600" className="h-full w-full overflow-visible">
        {/* ============ FAR: orbit rings only — atmosphere, not information ============ */}
        <motion.g
          animate={reduced ? {} : { y: [0, -8, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.g
            animate={reduced ? {} : { rotate: 360 }}
            transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "300px 300px" }}
          >
            <circle cx="300" cy="300" r="252" fill="none" stroke="#22322a" strokeOpacity="0.08" strokeWidth="1" strokeDasharray="2 10" />
            <circle cx="300" cy="50" r="3" fill="#ff5a1f" opacity="0.55" />
          </motion.g>
          <motion.g
            animate={reduced ? {} : { rotate: -360 }}
            transition={{ duration: 170, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "300px 300px" }}
          >
            <circle cx="300" cy="300" r="196" fill="none" stroke="#3452e0" strokeOpacity="0.1" strokeWidth="1" strokeDasharray="1 12" />
            <circle cx="496" cy="300" r="2.5" fill="#20c7d9" opacity="0.6" />
          </motion.g>
        </motion.g>

        {/* ============ MID: the mechanism itself ============ */}
        <motion.g
          animate={reduced ? {} : { y: [0, -5, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* --- robotic arm linkage, breathing slowly --- */}
          <g>
            <rect x="284" y="452" width="32" height="20" fill="#22322a" fillOpacity="0.08" stroke="#22322a" strokeOpacity="0.5" strokeWidth="1.2" />
            <circle cx="300" cy="452" r="7" fill="#e2e6cf" stroke="#22322a" strokeWidth="1.5" />
            <circle cx="300" cy="452" r="2.5" fill="#ff5a1f" />
          </g>
          <motion.g
            animate={reduced ? {} : { rotate: [-4, 5, -4] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "300px 452px" }}
          >
            <line x1="300" y1="452" x2="356" y2="352" stroke="#22322a" strokeOpacity="0.75" strokeWidth="5" strokeLinecap="round" />
            <motion.g
              animate={reduced ? {} : { rotate: [8, -10, 8] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformOrigin: "356px 352px" }}
            >
              <line x1="356" y1="352" x2="312" y2="268" stroke="#22322a" strokeOpacity="0.75" strokeWidth="4.5" strokeLinecap="round" />
              <circle cx="356" cy="352" r="6" fill="#e2e6cf" stroke="#22322a" strokeWidth="1.5" />
              <circle cx="356" cy="352" r="2" fill="#3452e0" />
              {/* end effector gripper */}
              <g transform="translate(312,268)">
                <path d="M -12 0 L -20 -10 M -12 0 L -20 10" stroke="#ff5a1f" strokeWidth="2" fill="none" strokeLinecap="square" />
                <circle r="4.5" fill="#e2e6cf" stroke="#22322a" strokeWidth="1.5" />
              </g>
            </motion.g>
          </motion.g>

          {/* --- gear cluster --- */}
          <g transform="translate(180,300)">
            <motion.g
              animate={reduced ? {} : { rotate: 360 }}
              transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: "0px 0px" }}
            >
              <circle r="34" fill="none" stroke="#22322a" strokeOpacity="0.5" strokeWidth="1.5" />
              {Array.from({ length: 12 }).map((_, i) => {
                const a = (i / 12) * Math.PI * 2;
                return (
                  <line
                    key={i}
                    x1={cos(a) * 34}
                    y1={sin(a) * 34}
                    x2={cos(a) * 42}
                    y2={sin(a) * 42}
                    stroke="#22322a"
                    strokeOpacity="0.5"
                    strokeWidth="2"
                  />
                );
              })}
              <circle r="10" fill="none" stroke="#ff5a1f" strokeOpacity="0.7" strokeWidth="1.5" />
            </motion.g>
            {/* meshing small gear */}
            <g transform="translate(58,18)">
              <motion.g
                animate={reduced ? {} : { rotate: -360 }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: "0px 0px" }}
              >
                <circle r="20" fill="none" stroke="#3452e0" strokeOpacity="0.6" strokeWidth="1.5" />
                {Array.from({ length: 8 }).map((_, i) => {
                  const a = (i / 8) * Math.PI * 2;
                  return (
                    <line
                      key={i}
                      x1={cos(a) * 20}
                      y1={sin(a) * 20}
                      x2={cos(a) * 26}
                      y2={sin(a) * 26}
                      stroke="#3452e0"
                      strokeOpacity="0.6"
                      strokeWidth="2"
                    />
                  );
                })}
              </motion.g>
            </g>
          </g>

          {/* --- sparse PCB traces --- */}
          <g stroke="#20c7d9" strokeOpacity="0.4" strokeWidth="1.2" fill="none">
            <path d="M 430 380 H 480 V 420 H 530" />
            <path d="M 430 360 H 500 V 330 H 540" />
          </g>
          <g fill="#20c7d9" opacity="0.5">
            <circle cx="430" cy="380" r="2.5" />
            <circle cx="430" cy="360" r="2.5" />
            <circle cx="530" cy="420" r="2.5" />
            <circle cx="540" cy="330" r="2.5" />
          </g>
        </motion.g>

        {/* ============ HOVER: one temporary annotation ============ */}
        <AnimatePresence>
          {hovered && !reduced && (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              <line x1="312" y1="268" x2="392" y2="232" stroke="#ff5a1f" strokeWidth="1" />
              <circle cx="312" cy="268" r="2" fill="#ff5a1f" />
              <text x="398" y="235" fontSize="10" fill="#ff5a1f" fontFamily="var(--font-jetbrains-mono), monospace" letterSpacing="2">
                END EFFECTOR
              </text>
              {/* brief sweep across the arm reach */}
              <motion.line
                x1="180"
                y1="220"
                x2="356"
                y2="220"
                stroke="#ff5a1f"
                strokeOpacity="0.5"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.7, ease: EASE }}
              />
            </motion.g>
          )}
        </AnimatePresence>

        {/* occasional signal pulse travelling the arm */}
        <motion.circle
          r="3"
          fill="#ff5a1f"
          animate={reduced ? {} : { cx: [300, 356, 312], cy: [452, 352, 268], opacity: [0, 1, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "linear", repeatDelay: 3.2 }}
        />
      </svg>
      </motion.div>
    </div>
  );
}
