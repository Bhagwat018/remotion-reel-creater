import React from "react";
import { spring, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneLayout } from "../../components/SceneLayout";

export interface OutroIpoCtaSceneProps {
  id?: string;
  leadIn?: string;
  headline?: string;
  brollVideo?: string;
  durationInFrames: number;
}

export const OutroIpoCtaScene: React.FC<OutroIpoCtaSceneProps> = ({
  id,
  leadIn = "🗳️ FINAL VERDICT • YOUR OPINION",
  headline = "AI BUBBLE YA GOLDMINE? *COMMENTS MEIN BATAO: KYA AAP INVEST KAROGE?*",
  brollVideo = "broll/office_skyscraper_city.mp4",
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = interpolate(
    spring({ frame, fps, config: { damping: 14, stiffness: 120 } }),
    [0, 1],
    [0.95, 1]
  );

  const pulse = Math.sin(frame * 0.18) * 0.05 + 1;

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
          transform: `scale(${entrance})`,
        }}
      >
        {/* INTERACTIVE COMMUNITY POLL BOX */}
        <div
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.94)",
            border: "2px solid #3b82f6",
            borderRadius: 20,
            padding: "20px 24px",
            boxShadow: "0 12px 35px rgba(59, 130, 246, 0.35)",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 16, fontWeight: 800, color: "#93c5fd", letterSpacing: 1.5 }}>
            PUBLIC SENTIMENT POLL
          </div>
          <div style={{ fontSize: 24, fontWeight: 900, color: "#ffffff", marginTop: 4 }}>
            Would You Apply for Anthropic IPO?
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 14,
              marginTop: 16,
            }}
          >
            <div
              style={{
                backgroundColor: "rgba(16, 185, 129, 0.2)",
                border: "2px solid #10b981",
                borderRadius: 14,
                padding: "14px",
                fontSize: 18,
                fontWeight: 900,
                color: "#6ee7b7",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              <span>🟢</span>
              <span>10X AI LEADER</span>
            </div>

            <div
              style={{
                backgroundColor: "rgba(239, 68, 68, 0.2)",
                border: "2px solid #ef4444",
                borderRadius: 14,
                padding: "14px",
                fontSize: 18,
                fontWeight: 900,
                color: "#fca5a5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              <span>🔴</span>
              <span>OVERVALUED BUBBLE</span>
            </div>
          </div>
        </div>

        {/* INDIA ROUTE CALLOUT */}
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.85)",
            border: "1px solid #64748b",
            borderRadius: 14,
            padding: "12px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ fontSize: 16, fontWeight: 700, color: "#e2e8f0" }}>
            🇮🇳 India Investment Route: US Direct Stock Brokers (IndMoney / Vested)
          </span>
          <span
            style={{
              backgroundColor: "#2563eb",
              padding: "4px 10px",
              borderRadius: 6,
              fontSize: 13,
              fontWeight: 800,
              color: "#ffffff",
            }}
          >
            LRS ROUTE
          </span>
        </div>

        {/* FOLLOW CALLOUT BANNER */}
        <div
          style={{
            backgroundColor: "linear-gradient(90deg, #1e1b4b 0%, #312e81 100%)",
            border: "2px solid #a855f7",
            borderRadius: 16,
            padding: "16px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            boxShadow: "0 0 30px rgba(168, 85, 247, 0.5)",
            transform: `scale(${pulse})`,
          }}
        >
          <span style={{ fontSize: 26 }}>⚡</span>
          <span style={{ fontSize: 22, fontWeight: 900, color: "#ffffff", letterSpacing: 0.5 }}>
            FOLLOW <span style={{ color: "#fbbf24" }}>@TECHWITH.GENZ</span> FOR MARKET ALPHA
          </span>
        </div>
      </div>
    </SceneLayout>
  );
};
