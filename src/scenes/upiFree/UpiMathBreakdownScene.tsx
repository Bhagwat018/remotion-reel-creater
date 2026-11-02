import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface UpiMathBreakdownSceneProps {
  durationInFrames: number;
}

export const UpiMathBreakdownScene: React.FC<UpiMathBreakdownSceneProps> = () => {
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

  const stageSpring = spring({
    frame: frame - 6,
    fps,
    config: { damping: 12, stiffness: 130 },
  });

  const matrixSpring = spring({
    frame: frame - 11,
    fps,
    config: { damping: 12, stiffness: 130 },
  });

  const teaserSpring = spring({
    frame: frame - 16,
    fps,
    config: { damping: 12, stiffness: 130 },
  });

  const floatDisc = Math.sin((frame / fps) * Math.PI * 2) * 4;

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
            backgroundColor: "#0284c7",
            color: "#ffffff",
            border: "3.5px solid #000000",
            borderRadius: 999,
            padding: "8px 24px",
            boxShadow: "4px 4px 0px #000000",
          }}
        >
          <span style={{ fontSize: 22 }}>🧮</span>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 18,
              fontWeight: 900,
              letterSpacing: 1.5,
              textTransform: "uppercase",
            }}
          >
            LIVE CALCULATION MATH
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
            ₹5,000 KE PAYMENT PE ₹20 FEE!
          </div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 20,
              fontWeight: 800,
              color: "#0284c7",
              marginTop: 6,
              letterSpacing: 0.5,
            }}
          >
            Ye Fee Sirf Merchant Se Hogi, Customer Ko ₹0 Extra Dena Hai 🧾
          </div>
        </div>
      </div>

      {/* 2. 3D DUAL SETTLEMENT FLOW STAGE (Height: 510px) */}
      <div
        style={{
          height: 510,
          transform: `scale(${stageSpring})`,
          opacity: stageSpring,
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
            💳 ₹5,000 Transaction Ledger
          </span>
          <span
            style={{
              backgroundColor: "#e0f2fe",
              color: "#0369a1",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 14,
              fontWeight: 900,
              padding: "4px 12px",
              borderRadius: 8,
              border: "2px solid #000000",
            }}
          >
            0.4% DEDUCTION
          </span>
        </div>

        {/* 3 Steps: Customer -> Fee -> Merchant */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          {/* Customer Side */}
          <div
            style={{
              flex: 1,
              backgroundColor: "#f0fdf4",
              border: "3px solid #22c55e",
              borderRadius: 20,
              padding: "16px 12px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              transform: `translateY(${floatDisc}px)`,
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: 54,
                height: 54,
                borderRadius: "50%",
                background: "radial-gradient(circle at 35% 35%, #86efac, #22c55e)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 26,
                color: "#ffffff",
                border: "2px solid #000000",
              }}
            >
              👤
            </div>
            <div
              style={{
                fontFamily: "'Cabinet Grotesk', sans-serif",
                fontSize: 24,
                fontWeight: 950,
                color: "#15803d",
                marginTop: 8,
              }}
            >
              ₹5,000
            </div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                color: "#166534",
                fontWeight: 800,
              }}
            >
              Debited from You
            </div>
          </div>

          {/* The Fee Cut */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: 100,
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                background: "radial-gradient(circle at 35% 35%, #fde047, #eab308 60%, #a16207 100%)",
                border: "3px solid #000000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
                boxShadow: "0 4px 12px rgba(234, 179, 8, 0.4)",
              }}
            >
              ✂️
            </div>
            <div
              style={{
                fontFamily: "'Cabinet Grotesk', sans-serif",
                fontSize: 20,
                fontWeight: 950,
                color: "#b45309",
                marginTop: 6,
              }}
            >
              -₹20
            </div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                fontWeight: 900,
                color: "#78350f",
                backgroundColor: "#fef08a",
                padding: "2px 6px",
                borderRadius: 4,
                border: "1.5px solid #000000",
                marginTop: 2,
              }}
            >
              0.4% MDR
            </div>
          </div>

          {/* Merchant Side */}
          <div
            style={{
              flex: 1,
              backgroundColor: "#eff6ff",
              border: "3px solid #3b82f6",
              borderRadius: 20,
              padding: "16px 12px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              transform: `translateY(${-floatDisc}px)`,
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: 54,
                height: 54,
                borderRadius: "50%",
                background: "radial-gradient(circle at 35% 35%, #93c5fd, #3b82f6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 26,
                color: "#ffffff",
                border: "2px solid #000000",
              }}
            >
              🏪
            </div>
            <div
              style={{
                fontFamily: "'Cabinet Grotesk', sans-serif",
                fontSize: 24,
                fontWeight: 950,
                color: "#1d4ed8",
                marginTop: 8,
              }}
            >
              ₹4,980
            </div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                color: "#1e40af",
                fontWeight: 800,
              }}
            >
              Received by Shop
            </div>
          </div>
        </div>

        {/* Protection Banner */}
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
            <span style={{ fontSize: 20 }}>🛡️</span>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 15,
                fontWeight: 700,
                color: "#ffffff",
              }}
            >
              Dukaandar aapse ₹20 alag se maange toh wo 100% ILLEGAL hai!
            </span>
          </div>
          <span
            style={{
              backgroundColor: "#ef4444",
              color: "#ffffff",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              fontWeight: 900,
              padding: "4px 8px",
              borderRadius: 6,
            }}
          >
            PROTECTION
          </span>
        </div>
      </div>

      {/* 3. MULTI-TIER FEE SLICING MATRIX (Height: 400px) */}
      <div
        style={{
          height: 400,
          transform: `scale(${matrixSpring})`,
          opacity: matrixSpring,
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
            📊 Quick Bill Amount Matrix
          </span>
          <span
            style={{
              backgroundColor: "#38bdf8",
              color: "#0c4a6e",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 13,
              fontWeight: 900,
              padding: "4px 10px",
              borderRadius: 6,
            }}
          >
            0.4% FORMULA
          </span>
        </div>

        {/* 4 Tier rows */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 12,
          }}
        >
          {/* Tier 1 */}
          <div
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              border: "1.5px solid rgba(56, 189, 248, 0.3)",
              borderRadius: 14,
              padding: "12px 16px",
            }}
          >
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#94a3b8" }}>
              Groceries & Clothes
            </div>
            <div style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontSize: 20, fontWeight: 950, color: "#ffffff" }}>
              ₹2,500 Bill
            </div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, fontWeight: 900, color: "#38bdf8", marginTop: 2 }}>
              Fee: ₹10 only
            </div>
          </div>

          {/* Tier 2 */}
          <div
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              border: "1.5px solid rgba(56, 189, 248, 0.3)",
              borderRadius: 14,
              padding: "12px 16px",
            }}
          >
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#94a3b8" }}>
              Restaurant & Dining
            </div>
            <div style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontSize: 20, fontWeight: 950, color: "#ffffff" }}>
              ₹5,000 Bill
            </div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, fontWeight: 900, color: "#38bdf8", marginTop: 2 }}>
              Fee: ₹20 only
            </div>
          </div>

          {/* Tier 3 */}
          <div
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              border: "1.5px solid rgba(234, 179, 8, 0.3)",
              borderRadius: 14,
              padding: "12px 16px",
            }}
          >
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#94a3b8" }}>
              Electronics & Gadgets
            </div>
            <div style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontSize: 20, fontWeight: 950, color: "#ffffff" }}>
              ₹25,000 Bill
            </div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, fontWeight: 900, color: "#facc15", marginTop: 2 }}>
              Fee: ₹100 only
            </div>
          </div>

          {/* Tier 4 */}
          <div
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              border: "1.5px solid rgba(34, 197, 94, 0.3)",
              borderRadius: 14,
              padding: "12px 16px",
            }}
          >
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#94a3b8" }}>
              Jewellery / Two-Wheeler
            </div>
            <div style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontSize: 20, fontWeight: 950, color: "#ffffff" }}>
              ₹75,000+ Bill
            </div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, fontWeight: 900, color: "#4ade80", marginTop: 2 }}>
              Capped: Max ₹300!
            </div>
          </div>
        </div>

        {/* Matrix Note */}
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.04)",
            border: "1px dashed rgba(255, 255, 255, 0.2)",
            borderRadius: 12,
            padding: "8px 14px",
            textAlign: "center",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 13,
            color: "#cbd5e1",
          }}
        >
          Credit card 2-3% leta hai (₹100-₹150), jabki UPI 0.4% (₹20) pe sabse sasta hai!
        </div>
      </div>

      {/* 4. TEASER BANNER (Height: 250px) */}
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
          <span style={{ fontSize: 32 }}>⏸️</span>
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
              PAR YE RULE ABHI DIWALI TAK TAAL DIYA GAYA!
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
              15 October ko implement hona tha, par achanak rollback kyun hua?
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
            👉 Next: Diwali tak postpone hone ki asli wajah
          </span>
          <span style={{ fontSize: 20 }}>🪔</span>
        </div>
      </div>
    </div>
  );
};

