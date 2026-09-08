'use client';

import { useState } from 'react';
import { Send, CheckCircle2, Loader2 } from 'lucide-react';
import LiquidGlassButton from '@/components/ui/LiquidGlassButton';
import { cn } from '@/lib/utils';

const services = [
  'Agentic AI',
  'Automation',
  'Custom CRM',
  'Web Development',
  'Mobile App',
  'Other',
];
const budgets = ['< $10k', '$10k–$30k', '$30k–$75k', '$75k+'];

/**
 * ContactForm — accessible, inline-validated project brief form.
 * Client-side only: wire `handleSubmit` to your API route / CRM webhook.
 * Labels are visible (not placeholder-only); errors render beside fields.
 */
export default function ContactForm() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    service: '',
    budget: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | done

  const set = (k) => (e) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    setErrors((prev) => ({ ...prev, [k]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!values.name.trim()) next.name = 'Please enter your name.';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(values.email))
      next.email = 'Enter a valid email address.';
    if (!values.service) next.service = 'Pick a service.';
    if (values.message.trim().length < 12)
      next.message = 'Tell us a little more (12+ characters).';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('submitting');
    try {
      // TODO: POST to /api/contact or your CRM/n8n webhook.
      await new Promise((r) => setTimeout(r, 1200));
      setStatus('done');
    } catch {
      setStatus('idle');
    }
  };

  if (status === 'done') {
    return (
      <div className="flex flex-col items-center gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-12 text-center backdrop-blur">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-accent/15 text-accent-soft">
          <CheckCircle2 className="h-7 w-7" />
        </span>
        <h3 className="text-xl font-semibold text-white">Thanks — we’re on it.</h3>
        <p className="max-w-sm text-slate-400">
          We’ll reply within one business day. For anything urgent, email us directly.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" error={errors.name} htmlFor="name">
          <input
            id="name"
            value={values.name}
            onChange={set('name')}
            className={inputCls(errors.name)}
            autoComplete="name"
          />
        </Field>

        <Field label="Work email" error={errors.email} htmlFor="email">
          <input
            id="email"
            type="email"
            value={values.email}
            onChange={set('email')}
            className={inputCls(errors.email)}
            autoComplete="email"
          />
        </Field>

        <Field label="Service" error={errors.service} htmlFor="service">
          <select
            id="service"
            value={values.service}
            onChange={set('service')}
            className={inputCls(errors.service)}
          >
            <option value="" disabled>
              Select a service
            </option>
            {services.map((s) => (
              <option key={s} value={s} className="bg-ink-800">
                {s}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Budget" htmlFor="budget" hint="Optional">
          <select
            id="budget"
            value={values.budget}
            onChange={set('budget')}
            className={inputCls()}
          >
            <option value="" className="bg-ink-800">
              Prefer not to say
            </option>
            {budgets.map((b) => (
              <option key={b} value={b} className="bg-ink-800">
                {b}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-5">
        <Field label="Project details" error={errors.message} htmlFor="message">
          <textarea
            id="message"
            rows={5}
            value={values.message}
            onChange={set('message')}
            className={cn(inputCls(errors.message), 'resize-none')}
            placeholder="What are you trying to build or automate?"
          />
        </Field>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <p className="text-xs text-slate-500">
          By sending this you agree to our privacy policy.
        </p>
        <LiquidGlassButton type="submit" size="lg">
          {status === 'submitting' ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending…
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              Send brief
            </>
          )}
        </LiquidGlassButton>
      </div>
    </form>
  );
}

function Field({ label, htmlFor, error, hint, children }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="flex items-center justify-between text-sm text-slate-300">
        <span>{label}</span>
        {hint ? <span className="text-xs text-slate-500">{hint}</span> : null}
      </label>
      {children}
      {error ? (
        <span role="alert" className="text-xs text-red-400">
          {error}
        </span>
      ) : null}
    </div>
  );
}

const inputCls = (error) =>
  cn(
    'w-full rounded-xl border bg-ink-800/80 px-4 py-3 text-sm text-white outline-none transition-colors',
    'placeholder:text-slate-500 focus:border-primary/60 focus:ring-2 focus:ring-primary/30',
    error ? 'border-red-500/60' : 'border-white/10'
  );
