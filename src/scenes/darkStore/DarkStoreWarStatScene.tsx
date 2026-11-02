import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface DarkStoreWarStatSceneProps {
  durationInFrames: number;
}

export const DarkStoreWarStatScene: React.FC<DarkStoreWarStatSceneProps> = () => {
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

  const marketSpring = spring({
    frame: frame - 11,
    fps,
    config: { damping: 12, stiffness: 130 },
  });

  const ruleSpring = spring({
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
          <span style={{ fontSize: 22 }}>📍</span>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 18,
              fontWeight: 900,
              letterSpacing: 1.5,
              textTransform: "uppercase",
            }}
          >
            QUICK COMMERCE STORE COUNT WAR
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
            BLINKIT: 2X DARK STORES!
          </div>
          <div
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 16,
              fontWeight: 800,
              color: "#d97706",
              marginTop: 4,
            }}
          >
            Blinkit: 2,751 vs Instamart: 1,240 (Jul-Sep 2026)
          </div>
        </div>
      </div>

      {/* 2. HERO: DUAL STORE NETWORK COMPARISON CARDS (Height: 520px) */}
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
        {/* Blinkit Card */}
        <div
          style={{
            backgroundColor: "#fefce8",
            border: "4px solid #ca8a04",
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
              <span style={{ backgroundColor: "#eab308", color: "#000000", fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 900, padding: "2px 7px", borderRadius: 5 }}>
                LEADER
              </span>
            </div>
            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 22, fontWeight: 900, color: "#854d0e", marginTop: 8 }}>
              BLINKIT
            </div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 700, color: "#a16207" }}>
              (Zomato Owned)
            </div>
          </div>

          <div style={{ textAlign: "center", margin: "10px 0" }}>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 58, color: "#854d0e", lineHeight: 0.95 }}>
              2,751
            </div>
            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, fontWeight: 800, color: "#a16207", textTransform: "uppercase" }}>
              Active Dark Stores
            </div>
          </div>

          <div style={{ backgroundColor: "#ffffff", border: "1.5px solid #eab308", borderRadius: 10, padding: "8px 10px", fontSize: 12, fontWeight: 700, color: "#713f12", lineHeight: 1.35 }}>
            ⚡ <strong>2.2x Scale Lead:</strong> Har 1.2 KM me ek store, Tier 1 aur metro cities me total dominance!
          </div>
        </div>

        {/* Instamart Card */}
        <div
          style={{
            backgroundColor: "#fff7ed",
            border: "4px solid #ea580c",
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
              <span style={{ backgroundColor: "#f97316", color: "#ffffff", fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 900, padding: "2px 7px", borderRadius: 5 }}>
                CHALLENGER
              </span>
            </div>
            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 22, fontWeight: 900, color: "#9a3412", marginTop: 8 }}>
              INSTAMART
            </div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 700, color: "#c2410c" }}>
              (Swiggy Owned)
            </div>
          </div>

          <div style={{ textAlign: "center", margin: "10px 0" }}>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 58, color: "#ea580c", lineHeight: 0.95 }}>
              1,240
            </div>
            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, fontWeight: 800, color: "#c2410c", textTransform: "uppercase" }}>
              Active Dark Stores
            </div>
          </div>

          <div style={{ backgroundColor: "#ffffff", border: "1.5px solid #f97316", borderRadius: 10, padding: "8px 10px", fontSize: 12, fontWeight: 700, color: "#7c2d12", lineHeight: 1.35 }}>
            🚀 <strong>Hyper Expansion:</strong> Swiggy IPO ke baad 100+ naye stores har mahine kholne ka target!
          </div>
        </div>
      </div>

      {/* 3. MARKET SHARE PROGRESS BARS (Height: 380px) */}
      <div
        style={{
          height: 380,
          transform: `scale(${marketSpring})`,
          opacity: marketSpring,
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
            <span>📊</span> QUICK COMMERCE MARKET SHARE:
          </div>
          <span style={{ backgroundColor: "#f1f5f9", color: "#334155", fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 900, padding: "3px 8px", borderRadius: 6 }}>
            GOV & BROKERAGE DATA
          </span>
        </div>

        {/* 3 Progress Bars */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, fontWeight: 800, marginBottom: 4 }}>
              <span style={{ color: "#854d0e" }}>🟡 Blinkit (Zomato)</span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", color: "#854d0e" }}>46% (Market Leader)</span>
            </div>
            <div style={{ width: "100%", height: 12, backgroundColor: "#fef3c7", borderRadius: 999, overflow: "hidden" }}>
              <div style={{ width: "46%", height: "100%", backgroundColor: "#eab308", borderRadius: 999 }} />
            </div>
          </div>

          <div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, fontWeight: 800, marginBottom: 4 }}>
              <span style={{ color: "#ea580c" }}>🟠 Swiggy Instamart</span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", color: "#ea580c" }}>27% Share</span>
            </div>
            <div style={{ width: "100%", height: 12, backgroundColor: "#ffedd5", borderRadius: 999, overflow: "hidden" }}>
              <div style={{ width: "27%", height: "100%", backgroundColor: "#ea580c", borderRadius: 999 }} />
            </div>
          </div>

          <div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, fontWeight: 800, marginBottom: 4 }}>
              <span style={{ color: "#7c3aed" }}>🟣 Zepto</span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", color: "#7c3aed" }}>21% Share</span>
            </div>
            <div style={{ width: "100%", height: 12, backgroundColor: "#ede9fe", borderRadius: 999, overflow: "hidden" }}>
              <div style={{ width: "21%", height: "100%", backgroundColor: "#8b5cf6", borderRadius: 999 }} />
            </div>
          </div>
        </div>

        <div style={{ backgroundColor: "#f8fafc", border: "1px dashed #94a3b8", borderRadius: 8, padding: "6px 10px", textAlign: "center", fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 800, color: "#475569" }}>
          Remaining 6%: BB Now (Tata) & Flipkart Minutes
        </div>
      </div>

      {/* 4. THE PROXIMITY ADVANTAGE (Height: 240px) */}
      <div
        style={{
          height: 240,
          transform: `scale(${ruleSpring})`,
          opacity: ruleSpring,
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
              WHY STORE COUNT IS EVERYTHING:
            </div>
          </div>
          <span style={{ backgroundColor: "#ca8a04", color: "#ffffff", fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 900, padding: "3px 8px", borderRadius: 6 }}>
            DENSITY RULE
          </span>
        </div>

        <div style={{ backgroundColor: "#ffffff", border: "1.5px solid #ca8a04", borderRadius: 10, padding: "8px 12px", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, fontWeight: 800, color: "#713f12", lineHeight: 1.35 }}>
          Jitne zyada dark stores honge, har store ka radius utna hi chhota (1.2 km) hoga. Delivery fast hogi, aur rider ka fuel cost sabse kam!
        </div>

        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 800, color: "#854d0e", textAlign: "center" }}>
          💰 Par twist: Dekho ek company profit me hai aur doosri 895 Cr loss me!
        </div>
      </div>
    </div>
  );
};

