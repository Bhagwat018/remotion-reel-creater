import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface IpoPostponedSceneProps {
  durationInFrames: number;
}

export const IpoPostponedScene: React.FC<IpoPostponedSceneProps> = () => {
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

  const gateSpring = spring({
    frame: frame - 6,
    fps,
    config: { damping: 12, stiffness: 130 },
  });

  const reasonsSpring = spring({
    frame: frame - 11,
    fps,
    config: { damping: 12, stiffness: 130 },
  });

  const lessonSpring = spring({
    frame: frame - 16,
    fps,
    config: { damping: 12, stiffness: 130 },
  });

  const floatOrb = Math.sin((frame / fps) * Math.PI * 2) * 4;

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
            backgroundColor: "#f59e0b",
            color: "#451a03",
            border: "3.5px solid #000000",
            borderRadius: 999,
            padding: "8px 24px",
            boxShadow: "4px 4px 0px #000000",
          }}
        >
          <span style={{ fontSize: 22 }}>⚠️</span>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 18,
              fontWeight: 900,
              letterSpacing: 1.5,
              textTransform: "uppercase",
            }}
          >
            THE TWIST & REALITY CHECK
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
            ZEPTO KA IPO TAL GAYA: KYUN?
          </div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 20,
              fontWeight: 800,
              color: "#d97706",
              marginTop: 6,
              letterSpacing: 0.5,
            }}
          >
            Unicorn Banna Ek Baat Hai, Public Market Me Tikna Doosri!
          </div>
        </div>
      </div>

      {/* 2. 3D PUBLIC MARKET REALITY ARENA (Height: 500px) */}
      <div
        style={{
          height: 500,
          transform: `scale(${gateSpring})`,
          opacity: gateSpring,
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
            🏛️ Private Hype vs Public Scrutiny
          </span>
          <span
            style={{
              backgroundColor: "#fee2e2",
              color: "#991b1b",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 14,
              fontWeight: 900,
              padding: "4px 12px",
              borderRadius: 8,
              border: "2px solid #000000",
            }}
          >
            POSTPONED ⏸️
          </span>
        </div>

        {/* 2 Circular Contrasting Dials */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            gap: 16,
          }}
        >
          {/* Dial 1: Private Market */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              transform: `translateY(${floatOrb}px)`,
            }}
          >
            <div
              style={{
                width: 125,
                height: 125,
                borderRadius: "50%",
                background: "radial-gradient(circle at 35% 35%, #a78bfa, #7c3aed 60%, #4c1d95 100%)",
                border: "4px solid #000000",
                boxShadow: "0 10px 20px rgba(124, 58, 237, 0.4), inset -4px -4px 8px rgba(0,0,0,0.4)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
              }}
            >
              <span style={{ fontSize: 32 }}>🦄</span>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 12,
                  fontWeight: 900,
                  marginTop: 2,
                }}
              >
                PRIVATE
              </span>
            </div>

            <div
              style={{
                fontFamily: "'Cabinet Grotesk', sans-serif",
                fontSize: 24,
                fontWeight: 950,
                color: "#7c3aed",
                marginTop: 10,
              }}
            >
              $5.0 Billion
            </div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 13,
                fontWeight: 800,
                color: "#6b21a8",
                backgroundColor: "#f5f3ff",
                border: "1.5px solid #d8b4fe",
                borderRadius: 6,
                padding: "3px 10px",
                marginTop: 4,
              }}
            >
              VC Funds Keep Pouring In
            </div>
          </div>

          {/* Center Pause Gate */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              width: 110,
            }}
          >
            <div
              style={{
                backgroundColor: "#fef08a",
                border: "3px solid #000000",
                borderRadius: 14,
                padding: "8px",
                textAlign: "center",
                boxShadow: "3px 3px 0px #000000",
              }}
            >
              <span style={{ fontSize: 28 }}>⏸️</span>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  fontWeight: 900,
                  color: "#854d0e",
                }}
              >
                DELAYED
              </div>
            </div>
          </div>

          {/* Dial 2: Public Market Test */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              transform: `translateY(${-floatOrb}px)`,
            }}
          >
            <div
              style={{
                width: 125,
                height: 125,
                borderRadius: "50%",
                background: "radial-gradient(circle at 35% 35%, #fca5a5, #ef4444 60%, #991b1b 100%)",
                border: "4px solid #000000",
                boxShadow: "0 10px 20px rgba(239, 68, 68, 0.4), inset -4px -4px 8px rgba(0,0,0,0.4)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
              }}
            >
              <span style={{ fontSize: 32 }}>🏛️</span>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 12,
                  fontWeight: 900,
                  marginTop: 2,
                }}
              >
                PUBLIC
              </span>
            </div>

            <div
              style={{
                fontFamily: "'Cabinet Grotesk', sans-serif",
                fontSize: 24,
                fontWeight: 950,
                color: "#dc2626",
                marginTop: 10,
              }}
            >
              EBITDA Test
            </div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 13,
                fontWeight: 800,
                color: "#991b1b",
                backgroundColor: "#fef2f2",
                border: "1.5px solid #fecaca",
                borderRadius: 6,
                padding: "3px 10px",
                marginTop: 4,
              }}
            >
              Must Show Real Profit
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
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
            <span style={{ fontSize: 20 }}>📌</span>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 15,
                fontWeight: 700,
                color: "#ffffff",
              }}
            >
              HQ Shifted To India • IPO Timeline Now Expected: 2026-2027
            </span>
          </div>
          <span
            style={{
              backgroundColor: "#f59e0b",
              color: "#000000",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              fontWeight: 900,
              padding: "4px 8px",
              borderRadius: 6,
            }}
          >
            SMART STRATEGY
          </span>
        </div>
      </div>

      {/* 3. 3 REASONS WHY IPO WAS POSTPONED (Height: 410px) */}
      <div
        style={{
          height: 410,
          transform: `scale(${reasonsSpring})`,
          opacity: reasonsSpring,
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
            🔍 3 Reasons Zepto Delayed Its IPO
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
            MARKET REALITY
          </span>
        </div>

        {/* Reason 1 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            border: "2px solid rgba(239, 68, 68, 0.4)",
            borderRadius: 16,
            padding: "12px 16px",
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              backgroundColor: "#ef4444",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              flexShrink: 0,
              border: "2px solid #ffffff",
            }}
          >
            ⚔️
          </div>
          <div>
            <div
              style={{
                fontFamily: "'Cabinet Grotesk', sans-serif",
                fontSize: 19,
                fontWeight: 900,
                color: "#fca5a5",
              }}
            >
              Fierce Quick Commerce Price War
            </div>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                fontWeight: 600,
                color: "#94a3b8",
              }}
            >
              Blinkit aur Swiggy Instamart ke saath discount & dark store kholne ki jung.
            </div>
          </div>
        </div>

        {/* Reason 2 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            border: "2px solid rgba(245, 158, 11, 0.4)",
            borderRadius: 16,
            padding: "12px 16px",
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              backgroundColor: "#f59e0b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              flexShrink: 0,
              border: "2px solid #ffffff",
            }}
          >
            💸
          </div>
          <div>
            <div
              style={{
                fontFamily: "'Cabinet Grotesk', sans-serif",
                fontSize: 19,
                fontWeight: 900,
                color: "#fde68a",
              }}
            >
              Dark Store Expansion Me High Cash Burn
            </div>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                fontWeight: 600,
                color: "#94a3b8",
              }}
            >
              Tier 2 aur nayi cities me 100+ dark stores kholne me heavy capital lagta hai.
            </div>
          </div>
        </div>

        {/* Reason 3 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            border: "2px solid rgba(56, 189, 248, 0.4)",
            borderRadius: 16,
            padding: "12px 16px",
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              backgroundColor: "#0ea5e9",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              flexShrink: 0,
              border: "2px solid #ffffff",
            }}
          >
            🏛️
          </div>
          <div>
            <div
              style={{
                fontFamily: "'Cabinet Grotesk', sans-serif",
                fontSize: 19,
                fontWeight: 900,
                color: "#7dd3fc",
              }}
            >
              Indian Retail Investors Demand Profit
            </div>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                fontWeight: 600,
                color: "#94a3b8",
              }}
            >
              Stock market me listing se pehle positive EBITDA dikhana zaroori hai!
            </div>
          </div>
        </div>
      </div>

      {/* 4. THE LESSON FOR FOUNDERS (Height: 260px) */}
      <div
        style={{
          height: 260,
          transform: `scale(${lessonSpring})`,
          opacity: lessonSpring,
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
              THE GOLDEN PRO TIP FOR EVERY GEN-Z!
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
              Agar KiranaKart fail nahi hota, toh Zepto kabhi nahi banta!
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
            👉 Next: Fail hona end nahi, seekhne ka data hai
          </span>
          <span style={{ fontSize: 20 }}>🧠</span>
        </div>
      </div>
    </div>
  );
};

