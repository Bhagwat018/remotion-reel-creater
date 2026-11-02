import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface ParentsCtaSceneProps {
  durationInFrames: number;
}

export const ParentsCtaScene: React.FC<ParentsCtaSceneProps> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerSpring = spring({
    frame: frame - 1,
    fps,
    config: { damping: 12, stiffness: 150 },
  });

  const checklistSpring = spring({
    frame: frame - 4,
    fps,
    config: { damping: 11, stiffness: 140 },
  });

  const setupSpring = spring({
    frame: frame - 8,
    fps,
    config: { damping: 11, stiffness: 140 },
  });

  const shareSpring = spring({
    frame: frame - 12,
    fps,
    config: { damping: 11, stiffness: 140 },
  });

  const followSpring = spring({
    frame: frame - 16,
    fps,
    config: { damping: 12, stiffness: 130 },
  });

  const pulse = Math.sin(frame / 6) * 0.03 + 1;

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
        gap: 16,
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
            transform: `scale(${headerSpring})`,
            opacity: headerSpring,
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
          <span style={{ fontSize: 22 }}>👨‍👩‍👧‍👦</span>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 18,
              fontWeight: 900,
              letterSpacing: 1.5,
              textTransform: "uppercase",
            }}
          >
            FAMILY PROTECTION MISSION
          </span>
        </div>

        <div
          style={{
            transform: `scale(${headerSpring})`,
            opacity: headerSpring,
            backgroundColor: "#ffffff",
            border: "4px solid #000000",
            borderRadius: 22,
            padding: "12px 20px",
            textAlign: "center",
            boxShadow: "6px 6px 0px #000000",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 42,
              color: "#dc2626",
              letterSpacing: 1.5,
              lineHeight: 1.1,
            }}
          >
            🛡️ PARENTS KO AAJ HI SAMJHAO!
          </div>
          <div
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 16,
              fontWeight: 800,
              color: "#0f172a",
              marginTop: 4,
            }}
          >
            Ye reel parents ko bhejo aur unhe alert karo!
          </div>
        </div>
      </div>

      {/* 2. THE 3 PARENT SAFETY RULES CHECKLIST (Height: 410px) */}
      <div
        style={{
          height: 410,
          transform: `scale(${checklistSpring})`,
          opacity: checklistSpring,
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 18,
              fontWeight: 900,
              color: "#0f172a",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span>📋</span> 3 RULES TO TEACH YOUR PARENTS:
          </div>
          <span
            style={{
              backgroundColor: "#dbeafe",
              color: "#1e40af",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              fontWeight: 900,
              padding: "3px 8px",
              borderRadius: 6,
            }}
          >
            FAMILY SHIELD
          </span>
        </div>

        <div
          style={{
            backgroundColor: "#f0fdf4",
            border: "1.5px solid #22c55e",
            borderRadius: 12,
            padding: "10px 14px",
            display: "flex",
            alignItems: "center",
            gap: 12,
            flex: 1,
            marginTop: 6,
            marginBottom: 6,
          }}
        >
          <span style={{ fontSize: 26 }}>📞</span>
          <div>
            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, fontWeight: 900, color: "#166534" }}>
              Rule 1: Police video call pe interrogation nahi karti!
            </div>
            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 12, fontWeight: 700, color: "#15803d", marginTop: 2 }}>
              Aisa call aate hi kaato. Uniform dikhaye tab bhi camera off karo!
            </div>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#fef2f2",
            border: "1.5px solid #ef4444",
            borderRadius: 12,
            padding: "10px 14px",
            display: "flex",
            alignItems: "center",
            gap: 12,
            flex: 1,
            marginBottom: 6,
          }}
        >
          <span style={{ fontSize: 26 }}>🔒</span>
          <div>
            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, fontWeight: 900, color: "#991b1b" }}>
              Rule 2: Kisi 'verification account' me paisa mat bhejna!
            </div>
            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 12, fontWeight: 700, color: "#b91c1c", marginTop: 2 }}>
              Govt agencies innocent prove karne ke liye paise nahi mangti.
            </div>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#eff6ff",
            border: "1.5px solid #3b82f6",
            borderRadius: 12,
            padding: "10px 14px",
            display: "flex",
            alignItems: "center",
            gap: 12,
            flex: 1,
            marginBottom: 6,
          }}
        >
          <span style={{ fontSize: 26 }}>🆘</span>
          <div>
            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, fontWeight: 900, color: "#1e40af" }}>
              Rule 3: Darr ka call aaye, pehle mujhe (bachon ko) call karo!
            </div>
            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 12, fontWeight: 700, color: "#1d4ed8", marginTop: 2 }}>
              Hum handle karenge. Akele kamre me darr kar koi transfer mat karna.
            </div>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#f8fafc",
            border: "1px dashed #94a3b8",
            borderRadius: 8,
            padding: "5px 10px",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            fontWeight: 800,
            color: "#475569",
            textAlign: "center",
          }}
        >
          🛡️ Open family communication defeats 100% of psychological cyber scams
        </div>
      </div>

      {/* 3. PHONE SETUP ACTIONS CARD (Height: 235px) */}
      <div
        style={{
          height: 235,
          transform: `scale(${setupSpring})`,
          opacity: setupSpring,
          backgroundColor: "#f8fafc",
          border: "3.5px solid #000000",
          borderRadius: 20,
          padding: "14px 18px",
          boxShadow: "5px 5px 0px #000000",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 24 }}>📱</span>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 14,
                fontWeight: 900,
                color: "#2563eb",
              }}
            >
              2-MINUTE PHONE DEFENSE FOR PARENTS:
            </div>
          </div>
          <span
            style={{
              backgroundColor: "#2563eb",
              color: "#ffffff",
              fontSize: 10,
              fontWeight: 900,
              padding: "2px 6px",
              borderRadius: 4,
            }}
          >
            ACTIONABLE
          </span>
        </div>

        <div
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid #cbd5e1",
            borderRadius: 10,
            padding: "6px 12px",
            display: "flex",
            alignItems: "center",
            gap: 10,
            flex: 1,
            marginTop: 4,
            marginBottom: 4,
          }}
        >
          <span style={{ fontSize: 20 }}>⚡</span>
          <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, fontWeight: 700, color: "#1e293b", lineHeight: 1.3 }}>
            <strong>1️⃣ Speed Dial #1 = 1930:</strong> Unke dialer me National Cybercrime Helpline save karein.
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid #cbd5e1",
            borderRadius: 10,
            padding: "6px 12px",
            display: "flex",
            alignItems: "center",
            gap: 10,
            flex: 1,
            marginBottom: 4,
          }}
        >
          <span style={{ fontSize: 20 }}>🛡️</span>
          <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, fontWeight: 700, color: "#1e293b", lineHeight: 1.3 }}>
            <strong>2️⃣ Truecaller Spam Block:</strong> Unke phone me 'Block Top Spammers' toggle ON karein.
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid #cbd5e1",
            borderRadius: 10,
            padding: "6px 12px",
            display: "flex",
            alignItems: "center",
            gap: 10,
            flex: 1,
            marginBottom: 4,
          }}
        >
          <span style={{ fontSize: 20 }}>💳</span>
          <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, fontWeight: 700, color: "#1e293b", lineHeight: 1.3 }}>
            <strong>3️⃣ Daily UPI Limit:</strong> Bank app me daily online transfer limit ₹10,000 set karein.
          </div>
        </div>

        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            fontWeight: 800,
            color: "#64748b",
            textAlign: "center",
          }}
        >
          ✅ Prevention is 100x easier than recovering stolen funds from mule accounts
        </div>
      </div>

      {/* 4. SHARE BANNER (Height: 185px) */}
      <div
        style={{
          height: 185,
          transform: `scale(${shareSpring * pulse})`,
          opacity: shareSpring,
          backgroundColor: "#fee2e2",
          border: "3.5px solid #dc2626",
          borderRadius: 20,
          padding: "14px 18px",
          textAlign: "center",
          boxShadow: "5px 5px 0px #000000",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 21,
            fontWeight: 900,
            color: "#991b1b",
          }}
        >
          📲 APNE FAMILY GROUP PE SHARE KARO!
        </div>
        <div
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 14,
            fontWeight: 700,
            color: "#7f1d1d",
            lineHeight: 1.35,
          }}
        >
          Aapka ek share kisi ke parents ki 40 saal ki mehnat ki savings aur mental peace bacha sakta hai!
        </div>
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            border: "1px solid #f87171",
            borderRadius: 6,
            padding: "3px 8px",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            fontWeight: 800,
            color: "#991b1b",
          }}
        >
          👵 Senior citizens are target #1 because of lifetime retirement savings
        </div>
      </div>

      {/* 5. CREATOR FOLLOW CARD (Height: 175px) */}
      <div
        style={{
          height: 175,
          transform: `scale(${followSpring})`,
          opacity: followSpring,
          backgroundColor: "#0f172a",
          color: "#ffffff",
          border: "4px solid #000000",
          borderRadius: 22,
          padding: "14px 20px",
          boxShadow: "6px 6px 0px #000000",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 50,
              height: 50,
              borderRadius: "50%",
              backgroundColor: "#2563eb",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
              border: "2px solid #ffffff",
            }}
          >
            🚀
          </div>
          <div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 18,
                fontWeight: 900,
                color: "#38bdf8",
              }}
            >
              @techwith.GenZ
            </div>
            <div
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 12,
                color: "#94a3b8",
                fontWeight: 600,
              }}
            >
              Daily Cyber Safety & Tech Alerts
            </div>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#22c55e",
            color: "#000000",
            border: "2.5px solid #000000",
            borderRadius: 14,
            padding: "10px 18px",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 16,
            fontWeight: 900,
            boxShadow: "3px 3px 0px #000000",
          }}
        >
          FOLLOW ✅
        </div>
      </div>

      {/* 6. PUBLIC SAFETY BOX (Height: 105px) */}
      <div
        style={{
          height: 105,
          backgroundColor: "#f8fafc",
          border: "1.5px dashed #94a3b8",
          borderRadius: 14,
          padding: "10px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: 13,
          fontWeight: 700,
          color: "#475569",
          textAlign: "center",
          lineHeight: 1.35,
          boxSizing: "border-box",
        }}
      >
        ⚠️ Public awareness initiative by Tech with GenZ in national interest. Always verify with official authorities before transferring any funds.
      </div>
    </div>
  );
};
