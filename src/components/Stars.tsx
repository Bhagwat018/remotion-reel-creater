import React from "react";
import { random, useCurrentFrame } from "remotion";
import { useTheme } from "../theme/theme";

interface StarsProps {
  sceneId?: string;
}

const createSpikyStarPoints = (
  cx: number,
  cy: number,
  numPoints: number,
  outerRadius: number,
  innerRadius: number
): string => {
  const points: string[] = [];
  const step = Math.PI / numPoints;

  for (let i = 0; i < 2 * numPoints; i++) {
    const r = i % 2 === 0 ? outerRadius : innerRadius;
    const angle = i * step;
    const x = cx + r * Math.sin(angle);
    const y = cy - r * Math.cos(angle);
    points.push(`${x.toFixed(2)},${y.toFixed(2)}`);
  }

  return points.join(" ");
};

export const Stars: React.FC<StarsProps> = ({ sceneId = "default" }) => {
  const frame = useCurrentFrame();
  const theme = useTheme();

  const corners = [
    { key: "tl", x: 20, y: 20, dir: 1 },
    { key: "tr", x: theme.layout.width - 20, y: 20, dir: -1 },
    { key: "bl", x: 20, y: theme.layout.height - 20, dir: -1 },
    { key: "br", x: theme.layout.width - 20, y: theme.layout.height - 20, dir: 1 },
  ];

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: theme.layout.width,
        height: theme.layout.height,
        pointerEvents: "none",
        overflow: "hidden",
        zIndex: 1,
      }}
    >
      {corners.map((corner, index) => {
        const seedBase = `${sceneId}-star-${corner.key}`;
        const numPoints = Math.round(8 + random(`${seedBase}-pts`) * 4); // 8 to 12 sharp points
        const outerRadius = 180 + random(`${seedBase}-rad`) * 90; // large spiky size
        const innerRadius = outerRadius * (0.35 + random(`${seedBase}-inner`) * 0.15); // sharp ratio

        // Deterministic slow drift
        const driftAngle = random(`${seedBase}-drift`) * Math.PI * 2;
        const driftDistance = 12 * Math.sin(frame * 0.05 + index);
        const curX = corner.x + Math.cos(driftAngle) * driftDistance;
        const curY = corner.y + Math.sin(driftAngle) * driftDistance;

        // Slow rotation
        const rotSpeed = theme.motion.stars.rotationSpeed * (0.8 + index * 0.15);
        const rotationDeg = frame * rotSpeed * corner.dir;

        const points = createSpikyStarPoints(0, 0, numPoints, outerRadius, innerRadius);

        return (
          <svg
            key={corner.key}
            style={{
              position: "absolute",
              left: curX - outerRadius,
              top: curY - outerRadius,
              width: outerRadius * 2,
              height: outerRadius * 2,
              transform: `rotate(${rotationDeg}deg)`,
              transformOrigin: "center center",
            }}
            viewBox={`${-outerRadius} ${-outerRadius} ${outerRadius * 2} ${outerRadius * 2}`}
          >
            <polygon points={points} fill={theme.colors.ink} opacity={0.95} />
          </svg>
        );
      })}
    </div>
  );
};
