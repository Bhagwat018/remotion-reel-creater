import React from "react";
import { CardSceneProps } from "../schema";
import { SceneLayout } from "../components/SceneLayout";
import { DarkCard } from "../components/DarkCard";
import { FloatingBadge } from "../components/FloatingBadge";
import { MotionDirection } from "../lib/directionalMotion";

export const CardScene: React.FC<
  CardSceneProps & {
    durationInFrames: number;
    icon?: string;
    featuredBadge?: { icon?: string; title?: string; subtitle?: string; chip?: string };
    direction?: MotionDirection;
    id?: string;
  }
> = ({
  id,
  direction,
  leadIn,
  headline,
  cardText,
  chip,
  icon,
  featuredBadge,
  durationInFrames,
}) => {
  const hasBadge = !!(icon || featuredBadge);
  const badgeTitle = featuredBadge?.title || (icon ? icon.toUpperCase() : cardText);
  const badgeSubtitle = featuredBadge?.subtitle;
  const showDetailCard = Boolean(cardText && cardText !== badgeTitle);

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
