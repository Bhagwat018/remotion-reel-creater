import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { TechLogo, getBrandMeta } from "./TechLogo";
import { ShimmerSweep } from "./ShimmerSweep";

export interface FloatingBadgeProps {
  icon?: string;
  title?: string;
  subtitle?: string;
  chip?: string;
  size?: number;
  delayFrames?: number;
  forceEntrance?: boolean;
  style?: React.CSSProperties;
}

export const FloatingBadge: React.FC<FloatingBadgeProps> = ({
  icon,
  title,
  subtitle,
  chip,
  delayFrames = 0,
  forceEntrance = false,
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring with delay (or force 1 if static cover)
  const springVal = spring({
    frame: Math.max(0, frame - delayFrames),
    fps,
    config: { damping: 12, stiffness: 140 },
  });
  const entrance = forceEntrance ? 1 : springVal;

  // Levitation float physics
  const floatY = forceEntrance ? 0 : Math.sin((frame + delayFrames * 3) / 14) * 8;
  const floatRotate = forceEntrance ? 0 : Math.sin((frame + delayFrames * 3) / 20) * 1.5;

  const brandMeta = icon ? getBrandMeta(icon) : null;
  const accentColor = brandMeta ? brandMeta.defaultColor : "#3b82f6";
  const isIconOnly = !title;

  return (
    <div
      style={{
        transform: `perspective(1000px) scale(${entrance}) translateY(${floatY}px) rotateZ(${floatRotate}deg)`,
        transformOrigin: "center center",
        background: "rgba(15, 23, 42, 0.88)",
        backdropFilter: "blur(20px)",
        border: `2px solid ${accentColor}77`,
        borderRadius: isIconOnly ? 28 : 26,
        padding: isIconOnly ? "22px" : "26px 36px",
        boxShadow: `0 24px 60px -10px rgba(0, 0, 0, 0.75), 0 0 45px -5px ${accentColor}45`,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: isIconOnly ? 0 : 26,
        minWidth: isIconOnly ? undefined : 520,
        maxWidth: isIconOnly ? undefined : 780,
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

      {/* Shimmer sweep effect */}
      <ShimmerSweep delayFrames={delayFrames + 6} periodFrames={75} />

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
