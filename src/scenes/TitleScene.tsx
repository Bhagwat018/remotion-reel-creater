import React from "react";
import { TitleSceneProps } from "../schema";
import { SceneLayout } from "../components/SceneLayout";

export const TitleScene: React.FC<
  TitleSceneProps & { subtitle?: string; durationInFrames: number }
> = ({ leadIn, subtitle, headline, durationInFrames }) => {
  return (
    <SceneLayout
      leadIn={leadIn || subtitle}
      headline={headline}
      durationInFrames={durationInFrames}
    />
  );
};
