import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { TechLogo } from "../../components/TechLogo";

export interface PhonePeStormSceneProps {
  durationInFrames: number;
}

export const PhonePeStormScene: React.FC<PhonePeStormSceneProps> = () => {
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

  const sebiEntrance = spring({
    frame: frame - 8,
    fps,
    config: { damping: 12, stiffness: 140 },
  });

  const chartEntrance = spring({
    frame: frame - 14,
    fps,
    config: { damping: 12, stiffness: 140 },
  });

  const pauseEntrance = spring({
    frame: frame - 20,
    fps,
    config: { damping: 12, stiffness: 150 },
  });

  // Animated wave fluctuation
  const waveShift = (frame * 5) % 180;
  const pulse = Math.sin(frame / 6) * 0.03 + 1;

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: 1080,
        height: 1920,
        paddingTop: 200,
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
      {/* 1. THEMATIC HEADER */}
      <div
        style={{
          transform: `scale(${tagEntrance})`,
          opacity: tagEntrance,
          display: "flex",
          alignItems: "center",
          gap: 10,
          backgroundColor: "#f3e8ff",
          border: "2.5px solid #9333ea",
          borderRadius: 999,
          padding: "8px 24px",
          boxShadow: "3px 3px 0px #9333ea",
        }}
      >
        <span style={{ fontSize: 18 }}>📱</span>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 16,
            fontWeight: 900,
            color: "#6b21a8",
            letterSpacing: "0.06em",
          }}
        >
          CASE STUDY // FINTECH UPI GIANT
        </span>
      </div>

      {/* 2. DEDICATED HEADLINE */}
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
          PHONEPE:{" "}
          <span
            style={{
              backgroundColor: "#5f259f",
              color: "#ffffff",
              padding: "2px 14px",
              borderRadius: 8,
              border: "3px solid #000000",
              boxShadow: "4px 4px 0px #000000",
            }}
          >
            SEBI YES, MARKET NO!
          </span>
        </span>
      </div>

      {/* 3. SEBI GREEN CLEARANCE CERTIFICATE */}
      <div
        style={{
          width: "100%",
          maxWidth: 920,
          backgroundColor: "#f0fdf4",
          border: "3.5px solid #16a34a",
          borderRadius: 22,
          padding: "18px 24px",
          boxShadow: "6px 6px 0px #16a34a",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transform: `scale(${sebiEntrance})`,
          opacity: sebiEntrance,
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              backgroundColor: "#5f259f",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "2.5px solid #000000",
              boxShadow: "2px 2px 0px #000000",
            }}
          >
            <TechLogo name="phonepe" size={32} />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 26,
                fontWeight: 900,
                color: "#0f172a",
              }}
            >
              SEBI CLEARANCE: GRANTED
            </span>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 15,
                fontWeight: 700,
                color: "#16a34a",
              }}
            >
              Regulatory green light obtained ✓
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
            fontSize: 15,
            fontWeight: 900,
            border: "2px solid #000000",
            boxShadow: "2px 2px 0px #000000",
          }}
        >
          APPROVED
        </div>
      </div>

      {/* 4. THE MARKET STORM RADAR / CRASH VOLATILITY BOX */}
      <div
        style={{
          width: "100%",
          maxWidth: 920,
          backgroundColor: "#090d16",
          border: "3.5px solid #ef4444",
          borderRadius: 22,
          padding: "20px 24px",
          boxShadow: "6px 6px 0px #ef4444",
          display: "flex",
          flexDirection: "column",
          gap: 14,
          transform: `scale(${chartEntrance})`,
          opacity: chartEntrance,
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 20 }}>⚠️</span>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 16,
                fontWeight: 900,
                color: "#f87171",
                letterSpacing: "0.06em",
              }}
            >
              MARKET VOLATILITY WAVE DETECTED
            </span>
          </div>
          <span
            style={{
              backgroundColor: "#dc2626",
              color: "#ffffff",
              padding: "4px 10px",
              borderRadius: 6,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              fontWeight: 800,
            }}
          >
            INDEX CHOPPY 📉
          </span>
        </div>

        {/* Dynamic fluctuating wave chart SVG */}
        <div
          style={{
            width: "100%",
            height: 90,
            backgroundColor: "rgba(239, 68, 68, 0.08)",
            borderRadius: 14,
            border: "2px solid rgba(239, 68, 68, 0.25)",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
          }}
        >
          <svg width="100%" height="90" viewBox="0 0 800 90" preserveAspectRatio="none">
            {/* Grid guide lines */}
            <line x1="0" y1="45" x2="800" y2="45" stroke="rgba(255,255,255,0.1)" strokeDasharray="4 4" />
            <line x1="0" y1="20" x2="800" y2="20" stroke="rgba(255,255,255,0.05)" />
            <line x1="0" y1="70" x2="800" y2="70" stroke="rgba(255,255,255,0.05)" />

            {/* Dynamic wave line */}
            <path
              d={`M 0 ${45 + Math.sin(waveShift * 0.1) * 20} Q 200 ${
                45 + Math.sin((waveShift + 60) * 0.1) * 35
              } 400 ${45 + Math.cos(waveShift * 0.1) * 25} T 800 ${
                45 + Math.sin((waveShift + 120) * 0.1) * 30
              }`}
              fill="none"
              stroke="#ef4444"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </svg>

          {/* Indicator dot */}
          <div
            style={{
              position: "absolute",
              right: 180,
              top: 45 + Math.sin(waveShift * 0.1) * 20 - 7,
              width: 14,
              height: 14,
              borderRadius: "50%",
              backgroundColor: "#fbbf24",
              boxShadow: "0 0 10px #fbbf24",
            }}
          />
        </div>

        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 16,
            color: "#cbd5e1",
            fontWeight: 600,
          }}
        >
          Secondary market corrections made high-valuation tech listings too risky.
        </div>
      </div>

      {/* 5. EMERGENCY PAUSE BANNER */}
      <div
        style={{
          width: "100%",
          maxWidth: 920,
          backgroundColor: "#fef08a",
          border: "3.5px solid #000000",
          borderRadius: 18,
          padding: "16px 22px",
          boxShadow: "5px 5px 0px #000000",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transform: `scale(${pauseEntrance * pulse})`,
          opacity: pauseEntrance,
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 26 }}>⏸️</span>
          <span
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: 26,
              color: "#0f172a",
              letterSpacing: "0.02em",
            }}
          >
            FOUNDERS PAUSED LAUNCH // POSTPONED TO 2027
          </span>
        </div>
        <div
          style={{
            backgroundColor: "#000000",
            color: "#ffffff",
            padding: "4px 10px",
            borderRadius: 6,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 13,
            fontWeight: 900,
          }}
        >
          STANDBY
        </div>
      </div>
    </div>
  );
};
