import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneLayout } from "../../components/SceneLayout";

export interface AirplaneCrashMythSceneProps {
  id?: string;
  leadIn?: string;
  headline?: string;
  brollVideo?: string;
  durationInFrames: number;
}

export const AirplaneCrashMythScene: React.FC<AirplaneCrashMythSceneProps> = ({
  id,
  leadIn = "🛡️ AVIONICS REALITY CHECK",
  headline = "PLANE CRASH TOH NAHI HOGA! *LEKIN 2 BADE KHATRE HAIN*",
  brollVideo = "broll/airplane_passenger_cabin.mp4",
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  const threats = [
    {
      num: "01",
      title: "PILOT HEADSET AUDIO JAM",
      desc: "Phone radio burst creates 'bzz-bzz' noise in pilot's ears, muting Air Traffic Control!",
      color: "#ef4444",
      icon: "🎧",
    },
    {
      num: "02",
      title: "5G RADAR ALTIMETER CORRUPTION",
      desc: "5G C-Band bleeds into 4.2-4.4 GHz radar, ruining exact runway height in thick fog!",
      color: "#f59e0b",
      icon: "📡",
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
        {/* Debunk Banner */}
        <div
          style={{
            width: "100%",
            backgroundColor: "rgba(15, 23, 42, 0.95)",
            border: "2px solid #22c55e",
            borderRadius: 18,
            padding: "12px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 10px 30px rgba(34, 197, 94, 0.35)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 28 }}>🛡️</span>
            <div>
              <div
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontWeight: 900,
                  fontSize: 17,
                  color: "#ffffff",
                }}
              >
                AVIONICS FARADAY CAGE PROTECTION
              </div>
              <div
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: 11,
                  color: "#86efac",
                }}
              >
                Fly-by-wire flight control circuits are triple-shielded from phone signals
              </div>
            </div>
          </div>
          <div
            style={{
              padding: "4px 10px",
              backgroundColor: "rgba(34, 197, 94, 0.2)",
              border: "1px solid #22c55e",
              borderRadius: 6,
              fontFamily: "JetBrains Mono, monospace",
              fontWeight: 800,
              fontSize: 12,
              color: "#bbf7d0",
            }}
          >
            CRASH: 0.00%
          </div>
        </div>

        {/* 2 Threat Neo-Cards */}
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          {threats.map((threat, idx) => (
            <div
              key={idx}
              style={{
                width: "100%",
                backgroundColor: "rgba(255, 255, 255, 0.98)",
                borderRadius: 16,
                border: `3px solid ${threat.color}`,
                padding: "14px 20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                boxShadow: `0 8px 24px ${threat.color}25`,
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
                    backgroundColor: `${threat.color}15`,
                    borderRadius: 10,
                    border: `1.5px solid ${threat.color}`,
                    fontSize: 22,
                  }}
                >
                  {threat.icon}
                </span>

                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span
                      style={{
                        fontFamily: "JetBrains Mono, monospace",
                        fontWeight: 900,
                        fontSize: 13,
                        color: threat.color,
                      }}
                    >
                      RISK #{threat.num}:
                    </span>
                    <span
                      style={{
                        fontFamily: "Space Grotesk, sans-serif",
                        fontWeight: 900,
                        fontSize: 16,
                        color: "#0f172a",
                      }}
                    >
                      {threat.title}
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
                    {threat.desc}
                  </div>
                </div>
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
          <span style={{ fontSize: 16 }}>⚠️</span>
          <span
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 13,
              color: "#e2e8f0",
            }}
          >
            The risk isn&apos;t dropping from the sky — it&apos;s blind landing &amp; audio interference!
          </span>
        </div>
      </div>
    </SceneLayout>
  );
};

