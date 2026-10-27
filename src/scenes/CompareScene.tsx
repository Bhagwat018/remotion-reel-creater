import React from "react";
import { CompareSceneProps } from "../schema";
import { SceneLayout } from "../components/SceneLayout";
import { NeoComparison } from "../components/neo/NeoComparison";
import { MotionDirection } from "../lib/directionalMotion";

export const CompareScene: React.FC<
  CompareSceneProps & {
    leftLabel?: string;
    rightLabel?: string;
    durationInFrames: number;
    direction?: MotionDirection;
    id?: string;
  }
> = ({
  id,
  direction,
  leadIn,
  headline,
  left,
  right,
  leftLabel,
  rightLabel,
  durationInFrames,
}) => {
  const parseSide = (
    obj?: { label: string; items?: string[]; badge?: string },
    labelStr?: string,
    defaultLabel = "Option"
  ) => {
    if (obj && obj.label) {
      return {
        title: obj.label,
        badge: obj.badge,
        points: obj.items && obj.items.length > 0 ? obj.items : ["Standard setup"],
      };
    }
    if (!labelStr) return { title: defaultLabel, points: ["Standard setup"] };

    const match = labelStr.match(/^(.*?)\s*\((.*?)\)$/);
    if (match) {
      return {
        title: match[1].trim(),
        points: [match[2].trim()],
      };
    }
    return {
      title: labelStr,
      points: ["Configured defaults"],
    };
  };

  const leftItem = parseSide(left, leftLabel, "Traditional Method");
  const rightItem = parseSide(right, rightLabel, "Modern Architecture");

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
        <NeoComparison
          left={{
            ...leftItem,
            badge: leftItem.badge || "SLOW & COSTLY",
            bg: "#ffffff",
            isWinner: false,
          }}
          right={{
            ...rightItem,
            badge: rightItem.badge || "10X SCALABLE",
            bg: "#ffffff",
            isWinner: true,
          }}
          delayFrames={4}
        />
      </div>
    </SceneLayout>
  );
};
