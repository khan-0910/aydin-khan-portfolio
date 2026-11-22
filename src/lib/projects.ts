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
  /** the longer write-up, opened from "The full story" */
  sections: CaseSection[];
  /** progress checklist: flip `done` to true as you finish steps; the bar fills from these */
  milestones?: { label: string; done: boolean }[];
};

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
      "I'm a big football fan, so I wanted to see how far I could get predicting matches using only free data. Pitchside pulls from five public sources, trains three models and shows everything on a homepage that's literally a pitch you scroll down.",
    hardware: [],
    software: ["Python, FastAPI, DuckDB", "scikit-learn, XGBoost, SciPy", "React 19, Vite, TypeScript", "GSAP ScrollTrigger, Lenis", "GitHub Actions"],
    visual: "football",
    links: [{ label: "REPO", href: "https://github.com/khan-0910/Pitchside-Prem-" }],
    sections: [
      {
        heading: "WHY I MADE IT",
        body: [
          "A scoreline doesn't tell you much about how a game actually went. I wanted predictions that show how sure they are and are honest when they're wrong.",
        ],
      },
      {
        heading: "WHAT I BUILT",
        body: [
          "A match centre with win, draw and loss chances, expected goals and the most likely scorelines.",
          "A player lab where you can compare players per 90 minutes and find similar ones.",
          "Transfer values from a model, shown next to the real recorded value with a range.",
          "The homepage is a pitch: you scroll from the centre circle to the goal and can kick the ball around.",
        ],
      },
      {
        heading: "HOW IT WORKS",
        body: [
          "The backend is Python with FastAPI and DuckDB. It pulls from the FPL API, football-data.co.uk, football-data.org, Transfermarkt and Understat, builds features and trains the models.",
          "A GitHub Actions job refreshes the data every 15 minutes and republishes the site.",
        ],
      },
      {
        heading: "HOW WELL IT DOES",
        body: [
          "I tried logistic regression, random forest, gradient boosting and XGBoost. Logistic regression won, which honestly surprised me.",
          "On matches it never saw, it gets 46.6% right (log loss 1.040). Bookmakers get 49.1%, so they're still better, but it beats just going off past averages (42.1%).",
          "I also wrote tests to make sure no future information sneaks into a prediction. That was the bug I was most worried about.",
        ],
      },
      {
        heading: "WHAT'S NEXT",
        body: ["Putting the season simulator back on the site."],
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
      "In Grade 12 I made a basic online shop in Python with login, a cart and checkout. This year I rebuilt the same idea as something I'd actually want to use: a card shop with real card images, prices in rupees, dollars, euros or pounds, and a booster pack that opens as you scroll.",
    hardware: [],
    software: ["React 19, Vite, TypeScript", "GSAP ScrollTrigger and Flip", "Lenis, React Bits", "Tailwind CSS 4", "Web Crypto (PBKDF2)"],
    visual: "holofoil",
    links: [
      { label: "Visit the shop", href: "https://khan-0910.github.io/holofoil/" },
      { label: "REPO", href: "https://github.com/khan-0910/holofoil" },
    ],
    sections: [
      {
        heading: "WHY I MADE IT",
        body: [
          "My Grade 12 shop worked, but it looked like a school project. I wanted to see how far I could take the same flow with what I know now.",
        ],
      },
      {
        heading: "WHAT I BUILT",
        body: [
          "A shop with search, filters and sorting, using real card images.",
          "Accounts where passwords are saved as salted hashes, never as plain text.",
          "A cart, checkout and order history, with prices in four currencies.",
          "A small script so I can add a new card to the stock with one command.",
        ],
      },
      {
        heading: "WHAT I LEARNED",
        body: [
          "My first version had gradients and glowing effects everywhere and looked AI-made. I redid the whole design with one calm palette and let the cards be the colourful part.",
          "I also got properly into GSAP: ScrollTrigger for the pack opening and Flip for the grid rearranging when you filter.",
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
      "A lot of small businesses still track stock in spreadsheets, where one wrong edit quietly changes everything. SmartStock tracks products, where they're kept and every time stock moves, and you can scan barcodes with a scanner or your phone camera.",
    hardware: ["USB or Bluetooth barcode scanner", "Phone camera (EAN-13, UPC, Code 128)"],
    software: ["Next.js, TypeScript", "Supabase (Postgres, Auth, RLS)", "Zod, Vitest", "GSAP, Lenis, React Bits"],
    visual: "smartstock",
    links: [{ label: "REPO", href: "https://github.com/khan-0910/SmartStock" }],
    sections: [
      {
        heading: "WHAT I BUILT",
        body: [
          "Products with SKU, barcode, prices and a reorder level, plus shelf locations like A-01-03.",
          "Stock in, stock out and stock counts, with a history that can't be edited or deleted.",
          "Barcode scanning with a USB scanner or the phone camera.",
          "A dashboard with stock value and a low-stock list, plus data export and account deletion.",
        ],
      },
      {
        heading: "HOW IT WORKS",
        body: [
          "It's Next.js with Supabase. The browser never touches the database directly: every change goes through the server and gets checked first.",
          "Stock changes happen inside database functions, so the stock count and the history can never disagree.",
        ],
      },
      {
        heading: "WHERE IT'S AT",
        body: ["The database and validation tests pass. I still need to test it end to end on a hosted Supabase project."],
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
    description:
      "Most planners only show what you meant to do. I wanted one that helps while I'm actually working, so LifeOS has a focus timer, a browser extension that blocks sites, and a Windows app that notices when I open the wrong apps.",
    hardware: [],
    software: ["Next.js, TypeScript (monorepo)", "Browser extension (MV3)", "Tauri 2, Rust", "Supabase schema and RLS"],
    visual: "lifeos",
    links: [{ label: "REPO", href: "https://github.com/khan-0910/Life-OS" }],
    sections: [
      {
        heading: "WHAT I BUILT",
        body: [
          "Day and week planning where you drag to create, move and resize blocks.",
          "Habits with streaks, and goals that fill up from the tasks linked to them.",
          "A Goal Studio with templates like SMART goals, OKRs and a wheel of life.",
          "A focus timer that keeps counting even if you reload the page.",
        ],
      },
      {
        heading: "WHERE IT'S AT",
        body: [
          "The web planner works and saves everything in the browser. The Windows companion app is written, but I haven't compiled it yet because I don't have Rust set up on my laptop.",
        ],
      },
      {
        heading: "WHAT'S NEXT",
        body: ["Adding accounts and cloud sync. The database side is already written and tested."],
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
    description:
      "I check my balance in public all the time, in class or on the bus, and most finance apps put the number right at the top. Ledger hides it by default and tells you what's actually safe to spend after your fixed costs.",
    hardware: [],
    software: ["React 18, Vite, TypeScript", "React Router", "Supabase", "Framer Motion", "Hand-written CSS"],
    visual: "ledger",
    links: [{ label: "REPO", href: "https://github.com/khan-0910/Ledger-Project" }],
    sections: [
      {
        heading: "WHAT I BUILT",
        body: [
          "A dashboard with safe-to-spend and simple insights.",
          "Transactions with search, filters and CSV export.",
          "Budgets for each category, savings goals and recurring expenses.",
          "A demo mode with sample data, so anyone can try it without signing up.",
        ],
      },
      {
        heading: "WHAT I LEARNED",
        body: [
          "I wrote all the CSS myself instead of using a UI library. It took longer, but I understand layout a lot better now.",
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
    description:
      "I wanted to know how much I'd actually spent on LEGO (scary) and whether any of my sets had gone up in value. BrickVault lets you log each set with what you paid and what it's worth now, and adds it all up.",
    hardware: [],
    software: ["Next.js, TypeScript", "GitHub Pages", "GitHub Actions", "Vitest"],
    visual: "brickvault",
    links: [{ label: "REPO", href: "https://github.com/khan-0910/Lego-Vault" }],
    sections: [
      {
        heading: "WHAT I BUILT",
        body: [
          "A home screen with a big total-spent counter, gain or loss, and price per piece.",
          "A searchable catalog of about 28,500 sets and 17,000 minifigures you can add to your vault or wishlist in one click.",
          "Filters, spending by theme and CSV export.",
        ],
      },
      {
        heading: "HOW IT WORKS",
        body: [
          "It's a Next.js site published on GitHub Pages. Every night a GitHub Action downloads the latest set catalog and rebuilds the site. Your own collection is saved in your browser.",
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
    description:
      "Tideline tracks ships using free live data, and the goal is to predict when they'll arrive. The tricky part is that free data has big gaps, so every number shows where it came from and how fresh it is.",
    hardware: [],
    software: ["Python", "AISStream (WebSocket)", "IMF PortWatch, Open-Meteo, NOAA, GDACS"],
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
        heading: "WHY I'M MAKING IT",
        body: [
          "Free ship-position data mostly comes from receivers on the coast, so ships in the open ocean disappear. Port data is also about a week behind. I want a tool that shows those gaps instead of hiding them.",
        ],
      },
      {
        heading: "WHERE IT'S AT",
        body: [
          "Stages 1 to 3 of 9 are done: the data setup, live vessel tracking and route intelligence.",
          "Each data source is labelled live, historical or stale.",
        ],
      },
      {
        heading: "WHAT'S NEXT",
        body: ["Training an arrival-time model on NOAA's AIS archives."],
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
    description:
      "When I started with Arduino, I kept switching between a flat wiring diagram and the real board. This app puts the explanation on top of the actual board in AR: pin labels, the parts and what the signals are doing.",
    hardware: [
      "Arduino UNO (ATmega328P)",
      "LED and resistor",
      "Push button and potentiometer",
      "HC-SR04 ultrasonic sensor",
      "DHT11 sensor",
      "SG90 micro servo",
    ],
    software: ["Unity", "AR Foundation", "C#", "Blender", "Android"],
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
        heading: "THE IDEA",
        body: [
          "You point your phone at an Arduino UNO, the pins light up with labels, and you can tap a part to see how it works and what its signal looks like.",
          "I'm starting with an LED, a push button, a potentiometer, the HC-SR04 ultrasonic sensor, the DHT11 sensor and an SG90 servo.",
        ],
      },
      {
        heading: "HOW I'M BUILDING IT",
        body: ["Unity with AR Foundation and C#, with the 3D models made in Blender, running on Android."],
      },
      {
        heading: "WHERE IT'S AT",
        body: ["The plan is done. Next is the first Unity scene that tracks the board and shows one pin label."],
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
    description:
      "For my first-year multidisciplinary project I built a medicine box that sounds an alarm when it's time to take your medicine and notifies a caretaker through an app. It mixed mechanics, electronics and coding, which was all pretty new to me then.",
    hardware: ["ESP32", "Automated switches"],
    software: ["Python"],
    visual: "medical",
    sections: [
      {
        heading: "WHY I MADE IT",
        body: [
          "It's really easy to miss a dose, both for patients and for the people looking after them. I wanted the box to do the reminding.",
        ],
      },
      {
        heading: "WHAT I BUILT",
        body: [
          "The box itself, with compartments controlled by switches.",
          "An ESP32 that reads the switches and sets off the alarm.",
          "A Python app that sends the caretaker a notification.",
        ],
      },
      {
        heading: "TESTING IT",
        body: [
          "I ran the box through full cycles, from the alarm going off to the caretaker getting notified, to check every part worked together.",
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
    description:
      "When a planet passes in front of its star, the star dims a tiny bit. EXOVET downloads real TESS light curves, finds those dips, and uses a Transformer model to decide whether each one is a planet or a false alarm like an eclipsing binary. It also says how unsure it is.",
    hardware: [],
    software: [
      "Python, PyTorch (Transformer)",
      "lightkurve, wotan, Transit Least Squares",
      "batman and emcee (transit fitting)",
      "scikit-learn, astropy",
      "FastAPI, Next.js",
    ],
    visual: "exoplanet",
    links: [{ label: "REPO", href: "https://github.com/khan-0910/IS-project" }],
    sections: [
      {
        heading: "HOW IT WORKS",
        body: [
          "It downloads a star's light curve from NASA's MAST archive, cleans it up, and searches for repeating dips with Transit Least Squares.",
          "Then it works out 33 features plus three views of the signal, and a Transformer picks one of five classes: planet candidate, eclipsing binary, grazing binary, blend, or instrument noise.",
          "I run the model 60 times with dropout on to measure how unsure it is, and fit a transit model with MCMC to estimate the planet's size.",
        ],
      },
      {
        heading: "WHAT I FIXED",
        body: [
          "My transit fits on stars with lots of data were way off, because the fit drifted away from the real transits over a 2,578-day baseline. After I limited it to the search window, WASP-18 b came out at 0.0997 of its star's radius, close to the published 0.0965.",
          "I also added a check for when the period search locks onto half or a third of the real period.",
        ],
      },
      {
        heading: "RESULTS",
        body: [
          "On a 16-star test with known answers, my fixes took accuracy from 44% to 62.5% and macro-F1 from 0.47 to 0.54.",
          "Finding the period works really well, within 0.2% of the catalog. Classifying is the weak part because I didn't have enough training data, and the app says that instead of hiding it.",
          "All 54 backend tests pass.",
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
