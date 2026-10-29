import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { useTheme } from "../theme/theme";
import { entranceSpring } from "../lib/motion";

export interface CodeSynthesizerProps {
  filename?: string;
  lines: string[];
  highlightLines?: number[];
  delayFrames?: number;
  charsPerFrame?: number;
  outputStatus?: string;
  latency?: string;
}

// Regex syntax tokenizer for tech code reels
const renderTokenizedCode = (text: string) => {
  const parts = text.split(/(\s+|[().,;{}[\]:=+\-*/&|!<>?"'`])/g);
  return parts.map((part, i) => {
    if (!part) return null;
    // Keywords
    if (/^(const|let|var|await|async|function|return|if|else|import|export|from|class|new|try|catch)$/.test(part)) {
      return <span key={i} style={{ color: "#c084fc", fontWeight: 700 }}>{part}</span>;
    }
    // Strings
    if (/^("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`[^`]*`)$/.test(part)) {
      return <span key={i} style={{ color: "#4ade80" }}>{part}</span>;
    }
    // Objects / Types
    if (/^(redis|client|app|req|res|Promise|JSON|db|cache|server|http)$/i.test(part)) {
      return <span key={i} style={{ color: "#fbbf24", fontWeight: 700 }}>{part}</span>;
    }
    // Methods
    if (/^(get|set|listen|post|use|connect|send|json|find|create|delete)$/i.test(part)) {
      return <span key={i} style={{ color: "#38bdf8", fontWeight: 600 }}>{part}</span>;
    }
    // Numbers
    if (/^\d+$/.test(part)) {
      return <span key={i} style={{ color: "#fb923c" }}>{part}</span>;
    }
    // Operators
    if (/^[=<>!+*&|?:-]+$/.test(part)) {
      return <span key={i} style={{ color: "#f472b6" }}>{part}</span>;
    }
    return <span key={i} style={{ color: "#e2e8f0" }}>{part}</span>;
  });
};

export const CodeSynthesizer: React.FC<CodeSynthesizerProps> = ({
  filename = "architecture.ts",
  lines = ["const cache = new Redis();", "await cache.set('user:key', token);", "return cache.get('user:key');"],
  highlightLines = [],
  delayFrames = 4,
  charsPerFrame = 1.4,
  outputStatus = "200 OK",
  latency = "0.4ms",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const theme = useTheme();

  // Entrance spring for the editor window
  const springVal = entranceSpring(frame, fps, delayFrames);
  const scale = interpolate(springVal, [0, 1], [0.93, 1]);
  const opacity = interpolate(springVal, [0, 1], [0, 1]);

  // Total characters across all lines
  const totalChars = lines.join("\n").length;
  const activeFrame = Math.max(0, frame - (delayFrames + 4));
  const charactersTyped = Math.min(totalChars, Math.floor(activeFrame * charsPerFrame));
  const typingFinished = charactersTyped >= totalChars;

  // Blinking cursor state (toggles every 12 frames)
  const showCursor = Math.floor(frame / 12) % 2 === 0;

  // Compute how much text each line gets
  let charCounter = 0;
  const computedLines = lines.map((fullLine) => {
    const lineStart = charCounter;
    const lineEnd = lineStart + fullLine.length;
    charCounter = lineEnd + 1; // +1 for the newline

    if (charactersTyped < lineStart) {
      return { text: "", isTyping: false, isComplete: false };
    }
    if (charactersTyped >= lineEnd) {
      return { text: fullLine, isTyping: false, isComplete: true };
    }
    const currentLength = charactersTyped - lineStart;
    return {
      text: fullLine.slice(0, currentLength),
      isTyping: true,
      isComplete: false,
    };
  });

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 920,
        backgroundColor: "#0d1117",
        borderRadius: 24,
        overflow: "hidden",
        boxShadow: "8px 8px 0px #000000",
        border: "3.5px solid #000000",
        opacity,
        transform: `scale(${scale})`,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Editor Window Title Bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 24px",
          backgroundColor: "#161b22",
          borderBottom: "3px solid #000000",
        }}
      >
        <div style={{ display: "flex", gap: 9, alignItems: "center" }}>
          <div style={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: "#ff5f56", border: "1.5px solid #000000" }} />
          <div style={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: "#ffbd2e", border: "1.5px solid #000000" }} />
          <div style={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: "#27c93f", border: "1.5px solid #000000" }} />
        </div>

        {/* Tab with active file */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            backgroundColor: "#0d1117",
            padding: "6px 16px",
            borderRadius: "10px 10px 0 0",
            border: "2px solid #30363d",
            borderBottom: "none",
          }}
        >
          <span style={{ color: "#38bdf8", fontSize: 16 }}>⚡</span>
          <span
            style={{
              fontFamily: theme.typography.mono,
              fontSize: 18,
              fontWeight: 600,
              color: "#e6edf3",
            }}
          >
            {filename}
          </span>
          <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#38bdf8" }} />
        </div>

        <div
          style={{
            backgroundColor: "#21262d",
            padding: "4px 10px",
            borderRadius: 6,
            border: "1px solid #30363d",
            color: "#94a3b8",
            fontSize: 13,
            fontWeight: 700,
            fontFamily: theme.typography.mono,
          }}
        >
          {filename.endsWith(".ts") ? "TS" : filename.endsWith(".py") ? "PY" : "JS"}
        </div>
      </div>

      {/* Code Body with real-time typewriter reveal */}
      <div
        style={{
          padding: "26px 24px",
          display: "flex",
          flexDirection: "column",
          gap: 14,
          fontFamily: theme.typography.mono,
          fontSize: 27,
          lineHeight: 1.6,
          minHeight: 220,
        }}
      >
        {computedLines.map((lineData, idx) => {
          const lineNumber = idx + 1;
          const isHighlighted = highlightLines.includes(lineNumber) || lineData.isTyping;

          return (
            <div
              key={idx}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
                padding: "6px 14px",
                borderRadius: 8,
                backgroundColor: isHighlighted ? "rgba(56, 189, 248, 0.08)" : "transparent",
                borderLeft: isHighlighted ? "4px solid #38bdf8" : "4px solid transparent",
              }}
            >
              <span
                style={{
                  width: 32,
                  textAlign: "right",
                  color: isHighlighted ? "#38bdf8" : "#475569",
                  fontSize: 22,
                  fontWeight: 700,
                  userSelect: "none",
                }}
              >
                {lineNumber}
              </span>

              <div style={{ display: "flex", alignItems: "center", whiteSpace: "pre-wrap" }}>
                {renderTokenizedCode(lineData.text)}
                {/* Blinking Block Cursor on active typing line */}
                {lineData.isTyping && showCursor && (
                  <span
                    style={{
                      display: "inline-block",
                      width: 12,
                      height: 26,
                      backgroundColor: "#38bdf8",
                      marginLeft: 3,
                      verticalAlign: "middle",
                    }}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Live Execution Terminal Status Bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 22px",
          backgroundColor: "#161b22",
          borderTop: "3px solid #000000",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: typingFinished ? "#22c55e" : "#eab308",
              boxShadow: typingFinished ? "0 0 8px #22c55e" : "0 0 8px #eab308",
            }}
          />
          <span
            style={{
              fontFamily: theme.typography.mono,
              fontSize: 16,
              fontWeight: 700,
              color: "#cbd5e1",
            }}
          >
            {typingFinished ? `● EXECUTION SUCCESS` : `● RUNNING PIPELINE...`}
          </span>
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <div
            style={{
              backgroundColor: typingFinished ? "#15803d" : "#854d0e",
              border: "1.5px solid #000000",
              borderRadius: 6,
              padding: "4px 10px",
              color: "#ffffff",
              fontSize: 13,
              fontWeight: 800,
              fontFamily: theme.typography.mono,
            }}
          >
            {outputStatus}
          </div>
          <div
            style={{
              backgroundColor: "#1e293b",
              border: "1.5px solid #000000",
              borderRadius: 6,
              padding: "4px 10px",
              color: "#38bdf8",
              fontSize: 13,
              fontWeight: 800,
              fontFamily: theme.typography.mono,
            }}
          >
            ⚡ {latency}
          </div>
        </div>
      </div>
    </div>
  );
};
