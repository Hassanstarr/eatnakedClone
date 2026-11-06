import { useRef, useState } from 'react';
import ArrowIcon from '../components/ArrowIcon.jsx';
import OrderButton from '../components/OrderButton.jsx';
import useReveal from '../hooks/useReveal.js';

const juices = [
  { id: 282, name: 'Code Red' },
  { id: 284, name: 'Mellow Yellow' },
  { id: 287, name: 'Green Light' },
  { id: 286, name: 'Immunity Shot' },
  { id: 285, name: 'Turmeric Boost' },
];
const image = (id) => `/assets/images/juices/${id}.webp`;

export default function JuiceNaked() {
  const ref = useReveal();
  const swipe = useRef(null);
  const [active, setActive] = useState(0);
  const move = (direction) => setActive((index) => (index + direction + juices.length) % juices.length);

  return (
    <div ref={ref}>
      <section className="page-container grid min-h-svh grid-cols-[2fr_3fr] items-center pt-[6.5rem] max-nav:grid-cols-1 max-nav:pt-60 max-nav:pb-20">
        <div data-reveal className="relative z-10 flex min-w-0 flex-col items-start py-20 max-nav:items-center max-nav:py-0 max-nav:text-center">
          <span className="mb-[2.3rem] flex h-[4.1rem] w-[13.4rem] items-center justify-center gap-[1.3rem] rounded-full border-[0.5px] border-white/57 text-[1.8rem] font-medium backdrop-blur-[14px] max-nav:h-[3.2rem] max-nav:w-[10.4rem] max-nav:gap-3 max-nav:text-[1.2rem]"><span className="size-[0.4rem] rounded-full bg-white" />Our Menu</span>
          <h1 className="mb-[2.3rem] text-[10rem] leading-none font-medium whitespace-nowrap max-nav:mb-[0.6rem] max-nav:text-[4rem]">Juice Naked</h1>
          <p className="mb-[3.4rem] max-w-[54.5rem] text-[1.8rem] leading-[2.3rem] max-nav:mb-[2.8rem] max-nav:max-w-[44.4rem] max-nav:text-[1.4rem]">Our cold pressed juices pair perfectly with our meals adding a fresh, nutrient rich boost that supports overall wellness.</p>
          <OrderButton accent />
        </div>
        <div data-reveal role="region" aria-roledescription="carousel" aria-label="Featured juices" tabIndex={0} onKeyDown={(event) => { if (['ArrowLeft', 'ArrowRight'].includes(event.key)) { event.preventDefault(); move(event.key === 'ArrowRight' ? 1 : -1); } }} className="relative isolate flex min-w-0 items-center justify-center self-stretch max-nav:mt-[6.9rem] max-nav:min-h-[36rem]">
          <img src="/assets/images/juices/juice-bg-mobile.png" alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 size-full object-contain [mask-image:linear-gradient(transparent,black_10%)] max-nav:top-1/2 max-nav:left-1/2 max-nav:h-[145%] max-nav:w-[145%] max-nav:max-w-none max-nav:-translate-1/2" />
          <div className="w-full touch-pan-y overflow-hidden" onPointerDown={(event) => { swipe.current = event.clientX; event.currentTarget.setPointerCapture(event.pointerId); }} onPointerUp={(event) => { if (swipe.current !== null && Math.abs(event.clientX - swipe.current) > 40) move(event.clientX < swipe.current ? 1 : -1); swipe.current = null; }} onPointerCancel={() => { swipe.current = null; }}>
            <div className="flex transition-transform duration-800 ease-brand motion-reduce:transition-none" style={{ transform: `translateX(-${active * 100}%)` }}>
              {juices.map((juice, index) => <figure key={juice.id} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${juices.length}`} aria-hidden={index !== active} className="flex w-full shrink-0 flex-col items-center justify-center py-12">
                <img src={image(juice.id)} alt={juice.name} draggable={false} width="638" height="516" className="mb-[2.9rem] h-[51.6rem] w-[63.8rem] max-w-[70%] object-cover max-nav:h-[22.1rem] max-nav:w-[27.3rem] max-nav:max-w-[75%]" />
                <figcaption className="max-w-[80%] text-center text-[3.5rem] leading-[4rem] font-medium max-nav:text-[2.3rem]">{juice.name}</figcaption>
              </figure>)}
            </div>
          </div>
          <div className="pointer-events-none absolute inset-x-[5%] top-1/2 flex -translate-y-1/2 justify-between max-nav:inset-x-[2.5%]">
            {[-1, 1].map((direction) => <button key={direction} type="button" aria-label={direction < 0 ? 'Previous juice' : 'Next juice'} onClick={() => move(direction)} className="group/arrow pointer-events-auto relative grid size-32 place-items-center rounded-full bg-white/12 backdrop-blur-[14px] transition-transform duration-600 ease-brand hover:scale-95 before:absolute before:inset-[12.5%] before:rounded-full before:bg-white/10 before:transition-transform before:duration-600 hover:before:scale-[1.33] max-nav:size-[4.1rem]">
              <ArrowIcon className={`relative w-[2.7rem] max-nav:w-[1.4rem] ${direction < 0 ? 'rotate-180' : ''}`} />
            </button>)}
          </div>
          <p className="sr-only" aria-live="polite" aria-atomic="true">{juices[active].name}, {active + 1} of {juices.length}</p>
        </div>
      </section>
      <section aria-label="Our juices" className="page-container relative isolate pb-12">
        <div className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[45rem] w-[75%] -translate-1/2 rounded-full bg-accent/15 blur-[120px]" aria-hidden="true" />
        <div className="grid grid-cols-4 gap-16 max-nav:grid-cols-2 max-nav:gap-6">
          {juices.map((juice) => <article data-reveal key={juice.id} className="flex min-h-[44rem] min-w-0 flex-col items-center gap-[2.3rem] overflow-hidden rounded-[3rem] border border-white/20 bg-white/11 px-[4.7rem] pt-[5.3rem] pb-[5.1rem] backdrop-blur-[42px] max-nav:min-h-0 max-nav:gap-6 max-nav:rounded-[1.5rem] max-nav:px-6 max-nav:pt-10 max-nav:pb-11">
            <img src={image(juice.id)} alt={juice.name} loading="lazy" width="310" height="252" className="h-[25.2rem] w-full max-w-[31rem] object-contain max-nav:h-[13rem] max-nav:max-w-[16.1rem]" />
            <h2 className="text-center text-[3.5rem] leading-[1.2] font-medium max-nav:text-[1.5rem]">{juice.name}</h2>
          </article>)}
        </div>
      </section>
    </div>
  );
}
