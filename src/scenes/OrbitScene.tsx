import React from "react";
import { OrbitSceneProps } from "../schema";
import { SceneLayout } from "../components/SceneLayout";
import { OrbitLoop } from "../components/OrbitLoop";

export const OrbitScene: React.FC<
  OrbitSceneProps & { orbiting?: string[]; center?: string; durationInFrames: number; direction?: any; id?: string }
> = ({ id, direction, leadIn, headline, nodes, orbiting, center, durationInFrames }) => {
  const nodeList = nodes && nodes.length > 0 ? nodes : orbiting || [];

  return (
    <SceneLayout
      id={id}
      direction={direction}
      leadIn={leadIn}
      headline={headline}
      durationInFrames={durationInFrames}
    >
      <OrbitLoop nodes={nodeList} center={center} delayFrames={6} />
    </SceneLayout>
  );
};
