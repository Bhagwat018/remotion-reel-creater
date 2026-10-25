import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { TechLogo, getBrandMeta } from "./TechLogo";

export interface FloatingBadgeProps {
  icon?: string;
  title: string;
  subtitle?: string;
  chip?: string;
  delayFrames?: number;
  style?: React.CSSProperties;
}

export const FloatingBadge: React.FC<FloatingBadgeProps> = ({
  icon,
  title,
  subtitle,
  chip,
  delayFrames = 0,
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring with delay
  const entrance = spring({
    frame: Math.max(0, frame - delayFrames),
    fps,
    config: { damping: 12, stiffness: 140 },
  });

  // Levitation float physics
  const floatY = Math.sin((frame + delayFrames * 3) / 14) * 8;
  const floatRotate = Math.sin((frame + delayFrames * 3) / 20) * 1.5;

  const brandMeta = icon ? getBrandMeta(icon) : null;
  const accentColor = brandMeta ? brandMeta.defaultColor : "#3b82f6";

  return (
    <div
      style={{
        transform: `perspective(1000px) scale(${entrance}) translateY(${floatY}px) rotateZ(${floatRotate}deg)`,
        transformOrigin: "center center",
        background: "rgba(15, 23, 42, 0.85)",
        backdropFilter: "blur(20px)",
        border: `1.5px solid ${accentColor}55`,
        borderRadius: 24,
        padding: "24px 32px",
        boxShadow: `0 20px 50px -10px rgba(0, 0, 0, 0.7), 0 0 40px -10px ${accentColor}30`,
        display: "inline-flex",
        alignItems: "center",
        gap: 24,
        minWidth: 380,
        maxWidth: 620,
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
    >
      {/* Top subtle gloss highlight */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "40%",
          background: "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, transparent 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Brand Icon or Avatar */}
      {icon && (
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: 20,
            background: "rgba(255, 255, 255, 0.04)",
            border: `1px solid ${accentColor}44`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            boxShadow: `0 10px 25px -5px ${accentColor}25`,
          }}
        >
          <TechLogo name={icon} size={44} />
        </div>
      )}

      {/* Content */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <span
            style={{
              fontSize: 32,
              fontWeight: 800,
              color: "#f8fafc",
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
            }}
          >
            {title}
          </span>
          {chip && (
            <span
              style={{
                fontSize: 14,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                padding: "4px 10px",
                borderRadius: 999,
                background: `${accentColor}20`,
                color: accentColor,
                border: `1px solid ${accentColor}40`,
              }}
            >
              {chip}
            </span>
          )}
        </div>

        {subtitle && (
          <span
            style={{
              fontSize: 20,
              fontWeight: 500,
              color: "#94a3b8",
              lineHeight: 1.35,
            }}
          >
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
};
