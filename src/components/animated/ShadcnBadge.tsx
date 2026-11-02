import React from "react";
import { useCurrentFrame } from "remotion";

export interface ShadcnBadgeProps {
  label: string;
  icon?: string;
  variant?: "emerald" | "amber" | "rose" | "cyan" | "violet" | "dark";
  pulsing?: boolean;
  style?: React.CSSProperties;
}

const VARIANTS = {
  emerald: {
    bg: "rgba(16, 185, 129, 0.12)",
    border: "rgba(16, 185, 129, 0.4)",
    text: "#10b981",
    ping: "#10b981",
    glow: "0 0 16px rgba(16, 185, 129, 0.35)",
  },
  amber: {
    bg: "rgba(245, 158, 11, 0.14)",
    border: "rgba(245, 158, 11, 0.45)",
    text: "#f59e0b",
    ping: "#f59e0b",
    glow: "0 0 16px rgba(245, 158, 11, 0.35)",
  },
  rose: {
    bg: "rgba(244, 63, 94, 0.14)",
    border: "rgba(244, 63, 94, 0.45)",
    text: "#f43f5e",
    ping: "#f43f5e",
    glow: "0 0 16px rgba(244, 63, 94, 0.35)",
  },
  cyan: {
    bg: "rgba(6, 182, 212, 0.14)",
    border: "rgba(6, 182, 212, 0.45)",
    text: "#06b6d4",
    ping: "#06b6d4",
    glow: "0 0 16px rgba(6, 182, 212, 0.35)",
  },
  violet: {
    bg: "rgba(168, 85, 247, 0.14)",
    border: "rgba(168, 85, 247, 0.45)",
    text: "#c084fc",
    ping: "#a855f7",
    glow: "0 0 16px rgba(168, 85, 247, 0.35)",
  },
  dark: {
    bg: "rgba(15, 23, 42, 0.75)",
    border: "rgba(255, 255, 255, 0.15)",
    text: "#f8fafc",
    ping: "#38bdf8",
    glow: "0 0 12px rgba(56, 189, 248, 0.2)",
  },
};

/**
 * ShadcnBadge - Sleek modern UI badge with live ping radar indicator
 * Inspired by shadcn/ui & react-native-reanimated micro-interactions
 */
export const ShadcnBadge: React.FC<ShadcnBadgeProps> = ({
  label,
  icon,
  variant = "cyan",
  pulsing = true,
  style,
}) => {
  const frame = useCurrentFrame();
  const v = VARIANTS[variant];

  // Ping pulse animation
  const pingPhase = (frame % 30) / 30; // 0 to 1 every 30 frames (1 sec)
  const pingScale = 1 + pingPhase * 1.5;
  const pingOpacity = (1 - pingPhase) * 0.85;

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        backgroundColor: v.bg,
        border: `1.5px solid ${v.border}`,
        borderRadius: 999,
        padding: "6px 14px",
        boxShadow: v.glow,
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        ...style,
      }}
    >
      {pulsing && (
        <div
          style={{
            position: "relative",
            width: 8,
            height: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Animated radar ping ring */}
          <div
            style={{
              position: "absolute",
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: v.ping,
              transform: `scale(${pingScale})`,
              opacity: pingOpacity,
            }}
          />
          {/* Solid center dot */}
          <div
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              backgroundColor: v.ping,
            }}
          />
        </div>
      )}

      {icon && <span style={{ fontSize: 16 }}>{icon}</span>}

      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 14,
          fontWeight: 800,
          letterSpacing: 0.8,
          color: v.text,
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>
    </div>
  );
};
