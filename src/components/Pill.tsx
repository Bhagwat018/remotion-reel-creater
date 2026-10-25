import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { resolveFontFamily, useTheme } from "../theme/theme";
import { entranceSpring } from "../lib/motion";
import { TechLogo, getBrandMeta } from "./TechLogo";

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
  const translateY = interpolate(springProgress, [0, 1], [16, 0]);

  const fontFamily = resolveFontFamily(text, theme.typography.ui);
  const numStr = String(index + 1).padStart(2, "0");
  const brandMeta = getBrandMeta(text);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 20,
        backgroundColor: "rgba(13, 17, 28, 0.94)",
        color: "#f8fafc",
        borderRadius: 22,
        padding: "22px 32px",
        border: "2px solid rgba(56, 189, 248, 0.3)",
        boxShadow: "0 16px 40px rgba(0, 0, 0, 0.45), 0 0 25px rgba(56, 189, 248, 0.12)",
        opacity,
        transform: `translateY(${translateY}px) scale(${scale})`,
        transformOrigin: "center center",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        {/* Glowing Number Badge */}
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            backgroundColor: "rgba(56, 189, 248, 0.15)",
            border: "1.5px solid #38bdf8",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: theme.typography.mono,
            fontSize: 20,
            fontWeight: 800,
            color: "#38bdf8",
            boxShadow: "0 0 12px rgba(56, 189, 248, 0.3)",
          }}
        >
          {numStr}
        </div>

        {/* Main Text & Tech Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {brandMeta && <TechLogo name={text} size={32} />}
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

      {/* Right Sparkle / Verified Tag */}
      {showSparkle && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            backgroundColor: "rgba(56, 189, 248, 0.12)",
            borderRadius: 999,
            padding: "6px 14px",
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3z" />
          </svg>
          <span
            style={{
              fontFamily: theme.typography.mono,
              fontSize: 14,
              fontWeight: 700,
              color: "#38bdf8",
              letterSpacing: "0.08em",
            }}
          >
            TOOL
          </span>
        </div>
      )}
    </div>
  );
};
