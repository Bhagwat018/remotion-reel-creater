import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Gif } from "@remotion/gif";

export interface MemeGifProps {
  src: string;
  title?: string;
  width?: number;
  height?: number;
  delayFrames?: number;
  position?: "center" | "bottom-right" | "top-right" | "inline";
  style?: React.CSSProperties;
}

export const MemeGif: React.FC<MemeGifProps> = ({
  src,
  title = "REACTION ⚡",
  width = 380,
  height = 240,
  delayFrames = 6,
  position = "inline",
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame: frame - delayFrames,
    fps,
    config: {
      damping: 11,
      mass: 0.8,
      stiffness: 130,
    },
  });

  const positionStyle: React.CSSProperties = React.useMemo(() => {
    switch (position) {
      case "bottom-right":
        return { position: "absolute", bottom: 220, right: 40, zIndex: 35 };
      case "top-right":
        return { position: "absolute", top: 120, right: 40, zIndex: 35 };
      case "center":
        return { position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 35 };
      case "inline":
      default:
        return { position: "relative", zIndex: 20 };
    }
  }, [position]);

  if (scale <= 0.01) return null;

  return (
    <div
      style={{
        ...positionStyle,
        width,
        backgroundColor: "#ffffff",
        border: "3.5px solid #000000",
        borderRadius: 16,
        overflow: "hidden",
        boxShadow: "6px 6px 0px #000000",
        transform: `${positionStyle.transform || ""} scale(${scale})`,
        transformOrigin: "center center",
        ...style,
      }}
    >
      {/* Top Title Bar */}
      <div
        style={{
          backgroundColor: "#fef08a",
          borderBottom: "2.5px solid #000000",
          padding: "6px 14px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 13,
          fontWeight: 800,
          color: "#000000",
        }}
      >
        <span>{title}</span>
        <div style={{ display: "flex", gap: 5 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#ef4444", border: "1px solid #000" }} />
          <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#eab308", border: "1px solid #000" }} />
          <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#22c55e", border: "1px solid #000" }} />
        </div>
      </div>

      {/* Embedded Gif Canvas */}
      <div
        style={{
          width: "100%",
          height,
          backgroundColor: "#000000",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <Gif
          src={src}
          width={width}
          height={height}
          fit="cover"
          loopBehavior="loop"
        />
      </div>
    </div>
  );
};
