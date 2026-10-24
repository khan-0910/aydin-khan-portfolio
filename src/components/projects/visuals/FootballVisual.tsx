import { Block, C, DIM, Frame, PANEL, Pipeline, TEXT } from "./schematic";

const HOME = [
  [60, 188],
  [100, 120],
  [100, 256],
  [150, 170],
  [200, 232],
  [230, 130],
  [280, 190],
];
// [from, to, passes]
const EDGES = [
  [0, 1, 2],
  [0, 2, 1],
  [1, 3, 3],
  [2, 3, 2],
  [3, 4, 2],
  [3, 5, 4],
  [4, 6, 2],
  [5, 6, 3],
  [1, 5, 1],
  [2, 4, 1],
];
const AWAY = [
  [334, 188],
  [300, 128],
  [300, 250],
  [250, 178],
  [180, 104],
  [190, 284],
];
const BALL = "M60 188 L100 120 L150 170 L230 130 L280 190 L338 188";
const BARS = [40, 62, 30, 72, 48, 56];
const MOMENTUM = "M392 270 L414 256 L436 262 L458 236 L480 248 L502 220 L524 242 L546 228 L568 248";

export default function FootballVisual() {
  return (
    <Frame
      fig="FIG.03"
      title="MATCH ANALYTICS"
      status="IN PROGRESS"
      label="Analytics dashboard for the football project: a pitch with a pass network and the ball moving between players, a passes-per-player bar chart and a momentum line chart"
      caption="Pass networks, per-player stats and momentum: data → process → analyze → visualize."
    >
      <defs>
        <radialGradient id="sch-heat">
          <stop offset="0" stopColor={C.pink} stopOpacity="0.45" />
          <stop offset="1" stopColor={C.pink} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* pitch + pass network */}
      <Block x={20} y={52} w={340} h={260} color={C.mint} title="PITCH MODEL" sub="PASS NETWORK">
        <g fill="none" stroke={C.mint} strokeOpacity="0.45">
          <rect x="32" y="76" width="316" height="224" rx="3" fill={C.mint} fillOpacity="0.03" />
          <line x1="190" y1="76" x2="190" y2="300" />
          <circle cx="190" cy="188" r="28" />
          <rect x="32" y="148" width="40" height="80" />
          <rect x="308" y="148" width="40" height="80" />
        </g>
        <circle cx="230" cy="150" r="64" fill="url(#sch-heat)" className="sch-pulse" />
        {EDGES.map(([a, b, n]) => (
          <line
            key={`${a}-${b}`}
            x1={HOME[a][0]}
            y1={HOME[a][1]}
            x2={HOME[b][0]}
            y2={HOME[b][1]}
            stroke={C.pink}
            strokeOpacity="0.4"
            strokeWidth={n * 0.7}
          />
        ))}
        {AWAY.map(([x, y], i) => (
          <circle key={`a${i}`} cx={x} cy={y} r="5" fill={PANEL} stroke={C.sky} strokeWidth="1.5" />
        ))}
        {HOME.map(([x, y], i) => (
          <circle key={`h${i}`} cx={x} cy={y} r="5.5" fill={C.pink} />
        ))}
        <circle r="3.5" fill={TEXT} filter="url(#sch-glow)" className="sch-motion">
          <animateMotion dur="5s" repeatCount="indefinite" path={BALL} />
        </circle>
      </Block>

      {/* passes per player */}
      <Block x={380} y={52} w={200} h={124} color={C.butter} title="PASSES / PLAYER">
        <line x1="392" y1="160" x2="568" y2="160" stroke={DIM} strokeOpacity="0.5" />
        {BARS.map((h, i) => (
          <rect
            key={i}
            x={398 + i * 28}
            y={160 - h}
            width="16"
            height={h}
            rx="2"
            fill={C.butter}
            fillOpacity="0.35"
            stroke={C.butter}
            className="sch-bar"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </Block>

      {/* momentum line */}
      <Block x={380} y={188} w={200} h={124} color={C.sky} title="MOMENTUM" sub="0 – 90'">
        {[222, 248, 274].map((y) => (
          <line key={y} x1="392" y1={y} x2="568" y2={y} stroke={TEXT} strokeOpacity="0.07" />
        ))}
        <line x1="392" y1="296" x2="568" y2="296" stroke={DIM} strokeOpacity="0.5" />
        <path d={MOMENTUM} pathLength={1} fill="none" stroke={C.sky} strokeWidth="1.8" strokeLinejoin="round" className="sch-draw" />
      </Block>

      <Pipeline y={334} items={["DATA", "PROCESS", "ANALYZE", "VISUALIZE"]} colors={[C.mint, C.butter, C.sky, C.pink]} />
    </Frame>
  );
}
