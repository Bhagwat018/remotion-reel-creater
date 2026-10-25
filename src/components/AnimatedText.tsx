import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../styles/theme";

interface AnimatedTextProps {
  text: string;
}

const HIGHLIGHT_KEYWORDS = [
  "LIED",
  "HALLUCINATION",
  "PREDICTS",
  "WORDS",
  "NOT",
  "FAKE",
  "CODE",
  "VERIFY",
  "ALWAYS",
  "SOURCES",
  "BLINDLY",
  "SOUNDS",
  "RIGHT",
];

export const AnimatedText: React.FC<AnimatedTextProps> = ({ text }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const words = text.split(" ");

  return (
    <div
      style={{
        position: "absolute",
        top: 210,
        left: 0,
        right: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 60px",
        zIndex: 20,
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "12px 18px",
          maxWidth: 960,
          textAlign: "center",
        }}
      >
        {words.map((word, index) => {
          const cleanWord = word.replace(/[^a-zA-Z]/g, "").toUpperCase();
          const isHighlighted = HIGHLIGHT_KEYWORDS.includes(cleanWord);

          // Staggered spring animation for each word
          const progress = spring({
            frame,
            fps,
            delay: index * 2.5,
            config: {
              damping: 12,
              stiffness: 110,
              mass: 0.8,
            },
          });

          const translateY = (1 - progress) * 50;
          const scale = 0.8 + progress * 0.2;
          const opacity = progress;

          return (
            <span
              key={`${word}-${index}`}
              style={{
                fontFamily: theme.fontFamily,
                fontSize: 66,
                fontWeight: 900,
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                textTransform: "uppercase",
                opacity,
                transform: `translateY(${translateY}px) scale(${scale})`,
                color: isHighlighted ? theme.colors.accent : theme.colors.text,
                textShadow: isHighlighted
                  ? `0 0 24px ${theme.colors.accentGlow}, 0 4px 12px rgba(0,0,0,0.6)`
                  : "0 4px 16px rgba(0, 0, 0, 0.7)",
                display: "inline-block",
                padding: isHighlighted ? "2px 8px" : "0",
                background: isHighlighted
                  ? "rgba(0, 229, 160, 0.1)"
                  : "transparent",
                borderRadius: 8,
                border: isHighlighted
                  ? `1px solid rgba(0, 229, 160, 0.3)`
                  : "none",
              }}
            >
              {word}
            </span>
          );
        })}
      </div>
    </div>
  );
};
