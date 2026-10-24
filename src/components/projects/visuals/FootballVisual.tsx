import { Arrow, C, Frame, Hand, INK, Steps, ink } from "./doodle";

const HOME = [
  [80, 90],
  [90, 220],
  [150, 150],
  [180, 80],
  [260, 200],
];
const AWAY = [
  [300, 90],
  [320, 225],
  [250, 120],
  [130, 240],
  [355, 155],
];
const PASS = "M80 90 L150 150 L180 80 L260 200 L340 160";
const BARS = [60, 95, 45, 120];

export default function FootballVisual() {
  return (
    <Frame
      label="Doodle of the football analytics project: a pitch with player dots and a ball being passed, a bar chart on a sticky note, and the data pipeline"
      caption="premier league analytics: wiring up the data now"
    >
      {/* pitch */}
      <rect x="30" y="30" width="360" height="250" rx="16" fill={C.mint} {...ink} />
      <g fill="none" stroke={C.cream} strokeWidth="2.5">
        <line x1="210" y1="30" x2="210" y2="280" />
        <circle cx="210" cy="155" r="34" />
        <rect x="30" y="105" width="50" height="100" />
        <rect x="340" y="105" width="50" height="100" />
      </g>

      {/* passing lane + ball */}
      <path d={PASS} fill="none" stroke={C.hot} strokeWidth="2.5" strokeDasharray="6 6" strokeLinecap="round" />
      {HOME.map(([x, y], i) => (
        <circle key={`h${i}`} cx={x} cy={y} r="11" fill={C.pink} {...ink} className="doodle-float" style={{ animationDelay: `${i * -0.6}s` }} />
      ))}
      {AWAY.map(([x, y], i) => (
        <circle key={`a${i}`} cx={x} cy={y} r="11" fill={C.sky} {...ink} className="doodle-float" style={{ animationDelay: `${i * -0.5 - 0.3}s` }} />
      ))}
      <circle r="7" fill={C.cream} {...ink} strokeWidth={2.5}>
        <animateMotion dur="3.5s" repeatCount="indefinite" path={PASS} />
      </circle>
      <Hand x={40} y={312} rotate={-2}>each dot = a player node</Hand>

      {/* sticky note bar chart */}
      <g transform="rotate(3 492 125)">
        <rect x="410" y="30" width="165" height="195" rx="6" fill={C.butter} {...ink} />
        <Hand x={425} y={62} color={INK}>passes / player</Hand>
        <line x1="425" y1="200" x2="560" y2="200" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
        {BARS.map((h, i) => (
          <rect
            key={i}
            x={432 + i * 32}
            y={200 - h}
            width="22"
            height={h}
            rx="4"
            fill={i % 2 ? C.sky : C.pink}
            {...ink}
            strokeWidth={2.5}
            className="bar-grow"
            style={{ animationDelay: `${i * 0.25}s` }}
          />
        ))}
      </g>
      <Arrow d="M300 250 C 360 300, 420 270, 450 236" dashed />

      <Steps y={345} items={["data", "process", "analyze", "visualize"]} colors={[C.lilac, C.peach, C.sky, C.pink]} />
    </Frame>
  );
}
