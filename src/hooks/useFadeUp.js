import { useEffect } from 'react';

// Applies a fade-up animation to every element with class `.fade-up`
// when it enters the viewport. Also staggers items inside `.adv-grid`.
export default function useFadeUp() {
  useEffect(() => {
    const items = document.querySelectorAll('.fade-up');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );

    items.forEach((el) => observer.observe(el));

    // Stagger animation inside the advantages grid
    document.querySelectorAll('.adv-grid .fade-up').forEach((el, i) => {
      el.style.transitionDelay = `${i * 90}ms`;
    });

    return () => observer.disconnect();
  }, []);
}
