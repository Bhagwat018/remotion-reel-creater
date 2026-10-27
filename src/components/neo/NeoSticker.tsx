import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

interface NeoStickerProps {
  text: string;
  rotate?: number;
  bg?: string;
  color?: string;
  fontSize?: number;
  delayFrames?: number;
}

export const NeoSticker: React.FC<NeoStickerProps> = ({
  text,
  rotate = -4,
  bg = "#ec4899",
  color = "#ffffff",
  fontSize = 32,
  delayFrames = 4,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pop = spring({
    frame: frame - delayFrames,
    fps,
    config: { damping: 12, stiffness: 180 },
  });

  return (
    <div
      style={{
        display: "inline-block",
        backgroundColor: bg,
        color: color,
        border: "3px solid #000000",
        borderRadius: 14,
        padding: "8px 20px",
        boxShadow: "4px 4px 0px #000000",
        fontFamily: "'Inter', sans-serif",
        fontSize,
        fontWeight: 900,
        letterSpacing: "-0.01em",
        transform: `scale(${pop}) rotate(${rotate}deg)`,
        opacity: pop > 0 ? 1 : 0,
      }}
    >
      {text}
    </div>
  );
};
