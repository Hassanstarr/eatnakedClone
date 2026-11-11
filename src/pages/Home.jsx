import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ArrowIcon from '../components/ArrowIcon.jsx';
import OrderButton from '../components/OrderButton.jsx';
import Showreel from '../components/Showreel.jsx';
import useReveal from '../hooks/useReveal.js';
import useScrollFrames from '../hooks/useScrollFrames.js';
import testimonials from '../data/testimonials.json';

const image = (file) => `/assets/images/${file}`;
const heading = 'text-[8rem] leading-[1.1] font-medium capitalize max-nav:text-[3.6rem]';
const goals = [
  { name: 'Gain Muscle', tag: 'Enhance Performance', calories: ['2,400', '2,800'], meals: ['Quiche & Protein Pancakes', 'Grilled Mango-Lime Chicken', 'Miso Glazed Salmon'], photos: ['gm-1.avif', 'gm-2.avif'] },
  { name: 'Maintain', tag: 'Healthy Habits', calories: ['2,150', '2,200'], meals: ['Egg Skillet & Roasted Potatoes', 'Chimichurri Steak Salad', 'Peruvian Chicken'], photos: ['mt-1.avif', 'mt-2.avif'] },
  { name: 'Lose Weight', tag: 'Clean Eating', calories: ['2,200', '1,900'], meals: ['Overnight Oats', 'Cranberry Walnut Spinach Salad', 'Lemon & Herb Garlic Chicken'], photos: ['lw-1.avif', 'lw-2.avif'] },
];
const partners = [['Netflix', 'partner-netflix.svg', 'Powering Hollywood one script at a time.'], ['UCLA', 'partner-ucla.svg', 'Fueling for performance on and off the field.'], ['Equinox', 'partner-equinox.png', 'Train, eat(naked), repeat.'], ['Vallarta', 'partner-vallarta.png', 'Grab and go wherever you are.']];
const lifestyles = [['Professional', 'Fuel Your Hustle.', 'design-2.avif'], ['Athlete', 'Enhance Your Performance.', 'design-3.avif'], ['Family', 'Nourish Who Matters Most.', 'design-1.avif']];
const bowls = [
  { name: 'Lemon Herb Garlic Chicken w/ Organic Quinoa and Grilled Asparagus', photo: 'bowl-1.avif', tags: [['Veggies', 'hero-vegetables.png'], ['Protein', 'bowl-proteins.png'], ['Grains', 'bowl-grains.png'], ['Asparagus', 'bowl-asparagus.png'], ['Chicken', 'bowl-proteins.png'], ['Veggies', 'hero-vegetables.png']] },
  { name: 'Southwest Bean & Quinoa Salad', photo: 'bowl-2.avif', tags: [['Fruit', 'bowl-fruit.png'], ['Herbs', 'bowl-herbs.png'], ['Sauce', 'bowl-sauce.png'], ['Herbs', 'bowl-herbs.png'], ['CousCous', 'bowl-couscous.png'], ['Olives', 'bowl-olives.png']] },
];
const qualityScenes = [
  { tag: 'Fresh & High Quality Ingredients', title: 'From our kitchen', name: 'kitchen' },
  { tag: 'For An Incredible Healthy Life', title: 'To your table', name: 'table' },
];
const partnerStops = [[0, 0], [.03, 0], [.18, 60], [.3, 60], [.5, 110], [.6, 110], [.8, 160], [1, 200]];

function portion(progress, start, end) {
  return Math.min(1, Math.max(0, (progress - start) / (end - start)));
}

function partnerFrame(progress, count, portrait) {
  if (portrait) return Math.round(progress * (count - 1));
  const index = partnerStops.findIndex(([stop], i) => i > 0 && progress <= stop);
  const [start, first] = partnerStops[index - 1];
  const [end, last] = partnerStops[index];
  return Math.round(first + (last - first) * portion(progress, start, end));
}

function Controls({ label, onMove, side = false }) {
  return <div className={`flex gap-4 ${side ? 'pointer-events-none absolute inset-x-0 top-[80%] z-20 -translate-y-1/2 justify-between' : 'justify-center'}`}>
    {[-1, 1].map(direction => <button key={direction} type="button" aria-label={`${direction < 0 ? 'Previous' : 'Next'} ${label}`} onClick={() => onMove(direction)} className={`group pointer-events-auto grid place-items-center rounded-full border border-white/10 bg-white/10 backdrop-blur-md transition-colors duration-500 hover:bg-accent/40 ${side ? 'size-32 max-nav:size-16' : 'size-24 max-nav:size-18'}`}><ArrowIcon className={`w-10 transition-transform duration-500 group-hover:scale-110 max-nav:w-8 ${direction < 0 ? 'rotate-180' : ''}`} /></button>)}
  </div>;
}

function ScenePicture({ frame, desktop, mobile, alt = '', className = '' }) {
  return <picture className={`pointer-events-none absolute inset-0 ${className}`}>
    {!frame && <source media="(max-width: 1023px)" srcSet={image(mobile)} />}
    <img src={frame || image(desktop)} alt={alt} loading={frame ? 'eager' : 'lazy'} className="size-full object-cover" />
  </picture>;
}

function Partners() {
  const { trackRef, stageRef, progress, frame } = useScrollFrames('partners', 201, 'avif', partnerFrame);
  const stage = progress >= .94 ? 3 : progress >= .73 ? 2 : progress >= .4 ? 1 : 0;
  const [selection, setSelection] = useState(null);
  const index = selection?.stage === stage ? selection.index : stage;
  const [name, logo, description] = partners[index];

  return <section ref={trackRef} className="relative mx-auto max-w-[192rem] motion-safe:h-[400svh]" aria-labelledby="partners-title">
    <div ref={stageRef} className="relative isolate flex items-center overflow-hidden motion-safe:sticky motion-safe:top-0 motion-safe:h-svh">
      <ScenePicture frame={frame} desktop="partners-background.avif" mobile="partners-background-mobile.avif" className="-z-10" />
      <div className="page-container grid grid-cols-[1fr_1.2fr] items-center gap-24 py-40 max-nav:grid-cols-1 max-nav:gap-16 max-nav:py-24">
        <h2 id="partners-title" className={`${heading} max-nav:text-center`}>Reputable partners That EATnaked</h2>
        <div className="mx-auto w-full max-w-220">
          <div className="mb-10 rounded-[2rem] border border-outline bg-white/11 px-16 py-16 backdrop-blur-xl max-nav:px-10">
            <span className="mb-8 inline-flex rounded-full border border-white/30 px-8 py-4 text-[1.8rem] max-nav:text-[1.4rem]">Partners</span>
            <div className="mb-6 flex items-center gap-5">
              <img src={image(logo)} alt="" loading="lazy" className="max-h-20 max-w-40 object-contain" />
              <h3 className="text-[5rem] leading-none font-medium max-nav:text-[3.6rem]">{name}</h3>
            </div>
            <p className="text-[1.8rem] text-white/50 max-nav:text-[1.4rem]">{description}</p>
          </div>
          <Controls label="partner" onMove={direction => setSelection({ stage, index: (index + direction + partners.length) % partners.length })} />
        </div>
      </div>
    </div>
  </section>;
}

function QualityCaption({ scene, opacity = 1, offset = 0 }) {
  return <div aria-hidden={opacity === 0} className="page-container col-start-1 row-start-1 flex flex-col items-center gap-4 text-center max-nav:gap-6" style={{ opacity, transform: `translateY(${offset}px)` }}>
    <p className="w-fit rounded-full border border-white/30 px-9 py-5 text-[1.8rem] backdrop-blur-sm max-nav:px-6 max-nav:py-4 max-nav:text-[1.2rem]">{scene.tag}</p>
    <h2 className="text-[12rem] leading-[.9] font-medium capitalize max-nav:text-[6rem] max-nav:leading-none">{scene.title}</h2>
  </div>;
}

function Quality() {
  const { trackRef, stageRef, progress, frame } = useScrollFrames('bag', 40, 'webp');
  const first = portion(progress, .13, .33);
  const last = portion(progress, .7, .9);
  const captionPosition = 'grid content-start pt-[min(19rem,19vh)] max-nav:pt-[min(13.5rem,13.5vh)]';

  return <section className="mx-auto max-w-[192rem]" aria-label="From our kitchen to your table">
    <div ref={trackRef} className="relative h-[200svh] motion-reduce:hidden">
      <div ref={stageRef} className={`sticky top-0 isolate h-svh overflow-hidden ${captionPosition}`}>
        <ScenePicture desktop="quality.avif" mobile="quality-portrait.avif" className="-z-20" />
        <ScenePicture frame={frame} desktop="quality-kitchen-bag.webp" mobile="quality-kitchen-bag-mobile.webp" alt="EATnaked shopping bag" className="-z-10" />
        <QualityCaption scene={qualityScenes[0]} opacity={1 - first} offset={-60 * first} />
        <QualityCaption scene={qualityScenes[1]} opacity={last} offset={60 * (1 - last)} />
      </div>
    </div>
    <div className="hidden motion-reduce:block">
      {qualityScenes.map(scene => <article key={scene.name} className={`relative isolate min-h-[max(100svh,70rem)] overflow-hidden ${captionPosition}`}>
        <ScenePicture desktop="quality.avif" mobile="quality-portrait.avif" className="-z-20" />
        <ScenePicture desktop={`quality-${scene.name}-bag.webp`} mobile={`quality-${scene.name}-bag-mobile.webp`} alt="EATnaked shopping bag" className="-z-10" />
        <QualityCaption scene={scene} />
      </article>)}
    </div>
  </section>;
}

function FoodTag({ name, file, className = '' }) {
  return <div className={`flex w-max items-center gap-5 rounded-[2rem] bg-white/11 p-[.8rem] pr-8 text-[2rem] font-medium backdrop-blur-[28px] motion-safe:animate-float max-nav:gap-3 max-nav:rounded-[1.1rem] max-nav:pr-5 max-nav:text-[1.2rem] ${className}`}><span className="grid h-23 w-28 place-items-center rounded-[1.5rem] bg-white/5 max-nav:h-14 max-nav:w-18"><img src={image(file)} alt="" loading="lazy" className="h-16 w-20 object-contain max-nav:h-9 max-nav:w-12" /></span>{name}</div>;
}

function Goals() {
  const [active, setActive] = useState(0);
  return <section className="page-container relative py-72 max-nav:py-32" aria-labelledby="goals-title">
    <div data-reveal className="absolute bottom-36 left-0 max-w-120 max-nav:static max-nav:mb-16 max-nav:max-w-full max-nav:text-center"><h2 id="goals-title" className="mb-7 text-[6rem] leading-none font-medium max-nav:text-[3.6rem]">Whatever Your Goal</h2><p className="text-[1.8rem] leading-tight text-white/50 max-nav:text-[1.4rem]">High quality meals for ANY lifestyle</p></div>
    <div data-reveal className="mx-auto w-[73rem] max-w-[65%] space-y-12 nav:max-[75rem]:translate-x-24 max-nav:max-w-full max-nav:space-y-6">
      {goals.map((goal, index) => <div key={goal.name} className="overflow-hidden rounded-[5rem] bg-white/7 p-[.8rem] backdrop-blur-xl max-nav:rounded-[2.5rem]">
        <div className={`relative isolate overflow-hidden rounded-[4.5rem] bg-goal-card transition-[padding] duration-700 ease-brand max-nav:rounded-[2rem] ${active === index ? 'pt-[3.5rem] max-nav:pt-6' : 'pt-0'}`}>
          <span aria-hidden="true" className={`pointer-events-none absolute inset-0 -z-10 bg-goal-glow transition-opacity duration-700 ${active === index ? 'opacity-0' : 'opacity-100'}`} />
          <img src={image('goals-item-blur.avif')} alt="" className={`pointer-events-none absolute inset-0 -z-10 size-full object-fill transition-opacity duration-700 ${active === index ? 'opacity-100' : 'opacity-0'}`} loading="lazy" />
          <button type="button" id={`goal-${index}`} aria-expanded={active === index} aria-controls={`goal-panel-${index}`} onClick={() => setActive(active === index ? null : index)} className="relative flex w-full items-center justify-between gap-4 py-[.7rem] pr-[1.2rem] pl-[3.2rem] text-left max-nav:px-6 max-nav:py-6"><span className="flex items-center gap-[1.3rem] text-[1.8rem] leading-none font-medium text-white max-nav:text-[1.6rem]"><span aria-hidden="true" className={`size-10 shrink-0 transition-colors duration-700 ${active === index ? 'bg-accent' : 'bg-white/50'}`} style={{ mask: `url(${image(`home-goal-${index}.svg`)}) center / contain no-repeat` }} />{goal.name}</span><img src={image(`home-goal-progress-${index}.svg`)} alt="" className={`pointer-events-none absolute top-1/2 left-1/2 size-32 -translate-1/2 transition-opacity duration-500 max-nav:hidden ${active === index ? 'opacity-100' : 'opacity-0'}`} /><span className={`flex items-center gap-3 rounded-full border border-white/30 px-8 py-[1.5rem] text-[1.8rem] leading-none transition-transform duration-700 ease-brand max-nav:px-5 max-nav:py-4 max-nav:text-[1.2rem] ${active === index ? '-translate-x-8 max-nav:translate-x-0' : ''}`}><span className="size-1.5 rounded-full bg-white" />{goal.tag}</span></button>
          <div id={`goal-panel-${index}`} role="region" aria-labelledby={`goal-${index}`} inert={active !== index} className={`grid transition-[grid-template-rows] duration-700 ease-brand ${active === index ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
            <div className="min-h-0 overflow-hidden"><div className="px-16 py-18 max-nav:px-7 max-nav:pt-5 max-nav:pb-10">
              <div className="flex justify-between gap-8">{goal.calories.map((value, i) => <div key={value} className={`flex flex-col gap-1 ${i ? 'text-right' : ''}`}><span className="text-[1.4rem] leading-none text-white/50 max-nav:text-[1.1rem]">{i ? 'Your ideal Kcal' : 'Your Kcal now'}</span><strong className="text-[4rem] leading-none font-medium max-nav:text-[3rem]">{value}</strong></div>)}</div>
              <div className="mt-14 mb-22 h-[3.2rem] rounded-full bg-white/5 max-nav:my-8 max-nav:h-7"><div className="relative h-full w-[43.2rem] rounded-full bg-linear-to-r from-accent to-accent-soft max-nav:w-3/5"><span className="absolute top-1/2 right-0 grid size-[4.8rem] translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-accent-soft shadow-xl backdrop-blur-sm max-nav:size-12"><span className="size-[3.2rem] rounded-full bg-white/80 max-nav:size-8" /></span></div></div>
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-8 border-l-[.4rem] border-accent pl-8 max-nav:grid-cols-1 max-nav:gap-6 max-nav:pl-6">
                <dl className="space-y-6">{goal.meals.map((meal, i) => <div key={meal} className="flex items-center gap-6 max-nav:gap-4"><dt className="w-24 shrink-0 text-[1.4rem] leading-none text-white/50 max-nav:w-21 max-nav:text-[1.1rem]">{['Breakfast', 'Lunch', 'Dinner'][i]}</dt><dd className="text-[1.8rem] leading-none whitespace-nowrap text-white/80 max-nav:text-[1.3rem] max-nav:whitespace-normal">{meal}</dd></div>)}</dl>
                <div className="flex gap-6 max-nav:pl-25">{goal.photos.map(file => <img key={file} src={image(file)} alt={`Fresh meal for ${goal.name.toLowerCase()}`} loading="lazy" className="size-50 rounded-[2rem] object-cover max-nav:size-32 max-nav:rounded-[1rem]" />)}</div>
              </div>
            </div></div>
          </div>
        </div>
      </div>)}
    </div>
  </section>;
}

function Testimonials() {
  const track = useRef(null);
  const drag = useRef(null);
  return <div data-reveal className="page-container">
    <div ref={track} role="region" aria-label="Customer testimonials" tabIndex={0} className="flex cursor-grab gap-6 overflow-x-auto overscroll-x-contain pb-8 select-none [scrollbar-width:none] active:cursor-grabbing max-nav:gap-8" onPointerDown={event => { if (event.pointerType !== 'mouse') return; drag.current = { x: event.clientX, left: event.currentTarget.scrollLeft }; event.currentTarget.setPointerCapture(event.pointerId); }} onPointerMove={event => { if (drag.current) event.currentTarget.scrollLeft = drag.current.left + drag.current.x - event.clientX; }} onPointerUp={() => { drag.current = null; }} onPointerCancel={() => { drag.current = null; }}>
      {testimonials.map(person => <figure key={person.name} className="w-240 shrink-0 overflow-hidden rounded-[2rem] border border-outline bg-white/11 p-4 backdrop-blur-xl max-nav:w-[31.8rem]"><div className="h-full rounded-[1.5rem] bg-background px-[2.4rem] py-8 max-nav:px-7"><figcaption className="mb-6 text-[2rem] font-medium max-nav:text-[1.6rem]">{person.name}<span className="mt-4 block text-[1.4rem] leading-tight text-accent max-nav:text-[1.2rem]">{person.role}</span></figcaption><blockquote className="text-[1.8rem] leading-[1.2] text-white/50 max-nav:text-[1.4rem]">{person.quote}</blockquote></div></figure>)}
    </div>
    <Controls label="testimonials" onMove={direction => track.current.scrollBy({ left: direction * track.current.clientWidth * .8, behavior: 'smooth' })} />
  </div>;
}

export default function Home() {
  const ref = useReveal();
  const deliveryVideo = useRef(null);
  const [lifestyle, setLifestyle] = useState(0);
  const [bowl, setBowl] = useState(0);
  const swipe = useRef(null);
  const nextLifestyle = direction => setLifestyle(value => (value + direction + lifestyles.length) % lifestyles.length);
  const nextBowl = direction => setBowl(value => (value + direction + bowls.length) % bowls.length);
  const swipeProps = move => ({ onPointerDown: event => { swipe.current = event.clientX; }, onPointerUp: event => { if (swipe.current !== null && Math.abs(event.clientX - swipe.current) > 40) move(event.clientX < swipe.current ? 1 : -1); swipe.current = null; }, onPointerCancel: () => { swipe.current = null; } });

  useEffect(() => {
    const video = deliveryVideo.current;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false;
    const syncPlayback = () => {
      if (visible && !reduced.matches) video.play().catch(() => {});
      else {
        video.pause();
        video.currentTime = 0;
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncPlayback();
    });
    observer.observe(video);
    reduced.addEventListener('change', syncPlayback);
    return () => {
      observer.disconnect();
      reduced.removeEventListener('change', syncPlayback);
      video.pause();
    };
  }, []);

  return <div ref={ref}>
    <section className="relative isolate min-h-svh overflow-hidden bg-black">
      <div className="page-container relative grid min-h-svh grid-cols-[1fr_2.2fr_1fr] grid-rows-[auto_auto_1fr] justify-items-center pt-60 pb-20 max-nav:grid-cols-1 max-nav:grid-rows-none max-nav:pt-[14.4rem] max-nav:pb-16">
        <p data-reveal className="col-start-2 mb-7 flex items-center gap-5 text-[2rem] font-medium max-nav:col-start-1 max-nav:mb-5 max-nav:text-[1.8rem]">It's a Lifestyle<img src={image('home-sprout.svg')} alt="" className="size-6" /></p>
        <h1 data-reveal className="col-start-2 mb-24 w-[105rem] max-w-[85vw] text-center text-[min(10rem,10vh)] leading-none font-bold capitalize max-nav:col-start-1 max-nav:mb-5 max-nav:max-w-full max-nav:text-[3.6rem] max-nav:font-medium">EAT local, EAT<br className="max-nav:hidden" /> healthy, EATnaked.</h1>
        <div className="hidden max-nav:flex max-nav:flex-col max-nav:items-center max-nav:gap-12"><p className="max-w-[33.4rem] text-center text-[1.4rem] text-white/60">Seasonal pre-set options or, custom build-a-bowl available.*</p><OrderButton to="/register" accent /></div>
        <div className="col-start-2 row-start-3 w-full min-w-0 max-nav:relative max-nav:isolate max-nav:col-start-1 max-nav:row-auto max-nav:h-140 max-nav:overflow-hidden">
          <video autoPlay muted loop playsInline aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 size-full object-cover max-nav:left-1/2 max-nav:w-[220%] max-nav:max-w-none max-nav:-translate-x-1/2"><source src="/assets/videos/Hero-Showreel.mp4" type="video/mp4" /></video>
          <div className="absolute top-[45%] bottom-20 left-1/2 w-[76rem] max-w-[55%] -translate-x-1/2 max-nav:hidden">
          <FoodTag name="Vegetables" file="hero-vegetables.png" className="absolute bottom-[15%] left-[10%] max-nav:hidden" />
          <FoodTag name="Grains" file="hero-grains.png" className="absolute top-[40%] right-[10%] max-nav:hidden" />
          <FoodTag name="Proteins" file="hero-proteins.png" className="absolute right-[15%] bottom-[7%] max-nav:hidden" />
          </div>
        </div>
        <div data-reveal className="col-start-1 row-start-3 self-end justify-self-start max-nav:row-auto max-nav:w-full">
          <div className="mb-6 grid w-max grid-cols-2 gap-4 max-nav:mx-auto max-nav:grid-cols-3 max-nav:gap-3">{['Bold', 'Fresh', 'Tailored'].map((word, i) => <span key={word} className={`w-max rounded-full border border-white/20 px-10 py-6 text-[1.8rem] backdrop-blur-sm max-nav:px-6 max-nav:py-4 max-nav:text-[1.2rem] ${i === 0 ? 'col-span-2 max-nav:col-span-1' : ''}`}>{word}</span>)}</div>
          <h2 className="mb-6 max-w-103 text-[3rem] leading-[1.16] font-medium max-nav:hidden">From Our Kitchen to Your Door</h2>
          <p className="max-w-142 text-[1.8rem] leading-tight text-white/50 max-nav:hidden">Healthy eating made effortless. Fuel your body and free your time.</p>
        </div>
      </div>
      <Link to="/customer-support" className="group absolute right-0 bottom-0 flex items-center gap-4 rounded-tl-[1.5rem] bg-accent/70 px-20 py-12 text-[2.5rem] font-medium backdrop-blur-sm transition-all duration-500 hover:rounded-tl-[3rem] hover:bg-accent max-nav:hidden"><ArrowIcon className="w-8 -rotate-45 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />Contact Us</Link>
    </section>

    <section className="relative isolate min-h-[max(100svh,50rem)] overflow-hidden bg-black" aria-labelledby="delivered-title">
      <video ref={deliveryVideo} muted playsInline preload="metadata" aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 size-full object-cover"><source src="/assets/videos/delivered-showreel-portrait.mp4" media="(max-width: 1023px)" type="video/mp4" /><source src="/assets/videos/delivered-showreel-landscape.mp4" type="video/mp4" /></video>
      <div className="page-container flex min-h-[max(100svh,50rem)] flex-col justify-between pt-52 pb-12 max-nav:pt-22">
        <h2 data-reveal id="delivered-title" className={`${heading} mx-auto max-w-[70rem] text-center max-nav:max-w-[38rem]`}>Homemade Meals, Delivered Daily</h2>
        <div data-reveal className="w-[24.3rem] max-w-full rounded-[2rem] border border-outline bg-white/11 p-12 backdrop-blur-[28px] max-nav:w-[22rem]"><img src={image('delivered-fresh.svg')} alt="" className="mb-6 size-12" /><h3 className="mb-6 max-w-[70%] text-[2rem] leading-none font-medium max-nav:text-[1.8rem]">Fresh, Never Frozen</h3><p className="text-[1.8rem] leading-tight text-white/50 max-nav:text-[1.4rem]">Streamlined deliveries that accommodate YOUR lifestyle.</p></div>
      </div>
    </section>

    <Goals />

    <Partners />

    <section className="page-container py-60 max-nav:py-32" aria-labelledby="lifestyle-title">
      <div data-reveal role="region" aria-roledescription="carousel" aria-label="Meals for your lifestyle" className="relative isolate mx-auto h-[49.7rem] w-full max-w-[140rem] touch-pan-y max-nav:h-[40rem]" {...swipeProps(nextLifestyle)}>
        {lifestyles.map(([name, description, photo], index) => {
          const offset = (index - lifestyle + 3) % 3;
          return <article key={name} aria-hidden={offset !== 0} inert={offset !== 0} style={{ transform: `translate(-50%, -50%) translateX(${offset === 0 ? 0 : offset === 1 ? 56 : -56}%) scale(${offset === 0 ? 1 : .8})`, zIndex: offset === 0 ? 2 : 1 }} className={`absolute top-1/2 left-1/2 isolate h-full w-[85.7rem] max-w-[75%] overflow-hidden rounded-[3.5rem] border border-outline bg-white/11 p-[.9rem] backdrop-blur-xl transition-[transform,filter] duration-700 ease-brand max-nav:max-w-[85%] max-nav:rounded-[1.5rem] ${offset === 0 ? 'blur-none' : 'blur-[5px]'}`}>
            <div className="relative isolate flex size-full flex-col justify-end overflow-hidden rounded-[3rem] p-20 max-nav:rounded-[1rem] max-nav:p-10"><img src={image(photo)} alt={`${name} lifestyle`} loading="lazy" draggable={false} className="absolute inset-0 -z-10 size-full object-cover" /><div className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-t from-black/80 via-black/10 to-transparent" /><div className={`transition-opacity duration-500 ${offset === 0 ? 'opacity-100' : 'opacity-0'}`}><h3 className="mb-8 text-[5rem] leading-none font-medium max-nav:text-[3rem]">{name}</h3><p className="mb-10 text-[1.8rem] text-white/60 max-nav:text-[1.4rem]">{description}</p><OrderButton to="/our-menu">View Meals</OrderButton></div></div>
          </article>;
        })}
      </div>
      <div className="mt-16"><Controls label="lifestyle" onMove={nextLifestyle} /><p className="sr-only" aria-live="polite">{lifestyles[lifestyle][0]}</p></div>
      <h2 data-reveal id="lifestyle-title" className={`${heading} mx-auto mt-28 max-w-[93rem] text-center max-nav:mt-16`}>Designed for Your Taste, Built for Your Day.</h2>
    </section>

    <section className="page-container overflow-hidden pt-40 max-nav:pt-24" aria-labelledby="ingredients-title">
      <p data-reveal className="mx-auto mb-10 w-fit rounded-full border border-white/55 px-9 py-5 text-center text-[1.8rem] max-nav:text-[1.4rem]">Ingredients that matter</p>
      <h2 data-reveal id="ingredients-title" className="mx-auto min-h-[3em] max-w-[68rem] text-center text-[min(6rem,6vh)] leading-none font-medium capitalize max-nav:text-[3rem]">{bowls[bowl].name}</h2>
      <div data-reveal role="region" aria-roledescription="carousel" aria-label="Fresh ingredients" className="relative isolate mx-auto mt-14 max-w-[130rem] touch-pan-y max-nav:mt-20" {...swipeProps(nextBowl)}>
        {[0, 1, 2].map(index => <div key={index} aria-hidden="true" className="pointer-events-none absolute top-1/2 left-1/2 aspect-square w-[80%] -translate-1/2 rounded-full border border-dashed border-white/10" style={{ width: `${68 + index * 14}%` }} />)}
        <div className="relative mx-auto h-[min(62rem,62vh)] w-[105rem] max-w-[85%] overflow-hidden [mask-image:linear-gradient(to_top,transparent,black_40%)] max-nav:h-[40rem] max-nav:w-full max-nav:max-w-full"><div className="aspect-square w-full"><img key={bowl} src={image(bowls[bowl].photo)} alt={bowls[bowl].name} loading="lazy" draggable={false} className="size-full object-contain" /></div></div>
        {bowls[bowl].tags.map(([name, file], index) => <FoodTag key={`${index}-${name}`} name={name} file={file} className={`absolute ${['top-0 left-[8%] max-nav:left-0', 'top-[24%] left-[4%] max-nav:left-0', 'top-[48%] left-0', 'top-0 right-[8%] max-nav:right-0', 'top-[24%] right-[4%] max-nav:right-0', 'top-[48%] right-0'][index]}`} />)}
        <Controls label="ingredient bowl" onMove={nextBowl} side />
      </div>
      <p className="sr-only" aria-live="polite">{bowls[bowl].name}</p>
    </section>

    <section className="page-container py-60 max-nav:py-32" aria-labelledby="kitchen-title">
      <div data-reveal className="mb-20 flex flex-col items-center gap-10 text-center"><span className="rounded-full border border-white/30 px-8 py-4 text-[1.8rem] max-nav:text-[1.4rem]">Where The Magic Begins</span><h2 id="kitchen-title" className="text-[10rem] leading-none font-medium max-nav:text-[4rem]">Our kitchen<br />In <span className="text-accent">Action</span></h2><p className="max-w-[55rem] text-[1.8rem] leading-relaxed text-white/50 max-nav:text-[1.4rem]">Passionate culinary chefs and skilled dietitians—blending expertise with heart. We bring together decades of experience, a shared love for nourishing others, and a deep commitment to our community.</p></div>
      <div data-reveal><Showreel videoId="1129496694" label="kitchen showreel" /></div>
    </section>

    <Quality />

    <section className="relative isolate overflow-hidden pt-[29rem] pb-40 max-nav:pt-60 max-nav:pb-12" aria-labelledby="join-title">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 mx-auto h-[65rem] max-w-[182.4rem] max-nav:h-[45rem]">{[[1, 'top-[35%] left-[3%] w-60 blur-[5px]'], [2, 'top-[10%] left-[12%] w-58'], [3, 'top-[55%] left-[10%] w-88'], [5, 'top-[15%] left-[30%] w-44 blur-[5px]'], [7, 'top-[5%] right-[38%] w-36'], [9, 'top-[10%] right-[8%] w-90'], [10, 'top-[65%] right-[10%] w-104']].map(([number, position]) => <img key={number} src={image(`veg-${number}.png`)} alt="" loading="lazy" className={`absolute object-contain opacity-80 motion-safe:animate-float max-nav:scale-50 ${position}`} />)}</div>
      <div data-reveal className="page-container mb-[13.5rem] flex flex-col items-center gap-12 text-center max-nav:mb-28 max-nav:gap-8"><p className="text-[2rem] font-medium max-nav:text-[1.8rem]">It's a Lifestyle</p><h2 id="join-title" className={heading}>Are you ready to EATnaked?</h2><p className="text-[1.8rem] text-white/50 max-nav:text-[1.4rem]">Customize Your Plan, or Let Us Choose For You.</p><OrderButton to="/register" accent>Get Started</OrderButton></div>
      <Testimonials />
    </section>
  </div>;
}
