import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { TechLogo, findBrandInText, getBrandMeta } from "./TechLogo";

export interface AutoTechBadgeProps {
  brandName?: string;
  contextText?: string;
  delayFrames?: number;
  style?: React.CSSProperties;
}

export const AutoTechBadge: React.FC<AutoTechBadgeProps> = ({
  brandName,
  contextText,
  delayFrames = 8,
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Resolve brand either from explicit brandName or by scanning contextText
  const resolved = React.useMemo(() => {
    if (brandName) {
      const meta = getBrandMeta(brandName);
      if (meta) return { key: brandName.toLowerCase(), meta };
    }
    if (contextText) {
      return findBrandInText(contextText);
    }
    return null;
  }, [brandName, contextText]);

  if (!resolved) return null;

  const { meta } = resolved;

  // Spring entrance animation
  const entrance = spring({
    frame: frame - delayFrames,
    fps,
    config: { damping: 12, stiffness: 140 },
  });

  // Floating bob animation (subtle 5px vertical sine wave)
  const floatOffset = Math.sin((frame + delayFrames * 4) * 0.09) * 5;
  const rotation = Math.sin((frame + delayFrames * 2) * 0.06) * 2;

  const scale = interpolate(entrance, [0, 1], [0.6, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = interpolate(entrance, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        top: 36,
        right: 48,
        display: "flex",
        alignItems: "center",
        gap: 12,
        backgroundColor: "#ffffff",
        border: "3.5px solid #000000",
        borderRadius: 18,
        padding: "10px 18px",
        boxShadow: "5px 5px 0px #000000",
        transform: `translateY(${floatOffset}px) rotate(${rotation}deg) scale(${scale})`,
        opacity,
        zIndex: 25,
        pointerEvents: "none",
        ...style,
      }}
    >
      <div
        style={{
          width: 38,
          height: 38,
          borderRadius: 10,
          backgroundColor: `${meta.defaultColor}18`,
          border: `2px solid #000000`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 4,
          boxSizing: "border-box",
        }}
      >
        <TechLogo name={resolved.key} size={24} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        <span
          style={{
            fontFamily: "Space Grotesk, sans-serif",
            fontSize: 18,
            fontWeight: 800,
            color: "#0f172a",
            letterSpacing: "-0.01em",
            lineHeight: 1.1,
          }}
        >
          {meta.label}
        </span>
        <span
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 11,
            fontWeight: 700,
            color: meta.defaultColor,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          VERIFIED TECH
        </span>
      </div>
    </div>
  );
};
