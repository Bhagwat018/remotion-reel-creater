import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface BombayGmpSceneProps {
  durationInFrames: number;
}

export const BombayGmpScene: React.FC<BombayGmpSceneProps> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerSpring = spring({
    frame: frame - 1,
    fps,
    config: { damping: 12, stiffness: 140 },
  });

  const cardSpring = spring({
    frame: frame - 4,
    fps,
    config: { damping: 12, stiffness: 130 },
  });

  const stampSpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 8, stiffness: 200 },
  });

  const warningsSpring = spring({
    frame: frame - 16,
    fps,
    config: { damping: 12, stiffness: 130 },
  });

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
      {/* 1. BADGE */}
      <div
        style={{
          transform: `scale(${headerSpring})`,
          opacity: headerSpring,
          display: "flex",
          alignItems: "center",
          gap: 12,
          backgroundColor: "#fef3c7",
          color: "#b45309",
          border: "3.5px solid #000000",
          borderRadius: 999,
          padding: "10px 28px",
          boxShadow: "5px 5px 0px #000000",
        }}
      >
        <span style={{ fontSize: 22 }}>🎯</span>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 20,
            fontWeight: 900,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          GREY MARKET PREDICTION
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
          <span>GMP LAGBHAG</span>
          <span
            style={{
              backgroundColor: "#fef3c7",
              color: "#b45309",
              padding: "4px 18px",
              borderRadius: 12,
              border: "3.5px solid #000000",
              boxShadow: "4px 4px 0px #000000",
            }}
          >
            ~11%
          </span>
        </div>
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 22,
            color: "#dc2626",
            fontWeight: 900,
            letterSpacing: 1,
          }}
        >
          ⚠️ PAR WO SIRF EK RUMOR HAI!
        </div>
      </div>

      {/* 3. CARD CONTAINER */}
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
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* TOP STAT BAR */}
        <div
          style={{
            backgroundColor: "#fffbeb",
            borderRadius: 18,
            padding: "18px 22px",
            border: "2.5px solid #f59e0b",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 16,
                color: "#78350f",
                fontWeight: 800,
              }}
            >
              CURRENT GREY PREMIUM
            </span>
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 42,
                fontWeight: 900,
                color: "#b45309",
              }}
            >
              +₹8 - ₹10
            </span>
          </div>

          <div
            style={{
              backgroundColor: "#fef3c7",
              border: "2px solid #000000",
              borderRadius: 14,
              padding: "10px 18px",
              textAlign: "center",
              boxShadow: "2px 2px 0px #000000",
            }}
          >
            <span style={{ fontSize: 13, color: "#92400e", fontWeight: 800 }}>
              EST. GAIN
            </span>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 30,
                fontWeight: 900,
                color: "#b45309",
              }}
            >
              ~11%
            </div>
          </div>
        </div>

        {/* STAMP OVERLAY */}
        <div
          style={{
            transform: `scale(${stampSpring}) rotate(-6deg)`,
            opacity: stampSpring,
            alignSelf: "center",
            backgroundColor: "#dc2626",
            color: "#ffffff",
            border: "3.5px solid #000000",
            borderRadius: 14,
            padding: "10px 26px",
            boxShadow: "5px 5px 0px #000000",
            display: "flex",
            alignItems: "center",
            gap: 10,
            zIndex: 10,
          }}
        >
          <span style={{ fontSize: 24 }}>🚨</span>
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 24,
              fontWeight: 900,
              letterSpacing: 2,
            }}
          >
            UNOFFICIAL RUMOR ONLY
          </span>
        </div>

        {/* 3 REALITY CHECK BULLETS */}
        <div
          style={{
            transform: `scale(${warningsSpring})`,
            opacity: warningsSpring,
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          {[
            {
              icon: "❌",
              title: "SEBI Registered Nahi Hota",
              desc: "Grey market transactions completely unofficial hote hain.",
            },
            {
              icon: "📉",
              title: "Listing Day Reversal Risk",
              desc: "Listing se pehle market girte hi GMP zero ho sakta hai.",
            },
            {
              icon: "💡",
              title: "GMP Dekh Ke Apply Mat Karo",
              desc: "Company ke fundamentals aur financial health check karo!",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 12,
                backgroundColor: "#f8fafc",
                padding: "12px 16px",
                borderRadius: 12,
                border: "1.5px solid #e2e8f0",
              }}
            >
              <span style={{ fontSize: 20 }}>{item.icon}</span>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <span
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 18,
                    fontWeight: 800,
                    color: "#dc2626",
                  }}
                >
                  {item.title}
                </span>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 15,
                    color: "#475569",
                    fontWeight: 600,
                  }}
                >
                  {item.desc}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
