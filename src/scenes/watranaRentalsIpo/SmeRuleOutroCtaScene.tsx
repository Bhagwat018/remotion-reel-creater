import React from "react";
import { spring, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneLayout } from "../../components/SceneLayout";

export interface SmeRuleOutroCtaSceneProps {
  id?: string;
  leadIn?: string;
  headline?: string;
  sub?: string;
  brollVideo?: string;
  durationInFrames: number;
}

export const SmeRuleOutroCtaScene: React.FC<SmeRuleOutroCtaSceneProps> = ({
  id,
  leadIn = "📜 THE GOLDEN SME IPO RULE",
  headline = "RULE: GMP > 30% TABHI APPLY! *CAPITAL SAFE RAKHO*",
  sub = "Never Risk Big Capital on Thin SME Margins",
  brollVideo = "broll/nasdaq_stock_ticker.mp4",
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = interpolate(
    spring({ frame, fps, config: { damping: 12, stiffness: 140 } }),
    [0, 1],
    [0.90, 1]
  );

  const pulse = Math.sin(frame * 0.22) * 0.05 + 1;
  const glowPulse = (Math.sin(frame * 0.16) + 1) * 0.5;

  // Animated voting bars
  const yesProgress = interpolate(frame, [0, 40], [0, 18], {
    extrapolateRight: "clamp",
  });
  const noProgress = interpolate(frame, [0, 40], [0, 82], {
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
          maxWidth: 980,
          display: "flex",
          flexDirection: "column",
          gap: 16,
          alignItems: "stretch",
          marginTop: 6,
          zIndex: 10,
        }}
      >
        {/* GOLDEN SME RULE BADGE POD */}
        <div style={{ display: "flex", justifyContent: "center", transform: `scale(${entrance})` }}>
          <div
            style={{
              padding: "16px 32px",
              backgroundColor: "rgba(245, 158, 11, 0.22)",
              border: "3.5px solid #f59e0b",
              borderRadius: 22,
              color: "#ffffff",
              fontFamily: "monospace",
              fontSize: 24,
              fontWeight: 900,
              letterSpacing: 1.5,
              boxShadow: `0 0 ${25 + glowPulse * 15}px rgba(245, 158, 11, 0.6)`,
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            <span style={{ fontSize: 32 }}>🛡️</span>
            <span>RULE: GMP &gt; 30% TABHI APPLY!</span>
          </div>
        </div>

        {/* AUDIENCE POLL CARD */}
        <div
          style={{
            backgroundColor: "rgba(10, 15, 30, 0.96)",
            border: "3px solid #38bdf8",
            borderRadius: 24,
            padding: "20px 28px",
            boxShadow: "0 18px 50px rgba(0,0,0,0.8)",
          }}
        >
          <div
            style={{
              color: "#38bdf8",
              fontSize: 15,
              fontFamily: "monospace",
              fontWeight: 900,
              textAlign: "center",
              marginBottom: 10,
              letterSpacing: 1,
            }}
          >
            COMMUNITY POLL • COMMENTS ME BATAO 👇
          </div>

          <div
            style={{
              color: "#ffffff",
              fontSize: 22,
              fontWeight: 900,
              textAlign: "center",
              marginBottom: 14,
            }}
          >
            Kya aap Watrana Rentals me apply karoge?
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {/* OPTION A: APPLY (RISKY) */}
            <div
              style={{
                backgroundColor: "rgba(15, 23, 42, 0.8)",
                border: "2px solid #ef4444",
                borderRadius: 12,
                padding: "8px 14px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  bottom: 0,
                  width: `${yesProgress}%`,
                  backgroundColor: "rgba(239, 68, 68, 0.25)",
                }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  position: "relative",
                  zIndex: 2,
                }}
              >
                <span style={{ color: "#ffffff", fontSize: 16, fontWeight: 800 }}>
                  ⚠️ Apply Karunga (Risk Seeker)
                </span>
                <span style={{ color: "#ef4444", fontFamily: "monospace", fontSize: 16, fontWeight: 900 }}>
                  {Math.round(yesProgress)}%
                </span>
              </div>
            </div>

            {/* OPTION B: AVOID (SMART MONEY) */}
            <div
              style={{
                backgroundColor: "rgba(15, 23, 42, 0.8)",
                border: "2px solid #10b981",
                borderRadius: 12,
                padding: "8px 14px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  bottom: 0,
                  width: `${noProgress}%`,
                  backgroundColor: "rgba(16, 185, 129, 0.25)",
                }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  position: "relative",
                  zIndex: 2,
                }}
              >
                <span style={{ color: "#ffffff", fontSize: 16, fontWeight: 800 }}>
                  🛡️ Avoid (Capital Safe Rakho)
                </span>
                <span style={{ color: "#10b981", fontFamily: "monospace", fontSize: 16, fontWeight: 900 }}>
                  {Math.round(noProgress)}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* GLOWING FOLLOW CTA POD */}
        <div
          style={{
            backgroundColor: "rgba(10, 15, 30, 0.98)",
            border: "3.5px solid #06b6d4",
            borderRadius: 24,
            padding: "16px 28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: `0 0 ${25 + glowPulse * 15}px rgba(6, 182, 212, 0.6)`,
            transform: `scale(${pulse})`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                backgroundColor: "#06b6d4",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
                color: "#0f172a",
                fontWeight: 900,
              }}
            >
              ⚡
            </div>
            <div>
              <div
                style={{
                  color: "#ffffff",
                  fontSize: 24,
                  fontWeight: 900,
                  letterSpacing: 0.5,
                }}
              >
                FOLLOW @TECHWITH.GENZ
              </div>
              <div
                style={{
                  color: "#38bdf8",
                  fontSize: 14,
                  fontFamily: "monospace",
                  fontWeight: 800,
                }}
              >
                DAILY UNBIASED SME IPO ANALYSIS
              </div>
            </div>
          </div>

          <div
            style={{
              backgroundColor: "#06b6d4",
              color: "#0f172a",
              padding: "10px 22px",
              borderRadius: 999,
              fontWeight: 900,
              fontSize: 16,
              fontFamily: "monospace",
              letterSpacing: 1,
            }}
          >
            FOLLOW
          </div>
        </div>
      </div>
    </SceneLayout>
  );
};
