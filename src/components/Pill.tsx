import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { resolveFontFamily, useTheme } from "../theme/theme";
import { entranceSpring } from "../lib/motion";

interface PillProps {
  text: string;
  index?: number;
  showSparkle?: boolean;
}

export const Pill: React.FC<PillProps> = ({
  text,
  index = 0,
  showSparkle = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const theme = useTheme();

  const delay = index * theme.motion.stagger;
  const springProgress = entranceSpring(frame, fps, delay);

  const scale = interpolate(springProgress, [0, 1], [0.9, 1]);
  const opacity = interpolate(springProgress, [0, 1], [0, 1]);
  const translateY = interpolate(springProgress, [0, 1], [16, 0]);

  const fontFamily = resolveFontFamily(text, theme.typography.ui);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        backgroundColor: theme.colors.card,
        color: theme.colors.cardText,
        borderRadius: theme.layout.pillRadius,
        padding: "20px 36px",
        boxShadow: "0 12px 30px rgba(0, 0, 0, 0.25)",
        opacity,
        transform: `translateY(${translateY}px) scale(${scale})`,
        transformOrigin: "center center",
      }}
    >
      {showSparkle && (
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke={theme.colors.accent}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ flexShrink: 0 }}
        >
          <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3z" />
        </svg>
      )}
      <span
        style={{
          fontFamily,
          fontSize: 32,
          fontWeight: 500,
          lineHeight: 1.25,
          letterSpacing: "-0.01em",
        }}
      >
        {text}
      </span>
    </div>
  );
};
