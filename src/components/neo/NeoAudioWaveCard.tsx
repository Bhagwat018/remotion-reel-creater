import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

interface NeoAudioWaveCardProps {
  takes?: Array<{ label: string; passed: boolean }>;
  modelName?: string;
  delayFrames?: number;
}

export const NeoAudioWaveCard: React.FC<NeoAudioWaveCardProps> = ({
  takes = [
    { label: "Take 1 (Pacing off)", passed: false },
    { label: "Take 2 (Mispronounced)", passed: false },
    { label: "Take 3 (Crisp & Perfect)", passed: true },
  ],
  modelName = "OpenAI Voice Model (tts-1-hd)",
  delayFrames = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - delayFrames,
    fps,
    config: { damping: 14, stiffness: 140 },
  });

  // 16 animated waveform bars
  const bars = Array.from({ length: 20 }, (_, idx) => {
    const wave = Math.sin((frame + idx * 4) / 4) * 0.5 + 0.5;
    return Math.round(14 + wave * 48);
  });

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        border: "3.5px solid #000000",
        borderRadius: 24,
        padding: "32px 28px",
        boxShadow: "7px 7px 0px #000000",
        width: "100%",
        maxWidth: 880,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: 20,
        transform: `scale(${entrance}) rotate(1deg)`,
        opacity: entrance,
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "2px solid #000000",
          paddingBottom: 14,
        }}
      >
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 26,
            fontWeight: 900,
            color: "#000000",
          }}
        >
          🎙️ {modelName}
        </span>
        <span
          style={{
            backgroundColor: "#22c55e",
            color: "#ffffff",
            padding: "4px 12px",
            borderRadius: 8,
            border: "2px solid #000000",
            fontSize: 18,
            fontWeight: 800,
          }}
        >
          ACTIVE TAKE
        </span>
      </div>

      {/* Live Audio Waveform */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          height: 80,
          backgroundColor: "#f1f5f9",
          borderRadius: 14,
          border: "2px solid #000000",
          padding: "0 16px",
        }}
      >
        {bars.map((h, i) => (
          <div
            key={i}
            style={{
              width: 10,
              height: h,
              backgroundColor: i >= 14 ? "#a855f7" : "#000000",
              borderRadius: 6,
            }}
          />
        ))}
      </div>

      {/* Takes List */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {takes.map((t, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: t.passed ? "#dcfce7" : "#fef2f2",
              border: "2px solid #000000",
              borderRadius: 12,
              padding: "10px 18px",
              fontFamily: "'Inter', sans-serif",
              fontSize: 22,
              fontWeight: 800,
              color: "#000000",
            }}
          >
            <span>{t.label}</span>
            <span>{t.passed ? "✅ APPROVED" : "❌ REJECTED"}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
