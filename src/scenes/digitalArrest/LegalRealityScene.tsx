import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface LegalRealitySceneProps {
  durationInFrames: number;
}

export const LegalRealityScene: React.FC<LegalRealitySceneProps> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerSpring = spring({
    frame: frame - 1,
    fps,
    config: { damping: 12, stiffness: 150 },
  });

  const heroLawSpring = spring({
    frame: frame - 4,
    fps,
    config: { damping: 11, stiffness: 140 },
  });

  const rightsSpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 12, stiffness: 130 },
  });

  const scVerdictSpring = spring({
    frame: frame - 14,
    fps,
    config: { damping: 12, stiffness: 130 },
  });

  const bottomSpring = spring({
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
            transform: `scale(${headerSpring})`,
            opacity: headerSpring,
            display: "flex",
            alignItems: "center",
            gap: 10,
            backgroundColor: "#ffffff",
            color: "#059669",
            border: "3.5px solid #000000",
            borderRadius: 999,
            padding: "8px 24px",
            boxShadow: "4px 4px 0px #000000",
          }}
        >
          <span style={{ fontSize: 22 }}>⚖️</span>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 18,
              fontWeight: 900,
              letterSpacing: 1.5,
              textTransform: "uppercase",
            }}
          >
            CONSTITUTIONAL REALITY & INDIAN LAW
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
              fontSize: 40,
              color: "#059669",
              letterSpacing: 1.5,
              lineHeight: 1.1,
            }}
          >
            🛡️ SACH YE HAI: NO "DIGITAL ARREST"!
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
            India me phone ya video call pe arrest hota hi nahi!
          </div>
        </div>
      </div>

      {/* 2. HERO LEGAL SHIELD CERTIFICATE CARD (Height: 350px) */}
      <div
        style={{
          height: 350,
          transform: `scale(${heroLawSpring})`,
          opacity: heroLawSpring,
          backgroundColor: "#ecfdf5",
          border: "4px solid #000000",
          borderRadius: 24,
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
            borderBottom: "2px dashed #059669",
            paddingBottom: 8,
          }}
        >
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 14,
              fontWeight: 900,
              color: "#065f46",
            }}
          >
            🏛️ SECTION 41A CrPC / BNSS SECTION 35
          </span>
          <span
            style={{
              backgroundColor: "#10b981",
              color: "#ffffff",
              fontSize: 12,
              fontWeight: 900,
              padding: "3px 8px",
              borderRadius: 6,
            }}
          >
            OFFICIAL MANDATE
          </span>
        </div>

        <div
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 21,
            fontWeight: 900,
            color: "#064e3b",
            lineHeight: 1.25,
          }}
        >
          "BHARAT KE KANOON ME 'DIGITAL ARREST' KA KOI EXISTENCE HI NAHI HAI!"
        </div>

        <div
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 14,
            fontWeight: 700,
            color: "#065f46",
            lineHeight: 1.35,
          }}
        >
          Supreme Court of India aur Ministry of Home Affairs (MHA) ne bilkul spasht kiya hai: Kisi bhi investigation agency (CBI, ED, Police) ko video call ke zariye kisi nagarik ko arrest ya detain karne ka adhikar nahi hai.
        </div>

        <div
          style={{
            backgroundColor: "#d1fae5",
            border: "1.5px solid #10b981",
            borderRadius: 10,
            padding: "6px 12px",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            fontWeight: 800,
            color: "#064e3b",
            textAlign: "center",
          }}
        >
          ✅ Legal Rule: Physical arrest requires uniformed officers with written warrant
        </div>
      </div>

      {/* 3. 3 UNBREAKABLE CITIZEN RIGHTS (Height: 380px) */}
      <div
        style={{
          height: 380,
          transform: `scale(${rightsSpring})`,
          opacity: rightsSpring,
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
            }}
          >
            ⚖️ AAPKE 3 KANOONI ADHIKAR (LEGAL RIGHTS):
          </div>
          <span
            style={{
              backgroundColor: "#dcfce7",
              color: "#15803d",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              fontWeight: 900,
              padding: "3px 8px",
              borderRadius: 6,
            }}
          >
            CrPC PROTECTED
          </span>
        </div>

        <div
          style={{
            backgroundColor: "#f8fafc",
            border: "1.5px solid #cbd5e1",
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
          <span style={{ fontSize: 26 }}>📄</span>
          <div>
            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, fontWeight: 900, color: "#0f172a" }}>
              1. Written Physical Notice (CrPC 41A):
            </div>
            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, fontWeight: 600, color: "#334155", marginTop: 2 }}>
              WhatsApp ya Skype pe notice invalid hai. Stamped physical summons compulsory hai.
            </div>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#f8fafc",
            border: "1.5px solid #cbd5e1",
            borderRadius: 12,
            padding: "10px 14px",
            display: "flex",
            alignItems: "center",
            gap: 12,
            flex: 1,
            marginBottom: 6,
          }}
        >
          <span style={{ fontSize: 26 }}>👨‍👩‍👧‍👦</span>
          <div>
            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, fontWeight: 900, color: "#0f172a" }}>
              2. Right to Inform Family (D.K. Basu Guidelines):
            </div>
            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, fontWeight: 600, color: "#334155", marginTop: 2 }}>
              Police aapko family ya doston se baat karne se kabhi rok nahi sakti.
            </div>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#f8fafc",
            border: "1.5px solid #cbd5e1",
            borderRadius: 12,
            padding: "10px 14px",
            display: "flex",
            alignItems: "center",
            gap: 12,
            flex: 1,
          }}
        >
          <span style={{ fontSize: 26 }}>⚖️</span>
          <div>
            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, fontWeight: 900, color: "#0f172a" }}>
              3. Right to Legal Counsel (Article 22):
            </div>
            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, fontWeight: 600, color: "#334155", marginTop: 2 }}>
              Kisi bhi inquiry se pehle aapko apne lawyer se consult karne ka poora adhikar hai.
            </div>
          </div>
        </div>
      </div>

      {/* 4. SUPREME COURT VERDICT CITATION (Height: 185px) */}
      <div
        style={{
          height: 185,
          transform: `scale(${scVerdictSpring})`,
          opacity: scVerdictSpring,
          backgroundColor: "#ffffff",
          border: "4px solid #000000",
          borderRadius: 20,
          padding: "14px 18px",
          boxShadow: "5px 5px 0px #000000",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 26 }}>🏛️</span>
          <div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 14,
                fontWeight: 900,
                color: "#059669",
              }}
            >
              SUPREME COURT OF INDIA DIRECTIVE
            </div>
            <div
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 12,
                fontWeight: 700,
                color: "#64748b",
              }}
            >
              Constitutional Protection under Article 21
            </div>
          </div>
        </div>
        <div
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 14,
            fontWeight: 700,
            color: "#334155",
            lineHeight: 1.35,
          }}
        >
          "No government agency can restrain an individual's personal liberty or movement remotely via digital communication."
        </div>
        <div
          style={{
            backgroundColor: "#ecfdf5",
            border: "1px solid #10b981",
            borderRadius: 6,
            padding: "3px 8px",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            fontWeight: 800,
            color: "#065f46",
            textAlign: "center",
          }}
        >
          ⚡ Remote webcam detention is unconstitutional & criminal extortion
        </div>
      </div>

      {/* 5. BOTTOM EMPOWERMENT RULE (Height: 200px) */}
      <div
        style={{
          height: 200,
          transform: `scale(${bottomSpring})`,
          opacity: bottomSpring,
          backgroundColor: "#fef08a",
          border: "4px solid #ca8a04",
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
            <span style={{ fontSize: 26 }}>💡</span>
            <div
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 17,
                fontWeight: 900,
                color: "#854d0e",
              }}
            >
              CITIZEN POWER SCRIPT (WHAT TO SAY):
            </div>
          </div>
          <span
            style={{
              backgroundColor: "#ca8a04",
              color: "#ffffff",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              fontWeight: 900,
              padding: "2px 7px",
              borderRadius: 5,
            }}
          >
            SHIELD
          </span>
        </div>

        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            border: "1.5px solid #eab308",
            borderRadius: 10,
            padding: "8px 12px",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 15,
            fontWeight: 800,
            color: "#713f12",
            lineHeight: 1.35,
          }}
        >
          "Apna police ID card dikhao, police station aake physical notice do, aur phone kaato!"
        </div>

        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            fontWeight: 800,
            color: "#854d0e",
            textAlign: "center",
          }}
        >
          ⚡ Scammers panic instantly when you demand physical jurisdiction
        </div>
      </div>
    </div>
  );
};
