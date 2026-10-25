import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { resolveFontFamily, useTheme } from "../theme/theme";
import { entranceSpring } from "../lib/motion";

interface DarkCardProps {
  cardText: string;
  chip: string;
  delayFrames?: number;
}

export const DarkCard: React.FC<DarkCardProps> = ({
  cardText,
  chip,
  delayFrames = 4,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const theme = useTheme();

  const springVal = entranceSpring(frame, fps, delayFrames);
  const scale = interpolate(springVal, [0, 1], [0.92, 1]);
  const opacity = interpolate(springVal, [0, 1], [0, 1]);

  // Typing effect: reveal text smoothly over 25 frames after entrance
  const typingStart = delayFrames + 4;
  const typingDuration = 25;
  const revealedLength = Math.floor(
    interpolate(frame, [typingStart, typingStart + typingDuration], [0, cardText.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  const displayedText = cardText.slice(0, revealedLength);
  const isTyping = frame >= typingStart && frame < typingStart + typingDuration;
  const fontFamily = resolveFontFamily(cardText, theme.typography.ui);

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 880,
        backgroundColor: theme.colors.card,
        borderRadius: theme.layout.cardRadius,
        padding: "44px 48px",
        boxShadow: "0 24px 50px rgba(0, 0, 0, 0.35)",
        opacity,
        transform: `scale(${scale})`,
        display: "flex",
        flexDirection: "column",
        gap: 28,
        border: "1px solid rgba(255, 255, 255, 0.08)",
      }}
    >
      {/* Prompt header icon / badge */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            width: 14,
            height: 14,
            borderRadius: "50%",
            backgroundColor: theme.colors.accent,
          }}
        />
        <span
          style={{
            fontFamily: theme.typography.mono,
            fontSize: 20,
            color: theme.colors.muted,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          Prompt Output
        </span>
      </div>

      {/* Main typing text */}
      <div
        style={{
          fontFamily,
          fontSize: 36,
          fontWeight: 500,
          lineHeight: 1.4,
          color: theme.colors.cardText,
          minHeight: 130,
        }}
      >
        {displayedText}
        {isTyping && (
          <span
            style={{
              display: "inline-block",
              width: 3,
              height: 34,
              backgroundColor: theme.colors.accent,
              marginLeft: 6,
              verticalAlign: "middle",
            }}
          />
        )}
      </div>

      {/* Bottom small chip */}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.08)",
            color: theme.colors.accent,
            fontFamily: theme.typography.mono,
            fontSize: 22,
            fontWeight: 600,
            padding: "8px 20px",
            borderRadius: theme.layout.pillRadius,
            border: `1px solid ${theme.colors.accent}44`,
          }}
        >
          {chip}
        </div>
      </div>
    </div>
  );
};
