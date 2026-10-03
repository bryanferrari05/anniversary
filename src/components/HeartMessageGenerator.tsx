import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { loveData } from "../data/loveData";
import { Heart } from "./Illustrations";
import { Reveal } from "./Reveal";
export function HeartMessageGenerator() {
  const [index, setIndex] = useState(-1);
  const [presses, setPresses] = useState(0);
  const reduce = useReducedMotion();
  const choose = () => {
    const count = loveData.loveMessages.length;
    if (!count) return;
    setIndex((previous) =>
      count === 1
        ? 0
        : previous < 0
          ? Math.floor(Math.random() * count)
          : (previous + 1 + Math.floor(Math.random() * (count - 1))) % count,
    );
    setPresses((v) => v + 1);
  };
  return (
    <section
      className="section messages-section"
      id="cuore"
      aria-labelledby="message-title"
    >
      <Reveal>
        <p className="eyebrow">05 / UN PROMEMORIA D’AMORE</p>
        <h2 id="message-title">
          Quando hai bisogno di ricordarti
          <br /> <em>quanto ti amo…</em>
        </h2>
      </Reveal>
      <div className="heart-stage">
        <span className="heart-orbit" />
        <span className="heart-orbit second" />
        <motion.button
          className="message-heart"
          aria-label="Premimi: scopri un messaggio d’amore"
          whileTap={{ scale: 0.88 }}
          onClick={choose}
          key={presses}
          animate={
            reduce ? undefined : { scale: presses ? [1, 1.13, 0.97, 1] : 1 }
          }
          transition={{ duration: 0.55 }}
        >
          <Heart />
        </motion.button>
        {presses > 0 && !reduce && (
          <div
            className="heart-burst"
            key={`burst-${presses}`}
            aria-hidden="true"
          >
            {Array.from({ length: 8 }, (_, i) => (
              <motion.span
                key={i}
                initial={{ x: 0, y: 0, opacity: 0.65, scale: 0.3 }}
                animate={{
                  x: Math.cos((i * Math.PI) / 4) * 130,
                  y: Math.sin((i * Math.PI) / 4) * 110,
                  opacity: 0,
                  scale: 0.8,
                  rotate: i * 50,
                }}
                transition={{ duration: 1.3 }}
              >
                <Heart />
              </motion.span>
            ))}
          </div>
        )}
      </div>
      <span className="handwritten">Premimi ♡</span>
      <div className="generated-message" aria-live="polite" aria-atomic="true">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
          >
            {index < 0
              ? "Certe cose non mi stancherò mai di dirtele."
              : loveData.loveMessages[index]}
          </motion.p>
        </AnimatePresence>
      </div>
      <p className="message-footnote">
        Un piccolo pensiero. Ogni volta che vuoi.
      </p>
    </section>
  );
}
