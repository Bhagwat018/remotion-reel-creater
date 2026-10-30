import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { TechLogo } from "../TechLogo";

export interface MarketStormCardProps {
  delayFrames?: number;
}

export const MarketStormCard: React.FC<MarketStormCardProps> = ({ delayFrames = 2 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - delayFrames,
    fps,
    config: { damping: 13, stiffness: 140 },
  });

  const sebiEntrance = spring({
    frame: frame - (delayFrames + 4),
    fps,
    config: { damping: 12, stiffness: 150 },
  });

  const chartEntrance = spring({
    frame: frame - (delayFrames + 10),
    fps,
    config: { damping: 13, stiffness: 140 },
  });

  const pauseEntrance = spring({
    frame: frame - (delayFrames + 18),
    fps,
    config: { damping: 12, stiffness: 160 },
  });

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 880,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
        transform: `scale(${entrance})`,
        opacity: entrance,
      }}
    >
      {/* 1. SEBI GREEN LIGHT (The Positive Setup) */}
      <div
        style={{
          width: "100%",
          backgroundColor: "#f0fdf4",
          border: "3.5px solid #000000",
          borderRadius: 20,
          padding: "18px 24px",
          boxShadow: "5px 5px 0px #000000",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transform: `scale(${sebiEntrance})`,
          opacity: sebiEntrance,
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 50,
              height: 50,
              borderRadius: 14,
              backgroundColor: "#5f259f",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "2px solid #000000",
              boxShadow: "2px 2px 0px #000000",
            }}
          >
            <TechLogo name="phonepe" size={32} color="#ffffff" />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 26, fontWeight: 900, color: "#000000" }}>
              PHONEPE / SEBI CLEARANCE
            </span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 15, fontWeight: 700, color: "#16a34a" }}>
              Regulatory Green Light Obtained
            </span>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#22c55e",
            color: "#ffffff",
            border: "2.5px solid #000000",
            borderRadius: 12,
            padding: "8px 16px",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 17,
            fontWeight: 900,
            boxShadow: "3px 3px 0px #000000",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <span>✓</span>
          <span>SEBI APPROVED</span>
        </div>
      </div>

      {/* 2. THE MARKET VOLATILITY STORM (The Obstacle) */}
      <div
        style={{
          width: "100%",
          backgroundColor: "#ffffff",
          border: "3.5px solid #000000",
          borderRadius: 22,
          padding: "20px 24px",
          boxShadow: "6px 6px 0px #000000",
          display: "flex",
          flexDirection: "column",
          gap: 12,
          transform: `scale(${chartEntrance})`,
          opacity: chartEntrance,
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 22 }}>⚡</span>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 18,
                fontWeight: 900,
                color: "#e11d48",
                letterSpacing: "0.02em",
              }}
            >
              MARKET VOLATILITY WAVE DETECTED
            </span>
          </div>

          <div
            style={{
              backgroundColor: "#fee2e2",
              color: "#e11d48",
              border: "2px solid #000000",
              borderRadius: 999,
              padding: "4px 12px",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 14,
              fontWeight: 800,
            }}
          >
            INDEX CHOPPY 📉
          </div>
        </div>

        {/* Animated Erratic SVG Candlestick / Wave Line */}
        <div
          style={{
            width: "100%",
            height: 80,
            backgroundColor: "#0d1117",
            borderRadius: 14,
            border: "2.5px solid #000000",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
          }}
        >
          <svg width="100%" height="100%" viewBox="0 0 800 80" preserveAspectRatio="none">
            {/* Grid lines */}
            <line x1="0" y1="20" x2="800" y2="20" stroke="#1f2937" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="0" y1="40" x2="800" y2="40" stroke="#1f2937" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="0" y1="60" x2="800" y2="60" stroke="#1f2937" strokeWidth="1" strokeDasharray="4 4" />

            {/* Jagged volatility path */}
            <path
              d={`M 0 50 Q 100 15, 200 65 T 400 20 T 600 60 T 800 30`}
              fill="none"
              stroke="#ef4444"
              strokeWidth="4"
              style={{
                filter: "drop-shadow(0 0 8px rgba(239, 68, 68, 0.8))",
              }}
            />
            {/* Pulsing warning dot on peak */}
            <circle cx="400" cy="20" r="7" fill="#facc15" stroke="#000000" strokeWidth="2" />
          </svg>
        </div>
      </div>

      {/* 3. FOUNDERS EMERGENCY PAUSE VERDICT */}
      <div
        style={{
          width: "100%",
          backgroundColor: "#fef08a",
          border: "3.5px solid #000000",
          borderRadius: 20,
          padding: "18px 24px",
          boxShadow: "6px 6px 0px #000000",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transform: `scale(${pauseEntrance}) rotate(-0.8deg)`,
          opacity: pauseEntrance,
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 26,
              fontWeight: 900,
              color: "#000000",
              letterSpacing: "-0.01em",
            }}
          >
            FOUNDERS PAUSED LAUNCH ⏸️
          </span>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 16,
              fontWeight: 700,
              color: "#475569",
            }}
          >
            Risk of bad listing day too high // Postponed to 2027!
          </span>
        </div>

        <div
          style={{
            backgroundColor: "#000000",
            color: "#ffffff",
            borderRadius: 12,
            padding: "8px 16px",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 17,
            fontWeight: 900,
          }}
        >
          2027 SHIFT
        </div>
      </div>
    </div>
  );
};
