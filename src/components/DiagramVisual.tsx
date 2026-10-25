import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../styles/theme";

export const DiagramVisual: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 110 },
  });

  const dashOffset = (frame * 2) % 40;

  // Confidence meter vs Truth meter
  const fluencyValue = Math.min(
    99,
    Math.round(
      interpolate(frame, [10, 60], [40, 99], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    )
  );

  const truthValue = Math.max(
    8,
    Math.round(
      interpolate(frame, [30, 80], [85, 12], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    )
  );

  return (
    <div
      style={{
        width: 860,
        borderRadius: 24,
        background: "rgba(18, 24, 38, 0.9)",
        border: `1.5px solid ${theme.colors.cardBorder}`,
        backdropFilter: "blur(16px)",
        padding: "36px 40px",
        boxShadow: `0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px ${theme.colors.accentGlow}`,
        opacity: entrance,
        transform: `scale(${entrance})`,
        display: "flex",
        flexDirection: "column",
        gap: 28,
      }}
    >
      {/* Title */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontFamily: theme.fontFamily,
            fontSize: 22,
            fontWeight: 800,
            color: theme.colors.text,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Model Architecture Gap
        </span>
        <span
          style={{
            fontFamily: "monospace",
            fontSize: 16,
            color: theme.colors.danger,
            fontWeight: 700,
            background: "rgba(255, 51, 102, 0.15)",
            padding: "4px 12px",
            borderRadius: 6,
            border: `1px solid ${theme.colors.danger}`,
          }}
        >
          DISCONNECTED
        </span>
      </div>

      {/* Metric 1: Fluency / Sounds Right */}
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 8,
          }}
        >
          <span
            style={{
              fontFamily: theme.fontFamily,
              fontSize: 20,
              fontWeight: 700,
              color: theme.colors.accent,
            }}
          >
            Linguistic Fluency ("Sounds Right")
          </span>
          <span
            style={{
              fontFamily: "monospace",
              fontSize: 22,
              fontWeight: 800,
              color: theme.colors.accent,
            }}
          >
            {fluencyValue}%
          </span>
        </div>
        <div
          style={{
            height: 16,
            width: "100%",
            borderRadius: 8,
            backgroundColor: "rgba(255, 255, 255, 0.08)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${fluencyValue}%`,
              background: `linear-gradient(90deg, ${theme.colors.accent}, #00FFB3)`,
              boxShadow: `0 0 16px ${theme.colors.accent}`,
            }}
          />
        </div>
      </div>

      {/* SVG Divergence Chart */}
      <div
        style={{
          height: 120,
          width: "100%",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="100%" height="100%" viewBox="0 0 760 100">
          <defs>
            <linearGradient id="fluencyGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={theme.colors.accent} />
              <stop offset="100%" stopColor="#00FFB3" />
            </linearGradient>
            <linearGradient id="truthGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#64748B" />
              <stop offset="100%" stopColor={theme.colors.danger} />
            </linearGradient>
          </defs>

          {/* Diverging Paths */}
          <path
            d="M 20 50 C 250 50, 450 15, 740 15"
            fill="none"
            stroke="url(#fluencyGrad)"
            strokeWidth="4"
            strokeDasharray="8 6"
            strokeDashoffset={-dashOffset}
          />
          <path
            d="M 20 50 C 250 50, 450 85, 740 85"
            fill="none"
            stroke="url(#truthGrad)"
            strokeWidth="4"
            strokeDasharray="8 6"
            strokeDashoffset={dashOffset}
          />

          <circle cx="20" cy="50" r="8" fill={theme.colors.text} />
          <circle cx="740" cy="15" r="8" fill={theme.colors.accent} />
          <circle cx="740" cy="85" r="8" fill={theme.colors.danger} />
        </svg>
      </div>

      {/* Metric 2: Factual Accuracy / Is Right */}
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 8,
          }}
        >
          <span
            style={{
              fontFamily: theme.fontFamily,
              fontSize: 20,
              fontWeight: 700,
              color: theme.colors.danger,
            }}
          >
            Factual Grounding ("Is Right")
          </span>
          <span
            style={{
              fontFamily: "monospace",
              fontSize: 22,
              fontWeight: 800,
              color: theme.colors.danger,
            }}
          >
            {truthValue}%
          </span>
        </div>
        <div
          style={{
            height: 16,
            width: "100%",
            borderRadius: 8,
            backgroundColor: "rgba(255, 255, 255, 0.08)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${truthValue}%`,
              background: `linear-gradient(90deg, #FF6B8B, ${theme.colors.danger})`,
              boxShadow: `0 0 16px ${theme.colors.dangerGlow}`,
            }}
          />
        </div>
      </div>
    </div>
  );
};
