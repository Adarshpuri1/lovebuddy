import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const QUOTES = [
  '"You are my today and all of my tomorrows."',
  '"Every love story is beautiful, but ours is my favourite."',
  '"I fell in love with the way you fall asleep."',
  '"Tu hi meri shaam hai, tu subah meri." 🌸',
  '"You are the poem I never knew how to write."',
  '"With you, I am home." 🏡',
  '"Mohabbat mein tere dil ka haal kya hoga..." 💖',
  '"You make my soul smile." ✨',
  '"Before I met you, I never knew what it was like to look at someone and smile for no reason." 🌹',
  '"Teri aankhon mein dekha jo maine, khud ko kho diya." 💫',
];

export default function LoveQuotesTicker() {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Duplicate for seamless loop
    const items = track.children;
    const totalWidth = track.scrollWidth / 2;

    gsap.to(track, {
      x: `-=${totalWidth}`,
      duration: 40,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize(val => parseFloat(val) % totalWidth)
      }
    });
  }, []);

  const allQuotes = [...QUOTES, ...QUOTES];

  return (
    <div className="relative py-8 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(190,18,60,0.08) 0%, rgba(251,191,36,0.05) 50%, rgba(190,18,60,0.08) 100%)',
        borderTop: '1px solid rgba(244,63,94,0.15)',
        borderBottom: '1px solid rgba(244,63,94,0.15)',
      }}>

      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(90deg, #0a0005, transparent)' }} />
      <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, #0a0005)' }} />

      <div
        ref={trackRef}
        className="flex items-center gap-0 whitespace-nowrap"
        style={{ willChange: 'transform' }}
      >
        {allQuotes.map((q, i) => (
          <div key={i} className="flex items-center gap-0 shrink-0">
            <span className="font-body italic text-white/70 text-sm md:text-base px-6">{q}</span>
            <span className="text-rose-500 text-xs opacity-60">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
