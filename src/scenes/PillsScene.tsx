import React from "react";
import { PillsSceneProps } from "../schema";
import { SceneLayout } from "../components/SceneLayout";
import { Pill } from "../components/Pill";
import { MotionDirection } from "../lib/directionalMotion";

export const PillsScene: React.FC<
  PillsSceneProps & { pills?: string[]; durationInFrames: number; direction?: MotionDirection; id?: string }
> = ({ id, direction, leadIn, headline, items, pills, durationInFrames }) => {
  const pillList = items && items.length > 0 ? items : pills || [];

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

        {pillList.length <= 3 && (
          <div
            style={{
              alignSelf: "center",
              marginTop: 14,
              backgroundColor: "#fef08a",
              border: "3px solid #000000",
              borderRadius: 16,
              padding: "12px 28px",
              boxShadow: "4px 4px 0px #000000",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span style={{ color: "#16a34a", fontSize: 24, fontWeight: 900 }}>⚡</span>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 20,
                fontWeight: 800,
                color: "#000000",
                letterSpacing: "0.02em",
              }}
            >
              KEY HIGHLIGHTS LOCKED
            </span>
          </div>
        )}
      </div>
    </SceneLayout>
  );
};
