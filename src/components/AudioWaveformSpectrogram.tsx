import React from "react";
import { useCurrentFrame } from "remotion";
import { useTheme } from "../theme/theme";

export interface AudioWaveformSpectrogramProps {
  isTalking?: boolean;
  barCount?: number;
  style?: React.CSSProperties;
}

export const AudioWaveformSpectrogram: React.FC<AudioWaveformSpectrogramProps> = ({
  isTalking = true,
  barCount = 18,
  style = {},
}) => {
  const frame = useCurrentFrame();
  const theme = useTheme();

  // Generate dynamic heights for each frequency band
  const bars = Array.from({ length: barCount }, (_, i) => {
    if (!isTalking) {
      // Idle breathing height (3px - 6px)
      return 3 + Math.sin(frame * 0.1 + i * 0.4) * 2;
    }

    // Dynamic frequency modulation: Bass (low i) has slower punchy moves, highs have rapid jitter
    const freq = 0.2 + (i / barCount) * 0.4;
    const wave1 = Math.sin(frame * freq + i * 0.7);
    const wave2 = Math.cos(frame * (freq * 1.5) + i * 0.3);
    const normalized = Math.max(0.12, Math.abs(wave1 * 0.6 + wave2 * 0.4));

    // Bell-curve envelope to look like a true audio spectrogram (peaks in middle)
    const envelope = Math.sin(((i + 1) / (barCount + 1)) * Math.PI);
    return Math.max(4, Math.min(38, normalized * 40 * envelope + 4));
  });

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 12,
        backgroundColor: "#ffffff",
        border: "3px solid #000000",
        borderRadius: 14,
        padding: "8px 16px",
        boxShadow: "4px 4px 0px #000000",
        pointerEvents: "none",
        zIndex: 20,
        ...style,
      }}
    >
      {/* Live Recording Dot & Indicator */}
      <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: isTalking ? "#22c55e" : "#94a3b8",
            boxShadow: isTalking ? "0 0 8px #22c55e" : "none",
          }}
        />
        <span
          style={{
            fontFamily: theme.typography.mono,
            fontSize: 12,
            fontWeight: 800,
            color: "#0f172a",
            letterSpacing: "0.06em",
          }}
        >
          {isTalking ? "AUDIO SYNC" : "IDLE"}
        </span>
      </div>

      {/* Vertical Equalizer Bars */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 3,
          height: 38,
          paddingLeft: 4,
          borderLeft: "2px solid #e2e8f0",
        }}
      >
        {bars.map((height, idx) => {
          // Color gradient across the frequency spectrum
          const color =
            idx < barCount * 0.33
              ? "#38bdf8"
              : idx < barCount * 0.66
              ? "#a855f7"
              : "#ec4899";

          return (
            <div
              key={idx}
              style={{
                width: 3.5,
                height: `${height.toFixed(1)}px`,
                backgroundColor: color,
                borderRadius: 2,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};
