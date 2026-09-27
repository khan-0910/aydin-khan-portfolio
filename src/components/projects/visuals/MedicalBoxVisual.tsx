"use client";

import ExplodedAssembly, { type ExplodedPart } from "@/components/exploded/ExplodedAssembly";

const NAVY = "#102a43";
const AMBER = "#ff5a1f";
const COBALT = "#2457ff";
const CYAN = "#20c7d9";

/** recognizable ESP32 dev-board: PCB, antenna, USB, headers, mounting holes, silkscreen */
function Esp32Board(selected: boolean) {
  return (
    <g>
      {/* PCB silhouette */}
      <rect x="-130" y="-46" width="260" height="92" rx="3" fill={selected ? "#152f4a" : "#12253c"} stroke={selected ? AMBER : CYAN} strokeWidth="1.6" />
      {/* antenna region (top-left zigzag) */}
      <g stroke={selected ? AMBER : CYAN} strokeWidth="1" opacity="0.75">
        <path d="M -122 -38 h 10 v 6 h -10 z M -122 -28 h 10 v 6 h -10 z M -122 -18 h 10 v 6 h -10 z" fill="none" />
        <rect x="-124" y="-42" width="14" height="28" fill="none" strokeDasharray="3 2" />
      </g>
      {/* USB connector region (left edge) */}
      <rect x="-136" y="-14" width="12" height="28" rx="1.5" fill="none" stroke={selected ? AMBER : "#8fa3b5"} strokeWidth="1.2" />
      {/* module can */}
      <rect x="-92" y="-30" width="58" height="60" rx="2" fill="#0c1420" stroke={selected ? AMBER : COBALT} strokeWidth="1.4" />
      <rect x="-84" y="-22" width="42" height="44" fill="none" stroke={selected ? AMBER : COBALT} strokeWidth="0.8" opacity="0.6" />
      <text x="-63" y="4" textAnchor="middle" fontSize="8" letterSpacing="1.5" fontFamily="var(--font-jetbrains-mono), monospace" fill={selected ? AMBER : "#8fa3b5"}>
        ESP32
      </text>
      {/* component footprints on the right */}
      <g stroke={selected ? AMBER : "#8fa3b5"} strokeWidth="1" fill="none" opacity="0.85">
        <rect x="-20" y="-30" width="26" height="16" />
        <rect x="-20" y="-6" width="16" height="12" />
        <circle cx="34" cy="-16" r="8" />
        <rect x="52" y="-22" width="18" height="12" />
        <rect x="52" y="-4" width="18" height="10" />
      </g>
      {/* subtle traces */}
      <g stroke={COBALT} strokeWidth="0.8" opacity="0.5" fill="none">
        <path d="M -34 -22 H -20" />
        <path d="M -4 -30 V -40 H 24" />
        <path d="M 34 -8 V 10 H 52" />
      </g>
      {/* top + bottom header pins */}
      {Array.from({ length: 15 }).map((_, i) => (
        <rect key={`t${i}`} x={-124 + i * 17} y="-56" width="4" height="10" fill={selected ? AMBER : "#8fa3b5"} />
      ))}
      {Array.from({ length: 15 }).map((_, i) => (
        <rect key={`b${i}`} x={-124 + i * 17} y="46" width="4" height="10" fill={selected ? AMBER : "#8fa3b5"} />
      ))}
      {/* mounting holes */}
      {[
        [-114, -38],
        [114, -38],
        [-114, 38],
        [114, 38],
      ].map(([hx, hy], i) => (
        <circle key={i} cx={hx} cy={hy} r="4" fill="none" stroke={selected ? AMBER : "#8fa3b5"} strokeWidth="1.2" />
      ))}
    </g>
  );
}

const PARTS: ExplodedPart[] = [
  {
    id: "alert",
    num: "04",
    name: "ALERT SYSTEM",
    label: "ALERT",
    role: "ALARM + CARETAKER NOTIFICATION",
    rest: { x: 0, y: -138, r: 0 },
    sep: { x: 0, y: -64, r: 0 },
    anchor: { x: 60, y: -138 },
    side: "right",
    info: [
      "Sounder that signals when it's medication time.",
      "Notification path toward the caretaker companion app.",
      "Drives the whole point of the box: nobody watches the clock.",
    ],
    render: (selected) => (
      <g>
        <rect x="-55" y="-24" width="110" height="48" rx="3" fill="#12253c" stroke={selected ? AMBER : "#8fa3b5"} strokeWidth="1.5" />
        {/* speaker */}
        <circle cx="-28" cy="0" r="14" fill="none" stroke={selected ? AMBER : "#8fa3b5"} strokeWidth="1.4" />
        <circle cx="-28" cy="0" r="6" fill={selected ? AMBER : "#8fa3b5"} opacity="0.8" />
        {/* signal arcs */}
        <path d="M -6 -14 A 20 20 0 0 1 -6 14" fill="none" stroke={AMBER} strokeWidth="1.2" />
        <path d="M 2 -22 A 30 30 0 0 1 2 22" fill="none" stroke={AMBER} strokeWidth="1" opacity="0.6" />
        {/* app tile */}
        <rect x="18" y="-14" width="28" height="28" rx="4" fill="none" stroke={selected ? AMBER : COBALT} strokeWidth="1.2" />
        <text x="32" y="3" textAnchor="middle" fontSize="7" letterSpacing="1" fontFamily="var(--font-jetbrains-mono), monospace" fill={selected ? AMBER : "#8fa3b5"}>
          APP
        </text>
      </g>
    ),
  },
  {
    id: "switches",
    num: "03",
    name: "AUTOMATED SWITCHES",
    label: "SWITCHES",
    role: "SWITCH-DRIVEN DISPENSING LOGIC",
    rest: { x: 0, y: -75, r: 0 },
    sep: { x: 0, y: -58, r: 0 },
    anchor: { x: -60, y: -75 },
    side: "left",
    info: [
      "Row of automated switches actuating the dispensing mechanism.",
      "Interface between the controller's logic and the physical action.",
      "The moving parts of the box.",
    ],
    render: (selected) => (
      <g>
        <rect x="-110" y="-22" width="220" height="44" rx="2" fill="#12253c" stroke={selected ? AMBER : "#8fa3b5"} strokeWidth="1.5" />
        {[-77, -33, 11, 55].map((x) => (
          <g key={x}>
            <rect x={x - 11} y="-12" width="22" height="24" fill="#0c1420" stroke={selected ? AMBER : "#8fa3b5"} strokeWidth="1.2" />
            <line x1={x} y1="-12" x2={x} y2="-18" stroke={selected ? AMBER : "#8fa3b5"} strokeWidth="2" />
          </g>
        ))}
        <path d="M 88 -8 h 14 M 88 0 h 14 M 88 8 h 14" stroke={selected ? AMBER : COBALT} strokeWidth="1.2" />
      </g>
    ),
  },
  {
    id: "esp32",
    num: "02",
    name: "ESP32 CONTROLLER",
    label: "ESP32",
    role: "THE BRAIN / WIFI MICROCONTROLLER",
    rest: { x: 0, y: 10, r: 0 },
    sep: { x: 0, y: 12, r: 0 },
    anchor: { x: 130, y: 10 },
    side: "right",
    info: [
      "Runs the schedule logic and triggers the switches and alarm.",
      "Development board: antenna, USB power, header pins, mounting holes.",
      "The reason a first-year project can think for itself.",
    ],
    render: Esp32Board,
  },
  {
    id: "case",
    num: "01",
    name: "CASE / ENCLOSURE",
    label: "CASE",
    role: "OUTER SHELL / BOTTOM HALF",
    rest: { x: 0, y: 120, r: 0 },
    sep: { x: 0, y: 55, r: 0 },
    anchor: { x: -120, y: 120 },
    side: "left",
    info: [
      "Houses the controller, switches and alarm in one unit.",
      "Medication bay with the dispensing opening.",
      "Drawn as a sectioned shell; the top lid separates upward.",
    ],
    render: (selected) => (
      <g>
        <path d="M -150 -36 H 150 V 44 H -150 Z" fill="#12253c" stroke={selected ? AMBER : "#8fa3b5"} strokeWidth="1.5" />
        <path d="M -150 -36 H 150" stroke={selected ? AMBER : "#8fa3b5"} strokeWidth="1.5" />
        {/* lid separated above the tray */}
        <rect x="-136" y="-64" width="272" height="20" fill="none" stroke={selected ? AMBER : "#8fa3b5"} strokeWidth="1.2" strokeDasharray="6 4" />
        {/* medication bay */}
        <rect x="-60" y="-12" width="120" height="36" fill="none" stroke={selected ? AMBER : COBALT} strokeWidth="1.2" />
        <text x="0" y="9" textAnchor="middle" fontSize="8" letterSpacing="2" fontFamily="var(--font-jetbrains-mono), monospace" fill={selected ? AMBER : "#64798e"}>
          MED BAY
        </text>
        {/* standoffs */}
        {[
          [-120, 44],
          [120, 44],
        ].map(([sx, sy], i) => (
          <circle key={i} cx={sx} cy={sy} r="5" fill="none" stroke={selected ? AMBER : "#8fa3b5"} strokeWidth="1.2" />
        ))}
      </g>
    ),
  },
];

export default function MedicalBoxVisual() {
  return <ExplodedAssembly parts={PARTS} title="EXPLODED VIEW / AUTOMATIC MEDICAL BOX" note="CLICK A COMPONENT TO INSPECT" />;
}
