import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { resolveFontFamily, useTheme } from "../theme/theme";

interface StampProps {
  stampText: string;
  delayFrames?: number;
}

export const Stamp: React.FC<StampProps> = ({ stampText, delayFrames = 6 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const theme = useTheme();

  // Impact slam spring with short bounce
  const slamSpring = spring({
    frame: Math.max(0, frame - delayFrames),
    fps,
    config: {
      damping: 12,
      stiffness: 180,
      mass: 0.8,
    },
  });

  const scale = interpolate(slamSpring, [0, 1], [2.2, 1]);
  const opacity = interpolate(slamSpring, [0, 1], [0, 1]);
  const rotation = interpolate(slamSpring, [0, 1], [-16, -8]);

  const fontFamily = resolveFontFamily(stampText, theme.typography.headline);

  return (
    <div
      style={{
        display: "inline-block",
        margin: "40px auto 0",
        padding: "16px 48px",
        border: `7px solid ${theme.colors.accent}`,
        borderRadius: 16,
        color: theme.colors.accent,
        backgroundColor: "rgba(37, 99, 255, 0.08)",
        transform: `rotate(${rotation}deg) scale(${scale})`,
        opacity,
        boxShadow: `0 16px 40px ${theme.colors.accent}33`,
        textAlign: "center",
      }}
    >
      <span
        style={{
          fontFamily,
          fontSize: 68,
          fontWeight: 900,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          lineHeight: 1,
          display: "block",
        }}
      >
        {stampText}
      </span>
    </div>
  );
};
