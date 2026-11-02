import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface UpiRecordVolumeSceneProps {
  durationInFrames: number;
}

export const UpiRecordVolumeScene: React.FC<UpiRecordVolumeSceneProps> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const badgeSpring = spring({
    frame: frame - 1,
    fps,
    config: { damping: 12, stiffness: 150 },
  });

  const headerSpring = spring({
    frame: frame - 3,
    fps,
    config: { damping: 11, stiffness: 140 },
  });

  const globeSpring = spring({
    frame: frame - 6,
    fps,
    config: { damping: 12, stiffness: 130 },
  });

  const nodesSpring = spring({
    frame: frame - 11,
    fps,
    config: { damping: 12, stiffness: 130 },
  });

  const bridgeSpring = spring({
    frame: frame - 16,
    fps,
    config: { damping: 12, stiffness: 130 },
  });

  const floatGlobe = Math.sin((frame / fps) * Math.PI * 2) * 5;
  const pulseNumber = Math.sin((frame / fps) * Math.PI * 3) * 0.02 + 1;

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
      {/* 1. TOP HEADER BLOCK (Height: 175px) */}
      <div
        style={{
          height: 175,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            transform: `scale(${badgeSpring})`,
            opacity: badgeSpring,
            display: "flex",
            alignItems: "center",
            gap: 10,
            backgroundColor: "#2563eb",
            color: "#ffffff",
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
            ALL-TIME WORLD RECORD VOLUME
          </span>
        </div>

        <div
          style={{
            transform: `scale(${headerSpring})`,
            opacity: headerSpring,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontFamily: "'Cabinet Grotesk', 'Inter', sans-serif",
              fontSize: 50,
              fontWeight: 950,
              color: "#0f172a",
              lineHeight: 1.1,
              letterSpacing: -1,
            }}
          >
            FREE NAHI, BAS TUMHARE LIYE!
          </div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 20,
              fontWeight: 800,
              color: "#2563eb",
              marginTop: 6,
              letterSpacing: 0.5,
            }}
          >
            August 2026: 2,451 Crore Transactions Ek Single Month Me 🚀
          </div>
        </div>
      </div>

      {/* 2. MASSIVE 3D CIRCULAR TRANSACTION GLOBE (Height: 510px) */}
      <div
        style={{
          height: 510,
          transform: `scale(${globeSpring})`,
          opacity: globeSpring,
          backgroundColor: "#ffffff",
          border: "4px solid #000000",
          borderRadius: 28,
          boxShadow: "8px 8px 0px #000000",
          padding: "24px 28px",
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
            borderBottom: "2px dashed #cbd5e1",
            paddingBottom: 12,
          }}
        >
          <span
            style={{
              fontFamily: "'Cabinet Grotesk', sans-serif",
              fontSize: 22,
              fontWeight: 900,
              color: "#0f172a",
              textTransform: "uppercase",
            }}
          >
            🇮🇳 India's Digital Payment Giant
          </span>
          <span
            style={{
              backgroundColor: "#dbeafe",
              color: "#1e40af",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 14,
              fontWeight: 900,
              padding: "4px 12px",
              borderRadius: 8,
              border: "2px solid #000000",
            }}
          >
            AUGUST 2026
          </span>
        </div>

        {/* 3D Glowing Transaction Globe Center */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 24,
          }}
        >
          {/* Huge 3D Globe */}
          <div
            style={{
              width: 170,
              height: 170,
              borderRadius: "50%",
              background: "radial-gradient(circle at 35% 35%, #60a5fa, #2563eb 60%, #1e3a8a 100%)",
              border: "4px solid #000000",
              boxShadow: "0 14px 28px rgba(37, 99, 235, 0.45), inset -6px -6px 12px rgba(0,0,0,0.5), inset 6px 6px 12px rgba(255,255,255,0.4)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              transform: `translateY(${floatGlobe}px)`,
              flexShrink: 0,
            }}
          >
            <span style={{ fontSize: 44 }}>🌍</span>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 13,
                fontWeight: 900,
                color: "#fef08a",
                marginTop: 2,
              }}
            >
              #1 GLOBAL
            </span>
          </div>

          {/* Large Stat Numbers */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
            <div
              style={{
                transform: `scale(${pulseNumber})`,
                fontFamily: "'Cabinet Grotesk', sans-serif",
                fontSize: 48,
                fontWeight: 950,
                color: "#1e3a8a",
                lineHeight: 1.0,
                letterSpacing: -1,
              }}
            >
              2,451 CR
            </div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 16,
                fontWeight: 900,
                color: "#059669",
              }}
            >
              Monthly Transactions
            </div>
            <div
              style={{
                backgroundColor: "#eff6ff",
                border: "2px solid #bfdbfe",
                borderRadius: 10,
                padding: "6px 12px",
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                fontWeight: 700,
                color: "#1e40af",
              }}
            >
              Total Value: ~₹20.6 Lakh Crore!
            </div>
          </div>
        </div>

        {/* Global comparison banner */}
        <div
          style={{
            backgroundColor: "#090d16",
            border: "2px solid #000000",
            borderRadius: 16,
            padding: "12px 18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 20 }}>🔥</span>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 15,
                fontWeight: 700,
                color: "#ffffff",
              }}
            >
              Duniya ke total digital payments ka 46% akele India me hota hai!
            </span>
          </div>
          <span
            style={{
              backgroundColor: "#22c55e",
              color: "#052e16",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              fontWeight: 900,
              padding: "4px 8px",
              borderRadius: 6,
            }}
          >
            46% WORLD
          </span>
        </div>
      </div>

      {/* 3. 3 CIRCULAR FLOW NODES: WHY BANKS ARE BLEEDING (Height: 400px) */}
      <div
        style={{
          height: 400,
          transform: `scale(${nodesSpring})`,
          opacity: nodesSpring,
          backgroundColor: "#090d16",
          border: "4px solid #000000",
          borderRadius: 28,
          boxShadow: "8px 8px 0px #000000",
          padding: "22px 26px",
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
          <span
            style={{
              fontFamily: "'Cabinet Grotesk', sans-serif",
              fontSize: 22,
              fontWeight: 900,
              color: "#ffffff",
              textTransform: "uppercase",
              letterSpacing: 0.5,
            }}
          >
            🏦 Free UPI Se Banks Ko Kya Nuksaan Hai?
          </span>
          <span
            style={{
              backgroundColor: "#ef4444",
              color: "#ffffff",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 13,
              fontWeight: 900,
              padding: "4px 10px",
              borderRadius: 6,
            }}
          >
            REAL PROBLEM
          </span>
        </div>

        {/* Node 1 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            border: "2px solid rgba(239, 68, 68, 0.4)",
            borderRadius: 16,
            padding: "10px 16px",
          }}
        >
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: "50%",
              backgroundColor: "#ef4444",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              color: "#ffffff",
              fontWeight: 900,
              flexShrink: 0,
            }}
          >
            💸
          </div>
          <div>
            <div
              style={{
                fontFamily: "'Cabinet Grotesk', sans-serif",
                fontSize: 18,
                fontWeight: 900,
                color: "#fca5a5",
              }}
            >
              15-20 Paise Kharcha Har Transaction Pe
            </div>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                fontWeight: 600,
                color: "#94a3b8",
              }}
            >
              Chahe transaction fail ho ya pass, bank switch server ka bill banta hai.
            </div>
          </div>
        </div>

        {/* Node 2 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            border: "2px solid rgba(245, 158, 11, 0.4)",
            borderRadius: 16,
            padding: "10px 16px",
          }}
        >
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: "50%",
              backgroundColor: "#f59e0b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              color: "#000000",
              fontWeight: 900,
              flexShrink: 0,
            }}
          >
            ☕
          </div>
          <div>
            <div
              style={{
                fontFamily: "'Cabinet Grotesk', sans-serif",
                fontSize: 18,
                fontWeight: 900,
                color: "#fde68a",
              }}
            >
              Micro-Payments (₹10 Chai & Snacks)
            </div>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                fontWeight: 600,
                color: "#94a3b8",
              }}
            >
              50%+ UPI payments ₹200 se kam hote hain — banks earn ₹0 revenue!
            </div>
          </div>
        </div>

        {/* Node 3 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            border: "2px solid rgba(56, 189, 248, 0.4)",
            borderRadius: 16,
            padding: "10px 16px",
          }}
        >
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: "50%",
              backgroundColor: "#0ea5e9",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              color: "#ffffff",
              fontWeight: 900,
              flexShrink: 0,
            }}
          >
            🏛️
          </div>
          <div>
            <div
              style={{
                fontFamily: "'Cabinet Grotesk', sans-serif",
                fontSize: 18,
                fontWeight: 900,
                color: "#7dd3fc",
              }}
            >
              Government Subsidies Are Not Enough
            </div>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                fontWeight: 600,
                color: "#94a3b8",
              }}
            >
              Sarkar ₹1,500 Cr subsidy deti hai, par annual network cost ₹4,000+ Cr hai.
            </div>
          </div>
        </div>
      </div>

      {/* 4. BRIDGE TO NPCI SOLUTION BANNER (Height: 250px) */}
      <div
        style={{
          height: 250,
          transform: `scale(${bridgeSpring})`,
          opacity: bridgeSpring,
          backgroundColor: "#fef08a",
          border: "4px solid #000000",
          borderRadius: 24,
          boxShadow: "8px 8px 0px #000000",
          padding: "20px 26px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 32 }}>💡</span>
          <div>
            <div
              style={{
                fontFamily: "'Cabinet Grotesk', sans-serif",
                fontSize: 22,
                fontWeight: 950,
                color: "#0f172a",
                lineHeight: 1.1,
              }}
            >
              ISLIYE AAYA NPCI KA NAYA 0.4% MDR PLAN!
            </div>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 15,
                fontWeight: 700,
                color: "#854d0e",
                marginTop: 2,
              }}
            >
              Customer se nahi, select dukaandaaron se thodi fee lene ka proposal!
            </div>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#ffffff",
            border: "2.5px solid #000000",
            borderRadius: 14,
            padding: "12px 18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 14,
              fontWeight: 900,
              color: "#0f172a",
            }}
          >
            👉 Next: Dukaandar se ₹2,000 se upar pe 0.4% fee ka rule
          </span>
          <span style={{ fontSize: 20 }}>🏪</span>
        </div>
      </div>
    </div>
  );
};

