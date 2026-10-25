import React from "react";
import { OrbitSceneProps } from "../schema";
import { SceneLayout } from "../components/SceneLayout";
import { OrbitLoop } from "../components/OrbitLoop";

export const OrbitScene: React.FC<
  OrbitSceneProps & { orbiting?: string[]; durationInFrames: number }
> = ({ leadIn, headline, nodes, orbiting, durationInFrames }) => {
  const nodeList = nodes && nodes.length > 0 ? nodes : orbiting || [];

  return (
    <SceneLayout
      leadIn={leadIn}
      headline={headline}
      durationInFrames={durationInFrames}
    >
      <OrbitLoop nodes={nodeList} delayFrames={6} />
    </SceneLayout>
  );
};
