import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneLayout } from "../../components/SceneLayout";

export interface IncognitoHookSceneProps {
  id?: string;
  leadIn?: string;
  headline?: string;
  brollVideo?: string;
  durationInFrames: number;
}

export const IncognitoHookScene: React.FC<IncognitoHookSceneProps> = ({
  id,
  leadIn = "🕵️‍♂️ THE BIG ILLUSION",
  headline = "INCOGNITO MODE KA *ASLI SACH*",
  brollVideo = "broll/incognito_browser_mode.mp4",
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  // Spy glasses pulse
  const pulse = Math.sin(frame * 0.18) * 0.08 + 1;
  const alertBlink = Math.floor(frame / 12) % 2 === 0;

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
          gap: 22,
          alignItems: "center",
          marginTop: 10,
          transform: `scale(${entrance})`,
        }}
      >
        {/* Giant Cyber Spy Glasses HUD Badge */}
        <div
          style={{
            position: "relative",
            width: "100%",
            backgroundColor: "rgba(15, 23, 42, 0.94)",
            border: "3px solid #38bdf8",
            borderRadius: 24,
            padding: "24px 30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 16px 45px rgba(0, 0, 0, 0.6)",
            backdropFilter: "blur(14px)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            {/* Spy Icon */}
            <div
              style={{
                width: 76,
                height: 76,
                borderRadius: 20,
                backgroundColor: "rgba(56, 189, 248, 0.15)",
                border: "2px solid #38bdf8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 42,
                transform: `scale(${pulse})`,
              }}
            >
              🕵️‍♂️
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <div
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontWeight: 900,
                  fontSize: 26,
                  color: "#ffffff",
                  letterSpacing: "0.03em",
                }}
              >
                CHROME INCOGNITO MODE
              </div>
              <div
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: 14,
                  color: "#94a3b8",
                  letterSpacing: "0.05em",
                }}
              >
                ANONYMITY STATUS: <span style={{ color: "#ef4444", fontWeight: 900 }}>COMPROMISED</span>
              </div>
            </div>
          </div>

          {/* Right Red Alert Beacon */}
          <div
            style={{
              padding: "8px 16px",
              backgroundColor: alertBlink ? "#ef4444" : "rgba(239, 68, 68, 0.3)",
              border: "2px solid #ef4444",
              color: "#ffffff",
              fontFamily: "JetBrains Mono, monospace",
              fontWeight: 900,
              fontSize: 13,
              borderRadius: 10,
              letterSpacing: "0.08em",
              boxShadow: alertBlink ? "0 0 20px #ef4444" : "none",
            }}
          >
            LIVE EXPOSURE
          </div>
        </div>

        {/* 2 Floating Cards: The Illusion vs The Reality */}
        <div
          style={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 18,
          }}
        >
          {/* Card 1: The Myth */}
          <div
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.96)",
              borderRadius: 20,
              border: "3px solid #cbd5e1",
              padding: "20px 22px",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.35)",
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 24 }}>🙈</span>
              <span
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontWeight: 900,
                  fontSize: 18,
                  color: "#0f172a",
                }}
              >
                THE MYTH
              </span>
            </div>
            <div
              style={{
                fontFamily: "sans-serif",
                fontSize: 14,
                color: "#475569",
                lineHeight: 1.4,
              }}
            >
              "Mujhe koi nahi dekh sakta, sab private aur encrypted hai."
            </div>
            <div
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 11,
                fontWeight: 800,
                color: "#059669",
                backgroundColor: "#d1fae5",
                padding: "4px 8px",
                borderRadius: 6,
                alignSelf: "flex-start",
                marginTop: 4,
              }}
            >
              LOCAL ILLUSION
            </div>
          </div>

          {/* Card 2: The Dark Reality */}
          <div
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.96)",
              borderRadius: 20,
              border: "3px solid #ef4444",
              padding: "20px 22px",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.35)",
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 24 }}>👁️</span>
              <span
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontWeight: 900,
                  fontSize: 18,
                  color: "#7f1d1d",
                }}
              >
                THE REALITY
              </span>
            </div>
            <div
              style={{
                fontFamily: "sans-serif",
                fontSize: 14,
                color: "#475569",
                lineHeight: 1.4,
              }}
            >
              "WiFi Router, ISP Airtel/Jio aur Target Server sab dekh rahe hain!"
            </div>
            <div
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 11,
                fontWeight: 800,
                color: "#dc2626",
                backgroundColor: "#fee2e2",
                padding: "4px 8px",
                borderRadius: 6,
                alignSelf: "flex-start",
                marginTop: 4,
              }}
            >
              100% UNPROTECTED
            </div>
          </div>
        </div>

        {/* Bottom Curiosity Hook Strip */}
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.85)",
            border: "1.5px solid rgba(56, 189, 248, 0.4)",
            borderRadius: 14,
            padding: "10px 24px",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <span style={{ fontSize: 18 }}>💡</span>
          <span
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 14,
              color: "#38bdf8",
              fontWeight: 700,
            }}
          >
            Swipe next to see WHERE your private data leaks...
          </span>
        </div>
      </div>
    </SceneLayout>
  );
};
