import React from "react";
import { spring, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneLayout } from "../../components/SceneLayout";

export interface MarketCtaDebateSceneProps {
  id?: string;
  leadIn?: string;
  headline?: string;
  brollVideo?: string;
  durationInFrames: number;
}

export const MarketCtaDebateScene: React.FC<MarketCtaDebateSceneProps> = ({
  id,
  leadIn = "🔥 VIRAL COMMUNITY DEBATE",
  headline = "AAPKE GHAR ME KYA BOLTE HAIN: *JUA YA REAL INVESTMENT?*",
  brollVideo = "broll/cyber_grid_loop.mp4",
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pollEntrance = spring({
    frame: frame - 2,
    fps,
    config: { damping: 14, stiffness: 130 },
  });

  const followCardEntrance = spring({
    frame: frame - 12,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  const cursorProgress = interpolate(frame - 18, [0, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const isClicked = frame > 36;

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
          gap: 12,
          alignItems: "stretch",
          marginTop: 6,
          zIndex: 10,
        }}
      >
        {/* VIRAL DEBATE POLL CARDS */}
        <div
          style={{
            transform: `scale(${pollEntrance})`,
            opacity: pollEntrance,
            display: "flex",
            gap: 12,
          }}
        >
          {/* Option A: Jua */}
          <div
            style={{
              flex: 1,
              backgroundColor: "rgba(239, 68, 68, 0.14)",
              border: "2px solid rgba(239, 68, 68, 0.6)",
              borderRadius: 18,
              padding: "14px 16px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
            }}
          >
            <span style={{ fontSize: 24 }}>🔴</span>
            <div style={{ fontFamily: "system-ui, sans-serif", fontSize: 22, fontWeight: 900, color: "#ffffff" }}>
              JUA (Gambling)
            </div>
            <div style={{ fontFamily: "monospace", fontSize: 16, color: "#f87171", fontWeight: 700 }}>
              24% Votes
            </div>
          </div>

          {/* Option B: Investment */}
          <div
            style={{
              flex: 1,
              backgroundColor: isClicked ? "rgba(34, 197, 94, 0.28)" : "rgba(34, 197, 94, 0.15)",
              border: isClicked ? "2.5px solid #22c55e" : "2px solid rgba(34, 197, 94, 0.6)",
              borderRadius: 18,
              padding: "14px 16px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
              boxShadow: isClicked ? "0 0 25px rgba(34, 197, 94, 0.5)" : "none",
              position: "relative",
            }}
          >
            <span style={{ fontSize: 24 }}>🟢</span>
            <div style={{ fontFamily: "system-ui, sans-serif", fontSize: 22, fontWeight: 900, color: "#ffffff" }}>
              REAL INVESTMENT
            </div>
            <div style={{ fontFamily: "monospace", fontSize: 16, color: "#4ade80", fontWeight: 800 }}>
              76% Votes ✔
            </div>

            {/* Simulated Cursor Clicking */}
            <div
              style={{
                position: "absolute",
                right: 20 - cursorProgress * 20,
                bottom: 10 + (1 - cursorProgress) * 20,
                opacity: cursorProgress,
                fontSize: 26,
                pointerEvents: "none",
                filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.8))",
              }}
            >
              👆
            </div>
          </div>
        </div>

        {/* FOLLOW CARD FOR @techwith.genz */}
        <div
          style={{
            transform: `scale(${followCardEntrance}) translateY(${(1 - followCardEntrance) * 16}px)`,
            opacity: followCardEntrance,
            backgroundColor: "rgba(15, 23, 42, 0.95)",
            backdropFilter: "blur(24px)",
            border: "2.5px solid rgba(56, 189, 248, 0.5)",
            borderRadius: 22,
            padding: "18px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 20px 50px rgba(0,0,0,0.7), 0 0 35px rgba(56, 189, 248, 0.2)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 54,
                height: 54,
                borderRadius: "50%",
                backgroundColor: "#030712",
                border: "2.5px solid #38bdf8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 26,
                boxShadow: "0 0 16px rgba(56, 189, 248, 0.4)",
              }}
            >
              📈
            </div>
            <div>
              <div style={{ fontFamily: "system-ui, sans-serif", fontSize: 26, fontWeight: 900, color: "#ffffff" }}>
                @techwith.genz
              </div>
              <div style={{ fontFamily: "monospace", fontSize: 15, color: "#38bdf8", fontWeight: 700 }}>
                Unbiased Share Market & IPO Secrets
              </div>
            </div>
          </div>

          <div
            style={{
              padding: "10px 22px",
              backgroundColor: isClicked ? "#10b981" : "#38bdf8",
              borderRadius: 12,
              fontFamily: "system-ui, sans-serif",
              fontSize: 18,
              fontWeight: 900,
              color: "#030712",
              boxShadow: isClicked ? "0 0 20px #10b981" : "0 0 20px #38bdf8",
              letterSpacing: 0.5,
            }}
          >
            {isClicked ? "FOLLOWING ✔" : "+ FOLLOW"}
          </div>
        </div>
      </div>
    </SceneLayout>
  );
};
