import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface StackedCardItem {
  text: string;
  highlightWord?: string;
  highlightColor?: string;
  emoji?: string;
}

interface NeoStackedCardsProps {
  cards?: StackedCardItem[];
  delayFrames?: number;
}

export const NeoStackedCards: React.FC<NeoStackedCardsProps> = ({
  cards = [
    {
      text: '"Garmi aayi, chalo aam khaate hain."',
      highlightWord: "aam",
      highlightColor: "#fb923c",
      emoji: "🥭",
    },
    {
      text: '"Ye koi khaas baat nahi, bilkul aam baat hai."',
    },
  ],
  delayFrames = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 22,
        width: "100%",
        maxWidth: 920,
      }}
    >
      {cards.map((card, idx) => {
        const itemEntrance = spring({
          frame: frame - (delayFrames + idx * 8),
          fps,
          config: { damping: 13, stiffness: 120 },
        });

        // Split text by highlightWord if present
        const parts = card.highlightWord
          ? card.text.split(new RegExp(`(${card.highlightWord})`, "gi"))
          : [card.text];

        return (
          <div
            key={idx}
            style={{
              backgroundColor: "#ffffff",
              border: "4px solid #000000",
              borderRadius: 22,
              padding: "26px 32px",
              boxShadow: "7px 7px 0px #000000",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              transform: `scale(${Math.max(0, itemEntrance)}) translateY(${
                (1 - itemEntrance) * 20
              }px)`,
              opacity: itemEntrance,
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                fontFamily: "'Cabinet Grotesk', -apple-system, sans-serif",
                fontSize: 34,
                fontWeight: 800,
                color: "#000000",
                lineHeight: 1.35,
                flex: 1,
              }}
            >
              {parts.map((p, pIdx) => {
                const isMatch =
                  card.highlightWord &&
                  p.toLowerCase() === card.highlightWord.toLowerCase();

                if (isMatch) {
                  return (
                    <span
                      key={pIdx}
                      style={{
                        backgroundColor: card.highlightColor || "#fb923c",
                        border: "2.5px solid #000000",
                        borderRadius: 10,
                        padding: "2px 10px",
                        margin: "0 6px",
                        display: "inline-block",
                        color: "#000000",
                        fontWeight: 900,
                        boxShadow: "2px 2px 0px #000000",
                      }}
                    >
                      {p}
                    </span>
                  );
                }
                return <span key={pIdx}>{p}</span>;
              })}
            </div>

            {card.emoji && (
              <span
                style={{
                  fontSize: 54,
                  marginLeft: 18,
                  flexShrink: 0,
                  transform: `scale(${Math.sin((frame + idx * 10) / 8) * 0.08 + 1})`,
                }}
              >
                {card.emoji}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};
