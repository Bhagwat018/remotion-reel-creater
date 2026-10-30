import React from "react";
import { OrbitSceneProps } from "../schema";
import { SceneLayout } from "../components/SceneLayout";
import { OrbitLoop } from "../components/OrbitLoop";
import { MotionDirection } from "../lib/directionalMotion";
import { MarketStormCard } from "../components/startup/MarketStormCard";

export const OrbitScene: React.FC<
  OrbitSceneProps & {
    orbiting?: string[];
    center?: string;
    durationInFrames: number;
    direction?: MotionDirection;
    id?: string;
    slug?: string;
  }
> = ({ id, direction, leadIn, headline, nodes, orbiting, center, durationInFrames, slug }) => {
  // Bespoke scene for PhonePe SEBI Approval vs Market Volatility Storm
  if (id === "s3-phonepe" || (slug === "startup-ipos-delayed-2027" && id?.includes("phonepe"))) {
    return (
      <SceneLayout
        id={id}
        direction={direction}
        leadIn={leadIn || "FINTECH MARKET RADAR"}
        headline={headline}
        durationInFrames={durationInFrames}
        slug={slug}
        showTechBadge={false}
      >
        <MarketStormCard delayFrames={2} />
      </SceneLayout>
    );
  }

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
