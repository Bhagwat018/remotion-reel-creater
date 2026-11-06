import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface PreOpenOrderBookSceneProps {
  durationInFrames: number;
}

export const PreOpenOrderBookScene: React.FC<PreOpenOrderBookSceneProps> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  const bidsProgress = interpolate(frame, [10, 40], [0, 1], {
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
      {/* Top Header Badge */}
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
            backgroundColor: "rgba(245, 158, 11, 0.15)",
            border: "1px solid rgba(245, 158, 11, 0.4)",
            borderRadius: 999,
            padding: "8px 20px",
            color: "#fbbf24",
            fontSize: 16,
            fontWeight: 800,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: 10,
          }}
        >
          ⏱️ 09:45 AM – 10:00 AM PRE-OPEN
        </div>
        <h2
          style={{
            fontSize: 38,
            fontWeight: 900,
            color: "#ffffff",
            margin: 0,
          }}
        >
          AUCTION ORDER BOOK DEPTH
        </h2>
      </div>

      {/* Main Order Book Window */}
      <div
        style={{
          width: "100%",
          maxWidth: 960,
          backgroundColor: "#18181b",
          border: "2px solid rgba(255, 255, 255, 0.12)",
          borderRadius: 24,
          padding: "24px 28px",
          boxShadow: "0 16px 40px rgba(0,0,0,0.5)",
          boxSizing: "border-box",
        }}
      >
        {/* Header split */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingBottom: 16,
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            fontSize: 16,
            fontWeight: 800,
          }}
        >
          <span style={{ color: "#4ade80" }}>🟢 BUYERS (BIDS): 1,280,000</span>
          <span style={{ color: "#f87171" }}>🔴 SELLERS (ASKS): 240,000</span>
        </div>

        {/* Visual Depth Bars */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 18 }}>
          {/* Row 1 */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ width: 80, fontSize: 15, fontWeight: 700, color: "#a1a1aa" }}>₹165.00</span>
            <div style={{ flex: 1, height: 24, backgroundColor: "#27272a", borderRadius: 6, overflow: "hidden" }}>
              <div style={{ width: `${bidsProgress * 88}%`, height: "100%", backgroundColor: "rgba(34, 197, 94, 0.7)" }} />
            </div>
          </div>

          {/* Row 2 (Equilibrium Discovery Price) */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              backgroundColor: "rgba(245, 158, 11, 0.12)",
              padding: "6px 10px",
              borderRadius: 8,
              border: "1px solid rgba(245, 158, 11, 0.4)",
            }}
          >
            <span style={{ width: 80, fontSize: 16, fontWeight: 900, color: "#fbbf24" }}>₹162.50</span>
            <div style={{ flex: 1, height: 26, backgroundColor: "#27272a", borderRadius: 6, overflow: "hidden" }}>
              <div style={{ width: `${bidsProgress * 95}%`, height: "100%", backgroundColor: "#f59e0b" }} />
            </div>
            <span style={{ fontSize: 13, fontWeight: 800, color: "#fbbf24" }}>DISCOVERY PRICE 🎯</span>
          </div>

          {/* Row 3 */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ width: 80, fontSize: 15, fontWeight: 700, color: "#a1a1aa" }}>₹158.00</span>
            <div style={{ flex: 1, height: 24, backgroundColor: "#27272a", borderRadius: 6, overflow: "hidden" }}>
              <div style={{ width: `${bidsProgress * 65}%`, height: "100%", backgroundColor: "rgba(34, 197, 94, 0.5)" }} />
            </div>
          </div>
        </div>

        {/* Footer takeaway */}
        <div
          style={{
            marginTop: 20,
            paddingTop: 14,
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 15,
            color: "#d4d4d8",
          }}
        >
          <span>Demand Overhang: <strong>5.3X More Buyers</strong></span>
          <span style={{ color: "#4ade80", fontWeight: 800 }}>GAP-UP OPENING EXPECTED 🚀</span>
        </div>
      </div>
    </div>
  );
};
