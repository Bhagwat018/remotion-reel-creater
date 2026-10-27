import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

interface NeoTopPillProps {
  text: string;
  color?: "orange" | "blue" | "pink" | "purple" | "green";
  delayFrames?: number;
}

const COLOR_MAP = {
  orange: { bg: "#fb923c", text: "#000000" },
  blue: { bg: "#60a5fa", text: "#000000" },
  pink: { bg: "#f472b6", text: "#000000" },
  purple: { bg: "#c084fc", text: "#000000" },
  green: { bg: "#4ade80", text: "#000000" },
};

export const NeoTopPill: React.FC<NeoTopPillProps> = ({
  text,
  color = "orange",
  delayFrames = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - delayFrames,
    fps,
    config: { damping: 14, stiffness: 140 },
  });

  const selectedColor = COLOR_MAP[color] || COLOR_MAP.orange;

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        backgroundColor: selectedColor.bg,
        color: selectedColor.text,
        border: "3px solid #000000",
        borderRadius: 999,
        padding: "10px 28px",
        boxShadow: "4px 4px 0px #000000",
        fontFamily: "'Inter', sans-serif",
        fontSize: 32,
        fontWeight: 800,
        letterSpacing: "-0.01em",
        transform: `scale(${entrance}) translateY(${(1 - entrance) * -30}px)`,
        opacity: entrance,
        marginBottom: 20,
      }}
    >
      {text}
    </div>
  );
};
