import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export interface DeadlockDiagramSceneProps {
  id?: string;
  leadIn?: string;
  headline?: string;
  durationInFrames: number;
}

export const DeadlockDiagramScene: React.FC<DeadlockDiagramSceneProps> = ({
  leadIn = "CRITICAL BANKING BUG ⚠️",
  headline = "DATABASE DEADLOCK DETECTED",
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const entrance = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  // Pulse animation for warning
  const pulse = Math.sin(frame / 6) * 0.08 + 1;
  const arrowDash = (frame * 12) % 100;

  return (
    <div
      style={{
        position: "relative",
        width: 1080,
        height: 1920,
        backgroundColor: "#070b14",
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
      {/* Background Cyber Grid */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1080,
          height: 1920,
          backgroundImage:
            "linear-gradient(rgba(56, 189, 248, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(56, 189, 248, 0.04) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          zIndex: 0,
        }}
      />

      {/* Atmospheric Radial Red/Blue Glow */}
      <div
        style={{
          position: "absolute",
          top: "45%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(239, 68, 68, 0.18) 0%, transparent 70%)",
          filter: "blur(60px)",
          zIndex: 0,
        }}
      />

      {/* Top Header */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          transform: `scale(${entrance})`,
        }}
      >
        <div
          style={{
            display: "inline-block",
            background: "rgba(239, 68, 68, 0.15)",
            border: "1.5px solid rgba(239, 68, 68, 0.4)",
            color: "#f87171",
            padding: "8px 24px",
            borderRadius: 30,
            fontSize: 22,
            fontWeight: 800,
            letterSpacing: 2,
            textTransform: "uppercase",
            marginBottom: 20,
            boxShadow: "0 0 30px rgba(239, 68, 68, 0.3)",
          }}
        >
          {leadIn}
        </div>
        <h1
          style={{
            fontSize: 68,
            fontWeight: 900,
            color: "#ffffff",
            textTransform: "uppercase",
            lineHeight: 1.1,
            margin: 0,
            textShadow: "0 8px 30px rgba(0,0,0,0.9)",
          }}
        >
          {headline}
        </h1>
      </div>

      {/* Center Architecture Canvas */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: 960,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 32,
        }}
      >
        {/* Top Candidate Statement Card */}
        <div
          style={{
            width: "100%",
            background: "rgba(15, 23, 42, 0.8)",
            border: "1.5px solid rgba(148, 163, 184, 0.2)",
            backdropFilter: "blur(16px)",
            borderRadius: 24,
            padding: "20px 28px",
            display: "flex",
            alignItems: "center",
            gap: 16,
            boxShadow: "0 15px 40px rgba(0,0,0,0.6)",
          }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: "50%",
              background: "#3b82f6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
              fontWeight: 800,
              color: "#fff",
            }}
          >
            👤
          </div>
          <div>
            <div
              style={{
                fontSize: 18,
                fontWeight: 800,
                color: "#60a5fa",
                textTransform: "uppercase",
                letterSpacing: 1.5,
              }}
            >
              CANDIDATE JAWAB
            </div>
            <div
              style={{
                fontSize: 24,
                fontWeight: 600,
                color: "#e2e8f0",
                marginTop: 4,
              }}
            >
              "Sir, dono transactions parallelly execute ho gayi..."
            </div>
          </div>
        </div>

        {/* Dual Conflicting Bank Accounts Grid */}
        <div
          style={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 24,
          }}
        >
          {/* Account 1 */}
          <div
            style={{
              background: "linear-gradient(180deg, #1e1b4b 0%, #0f172a 100%)",
              border: "2px solid #ef4444",
              borderRadius: 24,
              padding: "24px 20px",
              boxShadow: "0 0 30px rgba(239, 68, 68, 0.25)",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: 16,
                fontWeight: 800,
                color: "#94a3b8",
                letterSpacing: 1,
              }}
            >
              BANK ACCOUNT #01
            </div>
            <div
              style={{
                fontSize: 42,
                fontWeight: 900,
                color: "#ffffff",
                marginTop: 6,
              }}
            >
              ₹50,000
            </div>
            <div
              style={{
                marginTop: 16,
                display: "inline-block",
                background: "rgba(239, 68, 68, 0.2)",
                border: "1px solid #ef4444",
                color: "#fca5a5",
                padding: "6px 16px",
                borderRadius: 12,
                fontSize: 18,
                fontWeight: 800,
              }}
            >
              🔒 LOCKED BY TXN-A
            </div>
          </div>

          {/* Account 2 */}
          <div
            style={{
              background: "linear-gradient(180deg, #1e1b4b 0%, #0f172a 100%)",
              border: "2px solid #ef4444",
              borderRadius: 24,
              padding: "24px 20px",
              boxShadow: "0 0 30px rgba(239, 68, 68, 0.25)",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: 16,
                fontWeight: 800,
                color: "#94a3b8",
                letterSpacing: 1,
              }}
            >
              BANK ACCOUNT #02
            </div>
            <div
              style={{
                fontSize: 42,
                fontWeight: 900,
                color: "#ffffff",
                marginTop: 6,
              }}
            >
              ₹80,000
            </div>
            <div
              style={{
                marginTop: 16,
                display: "inline-block",
                background: "rgba(239, 68, 68, 0.2)",
                border: "1px solid #ef4444",
                color: "#fca5a5",
                padding: "6px 16px",
                borderRadius: 12,
                fontSize: 18,
                fontWeight: 800,
              }}
            >
              🔒 LOCKED BY TXN-B
            </div>
          </div>
        </div>

        {/* Big Pulsating Deadlock Warning Stamp */}
        <div
          style={{
            transform: `scale(${pulse})`,
            background: "linear-gradient(90deg, #b91c1c 0%, #dc2626 100%)",
            border: "2px solid #fecaca",
            boxShadow:
              "0 0 50px rgba(239, 68, 68, 0.6), 0 20px 40px rgba(0,0,0,0.8)",
            padding: "18px 48px",
            borderRadius: 20,
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <span style={{ fontSize: 32 }}>⚠️</span>
          <span
            style={{
              fontSize: 32,
              fontWeight: 900,
              color: "#ffffff",
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            DATABASE DEADLOCK (FROZEN)
          </span>
        </div>
      </div>

      <div style={{ height: 20 }} />
    </div>
  );
};

