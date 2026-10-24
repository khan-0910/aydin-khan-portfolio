import { Arrow, C, Frame, Hand, INK, Steps, ink } from "./doodle";

const ORBIT = "M30 150 A120 38 0 1 0 270 150 A120 38 0 1 0 30 150";
const CURVE = "M340 95 H420 C 430 95, 432 140, 445 140 H470 C 483 140, 485 95, 495 95 H560";

export default function ExoplanetVisual() {
  return (
    <Frame
      label="Doodle of the exoplanet project: a planet orbiting a star, and a light curve with a small dip when the planet passes in front"
      caption="exoplanet hunt: spot the tiny dips in starlight (starting soon!)"
    >
      {/* star + orbit + planet */}
      <circle cx="150" cy="150" r="82" fill={C.butter} className="star-glow" />
      <circle cx="150" cy="150" r="55" fill={C.butter} {...ink} />
      <path d="M128 140 q4 -6 8 0 M164 140 q4 -6 8 0 M138 162 q12 10 24 0" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" />
      <path d={ORBIT} fill="none" stroke={C.cream} strokeWidth="2" strokeDasharray="5 7" />
      <circle r="15" fill={C.lilac} {...ink}>
        <animateMotion dur="6s" repeatCount="indefinite" path={ORBIT} />
      </circle>
      {[
        [40, 50],
        [262, 60],
        [60, 262],
        [250, 250],
      ].map(([x, y], i) => (
        <path key={i} d={`M${x} ${y - 8} V${y + 8} M${x - 8} ${y} H${x + 8}`} stroke={C.pink} strokeWidth="3" strokeLinecap="round" className="doodle-led" style={{ animationDelay: `${i * 0.3}s` }} />
      ))}

      {/* light curve on a notebook card */}
      <g transform="rotate(-2 448 130)">
        <rect x="320" y="40" width="255" height="180" rx="12" fill={C.cream} {...ink} />
        <line x1="338" y1="60" x2="338" y2="195" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
        <line x1="338" y1="195" x2="562" y2="195" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
        <Hand x={346} y={74} size={18} color={INK}>brightness</Hand>
        <Hand x={510} y={214} size={18} color={INK}>time →</Hand>
        <path d={CURVE} fill="none" stroke={C.hot} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle r="6" fill={C.lilac} {...ink} strokeWidth={2.5}>
          <animateMotion dur="4s" repeatCount="indefinite" path={CURVE} />
        </circle>
        <Hand x={420} y={176} size={20} color={C.hot}>dip = planet?!</Hand>
      </g>
      <Arrow d="M262 112 C 290 96, 300 100, 318 108" dashed />

      <Steps y={330} items={["light curve", "clean it", "ML model", "candidate?"]} colors={[C.butter, C.mint, C.lilac, C.pink]} />
    </Frame>
  );
}
