import React from "react";
import { CardSceneProps } from "../schema";
import { SceneLayout } from "../components/SceneLayout";
import { DarkCard } from "../components/DarkCard";

export const CardScene: React.FC<CardSceneProps & { durationInFrames: number }> = ({
  leadIn,
  headline,
  cardText,
  chip,
  durationInFrames,
}) => {
  return (
    <SceneLayout
      leadIn={leadIn}
      headline={headline}
      durationInFrames={durationInFrames}
    >
      <DarkCard cardText={cardText} chip={chip} delayFrames={6} />
    </SceneLayout>
  );
};
