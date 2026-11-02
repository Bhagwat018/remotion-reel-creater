import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface SmeVsMainboardSceneProps {
  durationInFrames: number;
}

export const SmeVsMainboardScene: React.FC<SmeVsMainboardSceneProps> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const tagEntrance = spring({
    frame: frame - 1,
    fps,
    config: { damping: 13, stiffness: 140 },
  });

  const headlineEntrance = spring({
    frame: frame - 4,
    fps,
    config: { damping: 12, stiffness: 150 },
  });

  const cardsEntrance = spring({
    frame: frame - 8,
    fps,
    config: { damping: 12, stiffness: 140 },
  });

  const warningEntrance = spring({
    frame: frame - 16,
    fps,
    config: { damping: 12, stiffness: 150 },
  });

  const pulse = Math.sin(frame / 6) * 0.03 + 1;

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: 1080,
        height: 1920,
        paddingTop: 190,
        paddingBottom: 380,
        paddingLeft: 60,
        paddingRight: 60,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 18,
        zIndex: 10,
      }}
    >
      {/* 1. SCENE HEADER */}
      <div
        style={{
          transform: `scale(${tagEntrance})`,
          opacity: tagEntrance,
          display: "flex",
          alignItems: "center",
          gap: 10,
          backgroundColor: "#f3e8ff",
          border: "2.5px solid #9333ea",
          borderRadius: 999,
          padding: "8px 24px",
          boxShadow: "3px 3px 0px #9333ea",
        }}
      >
        <span style={{ fontSize: 18 }}>⚠️</span>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 16,
            fontWeight: 900,
            color: "#6b21a8",
            letterSpacing: "0.06em",
          }}
        >
          QUESTION #4 // RISK & CAPITAL DISPARITY
        </span>
      </div>

      {/* 2. DYNAMIC HEADLINE */}
      <div
        style={{
          transform: `scale(${headlineEntrance})`,
          opacity: headlineEntrance,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: 6,
        }}
      >
        <div
          style={{
            fontFamily: "'Anton', sans-serif",
            fontSize: 62,
            fontWeight: 900,
            color: "#0f172a",
            letterSpacing: "0.02em",
            textTransform: "uppercase",
            lineHeight: 1,
          }}
        >
          SME YA MAINBOARD?
        </div>
        <div
          style={{
            backgroundColor: "#9333ea",
            color: "#ffffff",
            padding: "2px 18px",
            borderRadius: 10,
            border: "3px solid #000000",
            boxShadow: "4px 4px 0px #000000",
            fontFamily: "'Anton', sans-serif",
            fontSize: 50,
            letterSpacing: "0.03em",
            textTransform: "uppercase",
            display: "inline-block",
          }}
        >
          13x CAPITAL GAP!
        </div>
      </div>

      {/* 3. SIDE-BY-SIDE CAPITAL COMPARISON */}
      <div
        style={{
          width: "100%",
          maxWidth: 920,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
          transform: `scale(${cardsEntrance})`,
          opacity: cardsEntrance,
        }}
      >
        {/* MAINBOARD CARD */}
        <div
          style={{
            backgroundColor: "#f0fdf4",
            border: "3.5px solid #16a34a",
            borderRadius: 22,
            padding: "22px 18px",
            boxShadow: "6px 6px 0px #16a34a",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
            textAlign: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "#16a34a",
              color: "#ffffff",
              borderRadius: 8,
              padding: "4px 10px",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 13,
              fontWeight: 900,
            }}
          >
            MAINBOARD IPO ✅
          </div>

          <div
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: 52,
              color: "#15803d",
              lineHeight: 1,
              letterSpacing: "0.02em",
            }}
          >
            ~₹15,000
          </div>

          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              fontWeight: 700,
              color: "#166534",
            }}
          >
            Minimum 1 Lot Retail Application
          </div>

          <div
            style={{
              marginTop: "auto",
              backgroundColor: "#dcfce7",
              border: "1.5px solid #16a34a",
              borderRadius: 8,
              padding: "6px 12px",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              fontWeight: 800,
              color: "#14532d",
            }}
          >
            HIGH LIQUIDITY • SAFE
          </div>
        </div>

        {/* SME CARD */}
        <div
          style={{
            backgroundColor: "#fef2f2",
            border: "3.5px solid #ef4444",
            borderRadius: 22,
            padding: "22px 18px",
            boxShadow: "6px 6px 0px #ef4444",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
            textAlign: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "#ef4444",
              color: "#ffffff",
              borderRadius: 8,
              padding: "4px 10px",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 13,
              fontWeight: 900,
            }}
          >
            SME IPO ⚠️
          </div>

          <div
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: 52,
              color: "#b91c1c",
              lineHeight: 1,
              letterSpacing: "0.02em",
            }}
          >
            ₹2L - ₹2.5L+
          </div>

          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              fontWeight: 700,
              color: "#991b1b",
            }}
          >
            Minimum 1 Lot (Huge Ticket Size!)
          </div>

          <div
            style={{
              marginTop: "auto",
              backgroundColor: "#fee2e2",
              border: "1.5px solid #ef4444",
              borderRadius: 8,
              padding: "6px 12px",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              fontWeight: 800,
              color: "#991b1b",
            }}
          >
            LOW LIQUIDITY • HIGH RISK
          </div>
        </div>
      </div>

      {/* 4. HIGH RISK WARNING BANNER */}
      <div
        style={{
          width: "100%",
          maxWidth: 920,
          backgroundColor: "#ffedd5",
          border: "3.5px solid #ea580c",
          borderRadius: 18,
          padding: "16px 22px",
          boxShadow: "5px 5px 0px #ea580c",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transform: `scale(${warningEntrance * pulse})`,
          opacity: warningEntrance,
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 24 }}>🛑</span>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 18,
              fontWeight: 900,
              color: "#9a3412",
            }}
          >
            BEGINNERS: SME IPO se dur raho jab tak deep market research na ho!
          </span>
        </div>
        <div
          style={{
            backgroundColor: "#ea580c",
            color: "#ffffff",
            borderRadius: 6,
            padding: "4px 10px",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            fontWeight: 900,
          }}
        >
          CAUTION
        </div>
      </div>
    </div>
  );
};

