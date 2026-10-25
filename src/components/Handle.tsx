import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../styles/theme";

interface HandleProps {
  handle?: string;
}

export const Handle: React.FC<HandleProps> = ({ handle = theme.handle }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Gentle spring in
  const entrance = spring({
    frame,
    fps,
    delay: 5,
    config: { damping: 14, stiffness: 120 },
  });

  const pulse = Math.sin(frame * 0.08) * 0.15 + 0.85;

  return (
    <div
      style={{
        position: "absolute",
        bottom: 70,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 50,
        opacity: entrance,
        transform: `translateY(${(1 - entrance) * 30}px) scale(${entrance})`,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "14px 28px",
          borderRadius: 9999,
          background: "rgba(18, 24, 38, 0.85)",
          border: `1.5px solid ${theme.colors.cardBorder}`,
          backdropFilter: "blur(16px)",
          boxShadow: `0 8px 32px rgba(0, 0, 0, 0.4), 0 0 16px ${theme.colors.accentGlow}`,
        }}
      >
        {/* Pulsing online status indicator */}
        <div
          style={{
            position: "relative",
            width: 12,
            height: 12,
            borderRadius: "50%",
            backgroundColor: theme.colors.accent,
            boxShadow: `0 0 12px ${theme.colors.accent}`,
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: -4,
              borderRadius: "50%",
              border: `2px solid ${theme.colors.accent}`,
              opacity: pulse,
              transform: `scale(${1.2 + (1 - pulse) * 0.8})`,
            }}
          />
        </div>

        {/* Handle text */}
        <span
          style={{
            fontFamily: theme.fontFamily,
            fontSize: 28,
            fontWeight: 700,
            color: theme.colors.text,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          {handle}
        </span>
      </div>
    </div>
  );
};
