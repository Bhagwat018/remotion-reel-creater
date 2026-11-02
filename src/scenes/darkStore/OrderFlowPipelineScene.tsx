import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface OrderFlowPipelineSceneProps {
  durationInFrames: number;
}

export const OrderFlowPipelineScene: React.FC<OrderFlowPipelineSceneProps> = () => {
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

  const stopwatchSpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 12, stiffness: 130 },
  });

  const summarySpring = spring({
    frame: frame - 14,
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
          <span style={{ fontSize: 22 }}>⏱️</span>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 18,
              fontWeight: 900,
              letterSpacing: 1.5,
              textTransform: "uppercase",
            }}
          >
            THE 10-MINUTE TICK-TOCK TIMELINE
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
            ORDER AAYA, PACK HUA, NIKLA. BAS!
          </div>
          <div
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 16,
              fontWeight: 800,
              color: "#16a34a",
              marginTop: 4,
            }}
          >
            Seconds-Level Assembly Line Execution
          </div>
        </div>
      </div>

      {/* 2. HERO: 4-STEP TICK-TOCK PIPELINE (Height: 560px) */}
      <div
        style={{
          height: 560,
          transform: `scale(${pipelineSpring})`,
          opacity: pipelineSpring,
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
            <span style={{ fontSize: 26 }}>⚡</span>
            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 18, fontWeight: 900, color: "#0f172a" }}>
              STEP-BY-STEP OPERATION FLOW:
            </div>
          </div>
          <span style={{ backgroundColor: "#dcfce7", color: "#166534", fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 900, padding: "3px 8px", borderRadius: 6 }}>
            AUTOMATED
          </span>
        </div>

        {/* 4 Pipeline Tiles */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1, marginTop: 8 }}>
          <div style={{ backgroundColor: "#eff6ff", border: "1.5px solid #3b82f6", borderRadius: 12, padding: "8px 12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 22 }}>📱</span>
              <div>
                <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, fontWeight: 900, color: "#1e40af" }}>
                  1. Order Placed (0:00 - 0:30)
                </div>
                <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 12, color: "#3b82f6", fontWeight: 700 }}>
                  Order direct dark store ke system me transmit hota hai
                </div>
              </div>
            </div>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 900, color: "#1e40af" }}>30s</span>
          </div>

          <div style={{ backgroundColor: "#fefce8", border: "1.5px solid #eab308", borderRadius: 12, padding: "8px 12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 22 }}>🛒</span>
              <div>
                <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, fontWeight: 900, color: "#854d0e" }}>
                  2. Picker Picks Items (0:30 - 2:00)
                </div>
                <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 12, color: "#a16207", fontWeight: 700 }}>
                  Picker scanner se optimized route me saare items pick karta hai
                </div>
              </div>
            </div>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 900, color: "#854d0e" }}>90s</span>
          </div>

          <div style={{ backgroundColor: "#f0fdf4", border: "1.5px solid #22c55e", borderRadius: 12, padding: "8px 12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 22 }}>🛍️</span>
              <div>
                <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, fontWeight: 900, color: "#166534" }}>
                  3. Bag Packed & Sealed (2:00 - 2:30)
                </div>
                <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 12, color: "#15803d", fontWeight: 700 }}>
                  Tamper-proof bag seal hoti hai aur dispatch table pe ready
                </div>
              </div>
            </div>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 900, color: "#166534" }}>30s</span>
          </div>

          <div style={{ backgroundColor: "#fdf2f8", border: "1.5px solid #ec4899", borderRadius: 12, padding: "8px 12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 22 }}>🛵</span>
              <div>
                <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, fontWeight: 900, color: "#9d174d" }}>
                  4. Rider Transit (2:30 - 8:30)
                </div>
                <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 12, color: "#be185d", fontWeight: 700 }}>
                  Rider safe 20 km/h pe 1.5 km travel karke doorstep pahunchta hai
                </div>
              </div>
            </div>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 900, color: "#9d174d" }}>300s</span>
          </div>
        </div>

        <div style={{ backgroundColor: "#f8fafc", border: "1px dashed #94a3b8", borderRadius: 10, padding: "8px 12px", textAlign: "center", fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 800, color: "#334155" }}>
          ⏱️ TOTAL TIME: Under 500 Seconds (8.3 Minutes) Safe & Smooth!
        </div>
      </div>

      {/* 3. LIVE STOPWATCH EXECUTION DASHBOARD (Height: 360px) */}
      <div
        style={{
          height: 360,
          transform: `scale(${stopwatchSpring})`,
          opacity: stopwatchSpring,
          backgroundColor: "#0f172a",
          color: "#ffffff",
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
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "2px solid rgba(255,255,255,0.15)", paddingBottom: 6 }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, fontWeight: 900, color: "#38bdf8" }}>
            LIVE OPERATION STOPWATCH
          </div>
          <span style={{ backgroundColor: "#22c55e", color: "#000000", fontSize: 11, fontWeight: 900, padding: "2px 8px", borderRadius: 4 }}>
            REAL METRICS
          </span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
          <div style={{ backgroundColor: "rgba(255, 255, 255, 0.08)", borderRadius: 12, padding: "10px", textAlign: "center" }}>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, color: "#38bdf8" }}>120s</div>
            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 12, fontWeight: 700, color: "#94a3b8" }}>Warehouse Pick</div>
          </div>

          <div style={{ backgroundColor: "rgba(255, 255, 255, 0.08)", borderRadius: 12, padding: "10px", textAlign: "center" }}>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, color: "#fbbf24" }}>30s</div>
            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 12, fontWeight: 700, color: "#94a3b8" }}>Bag Handover</div>
          </div>

          <div style={{ backgroundColor: "rgba(255, 255, 255, 0.08)", borderRadius: 12, padding: "10px", textAlign: "center" }}>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, color: "#4ade80" }}>300s</div>
            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 12, fontWeight: 700, color: "#94a3b8" }}>Safe Ride</div>
          </div>
        </div>

        <div style={{ backgroundColor: "rgba(34, 197, 94, 0.15)", border: "1px solid #22c55e", borderRadius: 10, padding: "8px 12px", textAlign: "center", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, fontWeight: 800, color: "#86efac" }}>
          ✅ Na rider ko bhagne ki zaroorat hai, na traffic rules todne ki!
        </div>
      </div>

      {/* 4. THE "BAS!" PRINCIPLE CARD (Height: 220px) */}
      <div
        style={{
          height: 220,
          transform: `scale(${summarySpring})`,
          opacity: summarySpring,
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
          <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 17, fontWeight: 900, color: "#854d0e" }}>
            THE "BAS!" PRINCIPLE OF LOGISTICS:
          </div>
          <span style={{ backgroundColor: "#ca8a04", color: "#ffffff", fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 900, padding: "3px 8px", borderRadius: 6 }}>
            PERFECTION
          </span>
        </div>

        <div style={{ backgroundColor: "#ffffff", border: "1.5px solid #ca8a04", borderRadius: 10, padding: "8px 12px", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, fontWeight: 800, color: "#713f12", lineHeight: 1.35 }}>
          Dark store ka software order aate hi har item ki shelf location batata hai. Ek click me sab pack, bas rider nikalta hai aur doorbell bajti hai!
        </div>

        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 800, color: "#854d0e", textAlign: "center" }}>
          📊 Next: Par inke store numbers dekh ke hosh udd jayenge!
        </div>
      </div>
    </div>
  );
};

