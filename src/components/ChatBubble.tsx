import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../styles/theme";

export const ChatBubble: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // User message spring
  const userBubbleEntrance = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  // AI message spring
  const aiBubbleEntrance = spring({
    frame: frame - 15,
    fps,
    config: { damping: 14, stiffness: 110 },
  });

  // Probability bars spring
  const probEntrance = spring({
    frame: frame - 35,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  // Pulse for AI status
  const pulse = Math.sin(frame * 0.1) * 0.2 + 0.8;

  const bar1Width = interpolate(frame, [35, 75], [0, 92], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const bar2Width = interpolate(frame, [45, 80], [0, 48], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const bar3Width = interpolate(frame, [55, 85], [0, 14], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: 860,
        display: "flex",
        flexDirection: "column",
        gap: 24,
      }}
    >
      {/* User Bubble */}
      <div
        style={{
          alignSelf: "flex-end",
          maxWidth: 620,
          background: "rgba(30, 41, 59, 0.8)",
          border: "1.5px solid rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(12px)",
          borderRadius: "24px 24px 4px 24px",
          padding: "20px 28px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)",
          opacity: userBubbleEntrance,
          transform: `translateX(${(1 - userBubbleEntrance) * 40}px) scale(${userBubbleEntrance})`,
        }}
      >
        <div
          style={{
            fontFamily: theme.fontFamily,
            fontSize: 24,
            fontWeight: 600,
            color: theme.colors.text,
            lineHeight: 1.4,
          }}
        >
          "Explain how you know this fact is 100% true."
        </div>
      </div>

      {/* AI Bubble */}
      {aiBubbleEntrance > 0.05 && (
        <div
          style={{
            alignSelf: "flex-start",
            width: "100%",
            background: "rgba(18, 24, 38, 0.9)",
            border: `1.5px solid ${theme.colors.cardBorder}`,
            backdropFilter: "blur(16px)",
            borderRadius: "24px 24px 24px 4px",
            padding: "28px 32px",
            boxShadow: `0 16px 40px rgba(0, 0, 0, 0.5), 0 0 24px ${theme.colors.accentGlow}`,
            opacity: aiBubbleEntrance,
            transform: `translateX(${(1 - aiBubbleEntrance) * -40}px) scale(${aiBubbleEntrance})`,
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 16,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, ${theme.colors.accent}, #00A3FF)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 900,
                  fontSize: 16,
                  color: "#0B0F1A",
                  boxShadow: `0 0 16px ${theme.colors.accent}`,
                }}
              >
                AI
              </div>
              <div
                style={{
                  fontFamily: theme.fontFamily,
                  fontSize: 20,
                  fontWeight: 700,
                  color: theme.colors.text,
                }}
              >
                Next-Token Predictor
              </div>
            </div>
            <div
              style={{
                fontFamily: theme.fontFamily,
                fontSize: 14,
                fontWeight: 700,
                color: theme.colors.accent,
                background: "rgba(0, 229, 160, 0.15)",
                padding: "6px 14px",
                borderRadius: 9999,
                border: `1px solid ${theme.colors.accent}`,
                opacity: pulse,
              }}
            >
              PREDICTING TOKENS
            </div>
          </div>

          {/* Body Text */}
          <div
            style={{
              fontFamily: theme.fontFamily,
              fontSize: 22,
              lineHeight: 1.5,
              color: "#CBD5E1",
              marginBottom: 20,
            }}
          >
            I don't verify facts against reality. I calculate the mathematical
            probability of the next plausible token:
          </div>

          {/* Token Probability Breakdown */}
          {probEntrance > 0.05 && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
                opacity: probEntrance,
                padding: "16px 20px",
                background: "rgba(0, 0, 0, 0.35)",
                borderRadius: 14,
                border: "1px solid rgba(255, 255, 255, 0.06)",
              }}
            >
              {/* Row 1 */}
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 16,
                    fontFamily: "monospace",
                    marginBottom: 6,
                    color: theme.colors.accent,
                    fontWeight: 700,
                  }}
                >
                  <span>Token: "confident-sounding response"</span>
                  <span>92.4% PROBABILITY</span>
                </div>
                <div
                  style={{
                    height: 10,
                    width: "100%",
                    background: "rgba(255, 255, 255, 0.1)",
                    borderRadius: 5,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${bar1Width}%`,
                      background: `linear-gradient(90deg, ${theme.colors.accent}, #00FFB3)`,
                      boxShadow: `0 0 10px ${theme.colors.accent}`,
                    }}
                  />
                </div>
              </div>

              {/* Row 2 */}
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 16,
                    fontFamily: "monospace",
                    marginBottom: 6,
                    color: "#94A3B8",
                  }}
                >
                  <span>Token: "verify in reality"</span>
                  <span>4.8% PROBABILITY</span>
                </div>
                <div
                  style={{
                    height: 10,
                    width: "100%",
                    background: "rgba(255, 255, 255, 0.1)",
                    borderRadius: 5,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${bar2Width}%`,
                      background: "#64748B",
                    }}
                  />
                </div>
              </div>

              {/* Row 3 */}
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 16,
                    fontFamily: "monospace",
                    marginBottom: 6,
                    color: "#64748B",
                  }}
                >
                  <span>Token: "admit I don't know"</span>
                  <span>1.4% PROBABILITY</span>
                </div>
                <div
                  style={{
                    height: 10,
                    width: "100%",
                    background: "rgba(255, 255, 255, 0.1)",
                    borderRadius: 5,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${bar3Width}%`,
                      background: "#475569",
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
