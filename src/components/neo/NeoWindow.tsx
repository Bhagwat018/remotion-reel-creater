import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

interface NeoWindowProps {
  title: string;
  lines?: string[];
  command?: string;
  highlightLine?: number;
  width?: number;
  delayFrames?: number;
  children?: React.ReactNode;
}

export const NeoWindow: React.FC<NeoWindowProps> = ({
  title,
  lines,
  command,
  highlightLine,
  width = 880,
  delayFrames = 2,
  children,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - delayFrames,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  return (
    <div
      style={{
        width,
        backgroundColor: "#ffffff",
        border: "3px solid #000000",
        borderRadius: 18,
        boxShadow: "6px 6px 0px #000000",
        overflow: "hidden",
        transform: `scale(${entrance}) translateY(${(1 - entrance) * 20}px)`,
        opacity: entrance,
        margin: "12px 0",
      }}
    >
      {/* Mac Window Header */}
      <div
        style={{
          height: 48,
          backgroundColor: "#e2e8f0",
          borderBottom: "3px solid #000000",
          display: "flex",
          alignItems: "center",
          padding: "0 18px",
          position: "relative",
        }}
      >
        {/* 3 Window Dots */}
        <div style={{ display: "flex", gap: 9 }}>
          <div style={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: "#ef4444", border: "1.5px solid #000000" }} />
          <div style={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: "#eab308", border: "1.5px solid #000000" }} />
          <div style={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: "#22c55e", border: "1.5px solid #000000" }} />
        </div>

        {/* Window Title */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            textAlign: "center",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 22,
            fontWeight: 700,
            color: "#0f172a",
          }}
        >
          {title}
        </div>
      </div>

      {/* Window Body */}
      <div
        style={{
          padding: "24px 28px",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 25,
          lineHeight: 1.5,
          color: "#000000",
        }}
      >
        {command && (
          <div style={{ display: "flex", alignItems: "center", gap: 10, fontWeight: 700 }}>
            <span style={{ color: "#3b82f6" }}>&gt;</span>
            <span>{command}</span>
            <span
              style={{
                display: "inline-block",
                width: 10,
                height: 24,
                backgroundColor: "#6366f1",
                opacity: Math.sin(frame / 6) > 0 ? 1 : 0,
              }}
            />
          </div>
        )}

        {lines &&
          lines.map((line, idx) => {
            const isHighlighted = highlightLine === idx;
            return (
              <div
                key={idx}
                style={{
                  backgroundColor: isHighlighted ? "#fed7aa" : "transparent",
                  border: isHighlighted ? "2px solid #ea580c" : "2px solid transparent",
                  borderRadius: isHighlighted ? 6 : 0,
                  padding: "4px 8px",
                  margin: "2px 0",
                  fontWeight: isHighlighted ? 800 : 500,
                  whiteSpace: "pre-wrap",
                }}
              >
                {line}
              </div>
            );
          })}

        {children}
      </div>
    </div>
  );
};
