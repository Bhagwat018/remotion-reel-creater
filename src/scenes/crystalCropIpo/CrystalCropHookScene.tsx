import React from "react";
import { spring, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneLayout } from "../../components/SceneLayout";

export interface CrystalCropHookSceneProps {
  id?: string;
  leadIn?: string;
  headline?: string;
  sub?: string;
  brollVideo?: string;
  durationInFrames: number;
}

export const CrystalCropHookScene: React.FC<CrystalCropHookSceneProps> = ({
  id,
  leadIn = "🌾 AGROCHEMICAL MEGA IPO • 2026",
  headline = "CRYSTAL CROP IPO: ₹272! *PAISA DOUBLE YA CAPITAL TRAP?*",
  sub = "India's Agrochemical & Crop Protection Listing",
  brollVideo = "broll/crop_pesticide_spraying.mp4",
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
    spring({ frame: Math.max(0, frame - 5), fps, config: { damping: 14, stiffness: 120 } }),
    [0, 1],
    [0.92, 1]
  );

  const pulse = Math.sin(frame * 0.15) * 0.04 + 1;

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
        {/* TOP STATUS PILL */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              padding: "10px 24px",
              backgroundColor: "rgba(16, 185, 129, 0.22)",
              border: "2px solid #10b981",
              borderRadius: 999,
              color: "#ffffff",
              fontFamily: "monospace",
              fontSize: 22,
              fontWeight: 900,
              letterSpacing: 2,
              boxShadow: "0 0 25px rgba(16, 185, 129, 0.4)",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span style={{ color: "#10b981", fontSize: 26 }}>🌱</span>
            <span>ISSUE PRICE: ₹272 PER SHARE</span>
          </div>
        </div>

        {/* DUAL PATH COMPARISON: PAISA DOUBLE VS CAPITAL TRAP */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            gap: 14,
            alignItems: "center",
            transform: `scale(${cardEntrance})`,
          }}
        >
          {/* OPTION 1: PAISA DOUBLE */}
          <div
            style={{
              backgroundColor: "rgba(15, 23, 42, 0.92)",
              border: "3px solid #10b981",
              borderRadius: 22,
              padding: "22px 18px",
              boxShadow: "0 12px 35px rgba(16, 185, 129, 0.25)",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 44, marginBottom: 8 }}>🚀</div>
            <div
              style={{
                color: "#10b981",
                fontFamily: "monospace",
                fontSize: 16,
                fontWeight: 800,
                letterSpacing: 1.5,
              }}
            >
              HYPE PROMISE
            </div>
            <div
              style={{
                color: "#ffffff",
                fontSize: 28,
                fontWeight: 900,
                marginTop: 6,
                lineHeight: 1.2,
              }}
            >
              PAISA DOUBLE?
            </div>
            <div
              style={{
                color: "#94a3b8",
                fontSize: 15,
                marginTop: 6,
                fontWeight: 600,
              }}
            >
              Aggressive Listing Gains
            </div>
          </div>

          {/* VS BADGE */}
          <div
            style={{
              width: 58,
              height: 58,
              borderRadius: "50%",
              backgroundColor: "#ef4444",
              border: "3px solid #ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              fontWeight: 900,
              fontSize: 20,
              boxShadow: "0 0 25px rgba(239, 68, 68, 0.8)",
              transform: `scale(${pulse})`,
            }}
          >
            VS
          </div>

          {/* OPTION 2: CAPITAL TRAP */}
          <div
            style={{
              backgroundColor: "rgba(15, 23, 42, 0.92)",
              border: "3px solid #ef4444",
              borderRadius: 22,
              padding: "22px 18px",
              boxShadow: "0 12px 35px rgba(239, 68, 68, 0.35)",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 44, marginBottom: 8 }}>🪤</div>
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
                fontSize: 28,
                fontWeight: 900,
                marginTop: 6,
                lineHeight: 1.2,
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
              Low Margin & Dull GMP
            </div>
          </div>
        </div>

        {/* BOTTOM COMPANY IDENTITY PILL */}
        <div
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.88)",
            border: "2px solid #38bdf8",
            borderRadius: 16,
            padding: "14px 22px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            transform: `scale(${entrance})`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 28 }}>🧪</span>
            <div>
              <div style={{ color: "#ffffff", fontSize: 20, fontWeight: 800 }}>
                Crystal Crop Protection Ltd.
              </div>
              <div style={{ color: "#38bdf8", fontSize: 14, fontFamily: "monospace", fontWeight: 700 }}>
                SEBI DRHP FILED • AGROCHEMICAL SECTOR
              </div>
            </div>
          </div>
          <div
            style={{
              backgroundColor: "rgba(56, 189, 248, 0.2)",
              border: "1px solid #38bdf8",
              borderRadius: 8,
              padding: "6px 14px",
              color: "#38bdf8",
              fontSize: 15,
              fontWeight: 800,
              fontFamily: "monospace",
            }}
          >
            IPO SZN
          </div>
        </div>
      </div>
    </SceneLayout>
  );
};
