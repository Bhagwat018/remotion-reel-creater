import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneLayout } from "../../components/SceneLayout";

export interface BarcodeVsQrSceneProps {
  id?: string;
  leadIn?: string;
  headline?: string;
  brollVideo?: string;
  durationInFrames: number;
}

export const BarcodeVsQrScene: React.FC<BarcodeVsQrSceneProps> = ({
  id,
  leadIn = "⚡ ARCHITECTURE SHOWDOWN",
  headline = "BARCODE VS *QR SUPERPOWER*",
  brollVideo = "broll/barcode_scanner_laser.mp4",
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
          gap: 20,
          alignItems: "center",
          marginTop: 10,
          transform: `scale(${entrance})`,
        }}
      >
        {/* Top Comparison Header */}
        <div
          style={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 18,
          }}
        >
          {/* LEFT: 1D Traditional Barcode */}
          <div
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.96)",
              borderRadius: 22,
              border: "3px solid #ef4444",
              padding: "24px 22px",
              boxShadow: "0 14px 35px rgba(0, 0, 0, 0.4)",
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 900, fontSize: 20, color: "#7f1d1d" }}>
                1D BARCODE
              </span>
              <span
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontWeight: 800,
                  fontSize: 11,
                  color: "#dc2626",
                  backgroundColor: "#fee2e2",
                  padding: "4px 10px",
                  borderRadius: 6,
                }}
              >
                FRAGILE
              </span>
            </div>

            {/* Barcode Graphic */}
            <div
              style={{
                backgroundColor: "#f8fafc",
                border: "1.5px solid #e2e8f0",
                borderRadius: 12,
                padding: "16px 14px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
              }}
            >
              <div style={{ display: "flex", gap: 4, height: 44, alignItems: "center" }}>
                {[3, 1, 4, 2, 1, 5, 2, 1, 4, 2, 3, 1, 2, 4].map((w, idx) => (
                  <div
                    key={idx}
                    style={{
                      width: w * 4,
                      height: "100%",
                      backgroundColor: idx === 6 || idx === 7 ? "#ef4444" : "#0f172a",
                      opacity: idx === 6 || idx === 7 ? 0.3 : 1,
                    }}
                  />
                ))}
              </div>
              <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "#ef4444", fontWeight: 700 }}>
                ⚠️ 1 Scratch = 100% UNREADABLE
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <div style={{ fontSize: 13, color: "#475569" }}>• Single-axis linear encoding</div>
              <div style={{ fontSize: 13, color: "#475569" }}>• Zero mathematical redundancy</div>
              <div style={{ fontSize: 13, color: "#dc2626", fontWeight: 700 }}>• Cannot recover missing bars</div>
            </div>
          </div>

          {/* RIGHT: 2D QR Code */}
          <div
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.96)",
              borderRadius: 22,
              border: "3px solid #10b981",
              padding: "24px 22px",
              boxShadow: "0 14px 35px rgba(0, 0, 0, 0.4)",
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 900, fontSize: 20, color: "#14532d" }}>
                2D QR CODE
              </span>
              <span
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontWeight: 800,
                  fontSize: 11,
                  color: "#15803d",
                  backgroundColor: "#d1fae5",
                  padding: "4px 10px",
                  borderRadius: 6,
                }}
              >
                SELF-HEALING
              </span>
            </div>

            {/* QR Matrix Graphic */}
            <div
              style={{
                backgroundColor: "#f0fdf4",
                border: "1.5px solid #86efac",
                borderRadius: 12,
                padding: "12px 14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span style={{ fontSize: 36 }}>🏁</span>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <span style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 800, fontSize: 15, color: "#166534" }}>
                  UP TO 30% DAMAGE RESISTANT
                </span>
                <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 12, color: "#15803d" }}>
                  Missing bytes mathematically reconstructed
                </span>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <div style={{ fontSize: 13, color: "#475569" }}>• 2-Dimensional X & Y matrix data</div>
              <div style={{ fontSize: 13, color: "#475569" }}>• Multi-layer parity code blocks</div>
              <div style={{ fontSize: 13, color: "#15803d", fontWeight: 700 }}>• Instant self-healing decoder</div>
            </div>
          </div>
        </div>

        {/* Bottom Verdict Pill */}
        <div
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.9)",
            border: "1.5px solid rgba(255, 255, 255, 0.2)",
            borderRadius: 14,
            padding: "10px 24px",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <span style={{ fontSize: 18 }}>💡</span>
          <span
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontWeight: 700,
              fontSize: 15,
              color: "#ffffff",
            }}
          >
            QR code is built like a redundant aerospace system — failure is not an option!
          </span>
        </div>
      </div>
    </SceneLayout>
  );
};

