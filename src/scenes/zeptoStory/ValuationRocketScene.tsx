import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface ValuationRocketSceneProps {
  durationInFrames: number;
}

export const ValuationRocketScene: React.FC<ValuationRocketSceneProps> = () => {
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

  const rocketSpring = spring({
    frame: frame - 6,
    fps,
    config: { damping: 12, stiffness: 130 },
  });

  const timelineSpring = spring({
    frame: frame - 11,
    fps,
    config: { damping: 12, stiffness: 130 },
  });

  const speedMetricSpring = spring({
    frame: frame - 16,
    fps,
    config: { damping: 12, stiffness: 130 },
  });

  // Dynamic floating orbs
  const floatOrb = Math.sin((frame / fps) * Math.PI * 2) * 5;

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
            backgroundColor: "#a855f7",
            color: "#ffffff",
            border: "3.5px solid #000000",
            borderRadius: 999,
            padding: "8px 24px",
            boxShadow: "4px 4px 0px #000000",
          }}
        >
          <span style={{ fontSize: 22 }}>📈</span>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 18,
              fontWeight: 900,
              letterSpacing: 1.5,
              textTransform: "uppercase",
            }}
          >
            THE 560X VALUATION EXPLOSION
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
            $2.5 MILLION SE $1.4 BILLION!
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
            Jan 2021 ➔ Aug 2023: Sirf 31 Mahino Me Unicorn 🦄
          </div>
        </div>
      </div>

      {/* 2. 3D DUAL VALUATION ARENA (Height: 520px) */}
      <div
        style={{
          height: 520,
          transform: `scale(${rocketSpring})`,
          opacity: rocketSpring,
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
            🚀 Hypergrowth Comparison
          </span>
          <span
            style={{
              backgroundColor: "#fef08a",
              color: "#854d0e",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 14,
              fontWeight: 900,
              padding: "4px 12px",
              borderRadius: 8,
              border: "2px solid #000000",
            }}
          >
            560X MULTIPLIER
          </span>
        </div>

        {/* 3D Valuation Stages */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            gap: 16,
          }}
        >
          {/* Jan 2021 Stage */}
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
                width: 130,
                height: 130,
                borderRadius: "50%",
                background: "radial-gradient(circle at 35% 35%, #93c5fd, #3b82f6 60%, #1e40af 100%)",
                border: "4px solid #000000",
                boxShadow: "0 10px 20px rgba(59, 130, 246, 0.4), inset -4px -4px 8px rgba(0,0,0,0.4)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
              }}
            >
              <span style={{ fontSize: 32 }}>🌱</span>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 12,
                  fontWeight: 900,
                  marginTop: 2,
                }}
              >
                SEED
              </span>
            </div>

            <div
              style={{
                fontFamily: "'Cabinet Grotesk', sans-serif",
                fontSize: 28,
                fontWeight: 950,
                color: "#1e40af",
                marginTop: 10,
              }}
            >
              $2.5 Million
            </div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 13,
                fontWeight: 800,
                color: "#475569",
                backgroundColor: "#f1f5f9",
                border: "1.5px solid #cbd5e1",
                borderRadius: 6,
                padding: "3px 10px",
                marginTop: 4,
              }}
            >
              Jan 2021 (Y Combinator)
            </div>
          </div>

          {/* Growth Rocket Arc */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              width: 100,
            }}
          >
            <span style={{ fontSize: 36 }}>🚀</span>
            <div
              style={{
                backgroundColor: "#22c55e",
                color: "#052e16",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 13,
                fontWeight: 900,
                padding: "4px 8px",
                borderRadius: 6,
                border: "2px solid #000000",
                textAlign: "center",
              }}
            >
              +56,000%
            </div>
          </div>

          {/* Aug 2023 Stage */}
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
                width: 140,
                height: 140,
                borderRadius: "50%",
                background: "radial-gradient(circle at 35% 35%, #d8b4fe, #a855f7 60%, #6b21a8 100%)",
                border: "4px solid #000000",
                boxShadow: "0 12px 24px rgba(168, 85, 247, 0.45), inset -4px -4px 8px rgba(0,0,0,0.4)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
              }}
            >
              <span style={{ fontSize: 36 }}>🦄</span>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 12,
                  fontWeight: 900,
                  color: "#fef08a",
                  marginTop: 2,
                }}
              >
                UNICORN
              </span>
            </div>

            <div
              style={{
                fontFamily: "'Cabinet Grotesk', sans-serif",
                fontSize: 30,
                fontWeight: 950,
                color: "#6b21a8",
                marginTop: 10,
              }}
            >
              $1.4 Billion
            </div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 13,
                fontWeight: 800,
                color: "#7e22ce",
                backgroundColor: "#f5f3ff",
                border: "1.5px solid #d8b4fe",
                borderRadius: 6,
                padding: "3px 10px",
                marginTop: 4,
              }}
            >
              Aug 2023 (Series E: $200M)
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
            <span style={{ fontSize: 20 }}>💰</span>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 15,
                fontWeight: 700,
                color: "#ffffff",
              }}
            >
              Lead Investors: StepStone Group & Goodwater Capital
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
            CONFIRMED
          </span>
        </div>
      </div>

      {/* 3. 4 CHRONOLOGICAL MILESTONE NODES (Height: 400px) */}
      <div
        style={{
          height: 400,
          transform: `scale(${timelineSpring})`,
          opacity: timelineSpring,
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
            📊 Valuation Milestone Timeline
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
            4 FUNDING ROUNDS
          </span>
        </div>

        {/* 4 Connected Nodes Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 12,
          }}
        >
          {/* Node 1 */}
          <div
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              border: "1.5px solid rgba(255, 255, 255, 0.15)",
              borderRadius: 14,
              padding: "12px 14px",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: "50%",
                backgroundColor: "#3b82f6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
                color: "#ffffff",
                fontWeight: 900,
                flexShrink: 0,
              }}
            >
              1
            </div>
            <div>
              <div
                style={{
                  fontFamily: "'Cabinet Grotesk', sans-serif",
                  fontSize: 18,
                  fontWeight: 900,
                  color: "#93c5fd",
                }}
              >
                Jan 2021: $2.5M
              </div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 12,
                  color: "#cbd5e1",
                }}
              >
                YC Seed Round
              </div>
            </div>
          </div>

          {/* Node 2 */}
          <div
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              border: "1.5px solid rgba(255, 255, 255, 0.15)",
              borderRadius: 14,
              padding: "12px 14px",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: "50%",
                backgroundColor: "#06b6d4",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
                color: "#ffffff",
                fontWeight: 900,
                flexShrink: 0,
              }}
            >
              2
            </div>
            <div>
              <div
                style={{
                  fontFamily: "'Cabinet Grotesk', sans-serif",
                  fontSize: 18,
                  fontWeight: 900,
                  color: "#67e8f9",
                }}
              >
                Nov 2021: $225M
              </div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 12,
                  color: "#cbd5e1",
                }}
              >
                Series B (Glade Brook)
              </div>
            </div>
          </div>

          {/* Node 3 */}
          <div
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              border: "1.5px solid rgba(255, 255, 255, 0.15)",
              borderRadius: 14,
              padding: "12px 14px",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: "50%",
                backgroundColor: "#eab308",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
                color: "#ffffff",
                fontWeight: 900,
                flexShrink: 0,
              }}
            >
              3
            </div>
            <div>
              <div
                style={{
                  fontFamily: "'Cabinet Grotesk', sans-serif",
                  fontSize: 18,
                  fontWeight: 900,
                  color: "#fde047",
                }}
              >
                May 2022: $900M
              </div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 12,
                  color: "#cbd5e1",
                }}
              >
                Soonicorn Stage
              </div>
            </div>
          </div>

          {/* Node 4 */}
          <div
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.08)",
              border: "1.5px solid rgba(168, 85, 247, 0.5)",
              borderRadius: 14,
              padding: "12px 14px",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: "50%",
                backgroundColor: "#a855f7",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
                color: "#ffffff",
                fontWeight: 900,
                flexShrink: 0,
              }}
            >
              4
            </div>
            <div>
              <div
                style={{
                  fontFamily: "'Cabinet Grotesk', sans-serif",
                  fontSize: 18,
                  fontWeight: 900,
                  color: "#d8b4fe",
                }}
              >
                Aug 2023: $1.4B
              </div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 12,
                  color: "#fef08a",
                }}
              >
                Official Unicorn 🦄
              </div>
            </div>
          </div>
        </div>

        {/* Speed note */}
        <div
          style={{
            backgroundColor: "rgba(56, 189, 248, 0.12)",
            border: "1.5px solid rgba(56, 189, 248, 0.3)",
            borderRadius: 12,
            padding: "10px 14px",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span style={{ fontSize: 18 }}>⚡</span>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              fontWeight: 600,
              color: "#cbd5e1",
            }}
          >
            Total time taken: 2.5 saal (Zomato ko 10 saal lage the, Swiggy ko 4 saal).
          </span>
        </div>
      </div>

      {/* 4. SPEED COMPARISON INSIGHT (Height: 250px) */}
      <div
        style={{
          height: 250,
          transform: `scale(${speedMetricSpring})`,
          opacity: speedMetricSpring,
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
          <span style={{ fontSize: 32 }}>⚠️</span>
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
              PAR STORY ME EK BADA TWIST HAI!
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
              Unicorn banna ek baat hai, public stock market me tikna doosri!
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
            👉 Next: Zepto ne apna IPO aage kyun badha diya?
          </span>
          <span style={{ fontSize: 20 }}>⏸️</span>
        </div>
      </div>
    </div>
  );
};

