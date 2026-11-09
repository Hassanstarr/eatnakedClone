import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';

const pageTitles = {
  '/': 'EATnaked',
  '/about-us': 'EATnaked | About Us',
  '/faqs': 'EATnaked | FAQs',
  '/community': 'EATnaked | Community',
  '/our-menu': 'EATnaked | Our Menu',
  '/customer-support': 'EATnaked | Customer Support',
  '/login': 'EATnaked | Login',
  '/register': 'Register | EATnaked',
  '/forgot-password': 'EATnaked | Forgot Password',
  '/terms': 'EATnaked | Terms and Conditions',
  '/privacy-policy': 'EATnaked | Privacy Policy',
  '/juice-naked': 'EATnaked | Juice Naked',
  '/bowl-builder/meals': 'EATnaked | Pre-Set Meals'
};

export default function SiteLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = pageTitles[pathname] ?? 'EATnaked | Page Not Found';
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <>
      <picture className="pointer-events-none fixed inset-0 -z-10 max-nav:opacity-30" aria-hidden="true">
        <source media="(max-width: 1023px)" srcSet="/assets/images/join-bg-portrait.png" />
        <img src="/assets/images/join-bg-landscape.png" alt="" className="size-full object-cover" />
      </picture>
      <a className="fixed top-8 left-12 z-100 translate-y-[-200%] rounded-full bg-accent px-8 py-6 focus:translate-y-0" href="#main-content">Skip to content</a>
      <Navbar />
      <main id="main-content" className={['/about-us', '/faqs', '/community', '/customer-support', '/login', '/register', '/forgot-password', '/juice-naked', '/our-menu'].includes(pathname) ? 'overflow-clip focus:outline-none' : 'page-container min-h-[40vh] pt-74 pb-24 focus:outline-none max-nav:pt-60'} tabIndex={-1}><Outlet /></main>
      {pathname !== '/register' && <Footer />}
    </>
  );
}
