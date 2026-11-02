import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface GmpRealityCheckSceneProps {
  durationInFrames: number;
}

export const GmpRealityCheckScene: React.FC<GmpRealityCheckSceneProps> = () => {
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

  const comparisonEntrance = spring({
    frame: frame - 8,
    fps,
    config: { damping: 12, stiffness: 140 },
  });

  const stampEntrance = spring({
    frame: frame - 14,
    fps,
    config: { damping: 8, stiffness: 220 }, // Punchy stamp slam!
  });

  const bannerEntrance = spring({
    frame: frame - 20,
    fps,
    config: { damping: 12, stiffness: 150 },
  });

  const stampScale = interpolate(stampEntrance, [0, 1], [2.4, 1]);
  const stampAngle = interpolate(stampEntrance, [0, 1], [-25, -8]);
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
      {/* 1. SCENE HEADER BADGE */}
      <div
        style={{
          transform: `scale(${tagEntrance})`,
          opacity: tagEntrance,
          display: "flex",
          alignItems: "center",
          gap: 10,
          backgroundColor: "#ffedd5",
          border: "2.5px solid #ea580c",
          borderRadius: 999,
          padding: "8px 24px",
          boxShadow: "3px 3px 0px #ea580c",
        }}
      >
        <span style={{ fontSize: 18 }}>🔍</span>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 16,
            fontWeight: 900,
            color: "#c2410c",
            letterSpacing: "0.06em",
          }}
        >
          QUESTION #1 // GREY MARKET PREMIUM
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
          GMP KYA HAI?{" "}
          <span
            style={{
              backgroundColor: "#ef4444",
              color: "#ffffff",
              padding: "2px 16px",
              borderRadius: 8,
              border: "3px solid #000000",
              boxShadow: "4px 4px 0px #000000",
            }}
          >
            NOT GUARANTEED!
          </span>
        </span>
      </div>

      {/* 3. THE MYTH VS REALITY COMPARISON DOSSIER */}
      <div
        style={{
          width: "100%",
          maxWidth: 920,
          backgroundColor: "#ffffff",
          border: "3.5px solid #000000",
          borderRadius: 22,
          padding: "24px 22px",
          boxShadow: "6px 6px 0px #000000",
          display: "flex",
          flexDirection: "column",
          gap: 16,
          transform: `scale(${comparisonEntrance})`,
          opacity: comparisonEntrance,
          position: "relative",
          boxSizing: "border-box",
        }}
      >
        {/* Top Info Row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                backgroundColor: "#ea580c",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
                fontWeight: 900,
                border: "2px solid #000000",
              }}
            >
              ₹
            </div>
            <div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 24, fontWeight: 900 }}>
                GREY MARKET RATE
              </div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#dc2626",
                }}
              >
                Zero SEBI Regulation // Unofficial
              </div>
            </div>
          </div>

          <div
            style={{
              backgroundColor: "#fee2e2",
              color: "#dc2626",
              border: "2px solid #ef4444",
              borderRadius: 8,
              padding: "6px 12px",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 13,
              fontWeight: 800,
            }}
          >
            UNOFFICIAL ⚠️
          </div>
        </div>

        {/* The 2-Tier Reality Split */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          {/* Box 1: What People Think */}
          <div
            style={{
              backgroundColor: "#fef2f2",
              border: "2px dashed #f87171",
              borderRadius: 16,
              padding: "16px 14px",
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                fontWeight: 800,
                color: "#ef4444",
              }}
            >
              MYTH:
            </span>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 18,
                fontWeight: 800,
                color: "#991b1b",
              }}
            >
              "40% GMP = 40% Guaranteed Profit"
            </span>
            <span style={{ fontSize: 13, color: "#b91c1c", fontWeight: 600 }}>
              Bilkul galat! Ye sirf ek hawa/rumor hai.
            </span>
          </div>

          {/* Box 2: The Actual Reality */}
          <div
            style={{
              backgroundColor: "#f0fdf4",
              border: "2px solid #22c55e",
              borderRadius: 16,
              padding: "16px 14px",
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                fontWeight: 800,
                color: "#16a34a",
              }}
            >
              REALITY:
            </span>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 18,
                fontWeight: 800,
                color: "#166534",
              }}
            >
              "Sirf Demand Ka Rough Estimate"
            </span>
            <span style={{ fontSize: 13, color: "#15803d", fontWeight: 600 }}>
              Market mood badla toh GMP crash ho sakta hai!
            </span>
          </div>
        </div>

        {/* SLAMMED RED RUBBER STAMP */}
        <div
          style={{
            position: "absolute",
            top: 60,
            right: 40,
            transform: `scale(${stampScale}) rotate(${stampAngle}deg)`,
            opacity: stampEntrance,
            border: "4px solid #dc2626",
            borderRadius: 10,
            padding: "8px 20px",
            backgroundColor: "rgba(254, 226, 226, 0.95)",
            color: "#dc2626",
            fontFamily: "'Inter', sans-serif",
            fontSize: 26,
            fontWeight: 900,
            letterSpacing: "0.1em",
            boxShadow: "0 4px 12px rgba(220, 38, 38, 0.3)",
          }}
        >
          NO GUARANTEE
        </div>
      </div>

      {/* 4. WARNING STRIP */}
      <div
        style={{
          width: "100%",
          maxWidth: 920,
          backgroundColor: "#fef08a",
          border: "3.5px solid #000000",
          borderRadius: 18,
          padding: "14px 22px",
          boxShadow: "5px 5px 0px #000000",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transform: `scale(${bannerEntrance * pulse})`,
          opacity: bannerEntrance,
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 24 }}>💡</span>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 20,
              fontWeight: 900,
              color: "#0f172a",
            }}
          >
            PRO TIP: Listing se pehle company ke fundamentals dekho!
          </span>
        </div>
        <div
          style={{
            backgroundColor: "#000000",
            color: "#ffffff",
            borderRadius: 6,
            padding: "4px 10px",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            fontWeight: 900,
          }}
        >
          SEBI ALERT
        </div>
      </div>
    </div>
  );
};

