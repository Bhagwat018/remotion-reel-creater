import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { resolveFontFamily, useTheme } from "../theme/theme";
import { entranceSpring } from "../lib/motion";
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
        backgroundColor: "#ffffff",
        border: "3.5px solid #000000",
        borderRadius: 24,
        padding: "36px 40px",
        boxShadow: "7px 7px 0px #000000",
        opacity,
        transform: `scale(${scale}) rotate(-0.5deg)`,
        display: "flex",
        flexDirection: "column",
        gap: 22,
        overflow: "hidden",
      }}
    >
      {/* Header icon / badge */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {brandMatch ? (
            <TechLogo name={brandMatch.key} size={34} />
          ) : (
            <div
              style={{
                width: 16,
                height: 16,
                borderRadius: "50%",
                backgroundColor: "#fb923c",
                border: "2px solid #000000",
              }}
            />
          )}
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 22,
              color: "#000000",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
              fontWeight: 800,
            }}
          >
            {brandMatch ? brandMatch.meta.label : "ARCHITECTURE TAKEAWAY"}
          </span>
        </div>

        <div
          style={{
            backgroundColor: "#4ade80",
            color: "#000000",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 16,
            fontWeight: 800,
            padding: "4px 14px",
            borderRadius: 999,
            border: "2px solid #000000",
            boxShadow: "2px 2px 0px #000000",
          }}
        >
          VERIFIED
        </div>
      </div>

      {/* Main typing text */}
      <div
        style={{
          fontFamily,
          fontSize: 36,
          fontWeight: 700,
          lineHeight: 1.45,
          color: "#000000",
          minHeight: 110,
          letterSpacing: "-0.01em",
        }}
      >
        {displayedText}
        {isTyping && (
          <span
            style={{
              display: "inline-block",
              width: 4,
              height: 34,
              backgroundColor: "#7c3aed",
              marginLeft: 8,
              verticalAlign: "middle",
            }}
          />
        )}
      </div>

      {/* Bottom small chip */}
      <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
        <div
          style={{
            backgroundColor: "#fb923c",
            color: "#000000",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 22,
            fontWeight: 800,
            padding: "8px 24px",
            borderRadius: 999,
            border: "2.5px solid #000000",
            boxShadow: "3px 3px 0px #000000",
          }}
        >
          {chip}
        </div>
      </div>
    </div>
  );
};
