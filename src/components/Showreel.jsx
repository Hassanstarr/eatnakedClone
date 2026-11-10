import { useEffect, useRef, useState } from 'react';
import Player from '@vimeo/player';

const formatTime = (seconds) => `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;

export default function Showreel({ videoId = '1129496953', label = 'community showreel' }) {
  const iframe = useRef(null);
  const player = useRef(null);
  const [started, setStarted] = useState(false);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!started) return;
    let disposed = false;
    const video = new Player(iframe.current);
    player.current = video;
    const fail = () => { if (!disposed) setError(true); };
    video.on('play', () => { setPlaying(true); setReady(true); });
    video.on('pause', () => setPlaying(false));
    video.on('ended', () => setPlaying(false));
    video.on('timeupdate', ({ seconds }) => setTime(seconds));
    video.on('error', fail);
    video.ready().then(async () => {
      if (disposed) return;
      setDuration(await video.getDuration());
      await video.play();
    }).catch(fail);
    return () => { disposed = true; player.current = null; video.destroy().catch(() => {}); };
  }, [started]);

  const control = (action) => action().catch(() => setError(true));
  const toggle = () => started ? control(() => playing ? player.current.pause() : player.current.play()) : setStarted(true);

  return (
    <div className="group/video relative isolate w-full overflow-hidden rounded-[3.5rem] border border-outline bg-white/11 p-[0.9rem] max-nav:rounded-4xl">
      <div className="pointer-events-none absolute -top-12 right-14 -z-10 h-56 w-xl rounded-full bg-accent/45 blur-[50px]" />
      <div className="relative aspect-video overflow-hidden rounded-[3rem] bg-background max-nav:rounded-4xl">
        {started && <iframe ref={iframe} className="pointer-events-none absolute inset-0 size-full" src={`https://player.vimeo.com/video/${videoId}?background=1&autoplay=1&loop=0&muted=1&dnt=1`} title={`EATnaked ${label}`} allow="autoplay; encrypted-media; fullscreen; picture-in-picture" allowFullScreen />}
        {!ready && <img src="/assets/images/showreel-placeholder.avif" alt="The EATnaked team preparing fresh meals" className="absolute inset-0 size-full object-cover" />}
        {!error && <button type="button" className="absolute inset-0 grid size-full place-items-center" onClick={toggle} disabled={started && !ready} aria-label={`${started && !ready ? 'Loading' : playing ? 'Pause' : 'Play'} ${label}`}>
          <span className={`absolute top-1/2 left-1/2 grid h-1/5 max-h-60 w-1/5 max-w-60 -translate-1/2 place-items-center transition-opacity duration-300 ${playing ? 'opacity-0 group-hover/video:opacity-100 group-focus-within/video:opacity-100' : 'opacity-100'}`}>
            {started && !ready ? <span className="size-20 animate-spin rounded-full border-2 border-white/30 border-t-white" /> : playing ? <svg className="size-1/2" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="7" y="5" width="3" height="14" rx="1" /><rect x="14" y="5" width="3" height="14" rx="1" /></svg> : <img src="/assets/images/community/play.svg" alt="" className="size-full object-contain" />}
          </span>
        </button>}
        {error ? <p role="status" className="absolute inset-0 grid content-center gap-4 bg-background/85 p-8 text-center text-[1.6rem]">The video couldn’t load.<a className="text-accent underline" href={`https://vimeo.com/${videoId}`} target="_blank" rel="noreferrer">Watch on Vimeo</a></p> : <div className={`absolute inset-x-0 bottom-0 flex items-center gap-20 p-[min(4rem,4vw)] transition-opacity duration-300 max-nav:gap-4 ${playing ? 'opacity-0 group-hover/video:opacity-100 group-focus-within/video:opacity-100' : 'opacity-100'}`}>
          <span className="text-[2.5rem] tabular-nums max-nav:text-[1.2rem]">{formatTime(duration || time)}</span>
          <input className="h-4 min-w-0 flex-1 cursor-pointer accent-accent" type="range" aria-label={`Seek ${label}`} min="0" max={duration || 1} step="0.1" value={time} disabled={!ready} onChange={(event) => control(() => player.current.setCurrentTime(Number(event.target.value)).then(setTime))} />
          <button type="button" className="grid size-12 shrink-0 place-items-center max-nav:size-8" aria-label={`${muted ? 'Unmute' : 'Mute'} ${label}`} aria-pressed={!muted} disabled={!ready} onClick={() => control(async () => { await player.current.setMuted(!muted); setMuted(!muted); })}>
            <svg viewBox="0 0 24 24" fill="none" className="size-full" aria-hidden="true"><path d="M3 9v6h4l5 5V4L7 9H3Z" fill="currentColor" /><path d={muted ? 'm16 9 6 6m0-6-6 6' : 'M16 8c3 2 3 6 0 8m3-11c5 4 5 10 0 14'} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
          </button>
        </div>}
      </div>
    </div>
  );
}
