import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneLayout } from "../../components/SceneLayout";
import { NeoBigButton } from "../../components/neo/NeoBigButton";
import { NeoTopPill } from "../../components/neo/NeoTopPill";

export interface IncognitoCtaSceneProps {
  id?: string;
  leadIn?: string;
  headline?: string;
  brollVideo?: string;
  durationInFrames: number;
}

export const IncognitoCtaScene: React.FC<IncognitoCtaSceneProps> = ({
  id,
  leadIn = "🛡️ REAL CYBER PRIVACY",
  headline = "USE ENCRYPTED *VPN & TOR*",
  brollVideo = "broll/vpn_encrypted_tunnel.mp4",
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  const clickFrame = 40;
  const isDepressed = frame >= clickFrame && frame <= clickFrame + 6;

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
          gap: 20,
          alignItems: "center",
          marginTop: 6,
          transform: `scale(${entrance})`,
        }}
      >
        {/* 3 Privacy Shield Recommendations */}
        <div
          style={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 14,
          }}
        >
          {[
            {
              icon: "🛡️",
              title: "Encrypted VPN",
              sub: "WireGuard / OpenVPN",
              desc: "Hides IP from ISP & Router",
              color: "#38bdf8",
            },
            {
              icon: "🧅",
              title: "Tor Network",
              sub: "Onion Multi-Hop",
              desc: "Triple-layer encrypted relay",
              color: "#a855f7",
            },
            {
              icon: "🔒",
              title: "Private DNS",
              sub: "DoH / DoT Port 853",
              desc: "Zero plaintext domain leaks",
              color: "#22c55e",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.96)",
                border: `3px solid ${item.color}`,
                borderRadius: 18,
                padding: "16px 14px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                gap: 6,
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.4)",
              }}
            >
              <span style={{ fontSize: 30 }}>{item.icon}</span>
              <span
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontWeight: 900,
                  fontSize: 16,
                  color: "#0f172a",
                }}
              >
                {item.title}
              </span>
              <span
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: 11,
                  fontWeight: 800,
                  color: item.color,
                }}
              >
                {item.sub}
              </span>
              <span
                style={{
                  fontFamily: "sans-serif",
                  fontSize: 12,
                  color: "#64748b",
                  lineHeight: 1.3,
                  marginTop: 2,
                }}
              >
                {item.desc}
              </span>
            </div>
          ))}
        </div>

        {/* Clean Follow Section */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
            marginTop: 10,
          }}
        >
          <NeoTopPill text="@_crackwithcode" color="blue" delayFrames={2} />

          <div
            style={{
              transform: isDepressed ? "translateY(4px) scale(0.97)" : "none",
              transition: "transform 0.1s ease",
            }}
          >
            <NeoBigButton
              text="FOLLOW FOR TECH SECRETS ⚡"
              subtext="EDUCATIONAL TECH & HARDWARE BREAKDOWNS"
              bg="#06b6d4"
              color="#ffffff"
              rotate={-1.5}
              delayFrames={4}
            />
          </div>
        </div>
      </div>
    </SceneLayout>
  );
};
