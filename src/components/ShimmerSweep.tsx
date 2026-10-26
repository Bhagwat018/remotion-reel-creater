import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

export interface ShimmerSweepProps {
  delayFrames?: number;
  periodFrames?: number;
  angle?: number;
  opacity?: number;
  color?: string;
  style?: React.CSSProperties;
}

/**
 * ShimmerSweep (inspired by Remocn & Apple/Linear motion design)
 * Sweeps a sharp diagonal gleam of light across any card, badge, or container.
 */
export const ShimmerSweep: React.FC<ShimmerSweepProps> = ({
  delayFrames = 8,
  periodFrames = 75,
  angle = 115,
  opacity = 0.35,
  color = "255, 255, 255",
  style = {},
}) => {
  const frame = useCurrentFrame();

  if (frame < delayFrames) {
    return null;
  }

  const adjustedFrame = (frame - delayFrames) % periodFrames;
  // Sweep from -80% to 180% over 22 frames, then rest for the remainder of periodFrames
  const sweepProgress = interpolate(adjustedFrame, [0, 24], [-80, 180], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
        borderRadius: "inherit",
        zIndex: 5,
        ...style,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-50%",
          bottom: "-50%",
          width: "45%",
          transform: `translateX(${sweepProgress}%) rotate(${angle - 90}deg)`,
          background: `linear-gradient(90deg, transparent 0%, rgba(${color}, ${opacity * 0.4}) 35%, rgba(${color}, ${opacity}) 50%, rgba(${color}, ${opacity * 0.4}) 65%, transparent 100%)`,
          filter: "blur(4px)",
          mixBlendMode: "overlay",
          pointerEvents: "none",
        }}
      />
    </div>
  );
};
