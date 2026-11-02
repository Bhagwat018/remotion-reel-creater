import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface LootStatSceneProps {
  durationInFrames: number;
}

export const LootStatScene: React.FC<LootStatSceneProps> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerSpring = spring({
    frame: frame - 1,
    fps,
    config: { damping: 12, stiffness: 150 },
  });

  const statCard1 = spring({
    frame: frame - 4,
    fps,
    config: { damping: 11, stiffness: 140 },
  });

  const statCard2 = spring({
    frame: frame - 8,
    fps,
    config: { damping: 11, stiffness: 140 },
  });

  const demoSpring = spring({
    frame: frame - 12,
    fps,
    config: { damping: 12, stiffness: 130 },
  });

  const trailSpring = spring({
    frame: frame - 16,
    fps,
    config: { damping: 12, stiffness: 130 },
  });

  const bottomSpring = spring({
    frame: frame - 20,
    fps,
    config: { damping: 12, stiffness: 130 },
  });

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: 1080,
        height: 1920,
        paddingTop: 130,
        paddingBottom: 400,
        paddingLeft: 56,
        paddingRight: 56,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "stretch",
        gap: 18,
        zIndex: 10,
      }}
    >
      {/* 1. TOP HEADER BLOCK (Height: 170px) */}
      <div
        style={{
          height: 170,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            transform: `scale(${headerSpring})`,
            opacity: headerSpring,
            display: "flex",
            alignItems: "center",
            gap: 10,
            backgroundColor: "#ffffff",
            color: "#0f172a",
            border: "3.5px solid #000000",
            borderRadius: 999,
            padding: "8px 24px",
            boxShadow: "4px 4px 0px #000000",
          }}
        >
          <span style={{ fontSize: 22 }}>📊</span>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 18,
              fontWeight: 900,
              letterSpacing: 1.5,
              textTransform: "uppercase",
            }}
          >
            GOVT OF INDIA CYBERCRIME REPORT 2026
          </span>
        </div>

        <div
          style={{
            transform: `scale(${headerSpring})`,
            opacity: headerSpring,
            backgroundColor: "#ffffff",
            border: "4px solid #000000",
            borderRadius: 22,
            padding: "10px 24px",
            textAlign: "center",
            boxShadow: "6px 6px 0px #000000",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 52,
              color: "#dc2626",
              letterSpacing: 2,
              lineHeight: 1,
            }}
          >
            💸 ₹647 CRORE LOOT!
          </div>
          <div
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 18,
              fontWeight: 800,
              color: "#334155",
              marginTop: 2,
            }}
          >
            Jan se August 2026: 21,900 se zyada complaints!
          </div>
        </div>
      </div>

      {/* 2. DUAL HERO STAT CARDS (Height: 260px) */}
      <div
        style={{
          height: 260,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 18,
          boxSizing: "border-box",
        }}
      >
        {/* Left Stat */}
        <div
          style={{
            transform: `scale(${statCard1})`,
            opacity: statCard1,
            backgroundColor: "#fee2e2",
            border: "4px solid #000000",
            borderRadius: 22,
            padding: "18px 20px",
            boxShadow: "6px 6px 0px #000000",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 15,
              fontWeight: 900,
              color: "#991b1b",
              letterSpacing: 1,
            }}
          >
            💸 TOTAL EXTORTION
          </div>
          <div
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 66,
              lineHeight: 0.95,
              color: "#dc2626",
              letterSpacing: 1,
            }}
          >
            ₹647 CR+
          </div>
          <div
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 14,
              fontWeight: 700,
              color: "#7f1d1d",
              lineHeight: 1.3,
            }}
          >
            Siphoned to overseas mule accounts & crypto
          </div>
        </div>

        {/* Right Stat */}
        <div
          style={{
            transform: `scale(${statCard2})`,
            opacity: statCard2,
            backgroundColor: "#fef3c7",
            border: "4px solid #000000",
            borderRadius: 22,
            padding: "18px 20px",
            boxShadow: "6px 6px 0px #000000",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 15,
              fontWeight: 900,
              color: "#92400e",
              letterSpacing: 1,
            }}
          >
            📋 REPORTED CASES
          </div>
          <div
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 66,
              lineHeight: 0.95,
              color: "#d97706",
              letterSpacing: 1,
            }}
          >
            21,900+
          </div>
          <div
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 14,
              fontWeight: 700,
              color: "#78350f",
              lineHeight: 1.3,
            }}
          >
            Over 90 FIRs filed every single day on 1930
          </div>
        </div>
      </div>

      {/* 3. TARGET DEMOGRAPHICS VISUAL INFOGRAPHIC (Height: 330px) */}
      <div
        style={{
          height: 330,
          transform: `scale(${demoSpring})`,
          opacity: demoSpring,
          backgroundColor: "#ffffff",
          border: "4px solid #000000",
          borderRadius: 24,
          padding: "18px 22px",
          boxShadow: "6px 6px 0px #000000",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 18,
              fontWeight: 900,
              color: "#0f172a",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span>🎯</span> WHO ARE THE VICTIMS? (TARGET BREAKDOWN)
          </div>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 13,
              fontWeight: 800,
              color: "#64748b",
            }}
          >
            MHA 2026 DATA
          </span>
        </div>

        {/* Target 1: Senior Citizens */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 15,
              fontWeight: 800,
              color: "#0f172a",
            }}
          >
            <span>👴 Senior Citizens & Pensioners (Retirement Savings)</span>
            <span style={{ color: "#dc2626", fontWeight: 900 }}>68% OF CASES</span>
          </div>
          <div
            style={{
              height: 14,
              backgroundColor: "#f1f5f9",
              borderRadius: 7,
              border: "2px solid #000000",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: "68%",
                height: "100%",
                backgroundColor: "#dc2626",
              }}
            />
          </div>
        </div>

        {/* Target 2: Professionals */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 15,
              fontWeight: 800,
              color: "#0f172a",
            }}
          >
            <span>🩺 Doctors, Teachers & High Officials (Defamation Fear)</span>
            <span style={{ color: "#d97706", fontWeight: 900 }}>22% OF CASES</span>
          </div>
          <div
            style={{
              height: 14,
              backgroundColor: "#f1f5f9",
              borderRadius: 7,
              border: "2px solid #000000",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: "22%",
                height: "100%",
                backgroundColor: "#f59e0b",
              }}
            />
          </div>
        </div>

        {/* Target 3: Homemakers & Others */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 15,
              fontWeight: 800,
              color: "#0f172a",
            }}
          >
            <span>💼 Homemakers & Working Youth (Aadhaar / FedEx Trap)</span>
            <span style={{ color: "#2563eb", fontWeight: 900 }}>10% OF CASES</span>
          </div>
          <div
            style={{
              height: 14,
              backgroundColor: "#f1f5f9",
              borderRadius: 7,
              border: "2px solid #000000",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: "10%",
                height: "100%",
                backgroundColor: "#3b82f6",
              }}
            />
          </div>
        </div>
      </div>

      {/* 4. THE MONEY TRAIL / SIPHON PIPELINE CARD (Height: 240px) */}
      <div
        style={{
          height: 240,
          transform: `scale(${trailSpring})`,
          opacity: trailSpring,
          backgroundColor: "#ffffff",
          border: "4px solid #000000",
          borderRadius: 22,
          padding: "18px 22px",
          boxShadow: "6px 6px 0px #000000",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 18,
            fontWeight: 900,
            color: "#0f172a",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span>🌐</span> WHERE DOES ₹647 CRORE GO? (THE MONEY TRAIL)
        </div>

        <div
          style={{
            backgroundColor: "#f8fafc",
            border: "2px dashed #94a3b8",
            borderRadius: 14,
            padding: "12px 16px",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 15,
            fontWeight: 700,
            color: "#334155",
            lineHeight: 1.4,
          }}
        >
          <strong>Indian Bank Account</strong> → <strong>Rented Mule Accounts (Layers in UP/WB/Bihar)</strong> → <strong>Off-shore Crypto in Cambodia / Myanmar</strong> in under 15 minutes!
        </div>

        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 13,
            fontWeight: 800,
            color: "#dc2626",
          }}
        >
          ⚠️ Once converted to cryptocurrency, recovery is almost impossible.
        </div>
      </div>

      {/* 5. BOTTOM TRAGEDY METRIC & WARNING CARD (Height: 290px) */}
      <div
        style={{
          height: 290,
          transform: `scale(${bottomSpring})`,
          opacity: bottomSpring,
          backgroundColor: "#fef08a",
          border: "4px solid #ca8a04",
          borderRadius: 22,
          padding: "18px 24px",
          boxShadow: "6px 6px 0px #000000",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 20,
              fontWeight: 900,
              color: "#854d0e",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span>💔</span> AVERAGE LOSS PER VICTIM:
          </div>
          <div
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 34,
              color: "#b45309",
              letterSpacing: 1,
            }}
          >
            ₹15 LAKH – ₹2.5 CRORE
          </div>
        </div>

        <div
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 16,
            fontWeight: 700,
            color: "#713f12",
            lineHeight: 1.4,
          }}
        >
          "Seniors police ki respect karte hain aur badnaam hone se darte hain. Scammers unke darr aur izzat ka faayda uthate hain!"
        </div>

        <div
          style={{
            backgroundColor: "#fef9c3",
            border: "2px solid #eab308",
            borderRadius: 10,
            padding: "8px 14px",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 14,
            fontWeight: 800,
            color: "#854d0e",
            textAlign: "center",
          }}
        >
          🛡️ Hamara farz hai apne parents ko alert karna aur bachana!
        </div>
      </div>
    </div>
  );
};
