import { Block, Bus, C, DIM, Frame, PANEL, Pipeline, TEXT } from "./schematic";

// pin callouts: [label, label box x, y, leader end x, y, colour]
const CALLOUTS = [
  { text: "D13 · LED", x: 40, y: 96, px: 160, py: 143, c: C.pink },
  { text: "~D9 · PWM", x: 296, y: 104, px: 250, py: 143, c: C.butter },
  { text: "5V · GND", x: 40, y: 270, px: 190, py: 240, c: C.peach },
  { text: "A0 · SENSOR", x: 276, y: 270, px: 262, py: 240, c: C.mint },
];
const PARTS = [
  { name: "LED", kind: "OUTPUT", c: C.pink },
  { name: "PUSH BUTTON", kind: "INPUT", c: C.peach },
  { name: "HC-SR04", kind: "DISTANCE", c: C.mint },
  { name: "DHT11", kind: "TEMP / RH", c: C.butter },
  { name: "SG90", kind: "SERVO", c: C.sky },
];

function PartIcon({ i, x, y, c }: { i: number; x: number; y: number; c: string }) {
  const s = { fill: "none", stroke: c, strokeWidth: 1.3 };
  switch (i) {
    case 0:
      return <path d={`M${x - 5} ${y + 6} V${y - 1} a5 5 0 0 1 10 0 V${y + 6} Z`} {...s} />;
    case 1:
      return (
        <g {...s}>
          <rect x={x - 6} y={y - 6} width="12" height="12" rx="2" />
          <circle cx={x} cy={y} r="3" />
        </g>
      );
    case 2:
      return (
        <g {...s}>
          <circle cx={x - 4} cy={y} r="4" />
          <circle cx={x + 5} cy={y} r="4" />
        </g>
      );
    case 3:
      return (
        <g {...s}>
          <rect x={x - 5} y={y - 7} width="10" height="14" rx="1.5" />
          <path d={`M${x - 5} ${y - 2} H${x + 5} M${x - 5} ${y + 3} H${x + 5}`} />
        </g>
      );
    default:
      return (
        <g {...s}>
          <rect x={x - 7} y={y - 4} width="14" height="9" rx="1.5" />
          <path d={`M${x - 3} ${y - 4} V${y - 8} H${x + 6}`} />
        </g>
      );
  }
}

export default function ArduinoVisual() {
  return (
    <Frame
      fig="FIG.05"
      title="AR OVERLAY"
      status="IN PROGRESS"
      label="AR tutor diagram: a camera view tracking an Arduino UNO with pin labels anchored to it, next to a catalog of the components it will teach"
      caption="Point a phone at the UNO: the board is tracked and each pin gets an anchored label."
    >
      <Bus d="M380 182 H398" color={C.lilac} count={1} dur={1} />

      {/* camera view */}
      <Block x={20} y={52} w={360} h={260} color={C.sky} title="CAMERA VIEW" sub="AR FOUNDATION">
        {/* viewfinder corners */}
        <path
          d="M36 92 V76 H52 M348 76 H364 V92 M364 280 V296 H348 M52 296 H36 V280"
          fill="none"
          stroke={TEXT}
          strokeOpacity="0.6"
          strokeWidth="1.5"
        />

        {/* UNO, top view */}
        <rect x="110" y="130" width="190" height="120" rx="8" fill={C.sky} fillOpacity="0.07" stroke={C.sky} strokeWidth="1.5" />
        <rect x="96" y="148" width="26" height="26" rx="2" fill={PANEL} stroke={C.sky} strokeOpacity="0.7" />
        <rect x="98" y="204" width="20" height="22" rx="2" fill={PANEL} stroke={C.sky} strokeOpacity="0.7" />
        <rect x="150" y="137" width="136" height="12" rx="2" fill="none" stroke={C.sky} strokeOpacity="0.5" />
        <rect x="170" y="232" width="116" height="12" rx="2" fill="none" stroke={C.sky} strokeOpacity="0.5" />
        {Array.from({ length: 14 }).map((_, i) => (
          <rect key={`t${i}`} x={153 + i * 9.4} y="140" width="5" height="6" fill={C.sky} fillOpacity="0.6" />
        ))}
        {Array.from({ length: 12 }).map((_, i) => (
          <rect key={`b${i}`} x={173 + i * 9.4} y="235" width="5" height="6" fill={C.sky} fillOpacity="0.6" />
        ))}
        <rect x="190" y="192" width="84" height="22" rx="2" fill={PANEL} stroke={C.sky} />
        <text x="232" y="206" textAnchor="middle" fontSize="7.5" fill={DIM}>
          ATmega328P
        </text>

        {/* tracking lock */}
        <path
          d="M100 136 V120 H116 M294 120 H310 V136 M310 244 V260 H294 M116 260 H100 V244"
          fill="none"
          stroke={C.mint}
          strokeWidth="2"
          className="sch-lock"
        />

        {/* pose axes at the board origin */}
        <g strokeWidth="1.5">
          <line x1="122" y1="238" x2="156" y2="238" stroke={C.pink} markerEnd="url(#sch-arrow)" />
          <line x1="122" y1="238" x2="122" y2="204" stroke={C.mint} markerEnd="url(#sch-arrow)" />
          <line x1="122" y1="238" x2="104" y2="256" stroke={C.lilac} markerEnd="url(#sch-arrow)" />
        </g>

        {/* anchored pin labels */}
        {CALLOUTS.map((o, i) => {
          const w = o.text.length * 5.6 + 12;
          const right = o.x + w < o.px;
          return (
            <g key={o.text} className="sch-notify" style={{ animationDelay: `${i * 0.35}s` }}>
              <line x1={right ? o.x + w : o.x} y1={o.y + 8} x2={o.px} y2={o.py} stroke={o.c} strokeOpacity="0.7" />
              <circle cx={o.px} cy={o.py} r="2.5" fill={o.c} />
              <rect x={o.x} y={o.y} width={w} height="16" rx="3" fill={PANEL} stroke={o.c} />
              <text x={o.x + 6} y={o.y + 11} fontSize="8.5" fill={TEXT}>
                {o.text}
              </text>
            </g>
          );
        })}

        <text x="356" y="92" textAnchor="end" fontSize="7.5" letterSpacing="1" fill={C.mint} className="sch-pulse">
          TRACKING
        </text>
        <line x1="36" y1="78" x2="364" y2="78" stroke={C.mint} strokeOpacity="0.7" filter="url(#sch-glow)" className="sch-scan" />
      </Block>

      {/* component catalog, rows highlight in turn */}
      <Block x={400} y={52} w={180} h={260} color={C.lilac} title="3D CATALOG" sub="5 PARTS">
        {PARTS.map((p, i) => {
          const y = 74 + i * 46;
          return (
            <g key={p.name}>
              <rect x="412" y={y} width="156" height="38" rx="6" fill="none" stroke={C.lilac} strokeOpacity="0.3" />
              <rect
                x="412"
                y={y}
                width="156"
                height="38"
                rx="6"
                fill={p.c}
                fillOpacity="0.14"
                stroke={p.c}
                className="sch-seq"
                style={{ animationDuration: "5s", animationDelay: `${i}s` }}
              />
              <PartIcon i={i} x={430} y={y + 19} c={p.c} />
              <text x="448" y={y + 16} fontSize="9" fill={TEXT}>
                {p.name}
              </text>
              <text x="448" y={y + 29} fontSize="7.5" letterSpacing="0.8" fill={DIM}>
                {p.kind}
              </text>
            </g>
          );
        })}
      </Block>

      <Pipeline y={334} items={["CAMERA", "TRACK", "ANCHOR", "OVERLAY"]} colors={[C.sky, C.mint, C.lilac, C.pink]} />
    </Frame>
  );
}
