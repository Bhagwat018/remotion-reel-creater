import React from "react";
import { interpolate, OffthreadVideo, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
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
import { AutoTechBadge } from "./AutoTechBadge";

export interface SceneLayoutProps {
  id?: string;
  leadIn?: string;
  headline?: string;
  durationInFrames: number;
  direction?: MotionDirection;
  sceneIndex?: number;
  slug?: string;
  brand?: string;
  showTechBadge?: boolean;
  brollVideo?: string;
  bgImage?: string;
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
  brand,
  showTechBadge,
  brollVideo,
  bgImage,
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

  const isFirstScene = computedIndex === 0;
  // Directional entrance transform for the visual content (scene 0 starts immediately in place)
  const directionalStyle = isFirstScene
    ? { opacity: 1, transform: "none" }
    : getDirectionalStyle(resolvedDirection, frame, fps, 3);
  const containerMotionStyle = isFirstScene
    ? {
        opacity: frame > durationInFrames - 8 ? Math.max(0, (durationInFrames - frame) / 8) : 1,
      }
    : getSceneMotionStyle(frame, durationInFrames);

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
      {/* 0. CINEMATIC REAL VIDEO OR IMAGE BACKGROUND */}
      {(brollVideo || bgImage) && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: theme.layout.width,
            height: theme.layout.height,
            zIndex: 0,
            overflow: "hidden",
            pointerEvents: "none",
          }}
        >
          {brollVideo ? (
            <OffthreadVideo
              src={staticFile(brollVideo.replace(/^\/?public\//, "").replace(/^\//, ""))}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transform: `scale(${interpolate(frame, [0, durationInFrames], [1.0, 1.08], { extrapolateRight: "clamp" })})`,
              }}
              muted
            />
          ) : (
            <img
              src={staticFile(bgImage!.replace(/^\/?public\//, "").replace(/^\//, ""))}
              alt="Cinematic BG"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transform: `scale(${interpolate(frame, [0, durationInFrames], [1.0, 1.08], { extrapolateRight: "clamp" })})`,
              }}
            />
          )}
          {/* Dark Glassmorphic Vignette Overlay for High Readability of Foreground Cards */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(to bottom, rgba(5, 8, 15, 0.78) 0%, rgba(5, 8, 15, 0.60) 40%, rgba(5, 8, 15, 0.90) 100%)",
            }}
          />
        </div>
      )}

      {/* Ambient Cyber Particles (Remotion Scenes) */}
      <CyberParticles count={16} seed={headline || leadIn || id || 42} />

      {/* Auto-detected 3D Tech Logo Badge */}
      {showTechBadge !== false && (
        <AutoTechBadge
          brandName={brand}
          contextText={`${headline || ""} ${leadIn || ""} ${id || ""}`}
          delayFrames={5}
        />
      )}

      {/* Top Header Zone */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          marginBottom: headline ? 28 : 16,
          gap: 12,
        }}
      >
        {leadIn && <LeadIn text={leadIn} delayFrames={isFirstScene ? 0 : 0} />}
        {headline && (
          <Headline
            text={headline}
            delayFrames={isFirstScene ? 0 : 2}
            color={brollVideo || bgImage ? "#ffffff" : undefined}
            textShadow={brollVideo || bgImage ? "0 6px 24px rgba(0,0,0,0.95)" : undefined}
          />
        )}
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
          marginBottom: 490,
          gap: 20,
          ...directionalStyle,
        }}
      >
        {children}
      </div>
    </div>
  );
};
