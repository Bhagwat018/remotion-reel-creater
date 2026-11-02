import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import {
  ShadcnBadge,
  ShadcnCard,
  AnimatedMetricMeter,
} from "../../components/animated";

export interface BombayCtaSceneProps {
  durationInFrames: number;
}

export const BombayCtaScene: React.FC<BombayCtaSceneProps> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerSpring = spring({
    frame: frame - 1,
    fps,
    config: { damping: 12, stiffness: 140 },
  });

  const hubSpring = spring({
    frame: frame - 7,
    fps,
    config: { damping: 12, stiffness: 130 },
  });

  const matrixSpring = spring({
    frame: frame - 11,
    fps,
    config: { damping: 12, stiffness: 140 },
  });

  const tickerSpring = spring({
    frame: frame - 15,
    fps,
    config: { damping: 12, stiffness: 130 },
  });

  const pulse = Math.sin(frame / 4) * 0.05 + 1;
  const bellRing = Math.sin(frame / 3) * 12;

  return (
    <div
      style={{
        position: "absolute",
        top: 130,
        left: 56,
        width: 968,
        height: 1385,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxSizing: "border-box",
        zIndex: 10,
      }}
    >
      {/* 1. TOP HEADER & BADGES */}
      <div
        style={{
          transform: `scale(${headerSpring})`,
          opacity: headerSpring,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          textAlign: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <ShadcnBadge label="DAILY TECH & IPO UPDATES" icon="⚡" variant="cyan" />
          <ShadcnBadge label="JOIN 100K+ COMMUNITY" icon="👥" variant="emerald" />
        </div>

        <div
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 54,
            fontWeight: 900,
            lineHeight: 1.1,
            color: "#0f172a",
            letterSpacing: -1,
          }}
        >
          FOLLOW @techwith.GenZ
        </div>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 17,
            color: "#0369a1",
            fontWeight: 800,
            letterSpacing: 2,
          }}
        >
          GEN-Z TECH, STARTUPS &amp; MARKET INTEL
        </div>
      </div>

      {/* 2. ENGAGEMENT CARD */}
      <ShadcnCard
        delayFrames={3}
        beamColorFrom="#06b6d4"
        beamColorTo="#a855f7"
        style={{
          padding: "24px 28px",
          gap: 18,
          backgroundColor: "#ffffff",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              backgroundColor: "#fef08a",
              border: "3px solid #000000",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              transform: `rotate(${bellRing}deg)`,
            }}
          >
            🔔
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 2 }}>
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 26,
                fontWeight: 900,
                color: "#0f172a",
              }}
            >
              Don't Miss The Next Big Breakdown
            </span>
            <span style={{ fontSize: 14, color: "#64748b", fontWeight: 700 }}>
              Crisp 30-second insights, zero fluff.
            </span>
          </div>
        </div>

        {/* Pulsing Follow Button */}
        <div
          style={{
            transform: `scale(${pulse})`,
            backgroundColor: "#0284c7",
            color: "#ffffff",
            border: "3.5px solid #000000",
            borderRadius: 20,
            padding: "16px 40px",
            boxShadow: "5px 5px 0px #000000",
            display: "flex",
            alignItems: "center",
            gap: 12,
            cursor: "pointer",
          }}
        >
          <span style={{ fontSize: 24 }}>✨</span>
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 26,
              fontWeight: 900,
              letterSpacing: 1,
            }}
          >
            FOLLOW @techwith.GenZ
          </span>
        </div>
      </ShadcnCard>

      {/* 3. MIDDLE SECTION: CHANNEL STATS & TOPICS */}
      <div
        style={{
          transform: `scale(${hubSpring})`,
          opacity: hubSpring,
          backgroundColor: "#ffffff",
          border: "3px solid #000000",
          borderRadius: 22,
          padding: "20px 24px",
          boxShadow: "5px 5px 0px #000000",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 20 }}>📺</span>
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 20,
                fontWeight: 900,
                color: "#0f172a",
              }}
            >
              What You Get Daily
            </span>
          </div>
          <span
            style={{
              backgroundColor: "#d1fae5",
              color: "#059669",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 13,
              fontWeight: 900,
              padding: "4px 10px",
              borderRadius: 6,
              border: "1.5px solid #059669",
            }}
          >
            100% FREE
          </span>
        </div>

        <AnimatedMetricMeter
          label="IPO & Market Breakdowns"
          value="Daily"
          percentage={95}
          color="#0284c7"
          gradient={["#38bdf8", "#0284c7"]}
          sublabel="Real DRHP Data"
          delayFrames={6}
          height={14}
        />

        <AnimatedMetricMeter
          label="Tech & Startup Secrets"
          value="Weekly"
          percentage={80}
          color="#10b981"
          gradient={["#34d399", "#10b981"]}
          sublabel="Behind the scenes"
          delayFrames={9}
          height={12}
        />
      </div>

      {/* 4. LOWER SECTION: 2-COLUMN COMMUNITY DISCUSSION MATRIX */}
      <div
        style={{
          transform: `scale(${matrixSpring})`,
          opacity: matrixSpring,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
          width: "100%",
        }}
      >
        {/* CARD 1: QUESTION */}
        <div
          style={{
            backgroundColor: "#fef08a",
            border: "3px solid #000000",
            borderRadius: 20,
            padding: "20px 22px",
            boxShadow: "5px 5px 0px #000000",
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 24 }}>💬</span>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 14,
                fontWeight: 900,
                color: "#000000",
                letterSpacing: 0.5,
              }}
            >
              COMMUNITY POLL
            </span>
          </div>

          <div
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 22,
              fontWeight: 900,
              lineHeight: 1.2,
              color: "#0f172a",
            }}
          >
            Apply Ya Avoid?
          </div>

          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              fontWeight: 700,
              lineHeight: 1.45,
              color: "#334155",
              margin: 0,
            }}
          >
            Aap is IPO me apply kar rahe ho ya avoid? Apna opinion comments me
            zaroor share karo!
          </p>
        </div>

        {/* CARD 2: VALUE PROMISE */}
        <div
          style={{
            backgroundColor: "#ffffff",
            border: "3px solid #000000",
            borderRadius: 20,
            padding: "20px 22px",
            boxShadow: "5px 5px 0px #000000",
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 24 }}>🚀</span>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 14,
                fontWeight: 900,
                color: "#059669",
                letterSpacing: 0.5,
              }}
            >
              DAILY INTEL
            </span>
          </div>

          <div
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 22,
              fontWeight: 900,
              lineHeight: 1.2,
              color: "#0f172a",
            }}
          >
            Daily Tech &amp; IPO Stories
          </div>

          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              fontWeight: 700,
              lineHeight: 1.45,
              color: "#475569",
              margin: 0,
            }}
          >
            Rozana fresh startup breakdowns, tech insights aur market analysis ke
            liye abhi follow karein.
          </p>
        </div>
      </div>

      {/* 5. BOTTOM TICKER (GROUNDED AT Y ≈ 1490-1515px) */}
      <div
        style={{
          transform: `scale(${tickerSpring})`,
          opacity: tickerSpring,
          backgroundColor: "#0f172a",
          color: "#ffffff",
          borderRadius: 16,
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          border: "2px solid #06b6d4",
          boxShadow: "0 0 16px rgba(6, 182, 212, 0.25)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 16 }}>🚀</span>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 13,
              fontWeight: 800,
              color: "#e2e8f0",
            }}
          >
            Community: <b style={{ color: "#38bdf8" }}>@techwith.GenZ</b>
          </span>
        </div>
        <div style={{ width: 1, height: 16, backgroundColor: "#334155" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 16 }}>❤️</span>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 13,
              fontWeight: 800,
              color: "#e2e8f0",
            }}
          >
            Share With Friends &amp; Family
          </span>
        </div>
      </div>
    </div>
  );
};
