import React from "react";
import { SceneLayout } from "../components/SceneLayout";
import { TerminalWindow, TerminalOutputLine } from "../components/TerminalWindow";
import { MotionDirection } from "../lib/directionalMotion";
import { AsbaRefundScene } from "./beginnerIpo/AsbaRefundScene";
import { BombayRealityCheckScene } from "./bombayCoated/BombayRealityCheckScene";
import { ModusOperandiScene } from "./digitalArrest/ModusOperandiScene";
import { Emergency1930Scene } from "./digitalArrest/Emergency1930Scene";
import { OrderFlowPipelineScene } from "./darkStore/OrderFlowPipelineScene";
import { TenMinutePivotScene } from "./zeptoStory/TenMinutePivotScene";
import { UpiMathBreakdownScene } from "./upiFree/UpiMathBreakdownScene";

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
  slug?: string;
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
  slug,
}) => {
  // Bespoke scene for UPI ₹5,000 / ₹20 Math Breakdown
  if (slug === "upi-free-secret" || id === "s4-math") {
    return <UpiMathBreakdownScene durationInFrames={durationInFrames} />;
  }

  // Bespoke scene for Zepto 10-Min Pivot
  if (slug === "zepto-fail-to-unicorn" || id === "s3-pivot") {
    return <TenMinutePivotScene durationInFrames={durationInFrames} />;
  }

  // Bespoke scene for Dark Store 10-Min Order Pipeline
  if (slug === "dark-store-delivery" || id === "s3-pipeline") {
    return <OrderFlowPipelineScene durationInFrames={durationInFrames} />;
  }

  // Bespoke scenes for Digital Arrest
  if (slug === "digital-arrest-scam" || id === "s3-modus-operandi") {
    if (id === "s3-modus-operandi" || headline?.includes("CHALTA")) {
      return <ModusOperandiScene durationInFrames={durationInFrames} />;
    }
  }

  if (slug === "digital-arrest-scam" || id === "s6-emergency-1930") {
    if (id === "s6-emergency-1930" || headline?.includes("1930")) {
      return <Emergency1930Scene durationInFrames={durationInFrames} />;
    }
  }

  // Bespoke scene for Bombay Coated Reality Check
  if (slug === "bombay-coated-ipo-last-day" || id === "s5-reality-check") {
    return <BombayRealityCheckScene durationInFrames={durationInFrames} />;
  }

  // Bespoke full-screen scene for Bank ASBA Auto-Refund (Beginner IPOs)
  if (slug === "ipo-4-beginner-questions" || id === "s3-asba" && headline?.includes("ALLOTMENT")) {
    return <AsbaRefundScene durationInFrames={durationInFrames} />;
  }
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

