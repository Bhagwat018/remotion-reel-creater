import React from "react";
import { SceneLayout } from "../components/SceneLayout";
import { ArchitectureFlow, FlowNode } from "../components/ArchitectureFlow";
import { MotionDirection } from "../lib/directionalMotion";

export interface FlowSceneProps {
  id?: string;
  type?: "flow";
  headline?: string;
  leadIn?: string;
  nodes?: FlowNode[];
  steps?: FlowNode[];
  flow?: FlowNode[];
  durationInFrames: number;
  direction?: MotionDirection;
  brand?: string;
}

export const FlowScene: React.FC<FlowSceneProps> = ({
  id,
  direction,
  leadIn = "ARCHITECTURE PIPELINE",
  headline = "HIGH-THROUGHPUT *SYSTEM*",
  nodes,
  steps,
  flow,
  brand,
  durationInFrames,
}) => {
  const resolvedNodes = nodes || steps || flow;

  return (
    <SceneLayout
      id={id}
      direction={direction}
      leadIn={leadIn}
      headline={headline}
      brand={brand}
      durationInFrames={durationInFrames}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
          marginTop: 10,
        }}
      >
        <ArchitectureFlow nodes={resolvedNodes} delayFrames={4} />
      </div>
    </SceneLayout>
  );
};
