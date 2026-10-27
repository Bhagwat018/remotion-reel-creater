import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { useTheme } from "../theme/theme";
import { TechLogo } from "../components/TechLogo";
import { SceneLayout } from "../components/SceneLayout";
import { NeoLineChartCard } from "../components/neo/NeoLineChartCard";
import { MotionDirection } from "../lib/directionalMotion";

export interface ChartItem {
  label: string;
  value: number; // 0 to 100 (or custom max)
  displayValue?: string; // e.g. "92.4%", "10x", "12ms"
  color?: string;
  icon?: string;
  badge?: string;
}

export interface ChartSceneProps {
  id?: string;
  direction?: MotionDirection;
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
  id,
  direction,
  leadIn,
  headline = "BENCHMARK *PERFORMANCE*",
  chartType = "bar",
  maxValue = 100,
  items = [
    { label: "Claude 3.5 Sonnet", value: 92, displayValue: "92.4%", icon: "claude", color: "#fb923c", badge: "TOP 1" },
    { label: "GPT-4o (OpenAI)", value: 78, displayValue: "78.2%", icon: "openai", color: "#4ade80" },
    { label: "Llama 3 70B", value: 65, displayValue: "65.1%", icon: "python", color: "#60a5fa" },
  ],
  metricValue = "+106%",
  metricComparison = "Benchmark tested under 50,000 req/sec load",
  durationInFrames = 150,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const theme = useTheme();

  return (
    <SceneLayout
      id={id}
      direction={direction}
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
        {chartType === "metric" ? (
          <NeoLineChartCard
            title={headline.replace(/[*_#`]/g, "")}
            metric={metricValue}
            badge="TOP BENCHMARK 🚀"
            subtext={metricComparison}
            delayFrames={4}
          />
        ) : (
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
                    backgroundColor: "#ffffff",
                    border: "3px solid #000000",
                    borderRadius: 18,
                    padding: "16px 22px",
                    boxShadow: "5px 5px 0px #000000",
                    opacity: barSpring,
                    transform: `translateX(${interpolate(barSpring, [0, 1], [-20, 0])}px)`,
                  }}
                >
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
                          fontWeight: 800,
                          color: "#000000",
                        }}
                      >
                        {item.label}
                      </span>
                      {item.badge && (
                        <span
                          style={{
                            fontSize: 16,
                            fontWeight: 900,
                            padding: "3px 10px",
                            borderRadius: 999,
                            backgroundColor: "#fb923c",
                            color: "#000000",
                            border: "2px solid #000000",
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
                        fontWeight: 900,
                        color: "#000000",
                      }}
                    >
                      {item.displayValue || `${currentValue}%`}
                    </span>
                  </div>

                  <div
                    style={{
                      width: "100%",
                      height: 18,
                      backgroundColor: "#f1f5f9",
                      borderRadius: 10,
                      overflow: "hidden",
                      border: "2px solid #000000",
                    }}
                  >
                    <div
                      style={{
                        width: `${currentWidth}%`,
                        height: "100%",
                        backgroundColor: barColor,
                        borderRadius: 8,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </SceneLayout>
  );
};
