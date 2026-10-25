import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { resolveFontFamily, useTheme } from "../theme/theme";
import { ActiveWord, framesToSec } from "../lib/timing";

interface CaptionsProps {
  words: ActiveWord[];
  enabled?: boolean;
}

export const Captions: React.FC<CaptionsProps> = ({ words, enabled = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const theme = useTheme();

  if (!enabled || words.length === 0) return null;

  const currentTimeSec = framesToSec(frame, fps);

  // Group or slice words to show a readable chunk (e.g. current word window)
  const activeIndex = words.findIndex((w) => currentTimeSec >= w.startSec && currentTimeSec < w.endSec);
  const targetIndex = activeIndex >= 0 ? activeIndex : 0;

  // Window of up to 6 words centered around targetIndex
  const windowStart = Math.max(0, targetIndex - 2);
  const windowEnd = Math.min(words.length, windowStart + 6);
  const visibleWords = words.slice(windowStart, windowEnd);

  const sampleText = visibleWords.map((w) => w.word).join(" ");
  const fontFamily = resolveFontFamily(sampleText, theme.typography.ui);

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 300,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        pointerEvents: "none",
        zIndex: 40,
        padding: `0 ${theme.layout.sideMargin}px`,
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          backgroundColor: "rgba(255, 255, 255, 0.94)",
          backdropFilter: "blur(12px)",
          padding: "16px 32px",
          borderRadius: theme.layout.pillRadius,
          boxShadow: "0 12px 36px rgba(0, 0, 0, 0.18)",
          maxWidth: 880,
        }}
      >
        {visibleWords.map((item, idx) => {
          const isActive = currentTimeSec >= item.startSec && currentTimeSec < item.endSec;
          return (
            <span
              key={`${windowStart + idx}-${item.word}`}
              style={{
                fontFamily,
                fontSize: 30,
                fontWeight: 600,
                color: isActive ? theme.colors.accent : theme.colors.ink,
                transform: isActive ? "scale(1.08)" : "scale(1)",
                display: "inline-block",
              }}
            >
              {item.word}
            </span>
          );
        })}
      </div>
    </div>
  );
};
