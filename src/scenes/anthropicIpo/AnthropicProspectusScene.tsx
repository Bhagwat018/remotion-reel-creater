import React from "react";
import { spring, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneLayout } from "../../components/SceneLayout";

export interface AnthropicProspectusSceneProps {
  id?: string;
  leadIn?: string;
  headline?: string;
  brollVideo?: string;
  durationInFrames: number;
}

export const AnthropicProspectusScene: React.FC<AnthropicProspectusSceneProps> = ({
  id,
  leadIn = "📑 S-1 PROSPECTUS FILED • US SEC",
  headline = "CLAUDE AI: $1.5 TRILLION VALUATION! *64 BILLION DOLLARS MEGA RAISE*",
  brollVideo = "broll/nasdaq_stock_ticker.mp4",
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = interpolate(
    spring({ frame, fps, config: { damping: 14, stiffness: 120 } }),
    [0, 1],
    [0.95, 1]
  );

  const glowPulse = Math.sin(frame * 0.12) * 0.05 + 1;

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
        {/* CORE STATS GRID */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          {/* CARD 1: VALUATION */}
          <div
            style={{
              backgroundColor: "rgba(15, 23, 42, 0.92)",
              border: "3px solid #06b6d4",
              borderRadius: 20,
              padding: "20px",
              boxShadow: "0 10px 30px rgba(6, 182, 212, 0.35)",
            }}
          >
            <div style={{ fontSize: 16, fontWeight: 800, color: "#67e8f9", letterSpacing: 1.5 }}>
              TARGET VALUATION
            </div>
            <div
              style={{
                fontSize: 38,
                fontWeight: 900,
                color: "#ffffff",
                marginTop: 8,
                fontFamily: "monospace",
                textShadow: "0 0 20px rgba(6, 182, 212, 0.8)",
              }}
            >
              $1.5 TRILLION
            </div>
            <div style={{ fontSize: 15, color: "#cbd5e1", marginTop: 6, fontWeight: 600 }}>
              Bigger than Meta & Tesla at IPO
            </div>
          </div>

          {/* CARD 2: CAPITAL RAISE */}
          <div
            style={{
              backgroundColor: "rgba(15, 23, 42, 0.92)",
              border: "3px solid #10b981",
              borderRadius: 20,
              padding: "20px",
              boxShadow: "0 10px 30px rgba(16, 185, 129, 0.35)",
            }}
          >
            <div style={{ fontSize: 16, fontWeight: 800, color: "#34d399", letterSpacing: 1.5 }}>
              CASH CAPITAL RAISE
            </div>
            <div
              style={{
                fontSize: 38,
                fontWeight: 900,
                color: "#10b981",
                marginTop: 8,
                fontFamily: "monospace",
                textShadow: "0 0 20px rgba(16, 185, 129, 0.8)",
              }}
            >
              $64 BILLION
            </div>
            <div style={{ fontSize: 15, color: "#a7f3d0", marginTop: 6, fontWeight: 600 }}>
              Fresh Cash Inflow for AI Clusters
            </div>
          </div>
        </div>

        {/* BOTTOM WIDE CARD: CLAUDE AI DOMINANCE */}
        <div
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.95)",
            border: "2px solid #8b5cf6",
            borderRadius: 20,
            padding: "18px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 10px 30px rgba(139, 92, 246, 0.3)",
            transform: `scale(${glowPulse})`,
          }}
        >
          <div>
            <div style={{ fontSize: 15, fontWeight: 800, color: "#c4b5fd", letterSpacing: 1.5 }}>
              FLAGSHIP POWERHOUSE
            </div>
            <div style={{ fontSize: 26, fontWeight: 900, color: "#ffffff", marginTop: 4 }}>
              Claude 3.5 Sonnet & Opus
            </div>
            <div style={{ fontSize: 14, color: "#94a3b8", marginTop: 2 }}>
              #1 Ranked Coding & Reasoning LLM Globally
            </div>
          </div>
          <div
            style={{
              padding: "10px 18px",
              backgroundColor: "rgba(139, 92, 246, 0.25)",
              border: "2px solid #a855f7",
              borderRadius: 12,
              fontSize: 18,
              fontWeight: 900,
              color: "#e9d5ff",
              textAlign: "center",
            }}
          >
            400 PAGES S-1
          </div>
        </div>
      </div>
    </SceneLayout>
  );
};
