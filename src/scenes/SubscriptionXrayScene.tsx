import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneLayout } from "../components/SceneLayout";
import { useTheme } from "../theme/theme";
import { MotionDirection } from "../lib/directionalMotion";

export interface SubscriptionXraySceneProps {
  id?: string;
  type?: "subscription-xray";
  headline?: string;
  leadIn?: string;
  totalMultiple?: number | string;
  qibMultiple?: number | string;
  niiMultiple?: number | string;
  retailMultiple?: number | string;
  verdict?: string;
  durationInFrames: number;
  direction?: MotionDirection;
  brand?: string;
}

export const SubscriptionXrayScene: React.FC<SubscriptionXraySceneProps> = ({
  id,
  direction,
  leadIn = "LIVE DEMAND X-RAY 🔍",
  headline = "WHO IS *BUYING* THIS IPO?",
  totalMultiple = "536.8x",
  qibMultiple = "142x",
  niiMultiple = "820x",
  retailMultiple = "290x",
  verdict = "MASSIVE HNI & RETAIL DEMAND 🔥",
  brand,
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const theme = useTheme();

  const parseNum = (val: number | string) => {
    if (typeof val === "number") return val;
    return parseFloat(String(val).replace(/[^\d.]/g, "")) || 1;
  };

  const totalNum = parseNum(totalMultiple);
  const qibNum = parseNum(qibMultiple);
  const niiNum = parseNum(niiMultiple);
  const retailNum = parseNum(retailMultiple);

  // Normalize bars against max multiple
  const maxCategory = Math.max(qibNum, niiNum, retailNum, 10);

  const tiers = [
    { label: "QIB (Institutions)", multiple: qibNum, color: "#38bdf8", icon: "🏛️" },
    { label: "NII (HNI Big Players)", multiple: niiNum, color: "#c084fc", icon: "💼" },
    { label: "Retail (General Public)", multiple: retailNum, color: "#4ade80", icon: "📱" },
  ];

  const totalSpring = spring({
    frame: frame - 4,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  return (
    <SceneLayout
      id={id}
      direction={direction}
      leadIn={leadIn}
      headline={headline}
      brand={brand}
      durationInFrames={durationInFrames}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
          marginTop: 10,
        }}
      >
        {/* 1. Master Overall Subscription Badge */}
        <div
          style={{
            width: "100%",
            maxWidth: 900,
            backgroundColor: "#0f172a",
            color: "#f8fafc",
            border: "3.5px solid #000000",
            borderRadius: 24,
            padding: "20px 28px",
            boxShadow: "7px 7px 0px #000000",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxSizing: "border-box",
            transform: `scale(${interpolate(totalSpring, [0, 1], [0.9, 1])})`,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <span style={{ fontFamily: theme.typography.mono, fontSize: 14, fontWeight: 700, color: "#38bdf8" }}>
              TOTAL BIDDING MULTIPLIER
            </span>
            <span style={{ fontFamily: theme.typography.headline, fontSize: 30, fontWeight: 900 }}>
              {verdict}
            </span>
          </div>

          <div
            style={{
              backgroundColor: "#22c55e",
              color: "#000000",
              border: "2.5px solid #000000",
              borderRadius: 16,
              padding: "8px 20px",
              fontFamily: theme.typography.headline,
              fontSize: 38,
              fontWeight: 900,
              boxShadow: "4px 4px 0px #000000",
            }}
          >
            {totalNum}x
          </div>
        </div>

        {/* 2. 3-Tier Horizontal Progress Bars */}
        <div
          style={{
            width: "100%",
            maxWidth: 900,
            backgroundColor: "#ffffff",
            border: "3.5px solid #000000",
            borderRadius: 26,
            padding: "24px 28px",
            boxShadow: "8px 8px 0px #000000",
            display: "flex",
            flexDirection: "column",
            gap: 22,
            boxSizing: "border-box",
          }}
        >
          {tiers.map((tier, idx) => {
            const barSpring = spring({
              frame: frame - (8 + idx * 6),
              fps,
              config: { damping: 14, stiffness: 100 },
            });

            const barWidthPercent = interpolate(
              barSpring,
              [0, 1],
              [0, Math.min(100, Math.max(12, (tier.multiple / maxCategory) * 100))]
            );

            return (
              <div key={idx} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 22 }}>{tier.icon}</span>
                    <span
                      style={{
                        fontFamily: theme.typography.headline,
                        fontSize: 22,
                        fontWeight: 900,
                        color: "#0f172a",
                      }}
                    >
                      {tier.label}
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: theme.typography.headline,
                      fontSize: 24,
                      fontWeight: 900,
                      color: "#0f172a",
                    }}
                  >
                    {tier.multiple}x Subscribed
                  </span>
                </div>

                {/* Progress Bar Container */}
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: 28,
                    backgroundColor: "#f1f5f9",
                    border: "2.5px solid #000000",
                    borderRadius: 12,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${barWidthPercent}%`,
                      height: "100%",
                      backgroundColor: tier.color,
                      borderRight: "2.5px solid #000000",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SceneLayout>
  );
};

