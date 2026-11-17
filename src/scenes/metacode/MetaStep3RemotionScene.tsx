import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneLayout } from "../../components/SceneLayout";

export interface MetaStep3RemotionSceneProps {
  id?: string;
  leadIn?: string;
  headline?: string;
  brollVideo?: string;
  durationInFrames: number;
}

export const MetaStep3RemotionScene: React.FC<MetaStep3RemotionSceneProps> = ({
  id,
  leadIn = "⚡ STEP 03: ZERO PREMIERE PRO",
  headline = "REACT AUR REMOTION NE HAR FRAME KO *MATHEMATICALLY RENDER* KIYA!",
  brollVideo = "broll/binary_cyber_stream.mp4",
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const comparisonSpring = spring({
    frame: frame - 4,
    fps,
    config: { damping: 14, stiffness: 130 },
  });

  const mathBoxSpring = spring({
    frame: frame - 12,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  const currentScale = (1 + Math.sin(frame * 0.1) * 0.05).toFixed(3);

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
          alignItems: "stretch",
          marginTop: 8,
          zIndex: 10,
        }}
      >
        {/* DUAL COMPARISON: PREMIERE PRO VS REACT */}
        <div
          style={{
            transform: `scale(${comparisonSpring}) translateY(${(1 - comparisonSpring) * 16}px)`,
            opacity: comparisonSpring,
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          {/* Premiere Pro Red Card */}
          <div
            style={{
              backgroundColor: "rgba(239, 68, 68, 0.14)",
              border: "2px solid rgba(239, 68, 68, 0.6)",
              borderRadius: 18,
              padding: "14px 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  backgroundColor: "rgba(239, 68, 68, 0.2)",
                  border: "1px solid #ef4444",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                }}
              >
                ❌
              </div>
              <div>
                <div style={{ fontFamily: "system-ui, sans-serif", fontSize: 24, fontWeight: 900, color: "#ffffff" }}>
                  Premiere Pro & After Effects
                </div>
                <div style={{ fontFamily: "monospace", fontSize: 15, color: "#f87171" }}>
                  Manual Keyframes • Heavy Rendering • 0% Code
                </div>
              </div>
            </div>

            <div
              style={{
                padding: "4px 12px",
                backgroundColor: "rgba(239, 68, 68, 0.25)",
                border: "1px solid #ef4444",
                borderRadius: 8,
                color: "#fca5a5",
                fontFamily: "monospace",
                fontSize: 15,
                fontWeight: 800,
              }}
            >
              DISCARDED
            </div>
          </div>

          {/* Remotion Green Card */}
          <div
            style={{
              backgroundColor: "rgba(16, 185, 129, 0.16)",
              border: "2.5px solid #10b981",
              borderRadius: 18,
              padding: "16px 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              boxShadow: "0 12px 30px rgba(16, 185, 129, 0.3)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  backgroundColor: "rgba(16, 185, 129, 0.25)",
                  border: "1.5px solid #10b981",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                }}
              >
                ⚛️
              </div>
              <div>
                <div style={{ fontFamily: "system-ui, sans-serif", fontSize: 24, fontWeight: 900, color: "#ffffff" }}>
                  React 19 + Remotion 4.0
                </div>
                <div style={{ fontFamily: "monospace", fontSize: 15, color: "#34d399" }}>
                  Deterministic Physics • 60 FPS Headless Chromium
                </div>
              </div>
            </div>

            <div
              style={{
                padding: "4px 12px",
                backgroundColor: "rgba(16, 185, 129, 0.3)",
                border: "1px solid #10b981",
                borderRadius: 8,
                color: "#6ee7b7",
                fontFamily: "monospace",
                fontSize: 15,
                fontWeight: 900,
              }}
            >
              ACTIVE ENGINE
            </div>
          </div>
        </div>

        {/* MATHEMATICAL CODE CALCULATION WINDOW */}
        <div
          style={{
            transform: `scale(${mathBoxSpring}) translateY(${(1 - mathBoxSpring) * 16}px)`,
            opacity: mathBoxSpring,
            backgroundColor: "rgba(15, 23, 42, 0.95)",
            backdropFilter: "blur(20px)",
            border: "2px solid rgba(56, 189, 248, 0.4)",
            borderRadius: 20,
            overflow: "hidden",
            boxShadow: "0 16px 40px rgba(0,0,0,0.6)",
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(10, 15, 30, 0.9)",
              padding: "10px 18px",
              borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
              display: "flex",
              justifyContent: "space-between",
              fontFamily: "monospace",
              fontSize: 15,
              color: "#94a3b8",
            }}
          >
            <span>📐 MATHEMATICAL FRAME CALCULATION</span>
            <span style={{ color: "#38bdf8", fontWeight: 700 }}>renderFrame(n)</span>
          </div>

          <div
            style={{
              padding: "16px 20px",
              fontFamily: "monospace",
              fontSize: 18,
              lineHeight: 1.5,
              color: "#e2e8f0",
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            <div><span style={{ color: "#f43f5e" }}>const</span> springVal = <span style={{ color: "#38bdf8" }}>spring</span>&#40;&#123; frame: {frame}, fps: 60, damping: 12 &#125;&#41;;</div>
            <div><span style={{ color: "#f43f5e" }}>const</span> opacity = <span style={{ color: "#38bdf8" }}>interpolate</span>&#40;frame, [0, 30], [0, 1]&#41;;</div>
            <div style={{ color: "#64748b" }}>// Every pixel calculated mathematically at 60 FPS</div>
            <div style={{ color: "#10b981", fontWeight: 700 }}>
              return &lt;DomCanvas transform=&#123;`scale($&#123;springVal&#125;)`&#125; /&gt;;
            </div>
          </div>

          <div
            style={{
              backgroundColor: "rgba(10, 15, 30, 0.95)",
              padding: "10px 18px",
              borderTop: "1px solid rgba(255, 255, 255, 0.08)",
              display: "flex",
              justifyContent: "space-between",
              fontFamily: "monospace",
              fontSize: 15,
            }}
          >
            <span style={{ color: "#fbbf24", fontWeight: 800 }}>LIVE FRAME: #{frame}</span>
            <span style={{ color: "#34d399", fontWeight: 800 }}>SCALE: {currentScale}x</span>
            <span style={{ color: "#38bdf8", fontWeight: 800 }}>FPS: 60.00</span>
          </div>
        </div>
      </div>
    </SceneLayout>
  );
};
