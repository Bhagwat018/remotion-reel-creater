import React from "react";
import { StampSceneProps } from "../schema";
import { SceneLayout } from "../components/SceneLayout";
import { Stamp } from "../components/Stamp";

export const StampScene: React.FC<StampSceneProps & { durationInFrames: number }> = ({
  leadIn,
  headline,
  stampText,
  durationInFrames,
}) => {
  return (
    <SceneLayout
      leadIn={leadIn}
      headline={headline}
      durationInFrames={durationInFrames}
    >
      <Stamp stampText={stampText} delayFrames={8} />
    </SceneLayout>
  );
};
