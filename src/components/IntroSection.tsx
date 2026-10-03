import { useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { loveData } from "../data/loveData";
import { useRelationship } from "../hooks/useRelationship";
import { AnimalCouple, Heart, PetalParticles, Rose } from "./Illustrations";
export function IntroSection() {
  const section = useRef<HTMLElement>(null);
  const [opened, setOpened] = useState(false);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start start", "end start"],
  });
  const drift = useTransform(scrollYProgress, [0, 1], [0, 65]);
  const time = useRelationship();
  const date = new Date(loveData.relationshipStart).toLocaleDateString(
    "it-IT",
    { day: "numeric", month: "long", year: "numeric" },
  );
  return (
    <section
      ref={section}
      className="intro"
      id="inizio"
      aria-labelledby="intro-title"
    >
      <PetalParticles />
      <div className="intro-top">
        <span>{loveData.dedication}</span>
        <span>UNA PICCOLA STORIA D’AMORE</span>
        <Heart />
      </div>
      <motion.div
        className="hero-botanicals"
        style={{ y: reduced ? 0 : drift }}
      >
        <Rose className="hero-rose rose-left" />
        <Rose className="hero-rose rose-right" />
      </motion.div>
      {opened && <PetalParticles burst />}
      <motion.div
        className="intro-content"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
      >
        <p className="eyebrow">DAL {date.toLocaleUpperCase("it-IT")}…</p>
        <h1 id="intro-title">
          Siamo <em>noi</em> da
        </h1>
        <div
          className="calendar-counter"
          aria-label={`${time.years} anni, ${time.months} mesi, ${time.days} giorni`}
        >
          {[
            [time.years, time.years === 1 ? "anno" : "anni"],
            [time.months, time.months === 1 ? "mese" : "mesi"],
            [time.days, time.days === 1 ? "giorno" : "giorni"],
          ].map(([value, label]) => (
            <div key={label}>
              <span>{String(value).padStart(2, "0")}</span>
              <small>{label}</small>
            </div>
          ))}
        </div>
        <p className="clock-counter">
          <span>{String(time.hours).padStart(2, "0")} ore</span>
          <b>·</b>
          <span>{String(time.minutes).padStart(2, "0")} minuti</span>
          <b>·</b>
          <span>{String(time.seconds).padStart(2, "0")} secondi</span>
        </p>
        <AnimalCouple />
        <p className="intro-message">
          {loveData.introMessage} <Heart />
        </p>
        <motion.a
          className="primary-button"
          href="#lettera"
          whileTap={{ scale: 0.95 }}
          onClick={() => setOpened(true)}
        >
          Apri <Heart />
        </motion.a>
        <span className="handwritten intro-note">
          solo per te, con tutto il cuore
        </span>
      </motion.div>
      <a
        href="#lettera"
        className="scroll-cue"
        aria-label="Scopri la nostra storia"
      >
        <span>SCORRI PIANO, SIAMO SOLO NOI</span>
        <i />
      </a>
    </section>
  );
}
