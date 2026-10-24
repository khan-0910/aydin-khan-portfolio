import { Block, C, DIM, Frame, PANEL, Pipeline, TEXT } from "./schematic";

// orbit seen almost edge-on: back half behind the star, front half crosses it
const ORBIT_BACK = "M40 190 A115 22 0 0 1 270 190";
const ORBIT_FRONT = "M40 190 A115 22 0 0 0 270 190";

// transit model: flat, ingress, flat bottom, egress
const MODEL = "M326 140 H410 C 418 140, 420 200, 428 200 H462 C 470 200, 472 140, 480 140 H564";
function flux(x: number) {
  if (x < 410 || x > 480) return 140;
  if (x >= 428 && x <= 462) return 200;
  return x < 428 ? 140 + ((x - 410) / 18) * 60 : 200 - ((x - 462) / 18) * 60;
}
// fixed pseudo-noise so the plot looks like real samples
const SAMPLES = Array.from({ length: 40 }).map((_, i) => {
  const x = 330 + i * 6;
  return [x, flux(x) + (((i * 37) % 11) - 5) * 1.8];
});

export default function ExoplanetVisual() {
  return (
    <Frame
      fig="FIG.04"
      title="TRANSIT METHOD"
      status="STARTING SOON"
      label="Transit method diagram for the exoplanet project: a planet crossing in front of its star, and the light curve dipping while it does"
      caption="A planet crossing its star dims the light a little. Find the dips, then let a model flag candidates."
    >
      <defs>
        <radialGradient id="sch-star">
          <stop offset="0" stopColor={C.butter} stopOpacity="1" />
          <stop offset="0.7" stopColor={C.peach} stopOpacity="0.9" />
          <stop offset="1" stopColor={C.peach} stopOpacity="0.5" />
        </radialGradient>
        <radialGradient id="sch-corona">
          <stop offset="0.6" stopColor={C.butter} stopOpacity="0.35" />
          <stop offset="1" stopColor={C.butter} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* star + transiting planet */}
      <Block x={20} y={52} w={270} h={260} color={C.butter} title="STAR" sub="SIDE VIEW">
        <path d={ORBIT_BACK} fill="none" stroke={C.lilac} strokeOpacity="0.4" strokeDasharray="3 5" />
        <circle cx="155" cy="190" r="96" fill="url(#sch-corona)" className="sch-pulse" />
        <circle cx="155" cy="190" r="64" fill="url(#sch-star)" />
        <path d={ORBIT_FRONT} fill="none" stroke={C.lilac} strokeOpacity="0.6" strokeDasharray="3 5" />
        <circle r="9" fill={PANEL} stroke={C.lilac} strokeWidth="1.5" className="sch-motion">
          <animateMotion dur="6s" repeatCount="indefinite" path={ORBIT_FRONT} />
        </circle>
        <text x="32" y="300" fontSize="8" letterSpacing="0.8" fill={DIM}>
          PLANET · R ≪ R★
        </text>
      </Block>

      {/* light curve with a cursor synced to the planet */}
      <Block x={310} y={52} w={270} h={260} color={C.pink} title="LIGHT CURVE" sub="FLUX vs TIME">
        <line x1="326" y1="80" x2="326" y2="290" stroke={DIM} strokeOpacity="0.5" />
        <line x1="326" y1="290" x2="564" y2="290" stroke={DIM} strokeOpacity="0.5" />
        {SAMPLES.map(([x, y]) => (
          <circle key={x} cx={x} cy={y} r="1.6" fill={TEXT} fillOpacity="0.55" />
        ))}
        <path d={MODEL} pathLength={1} fill="none" stroke={C.pink} strokeWidth="2" strokeLinejoin="round" className="sch-draw" />

        {/* depth marker */}
        <path d="M500 140 V200" stroke={C.pink} strokeOpacity="0.7" markerStart="url(#sch-arrow)" markerEnd="url(#sch-arrow)" />
        <text x="508" y="174" fontSize="9" fill={C.pink}>
          ΔF
        </text>
        <text x="445" y="222" textAnchor="middle" fontSize="7.5" letterSpacing="0.8" fill={DIM}>
          TRANSIT
        </text>
        <text x="564" y="304" textAnchor="end" fontSize="7.5" letterSpacing="0.8" fill={DIM}>
          TIME →
        </text>

        <g className="sch-motion">
          <line x1="326" y1="84" x2="326" y2="290" stroke={C.lilac} strokeOpacity="0.7" strokeDasharray="2 3" />
          <animateMotion dur="6s" repeatCount="indefinite" path="M0 0 H238" />
        </g>
      </Block>

      <Pipeline y={334} items={["LIGHT CURVE", "DETREND", "ML MODEL", "CANDIDATES"]} colors={[C.butter, C.mint, C.lilac, C.pink]} />
    </Frame>
  );
}
