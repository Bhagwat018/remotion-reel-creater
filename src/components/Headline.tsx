import React, { useMemo } from "react";
import { useCurrentFrame } from "remotion";
import { hasDevanagari, resolveFontFamily, useTheme } from "../theme/theme";
import { useBlurIn } from "../lib/motion";
import { RoughHighlight, RoughAnnotationType } from "./RoughHighlight";

interface HeadlineProps {
  text: string;
  delayFrames?: number;
  maxWidth?: number;
  color?: string;
  textShadow?: string;
}

interface HeadlineToken {
  text: string;
  annotation?: RoughAnnotationType;
}

const renderSafeText = (str: string) => {
  if (!str.includes("%")) return str;
  const parts = str.split(/(%)/g);
  return parts.map((part, idx) =>
    part === "%" ? (
      <span
        key={idx}
        style={{
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
          fontWeight: 900,
          display: "inline-block",
          fontSize: "0.9em",
          transform: "translateY(-0.06em)",
          paddingLeft: "1px",
          paddingRight: "2px",
        }}
      >
        %
      </span>
    ) : (
      part
    )
  );
};

export const Headline: React.FC<HeadlineProps> = ({
  text: rawText,
  delayFrames = 2,
  maxWidth = 920,
  color,
  textShadow,
}) => {
  const text = rawText.replace(/₹/g, "Rs. ");
  const frame = useCurrentFrame();
  const theme = useTheme();

  const motionStyle =
    delayFrames === 0
      ? { opacity: 1, filter: "none", transform: "none" }
      : useBlurIn(frame, delayFrames);
  const fontFamily = resolveFontFamily(text, theme.typography.headline);
  const isDevanagariText = hasDevanagari(text);

  // Auto-fit font size based on text length to prevent safe-zone overflow
  const fontSize = useMemo(() => {
    const len = text.replace(/[*_~()]/g, "").trim().length;
    if (len <= 18) return 96;
    if (len <= 28) return 82;
    if (len <= 42) return 68;
    if (len <= 65) return 54;
    return 44;
  }, [text]);

  // Parse markdown-style annotations:
  // *word* -> Rough Highlight
  // *(word)* -> Rough Circle
  // _word_ -> Rough Underline
  // ~word~ -> Rough Strike-through
  const tokens = useMemo<HeadlineToken[]>(() => {
    const list: HeadlineToken[] = [];
    // Match *...*, _..._, ~...~
    const regex = /(\*([^*]+)\*|_([^_]+)_|~([^~]+)~)/g;
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        list.push({
          text: text.slice(lastIndex, match.index),
        });
      }

      if (match[2]) {
        // Star match: check if inner content has parentheses for circle
        const starContent = match[2];
        const circleMatch = starContent.match(/^\((.*)\)$/);
        if (circleMatch) {
          list.push({
            text: circleMatch[1],
            annotation: "circle",
          });
        } else {
          list.push({
            text: starContent,
            annotation: "highlight",
          });
        }
      } else if (match[3]) {
        // Underline match _text_
        list.push({
          text: match[3],
          annotation: "underline",
        });
      } else if (match[4]) {
        // Strikethrough match ~text~
        list.push({
          text: match[4],
          annotation: "strike-through",
        });
      }

      lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
      list.push({
        text: text.slice(lastIndex),
      });
    }

    console.error("DEBUG_HEADLINE_TOKENS:", JSON.stringify({ text, list }));
    return list;
  }, [text]);

  return (
    <div
      style={{
        ...motionStyle,
        width: "100%",
        maxWidth,
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          fontFamily,
          fontSize,
          lineHeight: 1.1,
          fontWeight: isDevanagariText ? 700 : 900,
          textTransform: "none",
          letterSpacing: isDevanagariText ? "normal" : "0.01em",
          color: color || theme.colors.ink,
          textShadow: textShadow || (color ? "0 4px 20px rgba(0,0,0,0.85)" : undefined),
          margin: 0,
          padding: 0,
          wordBreak: "break-word",
        }}
      >
        {tokens.map((token, i) => {
          if (!token.annotation) {
            console.error("DEBUG_TOKEN_0_RENDER:", {
              tokenText: token.text,
              color: color || theme.colors.ink,
            });
            return (
              <span
                key={i}
                style={{
                  color: color || theme.colors.ink,
                  textShadow: textShadow || (color ? "0 4px 20px rgba(0,0,0,0.95)" : undefined),
                }}
              >
                {renderSafeText(token.text)}
              </span>
            );
          }

          if (token.annotation === "circle") {
            return (
              <RoughHighlight
                key={i}
                type="circle"
                color="#ef4444"
                strokeWidth={5}
                padding={{ top: 10, bottom: 10, left: 16, right: 16 }}
                delayFrames={delayFrames + 4}
                durationFrames={12}
              >
                <span
                  style={{
                    color: color || theme.colors.ink,
                    padding: "0 6px",
                    textShadow: color ? "0 4px 16px rgba(0,0,0,0.95)" : undefined,
                  }}
                >
                  {renderSafeText(token.text)}
                </span>
              </RoughHighlight>
            );
          }

          if (token.annotation === "underline") {
            return (
              <RoughHighlight
                key={i}
                type="underline"
                color="#06b6d4"
                strokeWidth={5}
                delayFrames={delayFrames + 4}
                durationFrames={12}
              >
                <span
                  style={{
                    color: color || theme.colors.ink,
                    textShadow: color ? "0 4px 16px rgba(0,0,0,0.95)" : undefined,
                  }}
                >
                  {renderSafeText(token.text)}
                </span>
              </RoughHighlight>
            );
          }

          if (token.annotation === "strike-through") {
            return (
              <RoughHighlight
                key={i}
                type="strike-through"
                color="#ef4444"
                strokeWidth={5}
                delayFrames={delayFrames + 4}
                durationFrames={10}
              >
                <span style={{ color: color ? "rgba(255,255,255,0.7)" : "#64748b" }}>
                  {renderSafeText(token.text)}
                </span>
              </RoughHighlight>
            );
          }

          // Default highlight
          return (
            <RoughHighlight
              key={i}
              type="highlight"
              color={theme.colors.accent || "rgba(250, 204, 21, 0.45)"}
              delayFrames={delayFrames + 4}
              durationFrames={14}
            >
              <span
                style={{
                  color: color || theme.colors.ink,
                  padding: "0 4px",
                  textShadow: color ? "0 4px 16px rgba(0,0,0,0.95)" : undefined,
                }}
              >
                {renderSafeText(token.text)}
              </span>
            </RoughHighlight>
          );
        })}
      </h1>
    </div>
  );
};
