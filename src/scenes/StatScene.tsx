import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { StatSceneProps } from "../schema";
import { SceneLayout } from "../components/SceneLayout";
import { resolveFontFamily, useTheme } from "../theme/theme";
import { useBlurIn } from "../lib/motion";

export const StatScene: React.FC<StatSceneProps & { durationInFrames: number }> = ({
  leadIn,
  headline,
  value,
  label,
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const theme = useTheme();

  // Parse numeric part and suffix
  const strVal = String(value);
  const match = strVal.match(/^([\d.]+)(.*)$/);
  const targetNum = match ? parseFloat(match[1]) : 100;
  const suffix = match ? match[2] : "";

  // Count up from 0 over 30 frames
  const countProgress = interpolate(frame, [8, 38], [0, targetNum], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const currentNumberDisplay = Number.isInteger(targetNum)
    ? Math.round(countProgress)
    : countProgress.toFixed(1);

  const motionStyle = useBlurIn(frame, 6);
  const labelFont = resolveFontFamily(label, theme.typography.ui);

  return (
    <SceneLayout
      leadIn={leadIn}
      headline={headline}
      durationInFrames={durationInFrames}
    >
      <div
        style={{
          ...motionStyle,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
        }}
      >
        <div
          style={{
            fontFamily: theme.typography.headline,
            fontSize: 200,
            lineHeight: 0.9,
            color: theme.colors.accent,
            letterSpacing: "-0.02em",
            textShadow: `0 20px 60px ${theme.colors.accent}44`,
          }}
        >
          {currentNumberDisplay}
          {suffix}
        </div>
        <div
          style={{
            fontFamily: labelFont,
            fontSize: 36,
            fontWeight: 500,
            color: theme.colors.ink,
            textAlign: "center",
            maxWidth: 700,
          }}
        >
          {label}
        </div>
      </div>
    </SceneLayout>
  );
};
