import React, { useMemo } from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { WordTimestamp } from "../schema";
import { useTheme } from "../theme/theme";

export interface KineticCaptionsProps {
  words?: WordTimestamp[];
  enabled?: boolean;
}

export const KineticCaptions: React.FC<KineticCaptionsProps> = ({
  words = [],
  enabled = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const theme = useTheme();

  const currentTimeSec = frame / fps;

  // Find index of currently active word
  const activeIndex = useMemo(() => {
    return words.findIndex(
      (w) => currentTimeSec >= w.startSec && currentTimeSec <= w.endSec
    );
  }, [words, currentTimeSec]);

  // Group into dynamic 3-word windows centered around active word
  const burstWords = useMemo(() => {
    if (words.length === 0) return [];
    if (activeIndex === -1) {
      // Find nearest upcoming or recent word within 0.4s
      const near = words.findIndex((w) => Math.abs(w.startSec - currentTimeSec) < 0.4);
      if (near === -1) return [];
      const start = Math.floor(near / 3) * 3;
      return words.slice(start, start + 3);
    }
    const start = Math.floor(activeIndex / 3) * 3;
    return words.slice(start, start + 3);
  }, [words, activeIndex, currentTimeSec]);

  if (!enabled || burstWords.length === 0) return null;

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 260, // Standard lower-third viral captions position
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 50,
        pointerEvents: "none",
        padding: "0 40px",
      }}
    >
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 16,
          backgroundColor: "rgba(0, 0, 0, 0.75)",
          backdropFilter: "blur(12px)",
          padding: "14px 28px",
          borderRadius: 20,
          border: "2px solid rgba(255, 255, 255, 0.15)",
          boxShadow: "0 12px 40px rgba(0, 0, 0, 0.8)",
        }}
      >
        {burstWords.map((item, idx) => {
          const isSpoken =
            currentTimeSec >= item.startSec && currentTimeSec <= item.endSec;
          const isPast = currentTimeSec > item.endSec;

          return (
            <span
              key={`${item.word}-${idx}`}
              style={{
                fontFamily: theme.typography.headline,
                fontSize: isSpoken ? 52 : 44,
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "-0.02em",
                color: isSpoken ? "#facc15" : isPast ? "#ffffff" : "#94a3b8",
                transform: isSpoken ? "scale(1.15) translateY(-2px)" : "scale(1)",
                transition: "transform 0.08s ease-out, color 0.08s ease-out",
                textShadow: isSpoken
                  ? "0 0 20px rgba(250, 204, 21, 0.6), 0 4px 10px rgba(0,0,0,0.9)"
                  : "0 4px 8px rgba(0,0,0,0.8)",
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
