import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

interface NeoBigButtonProps {
  text: string;
  subtext?: string;
  bg?: string;
  color?: string;
  rotate?: number;
  delayFrames?: number;
}

export const NeoBigButton: React.FC<NeoBigButtonProps> = ({
  text,
  subtext = "FREE CODE & PROMPTS IN DM 🚀",
  bg = "#ec4899",
  color = "#ffffff",
  rotate = -3,
  delayFrames = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - delayFrames,
    fps,
    config: { damping: 12, stiffness: 160 },
  });

  const pulse = Math.sin(frame / 6) * 0.03 + 1;

  const fontSize = text.length > 22 ? 30 : text.length > 16 ? 34 : 44;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
        transform: `scale(${entrance * pulse}) rotate(${rotate}deg)`,
        opacity: entrance,
      }}
    >
      <div
        style={{
          backgroundColor: bg,
          color,
          border: "4px solid #000000",
          borderRadius: 22,
          padding: "18px 40px",
          boxShadow: "7px 7px 0px #000000",
          fontFamily: "'Inter', sans-serif",
          fontSize,
          fontWeight: 900,
          letterSpacing: "-0.02em",
          textAlign: "center",
          textTransform: "uppercase",
        }}
      >
        {text}
      </div>

      {subtext && (
        <div
          style={{
            backgroundColor: "#ffffff",
            color: "#000000",
            border: "2.5px solid #000000",
            borderRadius: 999,
            padding: "8px 22px",
            fontSize: 22,
            fontWeight: 800,
            boxShadow: "3px 3px 0px #000000",
          }}
        >
          {subtext}
        </div>
      )}
    </div>
  );
};
