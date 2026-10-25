import { SceneData, WordTimestamp } from "../schema";

export interface ResolvedScene {
  data: SceneData;
  startSec: number;
  endSec: number;
  startFrame: number;
  durationInFrames: number;
}

export interface ActiveWord {
  word: string;
  startSec: number;
  endSec: number;
  isActive: boolean;
}

export const secToFrames = (sec: number, fps: number): number => {
  return Math.max(1, Math.round(sec * fps));
};

export const framesToSec = (frames: number, fps: number): number => {
  return frames / fps;
};

/**
 * Normalizes text to lower-case alphanumeric tokens for fuzzy matching.
 */
const tokenize = (text: string): string[] => {
  return text
    .toLowerCase()
    .replace(/[^\w\s\u0900-\u097F]/g, "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
};

/**
 * Derives startSec and endSec for scenes if missing, using word timestamps or heuristics.
 */
export const resolveSceneTimings = (
  scenes: SceneData[],
  fps: number,
  words?: WordTimestamp[] | null
): ResolvedScene[] => {
  let currentCursorSec = 0;
  let wordSearchIndex = 0;

  return scenes.map((scene) => {
    let startSec = scene.startSec;
    let endSec = scene.endSec;

    // If timing is missing and words exist, try to match scene.voice with words array
    if ((startSec === undefined || endSec === undefined) && words && words.length > 0) {
      const sceneTokens = tokenize(scene.voice);
      if (sceneTokens.length > 0) {
        // Find matching sequence starting from wordSearchIndex
        let matchStartIndex = -1;
        for (let i = wordSearchIndex; i < words.length; i++) {
          const w = tokenize(words[i].word)[0];
          if (w && w === sceneTokens[0]) {
            matchStartIndex = i;
            break;
          }
        }

        if (matchStartIndex !== -1) {
          const matchEndIndex = Math.min(
            words.length - 1,
            matchStartIndex + sceneTokens.length - 1
          );
          startSec = startSec ?? words[matchStartIndex].startSec;
          endSec = endSec ?? words[matchEndIndex].endSec;
          wordSearchIndex = matchEndIndex + 1;
        }
      }
    }

    // Fallback if still undefined: estimate ~2.5 words per second (min 2.5s)
    if (startSec === undefined) {
      startSec = currentCursorSec;
    }
    if (endSec === undefined) {
      const wordCount = scene.voice.split(/\s+/).length;
      const estimatedDuration = Math.max(2.5, wordCount / 2.5);
      endSec = startSec + estimatedDuration;
    }

    // Ensure valid non-negative monotonic timing
    if (endSec <= startSec) {
      endSec = startSec + 2.0;
    }

    currentCursorSec = endSec;

    const startFrame = Math.round(startSec * fps);
    const durationInFrames = Math.max(1, Math.round((endSec - startSec) * fps));

    return {
      data: scene,
      startSec,
      endSec,
      startFrame,
      durationInFrames,
    };
  });
};

/**
 * Computes the total composition duration in frames based on the last scene's endSec + 0.5s tail.
 */
export const computeReelDurationInFrames = (
  scenes: ResolvedScene[],
  fps: number
): number => {
  if (!scenes || scenes.length === 0) {
    return fps * 5;
  }
  const lastScene = scenes[scenes.length - 1];
  const tailSeconds = 0.5;
  return Math.max(30, Math.round((lastScene.endSec + tailSeconds) * fps));
};

/**
 * Returns the word timestamps for a specific scene.
 * If external word timestamps exist, uses them. Otherwise splits voice text evenly.
 */
export const getSceneWords = (
  scene: ResolvedScene,
  currentTimeSec: number,
  words?: WordTimestamp[] | null
): ActiveWord[] => {
  const { startSec, endSec, data } = scene;
  const duration = Math.max(0.1, endSec - startSec);

  // If words array is provided, filter words inside scene window
  if (words && words.length > 0) {
    const matched = words.filter(
      (w) => w.startSec >= startSec - 0.1 && w.endSec <= endSec + 0.2
    );

    if (matched.length > 0) {
      return matched.map((w) => ({
        word: w.word,
        startSec: w.startSec,
        endSec: w.endSec,
        isActive: currentTimeSec >= w.startSec && currentTimeSec < w.endSec,
      }));
    }
  }

  // Fallback: split spoken text evenly across the scene duration
  const rawWords = data.voice.split(/\s+/).filter(Boolean);
  if (rawWords.length === 0) return [];

  const wordDuration = duration / rawWords.length;
  return rawWords.map((word, i) => {
    const wStart = startSec + i * wordDuration;
    const wEnd = wStart + wordDuration;
    return {
      word,
      startSec: wStart,
      endSec: wEnd,
      isActive: currentTimeSec >= wStart && currentTimeSec < wEnd,
    };
  });
};
