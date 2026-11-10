import React from "react";
import {
  interpolate,
  OffthreadVideo,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export interface VisualBrollSceneProps {
  id?: string;
  leadIn?: string;
  headline: string;
  italicAccent?: string;
  subtitle?: string;
  brollVideo?: string;
  heroImage?: string;
  pillText?: string;
  pillColor?: string;
  glowColor?: string;
  durationInFrames: number;
}

export const VisualBrollScene: React.FC<VisualBrollSceneProps> = ({
  leadIn = "VIRAL BREAKDOWN ⚡",
  headline,
  italicAccent,
  subtitle,
  brollVideo,
  heroImage,
  pillText,
  pillColor = "#a855f7",
  glowColor = "#9333ea",
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring animations
  const titleEntrance = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120, mass: 0.9 },
  });

  const heroEntrance = spring({
    frame: Math.max(0, frame - 5),
    fps,
    config: { damping: 12, stiffness: 100, mass: 1 },
  });

  const pillEntrance = spring({
    frame: Math.max(0, frame - 12),
    fps,
    config: { damping: 15, stiffness: 140 },
  });

  // Smooth cinematic slow zoom for background video
  const brollZoom = interpolate(frame, [0, durationInFrames], [1.0, 1.08], {
    extrapolateRight: "clamp",
  });

  // Ambient 3D floating & bobbing physics for hero cutout
  const floatY = Math.sin(frame / 16) * 16;
  const rotateZ = Math.sin(frame / 22) * 2.8;
  const tiltY = Math.sin(frame / 28) * 8;
  const tiltX = Math.cos(frame / 28) * 4;

  const videoSrc = brollVideo
    ? staticFile(brollVideo.replace(/^\/?public\//, "").replace(/^\//, ""))
    : null;

  const imageSrc = heroImage
    ? staticFile(heroImage.replace(/^\/?public\//, "").replace(/^\//, ""))
    : null;

  return (
    <div
      style={{
        position: "relative",
        width: 1080,
        height: 1920,
        backgroundColor: "#07080d",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "160px 48px 480px 48px",
        boxSizing: "border-box",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Montserrat', 'Inter', sans-serif",
      }}
    >
      {/* 1. CINEMATIC REAL VIDEO B-ROLL BACKGROUND */}
      {videoSrc && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 1080,
            height: 1920,
            transform: `scale(${brollZoom})`,
            transformOrigin: "center center",
            zIndex: 0,
          }}
        >
          <OffthreadVideo
            src={videoSrc}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            muted
          />
        </div>
      )}

      {/* 2. DARK ATMOSPHERIC VIGNETTE & RADIAL GLOW OVERLAY */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1080,
          height: 1920,
          background:
            "linear-gradient(180deg, rgba(6,7,12,0.82) 0%, rgba(6,7,12,0.35) 45%, rgba(6,7,12,0.92) 100%)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${glowColor}33 0%, transparent 70%)`,
          filter: "blur(60px)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* 3. TOP KINETIC TYPOGRAPHY (Ootto Style) */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          maxWidth: 960,
          transform: `translateY(${(1 - titleEntrance) * -40}px)`,
          opacity: titleEntrance,
        }}
      >
        {/* Lead-in Badge */}
        {leadIn && (
          <div
            style={{
              display: "inline-block",
              background: "rgba(255, 255, 255, 0.08)",
              border: "1.5px solid rgba(255, 255, 255, 0.2)",
              backdropFilter: "blur(12px)",
              padding: "10px 24px",
              borderRadius: 40,
              fontSize: 22,
              fontWeight: 800,
              letterSpacing: 2.5,
              textTransform: "uppercase",
              color: "#f8fafc",
              marginBottom: 24,
              boxShadow: "0 8px 30px rgba(0,0,0,0.5)",
            }}
          >
            {leadIn}
          </div>
        )}

        {/* Big Impact Headline */}
        <h1
          style={{
            fontSize: 76,
            fontWeight: 900,
            lineHeight: 1.08,
            letterSpacing: -1.5,
            color: "#ffffff",
            textTransform: "uppercase",
            textShadow: "0 10px 35px rgba(0,0,0,0.9)",
            margin: 0,
          }}
        >
          {headline}
        </h1>

        {/* Italic Serif Contrast Accent (e.g. "doesn't start with cardio") */}
        {italicAccent && (
          <div
            style={{
              fontSize: 48,
              fontFamily: "'Playfair Display', Georgia, serif",
              fontStyle: "italic",
              fontWeight: 600,
              color: "#fbbf24",
              marginTop: 12,
              textShadow: "0 4px 20px rgba(0,0,0,0.8)",
            }}
          >
            {italicAccent}
          </div>
        )}
      </div>

      {/* 4. 3D FLOATING HERO CUTOUT / PRODUCT ASSET */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          perspective: 1200,
          margin: "30px 0",
        }}
      >
        {imageSrc && (
          <div
            style={{
              transform: `scale(${heroEntrance}) translateY(${floatY}px) rotateZ(${rotateZ}deg) rotateY(${tiltY}deg) rotateX(${tiltX}deg)`,
              transformOrigin: "center center",
              filter: `drop-shadow(0 25px 50px rgba(0,0,0,0.9)) drop-shadow(0 0 60px ${glowColor}66)`,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={imageSrc}
              alt="Hero Visual Asset"
              style={{
                maxWidth: 620,
                maxHeight: 620,
                objectFit: "contain",
                borderRadius: 20,
              }}
            />
          </div>
        )}
      </div>

      {/* 5. BOTTOM CALLOUT / CONVERSION PILL (e.g. "LINK IN BIO" / "Comment GROW") */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          transform: `scale(${pillEntrance})`,
          opacity: pillEntrance,
        }}
      >
        {subtitle && (
          <p
            style={{
              fontSize: 28,
              fontWeight: 600,
              color: "#cbd5e1",
              marginBottom: 20,
              textShadow: "0 2px 10px rgba(0,0,0,0.8)",
            }}
          >
            {subtitle}
          </p>
        )}

        {pillText && (
          <div
            style={{
              display: "inline-block",
              background: pillColor,
              color: "#ffffff",
              fontSize: 32,
              fontWeight: 900,
              letterSpacing: 2,
              textTransform: "uppercase",
              padding: "20px 48px",
              borderRadius: 60,
              boxShadow: `0 0 45px ${pillColor}99, 0 10px 25px rgba(0,0,0,0.6)`,
            }}
          >
            {pillText}
          </div>
        )}
      </div>
    </div>
  );
};

