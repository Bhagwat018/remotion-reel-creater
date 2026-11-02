import React from "react";
import { PillsSceneProps } from "../schema";
import { SceneLayout } from "../components/SceneLayout";
import { Pill } from "../components/Pill";
import { MotionDirection } from "../lib/directionalMotion";
import { ZeptoValuationScene } from "./startup/ZeptoValuationScene";
import { SellOrHoldScene } from "./beginnerIpo/SellOrHoldScene";
import { BombayGmpScene } from "./bombayCoated/BombayGmpScene";
import { RedFlagsScene } from "./digitalArrest/RedFlagsScene";
import { HiddenFeesTipScene } from "./darkStore/HiddenFeesTipScene";
import { FailureIsDataScene } from "./zeptoStory/FailureIsDataScene";
import { UpiBillCheckTipScene } from "./upiFree/UpiBillCheckTipScene";

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
  // Bespoke scene for UPI Bill Check Tip
  if (slug === "upi-free-secret" || id === "s6-bill-tip") {
    return <UpiBillCheckTipScene durationInFrames={durationInFrames} />;
  }

  // Bespoke scene for Zepto Failure Is Data Tip
  if (slug === "zepto-fail-to-unicorn" || id === "s6-fail-data") {
    return <FailureIsDataScene durationInFrames={durationInFrames} />;
  }

  // Bespoke scene for Dark Store Hidden Fees Tip
  if (slug === "dark-store-delivery" || id === "s6-tip") {
    return <HiddenFeesTipScene durationInFrames={durationInFrames} />;
  }

  // Bespoke scene for Digital Arrest Red Flags
  if (slug === "digital-arrest-scam" || id === "s4-red-flags") {
    return <RedFlagsScene durationInFrames={durationInFrames} />;
  }

  // Bespoke scene for Bombay Coated GMP Rumor
  if (slug === "bombay-coated-ipo-last-day" || id === "s4-gmp-rumor") {
    return <BombayGmpScene durationInFrames={durationInFrames} />;
  }

  // Bespoke scene for Sell ya Hold (Beginner IPOs)
  if (slug === "ipo-4-beginner-questions" || id === "s4-sell-hold" && headline?.includes("HOLD")) {
    return <SellOrHoldScene durationInFrames={durationInFrames} />;
  }

  // Bespoke full-screen scene for Zepto Valuation Gap & IPO freeze
  if (id === "s2-zepto" || (slug === "startup-ipos-delayed-2027" && id?.includes("zepto"))) {
    return <ZeptoValuationScene durationInFrames={durationInFrames} />;
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
