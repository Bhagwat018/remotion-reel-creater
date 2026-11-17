import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneLayout } from "../../components/SceneLayout";

export interface MetaStep1VoiceSceneProps {
  id?: string;
  leadIn?: string;
  headline?: string;
  brollVideo?: string;
  durationInFrames: number;
}

export const MetaStep1VoiceScene: React.FC<MetaStep1VoiceSceneProps> = ({
  id,
  leadIn = "⚡ STEP 01: AUTONOMOUS INTELLIGENCE",
  headline = "AI AGENT NE RESEARCH KARKE *HYPER-REALISTIC VOICE* BANAYI!",
  brollVideo = "broll/ai_neural_network.mp4",
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const agentCardSpring = spring({
    frame: frame - 4,
    fps,
    config: { damping: 14, stiffness: 130 },
  });

  const voiceCardSpring = spring({
    frame: frame - 12,
    fps,
    config: { damping: 14, stiffness: 130 },
  });

  const waveBars = 22;

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
          alignItems: "stretch",
          marginTop: 8,
          zIndex: 10,
        }}
      >
        {/* CARD 1: AI AGENT RESEARCH */}
        <div
          style={{
            transform: `scale(${agentCardSpring}) translateY(${(1 - agentCardSpring) * 16}px)`,
            opacity: agentCardSpring,
            backgroundColor: "rgba(15, 23, 42, 0.94)",
            backdropFilter: "blur(20px)",
            border: "2px solid rgba(56, 189, 248, 0.45)",
            borderRadius: 20,
            padding: "18px 24px",
            display: "flex",
            flexDirection: "column",
            gap: 12,
            boxShadow: "0 16px 40px rgba(0,0,0,0.6)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 14,
                  backgroundColor: "rgba(56, 189, 248, 0.15)",
                  border: "1.5px solid #38bdf8",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 26,
                }}
              >
                🤖
              </div>
              <div>
                <div style={{ fontFamily: "system-ui, sans-serif", fontSize: 26, fontWeight: 900, color: "#ffffff" }}>
                  Autonomous AI Research Agent
                </div>
                <div style={{ fontFamily: "monospace", fontSize: 16, color: "#38bdf8", fontWeight: 700 }}>
                  LLM Script Engineering & Logic Verification
                </div>
              </div>
            </div>

            <div
              style={{
                padding: "6px 14px",
                backgroundColor: "rgba(16, 185, 129, 0.2)",
                border: "1px solid #10b981",
                borderRadius: 999,
                color: "#34d399",
                fontFamily: "monospace",
                fontSize: 15,
                fontWeight: 800,
              }}
            >
              ● 1.2s VERIFIED
            </div>
          </div>

          <div
            style={{
              backgroundColor: "rgba(10, 15, 30, 0.8)",
              borderRadius: 12,
              padding: "12px 18px",
              fontFamily: "monospace",
              fontSize: 17,
              color: "#94a3b8",
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            <div><span style={{ color: "#38bdf8" }}>Agent Prompt:</span> "Generate viral technical breakdown with zero fluff"</div>
            <div><span style={{ color: "#a855f7" }}>Model:</span> Claude 3.7 Sonnet / DeepSeek Reasoner</div>
            <div><span style={{ color: "#34d399" }}>Output:</span> 4-step execution architecture JSON</div>
          </div>
        </div>

        {/* CONNECTOR ARROW */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ fontFamily: "monospace", fontSize: 20, color: "#38bdf8", fontWeight: 900 }}>
            ⬇ 48kHz NEURAL AUDIO SYNTHESIS
          </div>
        </div>

        {/* CARD 2: NEURAL VOICEOVER GENERATION */}
        <div
          style={{
            transform: `scale(${voiceCardSpring}) translateY(${(1 - voiceCardSpring) * 16}px)`,
            opacity: voiceCardSpring,
            backgroundColor: "rgba(15, 23, 42, 0.94)",
            backdropFilter: "blur(20px)",
            border: "2px solid rgba(168, 85, 247, 0.45)",
            borderRadius: 20,
            padding: "18px 24px",
            display: "flex",
            flexDirection: "column",
            gap: 12,
            boxShadow: "0 16px 40px rgba(0,0,0,0.6)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 14,
                  backgroundColor: "rgba(168, 85, 247, 0.15)",
                  border: "1.5px solid #a855f7",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 26,
                }}
              >
                🎙️
              </div>
              <div>
                <div style={{ fontFamily: "system-ui, sans-serif", fontSize: 26, fontWeight: 900, color: "#ffffff" }}>
                  Hyper-Realistic Voice Model
                </div>
                <div style={{ fontFamily: "monospace", fontSize: 16, color: "#c084fc", fontWeight: 700 }}>
                  Neural Text-to-Speech Engine
                </div>
              </div>
            </div>

            <div
              style={{
                padding: "6px 14px",
                backgroundColor: "rgba(168, 85, 247, 0.2)",
                border: "1px solid #a855f7",
                borderRadius: 999,
                color: "#e9d5ff",
                fontFamily: "monospace",
                fontSize: 15,
                fontWeight: 800,
              }}
            >
              48kHz STUDIO MASTER
            </div>
          </div>

          {/* Pulsing Audio Waveform Visualizer */}
          <div
            style={{
              backgroundColor: "rgba(10, 15, 30, 0.8)",
              borderRadius: 12,
              padding: "14px 18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 6,
              height: 60,
              boxSizing: "border-box",
            }}
          >
            {Array.from({ length: waveBars }).map((_, i) => {
              const barHeight = 10 + Math.abs(Math.sin((frame * 0.22) + i * 0.45)) * 38;
              const barHue = 190 + (i / waveBars) * 80;

              return (
                <div
                  key={i}
                  style={{
                    width: 14,
                    height: barHeight,
                    borderRadius: 4,
                    backgroundColor: `hsl(${barHue}, 90%, 60%)`,
                    boxShadow: `0 0 8px hsl(${barHue}, 90%, 60%)`,
                    transition: "height 0.05s ease",
                  }}
                />
              );
            })}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontFamily: "monospace",
              fontSize: 15,
              color: "#94a3b8",
            }}
          >
            <span>Cadence: 180 WPM (Studio Mic Profile)</span>
            <span style={{ color: "#34d399", fontWeight: 700 }}>Human Realism: 99.4%</span>
          </div>
        </div>
      </div>
    </SceneLayout>
  );
};
