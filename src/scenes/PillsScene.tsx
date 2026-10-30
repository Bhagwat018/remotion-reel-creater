import React from "react";
import { PillsSceneProps } from "../schema";
import { SceneLayout } from "../components/SceneLayout";
import { Pill } from "../components/Pill";
import { MotionDirection } from "../lib/directionalMotion";
import { ValuationGapCard } from "../components/startup/ValuationGapCard";

export const PillsScene: React.FC<
  PillsSceneProps & {
    pills?: string[];
    badgeText?: string;
    subtext?: string;
    durationInFrames: number;
    direction?: MotionDirection;
    id?: string;
    slug?: string;
  }
> = ({ id, direction, leadIn, headline, items, pills, badgeText, subtext, durationInFrames, slug }) => {
  // Bespoke scene for Zepto Valuation Gap & IPO freeze
  if (id === "s2-zepto" || (slug === "startup-ipos-delayed-2027" && id?.includes("zepto"))) {
    return (
      <SceneLayout
        id={id}
        direction={direction}
        leadIn={leadIn || "QUICK COMMERCE GIANT"}
        headline={headline}
        durationInFrames={durationInFrames}
        slug={slug}
        showTechBadge={false}
      >
        <ValuationGapCard delayFrames={2} />
      </SceneLayout>
    );
  }

  const pillList = items && items.length > 0 ? items : pills || [];
  const displayBadge = badgeText || subtext || "OFFICIAL TIMELINE LOCKED";

  return (
    <SceneLayout
      id={id}
      direction={direction}
      leadIn={leadIn}
      headline={headline}
      durationInFrames={durationInFrames}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
          width: "100%",
          maxWidth: 860,
          alignItems: "stretch",
        }}
      >
        {pillList.map((item, index) => (
          <Pill key={index} text={item} index={index} showSparkle />
        ))}

        {pillList.length <= 3 && (
          <div
            style={{
              alignSelf: "center",
              marginTop: 14,
              backgroundColor: "#fef08a",
              border: "3px solid #000000",
              borderRadius: 16,
              padding: "12px 28px",
              boxShadow: "4px 4px 0px #000000",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span style={{ color: "#16a34a", fontSize: 24, fontWeight: 900 }}>⚡</span>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 20,
                fontWeight: 800,
                color: "#000000",
                letterSpacing: "0.02em",
              }}
            >
              {displayBadge}
            </span>
          </div>
        )}
      </div>
    </SceneLayout>
  );
};
