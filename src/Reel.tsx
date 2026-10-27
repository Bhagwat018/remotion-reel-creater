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
import { KineticCaptions } from "./components/KineticCaptions";
import { SafeZoneOverlay } from "./components/SafeZoneOverlay";
import { CoverThumbnail } from "./components/CoverThumbnail";
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
    const clean = meta.voiceFile.replace(/^\/?public\//, "").replace(/^\//, "");
    return staticFile(clean);
  }, [meta.voiceFile]);

  // Background music with intelligent ducking
  const bgmSrc = useMemo(() => {
    if (!meta.bgm) return null;
    let path = typeof meta.bgm === "string" ? meta.bgm : "bgm/cyber-groove.mp3";
    path = path.replace(/^\/?public\//, "").replace(/^\//, "");
    return staticFile(path);
  }, [meta.bgm]);

  // Avatar config
  const avatarEnabled = meta.avatar?.enabled !== false;
  const avatarPosition = meta.avatar?.position || "left";
  const captionStyle = meta.captionStyle || (avatarEnabled ? "bubble" : "kinetic");

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

        {/* Background Music with Intelligent Auto-Ducking */}
        {bgmSrc && (
          <Audio
            src={bgmSrc}
            volume={(f) => {
              const tSec = f / fps;
              const talking =
                words && words.length > 0
                  ? words.some(
                      (w) =>
                        tSec >= w.startSec - 0.12 && tSec <= w.endSec + 0.12
                    )
                  : true;
              return talking ? 0.06 : (meta.bgmVolume || 0.22);
            }}
            loop
          />
        )}

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
                sceneIndex={sceneIndex}
                slug={meta.slug}
                durationInFrames={sequenceDuration}
              />
            </Sequence>
          );
        })}

        {/* Subtitles: Avatar Bubble and/or Viral Kinetic Pop Captions */}
        {(captionStyle === "bubble" || captionStyle === "both") && (
          avatarEnabled ? (
            <SpeakingAvatar
              words={activeWords}
              enabled={true}
              position={avatarPosition}
            />
          ) : (
            <Captions words={activeWords} enabled={meta.captions ?? true} />
          )
        )}

        {(captionStyle === "kinetic" || captionStyle === "both") && (
          <KineticCaptions words={activeWords} enabled={meta.captions ?? true} />
        )}

        {/* Fixed bottom handle pill (only when explicitly requested) */}
        {meta.showHandle && <HandlePill handle={meta.handle} />}

        {/* Social Safe Zone Overlay (Instagram & YouTube Shorts UI Guides) */}
        <SafeZoneOverlay visible={Boolean(meta.showSafeZone)} />

        {/* Frame 0 Poster Injection (guarantees platform thumbnail is cover image) */}
        {frame === 0 && meta.coverIntro && (
          <Sequence durationInFrames={1}>
            <CoverThumbnail meta={meta} scenes={scenes} />
          </Sequence>
        )}
      </div>
    </ThemeProvider>
  );
};

