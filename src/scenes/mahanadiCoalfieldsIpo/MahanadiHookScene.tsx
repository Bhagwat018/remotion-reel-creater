import React from "react";
import { spring, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneLayout } from "../../components/SceneLayout";

export interface MahanadiHookSceneProps {
  id?: string;
  leadIn?: string;
  headline?: string;
  sub?: string;
  brollVideo?: string;
  durationInFrames: number;
}

export const MahanadiHookScene: React.FC<MahanadiHookSceneProps> = ({
  id,
  leadIn = "⚡ MEGA PSU IPO DISRUPTION • 2026",
  headline = "MAHANADI COALFIELDS IPO! *GHAR KI BIJLI & AC KA ASLI SACH*",
  sub = "Coal India's Biggest Cash Engine Going Public",
  brollVideo = "broll/coal_mine_excavator_dumper.mp4",
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring animations
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

  const pulse = Math.sin(frame * 0.2) * 0.05 + 1;
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
          gap: 18,
          alignItems: "stretch",
          marginTop: 8,
          zIndex: 10,
        }}
      >
        {/* TOP STATUS HUD BADGE */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              padding: "12px 28px",
              backgroundColor: "rgba(6, 182, 212, 0.22)",
              border: "3px solid #06b6d4",
              borderRadius: 999,
              color: "#ffffff",
              fontFamily: "monospace",
              fontSize: 22,
              fontWeight: 900,
              letterSpacing: 2,
              boxShadow: `0 0 ${20 + glowPulse * 15}px rgba(6, 182, 212, 0.6)`,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span style={{ fontSize: 26, color: "#38bdf8" }}>⚡</span>
            <span>₹9,000 CRORE MEGA PSU IPO • OPENING SOON</span>
          </div>
        </div>

        {/* SCREEN-DOMINANT POWER CONNECTION HUD */}
        <div
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.95)",
            border: "3.5px solid #06b6d4",
            borderRadius: 24,
            padding: "26px 28px",
            boxShadow: `0 18px 50px rgba(6, 182, 212, 0.35)`,
            transform: `scale(${cardEntrance})`,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Top laser accent bar */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 5,
              background: "linear-gradient(90deg, #06b6d4, #f59e0b, #10b981)",
            }}
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto 1fr",
              gap: 18,
              alignItems: "center",
            }}
          >
            {/* LEFT: YOUR HOME POWER */}
            <div
              style={{
                backgroundColor: "rgba(30, 41, 59, 0.8)",
                border: "2px solid rgba(56, 189, 248, 0.5)",
                borderRadius: 18,
                padding: "20px 16px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 48, marginBottom: 6 }}>🏠 ❄️</div>
              <div
                style={{
                  color: "#38bdf8",
                  fontFamily: "monospace",
                  fontSize: 16,
                  fontWeight: 900,
                  letterSpacing: 1.5,
                }}
              >
                EVERYDAY REALITY
              </div>
              <div
                style={{
                  color: "#ffffff",
                  fontSize: 28,
                  fontWeight: 900,
                  marginTop: 6,
                  lineHeight: 1.15,
                }}
              >
                Ghar Ki Bijli & AC
              </div>
              <div
                style={{
                  color: "#94a3b8",
                  fontSize: 15,
                  marginTop: 6,
                  fontWeight: 600,
                }}
              >
                Runs 24x7 on Thermal Coal
              </div>
            </div>

            {/* CENTER LIGHTNING CONNECTOR */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 6,
                transform: `scale(${pulse})`,
              }}
            >
              <div
                style={{
                  width: 58,
                  height: 58,
                  borderRadius: "50%",
                  backgroundColor: "#f59e0b",
                  border: "3.5px solid #ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 30,
                  boxShadow: `0 0 ${20 + glowPulse * 15}px rgba(245, 158, 11, 0.9)`,
                }}
              >
                ⚡
              </div>
              <div
                style={{
                  color: "#f59e0b",
                  fontFamily: "monospace",
                  fontSize: 14,
                  fontWeight: 900,
                  letterSpacing: 1,
                }}
              >
                POWER GRID
              </div>
            </div>

            {/* RIGHT: MAHANADI COALFIELDS */}
            <div
              style={{
                backgroundColor: "rgba(30, 41, 59, 0.8)",
                border: "2px solid rgba(245, 158, 11, 0.5)",
                borderRadius: 18,
                padding: "20px 16px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 48, marginBottom: 6 }}>⛏️ 🏭</div>
              <div
                style={{
                  color: "#f59e0b",
                  fontFamily: "monospace",
                  fontSize: 16,
                  fontWeight: 900,
                  letterSpacing: 1.5,
                }}
              >
                SUPPLIER MONOPOLY
              </div>
              <div
                style={{
                  color: "#ffffff",
                  fontSize: 28,
                  fontWeight: 900,
                  marginTop: 6,
                  lineHeight: 1.15,
                }}
              >
                Mahanadi Coal
              </div>
              <div
                style={{
                  color: "#94a3b8",
                  fontSize: 15,
                  marginTop: 6,
                  fontWeight: 600,
                }}
              >
                Coal India's Mega Subsidiary
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM METRIC BANNER */}
        <div
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.92)",
            border: "2.5px solid #10b981",
            borderRadius: 20,
            padding: "16px 26px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            transform: `scale(${entrance})`,
            boxShadow: "0 14px 40px rgba(0,0,0,0.8)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ fontSize: 32 }}>🏛️</span>
            <div>
              <div style={{ color: "#ffffff", fontSize: 22, fontWeight: 900 }}>
                Mahanadi Coalfields Ltd. (MCL)
              </div>
              <div style={{ color: "#10b981", fontSize: 15, fontFamily: "monospace", fontWeight: 800 }}>
                LARGEST COAL PRODUCING ARM OF COAL INDIA
              </div>
            </div>
          </div>
          <div
            style={{
              backgroundColor: "rgba(16, 185, 129, 0.2)",
              border: "1.5px solid #10b981",
              borderRadius: 10,
              padding: "8px 18px",
              color: "#10b981",
              fontSize: 18,
              fontWeight: 900,
              fontFamily: "monospace",
            }}
          >
            MAHAPSU
          </div>
        </div>
      </div>
    </SceneLayout>
  );
};
