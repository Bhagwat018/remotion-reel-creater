import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { useTheme } from "../theme/theme";
import { TechLogo } from "../components/TechLogo";
import { SceneLayout } from "../components/SceneLayout";

export interface ChartItem {
  label: string;
  value: number; // 0 to 100 (or custom max)
  displayValue?: string; // e.g. "92.4%", "10x", "12ms"
  color?: string;
  icon?: string;
  badge?: string;
}

export interface ChartSceneProps {
  leadIn?: string;
  headline?: string;
  subheadline?: string;
  chartType?: "bar" | "metric";
  maxValue?: number;
  items?: ChartItem[];
  metricValue?: string;
  metricLabel?: string;
  metricComparison?: string;
  metricIcon?: string;
  durationInFrames?: number;
}

export const ChartScene: React.FC<ChartSceneProps> = ({
  leadIn,
  headline = "BENCHMARK *PERFORMANCE*",
  subheadline = "SWE-bench Verified Coding Accuracy",
  chartType = "bar",
  maxValue = 100,
  items = [
    { label: "Claude 3.5 Sonnet", value: 92, displayValue: "92.4%", icon: "claude", color: "#d97706", badge: "TOP 1" },
    { label: "GPT-4o (OpenAI)", value: 78, displayValue: "78.2%", icon: "openai", color: "#10b981" },
    { label: "Llama 3 70B", value: 65, displayValue: "65.1%", icon: "python", color: "#387eb8" },
  ],
  metricValue = "10x",
  metricLabel = "FASTER INFERENCE",
  metricComparison = "vs Traditional Cloud LLM",
  metricIcon = "claude",
  durationInFrames = 150,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const theme = useTheme();

  // Entrance spring for header
  const headerSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 140 },
  });

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
          flexDirection: "column",
          alignItems: "center",
          marginTop: 0,
        }}
      >
        {subheadline && (
          <p
            style={{
              fontFamily: theme.typography.ui,
              fontSize: 22,
              fontWeight: 600,
              color: theme.colors.muted,
              marginTop: -28,
              marginBottom: 36,
              textAlign: "center",
            }}
          >
            {subheadline}
          </p>
        )}

        {/* 2. Chart Body */}
        {chartType === "bar" ? (
          /* Staggered Animated Bar Chart in High-Contrast Dark Cards */
          <div
            style={{
              width: "100%",
              maxWidth: 900,
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            {items.map((item, idx) => {
              const delay = 4 + idx * 5;
              const barSpring = spring({
                frame: Math.max(0, frame - delay),
                fps,
                config: { damping: 13, stiffness: 120 },
              });

              const barPercentage = Math.min(100, (item.value / maxValue) * 100);
              const currentWidth = barSpring * barPercentage;
              const barColor = item.color || "#3b82f6";
              const currentValue = Math.round(barSpring * item.value);

              return (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    backgroundColor: "rgba(15, 23, 42, 0.94)",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    borderRadius: 18,
                    padding: "16px 22px",
                    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
                    opacity: barSpring,
                    transform: `translateX(${interpolate(barSpring, [0, 1], [-20, 0])}px)`,
                  }}
                >
                  {/* Row Header (Icon + Label + Value + Badge) */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      {item.icon && <TechLogo name={item.icon} size={28} />}
                      <span
                        style={{
                          fontFamily: theme.typography.headline,
                          fontSize: 26,
                          fontWeight: 700,
                          color: "#f8fafc",
                        }}
                      >
                        {item.label}
                      </span>
                      {item.badge && (
                        <span
                          style={{
                            fontSize: 13,
                            fontWeight: 800,
                            padding: "3px 8px",
                            borderRadius: 6,
                            backgroundColor: `${barColor}30`,
                            color: barColor,
                            border: `1px solid ${barColor}60`,
                            letterSpacing: "0.06em",
                          }}
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>

                    <span
                      style={{
                        fontFamily: theme.typography.mono,
                        fontSize: 28,
                        fontWeight: 800,
                        color: barColor,
                      }}
                    >
                      {item.displayValue || `${currentValue}%`}
                    </span>
                  </div>

                  {/* Animated Progress Bar Track */}
                  <div
                    style={{
                      width: "100%",
                      height: 18,
                      backgroundColor: "rgba(255, 255, 255, 0.08)",
                      borderRadius: 10,
                      overflow: "hidden",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      padding: 2,
                    }}
                  >
                    <div
                      style={{
                        width: `${currentWidth}%`,
                        height: "100%",
                        borderRadius: 8,
                        background: `linear-gradient(90deg, ${barColor}aa 0%, ${barColor} 100%)`,
                        boxShadow: `0 0 16px ${barColor}60`,
                        transition: "none",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Hero Metric Card */
          <div
            style={{
              background: "rgba(15, 23, 42, 0.92)",
              border: "1.5px solid rgba(59, 130, 246, 0.4)",
              borderRadius: 32,
              padding: "48px 64px",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
              boxShadow: "0 30px 60px rgba(0, 0, 0, 0.3), 0 0 50px rgba(59, 130, 246, 0.2)",
              transform: `scale(${headerSpring})`,
            }}
          >
            {metricIcon && (
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 24,
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 8,
                }}
              >
                <TechLogo name={metricIcon} size={50} />
              </div>
            )}

            <div
              style={{
                fontFamily: theme.typography.mono,
                fontSize: 100,
                fontWeight: 900,
                color: "#38bdf8",
                letterSpacing: "-0.04em",
                lineHeight: 1,
                textShadow: "0 0 30px rgba(56, 189, 248, 0.4)",
              }}
            >
              {metricValue}
            </div>

            <div
              style={{
                fontFamily: theme.typography.headline,
                fontSize: 32,
                fontWeight: 800,
                color: "#f8fafc",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
              }}
            >
              {metricLabel}
            </div>

            {metricComparison && (
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 600,
                  color: "#94a3b8",
                  background: "rgba(255, 255, 255, 0.05)",
                  padding: "8px 20px",
                  borderRadius: 999,
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                {metricComparison}
              </div>
            )}
          </div>
        )}
      </div>
    </SceneLayout>
  );
};
