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
    [0.90, 1]
  );

  const cardEntrance = interpolate(
    spring({ frame: Math.max(0, frame - 5), fps, config: { damping: 12, stiffness: 130 } }),
    [0, 1],
    [0.88, 1]
  );

  const fleetCounter = Math.min(
    1850,
    Math.round(interpolate(frame, [8, 48], [400, 1850], { extrapolateRight: "clamp" }))
  );

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
              backgroundColor: "rgba(10, 15, 30, 0.96)",
              border: "3px solid #ec4899",
              borderRadius: 22,
              padding: "18px 14px",
              textAlign: "center",
              boxShadow: "0 12px 35px rgba(236, 72, 153, 0.35)",
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
                height: 4,
                background: "linear-gradient(90deg, #ec4899, #f472b6)",
              }}
            />
            {/* Custom Zepto Lightning SVG */}
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 6 }}>
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="18" fill="rgba(236, 72, 153, 0.15)" stroke="#ec4899" strokeWidth="2"/>
                <path d="M 22 8 L 12 22 L 20 22 L 18 32 L 28 18 L 20 18 Z" fill="#ec4899"/>
              </svg>
            </div>
            <div style={{ color: "#ec4899", fontSize: 22, fontWeight: 900, letterSpacing: 1 }}>ZEPTO</div>
            <div style={{ color: "#cbd5e1", fontSize: 13, marginTop: 4, fontWeight: 700 }}>
              10-Min Dark Stores
            </div>
          </div>

          {/* BLINKIT */}
          <div
            style={{
              backgroundColor: "rgba(10, 15, 30, 0.96)",
              border: "3px solid #facc15",
              borderRadius: 22,
              padding: "18px 14px",
              textAlign: "center",
              boxShadow: "0 12px 35px rgba(250, 204, 21, 0.35)",
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
                height: 4,
                background: "linear-gradient(90deg, #facc15, #fde047)",
              }}
            />
            {/* Custom Blinkit Basket SVG */}
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 6 }}>
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="18" fill="rgba(250, 204, 21, 0.15)" stroke="#facc15" strokeWidth="2"/>
                <path d="M 12 16 L 28 16 L 25 28 L 15 28 Z" fill="#facc15"/>
                <path d="M 16 16 C 16 12 24 12 24 16" stroke="#facc15" strokeWidth="2" fill="none"/>
              </svg>
            </div>
            <div style={{ color: "#facc15", fontSize: 22, fontWeight: 900, letterSpacing: 1 }}>BLINKIT</div>
            <div style={{ color: "#cbd5e1", fontSize: 13, marginTop: 4, fontWeight: 700 }}>
              Mega Hubs Fleet
            </div>
          </div>

          {/* AMAZON */}
          <div
            style={{
              backgroundColor: "rgba(10, 15, 30, 0.96)",
              border: "3px solid #f97316",
              borderRadius: 22,
              padding: "18px 14px",
              textAlign: "center",
              boxShadow: "0 12px 35px rgba(249, 115, 22, 0.35)",
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
                height: 4,
                background: "linear-gradient(90deg, #f97316, #fb923c)",
              }}
            />
            {/* Custom Amazon Box SVG */}
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 6 }}>
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="18" fill="rgba(249, 115, 22, 0.15)" stroke="#f97316" strokeWidth="2"/>
                <path d="M 12 16 L 20 11 L 28 16 L 28 27 L 20 32 L 12 27 Z" fill="#334155" stroke="#f97316" strokeWidth="1.5"/>
                <path d="M 15 25 Q 20 29 25 25" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
              </svg>
            </div>
            <div style={{ color: "#f97316", fontSize: 22, fontWeight: 900, letterSpacing: 1 }}>AMAZON</div>
            <div style={{ color: "#cbd5e1", fontSize: 13, marginTop: 4, fontWeight: 700 }}>
              Fulfillment Hubs
            </div>
          </div>
        </div>

        {/* MASSIVE RENTAL INFRASTRUCTURE SHOWCASE */}
        <div
          style={{
            backgroundColor: "rgba(10, 15, 30, 0.96)",
            border: "3.5px solid #38bdf8",
            borderRadius: 24,
            padding: "24px 28px",
            boxShadow: `0 20px 60px rgba(56, 189, 248, 0.35)`,
            transform: `scale(${cardEntrance})`,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Top laser accent line */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 5,
              background: "linear-gradient(90deg, #38bdf8, #10b981)",
            }}
          />

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div
                style={{
                  color: "#38bdf8",
                  fontFamily: "monospace",
                  fontSize: 15,
                  fontWeight: 900,
                  letterSpacing: 2,
                }}
              >
                MATERIAL HANDLING FLEET
              </div>
              <div
                style={{
                  color: "#ffffff",
                  fontSize: 50,
                  fontWeight: 900,
                  marginTop: 4,
                  display: "flex",
                  alignItems: "baseline",
                  gap: 12,
                }}
              >
                <span
                  style={{
                    color: "#38bdf8",
                    fontFamily: "monospace",
                    textShadow: `0 0 ${15 + glowPulse * 15}px rgba(56, 189, 248, 0.8)`,
                  }}
                >
                  {fleetCounter}+
                </span>
                <span style={{ fontSize: 24, color: "#cbd5e1", fontWeight: 800 }}>FORKLIFTS & CRANES</span>
              </div>
            </div>
            <div
              style={{
                backgroundColor: "rgba(16, 185, 129, 0.2)",
                border: "2px solid #10b981",
                borderRadius: 16,
                padding: "12px 22px",
                textAlign: "right",
              }}
            >
              <div style={{ color: "#94a3b8", fontSize: 12, fontFamily: "monospace", fontWeight: 800 }}>DEMAND</div>
              <div style={{ color: "#10b981", fontSize: 22, fontWeight: 900 }}>BOOMING</div>
            </div>
          </div>

          {/* RENTAL BUSINESS DYNAMICS BANNER */}
          <div
            style={{
              marginTop: 18,
              padding: "16px 22px",
              backgroundColor: "rgba(15, 23, 42, 0.85)",
              border: "2px solid rgba(56, 189, 248, 0.4)",
              borderRadius: 18,
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
                  Warehouses don't buy heavy machinery — they rent from Watrana!
                </div>
              </div>
            </div>
            <div
              style={{
                padding: "8px 16px",
                backgroundColor: "#10b981",
                borderRadius: 10,
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
