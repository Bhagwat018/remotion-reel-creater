import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneLayout } from "../../components/SceneLayout";

export interface QrSelfHealSceneProps {
  id?: string;
  leadIn?: string;
  headline?: string;
  brollVideo?: string;
  durationInFrames: number;
}

export const QrSelfHealScene: React.FC<QrSelfHealSceneProps> = ({
  id,
  leadIn = "🔬 RECONSTRUCTING MISSING PIXELS",
  headline = "MATHEMATICAL *POLYNOMIAL HEALING*",
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

  // Healing animation progress: between frame 20 and 55
  const healProgress = interpolate(frame, [20, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 36 grid blocks (6x6 matrix)
  const damagedIndices = [4, 5, 10, 11, 16, 17, 22, 23, 28, 29]; // ~28% damage

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
        {/* Math HUD Console Header */}
        <div
          style={{
            width: "100%",
            backgroundColor: "rgba(15, 23, 42, 0.95)",
            border: "2px solid #22c55e",
            borderRadius: 18,
            padding: "12px 22px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.7)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 24 }}>📐</span>
            <span
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontWeight: 900,
                fontSize: 15,
                color: "#4ade80",
                letterSpacing: "0.06em",
              }}
            >
              GALOIS FIELD GF(256) // POLYNOMIAL DECODER
            </span>
          </div>
          <div
            style={{
              padding: "4px 12px",
              backgroundColor: healProgress >= 0.9 ? "rgba(34, 197, 94, 0.25)" : "rgba(239, 68, 68, 0.25)",
              border: `1.5px solid ${healProgress >= 0.9 ? "#22c55e" : "#ef4444"}`,
              borderRadius: 6,
              fontFamily: "JetBrains Mono, monospace",
              fontWeight: 800,
              fontSize: 12,
              color: healProgress >= 0.9 ? "#4ade80" : "#f87171",
            }}
          >
            {healProgress >= 0.9 ? "100% RECOVERED" : "SOLVING EQUATIONS..."}
          </div>
        </div>

        {/* 6x6 QR Self-Healing Matrix Simulation */}
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.98)",
            borderRadius: 22,
            border: "3px solid #0f172a",
            padding: "20px 24px",
            boxShadow: "0 14px 40px rgba(0, 0, 0, 0.45)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
            width: "100%",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(6, 1fr)",
              gap: 8,
              width: "100%",
              maxWidth: 440,
            }}
          >
            {Array.from({ length: 36 }).map((_, idx) => {
              const isDamaged = damagedIndices.includes(idx);
              let blockBg = "#0f172a";
              let blockBorder = "none";
              let blockText = "1";

              if (idx % 3 === 0) {
                blockBg = "#f8fafc";
                blockBorder = "1px solid #cbd5e1";
                blockText = "0";
              }

              if (isDamaged) {
                if (healProgress < 0.8) {
                  blockBg = "#ef4444";
                  blockBorder = "2px solid #b91c1c";
                  blockText = "ERR";
                } else {
                  blockBg = "#22c55e";
                  blockBorder = "2px solid #15803d";
                  blockText = "OK";
                }
              }

              return (
                <div
                  key={idx}
                  style={{
                    aspectRatio: "1/1",
                    backgroundColor: blockBg,
                    border: blockBorder,
                    borderRadius: 8,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: 11,
                    fontWeight: 900,
                    color: blockBg === "#f8fafc" ? "#94a3b8" : "#ffffff",
                    transition: "all 0.3s ease",
                    boxShadow: isDamaged && healProgress >= 0.8 ? "0 0 10px #22c55e" : "none",
                  }}
                >
                  {blockText}
                </div>
              );
            })}
          </div>

          {/* Real-time Math Formula Pill */}
          <div
            style={{
              width: "100%",
              backgroundColor: "#0f172a",
              borderRadius: 12,
              padding: "10px 16px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ color: "#22c55e", fontFamily: "monospace", fontSize: 13 }}>$</span>
              <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 13, color: "#38bdf8", fontWeight: 700 }}>
                S_i = Σ r_j · α^(i·j) ⟹ Missing Bytes Solved!
              </span>
            </div>
            <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "#22c55e", fontWeight: 800 }}>
              PASS
            </span>
          </div>
        </div>

        {/* Bottom Explainer Pill */}
        <div
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.9)",
            border: "1.5px solid rgba(255, 255, 255, 0.2)",
            borderRadius: 12,
            padding: "8px 20px",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span style={{ fontSize: 16 }}>💡</span>
          <span
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: 14,
              color: "#e2e8f0",
              fontWeight: 700,
            }}
          >
            Camera does not "read" missing pixels — it calculates them out of thin air using algebra!
          </span>
        </div>
      </div>
    </SceneLayout>
  );
};
