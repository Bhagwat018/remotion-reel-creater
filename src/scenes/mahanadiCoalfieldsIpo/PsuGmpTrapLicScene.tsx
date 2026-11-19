import React from "react";
import { spring, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneLayout } from "../../components/SceneLayout";

export interface PsuGmpTrapLicSceneProps {
  id?: string;
  leadIn?: string;
  headline?: string;
  sub?: string;
  brollVideo?: string;
  durationInFrames: number;
}

export const PsuGmpTrapLicScene: React.FC<PsuGmpTrapLicSceneProps> = ({
  id,
  leadIn = "⚠️ GREY MARKET REALITY CHECK",
  headline = "SIRF ₹3 GMP (3% GAIN)! *LIC KI TARAH CAPITAL PHANS JAYEGA?*",
  sub = "Cold GMP & PSU Listing Trap Alert",
  brollVideo = "broll/stock_market_trading_chart.mp4",
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = interpolate(
    spring({ frame, fps, config: { damping: 12, stiffness: 130 } }),
    [0, 1],
    [0.90, 1]
  );

  const pulse = Math.sin(frame * 0.22) * 0.06 + 1;
  const glowPulse = (Math.sin(frame * 0.16) + 1) * 0.5;

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
        {/* FROZEN GMP SHOCKOMETER POD */}
        <div
          style={{
            backgroundColor: "rgba(10, 15, 30, 0.96)",
            border: "3.5px solid #ef4444",
            borderRadius: 24,
            padding: "24px 28px",
            boxShadow: `0 20px 60px rgba(239, 68, 68, 0.4)`,
            transform: `scale(${entrance})`,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Top animated hazard bar */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 5,
              background: "linear-gradient(90deg, #ef4444, #f59e0b, #ef4444)",
            }}
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: 20,
              alignItems: "center",
            }}
          >
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  backgroundColor: "rgba(56, 189, 248, 0.2)",
                  border: "1.5px solid #38bdf8",
                  borderRadius: 8,
                  padding: "4px 12px",
                  color: "#38bdf8",
                  fontFamily: "monospace",
                  fontSize: 14,
                  fontWeight: 900,
                  marginBottom: 8,
                }}
              >
                <span>❄️</span> SUB-ZERO FROZEN GMP
              </div>
              <div style={{ color: "#ffffff", fontSize: 26, fontWeight: 900 }}>
                Live Grey Market Premium
              </div>
              <div style={{ color: "#94a3b8", fontSize: 15, fontWeight: 600 }}>
                Estimated Listing Gain: Thanda & Zero Retail Excitement
              </div>
            </div>

              {/* Glowing Cold Metric Box */}
              <div
                style={{
                  backgroundColor: "rgba(239, 68, 68, 0.15)",
                  border: "2.5px solid #ef4444",
                  borderRadius: 18,
                  padding: "14px 24px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: "monospace",
                    fontSize: 52,
                    fontWeight: 900,
                    color: "#ef4444",
                    lineHeight: 1,
                    textShadow: `0 0 ${15 + glowPulse * 15}px rgba(239, 68, 68, 0.8)`,
                  }}
                >
                  ₹3 ONLY
                </div>
                <div
                  style={{
                    color: "#f87171",
                    fontFamily: "monospace",
                    fontSize: 18,
                    fontWeight: 800,
                    marginTop: 6,
                  }}
                >
                  ≈ 3.0% GAIN
                </div>
              </div>
            </div>
          </div>

          {/* DUAL COMPARISON: PSU LOTTERY MYTH & LIC TRAP */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
            }}
          >
            {/* PSU REALITY CARD */}
            <div
              style={{
                backgroundColor: "rgba(10, 15, 30, 0.94)",
                border: "3px solid #f59e0b",
                borderRadius: 22,
                padding: "20px 22px",
                boxShadow: "0 14px 40px rgba(245, 158, 11, 0.25)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    backgroundColor: "rgba(245, 158, 11, 0.2)",
                    border: "2px solid #f59e0b",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 22,
                  }}
                >
                  🏛️
                </div>
                <div>
                  <div
                    style={{
                      color: "#f59e0b",
                      fontFamily: "monospace",
                      fontSize: 13,
                      fontWeight: 900,
                    }}
                  >
                    PSU REALITY
                  </div>
                    <div style={{ color: "#ffffff", fontSize: 20, fontWeight: 900 }}>
                      No Lottery On Day 1!
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    color: "#cbd5e1",
                    fontSize: 14,
                    marginTop: 10,
                    lineHeight: 1.35,
                    fontWeight: 600,
                  }}
                >
                  Sarkari companies listing ke din 50-100% lottery return nahi deti!
                </div>
              </div>

              {/* LIC TRAP WARNING */}
              <div
                style={{
                  backgroundColor: "rgba(10, 15, 30, 0.94)",
                  border: "3.5px solid #ef4444",
                  borderRadius: 22,
                  padding: "20px 22px",
                  boxShadow: "0 14px 40px rgba(239, 68, 68, 0.35)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      backgroundColor: "rgba(239, 68, 68, 0.2)",
                      border: "2px solid #ef4444",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 22,
                    }}
                  >
                    🪤
                  </div>
                  <div>
                    <div
                      style={{
                        color: "#ef4444",
                        fontFamily: "monospace",
                        fontSize: 13,
                        fontWeight: 900,
                      }}
                    >
                      HISTORIC LESSON
                    </div>
                      <div style={{ color: "#ffffff", fontSize: 20, fontWeight: 900 }}>
                        Remember LIC Trap?
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      color: "#cbd5e1",
                      fontSize: 14,
                      marginTop: 10,
                      lineHeight: 1.35,
                      fontWeight: 600,
                    }}
                  >
                    Discount listing se retail investors ka paisa saalon tak block raha!
                  </div>
                </div>
              </div>

              {/* BOTTOM AVOID WARNING STRIP */}
              <div
                style={{
                  backgroundColor: "rgba(239, 68, 68, 0.22)",
                  border: "2.5px solid #ef4444",
                  borderRadius: 18,
                  padding: "14px 24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 12,
                  boxShadow: `0 0 ${15 + glowPulse * 15}px rgba(239, 68, 68, 0.5)`,
                  transform: `scale(${pulse})`,
                }}
              >
                <span style={{ fontSize: 26 }}>🚨</span>
                <span
                  style={{
                    color: "#ffffff",
                    fontSize: 18,
                    fontWeight: 900,
                    fontFamily: "monospace",
                    letterSpacing: 1.5,
                  }}
                >
                  1-DAY LISTING GAIN: 100% STRICT AVOID!
                </span>
              </div>
            </div>
          </SceneLayout>
          );
};
