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
  // Natural eye blink (every ~90 frames, blinks for 5 frames)
  const isBlinking = frame % 95 < 5;
  // Mouth animation while speaking (smooth oscillation between open & closed)
  const isMouthOpen = isSpeaking && Math.sin(frame / 2.8) > -0.2;

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
      {/* 1. Cartoon Tech Avatar Illustration (Pure SVG) */}
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
          <ellipse cx="120" cy="280" rx="90" ry="10" fill="rgba(0,0,0,0.3)" />

          {/* Hoodie / Torso */}
          <path
            d="M40 280 C40 210, 80 180, 120 180 C160 180, 200 210, 200 280 Z"
            fill="#237466"
            stroke="#111827"
            strokeWidth="5"
          />
          {/* Inner Hoodie Collar */}
          <path
            d="M85 182 C85 220, 155 220, 155 182 Z"
            fill="#1e5f54"
            stroke="#111827"
            strokeWidth="4"
          />
          {/* White Hoodie Drawstrings */}
          <line x1="102" y1="190" x2="102" y2="235" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" />
          <line x1="138" y1="190" x2="138" y2="235" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" />

          {/* Orange Badge on Chest (like in screenshot) */}
          <circle cx="165" cy="225" r="14" fill="#f97316" stroke="#111827" strokeWidth="3.5" />
          <path d="M160 228 L165 222 L170 228" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

          {/* Neck */}
          <rect x="104" y="150" width="32" height="36" fill="#c48356" stroke="#111827" strokeWidth="4" rx="6" />

          {/* Head Base */}
          <ellipse cx="120" cy="130" rx="55" ry="58" fill="#c48356" stroke="#111827" strokeWidth="5" />

          {/* Ears */}
          <ellipse cx="62" cy="130" rx="10" ry="14" fill="#c48356" stroke="#111827" strokeWidth="4" />
          <ellipse cx="178" cy="130" rx="10" ry="14" fill="#c48356" stroke="#111827" strokeWidth="4" />

          {/* Big Dark Curly Afro Hair (matching screenshot) */}
          <g fill="#1f1b18" stroke="#111827" strokeWidth="5">
            <circle cx="80" cy="85" r="24" />
            <circle cx="105" cy="72" r="26" />
            <circle cx="135" cy="72" r="26" />
            <circle cx="160" cy="85" r="24" />
            <circle cx="68" cy="108" r="20" />
            <circle cx="172" cy="108" r="20" />
            <circle cx="95" cy="95" r="24" />
            <circle cx="145" cy="95" r="24" />
            <circle cx="120" cy="85" r="24" />
          </g>

          {/* Eyebrows */}
          <path d="M85 106 Q98 100 110 106" stroke="#111827" strokeWidth="5" strokeLinecap="round" />
          <path d="M130 106 Q142 100 155 106" stroke="#111827" strokeWidth="5" strokeLinecap="round" />

          {/* Eyes with Blinking */}
          {isBlinking ? (
            <>
              <line x1="88" y1="126" x2="108" y2="126" stroke="#111827" strokeWidth="4.5" strokeLinecap="round" />
              <line x1="132" y1="126" x2="152" y2="126" stroke="#111827" strokeWidth="4.5" strokeLinecap="round" />
            </>
          ) : (
            <>
              {/* Left Eye */}
              <circle cx="98" cy="125" r="8" fill="#ffffff" />
              <circle cx="99" cy="125" r="5" fill="#111827" />
              <circle cx="101" cy="123" r="2" fill="#ffffff" />

              {/* Right Eye */}
              <circle cx="142" cy="125" r="8" fill="#ffffff" />
              <circle cx="143" cy="125" r="5" fill="#111827" />
              <circle cx="145" cy="123" r="2" fill="#ffffff" />
            </>
          )}

          {/* Glasses Frame (matching screenshot) */}
          <circle cx="98" cy="125" r="20" stroke="#18181b" strokeWidth="5.5" fill="rgba(255,255,255,0.12)" />
          <circle cx="142" cy="125" r="20" stroke="#18181b" strokeWidth="5.5" fill="rgba(255,255,255,0.12)" />
          <line x1="118" y1="124" x2="122" y2="124" stroke="#18181b" strokeWidth="6" />

          {/* Glasses Lens Reflection Sheen */}
          <path d="M86 116 Q94 110 102 114" stroke="rgba(255,255,255,0.6)" strokeWidth="3" strokeLinecap="round" />
          <path d="M130 116 Q138 110 146 114" stroke="rgba(255,255,255,0.6)" strokeWidth="3" strokeLinecap="round" />

          {/* Nose */}
          <path d="M117 134 Q120 140 123 134" stroke="#8d5630" strokeWidth="3.5" strokeLinecap="round" fill="none" />

          {/* Animated Mouth (Speaking vs Neutral Smile) */}
          {isMouthOpen ? (
            <g>
              {/* Open Animated Talking Mouth */}
              <path
                d="M102 150 Q120 174 138 150 Z"
                fill="#881337"
                stroke="#111827"
                strokeWidth="4"
              />
              {/* White Upper Teeth */}
              <path
                d="M106 150 Q120 156 134 150"
                fill="#ffffff"
                stroke="#111827"
                strokeWidth="2"
              />
              {/* Pink Tongue */}
              <ellipse cx="120" cy="164" rx="10" ry="6" fill="#f43f5e" />
            </g>
          ) : (
            /* Friendly Closed Smile */
            <path
              d="M106 150 Q120 162 134 150"
              stroke="#111827"
              strokeWidth="4.5"
              strokeLinecap="round"
              fill="none"
            />
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
