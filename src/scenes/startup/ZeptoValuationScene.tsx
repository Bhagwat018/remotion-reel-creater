import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface ZeptoValuationSceneProps {
  durationInFrames: number;
}

export const ZeptoValuationScene: React.FC<ZeptoValuationSceneProps> = () => {
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

  const battleEntrance = spring({
    frame: frame - 8,
    fps,
    config: { damping: 12, stiffness: 140 },
  });

  const gapEntrance = spring({
    frame: frame - 14,
    fps,
    config: { damping: 11, stiffness: 160 },
  });

  const verdictEntrance = spring({
    frame: frame - 20,
    fps,
    config: { damping: 12, stiffness: 140 },
  });

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
        gap: 18,
        zIndex: 10,
      }}
    >
      {/* 1. SCENE THEMATIC HEADER */}
      <div
        style={{
          transform: `scale(${tagEntrance})`,
          opacity: tagEntrance,
          display: "flex",
          alignItems: "center",
          gap: 10,
          backgroundColor: "#fce7f3",
          border: "2.5px solid #db2777",
          borderRadius: 999,
          padding: "8px 24px",
          boxShadow: "3px 3px 0px #db2777",
        }}
      >
        <span style={{ fontSize: 18 }}>🛍️</span>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 16,
            fontWeight: 900,
            color: "#9d174d",
            letterSpacing: "0.06em",
          }}
        >
          CASE STUDY // QUICK COMMERCE
        </span>
      </div>

      {/* 2. PROMINENT TOPIC HEADLINE */}
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
          ZEPTO:{" "}
          <span
            style={{
              backgroundColor: "#ff3269",
              color: "#ffffff",
              padding: "2px 14px",
              borderRadius: 8,
              border: "3px solid #000000",
              boxShadow: "4px 4px 0px #000000",
            }}
          >
            VALUATION CRASH
          </span>
        </span>
      </div>

      {/* 3. THE VALUATION TUG-OF-WAR BATTLE CARDS */}
      <div
        style={{
          width: "100%",
          maxWidth: 920,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
          transform: `scale(${battleEntrance})`,
          opacity: battleEntrance,
          position: "relative",
        }}
      >
        {/* CARD 1: FOUNDERS ASK */}
        <div
          style={{
            backgroundColor: "#f0fdf4",
            border: "3.5px solid #16a34a",
            borderRadius: 22,
            padding: "22px 18px",
            boxShadow: "6px 6px 0px #16a34a",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
            textAlign: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "#22c55e",
              color: "#ffffff",
              borderRadius: 8,
              padding: "4px 10px",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 13,
              fontWeight: 900,
            }}
          >
            FOUNDERS DEMAND 🚀
          </div>
          <div
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: 54,
              color: "#15803d",
              lineHeight: 1,
              letterSpacing: "0.02em",
            }}
          >
            $5.0B
          </div>
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              fontWeight: 700,
              color: "#166534",
            }}
          >
            Target value for public listing
          </div>
        </div>

        {/* CARD 2: INVESTOR BIDS */}
        <div
          style={{
            backgroundColor: "#fef2f2",
            border: "3.5px solid #ef4444",
            borderRadius: 22,
            padding: "22px 18px",
            boxShadow: "6px 6px 0px #ef4444",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
            textAlign: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "#ef4444",
              color: "#ffffff",
              borderRadius: 8,
              padding: "4px 10px",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 13,
              fontWeight: 900,
            }}
          >
            INVESTOR BIDS 📉
          </div>
          <div
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: 54,
              color: "#b91c1c",
              lineHeight: 1,
              letterSpacing: "0.02em",
            }}
          >
            ~$3.5B
          </div>
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              fontWeight: 700,
              color: "#991b1b",
            }}
          >
            Discounted down-round bids
          </div>
        </div>
      </div>

      {/* 4. THE VALUATION GAP BANNER */}
      <div
        style={{
          transform: `scale(${gapEntrance * pulse})`,
          opacity: gapEntrance,
          backgroundColor: "#fef08a",
          border: "3.5px solid #000000",
          borderRadius: 16,
          padding: "12px 28px",
          boxShadow: "5px 5px 0px #000000",
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <span style={{ fontSize: 24 }}>⚠️</span>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 22,
            fontWeight: 900,
            color: "#000000",
            letterSpacing: "0.02em",
          }}
        >
          -$1.5 BILLION VALUATION GAP!
        </span>
        <span style={{ fontSize: 24 }}>⚠️</span>
      </div>

      {/* 5. BOARD DECISION / 2027 FREEZE CARD */}
      <div
        style={{
          width: "100%",
          maxWidth: 920,
          backgroundColor: "#0f172a",
          color: "#ffffff",
          border: "3.5px solid #000000",
          borderRadius: 22,
          padding: "22px 26px",
          boxShadow: "6px 6px 0px #000000",
          display: "flex",
          flexDirection: "column",
          gap: 12,
          transform: `scale(${verdictEntrance})`,
          opacity: verdictEntrance,
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 24 }}>❄️</span>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 16,
                fontWeight: 800,
                color: "#38bdf8",
                letterSpacing: "0.06em",
              }}
            >
              BOARD VERDICT // OCT 2024
            </span>
          </div>
          <div
            style={{
              backgroundColor: "#ef4444",
              color: "#ffffff",
              padding: "4px 10px",
              borderRadius: 6,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 13,
              fontWeight: 900,
            }}
          >
            FROZEN
          </div>
        </div>

        <div
          style={{
            fontFamily: "'Anton', sans-serif",
            fontSize: 36,
            color: "#f8fafc",
            letterSpacing: "0.02em",
            lineHeight: 1.1,
          }}
        >
          IPO PLANS ON HOLD UNTIL 2027
        </div>

        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 18,
            color: "#94a3b8",
            fontWeight: 600,
          }}
        >
          Founders refused to sell shares at a discount. Operations will expand before public listing!
        </div>
      </div>
    </div>
  );
};
