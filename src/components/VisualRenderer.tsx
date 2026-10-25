import React from "react";
import { WarningVisual } from "./WarningVisual";
import { GlitchVisual } from "./GlitchVisual";
import { ChatBubble } from "./ChatBubble";
import { CodeBlock } from "./CodeBlock";
import { ChecklistVisual } from "./ChecklistVisual";
import { DiagramVisual } from "./DiagramVisual";
import { CounterVisual } from "./CounterVisual";

interface VisualRendererProps {
  type: string;
}

export const VisualRenderer: React.FC<VisualRendererProps> = ({ type }) => {
  switch (type.toLowerCase()) {
    case "warning":
      return <WarningVisual />;
    case "glitch":
      return <GlitchVisual />;
    case "chat":
      return <ChatBubble />;
    case "code":
      return <CodeBlock />;
    case "checklist":
      return <ChecklistVisual />;
    case "diagram":
      return <DiagramVisual />;
    case "counter":
      return <CounterVisual />;
    default:
      return <WarningVisual />;
  }
};
