import React from "react";
import { spring, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneLayout } from "../../components/SceneLayout";

export interface MahanadiOutroCtaSceneProps {
  id?: string;
  leadIn?: string;
  headline?: string;
  sub?: string;
  brollVideo?: string;
  durationInFrames: number;
}

export const MahanadiOutroCtaScene: React.FC<MahanadiOutroCtaSceneProps> = ({
  id,
  leadIn = "🎯 FINAL INVESTMENT VERDICT",
  headline = "MAHANADI COALFIELDS: *APPLY YA AVOID?*",
  sub = "Listing Gain vs Long-Term Dividend Verdict",
  brollVideo = "broll/trading_floor_screens.mp4",
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = interpolate(
    spring({ frame, fps, config: { damping: 12, stiffness: 130 } }),
    [0, 1],
    [0.90, 1]
  );

  const pulse = Math.sin(frame * 0.22) * 0.05 + 1;
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
        {/* DUAL FINAL VERDICT MATRIX */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
            transform: `scale(${entrance})`,
          }}
        >
          {/* 1-DAY LISTING GAIN: AVOID */}
          <div
            style={{
              backgroundColor: "rgba(15, 23, 42, 0.95)",
              border: "3.5px solid #ef4444",
              borderRadius: 22,
              padding: "20px 20px",
              boxShadow: "0 14px 40px rgba(239, 68, 68, 0.35)",
              textAlign: "center",
              position: "relative",
            }}
          >
            <div
              style={{
                color: "#ef4444",
                fontFamily: "monospace",
                fontSize: 14,
                fontWeight: 900,
                letterSpacing: 1.5,
              }}
            >
              1-DAY LISTING GAIN
            </div>
            <div
              style={{
                color: "#ef4444",
                fontSize: 34,
                fontWeight: 900,
                marginTop: 6,
                letterSpacing: 1,
              }}
            >
              ❌ AVOID
            </div>
            <div
              style={{
                color: "#94a3b8",
                fontSize: 14,
                marginTop: 6,
                fontWeight: 600,
              }}
            >
              Cold 3% GMP • Capital Lockup Risk
            </div>
          </div>

          {/* LONG-TERM DIVIDEND: SOLID */}
          <div
            style={{
              backgroundColor: "rgba(15, 23, 42, 0.95)",
              border: "3.5px solid #10b981",
              borderRadius: 22,
              padding: "20px 20px",
              boxShadow: "0 14px 40px rgba(16, 185, 129, 0.35)",
              textAlign: "center",
              position: "relative",
            }}
          >
            <div
              style={{
                color: "#10b981",
                fontFamily: "monospace",
                fontSize: 14,
                fontWeight: 900,
                letterSpacing: 1.5,
              }}
            >
              LONG-TERM PLAY
            </div>
            <div
              style={{
                color: "#10b981",
                fontSize: 34,
                fontWeight: 900,
                marginTop: 6,
                letterSpacing: 1,
              }}
            >
              ✅ SOLID DIVIDEND
            </div>
            <div
              style={{
                color: "#94a3b8",
                fontSize: 14,
                marginTop: 6,
                fontWeight: 600,
              }}
            >
              Zero Debt • Huge Cash Reserves
            </div>
          </div>
        </div>

        {/* AUDIENCE INTERACTIVE QUESTION */}
        <div
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.95)",
            border: "3px solid #38bdf8",
            borderRadius: 22,
            padding: "20px 26px",
            boxShadow: "0 14px 40px rgba(56, 189, 248, 0.25)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              color: "#38bdf8",
              fontFamily: "monospace",
              fontSize: 15,
              fontWeight: 900,
              letterSpacing: 1.5,
            }}
          >
            COMMENTS ME BATAO 👇
          </div>
          <div
            style={{
              color: "#ffffff",
              fontSize: 24,
              fontWeight: 900,
              marginTop: 6,
            }}
          >
            Kya aap Mahanadi Coalfields me apply karoge?
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
              marginTop: 14,
            }}
          >
            <div
              style={{
                backgroundColor: "rgba(16, 185, 129, 0.2)",
                border: "2px solid #10b981",
                borderRadius: 14,
                padding: "10px 14px",
                color: "#ffffff",
                fontSize: 16,
                fontWeight: 800,
              }}
            >
              👍 Yes (Long-Term)
            </div>
            <div
              style={{
                backgroundColor: "rgba(239, 68, 68, 0.2)",
                border: "2px solid #ef4444",
                borderRadius: 14,
                padding: "10px 14px",
                color: "#ffffff",
                fontSize: 16,
                fontWeight: 800,
              }}
            >
              👎 No (Avoid Gain)
            </div>
          </div>
        </div>

        {/* GLOWING FOLLOW CTA POD */}
        <div
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.96)",
            border: "3.5px solid #06b6d4",
            borderRadius: 24,
            padding: "18px 28px",
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
                DAILY UNBIASED SHARE MARKET SECRETS
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
