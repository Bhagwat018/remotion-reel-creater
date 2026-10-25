import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../styles/theme";

export const ChecklistVisual: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const items = [
    {
      label: "Demand Primary Sources",
      sub: "Never accept unreferenced claims",
      delay: 5,
    },
    {
      label: "Test & Execute Code",
      sub: "Compile in sandbox before committing",
      delay: 25,
    },
    {
      label: "Zero Blind Trust",
      sub: "You are the human in the loop",
      delay: 45,
    },
  ];

  return (
    <div
      style={{
        width: 860,
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}
    >
      {items.map((item, index) => {
        const itemEntrance = spring({
          frame: frame - item.delay,
          fps,
          config: { damping: 13, stiffness: 120 },
        });

        const checkPop = spring({
          frame: frame - (item.delay + 10),
          fps,
          config: { damping: 10, stiffness: 150 },
        });

        if (itemEntrance <= 0.01) return null;

        return (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 24,
              padding: "24px 28px",
              background: "rgba(18, 24, 38, 0.9)",
              border: `1.5px solid ${theme.colors.cardBorder}`,
              borderRadius: 20,
              backdropFilter: "blur(16px)",
              boxShadow: `0 12px 36px rgba(0, 0, 0, 0.45), 0 0 20px ${theme.colors.accentGlow}`,
              opacity: itemEntrance,
              transform: `translateY(${(1 - itemEntrance) * 30}px) scale(${itemEntrance})`,
            }}
          >
            {/* Animated Checkbox Icon */}
            <div
              style={{
                width: 54,
                height: 54,
                borderRadius: 14,
                background:
                  checkPop > 0.5
                    ? theme.colors.accent
                    : "rgba(255, 255, 255, 0.05)",
                border: `2px solid ${theme.colors.accent}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                transform: `scale(${0.6 + checkPop * 0.4})`,
                boxShadow:
                  checkPop > 0.5
                    ? `0 0 20px ${theme.colors.accentGlow}`
                    : "none",
              }}
            >
              {checkPop > 0.1 && (
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#0B0F1A"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    transform: `scale(${checkPop})`,
                  }}
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </div>

            {/* Content */}
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontFamily: theme.fontFamily,
                  fontSize: 26,
                  fontWeight: 800,
                  color: theme.colors.text,
                  letterSpacing: "-0.01em",
                }}
              >
                {item.label}
              </div>
              <div
                style={{
                  fontFamily: theme.fontFamily,
                  fontSize: 18,
                  fontWeight: 500,
                  color: theme.colors.mutedText,
                  marginTop: 4,
                }}
              >
                {item.sub}
              </div>
            </div>

            {/* Verified badge */}
            <div
              style={{
                padding: "6px 14px",
                borderRadius: 8,
                background: "rgba(0, 229, 160, 0.12)",
                border: `1px solid rgba(0, 229, 160, 0.3)`,
                fontFamily: theme.fontFamily,
                fontSize: 14,
                fontWeight: 700,
                color: theme.colors.accent,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              RULE #{index + 1}
            </div>
          </div>
        );
      })}
    </div>
  );
};
