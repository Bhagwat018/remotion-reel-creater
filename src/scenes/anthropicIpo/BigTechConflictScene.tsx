import React from "react";
import { spring, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneLayout } from "../../components/SceneLayout";

export interface BigTechConflictSceneProps {
  id?: string;
  leadIn?: string;
  headline?: string;
  brollVideo?: string;
  durationInFrames: number;
}

export const BigTechConflictScene: React.FC<BigTechConflictSceneProps> = ({
  id,
  leadIn = "⚠️ THE GREATEST IPO CONFLICT",
  headline = "THE BIG TECH TRIPLE THREAT! *INVESTORS BHI HAIN, AUR DIRECT COMPETITORS BHI*",
  brollVideo = "broll/ai_cloud_servers.mp4",
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = interpolate(
    spring({ frame, fps, config: { damping: 14, stiffness: 120 } }),
    [0, 1],
    [0.95, 1]
  );

  const pulse = Math.sin(frame * 0.15) * 0.04 + 1;

  const techGiants = [
    {
      name: "AMAZON",
      sub: "$4 Billion Investor",
      role: "Cloud Host (AWS Bedrock)",
      rivalry: "Competes with Alexa/Titan",
      color: "#f59e0b",
      border: "#d97706",
    },
    {
      name: "GOOGLE",
      sub: "$2 Billion Investor",
      role: "Cloud Partner (GCP Vertex)",
      rivalry: "Direct Gemini AI Rival",
      color: "#3b82f6",
      border: "#2563eb",
    },
    {
      name: "MICROSOFT",
      sub: "Enterprise Client",
      role: "Cloud & Copilot Partner",
      rivalry: "OpenAI GPT-4 Alliance",
      color: "#10b981",
      border: "#059669",
    },
  ];

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
          gap: 14,
          alignItems: "stretch",
          marginTop: 10,
          zIndex: 10,
          transform: `scale(${entrance})`,
        }}
      >
        {/* CENTER ALERT BANNER */}
        <div
          style={{
            backgroundColor: "rgba(220, 38, 38, 0.25)",
            border: "2px solid #ef4444",
            borderRadius: 14,
            padding: "10px 16px",
            textAlign: "center",
            boxShadow: "0 0 25px rgba(239, 68, 68, 0.4)",
            transform: `scale(${pulse})`,
          }}
        >
          <span style={{ fontSize: 18, fontWeight: 900, color: "#fca5a5", letterSpacing: 1 }}>
            ⚡ 4-IN-1 CONFLICT: INVESTOR + CUSTOMER + HOST + COMPETITOR
          </span>
        </div>

        {/* 3 BIG TECH GIANTS GRID */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
          {techGiants.map((giant) => (
            <div
              key={giant.name}
              style={{
                backgroundColor: "rgba(15, 23, 42, 0.94)",
                border: `2px solid ${giant.border}`,
                borderRadius: 18,
                padding: "16px 12px",
                textAlign: "center",
                boxShadow: "0 8px 25px rgba(0,0,0,0.6)",
              }}
            >
              <div style={{ fontSize: 20, fontWeight: 900, color: giant.color }}>
                {giant.name}
              </div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 800,
                  color: "#cbd5e1",
                  marginTop: 4,
                  padding: "3px 6px",
                  backgroundColor: "rgba(255,255,255,0.08)",
                  borderRadius: 6,
                }}
              >
                {giant.sub}
              </div>
              <div style={{ fontSize: 13, color: "#94a3b8", marginTop: 8, fontWeight: 600 }}>
                {giant.role}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "#f87171",
                  marginTop: 6,
                  fontWeight: 700,
                  borderTop: "1px dashed rgba(255,255,255,0.15)",
                  paddingTop: 6,
                }}
              >
                ⚔️ {giant.rivalry}
              </div>
            </div>
          ))}
        </div>

        {/* CRITICAL TAKEAWAY */}
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.88)",
            border: "1px solid #475569",
            borderRadius: 14,
            padding: "12px 18px",
            textAlign: "center",
          }}
        >
          <span style={{ fontSize: 16, fontWeight: 700, color: "#e2e8f0" }}>
            "Agar kal inke relations kharab hue, toh Anthropic ka cloud infrastructure band ho sakta hai!"
          </span>
        </div>
      </div>
    </SceneLayout>
  );
};
