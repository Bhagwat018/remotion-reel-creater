import React from "react";
import { SceneLayout } from "../components/SceneLayout";
import { NeoStackedCards, StackedCardItem } from "../components/neo/NeoStackedCards";
import { NeoMultiStepPipeline } from "../components/neo/NeoMultiStepPipeline";
import { MotionDirection } from "../lib/directionalMotion";

export interface StackedSceneProps {
  id?: string;
  leadIn?: string;
  headline?: string;
  durationInFrames: number;
  direction?: MotionDirection;
  cards?: StackedCardItem[];
  isPipeline?: boolean;
}

export const StackedScene: React.FC<StackedSceneProps> = ({
  id,
  direction,
  leadIn,
  headline,
  cards,
  isPipeline = false,
  durationInFrames,
}) => {
  return (
    <SceneLayout
      id={id}
      direction={direction}
      leadIn={leadIn || "ARCHITECTURE ⚙️"}
      headline={headline}
      durationInFrames={durationInFrames}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        {isPipeline ? (
          <NeoMultiStepPipeline delayFrames={4} />
        ) : (
          <NeoStackedCards cards={cards} delayFrames={4} />
        )}
      </div>
    </SceneLayout>
  );
};
