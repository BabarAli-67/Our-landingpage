import { NextResponse } from 'next/server';

import type { ContactPayload } from '@/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_LENGTHS: Readonly<Record<keyof ContactPayload, number>> = {
  name: 120,
  email: 200,
  service: 80,
  budget: 40,
  message: 4000,
};

function asString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

/** Server-side validation. The client's checks are UX, not a trust boundary. */
function parse(body: unknown): ContactPayload | null {
  if (typeof body !== 'object' || body === null) return null;
  const record = body as Record<string, unknown>;

  const payload: ContactPayload = {
    name: asString(record.name).slice(0, MAX_LENGTHS.name),
    email: asString(record.email).slice(0, MAX_LENGTHS.email),
    service: asString(record.service).slice(0, MAX_LENGTHS.service),
    budget: asString(record.budget).slice(0, MAX_LENGTHS.budget),
    message: asString(record.message).slice(0, MAX_LENGTHS.message),
  };

  if (!payload.name) return null;
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(payload.email)) return null;
  if (!payload.service) return null;
  if (payload.message.length < 12) return null;

  return payload;
}

/**
 * POST /api/contact
 *
 * Forwards a validated project brief to `CONTACT_WEBHOOK_URL` (the n8n / CRM
 * endpoint referenced in `.env.example`). The form previously resolved a
 * `setTimeout` and showed a success panel without sending anything anywhere.
 *
 * The webhook URL is read from a server-only variable, so it is never exposed
 * to the browser.
 */
export async function POST(request: Request): Promise<NextResponse> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const payload = parse(body);
  if (!payload) {
    return NextResponse.json({ error: 'Invalid submission.' }, { status: 422 });
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (!webhook) {
    // Nothing configured yet: accept the brief rather than showing the visitor
    // an error, and leave a trace for the operator to wire the webhook up.
    console.error(
      '[contact] CONTACT_WEBHOOK_URL is not set — brief accepted but not delivered.'
    );
    return NextResponse.json({ ok: true, delivered: false }, { status: 202 });
  }

  try {
    const response = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...payload, submittedAt: new Date().toISOString() }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      console.error('[contact] webhook responded', response.status);
      return NextResponse.json({ error: 'Delivery failed.' }, { status: 502 });
    }
  } catch (error) {
    console.error('[contact] webhook request failed', error);
    return NextResponse.json({ error: 'Delivery failed.' }, { status: 502 });
  }

  return NextResponse.json({ ok: true, delivered: true });
}
