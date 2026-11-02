import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface UpiPostponedSceneProps {
  durationInFrames: number;
}

export const UpiPostponedScene: React.FC<UpiPostponedSceneProps> = () => {
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

  const calendarSpring = spring({
    frame: frame - 6,
    fps,
    config: { damping: 12, stiffness: 130 },
  });

  const reasonsSpring = spring({
    frame: frame - 11,
    fps,
    config: { damping: 12, stiffness: 130 },
  });

  const takeawaySpring = spring({
    frame: frame - 16,
    fps,
    config: { damping: 12, stiffness: 130 },
  });

  const floatDisc = Math.sin((frame / fps) * Math.PI * 2) * 4;

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
            backgroundColor: "#f59e0b",
            color: "#451a03",
            border: "3.5px solid #000000",
            borderRadius: 999,
            padding: "8px 24px",
            boxShadow: "4px 4px 0px #000000",
          }}
        >
          <span style={{ fontSize: 22 }}>⏸️</span>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 18,
              fontWeight: 900,
              letterSpacing: 1.5,
              textTransform: "uppercase",
            }}
          >
            FESTIVE SEASON ROLLBACK
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
            DIWALI TAK TAAL DIYA GAYA!
          </div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 20,
              fontWeight: 800,
              color: "#d97706",
              marginTop: 6,
              letterSpacing: 0.5,
            }}
          >
            15 October Ko Implement Hona Tha, Par Delay Kyun Hua? 🪔
          </div>
        </div>
      </div>

      {/* 2. 3D CALENDAR & FESTIVAL STAGE (Height: 500px) */}
      <div
        style={{
          height: 500,
          transform: `scale(${calendarSpring})`,
          opacity: calendarSpring,
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
            📅 Implementation Timeline Shift
          </span>
          <span
            style={{
              backgroundColor: "#fef3c7",
              color: "#92400e",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 14,
              fontWeight: 900,
              padding: "4px 12px",
              borderRadius: 8,
              border: "2px solid #000000",
            }}
          >
            POST-DIWALI TBA
          </span>
        </div>

        {/* 3D Timeline Visual: 15 Oct -> Diwali -> Next Date */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            gap: 16,
          }}
        >
          {/* Old Target Date */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              transform: `translateY(${floatDisc}px)`,
            }}
          >
            <div
              style={{
                width: 125,
                height: 125,
                borderRadius: "50%",
                background: "radial-gradient(circle at 35% 35%, #fca5a5, #ef4444 60%, #991b1b 100%)",
                border: "4px solid #000000",
                boxShadow: "0 10px 20px rgba(239, 68, 68, 0.4), inset -4px -4px 8px rgba(0,0,0,0.4)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
              }}
            >
              <span style={{ fontSize: 32 }}>❌</span>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 12,
                  fontWeight: 900,
                  marginTop: 2,
                }}
              >
                TARGET
              </span>
            </div>

            <div
              style={{
                fontFamily: "'Cabinet Grotesk', sans-serif",
                fontSize: 24,
                fontWeight: 950,
                color: "#dc2626",
                marginTop: 10,
              }}
            >
              15 October
            </div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 13,
                fontWeight: 800,
                color: "#991b1b",
                backgroundColor: "#fef2f2",
                border: "1.5px solid #fecaca",
                borderRadius: 6,
                padding: "2px 8px",
                marginTop: 4,
              }}
            >
              Planned Launch
            </div>
          </div>

          {/* Center Diya Symbol */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              width: 100,
            }}
          >
            <span style={{ fontSize: 36 }}>🪔</span>
            <div
              style={{
                backgroundColor: "#fef08a",
                border: "2px solid #000000",
                borderRadius: 8,
                padding: "4px 8px",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                fontWeight: 900,
                textAlign: "center",
                color: "#854d0e",
              }}
            >
              FESTIVE RUSH
            </div>
          </div>

          {/* New Timeline */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              transform: `translateY(${-floatDisc}px)`,
            }}
          >
            <div
              style={{
                width: 125,
                height: 125,
                borderRadius: "50%",
                background: "radial-gradient(circle at 35% 35%, #fde047, #eab308 60%, #854d0e 100%)",
                border: "4px solid #000000",
                boxShadow: "0 10px 20px rgba(234, 179, 8, 0.4), inset -4px -4px 8px rgba(0,0,0,0.4)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
              }}
            >
              <span style={{ fontSize: 32 }}>⏳</span>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 12,
                  fontWeight: 900,
                  marginTop: 2,
                }}
              >
                ON HOLD
              </span>
            </div>

            <div
              style={{
                fontFamily: "'Cabinet Grotesk', sans-serif",
                fontSize: 24,
                fontWeight: 950,
                color: "#b45309",
                marginTop: 10,
              }}
            >
              Post-Diwali
            </div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 13,
                fontWeight: 800,
                color: "#78350f",
                backgroundColor: "#fefce8",
                border: "1.5px solid #fef08a",
                borderRadius: 6,
                padding: "2px 8px",
                marginTop: 4,
              }}
            >
              Date Awaited
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
            <span style={{ fontSize: 20 }}>📢</span>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 15,
                fontWeight: 700,
                color: "#ffffff",
              }}
            >
              Retail trader associations ne festive season me boycott ka darr dikhaya tha!
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
            PUSHBACK
          </span>
        </div>
      </div>

      {/* 3. 3 REASONS WHY IT WAS DELAYED (Height: 410px) */}
      <div
        style={{
          height: 410,
          transform: `scale(${reasonsSpring})`,
          opacity: reasonsSpring,
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
            🔍 3 Reasons The Fee Plan Was Postponed
          </span>
          <span
            style={{
              backgroundColor: "#ef4444",
              color: "#ffffff",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 13,
              fontWeight: 900,
              padding: "4px 10px",
              borderRadius: 6,
            }}
          >
            WHY DELAYED
          </span>
        </div>

        {/* Reason 1 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            border: "2px solid rgba(234, 179, 8, 0.4)",
            borderRadius: 16,
            padding: "12px 16px",
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              backgroundColor: "#eab308",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              flexShrink: 0,
              border: "2px solid #ffffff",
            }}
          >
            🪔
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
              Diwali Festive Sales Peak
            </div>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                fontWeight: 600,
                color: "#94a3b8",
              }}
            >
              Diwali par saal ki sabse zyada shopping hoti hai, koi friction nahi chahiye thi.
            </div>
          </div>
        </div>

        {/* Reason 2 */}
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
              width: 44,
              height: 44,
              borderRadius: "50%",
              backgroundColor: "#ef4444",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              flexShrink: 0,
              border: "2px solid #ffffff",
            }}
          >
            🏪
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
              Traders Said: "Card Jaisa Kharcha Kyun Dein?"
            </div>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                fontWeight: 600,
                color: "#94a3b8",
              }}
            >
              Dukaandaaron ne kaha ki agar UPI pe fee lagegi toh wo QR code hata denge.
            </div>
          </div>
        </div>

        {/* Reason 3 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            border: "2px solid rgba(56, 189, 248, 0.4)",
            borderRadius: 16,
            padding: "12px 16px",
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              backgroundColor: "#0ea5e9",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              flexShrink: 0,
              border: "2px solid #ffffff",
            }}
          >
            💵
          </div>
          <div>
            <div
              style={{
                fontFamily: "'Cabinet Grotesk', sans-serif",
                fontSize: 19,
                fontWeight: 900,
                color: "#7dd3fc",
              }}
            >
              Risk of Returning to Cash
            </div>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                fontWeight: 600,
                color: "#94a3b8",
              }}
            >
              Digital India ka vision ruk sakta tha agar log dobara cash par shift ho jate.
            </div>
          </div>
        </div>
      </div>

      {/* 4. TAKEAWAY BANNER (Height: 260px) */}
      <div
        style={{
          height: 260,
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
              AB CONSUMERS KE LIYE SABSE BADA PRO TIP!
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
              Agar dukaandar bole ki "UPI pe 2% extra lagega" toh kya karein?
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
            👉 Next: Bill me extra UPI charge dikhe toh pooch lo!
          </span>
          <span style={{ fontSize: 20 }}>🛡️</span>
        </div>
      </div>
    </div>
  );
};

