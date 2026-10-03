import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { loveData } from "../data/loveData";
import { AnimalCouple, Rose } from "./Illustrations";
import { Modal } from "./Modal";
import { Reveal } from "./Reveal";
type Photo = (typeof loveData.photos)[number];
function PhotoImage({
  photo,
  eager = false,
}: {
  photo: Photo;
  eager?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  if (failed)
    return (
      <div className="photo-placeholder">
        <AnimalCouple />
        <span className="handwritten">un nostro ricordo, qui</span>
        <span>IO & TE</span>
      </div>
    );
  return (
    <img
      src={photo.src}
      alt={photo.caption}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      width="720"
      height="900"
      onError={() => setFailed(true)}
    />
  );
}
function PhotoLightbox({
  index,
  onChange,
  onClose,
}: {
  index: number;
  onChange: (index: number) => void;
  onClose: () => void;
}) {
  const next = (delta: number) =>
    onChange((index + delta + loveData.photos.length) % loveData.photos.length);
  useEffect(() => {
    const key = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") next(1);
      if (event.key === "ArrowLeft") next(-1);
    };
    document.addEventListener("keydown", key);
    return () => document.removeEventListener("keydown", key);
  });
  const photo = loveData.photos[index];
  return (
    <Modal label="I nostri ricordi" onClose={onClose} className="photo-modal">
      <AnimatePresence mode="wait">
        <motion.figure
          key={index}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragEnd={(_, info) => {
            if (Math.abs(info.offset.x) > 45) next(info.offset.x < 0 ? 1 : -1);
          }}
        >
          <PhotoImage photo={photo} eager />
          <figcaption>{photo.caption}</figcaption>
        </motion.figure>
      </AnimatePresence>
      <div className="lightbox-controls">
        <button onClick={() => next(-1)} aria-label="Foto precedente">
          ‹
        </button>
        <span aria-live="polite">
          {index + 1} / {loveData.photos.length}
        </span>
        <button onClick={() => next(1)} aria-label="Foto successiva">
          ›
        </button>
      </div>
    </Modal>
  );
}
export function PhotoScrapbook() {
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <section
      className="section scrapbook-section"
      id="ricordi"
      aria-labelledby="photos-title"
    >
      <Reveal>
        <p className="eyebrow">03 / PEZZETTI DI NOI</p>
        <h2 id="photos-title">
          Sei il mio
          <br />
          <em>ricordo preferito.</em>
        </h2>
        <p className="section-subtitle">
          Piccoli istanti. Un mondo intero.
          <br />
          Tocca una foto e fermati un po’.
        </p>
      </Reveal>
      <div className="scrapbook">
        {loveData.photos.map((photo, i) => (
          <Reveal className={`scrapbook-item item-${i + 1}`} key={photo.src}>
            <span className="handwritten photo-note">{photo.note}</span>
            <motion.button
              className="polaroid"
              style={{ rotate: [-4, 5, -2, 3, -5, 4][i] }}
              whileHover={{ rotate: 0, y: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelected(i)}
              aria-label={`Apri foto ${i + 1}: ${photo.caption}`}
            >
              <span className="tape" />
              <div
                className="photo-image"
                style={
                  { "--photo-bg": `url(${photo.src})` } as React.CSSProperties
                }
              >
                <PhotoImage photo={photo} />
              </div>
              <span className="photo-caption">{photo.caption}</span>
              <span className="photo-number">0{i + 1}</span>
            </motion.button>
            {[0, 3, 5].includes(i) && <Rose className="scrapbook-rose" />}
          </Reveal>
        ))}
      </div>
      <Reveal>
        <p className="handwritten scrapbook-footer">
          e tutte le foto che dobbiamo ancora scattare…
        </p>
      </Reveal>
      <AnimatePresence>
        {selected !== null && (
          <PhotoLightbox
            index={selected}
            onChange={setSelected}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
