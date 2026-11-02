import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface DarkStoreHookSceneProps {
  durationInFrames: number;
}

export const DarkStoreHookScene: React.FC<DarkStoreHookSceneProps> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const badgeSpring = spring({
    frame: frame - 1,
    fps,
    config: { damping: 12, stiffness: 150 },
  });

  const headlineSpring = spring({
    frame: frame - 4,
    fps,
    config: { damping: 11, stiffness: 140 },
  });

  const heroSpring = spring({
    frame: frame - 7,
    fps,
    config: { damping: 12, stiffness: 130 },
  });

  const mathSpring = spring({
    frame: frame - 13,
    fps,
    config: { damping: 12, stiffness: 130 },
  });

  const secretSpring = spring({
    frame: frame - 18,
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
            transform: `scale(${badgeSpring * pulse})`,
            opacity: badgeSpring,
            display: "flex",
            alignItems: "center",
            gap: 10,
            backgroundColor: "#ff0055",
            color: "#ffffff",
            border: "3.5px solid #000000",
            borderRadius: 999,
            padding: "8px 26px",
            boxShadow: "5px 5px 0px #000000",
          }}
        >
          <span style={{ fontSize: 22 }}>⚡</span>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 18,
              fontWeight: 900,
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            QUICK COMMERCE MYTH BUSTED
          </span>
        </div>

        <div
          style={{
            transform: `scale(${headlineSpring})`,
            opacity: headlineSpring,
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
            10 MIN DELIVERY: RIDER NAHI, KUCH AUR!
          </div>
          <div
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 16,
              fontWeight: 800,
              color: "#dc2626",
              marginTop: 4,
            }}
          >
            Rider ki speed ka isse koi lena-dena nahi!
          </div>
        </div>
      </div>

      {/* 2. HERO: SPEEDOMETER VS REALITY SPLIT (Height: 540px) */}
      <div
        style={{
          height: 540,
          transform: `scale(${heroSpring})`,
          opacity: heroSpring,
          backgroundColor: "#0f172a",
          border: "4px solid #000000",
          borderRadius: 24,
          padding: "18px 22px",
          color: "#ffffff",
          boxShadow: "7px 7px 0px #000000",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "2px solid rgba(255,255,255,0.15)", paddingBottom: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 26 }}>🏍️</span>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 16, fontWeight: 900, color: "#38bdf8" }}>
              DELIVERY SPEED REALITY CHECK
            </div>
          </div>
          <span style={{ backgroundColor: "#ef4444", color: "#ffffff", fontSize: 11, fontWeight: 900, padding: "3px 8px", borderRadius: 6 }}>
            POPULAR MYTH
          </span>
        </div>

        {/* Dual Split Columns */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          {/* Left Column: What people think */}
          <div
            style={{
              backgroundColor: "rgba(220, 38, 38, 0.15)",
              border: "2px solid #ef4444",
              borderRadius: 16,
              padding: "14px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, fontWeight: 900, color: "#f87171" }}>
                ❌ WHAT PEOPLE THINK
              </div>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 38, color: "#ef4444", marginTop: 4, lineHeight: 1 }}>
                80-90 KM/H
              </div>
              <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, color: "#fca5a5", fontWeight: 700, marginTop: 4 }}>
                Riders break signals & risk life to reach in 10 mins
              </div>
            </div>

            <div style={{ backgroundColor: "#991b1b", color: "#ffffff", borderRadius: 8, padding: "4px 8px", fontSize: 11, fontWeight: 800, textAlign: "center", marginTop: 8 }}>
              100% FALSE & ILLEGAL
            </div>
          </div>

          {/* Right Column: The Real Truth */}
          <div
            style={{
              backgroundColor: "rgba(34, 197, 94, 0.15)",
              border: "2px solid #22c55e",
              borderRadius: 16,
              padding: "14px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, fontWeight: 900, color: "#4ade80" }}>
                ✅ THE REAL TRUTH
              </div>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 38, color: "#22c55e", marginTop: 4, lineHeight: 1 }}>
                20-25 KM/H
              </div>
              <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, color: "#86efac", fontWeight: 700, marginTop: 4 }}>
                Normal slow speed. Total distance is only 1.2 to 1.8 KM!
              </div>
            </div>

            <div style={{ backgroundColor: "#15803d", color: "#ffffff", borderRadius: 8, padding: "4px 8px", fontSize: 11, fontWeight: 800, textAlign: "center", marginTop: 8 }}>
              HYPERLOCAL PROXIMITY
            </div>
          </div>
        </div>

        {/* Speedometer Bar Visual */}
        <div style={{ backgroundColor: "rgba(255, 255, 255, 0.08)", borderRadius: 14, padding: "12px 16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#94a3b8", fontWeight: 800 }}>
              AVG RIDER TRANSIT SPEED
            </span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, color: "#22c55e", fontWeight: 900 }}>
              22 KM/H (SAFE ZONE)
            </span>
          </div>
          <div style={{ width: "100%", height: 12, backgroundColor: "#1e293b", borderRadius: 999, overflow: "hidden", position: "relative" }}>
            <div style={{ width: "26%", height: "100%", backgroundColor: "#22c55e", borderRadius: 999 }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4, fontSize: 11, color: "#64748b", fontFamily: "'JetBrains Mono', monospace" }}>
            <span>0 km/h</span>
            <span style={{ color: "#22c55e", fontWeight: 800 }}>Safe Avg: 22 km/h</span>
            <span>Danger: 80+ km/h</span>
          </div>
        </div>
      </div>

      {/* 3. MATHEMATICAL PHYSICS OF 10 MINUTES (Height: 370px) */}
      <div
        style={{
          height: 370,
          transform: `scale(${mathSpring})`,
          opacity: mathSpring,
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
            <span>📐</span> THE 10-MINUTE PHYSICS FORMULA:
          </div>
          <span style={{ backgroundColor: "#fef3c7", color: "#92400e", fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 900, padding: "3px 8px", borderRadius: 6 }}>
            DISTANCE = SPEED × TIME
          </span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
          <div style={{ backgroundColor: "#f8fafc", border: "1.5px solid #cbd5e1", borderRadius: 12, padding: "10px", textAlign: "center" }}>
            <div style={{ fontSize: 20 }}>📍</div>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: "#0f172a", marginTop: 2 }}>1.5 KM</div>
            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 12, fontWeight: 700, color: "#64748b" }}>Max Radius</div>
          </div>
          <div style={{ backgroundColor: "#f8fafc", border: "1.5px solid #cbd5e1", borderRadius: 12, padding: "10px", textAlign: "center" }}>
            <div style={{ fontSize: 20 }}>🛵</div>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: "#059669", marginTop: 2 }}>22 KM/H</div>
            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 12, fontWeight: 700, color: "#64748b" }}>Normal Speed</div>
          </div>
          <div style={{ backgroundColor: "#f8fafc", border: "1.5px solid #cbd5e1", borderRadius: 12, padding: "10px", textAlign: "center" }}>
            <div style={{ fontSize: 20 }}>⏱️</div>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: "#2563eb", marginTop: 2 }}>4.1 MINS</div>
            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 12, fontWeight: 700, color: "#64748b" }}>Drive Time</div>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#eff6ff",
            border: "1.5px solid #3b82f6",
            borderRadius: 12,
            padding: "10px 14px",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 14,
            fontWeight: 800,
            color: "#1e40af",
            lineHeight: 1.35,
          }}
        >
          💡 <strong>Conclusion:</strong> Rider ko bhagne ki zaroorat hi nahi! 1.5 KM ka rasta normal bike speed pe 4 minute me asani se cover ho jata hai.
        </div>
      </div>

      {/* 4. REAL SECRET REVEAL CARD (Height: 235px) */}
      <div
        style={{
          height: 235,
          transform: `scale(${secretSpring})`,
          opacity: secretSpring,
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
            <span style={{ fontSize: 26 }}>🏭</span>
            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 18, fontWeight: 900, color: "#854d0e" }}>
              TOH PHIR ASLI RAAZ KYA HAI?
            </div>
          </div>
          <span style={{ backgroundColor: "#ca8a04", color: "#ffffff", fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 900, padding: "3px 8px", borderRadius: 6 }}>
            REVEAL
          </span>
        </div>

        <div
          style={{
            backgroundColor: "#ffffff",
            border: "2px solid #ca8a04",
            borderRadius: 12,
            padding: "10px 14px",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 15,
            fontWeight: 800,
            color: "#713f12",
            lineHeight: 1.35,
          }}
        >
          Speed bike me nahi, <strong>"DARK STORE"</strong> ke andar hoti hai! Ek chhota warehouse jahan order aate hi 120 seconds me pack ho jata hai!
        </div>

        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 800, color: "#854d0e", textAlign: "center" }}>
          👇 Let's look inside a Dark Store in the next scene!
        </div>
      </div>
    </div>
  );
};

