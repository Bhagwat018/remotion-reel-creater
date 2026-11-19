import React from "react";
import { spring, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneLayout } from "../../components/SceneLayout";

export interface MahanadiHookSceneProps {
  id?: string;
  leadIn?: string;
  headline?: string;
  sub?: string;
  brollVideo?: string;
  durationInFrames: number;
}

export const MahanadiHookScene: React.FC<MahanadiHookSceneProps> = ({
  id,
  leadIn = "⚡ MEGA PSU IPO DISRUPTION • 2026",
  headline = "MAHANADI COALFIELDS IPO! *GHAR KI BIJLI & AC KA ASLI SACH*",
  sub = "Coal India's Biggest Cash Engine Going Public",
  brollVideo = "broll/coal_mine_excavator_dumper.mp4",
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring animations
  const entrance = interpolate(
    spring({ frame, fps, config: { damping: 12, stiffness: 140 } }),
    [0, 1],
    [0.90, 1]
  );

  const cardEntrance = interpolate(
    spring({ frame: Math.max(0, frame - 5), fps, config: { damping: 12, stiffness: 130 } }),
    [0, 1],
    [0.88, 1]
  );

  const pulse = Math.sin(frame * 0.2) * 0.05 + 1;
  const glowPulse = (Math.sin(frame * 0.16) + 1) * 0.5;

  const acBreezeWave = Math.sin(frame * 0.25) * 8;

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
          maxWidth: 980,
          display: "flex",
          flexDirection: "column",
          gap: 16,
          alignItems: "stretch",
          marginTop: 6,
          zIndex: 10,
        }}
      >
        {/* TOP STATUS HUD BADGE */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              padding: "12px 30px",
              backgroundColor: "rgba(6, 182, 212, 0.22)",
              border: "3px solid #06b6d4",
              borderRadius: 999,
              color: "#ffffff",
              fontFamily: "monospace",
              fontSize: 22,
              fontWeight: 900,
              letterSpacing: 2,
              boxShadow: `0 0 ${20 + glowPulse * 15}px rgba(6, 182, 212, 0.6)`,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span style={{ fontSize: 26, color: "#38bdf8" }}>⚡</span>
            <span>₹9,000 CRORE MEGA PSU IPO • OPENING SOON</span>
          </div>
        </div>

        {/* SCREEN-DOMINANT POWER CONDUIT HUD ARCHITECTURE */}
        <div
          style={{
            backgroundColor: "rgba(10, 15, 30, 0.96)",
            border: "3.5px solid #06b6d4",
            borderRadius: 24,
            padding: "26px 28px",
            boxShadow: `0 20px 60px rgba(6, 182, 212, 0.35)`,
            transform: `scale(${cardEntrance})`,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Top animated laser accent line */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 5,
              background: "linear-gradient(90deg, #06b6d4, #f59e0b, #10b981)",
            }}
          />

          {/* GRID LINK HEADER */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
              borderBottom: "1.5px solid rgba(56, 189, 248, 0.25)",
              paddingBottom: 10,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  backgroundColor: "#10b981",
                  boxShadow: "0 0 10px #10b981",
                }}
              />
              <span
                style={{
                  color: "#38bdf8",
                  fontFamily: "monospace",
                  fontSize: 14,
                  fontWeight: 900,
                  letterSpacing: 1.5,
                }}
              >
                LIVE POWER GRID CONDUIT
              </span>
            </div>
            <span
              style={{
                color: "#f59e0b",
                fontFamily: "monospace",
                fontSize: 13,
                fontWeight: 800,
              }}
            >
              [ 24x7 THERMAL SUPPLY ]
            </span>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto 1fr",
              gap: 16,
              alignItems: "center",
            }}
          >
            {/* LEFT NODE: YOUR HOME AC & APPLIANCES */}
            <div
              style={{
                backgroundColor: "rgba(15, 23, 42, 0.85)",
                border: "2.5px solid rgba(56, 189, 248, 0.6)",
                borderRadius: 20,
                padding: "20px 16px",
                textAlign: "center",
                boxShadow: "0 10px 30px rgba(56, 189, 248, 0.2)",
                position: "relative",
              }}
            >
              {/* Animated AC cool wave graphic */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 60,
                  marginBottom: 6,
                }}
              >
                <svg width="68" height="60" viewBox="0 0 68 60" fill="none">
                  {/* AC Unit Body */}
                  <rect x="4" y="8" width="60" height="28" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="2.5" />
                  <line x1="12" y1="28" x2="56" y2="28" stroke="#38bdf8" strokeWidth="2" />
                  {/* Blinking Power LED */}
                  <circle cx="56" cy="16" r="3" fill="#10b981" />
                  {/* Cold air breeze waves */}
                  <path
                    d={`M 14 42 Q 24 ${40 + acBreezeWave} 34 42 T 54 42`}
                    stroke="#38bdf8"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <path
                    d={`M 18 50 Q 28 ${48 - acBreezeWave} 38 50 T 50 50`}
                    stroke="#06b6d4"
                    strokeWidth="2"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </div>

              <div
                style={{
                  color: "#38bdf8",
                  fontFamily: "monospace",
                  fontSize: 14,
                  fontWeight: 900,
                  letterSpacing: 1.5,
                }}
              >
                YOUR HOUSEHOLD
              </div>
              <div
                style={{
                  color: "#ffffff",
                  fontSize: 26,
                  fontWeight: 900,
                  marginTop: 6,
                  lineHeight: 1.15,
                }}
              >
                Ghar Ki Bijli & AC
              </div>
              <div
                style={{
                  color: "#94a3b8",
                  fontSize: 14,
                  marginTop: 6,
                  fontWeight: 600,
                }}
              >
                Powered by 100% Thermal Coal
              </div>
            </div>

            {/* CENTER CONDUIT: ANIMATED LASER SPARKS */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
                position: "relative",
              }}
            >
              {/* High-voltage conduit line */}
              <div
                style={{
                  width: 90,
                  height: 6,
                  backgroundColor: "rgba(56, 189, 248, 0.3)",
                  borderRadius: 3,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Moving electricity pulse */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: `${(frame * 6) % 100}%`,
                    width: 30,
                    height: "100%",
                    background: "linear-gradient(90deg, transparent, #f59e0b, #ffffff, transparent)",
                  }}
                />
              </div>

              {/* Pulsing Lightning Core */}
              <div
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  backgroundColor: "#f59e0b",
                  border: "3.5px solid #ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 30,
                  boxShadow: `0 0 ${20 + glowPulse * 15}px rgba(245, 158, 11, 0.9)`,
                  transform: `scale(${pulse})`,
                }}
              >
                ⚡
              </div>

              <div
                style={{
                  color: "#f59e0b",
                  fontFamily: "monospace",
                  fontSize: 13,
                  fontWeight: 900,
                  letterSpacing: 1,
                }}
              >
                HIGH VOLTAGE
              </div>
            </div>

            {/* RIGHT NODE: MAHANADI COALFIELDS (MINING GIANTS) */}
            <div
              style={{
                backgroundColor: "rgba(15, 23, 42, 0.85)",
                border: "2.5px solid rgba(245, 158, 11, 0.6)",
                borderRadius: 20,
                padding: "20px 16px",
                textAlign: "center",
                boxShadow: "0 10px 30px rgba(245, 158, 11, 0.2)",
              }}
            >
              {/* Bespoke Excavator / Mine Tower SVG */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 60,
                  marginBottom: 6,
                }}
              >
                <svg width="68" height="60" viewBox="0 0 68 60" fill="none">
                  {/* Excavator Cabin */}
                  <rect x="18" y="24" width="28" height="20" rx="4" fill="#334155" stroke="#f59e0b" strokeWidth="2" />
                  {/* Crane Arm */}
                  <line x1="38" y1="24" x2="58" y2="8" stroke="#f59e0b" strokeWidth="3.5" strokeLinecap="round" />
                  <line x1="58" y1="8" x2="62" y2="20" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
                  {/* Excavator Bucket */}
                  <path d="M 56 20 L 66 22 L 64 30 L 54 28 Z" fill="#f59e0b" />
                  {/* Heavy Tank Tread Wheels */}
                  <rect x="12" y="44" width="40" height="10" rx="5" fill="#1e293b" stroke="#cbd5e1" strokeWidth="2" />
                  <circle cx="18" cy="49" r="3" fill="#94a3b8" />
                  <circle cx="32" cy="49" r="3" fill="#94a3b8" />
                  <circle cx="46" cy="49" r="3" fill="#94a3b8" />
                </svg>
              </div>

              <div
                style={{
                  color: "#f59e0b",
                  fontFamily: "monospace",
                  fontSize: 14,
                  fontWeight: 900,
                  letterSpacing: 1.5,
                }}
              >
                SUPPLIER MONOPOLY
              </div>
              <div
                style={{
                  color: "#ffffff",
                  fontSize: 26,
                  fontWeight: 900,
                  marginTop: 6,
                  lineHeight: 1.15,
                }}
              >
                Mahanadi Coal
              </div>
              <div
                style={{
                  color: "#94a3b8",
                  fontSize: 14,
                  marginTop: 6,
                  fontWeight: 600,
                }}
              >
                Coal India's Giant Cash Engine
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM METRIC BANNER */}
        <div
          style={{
            backgroundColor: "rgba(10, 15, 30, 0.94)",
            border: "2.5px solid #10b981",
            borderRadius: 20,
            padding: "16px 26px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            transform: `scale(${entrance})`,
            boxShadow: "0 14px 40px rgba(0,0,0,0.8)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            {/* Govt Sovereign Emblem SVG */}
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                backgroundColor: "rgba(16, 185, 129, 0.2)",
                border: "2px solid #10b981",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
              }}
            >
              🏛️
            </div>
            <div>
              <div style={{ color: "#ffffff", fontSize: 22, fontWeight: 900 }}>
                Mahanadi Coalfields Ltd. (MCL)
              </div>
                <div style={{ color: "#10b981", fontSize: 14, fontFamily: "monospace", fontWeight: 800 }}>
                  LARGEST COAL PRODUCING ARM OF COAL INDIA
                </div>
              </div>
            </div>
            <div
              style={{
                backgroundColor: "rgba(16, 185, 129, 0.2)",
                border: "1.5px solid #10b981",
                borderRadius: 10,
                padding: "8px 18px",
                color: "#10b981",
                fontSize: 16,
                fontWeight: 900,
                fontFamily: "monospace",
              }}
            >
              MAHAPSU
            </div>
          </div>
        </div>
    </SceneLayout>
  );
};
