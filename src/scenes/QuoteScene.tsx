import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { QuoteSceneProps } from "../schema";
import { SceneLayout } from "../components/SceneLayout";
import { resolveFontFamily, useTheme } from "../theme/theme";
import { entranceSpring } from "../lib/motion";

export const QuoteScene: React.FC<QuoteSceneProps & { durationInFrames: number }> = ({
  leadIn,
  headline,
  text,
  author,
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const theme = useTheme();

  const springVal = entranceSpring(frame, fps, 6);
  const scale = interpolate(springVal, [0, 1], [0.92, 1]);
  const opacity = interpolate(springVal, [0, 1], [0, 1]);

  const textFont = resolveFontFamily(text, theme.typography.ui);

  return (
    <SceneLayout
      leadIn={leadIn}
      headline={headline}
      durationInFrames={durationInFrames}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 880,
          backgroundColor: theme.colors.card,
          borderRadius: theme.layout.cardRadius,
          padding: "54px 50px",
          boxShadow: "0 24px 50px rgba(0, 0, 0, 0.35)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          opacity,
          transform: `scale(${scale})`,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          gap: 28,
        }}
      >
        <span
          style={{
            fontFamily: theme.typography.headline,
            fontSize: 70,
            lineHeight: 0.6,
            color: theme.colors.accent,
            opacity: 0.8,
            display: "block",
          }}
        >
          “
        </span>
        <div
          style={{
            fontFamily: textFont,
            fontSize: 38,
            fontWeight: 500,
            lineHeight: 1.4,
            color: theme.colors.cardText,
            fontStyle: "italic",
          }}
        >
          {text}
        </div>
        {author && (
          <div
            style={{
              fontFamily: theme.typography.mono,
              fontSize: 22,
              color: theme.colors.accent,
              fontWeight: 600,
              letterSpacing: "0.06em",
              alignSelf: "flex-end",
            }}
          >
            — {author}
          </div>
        )}
      </div>
    </SceneLayout>
  );
};
