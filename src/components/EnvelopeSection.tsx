import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { loveData } from "../data/loveData";
import { Heart, PetalParticles, Rose } from "./Illustrations";
import { Reveal } from "./Reveal";
export function EnvelopeSection() {
  const [progress, setProgress] = useState(0);
  const [opened, setOpened] = useState(false);
  const held = useRef(false);
  const value = useRef(0);
  const frame = useRef(0);
  const previous = useRef(0);
  useEffect(() => () => cancelAnimationFrame(frame.current), []);
  const tick = (now: number) => {
    const delta = Math.min(64, now - previous.current);
    previous.current = now;
    value.current = Math.max(
      0,
      Math.min(1, value.current + delta / (held.current ? 1800 : -650)),
    );
    setProgress(value.current);
    if (value.current >= 1) {
      held.current = false;
      setOpened(true);
      return;
    }
    if (held.current || value.current > 0)
      frame.current = requestAnimationFrame(tick);
  };
  const start = () => {
    if (opened || held.current) return;
    held.current = true;
    cancelAnimationFrame(frame.current);
    previous.current = performance.now();
    frame.current = requestAnimationFrame(tick);
  };
  const stop = () => {
    held.current = false;
  };
  return (
    <section
      className={`section envelope-section ${opened ? "is-open" : ""}`}
      id="lettera"
      aria-labelledby="letter-title"
    >
      <Reveal>
        <p className="eyebrow">01 / UNA LETTERA PER TE</p>
        <h2 id="letter-title">
          Le cose belle
          <br />
          cominciano <em>piano.</em>
        </h2>
        <p className="section-subtitle">
          Appoggia qui la tua mano.
          <br />
          Ci sono parole che aspettano solo te.
        </p>
      </Reveal>
      <div className="envelope-stage">
        <Rose className="envelope-rose" />
        <AnimatePresence>
          {opened && (
            <motion.article
              className="envelope-letter"
              initial={{ opacity: 0, y: 100, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: 0.45,
                duration: 1.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <span className="letter-small">PER TE, SEMPRE</span>
              <p>{loveData.envelopeLetter}</p>
              <Heart />
            </motion.article>
          )}
        </AnimatePresence>
        <motion.div
          className="envelope"
          animate={{
            scale: !opened && progress > 0 ? 0.98 : 1,
            y: opened ? 15 : 0,
          }}
        >
          <div className="envelope-back" />
          <div
            className="envelope-flap"
            style={{ transform: opened ? "rotateX(180deg)" : undefined }}
          />
          <div className="envelope-front" />
          {!opened && (
            <button
              className="envelope-hold"
              aria-label="Tieni premuto per aprire la lettera"
              onPointerDown={(e) => {
                if (e.button !== 0) return;
                e.currentTarget.setPointerCapture(e.pointerId);
                start();
              }}
              onPointerUp={stop}
              onPointerCancel={stop}
              onLostPointerCapture={stop}
              onContextMenu={(e) => e.preventDefault()}
              onKeyDown={(e) => {
                if (e.key === " " || e.key === "Enter") {
                  e.preventDefault();
                  start();
                }
              }}
              onKeyUp={(e) => {
                if (e.key === " " || e.key === "Enter") stop();
              }}
              onBlur={stop}
              style={{
                boxShadow: `0 0 ${progress * 70}px ${progress * 20}px #d3917540`,
              }}
            >
              <svg
                className="hold-ring"
                viewBox="0 0 100 100"
                aria-hidden="true"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="44"
                  fill="none"
                  stroke="#ead3b888"
                  strokeWidth="2"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="44"
                  fill="none"
                  stroke="#fff0d7"
                  strokeWidth="3"
                  pathLength="1"
                  strokeDasharray="1"
                  strokeDashoffset={1 - progress}
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <Heart />
              <span
                className="hold-heart-fill"
                style={{ clipPath: `inset(${(1 - progress) * 100}% 0 0 0)` }}
              >
                <Heart />
              </span>
            </button>
          )}
          <span className="envelope-inscription">con amore</span>
        </motion.div>
        {opened && <PetalParticles burst />}
      </div>
      <p className="hold-hint" aria-live="polite">
        {opened
          ? "Alcune parole meritano di restare."
          : progress > 0
            ? "Ancora un piccolo momento…"
            : "TIENI PREMUTO IL CUORE PER APRIRE"}
      </p>
      {opened && (
        <a className="text-link" href="#noi">
          La nostra storia continua <span aria-hidden="true">↓</span>
        </a>
      )}
    </section>
  );
}
