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

// Simple regex-based syntax highlighter for tech reels
const highlightSyntax = (line: string) => {
  const tokens = line.split(/(\s+|[().,;{}[\]]|"[^"]*"|'[^']*')/g);
  return tokens.map((token, i) => {
    if (!token) return null;
    if (/^(const|let|var|await|async|if|return|function|import|export|from|else)$/.test(token)) {
      return <span key={i} style={{ color: "#c084fc", fontWeight: 700 }}>{token}</span>;
    }
    if (/^("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')$/.test(token)) {
      return <span key={i} style={{ color: "#4ade80" }}>{token}</span>;
    }
    if (/^(redis|db|JSON|console|Math|Promise)$/.test(token)) {
      return <span key={i} style={{ color: "#fbbf24", fontWeight: 600 }}>{token}</span>;
    }
    if (/^(get|set|query|parse|stringify|log|then|catch)$/.test(token)) {
      return <span key={i} style={{ color: "#38bdf8" }}>{token}</span>;
    }
    if (/^\d+$/.test(token)) {
      return <span key={i} style={{ color: "#fb923c" }}>{token}</span>;
    }
    if (/^[=<>!+*&|?-]+$/.test(token)) {
      return <span key={i} style={{ color: "#f472b6" }}>{token}</span>;
    }
    return <span key={i} style={{ color: "#f8fafc" }}>{token}</span>;
  });
};

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
        maxWidth: 920,
        backgroundColor: "#0d1117",
        borderRadius: 22,
        overflow: "hidden",
        boxShadow: "7px 7px 0px #000000",
        border: "3.5px solid #000000",
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
          backgroundColor: "#161b22",
          borderBottom: "3px solid #000000",
        }}
      >
        <div style={{ display: "flex", gap: 9, alignItems: "center" }}>
          <div style={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: "#ff5f56", border: "1.5px solid #000000" }} />
          <div style={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: "#ffbd2e", border: "1.5px solid #000000" }} />
          <div style={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: "#27c93f", border: "1.5px solid #000000" }} />
        </div>
        <div
          style={{
            fontFamily: theme.typography.mono,
            fontSize: 22,
            fontWeight: 600,
            color: "#e6edf3",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span style={{ color: "#38bdf8" }}>⚡</span>
          <span>{filename}</span>
        </div>
        <div style={{ width: 50, textAlign: "right", color: "#64748b", fontSize: 14, fontFamily: theme.typography.mono }}>
          TS
        </div>
      </div>

      {/* Code body with line-by-line reveal */}
      <div
        style={{
          padding: "32px 28px",
          display: "flex",
          flexDirection: "column",
          gap: 16,
          fontFamily: theme.typography.mono,
          fontSize: 30,
          lineHeight: 1.6,
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
                gap: 24,
                padding: "8px 16px",
                borderRadius: 10,
                backgroundColor: isHighlighted ? "rgba(56, 189, 248, 0.12)" : "transparent",
                borderLeft: isHighlighted ? "4px solid #38bdf8" : "4px solid transparent",
                boxShadow: isHighlighted ? "inset 0 0 20px rgba(56, 189, 248, 0.08)" : "none",
                opacity: lineReveal,
                transform: `translateX(${(1 - lineReveal) * 12}px)`,
              }}
            >
              <span
                style={{
                  width: 36,
                  textAlign: "right",
                  color: isHighlighted ? "#38bdf8" : "#475569",
                  fontSize: 24,
                  fontWeight: 700,
                  userSelect: "none",
                }}
              >
                {lineNumber}
              </span>
              <span
                style={{
                  whiteSpace: "pre-wrap",
                  lineHeight: 1.5,
                }}
              >
                {highlightSyntax(line)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
