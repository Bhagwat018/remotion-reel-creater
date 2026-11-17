import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneLayout } from "../../components/SceneLayout";

export interface MetaStep4LipSyncSceneProps {
  id?: string;
  leadIn?: string;
  headline?: string;
  brollVideo?: string;
  durationInFrames: number;
}

export const MetaStep4LipSyncScene: React.FC<MetaStep4LipSyncSceneProps> = ({
  id,
  leadIn = "⚡ STEP 04: ALGORITHMIC VISEMES",
  headline = "IS AVATAR KA LIP-SYNC BHI *SOUNDWAVE KE ALGORITHM* SE DRIVEN HAI!",
  brollVideo = "broll/soundwave_particles.mp4",
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fftSpring = spring({
    frame: frame - 4,
    fps,
    config: { damping: 14, stiffness: 130 },
  });

  const avatarSyncSpring = spring({
    frame: frame - 12,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  const audioAmplitude = Math.abs(Math.sin(frame * 0.35)) * 0.8 + 0.2;
  const mouthScaleY = (0.3 + audioAmplitude * 0.7).toFixed(2);
  const dbLevel = (-18 + audioAmplitude * 8).toFixed(1);

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
          gap: 12,
          alignItems: "stretch",
          marginTop: 8,
          zIndex: 10,
        }}
      >
        {/* FFT SOUNDWAVE ANALYSIS CARD */}
        <div
          style={{
            transform: `scale(${fftSpring}) translateY(${(1 - fftSpring) * 16}px)`,
            opacity: fftSpring,
            backgroundColor: "rgba(15, 23, 42, 0.94)",
            backdropFilter: "blur(20px)",
            border: "2px solid rgba(245, 158, 11, 0.45)",
            borderRadius: 20,
            padding: "16px 22px",
            display: "flex",
            flexDirection: "column",
            gap: 10,
            boxShadow: "0 16px 40px rgba(0,0,0,0.6)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 14,
                  backgroundColor: "rgba(245, 158, 11, 0.15)",
                  border: "1.5px solid #f59e0b",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 24,
                }}
              >
                🌊
              </div>
              <div>
                <div style={{ fontFamily: "system-ui, sans-serif", fontSize: 24, fontWeight: 900, color: "#ffffff" }}>
                  Fast Fourier Transform (FFT)
                </div>
                <div style={{ fontFamily: "monospace", fontSize: 15, color: "#fbbf24", fontWeight: 700 }}>
                  Real-Time Spectral Frequency Breakdown
                </div>
              </div>
            </div>

            <div
              style={{
                padding: "4px 12px",
                backgroundColor: "rgba(245, 158, 11, 0.2)",
                border: "1px solid #f59e0b",
                borderRadius: 8,
                color: "#fde68a",
                fontFamily: "monospace",
                fontSize: 15,
                fontWeight: 800,
              }}
            >
              {dbLevel} dB
            </div>
          </div>

          {/* Dynamic Spectrum Equalizer */}
          <div
            style={{
              backgroundColor: "rgba(10, 15, 30, 0.85)",
              borderRadius: 12,
              padding: "12px 18px",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: 8,
              height: 70,
              boxSizing: "border-box",
            }}
          >
            {Array.from({ length: 18 }).map((_, i) => {
              const h = 8 + Math.abs(Math.sin((frame * 0.3) + i * 0.5)) * 52;
              const isHot = h > 45;

              return (
                <div
                  key={i}
                  style={{
                    width: 16,
                    height: h,
                    borderRadius: 4,
                    backgroundColor: isHot ? "#ef4444" : "#f59e0b",
                    boxShadow: `0 0 8px ${isHot ? "#ef4444" : "#f59e0b"}`,
                    transition: "height 0.04s ease",
                  }}
                />
              );
            })}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontFamily: "monospace",
              fontSize: 14,
              color: "#94a3b8",
            }}
          >
            <span>60Hz (Sub-Bass)</span>
            <span>1kHz (Vocal Cadence)</span>
            <span>8kHz (Presence)</span>
          </div>
        </div>

        {/* CONNECTOR ARROW */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ fontFamily: "monospace", fontSize: 18, color: "#f59e0b", fontWeight: 900 }}>
            ⬇ ALGORITHMIC VISEME MAPPING
          </div>
        </div>

        {/* AVATAR VISEME DRIVER CARD */}
        <div
          style={{
            transform: `scale(${avatarSyncSpring}) translateY(${(1 - avatarSyncSpring) * 16}px)`,
            opacity: avatarSyncSpring,
            backgroundColor: "rgba(15, 23, 42, 0.94)",
            backdropFilter: "blur(20px)",
            border: "2px solid rgba(56, 189, 248, 0.45)",
            borderRadius: 20,
            padding: "16px 22px",
            display: "flex",
            flexDirection: "column",
            gap: 10,
            boxShadow: "0 16px 40px rgba(0,0,0,0.6)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 14,
                  backgroundColor: "rgba(56, 189, 248, 0.15)",
                  border: "1.5px solid #38bdf8",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 24,
                }}
              >
                🗣️
              </div>
              <div>
                <div style={{ fontFamily: "system-ui, sans-serif", fontSize: 24, fontWeight: 900, color: "#ffffff" }}>
                  Speaking Avatar Lip-Sync
                </div>
                <div style={{ fontFamily: "monospace", fontSize: 15, color: "#38bdf8", fontWeight: 700 }}>
                  Driven Entirely by Soundwave Math
                </div>
              </div>
            </div>

            <div
              style={{
                padding: "4px 12px",
                backgroundColor: "rgba(16, 185, 129, 0.2)",
                border: "1px solid #10b981",
                borderRadius: 8,
                color: "#34d399",
                fontFamily: "monospace",
                fontSize: 15,
                fontWeight: 800,
              }}
            >
              ACTIVE LIP-SYNC
            </div>
          </div>

          <div
            style={{
              backgroundColor: "rgba(10, 15, 30, 0.85)",
              borderRadius: 12,
              padding: "12px 18px",
              fontFamily: "monospace",
              fontSize: 17,
              color: "#e2e8f0",
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            <div><span style={{ color: "#f43f5e" }}>const</span> isTalking = audioAmplitude &gt; 0.25;</div>
            <div><span style={{ color: "#f43f5e" }}>const</span> mouthScale = isTalking ? {mouthScaleY} : 0.2;</div>
            <div style={{ color: "#34d399", fontWeight: 700 }}>
              return &lt;MouthShape scaleY=&#123;mouthScale&#125; /&gt;;
            </div>
          </div>
        </div>
      </div>
    </SceneLayout>
  );
};
