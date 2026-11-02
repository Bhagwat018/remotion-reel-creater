import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface AnimatedMetricMeterProps {
  label: string;
  value: string | number;
  percentage: number; // 0 to 100
  color?: string;
  gradient?: [string, string];
  delayFrames?: number;
  sublabel?: string;
  height?: number;
}

/**
 * AnimatedMetricMeter - Animated progress bar with glowing head and spring fill
 * Inspired by shadcn progress & makeitanimated.dev
 */
export const AnimatedMetricMeter: React.FC<AnimatedMetricMeterProps> = ({
  label,
  value,
  percentage,
  color = "#10b981",
  gradient = ["#06b6d4", "#10b981"],
  delayFrames = 5,
  sublabel,
  height = 14,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progressSpring = spring({
    frame: frame - delayFrames,
    fps,
    config: { damping: 14, stiffness: 90 },
  });

  const currentPercent = interpolate(
    progressSpring,
    [0, 1],
    [0, Math.min(100, Math.max(0, percentage))],
    { extrapolateRight: "clamp" }
  );

  // Subtle pulsing glow on the lead edge
  const pulse = Math.sin(frame / 6) * 0.2 + 0.8;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <span
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 18,
            fontWeight: 800,
            color: "#0f172a",
          }}
        >
          {label}
        </span>
        <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 22,
              fontWeight: 900,
              color: color,
            }}
          >
            {value}
          </span>
          {sublabel && (
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                fontWeight: 700,
                color: "#64748b",
              }}
            >
              ({sublabel})
            </span>
          )}
        </div>
      </div>

      {/* Progress Track */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: height,
          backgroundColor: "#e2e8f0",
          borderRadius: height / 2,
          overflow: "hidden",
          border: "1px solid #cbd5e1",
        }}
      >
        {/* Animated Fill Bar */}
        <div
          style={{
            width: `${currentPercent}%`,
            height: "100%",
            borderRadius: height / 2,
            background: `linear-gradient(90deg, ${gradient[0]}, ${gradient[1]})`,
            position: "relative",
            boxShadow: `0 0 12px ${color}`,
            transition: "width 0.1s linear",
          }}
        >
          {/* Glowing head / tip */}
          <div
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              bottom: 0,
              width: 14,
              borderRadius: "50%",
              backgroundColor: "#ffffff",
              opacity: pulse,
              boxShadow: `0 0 10px #ffffff, 0 0 18px ${color}`,
            }}
          />
        </div>
      </div>
    </div>
  );
};
