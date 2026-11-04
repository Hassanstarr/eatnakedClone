import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import ArrowIcon from './ArrowIcon.jsx';
import OrderButton from './OrderButton.jsx';
import { accountLinks, contact, pageLinks, primaryLinks, socialLinks } from './navigation.js';

function MenuLinks({ links, onNavigate }) {
  return (
    <ul className="flex flex-col gap-[min(4rem,4vh)] max-nav:gap-10">
      {links.map(({ to, label, featured }) => (
        <li key={to}>
          <NavLink to={to} end={to === '/'} onClick={onNavigate} className={`menu-link group/link flex w-fit -translate-x-22 items-center gap-6 text-[min(6rem,6vh)] leading-[0.95] font-medium transition duration-600 ease-brand hover:translate-x-0 hover:text-white focus-visible:translate-x-0 [&.active]:translate-x-0 [&.active]:text-white max-nav:-translate-x-14 max-nav:gap-4 max-nav:text-[3.5rem] max-sm:text-[clamp(2.7rem,7.6vw,3.5rem)] ${featured ? 'text-accent [&.active]:text-accent' : 'text-subtle'}`}>
            <ArrowIcon className="size-16 shrink-0 scale-0 rotate-45 opacity-0 transition duration-600 ease-brand group-hover/link:scale-100 group-hover/link:rotate-0 group-hover/link:opacity-100 group-focus-visible/link:scale-100 group-focus-visible/link:rotate-0 group-focus-visible/link:opacity-100 group-[.active]/link:scale-100 group-[.active]/link:rotate-0 group-[.active]/link:opacity-100 max-nav:size-10" />
            <span>{label}</span>
            {featured && <span className="self-start text-[2.5rem]" aria-hidden="true">♛</span>}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef(null);
  const toggleRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const background = [...document.querySelectorAll('#main-content, .site-footer')];
    background.forEach((element) => { element.inert = true; });
    const frame = requestAnimationFrame(() => {
      headerRef.current.querySelector('.menu-link')?.focus();
    });
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (event.key !== 'Tab') return;
      const focusable = [...headerRef.current.querySelectorAll('a[href], button')]
        .filter((element) => element.getClientRects().length > 0);
      const first = focusable[0];
      const last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
      background.forEach((element) => { element.inert = false; });
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const closeMenu = () => {
    setOpen(false);
    toggleRef.current?.focus();
  };

  return (
    <header ref={headerRef} data-open={open} className="group/nav fixed inset-x-0 top-0 z-50 isolate">
      <div className={`relative flex min-h-50 items-center justify-between p-12 transition duration-600 ease-brand max-nav:min-h-36 max-nav:p-6 ${scrolled && !open ? 'bg-background/85 backdrop-blur-xl' : ''}`}>
        <div className="flex items-center gap-18 max-nav:w-full max-nav:justify-between">
          <Link to="/" className="block h-26 transition-transform duration-600 ease-brand hover:scale-95 max-nav:h-16" aria-label="EATnaked home" onClick={closeMenu}>
            <img className="h-full w-auto object-contain" src="/assets/images/EATnaked.png" alt="EATnaked" width="200" height="65" />
          </Link>
          <button ref={toggleRef} className="flex h-20 w-26 flex-col justify-center gap-4 p-2 max-nav:h-[4.4rem] max-nav:w-[4.8rem] max-nav:gap-[0.8rem]" type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="site-menu" onClick={() => setOpen(!open)}>
            <span className={`h-0.5 w-full bg-white transition-transform duration-600 ease-brand ${open ? 'translate-y-[calc(0.5rem+1px)] rotate-45 max-nav:translate-y-[calc(0.4rem+1px)]' : '-translate-x-2'}`} />
            <span className={`h-0.5 w-full bg-white transition-transform duration-600 ease-brand ${open ? '-translate-y-[calc(0.5rem+1px)] -rotate-45 max-nav:-translate-y-[calc(0.4rem+1px)]' : 'translate-x-2'}`} />
          </button>
        </div>
        <nav className="absolute top-1/2 left-1/2 flex -translate-1/2 gap-16 max-nav:hidden" aria-label="Primary navigation">
          {primaryLinks.map(({ to, label }) => (
            <NavLink key={to} to={to} onClick={closeMenu} className="group/link flex items-center gap-[0.7rem] font-medium">
              <span className="size-[3px] shrink-0 rounded-full bg-current group-hover/link:bg-accent group-[.active]/link:bg-accent" />
              <span className="relative block overflow-hidden leading-normal [&>span]:block [&>span]:transition-transform [&>span]:duration-600 [&>span]:ease-brand group-hover/link:[&>span]:translate-y-full group-[.active]/link:[&>span]:translate-y-full"><span>{label}</span><span className="absolute inset-x-0 bottom-full text-accent" aria-hidden="true">{label}</span></span>
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-10 max-nav:hidden">
          <Link className="font-medium whitespace-nowrap text-accent underline-offset-12 hover:underline" to="/login" onClick={closeMenu}>Current Customer?</Link>
          <OrderButton onClick={closeMenu} />
        </div>
      </div>

      <div id="site-menu" className={`fixed inset-0 -z-10 h-dvh overflow-y-auto overscroll-contain bg-background/94 backdrop-blur-[40px] transition-[opacity,visibility] duration-600 ease-brand max-nav:bg-background ${open ? 'visible opacity-100' : 'invisible opacity-0'}`} aria-hidden={!open} inert={!open} key={location.pathname}>
        <nav className="grid min-h-full grid-cols-[1fr_1fr_auto] grid-rows-[1fr_auto] gap-24 px-[7vw] pt-[min(18rem,22vh)] pb-[min(10rem,10vh)] max-nav:grid-cols-2 max-nav:gap-16 max-nav:px-24 max-nav:pt-56 max-sm:flex max-sm:flex-col max-sm:gap-10 max-sm:px-14 max-sm:pt-44 max-sm:pb-16" aria-label="All pages">
          <MenuLinks links={pageLinks} onNavigate={closeMenu} />
          <MenuLinks links={accountLinks} onNavigate={closeMenu} />
          <ul className="grid content-start gap-6 text-[2.3rem] [&_a:hover]:opacity-60 max-nav:hidden">
            {socialLinks.map(({ href, label }) => <li key={href}><a href={href} target="_blank" rel="noreferrer">{label}</a></li>)}
          </ul>
          <div className="grid content-start gap-6 text-[2.3rem] [&_a]:max-w-120 [&_a]:text-muted [&_a:hover]:text-white max-nav:hidden">
            <p className="mb-6 text-[3rem] font-medium">We are always here</p>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
            <a href={contact.phoneHref}>{contact.phone}</a>
            <a href={contact.map} target="_blank" rel="noreferrer">{contact.address}</a>
          </div>
          <div className="col-span-2 col-start-2 flex self-end justify-self-end gap-40 text-[2.3rem] [&_a:hover]:opacity-60 max-nav:hidden">
            <Link to="/terms" onClick={closeMenu}>Terms and Conditions</Link>
            <Link to="/privacy-policy" onClick={closeMenu}>Privacy Policy</Link>
          </div>
          <div className="col-span-2 hidden self-end justify-self-center max-nav:block max-sm:mt-10 max-sm:self-stretch [&_a]:min-w-120 max-sm:[&_a]:w-full max-sm:[&_a]:min-w-0"><OrderButton to="/login" onClick={closeMenu}>Current Customer?</OrderButton></div>
        </nav>
      </div>
    </header>
  );
}
