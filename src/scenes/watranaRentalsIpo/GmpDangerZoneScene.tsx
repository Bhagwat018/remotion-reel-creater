import React from "react";
import { spring, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneLayout } from "../../components/SceneLayout";

export interface GmpDangerZoneSceneProps {
  id?: string;
  leadIn?: string;
  headline?: string;
  sub?: string;
  brollVideo?: string;
  durationInFrames: number;
}

export const GmpDangerZoneScene: React.FC<GmpDangerZoneSceneProps> = ({
  id,
  leadIn = "🚨 GREY MARKET PREMIUM X-RAY",
  headline = "GMP SIRF 10%! *DEDH LAKH RISK PAR SIRF ₹14,000 GAIN?*",
  sub = "Extreme Risk-Reward Asymmetry in SME Category",
  brollVideo = "broll/cash_counter_rollers.mp4",
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = interpolate(
    spring({ frame, fps, config: { damping: 12, stiffness: 140 } }),
    [0, 1],
    [0.90, 1]
  );

  const cardEntrance = interpolate(
    spring({ frame: Math.max(0, frame - 5), fps, config: { damping: 12, stiffness: 130 } }),
    [0, 1],
    [0.88, 1]
  );

  const pulse = Math.sin(frame * 0.22) * 0.05 + 1;
  const glowPulse = (Math.sin(frame * 0.16) + 1) * 0.5;

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
          gap: 16,
          alignItems: "stretch",
          marginTop: 6,
          zIndex: 10,
        }}
      >
        {/* BIG LIVE GMP DANGER GAUGE */}
        <div
          style={{
            backgroundColor: "rgba(10, 15, 30, 0.96)",
            border: "3.5px solid #ef4444",
            borderRadius: 24,
            padding: "20px 28px",
            boxShadow: `0 20px 60px rgba(239, 68, 68, 0.4)`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            transform: `scale(${entrance})`,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Top hazard bar */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 5,
              background: "linear-gradient(90deg, #ef4444, #f59e0b, #ef4444)",
            }}
          />

          <div>
            <div style={{ color: "#94a3b8", fontSize: 14, fontFamily: "monospace", fontWeight: 800 }}>
              LIVE GREY MARKET PREMIUM (SME)
            </div>
            <div
              style={{
                color: "#ffffff",
                fontSize: 48,
                fontWeight: 900,
                marginTop: 2,
                display: "flex",
                alignItems: "baseline",
                gap: 12,
              }}
            >
              <span
                style={{
                  color: "#ef4444",
                  fontFamily: "monospace",
                  textShadow: `0 0 ${15 + glowPulse * 15}px rgba(239, 68, 68, 0.8)`,
                }}
              >
                +10%
              </span>
              <span style={{ fontSize: 22, color: "#fbbf24", fontWeight: 800 }}>(EXTREMELY WEAK)</span>
            </div>
          </div>

          <div
            style={{
              backgroundColor: "rgba(239, 68, 68, 0.25)",
              border: "2.5px solid #ef4444",
              borderRadius: 16,
              padding: "12px 20px",
              textAlign: "center",
              transform: `scale(${pulse})`,
              boxShadow: "0 0 20px rgba(239, 68, 68, 0.6)",
            }}
          >
            <div style={{ color: "#fca5a5", fontSize: 12, fontFamily: "monospace", fontWeight: 800 }}>SENTIMENT</div>
            <div style={{ color: "#ef4444", fontSize: 20, fontWeight: 900 }}>DANGER ZONE</div>
          </div>
        </div>

        {/* MASSIVE CAPITAL ASYMMETRY CARD */}
        <div
          style={{
            backgroundColor: "rgba(10, 15, 30, 0.96)",
            border: "3.5px solid #38bdf8",
            borderRadius: 24,
            padding: "24px 28px",
            boxShadow: "0 18px 50px rgba(0,0,0,0.8)",
            transform: `scale(${cardEntrance})`,
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto 1fr",
              gap: 16,
              alignItems: "center",
              textAlign: "center",
            }}
          >
            {/* CAPITAL AT RISK */}
            <div
              style={{
                backgroundColor: "rgba(15, 23, 42, 0.85)",
                border: "2.5px solid #38bdf8",
                borderRadius: 20,
                padding: "20px 16px",
              }}
            >
              <div style={{ color: "#38bdf8", fontSize: 14, fontFamily: "monospace", fontWeight: 800 }}>
                CAPITAL AT RISK
              </div>
              <div style={{ color: "#ffffff", fontSize: 40, fontWeight: 900, marginTop: 4, fontFamily: "monospace" }}>
                ₹1,47,000
              </div>
              <div style={{ color: "#94a3b8", fontSize: 13, marginTop: 2, fontWeight: 600 }}>
                Dedh Lakh Blocked
              </div>
            </div>

            {/* VS */}
            <div
              style={{
                width: 50,
                height: 50,
                borderRadius: "50%",
                backgroundColor: "rgba(239, 68, 68, 0.2)",
                border: "2px solid #ef4444",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
                color: "#ef4444",
                fontWeight: 900,
              }}
            >
              ⚡
            </div>

            {/* EXPECTED GAIN */}
            <div
              style={{
                backgroundColor: "rgba(15, 23, 42, 0.85)",
                border: "2.5px solid #ef4444",
                borderRadius: 20,
                padding: "20px 16px",
              }}
            >
              <div style={{ color: "#ef4444", fontSize: 14, fontFamily: "monospace", fontWeight: 800 }}>
                EXPECTED GAIN
              </div>
              <div style={{ color: "#ffffff", fontSize: 40, fontWeight: 900, marginTop: 4, fontFamily: "monospace" }}>
                ~₹14,000
              </div>
              <div style={{ color: "#f87171", fontSize: 13, marginTop: 2, fontWeight: 600 }}>
                A Mere 10% Return
              </div>
            </div>
          </div>

          {/* DANGER PUNCHLINE */}
          <div
            style={{
              marginTop: 18,
              padding: "14px 22px",
              backgroundColor: "rgba(239, 68, 68, 0.25)",
              border: "2.5px solid #ef4444",
              borderRadius: 16,
              textAlign: "center",
              color: "#ffffff",
              fontSize: 18,
              fontWeight: 900,
              boxShadow: `0 0 ${15 + glowPulse * 15}px rgba(239, 68, 68, 0.5)`,
            }}
          >
            🚨 RISK: ₹1.47 LAKH VS REWARD: ₹14,000 = 100% DANGEROUS!
          </div>
        </div>
      </div>
    </SceneLayout>
  );
};
