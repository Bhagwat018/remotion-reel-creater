import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneLayout } from "../../components/SceneLayout";

export interface AtmMagneticHeadSceneProps {
  id?: string;
  leadIn?: string;
  headline?: string;
  brollVideo?: string;
  durationInFrames: number;
}

export const AtmMagneticHeadScene: React.FC<AtmMagneticHeadSceneProps> = ({
  id,
  leadIn = "🧲 LAYER 2: MAGNETIC SENSOR HEAD",
  headline = "DUSRA: MAGNETIC HEAD *SECURITY THREAD*",
  brollVideo = "broll/currency_security_thread.mp4",
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  // Oscilloscope wave phase
  const waveShift = frame * 4;

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
        {/* Inductive Head Telemetry */}
        <div
          style={{
            width: "100%",
            backgroundColor: "rgba(15, 23, 42, 0.95)",
            border: "2px solid #06b6d4",
            borderRadius: 18,
            padding: "12px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 10px 30px rgba(6, 182, 212, 0.4)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 28 }}>🧲</span>
            <div>
              <div
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontWeight: 900,
                  fontSize: 17,
                  color: "#ffffff",
                }}
              >
                ELECTROMAGNETIC FLUX HEAD (MICR)
              </div>
              <div
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: 11,
                  color: "#67e8f9",
                }}
              >
                Inductive Coil Sensitivity: 0.05 μT • Scan Speed: 4.5 m/s
              </div>
            </div>
          </div>
          <div
            style={{
              padding: "4px 10px",
              backgroundColor: "rgba(6, 182, 212, 0.2)",
              border: "1.5px solid #06b6d4",
              borderRadius: 6,
              fontFamily: "JetBrains Mono, monospace",
              fontWeight: 800,
              fontSize: 12,
              color: "#a5f3fc",
            }}
          >
            FLUX DETECTED: 1.85 μT
          </div>
        </div>

        {/* Oscilloscope Waveform Display */}
        <div
          style={{
            width: "100%",
            backgroundColor: "rgba(2, 6, 23, 0.96)",
            border: "2px solid #06b6d4",
            borderRadius: 18,
            padding: "16px 20px",
            display: "flex",
            flexDirection: "column",
            gap: 12,
            boxShadow: "0 12px 35px rgba(0,0,0,0.8)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontWeight: 900,
                fontSize: 13,
                color: "#22d3ee",
              }}
            >
              OSCILLOSCOPE: SECURITY THREAD CROSSING
            </span>
            <span
              style={{
                padding: "2px 8px",
                backgroundColor: "rgba(34, 197, 94, 0.2)",
                color: "#22c55e",
                border: "1px solid #22c55e",
                borderRadius: 4,
                fontSize: 11,
                fontFamily: "JetBrains Mono, monospace",
                fontWeight: 800,
              }}
            >
              FERRO SIGNATURE CONFIRMED
            </span>
          </div>

          {/* SVG Waveform Visualization */}
          <div
            style={{
              width: "100%",
              height: 110,
              backgroundColor: "#030712",
              borderRadius: 10,
              border: "1px solid #1e293b",
              position: "relative",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
            }}
          >
            {/* Grid Lines */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage:
                  "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />

            {/* Cyan Waveform line representing magnetic pulse */}
            <svg width="100%" height="100%" viewBox="0 0 800 110" preserveAspectRatio="none">
              <path
                d={`M 0 55 
                    Q 150 55, 250 55 
                    Q 300 55, 330 15 
                    Q 360 -25, 400 55 
                    Q 440 135, 470 95 
                    Q 500 55, 550 55 
                    L 800 55`}
                fill="none"
                stroke="#06b6d4"
                strokeWidth="4"
                style={{
                  filter: "drop-shadow(0 0 10px #06b6d4)",
                  transform: `translateX(${((waveShift % 200) - 100) * 0.5}px)`,
                }}
              />
            </svg>

            {/* Zero-level Baseline */}
            <div
              style={{
                position: "absolute",
                top: 55,
                left: 0,
                right: 0,
                height: 1,
                backgroundColor: "rgba(255,255,255,0.2)",
                borderStyle: "dashed",
              }}
            />

            {/* Marker Label */}
            <div
              style={{
                position: "absolute",
                top: 10,
                left: "48%",
                backgroundColor: "rgba(6, 182, 212, 0.9)",
                color: "#ffffff",
                padding: "2px 8px",
                borderRadius: 4,
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 10,
                fontWeight: 900,
              }}
            >
              FERRO PEAK: +1.85μT
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 11,
              color: "#94a3b8",
            }}
          >
            <span>Fake Note: Silver Foil Strip (0.00 μT - Flatline)</span>
            <span style={{ color: "#22c55e", fontWeight: 800 }}>Real Note: Encrypted Ferrous Alloy</span>
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
          <span style={{ fontSize: 16 }}>⚡</span>
          <span
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 13,
              color: "#e2e8f0",
            }}
          >
            Scammers use plastic shiny foil — but cannot fabricate microscopic magnetic particles!
          </span>
        </div>
      </div>
    </SceneLayout>
  );
};

