import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface ListingSplitSceneProps {
  durationInFrames: number;
}

export const ListingSplitScene: React.FC<ListingSplitSceneProps> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  const card1Spring = spring({
    frame: frame - 6,
    fps,
    config: { damping: 13, stiffness: 110 },
  });

  const card2Spring = spring({
    frame: frame - 12,
    fps,
    config: { damping: 13, stiffness: 110 },
  });

  const sliderProgress = interpolate(frame, [15, 45], [0, 1], {
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
      {/* Top Header */}
      <div
        style={{
          opacity: titleSpring,
          transform: `scale(${interpolate(titleSpring, [0, 1], [0.9, 1])})`,
          textAlign: "center",
          marginBottom: 32,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            backgroundColor: "rgba(34, 197, 94, 0.15)",
            border: "1px solid rgba(34, 197, 94, 0.4)",
            borderRadius: 999,
            padding: "8px 20px",
            color: "#4ade80",
            fontSize: 16,
            fontWeight: 800,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          🛡️ THE 50-50 GOLDEN RULE
        </div>
        <h2
          style={{
            fontSize: 40,
            fontWeight: 900,
            color: "#ffffff",
            margin: 0,
            letterSpacing: "-0.02em",
          }}
        >
          LOCK CAPITAL, RIDE PROFIT
        </h2>
      </div>

      {/* Dual Cards Grid */}
      <div
        style={{
          display: "flex",
          gap: 20,
          width: "100%",
          maxWidth: 960,
          marginBottom: 32,
        }}
      >
        {/* Left Card: 50% Capital Safe */}
        <div
          style={{
            flex: 1,
            backgroundColor: "rgba(16, 185, 129, 0.08)",
            border: "2px solid rgba(16, 185, 129, 0.4)",
            borderRadius: 24,
            padding: "28px 24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            boxShadow: "0 12px 32px rgba(0,0,0,0.4)",
            opacity: card1Spring,
            transform: `translateY(${interpolate(card1Spring, [0, 1], [30, 0])}px)`,
          }}
        >
          <div style={{ fontSize: 44, marginBottom: 12 }}>🔒</div>
          <div
            style={{
              fontSize: 32,
              fontWeight: 900,
              color: "#34d399",
              marginBottom: 8,
            }}
          >
            SELL 50% LOT
          </div>
          <div
            style={{
              fontSize: 18,
              color: "#a7f3d0",
              fontWeight: 600,
              lineHeight: 1.4,
            }}
          >
            100% Principal Withdrawn
          </div>
          <div
            style={{
              marginTop: 16,
              backgroundColor: "rgba(16, 185, 129, 0.2)",
              color: "#6ee7b7",
              padding: "6px 14px",
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 800,
            }}
          >
            ZERO LOSS RISK ⚡
          </div>
        </div>

        {/* Right Card: 50% Free Ride */}
        <div
          style={{
            flex: 1,
            backgroundColor: "rgba(59, 130, 246, 0.08)",
            border: "2px solid rgba(59, 130, 246, 0.4)",
            borderRadius: 24,
            padding: "28px 24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            boxShadow: "0 12px 32px rgba(0,0,0,0.4)",
            opacity: card2Spring,
            transform: `translateY(${interpolate(card2Spring, [0, 1], [30, 0])}px)`,
          }}
        >
          <div style={{ fontSize: 44, marginBottom: 12 }}>🚀</div>
          <div
            style={{
              fontSize: 32,
              fontWeight: 900,
              color: "#60a5fa",
              marginBottom: 8,
            }}
          >
            RIDE 50% FREE
          </div>
          <div
            style={{
              fontSize: 18,
              color: "#bfdbfe",
              fontWeight: 600,
              lineHeight: 1.4,
            }}
          >
            Only Profit Multiplies
          </div>
          <div
            style={{
              marginTop: 16,
              backgroundColor: "rgba(59, 130, 246, 0.2)",
              color: "#93c5fd",
              padding: "6px 14px",
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 800,
            }}
          >
            TRAILING STOP-LOSS 🎯
          </div>
        </div>
      </div>

      {/* Dynamic Trailing Stop-Loss Slider Card */}
      <div
        style={{
          width: "100%",
          maxWidth: 960,
          backgroundColor: "#18181b",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          borderRadius: 20,
          padding: "20px 28px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <span style={{ fontSize: 16, fontWeight: 700, color: "#e4e4e7" }}>
            🛡️ Trailing Stop-Loss Armor
          </span>
          <span
            style={{
              fontSize: 16,
              fontWeight: 900,
              color: "#f87171",
              backgroundColor: "rgba(239, 68, 68, 0.15)",
              padding: "4px 10px",
              borderRadius: 6,
            }}
          >
            -5% LOCKED
          </span>
        </div>

        {/* Progress Track */}
        <div
          style={{
            width: "100%",
            height: 12,
            backgroundColor: "#27272a",
            borderRadius: 6,
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            style={{
              width: `${sliderProgress * 95}%`,
              height: "100%",
              background: "linear-gradient(90deg, #ef4444, #f59e0b, #10b981)",
              borderRadius: 6,
            }}
          />
        </div>
      </div>
    </div>
  );
};
