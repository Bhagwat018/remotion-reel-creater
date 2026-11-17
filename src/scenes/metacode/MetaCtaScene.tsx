import React from "react";
import { spring, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneLayout } from "../../components/SceneLayout";

export interface MetaCtaSceneProps {
  id?: string;
  leadIn?: string;
  headline?: string;
  brollVideo?: string;
  durationInFrames: number;
}

export const MetaCtaScene: React.FC<MetaCtaSceneProps> = ({
  id,
  leadIn = "🚀 THE NEW VIDEO PARADIGM",
  headline = "VIDEO EDITING KA ZAMANA GAYA, *AB CODE SE VIDEOS BANTI HAIN!*",
  brollVideo = "broll/cyber_grid_loop.mp4",
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardSpring = spring({
    frame: frame - 4,
    fps,
    config: { damping: 14, stiffness: 130 },
  });

  const buttonSpring = spring({
    frame: frame - 12,
    fps,
    config: { damping: 12, stiffness: 150 },
  });

  const cursorProgress = interpolate(frame - 18, [0, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const isClicked = frame > 38;

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
          alignItems: "stretch",
          marginTop: 8,
          zIndex: 10,
        }}
      >
        {/* MAIN FOLLOW CARD */}
        <div
          style={{
            transform: `scale(${cardSpring}) translateY(${(1 - cardSpring) * 16}px)`,
            opacity: cardSpring,
            backgroundColor: "rgba(15, 23, 42, 0.95)",
            backdropFilter: "blur(24px)",
            border: "2.5px solid rgba(56, 189, 248, 0.5)",
            borderRadius: 24,
            padding: "24px 28px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
            boxShadow: "0 24px 60px rgba(0,0,0,0.7), 0 0 35px rgba(56, 189, 248, 0.2)",
            position: "relative",
          }}
        >
          {/* Brand Avatar */}
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              backgroundColor: "#030712",
              border: "3px solid #38bdf8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 24px rgba(56, 189, 248, 0.5)",
              fontSize: 36,
            }}
          >
            ⚡
          </div>

          {/* Channel Name */}
          <div style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: 4 }}>
            <div
              style={{
                fontFamily: "system-ui, sans-serif",
                fontSize: 34,
                fontWeight: 900,
                color: "#ffffff",
                letterSpacing: -0.5,
              }}
            >
              @_crackwithcode
            </div>
            <div
              style={{
                fontFamily: "monospace",
                fontSize: 18,
                color: "#38bdf8",
                fontWeight: 700,
              }}
            >
              Educational Technology & Science Mechanisms
            </div>
          </div>

          {/* Feature Badges */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
            {["⚡ Hardware Mechanics", "🤖 Autonomous Code", "🔬 Engineering Secrets"].map((tag, idx) => (
              <div
                key={idx}
                style={{
                  padding: "6px 16px",
                  backgroundColor: "rgba(30, 41, 59, 0.8)",
                  border: "1px solid rgba(148, 163, 184, 0.3)",
                  borderRadius: 999,
                  color: "#e2e8f0",
                  fontFamily: "monospace",
                  fontSize: 15,
                  fontWeight: 700,
                }}
              >
                {tag}
              </div>
            ))}
          </div>

          {/* Glowing Follow Button */}
          <div
            style={{
              transform: `scale(${buttonSpring * (isClicked ? 0.97 : 1)})`,
              width: "100%",
              marginTop: 4,
              position: "relative",
            }}
          >
            <div
              style={{
                backgroundColor: isClicked ? "#10b981" : "#38bdf8",
                borderRadius: 14,
                padding: "16px 0",
                textAlign: "center",
                fontFamily: "system-ui, sans-serif",
                fontSize: 24,
                fontWeight: 900,
                color: "#030712",
                letterSpacing: 1,
                boxShadow: isClicked
                  ? "0 0 30px rgba(16, 185, 129, 0.7)"
                  : "0 0 30px rgba(56, 189, 248, 0.6)",
                transition: "background-color 0.15s, box-shadow 0.15s",
              }}
            >
              {isClicked ? "✔ FOLLOWING @_crackwithcode" : "+ FOLLOW @_crackwithcode"}
            </div>

            {/* Simulated Cursor */}
            <div
              style={{
                position: "absolute",
                right: 60 - cursorProgress * 40,
                top: 24 + (1 - cursorProgress) * 35,
                opacity: cursorProgress,
                fontSize: 28,
                pointerEvents: "none",
                filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.8))",
              }}
            >
              👆
            </div>
          </div>
        </div>
      </div>
    </SceneLayout>
  );
};
