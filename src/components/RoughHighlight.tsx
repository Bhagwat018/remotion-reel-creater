import React, { useMemo } from "react";
import { interpolate, useCurrentFrame } from "remotion";
import {
  Highlight,
  Circle,
  Underline,
  Box,
  StrikeThrough,
} from "@remotion/rough-notation";

export type RoughAnnotationType =
  | "highlight"
  | "circle"
  | "underline"
  | "box"
  | "strike-through";

export interface RoughHighlightProps {
  type?: RoughAnnotationType;
  color?: string;
  strokeWidth?: number;
  delayFrames?: number;
  durationFrames?: number;
  padding?: number | { top?: number; bottom?: number; left?: number; right?: number };
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export const RoughHighlight: React.FC<RoughHighlightProps> = ({
  type = "highlight",
  color,
  strokeWidth = 3,
  delayFrames = 6,
  durationFrames = 14,
  padding = 6,
  children,
  style = {},
}) => {
  const frame = useCurrentFrame();

  const progress = interpolate(
    frame - delayFrames,
    [0, durationFrames],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const defaultColor =
    color ||
    (type === "highlight"
      ? "rgba(250, 204, 21, 0.45)" // Neon Yellow highlighter
      : type === "circle"
      ? "#ef4444" // Sketchy red circle
      : type === "underline"
      ? "#06b6d4" // Electric cyan underline
      : "#ef4444");

  const normalizedPadding = useMemo(() => {
    if (typeof padding === "number") {
      return { top: padding, bottom: padding, left: padding, right: padding };
    }
    return padding;
  }, [padding]);

  const containerStyle: React.CSSProperties = {
    display: "inline-block",
    position: "relative",
    ...style,
  };

  switch (type) {
    case "circle":
      return (
        <Circle
          progress={progress}
          color={defaultColor}
          strokeWidth={strokeWidth}
          padding={normalizedPadding}
          style={containerStyle}
        >
          {children}
        </Circle>
      );
    case "underline":
      return (
        <Underline
          progress={progress}
          color={defaultColor}
          strokeWidth={strokeWidth}
          padding={{ top: normalizedPadding.bottom || 2 }}
          style={containerStyle}
        >
          {children}
        </Underline>
      );
    case "box":
      return (
        <Box
          progress={progress}
          color={defaultColor}
          strokeWidth={strokeWidth}
          padding={normalizedPadding}
          style={containerStyle}
        >
          {children}
        </Box>
      );
    case "strike-through":
      return (
        <StrikeThrough
          progress={progress}
          color={defaultColor}
          strokeWidth={strokeWidth}
          style={containerStyle}
        >
          {children}
        </StrikeThrough>
      );
    case "highlight":
    default:
      return (
        <Highlight
          progress={progress}
          color={defaultColor}
          padding={normalizedPadding}
          style={containerStyle}
        >
          {children}
        </Highlight>
      );
  }
};

