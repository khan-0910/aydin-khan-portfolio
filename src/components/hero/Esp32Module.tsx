"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Right-side hero module — a miniature CAD inspection tool.
 * IDLE: a clean closed assembly. No labels, no text.
 * HOVER: components separate along believable axes, connection lines appear,
 *        small technical labels surface while inspecting, signals illuminate.
 * LEAVE: everything smoothly returns to the closed assembly.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Esp32Module({ className }: { className?: string }) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={`relative ${className ?? ""}`}
      initial="closed"
      whileHover={reduced ? "closed" : "open"}
      animate="closed"
      aria-label="ESP32 module: hover to inspect"
    >
      <svg viewBox="0 0 320 340" className="h-auto w-full overflow-visible">
        {/* ================== TOP: SENSOR breakout (explodes up) ================== */}
        <motion.g
          variants={{ closed: { x: 0, y: 0, rotate: 0 }, open: { x: -6, y: -66, rotate: -3 } }}
          transition={{ duration: 0.6, ease: EASE }}
          style={{ transformOrigin: "160px 130px" }}
        >
          <rect x="120" y="92" width="80" height="52" fill="#e2e6cf" stroke="#22322a" strokeWidth="1.5" />
          <rect x="128" y="100" width="26" height="18" fill="none" stroke="#22322a" strokeOpacity="0.5" strokeWidth="1" />
          <circle cx="185" cy="109" r="8" fill="none" stroke="#20c7d9" strokeWidth="1.2" />
          {[0, 1, 2].map((i) => (
            <rect key={i} x={132 + i * 22} y="136" width="4" height="8" fill="#22322a" fillOpacity="0.7" />
          ))}
          {/* inspecting label */}
          <motion.g variants={{ closed: { opacity: 0 }, open: { opacity: 1 } }} transition={{ delay: 0.25, duration: 0.3 }}>
            <line x1="160" y1="92" x2="160" y2="68" stroke="#ff5a1f" strokeWidth="1" />
            <circle cx="160" cy="66" r="2" fill="#ff5a1f" />
            <text x="170" y="69" fontSize="9" fill="#22322a" fontFamily="var(--font-jetbrains-mono), monospace" letterSpacing="1">SENSOR BREAKOUT</text>
          </motion.g>
        </motion.g>

        {/* ================== MIDDLE: ESP32 PCB ================== */}
        <motion.g
          variants={{ closed: { x: 0, y: 0, rotate: 0 }, open: { rotate: 1.5 } }}
          transition={{ duration: 0.6, ease: EASE }}
          style={{ transformOrigin: "160px 190px" }}
        >
          <rect x="86" y="150" width="148" height="78" rx="3" fill="#22322a" fillOpacity="0.92" stroke="#22322a" strokeWidth="1.5" />
          <path d="M 196 158 h 26 v 14 M 202 158 v 8 M 210 158 v 8 M 218 158 v 8" fill="none" stroke="#20c7d9" strokeWidth="1.2" />
          <rect x="98" y="158" width="56" height="30" fill="#e2e6cf" fillOpacity="0.12" stroke="#e2e6cf" strokeOpacity="0.5" strokeWidth="1" />
          <text x="126" y="177" textAnchor="middle" fontSize="7" fill="#e2e6cf" fillOpacity="0.75" fontFamily="var(--font-jetbrains-mono), monospace">ESP32</text>
          <rect x="146" y="216" width="28" height="10" fill="#e2e6cf" fillOpacity="0.85" stroke="#e2e6cf" strokeWidth="1" />
          <circle cx="94" cy="222" r="3" fill="#e2e6cf" fillOpacity="0.9" />
          <circle cx="226" cy="222" r="3" fill="#e2e6cf" fillOpacity="0.9" />
          {Array.from({ length: 8 }).map((_, i) => (
            <rect key={i} x={96 + i * 8} y="150" width="4" height="6" fill="#ffcd8a" opacity="0.9" />
          ))}
          {Array.from({ length: 8 }).map((_, i) => (
            <rect key={`b${i}`} x={96 + i * 8} y="222" width="4" height="6" fill="#ffcd8a" opacity="0.9" />
          ))}
          <path d="M 156 158 v 12 h 10" stroke="#20c7d9" strokeWidth="0.8" fill="none" opacity="0.7" />
          <path d="M 176 188 h 14 v -12" stroke="#20c7d9" strokeWidth="0.8" fill="none" opacity="0.7" />

          {/* inspecting label */}
          <motion.g variants={{ closed: { opacity: 0 }, open: { opacity: 1 } }} transition={{ delay: 0.15, duration: 0.3 }}>
            <line x1="234" y1="185" x2="266" y2="185" stroke="#ff5a1f" strokeWidth="1" />
            <text x="270" y="188" fontSize="9" fill="#ff5a1f" fontFamily="var(--font-jetbrains-mono), monospace" letterSpacing="1">ESP32-WROOM</text>
          </motion.g>
          {/* idle signal pulse on the antenna — the only idle motion */}
          <motion.circle
            cx="209"
            cy="165"
            r="2.5"
            fill="#20c7d9"
            animate={reduced ? {} : { opacity: [0.25, 0.8, 0.25] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.g>

        {/* ================== BOTTOM: connector deck (explodes down) ================== */}
        <motion.g
          variants={{ closed: { x: 0, y: 0 }, open: { x: 4, y: 60 } }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <rect x="104" y="246" width="112" height="26" fill="none" stroke="#22322a" strokeWidth="1.5" />
          <rect x="112" y="252" width="20" height="14" fill="none" stroke="#3452e0" strokeWidth="1.2" />
          <rect x="188" y="252" width="20" height="14" fill="none" stroke="#3452e0" strokeWidth="1.2" />
          <line x1="140" y1="259" x2="180" y2="259" stroke="#22322a" strokeOpacity="0.4" strokeWidth="1" strokeDasharray="3 3" />
          {/* inspecting label */}
          <motion.g variants={{ closed: { opacity: 0 }, open: { opacity: 1 } }} transition={{ delay: 0.3, duration: 0.3 }}>
            <line x1="216" y1="259" x2="248" y2="259" stroke="#ff5a1f" strokeWidth="1" />
            <text x="252" y="262" fontSize="9" fill="#22322a" fillOpacity="0.8" fontFamily="var(--font-jetbrains-mono), monospace" letterSpacing="1">I/O DECK</text>
          </motion.g>
        </motion.g>

        {/* ================== WIRES: appear only while inspecting ================== */}
        <motion.path
          d="M 60 215 C 90 215 96 165 126 165"
          fill="none"
          stroke="#3452e0"
          strokeWidth="1.5"
          strokeDasharray="5 4"
          variants={{ closed: { opacity: 0 }, open: { opacity: 0.9 } }}
          transition={{ duration: 0.5, ease: EASE }}
        />
        <motion.path
          d="M 260 215 C 230 215 224 165 194 165"
          fill="none"
          stroke="#ff5a1f"
          strokeWidth="1.5"
          strokeDasharray="5 4"
          variants={{ closed: { opacity: 0 }, open: { opacity: 0.9 } }}
          transition={{ duration: 0.5, ease: EASE }}
        />

        {/* ================== GROUND shadow: while inspecting only ================== */}
        <motion.ellipse
          cx="160"
          cy="318"
          rx="96"
          ry="9"
          fill="none"
          stroke="#22322a"
          variants={{ closed: { opacity: 0 }, open: { opacity: 0.3 } }}
          transition={{ duration: 0.5 }}
          strokeWidth="1"
          strokeDasharray="4 4"
        />
      </svg>
    </motion.div>
  );
}
