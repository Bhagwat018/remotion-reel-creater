import React from "react";
import { useCurrentFrame } from "remotion";
import { useTheme } from "../theme/theme";

export const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const theme = useTheme();

  // Slow continuous grid shift so background is never static
  const cellSize = 40;
  const offset = (frame * 0.5) % cellSize;

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: theme.layout.width,
        height: theme.layout.height,
        backgroundColor: theme.colors.bg,
        backgroundImage: `
          linear-gradient(to right, ${theme.colors.grid} 1px, transparent 1px),
          linear-gradient(to bottom, ${theme.colors.grid} 1px, transparent 1px)
        `,
        backgroundSize: `${cellSize}px ${cellSize}px`,
        backgroundPosition: `${offset}px ${offset}px`,
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
};
