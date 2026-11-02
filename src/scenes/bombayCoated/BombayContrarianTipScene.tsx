import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import {
  ShadcnBadge,
  ShadcnCard,
  AnimatedMetricMeter,
} from "../../components/animated";

export interface BombayContrarianTipSceneProps {
  durationInFrames: number;
}

export const BombayContrarianTipScene: React.FC<BombayContrarianTipSceneProps> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerSpring = spring({
    frame: frame - 1,
    fps,
    config: { damping: 12, stiffness: 140 },
  });

  const matrixMeterSpring = spring({
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
          <ShadcnBadge label="PRO INVESTOR RULE" icon="💡" variant="amber" />
          <ShadcnBadge label="CONTRARIAN THINKING" icon="🧠" variant="violet" />
        </div>

        <div
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 50,
            fontWeight: 900,
            lineHeight: 1.1,
            color: "#0f172a",
            letterSpacing: -1,
          }}
        >
          ALLOTMENT AASAN ≠ ACCHA IPO
        </div>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 17,
            color: "#6b21a8",
            fontWeight: 800,
            letterSpacing: 2,
          }}
        >
          WHY LOW DEMAND MATTERS
        </div>
      </div>

      {/* 2. CONTRARIAN LESSON CARDS */}
      <ShadcnCard
        delayFrames={3}
        beamColorFrom="#a855f7"
        beamColorTo="#3b82f6"
        style={{
          padding: "22px 26px",
          gap: 14,
          backgroundColor: "#ffffff",
        }}
      >
        {/* RULE 1 */}
        <div
          style={{
            backgroundColor: "#f8fafc",
            border: "2px solid #cbd5e1",
            borderRadius: 16,
            padding: "16px 20px",
            display: "flex",
            flexDirection: "column",
            gap: 6,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 13,
                fontWeight: 900,
                color: "#6b21a8",
                backgroundColor: "#f3e8ff",
                padding: "3px 10px",
                borderRadius: 6,
              }}
            >
              RULE #1
            </span>
            <span style={{ fontSize: 13, color: "#64748b", fontWeight: 800 }}>
              INSTITUTIONAL CAUTION
            </span>
          </div>
          <div
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 22,
              fontWeight: 900,
              color: "#0f172a",
            }}
          >
            Smart Money Cautious Kyu Hai?
          </div>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              color: "#475569",
              lineHeight: 1.45,
              margin: 0,
              fontWeight: 600,
            }}
          >
            Agar big institutions aur HNIs ne heavy bidding nahi ki, toh listing day pe
            buying support weak ho sakta hai.
          </p>
        </div>

        {/* RULE 2 */}
        <div
          style={{
            backgroundColor: "#f0fdf4",
            border: "2px solid #86efac",
            borderRadius: 16,
            padding: "16px 20px",
            display: "flex",
            flexDirection: "column",
            gap: 6,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 13,
                fontWeight: 900,
                color: "#15803d",
                backgroundColor: "#dcfce7",
                padding: "3px 10px",
                borderRadius: 6,
              }}
            >
              RULE #2
            </span>
            <span style={{ fontSize: 13, color: "#166534", fontWeight: 800 }}>
              CAPITAL PROTECTION
            </span>
          </div>
          <div
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 22,
              fontWeight: 900,
              color: "#0f172a",
            }}
          >
            Demand Kam Hone Ki Wajah Samjho
          </div>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              color: "#166534",
              lineHeight: 1.45,
              margin: 0,
              fontWeight: 600,
            }}
          >
            Sirf allotment milne ke chakkar me capital trap mat karo. Business aur valuation
            first priority hona chahiye.
          </p>
        </div>
      </ShadcnCard>

      {/* 3. MIDDLE SECTION: CONTRARIAN TRADEOFF MATRIX */}
      <div
        style={{
          transform: `scale(${matrixMeterSpring})`,
          opacity: matrixMeterSpring,
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
            <span style={{ fontSize: 20 }}>⚖️</span>
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 20,
                fontWeight: 900,
                color: "#0f172a",
              }}
            >
              The Allotment Paradox
            </span>
          </div>
          <span
            style={{
              backgroundColor: "#f3e8ff",
              color: "#6b21a8",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 13,
              fontWeight: 900,
              padding: "4px 10px",
              borderRadius: 6,
              border: "1.5px solid #6b21a8",
            }}
          >
            TRADEOFF
          </span>
        </div>

        <AnimatedMetricMeter
          label="Allotment Probability"
          value="Very High"
          percentage={85}
          color="#059669"
          gradient={["#10b981", "#059669"]}
          sublabel="1 in 3 chance"
          delayFrames={6}
          height={14}
        />

        <AnimatedMetricMeter
          label="Listing Pop Potential"
          value="Modest (~10%)"
          percentage={25}
          color="#6b21a8"
          gradient={["#c084fc", "#6b21a8"]}
          sublabel="Limited institutional frenzy"
          delayFrames={9}
          height={12}
        />
      </div>

      {/* 4. LOWER SECTION: 2-COLUMN CONTRARIAN FRAMEWORK */}
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
        {/* CARD 1: CONTRARIAN LESSON */}
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
            <span style={{ fontSize: 24 }}>🧠</span>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 14,
                fontWeight: 900,
                color: "#000000",
                letterSpacing: 0.5,
              }}
            >
              CONTRARIAN LESSON
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
            Easy ≠ Profitable
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
            Jis IPO me allotment aasan hoti hai, aksar wahan listing day gain kam ya
            negative ho sakta hai. Demand verify zaroor karein!
          </p>
        </div>

        {/* CARD 2: RISK CHECKLIST */}
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
            <span style={{ fontSize: 24 }}>⚖️</span>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 14,
                fontWeight: 900,
                color: "#0284c7",
                letterSpacing: 0.5,
              }}
            >
              CHECKLIST
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
            Educational Content Only
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
            Ye koi investment advice nahi hai. Apply karne se pehle apna risk appetite
            aur financial advisor se consult karein.
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
          border: "2px solid #a855f7",
          boxShadow: "0 0 16px rgba(168, 85, 247, 0.25)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 16 }}>🎯</span>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 13,
              fontWeight: 800,
              color: "#e2e8f0",
            }}
          >
            Golden Rule: <b style={{ color: "#c084fc" }}>Easy Allotment ≠ High Profit</b>
          </span>
        </div>
        <div style={{ width: 1, height: 16, backgroundColor: "#334155" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 16 }}>🛡️</span>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 13,
              fontWeight: 800,
              color: "#e2e8f0",
            }}
          >
            Risk: <b style={{ color: "#facc15" }}>DYOR Before Bidding</b>
          </span>
        </div>
      </div>
    </div>
  );
};
