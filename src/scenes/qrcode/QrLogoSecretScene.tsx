import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneLayout } from "../../components/SceneLayout";

export interface QrLogoSecretSceneProps {
  id?: string;
  leadIn?: string;
  headline?: string;
  brollVideo?: string;
  durationInFrames: number;
}

export const QrLogoSecretScene: React.FC<QrLogoSecretSceneProps> = ({
  id,
  leadIn = "🎨 THE CENTER LOGO HACK",
  headline = "LOGO IS *INTENTIONAL DAMAGE!*",
  brollVideo = "broll/qr_code_payment_scan.mp4",
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
          marginTop: 8,
          transform: `scale(${entrance})`,
        }}
      >
        {/* Main Logo Secret Reveal Card */}
        <div
          style={{
            width: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.98)",
            borderRadius: 24,
            border: "3px solid #8b5cf6",
            padding: "24px 28px",
            boxShadow: "0 16px 45px rgba(0, 0, 0, 0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* QR Code with Center Logo Graphic */}
          <div
            style={{
              position: "relative",
              width: 140,
              height: 140,
              backgroundColor: "#ffffff",
              borderRadius: 18,
              border: "3px solid #0f172a",
              padding: 10,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: "0 8px 24px rgba(139, 92, 246, 0.3)",
            }}
          >
            {/* Corners */}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ width: 28, height: 28, border: "4px solid #0f172a", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 10, height: 10, backgroundColor: "#0f172a", borderRadius: 2 }} />
              </div>
              <div style={{ width: 28, height: 28, border: "4px solid #0f172a", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 10, height: 10, backgroundColor: "#0f172a", borderRadius: 2 }} />
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <div style={{ width: 28, height: 28, border: "4px solid #0f172a", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 10, height: 10, backgroundColor: "#0f172a", borderRadius: 2 }} />
              </div>
            </div>

            {/* Centered Brand Logo Badge */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: `translate(-50%, -50%) scale(${pulse})`,
                width: 52,
                height: 52,
                borderRadius: 12,
                backgroundColor: "#6366f1",
                border: "3px solid #ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 16px rgba(99, 102, 241, 0.5)",
                color: "#ffffff",
                fontSize: 24,
                fontWeight: 900,
              }}
            >
              ⚡
            </div>
          </div>

          {/* Telemetry Breakdown */}
          <div style={{ flex: 1, marginLeft: 26, display: "flex", flexDirection: "column", gap: 8 }}>
            <span
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontWeight: 900,
                fontSize: 12,
                color: "#8b5cf6",
                letterSpacing: "0.08em",
              }}
            >
              ENGINEERING INSIGHT // INTENTIONAL DAMAGE
            </span>

            <div
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontWeight: 900,
                fontSize: 22,
                color: "#0f172a",
                lineHeight: 1.2,
              }}
            >
              Center Logo = 20% Blotted Pixels
            </div>

            <div style={{ fontFamily: "sans-serif", fontSize: 13, color: "#475569", lineHeight: 1.4 }}>
              Scanner ke liye logo koi brand image nahi hai — wo code par "chot" (damage) hai. Error correction use bypass karke scan pass kar deta hai!
            </div>

            <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
              <div style={{ backgroundColor: "#f3e8ff", border: "1px solid #d8b4fe", borderRadius: 6, padding: "4px 10px" }}>
                <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, fontWeight: 800, color: "#7e22ce" }}>
                  LOGO SIZE: 20%
                </span>
              </div>
              <div style={{ backgroundColor: "#dcfce7", border: "1px solid #86efac", borderRadius: 6, padding: "4px 10px" }}>
                <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, fontWeight: 800, color: "#15803d" }}>
                  MAX CAPACITY: 30%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Callout */}
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
            Designers didn't invent logo QR codes — mathematicians solved them in 1960!
          </span>
        </div>
      </div>
    </SceneLayout>
  );
};

