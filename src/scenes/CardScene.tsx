import React from "react";
import { CardSceneProps } from "../schema";
import { SceneLayout } from "../components/SceneLayout";
import { DarkCard } from "../components/DarkCard";
import { FloatingBadge } from "../components/FloatingBadge";

export const CardScene: React.FC<CardSceneProps & { durationInFrames: number; icon?: string; featuredBadge?: any }> = ({
  leadIn,
  headline,
  cardText,
  chip,
  icon,
  featuredBadge,
  durationInFrames,
}) => {
  // If featuredBadge or icon is provided, render 3D floating badge
  const hasBadge = !!(icon || featuredBadge);

  return (
    <SceneLayout
      leadIn={leadIn}
      headline={headline}
      durationInFrames={durationInFrames}
    >
      {hasBadge ? (
        <div style={{ display: "flex", justifyContent: "center", width: "100%", marginTop: 20 }}>
          <FloatingBadge
            icon={featuredBadge?.icon || icon}
            title={featuredBadge?.title || cardText}
            subtitle={featuredBadge?.subtitle || (cardText !== featuredBadge?.title ? cardText : undefined)}
            chip={featuredBadge?.chip || chip}
            delayFrames={4}
          />
        </div>
      ) : (
        <DarkCard cardText={cardText} chip={chip} delayFrames={6} />
      )}
    </SceneLayout>
  );
};
