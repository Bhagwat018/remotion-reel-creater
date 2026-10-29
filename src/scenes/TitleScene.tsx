import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { TitleSceneProps } from "../schema";
import { SceneLayout } from "../components/SceneLayout";
import { NeoSticker } from "../components/neo/NeoSticker";
import { MotionDirection } from "../lib/directionalMotion";
import { StarburstBadge } from "../components/StarburstBadge";
import { TechLogo, findBrandInText } from "../components/TechLogo";

export const TitleScene: React.FC<
  TitleSceneProps & {
    subtitle?: string;
    items?: string[];
    tags?: string[];
    durationInFrames: number;
    direction?: MotionDirection;
    id?: string;
  }
> = ({ id, direction, leadIn, subtitle, headline, items, tags, durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - 2,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  const pulse = Math.sin(frame / 6) * 0.015 + 1;

  // Extract brand if mentioned in headline or leadIn
  const brand = findBrandInText(`${headline} ${leadIn || ""} ${subtitle || ""}`);

  // Dynamic tags from props or fallback to high-energy hooks
  const displayTags = items && items.length > 0 
    ? items.slice(0, 3)
    : tags && tags.length > 0
    ? tags.slice(0, 3)
    : ["⚡ SPECIAL REPORT", "🔥 DEEP DIVE", "💎 DATA BACKED"];

  return (
    <SceneLayout
      id={id}
      direction={direction}
      leadIn={leadIn || "EXCLUSIVE REPORT"}
      headline={headline}
      durationInFrames={durationInFrames}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          transform: `scale(${entrance * pulse})`,
          opacity: entrance,
          gap: 22,
          marginTop: 12,
        }}
      >
        {/* Dynamic Stickers Row */}
        <div style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
          {displayTags.map((tag, idx) => {
            const colors = ["#fb923c", "#38bdf8", "#4ade80", "#c084fc"];
            const rots = [-3, 2, -2, 3];
            return (
              <NeoSticker
                key={idx}
                text={tag}
                rotate={rots[idx % rots.length]}
                bg={colors[idx % colors.length]}
                color="#000000"
                fontSize={24}
              />
            );
          })}
        </div>

        {/* Dynamic Hero Spotlight Card */}
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: 920,
            backgroundColor: "#ffffff",
            border: "4px solid #000000",
            borderRadius: 26,
            boxShadow: "9px 9px 0px #000000",
            padding: "38px 36px",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            gap: 18,
          }}
        >
          {/* Top Row: Brand / Icon or Spotlight Badge */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              {brand ? (
                <div style={{ width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <TechLogo brand={brand} size={42} />
                </div>
              ) : (
                <div
                  style={{
                    width: 14,
                    height: 14,
                    borderRadius: "50%",
                    backgroundColor: "#ef4444",
                    border: "2px solid #000000",
                  }}
                />
              )}
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 20,
                  fontWeight: 800,
                  color: "#000000",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                {leadIn || "MARKET INSIGHTS"}
              </span>
            </div>

            <div
              style={{
                backgroundColor: "#fef08a",
                border: "2.5px solid #000000",
                borderRadius: 12,
                padding: "6px 14px",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 18,
                fontWeight: 900,
                color: "#000000",
                boxShadow: "3px 3px 0px #000000",
              }}
            >
              DAY 1 ACTION
            </div>
          </div>

          {/* Subtitle / Big Hook Summary */}
          <div
            style={{
              fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif",
              fontSize: 34,
              fontWeight: 800,
              color: "#0f172a",
              lineHeight: 1.35,
              letterSpacing: "-0.02em",
            }}
          >
            {subtitle || (
              <>
                Comprehensive analysis on whether to <span style={{ color: "#16a34a" }}>HOLD</span> for the long term or <span style={{ color: "#dc2626" }}>BOOK PROFITS</span> immediately!
              </>
            )}
          </div>

          {/* Bottom Data Trust Bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderTop: "3px dashed #e2e8f0",
              paddingTop: 18,
              marginTop: 6,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ color: "#16a34a", fontSize: 24, fontWeight: 900 }}>●</span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 19, fontWeight: 700, color: "#475569" }}>
                LIVE MARKET RADAR
              </span>
            </div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 19, fontWeight: 800, color: "#7c3aed" }}>
              CONFIDENTIAL // RETAIL DESK
            </div>
          </div>

          {/* Corner Starburst Badge */}
          <div style={{ position: "absolute", top: -24, right: -24 }}>
            <StarburstBadge text="HOT" subtext="NOW" color="#facc15" size={88} />
          </div>
        </div>
      </div>
    </SceneLayout>
  );
};
