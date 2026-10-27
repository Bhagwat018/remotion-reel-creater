import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { DiagramSceneProps } from "../schema";
import { SceneLayout } from "../components/SceneLayout";
import { TechLogo, findBrandInText } from "../components/TechLogo";
import { MotionDirection } from "../lib/directionalMotion";

export const DiagramScene: React.FC<
  DiagramSceneProps & { durationInFrames: number; direction?: MotionDirection; id?: string }
> = ({
  id,
  direction,
  headline,
  leadIn,
  middleLabel = "Load Balancer",
  sourceLabel = "Users / Traffic",
  targetLabels = ["Server A", "Server B", "Server C"],
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const nodeSpring = spring({
    frame: frame - 6,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  const cycleFrames = 45;
  const loopProgress = (frame % cycleFrames) / cycleFrames;

  return (
    <SceneLayout
      id={id}
      direction={direction}
      leadIn={leadIn}
      headline={headline}
      durationInFrames={durationInFrames}
    >
      {/* Main Visual Architecture Diagram Container */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 920,
          height: 600,
          backgroundColor: "#ffffff",
          border: "3.5px solid #000000",
          borderRadius: 24,
          padding: 24,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          transform: `scale(${Math.min(1, nodeSpring)})`,
          boxShadow: "7px 7px 0px #000000",
          overflow: "hidden",
        }}
      >
        {/* SVG Connector Lines */}
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
          {/* Wire 1: Source -> Middle Node */}
          <path
            d="M 460 90 L 460 230"
            stroke="#000000"
            strokeWidth="3.5"
            strokeDasharray="8 8"
            fill="none"
          />
          {/* Animated Packet 1 */}
          <circle
            cx="460"
            cy={90 + loopProgress * 140}
            r="8"
            fill="#fb923c"
            stroke="#000000"
            strokeWidth="2"
          />

          {/* Wire 2: Middle -> Server 1 */}
          <path
            d="M 460 320 C 460 410, 160 400, 160 470"
            stroke="#000000"
            strokeWidth="3.5"
            strokeDasharray="8 8"
            fill="none"
          />
          <circle
            cx={460 - loopProgress * 300}
            cy={320 + loopProgress * 150}
            r="7"
            fill="#7c3aed"
            stroke="#000000"
            strokeWidth="2"
          />

          {/* Wire 3: Middle -> Server 2 */}
          <path
            d="M 460 320 L 460 470"
            stroke="#000000"
            strokeWidth="3.5"
            strokeDasharray="8 8"
            fill="none"
          />
          <circle
            cx="460"
            cy={320 + loopProgress * 150}
            r="7"
            fill="#22c55e"
            stroke="#000000"
            strokeWidth="2"
          />

          {/* Wire 4: Middle -> Server 3 */}
          <path
            d="M 460 320 C 460 410, 760 400, 760 470"
            stroke="#000000"
            strokeWidth="3.5"
            strokeDasharray="8 8"
            fill="none"
          />
          <circle
            cx={460 + loopProgress * 300}
            cy={320 + loopProgress * 150}
            r="7"
            fill="#38bdf8"
            stroke="#000000"
            strokeWidth="2"
          />
        </svg>

        {/* 1. Source Node */}
        <div style={{ display: "flex", justifyContent: "center", zIndex: 10 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              backgroundColor: "#fed7aa",
              border: "3px solid #000000",
              borderRadius: 16,
              padding: "10px 24px",
              boxShadow: "4px 4px 0px #000000",
            }}
          >
            {(() => {
              const brand = findBrandInText(sourceLabel);
              if (brand) return <TechLogo name={brand.key} size={28} />;
              return <span style={{ fontSize: 24 }}>📱</span>;
            })()}
            <div>
              <div style={{ fontSize: 22, fontWeight: 900, color: "#000000" }}>{sourceLabel}</div>
              <div style={{ fontSize: 14, color: "#334155", fontWeight: 700 }}>
                10,000 req / sec
              </div>
            </div>
          </div>
        </div>

        {/* 2. Middle Node */}
        <div style={{ display: "flex", justifyContent: "center", zIndex: 10 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              backgroundColor: "#c084fc",
              border: "3px solid #000000",
              borderRadius: 18,
              padding: "14px 28px",
              boxShadow: "5px 5px 0px #000000",
            }}
          >
            {(() => {
              const brand = findBrandInText(middleLabel);
              if (brand) return <TechLogo name={brand.key} size={30} />;
              return <span style={{ fontSize: 28 }}>⚡</span>;
            })()}
            <div>
              <div style={{ fontSize: 24, fontWeight: 900, color: "#000000" }}>
                {middleLabel}
              </div>
              <div style={{ fontSize: 14, color: "#1e1b4b", fontWeight: 800 }}>
                High-Speed Proxy / Router
              </div>
            </div>
          </div>
        </div>

        {/* 3. Target Nodes */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 14,
            zIndex: 10,
          }}
        >
          {targetLabels.map((label, idx) => {
            const brand = findBrandInText(label);
            return (
              <div
                key={idx}
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 6,
                  backgroundColor: "#bbf7d0",
                  border: "2.5px solid #000000",
                  borderRadius: 14,
                  padding: "12px 8px",
                  boxShadow: "4px 4px 0px #000000",
                  textAlign: "center",
                }}
              >
                {brand ? <TechLogo name={brand.key} size={26} /> : <span style={{ fontSize: 24 }}>🖥️</span>}
                <div style={{ fontSize: 18, fontWeight: 800, color: "#000000" }}>{label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </SceneLayout>
  );
};
