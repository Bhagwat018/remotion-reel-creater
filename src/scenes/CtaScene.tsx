import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { CtaSceneProps } from "../schema";
import { SceneLayout } from "../components/SceneLayout";
import { resolveFontFamily, useTheme } from "../theme/theme";
import { entranceSpring } from "../lib/motion";
import { Cursor } from "../components/Cursor";

export const CtaScene: React.FC<
  CtaSceneProps & { callToAction?: string; durationInFrames: number; direction?: any; id?: string }
> = ({ id, direction, leadIn, headline, buttonText, callToAction, durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const theme = useTheme();

  const effectiveButtonText = buttonText || callToAction || "FOLLOW FOR MORE";

  const springVal = entranceSpring(frame, fps, 6);
  const scale = interpolate(springVal, [0, 1], [0.9, 1]);
  const opacity = interpolate(springVal, [0, 1], [0, 1]);

  // Click pulse on button matching cursor click frame (frame 36)
  const clickOffset = frame - 36;
  let btnClickScale = 1;
  if (clickOffset >= 0 && clickOffset <= 10) {
    btnClickScale = interpolate(clickOffset, [0, 4, 10], [1, 0.94, 1]);
  }

  const btnFont = resolveFontFamily(effectiveButtonText, theme.typography.ui);

  return (
    <SceneLayout
      id={id}
      direction={direction}
      leadIn={leadIn}
      headline={headline}
      durationInFrames={durationInFrames}
    >
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 20,
          marginTop: 10,
        }}
      >
        {/* Channel Spotlight Pill */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            backgroundColor: "rgba(15, 23, 42, 0.9)",
            border: "2px solid #38bdf8",
            borderRadius: 999,
            padding: "12px 28px",
            boxShadow: "0 8px 30px rgba(56, 189, 248, 0.25)",
            opacity,
            transform: `scale(${scale})`,
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
          <span
            style={{
              fontFamily: theme.typography.mono,
              fontSize: 22,
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "0.04em",
            }}
          >
            @techwith.GenZ
          </span>
        </div>

        <div
          style={{
            backgroundColor: theme.colors.accent,
            color: theme.colors.accentText,
            borderRadius: theme.layout.pillRadius,
            padding: "26px 64px",
            boxShadow: `0 20px 50px ${theme.colors.accent}66`,
            opacity,
            transform: `scale(${scale * btnClickScale})`,
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <span
            style={{
              fontFamily: btnFont,
              fontSize: 34,
              fontWeight: 700,
              letterSpacing: "0.02em",
            }}
          >
            {effectiveButtonText}
          </span>
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </div>

        {/* Vector cursor flying in and clicking the button */}
        <Cursor
          startX={260}
          startY={180}
          targetX={120}
          targetY={30}
          moveStartFrame={12}
          moveDuration={24}
          clickFrame={36}
        />
      </div>
    </SceneLayout>
  );
};
