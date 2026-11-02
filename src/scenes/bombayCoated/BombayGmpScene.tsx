import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import {
  ShadcnBadge,
  ShadcnCard,
  AnimatedMetricMeter,
} from "../../components/animated";

export interface BombayGmpSceneProps {
  durationInFrames: number;
}

export const BombayGmpScene: React.FC<BombayGmpSceneProps> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerSpring = spring({
    frame: frame - 1,
    fps,
    config: { damping: 12, stiffness: 140 },
  });

  const scenarioSpring = spring({
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
          <ShadcnBadge label="GREY MARKET WARNING" icon="⚠️" variant="amber" />
          <ShadcnBadge label="UNOFFICIAL ESTIMATE" icon="🕵️" variant="rose" />
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
          GMP ~11% (RUMOR HAI)
        </div>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 17,
            color: "#b45309",
            fontWeight: 800,
            letterSpacing: 2,
          }}
        >
          UNOFFICIAL GREY MARKET PREMIUM
        </div>
      </div>

      {/* 2. GMP METRIC AUDIT CARD */}
      <ShadcnCard
        delayFrames={3}
        beamColorFrom="#f59e0b"
        beamColorTo="#ef4444"
        style={{
          padding: "22px 26px",
          gap: 14,
          backgroundColor: "#ffffff",
        }}
      >
        {/* BIG ESTIMATED PREMIUM STAT */}
        <div
          style={{
            backgroundColor: "#fffbeb",
            border: "2.5px solid #f59e0b",
            borderRadius: 18,
            padding: "16px 22px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span style={{ fontSize: 14, color: "#92400e", fontWeight: 800 }}>
              ESTIMATED LISTING PREMIUM
            </span>
            <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
              <span
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 44,
                  fontWeight: 900,
                  color: "#b45309",
                }}
              >
                +₹8 to ₹10
              </span>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 18,
                  fontWeight: 900,
                  color: "#059669",
                  backgroundColor: "#d1fae5",
                  padding: "4px 10px",
                  borderRadius: 6,
                }}
              >
                ~9% - 12%
              </span>
            </div>
            <span style={{ fontSize: 13, color: "#78350f", fontWeight: 700 }}>
              Issue price ₹82 pe approx. ₹90-₹92 listing
            </span>
          </div>

          <div
            style={{
              width: 58,
              height: 58,
              borderRadius: "50%",
              backgroundColor: "#fef3c7",
              border: "3px solid #f59e0b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              transform: `scale(${pulse})`,
            }}
          >
            📈
          </div>
        </div>

        {/* 2 CRITICAL WARNING AUDITS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 14,
          }}
        >
          <div
            style={{
              backgroundColor: "#fef2f2",
              border: "2px solid #ef4444",
              borderRadius: 16,
              padding: "12px 16px",
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 18 }}>🚫</span>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 14,
                  fontWeight: 900,
                  color: "#991b1b",
                }}
              >
                NO SEBI BACKING
              </span>
            </div>
            <span style={{ fontSize: 12, color: "#b91c1c", fontWeight: 700 }}>
              Grey market unregulated hai. Listing day pe palat sakta hai.
            </span>
          </div>

          <div
            style={{
              backgroundColor: "#f8fafc",
              border: "2px solid #cbd5e1",
              borderRadius: 16,
              padding: "12px 16px",
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 18 }}>🎯</span>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 14,
                  fontWeight: 900,
                  color: "#334155",
                }}
              >
                MODEST RETURN
              </span>
            </div>
            <span style={{ fontSize: 12, color: "#475569", fontWeight: 700 }}>
              Double ya triple return nahi, sirf modest 10% listing expectation.
            </span>
          </div>
        </div>
      </ShadcnCard>

      {/* 3. MIDDLE SECTION: LISTING SCENARIOS METER */}
      <div
        style={{
          transform: `scale(${scenarioSpring})`,
          opacity: scenarioSpring,
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
              Listing Day Price Scenarios
            </span>
          </div>
          <span
            style={{
              backgroundColor: "#fef3c7",
              color: "#b45309",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 13,
              fontWeight: 900,
              padding: "4px 10px",
              borderRadius: 6,
              border: "1.5px solid #f59e0b",
            }}
          >
            ESTIMATED
          </span>
        </div>

        <AnimatedMetricMeter
          label="Bull Case (Full GMP Capture)"
          value="₹92"
          percentage={12.2}
          color="#059669"
          gradient={["#10b981", "#059669"]}
          sublabel="+12.2% Gain"
          delayFrames={6}
          height={14}
        />

        <AnimatedMetricMeter
          label="Neutral Case (Partial Gain)"
          value="₹86"
          percentage={5}
          color="#0284c7"
          gradient={["#38bdf8", "#0284c7"]}
          sublabel="+4.8% Gain"
          delayFrames={9}
          height={12}
        />
      </div>

      {/* 4. LOWER SECTION: 2-COLUMN REALITY CHECK MATRIX */}
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
        {/* CARD 1: RUMOR WARNING */}
        <div
          style={{
            backgroundColor: "#fef2f2",
            border: "3px solid #ef4444",
            borderRadius: 20,
            padding: "20px 22px",
            boxShadow: "5px 5px 0px #000000",
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 24 }}>⚠️</span>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 14,
                fontWeight: 900,
                color: "#991b1b",
                letterSpacing: 0.5,
              }}
            >
              RUMOR AUDIT
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
            Sirf Rumor Hai
          </div>

          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              fontWeight: 700,
              lineHeight: 1.45,
              color: "#7f1d1d",
              margin: 0,
            }}
          >
            Grey market premium koi guaranteed listing gain nahi hota. Market sentiment
            badalte hi GMP zero ya discount par ja sakta hai.
          </p>
        </div>

        {/* CARD 2: REALITY STRATEGY */}
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
            <span style={{ fontSize: 24 }}>💡</span>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 14,
                fontWeight: 900,
                color: "#000000",
                letterSpacing: 0.5,
              }}
            >
              TAKEAWAY
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
            Fundamentals First
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
            Sirf 11% GMP dekhkar blindly apply na karein. Company ke financials aur
            valuation ko audit karna zyada zaroori hai!
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
          border: "2px solid #f59e0b",
          boxShadow: "0 0 16px rgba(245, 158, 11, 0.25)",
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
            Issue Price: <b style={{ color: "#38bdf8" }}>₹82</b>
          </span>
        </div>
        <div style={{ width: 1, height: 16, backgroundColor: "#334155" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 16 }}>📈</span>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 13,
              fontWeight: 800,
              color: "#e2e8f0",
            }}
          >
            Estimated Listing: <b style={{ color: "#10b981" }}>~₹90-₹92</b>
          </span>
        </div>
      </div>
    </div>
  );
};
