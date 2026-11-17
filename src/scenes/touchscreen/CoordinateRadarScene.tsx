import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneLayout } from "../../components/SceneLayout";

export interface CoordinateRadarSceneProps {
  id?: string;
  leadIn?: string;
  headline?: string;
  brollVideo?: string;
  durationInFrames: number;
}

export const CoordinateRadarScene: React.FC<CoordinateRadarSceneProps> = ({
  id,
  leadIn = "🧠 240Hz TOUCH CONTROLLER",
  headline = "HOW EXACT PIXELS ARE LOCATED",
  brollVideo = "broll/microchip_touch_circuit.mp4",
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Radar sweep angle
  const radarAngle = (frame * 8) % 360;

  // Coordinate jitter / tracking simulation
  const coordX = 540 + Math.round(Math.sin(frame / 6) * 12);
  const coordY = 1120 + Math.round(Math.cos(frame / 6) * 18);

  const stats = [
    { label: "SCAN SPEED", value: "240 Hz", sub: "Every 4.16 Milliseconds", color: "#38bdf8", icon: "⚡" },
    { label: "LATENCY", value: "0.004 sec", sub: "Instant Zero Lag Feel", color: "#10b981", icon: "🚀" },
    { label: "X-AXIS DROP", value: `PIN #${Math.floor(coordX / 11)}`, sub: `Pos: ${coordX} px`, color: "#fbbf24", icon: "📍" },
    { label: "Y-AXIS DROP", value: `PIN #${Math.floor(coordY / 12)}`, sub: `Pos: ${coordY} px`, color: "#ec4899", icon: "🎯" },
  ];

  return (
    <SceneLayout
      id={id}
      leadIn={leadIn}
      headline={headline}
      brollVideo={brollVideo}
      durationInFrames={durationInFrames}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 960,
          display: "flex",
          flexDirection: "column",
          gap: 20,
          alignItems: "center",
          marginTop: 8,
        }}
      >
        {/* 1. BESPOKE 240Hz RADAR COORDINATE SCANNER */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: 250,
            background: "rgba(5, 10, 24, 0.92)",
            border: "3.5px solid #10b981",
            borderRadius: 22,
            boxShadow: "0 0 40px rgba(16, 185, 129, 0.35), 6px 6px 0px #000000",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px 28px",
            boxSizing: "border-box",
          }}
        >
          {/* Animated Circular Radar Grid */}
          <div
            style={{
              position: "relative",
              width: 210,
              height: 210,
              borderRadius: "50%",
              border: "2px solid rgba(16, 185, 129, 0.4)",
              background: "radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Concentric rings */}
            <div style={{ position: "absolute", width: 140, height: 140, borderRadius: "50%", border: "1.5px dashed rgba(16, 185, 129, 0.35)" }} />
            <div style={{ position: "absolute", width: 70, height: 70, borderRadius: "50%", border: "1.5px solid rgba(16, 185, 129, 0.5)" }} />

            {/* Rotating Radar Sweep Cone */}
            <div
              style={{
                position: "absolute",
                width: 105,
                height: 105,
                top: 0,
                right: 0,
                transformOrigin: "bottom left",
                transform: `rotate(${radarAngle}deg)`,
                background: "linear-gradient(45deg, rgba(16, 185, 129, 0.8) 0%, transparent 80%)",
                clipPath: "polygon(0 100%, 100% 0, 100% 100%)",
              }}
            />

            {/* Center target dot */}
            <circle cx="105" cy="105" r="4" fill="#10b981" />
            <div
              style={{
                position: "absolute",
                width: 14,
                height: 14,
                borderRadius: "50%",
                background: "#f43f5e",
                top: 80,
                left: 120,
                boxShadow: "0 0 16px #f43f5e",
              }}
            />
          </div>

          {/* Right Live Real-Time Telemetry Readout */}
          <div
            style={{
              flex: 1,
              marginLeft: 28,
              display: "flex",
              flexDirection: "column",
              gap: 12,
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            <div
              style={{
                display: "inline-block",
                alignSelf: "flex-start",
                background: "rgba(16, 185, 129, 0.18)",
                border: "1.5px solid #10b981",
                padding: "4px 14px",
                borderRadius: 20,
                color: "#10b981",
                fontSize: 12,
                fontWeight: 900,
                letterSpacing: 2,
              }}
            >
              ⚡ 240Hz SENSOR POLLING ACTIVE
            </div>

            <div style={{ color: "#f8fafc", fontSize: 28, fontWeight: 900, letterSpacing: "-0.01em" }}>
              X: {coordX} px &bull; Y: {coordY} px
            </div>

            <div style={{ color: "#94a3b8", fontSize: 15, fontWeight: 600 }}>
              &gt; Grid Intersect Pin #48 x #92
              <br />
              &gt; Voltage Drop: <span style={{ color: "#f43f5e", fontWeight: 800 }}>-32.4% Detected</span>
            </div>
          </div>
        </div>

        {/* 2. BESPOKE TELEMETRY DATA TILES (2x2 GRID) */}
        <div
          style={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
          }}
        >
          {stats.map((item, idx) => {
            const tileSpring = spring({
              frame: frame - (idx * 4 + 4),
              fps,
              config: { damping: 14, stiffness: 120 },
            });
            const scale = interpolate(tileSpring, [0, 1], [0.85, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const opacity = interpolate(tileSpring, [0, 1], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

            return (
              <div
                key={item.label}
                style={{
                  transform: `scale(${scale})`,
                  opacity,
                  background: "#ffffff",
                  border: "3.5px solid #000000",
                  borderRadius: 18,
                  padding: "16px 20px",
                  boxShadow: "5px 5px 0px #000000",
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 12,
                      fontWeight: 800,
                      color: "#64748b",
                      letterSpacing: 1.5,
                    }}
                  >
                    {item.label}
                  </span>
                  <span style={{ fontSize: 20 }}>{item.icon}</span>
                </div>

                <div
                  style={{
                    fontFamily: "-apple-system, BlinkMacSystemFont, 'Inter', sans-serif",
                    fontSize: 32,
                    fontWeight: 900,
                    color: "#0f172a",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {item.value}
                </div>

                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#64748b",
                  }}
                >
                  {item.sub}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SceneLayout>
  );
};

