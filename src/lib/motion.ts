import { interpolate, spring } from "remotion";
import { theme } from "../theme/theme";

/**
 * Computes entrance spring with soft overshoot (<= 5%).
 */
export const entranceSpring = (
  frame: number,
  fps: number,
  delayFrames = 0
): number => {
  return spring({
    frame: Math.max(0, frame - delayFrames),
    fps,
    config: theme.motion.springConfig,
  });
};

/**
 * Blur-in and slide-up text motion preset:
 * - Blur: 14px down to 0px over 10 frames
 * - Opacity: 0 to 1 over 10 frames
 * - Y-slide: 12px up to 0px
 */
export const useBlurIn = (frame: number, delayFrames = 0) => {
  const localFrame = Math.max(0, frame - delayFrames);
  const { from, to, durationFrames } = theme.motion.blurIn;

  const blur = interpolate(localFrame, [0, durationFrames], [from, to], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const opacity = interpolate(localFrame, [0, durationFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const translateY = interpolate(localFrame, [0, durationFrames], [12, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return {
    filter: `blur(${blur}px)`,
    opacity,
    transform: `translateY(${translateY}px)`,
  };
};

/**
 * Blur-out text and scene exit motion preset:
 * - Blur: 0px up to 14px over last 8 frames
 * - Opacity: 1 down to 0
 */
export const useBlurOut = (frame: number, sceneDurationFrames: number) => {
  const { from, to, durationFrames } = theme.motion.blurOut;
  const startFrame = Math.max(0, sceneDurationFrames - durationFrames);

  const blur = interpolate(frame, [startFrame, sceneDurationFrames], [from, to], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const opacity = interpolate(frame, [startFrame, sceneDurationFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return {
    filter: `blur(${blur}px)`,
    opacity,
  };
};

/**
 * Combined scene entrance and exit container styles.
 */
export const getSceneMotionStyle = (
  frame: number,
  durationInFrames: number
): React.CSSProperties => {
  const { durationFrames: inFrames } = theme.motion.blurIn;
  const { durationFrames: outFrames } = theme.motion.blurOut;

  // Entrance
  const inBlur = interpolate(frame, [0, inFrames], [14, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const inOpacity = interpolate(frame, [0, inFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Exit
  const exitStart = Math.max(0, durationInFrames - outFrames);
  const outBlur = interpolate(frame, [exitStart, durationInFrames], [0, 14], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const outOpacity = interpolate(frame, [exitStart, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const blur = Math.max(inBlur, outBlur);
  const opacity = Math.min(inOpacity, outOpacity);

  return {
    filter: blur > 0.05 ? `blur(${blur.toFixed(1)}px)` : "none",
    opacity,
  };
};
