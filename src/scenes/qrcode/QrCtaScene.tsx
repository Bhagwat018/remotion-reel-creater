import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneLayout } from "../../components/SceneLayout";
import { NeoBigButton } from "../../components/neo/NeoBigButton";
import { NeoTopPill } from "../../components/neo/NeoTopPill";

export interface QrCtaSceneProps {
  id?: string;
  leadIn?: string;
  headline?: string;
  brollVideo?: string;
  durationInFrames: number;
}

export const QrCtaScene: React.FC<QrCtaSceneProps> = ({
  id,
  leadIn = "💡 LEARN HOW TECH WORKS",
  headline = "FOLLOW *@_CRACKWITHCODE*",
  brollVideo = "broll/cyber_grid_loop.mp4",
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  const clickFrame = 35;
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
        {/* 3 Tech Insights Summary */}
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
              icon: "🚀",
              title: "NASA Space Math",
              desc: "Reed-Solomon recovery used in Voyager",
              color: "#38bdf8",
            },
            {
              icon: "🛡️",
              title: "30% Redundancy",
              desc: "Rebuilds damaged pixels out of thin air",
              color: "#22c55e",
            },
            {
              icon: "🎨",
              title: "Center Logo Hack",
              desc: "Brand logos are treated as error tolerance",
              color: "#a855f7",
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
              <span style={{ fontSize: 32 }}>{item.icon}</span>
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
          <NeoTopPill text="@_crackwithcode" color="orange" delayFrames={2} />

          <div
            style={{
              transform: isDepressed ? "translateY(4px) scale(0.97)" : "none",
              transition: "transform 0.1s ease",
            }}
          >
            <NeoBigButton
              text="FOLLOW FOR TECH SECRETS ⚡"
              subtext="SCIENCE, HARDWARE & SYSTEM BREAKDOWNS"
              bg="#ec4899"
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

