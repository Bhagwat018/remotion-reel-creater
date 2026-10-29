import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

export interface CinematicCameraProps {
  sceneType?: string;
  durationInFrames: number;
  enableDynamicZoom?: boolean;
  children: React.ReactNode;
}

export const CinematicCamera: React.FC<CinematicCameraProps> = ({
  sceneType,
  durationInFrames,
  enableDynamicZoom = true,
  children,
}) => {
  const frame = useCurrentFrame();

  if (!enableDynamicZoom) {
    return <>{children}</>;
  }

  // 1. Slow Push-In Zoom (1.00 -> 1.03) over the scene duration
  const pushIn = interpolate(frame, [0, durationInFrames], [1.0, 1.032], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 2. Punch Zoom on high-emphasis scenes (stat, cta, bot)
  const isHighImpact = sceneType === "stat" || sceneType === "cta" || sceneType === "bot";
  const punchScale = isHighImpact ? 1.025 : 1.0;

  // 3. Subtle organic handheld micro-drift (0.5px - 1.5px)
  const driftX = Math.sin(frame * 0.05) * 1.5;
  const driftY = Math.cos(frame * 0.04) * 1.2;

  const totalScale = pushIn * punchScale;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        transformOrigin: "center 42%",
        transform: `scale(${totalScale.toFixed(4)}) translate(${driftX.toFixed(2)}px, ${driftY.toFixed(2)}px)`,
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
};
