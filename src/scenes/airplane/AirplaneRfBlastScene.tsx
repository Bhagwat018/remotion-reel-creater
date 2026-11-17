import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneLayout } from "../../components/SceneLayout";

export interface AirplaneRfBlastSceneProps {
  id?: string;
  leadIn?: string;
  headline?: string;
  brollVideo?: string;
  durationInFrames: number;
}

export const AirplaneRfBlastScene: React.FC<AirplaneRfBlastSceneProps> = ({
  id,
  leadIn = "📡 DANGER #1: MAXIMUM RF BLAST",
  headline = "35,000 FEET PAR PHONE KARTA HAI *FULL POWER RF BLAST!*",
  brollVideo = "broll/cell_tower_radio_waves.mp4",
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  // Pulse wave animation for RF rings
  const pulseScale = (frame % 30) / 30;
  const pulseOpacity = 1 - pulseScale;

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
        {/* RF Power Telemetry Header */}
        <div
          style={{
            width: "100%",
            backgroundColor: "rgba(15, 23, 42, 0.95)",
            border: "2px solid #ef4444",
            borderRadius: 18,
            padding: "12px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 10px 30px rgba(239, 68, 68, 0.4)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 28 }}>⚡</span>
            <div>
              <div
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontWeight: 900,
                  fontSize: 17,
                  color: "#ffffff",
                }}
              >
                CELLULAR MODEM TRANSMISSION GAIN
              </div>
              <div
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: 11,
                  color: "#fca5a5",
                }}
              >
                Altitude: 35,000 FT (10.6 km above ground) • Zero Tower Response
              </div>
            </div>
          </div>
          <div
            style={{
              padding: "4px 10px",
              backgroundColor: "rgba(239, 68, 68, 0.2)",
              border: "1.5px solid #ef4444",
              borderRadius: 6,
              fontFamily: "JetBrains Mono, monospace",
              fontWeight: 800,
              fontSize: 12,
              color: "#fecaca",
            }}
          >
            TX POWER: 3,000 mW (MAX)
          </div>
        </div>

        {/* High-Contrast Comparison Card: Ground vs Flight Altitude */}
        <div
          style={{
            width: "100%",
            display: "flex",
            gap: 14,
            justifyContent: "center",
          }}
        >
          {/* Ground Normal */}
          <div
            style={{
              flex: 1,
              backgroundColor: "rgba(255, 255, 255, 0.98)",
              border: "3px solid #64748b",
              borderRadius: 16,
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              gap: 8,
              boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontWeight: 900,
                  fontSize: 15,
                  color: "#334155",
                }}
              >
                🏙️ GROUND USAGE
              </span>
              <span
                style={{
                  padding: "2px 8px",
                  backgroundColor: "#f1f5f9",
                  color: "#475569",
                  border: "1px solid #cbd5e1",
                  borderRadius: 4,
                  fontSize: 11,
                  fontFamily: "JetBrains Mono, monospace",
                  fontWeight: 900,
                }}
              >
                100 mW
              </span>
            </div>

            <div
              style={{
                height: 80,
                backgroundColor: "#f8fafc",
                borderRadius: 10,
                border: "1px dashed #94a3b8",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 4,
              }}
            >
              <div style={{ fontSize: 22 }}>📶</div>
              <div
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: 11,
                  color: "#475569",
                  fontWeight: 700,
                }}
              >
                Tower is 500m away (Low Power)
              </div>
            </div>

            <div
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 11,
                color: "#64748b",
              }}
            >
              Modem throttles down to conserve battery. Zero signal clutter.
            </div>
          </div>

          {/* 35,000 FT Search */}
          <div
            style={{
              flex: 1,
              backgroundColor: "rgba(255, 255, 255, 0.98)",
              border: "3px solid #ef4444",
              borderRadius: 16,
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              gap: 8,
              boxShadow: "0 8px 30px rgba(239, 68, 68, 0.35)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontWeight: 900,
                  fontSize: 15,
                  color: "#b91c1c",
                }}
              >
                ✈️ AT 35,000 FEET
              </span>
              <span
                style={{
                  padding: "2px 8px",
                  backgroundColor: "#fee2e2",
                  color: "#b91c1c",
                  border: "1.5px solid #ef4444",
                  borderRadius: 4,
                  fontSize: 11,
                  fontFamily: "JetBrains Mono, monospace",
                  fontWeight: 900,
                }}
              >
                3,000 mW (30X)
              </span>
            </div>

            <div
              style={{
                height: 80,
                backgroundColor: "#fff1f2",
                borderRadius: 10,
                border: "2px solid #ef4444",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Expanding RF Pulse Ring */}
              <div
                style={{
                  position: "absolute",
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                  border: "2px solid #ef4444",
                  transform: `scale(${1 + pulseScale * 2})`,
                  opacity: pulseOpacity,
                  pointerEvents: "none",
                }}
              />
              <div style={{ fontSize: 22 }}>📡</div>
              <div
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: 11,
                  color: "#991b1b",
                  fontWeight: 800,
                }}
              >
                BLASTING FULL RF ENERGY!
              </div>
            </div>

            <div
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 11,
                color: "#64748b",
              }}
            >
              Desperately searching for cell towers 10km below at Mach 0.8 speed!
            </div>
          </div>
        </div>

        {/* Bottom Explainer Tag */}
        <div
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.92)",
            border: "1.5px solid rgba(255, 255, 255, 0.2)",
            borderRadius: 12,
            padding: "8px 20px",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span style={{ fontSize: 16 }}>⚠️</span>
          <span
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 13,
              color: "#e2e8f0",
            }}
          >
            300 phones searching together blast an electromagnetic radiation bubble inside the cabin!
          </span>
        </div>
      </div>
    </SceneLayout>
  );
};

