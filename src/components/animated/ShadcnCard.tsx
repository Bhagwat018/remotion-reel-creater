import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { BorderBeam } from "./BorderBeam";

export interface ShadcnCardProps {
  children: React.ReactNode;
  borderBeam?: boolean;
  beamColorFrom?: string;
  beamColorTo?: string;
  style?: React.CSSProperties;
  delayFrames?: number;
}

/**
 * ShadcnCard - Sleek dark glassmorphic card container with optional rotating border beam
 * Inspired by shadcn/ui & makeitanimated.dev
 */
export const ShadcnCard: React.FC<ShadcnCardProps> = ({
  children,
  borderBeam = true,
  beamColorFrom = "#06b6d4",
  beamColorTo = "#3b82f6",
  style,
  delayFrames = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entranceSpring = spring({
    frame: frame - delayFrames,
    fps,
    config: { damping: 13, stiffness: 130 },
  });

  return (
    <div
      style={{
        position: "relative",
        transform: `scale(${entranceSpring})`,
        opacity: entranceSpring,
        backgroundColor: "#ffffff",
        border: "3.5px solid #000000",
        borderRadius: 24,
        padding: "24px 28px",
        boxShadow: "6px 6px 0px #000000",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        ...style,
      }}
    >
      {borderBeam && (
        <BorderBeam
          colorFrom={beamColorFrom}
          colorTo={beamColorTo}
          borderRadius={20}
          borderWidth={3}
          duration={80}
        />
      )}
      <div style={{ position: "relative", zIndex: 3, width: "100%" }}>
        {children}
      </div>
    </div>
  );
};
