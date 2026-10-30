import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface ValuationGapCardProps {
  delayFrames?: number;
}

export const ValuationGapCard: React.FC<ValuationGapCardProps> = ({ delayFrames = 2 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - delayFrames,
    fps,
    config: { damping: 13, stiffness: 140 },
  });

  const cardsEntrance = spring({
    frame: frame - (delayFrames + 6),
    fps,
    config: { damping: 12, stiffness: 150 },
  });

  const freezeEntrance = spring({
    frame: frame - (delayFrames + 14),
    fps,
    config: { damping: 13, stiffness: 140 },
  });

  // Pulse animation for the valuation gap
  const pulse = Math.sin(frame / 6) * 0.03 + 1;

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 880,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 18,
        transform: `scale(${entrance})`,
        opacity: entrance,
      }}
    >
      {/* 1. BRAND HERO HEADER */}
      <div
        style={{
          width: "100%",
          backgroundColor: "#ffffff",
          border: "3.5px solid #000000",
          borderRadius: 22,
          padding: "16px 24px",
          boxShadow: "6px 6px 0px #000000",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 14,
              backgroundColor: "#ff3269",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 26,
              fontWeight: 900,
              border: "2px solid #000000",
              boxShadow: "2px 2px 0px #000000",
            }}
          >
            Z
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 26, fontWeight: 900, color: "#000000" }}>
              ZEPTO VALUATION DISPUTE
            </span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 15, color: "#64748b", fontWeight: 700 }}>
              Quick Commerce // Pre-IPO Talks
            </span>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#fb923c",
            color: "#000000",
            border: "2px solid #000000",
            borderRadius: 999,
            padding: "6px 14px",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 15,
            fontWeight: 900,
            boxShadow: "2px 2px 0px #000000",
          }}
        >
          10-MIN GROCERY
        </div>
      </div>

      {/* 2. VALUATION SPLIT METER */}
      <div
        style={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
          transform: `scale(${cardsEntrance})`,
          opacity: cardsEntrance,
        }}
      >
        {/* ASK */}
        <div
          style={{
            backgroundColor: "#f0fdf4",
            border: "3.5px solid #000000",
            borderRadius: 20,
            padding: "20px 18px",
            boxShadow: "5px 5px 0px #000000",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: 8,
          }}
        >
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 16, fontWeight: 800, color: "#16a34a" }}>
            FOUNDERS ASK
          </span>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 48,
              fontWeight: 900,
              color: "#15803d",
              letterSpacing: "-0.03em",
              lineHeight: 1,
            }}
          >
            $5.0B
          </span>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 700, color: "#475569" }}>
            Target IPO Value 🚀
          </span>
        </div>

        {/* BIDS */}
        <div
          style={{
            backgroundColor: "#fff1f2",
            border: "3.5px solid #000000",
            borderRadius: 20,
            padding: "20px 18px",
            boxShadow: "5px 5px 0px #000000",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: 8,
          }}
        >
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 16, fontWeight: 800, color: "#e11d48" }}>
            INVESTOR BIDS
          </span>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 48,
              fontWeight: 900,
              color: "#be123c",
              letterSpacing: "-0.03em",
              lineHeight: 1,
            }}
          >
            ~$3.5B
          </span>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 700, color: "#475569" }}>
            Discounted Offer 📉
          </span>
        </div>
      </div>

      {/* 3. CENTER GAP DISPUTE PILL */}
      <div
        style={{
          backgroundColor: "#fef08a",
          border: "3px solid #000000",
          borderRadius: 16,
          padding: "10px 24px",
          boxShadow: "4px 4px 0px #000000",
          display: "flex",
          alignItems: "center",
          gap: 10,
          transform: `scale(${pulse})`,
        }}
      >
        <span style={{ fontSize: 22 }}>⚠️</span>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 20,
            fontWeight: 900,
            color: "#000000",
          }}
        >
          -$1.5 BILLION VALUATION GAP!
        </span>
      </div>

      {/* 4. FROZEN DECISION CARD (2027 SHIFT) */}
      <div
        style={{
          width: "100%",
          backgroundColor: "#0f172a",
          color: "#ffffff",
          border: "3.5px solid #000000",
          borderRadius: 22,
          padding: "22px 28px",
          boxShadow: "7px 7px 0px #000000",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transform: `scale(${freezeEntrance}) rotate(-0.5deg)`,
          opacity: freezeEntrance,
          boxSizing: "border-box",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 6, zIndex: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 26 }}>❄️</span>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 18,
                fontWeight: 800,
                color: "#38bdf8",
                letterSpacing: "0.04em",
              }}
            >
              BOARD DECISION // STATUS
            </span>
          </div>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 30,
              fontWeight: 900,
              color: "#ffffff",
              letterSpacing: "-0.01em",
            }}
          >
            IPO FROZEN UNTIL 2027
          </span>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 17, color: "#94a3b8", fontWeight: 600 }}>
            Founders refuse to sell at steep public market discounts!
          </span>
        </div>

        <div
          style={{
            backgroundColor: "#ef4444",
            color: "#ffffff",
            border: "3px solid #000000",
            borderRadius: 14,
            padding: "10px 18px",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 20,
            fontWeight: 900,
            boxShadow: "4px 4px 0px #000000",
            transform: "rotate(3deg)",
            textAlign: "center",
            minWidth: 120,
          }}
        >
          PAUSED ⏸️
        </div>
      </div>
    </div>
  );
};
