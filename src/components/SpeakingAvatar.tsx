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

  // Window of words around current speaking word (e.g. 5-6 words)
  const targetIndex = activeWordIndex >= 0 ? activeWordIndex : 0;
  const windowStart = Math.max(0, targetIndex - 1);
  const windowEnd = Math.min(words.length, windowStart + 5);
  const visibleWords = words.slice(windowStart, windowEnd);

  // Fallback text if words not populated yet
  const hasText = visibleWords.length > 0;
  const sampleText = hasText ? visibleWords.map((w) => w.word).join(" ") : "System Scaling";
  const fontFamily = resolveFontFamily(sampleText, theme.typography.ui);

  // Subtle breathing and speech bobbing
  const bobbing = Math.sin(frame / 8) * 3;
  // Natural eye blink (every ~105 frames, blinks for 5 frames)
  const isBlinking = frame % 105 < 5;

  // Natural speech mouth flap animation (smooth oscillation between open and closed, NO tongue)
  const speechFlap = isSpeaking ? Math.sin((frame * Math.PI) / 3.8) * 0.5 + 0.5 : 0;
  const isMouthOpen = isSpeaking && speechFlap > 0.2;
  const mouthHeight = Math.round(8 + speechFlap * 12);

  // Spring entrance on first appear
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
        left: isLeft ? 50 : "auto",
        right: isLeft ? "auto" : 50,
        bottom: 230,
        display: "flex",
        flexDirection: isLeft ? "row" : "row-reverse",
        alignItems: "flex-end",
        gap: 20,
        zIndex: 50,
        transform: `scale(${entrance}) translateY(${bobbing}px)`,
        transformOrigin: isLeft ? "bottom left" : "bottom right",
        pointerEvents: "none",
      }}
    >
      {/* 1. Professional Tech Creator Avatar (Modern Vector SVG) */}
      <div
        style={{
          width: 240,
          height: 290,
          position: "relative",
          flexShrink: 0,
        }}
      >
        <svg
          viewBox="0 0 240 290"
          width="240"
          height="290"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle drop shadow under avatar */}
          <ellipse cx="120" cy="282" rx="85" ry="9" fill="rgba(0,0,0,0.35)" />

          {/* Sleek Dark Tech Jacket / Torso */}
          <path
            d="M36 280 C36 215, 76 182, 120 182 C164 182, 204 215, 204 280 Z"
            fill="#0f172a"
            stroke="#020617"
            strokeWidth="4"
          />

          {/* Inner Slate Crewneck / Tech T-shirt */}
          <path
            d="M90 182 C90 216, 150 216, 150 182 Z"
            fill="#1e293b"
            stroke="#020617"
            strokeWidth="3.5"
          />

          {/* Jacket Minimalist Seams */}
          <path d="M90 182 L100 240 L106 280" stroke="#334155" strokeWidth="2.5" fill="none" />
          <path d="M150 182 L140 240 L134 280" stroke="#334155" strokeWidth="2.5" fill="none" />

          {/* Modern Creator Tech Pin / Badge on Chest */}
          <circle cx="168" cy="225" r="12" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="2" />
          <path d="M164 225 L168 221 L172 225" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />

          {/* Neck with subtle shadow */}
          <rect x="105" y="148" width="30" height="38" fill="#d4956a" rx="4" />
          <path d="M105 148 Q120 158 135 148 L135 158 Q120 168 105 158 Z" fill="#be7e54" />

          {/* Professional Stylized Head & Jaw */}
          <path
            d="M72 112 C72 78, 168 78, 168 112 C168 146, 146 166, 120 166 C94 166, 72 146, 72 112 Z"
            fill="#d4956a"
            stroke="#0f172a"
            strokeWidth="4"
          />

          {/* Left Ear + Sleek Wireless Earbud */}
          <ellipse cx="68" cy="120" rx="9" ry="13" fill="#d4956a" stroke="#0f172a" strokeWidth="3" />
          <path d="M66 118 Q69 121 66 124" stroke="#be7e54" strokeWidth="2" fill="none" />
          {/* Wireless AirPod / Earbud */}
          <rect x="63" y="118" width="4.5" height="9" rx="2" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />

          {/* Right Ear */}
          <ellipse cx="172" cy="120" rx="9" ry="13" fill="#d4956a" stroke="#0f172a" strokeWidth="3" />
          <path d="M174 118 Q171 121 174 124" stroke="#be7e54" strokeWidth="2" fill="none" />

          {/* Modern Styled Textured Hair (Clean tech fade with volume) */}
          <path
            d="M66 110 C64 88, 72 60, 102 54 C122 50, 150 52, 168 66 C178 75, 178 92, 174 110 C168 98, 158 94, 146 94 C132 94, 126 88, 112 88 C95 88, 86 96, 75 98 C70 102, 68 106, 66 110 Z"
            fill="#1e2029"
            stroke="#0f172a"
            strokeWidth="4"
          />
          {/* Hair Texture & Highlight Sheen */}
          <path
            d="M95 62 Q120 57 145 63"
            stroke="#383d52"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M105 73 Q128 69 152 75"
            stroke="#383d52"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />

          {/* Confident Expressive Eyebrows */}
          <path d="M84 103 Q98 98 111 102" stroke="#1e2029" strokeWidth="4" strokeLinecap="round" />
          <path d="M129 102 Q142 98 156 103" stroke="#1e2029" strokeWidth="4" strokeLinecap="round" />

          {/* Eyes with Natural Blinking */}
          {isBlinking ? (
            <>
              <line x1="88" y1="118" x2="108" y2="118" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" />
              <line x1="132" y1="118" x2="152" y2="118" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" />
            </>
          ) : (
            <>
              <ellipse cx="98" cy="118" rx="7.5" ry="8" fill="#ffffff" stroke="#0f172a" strokeWidth="1.5" />
              <circle cx="99" cy="118" r="4.8" fill="#1e2029" />
              <circle cx="101" cy="116" r="1.8" fill="#ffffff" />

              <ellipse cx="142" cy="118" rx="7.5" ry="8" fill="#ffffff" stroke="#0f172a" strokeWidth="1.5" />
              <circle cx="143" cy="118" r="4.8" fill="#1e2029" />
              <circle cx="145" cy="116" r="1.8" fill="#ffffff" />
            </>
          )}

          {/* Sleek Modern Glasses Frame */}
          <rect x="78" y="104" width="38" height="28" rx="8" stroke="#0f172a" strokeWidth="3.5" fill="rgba(255,255,255,0.06)" />
          <rect x="124" y="104" width="38" height="28" rx="8" stroke="#0f172a" strokeWidth="3.5" fill="rgba(255,255,255,0.06)" />
          <line x1="116" y1="116" x2="124" y2="116" stroke="#0f172a" strokeWidth="4" />
          {/* Subtle Glare Sheen on Glasses */}
          <path d="M84 110 L94 110" stroke="rgba(255,255,255,0.5)" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M130 110 L140 110" stroke="rgba(255,255,255,0.5)" strokeWidth="2.5" strokeLinecap="round" />

          {/* Nose */}
          <path d="M118 124 Q120 130 122 124" stroke="#a36b44" strokeWidth="2.8" strokeLinecap="round" fill="none" />

          {/* Animated Mouth (Natural Lip Movement, strictly NO TONGUE) */}
          {isMouthOpen ? (
            <g>
              {/* Natural speaking mouth opening cavity */}
              <path
                d={`M104 144 Q120 ${144 + mouthHeight} 136 144 Q120 ${144 - 2} 104 144 Z`}
                fill="#18181b"
                stroke="#0f172a"
                strokeWidth="3.5"
                strokeLinejoin="round"
              />
              {/* Clean upper teeth strip */}
              <path
                d="M107 144.5 Q120 148 133 144.5 L133 147.5 Q120 151 107 147.5 Z"
                fill="#ffffff"
              />
              {/* Subtle lower lip shadow accent */}
              <path
                d={`M112 ${147 + mouthHeight} Q120 ${150 + mouthHeight} 128 ${147 + mouthHeight}`}
                stroke="#be7e54"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
            </g>
          ) : (
            <g>
              {/* Confident Closed Smile Line */}
              <path
                d="M105 145 Q120 154 135 145"
                stroke="#0f172a"
                strokeWidth="3.8"
                strokeLinecap="round"
                fill="none"
              />
              {/* Subtle lower lip accent */}
              <path
                d="M114 158 Q120 160 126 158"
                stroke="#be7e54"
                strokeWidth="2.2"
                strokeLinecap="round"
                fill="none"
              />
            </g>
          )}
        </svg>
      </div>

      {/* 2. Comic Speech Bubble with Spoken Subtitles (Matches Screenshot) */}
      <div
        style={{
          position: "relative",
          marginBottom: 90,
          maxWidth: 680,
          background: "#ffffff",
          border: "4px solid #111827",
          borderRadius: 28,
          padding: "16px 28px",
          boxShadow: "6px 7px 0px rgba(0, 0, 0, 0.95)",
          display: "flex",
          alignItems: "center",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        {/* Comic Bubble Pointer Arrow pointing towards Avatar Mouth */}
        <div
          style={{
            position: "absolute",
            [isLeft ? "left" : "right"]: -18,
            bottom: 22,
            width: 0,
            height: 0,
            borderTop: "14px solid transparent",
            borderBottom: "14px solid transparent",
            [isLeft ? "borderRight" : "borderLeft"]: "18px solid #111827",
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

        {/* Subtitle Words with Active Purple Pill Highlight */}
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
                  color: isActive ? "#ffffff" : "#111827",
                  backgroundColor: isActive ? "#7c3aed" : "transparent",
                  padding: isActive ? "4px 14px" : "0 2px",
                  borderRadius: isActive ? 12 : 0,
                  boxShadow: isActive ? "0 4px 12px rgba(124, 58, 237, 0.4)" : "none",
                  display: "inline-block",
                  letterSpacing: "-0.01em",
                  transition: "none",
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
              fontSize: 32,
              fontWeight: 800,
              color: "#111827",
            }}
          >
            System Load Management
          </span>
        )}
      </div>
    </div>
  );
};
