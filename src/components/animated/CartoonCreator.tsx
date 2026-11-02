import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

export type CartoonPose =
  | "pointing_up"
  | "shocked"
  | "holding_ticket"
  | "explaining"
  | "detective"
  | "guru"
  | "celebrating";

export interface CartoonCreatorProps {
  pose?: CartoonPose;
  speechBubble?: string;
  reactionIcon?: string;
  isTalking?: boolean;
  scale?: number;
  flipX?: boolean;
  style?: React.CSSProperties;
}

/**
 * CartoonCreator - Animated SVG Cartoon Creator / Presenter Mascot
 * Inspired by modern motion design, react-native-reanimated springs,
 * and makeitanimated.dev fluid micro-interactions.
 */
export const CartoonCreator: React.FC<CartoonCreatorProps> = ({
  pose = "pointing_up",
  speechBubble,
  reactionIcon,
  isTalking = true,
  scale = 1,
  flipX = false,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Spring entrance
  const entrance = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 140 },
  });

  // Natural idle breathing bobbing
  const bob = Math.sin(frame / 7) * 4;
  // Natural eye blink (every 90 frames, blinks for 5 frames)
  const isBlinking = frame % 90 < 5;
  // Continuous talking mouth flap
  const mouthFlap = isTalking ? Math.abs(Math.sin((frame * Math.PI) / 4)) : 0;
  // Arm wiggle / gesture bounce
  const armWiggle = Math.sin(frame / 5) * 4;
  // Floating bubble bounce
  const bubbleFloat = Math.sin(frame / 6 + 1) * 3;

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transform: `scale(${entrance * scale}) translateY(${bob}px) ${
          flipX ? "scaleX(-1)" : ""
        }`,
        transformOrigin: "bottom center",
        pointerEvents: "none",
        userSelect: "none",
        ...style,
      }}
    >
      {/* 1. FLOATING REACTION BUBBLE / SPEECH CLOUD */}
      {(speechBubble || reactionIcon) && (
        <div
          style={{
            position: "absolute",
            top: -55,
            transform: `translateY(${bubbleFloat}px) ${flipX ? "scaleX(-1)" : ""}`,
            backgroundColor: "#ffffff",
            border: "3px solid #000000",
            borderRadius: 18,
            padding: "8px 18px",
            boxShadow: "4px 4px 0px #000000",
            display: "flex",
            alignItems: "center",
            gap: 8,
            zIndex: 10,
            whiteSpace: "nowrap",
          }}
        >
          {reactionIcon && (
            <span style={{ fontSize: 24, display: "inline-block" }}>
              {reactionIcon}
            </span>
          )}
          {speechBubble && (
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 18,
                fontWeight: 900,
                color: "#0f172a",
                letterSpacing: 0.5,
              }}
            >
              {speechBubble}
            </span>
          )}
          {/* Speech bubble pointer tail */}
          <div
            style={{
              position: "absolute",
              bottom: -10,
              left: "50%",
              transform: "translateX(-50%)",
              width: 0,
              height: 0,
              borderLeft: "9px solid transparent",
              borderRight: "9px solid transparent",
              borderTop: "10px solid #000000",
            }}
          />
        </div>
      )}

      {/* 2. VECTOR CARTOON CHARACTER (SVG) */}
      <svg
        viewBox="0 0 320 340"
        width="340"
        height="340"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: "visible" }}
      >
        <defs>
          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <linearGradient id="hoodieGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#0369a1" />
          </linearGradient>
          <linearGradient id="hairGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id="skinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffd8b3" />
            <stop offset="100%" stopColor="#f7ba85" />
          </linearGradient>
          <linearGradient id="goldCoin" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fde047" />
            <stop offset="100%" stopColor="#eab308" />
          </linearGradient>
        </defs>

        {/* Ambient shadow underneath */}
        <ellipse cx="160" cy="330" rx="95" ry="10" fill="rgba(0,0,0,0.18)" />

        {/* ================= TORSO & HOODIE ================= */}
        <path
          d="M75 330 C75 250, 115 220, 160 220 C205 220, 245 250, 245 330 Z"
          fill="url(#hoodieGrad)"
          stroke="#000000"
          strokeWidth="4.5"
          strokeLinejoin="round"
        />

        {/* Hoodie Neck Collar */}
        <path
          d="M125 220 C125 255, 195 255, 195 220 Z"
          fill="#0284c7"
          stroke="#000000"
          strokeWidth="4"
        />

        {/* Hoodie Drawstrings */}
        <path
          d="M142 245 C142 275, 138 290, 138 298"
          stroke="#ffffff"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <circle cx="138" cy="301" r="3.5" fill="#f59e0b" stroke="#000" strokeWidth="1.5" />
        <path
          d="M178 245 C178 275, 182 290, 182 298"
          stroke="#ffffff"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <circle cx="182" cy="301" r="3.5" fill="#f59e0b" stroke="#000" strokeWidth="1.5" />

        {/* Chest Badge / Tech Pin */}
        <g transform="translate(195, 260)">
          <circle cx="0" cy="0" r="14" fill="#10b981" stroke="#000" strokeWidth="2.5" />
          <text
            x="0"
            y="4.5"
            textAnchor="middle"
            fill="#ffffff"
            fontSize="11"
            fontFamily="'Space Grotesk', sans-serif"
            fontWeight="900"
          >
            IPO
          </text>
        </g>

        {/* ================= NECK & HEAD ================= */}
        {/* Neck */}
        <rect
          x="142"
          y="185"
          width="36"
          height="40"
          rx="6"
          fill="url(#skinGrad)"
          stroke="#000000"
          strokeWidth="4"
        />

        {/* Ears */}
        {/* Left Ear + Wireless Earbud */}
        <circle cx="98" cy="148" r="16" fill="url(#skinGrad)" stroke="#000" strokeWidth="3.5" />
        <circle cx="96" cy="148" r="6" fill="#0284c7" stroke="#000" strokeWidth="1.5" />
        {/* Right Ear + Wireless Earbud */}
        <circle cx="222" cy="148" r="16" fill="url(#skinGrad)" stroke="#000" strokeWidth="3.5" />
        <circle cx="224" cy="148" r="6" fill="#0284c7" stroke="#000" strokeWidth="1.5" />

        {/* Head Base */}
        <rect
          x="104"
          y="85"
          width="112"
          height="120"
          rx="42"
          fill="url(#skinGrad)"
          stroke="#000000"
          strokeWidth="4.5"
        />

        {/* Cheeks Blush */}
        <circle cx="120" cy="165" r="9" fill="rgba(244, 63, 94, 0.28)" />
        <circle cx="200" cy="165" r="9" fill="rgba(244, 63, 94, 0.28)" />

        {/* Stylized Modern Hair (Top Curls & Quiff) */}
        <path
          d="M96 100 C96 45, 130 30, 160 30 C195 30, 224 45, 224 100 C224 110, 218 118, 210 114 C200 102, 190 98, 160 98 C130 98, 120 102, 110 114 C102 118, 96 110, 96 100 Z"
          fill="url(#hairGrad)"
          stroke="#000000"
          strokeWidth="4.5"
          strokeLinejoin="round"
        />
        {/* Hair Tuft 1 */}
        <path
          d="M135 34 C142 18, 162 18, 166 32"
          stroke="#000"
          strokeWidth="4"
          fill="#334155"
        />
        {/* Hair Tuft 2 */}
        <path
          d="M165 32 C172 16, 188 18, 190 35"
          stroke="#000"
          strokeWidth="4"
          fill="#334155"
        />

        {/* Eyebrows */}
        {pose === "shocked" ? (
          <>
            <path d="M120 112 Q132 98 144 114" stroke="#000" strokeWidth="4.5" strokeLinecap="round" fill="none" />
            <path d="M176 114 Q188 98 200 112" stroke="#000" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          </>
        ) : pose === "guru" || pose === "detective" ? (
          <>
            <path d="M120 116 Q132 108 144 116" stroke="#000" strokeWidth="4.5" strokeLinecap="round" fill="none" />
            <path d="M176 112 Q188 100 200 114" stroke="#000" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          </>
        ) : (
          <>
            <path d="M120 116 Q132 108 144 118" stroke="#000" strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M176 118 Q188 108 200 116" stroke="#000" strokeWidth="4" strokeLinecap="round" fill="none" />
          </>
        )}

        {/* ================= EYES & GLASSES ================= */}
        {/* Glasses Frame (Sleek Round Modern Glasses) */}
        <circle cx="132" cy="140" r="18" fill="rgba(255, 255, 255, 0.45)" stroke="#000" strokeWidth="4" />
        <circle cx="188" cy="140" r="18" fill="rgba(255, 255, 255, 0.45)" stroke="#000" strokeWidth="4" />
        {/* Bridge */}
        <path d="M150 138 C155 133, 165 133, 170 138" stroke="#000" strokeWidth="4" strokeLinecap="round" />

        {/* Eyes (Animated Blinking or Star Eyes) */}
        {pose === "celebrating" ? (
          <>
            {/* Star Eye Left */}
            <path d="M132 132 L134 138 L140 140 L134 142 L132 148 L130 142 L124 140 L130 138 Z" fill="#f59e0b" stroke="#000" strokeWidth="1.5" />
            {/* Star Eye Right */}
            <path d="M188 132 L190 138 L196 140 L190 142 L188 148 L186 142 L180 140 L186 138 Z" fill="#f59e0b" stroke="#000" strokeWidth="1.5" />
          </>
        ) : isBlinking ? (
          <>
            <path d="M124 140 Q132 145 140 140" stroke="#000" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M180 140 Q188 145 196 140" stroke="#000" strokeWidth="3.5" strokeLinecap="round" />
          </>
        ) : (
          <>
            {/* Left Eye Pupil */}
            <circle
              cx={pose === "pointing_up" ? 132 : 132}
              cy={pose === "pointing_up" ? 136 : 139}
              r={pose === "shocked" ? 9 : 7}
              fill="#000000"
            />
            <circle cx="130" cy="136" r="2.5" fill="#ffffff" />

            {/* Right Eye Pupil */}
            <circle
              cx={pose === "pointing_up" ? 188 : 188}
              cy={pose === "pointing_up" ? 136 : 139}
              r={pose === "shocked" ? 9 : 7}
              fill="#000000"
            />
            <circle cx="186" cy="136" r="2.5" fill="#ffffff" />
          </>
        )}

        {/* Glasses Lens Glare Reflection */}
        <path d="M122 130 L128 126" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
        <path d="M178 130 L184 126" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />

        {/* Nose */}
        <path d="M160 147 C158 155, 161 157, 163 157" stroke="#000000" strokeWidth="3" strokeLinecap="round" />

        {/* Mouth (Speech Flap / Expression) */}
        {pose === "shocked" ? (
          /* O-Shaped shocked mouth */
          <ellipse cx="160" cy="178" rx="10" ry="14" fill="#881337" stroke="#000" strokeWidth="3.5" />
        ) : isTalking ? (
          /* Dynamic talking flap */
          <path
            d={`M148 174 Q160 ${174 + mouthFlap * 14} 172 174 Q160 ${174 - mouthFlap * 4} 148 174 Z`}
            fill="#881337"
            stroke="#000000"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
        ) : (
          /* Friendly confident smile */
          <path
            d="M148 173 Q160 184 172 173"
            stroke="#000000"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
        )}

        {/* ================= ARMS & PROPS ACCORDING TO POSE ================= */}
        {pose === "pointing_up" && (
          <g transform={`rotate(${armWiggle}, 235, 270)`}>
            {/* Right Arm reaching UP towards the card/metric */}
            <path
              d="M225 260 C250 240, 260 180, 255 120"
              stroke="#0284c7"
              strokeWidth="28"
              strokeLinecap="round"
              fill="none"
            />
            {/* Hand with pointing index finger */}
            <g transform="translate(255, 105)">
              <circle cx="0" cy="15" r="16" fill="url(#skinGrad)" stroke="#000" strokeWidth="3.5" />
              {/* Pointing index finger */}
              <rect x="-6" y="-30" width="12" height="34" rx="6" fill="url(#skinGrad)" stroke="#000" strokeWidth="3.5" />
              {/* Folded fingers */}
              <circle cx="-6" cy="12" r="5" fill="#f7ba85" stroke="#000" strokeWidth="2" />
              <circle cx="6" cy="12" r="5" fill="#f7ba85" stroke="#000" strokeWidth="2" />
              {/* Glowing pointing beam particle */}
              <circle cx="0" cy="-38" r="6" fill="#38bdf8" filter="url(#softGlow)" />
            </g>
          </g>
        )}

        {pose === "shocked" && (
          <g>
            {/* Left Arm raised to cheek */}
            <path d="M90 270 C80 230, 85 180, 108 175" stroke="#0284c7" strokeWidth="26" strokeLinecap="round" fill="none" />
            <circle cx="108" cy="175" r="14" fill="url(#skinGrad)" stroke="#000" strokeWidth="3.5" />

            {/* Right Arm raised to cheek */}
            <path d="M230 270 C240 230, 235 180, 212 175" stroke="#0284c7" strokeWidth="26" strokeLinecap="round" fill="none" />
            <circle cx="212" cy="175" r="14" fill="url(#skinGrad)" stroke="#000" strokeWidth="3.5" />

            {/* Floating Exclamation Signs */}
            <g transform="translate(50, 80)">
              <rect x="0" y="0" width="8" height="24" rx="4" fill="#ef4444" stroke="#000" strokeWidth="2" />
              <circle cx="4" cy="32" r="4" fill="#ef4444" stroke="#000" strokeWidth="2" />
            </g>
            <g transform="translate(265, 80)">
              <rect x="0" y="0" width="8" height="24" rx="4" fill="#ef4444" stroke="#000" strokeWidth="2" />
              <circle cx="4" cy="32" r="4" fill="#ef4444" stroke="#000" strokeWidth="2" />
            </g>
          </g>
        )}

        {pose === "holding_ticket" && (
          <g>
            {/* Left Hand Holding Gold Coin / Ticket */}
            <path d="M90 270 C70 240, 75 200, 95 190" stroke="#0284c7" strokeWidth="26" strokeLinecap="round" fill="none" />
            <g transform="translate(70, 150) rotate(-12)">
              {/* Ticket Rect */}
              <rect x="0" y="0" width="60" height="40" rx="8" fill="#fef08a" stroke="#000" strokeWidth="3" />
              <text x="30" y="24" textAnchor="middle" fontSize="13" fontFamily="'JetBrains Mono', monospace" fontWeight="900" fill="#000">₹82</text>
            </g>

            {/* Right Hand gesturing thumbs up or pointing */}
            <path d="M230 270 C250 250, 260 210, 250 180" stroke="#0284c7" strokeWidth="26" strokeLinecap="round" fill="none" />
            <circle cx="250" cy="180" r="14" fill="url(#skinGrad)" stroke="#000" strokeWidth="3.5" />
          </g>
        )}

        {pose === "detective" && (
          <g>
            {/* Holding Magnifying Glass over eye */}
            <path d="M230 270 C260 230, 250 170, 205 150" stroke="#0284c7" strokeWidth="26" strokeLinecap="round" fill="none" />
            <g transform="translate(202, 142)">
              {/* Magnifying Glass Lens */}
              <circle cx="0" cy="0" r="24" fill="rgba(56, 189, 248, 0.3)" stroke="#000" strokeWidth="4" />
              {/* Handle */}
              <line x1="16" y1="16" x2="34" y2="34" stroke="#000" strokeWidth="6" strokeLinecap="round" />
            </g>
          </g>
        )}

        {pose === "guru" && (
          <g>
            {/* Chin on Hand (Thinking) */}
            <path d="M90 270 C95 240, 120 220, 150 200" stroke="#0284c7" strokeWidth="26" strokeLinecap="round" fill="none" />
            <circle cx="150" cy="195" r="14" fill="url(#skinGrad)" stroke="#000" strokeWidth="3.5" />
            {/* Glowing Lightbulb over head */}
            <g transform="translate(142, -5)">
              <circle cx="18" cy="18" r="16" fill="#fde047" stroke="#000" strokeWidth="3" filter="url(#softGlow)" />
              <rect x="13" y="32" width="10" height="7" rx="2" fill="#64748b" stroke="#000" strokeWidth="2" />
            </g>
          </g>
        )}

        {pose === "celebrating" && (
          <g>
            {/* Both Hands in Victory Air */}
            <path d="M90 260 C65 210, 60 150, 75 100" stroke="#0284c7" strokeWidth="26" strokeLinecap="round" fill="none" />
            <circle cx="75" cy="95" r="14" fill="url(#skinGrad)" stroke="#000" strokeWidth="3.5" />

            <path d="M230 260 C255 210, 260 150, 245 100" stroke="#0284c7" strokeWidth="26" strokeLinecap="round" fill="none" />
            <circle cx="245" cy="95" r="14" fill="url(#skinGrad)" stroke="#000" strokeWidth="3.5" />

            {/* Confetti Sparkles */}
            <circle cx="45" cy="70" r="5" fill="#f43f5e" />
            <circle cx="275" cy="70" r="6" fill="#10b981" />
            <polygon points="160,20 164,30 174,30 166,36 169,46 160,40 151,46 154,36 146,30 156,30" fill="#f59e0b" />
          </g>
        )}

        {pose === "explaining" && (
          <g>
            {/* Left Arm relaxed */}
            <path d="M90 270 C80 280, 80 300, 85 320" stroke="#0284c7" strokeWidth="24" strokeLinecap="round" fill="none" />
            {/* Right Arm open palm presentation gesture */}
            <path d="M230 260 C260 250, 280 230, 285 200" stroke="#0284c7" strokeWidth="26" strokeLinecap="round" fill="none" />
            <ellipse cx="285" cy="195" rx="14" ry="12" fill="url(#skinGrad)" stroke="#000" strokeWidth="3.5" />
          </g>
        )}
      </svg>
    </div>
  );
};
