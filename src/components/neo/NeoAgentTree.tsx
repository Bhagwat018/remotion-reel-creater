import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface AgentNode {
  title: string;
  desc: string;
  bg?: string;
  icon?: string;
}

interface NeoAgentTreeProps {
  rootTitle?: string;
  rootDesc?: string;
  subAgents?: AgentNode[];
  delayFrames?: number;
}

export const NeoAgentTree: React.FC<NeoAgentTreeProps> = ({
  rootTitle = "Claude Code Master Agent",
  rootDesc = "Orchestrating Sub-Agents in Parallel",
  subAgents = [
    { title: "Agent #1", desc: "Arxiv Docs Research", bg: "#fed7aa", icon: "📑" },
    { title: "Agent #2", desc: "OpenAI Voice Synthesis", bg: "#fbcfe8", icon: "🎙️" },
    { title: "Agent #3", desc: "Remotion React Render", bg: "#bbf7d0", icon: "🎬" },
  ],
  delayFrames = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - delayFrames,
    fps,
    config: { damping: 14, stiffness: 140 },
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 18,
        width: "100%",
        maxWidth: 900,
        margin: "0 auto",
        transform: `scale(${entrance})`,
        opacity: entrance,
      }}
    >
      {/* Root Node */}
      <div
        style={{
          backgroundColor: "#ffffff",
          border: "3.5px solid #000000",
          borderRadius: 20,
          padding: "16px 32px",
          boxShadow: "6px 6px 0px #000000",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
        }}
      >
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 32,
            fontWeight: 900,
            color: "#000000",
          }}
        >
          🤖 {rootTitle}
        </span>
        <span style={{ fontSize: 20, fontWeight: 700, color: "#64748b" }}>
          {rootDesc}
        </span>
      </div>

      {/* Branching Indicator */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          fontSize: 28,
          fontWeight: 900,
          color: "#000000",
        }}
      >
        <span>↙️ Parallel</span>
        <span>⬇️ Autonomous</span>
        <span>↘️ Realtime</span>
      </div>

      {/* Child Nodes */}
      <div
        style={{
          display: "flex",
          gap: 16,
          width: "100%",
          justifyContent: "center",
        }}
      >
        {subAgents.map((agent, idx) => {
          const cardPop = spring({
            frame: frame - delayFrames - 4 - idx * 3,
            fps,
            config: { damping: 12, stiffness: 160 },
          });

          return (
            <div
              key={idx}
              style={{
                flex: 1,
                backgroundColor: agent.bg || "#ffffff",
                border: "3px solid #000000",
                borderRadius: 18,
                padding: "18px 14px",
                boxShadow: "5px 5px 0px #000000",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                gap: 8,
                transform: `scale(${cardPop})`,
                opacity: cardPop > 0 ? 1 : 0,
              }}
            >
              <span style={{ fontSize: 36 }}>{agent.icon || "⚡"}</span>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 22,
                  fontWeight: 900,
                  color: "#000000",
                }}
              >
                {agent.title}
              </span>
              <span style={{ fontSize: 18, fontWeight: 700, color: "#334155" }}>
                {agent.desc}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
