import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface Emergency1930SceneProps {
  durationInFrames: number;
}

export const Emergency1930Scene: React.FC<Emergency1930SceneProps> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerSpring = spring({
    frame: frame - 1,
    fps,
    config: { damping: 12, stiffness: 150 },
  });

  const action1Spring = spring({
    frame: frame - 4,
    fps,
    config: { damping: 11, stiffness: 140 },
  });

  const action2Spring = spring({
    frame: frame - 8,
    fps,
    config: { damping: 11, stiffness: 140 },
  });

  const action3Spring = spring({
    frame: frame - 12,
    fps,
    config: { damping: 11, stiffness: 140 },
  });

  const portalSpring = spring({
    frame: frame - 16,
    fps,
    config: { damping: 12, stiffness: 130 },
  });

  const goldenSpring = spring({
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
            color: "#0284c7",
            border: "3.5px solid #000000",
            borderRadius: 999,
            padding: "8px 24px",
            boxShadow: "4px 4px 0px #000000",
          }}
        >
          <span style={{ fontSize: 22 }}>🛡️</span>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 18,
              fontWeight: 900,
              letterSpacing: 1.5,
              textTransform: "uppercase",
            }}
          >
            EMERGENCY DEFENSE PROTOCOL
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
              color: "#0f172a",
              letterSpacing: 1.5,
              lineHeight: 1.1,
            }}
          >
            ⚡ 3 STEPS TO SAVE YOUR MONEY
          </div>
          <div
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 16,
              fontWeight: 800,
              color: "#0284c7",
              marginTop: 4,
            }}
          >
            Pro Tip: Aisa call aaye toh bina dare ye 3 steps lo!
          </div>
        </div>
      </div>

      {/* 2. THE 3 TACTICAL ACTION TILES (3 x 165px) */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {/* Action 1 */}
        <div
          style={{
            height: 165,
            transform: `scale(${action1Spring})`,
            opacity: action1Spring,
            backgroundColor: "#fee2e2",
            border: "3.5px solid #000000",
            borderRadius: 20,
            padding: "12px 18px",
            boxShadow: "5px 5px 0px #000000",
            display: "flex",
            alignItems: "center",
            gap: 14,
            boxSizing: "border-box",
          }}
        >
          <span style={{ fontSize: 34 }}>🛑</span>
          <div style={{ display: "flex", flexDirection: "column", gap: 3, width: "100%" }}>
            <div
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 19,
                fontWeight: 900,
                color: "#991b1b",
              }}
            >
              STEP 1: CALL TURANT KAATO (HANG UP)
            </div>
            <div
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 14,
                fontWeight: 700,
                color: "#7f1d1d",
                lineHeight: 1.3,
              }}
            >
              Be-khauf ho kar phone disconnect karo aur number block karo. Scammer ki koi aukaat nahi ki wo police bhej sake!
            </div>
            <div
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                border: "1px solid #ef4444",
                borderRadius: 6,
                padding: "2px 8px",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                fontWeight: 800,
                color: "#991b1b",
              }}
            >
              ⚡ Action: Tap 'End Call' ➔ No arrest is ever valid over Skype/WhatsApp
            </div>
          </div>
        </div>

        {/* Action 2 */}
        <div
          style={{
            height: 165,
            transform: `scale(${action2Spring})`,
            opacity: action2Spring,
            backgroundColor: "#fef3c7",
            border: "3.5px solid #000000",
            borderRadius: 20,
            padding: "12px 18px",
            boxShadow: "5px 5px 0px #000000",
            display: "flex",
            alignItems: "center",
            gap: 14,
            boxSizing: "border-box",
          }}
        >
          <span style={{ fontSize: 34 }}>⛔</span>
          <div style={{ display: "flex", flexDirection: "column", gap: 3, width: "100%" }}>
            <div
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 19,
                fontWeight: 900,
                color: "#92400e",
              }}
            >
              STEP 2: PAISA MAT BHEJO (ZERO TRANSFER)
            </div>
            <div
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 14,
                fontWeight: 700,
                color: "#78350f",
                lineHeight: 1.3,
              }}
            >
              Chahe kitni bhi dhamki de, kisi bhi account ya UPI pe 1 rupaya mat bhejo. Police kabhi online paise nahi mangti!
            </div>
            <div
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                border: "1px solid #f59e0b",
                borderRadius: 6,
                padding: "2px 8px",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                fontWeight: 800,
                color: "#92400e",
              }}
            >
              💳 Strict Rule: Neither RBI nor Cyber Police has "safety audit accounts"
            </div>
          </div>
        </div>

        {/* Action 3 */}
        <div
          style={{
            height: 165,
            transform: `scale(${action3Spring})`,
            opacity: action3Spring,
            backgroundColor: "#d1fae5",
            border: "3.5px solid #000000",
            borderRadius: 20,
            padding: "12px 18px",
            boxShadow: "5px 5px 0px #000000",
            display: "flex",
            alignItems: "center",
            gap: 14,
            boxSizing: "border-box",
          }}
        >
          <span style={{ fontSize: 34 }}>📞</span>
          <div style={{ display: "flex", flexDirection: "column", gap: 3, width: "100%" }}>
            <div
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 19,
                fontWeight: 900,
                color: "#065f46",
              }}
            >
              STEP 3: 1930 PE CALL KARO (MHA HELPLINE)
            </div>
            <div
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 14,
                fontWeight: 700,
                color: "#047857",
                lineHeight: 1.3,
              }}
            >
              National Cybercrime Helpline 1930 dial karo aur turant caller ka number aur call details report karo!
            </div>
            <div
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                border: "1px solid #10b981",
                borderRadius: 6,
                padding: "2px 8px",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                fontWeight: 800,
                color: "#065f46",
              }}
            >
              ⚡ Toll-Free 24x7: Directly connected to Indian Cyber Crime Command (I4C)
            </div>
          </div>
        </div>
      </div>

      {/* 3. NATIONAL CYBERCRIME PORTAL (Height: 330px) */}
      <div
        style={{
          height: 330,
          transform: `scale(${portalSpring})`,
          opacity: portalSpring,
          backgroundColor: "#ffffff",
          border: "4px solid #000000",
          borderRadius: 22,
          padding: "18px 22px",
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
            borderBottom: "2px solid #e2e8f0",
            paddingBottom: 8,
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
            <span>🏛️</span> NATIONAL CYBER CRIME REPORTING PORTAL
          </div>
          <span
            style={{
              backgroundColor: "#dbeafe",
              color: "#1e40af",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 14,
              fontWeight: 900,
              padding: "4px 10px",
              borderRadius: 6,
            }}
          >
            24x7 ACTIVE
          </span>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 14,
          }}
        >
          <div
            style={{
              backgroundColor: "#f0fdf4",
              border: "2px solid #22c55e",
              borderRadius: 14,
              padding: "14px 16px",
            }}
          >
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 14,
                fontWeight: 900,
                color: "#15803d",
              }}
            >
              🌐 OFFICIAL PORTAL
            </div>
            <div
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 19,
                fontWeight: 900,
                color: "#166534",
                marginTop: 4,
              }}
            >
              cybercrime.gov.in
            </div>
            <div
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 14,
                fontWeight: 600,
                color: "#15803d",
                marginTop: 4,
              }}
            >
              File formal online FIR with caller's phone number & evidence
            </div>
          </div>

          <div
            style={{
              backgroundColor: "#eff6ff",
              border: "2px solid #3b82f6",
              borderRadius: 14,
              padding: "14px 16px",
            }}
          >
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 14,
                fontWeight: 900,
                color: "#1d4ed8",
              }}
            >
              ⚡ HELPLINE NUMBER
            </div>
            <div
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 19,
                fontWeight: 900,
                color: "#1e40af",
                marginTop: 4,
              }}
            >
              DIAL 1930
            </div>
            <div
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 14,
                fontWeight: 600,
                color: "#1d4ed8",
                marginTop: 4,
              }}
            >
              Toll-free emergency financial cyber response system
            </div>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#f8fafc",
            border: "1.5px dashed #94a3b8",
            borderRadius: 10,
            padding: "8px 12px",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 14,
            fontWeight: 800,
            color: "#475569",
            textAlign: "center",
          }}
        >
          🏦 Pro Tip: Apne bank branch ko turant inform karke debit freeze lagwao!
        </div>
      </div>

      {/* 4. THE GOLDEN 2 HOURS PROTOCOL (Height: 290px) */}
      <div
        style={{
          height: 290,
          transform: `scale(${goldenSpring})`,
          opacity: goldenSpring,
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
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 28 }}>⚡</span>
            <div>
              <div
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 18,
                  fontWeight: 900,
                  color: "#854d0e",
                }}
              >
                THE "GOLDEN 2 HOURS" RULE:
              </div>
              <div
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 13,
                  fontWeight: 800,
                  color: "#a16207",
                }}
              >
                Critical Financial Cyber Incident Recovery Window
              </div>
            </div>
          </div>
          <span
            style={{
              backgroundColor: "#ca8a04",
              color: "#ffffff",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              fontWeight: 900,
              padding: "3px 8px",
              borderRadius: 6,
            }}
          >
            INTER-BANK RECOVERY
          </span>
        </div>

        <div
          style={{
            backgroundColor: "#ffffff",
            border: "1.5px solid #ca8a04",
            borderRadius: 12,
            padding: "12px 14px",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 14,
            fontWeight: 700,
            color: "#713f12",
            lineHeight: 1.4,
          }}
        >
          Agar galti se kisi ne fraud account me paisa transfer kar diya ho, toh <strong>first 2 ghante ke andar</strong> 1930 call karne par MHA portal inter-bank freeze request bhej kar scammer ke account ko lock karwa deta hai!
        </div>

        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            border: "1px dashed #ca8a04",
            borderRadius: 8,
            padding: "4px 10px",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            fontWeight: 800,
            color: "#854d0e",
            textAlign: "center",
          }}
        >
          ⏱️ Don't wait. Every single minute counts before money gets routed to crypto.
        </div>
      </div>
    </div>
  );
};
