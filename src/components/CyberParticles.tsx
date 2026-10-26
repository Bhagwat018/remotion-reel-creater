import React, { useMemo } from "react";
import { useCurrentFrame } from "remotion";

export interface CyberParticlesProps {
  count?: number;
  seed?: string | number;
  color?: string;
  glowColor?: string;
}

interface Particle {
  id: number;
  baseX: number; // percentage 0 - 100
  baseY: number; // percentage 0 - 100
  size: number;
  speed: number;
  drift: number;
  phase: number;
  baseOpacity: number;
}

// Simple deterministic PRNG for pure frame repeatability
function seededRandom(seed: number) {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

export const CyberParticles: React.FC<CyberParticlesProps> = ({
  count = 28,
  seed = "cyber",
  color = "#38bdf8",
  glowColor = "rgba(56, 189, 248, 0.7)",
}) => {
  const frame = useCurrentFrame();

  const particles: Particle[] = useMemo(() => {
    const list: Particle[] = [];
    const seedNum = typeof seed === "number" ? seed : seed.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);

    for (let i = 0; i < count; i++) {
      const r1 = seededRandom(seedNum + i * 7);
      const r2 = seededRandom(seedNum + i * 13);
      const r3 = seededRandom(seedNum + i * 19);
      const r4 = seededRandom(seedNum + i * 23);

      list.push({
        id: i,
        baseX: 5 + r1 * 90, // Keep within 5% - 95%
        baseY: 10 + r2 * 80, // Keep in upper/middle content region
        size: 2.5 + r3 * 4.5, // 2.5px to 7px
        speed: 0.3 + r4 * 0.7,
        drift: (r2 - 0.5) * 30,
        phase: r1 * Math.PI * 2,
        baseOpacity: 0.25 + r3 * 0.55,
      });
    }
    return list;
  }, [count, seed]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
        zIndex: 1,
      }}
    >
      {particles.map((p) => {
        // Subtle vertical floating drift & sinusoidal horizontal sway
        const yOffset = -((frame * p.speed) % 120);
        const xOffset = Math.sin(frame * 0.04 + p.phase) * p.drift;
        const opacity = Math.max(
          0.1,
          Math.min(1, p.baseOpacity + Math.sin(frame * 0.08 + p.phase) * 0.25)
        );

        return (
          <div
            key={p.id}
            style={{
              position: "absolute",
              left: `calc(${p.baseX}% + ${xOffset}px)`,
              top: `calc(${p.baseY}% + ${yOffset}px)`,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              backgroundColor: color,
              opacity,
              boxShadow: `0 0 ${p.size * 2.5}px ${glowColor}`,
              pointerEvents: "none",
            }}
          />
        );
      })}
    </div>
  );
};
