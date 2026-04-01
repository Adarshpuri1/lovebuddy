import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FINAL_LINES = [
  "Since the day you came into my life,",
  "every moment feels like",
  "a beautiful dream.",
];

export default function FinalMessage() {
  const sectionRef = useRef(null);
  const lineRefs = useRef([]);
  const heartRef = useRef(null);
  const signatureRef = useRef(null);
  const orbitRef = useRef(null);

  useEffect(() => {
    // Animate lines one by one
    lineRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(el,
        { opacity: 0, y: 30, filter: 'blur(8px)' },
        {
          opacity: 1, y: 0, filter: 'blur(0px)',
          duration: 1.2, ease: 'power3.out',
          delay: i * 0.3,
          scrollTrigger: { trigger: el, start: 'top 90%' }
        }
      );
    });

    gsap.fromTo(heartRef.current,
      { opacity: 0, scale: 0 },
      {
        opacity: 1, scale: 1, duration: 1.5, ease: 'elastic.out(1, 0.5)',
        scrollTrigger: { trigger: heartRef.current, start: 'top 85%' }
      }
    );

    gsap.fromTo(signatureRef.current,
      { opacity: 0, x: -30 },
      {
        opacity: 1, x: 0, duration: 1.2, ease: 'power3.out', delay: 0.5,
        scrollTrigger: { trigger: signatureRef.current, start: 'top 90%' }
      }
    );

    // Orbiting hearts
    if (orbitRef.current) {
      gsap.to(orbitRef.current, {
        rotation: 360,
        duration: 12,
        repeat: -1,
        ease: 'none',
        transformOrigin: '50% 50%'
      });
    }
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 px-4 md:px-8 overflow-hidden" id="final">
      {/* Deep background glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 80% at 50% 50%, rgba(190,18,60,0.15) 0%, transparent 60%),
            radial-gradient(ellipse 40% 60% at 50% 100%, rgba(251,191,36,0.08) 0%, transparent 50%)
          `
        }}
      />

      {/* Starfield */}
      {Array.from({ length: 50 }).map((_, i) => (
        <div key={i} className="absolute star-particle rounded-full bg-white"
          style={{
            width: `${Math.random() * 2 + 0.5}px`,
            height: `${Math.random() * 2 + 0.5}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${1.5 + Math.random() * 2}s`
          }}
        />
      ))}

      <div className="relative max-w-3xl mx-auto text-center">
        {/* Orbiting hearts decoration */}
        <div className="relative w-32 h-32 mx-auto mb-12">
          <div
            ref={heartRef}
            className="absolute inset-0 flex items-center justify-center text-6xl opacity-0"
            style={{ zIndex: 10 }}
          >
            💖
          </div>
          <div ref={orbitRef} className="absolute inset-0">
            {['❤️','✨','🌹','💫','💕'].map((h, i) => (
              <div key={i} className="absolute"
                style={{
                  top: '50%', left: '50%',
                  transform: `rotate(${i * 72}deg) translateX(52px) translateY(-50%)`,
                  fontSize: '18px'
                }}>
                {h}
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 justify-center mb-12">
          <div className="h-px w-24" style={{ background: 'linear-gradient(90deg, transparent, #f43f5e)' }} />
          <span className="text-rose-400 text-sm tracking-widest uppercase font-body">Forever & Always</span>
          <div className="h-px w-24" style={{ background: 'linear-gradient(90deg, #f43f5e, transparent)' }} />
        </div>

        {/* Main poetic lines */}
        <div className="mb-12 space-y-2">
          {FINAL_LINES.map((line, i) => (
            <p
              key={i}
              ref={el => lineRefs.current[i] = el}
              className="font-display font-light text-white leading-snug opacity-0"
              style={{
                fontSize: i === 2 ? 'clamp(2rem, 6vw, 4rem)' : 'clamp(1.5rem, 4vw, 2.8rem)',
                textShadow: i === 2
                  ? '0 0 20px rgba(244,63,94,0.6), 0 0 40px rgba(244,63,94,0.3)'
                  : '0 0 15px rgba(244,63,94,0.3)',
                fontStyle: i === 2 ? 'italic' : 'normal',
              }}
            >
              {i === 2 ? <span className="shimmer-text">{line}</span> : line}
            </p>
          ))}
        </div>

        {/* Signature */}
        <div ref={signatureRef} className="opacity-0">
          <div className="inline-block glass-card px-10 py-6"
            style={{ boxShadow: '0 0 40px rgba(244,63,94,0.15)' }}>
            <p className="font-body text-white/50 text-sm tracking-widest uppercase mb-2">
              Written with love, always
            </p>
            <p className="font-cursive text-3xl text-rose-400">
              Yours, forever ❤️
            </p>
            <div className="flex justify-center gap-2 mt-4 text-lg">
              {['💕','🌹','✨','🌹','💕'].map((h, i) => (
                <span key={i} className="animate-sparkle" style={{ animationDelay: `${i * 0.2}s` }}>{h}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(transparent, #0a0005)' }} />
    </section>
  );
}
