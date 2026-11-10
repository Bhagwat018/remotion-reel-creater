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

export interface HeadlineClippingCardProps {
  image: string;
  source?: string;
  headlineQuote?: string;
  badgeText?: string;
  caption?: string;
  highlightYPercent?: number; // Y position of the highlighter sweep line (default ~64%)
  durationInFrames: number;
}

export const HeadlineClippingCard: React.FC<HeadlineClippingCardProps> = ({
  image,
  source = "THE ECONOMIC TIMES • FINANCIAL DAILY",
  headlineQuote = "₹70 LOSS PER ORDER IN QUICK COMMERCE RACE",
  badgeText = "INVESTIGATION REPORT 📰",
  caption = "OFFICIAL FINANCIAL DATA ANALYSIS",
  highlightYPercent = 64,
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cleanPath = image.replace(/^\/?public\//, "").replace(/^\//, "");
  const imageSrc = staticFile(cleanPath);

  // Entrance spring with subtle newspaper tilt
  const entrance = spring({
    frame,
    fps,
    config: { damping: 13, stiffness: 120 },
  });

  // Animated yellow marker sweep from frame 12 to 38
  const sweepProgress = interpolate(
    frame,
    [12, Math.min(38, durationInFrames - 10)],
    [0, 100],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    }
  );

  // Badge pop spring
  const badgeSpring = spring({
    frame: Math.max(0, frame - 18),
    fps,
    config: { damping: 11, stiffness: 150 },
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        transform: `scale(${entrance}) rotate(-0.5deg)`,
        opacity: Math.min(1, entrance * 1.2),
        width: "100%",
        maxWidth: 780,
      }}
    >
      {/* Newspaper Card Frame */}
      <div
        style={{
          width: "100%",
          backgroundColor: "#fdfbf7", // warm newspaper ivory
          borderRadius: 22,
          border: "4px solid #000000",
          boxShadow: "12px 12px 0px #000000",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Newspaper Masthead */}
        <div
          style={{
            backgroundColor: "#1e293b",
            padding: "12px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "3px solid #000000",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: "#ef4444",
                boxShadow: "0 0 8px #ef4444",
              }}
            />
            <span
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: 14,
                fontWeight: 900,
                color: "#ffffff",
                letterSpacing: "0.08em",
              }}
            >
              {source}
            </span>
          </div>

          <div
            style={{
              backgroundColor: "#ef4444",
              color: "#ffffff",
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

        {/* Headline Article Image Container */}
        <div
          style={{
            width: "100%",
            height: 520,
            position: "relative",
            overflow: "hidden",
            backgroundColor: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Img
            src={imageSrc}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              display: "block",
            }}
          />

          {/* Animated Yellow Highlighter Sweep Overlay */}
          <div
            style={{
              position: "absolute",
              top: `${highlightYPercent}%`,
              left: "4%",
              width: `${sweepProgress * 0.92}%`,
              height: 38,
              backgroundColor: "rgba(250, 204, 21, 0.45)",
              borderBottom: "3px solid rgba(234, 179, 8, 0.8)",
              mixBlendMode: "multiply",
              pointerEvents: "none",
              borderRadius: 4,
              transition: "none",
              willChange: "width",
            }}
          />

          {/* Floating High-Impact Marker Stamp */}
          <div
            style={{
              position: "absolute",
              bottom: 16,
              right: 18,
              transform: `scale(${badgeSpring}) rotate(2deg)`,
              backgroundColor: "#facc15",
              color: "#000000",
              border: "3px solid #000000",
              borderRadius: 12,
              padding: "8px 16px",
              boxShadow: "5px 5px 0px #000000",
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 900,
              fontSize: 16,
              display: "flex",
              alignItems: "center",
              gap: 8,
              zIndex: 30,
            }}
          >
            <span>⚡</span>
            <span>VC CASH BURN PROVED</span>
          </div>
        </div>

        {/* Bottom Editorial Strip */}
        <div
          style={{
            backgroundColor: "#f1f5f9",
            padding: "12px 20px",
            borderTop: "3px solid #000000",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 13,
            fontWeight: 800,
            color: "#0f172a",
          }}
        >
          <span>QUICK COMMERCE UNIT ECONOMICS</span>
          <span style={{ color: "#2563eb" }}>{caption}</span>
        </div>
      </div>
    </div>
  );
};

