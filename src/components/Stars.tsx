import React from "react";
import { useCurrentFrame } from "remotion";
import { useTheme } from "../theme/theme";

interface StarsProps {
  sceneId?: string;
}

export const Stars: React.FC<StarsProps> = () => {
  const frame = useCurrentFrame();
  const theme = useTheme();

  // Subtle recording pulse
  const recBlink = (frame % 30) < 18;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 10,
        overflow: "hidden",
      }}
    >
      {/* Top Left: Tech Status Overlay */}
      <div
        style={{
          position: "absolute",
          top: 70,
          left: 60,
          display: "flex",
          alignItems: "center",
          gap: 10,
          fontFamily: theme.typography.mono,
          fontSize: 16,
          fontWeight: 600,
          color: "rgba(0, 0, 0, 0.45)",
          letterSpacing: "0.08em",
        }}
      >
        <span
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            backgroundColor: recBlink ? "#ef4444" : "rgba(239, 68, 68, 0.2)",
            boxShadow: recBlink ? "0 0 10px #ef4444" : "none",
          }}
        />
        <span>TECH.SYS // 60 FPS</span>
      </div>

      {/* Top Right: Format Badge */}
      <div
        style={{
          position: "absolute",
          top: 70,
          right: 60,
          fontFamily: theme.typography.mono,
          fontSize: 16,
          fontWeight: 600,
          color: "rgba(0, 0, 0, 0.45)",
          letterSpacing: "0.08em",
        }}
      >
        <span>9:16 [1080×1920]</span>
      </div>

      {/* Modern Corner Viewfinder Brackets */}
      {/* Top-Left Bracket */}
      <svg
        style={{ position: "absolute", top: 60, left: 40 }}
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="rgba(0, 0, 0, 0.3)"
        strokeWidth="3"
        strokeLinecap="round"
      >
        <path d="M4 10V4h6" />
      </svg>

      {/* Top-Right Bracket */}
      <svg
        style={{ position: "absolute", top: 60, right: 40 }}
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="rgba(0, 0, 0, 0.3)"
        strokeWidth="3"
        strokeLinecap="round"
      >
        <path d="M20 10V4h-6" />
      </svg>

      {/* Modern Corner Crosshairs (+) */}
      {/* Top-Left Crosshair */}
      <svg
        style={{ position: "absolute", top: 120, left: 60 }}
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="rgba(0, 0, 0, 0.2)"
        strokeWidth="2"
      >
        <line x1="12" y1="4" x2="12" y2="20" />
        <line x1="4" y1="12" x2="20" y2="12" />
      </svg>

      {/* Top-Right Crosshair */}
      <svg
        style={{ position: "absolute", top: 120, right: 60 }}
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="rgba(0, 0, 0, 0.2)"
        strokeWidth="2"
      >
        <line x1="12" y1="4" x2="12" y2="20" />
        <line x1="4" y1="12" x2="20" y2="12" />
      </svg>

      {/* Bottom-Left Tech Bracket */}
      <svg
        style={{ position: "absolute", bottom: 70, left: 60 }}
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="rgba(0, 0, 0, 0.3)"
        strokeWidth="3"
        strokeLinecap="round"
      >
        <path d="M4 14v6h6" />
      </svg>

      {/* Bottom-Right Tech Bracket */}
      <svg
        style={{ position: "absolute", bottom: 70, right: 60 }}
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="rgba(0, 0, 0, 0.3)"
        strokeWidth="3"
        strokeLinecap="round"
      >
        <path d="M20 14v6h-6" />
      </svg>
    </div>
  );
};
