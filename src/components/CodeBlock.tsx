import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../styles/theme";

export const CodeBlock: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const entrance = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  const codeLines = [
    `// Prompt: "Generate authenticated user check"`,
    `import { verifyUserFact } from "@ai/nonexistent-core";`,
    ``,
    `export async function checkTruth() {`,
    `  const valid = await verifyUserFact();`,
    `  return valid.guaranteeAbsoluteTruth();`,
    `}`,
  ];

  const fullCode = codeLines.join("\n");
  // Typewriter effect: 1 character every 0.6 frames starting at frame 10
  const charCount = Math.floor(
    interpolate(frame, [10, 110], [0, fullCode.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  const displayedText = fullCode.slice(0, charCount);

  // Error badge spring pops in after code typing finishes (around frame 110)
  const errorPop = spring({
    frame: frame - 110,
    fps,
    config: { damping: 10, stiffness: 140 },
  });

  // Cursor blink
  const cursorBlink = Math.floor(frame / 12) % 2 === 0;

  return (
    <div
      style={{
        width: 860,
        borderRadius: 20,
        backgroundColor: "rgba(13, 17, 28, 0.95)",
        border: `1.5px solid ${theme.colors.cardBorder}`,
        boxShadow: `0 24px 60px rgba(0, 0, 0, 0.7), 0 0 30px ${theme.colors.accentGlow}`,
        overflow: "hidden",
        opacity: entrance,
        transform: `translateY(${(1 - entrance) * 40}px) scale(${0.9 + entrance * 0.1})`,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Code Window Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 24px",
          background: "rgba(255, 255, 255, 0.04)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
        }}
      >
        <div style={{ display: "flex", gap: 10 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: "50%",
              backgroundColor: "#FF5F56",
            }}
          />
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: "50%",
              backgroundColor: "#FFBD2E",
            }}
          />
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: "50%",
              backgroundColor: "#27C93F",
            }}
          />
        </div>
        <div
          style={{
            fontFamily: theme.fontFamily,
            fontSize: 16,
            fontWeight: 600,
            color: theme.colors.mutedText,
            letterSpacing: "0.05em",
          }}
        >
          hallucinated_module.ts
        </div>
        <div
          style={{
            fontFamily: theme.fontFamily,
            fontSize: 13,
            color: theme.colors.accent,
            fontWeight: 700,
            padding: "4px 10px",
            background: "rgba(0, 229, 160, 0.12)",
            borderRadius: 6,
          }}
        >
          TYPESCRIPT
        </div>
      </div>

      {/* Code Editor Body */}
      <div
        style={{
          padding: "28px 32px",
          minHeight: 280,
          position: "relative",
          fontFamily: "monospace",
          fontSize: 22,
          lineHeight: 1.6,
          color: "#E2E8F0",
          whiteSpace: "pre-wrap",
          wordBreak: "break-all",
        }}
      >
        {displayedText}
        <span
          style={{
            display: "inline-block",
            width: 12,
            height: 24,
            backgroundColor: theme.colors.accent,
            marginLeft: 4,
            verticalAlign: "middle",
            opacity: cursorBlink ? 1 : 0,
            boxShadow: `0 0 10px ${theme.colors.accent}`,
          }}
        />

        {/* Popping Fake Function / Error Warning */}
        {errorPop > 0.05 && (
          <div
            style={{
              marginTop: 24,
              padding: "16px 20px",
              borderRadius: 12,
              background: "rgba(255, 51, 102, 0.15)",
              border: `1.5px solid ${theme.colors.danger}`,
              boxShadow: `0 0 24px ${theme.colors.dangerGlow}`,
              display: "flex",
              alignItems: "center",
              gap: 16,
              opacity: errorPop,
              transform: `scale(${errorPop})`,
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: theme.colors.danger,
                color: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 900,
                fontSize: 18,
                flexShrink: 0,
              }}
            >
              !
            </div>
            <div>
              <div
                style={{
                  fontFamily: theme.fontFamily,
                  color: theme.colors.danger,
                  fontWeight: 800,
                  fontSize: 18,
                }}
              >
                TypeError: verifyUserFact is not a function
              </div>
              <div
                style={{
                  fontFamily: theme.fontFamily,
                  color: "#FDA4AF",
                  fontSize: 15,
                  marginTop: 2,
                }}
              >
                Module "@ai/nonexistent-core" does not exist in registry.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
