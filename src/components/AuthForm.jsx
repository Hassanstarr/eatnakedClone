import { useState } from 'react';
import { Link } from 'react-router-dom';
import OrderButton from './OrderButton.jsx';

const email = { name: 'email', label: 'Email', type: 'email', autoComplete: 'email' };
const password = { name: 'password', label: 'Password', type: 'password', minLength: 8 };
const registerFields = [
  { name: 'first_name', label: 'First Name', autoComplete: 'given-name' },
  { name: 'last_name', label: 'Last Name', autoComplete: 'family-name' },
  email, password,
  { ...password, name: 'confirm_password', label: 'Confirm password' },
  { name: 'phone_number', label: 'Phone', type: 'tel', autoComplete: 'tel' },
  { name: 'zip_code', label: 'Zip Code', inputMode: 'numeric', autoComplete: 'postal-code' },
];

function validate(field) {
  const value = field.value;
  if (field.type === 'checkbox') return field.checked ? '' : 'This field is required';
  if (!value.trim()) return 'This field is required';
  if (field.minLength > 0 && value.length < field.minLength) return `Min ${field.minLength} characters required`;
  if (field.name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return 'Please enter a valid email address';
  if (field.name === 'confirm_password' && value !== field.form.elements.namedItem('password').value) return 'Passwords do not match';
  if (field.name === 'phone_number' && (!/^[+0-9\s().-]+$/.test(value) || !/^\d{7,15}$/.test(value.replace(/\D/g, '')))) return 'Please enter a valid phone number';
  if (field.name === 'zip_code' && !/^\d{5}(?:-\d{4})?$/.test(value.trim())) return 'Please enter a valid ZIP code';
  return '';
}

function FieldError({ name, error }) {
  return error && <p id={`${name}-error`} role="alert" className="mt-3 px-4 text-[1.4rem] leading-snug text-accent max-nav:text-[1.2rem]">{error}</p>;
}

export default function AuthForm({ register = false, recover = false }) {
  const [errors, setErrors] = useState({});
  const [visible, setVisible] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const fields = register ? registerFields : recover ? [email] : [email, password];
  const change = ({ target }) => {
    if (!target.name) return;
    setSubmitted(false);
    const next = { [target.name]: validate(target) };
    if (target.name === 'password' && 'confirm_password' in errors) next.confirm_password = validate(target.form.elements.namedItem('confirm_password'));
    setErrors((previous) => ({ ...previous, ...next }));
  };
  const submit = (event) => {
    event.preventDefault();
    setSubmitted(false);
    const form = event.currentTarget;
    const controls = [...form.elements].filter((field) => field.name);
    const next = Object.fromEntries(controls.map((field) => [field.name, validate(field)]));
    setErrors(next);
    const invalid = controls.find((field) => next[field.name]);
    if (invalid) invalid.focus();
    else { form.reset(); setErrors({}); setVisible({}); setSubmitted(recover); }
  };

  return (
    <form noValidate onSubmit={submit} onChange={change} className={`grid w-full min-w-0 grid-cols-1 ${register ? 'gap-4' : 'gap-8'}`}>
      {fields.map(({ name, label, type = 'text', ...attributes }) => <div key={name} className="min-w-0">
        <div className={`flex items-center rounded-full backdrop-blur-[14px] transition-colors focus-within:ring-1 focus-within:ring-accent ${register ? 'bg-white/14' : 'bg-white/7'}`}>
          <label className="min-w-0 flex-1">
            <span className="sr-only">{label}</span>
            <input {...attributes} name={name} type={visible[name] ? 'text' : type} autoComplete={type === 'password' ? register ? 'new-password' : 'current-password' : attributes.autoComplete} placeholder={label} required aria-invalid={!!errors[name]} aria-describedby={errors[name] ? `${name}-error` : undefined} className={`w-full rounded-full bg-transparent text-[2rem] font-medium outline-none max-nav:px-8 max-nav:py-6 max-nav:text-[1.4rem] ${register ? 'px-[2.7rem] py-[1.8rem] leading-none placeholder:text-white' : 'px-8 py-6 leading-[1.5] placeholder:text-muted'}`} />
          </label>
          {type === 'password' && <button type="button" onClick={() => setVisible((previous) => ({ ...previous, [name]: !previous[name] }))} aria-label={`${visible[name] ? 'Hide' : 'Show'} ${label.toLowerCase()}`} aria-pressed={!!visible[name]} className="mr-6 grid size-12 shrink-0 place-items-center rounded-full text-muted transition-colors hover:text-white max-nav:size-10">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 max-nav:w-7" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" />{!visible[name] && <path d="m3 3 18 18" />}</svg>
          </button>}
        </div>
        <FieldError name={name} error={errors[name]} />
      </div>)}
      {register && <div className="mt-2">
        <label className="flex cursor-pointer items-center gap-4 px-4 text-[clamp(10px,1.5rem,25px)] leading-[1.2] font-medium max-nav:text-[1.5rem]">
          <input name="phone_agreement" type="checkbox" required aria-invalid={!!errors.phone_agreement} aria-describedby={errors.phone_agreement ? 'phone_agreement-error' : undefined} className="size-[max(15px,3rem)] shrink-0 cursor-pointer accent-accent max-nav:size-[max(15px,2.5rem)]" />
          <span>I agree to receive order updates, delivery notifications, and occasional texts from EATnaked. Msg &amp; data rates may apply. Reply STOP to opt out.</span>
        </label>
        <FieldError name="phone_agreement" error={errors.phone_agreement} />
      </div>}
      {!register && !recover && <Link to="/forgot-password" className="px-[2.7rem] text-[1.8rem] font-medium text-accent underline-offset-8 hover:underline max-nav:px-8 max-nav:text-[1.4rem]">Forgot Password?</Link>}
      <OrderButton type="submit" accent className={`justify-self-center [&>span:last-child]:flex-1 [&>span:last-child]:text-center ${register ? 'mt-8 min-w-100 max-nav:mt-20 max-nav:min-w-80' : 'mt-[3.4rem] mb-[3.4rem] max-nav:w-[19.7rem]'}`}>{register ? 'Let’s Go!' : recover ? 'Send' : 'Login'}</OrderButton>
      {!register && <p className="flex justify-center gap-3 text-[1.8rem] font-medium max-nav:text-[1.4rem]">No account?<Link to="/register" className="text-accent underline-offset-8 hover:underline">Register</Link></p>}
      {submitted && <p role="status" className="w-max justify-self-center text-center text-[2.4rem] leading-normal whitespace-nowrap text-white max-nav:text-[1.8rem]">If an account exists with this email,<br className="hidden max-nav:block" />{' '}a password reset link has been sent.</p>}
    </form>
  );
}
