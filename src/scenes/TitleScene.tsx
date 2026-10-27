import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { TitleSceneProps } from "../schema";
import { SceneLayout } from "../components/SceneLayout";
import { NeoSticker } from "../components/neo/NeoSticker";
import { MotionDirection } from "../lib/directionalMotion";

export const TitleScene: React.FC<
  TitleSceneProps & { subtitle?: string; durationInFrames: number; direction?: MotionDirection; id?: string }
> = ({ id, direction, leadIn, subtitle, headline, durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - 4,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  const pulse = Math.sin(frame / 6) * 0.02 + 1;

  return (
    <SceneLayout
      id={id}
      direction={direction}
      leadIn={leadIn || subtitle || "SYSTEM ARCHITECTURE"}
      headline={headline}
      durationInFrames={durationInFrames}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          transform: `scale(${entrance * pulse})`,
          opacity: entrance,
          gap: 20,
          marginTop: 10,
        }}
      >
        {/* Playful tilted NeoSticker */}
        <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
          <NeoSticker text="⚡ 100% AUTOMATED" rotate={-4} bg="#fb923c" color="#000000" fontSize={28} />
          <NeoSticker text="🚀 PRODUCTION READY" rotate={3} bg="#38bdf8" color="#000000" fontSize={28} />
        </div>

        {/* Hero Mac Window Card Preview */}
        <div
          style={{
            width: "100%",
            maxWidth: 920,
            backgroundColor: "#ffffff",
            border: "3.5px solid #000000",
            borderRadius: 22,
            boxShadow: "7px 7px 0px #000000",
            overflow: "hidden",
            marginTop: 6,
          }}
        >
          {/* Mac Header */}
          <div
            style={{
              height: 48,
              backgroundColor: "#f1f5f9",
              borderBottom: "3px solid #000000",
              display: "flex",
              alignItems: "center",
              padding: "0 18px",
              gap: 8,
            }}
          >
            <div style={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: "#ef4444", border: "1.5px solid #000000" }} />
            <div style={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: "#eab308", border: "1.5px solid #000000" }} />
            <div style={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: "#22c55e", border: "1.5px solid #000000" }} />
            <span
              style={{
                marginLeft: 14,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 18,
                fontWeight: 700,
                color: "#64748b",
              }}
            >
              pipeline.config.ts
            </span>
          </div>

          <div
            style={{
              padding: "26px 30px",
              display: "flex",
              flexDirection: "column",
              gap: 14,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 24,
              fontWeight: 700,
              color: "#000000",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ color: "#7c3aed" }}>&gt;</span>
              <span>ai_agents.run({`{ topic: "${(headline || "Deep Dive").replace(/[*_#`]/g, "").slice(0, 24)}" }`})</span>
            </div>
            <div style={{ color: "#16a34a", fontSize: 21 }}>
              ✔ Voice synthesized &amp; Whisper word timestamps locked (0.01s)
            </div>
            <div style={{ color: "#2563eb", fontSize: 21 }}>
              ✔ Remotion scenes auto-aligned to speech durations
            </div>
            <div style={{ color: "#9333ea", fontSize: 21 }}>
              ✔ Multi-layer neo-brutalist visuals synced
            </div>
          </div>
        </div>

        {/* Secondary Bottom Feature Badges */}
        <div style={{ display: "flex", gap: 14, alignItems: "center", marginTop: 4 }}>
          <NeoSticker text="🔥 60 FPS ULTRA" rotate={2} bg="#fef08a" color="#000000" fontSize={24} />
          <NeoSticker text="✨ ZERO VOID CANVAS" rotate={-2} bg="#86efac" color="#000000" fontSize={24} />
        </div>
      </div>
    </SceneLayout>
  );
};
