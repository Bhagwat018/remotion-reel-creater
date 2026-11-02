import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface BeginnerCtaSceneProps {
  durationInFrames: number;
  handle?: string;
}

export const BeginnerCtaScene: React.FC<BeginnerCtaSceneProps> = ({
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

  const summaryEntrance = spring({
    frame: frame - 8,
    fps,
    config: { damping: 12, stiffness: 140 },
  });

  const ctaEntrance = spring({
    frame: frame - 14,
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
        gap: 16,
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
          backgroundColor: "#fef08a",
          border: "2.5px solid #000000",
          borderRadius: 999,
          padding: "8px 24px",
          boxShadow: "3px 3px 0px #000000",
        }}
      >
        <span style={{ fontSize: 18 }}>📌</span>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 16,
            fontWeight: 900,
            color: "#000000",
            letterSpacing: "0.06em",
          }}
        >
          QUICK RECAP // SAVE KAR LO
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
          FOLLOW{" "}
          <span
            style={{
              backgroundColor: "#38bdf8",
              color: "#000000",
              padding: "2px 16px",
              borderRadius: 8,
              border: "3px solid #000000",
              boxShadow: "4px 4px 0px #000000",
            }}
          >
            {handle}
          </span>
        </span>
      </div>

      {/* 3. 4-POINT VALUE SUMMARY CARDS (2x2 Grid) */}
      <div
        style={{
          width: "100%",
          maxWidth: 920,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 12,
          transform: `scale(${summaryEntrance})`,
          opacity: summaryEntrance,
        }}
      >
        <div
          style={{
            backgroundColor: "#fff7ed",
            border: "2.5px solid #ea580c",
            borderRadius: 16,
            padding: "14px 14px",
            boxShadow: "3px 3px 0px #ea580c",
            display: "flex",
            alignItems: "flex-start",
            gap: 10,
          }}
        >
          <span style={{ fontSize: 20 }}>1️⃣</span>
          <div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 900, color: "#9a3412" }}>
              GMP ≠ Guarantee
            </div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, color: "#c2410c" }}>
              Unofficial market rumor
            </div>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#f0fdf4",
            border: "2.5px solid #16a34a",
            borderRadius: 16,
            padding: "14px 14px",
            boxShadow: "3px 3px 0px #16a34a",
            display: "flex",
            alignItems: "flex-start",
            gap: 10,
          }}
        >
          <span style={{ fontSize: 20 }}>2️⃣</span>
          <div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 900, color: "#166534" }}>
              Paisa Safe Hai
            </div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, color: "#15803d" }}>
              Sirf block tha, auto unblock
            </div>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#eff6ff",
            border: "2.5px solid #2563eb",
            borderRadius: 16,
            padding: "14px 14px",
            boxShadow: "3px 3px 0px #2563eb",
            display: "flex",
            alignItems: "flex-start",
            gap: 10,
          }}
        >
          <span style={{ fontSize: 20 }}>3️⃣</span>
          <div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 900, color: "#1e40af" }}>
              Goal &gt; Market Hype
            </div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, color: "#1d4ed8" }}>
              Listing gain ya long term
            </div>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#faf5ff",
            border: "2.5px solid #9333ea",
            borderRadius: 16,
            padding: "14px 14px",
            boxShadow: "3px 3px 0px #9333ea",
            display: "flex",
            alignItems: "flex-start",
            gap: 10,
          }}
        >
          <span style={{ fontSize: 20 }}>4️⃣</span>
          <div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 900, color: "#6b21a8" }}>
              SME = ₹2L+ High Risk
            </div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, color: "#7e22ce" }}>
              Beginners stay away
            </div>
          </div>
        </div>
      </div>

      {/* 4. BIG ACTION BUTTON */}
      <div
        style={{
          width: "100%",
          maxWidth: 920,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
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
          <span style={{ fontSize: 28 }}>👉</span>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 26,
              fontWeight: 900,
              color: "#ffffff",
              letterSpacing: "-0.01em",
            }}
          >
            FOLLOW {handle}
          </span>
        </div>

        <div
          style={{
            backgroundColor: "#fef2f2",
            border: "2px solid #ef4444",
            borderRadius: 8,
            padding: "6px 14px",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            fontWeight: 800,
            color: "#dc2626",
            textAlign: "center",
          }}
        >
          ⚠️ Educational information only. Not investment advice.
        </div>
      </div>
    </div>
  );
};

