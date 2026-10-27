import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

interface NeoLineChartCardProps {
  title?: string;
  metric?: string;
  badge?: string;
  subtext?: string;
  delayFrames?: number;
}

export const NeoLineChartCard: React.FC<NeoLineChartCardProps> = ({
  title = "API Latency Reduction",
  metric = "-85% Drop",
  badge = "+106% Throughput",
  subtext = "Benchmark tested under 50,000 req/sec load",
  delayFrames = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - delayFrames,
    fps,
    config: { damping: 14, stiffness: 140 },
  });

  const pathProgress = Math.min(1, Math.max(0, (frame - delayFrames - 5) / 25));

  return (
    <div
      style={{
        backgroundColor: "#1e1e24",
        border: "3.5px solid #000000",
        borderRadius: 24,
        padding: "32px 30px",
        boxShadow: "7px 7px 0px #000000",
        width: "100%",
        maxWidth: 880,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: 16,
        transform: `scale(${entrance}) rotate(-1.5deg)`,
        opacity: entrance,
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h4
            style={{
              margin: 0,
              fontFamily: "'Inter', sans-serif",
              fontSize: 28,
              fontWeight: 900,
              color: "#ffffff",
            }}
          >
            {title}
          </h4>
          <span style={{ fontSize: 20, color: "#94a3b8", fontWeight: 700 }}>
            {subtext}
          </span>
        </div>

        <div
          style={{
            backgroundColor: "#22c55e",
            color: "#000000",
            border: "2px solid #000000",
            borderRadius: 999,
            padding: "6px 18px",
            fontSize: 22,
            fontWeight: 900,
            boxShadow: "2px 2px 0px #000000",
          }}
        >
          {badge}
        </div>
      </div>

      {/* Metric Display */}
      <div
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 64,
          fontWeight: 900,
          color: "#4ade80",
          letterSpacing: "-0.03em",
        }}
      >
        {metric}
      </div>

      {/* SVG Line Graph */}
      <div
        style={{
          height: 140,
          width: "100%",
          position: "relative",
          backgroundColor: "#141419",
          borderRadius: 14,
          border: "2px solid #000000",
          padding: 10,
          overflow: "hidden",
        }}
      >
        <svg
          viewBox="0 0 400 120"
          style={{ width: "100%", height: "100%", overflow: "visible" }}
        >
          {/* Subtle grid lines */}
          <line x1="0" y1="30" x2="400" y2="30" stroke="#334155" strokeDasharray="4 4" strokeWidth="1.5" />
          <line x1="0" y1="60" x2="400" y2="60" stroke="#334155" strokeDasharray="4 4" strokeWidth="1.5" />
          <line x1="0" y1="90" x2="400" y2="90" stroke="#334155" strokeDasharray="4 4" strokeWidth="1.5" />

          {/* Area under curve */}
          <path
            d="M 10 100 Q 120 90, 200 45 T 390 15 L 390 110 L 10 110 Z"
            fill="rgba(34, 197, 94, 0.18)"
          />

          {/* Growing Green Line */}
          <path
            d="M 10 100 Q 120 90, 200 45 T 390 15"
            fill="none"
            stroke="#22c55e"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray="500"
            strokeDashoffset={500 * (1 - pathProgress)}
          />

          {/* Dot at endpoint */}
          {pathProgress > 0.8 && (
            <circle cx="390" cy="15" r="7" fill="#ffffff" stroke="#22c55e" strokeWidth="3" />
          )}
        </svg>
      </div>
    </div>
  );
};
