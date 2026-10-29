import React from "react";
import { Audio, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { MacOSCursor } from "@remotion/mac-cursors";
import { mouseClick } from "../lib/sfx";

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

  // Smooth path motion with calibrated spring physics
  const moveProgress = spring({
    frame: Math.max(0, frame - moveStartFrame),
    fps,
    durationInFrames: moveDuration,
    config: { damping: 20, stiffness: 95, mass: 1 },
  });

  const curX = interpolate(moveProgress, [0, 1], [startX, targetX]);
  const curY = interpolate(moveProgress, [0, 1], [startY, targetY]);

  // Click bounce & tactile scale depression
  const clickOffset = frame - clickFrame;
  let clickScale = 1;
  if (clickOffset >= 0 && clickOffset <= 12) {
    clickScale = interpolate(clickOffset, [0, 3, 12], [1, 0.82, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  }

  // Fade in on arrival
  const opacity = interpolate(frame, [moveStartFrame - 4, moveStartFrame], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Dynamic Click Shockwave Ripple
  const showRipple = clickOffset >= 0 && clickOffset <= 18;
  const rippleRadius = showRipple
    ? interpolate(clickOffset, [0, 18], [12, 70], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0;
  const rippleOpacity = showRipple
    ? interpolate(clickOffset, [0, 4, 18], [0.9, 0.7, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0;

  return (
    <div
      style={{
        position: "absolute",
        left: curX,
        top: curY,
        opacity,
        pointerEvents: "none",
        zIndex: 50,
      }}
    >
      {/* Sound Effect triggered exactly on clickFrame */}
      {frame === clickFrame && (
        <Audio src={mouseClick} volume={0.85} />
      )}

      {/* Expanding Concentric Shockwave Ripple */}
      {showRipple && (
        <div
          style={{
            position: "absolute",
            left: 12,
            top: 12,
            width: rippleRadius,
            height: rippleRadius,
            borderRadius: "50%",
            border: "3.5px solid #3b82f6",
            backgroundColor: "rgba(59, 130, 246, 0.15)",
            transform: "translate(-50%, -50%)",
            opacity: rippleOpacity,
            pointerEvents: "none",
          }}
        />
      )}

      {/* Authentic Apple Retina Pointer Cursor */}
      <div
        style={{
          transform: `scale(${clickScale})`,
          transformOrigin: "top left",
          filter: "drop-shadow(0 8px 18px rgba(0,0,0,0.45))",
        }}
      >
        <MacOSCursor cursor="pointer" style={{ width: 44, height: 44 }} />
      </div>
    </div>
  );
};

