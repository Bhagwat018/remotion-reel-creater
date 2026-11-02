import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface ModusOperandiSceneProps {
  durationInFrames: number;
}

export const ModusOperandiScene: React.FC<ModusOperandiSceneProps> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerSpring = spring({
    frame: frame - 1,
    fps,
    config: { damping: 12, stiffness: 150 },
  });

  const step1Spring = spring({
    frame: frame - 4,
    fps,
    config: { damping: 11, stiffness: 140 },
  });

  const step2Spring = spring({
    frame: frame - 8,
    fps,
    config: { damping: 11, stiffness: 140 },
  });

  const step3Spring = spring({
    frame: frame - 12,
    fps,
    config: { damping: 11, stiffness: 140 },
  });

  const realitySpring = spring({
    frame: frame - 16,
    fps,
    config: { damping: 12, stiffness: 130 },
  });

  const defenseSpring = spring({
    frame: frame - 20,
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
          <span style={{ fontSize: 22 }}>🎭</span>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 18,
              fontWeight: 900,
              letterSpacing: 1.5,
              textTransform: "uppercase",
            }}
          >
            SCAM BLUEPRINT EXPOSED
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
              fontSize: 40,
              color: "#0f172a",
              letterSpacing: 1.5,
              lineHeight: 1.1,
            }}
          >
            🔍 KAISE FASAATE HAIN APNO KO?
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
            Fake CBI Video Call & 3-Step Extortion Funnel
          </div>
        </div>
      </div>

      {/* 2. STEP 1: THE FAKE CALL (Height: 245px) */}
      <div
        style={{
          height: 245,
          transform: `scale(${step1Spring})`,
          opacity: step1Spring,
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
          <span
            style={{
              backgroundColor: "#dbeafe",
              color: "#1e40af",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 13,
              fontWeight: 900,
              padding: "4px 10px",
              borderRadius: 6,
              border: "1.5px solid #1e40af",
            }}
          >
            STEP 1: THE FAKE CALL
          </span>
          <span style={{ fontSize: 24 }}>👮‍♂️📞</span>
        </div>

        <div
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 20,
            fontWeight: 900,
            color: "#0f172a",
          }}
        >
          Uniform Pehen Kar Video Call (CBI / Police)
        </div>

        <div
          style={{
            backgroundColor: "#f8fafc",
            borderLeft: "3.5px solid #3b82f6",
            padding: "6px 12px",
            borderRadius: "0 8px 8px 0",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 14,
            color: "#334155",
            lineHeight: 1.35,
            fontWeight: 600,
          }}
        >
          "Aapke Aadhaar pe illegal narcotics & money laundering parcel intercept hua hai. Turant statement do!"
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#fee2e2",
            border: "1px solid #ef4444",
            borderRadius: 8,
            padding: "4px 10px",
          }}
        >
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              color: "#991b1b",
              fontWeight: 800,
            }}
          >
            🎯 Trap: Sudden shock paralyzes critical thinking
          </span>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              color: "#b91c1c",
              fontWeight: 900,
            }}
          >
            🚫 100% FORGED
          </span>
        </div>
      </div>

      {/* 3. STEP 2: PSYCHOLOGICAL TERROR (Height: 245px) */}
      <div
        style={{
          height: 245,
          transform: `scale(${step2Spring})`,
          opacity: step2Spring,
          backgroundColor: "#fff1f2",
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
          <span
            style={{
              backgroundColor: "#fee2e2",
              color: "#991b1b",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 13,
              fontWeight: 900,
              padding: "4px 10px",
              borderRadius: 6,
              border: "1.5px solid #991b1b",
            }}
          >
            STEP 2: PSYCHOLOGICAL TERROR
          </span>
          <span style={{ fontSize: 24 }}>🔒🧠</span>
        </div>

        <div
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 20,
            fontWeight: 900,
            color: "#991b1b",
          }}
        >
          Room Me Akele Baitha Kar Darate Hain (Hostage)
        </div>

        <div
          style={{
            backgroundColor: "#ffffff",
            borderLeft: "3.5px solid #ef4444",
            padding: "6px 12px",
            borderRadius: "0 8px 8px 0",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 14,
            color: "#7f1d1d",
            lineHeight: 1.35,
            fontWeight: 600,
          }}
        >
          "Door lock rakho! Family ya lawyer ko bataya toh encounter aur direct jail hogi!" Skype camera 24x7 on rakhwate hain.
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#fecaca",
            border: "1px solid #dc2626",
            borderRadius: 8,
            padding: "4px 10px",
          }}
        >
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              color: "#991b1b",
              fontWeight: 800,
            }}
          >
            🎯 Trap: Sleep deprivation se victim surrender kar deta hai
          </span>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              color: "#991b1b",
              fontWeight: 900,
            }}
          >
            ⚠️ ILLEGAL CONFINEMENT
          </span>
        </div>
      </div>

      {/* 4. STEP 3: FORCED MONEY TRANSFER (Height: 245px) */}
      <div
        style={{
          height: 245,
          transform: `scale(${step3Spring})`,
          opacity: step3Spring,
          backgroundColor: "#fffbeb",
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
          <span
            style={{
              backgroundColor: "#fef3c7",
              color: "#92400e",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 13,
              fontWeight: 900,
              padding: "4px 10px",
              borderRadius: 6,
              border: "1.5px solid #92400e",
            }}
          >
            STEP 3: FORCED MONEY TRANSFER
          </span>
          <span style={{ fontSize: 24 }}>💸🏦</span>
        </div>

        <div
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 20,
            fontWeight: 900,
            color: "#92400e",
          }}
        >
          "Secret RBI Verification Account" Me Paisa Bhejo
        </div>

        <div
          style={{
            backgroundColor: "#ffffff",
            borderLeft: "3.5px solid #f59e0b",
            padding: "6px 12px",
            borderRadius: "0 8px 8px 0",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 14,
            color: "#78350f",
            lineHeight: 1.35,
            fontWeight: 600,
          }}
        >
          "Clearance verify hone ke baad 2 ghante me aapke account me wapas aa jayega." (The Fatal Lie!)
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#fed7aa",
            border: "1px solid #ea580c",
            borderRadius: 8,
            padding: "4px 10px",
          }}
        >
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              color: "#7c2d12",
              fontWeight: 800,
            }}
          >
            🎯 Trap: Poori life savings aur FDs ek jhatke me loot lena
          </span>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              color: "#7c2d12",
              fontWeight: 900,
            }}
          >
            ⚡ MULE SIPHON
          </span>
        </div>
      </div>

      {/* 5. BOTTOM HARSH REALITY BANNER (Height: 175px) */}
      <div
        style={{
          height: 175,
          transform: `scale(${realitySpring})`,
          opacity: realitySpring,
          backgroundColor: "#fee2e2",
          border: "4px solid #dc2626",
          borderRadius: 22,
          padding: "16px 20px",
          boxShadow: "6px 6px 0px #000000",
          display: "flex",
          alignItems: "center",
          gap: 14,
          boxSizing: "border-box",
        }}
      >
        <span style={{ fontSize: 38 }}>❌</span>
        <div>
          <div
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 18,
              fontWeight: 900,
              color: "#991b1b",
            }}
          >
            PAISA EK BAAR GAYA TOH KABHI WAPAS NAHI AATA!
          </div>
          <div
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 14,
              fontWeight: 700,
              color: "#7f1d1d",
              marginTop: 4,
              lineHeight: 1.35,
            }}
          >
            Scammers instantly multi-layer mule accounts aur off-shore cryptocurrency me paisa withdraw kar lete hain!
          </div>
        </div>
      </div>

      {/* 6. GOLDEN DEFENSE RULE (Height: 195px) */}
      <div
        style={{
          height: 195,
          transform: `scale(${defenseSpring})`,
          opacity: defenseSpring,
          backgroundColor: "#d1fae5",
          border: "3.5px solid #059669",
          borderRadius: 20,
          padding: "16px 20px",
          boxShadow: "5px 5px 0px #000000",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 26 }}>🛡️</span>
            <div
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 18,
                fontWeight: 900,
                color: "#065f46",
              }}
            >
              KANOONI SACH JAAN LO:
            </div>
          </div>
          <span
            style={{
              backgroundColor: "#059669",
              color: "#ffffff",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              fontWeight: 900,
              padding: "3px 8px",
              borderRadius: 6,
            }}
          >
            ZERO COMPROMISE
          </span>
        </div>

        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            border: "1.5px solid #10b981",
            borderRadius: 10,
            padding: "8px 12px",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 14,
            fontWeight: 800,
            color: "#047857",
            lineHeight: 1.35,
          }}
        >
          Real Police, CBI ya RBI kabhi bhi kisi citizen se online paisa transfer karne ko nahi kehti. Aisa bolne wala 100% Criminal hai!
        </div>

        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            fontWeight: 800,
            color: "#047857",
            textAlign: "center",
          }}
        >
          ✅ Immediate action: Cut video call & file report on 1930
        </div>
      </div>
    </div>
  );
};
