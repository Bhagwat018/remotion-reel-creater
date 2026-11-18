import React from "react";
import { spring, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneLayout } from "../../components/SceneLayout";

export interface ChinaDumpingImpactSceneProps {
  id?: string;
  leadIn?: string;
  headline?: string;
  sub?: string;
  brollVideo?: string;
  durationInFrames: number;
}

export const ChinaDumpingImpactScene: React.FC<ChinaDumpingImpactSceneProps> = ({
  id,
  leadIn = "🇨🇳 GLOBAL CHEMICAL DUMPING",
  headline = "CHINA NE KIYA DUMPING CRASH! *INDIAN MARGINS BURI TARAH DAB GAYE*",
  sub = "Rock-Bottom Cheap Agrochemical Floods Global Market",
  brollVideo = "broll/china_cargo_container_ship.mp4",
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = interpolate(
    spring({ frame, fps, config: { damping: 14, stiffness: 130 } }),
    [0, 1],
    [0.94, 1]
  );

  const crashHeight = interpolate(frame, [10, 40], [10, 100], {
    extrapolateRight: "clamp",
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
          gap: 16,
          alignItems: "stretch",
          marginTop: 8,
          zIndex: 10,
        }}
      >
        {/* IMPACT FLOW: CHINA DUMPING ➔ MARGIN CRASH */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 14,
            transform: `scale(${entrance})`,
          }}
        >
          {/* STEP 1: CHINA FLOOD */}
          <div
            style={{
              backgroundColor: "rgba(15, 23, 42, 0.92)",
              border: "3px solid #f97316",
              borderRadius: 20,
              padding: "20px 18px",
              boxShadow: "0 12px 35px rgba(249, 115, 22, 0.25)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <span style={{ fontSize: 32 }}>🚢</span>
              <div>
                <div style={{ color: "#f97316", fontSize: 13, fontFamily: "monospace", fontWeight: 800 }}>
                  GLOBAL SUPPLY DUMP
                </div>
                <div style={{ color: "#ffffff", fontSize: 20, fontWeight: 900 }}>
                  CHINA CHEAP RAW AGRO
                </div>
              </div>
            </div>
            <div
              style={{
                backgroundColor: "rgba(249, 115, 22, 0.15)",
                borderRadius: 10,
                padding: "8px 12px",
                color: "#fdba74",
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              • Massive capacity oversupply
              <br />• Dumping below Indian cost
            </div>
          </div>

          {/* STEP 2: INDIAN IMPACT */}
          <div
            style={{
              backgroundColor: "rgba(15, 23, 42, 0.92)",
              border: "3px solid #ef4444",
              borderRadius: 20,
              padding: "20px 18px",
              boxShadow: "0 12px 35px rgba(239, 68, 68, 0.35)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <span style={{ fontSize: 32 }}>📉</span>
              <div>
                <div style={{ color: "#ef4444", fontSize: 13, fontFamily: "monospace", fontWeight: 800 }}>
                  PROFIT SQUEEZE
                </div>
                <div style={{ color: "#ffffff", fontSize: 20, fontWeight: 900 }}>
                  INDIAN MARGIN CRASH
                </div>
              </div>
            </div>
            <div
              style={{
                backgroundColor: "rgba(239, 68, 68, 0.15)",
                borderRadius: 10,
                padding: "8px 12px",
                color: "#fca5a5",
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              • Realizations dropped 25-40%
              <br />• Profit margins severely halved
            </div>
          </div>
        </div>

        {/* VISUAL MARGIN DROP WATERFALL CARD */}
        <div
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.94)",
            border: "2px solid #ef4444",
            borderRadius: 20,
            padding: "18px 24px",
            boxShadow: "0 14px 40px rgba(0,0,0,0.7)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ color: "#ffffff", fontSize: 18, fontWeight: 800 }}>
              AGROCHEMICAL EBITDA MARGIN CYCLE
            </div>
            <div
              style={{
                padding: "4px 12px",
                backgroundColor: "#ef4444",
                borderRadius: 6,
                color: "#ffffff",
                fontFamily: "monospace",
                fontWeight: 900,
                fontSize: 14,
              }}
            >
              SECTOR SLOWDOWN
            </div>
          </div>

          <div
            style={{
              marginTop: 14,
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            {/* HISTORICAL BAR */}
            <div style={{ flex: 1 }}>
              <div style={{ color: "#94a3b8", fontSize: 13, fontFamily: "monospace" }}>PEAK MARGIN</div>
              <div style={{ height: 18, backgroundColor: "#10b981", borderRadius: 6, marginTop: 4, width: "85%" }} />
              <div style={{ color: "#10b981", fontSize: 16, fontWeight: 900, marginTop: 4 }}>~16% EBITDA</div>
            </div>

            <div style={{ fontSize: 28, color: "#ef4444" }}>➔</div>

            {/* CURRENT CRASHED BAR */}
            <div style={{ flex: 1 }}>
              <div style={{ color: "#94a3b8", fontSize: 13, fontFamily: "monospace" }}>POST-DUMPING TODAY</div>
              <div
                style={{
                  height: 18,
                  backgroundColor: "#ef4444",
                  borderRadius: 6,
                  marginTop: 4,
                  width: `${Math.max(20, 85 - crashHeight * 0.55)}%`,
                  boxShadow: "0 0 15px rgba(239, 68, 68, 0.8)",
                }}
              />
              <div style={{ color: "#ef4444", fontSize: 16, fontWeight: 900, marginTop: 4 }}>~7-8% CRASHED</div>
            </div>
          </div>
        </div>
      </div>
    </SceneLayout>
  );
};
