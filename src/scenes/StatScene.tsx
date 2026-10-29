import React from "react";
import { Audio, interpolate, useCurrentFrame } from "remotion";
import { ding } from "../lib/sfx";
import { StatSceneProps } from "../schema";
import { SceneLayout } from "../components/SceneLayout";
import { NeoStatCard } from "../components/neo/NeoStatCard";
import { MotionDirection } from "../lib/directionalMotion";
import { StarburstBadge } from "../components/StarburstBadge";

export const StatScene: React.FC<
  StatSceneProps & {
    pills?: string[];
    items?: string[];
    subtext?: string;
    badge?: string;
    statNumber?: string;
    statLabel?: string;
    durationInFrames: number;
    direction?: MotionDirection;
    id?: string;
  }
> = ({
  id,
  direction,
  leadIn,
  headline,
  value,
  statNumber,
  label,
  statLabel,
  subtext,
  badge,
  pills,
  items,
  durationInFrames,
}) => {
  const frame = useCurrentFrame();

  const rawVal = String(value || statNumber || "10x");
  const displayLabel = label || statLabel || "Key Highlight Metric";

  // Parse numeric prefix/suffix for animation if possible
  // Matches "$115B", "70x", "21%", "450M+", etc.
  const match = rawVal.match(/^([^0-9]*)([\d,.]+)(.*)$/);
  const prefix = match ? match[1] : "";
  const numStr = match ? match[2].replace(/,/g, "") : null;
  const suffix = match ? match[3] : "";
  const targetNum = numStr ? parseFloat(numStr) : null;

  let currentDisplay = rawVal;
  if (targetNum !== null && !isNaN(targetNum)) {
    const countProgress = interpolate(frame, [4, 24], [0, targetNum], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    const formatted = Number.isInteger(targetNum)
      ? Math.round(countProgress).toLocaleString()
      : countProgress.toFixed(1);
    currentDisplay = `${prefix}${formatted}${suffix}`;
  }

  // Supporting pills from props
  const supportingPills = items && items.length > 0 ? items : pills || [];

  return (
    <SceneLayout
      id={id}
      direction={direction}
      leadIn={leadIn || "OFFICIAL DATA"}
      headline={headline}
      durationInFrames={durationInFrames}
    >
      {/* Crisp ding notification audio when counter locks in */}
      {frame === 24 && <Audio src={ding} volume={0.65} />}
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 22,
          marginTop: 10,
        }}
      >
        <div style={{ position: "relative", width: "100%", display: "flex", justifyContent: "center" }}>
          <NeoStatCard
            value={currentDisplay}
            label={displayLabel}
            subtext={subtext || "Verified Market & Industry Data"}
            badge={badge || "KEY METRIC ⚡"}
            accentColor="#7c3aed"
            delayFrames={4}
          />
          <StarburstBadge
            text={rawVal.includes("x") || rawVal.includes("%") ? "RECORD" : "DATA ⚡"}
            subtext="VERIFIED"
            color="#facc15"
            position="none"
            style={{ position: "absolute", top: -24, right: 40 }}
            delayFrames={8}
          />
        </div>

        {/* Dynamic Supporting Badges or Highlights Card */}
        {supportingPills.length > 0 ? (
          <div
            style={{
              width: "100%",
              maxWidth: 860,
              display: "flex",
              flexWrap: "wrap",
              gap: 14,
              justifyContent: "center",
            }}
          >
            {supportingPills.map((pill, idx) => {
              const bgColors = ["#fef08a", "#dcfce7", "#e0e7ff", "#fce7f3"];
              return (
                <div
                  key={idx}
                  style={{
                    backgroundColor: bgColors[idx % bgColors.length],
                    border: "3px solid #000000",
                    borderRadius: 16,
                    padding: "12px 24px",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 22,
                    fontWeight: 800,
                    color: "#000000",
                    boxShadow: "4px 4px 0px #000000",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <span style={{ color: "#16a34a", fontSize: 24 }}>✔</span>
                  <span>{pill}</span>
                </div>
              );
            })}
          </div>
        ) : (
          /* High-Impact Verification Banner */
          <div
            style={{
              width: "100%",
              maxWidth: 820,
              backgroundColor: "#fef08a",
              border: "3.5px solid #000000",
              borderRadius: 18,
              padding: "18px 28px",
              boxShadow: "5px 5px 0px #000000",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              boxSizing: "border-box",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 26 }}>⚡</span>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 21,
                  fontWeight: 800,
                  color: "#000000",
                }}
              >
                MASSIVE INSTITUTIONAL DEMAND
              </span>
            </div>

            <div
              style={{
                backgroundColor: "#22c55e",
                color: "#ffffff",
                border: "2px solid #000000",
                borderRadius: 8,
                padding: "4px 14px",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 16,
                fontWeight: 900,
              }}
            >
              CONFIRMED
            </div>
          </div>
        )}
      </div>
    </SceneLayout>
  );
};
