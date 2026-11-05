import { useState } from 'react';
import OrderButton from '../components/OrderButton.jsx';
import useReveal from '../hooks/useReveal.js';

const fields = [
  { name: 'full_name', label: 'Full Name', type: 'text', autoComplete: 'name', minLength: 3 },
  { name: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
  { name: 'address', label: 'Address', type: 'text', autoComplete: 'street-address', minLength: 10 },
  { name: 'phone', label: 'Phone', type: 'tel', autoComplete: 'tel', pattern: String.raw`[+0-9\s\(\)\-\.]{7,}` },
];
const fieldStyle = 'block rounded-full bg-white/7 backdrop-blur-[14px] transition duration-300 focus-within:bg-white/10 focus-within:ring-1 focus-within:ring-accent';

export default function CustomerSupport() {
  const ref = useReveal();
  const [draftOpened, setDraftOpened] = useState(false);
  const send = (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const body = `Name: ${data.full_name}\nEmail: ${data.email}\nAddress: ${data.address}\nPhone: ${data.phone}\n\n${data.message}`;
    window.location.href = `mailto:support@eatnaked.co?subject=${encodeURIComponent(`Contact request from ${data.full_name}`)}&body=${encodeURIComponent(body)}`;
    setDraftOpened(true);
  };

  return (
    <section ref={ref} className="page-container relative isolate min-h-svh pt-[min(25rem,25svh)] pb-20 max-nav:min-h-0 max-nav:pt-52 max-nav:pb-40">
      <div data-reveal className="pointer-events-none absolute inset-x-0 -top-28 -z-10 max-nav:-top-20" aria-hidden="true">
        <picture className="block [mask-image:linear-gradient(transparent,black_150%)]">
          <source media="(max-width: 1023px)" srcSet="/assets/images/contact-collage-mobile.webp" />
          <img src="/assets/images/contact-collage.webp" alt="" width="1882" height="540" className="h-auto w-full" />
        </picture>
        <div className="absolute inset-x-0 top-28 h-[20.2rem] bg-linear-to-b from-background from-55% to-transparent max-nav:top-20 max-nav:h-40 max-nav:from-0%" />
      </div>
      <div className="relative flex flex-col items-center">
        <span data-reveal className="mb-10 flex h-[4.1rem] w-[14.4rem] items-center justify-center gap-[1.3rem] rounded-full border-[0.5px] border-white/57 text-[1.8rem] font-medium backdrop-blur-[14px] max-nav:h-[3.1rem] max-nav:w-[10.4rem] max-nav:gap-[0.8rem] max-nav:text-[1.2rem]"><span className="size-[0.4rem] rounded-full bg-white" />Contact Us</span>
        <h1 data-reveal className="mb-24 max-w-[85.5rem] text-center text-[10rem] leading-none font-medium capitalize max-nav:mb-20 max-nav:max-w-[32.6rem] max-nav:text-[4rem]">We are here to help you</h1>
        <form data-reveal onSubmit={send} className="grid w-[95.2rem] max-w-full grid-cols-2 gap-8 max-nav:w-[34.2rem] max-nav:grid-cols-1 max-nav:gap-6">
          {fields.map(({ name, label, ...attributes }) => <label key={name} className={fieldStyle}>
            <span className="sr-only">{label}</span>
            <input {...attributes} name={name} placeholder={label} required className="h-[5.1rem] w-full rounded-full bg-transparent px-[1.9rem] text-[2rem] leading-normal font-medium outline-none placeholder:text-muted max-nav:h-[4.1rem] max-nav:text-[1.4rem]" />
          </label>)}
          <label className={`${fieldStyle} col-span-2 rounded-[3rem] max-nav:col-span-1 max-nav:rounded-[2rem]`}>
            <span className="sr-only">Message</span>
            <textarea name="message" placeholder="Message" required minLength={10} className="block h-[16.9rem] w-full resize-y rounded-[3rem] bg-transparent p-[1.7rem] text-[2rem] leading-normal font-medium outline-none placeholder:text-muted max-nav:h-[18.6rem] max-nav:rounded-[2rem] max-nav:text-[1.4rem]" />
          </label>
          <div className="col-span-2 max-nav:col-span-1 max-nav:justify-self-center"><OrderButton type="submit" accent className="max-nav:w-[19.7rem] max-nav:[&>span:last-child]:flex-1 max-nav:[&>span:last-child]:text-center">Send</OrderButton></div>
        </form>
        {draftOpened && <p role="status" className="mt-8 max-w-[60rem] text-center text-[1.6rem] text-muted">Review and send your message in your email app. If no draft opened, email <a className="text-accent underline" href="mailto:support@eatnaked.co">support@eatnaked.co</a>.</p>}
      </div>
    </section>
  );
}
