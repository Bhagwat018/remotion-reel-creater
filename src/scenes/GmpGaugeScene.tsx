import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneLayout } from "../components/SceneLayout";
import { useTheme } from "../theme/theme";
import { MotionDirection } from "../lib/directionalMotion";

export interface GmpGaugeSceneProps {
  id?: string;
  type?: "gmp-gauge";
  headline?: string;
  leadIn?: string;
  gmpPercent?: number | string;
  gmpPrice?: number | string;
  issuePrice?: number | string;
  expectedListingPrice?: number | string;
  lotSize?: number | string;
  profitPerLot?: number | string;
  sentiment?: string;
  durationInFrames: number;
  direction?: MotionDirection;
  brand?: string;
}

export const GmpGaugeScene: React.FC<GmpGaugeSceneProps> = ({
  id,
  direction,
  leadIn = "GREY MARKET PREDICTIONS 📈",
  headline = "ESTIMATED *LISTING GAIN*",
  gmpPercent = 72.8,
  gmpPrice = 115,
  issuePrice = 158,
  expectedListingPrice,
  lotSize = 800,
  profitPerLot,
  sentiment,
  brand,
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const theme = useTheme();

  const numGmpPercent = typeof gmpPercent === "string" ? parseFloat(gmpPercent) : gmpPercent;
  const numGmpPrice = typeof gmpPrice === "string" ? parseFloat(gmpPrice) : gmpPrice;
  const numIssuePrice = typeof issuePrice === "string" ? parseFloat(issuePrice) : issuePrice;
  const numLotSize = typeof lotSize === "string" ? parseInt(lotSize, 10) : lotSize;

  const resolvedExpected =
    expectedListingPrice || (numIssuePrice + numGmpPrice).toFixed(0);
  const resolvedProfit =
    profitPerLot || Math.round(numGmpPrice * numLotSize).toLocaleString();

  // Animated needle angle: -90deg (0% gain) to +90deg (100%+ gain)
  const targetAngle = interpolate(
    Math.min(100, Math.max(0, numGmpPercent)),
    [0, 100],
    [-80, 80]
  );

  const needleSpring = spring({
    frame: frame - 6,
    fps,
    config: { damping: 12, stiffness: 90 },
  });

  const needleRotation = interpolate(needleSpring, [0, 1], [-90, targetAngle]);

  // Color mapping based on GMP strength
  let accentColor = "#10b981"; // Emerald
  let badgeText = "SUPER BULLISH 🔥🔥🔥";
  if (numGmpPercent < 10) {
    accentColor = "#ef4444"; // Red
    badgeText = "HIGH DISCOUNT RISK ⚠️";
  } else if (numGmpPercent < 30) {
    accentColor = "#f59e0b"; // Amber
    badgeText = "MODERATE LISTING GAIN ⚡";
  }

  const resolvedSentiment = sentiment || badgeText;

  // Counter animation
  const countUp = interpolate(needleSpring, [0, 1], [0, numGmpPercent], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
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
        {/* 1. Main Speedometer Dial Container */}
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: 900,
            backgroundColor: "#ffffff",
            border: "3.5px solid #000000",
            borderRadius: 28,
            padding: "24px 30px",
            boxShadow: "8px 8px 0px #000000",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxSizing: "border-box",
          }}
        >
          {/* Sentiment Badge Header */}
          <div
            style={{
              backgroundColor: `${accentColor}25`,
              color: "#0f172a",
              border: "2px solid #000000",
              borderRadius: 12,
              padding: "6px 18px",
              fontFamily: theme.typography.mono,
              fontSize: 16,
              fontWeight: 800,
              boxShadow: "3px 3px 0px #000000",
              marginBottom: 14,
            }}
          >
            {resolvedSentiment}
          </div>

          {/* SVG Semi-Circle Speedometer Gauge */}
          <div style={{ position: "relative", width: 440, height: 230, display: "flex", justifyContent: "center" }}>
            <svg width="440" height="240" viewBox="0 0 440 240" style={{ overflow: "visible" }}>
              {/* Outer gauge track */}
              <path
                d="M 50 200 A 170 170 0 0 1 390 200"
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="32"
                strokeLinecap="round"
              />
              {/* Active Color gradient track */}
              <path
                d="M 50 200 A 170 170 0 0 1 390 200"
                fill="none"
                stroke={accentColor}
                strokeWidth="32"
                strokeLinecap="round"
                strokeDasharray="534"
                strokeDashoffset={interpolate(needleSpring, [0, 1], [534, 534 - (534 * Math.min(100, numGmpPercent)) / 100])}
              />
            </svg>

            {/* Pivot Needle Indicator */}
            <div
              style={{
                position: "absolute",
                bottom: 30,
                left: "calc(50% - 6px)",
                width: 12,
                height: 155,
                transformOrigin: "bottom center",
                transform: `rotate(${needleRotation}deg)`,
                zIndex: 4,
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "#000000",
                  clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
                }}
              />
            </div>
            {/* Pivot Base Cap */}
            <div
              style={{
                position: "absolute",
                bottom: 16,
                left: "calc(50% - 20px)",
                width: 40,
                height: 40,
                borderRadius: "50%",
                backgroundColor: "#000000",
                border: "3px solid #ffffff",
                boxShadow: "0 0 8px rgba(0,0,0,0.4)",
                zIndex: 5,
              }}
            />
          </div>

          {/* Big Bold GMP Percentage Number */}
          <div
            style={{
              fontFamily: theme.typography.headline,
              fontSize: 68,
              fontWeight: 900,
              color: "#0f172a",
              letterSpacing: "-0.02em",
              marginTop: -10,
            }}
          >
            +{countUp.toFixed(1)}%
          </div>
          <div
            style={{
              fontFamily: theme.typography.mono,
              fontSize: 16,
              fontWeight: 700,
              color: "#64748b",
            }}
          >
            ESTIMATED GREY MARKET PREMIUM (GMP)
          </div>
        </div>

        {/* 2. Key Transaction Breakdown Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
            width: "100%",
            maxWidth: 900,
          }}
        >
          {/* Issue Price vs Listing Target */}
          <div
            style={{
              backgroundColor: "#ffffff",
              border: "3px solid #000000",
              borderRadius: 20,
              padding: "16px 20px",
              boxShadow: "5px 5px 0px #000000",
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            <span style={{ fontFamily: theme.typography.mono, fontSize: 13, fontWeight: 700, color: "#64748b" }}>
              ISSUE ➔ LISTING
            </span>
            <span style={{ fontFamily: theme.typography.headline, fontSize: 32, fontWeight: 900, color: "#0f172a" }}>
              ₹{numIssuePrice} ➔ ₹{resolvedExpected}
            </span>
            <span style={{ fontFamily: theme.typography.mono, fontSize: 13, fontWeight: 700, color: accentColor }}>
              +₹{numGmpPrice} / share premium
            </span>
          </div>

          {/* Estimated Profit Per Lot */}
          <div
            style={{
              backgroundColor: "#ffffff",
              border: "3px solid #000000",
              borderRadius: 20,
              padding: "16px 20px",
              boxShadow: "5px 5px 0px #000000",
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            <span style={{ fontFamily: theme.typography.mono, fontSize: 13, fontWeight: 700, color: "#64748b" }}>
              EST. PROFIT PER LOT
            </span>
            <span style={{ fontFamily: theme.typography.headline, fontSize: 32, fontWeight: 900, color: accentColor }}>
              +₹{resolvedProfit}
            </span>
            <span style={{ fontFamily: theme.typography.mono, fontSize: 13, fontWeight: 700, color: "#64748b" }}>
              Lot Size: {numLotSize} shares
            </span>
          </div>
        </div>
      </div>
    </SceneLayout>
  );
};

