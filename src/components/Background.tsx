import React from "react";
import { useCurrentFrame } from "remotion";
import { useTheme } from "../theme/theme";

export const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const theme = useTheme();

  const dotSpacing = 44;
  const offset = (frame * 0.2) % dotSpacing;

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: theme.layout.width,
        height: theme.layout.height,
        backgroundColor: "#f4f5f8",
        backgroundImage: "radial-gradient(circle, rgba(0, 0, 0, 0.16) 2.5px, transparent 2.5px)",
        backgroundSize: `${dotSpacing}px ${dotSpacing}px`,
        backgroundPosition: `${offset}px ${offset}px`,
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
};
