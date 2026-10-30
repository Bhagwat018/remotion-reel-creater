import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { TechLogo } from "../TechLogo";

export interface StartupBattlePollProps {
  delayFrames?: number;
  handle?: string;
}

export const StartupBattlePoll: React.FC<StartupBattlePollProps> = ({
  delayFrames = 2,
  handle = "@techwith.GenZ",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - delayFrames,
    fps,
    config: { damping: 13, stiffness: 140 },
  });

  const zeptoEntrance = spring({
    frame: frame - (delayFrames + 4),
    fps,
    config: { damping: 12, stiffness: 150 },
  });

  const phonepeEntrance = spring({
    frame: frame - (delayFrames + 8),
    fps,
    config: { damping: 12, stiffness: 150 },
  });

  const razorpayEntrance = spring({
    frame: frame - (delayFrames + 12),
    fps,
    config: { damping: 12, stiffness: 150 },
  });

  const ctaEntrance = spring({
    frame: frame - (delayFrames + 18),
    fps,
    config: { damping: 11, stiffness: 160 },
  });

  // Animated Cursor tap animation
  // Cursor moves from bottom-right, taps PhonePe at frame 26, ripple expands
  const cursorProgress = spring({
    frame: frame - (delayFrames + 14),
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  const cursorX = interpolate(cursorProgress, [0, 1], [320, 240]);
  const cursorY = interpolate(cursorProgress, [0, 1], [220, 125]);
  const isTapped = frame > delayFrames + 24;
  const tapScale = isTapped ? Math.sin((frame - delayFrames - 24) * 0.4) * 0.05 + 0.95 : 1;

  // Pulse for follow CTA button
  const pulse = Math.sin(frame / 6) * 0.03 + 1;

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 880,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 14,
        transform: `scale(${entrance})`,
        opacity: entrance,
        position: "relative",
      }}
    >
      {/* 1. POLL HEADER */}
      <div
        style={{
          backgroundColor: "#fef08a",
          color: "#000000",
          border: "2.5px solid #000000",
          borderRadius: 999,
          padding: "6px 22px",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 16,
          fontWeight: 900,
          boxShadow: "3px 3px 0px #000000",
          letterSpacing: "0.04em",
          transform: "rotate(-1.5deg)",
        }}
      >
        🗳️ LIVE COMMUNITY POLL: WHICH IPO DO YOU WANT FIRST?
      </div>

      {/* 2. THE THREE POLL OPTIONS */}
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 10,
          position: "relative",
        }}
      >
        {/* OPTION 1: ZEPTO */}
        <div
          style={{
            width: "100%",
            backgroundColor: "#ffffff",
            border: "3px solid #000000",
            borderRadius: 18,
            padding: "12px 18px",
            boxShadow: "4px 4px 0px #000000",
            display: "flex",
            flexDirection: "column",
            gap: 8,
            transform: `scale(${zeptoEntrance})`,
            opacity: zeptoEntrance,
            boxSizing: "border-box",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Progress fill bar */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              width: "35%",
              backgroundColor: "rgba(255, 50, 105, 0.12)",
              borderRight: "2px dashed #ff3269",
              zIndex: 0,
            }}
          />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              zIndex: 1,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 10,
                  backgroundColor: "#ff3269",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                  fontWeight: 900,
                  border: "2px solid #000000",
                }}
              >
                Z
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 20,
                    fontWeight: 900,
                    color: "#0f172a",
                  }}
                >
                  ZEPTO
                </span>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#64748b",
                  }}
                >
                  10-Min Delivery Unicorn
                </span>
              </div>
            </div>

            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 20,
                fontWeight: 900,
                color: "#ff3269",
              }}
            >
              35%
            </div>
          </div>
        </div>

        {/* OPTION 2: PHONEPE (Leader / Selected) */}
        <div
          style={{
            width: "100%",
            backgroundColor: "#f5f3ff",
            border: "3.5px solid #5f259f",
            borderRadius: 18,
            padding: "12px 18px",
            boxShadow: "5px 5px 0px #5f259f",
            display: "flex",
            flexDirection: "column",
            gap: 8,
            transform: `scale(${phonepeEntrance * (isTapped ? 1.02 : 1)})`,
            opacity: phonepeEntrance,
            boxSizing: "border-box",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Progress fill bar */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              width: "48%",
              backgroundColor: "rgba(95, 37, 159, 0.16)",
              borderRight: "2.5px solid #5f259f",
              zIndex: 0,
            }}
          />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              zIndex: 1,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 10,
                  backgroundColor: "#5f259f",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "2px solid #000000",
                }}
              >
                <TechLogo name="phonepe" size={24} />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 20,
                      fontWeight: 900,
                      color: "#5f259f",
                    }}
                  >
                    PHONEPE
                  </span>
                  <span
                    style={{
                      backgroundColor: "#5f259f",
                      color: "#ffffff",
                      fontSize: 10,
                      fontFamily: "'JetBrains Mono', monospace",
                      fontWeight: 800,
                      padding: "2px 6px",
                      borderRadius: 6,
                    }}
                  >
                    MOST WANTED ★
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#6b21a8",
                  }}
                >
                  Market Leader UPI Payments
                </span>
              </div>
            </div>

            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 22,
                fontWeight: 900,
                color: "#5f259f",
              }}
            >
              48%
            </div>
          </div>
        </div>

        {/* OPTION 3: RAZORPAY */}
        <div
          style={{
            width: "100%",
            backgroundColor: "#ffffff",
            border: "3px solid #000000",
            borderRadius: 18,
            padding: "12px 18px",
            boxShadow: "4px 4px 0px #000000",
            display: "flex",
            flexDirection: "column",
            gap: 8,
            transform: `scale(${razorpayEntrance})`,
            opacity: razorpayEntrance,
            boxSizing: "border-box",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Progress fill bar */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              width: "17%",
              backgroundColor: "rgba(2, 132, 199, 0.12)",
              borderRight: "2px dashed #0284c7",
              zIndex: 0,
            }}
          />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              zIndex: 1,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 10,
                  backgroundColor: "#0284c7",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "2px solid #000000",
                }}
              >
                <TechLogo name="razorpay" size={24} />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 20,
                    fontWeight: 900,
                    color: "#0f172a",
                  }}
                >
                  RAZORPAY
                </span>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#64748b",
                  }}
                >
                  Fintech & Neobanking Backbone
                </span>
              </div>
            </div>

            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 20,
                fontWeight: 900,
                color: "#0284c7",
              }}
            >
              17%
            </div>
          </div>
        </div>

        {/* MOUSE POINTER CLICKING ON PHONEPE */}
        <div
          style={{
            position: "absolute",
            top: cursorY,
            right: cursorX,
            zIndex: 20,
            transform: `scale(${cursorProgress * tapScale})`,
            opacity: cursorProgress,
            pointerEvents: "none",
          }}
        >
          <svg
            width="44"
            height="44"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              filter: "drop-shadow(3px 3px 0px rgba(0,0,0,0.5))",
            }}
          >
            <path
              d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"
              fill="#fbbf24"
            />
          </svg>
        </div>
      </div>

      {/* 3. BIG CALL TO ACTION PILL */}
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          marginTop: 6,
          transform: `scale(${ctaEntrance * pulse})`,
          opacity: ctaEntrance,
        }}
      >
        <div
          style={{
            width: "100%",
            backgroundColor: "#22c55e",
            color: "#ffffff",
            border: "3.5px solid #000000",
            borderRadius: 18,
            padding: "16px 24px",
            boxShadow: "5px 5px 0px #000000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            boxSizing: "border-box",
          }}
        >
          <span style={{ fontSize: 24 }}>💬</span>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 24,
              fontWeight: 900,
              color: "#ffffff",
              letterSpacing: "-0.01em",
            }}
          >
            COMMENT YOUR CHOICE + FOLLOW
          </span>
        </div>

        <div
          style={{
            backgroundColor: "#000000",
            color: "#ffffff",
            borderRadius: 999,
            padding: "6px 20px",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 16,
            fontWeight: 800,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span>👉</span>
          <span style={{ color: "#38bdf8" }}>{handle}</span>
          <span>DAILY MARKET & TECH</span>
        </div>
      </div>
    </div>
  );
};
