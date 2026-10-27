import React from "react";
import { CalculateMetadataFunction, Composition, Still } from "remotion";
import { Reel, ReelProps } from "./Reel";
import { CoverThumbnail } from "./components/CoverThumbnail";
import { theme } from "./theme/theme";
import { computeReelDurationInFrames, resolveSceneTimings } from "./lib/timing";

export type RootReelProps = ReelProps;

const defaultFallbackProps: RootReelProps = {
  meta: {
    slug: "runtime-reel",
    title: "Tech with GenZ",
    handle: "@techwith.GenZ",
    voiceFile: "voice.mp3",
    loop: true,
    captions: true,
    avatar: { enabled: true, position: "left" },
    bgm: true,
    bgmVolume: 0.18,
    captionStyle: "bubble",
    showSafeZone: false,
    showHandle: false,
    coverIntro: false,
  },
  scenes: [
    {
      id: "s1-hook",
      type: "title",
      startSec: 0,
      endSec: 4,
      voice: "Welcome to Tech with Gen Z",
      headline: "RUNTIME *VIDEO* ENGINE",
      leadIn: undefined,
    },
  ],
};

const resolveEffectiveProps = (props: RootReelProps): RootReelProps => {
  if (props.scenes && Array.isArray(props.scenes) && props.scenes.length > 0) {
    return props;
  }
  return defaultFallbackProps;
};

export const calculateReelMetadata: CalculateMetadataFunction<RootReelProps> = async ({
  props,
}) => {
  const effectiveProps = resolveEffectiveProps(props);
  const fps = theme.motion.fps;
  const resolvedScenes = resolveSceneTimings(
    effectiveProps.scenes || [],
    fps,
    effectiveProps.words
  );
  const durationInFrames = computeReelDurationInFrames(resolvedScenes, fps);

  return {
    durationInFrames,
    fps,
    width: theme.layout.width,
    height: theme.layout.height,
    props: effectiveProps,
  };
};

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Reel"
        component={Reel as unknown as React.FC<RootReelProps>}
        calculateMetadata={calculateReelMetadata}
        defaultProps={defaultFallbackProps}
        fps={theme.motion.fps}
        width={theme.layout.width}
        height={theme.layout.height}
      />
      <Still
        id="Cover"
        component={CoverThumbnail as unknown as React.FC<RootReelProps>}
        defaultProps={defaultFallbackProps}
        width={theme.layout.width}
        height={theme.layout.height}
      />
    </>
  );
};

