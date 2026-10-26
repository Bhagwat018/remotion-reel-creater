import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { StatSceneProps } from "../schema";
import { SceneLayout } from "../components/SceneLayout";
import { resolveFontFamily, useTheme } from "../theme/theme";
import { ShimmerSweep } from "../components/ShimmerSweep";

export const StatScene: React.FC<StatSceneProps & { durationInFrames: number }> = ({
  leadIn,
  headline,
  value,
  label,
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const theme = useTheme();

  // Floating physics
  const floatY = frame > 12 ? Math.sin((frame - 12) / 12) * 6 : 0;

  // Parse numeric part and suffix (e.g. "10x" -> 10, "x")
  const strVal = String(value);
  const match = strVal.match(/^([\d.]+)(.*)$/);
  const targetNum = match ? parseFloat(match[1]) : 10;
  const suffix = match ? match[2] : "x";

  // Dynamic spring entrance for the whole card
  const cardSpring = spring({
    frame: frame - 4,
    fps,
    config: { damping: 13, stiffness: 100 },
  });

  // Count up animation over 24 frames
  const countProgress = interpolate(frame, [6, 30], [0, targetNum], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const currentNumberDisplay = Number.isInteger(targetNum)
    ? Math.round(countProgress)
    : countProgress.toFixed(1);

  // Animated speedometer / throughput pulse
  const pulseBars = 8;
  const activeBars = Math.min(pulseBars, Math.round((countProgress / (targetNum || 1)) * pulseBars));

  const labelFont = resolveFontFamily(label, theme.typography.ui);

  return (
    <SceneLayout
      leadIn={leadIn}
      headline={headline}
      durationInFrames={durationInFrames}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        {/* Massive High-Tech Stat Glassmorphic Card */}
        <div
          style={{
            width: 880,
            backgroundColor: "rgba(12, 16, 26, 0.94)",
            backdropFilter: "blur(20px)",
            border: "2px solid rgba(56, 189, 248, 0.45)",
            borderRadius: 32,
            padding: "48px 40px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
            boxShadow: "0 25px 70px rgba(0, 0, 0, 0.5), 0 0 35px rgba(56, 189, 248, 0.15)",
            transform: `translateY(${floatY}px) scale(${Math.min(1, cardSpring)})`,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Light gleam sweep */}
          <ShimmerSweep delayFrames={10} periodFrames={85} />
          {/* Subtle tech background grid lines */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: "radial-gradient(rgba(56, 189, 248, 0.08) 1.5px, transparent 1.5px)",
              backgroundSize: "24px 24px",
              opacity: 0.6,
              pointerEvents: "none",
            }}
          />

          {/* Top Metric Chip */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              backgroundColor: "rgba(56, 189, 248, 0.12)",
              border: "1px solid rgba(56, 189, 248, 0.35)",
              borderRadius: 999,
              padding: "8px 20px",
              fontSize: 18,
              fontWeight: 700,
              color: "#38bdf8",
              fontFamily: theme.typography.mono,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              zIndex: 2,
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
            SPEED BENCHMARK METRIC
          </div>

          {/* Huge Glowing Number */}
          <div
            style={{
              fontFamily: theme.typography.headline,
              fontSize: 220,
              lineHeight: 0.9,
              color: "#38bdf8",
              letterSpacing: "-0.03em",
              textShadow: "0 0 50px rgba(56, 189, 248, 0.7), 0 10px 30px rgba(0, 0, 0, 0.8)",
              zIndex: 2,
              display: "flex",
              alignItems: "baseline",
            }}
          >
            <span>{currentNumberDisplay}</span>
            <span style={{ fontSize: 130, color: "#818cf8", marginLeft: 4 }}>{suffix}</span>
          </div>

          {/* Animated Throughput Speedometer Bars */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              width: "100%",
              maxWidth: 680,
              zIndex: 2,
            }}
          >
            {Array.from({ length: pulseBars }).map((_, barIdx) => {
              const isFilled = barIdx < activeBars;
              return (
                <div
                  key={barIdx}
                  style={{
                    flex: 1,
                    height: 12,
                    borderRadius: 6,
                    backgroundColor: isFilled ? "#38bdf8" : "rgba(255, 255, 255, 0.1)",
                    boxShadow: isFilled ? "0 0 12px #38bdf8" : "none",
                    transition: "all 0.15s ease",
                  }}
                />
              );
            })}
          </div>

          {/* Metric Description Label */}
          <div
            style={{
              fontFamily: labelFont,
              fontSize: 38,
              fontWeight: 700,
              color: "#f8fafc",
              textAlign: "center",
              maxWidth: 720,
              lineHeight: 1.3,
              zIndex: 2,
              marginTop: 4,
            }}
          >
            {label}
          </div>
        </div>
      </div>
    </SceneLayout>
  );
};
