import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { TechLogo } from "../../components/TechLogo";

export interface IpoShowdownSceneProps {
  durationInFrames: number;
}

export const IpoShowdownScene: React.FC<IpoShowdownSceneProps> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Staggered springs for cinematic reveal
  const tickerEntrance = spring({
    frame: frame - 1,
    fps,
    config: { damping: 13, stiffness: 140 },
  });

  const headlineEntrance = spring({
    frame: frame - 4,
    fps,
    config: { damping: 12, stiffness: 150 },
  });

  const jioEntrance = spring({
    frame: frame - 8,
    fps,
    config: { damping: 12, stiffness: 140 },
  });

  const splitEntrance = spring({
    frame: frame - 14,
    fps,
    config: { damping: 11, stiffness: 160 },
  });

  const unicornsEntrance = spring({
    frame: frame - 18,
    fps,
    config: { damping: 12, stiffness: 140 },
  });

  const bannerEntrance = spring({
    frame: frame - 24,
    fps,
    config: { damping: 12, stiffness: 150 },
  });

  // Animated pulse for alert badges
  const pulse = Math.sin(frame / 6) * 0.03 + 1;

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: 1080,
        height: 1920,
        paddingTop: 200,
        paddingBottom: 380,
        paddingLeft: 60,
        paddingRight: 60,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 18,
        zIndex: 10,
      }}
    >
      {/* 1. TOP BREAKING ALERT TICKER (Scene-Specific Header) */}
      <div
        style={{
          transform: `scale(${tickerEntrance})`,
          opacity: tickerEntrance,
          display: "flex",
          alignItems: "center",
          gap: 12,
          backgroundColor: "#fee2e2",
          border: "2.5px solid #ef4444",
          borderRadius: 999,
          padding: "8px 22px",
          boxShadow: "3px 3px 0px #ef4444",
        }}
      >
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: "50%",
            backgroundColor: "#ef4444",
            transform: `scale(${pulse})`,
          }}
        />
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 16,
            fontWeight: 900,
            color: "#991b1b",
            letterSpacing: "0.08em",
          }}
        >
          DALAL STREET BREAKING RADAR
        </span>
      </div>

      {/* 2. DEDICATED HOOK HEADLINE */}
      <div
        style={{
          transform: `scale(${headlineEntrance})`,
          opacity: headlineEntrance,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: 6,
        }}
      >
        <span
          style={{
            fontFamily: "'Anton', sans-serif",
            fontSize: 66,
            fontWeight: 900,
            color: "#0f172a",
            letterSpacing: "0.02em",
            textTransform: "uppercase",
            lineHeight: 1.05,
            textShadow: "4px 4px 0px rgba(0,0,0,0.1)",
          }}
        >
          WHERE ARE THE{" "}
          <span
            style={{
              backgroundColor: "#fef08a",
              padding: "2px 14px",
              borderRadius: 8,
              border: "3px solid #000000",
              boxShadow: "3px 3px 0px #000000",
            }}
          >
            MEGA IPOs?
          </span>
        </span>
      </div>

      {/* 3. BENCHMARK CARD: JIO LISTED & TRADING */}
      <div
        style={{
          width: "100%",
          maxWidth: 920,
          backgroundColor: "#f0fdf4",
          border: "3.5px solid #000000",
          borderRadius: 22,
          padding: "18px 24px",
          boxShadow: "6px 6px 0px #000000",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transform: `scale(${jioEntrance})`,
          opacity: jioEntrance,
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 54,
              height: 54,
              borderRadius: 14,
              backgroundColor: "#16a34a",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              fontWeight: 900,
              border: "2px solid #000000",
              boxShadow: "2px 2px 0px #000000",
            }}
          >
            ₹
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 28,
                fontWeight: 900,
                color: "#0f172a",
              }}
            >
              JIO FINANCIAL IPO
            </span>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 16,
                fontWeight: 700,
                color: "#16a34a",
              }}
            >
              SUBSCRIPTION RECORD BROKEN
            </span>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#22c55e",
            color: "#ffffff",
            border: "2.5px solid #000000",
            borderRadius: 12,
            padding: "8px 18px",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 18,
            fontWeight: 900,
            boxShadow: "3px 3px 0px #000000",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <span>✓</span>
          <span>LISTED!</span>
        </div>
      </div>

      {/* 4. THE PIVOT CONTRAST BARRIER */}
      <div
        style={{
          transform: `scale(${splitEntrance}) rotate(-1.5deg)`,
          opacity: splitEntrance,
          backgroundColor: "#fef08a",
          border: "3px solid #000000",
          borderRadius: 999,
          padding: "8px 28px",
          boxShadow: "4px 4px 0px #000000",
          display: "flex",
          alignItems: "center",
          gap: 10,
          zIndex: 15,
        }}
      >
        <span style={{ fontSize: 20 }}>⚠️</span>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 18,
            fontWeight: 900,
            color: "#000000",
            letterSpacing: "0.04em",
          }}
        >
          BUT WHERE ARE THESE 3 UNICORNS?
        </span>
        <span style={{ fontSize: 20 }}>⚠️</span>
      </div>

      {/* 5. THE 3 MISSING UNICORNS TRIPLE GRID */}
      <div
        style={{
          width: "100%",
          maxWidth: 920,
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 16,
          transform: `scale(${unicornsEntrance})`,
          opacity: unicornsEntrance,
        }}
      >
        {/* ZEPTO */}
        <div
          style={{
            backgroundColor: "#ffffff",
            border: "3.5px solid #000000",
            borderRadius: 20,
            padding: "16px 12px",
            boxShadow: "5px 5px 0px #000000",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              backgroundColor: "#ff3269",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 26,
              fontWeight: 900,
              border: "2px solid #000000",
              boxShadow: "2px 2px 0px #000000",
            }}
          >
            Z
          </div>
          <div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 22, fontWeight: 900 }}>
              ZEPTO
            </div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                fontWeight: 700,
                color: "#64748b",
              }}
            >
              Quick Commerce
            </div>
          </div>
          <div
            style={{
              backgroundColor: "#e0f2fe",
              color: "#0369a1",
              border: "2px solid #0284c7",
              borderRadius: 8,
              padding: "4px 8px",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 13,
              fontWeight: 800,
            }}
          >
            ❄️ ON ICE
          </div>
        </div>

        {/* PHONEPE */}
        <div
          style={{
            backgroundColor: "#ffffff",
            border: "3.5px solid #000000",
            borderRadius: 20,
            padding: "16px 12px",
            boxShadow: "5px 5px 0px #000000",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              backgroundColor: "#5f259f",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "2px solid #000000",
              boxShadow: "2px 2px 0px #000000",
            }}
          >
            <TechLogo name="phonepe" size={32} />
          </div>
          <div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 22, fontWeight: 900 }}>
              PHONEPE
            </div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                fontWeight: 700,
                color: "#64748b",
              }}
            >
              UPI & Payments
            </div>
          </div>
          <div
            style={{
              backgroundColor: "#fef3c7",
              color: "#b45309",
              border: "2px solid #d97706",
              borderRadius: 8,
              padding: "4px 8px",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 13,
              fontWeight: 800,
            }}
          >
            ⏸️ PAUSED
          </div>
        </div>

        {/* RAZORPAY */}
        <div
          style={{
            backgroundColor: "#ffffff",
            border: "3.5px solid #000000",
            borderRadius: 20,
            padding: "16px 12px",
            boxShadow: "5px 5px 0px #000000",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              backgroundColor: "#0284c7",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "2px solid #000000",
              boxShadow: "2px 2px 0px #000000",
            }}
          >
            <TechLogo name="razorpay" size={32} />
          </div>
          <div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 22, fontWeight: 900 }}>
              RAZORPAY
            </div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                fontWeight: 700,
                color: "#64748b",
              }}
            >
              Fintech Gateway
            </div>
          </div>
          <div
            style={{
              backgroundColor: "#fce7f3",
              color: "#be185d",
              border: "2px solid #db2777",
              borderRadius: 8,
              padding: "4px 8px",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 13,
              fontWeight: 800,
            }}
          >
            ⏳ DELAYED
          </div>
        </div>
      </div>

      {/* 6. BOTTOM SHOCK CONFIRMATION BANNER */}
      <div
        style={{
          width: "100%",
          maxWidth: 920,
          backgroundColor: "#ff0055",
          color: "#ffffff",
          border: "3.5px solid #000000",
          borderRadius: 18,
          padding: "14px 22px",
          boxShadow: "5px 5px 0px #000000",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transform: `scale(${bannerEntrance})`,
          opacity: bannerEntrance,
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 24 }}>🚨</span>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 22,
              fontWeight: 900,
              letterSpacing: "0.02em",
            }}
          >
            ALL 3 MEGA IPOS PUSHED TO 2027!
          </span>
        </div>
        <div
          style={{
            backgroundColor: "#fef08a",
            color: "#000000",
            border: "2px solid #000000",
            borderRadius: 8,
            padding: "4px 12px",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 14,
            fontWeight: 900,
          }}
        >
          CONFIRMED
        </div>
      </div>
    </div>
  );
};
