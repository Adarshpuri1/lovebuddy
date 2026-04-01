import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import axios from 'axios';

gsap.registerPlugin(ScrollTrigger);

const FALLBACK_SHAYARIS = [
  { _id: '1', text: "Hazaron khwahishen aisi ke har khwahish pe dam nikle...", author: "Aadi", category: "ghalib" },
  { _id: '2', text: "Dil hi to hai na sang-o-khisht, dard se bhar na aaye kyun.", author: "Aadi", category: "ghalib" },
  { _id: '3', text: "Ishq par zor nahin, hai ye woh aatish Ghalib, Jo lagaye na lage aur bujhaye na bane.", author: "Aadi", category: "ghalib" },
  { _id: '4', text: "Unke dekhe se jo aa jaati hai munh par raunak, Woh samajhte hain ke bimaar ka haal achha hai.", author: "Aadi", category: "ghalib" },
  { _id: '5', text: "Your smile is the sunrise that makes every morning worth waking up for.", author: "From the Heart", category: "compliment" },
  { _id: '6', text: "Your eyes hold galaxies I could spend eternity exploring and still never reach the end.", author: "From the Heart", category: "compliment" },
  { _id: '7', text: "The way you laugh makes the whole world feel lighter, brighter, and more beautiful.", author: "From the Heart", category: "compliment" },
  { _id: '8', text: "Your kindness is the most beautiful thing about you — and you have so much beauty to offer.", author: "From the Heart", category: "compliment" },
  { _id: '9', text: "Tum mile to jaana maine, mohabbat kya hoti hai — ek khwab jo aankhein khuli mein bhi dikhta hai.", author: "Aadi", category: "custom" },
  { _id: '10', text: "In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine.", author: "Aadi", category: "quote" },
];

const categoryColors = {
  ghalib:    { border: '#f43f5e', glow: 'rgba(244,63,94,0.25)', tag: 'Ghalib', icon: '🌹' },
  compliment:{ border: '#fbbf24', glow: 'rgba(251,191,36,0.25)', tag: 'For You', icon: '✨' },
  custom:    { border: '#fb7185', glow: 'rgba(251,113,133,0.25)', tag: 'Dil Se', icon: '💖' },
  quote:     { border: '#c084fc', glow: 'rgba(192,132,252,0.25)', tag: 'Wisdom', icon: '📜' },
};

export default function Shayari() {
  const [shayaris, setShayaris] = useState(FALLBACK_SHAYARIS);
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    axios.get('/api/shayari')
      .then(res => { if (res.data?.data?.length) setShayaris(res.data.data); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    // Heading animation
    gsap.fromTo(headingRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: headingRef.current, start: 'top 85%' }
      }
    );

    // Stagger card animations
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const dir = i % 2 === 0 ? -60 : 60;
      gsap.fromTo(card,
        { opacity: 0, x: dir, y: 30 },
        {
          opacity: 1, x: 0, y: 0,
          duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 88%' },
          delay: (i % 3) * 0.15
        }
      );
    });
  }, [shayaris]);

  return (
    <section ref={sectionRef} className="relative py-24 px-4 md:px-8" id="shayari">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% 50%, rgba(190,18,60,0.06) 0%, transparent 70%),
            radial-gradient(ellipse 40% 40% at 10% 50%, rgba(251,191,36,0.04) 0%, transparent 60%)
          `
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-20 opacity-0">
          <p className="font-cursive text-rose-400 text-xl mb-3 tracking-wide">Words from the soul</p>
          <h2 className="font-display text-5xl md:text-6xl font-light text-white mb-4"
            style={{ textShadow: '0 0 30px rgba(244,63,94,0.3)' }}>
            Poetry of <span className="shimmer-text font-semibold">Love</span>
          </h2>
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="h-px flex-1 max-w-32" style={{ background: 'linear-gradient(90deg, transparent, #f43f5e)' }} />
            <span className="text-rose-400 text-2xl animate-heart-beat">❤️</span>
            <div className="h-px flex-1 max-w-32" style={{ background: 'linear-gradient(90deg, #f43f5e, transparent)' }} />
          </div>
        </div>

        {/* Shayari grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {shayaris.map((s, i) => {
            const style = categoryColors[s.category] || categoryColors.custom;
            return (
              <div
                key={s._id}
                ref={el => cardRefs.current[i] = el}
                className="relative group cursor-default opacity-0"
                style={{ transformStyle: 'preserve-3d' }}
                onMouseMove={e => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = (e.clientX - rect.left) / rect.width - 0.5;
                  const y = (e.clientY - rect.top) / rect.height - 0.5;
                  gsap.to(e.currentTarget, {
                    rotationY: x * 8, rotationX: -y * 8,
                    duration: 0.5, ease: 'power2.out', transformPerspective: 800
                  });
                }}
                onMouseLeave={e => {
                  gsap.to(e.currentTarget, {
                    rotationY: 0, rotationX: 0,
                    duration: 0.8, ease: 'elastic.out(1, 0.5)'
                  });
                }}
              >
                {/* Glow border */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    boxShadow: `0 0 30px ${style.glow}, 0 0 60px ${style.glow}`,
                    border: `1px solid ${style.border}44`
                  }}
                />

                {/* Card */}
                <div className="relative glass-card p-8 h-full"
                  style={{ border: `1px solid ${style.border}30` }}>

                  {/* Decorative quote mark */}
                  <div className="absolute top-4 left-6 font-display text-7xl leading-none pointer-events-none select-none"
                    style={{ color: `${style.border}15`, fontStyle: 'italic' }}>"</div>

                  {/* Tag */}
                  <div className="flex items-center gap-2 mb-5">
                    <span className="text-sm">{style.icon}</span>
                    <span className="font-body text-xs tracking-widest uppercase px-3 py-1 rounded-full"
                      style={{ background: `${style.border}18`, color: style.border, border: `1px solid ${style.border}30` }}>
                      {style.tag}
                    </span>
                  </div>

                  {/* Shayari text */}
                  <p className="font-body text-lg md:text-xl text-white/90 leading-relaxed italic relative z-10 mb-6"
                    style={{ fontStyle: 'italic' }}>
                    {s.text}
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3 mt-auto">
                    <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${style.border}60, transparent)` }} />
                    <p className="font-cursive text-base" style={{ color: style.border }}>
                      — {s.author}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
