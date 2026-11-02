import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface HiddenFeesTipSceneProps {
  durationInFrames: number;
}

export const HiddenFeesTipScene: React.FC<HiddenFeesTipSceneProps> = () => {
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

  const receiptSpring = spring({
    frame: frame - 6,
    fps,
    config: { damping: 12, stiffness: 130 },
  });

  const hacksSpring = spring({
    frame: frame - 11,
    fps,
    config: { damping: 12, stiffness: 130 },
  });

  const ruleSpring = spring({
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
      {/* 1. TOP HEADER BLOCK (Height: 180px) */}
      <div
        style={{
          height: 180,
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
            backgroundColor: "#ffffff",
            color: "#0f172a",
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
            backgroundColor: "#ffffff",
            border: "4px solid #000000",
            borderRadius: 22,
            padding: "10px 20px",
            textAlign: "center",
            boxShadow: "6px 6px 0px #000000",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 44,
              color: "#0f172a",
              letterSpacing: 1.5,
              lineHeight: 1.1,
            }}
          >
            PRO TIP: FEES CHECK KARO!
          </div>
          <div
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 16,
              fontWeight: 800,
              color: "#d97706",
              marginTop: 4,
            }}
          >
            10-minute rush mehnga pad sakta hai!
          </div>
        </div>
      </div>

      {/* 2. HERO: SIMULATED QUICK COMMERCE CART RECEIPT (Height: 520px) */}
      <div
        style={{
          height: 520,
          transform: `scale(${receiptSpring})`,
          opacity: receiptSpring,
          backgroundColor: "#ffffff",
          border: "4px solid #000000",
          borderRadius: 24,
          padding: "18px 22px",
          boxShadow: "7px 7px 0px #000000",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "2px solid #e2e8f0", paddingBottom: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 26 }}>🧾</span>
            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 18, fontWeight: 900, color: "#0f172a" }}>
              HOW A ₹120 ORDER BECOMES ₹220:
            </div>
          </div>
          <span style={{ backgroundColor: "#fee2e2", color: "#991b1b", fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 900, padding: "3px 8px", borderRadius: 6 }}>
            +83% EXTRA
          </span>
        </div>

        {/* Bill Lines */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1, marginTop: 6 }}>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 10px", backgroundColor: "#f8fafc", borderRadius: 8 }}>
            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, fontWeight: 700, color: "#334155" }}>
              🛒 Items Subtotal (Milk + Bread)
            </span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, fontWeight: 900, color: "#0f172a" }}>₹120</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 10px" }}>
            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, fontWeight: 600, color: "#dc2626" }}>
              + Platform Fee
            </span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, fontWeight: 800, color: "#dc2626" }}>+₹10</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 10px" }}>
            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, fontWeight: 600, color: "#dc2626" }}>
              + Handling / Packing Charge
            </span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, fontWeight: 800, color: "#dc2626" }}>+₹15</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 10px" }}>
            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, fontWeight: 600, color: "#dc2626" }}>
              + Surge / High Demand Fee
            </span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, fontWeight: 800, color: "#dc2626" }}>+₹25</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 10px" }}>
            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, fontWeight: 600, color: "#dc2626" }}>
              + Rain / Late Night Fee
            </span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, fontWeight: 800, color: "#dc2626" }}>+₹20</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 10px" }}>
            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, fontWeight: 600, color: "#dc2626" }}>
              + Small Cart Penalty Fee
            </span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, fontWeight: 800, color: "#dc2626" }}>+₹30</span>
          </div>
        </div>

        {/* Final Total Row */}
        <div style={{ backgroundColor: "#fee2e2", border: "2px solid #ef4444", borderRadius: 12, padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 15, fontWeight: 900, color: "#991b1b" }}>
              FINAL AMOUNT CHARGED:
            </div>
            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 11, fontWeight: 700, color: "#b91c1c" }}>
              Original ₹120 items cost you ₹220 at checkout
            </div>
          </div>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 38, color: "#dc2626" }}>
            ₹220
          </div>
        </div>
      </div>

      {/* 3. 3 SMART CONSUMER HACKS (Height: 380px) */}
      <div
        style={{
          height: 380,
          transform: `scale(${hacksSpring})`,
          opacity: hacksSpring,
          backgroundColor: "#ffffff",
          border: "4px solid #000000",
          borderRadius: 22,
          padding: "16px 20px",
          boxShadow: "6px 6px 0px #000000",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 18, fontWeight: 900, color: "#0f172a", display: "flex", alignItems: "center", gap: 8 }}>
            <span>🛡️</span> 3 WAYS TO AVOID EXTRA FEES:
          </div>
          <span style={{ backgroundColor: "#dcfce7", color: "#166534", fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 900, padding: "3px 8px", borderRadius: 6 }}>
            SAVE MONEY
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ backgroundColor: "#f0fdf4", border: "1.5px solid #22c55e", borderRadius: 12, padding: "8px 12px", display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 22 }}>1️⃣</span>
            <div>
              <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, fontWeight: 900, color: "#166534" }}>
                Expand "Bill Details" Before Pay
              </div>
              <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 12, color: "#15803d", fontWeight: 600 }}>
                Direct UPI click mat karo. Dekho handling aur surge kitna juda hai.
              </div>
            </div>
          </div>

          <div style={{ backgroundColor: "#f0fdf4", border: "1.5px solid #22c55e", borderRadius: 12, padding: "8px 12px", display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 22 }}>2️⃣</span>
            <div>
              <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, fontWeight: 900, color: "#166534" }}>
                Avoid ₹50-100 Micro Orders
              </div>
              <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 12, color: "#15803d", fontWeight: 600 }}>
                Small cart penalty ₹30 lagti hai. Combine karke ₹250+ ka cart banao.
              </div>
            </div>
          </div>

          <div style={{ backgroundColor: "#f0fdf4", border: "1.5px solid #22c55e", borderRadius: 12, padding: "8px 12px", display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 22 }}>3️⃣</span>
            <div>
              <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, fontWeight: 900, color: "#166534" }}>
                Rush Hours Se Bacho
              </div>
              <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 12, color: "#15803d", fontWeight: 600 }}>
                Baarish ya 8 PM - 10 PM rush hours me surge fees 2x ho jati hai.
              </div>
            </div>
          </div>
        </div>

        <div style={{ backgroundColor: "#f8fafc", border: "1px dashed #94a3b8", borderRadius: 8, padding: "5px 10px", textAlign: "center", fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 800, color: "#334155" }}>
          💡 Smart buyers never pay 80% extra for basic convenience!
        </div>
      </div>

      {/* 4. GOLDEN RULE (Height: 240px) */}
      <div
        style={{
          height: 240,
          transform: `scale(${ruleSpring})`,
          opacity: ruleSpring,
          backgroundColor: "#fef9c3",
          border: "4px solid #ca8a04",
          borderRadius: 22,
          padding: "16px 20px",
          boxShadow: "6px 6px 0px #000000",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 24 }}>⚡</span>
            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 17, fontWeight: 900, color: "#854d0e" }}>
              FINAL TAKEAWAY:
            </div>
          </div>
          <span style={{ backgroundColor: "#ca8a04", color: "#ffffff", fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 900, padding: "3px 8px", borderRadius: 6 }}>
            GOLDEN RULE
          </span>
        </div>

        <div style={{ backgroundColor: "#ffffff", border: "1.5px solid #ca8a04", borderRadius: 10, padding: "8px 12px", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, fontWeight: 800, color: "#713f12", lineHeight: 1.35 }}>
          10-minute delivery ka nasha achha hai, par apni pocket ka dhyan rakho. Checkout karne se pehle extra charges check karna mat bhoolna!
        </div>

        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 800, color: "#854d0e", textAlign: "center" }}>
          🔥 Next: Follow karo @techwith.GenZ for daily real tech breakdowns!
        </div>
      </div>
    </div>
  );
};

