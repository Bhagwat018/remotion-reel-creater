import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import {
  ShadcnBadge,
  ShadcnCard,
  AnimatedMetricMeter,
} from "../../components/animated";

export interface BombaySubscriptionSceneProps {
  durationInFrames: number;
}

export const BombaySubscriptionScene: React.FC<BombaySubscriptionSceneProps> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerSpring = spring({
    frame: frame - 1,
    fps,
    config: { damping: 12, stiffness: 140 },
  });

  const quotaSpring = spring({
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
          <ShadcnBadge label="DAY 3 LIVE STATUS" icon="📊" variant="cyan" />
          <ShadcnBadge label="LOW OVERSUBSCRIPTION" icon="⚡" variant="emerald" />
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
          SUBSCRIPTION SIRF ~4.0x
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
          CATEGORY-WISE DEMAND BREAKDOWN
        </div>
      </div>

      {/* 2. CATEGORY BREAKDOWN METERS (SHADCN CARD WITH BORDER BEAM) */}
      <ShadcnCard
        delayFrames={3}
        beamColorFrom="#0284c7"
        beamColorTo="#10b981"
        style={{
          padding: "22px 26px",
          gap: 14,
          backgroundColor: "#ffffff",
        }}
      >
        {/* Metric 1: Retail (Highlight) */}
        <div
          style={{
            backgroundColor: "#f0fdf4",
            border: "2.5px solid #059669",
            borderRadius: 18,
            padding: "16px 20px",
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 22 }}>🎟️</span>
              <span
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 22,
                  fontWeight: 900,
                  color: "#0f172a",
                }}
              >
                Retail (Small Bidders)
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
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
                1 IN 3 CHANCE
              </span>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 28,
                  fontWeight: 900,
                  color: "#059669",
                }}
              >
                ~3.2x
              </span>
            </div>
          </div>
          <AnimatedMetricMeter
            label=""
            value=""
            percentage={32}
            color="#059669"
            gradient={["#10b981", "#059669"]}
            delayFrames={5}
            height={14}
          />
        </div>

        {/* Metric 2: QIB (Institutional) */}
        <div
          style={{
            backgroundColor: "#f8fafc",
            border: "2px solid #e2e8f0",
            borderRadius: 16,
            padding: "14px 18px",
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 20 }}>🏦</span>
              <span
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 19,
                  fontWeight: 800,
                  color: "#334155",
                }}
              >
                QIB (Institutions &amp; Mutual Funds)
              </span>
            </div>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 24,
                fontWeight: 900,
                color: "#0284c7",
              }}
            >
              ~6.9x
            </span>
          </div>
          <AnimatedMetricMeter
            label=""
            value=""
            percentage={69}
            color="#0284c7"
            gradient={["#38bdf8", "#0284c7"]}
            delayFrames={8}
            height={12}
          />
        </div>

        {/* Metric 3: NII (HNIs) */}
        <div
          style={{
            backgroundColor: "#f8fafc",
            border: "2px solid #e2e8f0",
            borderRadius: 16,
            padding: "14px 18px",
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 20 }}>💼</span>
              <span
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 19,
                  fontWeight: 800,
                  color: "#334155",
                }}
              >
                NII (HNI / Big Portfolios)
              </span>
            </div>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 24,
                fontWeight: 900,
                color: "#9333ea",
              }}
            >
              ~1.9x
            </span>
          </div>
          <AnimatedMetricMeter
            label=""
            value=""
            percentage={19}
            color="#9333ea"
            gradient={["#c084fc", "#9333ea"]}
            delayFrames={10}
            height={12}
          />
        </div>
      </ShadcnCard>

      {/* 3. MIDDLE SECTION: QUOTA ALLOCATION COMPARISON METER */}
      <div
        style={{
          transform: `scale(${quotaSpring})`,
          opacity: quotaSpring,
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
            <span style={{ fontSize: 20 }}>📈</span>
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 20,
                fontWeight: 900,
                color: "#0f172a",
              }}
            >
              Quota Allotment Opportunity
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
            FAVORABLE RATIO 🔥
          </span>
        </div>

        <AnimatedMetricMeter
          label="Retail Portion (35% Quota)"
          value="~3.2x"
          percentage={32}
          color="#059669"
          gradient={["#10b981", "#059669"]}
          sublabel="1 in 3 Chance"
          delayFrames={6}
          height={14}
        />

        <AnimatedMetricMeter
          label="NII Portion (15% Quota)"
          value="~1.9x"
          percentage={19}
          color="#9333ea"
          gradient={["#c084fc", "#9333ea"]}
          sublabel="Under-subscribed HNIs"
          delayFrames={9}
          height={12}
        />
      </div>

      {/* 4. LOWER SECTION: 2-COLUMN DEMAND VERDICT */}
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
        {/* CARD 1: DEMAND VERDICT */}
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
              DEMAND AUDIT
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
            Total Demand Sirf ~4x
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
            Total demand sirf 4 guna hone ki wajah se bidding me koi massive crowd
            nahi hai. Allotment chance bohot high hai!
          </p>
        </div>

        {/* CARD 2: INSTITUTIONAL BEHAVIOR */}
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
            <span style={{ fontSize: 24 }}>💼</span>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 14,
                fontWeight: 900,
                color: "#065f46",
                letterSpacing: 0.5,
              }}
            >
              HNI / BIG MONEY
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
            NII Quota Only ~1.9x
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
            HNIs ne aggressively bid nahi kiya. Retail quota ~3.2x hai, matlab
            small investors ko shares aaram se allot honge.
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
          <span style={{ fontSize: 16 }}>📊</span>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 13,
              fontWeight: 800,
              color: "#e2e8f0",
            }}
          >
            QIB: <b style={{ color: "#38bdf8" }}>6.9x</b>
          </span>
        </div>
        <div style={{ width: 1, height: 16, backgroundColor: "#334155" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 16 }}>🎟️</span>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 13,
              fontWeight: 800,
              color: "#e2e8f0",
            }}
          >
            Retail: <b style={{ color: "#10b981" }}>3.2x (1 in 3)</b>
          </span>
        </div>
        <div style={{ width: 1, height: 16, backgroundColor: "#334155" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 16 }}>💼</span>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 13,
              fontWeight: 800,
              color: "#e2e8f0",
            }}
          >
            NII: <b style={{ color: "#c084fc" }}>1.9x</b>
          </span>
        </div>
      </div>
    </div>
  );
};
