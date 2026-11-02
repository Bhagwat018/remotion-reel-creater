import React from "react";
import { useCurrentFrame } from "remotion";
import { CtaSceneProps } from "../schema";
import { SceneLayout } from "../components/SceneLayout";
import { Cursor } from "../components/Cursor";
import { NeoBigButton } from "../components/neo/NeoBigButton";
import { NeoTopPill } from "../components/neo/NeoTopPill";
import { MotionDirection } from "../lib/directionalMotion";
import { StarburstBadge } from "../components/StarburstBadge";
import { StartupPollScene } from "./startup/StartupPollScene";
import { BeginnerCtaScene } from "./beginnerIpo/BeginnerCtaScene";
import { BombayCtaScene } from "./bombayCoated/BombayCtaScene";
import { ParentsCtaScene } from "./digitalArrest/ParentsCtaScene";
import { DarkStoreCtaScene } from "./darkStore/DarkStoreCtaScene";
import { ZeptoCtaScene } from "./zeptoStory/ZeptoCtaScene";
import { UpiCtaScene } from "./upiFree/UpiCtaScene";

export const CtaScene: React.FC<
  CtaSceneProps & {
    callToAction?: string;
    durationInFrames: number;
    direction?: MotionDirection;
    id?: string;
    handle?: string;
    subtitle?: string;
    badgeText?: string;
    badgeSubtext?: string;
    slug?: string;
  }
> = ({
  id,
  direction,
  leadIn,
  headline,
  buttonText,
  callToAction,
  handle,
  subtitle,
  badgeText,
  badgeSubtext,
  durationInFrames,
  slug,
}) => {
  const resolvedHandle = handle || "@techwith.GenZ";

  // Bespoke scene for UPI CTA
  if (slug === "upi-free-secret" || (id === "s7-cta" && resolvedHandle === "@techwith.GenZ" && !headline?.includes("FAILURE") && !headline?.includes("DARK"))) {
    return <UpiCtaScene durationInFrames={durationInFrames} />;
  }

  // Bespoke scene for Zepto Failure CTA
  if (slug === "zepto-fail-to-unicorn" || (id === "s7-cta" && headline?.includes("FAILURE"))) {
    return <ZeptoCtaScene durationInFrames={durationInFrames} />;
  }

  // Bespoke scene for Dark Store Summary & Follow CTA
  if (slug === "dark-store-delivery" || id === "s7-cta") {
    return <DarkStoreCtaScene durationInFrames={durationInFrames} />;
  }

  // Bespoke scene for Digital Arrest Parents CTA
  if (slug === "digital-arrest-scam" || id === "s7-parents-cta") {
    return <ParentsCtaScene durationInFrames={durationInFrames} />;
  }

  // Bespoke scene for Bombay Coated Verdict & CTA
  if (slug === "bombay-coated-ipo-last-day" || id === "s7-verdict-cta") {
    return <BombayCtaScene durationInFrames={durationInFrames} />;
  }

  // Bespoke scene for Beginner IPO 4 Questions
  if (slug === "ipo-4-beginner-questions" || id === "s6-cta" && headline?.includes("TECHWITH.GENZ")) {
    return <BeginnerCtaScene durationInFrames={durationInFrames} handle={resolvedHandle} />;
  }

  // Bespoke full-screen interactive poll scene for Startup IPO Delays
  if (id === "s5-cta" || slug === "startup-ipos-delayed-2027") {
    return <StartupPollScene durationInFrames={durationInFrames} handle={resolvedHandle} />;
  }

  const frame = useCurrentFrame();
  const effectiveButtonText = buttonText || callToAction || "FOLLOW NOW 🔥";
  const clickFrame = 36;
  const isDepressed = frame >= clickFrame && frame <= clickFrame + 6;

  const resolvedSubtext = subtitle ? subtitle.toUpperCase() : "LIVE TECH & MARKET UPDATES ⚡";
  const resolvedBadgeText = badgeText || "DAILY";
  const resolvedBadgeSubtext = badgeSubtext || "ALERTS";

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
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 24,
          marginTop: 10,
        }}
      >
        <NeoTopPill text={resolvedHandle} color="orange" delayFrames={2} />

        <div
          style={{
            position: "relative",
            transform: isDepressed ? "translateY(5px) scale(0.97)" : "none",
            transformOrigin: "center center",
          }}
        >
          <NeoBigButton
            text={effectiveButtonText}
            subtext={resolvedSubtext}
            bg="#ec4899"
            color="#ffffff"
            rotate={-2.5}
            delayFrames={4}
          />
          <StarburstBadge
            text={resolvedBadgeText}
            subtext={resolvedBadgeSubtext}
            color="#22c55e"
            textColor="#ffffff"
            position="none"
            style={{ position: "absolute", top: -38, right: -28 }}
            delayFrames={8}
          />
        </div>

        {/* Vector cursor flying in and clicking the button */}
        <Cursor
          startX={260}
          startY={180}
          targetX={120}
          targetY={30}
          moveStartFrame={12}
          moveDuration={24}
          clickFrame={36}
        />
      </div>
    </SceneLayout>
  );
};
