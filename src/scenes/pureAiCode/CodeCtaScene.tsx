import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface CodeCtaSceneProps {
  durationInFrames: number;
}

export const CodeCtaScene: React.FC<CodeCtaSceneProps> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const ctaSpring = spring({
    frame: frame - 2,
    fps,
    config: { damping: 11, stiffness: 140 },
  });

  const terminalSpring = spring({
    frame: frame - 6,
    fps,
    config: { damping: 13, stiffness: 130 },
  });

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: 1080,
        height: 1920,
        paddingTop: 110,
        paddingBottom: 480,
        paddingLeft: 48,
        paddingRight: 48,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        gap: 24,
        zIndex: 10,
      }}
    >
      {/* HEADER */}
      <div style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: 10 }}>
        <div
          style={{
            fontFamily: "monospace",
            fontSize: 22,
            letterSpacing: 4,
            fontWeight: 800,
            color: "#10b981",
          }}
        >
          OPEN SOURCE BLUEPRINT 🎁
        </div>
        <div
          style={{
            fontFamily: "system-ui, sans-serif",
            fontSize: 48,
            fontWeight: 900,
            color: "#ffffff",
            textTransform: "uppercase",
            letterSpacing: -1,
          }}
        >
          BUILD REELS WITH PURE CODE
        </div>
      </div>

      {/* TERMINAL BOX */}
      <div
        style={{
          transform: `scale(${terminalSpring})`,
          opacity: terminalSpring,
          backgroundColor: "rgba(10, 15, 30, 0.92)",
          border: "2px solid rgba(16, 185, 129, 0.4)",
          borderRadius: 24,
          overflow: "hidden",
          boxShadow: "0 20px 50px rgba(0,0,0,0.6)",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.95)",
            padding: "16px 22px",
            borderBottom: "1.5px solid rgba(255,255,255,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", gap: 8 }}>
            <div style={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: "#ef4444" }} />
            <div style={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: "#f59e0b" }} />
            <div style={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: "#22c55e" }} />
          </div>
          <span style={{ fontFamily: "monospace", fontSize: 18, color: "#94a3b8", fontWeight: 700 }}>
            bash — zsh — 1080x1920
          </span>
          <span style={{ fontFamily: "monospace", fontSize: 18, color: "#34d399", fontWeight: 800 }}>
            ● ONLINE
          </span>
        </div>

        <div
          style={{
            padding: "24px 28px",
            fontFamily: "monospace",
            fontSize: 24,
            lineHeight: 1.7,
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <div style={{ color: "#38bdf8" }}>
            <span style={{ color: "#34d399" }}>$</span> npx create-code-reel --ai-native
          </div>
          <div style={{ color: "#94a3b8" }}>
            ✔ Connecting LLM Agent (Claude 3.7) ... [READY]
          </div>
          <div style={{ color: "#94a3b8" }}>
            ✔ Mounting Remotion Canvas Engine ... [60 FPS]
          </div>
          <div style={{ color: "#fbbf24", fontWeight: 700 }}>
            ★ Type "BUILD" in comments to clone this setup!
          </div>
        </div>
      </div>

      {/* GLOWING CALL TO ACTION HERO CARD */}
      <div
        style={{
          transform: `scale(${ctaSpring})`,
          opacity: ctaSpring,
          backgroundColor: "rgba(16, 185, 129, 0.12)",
          border: "2.5px solid #10b981",
          borderRadius: 26,
          padding: "30px 24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
          boxShadow: "0 0 40px rgba(16, 185, 129, 0.25), 0 20px 50px rgba(0,0,0,0.5)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            backgroundColor: "#10b981",
            color: "#022c22",
            fontFamily: "monospace",
            fontSize: 22,
            fontWeight: 900,
            padding: "8px 24px",
            borderRadius: 999,
            letterSpacing: 2,
          }}
        >
          COMMENT TRIGGER 👇
        </div>

        <div
          style={{
            fontFamily: "system-ui, sans-serif",
            fontSize: 54,
            fontWeight: 900,
            color: "#ffffff",
            letterSpacing: -1,
          }}
        >
          Comment <span style={{ color: "#34d399", textDecoration: "underline" }}>"BUILD"</span>
        </div>

        <div
          style={{
            fontFamily: "system-ui, sans-serif",
            fontSize: 24,
            color: "#cbd5e1",
            fontWeight: 600,
            maxWidth: 700,
          }}
        >
          Main aapko complete architecture, Remotion code aur setup guide DM kar dunga!
        </div>
      </div>

      {/* TECH CREATOR HANDLE */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 12,
          fontFamily: "monospace",
          fontSize: 22,
          color: "#94a3b8",
        }}
      >
        <span>Follow</span>
        <span style={{ color: "#38bdf8", fontWeight: 800 }}>@techwith.GenZ</span>
        <span>for daily AI & Code breakthroughs 🚀</span>
      </div>
    </div>
  );
};

