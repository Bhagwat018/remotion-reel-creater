import React from "react";
import { spring, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneLayout } from "../../components/SceneLayout";

export interface ZeroDebtTreasurySceneProps {
  id?: string;
  leadIn?: string;
  headline?: string;
  sub?: string;
  brollVideo?: string;
  durationInFrames: number;
}

export const ZeroDebtTreasuryScene: React.FC<ZeroDebtTreasurySceneProps> = ({
  id,
  leadIn = "💎 BULLETPROOF BALANCE SHEET",
  headline = "COMPANY PAR ZERO DEBT! *AUR TIJORI CASH SE BHARI HAI*",
  sub = "Zero Borrowings & Massive Cash Reserves",
  brollVideo = "broll/cash_counter_rollers.mp4",
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = interpolate(
    spring({ frame, fps, config: { damping: 12, stiffness: 130 } }),
    [0, 1],
    [0.90, 1]
  );

  const pulse = Math.sin(frame * 0.18) * 0.05 + 1;
  const glowPulse = (Math.sin(frame * 0.15) + 1) * 0.5;

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
          gap: 18,
          alignItems: "stretch",
          marginTop: 6,
          zIndex: 10,
        }}
      >
        {/* DUAL SCREEN-DOMINANT POWER PODS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 18,
            transform: `scale(${entrance})`,
          }}
        >
          {/* ZERO DEBT POD */}
          <div
            style={{
              backgroundColor: "rgba(15, 23, 42, 0.95)",
              border: "3.5px solid #10b981",
              borderRadius: 24,
              padding: "28px 24px",
              boxShadow: `0 16px 45px rgba(16, 185, 129, 0.35)`,
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Top accent line */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 5,
                background: "linear-gradient(90deg, #10b981, #34d399)",
              }}
            />
            <div style={{ fontSize: 52, marginBottom: 8, transform: `scale(${pulse})` }}>
              🛡️
            </div>
            <div
              style={{
                color: "#10b981",
                fontFamily: "monospace",
                fontSize: 16,
                fontWeight: 900,
                letterSpacing: 2,
              }}
            >
              FINANCIAL HEALTH
            </div>
            <div
              style={{
                color: "#10b981",
                fontFamily: "monospace",
                fontSize: 52,
                fontWeight: 900,
                marginTop: 6,
                lineHeight: 1.1,
                textShadow: `0 0 ${15 + glowPulse * 15}px rgba(16, 185, 129, 0.8)`,
              }}
            >
              ₹0 DEBT
            </div>
            <div
              style={{
                color: "#ffffff",
                fontSize: 22,
                fontWeight: 900,
                marginTop: 10,
              }}
            >
              100% Karza-Mukt!
            </div>
            <div
              style={{
                color: "#94a3b8",
                fontSize: 15,
                marginTop: 6,
                fontWeight: 600,
              }}
            >
              Zero Bank Loans or Interest Burden
            </div>
          </div>

          {/* TIJORI CASH SE BHARI POD */}
          <div
            style={{
              backgroundColor: "rgba(15, 23, 42, 0.95)",
              border: "3.5px solid #f59e0b",
              borderRadius: 24,
              padding: "28px 24px",
              boxShadow: `0 16px 45px rgba(245, 158, 11, 0.35)`,
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Top accent line */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 5,
                background: "linear-gradient(90deg, #f59e0b, #fbbf24)",
              }}
            />
            <div style={{ fontSize: 52, marginBottom: 8, transform: `scale(${pulse})` }}>
              🏦 💰
            </div>
            <div
              style={{
                color: "#f59e0b",
                fontFamily: "monospace",
                fontSize: 16,
                fontWeight: 900,
                letterSpacing: 2,
              }}
            >
              TREASURY CASH
            </div>
            <div
              style={{
                color: "#f59e0b",
                fontFamily: "monospace",
                fontSize: 52,
                fontWeight: 900,
                marginTop: 6,
                lineHeight: 1.1,
                textShadow: `0 0 ${15 + glowPulse * 15}px rgba(245, 158, 11, 0.8)`,
              }}
            >
              CASH RICH
            </div>
            <div
              style={{
                color: "#ffffff",
                fontSize: 22,
                fontWeight: 900,
                marginTop: 10,
              }}
            >
              Tijori Cash Se Bhari Hai!
            </div>
            <div
              style={{
                color: "#94a3b8",
                fontSize: 15,
                marginTop: 6,
                fontWeight: 600,
              }}
            >
              Massive Reserves & High Dividend Payouts
            </div>
          </div>
        </div>

        {/* BOTTOM HUD PILL */}
        <div
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.92)",
            border: "2.5px solid #38bdf8",
            borderRadius: 20,
            padding: "16px 26px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 14px 40px rgba(0,0,0,0.8)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ fontSize: 30 }}>👑</span>
            <div>
              <div style={{ color: "#ffffff", fontSize: 22, fontWeight: 900 }}>
                Monopoly Energy Franchise
              </div>
              <div style={{ color: "#38bdf8", fontSize: 15, fontFamily: "monospace", fontWeight: 800 }}>
                CRITICAL VALUE CHAIN • CONSISTENT REVENUE
              </div>
            </div>
          </div>
          <div
            style={{
              backgroundColor: "rgba(56, 189, 248, 0.2)",
              border: "1.5px solid #38bdf8",
              borderRadius: 10,
              padding: "8px 18px",
              color: "#38bdf8",
              fontSize: 16,
              fontWeight: 900,
              fontFamily: "monospace",
            }}
          >
            AAA SOVEREIGN
          </div>
        </div>
      </div>
    </SceneLayout>
  );
};
