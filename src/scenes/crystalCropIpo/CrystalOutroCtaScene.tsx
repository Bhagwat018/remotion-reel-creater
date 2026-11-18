import React from "react";
import { spring, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneLayout } from "../../components/SceneLayout";

export interface CrystalOutroCtaSceneProps {
  id?: string;
  leadIn?: string;
  headline?: string;
  sub?: string;
  brollVideo?: string;
  durationInFrames: number;
}

export const CrystalOutroCtaScene: React.FC<CrystalOutroCtaSceneProps> = ({
  id,
  leadIn = "🧠 SMART MONEY VERDICT • LISTING GAIN",
  headline = "SMART MONEY VERDICT: AVOID! *KYA AAP APPLY KAROGE?*",
  sub = "Follow @techwith.genz For Share Market Secrets",
  brollVideo = "broll/trading_floor_screens.mp4",
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = interpolate(
    spring({ frame, fps, config: { damping: 14, stiffness: 130 } }),
    [0, 1],
    [0.94, 1]
  );

  const buttonPulse = Math.sin(frame * 0.18) * 0.04 + 1;

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
          marginTop: 6,
          zIndex: 10,
        }}
      >
        {/* FINAL VERDICT STAMP */}
        <div style={{ display: "flex", justifyContent: "center", transform: `scale(${entrance})` }}>
          <div
            style={{
              padding: "12px 28px",
              backgroundColor: "rgba(239, 68, 68, 0.25)",
              border: "3px solid #ef4444",
              borderRadius: 18,
              color: "#ffffff",
              fontFamily: "monospace",
              fontSize: 22,
              fontWeight: 900,
              letterSpacing: 2,
              boxShadow: "0 0 30px rgba(239, 68, 68, 0.5)",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span style={{ fontSize: 28, color: "#ef4444" }}>🚫</span>
            <span>VERDICT: AVOID FOR LISTING GAINS</span>
          </div>
        </div>

        {/* AUDIENCE INTERACTIVE POLL */}
        <div
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.92)",
            border: "2px solid #38bdf8",
            borderRadius: 20,
            padding: "18px 22px",
            boxShadow: "0 12px 35px rgba(0,0,0,0.7)",
          }}
        >
          <div
            style={{
              color: "#38bdf8",
              fontSize: 14,
              fontFamily: "monospace",
              fontWeight: 800,
              textAlign: "center",
              marginBottom: 10,
            }}
          >
            WHAT WOULD YOU DO? VOTE IN COMMENTS 👇
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div
              style={{
                backgroundColor: "rgba(239, 68, 68, 0.2)",
                border: "2px solid #ef4444",
                borderRadius: 14,
                padding: "12px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 24 }}>🚫</div>
              <div style={{ color: "#ffffff", fontWeight: 900, fontSize: 18, marginTop: 4 }}>
                AVOID
              </div>
              <div style={{ color: "#fca5a5", fontSize: 12, marginTop: 2 }}>Smart Money</div>
            </div>

            <div
              style={{
                backgroundColor: "rgba(251, 191, 36, 0.2)",
                border: "2px solid #fbbf24",
                borderRadius: 14,
                padding: "12px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 24 }}>🎲</div>
              <div style={{ color: "#ffffff", fontWeight: 900, fontSize: 18, marginTop: 4 }}>
                APPLY
              </div>
              <div style={{ color: "#fde68a", fontSize: 12, marginTop: 2 }}>High Risk</div>
            </div>
          </div>
        </div>

        {/* FOLLOW CTA PILL */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              padding: "14px 32px",
              backgroundColor: "#10b981",
              border: "3px solid #ffffff",
              borderRadius: 999,
              color: "#0f172a",
              fontWeight: 900,
              fontSize: 20,
              letterSpacing: 1,
              boxShadow: "0 0 35px rgba(16, 185, 129, 0.7)",
              display: "flex",
              alignItems: "center",
              gap: 10,
              transform: `scale(${buttonPulse})`,
            }}
          >
            <span>FOLLOW @techwith.genz</span>
            <span style={{ fontSize: 22 }}>🔥</span>
          </div>
        </div>
      </div>
    </SceneLayout>
  );
};
