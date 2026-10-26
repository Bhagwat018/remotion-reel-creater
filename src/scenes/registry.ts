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
};

export const getSceneComponent = (type: string): SceneComponent => {
  const component = sceneRegistry[type as SceneType];
  if (!component) {
    throw new Error(
      `Unknown scene type "${type}". Valid types are: ${VALID_SCENE_TYPES.join(", ")}`
    );
  }
  return component;
};
