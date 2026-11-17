import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneLayout } from "../../components/SceneLayout";

export interface IncognitoPrivacyMatrixSceneProps {
  id?: string;
  leadIn?: string;
  headline?: string;
  brollVideo?: string;
  durationInFrames: number;
}

export const IncognitoPrivacyMatrixScene: React.FC<IncognitoPrivacyMatrixSceneProps> = ({
  id,
  leadIn = "📱 THE INCOGNITO ILLUSION",
  headline = "LOCAL HISTORY VS REAL PRIVACY",
  brollVideo = "broll/phone_clearing_history.mp4",
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  const pulse = Math.sin(frame * 0.15) * 0.1 + 0.9;

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
          gap: 22,
          alignItems: "center",
          marginTop: 6,
          transform: `scale(${entrance})`,
        }}
      >
        {/* Top Warning Alert Banner */}
        <div
          style={{
            width: "100%",
            backgroundColor: "rgba(239, 68, 68, 0.15)",
            border: "2px solid #ef4444",
            borderRadius: 18,
            padding: "14px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 8px 30px rgba(239, 68, 68, 0.3)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ fontSize: 32 }}>⚠️</span>
            <div>
              <div
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontWeight: 900,
                  fontSize: 22,
                  color: "#ffffff",
                  letterSpacing: "0.05em",
                }}
              >
                BROWSER WARNING: ZERO NETWORK ANONYMITY
              </div>
              <div
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: 14,
                  color: "#fca5a5",
                }}
              >
                Local cookies wiped • Real-time traffic fully exposed
              </div>
            </div>
          </div>
          <div
            style={{
              padding: "6px 14px",
              backgroundColor: "#ef4444",
              color: "#ffffff",
              fontFamily: "JetBrains Mono, monospace",
              fontWeight: 800,
              fontSize: 13,
              borderRadius: 8,
              letterSpacing: "0.06em",
              transform: `scale(${pulse})`,
            }}
          >
            EXPOSED
          </div>
        </div>

        {/* 2-Column Neo-Brutalist Comparison Matrix */}
        <div
          style={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 20,
          }}
        >
          {/* LEFT: What You Think Happens (Local Only) */}
          <div
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.96)",
              borderRadius: 22,
              border: "3px solid #10b981",
              padding: "24px 22px",
              boxShadow: "0 14px 35px rgba(0, 0, 0, 0.4)",
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 26 }}>📱</span>
                <span
                  style={{
                    fontFamily: "Space Grotesk, sans-serif",
                    fontWeight: 900,
                    fontSize: 20,
                    color: "#0f172a",
                    letterSpacing: "0.02em",
                  }}
                >
                  WHAT YOU THINK
                </span>
              </div>
              <span
                style={{
                  fontSize: 11,
                  fontFamily: "JetBrains Mono, monospace",
                  fontWeight: 800,
                  color: "#059669",
                  backgroundColor: "#d1fae5",
                  padding: "4px 10px",
                  borderRadius: 6,
                }}
              >
                PHONE ONLY
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { title: "Browser History", status: "CLEARED 🗑️", note: "Phone me save nahi hota", pass: true },
                { title: "Local Cookies", status: "DELETED ❌", note: "Session end hote hi gayab", pass: true },
                { title: "Autofill Forms", status: "DISABLED 🔒", note: "Passwords auto-save band", pass: true },
              ].map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: "#f0fdf4",
                    border: "1.5px solid #86efac",
                    borderRadius: 14,
                    padding: "12px 14px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 800, fontSize: 16, color: "#14532d" }}>
                      {item.title}
                    </span>
                    <span style={{ fontFamily: "JetBrains Mono, monospace", fontWeight: 800, fontSize: 12, color: "#15803d" }}>
                      {item.status}
                    </span>
                  </div>
                  <span style={{ fontSize: 13, color: "#4b5563", fontFamily: "sans-serif" }}>
                    {item.note}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: What ACTUALLY Happens (The Real Internet) */}
          <div
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.96)",
              borderRadius: 22,
              border: "3px solid #ef4444",
              padding: "24px 22px",
              boxShadow: "0 14px 35px rgba(0, 0, 0, 0.4)",
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 26 }}>🌐</span>
                <span
                  style={{
                    fontFamily: "Space Grotesk, sans-serif",
                    fontWeight: 900,
                    fontSize: 20,
                    color: "#0f172a",
                    letterSpacing: "0.02em",
                  }}
                >
                  WHAT HAPPENS
                </span>
              </div>
              <span
                style={{
                  fontSize: 11,
                  fontFamily: "JetBrains Mono, monospace",
                  fontWeight: 800,
                  color: "#b91c1c",
                  backgroundColor: "#fee2e2",
                  padding: "4px 10px",
                  borderRadius: 6,
                }}
              >
                LIVE NETWORK
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { title: "WiFi Router DNS", status: "LOGGED 📡", note: "Har website ka domain record", danger: true },
                { title: "ISP (Airtel/Jio)", status: "TRACKED 🏢", note: "IP aur exact timestamp saved", danger: true },
                { title: "Web Server ID", status: "EXPOSED 👁️", note: "Hardware fingerprint scan", danger: true },
              ].map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: "#fef2f2",
                    border: "1.5px solid #fca5a5",
                    borderRadius: 14,
                    padding: "12px 14px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 800, fontSize: 16, color: "#7f1d1d" }}>
                      {item.title}
                    </span>
                    <span style={{ fontFamily: "JetBrains Mono, monospace", fontWeight: 800, fontSize: 12, color: "#dc2626" }}>
                      {item.status}
                    </span>
                  </div>
                  <span style={{ fontSize: 13, color: "#6b7280", fontFamily: "sans-serif" }}>
                    {item.note}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Verdict Pill */}
        <div
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.9)",
            border: "1.5px solid rgba(255, 255, 255, 0.2)",
            borderRadius: 14,
            padding: "10px 24px",
            display: "flex",
            alignItems: "center",
            gap: 12,
            boxShadow: "0 6px 20px rgba(0, 0, 0, 0.5)",
          }}
        >
          <span style={{ fontSize: 18 }}>💡</span>
          <span
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontWeight: 700,
              fontSize: 15,
              color: "#ffffff",
              letterSpacing: "0.02em",
            }}
          >
            Incognito only hides history from people holding your phone — NOT the internet!
          </span>
        </div>
      </div>
    </SceneLayout>
  );
};
