import React from "react";
import { useCurrentFrame } from "remotion";
import { SceneLayout } from "../../components/SceneLayout";
import { NeoBigButton } from "../../components/neo/NeoBigButton";
import { NeoTopPill } from "../../components/neo/NeoTopPill";
import { Cursor } from "../../components/Cursor";
import { StarburstBadge } from "../../components/StarburstBadge";

export interface AtmCtaSceneProps {
  id?: string;
  leadIn?: string;
  headline?: string;
  brollVideo?: string;
  durationInFrames: number;
}

export const AtmCtaScene: React.FC<AtmCtaSceneProps> = ({
  id,
  leadIn = "⚡ DAILY HARDWARE & TECH SECRETS",
  headline = "DECODE SYSTEM SECRETS *BEFORE THE WORLD DOES*",
  brollVideo = "broll/cyber_grid_loop.mp4",
  durationInFrames,
}) => {
  const frame = useCurrentFrame();

  const clickFrame = 30;
  const isDepressed = frame >= clickFrame && frame <= clickFrame + 6;

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
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 20,
          marginTop: 10,
        }}
      >
        <NeoTopPill text="@_crackwithcode" color="orange" delayFrames={2} />

        <div
          style={{
            position: "relative",
            transform: isDepressed ? "translateY(5px) scale(0.97)" : "none",
            transformOrigin: "center center",
          }}
        >
          <NeoBigButton
            text="FOLLOW @_CRACKWITHCODE 🔥"
            subtext="DAILY REAL HARDWARE & TECH BREAKDOWNS ⚡"
            bg="#3b82f6"
            color="#ffffff"
            rotate={-2}
            delayFrames={4}
          />
          <StarburstBadge
            text="DAILY"
            subtext="SECRETS"
            color="#22c55e"
            textColor="#ffffff"
            position="none"
            style={{ position: "absolute", top: -38, right: -28 }}
            delayFrames={8}
          />
        </div>

        {/* Vector cursor flying in and clicking the button */}
        <Cursor
          startX={260}
          startY={180}
          targetX={120}
          targetY={30}
          moveStartFrame={10}
          moveDuration={20}
          clickFrame={30}
        />
      </div>
    </SceneLayout>
  );
};

