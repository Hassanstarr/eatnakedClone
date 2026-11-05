import { Link, NavLink } from 'react-router-dom';
import ArrowIcon from './ArrowIcon.jsx';
import { contact, socialLinks } from './navigation.js';

const footerLinks = [
  { to: '/', label: 'Home' },
  { to: '/about-us', label: 'About Us' },
  { to: '/community', label: 'Community' },
  { to: '/our-menu', label: 'Menu' },
  { to: '/customer-support', label: 'Contact Us' },
];

const listStyle = 'grid content-start gap-6 text-[2.3rem] font-medium leading-[1.1] max-nav:text-[1.6rem] [&_a]:transition-opacity [&_a:hover]:opacity-60';
const navStyle = `${listStyle} [&_a]:text-muted [&_a.active]:text-white [&_a:hover]:text-white`;

export default function Footer() {
  const backToTop = () => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });

  return (
    <footer className="site-footer relative isolate mx-auto max-w-[calc(var(--page-max-width)+2*var(--page-gutter))] overflow-hidden">
      <div className="page-container flex flex-col gap-52 pt-118 pb-16 max-nav:pt-28 max-sm:gap-0 max-sm:pt-[4.8rem] max-sm:pb-[2.8rem]">
        <div className="grid grid-cols-[auto_auto_1fr_auto] gap-40 max-nav:grid-cols-2 max-nav:gap-16 max-sm:grid-cols-[1.4fr_1fr] max-sm:gap-x-8">
          <nav aria-label="Footer navigation"><ul className={navStyle}>
            {footerLinks.map(({ to, label }) => <li key={to}><NavLink to={to} end={to === '/'}>{label}</NavLink></li>)}
          </ul></nav>
          <nav aria-label="Account navigation"><ul className={navStyle}>
            <li><NavLink to="/login">Login</NavLink></li>
            <li><NavLink to="/register">Register</NavLink></li>
          </ul></nav>
          <address className={`${listStyle} max-w-152 justify-self-center not-italic max-nav:max-w-100 max-nav:justify-self-start max-sm:gap-4 [&_a]:wrap-anywhere`}>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
            <a href={contact.phoneHref}>{contact.phone}</a>
            <a href={contact.map} target="_blank" rel="noreferrer">{contact.address}</a>
          </address>
          <ul className={listStyle} aria-label="Social media">
            {socialLinks.map(({ href, label }) => <li key={href}><a href={href} target="_blank" rel="noreferrer">{label}</a></li>)}
          </ul>
        </div>
        <div className="grid grid-cols-[1fr_auto_auto] items-end gap-x-12 gap-y-30 max-lg:mt-16 max-lg:grid-cols-1 max-lg:gap-0">
          <div className="@container col-span-2 min-w-0 max-lg:col-span-1 max-lg:col-start-1 max-lg:row-start-3">
          <Link
            className="block w-full text-[min(19cqw,280px)] leading-[0.8] font-medium tracking-[0.01em] max-lg:text-center"
            to="/"
            aria-label="EATnaked home"
          >
            EATnaked
          </Link>
          </div>

          <button
            className="col-start-3 -mb-4 grid aspect-square w-[16.6rem] place-items-center justify-self-end rounded-full bg-accent transition-transform duration-600 ease-brand hover:scale-95 max-nav:w-36 max-lg:col-start-1 max-lg:row-start-2 max-lg:mt-12 max-lg:mb-20"
            type="button"
            aria-label="Back to top"
            onClick={backToTop}
          >
            <ArrowIcon className="w-[46%] -rotate-90" />
          </button>

          <p className="col-start-1 row-start-2 text-[2.3rem] font-medium max-nav:text-[1.4rem] max-lg:row-start-4 max-lg:mt-12 max-lg:text-center">
            © All rights reserved {new Date().getFullYear()}
          </p>

          <nav
            className="col-span-2 col-start-2 row-start-2 grid grid-cols-subgrid text-[2.3rem] font-medium text-muted [&_a]:transition-colors [&_a:hover]:text-white max-nav:text-[1.4rem] max-lg:col-span-1 max-lg:col-start-1 max-lg:row-start-1 max-lg:flex max-lg:flex-col max-lg:items-start max-lg:gap-[0.7rem]"
            aria-label="Legal navigation"
          >
            <Link className="justify-self-end" to="/terms">
              Terms and Conditions
            </Link>

            <Link className="justify-self-end" to="/privacy-policy">
              Privacy Policy
            </Link>
          </nav>
        </div>
      </div>
      <picture className="pointer-events-none absolute bottom-0 left-0 -z-10 h-160 w-full max-sm:h-3/5 [&_img]:size-full [&_img]:object-cover" aria-hidden="true">
        <source media="(max-width: 767px)" srcSet="/assets/images/footer-bg-portrait.avif" />
        <img src="/assets/images/footer-bg-landscape.avif" alt="" loading="lazy" />
      </picture>
    </footer>
  );
}
