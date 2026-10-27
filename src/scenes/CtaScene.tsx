import React from "react";
import { CtaSceneProps } from "../schema";
import { SceneLayout } from "../components/SceneLayout";
import { Cursor } from "../components/Cursor";
import { NeoBigButton } from "../components/neo/NeoBigButton";
import { NeoTopPill } from "../components/neo/NeoTopPill";
import { MotionDirection } from "../lib/directionalMotion";

export const CtaScene: React.FC<
  CtaSceneProps & { callToAction?: string; durationInFrames: number; direction?: MotionDirection; id?: string }
> = ({ id, direction, leadIn, headline, buttonText, callToAction, durationInFrames }) => {
  const effectiveButtonText = buttonText || callToAction || "COMMENT 'CODE' 💬";

  return (
    <SceneLayout
      id={id}
      direction={direction}
      leadIn={leadIn}
      headline={headline}
      durationInFrames={durationInFrames}
    >
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 26,
          marginTop: 10,
        }}
      >
        <NeoTopPill text="@techwith.GenZ" color="orange" delayFrames={2} />

        <NeoBigButton
          text={effectiveButtonText}
          subtext="DROP A COMMENT TO GET CODE & ARCHITECTURE 🚀"
          bg="#ec4899"
          color="#ffffff"
          rotate={-2.5}
          delayFrames={4}
        />

        {/* Vector cursor flying in and clicking the button */}
        <Cursor
          startX={260}
          startY={180}
          targetX={120}
          targetY={30}
          moveStartFrame={12}
          moveDuration={24}
          clickFrame={36}
        />
      </div>
    </SceneLayout>
  );
};
