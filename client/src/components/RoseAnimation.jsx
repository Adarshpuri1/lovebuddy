import { useEffect, useRef } from 'react';

const PETAL_COUNT = 35;

export default function RoseAnimation() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Draw a realistic rose petal
    const drawPetal = (ctx, x, y, size, angle, opacity, hue) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.globalAlpha = opacity;

      const grad = ctx.createRadialGradient(0, -size * 0.3, size * 0.05, 0, 0, size);
      grad.addColorStop(0, `hsla(${hue}, 90%, 80%, 1)`);
      grad.addColorStop(0.5, `hsla(${hue}, 85%, 65%, 0.9)`);
      grad.addColorStop(1, `hsla(${hue}, 80%, 45%, 0.4)`);

      ctx.beginPath();
      ctx.moveTo(0, -size);
      ctx.bezierCurveTo(size * 0.7, -size * 0.7, size * 0.8, size * 0.2, 0, size * 0.5);
      ctx.bezierCurveTo(-size * 0.8, size * 0.2, -size * 0.7, -size * 0.7, 0, -size);
      ctx.fillStyle = grad;
      ctx.fill();

      // Petal vein
      ctx.beginPath();
      ctx.moveTo(0, -size * 0.8);
      ctx.quadraticCurveTo(size * 0.1, 0, 0, size * 0.4);
      ctx.strokeStyle = `hsla(${hue}, 80%, 55%, 0.3)`;
      ctx.lineWidth = 0.5;
      ctx.stroke();

      ctx.restore();
    };

    // Initialize petals
    const petals = Array.from({ length: PETAL_COUNT }, (_, i) => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * -window.innerHeight,
      size: 10 + Math.random() * 18,
      speedY: 0.8 + Math.random() * 1.5,
      speedX: (Math.random() - 0.5) * 1.2,
      angle: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.04,
      opacity: 0.5 + Math.random() * 0.5,
      hue: 340 + Math.random() * 30, // rose red to deep pink
      sway: Math.random() * Math.PI * 2,
      swaySpeed: 0.01 + Math.random() * 0.015,
      swayAmp: 1 + Math.random() * 2
    }));

    // Stagger initial positions
    petals.forEach((p, i) => {
      if (i < PETAL_COUNT / 2) {
        p.y = Math.random() * window.innerHeight;
      }
    });

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      petals.forEach(p => {
        p.sway += p.swaySpeed;
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.sway) * p.swayAmp;
        p.angle += p.rotSpeed;

        if (p.y > canvas.height + 50) {
          p.y = -60;
          p.x = Math.random() * canvas.width;
          p.speedY = 0.8 + Math.random() * 1.5;
        }
        if (p.x > canvas.width + 50) p.x = -50;
        if (p.x < -50) p.x = canvas.width + 50;

        drawPetal(ctx, p.x, p.y, p.size, p.angle, p.opacity, p.hue);
      });

      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="petal-canvas"
      style={{
        position: 'fixed', top: 0, left: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none',
        zIndex: 9999
      }}
    />
  );
}
