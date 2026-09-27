"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import Link from "next/link";
import { useRef, type ReactNode } from "react";

type MagneticButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  className?: string;
  cursorLabel?: string;
};

export default function MagneticButton({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  cursorLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 200, damping: 15, mass: 0.5 });
  const y = useSpring(my, { stiffness: 200, damping: 15, mass: 0.5 });

  const onPointerMove = (e: React.PointerEvent) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    mx.set(dx * 0.18);
    my.set(dy * 0.18);
  };

  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  const inner = (
    <motion.span
      whileTap={reduced ? undefined : { scale: 0.96, y: 2 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      className={`relative flex items-center justify-center gap-3 px-7 py-4 font-mono text-[12px] font-medium uppercase tracking-[0.25em] transition-colors duration-300 ${
        variant === "primary"
          ? "btn-primary hover:!text-[var(--color-ivory)]"
          : "border border-line-2 text-paper hover:border-amber hover:text-amber"
      }`}
    >
      {children}
    </motion.span>
  );

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      data-cursor={cursorLabel}
      className={`inline-block ${className}`}
    >
      {href ? (
        <a href={href} onClick={onClick} className="block">
          {inner}
        </a>
      ) : (
        <button type="button" onClick={onClick} className="block">
          {inner}
        </button>
      )}
    </motion.div>
  );
}
