import { useState, useEffect } from 'react';

const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'Poetry', href: '#shayari' },
  { label: 'For You', href: '#compliments' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Proposal', href: '#proposal' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-40 transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(5,0,5,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(244,63,94,0.15)' : 'none',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="font-cursive text-2xl text-rose-400 hover:text-rose-300 transition-colors"
          style={{ textShadow: '0 0 15px rgba(244,63,94,0.5)' }}>
          💖 My Love
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="font-body text-sm text-white/50 hover:text-rose-300 transition-all duration-300 tracking-wide"
              style={{ fontSize: '0.85rem', letterSpacing: '0.06em' }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-rose-400 text-xl"
          onClick={() => setOpen(!open)}
        >
          {open ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-4"
          style={{ background: 'rgba(5,0,5,0.95)', borderTop: '1px solid rgba(244,63,94,0.1)' }}>
          {NAV_LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="font-body text-white/60 hover:text-rose-300 transition-colors py-1"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
