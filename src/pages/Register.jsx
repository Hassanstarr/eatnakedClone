import { Link } from 'react-router-dom';
import AuthForm from '../components/AuthForm.jsx';
import useReveal from '../hooks/useReveal.js';

export default function Register() {
  const ref = useReveal();
  return (
    <section ref={ref} className="page-container relative isolate flex min-h-svh flex-col items-center py-[20rem] max-nav:py-[14.5rem]">
      <div data-reveal className="mb-12 flex items-center gap-2 max-nav:mb-8">
        <span className="flex items-center gap-[0.8rem] rounded-full border-[0.5px] border-white/57 px-8 py-[1.3rem] text-[1.8rem] leading-[0.9] font-medium backdrop-blur-[14px] max-nav:gap-[0.6rem] max-nav:py-4 max-nav:text-[1.2rem]"><span className="size-[4px] rounded-full bg-white max-nav:size-[3px]" />Order now</span>
        <img src="/assets/images/auth/register-sprout.svg" alt="" className="size-[4.2rem] max-nav:size-[3.3rem]" />
      </div>
      <h1 data-reveal className="mb-24 max-w-[102.5rem] text-center text-[6rem] leading-normal font-medium capitalize max-nav:mb-[1.7rem] max-nav:max-w-[38rem] max-nav:text-[3rem]">Every healthy journey begins with a single choice—yours starts now.</h1>
      <div data-reveal className="relative isolate w-full max-w-[93.5rem] rounded-[3rem] border border-white/6 bg-white/11 p-[1.3rem] backdrop-blur-[28px] max-nav:max-w-[40rem] max-nav:rounded-[1.5rem] max-nav:p-4">
        <img src="/assets/images/auth/register-glow-bottom.svg" alt="" className="pointer-events-none absolute bottom-0 left-0 -z-10 h-96 w-132 max-w-full blur-[28px]" />
        <img src="/assets/images/auth/register-glow-top.svg" alt="" className="pointer-events-none absolute top-0 right-0 -z-10 h-50 w-214 max-w-full blur-[28px] max-nav:w-132" />
        <div className="flex flex-col items-center gap-10 rounded-[2.5rem] bg-background/96 px-[15rem] pt-24 pb-12 max-nav:gap-14 max-nav:rounded-[1rem] max-nav:px-12 max-nav:pb-20">
          <AuthForm register />
          <p className="text-center text-[1.8rem] leading-none font-medium max-nav:text-[1.4rem]">Already a member? <Link to="/login" className="text-accent underline-offset-8 hover:underline">Log In</Link></p>
          <p className="text-center text-[1.4rem] leading-normal text-muted max-nav:text-[1.2rem]">Can’t complete your registration? <Link to="/customer-support" className="text-accent underline-offset-4 hover:underline">Contact us for support</Link></p>
        </div>
      </div>
    </section>
  );
}
