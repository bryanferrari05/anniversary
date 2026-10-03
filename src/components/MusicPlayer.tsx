import { useEffect, useRef, useState } from "react";
import { loveData } from "../data/loveData";

export function MusicPlayer() {
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    if (audio.current) audio.current.volume = 0.35;
  }, []);

  const toggle = async () => {
    if (!audio.current) return;

    if (playing) {
      audio.current.pause();
      return;
    }

    try {
      await audio.current.play();
      setUnavailable(false);
    } catch {
      setUnavailable(true);
    }
  };

  return (
    <div className="music-player">
      <audio
        ref={audio}
        src={loveData.music.file}
        preload="metadata"
        loop
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => {
          setUnavailable(true);
          setPlaying(false);
        }}
      />
      {unavailable && (
        <p className="music-notice" role="status">
          Audio non disponibile.
        </p>
      )}
      <button
        type="button"
        onClick={toggle}
        aria-label={
          playing
            ? `Metti in pausa ${loveData.music.title}`
            : `Ascolta ${loveData.music.title} di ${loveData.music.artist}`
        }
        aria-pressed={playing}
      >
        <span className={`music-symbol ${playing ? "playing" : ""}`} aria-hidden="true">
          {playing ? <><i /><i /><i /></> : "♪"}
        </span>
        <span>
          <strong>{loveData.music.title}</strong>
          {` · ${loveData.music.artist}`}
        </span>
      </button>
    </div>
  );
}
