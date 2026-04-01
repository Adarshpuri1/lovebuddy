import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Components
import Nav from './components/Nav';
import ScrollProgress from './components/ScrollProgress';
import RoseAnimation from './components/RoseAnimation';
import FloatingHearts from './components/FloatingHearts';
import MusicPlayer from './components/MusicPlayer';
import Hero from './components/Hero';
import LoveQuotesTicker from './components/LoveQuotesTicker';
import Shayari from './components/Shayari';
import ComplimentBox from './components/ComplimentBox';
import PhotoGallery from './components/PhotoGallery';
import Proposal from './components/Proposal';
import FinalMessage from './components/FinalMessage';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(a.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      });
    });
  }, []);

  return (
    <div className="relative min-h-screen cursor-heart" style={{ background: '#0a0005' }}>
      {/* Global ambient layers */}
      <RoseAnimation />
      <FloatingHearts />

      {/* Navigation */}
      <Nav />
      <ScrollProgress />

      {/* Music */}
      <MusicPlayer />

      {/* Page sections */}
      <main>
        <Hero />
        <LoveQuotesTicker />
        <Shayari />
        <ComplimentBox />
        <PhotoGallery />
        <LoveQuotesTicker />
        <Proposal />
        <FinalMessage />
      </main>

      {/* Footer */}
      <footer className="py-8 text-center border-t border-rose-900/20">
        <p className="font-cursive text-rose-400/60 text-lg">
          Made with ❤️ for the one who means everything
        </p>
        <p className="font-body text-white/20 text-xs mt-2 tracking-widest uppercase">
          Every word, every pixel — written for you
        </p>
      </footer>
    </div>
  );
}
