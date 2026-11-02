import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface BombayPricingSceneProps {
  durationInFrames: number;
}

export const BombayPricingScene: React.FC<BombayPricingSceneProps> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerSpring = spring({
    frame: frame - 1,
    fps,
    config: { damping: 12, stiffness: 140 },
  });

  const cardSpring = spring({
    frame: frame - 5,
    fps,
    config: { damping: 12, stiffness: 130 },
  });

  const meterSpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 10, stiffness: 120 },
  });

  const gridSpring = spring({
    frame: frame - 16,
    fps,
    config: { damping: 12, stiffness: 140 },
  });

  const footerSpring = spring({
    frame: frame - 22,
    fps,
    config: { damping: 12, stiffness: 130 },
  });

  const pulse = Math.sin(frame / 5) * 0.04 + 1;

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: 1080,
        height: 1920,
        paddingTop: 190,
        paddingBottom: 380,
        paddingLeft: 60,
        paddingRight: 60,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 20,
        zIndex: 10,
      }}
    >
      {/* 1. URGENCY BADGE */}
      <div
        style={{
          transform: `scale(${headerSpring})`,
          opacity: headerSpring,
          display: "flex",
          alignItems: "center",
          gap: 12,
          backgroundColor: "#fef08a",
          color: "#000000",
          border: "3.5px solid #000000",
          borderRadius: 999,
          padding: "10px 28px",
          boxShadow: "5px 5px 0px #000000",
        }}
      >
        <span style={{ fontSize: 22 }}>⏳</span>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 20,
            fontWeight: 900,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          CLOSING TOMORROW (LAST DAY)
        </span>
      </div>

      {/* 2. COMPANY & TOPIC TITLE */}
      <div
        style={{
          transform: `scale(${headerSpring})`,
          opacity: headerSpring,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
        }}
      >
        <div
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 54,
            fontWeight: 900,
            lineHeight: 1.15,
            color: "#0f172a",
          }}
        >
          BOMBAY COATED &amp; STEELS
        </div>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 20,
            color: "#0369a1",
            fontWeight: 800,
            letterSpacing: 1.5,
          }}
        >
          PRICE BAND &amp; TICKET SIZE
        </div>
      </div>

      {/* 3. INDUSTRIAL STOCK SPEC TICKET */}
      <div
        style={{
          transform: `scale(${cardSpring})`,
          opacity: cardSpring,
          width: "100%",
          backgroundColor: "#ffffff",
          border: "3.5px solid #000000",
          borderRadius: 24,
          padding: "26px 28px",
          boxShadow: "6px 6px 0px #000000",
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        {/* PRICE BAND TRACK */}
        <div
          style={{
            transform: `scale(${meterSpring})`,
            opacity: meterSpring,
            display: "flex",
            flexDirection: "column",
            gap: 12,
            backgroundColor: "#f8fafc",
            padding: "20px 22px",
            borderRadius: 18,
            border: "2.5px solid #000000",
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
                fontFamily: "'Inter', sans-serif",
                fontSize: 18,
                color: "#475569",
                fontWeight: 800,
              }}
            >
              PRICE BAND RANGE:
            </span>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 18,
                color: "#b45309",
                fontWeight: 900,
              }}
            >
              BID AT CUT-OFF
            </span>
          </div>

          {/* Interactive track visual */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              position: "relative",
              padding: "10px 0",
            }}
          >
            {/* Floor node */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <span
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 40,
                  fontWeight: 900,
                  color: "#64748b",
                }}
              >
                ₹78
              </span>
              <span style={{ fontSize: 14, color: "#94a3b8", fontWeight: 800 }}>
                Floor Price
              </span>
            </div>

            {/* Connecting slider beam */}
            <div
              style={{
                flex: 1,
                height: 10,
                margin: "0 20px",
                backgroundColor: "#e2e8f0",
                borderRadius: 5,
                position: "relative",
                overflow: "hidden",
                border: "1px solid #cbd5e1",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  background: "linear-gradient(90deg, #94a3b8, #10b981)",
                }}
              />
            </div>

            {/* Cut-off node */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                transform: `scale(${pulse})`,
              }}
            >
              <div
                style={{
                  backgroundColor: "#d1fae5",
                  color: "#059669",
                  padding: "4px 14px",
                  borderRadius: 8,
                  border: "2px solid #000000",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 13,
                  fontWeight: 900,
                  marginBottom: 4,
                  boxShadow: "2px 2px 0px #000000",
                }}
              >
                CUT-OFF
              </div>
              <span
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 44,
                  fontWeight: 900,
                  color: "#059669",
                }}
              >
                ₹82
              </span>
            </div>
          </div>
        </div>

        {/* 2-COLUMN TILES: LOT SIZE & MINIMUM INVESTMENT */}
        <div
          style={{
            transform: `scale(${gridSpring})`,
            opacity: gridSpring,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
          }}
        >
          {/* Tile 1: Lot size */}
          <div
            style={{
              backgroundColor: "#f8fafc",
              border: "2.5px solid #000000",
              borderRadius: 18,
              padding: "18px 20px",
              display: "flex",
              flexDirection: "column",
              gap: 6,
              boxShadow: "3px 3px 0px #000000",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 20 }}>📦</span>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 16,
                  color: "#475569",
                  fontWeight: 800,
                }}
              >
                1 LOT SIZE
              </span>
            </div>
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 34,
                fontWeight: 900,
                color: "#0f172a",
              }}
            >
              182 Shares
            </div>
            <span style={{ fontSize: 14, color: "#64748b", fontWeight: 600 }}>Standard retail lot</span>
          </div>

          {/* Tile 2: Minimum amount */}
          <div
            style={{
              backgroundColor: "#f0fdf4",
              border: "2.5px solid #000000",
              borderRadius: 18,
              padding: "18px 20px",
              display: "flex",
              flexDirection: "column",
              gap: 6,
              boxShadow: "3px 3px 0px #000000",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 20 }}>💰</span>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 16,
                  color: "#065f46",
                  fontWeight: 800,
                }}
              >
                MIN. CAPITAL
              </span>
            </div>
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 34,
                fontWeight: 900,
                color: "#059669",
              }}
            >
              ₹14,924
            </div>
            <span style={{ fontSize: 14, color: "#047857", fontWeight: 800 }}>
              (~15 Hazaar Rupaye)
            </span>
          </div>
        </div>

        {/* 100% FRESH ISSUE BADGE */}
        <div
          style={{
            transform: `scale(${footerSpring})`,
            opacity: footerSpring,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#f1f5f9",
            borderRadius: 14,
            padding: "14px 20px",
            border: "2px solid #000000",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 22 }}>🏭</span>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 17,
                fontWeight: 800,
                color: "#0f172a",
              }}
            >
              100% Fresh Issue (₹183 Cr)
            </span>
          </div>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 15,
              fontWeight: 900,
              color: "#059669",
              backgroundColor: "#d1fae5",
              border: "1.5px solid #000000",
              padding: "6px 12px",
              borderRadius: 8,
            }}
          >
            ZERO OFS ✅
          </span>
        </div>
      </div>
    </div>
  );
};
