import React from "react";
import { SceneData, SceneType, VALID_SCENE_TYPES } from "../schema";
import { TitleScene } from "./TitleScene";
import { PillsScene } from "./PillsScene";
import { CardScene } from "./CardScene";
import { CodeScene } from "./CodeScene";
import { GridScene } from "./GridScene";
import { OrbitScene } from "./OrbitScene";
import { StampScene } from "./StampScene";
import { CompareScene } from "./CompareScene";
import { StatScene } from "./StatScene";
import { StepsScene } from "./StepsScene";
import { QuoteScene } from "./QuoteScene";
import { CtaScene } from "./CtaScene";
import { DiagramScene } from "./DiagramScene";
import { TerminalScene } from "./TerminalScene";
import { ChartScene } from "./ChartScene";
import { BotScene } from "./BotScene";
import { KnobsScene } from "./KnobsScene";
import { StackedScene } from "./StackedScene";
import { FlowScene } from "./FlowScene";
import { GmpGaugeScene } from "./GmpGaugeScene";
import { SubscriptionXrayScene } from "./SubscriptionXrayScene";
import { ValuationBattleScene } from "./ValuationBattleScene";
import { EvidenceScene } from "./EvidenceScene";
import { VisualBrollScene } from "./VisualBrollScene";
import {
  CodeEngineHookScene,
  CodePipelineScene,
  CodeVsHumanScene,
  CodeCtaScene,
} from "./pureAiCode";

type SceneComponent = React.FC<
  SceneData & { durationInFrames: number; sceneIndex?: number; slug?: string }
>;

export const sceneRegistry: Record<SceneType, SceneComponent> = {
  title: TitleScene as unknown as SceneComponent,
  pills: PillsScene as unknown as SceneComponent,
  card: CardScene as unknown as SceneComponent,
  code: CodeScene as unknown as SceneComponent,
  grid: GridScene as unknown as SceneComponent,
  orbit: OrbitScene as unknown as SceneComponent,
  stamp: StampScene as unknown as SceneComponent,
  compare: CompareScene as unknown as SceneComponent,
  stat: StatScene as unknown as SceneComponent,
  steps: StepsScene as unknown as SceneComponent,
  quote: QuoteScene as unknown as SceneComponent,
  cta: CtaScene as unknown as SceneComponent,
  diagram: DiagramScene as unknown as SceneComponent,
  terminal: TerminalScene as unknown as SceneComponent,
  chart: ChartScene as unknown as SceneComponent,
  bot: BotScene as unknown as SceneComponent,
  knobs: KnobsScene as unknown as SceneComponent,
  stacked: StackedScene as unknown as SceneComponent,
  flow: FlowScene as unknown as SceneComponent,
  "gmp-gauge": GmpGaugeScene as unknown as SceneComponent,
  "subscription-xray": SubscriptionXrayScene as unknown as SceneComponent,
  "valuation-battle": ValuationBattleScene as unknown as SceneComponent,
  evidence: EvidenceScene as unknown as SceneComponent,
  "visual-broll": VisualBrollScene as unknown as SceneComponent,
};

export const getSceneComponent = (type: string): SceneComponent => {
  const component = sceneRegistry[type as SceneType];
  if (!component) {
    throw new Error(
      `Unknown scene type "${type}". Valid types are: ${VALID_SCENE_TYPES.join(", ")}`
    );
  }

  // Bespoke scene dispatcher for pure AI coding reels (Zero Videos, Zero Images)
  const PureCodeDispatchedScene: SceneComponent = (props) => {
    if (props.slug === "pure-ai-code-reel" || props.slug?.includes("pure-ai-code")) {
      if (props.id === "s1-hook" || props.type === "code") {
        return React.createElement(CodeEngineHookScene, { durationInFrames: props.durationInFrames });
      }
      if (props.id === "s2-pipeline" || props.type === "flow") {
        return React.createElement(CodePipelineScene, { durationInFrames: props.durationInFrames });
      }
      if (props.id === "s3-battle" || props.type === "compare") {
        return React.createElement(CodeVsHumanScene, { durationInFrames: props.durationInFrames });
      }
      if (props.id === "s4-cta" || props.type === "cta") {
        return React.createElement(CodeCtaScene, { durationInFrames: props.durationInFrames });
      }
    }
    return React.createElement(component, props);
  };

  return PureCodeDispatchedScene;
};
