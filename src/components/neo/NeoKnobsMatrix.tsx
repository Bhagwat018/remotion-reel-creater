import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

interface NeoKnobsMatrixProps {
  rows?: number;
  cols?: number;
  title?: string;
  delayFrames?: number;
}

const KNOB_COLORS = [
  "#fb923c", // orange
  "#f43f5e", // red-pink
  "#8b5cf6", // purple
  "#14b8a6", // teal
  "#06b6d4", // cyan
  "#10b981", // emerald
];

export const NeoKnobsMatrix: React.FC<NeoKnobsMatrixProps> = ({
  rows = 6,
  cols = 10,
  title,
  delayFrames = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - delayFrames,
    fps,
    config: { damping: 14, stiffness: 110 },
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        maxWidth: 920,
        backgroundColor: "#ffffff",
        border: "4px solid #000000",
        borderRadius: 26,
        padding: "26px 22px",
        boxShadow: "7px 7px 0px #000000",
        transform: `scale(${Math.max(0, entrance)})`,
        transformOrigin: "center center",
        boxSizing: "border-box",
      }}
    >
      {title && (
        <div
          style={{
            alignSelf: "flex-start",
            marginBottom: 16,
            padding: "6px 16px",
            backgroundColor: "#fef08a",
            border: "2.5px solid #000000",
            borderRadius: 12,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 20,
            fontWeight: 800,
            color: "#000000",
            boxShadow: "3px 3px 0px #000000",
          }}
        >
          {title}
        </div>
      )}

      {/* Grid of Potentiometer Knobs */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gap: 12,
          width: "100%",
          justifyItems: "center",
          alignItems: "center",
        }}
      >
        {Array.from({ length: rows * cols }).map((_, idx) => {
          const r = Math.floor(idx / cols);
          const c = idx % cols;
          // Deterministic color assignment
          const color = KNOB_COLORS[(r * 3 + c * 2) % KNOB_COLORS.length];
          // Base angle + gentle rotation oscillation
          const baseAngle = ((r * 47 + c * 83) % 270) - 135;
          const liveRotation =
            baseAngle + Math.sin((frame + idx * 7) / 12) * 22;

          return (
            <div
              key={idx}
              style={{
                width: 58,
                height: 58,
                borderRadius: "50%",
                backgroundColor: color,
                border: "3px solid #000000",
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "2px 2px 0px #000000",
              }}
            >
              {/* Dial Tick marks ring (SVG) */}
              <svg
                width="54"
                height="54"
                viewBox="0 0 54 54"
                style={{
                  position: "absolute",
                  transform: `rotate(${liveRotation}deg)`,
                }}
              >
                {/* Pointer Indicator Line */}
                <line
                  x1="27"
                  y1="27"
                  x2="27"
                  y2="9"
                  stroke="#000000"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                {/* Center Hub Pivot */}
                <circle cx="27" cy="27" r="4.5" fill="#000000" />
              </svg>
            </div>
          );
        })}
      </div>
    </div>
  );
};
