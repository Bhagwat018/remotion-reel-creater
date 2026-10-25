import React from "react";

export interface SafeZoneOverlayProps {
  visible?: boolean;
}

export const SafeZoneOverlay: React.FC<SafeZoneOverlayProps> = ({ visible = true }) => {
  if (!visible) return null;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* 1. Top Safe Zone (Instagram Search / Header Bar) */}
      <div
        style={{
          width: "100%",
          height: 180,
          background: "rgba(239, 68, 68, 0.12)",
          borderBottom: "2px dashed rgba(239, 68, 68, 0.6)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#f87171",
          fontSize: 16,
          fontWeight: 700,
          letterSpacing: "0.08em",
        }}
      >
        ⚠️ TOP UI BAR (INSTAGRAM REELS HEADER)
      </div>

      {/* 2. Central Instagram 1:1 Profile Grid Preview Frame (Y: 420px to 1500px) */}
      <div
        style={{
          position: "absolute",
          top: 420,
          left: 0,
          width: 1080,
          height: 1080,
          border: "2px dashed rgba(56, 189, 248, 0.5)",
          boxShadow: "inset 0 0 40px rgba(56, 189, 248, 0.05)",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          padding: 16,
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.8)",
            color: "#38bdf8",
            fontSize: 13,
            fontWeight: 800,
            padding: "4px 10px",
            borderRadius: 6,
            border: "1px solid rgba(56, 189, 248, 0.4)",
          }}
        >
          INSTAGRAM 1:1 PROFILE GRID ZONE
        </div>
      </div>

      {/* 3. Right Action Rail (Like, Comment, Share, Audio Disc) */}
      <div
        style={{
          position: "absolute",
          right: 0,
          bottom: 220,
          width: 160,
          height: 580,
          background: "rgba(239, 68, 68, 0.14)",
          borderLeft: "2px dashed rgba(239, 68, 68, 0.6)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-around",
          padding: "16px 0",
          color: "#fca5a5",
          fontSize: 13,
          fontWeight: 700,
          textAlign: "center",
        }}
      >
        <div>❤️ LIKE</div>
        <div>💬 COMMENT</div>
        <div>✈️ SHARE</div>
        <div>💿 AUDIO</div>
      </div>

      {/* 4. Bottom Safe Zone (Username, Caption, Music title) */}
      <div
        style={{
          width: "100%",
          height: 320,
          background: "rgba(239, 68, 68, 0.14)",
          borderTop: "2px dashed rgba(239, 68, 68, 0.6)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fca5a5",
          fontSize: 16,
          fontWeight: 700,
          letterSpacing: "0.08em",
        }}
      >
        ⚠️ BOTTOM SAFE ZONE (USER PROFILE & CAPTION OVERLAY)
      </div>
    </div>
  );
};
