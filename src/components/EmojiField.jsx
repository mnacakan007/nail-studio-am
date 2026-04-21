import { useEffect, useRef } from 'react';

const EMOJIS = ['💅', '✨', '💎', '🌸', '🤍', '💫', '🖤', '🌙', '⭐', '🕊️', '🪞', '💐'];

export default function EmojiField() {
  const fieldRef = useRef(null);
  const particlesRef = useRef([]);
  const rafRef = useRef(null);
  const scrollStateRef = useRef({ current: 0, target: 0 });

  useEffect(() => {
    // Respect reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const field = fieldRef.current;
    if (!field) return;

    const count = window.innerWidth < 720 ? 18 : 32;
    const particles = [];

    for (let i = 0; i < count; i++) {
      const el = document.createElement('span');
      el.className = 'emoji';
      el.textContent = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
      el.style.fontSize = `${1 + Math.random() * 1.8}rem`;
      el.style.left = `${Math.random() * 100}vw`;
      el.style.top = `${Math.random() * 100 + Math.random() * 400}vh`;

      field.appendChild(el);

      particles.push({
        el,
        drift: (Math.random() - 0.5) * 240,
        rotSpeed: (Math.random() - 0.5) * 360,
        scrollFactor: 0.15 + Math.random() * 0.6,
        baseFloat: Math.random() * Math.PI * 2
      });

      setTimeout(() => {
        el.style.opacity = (0.25 + Math.random() * 0.4).toFixed(2);
      }, i * 40);
    }

    particlesRef.current = particles;

    scrollStateRef.current.current = window.scrollY;
    scrollStateRef.current.target = window.scrollY;

    const onScroll = () => {
      scrollStateRef.current.target = window.scrollY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    const animate = () => {
      const s = scrollStateRef.current;
      s.current += (s.target - s.current) * 0.12;

      const t = performance.now() / 1000;
      const maxScroll = document.body.scrollHeight - window.innerHeight || 1;
      const vh = window.innerHeight || 1;

      particlesRef.current.forEach((p) => {
        const floatX = Math.sin(t * 0.5 + p.baseFloat) * 20;
        const floatY = Math.cos(t * 0.6 + p.baseFloat) * 18;
        const x = p.drift * (s.current / vh) + floatX;
        const y = -s.current * p.scrollFactor + floatY;
        const rot = p.rotSpeed * (s.current / maxScroll);
        p.el.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${rot}deg)`;
      });

      rafRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      particles.forEach((p) => p.el.remove());
      particlesRef.current = [];
    };
  }, []);

  return <div className="emoji-field" aria-hidden="true" ref={fieldRef} />;
}
