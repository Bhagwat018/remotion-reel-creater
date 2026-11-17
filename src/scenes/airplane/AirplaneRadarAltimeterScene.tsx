import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneLayout } from "../../components/SceneLayout";

export interface AirplaneRadarAltimeterSceneProps {
  id?: string;
  leadIn?: string;
  headline?: string;
  brollVideo?: string;
  durationInFrames: number;
}

export const AirplaneRadarAltimeterScene: React.FC<AirplaneRadarAltimeterSceneProps> = ({
  id,
  leadIn = "📡 DANGER #2: FREQUENCY BLEED HAZARD",
  headline = "HIGH-POWER 5G SIGNALS *RUIN RADAR ALTIMETER IN FOG!*",
  brollVideo = "broll/airplane_landing_fog.mp4",
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  const glitch = Math.sin(frame * 0.4) > 0.6;

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
          gap: 14,
          alignItems: "center",
          marginTop: 6,
          transform: `scale(${entrance})`,
        }}
      >
        {/* Radar Altimeter Telemetry Header */}
        <div
          style={{
            width: "100%",
            backgroundColor: "rgba(15, 23, 42, 0.95)",
            border: "2px solid #38bdf8",
            borderRadius: 18,
            padding: "12px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 10px 30px rgba(56, 189, 248, 0.35)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 28 }}>🛬</span>
            <div>
              <div
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontWeight: 900,
                  fontSize: 17,
                  color: "#ffffff",
                }}
              >
                AUTOLAND RADAR ALTIMETER (CAT III ILS)
              </div>
              <div
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: 11,
                  color: "#38bdf8",
                }}
              >
                Zero Runway Visibility in Fog • Crucial for Touchdown Flare
              </div>
            </div>
          </div>
          <div
            style={{
              padding: "4px 10px",
              backgroundColor: glitch ? "rgba(239, 68, 68, 0.3)" : "rgba(56, 189, 248, 0.2)",
              border: glitch ? "1.5px solid #ef4444" : "1.5px solid #38bdf8",
              borderRadius: 6,
              fontFamily: "JetBrains Mono, monospace",
              fontWeight: 800,
              fontSize: 12,
              color: glitch ? "#fca5a5" : "#bae6fd",
            }}
          >
            {glitch ? "⚠️ ALTIMETER ERR" : "HEIGHT: 85 FT"}
          </div>
        </div>

        {/* 5G Spectrum vs Avionics Radar Comparison Card */}
        <div
          style={{
            width: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.98)",
            border: "3px solid #0f172a",
            borderRadius: 18,
            padding: "16px 20px",
            display: "flex",
            flexDirection: "column",
            gap: 12,
            boxShadow: "0 14px 35px rgba(0,0,0,0.7)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontWeight: 900,
                fontSize: 15,
                color: "#0f172a",
              }}
            >
              📡 SPECTRUM PROXIMITY HAZARD:
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
                fontWeight: 800,
              }}
            >
              HARMONIC BLEED RISK
            </span>
          </div>

          {/* Dual Frequency Spectrum Bars */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {/* 5G C-Band */}
            <div
              style={{
                backgroundColor: "#fef2f2",
                border: "1.5px solid #ef4444",
                borderRadius: 10,
                padding: "10px 14px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 20 }}>📶</span>
                <span style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 800, fontSize: 14, color: "#991b1b" }}>
                  5G C-Band Mobile Towers
                </span>
              </div>
              <span style={{ fontFamily: "JetBrains Mono, monospace", fontWeight: 900, fontSize: 13, color: "#dc2626" }}>
                3.70 GHz — 3.98 GHz
              </span>
            </div>

            {/* Radar Altimeter */}
            <div
              style={{
                backgroundColor: "#f0fdf4",
                border: "1.5px solid #22c55e",
                borderRadius: 10,
                padding: "10px 14px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 20 }}>✈️</span>
                <span style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 800, fontSize: 14, color: "#14532d" }}>
                  Aircraft Radar Altimeter
                </span>
              </div>
              <span style={{ fontFamily: "JetBrains Mono, monospace", fontWeight: 900, fontSize: 13, color: "#16a34a" }}>
                4.20 GHz — 4.40 GHz
              </span>
            </div>
          </div>

          <div
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 12,
              color: "#334155",
              lineHeight: 1.4,
            }}
          >
            In heavy fog or clouds, pilots cannot see the runway with bare eyes. Radar altimeter bounce measures exact wheel height for landing! High-power 5G signals bleed into radar receivers!
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
            FAA &amp; airlines warn: 5G interference in zero-visibility fog can disrupt auto-landing!
          </span>
        </div>
      </div>
    </SceneLayout>
  );
};

