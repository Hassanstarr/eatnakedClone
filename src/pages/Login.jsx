import AuthForm from '../components/AuthForm.jsx';
import useReveal from '../hooks/useReveal.js';

const vegetables = [
  'size-60 top-120 left-28 blur-[5px] max-nav:top-104 max-nav:-left-28 max-nav:size-40',
  'size-58 top-62 left-94 max-nav:top-60 max-nav:-left-20 max-nav:size-32',
  'size-88 top-160 left-80 max-nav:top-180 max-nav:-left-48 max-nav:size-60',
  'size-24 top-160 left-176 blur-[7.5px] max-nav:hidden',
  'size-44 top-72 left-244 blur-[5px] max-nav:hidden',
  'w-114 h-52 top-0 left-302 blur-[7.5px] max-nav:hidden',
  'size-36 top-40 left-408 max-nav:top-48 max-nav:right-0 max-nav:left-auto max-nav:size-24',
  'size-28 top-76 right-232 blur-[7.5px] max-nav:hidden',
  'w-90 h-128 top-28 right-68 max-nav:top-68 max-nav:-right-52 max-nav:h-84 max-nav:w-60',
  'w-104 h-64 top-182 right-78 max-nav:top-200 max-nav:-right-56',
  'size-24 top-160 right-44 blur-[7.5px] max-nav:top-168 max-nav:-right-12 max-nav:size-20',
];

export default function Login({ recover = false }) {
  const ref = useReveal();
  return (
    <section ref={ref} className="page-container relative isolate min-h-svh pt-[min(25rem,25svh)] pb-20 max-nav:pt-60 max-nav:pb-32">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden select-none" aria-hidden="true">
        {vegetables.map((position, index) => <img data-reveal key={position} src={`/assets/images/login/veg-${index + 1}.png`} alt="" className={`absolute object-contain ${position}`} />)}
      </div>
      <div className="flex flex-col items-center">
        {!recover && <span data-reveal className="mb-[0.6rem] flex h-[4.1rem] w-[10.4rem] items-center justify-center gap-[1.3rem] rounded-full border-[0.5px] border-white/57 text-[1.8rem] font-medium backdrop-blur-[14px] max-nav:mb-[1.3rem] max-nav:h-[3.2rem] max-nav:w-[7.4rem] max-nav:gap-[0.4rem] max-nav:text-[1.2rem]"><span className="size-[0.4rem] rounded-full bg-white" />Login</span>}
        <h1 data-reveal className="mb-[4.4rem] w-[88.6rem] max-w-full text-center text-[10rem] leading-none font-medium capitalize max-nav:w-[28.1rem] max-nav:text-[4rem]">{recover ? 'Recover your password' : 'Welcome back!'}</h1>
        <div data-reveal className="w-[46rem] max-w-full max-nav:w-[29.7rem]"><AuthForm recover={recover} /></div>
      </div>
    </section>
  );
}
