import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { resolveFontFamily, useTheme } from "../theme/theme";
import { entranceSpring } from "../lib/motion";
import { TechLogo, getBrandMeta } from "./TechLogo";

interface OrbitLoopProps {
  nodes: string[];
  delayFrames?: number;
}

export const OrbitLoop: React.FC<OrbitLoopProps> = ({
  nodes,
  delayFrames = 4,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const theme = useTheme();

  const radius = 240;
  const cx = 350;
  const cy = 350;
  const count = nodes.length;

  const springVal = entranceSpring(frame, fps, delayFrames);
  const scale = interpolate(springVal, [0, 1], [0.85, 1]);
  const opacity = interpolate(springVal, [0, 1], [0, 1]);

  // Accent travelling dot angle
  const angleSpeed = 1.8; // degrees per frame
  const dotAngle = ((frame * angleSpeed) % 360) * (Math.PI / 180);
  const dotX = cx + radius * Math.cos(dotAngle);
  const dotY = cy + radius * Math.sin(dotAngle);

  return (
    <div
      style={{
        position: "relative",
        width: cx * 2,
        height: cy * 2,
        margin: "0 auto",
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      {/* SVG Dotted Orbit Path */}
      <svg
        width={cx * 2}
        height={cy * 2}
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        <circle
          cx={cx}
          cy={cy}
          r={radius}
          fill="none"
          stroke={theme.colors.card}
          strokeWidth="3"
          strokeDasharray="8 12"
          opacity={0.35}
        />
        {/* Accent travelling dot */}
        <circle
          cx={dotX}
          cy={dotY}
          r="10"
          fill={theme.colors.accent}
          filter="drop-shadow(0 0 10px rgba(37, 99, 255, 0.8))"
        />
      </svg>

      {/* Orbiting nodes (Pills) */}
      {nodes.map((nodeText, idx) => {
        const nodeAngle = ((idx * (360 / count) - 90) * Math.PI) / 180;
        const nx = cx + radius * Math.cos(nodeAngle);
        const ny = cy + radius * Math.sin(nodeAngle);

        const nodeSpring = entranceSpring(frame, fps, delayFrames + idx * 4);
        const nodeOpacity = interpolate(nodeSpring, [0, 1], [0, 1]);
        const nodeScale = interpolate(nodeSpring, [0, 1], [0.8, 1]);
        const fontFamily = resolveFontFamily(nodeText, theme.typography.ui);

        return (
          <div
            key={idx}
            style={{
              position: "absolute",
              left: nx,
              top: ny,
              transform: `translate(-50%, -50%) scale(${nodeScale})`,
              opacity: nodeOpacity,
              backgroundColor: theme.colors.card,
              color: theme.colors.cardText,
              borderRadius: theme.layout.pillRadius,
              padding: "16px 28px",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              fontFamily,
              fontSize: 26,
              fontWeight: 600,
              whiteSpace: "nowrap",
              zIndex: 10,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            {getBrandMeta(nodeText) && <TechLogo name={nodeText} size={28} />}
            <span>{nodeText}</span>
          </div>
        );
      })}
    </div>
  );
};
