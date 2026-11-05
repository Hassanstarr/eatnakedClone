import { useState } from 'react';
import ArrowIcon from '../components/ArrowIcon.jsx';
import useReveal from '../hooks/useReveal.js';

const questions = [
  ['Is there a delivery charge?', 'Delivery pricing depends on your selected plan.', 'Standard members pay $20 per delivery, while Platinum members enjoy a preferred $10 delivery rate.'],
  ['Does someone have to be home?', 'We do suggest that someone is home to accept delivery if possible to maintain freshness,', 'however we do chill them prior to delivery, so it is ok to wait 1-2 hours depending on the outside temperature.'],
  ['How long do your meals last?', 'The containers that we use preserve the meals for 5-6 days from the day we deliver them to you.', 'You may also freeze them to preserve them longer, or simply order more often from us!'],
  ['How long until I receive my order?', 'We offer two delivery days each week: Sunday and Wednesday.', 'At signup, you’ll choose the day that works best for your lifestyle. Premium members may opt for split delivery service and receive meals on both days.'],
  ['What is the pickup window?', 'Customers who select pickup can collect their order between 11:30 AM and 2:30 PM Pacific Time on their selected pickup day.'],
  ['How does your company handle food allergies?', 'Our meals are prepared in a facility that also handles nuts, dairy, eggs, soy, wheat, fish, and shellfish. While we follow strict cleaning and separation procedures, trace contact with allergens may occur.', 'EATnaked does not operate an allergen-free kitchen.'],
];

export default function Faqs() {
  const [active, setActive] = useState(null);
  const ref = useReveal();

  return (
    <section ref={ref} className="relative isolate">
      <img src="/assets/images/gradient-orange-FAQS.webp" alt="" className="pointer-events-none absolute top-[-5%] left-1/2 -z-10 h-160 w-full -translate-x-1/2 object-contain max-nav:object-cover" />
      <div className="page-container grid min-h-[min(100svh,108rem)] grid-cols-2 items-start gap-32 pt-100 max-nav:grid-cols-1 max-nav:gap-28 max-nav:py-60">
        <div data-reveal className="sticky top-72 flex min-w-0 flex-col gap-8 max-nav:static max-nav:items-center">
          <h1 className="max-w-300 text-[10rem] leading-none font-medium capitalize max-nav:max-w-full max-nav:w-[32.6rem] max-nav:text-center max-nav:text-[4rem] max-nav:leading-tight">Frequently <span className="text-accent">Asked</span> Questions</h1>
          <p className="text-[1.8rem] leading-[1.28] max-nav:text-center max-nav:text-[1.4rem] max-nav:text-white/60">If you can't find your answers, live chat with us!</p>
        </div>
        <ul data-reveal className="flex min-w-0 flex-col gap-8">
          {questions.map(([question, answer, detail], index) => {
            const open = active === index;
            return (
              <li key={question} className="relative isolate overflow-hidden rounded-[3rem] border border-[#99999935] bg-surface py-[2.9rem] pr-[2.9rem] pl-[3.9rem] backdrop-blur-[189px] max-nav:rounded-3xl max-nav:py-[1.6rem] max-nav:pr-[1.3rem] max-nav:pl-[1.9rem]">
                <div className={`pointer-events-none absolute inset-0 -z-10 bg-linear-to-r from-white/5 from-45% to-accent/27 transition-opacity duration-800 ${open ? 'opacity-100' : 'opacity-0'}`} />
                <h2>
                  <button id={`faq-question-${index}`} type="button" aria-expanded={open} aria-controls={`faq-answer-${index}`} onClick={() => setActive(open ? null : index)} className="group flex w-full items-center justify-between gap-[1em] text-left text-[2.5rem] font-medium capitalize max-nav:text-[1.8rem]">
                    {question}
                    <span className={`relative grid size-18 shrink-0 place-items-center rounded-full backdrop-blur-[14px] transition duration-600 ease-brand max-nav:size-12 ${open ? 'rotate-45 bg-accent' : 'bg-glass'}`}>
                      <span className="absolute inset-0 rounded-full bg-white/10 transition-transform duration-600 ease-brand group-hover:scale-75" />
                      <ArrowIcon className="relative w-[1.7rem] max-nav:w-[1.1rem]" />
                    </span>
                  </button>
                </h2>
                <div id={`faq-answer-${index}`} role="region" aria-labelledby={`faq-question-${index}`} aria-hidden={!open} inert={!open} className={`grid overflow-hidden transition-[grid-template-rows] duration-600 ease-brand ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                  <div className="min-h-0 overflow-hidden">
                    <p className="pt-[4.6rem] pb-[3.9rem] text-[1.8rem] leading-[1.28]">{answer}{detail && <span className="text-white/60"> {detail}</span>}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
