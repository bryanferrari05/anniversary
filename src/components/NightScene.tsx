import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { loveData } from "../data/loveData";
import { AnimalCouple, Rose } from "./Illustrations";
import { Reveal } from "./Reveal";
const positions = [
  [16, 32],
  [77, 23],
  [48, 12],
  [85, 65],
  [14, 72],
];
export function NightScene() {
  const [selected, setSelected] = useState<number | null>(null);
  const [visited, setVisited] = useState<number[]>([]);
  const constellation =
    visited.length >= Math.min(3, loveData.starMessages.length);
  return (
    <section
      className="section night-section"
      id="stelle"
      aria-labelledby="night-title"
    >
      <div className="night-stars" aria-hidden="true">
        {Array.from({ length: 30 }, (_, i) => (
          <i
            key={i}
            style={{
              left: `${(i * 37 + 7) % 98}%`,
              top: `${(i * 23 + 3) % 83}%`,
              opacity: 0.2 + (i % 4) * 0.13,
              width: i % 3 === 0 ? 3 : 2,
              height: i % 3 === 0 ? 3 : 2,
            }}
          />
        ))}
      </div>
      <Reveal>
        <p className="eyebrow">04 / SOTTO LO STESSO CIELO</p>
        <h2 id="night-title">
          Tra tutte le stelle,
          <br />
          <em>io sceglierei te.</em>
        </h2>
        <p className="section-subtitle">
          Alcune stelle hanno qualcosa da dirti.
          <br />
          Toccane una.
        </p>
      </Reveal>
      <div className="star-field">
        <div className="moon" aria-hidden="true" />
        {loveData.starMessages.map((_, i) => {
          const p = positions[i % positions.length];
          return (
            <button
              key={i}
              style={{ left: `${p[0]}%`, top: `${p[1]}%` }}
              className={`interactive-star ${visited.includes(i) ? "visited" : ""} ${selected === i ? "selected" : ""}`}
              aria-label={`Scopri il messaggio della stella ${i + 1}`}
              aria-pressed={selected === i}
              onClick={() => {
                setSelected(i);
                setVisited((v) => (v.includes(i) ? v : [...v, i]));
              }}
            >
              <span>✧</span>
            </button>
          );
        })}
        <svg
          className={`constellation ${constellation ? "revealed" : ""}`}
          viewBox="0 0 300 230"
          aria-hidden="true"
        >
          <path
            d="m150 187-81-74 7-46 36-17 38 28 38-28 36 17 7 46-81 74"
            pathLength="1"
          />
          {[
            [150, 187],
            [69, 113],
            [76, 67],
            [112, 50],
            [150, 78],
            [188, 50],
            [224, 67],
            [231, 113],
          ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="2.4" />
          ))}
        </svg>
        <div className="star-message" aria-live="polite">
          <AnimatePresence mode="wait">
            {selected !== null && (
              <motion.p
                key={selected}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {loveData.starMessages[selected]}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
      <div className="night-couple">
        <AnimalCouple pose="night" />
        <Rose className="night-rose" />
      </div>
      <p className="handwritten night-note">
        {constellation
          ? "Vedi? Anche il cielo parla di noi."
          : "qui, accanto a te."}
      </p>
      <div className="night-ground" aria-hidden="true" />
    </section>
  );
}
