import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { GridSceneProps } from "../schema";
import { SceneLayout } from "../components/SceneLayout";
import { resolveFontFamily, useTheme } from "../theme/theme";
import { entranceSpring } from "../lib/motion";

export const GridScene: React.FC<GridSceneProps & { durationInFrames: number }> = ({
  leadIn,
  headline,
  cells,
  savedIndex,
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const theme = useTheme();

  return (
    <SceneLayout
      leadIn={leadIn}
      headline={headline}
      durationInFrames={durationInFrames}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 24,
          width: "100%",
          maxWidth: 880,
        }}
      >
        {cells.map((cellText, idx) => {
          const isSaved = idx === savedIndex;
          const delay = 6 + idx * 4;
          const springVal = entranceSpring(frame, fps, delay);
          const scale = interpolate(springVal, [0, 1], [0.88, 1]);
          const opacity = interpolate(springVal, [0, 1], [0, 1]);
          const fontFamily = resolveFontFamily(cellText, theme.typography.ui);

          return (
            <div
              key={idx}
              style={{
                backgroundColor: theme.colors.card,
                borderRadius: theme.layout.cardRadius,
                padding: "36px 32px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: 180,
                border: isSaved
                  ? `2px solid ${theme.colors.accent}`
                  : "1px solid rgba(255, 255, 255, 0.08)",
                boxShadow: isSaved
                  ? `0 16px 36px ${theme.colors.accent}33`
                  : "0 12px 30px rgba(0, 0, 0, 0.3)",
                opacity,
                transform: `scale(${scale})`,
                position: "relative",
              }}
            >
              {isSaved && (
                <div
                  style={{
                    alignSelf: "flex-start",
                    backgroundColor: theme.colors.accent,
                    color: theme.colors.accentText,
                    fontFamily: theme.typography.mono,
                    fontSize: 18,
                    fontWeight: 700,
                    padding: "4px 14px",
                    borderRadius: theme.layout.pillRadius,
                    marginBottom: 16,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  Saved
                </div>
              )}
              <div
                style={{
                  fontFamily,
                  fontSize: 28,
                  fontWeight: 600,
                  color: isSaved ? theme.colors.accentText : theme.colors.cardText,
                  lineHeight: 1.3,
                }}
              >
                {cellText}
              </div>
            </div>
          );
        })}
      </div>
    </SceneLayout>
  );
};
