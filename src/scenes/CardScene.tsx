import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CardSceneProps } from "../schema";
import { SceneLayout } from "../components/SceneLayout";
import { DarkCard } from "../components/DarkCard";
import { FloatingBadge } from "../components/FloatingBadge";
import { MotionDirection } from "../lib/directionalMotion";
import { RazorpayDossierScene } from "./startup/RazorpayDossierScene";
import { GmpRealityCheckScene } from "./beginnerIpo/GmpRealityCheckScene";
import { BombayPricingScene } from "./bombayCoated/BombayPricingScene";
import { LegalRealityScene } from "./digitalArrest/LegalRealityScene";
import { DarkStoreWarehouseScene } from "./darkStore/DarkStoreWarehouseScene";
import { ProfitVsLossScene } from "./darkStore/ProfitVsLossScene";
import { KiranaKartCrashScene } from "./zeptoStory/KiranaKartCrashScene";
import { IpoPostponedScene } from "./zeptoStory/IpoPostponedScene";
import { MdrRuleScene } from "./upiFree/MdrRuleScene";
import { UpiPostponedScene } from "./upiFree/UpiPostponedScene";

export const CardScene: React.FC<
  CardSceneProps & {
    durationInFrames: number;
    icon?: string;
    featuredBadge?: { icon?: string; title?: string; subtitle?: string; chip?: string };
    bullets?: string[];
    direction?: MotionDirection;
    id?: string;
    slug?: string;
  }
> = ({
  id,
  direction,
  leadIn,
  headline,
  cardText,
  chip = "KEY HIGHLIGHT",
  icon,
  featuredBadge,
  bullets,
  durationInFrames,
  slug,
}) => {
  // Bespoke scene for NPCI 0.4% MDR Rule (UPI Reel)
  if (slug === "upi-free-secret" && id === "s3-mdr-rule" || id === "s3-mdr-rule") {
    return <MdrRuleScene durationInFrames={durationInFrames} />;
  }

  // Bespoke scene for UPI Fee Postponed (UPI Reel)
  if (slug === "upi-free-secret" && id === "s5-postponed" || id === "s5-postponed") {
    return <UpiPostponedScene durationInFrames={durationInFrames} />;
  }

  // Bespoke scene for KiranaKart Crash (Zepto Story)
  if (slug === "zepto-fail-to-unicorn" && id === "s2-kiranakart" || id === "s2-kiranakart") {
    return <KiranaKartCrashScene durationInFrames={durationInFrames} />;
  }

  // Bespoke scene for Zepto IPO Postponed (Zepto Story)
  if (slug === "zepto-fail-to-unicorn" && id === "s5-ipo-delay" || id === "s5-ipo-delay") {
    return <IpoPostponedScene durationInFrames={durationInFrames} />;
  }

  // Bespoke scene for Dark Store Micro-Warehouse
  if (slug === "dark-store-delivery" && id === "s2-warehouse" || id === "s2-warehouse") {
    return <DarkStoreWarehouseScene durationInFrames={durationInFrames} />;
  }

  // Bespoke scene for Dark Store Profit vs Loss Paradox
  if (slug === "dark-store-delivery" && id === "s5-paradox" || id === "s5-paradox") {
    return <ProfitVsLossScene durationInFrames={durationInFrames} />;
  }

  // Bespoke scene for Digital Arrest Legal Reality
  if (slug === "digital-arrest-scam" || id === "s5-legal-truth") {
    return <LegalRealityScene durationInFrames={durationInFrames} />;
  }

  // Bespoke scene for Bombay Coated Pricing Ticket
  if (slug === "bombay-coated-ipo-last-day" || id === "s2-pricing-ticket") {
    return <BombayPricingScene durationInFrames={durationInFrames} />;
  }

  // Bespoke scene for GMP Reality Check (Beginner IPOs)
  if (slug === "ipo-4-beginner-questions" || id === "s2-gmp" && headline?.includes("GMP")) {
    return <GmpRealityCheckScene durationInFrames={durationInFrames} />;
  }

  // Bespoke scene for Razorpay Confidential DRHP Dossier & 2027 Shift
  if (id === "s4-razorpay" || (slug === "startup-ipos-delayed-2027" && id?.includes("razorpay"))) {
    return <RazorpayDossierScene durationInFrames={durationInFrames} />;
  }

  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const hasBadge = !!(icon || featuredBadge);
  const badgeTitle = featuredBadge?.title || (icon ? icon.toUpperCase() : cardText);
  const badgeSubtitle = featuredBadge?.subtitle;
  const showDetailCard = Boolean(cardText && cardText !== badgeTitle);

  // If bullets are provided, render neo bullet cards
  if (bullets && bullets.length > 0) {
    const bgColors = ["#ffffff", "#fef9c3", "#eff6ff", "#f0fdf4"];
    return (
      <SceneLayout
        id={id}
        direction={direction}
        leadIn={leadIn || "KEY TAKEAWAYS"}
        headline={headline}
        durationInFrames={durationInFrames}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 18,
            width: "100%",
            maxWidth: 880,
            marginTop: 10,
          }}
        >
          {hasBadge && (
            <FloatingBadge
              icon={featuredBadge?.icon || icon}
              title={badgeTitle}
              subtitle={badgeSubtitle}
              chip={featuredBadge?.chip || chip}
              delayFrames={3}
            />
          )}

          {bullets.map((bullet, idx) => {
            const delay = (hasBadge ? 8 : 4) + idx * 5;
            const spr = spring({
              frame: Math.max(0, frame - delay),
              fps,
              config: { damping: 13, stiffness: 140 },
            });

            // Match icon by bullet text
            let bulletIcon = "📌";
            if (bullet.includes("Nov") || bullet.includes("Date")) bulletIcon = "🗓️";
            else if (bullet.includes("profit") || bullet.includes("₹") || bullet.includes("paisa") || bullet.includes("unblock")) bulletIcon = "💰";
            else if (bullet.includes("Karza") || bullet.includes("debt") || bullet.includes("scam") || bullet.includes("SCAM") || bullet.includes("Alert") || bullet.includes("OTP") || bullet.includes("PAN")) bulletIcon = "⚠️";
            else if (bullet.includes("GMP") || bullet.includes("rumor")) bulletIcon = "⚡";
            else if (bullet.includes("TRM") || bullet.includes("Labs") || bullet.includes("Chainalysis") || bullet.includes("ongoing") || bullet.includes("check")) bulletIcon = "🔍";
            else if (bullet.includes("DPRK") || bullet.includes("Korea") || bullet.includes("hack") || bullet.includes("compromise")) bulletIcon = "🚨";
            else if (bullet.includes("DM") || bullet.includes("email") || bullet.includes("click") || bullet.includes("Link") || bullet.includes("links") || bullet.includes("Fake")) bulletIcon = "🛡️";
            else if (bullet.includes("official") || bullet.includes("app") || bullet.includes("App")) bulletIcon = "🛡️";

            return (
              <div
                key={idx}
                style={{
                  width: "100%",
                  backgroundColor: bgColors[idx % bgColors.length],
                  border: "3.5px solid #000000",
                  borderRadius: 20,
                  padding: "22px 28px",
                  boxShadow: "6px 6px 0px #000000",
                  display: "flex",
                  alignItems: "center",
                  gap: 18,
                  boxSizing: "border-box",
                  transform: `scale(${spr})`,
                  opacity: spr,
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    minWidth: 48,
                    borderRadius: 14,
                    backgroundColor: "#000000",
                    color: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 24,
                  }}
                >
                  {bulletIcon}
                </div>
                <div
                  style={{
                    fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif",
                    fontSize: 30,
                    fontWeight: 800,
                    color: "#0f172a",
                    lineHeight: 1.25,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {bullet}
                </div>
              </div>
            );
          })}
        </div>
      </SceneLayout>
    );
  }

  return (
    <SceneLayout
      id={id}
      direction={direction}
      leadIn={leadIn}
      headline={headline}
      durationInFrames={durationInFrames}
    >
      {hasBadge ? (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24, width: "100%", marginTop: 10 }}>
          <FloatingBadge
            icon={featuredBadge?.icon || icon}
            title={badgeTitle}
            subtitle={badgeSubtitle}
            chip={featuredBadge?.chip || chip}
            delayFrames={4}
          />
          {showDetailCard && (
            <DarkCard cardText={cardText} chip={chip} delayFrames={10} />
          )}
        </div>
      ) : (
        <DarkCard cardText={cardText} chip={chip} delayFrames={6} />
      )}
    </SceneLayout>
  );
};
