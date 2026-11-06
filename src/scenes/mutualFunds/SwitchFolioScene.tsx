import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface SwitchFolioSceneProps {
  durationInFrames: number;
}

export const SwitchFolioScene: React.FC<SwitchFolioSceneProps> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  const step1 = spring({
    frame: frame - 6,
    fps,
    config: { damping: 12, stiffness: 120 },
  });

  const step2 = spring({
    frame: frame - 14,
    fps,
    config: { damping: 12, stiffness: 120 },
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 48px",
        boxSizing: "border-box",
        fontFamily: "var(--font-heading, 'Inter', sans-serif)",
      }}
    >
      {/* Header Badge */}
      <div
        style={{
          opacity: entrance,
          transform: `scale(${interpolate(entrance, [0, 1], [0.9, 1])})`,
          textAlign: "center",
          marginBottom: 32,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            backgroundColor: "rgba(59, 130, 246, 0.15)",
            border: "1px solid rgba(59, 130, 246, 0.4)",
            borderRadius: 999,
            padding: "8px 20px",
            color: "#60a5fa",
            fontSize: 16,
            fontWeight: 800,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: 10,
          }}
        >
          ⚡ 2-CLICK HACK
        </div>
        <h2
          style={{
            fontSize: 38,
            fontWeight: 900,
            color: "#ffffff",
            margin: 0,
          }}
        >
          HOW TO SWITCH IN 60 SECONDS
        </h2>
      </div>

      {/* Steps List */}
      <div
        style={{
          width: "100%",
          maxWidth: 960,
          display: "flex",
          flexDirection: "column",
          gap: 18,
        }}
      >
        {/* Step 1 */}
        <div
          style={{
            backgroundColor: "#18181b",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            borderRadius: 20,
            padding: "20px 24px",
            display: "flex",
            alignItems: "center",
            gap: 20,
            opacity: step1,
            transform: `translateY(${interpolate(step1, [0, 1], [20, 0])}px)`,
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              backgroundColor: "rgba(59, 130, 246, 0.2)",
              color: "#60a5fa",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              fontWeight: 900,
              flexShrink: 0,
            }}
          >
            1
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: "#ffffff", marginBottom: 4 }}>
              Check Portfolio Folio Name
            </div>
            <div style={{ fontSize: 16, color: "#a1a1aa" }}>
              Agar fund ke aage &quot;REGULAR&quot; likha hai, toh agent 1% commission le raha hai!
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div
          style={{
            backgroundColor: "rgba(34, 197, 94, 0.08)",
            border: "2px solid rgba(34, 197, 94, 0.4)",
            borderRadius: 20,
            padding: "20px 24px",
            display: "flex",
            alignItems: "center",
            gap: 20,
            opacity: step2,
            transform: `translateY(${interpolate(step2, [0, 1], [20, 0])}px)`,
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              backgroundColor: "rgba(34, 197, 94, 0.2)",
              color: "#4ade80",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              fontWeight: 900,
              flexShrink: 0,
            }}
          >
            2
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: "#4ade80", marginBottom: 4 }}>
              Tap &quot;Switch to Direct Plan&quot;
            </div>
            <div style={{ fontSize: 16, color: "#d1fae5" }}>
              MF Central ya Zerodha/Groww par same fund ka Direct plan select karke switch karein.
            </div>
          </div>
          <div
            style={{
              backgroundColor: "#22c55e",
              color: "#052e16",
              padding: "8px 16px",
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 900,
            }}
          >
            SAVE ₹25L 🚀
          </div>
        </div>
      </div>
    </div>
  );
};
