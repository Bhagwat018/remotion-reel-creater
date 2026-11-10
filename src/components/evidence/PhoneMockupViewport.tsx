import React from "react";
import {
  Easing,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export interface PhoneMockupViewportProps {
  image: string;
  badgeText?: string;
  caption?: string;
  source?: string;
  panDistance?: number;
  durationInFrames: number;
}

export const PhoneMockupViewport: React.FC<PhoneMockupViewportProps> = ({
  image,
  badgeText = "🔴 LIVE APP SCREEN",
  caption,
  source = "ZEPTO / BLINKIT LIVE CHECKOUT",
  panDistance = 220,
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Clean image path for Remotion staticFile
  const cleanPath = image.replace(/^\/?public\//, "").replace(/^\//, "");
  const imageSrc = staticFile(cleanPath);

  // Smooth entrance spring
  const entrance = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  // Floating tilt
  const tilt = Math.sin((frame / fps) * 2) * 1.5;

  // Cinematic pan down through the screenshot
  const panOffset = interpolate(
    frame,
    [12, Math.max(13, durationInFrames - 12)],
    [0, -panDistance],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    }
  );

  // Badge pop spring
  const badgeSpring = spring({
    frame: Math.max(0, frame - 8),
    fps,
    config: { damping: 12, stiffness: 140 },
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        transform: `scale(${entrance}) rotate(${tilt}deg)`,
        opacity: Math.min(1, entrance * 1.2),
      }}
    >
      {/* Phone Hardware Mockup Frame */}
      <div
        style={{
          width: 440,
          height: 760,
          backgroundColor: "#090d16",
          borderRadius: 48,
          border: "4.5px solid #000000",
          boxShadow: "10px 10px 0px #000000, 0 25px 50px rgba(0, 0, 0, 0.25)",
          padding: "12px 10px",
          boxSizing: "border-box",
          position: "relative",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Dynamic Island / Notch */}
        <div
          style={{
            position: "absolute",
            top: 18,
            left: "50%",
            transform: "translateX(-50%)",
            width: 110,
            height: 26,
            backgroundColor: "#000000",
            borderRadius: 20,
            zIndex: 30,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 10px",
            boxSizing: "border-box",
          }}
        >
          {/* Camera lens dot */}
          <div
            style={{
              width: 9,
              height: 9,
              borderRadius: "50%",
              backgroundColor: "#1e293b",
              border: "1px solid #334155",
            }}
          />
          {/* Audio sensor dot */}
          <div
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              backgroundColor: "#065f46",
              boxShadow: "0 0 6px #10b981",
            }}
          />
        </div>

        {/* Status Bar */}
        <div
          style={{
            position: "absolute",
            top: 20,
            left: 24,
            right: 24,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            zIndex: 25,
            color: "#ffffff",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            fontWeight: 800,
            pointerEvents: "none",
          }}
        >
          <span>9:41</span>
          <span style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <span>5G</span>
            <span
              style={{
                display: "inline-block",
                width: 18,
                height: 10,
                border: "1.5px solid #ffffff",
                borderRadius: 3,
                position: "relative",
                padding: 1,
              }}
            >
              <span
                style={{
                  display: "block",
                  width: "80%",
                  height: "100%",
                  backgroundColor: "#22c55e",
                  borderRadius: 1,
                }}
              />
            </span>
          </span>
        </div>

        {/* Screen Viewport with Pan Effect */}
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 38,
            overflow: "hidden",
            position: "relative",
            backgroundColor: "#030712",
          }}
        >
          <div
            style={{
              width: "100%",
              transform: `translateY(${panOffset}px)`,
              willChange: "transform",
            }}
          >
            <Img
              src={imageSrc}
              style={{
                width: "100%",
                height: "auto",
                display: "block",
              }}
            />
          </div>

          {/* Screen Glass Reflection Gradient */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 50%, rgba(0,0,0,0.15) 100%)",
              pointerEvents: "none",
              borderRadius: 38,
            }}
          />

          {/* Home swipe indicator */}
          <div
            style={{
              position: "absolute",
              bottom: 8,
              left: "50%",
              transform: "translateX(-50%)",
              width: 120,
              height: 4,
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              borderRadius: 4,
              zIndex: 30,
            }}
          />
        </div>
      </div>

      {/* Floating Verified Top-Right Badge */}
      <div
        style={{
          position: "absolute",
          top: -16,
          right: -16,
          transform: `scale(${badgeSpring})`,
          backgroundColor: "#facc15",
          color: "#000000",
          border: "3.5px solid #000000",
          borderRadius: 14,
          padding: "8px 16px",
          fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif",
          fontWeight: 900,
          fontSize: 16,
          letterSpacing: "0.03em",
          boxShadow: "5px 5px 0px #000000",
          display: "flex",
          alignItems: "center",
          gap: 6,
          zIndex: 40,
        }}
      >
        <span>{badgeText}</span>
      </div>

      {/* Optional Bottom Verification Footnote */}
      <div
        style={{
          marginTop: 14,
          display: "flex",
          alignItems: "center",
          gap: 8,
          backgroundColor: "#ffffff",
          border: "2.5px solid #000000",
          borderRadius: 10,
          padding: "6px 14px",
          boxShadow: "4px 4px 0px #000000",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 12,
          fontWeight: 800,
          color: "#0f172a",
        }}
      >
        <span>🔍 PROOF:</span>
        <span style={{ color: "#2563eb" }}>{caption || source}</span>
      </div>
    </div>
  );
};

