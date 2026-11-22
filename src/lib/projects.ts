export type ProjectStatus = "LIVE" | "BUILT" | "IN PROGRESS" | "STARTING SOON";

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
  visual:
    | "medical" | "ecommerce" | "football" | "exoplanet" | "arduino"
    | "holofoil" | "tideline" | "smartstock" | "brickvault" | "lifeos" | "ledger" | "apta";
  links?: { label: string; href: string }[];
  /** built projects get PROBLEM→ITERATION; unfinished get CURRENT STATE→NEXT STEP */
  sections: CaseSection[];
  /** progress checklist: flip `done` to true as you finish steps; the bar fills from these */
  milestones?: { label: string; done: boolean }[];
};

const ALL: Project[] = [
  {
    id: "medical-box",
    number: "01",
    name: "Automatic Medical Box",
    category: "MULTIDISCIPLINARY PROJECT",
    year: "First year",
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
    name: "Python E-Commerce Website",
    category: "SOFTWARE",
    year: "Grade 12",
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
        body: ["Grade 12 school project, not deployed. In 2026 I rebuilt the same flow as Holofoil, an animated card shop."],
      },
    ],
  },
  {
    id: "pitchside",
    number: "",
    name: "Pitchside: Premier League Intelligence",
    category: "DATA / ML / FULL STACK",
    year: "2026",
    status: "BUILT",
    tagline: "Live Premier League data, three machine learning models and a season simulator, on a page built like a pitch.",
    description:
      "A Premier League intelligence platform: match predictions with expected goals and scoreline grids, player profiles and similarity search, and transfer valuations, all fed by five public data sources and refreshed every 15 minutes.",
    hardware: [],
    software: [
      "PYTHON · FASTAPI · DUCKDB",
      "SCIKIT-LEARN · XGBOOST · SCIPY",
      "REACT 19 · VITE · TYPESCRIPT",
      "GSAP SCROLLTRIGGER · LENIS",
      "GITHUB ACTIONS REFRESH",
    ],
    visual: "football",
    links: [{ label: "REPO", href: "https://github.com/khan-0910/Pitchside-Prem-" }],
    sections: [
      {
        heading: "PROBLEM",
        body: [
          "A scoreline hides most of a match. I wanted honest, measurable predictions, with the limits shown next to them.",
        ],
      },
      {
        heading: "SYSTEM",
        body: [
          "FPL API, football-data.co.uk, football-data.org, Transfermarkt and Understat → snapshots → entity resolution → DuckDB → features → models → FastAPI → React.",
          "Layers stay apart: data fetches, features build inputs, models train, services hold logic, the API only routes.",
        ],
      },
      {
        heading: "BUILD",
        body: [
          "Match Centre: win, draw and loss chances, expected goals, scoreline grids and form.",
          "Player Lab: per-90 profiles, role labels, similar-player search and radar comparison.",
          "Transfer Intelligence: recorded value against a model estimate with an 80% range.",
          "The homepage is a pitch: scroll from the centre circle to the goal, with a ball you can kick.",
        ],
      },
      {
        heading: "TEST",
        body: [
          "Logistic regression beat random forest, gradient boosting and XGBoost on validation log loss, so it ships.",
          "Held-out results: log loss 1.040 and 46.6% accuracy, against 1.013 and 49.1% for closing bookmaker odds, and 1.085 and 42.1% for historical frequencies.",
          "Tests prove that changing a result never changes an earlier feature row, so there is no leakage.",
        ],
      },
      {
        heading: "ITERATION",
        body: [
          "A GitHub Actions job rebuilds the public site every 15 minutes: restore the database, fetch scores and injuries, store predictions, export the API to JSON and publish.",
          "Next: bring the Season Simulator back onto the site.",
        ],
      },
    ],
  },
  {
    id: "holofoil",
    number: "",
    name: "Holofoil: Trading Card Shop",
    category: "FRONT END / E-COMMERCE",
    year: "2026",
    status: "BUILT",
    tagline: "My Grade 12 Python shop, rebuilt as an animated store for single Pokémon cards.",
    description:
      "A remake of my Grade 12 Python e-commerce project as a modern front end: real card images, a cart with stock limits, accounts with hashed passwords, checkout and order history, priced in rupees, dollars, euros or pounds.",
    hardware: [],
    software: ["REACT 19 · VITE · TYPESCRIPT", "GSAP SCROLLTRIGGER · FLIP", "LENIS · REACT BITS", "TAILWIND CSS 4", "WEB CRYPTO PBKDF2"],
    visual: "holofoil",
    links: [
      { label: "Visit the shop", href: "https://khan-0910.github.io/holofoil/" },
      { label: "REPO", href: "https://github.com/khan-0910/holofoil" },
    ],
    sections: [
      {
        heading: "PROBLEM",
        body: [
          "The Grade 12 version proved the flow worked: register, log in, add to cart, check out, log out. It didn't feel like a shop anyone would want to use.",
        ],
      },
      {
        heading: "APPROACH",
        body: [
          "Keep the same flow and rebuild every surface around the product: the card art carries the colour, everything around it stays quiet.",
          "Motion only where it explains something: a booster pack that opens as you scroll, a grid that rearranges when you filter, a card that travels to the cart.",
        ],
      },
      {
        heading: "BUILD",
        body: [
          "Real card images loaded by id, and a shop with search, type and grade filters and sorting.",
          "Accounts stored as salted PBKDF2-SHA-256 hashes, never plain text. Checkout requires sign-in and saves each order in the currency it was paid in.",
          "Adding stock is one command: npm run add-card looks the card up by id and writes it into the stock list.",
        ],
      },
      {
        heading: "ITERATION",
        body: [
          "The first pass looked generated: gradients, glows, loud type. The second pass stripped it back to a warm paper and felt-green palette, one accent, and real card images.",
        ],
      },
    ],
  },
  {
    id: "smartstock",
    number: "",
    name: "SmartStock: Inventory for Small Warehouses",
    category: "FULL STACK",
    year: "2026",
    status: "BUILT",
    tagline: "Products, storage locations and every stock change, with an audit trail that can't be edited.",
    description:
      "An inventory and warehouse app for small businesses that store and move physical products. Stock in, stock out and adjustments run atomically in the database, and barcodes scan from a USB scanner or the phone camera.",
    hardware: ["USB / BLUETOOTH BARCODE SCANNER", "PHONE CAMERA (EAN-13, UPC, CODE 128)"],
    software: ["NEXT.JS APP ROUTER · TYPESCRIPT", "SUPABASE: POSTGRES, AUTH, RLS", "ZOD · VITEST", "GSAP · LENIS · REACT BITS"],
    visual: "smartstock",
    links: [{ label: "REPO", href: "https://github.com/khan-0910/SmartStock" }],
    sections: [
      {
        heading: "PROBLEM",
        body: ["Small shops track stock in spreadsheets, where a wrong edit quietly rewrites history."],
      },
      {
        heading: "SYSTEM",
        body: [
          "BROWSER → SERVER ACTIONS → ZOD VALIDATION → USER-SCOPED SUPABASE CLIENT → POSTGRES WITH ROW LEVEL SECURITY.",
          "The browser never talks to tables directly. Every movement is written by a database function, so stock and history can't drift apart.",
        ],
      },
      {
        heading: "BUILD",
        body: [
          "Catalog with SKU, barcode, prices, reorder level and archive, plus A-01-03 style storage locations.",
          "Movement history that can't be edited or deleted, filterable by product, type and date.",
          "Dashboard: units on hand, inventory value at cost and a low-stock list. Data export and account deletion.",
        ],
      },
      {
        heading: "TEST",
        body: ["Automated database and validation tests pass. End-to-end checks against a hosted Supabase project are still to do."],
      },
    ],
  },
  {
    id: "lifeos",
    number: "",
    name: "LifeOS: Personal Planner",
    category: "FULL STACK / DESKTOP",
    year: "2026",
    status: "BUILT",
    tagline: "Plan the day and week, build habits, move goals forward, and block distractions while you focus.",
    description:
      "A personal life planner with a drag-to-schedule week grid, habits with documented streaks, goals tied to real tasks and a focus timer, plus two device helpers: a browser extension that blocks chosen sites and a Windows companion that notices chosen apps.",
    hardware: [],
    software: ["NEXT.JS · TYPESCRIPT · MONOREPO", "BROWSER EXTENSION (MV3)", "TAURI 2 · RUST", "SUPABASE SCHEMA + RLS (PGLITE TESTS)"],
    visual: "lifeos",
    links: [{ label: "REPO", href: "https://github.com/khan-0910/Life-OS" }],
    sections: [
      {
        heading: "PROBLEM",
        body: ["Planners show what you meant to do. I wanted one that also helps during the doing, and reports honestly afterwards."],
      },
      {
        heading: "BUILD",
        body: [
          "Today dashboard, day and week planning with drag to create, move and resize, habits with history backfill, and goals and projects with progress from linked tasks.",
          "Goal Studio: SMART, OKR, mandala chart, wheel of life and roadmap templates that create real goals and tasks.",
          "A timestamp-based focus timer that survives reloads, and insights built only from real records.",
        ],
      },
      {
        heading: "CURRENT STATE",
        body: [
          "The web planner runs in local mode, with all data in the browser. The Windows companion is written but not compiled yet: there's no Rust toolchain on the build machine.",
        ],
      },
      {
        heading: "NEXT STEP",
        body: ["Wire cloud accounts and sync into the web app. The schema, RLS and device pairing are already written and tested."],
      },
    ],
  },
  {
    id: "ledger",
    number: "",
    name: "Ledger: Student Finance Tracker",
    category: "FRONT END",
    year: "2026",
    status: "BUILT",
    tagline: "Balances, budgets, goals and recurring costs, with the balance hidden until you ask for it.",
    description:
      "A dark, sticker-styled finance tracker for students. The balance is masked by default, and the dashboard works out what's safe to spend after essential commitments.",
    hardware: [],
    software: ["REACT 18 · VITE · TYPESCRIPT", "REACT ROUTER", "SUPABASE PERSISTENCE + OFFLINE DEMO", "FRAMER MOTION", "HAND-ROLLED CSS"],
    visual: "ledger",
    links: [{ label: "REPO", href: "https://github.com/khan-0910/Ledger-Project" }],
    sections: [
      {
        heading: "PROBLEM",
        body: ["Students check their balance in public: on shared screens, on the bus. Most finance apps lead with the number."],
      },
      {
        heading: "BUILD",
        body: [
          "A dashboard with strict and guilt-free allocation, safe-to-spend and insights.",
          "Transactions with search, filters and CSV export, per-category budgets, goals with add-money, recurring expenses and analytics.",
          "A demo mode seeds sample data, so every screen works without an account.",
        ],
      },
    ],
  },
  {
    id: "brickvault",
    number: "",
    name: "BrickVault: LEGO Collection Tracker",
    category: "FRONT END",
    year: "2026",
    status: "BUILT",
    tagline: "A comic-book style LEGO collection and spending tracker: what you paid, what it's worth.",
    description:
      "Log each set with what you paid and what it's worth now. BrickVault adds it up by theme, month and set, with a searchable catalog of every LEGO set and minifigure.",
    hardware: [],
    software: ["NEXT.JS · TYPESCRIPT", "STATIC EXPORT TO GITHUB PAGES", "NIGHTLY CATALOG REBUILD", "VITEST"],
    visual: "brickvault",
    links: [{ label: "REPO", href: "https://github.com/khan-0910/Lego-Vault" }],
    sections: [
      {
        heading: "BUILD",
        body: [
          "HQ: an animated total-spent counter, estimated value with a gain or loss dial, price per piece, record holders and news.",
          "A catalog of about 28,500 sets from 1949 to announced, and about 17,000 minifigures, each one click from the vault or wishlist.",
          "A value tracker with filters, spending by theme and CSV export.",
        ],
      },
      {
        heading: "SYSTEM",
        body: ["A nightly GitHub Actions run downloads the catalog and rebuilds the static site. Your collection stays in your browser."],
      },
    ],
  },
  {
    id: "tideline",
    number: "",
    name: "Tideline: Maritime Intelligence",
    category: "DATA / BACKEND",
    year: "In development",
    status: "IN PROGRESS",
    tagline: "Vessel tracking, port activity, weather exposure and ETA prediction, where every number names its source.",
    description:
      "A maritime intelligence platform built on live AIS positions, IMF PortWatch port calls, Open-Meteo marine weather and NOAA and GDACS storm feeds. Anything not from a named source is labelled simulated.",
    hardware: [],
    software: ["PYTHON BACKEND", "AISSTREAM WEBSOCKET", "IMF PORTWATCH · OPEN-METEO · NOAA NHC · GDACS", "SOURCE HEALTH LABELS"],
    visual: "tideline",
    milestones: [
      { label: "Data foundation: sources, snapshots and health labels", done: true },
      { label: "Live vessel tracking from AIS", done: true },
      { label: "Route intelligence", done: true },
      { label: "Port activity and congestion", done: false },
      { label: "ETA model on NOAA AIS archives", done: false },
      { label: "Weather exposure scoring", done: false },
      { label: "What-if shipping scenarios", done: false },
      { label: "Dashboard and maps", done: false },
      { label: "Public release", done: false },
    ],
    sections: [
      {
        heading: "PROBLEM",
        body: ["Free shipping data has big gaps: terrestrial AIS misses the open ocean, and port data lags a week. Most dashboards hide that."],
      },
      {
        heading: "CURRENT STATE",
        body: [
          "Stages 1 to 3 of 9 are done: data foundation, vessel tracking and route intelligence.",
          "Each source is labelled LIVE, HISTORICAL or stale, with its coverage limits written down.",
        ],
      },
      {
        heading: "NEXT STEP",
        body: ["ETA model training on NOAA MarineCadastre AIS archives, planned for stage 5."],
      },
    ],
  },
  {
    id: "exoplanet",
    number: "04",
    name: "AI Exoplanet Detection",
    category: "RESEARCH / ML",
    year: "Starting soon",
    status: "STARTING SOON",
    tagline: "A research project about to begin: telescope light curves meet ML.",
    description:
      "A planned research project: detecting exoplanet candidates from telescope light curves through signal processing and an AI model. Currently at the starting line.",
    hardware: [],
    software: ["PYTHON", "ML - PLANNED"],
    visual: "exoplanet",
    milestones: [
      { label: "Sketch the pipeline: light curve → signal processing → model", done: true },
      { label: "Pick a public light-curve dataset", done: false },
      { label: "First signal-processing pass", done: false },
      { label: "Train a first detection model", done: false },
      { label: "Shortlist exoplanet candidates", done: false },
    ],
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
    name: "AR Arduino Interactive Tutor",
    category: "AR / HARDWARE EDUCATION",
    year: "In development",
    status: "IN PROGRESS",
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
    milestones: [
      { label: "Concept and architecture documented", done: true },
      { label: "First Unity scene with AR Foundation pose tracking", done: false },
      { label: "Spatial pinout overlay on the UNO", done: false },
      { label: "3D component catalog (LED, button, HC-SR04, DHT11, SG90)", done: false },
      { label: "Animated signal waveforms", done: false },
      { label: "Android build", done: false },
    ],
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

const ORDER = [
  "pitchside", "holofoil", "smartstock", "lifeos", "ledger", "brickvault",
  "tideline", "ar-arduino", "medical-box", "ecommerce", "exoplanet",
];

/** The register, numbered in display order. APTA sits apart, in the featured block above it. */
export const PROJECTS: Project[] = ORDER.map((id, i) => {
  const p = ALL.find((x) => x.id === id)!;
  return { ...p, number: String(i + 1).padStart(2, "0") };
});
