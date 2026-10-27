import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

interface NeoLockedCardProps {
  title: string;
  subtitle?: string;
  codeSnippet?: string;
  delayFrames?: number;
}

export const NeoLockedCard: React.FC<NeoLockedCardProps> = ({
  title,
  subtitle = "CLASSIFIED ARCHITECTURE // DO NOT LEAK",
  codeSnippet = "SYSTEM_PROMPT = `You are an elite autonomous agent...`",
  delayFrames = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - delayFrames,
    fps,
    config: { damping: 14, stiffness: 140 },
  });

  const padlockShake = Math.sin(frame / 4) * 3;

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        border: "3.5px solid #000000",
        borderRadius: 24,
        padding: "36px 30px",
        boxShadow: "7px 7px 0px #000000",
        width: "100%",
        maxWidth: 880,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: 16,
        transform: `scale(${entrance}) rotate(-1.5deg)`,
        opacity: entrance,
        position: "relative",
      }}
    >
      {/* Top Red Badge */}
      <div
        style={{
          position: "absolute",
          top: -18,
          backgroundColor: "#ef4444",
          color: "#ffffff",
          border: "2.5px solid #000000",
          borderRadius: 8,
          padding: "4px 18px",
          fontSize: 20,
          fontWeight: 900,
          letterSpacing: "0.08em",
          boxShadow: "3px 3px 0px #000000",
        }}
      >
        🔒 TOP SECRET
      </div>

      {/* Big Padlock Icon */}
      <div
        style={{
          fontSize: 64,
          transform: `rotate(${padlockShake}deg)`,
          filter: "drop-shadow(3px 3px 0px #000000)",
        }}
      >
        🔒
      </div>

      <h3
        style={{
          margin: 0,
          fontFamily: "'Inter', sans-serif",
          fontSize: 36,
          fontWeight: 900,
          color: "#000000",
          letterSpacing: "-0.01em",
        }}
      >
        {title}
      </h3>

      <div
        style={{
          fontSize: 22,
          fontWeight: 700,
          color: "#dc2626",
          fontFamily: "'JetBrains Mono', monospace",
        }}
      >
        {subtitle}
      </div>

      {/* Blurred Code Box */}
      <div
        style={{
          width: "100%",
          backgroundColor: "#f8fafc",
          border: "2px solid #000000",
          borderRadius: 14,
          padding: "16px 20px",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 20,
          color: "#334155",
          filter: "blur(2.5px)",
          userSelect: "none",
          marginTop: 6,
        }}
      >
        {codeSnippet}
      </div>
    </div>
  );
};
