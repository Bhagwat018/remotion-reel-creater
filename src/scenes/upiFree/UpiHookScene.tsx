import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface UpiHookSceneProps {
  durationInFrames: number;
}

export const UpiHookScene: React.FC<UpiHookSceneProps> = () => {
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

  const qrOrbSpring = spring({
    frame: frame - 6,
    fps,
    config: { damping: 12, stiffness: 130 },
  });

  const paradoxSpring = spring({
    frame: frame - 11,
    fps,
    config: { damping: 12, stiffness: 130 },
  });

  const teaserSpring = spring({
    frame: frame - 16,
    fps,
    config: { damping: 12, stiffness: 130 },
  });

  const floatOrb = Math.sin((frame / fps) * Math.PI * 2) * 4;
  const pulseCenter = Math.sin((frame / fps) * Math.PI * 3) * 0.03 + 1;

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
            background: "linear-gradient(135deg, #059669 0%, #0284c7 100%)",
            color: "#ffffff",
            border: "3.5px solid #000000",
            borderRadius: 999,
            padding: "8px 24px",
            boxShadow: "4px 4px 0px #000000",
          }}
        >
          <span style={{ fontSize: 22 }}>⚡</span>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 18,
              fontWeight: 900,
              letterSpacing: 1.5,
              textTransform: "uppercase",
            }}
          >
            THE ZERO-RUPEE ILLUSION
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
            UPI FREE HAI? PAISA KAHAN SE?
          </div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 20,
              fontWeight: 800,
              color: "#0369a1",
              marginTop: 6,
              letterSpacing: 0.5,
            }}
          >
            Peeche Ka System Free Nahi Hai... Bill Kaun Bharta Hai? 💸
          </div>
        </div>
      </div>

      {/* 2. 3D FLOATING UPI QR SPHERE & FLOW ARENA (Height: 510px) */}
      <div
        style={{
          height: 510,
          transform: `scale(${qrOrbSpring})`,
          opacity: qrOrbSpring,
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
            📲 The Free Payment Paradox
          </span>
          <span
            style={{
              backgroundColor: "#dcfce7",
              color: "#166534",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 14,
              fontWeight: 900,
              padding: "4px 12px",
              borderRadius: 8,
              border: "2px solid #000000",
            }}
          >
            REAL ECONOMICS
          </span>
        </div>

        {/* 3D Flow Discs */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            gap: 14,
          }}
        >
          {/* Customer Side */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              transform: `translateY(${floatOrb}px)`,
            }}
          >
            <div
              style={{
                width: 125,
                height: 125,
                borderRadius: "50%",
                background: "radial-gradient(circle at 35% 35%, #86efac, #22c55e 60%, #14532d 100%)",
                border: "4px solid #000000",
                boxShadow: "0 10px 20px rgba(34, 197, 94, 0.4), inset -4px -4px 8px rgba(0,0,0,0.4)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
              }}
            >
              <span style={{ fontSize: 34 }}>👤</span>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 12,
                  fontWeight: 900,
                  marginTop: 2,
                }}
              >
                YOU
              </span>
            </div>
            <div
              style={{
                fontFamily: "'Cabinet Grotesk', sans-serif",
                fontSize: 24,
                fontWeight: 950,
                color: "#15803d",
                marginTop: 10,
              }}
            >
              Cost: ₹0 Free
            </div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                color: "#475569",
                fontWeight: 700,
                marginTop: 2,
              }}
            >
              Zero convenience fee
            </div>
          </div>

          {/* Center 3D QR Reactor */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: 110,
            }}
          >
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: "radial-gradient(circle at 35% 35%, #38bdf8, #0284c7 60%, #082f49 100%)",
                border: "3.5px solid #000000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: `scale(${pulseCenter})`,
                boxShadow: "0 0 25px rgba(2, 132, 199, 0.5)",
              }}
            >
              <span style={{ fontSize: 36 }}>⚡</span>
            </div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                fontWeight: 900,
                color: "#0f172a",
                backgroundColor: "#fef08a",
                border: "2px solid #000000",
                borderRadius: 6,
                padding: "3px 8px",
                marginTop: 8,
                textAlign: "center",
              }}
            >
              NPCI SWITCH
            </div>
          </div>

          {/* Banks & Server Side */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              transform: `translateY(${-floatOrb}px)`,
            }}
          >
            <div
              style={{
                width: 125,
                height: 125,
                borderRadius: "50%",
                background: "radial-gradient(circle at 35% 35%, #f87171, #ef4444 60%, #7f1d1d 100%)",
                border: "4px solid #000000",
                boxShadow: "0 10px 20px rgba(239, 68, 68, 0.4), inset -4px -4px 8px rgba(0,0,0,0.4)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
              }}
            >
              <span style={{ fontSize: 34 }}>🏦</span>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 12,
                  fontWeight: 900,
                  marginTop: 2,
                }}
              >
                BANKS
              </span>
            </div>
            <div
              style={{
                fontFamily: "'Cabinet Grotesk', sans-serif",
                fontSize: 24,
                fontWeight: 950,
                color: "#b91c1c",
                marginTop: 10,
              }}
            >
              ₹1,500+ Cr Loss
            </div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                color: "#475569",
                fontWeight: 700,
                marginTop: 2,
              }}
            >
              Annual infra & servers
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div
          style={{
            backgroundColor: "#090d16",
            border: "2px solid #000000",
            borderRadius: 16,
            padding: "12px 18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 20 }}>💡</span>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 15,
                fontWeight: 700,
                color: "#ffffff",
              }}
            >
              Agar aap product ke liye pay nahi kar rahe, toh subsidy kaun de raha hai?
            </span>
          </div>
          <span
            style={{
              backgroundColor: "#f59e0b",
              color: "#000000",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              fontWeight: 900,
              padding: "4px 8px",
              borderRadius: 6,
            }}
          >
            REALITY
          </span>
        </div>
      </div>

      {/* 3. 3 HIDDEN COST PILLARS (Height: 400px) */}
      <div
        style={{
          height: 400,
          transform: `scale(${paradoxSpring})`,
          opacity: paradoxSpring,
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
            ⚙️ UPI Chalane Ka Asli Kharcha (Behind The Scenes)
          </span>
          <span
            style={{
              backgroundColor: "#38bdf8",
              color: "#0c4a6e",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 13,
              fontWeight: 900,
              padding: "4px 10px",
              borderRadius: 6,
            }}
          >
            3 PILLARS
          </span>
        </div>

        {/* Pillar 1 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            border: "2px solid rgba(56, 189, 248, 0.4)",
            borderRadius: 16,
            padding: "10px 16px",
          }}
        >
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: "50%",
              backgroundColor: "#0ea5e9",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              color: "#ffffff",
              fontWeight: 900,
              flexShrink: 0,
            }}
          >
            🖥️
          </div>
          <div>
            <div
              style={{
                fontFamily: "'Cabinet Grotesk', sans-serif",
                fontSize: 18,
                fontWeight: 900,
                color: "#7dd3fc",
              }}
            >
              High-Speed Bank Core Switch Servers
            </div>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                fontWeight: 600,
                color: "#94a3b8",
              }}
            >
              Daily 800+ million transactions handle karne ke liye super-servers chahiye.
            </div>
          </div>
        </div>

        {/* Pillar 2 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            border: "2px solid rgba(234, 179, 8, 0.4)",
            borderRadius: 16,
            padding: "10px 16px",
          }}
        >
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: "50%",
              backgroundColor: "#eab308",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              color: "#000000",
              fontWeight: 900,
              flexShrink: 0,
            }}
          >
            🔒
          </div>
          <div>
            <div
              style={{
                fontFamily: "'Cabinet Grotesk', sans-serif",
                fontSize: 18,
                fontWeight: 900,
                color: "#fde047",
              }}
            >
              Cyber Fraud Prevention & NPCI Network
            </div>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                fontWeight: 600,
                color: "#94a3b8",
              }}
            >
              2-Factor OTP, biometric security aur bank clearing reconciliation.
            </div>
          </div>
        </div>

        {/* Pillar 3 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            border: "2px solid rgba(34, 197, 94, 0.4)",
            borderRadius: 16,
            padding: "10px 16px",
          }}
        >
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: "50%",
              backgroundColor: "#22c55e",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              color: "#052e16",
              fontWeight: 900,
              flexShrink: 0,
            }}
          >
            📢
          </div>
          <div>
            <div
              style={{
                fontFamily: "'Cabinet Grotesk', sans-serif",
                fontSize: 18,
                fontWeight: 900,
                color: "#86efac",
              }}
            >
              Merchant QR Stands & Soundbox Hardware
            </div>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                fontWeight: 600,
                color: "#94a3b8",
              }}
            >
              Crores dukaano me soundbox aur QR stands distribute karne ka kharcha.
            </div>
          </div>
        </div>
      </div>

      {/* 4. TEASER BANNER (Height: 250px) */}
      <div
        style={{
          height: 250,
          transform: `scale(${teaserSpring})`,
          opacity: teaserSpring,
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
          <span style={{ fontSize: 32 }}>🚨</span>
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
              AUGUST 2026 KA HISTORIC NUMBER DEKHO!
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
              Itne transactions dekh kar banks ki saansein atki hui hain!
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
            👉 Next: August me 2,451 Crore transactions ka record!
          </span>
          <span style={{ fontSize: 20 }}>📊</span>
        </div>
      </div>
    </div>
  );
};

