import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneLayout } from "../../components/SceneLayout";

export interface GoogleLawsuitSceneProps {
  id?: string;
  leadIn?: string;
  headline?: string;
  brollVideo?: string;
  durationInFrames: number;
}

export const GoogleLawsuitScene: React.FC<GoogleLawsuitSceneProps> = ({
  id,
  leadIn = "⚖️ LEGAL SHOCKWAVE",
  headline = "THE $5,000,000,000 LAWSUIT",
  brollVideo = "broll/courtroom_lawsuit_gavel.mp4",
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.9 },
  });

  // Ticker counting up to $5 Billion
  const progress = interpolate(frame, [0, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const dollarCount = (5.0 * progress).toFixed(1);

  // Gavel slam stamp pulse
  const stampScale = interpolate(frame, [15, 24, 28], [2.2, 0.95, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const stampOpacity = interpolate(frame, [15, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <SceneLayout
      id={id}
      leadIn={leadIn}
      headline={headline}
      brollVideo={brollVideo}
      durationInFrames={durationInFrames}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 960,
          display: "flex",
          flexDirection: "column",
          gap: 20,
          alignItems: "center",
          marginTop: 6,
          transform: `scale(${entrance})`,
        }}
      >
        {/* Massive $5 Billion Settlement Card */}
        <div
          style={{
            width: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.96)",
            borderRadius: 24,
            border: "4px solid #ef4444",
            padding: "26px 30px",
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.5)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Top Court Jurisdiction Bar */}
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "2px solid #f1f5f9",
              paddingBottom: 12,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 24 }}>🏛️</span>
              <span
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontWeight: 900,
                  fontSize: 16,
                  color: "#0f172a",
                  letterSpacing: "0.04em",
                }}
              >
                U.S. FEDERAL COURT // CLASS-ACTION
              </span>
            </div>
            <span
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontWeight: 800,
                fontSize: 12,
                color: "#dc2626",
                backgroundColor: "#fee2e2",
                padding: "4px 10px",
                borderRadius: 6,
              }}
            >
              CASE: BROWN ET AL. V. GOOGLE
            </span>
          </div>

          {/* Huge Animated Ticker */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              margin: "18px 0 10px 0",
            }}
          >
            <span
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 14,
                fontWeight: 800,
                color: "#64748b",
                letterSpacing: "0.1em",
              }}
            >
              DAMAGES & DATA DESTRUCTION DEMAND
            </span>
            <div
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontWeight: 900,
                fontSize: 68,
                color: "#b91c1c",
                lineHeight: 1.1,
                textShadow: "0 4px 16px rgba(239, 68, 68, 0.3)",
              }}
            >
              ${dollarCount} BILLION
            </div>
          </div>

          {/* Lawsuit Key Findings */}
          <div
            style={{
              width: "100%",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 14,
              marginTop: 10,
            }}
          >
            <div
              style={{
                backgroundColor: "#fef2f2",
                border: "1.5px solid #fca5a5",
                borderRadius: 14,
                padding: "14px 16px",
              }}
            >
              <div
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontWeight: 800,
                  fontSize: 15,
                  color: "#7f1d1d",
                  marginBottom: 4,
                }}
              >
                THE CHARGE
              </div>
              <div style={{ fontFamily: "sans-serif", fontSize: 13, color: "#4b5563", lineHeight: 1.4 }}>
                Google tracked private browsing via Google Analytics & Ad Manager without explicit consent.
              </div>
            </div>

            <div
              style={{
                backgroundColor: "#f0fdf4",
                border: "1.5px solid #86efac",
                borderRadius: 14,
                padding: "14px 16px",
              }}
            >
              <div
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontWeight: 800,
                  fontSize: 15,
                  color: "#14532d",
                  marginBottom: 4,
                }}
              >
                THE COURT ORDER
              </div>
              <div style={{ fontFamily: "sans-serif", fontSize: 13, color: "#4b5563", lineHeight: 1.4 }}>
                Ordered to delete billions of unlawfully collected private browsing records permanently!
              </div>
            </div>
          </div>

          {/* STAMP: SETTLEMENT CONFIRMED */}
          <div
            style={{
              position: "absolute",
              top: 50,
              right: 30,
              transform: `scale(${stampScale}) rotate(-14deg)`,
              opacity: stampOpacity,
              border: "4px solid #dc2626",
              borderRadius: 12,
              padding: "6px 16px",
              backgroundColor: "rgba(254, 242, 242, 0.95)",
              color: "#dc2626",
              fontFamily: "Space Grotesk, sans-serif",
              fontWeight: 900,
              fontSize: 18,
              letterSpacing: "0.08em",
              boxShadow: "0 8px 24px rgba(220, 38, 38, 0.4)",
            }}
          >
            ORDERED TO DELETE
          </div>
        </div>

        {/* Bottom Callout */}
        <div
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.92)",
            border: "1.5px solid rgba(255, 255, 255, 0.2)",
            borderRadius: 14,
            padding: "12px 24px",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <span style={{ fontSize: 20 }}>🕵️</span>
          <span
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontWeight: 700,
              fontSize: 15,
              color: "#f8fafc",
            }}
          >
            Even the makers of Incognito Mode admitted it was never truly private!
          </span>
        </div>
      </div>
    </SceneLayout>
  );
};

