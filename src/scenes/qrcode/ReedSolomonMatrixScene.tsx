import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneLayout } from "../../components/SceneLayout";

export interface ReedSolomonMatrixSceneProps {
  id?: string;
  leadIn?: string;
  headline?: string;
  brollVideo?: string;
  durationInFrames: number;
}

export const ReedSolomonMatrixScene: React.FC<ReedSolomonMatrixSceneProps> = ({
  id,
  leadIn = "🚀 NASA DEEP SPACE ALGORITHM",
  headline = "REED-SOLOMON *ERROR CORRECTION*",
  brollVideo = "broll/nasa_satellite_deepspace.mp4",
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  const pulse = Math.sin(frame * 0.18) * 0.08 + 1;

  const levels = [
    { level: "Level L", recovery: "7% Damage", use: "Standard Text / Tiny Codes", color: "#64748b" },
    { level: "Level M", recovery: "15% Damage", use: "Standard Retail Packaging", color: "#38bdf8" },
    { level: "Level Q", recovery: "25% Damage", use: "Industrial / Outdoor Use", color: "#f59e0b" },
    { level: "Level H", recovery: "30% MAXIMUM", use: "Payments, Tapri & Center Logos", color: "#ef4444", active: true },
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
          gap: 18,
          alignItems: "center",
          marginTop: 6,
          transform: `scale(${entrance})`,
        }}
      >
        {/* NASA Deep Space Telemetry Header */}
        <div
          style={{
            width: "100%",
            backgroundColor: "rgba(15, 23, 42, 0.95)",
            border: "2px solid #38bdf8",
            borderRadius: 18,
            padding: "14px 22px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.7)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ fontSize: 32 }}>🛰️</span>
            <div>
              <div
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontWeight: 900,
                  fontSize: 18,
                  color: "#ffffff",
                }}
              >
                AEROSPACE MATHEMATICAL RECOVERY
              </div>
              <div
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: 12,
                  color: "#38bdf8",
                }}
              >
                Invented for NASA Voyager 1 & 2 • Powering every UPI QR today
              </div>
            </div>
          </div>
          <div
            style={{
              padding: "4px 12px",
              backgroundColor: "rgba(56, 189, 248, 0.2)",
              border: "1px solid #38bdf8",
              borderRadius: 6,
              fontFamily: "JetBrains Mono, monospace",
              fontWeight: 800,
              fontSize: 11,
              color: "#38bdf8",
            }}
          >
            SPACE-PROVEN
          </div>
        </div>

        {/* 4 Error Correction Tiers */}
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          {levels.map((item, idx) => (
            <div
              key={idx}
              style={{
                width: "100%",
                backgroundColor: item.active ? "rgba(255, 255, 255, 0.98)" : "rgba(255, 255, 255, 0.88)",
                borderRadius: 14,
                border: item.active ? `3px solid ${item.color}` : "1.5px solid rgba(255, 255, 255, 0.3)",
                padding: "12px 20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                boxShadow: item.active ? `0 10px 25px ${item.color}40` : "0 4px 15px rgba(0,0,0,0.2)",
                transform: item.active ? `scale(${pulse})` : "scale(1)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <span
                  style={{
                    fontFamily: "JetBrains Mono, monospace",
                    fontWeight: 900,
                    fontSize: 15,
                    color: item.color,
                  }}
                >
                  [{item.level}]
                </span>
                <span
                  style={{
                    fontFamily: "Space Grotesk, sans-serif",
                    fontWeight: 800,
                    fontSize: 16,
                    color: "#0f172a",
                  }}
                >
                  {item.use}
                </span>
              </div>

              <div
                style={{
                  padding: "4px 12px",
                  backgroundColor: `${item.color}20`,
                  border: `1.5px solid ${item.color}`,
                  borderRadius: 6,
                  fontFamily: "JetBrains Mono, monospace",
                  fontWeight: 900,
                  fontSize: 13,
                  color: item.color,
                }}
              >
                {item.recovery}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Explainer Pill */}
        <div
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.92)",
            border: "1.5px solid rgba(255, 255, 255, 0.2)",
            borderRadius: 12,
            padding: "8px 20px",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span style={{ fontSize: 16 }}>⚡</span>
          <span
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 13,
              color: "#e2e8f0",
            }}
          >
            Level H adds 30% mathematical parity bytes — so destroyed blocks are solved like algebra!
          </span>
        </div>
      </div>
    </SceneLayout>
  );
};
