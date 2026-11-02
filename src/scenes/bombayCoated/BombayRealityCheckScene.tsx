import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import {
  ShadcnBadge,
  ShadcnCard,
  AnimatedMetricMeter,
} from "../../components/animated";

export interface BombayRealityCheckSceneProps {
  durationInFrames: number;
}

export const BombayRealityCheckScene: React.FC<BombayRealityCheckSceneProps> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerSpring = spring({
    frame: frame - 1,
    fps,
    config: { damping: 12, stiffness: 140 },
  });

  const stressSpring = spring({
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
          <ShadcnBadge label="FINANCIAL WARNING" icon="🚨" variant="rose" />
          <ShadcnBadge label="RED FLAGS DETECTED" icon="⚠️" variant="amber" />
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
          REALITY CHECK: 2 BIG RISKS
        </div>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 17,
            color: "#dc2626",
            fontWeight: 800,
            letterSpacing: 2,
          }}
        >
          DRHP FINANCIAL &amp; BUSINESS AUDIT
        </div>
      </div>

      {/* 2. RISK ANALYSIS CARD */}
      <ShadcnCard
        delayFrames={3}
        beamColorFrom="#ef4444"
        beamColorTo="#f97316"
        style={{
          padding: "22px 26px",
          gap: 14,
          backgroundColor: "#ffffff",
        }}
      >
        {/* RISK 1: REVENUE VS PROFIT MARGIN SQUEEZE */}
        <div
          style={{
            backgroundColor: "#fff1f2",
            border: "2px solid #f43f5e",
            borderRadius: 18,
            padding: "16px 20px",
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 22 }}>📉</span>
              <span
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 20,
                  fontWeight: 900,
                  color: "#9f1239",
                }}
              >
                Risk 1: Margin Squeeze Paradox
              </span>
            </div>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                fontWeight: 900,
                color: "#e11d48",
                backgroundColor: "#ffe4e6",
                padding: "4px 10px",
                borderRadius: 6,
              }}
            >
              PROFIT LAGS
            </span>
          </div>

          <AnimatedMetricMeter
            label="Revenue Growth (Topline)"
            value="+20%"
            percentage={20}
            color="#0284c7"
            gradient={["#38bdf8", "#0284c7"]}
            delayFrames={5}
            height={13}
          />

          <AnimatedMetricMeter
            label="Profit Growth (Bottomline)"
            value="+7%"
            percentage={7}
            color="#e11d48"
            gradient={["#fda4af", "#e11d48"]}
            sublabel="Cost Pressure"
            delayFrames={8}
            height={13}
          />
        </div>

        {/* RISK 2: SINGLE SUPPLIER DEPENDENCY */}
        <div
          style={{
            backgroundColor: "#fffbeb",
            border: "2px solid #f59e0b",
            borderRadius: 16,
            padding: "16px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 20 }}>🏭</span>
              <span
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 20,
                  fontWeight: 900,
                  color: "#92400e",
                }}
              >
                Risk 2: 1 Single Supplier Dependency
              </span>
            </div>
            <span style={{ fontSize: 13, color: "#78350f", fontWeight: 700 }}>
              Primary steel raw material ek hi vendor se aata hai.
            </span>
          </div>

          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 13,
              fontWeight: 900,
              color: "#b45309",
              backgroundColor: "#fef3c7",
              border: "1.5px solid #f59e0b",
              padding: "6px 12px",
              borderRadius: 8,
              textAlign: "center",
            }}
          >
            BOTTLENECK
          </span>
        </div>
      </ShadcnCard>

      {/* 3. MIDDLE SECTION: FINANCIAL STRESS-TEST METERS */}
      <div
        style={{
          transform: `scale(${stressSpring})`,
          opacity: stressSpring,
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
            <span style={{ fontSize: 20 }}>🔬</span>
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 20,
                fontWeight: 900,
                color: "#0f172a",
              }}
            >
              DRHP Vulnerability Audit
            </span>
          </div>
          <span
            style={{
              backgroundColor: "#ffe4e6",
              color: "#e11d48",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 13,
              fontWeight: 900,
              padding: "4px 10px",
              borderRadius: 6,
              border: "1.5px solid #e11d48",
            }}
          >
            HIGH CAUTION
          </span>
        </div>

        <AnimatedMetricMeter
          label="Single Supplier Exposure"
          value="High"
          percentage={85}
          color="#ef4444"
          gradient={["#f87171", "#ef4444"]}
          sublabel="Raw Material Monopoly"
          delayFrames={6}
          height={14}
        />

        <AnimatedMetricMeter
          label="Margin Cushion"
          value="Compressed"
          percentage={30}
          color="#f59e0b"
          gradient={["#fde047", "#f59e0b"]}
          sublabel="Inflation Sensitive"
          delayFrames={9}
          height={12}
        />
      </div>

      {/* 4. LOWER SECTION: 2-COLUMN RISK IMPACT MATRIX */}
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
        {/* CARD 1: MARGIN PRESSURE */}
        <div
          style={{
            backgroundColor: "#fff1f2",
            border: "3px solid #f43f5e",
            borderRadius: 20,
            padding: "20px 22px",
            boxShadow: "5px 5px 0px #000000",
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 24 }}>📉</span>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 14,
                fontWeight: 900,
                color: "#9f1239",
                letterSpacing: 0.5,
              }}
            >
              MARGIN RISK
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
            Cost Pressure Squeeze
          </div>

          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              fontWeight: 700,
              lineHeight: 1.45,
              color: "#881337",
              margin: 0,
            }}
          >
            Revenue 20% badha par profit sirf 7%. Iska matlab raw material aur
            operating costs tezi se badh rahi hain.
          </p>
        </div>

        {/* CARD 2: SUPPLY CHAIN CONCENTRATION */}
        <div
          style={{
            backgroundColor: "#fffbeb",
            border: "3px solid #f59e0b",
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
                color: "#92400e",
                letterSpacing: 0.5,
              }}
            >
              SUPPLIER RISK
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
            1 Single Supplier Threat
          </div>

          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              fontWeight: 700,
              lineHeight: 1.45,
              color: "#78350f",
              margin: 0,
            }}
          >
            Agar vendor ne pricing badhai ya supply rok di, toh direct manufacturing
            halt ho sakti hai.
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
          border: "2px solid #ef4444",
          boxShadow: "0 0 16px rgba(239, 68, 68, 0.25)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 16 }}>⚠️</span>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 13,
              fontWeight: 800,
              color: "#e2e8f0",
            }}
          >
            Topline: <b style={{ color: "#38bdf8" }}>+20%</b>
          </span>
        </div>
        <div style={{ width: 1, height: 16, backgroundColor: "#334155" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 16 }}>🚨</span>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 13,
              fontWeight: 800,
              color: "#e2e8f0",
            }}
          >
            Bottomline: <b style={{ color: "#f87171" }}>Only +7%</b>
          </span>
        </div>
      </div>
    </div>
  );
};
