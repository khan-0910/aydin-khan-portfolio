/**
 * Little sticky-note doodles scattered through the page, in the same hand as
 * the hero's DeskDoodle: thick ink outlines, flat pastel fills, a strip of tape
 * and a Caveat caption. Motion is CSS only (doodle-* classes in globals.css)
 * and switches off under reduced motion.
 */
import type { ReactNode } from "react";
import type React from "react";

/** Positions a doodle in a section's margin. Desktop only, so it never covers content on small screens. */
export function DoodleSlot({ className = "", children }: { className?: string; children: ReactNode }) {
  return <div className={`pointer-events-none absolute z-10 hidden xl:block ${className}`}>{children}</div>;
}

const INK = "#1a1225";
const PINK = "#ff8fb4";
const MINT = "#5fe0c0";
const LILAC = "#b3a4ff";
const BUTTER = "#ffd36e";
const PEACH = "#ffb38a";
const SKY = "#9fd3ff";

type NoteProps = {
  paper: string;
  tape: string;
  tilt: number;
  caption: string;
  label: string;
  className?: string;
  children: ReactNode;
};

function Note({ paper, tape, tilt, caption, label, className = "", children }: NoteProps) {
  return (
    <figure
      aria-hidden
      className={`pop pointer-events-auto relative w-[210px] rotate-(--tilt) rounded-md px-4 pb-3 pt-6 transition-[rotate] duration-500 hover:rotate-0 ${className}`}
      style={{ background: paper, "--tilt": `${tilt}deg` } as React.CSSProperties}
      title={label}
    >
      <span className="absolute -top-3 left-1/2 h-5 w-20 -translate-x-1/2 -rotate-3" style={{ background: tape }} />
      <svg viewBox="0 0 200 140" className="w-full overflow-visible">
        {children}
      </svg>
      <figcaption className="mt-1 font-hand text-[19px] leading-tight text-[#1a1225]">{caption}</figcaption>
    </figure>
  );
}

/** gear outline as a path: `teeth` square-ish teeth around a circle */
function gearPath(cx: number, cy: number, r: number, teeth: number, depth = 6) {
  const pts: string[] = [];
  const step = (Math.PI * 2) / teeth;
  for (let i = 0; i < teeth; i++) {
    const a = i * step;
    const corners = [
      [a - step * 0.25, r],
      [a - step * 0.15, r + depth],
      [a + step * 0.15, r + depth],
      [a + step * 0.25, r],
    ];
    for (const [ang, rad] of corners) {
      pts.push(`${(cx + Math.cos(ang) * rad).toFixed(1)} ${(cy + Math.sin(ang) * rad).toFixed(1)}`);
    }
  }
  return `M${pts.join(" L")} Z`;
}

/* ---------------- mechanical: meshing gears and a wrench ---------------- */
export function MechanicalDoodle({ className }: { className?: string }) {
  return (
    <Note paper="#d4f5ea" tape="#ffd2e3" tilt={-3} caption="gears I keep drawing in lecture margins ⚙" label="Doodle of two meshing gears and a wrench" className={className}>
      <g className="doodle-gear">
        <path d={gearPath(64, 64, 34, 12)} fill={BUTTER} stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
        <circle cx="64" cy="64" r="11" fill="#fff" stroke={INK} strokeWidth="2.5" />
      </g>
      <g className="doodle-gear doodle-gear-rev">
        <path d={gearPath(124, 92, 22, 8)} fill={PINK} stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
        <circle cx="124" cy="92" r="7" fill="#fff" stroke={INK} strokeWidth="2.5" />
      </g>
      {/* wrench */}
      <g transform="rotate(-35 168 40)">
        <rect x="160" y="22" width="14" height="70" rx="7" fill={LILAC} stroke={INK} strokeWidth="2.5" />
        <path d="M152 22 a15 15 0 1 1 30 0 l-7 0 l0 -9 l-16 0 l0 9 Z" fill={LILAC} stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
      </g>
    </Note>
  );
}

/* ---------------- electrical: battery, resistor and a bulb that lights ---------------- */
export function ElectricalDoodle({ className }: { className?: string }) {
  const loop = "M40 40 H160 V112 H40 Z";
  return (
    <Note paper="#fff1b8" tape="#cfeedf" tilt={3} caption="a circuit that worked first try (rare)" label="Doodle of a battery, resistor and light bulb in a loop" className={className}>
      <path d={loop} fill="none" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <circle r="4" fill="#ff5d8f" className="doodle-motion">
        <animateMotion dur="2.4s" repeatCount="indefinite" path={loop} />
      </circle>
      {/* battery */}
      <rect x="26" y="58" width="28" height="40" rx="4" fill={MINT} stroke={INK} strokeWidth="2.5" />
      <rect x="34" y="52" width="12" height="6" rx="1.5" fill={INK} />
      <text x="40" y="83" textAnchor="middle" fontSize="16" fontWeight="700" fill={INK} fontFamily="ui-monospace, monospace">+</text>
      {/* resistor */}
      <rect x="82" y="104" width="38" height="16" rx="8" fill={PEACH} stroke={INK} strokeWidth="2.5" />
      {[92, 100, 108].map((x) => (
        <rect key={x} x={x} y="104" width="4" height="16" fill={INK} opacity="0.75" />
      ))}
      {/* bulb */}
      <circle cx="160" cy="40" r="26" fill={BUTTER} className="doodle-glow" />
      <path d="M148 46 a16 16 0 1 1 24 0 l-3 8 h-18 Z" fill="#fff6c8" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" className="doodle-led" />
      <rect x="152" y="54" width="16" height="10" rx="2" fill={LILAC} stroke={INK} strokeWidth="2.5" />
      <path d="M154 40 l3 -6 l3 6 l3 -6 l3 6" fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Note>
  );
}

/* ---------------- data: bars that grow, a trend line and a magnifier ---------------- */
export function DataDoodle({ className }: { className?: string }) {
  const bars = [
    [30, 44, MINT],
    [58, 70, LILAC],
    [86, 52, PINK],
    [114, 88, BUTTER],
  ] as const;
  return (
    <Note paper="#ffe2cc" tape="#dccfff" tilt={-2} caption="data, right before it becomes a chart" label="Doodle of a bar chart with a trend line and a magnifying glass" className={className}>
      <line x1="20" y1="120" x2="150" y2="120" stroke={INK} strokeWidth="3" strokeLinecap="round" />
      <line x1="20" y1="120" x2="20" y2="20" stroke={INK} strokeWidth="3" strokeLinecap="round" />
      {bars.map(([x, h, c], i) => (
        <rect key={x} x={x} y={120 - h} width="20" height={h} rx="3" fill={c} stroke={INK} strokeWidth="2.5"
          className="doodle-bar" style={{ animationDelay: `${i * 0.25}s` }} />
      ))}
      <path d="M30 70 C 60 60, 80 80, 100 50 S 130 30, 140 22" fill="none" stroke="#ff5d8f" strokeWidth="3" strokeLinecap="round" strokeDasharray="1 7" />
      {/* magnifier */}
      <circle cx="160" cy="58" r="20" fill="#fff" fillOpacity="0.7" stroke={INK} strokeWidth="3" />
      <path d="M150 52 a10 10 0 0 1 10 -6" fill="none" stroke={SKY} strokeWidth="3" strokeLinecap="round" />
      <line x1="174" y1="72" x2="190" y2="90" stroke={INK} strokeWidth="6" strokeLinecap="round" />
    </Note>
  );
}

/* ---------------- code: a laptop with a blinking cursor ---------------- */
export function CodeDoodle({ className }: { className?: string }) {
  return (
    <Note paper="#ece6ff" tape="#ffe2cc" tilt={2} caption="where most of these projects live" label="Doodle of a laptop with code on the screen" className={className}>
      <rect x="34" y="14" width="132" height="86" rx="8" fill="#2b2140" stroke={INK} strokeWidth="2.5" />
      <rect x="44" y="24" width="112" height="66" rx="3" fill="#1d1430" />
      <text x="52" y="44" fontSize="13" fontWeight="700" fill={MINT} fontFamily="ui-monospace, monospace">&lt;/&gt;</text>
      <rect x="52" y="54" width="54" height="5" rx="2.5" fill={PINK} />
      <rect x="60" y="64" width="70" height="5" rx="2.5" fill={LILAC} />
      <rect x="60" y="74" width="40" height="5" rx="2.5" fill={BUTTER} />
      <rect x="104" y="73" width="3" height="8" fill="#fbf3e8" className="doodle-cursor" />
      <path d="M20 100 H180 L170 116 H30 Z" fill={LILAC} stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
      <rect x="86" y="104" width="28" height="5" rx="2.5" fill={INK} opacity="0.4" />
    </Note>
  );
}

/* ---------------- football: a ball bouncing on the pitch ---------------- */
export function FootballDoodle({ className }: { className?: string }) {
  return (
    <Note paper="#fff1b8" tape="#ffd2e3" tilt={-4} caption="the other thing I'm always analysing" label="Doodle of a football bouncing in front of a goal" className={className}>
      {/* goal */}
      <path d="M110 108 V36 H186 V108" fill="none" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      {[124, 138, 152, 166].map((x) => (
        <line key={x} x1={x} y1="38" x2={x} y2="108" stroke={INK} strokeWidth="1.2" opacity="0.35" />
      ))}
      {[52, 68, 84, 100].map((y) => (
        <line key={y} x1="112" y1={y} x2="184" y2={y} stroke={INK} strokeWidth="1.2" opacity="0.35" />
      ))}
      <line x1="10" y1="122" x2="192" y2="122" stroke="#0f7a63" strokeWidth="3" strokeLinecap="round" />
      {/* ball */}
      <g className="doodle-hop">
        <circle cx="58" cy="100" r="20" fill="#fff" stroke={INK} strokeWidth="2.5" />
        <path d="M58 91 l8 6 l-3 9 h-10 l-3 -9 Z" fill={INK} />
        <path d="M58 80 v11 M66 97 l11 -3 M63 106 l6 9 M53 106 l-6 9 M50 97 l-11 -3" stroke={INK} strokeWidth="2" />
      </g>
      <ellipse cx="58" cy="124" rx="16" ry="3" fill={INK} opacity="0.15" />
    </Note>
  );
}
