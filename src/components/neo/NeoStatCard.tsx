import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

interface NeoStatCardProps {
  value: string;
  label: string;
  subtext?: string;
  badge?: string;
  bg?: string;
  accentColor?: string;
  delayFrames?: number;
}

export const NeoStatCard: React.FC<NeoStatCardProps> = ({
  value,
  label,
  subtext,
  badge,
  bg = "#ffffff",
  accentColor = "#7c3aed",
  delayFrames = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pop = spring({
    frame: frame - delayFrames,
    fps,
    config: { damping: 13, stiffness: 150 },
  });

  return (
    <div
      style={{
        backgroundColor: bg,
        border: "3.5px solid #000000",
        borderRadius: 26,
        padding: "36px 32px",
        boxShadow: "7px 7px 0px #000000",
        width: "100%",
        maxWidth: 880,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: 14,
        transform: `scale(${pop}) rotate(-1deg)`,
        opacity: pop > 0 ? 1 : 0,
        position: "relative",
      }}
    >
      {badge && (
        <div
          style={{
            position: "absolute",
            top: -18,
            backgroundColor: "#fb923c",
            color: "#000000",
            border: "2.5px solid #000000",
            borderRadius: 999,
            padding: "5px 18px",
            fontSize: 22,
            fontWeight: 800,
            boxShadow: "3px 3px 0px #000000",
            transform: "rotate(3deg)",
          }}
        >
          {badge}
        </div>
      )}

      {/* Huge Bold Value */}
      <div
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: value.length > 9 ? 68 : value.length > 6 ? 78 : 88,
          fontWeight: 900,
          color: accentColor,
          lineHeight: 1,
          letterSpacing: "-0.04em",
          textShadow: "2px 2px 0px #000000",
        }}
      >
        {value}
      </div>

      {/* Label */}
      <div
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 34,
          fontWeight: 800,
          color: "#000000",
          letterSpacing: "-0.01em",
        }}
      >
        {label}
      </div>

      {/* Subtext */}
      {subtext && (
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 24,
            fontWeight: 600,
            color: "#475569",
            maxWidth: 680,
            lineHeight: 1.4,
          }}
        >
          {subtext}
        </div>
      )}
    </div>
  );
};
