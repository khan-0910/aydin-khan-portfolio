import { Block, Bus, C, DIM, Frame, PANEL, Pipeline, TEXT } from "./schematic";

const CURSOR = "M310 322 C 280 300, 230 270, 186 248";

export default function EcommerceVisual() {
  return (
    <Frame
      fig="FIG.02"
      title="APP ARCHITECTURE"
      status="BUILT"
      label="Architecture of the Python shop: a storefront wireframe with three products and a cart, an auth service for login and register, and a password database"
      caption="Storefront, auth and a password database: the full register → cart → checkout loop."
    >
      <Bus d="M350 100 H388" color={C.lilac} />
      <Bus d="M485 148 V162" color={C.mint} count={1} dur={1} />
      <Bus d="M350 240 H388" color={C.mint} dur={2.2} />

      {/* storefront wireframe */}
      <Block x={20} y={52} w={330} h={260} color={C.pink} title="STOREFRONT" sub="shop.py">
        <rect x="32" y="74" width="306" height="20" rx="4" fill="none" stroke={C.pink} strokeOpacity="0.35" />
        <text x="42" y="87" fontSize="8" fill={DIM}>
          /shop
        </text>
        {/* cart + badge */}
        <path d="M300 79 h4 l4 10 h14 l3 -7 h-19" fill="none" stroke={TEXT} strokeWidth="1.3" strokeLinejoin="round" />
        <circle cx="330" cy="80" r="5" fill={C.pink} />
        <circle cx="330" cy="80" r="5" fill="none" stroke={C.pink} className="sch-ring" />

        {[0, 1, 2].map((i) => {
          const x = 32 + i * 104;
          return (
            <g key={i}>
              <rect x={x} y="104" width="94" height="170" rx="6" fill="none" stroke={C.pink} strokeOpacity="0.35" />
              {/* image placeholder, wireframe style */}
              <rect x={x + 10} y="114" width="74" height="64" rx="3" fill={C.pink} fillOpacity="0.06" stroke={C.pink} strokeOpacity="0.3" />
              <path d={`M${x + 10} 114 L${x + 84} 178 M${x + 84} 114 L${x + 10} 178`} stroke={C.pink} strokeOpacity="0.2" />
              <rect x={x + 10} y="190" width="60" height="5" rx="2.5" fill={TEXT} fillOpacity="0.5" />
              <rect x={x + 10} y="201" width="38" height="5" rx="2.5" fill={DIM} fillOpacity="0.4" />
              <rect x={x + 10} y="213" width="26" height="5" rx="2.5" fill={C.butter} fillOpacity="0.6" />
              <rect x={x + 10} y="240" width="74" height="22" rx="4" fill={C.pink} fillOpacity="0.15" stroke={C.pink} />
              <text x={x + 47} y="254" textAnchor="middle" fontSize="8.5" letterSpacing="1" fill={TEXT}>
                ADD
              </text>
            </g>
          );
        })}
        <circle cx="183" cy="251" r="9" fill="none" stroke={C.pink} className="sch-ring" />

        <rect x="32" y="284" width="306" height="20" rx="4" fill="none" stroke={C.pink} strokeOpacity="0.35" />
        <text x="42" y="297" fontSize="8" fill={DIM}>
          CART · 1 ITEM
        </text>
        <rect x="270" y="287" width="64" height="14" rx="3" fill={C.pink} fillOpacity="0.2" stroke={C.pink} />
        <text x="302" y="297" textAnchor="middle" fontSize="7.5" letterSpacing="0.8" fill={TEXT}>
          CHECKOUT
        </text>
      </Block>

      {/* cursor clicking "add" on the middle product */}
      <path d="M0 0 L0 15 L4 11 L7 18 L10 17 L7 10 L12 10 Z" fill={TEXT} stroke={PANEL} strokeWidth="1" className="sch-motion">
        <animateMotion dur="2.6s" repeatCount="indefinite" path={CURSOR} keyPoints="0;1;1" keyTimes="0;0.6;1" calcMode="linear" />
      </path>

      {/* auth */}
      <Block x={390} y={52} w={190} h={96} color={C.lilac} title="AUTH" sub="LOGIN / REGISTER">
        <rect x="402" y="74" width="166" height="18" rx="4" fill="none" stroke={C.lilac} strokeOpacity="0.4" />
        <text x="410" y="86" fontSize="8" fill={DIM}>
          username
        </text>
        <rect x="402" y="98" width="166" height="18" rx="4" fill="none" stroke={C.lilac} strokeOpacity="0.4" />
        <text x="410" y="111" fontSize="9" letterSpacing="1" fill={TEXT}>
          ••••••••
        </text>
        <rect x="462" y="102" width="1.5" height="10" fill={TEXT} className="sch-pulse" />
        <rect x="402" y="124" width="60" height="16" rx="3" fill={C.lilac} fillOpacity="0.2" stroke={C.lilac} />
        <text x="432" y="135" textAnchor="middle" fontSize="7.5" letterSpacing="0.8" fill={TEXT}>
          LOG IN
        </text>
        <text x="568" y="135" textAnchor="end" fontSize="7.5" letterSpacing="0.8" fill={C.mint} className="sch-notify">
          SESSION OK
        </text>
      </Block>

      {/* password database: rows get scanned in turn */}
      <Block x={390} y={164} w={190} h={148} color={C.mint} title="users.db" sub="PASSWORD DB">
        <rect x="402" y="184" width="166" height="16" rx="3" fill={C.mint} fillOpacity="0.14" />
        {["ID", "USER", "HASH"].map((h, i) => (
          <text key={h} x={[410, 436, 498][i]} y="195" fontSize="7.5" letterSpacing="0.8" fill={C.mint}>
            {h}
          </text>
        ))}
        {[0, 1, 2, 3, 4].map((r) => {
          const y = 206 + r * 20;
          return (
            <g key={r}>
              <rect
                x="402"
                y={y}
                width="166"
                height="16"
                rx="3"
                fill={C.mint}
                fillOpacity="0.18"
                className="sch-seq"
                style={{ animationDuration: "5s", animationDelay: `${r}s` }}
              />
              <rect x="410" y={y + 6} width="12" height="4" rx="2" fill={DIM} fillOpacity="0.5" />
              <rect x="436" y={y + 6} width={36 + ((r * 7) % 16)} height="4" rx="2" fill={TEXT} fillOpacity="0.45" />
              <rect x="498" y={y + 6} width="62" height="4" rx="2" fill={DIM} fillOpacity="0.3" />
            </g>
          );
        })}
      </Block>

      <Pipeline
        y={334}
        items={["USER", "LOGIN", "PRODUCT", "CART", "CHECKOUT", "DATABASE"]}
        colors={[C.pink, C.lilac, C.sky, C.butter, C.peach, C.mint]}
      />
    </Frame>
  );
}
