import React from "react";
import { CalculateMetadataFunction, Composition } from "remotion";
import { Reel, ReelProps } from "./Reel";
import { ReelData } from "./schema";
import { theme } from "./theme/theme";
import { computeReelDurationInFrames, resolveSceneTimings } from "./lib/timing";

import demoHallucination from "../reels/demo-hallucination/reel.json";
import demoShowcase from "../reels/demo-showcase/reel.json";
import templateReel from "../reels/_template/reel.json";

export const AVAILABLE_REELS: Record<string, ReelData> = {
  "demo-hallucination": demoHallucination as unknown as ReelData,
  "demo-showcase": demoShowcase as unknown as ReelData,
  "_template": templateReel as unknown as ReelData,
};

export interface RootReelProps extends ReelProps {
  presetSlug?: "demo-hallucination" | "demo-showcase" | "_template";
}

const resolveEffectiveProps = (props: RootReelProps): RootReelProps => {
  if (props.scenes && Array.isArray(props.scenes) && props.scenes.length > 0) {
    return props;
  }
  if (props.presetSlug && AVAILABLE_REELS[props.presetSlug]) {
    return {
      ...(AVAILABLE_REELS[props.presetSlug] as ReelProps),
      presetSlug: props.presetSlug,
    };
  }
  return demoHallucination as unknown as RootReelProps;
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
        defaultProps={demoHallucination as unknown as RootReelProps}
        fps={theme.motion.fps}
        width={theme.layout.width}
        height={theme.layout.height}
      />
    </>
  );
};
