import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { resolveFontFamily, useTheme } from "../theme/theme";
import { entranceSpring } from "../lib/motion";
import { TechLogo, getBrandMeta } from "./TechLogo";

export interface OrbitLoopProps {
  nodes: string[];
  center?: string;
  delayFrames?: number;
}

export const OrbitLoop: React.FC<OrbitLoopProps> = ({
  nodes,
  center,
  delayFrames = 4,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const theme = useTheme();

  const radius = 260;
  const cx = 380;
  const cy = 340;
  const count = Math.max(1, nodes.length);

  const springVal = entranceSpring(frame, fps, delayFrames);
  const scale = interpolate(springVal, [0, 1], [0.85, 1]);
  const opacity = interpolate(springVal, [0, 1], [0, 1]);

  // Rotating orbit angles
  const rotateOuter = (frame * 0.7) % 360;
  const rotateInner = (-frame * 1.1) % 360;

  // Center brand meta & glow
  const centerBrand = center ? getBrandMeta(center) : null;
  const centerColor = centerBrand ? centerBrand.defaultColor : "#38bdf8";

  // Center breathing pulse
  const centerPulse = 1 + Math.sin(frame / 8) * 0.035;

  return (
    <div
      style={{
        position: "relative",
        width: cx * 2,
        height: cy * 2,
        margin: "0 auto",
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      {/* SVG Connecting Electric Beams & Orbit Rings */}
      <svg
        width={cx * 2}
        height={cy * 2}
        style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
      >
        <defs>
          <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={centerColor} stopOpacity="0.4" />
            <stop offset="100%" stopColor={centerColor} stopOpacity="0" />
          </radialGradient>
          <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Orbit Path */}
        <circle
          cx={cx}
          cy={cy}
          r={radius}
          fill="none"
          stroke="rgba(56, 189, 248, 0.25)"
          strokeWidth="2.5"
          strokeDasharray="10 14"
          style={{
            transformOrigin: `${cx}px ${cy}px`,
            transform: `rotate(${rotateOuter}deg)`,
          }}
        />

        {/* Inner Counter Orbit Path */}
        <circle
          cx={cx}
          cy={cy}
          r={radius - 60}
          fill="none"
          stroke="rgba(99, 102, 241, 0.2)"
          strokeWidth="1.5"
          strokeDasharray="6 10"
          style={{
            transformOrigin: `${cx}px ${cy}px`,
            transform: `rotate(${rotateInner}deg)`,
          }}
        />

        {/* Connecting Data Rays & Traveling Pulse Photons */}
        {nodes.map((_, idx) => {
          const nodeAngle = ((idx * (360 / count) - 90) * Math.PI) / 180;
          const nx = cx + radius * Math.cos(nodeAngle);
          const ny = cy + radius * Math.sin(nodeAngle);

          // Traveling photon packet from node to center
          const pulseProgress = ((frame * 0.025 + idx * (1 / count)) % 1);
          // Travel from node towards center
          const packetX = nx + (cx - nx) * pulseProgress;
          const packetY = ny + (cy - ny) * pulseProgress;

          return (
            <g key={idx}>
              {/* Radiating connection beam */}
              <line
                x1={cx}
                y1={cy}
                x2={nx}
                y2={ny}
                stroke="rgba(56, 189, 248, 0.3)"
                strokeWidth="2"
                strokeDasharray="4 6"
              />
              {/* Electric Pulse Photon */}
              <circle
                cx={packetX}
                cy={packetY}
                r="5"
                fill="#38bdf8"
                filter="url(#glowFilter)"
              />
              <circle
                cx={packetX}
                cy={packetY}
                r="8"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="1.5"
                opacity={0.6}
              />
            </g>
          );
        })}
      </svg>

      {/* Center Hub */}
      {center && (
        <div
          style={{
            position: "absolute",
            left: cx,
            top: cy,
            transform: `translate(-50%, -50%) scale(${centerPulse})`,
            width: 140,
            height: 140,
            borderRadius: "50%",
            backgroundColor: "#ffffff",
            border: "3.5px solid #000000",
            boxShadow: "5px 5px 0px #000000",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            zIndex: 20,
          }}
        >
          <TechLogo name={center} size={52} />
          <span
            style={{
              fontFamily: theme.typography.mono,
              fontSize: 14,
              fontWeight: 900,
              color: "#000000",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            {centerBrand ? centerBrand.label : center}
          </span>
        </div>
      )}

      {/* Orbiting nodes (Pills) with Official Logos and Neo-Brutalism Borders */}
      {nodes.map((nodeText, idx) => {
        const nodeAngle = ((idx * (360 / count) - 90) * Math.PI) / 180;
        const nx = cx + radius * Math.cos(nodeAngle);
        const ny = cy + radius * Math.sin(nodeAngle);

        const nodeSpring = entranceSpring(frame, fps, delayFrames + idx * 4);
        const nodeOpacity = interpolate(nodeSpring, [0, 1], [0, 1]);
        const nodeScale = interpolate(nodeSpring, [0, 1], [0.8, 1]);

        // Subtle floating sway
        const nodeFloat = Math.sin((frame + idx * 8) / 12) * 5;

        const fontFamily = resolveFontFamily(nodeText, theme.typography.ui);
        const brandMeta = getBrandMeta(nodeText);

        return (
          <div
            key={idx}
            style={{
              position: "absolute",
              left: nx,
              top: ny,
              transform: `translate(-50%, calc(-50% + ${nodeFloat}px)) scale(${nodeScale})`,
              opacity: nodeOpacity,
              backgroundColor: "#ffffff",
              color: "#000000",
              borderRadius: 20,
              padding: "14px 24px",
              boxShadow: "4px 4px 0px #000000",
              border: "2.5px solid #000000",
              fontFamily,
              fontSize: 24,
              fontWeight: 800,
              whiteSpace: "nowrap",
              zIndex: 10,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            {brandMeta && <TechLogo name={nodeText} size={28} />}
            <span>{nodeText}</span>
          </div>
        );
      })}
    </div>
  );
};
