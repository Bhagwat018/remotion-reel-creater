import React from "react";
import { spring, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneLayout } from "../../components/SceneLayout";

export interface WatranaHookSceneProps {
  id?: string;
  leadIn?: string;
  headline?: string;
  sub?: string;
  brollVideo?: string;
  durationInFrames: number;
}

export const WatranaHookScene: React.FC<WatranaHookSceneProps> = ({
  id,
  leadIn = "🚜 QUICK-COMMERCE EQUIPMENT IPO • 2026",
  headline = "WATRANA RENTALS IPO: ₹120 CR! *SAFE BET YA CAPITAL TRAP?*",
  sub = "Forklifts & Cranes Rental Giant Listing",
  brollVideo = "broll/warehouse_forklift_moving.mp4",
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Dynamic entrance springs
  const entrance = interpolate(
    spring({ frame, fps, config: { damping: 12, stiffness: 140 } }),
    [0, 1],
    [0.92, 1]
  );

  const cardEntrance = interpolate(
    spring({ frame: Math.max(0, frame - 4), fps, config: { damping: 12, stiffness: 130 } }),
    [0, 1],
    [0.90, 1]
  );

  const pulse = Math.sin(frame * 0.18) * 0.05 + 1;
  const glowPulse = (Math.sin(frame * 0.15) + 1) * 0.5;

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
        {/* TOP STATUS HUD BADGE */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              padding: "12px 28px",
              backgroundColor: "rgba(245, 158, 11, 0.22)",
              border: "3px solid #f59e0b",
              borderRadius: 999,
              color: "#ffffff",
              fontFamily: "monospace",
              fontSize: 22,
              fontWeight: 900,
              letterSpacing: 2,
              boxShadow: `0 0 ${20 + glowPulse * 15}px rgba(245, 158, 11, 0.6)`,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span style={{ fontSize: 26, color: "#f59e0b" }}>⚡</span>
            <span>₹120 CRORE SME IPO • OPEN NOW</span>
          </div>
        </div>

        {/* MASSIVE SPLIT DECISION PODS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            gap: 16,
            alignItems: "center",
            transform: `scale(${cardEntrance})`,
          }}
        >
          {/* SAFE BET POD */}
          <div
            style={{
              backgroundColor: "rgba(15, 23, 42, 0.94)",
              border: "3.5px solid #10b981",
              borderRadius: 24,
              padding: "26px 20px",
              boxShadow: "0 16px 45px rgba(16, 185, 129, 0.35)",
              textAlign: "center",
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
                height: 5,
                background: "linear-gradient(90deg, #10b981, #34d399)",
              }}
            />
            <div style={{ fontSize: 48, marginBottom: 6 }}>🚀</div>
            <div
              style={{
                color: "#10b981",
                fontFamily: "monospace",
                fontSize: 16,
                fontWeight: 800,
                letterSpacing: 1.5,
              }}
            >
              GROWTH HYPE
            </div>
            <div
              style={{
                color: "#ffffff",
                fontSize: 32,
                fontWeight: 900,
                marginTop: 6,
                lineHeight: 1.15,
              }}
            >
              SAFE BET?
            </div>
            <div
              style={{
                color: "#94a3b8",
                fontSize: 15,
                marginTop: 6,
                fontWeight: 600,
              }}
            >
              Quick-Commerce Boom
            </div>
          </div>

          {/* VS CYBER ORB */}
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              backgroundColor: "#ef4444",
              border: "4px solid #ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              fontWeight: 900,
              fontSize: 22,
              boxShadow: `0 0 ${25 + glowPulse * 15}px rgba(239, 68, 68, 0.9)`,
              transform: `scale(${pulse})`,
              zIndex: 2,
            }}
          >
            VS
          </div>

          {/* CAPITAL TRAP POD */}
          <div
            style={{
              backgroundColor: "rgba(15, 23, 42, 0.94)",
              border: "3.5px solid #ef4444",
              borderRadius: 24,
              padding: "26px 20px",
              boxShadow: "0 16px 45px rgba(239, 68, 68, 0.45)",
              textAlign: "center",
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
                height: 5,
                background: "linear-gradient(90deg, #ef4444, #f87171)",
              }}
            />
            <div style={{ fontSize: 48, marginBottom: 6 }}>🪤</div>
            <div
              style={{
                color: "#ef4444",
                fontFamily: "monospace",
                fontSize: 16,
                fontWeight: 800,
                letterSpacing: 1.5,
              }}
            >
              REALITY CHECK
            </div>
            <div
              style={{
                color: "#ffffff",
                fontSize: 32,
                fontWeight: 900,
                marginTop: 6,
                lineHeight: 1.15,
              }}
            >
              CAPITAL TRAP!
            </div>
            <div
              style={{
                color: "#94a3b8",
                fontSize: 15,
                marginTop: 6,
                fontWeight: 600,
              }}
            >
              ₹1.47 Lakh Blocked!
            </div>
          </div>
        </div>

        {/* BOTTOM HUD CLIENT LOGO BANNER */}
        <div
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.92)",
            border: "2.5px solid #38bdf8",
            borderRadius: 20,
            padding: "16px 26px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            transform: `scale(${entrance})`,
            boxShadow: "0 12px 35px rgba(0,0,0,0.8)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ fontSize: 32 }}>📦</span>
            <div>
              <div style={{ color: "#ffffff", fontSize: 22, fontWeight: 900 }}>
                Watrana Rentals Ltd.
              </div>
              <div style={{ color: "#38bdf8", fontSize: 15, fontFamily: "monospace", fontWeight: 700 }}>
                WAREHOUSE FORKLIFTS & CRANES FLEET
              </div>
            </div>
          </div>
          <div
            style={{
              backgroundColor: "rgba(56, 189, 248, 0.2)",
              border: "1.5px solid #38bdf8",
              borderRadius: 10,
              padding: "8px 18px",
              color: "#38bdf8",
              fontSize: 16,
              fontWeight: 900,
              fontFamily: "monospace",
            }}
          >
            SME IPO
          </div>
        </div>
      </div>
    </SceneLayout>
  );
};
