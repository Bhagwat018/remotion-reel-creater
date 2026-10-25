import React, { useMemo } from "react";
import { Audio, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { ReelData, WordTimestamp } from "./schema";
import { ensureFontsLoaded } from "./theme/fonts";
import { resolveTheme, ThemeProvider } from "./theme/theme";
import { Background } from "./components/Background";
import { Stars } from "./components/Stars";
import { HandlePill } from "./components/HandlePill";
import { Captions } from "./components/Captions";
import { SpeakingAvatar } from "./components/SpeakingAvatar";
import { getSceneComponent } from "./scenes/registry";
import { framesToSec, getSceneWords, resolveSceneTimings } from "./lib/timing";

export interface ReelProps extends ReelData {
  words?: WordTimestamp[] | null;
  [key: string]: unknown;
}

export const Reel: React.FC<ReelProps> = ({ meta, scenes, words }) => {
  ensureFontsLoaded();

  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const currentTimeSec = framesToSec(frame, fps);

  // Single theme instance with optional accent override
  const activeTheme = useMemo(
    () => resolveTheme(meta.accentOverride),
    [meta.accentOverride]
  );

  // Resolve timing for each scene (deriving start/end if words are provided)
  const resolvedScenes = useMemo(
    () => resolveSceneTimings(scenes, fps, words),
    [scenes, fps, words]
  );

  // Find active scene for captions and stars seeding
  const activeScene = useMemo(() => {
    return (
      resolvedScenes.find(
        (s) => currentTimeSec >= s.startSec && currentTimeSec < s.endSec
      ) || resolvedScenes[0]
    );
  }, [resolvedScenes, currentTimeSec]);

  // Compute active captions words for currently active scene
  const activeWords = useMemo(() => {
    if (!activeScene) return [];
    return getSceneWords(activeScene, currentTimeSec, words);
  }, [activeScene, currentTimeSec, words]);

  // Voice audio source
  const voiceSrc = useMemo(() => {
    if (!meta.voiceFile) return null;
    return staticFile(meta.voiceFile);
  }, [meta.voiceFile]);

  // Avatar config
  const avatarEnabled = meta.avatar?.enabled !== false;
  const avatarPosition = meta.avatar?.position || "left";

  return (
    <ThemeProvider theme={activeTheme}>
      <div
        style={{
          position: "relative",
          width: activeTheme.layout.width,
          height: activeTheme.layout.height,
          backgroundColor: activeTheme.colors.bg,
          overflow: "hidden",
        }}
      >
        {/* Subtle grid background that constantly drifts */}
        <Background />

        {/* Sharp spiky corner stars rotating slowly */}
        <Stars sceneId={activeScene?.data.id} />

        {/* Audio voice track */}
        {voiceSrc && <Audio src={voiceSrc} />}

        {/* Scene sequences with dynamic SFX */}
        {resolvedScenes.map((scene, sceneIndex) => {
          const SceneComponent = getSceneComponent(scene.data.type);
          // Add crossfade frames to duration so scenes blend smoothly
          const crossfadeFrames = activeTheme.motion.sceneCrossfadeFrames;
          const sequenceDuration = scene.durationInFrames + crossfadeFrames;

          // Subtle transition sound effect (whoosh for scene changes, ding for charts/stats)
          const sfxFile =
            scene.data.type === "chart" || scene.data.type === "stat"
              ? "sfx/ding.mp3"
              : "sfx/whoosh.mp3";

          return (
            <Sequence
              key={scene.data.id}
              from={scene.startFrame}
              durationInFrames={sequenceDuration}
              name={`[${scene.data.type}] ${scene.data.id}`}
            >
              {/* Subtle Scene Transition SFX */}
              {sceneIndex > 0 && (
                <Audio src={staticFile(sfxFile)} volume={0.2} />
              )}
              <SceneComponent
                {...scene.data}
                durationInFrames={sequenceDuration}
              />
            </Sequence>
          );
        })}

        {/* Animated Speaking Character Avatar with Comic Speech Bubble Captions */}
        {avatarEnabled ? (
          <SpeakingAvatar
            words={activeWords}
            enabled={true}
            position={avatarPosition}
          />
        ) : (
          <Captions words={activeWords} enabled={meta.captions ?? true} />
        )}

        {/* Fixed bottom handle pill */}
        <HandlePill handle={meta.handle} />
      </div>
    </ThemeProvider>
  );
};
