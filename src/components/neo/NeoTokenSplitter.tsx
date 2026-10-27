import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface TokenItem {
  text: string;
  tokenId?: number | string;
  bg?: string;
}

interface NeoTokenSplitterProps {
  word: string;
  tokens: TokenItem[];
  delayFrames?: number;
}

const DEFAULT_BG_COLORS = ["#fed7aa", "#bbf7d0", "#bae6fd", "#fbcfe8", "#e9d5ff"];

export const NeoTokenSplitter: React.FC<NeoTokenSplitterProps> = ({
  word,
  tokens,
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
        gap: 24,
        width: "100%",
        maxWidth: 900,
        margin: "0 auto",
        transform: `scale(${entrance})`,
        opacity: entrance,
      }}
    >
      {/* Root Word */}
      <div
        style={{
          backgroundColor: "#ffffff",
          border: "3px solid #000000",
          borderRadius: 16,
          padding: "10px 28px",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 34,
          fontWeight: 800,
          color: "#000000",
          boxShadow: "4px 4px 0px #000000",
        }}
      >
        "{word}"
      </div>

      <div style={{ fontSize: 28, fontWeight: 900, color: "#64748b" }}>⬇️ Splits into Tokens ⬇️</div>

      {/* Split Tokens */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 14,
        }}
      >
        {tokens.map((token, idx) => {
          const tokenPop = spring({
            frame: frame - delayFrames - idx * 3,
            fps,
            config: { damping: 12, stiffness: 160 },
          });

          const bg = token.bg || DEFAULT_BG_COLORS[idx % DEFAULT_BG_COLORS.length];

          return (
            <div
              key={idx}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 6,
                transform: `scale(${tokenPop}) translateY(${(1 - tokenPop) * 20}px)`,
                opacity: tokenPop > 0 ? 1 : 0,
              }}
            >
              <div
                style={{
                  backgroundColor: bg,
                  border: "3px solid #000000",
                  borderRadius: 14,
                  padding: "12px 22px",
                  boxShadow: "4px 4px 0px #000000",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 32,
                  fontWeight: 900,
                  color: "#000000",
                }}
              >
                {token.text}
              </div>
              {token.tokenId !== undefined && (
                <span
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: "#64748b",
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  ID: {token.tokenId}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
