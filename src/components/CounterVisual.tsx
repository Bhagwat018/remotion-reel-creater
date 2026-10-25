import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../styles/theme";

export const CounterVisual: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  const count = Math.round(
    interpolate(frame, [5, 60], [0, 89], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  return (
    <div
      style={{
        width: 860,
        height: 480,
        borderRadius: 24,
        background: "rgba(18, 24, 38, 0.9)",
        border: `1.5px solid ${theme.colors.cardBorder}`,
        backdropFilter: "blur(16px)",
        boxShadow: `0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px ${theme.colors.accentGlow}`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: entrance,
        transform: `scale(${entrance})`,
      }}
    >
      <div
        style={{
          fontFamily: theme.fontFamily,
          fontSize: 18,
          fontWeight: 700,
          color: theme.colors.mutedText,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          marginBottom: 16,
        }}
      >
        Hallucination Rate in Blind Generation
      </div>

      <div
        style={{
          fontFamily: theme.fontFamily,
          fontSize: 130,
          fontWeight: 900,
          color: theme.colors.accent,
          lineHeight: 1,
          textShadow: `0 0 40px ${theme.colors.accentGlow}`,
          marginBottom: 16,
        }}
      >
        {count}%
      </div>

      <div
        style={{
          fontFamily: "monospace",
          fontSize: 18,
          color: theme.colors.text,
          background: "rgba(255, 255, 255, 0.05)",
          padding: "8px 20px",
          borderRadius: 8,
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        STATISTICAL_FABRICATION_INDEX
      </div>
    </div>
  );
};
