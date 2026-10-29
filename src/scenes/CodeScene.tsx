import React from "react";
import { CodeSceneProps } from "../schema";
import { SceneLayout } from "../components/SceneLayout";
import { CodeSynthesizer } from "../components/CodeSynthesizer";
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
  const fname = filename || "script.ts";
  const runner = fname.endsWith(".py")
    ? "python3"
    : fname.endsWith(".sh") || fname.endsWith(".bash")
    ? "bash"
    : fname.endsWith(".go")
    ? "go run"
    : fname.endsWith(".rs")
    ? "cargo run"
    : "node";

  return (
    <SceneLayout
      id={id}
      direction={direction}
      leadIn={leadIn || "CODE SYNTHESIZER"}
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
        <CodeSynthesizer
          filename={fname}
          lines={lines}
          highlightLines={highlightLines}
          delayFrames={5}
          charsPerFrame={1.5}
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
            <span style={{ color: "#000000" }}>$ {runner} {fname}</span>
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
            EXECUTION: OK
          </div>
        </div>

        {/* Dynamic Execution Context Chips */}
        <div style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
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
            ⚡ SYNTAX HIGHLIGHTED
          </div>
          <div
            style={{
              backgroundColor: "#e0e7ff",
              border: "2.5px solid #000000",
              borderRadius: 12,
              padding: "8px 18px",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 18,
              fontWeight: 800,
              color: "#3730a3",
              boxShadow: "3px 3px 0px #000000",
            }}
          >
            ✔ PRODUCTION READY SCRIPT
          </div>
        </div>
      </div>
    </SceneLayout>
  );
};
