import React, { useMemo } from "react";
import { useCurrentFrame } from "remotion";
import { hasDevanagari, resolveFontFamily, useTheme } from "../theme/theme";
import { useBlurIn } from "../lib/motion";
import { RoughHighlight, RoughAnnotationType } from "./RoughHighlight";

interface HeadlineProps {
  text: string;
  delayFrames?: number;
  maxWidth?: number;
}

interface HeadlineToken {
  text: string;
  annotation?: RoughAnnotationType;
}

export const Headline: React.FC<HeadlineProps> = ({
  text,
  delayFrames = 2,
  maxWidth = 920,
}) => {
  const frame = useCurrentFrame();
  const theme = useTheme();

  const motionStyle = useBlurIn(frame, delayFrames);
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
          color: theme.colors.ink,
          margin: 0,
          padding: 0,
          wordBreak: "break-word",
        }}
      >
        {tokens.map((token, i) => {
          if (!token.annotation) {
            return <span key={i}>{token.text}</span>;
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
                <span style={{ color: theme.colors.ink, padding: "0 6px" }}>
                  {token.text}
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
                <span style={{ color: theme.colors.ink }}>{token.text}</span>
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
                <span style={{ color: "#64748b" }}>{token.text}</span>
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
              <span style={{ color: theme.colors.ink, padding: "0 4px" }}>
                {token.text}
              </span>
            </RoughHighlight>
          );
        })}
      </h1>
    </div>
  );
};
