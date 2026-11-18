import React from "react";
import { spring, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneLayout } from "../../components/SceneLayout";

export interface GmpRiskTrapSceneProps {
  id?: string;
  leadIn?: string;
  headline?: string;
  sub?: string;
  brollVideo?: string;
  durationInFrames: number;
}

export const GmpRiskTrapScene: React.FC<GmpRiskTrapSceneProps> = ({
  id,
  leadIn = "🚨 GREY MARKET PREMIUM X-RAY",
  headline = "GMP SIRF ₹13 (<5%)! *₹15,000 BLOCK KARKE SIRF ₹700 GAIN?*",
  sub = "Extreme Risk-Reward Trap for Retail Investors",
  brollVideo = "broll/counting_money.mp4",
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = interpolate(
    spring({ frame, fps, config: { damping: 14, stiffness: 130 } }),
    [0, 1],
    [0.94, 1]
  );

  const cardEntrance = interpolate(
    spring({ frame: Math.max(0, frame - 5), fps, config: { damping: 14, stiffness: 120 } }),
    [0, 1],
    [0.92, 1]
  );

  const pulse = Math.sin(frame * 0.2) * 0.04 + 1;

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
        {/* TOP LIVE GMP METER */}
        <div
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.94)",
            border: "3px solid #ef4444",
            borderRadius: 20,
            padding: "16px 22px",
            boxShadow: "0 12px 35px rgba(239, 68, 68, 0.35)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            transform: `scale(${entrance})`,
          }}
        >
          <div>
            <div style={{ color: "#94a3b8", fontSize: 13, fontFamily: "monospace", fontWeight: 700 }}>
              LIVE GREY MARKET PREMIUM
            </div>
            <div
              style={{
                color: "#ffffff",
                fontSize: 34,
                fontWeight: 900,
                marginTop: 2,
                display: "flex",
                alignItems: "baseline",
                gap: 10,
              }}
            >
              <span style={{ color: "#ef4444" }}>+₹13</span>
              <span style={{ fontSize: 20, color: "#fbbf24", fontWeight: 800 }}>(SIRF 4.8%)</span>
            </div>
          </div>

          <div
            style={{
              backgroundColor: "rgba(239, 68, 68, 0.2)",
              border: "2px solid #ef4444",
              borderRadius: 12,
              padding: "8px 16px",
              textAlign: "center",
              transform: `scale(${pulse})`,
            }}
          >
            <div style={{ color: "#fca5a5", fontSize: 11, fontFamily: "monospace" }}>SENTIMENT</div>
            <div style={{ color: "#ef4444", fontSize: 18, fontWeight: 900 }}>DANGER ZONE</div>
          </div>
        </div>

        {/* THE CAPITAL TRAP CALCULATION CARD */}
        <div
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.92)",
            border: "2px solid #64748b",
            borderRadius: 20,
            padding: "20px 22px",
            boxShadow: "0 14px 40px rgba(0,0,0,0.7)",
            transform: `scale(${cardEntrance})`,
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto 1fr",
              gap: 12,
              alignItems: "center",
              textAlign: "center",
            }}
          >
            {/* CAPITAL BLOCKED */}
            <div
              style={{
                backgroundColor: "rgba(30, 41, 59, 0.8)",
                border: "2px solid #38bdf8",
                borderRadius: 16,
                padding: "16px 12px",
              }}
            >
              <div style={{ color: "#38bdf8", fontSize: 13, fontFamily: "monospace", fontWeight: 800 }}>
                CAPITAL BLOCKED
              </div>
              <div style={{ color: "#ffffff", fontSize: 28, fontWeight: 900, marginTop: 4 }}>
                ₹15,000
              </div>
              <div style={{ color: "#94a3b8", fontSize: 12, marginTop: 2 }}>1 Retail Lot</div>
            </div>

            {/* VS ARROW */}
            <div style={{ fontSize: 24, color: "#ef4444", fontWeight: 900 }}>⚡</div>

            {/* EXPECTED GAIN */}
            <div
              style={{
                backgroundColor: "rgba(30, 41, 59, 0.8)",
                border: "2px solid #ef4444",
                borderRadius: 16,
                padding: "16px 12px",
              }}
            >
              <div style={{ color: "#ef4444", fontSize: 13, fontFamily: "monospace", fontWeight: 800 }}>
                LISTING GAIN
              </div>
              <div style={{ color: "#ffffff", fontSize: 28, fontWeight: 900, marginTop: 4 }}>
                ~₹700
              </div>
              <div style={{ color: "#f87171", fontSize: 12, marginTop: 2 }}>Only 4.8% Gain</div>
            </div>
          </div>

          {/* WARNING PUNCHLINE BADGE */}
          <div
            style={{
              marginTop: 16,
              padding: "12px 18px",
              backgroundColor: "rgba(239, 68, 68, 0.22)",
              border: "2px solid #ef4444",
              borderRadius: 14,
              textAlign: "center",
              color: "#ffffff",
              fontSize: 16,
              fontWeight: 800,
              boxShadow: "0 0 20px rgba(239, 68, 68, 0.4)",
            }}
          >
            🚨 ₹15,000 RISK PAR SIRF ₹700 GAIN = 100% BEWAQOOFI!
          </div>
        </div>
      </div>
    </SceneLayout>
  );
};
