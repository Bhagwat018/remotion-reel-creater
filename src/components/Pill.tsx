import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { resolveFontFamily, useTheme } from "../theme/theme";
import { entranceSpring } from "../lib/motion";
import { TechLogo, getBrandMeta } from "./TechLogo";
import { ShimmerSweep } from "./ShimmerSweep";
import { FaBug, FaShieldHalved, FaBiohazard } from "react-icons/fa6";
import { FiCheckCircle } from "react-icons/fi";

interface PillProps {
  text: string;
  index?: number;
  showSparkle?: boolean;
}

export const Pill: React.FC<PillProps> = ({
  text,
  index = 0,
  showSparkle = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const theme = useTheme();

  const delay = index * theme.motion.stagger;
  const springProgress = entranceSpring(frame, fps, delay);

  const scale = interpolate(springProgress, [0, 1], [0.9, 1]);
  const opacity = interpolate(springProgress, [0, 1], [0, 1]);
  const translateY = interpolate(springProgress, [0, 1], [24, 0]);

  // Subtle floating sway
  const floatOffset = Math.sin((frame + index * 8) / 12) * 4;

  const fontFamily = resolveFontFamily(text, theme.typography.ui);
  const numStr = String(index + 1).padStart(2, "0");
  const brandMeta = getBrandMeta(text);

  // Contextual icon detection for tech concepts
  const lower = text.toLowerCase();
  let contextualIcon: React.ReactNode = null;
  let pillBorderColor = "rgba(56, 189, 248, 0.35)";
  let pillGlowColor = "rgba(56, 189, 248, 0.15)";
  let badgeLabel = "DETECT";
  let badgeColor = "#38bdf8";

  if (brandMeta) {
    contextualIcon = <TechLogo name={text} size={32} />;
    pillBorderColor = `${brandMeta.defaultColor}55`;
    pillGlowColor = `${brandMeta.defaultColor}20`;
    badgeLabel = "TECH";
    badgeColor = brandMeta.defaultColor;
  } else if (lower.includes("bug") || lower.includes("error") || lower.includes("defect") || lower.includes("crash")) {
    contextualIcon = <FaBug size={28} color="#ef4444" style={{ filter: "drop-shadow(0 0 10px rgba(239,68,68,0.5))" }} />;
    pillBorderColor = "rgba(239, 68, 68, 0.45)";
    pillGlowColor = "rgba(239, 68, 68, 0.2)";
    badgeLabel = "CRITICAL";
    badgeColor = "#ef4444";
  } else if (lower.includes("vulnerab") || lower.includes("secur") || lower.includes("threat") || lower.includes("cve")) {
    contextualIcon = <FaShieldHalved size={28} color="#f59e0b" style={{ filter: "drop-shadow(0 0 10px rgba(245,158,11,0.5))" }} />;
    pillBorderColor = "rgba(245, 158, 11, 0.45)";
    pillGlowColor = "rgba(245, 158, 11, 0.2)";
    badgeLabel = "SECURITY";
    badgeColor = "#f59e0b";
  } else if (lower.includes("smell") || lower.includes("debt") || lower.includes("clean") || lower.includes("maintain")) {
    contextualIcon = <FaBiohazard size={28} color="#a855f7" style={{ filter: "drop-shadow(0 0 10px rgba(168,85,247,0.5))" }} />;
    pillBorderColor = "rgba(168, 85, 247, 0.45)";
    pillGlowColor = "rgba(168, 85, 247, 0.2)";
    badgeLabel = "CODE DEBT";
    badgeColor = "#a855f7";
  } else {
    contextualIcon = <FiCheckCircle size={28} color="#22c55e" style={{ filter: "drop-shadow(0 0 8px rgba(34,197,94,0.5))" }} />;
  }

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 20,
        backgroundColor: "rgba(13, 17, 28, 0.94)",
        backdropFilter: "blur(20px)",
        color: "#f8fafc",
        borderRadius: 24,
        padding: "24px 34px",
        border: `2px solid ${pillBorderColor}`,
        boxShadow: `0 18px 45px rgba(0, 0, 0, 0.5), 0 0 30px ${pillGlowColor}`,
        opacity,
        transform: `translateY(${translateY + floatOffset}px) scale(${scale})`,
        transformOrigin: "center center",
        overflow: "hidden",
      }}
    >
      {/* Remocn Shimmer Light Sweep */}
      <ShimmerSweep delayFrames={delay + 10} periodFrames={80} />

      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        {/* Number Badge */}
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 14,
            backgroundColor: `${badgeColor}18`,
            border: `1.5px solid ${badgeColor}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: theme.typography.mono,
            fontSize: 20,
            fontWeight: 800,
            color: badgeColor,
            boxShadow: `0 0 14px ${badgeColor}35`,
          }}
        >
          {numStr}
        </div>

        {/* Main Text & Contextual Icon */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {contextualIcon}
          <span
            style={{
              fontFamily,
              fontSize: 36,
              fontWeight: 700,
              lineHeight: 1.25,
              letterSpacing: "-0.01em",
              color: "#ffffff",
            }}
          >
            {text}
          </span>
        </div>
      </div>

      {/* Right Verified Tag */}
      {showSparkle && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            backgroundColor: `${badgeColor}15`,
            border: `1px solid ${badgeColor}40`,
            borderRadius: 999,
            padding: "8px 18px",
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: badgeColor,
              boxShadow: `0 0 8px ${badgeColor}`,
            }}
          />
          <span
            style={{
              fontFamily: theme.typography.mono,
              fontSize: 14,
              fontWeight: 800,
              color: badgeColor,
              letterSpacing: "0.08em",
            }}
          >
            {badgeLabel}
          </span>
        </div>
      )}
    </div>
  );
};
