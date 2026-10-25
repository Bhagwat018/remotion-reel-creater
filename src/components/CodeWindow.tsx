import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { useTheme } from "../theme/theme";
import { entranceSpring } from "../lib/motion";

interface CodeWindowProps {
  filename: string;
  lines: string[];
  highlightLines?: number[];
  delayFrames?: number;
}

export const CodeWindow: React.FC<CodeWindowProps> = ({
  filename,
  lines,
  highlightLines = [],
  delayFrames = 4,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const theme = useTheme();

  const springVal = entranceSpring(frame, fps, delayFrames);
  const scale = interpolate(springVal, [0, 1], [0.92, 1]);
  const opacity = interpolate(springVal, [0, 1], [0, 1]);

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 880,
        backgroundColor: theme.colors.card,
        borderRadius: theme.layout.cardRadius,
        overflow: "hidden",
        boxShadow: "0 24px 50px rgba(0, 0, 0, 0.4)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      {/* Window title bar with dots and filename */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "18px 24px",
          backgroundColor: "#161616",
          borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
        }}
      >
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <div style={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: "#FF5F56" }} />
          <div style={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: "#FFBD2E" }} />
          <div style={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: "#27C93F" }} />
        </div>
        <div
          style={{
            fontFamily: theme.typography.mono,
            fontSize: 20,
            color: theme.colors.muted,
          }}
        >
          {filename}
        </div>
        <div style={{ width: 50 }} />
      </div>

      {/* Code body with line-by-line reveal */}
      <div
        style={{
          padding: "28px 24px",
          display: "flex",
          flexDirection: "column",
          gap: 12,
          fontFamily: theme.typography.mono,
          fontSize: 26,
          lineHeight: 1.5,
        }}
      >
        {lines.map((line, idx) => {
          const lineNumber = idx + 1;
          const isHighlighted = highlightLines.includes(lineNumber);
          const lineDelay = delayFrames + 4 + idx * 4;
          const lineReveal = interpolate(frame, [lineDelay, lineDelay + 8], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          return (
            <div
              key={idx}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
                padding: "4px 12px",
                borderRadius: 8,
                backgroundColor: isHighlighted ? `${theme.colors.accent}22` : "transparent",
                borderLeft: isHighlighted ? `4px solid ${theme.colors.accent}` : "4px solid transparent",
                opacity: lineReveal,
                transform: `translateX(${(1 - lineReveal) * 12}px)`,
              }}
            >
              <span
                style={{
                  width: 32,
                  textAlign: "right",
                  color: isHighlighted ? theme.colors.accent : theme.colors.muted,
                  fontSize: 22,
                  userSelect: "none",
                }}
              >
                {lineNumber}
              </span>
              <span
                style={{
                  color: isHighlighted ? theme.colors.accentText : theme.colors.cardText,
                  fontWeight: isHighlighted ? 600 : 400,
                  whiteSpace: "pre-wrap",
                }}
              >
                {line}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
