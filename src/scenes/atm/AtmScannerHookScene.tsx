import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneLayout } from "../../components/SceneLayout";

export interface AtmScannerHookSceneProps {
  id?: string;
  leadIn?: string;
  headline?: string;
  brollVideo?: string;
  durationInFrames: number;
}

export const AtmScannerHookScene: React.FC<AtmScannerHookSceneProps> = ({
  id,
  leadIn = "⚡ 0.2 SECOND FRAUD TRIAGE",
  headline = "ATM FAKE NOTE KAISE *PEHCHAAN LETI HAI?*",
  brollVideo = "broll/atm_cash_reject.mp4",
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  // 0.2s countdown: starts at 0.200s and drops to 0.038s
  const elapsedSec = Math.max(0.012, 0.200 - (frame / (fps * 1.5)) * 0.188).toFixed(3);

  // Red laser scanner vertical cycle
  const scanProgress = (frame * 3.5) % 100;

  // Rejection alert triggers around frame 40
  const isRejected = frame > 35;
  const alertFlash = isRejected && Math.floor(frame / 6) % 2 === 0;

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
          gap: 16,
          alignItems: "center",
          marginTop: 6,
          transform: `scale(${entrance})`,
        }}
      >
        {/* Rapid Triage HUD Header */}
        <div
          style={{
            width: "100%",
            backgroundColor: "rgba(15, 23, 42, 0.95)",
            border: "2px solid #ef4444",
            borderRadius: 18,
            padding: "14px 22px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 10px 30px rgba(239, 68, 68, 0.4)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ fontSize: 32 }}>🏧</span>
            <div>
              <div
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontWeight: 900,
                  fontSize: 18,
                  color: "#ffffff",
                }}
              >
                AUTOMATED CASH DISPENSER CORE
              </div>
              <div
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: 12,
                  color: "#f87171",
                }}
              >
                High-Speed Roller Velocity: 1,450 RPM • Multi-Spectral Optical Intake
              </div>
            </div>
          </div>
          <div
            style={{
              padding: "6px 14px",
              backgroundColor: "rgba(239, 68, 68, 0.25)",
              border: "1.5px solid #ef4444",
              borderRadius: 8,
              fontFamily: "JetBrains Mono, monospace",
              fontWeight: 900,
              fontSize: 14,
              color: "#fca5a5",
            }}
          >
            {elapsedSec}s
          </div>
        </div>

        {/* Note Intake & Laser Scan Chamber */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: 230,
            backgroundColor: "rgba(255, 255, 255, 0.98)",
            border: isRejected ? "3px solid #ef4444" : "3px solid #38bdf8",
            borderRadius: 18,
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 12px 36px rgba(0,0,0,0.7)",
          }}
        >
          {/* Moving Laser Sweep Line */}
          <div
            style={{
              position: "absolute",
              top: `${scanProgress}%`,
              left: 0,
              right: 0,
              height: 4,
              backgroundColor: "#ef4444",
              boxShadow: "0 0 18px #ef4444, 0 0 35px #ef4444",
              zIndex: 10,
            }}
          />

          {/* Central Banknote Graphic */}
          <div
            style={{
              width: "82%",
              height: "72%",
              backgroundColor: "#f8fafc",
              border: isRejected ? "2px dashed #ef4444" : "2px solid #0284c7",
              borderRadius: 12,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "14px 20px",
              position: "relative",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 13, fontWeight: 800, color: "#334155" }}>
                SPEC: INR_500 [MAHATMA GANDHI SERIES]
              </span>
              <span
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: 12,
                  fontWeight: 900,
                  color: isRejected ? "#dc2626" : "#0284c7",
                }}
              >
                {isRejected ? "ANOMALY DETECTED" : "SCANNING SPECTRUM..."}
              </span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 11, color: "#64748b", fontFamily: "JetBrains Mono, monospace", fontWeight: 700 }}>
                  UV FLUOR
                </div>
                <div style={{ fontSize: 15, fontWeight: 900, color: isRejected ? "#dc2626" : "#16a34a" }}>
                  {isRejected ? "FAIL (0%)" : "OK"}
                </div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 11, color: "#64748b", fontFamily: "JetBrains Mono, monospace", fontWeight: 700 }}>
                  MAG THREAD
                </div>
                <div style={{ fontSize: 15, fontWeight: 900, color: isRejected ? "#dc2626" : "#16a34a" }}>
                  {isRejected ? "NULL (0.0μT)" : "OK"}
                </div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 11, color: "#64748b", fontFamily: "JetBrains Mono, monospace", fontWeight: 700 }}>
                  CALIPER
                </div>
                <div style={{ fontSize: 15, fontWeight: 900, color: isRejected ? "#dc2626" : "#16a34a" }}>
                  {isRejected ? "0.19mm [WOOD]" : "0.11mm"}
                </div>
              </div>
            </div>

            {/* Live Rejection Stamp */}
            {isRejected && (
              <div
                style={{
                  position: "absolute",
                  top: "24%",
                  left: "14%",
                  right: "14%",
                  backgroundColor: alertFlash ? "rgba(220, 38, 38, 0.98)" : "rgba(185, 28, 28, 0.98)",
                  color: "#ffffff",
                  padding: "10px 16px",
                  border: "3px solid #ffffff",
                  borderRadius: 10,
                  fontFamily: "Space Grotesk, sans-serif",
                  fontWeight: 900,
                  fontSize: 20,
                  letterSpacing: 1.5,
                  textAlign: "center",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.6)",
                  zIndex: 20,
                }}
              >
                ⚠️ FAKE NOTE REJECTED!
              </div>
            )}
          </div>
        </div>

        {/* Bottom Metrics Pill */}
        <div
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.92)",
            border: "1.5px solid rgba(255, 255, 255, 0.2)",
            borderRadius: 12,
            padding: "8px 22px",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <span style={{ fontSize: 16 }}>⚡</span>
          <span
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 13,
              color: "#e2e8f0",
            }}
          >
            Human eye: 3 to 5 seconds • ATM core: <strong style={{ color: "#ef4444" }}>0.2 seconds flat</strong>
          </span>
        </div>
      </div>
    </SceneLayout>
  );
};
