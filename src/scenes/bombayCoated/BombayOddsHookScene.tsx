import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface BombayOddsHookSceneProps {
  durationInFrames: number;
}

export const BombayOddsHookScene: React.FC<BombayOddsHookSceneProps> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const badgeSpring = spring({
    frame: frame - 1,
    fps,
    config: { damping: 12, stiffness: 150 },
  });

  const headlineSpring = spring({
    frame: frame - 4,
    fps,
    config: { damping: 11, stiffness: 140 },
  });

  const card1Spring = spring({
    frame: frame - 7,
    fps,
    config: { damping: 12, stiffness: 130 },
  });

  const vsSpring = spring({
    frame: frame - 13,
    fps,
    config: { damping: 10, stiffness: 160 },
  });

  const card2Spring = spring({
    frame: frame - 18,
    fps,
    config: { damping: 12, stiffness: 130 },
  });

  const bottomSpring = spring({
    frame: frame - 24,
    fps,
    config: { damping: 12, stiffness: 140 },
  });

  const pulse = Math.sin(frame / 6) * 0.03 + 1;
  const wiggle = Math.sin(frame / 4) * 3;

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
      {/* 1. SCROLL STOPPER BADGE */}
      <div
        style={{
          transform: `scale(${badgeSpring * pulse})`,
          opacity: badgeSpring,
          display: "flex",
          alignItems: "center",
          gap: 12,
          backgroundColor: "#ff0055",
          color: "#ffffff",
          border: "3.5px solid #000000",
          borderRadius: 999,
          padding: "10px 28px",
          boxShadow: "5px 5px 0px #000000",
        }}
      >
        <span style={{ fontSize: 24 }}>🚨</span>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 20,
            fontWeight: 900,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          SHOCKING ALLOTMENT ODDS
        </span>
      </div>

      {/* 2. MAIN HEADLINE */}
      <div
        style={{
          transform: `scale(${headlineSpring}) translateY(${(1 - headlineSpring) * 20}px)`,
          opacity: headlineSpring,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 62,
            fontWeight: 900,
            lineHeight: 1.1,
            color: "#0f172a",
          }}
        >
          <span>BLS ME</span>
          <span
            style={{
              backgroundColor: "#fee2e2",
              color: "#dc2626",
              padding: "4px 18px",
              borderRadius: 12,
              border: "3.5px solid #000000",
              boxShadow: "4px 4px 0px #000000",
            }}
          >
            1 IN 128
          </span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 64,
            fontWeight: 900,
            lineHeight: 1.1,
            color: "#0f172a",
          }}
        >
          <span>IS IPO ME</span>
          <span
            style={{
              backgroundColor: "#d1fae5",
              color: "#059669",
              padding: "4px 18px",
              borderRadius: 12,
              border: "3.5px solid #000000",
              boxShadow: "4px 4px 0px #000000",
            }}
          >
            1 IN 3! 🎯
          </span>
        </div>
      </div>

      {/* 3. COMPARISON ARENA */}
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 14,
          marginTop: 6,
        }}
      >
        {/* CARD 1: BLS POLYMERS */}
        <div
          style={{
            transform: `scale(${card1Spring}) translateX(${(1 - card1Spring) * -30}px)`,
            opacity: card1Spring,
            backgroundColor: "#fff1f2",
            border: "3.5px solid #000000",
            borderRadius: 22,
            padding: "20px 24px",
            boxShadow: "6px 6px 0px #000000",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 20 }}>🎟️</span>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 18,
                  fontWeight: 900,
                  color: "#991b1b",
                  letterSpacing: 1,
                }}
              >
                BLS POLYMERS IPO
              </span>
            </div>
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 28,
                fontWeight: 900,
                color: "#b91c1c",
              }}
            >
              Retail: ~128x Subscribed
            </div>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 17,
                color: "#475569",
                fontWeight: 600,
              }}
            >
              Odds: <span style={{ color: "#dc2626", fontWeight: 800 }}>0.78% (Pure Lottery)</span>
            </div>
          </div>

          <div
            style={{
              backgroundColor: "#fee2e2",
              border: "3px solid #000000",
              borderRadius: 14,
              padding: "10px 16px",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              boxShadow: "3px 3px 0px #000000",
            }}
          >
            <span style={{ fontSize: 13, color: "#991b1b", fontWeight: 800 }}>CHANCE</span>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 32,
                fontWeight: 900,
                color: "#dc2626",
              }}
            >
              1:128
            </span>
            <span style={{ fontSize: 13, color: "#b91c1c", fontWeight: 800 }}>~0.7%</span>
          </div>
        </div>

        {/* VS LIGHTNING BADGE */}
        <div
          style={{
            transform: `scale(${vsSpring}) rotate(${wiggle}deg)`,
            opacity: vsSpring,
            alignSelf: "center",
            backgroundColor: "#fef08a",
            color: "#000000",
            border: "3px solid #000000",
            borderRadius: 999,
            padding: "8px 24px",
            boxShadow: "4px 4px 0px #000000",
            display: "flex",
            alignItems: "center",
            gap: 8,
            zIndex: 5,
            margin: "-8px 0",
          }}
        >
          <span style={{ fontSize: 20 }}>⚡</span>
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 18,
              fontWeight: 900,
              letterSpacing: 1.5,
            }}
          >
            42x HIGHER ALLOTMENT PROBABILITY!
          </span>
          <span style={{ fontSize: 20 }}>⚡</span>
        </div>

        {/* CARD 2: BOMBAY COATED */}
        <div
          style={{
            transform: `scale(${card2Spring}) translateX(${(1 - card2Spring) * 30}px)`,
            opacity: card2Spring,
            backgroundColor: "#f0fdf4",
            border: "3.5px solid #000000",
            borderRadius: 22,
            padding: "20px 24px",
            boxShadow: "6px 6px 0px #000000",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 20 }}>🎯</span>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 18,
                  fontWeight: 900,
                  color: "#065f46",
                  letterSpacing: 1,
                }}
              >
                BOMBAY COATED &amp; STEELS
              </span>
            </div>
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 28,
                fontWeight: 900,
                color: "#059669",
              }}
            >
              Retail: ~3.2x Subscribed
            </div>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 17,
                color: "#475569",
                fontWeight: 600,
              }}
            >
              Odds: <span style={{ color: "#059669", fontWeight: 800 }}>~33% (1 in 3 applicants!)</span>
            </div>
          </div>

          <div
            style={{
              backgroundColor: "#d1fae5",
              border: "3px solid #000000",
              borderRadius: 14,
              padding: "10px 16px",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              boxShadow: "3px 3px 0px #000000",
            }}
          >
            <span style={{ fontSize: 13, color: "#065f46", fontWeight: 800 }}>CHANCE</span>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 32,
                fontWeight: 900,
                color: "#059669",
              }}
            >
              1:3
            </span>
            <span style={{ fontSize: 13, color: "#047857", fontWeight: 800 }}>~33.3%</span>
          </div>
        </div>
      </div>

      {/* 4. BOTTOM NOTICE BADGE */}
      <div
        style={{
          transform: `scale(${bottomSpring})`,
          opacity: bottomSpring,
          display: "flex",
          alignItems: "center",
          gap: 10,
          backgroundColor: "#ffffff",
          border: "3px solid #000000",
          borderRadius: 14,
          padding: "10px 24px",
          boxShadow: "4px 4px 0px #000000",
          marginTop: 4,
        }}
      >
        <span style={{ fontSize: 20 }}>⏳</span>
        <span
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 18,
            fontWeight: 800,
            color: "#0f172a",
          }}
        >
          IPO CLOSING TOMORROW | APPLY YA AVOID?
        </span>
      </div>
    </div>
  );
};
