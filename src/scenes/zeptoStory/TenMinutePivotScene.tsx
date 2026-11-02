import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface TenMinutePivotSceneProps {
  durationInFrames: number;
}

export const TenMinutePivotScene: React.FC<TenMinutePivotSceneProps> = () => {
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

  const pipelineSpring = spring({
    frame: frame - 6,
    fps,
    config: { damping: 12, stiffness: 130 },
  });

  const pillarsSpring = spring({
    frame: frame - 12,
    fps,
    config: { damping: 12, stiffness: 130 },
  });

  const quoteSpring = spring({
    frame: frame - 18,
    fps,
    config: { damping: 12, stiffness: 130 },
  });

  // Dynamic rotation for pivot gear
  const gearRotation = (frame / fps) * 60;
  const pulseVortex = Math.sin((frame / fps) * Math.PI * 3) * 0.03 + 1;

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
            background: "linear-gradient(135deg, #10b981 0%, #06b6d4 100%)",
            color: "#ffffff",
            border: "3.5px solid #000000",
            borderRadius: 999,
            padding: "8px 24px",
            boxShadow: "4px 4px 0px #000000",
          }}
        >
          <span style={{ fontSize: 22 }}>🔄</span>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 18,
              fontWeight: 900,
              letterSpacing: 1.5,
              textTransform: "uppercase",
            }}
          >
            THE 2021 MASTER PIVOT
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
            RUKE NAHI: 10-MIN PIVOT ENGINE!
          </div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 20,
              fontWeight: 800,
              color: "#059669",
              marginTop: 6,
              letterSpacing: 0.5,
            }}
          >
            Failure Se Nikal Ke 10-Minute Revolution Khadi Ki ⚡
          </div>
        </div>
      </div>

      {/* 2. 3D PIVOT TRANSFORMATION PIPELINE (Height: 510px) */}
      <div
        style={{
          height: 510,
          transform: `scale(${pipelineSpring})`,
          opacity: pipelineSpring,
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
            ⚙️ The Rebirth Pipeline (2020 ➔ 2021)
          </span>
          <span
            style={{
              backgroundColor: "#dcfce7",
              color: "#15803d",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 14,
              fontWeight: 900,
              padding: "4px 12px",
              borderRadius: 8,
              border: "2px solid #000000",
            }}
          >
            Y-COMBINATOR W21
          </span>
        </div>

        {/* 3D Pivot Transformation Arena */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 14,
          }}
        >
          {/* Old Model Node */}
          <div
            style={{
              flex: 1,
              backgroundColor: "#fef2f2",
              border: "3px solid #ef4444",
              borderRadius: 20,
              padding: "16px 12px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: "50%",
                background: "radial-gradient(circle at 35% 35%, #f87171, #dc2626)",
                border: "2px solid #000000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 28,
                color: "#ffffff",
              }}
            >
              ❌
            </div>
            <div
              style={{
                fontFamily: "'Cabinet Grotesk', sans-serif",
                fontSize: 18,
                fontWeight: 950,
                color: "#991b1b",
                marginTop: 8,
              }}
            >
              KIRANAKART
            </div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                color: "#7f1d1d",
                fontWeight: 700,
                marginTop: 4,
              }}
            >
              Aggregator Model<br />120-Min Delivery<br />Stockouts & Chaos
            </div>
          </div>

          {/* Center 3D Pivot Vortex Gear */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: 110,
            }}
          >
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                background: "conic-gradient(from 0deg, #f59e0b, #10b981, #06b6d4, #f59e0b)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: `rotate(${gearRotation}deg) scale(${pulseVortex})`,
                boxShadow: "0 0 20px rgba(16, 185, 129, 0.5)",
                border: "3px solid #000000",
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  backgroundColor: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 24,
                  transform: `rotate(${-gearRotation}deg)`,
                }}
              >
                🔄
              </div>
            </div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                fontWeight: 900,
                color: "#0f172a",
                backgroundColor: "#fef08a",
                border: "2px solid #000000",
                borderRadius: 6,
                padding: "3px 6px",
                marginTop: 8,
                textAlign: "center",
              }}
            >
              PIVOT
            </div>
          </div>

          {/* New Model Node */}
          <div
            style={{
              flex: 1,
              backgroundColor: "#f0fdf4",
              border: "3px solid #10b981",
              borderRadius: 20,
              padding: "16px 12px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: "50%",
                background: "radial-gradient(circle at 35% 35%, #34d399, #059669)",
                border: "2px solid #000000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 28,
                color: "#ffffff",
              }}
            >
              ⚡
            </div>
            <div
              style={{
                fontFamily: "'Cabinet Grotesk', sans-serif",
                fontSize: 18,
                fontWeight: 950,
                color: "#065f46",
                marginTop: 8,
              }}
            >
              ZEPTO (2021)
            </div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                color: "#047857",
                fontWeight: 700,
                marginTop: 4,
              }}
            >
              Dark Store Model<br />10-Min Delivery<br />100% Tech Control
            </div>
          </div>
        </div>

        {/* Milestone Badge Bar */}
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
            <span style={{ fontSize: 20 }}>📍</span>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 15,
                fontWeight: 700,
                color: "#ffffff",
              }}
            >
              First Dark Store: Bandra West, Mumbai (Mid 2021)
            </span>
          </div>
          <span
            style={{
              backgroundColor: "#38bdf8",
              color: "#0c4a6e",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              fontWeight: 900,
              padding: "4px 8px",
              borderRadius: 6,
            }}
          >
            VIRAL HIT 🚀
          </span>
        </div>
      </div>

      {/* 3. 3 PILLARS OF ZEPTO'S PIVOT (Height: 400px) */}
      <div
        style={{
          height: 400,
          transform: `scale(${pillarsSpring})`,
          opacity: pillarsSpring,
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
            💡 3 Reasons Why The 10-Min Pivot Worked
          </span>
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
            SECRET MOAT
          </span>
        </div>

        {/* Pillar 1 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            border: "2px solid rgba(52, 211, 153, 0.4)",
            borderRadius: 16,
            padding: "12px 16px",
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              backgroundColor: "#10b981",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              flexShrink: 0,
              border: "2px solid #ffffff",
            }}
          >
            🏬
          </div>
          <div>
            <div
              style={{
                fontFamily: "'Cabinet Grotesk', sans-serif",
                fontSize: 19,
                fontWeight: 900,
                color: "#6ee7b7",
              }}
            >
              Apne Dark Stores (Zero Third-Party Dependency)
            </div>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                fontWeight: 600,
                color: "#94a3b8",
              }}
            >
              Har item unke direct control me tha, 99.8% order fulfillment rate!
            </div>
          </div>
        </div>

        {/* Pillar 2 */}
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
            📲
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
              Tablet-Guided 90-Second Picking
            </div>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                fontWeight: 600,
                color: "#94a3b8",
              }}
            >
              Picker ko screen batati hai kis shelf se uthana hai, 90 sec me bag seal!
            </div>
          </div>
        </div>

        {/* Pillar 3 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            border: "2px solid rgba(168, 85, 247, 0.4)",
            borderRadius: 16,
            padding: "12px 16px",
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              backgroundColor: "#a855f7",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              flexShrink: 0,
              border: "2px solid #ffffff",
            }}
          >
            🛵
          </div>
          <div>
            <div
              style={{
                fontFamily: "'Cabinet Grotesk', sans-serif",
                fontSize: 19,
                fontWeight: 900,
                color: "#d8b4fe",
              }}
            >
              1.5 KM Hyperlocal Radius
            </div>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                fontWeight: 600,
                color: "#94a3b8",
              }}
            >
              Rider ko bhagne ki zaroorat nahi, normal drive pe 5 min me doorstep.
            </div>
          </div>
        </div>
      </div>

      {/* 4. FOUNDER SPEED QUOTE (Height: 260px) */}
      <div
        style={{
          height: 260,
          transform: `scale(${quoteSpring})`,
          opacity: quoteSpring,
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
          <span style={{ fontSize: 32 }}>🔥</span>
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
              EXECUTION SPEED OVER EVERYTHING!
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
              Duniya bolti rahi 10 minute delivery impossible hai, in 19-saal ke ladkon ne karke dikha diya!
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
            👉 Next: $2.5 Million se $1.4 Billion ka rocket path!
          </span>
          <span style={{ fontSize: 20 }}>📈</span>
        </div>
      </div>
    </div>
  );
};

