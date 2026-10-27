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
              marginTop: 10,
              backgroundColor: "#22c55e",
              border: "3.5px solid #000000",
              borderRadius: 18,
              padding: "12px 28px",
              boxShadow: "5px 5px 0px #000000",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span style={{ color: "#ffffff", fontSize: 24, fontWeight: 900 }}>✓</span>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 22,
                fontWeight: 800,
                color: "#ffffff",
                letterSpacing: "-0.01em",
              }}
            >
              100% PHISHING RESISTANT
            </span>
          </div>
        )}
      </div>
    </SceneLayout>
  );
};
