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

export default function Footer() {
  const backToTop = () => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });

  return (
    <footer className="site-footer">
      <div className="footer__content">
        <div className="footer__top">
          <nav aria-label="Footer navigation"><ul className="footer__list">
            {footerLinks.map(({ to, label }) => <li key={to}><NavLink to={to} end={to === '/'}>{label}</NavLink></li>)}
          </ul></nav>
          <nav aria-label="Account navigation"><ul className="footer__list">
            <li><NavLink to="/login">Login</NavLink></li>
            <li><NavLink to="/register">Register</NavLink></li>
          </ul></nav>
          <address className="footer__contact footer__list">
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
            <a href={contact.phoneHref}>{contact.phone}</a>
            <a href={contact.map} target="_blank" rel="noreferrer">{contact.address}</a>
          </address>
          <ul className="footer__socials footer__list" aria-label="Social media">
            {socialLinks.map(({ href, label }) => <li key={href}><a href={href} target="_blank" rel="noreferrer">{label}</a></li>)}
          </ul>
        </div>
        <div className="footer__bottom">
          <Link className="footer__brand" to="/" aria-label="EATnaked home">EATnaked</Link>
          <button className="footer__back-to-top" type="button" aria-label="Back to top" onClick={backToTop}><ArrowIcon /></button>
          <p className="footer__copyright">© All rights reserved {new Date().getFullYear()}</p>
          <nav className="footer__terms" aria-label="Legal navigation">
            <Link to="/terms">Terms and Conditions</Link>
            <Link to="/privacy-policy">Privacy Policy</Link>
          </nav>
        </div>
      </div>
      <picture className="footer__background" aria-hidden="true">
        <source media="(max-width: 767px)" srcSet="/assets/images/footer-bg-portrait.avif" />
        <img src="/assets/images/footer-bg-landscape.avif" alt="" loading="lazy" />
      </picture>
    </footer>
  );
}
