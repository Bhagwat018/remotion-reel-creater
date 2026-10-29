import React from "react";
import { Audio, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { uiSwitch } from "../../lib/sfx";

export interface ComparisonItem {
  title: string;
  badge?: string;
  badgeColor?: string;
  bg?: string;
  points: string[];
  isWinner?: boolean;
}

interface NeoComparisonProps {
  left: ComparisonItem;
  right: ComparisonItem;
  delayFrames?: number;
}

export const NeoComparison: React.FC<NeoComparisonProps> = ({
  left,
  right,
  delayFrames = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const popLeft = spring({
    frame: frame - delayFrames,
    fps,
    config: { damping: 14, stiffness: 140 },
  });

  const popRight = spring({
    frame: frame - delayFrames - 4,
    fps,
    config: { damping: 14, stiffness: 140 },
  });

  const renderCard = (item: ComparisonItem, pop: number, rotate: number) => {
    return (
      <div
        style={{
          flex: 1,
          backgroundColor: item.bg || "#ffffff",
          border: "3.5px solid #000000",
          borderRadius: 22,
          padding: "26px 22px",
          boxShadow: "6px 6px 0px #000000",
          transform: `scale(${pop}) rotate(${rotate}deg)`,
          opacity: pop > 0 ? 1 : 0,
          display: "flex",
          flexDirection: "column",
          gap: 16,
          position: "relative",
        }}
      >
        {/* Badge */}
        {item.badge && (
          <div
            style={{
              alignSelf: "flex-start",
              backgroundColor: item.badgeColor || (item.isWinner ? "#4ade80" : "#fb923c"),
              color: "#000000",
              border: "2px solid #000000",
              borderRadius: 999,
              padding: "4px 14px",
              fontSize: 20,
              fontWeight: 800,
            }}
          >
            {item.badge}
          </div>
        )}

        <h3
          style={{
            margin: 0,
            fontFamily: "'Inter', sans-serif",
            fontSize: 32,
            fontWeight: 900,
            color: "#000000",
            letterSpacing: "-0.01em",
          }}
        >
          {item.title}
        </h3>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {item.points.map((pt, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                fontSize: 22,
                fontWeight: 700,
                color: "#1e293b",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              <span style={{ fontSize: 22 }}>
                {item.isWinner ? "✅" : "⚠️"}
              </span>
              <span>{pt}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div
      style={{
        display: "flex",
        gap: 20,
        width: "100%",
        maxWidth: 920,
        margin: "0 auto",
      }}
    >
      {frame === delayFrames + 4 && <Audio src={uiSwitch} volume={0.7} />}
      {renderCard(left, popLeft, -1.5)}
      {renderCard(right, popRight, 1.5)}
    </div>
  );
};
