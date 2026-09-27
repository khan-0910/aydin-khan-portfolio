"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;
const DURATION = 3400;

/** self-drawing path */
function Draw({
  d,
  delay,
  duration = 0.7,
  stroke = "rgba(16,42,67,0.55)",
  width = 1.5,
  dashed = false,
  opacity = 1,
}: {
  d: string;
  delay: number;
  duration?: number;
  stroke?: string;
  width?: number;
  dashed?: boolean;
  opacity?: number;
}) {
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={stroke}
      strokeWidth={width}
      strokeDasharray={dashed ? "4 5" : undefined}
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity }}
      exit={{ opacity: 0 }}
      transition={{ delay, duration, ease: EASE }}
      strokeLinecap="square"
    />
  );
}

export default function LoadingScreen({ onDone }: { onDone: () => void }) {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false);
      onDone();
    }, reduced ? 450 : DURATION + 250);
    const skip = () => {
      setVisible(false);
      onDone();
    };
    window.addEventListener("keydown", skip);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", skip);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  const finish = () => {
    setVisible(false);
    onDone();
  };

  // exploded-preview offsets for the four assembly parts (2.3s-2.7s phase)
  const partX = [0, -54, 54, 0];
  const partY = [0, 14, 14, -46];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[150] flex items-center justify-center overflow-hidden bg-ivory"
          exit={{ opacity: 0, transition: { duration: 0.35, ease: "easeOut" } }}
          aria-hidden
        >
          {/* engineering grid, warm */}
          <motion.div
            className="blueprint-bg-dark absolute -inset-[96px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />

          <motion.div
            className="relative h-auto w-[min(92vw,900px)]"
            animate={reduced ? {} : { scale: [1, 1, 0.92], opacity: [1, 1, 0.55] }}
            transition={{ times: [0, 0.88, 1], duration: DURATION / 1000, ease: "easeInOut" }}
          >
          <svg viewBox="0 0 900 500" className="h-auto w-full" role="img" aria-label="Engineering system initializing">
            {/* centerline + crosshair */}
            <Draw d="M 450 64 V 436" delay={0.0} duration={0.5} stroke="rgba(255,90,31,0.75)" width={1} />
            <Draw d="M 296 250 H 604" delay={0.2} duration={0.55} stroke="rgba(255,90,31,0.55)" width={1} />
            {/* coordinate ticks along horizontal */}
            {[330, 390, 450, 510, 570].map((x, i) => (
              <motion.line
                key={x}
                x1={x}
                y1="246"
                x2={x}
                y2="254"
                stroke="rgba(16,42,67,0.4)"
                strokeWidth="1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 + i * 0.05 }}
              />
            ))}
            <motion.text
              x="612"
              y="254"
              fontSize="9"
              fontFamily="var(--font-jetbrains-mono), monospace"
              fill="rgba(16,42,67,0.5)"
              letterSpacing="2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
            >
              X450
            </motion.text>

            {/* PCB traces drifting in from edges */}
            {[
              { d: "M 60 120 H 180 V 190 H 260", sx: 60, sy: 120, x: -80 },
              { d: "M 840 120 H 720 V 190 H 640", sx: 840, sy: 120, x: 80 },
              { d: "M 60 400 H 200 V 330 H 290", sx: 60, sy: 400, x: -60 },
              { d: "M 840 400 H 700 V 330 H 610", sx: 840, sy: 400, x: 60 },
            ].map((t, i) => (
              <motion.g
                key={i}
                initial={{ x: t.x, opacity: 0 }}
                animate={{ x: 0, opacity: 0.65 }}
                transition={{ delay: 0.4 + i * 0.08, duration: 0.7, ease: EASE }}
              >
                <path d={t.d} fill="none" stroke="#3452e0" strokeWidth="1.2" opacity="0.5" />
                <circle cx={t.sx} cy={t.sy} r="3" fill="#3452e0" opacity="0.6" />
              </motion.g>
            ))}

            {/* assembling components — four abstract parts converge, then micro-explode */}
            <motion.g
              initial={{ x: -140, y: 40, opacity: 0, rotate: -6 }}
              animate={{ x: partX[0], y: partY[0], opacity: 1, rotate: 0 }}
              transition={{ delay: 0.7, duration: 0.5, ease: EASE }}
            >
              <rect x="380" y="220" width="60" height="60" fill="none" stroke="#22322a" strokeWidth="1.5" />
            </motion.g>
            <motion.g
              initial={{ x: 140, y: -30, opacity: 0, rotate: 6 }}
              animate={{ x: partX[1], y: partY[1], opacity: 1, rotate: 0 }}
              transition={{ delay: 0.8, duration: 0.5, ease: EASE }}
            >
              <circle cx="410" cy="250" r="22" fill="none" stroke="#3452e0" strokeWidth="1.5" />
              <line x1="410" y1="232" x2="410" y2="268" stroke="#3452e0" strokeWidth="1" opacity="0.6" />
            </motion.g>
            <motion.g
              initial={{ x: 120, y: 60, opacity: 0, rotate: -4 }}
              animate={{ x: partX[2], y: partY[2], opacity: 1, rotate: 0 }}
              transition={{ delay: 0.9, duration: 0.5, ease: EASE }}
            >
              <rect x="460" y="228" width="44" height="44" fill="none" stroke="#22322a" strokeWidth="1.5" />
              <line x1="460" y1="250" x2="504" y2="250" stroke="#22322a" strokeWidth="1" opacity="0.5" />
            </motion.g>
            <motion.g
              initial={{ y: -120, opacity: 0 }}
              animate={{ x: partX[3], y: partY[3], opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.5, ease: EASE }}
            >
              {/* alert module */}
              <path d="M 430 196 l 20 -14 l 20 14 z" fill="none" stroke="#ff5a1f" strokeWidth="1.5" />
            </motion.g>

            {/* lock flash */}
            <motion.circle
              cx="450"
              cy="250"
              r="34"
              fill="none"
              stroke="#ff5a1f"
              strokeWidth="1"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: [0, 0.8, 0], scale: [0.6, 1.15, 1.35] }}
              transition={{ delay: 1.25, duration: 0.5, ease: "easeOut" }}
              style={{ transformOrigin: "450px 250px" }}
            />

            {/* name reveal — lower band, clear of the center assembly */}
            <motion.text
              x="450"
              y="352"
              textAnchor="middle"
              fontSize="46"
              fontWeight="700"
              letterSpacing="10"
              fill="#22322a"
              fontFamily="var(--font-space-grotesk), system-ui, sans-serif"
              initial={{ opacity: 0, y: 362 }}
              animate={{ opacity: 1, y: 352 }}
              transition={{ delay: 1.4, duration: 0.55, ease: EASE }}
            >
              AYDIN
            </motion.text>
            <motion.text
              x="450"
              y="400"
              textAnchor="middle"
              fontSize="46"
              fontWeight="700"
              letterSpacing="10"
              fill="#22322a"
              fontFamily="var(--font-space-grotesk), system-ui, sans-serif"
              initial={{ opacity: 0, y: 410 }}
              animate={{ opacity: 1, y: 400 }}
              transition={{ delay: 1.6, duration: 0.55, ease: EASE }}
            >
              KHAN
            </motion.text>

            {/* metadata */}
            <motion.text
              x="450"
              y="424"
              textAnchor="middle"
              fontSize="10"
              letterSpacing="4"
              fill="#3452e0"
              fontFamily="var(--font-jetbrains-mono), monospace"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              transition={{ delay: 2.0 }}
            >
              MECHATRONICS &amp; AUTOMATION / VIT CHENNAI
            </motion.text>

            {/* segmented progress — bottom band, below the name block */}
            <g transform="translate(305,462)">
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.rect
                  key={i}
                  x={i * 11}
                  y="0"
                  width="7"
                  height="4"
                  fill={i < 17 ? "#ff5a1f" : "#22322a"}
                  opacity="0.85"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.85 }}
                  transition={{ delay: 2.15 + i * 0.032, duration: 0.12 }}
                />
              ))}
              <motion.text
                x="234"
                y="6"
                fontSize="9"
                letterSpacing="2"
                fill="#22322a"
                fontFamily="var(--font-jetbrains-mono), monospace"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                transition={{ delay: 2.8 }}
              >
                100%
              </motion.text>
            </g>

            {/* phase readout — ONE line at a time, hard-timed handoff (no overlap) */}
            <motion.text
              x="450"
              y="60"
              textAnchor="middle"
              fontSize="10"
              letterSpacing="5"
              fill="rgba(255,90,31,0.9)"
              fontFamily="var(--font-jetbrains-mono), monospace"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{ delay: 0.1, duration: 1.15, times: [0, 0.12, 0.86, 1] }}
            >
              SYSTEM INITIALIZING
            </motion.text>
            <motion.text
              x="450"
              y="60"
              textAnchor="middle"
              fontSize="10"
              letterSpacing="5"
              fill="rgba(36,87,255,0.85)"
              fontFamily="var(--font-jetbrains-mono), monospace"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{ delay: 1.25, duration: 1.15, times: [0, 0.12, 0.86, 1] }}
            >
              GEOMETRY LOADING
            </motion.text>
            <motion.text
              x="450"
              y="60"
              textAnchor="middle"
              fontSize="10"
              letterSpacing="5"
              fill="rgba(16,42,67,0.9)"
              fontFamily="var(--font-jetbrains-mono), monospace"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{ delay: 2.4, duration: 1.0, times: [0, 0.12, 0.85, 1] }}
            >
              MECHATRONIC SYSTEM ONLINE
            </motion.text>

          </svg>
          </motion.div>

          <button
            onClick={finish}
            className="absolute right-6 top-6 border border-navy/30 px-3 py-2 font-mono text-[10px] tracking-[0.3em] text-navy/70 transition-colors hover:border-amber hover:text-amber"
          >
            SKIP
          </button>

          {/* BUILD / TEST / ITERATE footer */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[9px] tracking-[0.4em] text-navy/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2 }}
          >
            BUILD / TEST / ITERATE
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
