import React from "react";
import { SceneLayout } from "../components/SceneLayout";
import { TerminalWindow, TerminalOutputLine } from "../components/TerminalWindow";
import { MotionDirection } from "../lib/directionalMotion";

export interface TerminalSceneProps {
  id?: string;
  direction?: MotionDirection;
  leadIn?: string;
  headline?: string;
  subheadline?: string;
  command?: string;
  path?: string;
  branch?: string;
  output?: (string | TerminalOutputLine)[];
  durationInFrames?: number;
}

export const TerminalScene: React.FC<TerminalSceneProps> = ({
  id,
  direction,
  leadIn,
  headline = "RUN *CLAUDE* AGENT",
  command = "claude run --agent",
  path = "~/dev/project",
  branch = "main",
  output = [
    { text: "✓ Loaded anthropic/claude-3-5-sonnet", type: "success" },
    { text: "➜ 14 files indexed & parsed", type: "info" },
    { text: "⚡ Autonomous build passing (100%)", type: "success" },
  ],
  durationInFrames = 150,
}) => {
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
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <TerminalWindow
          command={command}
          path={path}
          branch={branch}
          output={output}
          delayFrames={4}
        />
      </div>
    </SceneLayout>
  );
};

