import { useState, useEffect, useRef } from 'react';
import song from '../music/chand.mp3';

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.25);
  const [showVolume, setShowVolume] = useState(false);
  const audioRef = useRef(null);

  // Use a royalty-free romantic ambient music URL
  const MUSIC_URL = song;

  useEffect(() => {
    const audio = new Audio(MUSIC_URL);
    audio.loop = true;
    audio.volume = volume;
    audioRef.current = audio;

    // Attempt autoplay
    const tryPlay = async () => {
      try {
        await audio.play();
        setPlaying(true);
      } catch {
        // Autoplay blocked — user must interact first
        setPlaying(false);
      }
    };

    const timeout = setTimeout(tryPlay, 1000);

    return () => {
      clearTimeout(timeout);
      audio.pause();
      audio.src = '';
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  const handleVolume = (e) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    if (audioRef.current) audioRef.current.volume = v;
  };

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2"
      onMouseEnter={() => setShowVolume(true)}
      onMouseLeave={() => setShowVolume(false)}
    >
      {/* Volume slider */}
      {showVolume && (
        <div className="glass-card px-4 py-3 flex items-center gap-2">
          <span className="text-xs text-rose-300 font-body">🎵</span>
          <input
            type="range" min="0" max="1" step="0.05"
            value={volume} onChange={handleVolume}
            className="w-20 accent-rose-500 cursor-pointer"
          />
        </div>
      )}

      {/* Play/Pause button */}
      <button
        onClick={togglePlay}
        className="relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300"
        style={{
          background: 'linear-gradient(135deg, #be123c, #f43f5e)',
          boxShadow: playing
            ? '0 0 20px rgba(244,63,94,0.8), 0 0 40px rgba(244,63,94,0.4)'
            : '0 0 10px rgba(244,63,94,0.4)',
        }}
      >
        {/* Pulse ring when playing */}
        {playing && (
          <>
            <span className="absolute inset-0 rounded-full border-2 border-rose-400 animate-ping opacity-40" />
            <span className="absolute inset-0 rounded-full border border-rose-300 animate-ping opacity-20" style={{ animationDelay: '0.5s' }} />
          </>
        )}

        <span className="text-xl z-10">
          {playing ? '🎵' : '🎶'}
        </span>
      </button>

      <p className="text-rose-300 text-xs font-body opacity-70">
        {playing ? 'Music On' : 'Play Music'}
      </p>
    </div>
  );
}
