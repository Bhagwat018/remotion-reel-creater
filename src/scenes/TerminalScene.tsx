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
  lines?: (string | TerminalOutputLine)[];
  durationInFrames?: number;
}

export const TerminalScene: React.FC<TerminalSceneProps> = ({
  id,
  direction,
  leadIn,
  headline = "RUN *CLAUDE* AGENT",
  command: explicitCommand,
  path = "~/dev/project",
  branch = "main",
  output: explicitOutput,
  lines,
  durationInFrames = 150,
}) => {
  // Support either explicit command/output or raw "lines" array
  let resolvedCommand = explicitCommand || "ipo-calendar --listing";
  let resolvedOutput = explicitOutput;

  if (lines && lines.length > 0 && !explicitOutput) {
    const first = lines[0];
    const firstText = typeof first === "string" ? first : first.text;
    if (firstText.startsWith("$") || firstText.startsWith(">")) {
      resolvedCommand = firstText.replace(/^[$>]\s*/, "");
      resolvedOutput = lines.slice(1);
    } else {
      resolvedOutput = lines;
    }
  }

  const finalOutput = resolvedOutput || [
    { text: "✓ Loaded anthropic/claude-3-5-sonnet", type: "success" },
    { text: "➜ 14 files indexed & parsed", type: "info" },
    { text: "⚡ Autonomous build passing (100%)", type: "success" },
  ];
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
          command={resolvedCommand}
          path={path}
          branch={branch}
          output={finalOutput}
          delayFrames={4}
        />
      </div>
    </SceneLayout>
  );
};

