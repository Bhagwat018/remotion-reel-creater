import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface DarkStoreWarehouseSceneProps {
  durationInFrames: number;
}

export const DarkStoreWarehouseScene: React.FC<DarkStoreWarehouseSceneProps> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const badgeSpring = spring({
    frame: frame - 1,
    fps,
    config: { damping: 12, stiffness: 150 },
  });

  const headerSpring = spring({
    frame: frame - 4,
    fps,
    config: { damping: 11, stiffness: 140 },
  });

  const heroSpring = spring({
    frame: frame - 7,
    fps,
    config: { damping: 12, stiffness: 130 },
  });

  const compareSpring = spring({
    frame: frame - 13,
    fps,
    config: { damping: 12, stiffness: 130 },
  });

  const aiSpring = spring({
    frame: frame - 18,
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
          <span style={{ fontSize: 22 }}>🏭</span>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 18,
              fontWeight: 900,
              letterSpacing: 1.5,
              textTransform: "uppercase",
            }}
          >
            HYPERLOCAL LOGISTICS BLUEPRINT
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
            ASLI RAAZ: DARK STORE!
          </div>
          <div
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 16,
              fontWeight: 800,
              color: "#2563eb",
              marginTop: 4,
            }}
          >
            Tumhare area ke paas ek chhota micro-warehouse
          </div>
        </div>
      </div>

      {/* 2. HERO: DARK STORE ANATOMY & MAP (Height: 520px) */}
      <div
        style={{
          height: 520,
          transform: `scale(${heroSpring})`,
          opacity: heroSpring,
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
            <span style={{ fontSize: 26 }}>🏬</span>
            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 18, fontWeight: 900, color: "#0f172a" }}>
              WHAT IS A DARK STORE?
            </div>
          </div>
          <span style={{ backgroundColor: "#dbeafe", color: "#1e40af", fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 900, padding: "3px 8px", borderRadius: 6 }}>
            RADIUS: 1.5 - 2.0 KM
          </span>
        </div>

        {/* 3 Pillars of Dark Store */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div
            style={{
              backgroundColor: "#f8fafc",
              border: "1.5px solid #cbd5e1",
              borderRadius: 14,
              padding: "10px 14px",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span style={{ fontSize: 26 }}>📦</span>
            <div>
              <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 15, fontWeight: 900, color: "#0f172a" }}>
                Pre-Stocked Inventory (4,000+ SKUs)
              </div>
              <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, fontWeight: 600, color: "#475569", marginTop: 2 }}>
                Doodh, bread, snacks, phone chargers & veggies pehle se racks pe taiyyar!
              </div>
            </div>
          </div>

          <div
            style={{
              backgroundColor: "#f8fafc",
              border: "1.5px solid #cbd5e1",
              borderRadius: 14,
              padding: "10px 14px",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span style={{ fontSize: 26 }}>🚫</span>
            <div>
              <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 15, fontWeight: 900, color: "#0f172a" }}>
                Zero Public Footfall (Dark Windows)
              </div>
              <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, fontWeight: 600, color: "#475569", marginTop: 2 }}>
                Yahan aam public nahi aa sakti. No billing counter, no cashier queues!
              </div>
            </div>
          </div>

          <div
            style={{
              backgroundColor: "#f8fafc",
              border: "1.5px solid #cbd5e1",
              borderRadius: 14,
              padding: "10px 14px",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span style={{ fontSize: 26 }}>🤖</span>
            <div>
              <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 15, fontWeight: 900, color: "#0f172a" }}>
                AI-Driven Rack Architecture
              </div>
              <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, fontWeight: 600, color: "#475569", marginTop: 2 }}>
                Top 200 high-frequency items packing table se sirf 2 meter door hote hain.
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#ecfdf5",
            border: "1.5px solid #10b981",
            borderRadius: 10,
            padding: "8px 12px",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            fontWeight: 800,
            color: "#065f46",
            textAlign: "center",
          }}
        >
          📍 Target: Har 1.5 - 2 KM me ek dark store taaki delivery time under 10 mins rahe
        </div>
      </div>

      {/* 3. TRADITIONAL VS DARK STORE COMPARISON (Height: 380px) */}
      <div
        style={{
          height: 380,
          transform: `scale(${compareSpring})`,
          opacity: compareSpring,
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
            <span>⚖️</span> SUPERMARKET VS DARK STORE:
          </div>
          <span style={{ backgroundColor: "#fef3c7", color: "#92400e", fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 900, padding: "3px 8px", borderRadius: 6 }}>
            ARCHITECTURE
          </span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div style={{ backgroundColor: "#fff1f2", border: "1.5px solid #f87171", borderRadius: 14, padding: "12px" }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, fontWeight: 900, color: "#dc2626" }}>
              🛒 SUPERMARKET
            </div>
            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, fontWeight: 700, color: "#991b1b", marginTop: 6, lineHeight: 1.4 }}>
              • 15,000+ sq ft area<br />
              • Customers walk in aisles<br />
              • Long billing queues<br />
              • Avg time: 45-60 mins
            </div>
          </div>

          <div style={{ backgroundColor: "#d1fae5", border: "1.5px solid #10b981", borderRadius: 14, padding: "12px" }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, fontWeight: 900, color: "#059669" }}>
              ⚡ DARK STORE
            </div>
            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, fontWeight: 700, color: "#065f46", marginTop: 6, lineHeight: 1.4 }}>
              • 2,500 sq ft micro size<br />
              • Only professional pickers<br />
              • Automated barcode scan<br />
              • Avg pack: 120 seconds!
            </div>
          </div>
        </div>

        <div style={{ backgroundColor: "#f8fafc", border: "1px dashed #94a3b8", borderRadius: 8, padding: "6px 12px", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, fontWeight: 800, color: "#334155", textAlign: "center" }}>
          Supermarket customers ke ghoomne ke liye hota hai, dark store speed ke liye!
        </div>
      </div>

      {/* 4. PREDICTIVE AI PRE-STOCKING (Height: 240px) */}
      <div
        style={{
          height: 240,
          transform: `scale(${aiSpring})`,
          opacity: aiSpring,
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
            <span style={{ fontSize: 24 }}>🧠</span>
            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 17, fontWeight: 900, color: "#854d0e" }}>
              PREDICTIVE DEMAND FORECASTING
            </div>
          </div>
          <span style={{ backgroundColor: "#ca8a04", color: "#ffffff", fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 900, padding: "3px 8px", borderRadius: 6 }}>
            SMART AI
          </span>
        </div>

        <div
          style={{
            backgroundColor: "#ffffff",
            border: "1.5px solid #ca8a04",
            borderRadius: 12,
            padding: "10px 14px",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 14,
            fontWeight: 800,
            color: "#713f12",
            lineHeight: 1.35,
          }}
        >
          Aapke order button dabane se pehle hi algorithm ko pata hota hai ki subah 7 baje doodh aur shaam ko snacks ka rush aayega — isliye saaman pehle se pack counter ke bagal me ready hota hai!
        </div>

        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 800, color: "#854d0e", textAlign: "center" }}>
          ⚡ Next: Dekhte hain 600 seconds ka order-to-doorstep timeline!
        </div>
      </div>
    </div>
  );
};

