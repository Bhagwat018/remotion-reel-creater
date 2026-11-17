import React from "react";
import { spring, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneLayout } from "../../components/SceneLayout";

export interface MegaIpoHookSceneProps {
  id?: string;
  leadIn?: string;
  headline?: string;
  brollVideo?: string;
  durationInFrames: number;
}

export const MegaIpoHookScene: React.FC<MegaIpoHookSceneProps> = ({
  id,
  leadIn = "🚨 MEGA TECH IPO ALERT • 2026",
  headline = "HYUNDAI IPO BHOOL JAO! *DUNIYA KA SABSE BADA AI IPO AA RAHA HAI!*",
  brollVideo = "broll/trading_floor_screens.mp4",
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = interpolate(
    spring({ frame, fps, config: { damping: 14, stiffness: 130 } }),
    [0, 1],
    [0.96, 1]
  );

  const cardEntrance = interpolate(
    spring({ frame: Math.max(0, frame - 3), fps, config: { damping: 14, stiffness: 120 } }),
    [0, 1],
    [0.94, 1]
  );

  const pulse = Math.sin(frame * 0.15) * 0.03 + 1;

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
          marginTop: 10,
          zIndex: 10,
        }}
      >
        {/* TOP STATUS PILL */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              padding: "8px 22px",
              backgroundColor: "rgba(239, 68, 68, 0.25)",
              border: "2px solid #ef4444",
              borderRadius: 999,
              color: "#ffffff",
              fontFamily: "monospace",
              fontSize: 22,
              fontWeight: 900,
              letterSpacing: 2,
              boxShadow: "0 0 25px rgba(239, 68, 68, 0.5)",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <span style={{ color: "#ef4444", fontSize: 26 }}>⚡</span>
            <span>HISTORIC WALL STREET LISTING</span>
          </div>
        </div>

        {/* COMPARISON CARDS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            gap: 14,
            alignItems: "center",
            transform: `scale(${cardEntrance})`,
          }}
        >
          {/* HYUNDAI CARD */}
          <div
            style={{
              backgroundColor: "rgba(15, 23, 42, 0.88)",
              border: "3px solid #64748b",
              borderRadius: 20,
              padding: "20px 16px",
              boxShadow: "0 12px 30px rgba(0,0,0,0.7)",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 16, fontWeight: 800, color: "#94a3b8", letterSpacing: 1.5 }}>
              INDIA'S BIGGEST IPO
            </div>
            <div style={{ fontSize: 28, fontWeight: 900, color: "#ffffff", marginTop: 6 }}>
              HYUNDAI
            </div>
            <div
              style={{
                fontSize: 32,
                fontWeight: 900,
                color: "#38bdf8",
                marginTop: 8,
                fontFamily: "monospace",
              }}
            >
              ₹27,870 CR
            </div>
            <div style={{ fontSize: 15, color: "#cbd5e1", marginTop: 4 }}>($3.3 Billion)</div>
            <div
              style={{
                marginTop: 10,
                padding: "4px 10px",
                backgroundColor: "rgba(100, 116, 139, 0.3)",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 700,
                color: "#e2e8f0",
              }}
            >
              Old Record Holder
            </div>
          </div>

          {/* VS BADGE */}
          <div
            style={{
              width: 58,
              height: 58,
              borderRadius: "50%",
              backgroundColor: "#ef4444",
              border: "3px solid #ffffff",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              fontWeight: 900,
              boxShadow: "0 0 20px rgba(239, 68, 68, 0.9)",
              transform: `scale(${pulse})`,
            }}
          >
            VS
          </div>

          {/* ANTHROPIC CARD */}
          <div
            style={{
              backgroundColor: "rgba(15, 23, 42, 0.92)",
              border: "3px solid #10b981",
              borderRadius: 20,
              padding: "20px 16px",
              boxShadow: "0 12px 35px rgba(16, 185, 129, 0.4)",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 16, fontWeight: 800, color: "#34d399", letterSpacing: 1.5 }}>
              WORLD'S BIGGEST AI IPO
            </div>
            <div style={{ fontSize: 28, fontWeight: 900, color: "#ffffff", marginTop: 6 }}>
              ANTHROPIC
            </div>
            <div
              style={{
                fontSize: 32,
                fontWeight: 900,
                color: "#10b981",
                marginTop: 8,
                fontFamily: "monospace",
                textShadow: "0 0 15px rgba(16, 185, 129, 0.8)",
              }}
            >
              $1.5 TRILLION
            </div>
            <div style={{ fontSize: 15, color: "#a7f3d0", marginTop: 4 }}>(₹125 Lakh Crore!)</div>
            <div
              style={{
                marginTop: 10,
                padding: "4px 10px",
                backgroundColor: "rgba(16, 185, 129, 0.25)",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 800,
                color: "#6ee7b7",
                border: "1px solid #10b981",
              }}
            >
              🔥 20X LARGER
            </div>
          </div>
        </div>

        {/* BOTTOM CALLOUT */}
        <div
          style={{
            transform: `scale(${entrance})`,
            backgroundColor: "rgba(0, 0, 0, 0.85)",
            border: "2px solid #eab308",
            borderRadius: 16,
            padding: "14px 20px",
            textAlign: "center",
            boxShadow: "0 6px 20px rgba(0,0,0,0.6)",
          }}
        >
          <span style={{ fontSize: 20, fontWeight: 800, color: "#fef08a" }}>
            ⚡ 400 Panno Ka S-1 Prospectus Secretly Filed With US SEC!
          </span>
        </div>
      </div>
    </SceneLayout>
  );
};
