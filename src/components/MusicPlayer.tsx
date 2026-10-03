import { useRef, useState } from "react";
import { loveData } from "../data/loveData";
export function MusicPlayer() {
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const [busy, setBusy] = useState(false);
  const toggle = async () => {
    if (!audio.current || busy) return;
    if (playing) {
      audio.current.pause();
      return;
    }
    setBusy(true);
    try {
      await audio.current.play();
      setUnavailable(false);
    } catch {
      setUnavailable(true);
    } finally {
      setBusy(false);
    }
  };
  return (
    <div className="music-player">
      <audio
        ref={audio}
        src={loveData.music}
        preload="none"
        loop
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => {
          setUnavailable(true);
          setPlaying(false);
          setBusy(false);
        }}
      />
      {unavailable && (
        <p className="music-notice" role="status">
          La nostra canzone arriverà presto.
        </p>
      )}
      <button
        onClick={toggle}
        aria-label={
          playing
            ? "Metti in pausa la nostra canzone"
            : "Ascolta la nostra canzone"
        }
        aria-pressed={playing}
        disabled={busy}
      >
        <span
          className={`music-symbol ${playing ? "playing" : ""}`}
          aria-hidden="true"
        >
          {playing ? (
            <>
              <i />
              <i />
              <i />
            </>
          ) : (
            "♪"
          )}
        </span>
        <span>{playing ? "In pausa, se vuoi" : "La nostra canzone"}</span>
      </button>
    </div>
  );
}
