import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface BombayCtaSceneProps {
  durationInFrames: number;
}

export const BombayCtaScene: React.FC<BombayCtaSceneProps> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerSpring = spring({
    frame: frame - 1,
    fps,
    config: { damping: 12, stiffness: 140 },
  });

  const matrixSpring = spring({
    frame: frame - 5,
    fps,
    config: { damping: 12, stiffness: 130 },
  });

  const buttonSpring = spring({
    frame: frame - 12,
    fps,
    config: { damping: 10, stiffness: 160 },
  });

  const disclaimerSpring = spring({
    frame: frame - 18,
    fps,
    config: { damping: 12, stiffness: 140 },
  });

  const pulse = Math.sin(frame / 4) * 0.04 + 1;

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
          backgroundColor: "#f3e8ff",
          color: "#7e22ce",
          border: "3.5px solid #000000",
          borderRadius: 999,
          padding: "10px 28px",
          boxShadow: "5px 5px 0px #000000",
        }}
      >
        <span style={{ fontSize: 22 }}>🎯</span>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 20,
            fontWeight: 900,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          FINAL SUMMARY VERDICT
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
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 56,
            fontWeight: 900,
            lineHeight: 1.15,
            color: "#0f172a",
          }}
        >
          <span>APPLY YA</span>
          <span
            style={{
              backgroundColor: "#fee2e2",
              color: "#dc2626",
              padding: "4px 18px",
              borderRadius: 12,
              border: "3.5px solid #000000",
              boxShadow: "4px 4px 0px #000000",
            }}
          >
            AVOID?
          </span>
        </div>
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 22,
            color: "#475569",
            fontWeight: 700,
          }}
        >
          Comment Me Apna Decision Batao 👇
        </div>
      </div>

      {/* 3. SCORECARD MATRIX */}
      <div
        style={{
          transform: `scale(${matrixSpring})`,
          opacity: matrixSpring,
          width: "100%",
          backgroundColor: "#ffffff",
          border: "3.5px solid #000000",
          borderRadius: 24,
          padding: "20px 24px",
          boxShadow: "6px 6px 0px #000000",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {[
          {
            label: "Allotment Probability",
            val: "HIGH (~33% CHANCE) 🟢",
            color: "#059669",
            bg: "#f0fdf4",
          },
          {
            label: "Listing Gain Potential",
            val: "MODEST (~10-12% GMP) 🟡",
            color: "#b45309",
            bg: "#fffbeb",
          },
          {
            label: "Business Concentration",
            val: "RISKY (Single Supplier) 🔴",
            color: "#dc2626",
            bg: "#fef2f2",
          },
        ].map((row, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: row.bg,
              padding: "14px 18px",
              borderRadius: 14,
              border: "2px solid #000000",
            }}
          >
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 18,
                color: "#0f172a",
                fontWeight: 800,
              }}
            >
              {row.label}
            </span>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 17,
                fontWeight: 900,
                color: row.color,
              }}
            >
              {row.val}
            </span>
          </div>
        ))}
      </div>

      {/* 4. GRAND FOLLOW CTA BUTTON */}
      <div
        style={{
          transform: `scale(${buttonSpring * pulse})`,
          opacity: buttonSpring,
          width: "100%",
          backgroundColor: "#7c3aed",
          border: "4px solid #000000",
          borderRadius: 22,
          padding: "18px 24px",
          boxShadow: "6px 6px 0px #000000",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
          cursor: "pointer",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 28 }}>🔥</span>
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 34,
              fontWeight: 900,
              color: "#ffffff",
              letterSpacing: 1,
            }}
          >
            FOLLOW @techwith.GenZ
          </span>
        </div>
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 17,
            fontWeight: 700,
            color: "#e9d5ff",
          }}
        >
          Daily Honest Stock &amp; Tech Updates!
        </span>
      </div>

      {/* 5. DISCLAIMER */}
      <div
        style={{
          transform: `scale(${disclaimerSpring})`,
          opacity: disclaimerSpring,
          backgroundColor: "#f8fafc",
          border: "2px solid #cbd5e1",
          borderRadius: 12,
          padding: "10px 18px",
          textAlign: "center",
        }}
      >
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 14,
            color: "#64748b",
            fontWeight: 700,
          }}
        >
          ⚠️ Educational information only. Not SEBI registered investment advice.
        </span>
      </div>
    </div>
  );
};
