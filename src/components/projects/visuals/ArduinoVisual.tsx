import { Arrow, C, Frame, Hand, INK, ink } from "./doodle";

const PARTS = [
  { label: "LED", fill: C.pink },
  { label: "button", fill: C.peach },
  { label: "HC-SR04", fill: C.mint },
  { label: "DHT11", fill: C.butter },
  { label: "SG90", fill: C.lilac },
];
const TAGS = [
  { text: "D13 → LED", x: 404, y: 120 },
  { text: "5V", x: 470, y: 238 },
  { text: "GND", x: 404, y: 238 },
];

export default function ArduinoVisual() {
  return (
    <Frame
      label="Doodle of the AR Arduino tutor: a phone scanning an Arduino UNO and popping up pin labels, with the component stickers it will teach"
      caption="AR tutor: point your phone at the UNO, see what each pin does"
    >
      {/* Arduino UNO */}
      <rect x="40" y="110" width="250" height="160" rx="14" fill={C.sky} {...ink} />
      <rect x="26" y="140" width="34" height="42" rx="4" fill={C.cream} {...ink} />
      <rect x="26" y="210" width="30" height="34" rx="4" fill={INK} />
      <rect x="90" y="118" width="180" height="16" rx="3" fill={INK} />
      {Array.from({ length: 12 }).map((_, i) => (
        <rect
          key={i}
          x={95 + i * 14.5}
          y="122"
          width="8"
          height="8"
          rx="1.5"
          fill={C.butter}
          className={i % 4 === 1 ? "doodle-led" : undefined}
          style={i % 4 === 1 ? { animationDelay: `${i * 0.15}s` } : undefined}
        />
      ))}
      <rect x="140" y="205" width="120" height="36" rx="4" fill={INK} />
      <text x="200" y="228" textAnchor="middle" fontSize="12" fontWeight={700} fill={C.cream} fontFamily="ui-monospace, monospace">
        ATmega328P
      </text>
      <Hand x={70} y={210} color={INK} size={30}>UNO</Hand>

      {/* phone scanning the board */}
      <Arrow d="M378 190 C 350 190, 320 190, 296 190" dashed />
      <rect x="380" y="24" width="180" height="300" rx="26" fill={C.lilac} {...ink} />
      <rect x="394" y="50" width="152" height="250" rx="12" fill="#2a1d40" stroke={INK} strokeWidth={2.5} />
      <rect x="438" y="34" width="64" height="8" rx="4" fill={INK} />
      <rect x="420" y="150" width="100" height="64" rx="8" fill={C.sky} {...ink} strokeWidth={2.5} />
      <rect x="436" y="156" width="70" height="8" rx="2" fill={INK} />
      {TAGS.map((t, i) => (
        <g key={t.text} className="bubble-pop" style={{ transformOrigin: `${t.x}px ${t.y}px`, transformBox: "view-box", animationDelay: `${i * 0.5}s` }}>
          <rect x={t.x} y={t.y - 18} width={t.text.length * 9 + 16} height="26" rx="8" fill={C.hot} {...ink} strokeWidth={2} />
          <text x={t.x + 8} y={t.y} className="font-hand" fontSize="18" fontWeight={700} fill={C.cream}>
            {t.text}
          </text>
        </g>
      ))}
      <rect x="394" y="50" width="152" height="4" fill={C.mint} className="scan-y" />
      <Hand x={470} y={350} anchor="middle" color={C.butter} rotate={-3}>AR labels pop up</Hand>

      {/* component stickers the tutor will cover */}
      {PARTS.map((p, i) => {
        const x = 30 + i * 68;
        return (
          <g key={p.label} className="doodle-float" style={{ animationDelay: `${i * -0.4}s` }}>
            <g transform={`rotate(${i % 2 ? 4 : -4} ${x + 30} 320)`}>
              <rect x={x} y="298" width="60" height="44" rx="10" fill={p.fill} {...ink} />
              <text x={x + 30} y="326" textAnchor="middle" className="font-hand" fontSize={p.label.length > 5 ? 15 : 18} fontWeight={700} fill={INK}>
                {p.label}
              </text>
            </g>
          </g>
        );
      })}
      <Hand x={40} y={378} size={20}>parts it&apos;ll teach ↑</Hand>
    </Frame>
  );
}
