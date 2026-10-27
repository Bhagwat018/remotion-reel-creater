import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

interface NeoStrikeBadgesProps {
  strikes?: string[];
  confirmText?: string;
  delayFrames?: number;
}

export const NeoStrikeBadges: React.FC<NeoStrikeBadgesProps> = ({
  strikes = ["draw", "Photoshop", "animator"],
  confirmText = "1 prompt",
  delayFrames = 8,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Rotation tilts for playful neo-brutalism
  const rotations = [-2.5, 1.8, -1.8, 2.2];

  // Confirm pill enters after strikes
  const confirmEntrance = spring({
    frame: frame - (delayFrames + strikes.length * 6),
    fps,
    config: { damping: 12, stiffness: 140 },
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 22,
        width: "100%",
        marginTop: 10,
      }}
    >
      {/* 1. Row of Red Strike Badges */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        {strikes.map((text, idx) => {
          const itemSpring = spring({
            frame: frame - (delayFrames + idx * 6),
            fps,
            config: { damping: 13, stiffness: 130 },
          });

          const rot = rotations[idx % rotations.length];

          return (
            <div
              key={text}
              style={{
                position: "relative",
                backgroundColor: "#fce7f3",
                border: "3.5px solid #000000",
                borderRadius: 14,
                padding: "10px 22px",
                boxShadow: "4px 4px 0px #000000",
                transform: `scale(${Math.max(0, itemSpring)}) rotate(${rot}deg)`,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              {/* Red X icon */}
              <span
                style={{
                  color: "#dc2626",
                  fontSize: 26,
                  fontWeight: 900,
                  marginRight: 2,
                }}
              >
                ❌
              </span>

              {/* Text with Red Strike-through bar */}
              <span
                style={{
                  position: "relative",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 26,
                  fontWeight: 800,
                  color: "#000000",
                  letterSpacing: "-0.01em",
                }}
              >
                {text}
                {/* Slanted red cross bar */}
                <div
                  style={{
                    position: "absolute",
                    left: -4,
                    right: -4,
                    top: "50%",
                    height: 4,
                    backgroundColor: "#dc2626",
                    transform: "translateY(-50%) rotate(-4deg)",
                    borderRadius: 2,
                  }}
                />
              </span>
            </div>
          );
        })}
      </div>

      {/* 2. Hero Green Confirmation Pill */}
      {confirmEntrance > 0.05 && (
        <div
          style={{
            backgroundColor: "#22c55e",
            border: "4px solid #000000",
            borderRadius: 20,
            padding: "14px 34px",
            boxShadow: "6px 6px 0px #000000",
            display: "flex",
            alignItems: "center",
            gap: 14,
            transform: `scale(${confirmEntrance})`,
            transformOrigin: "center center",
          }}
        >
          {/* Green Checkbox */}
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              backgroundColor: "#15803d",
              border: "3px solid #000000",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              fontSize: 24,
              fontWeight: 900,
            }}
          >
            ✓
          </div>

          <span
            style={{
              fontFamily: "'Cabinet Grotesk', -apple-system, sans-serif",
              fontSize: 34,
              fontWeight: 900,
              color: "#ffffff",
              letterSpacing: "-0.01em",
            }}
          >
            {confirmText}
          </span>
        </div>
      )}
    </div>
  );
};
