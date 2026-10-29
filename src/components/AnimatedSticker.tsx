import React, { useMemo } from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { AnimatedEmoji, EmojiName } from "@remotion/animated-emoji";

export interface AnimatedStickerProps {
  emoji?: string;
  size?: number;
  delayFrames?: number;
  style?: React.CSSProperties;
}

const EMOJI_MAP: Record<string, EmojiName> = {
  fire: "fire",
  hot: "fire",
  rocket: "rocket",
  launch: "rocket",
  fast: "rocket",
  sparkles: "sparkles",
  magic: "sparkles",
  robot: "robot",
  bot: "robot",
  ai: "robot",
  party: "partying-face",
  popper: "party-popper",
  money: "money-with-wings",
  cash: "money-with-wings",
  boom: "collision",
  collision: "collision",
  check: "check-mark",
  done: "check-mark",
  star: "star-struck",
  joy: "joy",
  laugh: "joy",
  heart: "heart-eyes",
};

export const AnimatedSticker: React.FC<AnimatedStickerProps> = ({
  emoji = "fire",
  size = 90,
  delayFrames = 6,
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame: frame - delayFrames,
    fps,
    config: {
      damping: 10,
      mass: 0.6,
      stiffness: 140,
    },
  });

  const floatY = Math.sin((frame + delayFrames * 3) * 0.1) * 4;
  const rotation = Math.sin((frame + delayFrames * 2) * 0.08) * 3;

  const resolvedEmojiName: EmojiName | null = useMemo(() => {
    const clean = emoji.toLowerCase().replace(/[^a-z-]/g, "");
    if (EMOJI_MAP[clean]) return EMOJI_MAP[clean];
    return "fire";
  }, [emoji]);

  if (scale <= 0.01) return null;

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: size,
        transform: `scale(${scale}) translateY(${floatY}px) rotate(${rotation}deg)`,
        transformOrigin: "center center",
        pointerEvents: "none",
        ...style,
      }}
    >
      {resolvedEmojiName ? (
        <AnimatedEmoji
          emoji={resolvedEmojiName}
          style={{
            width: size,
            height: size,
          }}
        />
      ) : (
        <span style={{ fontSize: size * 0.8 }}>🔥</span>
      )}
    </div>
  );
};
