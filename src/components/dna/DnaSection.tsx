"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import SectionHeading from "@/components/ui/SectionHeading";

const EASE = [0.16, 1, 0.3, 1] as const;

const BLOCKS = [
  {
    num: "01",
    title: "BUILD",
    note: "Start from nothing but an idea and whatever is on the bench.",
    kind: "build" as const,
  },
  {
    num: "02",
    title: "TEST",
    note: "Power it up. Watch what it actually does, not what it should do.",
    kind: "test" as const,
  },
  {
    num: "03",
    title: "BREAK",
    note: "Something always fails. Finding it is the point.",
    kind: "break" as const,
  },
  {
    num: "04",
    title: "IMPROVE",
    note: "Fix, strengthen, simplify. Then run the cycle again.",
    kind: "improve" as const,
  },
];

/* ------------------------------------------------------------------ */
/* Shared geometry: four components + a hub inside a 200×160 viewBox.  */
/* Each card drives the SAME machine with its own animation vocabulary. */
/* ------------------------------------------------------------------ */

const PARTS = [
  { id: "p1", x: 52, y: 48 },
  { id: "p2", x: 148, y: 48 },
  { id: "p3", x: 52, y: 112 },
  { id: "p4", x: 148, y: 112 },
];

function PartShape({ active, color }: { active: boolean; color: string }) {
  return (
    <rect
      x="-16"
      y="-12"
      width="32"
      height="24"
      fill={active ? `${color}14` : "transparent"}
      stroke={color}
      strokeWidth="1.5"
    />
  );
}

/** BUILD: parts float in, align, connectors snap, assembly locks */
function BuildAnim({ hovered, reduced }: { hovered: boolean; reduced: boolean }) {
  const from: Array<{ x: number; y: number; r: number }> = [
    { x: -70, y: -46, r: -14 },
    { x: 70, y: -50, r: 12 },
    { x: -64, y: 48, r: 10 },
    { x: 66, y: 44, r: -10 },
  ];
  return (
    <svg viewBox="0 0 200 160" className="h-auto w-full" aria-hidden>
      {[0, 1, 2, 3].map((i) => {
        const p = PARTS[i];
        return (
          <motion.line
            key={`c${i}`}
            x1="100"
            y1="80"
            x2={p.x}
            y2={p.y}
            stroke="#3452e0"
            strokeWidth="1.2"
            strokeDasharray="3 3"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={hovered ? { pathLength: 1, opacity: 0.8 } : { pathLength: 0, opacity: 0 }}
            transition={{ delay: hovered ? 0.35 + i * 0.07 : 0, duration: 0.4, ease: EASE }}
          />
        );
      })}
      {PARTS.map((p, i) => (
        <motion.g
          key={p.id}
          initial={{ x: p.x, y: p.y, opacity: 0 }}
          animate={
            hovered && !reduced
              ? { x: p.x, y: p.y, opacity: 1, rotate: 0 }
              : { x: p.x + (reduced ? 0 : from[i].x), y: p.y + (reduced ? 0 : from[i].y), opacity: 0.25, rotate: from[i].r }
          }
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: hovered ? i * 0.06 : 0 }}
          style={{ transformOrigin: `${p.x}px ${p.y}px` }}
        >
          <PartShape active={hovered} color="#ff5a1f" />
        </motion.g>
      ))}
      <motion.circle
        cx="100"
        cy="80"
        r="7"
        fill="none"
        stroke="#ff5a1f"
        strokeWidth="1.5"
        animate={hovered ? { scale: [1, 1.5, 1], opacity: [0.4, 1, 0.5] } : { scale: 1, opacity: 0.35 }}
        transition={{ delay: hovered ? 0.55 : 0, duration: 0.5 }}
        style={{ transformOrigin: "100px 80px" }}
      />
    </svg>
  );
}

/** TEST: system activates, cyan signal travels, sweep passes, waveform appears */
function TestAnim({ hovered, reduced }: { hovered: boolean; reduced: boolean }) {
  return (
    <svg viewBox="0 0 200 160" className="h-auto w-full" aria-hidden>
      {PARTS.map((p, i) => (
        <g key={p.id} transform={`translate(${p.x},${p.y})`}>
          <PartShape active={hovered} color="#20c7d9" />
          <motion.circle
            r="2"
            fill="#20c7d9"
            animate={hovered && !reduced ? { opacity: [0.3, 1, 0.3] } : { opacity: 0.35 }}
            transition={{ duration: 1.1, repeat: hovered && !reduced ? Infinity : 0, delay: i * 0.2 }}
          />
        </g>
      ))}
      <path d="M 52 48 H 148 M 52 112 H 148 M 52 48 V 112 M 148 48 V 112" fill="none" stroke="#20c7d9" strokeOpacity={hovered ? 0.7 : 0.25} strokeWidth="1" />
      {/* measurement sweep */}
      <motion.rect
        x="0"
        width="26"
        height="160"
        fill="url(#testScanGrad)"
        initial={false}
        animate={hovered && !reduced ? { x: [-26, 200] } : { x: -26 }}
        transition={hovered && !reduced ? { duration: 1.6, repeat: Infinity, ease: "linear" } : { duration: 0.3 }}
      />
      <defs>
        <linearGradient id="testScanGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#20c7d9" stopOpacity="0" />
          <stop offset="100%" stopColor="#20c7d9" stopOpacity="0.25" />
        </linearGradient>
      </defs>
      {/* waveform — appears on hover */}
      <motion.path
        d="M 30 138 L 44 138 L 50 126 L 58 148 L 66 120 L 74 146 L 82 132 L 170 132"
        fill="none"
        stroke="#3452e0"
        strokeWidth="1.5"
        initial={{ pathLength: 0 }}
        animate={hovered ? { pathLength: 1, opacity: 0.9 } : { pathLength: 0.3, opacity: 0.3 }}
        transition={{ duration: 0.8, ease: EASE }}
      />
    </svg>
  );
}

/** BREAK: controlled disassembly — parts separate outward, connections snap */
function BreakAnim({ hovered, reduced }: { hovered: boolean; reduced: boolean }) {
  const out: Array<{ x: number; y: number; r: number }> = [
    { x: -46, y: -34, r: -22 },
    { x: 48, y: -38, r: 26 },
    { x: -42, y: 36, r: 18 },
    { x: 44, y: 32, r: -20 },
  ];
  return (
    <svg viewBox="0 0 200 160" className="h-auto w-full" aria-hidden>
      {[0, 1, 2, 3].map((i) => {
        const p = PARTS[i];
        return (
          <motion.line
            key={`c${i}`}
            x1="100"
            y1="80"
            x2={p.x}
            y2={p.y}
            stroke={hovered ? "#ff7657" : "#ff5a1f"}
            strokeWidth="1.2"
            strokeDasharray="4 4"
            initial={false}
            animate={hovered && !reduced ? { pathLength: 0.3, opacity: 0.7 } : { pathLength: 1, opacity: 0.3 }}
            transition={{ duration: 0.35 }}
          />
        );
      })}
      {PARTS.map((p, i) => (
        <motion.g
          key={p.id}
          initial={false}
          animate={
            hovered && !reduced
              ? { x: p.x + out[i].x, y: p.y + out[i].y, rotate: out[i].r, opacity: 0.95 }
              : { x: p.x, y: p.y, rotate: 0, opacity: 0.5 }
          }
          transition={{ type: "spring", stiffness: 170, damping: 15, delay: hovered ? i * 0.05 : 0 }}
          style={{ transformOrigin: `${p.x}px ${p.y}px` }}
        >
          <PartShape active={hovered} color="#ff7657" />
        </motion.g>
      ))}
      {/* coral stress marks */}
      {[
        "M 96 62 l -6 -8 l 4 -3 l 6 8 z",
        "M 116 96 l 8 6 l -3 4 l -8 -6 z",
        "M 92 100 l -7 5 l -2 -4 l 7 -5 z",
      ].map((d, i) => (
        <motion.path
          key={i}
          d={d}
          fill="#ff7657"
          initial={false}
          animate={hovered && !reduced ? { opacity: [0, 1, 0.6] } : { opacity: 0 }}
          transition={hovered && !reduced ? { duration: 0.9, repeat: Infinity, delay: i * 0.25 } : { duration: 0.2 }}
        />
      ))}
    </svg>
  );
}

/** IMPROVE: broken parts reorganize into a better configuration, signals reconnect */
function ImproveAnim({ hovered, reduced }: { hovered: boolean; reduced: boolean }) {
  const scattered: Array<{ x: number; y: number; r: number }> = [
    { x: 22, y: 18, r: -18 },
    { x: 178, y: 22, r: 20 },
    { x: 26, y: 138, r: 14 },
    { x: 174, y: 134, r: -16 },
  ];
  const improved: Array<{ x: number; y: number }> = [
    { x: 76, y: 62 },
    { x: 124, y: 62 },
    { x: 76, y: 98 },
    { x: 124, y: 98 },
  ];
  return (
    <svg viewBox="0 0 200 160" className="h-auto w-full" aria-hidden>
      {[
        [0, 1],
        [0, 2],
        [1, 3],
        [2, 3],
      ].map(([a, b], i) => (
        <motion.line
          key={i}
          x1={hovered ? improved[a].x : scattered[a].x}
          y1={hovered ? improved[a].y : scattered[a].y}
          x2={hovered ? improved[b].x : scattered[b].x}
          y2={hovered ? improved[b].y : scattered[b].y}
          stroke="#20c7d9"
          strokeWidth="1.2"
          strokeDasharray="3 3"
          initial={false}
          animate={hovered ? { pathLength: 1, opacity: 0.85 } : { pathLength: 0.2, opacity: 0.25 }}
          transition={{ duration: 0.5, delay: hovered ? 0.3 + i * 0.06 : 0, ease: EASE }}
        />
      ))}
      {improved.map((p, i) => (
        <motion.g
          key={i}
          initial={false}
          animate={
            hovered && !reduced
              ? { x: p.x, y: p.y, rotate: 0, opacity: 1 }
              : { x: scattered[i].x, y: scattered[i].y, rotate: scattered[i].r, opacity: 0.55 }
          }
          transition={{ type: "spring", stiffness: 210, damping: 18, delay: hovered ? i * 0.05 : 0 }}
          style={{ transformOrigin: "center" }}
        >
          <PartShape active={hovered} color="#3452e0" />
        </motion.g>
      ))}
      {/* stabilized check */}
      <motion.g
        initial={false}
        animate={hovered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
        transition={{ delay: hovered ? 0.6 : 0, duration: 0.35 }}
        style={{ transformOrigin: "100px 138px" }}
      >
        <circle cx="100" cy="138" r="6" fill="none" stroke="#ff5a1f" strokeWidth="1.5" />
        <path d="M 97 138 l 2 2 l 4 -4" fill="none" stroke="#ff5a1f" strokeWidth="1.5" />
      </motion.g>
    </svg>
  );
}

const ANIMS: Record<string, (p: { hovered: boolean; reduced: boolean }) => React.ReactElement> = {
  build: BuildAnim,
  test: TestAnim,
  break: BreakAnim,
  improve: ImproveAnim,
};

function DnaCard({
  block,
  index,
  reduced,
}: {
  block: (typeof BLOCKS)[number];
  index: number;
  reduced: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const Anim = ANIMS[block.kind];

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: EASE }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group relative flex h-full flex-col items-center border border-line/70 bg-panel/50 px-7 pt-10 pb-9 text-center transition-colors hover:border-line-2"
    >
      {/* the machine — identical box for all four cards */}
      <div className="w-full border border-line/50 bg-graphite/40 p-2">
        <Anim hovered={hovered} reduced={reduced} />
      </div>

      <h3 className="mt-8 font-display text-4xl font-bold uppercase tracking-tight text-paper">
        {block.title}
      </h3>
      <p className="mt-3 max-w-[26ch] text-sm leading-relaxed text-paper-faint transition-colors group-hover:text-paper-dim">
        {block.note}
      </p>
      <span
        aria-hidden
        className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-amber transition-transform duration-500 group-hover:scale-x-100"
      />
    </motion.article>
  );
}

export default function DnaSection() {
  const reduced = useReducedMotion();

  return (
    <section id="dna" className="relative py-32 sm:py-44" aria-label="Engineering principles">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <SectionHeading index="03" label="ENGINEERING DNA" title="Four rules of the bench." />

        {/* one deliberate centered composition */}
        <div className="mx-auto mt-20 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {BLOCKS.map((b, i) => (
            <DnaCard key={b.num} block={b} index={i} reduced={!!reduced} />
          ))}
        </div>
      </div>
    </section>
  );
}
