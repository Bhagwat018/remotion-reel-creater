import React from "react";
import { spring, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneLayout } from "../../components/SceneLayout";

export interface MarketOrderMatchingSceneProps {
  id?: string;
  leadIn?: string;
  headline?: string;
  brollVideo?: string;
  durationInFrames: number;
}

export const MarketOrderMatchingScene: React.FC<MarketOrderMatchingSceneProps> = ({
  id,
  leadIn = "⚡ 0.001s ORDER MATCHING ENGINE",
  headline = "BROKER NAHI, NSE/BSE *0.001 SECOND ME ORDER MATCH* KARTA HAI!",
  brollVideo = "broll/server_datacenter_datacable.mp4",
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 130 },
  });

  const isMatched = frame > 40;

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
        {/* DUAL ORDER MATCHING HUD */}
        <div
          style={{
            transform: `scale(${entrance})`,
            opacity: entrance,
            display: "flex",
            gap: 12,
            alignItems: "stretch",
          }}
        >
          {/* BUY SIDE (GREEN) */}
          <div
            style={{
              flex: 1,
              backgroundColor: "rgba(15, 23, 42, 0.94)",
              backdropFilter: "blur(20px)",
              border: "2px solid rgba(34, 197, 94, 0.5)",
              borderRadius: 20,
              padding: "16px 20px",
              display: "flex",
              flexDirection: "column",
              gap: 8,
              boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontFamily: "monospace", fontSize: 16, color: "#34d399", fontWeight: 900 }}>
                BUYER (AAP)
              </span>
              <span style={{ fontSize: 18 }}>🟢</span>
            </div>

            <div style={{ fontFamily: "system-ui, sans-serif", fontSize: 26, fontWeight: 900, color: "#ffffff" }}>
              100 Shares
            </div>

            <div style={{ fontFamily: "monospace", fontSize: 18, color: "#94a3b8" }}>
              Bid: <b style={{ color: "#34d399" }}>₹2,450.00</b>
            </div>

            <div
              style={{
                marginTop: 4,
                padding: "4px 10px",
                backgroundColor: "rgba(34, 197, 94, 0.2)",
                borderRadius: 8,
                textAlign: "center",
                fontFamily: "monospace",
                fontSize: 14,
                color: "#6ee7b7",
                fontWeight: 800,
              }}
            >
              ORDER SENT
            </div>
          </div>

          {/* SELL SIDE (RED) */}
          <div
            style={{
              flex: 1,
              backgroundColor: "rgba(15, 23, 42, 0.94)",
              backdropFilter: "blur(20px)",
              border: "2px solid rgba(239, 68, 68, 0.5)",
              borderRadius: 20,
              padding: "16px 20px",
              display: "flex",
              flexDirection: "column",
              gap: 8,
              boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontFamily: "monospace", fontSize: 16, color: "#f87171", fontWeight: 900 }}>
                SELLER (MARKET)
              </span>
              <span style={{ fontSize: 18 }}>🔴</span>
            </div>

            <div style={{ fontFamily: "system-ui, sans-serif", fontSize: 26, fontWeight: 900, color: "#ffffff" }}>
              100 Shares
            </div>

            <div style={{ fontFamily: "monospace", fontSize: 18, color: "#94a3b8" }}>
              Ask: <b style={{ color: "#f87171" }}>₹2,450.00</b>
            </div>

            <div
              style={{
                marginTop: 4,
                padding: "4px 10px",
                backgroundColor: "rgba(239, 68, 68, 0.2)",
                borderRadius: 8,
                textAlign: "center",
                fontFamily: "monospace",
                fontSize: 14,
                color: "#fca5a5",
                fontWeight: 800,
              }}
            >
              OFFER MATCHED
            </div>
          </div>
        </div>

        {/* HIGH-SPEED MATCHING CORE BOX */}
        <div
          style={{
            backgroundColor: "rgba(10, 15, 30, 0.95)",
            border: isMatched ? "2px solid #38bdf8" : "2px solid rgba(245, 158, 11, 0.5)",
            borderRadius: 18,
            padding: "16px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: isMatched ? "0 0 30px rgba(56, 189, 248, 0.3)" : "none",
            transition: "border 0.2s",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                backgroundColor: "rgba(56, 189, 248, 0.2)",
                border: "1px solid #38bdf8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
              }}
            >
              ⚡
            </div>
            <div>
              <div style={{ fontFamily: "system-ui, sans-serif", fontSize: 22, fontWeight: 900, color: "#ffffff" }}>
                NSE Matching Engine Co-Location
              </div>
              <div style={{ fontFamily: "monospace", fontSize: 15, color: "#38bdf8" }}>
                Latency: <b style={{ color: "#34d399" }}>0.001 Second (1ms)</b>
              </div>
            </div>
          </div>

          <div
            style={{
              padding: "6px 16px",
              borderRadius: 999,
              backgroundColor: isMatched ? "#10b981" : "#f59e0b",
              color: "#030712",
              fontFamily: "monospace",
              fontSize: 15,
              fontWeight: 900,
              boxShadow: isMatched ? "0 0 16px #10b981" : "none",
            }}
          >
            {isMatched ? "TRADE EXECUTED ✔" : "MATCHING..."}
          </div>
        </div>
      </div>
    </SceneLayout>
  );
};
