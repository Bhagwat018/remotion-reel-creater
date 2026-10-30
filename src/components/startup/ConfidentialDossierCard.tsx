import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { TechLogo } from "../TechLogo";

export interface ConfidentialDossierCardProps {
  delayFrames?: number;
}

export const ConfidentialDossierCard: React.FC<ConfidentialDossierCardProps> = ({
  delayFrames = 2,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - delayFrames,
    fps,
    config: { damping: 13, stiffness: 140 },
  });

  const dossierEntrance = spring({
    frame: frame - (delayFrames + 4),
    fps,
    config: { damping: 12, stiffness: 150 },
  });

  const stampEntrance = spring({
    frame: frame - (delayFrames + 10),
    fps,
    config: { damping: 8, stiffness: 200 }, // Punchy stamp slam
  });

  const timelineEntrance = spring({
    frame: frame - (delayFrames + 16),
    fps,
    config: { damping: 13, stiffness: 140 },
  });

  // Stamp rotation & slam effect
  const stampScale = interpolate(stampEntrance, [0, 1], [2.2, 1]);
  const stampAngle = interpolate(stampEntrance, [0, 1], [-18, -6]);

  // Pulse effect for 2027 badge
  const pulse = Math.sin(frame / 5) * 0.04 + 1;

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 880,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
        transform: `scale(${entrance})`,
        opacity: entrance,
      }}
    >
      {/* 1. CLASSIFIED DOSSIER FOLDER */}
      <div
        style={{
          width: "100%",
          backgroundColor: "#fffbeb",
          border: "3.5px solid #000000",
          borderRadius: 22,
          padding: "20px 24px",
          boxShadow: "6px 6px 0px #000000",
          display: "flex",
          flexDirection: "column",
          gap: 14,
          transform: `scale(${dossierEntrance})`,
          opacity: dossierEntrance,
          position: "relative",
          overflow: "hidden",
          boxSizing: "border-box",
        }}
      >
        {/* Top classified folder tab indicator */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 28,
            backgroundColor: "#fbbf24",
            borderLeft: "2.5px solid #000000",
            borderRight: "2.5px solid #000000",
            borderBottom: "2.5px solid #000000",
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            padding: "4px 14px",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            fontWeight: 900,
            color: "#000000",
            letterSpacing: "0.08em",
          }}
        >
          SEBI DOSSIER #RP-2024-DRHP
        </div>

        {/* Header row with Razorpay Brand */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 12,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                backgroundColor: "#0284c7",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2.5px solid #000000",
                boxShadow: "3px 3px 0px #000000",
              }}
            >
              <TechLogo name="razorpay" size={32} />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 28,
                  fontWeight: 900,
                  color: "#0f172a",
                  letterSpacing: "-0.01em",
                }}
              >
                RAZORPAY
              </span>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 15,
                  fontWeight: 700,
                  color: "#64748b",
                }}
              >
                Fintech Giant | Payments & Banking
              </span>
            </div>
          </div>

          <div
            style={{
              backgroundColor: "#fee2e2",
              border: "2px solid #ef4444",
              borderRadius: 10,
              padding: "6px 12px",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 14,
              fontWeight: 800,
              color: "#dc2626",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <span>🔒</span>
            <span>PRE-FILED</span>
          </div>
        </div>

        {/* Confidential Stamp Graphic Slammed on the Document */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#ffffff",
            border: "2.5px dashed #cbd5e1",
            borderRadius: 16,
            padding: "14px 18px",
            position: "relative",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 13,
                fontWeight: 700,
                color: "#64748b",
                textTransform: "uppercase",
              }}
            >
              Filing Type & Status
            </span>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 20,
                fontWeight: 800,
                color: "#1e293b",
              }}
            >
              Confidential DRHP Route
            </span>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 13,
                fontWeight: 600,
                color: "#dc2626",
              }}
            >
              Public comments & financial scrutiny hidden
            </span>
          </div>

          {/* SLAMMED RED RUBBER STAMP */}
          <div
            style={{
              transform: `scale(${stampScale}) rotate(${stampAngle}deg)`,
              opacity: stampEntrance,
              border: "3.5px solid #dc2626",
              borderRadius: 8,
              padding: "6px 14px",
              backgroundColor: "rgba(254, 226, 226, 0.85)",
              color: "#dc2626",
              fontFamily: "'Inter', sans-serif",
              fontSize: 18,
              fontWeight: 900,
              letterSpacing: "0.12em",
              textAlign: "center",
              boxShadow: "0 2px 8px rgba(220, 38, 38, 0.25)",
            }}
          >
            CONFIDENTIAL
          </div>
        </div>

        {/* Date status strip */}
        <div
          style={{
            backgroundColor: "#fef2f2",
            border: "2px solid #000000",
            borderRadius: 12,
            padding: "10px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 20 }}>❓</span>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 17,
                fontWeight: 800,
                color: "#991b1b",
              }}
            >
              LAUNCH DATE: NO OFFICIAL ETA
            </span>
          </div>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 13,
              fontWeight: 800,
              backgroundColor: "#ef4444",
              color: "#ffffff",
              padding: "4px 8px",
              borderRadius: 6,
            }}
          >
            UNKNOWN
          </span>
        </div>
      </div>

      {/* 2. THE BIG 2027 TIMELINE SHIFT CARD */}
      <div
        style={{
          width: "100%",
          backgroundColor: "#1e1b4b",
          border: "3.5px solid #000000",
          borderRadius: 22,
          padding: "18px 22px",
          boxShadow: "6px 6px 0px #000000",
          display: "flex",
          flexDirection: "column",
          gap: 12,
          transform: `scale(${timelineEntrance})`,
          opacity: timelineEntrance,
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 14,
              fontWeight: 800,
              color: "#a5b4fc",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            INDUSTRY TIMELINE SHIFT
          </span>
          <span
            style={{
              backgroundColor: "#4338ca",
              color: "#e0e7ff",
              border: "1.5px solid #6366f1",
              borderRadius: 6,
              padding: "2px 8px",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            ZEPTO + PHONEPE + RAZORPAY
          </span>
        </div>

        {/* 4-Step Timeline sequence */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1.3fr",
            gap: 10,
            alignItems: "center",
          }}
        >
          {/* Step 1: 2024 */}
          <div
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.08)",
              border: "1.5px solid rgba(255, 255, 255, 0.15)",
              borderRadius: 14,
              padding: "10px 12px",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 13,
                fontWeight: 700,
                color: "#94a3b8",
              }}
            >
              2024
            </span>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 15,
                fontWeight: 800,
                color: "#f8fafc",
              }}
            >
              Filing / Buzz
            </span>
          </div>

          {/* Step 2: 2025 */}
          <div
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.08)",
              border: "1.5px solid rgba(255, 255, 255, 0.15)",
              borderRadius: 14,
              padding: "10px 12px",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 13,
                fontWeight: 700,
                color: "#f87171",
              }}
            >
              2025–26
            </span>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 15,
                fontWeight: 800,
                color: "#fca5a5",
              }}
            >
              Paused / Wait
            </span>
          </div>

          {/* Step 3: TARGET 2027 (Highlighted Hero) */}
          <div
            style={{
              backgroundColor: "#fbbf24",
              border: "2.5px solid #000000",
              borderRadius: 14,
              padding: "10px 14px",
              display: "flex",
              flexDirection: "column",
              gap: 2,
              boxShadow: "3px 3px 0px #000000",
              transform: `scale(${pulse})`,
            }}
          >
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                fontWeight: 900,
                color: "#78350f",
                textTransform: "uppercase",
              }}
            >
              NEW TARGET 🔥
            </span>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 22,
                fontWeight: 900,
                color: "#000000",
                lineHeight: 1.1,
              }}
            >
              2027 IPO
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
