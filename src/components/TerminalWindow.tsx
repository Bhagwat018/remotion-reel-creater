import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { useTheme } from "../theme/theme";

export interface TerminalOutputLine {
  text: string;
  type?: "info" | "success" | "warning" | "error" | "dim";
  delayMs?: number;
}

export interface TerminalWindowProps {
  title?: string;
  command?: string;
  branch?: string;
  path?: string;
  output?: (string | TerminalOutputLine)[];
  delayFrames?: number;
  style?: React.CSSProperties;
}

export const TerminalWindow: React.FC<TerminalWindowProps> = ({
  title = "zsh — 80×24",
  command = "claude run --agent",
  branch = "main",
  path = "~/repo",
  output = [
    { text: "✓ Loaded agent config", type: "success" },
    { text: "➜ Scanning codebase (14 files)", type: "info" },
    { text: "⚡ Optimized 3 functions (0.8s)", type: "success" },
  ],
  delayFrames = 3,
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const theme = useTheme();

  // Entrance spring
  const entrance = spring({
    frame: Math.max(0, frame - delayFrames),
    fps,
    config: { damping: 13, stiffness: 130 },
  });

  // Typewriter effect for command:
  // Starts after 6 frames, types 1 character every 1.5 frames
  const typeStartFrame = delayFrames + 6;
  const typedLength = Math.max(
    0,
    Math.min(command.length, Math.floor((frame - typeStartFrame) / 1.5))
  );
  const currentCommandText = command.slice(0, typedLength);

  // Blinking cursor: blinks every 14 frames
  const isCursorVisible = Math.floor(frame / 14) % 2 === 0;

  // Output reveals after typing completes
  const outputStartFrame = typeStartFrame + command.length * 1.5 + 8;

  const normalizedOutput: TerminalOutputLine[] = (output || []).map((line) => {
    if (typeof line === "string") {
      let type: TerminalOutputLine["type"] = "dim";
      if (line.startsWith("✓") || line.includes("success") || line.includes("Done")) type = "success";
      else if (line.startsWith("➜") || line.includes("info")) type = "info";
      else if (line.startsWith("⚠") || line.includes("warn")) type = "warning";
      else if (line.startsWith("✖") || line.includes("error")) type = "error";
      return { text: line, type };
    }
    return line;
  });

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 960,
        backgroundColor: "#090d16",
        borderRadius: 24,
        overflow: "hidden",
        border: "1.5px solid rgba(59, 130, 246, 0.3)",
        boxShadow: "0 30px 70px -10px rgba(0, 0, 0, 0.8), 0 0 40px rgba(59, 130, 246, 0.15)",
        transform: `perspective(1000px) scale(${entrance})`,
        transformOrigin: "center center",
        ...style,
      }}
    >
      {/* Terminal Title Bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 24px",
          backgroundColor: "#0d1322",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
        }}
      >
        {/* macOS Window Controls */}
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <div style={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: "#ff5f56", boxShadow: "0 0 8px rgba(255,95,86,0.6)" }} />
          <div style={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: "#ffbd2e", boxShadow: "0 0 8px rgba(255,189,46,0.6)" }} />
          <div style={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: "#27c93f", boxShadow: "0 0 8px rgba(39,201,63,0.6)" }} />
        </div>

        {/* Title */}
        <div
          style={{
            fontFamily: theme.typography.mono,
            fontSize: 16,
            fontWeight: 600,
            color: "#94a3b8",
            letterSpacing: "0.02em",
          }}
        >
          {title}
        </div>

        <div style={{ width: 50, textAlign: "right", color: "#475569", fontSize: 13, fontFamily: theme.typography.mono }}>
          zsh
        </div>
      </div>

      {/* Terminal Body */}
      <div
        style={{
          padding: "28px 32px",
          fontFamily: theme.typography.mono,
          fontSize: 22,
          lineHeight: 1.7,
          color: "#e2e8f0",
          minHeight: 280,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {/* Command Line with Prompt */}
        <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
          {/* Arrow icon */}
          <span style={{ color: "#10b981", fontWeight: 800 }}>➜</span>
          {/* Path */}
          <span style={{ color: "#38bdf8", fontWeight: 700 }}>{path}</span>
          {/* Git branch */}
          <span style={{ color: "#94a3b8", fontSize: 18 }}>git:(<span style={{ color: "#f43f5e" }}>{branch}</span>)</span>
          {/* Command input */}
          <span style={{ color: "#f8fafc", fontWeight: 700, marginLeft: 4 }}>
            {currentCommandText}
            {/* Blinking cursor */}
            {isCursorVisible && (
              <span
                style={{
                  display: "inline-block",
                  width: 10,
                  height: 24,
                  backgroundColor: "#10b981",
                  marginLeft: 3,
                  verticalAlign: "middle",
                  boxShadow: "0 0 8px #10b981",
                }}
              />
            )}
          </span>
        </div>

        {/* Streaming Output Lines */}
        {frame >= outputStartFrame && (
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 12 }}>
            {normalizedOutput.map((item, idx) => {
              const lineAppearFrame = outputStartFrame + idx * 8;
              if (frame < lineAppearFrame) return null;

              const lineSpring = spring({
                frame: frame - lineAppearFrame,
                fps,
                config: { damping: 14, stiffness: 180 },
              });

              const colorMap = {
                success: "#34d399",
                info: "#38bdf8",
                warning: "#fbbf24",
                error: "#f87171",
                dim: "#94a3b8",
              };

              return (
                <div
                  key={idx}
                  style={{
                    color: colorMap[item.type || "dim"],
                    opacity: lineSpring,
                    transform: `translateX(${interpolate(lineSpring, [0, 1], [-12, 0])}px)`,
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <span style={{ fontWeight: 600 }}>{item.text}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
