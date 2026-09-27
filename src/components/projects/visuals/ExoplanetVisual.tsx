"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * AI EXOPLANET DETECTION — STARTING SOON.
 * Skeletal wireframe aesthetic: orbit rings, faint star field, a single
 * light-curve trace being "measured". Everything dashed/faint — pre-build.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

const STARS: Array<{ x: number; y: number; r: number }> = [
  { x: 90, y: 70, r: 1.4 },
  { x: 180, y: 40, r: 1 },
  { x: 320, y: 90, r: 1.6 },
  { x: 460, y: 50, r: 1.1 },
  { x: 580, y: 100, r: 1.5 },
  { x: 700, y: 60, r: 1 },
  { x: 740, y: 180, r: 1.3 },
  { x: 70, y: 200, r: 1 },
  { x: 620, y: 300, r: 1.2 },
  { x: 120, y: 330, r: 1.4 },
];

export default function ExoplanetVisual({ expanded = false }: { expanded?: boolean }) {
  const reduced = useReducedMotion();

  return (
    <div aria-label="Exoplanet detection pipeline: starting soon">
      <svg viewBox="0 0 800 520" className="h-auto w-full" role="img" aria-label="Skeletal orbital system with light curve pipeline">
        {/* ---------- star field (skeletal) ---------- */}
        {STARS.map((s, i) => (
          <motion.circle
            key={i}
            cx={s.x}
            cy={s.y}
            r={s.r}
            fill="#e4e6d8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: [0, 0.7, 0.3] }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.08, duration: 1.2 }}
          />
        ))}

        {/* ---------- central star + dashed orbit ---------- */}
        <g transform="translate(400,205)">
          <motion.circle
            r="26"
            fill="none"
            stroke="#e4e6d8"
            strokeOpacity="0.7"
            strokeWidth="1.2"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
          />
          <motion.g
            animate={reduced ? {} : { rotate: 360 }}
            transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
          >
            <circle r="120" fill="none" stroke="#20c7d9" strokeOpacity="0.4" strokeWidth="1" strokeDasharray="4 6" />
            {/* transit dip marker */}
            <circle cx="120" cy="0" r="4" fill="#20c7d9" />
          </motion.g>
          <motion.g
            animate={reduced ? {} : { rotate: -360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          >
            <circle r="170" fill="none" stroke="#5b78ff" strokeOpacity="0.35" strokeWidth="1" strokeDasharray="2 8" />
            <circle cx="-170" cy="0" r="3" fill="#5b78ff" />
          </motion.g>
          {/* scientific grid behind */}
          <circle r="205" fill="none" stroke="#e4e6d8" strokeOpacity="0.08" strokeWidth="1" />
        </g>

        {/* ---------- light curve panel ---------- */}
        <g transform="translate(70,360)">
          <rect x="0" y="0" width="300" height="130" fill="#1c2b23" fillOpacity="0.5" stroke="#e4e6d8" strokeOpacity="0.25" strokeWidth="1" />
          <text x="12" y="20" fontSize="9" letterSpacing="2" fill="#e4e6d8" fillOpacity="0.6" fontFamily="var(--font-jetbrains-mono), monospace">
            LIGHT CURVE / FLUX VS TIME
          </text>
          {/* the curve */}
          <motion.path
            d="M 12 70 L 60 66 L 80 68 L 100 64 L 118 90 L 132 62 L 170 66 L 200 63 L 224 88 L 240 65 L 288 67"
            fill="none"
            stroke="#20c7d9"
            strokeWidth="1.5"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, delay: 0.4, ease: EASE }}
          />
          {/* transit dips highlighted */}
          {[118, 224].map((x) => (
            <motion.g key={x} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.4 }}>
              <line x1={x} y1="56" x2={x} y2="96" stroke="#ff5a1f" strokeWidth="1" strokeDasharray="3 3" />
              <text x={x + 5} y="54" fontSize="8" fill="#ff5a1f" fontFamily="var(--font-jetbrains-mono), monospace">DIP?</text>
            </motion.g>
          ))}
        </g>

        {/* ---------- pipeline (right column) ---------- */}
        <g transform="translate(460,400)" fontFamily="var(--font-jetbrains-mono), monospace">
          {["TELESCOPE DATA", "LIGHT CURVE", "SIGNAL PROCESSING", "AI MODEL", "CANDIDATE"].map((stage, i) => (
            <motion.g
              key={stage}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.12, duration: 0.4 }}
            >
              <text x="0" y={i * 26} fontSize="10" letterSpacing="2" fill="#e4e6d8" fillOpacity={0.35 + i * 0.12}>
                {stage}
              </text>
              {i < 4 && (
                <line
                  x1="8"
                  y1={i * 26 + 6}
                  x2="8"
                  y2={(i + 1) * 26 - 6}
                  stroke="#20c7d9"
                  strokeOpacity="0.5"
                  strokeWidth="1"
                  strokeDasharray="2 3"
                />
              )}
            </motion.g>
          ))}
        </g>

        {/* ---------- construction marks ---------- */}
        <motion.g
          animate={reduced ? {} : { opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 2.2, repeat: Infinity }}
        >
          <text x="740" y="30" textAnchor="end" fontSize="9" letterSpacing="2" fill="#ff7657" fontFamily="var(--font-jetbrains-mono), monospace">
            STARTING SOON - PRE-BUILD
          </text>
        </motion.g>
        {/* blueprint corner marks */}
        {[
          "M 20 40 V 20 H 40",
          "M 780 40 V 20 H 760",
          "M 20 480 V 500 H 40",
          "M 780 480 V 500 H 760",
        ].map((d, i) => (
          <path key={i} d={d} fill="none" stroke="#e4e6d8" strokeOpacity="0.3" strokeWidth="1" />
        ))}
      </svg>
    </div>
  );
}
