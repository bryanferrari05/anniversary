import { MotionConfig } from "framer-motion";
import { IntroSection } from "./components/IntroSection";
import { EnvelopeSection } from "./components/EnvelopeSection";
import { StatsSection } from "./components/StatsSection";
import { PhotoScrapbook } from "./components/PhotoScrapbook";
import { NightScene } from "./components/NightScene";
import { HeartMessageGenerator } from "./components/HeartMessageGenerator";
import { FinalScene } from "./components/FinalScene";
import { MusicPlayer } from "./components/MusicPlayer";
export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#lettera">
        Vai alla lettera
      </a>
      <main>
        <IntroSection />
        <EnvelopeSection />
        <StatsSection />
        <PhotoScrapbook />
        <NightScene />
        <HeartMessageGenerator />
        <FinalScene />
      </main>
      <MusicPlayer />
    </MotionConfig>
  );
}
