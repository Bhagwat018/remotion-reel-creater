import React from "react";
import { useCurrentFrame } from "remotion";
import { useTheme } from "../theme/theme";

export const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const theme = useTheme();

  const baseDotSpacing = 44;
  // Slow continuous drift
  const offset = (frame * 0.25) % baseDotSpacing;

  // Beat-reactive rhythmic kick (120 BPM at 60 FPS = 30 frames/beat)
  const beatPeriod = 30;
  const beatFraction = (frame % beatPeriod) / beatPeriod;
  // Instant snap on the downbeat with smooth exponential decay
  const beatPunch = Math.exp(-beatFraction * 5.0);

  // Dynamic dot size & opacity reacting to the rhythm
  const dotRadius = 2.2 + beatPunch * 1.5;
  const dotOpacity = 0.14 + beatPunch * 0.14;
  const gridScale = 1.0 + beatPunch * 0.008;

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: theme.layout.width,
        height: theme.layout.height,
        backgroundColor: "#f4f5f8",
        backgroundImage: `radial-gradient(circle, rgba(0, 0, 0, ${dotOpacity.toFixed(3)}) ${dotRadius.toFixed(1)}px, transparent ${dotRadius.toFixed(1)}px)`,
        backgroundSize: `${baseDotSpacing}px ${baseDotSpacing}px`,
        backgroundPosition: `${offset}px ${offset}px`,
        transform: `scale(${gridScale.toFixed(4)})`,
        transformOrigin: "center center",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
};
