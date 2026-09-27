"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * PREMIER LEAGUE FOOTBALL ANALYTICS — IN PROGRESS.
 * Living pitch + pipeline: DATA → PROCESS → ANALYZE → VISUALIZE.
 * Everything moves — this project is actively being built.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

const PIPELINE = ["DATA", "PROCESS", "ANALYZE", "VISUALIZE"];

const HOME_XI = [
  { x: 200, y: 260 }, // GK
  { x: 130, y: 170 }, { x: 130, y: 350 },
  { x: 180, y: 120 }, { x: 185, y: 260 }, { x: 180, y: 400 },
  { x: 260, y: 160 }, { x: 265, y: 260 }, { x: 260, y: 360 },
  { x: 340, y: 200 }, { x: 340, y: 320 },
];

const AWAY_XI = [
  { x: 600, y: 260 },
  { x: 670, y: 170 }, { x: 670, y: 350 },
  { x: 620, y: 120 }, { x: 615, y: 260 }, { x: 620, y: 400 },
  { x: 540, y: 160 }, { x: 535, y: 260 }, { x: 540, y: 360 },
  { x: 460, y: 200 }, { x: 460, y: 320 },
];

export default function FootballVisual({ expanded = false }: { expanded?: boolean }) {
  const reduced = useReducedMotion();

  return (
    <div className="relative" aria-label="Football analytics environment: in progress">
      <svg viewBox="0 0 800 520" className="h-auto w-full" role="img" aria-label="Football analytics pitch with player nodes and data pipeline">
        <defs>
          <linearGradient id="fb-ball" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ff5a1f" />
            <stop offset="100%" stopColor="#ff7657" />
          </linearGradient>
        </defs>

        {/* ---------- pitch ---------- */}
        <rect x="60" y="40" width="680" height="440" fill="#1c2b23" fillOpacity="0.35" stroke="#20c7d9" strokeOpacity="0.35" strokeWidth="1.2" />
        {/* halfway line + circle */}
        <line x1="400" y1="40" x2="400" y2="480" stroke="#20c7d9" strokeOpacity="0.3" strokeWidth="1" />
        <circle cx="400" cy="260" r="60" fill="none" stroke="#20c7d9" strokeOpacity="0.3" strokeWidth="1" />
        {/* boxes */}
        <rect x="60" y="150" width="90" height="220" fill="none" stroke="#20c7d9" strokeOpacity="0.3" strokeWidth="1" />
        <rect x="650" y="150" width="90" height="220" fill="none" stroke="#20c7d9" strokeOpacity="0.3" strokeWidth="1" />
        {/* pitch texture — fine grid */}
        <g opacity="0.14">
          {[120, 180, 240, 300, 360, 420].map((y) => (
            <line key={y} x1="60" y1={y} x2="740" y2={y} stroke="#e4e6d8" strokeWidth="0.5" />
          ))}
        </g>

        {/* ---------- player nodes ---------- */}
        {HOME_XI.map((p, i) => (
          <motion.g
            key={`h${i}`}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: 0.2 + i * 0.03, type: "spring", stiffness: 300, damping: 18 }}
            style={{ transformOrigin: `${p.x}px ${p.y}px` }}
          >
            {/* bob via transform, not the cy attribute (attribute animation renders undefined) */}
            <motion.g animate={reduced ? {} : { y: [0, -3, 0] }} transition={{ duration: 2.6 + (i % 4), repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }}>
              <circle cx={p.x} cy={p.y} r="7" fill="#5b78ff" fillOpacity="0.9" />
              <circle cx={p.x} cy={p.y} r="11" fill="none" stroke="#5b78ff" strokeOpacity="0.35" strokeWidth="1" />
            </motion.g>
          </motion.g>
        ))}
        {AWAY_XI.map((p, i) => (
          <motion.g
            key={`a${i}`}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: 0.3 + i * 0.03, type: "spring", stiffness: 300, damping: 18 }}
            style={{ transformOrigin: `${p.x}px ${p.y}px` }}
          >
            <motion.g animate={reduced ? {} : { y: [0, 3, 0] }} transition={{ duration: 2.8 + (i % 4), repeat: Infinity, ease: "easeInOut", delay: i * 0.12 }}>
              <circle cx={p.x} cy={p.y} r="7" fill="#e4e6d8" fillOpacity="0.75" />
              <circle cx={p.x} cy={p.y} r="11" fill="none" stroke="#e4e6d8" strokeOpacity="0.3" strokeWidth="1" />
            </motion.g>
          </motion.g>
        ))}

        {/* ---------- ball path (pass trajectory) ---------- */}
        <motion.path
          d="M 340 320 Q 400 200 460 320"
          fill="none"
          stroke="#ff5a1f"
          strokeWidth="1.5"
          strokeDasharray="5 5"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 0.6, ease: EASE }}
        />
        <motion.circle
          r="5"
          fill="url(#fb-ball)"
          cx="340"
          cy="320"
          animate={reduced ? {} : { offsetDistance: ["0%", "100%"] }}
          style={{
            offsetPath: "path('M 340 320 Q 400 200 460 320')",
            offsetRotate: "0deg",
          }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.6 }}
        />

        {/* ---------- pipeline under pitch ---------- */}
        <g transform="translate(0,506)">
          {PIPELINE.map((stage, i) => (
            <g key={stage}>
              <rect
                x={90 + i * 160}
                y="0"
                width="120"
                height="0" // invisible; text anchor only
                fill="none"
              />
              <motion.text
                x={150 + i * 160}
                y="0"
                textAnchor="middle"
                fontSize="10"
                letterSpacing="3"
                fill="#e4e6d8"
                fillOpacity={0.55 + i * 0.12}
                fontFamily="var(--font-jetbrains-mono), monospace"
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.15, duration: 0.4 }}
              >
                {stage}
              </motion.text>
              {i < PIPELINE.length - 1 && (
                <motion.line
                  x1={212 + i * 160}
                  y1="-4"
                  x2={238 + i * 160}
                  y2="-4"
                  stroke="#20c7d9"
                  strokeWidth="1.2"
                  strokeDasharray="3 3"
                  className="animate-dash-flow"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 + i * 0.15, duration: 0.3 }}
                />
              )}
            </g>
          ))}
        </g>

        {/* ---------- live status tape ---------- */}
        <motion.text
          x="740"
          y="30"
          textAnchor="end"
          fontSize="9"
          letterSpacing="2"
          fill="#ff5a1f"
          fontFamily="var(--font-jetbrains-mono), monospace"
          animate={reduced ? {} : { opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          IN PROGRESS - PIPELINE UNDER CONSTRUCTION
        </motion.text>
      </svg>
    </div>
  );
}
