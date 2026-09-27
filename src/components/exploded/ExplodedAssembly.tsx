"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useSpring, useTransform, type MotionValue } from "motion/react";

export type ExplodedPart = {
  id: string;
  num: string;
  name: string;
  /** short form used on the callout so labels stay inside the frame */
  label?: string;
  role: string;
  /** assembled position offset from the part's drawn coordinates */
  rest: { x: number; y: number; r: number };
  /** additional offset applied at 100% separation */
  sep: { x: number; y: number; r: number };
  /** callout anchor in drawn coordinates */
  anchor: { x: number; y: number };
  side: "left" | "right";
  /** internal components fade in as separation grows */
  interior?: boolean;
  info: string[];
  render: (selected: boolean) => React.ReactNode;
};

const EASE = [0.16, 1, 0.3, 1] as const;

const PRESETS = [
  { label: "ASSEMBLED", value: 0 },
  { label: "PARTIAL", value: 50 },
  { label: "MAX EXPLODED", value: 100 },
];

function PartView({
  part,
  sep,
  selected,
  anySelected,
  onSelect,
  reduced,
}: {
  part: ExplodedPart;
  sep: MotionValue<number>;
  selected: boolean;
  anySelected: boolean;
  onSelect: () => void;
  reduced: boolean;
}) {
  // movement along defined vectors — translate + rotate only, never scale
  const x = useTransform(sep, [0, 100], [part.rest.x, part.rest.x + part.sep.x]);
  const y = useTransform(sep, [0, 100], [part.rest.y, part.rest.y + part.sep.y]);
  const rotate = useTransform(sep, [0, 100], [part.rest.r, part.rest.r + part.sep.r]);
  // interior parts are hidden while assembled and revealed as the stack opens
  const interiorOpacity = useTransform(sep, [0, 45], [0, 1]);

  return (
    <motion.g
      style={{ x, y, rotate }}
      animate={{ opacity: anySelected && !selected ? 0.28 : 1 }}
      transition={{ opacity: { duration: 0.35 } }}
    >
      <g
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
        style={{ cursor: "pointer" }}
        data-cursor="INSPECT"
      >
        {part.interior ? (
          <motion.g style={{ opacity: interiorOpacity }}>{part.render(selected)}</motion.g>
        ) : (
          part.render(selected)
        )}
        {/* generous invisible hit area around the part (anchor is in assembled-global coords) */}
        <rect
          x={part.anchor.x - part.rest.x - 95}
          y={part.anchor.y - part.rest.y - 45}
          width="190"
          height="90"
          fill="transparent"
        />
      </g>
      {reduced ? null : null}
    </motion.g>
  );
}

function Callout({
  part,
  sep,
  active,
  anySelected,
  onSelect,
}: {
  part: ExplodedPart;
  sep: MotionValue<number>;
  active: boolean;
  anySelected: boolean;
  onSelect: () => void;
}) {
  // anchors are in assembled-global coordinates — ride with the SEPARATION ONLY so the
  // endpoint stays glued to its component at every slider position
  const x = useTransform(sep, [0, 100], [0, part.sep.x]);
  const y = useTransform(sep, [0, 100], [0, part.sep.y]);

  const dir = part.side === "left" ? -1 : 1;
  const elbowX = part.anchor.x + dir * 34;
  const endX = part.anchor.x + dir * 72;
  const endY = part.anchor.y - 16;
  const label = part.label ?? part.name;
  const lineStroke = active ? "#ff5a1f" : "#64798e";
  const numFill = active ? "#ff5a1f" : "#ff5a1f";

  return (
    <motion.g style={{ x, y }}>
      <g
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
        style={{ cursor: "pointer", pointerEvents: "auto" }}
        data-cursor="INSPECT"
      >
        {/* endpoint dot sits on the component */}
        <circle cx={part.anchor.x} cy={part.anchor.y} r="3.5" fill="#e4e6d8" stroke={lineStroke} strokeWidth="1.2" />
        {/* leader line with elbow */}
        <path
          d={`M ${part.anchor.x} ${part.anchor.y} L ${elbowX} ${part.anchor.y} L ${endX} ${endY}`}
          fill="none"
          stroke={lineStroke}
          strokeWidth="1.2"
        />
        {/* label */}
        <text
          x={endX + dir * 7}
          y={endY + 3}
          textAnchor={dir === 1 ? "start" : "end"}
          fontSize="10"
          letterSpacing="2"
          fontFamily="var(--font-jetbrains-mono), monospace"
        >
          <tspan fill={numFill} opacity={active ? 1 : 0.8}>
            {part.num}
          </tspan>
          <tspan fill="#64798e">{" //"}</tspan>
          <tspan fill={active ? "#e4e6d8" : "#79857a"} fontWeight={active ? 600 : 400}>
            {" "}
            {label}
          </tspan>
        </text>
      </g>
    </motion.g>
  );
}

export default function ExplodedAssembly({
  parts,
  title = "EXPLODED VIEW",
  note,
  axis = true,
}: {
  parts: ExplodedPart[];
  title?: string;
  note?: string;
  axis?: boolean;
}) {
  const reduced = useReducedMotion();
  const [sepState, setSepState] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);

  const sep = useSpring(0, { stiffness: 110, damping: 22 });
  useEffect(() => {
    if (reduced) sep.jump(sepState);
    else sep.set(sepState);
  }, [sepState, reduced, sep]);

  const selectedPart = parts.find((p) => p.id === selected) ?? null;
  const onSelect = (id: string) => setSelected((cur) => (cur === id ? null : id));

  return (
    <div className="theme-dark relative flex w-full flex-col" data-exploded-root>
      {/* ── LAYER 3: UI CONTROLS ── */}
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b border-line bg-panel/60 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-4 font-mono text-[10px] tracking-[0.3em] text-paper-faint">
          <span className="flex items-center gap-2">
            <span aria-hidden className="h-1.5 w-1.5 bg-amber" />
            {title}
          </span>
          <span className="text-paper">SEPARATION: {String(Math.round(sepState)).padStart(3, "0")}%</span>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-1.5">
            {PRESETS.map((p) => (
              <button
                key={p.label}
                onClick={() => setSepState(p.value)}
                className={`border px-2.5 py-1.5 font-mono text-[9px] tracking-[0.2em] transition-colors ${
                  sepState === p.value
                    ? "border-amber text-amber"
                    : "border-line-2 text-paper-faint hover:border-paper-dim hover:text-paper-dim"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
          <div className="flex w-full items-center gap-3 sm:w-auto sm:min-w-[200px]">
            <span className="font-mono text-[9px] tracking-[0.2em] text-paper-faint">0</span>
            <input
              type="range"
              min={0}
              max={100}
              value={sepState}
              onChange={(e) => setSepState(Number(e.target.value))}
              aria-label="Explosion separation percentage"
              className="range-tech w-full cursor-pointer"
              style={{ "--fill": `${sepState}%` } as React.CSSProperties}
            />
            <span className="font-mono text-[9px] tracking-[0.2em] text-paper-faint">100</span>
          </div>
        </div>
      </div>

      {/* ── VIEWPORT: assembly dead-center; callouts/info overlay without moving it ── */}
      <div
        className="relative mx-auto w-full max-w-4xl select-none overflow-hidden bg-navy-2"
        onClick={() => setSelected(null)}
        style={{ height: "clamp(380px, 52vw, 520px)" }}
      >
        {axis && (
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 h-full w-px -translate-x-1/2"
            style={{
              background:
                "linear-gradient(to bottom, transparent, rgba(255,90,31,0.3) 18%, rgba(255,90,31,0.3) 82%, transparent)",
            }}
          />
        )}

        {/* ── LAYER 1: PHYSICAL ASSEMBLY (always centered) ── */}
        <svg
          viewBox="-340 -230 680 460"
          className="absolute left-1/2 top-1/2 h-auto w-[min(90%,680px)] -translate-x-1/2 -translate-y-1/2"
          role="img"
          aria-label={`${title} interactive assembly`}
        >
          {parts.map((part) => (
            <PartView
              key={part.id}
              part={part}
              sep={sep}
              selected={selected === part.id}
              anySelected={!!selected}
              onSelect={() => onSelect(part.id)}
              reduced={!!reduced}
            />
          ))}
        </svg>

        {/* ── LAYER 2: CALLOUTS (same coordinate space, pointer-events only on labels) ── */}
        <svg
          viewBox="-340 -230 680 460"
          className="pointer-events-none absolute left-1/2 top-1/2 h-auto w-[min(90%,680px)] -translate-x-1/2 -translate-y-1/2"
          aria-hidden
        >
          {parts.map((part) => (
            <Callout
              key={part.id}
              part={part}
              sep={sep}
              active={selected === part.id}
              anySelected={!!selected}
              onSelect={() => onSelect(part.id)}
            />
          ))}
        </svg>

        {/* ── LAYER 4: INFORMATION (inspection panel slides in) ── */}
        <AnimatePresence>
          {selectedPart && (
            <motion.aside
              key={selectedPart.id}
              initial={{ x: 48, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 32, opacity: 0 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="absolute bottom-3 right-3 z-30 w-[min(320px,calc(100%-24px))] border border-line-2 bg-navy/95 shadow-2xl backdrop-blur-md sm:bottom-6 sm:right-6"
              onClick={(e) => e.stopPropagation()}
              aria-label={`Component inspection: ${selectedPart.name}`}
            >
              <motion.div
                className="h-[2px] origin-left bg-amber"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
              />
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="font-mono text-[10px] tracking-[0.3em] text-amber">
                    {selectedPart.num} // INSPECTION
                  </div>
                  <button
                    onClick={() => setSelected(null)}
                    aria-label="Close inspection"
                    className="flex h-6 w-6 items-center justify-center border border-line-2 text-paper-faint transition-colors hover:border-amber hover:text-amber"
                  >
                    <svg viewBox="0 0 10 10" className="h-2.5 w-2.5" stroke="currentColor" strokeWidth="1.5" aria-hidden><path d="M1 1 L9 9 M9 1 L1 9" /></svg>
                  </button>
                </div>
                <motion.h4
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12, duration: 0.4, ease: EASE }}
                  className="mt-3 font-display text-xl font-bold uppercase tracking-tight text-paper"
                >
                  {selectedPart.name}
                </motion.h4>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="mt-1 font-mono text-[10px] tracking-[0.2em] text-paper-faint"
                >
                  {selectedPart.role}
                </motion.p>
                <ul className="mt-4 space-y-2.5">
                  {selectedPart.info.map((line, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.25 + i * 0.07, duration: 0.35, ease: EASE }}
                      className="flex gap-2.5 text-[12px] leading-relaxed text-paper-dim"
                    >
                      <span aria-hidden className="mt-[7px] h-px w-3 shrink-0 bg-amber" />
                      {line}
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div className="hatch h-2.5" aria-hidden />
            </motion.aside>
          )}
        </AnimatePresence>

        {/* hint */}
        <div className="pointer-events-none absolute bottom-3 left-4 font-mono text-[9px] tracking-[0.25em] text-paper-faint/85 sm:bottom-5 sm:left-6">
          {note ?? "CLICK A COMPONENT TO INSPECT"}
        </div>
      </div>
    </div>
  );
}
