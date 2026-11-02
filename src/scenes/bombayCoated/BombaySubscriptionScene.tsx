import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface BombaySubscriptionSceneProps {
  durationInFrames: number;
}

export const BombaySubscriptionScene: React.FC<BombaySubscriptionSceneProps> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerSpring = spring({
    frame: frame - 1,
    fps,
    config: { damping: 12, stiffness: 140 },
  });

  const cardSpring = spring({
    frame: frame - 5,
    fps,
    config: { damping: 12, stiffness: 130 },
  });

  const bar1Spring = spring({
    frame: frame - 9,
    fps,
    config: { damping: 12, stiffness: 140 },
  });

  const bar2Spring = spring({
    frame: frame - 14,
    fps,
    config: { damping: 12, stiffness: 140 },
  });

  const bar3Spring = spring({
    frame: frame - 19,
    fps,
    config: { damping: 12, stiffness: 140 },
  });

  const calloutSpring = spring({
    frame: frame - 24,
    fps,
    config: { damping: 12, stiffness: 150 },
  });

  const pulse = Math.sin(frame / 5) * 0.04 + 1;

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: 1080,
        height: 1920,
        paddingTop: 190,
        paddingBottom: 380,
        paddingLeft: 60,
        paddingRight: 60,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 20,
        zIndex: 10,
      }}
    >
      {/* 1. SECTION BADGE */}
      <div
        style={{
          transform: `scale(${headerSpring})`,
          opacity: headerSpring,
          display: "flex",
          alignItems: "center",
          gap: 12,
          backgroundColor: "#bae6fd",
          color: "#0369a1",
          border: "3.5px solid #000000",
          borderRadius: 999,
          padding: "10px 28px",
          boxShadow: "5px 5px 0px #000000",
        }}
      >
        <span style={{ fontSize: 22 }}>📊</span>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 20,
            fontWeight: 900,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          DEMAND AUDIT &amp; SUBSCRIPTION
        </span>
      </div>

      {/* 2. HEADLINE */}
      <div
        style={{
          transform: `scale(${headerSpring})`,
          opacity: headerSpring,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 58,
            fontWeight: 900,
            lineHeight: 1.15,
            color: "#0f172a",
          }}
        >
          <span>SUBSCRIPTION</span>
          <span
            style={{
              backgroundColor: "#bae6fd",
              color: "#0284c7",
              padding: "4px 18px",
              borderRadius: 12,
              border: "3.5px solid #000000",
              boxShadow: "4px 4px 0px #000000",
            }}
          >
            SIRF 4x
          </span>
        </div>
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 22,
            color: "#475569",
            fontWeight: 700,
          }}
        >
          Retail ~3 Guna, Isliye Chance Zyada!
        </div>
      </div>

      {/* 3. SUBSCRIPTION GAUGE CARD */}
      <div
        style={{
          transform: `scale(${cardSpring})`,
          opacity: cardSpring,
          width: "100%",
          backgroundColor: "#ffffff",
          border: "3.5px solid #000000",
          borderRadius: 24,
          padding: "24px 26px",
          boxShadow: "6px 6px 0px #000000",
          display: "flex",
          flexDirection: "column",
          gap: 18,
        }}
      >
        {/* HERO RETAIL ROW */}
        <div
          style={{
            transform: `scale(${bar1Spring})`,
            opacity: bar1Spring,
            backgroundColor: "#f0fdf4",
            border: "2.5px solid #059669",
            borderRadius: 18,
            padding: "16px 20px",
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 20 }}>🎟️</span>
              <span
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 24,
                  fontWeight: 900,
                  color: "#065f46",
                }}
              >
                RETAIL (AAM INVESTOR)
              </span>
            </div>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 28,
                fontWeight: 900,
                color: "#059669",
              }}
            >
              ~3.2x
            </span>
          </div>

          {/* Progress bar */}
          <div
            style={{
              width: "100%",
              height: 12,
              backgroundColor: "#dcfce7",
              borderRadius: 6,
              overflow: "hidden",
              border: "1px solid #86efac",
            }}
          >
            <div
              style={{
                width: `${Math.min(100, bar1Spring * 32)}%`,
                height: "100%",
                background: "linear-gradient(90deg, #10b981, #059669)",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 16,
              color: "#065f46",
              fontWeight: 800,
            }}
          >
            <span>Har 3 me se 1 ko shares</span>
            <span>Allotment Chance: ~33% 🎯</span>
          </div>
        </div>

        {/* QIB ROW */}
        <div
          style={{
            transform: `scale(${bar2Spring})`,
            opacity: bar2Spring,
            backgroundColor: "#f8fafc",
            border: "2px solid #cbd5e1",
            borderRadius: 16,
            padding: "14px 18px",
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 18 }}>🏦</span>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 18,
                  fontWeight: 800,
                  color: "#334155",
                }}
              >
                QIB (Institutional / Banks)
              </span>
            </div>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 22,
                fontWeight: 900,
                color: "#0284c7",
              }}
            >
              ~6.9x
            </span>
          </div>
          <div
            style={{
              width: "100%",
              height: 8,
              backgroundColor: "#e2e8f0",
              borderRadius: 4,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${Math.min(100, bar2Spring * 69)}%`,
                height: "100%",
                backgroundColor: "#0284c7",
              }}
            />
          </div>
        </div>

        {/* NII ROW */}
        <div
          style={{
            transform: `scale(${bar3Spring})`,
            opacity: bar3Spring,
            backgroundColor: "#f8fafc",
            border: "2px solid #cbd5e1",
            borderRadius: 16,
            padding: "14px 18px",
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 18 }}>💼</span>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 18,
                  fontWeight: 800,
                  color: "#334155",
                }}
              >
                NII (HNI / Big Investors)
              </span>
            </div>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 22,
                fontWeight: 900,
                color: "#9333ea",
              }}
            >
              ~1.9x
            </span>
          </div>
          <div
            style={{
              width: "100%",
              height: 8,
              backgroundColor: "#e2e8f0",
              borderRadius: 4,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${Math.min(100, bar3Spring * 19)}%`,
                height: "100%",
                backgroundColor: "#9333ea",
              }}
            />
          </div>
        </div>

        {/* HIGHLIGHT CALLOUT */}
        <div
          style={{
            transform: `scale(${calloutSpring * pulse})`,
            opacity: calloutSpring,
            backgroundColor: "#fef08a",
            border: "2.5px solid #000000",
            borderRadius: 14,
            padding: "12px 18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            boxShadow: "3px 3px 0px #000000",
          }}
        >
          <span style={{ fontSize: 22 }}>🔥</span>
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 18,
              fontWeight: 900,
              color: "#000000",
            }}
          >
            TOTAL DEMAND SIRF ~4x = CHANCE BOHOT HIGH!
          </span>
        </div>
      </div>
    </div>
  );
};
