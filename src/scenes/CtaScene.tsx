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
import { IncognitoCtaScene } from "./incognito/IncognitoCtaScene";
import { QrCtaScene } from "./qrcode/QrCtaScene";
import { AtmCtaScene } from "./atm/AtmCtaScene";
import { AirplaneCtaScene } from "./airplane/AirplaneCtaScene";
import { MetaCtaScene } from "./metacode/MetaCtaScene";
import { MarketCtaDebateScene } from "./market/MarketCtaDebateScene";

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
    brollVideo?: string;
    bgImage?: string;
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
  brollVideo,
  bgImage,
}) => {
    const frame = useCurrentFrame();
    const resolvedHandle = handle || "@techwith.genz";

    // Bespoke scene for Share Market Viral Debate CTA
    if (slug === "how-share-market-really-works" || (headline && headline.includes("JUA YA REAL INVESTMENT"))) {
      return (
        <MarketCtaDebateScene
          id={id}
          leadIn={leadIn}
          headline={headline}
          brollVideo={brollVideo}
          durationInFrames={durationInFrames}
        />
      );
    }

    // Bespoke scene for 100% Code Meta Video CTA
    if (slug === "this-video-is-100-percent-code" || (headline && headline.includes("CODE SE VIDEOS BANTI HAIN"))) {
      return (
        <MetaCtaScene
          id={id}
          leadIn={leadIn}
          headline={headline}
          brollVideo={brollVideo}
          durationInFrames={durationInFrames}
        />
      );
    }

    // Bespoke scene for Airplane Mode CTA
    if (slug === "why-airplane-mode-on-flights" || (headline && headline.includes("SAVE PILOT'S EARS"))) {
      return (
        <AirplaneCtaScene
          id={id}
          leadIn={leadIn}
          headline={headline}
          brollVideo={brollVideo}
          durationInFrames={durationInFrames}
        />
      );
    }

    // Bespoke scene for ATM Fake Note CTA
    if (slug === "how-atm-detects-fake-notes" || (headline && headline.includes("DECODE SYSTEM SECRETS"))) {
      return (
        <AtmCtaScene
          id={id}
          leadIn={leadIn}
          headline={headline}
          brollVideo={brollVideo}
          durationInFrames={durationInFrames}
        />
      );
    }

    // Bespoke scene for QR Code CTA
    if (slug === "how-qr-code-error-correction-works" || (headline && headline.includes("@_CRACKWITHCODE"))) {
      return (
        <QrCtaScene
          id={id}
          leadIn={leadIn}
          headline={headline}
          brollVideo={brollVideo}
          durationInFrames={durationInFrames}
        />
      );
    }

    // Bespoke scene for Incognito Real Privacy CTA
    if (slug === "the-truth-about-incognito-mode" || (headline && headline.includes("VPN"))) {
      return (
        <IncognitoCtaScene
          id={id}
          leadIn={leadIn}
          headline={headline}
          brollVideo={brollVideo}
          durationInFrames={durationInFrames}
        />
      );
    }

    // Bespoke scene for UPI CTA
    if (slug === "upi-free-secret" || slug === "is-upi-really-free-hidden-charges") {
      return <UpiCtaScene durationInFrames={durationInFrames} />;
    }

    // Bespoke scene for Zepto Failure CTA
    if (slug === "zepto-fail-to-unicorn") {
      return <ZeptoCtaScene durationInFrames={durationInFrames} />;
    }

    // Bespoke scene for Dark Store Summary & Follow CTA
    if (slug === "dark-store-delivery" || slug === "zepto-blinkit-dark-store-economics") {
      return <DarkStoreCtaScene durationInFrames={durationInFrames} />;
    }

    // Bespoke scene for Digital Arrest Parents CTA
    if (slug === "digital-arrest-scam" || slug === "digital-arrest-scam-reality-check") {
      return <ParentsCtaScene durationInFrames={durationInFrames} />;
    }

    // Bespoke scene for Bombay Coated Verdict & CTA
    if (slug === "bombay-coated-ipo-last-day") {
      return <BombayCtaScene durationInFrames={durationInFrames} />;
    }

    // Bespoke scene for Beginner IPO 4 Questions / SME Allotment Trap
    if (slug === "ipo-4-beginner-questions" || slug === "sme-ipo-500x-allotment-trap") {
      return <BeginnerCtaScene durationInFrames={durationInFrames} handle={resolvedHandle} />;
    }

    // Bespoke full-screen interactive poll scene for Startup IPO Delays
    if (slug === "startup-ipos-delayed-2027") {
      return <StartupPollScene durationInFrames={durationInFrames} handle={resolvedHandle} />;
    }

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
        brollVideo={brollVideo}
        bgImage={bgImage}
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
