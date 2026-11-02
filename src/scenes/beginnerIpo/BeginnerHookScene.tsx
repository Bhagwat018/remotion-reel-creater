import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface BeginnerHookSceneProps {
  durationInFrames: number;
}

export const BeginnerHookScene: React.FC<BeginnerHookSceneProps> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const tagEntrance = spring({
    frame: frame - 1,
    fps,
    config: { damping: 13, stiffness: 140 },
  });

  const headlineEntrance = spring({
    frame: frame - 3,
    fps,
    config: { damping: 11, stiffness: 160 },
  });

  const subEntrance = spring({
    frame: frame - 6,
    fps,
    config: { damping: 12, stiffness: 140 },
  });

  const gridEntrance = spring({
    frame: frame - 9,
    fps,
    config: { damping: 12, stiffness: 140 },
  });

  const pulse = Math.sin(frame / 5) * 0.04 + 1;
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
          transform: `scale(${tagEntrance * pulse})`,
          opacity: tagEntrance,
          display: "flex",
          alignItems: "center",
          gap: 12,
          backgroundColor: "#ff0055",
          color: "#ffffff",
          border: "3px solid #000000",
          borderRadius: 999,
          padding: "10px 28px",
          boxShadow: "4px 4px 0px #000000",
        }}
      >
        <span style={{ fontSize: 22 }}>🛑</span>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 18,
            fontWeight: 900,
            letterSpacing: "0.08em",
          }}
        >
          STOP SCROLLING // IPO BEGINNER GUIDE
        </span>
      </div>

      {/* 2. EXPLOSIVE HOOK HEADLINE */}
      <div
        style={{
          transform: `scale(${headlineEntrance})`,
          opacity: headlineEntrance,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: 6,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: 78,
              fontWeight: 900,
              color: "#0f172a",
              letterSpacing: "0.02em",
              textTransform: "uppercase",
              lineHeight: 1,
            }}
          >
            IPO KE{" "}
            <span
              style={{
                backgroundColor: "#fef08a",
                color: "#000000",
                padding: "2px 20px",
                borderRadius: 14,
                border: "3.5px solid #000000",
                boxShadow: "5px 5px 0px #000000",
                display: "inline-block",
                transform: `rotate(${wiggle}deg)`,
              }}
            >
              4 SAWAAL
            </span>
          </span>
        </div>
      </div>

      {/* 3. VALUE PROPOSITION PILL */}
      <div
        style={{
          transform: `scale(${subEntrance})`,
          opacity: subEntrance,
          backgroundColor: "#ffffff",
          border: "3px solid #000000",
          borderRadius: 14,
          padding: "8px 24px",
          boxShadow: "4px 4px 0px #000000",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <span style={{ color: "#e11d48", fontSize: 20 }}>🔥</span>
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 20,
            fontWeight: 800,
            color: "#1e293b",
          }}
        >
          Har Beginner Ka Confusion — 30 Sec Me Clear!
        </span>
      </div>

      {/* 4. THE 4 MYSTERY QUESTION LOCKERS (Grid of 4) */}
      <div
        style={{
          width: "100%",
          maxWidth: 920,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
          transform: `scale(${gridEntrance})`,
          opacity: gridEntrance,
          marginTop: 6,
        }}
      >
        {/* Q1 */}
        <div
          style={{
            backgroundColor: "#fff7ed",
            border: "3.5px solid #ea580c",
            borderRadius: 20,
            padding: "18px 16px",
            boxShadow: "5px 5px 0px #ea580c",
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span
              style={{
                backgroundColor: "#ea580c",
                color: "#ffffff",
                padding: "3px 10px",
                borderRadius: 8,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 13,
                fontWeight: 900,
              }}
            >
              Q1
            </span>
            <span style={{ fontSize: 20 }}>📊</span>
          </div>
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 22,
              fontWeight: 900,
              color: "#9a3412",
              lineHeight: 1.2,
            }}
          >
            GMP = Guarantee?
          </div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              color: "#c2410c",
              fontWeight: 700,
            }}
          >
            Grey market reality check
          </div>
        </div>

        {/* Q2 */}
        <div
          style={{
            backgroundColor: "#f0fdf4",
            border: "3.5px solid #16a34a",
            borderRadius: 20,
            padding: "18px 16px",
            boxShadow: "5px 5px 0px #16a34a",
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span
              style={{
                backgroundColor: "#16a34a",
                color: "#ffffff",
                padding: "3px 10px",
                borderRadius: 8,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 13,
                fontWeight: 900,
              }}
            >
              Q2
            </span>
            <span style={{ fontSize: 20 }}>💰</span>
          </div>
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 22,
              fontWeight: 900,
              color: "#166534",
              lineHeight: 1.2,
            }}
          >
            Allotment Nahi Mila?
          </div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              color: "#15803d",
              fontWeight: 700,
            }}
          >
            Paisa kata ya block?
          </div>
        </div>

        {/* Q3 */}
        <div
          style={{
            backgroundColor: "#eff6ff",
            border: "3.5px solid #2563eb",
            borderRadius: 20,
            padding: "18px 16px",
            boxShadow: "5px 5px 0px #2563eb",
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span
              style={{
                backgroundColor: "#2563eb",
                color: "#ffffff",
                padding: "3px 10px",
                borderRadius: 8,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 13,
                fontWeight: 900,
              }}
            >
              Q3
            </span>
            <span style={{ fontSize: 20 }}>📈</span>
          </div>
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 22,
              fontWeight: 900,
              color: "#1e40af",
              lineHeight: 1.2,
            }}
          >
            Sell Ya Hold?
          </div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              color: "#1d4ed8",
              fontWeight: 700,
            }}
          >
            Listing day gameplan
          </div>
        </div>

        {/* Q4 */}
        <div
          style={{
            backgroundColor: "#faf5ff",
            border: "3.5px solid #9333ea",
            borderRadius: 20,
            padding: "18px 16px",
            boxShadow: "5px 5px 0px #9333ea",
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span
              style={{
                backgroundColor: "#9333ea",
                color: "#ffffff",
                padding: "3px 10px",
                borderRadius: 8,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 13,
                fontWeight: 900,
              }}
            >
              Q4
            </span>
            <span style={{ fontSize: 20 }}>⚠️</span>
          </div>
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 22,
              fontWeight: 900,
              color: "#6b21a8",
              lineHeight: 1.2,
            }}
          >
            SME Ya Mainboard?
          </div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              color: "#7e22ce",
              fontWeight: 700,
            }}
          >
            ₹2L+ capital risk
          </div>
        </div>
      </div>
    </div>
  );
};

