import React from "react";
import { CodeSceneProps } from "../schema";
import { SceneLayout } from "../components/SceneLayout";
import { CodeWindow } from "../components/CodeWindow";

export const CodeScene: React.FC<CodeSceneProps & { durationInFrames: number; direction?: any; id?: string }> = ({
  id,
  direction,
  leadIn,
  headline,
  filename,
  lines,
  highlightLines,
  durationInFrames,
}) => {
  return (
    <SceneLayout
      id={id}
      direction={direction}
      leadIn={leadIn}
      headline={headline}
      durationInFrames={durationInFrames}
    >
      <CodeWindow
        filename={filename}
        lines={lines}
        highlightLines={highlightLines}
        delayFrames={6}
      />
    </SceneLayout>
  );
};
