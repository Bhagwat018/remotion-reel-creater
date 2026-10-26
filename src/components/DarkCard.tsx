import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { resolveFontFamily, useTheme } from "../theme/theme";
import { entranceSpring } from "../lib/motion";
import { ShimmerSweep } from "./ShimmerSweep";
import { TechLogo, findBrandInText } from "./TechLogo";

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

  // Levitation physics (subtle sine-wave float)
  const floatY = frame > delayFrames + 10 ? Math.sin((frame - delayFrames) / 12) * 6 : 0;

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

  // Auto-detect brand in cardText or chip
  const brandMatch = findBrandInText(cardText) || findBrandInText(chip);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 880,
        backgroundColor: "rgba(13, 17, 28, 0.94)",
        backdropFilter: "blur(20px)",
        borderRadius: 28,
        padding: "44px 48px",
        boxShadow: "0 28px 65px rgba(0, 0, 0, 0.55), 0 0 30px rgba(56, 189, 248, 0.15)",
        opacity,
        transform: `translateY(${floatY}px) scale(${scale})`,
        display: "flex",
        flexDirection: "column",
        gap: 28,
        border: "1.5px solid rgba(56, 189, 248, 0.35)",
        overflow: "hidden",
      }}
    >
      {/* Remocn-style light sweep across card */}
      <ShimmerSweep delayFrames={delayFrames + 12} periodFrames={85} />

      {/* Cyber Corner Accents */}
      <div
        style={{
          position: "absolute",
          top: 14,
          left: 18,
          fontFamily: theme.typography.mono,
          fontSize: 12,
          color: "rgba(56, 189, 248, 0.5)",
          letterSpacing: "0.1em",
        }}
      >
        [ SYS.01 ]
      </div>
      <div
        style={{
          position: "absolute",
          top: 14,
          right: 18,
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: "#22c55e",
          boxShadow: "0 0 8px #22c55e",
        }}
      />

      {/* Header icon / badge */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 4 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {brandMatch ? (
            <TechLogo name={brandMatch.key} size={32} />
          ) : (
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: "50%",
                backgroundColor: theme.colors.accent,
                boxShadow: `0 0 10px ${theme.colors.accent}`,
              }}
            />
          )}
          <span
            style={{
              fontFamily: theme.typography.mono,
              fontSize: 18,
              color: "#94a3b8",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              fontWeight: 600,
            }}
          >
            {brandMatch ? brandMatch.meta.label : "Tech Spotlight"}
          </span>
        </div>

        <div
          style={{
            backgroundColor: "rgba(56, 189, 248, 0.12)",
            color: "#38bdf8",
            fontFamily: theme.typography.mono,
            fontSize: 16,
            fontWeight: 700,
            padding: "4px 14px",
            borderRadius: 999,
            border: "1px solid rgba(56, 189, 248, 0.3)",
          }}
        >
          ANALYSIS
        </div>
      </div>

      {/* Main typing text */}
      <div
        style={{
          fontFamily,
          fontSize: 38,
          fontWeight: 600,
          lineHeight: 1.45,
          color: "#f8fafc",
          minHeight: 120,
          letterSpacing: "-0.01em",
        }}
      >
        {displayedText}
        {isTyping && (
          <span
            style={{
              display: "inline-block",
              width: 3.5,
              height: 36,
              backgroundColor: "#38bdf8",
              marginLeft: 8,
              verticalAlign: "middle",
              boxShadow: "0 0 8px #38bdf8",
            }}
          />
        )}
      </div>

      {/* Bottom small chip */}
      <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
        <div
          style={{
            backgroundColor: "rgba(56, 189, 248, 0.15)",
            color: "#38bdf8",
            fontFamily: theme.typography.mono,
            fontSize: 22,
            fontWeight: 700,
            padding: "10px 24px",
            borderRadius: theme.layout.pillRadius,
            border: "1.5px solid rgba(56, 189, 248, 0.4)",
            boxShadow: "0 0 15px rgba(56, 189, 248, 0.15)",
          }}
        >
          {chip}
        </div>
      </div>
    </div>
  );
};
