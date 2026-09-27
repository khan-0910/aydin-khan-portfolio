import { ImageResponse } from "next/og";

// required for `output: export` (GitHub Pages static hosting)
export const dynamic = "force-static";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Aydin Khan - Mechatronics & Automation";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#1c2b23",
          padding: 64,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            backgroundImage:
              "linear-gradient(to right, rgba(228,230,216,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(228,230,216,0.05) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              color: "#79857a",
              fontSize: 22,
              letterSpacing: 4,
              fontFamily: "monospace",
            }}
          >
            DIGITAL ENGINEERING WORKSHOP
          </div>
          <div style={{ display: "flex", width: 48, height: 48, background: "#ff5a1f" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              color: "#e4e6d8",
              fontSize: 132,
              fontWeight: 700,
              letterSpacing: -2,
              lineHeight: 1,
            }}
          >
            AYDIN KHAN
          </div>
          <div
            style={{
              display: "flex",
              color: "#ff5a1f",
              fontSize: 34,
              letterSpacing: 8,
              marginTop: 24,
              fontFamily: "monospace",
            }}
          >
            MECHATRONICS &amp; AUTOMATION
          </div>
          <div
            style={{
              display: "flex",
              color: "#79857a",
              fontSize: 26,
              marginTop: 18,
              fontFamily: "monospace",
            }}
          >
            VIT CHENNAI - BUILD / TEST / ITERATE
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", color: "#6f6d63", fontSize: 20, fontFamily: "monospace" }}>
          <div style={{ display: "flex" }}>13.0827° N / 80.2707° E - CHENNAI, TN</div>
          <div style={{ display: "flex" }}>REV 2026.A</div>
        </div>
      </div>
    ),
    size
  );
}
