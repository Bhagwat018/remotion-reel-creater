import React from "react";
import {
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export interface EvidenceInspectorCardProps {
  image: string;
  highlightLabel?: string;
  highlightBox?: {
    top?: string | number;
    left?: string | number;
    width?: string | number;
    height?: string | number;
  };
  badgeText?: string;
  source?: string;
  caption?: string;
  zoomTarget?: { x?: string; y?: string; scale?: number };
  durationInFrames: number;
}

export const EvidenceInspectorCard: React.FC<EvidenceInspectorCardProps> = ({
  image,
  highlightLabel = "SILENT HANDLING & SURGE FEE",
  highlightBox,
  badgeText = "OFFICIAL INVOICE PROOF 🧾",
  source = "BLINKIT / ZEPTO ITEMIZED BILL",
  caption,
  zoomTarget = { x: "50%", y: "50%", scale: 1.15 },
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cleanPath = image.replace(/^\/?public\//, "").replace(/^\//, "");
  const imageSrc = staticFile(cleanPath);

  // Entrance spring
  const entrance = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  // Zoom-punch trigger at frame 14
  const zoomSpring = spring({
    frame: Math.max(0, frame - 14),
    fps,
    config: { damping: 15, stiffness: 180 },
  });

  const currentScale = interpolate(
    zoomSpring,
    [0, 1],
    [1.0, zoomTarget.scale || 1.15]
  );

  // Red box drawing animation trigger at frame 16
  const drawSpring = spring({
    frame: Math.max(0, frame - 16),
    fps,
    config: { damping: 12, stiffness: 140 },
  });

  // Callout badge bounce at frame 20
  const calloutSpring = spring({
    frame: Math.max(0, frame - 20),
    fps,
    config: { damping: 10, stiffness: 160 },
  });

  // Pulse intensity for red neon glow
  const pulse = Math.sin((frame / fps) * 8) * 0.15 + 0.85;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        transform: `scale(${entrance})`,
        opacity: Math.min(1, entrance * 1.2),
        width: "100%",
        maxWidth: 720,
      }}
    >
      {/* Neo-Brutalist Inspector Window Container */}
      <div
        style={{
          width: "100%",
          backgroundColor: "#090d16",
          borderRadius: 24,
          border: "4.5px solid #000000",
          boxShadow: "12px 12px 0px #000000",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Document Header Bar */}
        <div
          style={{
            backgroundColor: "#0f172a",
            padding: "12px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "3.5px solid #000000",
          }}
        >
          {/* macOS window control dots */}
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <div
              style={{
                width: 13,
                height: 13,
                borderRadius: "50%",
                backgroundColor: "#ef4444",
                border: "1.5px solid #000000",
              }}
            />
            <div
              style={{
                width: 13,
                height: 13,
                borderRadius: "50%",
                backgroundColor: "#facc15",
                border: "1.5px solid #000000",
              }}
            />
            <div
              style={{
                width: 13,
                height: 13,
                borderRadius: "50%",
                backgroundColor: "#22c55e",
                border: "1.5px solid #000000",
              }}
            />
            <span
              style={{
                marginLeft: 12,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                fontWeight: 800,
                color: "#e2e8f0",
                letterSpacing: "0.04em",
              }}
            >
              {source}
            </span>
          </div>

          {/* Badge Tag */}
          <div
            style={{
              backgroundColor: "#facc15",
              color: "#000000",
              fontFamily: "'Outfit', sans-serif",
              fontSize: 12,
              fontWeight: 900,
              padding: "4px 10px",
              borderRadius: 6,
              border: "2px solid #000000",
              boxShadow: "2px 2px 0px #000000",
            }}
          >
            {badgeText}
          </div>
        </div>

        {/* Image Frame with Dynamic Zoom */}
        <div
          style={{
            width: "100%",
            height: 560,
            position: "relative",
            overflow: "hidden",
            backgroundColor: "#030712",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 16,
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              position: "relative",
              transform: `scale(${currentScale})`,
              transformOrigin: `${zoomTarget.x || "50%"} ${zoomTarget.y || "50%"}`,
              willChange: "transform",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* The Document Screenshot Image */}
            <Img
              src={imageSrc}
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
                display: "block",
                borderRadius: 14,
              }}
            />

            {/* Optional Neon Red Glowing Box */}
            {highlightBox && (
              <div
                style={{
                  position: "absolute",
                  top: highlightBox.top,
                  left: highlightBox.left,
                  width: highlightBox.width,
                  height: highlightBox.height,
                  borderRadius: 14,
                  border: "4px solid #ef4444",
                  backgroundColor: "rgba(239, 68, 68, 0.14)",
                  boxShadow: `0 0 ${20 * pulse}px rgba(239, 68, 68, 0.9), inset 0 0 16px rgba(239, 68, 68, 0.3)`,
                  pointerEvents: "none",
                  zIndex: 20,
                  transform: `scale(${drawSpring})`,
                  opacity: drawSpring,
                }}
              />
            )}
          </div>

          {/* Floating High-CTR Neon Callout Badge */}
          {highlightLabel && (
            <div
              style={{
                position: "absolute",
                bottom: 24,
                left: "50%",
                transform: `translateX(-50%) scale(${calloutSpring})`,
                backgroundColor: "#dc2626",
                color: "#ffffff",
                border: "3.5px solid #000000",
                borderRadius: 14,
                padding: "8px 22px",
                fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif",
                fontWeight: 900,
                fontSize: 18,
                letterSpacing: "0.02em",
                boxShadow: "5px 5px 0px #000000",
                zIndex: 35,
                display: "flex",
                alignItems: "center",
                gap: 8,
                whiteSpace: "nowrap",
              }}
            >
              <span>🚨</span>
              <span>{highlightLabel}</span>
            </div>
          )}
        </div>

        {/* Bottom Verdict Strip */}
        <div
          style={{
            backgroundColor: "#fef08a",
            padding: "10px 18px",
            borderTop: "3px solid #000000",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            fontWeight: 800,
            color: "#0f172a",
          }}
        >
          <span>VERIFIED UNIT AUDIT</span>
          <span style={{ color: "#dc2626" }}>
            {caption || "ITEMIZED COST AUDIT"}
          </span>
        </div>
      </div>
    </div>
  );
};
