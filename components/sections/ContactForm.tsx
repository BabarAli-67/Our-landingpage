'use client';

import { CheckCircle2, Loader2, Send } from 'lucide-react';
import { useCallback, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react';

import LiquidGlassButton from '@/components/ui/LiquidGlassButton';
import { cn } from '@/lib/utils';
import type {
  ContactErrors,
  ContactField,
  ContactValues,
  SubmitStatus,
} from '@/types';

const SERVICES: readonly string[] = [
  'Agentic AI',
  'Automation',
  'Custom CRM',
  'Web Development',
  'Mobile App',
  'Other',
];

const BUDGETS: readonly string[] = ['< $10k', '$10k–$30k', '$30k–$75k', '$75k+'];

const EMPTY: ContactValues = {
  name: '',
  email: '',
  service: '',
  budget: '',
  message: '',
};

const inputCls = (hasError: boolean): string =>
  cn(
    'w-full rounded-xl border bg-ink-800/80 px-4 py-3 text-sm text-white outline-none transition-colors',
    'placeholder:text-muted focus:border-primary/60 focus:ring-2 focus:ring-primary/30',
    hasError ? 'border-red-500/60' : 'border-white/10'
  );

interface FieldProps {
  readonly label: string;
  readonly htmlFor: ContactField;
  readonly children: ReactNode;
  readonly error?: string;
  readonly hint?: string;
}

/**
 * Field — label + control + error, wired with the ids the control needs.
 *
 * `aria-describedby` and `aria-invalid` live on the control itself (set by the
 * caller via the ids this component establishes), because that is where
 * assistive technology looks for them.
 */
function Field({ label, htmlFor, children, error, hint }: FieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={htmlFor}
        className="flex items-center justify-between text-sm text-slate-300"
      >
        <span>{label}</span>
        {hint ? (
          <span id={`${htmlFor}-hint`} className="text-xs text-muted">
            {hint}
          </span>
        ) : null}
      </label>
      {children}
      {error ? (
        <span id={`${htmlFor}-error`} className="text-xs text-red-400">
          {error}
        </span>
      ) : null}
    </div>
  );
}

/**
 * ContactForm — accessible, inline-validated project brief form.
 *
 * Client component: it is a controlled form.
 *
 * ACCESSIBILITY
 *  - Every control has a visible `<label>` bound by `htmlFor`/`id`.
 *  - Invalid controls carry `aria-invalid` and `aria-describedby` pointing at
 *    their message, so the error is announced with the field rather than
 *    sitting next to it as unassociated text.
 *  - The error summary is a live region, and focus moves to the first invalid
 *    control on a failed submit.
 *  - The success panel is announced via `role="status"`.
 *
 * The submit handler now POSTs to `/api/contact`, which forwards to
 * `CONTACT_WEBHOOK_URL`. It previously resolved a 1.2s `setTimeout` and
 * discarded the brief.
 */
export default function ContactForm() {
  const [values, setValues] = useState<ContactValues>(EMPTY);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  const set = useCallback(
    (key: ContactField) =>
      (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { value } = event.target;
        setValues((current) => ({ ...current, [key]: value }));
        setErrors((current) => {
          if (!(key in current)) return current;
          const next = { ...current };
          delete next[key];
          return next;
        });
      },
    []
  );

  const validate = useCallback((): ContactErrors => {
    const next: ContactErrors = {};
    if (!values.name.trim()) next.name = 'Please enter your name.';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(values.email)) {
      next.email = 'Enter a valid email address.';
    }
    if (!values.service) next.service = 'Pick a service.';
    if (values.message.trim().length < 12) {
      next.message = 'Tell us a little more (12+ characters).';
    }
    return next;
  }, [values]);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const found = validate();
      setErrors(found);

      const firstInvalid = (Object.keys(found) as ContactField[])[0];
      if (firstInvalid) {
        formRef.current
          ?.querySelector<HTMLElement>(`#${firstInvalid}`)
          ?.focus();
        return;
      }

      setStatus('submitting');
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        });
        setStatus(response.ok ? 'done' : 'error');
      } catch {
        setStatus('error');
      }
    },
    [validate, values]
  );

  if (status === 'done') {
    return (
      <div
        role="status"
        className="flex flex-col items-center gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-12 text-center backdrop-blur"
      >
        <span className="grid h-14 w-14 place-items-center rounded-full bg-accent/15 text-accent-soft">
          <CheckCircle2 aria-hidden="true" className="h-7 w-7" />
        </span>
        <h2 className="text-xl font-semibold text-white">Thanks — we’re on it.</h2>
        <p className="max-w-sm text-muted-strong">
          We’ll reply within one business day. For anything urgent, email us
          directly.
        </p>
      </div>
    );
  }

  const describedBy = (field: ContactField, hint = false): string | undefined => {
    const ids = [
      errors[field] ? `${field}-error` : null,
      hint ? `${field}-hint` : null,
    ].filter((id): id is string => id !== null);
    return ids.length > 0 ? ids.join(' ') : undefined;
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      aria-labelledby="contact-form-title"
      className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur sm:p-8"
    >
      <h2 id="contact-form-title" className="sr-only">
        Project brief
      </h2>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" error={errors.name} htmlFor="name">
          <input
            id="name"
            name="name"
            value={values.name}
            onChange={set('name')}
            autoComplete="name"
            required
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={describedBy('name')}
            className={inputCls(Boolean(errors.name))}
          />
        </Field>

        <Field label="Work email" error={errors.email} htmlFor="email">
          <input
            id="email"
            name="email"
            type="email"
            value={values.email}
            onChange={set('email')}
            autoComplete="email"
            required
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={describedBy('email')}
            className={inputCls(Boolean(errors.email))}
          />
        </Field>

        <Field label="Service" error={errors.service} htmlFor="service">
          <select
            id="service"
            name="service"
            value={values.service}
            onChange={set('service')}
            required
            aria-invalid={errors.service ? true : undefined}
            aria-describedby={describedBy('service')}
            className={inputCls(Boolean(errors.service))}
          >
            <option value="" disabled>
              Select a service
            </option>
            {SERVICES.map((service) => (
              <option key={service} value={service} className="bg-ink-800">
                {service}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Budget" htmlFor="budget" hint="Optional">
          <select
            id="budget"
            name="budget"
            value={values.budget}
            onChange={set('budget')}
            aria-describedby={describedBy('budget', true)}
            className={inputCls(false)}
          >
            <option value="" className="bg-ink-800">
              Prefer not to say
            </option>
            {BUDGETS.map((budget) => (
              <option key={budget} value={budget} className="bg-ink-800">
                {budget}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-5">
        <Field label="Project details" error={errors.message} htmlFor="message">
          <textarea
            id="message"
            name="message"
            rows={5}
            value={values.message}
            onChange={set('message')}
            required
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={describedBy('message')}
            placeholder="What are you trying to build or automate?"
            className={cn(inputCls(Boolean(errors.message)), 'resize-none')}
          />
        </Field>
      </div>

      {/* Announced on a failed or errored submit. */}
      <p role="alert" aria-live="assertive" className="mt-4 text-sm text-red-400">
        {status === 'error'
          ? 'Something went wrong sending your brief. Please email us instead.'
          : Object.keys(errors).length > 0
            ? 'Please fix the highlighted fields and try again.'
            : ''}
      </p>

      <div className="mt-4 flex items-center justify-between gap-4">
        <p className="text-xs text-muted">
          By sending this you agree to our privacy policy.
        </p>
        <LiquidGlassButton type="submit" size="lg" disabled={status === 'submitting'}>
          {status === 'submitting' ? (
            <>
              <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />
              Sending…
            </>
          ) : (
            <>
              <Send aria-hidden="true" className="h-4 w-4" />
              Send brief
            </>
          )}
        </LiquidGlassButton>
      </div>
    </form>
  );
}
