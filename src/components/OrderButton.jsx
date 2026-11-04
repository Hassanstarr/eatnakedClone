import { Link } from 'react-router-dom';
import ArrowIcon from './ArrowIcon.jsx';

export default function OrderButton({ children = 'Order Now', to = '/bowl-builder/meals', onClick, accent = false }) {
  return (
    <Link className={`group/button inline-flex w-fit items-center gap-6 overflow-hidden rounded-full py-[0.6rem] pr-12 pl-[0.6rem] text-[2rem] font-medium whitespace-nowrap backdrop-blur-[14px] max-nav:gap-5 max-nav:text-[1.4rem] ${accent ? 'bg-accent/23' : 'bg-glass'}`} to={to} onClick={onClick}>
      <span className="grid size-16 shrink-0 place-items-center rounded-full bg-accent transition duration-600 ease-brand group-hover/button:scale-20 group-hover/button:bg-white max-nav:size-[3.2rem]"><ArrowIcon className="w-[1.8rem] transition duration-600 ease-brand group-hover/button:scale-0 group-hover/button:rotate-45 max-nav:w-6" /></span>
      <span className="relative block overflow-hidden leading-normal"><span className="block transition-transform duration-600 ease-brand group-hover/button:translate-y-full">{children}</span><span className="absolute inset-x-0 bottom-full transition-transform duration-600 ease-brand group-hover/button:translate-y-full" aria-hidden="true">{children}</span></span>
    </Link>
  );
}
