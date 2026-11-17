import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneLayout } from "../../components/SceneLayout";

export interface AtmUvSpectrumSceneProps {
  id?: string;
  leadIn?: string;
  headline?: string;
  brollVideo?: string;
  durationInFrames: number;
}

export const AtmUvSpectrumScene: React.FC<AtmUvSpectrumSceneProps> = ({
  id,
  leadIn = "🔦 LAYER 1: 365nm OPTICAL SENSOR",
  headline = "PEHLA: UV LIGHT *CHUPI GLOWING INK*",
  brollVideo = "broll/uv_currency_glow.mp4",
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  const glowPulse = Math.sin(frame * 0.15) * 0.2 + 0.8;

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
          alignItems: "center",
          marginTop: 6,
          transform: `scale(${entrance})`,
        }}
      >
        {/* UV Telemetry Header */}
        <div
          style={{
            width: "100%",
            backgroundColor: "rgba(15, 23, 42, 0.95)",
            border: "2px solid #a855f7",
            borderRadius: 18,
            padding: "12px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 10px 30px rgba(168, 85, 247, 0.4)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 28 }}>🔬</span>
            <div>
              <div
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontWeight: 900,
                  fontSize: 17,
                  color: "#ffffff",
                }}
              >
                PHOTO-LUMINESCENT SPECTRUM ANALYSIS
              </div>
              <div
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: 11,
                  color: "#c084fc",
                }}
              >
                Excitation: 365nm UV-A • Emission: 530nm Neon Phosphor Glow
              </div>
            </div>
          </div>
          <div
            style={{
              padding: "4px 10px",
              backgroundColor: "rgba(168, 85, 247, 0.2)",
              border: "1.5px solid #a855f7",
              borderRadius: 6,
              fontFamily: "JetBrains Mono, monospace",
              fontWeight: 800,
              fontSize: 12,
              color: "#e9d5ff",
            }}
          >
            365nm UV ACTIVE
          </div>
        </div>

        {/* High Contrast Neo-Brutalist Cards */}
        <div
          style={{
            width: "100%",
            display: "flex",
            gap: 14,
            justifyContent: "center",
          }}
        >
          {/* Fake Note / Normal Light */}
          <div
            style={{
              flex: 1,
              backgroundColor: "rgba(255, 255, 255, 0.98)",
              border: "3px solid #ef4444",
              borderRadius: 16,
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              gap: 10,
              boxShadow: "0 8px 24px rgba(239, 68, 68, 0.3)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontWeight: 900,
                  fontSize: 15,
                  color: "#b91c1c",
                }}
              >
                ❌ FAKE NOTE
              </span>
              <span
                style={{
                  padding: "2px 8px",
                  backgroundColor: "#fee2e2",
                  color: "#b91c1c",
                  border: "1.5px solid #ef4444",
                  borderRadius: 4,
                  fontSize: 11,
                  fontFamily: "JetBrains Mono, monospace",
                  fontWeight: 900,
                }}
              >
                NO GLOW
              </span>
            </div>

            <div
              style={{
                height: 95,
                backgroundColor: "#fff1f2",
                borderRadius: 10,
                border: "1.5px dashed #f87171",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 4,
              }}
            >
              <div style={{ fontSize: 24, opacity: 0.5 }}>📄</div>
              <div
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: 12,
                  color: "#991b1b",
                  fontWeight: 800,
                  textAlign: "center",
                }}
              >
                Ordinary Inkjet Dye<br />
                <strong style={{ color: "#dc2626" }}>0% Phosphor Response</strong>
              </div>
            </div>

            <div
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 11,
                color: "#475569",
                fontWeight: 600,
              }}
            >
              Standard ink has zero fluorophores. Absorbs UV without light emission.
            </div>
          </div>

          {/* Authentic Banknote / 365nm Glow */}
          <div
            style={{
              flex: 1,
              backgroundColor: "rgba(255, 255, 255, 0.98)",
              border: "3px solid #22c55e",
              borderRadius: 16,
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              gap: 10,
              boxShadow: "0 8px 30px rgba(34, 197, 94, 0.35)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontWeight: 900,
                  fontSize: 15,
                  color: "#15803d",
                }}
              >
                ✅ ASLI BANKNOTE
              </span>
              <span
                style={{
                  padding: "2px 8px",
                  backgroundColor: "#dcfce7",
                  color: "#15803d",
                  border: "1.5px solid #22c55e",
                  borderRadius: 4,
                  fontSize: 11,
                  fontFamily: "JetBrains Mono, monospace",
                  fontWeight: 900,
                }}
              >
                NEON GLOW
              </span>
            </div>

            <div
              style={{
                height: 95,
                backgroundColor: "#020617",
                borderRadius: 10,
                border: "2px solid #22c55e",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
                boxShadow: `0 0 20px rgba(34, 197, 94, ${glowPulse * 0.5})`,
              }}
            >
              <div
                style={{
                  fontSize: 26,
                  fontWeight: 900,
                  fontFamily: "Space Grotesk, sans-serif",
                  color: "#4ade80",
                  textShadow: `0 0 15px #22c55e, 0 0 30px #22c55e`,
                }}
              >
                ₹ 500 RBI
              </div>
              <div
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: 10,
                  color: "#86efac",
                }}
              >
                ★ Invisible Fibers Glowing ★
              </div>
            </div>

            <div
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 11,
                color: "#475569",
                fontWeight: 600,
              }}
            >
              Embedded fluorophores light up under 365nm UV in &lt;10 milliseconds!
            </div>
          </div>
        </div>

        {/* Bottom Explainer */}
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
            Optical sensors instantly flag zero UV response as counterfeit!
          </span>
        </div>
      </div>
    </SceneLayout>
  );
};
