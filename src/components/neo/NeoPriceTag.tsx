import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

interface NeoPriceTagProps {
  price: string;
  unit?: string;
  bg?: string;
  color?: string;
  rotate?: number;
  delayFrames?: number;
}

export const NeoPriceTag: React.FC<NeoPriceTagProps> = ({
  price,
  unit = "per 1M tokens",
  bg = "#fde047",
  color = "#000000",
  rotate = 6,
  delayFrames = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - delayFrames,
    fps,
    config: { damping: 13, stiffness: 150 },
  });

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 14,
        backgroundColor: bg,
        color,
        border: "3.5px solid #000000",
        borderRadius: 18,
        padding: "12px 28px",
        boxShadow: "5px 5px 0px #000000",
        transform: `scale(${entrance}) rotate(${rotate}deg)`,
        opacity: entrance,
        position: "relative",
      }}
    >
      {/* Punch hole */}
      <div
        style={{
          width: 16,
          height: 16,
          borderRadius: "50%",
          backgroundColor: "#f4f5f8",
          border: "2px solid #000000",
        }}
      />

      <div style={{ display: "flex", flexDirection: "column" }}>
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 34,
            fontWeight: 900,
            lineHeight: 1.1,
          }}
        >
          {price}
        </span>
        {unit && (
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 18,
              fontWeight: 800,
              color: "#334155",
            }}
          >
            {unit}
          </span>
        )}
      </div>
    </div>
  );
};
