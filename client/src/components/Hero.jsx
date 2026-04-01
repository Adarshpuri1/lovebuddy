import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Heart3D from './Heart3D';

const STARS = Array.from({ length: 120 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2.5 + 0.5,
  delay: Math.random() * 3,
  duration: 1.5 + Math.random() * 2
}));

export default function Hero() {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const scrollRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    tl.fromTo(overlayRef.current,
      { opacity: 1 },
      { opacity: 0, duration: 1.5, ease: 'power2.out' }
    )
    .fromTo(titleRef.current,
      { opacity: 0, y: 60, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 1.8, ease: 'power3.out' },
      '-=0.8'
    )
    .fromTo(subtitleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.4, ease: 'power2.out' },
      '-=0.8'
    )
    .fromTo(scrollRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
      '-=0.4'
    );

    // Continuous scroll arrow bounce
    gsap.to(scrollRef.current, {
      y: 10,
      repeat: -1,
      yoyo: true,
      duration: 1.2,
      ease: 'sine.inOut',
      delay: 3
    });
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden" id="hero">
      {/* Loading overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-20 loading-screen pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, #1a0010 0%, #0a0005 100%)' }}
      />

      {/* Starfield */}
      <div className="absolute inset-0 z-0">
        {STARS.map(s => (
          <div
            key={s.id}
            className="absolute rounded-full bg-white star-particle"
            style={{
              left: `${s.x}%`, top: `${s.y}%`,
              width: `${s.size}px`, height: `${s.size}px`,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.duration}s`
            }}
          />
        ))}
      </div>

      {/* Radial glow background */}
      <div className="absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 50% 40%, rgba(190,18,60,0.18) 0%, transparent 70%),
            radial-gradient(ellipse 40% 30% at 30% 70%, rgba(251,191,36,0.07) 0%, transparent 60%),
            radial-gradient(ellipse 40% 30% at 70% 20%, rgba(244,63,94,0.1) 0%, transparent 60%),
            radial-gradient(ellipse at center, #100010 0%, #050005 100%)
          `
        }}
      />

      {/* Three.js Heart - centered */}
      <div className="absolute inset-0 z-10" style={{ top: '-5%' }}>
        <Heart3D />
      </div>

      {/* Text overlay */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-end pb-24 px-6 text-center">
        <h1
          ref={titleRef}
          className="font-display text-4xl md:text-6xl lg:text-7xl font-light text-white leading-tight mb-4 opacity-0"
          style={{
            textShadow: '0 0 30px rgba(244,63,94,0.5), 0 0 60px rgba(244,63,94,0.2)',
            letterSpacing: '0.02em'
          }}
        >
          To The Most Beautiful
          <br />
          <span className="shimmer-text font-semibold">Girl In My World</span>
          <span className="ml-2">❤️</span>
        </h1>

        <p
          ref={subtitleRef}
          className="font-cursive text-xl md:text-2xl text-rose-300 opacity-0 mb-8"
          style={{ textShadow: '0 0 15px rgba(244,63,94,0.4)' }}
        >
          A love letter written in stars, for you alone...
        </p>

        <div ref={scrollRef} className="opacity-0 flex flex-col items-center gap-2">
          <p className="font-body text-sm text-rose-300/60 tracking-widest uppercase">Scroll to discover</p>
          <div className="w-6 h-10 rounded-full border border-rose-500/40 flex items-start justify-center p-1">
            <div className="w-1.5 h-3 rounded-full bg-rose-500 animate-bounce" />
          </div>
        </div>
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 z-5 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 50%, rgba(5,0,5,0.7) 100%)'
        }}
      />
    </section>
  );
}
