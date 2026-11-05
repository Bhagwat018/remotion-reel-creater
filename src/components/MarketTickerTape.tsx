import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

export interface MarketTickerTapeProps {
  visible?: boolean;
  position?: "bottom" | "top";
  topOffset?: number;
  bottomOffset?: number;
  items?: Array<{
    symbol: string;
    value: string;
    change: string;
    isPositive: boolean;
  }>;
}

const DEFAULT_TICKER_ITEMS = [
  { symbol: "NIFTY 50", value: "24,180", change: "+0.42%", isPositive: true },
  { symbol: "SENSEX", value: "79,480", change: "+0.38%", isPositive: true },
  { symbol: "MAXWELL GMP", value: "₹115", change: "+72.8%", isPositive: true },
  { symbol: "HGS INDIA GMP", value: "₹38", change: "+31.7%", isPositive: true },
  { symbol: "INDIA VIX", value: "14.2", change: "-1.8%", isPositive: false },
  { symbol: "SME BIDDING", value: "PEAK RUSH", change: "536X", isPositive: true },
  { symbol: "NIFTY IT", value: "41,200", change: "+0.65%", isPositive: true },
];

export const MarketTickerTape: React.FC<MarketTickerTapeProps> = ({
  visible = true,
  position = "bottom",
  topOffset,
  bottomOffset = 130, // Screen bottom se thoda upar (CNBC/Bloomberg Lower-Third)
  items = DEFAULT_TICKER_ITEMS,
}) => {
  const frame = useCurrentFrame();

  if (!visible) return null;

  // Duplicate items array 3 times for a seamless continuous scrolling loop
  const displayItems = [...items, ...items, ...items];
  const scrollOffset = (frame * 3.2) % 2400;

  // Pulsing Live Indicator dot
  const pulseOpacity = interpolate(Math.sin(frame * 0.18), [-1, 1], [0.4, 1]);

  const isTop = position === "top" || (topOffset !== undefined && bottomOffset === undefined);
  const positionStyle: React.CSSProperties = isTop
    ? { top: topOffset ?? 185 }
    : { bottom: bottomOffset ?? 130 };

  return (
    <div
      style={{
        position: "absolute",
        ...positionStyle,
        left: 0,
        width: 1080,
        height: 52,
        backgroundColor: "rgba(9, 9, 11, 0.92)",
        backdropFilter: "blur(12px)",
        borderTop: "1px solid rgba(255, 255, 255, 0.12)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
        boxShadow: "0 -4px 24px rgba(0, 0, 0, 0.45)",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        zIndex: 50,
      }}
    >
      {/* 1. Left Fixed Badge: LIVE MARKET */}
      <div
        style={{
          height: "100%",
          padding: "0 24px",
          backgroundColor: "#18181b",
          borderRight: "1px solid rgba(255, 255, 255, 0.12)",
          display: "flex",
          alignItems: "center",
          gap: 10,
          zIndex: 60,
          boxShadow: "4px 0 16px rgba(0,0,0,0.5)",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            backgroundColor: "#22c55e",
            boxShadow: "0 0 10px #22c55e",
            opacity: pulseOpacity,
          }}
        />
        <span
          style={{
            fontFamily: "var(--font-heading, 'Inter', sans-serif)",
            fontWeight: 800,
            fontSize: 14,
            letterSpacing: "0.12em",
            color: "#ffffff",
            textTransform: "uppercase",
          }}
        >
          LIVE MARKET
        </span>
      </div>

      {/* 2. Scrolling Ticker Marquee */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 32,
          whiteSpace: "nowrap",
          transform: `translateX(-${scrollOffset}px)`,
          willChange: "transform",
        }}
      >
        {displayItems.map((item, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
              fontSize: 15,
              fontWeight: 600,
            }}
          >
            <span style={{ color: "#a1a1aa" }}>{item.symbol}</span>
            <span style={{ color: "#ffffff", fontWeight: 700 }}>{item.value}</span>
            <span
              style={{
                color: item.isPositive ? "#4ade80" : "#f87171",
                backgroundColor: item.isPositive ? "rgba(34, 197, 94, 0.14)" : "rgba(239, 68, 68, 0.14)",
                padding: "2px 8px",
                borderRadius: 4,
                fontSize: 13,
                fontWeight: 800,
              }}
            >
              {item.change}
            </span>
            <span style={{ color: "#52525b", marginLeft: 16 }}>•</span>
          </div>
        ))}
      </div>
    </div>
  );
};

