import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface DigitalArrestHookSceneProps {
  durationInFrames: number;
}

export const DigitalArrestHookScene: React.FC<DigitalArrestHookSceneProps> = () => {
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

  const callCardSpring = spring({
    frame: frame - 7,
    fps,
    config: { damping: 12, stiffness: 130 },
  });

  const stampSpring = spring({
    frame: frame - 14,
    fps,
    config: { damping: 8, stiffness: 180 },
  });

  const tacticsSpring = spring({
    frame: frame - 18,
    fps,
    config: { damping: 12, stiffness: 130 },
  });

  const advisorySpring = spring({
    frame: frame - 22,
    fps,
    config: { damping: 12, stiffness: 130 },
  });

  const pulse = Math.sin(frame / 5) * 0.04 + 1;
  const blink = Math.floor(frame / 8) % 2 === 0;

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
      {/* 1. TOP HEADER BLOCK (Height: 170px) */}
      <div
        style={{
          height: 170,
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
            gap: 12,
            backgroundColor: "#ff0055",
            color: "#ffffff",
            border: "3.5px solid #000000",
            borderRadius: 999,
            padding: "8px 26px",
            boxShadow: "5px 5px 0px #000000",
          }}
        >
          <span style={{ fontSize: 24 }}>🚨</span>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 18,
              fontWeight: 900,
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            CRITICAL CYBER THREAT ALERT
          </span>
        </div>

        <div
          style={{
            transform: `scale(${headlineSpring})`,
            opacity: headlineSpring,
            backgroundColor: "#ffffff",
            border: "4px solid #000000",
            borderRadius: 22,
            padding: "8px 24px",
            textAlign: "center",
            boxShadow: "6px 6px 0px #000000",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 28,
              fontWeight: 900,
              color: "#0f172a",
              letterSpacing: -0.5,
              textTransform: "uppercase",
              lineHeight: 1.15,
            }}
          >
            POLICE VIDEO CALL PE:
          </div>
          <div
            style={{
              display: "inline-block",
              backgroundColor: "#fee2e2",
              border: "3px solid #dc2626",
              borderRadius: 12,
              padding: "2px 18px",
              marginTop: 2,
              color: "#dc2626",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 30,
              fontWeight: 900,
              letterSpacing: -0.5,
            }}
          >
            👮‍♂️ "TUM ARREST HO?"
          </div>
        </div>
      </div>

      {/* 2. HERO: FULL-SIZE SIMULATED POLICE VIDEO CALL INTERFACE (Height: 560px) */}
      <div
        style={{
          height: 560,
          transform: `scale(${callCardSpring})`,
          opacity: callCardSpring,
          backgroundColor: "#0d131f",
          border: "4px solid #000000",
          borderRadius: 26,
          padding: "20px 26px",
          color: "#ffffff",
          boxShadow: "7px 7px 0px #000000",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          overflow: "hidden",
          boxSizing: "border-box",
        }}
      >
        {/* Video Call Top Bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "2px solid rgba(255, 255, 255, 0.15)",
            paddingBottom: 10,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 28 }}>🛡️</span>
            <div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 18,
                  fontWeight: 900,
                  color: "#38bdf8",
                  letterSpacing: 1,
                }}
              >
                CBI SPECIAL CYBER CRIME CELL
              </div>
              <div
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 13,
                  color: "#94a3b8",
                  fontWeight: 600,
                }}
              >
                Enforcement Directorate & Cyber Command, New Delhi
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              backgroundColor: "rgba(220, 38, 38, 0.25)",
              border: "2px solid #ef4444",
              borderRadius: 12,
              padding: "5px 12px",
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: blink ? "#ef4444" : "transparent",
              }}
            />
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 14,
                fontWeight: 900,
                color: "#f87171",
              }}
            >
              REC 00:04:18
            </span>
          </div>
        </div>

        {/* Interrogation Screen Mockup */}
        <div
          style={{
            backgroundColor: "#161f30",
            border: "2px dashed rgba(56, 189, 248, 0.4)",
            borderRadius: 16,
            padding: "18px 22px",
            display: "flex",
            flexDirection: "column",
            gap: 12,
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
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 14,
                color: "#f59e0b",
                fontWeight: 800,
              }}
            >
              ⚠️ TARGET IDENTIFIED // AADHAAR CARD LINKED
            </span>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 13,
                color: "#64748b",
              }}
            >
              WARRANT #DL-9082-CBI
            </span>
          </div>

          <div
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 21,
              lineHeight: 1.4,
              color: "#e2e8f0",
              fontWeight: 600,
            }}
          >
            "Aapke Aadhaar pe illegal narcotics & money laundering case hai! Camera ke samne haath rakhein, call disconnect kiya toh van aayegi!"
          </div>

          <div
            style={{
              display: "flex",
              gap: 10,
            }}
          >
            <span
              style={{
                backgroundColor: "rgba(239, 68, 68, 0.2)",
                color: "#fca5a5",
                fontSize: 13,
                fontWeight: 700,
                padding: "4px 12px",
                borderRadius: 6,
                border: "1px solid #ef4444",
              }}
            >
              IPC 420 (FRAUD)
            </span>
            <span
              style={{
                backgroundColor: "rgba(245, 158, 11, 0.2)",
                color: "#fde68a",
                fontSize: 13,
                fontWeight: 700,
                padding: "4px 12px",
                borderRadius: 6,
                border: "1px solid #f59e0b",
              }}
            >
              NDPS ACT (NARCOTICS)
            </span>
            <span
              style={{
                backgroundColor: "rgba(56, 189, 248, 0.2)",
                color: "#bae6fd",
                fontSize: 13,
                fontWeight: 700,
                padding: "4px 12px",
                borderRadius: 6,
                border: "1px solid #38bdf8",
              }}
            >
              PMLA COURT ORDER
            </span>
          </div>
        </div>

        {/* Video Call Mockup Action Buttons */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 14,
          }}
        >
          <div
            style={{
              backgroundColor: "#dc2626",
              color: "#ffffff",
              border: "3px solid #000000",
              borderRadius: 14,
              padding: "14px 18px",
              textAlign: "center",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 19,
              fontWeight: 900,
              boxShadow: "4px 4px 0px #000000",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            <span>📵</span> DISCONNECT CALL
          </div>
          <div
            style={{
              backgroundColor: "#f59e0b",
              color: "#000000",
              border: "3px solid #000000",
              borderRadius: 14,
              padding: "14px 18px",
              textAlign: "center",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 19,
              fontWeight: 900,
              boxShadow: "4px 4px 0px #000000",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            <span>🚨</span> DIAL 1930 HELPLINE
          </div>
        </div>

        {/* SLAMMING FAKE STAMP OVERLAY */}
        <div
          style={{
            position: "absolute",
            top: "36%",
            left: "5%",
            right: "5%",
            transform: `scale(${stampSpring}) rotate(-7deg)`,
            opacity: stampSpring,
            backgroundColor: "#ff0033",
            color: "#ffffff",
            border: "5px solid #ffffff",
            borderRadius: 20,
            padding: "16px 20px",
            textAlign: "center",
            boxShadow: "0 10px 40px rgba(255, 0, 51, 0.7), 6px 6px 0px #000000",
            zIndex: 20,
          }}
        >
          <div
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 50,
              letterSpacing: 2,
              lineHeight: 1.05,
              textShadow: "2px 2px 0px #000000",
            }}
          >
            🛑 RUKO! YE 100% FAKE SCAM HAI!
          </div>
          <div
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 17,
              fontWeight: 800,
              letterSpacing: 1,
              marginTop: 4,
              color: "#fef08a",
            }}
          >
            POLICE VIDEO CALL PE ARREST NAHI KARTI!
          </div>
        </div>
      </div>

      {/* 3. SCAM TACTICS EXPOSURE CARD (Height: 340px) */}
      <div
        style={{
          height: 340,
          transform: `scale(${tacticsSpring})`,
          opacity: tacticsSpring,
          backgroundColor: "#ffffff",
          border: "4px solid #000000",
          borderRadius: 22,
          padding: "18px 24px",
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
            alignItems: "center",
            gap: 10,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 20,
            fontWeight: 900,
            color: "#0f172a",
          }}
        >
          <span>🎭</span> SCAMMERS KAISE DARATE HAIN:
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div
            style={{
              backgroundColor: "#fee2e2",
              border: "2px solid #ef4444",
              borderRadius: 12,
              padding: "10px 14px",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 15,
              fontWeight: 700,
              color: "#991b1b",
              lineHeight: 1.35,
            }}
          >
            👮‍♂️ <strong>Fake Police Station Setup:</strong> Scammer uniform pehen kar aur screen pe Supreme Court ka forged stamp dikhata hai.
          </div>
          <div
            style={{
              backgroundColor: "#fee2e2",
              border: "2px solid #ef4444",
              borderRadius: 12,
              padding: "10px 14px",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 15,
              fontWeight: 700,
              color: "#991b1b",
              lineHeight: 1.35,
            }}
          >
            🔒 <strong>Hostage In Own Home:</strong> "Room lock karo! Family ya lawyer ko bataya toh encounter aur direct jail hogi!"
          </div>
          <div
            style={{
              backgroundColor: "#fee2e2",
              border: "2px solid #ef4444",
              borderRadius: 12,
              padding: "10px 14px",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 15,
              fontWeight: 700,
              color: "#991b1b",
              lineHeight: 1.35,
            }}
          >
            💸 <strong>Fake "RBI Clearing":</strong> "Clearance ke liye sabhi bank accounts ka paisa sarkari audit account me bhejo."
          </div>
        </div>
      </div>

      {/* 4. CONSTITUTIONAL LAW DEFENSE CARD (Height: 250px) */}
      <div
        style={{
          height: 250,
          transform: `scale(${advisorySpring})`,
          opacity: advisorySpring,
          backgroundColor: "#fef9c3",
          border: "4px solid #ca8a04",
          borderRadius: 22,
          padding: "16px 22px",
          boxShadow: "6px 6px 0px #000000",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 28 }}>⚖️</span>
            <div>
              <div
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 19,
                  fontWeight: 900,
                  color: "#854d0e",
                }}
              >
                INDIAN LAW & MHA VERDICT:
              </div>
              <div
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 13,
                  fontWeight: 800,
                  color: "#a16207",
                }}
              >
                Constitution of India & CrPC Section 41A
              </div>
            </div>
          </div>
          <span
            style={{
              backgroundColor: "#ca8a04",
              color: "#ffffff",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              fontWeight: 900,
              padding: "4px 8px",
              borderRadius: 6,
            }}
          >
            MHA ADVISORY
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              border: "1.5px solid #eab308",
              borderRadius: 10,
              padding: "8px 12px",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 14,
              fontWeight: 700,
              color: "#713f12",
              lineHeight: 1.35,
            }}
          >
            🚫 <strong>Bharat ke kanoon me:</strong> WhatsApp ya Skype pe kisi ko arrest ya interrogate karne ka ZERO provision hai!
          </div>
          <div
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              border: "1.5px solid #eab308",
              borderRadius: 10,
              padding: "8px 12px",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 14,
              fontWeight: 700,
              color: "#713f12",
              lineHeight: 1.35,
            }}
          >
            📞 <strong>Direct Action:</strong> Aisa call aate hi turant disconnect karein aur National Helpline 1930 pe dial karein!
          </div>
        </div>

        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            fontWeight: 800,
            color: "#a16207",
            textAlign: "center",
          }}
        >
          🛡️ Impersonating police officers is punishable under IPC 419/420 & IT Act 66D
        </div>
      </div>
    </div>
  );
};
