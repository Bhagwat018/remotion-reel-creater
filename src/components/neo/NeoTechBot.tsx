import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

interface NeoTechBotProps {
  size?: number;
  delayFrames?: number;
  expression?: "happy" | "winking" | "curious";
}

export const NeoTechBot: React.FC<NeoTechBotProps> = ({
  size = 280,
  delayFrames = 0,
  expression = "happy",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - delayFrames,
    fps,
    config: { damping: 12, stiffness: 120 },
  });

  // Gentle hovering float bob
  const hoverY = Math.sin((frame - delayFrames) / 9) * 8;
  // Antenna lamp glowing pulse
  const glowPulse = Math.sin((frame - delayFrames) / 6) * 0.4 + 0.6;
  // Natural blinking
  const isBlinking = (frame - delayFrames) % 90 < 6 && expression !== "winking";
  // Arm gentle waving
  const armWave = Math.sin((frame - delayFrames) / 8) * 12;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        transform: `scale(${Math.max(0, entrance)}) translateY(${hoverY}px)`,
        transformOrigin: "center bottom",
        position: "relative",
        userSelect: "none",
      }}
    >
      <svg
        width={size}
        height={size * 1.05}
        viewBox="0 0 280 295"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Soft Ground Shadow */}
        <ellipse
          cx="140"
          cy="282"
          rx={65 * Math.max(0.7, 1 - hoverY / 40)}
          ry={10}
          fill="rgba(0,0,0,0.22)"
        />

        {/* Antenna Stem */}
        <line
          x1="140"
          y1="56"
          x2="140"
          y2="24"
          stroke="#000000"
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* Antenna Glowing Bulb */}
        <circle
          cx="140"
          cy="20"
          r={16}
          fill="#fef08a"
          opacity={glowPulse * 0.6}
        />
        <circle
          cx="140"
          cy="20"
          r={11}
          fill="#eab308"
          stroke="#000000"
          strokeWidth="3.5"
        />

        {/* Left Stub Arm */}
        <rect
          x="32"
          y={140 + armWave}
          width="46"
          height="26"
          rx="13"
          fill="#f97316"
          stroke="#000000"
          strokeWidth="4"
          transform={`rotate(${-15 + armWave * 0.8} 55 ${153 + armWave})`}
        />

        {/* Right Stub Arm */}
        <rect
          x="202"
          y={140 - armWave}
          width="46"
          height="26"
          rx="13"
          fill="#f97316"
          stroke="#000000"
          strokeWidth="4"
          transform={`rotate(${15 - armWave * 0.8} 225 ${153 - armWave})`}
        />

        {/* Main Body (Orange Sphere with Neo-Brutal Shadow & Border) */}
        <circle
          cx="140"
          cy="155"
          r="92"
          fill="#f97316"
          stroke="#000000"
          strokeWidth="5"
        />
        {/* Body Highlight */}
        <path
          d="M80 115 A70 70 0 0 1 180 85"
          stroke="#fb923c"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />

        {/* Stubby Feet */}
        <rect
          x="104"
          y="238"
          width="30"
          height="22"
          rx="10"
          fill="#ea580c"
          stroke="#000000"
          strokeWidth="4"
        />
        <rect
          x="146"
          y="238"
          width="30"
          height="22"
          rx="10"
          fill="#ea580c"
          stroke="#000000"
          strokeWidth="4"
        />

        {/* Dark Screen Monitor Visor */}
        <rect
          x="75"
          y="108"
          width="130"
          height="82"
          rx="26"
          fill="#0f172a"
          stroke="#000000"
          strokeWidth="4.5"
        />

        {/* Glowing Screen Eyes */}
        {isBlinking ? (
          <>
            <line
              x1="98"
              y1="145"
              x2="118"
              y2="145"
              stroke="#38bdf8"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <line
              x1="162"
              y1="145"
              x2="182"
              y2="145"
              stroke="#38bdf8"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </>
        ) : (
          <>
            {/* Left Eye */}
            <ellipse cx="108" cy="144" rx="10" ry="12" fill="#38bdf8" />
            <circle cx="111" cy="141" r="3.5" fill="#ffffff" />

            {/* Right Eye */}
            {expression === "winking" ? (
              <path
                d="M158 144 Q168 136 178 144"
                stroke="#38bdf8"
                strokeWidth="5"
                strokeLinecap="round"
                fill="none"
              />
            ) : (
              <>
                <ellipse cx="172" cy="144" rx="10" ry="12" fill="#38bdf8" />
                <circle cx="175" cy="141" r="3.5" fill="#ffffff" />
              </>
            )}
          </>
        )}

        {/* Cute Visor Rosy Cheeks */}
        <ellipse cx="94" cy="158" rx="6" ry="4" fill="#334155" />
        <ellipse cx="186" cy="158" rx="6" ry="4" fill="#334155" />

        {/* Glowing Smile Mouth */}
        <path
          d="M125 162 Q140 172 155 162"
          stroke="#38bdf8"
          strokeWidth="4.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Power Core Button on Belly */}
        <circle
          cx="140"
          cy="216"
          r="8"
          fill="#2dd4bf"
          stroke="#000000"
          strokeWidth="3"
        />
      </svg>
    </div>
  );
};
