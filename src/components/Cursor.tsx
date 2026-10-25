import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { useTheme } from "../theme/theme";

interface CursorProps {
  startX?: number;
  startY?: number;
  targetX?: number;
  targetY?: number;
  moveStartFrame?: number;
  moveDuration?: number;
  clickFrame?: number;
}

export const Cursor: React.FC<CursorProps> = ({
  startX = 300,
  startY = 350,
  targetX = 60,
  targetY = 40,
  moveStartFrame = 10,
  moveDuration = 22,
  clickFrame = 35,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const theme = useTheme();

  // Smooth path motion
  const moveProgress = spring({
    frame: Math.max(0, frame - moveStartFrame),
    fps,
    durationInFrames: moveDuration,
    config: { damping: 20, stiffness: 90, mass: 1 },
  });

  const curX = interpolate(moveProgress, [0, 1], [startX, targetX]);
  const curY = interpolate(moveProgress, [0, 1], [startY, targetY]);

  // Click scale effect
  const clickOffset = frame - clickFrame;
  let clickScale = 1;
  if (clickOffset >= 0 && clickOffset <= 12) {
    clickScale = interpolate(clickOffset, [0, 4, 12], [1, 0.82, 1]);
  }

  const opacity = interpolate(frame, [moveStartFrame - 5, moveStartFrame], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: curX,
        top: curY,
        transform: `scale(${clickScale})`,
        transformOrigin: "top left",
        opacity,
        pointerEvents: "none",
        zIndex: 50,
      }}
    >
      <svg
        width="44"
        height="44"
        viewBox="0 0 24 24"
        fill={theme.colors.ink}
        stroke="#FFFFFF"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.35))" }}
      >
        <path d="m3 3 7 18 3-7 7-3L3 3z" />
      </svg>
    </div>
  );
};
