import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneLayout } from "../../components/SceneLayout";

export interface AtmPhysicsCompareSceneProps {
  id?: string;
  leadIn?: string;
  headline?: string;
  brollVideo?: string;
  durationInFrames: number;
}

export const AtmPhysicsCompareScene: React.FC<AtmPhysicsCompareSceneProps> = ({
  id,
  leadIn = "⚡ WHY COUNTERFEITS ALWAYS FAIL",
  headline = "SCAMMERS CAN PRINT *CANNOT COPY PHYSICS*",
  brollVideo = "broll/digital_matrix_blocks.mp4",
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  const tests = [
    { name: "365nm UV Phosphors", scammer: "Flat Color Ink", bank: "Chemical Emission", pass: true },
    { name: "Security Thread", scammer: "Shiny Plastic Foil", bank: "Ferro-Magnetic Metal", pass: true },
    { name: "Paper Substrate", scammer: "Wood Cellulose (0.18mm)", bank: "100% Pure Cotton (0.11mm)", pass: true },
    { name: "Tactile Surface", scammer: "Smooth Offset", bank: "Raised Intaglio Ink", pass: true },
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
          gap: 12,
          alignItems: "center",
          marginTop: 6,
          transform: `scale(${entrance})`,
        }}
      >
        {/* Top Summary Banner */}
        <div
          style={{
            width: "100%",
            backgroundColor: "rgba(15, 23, 42, 0.95)",
            border: "2px solid #38bdf8",
            borderRadius: 18,
            padding: "12px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.7)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 28 }}>🛡️</span>
            <div>
              <div
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontWeight: 900,
                  fontSize: 17,
                  color: "#ffffff",
                }}
              >
                PHYSICS-FIRST SECURITY ARCHITECTURE
              </div>
              <div
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: 11,
                  color: "#38bdf8",
                }}
              >
                High-end printers replicate visual pixels • But zero physical laws
              </div>
            </div>
          </div>
          <div
            style={{
              padding: "4px 10px",
              backgroundColor: "rgba(56, 189, 248, 0.2)",
              border: "1px solid #38bdf8",
              borderRadius: 6,
              fontFamily: "JetBrains Mono, monospace",
              fontWeight: 800,
              fontSize: 11,
              color: "#38bdf8",
            }}
          >
            LAWS OF PHYSICS
          </div>
        </div>

        {/* 4 Feature Comparison Rows */}
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          {tests.map((item, idx) => (
            <div
              key={idx}
              style={{
                width: "100%",
                backgroundColor: "rgba(255, 255, 255, 0.96)",
                borderRadius: 12,
                border: "1.5px solid rgba(255, 255, 255, 0.4)",
                padding: "10px 16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span
                  style={{
                    fontFamily: "Space Grotesk, sans-serif",
                    fontWeight: 900,
                    fontSize: 15,
                    color: "#0f172a",
                  }}
                >
                  {item.name}
                </span>
                <span
                  style={{
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: 11,
                    color: "#ef4444",
                  }}
                >
                  Scammer: {item.scammer}
                </span>
              </div>

              <div
                style={{
                  padding: "4px 12px",
                  backgroundColor: "rgba(34, 197, 94, 0.15)",
                  border: "1.5px solid #22c55e",
                  borderRadius: 6,
                  fontFamily: "JetBrains Mono, monospace",
                  fontWeight: 900,
                  fontSize: 12,
                  color: "#15803d",
                  textAlign: "right",
                }}
              >
                {item.bank}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Explainer Tag */}
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
            Ink can be copied — but atomic chemistry, magnetism &amp; pure cotton cannot!
          </span>
        </div>
      </div>
    </SceneLayout>
  );
};

