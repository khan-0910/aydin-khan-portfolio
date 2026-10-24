import { Block, Bus, C, DIM, Frame, PANEL, Pipeline, TEXT } from "./schematic";

const DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

// alarm line trace: one 60px pattern repeated, scrolled left by one period
const WAVE =
  "M0 28" +
  Array.from({ length: 8 })
    .map((_, i) => {
      const x = i * 60;
      return ` H${x + 20} V4 H${x + 35} V28 H${x + 42} V4 H${x + 50} V28 H${x + 60}`;
    })
    .join("");

export default function MedicalBoxVisual() {
  return (
    <Frame
      fig="FIG.01"
      title="SYSTEM BLOCK DIAGRAM"
      status="BUILT"
      label="System diagram of the automatic medical box: a 7-day enclosure feeding an ESP32, which drives switches, an alarm and a caretaker app notification"
      caption="Enclosure → ESP32 → switches → alarm, with a push alert to the caretaker."
    >
      <defs>
        <clipPath id="sch-scope-01">
          <rect x="32" y="228" width="366" height="72" />
        </clipPath>
      </defs>

      {/* buses first so blocks sit on top */}
      <Bus d="M250 122 H298" color={C.pink} />
      <Bus d="M410 100 H430 V84 H448" color={C.butter} />
      <Bus d="M410 144 H430 V160 H448" color={C.peach} />
      <Bus d="M380 172 V188 H430 V258 H448" color={C.sky} dashed dur={2.4} />
      <Bus d="M330 172 V202" color={C.lilac} count={1} dur={1.2} />

      {/* enclosure: today's slot walks across the week */}
      <Block x={20} y={52} w={230} h={140} color={C.pink} title="ENCLOSURE" sub="7-DAY">
        {DAYS.map((d, i) => {
          const x = 32 + i * 30;
          return (
            <g key={d}>
              <rect x={x} y="80" width="26" height="70" rx="4" fill="none" stroke={C.pink} strokeOpacity="0.45" />
              <rect
                x={x}
                y="80"
                width="26"
                height="70"
                rx="4"
                fill={C.pink}
                fillOpacity="0.3"
                stroke={C.pink}
                className="sch-seq"
                style={{ animationDuration: "7s", animationDelay: `${i}s` }}
              />
              <circle cx={x + 13} cy="106" r="4" fill={C.pink} fillOpacity="0.7" />
              <circle cx={x + 13} cy="124" r="3" fill={C.pink} fillOpacity="0.4" />
              <text x={x + 13} y="166" textAnchor="middle" fontSize="7.5" fill={DIM}>
                {d}
              </text>
            </g>
          );
        })}
      </Block>

      {/* ESP32 */}
      <Block x={300} y={72} w={110} h={100} color={C.mint} title="ESP32" sub="MCU">
        {Array.from({ length: 5 }).map((_, i) => (
          <g key={i} stroke={C.mint} strokeOpacity="0.6">
            <line x1="318" y1={108 + i * 9} x2="326" y2={108 + i * 9} />
            <line x1="384" y1={108 + i * 9} x2="392" y2={108 + i * 9} />
          </g>
        ))}
        <rect x="326" y="100" width="58" height="54" rx="4" fill={PANEL} stroke={C.mint} />
        <text x="355" y="131" textAnchor="middle" fontSize="8" fill={TEXT}>
          WROOM
        </text>
        <circle cx="376" cy="108" r="2.5" fill={C.mint} className="sch-pulse" />
      </Block>

      {/* switches */}
      <Block x={450} y={52} w={130} h={64} color={C.butter} title="SWITCHES">
        {[0, 1].map((i) => (
          <g key={i}>
            <rect x={464 + i * 54} y="82" width="38" height="18" rx="9" fill="none" stroke={C.butter} strokeOpacity="0.6" />
            <circle cx={473 + i * 54} cy="91" r="5.5" fill={C.butter} className="sch-toggle" style={{ animationDelay: `${i * 1.5}s` }} />
          </g>
        ))}
      </Block>

      {/* alarm */}
      <Block x={450} y={128} w={130} h={64} color={C.peach} title="ALARM">
        <circle cx="478" cy="168" r="10" fill="none" stroke={C.peach} />
        <circle cx="478" cy="168" r="3" fill={C.peach} />
        <circle cx="478" cy="168" r="10" fill="none" stroke={C.peach} className="sch-ring" />
        <circle cx="478" cy="168" r="10" fill="none" stroke={C.peach} className="sch-ring" style={{ animationDelay: "0.9s" }} />
        <text x="500" y="171" fontSize="8" letterSpacing="0.8" fill={DIM}>
          BUZZER
        </text>
      </Block>

      {/* caretaker app */}
      <Block x={450} y={204} w={130} h={108} color={C.sky} title="CARETAKER APP">
        <g className="sch-notify">
          <rect x="462" y="226" width="106" height="38" rx="6" fill={C.sky} fillOpacity="0.14" stroke={C.sky} />
          <text x="472" y="242" fontSize="9" fill={TEXT}>
            Dose due
          </text>
          <text x="472" y="256" fontSize="7.5" fill={DIM}>
            box · today&apos;s slot
          </text>
        </g>
        <rect x="462" y="276" width="80" height="5" rx="2.5" fill={DIM} fillOpacity="0.35" />
        <rect x="462" y="288" width="56" height="5" rx="2.5" fill={DIM} fillOpacity="0.2" />
      </Block>

      {/* alarm line scope */}
      <Block x={20} y={204} w={390} h={108} color={C.lilac} title="ALARM LINE" sub="DIGITAL OUT">
        {[240, 264, 288].map((y) => (
          <line key={y} x1="32" y1={y} x2="398" y2={y} stroke={TEXT} strokeOpacity="0.06" />
        ))}
        <g clipPath="url(#sch-scope-01)">
          <g transform="translate(32 248)">
            <path d={WAVE} fill="none" stroke={C.lilac} strokeWidth="1.8" strokeLinejoin="round" className="sch-scroll" />
          </g>
        </g>
      </Block>

      <Pipeline y={334} items={["CASE", "CONTROLLER", "SWITCHES", "ALERT"]} colors={[C.pink, C.mint, C.butter, C.peach]} />
    </Frame>
  );
}
