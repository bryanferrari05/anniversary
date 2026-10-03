import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { useRelationship } from "../hooks/useRelationship";
import { AnimalCouple } from "./Illustrations";
import { Reveal } from "./Reveal";
function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const visible = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [number, setNumber] = useState(0);
  useEffect(() => {
    if (!visible) return;
    if (reduce) {
      setNumber(value);
      return;
    }
    let frame = 0;
    const start = performance.now();
    const draw = (now: number) => {
      const p = Math.min(1, (now - start) / 1700);
      setNumber(Math.round(value * (1 - (1 - p) ** 3)));
      if (p < 1) frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, [value, visible, reduce]);
  return <span ref={ref}>{number.toLocaleString("it-IT")}</span>;
}
export function StatsSection() {
  const time = useRelationship();
  return (
    <section
      className="section stats-section"
      id="noi"
      aria-labelledby="stats-title"
    >
      <Reveal>
        <p className="eyebrow">02 / IL TEMPO, INSIEME</p>
        <h2 id="stats-title">
          Facciamo
          <br />
          <em>due conti.</em>
        </h2>
      </Reveal>
      <div className="stats-scene">
        <div className="stats-orbit" />
        <AnimalCouple pose="rose" />
        <span className="handwritten stats-note">
          sì, ci siamo sopportati
          <br />
          per tutto questo tempo.
        </span>
      </div>
      <div className="stats-grid">
        {[
          [time.years, time.years === 1 ? "anno di noi" : "anni di noi"],
          [time.totalMonths, "mesi totali"],
          [time.totalDays, "giorni totali"],
          [time.totalHours, "ore totali"],
        ].map(([value, label]) => (
          <div className="stat" key={label}>
            <CountUp value={Number(value)} />
            <small>{label}</small>
          </div>
        ))}
      </div>
      <Reveal>
        <p className="stats-ending">
          E ancora <em>ci parliamo.</em>
        </p>
        <span className="tiny-heart">♡</span>
      </Reveal>
    </section>
  );
}
