/**
 * Deterministic trig helpers for SSR-safe SVG geometry.
 *
 * Raw Math.sin / Math.cos can return engine-specific floating point values
 * (e.g. -17.000000000000014 vs -17.000000000000018 across Node and browsers),
 * which triggers React hydration mismatches on server-rendered SVG attributes.
 * Rounding to 3 decimals makes server and client output bit-identical while
 * staying visually exact (0.001 units in a 600-unit viewBox is subpixel).
 */
export function sin(degOrRad: number): number {
  return round3(Math.sin(degOrRad));
}

export function cos(degOrRad: number): number {
  return round3(Math.cos(degOrRad));
}

function round3(n: number): number {
  return Math.round(n * 1000) / 1000;
}
