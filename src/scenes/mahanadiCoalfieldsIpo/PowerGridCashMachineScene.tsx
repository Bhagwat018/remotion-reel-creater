import React from "react";
import { spring, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneLayout } from "../../components/SceneLayout";

export interface PowerGridCashMachineSceneProps {
  id?: string;
  leadIn?: string;
  headline?: string;
  sub?: string;
  brollVideo?: string;
  durationInFrames: number;
}

export const PowerGridCashMachineScene: React.FC<PowerGridCashMachineSceneProps> = ({
  id,
  leadIn = "🔌 CRITICAL ENERGY INFRASTRUCTURE",
  headline = "DESH KI 25% POWER SUPPLY! *COAL INDIA KI #1 CASH MACHINE*",
  sub = "Supplying 1 in every 4 units of electricity in India",
  brollVideo = "broll/thermal_power_plant_electricity.mp4",
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance animation
  const cardEntrance = interpolate(
    spring({ frame, fps, config: { damping: 12, stiffness: 130 } }),
    [0, 1],
    [0.90, 1]
  );

  // Animated counter for 25% power supply
  const powerProgress = interpolate(frame, [0, 45], [0, 25], {
    extrapolateRight: "clamp",
  });

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
          marginTop: 6,
          zIndex: 10,
        }}
      >
        {/* BIG SCREEN-DOMINANT 25% POWER GAUGE POD */}
        <div
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.95)",
            border: "3.5px solid #10b981",
            borderRadius: 24,
            padding: "26px 30px",
            boxShadow: `0 18px 50px rgba(16, 185, 129, 0.35)`,
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
              background: "linear-gradient(90deg, #10b981, #06b6d4)",
            }}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 36 }}>⚡</span>
              <div>
                <div
                  style={{
                    color: "#10b981",
                    fontFamily: "monospace",
                    fontSize: 16,
                    fontWeight: 900,
                    letterSpacing: 2,
                  }}
                >
                  NATIONAL GRID SHARE
                </div>
                <div style={{ color: "#ffffff", fontSize: 24, fontWeight: 900 }}>
                  Desh Ka 25% Coal Power Supply
                </div>
              </div>
            </div>

            {/* Glowing Metric */}
            <div
              style={{
                fontFamily: "monospace",
                fontSize: 56,
                fontWeight: 900,
                color: "#10b981",
                textShadow: `0 0 ${15 + glowPulse * 15}px rgba(16, 185, 129, 0.8)`,
              }}
            >
              {Math.round(powerProgress)}%
            </div>
          </div>

          {/* DYNAMIC PROGRESS BAR */}
          <div
            style={{
              width: "100%",
              height: 22,
              backgroundColor: "rgba(30, 41, 59, 0.8)",
              borderRadius: 999,
              overflow: "hidden",
              border: "2px solid rgba(16, 185, 129, 0.4)",
              position: "relative",
            }}
          >
            <div
              style={{
                width: `${(powerProgress / 25) * 100}%`,
                height: "100%",
                background: "linear-gradient(90deg, #059669, #10b981, #34d399)",
                borderRadius: 999,
                boxShadow: "0 0 20px rgba(16, 185, 129, 0.8)",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 10,
              color: "#94a3b8",
              fontSize: 15,
              fontWeight: 700,
              fontFamily: "monospace",
            }}
          >
            <span>0% (Grid Start)</span>
            <span style={{ color: "#10b981" }}>1 in every 4 bulbs in India</span>
            <span>100% (All India)</span>
          </div>
        </div>

        {/* DUAL STAT PODS: CASH MACHINE & IPO SIZE */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
          }}
        >
          {/* CASH MACHINE POD */}
          <div
            style={{
              backgroundColor: "rgba(15, 23, 42, 0.94)",
              border: "3px solid #f59e0b",
              borderRadius: 22,
              padding: "22px 24px",
              boxShadow: "0 14px 40px rgba(245, 158, 11, 0.25)",
              position: "relative",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 32 }}>🏭</span>
              <div>
                <div
                  style={{
                    color: "#f59e0b",
                    fontFamily: "monospace",
                    fontSize: 15,
                    fontWeight: 900,
                  }}
                >
                  COAL INDIA'S #1
                </div>
                <div style={{ color: "#ffffff", fontSize: 26, fontWeight: 900 }}>
                  Cash-Machine
                </div>
              </div>
            </div>
            <div
              style={{
                color: "#e2e8f0",
                fontSize: 16,
                marginTop: 10,
                lineHeight: 1.3,
                fontWeight: 600,
              }}
            >
              Highest profit & production volume among all subsidiaries!
            </div>
          </div>

          {/* ₹9,000 CR MEGA IPO */}
          <div
            style={{
              backgroundColor: "rgba(15, 23, 42, 0.94)",
              border: "3px solid #06b6d4",
              borderRadius: 22,
              padding: "22px 24px",
              boxShadow: "0 14px 40px rgba(6, 182, 212, 0.25)",
              position: "relative",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 32 }}>💰</span>
              <div>
                <div
                  style={{
                    color: "#06b6d4",
                    fontFamily: "monospace",
                    fontSize: 15,
                    fontWeight: 900,
                  }}
                >
                  ISSUE SIZE
                </div>
                <div style={{ color: "#ffffff", fontSize: 26, fontWeight: 900 }}>
                  ₹9,000 Crore
                </div>
              </div>
            </div>
            <div
              style={{
                color: "#e2e8f0",
                fontSize: 16,
                marginTop: 10,
                lineHeight: 1.3,
                fontWeight: 600,
              }}
            >
              One of the biggest public sector divestments of 2026!
            </div>
          </div>
        </div>
      </div>
    </SceneLayout>
  );
};
