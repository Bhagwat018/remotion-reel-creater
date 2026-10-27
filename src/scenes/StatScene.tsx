import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { StatSceneProps } from "../schema";
import { SceneLayout } from "../components/SceneLayout";
import { NeoStatCard } from "../components/neo/NeoStatCard";
import { MotionDirection } from "../lib/directionalMotion";

export const StatScene: React.FC<
  StatSceneProps & { durationInFrames: number; direction?: MotionDirection; id?: string }
> = ({ id, direction, leadIn, headline, value, label, durationInFrames }) => {
  const frame = useCurrentFrame();

  const strVal = String(value);
  const match = strVal.match(/^([\d.]+)(.*)$/);
  const targetNum = match ? parseFloat(match[1]) : 10;
  const suffix = match ? match[2] : "x";

  // Count up animation over first 20 frames
  const countProgress = interpolate(frame, [4, 24], [0, targetNum], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const currentDisplay = `${Number.isInteger(targetNum) ? Math.round(countProgress) : countProgress.toFixed(1)}${suffix}`;

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
          gap: 20,
          marginTop: 6,
        }}
      >
        <NeoStatCard
          value={currentDisplay}
          label={label}
          subtext="Tested in production scale environments"
          badge="PERFORMANCE ⚡"
          accentColor="#7c3aed"
          delayFrames={4}
        />

        {/* Visual Benchmark Comparison Card */}
        <div
          style={{
            width: "100%",
            maxWidth: 820,
            backgroundColor: "#ffffff",
            border: "3.5px solid #000000",
            borderRadius: 18,
            padding: "20px 26px",
            boxShadow: "5px 5px 0px #000000",
            display: "flex",
            flexDirection: "column",
            gap: 12,
            boxSizing: "border-box",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 20, fontWeight: 700, color: "#64748b" }}>
              Traditional Cloud Server
            </span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 22, fontWeight: 900, color: "#ef4444" }}>
              180ms ❌
            </span>
          </div>
          <div style={{ width: "100%", height: 12, backgroundColor: "#fee2e2", borderRadius: 6, overflow: "hidden", border: "1.5px solid #000000" }}>
            <div style={{ width: "88%", height: "100%", backgroundColor: "#ef4444" }} />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 4 }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 20, fontWeight: 700, color: "#000000" }}>
              5G Edge Architecture
            </span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 22, fontWeight: 900, color: "#16a34a" }}>
              0ms (Instant) ✅
            </span>
          </div>
          <div style={{ width: "100%", height: 12, backgroundColor: "#dcfce7", borderRadius: 6, overflow: "hidden", border: "1.5px solid #000000" }}>
            <div style={{ width: "10%", height: "100%", backgroundColor: "#22c55e" }} />
          </div>
        </div>

        {/* Real-time comparison delta strip */}
        <div
          style={{
            width: "100%",
            maxWidth: 820,
            backgroundColor: "#fef08a",
            border: "3.5px solid #000000",
            borderRadius: 16,
            padding: "14px 24px",
            boxShadow: "4px 4px 0px #000000",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxSizing: "border-box",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 24 }}>⚡</span>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 20,
                fontWeight: 800,
                color: "#000000",
              }}
            >
              +99.9% SPEED ADVANTAGE
            </span>
          </div>

          <div
            style={{
              backgroundColor: "#22c55e",
              color: "#ffffff",
              border: "2px solid #000000",
              borderRadius: 8,
              padding: "4px 12px",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 16,
              fontWeight: 800,
            }}
          >
            REAL-TIME EDGE
          </div>
        </div>
      </div>
    </SceneLayout>
  );
};
