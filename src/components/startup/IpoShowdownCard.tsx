import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { TechLogo } from "../TechLogo";

export interface IpoShowdownCardProps {
  delayFrames?: number;
}

export const IpoShowdownCard: React.FC<IpoShowdownCardProps> = ({ delayFrames = 2 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - delayFrames,
    fps,
    config: { damping: 13, stiffness: 140 },
  });

  const jioEntrance = spring({
    frame: frame - (delayFrames + 4),
    fps,
    config: { damping: 12, stiffness: 150 },
  });

  const unicornsEntrance = spring({
    frame: frame - (delayFrames + 12),
    fps,
    config: { damping: 13, stiffness: 140 },
  });

  const bannerEntrance = spring({
    frame: frame - (delayFrames + 20),
    fps,
    config: { damping: 12, stiffness: 160 },
  });

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 900,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
        transform: `scale(${entrance})`,
        opacity: entrance,
      }}
    >
      {/* 1. JIO LISTED CARD (The Benchmark) */}
      <div
        style={{
          width: "100%",
          backgroundColor: "#f0fdf4",
          border: "3.5px solid #000000",
          borderRadius: 22,
          padding: "18px 26px",
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
              width: 52,
              height: 52,
              borderRadius: 14,
              backgroundColor: "#16a34a",
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
            ₹
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 28,
                fontWeight: 900,
                color: "#0f172a",
                letterSpacing: "-0.01em",
              }}
            >
              JIO FINANCIAL / IPO
            </span>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 16,
                fontWeight: 700,
                color: "#16a34a",
              }}
            >
              RECORD SUBSCRIBED & LISTED
            </span>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#22c55e",
            color: "#ffffff",
            border: "2.5px solid #000000",
            borderRadius: 12,
            padding: "8px 16px",
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

      {/* VS DIVIDER BADGE */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          margin: "-4px 0",
          zIndex: 10,
        }}
      >
        <div
          style={{
            backgroundColor: "#fef08a",
            color: "#000000",
            border: "2.5px solid #000000",
            borderRadius: 999,
            padding: "6px 20px",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 18,
            fontWeight: 900,
            boxShadow: "3px 3px 0px #000000",
            transform: "rotate(-2deg)",
          }}
        >
          BUT WHERE ARE THE UNICORNS? 🔍
        </div>
      </div>

      {/* 2. THE THREE MISSING UNICORNS GRID */}
      <div
        style={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 14,
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
            padding: "18px 14px",
            boxShadow: "5px 5px 0px #000000",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              width: 50,
              height: 50,
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
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 24, fontWeight: 900, color: "#000000" }}>
            ZEPTO
          </span>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: "#64748b", fontWeight: 700 }}>
            Quick Commerce
          </span>
          <div
            style={{
              backgroundColor: "#fee2e2",
              color: "#ef4444",
              border: "2px solid #000000",
              borderRadius: 10,
              padding: "4px 10px",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 14,
              fontWeight: 900,
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
            padding: "18px 14px",
            boxShadow: "5px 5px 0px #000000",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              width: 50,
              height: 50,
              borderRadius: 14,
              backgroundColor: "#5f259f",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "2px solid #000000",
              boxShadow: "2px 2px 0px #000000",
            }}
          >
            <TechLogo name="phonepe" size={32} color="#ffffff" />
          </div>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 24, fontWeight: 900, color: "#000000" }}>
            PHONEPE
          </span>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: "#64748b", fontWeight: 700 }}>
            UPI & Payments
          </span>
          <div
            style={{
              backgroundColor: "#fef3c7",
              color: "#d97706",
              border: "2px solid #000000",
              borderRadius: 10,
              padding: "4px 10px",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 14,
              fontWeight: 900,
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
            padding: "18px 14px",
            boxShadow: "5px 5px 0px #000000",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              width: 50,
              height: 50,
              borderRadius: 14,
              backgroundColor: "#0284c7",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "2px solid #000000",
              boxShadow: "2px 2px 0px #000000",
            }}
          >
            <TechLogo name="razorpay" size={32} color="#ffffff" />
          </div>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 24, fontWeight: 900, color: "#000000" }}>
            RAZORPAY
          </span>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: "#64748b", fontWeight: 700 }}>
            Fintech Gateway
          </span>
          <div
            style={{
              backgroundColor: "#e0e7ff",
              color: "#4338ca",
              border: "2px solid #000000",
              borderRadius: 10,
              padding: "4px 10px",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 14,
              fontWeight: 900,
            }}
          >
            ⏳ DELAYED
          </div>
        </div>
      </div>

      {/* 3. SHOCK VERDICT WARNING BANNER */}
      <div
        style={{
          width: "100%",
          backgroundColor: "#ff0055",
          color: "#ffffff",
          border: "3.5px solid #000000",
          borderRadius: 18,
          padding: "16px 24px",
          boxShadow: "6px 6px 0px #000000",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transform: `scale(${bannerEntrance}) rotate(-1deg)`,
          opacity: bannerEntrance,
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 26 }}>🚨</span>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 22,
              fontWeight: 900,
              letterSpacing: "0.02em",
              textTransform: "uppercase",
            }}
          >
            ALL 3 MEGA IPOS PUSHED TO 2027!
          </span>
        </div>
        <div
          style={{
            backgroundColor: "#facc15",
            color: "#000000",
            border: "2px solid #000000",
            borderRadius: 8,
            padding: "4px 12px",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 15,
            fontWeight: 900,
          }}
        >
          CONFIRMED
        </div>
      </div>
    </div>
  );
};
