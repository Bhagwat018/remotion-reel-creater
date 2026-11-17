import React from "react";
import { spring, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneLayout } from "../../components/SceneLayout";

export interface RevenueRocketSceneProps {
  id?: string;
  leadIn?: string;
  headline?: string;
  brollVideo?: string;
  durationInFrames: number;
}

export const RevenueRocketScene: React.FC<RevenueRocketSceneProps> = ({
  id,
  leadIn = "🚀 EXPLOSIVE FINANCIAL METRICS",
  headline = "3.5X REVENUE EXPLOSION! *AADHE SAAL MEIN POORE SAAL SE 3.5X ZYADA*",
  brollVideo = "broll/stock_market_trading_chart.mp4",
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const barGrowth = interpolate(
    spring({ frame: Math.max(0, frame - 5), fps, config: { damping: 15, stiffness: 100 } }),
    [0, 1],
    [0.1, 1]
  );

  return (
    <SceneLayout
      id={id}
      leadIn={leadIn}
      headline={headline}
      brollVideo={brollVideo}
      durationInFrames={durationInFrames}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 960,
          display: "flex",
          flexDirection: "column",
          gap: 16,
          alignItems: "stretch",
          marginTop: 10,
          zIndex: 10,
        }}
      >
        {/* REVENUE BARS CONTAINER */}
        <div
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.94)",
            border: "2px solid #334155",
            borderRadius: 22,
            padding: "24px 20px",
            boxShadow: "0 14px 40px rgba(0,0,0,0.8)",
            display: "flex",
            flexDirection: "column",
            gap: 18,
          }}
        >
          {/* BAR 1: 2023 FULL YEAR */}
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 16,
                fontWeight: 800,
                color: "#94a3b8",
                marginBottom: 6,
              }}
            >
              <span>FY 2023 (POORA 1 SAAL)</span>
              <span style={{ color: "#ffffff", fontFamily: "monospace", fontSize: 20 }}>
                $5 BILLION
              </span>
            </div>
            <div
              style={{
                width: "100%",
                height: 38,
                backgroundColor: "rgba(51, 65, 85, 0.5)",
                borderRadius: 10,
                overflow: "hidden",
                border: "1px solid #475569",
              }}
            >
              <div
                style={{
                  width: `${31 * barGrowth}%`,
                  height: "100%",
                  backgroundColor: "#64748b",
                  borderRadius: 10,
                }}
              />
            </div>
          </div>

          {/* ROCKET DIVIDER */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              padding: "6px 14px",
              backgroundColor: "rgba(16, 185, 129, 0.15)",
              border: "1px dashed #10b981",
              borderRadius: 12,
            }}
          >
            <span style={{ fontSize: 22 }}>🚀</span>
            <span style={{ fontSize: 18, fontWeight: 900, color: "#34d399", letterSpacing: 1 }}>
              +320% SURGE IN 180 DAYS • 3.5X SPEED
            </span>
          </div>

          {/* BAR 2: 2024 JUST 6 MONTHS */}
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 16,
                fontWeight: 800,
                color: "#34d399",
                marginBottom: 6,
              }}
            >
              <span>H1 2024 (SIRF PEHLE 6 MAHINE!)</span>
              <span
                style={{
                  color: "#10b981",
                  fontFamily: "monospace",
                  fontSize: 26,
                  fontWeight: 900,
                  textShadow: "0 0 15px rgba(16, 185, 129, 0.8)",
                }}
              >
                $16 BILLION
              </span>
            </div>
            <div
              style={{
                width: "100%",
                height: 48,
                backgroundColor: "rgba(51, 65, 85, 0.5)",
                borderRadius: 10,
                overflow: "hidden",
                border: "2px solid #10b981",
                boxShadow: "0 0 20px rgba(16, 185, 129, 0.4)",
              }}
            >
              <div
                style={{
                  width: `${100 * barGrowth}%`,
                  height: "100%",
                  background: "linear-gradient(90deg, #059669 0%, #10b981 100%)",
                  borderRadius: 8,
                }}
              />
            </div>
          </div>
        </div>

        {/* BOTTOM REALITY CALLOUT */}
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.85)",
            border: "2px solid #06b6d4",
            borderRadius: 16,
            padding: "12px 20px",
            textAlign: "center",
          }}
        >
          <span style={{ fontSize: 18, fontWeight: 800, color: "#67e8f9" }}>
            🔥 World's Fastest AI Monetization Velocity in History!
          </span>
        </div>
      </div>
    </SceneLayout>
  );
};
