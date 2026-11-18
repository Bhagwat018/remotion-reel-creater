import React from "react";
import { spring, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneLayout } from "../../components/SceneLayout";

export interface SmeLotSizeDebtSceneProps {
  id?: string;
  leadIn?: string;
  headline?: string;
  sub?: string;
  brollVideo?: string;
  durationInFrames: number;
}

export const SmeLotSizeDebtScene: React.FC<SmeLotSizeDebtSceneProps> = ({
  id,
  leadIn = "⚠️ THE SME IPO REALITY CHECK",
  headline = "₹1,47,000 MINIMUM LOT! *BHARI KARZA & HIGH CAPITAL RISK*",
  sub = "SME Minimum Lot Requires 10x More Capital",
  brollVideo = "broll/heavy_industrial_crane.mp4",
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = interpolate(
    spring({ frame, fps, config: { damping: 12, stiffness: 140 } }),
    [0, 1],
    [0.92, 1]
  );

  const cardEntrance = interpolate(
    spring({ frame: Math.max(0, frame - 5), fps, config: { damping: 12, stiffness: 130 } }),
    [0, 1],
    [0.90, 1]
  );

  const pulse = Math.sin(frame * 0.22) * 0.04 + 1;

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
        {/* SHOCK CAPITAL COMPARISON CARDS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto 1.3fr",
            gap: 16,
            alignItems: "center",
            transform: `scale(${entrance})`,
          }}
        >
          {/* NORMAL MAINBOARD IPO */}
          <div
            style={{
              backgroundColor: "rgba(15, 23, 42, 0.94)",
              border: "2.5px solid #64748b",
              borderRadius: 22,
              padding: "22px 18px",
              textAlign: "center",
              boxShadow: "0 12px 35px rgba(0,0,0,0.6)",
            }}
          >
            <div style={{ color: "#94a3b8", fontSize: 13, fontFamily: "monospace", fontWeight: 800 }}>
              NORMAL MAINBOARD IPO
            </div>
            <div style={{ color: "#ffffff", fontSize: 34, fontWeight: 900, marginTop: 6 }}>
              ₹15,000
            </div>
            <div style={{ color: "#38bdf8", fontSize: 13, marginTop: 4, fontWeight: 700 }}>
              1 Retail Lot
            </div>
          </div>

          {/* 10X JUMP BADGE */}
          <div
            style={{
              backgroundColor: "#ef4444",
              color: "#ffffff",
              padding: "10px 14px",
              borderRadius: 12,
              fontWeight: 900,
              fontSize: 16,
              fontFamily: "monospace",
              boxShadow: "0 0 25px rgba(239, 68, 68, 0.8)",
              transform: `scale(${pulse})`,
              textAlign: "center",
            }}
          >
            10X
            <br />
            JUMP
          </div>

          {/* SME IPO SHOCK LOT */}
          <div
            style={{
              backgroundColor: "rgba(15, 23, 42, 0.95)",
              border: "4px solid #ef4444",
              borderRadius: 24,
              padding: "24px 20px",
              textAlign: "center",
              boxShadow: "0 18px 50px rgba(239, 68, 68, 0.5)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 6,
                background: "linear-gradient(90deg, #ef4444, #fbbf24)",
              }}
            />
            <div style={{ color: "#ef4444", fontSize: 14, fontFamily: "monospace", fontWeight: 900 }}>
              WATRANA SME MINIMUM LOT
            </div>
            <div
              style={{
                color: "#ffffff",
                fontSize: 44,
                fontWeight: 900,
                marginTop: 6,
                letterSpacing: "-0.02em",
              }}
            >
              ₹1,47,000!
            </div>
            <div style={{ color: "#fca5a5", fontSize: 14, marginTop: 4, fontWeight: 700 }}>
              Fixed Block Capital (No Retail Flexibility)
            </div>
          </div>
        </div>

        {/* HEAVY DEBT & HIGH CAPEX WARNING POD */}
        <div
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.94)",
            border: "3px solid #f97316",
            borderRadius: 24,
            padding: "22px 26px",
            boxShadow: "0 16px 45px rgba(249, 115, 22, 0.25)",
            transform: `scale(${cardEntrance})`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ fontSize: 44 }}>💣</span>
            <div style={{ flex: 1 }}>
              <div style={{ color: "#f97316", fontSize: 15, fontFamily: "monospace", fontWeight: 900 }}>
                CRITICAL BALANCE SHEET CONCERN
              </div>
              <div style={{ color: "#ffffff", fontSize: 24, fontWeight: 900, marginTop: 2 }}>
                HEAVY BANK DEBT ON CRANES & MACHINERY!
              </div>
              <div style={{ color: "#cbd5e1", fontSize: 15, marginTop: 6, lineHeight: 1.3 }}>
                High interest payments eat operating margins — if warehouse rental demand slows, interest costs keep ticking!
              </div>
            </div>
          </div>
        </div>
      </div>
    </SceneLayout>
  );
};
