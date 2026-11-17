import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneLayout } from "../../components/SceneLayout";

export interface CapacitiveMatrixSceneProps {
  id?: string;
  leadIn?: string;
  headline?: string;
  brollVideo?: string;
  durationInFrames: number;
}

export const CapacitiveMatrixScene: React.FC<CapacitiveMatrixSceneProps> = ({
  id,
  leadIn = "🔬 INSIDE THE DISPLAY",
  headline = "THE 4-LAYER CAPACITIVE MATRIX",
  brollVideo = "broll/display_layers_exploded.mp4",
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Traveling electrical pulse along the grid
  const pulseX = (frame * 6) % 360;
  const pulseY = (frame * 5) % 360;

  // Expanding ripple at the touch point
  const ripple1 = (frame * 4) % 120;
  const rippleOpacity = interpolate(ripple1, [0, 80, 120], [0.9, 0.4, 0]);

  const layers = [
    { num: "01", name: "Gorilla Glass Shield", detail: "0.5mm Scratch-Resistant Glass", icon: "🛡️", color: "#38bdf8" },
    { num: "02", name: "ITO Electrode Grid", detail: "Transparent Microscopic Wires", icon: "⚡", color: "#818cf8" },
    { num: "03", name: "Electrostatic Field", detail: "Uniform Voltage Distribution", icon: "📡", color: "#fbbf24" },
    { num: "04", name: "OLED Display Panel", detail: "120Hz Visual Pixel Substrate", icon: "🖥️", color: "#34d399" },
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
        {/* 1. BESPOKE ANIMATED CAPACITIVE MATRIX GRID (HUD SIMULATOR) */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: 220,
            background: "rgba(10, 15, 29, 0.88)",
            border: "3px solid #38bdf8",
            borderRadius: 20,
            boxShadow: "0 0 35px rgba(56, 189, 248, 0.35), 6px 6px 0px #000000",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 24px",
            boxSizing: "border-box",
          }}
        >
          {/* Interactive Touch Point with Ripple */}
          <svg
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
            }}
          >
            {/* Grid Lines */}
            {[40, 80, 120, 160, 200, 240, 280, 320, 360, 400, 440, 480].map((x) => (
              <line key={`x-${x}`} x1={x} y1="0" x2={x} y2="220" stroke="rgba(56, 189, 248, 0.2)" strokeWidth="1.5" />
            ))}
            {[30, 70, 110, 150, 190].map((y) => (
              <line key={`y-${y}`} x1="0" y1={y} x2="960" y2={y} stroke="rgba(56, 189, 248, 0.2)" strokeWidth="1.5" />
            ))}

            {/* Traveling Pulse Wires */}
            <line x1={pulseX + 100} y1="0" x2={pulseX + 100} y2="220" stroke="#38bdf8" strokeWidth="2.5" opacity="0.8" />
            <line x1="0" y1={pulseY + 20} x2="960" y2={pulseY + 20} stroke="#818cf8" strokeWidth="2.5" opacity="0.8" />

            {/* Simulated Finger Touch Point */}
            <circle cx="260" cy="110" r="16" fill="rgba(244, 63, 94, 0.35)" />
            <circle cx="260" cy="110" r={ripple1 * 0.6} fill="none" stroke="#f43f5e" strokeWidth="2.5" opacity={rippleOpacity} />
            <circle cx="260" cy="110" r="6" fill="#f43f5e" />
          </svg>

          {/* Left HUD Telemetry Box */}
          <div
            style={{
              zIndex: 2,
              background: "rgba(3, 7, 18, 0.85)",
              border: "2px solid #38bdf8",
              borderRadius: 14,
              padding: "10px 18px",
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            <div style={{ color: "#38bdf8", fontSize: 13, fontWeight: 900, letterSpacing: 2 }}>
              ITO MATRIX STATUS
            </div>
            <div style={{ color: "#f8fafc", fontSize: 20, fontWeight: 800, marginTop: 4 }}>
              UNIFORM FIELD // 5.0V
            </div>
          </div>

          {/* Right Touch Telemetry Box */}
          <div
            style={{
              zIndex: 2,
              background: "rgba(3, 7, 18, 0.85)",
              border: "2px solid #f43f5e",
              borderRadius: 14,
              padding: "10px 18px",
              fontFamily: "'JetBrains Mono', monospace",
              textAlign: "right",
            }}
          >
            <div style={{ color: "#f43f5e", fontSize: 13, fontWeight: 900, letterSpacing: 2 }}>
              ⚡ TOUCH DETECTED
            </div>
            <div style={{ color: "#f8fafc", fontSize: 20, fontWeight: 800, marginTop: 4 }}>
              VOLTAGE DROP: -32.4%
            </div>
          </div>
        </div>

        {/* 2. BESPOKE STACKED 4-LAYER ARCHITECTURE CARDS */}
        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 14 }}>
          {layers.map((layer, idx) => {
            const layerSpring = spring({
              frame: frame - (idx * 5 + 4),
              fps,
              config: { damping: 14, stiffness: 120 },
            });
            const scale = interpolate(layerSpring, [0, 1], [0.88, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const opacity = interpolate(layerSpring, [0, 1], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

            return (
              <div
                key={layer.num}
                style={{
                  transform: `scale(${scale})`,
                  opacity,
                  background: "#ffffff",
                  border: "3.5px solid #000000",
                  borderRadius: 18,
                  padding: "14px 22px",
                  boxShadow: "5px 5px 0px #000000",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div
                    style={{
                      width: 46,
                      height: 46,
                      borderRadius: 12,
                      background: `${layer.color}22`,
                      border: "2.5px solid #000000",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 24,
                    }}
                  >
                    {layer.icon}
                  </div>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: 12,
                          fontWeight: 800,
                          background: "#0f172a",
                          color: "#38bdf8",
                          padding: "2px 8px",
                          borderRadius: 6,
                        }}
                      >
                        LAYER {layer.num}
                      </span>
                      <span
                        style={{
                          fontFamily: "-apple-system, BlinkMacSystemFont, 'Inter', sans-serif",
                          fontSize: 24,
                          fontWeight: 900,
                          color: "#0f172a",
                        }}
                      >
                        {layer.name}
                      </span>
                    </div>
                    <div
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 15,
                        fontWeight: 600,
                        color: "#64748b",
                        marginTop: 2,
                      }}
                    >
                      {layer.detail}
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    background: `${layer.color}25`,
                    border: "2px solid #000000",
                    borderRadius: 10,
                    padding: "4px 14px",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 13,
                    fontWeight: 800,
                    color: "#0f172a",
                  }}
                >
                  ACTIVE
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SceneLayout>
  );
};

