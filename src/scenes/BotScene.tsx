import React from "react";
import { SceneLayout } from "../components/SceneLayout";
import { NeoTechBot } from "../components/neo/NeoTechBot";
import { NeoStrikeBadges } from "../components/neo/NeoStrikeBadges";
import { MotionDirection } from "../lib/directionalMotion";

export interface BotSceneProps {
  id?: string;
  leadIn?: string;
  headline?: string;
  durationInFrames: number;
  direction?: MotionDirection;
  strikes?: string[];
  confirmText?: string;
  expression?: "happy" | "winking" | "curious";
}

export const BotScene: React.FC<BotSceneProps> = ({
  id,
  direction,
  leadIn,
  headline,
  strikes = ["draw", "Photoshop", "animator"],
  confirmText = "1 prompt",
  expression = "happy",
  durationInFrames,
}) => {
  return (
    <SceneLayout
      id={id}
      direction={direction}
      leadIn={leadIn || "GENERATIVE AI 🤖"}
      headline={headline || "1 PROMPT. DONE."}
      durationInFrames={durationInFrames}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
          width: "100%",
        }}
      >
        <NeoTechBot size={280} expression={expression} delayFrames={2} />
        <NeoStrikeBadges
          strikes={strikes}
          confirmText={confirmText}
          delayFrames={8}
        />
      </div>
    </SceneLayout>
  );
};
