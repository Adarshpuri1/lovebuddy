import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Celebration from './Celebration';

gsap.registerPlugin(ScrollTrigger);

export default function Proposal() {
  const [answered, setAnswered] = useState(false);
  const [celebrating, setCelebrating] = useState(false);
  const [noCount, setNoCount] = useState(0);

  const sectionRef = useRef(null);
  const headRef = useRef(null);
  const questionRef = useRef(null);
  const btnContainerRef = useRef(null);
  const yesBtnRef = useRef(null);
  const noBtnRef = useRef(null);
  const noMsgRef = useRef(null);

  const NO_RESPONSES = [
    "Haha, nice try! 😄",
    "Nope, not letting you escape! 💕",
    "That button doesn't work 😏",
    "Try again... or just say YES! 😘",
    "Running away won't help 😂❤️",
    "You know you want to say YES! 🌹",
  ];

  useEffect(() => {
    gsap.fromTo(headRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: headRef.current, start: 'top 85%' } }
    );
    gsap.fromTo(questionRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 1.4, ease: 'back.out(1.4)',
        scrollTrigger: { trigger: questionRef.current, start: 'top 85%' } }
    );
    gsap.fromTo(btnContainerRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: btnContainerRef.current, start: 'top 90%' } }
    );
  }, []);

  const handleYes = () => {
    // YES clicked — big celebration!
    gsap.to(yesBtnRef.current, {
      scale: 1.3, duration: 0.3, ease: 'back.out(2)',
      onComplete: () => {
        setAnswered(true);
        setCelebrating(true);
      }
    });
  };

  const runNoButton = (e) => {
    const noBtn = noBtnRef.current;
    const section = sectionRef.current;
    if (!noBtn || !section) return;

    const sectionRect = section.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();
    const margin = 20;

    // Calculate safe new position
    const maxX = sectionRect.width - btnRect.width - margin;
    const maxY = sectionRect.height - btnRect.height - margin;
    const newX = margin + Math.random() * maxX;
    const newY = margin + Math.random() * maxY;

    gsap.to(noBtn, {
      x: newX - (btnRect.left - sectionRect.left),
      y: newY - (btnRect.top - sectionRect.top),
      duration: 0.4,
      ease: 'power3.out'
    });

    setNoCount(prev => prev + 1);

    // Show sassy message
    if (noMsgRef.current) {
      noMsgRef.current.textContent = NO_RESPONSES[noCount % NO_RESPONSES.length];
      gsap.fromTo(noMsgRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.3,
          onComplete: () => {
            gsap.to(noMsgRef.current, { opacity: 0, duration: 0.5, delay: 1.5 });
          }
        }
      );
    }
  };

  return (
    <>
      {celebrating && <Celebration onComplete={() => setCelebrating(false)} />}

      <section ref={sectionRef} className="relative py-32 px-4 md:px-8 overflow-hidden" id="proposal">
        {/* Glowing background */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 70% 70% at 50% 50%, rgba(190,18,60,0.12) 0%, transparent 70%),
              radial-gradient(ellipse 40% 40% at 20% 30%, rgba(251,191,36,0.06) 0%, transparent 60%),
              radial-gradient(ellipse 40% 40% at 80% 70%, rgba(244,63,94,0.08) 0%, transparent 60%)
            `
          }}
        />

        <div className="relative max-w-4xl mx-auto">
          {/* Section heading */}
          <div ref={headRef} className="text-center mb-16 opacity-0">
            <p className="font-cursive text-rose-400 text-xl mb-3 tracking-wide">
              The moment I've been waiting for...
            </p>
            <h2 className="font-display text-5xl md:text-6xl font-light text-white"
              style={{ textShadow: '0 0 30px rgba(244,63,94,0.4)' }}>
              My <span className="shimmer-text font-semibold">Proposal</span>
            </h2>
          </div>

          {/* Proposal card */}
          <div
            ref={questionRef}
            className="relative opacity-0"
            style={{
              background: 'linear-gradient(135deg, rgba(15,3,10,0.97) 0%, rgba(20,5,15,0.95) 100%)',
              border: '1px solid rgba(244,63,94,0.3)',
              borderRadius: '32px',
              boxShadow: '0 0 60px rgba(244,63,94,0.2), 0 0 120px rgba(244,63,94,0.08), inset 0 0 60px rgba(244,63,94,0.04)',
              padding: '3rem 2rem'
            }}
          >
            {/* Decorative top border */}
            <div className="absolute top-0 left-8 right-8 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, #f43f5e, #fbbf24, #f43f5e, transparent)' }} />

            {/* Hearts row */}
            <div className="flex justify-center gap-3 mb-8 text-2xl">
              {['🌹','💕','❤️','💕','🌹'].map((h, i) => (
                <span key={i} className="animate-float" style={{ animationDelay: `${i * 0.3}s` }}>{h}</span>
              ))}
            </div>

            {/* Pre-question */}
            <p className="font-body italic text-white/60 text-center text-lg mb-6 leading-relaxed max-w-2xl mx-auto">
              "You are the most wonderful thing that has ever happened to me. Every day with you feels like a fairytale I never want to end."
            </p>

            <div className="w-24 h-px mx-auto mb-8"
              style={{ background: 'linear-gradient(90deg, transparent, #f43f5e, transparent)' }} />

            {/* The big question */}
            <h3 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-center text-white mb-12 leading-tight"
              style={{ textShadow: '0 0 20px rgba(244,63,94,0.5)' }}>
              Will you go on a
              <br />
              <span className="shimmer-text font-semibold">date with me?</span> 💝
            </h3>

            {/* Buttons */}
            {!answered ? (
              <div ref={btnContainerRef} className="relative opacity-0 min-h-32 flex flex-col items-center">
                {/* Sassy NO message */}
                <p ref={noMsgRef} className="font-cursive text-rose-400 text-lg mb-4 text-center opacity-0 h-7">
                </p>

                <div className="flex items-center justify-center gap-8 flex-wrap">
                  {/* YES button */}
                  <button
                    ref={yesBtnRef}
                    onClick={handleYes}
                    className="relative group px-12 py-5 rounded-2xl font-cursive text-2xl text-white transition-all duration-300 overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, #9f1239, #e11d48, #f43f5e)',
                      boxShadow: '0 0 30px rgba(244,63,94,0.5), 0 8px 25px rgba(0,0,0,0.3)',
                      fontSize: '1.5rem'
                    }}
                    onMouseEnter={e => gsap.to(e.currentTarget, { scale: 1.08, duration: 0.2 })}
                    onMouseLeave={e => gsap.to(e.currentTarget, { scale: 1, duration: 0.2 })}
                  >
                    <span className="relative z-10">YES ❤️</span>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: 'linear-gradient(135deg, #e11d48, #fbbf24, #e11d48)' }} />
                  </button>

                  {/* NO button — runs away */}
                  <button
                    ref={noBtnRef}
                    onMouseEnter={runNoButton}
                    onTouchStart={runNoButton}
                    className="px-10 py-5 rounded-2xl font-cursive text-xl text-white/60 transition-colors duration-200"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      position: 'relative',
                      fontSize: '1.2rem',
                      zIndex: 10,
                      cursor: 'default'
                    }}
                  >
                    NO 😄
                  </button>
                </div>

                {/* Hint text */}
                <p className="font-body text-xs text-white/25 mt-6 italic">
                  Psst... the NO button might be a little shy 😉
                </p>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-6xl mb-4 animate-heart-beat">💖</div>
                <p className="font-cursive text-3xl text-rose-400">She said YES! 🎉</p>
              </div>
            )}

            {/* Decorative bottom border */}
            <div className="absolute bottom-0 left-8 right-8 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, #fbbf24, #f43f5e, #fbbf24, transparent)' }} />
          </div>
        </div>
      </section>
    </>
  );
}
