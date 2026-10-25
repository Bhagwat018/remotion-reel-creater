import React from "react";
import { useCurrentFrame } from "remotion";
import { resolveFontFamily, useTheme } from "../theme/theme";
import { useBlurIn } from "../lib/motion";

interface LeadInProps {
  text?: string;
  delayFrames?: number;
}

export const LeadIn: React.FC<LeadInProps> = ({ text, delayFrames = 0 }) => {
  const frame = useCurrentFrame();
  const theme = useTheme();

  const motionStyle = useBlurIn(frame, delayFrames);

  if (!text) return null;

  const fontFamily = resolveFontFamily(text, theme.typography.leadIn);

  return (
    <div
      style={{
        ...motionStyle,
        fontFamily,
        fontSize: 34,
        fontWeight: 400,
        color: theme.colors.muted,
        textTransform: "lowercase",
        letterSpacing: "0.02em",
        marginBottom: 16,
        textAlign: "center",
      }}
    >
      {text}
    </div>
  );
};
