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

  // Vault wheel spin
  const vaultRotation = frame * 1.8;

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
        {/* DUAL SCREEN-DOMINANT BALANCE SHEET HOLOGRAPHIC PODS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 18,
            transform: `scale(${entrance})`,
          }}
        >
          {/* ZERO DEBT TITANIUM SHIELD POD */}
          <div
            style={{
              backgroundColor: "rgba(10, 15, 30, 0.96)",
              border: "3.5px solid #10b981",
              borderRadius: 24,
              padding: "24px 20px",
              boxShadow: `0 18px 50px rgba(16, 185, 129, 0.35)`,
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

            {/* Bespoke Titanium Shield SVG */}
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 8, transform: `scale(${pulse})` }}>
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                {/* Outer Shield Outline */}
                <path
                  d="M 32 4 L 56 14 C 56 36 32 58 32 58 C 32 58 8 36 8 14 Z"
                  fill="rgba(16, 185, 129, 0.2)"
                  stroke="#10b981"
                  strokeWidth="3"
                  filter="drop-shadow(0 0 10px rgba(16, 185, 129, 0.6))"
                />
                {/* Central Verified Checkmark */}
                <path
                  d="M 22 30 L 28 38 L 44 22"
                  stroke="#ffffff"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div
              style={{
                color: "#10b981",
                fontFamily: "monospace",
                fontSize: 15,
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
                fontSize: 50,
                fontWeight: 900,
                marginTop: 4,
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
                marginTop: 8,
              }}
            >
              100% Karza-Mukt!
            </div>

            <div
              style={{
                color: "#94a3b8",
                fontSize: 14,
                marginTop: 6,
                fontWeight: 600,
              }}
            >
              Zero Bank Loans or Interest Cost
            </div>
          </div>

          {/* TIJORI CASH SE BHARI VAULT POD */}
          <div
            style={{
              backgroundColor: "rgba(10, 15, 30, 0.96)",
              border: "3.5px solid #f59e0b",
              borderRadius: 24,
              padding: "24px 20px",
              boxShadow: `0 18px 50px rgba(245, 158, 11, 0.35)`,
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

            {/* Bespoke Holographic Vault SVG */}
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                {/* Vault Door Body */}
                <rect x="8" y="8" width="48" height="48" rx="10" fill="#1e293b" stroke="#f59e0b" strokeWidth="3"/>
                {/* Central Lock Wheel */}
                <circle cx="32" cy="32" r="14" fill="#334155" stroke="#fbbf24" strokeWidth="2.5"/>
                {/* Rotating Wheel Spokes */}
                <g style={{ transform: `rotate(${vaultRotation}deg)`, transformOrigin: "32px 32px" }}>
                  <line x1="32" y1="18" x2="32" y2="46" stroke="#fbbf24" strokeWidth="2"/>
                  <line x1="18" y1="32" x2="46" y2="32" stroke="#fbbf24" strokeWidth="2"/>
                  <circle cx="32" cy="32" r="5" fill="#f59e0b"/>
                </g>
              </svg>
            </div>

            <div
              style={{
                color: "#f59e0b",
                fontFamily: "monospace",
                fontSize: 15,
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
                fontSize: 50,
                fontWeight: 900,
                marginTop: 4,
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
                marginTop: 8,
              }}
            >
              Tijori Cash Se Bhari!
            </div>

            <div
              style={{
                color: "#94a3b8",
                fontSize: 14,
                marginTop: 6,
                fontWeight: 600,
              }}
            >
              ₹10,000+ Cr Reserves & High Dividends
            </div>
          </div>
        </div>

        {/* BOTTOM SOVEREIGN MONOPOLY HUD STRIP */}
        <div
          style={{
            backgroundColor: "rgba(10, 15, 30, 0.94)",
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
              <div style={{ color: "#38bdf8", fontSize: 14, fontFamily: "monospace", fontWeight: 800 }}>
                CAPTIVE NTPC & STATE DISCOM CLIENT BASE
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
