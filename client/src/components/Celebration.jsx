import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Celebration({ onComplete }) {
  const canvasRef = useRef(null);
  const messageRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Firework particle
    class Particle {
      constructor(x, y, color, type = 'firework') {
        this.x = x; this.y = y;
        this.type = type;
        this.color = color;
        this.alpha = 1;
        if (type === 'firework') {
          const angle = Math.random() * Math.PI * 2;
          const speed = 2 + Math.random() * 6;
          this.vx = Math.cos(angle) * speed;
          this.vy = Math.sin(angle) * speed;
          this.gravity = 0.08;
          this.decay = 0.015 + Math.random() * 0.01;
          this.size = 2 + Math.random() * 3;
        } else if (type === 'confetti') {
          this.vx = (Math.random() - 0.5) * 4;
          this.vy = -2 - Math.random() * 3;
          this.gravity = 0.1;
          this.decay = 0.008;
          this.size = 6 + Math.random() * 8;
          this.angle = Math.random() * Math.PI * 2;
          this.rotSpeed = (Math.random() - 0.5) * 0.2;
        } else { // heart
          const angle = Math.random() * Math.PI * 2;
          const speed = 1 + Math.random() * 3;
          this.vx = Math.cos(angle) * speed;
          this.vy = Math.sin(angle) * speed - 2;
          this.gravity = 0.04;
          this.decay = 0.01;
          this.size = 12 + Math.random() * 16;
        }
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += this.gravity;
        this.alpha -= this.decay;
        if (this.type === 'confetti') this.angle += this.rotSpeed;
      }
      draw(ctx) {
        ctx.globalAlpha = Math.max(0, this.alpha);
        if (this.type === 'firework') {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fillStyle = this.color;
          ctx.shadowBlur = 8;
          ctx.shadowColor = this.color;
          ctx.fill();
          ctx.shadowBlur = 0;
        } else if (this.type === 'confetti') {
          ctx.save();
          ctx.translate(this.x, this.y);
          ctx.rotate(this.angle);
          ctx.fillStyle = this.color;
          ctx.fillRect(-this.size / 2, -this.size / 4, this.size, this.size / 2);
          ctx.restore();
        } else {
          ctx.font = `${this.size}px serif`;
          ctx.fillText('❤️', this.x, this.y);
        }
        ctx.globalAlpha = 1;
      }
    }

    const particles = [];
    const COLORS = ['#f43f5e','#fbbf24','#fb7185','#fde68a','#ff6b8a','#ffd700','#ff4d6d','#fff'];

    const launchFirework = (x, y) => {
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      for (let i = 0; i < 80; i++) particles.push(new Particle(x, y, color, 'firework'));
    };

    const raining = () => {
      const x = Math.random() * canvas.width;
      const confColor = COLORS[Math.floor(Math.random() * COLORS.length)];
      for (let i = 0; i < 5; i++) {
        particles.push(new Particle(x, -10, confColor, 'confetti'));
      }
      if (Math.random() < 0.3) {
        particles.push(new Particle(x, -10, '#f43f5e', 'heart'));
      }
    };

    // Launch multiple fireworks
    let fwCount = 0;
    const fwInterval = setInterval(() => {
      const x = 100 + Math.random() * (canvas.width - 200);
      const y = 80 + Math.random() * (canvas.height * 0.5);
      launchFirework(x, y);
      fwCount++;
      if (fwCount > 12) clearInterval(fwInterval);
    }, 300);

    const confInterval = setInterval(raining, 60);

    let animId;
    const animate = () => {
      ctx.fillStyle = 'rgba(5,0,5,0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw(ctx);
        if (particles[i].alpha <= 0) particles.splice(i, 1);
      }

      animId = requestAnimationFrame(animate);
    };
    animate();

    // Animate message in
    gsap.fromTo(messageRef.current,
      { opacity: 0, scale: 0.5, y: 30 },
      { opacity: 1, scale: 1, y: 0, duration: 1, ease: 'back.out(2)', delay: 0.5 }
    );

    // Pulse glow on container
    gsap.to(containerRef.current, {
      boxShadow: '0 0 100px rgba(244,63,94,0.6), 0 0 200px rgba(251,191,36,0.3)',
      repeat: -1, yoyo: true, duration: 1.5, ease: 'sine.inOut'
    });

    // Cleanup after 8 seconds
    const cleanup = setTimeout(() => {
      clearInterval(confInterval);
      setTimeout(() => {
        cancelAnimationFrame(animId);
        onComplete && onComplete();
      }, 3000);
    }, 8000);

    return () => {
      clearInterval(fwInterval);
      clearInterval(confInterval);
      clearTimeout(cleanup);
      cancelAnimationFrame(animId);
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(5,0,5,0.92)' }}
    >
      <canvas ref={canvasRef} className="absolute inset-0" />

      <div ref={messageRef} className="relative z-10 text-center px-8 opacity-0">
        {/* Big heart */}
        <div className="text-7xl md:text-9xl mb-6 animate-heart-beat">💖</div>

        {/* Message */}
        <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight"
          style={{ textShadow: '0 0 30px rgba(244,63,94,0.8), 0 0 60px rgba(244,63,94,0.4)' }}>
          You just made me the
          <br />
          <span className="shimmer-text font-semibold text-4xl md:text-6xl lg:text-7xl">
            Happiest Person
          </span>
          <br />
          in the world
        </h2>

        <div className="font-cursive text-2xl md:text-3xl text-rose-300 mt-2">❤️</div>

        {/* Floating hearts row */}
        <div className="flex justify-center gap-4 mt-8 text-3xl">
          {['💕','💖','💗','💓','💝'].map((h, i) => (
            <span key={i} className="animate-float" style={{ animationDelay: `${i * 0.2}s` }}>{h}</span>
          ))}
        </div>

        {/* Final poetic line */}
        <p className="font-body italic text-white/60 text-lg mt-8 max-w-lg mx-auto leading-relaxed">
          "Since the day you came into my life, every moment feels like a beautiful dream I never want to wake up from."
        </p>
      </div>
    </div>
  );
}
