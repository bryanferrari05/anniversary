import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { loveData } from "../data/loveData";
import { AnimalCouple, Heart, PetalParticles, Rose } from "./Illustrations";
import { Modal } from "./Modal";
import { Reveal } from "./Reveal";
export function FinalScene() {
  const [open, setOpen] = useState(false);
  const [celebrate, setCelebrate] = useState(false);
  return (
    <section
      className="section final-section"
      id="sempre"
      aria-labelledby="final-title"
    >
      <Reveal>
        <p className="eyebrow">06 / E ADESSO?</p>
        <p className="final-line">Di cose ne abbiamo fatte.</p>
      </Reveal>
      <Reveal>
        <p className="final-line second-line">
          Direi che possiamo
          <br />
          continuare così.
        </p>
      </Reveal>
      <Reveal>
        <h2 id="final-title">
          Alla prossima
          <br />
          <em>avventura.</em>
        </h2>
      </Reveal>
      <motion.div
        className="final-illustration"
        onViewportEnter={() => setCelebrate(true)}
        viewport={{ once: true, amount: 0.6 }}
      >
        <Rose className="final-rose left" />
        <AnimalCouple pose="hug" />
        <Rose className="final-rose right" />
        {celebrate && <PetalParticles burst />}
      </motion.div>
      <Reveal delay={0.25}>
        <p className="anniversary-wish">
          Buon anniversario, Ciccia. <Heart />
        </p>
        <button
          className="primary-button last-button"
          onClick={() => setOpen(true)}
        >
          Un’ultima cosa…
        </button>
        <p className="handwritten final-signature">E adesso, dove si mangia?</p>
      </Reveal>
      <footer>
        <span>{loveData.dedication}</span>
        <Heart />
        <span>
          DAL {new Date(loveData.relationshipStart).toLocaleDateString("it-IT")}
        </span>
      </footer>
      <AnimatePresence>
        {open && (
          <Modal
            label="Un’ultima lettera per te"
            onClose={() => setOpen(false)}
            className="letter-modal"
          >
            <motion.article
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="final-letter"
            >
              <p className="eyebrow">POI HO FINITO, PROMESSO.</p>
              <h2>
                Ehi, <em>Ciccia.</em>
              </h2>
              <p className="letter-body">{loveData.finalLetter}</p>
              <Heart />
              <p className="handwritten">Fine. Per adesso.</p>
            </motion.article>
          </Modal>
        )}
      </AnimatePresence>
    </section>
  );
}
