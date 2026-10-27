import React from "react";
import { SceneLayout } from "../components/SceneLayout";
import { NeoKnobsMatrix } from "../components/neo/NeoKnobsMatrix";
import { NeoWeightsBrain } from "../components/neo/NeoWeightsBrain";
import { MotionDirection } from "../lib/directionalMotion";

export interface KnobsSceneProps {
  id?: string;
  leadIn?: string;
  headline?: string;
  durationInFrames: number;
  direction?: MotionDirection;
  mode?: "knobs" | "weights";
  title?: string;
  pill1?: string;
  pill2?: string;
}

export const KnobsScene: React.FC<KnobsSceneProps> = ({
  id,
  direction,
  leadIn,
  headline,
  mode = "weights",
  title,
  pill1,
  pill2,
  durationInFrames,
}) => {
  return (
    <SceneLayout
      id={id}
      direction={direction}
      leadIn={leadIn || "DEEP LEARNING 🔄"}
      headline={headline || "BILLIONS OF PARAMETERS"}
      durationInFrames={durationInFrames}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        {mode === "knobs" ? (
          <NeoKnobsMatrix
            title={title || "billions of knobs 🎛️"}
            delayFrames={4}
          />
        ) : (
          <NeoWeightsBrain
            highlightText={title || "dhyaan dena 👀"}
            pill1={pill1 || "billions of numbers?!"}
            pill2={pill2 || "matlab kya? 🤔"}
            delayFrames={4}
          />
        )}
      </div>
    </SceneLayout>
  );
};
