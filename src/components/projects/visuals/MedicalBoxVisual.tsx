import { Arrow, C, Frame, Hand, INK, ink } from "./doodle";

const DAYS = ["M", "T", "W", "T", "F", "S", "S"];
const PILLS = [C.pink, C.sky, C.butter, C.mint, C.peach, C.lilac, C.pink];
const TODAY = 3;

export default function MedicalBoxVisual() {
  return (
    <Frame
      label="Doodle of the automatic medical box: a 7-day pill box with a lid that opens, an ESP32, a buzzer and a phone getting a caretaker alert"
      caption="pill box + ESP32 + buzzer + an app that pings the caretaker"
    >
      {/* wire: box -> ESP32 */}
      <path d="M360 260 C 380 260, 380 262, 400 262" fill="none" stroke={C.hot} strokeWidth="4" strokeLinecap="round" />
      <circle r="5" fill={C.butter} className="doodle-motion">
        <animateMotion dur="1.4s" repeatCount="indefinite" path="M360 260 C 380 260, 380 262, 400 262" />
      </circle>

      {/* 7-day pill box */}
      <rect x="40" y="200" width="320" height="120" rx="16" fill={C.lilac} {...ink} />
      {DAYS.map((d, i) => (
        <g key={i}>
          <rect
            x={54 + i * 43}
            y="214"
            width="36"
            height="92"
            rx="9"
            fill={i === TODAY ? C.hot : C.cream}
            className={i === TODAY ? "doodle-led" : undefined}
            {...ink}
            strokeWidth={2.5}
          />
          <circle cx={72 + i * 43} cy="270" r="8" fill={PILLS[i]} {...ink} strokeWidth={2} />
          <circle cx={72 + i * 43} cy="290" r="6" fill={PILLS[(i + 2) % 7]} {...ink} strokeWidth={2} />
          <text x={72 + i * 43} y="243" textAnchor="middle" className="font-hand" fontSize="22" fontWeight={700} fill={INK}>
            {d}
          </text>
        </g>
      ))}
      {/* lid hinged at the back-left, flips open every few seconds */}
      <g className="med-lid" style={{ transformOrigin: "40px 200px", transformBox: "view-box" }}>
        <rect x="40" y="168" width="320" height="34" rx="14" fill={C.pink} {...ink} />
        <rect x="180" y="178" width="40" height="12" rx="6" fill={C.cream} {...ink} strokeWidth={2} />
      </g>
      <Hand x={70} y={352} rotate={-2}>today&apos;s slot lights up ↑</Hand>

      {/* ESP32 */}
      <rect x="400" y="228" width="120" height="74" rx="10" fill={C.mint} {...ink} />
      {Array.from({ length: 8 }).map((_, i) => (
        <rect key={i} x={410 + i * 13} y="292" width="6" height="14" rx="2" fill={C.butter} {...ink} strokeWidth={1.5} />
      ))}
      <rect x="425" y="242" width="70" height="36" rx="5" fill={C.cream} {...ink} strokeWidth={2.5} />
      <text x="460" y="267" textAnchor="middle" fontSize="15" fontWeight={800} fill={INK} fontFamily="ui-monospace, monospace">
        ESP32
      </text>
      <Hand x={530} y={290} size={20}>brains</Hand>

      {/* buzzer + sound waves */}
      <circle cx="445" cy="170" r="22" fill={C.peach} {...ink} />
      <circle cx="445" cy="170" r="7" fill={INK} />
      <path d="M445 192 V228" stroke={INK} strokeWidth="3" />
      <g transform="rotate(90 480 170)">
        <path className="doodle-ping" d="M462 168 Q 480 156 498 168" fill="none" stroke={C.butter} strokeWidth="3" strokeLinecap="round" />
        <path className="doodle-ping doodle-ping-late" d="M462 168 Q 480 156 498 168" fill="none" stroke={C.butter} strokeWidth="3" strokeLinecap="round" />
      </g>
      <Hand x={372} y={140} rotate={-6} color={C.butter}>beep beep!</Hand>

      {/* caretaker's phone */}
      <Arrow d="M520 228 C 545 200, 545 180, 540 158" dashed />
      <rect x="490" y="24" width="90" height="140" rx="16" fill={C.cream} {...ink} />
      <rect x="500" y="40" width="70" height="104" rx="6" fill={C.sky} stroke={INK} strokeWidth={2} />
      <g className="bubble-pop" style={{ transformOrigin: "505px 92px", transformBox: "view-box" }}>
        <rect x="504" y="62" width="62" height="34" rx="10" fill={C.hot} {...ink} strokeWidth={2} />
        <text x="535" y="78" textAnchor="middle" className="font-hand" fontSize="13" fontWeight={700} fill={C.cream}>
          time for
        </text>
        <text x="535" y="91" textAnchor="middle" className="font-hand" fontSize="13" fontWeight={700} fill={C.cream}>
          meds!
        </text>
      </g>
      <Hand x={480} y={18} size={20} anchor="end">caretaker&apos;s phone</Hand>
    </Frame>
  );
}
