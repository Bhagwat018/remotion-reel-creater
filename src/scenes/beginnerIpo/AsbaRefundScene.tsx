import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface AsbaRefundSceneProps {
  durationInFrames: number;
}

export const AsbaRefundScene: React.FC<AsbaRefundSceneProps> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const tagEntrance = spring({
    frame: frame - 1,
    fps,
    config: { damping: 13, stiffness: 140 },
  });

  const headlineEntrance = spring({
    frame: frame - 4,
    fps,
    config: { damping: 12, stiffness: 150 },
  });

  const bankCardEntrance = spring({
    frame: frame - 8,
    fps,
    config: { damping: 12, stiffness: 140 },
  });

  const stepsEntrance = spring({
    frame: frame - 14,
    fps,
    config: { damping: 12, stiffness: 140 },
  });

  const securityBannerEntrance = spring({
    frame: frame - 20,
    fps,
    config: { damping: 12, stiffness: 150 },
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
        paddingTop: 190,
        paddingBottom: 380,
        paddingLeft: 60,
        paddingRight: 60,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 18,
        zIndex: 10,
      }}
    >
      {/* 1. SCENE HEADER */}
      <div
        style={{
          transform: `scale(${tagEntrance})`,
          opacity: tagEntrance,
          display: "flex",
          alignItems: "center",
          gap: 10,
          backgroundColor: "#dcfce7",
          border: "2.5px solid #16a34a",
          borderRadius: 999,
          padding: "8px 24px",
          boxShadow: "3px 3px 0px #16a34a",
        }}
      >
        <span style={{ fontSize: 18 }}>🛡️</span>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 16,
            fontWeight: 900,
            color: "#15803d",
            letterSpacing: "0.06em",
          }}
        >
          QUESTION #2 // ASBA BANK REFUND
        </span>
      </div>

      {/* 2. REASSURING HEADLINE */}
      <div
        style={{
          transform: `scale(${headlineEntrance})`,
          opacity: headlineEntrance,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: 4,
        }}
      >
        <span
          style={{
            fontFamily: "'Anton', sans-serif",
            fontSize: 66,
            fontWeight: 900,
            color: "#0f172a",
            letterSpacing: "0.02em",
            textTransform: "uppercase",
            lineHeight: 1.05,
          }}
        >
          NOT ALLOTTED?{" "}
          <span
            style={{
              backgroundColor: "#22c55e",
              color: "#ffffff",
              padding: "2px 16px",
              borderRadius: 8,
              border: "3px solid #000000",
              boxShadow: "4px 4px 0px #000000",
            }}
          >
            PAISA SAFE HAI!
          </span>
        </span>
      </div>

      {/* 3. BANK SMS / PUSH NOTIFICATION SIMULATOR */}
      <div
        style={{
          width: "100%",
          maxWidth: 920,
          backgroundColor: "#ffffff",
          border: "3.5px solid #000000",
          borderRadius: 22,
          padding: "20px 24px",
          boxShadow: "6px 6px 0px #000000",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transform: `scale(${bankCardEntrance})`,
          opacity: bankCardEntrance,
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              backgroundColor: "#1e293b",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 26,
              fontWeight: 900,
              border: "2px solid #000000",
            }}
          >
            🏦
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 22,
                fontWeight: 900,
                color: "#0f172a",
              }}
            >
              BANK ASBA HOLD: ₹14,850
            </span>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 14,
                fontWeight: 700,
                color: "#16a34a",
              }}
            >
              Money was only BLOCKED, not debited!
            </span>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#22c55e",
            color: "#ffffff",
            borderRadius: 10,
            padding: "8px 14px",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 14,
            fontWeight: 900,
            border: "2px solid #000000",
            boxShadow: "2px 2px 0px #000000",
          }}
        >
          ✓ SAFE
        </div>
      </div>

      {/* 4. THE TWO FACTS: PAISA KATA NAHI + AUTO UNBLOCK */}
      <div
        style={{
          width: "100%",
          maxWidth: 920,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
          transform: `scale(${stepsEntrance})`,
          opacity: stepsEntrance,
        }}
      >
        {/* FACT 1 */}
        <div
          style={{
            backgroundColor: "#fef3c7",
            border: "3px solid #d97706",
            borderRadius: 20,
            padding: "18px 16px",
            boxShadow: "5px 5px 0px #d97706",
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 24 }}>🔒</span>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 20,
                fontWeight: 900,
                color: "#92400e",
              }}
            >
              SIRF BLOCK THA
            </span>
          </div>
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 15,
              fontWeight: 700,
              color: "#78350f",
              lineHeight: 1.3,
            }}
          >
            Bank ne aapka balance sirf hold kiya tha. Paisa account se bahar nahi gaya.
          </div>
        </div>

        {/* FACT 2 */}
        <div
          style={{
            backgroundColor: "#dcfce7",
            border: "3px solid #16a34a",
            borderRadius: 20,
            padding: "18px 16px",
            boxShadow: "5px 5px 0px #16a34a",
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 24 }}>⚡</span>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 20,
                fontWeight: 900,
                color: "#166534",
              }}
            >
              AUTO UNBLOCK
            </span>
          </div>
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 15,
              fontWeight: 700,
              color: "#14532d",
              lineHeight: 1.3,
            }}
          >
            Listing se pehle bank apne aap hold release kar deta hai. Kuch karne ki zaroorat nahi!
          </div>
        </div>
      </div>

      {/* 5. ANTI-SCAM WARNING BANNER */}
      <div
        style={{
          width: "100%",
          maxWidth: 920,
          backgroundColor: "#fee2e2",
          border: "3.5px solid #ef4444",
          borderRadius: 18,
          padding: "14px 22px",
          boxShadow: "5px 5px 0px #ef4444",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transform: `scale(${securityBannerEntrance * pulse})`,
          opacity: securityBannerEntrance,
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 22 }}>⚠️</span>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 18,
              fontWeight: 900,
              color: "#991b1b",
            }}
          >
            ALERT: Refund ke naam pe kisi unknown link pe OTP mat dena!
          </span>
        </div>
        <div
          style={{
            backgroundColor: "#ef4444",
            color: "#ffffff",
            borderRadius: 6,
            padding: "4px 8px",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            fontWeight: 900,
          }}
        >
          SCAM ALERT
        </div>
      </div>
    </div>
  );
};

