import { useEffect, useRef, useState } from 'react';

const linearFrame = (progress, count) => Math.round(progress * (count - 1));
const initialScene = { progress: 0, frame: '' };

export default function useScrollFrames(name, count, extension, getFrame = linearFrame) {
  const trackRef = useRef(null);
  const stageRef = useRef(null);
  const [scene, setScene] = useState(initialScene);

  useEffect(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    const mobile = window.matchMedia('(max-width: 1023px)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const images = new Map();
    let near = false;
    let portrait = mobile.matches;
    let animationFrame = 0;
    let previousIndex = 0;

    function release(index) {
      images.get(index).onload = null;
      images.delete(index);
    }

    function request(index) {
      if (images.has(index)) return images.get(index);
      const image = new Image();
      const orientation = portrait ? 'portrait' : 'landscape';
      const prefix = portrait ? 'sdp' : 'sdl';
      image.onload = schedule;
      image.src = `/assets/home-sequences/${name}/${orientation}/${prefix}-${index}.${extension}`;
      images.set(index, image);
      return image;
    }

    function update() {
      animationFrame = 0;
      if (!near || reduced.matches) return;
      const distance = Math.max(1, track.offsetHeight - stage.offsetHeight);
      const progress = Math.min(1, Math.max(0, -track.getBoundingClientRect().top / distance));
      const index = getFrame(progress, count, portrait);
      const direction = index < previousIndex ? -1 : 1;
      previousIndex = index;

      const nearby = [index];
      for (let offset = 1; offset <= 4; offset++) {
        nearby.push(index + offset * direction, index - offset * direction);
      }
      const needed = new Set(nearby.filter(value => value >= 0 && value < count));
      for (const cached of images.keys()) {
        if (!needed.has(cached)) release(cached);
      }
      const image = request(index);
      for (const candidate of needed) request(candidate);
      setScene(current => {
        const frame = image.complete && image.naturalWidth ? image.getAttribute('src') : current.frame;
        return current.progress === progress && current.frame === frame ? current : { progress, frame };
      });
    }

    function schedule() {
      if (near && !reduced.matches && !animationFrame) animationFrame = requestAnimationFrame(update);
    }

    function reset() {
      portrait = mobile.matches;
      for (const index of images.keys()) release(index);
      setScene(initialScene);
      schedule();
    }

    const observer = new IntersectionObserver(([entry]) => {
      near = entry.isIntersecting;
      if (near) schedule();
      else for (const index of images.keys()) release(index);
    }, { rootMargin: '100% 0px' });
    observer.observe(track);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    mobile.addEventListener('change', reset);
    reduced.addEventListener('change', reset);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrame);
      for (const index of images.keys()) release(index);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      mobile.removeEventListener('change', reset);
      reduced.removeEventListener('change', reset);
    };
  }, [name, count, extension, getFrame]);

  return { trackRef, stageRef, ...scene };
}
