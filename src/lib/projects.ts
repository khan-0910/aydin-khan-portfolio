export type ProjectStatus = "BUILT" | "IN PROGRESS" | "STARTING SOON";

export type CaseSection = { heading: string; body: string[] };

export type Project = {
  id: string;
  number: string;
  name: string;
  category: string;
  year: string;
  status: ProjectStatus;
  tagline: string;
  description: string;
  hardware: string[];
  software: string[];
  visual: "medical" | "ecommerce" | "football" | "exoplanet" | "arduino";
  /** built projects get PROBLEM→ITERATION; unfinished get CURRENT STATE→NEXT STEP */
  sections: CaseSection[];
};

export const PROJECTS: Project[] = [
  {
    id: "medical-box",
    number: "01",
    name: "AUTOMATIC MEDICAL BOX",
    category: "MULTIDISCIPLINARY PROJECT",
    year: "FIRST YEAR",
    status: "BUILT",
    tagline: "An automated medical box with alarms and caretaker notifications.",
    description:
      "A first-year multidisciplinary project: an automated medical box with alarms and an app for notifying caretakers. One box, three disciplines - mechanics, electronics and software.",
    hardware: ["ESP32", "AUTOMATED SWITCHES"],
    software: ["PYTHON"],
    visual: "medical",
    sections: [
      {
        heading: "PROBLEM",
        body: [
          "Medication schedules are easy to miss - for patients and for the people looking after them.",
          "The brief was simple: a box that handles the reminder automatically, so caretakers don't have to watch the clock.",
        ],
      },
      {
        heading: "APPROACH",
        body: [
          "Treat the box as one system across three layers: enclosure mechanics, ESP32-driven switch logic, and a Python-side notification flow.",
          "Each layer kept deliberately simple so the integration - not any single part - carries the project.",
        ],
      },
      {
        heading: "SYSTEM",
        body: [
          "CASE → CONTROLLER → SWITCHES → ALERT. The ESP32 reads the automated switches and drives the alarm path; the app notifies caretakers.",
        ],
      },
      {
        heading: "BUILD",
        body: [
          "An automated medical box enclosure with switch-driven dispensing logic.",
          "An alarm system that signals when it's time.",
          "A companion app flow that notifies caretakers.",
        ],
      },
      {
        heading: "TEST",
        body: [
          "Triggered the box through full dispense-and-alarm cycles and verified the caretaker notification path end to end.",
        ],
      },
      {
        heading: "ITERATION",
        body: ["First-year multidisciplinary build - documented lessons pending."],
      },
    ],
  },
  {
    id: "ecommerce",
    number: "02",
    name: "PYTHON E-COMMERCE WEBSITE",
    category: "SOFTWARE",
    year: "GRADE 12",
    status: "BUILT",
    tagline: "A Grade 12 Python project covering the full shop flow.",
    description:
      "A Grade 12 Python project implementing a basic e-commerce website - add to cart, checkout, login, register, logout and a password database.",
    hardware: [],
    software: ["PYTHON", "LOGIN / REGISTER / LOGOUT", "PASSWORD DATABASE"],
    visual: "ecommerce",
    sections: [
      {
        heading: "PROBLEM",
        body: [
          "Before mechatronics there was software: the question was how a full product flow holds together in code.",
        ],
      },
      {
        heading: "APPROACH",
        body: [
          "An e-commerce site touches everything - accounts, state, storage, and the checkout path that ties it all together.",
        ],
      },
      {
        heading: "SYSTEM",
        body: [
          "USER → LOGIN → PRODUCT → CART → CHECKOUT → DATABASE. Authentication gates the flow; the password database sits underneath it.",
        ],
      },
      {
        heading: "BUILD",
        body: [
          "A basic e-commerce website written in Python.",
          "Full account cycle: register, login, logout - with a password database underneath.",
          "Add-to-cart and checkout flow connecting users to products.",
        ],
      },
      {
        heading: "TEST",
        body: ["Walked the full user journey - register, log in, add to cart, check out, log out."],
      },
      {
        heading: "ITERATION",
        body: ["Grade 12 school project - not deployed to production; documented lessons pending."],
      },
    ],
  },
  {
    id: "football-analytics",
    number: "03",
    name: "PREMIER LEAGUE FOOTBALL ANALYTICS",
    category: "DATA / SOFTWARE",
    year: "IN DEVELOPMENT",
    status: "IN PROGRESS",
    tagline: "A football analytics environment under active construction.",
    description:
      "A Premier League analytics project currently being developed - pitch data, player nodes and match statistics moving through a DATA → PROCESS → ANALYZE → VISUALIZE pipeline.",
    hardware: [],
    software: ["PYTHON", "DATA PROCESSING"],
    visual: "football",
    sections: [
      {
        heading: "PROBLEM",
        body: [
          "Matches produce more information than a scoreline shows - positions, formations, momentum.",
        ],
      },
      {
        heading: "CURRENT STATE",
        body: [
          "Actively building the pipeline: DATA → PROCESS → ANALYZE → VISUALIZE.",
          "The environment you see here is the design target for the analytics view.",
        ],
      },
      {
        heading: "WHAT I'M BUILDING",
        body: [
          "A football analytics environment - pitch geometry, player nodes, team formations and statistical views.",
        ],
      },
      {
        heading: "NEXT STEP",
        body: [
          "Wire real match data into the processing stage. No results to report yet - the build comes first.",
        ],
      },
    ],
  },
  {
    id: "exoplanet",
    number: "04",
    name: "AI EXOPLANET DETECTION",
    category: "RESEARCH / ML",
    year: "STARTING SOON",
    status: "STARTING SOON",
    tagline: "A research project about to begin: telescope light curves meet ML.",
    description:
      "A planned research project: detecting exoplanet candidates from telescope light curves through signal processing and an AI model. Currently at the starting line.",
    hardware: [],
    software: ["PYTHON", "ML - PLANNED"],
    visual: "exoplanet",
    sections: [
      {
        heading: "PROBLEM",
        body: [
          "A planet crossing its star dims the light by a fraction of a percent. Finding those dips in thousands of light curves is a pattern-recognition problem.",
        ],
      },
      {
        heading: "CURRENT STATE",
        body: [
          "Pre-build. The pipeline is sketched: TELESCOPE DATA → LIGHT CURVE → SIGNAL PROCESSING → AI MODEL → EXOPLANET CANDIDATE.",
          "Everything on this card is the plan - no model, no dataset, no results yet.",
        ],
      },
      {
        heading: "WHAT I'M BUILDING",
        body: [
          "A detection pipeline that turns raw light curves into candidate signals worth a second look.",
        ],
      },
      {
        heading: "NEXT STEP",
        body: ["Select a public light-curve dataset and build the first signal-processing pass."],
      },
    ],
  },
  {
    id: "ar-arduino",
    number: "05",
    name: "AR ARDUINO INTERACTIVE TUTOR",
    category: "AR / HARDWARE EDUCATION",
    year: "IN DEVELOPMENT",
    status: "STARTING SOON",
    tagline: "Point a phone at an Arduino and see it explained in place.",
    description:
      "An AR tutor built with Unity and AR Foundation: point a phone at an Arduino UNO and get spatial pinout overlays, an interactive 3D component catalog and animated signal waveforms.",
    hardware: [
      "ARDUINO UNO (ATMEGA328P)",
      "LED + RESISTOR",
      "PUSH BUTTON + POTENTIOMETER",
      "HC-SR04 ULTRASONIC SENSOR",
      "DHT11 ENVIRONMENTAL SENSOR",
      "SG90 MICRO SERVO",
    ],
    software: ["UNITY", "AR FOUNDATION", "C# SCRIPTING", "BLENDER 3D ASSETS", "ANDROID DEPLOYMENT"],
    visual: "arduino",
    sections: [
      {
        heading: "PROBLEM",
        body: [
          "Breadboard diagrams are flat. Beginners wire real components while reading documentation that isn't in the room with them.",
        ],
      },
      {
        heading: "CONCEPT",
        body: [
          "Vision capture and SLAM pose tracking anchor an AR grid to the physical board; raycast interaction selects pins and components in place.",
          "SEE → INTERACT → UNDERSTAND → BUILD.",
        ],
      },
      {
        heading: "SYSTEM",
        body: [
          "ARDUINO APPEARS → PINS ILLUMINATE → COMPONENTS APPEAR → SIGNALS FLOW → AR GRID ACTIVATES.",
          "Planned component library: LED + resistor, push button + potentiometer, HC-SR04 ultrasonic, DHT11 environmental sensor, SG90 micro servo.",
          "Signal dynamics animate each interaction - waveform, timing, behaviour.",
          "Toolchain: Unity + AR Foundation + C# scripting, Blender-built 3D assets, Android deployment.",
        ],
      },
      {
        heading: "CURRENT STATE",
        body: [
          "In development. Concept and architecture documented; the build is starting.",
        ],
      },
      {
        heading: "NEXT STEP",
        body: [
          "First Unity scene with AR Foundation pose tracking and a single spatial pinout overlay on the UNO.",
        ],
      },
    ],
  },
];
