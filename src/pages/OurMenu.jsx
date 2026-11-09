import { useEffect, useRef, useState } from 'react';
import menu from '../data/menu.json';
import useReveal from '../hooks/useReveal.js';

const categories = [['All', 'all'], ['Poultry', 'poultry'], ['Beef', 'beef'], ['Seafood', 'seafood'], ['Vegan', 'vegan'], ['Salads & Wraps', 'salads-wraps'], ['Snacks', 'snacks'], ['Mini-Meals', 'mini-meals']];

function MenuCard({ meal }) {
  const snack = meal.category === 'snacks';
  return (
    <article className="relative isolate flex min-h-204 min-w-0 flex-col items-center overflow-hidden rounded-[2rem] border border-white/8 bg-menu-card p-6 text-center max-nav:min-h-108 max-nav:rounded-[1.5rem] max-nav:px-6 max-nav:py-8">
      <span aria-hidden="true" className="pointer-events-none absolute top-4 left-1/2 -z-10 h-64 w-84 -translate-x-1/2 rounded-full bg-accent/20 blur-[40px] max-nav:h-40 max-nav:w-60" />
      <img src={meal.image} alt={meal.name} loading="lazy" className="h-84 w-full rounded-[2.5rem] object-cover max-nav:h-32 max-nav:w-48 max-nav:max-w-full max-nav:rounded-[2rem]" />
      <h2 className="mt-4 text-[2.5rem] leading-[1.1] font-medium max-nav:text-[1.5rem]">{meal.name}</h2>
      {snack ? <p className="mt-auto rounded-[1.3rem] bg-white/11 px-8 py-6 text-[2.5rem] font-medium text-white/40 max-nav:rounded-lg max-nav:px-6 max-nav:py-4 max-nav:text-[1.2rem]">${meal.price}</p> : (
        <>
          <p className="my-4 text-[2rem] leading-[1.1] font-medium max-nav:text-[1.5rem]">${meal.price}</p>
          <p className="mb-auto px-[2.3rem] text-[1.8rem] leading-[1.2] text-white/60 max-nav:mb-2 max-nav:px-0 max-nav:text-[1.2rem]">{meal.description}</p>
          <dl className="mt-6 flex w-full gap-[.8rem] px-16 max-nav:mt-auto max-nav:gap-[.6rem] max-nav:px-0">
            {[[meal.calories, 'Cals'], [meal.carbohydrates, 'Carbs'], [meal.protein, 'Protein']].map(([value, label]) => (
              <div key={label} className="flex min-w-0 flex-1 flex-col-reverse gap-[.3rem] rounded-[1.3rem] bg-white/11 py-[.7rem] max-nav:rounded-lg max-nav:py-[.6rem]">
                <dt className="text-[1.4rem] leading-[1.2] max-nav:text-[.8rem]">{label}</dt>
                <dd className="text-[2.5rem] leading-[1.2] font-medium text-white/40 max-nav:text-[1.2rem]">{value}</dd>
              </div>
            ))}
          </dl>
        </>
      )}
    </article>
  );
}

export default function OurMenu() {
  const reveal = useReveal();
  const sentinel = useRef(null);
  const [category, setCategory] = useState('all');
  const [input, setInput] = useState('');
  const [search, setSearch] = useState('');
  const [limit, setLimit] = useState(12);
  const meals = menu.filter(meal => (category === 'snacks' ? meal.category === 'snacks' : meal.category !== 'snacks' && (category === 'all' || (category === 'mini-meals' ? meal.is_mini_meal : meal.category === category))) && meal.name.toLowerCase().includes(search));

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setLimit(value => Math.min(value + 12, meals.length));
    }, { rootMargin: '400px' });
    if (limit < meals.length) observer.observe(sentinel.current);
    return () => observer.disconnect();
  }, [limit, meals.length, category, search]);

  function filter(value) {
    setCategory(value);
    setInput('');
    setSearch('');
    setLimit(12);
  }

  return (
    <div ref={reveal}>
      <section className="relative isolate pt-60 pb-[9.4rem] max-nav:pt-36 max-nav:pb-22">
        <img src="/assets/images/gradient-orange-FAQS.webp" alt="" aria-hidden="true" className="pointer-events-none absolute top-0 left-1/2 -z-10 w-full max-w-480 -translate-x-1/2 opacity-30 max-nav:w-240 max-nav:max-w-none" />
        <div data-reveal className="page-container flex flex-col items-center text-center">
          <span className="mb-[2.3rem] flex h-[4.1rem] items-center gap-[1.3rem] rounded-full border border-white/55 px-10 text-[1.8rem] font-medium backdrop-blur-sm max-nav:h-[3.1rem] max-nav:px-[1.3rem] max-nav:text-[1.2rem]"><span className="size-[.4rem] rounded-full bg-white" />Our Menu</span>
          <h1 className="mb-[2.3rem] text-[10rem] leading-none font-medium tracking-tight max-nav:mb-[.6rem] max-nav:text-[4rem]">See What's Cookin'</h1>
          <p className="mb-[.9rem] text-[1.8rem] leading-[2.3rem] max-nav:mb-[2.8rem] max-nav:text-[1.2rem]">*Our menu changes based on seasonality and availability</p>
          <p className="mb-[3.4rem] text-[1.8rem] leading-[2.3rem] text-accent max-nav:hidden">Plans starting from $99</p>
          <form role="search" onSubmit={event => { event.preventDefault(); setSearch(input.trim().toLowerCase()); setLimit(12); }} className="flex h-[5.1rem] w-[46.6rem] max-w-full items-center gap-2 rounded-full bg-white/7 pr-[.6rem] backdrop-blur-sm max-nav:w-124">
            <label htmlFor="menu-search" className="sr-only">Search the menu</label>
            <input id="menu-search" type="search" placeholder="Search..." value={input} onChange={event => setInput(event.target.value)} className="h-full min-w-0 flex-1 rounded-full bg-transparent pl-12 pr-4 text-[2rem] outline-none placeholder:text-white focus-visible:ring-1 focus-visible:ring-accent max-nav:pl-6 max-nav:text-[1.4rem]" />
            <button type="submit" aria-label="Search meals" className="flex size-16 shrink-0 items-center justify-center rounded-full bg-accent shadow-[0_0_12px_#f4783e] transition-transform duration-500 ease-brand hover:scale-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"><svg aria-hidden="true" className="size-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="10.5" cy="10.5" r="7.5" /><path d="m16 16 5 5" strokeLinecap="round" /></svg></button>
          </form>
        </div>
      </section>
      <section aria-label="Our meals" className="page-container pb-24">
        <div data-reveal className="mx-auto mb-20 flex w-max max-w-full gap-8 overflow-x-auto overscroll-x-contain [scrollbar-width:none] max-nav:gap-2">
          {categories.map(([label, key]) => (
            <button key={key} type="button" aria-pressed={category === key} onClick={() => filter(key)} className={`group shrink-0 overflow-hidden rounded-full py-[1.4rem] text-[2rem] font-medium backdrop-blur-sm transition-colors duration-500 hover:bg-accent/25 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent max-nav:py-[.9rem] max-nav:text-[1.3rem] ${category === key ? 'bg-accent/25' : 'bg-white/12'}`}><span className="block h-[2.4rem] overflow-hidden px-12 max-nav:h-[1.7rem] max-nav:px-6"><span className="block leading-[2.4rem] transition-transform duration-500 ease-brand group-hover:-translate-y-1/2 max-nav:leading-[1.7rem]">{label}<span aria-hidden="true" className="block">{label}</span></span></span></button>
          ))}
        </div>
        <div data-reveal className="grid grid-cols-4 gap-16 max-nav:grid-cols-2 max-nav:gap-6">
          {meals.slice(0, limit).map(meal => <MenuCard key={`${meal.category}-${meal.id}`} meal={meal} />)}
        </div>
        <p role="status" aria-live="polite" className="mt-8 min-h-6 text-center text-[clamp(12px,1.1rem,20px)] text-white/70">{!meals.length ? `No ${category === 'snacks' ? 'snacks' : 'meals'} found` : limit >= meals.length ? 'You have reached the end of the menu' : ''}</p>
        <div ref={sentinel} aria-hidden="true" className="mt-12 h-px" />
      </section>
    </div>
  );
}
