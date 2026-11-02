import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { TechLogo } from "../../components/TechLogo";

export interface RazorpayDossierSceneProps {
  durationInFrames: number;
}

export const RazorpayDossierScene: React.FC<RazorpayDossierSceneProps> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const tagEntrance = spring({
    frame: frame - 1,
    fps,
    config: { damping: 13, stiffness: 140 },
  });

  const headlineEntrance = spring({
    frame: frame - 4,
    fps,
    config: { damping: 12, stiffness: 150 },
  });

  const dossierEntrance = spring({
    frame: frame - 8,
    fps,
    config: { damping: 12, stiffness: 140 },
  });

  const stampEntrance = spring({
    frame: frame - 12,
    fps,
    config: { damping: 8, stiffness: 200 }, // Stamp punch
  });

  const timelineEntrance = spring({
    frame: frame - 18,
    fps,
    config: { damping: 12, stiffness: 140 },
  });

  const stampScale = interpolate(stampEntrance, [0, 1], [2.2, 1]);
  const stampAngle = interpolate(stampEntrance, [0, 1], [-18, -6]);
  const pulse = Math.sin(frame / 6) * 0.04 + 1;

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: 1080,
        height: 1920,
        paddingTop: 200,
        paddingBottom: 380,
        paddingLeft: 60,
        paddingRight: 60,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 18,
        zIndex: 10,
      }}
    >
      {/* 1. THEMATIC HEADER */}
      <div
        style={{
          transform: `scale(${tagEntrance})`,
          opacity: tagEntrance,
          display: "flex",
          alignItems: "center",
          gap: 10,
          backgroundColor: "#e0f2fe",
          border: "2.5px solid #0284c7",
          borderRadius: 999,
          padding: "8px 24px",
          boxShadow: "3px 3px 0px #0284c7",
        }}
      >
        <span style={{ fontSize: 18 }}>💳</span>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 16,
            fontWeight: 900,
            color: "#0369a1",
            letterSpacing: "0.06em",
          }}
        >
          CASE STUDY // FINTECH & BANKING
        </span>
      </div>

      {/* 2. DEDICATED HEADLINE */}
      <div
        style={{
          transform: `scale(${headlineEntrance})`,
          opacity: headlineEntrance,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: 4,
        }}
      >
        <span
          style={{
            fontFamily: "'Anton', sans-serif",
            fontSize: 66,
            fontWeight: 900,
            color: "#0f172a",
            letterSpacing: "0.02em",
            textTransform: "uppercase",
            lineHeight: 1.05,
          }}
        >
          RAZORPAY:{" "}
          <span
            style={{
              backgroundColor: "#0284c7",
              color: "#ffffff",
              padding: "2px 14px",
              borderRadius: 8,
              border: "3px solid #000000",
              boxShadow: "4px 4px 0px #000000",
            }}
          >
            THE SECRET DRHP
          </span>
        </span>
      </div>

      {/* 3. THE MANILA FOLDER CLASSIFIED DOSSIER */}
      <div
        style={{
          width: "100%",
          maxWidth: 920,
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
          boxSizing: "border-box",
        }}
      >
        {/* Top Folder Tab */}
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

        {/* Razorpay Brand Row */}
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
                  fontSize: 26,
                  fontWeight: 900,
                  color: "#0f172a",
                }}
              >
                RAZORPAY INDIA
              </span>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#64748b",
                }}
              >
                Confidential Pre-Filing Route
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
              fontSize: 13,
              fontWeight: 800,
              color: "#dc2626",
            }}
          >
            🔒 PRE-FILED
          </div>
        </div>

        {/* Secret Stamp Badge Row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#ffffff",
            border: "2.5px dashed #cbd5e1",
            borderRadius: 16,
            padding: "14px 18px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                fontWeight: 700,
                color: "#64748b",
              }}
            >
              FINANCIALS & PUBLIC SCRUTINY
            </span>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 19,
                fontWeight: 800,
                color: "#1e293b",
              }}
            >
              Kept Strictly Confidential
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
              backgroundColor: "rgba(254, 226, 226, 0.9)",
              color: "#dc2626",
              fontFamily: "'Inter', sans-serif",
              fontSize: 17,
              fontWeight: 900,
              letterSpacing: "0.12em",
            }}
          >
            CONFIDENTIAL
          </div>
        </div>

        {/* Unknown Launch Date Strip */}
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
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 17,
              fontWeight: 800,
              color: "#991b1b",
            }}
          >
            ❓ LAUNCH DATE: NO OFFICIAL ETA
          </span>
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

      {/* 4. THE 2027 REALIGNMENT ROADMAP CARD */}
      <div
        style={{
          width: "100%",
          maxWidth: 920,
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
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 14,
              fontWeight: 800,
              color: "#a5b4fc",
              letterSpacing: "0.06em",
            }}
          >
            ALL 3 UNICORNS SYNCED
          </span>
          <span
            style={{
              backgroundColor: "#4338ca",
              color: "#e0e7ff",
              borderRadius: 6,
              padding: "2px 8px",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            ZEPTO • PHONEPE • RAZORPAY
          </span>
        </div>

        {/* 3 Step Timeline */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1.3fr", gap: 10 }}>
          <div
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.08)",
              borderRadius: 14,
              padding: "10px 12px",
              border: "1.5px solid rgba(255, 255, 255, 0.15)",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
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
              DRHP Filing
            </span>
          </div>

          <div
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.08)",
              borderRadius: 14,
              padding: "10px 12px",
              border: "1.5px solid rgba(255, 255, 255, 0.15)",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
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
              Market Pause
            </span>
          </div>

          <div
            style={{
              backgroundColor: "#fbbf24",
              borderRadius: 14,
              padding: "10px 14px",
              border: "2.5px solid #000000",
              boxShadow: "3px 3px 0px #000000",
              display: "flex",
              flexDirection: "column",
              gap: 2,
              transform: `scale(${pulse})`,
            }}
          >
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                fontWeight: 900,
                color: "#78350f",
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

