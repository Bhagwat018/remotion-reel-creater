import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface CompoundingDivergenceSceneProps {
  durationInFrames: number;
}

export const CompoundingDivergenceScene: React.FC<CompoundingDivergenceSceneProps> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  const chartGrow = interpolate(frame, [10, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 48px",
        boxSizing: "border-box",
        fontFamily: "var(--font-heading, 'Inter', sans-serif)",
      }}
    >
      {/* Header */}
      <div
        style={{
          opacity: entrance,
          transform: `scale(${interpolate(entrance, [0, 1], [0.9, 1])})`,
          textAlign: "center",
          marginBottom: 28,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            backgroundColor: "rgba(239, 68, 68, 0.15)",
            border: "1px solid rgba(239, 68, 68, 0.4)",
            borderRadius: 999,
            padding: "8px 20px",
            color: "#f87171",
            fontSize: 16,
            fontWeight: 800,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: 10,
          }}
        >
          💸 25-YEAR COMPOUNDING BLEED
        </div>
        <h2
          style={{
            fontSize: 38,
            fontWeight: 900,
            color: "#ffffff",
            margin: 0,
          }}
        >
          DIRECT VS REGULAR FUND GAP
        </h2>
      </div>

      {/* Main Dual Bar Chart Comparison */}
      <div
        style={{
          width: "100%",
          maxWidth: 960,
          backgroundColor: "#18181b",
          border: "2px solid rgba(255, 255, 255, 0.12)",
          borderRadius: 24,
          padding: "28px 32px",
          boxShadow: "0 16px 40px rgba(0,0,0,0.5)",
          boxSizing: "border-box",
        }}
      >
        <div style={{ fontSize: 16, color: "#a1a1aa", marginBottom: 20 }}>
          Assumed: <strong>₹10,000 Monthly SIP</strong> for 25 Years @ 12% Return
        </div>

        {/* Bar 1: Direct Plan */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 18, fontWeight: 800 }}>
            <span style={{ color: "#34d399" }}>🟢 DIRECT PLAN (0.8% Expense)</span>
            <span style={{ color: "#ffffff", fontSize: 22 }}>₹58.2 LAKH</span>
          </div>
          <div style={{ width: "100%", height: 32, backgroundColor: "#27272a", borderRadius: 8, overflow: "hidden" }}>
            <div style={{ width: `${chartGrow * 100}%`, height: "100%", background: "linear-gradient(90deg, #059669, #34d399)", borderRadius: 8 }} />
          </div>
        </div>

        {/* Bar 2: Regular Plan */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 18, fontWeight: 800 }}>
            <span style={{ color: "#f87171" }}>🔴 REGULAR PLAN (1.8% Expense)</span>
            <span style={{ color: "#a1a1aa", fontSize: 22 }}>₹33.5 LAKH</span>
          </div>
          <div style={{ width: "100%", height: 32, backgroundColor: "#27272a", borderRadius: 8, overflow: "hidden" }}>
            <div style={{ width: `${chartGrow * 57}%`, height: "100%", background: "linear-gradient(90deg, #dc2626, #f87171)", borderRadius: 8 }} />
          </div>
        </div>

        {/* Red Shock Callout */}
        <div
          style={{
            backgroundColor: "rgba(239, 68, 68, 0.12)",
            border: "1px solid rgba(239, 68, 68, 0.4)",
            borderRadius: 16,
            padding: "16px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 28 }}>🚨</span>
            <div style={{ color: "#fca5a5", fontSize: 16, fontWeight: 700 }}>
              Agent Commission Drain:
            </div>
          </div>
          <div style={{ color: "#ef4444", fontSize: 26, fontWeight: 900 }}>
            -₹24.7 LAKHS LOST
          </div>
        </div>
      </div>
    </div>
  );
};
