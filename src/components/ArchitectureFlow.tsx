import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { evolvePath } from "@remotion/paths";
import { useTheme } from "../theme/theme";

export interface FlowNode {
  id?: string;
  title: string;
  subtitle?: string;
  icon?: string;
  status?: string;
  accentColor?: string;
}

export interface ArchitectureFlowProps {
  nodes?: FlowNode[];
  delayFrames?: number;
}

const DEFAULT_NODES: FlowNode[] = [
  { id: "1", title: "Client App", subtitle: "Edge DNS // Cloudflare", icon: "🌐", status: "200 OK", accentColor: "#60a5fa" },
  { id: "2", title: "API Gateway", subtitle: "Rate Limit & Auth", icon: "🛡️", status: "AUTH ACTIVE", accentColor: "#c084fc" },
  { id: "3", title: "Redis Cache", subtitle: "In-Memory Key/Value", icon: "⚡", status: "0.4ms HIT", accentColor: "#fb923c" },
  { id: "4", title: "PostgreSQL DB", subtitle: "ACID Persistent Storage", icon: "🗄️", status: "REPLICATED", accentColor: "#4ade80" },
];

export const ArchitectureFlow: React.FC<ArchitectureFlowProps> = ({
  nodes = DEFAULT_NODES,
  delayFrames = 4,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const theme = useTheme();

  // Animation cycle for traveling packet along the workflow (60 frames cycle)
  const cycleFrames = 60;
  const packetProgress = (frame % cycleFrames) / cycleFrames;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 940,
        display: "flex",
        flexDirection: "column",
        gap: 22,
        boxSizing: "border-box",
      }}
    >
      {nodes.map((node, index) => {
        const nodeDelay = delayFrames + index * 6;
        const nodeSpring = spring({
          frame: frame - nodeDelay,
          fps,
          config: { damping: 14, stiffness: 120 },
        });

        const scale = interpolate(nodeSpring, [0, 1], [0.85, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const opacity = interpolate(nodeSpring, [0, 1], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        const isLast = index === nodes.length - 1;
        const accent = node.accentColor || "#38bdf8";

        return (
          <React.Fragment key={node.id || index}>
            {/* The Architecture Node Card */}
            <div
              style={{
                position: "relative",
                width: "100%",
                backgroundColor: "#ffffff",
                border: "3.5px solid #000000",
                borderRadius: 20,
                padding: "18px 24px",
                boxShadow: "6px 6px 0px #000000",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                opacity,
                transform: `scale(${scale})`,
                zIndex: 2,
              }}
            >
              {/* Left: Step badge + Icon + Titles */}
              <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 14,
                    backgroundColor: `${accent}22`,
                    border: "2.5px solid #000000",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 26,
                  }}
                >
                  {node.icon || "⚙️"}
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span
                      style={{
                        fontFamily: theme.typography.mono,
                        fontSize: 12,
                        fontWeight: 800,
                        backgroundColor: "#0f172a",
                        color: "#f8fafc",
                        padding: "2px 8px",
                        borderRadius: 6,
                      }}
                    >
                      STEP 0{index + 1}
                    </span>
                    <span
                      style={{
                        fontFamily: theme.typography.headline,
                        fontSize: 26,
                        fontWeight: 900,
                        color: "#0f172a",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {node.title}
                    </span>
                  </div>

                  {node.subtitle && (
                    <span
                      style={{
                        fontFamily: theme.typography.mono,
                        fontSize: 16,
                        fontWeight: 600,
                        color: "#64748b",
                      }}
                    >
                      {node.subtitle}
                    </span>
                  )}
                </div>
              </div>

              {/* Right: Status Pill */}
              {node.status && (
                <div
                  style={{
                    backgroundColor: `${accent}25`,
                    color: "#0f172a",
                    border: "2px solid #000000",
                    borderRadius: 10,
                    padding: "6px 14px",
                    fontFamily: theme.typography.mono,
                    fontSize: 15,
                    fontWeight: 800,
                    boxShadow: "3px 3px 0px #000000",
                  }}
                >
                  {node.status}
                </div>
              )}
            </div>

            {/* Connecting Arrow with Dynamic SVG Drawing & Travelling Pulse */}
            {!isLast && (() => {
              const lineDelay = delayFrames + index * 6 + 3;
              const pathProgress = interpolate(frame - lineDelay, [0, 12], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });
              const lineD = "M 20 0 L 20 40";
              const { strokeDasharray, strokeDashoffset } = evolvePath(pathProgress, lineD);

              return (
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: 40,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 1,
                    margin: "-4px 0",
                  }}
                >
                  <svg width="40" height="40" style={{ overflow: "visible" }}>
                    <path
                      d={lineD}
                      stroke="#000000"
                      strokeWidth="4"
                      strokeDasharray={strokeDasharray}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                    />
                    {pathProgress > 0.8 && (
                      <polygon
                        points="14,32 26,32 20,42"
                        fill="#000000"
                        style={{
                          transform: `scale(${interpolate(pathProgress, [0.8, 1], [0, 1])})`,
                          transformOrigin: "20px 37px",
                        }}
                      />
                    )}
                  </svg>

                  {/* Traveling Pulse Particle along wire */}
                  <div
                    style={{
                      position: "absolute",
                      top: `${((packetProgress + index * 0.25) % 1) * 100}%`,
                      left: "calc(50% - 7px)",
                      width: 14,
                      height: 14,
                      borderRadius: "50%",
                      backgroundColor: "#38bdf8",
                      border: "2px solid #000000",
                      boxShadow: "0 0 10px #38bdf8",
                    }}
                  />
                </div>
              );
            })()}
          </React.Fragment>
        );
      })}
    </div>
  );
};
