import React, { useMemo } from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface StarburstBadgeProps {
  text: string;
  subtext?: string;
  color?: string;
  textColor?: string;
  points?: number;
  size?: number;
  delayFrames?: number;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "center" | "none";
  style?: React.CSSProperties;
}

export const StarburstBadge: React.FC<StarburstBadgeProps> = ({
  text,
  subtext,
  color = "#facc15", // Electric yellow
  textColor = "#000000",
  points = 14,
  size = 140,
  delayFrames = 8,
  position = "top-right",
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Bouncy spring pop-in
  const scale = spring({
    frame: frame - delayFrames,
    fps,
    config: {
      damping: 10,
      mass: 0.7,
      stiffness: 140,
    },
  });

  // Slow continuous wobble
  const rotation = Math.sin((frame - delayFrames) / 10) * 4 - 3;

  // Generate star points polygon
  const polygonPoints = useMemo(() => {
    const cx = size / 2;
    const cy = size / 2;
    const outerR = size * 0.46;
    const innerR = size * 0.35;
    const totalPoints = points * 2;
    const coords: string[] = [];

    for (let i = 0; i < totalPoints; i++) {
      const angle = (i * Math.PI) / points - Math.PI / 2;
      const r = i % 2 === 0 ? outerR : innerR;
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);
      coords.push(`${x.toFixed(1)},${y.toFixed(1)}`);
    }

    return coords.join(" ");
  }, [size, points]);

  // Position presets
  const positionStyle: React.CSSProperties = useMemo(() => {
    switch (position) {
      case "top-right":
        return { position: "absolute", top: 130, right: 36, zIndex: 40 };
      case "top-left":
        return { position: "absolute", top: 130, left: 36, zIndex: 40 };
      case "bottom-right":
        return { position: "absolute", bottom: 180, right: 36, zIndex: 40 };
      case "bottom-left":
        return { position: "absolute", bottom: 180, left: 36, zIndex: 40 };
      case "center":
        return { position: "absolute", top: "45%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 40 };
      case "none":
      default:
        return { position: "relative", zIndex: 40 };
    }
  }, [position]);

  if (scale <= 0.01) return null;

  return (
    <div
      style={{
        ...positionStyle,
        width: size,
        height: size,
        transform: `${positionStyle.transform || ""} scale(${scale}) rotate(${rotation}deg)`,
        transformOrigin: "center center",
        pointerEvents: "none",
        filter: "drop-shadow(4px 4px 0px #000000)",
        ...style,
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ overflow: "visible" }}
      >
        <polygon
          points={polygonPoints}
          fill={color}
          stroke="#000000"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
      </svg>

      {/* Centered Bold Badge Content */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          fontFamily: "'JetBrains Mono', monospace",
          color: textColor,
          padding: 8,
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            fontSize: subtext ? Math.round(size * 0.13) : Math.round(size * 0.16),
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            textTransform: "uppercase",
          }}
        >
          {text}
        </div>
        {subtext && (
          <div
            style={{
              fontSize: Math.round(size * 0.095),
              fontWeight: 800,
              opacity: 0.9,
              marginTop: 2,
              letterSpacing: "0.02em",
            }}
          >
            {subtext}
          </div>
        )}
      </div>
    </div>
  );
};
