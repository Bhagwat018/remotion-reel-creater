import React from "react";
import { spring, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneLayout } from "../../components/SceneLayout";

export interface PowerGridCashMachineSceneProps {
  id?: string;
  leadIn?: string;
  headline?: string;
  sub?: string;
  brollVideo?: string;
  durationInFrames: number;
}

export const PowerGridCashMachineScene: React.FC<PowerGridCashMachineSceneProps> = ({
  id,
  leadIn = "🔌 CRITICAL ENERGY INFRASTRUCTURE",
  headline = "DESH KI 25% POWER SUPPLY! *COAL INDIA KI #1 CASH MACHINE*",
  sub = "Supplying 1 in every 4 units of electricity in India",
  brollVideo = "broll/thermal_power_plant_electricity.mp4",
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring animation
  const cardEntrance = interpolate(
    spring({ frame, fps, config: { damping: 12, stiffness: 130 } }),
    [0, 1],
    [0.90, 1]
  );

  // Animated counter for 25% power supply
  const powerProgress = interpolate(frame, [0, 45], [0, 25], {
    extrapolateRight: "clamp",
  });

  const glowPulse = (Math.sin(frame * 0.16) + 1) * 0.5;

  // Radar circle geometry
  const radius = 58;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * (powerProgress / 100));

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
        {/* NATIONAL POWER DISPATCH COCKPIT HUD */}
        <div
          style={{
            backgroundColor: "rgba(10, 15, 30, 0.96)",
            border: "3.5px solid #10b981",
            borderRadius: 24,
            padding: "24px 28px",
            boxShadow: `0 20px 60px rgba(16, 185, 129, 0.35)`,
            transform: `scale(${cardEntrance})`,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Top laser accent bar */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 5,
              background: "linear-gradient(90deg, #10b981, #06b6d4)",
            }}
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "150px 1fr",
              gap: 24,
              alignItems: "center",
            }}
          >
                {/* BESPOKE CIRCULAR RADAR GAUGE (SVG) */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                  }}
                >
                  <svg width="140" height="140" viewBox="0 0 140 140">
                    {/* Background Track Ring */}
                    <circle
                      cx="70"
                      cy="70"
                      r={radius}
                      stroke="rgba(30, 41, 59, 0.8)"
                      strokeWidth="10"
                      fill="none"
                    />
                    {/* Outer Rotating Cyber Ticks */}
                    <g style={{ transform: `rotate(${frame * 0.8}deg)`, transformOrigin: "70px 70px" }}>
                      <circle
                        cx="70"
                        cy="70"
                        r={radius + 8}
                        stroke="rgba(56, 189, 248, 0.4)"
                        strokeWidth="1.5"
                        strokeDasharray="4 8"
                        fill="none"
                      />
                    </g>
                    {/* Animated Neon Cyan/Green Progress Ring */}
                    <circle
                      cx="70"
                      cy="70"
                      r={radius}
                      stroke="#10b981"
                      strokeWidth="10"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                      fill="none"
                      style={{
                        filter: "drop-shadow(0 0 8px rgba(16, 185, 129, 0.8))",
                        transform: "rotate(-90deg)",
                        transformOrigin: "70px 70px",
                      }}
                    />
                  </svg>

                  {/* Central Glowing Percentage Text */}
                  <div
                    style={{
                      position: "absolute",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "monospace",
                        fontSize: 38,
                        fontWeight: 900,
                        color: "#10b981",
                        lineHeight: 1,
                        textShadow: `0 0 ${12 + glowPulse * 12}px rgba(16, 185, 129, 0.8)`,
                      }}
                    >
                      {Math.round(powerProgress)}%
                    </div>
                      <div
                        style={{
                          color: "#94a3b8",
                          fontFamily: "monospace",
                          fontSize: 11,
                          fontWeight: 800,
                          letterSpacing: 1,
                          marginTop: 2,
                        }}
                      >
                        GRID SHARE
                      </div>
                    </div>
                  </div>

                {/* RIGHT SIDE: 1 IN 4 LIGHT BULBS VISUAL MECHANISM */}
                <div>
                  <div
                    style={{
                      color: "#10b981",
                      fontFamily: "monospace",
                      fontSize: 14,
                      fontWeight: 900,
                      letterSpacing: 1.5,
                    }}
                  >
                    CRITICAL VALUE PROPOSITION
                  </div>
                  <div
                    style={{
                      color: "#ffffff",
                      fontSize: 24,
                      fontWeight: 900,
                      marginTop: 4,
                      lineHeight: 1.2,
                    }}
                  >
                    Desh Ki 25% Power Supply
                  </div>

                  {/* 4 Lightbulbs Array Graphic */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      marginTop: 14,
                      backgroundColor: "rgba(15, 23, 42, 0.8)",
                      padding: "10px 16px",
                      borderRadius: 14,
                      border: "1.5px solid rgba(56, 189, 248, 0.3)",
                    }}
                  >
                    {/* BULB 1 (ACTIVE MCL COAL BULB) */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      <svg width="34" height="42" viewBox="0 0 34 42" fill="none">
                        <circle cx="17" cy="16" r="14" fill="#f59e0b" filter="drop-shadow(0 0 8px #f59e0b)" />
                        <path d="M 12 28 L 22 28 L 20 36 L 14 36 Z" fill="#94a3b8" />
                        {/* Glowing Filament */}
                        <path d="M 13 14 L 17 8 L 21 14" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                      <span style={{ color: "#f59e0b", fontFamily: "monospace", fontSize: 11, fontWeight: 900 }}>MCL</span>
                    </div>

                      {/* BULB 2 (DIM) */}
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, opacity: 0.4 }}>
                        <svg width="34" height="42" viewBox="0 0 34 42" fill="none">
                          <circle cx="17" cy="16" r="14" fill="#334155" stroke="#64748b" strokeWidth="1.5" />
                          <path d="M 12 28 L 22 28 L 20 36 L 14 36 Z" fill="#475569" />
                        </svg>
                        <span style={{ color: "#94a3b8", fontFamily: "monospace", fontSize: 11 }}>Grid</span>
                      </div>

                      {/* BULB 3 (DIM) */}
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, opacity: 0.4 }}>
                        <svg width="34" height="42" viewBox="0 0 34 42" fill="none">
                          <circle cx="17" cy="16" r="14" fill="#334155" stroke="#64748b" strokeWidth="1.5" />
                          <path d="M 12 28 L 22 28 L 20 36 L 14 36 Z" fill="#475569" />
                        </svg>
                        <span style={{ color: "#94a3b8", fontFamily: "monospace", fontSize: 11 }}>Grid</span>
                      </div>

                      {/* BULB 4 (DIM) */}
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, opacity: 0.4 }}>
                        <svg width="34" height="42" viewBox="0 0 34 42" fill="none">
                          <circle cx="17" cy="16" r="14" fill="#334155" stroke="#64748b" strokeWidth="1.5" />
                          <path d="M 12 28 L 22 28 L 20 36 L 14 36 Z" fill="#475569" />
                        </svg>
                        <span style={{ color: "#94a3b8", fontFamily: "monospace", fontSize: 11 }}>Grid</span>
                      </div>

                      <div
                        style={{
                          marginLeft: 6,
                          color: "#38bdf8",
                          fontFamily: "monospace",
                          fontSize: 12,
                          fontWeight: 800,
                          lineHeight: 1.3,
                        }}
                      >
                        ⚡ 1 in every 4 bulbs in India runs on MCL Coal!
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* DUAL STAT PODS: CASH MACHINE & IPO SIZE */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 16,
                }}
              >
                {/* CASH MACHINE POD */}
                <div
                  style={{
                    backgroundColor: "rgba(10, 15, 30, 0.94)",
                    border: "3px solid #f59e0b",
                    borderRadius: 22,
                    padding: "20px 22px",
                    boxShadow: "0 14px 40px rgba(245, 158, 11, 0.25)",
                    position: "relative",
                  }}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: 14,
                          backgroundColor: "rgba(245, 158, 11, 0.2)",
                          border: "2px solid #f59e0b",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 26,
                        }}
                      >
                        🏭
                      </div>
                      <div>
                        <div
                          style={{
                            color: "#f59e0b",
                            fontFamily: "monospace",
                            fontSize: 14,
                            fontWeight: 900,
                          }}
                        >
                          COAL INDIA'S #1
                        </div>
                          <div style={{ color: "#ffffff", fontSize: 24, fontWeight: 900 }}>
                            Cash-Machine
                          </div>
                        </div>
                      </div>
                      <div
                        style={{
                          color: "#cbd5e1",
                          fontSize: 15,
                          marginTop: 10,
                          lineHeight: 1.3,
                          fontWeight: 600,
                        }}
                      >
                        200M+ Tonnes Annual Output • Highest Profits!
                      </div>
                    </div>

                    {/* ₹9,000 CR MEGA IPO */}
                    <div
                      style={{
                        backgroundColor: "rgba(10, 15, 30, 0.94)",
                        border: "3px solid #06b6d4",
                        borderRadius: 22,
                        padding: "20px 22px",
                        boxShadow: "0 14px 40px rgba(6, 182, 212, 0.25)",
                        position: "relative",
                      }}
                    >
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <div
                            style={{
                              width: 48,
                              height: 48,
                              borderRadius: 14,
                              backgroundColor: "rgba(6, 182, 212, 0.2)",
                              border: "2px solid #06b6d4",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: 26,
                            }}
                          >
                            💰
                          </div>
                          <div>
                            <div
                              style={{
                                color: "#06b6d4",
                                fontFamily: "monospace",
                                fontSize: 14,
                                fontWeight: 900,
                              }}
                            >
                              ISSUE SIZE
                            </div>
                              <div style={{ color: "#ffffff", fontSize: 24, fontWeight: 900 }}>
                                ₹9,000 Crore
                              </div>
                            </div>
                          </div>
                          <div
                            style={{
                              color: "#cbd5e1",
                              fontSize: 15,
                              marginTop: 10,
                              lineHeight: 1.3,
                              fontWeight: 600,
                            }}
                          >
                            Massive Sovereign Divestment of 2026!
                          </div>
                        </div>
                      </div>
                    </div>
                  </SceneLayout>
                  );
};
