import { interpolate, spring } from "remotion";
import React from "react";

export type MotionDirection =
  | "from-left"
  | "from-right"
  | "from-top"
  | "from-bottom"
  | "pop-3d";

const ALL_DIRECTIONS: MotionDirection[] = [
  "from-left",
  "from-right",
  "from-top",
  "from-bottom",
  "pop-3d",
];

// Hash a string (slug or seed) to a deterministic number
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

/**
 * Returns a deterministic sequence of directions for a reel slug.
 * Guarantees:
 * 1. No two consecutive scenes in the same video have the same direction.
 * 2. Two different videos (different slugs) get completely different sequences.
 */
export function getSceneDirection(slug: string, sceneIndex: number): MotionDirection {
  const seed = hashString(slug || "reel-seed");
  // Prime offsets to create rich pseudo-random permutations
  const primes = [3, 7, 11, 13, 17, 19, 23, 29, 31];
  const prime = primes[sceneIndex % primes.length];

  // Base index from seed + sceneIndex
  let dirIdx = (seed + sceneIndex * prime) % ALL_DIRECTIONS.length;

  // If this happens to match previous scene's direction, shift by 1
  if (sceneIndex > 0) {
    const prevPrime = primes[(sceneIndex - 1) % primes.length];
    const prevIdx = (seed + (sceneIndex - 1) * prevPrime) % ALL_DIRECTIONS.length;
    if (dirIdx === prevIdx) {
      dirIdx = (dirIdx + 1) % ALL_DIRECTIONS.length;
    }
  }

  return ALL_DIRECTIONS[dirIdx];
}

/**
 * Computes CSS transform and opacity for a content canvas element based on direction.
 */
export function getDirectionalStyle(
  direction: MotionDirection,
  frame: number,
  fps: number,
  delayFrames = 2
): React.CSSProperties {
  const springProgress = spring({
    frame: Math.max(0, frame - delayFrames),
    fps,
    config: { damping: 13, stiffness: 120, mass: 0.8 },
  });

  const opacity = interpolate(springProgress, [0, 0.4, 1], [0, 0.8, 1]);

  switch (direction) {
    case "from-left": {
      const translateX = interpolate(springProgress, [0, 1], [-850, 0]);
      const rotateZ = interpolate(springProgress, [0, 1], [-4, 0]);
      return {
        transform: `translateX(${translateX}px) rotateZ(${rotateZ}deg)`,
        opacity,
      };
    }

    case "from-right": {
      const translateX = interpolate(springProgress, [0, 1], [850, 0]);
      const rotateZ = interpolate(springProgress, [0, 1], [4, 0]);
      return {
        transform: `translateX(${translateX}px) rotateZ(${rotateZ}deg)`,
        opacity,
      };
    }

    case "from-top": {
      const translateY = interpolate(springProgress, [0, 1], [-650, 0]);
      const scale = interpolate(springProgress, [0, 1], [0.9, 1]);
      return {
        transform: `translateY(${translateY}px) scale(${scale})`,
        opacity,
      };
    }

    case "from-bottom": {
      const translateY = interpolate(springProgress, [0, 1], [650, 0]);
      const rotateX = interpolate(springProgress, [0, 1], [14, 0]);
      return {
        transform: `perspective(900px) translateY(${translateY}px) rotateX(${rotateX}deg)`,
        opacity,
      };
    }

    case "pop-3d":
    default: {
      const scale = interpolate(springProgress, [0, 1], [0.4, 1]);
      const rotateY = interpolate(springProgress, [0, 1], [12, 0]);
      return {
        transform: `perspective(1000px) scale(${scale}) rotateY(${rotateY}deg)`,
        opacity,
      };
    }
  }
}
