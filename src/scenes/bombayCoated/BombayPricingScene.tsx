import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import {
  ShadcnBadge,
  ShadcnCard,
  AnimatedMetricMeter,
} from "../../components/animated";

export interface BombayPricingSceneProps {
  durationInFrames: number;
}

export const BombayPricingScene: React.FC<BombayPricingSceneProps> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerSpring = spring({
    frame: frame - 1,
    fps,
    config: { damping: 12, stiffness: 140 },
  });

  const oddsSpring = spring({
    frame: frame - 6,
    fps,
    config: { damping: 12, stiffness: 130 },
  });

  const matrixSpring = spring({
    frame: frame - 9,
    fps,
    config: { damping: 12, stiffness: 140 },
  });

  const breakdownSpring = spring({
    frame: frame - 12,
    fps,
    config: { damping: 12, stiffness: 130 },
  });

  const timelineSpring = spring({
    frame: frame - 15,
    fps,
    config: { damping: 12, stiffness: 130 },
  });

  const pulse = Math.sin(frame / 5) * 0.04 + 1;

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
      {/* 1. TOP URGENCY BADGE & TITLE BLOCK */}
      <div
        style={{
          transform: `scale(${headerSpring})`,
          opacity: headerSpring,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
          textAlign: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <ShadcnBadge label="CLOSING TOMORROW (LAST DAY)" icon="⏳" variant="amber" />
          <ShadcnBadge label="100% FRESH ISSUE" icon="🏭" variant="emerald" />
        </div>

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
          BOMBAY COATED &amp; STEELS
        </div>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 18,
            color: "#0369a1",
            fontWeight: 800,
            letterSpacing: 2,
          }}
        >
          PRICE BAND &amp; TICKET SIZE DETAILS
        </div>
      </div>

      {/* 2. INDUSTRIAL STOCK SPEC TICKET */}
      <ShadcnCard
        delayFrames={3}
        beamColorFrom="#06b6d4"
        beamColorTo="#10b981"
        style={{
          padding: "22px 26px",
          gap: 16,
          backgroundColor: "#ffffff",
        }}
      >
        {/* PRICE BAND TRACK */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            backgroundColor: "#f8fafc",
            padding: "16px 20px",
            borderRadius: 18,
            border: "2px solid #e2e8f0",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 17,
                color: "#475569",
                fontWeight: 800,
              }}
            >
              PRICE BAND RANGE:
            </span>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 15,
                color: "#059669",
                fontWeight: 900,
                backgroundColor: "#d1fae5",
                padding: "3px 10px",
                borderRadius: 6,
              }}
            >
              BID AT CUT-OFF
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              position: "relative",
              padding: "4px 0",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
              <span
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 40,
                  fontWeight: 900,
                  color: "#64748b",
                }}
              >
                ₹78
              </span>
              <span style={{ fontSize: 13, color: "#94a3b8", fontWeight: 800 }}>
                Floor Price
              </span>
            </div>

            <div
              style={{
                flex: 1,
                height: 12,
                margin: "0 18px",
                backgroundColor: "#e2e8f0",
                borderRadius: 6,
                position: "relative",
                overflow: "hidden",
                border: "1px solid #cbd5e1",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  background: "linear-gradient(90deg, #94a3b8, #10b981)",
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                transform: `scale(${pulse})`,
              }}
            >
              <div
                style={{
                  backgroundColor: "#d1fae5",
                  color: "#059669",
                  padding: "4px 12px",
                  borderRadius: 8,
                  border: "2px solid #000000",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 12,
                  fontWeight: 900,
                  marginBottom: 2,
                  boxShadow: "2px 2px 0px #000000",
                }}
              >
                CUT-OFF
              </div>
              <span
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 44,
                  fontWeight: 900,
                  color: "#059669",
                }}
              >
                ₹82
              </span>
            </div>
          </div>
        </div>

        {/* 2-COLUMN TILES: LOT SIZE & MINIMUM INVESTMENT */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
          }}
        >
          <div
            style={{
              backgroundColor: "#f8fafc",
              border: "2.5px solid #000000",
              borderRadius: 16,
              padding: "16px 20px",
              display: "flex",
              flexDirection: "column",
              gap: 4,
              boxShadow: "3px 3px 0px #000000",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 20 }}>📦</span>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 15,
                  color: "#475569",
                  fontWeight: 800,
                }}
              >
                1 LOT SIZE
              </span>
            </div>
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 32,
                fontWeight: 900,
                color: "#0f172a",
              }}
            >
              182 Shares
            </div>
            <span style={{ fontSize: 13, color: "#64748b", fontWeight: 600 }}>Standard retail lot</span>
          </div>

          <div
            style={{
              backgroundColor: "#f0fdf4",
              border: "2.5px solid #000000",
              borderRadius: 16,
              padding: "16px 20px",
              display: "flex",
              flexDirection: "column",
              gap: 4,
              boxShadow: "3px 3px 0px #000000",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 20 }}>💰</span>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 15,
                  color: "#065f46",
                  fontWeight: 800,
                }}
              >
                MIN. CAPITAL
              </span>
            </div>
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 32,
                fontWeight: 900,
                color: "#059669",
              }}
            >
              ₹14,924
            </div>
            <span style={{ fontSize: 13, color: "#047857", fontWeight: 800 }}>
              (~15 Hazaar Rupaye)
            </span>
          </div>
        </div>

        {/* 100% FRESH ISSUE BADGE */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#f1f5f9",
            borderRadius: 14,
            padding: "14px 20px",
            border: "2px solid #000000",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 22 }}>🏭</span>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 17,
                fontWeight: 800,
                color: "#0f172a",
              }}
            >
              100% Fresh Issue (₹183 Cr)
            </span>
          </div>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 15,
              fontWeight: 900,
              color: "#059669",
              backgroundColor: "#d1fae5",
              border: "1.5px solid #000000",
              padding: "6px 12px",
              borderRadius: 8,
            }}
          >
            ZERO OFS ✅
          </span>
        </div>
      </ShadcnCard>

      {/* 3. MIDDLE SECTION: ALLOTMENT ODDS PROBABILITY METER */}
      <div
        style={{
          transform: `scale(${oddsSpring})`,
          opacity: oddsSpring,
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
            <span style={{ fontSize: 20 }}>🎯</span>
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 20,
                fontWeight: 900,
                color: "#0f172a",
              }}
            >
              Retail Allotment Probability
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
            HIGH CHANCE 🔥
          </span>
        </div>

        <AnimatedMetricMeter
          label="Bombay Coated (Retail ~3.2x Subscribed)"
          value="~33.3%"
          percentage={33.3}
          color="#059669"
          gradient={["#10b981", "#059669"]}
          sublabel="1 in 3 Chance"
          delayFrames={5}
          height={14}
        />

        <AnimatedMetricMeter
          label="BLS Polymers (Retail ~128x Subscribed)"
          value="0.78%"
          percentage={4}
          color="#dc2626"
          gradient={["#f87171", "#dc2626"]}
          sublabel="1 in 128 Chance"
          delayFrames={8}
          height={12}
        />
      </div>

      {/* 4. LOWER SECTION: 2-COLUMN BIDDING STRATEGY MATRIX */}
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
        <div
          style={{
            backgroundColor: "#fef08a",
            border: "3.5px solid #000000",
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
              }}
            >
              BIDDING RULE
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
            Apply At Cut-Off (₹82)
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
            Floor price ₹78 select karne par application disqualify ho sakti hai.
            Hamesha ₹82 cut-off tick karo!
          </p>
        </div>

        <div
          style={{
            backgroundColor: "#f0fdf4",
            border: "3.5px solid #059669",
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
              }}
            >
              RETAIL QUOTA
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
            1 in 3 Probability (~33%)
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
            Retail quota sirf ~3.2x bhara hai. Har 3 me se lagbhag 1 applicant
            ko allotment milna tay hai!
          </p>
        </div>
      </div>

      {/* 5. APPLICATION TICKET SIZE TILES */}
      <div
        style={{
          transform: `scale(${breakdownSpring})`,
          opacity: breakdownSpring,
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 14,
        }}
      >
        <div
          style={{
            backgroundColor: "#ffffff",
            border: "2.5px solid #000000",
            borderRadius: 16,
            padding: "14px 16px",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            gap: 4,
            boxShadow: "3px 3px 0px #000000",
          }}
        >
          <span style={{ fontSize: 12, color: "#64748b", fontWeight: 800 }}>MIN. RETAIL LOT</span>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 900, color: "#0f172a" }}>
            182 Shares
          </span>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, fontWeight: 800, color: "#059669" }}>
            ₹14,924
          </span>
        </div>

        <div
          style={{
            backgroundColor: "#ffffff",
            border: "2.5px solid #000000",
            borderRadius: 16,
            padding: "14px 16px",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            gap: 4,
            boxShadow: "3px 3px 0px #000000",
          }}
        >
          <span style={{ fontSize: 12, color: "#64748b", fontWeight: 800 }}>MAX. RETAIL LOT</span>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 900, color: "#0f172a" }}>
            13 Lots (2,366)
          </span>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, fontWeight: 800, color: "#0369a1" }}>
            ₹1,94,012
          </span>
        </div>

        <div
          style={{
            backgroundColor: "#fef3c7",
            border: "2.5px solid #000000",
            borderRadius: 16,
            padding: "14px 16px",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            gap: 4,
            boxShadow: "3px 3px 0px #000000",
          }}
        >
          <span style={{ fontSize: 12, color: "#92400e", fontWeight: 800 }}>ALLOTMENT BASIS</span>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 900, color: "#78350f" }}>
            Proportionate
          </span>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, fontWeight: 900, color: "#b45309" }}>
            Lottery Method
          </span>
        </div>
      </div>

      {/* 6. BOTTOM TIMELINE STRIP */}
      <div
        style={{
          transform: `scale(${timelineSpring})`,
          opacity: timelineSpring,
          backgroundColor: "#0f172a",
          color: "#ffffff",
          borderRadius: 16,
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          border: "2.5px solid #38bdf8",
          boxShadow: "0 0 16px rgba(56, 189, 248, 0.25)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 18 }}>📅</span>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 14,
              fontWeight: 800,
              color: "#e2e8f0",
            }}
          >
            Allotment: <b style={{ color: "#38bdf8" }}>3 Nov</b>
          </span>
        </div>
        <div style={{ width: 1, height: 18, backgroundColor: "#334155" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 18 }}>💸</span>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 14,
              fontWeight: 800,
              color: "#e2e8f0",
            }}
          >
            Refund/Demat: <b style={{ color: "#38bdf8" }}>4 Nov</b>
          </span>
        </div>
        <div style={{ width: 1, height: 18, backgroundColor: "#334155" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 18 }}>🔔</span>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 14,
              fontWeight: 800,
              color: "#e2e8f0",
            }}
          >
            Listing: <b style={{ color: "#10b981" }}>5 Nov</b>
          </span>
        </div>
      </div>
    </div>
  );
};
