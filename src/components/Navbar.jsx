import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import ArrowIcon from './ArrowIcon.jsx';
import OrderButton from './OrderButton.jsx';
import { accountLinks, contact, pageLinks, primaryLinks, socialLinks } from './navigation.js';

function MenuLinks({ links, onNavigate }) {
  return (
    <ul className="menu-links">
      {links.map(({ to, label, featured }) => (
        <li key={to}>
          <NavLink to={to} end={to === '/'} onClick={onNavigate} className={featured ? 'menu-link menu-link--featured' : 'menu-link'}>
            <ArrowIcon />
            <span>{label}</span>
            {featured && <span className="menu-link__crown" aria-hidden="true">♛</span>}
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
    <header ref={headerRef} className={`site-header${open ? ' is-open' : ''}${scrolled ? ' is-scrolled' : ''}`}>
      <div className="navbar">
        <div className="navbar__left">
          <Link to="/" className="navbar__logo" aria-label="EATnaked home" onClick={closeMenu}>
            <img src="/assets/images/EATnaked.png" alt="EATnaked" width="200" height="65" />
          </Link>
          <button ref={toggleRef} className="menu-toggle" type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="site-menu" onClick={() => setOpen(!open)}>
            <span /><span />
          </button>
        </div>
        <nav className="navbar__links" aria-label="Primary navigation">
          {primaryLinks.map(({ to, label }) => (
            <NavLink key={to} to={to} onClick={closeMenu} className="navbar__link">
              <span className="navbar__dot" />
              <span className="rolling-label"><span>{label}</span><span aria-hidden="true">{label}</span></span>
            </NavLink>
          ))}
        </nav>
        <div className="navbar__right">
          <Link className="text-link text-link--accent" to="/login" onClick={closeMenu}>Current Customer?</Link>
          <OrderButton onClick={closeMenu} />
        </div>
      </div>

      <div id="site-menu" className="site-menu" aria-hidden={!open} inert={!open} key={location.pathname}>
        <nav className="site-menu__content" aria-label="All pages">
          <MenuLinks links={pageLinks} onNavigate={closeMenu} />
          <MenuLinks links={accountLinks} onNavigate={closeMenu} />
          <ul className="site-menu__socials">
            {socialLinks.map(({ href, label }) => <li key={href}><a href={href} target="_blank" rel="noreferrer">{label}</a></li>)}
          </ul>
          <div className="site-menu__contact">
            <p>We are always here</p>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
            <a href={contact.phoneHref}>{contact.phone}</a>
            <a href={contact.map} target="_blank" rel="noreferrer">{contact.address}</a>
          </div>
          <div className="site-menu__terms">
            <Link to="/terms" onClick={closeMenu}>Terms and Conditions</Link>
            <Link to="/privacy-policy" onClick={closeMenu}>Privacy Policy</Link>
          </div>
          <div className="site-menu__mobile-cta"><OrderButton to="/login" onClick={closeMenu}>Current Customer?</OrderButton></div>
        </nav>
      </div>
    </header>
  );
}
