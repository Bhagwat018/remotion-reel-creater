import React from "react";
import { useCurrentFrame } from "remotion";
import { CtaSceneProps } from "../schema";
import { SceneLayout } from "../components/SceneLayout";
import { Cursor } from "../components/Cursor";
import { NeoBigButton } from "../components/neo/NeoBigButton";
import { NeoTopPill } from "../components/neo/NeoTopPill";
import { MotionDirection } from "../lib/directionalMotion";
import { StarburstBadge } from "../components/StarburstBadge";
import { StartupBattlePoll } from "../components/startup/StartupBattlePoll";

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

  // Bespoke interactive poll scene for Startup IPO Delays
  if (id === "s5-cta" || slug === "startup-ipos-delayed-2027") {
    return (
      <SceneLayout
        id={id}
        direction={direction}
        leadIn={leadIn || "COMMUNITY POLL"}
        headline={headline}
        durationInFrames={durationInFrames}
        slug={slug}
        showTechBadge={false}
      >
        <StartupBattlePoll handle={resolvedHandle} delayFrames={2} />
      </SceneLayout>
    );
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
