import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { ActiveWord, framesToSec } from "../lib/timing";
import { resolveFontFamily, useTheme } from "../theme/theme";

interface SpeakingAvatarProps {
  words: ActiveWord[];
  enabled?: boolean;
  position?: "left" | "right";
}

export const SpeakingAvatar: React.FC<SpeakingAvatarProps> = ({
  words,
  enabled = true,
  position = "left",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const theme = useTheme();

  if (!enabled) return null;

  const currentTimeSec = framesToSec(frame, fps);

  // Check if voice is actively speaking right now
  const activeWordIndex = words.findIndex(
    (w) => currentTimeSec >= w.startSec && currentTimeSec < w.endSec
  );
  const isSpeaking = activeWordIndex >= 0;

  // Window of words around current speaking word (stable 4-word window)
  let targetIndex = activeWordIndex;
  if (targetIndex < 0) {
    for (let i = words.length - 1; i >= 0; i--) {
      if (currentTimeSec >= words[i].endSec) {
        targetIndex = i;
        break;
      }
    }
    if (targetIndex < 0) targetIndex = 0;
  }
  const windowStart = Math.max(0, targetIndex - 1);
  const windowEnd = Math.min(words.length, windowStart + 4);
  const visibleWords = words.slice(windowStart, windowEnd);

  const hasText = visibleWords.length > 0;
  const sampleText = hasText ? visibleWords.map((w) => w.word).join(" ") : "Tech Breakdown";
  const fontFamily = resolveFontFamily(sampleText, theme.typography.ui);

  // Smart natural movements: subtle breathing + speech emphasis bobbing
  const speechBob = isSpeaking ? Math.sin((frame * Math.PI) / 4) * 2.5 : 0;
  const idleBob = Math.sin(frame / 12) * 2;
  const headTilt = Math.sin(frame / 24) * 1.8;

  // Eye blinking (blinks every ~110 frames for 4 frames)
  const isBlinking = frame % 110 < 4;

  // Natural speaking mouth oscillation (smooth, crisp lip flap)
  const flapPhase = Math.sin((frame * Math.PI) / 3.6);
  const speechFlap = isSpeaking ? Math.max(0, flapPhase) : 0;
  const isMouthOpen = isSpeaking && speechFlap > 0.25;
  const mouthOpening = Math.round(4 + speechFlap * 14);

  // Spring entrance on mount
  const entrance = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  const isLeft = position === "left";

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: 520,
        zIndex: 50,
        pointerEvents: "none",
      }}
    >
      {/* 1. SMART TECH CREATOR AVATAR (Modern Cyberpunk Lead Dev Persona) */}
      <div
        style={{
          position: "absolute",
          left: isLeft ? 80 : "auto",
          right: isLeft ? "auto" : 80,
          bottom: 0,
          width: 390,
          height: 490,
          transform: `scale(${entrance}) translateY(${idleBob + speechBob}px) rotate(${headTilt}deg)`,
          transformOrigin: isLeft ? "bottom left" : "bottom right",
          maskImage: "linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 50px)",
          WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 50px)",
        }}
      >
        <svg
          viewBox="0 0 240 290"
          width="390"
          height="490"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle Ambient Neon Base Glow */}
          <ellipse cx="120" cy="284" rx="90" ry="10" fill="rgba(56, 189, 248, 0.25)" filter="blur(6px)" />
          <ellipse cx="120" cy="282" rx="75" ry="8" fill="rgba(0,0,0,0.4)" />

          {/* Smart Matte Techwear Bomber Jacket (Dark Obsidian & Cyber Accents) */}
          <path
            d="M26 290 C26 218, 70 182, 120 182 C170 182, 214 218, 214 290 Z"
            fill="#090d16"
            stroke="#000000"
            strokeWidth="4"
          />

          {/* Jacket Cyber Accent Shoulders & Sleeves */}
          <path
            d="M26 290 C34 240, 56 208, 80 196"
            stroke="#1e293b"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M214 290 C206 240, 184 208, 160 196"
            stroke="#1e293b"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Inner Fitted Graphite Crewneck Shirt */}
          <path
            d="M92 182 C92 210, 148 210, 148 182 Z"
            fill="#1e293b"
            stroke="#000000"
            strokeWidth="3"
          />

          {/* High-Tech Cyber Collar Trim with Cyan Edge */}
          <path
            d="M80 184 L102 236 L120 250 L138 236 L160 184"
            stroke="#38bdf8"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Central Asymmetric Tech Zipper */}
          <line x1="120" y1="210" x2="120" y2="290" stroke="#000000" strokeWidth="4" />
          <line x1="120" y1="210" x2="120" y2="290" stroke="#475569" strokeWidth="2" strokeDasharray="3 3" />

          {/* Cyber Badge / Terminal Tag on Left Chest: ">_ CODE" */}
          <g transform="translate(142, 216)">
            <rect x="0" y="0" width="38" height="18" rx="5" fill="#030712" stroke="#38bdf8" strokeWidth="1.8" />
            <text x="5" y="13" fill="#38bdf8" fontSize="10" fontFamily="'JetBrains Mono', monospace" fontWeight="900">
              &gt;_
            </text>
            <circle cx="28" cy="9" r="2.5" fill="#10b981" />
          </g>

          {/* Anatomical Athletic Neck */}
          <path
            d="M104 142 L104 186 Q120 192 136 186 L136 142 Z"
            fill="#e0a97a"
            stroke="#000000"
            strokeWidth="3.5"
          />
          {/* Subtle Neck Shadow under Chin */}
          <path
            d="M104 142 Q120 156 136 142 L136 150 Q120 164 104 150 Z"
            fill="#c98a58"
          />

          {/* Chiseled Modern Jawline & Head Structure */}
          <path
            d="M74 104
               C72 74, 168 74, 166 104
               C166 132, 148 162, 120 162
               C92 162, 74 132, 74 104 Z"
            fill="#e0a97a"
            stroke="#000000"
            strokeWidth="4"
          />

          {/* Left Ear with Wireless Tech In-Ear Monitor */}
          <ellipse cx="69" cy="112" rx="8" ry="12" fill="#e0a97a" stroke="#000000" strokeWidth="3" />
          <ellipse cx="68" cy="112" rx="4" ry="6" fill="#ffffff" stroke="#000000" strokeWidth="1.5" />
          <circle cx="68" cy="111" r="1.5" fill="#10b981" />

          {/* Right Ear with Wireless Tech In-Ear Monitor */}
          <ellipse cx="171" cy="112" rx="8" ry="12" fill="#e0a97a" stroke="#000000" strokeWidth="3" />
          <ellipse cx="172" cy="112" rx="4" ry="6" fill="#ffffff" stroke="#000000" strokeWidth="1.5" />
          <circle cx="172" cy="111" r="1.5" fill="#10b981" />

          {/* Smart Modern Textured Fade Hairstyle (Sharp, Clean, Contemporary) */}
          <path
            d="M66 104
               C64 88, 68 70, 80 58
               C94 44, 120 40, 142 46
               C158 50, 172 64, 174 80
               C176 96, 170 106, 166 108
               C164 94, 154 84, 142 82
               C126 80, 110 82, 94 80
               C82 78, 72 88, 68 98
               C66 102, 66 104, 66 104 Z"
            fill="#111827"
            stroke="#000000"
            strokeWidth="4"
          />

          {/* Textured Volume Peaks on Top */}
          <path
            d="M80 58 Q98 42 118 44 Q136 38 150 48 Q166 46 172 66"
            stroke="#1f2937"
            strokeWidth="4"
            fill="none"
          />
          {/* Subtle Cyber Sheen in Hair */}
          <path
            d="M96 52 Q116 46 136 48"
            stroke="#38bdf8"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.4"
          />

          {/* Sharp, Determined Eyebrows */}
          <path d="M84 98 Q98 94 110 98" stroke="#090d16" strokeWidth="4" strokeLinecap="round" />
          <path d="M130 98 Q142 94 156 98" stroke="#090d16" strokeWidth="4" strokeLinecap="round" />

          {/* Smart Expressive Eyes with Reflections */}
          {isBlinking ? (
            <>
              <line x1="88" y1="112" x2="108" y2="112" stroke="#090d16" strokeWidth="3.5" strokeLinecap="round" />
              <line x1="132" y1="112" x2="152" y2="112" stroke="#090d16" strokeWidth="3.5" strokeLinecap="round" />
            </>
          ) : (
            <>
              {/* Left Eye */}
              <ellipse cx="98" cy="112" rx="7.5" ry="8" fill="#ffffff" stroke="#000000" strokeWidth="2" />
              <circle cx="99" cy="112" r="4.8" fill="#0f172a" />
              <circle cx="101" cy="110" r="1.8" fill="#ffffff" />
              <circle cx="97" cy="114" r="1" fill="#38bdf8" />

              {/* Right Eye */}
              <ellipse cx="142" cy="112" rx="7.5" ry="8" fill="#ffffff" stroke="#000000" strokeWidth="2" />
              <circle cx="143" cy="112" r="4.8" fill="#0f172a" />
              <circle cx="145" cy="110" r="1.8" fill="#ffffff" />
              <circle cx="141" cy="114" r="1" fill="#38bdf8" />
            </>
          )}

          {/* Ultra-Sleek Modern Titanium Glasses */}
          <rect
            x="80"
            y="98"
            width="36"
            height="26"
            rx="6"
            stroke="#020617"
            strokeWidth="3.5"
            fill="rgba(56, 189, 248, 0.08)"
          />
          <rect
            x="124"
            y="98"
            width="36"
            height="26"
            rx="6"
            stroke="#020617"
            strokeWidth="3.5"
            fill="rgba(56, 189, 248, 0.08)"
          />
          {/* Bridge */}
          <line x1="116" y1="110" x2="124" y2="110" stroke="#020617" strokeWidth="3.5" />
          {/* AR Anti-Reflective Glare Sheen */}
          <line x1="84" y1="104" x2="96" y2="104" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" />
          <line x1="128" y1="104" x2="140" y2="104" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" />

          {/* Refined Nose */}
          <path d="M118 118 Q120 126 122 120" stroke="#a36b44" strokeWidth="2.8" strokeLinecap="round" fill="none" />

          {/* Animated Mouth (Natural Lip Movement) */}
          {isMouthOpen ? (
            <g>
              {/* Open Mouth with subtle teeth line */}
              <path
                d={`M105 138 Q120 ${138 + mouthOpening} 135 138 Q120 ${138 - 2} 105 138 Z`}
                fill="#18181b"
                stroke="#000000"
                strokeWidth="2.5"
              />
              {/* Clean white upper teeth bar */}
              <path
                d="M109 138 Q120 142 131 138"
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
            </g>
          ) : (
            <g>
              {/* Confident Slight Grin */}
              <path
                d="M106 140 Q120 148 134 140"
                stroke="#090d16"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M115 150 Q120 152 125 150"
                stroke="#be7e54"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
            </g>
          )}
        </svg>
      </div>

      {/* 2. SMART TERMINAL SPEECH BUBBLE (Crisp Neo-Brutalist Presentation) */}
      <div
        style={{
          position: "absolute",
          left: isLeft ? 410 : "auto",
          right: isLeft ? "auto" : 410,
          bottom: 330,
          maxWidth: 630,
          background: "#ffffff",
          border: "3.5px solid #000000",
          borderRadius: 22,
          padding: "16px 26px",
          boxShadow: "5px 5px 0px #000000",
          display: "flex",
          alignItems: "center",
          gap: 12,
          flexWrap: "wrap",
          transform: `scale(${entrance})`,
          transformOrigin: isLeft ? "bottom left" : "bottom right",
        }}
      >
        {/* Pointer Arrow */}
        <div
          style={{
            position: "absolute",
            [isLeft ? "left" : "right"]: -18,
            bottom: 22,
            width: 0,
            height: 0,
            borderTop: "14px solid transparent",
            borderBottom: "14px solid transparent",
            [isLeft ? "borderRight" : "borderLeft"]: "18px solid #000000",
          }}
        />
        <div
          style={{
            position: "absolute",
            [isLeft ? "left" : "right"]: -12,
            bottom: 24,
            width: 0,
            height: 0,
            borderTop: "12px solid transparent",
            borderBottom: "12px solid transparent",
            [isLeft ? "borderRight" : "borderLeft"]: "14px solid #ffffff",
          }}
        />

        {/* Subtitle Words with Active Electric Indigo Highlight */}
        {hasText ? (
          visibleWords.map((item, idx) => {
            const isActive = currentTimeSec >= item.startSec && currentTimeSec < item.endSec;
            return (
              <span
                key={`${windowStart + idx}-${item.word}`}
                style={{
                  fontFamily,
                  fontSize: isActive ? 34 : 30,
                  fontWeight: 800,
                  color: isActive ? "#ffffff" : "#0f172a",
                  backgroundColor: isActive ? "#6366f1" : "transparent",
                  padding: isActive ? "4px 14px" : "0 2px",
                  borderRadius: isActive ? 10 : 0,
                  boxShadow: isActive ? "0 4px 14px rgba(99, 102, 241, 0.45)" : "none",
                  display: "inline-block",
                  letterSpacing: "-0.01em",
                }}
              >
                {item.word}
              </span>
            );
          })
        ) : (
          <span
            style={{
              fontFamily,
              fontSize: 30,
              fontWeight: 800,
              color: "#0f172a",
            }}
          >
            Drone Science
          </span>
        )}
      </div>
    </div>
  );
};
