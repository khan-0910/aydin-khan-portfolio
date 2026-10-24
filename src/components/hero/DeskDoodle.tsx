/**
 * Small animated doodle of the AR tutor's real parts: Arduino UNO, LED,
 * HC-SR04 ultrasonic sensor and SG90 servo. Motion is CSS/SMIL only
 * (classes in globals.css), so it's cheap and pauses under reduced motion.
 */
const INK = "#1a1225";

export default function DeskDoodle() {
  return (
    <figure className="pop relative w-full max-w-[340px] rotate-2 rounded-md bg-[#fff1b8] px-5 pb-4 pt-7 transition-transform duration-500 hover:rotate-0">
      <span aria-hidden className="absolute -top-3 left-1/2 h-6 w-24 -translate-x-1/2 -rotate-3 bg-[#cfeedf]/90" />
      <svg viewBox="0 0 300 210" className="w-full overflow-visible" role="img" aria-label="Doodle of an Arduino wired to a blinking LED, an ultrasonic sensor and a sweeping servo">
        {/* wires (drawn first so parts sit on top) */}
        <path id="w-led" d="M120 84 C 125 40, 180 30, 205 62" fill="none" stroke="#ff5d8f" strokeWidth="3" strokeLinecap="round" />
        <path id="w-servo" d="M150 128 C 170 128, 175 160, 192 160" fill="none" stroke="#6d4aff" strokeWidth="3" strokeLinecap="round" />
        <path d="M60 84 L60 52" fill="none" stroke="#0f7a63" strokeWidth="3" strokeLinecap="round" />
        <path d="M80 84 L80 52" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" />

        {/* signal dots riding the wires */}
        <circle r="4" fill="#ff5d8f" className="doodle-motion">
          <animateMotion dur="1.6s" repeatCount="indefinite" path="M120 84 C 125 40, 180 30, 205 62" />
        </circle>
        <circle r="4" fill="#6d4aff" className="doodle-motion">
          <animateMotion dur="1.3s" repeatCount="indefinite" path="M150 128 C 170 128, 175 160, 192 160" />
        </circle>

        {/* HC-SR04 + ping */}
        <g>
          <path className="doodle-ping" d="M40 14 Q 70 -4 100 14" fill="none" stroke="#0f7a63" strokeWidth="2.5" strokeLinecap="round" />
          <path className="doodle-ping doodle-ping-late" d="M40 14 Q 70 -4 100 14" fill="none" stroke="#0f7a63" strokeWidth="2.5" strokeLinecap="round" />
          <rect x="30" y="22" width="80" height="30" rx="5" fill="#5fe0c0" stroke={INK} strokeWidth="2.5" />
          <circle cx="51" cy="37" r="10" fill="#fff" stroke={INK} strokeWidth="2.5" />
          <circle cx="89" cy="37" r="10" fill="#fff" stroke={INK} strokeWidth="2.5" />
        </g>

        {/* Arduino UNO */}
        <g>
          <rect x="30" y="84" width="130" height="86" rx="8" fill="#2b2140" stroke={INK} strokeWidth="2.5" />
          <rect x="22" y="100" width="18" height="22" rx="2" fill="#d6cbe3" stroke={INK} strokeWidth="2" />
          {Array.from({ length: 10 }).map((_, i) => (
            <rect key={i} x={52 + i * 10} y="88" width="6" height="6" fill="#ffd36e" />
          ))}
          <rect x="70" y="118" width="54" height="22" rx="3" fill="#1d1430" stroke="#9b85ff" strokeWidth="1.5" />
          <text x="97" y="133" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fbf3e8" fontFamily="ui-monospace, monospace">UNO</text>
          <circle cx="44" cy="158" r="3" fill="#fbf3e8" />
          <circle cx="146" cy="158" r="3" fill="#fbf3e8" />
        </g>

        {/* LED */}
        <g>
          <line x1="201" y1="72" x2="199" y2="88" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="211" y1="72" x2="213" y2="92" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="206" cy="56" r="20" fill="#ff5d8f" className="doodle-glow" />
          <path d="M194 72 V56 a12 12 0 0 1 24 0 V72 Z" fill="#ff8fb4" stroke={INK} strokeWidth="2.5" className="doodle-led" />
        </g>

        {/* SG90 servo with sweeping horn */}
        <g>
          <rect x="192" y="146" width="76" height="40" rx="5" fill="#b3a4ff" stroke={INK} strokeWidth="2.5" />
          <g className="doodle-servo" style={{ transformOrigin: "248px 146px", transformBox: "view-box" }}>
            <rect x="243" y="106" width="10" height="44" rx="5" fill="#fff" stroke={INK} strokeWidth="2.5" />
          </g>
          <circle cx="248" cy="146" r="7" fill="#fff" stroke={INK} strokeWidth="2.5" />
        </g>
      </svg>
      <figcaption className="mt-1 font-hand text-[22px] leading-tight text-[#1a1225]">
        the AR tutor&apos;s parts bin, in doodle form ✎
      </figcaption>
    </figure>
  );
}
