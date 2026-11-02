import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface SellOrHoldSceneProps {
  durationInFrames: number;
}

export const SellOrHoldScene: React.FC<SellOrHoldSceneProps> = () => {
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

  const pathsEntrance = spring({
    frame: frame - 8,
    fps,
    config: { damping: 12, stiffness: 140 },
  });

  const ruleBannerEntrance = spring({
    frame: frame - 16,
    fps,
    config: { damping: 12, stiffness: 150 },
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
        paddingTop: 190,
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
      {/* 1. SCENE HEADER */}
      <div
        style={{
          transform: `scale(${tagEntrance})`,
          opacity: tagEntrance,
          display: "flex",
          alignItems: "center",
          gap: 10,
          backgroundColor: "#dbeafe",
          border: "2.5px solid #2563eb",
          borderRadius: 999,
          padding: "8px 24px",
          boxShadow: "3px 3px 0px #2563eb",
        }}
      >
        <span style={{ fontSize: 18 }}>📈</span>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 16,
            fontWeight: 900,
            color: "#1d4ed8",
            letterSpacing: "0.06em",
          }}
        >
          QUESTION #3 // LISTING DAY GAMEPLAN
        </span>
      </div>

      {/* 2. DYNAMIC HEADLINE */}
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
          LISTING DAY:{" "}
          <span
            style={{
              backgroundColor: "#f59e0b",
              color: "#ffffff",
              padding: "2px 16px",
              borderRadius: 8,
              border: "3px solid #000000",
              boxShadow: "4px 4px 0px #000000",
            }}
          >
            SELL YA HOLD?
          </span>
        </span>
      </div>

      {/* 3. TWO DIVERGENT STRATEGY PATHS */}
      <div
        style={{
          width: "100%",
          maxWidth: 920,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
          transform: `scale(${pathsEntrance})`,
          opacity: pathsEntrance,
        }}
      >
        {/* PATH A: SHORT TERM */}
        <div
          style={{
            backgroundColor: "#fffbeb",
            border: "3.5px solid #d97706",
            borderRadius: 22,
            padding: "20px 18px",
            boxShadow: "5px 5px 0px #d97706",
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span
              style={{
                backgroundColor: "#f59e0b",
                color: "#000000",
                padding: "3px 10px",
                borderRadius: 6,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                fontWeight: 900,
              }}
            >
              GOAL 1
            </span>
            <span style={{ fontSize: 24 }}>⚡</span>
          </div>

          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 22,
              fontWeight: 900,
              color: "#92400e",
              lineHeight: 1.1,
            }}
          >
            LISTING GAIN HUNTER
          </div>

          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 15,
              fontWeight: 700,
              color: "#78350f",
              lineHeight: 1.3,
            }}
          >
            Aapka goal sirf quick 30–50% profit book karna tha? Toh listing day pe exit karo!
          </div>

          <div
            style={{
              marginTop: "auto",
              backgroundColor: "#fef3c7",
              border: "1.5px solid #f59e0b",
              borderRadius: 8,
              padding: "6px 10px",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              fontWeight: 800,
              color: "#b45309",
              textAlign: "center",
            }}
          >
            ACTION: BOOK & EXIT 💰
          </div>
        </div>

        {/* PATH B: LONG TERM */}
        <div
          style={{
            backgroundColor: "#f0fdf4",
            border: "3.5px solid #16a34a",
            borderRadius: 22,
            padding: "20px 18px",
            boxShadow: "5px 5px 0px #16a34a",
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span
              style={{
                backgroundColor: "#22c55e",
                color: "#ffffff",
                padding: "3px 10px",
                borderRadius: 6,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                fontWeight: 900,
              }}
            >
              GOAL 2
            </span>
            <span style={{ fontSize: 24 }}>💎</span>
          </div>

          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 22,
              fontWeight: 900,
              color: "#166534",
              lineHeight: 1.1,
            }}
          >
            LONG-TERM INVESTOR
          </div>

          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 15,
              fontWeight: 700,
              color: "#14532d",
              lineHeight: 1.3,
            }}
          >
            Company ka business solid hai aur strong growth track hai? Toh hold karo compound wealth ke liye!
          </div>

          <div
            style={{
              marginTop: "auto",
              backgroundColor: "#dcfce7",
              border: "1.5px solid #22c55e",
              borderRadius: 8,
              padding: "6px 10px",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              fontWeight: 800,
              color: "#15803d",
              textAlign: "center",
            }}
          >
            ACTION: HOLD FOR YEARS 🚀
          </div>
        </div>
      </div>

      {/* 4. THE GOLDEN RULE BANNER */}
      <div
        style={{
          width: "100%",
          maxWidth: 920,
          backgroundColor: "#0f172a",
          color: "#ffffff",
          border: "3.5px solid #000000",
          borderRadius: 20,
          padding: "16px 24px",
          boxShadow: "6px 6px 0px #000000",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transform: `scale(${ruleBannerEntrance * pulse})`,
          opacity: ruleBannerEntrance,
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 26 }}>🎯</span>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontFamily: "'Anton', sans-serif",
                fontSize: 26,
                color: "#fef08a",
                letterSpacing: "0.02em",
              }}
            >
              GOAL PEHLE, HYPE YA GMP BAAD ME!
            </span>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 15,
                fontWeight: 600,
                color: "#94a3b8",
              }}
            >
              Social media hype dekh kar apna plan mat badlo.
            </span>
          </div>
        </div>
        <div
          style={{
            backgroundColor: "#38bdf8",
            color: "#000000",
            padding: "4px 10px",
            borderRadius: 6,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            fontWeight: 900,
          }}
        >
          GOLDEN RULE
        </div>
      </div>
    </div>
  );
};

