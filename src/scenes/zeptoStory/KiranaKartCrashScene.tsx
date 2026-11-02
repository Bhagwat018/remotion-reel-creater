import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface KiranaKartCrashSceneProps {
  durationInFrames: number;
}

export const KiranaKartCrashScene: React.FC<KiranaKartCrashSceneProps> = () => {
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

  const foundersSpring = spring({
    frame: frame - 6,
    fps,
    config: { damping: 12, stiffness: 130 },
  });

  const flawsSpring = spring({
    frame: frame - 12,
    fps,
    config: { damping: 12, stiffness: 130 },
  });

  const takeawaySpring = spring({
    frame: frame - 18,
    fps,
    config: { damping: 12, stiffness: 130 },
  });

  // Dynamic floating orbs
  const floatOrb = Math.sin((frame / fps) * Math.PI * 2) * 4;

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
            backgroundColor: "#ef4444",
            color: "#ffffff",
            border: "3.5px solid #000000",
            borderRadius: 999,
            padding: "8px 24px",
            boxShadow: "4px 4px 0px #000000",
          }}
        >
          <span style={{ fontSize: 22 }}>💥</span>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 18,
              fontWeight: 900,
              letterSpacing: 1.5,
              textTransform: "uppercase",
            }}
          >
            2020: THE FAILED ATTEMPT
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
            17-18 SAAL ME PEHLA STARTUP CRASH!
          </div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 20,
              fontWeight: 800,
              color: "#dc2626",
              marginTop: 6,
              letterSpacing: 0.5,
            }}
          >
            Aadit Palicha aur Kaivalya Vohra Ka KiranaKart 🛒
          </div>
        </div>
      </div>

      {/* 2. DUAL FOUNDERS 3D FLOATING ORBS & CRASH PROFILE (Height: 480px) */}
      <div
        style={{
          height: 480,
          transform: `scale(${foundersSpring})`,
          opacity: foundersSpring,
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
            🧑‍💻 The Teenage Founders (Mumbai, 2020)
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
            STANFORD DROPOUTS
          </span>
        </div>

        {/* 2 Founders 3D Discs + Shattered App */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            gap: 16,
          }}
        >
          {/* Founder 1: Aadit */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              transform: `translateY(${floatOrb}px)`,
            }}
          >
            <div
              style={{
                width: 120,
                height: 120,
                borderRadius: "50%",
                background: "radial-gradient(circle at 35% 35%, #60a5fa, #2563eb 60%, #1e3a8a 100%)",
                border: "4px solid #000000",
                boxShadow: "0 10px 20px rgba(37, 99, 235, 0.4), inset -4px -4px 8px rgba(0,0,0,0.4)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
              }}
            >
              <span style={{ fontSize: 44 }}>👨‍💼</span>
            </div>
            <div
              style={{
                fontFamily: "'Cabinet Grotesk', sans-serif",
                fontSize: 20,
                fontWeight: 950,
                color: "#0f172a",
                marginTop: 8,
              }}
            >
              Aadit Palicha
            </div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 13,
                fontWeight: 800,
                color: "#2563eb",
                backgroundColor: "#eff6ff",
                border: "1.5px solid #bfdbfe",
                borderRadius: 6,
                padding: "2px 8px",
                marginTop: 2,
              }}
            >
              Age 18 • CEO
            </div>
          </div>

          {/* Center: Shattered App */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "#fef2f2",
              border: "3px dashed #ef4444",
              borderRadius: 20,
              padding: "16px 14px",
              width: 150,
            }}
          >
            <span style={{ fontSize: 36 }}>🛒</span>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 14,
                fontWeight: 900,
                color: "#dc2626",
                marginTop: 4,
                textAlign: "center",
              }}
            >
              KIRANAKART
            </div>
            <div
              style={{
                backgroundColor: "#dc2626",
                color: "#ffffff",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                fontWeight: 900,
                padding: "3px 8px",
                borderRadius: 6,
                marginTop: 6,
                textAlign: "center",
              }}
            >
              SHUT DOWN
            </div>
          </div>

          {/* Founder 2: Kaivalya */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              transform: `translateY(${-floatOrb}px)`,
            }}
          >
            <div
              style={{
                width: 120,
                height: 120,
                borderRadius: "50%",
                background: "radial-gradient(circle at 35% 35%, #34d399, #059669 60%, #064e3b 100%)",
                border: "4px solid #000000",
                boxShadow: "0 10px 20px rgba(5, 150, 105, 0.4), inset -4px -4px 8px rgba(0,0,0,0.4)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
              }}
            >
              <span style={{ fontSize: 44 }}>👨‍💻</span>
            </div>
            <div
              style={{
                fontFamily: "'Cabinet Grotesk', sans-serif",
                fontSize: 20,
                fontWeight: 950,
                color: "#0f172a",
                marginTop: 8,
              }}
            >
              Kaivalya Vohra
            </div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 13,
                fontWeight: 800,
                color: "#059669",
                backgroundColor: "#ecfdf5",
                border: "1.5px solid #a7f3d0",
                borderRadius: 6,
                padding: "2px 8px",
                marginTop: 2,
              }}
            >
              Age 17 • CTO
            </div>
          </div>
        </div>

        {/* Story note */}
        <div
          style={{
            backgroundColor: "#f8fafc",
            border: "2px solid #e2e8f0",
            borderRadius: 16,
            padding: "12px 18px",
            fontFamily: "'Inter', sans-serif",
            fontSize: 15,
            fontWeight: 600,
            color: "#475569",
            lineHeight: 1.3,
            textAlign: "center",
          }}
        >
          COVID-19 lockdown me Mumbai ke kirana stores ko online lane ki koshish ki, par model scalable nahi tha!
        </div>
      </div>

      {/* 3. 3 CONNECTED CIRCULAR FLAW NODES (Height: 420px) */}
      <div
        style={{
          height: 420,
          transform: `scale(${flawsSpring})`,
          opacity: flawsSpring,
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
            🛑 Why KiranaKart Crashed (3 Fatal Flaws)
          </span>
          <span
            style={{
              backgroundColor: "#f87171",
              color: "#450a0a",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 13,
              fontWeight: 900,
              padding: "4px 10px",
              borderRadius: 6,
            }}
          >
            FATAL FLAWS
          </span>
        </div>

        {/* Flaw 1 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            border: "2px solid rgba(239, 68, 68, 0.4)",
            borderRadius: 16,
            padding: "12px 16px",
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              backgroundColor: "#ef4444",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              flexShrink: 0,
              border: "2px solid #ffffff",
            }}
          >
            ❌
          </div>
          <div>
            <div
              style={{
                fontFamily: "'Cabinet Grotesk', sans-serif",
                fontSize: 19,
                fontWeight: 900,
                color: "#fca5a5",
              }}
            >
              Zero Inventory Control (Dukaandaar Par Depend)
            </div>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                fontWeight: 600,
                color: "#94a3b8",
              }}
            >
              Item stock me hai ya nahi pata nahi chalta tha, 45% orders cancel hote the.
            </div>
          </div>
        </div>

        {/* Flaw 2 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            border: "2px solid rgba(239, 68, 68, 0.4)",
            borderRadius: 16,
            padding: "12px 16px",
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              backgroundColor: "#f97316",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              flexShrink: 0,
              border: "2px solid #ffffff",
            }}
          >
            ⏳
          </div>
          <div>
            <div
              style={{
                fontFamily: "'Cabinet Grotesk', sans-serif",
                fontSize: 19,
                fontWeight: 900,
                color: "#fdba74",
              }}
            >
              120+ Minute Wait Time (Delivery Bahut Slow)
            </div>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                fontWeight: 600,
                color: "#94a3b8",
              }}
            >
              Customer do ghante intezar karke gussa ho jate the, retention zero thi.
            </div>
          </div>
        </div>

        {/* Flaw 3 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            border: "2px solid rgba(239, 68, 68, 0.4)",
            borderRadius: 16,
            padding: "12px 16px",
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              backgroundColor: "#eab308",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              flexShrink: 0,
              border: "2px solid #ffffff",
            }}
          >
            💸
          </div>
          <div>
            <div
              style={{
                fontFamily: "'Cabinet Grotesk', sans-serif",
                fontSize: 19,
                fontWeight: 900,
                color: "#fde047",
              }}
            >
              High Delivery Cost, Zero Margin
            </div>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                fontWeight: 600,
                color: "#94a3b8",
              }}
            >
              Har order deliver karne par pocket se ₹60-₹80 ka nuksaan hota tha.
            </div>
          </div>
        </div>
      </div>

      {/* 4. THE TURNING POINT LESSON (Height: 270px) */}
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
          <span style={{ fontSize: 32 }}>💡</span>
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
              THE PIVOT TRIGGER: RUKE NAHI!
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
              KiranaKart band hua, par unhone dekha: 10 minute delivery retention 3x kar sakti hai!
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
            👉 Next: Kaise 10 minute delivery ka idea banaya
          </span>
          <span style={{ fontSize: 20 }}>🚀</span>
        </div>
      </div>
    </div>
  );
};

