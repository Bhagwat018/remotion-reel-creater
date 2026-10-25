import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { StepsSceneProps } from "../schema";
import { SceneLayout } from "../components/SceneLayout";
import { resolveFontFamily, useTheme } from "../theme/theme";
import { entranceSpring } from "../lib/motion";
import { TechLogo, findBrandInText } from "../components/TechLogo";

export const StepsScene: React.FC<
  StepsSceneProps & { steps?: string[]; durationInFrames: number }
> = ({ leadIn, headline, items, steps, durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const theme = useTheme();

  const stepList = items && items.length > 0 ? items : steps || [];

  return (
    <SceneLayout
      leadIn={leadIn}
      headline={headline}
      durationInFrames={durationInFrames}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 22,
          width: "100%",
          maxWidth: 860,
        }}
      >
        {stepList.map((stepText, idx) => {
          const delay = 6 + idx * theme.motion.stagger;
          const springVal = entranceSpring(frame, fps, delay);
          const scale = interpolate(springVal, [0, 1], [0.9, 1]);
          const opacity = interpolate(springVal, [0, 1], [0, 1]);
          const translateY = interpolate(springVal, [0, 1], [16, 0]);
          const stepFont = resolveFontFamily(stepText, theme.typography.ui);
          const brand = findBrandInText(stepText);

          return (
            <div
              key={idx}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
                backgroundColor: theme.colors.card,
                borderRadius: theme.layout.cardRadius,
                padding: "24px 32px",
                boxShadow: "0 12px 30px rgba(0, 0, 0, 0.25)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                opacity,
                transform: `translateY(${translateY}px) scale(${scale})`,
              }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 14,
                  backgroundColor: theme.colors.accent,
                  color: theme.colors.accentText,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: theme.typography.mono,
                  fontSize: 24,
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                {String(idx + 1).padStart(2, "0")}
              </div>
              {brand && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <TechLogo name={brand.key} size={32} />
                </div>
              )}
              <div
                style={{
                  fontFamily: stepFont,
                  fontSize: 28,
                  fontWeight: 500,
                  color: theme.colors.cardText,
                  lineHeight: 1.3,
                }}
              >
                {stepText}
              </div>
            </div>
          );
        })}
      </div>
    </SceneLayout>
  );
};
