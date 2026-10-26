import React from "react";
import { useCurrentFrame } from "remotion";
import { useTheme } from "../theme/theme";
import { getSceneMotionStyle } from "../lib/motion";
import { LeadIn } from "./LeadIn";
import { Headline } from "./Headline";
import { CyberParticles } from "./CyberParticles";

interface SceneLayoutProps {
  leadIn?: string;
  headline?: string;
  durationInFrames: number;
  children?: React.ReactNode;
}

export const SceneLayout: React.FC<SceneLayoutProps> = ({
  leadIn,
  headline,
  durationInFrames,
  children,
}) => {
  const frame = useCurrentFrame();
  const theme = useTheme();

  const motionStyle = getSceneMotionStyle(frame, durationInFrames);

  return (
    <div
      style={{
        ...motionStyle,
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
      <CyberParticles count={16} seed={headline || leadIn || 42} />

      {/* Top Header Zone */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          marginBottom: 48,
        }}
      >
        {leadIn && <LeadIn text={leadIn} />}
        {headline && <Headline text={headline} />}
      </div>

      {/* Visual Content Zone */}
      <div
        style={{
          flex: 1,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: theme.layout.safeBottom - 100,
        }}
      >
        {children}
      </div>
    </div>
  );
};
