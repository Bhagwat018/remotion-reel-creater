import React from "react";
import { CompareSceneProps } from "../schema";
import { SceneLayout } from "../components/SceneLayout";
import { NeoComparison } from "../components/neo/NeoComparison";
import { MotionDirection } from "../lib/directionalMotion";

export const CompareScene: React.FC<
  CompareSceneProps & {
    leftLabel?: string;
    rightLabel?: string;
    leftTitle?: string;
    rightTitle?: string;
    leftItems?: string[];
    rightItems?: string[];
    leftBadge?: string;
    rightBadge?: string;
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
  leftTitle,
  rightTitle,
  leftItems,
  rightItems,
  leftBadge,
  rightBadge,
  durationInFrames,
}) => {
  const parseSide = (
    obj?: Record<string, unknown> | null,
    labelStr?: string,
    titleProp?: string,
    itemsProp?: string[],
    badgeProp?: string,
    defaultLabel = "Strategy A"
  ) => {
    const title = (obj?.label as string) || (obj?.title as string) || titleProp || labelStr || defaultLabel;
    const items = (obj?.items as string[]) || (obj?.points as string[]) || itemsProp || ["Key Highlight", "Performance Metric"];
    const badge = (obj?.badge as string) || badgeProp || undefined;

    return {
      title,
      badge,
      points: items.length > 0 ? items : ["Key Advantage"],
    };
  };

  const leftItem = parseSide(left, leftLabel, leftTitle, leftItems, leftBadge, "Standard Approach");
  const rightItem = parseSide(right, rightLabel, rightTitle, rightItems, rightBadge, "Winning Strategy");

  return (
    <SceneLayout
      id={id}
      direction={direction}
      leadIn={leadIn || "SIDE-BY-SIDE"}
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
