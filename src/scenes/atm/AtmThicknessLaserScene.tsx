import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneLayout } from "../../components/SceneLayout";

export interface AtmThicknessLaserSceneProps {
  id?: string;
  leadIn?: string;
  headline?: string;
  brollVideo?: string;
  durationInFrames: number;
}

export const AtmThicknessLaserScene: React.FC<AtmThicknessLaserSceneProps> = ({
  id,
  leadIn = "📐 LAYER 3: OPTICAL LASER CALIPER",
  headline = "TEESRA: LASER SENSOR *100% PURE COTTON*",
  brollVideo = "broll/cotton_currency_fiber.mp4",
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

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
        {/* Laser Micrometer Header */}
        <div
          style={{
            width: "100%",
            backgroundColor: "rgba(15, 23, 42, 0.95)",
            border: "2px solid #22c55e",
            borderRadius: 18,
            padding: "12px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 10px 30px rgba(34, 197, 94, 0.4)",
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
                LASER MICROMETER CALIPER
              </div>
              <div
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: 11,
                  color: "#86efac",
                }}
              >
                Measurement Precision: ±0.002mm • Speed: 50,000 pulses/sec
              </div>
            </div>
          </div>
          <div
            style={{
              padding: "4px 10px",
              backgroundColor: "rgba(34, 197, 94, 0.2)",
              border: "1.5px solid #22c55e",
              borderRadius: 6,
              fontFamily: "JetBrains Mono, monospace",
              fontWeight: 800,
              fontSize: 12,
              color: "#bbf7d0",
            }}
          >
            PRECISION: 0.110 mm
          </div>
        </div>

        {/* High-Contrast Neo-Brutalist Comparison Cards */}
        <div
          style={{
            width: "100%",
            display: "flex",
            gap: 14,
            justifyContent: "center",
          }}
        >
          {/* Fake Note / Wood Pulp */}
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
                ❌ FAKE: WOOD PULP
              </span>
              <span
                style={{
                  padding: "2px 8px",
                  backgroundColor: "#fee2e2",
                  color: "#b91c1c",
                  border: "1.5px solid #ef4444",
                  borderRadius: 4,
                  fontSize: 12,
                  fontFamily: "JetBrains Mono, monospace",
                  fontWeight: 900,
                }}
              >
                0.18 mm
              </span>
            </div>

            <div
              style={{
                height: 90,
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
              <div style={{ fontSize: 24 }}>🌲</div>
              <div
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: 12,
                  color: "#991b1b",
                  fontWeight: 800,
                  textAlign: "center",
                }}
              >
                Ordinary Tree Paper<br />
                <strong style={{ color: "#dc2626" }}>Too Thick & Fragile</strong>
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
              Scammers use standard pulp. Absorbs water & tears easily.
            </div>
          </div>

          {/* Real Banknote / Pure Cotton */}
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
                ✅ ASLI: 100% COTTON
              </span>
              <span
                style={{
                  padding: "2px 8px",
                  backgroundColor: "#dcfce7",
                  color: "#15803d",
                  border: "1.5px solid #22c55e",
                  borderRadius: 4,
                  fontSize: 12,
                  fontFamily: "JetBrains Mono, monospace",
                  fontWeight: 900,
                }}
              >
                0.11 mm
              </span>
            </div>

            <div
              style={{
                height: 90,
                backgroundColor: "#f0fdf4",
                borderRadius: 10,
                border: "1.5px solid #22c55e",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 4,
              }}
            >
              <div style={{ fontSize: 24 }}>🧵</div>
              <div
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: 12,
                  color: "#14532d",
                  fontWeight: 800,
                  textAlign: "center",
                }}
              >
                100% Cotton Rag Weave<br />
                <strong style={{ color: "#16a34a" }}>Exact 0.110mm Caliper</strong>
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
              High-tensile woven cotton survives 2,500 double folds & water!
            </div>
          </div>
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
            Banknotes aren&apos;t paper at all — they are 100% pure woven cotton fabric!
          </span>
        </div>
      </div>
    </SceneLayout>
  );
};
