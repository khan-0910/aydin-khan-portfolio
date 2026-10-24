import { Arrow, C, Frame, Hand, INK, ink } from "./doodle";

const TILES = [
  { bg: C.butter, item: C.lilac },
  { bg: C.mint, item: C.peach },
  { bg: C.sky, item: C.pink },
];

export default function EcommerceVisual() {
  return (
    <Frame
      label="Doodle of the Python shop: a browser with three products, a cursor adding one to the cart, a login card and a users database"
      caption="grade 12 python shop: register, login, cart, checkout"
    >
      {/* browser window */}
      <rect x="30" y="30" width="380" height="290" rx="14" fill={C.cream} {...ink} />
      <path d="M30 66 V44 a14 14 0 0 1 14 -14 H396 a14 14 0 0 1 14 14 V66 Z" fill={C.pink} {...ink} />
      {[52, 70, 88].map((x) => (
        <circle key={x} cx={x} cy="48" r="5" fill={C.cream} {...ink} strokeWidth={2} />
      ))}
      <rect x="110" y="38" width="200" height="20" rx="10" fill={C.cream} {...ink} strokeWidth={2} />
      <text x="210" y="53" textAnchor="middle" fontSize="12" fontWeight={700} fill={INK} fontFamily="ui-monospace, monospace">
        my-shop.py
      </text>

      {/* cart + "+1" */}
      <path d="M362 40 h6 l5 16 h16 l4 -11 h-22" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="376" cy="60" r="2.5" fill={INK} />
      <circle cx="388" cy="60" r="2.5" fill={INK} />
      <text x="396" y="40" className="float-up font-hand" fontSize="20" fontWeight={700} fill={C.hot}>
        +1
      </text>

      {/* product tiles */}
      {TILES.map((t, i) => {
        const x = 50 + i * 120;
        return (
          <g key={i}>
            <rect x={x} y="84" width="100" height="150" rx="10" fill={t.bg} {...ink} />
            <circle cx={x + 50} cy="130" r="24" fill={t.item} {...ink} />
            <rect x={x + 18} y="166" width="64" height="8" rx="4" fill={INK} opacity="0.75" />
            <rect x={x + 30} y="180" width="40" height="8" rx="4" fill={INK} opacity="0.35" />
            <rect x={x + 18} y="200" width="64" height="24" rx="12" fill={C.hot} {...ink} strokeWidth={2} />
            <text x={x + 50} y="217" textAnchor="middle" className="font-hand" fontSize="18" fontWeight={700} fill={C.cream}>
              add
            </text>
          </g>
        );
      })}

      {/* checkout bar */}
      <rect x="50" y="250" width="340" height="50" rx="12" fill={C.lilac} {...ink} />
      <Hand x={70} y={282} color={INK}>checkout →</Hand>
      <rect x="290" y="262" width="84" height="26" rx="13" fill={C.cream} {...ink} strokeWidth={2} />
      <text x="332" y="280" textAnchor="middle" className="font-hand" fontSize="18" fontWeight={700} fill={INK}>
        pay ✓
      </text>

      {/* cursor that keeps clicking "add" on the middle product */}
      <g>
        <path d="M0 0 L0 22 L6 16 L11 27 L15 25 L10 14 L18 14 Z" fill={C.cream} stroke={INK} strokeWidth="2.5" strokeLinejoin="round">
          <animateMotion dur="2.6s" repeatCount="indefinite" path="M330 330 C 300 300, 250 250, 222 210" keyPoints="0;1;1" keyTimes="0;0.6;1" calcMode="linear" />
        </path>
      </g>

      {/* login card */}
      <g transform="rotate(3 510 100)">
        <rect x="440" y="36" width="140" height="124" rx="12" fill={C.lilac} {...ink} />
        <Hand x={456} y={64} color={INK}>login</Hand>
        <rect x="456" y="76" width="108" height="18" rx="6" fill={C.cream} {...ink} strokeWidth={2} />
        <rect x="456" y="102" width="108" height="18" rx="6" fill={C.cream} {...ink} strokeWidth={2} />
        <text x="462" y="115" fontSize="12" fill={INK} fontFamily="ui-monospace, monospace">••••••</text>
        <rect x="456" y="128" width="50" height="22" rx="11" fill={C.hot} {...ink} strokeWidth={2} />
        <text x="481" y="144" textAnchor="middle" className="font-hand" fontSize="16" fontWeight={700} fill={C.cream}>
          go
        </text>
      </g>

      {/* users database */}
      <Arrow d="M512 166 V214" />
      <Arrow d="M392 272 C 420 272, 430 268, 452 262" />
      <path d="M460 230 V300 A50 14 0 0 0 560 300 V230" fill={C.peach} {...ink} />
      <ellipse cx="510" cy="230" rx="50" ry="14" fill={C.butter} {...ink} />
      <text x="510" y="275" textAnchor="middle" fontSize="13" fontWeight={800} fill={INK} fontFamily="ui-monospace, monospace">
        users.db
      </text>
      <Hand x={510} y={346} anchor="middle" color={C.butter} rotate={-3}>passwords live here</Hand>
    </Frame>
  );
}
