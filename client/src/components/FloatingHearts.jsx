import { useEffect, useRef } from 'react';

const HEARTS = ['❤️','💕','💖','💗','💓','💝','🌹','✨'];

export default function FloatingHearts() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const spawnHeart = () => {
      const el = document.createElement('div');
      const emoji = HEARTS[Math.floor(Math.random() * HEARTS.length)];
      const size = 14 + Math.random() * 18;
      const left = Math.random() * 100;
      const duration = 6 + Math.random() * 8;
      const delay = Math.random() * 2;
      const sway = (Math.random() - 0.5) * 80;

      el.textContent = emoji;
      el.style.cssText = `
        position: absolute;
        bottom: -40px;
        left: ${left}%;
        font-size: ${size}px;
        opacity: 0;
        pointer-events: none;
        animation: heartRise ${duration}s ease-in ${delay}s forwards;
        --sway: ${sway}px;
      `;
      container.appendChild(el);
      setTimeout(() => el.remove(), (duration + delay + 0.5) * 1000);
    };

    // Add keyframes dynamically
    if (!document.getElementById('heart-rise-style')) {
      const style = document.createElement('style');
      style.id = 'heart-rise-style';
      style.textContent = `
        @keyframes heartRise {
          0%   { transform: translateX(0) scale(0.5); opacity: 0; }
          10%  { opacity: 0.8; }
          50%  { transform: translateX(var(--sway)) scale(1); opacity: 0.6; }
          100% { transform: translateX(calc(var(--sway) * 1.5)) translateY(-120vh) scale(0.7); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }

    const interval = setInterval(spawnHeart, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 5 }}
    />
  );
}
