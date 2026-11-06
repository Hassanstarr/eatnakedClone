import { useState } from 'react';
import OrderButton from '../components/OrderButton.jsx';
import useReveal from '../hooks/useReveal.js';

const fields = [
  { name: 'full_name', label: 'Full Name', type: 'text', autoComplete: 'name', minLength: 3 },
  { name: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
  { name: 'address', label: 'Address', type: 'text', autoComplete: 'street-address', minLength: 10 },
  { name: 'phone', label: 'Phone', type: 'tel', autoComplete: 'tel' },
  { name: 'message', label: 'Message', minLength: 10 },
];
const fieldStyle = 'block bg-white/7 backdrop-blur-[14px] transition duration-300 focus-within:bg-white/10 focus-within:ring-1 focus-within:ring-accent';

function validate(field) {
  const value = field.value.trim();
  if (!value) return 'This field is required';
  if (field.minLength > 0 && value.length < field.minLength) return `Min ${field.minLength} characters required`;
  if (field.name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address';
  if (field.name === 'phone' && (!/^[+0-9\s().-]+$/.test(value) || !/^\d{7,15}$/.test(value.replace(/\D/g, '')))) return 'Please enter a valid phone number';
  return '';
}

export default function CustomerSupport() {
  const ref = useReveal();
  const [errors, setErrors] = useState({});
  const check = (field) => setErrors((previous) => ({ ...previous, [field.name]: validate(field) }));
  const send = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const next = Object.fromEntries(fields.map(({ name }) => [name, validate(form.elements.namedItem(name))]));
    setErrors(next);
    const firstError = fields.find(({ name }) => next[name]);
    if (firstError) form.elements.namedItem(firstError.name).focus();
    else { form.reset(); setErrors({}); }
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
        <form data-reveal noValidate onSubmit={send} onChange={(event) => { if (event.target.name) check(event.target); }} className="grid w-[95.2rem] max-w-full grid-cols-2 items-start gap-8 max-nav:w-[34.2rem] max-nav:grid-cols-1 max-nav:gap-6">
          {fields.map(({ name, label, ...attributes }) => {
            const message = name === 'message';
            const Control = message ? 'textarea' : 'input';
            return <div key={name} className={message ? 'col-span-2 max-nav:col-span-1' : 'min-w-0'}>
              <label className={`${fieldStyle} ${message ? 'rounded-[2rem]' : 'rounded-full'}`}>
                <span className="sr-only">{label}</span>
                <Control {...attributes} name={name} placeholder={label} required aria-invalid={!!errors[name]} aria-describedby={errors[name] ? `${name}-error` : undefined} className={`block w-full bg-transparent text-[2rem] leading-normal font-medium outline-none placeholder:text-muted max-nav:text-[1.4rem] ${message ? 'h-[16.9rem] resize-none rounded-[2rem] p-[1.7rem] max-nav:h-[18.6rem]' : 'h-[5.1rem] rounded-full px-[1.9rem] max-nav:h-[4.1rem]'}`} />
              </label>
              {errors[name] && <p id={`${name}-error`} role="alert" className="mt-3 px-4 text-[1.4rem] leading-snug text-accent max-nav:text-[1.2rem]">{errors[name]}</p>}
            </div>;
          })}
          <div className="col-span-2 max-nav:col-span-1 max-nav:justify-self-center"><OrderButton type="submit" accent className="max-nav:w-[19.7rem] max-nav:[&>span:last-child]:flex-1 max-nav:[&>span:last-child]:text-center">Send</OrderButton></div>
        </form>
      </div>
    </section>
  );
}
