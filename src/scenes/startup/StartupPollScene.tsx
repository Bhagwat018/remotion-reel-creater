import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { TechLogo } from "../../components/TechLogo";

export interface StartupPollSceneProps {
  durationInFrames: number;
  handle?: string;
}

export const StartupPollScene: React.FC<StartupPollSceneProps> = ({
  handle = "@techwith.GenZ",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const tagEntrance = spring({
    frame: frame - 1,
    fps,
    config: { damping: 13, stiffness: 140 },
  });

  const headlineEntrance = spring({
    frame: frame - 4,
    fps,
    config: { damping: 12, stiffness: 150 },
  });

  const zeptoEntrance = spring({
    frame: frame - 8,
    fps,
    config: { damping: 12, stiffness: 150 },
  });

  const phonepeEntrance = spring({
    frame: frame - 12,
    fps,
    config: { damping: 12, stiffness: 150 },
  });

  const razorpayEntrance = spring({
    frame: frame - 16,
    fps,
    config: { damping: 12, stiffness: 150 },
  });

  const ctaEntrance = spring({
    frame: frame - 22,
    fps,
    config: { damping: 12, stiffness: 160 },
  });

  // Animated Cursor tap animation
  const cursorProgress = spring({
    frame: frame - 16,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  const cursorX = interpolate(cursorProgress, [0, 1], [320, 240]);
  const cursorY = interpolate(cursorProgress, [0, 1], [220, 125]);
  const isTapped = frame > 26;
  const tapScale = isTapped ? Math.sin((frame - 26) * 0.4) * 0.05 + 0.95 : 1;
  const pulse = Math.sin(frame / 6) * 0.03 + 1;

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: 1080,
        height: 1920,
        paddingTop: 200,
        paddingBottom: 380,
        paddingLeft: 60,
        paddingRight: 60,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 16,
        zIndex: 10,
      }}
    >
      {/* 1. THEMATIC HEADER */}
      <div
        style={{
          transform: `scale(${tagEntrance})`,
          opacity: tagEntrance,
          display: "flex",
          alignItems: "center",
          gap: 10,
          backgroundColor: "#fef08a",
          border: "2.5px solid #000000",
          borderRadius: 999,
          padding: "8px 24px",
          boxShadow: "3px 3px 0px #000000",
        }}
      >
        <span style={{ fontSize: 18 }}>🗳️</span>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 16,
            fontWeight: 900,
            color: "#000000",
            letterSpacing: "0.06em",
          }}
        >
          COMMUNITY ARENA // LIVE BATTLE
        </span>
      </div>

      {/* 2. DEDICATED HEADLINE */}
      <div
        style={{
          transform: `scale(${headlineEntrance})`,
          opacity: headlineEntrance,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: 4,
        }}
      >
        <span
          style={{
            fontFamily: "'Anton', sans-serif",
            fontSize: 66,
            fontWeight: 900,
            color: "#0f172a",
            letterSpacing: "0.02em",
            textTransform: "uppercase",
            lineHeight: 1.05,
          }}
        >
          WHICH IPO{" "}
          <span
            style={{
              backgroundColor: "#22c55e",
              color: "#ffffff",
              padding: "2px 14px",
              borderRadius: 8,
              border: "3px solid #000000",
              boxShadow: "4px 4px 0px #000000",
            }}
          >
            WILL YOU BUY?
          </span>
        </span>
      </div>

      {/* 3. THE 3 POLL VOTING CARDS CONTAINER */}
      <div
        style={{
          width: "100%",
          maxWidth: 920,
          display: "flex",
          flexDirection: "column",
          gap: 12,
          position: "relative",
        }}
      >
        {/* OPTION 1: ZEPTO */}
        <div
          style={{
            width: "100%",
            backgroundColor: "#ffffff",
            border: "3.5px solid #000000",
            borderRadius: 20,
            padding: "14px 20px",
            boxShadow: "5px 5px 0px #000000",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            transform: `scale(${zeptoEntrance})`,
            opacity: zeptoEntrance,
            position: "relative",
            overflow: "hidden",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              width: "35%",
              backgroundColor: "rgba(255, 50, 105, 0.12)",
              borderRight: "2.5px dashed #ff3269",
              zIndex: 0,
            }}
          />

          <div style={{ display: "flex", alignItems: "center", gap: 14, zIndex: 1 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                backgroundColor: "#ff3269",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
                fontWeight: 900,
                border: "2px solid #000000",
              }}
            >
              Z
            </div>
            <div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 22, fontWeight: 900 }}>
                ZEPTO
              </div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 12,
                  color: "#64748b",
                  fontWeight: 700,
                }}
              >
                10-Min Delivery Unicorn
              </div>
            </div>
          </div>

          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 22,
              fontWeight: 900,
              color: "#ff3269",
              zIndex: 1,
            }}
          >
            35%
          </div>
        </div>

        {/* OPTION 2: PHONEPE (Leader with Cursor Tap) */}
        <div
          style={{
            width: "100%",
            backgroundColor: "#f5f3ff",
            border: "3.5px solid #5f259f",
            borderRadius: 20,
            padding: "14px 20px",
            boxShadow: "6px 6px 0px #5f259f",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            transform: `scale(${phonepeEntrance * (isTapped ? 1.02 : 1)})`,
            opacity: phonepeEntrance,
            position: "relative",
            overflow: "hidden",
            boxSizing: "border-box",
          }}
        >
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

          <div style={{ display: "flex", alignItems: "center", gap: 14, zIndex: 1 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                backgroundColor: "#5f259f",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px solid #000000",
              }}
            >
              <TechLogo name="phonepe" size={28} />
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 22,
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
                    fontSize: 11,
                    fontFamily: "'JetBrains Mono', monospace",
                    fontWeight: 800,
                    padding: "2px 6px",
                    borderRadius: 6,
                  }}
                >
                  ★ MOST WANTED
                </span>
              </div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 12,
                  color: "#6b21a8",
                  fontWeight: 700,
                }}
              >
                Market Leader UPI Payments
              </div>
            </div>
          </div>

          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 24,
              fontWeight: 900,
              color: "#5f259f",
              zIndex: 1,
            }}
          >
            48%
          </div>
        </div>

        {/* OPTION 3: RAZORPAY */}
        <div
          style={{
            width: "100%",
            backgroundColor: "#ffffff",
            border: "3.5px solid #000000",
            borderRadius: 20,
            padding: "14px 20px",
            boxShadow: "5px 5px 0px #000000",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            transform: `scale(${razorpayEntrance})`,
            opacity: razorpayEntrance,
            position: "relative",
            overflow: "hidden",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              width: "17%",
              backgroundColor: "rgba(2, 132, 199, 0.12)",
              borderRight: "2.5px dashed #0284c7",
              zIndex: 0,
            }}
          />

          <div style={{ display: "flex", alignItems: "center", gap: 14, zIndex: 1 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                backgroundColor: "#0284c7",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px solid #000000",
              }}
            >
              <TechLogo name="razorpay" size={28} />
            </div>
            <div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 22, fontWeight: 900 }}>
                RAZORPAY
              </div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 12,
                  color: "#64748b",
                  fontWeight: 700,
                }}
              >
                Fintech & Neobanking Gateway
              </div>
            </div>
          </div>

          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 22,
              fontWeight: 900,
              color: "#0284c7",
              zIndex: 1,
            }}
          >
            17%
          </div>
        </div>

        {/* POINTER MOUSE CURSOR */}
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
            <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" fill="#fbbf24" />
          </svg>
        </div>
      </div>

      {/* 4. VIRAL CALL-TO-ACTION BUTTON */}
      <div
        style={{
          width: "100%",
          maxWidth: 920,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
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
            borderRadius: 20,
            padding: "16px 24px",
            boxShadow: "5px 5px 0px #000000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            boxSizing: "border-box",
          }}
        >
          <span style={{ fontSize: 26 }}>💬</span>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 26,
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
            padding: "6px 22px",
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

