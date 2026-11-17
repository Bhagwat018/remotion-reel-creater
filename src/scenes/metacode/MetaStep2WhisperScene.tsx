import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneLayout } from "../../components/SceneLayout";

export interface MetaStep2WhisperSceneProps {
  id?: string;
  leadIn?: string;
  headline?: string;
  brollVideo?: string;
  durationInFrames: number;
}

export const MetaStep2WhisperScene: React.FC<MetaStep2WhisperSceneProps> = ({
  id,
  leadIn = "⚡ STEP 02: MILLISECOND PRECISION",
  headline = "WHISPER AI NE HAR WORD KA *MILLISECOND-ACCURATE TIMESTAMP* NIKALA!",
  brollVideo = "broll/digital_matrix_blocks.mp4",
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardSpring = spring({
    frame: frame - 4,
    fps,
    config: { damping: 14, stiffness: 130 },
  });

  const words = [
    { text: "Whisper", start: "20.45s", end: "21.10s", conf: "99.9%" },
    { text: "AI", start: "21.10s", end: "21.50s", conf: "99.8%" },
    { text: "har", start: "21.50s", end: "21.85s", conf: "99.7%" },
    { text: "single", start: "21.85s", end: "22.35s", conf: "99.9%" },
    { text: "word", start: "22.35s", end: "22.80s", conf: "99.9%" },
    { text: "millisecond", start: "22.80s", end: "23.60s", conf: "100%" },
  ];

  const activeIndex = Math.floor(frame / 16) % words.length;

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
        {/* MAIN WHISPER TELEMETRY CARD */}
        <div
          style={{
            transform: `scale(${cardSpring}) translateY(${(1 - cardSpring) * 16}px)`,
            opacity: cardSpring,
            backgroundColor: "rgba(15, 23, 42, 0.94)",
            backdropFilter: "blur(20px)",
            border: "2px solid rgba(168, 85, 247, 0.45)",
            borderRadius: 22,
            padding: "20px 24px",
            display: "flex",
            flexDirection: "column",
            gap: 14,
            boxShadow: "0 16px 40px rgba(0,0,0,0.6)",
          }}
        >
          {/* Header */}
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
                ⏱️
              </div>
              <div>
                <div style={{ fontFamily: "system-ui, sans-serif", fontSize: 26, fontWeight: 900, color: "#ffffff" }}>
                  Whisper.cpp Audio Alignment
                </div>
                <div style={{ fontFamily: "monospace", fontSize: 16, color: "#c084fc", fontWeight: 700 }}>
                  Word-Level Forced Timestamp Extraction
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
              ±1 MS ACCURACY
            </div>
          </div>

          {/* Word Timestamps Grid */}
          <div
            style={{
              backgroundColor: "rgba(10, 15, 30, 0.85)",
              borderRadius: 14,
              padding: "14px 18px",
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            {words.map((w, idx) => {
              const isActive = idx === activeIndex;

              return (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "8px 14px",
                    borderRadius: 8,
                    backgroundColor: isActive ? "rgba(168, 85, 247, 0.25)" : "transparent",
                    border: isActive ? "1.5px solid #a855f7" : "1px solid transparent",
                    transition: "background-color 0.1s ease",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <span
                      style={{
                        fontFamily: "monospace",
                        fontSize: 15,
                        color: isActive ? "#38bdf8" : "#64748b",
                        width: 28,
                      }}
                    >
                      #{idx + 1}
                    </span>
                    <span
                      style={{
                        fontFamily: "system-ui, sans-serif",
                        fontSize: 22,
                        fontWeight: isActive ? 900 : 700,
                        color: isActive ? "#fbbf24" : "#e2e8f0",
                        letterSpacing: 0.5,
                      }}
                    >
                      "{w.text}"
                    </span>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <span
                      style={{
                        fontFamily: "monospace",
                        fontSize: 16,
                        color: "#94a3b8",
                      }}
                    >
                      {w.start} ➔ {w.end}
                    </span>

                    <span
                      style={{
                        fontFamily: "monospace",
                        fontSize: 14,
                        fontWeight: 800,
                        color: isActive ? "#34d399" : "#64748b",
                        backgroundColor: isActive ? "rgba(16, 185, 129, 0.2)" : "rgba(30, 41, 59, 0.5)",
                        padding: "3px 8px",
                        borderRadius: 6,
                      }}
                    >
                      {w.conf}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px 16px",
              backgroundColor: "rgba(30, 41, 59, 0.6)",
              borderRadius: 10,
              fontFamily: "monospace",
              fontSize: 16,
            }}
          >
            <span style={{ color: "#38bdf8", fontWeight: 700 }}>⚡ 121 WORDS TIMED IN 340MS</span>
            <span style={{ color: "#fbbf24", fontWeight: 800 }}>KINETIC HIGHLIGHT SYNC [OK]</span>
          </div>
        </div>
      </div>
    </SceneLayout>
  );
};
