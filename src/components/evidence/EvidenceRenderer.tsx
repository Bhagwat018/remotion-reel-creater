import React from "react";
import { EvidenceConfig } from "../../schema";
import { PhoneMockupViewport } from "./PhoneMockupViewport";
import { EvidenceInspectorCard } from "./EvidenceInspectorCard";
import { HeadlineClippingCard } from "./HeadlineClippingCard";
import { SplitProofViewer } from "./SplitProofViewer";

export interface EvidenceRendererProps {
  evidence: EvidenceConfig;
  durationInFrames: number;
}

export const EvidenceRenderer: React.FC<EvidenceRendererProps> = ({
  evidence,
  durationInFrames,
}) => {
  if (!evidence || !evidence.image) return null;

  switch (evidence.type) {
    case "phone-mockup":
      return (
        <PhoneMockupViewport
          image={evidence.image}
          badgeText={evidence.badgeText}
          caption={evidence.caption}
          source={evidence.source}
          panDistance={evidence.panDistance}
          durationInFrames={durationInFrames}
        />
      );

    case "zoom-callout":
      return (
        <EvidenceInspectorCard
          image={evidence.image}
          highlightLabel={evidence.highlightLabel}
          highlightBox={evidence.highlightBox}
          badgeText={evidence.badgeText}
          source={evidence.source}
          caption={evidence.caption}
          zoomTarget={evidence.zoomTarget}
          durationInFrames={durationInFrames}
        />
      );

    case "headline-clip":
      return (
        <HeadlineClippingCard
          image={evidence.image}
          source={evidence.source}
          headlineQuote={evidence.caption}
          badgeText={evidence.badgeText}
          caption={evidence.caption}
          highlightYPercent={evidence.highlightYPercent}
          durationInFrames={durationInFrames}
        />
      );

    case "split-proof":
      return (
        <SplitProofViewer
          image={evidence.image}
          secondaryImage={evidence.secondaryImage}
          leftLabel={evidence.leftLabel}
          rightLabel={evidence.rightLabel}
          savingsText={evidence.savingsText}
          badgeText={evidence.badgeText}
          source={evidence.source}
          durationInFrames={durationInFrames}
        />
      );

    default:
      return (
        <EvidenceInspectorCard
          image={evidence.image}
          durationInFrames={durationInFrames}
        />
      );
  }
};

