"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

const NODES = [
  { id: "user", label: "USER", x: 90, y: 60, sub: "REGISTER" },
  { id: "login", label: "LOGIN", x: 250, y: 60, sub: "SESSION" },
  { id: "product", label: "PRODUCT", x: 410, y: 60, sub: "CATALOGUE" },
  { id: "cart", label: "CART", x: 250, y: 200, sub: "STATE" },
  { id: "checkout", label: "CHECKOUT", x: 410, y: 200, sub: "ORDER" },
  { id: "db", label: "DATABASE", x: 90, y: 200, sub: "PASSWORDS", accent: true },
] as const;

const EDGES: Array<[string, string]> = [
  ["user", "login"],
  ["login", "product"],
  ["product", "cart"],
  ["cart", "checkout"],
  ["checkout", "db"],
  ["login", "db"],
];

const EASE = [0.16, 1, 0.3, 1] as const;

export default function EcommerceVisual() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState<string | null>(null);
  const [pulse, setPulse] = useState(0);

  // packet circulation when nothing is selected
  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setPulse((p) => (p + 1) % EDGES.length), 1100);
    return () => clearInterval(id);
  }, [reduced]);

  const nodeById = Object.fromEntries(NODES.map((n) => [n.id, n]));

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center">
      <svg viewBox="0 0 500 260" className="w-full max-w-xl" role="img" aria-label="E-commerce data flow architecture">
        {/* edges */}
        {EDGES.map(([from, to], i) => {
          const a = nodeById[from];
          const b = nodeById[to];
          const isActive = active === from || active === to;
          const isPulsing = !active && pulse === i;
          return (
            <g key={`${from}-${to}`}>
              <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={isActive ? AMBER : "#45584b"} strokeWidth={isActive ? 1.6 : 1.1} />
              {/* packet dot traveling along the edge */}
              {!reduced && (isActive || isPulsing) && (
                <motion.circle
                  r={isActive ? 3.5 : 2.5}
                  fill={isActive ? AMBER : COBALT}
                  initial={{ cx: a.x, cy: a.y }}
                  animate={{ cx: [a.x, b.x], cy: [a.y, b.y] }}
                  transition={
                    isActive
                      ? { repeat: Infinity, duration: 1.1, ease: "linear" }
                      : { duration: 0.9, ease: "easeInOut" }
                  }
                />
              )}
            </g>
          );
        })}

        {/* nodes */}
        {NODES.map((n) => {
          const isActive = active === n.id;
          return (
            <motion.g
              key={n.id}
              onPointerEnter={() => setActive(n.id)}
              onPointerLeave={() => setActive(null)}
              onClick={() => setActive(isActive ? null : n.id)}
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: EASE }}
              style={{ cursor: "pointer" }}
              data-cursor="INSPECT"
            >
              <rect
                x={n.x - 46}
                y={n.y - 22}
                width="92"
                height="44"
                rx="4"
                fill={isActive ? "#243629" : "#141f19"}
                stroke={isActive ? AMBER : "accent" in n && n.accent ? CYAN : "#45584b"}
                strokeWidth={isActive ? 1.8 : 1.3}
                style={{ transformOrigin: `${n.x}px ${n.y}px` }}
              />
              <text
                x={n.x}
                y={n.y - 1}
                textAnchor="middle"
                fontSize="11"
                fontWeight={700}
                letterSpacing="2"
                fontFamily="var(--font-jetbrains-mono), monospace"
                fill={isActive ? AMBER : "#e4e6d8"}
              >
                {n.label}
              </text>
              <text
                x={n.x}
                y={n.y + 12}
                textAnchor="middle"
                fontSize="7"
                letterSpacing="1.5"
                fontFamily="var(--font-jetbrains-mono), monospace"
                fill={isActive ? "#ff5a1f" : "#64798e"}
              >
                {n.sub}
              </text>
            </motion.g>
          );
        })}
      </svg>

      {/* readout strip — stacks on narrow columns so the two labels never collide */}
      <div className="mt-2 flex min-h-10 w-full max-w-xl flex-col items-center justify-center gap-1 border border-line bg-panel/70 px-4 py-2 text-center sm:h-10 sm:flex-row sm:justify-between sm:gap-6 sm:text-left">
        <motion.span
          key={active ?? "idle"}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="whitespace-nowrap font-mono text-[10px] tracking-[0.2em] text-paper-faint"
        >
          {active
            ? `${nodeById[active as keyof typeof nodeById].label} - ${
                active === "db"
                  ? "PASSWORD STORE UNDER THE FLOW"
                  : active === "cart"
                    ? "CART STATE HELD WHILE YOU SHOP"
                    : active === "checkout"
                      ? "ORDER COMPLETION TIES THE FLOW"
                      : "STAGE IN THE REQUEST FLOW"
              }`
            : "HOVER NODES - PACKETS CIRCULATE"}
        </motion.span>
        <span className="shrink-0 whitespace-nowrap font-mono text-[9px] tracking-[0.2em] text-paper-faint/80">GRADE 12 / NOT DEPLOYED</span>
      </div>
    </div>
  );
}

const AMBER = "#ff5a1f";
const COBALT = "#5b78ff";
const CYAN = "#20c7d9";
