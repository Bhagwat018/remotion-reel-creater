import React from "react";
import { spring, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

export interface CodeEngineHookSceneProps {
  durationInFrames: number;
}

export const CodeEngineHookScene: React.FC<CodeEngineHookSceneProps> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring animations
  const headerSpring = spring({
    frame: frame - 2,
    fps,
    config: { damping: 12, stiffness: 140 },
  });

  const terminalSpring = spring({
    frame: frame - 6,
    fps,
    config: { damping: 14, stiffness: 130 },
  });

  const badgeSpring = spring({
    frame: frame - 12,
    fps,
    config: { damping: 10, stiffness: 160 },
  });

  // Laser scanner effect across the code
  const scanProgress = (frame * 3) % 450;

  // Code lines to render
  const codeLines = [
    { text: '// ⚡ 100% PURE CODE. ZERO CAMERA. ZERO STOCK VIDEOS.', color: '#64748b' },
    { text: 'import { Reel, AI_Engine, VoiceSynth } from "@remotion/ai";', color: '#93c5fd' },
    { text: '', color: '' },
    { text: 'export const ViralReel = () => {', color: '#f43f5e' },
    { text: '  const script = useAI({ model: "Claude-3.7-Sonnet" });', color: '#38bdf8' },
    { text: '  const voice  = useVoice({ engine: "ElevenLabs-Charlie" });', color: '#a855f7' },
    { text: '  const canvas = useRemotion({ fps: 60, res: "1080x1920" });', color: '#38bdf8' },
    { text: '', color: '' },
    { text: '  // Every pixel drawn mathematically at 60 FPS', color: '#64748b' },
    { text: '  return <PureCodeMotion physics="spring" glow={true} />;', color: '#10b981' },
    { text: '};', color: '#f43f5e' },
  ];

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: 1080,
        height: 1920,
        paddingTop: 120,
        paddingBottom: 480,
        paddingLeft: 48,
        paddingRight: 48,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        justifyContent: "flex-start",
        gap: 22,
        zIndex: 10,
      }}
    >
      {/* 1. TOP METRIC BADGES (Zero Camera / 100% Code) */}
      <div
        style={{
          transform: `scale(${headerSpring})`,
          opacity: headerSpring,
          display: "flex",
          justifyContent: "center",
          gap: 14,
        }}
      >
        <div
          style={{
            padding: "10px 20px",
            backgroundColor: "rgba(239, 68, 68, 0.12)",
            border: "1.5px solid rgba(239, 68, 68, 0.5)",
            borderRadius: 999,
            color: "#f87171",
            fontFamily: "monospace",
            fontSize: 22,
            fontWeight: 800,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span>✕</span> CAMERA: 0%
        </div>

        <div
          style={{
            padding: "10px 20px",
            backgroundColor: "rgba(245, 158, 11, 0.12)",
            border: "1.5px solid rgba(245, 158, 11, 0.5)",
            borderRadius: 999,
            color: "#fbbf24",
            fontFamily: "monospace",
            fontSize: 22,
            fontWeight: 800,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span>✕</span> STOCK VIDEOS: 0%
        </div>

        <div
          style={{
            padding: "10px 22px",
            backgroundColor: "rgba(16, 185, 129, 0.18)",
            border: "2px solid #10b981",
            borderRadius: 999,
            color: "#34d399",
            fontFamily: "monospace",
            fontSize: 22,
            fontWeight: 900,
            display: "flex",
            alignItems: "center",
            gap: 10,
            boxShadow: "0 0 24px rgba(16, 185, 129, 0.4)",
          }}
        >
          <span
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: "#10b981",
              boxShadow: "0 0 10px #10b981",
            }}
          />
          PURE CODE: 100%
        </div>
      </div>

      {/* 2. MAIN GLOWING IDE TERMINAL WINDOW */}
      <div
        style={{
          transform: `scale(${terminalSpring})`,
          opacity: terminalSpring,
          backgroundColor: "rgba(10, 15, 30, 0.88)",
          backdropFilter: "blur(20px)",
          border: "2px solid rgba(56, 189, 248, 0.35)",
          borderRadius: 28,
          overflow: "hidden",
          boxShadow: "0 24px 60px rgba(0, 0, 0, 0.6), 0 0 40px rgba(56, 189, 248, 0.15)",
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        {/* Title Bar */}
        <div
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.95)",
            padding: "18px 24px",
            borderBottom: "1.5px solid rgba(255, 255, 255, 0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ width: 16, height: 16, borderRadius: "50%", backgroundColor: "#ef4444" }} />
            <div style={{ width: 16, height: 16, borderRadius: "50%", backgroundColor: "#f59e0b" }} />
            <div style={{ width: 16, height: 16, borderRadius: "50%", backgroundColor: "#22c55e" }} />
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              backgroundColor: "rgba(30, 41, 59, 0.8)",
              padding: "6px 20px",
              borderRadius: 8,
              border: "1px solid rgba(56, 189, 248, 0.3)",
            }}
          >
            <span style={{ fontSize: 18 }}>⚛️</span>
            <span style={{ fontFamily: "monospace", fontSize: 20, color: "#e2e8f0", fontWeight: 700 }}>
              ReelEngine.tsx
            </span>
          </div>

          <div
            style={{
              fontFamily: "monospace",
              fontSize: 18,
              color: "#34d399",
              fontWeight: 800,
            }}
          >
            ● LIVE RENDER
          </div>
        </div>

        {/* Code Lines Body */}
        <div
          style={{
            padding: "28px 32px",
            display: "flex",
            flexDirection: "column",
            gap: 12,
            fontFamily: "monospace",
            fontSize: 25,
            lineHeight: 1.5,
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
              boxShadow: "0 0 16px #38bdf8",
              pointerEvents: "none",
            }}
          />

          {codeLines.map((line, idx) => {
            const lineReveal = interpolate(frame - idx * 2, [0, 8], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });

            return (
              <div
                key={idx}
                style={{
                  display: "flex",
                  gap: 24,
                  opacity: lineReveal,
                  transform: `translateX(${(1 - lineReveal) * -16}px)`,
                }}
              >
                <span
                  style={{
                    color: "rgba(148, 163, 184, 0.4)",
                    width: 32,
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

        {/* Console / Status Footer */}
        <div
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.95)",
            padding: "16px 28px",
            borderTop: "1.5px solid rgba(255, 255, 255, 0.08)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "monospace",
            fontSize: 18,
          }}
        >
          <div style={{ color: "#38bdf8", display: "flex", gap: 12, alignItems: "center" }}>
            <span style={{ color: "#34d399" }}>✔</span>
            <span>Remotion Canvas: 1080x1920 @ 60 FPS</span>
          </div>

          <div style={{ color: "#fbbf24", fontWeight: 700 }}>
            GPU ACCELERATED (Apple Silicon MPS)
          </div>
        </div>
      </div>

      {/* 3. FLOATING TECH PILLS AT BOTTOM */}
      <div
        style={{
          transform: `scale(${badgeSpring})`,
          opacity: badgeSpring,
          display: "flex",
          justifyContent: "center",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        {["⚛️ React 19", "🎬 Remotion 4.0", "🤖 Claude 3.7", "🎙️ ElevenLabs", "⚡ 60 FPS"].map((tech, i) => (
          <div
            key={i}
            style={{
              padding: "12px 24px",
              backgroundColor: "rgba(30, 41, 59, 0.75)",
              border: "1.5px solid rgba(148, 163, 184, 0.25)",
              borderRadius: 16,
              color: "#f8fafc",
              fontFamily: "monospace",
              fontSize: 22,
              fontWeight: 700,
              boxShadow: "0 8px 20px rgba(0,0,0,0.4)",
            }}
          >
            {tech}
          </div>
        ))}
      </div>
    </div>
  );
};

