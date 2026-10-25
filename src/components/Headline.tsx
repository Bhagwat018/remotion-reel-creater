import React, { useMemo } from "react";
import { useCurrentFrame } from "remotion";
import { hasDevanagari, resolveFontFamily, useTheme } from "../theme/theme";
import { useBlurIn } from "../lib/motion";

interface HeadlineProps {
  text: string;
  delayFrames?: number;
  maxWidth?: number;
}

export const Headline: React.FC<HeadlineProps> = ({
  text,
  delayFrames = 2,
  maxWidth = 920,
}) => {
  const frame = useCurrentFrame();
  const theme = useTheme();

  const motionStyle = useBlurIn(frame, delayFrames);
  const fontFamily = resolveFontFamily(text, theme.typography.headline);
  const isDevanagariText = hasDevanagari(text);

  // Auto-fit font size based on text length to prevent safe-zone overflow
  const fontSize = useMemo(() => {
    const len = text.replace(/\*/g, "").trim().length;
    if (len <= 18) return 96;
    if (len <= 28) return 82;
    if (len <= 42) return 68;
    if (len <= 65) return 54;
    return 44;
  }, [text]);

  // Parse *word* markdown for accent color highlights
  const parts = useMemo(() => {
    const tokens: Array<{ text: string; isAccent: boolean }> = [];
    const regex = /\*([^*]+)\*/g;
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        tokens.push({
          text: text.slice(lastIndex, match.index),
          isAccent: false,
        });
      }
      tokens.push({
        text: match[1],
        isAccent: true,
      });
      lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
      tokens.push({
        text: text.slice(lastIndex),
        isAccent: false,
      });
    }

    return tokens;
  }, [text]);

  return (
    <div
      style={{
        ...motionStyle,
        width: "100%",
        maxWidth,
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          fontFamily,
          fontSize,
          lineHeight: 1.05,
          fontWeight: isDevanagariText ? 700 : 900,
          textTransform: isDevanagariText ? "none" : "uppercase",
          letterSpacing: isDevanagariText ? "normal" : "0.01em",
          color: theme.colors.ink,
          margin: 0,
          padding: 0,
          wordBreak: "break-word",
        }}
      >
        {parts.map((part, i) => (
          <span
            key={i}
            style={{
              color: part.isAccent ? theme.colors.accent : theme.colors.ink,
            }}
          >
            {part.text}
          </span>
        ))}
      </h1>
    </div>
  );
};
