import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface UpiBillCheckTipSceneProps {
  durationInFrames: number;
}

export const UpiBillCheckTipScene: React.FC<UpiBillCheckTipSceneProps> = () => {
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

  const shieldSpring = spring({
    frame: frame - 6,
    fps,
    config: { damping: 12, stiffness: 130 },
  });

  const stepsSpring = spring({
    frame: frame - 11,
    fps,
    config: { damping: 12, stiffness: 130 },
  });

  const takeawaySpring = spring({
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
            CONSUMER PROTECTION PRO TIP
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
            BILL ME EXTRA UPI CHARGE TOH ROOKO!
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
            Customer Se UPI Par Extra Surcharge Lena ILLEGAL Hai 🛡️
          </div>
        </div>
      </div>

      {/* 2. 3D BILL INSPECTION & LEGAL SHIELD ARENA (Height: 510px) */}
      <div
        style={{
          height: 510,
          transform: `scale(${shieldSpring})`,
          opacity: shieldSpring,
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
            🧾 Illegal Surcharge vs Official Mandate
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
            ZERO SURCHARGE
          </span>
        </div>

        {/* 2 Blocks: What shady shops do vs What law says */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {/* Shady behavior */}
          <div
            style={{
              backgroundColor: "#fef2f2",
              border: "2.5px solid #ef4444",
              borderRadius: 18,
              padding: "14px 18px",
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                backgroundColor: "#dc2626",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
                color: "#ffffff",
                flexShrink: 0,
              }}
            >
              ❌
            </div>
            <div>
              <div
                style={{
                  fontFamily: "'Cabinet Grotesk', sans-serif",
                  fontSize: 19,
                  fontWeight: 950,
                  color: "#991b1b",
                }}
              >
                "Sir, UPI karenge toh 2% extra lagega"
              </div>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#b91c1c",
                }}
              >
                Kuch merchants MDR ka kharcha customer ke sar par daalne ki koshish karte hain.
              </div>
            </div>
          </div>

          {/* Legal Mandate */}
          <div
            style={{
              backgroundColor: "#f0fdf4",
              border: "2.5px solid #22c55e",
              borderRadius: 18,
              padding: "14px 18px",
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                backgroundColor: "#16a34a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
                color: "#ffffff",
                flexShrink: 0,
              }}
            >
              ✅
            </div>
            <div>
              <div
                style={{
                  fontFamily: "'Cabinet Grotesk', sans-serif",
                  fontSize: 19,
                  fontWeight: 950,
                  color: "#166534",
                }}
              >
                RBI & NPCI Guideline: Strictly Prohibited!
              </div>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#15803d",
                }}
              >
                MDR merchant ka business expense hai. Customer se extra ₹1 bhi lena punishable hai.
              </div>
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
            <span style={{ fontSize: 20 }}>🛡️</span>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 15,
                fontWeight: 700,
                color: "#ffffff",
              }}
            >
              Aapka adhikaar: Sirf product ka printed MRP / invoice bill pay karo!
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
            KNOW YOUR RIGHTS
          </span>
        </div>
      </div>

      {/* 3. 3 ACTION STEPS (Height: 390px) */}
      <div
        style={{
          height: 390,
          transform: `scale(${stepsSpring})`,
          opacity: stepsSpring,
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
            ⚡ Agar Extra Charge Maange Toh Kya Karein?
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
            ACTION PLAN
          </span>
        </div>

        {/* Step 1 */}
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
            1
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
              Politely Refuse: "Bhaiya ye illegal hai"
            </div>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                fontWeight: 600,
                color: "#94a3b8",
              }}
            >
              Dukaandar ko batao ki RBI rule ke hisaab se customer surcharge nahi dega.
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            border: "2px solid rgba(234, 179, 8, 0.4)",
            borderRadius: 16,
            padding: "10px 16px",
          }}
        >
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: "50%",
              backgroundColor: "#eab308",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              color: "#000000",
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
                color: "#fde047",
              }}
            >
              Itemized Bill Check Karo
            </div>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                fontWeight: 600,
                color: "#94a3b8",
              }}
            >
              Dekho ki bill me chupke se "Convenience Charge" toh add nahi kar diya.
            </div>
          </div>
        </div>

        {/* Step 3 */}
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
            3
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
              Report to 1915 (National Consumer Helpline)
            </div>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                fontWeight: 600,
                color: "#94a3b8",
              }}
            >
              Zabardasti extra lene wale merchant ke khilaaf NCH par turant shikayat karo.
            </div>
          </div>
        </div>
      </div>

      {/* 4. TAKEAWAY BANNER (Height: 270px) */}
      <div
        style={{
          height: 270,
          transform: `scale(${takeawaySpring})`,
          opacity: takeawaySpring,
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
          <span style={{ fontSize: 32 }}>📲</span>
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
              YE REEL HAR UPI USER TAK PAHUNCHA DO!
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
              Kisi ko bhi dukaandaar ke extra charges ke trap me nahi aana chahiye!
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
            👉 Follow @techwith.GenZ for daily fintech truths
          </span>
          <span style={{ fontSize: 20 }}>🚀</span>
        </div>
      </div>
    </div>
  );
};

