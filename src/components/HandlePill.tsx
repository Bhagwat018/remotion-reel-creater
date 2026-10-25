import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { resolveFontFamily, useTheme } from "../theme/theme";
import { entranceSpring } from "../lib/motion";

interface HandlePillProps {
  handle: string;
}

export const HandlePill: React.FC<HandlePillProps> = ({ handle }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const theme = useTheme();

  // Entrance occurs in the first second (30 frames); after that it remains completely static
  const springVal = entranceSpring(frame, fps, 0);
  const opacity = interpolate(springVal, [0, 1], [0, 1]);
  const translateY = interpolate(springVal, [0, 1], [20, 0]);

  const fontFamily = resolveFontFamily(handle, theme.typography.mono);

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: theme.layout.handleBottom,
        display: "flex",
        justifyContent: "center",
        pointerEvents: "none",
        zIndex: 45,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          backgroundColor: theme.colors.accent,
          color: theme.colors.accentText,
          borderRadius: theme.layout.pillRadius,
          padding: "12px 28px",
          boxShadow: `0 8px 24px ${theme.colors.accent}44`,
          opacity,
          transform: `translateY(${translateY}px)`,
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
        <span
          style={{
            fontFamily,
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          {handle}
        </span>
      </div>
    </div>
  );
};
