import React from "react";
import { PillsSceneProps } from "../schema";
import { SceneLayout } from "../components/SceneLayout";
import { Pill } from "../components/Pill";

export const PillsScene: React.FC<
  PillsSceneProps & { pills?: string[]; durationInFrames: number }
> = ({ leadIn, headline, items, pills, durationInFrames }) => {
  const pillList = items && items.length > 0 ? items : pills || [];

  return (
    <SceneLayout
      leadIn={leadIn}
      headline={headline}
      durationInFrames={durationInFrames}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
          width: "100%",
          maxWidth: 860,
          alignItems: "stretch",
        }}
      >
        {pillList.map((item, index) => (
          <Pill key={index} text={item} index={index} showSparkle />
        ))}
      </div>
    </SceneLayout>
  );
};
