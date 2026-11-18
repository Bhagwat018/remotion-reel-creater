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
import {
  MegaIpoHookScene,
  AnthropicProspectusScene,
  RevenueRocketScene,
  BigTechConflictScene,
  OutroIpoCtaScene,
} from "./anthropicIpo";
import {
  CrystalCropHookScene,
  AgroBusinessRevenueScene,
  ChinaDumpingImpactScene,
  GmpRiskTrapScene,
  CrystalOutroCtaScene,
} from "./crystalCropIpo";
import {
  WatranaHookScene,
  WarehouseRentalBoomScene,
  SmeLotSizeDebtScene,
  GmpDangerZoneScene,
  SmeRuleOutroCtaScene,
} from "./watranaRentalsIpo";
import {
  MahanadiHookScene,
  PowerGridCashMachineScene,
  ZeroDebtTreasuryScene,
  PsuGmpTrapLicScene,
  MahanadiOutroCtaScene,
} from "./mahanadiCoalfieldsIpo";

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

  // Bespoke scene dispatcher
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

    if (props.slug === "anthropic-biggest-ai-ipo" || props.slug?.includes("anthropic")) {
      if (props.id === "s1-hook" || props.sceneIndex === 0) {
        return React.createElement(MegaIpoHookScene, { ...props });
      }
      if (props.id === "s2-prospectus" || props.sceneIndex === 1) {
        return React.createElement(AnthropicProspectusScene, { ...props });
      }
      if (props.id === "s3-revenue" || props.sceneIndex === 2) {
        return React.createElement(RevenueRocketScene, { ...props });
      }
      if (props.id === "s4-conflict" || props.sceneIndex === 3) {
        return React.createElement(BigTechConflictScene, { ...props });
      }
      if (props.id === "s5-outro" || props.sceneIndex === 4) {
        return React.createElement(OutroIpoCtaScene, { ...props });
      }
    }

    if (props.slug === "crystal-crop-protection-ipo" || props.slug?.includes("crystal-crop")) {
      if (props.id === "s1-hook" || props.sceneIndex === 0) {
        return React.createElement(CrystalCropHookScene, { ...props });
      }
      if (props.id === "s2-business" || props.sceneIndex === 1) {
        return React.createElement(AgroBusinessRevenueScene, { ...props });
      }
      if (props.id === "s3-dumping" || props.sceneIndex === 2) {
        return React.createElement(ChinaDumpingImpactScene, { ...props });
      }
      if (props.id === "s4-gmp-trap" || props.sceneIndex === 3) {
        return React.createElement(GmpRiskTrapScene, { ...props });
      }
      if (props.id === "s5-outro" || props.sceneIndex === 4) {
        return React.createElement(CrystalOutroCtaScene, { ...props });
      }
    }

    if (props.slug === "watrana-rentals-ipo" || props.slug?.includes("watrana")) {
      if (props.id === "s1-hook" || props.sceneIndex === 0) {
        return React.createElement(WatranaHookScene, { ...props });
      }
      if (props.id === "s2-warehouse" || props.sceneIndex === 1) {
        return React.createElement(WarehouseRentalBoomScene, { ...props });
      }
      if (props.id === "s3-sme-debt" || props.sceneIndex === 2) {
        return React.createElement(SmeLotSizeDebtScene, { ...props });
      }
      if (props.id === "s4-gmp-danger" || props.sceneIndex === 3) {
        return React.createElement(GmpDangerZoneScene, { ...props });
      }
      if (props.id === "s5-outro" || props.sceneIndex === 4) {
        return React.createElement(SmeRuleOutroCtaScene, { ...props });
      }
    }

    if (props.slug === "mahanadi-coalfields-ipo" || props.slug?.includes("mahanadi")) {
      if (props.id === "s1-hook" || props.sceneIndex === 0) {
        return React.createElement(MahanadiHookScene, { ...props });
      }
      if (props.id === "s2-power-grid" || props.sceneIndex === 1) {
        return React.createElement(PowerGridCashMachineScene, { ...props });
      }
      if (props.id === "s3-zero-debt" || props.sceneIndex === 2) {
        return React.createElement(ZeroDebtTreasuryScene, { ...props });
      }
      if (props.id === "s4-gmp-trap" || props.sceneIndex === 3) {
        return React.createElement(PsuGmpTrapLicScene, { ...props });
      }
      if (props.id === "s5-outro" || props.sceneIndex === 4) {
        return React.createElement(MahanadiOutroCtaScene, { ...props });
      }
    }
    return React.createElement(component, props);
  };

  return PureCodeDispatchedScene;
};
