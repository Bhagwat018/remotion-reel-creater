import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface ProfitVsLossSceneProps {
  durationInFrames: number;
}

export const ProfitVsLossScene: React.FC<ProfitVsLossSceneProps> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const badgeSpring = spring({
    frame: frame - 1,
    fps,
    config: { damping: 12, stiffness: 150 },
  });

  const headerSpring = spring({
    frame: frame - 3,
    fps,
    config: { damping: 11, stiffness: 140 },
  });

  const cardsSpring = spring({
    frame: frame - 6,
    fps,
    config: { damping: 12, stiffness: 130 },
  });

  const driversSpring = spring({
    frame: frame - 11,
    fps,
    config: { damping: 12, stiffness: 130 },
  });

  const verdictSpring = spring({
    frame: frame - 16,
    fps,
    config: { damping: 12, stiffness: 130 },
  });

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: 1080,
        height: 1920,
        paddingTop: 130,
        paddingBottom: 400,
        paddingLeft: 56,
        paddingRight: 56,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "stretch",
        gap: 18,
        zIndex: 10,
      }}
    >
      {/* 1. TOP HEADER BLOCK (Height: 180px) */}
      <div
        style={{
          height: 180,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            transform: `scale(${badgeSpring})`,
            opacity: badgeSpring,
            display: "flex",
            alignItems: "center",
            gap: 10,
            backgroundColor: "#ffffff",
            color: "#0f172a",
            border: "3.5px solid #000000",
            borderRadius: 999,
            padding: "8px 24px",
            boxShadow: "4px 4px 0px #000000",
          }}
        >
          <span style={{ fontSize: 22 }}>💰</span>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 18,
              fontWeight: 900,
              letterSpacing: 1.5,
              textTransform: "uppercase",
            }}
          >
            QUARTERLY FINANCIAL REALITY (JUL-SEP 2026)
          </span>
        </div>

        <div
          style={{
            transform: `scale(${headerSpring})`,
            opacity: headerSpring,
            backgroundColor: "#ffffff",
            border: "4px solid #000000",
            borderRadius: 22,
            padding: "10px 20px",
            textAlign: "center",
            boxShadow: "6px 6px 0px #000000",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 44,
              color: "#0f172a",
              letterSpacing: 1.5,
              lineHeight: 1.1,
            }}
          >
            PAR TWIST: LOSS VS PROFIT!
          </div>
          <div
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 16,
              fontWeight: 800,
              color: "#dc2626",
              marginTop: 4,
            }}
          >
            Instamart: -₹895 Cr Loss | Blinkit: +₹184 Cr Profit
          </div>
        </div>
      </div>

      {/* 2. HERO: DUAL BALANCE SHEET CARDS (Height: 520px) */}
      <div
        style={{
          height: 520,
          transform: `scale(${cardsSpring})`,
          opacity: cardsSpring,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
          boxSizing: "border-box",
        }}
      >
        {/* Instamart Loss Card */}
        <div
          style={{
            backgroundColor: "#fff1f2",
            border: "4px solid #dc2626",
            borderRadius: 22,
            padding: "18px 16px",
            boxShadow: "6px 6px 0px #000000",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 26 }}>🟠</span>
              <span style={{ backgroundColor: "#dc2626", color: "#ffffff", fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 900, padding: "2px 7px", borderRadius: 5 }}>
                HEAVY LOSS
              </span>
            </div>
            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 22, fontWeight: 900, color: "#991b1b", marginTop: 8 }}>
              INSTAMART
            </div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 700, color: "#b91c1c" }}>
              (Swiggy Q2 FY27)
            </div>
          </div>

          <div style={{ textAlign: "center", margin: "10px 0" }}>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 50, color: "#dc2626", lineHeight: 0.95 }}>
              -₹895 CR
            </div>
            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, fontWeight: 800, color: "#991b1b", textTransform: "uppercase" }}>
              Adjusted EBITDA Loss
            </div>
          </div>

          <div style={{ backgroundColor: "#ffffff", border: "1.5px solid #ef4444", borderRadius: 10, padding: "8px 10px", fontSize: 12, fontWeight: 700, color: "#7f1d1d", lineHeight: 1.35 }}>
            📉 <strong>Cash Burn:</strong> Aggressive store rollouts, discounts, and dark store rent burning capital.
          </div>
        </div>

        {/* Blinkit Profit Card */}
        <div
          style={{
            backgroundColor: "#f0fdf4",
            border: "4px solid #16a34a",
            borderRadius: 22,
            padding: "18px 16px",
            boxShadow: "6px 6px 0px #000000",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 26 }}>🟡</span>
              <span style={{ backgroundColor: "#16a34a", color: "#ffffff", fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 900, padding: "2px 7px", borderRadius: 5 }}>
                PROFITABLE
              </span>
            </div>
            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 22, fontWeight: 900, color: "#166534", marginTop: 8 }}>
              BLINKIT
            </div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 700, color: "#15803d" }}>
              (Zomato Q2 FY27)
            </div>
          </div>

          <div style={{ textAlign: "center", margin: "10px 0" }}>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 50, color: "#16a34a", lineHeight: 0.95 }}>
              +₹184 CR
            </div>
            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, fontWeight: 800, color: "#166534", textTransform: "uppercase" }}>
              Adjusted EBITDA Profit
            </div>
          </div>

          <div style={{ backgroundColor: "#ffffff", border: "1.5px solid #22c55e", borderRadius: 10, padding: "8px 10px", fontSize: 12, fontWeight: 700, color: "#14532d", lineHeight: 1.35 }}>
            📈 <strong>EBITDA Green:</strong> Mature dark stores, higher basket size, and high-margin ad revenues.
          </div>
        </div>
      </div>

      {/* 3. WHY IS BLINKIT PROFITABLE? (Height: 380px) */}
      <div
        style={{
          height: 380,
          transform: `scale(${driversSpring})`,
          opacity: driversSpring,
          backgroundColor: "#ffffff",
          border: "4px solid #000000",
          borderRadius: 22,
          padding: "16px 20px",
          boxShadow: "6px 6px 0px #000000",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 18, fontWeight: 900, color: "#0f172a", display: "flex", alignItems: "center", gap: 8 }}>
            <span>🔍</span> THE ₹1,079 CR DIFFERENCE (WHY?):
          </div>
          <span style={{ backgroundColor: "#dbeafe", color: "#1e40af", fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 900, padding: "3px 8px", borderRadius: 6 }}>
            ECONOMICS
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ backgroundColor: "#f8fafc", border: "1.5px solid #cbd5e1", borderRadius: 12, padding: "8px 12px", display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 22 }}>🛍️</span>
            <div>
              <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, fontWeight: 900, color: "#0f172a" }}>
                Higher Basket Size (AOV ₹660+)
              </div>
              <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 12, color: "#475569", fontWeight: 600 }}>
                Sirf doodh nahi, electronics, cosmetics aur gifting items deliver karte hain.
              </div>
            </div>
          </div>

          <div style={{ backgroundColor: "#f8fafc", border: "1.5px solid #cbd5e1", borderRadius: 12, padding: "8px 12px", display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 22 }}>📢</span>
            <div>
              <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, fontWeight: 900, color: "#0f172a" }}>
                Advertising Monetization (Ad Revenues)
              </div>
              <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 12, color: "#475569", fontWeight: 600 }}>
                Top FMCG brands (Coke, Nestlé, Amul) top banner placements ke liye crore dete hain.
              </div>
            </div>
          </div>

          <div style={{ backgroundColor: "#f8fafc", border: "1.5px solid #cbd5e1", borderRadius: 12, padding: "8px 12px", display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 22 }}>🏬</span>
            <div>
              <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, fontWeight: 900, color: "#0f172a" }}>
                High Store Density & Throughput
              </div>
              <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 12, color: "#475569", fontWeight: 600 }}>
                Older stores break-even and generate continuous positive cash flow.
              </div>
            </div>
          </div>
        </div>

        <div style={{ backgroundColor: "#f8fafc", border: "1px dashed #94a3b8", borderRadius: 8, padding: "5px 10px", textAlign: "center", fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 800, color: "#334155" }}>
          Single Quarter Swing: ₹895 Cr Loss vs ₹184 Cr Profit = ₹1,079 Crore Gap!
        </div>
      </div>

      {/* 4. THE BUSINESS VERDICT (Height: 240px) */}
      <div
        style={{
          height: 240,
          transform: `scale(${verdictSpring})`,
          opacity: verdictSpring,
          backgroundColor: "#fef9c3",
          border: "4px solid #ca8a04",
          borderRadius: 22,
          padding: "16px 20px",
          boxShadow: "6px 6px 0px #000000",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 24 }}>💡</span>
            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 17, fontWeight: 900, color: "#854d0e" }}>
              UNIT ECONOMICS REALITY:
            </div>
          </div>
          <span style={{ backgroundColor: "#ca8a04", color: "#ffffff", fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 900, padding: "3px 8px", borderRadius: 6 }}>
            BOTTOM LINE
          </span>
        </div>

        <div style={{ backgroundColor: "#ffffff", border: "1.5px solid #ca8a04", borderRadius: 10, padding: "8px 12px", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, fontWeight: 800, color: "#713f12", lineHeight: 1.35 }}>
          Quick commerce me delivery speed sabko pasand hai, par profit banane ke liye har dark store me roz hazaron orders aur higher cart value zaroori hai!
        </div>

        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 800, color: "#854d0e", textAlign: "center" }}>
          ⚠️ Consumers ke liye pro tip: Dekho cart me hidden fees kaise lagti hain!
        </div>
      </div>
    </div>
  );
};

