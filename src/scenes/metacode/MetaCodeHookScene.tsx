import React from "react";
import { spring, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneLayout } from "../../components/SceneLayout";

export interface MetaCodeHookSceneProps {
  id?: string;
  leadIn?: string;
  headline?: string;
  brollVideo?: string;
  durationInFrames: number;
}

export const MetaCodeHookScene: React.FC<MetaCodeHookSceneProps> = ({
  id,
  leadIn = "⚡ 100% PROGRAMMATIC VIDEO",
  headline = "YEH POORI VIDEO *CODE AUR AI* NE BANAYI HAI!",
  brollVideo = "broll/code_terminal_typing.mp4",
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const strikeSpring = spring({
    frame: frame - 4,
    fps,
    config: { damping: 14, stiffness: 140 },
  });

  const terminalSpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  const scanProgress = (frame * 4) % 320;

  const codeLines = [
    { text: '// ⚡ ZERO CAMERA. ZERO MIC. ZERO VIDEO EDITOR.', color: '#94a3b8' },
    { text: 'import { Reel, AI_Voice, Chromium } from "@remotion/ai";', color: '#93c5fd' },
    { text: '', color: '' },
    { text: 'export const ViralReel = () => {', color: '#f43f5e' },
    { text: '  const voice  = useNeuralVoice({ engine: "Whisper-Aligned" });', color: '#c084fc' },
    { text: '  const avatar = useLipSync({ algorithm: "SoundWave-FFT" });', color: '#38bdf8' },
    { text: '  return <ChromiumCanvas fps={60} mathRender={true} />;', color: '#34d399' },
    { text: '};', color: '#f43f5e' },
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
          gap: 16,
          alignItems: "stretch",
          marginTop: 8,
          zIndex: 10,
        }}
      >
        {/* 1. TOP 3 HARDWARE STRIKE-OUT BADGES */}
        <div
          style={{
            transform: `scale(${strikeSpring})`,
            opacity: strikeSpring,
            display: "flex",
            justifyContent: "center",
            gap: 14,
          }}
        >
          <div
            style={{
              padding: "8px 18px",
              backgroundColor: "rgba(239, 68, 68, 0.22)",
              border: "2px solid #ef4444",
              borderRadius: 999,
              color: "#ffffff",
              fontFamily: "monospace",
              fontSize: 20,
              fontWeight: 800,
              boxShadow: "0 4px 14px rgba(239, 68, 68, 0.4)",
            }}
          >
            <span style={{ color: "#ef4444", textDecoration: "line-through" }}>📹 0 CAMERA</span>
          </div>

          <div
            style={{
              padding: "8px 18px",
              backgroundColor: "rgba(245, 158, 11, 0.22)",
              border: "2px solid #f59e0b",
              borderRadius: 999,
              color: "#ffffff",
              fontFamily: "monospace",
              fontSize: 20,
              fontWeight: 800,
              boxShadow: "0 4px 14px rgba(245, 158, 11, 0.4)",
            }}
          >
            <span style={{ color: "#f59e0b", textDecoration: "line-through" }}>🎙️ 0 MIC</span>
          </div>

          <div
            style={{
              padding: "8px 18px",
              backgroundColor: "rgba(239, 68, 68, 0.22)",
              border: "2px solid #ef4444",
              borderRadius: 999,
              color: "#ffffff",
              fontFamily: "monospace",
              fontSize: 20,
              fontWeight: 800,
              boxShadow: "0 4px 14px rgba(239, 68, 68, 0.4)",
            }}
          >
            <span style={{ color: "#f87171", textDecoration: "line-through" }}>🎬 0 EDITOR</span>
          </div>
        </div>

        {/* 2. GLOWING CODE IDE TERMINAL */}
        <div
          style={{
            transform: `scale(${terminalSpring})`,
            opacity: terminalSpring,
            backgroundColor: "rgba(10, 15, 30, 0.94)",
            backdropFilter: "blur(24px)",
            border: "2px solid rgba(56, 189, 248, 0.45)",
            borderRadius: 22,
            overflow: "hidden",
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.7), 0 0 30px rgba(56, 189, 248, 0.2)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Header Bar */}
          <div
            style={{
              backgroundColor: "rgba(15, 23, 42, 0.98)",
              padding: "12px 20px",
              borderBottom: "1.5px solid rgba(255, 255, 255, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", gap: 8 }}>
              <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#ef4444" }} />
              <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#f59e0b" }} />
              <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#22c55e" }} />
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                backgroundColor: "rgba(30, 41, 59, 0.85)",
                padding: "4px 14px",
                borderRadius: 6,
                border: "1px solid rgba(56, 189, 248, 0.3)",
              }}
            >
              <span style={{ fontSize: 15 }}>⚛️</span>
              <span style={{ fontFamily: "monospace", fontSize: 17, color: "#e2e8f0", fontWeight: 700 }}>
                AI_Reel_Engine.tsx
              </span>
            </div>

            <div
              style={{
                fontFamily: "monospace",
                fontSize: 15,
                color: "#34d399",
                fontWeight: 800,
              }}
            >
              ● LIVE RENDER
            </div>
          </div>

          {/* Code Body */}
          <div
            style={{
              padding: "18px 22px",
              display: "flex",
              flexDirection: "column",
              gap: 8,
              fontFamily: "monospace",
              fontSize: 20,
              lineHeight: 1.45,
              position: "relative",
            }}
          >
            {/* Laser Scanner Line */}
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: scanProgress,
                height: 2,
                background: "linear-gradient(90deg, transparent, #38bdf8, #818cf8, transparent)",
                boxShadow: "0 0 14px #38bdf8",
                pointerEvents: "none",
              }}
            />

            {codeLines.map((line, idx) => {
              const lineReveal = interpolate(frame - idx * 2, [0, 6], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });

              return (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    gap: 16,
                    opacity: lineReveal,
                    transform: `translateX(${(1 - lineReveal) * -10}px)`,
                  }}
                >
                  <span
                    style={{
                      color: "rgba(148, 163, 184, 0.4)",
                      width: 24,
                      textAlign: "right",
                      userSelect: "none",
                    }}
                  >
                    {idx + 1}
                  </span>
                  <span style={{ color: line.color || "#e2e8f0", fontWeight: 600 }}>
                    {line.text}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Footer Bar */}
          <div
            style={{
              backgroundColor: "rgba(15, 23, 42, 0.98)",
              padding: "12px 20px",
              borderTop: "1.5px solid rgba(255, 255, 255, 0.08)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontFamily: "monospace",
              fontSize: 16,
            }}
          >
            <div style={{ color: "#38bdf8", display: "flex", gap: 8, alignItems: "center" }}>
              <span style={{ color: "#34d399" }}>✔</span>
              <span>1080x1920 @ 60 FPS Headless Canvas</span>
            </div>

            <div style={{ color: "#fbbf24", fontWeight: 800 }}>
              FRAME: {Math.min(frame, 900)} / 1,391 [OK]
            </div>
          </div>
        </div>

        {/* 3. VERIFICATION FOOTER PILL */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              padding: "8px 22px",
              backgroundColor: "rgba(16, 185, 129, 0.2)",
              border: "1.5px solid #10b981",
              borderRadius: 999,
              color: "#34d399",
              fontFamily: "monospace",
              fontSize: 18,
              fontWeight: 800,
              boxShadow: "0 0 20px rgba(16, 185, 129, 0.3)",
            }}
          >
            ✔ 100% CODE & AI • 4 SIMPLE STEPS
          </div>
        </div>
      </div>
    </SceneLayout>
  );
};
