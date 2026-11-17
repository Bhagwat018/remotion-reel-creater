import React from "react";
import { SceneLayout } from "../components/SceneLayout";
import { ArchitectureFlow, FlowNode } from "../components/ArchitectureFlow";
import { MotionDirection } from "../lib/directionalMotion";
import { CapacitiveMatrixScene } from "./touchscreen/CapacitiveMatrixScene";
import { IncognitoHookScene } from "./incognito/IncognitoHookScene";
import { NetworkLeakInspectorScene } from "./incognito/NetworkLeakInspectorScene";
import { GoogleLawsuitScene } from "./incognito/GoogleLawsuitScene";
import { QrHookScene } from "./qrcode/QrHookScene";
import { ReedSolomonMatrixScene } from "./qrcode/ReedSolomonMatrixScene";
import { QrSelfHealScene } from "./qrcode/QrSelfHealScene";
import { QrLogoSecretScene } from "./qrcode/QrLogoSecretScene";
import { AtmScannerHookScene } from "./atm/AtmScannerHookScene";
import { AtmXrayChamberScene } from "./atm/AtmXrayChamberScene";
import { AtmUvSpectrumScene } from "./atm/AtmUvSpectrumScene";
import { AtmMagneticHeadScene } from "./atm/AtmMagneticHeadScene";
import { AtmThicknessLaserScene } from "./atm/AtmThicknessLaserScene";
import { AtmPhysicsCompareScene } from "./atm/AtmPhysicsCompareScene";
import { AirplaneHookScene } from "./airplane/AirplaneHookScene";
import { AirplaneCrashMythScene } from "./airplane/AirplaneCrashMythScene";
import { AirplaneRfBlastScene } from "./airplane/AirplaneRfBlastScene";
import { AirplanePilotHeadsetBuzzScene } from "./airplane/AirplanePilotHeadsetBuzzScene";
import { AirplaneRadarAltimeterScene } from "./airplane/AirplaneRadarAltimeterScene";
import {
  MetaCodeHookScene,
  MetaStep1VoiceScene,
  MetaStep2WhisperScene,
  MetaStep3RemotionScene,
  MetaStep4LipSyncScene,
} from "./metacode";
import {
  MarketHookScene,
  MarketMysteryScene,
  MarketOrderMatchingScene,
  MarketSettlementScene,
} from "./market";

export interface FlowSceneProps {
  id?: string;
  type?: "flow";
  headline?: string;
  leadIn?: string;
  nodes?: FlowNode[];
  steps?: FlowNode[];
  flow?: FlowNode[];
  durationInFrames: number;
  direction?: MotionDirection;
  brand?: string;
  brollVideo?: string;
  bgImage?: string;
  slug?: string;
}

export const FlowScene: React.FC<FlowSceneProps> = ({
  id,
  direction,
  leadIn = "ARCHITECTURE PIPELINE",
  headline = "HIGH-THROUGHPUT *SYSTEM*",
  nodes,
  steps,
  flow,
  brand,
  brollVideo,
  bgImage,
  slug,
  durationInFrames,
}) => {
  // Bespoke Share Market Scene 1: Hook (Roz Subah 9:15 Pe Invisible Bazaar)
  if (
    (slug === "how-share-market-really-works" && id === "s1-hook") ||
    (headline && (headline.includes("9:15 PE INVISIBLE BAZAAR") || headline.includes("DUKAAN EK BHI NAHI")))
  ) {
    return (
      <MarketHookScene
        id={id}
        leadIn={leadIn}
        headline={headline}
        brollVideo={brollVideo}
        durationInFrames={durationInFrames}
      />
    );
  }

  // Bespoke Share Market Scene 2: The Mystery Architecture (Invisible System)
  if (
    (slug === "how-share-market-really-works" && id === "s2-pipeline") ||
    (headline && (headline.includes("INVISIBLE SYSTEM KAAM KAISE") || headline.includes("SHARE MARKET KA MYSTERY")))
  ) {
    return (
      <MarketMysteryScene
        id={id}
        leadIn={leadIn}
        headline={headline}
        brollVideo={brollVideo}
        durationInFrames={durationInFrames}
      />
    );
  }

  // Bespoke Share Market Scene 3: High-Speed Matching Engine (0.001s NSE Matching)
  if (
    (slug === "how-share-market-really-works" && id === "s3-matching") ||
    (headline && (headline.includes("HIGH-SPEED MATCHING ENGINE") || headline.includes("0.001 SECOND ME MATCH")))
  ) {
    return (
      <MarketOrderMatchingScene
        id={id}
        leadIn={leadIn}
        headline={headline}
        brollVideo={brollVideo}
        durationInFrames={durationInFrames}
      />
    );
  }

  // Bespoke Share Market Scene 4: SEBI Radar & T+1 Demat Deposit Vault
  if (
    (slug === "how-share-market-really-works" && id === "s4-settlement") ||
    (headline && (headline.includes("SEBI SURVEILLANCE RADAR") || headline.includes("T+1 DEMAT DEPOSIT")))
  ) {
    return (
      <MarketSettlementScene
        id={id}
        leadIn={leadIn}
        headline={headline}
        brollVideo={brollVideo}
        durationInFrames={durationInFrames}
      />
    );
  }

  // Bespoke Meta Code Scene 1: Hook (0 Camera, 0 Mic, 0 Editor)
  if (
    (slug === "this-video-is-100-percent-code" && id === "s1-hook") ||
    (headline && (headline.includes("100% CODE AUR AI") || headline.includes("ZERO CAMERA") || headline.includes("YEH POORI VIDEO")))
  ) {
    return (
      <MetaCodeHookScene
        id={id}
        leadIn={leadIn}
        headline={headline}
        brollVideo={brollVideo}
        durationInFrames={durationInFrames}
      />
    );
  }

  // Bespoke Meta Code Scene 2: Step 1 (AI Agent Research + Voice)
  if (
    (slug === "this-video-is-100-percent-code" && id === "s2-voice") ||
    (headline && (headline.includes("HYPER-REALISTIC VOICE") || headline.includes("STEP 01: AUTONOMOUS INTELLIGENCE")))
  ) {
    return (
      <MetaStep1VoiceScene
        id={id}
        leadIn={leadIn}
        headline={headline}
        brollVideo={brollVideo}
        durationInFrames={durationInFrames}
      />
    );
  }

  // Bespoke Meta Code Scene 3: Step 2 (Whisper AI Timestamps)
  if (
    (slug === "this-video-is-100-percent-code" && id === "s3-whisper") ||
    (headline && (headline.includes("WHISPER AI") || headline.includes("MILLISECOND-ACCURATE TIMESTAMP")))
  ) {
    return (
      <MetaStep2WhisperScene
        id={id}
        leadIn={leadIn}
        headline={headline}
        brollVideo={brollVideo}
        durationInFrames={durationInFrames}
      />
    );
  }

  // Bespoke Meta Code Scene 4: Step 3 (React + Remotion Math Engine)
  if (
    (slug === "this-video-is-100-percent-code" && id === "s4-remotion") ||
    (headline && (headline.includes("REACT AUR REMOTION") || headline.includes("MATHEMATICALLY RENDER")))
  ) {
    return (
      <MetaStep3RemotionScene
        id={id}
        leadIn={leadIn}
        headline={headline}
        brollVideo={brollVideo}
        durationInFrames={durationInFrames}
      />
    );
  }

  // Bespoke Meta Code Scene 5: Step 4 (Avatar Lip-Sync Soundwaves)
  if (
    (slug === "this-video-is-100-percent-code" && id === "s5-lipsync") ||
    (headline && (headline.includes("SOUNDWAVE KE ALGORITHM") || headline.includes("ALGORITHMIC VISEMES")))
  ) {
    return (
      <MetaStep4LipSyncScene
        id={id}
        leadIn={leadIn}
        headline={headline}
        brollVideo={brollVideo}
        durationInFrames={durationInFrames}
      />
    );
  }

  // Bespoke Airplane Scene 1: Takeoff Hook
  if (
    (slug === "why-airplane-mode-on-flights" && id === "s1-hook") ||
    (headline && (headline.includes("PLANE CRASH HO SAKTA HAI") || headline.includes("AIRPLANE MODE PAR DAALO")))
  ) {
    return (
      <AirplaneHookScene
        id={id}
        leadIn={leadIn}
        headline={headline}
        brollVideo={brollVideo}
        durationInFrames={durationInFrames}
      />
    );
  }

  // Bespoke Airplane Scene 2: Crash Myth & 2 Danger Vectors
  if (headline && (headline.includes("PLANE CRASH TOH NAHI HOGA") || headline.includes("2 BADE KHATRE"))) {
    return (
      <AirplaneCrashMythScene
        id={id}
        leadIn={leadIn}
        headline={headline}
        brollVideo={brollVideo}
        durationInFrames={durationInFrames}
      />
    );
  }

  // Bespoke Airplane Scene 3: 35,000ft Tower Search 3W RF Blast
  if (headline && (headline.includes("35,000 FEET") || headline.includes("FULL POWER RF BLAST"))) {
    return (
      <AirplaneRfBlastScene
        id={id}
        leadIn={leadIn}
        headline={headline}
        brollVideo={brollVideo}
        durationInFrames={durationInFrames}
      />
    );
  }

  // Bespoke Airplane Scene 4: Pilot Headset Audio Jamming
  if (headline && (headline.includes("PILOT HEADSET AUDIO JAM") || headline.includes("BZZ-BZZ") || headline.includes("AIR TRAFFIC CONTROL"))) {
    return (
      <AirplanePilotHeadsetBuzzScene
        id={id}
        leadIn={leadIn}
        headline={headline}
        brollVideo={brollVideo}
        durationInFrames={durationInFrames}
      />
    );
  }

  // Bespoke Airplane Scene 5: 5G Signals vs Radar Altimeter in Fog
  if (headline && (headline.includes("RADAR ALTIMETER") || headline.includes("HIGH-POWER 5G SIGNALS") || headline.includes("RUNWAY HEIGHT IN"))) {
    return (
      <AirplaneRadarAltimeterScene
        id={id}
        leadIn={leadIn}
        headline={headline}
        brollVideo={brollVideo}
        durationInFrames={durationInFrames}
      />
    );
  }

  // Bespoke ATM Scene 1: 0.2s Scanner Hook
  if (
    (slug === "how-atm-detects-fake-notes" && id === "s1-hook") ||
    (headline && (headline.includes("ATM FAKE NOTE") || headline.includes("0.2 SECOND FRAUD")))
  ) {
    return (
      <AtmScannerHookScene
        id={id}
        leadIn={leadIn}
        headline={headline}
        brollVideo={brollVideo}
        durationInFrames={durationInFrames}
      />
    );
  }

  // Bespoke ATM Scene 2: Multi-Layer X-Ray Chamber
  if (headline && (headline.includes("X-RAY KARTA HAI") || headline.includes("3-TIER HARDWARE"))) {
    return (
      <AtmXrayChamberScene
        id={id}
        leadIn={leadIn}
        headline={headline}
        brollVideo={brollVideo}
        durationInFrames={durationInFrames}
      />
    );
  }

  // Bespoke ATM Scene 3: UV Light Fluorescence
  if (headline && (headline.includes("UV LIGHT") || headline.includes("CHUPI GLOWING INK") || headline.includes("365nm OPTICAL"))) {
    return (
      <AtmUvSpectrumScene
        id={id}
        leadIn={leadIn}
        headline={headline}
        brollVideo={brollVideo}
        durationInFrames={durationInFrames}
      />
    );
  }

  // Bespoke ATM Scene 4: Magnetic Head Security Thread
  if (headline && (headline.includes("MAGNETIC HEAD") || headline.includes("SECURITY THREAD") || headline.includes("FERRO-MAGNETIC"))) {
    return (
      <AtmMagneticHeadScene
        id={id}
        leadIn={leadIn}
        headline={headline}
        brollVideo={brollVideo}
        durationInFrames={durationInFrames}
      />
    );
  }

  // Bespoke ATM Scene 5: Laser Thickness & 100% Pure Cotton
  if (headline && (headline.includes("LASER SENSOR") || headline.includes("100% PURE COTTON") || headline.includes("OPTICAL LASER CALIPER"))) {
    return (
      <AtmThicknessLaserScene
        id={id}
        leadIn={leadIn}
        headline={headline}
        brollVideo={brollVideo}
        durationInFrames={durationInFrames}
      />
    );
  }

  // Bespoke ATM Scene 6: Scammers Print vs Laws of Physics
  if (headline && (headline.includes("CANNOT COPY PHYSICS") || headline.includes("COUNTERFEITS ALWAYS FAIL"))) {
    return (
      <AtmPhysicsCompareScene
        id={id}
        leadIn={leadIn}
        headline={headline}
        brollVideo={brollVideo}
        durationInFrames={durationInFrames}
      />
    );
  }

  // Bespoke scene for QR Hook
  if (
    (slug === "how-qr-code-error-correction-works" && id === "s1-hook") ||
    (headline && (headline.includes("SCRATCH QR CODE") || headline.includes("KAISE SCAN HOTA HAI")))
  ) {
    return (
      <QrHookScene
        id={id}
        leadIn={leadIn}
        headline={headline}
        brollVideo={brollVideo}
        durationInFrames={durationInFrames}
      />
    );
  }

  // Bespoke scene for Reed-Solomon Error Correction (NASA Deep Space)
  if (headline && (headline.includes("REED-SOLOMON") || headline.includes("DEEP SPACE ALGORITHM"))) {
    return (
      <ReedSolomonMatrixScene
        id={id}
        leadIn={leadIn}
        headline={headline}
        brollVideo={brollVideo}
        durationInFrames={durationInFrames}
      />
    );
  }

  // Bespoke scene for Polynomial QR Self-Healing
  if (headline && (headline.includes("POLYNOMIAL") || headline.includes("RECONSTRUCTING MISSING PIXELS"))) {
    return (
      <QrSelfHealScene
        id={id}
        leadIn={leadIn}
        headline={headline}
        brollVideo={brollVideo}
        durationInFrames={durationInFrames}
      />
    );
  }

  // Bespoke scene for QR Center Logo Secret
  if (headline && (headline.includes("LOGO IS") || headline.includes("CENTER LOGO HACK"))) {
    return (
      <QrLogoSecretScene
        id={id}
        leadIn={leadIn}
        headline={headline}
        brollVideo={brollVideo}
        durationInFrames={durationInFrames}
      />
    );
  }

  // Bespoke scene for Touchscreen Capacitive Matrix
  if (slug === "why-phone-touchscreen-works" || (headline && headline.includes("CAPACITIVE"))) {
    return (
      <CapacitiveMatrixScene
        id={id}
        leadIn={leadIn}
        headline={headline}
        brollVideo={brollVideo}
        durationInFrames={durationInFrames}
      />
    );
  }

  // Bespoke scene for Incognito Hook
  if (
    (slug === "the-truth-about-incognito-mode" && (id === "s1-hook" || (headline && (headline.includes("ASLI SACH") || headline.includes("ILLUSION")))))
  ) {
    return (
      <IncognitoHookScene
        id={id}
        leadIn={leadIn}
        headline={headline}
        brollVideo={brollVideo}
        durationInFrames={durationInFrames}
      />
    );
  }

  // Bespoke scene for $5B Google Lawsuit
  if (headline && (headline.includes("LAWSUIT") || headline.includes("5,000,000,000") || headline.includes("SETTLEMENT"))) {
    return (
      <GoogleLawsuitScene
        id={id}
        leadIn={leadIn}
        headline={headline}
        brollVideo={brollVideo}
        durationInFrames={durationInFrames}
      />
    );
  }

  // Bespoke scene for Network Leak Inspector
  if (
    headline &&
    (headline.includes("DNS LEAKS") ||
      headline.includes("SURVEILLANCE") ||
      headline.includes("FINGERPRINTING") ||
      headline.includes("TRACKER"))
  ) {
    let activeTrackerIndex = 0;
    if (headline.includes("AIRTEL") || headline.includes("SURVEILLANCE") || headline.includes("#2")) activeTrackerIndex = 1;
    if (headline.includes("FINGERPRINTING") || headline.includes("#3")) activeTrackerIndex = 2;
    return (
      <NetworkLeakInspectorScene
        id={id}
        leadIn={leadIn}
        headline={headline}
        brollVideo={brollVideo}
        durationInFrames={durationInFrames}
        activeTrackerIndex={activeTrackerIndex}
      />
    );
  }

  const resolvedNodes = nodes || steps || flow;

  return (
    <SceneLayout
      id={id}
      direction={direction}
      leadIn={leadIn}
      headline={headline}
      brand={brand}
      brollVideo={brollVideo}
      bgImage={bgImage}
      durationInFrames={durationInFrames}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
          marginTop: 10,
        }}
      >
        <ArchitectureFlow nodes={resolvedNodes} delayFrames={4} />
      </div>
    </SceneLayout>
  );
};
