import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface UpiCtaSceneProps {
  durationInFrames: number;
}

export const UpiCtaScene: React.FC<UpiCtaSceneProps> = () => {
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

  const recapSpring = spring({
    frame: frame - 6,
    fps,
    config: { damping: 12, stiffness: 130 },
  });

  const creatorSpring = spring({
    frame: frame - 11,
    fps,
    config: { damping: 12, stiffness: 130 },
  });

  const shareSpring = spring({
    frame: frame - 16,
    fps,
    config: { damping: 12, stiffness: 130 },
  });

  const disclaimerSpring = spring({
    frame: frame - 20,
    fps,
    config: { damping: 12, stiffness: 130 },
  });

  const pulse = Math.sin((frame / fps) * Math.PI * 4) * 0.03 + 1;

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
            background: "linear-gradient(135deg, #0284c7 0%, #059669 100%)",
            color: "#ffffff",
            border: "3.5px solid #000000",
            borderRadius: 999,
            padding: "8px 24px",
            boxShadow: "4px 4px 0px #000000",
          }}
        >
          <span style={{ fontSize: 22 }}>⚡</span>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 18,
              fontWeight: 900,
              letterSpacing: 1.5,
              textTransform: "uppercase",
            }}
          >
            SMART MONEY SUMMARY
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
              fontSize: 48,
              fontWeight: 950,
              color: "#0f172a",
              lineHeight: 1.1,
              letterSpacing: -1,
            }}
          >
            AGLI BAAR SCAN KARO TOH YAAD RAKHNA!
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
            UPI Free Hai, Par Peche Ki Economics Samajhna Zaroori Hai 💡
          </div>
        </div>
      </div>

      {/* 2. 3 KEY UPI TRUTHS RECAP CARD (Height: 420px) */}
      <div
        style={{
          height: 420,
          transform: `scale(${recapSpring})`,
          opacity: recapSpring,
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
            📌 3 Golden UPI Realities
          </span>
          <span
            style={{
              backgroundColor: "#dcfce7",
              color: "#166534",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 14,
              fontWeight: 900,
              padding: "4px 12px",
              borderRadius: 8,
              border: "2px solid #000000",
            }}
          >
            MUST REMEMBER
          </span>
        </div>

        {/* 3 Reality rows */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              backgroundColor: "#f0fdf4",
              border: "2px solid #86efac",
              borderRadius: 14,
              padding: "10px 16px",
            }}
          >
            <span style={{ fontSize: 24 }}>1️⃣</span>
            <div>
              <div
                style={{
                  fontFamily: "'Cabinet Grotesk', sans-serif",
                  fontSize: 18,
                  fontWeight: 900,
                  color: "#15803d",
                }}
              >
                Customer Ke Liye UPI Hamesha ₹0 Rahega
              </div>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#166534",
                }}
              >
                Aapko koi bhi extra surcharge ya transaction fee nahi deni hai.
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              backgroundColor: "#eff6ff",
              border: "2px solid #93c5fd",
              borderRadius: 14,
              padding: "10px 16px",
            }}
          >
            <span style={{ fontSize: 24 }}>2️⃣</span>
            <div>
              <div
                style={{
                  fontFamily: "'Cabinet Grotesk', sans-serif",
                  fontSize: 18,
                  fontWeight: 900,
                  color: "#1d4ed8",
                }}
              >
                ₹2,000+ Par 0.4% MDR Dukaandar Se Lagega
              </div>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#1e40af",
                }}
              >
                Ye fee banks aur NPCI ki cost nikalne ke liye hai, customer se nahi.
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              backgroundColor: "#fff7ed",
              border: "2px solid #fed7aa",
              borderRadius: 14,
              padding: "10px 16px",
            }}
          >
            <span style={{ fontSize: 24 }}>3️⃣</span>
            <div>
              <div
                style={{
                  fontFamily: "'Cabinet Grotesk', sans-serif",
                  fontSize: 18,
                  fontWeight: 900,
                  color: "#c2410c",
                }}
              >
                Diwali Ke Baad Nayi Date Aayegi
              </div>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#9a3412",
                }}
              >
                Government ne abhi plan hold par rakha hai taaki festive sales affect na ho.
              </div>
            </div>
          </div>
        </div>

        {/* Bottom note */}
        <div
          style={{
            backgroundColor: "#f8fafc",
            border: "2px solid #cbd5e1",
            borderRadius: 12,
            padding: "8px 14px",
            textAlign: "center",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 13,
            fontWeight: 800,
            color: "#334155",
          }}
        >
          Daily real finance & tech updates ke liye follow karein!
        </div>
      </div>

      {/* 3. CREATOR PROFILE & GLOWING FOLLOW CTA (Height: 380px) */}
      <div
        style={{
          height: 380,
          transform: `scale(${creatorSpring})`,
          opacity: creatorSpring,
          backgroundColor: "#090d16",
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
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #0284c7, #059669)",
                border: "3px solid #ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 32,
                boxShadow: "0 0 15px rgba(2, 132, 199, 0.5)",
              }}
            >
              💳
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span
                  style={{
                    fontFamily: "'Cabinet Grotesk', sans-serif",
                    fontSize: 28,
                    fontWeight: 950,
                    color: "#ffffff",
                    letterSpacing: -0.5,
                  }}
                >
                  @techwith.GenZ
                </span>
                <span style={{ fontSize: 22, color: "#38bdf8" }}>✓</span>
              </div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#94a3b8",
                  marginTop: 2,
                }}
              >
                DAILY TECH, MONEY & FINTECH TRUTHS
              </div>
            </div>
          </div>

          <div
            style={{
              backgroundColor: "#22c55e",
              color: "#052e16",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 13,
              fontWeight: 900,
              padding: "6px 12px",
              borderRadius: 8,
              border: "2px solid #ffffff",
            }}
          >
            ACTIVE NOW 🟢
          </div>
        </div>

        {/* 3 Pillars */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 10,
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              border: "1.5px solid rgba(255, 255, 255, 0.12)",
              borderRadius: 12,
              padding: "10px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 16 }}>⏱️ 40-Sec</div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                color: "#cbd5e1",
                fontWeight: 700,
                marginTop: 2,
              }}
            >
              Fast Insights
            </div>
          </div>
          <div
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              border: "1.5px solid rgba(255, 255, 255, 0.12)",
              borderRadius: 12,
              padding: "10px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 16 }}>📊 Real Data</div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                color: "#cbd5e1",
                fontWeight: 700,
                marginTop: 2,
              }}
            >
              Zero Gas
            </div>
          </div>
          <div
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              border: "1.5px solid rgba(255, 255, 255, 0.12)",
              borderRadius: 12,
              padding: "10px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 16 }}>🧠 Smart GenZ</div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                color: "#cbd5e1",
                fontWeight: 700,
                marginTop: 2,
              }}
            >
              Money Mindset
            </div>
          </div>
        </div>

        {/* Big Follow Button */}
        <div
          style={{
            transform: `scale(${pulse})`,
            background: "linear-gradient(135deg, #0284c7 0%, #059669 100%)",
            color: "#ffffff",
            border: "3.5px solid #ffffff",
            borderRadius: 16,
            padding: "16px",
            textAlign: "center",
            fontFamily: "'Cabinet Grotesk', sans-serif",
            fontSize: 24,
            fontWeight: 950,
            letterSpacing: 1,
            boxShadow: "0 6px 20px rgba(2, 132, 199, 0.5)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
          }}
        >
          <span>FOLLOW @TECHWITH.GENZ</span>
          <span style={{ fontSize: 26 }}>👉</span>
        </div>
      </div>

      {/* 4. SHARE WITH FRIENDS BANNER (Height: 240px) */}
      <div
        style={{
          height: 240,
          transform: `scale(${shareSpring})`,
          opacity: shareSpring,
          backgroundColor: "#fef08a",
          border: "4px solid #000000",
          borderRadius: 24,
          boxShadow: "8px 8px 0px #000000",
          padding: "18px 24px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ fontSize: 32 }}>📲</span>
          <div>
            <div
              style={{
                fontFamily: "'Cabinet Grotesk', sans-serif",
                fontSize: 22,
                fontWeight: 950,
                color: "#0f172a",
                lineHeight: 1.2,
              }}
            >
              US DOST KO SHARE KARO JO HAR CHEEZ UPI SE KARTA HAI!
            </div>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 15,
                fontWeight: 700,
                color: "#713f12",
                marginTop: 2,
              }}
            >
              Usse bhi pata chalne do ki UPI free kaise chalta hai aur naya MDR rule kya hai.
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          <div
            style={{
              flex: 1,
              backgroundColor: "#ffffff",
              border: "2.5px solid #000000",
              borderRadius: 12,
              padding: "12px",
              textAlign: "center",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 15,
              fontWeight: 900,
              color: "#0f172a",
              boxShadow: "3px 3px 0px #000000",
            }}
          >
            ↗ SHARE TO STORIES
          </div>
          <div
            style={{
              flex: 1,
              backgroundColor: "#ffffff",
              border: "2.5px solid #000000",
              borderRadius: 12,
              padding: "12px",
              textAlign: "center",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 15,
              fontWeight: 900,
              color: "#0f172a",
              boxShadow: "3px 3px 0px #000000",
            }}
          >
            📌 SAVE FOR LATER
          </div>
        </div>
      </div>

      {/* 5. DISCLAIMER STRIP (Height: 130px) */}
      <div
        style={{
          height: 130,
          transform: `scale(${disclaimerSpring})`,
          opacity: disclaimerSpring,
          backgroundColor: "#f1f5f9",
          border: "2.5px dashed #64748b",
          borderRadius: 18,
          padding: "14px 20px",
          display: "flex",
          alignItems: "center",
          gap: 16,
          boxSizing: "border-box",
        }}
      >
        <span style={{ fontSize: 26, flexShrink: 0 }}>⚠️</span>
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 14,
            fontWeight: 600,
            color: "#475569",
            lineHeight: 1.4,
          }}
        >
          <strong style={{ color: "#0f172a" }}>Educational Analysis Only:</strong> UPI transaction data and MDR policy proposals sourced from NPCI circulars and official RBI guidelines. Not financial advice.
        </div>
      </div>
    </div>
  );
};

