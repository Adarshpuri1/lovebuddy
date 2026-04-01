import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const COMPLIMENTS = [
  { icon: '🌸', label: 'Her Smile', text: 'Your smile is the most beautiful thing I have ever seen. It has the power to turn the darkest of days into something radiant and warm.' },
  { icon: '✨', label: 'Her Eyes', text: 'Your eyes hold a universe I never want to escape from. Every time I look into them, I find a new world — one made entirely of wonder.' },
  { icon: '🌹', label: 'Her Beauty', text: 'You are beautiful in a way that no words could ever fully describe. Not just on the outside — but in your laughter, your spirit, your soul.' },
  { icon: '💝', label: 'Her Kindness', text: 'Your kindness is a rare and precious gift. The way you care — quietly, deeply, wholeheartedly — makes you the most extraordinary person I have ever met.' },
];

export default function ComplimentBox() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef(null);
  const boxRef = useRef(null);
  const textRef = useRef(null);
  const headRef = useRef(null);
  const tabRefs = useRef([]);

  useEffect(() => {
    gsap.fromTo(headRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: headRef.current, start: 'top 85%' } }
    );
    gsap.fromTo(boxRef.current,
      { opacity: 0, scale: 0.92, y: 40 },
      { opacity: 1, scale: 1, y: 0, duration: 1.4, ease: 'back.out(1.4)',
        scrollTrigger: { trigger: boxRef.current, start: 'top 85%' } }
    );
  }, []);

  const switchCompliment = (idx) => {
    gsap.to(textRef.current, {
      opacity: 0, y: 15, duration: 0.25, ease: 'power2.in',
      onComplete: () => {
        setActive(idx);
        gsap.fromTo(textRef.current,
          { opacity: 0, y: -15 },
          { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }
        );
      }
    });
  };

  const c = COMPLIMENTS[active];

  return (
    <section className="relative py-24 px-4 md:px-8" id="compliments">
      {/* Glow bg */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 60% at 50% 50%, rgba(251,191,36,0.06) 0%, transparent 70%)`
        }}
      />

      <div className="relative max-w-4xl mx-auto">
        {/* Heading */}
        <div ref={headRef} className="text-center mb-14 opacity-0">
          <p className="font-cursive text-gold-400 text-xl mb-3 tracking-wide" style={{ color: '#fbbf24' }}>
            Written just for you
          </p>
          <h2 className="font-display text-5xl md:text-6xl font-light text-white"
            style={{ textShadow: '0 0 30px rgba(251,191,36,0.3)' }}>
            A Love Letter <span className="shimmer-text font-semibold">In Words</span>
          </h2>
        </div>

        {/* Compliment box */}
        <div ref={boxRef} className="relative opacity-0">
          {/* Outer glow ring */}
          <div className="absolute -inset-px rounded-3xl pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, rgba(244,63,94,0.4), rgba(251,191,36,0.4), rgba(244,63,94,0.2))',
              borderRadius: '24px',
              filter: 'blur(1px)'
            }}
          />

          <div className="relative rounded-3xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(15,3,10,0.95) 0%, rgba(20,5,15,0.9) 100%)',
              border: '1px solid rgba(244,63,94,0.2)',
              boxShadow: '0 0 60px rgba(244,63,94,0.15), 0 0 120px rgba(251,191,36,0.08), inset 0 0 60px rgba(244,63,94,0.04)'
            }}>

            {/* Tab selectors */}
            <div className="flex border-b border-rose-900/30">
              {COMPLIMENTS.map((comp, i) => (
                <button
                  key={i}
                  ref={el => tabRefs.current[i] = el}
                  onClick={() => switchCompliment(i)}
                  className={`flex-1 py-4 px-2 flex flex-col items-center gap-1 transition-all duration-300 text-sm font-body
                    ${active === i
                      ? 'bg-rose-950/60 text-rose-300 border-b-2 border-rose-500'
                      : 'text-white/30 hover:text-white/60 hover:bg-white/5'
                    }`}
                >
                  <span className="text-xl">{comp.icon}</span>
                  <span className="hidden sm:block text-xs tracking-wide">{comp.label}</span>
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="p-10 md:p-14">
              {/* Decorative element */}
              <div className="flex items-center gap-4 mb-8">
                <span className="text-4xl">{c.icon}</span>
                <div>
                  <p className="font-cursive text-2xl text-rose-400">{c.label}</p>
                  <div className="h-0.5 w-16 mt-1 rounded-full"
                    style={{ background: 'linear-gradient(90deg, #f43f5e, transparent)' }} />
                </div>
              </div>

              {/* Main text */}
              <p
                ref={textRef}
                className="font-body text-xl md:text-2xl text-white/90 leading-relaxed italic"
                style={{ fontStyle: 'italic', lineHeight: '1.9' }}
              >
                "{c.text}"
              </p>

              {/* Bottom decoration */}
              <div className="flex items-center gap-4 mt-10">
                <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, #f43f5e40, transparent)' }} />
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-rose-500 text-sm animate-sparkle" style={{ animationDelay: `${i * 0.2}s` }}>✦</span>
                  ))}
                </div>
                <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, transparent, #f43f5e40)' }} />
              </div>

              {/* Navigation dots */}
              <div className="flex justify-center gap-3 mt-6">
                {COMPLIMENTS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => switchCompliment(i)}
                    className="transition-all duration-300 rounded-full"
                    style={{
                      width: active === i ? '24px' : '8px',
                      height: '8px',
                      background: active === i ? 'linear-gradient(90deg, #f43f5e, #fbbf24)' : 'rgba(244,63,94,0.3)'
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
