import type { ReactNode } from "react";

/* Shared kit for the project diagrams: thin pastel line-work on the plum
   panel with mono labels. Motion classes (sch-*) live in globals.css;
   SMIL-animated bits carry .sch-motion so reduced motion can hide them. */

export const C = {
  pink: "#ffb3d1",
  mint: "#a8f0d6",
  butter: "#fff1a6",
  sky: "#b5dcff",
  peach: "#ffcaa6",
  lilac: "#dccfff",
};
export const TEXT = "#fbf3e8";
export const DIM = "#b5a8ca";
export const PANEL = "#2a1d40";

export function Frame({
  fig,
  title,
  status,
  label,
  caption,
  children,
}: {
  fig: string;
  title: string;
  status: string;
  label: string;
  caption: string;
  children: ReactNode;
}) {
  return (
    <figure>
      <svg viewBox="0 0 600 400" className="h-auto w-full font-mono" role="img" aria-label={label}>
        <defs>
          <pattern id="sch-dots" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.9" fill={TEXT} fillOpacity="0.14" />
          </pattern>
          <marker id="sch-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0 1L9 5L0 9Z" fill={DIM} />
          </marker>
          <filter id="sch-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="2.5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <rect x="0.75" y="0.75" width="598.5" height="398.5" rx="14" fill="url(#sch-dots)" stroke={TEXT} strokeOpacity="0.12" strokeWidth="1.5" />

        {/* title block */}
        <text x="20" y="28" fontSize="10" fontWeight={700} letterSpacing="1.5" fill={C.pink}>
          {fig}
        </text>
        <text x="74" y="28" fontSize="10" letterSpacing="1.5" fill={TEXT}>
          {title}
        </text>
        <circle cx={572 - status.length * 7.5} cy="24.5" r="3" fill={C.mint} className="sch-pulse" />
        <text x="580" y="28" textAnchor="end" fontSize="10" letterSpacing="1.5" fill={DIM}>
          {status}
        </text>
        <line x1="20" y1="38" x2="580" y2="38" stroke={TEXT} strokeOpacity="0.1" />

        {children}
      </svg>
      <figcaption className="mt-3 text-center text-sm leading-snug text-[#d6cbe3]">{caption}</figcaption>
    </figure>
  );
}

/** labelled system block */
export function Block({
  x,
  y,
  w,
  h,
  color,
  title,
  sub,
  children,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
  title: string;
  sub?: string;
  children?: ReactNode;
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="8" fill={color} fillOpacity="0.06" stroke={color} strokeOpacity="0.8" strokeWidth="1.5" />
      <text x={x + 10} y={y + 17} fontSize="9.5" fontWeight={700} letterSpacing="1.2" fill={color}>
        {title}
      </text>
      {sub && (
        <text x={x + w - 10} y={y + 17} textAnchor="end" fontSize="8" letterSpacing="0.8" fill={DIM}>
          {sub}
        </text>
      )}
      {children}
    </g>
  );
}

/** signal line with glowing packets travelling along it */
export function Bus({
  d,
  color,
  dur = 1.8,
  count = 2,
  dashed = false,
}: {
  d: string;
  color: string;
  dur?: number;
  count?: number;
  dashed?: boolean;
}) {
  return (
    <g>
      <path d={d} fill="none" stroke={color} strokeOpacity="0.55" strokeWidth="1.5" strokeDasharray={dashed ? "4 5" : undefined} markerEnd="url(#sch-arrow)" />
      {Array.from({ length: count }).map((_, i) => (
        <circle key={i} r="3" fill={color} filter="url(#sch-glow)" className="sch-motion">
          <animateMotion dur={`${dur}s`} begin={`${(-dur * i) / count}s`} repeatCount="indefinite" path={d} />
        </circle>
      ))}
    </g>
  );
}

/** numbered pipeline strip; each stage lights up in turn while a packet runs the length */
export function Pipeline({ y, items, colors }: { y: number; items: string[]; colors: string[] }) {
  const gap = 14;
  const w = (560 - gap * (items.length - 1)) / items.length;
  const step = 1.1;
  const dur = items.length * step;
  return (
    <g>
      <line x1="20" y1={y + 14} x2="580" y2={y + 14} stroke={DIM} strokeOpacity="0.35" strokeDasharray="2 4" />
      {items.map((t, i) => {
        const x = 20 + i * (w + gap);
        const c = colors[i % colors.length];
        return (
          <g key={t}>
            <rect x={x} y={y} width={w} height="28" rx="6" fill={PANEL} stroke={c} strokeOpacity="0.45" strokeWidth="1.2" />
            <rect
              x={x}
              y={y}
              width={w}
              height="28"
              rx="6"
              fill={c}
              fillOpacity="0.2"
              stroke={c}
              strokeWidth="1.5"
              className="sch-seq"
              style={{ animationDuration: `${dur}s`, animationDelay: `${i * step}s` }}
            />
            <text x={x + w / 2} y={y + 18} textAnchor="middle" fontSize="9" letterSpacing="1" fill={TEXT}>
              {t}
            </text>
          </g>
        );
      })}
      <circle r="3" fill={TEXT} filter="url(#sch-glow)" className="sch-motion">
        <animateMotion dur={`${dur}s`} repeatCount="indefinite" path={`M20 ${y + 14} H580`} />
      </circle>
    </g>
  );
}
