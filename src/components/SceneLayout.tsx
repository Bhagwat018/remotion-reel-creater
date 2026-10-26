import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { useTheme } from "../theme/theme";
import { getSceneMotionStyle } from "../lib/motion";
import { LeadIn } from "./LeadIn";
import { Headline } from "./Headline";
import { CyberParticles } from "./CyberParticles";
import {
  MotionDirection,
  getSceneDirection,
  getDirectionalStyle,
} from "../lib/directionalMotion";

export interface SceneLayoutProps {
  id?: string;
  leadIn?: string;
  headline?: string;
  durationInFrames: number;
  direction?: MotionDirection;
  sceneIndex?: number;
  slug?: string;
  children?: React.ReactNode;
}

export const SceneLayout: React.FC<SceneLayoutProps> = ({
  id,
  leadIn,
  headline,
  durationInFrames,
  direction,
  sceneIndex,
  slug,
  children,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const theme = useTheme();

  // Extract scene numeric index from id (e.g. "s1-hook" -> 0, "s2-code" -> 1) if not passed directly
  const computedIndex =
    sceneIndex ??
    (() => {
      if (id) {
        const match = id.match(/s(\d+)/i);
        if (match) return Math.max(0, parseInt(match[1], 10) - 1);
      }
      return 0;
    })();

  // Resolve direction: explicit override in JSON > or smart seeded shuffle
  const resolvedDirection =
    direction || getSceneDirection(slug || id || headline || "scene", computedIndex);

  // Directional entrance transform for the visual content
  const directionalStyle = getDirectionalStyle(resolvedDirection, frame, fps, 3);
  const containerMotionStyle = getSceneMotionStyle(frame, durationInFrames);

  return (
    <div
      style={{
        ...containerMotionStyle,
        position: "absolute",
        top: 0,
        left: 0,
        width: theme.layout.width,
        height: theme.layout.height,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: theme.layout.safeTop,
        paddingLeft: theme.layout.sideMargin,
        paddingRight: theme.layout.sideMargin,
        boxSizing: "border-box",
        zIndex: 10,
      }}
    >
      {/* Ambient Cyber Particles (Remotion Scenes) */}
      <CyberParticles count={16} seed={headline || leadIn || id || 42} />

      {/* Top Header Zone */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          marginBottom: 44,
        }}
      >
        {leadIn && <LeadIn text={leadIn} />}
        {headline && <Headline text={headline} />}
      </div>

      {/* Visual Content Zone with Kinetic Directional Physics */}
      <div
        style={{
          flex: 1,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: theme.layout.safeBottom - 100,
          ...directionalStyle,
        }}
      >
        {children}
      </div>
    </div>
  );
};
