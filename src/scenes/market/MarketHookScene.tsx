import React from "react";
import { spring, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneLayout } from "../../components/SceneLayout";

export interface MarketHookSceneProps {
  id?: string;
  leadIn?: string;
  headline?: string;
  brollVideo?: string;
  durationInFrames: number;
}

export const MarketHookScene: React.FC<MarketHookSceneProps> = ({
  id,
  leadIn = "🔔 09:15 AM OPENING BELL",
  headline = "ROZ SUBAH ₹1 LAKH CRORE KA SAUDA, *PAR DUKAAN EK BHI NAHI!*",
  brollVideo = "broll/trading_floor_screens.mp4",
  durationInFrames,
}) => {
  console.log("DEBUG_MARKET_HOOK_HEADLINE:", headline);
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Smooth micro-pop that starts visible (no empty white frame 0)
  const rawSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 130 },
  });
  const entrance = interpolate(rawSpring, [0, 1], [0.96, 1]);

  const rawCardSpring = spring({
    frame: Math.max(0, frame - 2),
    fps,
    config: { damping: 14, stiffness: 120 },
  });
  const cardEntrance = interpolate(rawCardSpring, [0, 1], [0.94, 1]);

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
          gap: 14,
          alignItems: "stretch",
          marginTop: 6,
          zIndex: 10,
        }}
      >
        {/* 1. TOP METRIC BADGES */}
        <div
          style={{
            transform: `scale(${entrance})`,
            opacity: entrance,
            display: "flex",
            justifyContent: "center",
            gap: 14,
          }}
        >
          <div
            style={{
              padding: "8px 18px",
              backgroundColor: "rgba(239, 68, 68, 0.2)",
              border: "2px solid #ef4444",
              borderRadius: 999,
              color: "#ffffff",
              fontFamily: "monospace",
              fontSize: 20,
              fontWeight: 800,
              boxShadow: "0 4px 14px rgba(239, 68, 68, 0.4)",
            }}
          >
            <span style={{ color: "#ef4444", textDecoration: "line-through" }}>🏢 0 PHYSICAL SHOPS</span>
          </div>

          <div
            style={{
              padding: "8px 18px",
              backgroundColor: "rgba(34, 197, 94, 0.2)",
              border: "2px solid #22c55e",
              borderRadius: 999,
              color: "#ffffff",
              fontFamily: "monospace",
              fontSize: 20,
              fontWeight: 800,
              boxShadow: "0 4px 14px rgba(34, 197, 94, 0.4)",
            }}
          >
            <span>⚡ 100% INVISIBLE CLOUD</span>
          </div>
        </div>

        {/* 2. HERO VOLUME CARD */}
        <div
          style={{
            transform: `scale(${cardEntrance * pulse}) translateY(${(1 - cardEntrance) * 16}px)`,
            opacity: cardEntrance,
            backgroundColor: "rgba(15, 23, 42, 0.94)",
            backdropFilter: "blur(24px)",
            border: "2.5px solid rgba(34, 197, 94, 0.5)",
            borderRadius: 24,
            padding: "24px 28px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.7), 0 0 35px rgba(34, 197, 94, 0.25)",
          }}
        >
          <div
            style={{
              fontFamily: "monospace",
              fontSize: 18,
              letterSpacing: 2,
              fontWeight: 800,
              color: "#4ade80",
            }}
          >
            NSE + BSE DAILY MARKET TURNOVER
          </div>

          <div
            style={{
              fontFamily: "system-ui, sans-serif",
              fontSize: 54,
              fontWeight: 900,
              color: "#ffffff",
              letterSpacing: -1,
              textShadow: "0 4px 20px rgba(34, 197, 94, 0.6)",
            }}
          >
            ₹1,00,000 CRORE
          </div>

          {/* Live Index Tickers */}
          <div
            style={{
              display: "flex",
              gap: 16,
              width: "100%",
              marginTop: 4,
            }}
          >
            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(10, 15, 30, 0.85)",
                border: "1.5px solid rgba(56, 189, 248, 0.3)",
                borderRadius: 14,
                padding: "12px 16px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontFamily: "monospace",
              }}
            >
              <span style={{ fontSize: 18, color: "#94a3b8", fontWeight: 700 }}>NIFTY 50</span>
              <span style={{ fontSize: 20, color: "#34d399", fontWeight: 900 }}>24,180.50 ▲</span>
            </div>

            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(10, 15, 30, 0.85)",
                border: "1.5px solid rgba(56, 189, 248, 0.3)",
                borderRadius: 14,
                padding: "12px 16px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontFamily: "monospace",
              }}
            >
              <span style={{ fontSize: 18, color: "#94a3b8", fontWeight: 700 }}>SENSEX</span>
              <span style={{ fontSize: 20, color: "#34d399", fontWeight: 900 }}>79,480.20 ▲</span>
            </div>
          </div>
        </div>

        {/* 3. SUBTITLE CALLOUT */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              padding: "8px 22px",
              backgroundColor: "rgba(56, 189, 248, 0.18)",
              border: "1.5px solid #38bdf8",
              borderRadius: 999,
              color: "#38bdf8",
              fontFamily: "monospace",
              fontSize: 18,
              fontWeight: 800,
              boxShadow: "0 0 20px rgba(56, 189, 248, 0.3)",
            }}
          >
            🔍 HOW DOES THIS INVISIBLE SYSTEM WORK?
          </div>
        </div>
      </div>
    </SceneLayout>
  );
};
