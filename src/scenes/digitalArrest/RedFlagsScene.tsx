import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface RedFlagsSceneProps {
  durationInFrames: number;
}

export const RedFlagsScene: React.FC<RedFlagsSceneProps> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerSpring = spring({
    frame: frame - 1,
    fps,
    config: { damping: 12, stiffness: 150 },
  });

  const card1Spring = spring({
    frame: frame - 4,
    fps,
    config: { damping: 11, stiffness: 140 },
  });

  const card2Spring = spring({
    frame: frame - 8,
    fps,
    config: { damping: 11, stiffness: 140 },
  });

  const card3Spring = spring({
    frame: frame - 12,
    fps,
    config: { damping: 11, stiffness: 140 },
  });

  const comparisonSpring = spring({
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
            transform: `scale(${headerSpring})`,
            opacity: headerSpring,
            display: "flex",
            alignItems: "center",
            gap: 10,
            backgroundColor: "#ffffff",
            color: "#dc2626",
            border: "3.5px solid #000000",
            borderRadius: 999,
            padding: "8px 24px",
            boxShadow: "4px 4px 0px #000000",
          }}
        >
          <span style={{ fontSize: 22 }}>🚩</span>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 18,
              fontWeight: 900,
              letterSpacing: 1.5,
              textTransform: "uppercase",
            }}
          >
            WARNING INDICATORS
          </span>
        </div>

        <div
          style={{
            transform: `scale(${headerSpring})`,
            opacity: headerSpring,
            backgroundColor: "#ffffff",
            border: "4px solid #000000",
            borderRadius: 22,
            padding: "8px 20px",
            textAlign: "center",
            boxShadow: "6px 6px 0px #000000",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 48,
              color: "#dc2626",
              letterSpacing: 2,
              lineHeight: 1.1,
            }}
          >
            🚨 3 BIGGEST RED FLAGS
          </div>
          <div
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 16,
              fontWeight: 800,
              color: "#0f172a",
              marginTop: 2,
            }}
          >
            Ye signs dikhein toh turant samajh jao: 100% FRAUD!
          </div>
        </div>
      </div>

      {/* 2. THE 3 RED FLAGS (3 cards x 185px) */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {/* Flag 1 */}
        <div
          style={{
            height: 185,
            transform: `scale(${card1Spring})`,
            opacity: card1Spring,
            backgroundColor: "#fff1f2",
            border: "3.5px solid #000000",
            borderRadius: 20,
            padding: "14px 18px",
            boxShadow: "5px 5px 0px #000000",
            display: "flex",
            alignItems: "center",
            gap: 14,
            boxSizing: "border-box",
          }}
        >
          <span style={{ fontSize: 36 }}>🚫</span>
          <div style={{ display: "flex", flexDirection: "column", gap: 4, width: "100%" }}>
            <div
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 19,
                fontWeight: 900,
                color: "#991b1b",
              }}
            >
              1. CALL KAATNE SE ROKENGE
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
              "Phone disconnect kiya toh direct arrest warrant bhejenge" bol kar panic create karte hain taaki aap kisi se sach na pooch sako!
            </div>
            <div
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                border: "1px solid #f87171",
                borderRadius: 6,
                padding: "3px 8px",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                fontWeight: 800,
                color: "#991b1b",
              }}
            >
              💡 Legal Fact: Arrest warrants are NEVER served via phone or webcam.
            </div>
          </div>
        </div>

        {/* Flag 2 */}
        <div
          style={{
            height: 185,
            transform: `scale(${card2Spring})`,
            opacity: card2Spring,
            backgroundColor: "#fef2f2",
            border: "3.5px solid #000000",
            borderRadius: 20,
            padding: "14px 18px",
            boxShadow: "5px 5px 0px #000000",
            display: "flex",
            alignItems: "center",
            gap: 14,
            boxSizing: "border-box",
          }}
        >
          <span style={{ fontSize: 36 }}>🤐</span>
          <div style={{ display: "flex", flexDirection: "column", gap: 4, width: "100%" }}>
            <div
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 19,
                fontWeight: 900,
                color: "#991b1b",
              }}
            >
              2. FAMILY KO BATANE SE ROKENGE
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
              "Confidential national security case hai, kisi ko mat batana" bol kar isolate karte hain kyunki bachon ko pata chala toh bhanda phoot jayega!
            </div>
            <div
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                border: "1px solid #f87171",
                borderRadius: 6,
                padding: "3px 8px",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                fontWeight: 800,
                color: "#991b1b",
              }}
            >
              💡 Legal Fact: Under CrPC 50A, you have an absolute right to inform family.
            </div>
          </div>
        </div>

        {/* Flag 3 */}
        <div
          style={{
            height: 185,
            transform: `scale(${card3Spring})`,
            opacity: card3Spring,
            backgroundColor: "#fffbeb",
            border: "3.5px solid #000000",
            borderRadius: 20,
            padding: "14px 18px",
            boxShadow: "5px 5px 0px #000000",
            display: "flex",
            alignItems: "center",
            gap: 14,
            boxSizing: "border-box",
          }}
        >
          <span style={{ fontSize: 36 }}>💳</span>
          <div style={{ display: "flex", flexDirection: "column", gap: 4, width: "100%" }}>
            <div
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 19,
                fontWeight: 900,
                color: "#92400e",
              }}
            >
              3. PAISA TRANSFER KARWATE HAIN
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
              "Clearance verification ke liye RTGS/IMPS karo" bol kar saari savings loot lete hain. Real police NEVER asks for online money transfer!
            </div>
            <div
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                border: "1px solid #f59e0b",
                borderRadius: 6,
                padding: "3px 8px",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                fontWeight: 800,
                color: "#92400e",
              }}
            >
              💡 Legal Fact: Indian govt never conducts financial audit over UPI or RTGS.
            </div>
          </div>
        </div>
      </div>

      {/* 3. COMPARISON TABLE: REAL POLICE VS FAKE SCAMMER (Height: 380px) */}
      <div
        style={{
          height: 380,
          transform: `scale(${comparisonSpring})`,
          opacity: comparisonSpring,
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
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 19,
            fontWeight: 900,
            color: "#0f172a",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span>⚖️</span> REAL POLICE VS FAKE SCAMMER COMPARISON:
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
              backgroundColor: "#fee2e2",
              border: "2px solid #ef4444",
              borderRadius: 14,
              padding: "14px 16px",
            }}
          >
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 15,
                fontWeight: 900,
                color: "#dc2626",
              }}
            >
              ❌ FAKE SCAMMER
            </div>
            <div
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 14,
                fontWeight: 700,
                color: "#991b1b",
                marginTop: 6,
                lineHeight: 1.35,
              }}
            >
              • WhatsApp/Skype video call<br />
              • Demands room lock & total secrecy<br />
              • Instant arrest threat & pressure<br />
              • Demands bank transfer to 'clear' name
            </div>
          </div>

          <div
            style={{
              backgroundColor: "#d1fae5",
              border: "2px solid #10b981",
              borderRadius: 14,
              padding: "14px 16px",
            }}
          >
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 15,
                fontWeight: 900,
                color: "#059669",
              }}
            >
              ✅ REAL POLICE
            </div>
            <div
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 14,
                fontWeight: 700,
                color: "#065f46",
                marginTop: 6,
                lineHeight: 1.35,
              }}
            >
              • Physical written summons (CrPC 41A)<br />
              • In-person inquiry at local station<br />
              • NEVER asks for money or bank details<br />
              • Grants right to lawyer & family
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
            color: "#334155",
            textAlign: "center",
          }}
        >
          Remember: Police officer uniform pehen kar Skype pe interrogation kabhi nahi karta!
        </div>
      </div>

      {/* 4. BOTTOM GOLDEN DEFENSE RULE (Height: 215px) */}
      <div
        style={{
          height: 215,
          transform: `scale(${defenseSpring})`,
          opacity: defenseSpring,
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
            <span style={{ fontSize: 28 }}>💡</span>
            <div>
              <div
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 18,
                  fontWeight: 900,
                  color: "#854d0e",
                }}
              >
                GOLDEN DEFENSE PROTOCOL:
              </div>
              <div
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 13,
                  fontWeight: 800,
                  color: "#a16207",
                }}
              >
                Instant protection action for every citizen
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
              padding: "3px 8px",
              borderRadius: 6,
            }}
          >
            ACTION SHIELD
          </span>
        </div>

        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            border: "1.5px solid #eab308",
            borderRadius: 10,
            padding: "8px 12px",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 14,
            fontWeight: 800,
            color: "#713f12",
            lineHeight: 1.35,
          }}
        >
          Agar koi video call pe arrest ki dhamki de ya paise mange → samajh jao 100% FRAUD hai! Turant call disconnect karo aur 1930 pe report karo!
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
            gap: 8,
          }}
        >
          <div style={{ backgroundColor: "#fee2e2", border: "1px solid #ef4444", borderRadius: 6, padding: "4px 6px", textAlign: "center", fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 900, color: "#991b1b" }}>
            1. CUT CALL
          </div>
          <div style={{ backgroundColor: "#fef3c7", border: "1px solid #f59e0b", borderRadius: 6, padding: "4px 6px", textAlign: "center", fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 900, color: "#92400e" }}>
            2. OPEN DOOR
          </div>
          <div style={{ backgroundColor: "#e0f2fe", border: "1px solid #0284c7", borderRadius: 6, padding: "4px 6px", textAlign: "center", fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 900, color: "#075985" }}>
            3. TELL KIDS
          </div>
          <div style={{ backgroundColor: "#d1fae5", border: "1px solid #10b981", borderRadius: 6, padding: "4px 6px", textAlign: "center", fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 900, color: "#065f46" }}>
            4. DIAL 1930
          </div>
        </div>
      </div>
    </div>
  );
};
