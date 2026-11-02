import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface BombayContrarianTipSceneProps {
  durationInFrames: number;
}

export const BombayContrarianTipScene: React.FC<BombayContrarianTipSceneProps> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerSpring = spring({
    frame: frame - 1,
    fps,
    config: { damping: 12, stiffness: 140 },
  });

  const cardSpring = spring({
    frame: frame - 4,
    fps,
    config: { damping: 12, stiffness: 130 },
  });

  const formulaSpring = spring({
    frame: frame - 8,
    fps,
    config: { damping: 10, stiffness: 150 },
  });

  const bulletsSpring = spring({
    frame: frame - 14,
    fps,
    config: { damping: 12, stiffness: 130 },
  });

  const pulse = Math.sin(frame / 5) * 0.03 + 1;

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
        gap: 20,
        zIndex: 10,
      }}
    >
      {/* 1. BADGE */}
      <div
        style={{
          transform: `scale(${headerSpring})`,
          opacity: headerSpring,
          display: "flex",
          alignItems: "center",
          gap: 12,
          backgroundColor: "#fef08a",
          color: "#000000",
          border: "3.5px solid #000000",
          borderRadius: 999,
          padding: "10px 28px",
          boxShadow: "5px 5px 0px #000000",
        }}
      >
        <span style={{ fontSize: 22 }}>💡</span>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 20,
            fontWeight: 900,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          PRO INVESTOR TIP
        </span>
      </div>

      {/* 2. HEADLINE */}
      <div
        style={{
          transform: `scale(${headerSpring})`,
          opacity: headerSpring,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
        }}
      >
        <div
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 54,
            fontWeight: 900,
            lineHeight: 1.15,
            color: "#0f172a",
          }}
        >
          ALLOTMENT AASAN HO...
        </div>
        <div
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 48,
            fontWeight: 900,
            color: "#b45309",
          }}
        >
          TOH IPO ACCHA HO YE ZAROORI NAHI!
        </div>
      </div>

      {/* 3. CARD CONTAINER */}
      <div
        style={{
          transform: `scale(${cardSpring})`,
          opacity: cardSpring,
          width: "100%",
          backgroundColor: "#ffffff",
          border: "3.5px solid #000000",
          borderRadius: 24,
          padding: "24px 26px",
          boxShadow: "6px 6px 0px #000000",
          display: "flex",
          flexDirection: "column",
          gap: 18,
        }}
      >
        {/* GOLDEN THEOREM BOX */}
        <div
          style={{
            transform: `scale(${formulaSpring * pulse})`,
            opacity: formulaSpring,
            backgroundColor: "#fef3c7",
            border: "3px solid #000000",
            borderRadius: 18,
            padding: "16px 20px",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
            boxShadow: "3px 3px 0px #000000",
          }}
        >
          <span style={{ fontSize: 13, color: "#92400e", fontWeight: 900 }}>
            THE CONTRARIAN LESSON
          </span>
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 32,
              fontWeight: 900,
              color: "#000000",
              letterSpacing: 1,
            }}
          >
            EASY ALLOTMENT ≠ PROFITABLE IPO
          </span>
        </div>

        {/* 3 REASONS */}
        <div
          style={{
            transform: `scale(${bulletsSpring})`,
            opacity: bulletsSpring,
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          {[
            {
              icon: "🧠",
              bold: "Smart Money Cautious:",
              text: "Subscription kam isliye hai kyunki institutional buyers ne aggressively bid nahi kiya.",
            },
            {
              icon: "⚠️",
              bold: "Don't Fall for Easy Shares:",
              text: "Sirf isliye mat apply karo ki shares aasani se mil jayenge. Business pehle dekho!",
            },
            {
              icon: "📈",
              bold: "Listing Day Demand:",
              text: "Agar issue time pe demand kam hai, toh listing day buyers kam ho sakte hain.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 12,
                backgroundColor: "#f8fafc",
                padding: "14px 18px",
                borderRadius: 14,
                border: "2px solid #e2e8f0",
              }}
            >
              <span style={{ fontSize: 22 }}>{item.icon}</span>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <span
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 18,
                    fontWeight: 900,
                    color: "#b45309",
                  }}
                >
                  {item.bold}
                </span>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 15,
                    color: "#334155",
                    lineHeight: 1.3,
                    fontWeight: 600,
                  }}
                >
                  {item.text}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
