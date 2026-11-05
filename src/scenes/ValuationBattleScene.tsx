import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneLayout } from "../components/SceneLayout";
import { useTheme } from "../theme/theme";
import { MotionDirection } from "../lib/directionalMotion";

export interface ValuationBattleSceneProps {
  id?: string;
  type?: "valuation-battle";
  headline?: string;
  leadIn?: string;
  companyName?: string;
  companyPe?: number | string;
  peerName?: string;
  peerPe?: number | string;
  verdictBadge?: string;
  points?: string[];
  durationInFrames: number;
  direction?: MotionDirection;
  brand?: string;
}

export const ValuationBattleScene: React.FC<ValuationBattleSceneProps> = ({
  id,
  direction,
  leadIn = "VALUATION REALITY CHECK ⚖️",
  headline = "EXPENSIVE YA *FAIR VALUE*?",
  companyName = "IPO Company",
  companyPe = "36.2x",
  peerName = "Industry Average",
  peerPe = "22.5x",
  verdictBadge = "EXPENSIVE VALUATION ⚠️",
  points = [
    "P/E ratio is 60% higher than listed industry peers",
    "Net profit jump looks strong but topline growth is slowing",
    "High client concentration creates margin risk",
  ],
  brand,
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const theme = useTheme();

  const cardSpring = spring({
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
          gap: 18,
          marginTop: 10,
        }}
      >
        {/* 1. Split P/E Battle Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
            width: "100%",
            maxWidth: 900,
            transform: `scale(${interpolate(cardSpring, [0, 1], [0.9, 1])})`,
          }}
        >
          {/* Company P/E Card */}
          <div
            style={{
              backgroundColor: "#fee2e2",
              border: "3.5px solid #000000",
              borderRadius: 22,
              padding: "20px 22px",
              boxShadow: "6px 6px 0px #000000",
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            <span
              style={{
                fontFamily: theme.typography.mono,
                fontSize: 13,
                fontWeight: 800,
                color: "#991b1b",
              }}
            >
              THIS IPO VALUATION
            </span>
            <span
              style={{
                fontFamily: theme.typography.headline,
                fontSize: 24,
                fontWeight: 900,
                color: "#0f172a",
              }}
            >
              {companyName}
            </span>
            <span
              style={{
                fontFamily: theme.typography.headline,
                fontSize: 44,
                fontWeight: 900,
                color: "#dc2626",
              }}
            >
              {companyPe} P/E
            </span>
          </div>

          {/* Industry Benchmark Card */}
          <div
            style={{
              backgroundColor: "#dcfce7",
              border: "3.5px solid #000000",
              borderRadius: 22,
              padding: "20px 22px",
              boxShadow: "6px 6px 0px #000000",
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            <span
              style={{
                fontFamily: theme.typography.mono,
                fontSize: 13,
                fontWeight: 800,
                color: "#166534",
              }}
            >
              INDUSTRY BENCHMARK
            </span>
            <span
              style={{
                fontFamily: theme.typography.headline,
                fontSize: 24,
                fontWeight: 900,
                color: "#0f172a",
              }}
            >
              {peerName}
            </span>
            <span
              style={{
                fontFamily: theme.typography.headline,
                fontSize: 44,
                fontWeight: 900,
                color: "#16a34a",
              }}
            >
              {peerPe} P/E
            </span>
          </div>
        </div>

        {/* 2. Verdict & Key Risk Bullets Container */}
        <div
          style={{
            width: "100%",
            maxWidth: 900,
            backgroundColor: "#ffffff",
            border: "3.5px solid #000000",
            borderRadius: 24,
            padding: "20px 24px",
            boxShadow: "7px 7px 0px #000000",
            display: "flex",
            flexDirection: "column",
            gap: 14,
            boxSizing: "border-box",
          }}
        >
          {/* Verdict Chip */}
          <div
            style={{
              alignSelf: "flex-start",
              backgroundColor: "#fef08a",
              color: "#854d0e",
              border: "2px solid #000000",
              borderRadius: 10,
              padding: "4px 14px",
              fontFamily: theme.typography.mono,
              fontSize: 14,
              fontWeight: 800,
              boxShadow: "2.5px 2.5px 0px #000000",
            }}
          >
            {verdictBadge}
          </div>

          {/* Bulleted Points */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {points.map((pt, idx) => {
              const ptDelay = 8 + idx * 5;
              const ptSpring = spring({
                frame: frame - ptDelay,
                fps,
                config: { damping: 14, stiffness: 120 },
              });

              return (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    opacity: interpolate(ptSpring, [0, 1], [0, 1]),
                    transform: `translateX(${interpolate(ptSpring, [0, 1], [-12, 0])}px)`,
                  }}
                >
                  <span style={{ fontSize: 18 }}>⚠️</span>
                  <span
                    style={{
                      fontFamily: theme.typography.ui,
                      fontSize: 20,
                      fontWeight: 700,
                      color: "#1e293b",
                      lineHeight: 1.3,
                    }}
                  >
                    {pt}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </SceneLayout>
  );
};

