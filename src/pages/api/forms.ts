import type { APIRoute } from 'astro';
import { formsEnabled, services, industries, categories } from '@/lib/forms';

export const POST: APIRoute = async ({ request }) => {
  const reply = (message: string, status: number) => {
    const headers = { 'Cache-Control': 'no-store' };
    if (request.headers.get('accept')?.includes('text/html')) return new Response(`<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Form status</title></head><body><main><h1>Form status</h1><p>${message}</p><a href="/contact">Contact us</a> · <a href="/vendor-registration">Vendor registration</a></main></body></html>`, { status, headers: { ...headers, 'Content-Type': 'text/html; charset=utf-8' } });
    return Response.json({ message }, { status, headers });
  };
  if (!formsEnabled()) return reply('Forms are unavailable.', 503);
  let origin: string;
  try { origin = new URL(process.env.SITE_URL!).origin; } catch { return reply('Forms are unavailable.', 503); }
  if (request.headers.get('origin') !== origin) return reply('Invalid request origin.', 403);
  if (!request.headers.get('content-type')?.startsWith('application/x-www-form-urlencoded')) return reply('Invalid submission.', 415);
  if (Number(request.headers.get('content-length') ?? 0) > 16384 || !request.body) return reply('Submission too large.', 413);
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = []; let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 16384) { await reader.cancel(); return reply('Submission too large.', 413); }
      chunks.push(value);
    }
  } catch { return reply('Invalid submission.', 400); }
  const bytes = new Uint8Array(size); let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
  const data = new URLSearchParams(new TextDecoder().decode(bytes));
  const value = (key: string, max = 400) => {
    const values = data.getAll(key);
    if (values.length !== 1) return '';
    const text = values[0].trim();
    return text.length <= max && !/[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/.test(text) ? text : '';
  };
  const form = value('form');
  if ((form !== 'contact' && form !== 'vendor') || data.getAll('_gotcha').length !== 1 || data.get('_gotcha')) return reply('Invalid submission.', 400);
  const email = value('email', 254), phone = value('phone'), message = value(form === 'contact' ? 'message' : 'overview', 2000);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !phone || !message) return reply('Please complete all fields with valid details.', 400);
  const fields: { name: string; value: string }[] = [];
  if (form === 'contact') {
    const firstname = value('firstname'), lastname = value('lastname'), service = value('service');
    if (!firstname || !lastname || !services.includes(service)) return reply('Please complete all fields with valid details.', 400);
    fields.push({ name: 'firstname', value: firstname }, { name: 'lastname', value: lastname }, { name: 'message', value: `Service: ${service}\n\n${message}` }, { name: 'contact_from', value: 'Sendian_Security' });
  } else {
    const name = value('name'), company = value('company'), industry = value('company-type'), category = value('category');
    if (!name || !company || !Object.hasOwn(industries, industry) || !Object.hasOwn(categories, category) || value('consent') !== 'on') return reply('Please complete all fields and agree to be contacted.', 400);
    fields.push({ name: 'firstname', value: name }, { name: 'company', value: company }, { name: 'industry', value: industries[industry] }, { name: 'client_type', value: categories[category] }, { name: 'message', value: message });
  }
  fields.push({ name: 'email', value: email }, { name: 'phone', value: phone });
  const env = process.env;
  const formId = form === 'contact' ? env.HUBSPOT_CONTACT_FORM_ID : env.HUBSPOT_VENDOR_FORM_ID;
  try {
    const response = await fetch(`https://api.hsforms.com/submissions/v3/integration/submit/${env.HUBSPOT_PORTAL_ID}/${formId}`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ fields }), signal: AbortSignal.timeout(10000), redirect: 'error',
    });
    if (!response.ok) return reply('Unable to submit. Please try again.', 502);
  } catch { return reply('Unable to submit. Please try again.', 502); }
  try {
    const recipients = (env.MAILJET_NOTIFICATION_TO ?? '').split(',').map((Email) => Email.trim()).filter((Email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Email)).map((Email) => ({ Email }));
    if (!recipients.length || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(env.MAILJET_FROM_EMAIL ?? '')) throw new Error('Invalid notification configuration');
    const notification = await fetch('https://api.mailjet.com/v3.1/send', {
      method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Basic ${Buffer.from(`${env.MAILJET_API_KEY}:${env.MAILJET_API_SECRET}`).toString('base64')}` },
      body: JSON.stringify({ Messages: [{ From: { Email: env.MAILJET_FROM_EMAIL }, To: recipients, Subject: form === 'contact' ? 'New website contact enquiry' : 'New vendor registration', TextPart: fields.map(({ name, value }) => `${name}: ${value}`).join('\n') }] }), signal: AbortSignal.timeout(10000), redirect: 'error',
    });
    const result = await notification.json().catch(() => null) as { Messages?: { Status?: string }[] } | null;
    if (!notification.ok || !result?.Messages?.length || result.Messages.some((message) => message.Status?.toLowerCase() !== 'success')) console.error('Mailjet notification failed');
  } catch { console.error('Mailjet notification failed'); }
  return reply('Thank you. Your information has been submitted.', 200);
};
