import { useEffect, useRef } from 'react';

export default function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const elements = [...ref.current.querySelectorAll('[data-reveal]')];
    const observer = new IntersectionObserver((entries) => entries.forEach(({ target, isIntersecting }) => {
      if (!isIntersecting) return;
      target.animate([{ opacity: 0, transform: 'translateY(4rem)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 1000, easing: 'cubic-bezier(.625,.05,0,1)', fill: 'both' });
      target.style.opacity = '';
      observer.unobserve(target);
    }), { threshold: 0.12 });
    elements.forEach((element) => { element.style.opacity = '0'; observer.observe(element); });
    return () => { observer.disconnect(); elements.forEach((element) => { element.style.opacity = ''; element.getAnimations().forEach((animation) => animation.cancel()); }); };
  }, []);
  return ref;
}
