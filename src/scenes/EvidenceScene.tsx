import React from "react";
import { SceneLayout } from "../components/SceneLayout";
import { EvidenceRenderer } from "../components/evidence/EvidenceRenderer";
import { EvidenceConfig } from "../schema";
import { MotionDirection } from "../lib/directionalMotion";

export interface EvidenceSceneProps {
  id: string;
  type: "evidence";
  headline: string;
  leadIn?: string;
  voice: string;
  direction?: MotionDirection;
  evidence: EvidenceConfig;
  durationInFrames: number;
  slug?: string;
}

export const EvidenceScene: React.FC<EvidenceSceneProps> = ({
  id,
  headline,
  leadIn,
  direction,
  evidence,
  durationInFrames,
  slug,
}) => {
  return (
    <SceneLayout
      id={id}
      direction={direction}
      leadIn={leadIn}
      headline={headline}
      durationInFrames={durationInFrames}
      slug={slug}
    >
      <EvidenceRenderer
        evidence={evidence}
        durationInFrames={durationInFrames}
      />
    </SceneLayout>
  );
};
