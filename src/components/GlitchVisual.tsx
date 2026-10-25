import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../styles/theme";

export const GlitchVisual: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 120 },
  });

  // Glitch jitter calculated procedurally
  const isGlitchFrame = frame % 7 === 0 || frame % 11 === 0 || frame % 13 === 0;
  const glitchOffsetX = isGlitchFrame ? (frame % 2 === 0 ? 12 : -12) : 0;
  const glitchOffsetY = isGlitchFrame ? (frame % 3 === 0 ? -6 : 6) : 0;

  // Scanline sweep
  const scanlineY = (frame * 8) % 480;

  return (
    <div
      style={{
        width: 860,
        height: 520,
        borderRadius: 24,
        background: "rgba(18, 24, 38, 0.8)",
        border: `1.5px solid ${theme.colors.cardBorder}`,
        backdropFilter: "blur(16px)",
        boxShadow: `0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(0, 229, 160, 0.25)`,
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: entrance,
        transform: `scale(${entrance})`,
      }}
    >
      {/* Moving Scanline */}
      <div
        style={{
          position: "absolute",
          top: scanlineY,
          left: 0,
          right: 0,
          height: 3,
          background: `linear-gradient(90deg, transparent, ${theme.colors.accent}, transparent)`,
          boxShadow: `0 0 12px ${theme.colors.accent}`,
          opacity: 0.8,
          pointerEvents: "none",
        }}
      />

      {/* Digital Grid Lines inside HUD */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px)",
          backgroundSize: "100% 8px",
          pointerEvents: "none",
        }}
      />

      {/* Glitch Brain / AI Core Icon */}
      <div style={{ position: "relative", width: 200, height: 160, marginBottom: 20 }}>
        {/* Cyan Channel Offset */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            transform: `translate(${glitchOffsetX * 1.5}px, ${glitchOffsetY}px)`,
            opacity: 0.7,
            filter: "drop-shadow(0 0 16px #00D2FF)",
          }}
        >
          <svg
            width="200"
            height="160"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#00D2FF"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2a9 9 0 0 1 9 9c0 3.1-1.6 5.8-4 7.4V20a2 2 0 0 1-2 2h-6a2 2 0 0 1-2-2v-1.6C4.6 16.8 3 14.1 3 11a9 9 0 0 1 9-9Z" />
            <path d="M9 10h.01" />
            <path d="M15 10h.01" />
            <path d="M10 14h4" />
          </svg>
        </div>

        {/* Red/Magenta Channel Offset */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            transform: `translate(${-glitchOffsetX}px, ${-glitchOffsetY}px)`,
            opacity: 0.7,
            filter: "drop-shadow(0 0 16px #FF3366)",
          }}
        >
          <svg
            width="200"
            height="160"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FF3366"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2a9 9 0 0 1 9 9c0 3.1-1.6 5.8-4 7.4V20a2 2 0 0 1-2 2h-6a2 2 0 0 1-2-2v-1.6C4.6 16.8 3 14.1 3 11a9 9 0 0 1 9-9Z" />
            <path d="M9 10h.01" />
            <path d="M15 10h.01" />
            <path d="M10 14h4" />
          </svg>
        </div>

        {/* Main Accent Center */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            transform: `translate(${glitchOffsetX * 0.5}px, 0px)`,
            filter: `drop-shadow(0 0 20px ${theme.colors.accent})`,
          }}
        >
          <svg
            width="200"
            height="160"
            viewBox="0 0 24 24"
            fill="none"
            stroke={theme.colors.accent}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2a9 9 0 0 1 9 9c0 3.1-1.6 5.8-4 7.4V20a2 2 0 0 1-2 2h-6a2 2 0 0 1-2-2v-1.6C4.6 16.8 3 14.1 3 11a9 9 0 0 1 9-9Z" />
            <path d="M9 10h.01" />
            <path d="M15 10h.01" />
            <path d="M10 14h4" />
          </svg>
        </div>
      </div>

      {/* Distorted HUD Label */}
      <div
        style={{
          fontFamily: "monospace",
          fontSize: 26,
          fontWeight: 900,
          color: theme.colors.accent,
          letterSpacing: "0.2em",
          transform: `translateX(${glitchOffsetX}px)`,
          textShadow: `0 0 16px ${theme.colors.accent}`,
        }}
      >
        // FACTUAL_ANCHOR_LOST
      </div>

      <div
        style={{
          fontFamily: theme.fontFamily,
          fontSize: 16,
          color: theme.colors.mutedText,
          marginTop: 10,
          letterSpacing: "0.08em",
        }}
      >
        PROBABILISTIC CONFABULATION IN PROGRESS
      </div>
    </div>
  );
};
