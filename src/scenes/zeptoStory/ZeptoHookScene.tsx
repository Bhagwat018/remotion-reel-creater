import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface ZeptoHookSceneProps {
  durationInFrames: number;
}

export const ZeptoHookScene: React.FC<ZeptoHookSceneProps> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Smooth entrance springs
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

  const dualOrbSpring = spring({
    frame: frame - 6,
    fps,
    config: { damping: 12, stiffness: 130 },
  });

  const multiplierSpring = spring({
    frame: frame - 12,
    fps,
    config: { damping: 12, stiffness: 130 },
  });

  const teaserSpring = spring({
    frame: frame - 18,
    fps,
    config: { damping: 12, stiffness: 130 },
  });

  // Dynamic 3D tilt & gentle float animation
  const floatOrb = Math.sin((frame / fps) * Math.PI * 2) * 5;
  const pulseMultiplier = Math.sin((frame / fps) * Math.PI * 3) * 0.02 + 1;

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
            background: "linear-gradient(135deg, #f43f5e 0%, #8b5cf6 100%)",
            color: "#ffffff",
            border: "3.5px solid #000000",
            borderRadius: 999,
            padding: "8px 26px",
            boxShadow: "5px 5px 0px #000000",
          }}
        >
          <span style={{ fontSize: 22 }}>🦄</span>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 18,
              fontWeight: 900,
              letterSpacing: 1.5,
              textTransform: "uppercase",
            }}
          >
            STARTUP PIVOT MASTERCLASS
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
            PEHLA STARTUP FAIL... DOOSRA $1.4B KA!
          </div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 20,
              fontWeight: 800,
              color: "#7c3aed",
              marginTop: 6,
              letterSpacing: 0.5,
            }}
          >
            KiranaKart Ke Ash Se Zepto Ka Unicorn Banna 🚀
          </div>
        </div>
      </div>

      {/* 2. 3D DUEL ORB SHOWCASE: CRASH VS UNICORN (Height: 520px) */}
      <div
        style={{
          height: 520,
          transform: `scale(${dualOrbSpring})`,
          opacity: dualOrbSpring,
          backgroundColor: "#ffffff",
          border: "4px solid #000000",
          borderRadius: 28,
          boxShadow: "8px 8px 0px #000000",
          padding: "24px 28px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxSizing: "border-box",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Top Strip */}
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
            💥 The 2-Year Radical Pivot
          </span>
          <span
            style={{
              backgroundColor: "#fee2e2",
              color: "#b91c1c",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 14,
              fontWeight: 900,
              padding: "4px 12px",
              borderRadius: 8,
              border: "2px solid #000000",
            }}
          >
            ZERO TO $1.4B
          </span>
        </div>

        {/* 3D Duel Arena */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            gap: 16,
            perspective: 800,
          }}
        >
          {/* Left: 3D Fail Orb (KiranaKart) */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              transform: `translateY(${floatOrb}px) rotateY(-6deg)`,
              transition: "transform 0.2s ease-out",
            }}
          >
            {/* 3D Orb */}
            <div
              style={{
                width: 150,
                height: 150,
                borderRadius: "50%",
                background: "radial-gradient(circle at 35% 35%, #f87171, #dc2626 60%, #7f1d1d 100%)",
                boxShadow: "0 14px 28px rgba(220, 38, 38, 0.4), inset -6px -6px 12px rgba(0,0,0,0.5), inset 6px 6px 12px rgba(255,255,255,0.4)",
                border: "4px solid #000000",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <span style={{ fontSize: 44 }}>💥</span>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 13,
                  fontWeight: 900,
                  color: "#ffffff",
                  textShadow: "0 2px 4px rgba(0,0,0,0.8)",
                  marginTop: -2,
                }}
              >
                FAILED
              </span>
            </div>

            <div
              style={{
                fontFamily: "'Cabinet Grotesk', sans-serif",
                fontSize: 22,
                fontWeight: 950,
                color: "#dc2626",
                marginTop: 12,
                textAlign: "center",
              }}
            >
              2020: KiranaKart
            </div>
            <div
              style={{
                backgroundColor: "#fef2f2",
                border: "2px solid #f87171",
                borderRadius: 8,
                padding: "4px 10px",
                marginTop: 4,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 14,
                fontWeight: 800,
                color: "#991b1b",
              }}
            >
              Valuation: $0 (Dead)
            </div>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                fontWeight: 600,
                color: "#64748b",
                textAlign: "center",
                marginTop: 6,
                lineHeight: 1.2,
              }}
            >
              100% Capital Burned<br />Aggregator Model Crash
            </div>
          </div>

          {/* Center: 3D Pulsing Arrow & Transformation Pill */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              width: 90,
            }}
          >
            <div
              style={{
                transform: `scale(${pulseMultiplier})`,
                backgroundColor: "#fef08a",
                color: "#854d0e",
                border: "2.5px solid #000000",
                borderRadius: 12,
                padding: "6px 8px",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                fontWeight: 900,
                textAlign: "center",
                boxShadow: "3px 3px 0px #000000",
                lineHeight: 1.1,
              }}
            >
              2 YEARS LATER
            </div>
            <div
              style={{
                fontSize: 32,
                color: "#0f172a",
                fontWeight: 900,
              }}
            >
              ➔
            </div>
          </div>

          {/* Right: 3D Unicorn Orb (Zepto) */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              transform: `translateY(${-floatOrb}px) rotateY(6deg)`,
              transition: "transform 0.2s ease-out",
            }}
          >
            {/* 3D Orb */}
            <div
              style={{
                width: 150,
                height: 150,
                borderRadius: "50%",
                background: "radial-gradient(circle at 35% 35%, #a855f7, #7c3aed 60%, #4c1d95 100%)",
                boxShadow: "0 14px 28px rgba(124, 58, 237, 0.45), inset -6px -6px 12px rgba(0,0,0,0.5), inset 6px 6px 12px rgba(255,255,255,0.4)",
                border: "4px solid #000000",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <span style={{ fontSize: 44 }}>🦄</span>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 13,
                  fontWeight: 900,
                  color: "#fef08a",
                  textShadow: "0 2px 4px rgba(0,0,0,0.8)",
                  marginTop: -2,
                }}
              >
                UNICORN
              </span>
            </div>

            <div
              style={{
                fontFamily: "'Cabinet Grotesk', sans-serif",
                fontSize: 22,
                fontWeight: 950,
                color: "#7c3aed",
                marginTop: 12,
                textAlign: "center",
              }}
            >
              2023: Zepto
            </div>
            <div
              style={{
                backgroundColor: "#f5f3ff",
                border: "2px solid #a855f7",
                borderRadius: 8,
                padding: "4px 10px",
                marginTop: 4,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 14,
                fontWeight: 800,
                color: "#6b21a8",
              }}
            >
              Valuation: $1.4B
            </div>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                fontWeight: 600,
                color: "#64748b",
                textAlign: "center",
                marginTop: 6,
                lineHeight: 1.2,
              }}
            >
              India's Fastest Unicorn<br />Dark Store Revolution
            </div>
          </div>
        </div>

        {/* Bottom Banner inside Card */}
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
            <span style={{ fontSize: 20 }}>⚡</span>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 15,
                fontWeight: 700,
                color: "#ffffff",
              }}
            >
              Same Founders • Same City • 100% New Business Model
            </span>
          </div>
          <span
            style={{
              backgroundColor: "#22c55e",
              color: "#052e16",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 13,
              fontWeight: 900,
              padding: "4px 10px",
              borderRadius: 6,
            }}
          >
            GENIUS MOVE
          </span>
        </div>
      </div>

      {/* 3. MULTIPLIER & VELOCITY DIAL (Height: 390px) */}
      <div
        style={{
          height: 390,
          transform: `scale(${multiplierSpring})`,
          opacity: multiplierSpring,
          backgroundColor: "#090d16",
          border: "4px solid #000000",
          borderRadius: 28,
          boxShadow: "8px 8px 0px #000000",
          padding: "22px 28px",
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
            🚀 Valuation Velocity Meter
          </span>
          <span
            style={{
              backgroundColor: "#38bdf8",
              color: "#082f49",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 13,
              fontWeight: 900,
              padding: "4px 12px",
              borderRadius: 8,
              border: "2px solid #ffffff",
            }}
          >
            RECORD SPEED
          </span>
        </div>

        {/* 3 Connected 3D Circular Milestone Nodes */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 12,
            position: "relative",
          }}
        >
          {/* Milestone 1 */}
          <div
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              border: "2px solid rgba(239, 68, 68, 0.4)",
              borderRadius: 18,
              padding: "14px 10px",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #ef4444, #991b1b)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
                color: "#ffffff",
                fontWeight: 900,
                border: "2px solid #ffffff",
              }}
            >
              1
            </div>
            <div
              style={{
                fontFamily: "'Cabinet Grotesk', sans-serif",
                fontSize: 22,
                fontWeight: 950,
                color: "#f87171",
                marginTop: 8,
              }}
            >
              $0
            </div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                color: "#94a3b8",
                fontWeight: 700,
                marginTop: 2,
              }}
            >
              KiranaKart (2020)
            </div>
          </div>

          {/* Milestone 2 */}
          <div
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              border: "2px solid rgba(56, 189, 248, 0.4)",
              borderRadius: 18,
              padding: "14px 10px",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #38bdf8, #0369a1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
                color: "#ffffff",
                fontWeight: 900,
                border: "2px solid #ffffff",
              }}
            >
              2
            </div>
            <div
              style={{
                fontFamily: "'Cabinet Grotesk', sans-serif",
                fontSize: 22,
                fontWeight: 950,
                color: "#38bdf8",
                marginTop: 8,
              }}
            >
              $2.5M
            </div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                color: "#94a3b8",
                fontWeight: 700,
                marginTop: 2,
              }}
            >
              Zepto Seed (2021)
            </div>
          </div>

          {/* Milestone 3 */}
          <div
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.08)",
              border: "2px solid rgba(168, 85, 247, 0.6)",
              borderRadius: 18,
              padding: "14px 10px",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #a855f7, #6b21a8)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
                color: "#ffffff",
                fontWeight: 900,
                border: "2px solid #ffffff",
              }}
            >
              3
            </div>
            <div
              style={{
                fontFamily: "'Cabinet Grotesk', sans-serif",
                fontSize: 22,
                fontWeight: 950,
                color: "#c084fc",
                marginTop: 8,
              }}
            >
              $1.4B
            </div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                color: "#fef08a",
                fontWeight: 700,
                marginTop: 2,
              }}
            >
              Unicorn (2023)
            </div>
          </div>
        </div>

        {/* Dynamic Growth Rate Badge */}
        <div
          style={{
            backgroundColor: "rgba(168, 85, 247, 0.15)",
            border: "1.5px solid rgba(168, 85, 247, 0.4)",
            borderRadius: 14,
            padding: "12px 18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 24 }}>⚡</span>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 16,
                fontWeight: 700,
                color: "#e2e8f0",
              }}
            >
              Total Time: Only 2.5 Years to $1,400,000,000 Valuation
            </div>
          </div>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 16,
              fontWeight: 900,
              color: "#4ade80",
            }}
          >
            560X 📈
          </span>
        </div>
      </div>

      {/* 4. "KAISE HUA YE MAGIC?" TEASER BANNER (Height: 250px) */}
      <div
        style={{
          height: 250,
          transform: `scale(${teaserSpring})`,
          opacity: teaserSpring,
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
              KIRANAKART KI SABSE BADI KHAMMI KYA THI?
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
              17-18 saal ke teenage founders ne pehle attempt me kya galati kari?
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
            👉 Next: KiranaKart crash analysis & failure breakdown
          </span>
          <span style={{ fontSize: 20 }}>💥</span>
        </div>
      </div>
    </div>
  );
};

