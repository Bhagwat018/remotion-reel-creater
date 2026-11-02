import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import {
  ShadcnBadge,
  ShadcnCard,
  AnimatedMetricMeter,
} from "../../components/animated";

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

  const arenaSpring = spring({
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

  const pulse = Math.sin(frame / 6) * 0.04 + 1;
  const wiggle = Math.sin(frame / 4) * 3;

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
      {/* 1. SCROLL STOPPER BADGES & TOP HEADLINE */}
      <div
        style={{
          transform: `scale(${badgeSpring * pulse})`,
          opacity: badgeSpring,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <ShadcnBadge label="SHOCKING ALLOTMENT ODDS" icon="🚨" variant="rose" />
          <ShadcnBadge label="42x EASIER CHANCE" icon="🎯" variant="emerald" />
        </div>

        <div
          style={{
            transform: `scale(${headlineSpring})`,
            opacity: headlineSpring,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
          }}
        >
          <div
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 52,
              fontWeight: 900,
              lineHeight: 1.1,
              color: "#0f172a",
              letterSpacing: -1,
            }}
          >
            BLS 1:128 vs BOMBAY 1:3!
          </div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 17,
              color: "#64748b",
              fontWeight: 800,
              letterSpacing: 1.5,
            }}
          >
            REAL RETAIL ALLOTMENT PROBABILITY
          </div>
        </div>
      </div>

      {/* 2. DYNAMIC ODDS COMPARISON ARENA */}
      <div
        style={{
          transform: `scale(${arenaSpring})`,
          opacity: arenaSpring,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {/* CARD 1: BLS POLYMERS */}
        <div
          style={{
            backgroundColor: "#fef2f2",
            border: "3px solid #dc2626",
            borderRadius: 20,
            padding: "20px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "5px 5px 0px #000000",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span style={{ fontSize: 14, color: "#991b1b", fontWeight: 800 }}>
              MEGA HYPE IPO (BLS POLYMERS)
            </span>
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 28,
                fontWeight: 900,
                color: "#0f172a",
              }}
            >
              128 Retail Applicants Per Lot
            </span>
            <span style={{ fontSize: 14, color: "#b91c1c", fontWeight: 700 }}>
              Lottery jaise odds (0.78% probability)
            </span>
          </div>

          <div
            style={{
              backgroundColor: "#fee2e2",
              border: "2.5px solid #dc2626",
              borderRadius: 14,
              padding: "10px 18px",
              textAlign: "center",
            }}
          >
            <span style={{ fontSize: 11, color: "#991b1b", fontWeight: 800 }}>CHANCE</span>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 32,
                fontWeight: 900,
                color: "#dc2626",
              }}
            >
              1:128
            </div>
            <span style={{ fontSize: 13, color: "#991b1b", fontWeight: 800 }}>~0.78%</span>
          </div>
        </div>

        {/* VS DIVIDER BADGE */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "-10px 0",
            zIndex: 5,
          }}
        >
          <div
            style={{
              backgroundColor: "#000000",
              color: "#fde047",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 16,
              fontWeight: 900,
              padding: "6px 22px",
              borderRadius: 999,
              border: "2px solid #ffffff",
              boxShadow: "0 0 16px rgba(0,0,0,0.5)",
              transform: `rotate(${wiggle}deg)`,
            }}
          >
            ⚡ VS COMPARISON ⚡
          </div>
        </div>

        {/* CARD 2: BOMBAY COATED */}
        <ShadcnCard
          beamColorFrom="#10b981"
          beamColorTo="#06b6d4"
          style={{
            backgroundColor: "#f0fdf4",
            borderColor: "#059669",
            padding: "20px 24px",
            boxShadow: "5px 5px 0px #000000",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <span style={{ fontSize: 14, color: "#065f46", fontWeight: 800 }}>
                CURRENT IPO (BOMBAY COATED)
              </span>
              <span
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 28,
                  fontWeight: 900,
                  color: "#0f172a",
                }}
              >
                Sirf ~3 Applicants Per Lot
              </span>
              <span style={{ fontSize: 14, color: "#047857", fontWeight: 800 }}>
                Har 3 me se 1 ko allotment!
              </span>
            </div>

            <div
              style={{
                backgroundColor: "#d1fae5",
                border: "2.5px solid #059669",
                borderRadius: 14,
                padding: "10px 18px",
                textAlign: "center",
              }}
            >
              <span style={{ fontSize: 11, color: "#065f46", fontWeight: 800 }}>CHANCE</span>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 34,
                  fontWeight: 900,
                  color: "#059669",
                }}
              >
                1 : 3
              </div>
              <span style={{ fontSize: 13, color: "#047857", fontWeight: 800 }}>~33.3%</span>
            </div>
          </div>
        </ShadcnCard>
      </div>

      {/* 3. PROBABILITY AUDIT METER */}
      <div
        style={{
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
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 15,
              fontWeight: 900,
              color: "#0369a1",
              letterSpacing: 1,
            }}
          >
            ALLOTMENT PROBABILITY COMPARISON
          </span>
          <span
            style={{
              backgroundColor: "#dbeafe",
              color: "#1d4ed8",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              fontWeight: 900,
              padding: "3px 8px",
              borderRadius: 6,
            }}
          >
            LIVE AUDIT
          </span>
        </div>

        <AnimatedMetricMeter
          label="Bombay Coated (Retail 3.2x)"
          value="33.3%"
          percentage={33.3}
          color="#059669"
          gradient={["#10b981", "#059669"]}
          delayFrames={8}
          height={14}
        />

        <AnimatedMetricMeter
          label="BLS Polymers (Retail 128x)"
          value="0.78%"
          percentage={4}
          color="#dc2626"
          gradient={["#f87171", "#dc2626"]}
          delayFrames={11}
          height={12}
        />
      </div>

      {/* 4. LOWER SECTION: 2-COLUMN COMPARISON INTEL */}
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
        {/* CARD 1: ODDS ADVANTAGE */}
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
            <span style={{ fontSize: 24 }}>⚡</span>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 14,
                fontWeight: 900,
                color: "#000000",
                letterSpacing: 0.5,
              }}
            >
              ODDS ADVANTAGE
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
            42x Behtar Allotment Chance
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
            Hype wale IPOs me 128 me se 1 ko milta hai. Yahan low subscription ki wajah
            se har 3 me se 1 ko allotment!
          </p>
        </div>

        {/* CARD 2: RETAIL QUOTA BREAKDOWN */}
        <div
          style={{
            backgroundColor: "#f0fdf4",
            border: "3px solid #059669",
            borderRadius: 20,
            padding: "20px 22px",
            boxShadow: "5px 5px 0px #000000",
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 24 }}>🎯</span>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 14,
                fontWeight: 900,
                color: "#065f46",
                letterSpacing: 0.5,
              }}
            >
              RETAIL BIDDING
            </span>
          </div>

          <div
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 22,
              fontWeight: 900,
              lineHeight: 1.2,
              color: "#059669",
            }}
          >
            Retail Quota: 35% Reserved
          </div>

          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              fontWeight: 700,
              lineHeight: 1.45,
              color: "#047857",
              margin: 0,
            }}
          >
            Retail portion sirf ~3.2 guna bhara hai, isliye lottery nahi, genuine
            chances hain allotment ke.
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
          border: "2px solid #38bdf8",
          boxShadow: "0 0 16px rgba(56, 189, 248, 0.25)",
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
            Retail Quota: <b style={{ color: "#38bdf8" }}>35% Reserved</b>
          </span>
        </div>
        <div style={{ width: 1, height: 16, backgroundColor: "#334155" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 16 }}>⚡</span>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 13,
              fontWeight: 800,
              color: "#e2e8f0",
            }}
          >
            Odds: <b style={{ color: "#10b981" }}>1 in 3 Applicants</b>
          </span>
        </div>
      </div>
    </div>
  );
};
