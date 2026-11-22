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
  /** the write-up behind "The full story": why I made it, what I built, how it works */
  sections: CaseSection[];
  /** progress checklist: flip `done` to true as you finish steps; the bar fills from these */
  milestones?: { label: string; done: boolean }[];
};

const WHY = "WHY I MADE IT";
const WHAT = "WHAT I BUILT";
const HOW = "HOW IT WORKS";

const ALL: Project[] = [
  {
    id: "pitchside",
    number: "",
    name: "Pitchside",
    category: "DATA / ML / FULL STACK",
    year: "2026",
    status: "BUILT",
    tagline: "A Premier League site I made that predicts matches, compares players and estimates transfer values from free data.",
    description:
      "I'm a big football fan, so I wanted to see how far I could get predicting matches using only free data.",
    hardware: [],
    software: [],
    visual: "football",
    links: [{ label: "REPO", href: "https://github.com/khan-0910/Pitchside-Prem-" }],
    sections: [
      {
        heading: WHY,
        body: [
          "I'm a big football fan, and a scoreline doesn't tell you much about how a game actually went. I wanted to see how far I could get predicting matches using only free data.",
        ],
      },
      {
        heading: WHAT,
        body: [
          "A match centre with win, draw and loss chances, expected goals and the most likely scorelines.",
          "A player lab where you can compare players and find similar ones.",
          "Transfer values from a model, shown next to the real recorded value.",
          "A homepage that's a pitch: you scroll from the centre circle to the goal and can kick the ball around.",
        ],
      },
      {
        heading: HOW,
        body: [
          "It pulls match, player and transfer data from five free sources, turns it into features and trains three models on past seasons.",
          "The data refreshes every 15 minutes, so predictions update as results and injuries come in.",
        ],
      },
    ],
  },
  {
    id: "holofoil",
    number: "",
    name: "Holofoil",
    category: "FRONT END / E-COMMERCE",
    year: "2026",
    status: "BUILT",
    tagline: "A Pokémon card shop I made by rebuilding my Grade 12 Python shop as a real website.",
    description:
      "In Grade 12 I made a basic online shop in Python. This year I rebuilt the same idea as a card shop I'd actually want to use.",
    hardware: [],
    software: [],
    visual: "holofoil",
    links: [
      { label: "Visit the shop", href: "https://khan-0910.github.io/holofoil/" },
      { label: "REPO", href: "https://github.com/khan-0910/holofoil" },
    ],
    sections: [
      {
        heading: WHY,
        body: [
          "In Grade 12 I made a basic online shop in Python with login, a cart and checkout. It worked, but it looked like a school project, so I wanted to rebuild it with what I know now.",
        ],
      },
      {
        heading: WHAT,
        body: [
          "A card shop with real card images, search, filters and sorting.",
          "Accounts, a cart, checkout and order history.",
          "Prices in rupees, dollars, euros or pounds.",
          "A booster pack that opens as you scroll down the homepage.",
        ],
      },
      {
        heading: HOW,
        body: [
          "Every card is one line in a stock list, and its picture loads from its card number. I can add a new card with one command.",
          "Passwords are saved scrambled (hashed), never as plain text, and prices are stored in dollars and converted for the other currencies.",
        ],
      },
    ],
  },
  {
    id: "smartstock",
    number: "",
    name: "SmartStock",
    category: "FULL STACK",
    year: "2026",
    status: "BUILT",
    tagline: "An inventory app for small shops that keeps a history of every stock change that nobody can edit.",
    description:
      "A lot of small businesses still track stock in spreadsheets, where one wrong edit quietly changes everything.",
    hardware: [],
    software: [],
    visual: "smartstock",
    links: [{ label: "REPO", href: "https://github.com/khan-0910/SmartStock" }],
    sections: [
      {
        heading: WHY,
        body: [
          "A lot of small businesses still track stock in spreadsheets, where one wrong edit quietly changes everything and nobody can tell what happened.",
        ],
      },
      {
        heading: WHAT,
        body: [
          "A product list with SKUs, barcodes, prices and reorder levels, plus shelf locations like A-01-03.",
          "Stock in, stock out and stock counts, with a history that can't be edited or deleted.",
          "Barcode scanning with a USB scanner or the phone camera.",
          "A dashboard with stock value and a low-stock list.",
        ],
      },
      {
        heading: HOW,
        body: [
          "Every stock change is saved as a new entry in the history instead of overwriting the old number, so the count and the history can never disagree.",
          "Each change is checked on the server before it's saved, so a bad input can't mess up the stock.",
        ],
      },
    ],
  },
  {
    id: "lifeos",
    number: "",
    name: "LifeOS",
    category: "FULL STACK / DESKTOP",
    year: "2026",
    status: "BUILT",
    tagline: "A planner I built for myself that plans my week, tracks habits and blocks distracting sites while I focus.",
    description: "Most planners only show what you meant to do. I wanted one that helps while I'm actually working.",
    hardware: [],
    software: [],
    visual: "lifeos",
    links: [{ label: "REPO", href: "https://github.com/khan-0910/Life-OS" }],
    sections: [
      {
        heading: WHY,
        body: ["Most planners only show what you meant to do. I wanted one that also helps while I'm actually working."],
      },
      {
        heading: WHAT,
        body: [
          "Day and week planning where you drag to create, move and resize blocks.",
          "Habits with streaks, and goals that fill up from the tasks linked to them.",
          "Goal templates like SMART goals, OKRs and a wheel of life.",
          "A focus timer, a browser extension that blocks sites, and a Windows app that notices distracting apps.",
        ],
      },
      {
        heading: HOW,
        body: [
          "The planner saves everything in the browser. When a focus session starts, the extension blocks the sites I picked until the timer ends.",
          "The timer works from timestamps, so it keeps counting correctly even if I reload the page.",
        ],
      },
    ],
  },
  {
    id: "ledger",
    number: "",
    name: "Ledger",
    category: "FRONT END",
    year: "2026",
    status: "BUILT",
    tagline: "A money tracker for students that hides your balance until you choose to show it.",
    description: "I check my balance in public all the time, and most finance apps put the number right at the top.",
    hardware: [],
    software: [],
    visual: "ledger",
    links: [{ label: "REPO", href: "https://github.com/khan-0910/Ledger-Project" }],
    sections: [
      {
        heading: WHY,
        body: [
          "I check my balance in public all the time, in class or on the bus, and most finance apps put the number right at the top.",
        ],
      },
      {
        heading: WHAT,
        body: [
          "A dashboard that hides the balance by default and shows what's safe to spend.",
          "Transactions with search, filters and CSV export.",
          "Budgets for each category, savings goals and recurring expenses.",
        ],
      },
      {
        heading: HOW,
        body: [
          "Safe-to-spend is your balance minus the fixed costs coming up, like rent and subscriptions, so you see what's actually free to use.",
        ],
      },
    ],
  },
  {
    id: "brickvault",
    number: "",
    name: "BrickVault",
    category: "FRONT END",
    year: "2026",
    status: "BUILT",
    tagline: "A comic-book style LEGO tracker that shows how much I've spent and what my sets are worth.",
    description: "I wanted to know how much I'd actually spent on LEGO, and whether any of my sets had gone up in value.",
    hardware: [],
    software: [],
    visual: "brickvault",
    links: [{ label: "REPO", href: "https://github.com/khan-0910/Lego-Vault" }],
    sections: [
      {
        heading: WHY,
        body: ["I wanted to know how much I'd actually spent on LEGO (scary), and whether any of my sets had gone up in value."],
      },
      {
        heading: WHAT,
        body: [
          "A home screen with a big total-spent counter, gain or loss, and price per piece.",
          "A searchable catalog of about 28,500 sets and 17,000 minifigures you can add to your vault or wishlist in one click.",
          "Spending by theme, with filters and CSV export.",
        ],
      },
      {
        heading: HOW,
        body: [
          "You log each set with what you paid and what it's worth now, and it adds everything up. The set catalog updates itself every night.",
        ],
      },
    ],
  },
  {
    id: "tideline",
    number: "",
    name: "Tideline",
    category: "DATA / BACKEND",
    year: "In development",
    status: "IN PROGRESS",
    tagline: "A ship-tracking project I'm building with live vessel positions, ports and weather.",
    description: "Tideline tracks ships using free live data, and the goal is to predict when they'll arrive.",
    hardware: [],
    software: [],
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
        heading: WHY,
        body: [
          "I got curious about how ships are tracked. Free data has big gaps, since ships in the open ocean mostly disappear, and I wanted a tool that shows those gaps instead of hiding them.",
        ],
      },
      {
        heading: WHAT,
        body: [
          "Live vessel tracking, routes between ports, port activity and weather along the way, with arrival-time predictions to come.",
        ],
      },
      {
        heading: HOW,
        body: [
          "It reads live ship positions, port data, marine weather and storm alerts from free sources. Every number is labelled with where it came from and how fresh it is.",
        ],
      },
    ],
  },
  {
    id: "ar-arduino",
    number: "",
    name: "AR Arduino Tutor",
    category: "AR / HARDWARE EDUCATION",
    year: "In development",
    status: "IN PROGRESS",
    tagline: "A phone app I'm making that explains an Arduino when you point the camera at it.",
    description: "When I started with Arduino, I kept switching between a flat wiring diagram and the real board.",
    hardware: [],
    software: [],
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
        heading: WHY,
        body: ["When I started with Arduino, I kept switching between a flat wiring diagram and the real board. I wanted the explanation to sit on the board itself."],
      },
      {
        heading: WHAT,
        body: [
          "An AR app where the pins on an Arduino UNO light up with labels when you point your phone at it.",
          "Parts you can tap to see how they work, starting with an LED, a button, a potentiometer, an ultrasonic sensor, a temperature sensor and a servo.",
        ],
      },
      {
        heading: HOW,
        body: [
          "The phone camera tracks the board and anchors 3D labels and models to it, so they stay in place as you move around.",
        ],
      },
    ],
  },
  {
    id: "medical-box",
    number: "",
    name: "Automatic Medical Box",
    category: "MULTIDISCIPLINARY PROJECT",
    year: "First year",
    status: "BUILT",
    tagline: "My first-year project: a medicine box that reminds you when it's time and alerts a caretaker.",
    description: "It's really easy to miss a dose, both for patients and for the people looking after them.",
    hardware: [],
    software: [],
    visual: "medical",
    sections: [
      {
        heading: WHY,
        body: ["It's really easy to miss a dose, both for patients and for the people looking after them. I wanted the box to do the reminding."],
      },
      {
        heading: WHAT,
        body: [
          "A medicine box with compartments controlled by switches.",
          "An alarm that goes off when it's time to take the medicine.",
          "An app that notifies the caretaker.",
        ],
      },
      {
        heading: HOW,
        body: [
          "A small controller inside the box reads the switches and sets off the alarm, and a Python app sends the caretaker a notification.",
        ],
      },
    ],
  },
  {
    id: "exoplanet",
    number: "",
    name: "EXOVET",
    category: "RESEARCH / ML",
    year: "2026",
    status: "BUILT",
    tagline: "My Intelligent Systems project: an AI that checks real NASA TESS data and decides whether a signal is a planet.",
    description: "When a planet passes in front of its star, the star dims a tiny bit. EXOVET finds those dips and decides what caused them.",
    hardware: [],
    software: [],
    visual: "exoplanet",
    links: [{ label: "REPO", href: "https://github.com/khan-0910/IS-project" }],
    sections: [
      {
        heading: WHY,
        body: [
          "When a planet passes in front of its star, the star dims a tiny bit. Lots of other things cause dips too, so I wanted to see if an AI could tell real planets apart from false alarms.",
        ],
      },
      {
        heading: WHAT,
        body: [
          "A tool where you enter a star, and it downloads real NASA TESS data, finds the dips and says whether it's likely a planet.",
          "It also says how unsure it is, and estimates the planet's size.",
        ],
      },
      {
        heading: HOW,
        body: [
          "It cleans the light curve and searches for dips that repeat on a regular schedule.",
          "Then a Transformer model looks at the shape of the dip and picks one of five answers: planet, eclipsing binary, grazing binary, blend, or instrument noise.",
          "It runs the model 60 times with slight changes to see how much the answer moves, which tells you how sure it is.",
        ],
      },
    ],
  },
];

const ORDER = [
  "pitchside", "holofoil", "smartstock", "lifeos", "ledger", "brickvault",
  "tideline", "ar-arduino", "medical-box", "exoplanet",
];

/** The register, numbered in display order. APTA sits apart, in the featured block above it. */
export const PROJECTS: Project[] = ORDER.map((id, i) => {
  const p = ALL.find((x) => x.id === id)!;
  return { ...p, number: String(i + 1).padStart(2, "0") };
});
