import React from "react";
import { useCurrentFrame } from "remotion";
import { SceneLayout } from "../../components/SceneLayout";

export interface NetworkLeakInspectorSceneProps {
  id?: string;
  leadIn?: string;
  headline?: string;
  brollVideo?: string;
  durationInFrames: number;
  activeTrackerIndex?: number; // 0 = Router, 1 = ISP, 2 = Server
}

export const NetworkLeakInspectorScene: React.FC<NetworkLeakInspectorSceneProps> = ({
  id,
  leadIn = "🌐 NETWORK LEAK INSPECTOR",
  headline = "THE 3 TRACKERS WATCHING YOU",
  brollVideo = "broll/wifi_router_blinking.mp4",
  durationInFrames,
  activeTrackerIndex = 0,
}) => {
  const frame = useCurrentFrame();

  const pulseScale = Math.sin(frame * 0.2) * 0.08 + 1;

  const trackers = [
    {
      num: "01",
      icon: "📡",
      name: "WiFi Router (DNS Cache)",
      protocol: "PORT 53 // PLAINTEXT DNS",
      leakedData: "GET: reddit.com/r/secret (LOGGED)",
      dangerLevel: "HIGH LEAK",
      color: "#f59e0b",
      tag: "HOME / CAFE",
    },
    {
      num: "02",
      icon: "🏢",
      name: "ISP Gateway (Airtel / Jio)",
      protocol: "TELECOM IP TIMELOG // LAWFUL MONITOR",
      leakedData: "USER IP: 103.24.182.91 @ 02:14:05 AM",
      dangerLevel: "FULL LOGGED",
      color: "#ef4444",
      tag: "GOVT / CARRIER",
    },
    {
      num: "03",
      icon: "🌐",
      name: "Target Web Server & Ads",
      protocol: "CANVAS + HARDWARE FINGERPRINTING",
      leakedData: "HASH: 0x9f8c • 120Hz • M5 Apple Silicon",
      dangerLevel: "IDENTIFIED",
      color: "#8b5cf6",
      tag: "AD NETWORKS",
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
          gap: 18,
          alignItems: "center",
          marginTop: 6,
        }}
      >
        {/* Live Sniffer Header Console */}
        <div
          style={{
            width: "100%",
            backgroundColor: "rgba(15, 23, 42, 0.95)",
            border: "2px solid rgba(56, 189, 248, 0.5)",
            borderRadius: 18,
            padding: "12px 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0 8px 30px rgba(0, 0, 0, 0.7)",
            backdropFilter: "blur(14px)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: "#ef4444",
                boxShadow: "0 0 12px #ef4444",
              }}
            />
            <span
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontWeight: 900,
                fontSize: 16,
                color: "#38bdf8",
                letterSpacing: "0.08em",
              }}
            >
              WIRESHARK TELEMETRY // REAL-TIME NETWORK SNIFFER
            </span>
          </div>
          <div
            style={{
              padding: "4px 12px",
              backgroundColor: "rgba(239, 68, 68, 0.2)",
              border: "1px solid #ef4444",
              borderRadius: 6,
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 12,
              fontWeight: 800,
              color: "#f87171",
            }}
          >
            INCOGNITO: BYPASSED
          </div>
        </div>

        {/* 3 Node Stack Cards */}
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          {trackers.map((t, idx) => {
            const isHighlight = idx === activeTrackerIndex;
            const borderGlow = isHighlight
              ? `3px solid ${t.color}`
              : "2px solid rgba(255, 255, 255, 0.2)";
            const bgCard = isHighlight
              ? "rgba(255, 255, 255, 0.98)"
              : "rgba(255, 255, 255, 0.88)";

            return (
              <div
                key={idx}
                style={{
                  width: "100%",
                  backgroundColor: bgCard,
                  borderRadius: 18,
                  border: borderGlow,
                  padding: "16px 22px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  boxShadow: isHighlight
                    ? `0 12px 35px ${t.color}40`
                    : "0 6px 20px rgba(0, 0, 0, 0.3)",
                  transform: isHighlight ? `scale(${pulseScale})` : "scale(1)",
                  transition: "all 0.3s ease",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  {/* Icon & Index Badge */}
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 14,
                      backgroundColor: `${t.color}20`,
                      border: `2px solid ${t.color}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 26,
                    }}
                  >
                    {t.icon}
                  </div>

                  {/* Node Info */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span
                        style={{
                          fontFamily: "JetBrains Mono, monospace",
                          fontWeight: 900,
                          fontSize: 12,
                          color: t.color,
                        }}
                      >
                        STEP {t.num}
                      </span>
                      <span
                        style={{
                          fontFamily: "Space Grotesk, sans-serif",
                          fontWeight: 900,
                          fontSize: 18,
                          color: "#0f172a",
                        }}
                      >
                        {t.name}
                      </span>
                    </div>

                    <div
                      style={{
                        fontFamily: "JetBrains Mono, monospace",
                        fontSize: 11,
                        color: "#64748b",
                        fontWeight: 600,
                      }}
                    >
                      {t.protocol}
                    </div>

                    {/* Leaked Payload Console Line */}
                    <div
                      style={{
                        backgroundColor: "#0f172a",
                        borderRadius: 6,
                        padding: "4px 10px",
                        marginTop: 4,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        maxWidth: 520,
                      }}
                    >
                      <span style={{ color: "#22c55e", fontSize: 11, fontFamily: "monospace" }}>$</span>
                      <span
                        style={{
                          fontFamily: "JetBrains Mono, monospace",
                          fontSize: 12,
                          fontWeight: 700,
                          color: "#f87171",
                          letterSpacing: "0.03em",
                        }}
                      >
                        {t.leakedData}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Status Badge */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    gap: 6,
                  }}
                >
                  <span
                    style={{
                      fontSize: 10,
                      fontFamily: "JetBrains Mono, monospace",
                      fontWeight: 800,
                      color: "#475569",
                      backgroundColor: "#e2e8f0",
                      padding: "2px 8px",
                      borderRadius: 4,
                    }}
                  >
                    {t.tag}
                  </span>
                  <span
                    style={{
                      padding: "6px 12px",
                      backgroundColor: `${t.color}20`,
                      border: `1.5px solid ${t.color}`,
                      borderRadius: 8,
                      fontFamily: "JetBrains Mono, monospace",
                      fontWeight: 800,
                      fontSize: 12,
                      color: t.color,
                      letterSpacing: "0.05em",
                    }}
                  >
                    {t.dangerLevel}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Alert Strip */}
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            borderRadius: 12,
            padding: "8px 20px",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span style={{ fontSize: 16 }}>🚨</span>
          <span
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 13,
              color: "#e2e8f0",
            }}
          >
            Airtel, Jio & WiFi admin see every single domain request in real time!
          </span>
        </div>
      </div>
    </SceneLayout>
  );
};
