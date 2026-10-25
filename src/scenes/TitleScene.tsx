import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { TitleSceneProps } from "../schema";
import { SceneLayout } from "../components/SceneLayout";
import { useTheme } from "../theme/theme";

export const TitleScene: React.FC<
  TitleSceneProps & { subtitle?: string; durationInFrames: number }
> = ({ leadIn, subtitle, headline, durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const theme = useTheme();

  const entrance = spring({
    frame: frame - 4,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  const rotateOuter = (frame * 1.2) % 360;
  const rotateInner = (-frame * 1.8) % 360;
  const pulseScale = 1 + Math.sin(frame / 6) * 0.04;
  const rippleRadius = interpolate(frame % 40, [0, 40], [70, 160]);
  const rippleOpacity = interpolate(frame % 40, [0, 20, 40], [0.8, 0.4, 0]);

  return (
    <SceneLayout
      leadIn={leadIn || subtitle}
      headline={headline}
      durationInFrames={durationInFrames}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          transform: `scale(${Math.min(1, entrance)})`,
          marginTop: 10,
        }}
      >
        {/* Holographic Glowing Cyber Core */}
        <div
          style={{
            position: "relative",
            width: 380,
            height: 380,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Animated Expanding Ripple Wave */}
          <div
            style={{
              position: "absolute",
              width: rippleRadius * 2,
              height: rippleRadius * 2,
              borderRadius: "50%",
              border: "2px solid #38bdf8",
              opacity: rippleOpacity,
              boxShadow: "0 0 20px #38bdf8",
              pointerEvents: "none",
            }}
          />

          {/* SVG Rotating Dotted Rings */}
          <svg
            width="360"
            height="360"
            viewBox="0 0 360 360"
            style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
          >
            {/* Outer Dotted Orbit Ring */}
            <circle
              cx="180"
              cy="180"
              r="160"
              stroke="#2563eb"
              strokeWidth="2.5"
              strokeDasharray="12 16"
              fill="none"
              style={{
                transformOrigin: "180px 180px",
                transform: `rotate(${rotateOuter}deg)`,
                opacity: 0.6,
              }}
            />
            {/* Inner Fast Orbit Ring */}
            <circle
              cx="180"
              cy="180"
              r="125"
              stroke="#38bdf8"
              strokeWidth="2"
              strokeDasharray="8 12"
              fill="none"
              style={{
                transformOrigin: "180px 180px",
                transform: `rotate(${rotateInner}deg)`,
                opacity: 0.8,
              }}
            />
          </svg>

          {/* Glowing Center Glass Hexagon / Disk */}
          <div
            style={{
              width: 200,
              height: 200,
              borderRadius: "50%",
              backgroundColor: "rgba(10, 15, 29, 0.92)",
              backdropFilter: "blur(18px)",
              border: "3px solid #38bdf8",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              boxShadow: "0 0 45px rgba(56, 189, 248, 0.35), inset 0 0 25px rgba(56, 189, 248, 0.2)",
              transform: `scale(${pulseScale})`,
              zIndex: 2,
            }}
          >
            {/* Glowing Tech Stack Icon */}
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
              <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
              <line x1="6" y1="6" x2="6.01" y2="6" />
              <line x1="6" y1="18" x2="6.01" y2="18" />
            </svg>
            <span
              style={{
                fontSize: 14,
                fontWeight: 800,
                color: "#38bdf8",
                letterSpacing: "0.12em",
                fontFamily: theme.typography.mono,
              }}
            >
              TECH DEEP DIVE
            </span>
          </div>
        </div>

        {/* Floating Subtitle / Topic Pill */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            backgroundColor: "rgba(15, 23, 42, 0.85)",
            border: "1.5px solid rgba(56, 189, 248, 0.4)",
            borderRadius: 999,
            padding: "10px 24px",
            marginTop: 24,
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: "#22c55e",
              boxShadow: "0 0 8px #22c55e",
            }}
          />
          <span
            style={{
              fontFamily: theme.typography.mono,
              fontSize: 18,
              fontWeight: 700,
              color: "#f8fafc",
              letterSpacing: "0.06em",
            }}
          >
            60-SEC ARCHITECTURE BREAKDOWN
          </span>
        </div>
      </div>
    </SceneLayout>
  );
};
