import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

interface NeoWeightsBrainProps {
  delayFrames?: number;
  highlightText?: string;
  pill1?: string;
  pill2?: string;
}

const MATRIX_DATA = [
  ["-0.7", "-0.9", "0.7"],
  ["-0.4", "0.3", "-0.5", "0.3", "-0.7", "0.7", "-0.9", "0.6"],
  ["-0.4", "0.2", "-0.5", "0.4", "0.3", "-0.9", "0.5", "-0.3", "-0.3", "0.9"],
  ["-0.4", "-0.9", "-0.4", "0.7", "-0.5", "0.1", "0.8", "0.0", "-0.9", "-1.0"],
  ["-0.3", "-0.1", "0.8", "-0.8", "0.2", "0.7", "-0.2", "-0.2", "0.2", "0.5"],
  ["0.5", "-0.1", "0.2", "0.7", "0.8", "-0.2", "0.5", "-0.0", "-0.1", "-0.3"],
  ["-0.4", "-0.2", "0.8", "0.7", "0.0", "0.7", "0.5", "0.2"],
];

export const NeoWeightsBrain: React.FC<NeoWeightsBrainProps> = ({
  delayFrames = 0,
  highlightText = "dhyaan dena 👀",
  pill1 = "billions of numbers?!",
  pill2 = "matlab kya? 🤔",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardEntrance = spring({
    frame: frame - delayFrames,
    fps,
    config: { damping: 13, stiffness: 120 },
  });

  const pill1Entrance = spring({
    frame: frame - (delayFrames + 10),
    fps,
    config: { damping: 12, stiffness: 130 },
  });

  const pill2Entrance = spring({
    frame: frame - (delayFrames + 18),
    fps,
    config: { damping: 12, stiffness: 130 },
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        maxWidth: 920,
        gap: 20,
      }}
    >
      {/* 1. Main Neural Weights Card with Brain Silhouette */}
      <div
        style={{
          width: "100%",
          backgroundColor: "#ffffff",
          border: "4px solid #000000",
          borderRadius: 24,
          padding: "24px 28px",
          boxShadow: "7px 7px 0px #000000",
          position: "relative",
          overflow: "hidden",
          transform: `scale(${Math.max(0, cardEntrance)})`,
          boxSizing: "border-box",
        }}
      >
        {/* Top Header Row with Highlight Chip */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <div
            style={{
              backgroundColor: "#fed7aa",
              border: "3px solid #000000",
              borderRadius: 14,
              padding: "6px 18px",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 22,
              fontWeight: 800,
              color: "#000000",
              boxShadow: "3px 3px 0px #000000",
            }}
          >
            {highlightText}
          </div>

          <div
            style={{
              display: "flex",
              gap: 16,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 20,
              fontWeight: 800,
              color: "#ef4444",
            }}
          >
            <span>-0.7</span>
            <span>-0.9</span>
            <span>0.7</span>
          </div>
        </div>

        {/* Center Stylized Brain Silhouette Watermark (SVG) */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -45%)",
            opacity: 0.18,
            pointerEvents: "none",
            zIndex: 1,
          }}
        >
          <svg
            width="420"
            height="320"
            viewBox="0 0 200 150"
            fill="#f43f5e"
          >
            <path d="M50 75 C30 75 20 60 25 45 C20 30 35 15 55 20 C70 10 90 20 95 35 C100 35 105 35 105 35 C110 20 130 10 145 20 C165 15 180 30 175 45 C180 60 170 75 150 75 C165 90 160 115 140 125 C125 135 110 120 105 115 C100 115 100 115 95 115 C90 120 75 135 60 125 C40 115 35 90 50 75 Z" />
          </svg>
        </div>

        {/* Floating Matrix of Weights Numbers */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 800,
            fontSize: 22,
          }}
        >
          {MATRIX_DATA.map((row, rIdx) => (
            <div
              key={rIdx}
              style={{
                display: "flex",
                justifyContent: "center",
                gap: 16,
                width: "100%",
              }}
            >
              {row.map((val, cIdx) => {
                const isPositive = !val.startsWith("-");
                const color = isPositive ? "#ec4899" : "#6366f1";
                const isZero = val === "0.0" || val === "-0.0";
                const displayColor = isZero ? "#10b981" : color;

                return (
                  <span
                    key={cIdx}
                    style={{
                      color: displayColor,
                      minWidth: 44,
                      textAlign: "right",
                    }}
                  >
                    {val}
                  </span>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* 2. Reaction Pill 1: "billions of numbers?!" */}
      {pill1 && pill1Entrance > 0.05 && (
        <div
          style={{
            backgroundColor: "#f43f5e",
            border: "4px solid #000000",
            borderRadius: 22,
            padding: "14px 38px",
            boxShadow: "6px 6px 0px #000000",
            transform: `scale(${pill1Entrance}) rotate(-2deg)`,
            transformOrigin: "center center",
          }}
        >
          <span
            style={{
              fontFamily: "'Cabinet Grotesk', -apple-system, sans-serif",
              fontSize: 36,
              fontWeight: 900,
              color: "#ffffff",
              letterSpacing: "-0.01em",
            }}
          >
            {pill1}
          </span>
        </div>
      )}

      {/* 3. Reaction Pill 2: "matlab kya? 🤔" */}
      {pill2 && pill2Entrance > 0.05 && (
        <div
          style={{
            backgroundColor: "#8b5cf6",
            border: "4px solid #000000",
            borderRadius: 22,
            padding: "12px 32px",
            boxShadow: "6px 6px 0px #000000",
            transform: `scale(${pill2Entrance}) rotate(1.5deg)`,
            transformOrigin: "center center",
          }}
        >
          <span
            style={{
              fontFamily: "'Cabinet Grotesk', -apple-system, sans-serif",
              fontSize: 32,
              fontWeight: 900,
              color: "#ffffff",
              letterSpacing: "-0.01em",
            }}
          >
            {pill2}
          </span>
        </div>
      )}
    </div>
  );
};
