import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { CompareSceneProps } from "../schema";
import { SceneLayout } from "../components/SceneLayout";
import { resolveFontFamily, useTheme } from "../theme/theme";
import { entranceSpring } from "../lib/motion";
import { TechLogo, findBrandInText } from "../components/TechLogo";

export const CompareScene: React.FC<
  CompareSceneProps & {
    leftLabel?: string;
    rightLabel?: string;
    durationInFrames: number;
  }
> = ({
  leadIn,
  headline,
  left,
  right,
  leftLabel,
  rightLabel,
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const theme = useTheme();

  const parseSide = (
    obj?: { label: string; items?: string[] },
    labelStr?: string,
    defaultLabel = "Option"
  ) => {
    if (obj && obj.label) return { label: obj.label, items: obj.items || [] };
    if (!labelStr) return { label: defaultLabel, items: [] };

    const match = labelStr.match(/^(.*?)\s*\((.*?)\)$/);
    if (match) {
      return {
        label: match[1].trim(),
        items: [match[2].trim()],
      };
    }
    return {
      label: labelStr,
      items: [],
    };
  };

  const leftSide = parseSide(left, leftLabel, "Before");
  const rightSide = parseSide(right, rightLabel, "After");

  const leftSpring = entranceSpring(frame, fps, 6);
  const rightSpring = entranceSpring(frame, fps, 12);

  const leftScale = interpolate(leftSpring, [0, 1], [0.9, 1]);
  const leftOpacity = interpolate(leftSpring, [0, 1], [0, 1]);

  const rightScale = interpolate(rightSpring, [0, 1], [0.9, 1]);
  const rightOpacity = interpolate(rightSpring, [0, 1], [0, 1]);

  const leftFont = resolveFontFamily(leftSide.label, theme.typography.ui);
  const rightFont = resolveFontFamily(rightSide.label, theme.typography.ui);

  return (
    <SceneLayout
      leadIn={leadIn}
      headline={headline}
      durationInFrames={durationInFrames}
    >
      <div
        style={{
          display: "flex",
          gap: 28,
          width: "100%",
          maxWidth: 900,
          justifyContent: "center",
        }}
      >
        {/* Left (Wrong / Avoid) */}
        <div
          style={{
            flex: 1,
            backgroundColor: theme.colors.card,
            borderRadius: theme.layout.cardRadius,
            padding: "36px 30px",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            boxShadow: "0 16px 36px rgba(0, 0, 0, 0.3)",
            opacity: leftOpacity,
            transform: `scale(${leftScale})`,
          }}
        >
          {(() => {
            const brand = findBrandInText(leftSide.label);
            return (
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  backgroundColor: "rgba(255, 75, 75, 0.15)",
                  color: "#FF5252",
                  fontFamily: theme.typography.mono,
                  fontSize: 20,
                  fontWeight: 700,
                  padding: "6px 16px",
                  borderRadius: theme.layout.pillRadius,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  marginBottom: 24,
                }}
              >
                {brand && <TechLogo name={brand.key} size={20} />}
                <span>{leftSide.label}</span>
              </div>
            );
          })()}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {leftSide.items.map((item, i) => {
              const brand = findBrandInText(item);
              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    fontFamily: leftFont,
                    fontSize: 24,
                    color: theme.colors.cardText,
                    lineHeight: 1.3,
                  }}
                >
                  <span style={{ color: "#FF5252", fontWeight: 700 }}>✕</span>
                  {brand && <TechLogo name={brand.key} size={20} />}
                  <span>{item}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right (Right / Best Practice) */}
        <div
          style={{
            flex: 1,
            backgroundColor: theme.colors.card,
            borderRadius: theme.layout.cardRadius,
            padding: "36px 30px",
            border: `2px solid ${theme.colors.accent}`,
            boxShadow: `0 16px 40px ${theme.colors.accent}33`,
            opacity: rightOpacity,
            transform: `scale(${rightScale})`,
          }}
        >
          {(() => {
            const brand = findBrandInText(rightSide.label);
            return (
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  backgroundColor: theme.colors.accent,
                  color: theme.colors.accentText,
                  fontFamily: theme.typography.mono,
                  fontSize: 20,
                  fontWeight: 700,
                  padding: "6px 16px",
                  borderRadius: theme.layout.pillRadius,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  marginBottom: 24,
                }}
              >
                {brand && <TechLogo name={brand.key} size={20} />}
                <span>{rightSide.label}</span>
              </div>
            );
          })()}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {rightSide.items.map((item, i) => {
              const brand = findBrandInText(item);
              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    fontFamily: rightFont,
                    fontSize: 24,
                    color: theme.colors.cardText,
                    lineHeight: 1.3,
                  }}
                >
                  <span style={{ color: theme.colors.accent, fontWeight: 700 }}>✓</span>
                  {brand && <TechLogo name={brand.key} size={20} />}
                  <span>{item}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </SceneLayout>
  );
};
