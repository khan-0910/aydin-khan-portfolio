"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * AR ARDUINO INTERACTIVE TUTOR — STARTING SOON / IN DEVELOPMENT.
 * A skeletal UNO that sequentially illuminates pins, spawns component
 * footprints, flows signals, then activates an AR tracking grid.
 * SEE → INTERACT → UNDERSTAND → BUILD
 */

const EASE = [0.16, 1, 0.3, 1] as const;

// digital header pins along the top edge of the UNO
const TOP_PINS = Array.from({ length: 10 }, (_, i) => 150 + i * 28);
// power/analog header along the bottom
const BOT_PINS = Array.from({ length: 8 }, (_, i) => 172 + i * 28);

const COMPONENTS = [
  { id: "led", label: "LED + R", x: 250, y: 120, color: "#ff5a1f", trace: "M 360 254 L 250 254 L 250 136" },
  { id: "button", label: "BUTTON + POT", x: 520, y: 130, color: "#5b78ff", trace: "M 450 254 L 520 254 L 520 146" },
  { id: "hc04", label: "HC-SR04", x: 250, y: 412, color: "#20c7d9", trace: "M 360 260 L 250 260 L 250 396" },
  { id: "dht", label: "DHT11", x: 430, y: 412, color: "#ff7657", trace: "M 440 268 L 440 396" },
  { id: "servo", label: "SG90 SERVO", x: 590, y: 412, color: "#e4e6d8", trace: "M 450 260 L 590 260 L 590 396" },
];

export default function ArduinoVisual({ expanded = false }: { expanded?: boolean }) {
  const reduced = useReducedMotion();

  return (
    <div aria-label="AR Arduino interactive tutor: in development">
      <svg viewBox="0 0 800 520" className="h-auto w-full" role="img" aria-label="Arduino UNO with AR overlay sequence">
        {/* ---------- AR grid (activates after the sequence) ---------- */}
        <motion.g
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 2.2, duration: 0.8 }}
        >
          {Array.from({ length: 9 }).map((_, i) => (
            <motion.line
              key={`v${i}`}
              x1={90 + i * 40}
              y1="30"
              x2={60 + i * 40}
              y2="500"
              stroke="#20c7d9"
              strokeOpacity="0.12"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 2.3 + i * 0.03, duration: 0.5 }}
            />
          ))}
          {Array.from({ length: 6 }).map((_, i) => (
            <line key={`h${i}`} x1="60" y1={70 + i * 80} x2="740" y2={70 + i * 80} stroke="#20c7d9" strokeOpacity="0.1" strokeWidth="1" />
          ))}
          {/* AR corner brackets */}
          {[
            "M 70 60 V 40 H 100",
            "M 730 60 V 40 H 700",
            "M 70 470 V 490 H 100",
            "M 730 470 V 490 H 700",
          ].map((d, i) => (
            <path key={i} d={d} fill="none" stroke="#20c7d9" strokeOpacity="0.6" strokeWidth="1.5" />
          ))}
          <motion.text
            x="108"
            y="52"
            textAnchor="start"
            fontSize="9"
            letterSpacing="2"
            fill="#20c7d9"
            fillOpacity="0.9"
            fontFamily="var(--font-jetbrains-mono), monospace"
          >
            AR TRACKING GRID / SLAM POSE LOCK
          </motion.text>
        </motion.g>

        {/* ---------- UNO board (skeletal wireframe) ---------- */}
        <g transform="translate(160,150)">
          <motion.rect
            x="0"
            y="0"
            width="480"
            height="230"
            rx="8"
            fill="#1c2b23"
            fillOpacity="0.4"
            stroke="#e4e6d8"
            strokeOpacity="0.5"
            strokeWidth="1.5"
            strokeDasharray="6 4"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: EASE }}
          />
          {/* ATmega328P chip */}
          <rect x="200" y="90" width="90" height="28" fill="none" stroke="#e4e6d8" strokeOpacity="0.6" strokeWidth="1" />
          <text x="245" y="107" textAnchor="middle" fontSize="8" fill="#e4e6d8" fillOpacity="0.7" fontFamily="var(--font-jetbrains-mono), monospace">
            ATMEGA328P
          </text>
          {/* USB region */}
          <rect x="0" y="40" width="44" height="30" fill="none" stroke="#e4e6d8" strokeOpacity="0.4" strokeWidth="1" />
          {/* power jack */}
          <rect x="0" y="160" width="36" height="40" fill="none" stroke="#e4e6d8" strokeOpacity="0.4" strokeWidth="1" />
          {/* headers */}
          {TOP_PINS.map((x) => (
            <rect key={x} x={x - 160} y="-10" width="6" height="10" fill="#ffcd8a" fillOpacity="0.75" />
          ))}
          {BOT_PINS.map((x) => (
            <rect key={x} x={x - 160} y="230" width="6" height="10" fill="#ffcd8a" fillOpacity="0.75" />
          ))}

          {/* ---------- pin illumination sequence ---------- */}
          {TOP_PINS.map((x, i) => (
            <motion.circle
              key={`tp${i}`}
              cx={x - 160}
              cy="-14"
              r="4"
              fill="none"
              stroke="#ff5a1f"
              strokeWidth="1.2"
              initial={{ opacity: 0, scale: 0.4 }}
              whileInView={{ opacity: [0, 1, 0.25], scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9 + i * 0.07, duration: 0.5 }}
              style={{ transformOrigin: `${x - 160}px -14px` }}
            />
          ))}
        </g>

        {/* ---------- components appear + signal flows ---------- */}
        {COMPONENTS.map((c, i) => (
          <motion.g
            key={c.id}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1.4 + i * 0.18, duration: 0.5, ease: EASE }}
          >
            <rect x={c.x - 42} y={c.y - 16} width="84" height="32" fill="#1c2b23" fillOpacity="0.55" stroke={c.color} strokeWidth="1.2" />
            <text x={c.x} y={c.y + 3} textAnchor="middle" fontSize="8.5" letterSpacing="1" fill={c.color} fontFamily="var(--font-jetbrains-mono), monospace">
              {c.label}
            </text>
            {/* signal trace — routed from the chip edge, PCB-style */}
            <motion.path
              d={c.trace}
              fill="none"
              stroke={c.color}
              strokeOpacity="0.5"
              strokeWidth="1"
              strokeDasharray="3 4"
              className="animate-dash-flow"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.8 + i * 0.18, duration: 0.5 }}
            />
          </motion.g>
        ))}

        {/* ---------- SEE → INTERACT → UNDERSTAND → BUILD ---------- */}
        <g transform="translate(0,506)" fontFamily="var(--font-jetbrains-mono), monospace">
          {["SEE", "INTERACT", "UNDERSTAND", "BUILD"].map((s, i) => (
            <motion.text
              key={s}
              x={140 + i * 175}
              y="0"
              textAnchor="middle"
              fontSize="10"
              letterSpacing="3"
              fill="#e4e6d8"
              fillOpacity={0.35 + i * 0.15}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 2.5 + i * 0.12 }}
            >
              {s}
            </motion.text>
          ))}
          {["→", "→", "→"].map((arrow, i) => (
            <motion.text
              key={i}
              x={212 + i * 175}
              y="0"
              fontSize="10"
              fill="#ff5a1f"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.8 }}
              viewport={{ once: true }}
              transition={{ delay: 2.62 + i * 0.12 }}
            >
              {arrow}
            </motion.text>
          ))}
        </g>

        {/* status */}
        <motion.text
          x="740"
          y="30"
          textAnchor="end"
          fontSize="9"
          letterSpacing="2"
          fill="#ff7657"
          fontFamily="var(--font-jetbrains-mono), monospace"
          animate={reduced ? {} : { opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 2.4, repeat: Infinity }}
        >
          IN DEVELOPMENT - BUILD STARTING
        </motion.text>
      </svg>
    </div>
  );
}
