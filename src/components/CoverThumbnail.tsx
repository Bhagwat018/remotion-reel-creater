import React from "react";
import { useTheme } from "../theme/theme";
import { FloatingBadge } from "./FloatingBadge";
import { ReelProps } from "../Reel";

export interface CoverThumbnailProps extends ReelProps {
  customTitle?: string;
  badgeText?: string;
}

export const CoverThumbnail: React.FC<CoverThumbnailProps> = ({
  meta,
  scenes = [],
  customTitle,
  badgeText,
}) => {
  const theme = useTheme();

  // Pick top scene headline or meta title as hook
  const rawTitle =
    customTitle ||
    scenes[0]?.headline ||
    meta?.topic ||
    meta?.title ||
    "MUST-HAVE DEV TOOLS";

  // Parse *accent* markers in title
  const parts: Array<{ text: string; isAccent: boolean }> = [];
  const regex = /\*([^*]+)\*/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(rawTitle)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ text: rawTitle.slice(lastIndex, match.index), isAccent: false });
    }
    parts.push({ text: match[1], isAccent: true });
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < rawTitle.length) {
    parts.push({ text: rawTitle.slice(lastIndex), isAccent: false });
  }

  // Detect featured tech logos from scenes or meta
  const detectedBrands: string[] = [];
  const checkString = `${meta?.topic || ""} ${scenes.map((s) => `${s.headline || ""} ${s.voice || ""}`).join(" ")}`;
  const candidateKeys = [
    "claude", "openai", "python", "docker", "redis", "postgres",
    "react", "typescript", "nextjs", "aws", "kubernetes", "tailwind",
  ];
  for (const key of candidateKeys) {
    if (new RegExp(`\\b${key}\\b`, "i").test(checkString)) {
      if (!detectedBrands.includes(key)) {
        detectedBrands.push(key);
      }
    }
  }

  const primaryBrand = detectedBrands[0] || "claude";
  const secondaryBrand = detectedBrands[1] || "python";
  const tertiaryBrand = detectedBrands[2] || "redis";

  const bannerBadge = badgeText || (meta?.topic ? "🔥 VIRAL TECH REEL" : "⚡ PRO DEV GUIDE");

  return (
    <div
      style={{
        position: "relative",
        width: 1080,
        height: 1920,
        backgroundColor: "#090d16",
        color: "#ffffff",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        fontFamily: theme.typography.headline,
      }}
    >
      {/* 1. Background Grid & High-Tech Glow Orbs */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(56, 189, 248, 0.05) 1.5px, transparent 1.5px), linear-gradient(90deg, rgba(56, 189, 248, 0.05) 1.5px, transparent 1.5px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }}
      />

      {/* Cyberpunk Radial Glow behind center */}
      <div
        style={{
          position: "absolute",
          top: "42%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.28) 0%, rgba(99, 102, 241, 0.15) 45%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      {/* 2. Top Banner Header (Above Instagram 1:1 grid crop) */}
      <div
        style={{
          paddingTop: 140,
          paddingLeft: 60,
          paddingRight: 60,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 10,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            background: "rgba(30, 41, 59, 0.8)",
            border: "1.5px solid rgba(56, 189, 248, 0.4)",
            borderRadius: 999,
            padding: "10px 24px",
            fontSize: 20,
            fontWeight: 800,
            letterSpacing: "0.08em",
            color: "#38bdf8",
            boxShadow: "0 0 20px rgba(56, 189, 248, 0.25)",
          }}
        >
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: "#22c55e",
              boxShadow: "0 0 10px #22c55e",
            }}
          />
          {bannerBadge}
        </div>

        <div
          style={{
            fontFamily: theme.typography.mono,
            fontSize: 22,
            fontWeight: 700,
            color: "#94a3b8",
            letterSpacing: "0.05em",
          }}
        >
          4K // 60 FPS
        </div>
      </div>

      {/* 3. Instagram 1:1 Grid Center Stage (Y: 420px to 1500px) */}
      {/* This area is 100% visible in Instagram's profile square thumbnail! */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 60px",
          zIndex: 10,
          textAlign: "center",
          marginTop: -40,
        }}
      >
        {/* Floating 3D Tech Logos Cluster */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 28,
            marginBottom: 36,
          }}
        >
          {/* Secondary Left Brand */}
          <div style={{ transform: "scale(0.85) translateY(12px)" }}>
            <FloatingBadge icon={secondaryBrand} forceEntrance={true} size={76} />
          </div>

          {/* Hero Center Brand (Big) */}
          <div style={{ transform: "scale(1.15) translateY(-8px)" }}>
            <FloatingBadge icon={primaryBrand} forceEntrance={true} size={110} />
          </div>

          {/* Tertiary Right Brand */}
          <div style={{ transform: "scale(0.85) translateY(12px)" }}>
            <FloatingBadge icon={tertiaryBrand} forceEntrance={true} size={76} />
          </div>
        </div>

        {/* Catchy Pill Hook */}
        <div
          style={{
            backgroundColor: "#f59e0b",
            color: "#0f172a",
            padding: "8px 24px",
            borderRadius: 8,
            fontSize: 26,
            fontWeight: 900,
            letterSpacing: "0.08em",
            marginBottom: 20,
            boxShadow: "0 8px 30px rgba(245, 158, 11, 0.45)",
            textTransform: "uppercase",
          }}
        >
          ⚡ STOP SCROLLING ⚡
        </div>

        {/* Massive Hook Headline with Dual Glow */}
        <h1
          style={{
            fontSize: 92,
            lineHeight: 1.04,
            fontWeight: 900,
            letterSpacing: "-0.03em",
            textTransform: "uppercase",
            margin: 0,
            padding: 0,
            textShadow: "0 10px 40px rgba(0, 0, 0, 0.9)",
            maxWidth: 960,
          }}
        >
          {parts.map((p, i) => (
            <span
              key={i}
              style={{
                color: p.isAccent ? "#38bdf8" : "#ffffff",
                textShadow: p.isAccent
                  ? "0 0 35px rgba(56, 189, 248, 0.6), 0 0 70px rgba(56, 189, 248, 0.3)"
                  : "0 10px 30px rgba(0,0,0,0.8)",
              }}
            >
              {p.text}
            </span>
          ))}
        </h1>

        {/* Sub-label benefit */}
        <p
          style={{
            fontFamily: theme.typography.ui,
            fontSize: 32,
            fontWeight: 700,
            color: "#cbd5e1",
            marginTop: 24,
            maxWidth: 820,
            lineHeight: 1.3,
            textShadow: "0 4px 15px rgba(0, 0, 0, 0.8)",
          }}
        >
          {meta?.topic || "Supercharge Your Coding Speed in 2026"}
        </p>
      </div>

      {/* 4. Bottom Footer (Channel branding + Save reminder) */}
      <div
        style={{
          paddingBottom: 160,
          paddingLeft: 60,
          paddingRight: 60,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 10,
        }}
      >
        {/* Creator Handle Pill */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            background: "linear-gradient(135deg, #2563eb, #7c3aed)",
            padding: "12px 28px",
            borderRadius: 999,
            boxShadow: "0 10px 30px rgba(37, 99, 235, 0.4)",
          }}
        >
          <span style={{ fontSize: 24 }}>🚀</span>
          <span
            style={{
              fontFamily: theme.typography.mono,
              fontSize: 24,
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "0.04em",
            }}
          >
            {meta?.handle || "@techwith.GenZ"}
          </span>
        </div>

        {/* Save / Bookmark CTA */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            background: "rgba(255, 255, 255, 0.08)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            padding: "12px 24px",
            borderRadius: 999,
            fontSize: 20,
            fontWeight: 800,
            color: "#f8fafc",
            letterSpacing: "0.05em",
          }}
        >
          <span>🔖</span>
          <span>SAVE FOR LATER</span>
        </div>
      </div>
    </div>
  );
};
