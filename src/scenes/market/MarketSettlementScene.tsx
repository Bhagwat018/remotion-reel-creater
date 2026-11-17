import React from "react";
import { spring, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneLayout } from "../../components/SceneLayout";

export interface MarketSettlementSceneProps {
  id?: string;
  leadIn?: string;
  headline?: string;
  brollVideo?: string;
  durationInFrames: number;
}

export const MarketSettlementScene: React.FC<MarketSettlementSceneProps> = ({
  id,
  leadIn = "🛡️ SEBI RADAR & T+1 DEPOSITORY",
  headline = "SEBI FRAUD CHECK + *T+1 DEMAT VAULT SETTLEMENT!*",
  brollVideo = "broll/cyber_radar_vault.mp4",
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const card1Spring = spring({
    frame: frame - 2,
    fps,
    config: { damping: 14, stiffness: 130 },
  });

  const card2Spring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 14, stiffness: 120 },
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
          gap: 12,
          alignItems: "stretch",
          marginTop: 6,
          zIndex: 10,
        }}
      >
        {/* CARD 1: SEBI FRAUD RADAR */}
        <div
          style={{
            transform: `scale(${card1Spring}) translateY(${(1 - card1Spring) * 16}px)`,
            opacity: card1Spring,
            backgroundColor: "rgba(15, 23, 42, 0.94)",
            backdropFilter: "blur(20px)",
            border: "2px solid rgba(56, 189, 248, 0.45)",
            borderRadius: 20,
            padding: "18px 24px",
            display: "flex",
            flexDirection: "column",
            gap: 10,
            boxShadow: "0 12px 35px rgba(0,0,0,0.5)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  backgroundColor: "rgba(56, 189, 248, 0.15)",
                  border: "1.5px solid #38bdf8",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 24,
                }}
              >
                📡
              </div>
              <div>
                <div style={{ fontFamily: "system-ui, sans-serif", fontSize: 24, fontWeight: 900, color: "#ffffff" }}>
                  SEBI Surveillance Radar
                </div>
                <div style={{ fontFamily: "monospace", fontSize: 15, color: "#38bdf8", fontWeight: 700 }}>
                  Algorithmic Fraud & Circular Trade Check
                </div>
              </div>
            </div>

            <div
              style={{
                padding: "6px 14px",
                backgroundColor: "rgba(16, 185, 129, 0.2)",
                border: "1px solid #10b981",
                borderRadius: 999,
                color: "#34d399",
                fontFamily: "monospace",
                fontSize: 14,
                fontWeight: 800,
              }}
            >
              ● 100% CLEAN TRADE
            </div>
          </div>
        </div>

        {/* CARD 2: T+1 DEMAT DEPOSIT VAULT */}
        <div
          style={{
            transform: `scale(${card2Spring}) translateY(${(1 - card2Spring) * 16}px)`,
            opacity: card2Spring,
            backgroundColor: "rgba(15, 23, 42, 0.94)",
            backdropFilter: "blur(20px)",
            border: "2.5px solid rgba(34, 197, 94, 0.5)",
            borderRadius: 20,
            padding: "18px 24px",
            display: "flex",
            flexDirection: "column",
            gap: 10,
            boxShadow: "0 16px 40px rgba(0,0,0,0.6), 0 0 25px rgba(34, 197, 94, 0.2)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  backgroundColor: "rgba(34, 197, 94, 0.15)",
                  border: "1.5px solid #22c55e",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 24,
                }}
              >
                🏛️
              </div>
              <div>
                <div style={{ fontFamily: "system-ui, sans-serif", fontSize: 24, fontWeight: 900, color: "#ffffff" }}>
                  T+1 Demat Vault Deposit
                </div>
                <div style={{ fontFamily: "monospace", fontSize: 15, color: "#4ade80", fontWeight: 700 }}>
                  NSDL & CDSL Digital Custody Lock
                </div>
              </div>
            </div>

            <div
              style={{
                padding: "6px 14px",
                backgroundColor: "rgba(34, 197, 94, 0.25)",
                border: "1px solid #22c55e",
                borderRadius: 999,
                color: "#6ee7b7",
                fontFamily: "monospace",
                fontSize: 14,
                fontWeight: 800,
              }}
            >
              SHARES DELIVERED ✔
            </div>
          </div>

          <div
            style={{
              backgroundColor: "rgba(10, 15, 30, 0.8)",
              borderRadius: 12,
              padding: "10px 16px",
              fontFamily: "monospace",
              fontSize: 16,
              color: "#94a3b8",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>Settlement Cycle: <b style={{ color: "#38bdf8" }}>T+1 (Fastest in World)</b></span>
            <span>Security: <b style={{ color: "#34d399" }}>Govt Regulated</b></span>
          </div>
        </div>
      </div>
    </SceneLayout>
  );
};
