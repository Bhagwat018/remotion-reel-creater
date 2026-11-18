import React from "react";
import { spring, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneLayout } from "../../components/SceneLayout";

export interface WarehouseRentalBoomSceneProps {
  id?: string;
  leadIn?: string;
  headline?: string;
  sub?: string;
  brollVideo?: string;
  durationInFrames: number;
}

export const WarehouseRentalBoomScene: React.FC<WarehouseRentalBoomSceneProps> = ({
  id,
  leadIn = "🏗️ WAREHOUSE INFRASTRUCTURE MODEL",
  headline = "ZEPTO, BLINKIT & AMAZON WAREHOUSES! *FORKLIFTS & CRANES RENTALS*",
  sub = "Supplying Equipment to India's Fastest Logistics",
  brollVideo = "broll/logistics_warehouse_conveyor.mp4",
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

  const fleetCounter = Math.min(
    1850,
    Math.round(interpolate(frame, [8, 48], [400, 1850], { extrapolateRight: "clamp" }))
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
          maxWidth: 980,
          display: "flex",
          flexDirection: "column",
          gap: 18,
          alignItems: "stretch",
          marginTop: 6,
          zIndex: 10,
        }}
      >
        {/* 3 BIG CLIENT BRAND PODS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 14,
            transform: `scale(${entrance})`,
          }}
        >
          {/* ZEPTO */}
          <div
            style={{
              backgroundColor: "rgba(15, 23, 42, 0.94)",
              border: "3px solid #ec4899",
              borderRadius: 22,
              padding: "18px 14px",
              textAlign: "center",
              boxShadow: "0 12px 35px rgba(236, 72, 153, 0.3)",
            }}
          >
            <div style={{ fontSize: 40, marginBottom: 4 }}>⚡</div>
            <div style={{ color: "#ec4899", fontSize: 22, fontWeight: 900 }}>ZEPTO</div>
            <div style={{ color: "#cbd5e1", fontSize: 13, marginTop: 4, fontWeight: 700 }}>
              10-Min Dark Stores
            </div>
          </div>

          {/* BLINKIT */}
          <div
            style={{
              backgroundColor: "rgba(15, 23, 42, 0.94)",
              border: "3px solid #facc15",
              borderRadius: 22,
              padding: "18px 14px",
              textAlign: "center",
              boxShadow: "0 12px 35px rgba(250, 204, 21, 0.3)",
            }}
          >
            <div style={{ fontSize: 40, marginBottom: 4 }}>🟡</div>
            <div style={{ color: "#facc15", fontSize: 22, fontWeight: 900 }}>BLINKIT</div>
            <div style={{ color: "#cbd5e1", fontSize: 13, marginTop: 4, fontWeight: 700 }}>
              Mega Hubs Fleet
            </div>
          </div>

          {/* AMAZON */}
          <div
            style={{
              backgroundColor: "rgba(15, 23, 42, 0.94)",
              border: "3px solid #f97316",
              borderRadius: 22,
              padding: "18px 14px",
              textAlign: "center",
              boxShadow: "0 12px 35px rgba(249, 115, 22, 0.3)",
            }}
          >
            <div style={{ fontSize: 40, marginBottom: 4 }}>📦</div>
            <div style={{ color: "#f97316", fontSize: 22, fontWeight: 900 }}>AMAZON</div>
            <div style={{ color: "#cbd5e1", fontSize: 13, marginTop: 4, fontWeight: 700 }}>
              Fulfillment Centers
            </div>
          </div>
        </div>

        {/* MASSIVE RENTAL INFRASTRUCTURE SHOWCASE */}
        <div
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.94)",
            border: "3.5px solid #38bdf8",
            borderRadius: 24,
            padding: "24px 28px",
            boxShadow: "0 18px 50px rgba(56, 189, 248, 0.25)",
            transform: `scale(${cardEntrance})`,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div
                style={{
                  color: "#38bdf8",
                  fontFamily: "monospace",
                  fontSize: 16,
                  fontWeight: 900,
                  letterSpacing: 2,
                }}
              >
                MATERIAL HANDLING FLEET
              </div>
              <div
                style={{
                  color: "#ffffff",
                  fontSize: 48,
                  fontWeight: 900,
                  marginTop: 4,
                  display: "flex",
                  alignItems: "baseline",
                  gap: 10,
                }}
              >
                <span>{fleetCounter}+</span>
                <span style={{ fontSize: 26, color: "#38bdf8" }}>FORKLIFTS & CRANES</span>
              </div>
            </div>
            <div
              style={{
                backgroundColor: "rgba(16, 185, 129, 0.2)",
                border: "2px solid #10b981",
                borderRadius: 16,
                padding: "12px 20px",
                textAlign: "right",
              }}
            >
              <div style={{ color: "#94a3b8", fontSize: 12, fontFamily: "monospace" }}>DEMAND</div>
              <div style={{ color: "#10b981", fontSize: 22, fontWeight: 900 }}>BOOMING</div>
            </div>
          </div>

          {/* RENTAL BUSINESS DYNAMICS BANNER */}
          <div
            style={{
              marginTop: 20,
              padding: "16px 20px",
              backgroundColor: "rgba(30, 41, 59, 0.8)",
              border: "2px solid #64748b",
              borderRadius: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <span style={{ fontSize: 32 }}>🚜</span>
              <div>
                <div style={{ color: "#ffffff", fontSize: 18, fontWeight: 800 }}>
                  Equipment On Long-Term & Daily Rentals
                </div>
                <div style={{ color: "#94a3b8", fontSize: 14, fontWeight: 600 }}>
                  Companies don't buy heavy forklifts — they rent them!
                </div>
              </div>
            </div>
            <div
              style={{
                padding: "6px 14px",
                backgroundColor: "#10b981",
                borderRadius: 8,
                color: "#0f172a",
                fontWeight: 900,
                fontSize: 14,
                fontFamily: "monospace",
              }}
            >
              HIGH REVENUE
            </div>
          </div>
        </div>
      </div>
    </SceneLayout>
  );
};
