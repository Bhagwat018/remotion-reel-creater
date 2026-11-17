import React from "react";
import { spring, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneLayout } from "../../components/SceneLayout";

export interface MarketMysterySceneProps {
  id?: string;
  leadIn?: string;
  headline?: string;
  brollVideo?: string;
  durationInFrames: number;
}

export const MarketMysteryScene: React.FC<MarketMysterySceneProps> = ({
  id,
  leadIn = "⚙️ THE INVISIBLE PIPELINE",
  headline = "AAKHIR YE SHARE MARKET KA *INVISIBLE SYSTEM KAAM KAISE KARTA HAI?*",
  brollVideo = "broll/stock_market_trading_chart.mp4",
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const steps = [
    {
      num: "01",
      icon: "📱",
      title: "Trader App",
      sub: "Broker forwards order packet",
      badge: "SUB-SECOND",
      color: "#38bdf8",
    },
    {
      num: "02",
      icon: "⚡",
      title: "NSE/BSE Core",
      sub: "0.001s orderbook depth matching",
      badge: "MICROSECOND",
      color: "#f59e0b",
    },
    {
      num: "03",
      icon: "🏛️",
      title: "CDSL / NSDL",
      sub: "Shares locked in digital vault",
      badge: "T+1 SETTLED",
      color: "#10b981",
    },
  ];

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
        {steps.map((st, idx) => {
          const itemSpring = spring({
            frame: frame - idx * 4,
            fps,
            config: { damping: 14, stiffness: 130 },
          });

          const isActive = (Math.floor(frame / 18) % 3) === idx;

          return (
            <div
              key={idx}
              style={{
                transform: `scale(${itemSpring}) translateY(${(1 - itemSpring) * 16}px)`,
                opacity: itemSpring,
                backgroundColor: isActive ? "rgba(30, 41, 59, 0.95)" : "rgba(15, 23, 42, 0.92)",
                backdropFilter: "blur(20px)",
                border: `2px solid ${isActive ? st.color : "rgba(148, 163, 184, 0.25)"}`,
                borderRadius: 20,
                padding: "16px 22px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 16,
                boxShadow: isActive
                  ? `0 12px 35px rgba(0,0,0,0.6), 0 0 25px ${st.color}40`
                  : "0 8px 24px rgba(0,0,0,0.4)",
                transition: "border 0.2s, background 0.2s",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 14,
                    backgroundColor: "rgba(15, 23, 42, 0.8)",
                    border: `1.5px solid ${st.color}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 26,
                    flexShrink: 0,
                  }}
                >
                  {st.icon}
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span
                      style={{
                        fontFamily: "monospace",
                        fontSize: 16,
                        color: st.color,
                        fontWeight: 800,
                      }}
                    >
                      LAYER {st.num}
                    </span>
                    <span
                      style={{
                        fontFamily: "system-ui, sans-serif",
                        fontSize: 24,
                        fontWeight: 900,
                        color: "#f8fafc",
                      }}
                    >
                      {st.title}
                    </span>
                  </div>

                  <div
                    style={{
                      fontFamily: "system-ui, sans-serif",
                      fontSize: 16,
                      color: "#94a3b8",
                      fontWeight: 600,
                    }}
                  >
                    {st.sub}
                  </div>
                </div>
              </div>

              <div
                style={{
                  padding: "6px 14px",
                  borderRadius: 10,
                  backgroundColor: `${st.color}20`,
                  border: `1px solid ${st.color}`,
                  color: st.color,
                  fontFamily: "monospace",
                  fontSize: 15,
                  fontWeight: 800,
                  whiteSpace: "nowrap",
                }}
              >
                {st.badge}
              </div>
            </div>
          );
        })}
      </div>
    </SceneLayout>
  );
};
