import { Block, Bus, C, DIM, Frame, PANEL, Pipeline, TEXT } from "./schematic";

/* Schematics for the software projects, drawn with the shared kit so they
   sit next to the hardware diagrams: pastel line-work on the plum panel. */

/* ---------------- Holofoil: storefront, cart and accounts ---------------- */
export function HolofoilVisual() {
  const cards = [C.pink, C.sky, C.butter, C.mint, C.lilac];
  return (
    <Frame
      fig="FIG.02"
      title="CARD SHOP"
      status="BUILT"
      label="Holofoil: a fan of five trading cards in top-loaders with a price sticker, a cart, an accounts block with hashed passwords, and a currency switch"
      caption="Real card images, a cart with stock limits and accounts with hashed passwords, priced in ₹, $, € or £."
    >
      <Bus d="M330 150 H372" color={C.pink} />
      <Bus d="M476 168 V186" color={C.mint} count={1} dur={1.1} />

      <Block x={20} y={52} w={310} h={262} color={C.pink} title="STOREFRONT" sub="/shop">
        {cards.map((c, i) => {
          const r = (i - 2) * 9;
          return (
            <g key={i} transform={`rotate(${r} 175 300)`}>
              <rect x="140" y="104" width="70" height="98" rx="5" fill={PANEL} stroke={TEXT} strokeOpacity="0.5" />
              <rect x="146" y="110" width="58" height="86" rx="3" fill={c} fillOpacity="0.16" stroke={c} strokeOpacity="0.8" />
              <rect x="152" y="118" width="46" height="34" rx="2" fill={c} fillOpacity="0.25" />
              <rect x="152" y="160" width="34" height="4" rx="2" fill={TEXT} fillOpacity="0.5" />
              <rect x="152" y="170" width="24" height="4" rx="2" fill={DIM} fillOpacity="0.5" />
            </g>
          );
        })}
        <g className="sch-notify">
          <rect x="198" y="222" width="76" height="20" rx="4" fill={C.butter} />
          <text x="236" y="236" textAnchor="middle" fontSize="9" fill={PANEL} fontWeight={700}>
            ₹9,910 NM
          </text>
        </g>
        <text x="32" y="300" fontSize="8" letterSpacing="1" fill={DIM}>
          SCROLL → THE PACK OPENS
        </text>
      </Block>

      <Block x={374} y={52} w={206} h={116} color={C.sky} title="CART" sub="STOCK LIMITS">
        {[0, 1].map((r) => (
          <g key={r}>
            <rect x="386" y={76 + r * 26} width="16" height="22" rx="2" fill={C.sky} fillOpacity="0.25" stroke={C.sky} />
            <rect x="410" y={82 + r * 26} width={70 - r * 16} height="4" rx="2" fill={TEXT} fillOpacity="0.5" />
            <rect x="410" y={91 + r * 26} width="40" height="4" rx="2" fill={DIM} fillOpacity="0.4" />
            <text x="568" y={90 + r * 26} textAnchor="end" fontSize="8.5" fill={TEXT}>
              {r ? "$64" : "$118"}
            </text>
          </g>
        ))}
        <text x="386" y="156" fontSize="8" letterSpacing="0.8" fill={DIM}>
          ₹ · $ · € · £
        </text>
        <text x="568" y="156" textAnchor="end" fontSize="8" letterSpacing="0.8" fill={C.mint} className="sch-notify">
          FREE OVER $100
        </text>
      </Block>

      <Block x={374} y={188} w={206} h={126} color={C.mint} title="ACCOUNTS" sub="PBKDF2-SHA256">
        {[0, 1, 2, 3].map((r) => (
          <g key={r}>
            <rect x="386" y={210 + r * 24} width="182" height="18" rx="3" fill={C.mint} fillOpacity="0.16" className="sch-seq" style={{ animationDuration: "4s", animationDelay: `${r}s` }} />
            <rect x="394" y={217 + r * 24} width={40 + ((r * 9) % 18)} height="4" rx="2" fill={TEXT} fillOpacity="0.45" />
            <text x="560" y={222 + r * 24} textAnchor="end" fontSize="7.5" fill={DIM}>
              salt · hash
            </text>
          </g>
        ))}
      </Block>

      <Pipeline y={334} items={["BROWSE", "FILTER", "CART", "SIGN IN", "CHECKOUT", "ORDERS"]} colors={[C.pink, C.sky, C.butter, C.lilac, C.peach, C.mint]} />
    </Frame>
  );
}

/* ---------------- SmartStock: shelves, scanner and an append-only log ---------------- */
export function SmartStockVisual() {
  const levels = [0.8, 0.3, 0.95, 0.15, 0.6, 0.7, 0.45, 0.9, 0.2];
  return (
    <Frame
      fig="FIG.03"
      title="WAREHOUSE MAP"
      status="BUILT"
      label="SmartStock: a grid of nine shelf locations with stock bars, two below reorder level, a barcode scanner, and a movement log that cannot be edited"
      caption="Locations, live stock levels and a movement history that can't be edited."
    >
      <Bus d="M368 110 H330" color={C.sky} />
      <Bus d="M330 250 H368" color={C.butter} dur={2.2} />

      <Block x={20} y={52} w={310} h={262} color={C.mint} title="LOCATIONS" sub="A-01-01 → C-01-03">
        {levels.map((l, i) => {
          const x = 32 + (i % 3) * 98;
          const y = 76 + Math.floor(i / 3) * 76;
          const low = l < 0.25;
          const c = low ? C.pink : C.mint;
          return (
            <g key={i}>
              <rect x={x} y={y} width="88" height="64" rx="5" fill={c} fillOpacity="0.05" stroke={c} strokeOpacity={low ? 0.9 : 0.4} />
              <text x={x + 8} y={y + 15} fontSize="8" letterSpacing="0.8" fill={low ? C.pink : DIM}>
                {String.fromCharCode(65 + Math.floor(i / 3))}-01-0{(i % 3) + 1}
              </text>
              <rect x={x + 8} y={y + 46} width="72" height="7" rx="3.5" fill={TEXT} fillOpacity="0.08" />
              <rect x={x + 8} y={y + 46} width={72 * l} height="7" rx="3.5" fill={c} className="sch-bar" style={{ animationDelay: `${i * 0.15}s` }} />
              {low && (
                <text x={x + 80} y={y + 15} textAnchor="end" fontSize="7" fill={C.pink} className="sch-pulse">
                  LOW
                </text>
              )}
            </g>
          );
        })}
      </Block>

      <Block x={370} y={52} w={210} h={116} color={C.sky} title="SCAN" sub="EAN-13 · CODE 128">
        {Array.from({ length: 26 }).map((_, i) => (
          <rect key={i} x={386 + i * 6.6} y="78" width={i % 3 ? 2 : 3.5} height="52" fill={TEXT} fillOpacity="0.75" />
        ))}
        <rect x="380" y="78" width="190" height="2" fill={C.pink} className="sch-scan" />
        <text x="386" y="152" fontSize="8.5" letterSpacing="1" fill={TEXT}>
          5 012345 678900
        </text>
      </Block>

      <Block x={370} y={188} w={210} h={126} color={C.butter} title="MOVEMENTS" sub="APPEND-ONLY">
        {[
          ["IN", "+24", C.mint],
          ["OUT", "−6", C.pink],
          ["ADJUST", "=41", C.butter],
          ["OUT", "−2", C.pink],
        ].map(([t, n, c], r) => (
          <g key={r} className="sch-seq" style={{ animationDuration: "5s", animationDelay: `${r * 1.2}s`, opacity: 1 }}>
            <text x="382" y={222 + r * 22} fontSize="8.5" letterSpacing="0.8" fill={c}>
              {t}
            </text>
            <rect x="440" y={216 + r * 22} width="70" height="4" rx="2" fill={TEXT} fillOpacity="0.35" />
            <text x="568" y={222 + r * 22} textAnchor="end" fontSize="8.5" fill={TEXT}>
              {n}
            </text>
          </g>
        ))}
      </Block>

      <Pipeline y={334} items={["BROWSER", "SERVER ACTION", "ZOD", "RLS", "POSTGRES FN"]} colors={[C.sky, C.lilac, C.butter, C.peach, C.mint]} />
    </Frame>
  );
}

/* ---------------- LifeOS: week plan, focus timer, habits ---------------- */
export function LifeOSVisual() {
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const blocks: [number, number, number, string][] = [
    [0, 0, 2, C.sky], [1, 2, 1, C.pink], [2, 0, 3, C.mint], [3, 1, 2, C.butter],
    [4, 3, 1, C.lilac], [5, 0, 1, C.peach], [0, 3, 1, C.pink], [2, 4, 1, C.sky], [4, 0, 2, C.mint],
  ];
  return (
    <Frame
      fig="FIG.04"
      title="WEEK PLANNER"
      status="BUILT"
      label="LifeOS: a week grid of time blocks, a focus timer ring, and a habit streak row"
      caption="Plan the week in blocks, focus with a timer that survives reloads, and keep honest streaks."
    >
      <Block x={20} y={52} w={380} h={262} color={C.lilac} title="THIS WEEK" sub="DRAG TO PLAN">
        {days.map((d, i) => (
          <text key={i} x={58 + i * 48} y="82" textAnchor="middle" fontSize="8.5" fill={DIM}>
            {d}
          </text>
        ))}
        {Array.from({ length: 6 }).map((_, r) => (
          <line key={r} x1="34" x2="388" y1={92 + r * 36} y2={92 + r * 36} stroke={TEXT} strokeOpacity="0.07" />
        ))}
        {blocks.map(([d, r, h, c], i) => (
          <rect key={i} x={38 + d * 48} y={95 + r * 36} width="40" height={h * 36 - 6} rx="5" fill={c} fillOpacity="0.2" stroke={c}
            className={i === 2 ? "sch-pulse" : undefined} />
        ))}
      </Block>

      <Block x={416} y={52} w={164} h={140} color={C.pink} title="FOCUS" sub="25:00">
        <circle cx="498" cy="128" r="38" fill="none" stroke={TEXT} strokeOpacity="0.1" strokeWidth="6" />
        <circle cx="498" cy="128" r="38" fill="none" stroke={C.pink} strokeWidth="6" strokeLinecap="round" pathLength={1}
          strokeDasharray="0.62 1" transform="rotate(-90 498 128)" />
        <text x="498" y="132" textAnchor="middle" fontSize="12" fill={TEXT}>
          15:32
        </text>
        <text x="498" y="182" textAnchor="middle" fontSize="7.5" letterSpacing="0.8" fill={C.mint}>
          SITES BLOCKED
        </text>
      </Block>

      <Block x={416} y={208} w={164} h={106} color={C.mint} title="HABITS" sub="5-DAY STREAK">
        {days.map((_, i) => (
          <circle key={i} cx={434 + i * 21} cy="252" r="7" fill={i < 5 ? C.mint : "none"} fillOpacity={i < 5 ? 0.85 : 0} stroke={C.mint} />
        ))}
        <text x="428" y="292" fontSize="8" letterSpacing="0.8" fill={DIM}>
          READ 20 MIN
        </text>
      </Block>

      <Pipeline y={334} items={["PLAN", "FOCUS", "HABITS", "GOALS", "REVIEW"]} colors={[C.lilac, C.pink, C.mint, C.butter, C.sky]} />
    </Frame>
  );
}

/* ---------------- Ledger: masked balance, budgets, donut ---------------- */
export function LedgerVisual() {
  const segs: [number, string][] = [[0.34, C.pink], [0.22, C.mint], [0.18, C.butter], [0.14, C.sky], [0.12, C.lilac]];
  let acc = 0;
  return (
    <Frame
      fig="FIG.05"
      title="MONEY DASHBOARD"
      status="BUILT"
      label="Ledger: a hidden balance, safe-to-spend figure, two budget bars and a spending donut by category"
      caption="The balance stays hidden until you ask. Safe-to-spend is worked out after essentials."
    >
      <Block x={20} y={52} w={300} h={262} color={C.butter} title="BALANCE" sub="HIDDEN BY DEFAULT">
        <text x="34" y="112" fontSize="26" fill={TEXT}>
          ₹ ••••••
        </text>
        <rect x="216" y="92" width="88" height="24" rx="12" fill={C.butter} fillOpacity="0.15" stroke={C.butter} />
        <circle cx="230" cy="104" r="8" fill={C.butter} className="sch-toggle" />
        <text x="34" y="150" fontSize="8.5" letterSpacing="0.8" fill={DIM}>
          SAFE TO SPEND
        </text>
        <text x="34" y="170" fontSize="15" fill={C.mint}>
          ₹6,400
        </text>
        {[["FOOD", 0.78, C.pink], ["TRAVEL", 0.42, C.sky]].map(([t, p, c], i) => (
          <g key={String(t)}>
            <text x="34" y={208 + i * 42} fontSize="8.5" letterSpacing="0.8" fill={DIM}>
              {t as string}
            </text>
            <rect x="34" y={216 + i * 42} width="270" height="8" rx="4" fill={TEXT} fillOpacity="0.08" />
            <rect x="34" y={216 + i * 42} width={270 * (p as number)} height="8" rx="4" fill={c as string} className="sch-bar" />
          </g>
        ))}
      </Block>

      <Block x={336} y={52} w={244} h={262} color={C.pink} title="SPENDING" sub="THIS MONTH">
        <g transform="rotate(-90 458 185)">
          {segs.map(([p, c], i) => {
            const el = (
              <circle key={i} cx="458" cy="185" r="62" fill="none" stroke={c} strokeWidth="20" pathLength={1}
                strokeDasharray={`${p - 0.012} 1`} strokeDashoffset={-acc} />
            );
            acc += p;
            return el;
          })}
        </g>
        <text x="458" y="182" textAnchor="middle" fontSize="11" fill={TEXT}>
          FOOD
        </text>
        <text x="458" y="196" textAnchor="middle" fontSize="9" fill={DIM}>
          34%
        </text>
        <text x="350" y="300" fontSize="8" letterSpacing="0.8" fill={DIM}>
          RENT DUE IN 4 DAYS
        </text>
      </Block>

      <Pipeline y={334} items={["BALANCES", "BUDGETS", "GOALS", "RECURRING", "ANALYTICS"]} colors={[C.butter, C.pink, C.mint, C.sky, C.lilac]} />
    </Frame>
  );
}

/* ---------------- BrickVault: spend by theme in bricks ---------------- */
export function BrickVaultVisual() {
  const themes: [string, number, string][] = [["TECHNIC", 5, C.sky], ["STAR WARS", 4, C.lilac], ["CITY", 3, C.mint], ["ICONS", 6, C.pink], ["IDEAS", 2, C.butter]];
  return (
    <Frame
      fig="FIG.06"
      title="VAULT HQ"
      status="BUILT"
      label="BrickVault: stacked bricks showing spending by LEGO theme, under a total-spent counter"
      caption="What you paid and what it's worth, by theme, with every LEGO set and minifigure a search away."
    >
      <Block x={20} y={52} w={560} h={262} color={C.peach} title="SPENT BY THEME" sub="EXAMPLE VAULT">
        <text x="34" y="98" fontSize="24" fill={TEXT}>
          ₹1,84,600
        </text>
        <text x="34" y="116" fontSize="8.5" letterSpacing="0.8" fill={DIM}>
          TOTAL SPENT · 18 SETS · VALUE +12%
        </text>
        {themes.map(([t, n, c], i) => {
          const x = 220 + i * 70;
          return (
            <g key={t}>
              {Array.from({ length: n }).map((_, j) => (
                <g key={j} className="sch-seq" style={{ animationDuration: "6s", animationDelay: `${i * 0.3 + j * 0.15}s`, opacity: 1 }}>
                  <rect x={x} y={280 - (j + 1) * 30} width="52" height="26" rx="3" fill={c} fillOpacity="0.2" stroke={c} />
                  <rect x={x + 8} y={280 - (j + 1) * 30 - 5} width="12" height="5" rx="1.5" fill={c} fillOpacity="0.6" />
                  <rect x={x + 32} y={280 - (j + 1) * 30 - 5} width="12" height="5" rx="1.5" fill={c} fillOpacity="0.6" />
                </g>
              ))}
              <text x={x + 26} y="298" textAnchor="middle" fontSize="7.5" letterSpacing="0.6" fill={DIM}>
                {t}
              </text>
            </g>
          );
        })}
      </Block>
      <Pipeline y={334} items={["CATALOG", "VAULT", "WISHLIST", "VALUE", "CSV"]} colors={[C.sky, C.pink, C.lilac, C.mint, C.butter]} />
    </Frame>
  );
}

/* ---------------- Tideline: routes, vessels and source health ---------------- */
export function TidelineVisual() {
  const routes = [
    ["M40 270 C 130 210, 220 250, 290 170 S 400 110, 440 90", C.sky],
    ["M40 120 C 130 140, 210 90, 270 180 S 370 260, 440 240", C.mint],
  ] as const;
  return (
    <Frame
      fig="FIG.07"
      title="SEA CHART"
      status="IN PROGRESS"
      label="Tideline: two shipping routes with vessels moving between ports, and a list of data sources with health labels"
      caption="Live vessels, ports and weather, with every source labelled live, historical or stale."
    >
      <Block x={20} y={52} w={430} h={262} color={C.sky} title="ROUTES" sub="AIS · TERRESTRIAL">
        <path d="M30 304 C 120 292, 180 312, 260 300 S 380 290, 440 306" fill="none" stroke={TEXT} strokeOpacity="0.15" />
        {routes.map(([d, c], i) => (
          <Bus key={i} d={d} color={c} dur={7 + i * 3} count={2} dashed />
        ))}
        {[[40, 270], [440, 90], [40, 120], [440, 240]].map(([x, y], i) => (
          <g key={i}>
            <rect x={x - 5} y={y - 5} width="10" height="10" rx="2" fill={PANEL} stroke={TEXT} />
            <text x={x + 10} y={y - 8} fontSize="7.5" letterSpacing="0.8" fill={DIM}>
              PORT {String.fromCharCode(65 + i)}
            </text>
          </g>
        ))}
        <text x="270" y="300" fontSize="8.5" letterSpacing="0.8" fill={C.butter} className="sch-notify">
          ETA 14:20 ± 38 MIN
        </text>
      </Block>

      <Block x={466} y={52} w={114} h={262} color={C.mint} title="SOURCES" sub="">
        {[
          ["AIS", "LIVE", C.mint],
          ["PORTWATCH", "HIST", C.butter],
          ["METEO", "LIVE", C.mint],
          ["NOAA NHC", "LIVE", C.mint],
          ["GDACS", "LIVE", C.mint],
          ["WORLD BANK", "HIST", C.butter],
        ].map(([s, h, c], i) => (
          <g key={s}>
            <circle cx="480" cy={86 + i * 36} r="3.5" fill={c} className={h === "LIVE" ? "sch-pulse" : undefined} />
            <text x="490" y={89 + i * 36} fontSize="7.5" fill={TEXT}>
              {s}
            </text>
            <text x="490" y={101 + i * 36} fontSize="7" letterSpacing="0.6" fill={DIM}>
              {h}
            </text>
          </g>
        ))}
      </Block>

      <Pipeline y={334} items={["AIS", "PORTS", "WEATHER", "ROUTES", "ETA"]} colors={[C.sky, C.peach, C.butter, C.mint, C.pink]} />
    </Frame>
  );
}

/* ---------------- APTA: a bilingual application moving through the system ---------------- */
export function AptaVisual() {
  const steps = [
    ["APPLY", "விண்ணப்பம்", C.pink],
    ["REVIEW", "பரிசீலனை", C.lilac],
    ["APPROVE", "ஒப்புதல்", C.butter],
    ["FUND", "நிதி", C.mint],
    ["REPORT", "அறிக்கை", C.sky],
  ] as const;
  return (
    <Frame
      fig="FIG.00"
      title="FUNDING PLATFORM"
      status="LIVE"
      label="APTA Empowers: a bilingual English and Tamil application form, three user roles, and a five-stage pipeline from apply to report backed by Supabase"
      caption="One application, in English and Tamil, from the form to the funding ledger."
    >
      <Bus d="M262 140 H298" color={C.pink} />
      <Bus d="M440 196 V214" color={C.mint} count={1} dur={1.1} />

      <Block x={20} y={52} w={242} h={262} color={C.pink} title="APPLICATION" sub="8 SECTIONS">
        {[
          ["Name · பெயர்", 0.7],
          ["Aadhaar · ஆதார்", 0.55],
          ["+91 phone · தொலைபேசி", 0.62],
          ["College · கல்லூரி", 0.8],
          ["Course · படிப்பு", 0.5],
        ].map(([l, w], i) => (
          <g key={l as string}>
            <text x="32" y={86 + i * 40} fontSize="8" fill={DIM}>
              {l as string}
            </text>
            <rect x="32" y={92 + i * 40} width="218" height="18" rx="4" fill="none" stroke={C.pink} strokeOpacity="0.35" />
            <rect x="40" y={99 + i * 40} width={180 * (w as number)} height="4" rx="2" fill={TEXT} fillOpacity="0.45"
              className="sch-seq" style={{ animationDuration: "6s", animationDelay: `${i * 0.8}s`, opacity: 1 }} />
          </g>
        ))}
        <rect x="32" y="292" width="80" height="16" rx="3" fill={C.pink} fillOpacity="0.2" stroke={C.pink} />
        <text x="72" y="303" textAnchor="middle" fontSize="7.5" letterSpacing="0.8" fill={TEXT}>
          SUBMIT
        </text>
      </Block>

      <Block x={300} y={52} w={280} h={144} color={C.lilac} title="ROLES" sub="ROW LEVEL SECURITY">
        {[["STUDENT", "applies · tracks", C.pink], ["STAFF", "reviews", C.lilac], ["ADMIN", "approves · funds", C.butter]].map(([r, d, c], i) => (
          <g key={r}>
            <circle cx="324" cy={92 + i * 34} r="9" fill={c} fillOpacity="0.2" stroke={c} />
            <circle cx="324" cy={89 + i * 34} r="2.8" fill={c} />
            <text x="342" y={95 + i * 34} fontSize="9" letterSpacing="0.8" fill={TEXT}>
              {r}
            </text>
            <text x="568" y={95 + i * 34} textAnchor="end" fontSize="8" fill={DIM}>
              {d}
            </text>
          </g>
        ))}
      </Block>

      <Block x={300} y={214} w={280} h={100} color={C.mint} title="SUPABASE" sub="7 TABLES · REALTIME">
        {["applications", "beneficiaries", "ledger"].map((t, i) => (
          <g key={t}>
            <rect x="312" y={236 + i * 24} width="256" height="18" rx="3" fill={C.mint} fillOpacity="0.16" className="sch-seq" style={{ animationDuration: "4.5s", animationDelay: `${i * 1.5}s` }} />
            <text x="320" y={248 + i * 24} fontSize="8.5" fill={TEXT}>
              {t}
            </text>
          </g>
        ))}
        <circle cx="556" cy="226" r="3.5" fill={C.mint} className="sch-pulse" />
      </Block>

      <Pipeline y={334} items={steps.map(([en]) => en)} colors={steps.map(([, , c]) => c)} />
    </Frame>
  );
}
