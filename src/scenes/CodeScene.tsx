import React from "react";
import { CodeSceneProps } from "../schema";
import { SceneLayout } from "../components/SceneLayout";
import { CodeWindow } from "../components/CodeWindow";
import { MotionDirection } from "../lib/directionalMotion";

export const CodeScene: React.FC<
  CodeSceneProps & { durationInFrames: number; direction?: MotionDirection; id?: string }
> = ({
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
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 18,
          marginTop: 6,
        }}
      >
        <CodeWindow
          filename={filename}
          lines={lines}
          highlightLines={highlightLines}
          delayFrames={6}
        />

        {/* Live Terminal Output Bar */}
        <div
          style={{
            width: "100%",
            maxWidth: 920,
            backgroundColor: "#ffffff",
            border: "3.5px solid #000000",
            borderRadius: 18,
            padding: "14px 24px",
            boxShadow: "5px 5px 0px #000000",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 20,
            fontWeight: 800,
            boxSizing: "border-box",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ color: "#16a34a" }}>● LIVE</span>
            <span style={{ color: "#000000" }}>$ tsx {filename || "security.ts"}</span>
          </div>
          <div
            style={{
              backgroundColor: "#dcfce7",
              color: "#15803d",
              border: "2px solid #000000",
              borderRadius: 8,
              padding: "4px 12px",
              fontSize: 16,
              fontWeight: 800,
              boxShadow: "2px 2px 0px #000000",
            }}
          >
            STATUS: 200 OK
          </div>
        </div>

        {/* Security Defense Chips Row */}
        <div style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
          <div
            style={{
              backgroundColor: "#fee2e2",
              border: "2.5px solid #000000",
              borderRadius: 12,
              padding: "8px 18px",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 18,
              fontWeight: 800,
              color: "#dc2626",
              boxShadow: "3px 3px 0px #000000",
            }}
          >
            🛡️ ZERO-DAY DEFENSE ACTIVE
          </div>
          <div
            style={{
              backgroundColor: "#fef08a",
              border: "2.5px solid #000000",
              borderRadius: 12,
              padding: "8px 18px",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 18,
              fontWeight: 800,
              color: "#000000",
              boxShadow: "3px 3px 0px #000000",
            }}
          >
            ⚡ SUB-MS KILL SWITCH
          </div>
        </div>
      </div>
    </SceneLayout>
  );
};
