import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { DiagramSceneProps } from "../schema";
import { SceneLayout } from "../components/SceneLayout";
import { Headline } from "../components/Headline";
import { LeadIn } from "../components/LeadIn";
import { useTheme } from "../theme/theme";
import { TechLogo, findBrandInText } from "../components/TechLogo";

export const DiagramScene: React.FC<DiagramSceneProps & { durationInFrames: number }> = ({
  headline,
  leadIn,
  middleLabel = "Load Balancer",
  sourceLabel = "Users / Traffic",
  targetLabels = ["Server A", "Server B", "Server C"],
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const theme = useTheme();

  // Entrance spring for diagram nodes
  const nodeSpring = spring({
    frame: frame - 6,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  // Looping packet animation (cycles every 45 frames ~ 0.75s)
  const cycleFrames = 45;
  const loopProgress = (frame % cycleFrames) / cycleFrames;

  return (
    <SceneLayout durationInFrames={durationInFrames}>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
        <LeadIn text={leadIn} />
        <Headline text={headline} />
      </div>

      {/* Main Visual Architecture Diagram Container */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 920,
          height: 660,
          backgroundColor: "rgba(10, 14, 23, 0.88)",
          backdropFilter: "blur(20px)",
          border: "2px solid rgba(56, 189, 248, 0.35)",
          borderRadius: 28,
          padding: 28,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          transform: `scale(${Math.min(1, nodeSpring)})`,
          boxShadow: "0 25px 60px rgba(0, 0, 0, 0.6), 0 0 30px rgba(56, 189, 248, 0.15)",
          overflow: "hidden",
        }}
      >
        {/* SVG Animated Connector Lines & Traveling Data Packets */}
        <svg
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            zIndex: 1,
          }}
        >
          {/* Defs for gradients & glowing filters */}
          <defs>
            <linearGradient id="packetGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#818cf8" />
            </linearGradient>
            <filter id="glowBlur" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Dotted Wire 1: Source -> Middle Node (Y: 100 -> 270) */}
          <path
            d="M 460 100 L 460 260"
            stroke="rgba(56, 189, 248, 0.35)"
            strokeWidth="3.5"
            strokeDasharray="8 8"
            fill="none"
          />
          {/* Animated Packet 1 traveling from Source down to Middle Node */}
          <circle
            cx="460"
            cy={100 + loopProgress * 160}
            r="8"
            fill="url(#packetGlow)"
            filter="url(#glowBlur)"
          />

          {/* Dotted Wire 2: Middle -> Server 1 (Left branch) */}
          <path
            d="M 460 370 C 460 450, 160 440, 160 520"
            stroke="rgba(56, 189, 248, 0.35)"
            strokeWidth="3.5"
            strokeDasharray="8 8"
            fill="none"
          />
          {/* Packet traveling to Server 1 */}
          <circle
            cx={460 - loopProgress * 300}
            cy={370 + loopProgress * 150}
            r="7"
            fill="#38bdf8"
            filter="url(#glowBlur)"
          />

          {/* Dotted Wire 3: Middle -> Server 2 (Center branch) */}
          <path
            d="M 460 370 L 460 520"
            stroke="rgba(129, 140, 248, 0.35)"
            strokeWidth="3.5"
            strokeDasharray="8 8"
            fill="none"
          />
          {/* Packet traveling to Server 2 */}
          <circle
            cx="460"
            cy={370 + loopProgress * 150}
            r="7"
            fill="#818cf8"
            filter="url(#glowBlur)"
          />

          {/* Dotted Wire 4: Middle -> Server 3 (Right branch) */}
          <path
            d="M 460 370 C 460 450, 760 440, 760 520"
            stroke="rgba(56, 189, 248, 0.35)"
            strokeWidth="3.5"
            strokeDasharray="8 8"
            fill="none"
          />
          {/* Packet traveling to Server 3 */}
          <circle
            cx={460 + loopProgress * 300}
            cy={370 + loopProgress * 150}
            r="7"
            fill="#38bdf8"
            filter="url(#glowBlur)"
          />
        </svg>

        {/* 1. Source Node: Clients / Incoming Traffic */}
        <div style={{ display: "flex", justifyContent: "center", zIndex: 10 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              backgroundColor: "rgba(15, 23, 42, 0.9)",
              border: "1.5px solid rgba(56, 189, 248, 0.4)",
              borderRadius: 14,
              padding: "10px 22px",
              boxShadow: "0 4px 20px rgba(56, 189, 248, 0.2)",
            }}
          >
            {/* Phone/User Icon or TechLogo */}
            {(() => {
              const brand = findBrandInText(sourceLabel);
              if (brand) {
                return <TechLogo name={brand.key} size={26} />;
              }
              return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2">
                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                  <line x1="12" y1="18" x2="12.01" y2="18" />
                </svg>
              );
            })()}
            <div>
              <div style={{ fontSize: 20, fontWeight: 700, color: "#ffffff" }}>{sourceLabel}</div>
              <div style={{ fontSize: 13, color: "#94a3b8", fontFamily: theme.typography.mono }}>
                10,000 req / sec
              </div>
            </div>
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: "#22c55e",
                boxShadow: "0 0 8px #22c55e",
              }}
            />
          </div>
        </div>

        {/* 2. Middle Node: Load Balancer */}
        <div style={{ display: "flex", justifyContent: "center", zIndex: 10 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              backgroundColor: "#1e1b4b",
              border: "2px solid #818cf8",
              borderRadius: 16,
              padding: "14px 28px",
              boxShadow: "0 8px 30px rgba(129, 140, 248, 0.35)",
            }}
          >
            {/* Router / Balancer Icon or TechLogo */}
            {(() => {
              const brand = findBrandInText(middleLabel);
              if (brand) {
                return <TechLogo name={brand.key} size={30} />;
              }
              return (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
              );
            })()}
            <div>
              <div style={{ fontSize: 22, fontWeight: 800, color: "#ffffff", letterSpacing: "0.02em" }}>
                {middleLabel}
              </div>
              <div style={{ fontSize: 13, color: "#a5b4fc", fontFamily: theme.typography.mono }}>
                Round-Robin Algorithm • Health OK
              </div>
            </div>
          </div>
        </div>

        {/* 3. Target Nodes: 3 Backend Server Instances */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 16,
            zIndex: 10,
          }}
        >
          {targetLabels.slice(0, 3).map((serverName, idx) => {
            const serverSpring = spring({
              frame: frame - 12 - idx * 4,
              fps,
              config: { damping: 12, stiffness: 100 },
            });
            const brand = findBrandInText(serverName);

            return (
              <div
                key={serverName}
                style={{
                  backgroundColor: "rgba(15, 23, 42, 0.95)",
                  border: "1.5px solid rgba(255, 255, 255, 0.12)",
                  borderRadius: 14,
                  padding: "14px 12px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 8,
                  transform: `scale(${Math.min(1, serverSpring)})`,
                }}
              >
                {/* Server Stack Icon or Brand Logo */}
                {brand ? (
                  <TechLogo name={brand.key} size={28} />
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
                    <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
                    <line x1="6" y1="6" x2="6.01" y2="6" />
                    <line x1="6" y1="18" x2="6.01" y2="18" />
                  </svg>
                )}
                <div style={{ fontSize: 17, fontWeight: 700, color: "#ffffff", textAlign: "center" }}>
                  {serverName}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    fontSize: 12,
                    color: "#22c55e",
                    fontFamily: theme.typography.mono,
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      backgroundColor: "#22c55e",
                      boxShadow: "0 0 6px #22c55e",
                    }}
                  />
                  Load: {30 + (idx * 5)}%
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SceneLayout>
  );
};
