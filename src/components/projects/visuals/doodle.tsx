import type { ReactNode } from "react";

/* Shared bits for the project doodles: bright pastels with thick ink
   outlines so they pop on the plum panel. Motion classes live in globals.css. */

export const INK = "#1a1225";
export const C = {
  pink: "#ffb3d1",
  mint: "#a8f0d6",
  butter: "#fff1a6",
  sky: "#b5dcff",
  peach: "#ffcaa6",
  lilac: "#dccfff",
  cream: "#fff8ef",
  hot: "#ff5d8f",
};

/** sticker outline props for any shape */
export const ink = { stroke: INK, strokeWidth: 3, strokeLinejoin: "round" as const };

export function Frame({ label, caption, children }: { label: string; caption: string; children: ReactNode }) {
  return (
    <figure>
      <svg viewBox="0 0 600 400" className="h-auto w-full overflow-visible" role="img" aria-label={label}>
        <defs>
          <pattern id="doodle-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M20 0H0V20" fill="none" stroke={C.cream} strokeOpacity="0.08" />
          </pattern>
          <marker id="doodle-arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
            <path d="M1 1L8 5L1 9" fill="none" stroke={C.cream} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </marker>
        </defs>
        <rect width="600" height="400" rx="18" fill="url(#doodle-grid)" />
        {children}
      </svg>
      <figcaption className="mt-2 text-center font-hand text-2xl leading-tight text-[#fff1a6]">{caption}</figcaption>
    </figure>
  );
}

/** handwritten note in the Caveat font */
export function Hand({
  x,
  y,
  children,
  color = C.cream,
  size = 22,
  rotate = 0,
  anchor = "start",
}: {
  x: number;
  y: number;
  children: ReactNode;
  color?: string;
  size?: number;
  rotate?: number;
  anchor?: "start" | "middle" | "end";
}) {
  return (
    <text
      x={x}
      y={y}
      className="font-hand"
      fontSize={size}
      fontWeight={700}
      fill={color}
      textAnchor={anchor}
      transform={rotate ? `rotate(${rotate} ${x} ${y})` : undefined}
    >
      {children}
    </text>
  );
}

/** hand-drawn arrow along a path */
export function Arrow({ d, dashed = false }: { d: string; dashed?: boolean }) {
  return (
    <path
      d={d}
      fill="none"
      stroke={C.cream}
      strokeWidth="2"
      strokeLinecap="round"
      strokeDasharray={dashed ? "5 6" : undefined}
      markerEnd="url(#doodle-arrow)"
    />
  );
}

/** a row of rounded "step" pills joined by arrows */
export function Steps({ y, items, colors }: { y: number; items: string[]; colors: string[] }) {
  const w = 600 / items.length;
  return (
    <g>
      {items.map((t, i) => {
        const cx = w * i + w / 2;
        return (
          <g key={t}>
            <rect x={cx - w / 2 + 12} y={y} width={w - 24} height="34" rx="17" fill={colors[i % colors.length]} {...ink} />
            <text x={cx} y={y + 23} textAnchor="middle" className="font-hand" fontSize="20" fontWeight={700} fill={INK}>
              {t}
            </text>
            {i < items.length - 1 && <Arrow d={`M${cx + w / 2 - 14} ${y + 17} L${cx + w / 2 + 8} ${y + 17}`} />}
          </g>
        );
      })}
    </g>
  );
}
