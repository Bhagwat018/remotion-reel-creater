import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface CodeVsHumanSceneProps {
  durationInFrames: number;
}

export const CodeVsHumanScene: React.FC<CodeVsHumanSceneProps> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const leftSpring = spring({
    frame: frame - 2,
    fps,
    config: { damping: 13, stiffness: 130 },
  });

  const rightSpring = spring({
    frame: frame - 5,
    fps,
    config: { damping: 11, stiffness: 140 },
  });

  const bottomSpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 12, stiffness: 150 },
  });

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: 1080,
        height: 1920,
        paddingTop: 110,
        paddingBottom: 480,
        paddingLeft: 48,
        paddingRight: 48,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        gap: 24,
        zIndex: 10,
      }}
    >
      {/* HEADER */}
      <div style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: 10 }}>
        <div
          style={{
            fontFamily: "monospace",
            fontSize: 22,
            letterSpacing: 4,
            fontWeight: 800,
            color: "#f43f5e",
          }}
        >
          SPEED & PRODUCTIVITY BATTLE ⚡
        </div>
        <div
          style={{
            fontFamily: "system-ui, sans-serif",
            fontSize: 48,
            fontWeight: 900,
            color: "#ffffff",
            textTransform: "uppercase",
            letterSpacing: -1,
          }}
        >
          MANUAL EDIT VS CODE PIPELINE
        </div>
      </div>

      {/* DUAL COMPARISON CARDS */}
      <div
        style={{
          display: "flex",
          gap: 20,
          marginTop: 8,
        }}
      >
        {/* LEFT CARD: TRADITIONAL HUMAN EDITING */}
        <div
          style={{
            flex: 1,
            transform: `scale(${leftSpring}) translateX(${(1 - leftSpring) * -30}px)`,
            opacity: leftSpring,
            backgroundColor: "rgba(30, 20, 25, 0.85)",
            backdropFilter: "blur(16px)",
            border: "2px solid rgba(239, 68, 68, 0.4)",
            borderRadius: 24,
            padding: "26px 22px",
            display: "flex",
            flexDirection: "column",
            gap: 18,
            boxShadow: "0 16px 40px rgba(0,0,0,0.5)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1.5px solid rgba(239, 68, 68, 0.2)",
              paddingBottom: 12,
            }}
          >
            <span style={{ fontSize: 32 }}>✂️</span>
            <span
              style={{
                fontFamily: "monospace",
                fontSize: 16,
                fontWeight: 900,
                color: "#f87171",
                backgroundColor: "rgba(239, 68, 68, 0.15)",
                padding: "6px 12px",
                borderRadius: 8,
              }}
            >
              SLOW WAY
            </span>
          </div>

          <div style={{ fontFamily: "system-ui", fontSize: 28, fontWeight: 900, color: "#f87171" }}>
            Manual Video Editor
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              { label: "TIME", val: "3 to 4 Hours", sub: "per single reel" },
              { label: "COST", val: "₹15,000 / mo", sub: "recurring salary" },
              { label: "TOOL", val: "Premiere / CapCut", sub: "manual keyframes" },
              { label: "SCALE", val: "1 Reel / Day", sub: "burnout bottleneck" },
            ].map((row, i) => (
              <div key={i} style={{ borderBottom: "1px dashed rgba(255,255,255,0.06)", paddingBottom: 8 }}>
                <div style={{ fontFamily: "monospace", fontSize: 14, color: "#94a3b8", fontWeight: 700 }}>
                  {row.label}
                </div>
                <div style={{ fontFamily: "system-ui", fontSize: 22, fontWeight: 800, color: "#cbd5e1" }}>
                  {row.val}
                </div>
                <div style={{ fontFamily: "system-ui", fontSize: 14, color: "#64748b" }}>{row.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT CARD: AUTONOMOUS REMOTION CODE ENGINE */}
        <div
          style={{
            flex: 1,
            transform: `scale(${rightSpring}) translateX(${(1 - rightSpring) * 30}px)`,
            opacity: rightSpring,
            backgroundColor: "rgba(10, 30, 20, 0.9)",
            backdropFilter: "blur(20px)",
            border: "2.5px solid #10b981",
            borderRadius: 24,
            padding: "26px 22px",
            display: "flex",
            flexDirection: "column",
            gap: 18,
            boxShadow: "0 20px 50px rgba(0,0,0,0.6), 0 0 35px rgba(16, 185, 129, 0.3)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1.5px solid rgba(16, 185, 129, 0.3)",
              paddingBottom: 12,
            }}
          >
            <span style={{ fontSize: 32 }}>⚛️</span>
            <span
              style={{
                fontFamily: "monospace",
                fontSize: 16,
                fontWeight: 900,
                color: "#34d399",
                backgroundColor: "rgba(16, 185, 129, 0.2)",
                padding: "6px 12px",
                borderRadius: 8,
              }}
            >
              100X FASTER
            </span>
          </div>

          <div style={{ fontFamily: "system-ui", fontSize: 28, fontWeight: 900, color: "#34d399" }}>
            Pure React Code
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              { label: "TIME", val: "30 Seconds ⚡", sub: "instant compilation" },
              { label: "COST", val: "₹0.00 (Free)", sub: "open-source stack" },
              { label: "TOOL", val: "React + Remotion", sub: "mathematical layout" },
              { label: "SCALE", val: "100+ Reels / Day", sub: "infinite automation" },
            ].map((row, i) => (
              <div key={i} style={{ borderBottom: "1px dashed rgba(255,255,255,0.06)", paddingBottom: 8 }}>
                <div style={{ fontFamily: "monospace", fontSize: 14, color: "#34d399", fontWeight: 700 }}>
                  {row.label}
                </div>
                <div style={{ fontFamily: "system-ui", fontSize: 22, fontWeight: 900, color: "#ffffff" }}>
                  {row.val}
                </div>
                <div style={{ fontFamily: "system-ui", fontSize: 14, color: "#6ee7b7" }}>{row.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BOTTOM PUNCH BANNER */}
      <div
        style={{
          transform: `scale(${bottomSpring})`,
          opacity: bottomSpring,
          backgroundColor: "rgba(15, 23, 42, 0.95)",
          border: "2px solid rgba(56, 189, 248, 0.4)",
          borderRadius: 20,
          padding: "18px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
        }}
      >
        <div style={{ fontFamily: "monospace", fontSize: 22, color: "#e2e8f0", fontWeight: 700 }}>
          ⚡ 1 Single Developer = Entire Video Agency
        </div>
        <div
          style={{
            backgroundColor: "#38bdf8",
            color: "#0f172a",
            fontFamily: "monospace",
            fontSize: 18,
            fontWeight: 900,
            padding: "8px 16px",
            borderRadius: 10,
          }}
        >
          FUTURE IS CODE
        </div>
      </div>
    </div>
  );
};

