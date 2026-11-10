import React from "react";
import {
  Img,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export interface SplitProofViewerProps {
  image: string;
  secondaryImage?: string;
  leftLabel?: string;
  rightLabel?: string;
  savingsText?: string;
  badgeText?: string;
  source?: string;
  durationInFrames: number;
}

export const SplitProofViewer: React.FC<SplitProofViewerProps> = ({
  image,
  secondaryImage,
  savingsText = "SAVE ₹39,600 / YEAR",
  badgeText = "HEAD-TO-HEAD PROOF ⚖️",
  source = "QUICK COMMERCE VS LOCAL KIRANA",
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cleanPath = image.replace(/^\/?public\//, "").replace(/^\//, "");
  const imageSrc = staticFile(cleanPath);

  const cleanSecPath = secondaryImage
    ? secondaryImage.replace(/^\/?public\//, "").replace(/^\//, "")
    : null;
  const secImageSrc = cleanSecPath ? staticFile(cleanSecPath) : null;

  // Entrance spring
  const entrance = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  // VS Badge pop spring
  const vsSpring = spring({
    frame: Math.max(0, frame - 10),
    fps,
    config: { damping: 10, stiffness: 160 },
  });

  // Savings banner slide up at frame 16
  const bannerSpring = spring({
    frame: Math.max(0, frame - 16),
    fps,
    config: { damping: 12, stiffness: 130 },
  });

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
        maxWidth: 640,
      }}
    >
      {/* Container Frame */}
      <div
        style={{
          width: "100%",
          backgroundColor: "#090d16",
          borderRadius: 28,
          border: "4.5px solid #000000",
          boxShadow: "12px 12px 0px #000000",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        {/* Header Bar */}
        <div
          style={{
            backgroundColor: "#0f172a",
            padding: "14px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "3.5px solid #000000",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: 14,
                fontWeight: 900,
                color: "#ffffff",
                letterSpacing: "0.05em",
              }}
            >
              {source}
            </span>
          </div>

          <div
            style={{
              backgroundColor: "#22c55e",
              color: "#000000",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              fontWeight: 900,
              padding: "4px 10px",
              borderRadius: 6,
              border: "1.5px solid #000000",
              boxShadow: "2px 2px 0px #000000",
            }}
          >
            {badgeText}
          </div>
        </div>

        {/* Comparison Image Area */}
        <div
          style={{
            width: "100%",
            height: 640,
            position: "relative",
            overflow: "hidden",
            backgroundColor: "#030712",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {secImageSrc ? (
            <div
              style={{
                display: "flex",
                width: "100%",
                height: "100%",
              }}
            >
              <div
                style={{
                  flex: 1,
                  borderRight: "2px solid #000000",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <Img
                  src={imageSrc}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div
                style={{
                  flex: 1,
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <Img
                  src={secImageSrc}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            </div>
          ) : (
            <Img
              src={imageSrc}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                display: "block",
              }}
            />
          )}

          {/* Central VS Badge */}
          <div
            style={{
              position: "absolute",
              top: "44%",
              left: "50%",
              transform: `translate(-50%, -50%) scale(${vsSpring})`,
              backgroundColor: "#facc15",
              color: "#000000",
              border: "3.5px solid #000000",
              borderRadius: "50%",
              width: 58,
              height: 58,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 900,
              fontSize: 17,
              boxShadow: "4px 4px 0px #000000",
              zIndex: 30,
            }}
          >
            VS
          </div>
        </div>

        {/* Bottom Annual Savings Banner */}
        <div
          style={{
            backgroundColor: "#10b981",
            color: "#000000",
            padding: "14px 20px",
            borderTop: "3.5px solid #000000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            transform: `scale(${bannerSpring})`,
            transformOrigin: "bottom center",
          }}
        >
          <span style={{ fontSize: 24 }}>💰</span>
          <span
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 22,
              fontWeight: 900,
              letterSpacing: "0.02em",
            }}
          >
            {savingsText}
          </span>
          <span
            style={{
              backgroundColor: "#000000",
              color: "#ffffff",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              fontWeight: 800,
              padding: "4px 8px",
              borderRadius: 6,
            }}
          >
            AUDITED
          </span>
        </div>
      </div>
    </div>
  );
};
