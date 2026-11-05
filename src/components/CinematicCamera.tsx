import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

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
  const { fps } = useVideoConfig();

  if (!enableDynamicZoom) {
    return <>{children}</>;
  }

    // 1. High-Impact Financial & Hook Scenes get an instant dynamic Spring Zoom Punch
    const isHighImpact = [
      "title",
      "gmp-gauge",
      "subscription-xray",
      "valuation-battle",
      "stat",
      "cta",
      "compare",
    ].includes(sceneType || "");

    // Spring entrance punch (0 -> 14 frames)
    const springPunch = spring({
      frame,
      fps,
      config: {
        damping: 14,
        stiffness: 130,
        mass: 0.75,
      },
    });

    const punchScale = isHighImpact
      ? interpolate(springPunch, [0, 1], [1.0, 1.048])
      : 1.0;

    // 2. Continuous slow cinematic push-in (1.00 -> 1.025)
    const slowPushIn = interpolate(frame, [0, durationInFrames], [1.0, 1.025], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

    // 3. Subtle organic handheld micro-drift (keeps screen alive & fluid)
    const driftX = Math.sin(frame * 0.055) * 1.5;
    const driftY = Math.cos(frame * 0.045) * 1.2;

    const totalScale = punchScale * slowPushIn;

    return(
    <div
      style = {{
        width: "100%",
        height: "100%",
        transformOrigin: "center 42%",
        transform: `scale(${totalScale.toFixed(4)
  }) translate(${ driftX.toFixed(2) } px, ${ driftY.toFixed(2) }px)`,
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
};
