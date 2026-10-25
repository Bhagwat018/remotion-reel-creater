import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../styles/theme";

export const WarningVisual: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 120 },
  });

  const pulse = Math.sin(frame * 0.15) * 0.2 + 0.8;
  const radarWave = (frame * 3) % 150;
  const radarOpacity = interpolate(radarWave, [0, 150], [0.8, 0]);

  return (
    <div
      style={{
        width: 860,
        height: 520,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        opacity: entrance,
        transform: `scale(${entrance})`,
      }}
    >
      {/* Expanding Radar Wave */}
      <div
        style={{
          position: "absolute",
          width: 220 + radarWave * 2,
          height: 220 + radarWave * 2,
          borderRadius: "50%",
          border: `2px solid ${theme.colors.accent}`,
          opacity: radarOpacity,
          pointerEvents: "none",
        }}
      />

      {/* Center Alert Shield / Triangle */}
      <div
        style={{
          position: "relative",
          width: 220,
          height: 220,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 30,
        }}
      >
        <svg
          width="200"
          height="180"
          viewBox="0 0 24 24"
          fill="none"
          stroke={theme.colors.accent}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            filter: `drop-shadow(0 0 24px ${theme.colors.accentGlow})`,
            transform: `scale(${pulse})`,
          }}
        >
          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
          <line
            x1="12"
            y1="9"
            x2="12"
            y2="13"
            stroke={theme.colors.text}
            strokeWidth="2.5"
          />
          <circle
            cx="12"
            cy="17"
            r="1"
            fill={theme.colors.text}
            stroke="none"
          />
        </svg>
      </div>

      {/* Cyber Warning Badge */}
      <div
        style={{
          padding: "16px 36px",
          borderRadius: 16,
          background: "rgba(18, 24, 38, 0.9)",
          border: `1.5px solid ${theme.colors.cardBorder}`,
          backdropFilter: "blur(16px)",
          boxShadow: `0 12px 30px rgba(0, 0, 0, 0.5), 0 0 20px ${theme.colors.accentGlow}`,
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: "50%",
            backgroundColor: theme.colors.accent,
            boxShadow: `0 0 12px ${theme.colors.accent}`,
          }}
        />
        <span
          style={{
            fontFamily: theme.fontFamily,
            fontSize: 22,
            fontWeight: 800,
            color: theme.colors.text,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          CRITICAL FABRICATION DETECTED
        </span>
      </div>

      {/* Secondary Data Stream Tag */}
      <div
        style={{
          marginTop: 16,
          fontFamily: "monospace",
          fontSize: 16,
          color: theme.colors.mutedText,
          letterSpacing: "0.1em",
        }}
      >
        [CONFIDENCE: 99.8%] • [ACCURACY: 0.0%]
      </div>
    </div>
  );
};
