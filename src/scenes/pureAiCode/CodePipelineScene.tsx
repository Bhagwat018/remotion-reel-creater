import React from "react";
import { spring, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

export interface CodePipelineSceneProps {
  durationInFrames: number;
}

export const CodePipelineScene: React.FC<CodePipelineSceneProps> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const stages = [
    {
      num: "01",
      icon: "🤖",
      title: "LLM Script Architecture",
      desc: "Claude 3.7 generates viral hook & scene spec JSON",
      badge: "LATENCY: 1.2s",
      badgeColor: "#38bdf8",
      borderColor: "#0284c7",
    },
    {
      num: "02",
      icon: "🎙️",
      title: "Voice & Whisper Alignment",
      desc: "ElevenLabs Charlie + Whisper word-by-word timestamps",
      badge: "STUDIO 24kHz",
      badgeColor: "#a855f7",
      borderColor: "#9333ea",
    },
    {
      num: "03",
      icon: "⚛️",
      title: "Remotion Spring Physics",
      desc: "React code draws math vectors & typography @ 60 FPS",
      badge: "DOM TO CANVAS",
      badgeColor: "#f59e0b",
      borderColor: "#d97706",
    },
    {
      num: "04",
      icon: "⚡",
      title: "Hardware GPU Export",
      desc: "Direct Apple Silicon MPS rendering (Zero CapCut)",
      badge: "RENDER: 70 FPS",
      badgeColor: "#10b981",
      borderColor: "#059669",
    },
  ];

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: 1080,
        height: 1920,
        paddingTop: 110,
        paddingBottom: 480,
        paddingLeft: 48,
        paddingRight: 48,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        gap: 20,
        zIndex: 10,
      }}
    >
      {/* HEADER */}
      <div style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: 10 }}>
        <div
          style={{
            fontFamily: "monospace",
            fontSize: 22,
            letterSpacing: 4,
            fontWeight: 800,
            color: "#38bdf8",
          }}
        >
          AUTONOMOUS ARCHITECTURE ⚡
        </div>
        <div
          style={{
            fontFamily: "system-ui, sans-serif",
            fontSize: 48,
            fontWeight: 900,
            color: "#ffffff",
            textTransform: "uppercase",
            letterSpacing: -1,
          }}
        >
          HOW CODE RENDERS VIDEO
        </div>
      </div>

      {/* 4 PIPELINE NODES */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          position: "relative",
          marginTop: 10,
        }}
      >
        {stages.map((st, idx) => {
          const nodeSpring = spring({
            frame: frame - idx * 4,
            fps,
            config: { damping: 13, stiffness: 140 },
          });

          // Flowing beam effect
          const isActive = (Math.floor(frame / 15) % 4) === idx;

          return (
            <div
              key={idx}
              style={{
                transform: `scale(${nodeSpring}) translateY(${(1 - nodeSpring) * 20}px)`,
                opacity: nodeSpring,
                backgroundColor: isActive ? "rgba(30, 41, 59, 0.95)" : "rgba(15, 23, 42, 0.85)",
                backdropFilter: "blur(16px)",
                border: `2px solid ${isActive ? st.badgeColor : "rgba(148, 163, 184, 0.2)"}`,
                borderRadius: 22,
                padding: "20px 24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 20,
                boxShadow: isActive
                  ? `0 12px 35px rgba(0,0,0,0.6), 0 0 25px ${st.badgeColor}40`
                  : "0 8px 24px rgba(0,0,0,0.4)",
                transition: "border 0.2s, background 0.2s",
              }}
            >
              {/* Left: Icon & Step */}
              <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                <div
                  style={{
                    width: 68,
                    height: 68,
                    borderRadius: 18,
                    backgroundColor: "rgba(15, 23, 42, 0.9)",
                    border: `1.5px solid ${st.borderColor}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 34,
                    flexShrink: 0,
                  }}
                >
                  {st.icon}
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span
                      style={{
                        fontFamily: "monospace",
                        fontSize: 18,
                        color: st.badgeColor,
                        fontWeight: 800,
                      }}
                    >
                      STAGE {st.num}
                    </span>
                    <span
                      style={{
                        fontFamily: "system-ui, sans-serif",
                        fontSize: 27,
                        fontWeight: 800,
                        color: "#f8fafc",
                      }}
                    >
                      {st.title}
                    </span>
                  </div>

                  <div
                    style={{
                      fontFamily: "system-ui, sans-serif",
                      fontSize: 20,
                      color: "#94a3b8",
                      fontWeight: 500,
                    }}
                  >
                    {st.desc}
                  </div>
                </div>
              </div>

              {/* Right: Status Pill */}
              <div
                style={{
                  padding: "8px 18px",
                  borderRadius: 12,
                  backgroundColor: `${st.badgeColor}18`,
                  border: `1px solid ${st.badgeColor}`,
                  color: st.badgeColor,
                  fontFamily: "monospace",
                  fontSize: 18,
                  fontWeight: 800,
                  whiteSpace: "nowrap",
                }}
              >
                {st.badge}
              </div>
            </div>
          );
        })}
      </div>

      {/* PIPELINE FOOTER STATS */}
      <div
        style={{
          marginTop: 10,
          backgroundColor: "rgba(15, 23, 42, 0.9)",
          border: "1.5px solid rgba(56, 189, 248, 0.3)",
          borderRadius: 20,
          padding: "16px 28px",
          display: "flex",
          justifyContent: "space-around",
          fontFamily: "monospace",
          fontSize: 20,
          color: "#cbd5e1",
        }}
      >
        <div>
          <span style={{ color: "#38bdf8", fontWeight: 800 }}>HUMAN EDITING: </span>
          <span style={{ color: "#ef4444", fontWeight: 800 }}>0 MIN</span>
        </div>
        <div>
          <span style={{ color: "#38bdf8", fontWeight: 800 }}>TOTAL TIME: </span>
          <span style={{ color: "#10b981", fontWeight: 800 }}>30 SECONDS</span>
        </div>
      </div>
    </div>
  );
};

