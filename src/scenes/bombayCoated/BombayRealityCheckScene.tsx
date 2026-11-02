import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface BombayRealityCheckSceneProps {
  durationInFrames: number;
}

export const BombayRealityCheckScene: React.FC<BombayRealityCheckSceneProps> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerSpring = spring({
    frame: frame - 1,
    fps,
    config: { damping: 12, stiffness: 140 },
  });

  const card1Spring = spring({
    frame: frame - 5,
    fps,
    config: { damping: 12, stiffness: 130 },
  });

  const card2Spring = spring({
    frame: frame - 12,
    fps,
    config: { damping: 12, stiffness: 130 },
  });

  const warningSpring = spring({
    frame: frame - 18,
    fps,
    config: { damping: 10, stiffness: 150 },
  });

  const pulse = Math.sin(frame / 5) * 0.04 + 1;

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
          backgroundColor: "#fee2e2",
          color: "#dc2626",
          border: "3.5px solid #000000",
          borderRadius: 999,
          padding: "10px 28px",
          boxShadow: "5px 5px 0px #000000",
        }}
      >
        <span style={{ fontSize: 22 }}>🚨</span>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 20,
            fontWeight: 900,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          CRITICAL REALITY CHECK
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
            fontSize: 58,
            fontWeight: 900,
            lineHeight: 1.15,
            color: "#0f172a",
          }}
        >
          <span>2 BIG</span>
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
            RED FLAGS
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
          Financial Health &amp; Supplier Risk
        </div>
      </div>

      {/* 3. CARD 1: MARGIN COMPRESSION */}
      <div
        style={{
          transform: `scale(${card1Spring})`,
          opacity: card1Spring,
          width: "100%",
          backgroundColor: "#ffffff",
          border: "3.5px solid #000000",
          borderRadius: 22,
          padding: "20px 24px",
          boxShadow: "6px 6px 0px #000000",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 22 }}>📉</span>
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 22,
              fontWeight: 900,
              color: "#b45309",
            }}
          >
            FLAG 1: MARGIN SQUEEZE DIVERGENCE
          </span>
        </div>

        {/* 2 metrics side by side */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 12,
          }}
        >
          <div
            style={{
              backgroundColor: "#f0f9ff",
              border: "2px solid #0284c7",
              borderRadius: 14,
              padding: "12px 16px",
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            <span style={{ fontSize: 14, color: "#0369a1", fontWeight: 800 }}>
              REVENUE GROWTH
            </span>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 32,
                fontWeight: 900,
                color: "#0284c7",
              }}
            >
              +20% 📈
            </span>
            <span style={{ fontSize: 13, color: "#475569", fontWeight: 600 }}>Sales Badhi</span>
          </div>

          <div
            style={{
              backgroundColor: "#fff1f2",
              border: "2px solid #dc2626",
              borderRadius: 14,
              padding: "12px 16px",
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            <span style={{ fontSize: 14, color: "#991b1b", fontWeight: 800 }}>
              PROFIT GROWTH
            </span>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 32,
                fontWeight: 900,
                color: "#dc2626",
              }}
            >
              SIRF +7% ⚠️
            </span>
            <span style={{ fontSize: 13, color: "#991b1b", fontWeight: 600 }}>Profit Kam Hua</span>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#f8fafc",
            border: "1px solid #e2e8f0",
            padding: "8px 14px",
            borderRadius: 10,
            fontSize: 15,
            color: "#334155",
            fontFamily: "'Inter', sans-serif",
            fontWeight: 600,
          }}
        >
          💡 Sales 20% badhi, par profit sirf 7% badha kyu ki raw material costly tha.
        </div>
      </div>

      {/* 4. CARD 2: SUPPLIER CONCENTRATION RISK */}
      <div
        style={{
          transform: `scale(${card2Spring})`,
          opacity: card2Spring,
          width: "100%",
          backgroundColor: "#fff1f2",
          border: "3.5px solid #000000",
          borderRadius: 22,
          padding: "20px 24px",
          boxShadow: "6px 6px 0px #000000",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 22 }}>🏭</span>
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 22,
              fontWeight: 900,
              color: "#991b1b",
            }}
          >
            FLAG 2: SEVERE SUPPLIER DEPENDENCY
          </span>
        </div>

        <div
          style={{
            backgroundColor: "#fee2e2",
            border: "2px solid #dc2626",
            borderRadius: 14,
            padding: "14px 18px",
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <span style={{ fontSize: 36 }}>⚠️</span>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 26,
                fontWeight: 900,
                color: "#b91c1c",
              }}
            >
              RAW MATERIAL: EK HI SUPPLIER
            </span>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 16,
                color: "#475569",
                fontWeight: 600,
              }}
            >
              Single supplier dependency = Heavy operational supply risk!
            </span>
          </div>
        </div>
      </div>

      {/* 5. BOTTOM SUMMARY */}
      <div
        style={{
          transform: `scale(${warningSpring * pulse})`,
          opacity: warningSpring,
          backgroundColor: "#ffffff",
          border: "3px solid #000000",
          borderRadius: 14,
          padding: "10px 22px",
          display: "flex",
          alignItems: "center",
          gap: 10,
          boxShadow: "4px 4px 0px #000000",
        }}
      >
        <span style={{ fontSize: 20 }}>🧠</span>
        <span
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 17,
            fontWeight: 900,
            color: "#6b21a8",
          }}
        >
          LOW SUBSCRIPTION KA REASON YE DOWNSIDES HAIN!
        </span>
      </div>
    </div>
  );
};
