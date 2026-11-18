import React from "react";
import { spring, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneLayout } from "../../components/SceneLayout";

export interface AgroBusinessRevenueSceneProps {
  id?: string;
  leadIn?: string;
  headline?: string;
  sub?: string;
  brollVideo?: string;
  durationInFrames: number;
}

export const AgroBusinessRevenueScene: React.FC<AgroBusinessRevenueSceneProps> = ({
  id,
  leadIn = "🧪 BUSINESS MODEL & FINANCIALS",
  headline = "REVENUE ₹2,800+ CRORE! *LEKIN PROFIT MARGINS KA KYA?*",
  sub = "Pesticides • Insecticides • Hybrid Seeds",
  brollVideo = "broll/chemical_factory_lab.mp4",
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
    spring({ frame: Math.max(0, frame - 4), fps, config: { damping: 14, stiffness: 120 } }),
    [0, 1],
    [0.92, 1]
  );

  const revenueCounter = Math.min(
    2800,
    Math.round(interpolate(frame, [5, 45], [500, 2800], { extrapolateRight: "clamp" }))
  );

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
          marginTop: 8,
          zIndex: 10,
        }}
      >
        {/* 3 PRODUCT PILLARS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 12,
            transform: `scale(${entrance})`,
          }}
        >
          {/* PILLAR 1: PESTICIDES */}
          <div
            style={{
              backgroundColor: "rgba(15, 23, 42, 0.90)",
              border: "2px solid #10b981",
              borderRadius: 18,
              padding: "16px 12px",
              textAlign: "center",
              boxShadow: "0 10px 25px rgba(0,0,0,0.6)",
            }}
          >
            <div style={{ fontSize: 36, marginBottom: 6 }}>🌱</div>
            <div style={{ color: "#10b981", fontSize: 18, fontWeight: 900 }}>PESTICIDES</div>
            <div style={{ color: "#94a3b8", fontSize: 13, marginTop: 4, fontWeight: 600 }}>
              Crop Protection
            </div>
          </div>

          {/* PILLAR 2: INSECTICIDES */}
          <div
            style={{
              backgroundColor: "rgba(15, 23, 42, 0.90)",
              border: "2px solid #38bdf8",
              borderRadius: 18,
              padding: "16px 12px",
              textAlign: "center",
              boxShadow: "0 10px 25px rgba(0,0,0,0.6)",
            }}
          >
            <div style={{ fontSize: 36, marginBottom: 6 }}>🛡️</div>
            <div style={{ color: "#38bdf8", fontSize: 18, fontWeight: 900 }}>INSECTICIDES</div>
            <div style={{ color: "#94a3b8", fontSize: 13, marginTop: 4, fontWeight: 600 }}>
              Pest Defense
            </div>
          </div>

          {/* PILLAR 3: HYBRID SEEDS */}
          <div
            style={{
              backgroundColor: "rgba(15, 23, 42, 0.90)",
              border: "2px solid #fbbf24",
              borderRadius: 18,
              padding: "16px 12px",
              textAlign: "center",
              boxShadow: "0 10px 25px rgba(0,0,0,0.6)",
            }}
          >
            <div style={{ fontSize: 36, marginBottom: 6 }}>🌾</div>
            <div style={{ color: "#fbbf24", fontSize: 18, fontWeight: 900 }}>HYBRID SEEDS</div>
            <div style={{ color: "#94a3b8", fontSize: 13, marginTop: 4, fontWeight: 600 }}>
              High Yield R&D
            </div>
          </div>
        </div>

        {/* BIG REVENUE & FINANCIAL SUMMARY CARD */}
        <div
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.92)",
            border: "3px solid #38bdf8",
            borderRadius: 22,
            padding: "20px 24px",
            boxShadow: "0 16px 40px rgba(56, 189, 248, 0.2)",
            transform: `scale(${cardEntrance})`,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div
                style={{
                  color: "#38bdf8",
                  fontFamily: "monospace",
                  fontSize: 15,
                  fontWeight: 800,
                  letterSpacing: 1.5,
                }}
              >
                TOP-LINE ANNUAL REVENUE
              </div>
              <div
                style={{
                  color: "#ffffff",
                  fontSize: 42,
                  fontWeight: 900,
                  marginTop: 4,
                  display: "flex",
                  alignItems: "baseline",
                  gap: 8,
                }}
              >
                <span>₹{revenueCounter}+</span>
                <span style={{ fontSize: 24, color: "#38bdf8" }}>CRORE</span>
              </div>
            </div>
            <div
              style={{
                backgroundColor: "rgba(16, 185, 129, 0.2)",
                border: "2px solid #10b981",
                borderRadius: 14,
                padding: "10px 16px",
                textAlign: "right",
              }}
            >
              <div style={{ color: "#94a3b8", fontSize: 12, fontFamily: "monospace" }}>SCALE</div>
              <div style={{ color: "#10b981", fontSize: 20, fontWeight: 900 }}>PAN-INDIA</div>
            </div>
          </div>

          {/* DANGER CALLOUT: PROFIT MARGIN SQUEEZE */}
          <div
            style={{
              marginTop: 18,
              padding: "12px 18px",
              backgroundColor: "rgba(239, 68, 68, 0.18)",
              border: "2px solid #ef4444",
              borderRadius: 14,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span style={{ fontSize: 28 }}>⚠️</span>
            <div>
              <div style={{ color: "#ffffff", fontSize: 17, fontWeight: 800 }}>
                ASLI GAME: PROFIT MARGINS ME CHHUPA HAI!
              </div>
              <div style={{ color: "#ef4444", fontSize: 13, fontWeight: 700 }}>
                High Revenue Doesn't Mean High Net Profit!
              </div>
            </div>
          </div>
        </div>
      </div>
    </SceneLayout>
  );
};
