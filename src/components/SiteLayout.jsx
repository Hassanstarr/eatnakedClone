import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';

export default function SiteLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <>
      <picture className="pointer-events-none fixed inset-0 -z-10 max-nav:opacity-30" aria-hidden="true">
        <source media="(max-width: 900px)" srcSet="/assets/images/join-bg-portrait.png" />
        <img src="/assets/images/join-bg-landscape.png" alt="" className="size-full object-cover" />
      </picture>
      <a className="fixed top-8 left-12 z-100 translate-y-[-200%] rounded-full bg-accent px-8 py-6 focus:translate-y-0" href="#main-content">Skip to content</a>
      <Navbar />
      <main id="main-content" className={['/about-us', '/faqs'].includes(pathname) ? 'overflow-clip focus:outline-none' : 'min-h-[40vh] px-12 pt-74 pb-24 focus:outline-none max-nav:px-6 max-nav:pt-60'} tabIndex={-1}><Outlet /></main>
      {pathname !== '/register' && <Footer />}
    </>
  );
}
