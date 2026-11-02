import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface FailureIsDataSceneProps {
  durationInFrames: number;
}

export const FailureIsDataScene: React.FC<FailureIsDataSceneProps> = () => {
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

  const reframeSpring = spring({
    frame: frame - 6,
    fps,
    config: { damping: 12, stiffness: 130 },
  });

  const rulesSpring = spring({
    frame: frame - 11,
    fps,
    config: { damping: 12, stiffness: 130 },
  });

  const quoteSpring = spring({
    frame: frame - 16,
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
            backgroundColor: "#22c55e",
            color: "#052e16",
            border: "3.5px solid #000000",
            borderRadius: 999,
            padding: "8px 24px",
            boxShadow: "4px 4px 0px #000000",
          }}
        >
          <span style={{ fontSize: 22 }}>💡</span>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 18,
              fontWeight: 900,
              letterSpacing: 1.5,
              textTransform: "uppercase",
            }}
          >
            FOUNDER MINDSET PRO TIP
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
            FAIL HONA END NAHI, DATA HAI!
          </div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 20,
              fontWeight: 800,
              color: "#15803d",
              marginTop: 6,
              letterSpacing: 0.5,
            }}
          >
            Pehle Attempt Se Seekho, Phir 10x Agility Se Pivot Karo 🧠
          </div>
        </div>
      </div>

      {/* 2. 3D RE-FRAME MATRIX (Height: 510px) */}
      <div
        style={{
          height: 510,
          transform: `scale(${reframeSpring})`,
          opacity: reframeSpring,
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
            🔄 The Mental Re-Frame Engine
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
            MINDSET SHIFT
          </span>
        </div>

        {/* Row 1 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            backgroundColor: "#f8fafc",
            border: "2px solid #e2e8f0",
            borderRadius: 16,
            padding: "12px 16px",
          }}
        >
          <div
            style={{
              backgroundColor: "#fee2e2",
              color: "#991b1b",
              borderRadius: 8,
              padding: "4px 8px",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              fontWeight: 900,
              flexShrink: 0,
            }}
          >
            MYTH ❌
          </div>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                fontWeight: 600,
                color: "#64748b",
                textDecoration: "line-through",
              }}
            >
              "Mera startup fail ho gaya, meri sari mehnat bekar gayi."
            </div>
            <div
              style={{
                fontFamily: "'Cabinet Grotesk', sans-serif",
                fontSize: 17,
                fontWeight: 900,
                color: "#15803d",
                marginTop: 2,
              }}
            >
              ➔ "Mujhe customer behavior aur supply chain ka priceless live data mila!"
            </div>
          </div>
        </div>

        {/* Row 2 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            backgroundColor: "#f8fafc",
            border: "2px solid #e2e8f0",
            borderRadius: 16,
            padding: "12px 16px",
          }}
        >
          <div
            style={{
              backgroundColor: "#fee2e2",
              color: "#991b1b",
              borderRadius: 8,
              padding: "4px 8px",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              fontWeight: 900,
              flexShrink: 0,
            }}
          >
            MYTH ❌
          </div>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                fontWeight: 600,
                color: "#64748b",
                textDecoration: "line-through",
              }}
            >
              "Duniya aur relatives mujhe failure bolenge."
            </div>
            <div
              style={{
                fontFamily: "'Cabinet Grotesk', sans-serif",
                fontSize: 17,
                fontWeight: 900,
                color: "#15803d",
                marginTop: 2,
              }}
            >
              ➔ "Investors unhi founders ko fund karte hain jo gir kar sambhalna jaante hain!"
            </div>
          </div>
        </div>

        {/* Row 3 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            backgroundColor: "#f8fafc",
            border: "2px solid #e2e8f0",
            borderRadius: 16,
            padding: "12px 16px",
          }}
        >
          <div
            style={{
              backgroundColor: "#fee2e2",
              color: "#991b1b",
              borderRadius: 8,
              padding: "4px 8px",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              fontWeight: 900,
              flexShrink: 0,
            }}
          >
            MYTH ❌
          </div>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                fontWeight: 600,
                color: "#64748b",
                textDecoration: "line-through",
              }}
            >
              "Main dubara risk nahi le sakta."
            </div>
            <div
              style={{
                fontFamily: "'Cabinet Grotesk', sans-serif",
                fontSize: 17,
                fontWeight: 900,
                color: "#15803d",
                marginTop: 2,
              }}
            >
              ➔ "Second attempt me zero se shuru nahi karte, experience se karte ho!"
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
            <span style={{ fontSize: 20 }}>🎯</span>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 15,
                fontWeight: 700,
                color: "#ffffff",
              }}
            >
              Aadit & Kaivalya ने KiranaKart के डेटा से ही Zepto का नक्शा खींचा था!
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
            FACT ✅
          </span>
        </div>
      </div>

      {/* 3. 3 GOLDEN RULES FOR BUILDERS (Height: 390px) */}
      <div
        style={{
          height: 390,
          transform: `scale(${rulesSpring})`,
          opacity: rulesSpring,
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
            🏆 3 Founder Superpowers
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
            SAVE THIS
          </span>
        </div>

        {/* Rule 1 */}
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
            1
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
              Pivot Fast Without Ego
            </div>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                fontWeight: 600,
                color: "#94a3b8",
              }}
            >
              Agar idea kaam nahi kar raha, toh usse zidd mat banao, pivot karo.
            </div>
          </div>
        </div>

        {/* Rule 2 */}
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
              backgroundColor: "#38bdf8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              color: "#082f49",
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
                color: "#7dd3fc",
              }}
            >
              Customer Friction Is Opportunity
            </div>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                fontWeight: 600,
                color: "#94a3b8",
              }}
            >
              Customer ko 2 ghante wait karna bura laga, wahi 10-minute delivery ka seed tha!
            </div>
          </div>
        </div>

        {/* Rule 3 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            border: "2px solid rgba(168, 85, 247, 0.4)",
            borderRadius: 16,
            padding: "10px 16px",
          }}
        >
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: "50%",
              backgroundColor: "#a855f7",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
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
                color: "#d8b4fe",
              }}
            >
              Speed Beats Perfection
            </div>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                fontWeight: 600,
                color: "#94a3b8",
              }}
            >
              Execution speed and obsession is the only real competitive moat.
            </div>
          </div>
        </div>
      </div>

      {/* 4. TAKEAWAY GOLDEN QUOTE (Height: 270px) */}
      <div
        style={{
          height: 270,
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
          <span style={{ fontSize: 32 }}>💬</span>
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
              AB AAPKI BAARI: KYA SEEKHA?
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
              Aapki life ki sabse badi failure ne aapko kya sikhaya?
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
            👉 Comments me apni story share karo!
          </span>
          <span style={{ fontSize: 20 }}>👇</span>
        </div>
      </div>
    </div>
  );
};

