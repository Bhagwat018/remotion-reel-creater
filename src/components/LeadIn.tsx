import React from "react";
import { NeoTopPill } from "./neo/NeoTopPill";

interface LeadInProps {
  text?: string;
  delayFrames?: number;
}

const PILL_COLORS: Array<"orange" | "blue" | "pink" | "purple" | "green"> = [
  "orange",
  "blue",
  "pink",
  "purple",
  "green",
];

export const LeadIn: React.FC<LeadInProps> = ({ text, delayFrames = 0 }) => {
  if (!text) return null;

  // Pick deterministic color based on text
  const charCodeSum = text.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const color = PILL_COLORS[charCodeSum % PILL_COLORS.length];

  return <NeoTopPill text={text.toUpperCase()} color={color} delayFrames={delayFrames} />;
};
