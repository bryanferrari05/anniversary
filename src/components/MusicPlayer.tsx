import { loveData } from "../data/loveData";

export function MusicPlayer() {
  return (
    <div className="music-player">
      <a
        href={loveData.music.url}
        target="_blank"
        rel="noreferrer"
        aria-label={`Ascolta ${loveData.music.title} di ${loveData.music.artist}`}
      >
        <span className="music-symbol" aria-hidden="true">♪</span>
        <span>
          <strong>{loveData.music.title}</strong>
          {` · ${loveData.music.artist}`}
        </span>
      </a>
    </div>
  );
}
