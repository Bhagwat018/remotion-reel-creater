import React from "react";
import { useCurrentFrame } from "remotion";

export interface BorderBeamProps {
  size?: number; // thickness of beam in pixels
  duration?: number; // frames per full loop
  colorFrom?: string;
  colorTo?: string;
  borderRadius?: number;
  borderWidth?: number;
}

/**
 * BorderBeam - Inspired by makeitanimated.dev and Magic UI
 * Animates a glowing traveling light beam along the border of any container.
 */
export const BorderBeam: React.FC<BorderBeamProps> = ({
  size = 120,
  duration = 90,
  colorFrom = "#06b6d4",
  colorTo = "#3b82f6",
  borderRadius = 20,
  borderWidth = 2,
}) => {
  const frame = useCurrentFrame();
  const angle = (frame / duration) * 360;

  return (
    <div
      style={{
        position: "absolute",
        inset: -borderWidth,
        borderRadius: borderRadius,
        padding: borderWidth,
        pointerEvents: "none",
        zIndex: 2,
        overflow: "hidden",
        mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        maskComposite: "exclude",
        WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        WebkitMaskComposite: "xor",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "200%",
          height: "200%",
          transform: `translate(-50%, -50%) rotate(${angle}deg)`,
          background: `conic-gradient(from 0deg, transparent 0deg, ${colorFrom} 40deg, ${colorTo} 80deg, transparent 120deg)`,
        }}
      />
    </div>
  );
};
