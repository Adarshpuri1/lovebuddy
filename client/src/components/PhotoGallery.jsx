import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import pic1 from '../music/pic2.jpg';
import pic2 from '../music/pic3.jpg';
import pic3 from '../music/pic4.jpg';
import pic4 from '../music/pic5.jpg';
import pic5 from '../music/pic6.jpg';
import pic6 from '../music/pic7.jpg';
import pic7 from '../music/pic8.jpg';
import pic8 from '../music/pic9.jpg';

gsap.registerPlugin(ScrollTrigger);

// Beautiful placeholder romantic images from Unsplash (free-to-use)
const PHOTOS = [
  {
    url: pic1,
    caption: 'Every moment with you is magic ✨',
    size: 'tall'
  },
  {
    url: pic2,
    caption: 'Our story is my favourite 🌹',
    size: 'normal'
  },
  {
    url: pic8,
    caption: 'You light up my world 💫',
    size: 'normal'
  },
  {
    url: pic7,
    caption: 'Lost in you, forever 💞',
    size: 'wide'
  },
  {
    url: pic3,
    caption: 'My heart belongs to you 💖',
    size: 'normal'
  },
  {
    url: pic6,
    caption: 'You are my dream come true 🌸',
    size: 'normal'
  },
];

export default function PhotoGallery() {
  const sectionRef = useRef(null);
  const headRef = useRef(null);
  const itemRefs = useRef([]);

  useEffect(() => {
    gsap.fromTo(headRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: headRef.current, start: 'top 85%' } }
    );

    itemRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(el,
        { opacity: 0, scale: 0.88, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.9, ease: 'back.out(1.2)',
          delay: i * 0.1,
          scrollTrigger: { trigger: el, start: 'top 90%' } }
      );
    });
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 px-4 md:px-8" id="gallery">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 50%, rgba(190,18,60,0.05) 0%, transparent 70%)`
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        {/* Heading */}
        <div ref={headRef} className="text-center mb-16 opacity-0">
          <p className="font-cursive text-rose-400 text-xl mb-3 tracking-wide">Moments frozen in time</p>
          <h2 className="font-display text-5xl md:text-6xl font-light text-white"
            style={{ textShadow: '0 0 30px rgba(244,63,94,0.3)' }}>
            Our <span className="shimmer-text font-semibold">Beautiful</span> World
          </h2>
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="h-px flex-1 max-w-32" style={{ background: 'linear-gradient(90deg, transparent, #f43f5e)' }} />
            <span className="text-rose-400 text-xl">🌸</span>
            <div className="h-px flex-1 max-w-32" style={{ background: 'linear-gradient(90deg, #f43f5e, transparent)' }} />
          </div>
        </div>

        {/* Masonry grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {PHOTOS.map((photo, i) => (
            <div
              key={i}
              ref={el => itemRefs.current[i] = el}
              className="gallery-item relative break-inside-avoid group opacity-0"
              style={{ marginBottom: '1rem' }}
            >
              {/* Image */}
              <div className="relative overflow-hidden rounded-2xl"
                style={{
                  border: '1px solid rgba(244,63,94,0.15)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.4)'
                }}>
                <img
                  src={photo.url}
                  alt={photo.caption}
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  style={{
                    height: photo.size === 'tall' ? '380px' : photo.size === 'wide' ? '220px' : '280px',
                    filter: 'brightness(0.85) saturate(1.2)'
                  }}
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end"
                  style={{
                    background: 'linear-gradient(to top, rgba(190,18,60,0.85) 0%, transparent 60%)'
                  }}>
                  <p className="font-cursive text-white text-lg p-5 leading-tight">
                    {photo.caption}
                  </p>
                </div>

                {/* Corner heart */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                  style={{ background: 'rgba(244,63,94,0.8)' }}>
                  <span className="text-sm">❤️</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Replace photos note */}
        <p className="text-center font-body text-sm text-white/30 mt-8 italic">
          ✦ Replace these images with your own cherished memories ✦
        </p>
      </div>
    </section>
  );
}
