import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneLayout } from "../../components/SceneLayout";

export interface AtmXrayChamberSceneProps {
  id?: string;
  leadIn?: string;
  headline?: string;
  brollVideo?: string;
  durationInFrames: number;
}

export const AtmXrayChamberScene: React.FC<AtmXrayChamberSceneProps> = ({
  id,
  leadIn = "🔬 3-TIER HARDWARE SCAN",
  headline = "ATM NOTE KO DEKHTA NAHI *USKA X-RAY KARTA HAI!*",
  brollVideo = "broll/cash_counter_rollers.mp4",
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  const scanWave = (frame * 4) % 100;

  const layers = [
    {
      num: "01",
      title: "ULTRAVIOLET LIGHT",
      sub: "365nm Optical Sensor",
      desc: "Invisible glowing fluorescent ink & watermark",
      color: "#a855f7",
      icon: "🔦",
    },
    {
      num: "02",
      title: "MAGNETIC SENSOR HEAD",
      sub: "Inductive Ferro Sensor",
      desc: "Metallic security thread with micro-magnetic flux",
      color: "#06b6d4",
      icon: "🧲",
    },
    {
      num: "03",
      title: "LASER MICROMETER",
      sub: "Optical Caliper (0.11mm)",
      desc: "100% Pure cotton rag fiber vs cheap wood-pulp paper",
      color: "#22c55e",
      icon: "📐",
    },
  ];

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
        {/* Hardware Architecture Top Banner */}
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
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.7)",
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
                MULTI-SPECTRAL HARDWARE PENETRATION
              </div>
              <div
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: 11,
                  color: "#38bdf8",
                }}
              >
                Human eyes look at surface ink • Machine audits atomic physics
              </div>
            </div>
          </div>
          <div
            style={{
              padding: "4px 10px",
              backgroundColor: "rgba(56, 189, 248, 0.2)",
              border: "1px solid #38bdf8",
              borderRadius: 6,
              fontFamily: "JetBrains Mono, monospace",
              fontWeight: 800,
              fontSize: 11,
              color: "#38bdf8",
            }}
          >
            ACTIVE X-RAY
          </div>
        </div>

        {/* 3 Scanning Layers */}
        <div
          style={{
            position: "relative",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 12,
            overflow: "hidden",
            padding: "4px 0",
          }}
        >
          {/* Vertical Laser Scan Beam */}
          <div
            style={{
              position: "absolute",
              top: `${scanWave}%`,
              left: 0,
              right: 0,
              height: 3,
              backgroundColor: "#38bdf8",
              boxShadow: "0 0 16px #38bdf8, 0 0 30px #38bdf8",
              zIndex: 10,
              pointerEvents: "none",
            }}
          />

          {layers.map((layer, idx) => (
            <div
              key={idx}
              style={{
                width: "100%",
                backgroundColor: "rgba(255, 255, 255, 0.96)",
                borderRadius: 14,
                border: `2px solid ${layer.color}`,
                padding: "12px 18px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                boxShadow: `0 8px 24px ${layer.color}25`,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 44,
                    height: 44,
                    backgroundColor: `${layer.color}15`,
                    borderRadius: 10,
                    border: `1.5px solid ${layer.color}`,
                    fontSize: 22,
                  }}
                >
                  {layer.icon}
                </span>

                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span
                      style={{
                        fontFamily: "JetBrains Mono, monospace",
                        fontWeight: 900,
                        fontSize: 13,
                        color: layer.color,
                      }}
                    >
                      LAYER {layer.num}:
                    </span>
                    <span
                      style={{
                        fontFamily: "Space Grotesk, sans-serif",
                        fontWeight: 900,
                        fontSize: 16,
                        color: "#0f172a",
                      }}
                    >
                      {layer.title}
                    </span>
                  </div>
                  <div
                    style={{
                      fontFamily: "JetBrains Mono, monospace",
                      fontSize: 12,
                      color: "#475569",
                      marginTop: 2,
                    }}
                  >
                    {layer.desc}
                  </div>
                </div>
              </div>

              <div
                style={{
                  padding: "4px 10px",
                  backgroundColor: `${layer.color}15`,
                  border: `1px solid ${layer.color}`,
                  borderRadius: 6,
                  fontFamily: "JetBrains Mono, monospace",
                  fontWeight: 800,
                  fontSize: 11,
                  color: layer.color,
                  textAlign: "right",
                  whiteSpace: "nowrap",
                }}
              >
                {layer.sub}
              </div>
            </div>
          ))}
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
          <span style={{ fontSize: 16 }}>🛡️</span>
          <span
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 13,
              color: "#e2e8f0",
            }}
          >
            All 3 sensors must pass in 200ms or note is spat back immediately!
          </span>
        </div>
      </div>
    </SceneLayout>
  );
};

