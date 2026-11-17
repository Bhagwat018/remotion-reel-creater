import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneLayout } from "../../components/SceneLayout";

export interface AirplanePilotHeadsetBuzzSceneProps {
  id?: string;
  leadIn?: string;
  headline?: string;
  brollVideo?: string;
  durationInFrames: number;
}

export const AirplanePilotHeadsetBuzzScene: React.FC<AirplanePilotHeadsetBuzzSceneProps> = ({
  id,
  leadIn = "🎧 ELECTROMAGNETIC AUDIO INDUCTION",
  headline = "PILOT HEADSET AUDIO JAM: *IRRITATING 'BZZ-BZZ' SHOR!*",
  brollVideo = "broll/pilot_cockpit_headset.mp4",
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  // Simulated 217 Hz GSM TDMA buzz burst
  const isBuzzing = Math.floor(frame / 8) % 2 === 0;

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
          gap: 14,
          alignItems: "center",
          marginTop: 6,
          transform: `scale(${entrance})`,
        }}
      >
        {/* Cockpit Audio Monitor Header */}
        <div
          style={{
            width: "100%",
            backgroundColor: "rgba(15, 23, 42, 0.95)",
            border: "2px solid #f59e0b",
            borderRadius: 18,
            padding: "12px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 10px 30px rgba(245, 158, 11, 0.4)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 28 }}>🎧</span>
            <div>
              <div
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontWeight: 900,
                  fontSize: 17,
                  color: "#ffffff",
                }}
              >
                VHF COCKPIT RADIO AUDIO BUS
              </div>
              <div
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: 11,
                  color: "#fcd34d",
                }}
              >
                Frequency: 121.5 MHz • Unshielded Headset Cable Acting as Receiver
              </div>
            </div>
          </div>
          <div
            style={{
              padding: "4px 10px",
              backgroundColor: isBuzzing ? "rgba(239, 68, 68, 0.3)" : "rgba(245, 158, 11, 0.2)",
              border: isBuzzing ? "1.5px solid #ef4444" : "1.5px solid #f59e0b",
              borderRadius: 6,
              fontFamily: "JetBrains Mono, monospace",
              fontWeight: 800,
              fontSize: 12,
              color: isBuzzing ? "#fca5a5" : "#fef08a",
            }}
          >
            {isBuzzing ? "⚡ BZZ-BZZ INDUCTION" : "ATC RECEIVING"}
          </div>
        </div>

        {/* Audio Waveform & Interference Visualizer */}
        <div
          style={{
            width: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.98)",
            border: "3px solid #0f172a",
            borderRadius: 18,
            padding: "16px 20px",
            display: "flex",
            flexDirection: "column",
            gap: 12,
            boxShadow: "0 14px 35px rgba(0,0,0,0.7)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontWeight: 900,
                fontSize: 15,
                color: "#0f172a",
              }}
            >
              📻 AIR TRAFFIC CONTROL TRANSMISSION:
            </span>
            <span
              style={{
                padding: "2px 8px",
                backgroundColor: "#fee2e2",
                color: "#b91c1c",
                border: "1.5px solid #ef4444",
                borderRadius: 4,
                fontSize: 11,
                fontFamily: "JetBrains Mono, monospace",
                fontWeight: 800,
              }}
            >
              VOICE MUTED BY STATIC
            </span>
          </div>

          {/* Oscilloscope Waveform Display */}
          <div
            style={{
              width: "100%",
              height: 100,
              backgroundColor: "#020617",
              borderRadius: 10,
              border: "2px solid #1e293b",
              position: "relative",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
            }}
          >
            {/* Grid */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage:
                  "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />

            {/* Distorted Waveform */}
            <svg width="100%" height="100%" viewBox="0 0 800 100" preserveAspectRatio="none">
              <path
                d={
                  isBuzzing
                    ? "M 0 50 Q 80 50, 160 50 Q 200 10, 240 90 Q 280 10, 320 90 Q 360 10, 400 90 Q 440 10, 480 90 Q 520 10, 560 90 Q 600 50, 680 50 L 800 50"
                    : "M 0 50 Q 150 20, 300 70 Q 450 30, 600 65 L 800 50"
                }
                fill="none"
                stroke={isBuzzing ? "#ef4444" : "#22c55e"}
                strokeWidth="3.5"
                style={{ filter: isBuzzing ? "drop-shadow(0 0 8px #ef4444)" : "none" }}
              />
            </svg>

            {/* Static Sound Bubble */}
            {isBuzzing && (
              <div
                style={{
                  position: "absolute",
                  top: "20%",
                  left: "30%",
                  backgroundColor: "rgba(239, 68, 68, 0.95)",
                  color: "#ffffff",
                  padding: "4px 16px",
                  borderRadius: 6,
                  fontFamily: "Space Grotesk, sans-serif",
                  fontWeight: 900,
                  fontSize: 14,
                  letterSpacing: 1.5,
                  boxShadow: "0 4px 15px rgba(0,0,0,0.5)",
                }}
              >
                🔊 BZZ-BZZ-BZZ NOISE ACTIVE!
              </div>
            )}
          </div>

          <div
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 12,
              color: "#334155",
              lineHeight: 1.4,
            }}
          >
            Just like placing old phones near desktop speakers — radio pulses leak into pilot headphone wiring, drowning out critical runway orders!
          </div>
        </div>

        {/* Bottom Explainer Tag */}
        <div
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.92)",
            border: "1.5px solid rgba(255, 255, 255, 0.2)",
            borderRadius: 12,
            padding: "8px 20px",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span style={{ fontSize: 16 }}>⚠️</span>
          <span
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 13,
              color: "#e2e8f0",
            }}
          >
            A missed word from ATC during final approach can force an emergency go-around!
          </span>
        </div>
      </div>
    </SceneLayout>
  );
};

