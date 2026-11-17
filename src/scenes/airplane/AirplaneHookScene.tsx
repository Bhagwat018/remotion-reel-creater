import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneLayout } from "../../components/SceneLayout";

export interface AirplaneHookSceneProps {
  id?: string;
  leadIn?: string;
  headline?: string;
  brollVideo?: string;
  durationInFrames: number;
}

export const AirplaneHookScene: React.FC<AirplaneHookSceneProps> = ({
  id,
  leadIn = "✈️ FLIGHT SAFETY REALITY CHECK",
  headline = "KYA EK PHONE ON REHNE SE *PLANE CRASH HO SAKTA HAI?*",
  brollVideo = "broll/airplane_takeoff_cockpit.mp4",
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  // Altitude climbing simulation
  const altitude = Math.floor(1200 + (frame / (fps * 3)) * 8400);

  // Toggle switch animation
  const isAirplaneModeOn = frame > 45;

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
          alignItems: "center",
          marginTop: 6,
          transform: `scale(${entrance})`,
        }}
      >
        {/* Cockpit Takeoff Telemetry Header */}
        <div
          style={{
            width: "100%",
            backgroundColor: "rgba(15, 23, 42, 0.95)",
            border: "2px solid #38bdf8",
            borderRadius: 18,
            padding: "14px 22px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 10px 30px rgba(56, 189, 248, 0.35)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ fontSize: 32 }}>🛫</span>
            <div>
              <div
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontWeight: 900,
                  fontSize: 18,
                  color: "#ffffff",
                }}
              >
                COMMERCIAL FLIGHT CLIMB PHASE
              </div>
              <div
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: 12,
                  color: "#38bdf8",
                }}
              >
                Speed: 420 Knots • 300+ Passengers • Takeoff Active
              </div>
            </div>
          </div>
          <div
            style={{
              padding: "6px 14px",
              backgroundColor: "rgba(56, 189, 248, 0.2)",
              border: "1.5px solid #38bdf8",
              borderRadius: 8,
              fontFamily: "JetBrains Mono, monospace",
              fontWeight: 900,
              fontSize: 14,
              color: "#bae6fd",
            }}
          >
            ALT: {altitude} FT
          </div>
        </div>

        {/* Central Neo-Brutalist HUD Card */}
        <div
          style={{
            width: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.98)",
            border: "3px solid #0f172a",
            borderRadius: 18,
            padding: "18px 24px",
            display: "flex",
            flexDirection: "column",
            gap: 14,
            boxShadow: "0 14px 35px rgba(0,0,0,0.7)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontWeight: 900,
                fontSize: 16,
                color: "#0f172a",
              }}
            >
              📢 AIR HOSTESS INSTRUCTION:
            </span>
            <div
              style={{
                padding: "4px 12px",
                backgroundColor: isAirplaneModeOn ? "#dcfce7" : "#fee2e2",
                border: isAirplaneModeOn ? "1.5px solid #22c55e" : "1.5px solid #ef4444",
                borderRadius: 6,
                fontFamily: "JetBrains Mono, monospace",
                fontWeight: 900,
                fontSize: 12,
                color: isAirplaneModeOn ? "#15803d" : "#b91c1c",
              }}
            >
              {isAirplaneModeOn ? "✈️ AIRPLANE MODE: ON" : "📱 CELLULAR ACTIVE (DANGER)"}
            </div>
          </div>

          <div
            style={{
              backgroundColor: "#f8fafc",
              border: "2px dashed #cbd5e1",
              borderRadius: 12,
              padding: "12px 18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontWeight: 900,
                  fontSize: 17,
                  color: "#0f172a",
                }}
              >
                &ldquo;Switch your phones to Airplane Mode!&rdquo;
              </div>
              <div
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: 12,
                  color: "#64748b",
                  marginTop: 2,
                }}
              >
                Myth: 1 phone can knock out flight control computers
              </div>
            </div>
            <div style={{ fontSize: 32 }}>⚠️</div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 12,
              color: "#334155",
            }}
          >
            <span>Passage Capacity: 300 Passengers</span>
            <strong style={{ color: "#ef4444" }}>Will the aircraft actually crash?</strong>
          </div>
        </div>

        {/* Bottom Explainer Pill */}
        <div
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.92)",
            border: "1.5px solid rgba(255, 255, 255, 0.2)",
            borderRadius: 12,
            padding: "8px 22px",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <span style={{ fontSize: 16 }}>⚡</span>
          <span
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 13,
              color: "#e2e8f0",
            }}
          >
            Fact check: Commercial planes won&apos;t fall — but landing becomes risky!
          </span>
        </div>
      </div>
    </SceneLayout>
  );
};

