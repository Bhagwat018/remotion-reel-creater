import React from "react";
import { spring, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneLayout } from "../../components/SceneLayout";

export interface SmeRuleOutroCtaSceneProps {
  id?: string;
  leadIn?: string;
  headline?: string;
  sub?: string;
  brollVideo?: string;
  durationInFrames: number;
}

export const SmeRuleOutroCtaScene: React.FC<SmeRuleOutroCtaSceneProps> = ({
  id,
  leadIn = "📜 THE GOLDEN SME IPO RULE",
  headline = "RULE: GMP > 30% TABHI APPLY! *CAPITAL SAFE RAKHO*",
  sub = "Never Risk Big Capital on Thin SME Margins",
  brollVideo = "broll/nasdaq_stock_ticker.mp4",
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = interpolate(
    spring({ frame, fps, config: { damping: 12, stiffness: 140 } }),
    [0, 1],
    [0.92, 1]
  );

  const buttonPulse = Math.sin(frame * 0.18) * 0.05 + 1;

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
          maxWidth: 980,
          display: "flex",
          flexDirection: "column",
          gap: 18,
          alignItems: "stretch",
          marginTop: 6,
          zIndex: 10,
        }}
      >
        {/* GOLDEN SME RULE BADGE POD */}
        <div style={{ display: "flex", justifyContent: "center", transform: `scale(${entrance})` }}>
          <div
            style={{
              padding: "16px 32px",
              backgroundColor: "rgba(245, 158, 11, 0.22)",
              border: "3.5px solid #f59e0b",
              borderRadius: 22,
              color: "#ffffff",
              fontFamily: "monospace",
              fontSize: 24,
              fontWeight: 900,
              letterSpacing: 1.5,
              boxShadow: "0 0 35px rgba(245, 158, 11, 0.5)",
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            <span style={{ fontSize: 32 }}>🛡️</span>
            <span>RULE: GMP &gt; 30% TABHI APPLY!</span>
          </div>
        </div>

        {/* AUDIENCE POLL CARD */}
        <div
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.94)",
            border: "3px solid #38bdf8",
            borderRadius: 24,
            padding: "22px 28px",
            boxShadow: "0 16px 45px rgba(0,0,0,0.8)",
          }}
        >
          <div
            style={{
              color: "#38bdf8",
              fontSize: 16,
              fontFamily: "monospace",
              fontWeight: 900,
              textAlign: "center",
              marginBottom: 12,
            }}
          >
            KYA AAP WATRANA RENTALS ME APPLY KAROGE? 👇
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {/* AVOID OPTION */}
            <div
              style={{
                backgroundColor: "rgba(239, 68, 68, 0.22)",
                border: "2.5px solid #ef4444",
                borderRadius: 18,
                padding: "14px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 28 }}>🚫</div>
              <div style={{ color: "#ffffff", fontWeight: 900, fontSize: 22, marginTop: 4 }}>
                AVOID
              </div>
              <div style={{ color: "#fca5a5", fontSize: 13, marginTop: 2, fontWeight: 700 }}>
                Capital Safe Rakho
              </div>
            </div>

            {/* APPLY OPTION */}
            <div
              style={{
                backgroundColor: "rgba(251, 191, 36, 0.22)",
                border: "2.5px solid #fbbf24",
                borderRadius: 18,
                padding: "14px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 28 }}>🎲</div>
              <div style={{ color: "#ffffff", fontWeight: 900, fontSize: 22, marginTop: 4 }}>
                APPLY
              </div>
              <div style={{ color: "#fde68a", fontSize: 13, marginTop: 2, fontWeight: 700 }}>
                High SME Risk
              </div>
            </div>
          </div>
        </div>

        {/* GLOWING FOLLOW CTA BUTTON */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              padding: "16px 36px",
              backgroundColor: "#10b981",
              border: "3.5px solid #ffffff",
              borderRadius: 999,
              color: "#0f172a",
              fontWeight: 900,
              fontSize: 22,
              letterSpacing: 1,
              boxShadow: "0 0 40px rgba(16, 185, 129, 0.8)",
              display: "flex",
              alignItems: "center",
              gap: 12,
              transform: `scale(${buttonPulse})`,
            }}
          >
            <span>FOLLOW @techwith.genz</span>
            <span style={{ fontSize: 26 }}>🔥</span>
          </div>
        </div>
      </div>
    </SceneLayout>
  );
};
