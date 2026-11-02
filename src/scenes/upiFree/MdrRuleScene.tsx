import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface MdrRuleSceneProps {
  durationInFrames: number;
}

export const MdrRuleScene: React.FC<MdrRuleSceneProps> = () => {
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

  const arenaSpring = spring({
    frame: frame - 6,
    fps,
    config: { damping: 12, stiffness: 130 },
  });

  const conditionsSpring = spring({
    frame: frame - 11,
    fps,
    config: { damping: 12, stiffness: 130 },
  });

  const bannerSpring = spring({
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
            backgroundColor: "#ea580c",
            color: "#ffffff",
            border: "3.5px solid #000000",
            borderRadius: 999,
            padding: "8px 24px",
            boxShadow: "4px 4px 0px #000000",
          }}
        >
          <span style={{ fontSize: 22 }}>📑</span>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 18,
              fontWeight: 900,
              letterSpacing: 1.5,
              textTransform: "uppercase",
            }}
          >
            NPCI PROPOSAL: 0.4% MDR
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
            DUKAANDAAR PE LAGEGI 0.4% FEE!
          </div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 20,
              fontWeight: 800,
              color: "#c2410c",
              marginTop: 6,
              letterSpacing: 0.5,
            }}
          >
            Select Merchant Payments (₹2,000 Se Upar) Par New Rule 🏪
          </div>
        </div>
      </div>

      {/* 2. 3D THRESHOLD ARENA (Height: 510px) */}
      <div
        style={{
          height: 510,
          transform: `scale(${arenaSpring})`,
          opacity: arenaSpring,
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
            ⚖️ The ₹2,000 Threshold Cutoff
          </span>
          <span
            style={{
              backgroundColor: "#ffedd5",
              color: "#c2410c",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 14,
              fontWeight: 900,
              padding: "4px 12px",
              borderRadius: 8,
              border: "2px solid #000000",
            }}
          >
            P2M ONLY
          </span>
        </div>

        {/* 2 3D Discs + Threshold Divider */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            gap: 16,
          }}
        >
          {/* Below ₹2,000 */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              transform: `translateY(${floatDisc}px)`,
            }}
          >
            <div
              style={{
                width: 130,
                height: 130,
                borderRadius: "50%",
                background: "radial-gradient(circle at 35% 35%, #86efac, #22c55e 60%, #15803d 100%)",
                border: "4px solid #000000",
                boxShadow: "0 10px 20px rgba(34, 197, 94, 0.4), inset -4px -4px 8px rgba(0,0,0,0.4)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
              }}
            >
              <span style={{ fontSize: 34 }}>☕</span>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 12,
                  fontWeight: 900,
                  marginTop: 2,
                }}
              >
                ₹0 - ₹2,000
              </span>
            </div>

            <div
              style={{
                fontFamily: "'Cabinet Grotesk', sans-serif",
                fontSize: 26,
                fontWeight: 950,
                color: "#15803d",
                marginTop: 10,
              }}
            >
              100% FREE
            </div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 13,
                fontWeight: 800,
                color: "#166534",
                backgroundColor: "#f0fdf4",
                border: "1.5px solid #86efac",
                borderRadius: 6,
                padding: "2px 8px",
                marginTop: 2,
              }}
            >
              Zero Fee For Vendors
            </div>
          </div>

          {/* Center Divider */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              width: 90,
            }}
          >
            <span style={{ fontSize: 28 }}>⚡</span>
            <div
              style={{
                backgroundColor: "#fef08a",
                border: "2px solid #000000",
                borderRadius: 8,
                padding: "4px 8px",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                fontWeight: 900,
                textAlign: "center",
                color: "#854d0e",
              }}
            >
              ₹2,000 CUTOFF
            </div>
          </div>

          {/* Above ₹2,000 */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              transform: `translateY(${-floatDisc}px)`,
            }}
          >
            <div
              style={{
                width: 130,
                height: 130,
                borderRadius: "50%",
                background: "radial-gradient(circle at 35% 35%, #fb923c, #ea580c 60%, #9a3412 100%)",
                border: "4px solid #000000",
                boxShadow: "0 10px 20px rgba(234, 88, 12, 0.4), inset -4px -4px 8px rgba(0,0,0,0.4)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
              }}
            >
              <span style={{ fontSize: 34 }}>🏬</span>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 12,
                  fontWeight: 900,
                  marginTop: 2,
                }}
              >
                ₹2,000+
              </span>
            </div>

            <div
              style={{
                fontFamily: "'Cabinet Grotesk', sans-serif",
                fontSize: 26,
                fontWeight: 950,
                color: "#c2410c",
                marginTop: 10,
              }}
            >
              0.4% MDR
            </div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 13,
                fontWeight: 800,
                color: "#9a3412",
                backgroundColor: "#fff7ed",
                border: "1.5px solid #fed7aa",
                borderRadius: 6,
                padding: "2px 8px",
                marginTop: 2,
              }}
            >
              Select Big Merchants
            </div>
          </div>
        </div>

        {/* Cap Banner */}
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
            <span style={{ fontSize: 20 }}>🔒</span>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 15,
                fontWeight: 700,
                color: "#ffffff",
              }}
            >
              Max Cap Protection: ₹75,000+ ke transactions pe fee ₹300 pe cap hai!
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
            CAPPED
          </span>
        </div>
      </div>

      {/* 3. 3 CRUCIAL CONDITIONS (Height: 400px) */}
      <div
        style={{
          height: 400,
          transform: `scale(${conditionsSpring})`,
          opacity: conditionsSpring,
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
            📌 Who Pays & Who Is 100% Free?
          </span>
          <span
            style={{
              backgroundColor: "#fef08a",
              color: "#854d0e",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 13,
              fontWeight: 900,
              padding: "4px 10px",
              borderRadius: 6,
            }}
          >
            CRITICAL RULES
          </span>
        </div>

        {/* Condition 1 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            border: "2px solid rgba(34, 197, 94, 0.4)",
            borderRadius: 16,
            padding: "10px 16px",
          }}
        >
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: "50%",
              backgroundColor: "#22c55e",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              color: "#052e16",
              fontWeight: 900,
              flexShrink: 0,
            }}
          >
            👤
          </div>
          <div>
            <div
              style={{
                fontFamily: "'Cabinet Grotesk', sans-serif",
                fontSize: 18,
                fontWeight: 900,
                color: "#86efac",
              }}
            >
              Normal Users (Aap): ₹0 Extra Charge!
            </div>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                fontWeight: 600,
                color: "#94a3b8",
              }}
            >
              Customer ko ₹1 bhi extra nahi dena. Aapke bank se exact bill katega.
            </div>
          </div>
        </div>

        {/* Condition 2 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            border: "2px solid rgba(249, 115, 22, 0.4)",
            borderRadius: 16,
            padding: "10px 16px",
          }}
        >
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: "50%",
              backgroundColor: "#f97316",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              color: "#ffffff",
              fontWeight: 900,
              flexShrink: 0,
            }}
          >
            🏪
          </div>
          <div>
            <div
              style={{
                fontFamily: "'Cabinet Grotesk', sans-serif",
                fontSize: 18,
                fontWeight: 900,
                color: "#fdba74",
              }}
            >
              Dukaandar Se Katega (Merchant Settlement)
            </div>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                fontWeight: 600,
                color: "#94a3b8",
              }}
            >
              Bank dukaandar ke settlement me se 0.4% deduct karke baaki paisa bhejega.
            </div>
          </div>
        </div>

        {/* Condition 3 */}
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
            🔄
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
              P2P Transfer (Dost / Family) 100% Free
            </div>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                fontWeight: 600,
                color: "#94a3b8",
              }}
            >
              Phone number ya UPI ID se paise bhejne par koi fee nahi lagegi.
            </div>
          </div>
        </div>
      </div>

      {/* 4. MATH TEASER BANNER (Height: 250px) */}
      <div
        style={{
          height: 250,
          transform: `scale(${bannerSpring})`,
          opacity: bannerSpring,
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
          <span style={{ fontSize: 32 }}>🧮</span>
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
              MATLAB ₹5,000 PE KITNA FEE KATEGA?
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
              Dekho exact calculation: ₹5,000 ke bill pe dukaandar ko kitna milega!
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
            👉 Next: ₹5,000 pe ₹20 ka live breakdown
          </span>
          <span style={{ fontSize: 20 }}>💸</span>
        </div>
      </div>
    </div>
  );
};

