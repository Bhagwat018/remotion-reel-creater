import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

interface NeoMultiStepPipelineProps {
  stepTitle?: string;
  delayFrames?: number;
}

export const NeoMultiStepPipeline: React.FC<NeoMultiStepPipelineProps> = ({
  stepTitle = "step 1: pre-training 📚",
  delayFrames = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - delayFrames,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  const emojis = ["📚", "📰", "📚", "🌐", "📰", "💬", "📖", "🌐", "🤖"];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        width: "100%",
        maxWidth: 920,
        transform: `scale(${Math.max(0, entrance)})`,
        boxSizing: "border-box",
      }}
    >
      {/* 1. Progress Step Badges Row */}
      <div style={{ display: "flex", gap: 14, width: "100%" }}>
        {/* Active Step 1 */}
        <div
          style={{
            flex: 1.2,
            backgroundColor: "#fb923c",
            border: "3.5px solid #000000",
            borderRadius: 16,
            padding: "12px 18px",
            boxShadow: "4px 4px 0px #000000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 22,
            fontWeight: 800,
            color: "#000000",
          }}
        >
          <span>{stepTitle}</span>
        </div>

        {/* Locked Step 2 */}
        <div
          style={{
            flex: 1,
            backgroundColor: "#e2e8f0",
            border: "3px dashed #000000",
            borderRadius: 16,
            padding: "12px 18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 22,
            fontWeight: 800,
            color: "#64748b",
          }}
        >
          <span>🔒</span>
          <span>2</span>
        </div>

        {/* Locked Step 3 */}
        <div
          style={{
            flex: 1,
            backgroundColor: "#e2e8f0",
            border: "3px dashed #000000",
            borderRadius: 16,
            padding: "12px 18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 22,
            fontWeight: 800,
            color: "#64748b",
          }}
        >
          <span>🔒</span>
          <span>3</span>
        </div>
      </div>

      {/* 2. Emoji Stream Card */}
      <div
        style={{
          backgroundColor: "#ffffff",
          border: "3.5px solid #000000",
          borderRadius: 18,
          padding: "18px 24px",
          boxShadow: "5px 5px 0px #000000",
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 36,
          }}
        >
          {emojis.map((emoji, idx) => (
            <span
              key={idx}
              style={{
                transform: `scale(${
                  1 + Math.sin((frame + idx * 8) / 7) * 0.12
                })`,
              }}
            >
              {emoji}
            </span>
          ))}
        </div>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 18,
            fontWeight: 800,
            color: "#4f46e5",
          }}
        >
          internet ka bada hissa 🌐
        </div>
      </div>

      {/* 3. Prediction Test Card */}
      <div
        style={{
          backgroundColor: "#ffffff",
          border: "3.5px solid #000000",
          borderRadius: 18,
          padding: "20px 24px",
          boxShadow: "5px 5px 0px #000000",
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        <div
          style={{
            fontFamily: "'Cabinet Grotesk', sans-serif",
            fontSize: 24,
            fontWeight: 800,
            color: "#4338ca",
          }}
        >
          agla word? 🤔
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {/* Word 1 */}
          <div
            style={{
              padding: "10px 20px",
              border: "3px solid #000000",
              borderRadius: 14,
              backgroundColor: "#ffffff",
              fontSize: 24,
              fontWeight: 800,
            }}
          >
            chai
          </div>
          {/* Word 2 */}
          <div
            style={{
              padding: "10px 20px",
              border: "3px solid #000000",
              borderRadius: 14,
              backgroundColor: "#ffffff",
              fontSize: 24,
              fontWeight: 800,
            }}
          >
            bahut
          </div>
          <span style={{ fontSize: 26, fontWeight: 900 }}>→</span>
          {/* Incorrect prediction with X */}
          <div
            style={{
              position: "relative",
              padding: "10px 20px",
              border: "3px solid #000000",
              borderRadius: 14,
              backgroundColor: "#f43f5e",
              color: "#ffffff",
              fontSize: 24,
              fontWeight: 800,
            }}
          >
            thandi
            <span
              style={{
                position: "absolute",
                top: -14,
                right: -10,
                fontSize: 28,
                color: "#dc2626",
              }}
            >
              ❌
            </span>
          </div>
          {/* Correct Target Word */}
          <div
            style={{
              padding: "10px 22px",
              border: "3px solid #000000",
              borderRadius: 14,
              backgroundColor: "#0d9488",
              color: "#ffffff",
              fontSize: 24,
              fontWeight: 800,
            }}
          >
            garam
          </div>
        </div>
      </div>

      {/* 4. Fine-Tuning Knobs Row */}
      <div
        style={{
          backgroundColor: "#ffffff",
          border: "3.5px solid #000000",
          borderRadius: 18,
          padding: "16px 24px",
          boxShadow: "5px 5px 0px #000000",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span style={{ fontSize: 32 }}>🔧</span>

        <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
          {["#fb923c", "#8b5cf6", "#f43f5e", "#14b8a6", "#fb923c", "#6366f1"].map(
            (color, kIdx) => {
              const rot =
                ((kIdx * 45) % 270) -
                135 +
                Math.sin((frame + kIdx * 10) / 8) * 35;
              return (
                <div
                  key={kIdx}
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    backgroundColor: color,
                    border: "3px solid #000000",
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      width: 3,
                      height: 18,
                      backgroundColor: "#000000",
                      transform: `rotate(${rot}deg)`,
                      transformOrigin: "bottom center",
                      position: "absolute",
                      top: 6,
                    }}
                  />
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      backgroundColor: "#000000",
                    }}
                  />
                </div>
              );
            }
          )}
        </div>

        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 18,
            fontWeight: 800,
            fontStyle: "italic",
            color: "#000000",
          }}
        >
          thoda sa ghuma do
        </span>
      </div>
    </div>
  );
};
